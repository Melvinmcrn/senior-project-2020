import {Storage} from '@google-cloud/storage';
import {ApiError} from './ApiError';

const storage = new Storage({
  keyFilename: 'serviceAccountKey.json',
  projectId: 'poc-innovation-iot',
});
const bucketName = process.env.BUCKET_NAME || '';

const uploadImageToStorage = async (
  fileName: string,
  image: Buffer
): Promise<string> => {
  try {
    const file = storage.bucket(bucketName).file(`product_image/${fileName}`);
    await file.save(image);
    return file.publicUrl();
  } catch (error) {
    console.error(error);
    throw new ApiError(500, 'cannot save image');
  }
};

export {uploadImageToStorage};