
const sanityClient = require('@sanity/client')
require('dotenv').config({path:__dirname+'/./../.env'})

const sanity = sanityClient({
  projectId: process.env.SANITY_PROJECT_ID,
  dataset: process.env.SANITY_DATASET,
  token: process.env.SANITY_TOKEN,
  useCdn: false
})

exports.handler = (event, context, callback) => {

    const query = '*[_type == "category"] | order(order asc)'
    const params = {}

    sanity.fetch(query, params).then(results => {
      const categories = results.map(x => {
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
          body: JSON.stringify(categories),
      })
  })
}