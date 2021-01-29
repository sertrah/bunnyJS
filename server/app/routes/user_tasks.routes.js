module.exports = app => {
  const userTasks = require("../controllers/user_tasks.controller.js");

  var router = require("express").Router();

  router.post("/", userTasks.create);

  router.get("/", userTasks.findAll);

  router.get("/:id", userTasks.findOne);

  router.put("/:id", userTasks.update);

  router.delete("/:id", userTasks.delete);

  app.use("/api/userTasks", router);
};