// Create google map as basemap
var mymap = L.map('mapdiv');
mymap.setView([41.921, -73.978], 15);

var bgl_osm = L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png'),
// THIS IS AN INCORRECT API BECAUSE LONG VALUES ARE SHOWING INCORRECT AT INDIA LOCATION
    bgl_google_maps = L.tileLayer('http://{s}.google.com/vt/lyrs=s&x={x}&y={y}&z={z}',{
                        maxZoom: 20,
                        subdomains:['mt0','mt1','mt2','mt3']
});
mymap.addLayer(bgl_google_maps);

// In one line you can complete full statment
var gcp = L.marker([41.921, -73.978]).addTo(mymap).bindPopup("<h3 class='text-center'>Ground Control Point</h3><a href='https://vimana.vimanalabs.com/webng/project/0c3f1c61530f4eeeaf03e9f182898200/aoi/fea54d9e0c204322914aedb23f92471c/view/2d6f95c16c82404bbfdd2aa5f2a92e43'> <img src='img/screenshot1.jpg' width='200px'> </a>");

// Zoom to layer button action using Jquery

$("#zoomToLayer").click(function(){
    mymap.setView([41.921, -73.978], 15);
});

// Dynamic latlong event listner
mymap.on('mousemove', function(e){
    var str = "Latitude: "+e.latlng.lat.toFixed(5)+" Longitude: "+e.latlng.lng.toFixed(5)+" Zoom Level: "+mymap.getZoom();
    $("#map_coords").html(str);
});

var baseMaps = {
    "Open Street Map" : bgl_osm,
    "Google Maps" : bgl_google_maps
}

// Add GeoJSON File to map
var boat_jetty = new L.GeoJSON.AJAX('data/BOAT JETTY.geojson', 'data/BOUNDARY.geojson')
    boundary = new L.GeoJSON.AJAX('data/BOUNDARY.geojson'),
    building = new L.GeoJSON.AJAX('data/BUILDING.geojson'),
    rail_bridge = new L.GeoJSON.AJAX('data/RAIL BRIDGE.geojson'),
    stp = new L.GeoJSON.AJAX('data/STP.geojson'),
    tr_curb = new L.GeoJSON.AJAX('data/TR CURB.geojson'),
    tr_paintl = new L.GeoJSON.AJAX('data/TR PAINTL.geojson'),
    tr_paved = new L.GeoJSON.AJAX('data/TR PAVED.geojson'),
    tr_walk = new L.GeoJSON.AJAX('data/TR WALK.geojson'),
    tramway_track = new L.GeoJSON.AJAX('data/TRAMWAY TRACK.geojson'),
    utl_cbasin = new L.GeoJSON.AJAX('data/UTILITY CBASIN.geojson'),   
    utl_manhole = new L.GeoJSON.AJAX('data/UTILITY MANHOLE.geojson'),
    utl_pole = new L.GeoJSON.AJAX('data/UTILITY POLE.geojson'),
    ve_bushes = new L.GeoJSON.AJAX('data/VE BUSHES.geojson'),
    ve_forest = new L.GeoJSON.AJAX('data/VE FOREST.geojson'),
    ve_tree = new L.GeoJSON.AJAX('data/VE TREE.geojson'),
    water = new L.GeoJSON.AJAX('data/WATER.geojson')

var overlayMaps = {
    "BOAT JETTY" : boat_jetty,
    "BOUNDARY" : boundary,
    "BUILDING" : building,
    "RAIL BRIDGE" : rail_bridge,
    "STP" : stp,
    "TR CURB" : tr_curb,
    "TR_PAINTL" : tr_paintl,
    "TR PAVED" : tr_paved,
    "TR WALK" : tr_walk,
    "TRAMWAY_TRACK" : tramway_track,
    "UTILITY_CBASIN" : utl_cbasin,
    "UTILITY MANHOLE" : utl_manhole,
    "UTILITY POLE" : utl_pole,
    "VE BUSHES" : ve_bushes,
    "VE FOREST" : ve_forest,
    "VE TREE" : ve_tree,
    "WATER" : water
}
L.control.layers(baseMaps, overlayMaps).addTo(mymap)
