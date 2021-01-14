/*
1. Just inside the beginning of our Promise, create a check where, if the passed verb is POST but no data object is passed, the Promise rejects with a meaningful error message.
Hint: make the error object of type { error: string } to conform to the error types returned by the API.

2. Our makeRequest() function also fails to check if the verb it receives is valid — remember, we only want GET or POST requests. Let's add a check for that too. Create a check which will reject the Promise with a meaningful error if the verb argument is anything other than 'GET' or 'POST'. Right! Our makeRequest() function is now much more robust.

3. Let's move on to createPost(). In previous chapters, you saw that we can use try and catch to handle async/await errors. In fact, we haven't handled a single error in createPost() yet! Let's solve that now. In createPost(), we make three parallel calls, followed by one single call which relies on the success of the previous three. Therefore, we
need something along the lines of:

try {    
    // three calls    
    try {        
        // final call    
    }    
    catch (error) {        
        // handle final call error    
    }
catch (error) {    
    // handle three calls errors
}

Remembering that the error that is thrown by makeRequest() is of type { error: string }, set up try...catch blocks that follow the above structure and handle errors correctly. 
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
    
    if (verb === 'POST' && !data) {
      reject({error: 'No data object provided for POST request!'});
    }
    
    if (verb != 'POST' && verb != 'GET'){
      reject({error: 'Invalid request verb!'});
    }
    
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
  const uidPromise = makeRequest('GET', api + '/generate-uid');
  const titlePromise = makeRequest('GET', api + '/generate-title');
  const loremPromise = makeRequest('GET', api + '/generate-lorem');
  try {    
    const [uidResponse, titleResponse, loremResponse] = await Promise.all([uidPromise, titlePromise, loremPromise]);
    
    const postPromise = makeRequest('POST', api + '/create-post-with-uid', {
      uid: uidResponse.uid,
      title: titleResponse.title,
      content: loremResponse.lorem
    });
    try{
      const postResponse = await postPromise;
  
      postTitle.textContent = postResponse.post.title;
      postId.textContent = postResponse.post.id;
      postContent.textContent = postResponse.post.content;
    } catch(error){
      postTitle.textContent = error.error;
    }
  } catch(error) {
    postTitle.textContent = error.error;
  }
}

generateButton.addEventListener('click', () => {
  createPost();
});