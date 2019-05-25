const { GraphQLServer } = require('graphql-yoga');
const { prisma } = require('./generated/prisma-client');

const resolvers = {
    Query: {
        info: () => 'hi betch',
        feed: () => (root, args, context, info) => {
            return context.prisma.links();
        },
        // link: (parent, args) => {
        //     function hasID(obj) {
        //         return args.id === obj.id;
        //     };
        //     let index = links.findIndex(hasID);
        //     return links[index];
        // }
    },
    Mutation: {
        post: (root, args, context) => {
            return context.prisma.createLink({
                url: args.url,
                description: args.description,
            });
        },
        updateLink: (root, args, context) => {
            return context.prisma.updateLink({
                data: {
                    url: args.url,
                    description: args.description,
                },
                where: {
                    id: args.id
                }
            });
    
        },
        // deleteLink: (parent, args) => {
        //     function hasID(obj) {
        //         return args.id === obj.id;
        //     };
        //     let index = links.findIndex(hasID);
        //     links.splice(index, 1);
        //     return links;
        // }
    },
}

const server = new GraphQLServer({
    typeDefs: './src/schema.graphql',
    resolvers,
    context: { prisma },
})
server.start(() => console.log(`Server is running on http://localhost:4000`))