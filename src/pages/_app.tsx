import { ChakraProvider } from "@chakra-ui/react";

import theme from "../theme";
import { AppProps } from "next/app";
import { ApolloProvider } from "@apollo/client";
import { client } from "../apollo-client";
import Navbar from "../components/Navbar";
import { Footer } from '../components/Footer'
import { Container } from "../components/Container";
// import '../assets/styles.module.scss'

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <ApolloProvider client={client}>
      <ChakraProvider resetCSS theme={theme}>
        <div style={{ height: "100vh" }}>
          <Navbar></Navbar>
          <Container>
            <Component {...pageProps} />
            <Footer />
          </Container>
        </div>
      </ChakraProvider>
    </ApolloProvider>
  );
}

export default MyApp;
