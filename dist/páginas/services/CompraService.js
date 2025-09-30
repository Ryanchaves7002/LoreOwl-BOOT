// ../js/services/CompraService.js
import { ComprasRepo } from '../entidades/compra.js';
import { CarrinhoRepo } from '../entidades/carrinho.js';
import { ItemCompra, ItemCompraRepo } from '../entidades/itemcompra.js';
import { LivrosRepo } from '../entidades/livro.js';
import { TransacoesRepo, Transacao } from '../entidades/transacao.js';

/**
 * CompraService
 * - criarCompraFromCarrinho(usuarioId, enderecoId, formaPagamento, cartao)
 * - listarComprasUsuario(usuarioId)
 * - calcularTotalDeItens(itens)
 */
export const CompraService = {
  criarCompraFromCarrinho(usuarioId, enderecoId, formaPagamento = 'boleto', cartao = null) {
    // 1) pegar itens do carrinho do usuário
    const todosItens = CarrinhoRepo.listar();
    const itensUsuario = todosItens.filter(i => Number(i.usuarioId) === Number(usuarioId));

    if (!itensUsuario.length) {
      throw new Error('Carrinho vazio para este usuário.');
    }

    // 2) verificar disponibilidade de estoque
    for (const ci of itensUsuario) {
      const livro = ci.livro || LivrosRepo.listar().find(l => Number(l.id) === Number(ci.livroId));
      if (!livro) throw new Error(`Livro não encontrado (id: ${ci.livroId || 'desconhecido'})`);
      if (Number(livro.estoque) < Number(ci.quantidade)) {
        throw new Error(`Estoque insuficiente para "${livro.titulo}". Disponível: ${livro.estoque}, pedido: ${ci.quantidade}`);
      }
    }

    // 3) calcular total
    const itensParaTransacao = itensUsuario.map(ci => {
      const livro = ci.livro || LivrosRepo.listar().find(l => Number(l.id) === Number(ci.livroId));
      const preco = Number(livro.preco || ci.precoUnitario || 0);
      const qtd = Number(ci.quantidade || 1);
      return { livro, quantidade: qtd, precoUnitario: preco, subtotal: preco * qtd, carrinhoItemId: ci.id };
    });

    const total = itensParaTransacao.reduce((s, it) => s + it.subtotal, 0);

    // 4) criar transação e salvar
    const transacao = new Transacao(null, usuarioId, cartao ? cartao.id : null, itensParaTransacao, total);
    TransacoesRepo.adicionar(transacao);

    // 5) processar pagamento (simulação)
    if (formaPagamento === 'cartao' && cartao && typeof transacao.finalizar === 'function') {
      transacao.finalizar(cartao);
      // atualizar transação no repo (Transacao usa propriedade id)
      TransacoesRepo.atualizar(transacao.id, transacao);
    } else {
      // outros meios (boleto, pix...) aprovamos automaticamente aqui
      transacao.status = 'aprovado';
      TransacoesRepo.atualizar(transacao.id, transacao);
    }

    // 6) se transação recusada, aborta (retorna resultado com falha)
    if (transacao.status !== 'aprovado') {
      return {
        success: false,
        message: 'Pagamento recusado.',
        transacaoId: transacao.id
      };
    }

    // 7) criar Compra e salvar
    // A classe Compra pode usar idcompra ou id dependendo de como você escreveu; aqui assumimos que ComprasRepo aceita o objeto que sua classe Compra cria.
    const CompraClassModule = require ? require('../entidades/compra.js') : null;
    // Em ambientes ESModule, o import está estático, então vamos apenas construir um objeto com os campos esperados
    // Para compatibilidade: tentamos usar a classe Compra se existir no repo (não obrigatório)
    let compraObj;
    try {
      // tenta importar a classe Compra via import (se estiver disponível)
      // porém em runtime daqui já importamos ComprasRepo, então vamos criar objeto simples compatível
      compraObj = {
        idcompra: Date.now(),
        usuarioid: usuarioId,
        valorcompra: total,
        valortotal: total,
        datacompra: new Date().toISOString(),
        formadepagamento: formaPagamento,
        status: 'finalizada',
        enderecoid: enderecoId,
        transacaoId: transacao.id
      };
    } catch (e) {
      compraObj = {
        idcompra: Date.now(),
        usuarioid: usuarioId,
        valorcompra: total,
        valortotal: total,
        datacompra: new Date().toISOString(),
        formadepagamento: formaPagamento,
        status: 'finalizada',
        enderecoid: enderecoId,
        transacaoId: transacao.id
      };
    }
    ComprasRepo.adicionar(compraObj);

    // 8) criar ItemCompra para cada item, salvar no repo e atualizar estoque
    const itensCriados = [];
    for (const it of itensParaTransacao) {
      const itemCompra = new ItemCompra(null, transacao.id, it.livro, it.quantidade);
      ItemCompraRepo.adicionar(itemCompra);
      itensCriados.push(itemCompra);

      // reduzir estoque do livro e atualizar no repo
      const livroOriginal = LivrosRepo.listar().find(l => Number(l.id) === Number(it.livro.id));
      if (livroOriginal) {
        livroOriginal.estoque = Number(livroOriginal.estoque) - Number(it.quantidade);
        // atualiza via repo (Repository deve ter método atualizar(id, novoItem))
        if (typeof LivrosRepo.atualizar === 'function') {
          LivrosRepo.atualizar(livroOriginal.id, livroOriginal);
        } else {
          // fallback: remover + adicionar (cuidado)
          // aqui assumimos atualizar existe
        }
      }
    }

    // 9) limpar itens do carrinho (apagar somente os itens do usuário)
    for (const ci of itensUsuario) {
      if (typeof CarrinhoRepo.remover === 'function') {
        // CarrinhoRepo.remover espera id do item do carrinho
        CarrinhoRepo.remover(ci.id);
      }
    }

    // 10) retornar resultado com ids e infos
    return {
      success: true,
      message: 'Compra finalizada com sucesso.',
      compra: compraObj,
      transacaoId: transacao.id,
      itens: itensCriados
    };
  },

  listarComprasUsuario(usuarioId) {
    return ComprasRepo.listar().filter(c => Number(c.usuarioid || c.usuarioId) === Number(usuarioId));
  },

  calcularTotalDeItens(itens) {
    return itens.reduce((s, it) => s + (Number(it.precoUnitario || (it.livro && it.livro.preco) || 0) * Number(it.quantidade || 1)), 0);
  }
};
