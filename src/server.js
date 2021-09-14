import express from 'express';
import { graphqlHTTP } from 'express-graphql';
import { buildSchema } from 'graphql';

import { schema } from './schema.js';
import { getUser } from './user/getUser.js';
import { createUser } from './user/createUser.js';
import { createPlant } from './plant/createPlant.js';
import { configureAWS } from './aws/configureAWS.js';
import { authMiddleware } from './user/authMiddleware.js';
import { getPlant } from './plant/getPlant.js';

configureAWS();

const root = {
  getUser: ({ id }) => getUser(id),
  createUser: ({ input }) => createUser(input),
  getPlant: ({ id }) => getPlant(id),
  createPlant: ({ input }) => createPlant(input),
};

const app = express();

app.use(authMiddleware);

app.use('/graphql', graphqlHTTP({
  schema: buildSchema(schema),
  rootValue: root,
  graphiql: true,
}));

app.listen(4000, () => {
  console.log('Running a GraphQL API server at http://localhost:4000/graphql');
});
