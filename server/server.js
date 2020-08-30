require('./config')
const { movies } = require('./omdb-movies')
const express = require('express')
const app = express()
const bodyParser = require('body-parser')


// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }))

// parse application/json
app.use(bodyParser.json())


app.get('/peliculas', function (req, res) {
  res.json(movies['Search'])
})

app.get('/peliculas/:id', function (req, res) {
  const movie = movies['Search'].filter(m => m['imdbID'] == req.params.id)
  res.json(movie)
})

app.post('/peliculas', function (req, res) {
  movies['Search'].push(req.body)
  res.json(movies['Search'][movies['Search'].length -1])
})

app.put('/peliculas', function (req, res) {
  var toUpdate = req.body
  var index = -1
  for (var i in movies['Search']) {
    if (movies['Search'][i]['imdbID'] == toUpdate['imdbID']) {
      movies['Search'][i].Title = toUpdate['Title'];
      movies['Search'][i].Type = toUpdate['Type'];
      movies['Search'][i].Year = toUpdate['Year'];
      movies['Search'][i].Poster = toUpdate['Poster'];
      index = i
      break; //Encontramos la peli. Ya no seguimos buscando!
    }
  }
  res.json(movies['Search'][index])
})

app.delete('/peliculas/:id', function (req, res) {
  var toDelete = req.params.id
  var index = -1
  index = movies['Search'].findIndex(m => m['imdbID'] == toDelete)
  //console.log('index =', index)
  movies['Search'].splice(index,1)
  res.json('peli borrada pelicula'+ index)
})


app.listen(process.env.PORT, () => {
  console.log('server iniciado en puerto', process.env.PORT)
})