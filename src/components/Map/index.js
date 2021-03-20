import React from "react";
import L from "leaflet";
import 'leaflet.markercluster';


export default (props) => {
  React.useEffect(() => {
    const MAP_CONTAINER2 = document.getElementById("map-container2");

    if (props.lat && props.lon && props.pins) {
      const MAP_ID = document.createElement("div");
      MAP_ID.setAttribute("id", "mapid");
      MAP_CONTAINER2.appendChild(MAP_ID);

      let schoolMap; 
      props.pins.trailData.length > 20 ? 
      schoolMap = L.map("mapid").setView([props.lat, props.lon], 10) : schoolMap = L.map("mapid").setView([props.lat, props.lon], 13)

      L.tileLayer(
        "https://api.mapbox.com/styles/v1/{id}/tiles/{z}/{x}/{y}?access_token={accessToken}",
        {
          attribution:
            'Map data &copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors, <a href="https://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, Imagery © <a href="https://www.mapbox.com/">Mapbox</a>',
          maxZoom: 18,
          id: "mapbox/streets-v11",
          tileSize: 512,
          zoomOffset: -1,
          accessToken: process.env.REACT_APP_MAP_API_KEY,
        }
      ).addTo(schoolMap);

      var iconHiking = L.divIcon({
        className: 'custom-div-icon',
        html: "<div style='background-color:#70a288;' class='marker-pin'></div><i class='fas fa-hiking awesome'>", 
        iconSize: [30, 42], 
        iconAnchor: [15, 42]
    });

    var iconCricket = L.divIcon({
      className: 'custom-div-icon',
      html: "<div style='background-color:#70a288;' class='marker-pin'></div><i class='fas fa-running awesome'>", 
      iconSize: [30, 42], 
      iconAnchor: [15, 42]
  });

        // Create a new marker cluster group
        var markers = L.markerClusterGroup();

        var fixUndefined = (item) => (item !== null ? item : 'Unknown'); 

      props.pins.trailData.forEach((pin) =>
      (pin) ? 
      markers.addLayer(L.marker([pin.lat, pin.lon],{icon: iconHiking}).bindTooltip('<b>' + fixUndefined(pin.Name) + '</b><p><b>Length: </b>' + fixUndefined(pin.Length) +'</p><p><b>Difficulty: </b>' + fixUndefined(pin.Difficulty) + '</p><p><b>Park Name: </b>' + fixUndefined(pin.Park_Name) + '</p><p><b>Location: </b>' + fixUndefined(pin.Location) + '</p><p><b>Other Details: </b>' + fixUndefined(pin.Other_Details) + '</p>') 
   ) : null );

   

      props.pins.cricketData.forEach((pin) =>
      (pin) ? 
      markers.addLayer(L.marker([pin.lat, pin.lon],{icon: iconCricket}).bindTooltip('<b>' + fixUndefined(pin.Name) + ' Cricket Field</b><p><b>Location: </b>' + fixUndefined(pin.Location) +'</p><p><b>Number of Fields: </b>' + fixUndefined(pin.Num_of_Fields) + '</p>') 
    ) : null );

     // Add our marker cluster layer to the map
      schoolMap.addLayer(markers);

  
              function chooseColor(borough) {
                switch (borough) {
                case "Brooklyn":
                return "#bac7be";
                case "Bronx":
                return "#8d99ae";
                case "Manhattan":
                return "#a0ced9";
                case "Queens":
                return "#cc8b86";
                case "Staten Island":
                return "#f5cb5c";
                default:
                return "black";
                }
            }
            

                var geoJson = L.geoJson(props.pins.geoData, {
                style: function(feature) {
                    return {
                    color: "white",
                    fillColor: chooseColor(feature.properties.borough),
                    fillOpacity: 0.8,
                    weight: 1.5
                    };
                },
                onEachFeature: function(feature, layer) {
                    layer.on({
                    mouseover: function(event) {
                        layer = event.target;
                        layer.setStyle({
                        fillOpacity: 1
                        });
                    },
                    mouseout: function(event) {
                        geoJson.resetStyle(event.target);
                    },
                    click: function(event) {
                        schoolMap.fitBounds(event.target.getBounds());
                    }
                    });
                    layer.bindTooltip("<p><b>" + feature.properties.neighborhood + "</b></p>");
                }
                }).addTo(schoolMap);
    }

    return () => (MAP_CONTAINER2.innerHTML = "");
  }, [props.lat, props.lon, props.pins]);

  return <div id="map-container2"></div>;
};

