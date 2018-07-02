var BASE_URL = "http://gateway.marvel.com/v1/public/";
var PRIV_KEY = "YOUR_PRIV_KEY";
var PUBLIC_KEY = "YOUR_PUBLIC_KEY";

var ts = (new Date().getTime()).toString();
var hash = $.MD5(ts + PRIV_KEY + PUBLIC_KEY);
var url = (BASE_URL + "characters?ts=" + ts + "&apikey=" + PUBLIC_KEY + "&hash=" + hash + "");

var marvelCharacters = {
    render: function () {
        var message = document.getElementById("message");
        var attribution = document.getElementById("attribution");
        var marvelContainer = document.getElementById("marvel");

        $.ajax({
            url: url,
            type: "GET",

            beforeSend: function () {
                message.innerHTML = "Looading request...";
            },
            complete: function () {
                message.innerHTML = "Successfuly done!";
            },
            success: function (data) {
                attribution.innerHTML = data.attributionHTML;

                var html = "";

                html += "<div class='pictures'>";

                for (var i = 0; i < data.data.results.length; i++) {
                    var element = data.data.results[i];

                    html += "<a href='details.html' />";
                    html += "<div class='item m-1'>";
                    html += "<div class='item_description'><span class='text-center'> Character name: " + element.name + "</span></div>";
                    html += "<img id='" + i + "' src='" + element.thumbnail.path + "/standard_fantastic." + element.thumbnail.extension + "' class='thumbnail' onclick='charIndex(this.id)'/>";
                    html += "</div>";
                    html += "</a>";

                }

                html += "</div>";

                marvelContainer.innerHTML = html;
            },


            error: function () {
                message.innerHTML = "We are sorry!";
            }
        });
    }

};

marvelCharacters.render();