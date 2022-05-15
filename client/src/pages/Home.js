import React, { Component } from 'react';
import 'leaflet/dist/leaflet.css';
import Select from 'react-select';
import Map from '../components/Map';
import Legend from '../components/Legend';
import CustomFilter from '../components/CustomFilter';
import { Helmet } from 'react-helmet';

const options = [
  { value: 'current', label: 'Trenutno stanje' },
  { value: 'all', label: 'Kritični odseki' }
];

class SimpleMap extends Component {
  constructor(props) {
    super(props);
    this.mapElement = React.createRef();
    this.legendElement = React.createRef();
    this.customFilter = React.createRef();
    this.state = {
      selectedOption: 'all'
    };
    this.handleChange = this.handleChange.bind(this);
  }

  handleChange = selectedOption => {
    this.mapElement.current.changeOption(selectedOption);
    this.setState({ selectedOption: selectedOption });
    let visi = selectedOption.value === 'all' ? 'visible' : 'hidden';
    console.log(selectedOption);
    console.log(visi);
    this.customFilter.current.changeVisibility(visi);
  };

  handleLegendChange = newLegend => {
    this.mapElement.current.changeCriticalLevel(newLegend);
  };

  handleFilterSubmit = (state, surface) => {
    this.mapElement.current.changeFilterOptions(state, surface);
  };
  render() {
    return (
      // Important! Always set the container height explicitly
      <div class="map-container">
        <Helmet>
          <meta
            name="description"
            content="Predstavljamo Zemljevid na Varno Domov, narejen za napovedovanje kritičnih regij in točk na Slovenskih cestah. Izboljšujemo varnost z opozarjanjem voznikov na njihvi poti domov, v službo in povsod drugod s hitrim pregledom na enem spletnem mestu. Zemljevid agregira podatke z Agencije za Varnost v Prometu, ki podatke o prometnih nesrečah zbira že vse od leta 1994. Uporabniki lahko poleg trenutnega stanja ne cesti vidijo tudi situacijo cest v s svojimi izbranimi parametri."
          />
          <meta
            name="keywords"
            content="varno domov, kritične regije, zemljevid, boomMap, napovedovanje"
          />
          <link
            rel="stylesheet"
            href="https://fonts.googleapis.com/icon?family=Material+Icons"
          />
          <link rel="stylesheet" href="path/to/materialize.css" />
          <title>Zemljevid Kritičnih Točk - Varno Domov</title>
        </Helmet>
        <div className="legend">
          <h5>Možnosti:</h5>
          <Select
            defaultValue={options[0]}
            onChange={this.handleChange}
            options={options}
          />
          <Legend ref={this.legendElement} change={this.handleLegendChange} />
          <CustomFilter
            change={this.handleFilterSubmit}
            ref={this.customFilter}
          />
        </div>
        <div className="map">
          <Map option={this.state.selectedOption} ref={this.mapElement} />
        </div>
      </div>
    );
  }
}

export default SimpleMap;
