/*
1. Start by adding a variable called approval, with value 'Not approved!'.

2. Now create a function called getApproval() which will, after 500ms, set the value of approval to 'Approved!'.

3. Add a line calling the getApproval() function, and add a line immediately afterwards which sets the text content of the result heading to the value stored in approval.
*/

const result = document.getElementById('result');

let approval = 'Not approval';

function getApproval(){
  setTimeout(() => {
    approval = 'Approved!';
  }, 20);
}

getApproval();
result.textContent = approval;