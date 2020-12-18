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
    const category = event.queryStringParameters.category
    let query
    let params = {}

    category !== 'undefined' 
      ? (query = '*[_type == "product" && categories[]._ref == $category]',
        params = {category: category})
      : query = '*[_type == "product"]'

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
        }
  
        x.images && x.images.length > 0
          ? output.image = imageUrlBuilder(sanity).image(x.images[0].asset._ref).size(300, 300).fit('fillmax').url()
          : output.image = '/assets/img/No_image_available.png'
  
        return output
      })

      callback(null, {
          statusCode: 200,
          headers: {
          'Content-Type': 'application/json',
          },
          body: JSON.stringify(products),
      })
  })
}