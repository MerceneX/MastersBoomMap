import React from 'react';
import Borders from '../components/rss/Borders';
import RoadConditions from '../components/rss/RoadConditions';
import RoadEvents from '../components/rss/RoadEvents';
import ReportBannerLeft from '../components/design/ReportBanner_left.svg';
import ReportBannerRight from '../components/design/ReportBanner_right.svg';
import BorderBannerLeft from '../components/design/BorderBanner_left.svg';
import BorderBannerRight from '../components/design/BorderBanner_right.svg';
import EventsBannerLeft from '../components/design/EventsBanner_left.svg';
import EventsBannerRight from '../components/design/EventsBanner_right.svg';
import { Helmet } from 'react-helmet';

class StanjeNaCestah extends React.Component {
  render() {
    return (
      <React.Fragment>
        <Helmet>
          <meta
            name="description"
            content="Ponujamo vam pravočasne in relevantne informacije o trenutnem stanju na cestah, vse zbrane na enem mestu. Informacije o trenutnih dogodkih na cesti, stanju na mejnih prehodih ter morebitnih izrednih dogodkih lahko preverite na naši strani varno-domov.si"
          />
          <meta
            name="keywords"
            content="varno domov, varno-domov, trenutno stanje, mejni prehodi, meje, dogodki, nesreče, delo na cesti"
          />
          <link
            rel="stylesheet"
            href="https://fonts.googleapis.com/icon?family=Material+Icons"
          />
          <link rel="stylesheet" href="path/to/materialize.css" />
          <title>Trenutno Stanje na Cestah - Varno Domov</title>
        </Helmet>
        <div className="banner">
          <img
            src={ReportBannerLeft}
            alt="NewsBanner"
            className="bannerImgLeft bannerImg"
          />
          <h1 className="bannerTitle">Prometno poročilo</h1>
          <img
            src={ReportBannerRight}
            alt="NewsBanner"
            className="bannerImgRight bannerImg"
          />
        </div>
        <RoadConditions />
        <div className="banner">
          <img
            src={BorderBannerLeft}
            alt="NewsBanner"
            className="bannerImgLeft bannerImg"
          />
          <h2 className="bannerTitle">Mejnih prehodov</h2>
          <img
            src={BorderBannerRight}
            alt="NewsBanner"
            className="bannerImgRight bannerImg"
          />
        </div>
        <Borders />
        <div className="banner">
          <img
            src={EventsBannerLeft}
            alt="NewsBanner"
            className="bannerImgLeft bannerImg"
          />
          <h2 className="bannerTitle">Ostalih dogodkov</h2>
          <img
            src={EventsBannerRight}
            alt="NewsBanner"
            className="bannerImgRight bannerImg"
          />
        </div>
        <RoadEvents />
      </React.Fragment>
    );
  }
}
export default StanjeNaCestah;
