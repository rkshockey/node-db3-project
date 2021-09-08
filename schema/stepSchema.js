const yup = require('yup')

module.exports = yup.object().shape({
    instructions: yup.string()
        .typeError("invalid step")
        .require("invalid step")
        .min(1, "invalid step"),
    step_number: yup.number()
        .typeError("invalid step")
        .required("invalid step")
        .integer("invalid step")
        .moreThan(0, "invalid step")
});
