const makeInquiryModel = require('./Inquiry');
const makeServiceModel = require('./service');
const makeServiceCategoryModel = require('./serviceCategory');


const Mongoose = require('mongoose');
const {mainDbConnection} = require('../../config/db')

const getInquiryModel = makeInquiryModel({Mongoose, mainDbConnection});
const getServiceModel = makeServiceModel({Mongoose, mainDbConnection});
const getServiceCategoryModel= makeServiceCategoryModel({Mongoose, mainDbConnection});


console.log({getServiceModel});

module.exports= {
  getInquiryModel,
  getServiceModel,
  getServiceCategoryModel,
}