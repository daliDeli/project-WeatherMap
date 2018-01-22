import React, { Component } from 'react';
import './App.css';
import Search from "./components/Search"
import FetchService from "./services/fetchService"
import { SparklinesBars, SparklinesReferenceLine, Sparklines } from 'react-sparklines';
import { MapWithAMarker } from "./services/GoogleMaps";
import _ from 'lodash';


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
    console.warn(error);
  }

  componentDidMount() {
    this.getWeatherData("Belgrade");
  }


  render() {



    return (
      <div className="App container-fluid">
        <div className="row">
          <div className="col s12">
            <h1 id="logo">
              <img src="https://www.iconsdb.com/icons/preview/orange/sun-3-xxl.png" alt='sun' /> WeatherMap
          </h1>
          </div>
          <div className="col s12">
            <Search onSearchRequest={this.getWeatherData} />
          </div >
        </div>
        {this.state.cities.map((town,i) => {
          
          const tempData = town.data.list.map(hour => {
            return hour.main.temp;
          });
          const humidityData = town.data.list.map(hour => {

            return hour.main.humidity;
          });
          const avgTemp = Math.round(_.mean(tempData));
          const avgHum = Math.round(_.mean(humidityData));
          
          return (

            <div key={town.data.city.id}>
              <div className="row" id="table">
                <div className="col s12">
                  <h5>
                    Weather forecast for next 5 days.
                  </h5>
                </div>
                <div className="col s4 ">
                  {town.data.city.name}
                </div>
                <div className="col s4  ">
                  Avg. Temperature {avgTemp}	&#8451;
             </div>
                <div className="col s4 ">
                 Avg. Humidity {avgHum}%
             </div>
                
              </div>

              <div className="row weatherData">
                <div className="col s4">

                  <MapWithAMarker
                    googleMapURL="https://maps.googleapis.com/maps/api/js?key=AIzaSyDKVVnOLCMnQ1ctojD3QJMZlpS8oWHjP08&v=3.exp&libraries=geometry,drawing,places"
                    loadingElement={<div style={{ height: `40%` }} />}
                    containerElement={<div style={{ height: `20vh` }} />}
                    mapElement={<div style={{ height: `100%` }} />}
                    coordinates={town.data.city.coord}
                  />

                </div>
                <div className="col s4">
                  <Sparklines data={tempData} >
                    <SparklinesBars />
                    <SparklinesReferenceLine type="mean" />
                  </Sparklines>
                </div>
                <div className="col s4">
                  <Sparklines data={humidityData} >
                    <SparklinesBars />
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
