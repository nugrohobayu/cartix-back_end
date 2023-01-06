import * as crypto from "crypto";

export function hashPassword(password: string, hash: string): Promise<string> {
    return new Promise((resolve, reject) => {
        crypto.pbkdf2(password, hash, 50, 100, 'sha512', (err, values) => {
            if (err) {
                return reject(err);
            }

            resolve(values.toString('hex'));
        })
    });
}