const coursesRouter = require("./course");

const route = (app) => {
  app.use("/", coursesRouter);
};
module.exports = route;
