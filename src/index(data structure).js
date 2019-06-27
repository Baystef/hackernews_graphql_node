const { GraphQLServer } = require('graphql-yoga');


let links = [{
  id: 'link-0',
  url: 'daramolasteve.netlify.com/portfolio',
  description: 'Fullstack tutorial for GraphQL',
},
{
  id: 'link-1',
  url: 'baystef.github.io',
  description: 'My GitHub profile link',
}]
let idCount = links.length;

const resolvers = {
  Query: {
    info: () => `This is the API of a Hackernews Clone`,
    feed: () => links,
    link: (parent, args) => {
      const link = links.find(link => link.id === args.id)
      if (!link) {
        throw new Error('Link does not exist')
      }
      return link;
    }
  },

  Mutation: {
    post: (parent, args) => {
      const link = {
        id: `link-${idCount++}`,
        description: args.description,
        url: args.url,
      }
      links.push(link)
      return link
    },
    updateLink: (parent, args) => {
      let updatedLink;
      links = links.map((link) => {
        if (link.id === args.id) {
          updatedLink = {
            id: link.id,
            description: args.description !== undefined ? args.description : link.description,
            url: args.url !== undefined ? args.url : link.url,
          };
          return updatedLink;
        } else {
          return link;
        }
      })
      return updatedLink;
    },
    deleteLink: (parent, args) => {
      const deleteLink = links.find(link => link.id === args.id);
      links = links.filter(link => link.id !== deleteLink.id);
      return deleteLink;
    }
  },


  // Server infers what they look like so no need for Link resolvers
  // Link: {
  //   id: (parent) => parent.id,
  //   description: (parent) => parent.description,
  //   url: (parent) => parent.url
  // }
}

const server = new GraphQLServer({
  typeDefs: './src/schema.graphql',
  resolvers,
})

server.start(() => console.log(`Server is running on http://localhost:4000`))