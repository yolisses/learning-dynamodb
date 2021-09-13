import express from 'express';
import { graphqlHTTP } from 'express-graphql';
import { buildSchema } from 'graphql';

import { User } from './User.js';
import { schema } from './schema.js';
import { getUser } from './getUser.js';
import { createUser } from './createUser.js';
import { configureAWS } from './configureAWS.js';

configureAWS();

const fakeDatabase = {
};

const root = {
  users: () => Object.values(fakeDatabase),
  getUser: ({ id }) => getUser(id),
  createUser: ({ input }) => createUser(input),
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
  schema: buildSchema(schema),
  rootValue: root,
  graphiql: true,
}));

app.listen(4000, () => {
  console.log('Running a GraphQL API server at http://localhost:4000/graphql');
});
