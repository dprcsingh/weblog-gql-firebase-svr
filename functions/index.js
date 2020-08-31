const functions = require("firebase-functions");

const path = require("path");
const express = require("express");
const app = express();
const { ApolloServer, gql } = require("apollo-server-express");

const mergeResolver = require("./src/libs/mergeResolver");
const modules = require("./src/modules");
const { mergeTypes, fileLoader } = require("merge-graphql-schemas");

const typeDefs = mergeTypes(fileLoader(path.join(__dirname, "./**/*.graphql")));
const resolvers = mergeResolver(modules);
console.log("resolver", typeDefs);

const server = new ApolloServer({ typeDefs, resolvers });
server.applyMiddleware({ app, path: "/", cors: true });

// Create and Deploy Your First Cloud Functions
// https://firebase.google.com/docs/functions/write-firebase-functions

// exports.helloWorld = functions.https.onRequest((request, response) => {
// 	functions.logger.info("Hello logs!", { structuredData: true });
// 	response.send("Hello from Firebase!");
// });

exports.graphql = functions.https.onRequest(app);
