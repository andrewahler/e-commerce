const router = require('express').Router();
const { Product, Category, Tag, ProductTag } = require('../../models');

// The `/api/products` endpoint

// get all products
router.get('/', (_req, res) => {
  // find all products
  // be sure to include its associated Category and Tag data
  Product.findAll({include: [Category,{
    model: Tag,
    through: ProductTag
  }]})
  .then((products) =>{
    console.log("getroute",products)
    res.json(products)
  })
});

// get one product
router.get('/:id', (req, res) => {
  // find a single product by its `id`
  // be sure to include its associated Category and Tag data
  Products.findOne({
    where: {id: req.params.id},include: [Category,{
      model: Tag,
      through: ProductTag
    }]})
  .then((product) =>{
    console.log("product",product)
    res.json(product)
  })
});

// create new product
router.post('/', (req, res) => {
  /* req.body should look like this...
    {
      product_name: "Basketball",
      price: 200.00,
      stock: 3,
      tagIds: [1, 2, 3, 4]
    }
  */
  Product.create(req.body)
    .then((product) => {
      // if there's product tag, we need to create pairings to bulk create in the ProductTag model
      if (req.body.tagIds.length) {
        const productTagIdArr = req.body.tagIds.map((tag_id) => {
          return {
            product_id: product.id,
            tag_id,
          };
        });
        return ProductTag.bulkCreate(productTagIdArr);
      }
      // if no product tag, just respond
      res.status(200).json(product);
    })
    .then((productTagIds) => res.status(200).json(productTagIds))
    .catch((err) => {
      console.log(err);
      res.status(400).json(err);
    });
});

// update product
router.put('/:id', (req, res) => {
  // update product data
  Product.update(req.body, {
    where: {
      id: req.params.id,
    },
  })
    .then((_product) => {
      // find all associated tag from ProductTag
      return ProductTag.findAll({ where: { product_id: req.params.id } });
    })
    .then((producttag) => {
      // get list of current tag_ids
      const productTagIds = producttag.map(({ tag_id }) => tag_id);
      // create filtered list of new tag_ids
      const newProducttag = req.body.tagIds
        .filter((tag_id) => !productTagIds.includes(tag_id))
        .map((tag_id) => {
          return {
            product_id: req.params.id,
            tag_id,
          };
        });
      // figure out which ones to remove
      const producttagToRemove = producttag
        .filter(({ tag_id }) => !req.body.tagIds.includes(tag_id))
        .map(({ id }) => id);

      // run both actions
      return Promise.all([
        ProductTag.destroy({ where: { id: producttagToRemove } }),
        ProductTag.bulkCreate(newProducttag),
      ]);
    })
    .then((updatedProducttag) => res.json(updatedProducttag))
    .catch((err) => {
      // console.log(err);
      res.status(400).json(err);
    });
});

router.delete('/:id', (req, res) => {
  // delete one product by its `id` value
  Product.destroy({
    where: {id: req.params.id}})
  .then((product) =>{
    console.log("deleteroute",product)
    res.json(product)
  })
});

module.exports = router;
