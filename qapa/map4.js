var prefix = '/';
var config = {
    host: 'qapa.moe.edu.kw',
    prefix: '/',
    port: 443,
    isSecure: true
};

// Optimize RequireJS configuration
require.config({
    baseUrl: (config.isSecure ? "https://" : "http://") + config.host + (config.port ? ":" + config.port : "") + config.prefix + "resources",
    waitSeconds: 30, // Increase timeout for slower connections
    enforceDefine: false
});

// Use DOMContentLoaded for faster initialization
document.addEventListener('DOMContentLoaded', function() {
    require(["js/qlik"], function (qlik) {

        // Show spinner initially
        const spinner = document.getElementById('spinner');
        if (spinner) {
            spinner.style.visibility = 'visible';
            spinner.style.display = 'block';
        }

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

        // Load objects in parallel for better performance
        Promise.all([
            app.getObject('QV02', 'HXJcjzA'),
            app.getObject('QV01', 'pHTVjT')
        ]).then(function() {
            // Hide spinner when both objects are loaded
            if (spinner) {
                spinner.style.visibility = 'hidden';
                spinner.style.display = 'none';
            }
            console.log("All objects loaded, removing spinner");
        }).catch(function(error) {
            console.error("Error loading objects:", error);
            if (spinner) {
                spinner.style.visibility = 'hidden';
                spinner.style.display = 'none';
            }
        });

    });
});
