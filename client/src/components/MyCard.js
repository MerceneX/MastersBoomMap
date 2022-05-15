import React from 'react';
import PropTypes from 'prop-types';

import Button from '@material-ui/core/Button';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';

import Typography from '@material-ui/core/Typography';
import { withStyles } from '@material-ui/core/styles';
import LineChart from './graphs/LineChart';

const styles = theme => ({
  cardGrid: {
    padding: `${theme.spacing.unit * 8}px 0`
  },
  card: {
    height: '100%',
    display: 'flex',
    flexDirection: 'column'
  },
  cardMedia: {
    paddingTop: '56.25%' // 16:9
  },
  cardContent: {
    flexGrow: 1
  }
});

function MyCard(props) {
  const { classes } = props;

  return (
    <React.Fragment>
      <Card.Group>
        <Card className={classes.card}>
          <CardMedia>
            <LineChart />
          </CardMedia>

          <CardContent className={classes.cardContent}>
            <Typography gutterBottom variant="h5" component="h2">
              Heading
            </Typography>
            <Typography>
              This is a media card. You can use this section to describe the
              content.
            </Typography>
          </CardContent>
          <CardActions>
            <Button size="small" color="primary">
              View
            </Button>
            <Button size="small" color="primary">
              Edit
            </Button>
          </CardActions>
        </Card>
      </Card.Group>
    </React.Fragment>
  );
}

MyCard.propTypes = {
  classes: PropTypes.object.isRequired
};

export default withStyles(styles)(MyCard);
