/*
 * Basic responsive mashup template
 * @owner Enter you name here (xxx)
 */
/*
 *    Fill in host and port for Qlik engine
 */
//var prefix = window.location.pathname.substr( 0, window.location.pathname.toLowerCase().lastIndexOf( "/extensions" ) + 1 );

var prefix = '/';
var config = {
	host: 'qape.moe.edu.kw',
	prefix: '/',
	port: 443,
	isSecure: true
};
require.config( {
	baseUrl: ( config.isSecure ? "https://" : "http://" ) + config.host + (config.port ? ":" + config.port : "") + config.prefix + "resources"
} );

require( ["js/qlik"], function ( qlik ) {

	// Add global error handler for resource loading errors
	window.addEventListener('error', function(e) {
		if (e.target && e.target.src && e.target.src.includes('%7B%7B')) {
			console.warn('Blocked template variable in image source:', decodeURIComponent(e.target.src));
			e.preventDefault();
		}
	}, true);

	qlik.on( "error", function ( error ) {
		$( '#popupText' ).append( error.message + "<br>" );
		$( '#popup' ).fadeIn( 1000 );
	} );


	$( "#closePopup" ).click( function () {
		$( '#popup' ).hide();
	} );

	//callbacks -- inserted here --
	//open apps -- inserted here --
	var app = qlik.openApp('abe37f96-29b3-42f3-b45c-db41d2ab1320', config);
	app.clearAll();
//var app2 = qlik.openApp('f9b1998e-382f-48f5-85e7-d3f243271899', config);
	function cs(){
		app.clearAll();
	}



//	$('.button').on('click',function(){

	//	cs();

//	})

	//get objects -- inserted here --
	//app.getObject('QV01','XvPEV'); // KPI
	//app.getObject('QV06','gcaAvv');// Map
	//app.getObject('QV04','NKQmMp'); // Student with nationality
	//app.getObject('QV03','YUetpCP');// Student with Level
	//app.getObject('QV02','NKQmMp');
	//create cubes and lists -- inserted here --
	//	document.getElementById('spinner').style.visibility = 'hidden';
	//document.getElementById('loader').style.visibility = 'hidden';
	app.getObject('QV02','HXJcjzA');
	app.getObject('QV01','pHTVjT').then(function() {
		document.getElementById('spinner').style.visibility = 'hidden';
		console.log("Removing Loaders");
		
		// Wait for sidebar to be created and then modify it with multiple attempts
		function modifySidebar(attempts) {
			if (attempts <= 0) {
				console.log("Sidebar modification failed after all attempts");
				return;
			}
			
			var sidebar = document.querySelector("#pHTVjT_content > div > div.sidebar") || 
			              document.querySelector(".sidebar") ||
			              document.querySelector("[class*='sidebar']");
			              
			if (sidebar) {
				sidebar.style.flexBasis = '150px';
				sidebar.style.minWidth = '150px';
				console.log("Sidebar modified successfully");
			} else {
				console.log("Sidebar not found, retrying... attempts left: " + (attempts - 1));
				setTimeout(function() {
					modifySidebar(attempts - 1);
				}, 500);
			}
		}
		
		// Start with 6 attempts (3 seconds total)
		setTimeout(function() {
			modifySidebar(6);
		}, 1000);
	});









} );
