/*
1. Add a blur event listener to the confirmPassword element.

2. Compare the value properties of both inputs.

- If they are the same, set the border styles to thin solid green and set the display style of errorMsg so that it disappears.

- If they are different, set the border styles to thin solid red and set the display style of errorMsg so that it appears.
*/

const passwordInput = document.getElementById('password-input');
const confirmPassword = document.getElementById('confirm-password');
const errorMsg = document.getElementById('error-message');

confirmPassword.addEventListener('blur', () => {
  if(passwordInput.value === confirmPassword.value){
    passwordInput.style.border = 'thin solid green';
    confirmPassword.style.border = 'thin solid green';
    errorMsg.style.display = 'none';
  }else {
    passwordInput.style.border = 'thin solid red';
    confirmPassword.style.border = 'thin solid red';
    errorMsg.style.display = 'inline';
  }
    
});