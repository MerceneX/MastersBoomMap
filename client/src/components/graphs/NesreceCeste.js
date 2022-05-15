import React, { PureComponent } from 'react';
import axios from 'axios';
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend
} from 'recharts';
const serverLocation = require('../../config/keys.js').server;

var data = [];

export default class NesreceCeste extends PureComponent {
  state = {
    datag: []
  };

  componentDidMount() {
    axios.get(`${serverLocation}/api/graph/32`).then(res => {
      this.setState({ datag: res.data });
      for (var key in this.state) {
        data.push(this.state[key]);
      }
    });
  }

  render() {
    return (
      <BarChart
        width={1200}
        height={300}
        data={this.state.datag.podatki}
        margin={{
          top: 5,
          right: 30,
          left: 20,
          bottom: 5
        }}>
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="cesta" interval={0} fontSize={7} />
        <YAxis domain={[0, 70000]} />
        <Tooltip />
        <Legend />
        <Bar
          layout="horizontal"
          dataKey="nesrece"
          fill="#4ca64c"
          fillOpacity="0.8"
          label={{ fill: 'white', fontSize: 10 }}
        />
      </BarChart>
    );
  }
}
