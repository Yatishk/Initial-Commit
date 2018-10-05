const express = require('express');
const hbs = require('hbs');
const fs = require('fs')
var app = express();
const port = process.env.PORT || 4040

// app.use((res, req, next) => {
//   res.res.render('maintainence.hbs');
// })

hbs.registerPartials(__dirname + '/views/partials')
app.set('view engine', 'hbs');
app.use(express.static(__dirname + '/public'));

app.use((res, req, next) => {
  var date = new Date().toString();
  var log = `${date}: ${req.req.method} ${req.req.url}`;
  fs.appendFile('server.log', log + '\n', err => {
    if (err) {
      console.log('Unable to append to Server.log')
    }
  })
  console.log(log)
  next();
})



hbs.registerHelper('getCurrentYear', () => {
  return new Date().getFullYear()
});

hbs.registerHelper('screamIt', (text) => {
  return text.toUpperCase();
});

app.get('/', (req, res) => {
  res.render('home.hbs', {
    pageTitle: 'Home Page',
    welcomeMessage: 'Welcome to my website'
  });
});

app.get('/about', (req, res) => {
  res.render('about.hbs', {
    pageTitle: 'About Page'
  });
});

app.get('/project', (req, res) => {
  res.render('portfolio.hbs', {
    pageTitle: 'Portfolio Page'
  });
});

// /bad - send back json with errorMessage
app.get('/bad', (req, res) => {
  res.send({
    errorMessage: 'Unable to handle request'
  });
});

app.listen(port, () => {
  console.log(`Server is up on port ${port}`);
});
