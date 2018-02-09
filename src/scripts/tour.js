// Author: Joakim Syk <joakim@virali.se>

var vtour_panoramacafecusco;
var vtour_timercafecusco;
if (typeof (vtour_mode) == "undefined") {
    var vtour_mode = "undefined";
}
var vtour_incrementcafecusco = 0.05;
var vtour_intervalcafecusco = 30;
var vtour_panoidcafecusco = "9BeLpND8JyMAAAAGOnuEAA";
var vtour_latitudecafecusco = 37.2295685;
var vtour_longitudecafecusco = -93.2907944;
var vtour_zoomcafecusco = 1.1;
var vtour_chevronscafecusco = true;
var vtour_closebuttoncafecusco = false;
var vtour_click2gocafecusco = false;
var vtour_addresscafecusco = "";
var vtour_pancafecusco = "";
var vtour_doubleClickZoomcafecusco = false;
var vtour_imageDateControlcafecusco = false;
var vtour_scrollwheelcafecusco = false;
var vtour_zoom_poscafecusco = "";
var vtour_zoom_sizecafecusco = "0";
var vtour_zoom_startcafecusco = 1.1;
var vtour_fullscreencafecusco = false;
var vtour_fullscreen_widthcafecusco;
var vtour_fullscreen_heightcafecusco;

function vtour_init_glcafecusco() {
    if (vtour_mode == "webgl") {
        var c = document.getElementsByTagName("canvas").item(0);
        if (c) {
            c.addEventListener("webglcontextrestored", function () {
                vtour_spinItcafecusco();
            }, false);
        }
    }
}

function vtour_initcafecusco() {

    if (vtour_mode == "undefined") {
        vtour_mode = "html4";
        if (window.WebGLRenderingContext) {
            var testCanvas = document.createElement("canvas");
            if (testCanvas) {
                //vtour_mode = "html5";
                document.getElementsByTagName("body").item(0).appendChild(testCanvas);
                var webgl_names = new Array();
                webgl_names.push("webgl");
                webgl_names.push("experimental-webgl");
                webgl_names.push("moz-webgl");
                webgl_names.push("webkit-3d");
                for (i = 0; i < 4; i++) {
                    try {
                        var context = testCanvas.getContext(webgl_names[i]);
                        if (context && typeof (context.getParameter) == "function") {
                            vtour_mode = "webgl";
                            break;
                        }
                    } catch (e) {

                    }
                }
                testCanvas.parentNode.removeChild(testCanvas);
            }
        }
    }

    var gps = new google.maps.LatLng(vtour_latitudecafecusco, vtour_longitudecafecusco);

    var address_control = false;
    var address_control_options = { position: google.maps.ControlPosition.TOP_LEFT };
    if (vtour_addresscafecusco != "") {
        address_control = true;
        address_control_options = { position: vtour_addresscafecusco };
    }

    var pan_control = false;
    var pan_control_options = { position: google.maps.ControlPosition.TOP_LEFT };
    if (vtour_pancafecusco != "") {
        pan_control = true;
        pan_control_options = { position: vtour_pancafecusco };
    }

    var zoom_control = false;
    var zoom_control_options = { position: google.maps.ControlPosition.TOP_LEFT, style: google.maps.ZoomControlStyle.DEFAULT };
    if (vtour_zoom_poscafecusco != "") {
        zoom_control = true;
        zoom_control_options = { position: vtour_zoom_poscafecusco, style: vtour_zoom_sizecafecusco };
    }

    var disableDoubleClickZoom = true;
    if (vtour_doubleClickZoomcafecusco) {
        disableDoubleClickZoom = false;
    }

    var panoramaOptions = {
        pano: vtour_panoidcafecusco,
        pov: {
            heading: 0,
            pitch: 0,
            zoom: vtour_zoomcafecusco
        },
        clickToGo: vtour_click2gocafecusco,
        scrollwheel: vtour_scrollwheelcafecusco,
        zoomControl: zoom_control,
        zoomControlOptions: zoom_control_options,
        panControl: pan_control,
        panControlOptions: pan_control_options,
        visible: true,
        mode: vtour_mode,
        addressControl: address_control,
        addressControlOptions: address_control_options,
        linksControl: vtour_chevronscafecusco,
        disableDoubleClickZoom: disableDoubleClickZoom,
        imageDateControl: vtour_imageDateControlcafecusco,
        scrollwheel: vtour_scrollwheelcafecusco,
        enableCloseButton: vtour_closebuttoncafecusco,
        position: gps
    };

    var canvas = document.getElementById("vtour_canvascafecusco");
    vtour_panoramacafecusco = new google.maps.StreetViewPanorama(canvas, panoramaOptions);
    google.maps.event.addListener(vtour_panoramacafecusco, 'closeclick', function () {
        vtour_show_mapcafecusco();
    });

    vtour_panoramacafecusco.setPano(vtour_panoidcafecusco);

    google.maps.event.addListener(vtour_panoramacafecusco, 'pano_changed', function () {
        vtour_panoidcafecusco = vtour_panoramacafecusco.getPano();
    });

    if (canvas.onmouseover == null) {
        vtour_start_spincafecusco();
        setTimeout("vtour_init_glcafecusco();", 1000);
    }
    canvas.onmouseover = vtour_stop_spincafecusco;
    canvas.onmouseout = vtour_start_spincafecusco;



    var cw = parseInt(canvas.clientWidth) + "px";

    //var annoyer = document.createElement("span");
    //annoyer.style.cursor = "pointer";
    //annoyer.style.verticalAlign = "middle";
    //annoyer.style.textAlign = "center";
    //annoyer.style.width = cw;
    //annoyer.style.minWidth = "150px"
    //annoyer.style.padding = "0px";
    //annoyer.style.paddingTop = "10px";
    //annoyer.style.paddingBottom = "10px";
    //annoyer.style.color = "black";
    //annoyer.style.marginTop = "60px";
    //annoyer.style.display = "block";
    //annoyer.style.position = "absolute";
    //annoyer.style.backgroundColor = "rgba(255,255,255,0.5)";
    //annoyer.style.zIndex = 1000;
    //annoyer.appendChild(document.createTextNode("Demo mode: Pay to have this notice removed"));
    //annoyer.target = "_blank";
    //annoyer.onclick = function () { window.open("http://virali.se/photo/spin/embed/db8e48a1279e6c1a823e00087eb94179.html"); };
    //canvas.parentNode.insertBefore(annoyer, canvas);

    if (vtour_fullscreencafecusco) {
        var annoyer2 = document.createElement("button");
        annoyer2.style.verticalAlign = "middle";
        annoyer2.style.textAlign = "center";
        annoyer2.style.width = cw;
        annoyer2.style.padding = "10px";
        annoyer2.style.color = "black";
        annoyer2.style.marginTop = "90px";
        annoyer2.style.display = "block";
        annoyer2.style.position = "absolute";
        annoyer2.style.backgroundColor = "rgba(255,255,255,0.5)";
        annoyer2.style.zIndex = 1000;
        annoyer2.appendChild(document.createTextNode("Fullscreen"));
        annoyer2.target = "_blank";
        annoyer2.onclick = vtour_goto_fullscreencafecusco;
        canvas.parentNode.insertBefore(annoyer2, canvas);
    }

}

