import React from 'react';
import { Container, Row, Col } from 'reactstrap';
import MG from '../components/design/MG.jpg';
import MK from '../components/design/MK.jpg';
import PG from '../components/design/PG.jpg';
import NF from '../components/design/NF.jpg';
import Plaque from '../components/design/Plaque.png';
import '../components/design/App.css';
import IdeaIcon from '../components/design/IdeaIcon.svg';
import { Helmet } from 'react-helmet';

function About() {
  return (
    <React.Fragment>
      <Helmet>
        <meta
          name="desription"
          content="Smo ekipa štirih študentov univerzitetnega programa Informatike in Tehnologij Komuniciranja na Fakulteti za Elektrotehniko, Računalništvo in Informatiko Univerze v Mariboru. Rešitev, ki vam jo predstavljamo, smo začeli v sklopu zaključnega projektnega dela ob koncu 2. letnika. Po koncu petih tednov obveznega dela smo verjeli, da imamo dobro idejo, možnosti izboljšave in smisel za delo, smo se odločili nadaljevati z razvojem tudi v prostem času. Mi smo ekipa, za Varno Domov"
        />
        <meta
          name="keywords"
          content="varno domov, Marko Gluhak, Maruša Konečnik, Nataša Feher, Pina Gornik, FERI, ITK"
        />
        <link
          rel="stylesheet"
          href="https://fonts.googleapis.com/icon?family=Material+Icons"
        />
        <link rel="stylesheet" href="path/to/materialize.css" />
        <title>O Nas - Varno Domov</title>
      </Helmet>
      <br></br>

      <Container className="aboutContainer">
        <Row>
          <Col>
            <h4>Zmaga na konferenci Dnevi Slovenske Informatike 2020</h4>
          </Col>
        </Row>
        <Row>
          <Col className="awards">
            <div className="awardspcol">
              <img
                className="plaque-photo"
                src={Plaque}
                alt="Plaketa za izjemne prispevke študentov v letu 2020"
              />
              <p className="awardsp1">
                Kljub izzivu, ki je bilo leto 2020, je v tem letu potekala
                konferenca Dnevi Slovenske Informatike, ki smo se je seveda
                udeležili. Konkurenca je bila zelo zatevna, saj so tekmovali
                tudi asistenti, ki so poučevali na naši fakulteti. A je naša
                rešitev s svojo inovativnostjo in potencialom za družbeno korist
                prepričala komisijo. Našo predstavitev in celotno konferenco si
                lahko ogledate na
                <a
                  className="emphasisedLink"
                  href="https://dsi2020.dsi-konferenca.si/">
                  naslednji povezavi.
                </a>
              </p>
              <p className="awardsp1">
                Naša nagrada je obsegala tudi nekatere, nenapisane prednosti.
                Naš mentor doc. dr. Luka Pavlič nam je uredil tudi brezplačno
                namestitev naše rešitve na strežniku fakultete, kjer zadeva teče
                še sedaj. Za sodelovanje pa so bili tudi odprti pri podjetju
                Domovanje, ki so nam omogočili brezplačen najem domene,
                varno-domov.si. Za naš dosežek, pa smo prejeli tudi nekaj, kar
                si ne bi mogli v začetku naše študentske poti sploh
                predstavljati. Prejeli smo plaketo, za izjemne prispevke
                študentov za leto 2020.
                <p className="thanksp">
                  Iskrena zahvala vsem, ki ste nas na tej poti podpirali in
                  tistim, ki nas še vedno boste!
                </p>
              </p>
            </div>
          </Col>
        </Row>
        <Row>
          <Col className="ideaImageContainer" sm={4}>
            <img className="ideaImage" src={IdeaIcon} alt="imageFrontPage" />
          </Col>
          <Col lg={8}>
            <h4 className="ideaTitle">Ideja</h4>
            <p>
              V Republiki Sloveniji smo od osamosvojitve zgradili mnoge državne
              in lokalne ceste, ki (zaradi širitve na eni in manj vzdrževanja na
              drugi strani) veljajo za dokaj nevarne. Najhujših prometnih nesreč
              s smrtnim izidom je zadnja leta res manj, a to žal ne velja za
              nesreče v splošnem, pa naj imajo zgolj materialne ali tudi blage
              oz. hujše telesne poškodbe. Eden izmed mehanizmov za povečanje
              varnosti je opozarjanje udeležencev na t. i. nevarne cestne
              odseke. Menimo, da je v smeri prepoznavanja in ozaveščanja
              udeležencev prometa mogoče narediti še več. Sami smo s to mislijo,
              skovali vizijo o spletni rešitvi, ki bi zajemala naprednejšo in
              učinkovitejšo klasifikacijo cestnih odsekov, ter oceno stopnje
              njihove nevarnosti.{' '}
            </p>
          </Col>
        </Row>
        <Row>
          <Col>
            <h4>Projekt</h4>
          </Col>
        </Row>
        <Row>
          <Col>
            <p>
              Na osnovi javnih podatkov o nesrečah na slovenskih cestah, smo s
              pomočjo metod strojnega učenja razvili osrednjo funkcionalnost
              naše rešitve – zemljevid z dinamičnim prikazovanjem in
              opozarjanjem na nevarne cestne odseke. Odseki so prikazani v
              odvisnosti od podanih parametrov (čas, vreme, dan, mesec, …) in
              kvalificirani glede na stopnjo kritičnosti. Poleg osnovne
              funkcionalnosti, uporabnikom omogočamo tudi integrirano brskanje
              po statističnih podatkih in izpostavljamo zanimive povezave, ki
              smo jih z ustrezno obdelavo pridobili iz oprtih podatkov. Naš
              portal prav tako omogoča pregled aktualnih prometnih informacij,
              kot so stanje na slovenskih mejah, prometna poročila, napovedi
              prometa in trenutni dogodki na cestah.
            </p>
            <h5>Tehnološki sklad:</h5>
            <p>
              Za tako inovativno rešitev, smo se odločili uporabiti najbolj
              sveže tehnologije. Razmišljali smo v smislu odzivnosti, izgleda in
              agilnega programiranja. Na koncu smo se odločili za:
              <ul>
                <li>React za uporabniški vmesnik</li>
                <li>Python za strojno učenje, s knjižnico Efficient Apriori</li>
                <li>NodeJS in Express za zaledje</li>
                <li>MongoDB za podatkovno bazo</li>
                <li>Star laptop, Nginx in Docker za gostovanje</li>
              </ul>
            </p>
          </Col>
        </Row>
      </Container>
      <br></br>
      <Container className="aboutContainer">
        <h4 className="headers"> Ekipa </h4>
        <Row>
          <Col>
            <p>
              Smo ekipa štirih študentov univerzitetnega programa Informatike in
              Tehnologij Komuniciranja na Fakulteti za Elektrotehniko,
              Računalništvo in Informatiko Univerze v Mariboru. Rešitev, ki vam
              jo predstavljamo, smo pod mentorstvom dr. doc. Luke Pavlič začeli
              v sklopu zaključnega projekta ob koncu 2. letnika. Po koncu petih
              tednov obveznega dela smo verjeli, da imamo dobro idejo, možnosti
              izboljšave in smisel za delo, smo se odločili nadaljevati z
              razvojem tudi v prostem času. Mi smo ekipa, za Varno Domov:
            </p>
          </Col>
        </Row>
        <Row className="teamTitles">
          <Col xl={3} md={6} xs={12}>
            <img className="teamPhoto" src={MG} alt="person" />
            <p className="teamName">Marko Gluhak</p>
            <p>Vodja in razvijalec zalednega sistema</p>
          </Col>
          <Col xl={3} md={6} xs={12}>
            <img className="teamPhoto" src={MK} alt="person" />
            <p className="teamName">Maruša Konečnik</p>
            <p>Razvijalka strojnega učenja</p>
          </Col>
          <Col xl={3} md={6} xs={12}>
            <img className="teamPhoto" src={PG} alt="person" />
            <p className="teamName">Pina Gornik</p>
            <p>Razvijalka grafičnega vmesnika</p>
          </Col>
          <Col xl={3} md={6} xs={12}>
            <img className="teamPhoto" src={NF} alt="person" />
            <p className="teamName">Nataša Feher</p>
            <p>Grafična oblikovalka</p>
          </Col>
        </Row>
      </Container>
    </React.Fragment>
  );
}
export default About;
