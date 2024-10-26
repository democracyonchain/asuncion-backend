import * as crypto from 'crypto';

export function generateSHA256Hash(text: string) {
  const hash = crypto.createHash('sha256');
  hash.update(text);
  return hash.digest('hex');
}
