$(document).ready(function(){
	

	$('#submit-button').click(function() {
	  $('#result').empty();
	  var year = $('#year').val();
	  if (year < 1903 || year > 2015) {
	  	$('#result').append("L'année entrée doit être comprise entre 1903 (première année du Tour) et 2015");
	  } else {
		  		var wikipediaHTMLResult = function(data) {
		    var readData = $('<div>' + data.parse.text["*"] + '</div>');
		    var title_value = 'Tour de France ' + year;
		    $('#wiki').append(readData);
		    //boucle for i<10 (pas propre...), si "nowrap" : balancer une version modifiée de la ligne suivante qui inclus un .children de plus
		    for (i = 0; i<10; i++){
		    	if(($("[title='" + title_value + "']")[0].parentElement.parentElement.children[1].children) == <span class="nowrap">) {
		    		console.log("nowrap found");
				}	
		    } 
		    $('#result').append("En " +year+" le gagnant du Tour de France était " + $("[title='" + title_value + "']")[0].parentElement.parentElement.children[1].children[1].text + ", le meilleur grimpeur "+$("[title='" + title_value + "']")[0].parentElement.parentElement.children[6].children[1].text + " et le meilleur sprinter "+$("[title='" + title_value + "']")[0].parentElement.parentElement.children[7].children[1].text) +".";
		  };

		  function callWikipediaAPI(wikipediaPage) {
		    // http://www.mediawiki.org/wiki/API:Parsing_wikitext#parse
		    $.getJSON('https://fr.wikipedia.org/w/api.php?action=parse&format=json&callback=?', {
		      page: wikipediaPage,
		      prop: 'text',
		      uselang: 'fr'
		    }, wikipediaHTMLResult);
		  }
		  callWikipediaAPI('Palmarès du Tour de France');
		  }

	});
})	