const Driver = require('../models/driver');

module.exports = {
    greeting(req, res) {
        res.send({ hi: 'there' });
    },

    index(req, res, next) {
        const { lng, lat } = req.query;
        Driver.aggregate([{
            $geoNear: {
                spherical: true,
                maxDistance: 200000,
                near: { type: 'Point', coordinates: [Number(lng), Number(lat)] },
                distanceField: 'dist.calculated'
            }
        }])
            .then(drivers => res.send(drivers))
            .catch(next);
    },

    create(req, res, next) {
        const driverProps  = req.body;
        Driver.create(driverProps)
            .then(driver => res.send(driver))
            .catch(next);
    },

    edit(req, res, next) {
      const driverId = req.params.id;
      const driverProps = req.body;

      Driver.findByIdAndUpdate(driverId, driverProps)
        .then(() => Driver.findById(driverId))
        .then(driver => res.send(driver))
        .catch(next);
    },

    delete(req, res, next){
        const driverId = req.params.id;

        Driver.findByIdAndDelete(driverId)
            .then((driver) => res.status(204).send(driver))
            .catch(next);
    }
    
};