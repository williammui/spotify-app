const crypto = require('crypto');

const { ENCRYPTION_KEY, ENCRYPTION_ALGORITHM, ENCRYPTION_ENCODING } = require('../config/index');

const algorithm = ENCRYPTION_ALGORITHM;
const encoding = ENCRYPTION_ENCODING;
let key = Buffer.alloc(32);
key = Buffer.concat([Buffer.from(ENCRYPTION_KEY)], key.length);

module.exports = {
    encrypt: function (text) {
        const iv = crypto.randomBytes(16);
        let cipher = crypto.createCipheriv(algorithm, Buffer.from(key), iv);
        let encrypted = cipher.update(text);
        encrypted = Buffer.concat([encrypted, cipher.final()]);
        return { iv: iv.toString(encoding), encryptedData: encrypted.toString(encoding) };
    },
    decrypt: function (text) {
        let iv = Buffer.from(text.iv, encoding);
        let encryptedText = Buffer.from(text.encryptedData, encoding);
        let decipher = crypto.createDecipheriv(algorithm, Buffer.from(key), iv);
        let decrypted = decipher.update(encryptedText);
        decrypted = Buffer.concat([decrypted, decipher.final()]);
        return decrypted.toString();
    }
}
