/*
1. Let's start building our onreadystatechange function. Add the following just after the declaration of apiRequest: apiRequest.onreadystatechange = () => {};.

2. Seeing as we only want to access the response data if we are sure it has arrived, we shall only execute code if the request's readyState is 4. Add the following if statement, which will contain all of our logic: if (apiRequest.readyState === 4) {}.

3. Now we know that the request's response object is populated. The openweathermap.org API returns JSON, but our request object receives it as text. We therefore have to parse it to make it a useable object in our JavaScript code.Add this line (inside our if statement, of course) to capture the server response:  const response = JSON.parse(apiRequest.response); .

4. The response constant now contains the full object returned by the server. Let's now extract the information we need and show it in the DOM. We are going to extract the name of the city and the main weather description. As per the openweather.org documentation, we will extract the name value for the city name and the weather[0].description value for the weather description. Set the report section's text content with the following line:
reportSection.textContent = 'The weather in ' + response.name + ' is ' + response.weather[0].main + '.';. Enter your city and watch it work!

5. However, there is a common error case we have not dealt with. What happens if the user enters a city that is not in openweathermap.org's database? From the API's point of view, if it receives a request for a city it does not recognize, it returns a 404 error. But that's awesome news! We can check for 404 errors and print an error message! Before declaring the response constant, add an if statement that checks apiRequest.status. If it is 404, set the report section's text content to an error message and make sure the rest of the function is not executed.
*/


// Access DOM elements
const reportSection = document.getElementById('weather-report');
const cityForm = document.getElementById('city-form');
const cityInput = document.getElementById('city');

// Prepare openweathermap.org request
let apiRequest = new XMLHttpRequest();

/* 
 * Capture and handle form submit event
 * Prevent default behaviour, prepare and send API request
*/
cityForm.addEventListener('submit', ($event) => {
  $event.preventDefault();
  const chosenCity = cityInput.value;
  apiRequest.open('GET', 'https://api.openweathermap.org/data/2.5/weather?q=' + chosenCity + '&APPID=b34fddd3dae4a2eb0ad363b62f98ba1e');
  apiRequest.send();
});

apiRequest.onreadystatechange = () => {
  if(apiRequest.readyState === 4) {
    if(apiRequest.status === 404 ){
      return reportSection.textContent = 'City not found!';
    }
    const response = JSON.parse(apiRequest.response);
    reportSection.textContent = 'The weather in ' + response.name + ' is ' + response.weather[0].main + '.';
  }
}