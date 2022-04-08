import { createCipheriv, randomBytes, scrypt, createDecipheriv } from 'crypto';
import { promisify } from 'util';

const iv = randomBytes(16);
const keyPassword = randomBytes(16);

//Encrypting text
export const encrypt = async (text: string) => {
  const key = (await promisify(scrypt)(keyPassword, 'salt', 32)) as Buffer;
  const cipher = createCipheriv('aes-256-ctr', key, iv);

  const encryptedText = Buffer.concat([cipher.update(text), cipher.final()]);

  return encryptedText.toString('hex');
};

// Decrypting text
export const decrypt = async (text) => {
  const key = (await promisify(scrypt)(keyPassword, 'salt', 32)) as Buffer;
  const decipher = createDecipheriv('aes-256-ctr', key, iv);
  const decryptedText = Buffer.concat([decipher.update(text), decipher.final()]);
  return decryptedText.toString();
};
