export async function sha256(text) {
  const enc = new TextEncoder().encode(text);
  const hashBuffer = await crypto.subtle.digest('SHA-256', enc);
  const bytes = Array.from(new Uint8Array(hashBuffer));
  return bytes.map(b => b.toString(16).padStart(2, '0')).join('');
}

export function moneyBRL(n) {
  return new Intl.NumberFormat('pt-BR',{ style:'currency', currency:'BRL' }).format(n);
}

export function on(el, ev, fn) {
  el.addEventListener(ev, fn);
}