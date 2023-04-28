/**
 * Implement Gatsby's Node APIs in this file.
 *
 * See: https://www.gatsbyjs.com/docs/reference/config-files/gatsby-node/
 */

/**
 * @type {import('gatsby').GatsbyNode['createPages']}
 */
exports.createPages = async ({ graphql, actions, reporter }) => {
  const { createPage } = actions

  const blogresult = await graphql(`
    query {
      allMarkdownRemark {
        edges {
          node {
            id
            parent {
              ... on File {
                name
              }
            }
          }
        }
      }
    }
  `)

  if (blogresult.errors) {
    reporter.panicOnBuild(`Error occured.`)
    return
  }

  blogresult.data.allMarkdownRemark.edges.forEach(({ node }) => {
    createPage({
      path: `/${node.parent.name}/`,
      component: require.resolve(`./src/templates/single-template.js`),
      context: {
        id: node.id,
      },
    })
  })
}
