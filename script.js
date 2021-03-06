const API_URL = 'https://curso-dev-2021.herokuapp.com/newsletter?'

window.onload = function() {
  const formData = localStorage.getItem('formData')
  loadForm(formData)

  var inputName = document.getElementById('name');
  inputName.oninput = function(){
    document.getElementById('titleName').innerHTML = inputName.value;
  }

  document.getElementById('suscription').addEventListener('submit',function (e) {
    e.preventDefault();
    const formElement = document.getElementById('suscription');
    const disabledInputs = formElement.querySelectorAll('.disabled')
    if (disabledInputs.length > 0){
      alert('Hay errores en el formulario')
      return
    }
    const formEntries = new FormData(formElement).entries();
    const formData = Object.assign(...Array.from(formEntries, ([name, value]) => ({[name]: value})));
    let query = Object.keys(formData)
      .map(k => encodeURIComponent(k) + '=' + encodeURIComponent(formData[k]))
      .join('&');
    const URL= API_URL + query
    fetch(URL)
      .then((response)=>response.json())
      .then((response)=> { 
        localStorage.setItem('formData', JSON.stringify(response))
        modalView(response,'OK');
      })
    .catch ((error)=>modalView(error,'ERROR'))
  });
};

function loadForm(formData) {
  if(!formData) return
  const jsonFormData = JSON.parse(formData)
  const jsonKeys = Object.keys(jsonFormData)
  jsonKeys.map((key) => document.getElementById(key).value = jsonFormData[key])
};

function validate(elementId) {
  const input = document.getElementById(elementId);
  let validator;
  let errorText;
  let result;
  const error = document.createElement('p');
  switch (elementId) {
    case 'name':
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
      if(input.value % 1 == 0){
        result = (input.value >= 18);
      }
      errorText = 'Must be 18 or older and the number must be integer';
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
      input.classList.remove('disabled');
    } else {
      input.style.borderColor = 'red';
      input.parentNode.insertBefore(error, input.nextSibling);
      error.style.color = 'red';
      error.innerHTML = errorText;
      input.classList.add('disabled');
    }
  } else {
    if (result) {
      input.style.borderColor = 'green';
      input.classList.remove('disabled');
    } else {
      input.style.borderColor = 'red';
      input.parentNode.insertBefore(error, input.nextSibling);
      error.style.color = 'red';
      error.innerHTML = errorText;
      input.classList.add('disabled');
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

function modalView(response,message){
  if(message === 'OK'){
    const jsonResponse = Object.keys(response)
    let messageResponse = '<ul>';
    jsonResponse.map(function(key, index) {
      const val = response[key];
      messageResponse += `<li>${key}: ${val}</li>`;
    })
    messageResponse += '</ul>';
    document.getElementById('messageContent').innerHTML =`<p>La llamada se realizo correctamente</p>
    ${messageResponse}`
  }else{
    document.getElementById('messageContent').innerHTML = 'La llamada present?? un error'
  }
  var modal = document.getElementById("modalSubmit");
  var span = document.getElementsByClassName("close")[0];
  modal.style.display = "block"
  span.onclick = function() {
    modal.style.display = "none";
  }
  window.onclick = function(event) {
    if (event.target == modal) {
      modal.style.display = "none";
    }
  }
}
