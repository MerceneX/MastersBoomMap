import React from 'react';
import TrafficForecast from '../components/rss/TrafficForecast';
import ForecastBannerImgLeft from '../components/design/ForecastBanner_left.svg';
import ForecastBannerImgRight from '../components/design/ForecastBanner_right.svg';
import { Helmet } from 'react-helmet';

class StanjeNaCestah extends React.Component {
  render() {
    return (
      <React.Fragment>
        <Helmet>
          <meta
            name="description"
            content="Ceste so zaradi različnih prireditev, dogodkov ali vzdrževalnih del večkrat zaprte ali omejene. Napovedi o teh izrednih dogodkov najdete zbrane na naši strani, z dodanimi podatki o vremenu in pomembnimi kontaktnimi informacijami. Izognite se nepotrebnim oviram in izberite varno pot domov."
          />
          <meta
            name="keywords"
            content="varno domov, varno-domov, napovedi promerta, dars, promet, Slovenija"
          />
          <link
            rel="stylesheet"
            href="https://fonts.googleapis.com/icon?family=Material+Icons"
          />
          <link rel="stylesheet" href="path/to/materialize.css" />
          <title>Napovedi Stanja Prometa - Varno Domov</title>
        </Helmet>
        <div className="banner">
          <img
            src={ForecastBannerImgLeft}
            alt="NewsBanner"
            className="bannerImgLeft bannerImg"
          />
          <h1 className="bannerTitle">Prometne Napovedi</h1>
          <img
            src={ForecastBannerImgRight}
            alt="NewsBanner"
            className="bannerImgRight bannerImg"
          />
        </div>
        <TrafficForecast />
      </React.Fragment>
    );
  }
}
export default StanjeNaCestah;
