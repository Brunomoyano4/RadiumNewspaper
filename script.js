

function validate(elementId) {
  const input = document.getElementById(elementId);
  let validator;
  let errorText;
  const error = document.createElement('p');
  switch (elementId) {
    case 'fName':
      validator = /^(?=.*[a-zA-Z]\s).{6,}$/;
      errorText = 'Name must have at least 6 letters and a space in the middle';
      break;
    case 'email':
      validator = /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/;
      errorText = 'Must be a valid email'
      break;
    case 'password':
      validator = /(?=.*?[0-9])(?=.*?[A-Za-z]).{8,}.+/;
      errorText = 'Password must contain at least 8 alphanumeric characters';
      break;
    case 'age':
      result = (input.value >= 18);
      errorText = 'Must be 18 or older';
      break;
    case 'phoneNumber':
      validator = /^\D*(?:\d\D*){7,}$/;
      errorText = 'Phone Number must have at least 7 digits without spaces, dashes or parenthesis';
      break;
    case 'adress':
      validator = /^(?=.*[a-zA-Z0-9]\s).{5,}$/
      errorText = 'Address must have at least 5 characters between letters and numbers, and at least 1 space';
      break;
    case 'city':
      result = (input.value.length > 3);
      errorText = 'City must have at least 3 characters';
      break;
    case 'zipCode':
      result = (input.value.length > 3);
      errorText = 'Zip code must have at least 3 digits';
      break;
    case 'idNumber':
      validator = /^\D*(?:\d\D*){7,8}$/;
      errorText = 'Id number must be contain 7 or 8 digits';
      break;
    default:
      break;
  }
  if (validator) {
    const result = validator.test(input.value);
    if (result) {
      input.style.borderColor = 'green';
    } else {
      input.style.borderColor = 'red';
      input.parentNode.insertBefore(error, input.nextSibling);
      error.style.color = 'red';
      error.innerHTML = errorText;
    }
  } else {
    if (result) {
      input.style.borderColor = 'green';
    } else {
      input.style.borderColor = 'red';
      input.parentNode.insertBefore(error, input.nextSibling);
      error.style.color = 'red';
      error.innerHTML = errorText;
    }
  }

};

function focusFunction(elementId) {
  const input = document.getElementById(elementId);
  input.style.borderColor = 'black';
  const error = document.getElementById(elementId).nextSibling;
  if (error) {
    error.remove();
  }
}

document.getElementById('suscription').addEventListener('submit', function (e) {
  e.preventDefault();
  let inputs = ['fName', 'email', 'password', 'age', 'phoneNumber', 'adress', 'city', 'zipCode', 'idNumber'];
  var data = new FormData();
  inputs.map(input => {
    const error = document.getElementById(input).nextSibling;
    if (error) {
      data.append(input, error.textContent);
    } else {
      data.append(input, document.getElementById(input).value);
    }
  })

  let result = '';
  for (const [key, value] of data.entries()) {
    result += `${key} : ${value}\n`;
  }
  alert(result);
});

