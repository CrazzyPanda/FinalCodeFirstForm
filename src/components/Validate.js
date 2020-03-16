const validate = (value, rules, field) => {
  let isValid = true;
  var errorText = "";

  for (let rule in rules) {

    switch (rule) {
      case 'isRequired':
        isValid = isValid && requiredValidator(value);
        break;
      	case 'minLength':
          isValid = isValid && minLengthValidator(value, rules[rule]);
          errorText = "Your " + field + " must be at least "+ rules[rule] + " characters long.";
          break;
        case 'isEmail':
          isValid = isValid && emailValidator(value);
          errorText = "Please enter a valid email address";
          break;
        case 'isDropdown' :
          isValid = isValid && dropdownValidator(value);
          errorText = "Please select your " + field;
          break;
        case 'isCheckbox':
          isValid = isValid && value == "true";
          errorText = "Please tick the box for " + field;
          break;
      	default: isValid = true;
    }

  }
  const returnArray = [isValid, errorText];
  return returnArray;
}

{/*length validation*/}
const minLengthValidator = (value, minLength) => {
    return value.length >= minLength;
}

{/*required field validation*/}
const requiredValidator = value => {
    return value.trim() !== '';
}

{/*email validation*/}
const emailValidator = value => {
    var re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(String(value).toLowerCase());
}

{/*dropdown validation*/}
const dropdownValidator = value => {
    return value != "Please Select" && value != "Day" && value != "Month" && value != "Year";

}


export default validate;
