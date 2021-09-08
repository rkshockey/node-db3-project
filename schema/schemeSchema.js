const yup = require('yup')

module.exports = yup.object().shape({
    scheme_name: yup.string()
        .typeError('invalid scheme_name')
        .required('invalid scheme_name')
        .min(1, 'invalid scheme_name')
});
