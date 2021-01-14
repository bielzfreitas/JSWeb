/*
1. Declare async function submitFormData(post).

2. To handle errors, we try our desired code and catch the error case. Add a try { } block and a catch (errorResponse) { } block.

3. Inside our try block, we will create an instance of our Promise and then use await to store its result. Add the following lines to our try block:
- const requestPromise = makeRequest(post);const response = await requestPromise;

4. We know that our API will return an object that looks like this: 
- {    message: string,    post: {        id: string,        title: string,        content: string    }}
So after our await statement, we know that (if the request is successful), we can use these properties. Add these lines to print our result to the DOM:
- responseMessage.textContent = response.message;responseTitle.textContent =     response.post.title;responseId.textContent = response.post.id;responseContent.textContent =  response.post.content;

5. Now in our catch block, we want to handle the case where an error occurs. If the API throws an error, its response will simply be an object like this:
- {    error: string}
Let's use that to print any error messages to the DOM. Add this line to our catch block:
responseMessage.textContent = errorResponse.error;

6. Now all we have to do is call submitFormData() from our button event handler, passing it the post object we created earlier. Make a call to submitFormData() just after declaring the post variable, and pass it that variable.

7. Now create a post and see what happens!
*/

// Get form elements
const titleInput = document.getElementById('title');
const contentInput = document.getElementById('content');
const submitButton = document.getElementById('submit-button');

const url = 'https://us-central1-open-classrooms-js-for-the-web.cloudfunctions.net/widgets';

// Get DOM elements for showing response
const responseMessage = document.getElementById('response-message');
const responseTitle = document.getElementById('response-title');
const responseId = document.getElementById('response-id');
const responseContent = document.getElementById('response-content');

submitButton.addEventListener('click', ($event) => {
  $event.preventDefault();
  const post = {
    title: titleInput.value,
    content: contentInput.value
  };
  submitFormData(post);
});

function makeRequest(data) {
  return new Promise((resolve, reject) => {
    let request = new XMLHttpRequest();
    request.open('POST', url + '/create-post');
    request.onreadystatechange = () => {
      if (request.readyState === 4) {
        if (request.status === 201) {
          resolve(JSON.parse(request.response));
        } else {
          reject(JSON.parse(request.response));
        }
      }
    };
    request.setRequestHeader('Content-Type', 'application/json');
    request.send(JSON.stringify(data));
  });
}

async function submitFormData(post){
  try{
    const requestPromise = makeRequest(post);
    const response = await requestPromise;
    responseMessage.textContent = response.message;
    responseTitle.textContent = response.post.title;
    responseId.textContent = response.post.id;
    responseContent.textContent = response.post.content;
  }catch (errorResponse){
    responseMessage.textContent = errorResponse.error;
  }
}













