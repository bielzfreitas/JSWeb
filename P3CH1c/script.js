/*
1. Empty out our getApproval() function and, for now, simply replace the contents with:
return new Promise();.

2. The constructor for a Promise takes a function as an argument. That function takes two arguments: resolve and reject. Pass an arrow function to our Promise constructor:
return new Promise((resolve, reject) => { });

3. Now instead of modifying the variable directly within the getApproval() function, we're going to have its Promise resolve with 'Approved!' after 500ms. Rebuild a setTimeout() for 500ms, within whose callback you will write:  resolve('Approved!'); . So when we run getApproval(), it returns us a Promise which resolves after 500ms.

4. We now need to use a .then() block to use the data resolved within that Promise. Let's modify our call to getApproval() and how we set result.textContent as follows:
getApproval().then( (resolvedApproval) => {    result.textContent = resolvedApproval; } );
*/

const result = document.getElementById('result');

let approval = 'Not approved!';

function getApproval() {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      resolve('Approved!');
    }, 500);
  });
}

getApproval().then( 
  (resolvedApproval) => {    
    result.textContent = resolvedApproval; 
  } 
);
result.textContent = approval;