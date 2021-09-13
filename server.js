import express from 'express';
import { graphqlHTTP } from 'express-graphql';
import { buildSchema } from 'graphql';
import { randomBytes } from 'crypto';

// Construct a schema, using GraphQL schema language
const schema = buildSchema(`
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
  }
`);

// If User had any complex fields, we'd put them on this object.
class User {
  constructor(id, { name, email }) {
    this.id = id;
    this.name = name;
    this.email = email;
  }
}

const fakeDatabase = {
};

const root = {
  users: () => Object.values(fakeDatabase),
  getUser: ({ id }) => {
    if (!fakeDatabase[id]) {
      throw new Error(`no user exists with id ${id}`);
    }
    return new User(id, fakeDatabase[id]);
  },
  createUser: ({ input }) => {
    // Create a random id for our "database".
    const id = randomBytes(10).toString('hex');

    const user = new User(id, input);
    fakeDatabase[id] = user;
    return user;
  },
  updateUser: ({ id, input }) => {
    if (!fakeDatabase[id]) {
      throw new Error(`no user exists with id ${id}`);
    }
    // This replaces all old data, but some apps might want partial update.
    fakeDatabase[id] = input;
    return new User(id, input);
  },
};

const app = express();

app.use('/graphql', graphqlHTTP({
  schema,
  rootValue: root,
  graphiql: true,
}));

app.listen(4000, () => {
  console.log('Running a GraphQL API server at http://localhost:4000/graphql');
});
