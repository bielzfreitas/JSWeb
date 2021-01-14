/*
1. Create a new function called makeRequest() which accepts a verb, a URL and a data object as arguments and returns a Promise.

2. Create an XMLHttpRequest object called request, and call its open() method, passing the verb and url arguments from the overall function call.

3. Implement our request's onreadystatechange function. Status codes 200 and 201 are success codes, anything else is an error — remember, this only matters for a ready state of 4. For a successful request, the Promise will resolve with the response as an object. For an unsuccessful one, it will reject with the response as an object.

4. If the request type is 'POST', set the request's Content-Type header to application/json and send the request with the stringified data object. Otherwise, simply send the request. 

5. Check your makeRequest() function with the screencast.
*/


// Get DOM elements
const generateButton = document.getElementById('generate-button');
const postTitle = document.getElementById('post-title');
const postId = document.getElementById('post-id');
const postContent = document.getElementById('post-content');

// API URL
const api = 'https://us-central1-open-classrooms-js-for-the-web.cloudfunctions.net/widgets';

function makeRequest(verb, url, data) {
  return new Promise((resolve, reject) => {
    let request = new XMLHttpRequest();
    request.open(verb, url);
    request.onreadystatechange = () => {
      if (request.readyState === 4) {
        if (request.status === 200 || request.status === 201) {
          resolve(JSON.parse(request.response));
        } else {
          reject(JSON.parse(request.response));
        }
      }
    };
    if (verb === 'POST') {
      request.setRequestHeader('Content-Type', 'application/json');
      request.send(JSON.stringify(data));
    } else {
      request.send();
    }
  });
}