"use client"

import { ApolloProvider as Provider } from '@apollo/client'
import client from '@/lib/graphql/client'

interface ApolloProviderProps {
  children: React.ReactNode
}

export const ApolloProvider = ({ children }: ApolloProviderProps) => {
  return <Provider client={client}>{children}</Provider>
}