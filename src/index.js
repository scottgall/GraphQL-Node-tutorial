const { GraphQLServer } = require('graphql-yoga');

let links = [{
    id: 'link-0',
    url: 'www.howtographql.com',
    description: 'Fullstack tutorial for GraphQL'
}]

let idCount = links.length

const resolvers = {
    Query: {
        info: () => 'hi betch',
        feed: () => links,
        link: (parent, args) => {
            function hasID(obj) {
                return args.id === obj.id
            };
            let index = links.findIndex(hasID);
            return links[index];
        }
    },
    Mutation: {
        post: (parent, args) => {
            const link = {
                id: `link-${idCount++}`,
                description: args.description,
                url: args.url,
            };
            links.push(link);
            return link;
        },
        updateLink: (parent, args) => {
            function hasID(obj) {
                return args.id === obj.id
            };
            let index = links.findIndex(hasID);
            links[index]['url'] = args.url;
            links[index]['description'] = args.description; 
            return links[index];          
        }
    },
}

const server = new GraphQLServer({
    typeDefs: './src/schema.graphql',
    resolvers,
})
server.start(() => console.log(`Server is running on http://localhost:4000`))