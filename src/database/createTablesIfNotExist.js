import AWS from 'aws-sdk';
import { configureAWS } from '../aws/configureAWS.js';

import { tables } from './tables.js';

configureAWS();

const dynamodb = new AWS.DynamoDB();

function createTableIfNotExists(params) {
  dynamodb.createTable(params, (err, data) => {
    if (err && err.code !== 'ResourceInUseException') {
      throw new Error(
        `Unable to create table. Error JSON:${JSON.stringify(err, null, 2)}`,
      );
    }
  });
}

export function createTablesIfNotExist() {
  tables.forEach(createTableIfNotExists);
}
