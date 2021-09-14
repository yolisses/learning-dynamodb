import AWS from 'aws-sdk';
import { generateRandomId } from '../utils/generateRandomId.js';

export async function createUser({ name, email }) {
  const docClient = new AWS.DynamoDB.DocumentClient();
  const id = generateRandomId();

  const params = {
    TableName: 'Users',
    Item: { id, name, email },
  };

  return new Promise(
    (resolve, reject) => docClient.put(params, (err, data) => {
      if (err) {
        reject(err);
      } else {
        resolve({ id, name, email });
      }
    }),
  );
}
