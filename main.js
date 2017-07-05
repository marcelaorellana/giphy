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
	})
});