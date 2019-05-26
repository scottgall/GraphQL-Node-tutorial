const { GraphQLServer } = require('graphql-yoga');
const { prisma } = require('./generated/prisma-client');
const Query = require('./resolvers/Query')
const Mutation = require('./resolvers/Mutation')
const Subscription = require('./resolvers/Subscription')
const User = require('./resolvers/User')
const Link = require('./resolvers/Link')
const Vote = require('./resolvers/Vote')

const resolvers = {
    Query,
    Mutation,
    Subscription,
    User,
    Link,
    Vote,
}
//     Query: {
//         info: () => 'hi betch',
//         feed: () => (root, args, context, info) => {
//             return context.prisma.links();
//         },
//         // link: (parent, args) => {
//         //     function hasID(obj) {
//         //         return args.id === obj.id;
//         //     };
//         //     let index = links.findIndex(hasID);
//         //     return links[index];
//         // }
//     },
//     Mutation: {
//         post: (root, args, context) => {
//             return context.prisma.createLink({
//                 url: args.url,
//                 description: args.description,
//             });
//         },
//         updateLink: (root, args, context) => {
//             return context.prisma.updateLink({
//                 data: {
//                     url: args.url,
//                     description: args.description,
//                 },
//                 where: {
//                     id: args.id
//                 },
//             });
    
//         },
//         deleteLink: (root, args, context) => {
//             return context.prisma.deleteLink({
//                 id: args.id
//             });
//         },
//     },
// }

const server = new GraphQLServer({
    typeDefs: './src/schema.graphql',
    resolvers,
    context: request => {
        return {
            ...request,
            prisma,
        }
    },
})
server.start(() => console.log(`Server is running on http://localhost:4000`))