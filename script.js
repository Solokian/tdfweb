$(document).ready(function(){
	

	$('#submit-button').click(function(e) {
	  e.preventDefault();
	  $('#result').empty();

	  var year = $('#year').val();

	  if (year < 1903 || year > 2015) {
	  	$('#result').append("L'année entrée doit être comprise entre 1903 (première année du Tour) et 2015");

	  } else if ((year >1914 && year <1919) || (year >1939 || year < 1947)){
	  	console.log ("else if entré, year= " +year);
	  	$('#result').append("Entre 1915 et 1918, puis entre 1940 et 1946, les deux guerres mondiales ont malheureusement empêché la tenue du Tour de France.");

	  } else {
		  	var wikipediaHTMLResult = function(data) {
		    	var readData = $('<div>' + data.parse.text["*"] + '</div>');
		    	var title_value = 'Tour de France ' + year;
		    	$('#wiki').append(readData);
		     
			
		    //Pour pouvoir aiguiller l'affichage après
		    var gagnant_flag = true;
		    var grimpeur_flag = true;
		    var sprinter_flag = true;

		    if (year == 1999 || year == 2000 || year == 2001 || year == 2002 || year == 2003 || year == 2004 || year == 2005){ // exception pour les années où le titre a été retiré à Armstrong
		    	gagnant_flag = false; 
	  		}


		    var gagnant = $("[title='" + title_value + "']")[0].parentElement.parentElement.children[1].children[1];
		    if (year === "1959"){ // exception : le nom du gagnan est sous une balise (nowrap) supplémentaire cette année là
		    	gagnant = $("[title='Tour de France 1959']")[0].parentElement.parentElement.children[1].children[0].children[1];
		    }

		    var grimpeur = $("[title='" + title_value + "']")[0].parentElement.parentElement.children[6].children[1];
		    if (year < 1933){
		    	grimpeur_flag = false;
		    }
		    var sprinter = $("[title='" + title_value + "']")[0].parentElement.parentElement.children[7].children[1];

		    if (year < 1953){
		    	sprinter_flag = false;
		    }

		    // css bootstrap pour faire plus joli bootstrap.css ou bootstrap.style.css
		    if (grimpeur_flag && sprinter_flag && grimpeur_flag){
				$('#result').append("En " +year+" le gagnant du Tour de France était " + gagnant.text + ", le meilleur grimpeur "+grimpeur.text + " et le meilleur sprinter "+sprinter.text +".");

		    } else if (grimpeur_flag && sprinter_flag && !grimpeur_flag){
				$('#result').append("En " +year+" le titre de gagnant du Tour de France de Lance Armstrong a été révoqué par l'union cycliste internationale pour dopage, le meilleur grimpeur était  "+grimpeur.text + " et le meilleur sprinter "+sprinter.text +".");

		    } else if (grimpeur_flag && !sprinter_flag){
				$('#result').append("En " +year+" le gagnant du Tour de France était " + gagnant.text + " et le meilleur grimpeur "+grimpeur.text + ". Il n'y avait pas encore de meilleur sprinter cette année, le premier maillot vert datant de 1953.");

		    } else {
		    	$('#result').append("En " +year+" le gagnant du Tour de France était " + gagnant.text + ". Il n'y avait pas de meilleur grimpeur puisque le premier maillot à pois date de 1953. Idem pour le maillot vert de meilleur sprinter, qui date lui de 1933.");


		    }
		  };
		  // mettre chaque vainqueur dans un div different
		  //font awesome.io : mets des icones 

		  function callWikipediaAPI(wikipediaPage) {
		    // http://www.mediawiki.org/wiki/API:Parsing_wikitext#parse
		    $.getJSON('https://fr.wikipedia.org/w/api.php?action=parse&format=json&callback=?', {
		      page: wikipediaPage,
		      prop: 'text',
		      uselang: 'fr'
		    }, wikipediaHTMLResult);
		  } callWikipediaAPI('Palmarès du Tour de France');
		  }
		  
		}
	);

})	