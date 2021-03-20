import React from "react";
import L from "leaflet";
import 'leaflet.markercluster';


export default (props) => {
  React.useEffect(() => {
    const MAP_CONTAINER = document.getElementById("map-container");

    if (props.lat && props.lon && props.pins) {
      const MAP_ID = document.createElement("div");
      MAP_ID.setAttribute("id", "mapid");
      MAP_CONTAINER.appendChild(MAP_ID);

      let myMap = L.map("mapid").setView([props.lat, props.lon], 10) 

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
      ).addTo(myMap);

        // Create a new marker cluster group
        var markers = L.markerClusterGroup();

        var fixUndefined = (item) => (item !== null ? item : 'Unknown'); 

      props.pins.forEach((pin) =>
      (pin.Name) ? 
      markers.addLayer(L.marker([pin.lat, pin.lon]).bindTooltip('<b>' + fixUndefined(pin.Name) + '</b><p>Length: ' + fixUndefined(pin.Length) +'</p><p>Difficulty: ' + fixUndefined(pin.Difficulty) + '</p><p>Park Name: ' + fixUndefined(pin.Park_Name) + '</p><p>Location: ' + fixUndefined(pin.Location) + '</p><p>Other Details: ' + fixUndefined(pin.Other_Details) + '</p>') 
   ) : null );

     myMap.addLayer(markers);
    }

    return () => (MAP_CONTAINER.innerHTML = "");
  }, [props.lat, props.lon, props.pins]);

  return <div id="map-container"></div>;
};

