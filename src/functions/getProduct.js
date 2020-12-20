const sanityClient = require('@sanity/client')
const imageUrlBuilder = require('@sanity/image-url')
const blocksToHtml = require('@sanity/block-content-to-html')
require('dotenv').config({path:__dirname+'/./../.env'})

const sanity = sanityClient({
  projectId: process.env.SANITY_PROJECT_ID,
  dataset: process.env.SANITY_DATASET,
  token: process.env.SANITY_TOKEN,
  useCdn: false
})

exports.handler = (event, context, callback) => {

    const productId = event.queryStringParameters.id
    const query = '*[_type == "product" && _id == $id] {  ..., sides[]->{_id, title, price} }'
    
    const params = {id: productId}

    sanity.fetch(query, params).then(results => {
      const products = results.map(x => {
          const output = {
            id: x._id ? x._id : '',
            name: x.title ? x.title : '',
            slug: x.slug.current ? x.slug.current : '',
            url: x._id ? `${process.env.URL}/.netlify/functions/getProduct?id=${x._id}` : '',
            price: x.price ? x.price : '',
            description: x.description ? x.description : '',
            body: x.body ? blocksToHtml({blocks: x.body.en}) : '',
            sides: x.sides ? x.sides : null
          }

          let images = []

          if (x.images && x.images.length > 1) {
            x.images.map( img => {
              images.push(imageUrlBuilder(sanity).image(img).size(900, 900).fit('fillmax').url())
            })

            output.images = images
          }
          else {
            x.images && x.images.length > 0
              ? output.image = imageUrlBuilder(sanity).image(x.defaultProductVariant.images[0].asset._ref).size(900, 900).fit('fillmax').url()
              : output.image = '/assets/img/No_image_available.png'

            output.images = [output.image]
          }
    
          return output;
      })

      callback(null, {
          statusCode: 200,
          headers: {
          'Content-Type': 'application/json',
          },
          body: JSON.stringify(products[0]),
      })
  })
}