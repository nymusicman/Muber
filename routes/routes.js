const DriversController = require('../controller/drivers_controller');

module.exports = (app) => {
    app.get('/api', DriversController.greeting);

    app.post('/api/drivers', DriversController.create);
}