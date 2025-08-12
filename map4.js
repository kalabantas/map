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

    // Enhanced map marker styling system
    function enhanceMapMarkers() {
        // Apply CSS styling to existing markers
        const markerSelectors = [
            '.qv-map-marker',
            '.leaflet-marker-icon',
            '.marker',
            '[class*="marker"]',
            '.qv-object-map .leaflet-marker-icon'
        ];
        
        markerSelectors.forEach(selector => {
            const markers = document.querySelectorAll(selector);
            markers.forEach(marker => {
                if (marker && !marker.classList.contains('enhanced-marker')) {
                    marker.style.transform = 'scale(3)';
                    marker.style.transformOrigin = 'bottom center';
                    marker.style.zIndex = '1000';
                    marker.classList.add('enhanced-marker');
                    console.log('Enhanced marker:', marker);
                }
            });
        });
    }

    // Set up MutationObserver to detect new markers
    function setupMarkerObserver() {
        if (typeof MutationObserver !== 'undefined') {
            const observer = new MutationObserver(function(mutations) {
                mutations.forEach(function(mutation) {
                    if (mutation.type === 'childList' && mutation.addedNodes.length > 0) {
                        // Check if any added nodes are markers or contain markers
                        mutation.addedNodes.forEach(function(node) {
                            if (node.nodeType === 1) { // Element node
                                // Check if the node itself is a marker
                                if (node.classList && (
                                    node.classList.contains('leaflet-marker-icon') ||
                                    node.classList.contains('qv-map-marker') ||
                                    node.className.includes('marker')
                                )) {
                                    setTimeout(enhanceMapMarkers, 100);
                                }
                                // Check if the node contains markers
                                const containsMarkers = node.querySelector && (
                                    node.querySelector('.leaflet-marker-icon') ||
                                    node.querySelector('.qv-map-marker') ||
                                    node.querySelector('[class*="marker"]')
                                );
                                if (containsMarkers) {
                                    setTimeout(enhanceMapMarkers, 100);
                                }
                            }
                        });
                    }
                });
            });

            // Observe the entire document for marker changes
            observer.observe(document.body, {
                childList: true,
                subtree: true,
                attributes: false
            });

            console.log('Map marker observer initialized');
        }
    }

    // Initialize marker enhancement system
    function initializeMarkerEnhancement() {
        // Initial enhancement
        enhanceMapMarkers();
        
        // Set up observer for dynamic markers
        setupMarkerObserver();
        
        // Periodic enhancement (fallback)
        setInterval(enhanceMapMarkers, 2000);
        
        console.log('Map marker enhancement system initialized');
    }

    // Start marker enhancement when DOM is ready
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', initializeMarkerEnhancement);
    } else {
        initializeMarkerEnhancement();
    }

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
