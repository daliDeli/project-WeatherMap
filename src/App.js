import React, { Component } from 'react';
import './App.css';
import Search from "./components/Search"
import FetchService from "./services/fetchService"
import { SparklinesLine, SparklinesReferenceLine, Sparklines } from 'react-sparklines';
import { MapWithAMarker } from "./services/GoogleMaps";
// import _ from 'lodash';


class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      cities: [],
      cityWeather: {
        data: {
          city: {
            name: "Loading...",

          },
          list: [],

        }
      }
    }

    this.fetchService = new FetchService();

    this.bindEventHandlers();
  }

  bindEventHandlers() {

    this.getWeatherData = this.getWeatherData.bind(this);
    this.successfulRequest = this.successfulRequest.bind(this);
    this.failedRequest = this.failedRequest.bind(this);
  }

  getWeatherData(city) {
    this.fetchService.get(city, this.successfulRequest, this.failedRequest)
  }

  successfulRequest(cityWeather) {

    this.setState({
      cities: [cityWeather, ...this.state.cities],

    }, )
  }

  failedRequest(error) {
    console.log(error);
    // alert("Please enter a valid city name.");
  }

  componentDidMount() {
    this.getWeatherData("Belgrade");
  }


  render() {



    return (
      <div className="App container-fluid">

        <div className="row col s12">
          <Search onSearchRequest={this.getWeatherData} />
        </div >
        {this.state.cities.map(town => {

          const tempData = town.data.list.map(hour => {
            return hour.main.temp;
          });
          const humidityData = town.data.list.map(hour => {
            return hour.main.humidity;
          });

          return (

            <div className="row col s12" key={town.data.city.id}>
              <div className="row" id="table">
                <div className="col s4 ">
                  City
                </div>
                <div className="col s4  ">
                  Temperature
                </div>
                <div className="col s4 ">
                  Humidity
                </div>
              </div>
              <hr />

              <div className="row">
                <div className="col s4">
                  
                  <MapWithAMarker
                    googleMapURL="https://maps.googleapis.com/maps/api/js?key=AIzaSyDKVVnOLCMnQ1ctojD3QJMZlpS8oWHjP08&v=3.exp&libraries=geometry,drawing,places"
                    loadingElement={<div style={{ height: `50%` }} />}
                    containerElement={<div style={{ height: `150px` }} />}
                    mapElement={<div style={{ height: `100%` }} />}
                    coordinates={town.data.city.coord}
                  />
                  
                </div>
                <div className="col s4">
                  <Sparklines data={tempData} >
                    <SparklinesLine />
                    <SparklinesReferenceLine type="mean" />
                  </Sparklines>
                </div>
                <div className="col s4">
                  <Sparklines data={humidityData} >
                    <SparklinesLine />
                    <SparklinesReferenceLine type="mean" />
                  </Sparklines>

                </div>
              </div>
            </div>
          )
        })}
      </div >
    );
  }
}

export default App;
