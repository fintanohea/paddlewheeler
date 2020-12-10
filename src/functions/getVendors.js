
const sanityClient = require('@sanity/client')
require('dotenv').config({path:__dirname+'/./../.env'})

const sanity = sanityClient({
  projectId: process.env.SANITY_PROJECT_ID,
  dataset: process.env.SANITY_DATASET,
  token: process.env.SANITY_TOKEN,
  useCdn: false
})

exports.handler = (event, context, callback) => {
    const category = event.queryStringParameters.category
    let params = {}
    let query = '*[_type == "vendor"'

    if(category !== 'undefined'){
        query = query + ' && categories[]._ref == $category'
        params = {category: category}
      }
    query = query + ']'  

    sanity.fetch(query, params).then(results => {
      const vendors = results.map(x => {
        const output = {
            id: x._id,
            name: x.title
        }
    
        return output
      })

      callback(null, {
          statusCode: 200,
          headers: {
          'Content-Type': 'application/json',
          },
          body: JSON.stringify(vendors),
      })
  })
}