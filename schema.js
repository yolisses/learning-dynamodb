export const schema = `
input UserInput {
    name: String
    email: String
}

type User {
    id: ID! 
    name: String
    email: String
}

type Query {
    users: [User!]!
    getUser(id: ID!): User
}

type Mutation {
    createUser(input: UserInput): User
    updateUser(id: ID!, input: UserInput): User
}`;
