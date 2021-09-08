const { findById } = require('./scheme-model');
const stepSchema = require('../../schema/stepSchema')

/*
  If `scheme_id` does not exist in the database:

  status 404
  {
    "message": "scheme with scheme_id <actual id> not found"
  }
*/
const checkSchemeId = async (req, res, next) => {
  try {
    const { id } = req.params;
    const scheme = findById(id);
    console.log('checkSchemeId wired');
    if (scheme) {
      next();
    }else{
      next({ status: 404, message: `scheme with scheme_id ${id} not found`});
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
const validateScheme = (req, res, next) => {
  if (req.body.scheme_name){
    next();
  }else{
    next({ status: 400, message: 'invalid scheme_name' });
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
