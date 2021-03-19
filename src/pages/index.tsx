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
<Text> App for managing cinema Halls and schedules.
  App written with Next.js and express server and MongoDB database contains passport session authentication, graphql. <br/> Frontend created with chakra-ui components, especially Home component with calendar(angular-calendar). </Text>
  <p style={{textDecoration: 'line-through'}}> It also uses rapidApi movie database to add movies from database to Cinema repertoire </p>

    </Main>

)}

export default Index
