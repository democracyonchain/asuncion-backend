import { Injectable } from '@nestjs/common';
import * as crypto from 'crypto';

/**
 * Clase con los servicios para encriptación de información usando la libreria crypto
 *
 * @export
 * @class EncryptionService
 * @typedef {EncryptionService}
 */
@Injectable()
export class EncryptionService {
  private readonly algorithm = 'aes-256-cbc'; // AES-256-CBC algorithm
  private readonly key: Buffer; // 32 bytes key for AES-256
  private readonly iv: Buffer; // 16 bytes initialization vector

  constructor() {
    this.key = Buffer.from(process.env.ENCRYPTION_KEY, 'utf-8');
    this.iv = Buffer.from(process.env.ENCRYPTION_IV, 'utf-8'); // 8 bytes IV
  }

  /**
   * Función para encriptar información
   *
   * @param {string} text
   * @returns {string}
   */
  encrypt(text: string): string {
    const cipher = crypto.createCipheriv(this.algorithm, this.key, this.iv);
    let encrypted = cipher.update(text, 'utf8', 'base64');
    encrypted += cipher.final('base64');
    return encrypted;
  }

  /**
   * Función para desencriptar información
   *
   * @param {string} encryptedText
   * @returns {string}
   */
  decrypt(encryptedText: string): string {
    const decipher = crypto.createDecipheriv(this.algorithm, this.key, this.iv);
    let decrypted = decipher.update(encryptedText, 'base64', 'utf8');
    decrypted += decipher.final('utf8');
    return decrypted;
  }
}
