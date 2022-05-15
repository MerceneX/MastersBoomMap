import React, { PureComponent } from 'react';
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend
} from 'recharts';

import axios from 'axios';

var data = [];
const serverLocation = require('../../config/keys.js').server;

export default class NesreceVreme extends PureComponent {
  state = {
    datag: []
  };

  componentDidMount() {
    axios.get(`${serverLocation}/api/graph/25`).then(res => {
      this.setState({ datag: res.data });
      for (var key in this.state) {
        data.push(this.state[key]);
      }
    });
  }

  render() {
    return (
      <AreaChart
        width={500}
        height={300}
        data={this.state.datag.podatki}
        margin={{
          top: 10,
          right: 30,
          left: 0,
          bottom: 0
        }}>
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="vreme" interval={0} fontSize={10} />
        <YAxis />
        <Tooltip />
        <Legend />
        <Area
          type="monotone"
          dataKey="nesrece"
          stroke="#0091b0"
          fill="#0091b0"
          dot={{ fill: '#008080', strokeWidth: 1 }}
        />
      </AreaChart>
    );
  }
}