function vtour_show_mapcafecusco() {
    var canvas = document.getElementById("vtour_canvascafecusco");
    canvas.onmouseover = function () { };
    canvas.onmouseout = function () { };
    vtour_stop_spincafecusco();

    var gps = new google.maps.LatLng(vtour_latitudecafecusco, vtour_longitudecafecusco);
    var map_options = {
        center: gps,
        zoom: 16,
        mapTypeId: google.maps.MapTypeId.ROADMAP
    };

    var canvas = document.getElementById("vtour_canvascafecusco");
    vtour_panoramacafecusco = new google.maps.Map(vtour_canvascafecusco, map_options);

    var mopts = {
        map: vtour_panoramacafecusco,
        position: gps,
        visible: true
    };
    var marker = new google.maps.Marker(mopts);

    google.maps.event.addListener(marker, 'click', function () {
        vtour_initcafecusco();
    });

}

function vtour_spinItcafecusco() {

    try {
        var pov = vtour_panoramacafecusco.getPov();
        pov.heading += vtour_incrementcafecusco;
        while (pov.heading > 360.0) {
            pov.heading -= 360.0;
        }
        while (pov.heading < 0.0) {
            pov.heading += 360.0;
        }

        vtour_panoramacafecusco.setPov(pov);
    } catch (e) { }
}

function vtour_stop_spincafecusco() {
    clearTimeout(vtour_timercafecusco);
}

function vtour_start_spincafecusco() {
    clearTimeout(vtour_timercafecusco);
    vtour_timercafecusco = setInterval("vtour_spinItcafecusco()", vtour_intervalcafecusco);
}

function vtour_goto_fullscreencafecusco() {
    var canvas = document.getElementById("vtour_canvascafecusco");
    if (typeof (document.webkitCancelFullScreen) != "undefined") {
        canvas.webkitRequestFullScreen();
        vtour_fullscreen_widthcafecusco = canvas.clientWidth;
        vtour_fullscreen_heightcafecusco = canvas.clientHeight;
        canvas.style.width = "100%";
        canvas.style.height = "100%";
        document.addEventListener("webkitfullscreenchange", function () {
            if (!document.webkitIsFullScreen) {
                var c = document.getElementById("vtour_canvascafecusco");
                c.style.width = vtour_fullscreen_widthcafecusco + "px";
                c.style.height = vtour_fullscreen_heightcafecusco + "px";
            }
        }, false);
    } else if (typeof (document.mozCancelFullScreen) != "undefined") {
        console.log("moz");
        canvas.mozRequestFullScreen();
        vtour_fullscreen_widthcafecusco = canvas.clientWidth;
        vtour_fullscreen_heightcafecusco = canvas.clientHeight;
        canvas.style.width = "100%";
        canvas.style.height = "100%";
        document.addEventListener("mozfullscreenchange", function () {
            if (document.mozFullScreenElement == null) {
                var c = document.getElementById("vtour_canvascafecusco");
                c.style.width = vtour_fullscreen_widthcafecusco + "px";
                c.style.height = vtour_fullscreen_heightcafecusco + "px";
                google.maps.event.trigger(vtour_panoramacafecusco, 'resize')
            }
        }, false);
    } else {
        window.open("http://virali.se/photo/spin/embed/db8e48a1279e6c1a823e00087eb94179/iframe.html", "_blank", "channelmode=yes,fullscreen=yes,toolbar=no,scrollbars=no,menubar=no,location=no,directories=no,status=no");
    }
}

if (typeof (vtour_script) == "undefined") {
    var vtour_script = document.createElement("script");
    vtour_script.type = "text/javascript";
    vtour_script.src = "https://maps.googleapis.com/maps/api/js?&sensor=false&callback=vtour_initcafecusco";

    if (typeof (maps_api_key) != "undefined" && maps_api_key != "") {
        vtour_script.src += "&key=" + maps_api_key;
    }
    document.body.appendChild(vtour_script);
}
