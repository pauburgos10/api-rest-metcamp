require('./config')
const { movies } = require('./omdb-movies')
const express = require('express')
const app = express()
const bodyParser = require('body-parser')

var movies_result = movies['Search'];

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }))

// parse application/json
app.use(bodyParser.json())


app.get('/peliculas', function (req, res) {
  res.json(movies_result)
})

app.get('/peliculas/:id', function (req, res) {
  const movie = movies_result.filter(m => m['imdbID'] == req.params.id)
  res.json(movie)
})

app.post('/peliculas', function (req, res) {
  movies_result.push(req.body)
  res.json(movies_result[movies_result.length -1])
})

app.put('/peliculas', function (req, res) {
  var toUpdate = req.body
  var index = -1
  for (var i in movies_result) {
    if (movies_result[i]['imdbID'] == toUpdate['imdbID']) {
      movies_result[i].Title = toUpdate['Title'];
      movies_result[i].Type = toUpdate['Type'];
      movies_result[i].Year = toUpdate['Year'];
      movies_result[i].Poster = toUpdate['Poster'];
      index = i
      break; //Encontramos la peli. Ya no seguimos buscando!
    }
  }
  res.json(movies_result[index])
})

app.delete('/peliculas/:id', function (req, res) {
  var toDelete = req.params.id
  var index = -1
  index = movies_result.findIndex(m => m['imdbID'] == toDelete)
  movies_result.splice(index,1)
  res.json('peli borrada pelicula'+ index)
})


app.listen(process.env.PORT, () => {
  console.log('server iniciado en puerto', process.env.PORT)
})