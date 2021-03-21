import React from "react";
import Map from "./../Map/index";


function MapBox(props) {
    let lat = 40.746106816563156;
    let lon = -73.92531492341064;
    let zoom = 10;
    if(props.results.geoData.length==1) {
        const c = props.results.geoData[0].geometry.coordinates;
        lat = c[0][0][1]
        lon = c[0][0][0]
        zoom = 13.5
    }

    return (
        <>
            <Map lat={lat} lon={lon} zoom={zoom} pins={props.results} />
        </>
    )
}

export default MapBox; 