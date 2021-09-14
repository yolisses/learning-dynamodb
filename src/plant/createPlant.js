import AWS from 'aws-sdk';
import { generateRandomId } from '../utils/generateRandomId.js';

export async function createPlant({ input }, req) {
  if (!req.user) throw new Error('Not authenticated');

  const docClient = new AWS.DynamoDB.DocumentClient();
  const id = generateRandomId();

  const newItem = {
    id, ...input, userId: req.user.id, card: 'https://plantei.s3.sa-east-1.amazonaws.com/items/card/0.webp',
  };

  const params = {
    TableName: 'Plants',
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
