$(document).ready(function() {
	var dibujarGifts = function(data){
		var gif = "";
		var url = "";
		data.forEach(function(element){
			gif = element.images.downsized_large.url;
			url = element.bitly_gif_url;
			$("#elementos").append(armarTemplate(gif, url));
		});
	}
	var armarTemplate = function(gif, url){
		var t = "<div class='elemento'><img src='" + gif + "'/><a href='" + url + "'>Ver más</a></div>";
		console.log(t);
		return t;
	}
	var ajaxGif = function(gif){
		$.ajax({
			url : 'http://api.giphy.com/v1/gifs/search',
			type : 'GET',
			datatype : 'json',
			data : {
				q : gif,
				api_key : 'dc6zaTOxFJmzC'
			}
		})
		.done(function(response){
			console.log(response);
			dibujarGifts(response.data);
		})
		.fail(function(){
			console.log("error");
		})
	}
	$("#buscar-gif").click(function(event){
		console.log("Entro");
		$("#elementos").empty();
		var gif = $("#gif-text").val();
		ajaxGif(gif);
	});


///////////////////////////////////////////////
/*
	var settings = {
    "async": true,
    "crossDomain": true,
    "url": "http://pokeapi.co/api/v2/pokemon/bulbasaur/",
    "method": "GET"
   
	}

	$.ajax(settings).done(function (response) {
	    console.log(response);
	});
*/
//////////////////////////////////////////////////
/*
	var Pokedex = require('pokedex-promise-v2');
	var P = new Pokedex();

	 P.getPokemonByName('eevee') // with Promise
	    .then(function(response) {
	      console.log(response);
	    })
	    .catch(function(error) {
	      console.log('There was an ERROR: ', error);
	    });

	P.getPokemonByName(34, function(response, error) { // with callback
	      if(!error) {
	        console.log(response);
	      } else {
	        console.log(error)
	      }
	    });*/
//////////////////////////////////////////////////////


	var baseUrl = "http://pokeapi.co";
	var api = "api";
	var version = "v1";
	var resources = {
	    "pokedex":"pokedex",
	    "pokemon":"pokemon",
	    "type":"type",
	    "move":"move",
	    "ability":"ability",
	    "egg":"egg",
	    "description":"description",
	    "sprite":"sprite",
	    "game":"game"
	};
var id = "1";
var curPokemon = "";

var loading = [];



function populateSelector(pokedex)
{
    // Sort the pokemon names alphabetically since they come in in no
    // particular order in the API, and there is no number associated
    // with each entry.
    pokedex.pokemon.sort(function(a, b){
        return a.name.localeCompare(b.name);
    });
    
    for (var i = 0; i < 10/*pokedex.pokemon.length*/; i++)
    {
        var opt = $("<p>").attr("value", "/" + pokedex.pokemon[i].resource_uri);
        console.log(pokedex.pokemon[i]);
      	//var numero = pokedex.pokemon[i].entry_number;
        //var foto = $("<img>").attr("src", baseUrl + "/media/img/" + numero + ".png");
        opt.attr("class", "nombrePK");
        opt.text(pokedex.pokemon[i].name);
        $(".nombres").append(opt);
        //$(".nombres").append(foto);

        //displayPokemonFromApi($(".nombrePK").val());
        displayPokemonFromApi($(pokedex.pokemon[i].name));
     
    }


}
populateSelectorFromApi("/api/v1/pokedex/1/");

function populateSelectorFromApi(uri)
{
    
    $.getJSON(baseUrl + uri, function(data){populateSelector(data);});
}

/////////////////////


function displayPokemonFromApi(uri)
{
    
    $.getJSON(baseUrl + uri, function(data){
    	var nume = data.national_id;
    	console.log(nume);
    });
}/*

function addSpriteFromApi(uri)
{
  
    $.getJSON(baseUrl + uri, function(data){
    	$("#sprites").append($("<img>").attr("src", baseUrl + data.image));
    });
}
*/

});