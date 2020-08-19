'use strict';

const searchUrl = 'https://developer.nps.gov/api/v1/parks?'
const apiKey= 'zE96KJfgMk1ygjwhNzWLWBYyRCkeCDQqq0BG6Exa'

function getParks(state, maxResult){
  
  let stateCodeGen = []

  for(let i = 0; i<state.length; ++i){
    stateCodeGen.push('statecode=' + state[i])
  }

  stateCodeGen = stateCodeGen.join('&')

  console.log(stateCodeGen)

  let totalUrl = searchUrl + stateCodeGen + '&api_key='+ apiKey + "&limit=" + maxResult
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

  

  if(responseJson.data.length<1){
    $('#error-message').text('No parks found. Maybe your abreviation was wrong?')
  }

  for(let i = 0; i<responseJson.data.length; ++i){
    
    $('#results-list').append('<li><a href="' +responseJson.data[i].url + '">'+responseJson.data[i].fullName+'</a><img src="'+responseJson.data[i].images[0].url+'"><p>'+responseJson.data[i].description+'</p></li>')
  }

  

}

function submit() {
  $('form').submit(event => {
    event.preventDefault();
    
    $('#error-message').text('')

    let state = $('#search-state').val();
    state= state.split(", ")

    const maxResult = $('#max-num').val();
    console.log('started ' + state.length)

    $('#results-list').html("<h4>Search started. Loading results now.</h4>")

    getParks(state, maxResult);
  });
}

$(submit);
