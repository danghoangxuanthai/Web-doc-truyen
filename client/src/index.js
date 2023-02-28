import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import DataProvider from './redux/store'
import {PostProvider} from './context'
import {
    ApolloClient,
    InMemoryCache,
    ApolloProvider
} from "@apollo/client";
const client = new ApolloClient({
    uri: 'https://graphql.anilist.co/',
    cache: new InMemoryCache()
});

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
    <ApolloProvider client={client}>
        <PostProvider>
            <DataProvider>
                    <App />
            </DataProvider>
        </PostProvider>
    </ApolloProvider>
);

