const functions = require('firebase-functions');

const express = require('express');
const app = express();
const { ApolloServer, gql } = require('apollo-server-express')

const mergeResolver = require('./src/libs/mergeResolver');
const modules = require('./src/modules');

const resolvers = mergeResolver(modules);
console.log('resolver', resolvers);

const typeDefs = gql`
type User {
	id:String
	name:String
}
type Blog {
	name:String
}
type Mutation {
	postUpdate:String
}
type Query {
	getUser:[User]
	getBlog:Blog
}

`;


const server = new ApolloServer({ typeDefs, resolvers });
server.applyMiddleware({ app, path: "/", cors: true });


// Create and Deploy Your First Cloud Functions
// https://firebase.google.com/docs/functions/write-firebase-functions

// exports.helloWorld = functions.https.onRequest((request, response) => {
// 	functions.logger.info("Hello logs!", { structuredData: true });
// 	response.send("Hello from Firebase!");
// });

exports.graphql = functions.https.onRequest(app)