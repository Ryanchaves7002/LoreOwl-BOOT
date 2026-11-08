const routerAtendimentos = require("./atendimentoRoutes");
const routerLivros = require("./lIvroRoutes");
const routerAuth = require("../api/authRoutes");
const routerCart = require("../api/cartRoutes");
const routerRepository = require("../api/repositoryRoutes");

module.exports = (app) => {
    const apiRouter = require("express").Router();
    apiRouter.use(routerAtendimentos);
    apiRouter.use("/livros", routerLivros);
    apiRouter.use(routerAuth);
    apiRouter.use(routerCart);
    apiRouter.use(routerRepository);
    app.use("/api", apiRouter);
    app.use(apiRouter);
};