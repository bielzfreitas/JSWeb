/*
1. Start by simply adding required as a property on the first password <input>. What happens if you try to submit the form without entering a password?

2. Now add the required property to both other fields, making sure there will be data in each before the user can submit the form.

3. We can also use RegEx strings with the pattern property to enforce the "shape" the data must conform to. Add the pattern=".+@.+\..+" property to the E-mail field. This RegEx enforces the "something@something.something" pattern.

4. Now try entering different strings into each field, and see what happens when you try to submit the form.
*/

// Access DOM elements
const passwordInput = document.getElementById('password-input');
const confirmPassword = document.getElementById('confirm-password');
const errorMsg = document.getElementById('error-message');
const submitButton = document.getElementById('submit-button');

// Checks password confirmation
confirmPassword.addEventListener('blur', () => {
  if (passwordInput.value === confirmPassword.value) {
    submitButton.removeAttribute('disabled');
  } else {
    submitButton.setAttribute('disabled', 'true');
  }
});