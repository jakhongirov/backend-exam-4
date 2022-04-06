const { gql } = require('apollo-server-express')

module.exports = gql`
    type Buildngs {
        id: ID!
        name: String!
        square_money: Int!
        img: String!
    }

    type Building_room {
        id: ID!
        square: Int!
        building_id: Int!
    }
    
    type Building_adress {
        id: ID!
        adress: String!
        building_id: Int!
    }

    extend type Query {
        buildings(id: Int!): [Buildngs]
        building_room: [Building_room]
        building_adress: [Building_adress],
        getadress(buildingID: ID!):Building_adress
        getroom(rooms: Int! buildingID: ID!):Building_room
    }

    extend type Subscription {
        buildings: [Buildngs!]
    }

    extend type  Mutation {
        newbuilding(name: String! square: Int! img: String! ):Buildngs 
        newbranch(adress: String! buildingID: ID!):String
        squarerooms(rooms: Int! buildingID: ID! square: Int!):String!
    }
`