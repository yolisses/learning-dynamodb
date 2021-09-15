import AWS from 'aws-sdk';
import { setEmailUser } from './setEmailUser.js';
import { generateRandomId } from '../utils/generateRandomId.js';

export async function createUser({ name, email }) {
  const docClient = new AWS.DynamoDB.DocumentClient();
  const id = generateRandomId();

  const params = {
    TableName: 'Users',
    Item: { id, name, email },
  };

  return new Promise(
    (resolve, reject) => docClient.put(params, async (err) => {
      if (err) {
        reject(err);
      } else {
        await setEmailUser({ email, id });
        resolve(params.Item);
      }
    }),
  );
}
