import React from 'react';
import axios from 'axios';
import parse from 'html-react-parser';

const serverLocation = require('../../config/keys.js').server;

var data = [];
var parsed;

class News extends React.Component {
  state = {
    datag: [],
    title: []
  };

  componentDidMount() {
    axios.get(`${serverLocation}/api/content/news`).then(res => {
      this.setState({ datag: res.data.items.slice(0, 10) }, () =>
        console.log('Updated state')
      );

      for (var key in this.state) {
        data.push(this.state[key]);
      }
    });
  }

  render() {
    let numbers;
    if (this.state.datag[0]) {
      numbers = this.state.datag[0].map(item => {
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
      <>
        <div className="containerEvents">
          <div className="col-xs-8">{numbers}</div>
        </div>
      </>
    );
  }
}
export default News;
