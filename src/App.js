import React, { Component } from 'react';
import './App.css';
import ChooseNTA from "./components/ChooseNTA/index";
import MapBox from "./components/MapBox/index";
import hikingdata from "./data/hikingMap.json"; 
import geodata from "./data/nyc.geojson";
import axios from "axios";


const ALLNEIGHBORHOOD = "All Neighborhood"

class App extends Component {
  state = {
    geo: [],
    nta: [],
    sel_nta: "",
    traildata: []
  }


  componentDidMount() {
    this.setState(
      {
        sel_nta: ALLNEIGHBORHOOD,
      },
      () => {
      this.fetchHiking()
      });
    this.fetchdata()
  }

  fetchHiking = () => {
      this.setState({
        traildata: hikingdata
      });
  } 

  fetchdata = async () => {
    try {
      const res = await axios.get(geodata);
      this.setState({
        geo: res.data.features
      });
      const dropdownNta = this.state.geo.map((x) => x.properties.neighborhood)
      console.log(dropdownNta)
      const dropdown = [ALLNEIGHBORHOOD,...dropdownNta]
      this.setState({
        nta: dropdown
      });
    } catch (error) {
      console.log(error)
    }
  } 


  render() { 

    let data = {
      geoData: this.state.geo,
      trailData: this.state.traildata 
    }

      return (
        <>
          <nav>
            <div className="nav-wrapper #455a64 blue-grey darken-2">
              <a href="#" className="brand-logo center">NYC FUN</a> 
            </div>
          </nav>
        
        <div className="container-fluid mt-2">
        <div className="row mb-0">
        <div className="col-md-4">
        <div className="card">
      <h6 className="p-1 mt-1 mb-1"><b>Select a Neighborhood</b></h6> 
      <ChooseNTA results={this.state.nta} handleInputChange={this.handleInputChange} /> 
        </div>
        </div>
 
        <div className="col-md-8">
        <div className="card">
        <MapBox results = {data}/>
          </div>
        </div>
        </div>
        </div> 
        </>
      );
    } 
}
export default App;
