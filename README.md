# CinemaManagerApp

MERN(next.js) stack App for managing Cinema Halls, repertoir and schedules.

## Description
App for managing Cinema Halls, repertoir and schedules.
  App written with Next.js(typescript boilerplate) and Typeorm withgraphql-apollo custom server(<b>express) with apollo-server-express andPostgresSQL database(Amazon RDS). Contains passport session authentication(local + google) with express-session to store session ID, nodemailer module to send activation email, type-graphql queries and mutations with connection to db migrations and entities created with Typeorm. Frontend created withchakra-ui components. Calendar component created with@devexpress/dx-react-scheduler andmaterial-ui. It also usesomdbApi movie database to add movies from database to Cinema repertoire. Queries and mutations hooks are generated withcodegen-graphql and state mangement is served withApollo Client.
### Usage
To run create .env file with following variables:
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
