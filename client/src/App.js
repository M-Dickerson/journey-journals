import React from "react";
import Header from "./components/Header";
import Footer from "./components/Footer";
import { ApolloClient, ApolloProvider, InMemoryCache, createHttpLink } from '@apollo/client';
import { setContext } from '@apollo/client/link/context';

const httpLink = createHttpLink({
    uri: '/graphql',
});

const authLink = setContext((_, { headers }) => {
    // Get the authentication token from local storage if it exists
    const token = localStorage.getItem('id_token');
    // Return the headers to the context so httpLink can read them
    return {
        headers: {
            ...headers,
            authorization: token ? `Bearer ${token}` : '',
        },
    };
});

const client = new ApolloClient({
    link: authLink.concat(httpLink),
    cache: new InMemoryCache(),
});

function App() {
    return (
        <ApolloProvider client={client}>
            <div>
                <Header />
                <Footer />
            </div>
        </ApolloProvider>
    );
}

export default App;