import React from "react";
import L from "leaflet";
import 'leaflet.markercluster';
import "leaflet.featuregroup.subgroup";


export default (props) => {
  React.useEffect(() => {
    const MAP_CONTAINER2 = document.getElementById("map-container2");

    if (props.lat && props.lon && props.pins) {
      const MAP_ID = document.createElement("div");
      MAP_ID.setAttribute("id", "mapid");
      MAP_CONTAINER2.appendChild(MAP_ID);

      var iconHiking = L.divIcon({
        className: 'custom-div-icon',
        html: "<div style='background-color:#70a288;' class='marker-pin'></div><i class='fas fa-hiking awesome'>",
        iconSize: [30, 42],
        iconAnchor: [15, 42]
      });

      var iconCricket = L.divIcon({
        className: 'custom-div-icon',
        html: "<div style='background-color:#6c757d;' class='marker-pin'></div><i class='fas fa-running awesome'>",
        iconSize: [30, 42],
        iconAnchor: [15, 42]
      });

      var iconBeach = L.divIcon({
        className: 'custom-div-icon',
        html: "<div style='background-color:#0096c7;' class='marker-pin'></div><i class='fas fa-umbrella-beach awesome'>",
        iconSize: [30, 42],
        iconAnchor: [15, 42]
      });

      var iconIceSkating = L.divIcon({
        className: 'custom-div-icon',
        html: "<div style='background-color:#cab1bd;' class='marker-pin'></div><i class='fas fa-skating awesome'>",
        iconSize: [30, 42],
        iconAnchor: [15, 42]
      });


      var iconOutDoorPool = L.divIcon({
        className: 'custom-div-icon',
        html: "<div style='background-color:#a3cef1;' class='marker-pin'></div><i class='fas fa-swimmer awesome'>",
        iconSize: [30, 42],
        iconAnchor: [15, 42]
      });

      
      var iconBasketball = L.divIcon({
        className: 'custom-div-icon',
        html: "<div style='background-color:#6a040f;' class='marker-pin'></div><i class='fas fa-basketball-ball awesome'>",
        iconSize: [30, 42],
        iconAnchor: [15, 42]
      });

      let myMap = L.map("mapid").setView([props.lat, props.lon], props.zoom)

      L.tileLayer(
        "https://api.mapbox.com/styles/v1/{id}/tiles/{z}/{x}/{y}?access_token={accessToken}", {
          attribution: 'Map data &copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors, <a href="https://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, Imagery © <a href="https://www.mapbox.com/">Mapbox</a>',
          maxZoom: 18,
          id: "mapbox/streets-v11",
          tileSize: 512,
          zoomOffset: -1,
          accessToken: process.env.REACT_APP_MAP_API_KEY,
        }
      ).addTo(myMap);



      var masClusGroup = new L.markerClusterGroup().addTo(myMap);

      var f1Sub = L.featureGroup.subGroup(masClusGroup).addTo(myMap);
      var f2Sub = L.featureGroup.subGroup(masClusGroup).addTo(myMap);
      var f3Sub = L.featureGroup.subGroup(masClusGroup).addTo(myMap);
      var f4Sub = L.featureGroup.subGroup(masClusGroup).addTo(myMap);
      var f5Sub = L.featureGroup.subGroup(masClusGroup).addTo(myMap);
      var f6Sub = L.featureGroup.subGroup(masClusGroup).addTo(myMap);

      var overLayMap = {
        "Hiking": f1Sub, 
        "Cricket": f2Sub,
        "Beach": f3Sub,
        "Ice Skating": f4Sub,
        "Outdoor Pool": f5Sub,
        "Basketball Playground": f6Sub
    };
    
      var fixUndefined = (item) => (item !== null ? item : 'Unknown');

      props.pins.trailData.forEach((pin) =>
        (pin) ?
        L.marker([pin.lat, pin.lon], {
          icon: iconHiking
        }).bindTooltip('<b>' + fixUndefined(pin.Name) + ' - Hiking</b><p><b>Length: </b>' + fixUndefined(pin.Length) + '</p><p><b>Difficulty: </b>' + fixUndefined(pin.Difficulty) + '</p><p><b>Park Name: </b>' + fixUndefined(pin.Park_Name) + '</p><p><b>Location: </b>' + fixUndefined(pin.Location) + '</p><p><b>Other Details: </b>' + fixUndefined(pin.Other_Details) + '</p>').addTo(f1Sub) : null);



      props.pins.cricketData.forEach((pin) =>
        (pin) ?
        L.marker([pin.lat, pin.lon], {
          icon: iconCricket
        }).bindTooltip('<b>' + fixUndefined(pin.Name) + ' - Cricket Field</b><p><b>Location: </b>' + fixUndefined(pin.Location) + '</p><p><b>Number of Fields: </b>' + fixUndefined(pin.Num_of_Fields) + '</p>').addTo(f2Sub) : null);

      props.pins.beachData.forEach((pin) =>
        (pin) ?
        L.marker([pin.lat, pin.lon], {
          icon: iconBeach
        }).bindTooltip('<b>' + fixUndefined(pin.Name) + ' - Beach</b><p><b>Location: </b>' + fixUndefined(pin.Location) + '</p><p><b>Description: </b>' + fixUndefined(pin.Description) + '</p>').addTo(f3Sub) : null);

      props.pins.iceskatingData.forEach((pin) =>
        (pin) ?
        L.marker([pin.lat, pin.lon], {
          icon: iconIceSkating
        }).bindTooltip('<b>' + fixUndefined(pin.Name) + ' - Ice Skating</b><p><b>Ice Skating Type: </b>' + fixUndefined(pin.IceSkating_Type) + '</p><p><b>Opening Date: </b>' + fixUndefined(pin.Opening_Date) + '</p><p><b>Closing Date: </b>' + fixUndefined(pin.Closing_Date) + '</p><p><b>Adult Price: </b>' + fixUndefined(pin.Public_Skate_Admission_Price_Adult) + '</p><p><b>Child Price: </b>' + fixUndefined(pin.Public_Skate_Admission_Price_Child) + '</p><p><b>Senior Price: </b>'+ fixUndefined(pin.Public_Skate_Admission_Price_Senior)+'</p><p><b>Skate Rental Cost: </b>'+ fixUndefined(pin.Skate_Rental_Cost) +'</p><p><b>Location: </b>' + fixUndefined(pin.Location) + '</p><p><b>Notes: </b>' + fixUndefined(pin.Notes) + '</p>').addTo(f4Sub) : null);


      props.pins.outdoorpoolData.forEach((pin) =>
        (pin) ?
        L.marker([pin.lat, pin.lon], {
          icon: iconOutDoorPool
        }).bindTooltip('<b>' + fixUndefined(pin.Name) + ' Outdoor Pool</b><p><b>Location: </b>' + fixUndefined(pin.Location) + '</p><p><b>Pools Outdoor Type: </b>' + fixUndefined(pin.Pools_outdoor_Type) + '</p><p><b>Phone: </b>' + fixUndefined(pin.Phone) + '</p><p><b>Size: </b>' + fixUndefined(pin.Size) + '</p>').addTo(f5Sub) : null);



      props.pins.basketballData.forEach((pin) =>
        (pin.lat && pin.lon) ?
        L.marker([pin.lat, pin.lon], {
          icon: iconBasketball
        }).bindTooltip('<b>' + fixUndefined(pin.Name) + ' - Basketball</b><p><b>Location: </b>' + fixUndefined(pin.Location) + '</p>').addTo(f6Sub) : null);

      L.control.layers(null, overLayMap, {collapsed:false}).addTo(myMap)

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
        style: function (feature) {
          return {
            color: "white",
            fillColor: chooseColor(feature.properties.borough),
            fillOpacity: 0.8,
            weight: 1.5
          };
        },
        onEachFeature: function (feature, layer) {
          layer.on({
            mouseover: function (event) {
              layer = event.target;
              layer.setStyle({
                fillOpacity: 1
              });
            },
            mouseout: function (event) {
              geoJson.resetStyle(event.target);
            },
            click: function (event) {
              myMap.fitBounds(event.target.getBounds());
            }
          });
          layer.bindTooltip("<p><b>" + feature.properties.neighborhood + "</b></p>");
        }
      }).addTo(myMap);
    }

    return () => (MAP_CONTAINER2.innerHTML = "");
  }, [props.lat, props.lon, props.pins]);

  return <div id = "map-container2"> </div>; 
};