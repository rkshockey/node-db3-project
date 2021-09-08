const { findById } = require('./scheme-model');
const stepSchema = require('../../schema/stepSchema')
const schemeSchema = require('../../schema/schemeSchema')

/*
  If `scheme_id` does not exist in the database:

  status 404
  {
    "message": "scheme with scheme_id <actual id> not found"
  }
*/
const checkSchemeId = async (req, res, next) => {
  try {
    const { scheme_id } = req.params;
    const scheme = await findById(scheme_id);
    if (scheme) {
      next();
    }else{
      next({ status: 404, message: `scheme with scheme_id ${scheme_id} not found`});
    }
  } catch (err) {
    next(err)
  }
}

/*
  If `scheme_name` is missing, empty string or not a string:

  status 400
  {
    "message": "invalid scheme_name"
  }
*/
const validateScheme = async (req, res, next) => {
  try {
    await schemeSchema.validate(req.body)
    next()
  } catch (err){
    next({ status: 400, message: err.errors[0] });
  }
}

/*
  If `instructions` is missing, empty string or not a string, or
  if `step_number` is not a number or is smaller than one:

  status 400
  {
    "message": "invalid step"
  }
*/
const validateStep = async (req, res, next) => {
  try {
    await stepSchema.validate(req.body);
    next();
  } catch (err) {
    next({ status: 400, message: err.errors[0] });
  }
}

module.exports = {
  checkSchemeId,
  validateScheme,
  validateStep,
}
