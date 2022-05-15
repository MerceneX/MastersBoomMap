import React from 'react';
import Typography from '@material-ui/core/Typography';
import PropTypes from 'prop-types';
import '../design/App.css';
import { withStyles } from '@material-ui/core';

import Domovanje from '../design/structure_domovanje_logo_360x65.png';
import UM from '../design/UMLogo.png';
import FERI from '../design/FERILogo.png';

function Footer(props) {
  return (
    <footer className="footer">
      <h6 align="center" gutterBottom>
        Vir podatkov: <a href="https://www.avp-rs.si/">avp-rs.si</a>
      </h6>
      <hr />
      <div className="sponsorsContainer">
        <h6>Naš izdelek so podprli:</h6>
        <div className="sponsorLogos">
          <a href="https://www.um.si">
            <img className="sponsorLogo" src={UM} alt="UM Logo" />
          </a>
          <a href="https://feri.um.si/">
            <img className="sponsorLogo" src={FERI} alt="FERI Logo" />
          </a>
          <a href="https://www.domovanje.com/">
            <img className="sponsorLogo" src={Domovanje} alt="DomovanjeLogo" />
          </a>
        </div>
      </div>
      <hr />
      <Typography
        variant="subtitle1"
        align="center"
        color="textSecondary"
        component="p">
        Kontakt: info@varno-domov.si
      </Typography>
    </footer>
  );
}

Footer.propTypes = {
  classes: PropTypes.object.isRequired
};

const styles = theme => ({
  footer: {
    backgroundColor: '#E1DDDB',
    padding: theme.spacing.unit * 6
  }
});
export default withStyles(styles)(Footer);
