const router = require("express").Router();
const Movie = require('../models/Movie.model');
const Celebrity = require('../models/Celebrity.model')

/* GET Show a form to create movie */
/* ROUTE /movies/create/ */
router.get('/create', async (req, res, next) => {
  try {
    const allArtists = await Celebrity.find({});
    res.render('movies/new-movie', { allArtists });
  } catch (error) {
    next(error)
  }
});

/* POST get data from form -->create new movie --> save it database */
/* ROUTE /movies/create/ */
router.post('/create', async (req, res, next) => {
  const { title, genre, plot, cast } = req.body;
  try {
    await Movie.create({ title, genre, plot, cast });
    res.redirect('/movies')
  } catch (error) {
    next(error)
  }
})

module.exports = router;