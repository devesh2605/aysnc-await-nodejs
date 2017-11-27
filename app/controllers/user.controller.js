const User = require('../models/user.model'),
      logger = require('../../utils/logger'),
      statusCode = require('../../utils/statusCode');

/**
* Create a new data
*/
exports.create = async(req, res) => {
logger.info('API called to create new user');

let appData = {};
let user = new User(req.body);

try {
    let data = await user.save();
    logger.info('User created successfully')
    appData['error'] = 0;
    appData['data'] = 'User created successfully';
    res.status(statusCode.status201).json(appData);
} catch (err) {
    logger.error('An uknown error occured while creating data ' + err);
    appData['error'] = 1;
    appData['data'] = 'An uknown error occured while creating data ' + err;
    res.status(statusCode.status500).json(appData);
}
};

/**
* Get all users
*/
exports.findAll = async(req, res) => {
logger.info('API called to get all users');

let appData = {};

try {
    let user = await User.find({});
    if (!user) {
        logger.error('No data found');
        appData['error'] = 1;
        appData['data'] = 'No data found';
        res.status(statusCode.status404).json(appData);
    } else {
        logger.info('Users returned successfully');
        appData['error'] = 0;
        appData['data'] = user;
        res.status(statusCode.status200).json(appData);
    }
} catch (err) {
    logger.error('An unknon error ocuured while retrieving data ' + err);
    appData['error'] = 1;
    appData['data'] = 'An unknon error ocuured while retrieving data ' + err;
    res.status(statusCode.status500).json(appData);
}
};

/**
* Get a data by id
*/
exports.findOne = async(req, res) => {
logger.info('API called to get homescreen data by id');

let appData = {};
let id = req.params.id;

try {
    let user = await User.findById(id);
    if (!user) {
        logger.error('No data found');
        appData['error'] = 1;
        appData['data'] = 'No data found';
        res.status(statusCode.status404).json(appData);
    } else {
        logger.info('A User returned successfully');
        appData['error'] = 0;
        appData['data'] = user;
        res.status(statusCode.status200).json(appData);
    }
} catch (err) {
    logger.error('An unknon error ocuured while retrieving data ' + err);
    appData['error'] = 1;
    appData['data'] = 'An unknon error ocuured while retrieving data ' + err;
    res.status(statusCode.status500).json(appData);
}
};

/**
* Update a data by id
*/
exports.update = async(req, res) => {
logger.info('API called to update homescreen data by id');

let appData = {};
let _id = req.params.id;

try {
    let user = await User.findOneAndUpdate({_id}, req.body);
    if (!user) {
        logger.error('No data found');
        appData['error'] = 1;
        appData['data'] = 'Not data found';
        res.status(statusCode.status404).json(appData);
    } else {
        logger.info('A User updated successfully');
        appData['error'] = 0;
        appData['data'] = 'Data updated successfully';
        res.status(statusCode.status200).json(appData);
    }
} catch (err) {
    logger.error('An unkown error occured while updating data ' + err);
    appData['error'] = 1;
    appData['data'] = 'An unkown error occured while updating data ' + err;
    res.status(statusCode.status500).json(appData);
}
};

/**
* Delete a data by id
*/
exports.delete = async(req, res) => {
logger.info('API called to delete homescreen data by id');

let appData = {};
let _id = req.params.id;

try {
    let user = await User.findOneAndRemove({ _id});
    if (!user) {
        logger.error('No data to remove for this id ' + _id);
        appData['error'] = 1;
        appData['data'] = 'No data to remove for this id ' + _id;
        res.status(statusCode.status404).json(appData);
    } else {
        logger.info('Data delete successfully');
        appData['error'] = 1;
        appData['data'] = 'Data deleted successfully';
        res.status(statusCode.status200).json(appData);
    }
} catch (err) {
    logger.error('An uknown error occured in deleting data ' + err);
    appData['error'] = 1;
    appData['data'] = 'An uknown error occured in deleting data ' + err;
    res.status(statusCode.status500).json(appData);
}
};