import React, { Component } from 'react';
import './App.css';
import ChooseNTA from "./components/ChooseNTA/index";
import MapBox from "./components/MapBox/index";
import hikingdata from "./data/hiking.json"; 
import cricketdata from "./data/cricket.json"; 
import beachdata from "./data/beach.json";
import iceskatingdata from "./data/iceskating.json";
import geodata from "./data/nyc.geojson";
import axios from "axios";


const ALLNEIGHBORHOOD = "All Neighborhood"

class App extends Component {
  state = {
    geo: [],
    nta: [],
    sel_nta: "",
    hiking: [],
    cricket: [],
    beach: [],
    iceskating: []
  }


  componentDidMount() {
    this.setState(
      {
        sel_nta: ALLNEIGHBORHOOD,
      },
      () => {
      this.fetchHiking()
      this.fetchCricket()
      this.fetchBeach()
      this.fetchIceSkating() 
      });
    this.fetchdata()
  }

  fetchHiking = () => {
      this.setState({
        hiking: hikingdata
      });
  } 

  fetchCricket = () => {
    this.setState({
      cricket: cricketdata
    })
  }

  fetchBeach = () => {
    this.setState({
      beach: beachdata
    })
  }

  fetchIceSkating = () => {
    this.setState({
      iceskating: iceskatingdata 
    })
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
      trailData: this.state.hiking,
      cricketData: this.state.cricket,
      beachData: this.state.beach,
      iceskatingData: this.state.iceskating
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
