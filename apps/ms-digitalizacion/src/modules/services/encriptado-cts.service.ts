import { Injectable } from "@nestjs/common";
import * as CryptoTS from 'crypto-ts'; 

@Injectable()
export class EncryptionCtsService {

    private readonly algorithm = 'aes-256-cbc'; // AES-256-CBC algorithm
    private readonly key:any; // 32 bytes key for AES-256
    private readonly iv:any; // 16 bytes initialization vector

    constructor() {
        this.key = process.env.ENCRYPTION_KEY;
        this.iv = CryptoTS.enc.Utf8.parse(process.env.ENCRYPTION_IV);
    }

    encrypt(data:any): any {
        const cipher = CryptoTS.AES.encrypt(JSON.stringify(data),  this.key,{
            mode: CryptoTS.mode.CBC,
            iv: this.iv,  
        });
        return cipher;
      }
    
    decrypt(encryptedText: string): string {
    const decrypted  = CryptoTS.AES.decrypt(encryptedText.toString(), this.key,{
        iv: this.iv,
        mode: CryptoTS.mode.CBC,       
    });
    const decryptedData = decrypted.toString(CryptoTS.enc.Utf8);
    return decryptedData
    }
}
