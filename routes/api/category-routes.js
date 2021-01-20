const router = require('express').Router();
const { Category, Product } = require('../../models');

// The `/api/categories` endpoint

router.get('/', (_req, res) => {
  // find all categories
  // be sure to include its associated Products
  Category.findAll({include: [Product]})
  .then((categories) =>{
    console.log("getroute",categories)
    res.json(categories)
  })
});

router.get('/:id', (req, res) => {
  // find one category by its `id` value
  // be sure to include its associated Products
  Category.findOne({
    where: {id: req.params.id},include: [Product]})
  .then((categories) =>{
    console.log("getrouteid",categories)
    res.json(categories)
  })
});

router.post('/', (req, res) => {
  // create a new category
  Category.create(req.body)
  .then((categories) =>{
    console.log("postroute",categories)
    res.json(categories)
  })
});

router.put('/:id', (req, res) => {
  // update a category by its `id` value
  Category.update(req.body,{
    where: {id: req.params.id}})
  .then((categories) =>{
    console.log("updateroute",categories)
    res.json(categories)
  })
});

router.delete('/:id', (req, res) => {
  // delete a category by its `id` value
  Category.destroy({
    where: {id: req.params.id}})
  .then((categories) =>{
    console.log("deleteroute",categories)
    res.json(categories)
  })
});

module.exports = router;
