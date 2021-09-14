import AWS from 'aws-sdk';
import { generateRandomId } from '../utils/generateRandomId.js';

export async function createPlant(input) {
  const docClient = new AWS.DynamoDB.DocumentClient();
  const id = generateRandomId();

  const newItem = { id, ...input };

  const params = {
    TableName: 'Users',
    Item: newItem,
  };

  return new Promise(
    (resolve, reject) => docClient.put(params, (err) => {
      if (err) {
        reject(err);
      } else {
        resolve(newItem);
      }
    }),
  );
}
