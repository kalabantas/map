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
	host: 'qapa.moe.edu.kw',
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

	// Handle unhandled promise rejections (like storage corruption)
	window.addEventListener('unhandledrejection', function(e) {
		if (e.reason && e.reason.message && e.reason.message.includes('sstable')) {
			console.warn('Storage corruption detected, attempting to clear cache...');
			// Try to clear problematic storage
			try {
				localStorage.clear();
				sessionStorage.clear();
				if ('caches' in window) {
					caches.keys().then(function(names) {
						names.forEach(function(name) {
							caches.delete(name);
						});
					});
				}
				console.log('Cache cleared, please refresh the page');
			} catch (err) {
				console.warn('Could not clear cache automatically:', err);
			}
			e.preventDefault();
		}
	});

	qlik.on( "error", function ( error ) {
		$( '#popupText' ).append( error.message + "<br>" );
		$( '#popup' ).fadeIn( 1000 );
	} );


	$( "#closePopup" ).click( function () {
		$( '#popup' ).hide();
	} );

	//callbacks -- inserted here --
	//open apps -- inserted here --
	var app = qlik.openApp('e45e93fb-2ef9-432a-8c7a-5ddeaced8018', config);
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
		
		// Enhanced marker styling - monitor for new markers and style them
		function enhanceMapMarkers() {
			// Look for markers in the map
			var markers = document.querySelectorAll('.leaflet-marker-icon, .qv-map-marker, [class*="marker"]');
			markers.forEach(function(marker) {
				if (!marker.classList.contains('enhanced-marker')) {
					marker.classList.add('enhanced-marker');
					// Apply 3x scaling
					marker.style.transform = 'scale(3)';
					marker.style.transformOrigin = 'bottom center';
					marker.style.zIndex = '1000';
					
					// Add school icon
					if (!marker.querySelector('.school-icon')) {
						var schoolIcon = document.createElement('div');
						schoolIcon.className = 'school-icon';
						schoolIcon.innerHTML = '🏫';
						schoolIcon.style.cssText = `
							position: absolute;
							top: 0;
							left: 0;
							width: 100%;
							height: 100%;
							display: flex;
							align-items: center;
							justify-content: center;
							font-size: 16px;
							z-index: 1001;
							pointer-events: none;
						`;
						marker.appendChild(schoolIcon);
					}
				}
			});
		}
		
		// Monitor for new markers being added
		var mapContainer = document.querySelector('#pHTVjT_content');
		if (mapContainer) {
			var observer = new MutationObserver(function(mutations) {
				mutations.forEach(function(mutation) {
					if (mutation.addedNodes.length > 0) {
						setTimeout(enhanceMapMarkers, 100);
					}
				});
			});
			
			observer.observe(mapContainer, {
				childList: true,
				subtree: true
			});
			
			// Initial enhancement
			setTimeout(enhanceMapMarkers, 2000);
			
			// Periodic enhancement for any missed markers
			setInterval(enhanceMapMarkers, 3000);
		}
	});









} );
