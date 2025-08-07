var prefix = '/';
var config = {
    host: 'qape.moe.edu.kw',
    prefix: '/',
    port: 443,
    isSecure: true
};
require.config({
    baseUrl: (config.isSecure ? "https://" : "http://") + config.host + (config.port ? ":" + config.port : "") + config.prefix + "resources"
});

require(["js/qlik"], function (qlik) {

    // Show spinner initially
    document.getElementById('spinner').style.visibility = 'visible';
    document.getElementById('spinner').style.display = 'block';

    qlik.on("error", function (error) {
        $('#popupText').append(error.message + "<br>");
        $('#popup').fadeIn(1000);
    });

    $("#closePopup").click(function () {
        $('#popup').hide();
    });

    var app = qlik.openApp('abe37f96-29b3-42f3-b45c-db41d2ab1320', config);
    
    app.clearAll();

    function cs() {
        app.clearAll();
    }

   // $('.button').on('click', function () {
   //     cs();
//		console.log("clear button pressed");
  //  });

    app.getObject('QV02', 'HXJcjzA');
    
    // Get the map object and hide spinner when it's loaded
    app.getObject('QV01', 'pHTVjT').then(function() {
        // Hide spinner when map is loaded
        document.getElementById('spinner').style.visibility = 'hidden';
        document.getElementById('spinner').style.display = 'none';
        console.log("Map loaded, removing spinner");
    });

});
