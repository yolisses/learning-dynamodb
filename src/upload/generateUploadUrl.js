import { s3 } from './s3.js';
import { generateRandomId } from '../utils/generateRandomId.js';

const bucketName = process.env.AWS_BUCKET_NAME;

export async function generateUploadUrl() {
  const imageName = generateRandomId(16);

  const params = ({
    Expires: 60,
    Key: imageName,
    Bucket: bucketName,
  });

  try {
    const uploadUrl = await s3.getSignedUrlPromise('putObject', params);
    console.log('uploadUrl');
    return uploadUrl;
  } catch (err) {
    console.error(err);
  }
}
