const client = require('../redis/redis');

function checkCache(key) {
    return function (req, res, next) {
        client.hgetall(`${key}:${req.params.id}`, function (err, result) {
            if (err) {
                return res.status(500).json(err.message);
            } else {

                if (result != undefined) {
                    return res.status(200).json(result);
                }
                next();
            }
        });

    }
}

exports.checkCache = checkCache;