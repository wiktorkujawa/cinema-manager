import {
//   Link as ChakraLink,
  Text,
  Divider
//   Code,
//   List,
//   ListIcon,
//   ListItem,
} from '@chakra-ui/react'
// import { CheckCircleIcon, LinkIcon } from '@chakra-ui/icons'

// import { Hero } from '../components/Hero'
// import { Container } from '../components/Container'
import { Main } from '../components/Main'
// import { DarkModeSwitch } from '../components/DarkModeSwitch'
// import { CTA } from '../components/CTA'
// import { Footer } from '../components/Footer'
// import Navbar from '../components/Navbar'

const Index = () => { 
  
  return (
    
    
    <Main textAlign="center">
      <Text fontSize="5xl">  Cinema App manager </Text> 
<Divider/>
<Text> App for managing Cinema Halls, repertoir and schedules.
  <br/> App written with <b> Next.js(typescript boilerplate)</b> and <b> Typeorm</b> with <b>graphql-apollo</b> custom server(<b>express</b>) with <b>apollo-server-express</b> and <b>PostgresSQL database(Amazon RDS)</b>. <br/> Contains <b>passport</b> session authentication(local + google) with <b>express-session</b> to store session ID, <b>type-graphql</b> queries and mutations with connection to db migrations and entities created with <b>Typeorm</b>. <br/> Frontend created with <b>chakra-ui</b> components. Calendar component created with <b>@devexpress/dx-react-scheduler</b> and <b>material-ui</b>. It also uses <b>omdbApi</b> movie database to add movies from database to Cinema repertoire. Queries and mutations hooks are generated with <b>codegen-graphql</b> and state mangement is served with <b>Apollo Client</b>.</Text>
    </Main>

)}

export default Index
