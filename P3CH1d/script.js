/*
1. Completely remove our current call to getApproval().

2. We are now going to create a function that uses async/await to set our approval text. Declare a new asynchronous function called setApprovalText() as follows:  async function setApprovalText() { } .

3. We need the async keyword to be able to use await within the function body to wait for our Promise to resolve. Within the new async function, declare a constant called approvalPromise which holds the Promise returned by getApproval():
const approvalPromise = getApproval();.

4. Now comes the cool part: we are going to use the await keyword to assign the eventual resolved value from the promise to our result element's text content. Add the following line to the async function:result.textContent = await approvalPromise;.

5. Now all we need to do is call the function. Call setApprovalText().
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

async function setApprovalText(){
  const approvalPromise = getApproval();
  result.textContent = await approvalPromise;
}

setApprovalText();