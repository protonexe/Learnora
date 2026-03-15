const FormValidator = (values, rules) => {
  const errors = {};

  Object.keys(rules).forEach(field => {
    const value = values[field];
    const fieldRules = rules[field];

    for (const rule of fieldRules) {
      const error = rule(value, values);
      if (error) {
        errors[field] = error;
        break;
      }
    }
  });

  return {
    isValid: Object.keys(errors).length === 0,
    errors
  };
};

const ValidationRules = {
  required: (msg = 'This field is required') => (value) => 
    !value || (typeof value === 'string' && !value.trim()) ? msg : null,

  email: (msg = 'Invalid email address') => (value) => 
    value && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value) ? msg : null,

  minLength: (length, msg) => (value) => 
    value && value.length < length ? msg || `Minimum ${length} characters` : null,

  maxLength: (length, msg) => (value) => 
    value && value.length > length ? msg || `Maximum ${length} characters` : null,

  pattern: (regex, msg = 'Invalid format') => (value) => 
    value && !regex.test(value) ? msg : null,

  matches: (field, msg) => (value, values) => 
    value !== values[field] ? msg || 'Fields do not match' : null,

  numeric: (msg = 'Must be a number') => (value) => 
    value && isNaN(parseFloat(value)) ? msg : null,

  min: (num, msg) => (value) => 
    value && parseFloat(value) < num ? msg || `Minimum value is ${num}` : null,

  max: (num, msg) => (value) => 
    value && parseFloat(value) > num ? msg || `Maximum value is ${num}` : null,

  url: (msg = 'Invalid URL') => (value) => 
    value && !/^https?:\/\/.+/.test(value) ? msg : null,
};

window.FormValidator = FormValidator;
window.ValidationRules = ValidationRules;
