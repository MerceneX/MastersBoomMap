import React from 'react';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';
import myData from '../../src/data/results_json';
import 'leaflet.awesome-markers/dist/leaflet.awesome-markers.css';
import 'leaflet.awesome-markers/dist/leaflet.awesome-markers';

import { Map, TileLayer, Marker, Popup } from 'react-leaflet';

let weather = {
  Clear: 'J',
  Rain: 'D',
  Clouds: 'O',
  Snow: 'S',
  Fog: 'M'
};

var marker = {
  coords: [46.1491664, 14.9860106],
  locText: 'test',
  iconColor: '',
  criticalState: 0
};
class StreetMap extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      lat: 46.1491664,
      lng: 14.9860106,
      zoom: 9,
      selectedOption: 'current',
      criticalLevelsChecked: { 4: false, 3: false, 2: false },
      filterOptions: {},
      markers: [],
      surface: '',
      weatherD: '',
      currentLoc: { lat: 46.1491664, lng: 14.9860106 }
    };
  }
  changeOption(newOption) {
    this.setState({ markers: [] });
    this.setState({ filterOptions: {} });
    this.setState({ selectedOption: newOption.value });
  }
  changeCriticalLevel(newLevel) {
    this.setState({ markers: [] });
    this.setState({ criticalLevelsChecked: newLevel });
  }
  changeFilterOptions = (filter, surface) => {
    this.setState({ markers: [] });
    this.setState({ filterOptions: filter });
    this.setState({ surface: surface });
  };

  async componentDidMount() {
    this.getWeatherData(this.state.currentLoc.lat, this.state.currentLoc.lng);
  }
  getLocation = () => {
    if (navigator.geolocation) {
      //let position = navigator.geolocation.getCurrentPosition(this.geoSuccess);
    } else {
      alert('Not supported');
    }
  };
  geoSuccess = position => {
    var lat = position.coords.latitude;
    var lng = position.coords.longitude;
    this.setState({ currentLoc: { lat: lat, long: lng } });
  };

  getWeatherData = (lat, lon) => {
    fetch(
      'http://api.openweathermap.org/data/2.5/find?lat=' +
        lat +
        '&lon=' +
        lon +
        '&cnt=1&APPID=19117506641d90371c01ce010e35f032'
    )
      .then(res => res.json())
      .then(json => this.setState({ weatherD: json.list[0].weather[0].main }))
      .catch(err => {
        this.setState({ weatherD: 'Clear' });
      });
  };
  getCurrentState = () => {
    let date = new Date();
    let day = date.getDay() !== 0 ? date.getDay() + 1 : 6;
    let month = date.getMonth() !== 12 ? date.getMonth() + 1 : 0;

    //assign surface at current time
    let surface = '';
    switch (weather[this.state.weatherD]) {
      case 'D':
        surface = { general: 'ne_suho', type: 'MO' };
        break;
      case 'S':
        surface = { general: 'ne_suho', type: 'SL' };
        break;
      default:
        surface = { general: 'suho', type: 'SU' };
        break;
    }
    let current = {
      PRVR_Vreme: weather[this.state.weatherD],
      Cas_Nesrece: date.getHours().toString() + '.0',
      dan_v_tednu: day.toString(),
      mesec: month.toString(),
      PRPV_Povrsje: surface
    };

    return current;
  };
  isSectionCritical = (section, surfaceType) => {
    let state =
      Object.keys(this.state.filterOptions).length !== 0
        ? this.state.filterOptions
        : this.getCurrentState();
    let count = 0;
    if (myData[section]['dan_teden'].includes(parseInt(state['dan_v_tednu']))) {
      count++;
    }
    let section_attributes =
      myData[section]['povrsje'][state['PRPV_Povrsje']['general']];
    for (let attribute in state) {
      if (attribute === 'PRPV_Povrsje') {
        if (
          section_attributes[attribute].includes(state[attribute]['type']) &&
          attribute !== 'dan_v_tednu'
        )
          count++;
      } else {
        if (
          section_attributes[attribute].includes(state[attribute]) &&
          attribute !== 'dan_v_tednu'
        )
          count++;
      }
    }
    return count;
  };
  setMarkerColor = criticalState => {
    let url =
      'https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-2x-blue.png';
    switch (criticalState) {
      case 5:
        url =
          'https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-red.png';
        break;
      case 4:
        url =
          'https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-red.png';
        break;
      case 3:
        url =
          'https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-orange.png';
        break;
      case 2:
        url =
          'https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-green.png';
        break;
      case 1:
        url =
          'https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-green.png';
        break;
      default:
        break;
    }
    return url;
  };
  setMarkersBasedOnLegend = (criticalState, marker) => {
    let isLegendEmpty = !Object.values(
      this.state.criticalLevelsChecked
    ).includes(true);
    let legendKeys = Object.keys(this.state.criticalLevelsChecked);
    marker.iconColor = this.setMarkerColor(criticalState);
    if (criticalState >= 1) {
      if (isLegendEmpty) this.state.markers.push(marker);
      else {
        for (let i = 0; i < legendKeys.length; i++) {
          if (
            this.state.criticalLevelsChecked[legendKeys[i]] &&
            criticalState.toString() === legendKeys[i]
          )
            this.state.markers.push(marker);
        }
      }
    }
  };
  addMarkers = () => {
    for (let section in myData) {
      if (!myData[section].koordinate.includes(null)) {
        let coord = myData[section].koordinate.toString().split(',');
        marker = {
          coords: [coord[0], coord[1]],
          locText: myData[section].kraj[0][3].toString(),
          iconColor:
            'https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-2x-blue.png'
        };
        if (this.state.selectedOption === 'all') {
          if (Object.keys(this.state.filterOptions).length === 0)
            this.state.markers.push(marker);
          else
            this.setMarkersBasedOnLegend(
              this.isSectionCritical(section, this.state.surface),
              marker
            );
        } else {
          let criticalState = this.isSectionCritical(
            section,
            this.state.selectedOption
          );
          this.setMarkersBasedOnLegend(criticalState, marker);
        }
      }
    }
  };
  render() {
    this.getLocation();

    this.addMarkers();

    const position = [this.state.lat, this.state.lng];
    return (
      <Map className="map" center={position} zoom={this.state.zoom}>
        <TileLayer
          attribution='&amp;copy <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />

        {this.state.markers.map((m, idx) => (
          <Marker
            key={`marker-${idx}`}
            position={m.coords}
            icon={L.icon({
              iconUrl: m.iconColor,
              iconSize: [30, 50],
              iconAnchor: [22, 50],
              shadowAnchor: [4, 62], // the same for the shadow
              popupAnchor: [-6, -35]
            })}>
            <Popup>
              <span>{m.locText}</span>
            </Popup>
          </Marker>
        ))}
      </Map>
    );
  }
}
export default StreetMap;
