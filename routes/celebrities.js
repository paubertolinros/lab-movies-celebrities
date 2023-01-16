const router = require("express").Router();
const Celebrity = require('../models/Celebrity.model')


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
})

/* GET Show a form to create a celebrity */
/* ROUTE /celebrities/create/*/
router.get('/create', async (req, res, next) => {
  try {
    res.render('celebrities/new-celebrity')
  } catch (error) {
    next(error)
  }
})

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
})



module.exports = router;