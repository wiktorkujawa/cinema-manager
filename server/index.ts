import "reflect-metadata";
import { ApolloServer } from "apollo-server-express";
import express, { Request, Response } from "express";
import next from "next";
import { buildSchema } from "type-graphql";
import { createConnection } from "typeorm";
import { PostResolver } from "./resolvers/post";
import { UserResolver } from "./resolvers/user";
import passport from "passport";
import session from "express-session";
require("./modules/passport/google")(passport);
require("./modules/passport/local")(passport);
import { buildContext } from 'graphql-passport';
import { User } from './entity/User'; 
import { activateAccount } from "./modules/activateAccount";

const dev = process.env.NODE_ENV !== "production";
const app = next({ dev });
const handle = app.getRequestHandler();
const port = process.env.PORT || 3000;

(async () => {
  await createConnection({
    type: "mongodb",
    url: process.env.mongoURI,
    useNewUrlParser: true,
    useUnifiedTopology: true,
    synchronize: true,
    logging: false,
    entities: [__dirname + "/entity/**/*.js"],
    migrations: [__dirname + "/migration/**/*.js"],
    subscribers: [__dirname + "/subscriber/**/*.js"],
    cli: {
      entitiesDir: __dirname + "/entity",
      migrationsDir: __dirname + "/migration",
      subscribersDir: __dirname + "/subscriber",
    },
  });
  try {
    await app.prepare();

    const server: express.Application = express();

    // Express session
    server.use(
      session({
        secret: process.env.sessionSecret as string,
        resave: true,
        saveUninitialized: true,
      })
    );

    server.use(passport.initialize());
    server.use(passport.session());

    server.get(
      "/auth/google",
      passport.authenticate("google", { scope: ["profile", "email"] })
    );
    server.get(
      "/auth/google/callback",
      passport.authenticate("google", {
        successRedirect: "/",
        failureRedirect: "/auth/google",
      })
    );

    server.get("/account/active/:activeToken", activateAccount);

    const apolloServer = new ApolloServer({
      introspection: true,
      playground: true,
      schema: await buildSchema({
        resolvers: [PostResolver, UserResolver],
        validate: false,
      }),
      context: ({ req, res }) => 
        buildContext({ req, res, User })
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
