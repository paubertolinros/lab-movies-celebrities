const router = require("express").Router();
const Movie = require('../models/Movie.model');
const Celebrity = require('../models/Celebrity.model');

/* GET Show all movies */
/* ROUTE /movies/ */
router.get('/', async (req, res, next) => {
  try {
    const allMovies = await Movie.find({})
    res.render('movies/movies', { allMovies })
  } catch (error) {
    next(error)
  }
});


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
});

/* POST delete specific movie */
/* ROUTE /movies/delete/:id */
router.post('/delete/:movieId', async (req, res, next) => {
  const { movieId } = req.params;
  try {
    await Movie.findByIdAndRemove(movieId);
    res.redirect('/movies')
  } catch (error) {
    next(error)
  }
});

/* GET Show a form to edit a movie */
/* ROUTE /movies/edit/:id */
router.get('/edit/:movieId', async (req, res, next) => {
  const { movieId } = req.params;
  try {
    const movie = await Movie.findById(movieId).populate("cast")
    const celebrity = await Celebrity.find({ movieId });
    console.log('This is the movie:', movie)
    console.log('These are the celebreties:', celebrity)
    res.render('movies/edit-movie', { movie, celebrity })
  } catch (error) {
    next(error)
  }
});

/* POST get data from form --> update specific movie*/
/* ROUTE /movies/edit/:id/ */
router.post('/edit/:movieId', async (req, res, next) => {
  const { movieId } = req.params;
  const { title, genre, plot, cast } = req.body;
  try {
    await Movie.findByIdAndUpdate(movieId, {title, genre, plot, cast});
    res.redirect('/movies')
  } catch (error) {
    next(error)
  }
});

/* GET Show movie detail */
/* ROUTE /movies/:id */
router.get('/:movieId', async (req, res, next) => {
  const { movieId } = req.params;
  try {
    const movieDetails = await Movie.findById(movieId).populate('cast');
    res.render('movies/movie-details', { movieDetails })
  } catch (error) {
    next(error)
  }
});

module.exports = router;