import 'reflect-metadata';
import { ApolloServer } from "apollo-server-express";
import express, { Request, Response } from "express";
import next from "next";
import { buildSchema } from "type-graphql";
import { createConnection } from "typeorm";
import { PostResolver } from "./resolvers/post";
// import bodyParser from 'body-parser';
// import cors from 'cors';

const dev = process.env.NODE_ENV !== "production";
const app = next({ dev });
const handle = app.getRequestHandler();
const port = process.env.PORT || 3000;

(async () => {
  console.log(process.env.mongoURI);
  await createConnection({
    type: "mongodb",
    url: process.env.mongoURI,
    useNewUrlParser: true,
    useUnifiedTopology: true,
    synchronize: true,
    logging: false,
    entities: [
       __dirname+"/entity/**/*.js"
    ],
    migrations: [
      __dirname+"/migration/**/*.js"
    ],
    subscribers: [
      __dirname+"/subscriber/**/*.js"
    ],
    cli: {
       entitiesDir: __dirname+"/entity",
       migrationsDir: __dirname+"/migration",
       subscribersDir: __dirname+"/subscriber"
    }
  });
  try {
    await app.prepare();
    
    const server: express.Application = express();
    // server.use(bodyParser.urlencoded({ extended: true }))
    // server.use(bodyParser.json())
    // const server = express();
    // server.use(cors());

    const apolloServer = new ApolloServer({
      introspection: true,
      playground: true,
      schema: await buildSchema({
        resolvers: [PostResolver],
        validate: false,
      })
    });
  
    apolloServer.applyMiddleware({
      app: server,
      // cors: false,
    });

    server.all("*", (req: Request, res: Response) => {
      return handle(req, res);
    });
    server.listen(port, (err?: any) => {
      if (err) throw err;
      console.log(`> Ready on localhost:${port} - env ${process.env.NODE_ENV}`);
    });
  } catch (e) {
    console.error(e);
    process.exit(1);
  }
})();