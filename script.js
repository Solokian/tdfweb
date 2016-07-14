$(document).ready(function(){ //Attendre que la page soit chargée
	

	$('#submit-button').click(function(e) { //Lors d'un clic sur le bouton
	  e.preventDefault(); // Empêche la page de recharger quand on clique (comportement de base avec Bootstrap)
	  $('#result').empty(); // Vide le texte de ce paragraphe pour que les results ne s'empilent pas

	  var year = $('#year').val(); // récupère la valeur entrée

	  if (year < 1903 || year > 2015) { // vérifie que la valeur entrée est bien une année valide
	  	$('#result').append("L'année entrée doit être comprise entre 1903 (première année du Tour) et 2015");

	  } else if (year == 1915 || year == 1916 || year == 1917 || year == 1918 || year == 1940 || year == 1941 || year == 1942 || year == 1943 || year == 1944 || year == 1945 || year == 1946){ // gère les exceptions des première et seconde guerres mondiales où le Tour n'a pas eu lieu
	  	// (year >1914 && year <1919) || (year >1939 || year < 1947)
	  	
	  	$('#result').append("Entre 1915 et 1918, puis entre 1940 et 1946, les deux guerres mondiales ont malheureusement empêché la tenue du Tour de France.");

	  } else { // Dans tous les autres cas
		  	var wikipediaHTMLResult = function(data) {
		    	var readData = $('<div>' + data.parse.text["*"] + '</div>');
		    	var title_value = 'Tour de France ' + year;
		    	$('#wiki').append(readData); // charge toute la page dans le HTML
		     
			
		    //Pour pouvoir aiguiller l'affichage après
		    var gagnant_flag = true;
		    var grimpeur_flag = true;
		    var sprinter_flag = true;

		    if (year == 1999 || year == 2000 || year == 2001 || year == 2002 || year == 2003 || year == 2004 || year == 2005){ // exception pour les années où le titre a été retiré à Armstrong
		    	gagnant_flag = false; 
	  		}

	  		//gestion des exceptions gagnants
		    var gagnant = $("[title='" + title_value + "']")[0].parentElement.parentElement.children[1].children[1];
		    if (year == 1959){ // exception : le nom du gagnant est sous une balise (nowrap) supplémentaire cette année là
		    	gagnant = $("[title='Tour de France 1959']")[0].parentElement.parentElement.children[1].children[0].children[1];
		    }

		    //gestion des exceptions grimpeurs
		    var grimpeur = $("[title='" + title_value + "']")[0].parentElement.parentElement.children[6].children[1];
		    if (year == 1954){ // exception : le nom du grimpeur est sous une balise (nowrap) supplémentaire cette année là
		    	console.log(" if 1954");
		    	gagnant = $("[title='Tour de France 1959']")[0].parentElement.parentElement.children[6].children[0].children[1];
		    }
		    if (year < 1933){ // si le titre de grimpeur n'existait pas encore cette année
		    	grimpeur_flag = false;
		    }

		    //gestion des exceptions sprinter
		    var sprinter = $("[title='" + title_value + "']")[0].parentElement.parentElement.children[7].children[1];
		    if (year < 1953){ // si le titre de sprinter n'existait pas encore cette année
		    	sprinter_flag = false;
		    }
		    if (year == 1991){ // exception : le nom du grimpeur est sous une balise (nowrap) supplémentaire cette année là
		    	gagnant = $("[title='Tour de France 1959']")[0].parentElement.parentElement.children[7].children[0].children[1];
		    }

		    if (grimpeur_flag && sprinter_flag && grimpeur_flag){ // si les trois titres existaient cette année
				$('#result').append("En " +year+" le gagnant du Tour de France était " + gagnant.text + ", le meilleur grimpeur "+grimpeur.text + " et le meilleur sprinter "+sprinter.text +".");

		    } else if (grimpeur_flag && sprinter_flag && !gagnant_flag){ // si les trois titres existaient cette année, mais année Armstrong
				$('#result').append("En " +year+" le titre de gagnant du Tour de France de Lance Armstrong a été révoqué par l'union cycliste internationale pour dopage, le meilleur grimpeur était  "+grimpeur.text + " et le meilleur sprinter "+sprinter.text +".");

		    } else if (grimpeur_flag && !sprinter_flag){ // si le titre de grimpeur existait cette année là, mais pas celui de sprinter
				$('#result').append("En " +year+" le gagnant du Tour de France était " + gagnant.text + " et le meilleur grimpeur "+grimpeur.text + ". Il n'y avait pas encore de meilleur sprinter cette année, le premier maillot vert datant de 1953.");

		    } else { // si il n'y avait que le titre de gagnant cette année là
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