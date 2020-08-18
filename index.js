'use strict';

const searchUrl = 'https://developer.nps.gov/api/v1/parks?statecode='
const apiKey= 'zE96KJfgMk1ygjwhNzWLWBYyRCkeCDQqq0BG6Exa'

function getParks(state, maxResult){
  
  let totalUrl = searchUrl + state + '&api_key='+ apiKey + "&limit=" + maxResult
  console.log(totalUrl)
  fetch(totalUrl)
    .then(response => {
      if (response.ok) {
        return response.json();
      }
      throw new Error(response.statusText);
    })
    .then(responseJson => displayResults(responseJson))
    .catch(err => {
      $('#error-message').text(`Something went wrong: ${err.message}`);
    });
}

function displayResults(responseJson){
  //console.log(responseJson)
  $('#results-list').html("")
  for(let i = 0; i<responseJson.data.length; ++i){
    console.log(responseJson.data[i].images)
    $('#results-list').append('<li><a href="' +responseJson.data[i].url + '">'+responseJson.data[i].name+'</a><img src="'+responseJson.data[i].images[0].url+'"><p>'+responseJson.data[i].description+'</p></li>')
  }

  

}

function submit() {
  $('form').submit(event => {
    event.preventDefault();
    
    const state = $('#search-state').val();
    const maxResult = $('#max-num').val();
    console.log('started')
   
    getParks(state, maxResult);
  });
}

$(submit);