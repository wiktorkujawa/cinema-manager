# CinemaManagerApp

MERN(next.js) stack App for managing Cinema Halls, repertoire, and schedules.

## Description
App for managing Cinema Halls, repertoire, and schedules.
  An app is written with Next.js(typescript boilerplate) and Typeorm with graphql-apollo custom server(<b>express) with apollo-server-express and PostgresSQL database(Amazon RDS). Contains passport session authentication(local + google) with express-session to store session ID, nodemailer module to send activation email, type-graphql queries, and mutations with connection to db migrations and entities created with Typeorm. Frontend created with chakra-UI components. Calendar component created with@devexpress/dx-react-scheduler and material-ui. It also usesomdbApi movie database to add movies from the database to the Cinema repertoire. Queries and mutations hooks are generated with codegen-graphql and state management is served with Apollo Client.
### Usage
To run create .env file with the following variables:
- postgresHost
- postgresUsername
- postgresPort
- postgresPassword
- postgresDatabase
- sessionSecret (express-session)
- GOOGLE_CLIENT_ID
- GOOGLE_CLIENT_SECRET
- APP_EMAIL (to configure nodemailer with google mail)
- APP_PASSWORD
- SUPPORT_EMAIL
- PAGE_NAME
- OMDB_API_KEY
```bash
# Build the project
yarn build
# Run the app in dev mode
yarn dev
# Watch live the server changes(typeorm+backend)
yarn watch


# App runs on http://localhost:3000
# On http://localhost:3000/graphql you can check graphql queries
```
