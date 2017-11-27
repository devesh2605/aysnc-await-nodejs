module.exports = function(app) {
    
        const user = require('../controllers/user.controller');
        const validate = require('express-validation');
        const userValidation = require('../validations/user.validate');
        const mcache = require('memory-cache');
    
        const cache = (duration) => {
            return (req, res, next) => {
                let key = '__express__' + req.originalUrl || req.url
                let cachedBody = mcache.get(key)
                if (cachedBody) {
                    res.send(cachedBody)
                    return
                } else {
                    res.sendResponse = res.send
                    res.send = (body) => {
                        mcache.put(key, body, duration * 1000);
                        res.sendResponse(body)
                    }
                    next()
                }
            }
        }
    
        app.post('/user', validate(userValidation.dataVal), user.create);
    
        app.get('/user', cache(10), user.findAll);
    
        app.get('/user/:id', user.findOne);
    
        app.put('/user/:id', validate(userValidation.dataVal), user.update);
    
        app.delete('/user/:id', user.delete);
    }