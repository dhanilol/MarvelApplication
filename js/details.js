var BASE_URL = "http://gateway.marvel.com/v1/public/";
var PRIV_KEY = "YOUR_PRIV_KEY";
var PUBLIC_KEY = "YOUR_PUBLIC_KEY";

var ts = (new Date().getTime()).toString();
var hash = $.MD5(ts + PRIV_KEY + PUBLIC_KEY);
var url = (BASE_URL + "characters?ts=" + ts + "&apikey=" + PUBLIC_KEY + "&hash=" + hash + "");

var characterDetail = {
    render: function () {
        var message = document.getElementById("message");
        var attribution = document.getElementById("attribution");
        var characterContainer = document.getElementById("details");

        $.ajax({
            url: url,
            type: "GET",

            beforeSend: function () {
                message.innerHTML = "Looading character details...";
            },
            complete: function () {
                message.innerHTML = "Successfuly done!";
            },
            success: function (data) {
                attribution.innerHTML = data.attributionHTML;

                var html = "";
                var i = localStorage.getItem("indice");
                var element = data.data.results[i];

                html += "<div style='overflow: hidden; margin-top: 50px;'>";
                    html += "<div style='float: left; margin-right: 50px;'>";
                        html += "<img src='" + element.thumbnail.path + "/standard_fantastic." + element.thumbnail.extension + "'/>";
                    html += "</div>";
                    html += "<div style='margin-left: 50px;'>"
                        html += "<h2 class='character-name'>Hero name: <a href=" + element.urls[1].url + ">"+ element.name +"</a></h2>";
                        html += "<p>";
                        html += "<b>DESCRIPTION:</b>";
                        html += "<br />";
                        html += element.description;
                        html += "</p>";
                    html += "</div>";
                    html += "<div class='wiki'>";
                    html += "<h5>To know more about this character access the <a href=" + element.urls[1].url + " target='_BLANK'>"+ element.name +" Wiki </a></h5>";
                    html += "</div>";
                html += "</div>";
                
                characterContainer.innerHTML = html;
            },
            
            error: function () {
                message.innerHTML = "We are sorry!";
            }
        });
    }

};

characterDetail.render();