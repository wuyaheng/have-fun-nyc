import React, { Component } from 'react';
import './App.css';
import ChooseName from "./components/ChooseName/index";
import MapBox from "./components/MapBox/index";
import hikingdata from "./data/hikingMap.json"; 
import axios from "axios";

const ALLHIKINGTRAILS = "All Hiking Trails"

class App extends Component {
  state = {
    trailnames: [],
    sel_trailname: "",
    traildata: [],
    filteredtrailData: []
  }


  componentDidMount() {
    this.setState(
      {
        sel_trailname: ALLHIKINGTRAILS,
      },
      () => {
      this.fetchTrail()
      });
    this.fetchdata()
    this.fetchName();
  }

  fetchdata = () => {
      this.setState({
        traildata: hikingdata
      });
  } 


  fetchName = () => {
      const dropdownName = hikingdata.map((x) => x.Name)
      const dropdown = [ALLHIKINGTRAILS,...dropdownName]
      this.setState({
        trailnames: dropdown
      });
  } 

  handleInputChange = (event) => {
    this.setState(
      {
        sel_trailname: event.target.value
      },
      () => {
      this.fetchTrail() 
      })
  }


  fetchTrail = () => { 
    if (this.state.sel_trailname !== ALLHIKINGTRAILS) {
        let fetchedTrail = hikingdata.filter((ele) => ele.Name === this.state.sel_trailname)
        this.setState({
          filteredtrailData: fetchedTrail
        })
    } else {
      this.setState({
        filteredtrailData: this.state.traildata
      })
    }
  }




  render() { 
      return (
        <>
          <nav>
            <div className="nav-wrapper #455a64 blue-grey darken-2">
              <a href="#" className="brand-logo center">Hiking Trail</a>
            </div>
          </nav>
        
        <div className="container-fluid mt-2">
        <div className="row mb-0">
        <div className="col-md-4">
        <div className="card">
      <h6 className="p-1 mt-1 mb-1"><b>Select a Trail</b></h6> 
        <ChooseName results={this.state.trailnames} handleInputChange={this.handleInputChange} /> 
        </div>
        </div>
 
        <div className="col-md-8">
        <div className="card">
          <MapBox results = {this.state.filteredtrailData}/>
          </div>
        </div>
        </div>
        </div> 
        </>
      );
    } 
}
export default App;
