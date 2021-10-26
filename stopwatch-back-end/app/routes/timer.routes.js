module.exports = app => {
    const timers = require("../controllers/timer.controller.js");
  
    var router = require("express").Router();
  
    // Create a new Tutorial
    router.post("/", timers.create);
  
    // Retrieve all Tutorials
    router.get("/", timers.findAll);

    // Count all timers
    router.get("/count", timers.countAll);
  
    // Retrieve a single Tutorial with id
    router.get("/:id", timers.findOne);
  
    // Update a Tutorial with id
    router.put("/:id", timers.update);
  
    // Delete a Tutorial with id
    router.delete("/:id", timers.delete);
  
    // Create a new Tutorial
    router.delete("/", timers.deleteAll);
  
    app.use('/api/timers', router);
  };