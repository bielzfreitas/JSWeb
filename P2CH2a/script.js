/*
1. Start by adding an input event listener to passwordInput that captures the $event object.

2. Now add a conditional statement that checks the length property of $event.target.value and updates the submitButton accordingly.
*/

const passwordInput = document.getElementById('password-input');
const submitButton = document.getElementById('submit-button');

passwordInput.addEventListener('input', ($event) => {
  if($event.target.value.length >= 6 && $event.target.value.length <= 12){
    submitButton.removeAttribute('disabled');
  }else{
    submitButton.setAttribute('disabled', 'true');
  }  
});