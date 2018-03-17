// create a variable for the endpoint
const YOUTUBE_SEARCH_URL = "https://www.googleapis.com/youtube/v3/search";

// get the data from YouTube API
function getDataFromApi(searchTerm, callback) {
  // create settings for the search
  const settings = {
    data: {
      q: `${searchTerm} in:name`,
      per_page: 5,
      part: 'snippet',
      key: 'AIzaSyCoxr8NGrAVQzsCoR0fBURiZb9TF-4reTY'
    },
    dataType: 'json',
    type: 'GET',
    success: callback
  };
  // perform an asynchronous HTTP request
  $.ajax(YOUTUBE_SEARCH_URL, settings);
}
  
// render results 
function renderResults(result) {
  return `
  <div class="video-result">
    <h4>${result.snippet.title}</h4>
    <a href="https://www.youtube.com/watch?v=${result.id.videoId}" target="_blank"><img src="${result.snippet.thumbnails.medium.url}"></a>
  </div>`;
}

// render how many results
function renderAmountOfResults(result) {
  let amountOfResults = `
    <h3>Showing ${result.pageInfo.resultsPerPage} out of ${result.pageInfo.totalResults} results</h3>`;
  $('.amount-of-results').prop('hidden', false);
  $('.amount-of-results').html(amountOfResults);
}

// display results onto webpage
function displayYouTubeResults(data) {
  const results = data.items.map((item, index) => renderResults(item));
  $('.js-search-results').prop('hidden', false);
  $('.js-search-results').html(results);
}

function loadResults(data) {
  renderAmountOfResults(data);
  displayYouTubeResults(data);
}

// make the submit button work 
  // listen for submit event
  function watchSubmit() {
  $('.js-search-form').on('submit', event => {
    event.preventDefault();
    // get the value of the user's input
    const queryTarget = $(event.currentTarget).find('.js-query');
    // create a variable for the user's input
    const query = queryTarget.val();
    console.log(queryTarget.val());
    // clear the input
    queryTarget.val("");
    // call the function that gets YouTube data using parameters of user's input and callback function to display results
    getDataFromApi(query, loadResults);
  });
}

$(watchSubmit);


// NOTES

// $("#search-form").on("submit", handleSubmit);

// handle submit button
// function handleSubmit(event) {
//   console.log("handleSubmit");
//   $.ajax("https://www.googleapis.com/youtube/v3/search?q=nkotb&key=AIzaSyBUUv_ZsGl4_vEtgTA1B25PIQJ6AZf9w6s&part=snippet", {
//     success: function(response) {
//       console.log('response: ', response);
//       //
//     }
//   });
// }



// fetch("https://www.googleapis.com/youtube/v3/search?q=nkotb&key=AIzaSyBUUv_ZsGl4_vEtgTA1B25PIQJ6AZf9w6s&part=snippet")
//   .then(function(response) {
//     return response.json()
//   })
//   .then(function(json) {
//     console.log('response: ', json)
//   })
