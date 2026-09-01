const routerAtendimentos = require("./atendimentoRoutes");
const routerLivros = require("./lIvroRoutes");

module.exports = (app) => {
    app.use(routerAtendimentos);
    app.use("/livros", routerLivros);
};