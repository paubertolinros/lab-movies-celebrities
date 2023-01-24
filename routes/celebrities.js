const router = require("express").Router();
const Celebrity = require('../models/Celebrity.model');
const Movie = require('../models/Movie.model')


/* GET Show all celebrities */
/* ROUTE /celebrities/*/
router.get('/', async (req, res, next) => {
  try {
    const celebrities = await Celebrity.find({}).sort({ name: 1 });
    console.log('These are your celebrities:', celebrities)
    res.render('celebrities/celebrities', { celebrities })
  } catch (error) {
    next(error)
  }
});

/* GET Show a form to create a celebrity */
/* ROUTE /celebrities/create/*/
router.get('/create', async (req, res, next) => {
  try {
    res.render('celebrities/new-celebrity')
  } catch (error) {
    next(error)
  }
});

/* POST get data from form -->create the celebrity --> save it database */
/* ROUTE /celebrities/create/*/
router.post('/create', async (req, res, next) => {
  const { name, occupation, catchPhrase } = req.body;
  try {
    await Celebrity.create({ name, occupation, catchPhrase });
    res.redirect('/celebrities')
  } catch (error) {
    res.render('celebrities/new-celebrity')
    //next(error)
  }
});


/* GET Show celebrity detail */
/* ROUTE /celebrities/:celebrityId*/
router.get('/:celebrityId', async (req, res, next) => {
  const { celebrityId } = req.params;
  try {
    const celebrityDetail = await Celebrity.findById(celebrityId);
    res.render('celebrities/celebrityDetail', celebrityDetail)
  } catch (error) {
    next(error)
  }
});

/* GET Update celebrity form */
/* ROUTE /celebrities/edit/:celebrityId*/
router.get('/edit/:celebrityId', async (req, res, next) => {
  const { celebrityId } = req.params;
  try {
    const celebrityDetail = await Celebrity.findById(celebrityId);
    res.render('celebrities/editCelebrity', celebrityDetail)
  } catch (error) {
    next(error)
  }
});

/* POST Update celebrity form */
/* ROUTE /celebrities/edit/:celebrityId*/
router.post('/edit/:celebrityId', async (req, res, next) => {
  const { celebrityId } = req.params;
  const { name, occupation, catchPhrase } = req.params;
  try {
    await Celebrity.findByIdAndUpdate(celebrityId, {name, occupation, catchPhrase}, {new:true});
    res.redirect('/celebrities')
  } catch (error) {
    next(error)
  }
});

/* GET Delete celebrity */
/* ROUTE /celebrities/delete/:celebrityId*/
router.get('/delete/:celebrityId', async (req, res, next) => {
  const { celebrityId } = req.params;
  try {
    await Celebrity.findById(celebrityId);
    res.redirect('/celebrities');
  } catch (error) {
    next(error)
  }
});

module.exports = router;
