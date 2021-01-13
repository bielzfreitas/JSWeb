/*
1. Add a listener for cityForm's submit event that prevents the default behavior.

2. Add a constant chosenCity to the listener, containing the value entered in the city input field.

3. Now add the following two calls to the listener
*/






// Access DOM elements
const reportSection = document.getElementById('weather-report');
const cityForm = document.getElementById('city-form');
const cityInput = document.getElementById('city');

let apiRequest = new XMLHttpRequest();

cityForm.addEventListener('submit', ($event) =>{
  $event.preventDefault();
  const chosenCity = cityInput.value;
  apiRequest.open('GET', 'https://api.openweathermap.org/data/2.5/weather?q=' + chosenCity + '&APPID=b34fddd3dae4a2eb0ad363b62f98ba1e');  apiRequest.send();
});