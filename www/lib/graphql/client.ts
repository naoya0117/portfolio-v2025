"use client"

import { ApolloClient, InMemoryCache, HttpLink } from '@apollo/client'

// GraphQL APIサーバーに接続
const httpLink = new HttpLink({
  uri: typeof window === 'undefined' 
    ? 'http://api:8080/query' // サーバーサイドはDockerネットワーク内のサービス名
    : 'http://localhost:8080/query', // クライアントサイドはlocalhostアクセス
})

const client = new ApolloClient({
  link: httpLink,
  cache: new InMemoryCache(),
  connectToDevTools: true,
})

export default client