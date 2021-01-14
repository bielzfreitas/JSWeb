/*
1. To add a callback to our getApproval() function, we need to be able to pass a function as an argument. Change the function declaration function getApproval() to function getApproval(callback).

2. Now let's add a call to the callback function inside getApproval(). We want it to be called once our request is 'Approved!', so add a function call to callback() just after we modify approval.

3. Now we want to leverage our now asynchronous getApproval() function to set our result's text content once our request is approved. Remember, what we put in the callback is what we want to happen once the asynchronous stuff is complete. Therefore, we are going to call getApproval() and pass it an arrow function that sets our text content.  Modify our getApproval() call to:
getApproval( () => { result.textContent = approval; } );
*/

const result = document.getElementById('result');

let approval = 'Not approved!';

function getApproval(callback) {
  setTimeout(() => {
    approval = 'Approved!';
    callback();
  }, 500);
}

getApproval(() =>{
  result.textContent = approval;
});
result.textContent = approval;