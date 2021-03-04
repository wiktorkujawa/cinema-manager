"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
require("reflect-metadata");
const apollo_server_express_1 = require("apollo-server-express");
const express_1 = __importDefault(require("express"));
const next_1 = __importDefault(require("next"));
const type_graphql_1 = require("type-graphql");
const typeorm_1 = require("typeorm");
const post_1 = require("./resolvers/post");
// import bodyParser from 'body-parser';
// import cors from 'cors';
const dev = process.env.NODE_ENV !== "production";
const app = next_1.default({ dev });
const handle = app.getRequestHandler();
const port = process.env.PORT || 3000;
(async () => {
    console.log(process.env.mongoURI);
    await typeorm_1.createConnection({
        type: "mongodb",
        url: process.env.mongoURI,
        useNewUrlParser: true,
        useUnifiedTopology: true,
        synchronize: true,
        logging: false,
        entities: [
            __dirname + "/entity/**/*.js"
        ],
        migrations: [
            __dirname + "/migration/**/*.js"
        ],
        subscribers: [
            __dirname + "/subscriber/**/*.js"
        ],
        cli: {
            entitiesDir: __dirname + "/entity",
            migrationsDir: __dirname + "/migration",
            subscribersDir: __dirname + "/subscriber"
        }
    });
    try {
        await app.prepare();
        const server = express_1.default();
        // server.use(bodyParser.urlencoded({ extended: true }))
        // server.use(bodyParser.json())
        // const server = express();
        // server.use(cors());
        const apolloServer = new apollo_server_express_1.ApolloServer({
            introspection: true,
            playground: true,
            schema: await type_graphql_1.buildSchema({
                resolvers: [post_1.PostResolver],
                validate: false,
            })
        });
        apolloServer.applyMiddleware({
            app: server,
        });
        server.all("*", (req, res) => {
            return handle(req, res);
        });
        server.listen(port, (err) => {
            if (err)
                throw err;
            console.log(`> Ready on localhost:${port} - env ${process.env.NODE_ENV}`);
        });
    }
    catch (e) {
        console.error(e);
        process.exit(1);
    }
})();
