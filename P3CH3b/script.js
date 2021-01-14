/*
1. Create an async function called createPost(). Here are the API endpoints we will be needing:
- GET /generate-uid — returns { uid: string }
- GET /generate-title — returns { title: string }
- GET /generate-lorem — returns { lorem: string }
- POST /create-post-with-uid
  requires { uid: string, title: string, content: string }
  returns { message: string, post: { id: string, title: string, content: string } }

2. Create three Promises — uidPromise, titlePromise and contentPromise — using the makeRequest() function and passing it the 'GET' verb and the appropriate URLs.

3. The Promise.all method takes an array of Promises as an argument, and returns an array containing the resolved values of each Promise. We could do this:
- const responses = await Promise.all([uidPromise, titlePromise, contentPromise]);
However, that would give us a responses array, leading to less readable code (what exactly is responses[2]?). Instead, we'll use destructuring syntax. Add the following line:
- const [uidResponse, titleResponse, contentResponse] = await Promise.all([uidPromise, titlePromise, contentPromise]);
This creates separate named constants for each resolved Promise whilst still leveraging Promise.all. Pretty awesome, right?

4. Now we need to collate the various responses to create our final POST request. Don't forget: each resolved Promise currently contains the object returned by the server, not just the text. Looking back at the API docs, create a Promise called postPromise using makeRequest(), passing the verb POST, the correct URL, and the required kind of data object, containing the data extracted from the previous three requests.

5. Now, using await, create a constant called post to hold the POST request's response data.

6. Finally, extract the blog post data from post and display it in the DOM, in the text content of postTitle, postId and postContent.

7. Now all we need to do is hook up our button! Add a click event listener to our Generate Post button and use it to call createPost(). Hit Show result, click the Generate Post button and see what happens!
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


async function createPost() {
  const uIdPromise = makeRequest('GET', api + '/generate-uId');
  const titlePromise = makeRequest('GET', api + '/generate-title');
  const lorenPromise = makeRequest('GET', api + '/generate-loren');
  
  const [uidResponse, titleResponse, contentResponse] = await Promise.all([uidPromise, titlePromise, contentPromise]);
  
  const postPrimise = mekeRequest('POST', api + '/create-post-with-uId', {
    uId: uIdResponse.uId,
    title: titleResponse.title,
    content: lorenResponse.loren
  });
  
  const postResponse = await postPromise;
  
  postTitle.textContent = postResponse.post.title;
  postId.textContent = postResponse.post.id;
  postContent.textContent = postResponse.post.content;
}

generateButton.addEventListener('click', () => {
  createPost();
});