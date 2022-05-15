import React, { PureComponent } from 'react';
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend
} from 'recharts';
import axios from 'axios';

var data = [];

const serverLocation = require('../../config/keys.js').server;

export default class NesreceVzrok extends PureComponent {
  state = {
    datac: []
  };

  componentDidMount() {
    axios.get(`${serverLocation}/api/graph/26`).then(res => {
      this.setState({ datac: res.data });
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
        data={this.state.datac.podatki}
        margin={{
          top: 5,
          right: 30,
          left: 20,
          bottom: 5
        }}>
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="vzrok" interval={0} fontSize={8} />
        <YAxis />
        <Tooltip />
        <Legend />
        <Bar
          dataKey="nesrece"
          fill="#419873"
          label={{ fill: 'black', fontSize: 12 }}
        />
      </BarChart>
    );
  }
}
