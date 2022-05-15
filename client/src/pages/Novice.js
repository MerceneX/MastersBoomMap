import React from 'react';
import News from '../components/rss/News';
import NewsBannerImgLeft from '../components/design/NewsBanner_left.svg';
import NewsBannerImgRight from '../components/design/NewsBanner_right.svg';
import { Helmet } from 'react-helmet';

class Novice extends React.Component {
  render() {
    return (
      <React.Fragment>
        <Helmet>
          <meta
            name="description"
            content="KV poplavi informacij, še posebej glede prometa, se lahko hitro izgubimo. Naša rešitev prikazuje vse aktualne informacije na enem mestu in na prijazen način. Dostopate lahko do zadnjih prometnih poročil, stanja na mejnih prehodih in trenutnih dogodkov na cesti."
          />
          <meta
            name="keywords"
            content="varno domov, varno-domov, novice, promet, dars, Slovenija, sveže"
          />
          <link
            rel="stylesheet"
            href="https://fonts.googleapis.com/icon?family=Material+Icons"
          />
          <link rel="stylesheet" href="path/to/materialize.css" />
          <title>Novice v Prometu - Varno Domov</title>
        </Helmet>
        <div className="banner">
          <img
            src={NewsBannerImgLeft}
            alt="NewsBanner"
            className="bannerImgLeft bannerImg"
          />
          <h1 className="bannerTitle">Prometne Novice</h1>
          <img
            src={NewsBannerImgRight}
            alt="NewsBanner"
            className="bannerImgRight bannerImg"
          />
        </div>
        <News />
      </React.Fragment>
    );
  }
}
export default Novice;
