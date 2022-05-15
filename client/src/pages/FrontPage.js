import React from 'react';
import '../components/design/App.css';
import { Container, Row, Col } from 'reactstrap';
import NewsIcon from '../components/design/NewsIcon.svg';
import EventsIcon from '../components/design/EventsIcon.svg';
import ForecastIcon from '../components/design/ForecastIcon.svg';
import MapIcon from '../components/design/MapIcon.svg';
import GraphIcon from '../components/design/GraphIcon.svg';
import AboutIcon from '../components/design/AboutIcon.svg';
import { FaAngleRight } from 'react-icons/fa';
import { Helmet } from 'react-helmet';

function FrontPage(props) {
  return (
    <div>
      <Helmet>
        <meta
          name="description"
          content="Predvidevamo kritične regije za možnost nesreče in	ozaveščamo voznike, reševalne službe in tiste, ki se jim mudi, kje povečati potrpljenje in zmanjšati hitrost. Varno pot domov poskušamo ustvariti z prijetno agregacijo kredibilnih virov kot so DARS in Agencija za Varnost v Prometu Slovenije."
        />
        <meta
          name="keywords"
          content="varno domov, varno-domov, varnost, cesta, dars, promet, kritične regije"
        />
        <link
          rel="stylesheet"
          href="https://fonts.googleapis.com/icon?family=Material+Icons"
        />
        <title>Domača Stran za Varno Domov</title>
      </Helmet>
      <section className="DescriptionClass">
        <div className="DescriptionContent">
          <p>
            <span>
              Vse najnovejše preverjene prometne informacije na enem mestu.
              &nbsp;
            </span>
            Predvidevamo&nbsp;<b>kritične regije</b> za možnost nesreče in
            ozaveščamo voznike, reševalne službe in tiste, ki se jim mudi, kje
            povečati potrpljenje in zmanjšati hitrost.
            <a className="descLink" href="/zemljevid">
              Na Zemljevid <FaAngleRight />
            </a>
          </p>
        </div>
      </section>

      <Container className="contentContainer">
        <h1 align="center" className="Slogan">
          Skupaj za varno pot domov
        </h1>

        <Row className="contentContainer">
          <Col sm={4} className="fpCol">
            <img
              className="imageFrontPage"
              src={MapIcon}
              alt="imageFrontPage"
            />
            <h5>
              <b>Zemljevid</b>
            </h5>
            <p>
              Prikaz kritičnih odsekov na slovenskih cestah, z možnostjo
              prilagoditve parametrov na trenutne razmere cest.{' '}
            </p>
            <a href="/zemljevid">
              Preberi več <FaAngleRight />
            </a>
          </Col>

          <Col sm={4} className="fpCol">
            <img
              className="imageFrontPage"
              src={GraphIcon}
              alt="imageFrontPage"
            />
            <h5>
              <b>Statistika</b>
            </h5>
            <p>
              Statistično predelani podatki o prometnih nesrečah od leta 1994
              naprej. Prikaz števila prometnih nesreč glede na različne filtre.
            </p>
            <a href="/statistika">
              Preberi več <FaAngleRight />
            </a>
          </Col>

          <Col sm={4} className="fpCol">
            <img
              className="imageFrontPage"
              src={AboutIcon}
              alt="imageFrontPage"
            />
            <h5>
              <b>O projektu</b>
            </h5>
            <p>
              {' '}
              Zgodba o ideji, viziji, razvoju projekta in kdo stoji za njim.
            </p>
            <a href="/onas">
              Preberi več <FaAngleRight />
            </a>
          </Col>

          <Col sm={4} className="fpCol">
            <img
              className="imageFrontPage"
              src={NewsIcon}
              alt="imageFrontPage"
            />
            <h5>
              <b>Novice</b>
            </h5>
            <p>Zadnje aktualne prometne novice. </p>
            <a href="/prometnenovice">
              Preberi več <FaAngleRight />
            </a>
          </Col>

          <Col sm={4} className="fpCol">
            <img
              className="imageFrontPage"
              src={EventsIcon}
              alt="imageFrontPage"
            />
            <h5>
              <b>Stanje na cestah</b>
            </h5>
            <p>
              Prometna poročila, stanja na mejnihi prehodih in aktualni dogodki
              na cestah.{' '}
            </p>
            <a href="/stanjenacestah">
              Preberi več <FaAngleRight />
            </a>
          </Col>

          <Col sm={4} className="fpCol">
            <img
              className="imageFrontPage"
              src={ForecastIcon}
              alt="imageFrontPage"
            />
            <h5>
              <b>Prometna napoved</b>
            </h5>
            <p>
              Napovedi prometa za prihajajoče dni, posebnosti na cesti, dogodki
              in ostale pomembne informacije.{' '}
            </p>
            <a href="/napovedi">
              Preberi več <FaAngleRight />
            </a>
          </Col>
        </Row>
        <div className="paragraphBelow">
          <p>
            <span>
              Združujemo podatke, pridobljene s&nbsp;
              <b>kredibilnih državnih ustanov</b>
              in jim dodajamo pomen.&nbsp;
            </span>
            &nbsp; Podatki prihajajo z&nbsp;
            <b>Agencije za Varnost v prometu</b>
            Slovenije in spletnih mest&nbsp;<b>DARS</b>. Vam ponujamo
            prosto&nbsp;
            <b>brskanje</b> po teh&nbsp;
            <b>podatkih</b>, saj vse shranjujemo v našo bazo podatkov v namene
            arhiviranja. Podatke o samih nesrečah, zbrane z AVP, pa urejamo v
            podobo zemljevida kritičnih točk , ki izvirajo vse od leta 1994.
          </p>
          <br></br>
        </div>
      </Container>
    </div>
  );
}

export default FrontPage;
