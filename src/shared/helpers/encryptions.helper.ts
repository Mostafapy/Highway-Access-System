import { createCipheriv, randomBytes, createDecipheriv } from 'crypto';

const encryptionAlgorithm = 'aes-256-ctr';
const iv = randomBytes(16);

//Encrypting text
export const encrypt = async (text: string) => {
  const cipher = createCipheriv(
    encryptionAlgorithm,
    Buffer.concat([Buffer.from(process.env.ENCRYPTION_KEY), Buffer.alloc(32)], 32),
    iv,
  );

  let encrypted = cipher.update(text);
  encrypted = Buffer.concat([encrypted, cipher.final()]);
  return iv.toString('hex') + ':' + encrypted.toString('hex');
};

// Decrypting text
export const decrypt = async (text) => {
  const textParts = text.split(':');
  const iv = Buffer.from(textParts.shift(), 'hex');
  const encryptedText = Buffer.from(textParts.join(':'), 'hex');
  const decipher = createDecipheriv(
    encryptionAlgorithm,
    Buffer.concat([Buffer.from(process.env.ENCRYPTION_KEY), Buffer.alloc(32)], 32),
    iv,
  );
  let decrypted = decipher.update(encryptedText);
  decrypted = Buffer.concat([decrypted, decipher.final()]);
  return decrypted.toString();
};
