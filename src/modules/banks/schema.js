const { gql } = require('apollo-server-express')

module.exports = gql`
    type Banks {
        id: ID!
        name: String!
        percent: Int!
        money: Int!
        img: String!
        service: Int!
        years: Int!
    }

    extend type Query {
        banks(sum: Int! years: Int!): Banks!
    }

    extend type Subscription {
        banks: [Banks!]
    }

    extend type  Mutation {
        newbank(name: String! percent: Int! money: Int! img: String! service: Int! years: Int!):Banks
        getbank(sum: Int!):Banks
    }
`