var BASE_URL = "http://gateway.marvel.com/v1/public/";
var PRIV_KEY = "YOUR-PRIVATE-KEY";
var PUBLIC_KEY = "YOUR-PUBLIC-KEY";

var ts = (new Date().getTime()).toString();
var hash = $.MD5(ts + PRIV_KEY + PUBLIC_KEY);

var marvel = {
	render: function() {
		
		var url = (BASE_URL + "characters?ts=" + ts + "&apikey=" + PUBLIC_KEY + "&hash=" + hash + "");

		var message = document.getElementById("message");
		var message = document.getElementById("footer");
		var marvelContainer = document.getElementById("marvel");


		$.ajax({
			url : url,
			type: "GET",

			beforeSend : function() {
				message.innerHTML = "Looading...";
			},
			complete : function() {
				message.innerHTML = "Successfuly done!";
			},
			success : function(data) {
				footer.innerHTML = data.attributionHTML;
				var html = "";

				html += "<div class='pictures'>";

					for (var i = 0; i < data.data.results.length; i++) {
						var element = data.data.results[i];

						//html += "	<a href='" + element.urls[0].url + " 'target='_BLANK' />";

						html += "<div class='item m-1'>";
						html += "	<div class='item_description'><span class='text-center'> Character name: " + element.name + "</span></div>";
						html += "	<img id='" + element.id + "' src='" + element.thumbnail.path + "/portrait_fantastic." + element.thumbnail.extension + "'/>";
						html += "</div>";
						//html += "	</a>";

					}

				html += "</div>";

				marvelContainer.innerHTML = html;
			},

			error : function() {
				message.innerHTML = "We are sorry!";
			}
		});		
	}

};

marvel.render();