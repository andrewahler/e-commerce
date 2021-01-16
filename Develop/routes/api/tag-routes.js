const router = require('express').Router();
const { Tags, Product, ProductTag } = require('../../models');

// The `/api/tags` endpoint

router.get('/', (req, res) => {
  // find all tags
  // be sure to include its associated Product data
  Tags.findAll({include: [Category,{
    model: Product,
    through: ProductTag
  }]})
  .then((tags) =>{
    console.log("taggetroute",tags)
    res.json(tags)
  })
});

router.get('/:id', (req, res) => {
  // find a single tag by its `id`
  // be sure to include its associated Product data
  Tags.findOne({
    where: {id: req.params.id},include: [{
      model: Product,
      through: ProductTag
    }]})
  .then((tags) =>{
    console.log("tagsgetid",tags)
    res.json(tags)
  })
});

router.post('/', (req, res) => {
  // create a new tag
  Tags.create(req.body)
  .then((tags) =>{
    console.log("postroutetags",tags)
    res.json(tags)
  })
});

router.put('/:id', (req, res) => {
  // update a tag's name by its `id` value
  Tags.update(req.body,{
    where: {id: req.params.id}})
  .then((tags) =>{
    console.log("updateroutetags",tags)
    res.json(tags)
  })
});

router.delete('/:id', (req, res) => {
  // delete on tag by its `id` value
  Tags.destroy({
    where: {id: req.params.id}})
  .then((tags) =>{
    console.log("deleteroutetags",tags)
    res.json(tags)
  })
});

module.exports = router;
