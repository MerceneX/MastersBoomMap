import React from 'react';
import PropTypes from 'prop-types';
import Card from '@material-ui/core/Card';
import CardMedia from '@material-ui/core/CardMedia';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';
import CardActions from '@material-ui/core/CardActions';
import Button from '@material-ui/core/Button';
import BarChart from './graphs/NesreceLeto';
class MyCard2 extends React.Component {
  render() {
    return (
      <React.Fragment>
        <Card>
          <CardMedia>
            <BarChart />
          </CardMedia>
          <CardContent>
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
      </React.Fragment>
    );
  }
}

//PropTypes
MyCard2.propTypes = {
  classes: PropTypes.object.isRequired
};
export default MyCard2;
