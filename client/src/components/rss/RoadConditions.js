import React from 'react';
import axios from 'axios';
import parse from 'html-react-parser';
const serverLocation = require('../../config/keys.js').server;

var data = [];
var parsed;
class RoadConditions extends React.Component {
  state = {
    datag: []
  };

  componentDidMount() {
    axios
      .get(`${serverLocation}/api/content/road-conditions?limit=1`)
      .then(res => {
        this.setState({ datag: res.data }, () => console.log('Updated state'));
        for (var key in this.state) {
          data.push(this.state[key]);
        }
      });
  }

  render() {
    let numbers;
    if (this.state.datag.items) {
      numbers = this.state.datag.items[0].map(item => {
        parsed = parse('' + item.description + '');
        const datePublished = new Date(item.datePublished);
        return (
          <div className="ContentStyle">
            <div className="contentHeader">
              <h5>
                <b>{item.title}</b>
              </h5>
              <p className="date">
                {datePublished.getDay()}. {datePublished.getMonth()}.&nbsp;{' '}
                {datePublished.getFullYear()}
              </p>
            </div>
            <hr />

            <p className="cardContent">{parsed}</p>
          </div>
        );
      });
    }
    return (
      <div className="containerEvents">
        <div className="col-xs-8">
          <ul>{numbers}</ul>
        </div>
      </div>
    );
  }
}
export default RoadConditions;
