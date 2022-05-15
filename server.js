setupEnv(process.env.NODE_ENV);

const express = require('express'),
  app = express(),
  cors = require('cors');

const graphRoutes = require('./routes/graphRoutes');
const contentRoutes = require('./routes/contentRoutes');
const database = require('./config/database');

app.use(cors());
app.use('/api/graph', graphRoutes);
app.use('/api/content', contentRoutes);

if (process.env.NODE_ENV === 'production') {
  app.use(express.static('client/build'));

  app.get('*', (req, res) => {
    res.sendFile(path.resolve(__dirname, 'client', 'build', 'index.html'));
  });
}

const port = process.env.PORT || 5000;
database.connect(err => {
  if (err) {
    console.log('Unable to connect database');
    process.exit(1);
  } else {
    console.log('Connected to database');
    app.listen(port, () => console.log(`Server started on port ${port}`));
  }
});

function setupEnv(env) {
  //comment for commiit
  if (env) {
    require('dotenv').config({
      path: `${__dirname}/.env.${process.env.NODE_ENV}`
    });
    console.log(`${__dirname}/.env.${process.env.NODE_ENV}`);
  } else {
    console.log(`${__dirname}/.env.${process.env.NODE_ENV}`);
    console.log('Please specify apps running environment.\nExiting...');
    process.exit(1);
  }
}
