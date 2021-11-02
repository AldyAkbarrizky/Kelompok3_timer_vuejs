const db = require("../models");
const Timer = db.timers;
const Op = db.Sequelize.Op;

// Create and Save a new Timer
exports.create = (req, res) => {
    if(!req.body.timer_id) {
        res.status(400).send({
            message: "Content can not be empty!"
        });
        return;
    }

    const timer = {
        timer_id: req.body.timer_id,
        counter: req.body.counter ? req.body.counter : null,
        lap_string: req.body.counter ? req.body.counter : null,
        prev_lap: req.body.prev_lap ? req.body.prev_lap : null,
        savedtime: req.body.savedtime ? req.body.savedtime : null,
        closedtime: req.body.closedtime ? req.body.closedtime : null,
        state: req.body.state ? req.body.state : null,
    };

    Timer.create(timer)
    .then(data => {
        res.send(data);
    })
    .catch(err => {
        res.status(500).send({
            message:
                err.message || "Some error occured while creating the Timer."
        });
    });
};

// Retrieve all Timers from the database.
exports.findAll = (req, res) => {
    const timer_id = req.query.timer_id;
  
    Timer.findAll({ where: {} })
      .then(data => {
        res.send(data);
      })
      .catch(err => {
        res.status(500).send({
          message:
            err.message || "Some error occurred while retrieving timers."
        });
    });
};

exports.countAll = (req, res) => {
    Timer.count()
      .then(data => {
        res.send(data);
      })
      .catch(err => {
        res.status(500).send({
          message:
            err.message || "Some error occurred"
        });
      });
}

// Find a single Timer with an id
exports.findOne = (req, res) => {
    const id = req.params.id;

    Timer.findByPk(id)
      .then(data => {
        if (data) {
          res.send(data);
        } else {
          res.status(404).send({
            message: `Cannot find Timer with id=${id}.`
          });
        }
      })
      .catch(err => {
        res.status(500).send({
          message: "Error retrieving Timer with id=" + id
        });
    });
};

// Update a Timer by the id in the request
exports.update = (req, res) => {
    console.log(req.params);
    const timer_id = "Timer-" + req.params.id;

    Timer.update(req.body, {
      where: { timer_id: timer_id }
    })
      .then(num => {
        if (num == 1) {
          res.send({
            message: "Timer was updated successfully."
          });
        } else {
          res.send({
            message: `Cannot update Timer with timer_id=${timer_id}. Maybe Timer was not found or req.body is empty!`
          });
        }
      })
      .catch(err => {
        res.status(500).send({
          message: "Error updating Timers with timer_id=" + timer_id
        });
    });
};

// Delete a Timer with the specified id in the request
exports.delete = (req, res) => {
    const id = req.params.id;

    Timer.destroy({
      where: { id: id }
    })
      .then(num => {
        if (num == 1) {
          res.send({
            message: "Timer was deleted successfully!"
          });
        } else {
          res.send({
            message: `Cannot delete Timer with id=${id}. Maybe Timer was not found!`
          });
        }
      })
      .catch(err => {
        res.status(500).send({
          message: "Could not delete Timer with id=" + id
        });
    });
};

// Delete all Timers from the database.
exports.deleteAll = (req, res) => {
    Timer.destroy({
        where: {},
        truncate: false
      })
        .then(nums => {
          res.send({ message: `${nums} Timers were deleted successfully!` });
        })
        .catch(err => {
          res.status(500).send({
            message:
              err.message || "Some error occurred while removing all timers."
        });
    });
};