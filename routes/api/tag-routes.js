const router = require('express').Router();
const { tag, Product, ProductTag } = require('../../models');

// The `/api/tag` endpoint

router.get('/', (_req, res) => {
  // find all tag
  // be sure to include its associated Product data
  tag.findAll({include: [Category,{
    model: Product,
    through: ProductTag
  }]})
  .then((tag) =>{
    console.log("taggetroute",tag)
    res.json(tag)
  })
});

router.get('/:id', (req, res) => {
  // find a single tag by its `id`
  // be sure to include its associated Product data
  tag.findOne({
    where: {id: req.params.id},include: [{
      model: Product,
      through: ProductTag
    }]})
  .then((tag) =>{
    console.log("taggetid",tag)
    res.json(tag)
  })
});

router.post('/', (req, res) => {
  // create a new tag
  tag.create(req.body)
  .then((tag) =>{
    console.log("postroutetag",tag)
    res.json(tag)
  })
});

router.put('/:id', (req, res) => {
  // update a tag's name by its `id` value
  tag.update(req.body,{
    where: {id: req.params.id}})
  .then((tag) =>{
    console.log("updateroutetag",tag)
    res.json(tag)
  })
});

router.delete('/:id', (req, res) => {
  // delete on tag by its `id` value
  tag.destroy({
    where: {id: req.params.id}})
  .then((tag) =>{
    console.log("deleteroutetag",tag)
    res.json(tag)
  })
});

module.exports = router;
