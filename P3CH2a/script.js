/*
1. Let's start by adding a click listener to our submit button that will prepare our form data. Add a click listener to submitButton which blocks default submit behavior and creates an object called post which contains a title field and a content field with the data from the form.

2. Now we're going to create a function which will accept JSON data as an argument, and set up and send our request. This function will return a Promise so that we can use async/await. Create a new function called makeRequest() which accepts data as an argument.

3. Have makeRequest() return a Promise.

4. Within the body of the Promise, create a new XMLHttpRequest object called request, and open it with the verb POST. The URL for this request will be the api constant + the endpoint '/create-post'.

5. Create an onreadystatechange function for request. Make sure the code within it will only execute if the request has a readyState of 4 with an if statement.

6. The API will return a status of 201 for a successful request. Let's use that fact to populate our onreadystatechange function. Set up an if...else statement to handle successful requests vs. unsuccessful requests.
HINT: A request's status is stored in its status property.

7. If the request is successful, we want the Promise to resolve with the response. If it is not, we want it to reject with the response. The response data will be JSON, but it is sent as a string. We will therefore need to parse it to be able to use it as an object.
- For a successful request: resolve(JSON.parse(request.response));.
- For an unsuccessful request:  reject(JSON.parse(request.response));.

8. Now that our onreadystatechange function is ready, we need to send our request. However, with a POST request, we need to set a request header to specify what kind of data we are sending. In this case, we are sending JSON, so add this line after the onreadystatechange declaration:  request.setRequestHeader('Content-Type', 'application/json');.

9. Now that our request is ready, it's time to send it. Remember, we want to send our data object to the API, so we'll be passing it as an argument to the request's send() method. However, we need to stringify it first for it to be properly handled by the server. Add this final line to our Promise body:  request.send(JSON.stringify(data));  
*/

// Get form elements
const titleInput = document.getElementById('title');
const contentInput = document.getElementById('content');
const submitButton = document.getElementById('submit-button');

const api = 'https://us-central1-open-classrooms-js-for-the-web.cloudfunctions.net/widgets';

// Get DOM elements for showing response
const responseMessage = document.getElementById('response-message');
const responseTitle = document.getElementById('response-title');
const responseContent = document.getElementById('response-content');

submitButton.addEventListener('click', ($event) => {
  $event.preventDefault();
  const post = {
    title: titleInput.value,
    content: contentInput.value
  };
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