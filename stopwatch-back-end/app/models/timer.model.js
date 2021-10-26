module.exports = (sequelize, Sequelize) => {
    const Timer = sequelize.define("timer", {
      timer_id: {
        type: Sequelize.STRING(10)
      },
      counter: {
        type: Sequelize.INTEGER
      },
      lap_string: {
        type: Sequelize.TEXT
      },
      prev_lap: {
        type: Sequelize.BIGINT
      },
      savedtime: {
        type: Sequelize.BIGINT
      },
      closedtime: {
        type: Sequelize.BIGINT
      },
      state: {
        type: Sequelize.STRING(10)
      }
    });
  
    return Timer;
  };