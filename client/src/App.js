import React from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import './components/design/App.css';
import Footer from './components/layout/Footer';
import Navigation from './components/layout/Navigation';
import Header from './components/layout/Header';
import FrontPage from './pages/FrontPage';
import Statistics from './pages/Statistics';
import Novice from './pages/Novice';
import Home from './pages/Home';
import About from './pages/About';
import 'leaflet/dist/leaflet.css';
import Container from 'reactstrap/es/Container';
import StanjeNaCestah from './pages/StanjeNaCestah';
import Napovedi from './pages/Napovedi';

function App() {
  return (
    <Router>
      <div className="App">
        <Header />
        <Navigation />

        <Route exact path="/" component={FrontPage} />
        <Container></Container>
        <Route path="/statistika" component={Statistics} />
        <Route path="/onas" component={About} />
        <Route path="/zemljevid" component={Home} />
        <Route path="/prometnenovice" component={Novice} />
        <Route path="/stanjenacestah" component={StanjeNaCestah} />
        <Route path="/napovedi" component={Napovedi} />
      </div>
      <Footer />
    </Router>
  );
}
export default App;
