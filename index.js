'use strict';

const YOUTUBE_SEARCH_URL = 'https://www.googleapis.com/youtube/v3/search';

function buildApi(searchTerm, callback) { //line 6-10 is expected from YouTube API
	const params = {
		q: `${searchTerm}`,
		key: 'AIzaSyCVlB6YVx8bmr39hDBtjRShPBg3PB6qgXs',
		part: 'snippet', //required
		maxResults: 6
	}
	$.getJSON(YOUTUBE_SEARCH_URL, params, callback) // Load JSON-encoded data from the server using a GET HTTP request
};

function showResults(result){ //a diff item each time
	return `
		<div class="col-sm-4 thumb" style="padding-left: 0px; padding-right: 0px;">
			<a href="https://www.youtube.com/watch?v=${result.id.videoId}"><img class="js-img" src="${result.snippet.thumbnails.medium.url}"></a>
			<div class="col-sm-4">
				<p class="channel"><a href="https://www.youtube.com/watch?v=${result.snippet.channelId}">More videos by ${result.snippet.channelTitle}<p>
			</div>
		</div>
		`
}

function renderLoaders(item){
	return `
		<div>
			<button>Next Page</button>
		</div>
	`
}

//getData happens for each item we come across
function getData(data){ //data is anonymous API object
	console.log(data); //so we can see the object we get from API
	const results = data.items.map((item) => showResults(item)); //grab data in items object. map thru, pass to showResults
	$('.js-results').html(results); //render on page in empty div using results const
	// const nextPage = data.nextPageToken.val();
	// $('.js-nextPage').html(nextPage); //next page key from object
}

function listenSubmit(){ //on submit, get value from search field, run function
	$('.js-search-form').submit(event => {
		event.preventDefault();
		const searchTarget = $(event.currentTarget).find('.js-searchBox'); //tell it what to look at from js-searchBox
		const search = searchTarget.val(); //store val of .js-search-box
		searchTarget.val(""); //clear input field
		buildApi(search, getData); //plug search into func, run another func
	});
};

/////////////////////// using for loop instead of map
// function getData(data){
// 	var results = [];
// 	for (i = 0; i < data.items.length; i++){
// 		var result = showResults(data.items[i]);
// 		results.push(result);
// 	}
// }
//////////////////////

$(listenSubmit);