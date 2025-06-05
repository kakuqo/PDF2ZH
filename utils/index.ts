import * as crypto from 'crypto';
import fs from "node:fs";

export function calculateFileHash(filePath: string) {
    return new Promise((resolve, reject) => {
        const hash = crypto.createHash('sha256');
        const input = fs.createReadStream(filePath);

        input.on('error', reject);
        hash.on('readable', () => {
            const data = hash.read();
            if (data) {
                resolve(data.toString('hex'));
            }
        });

        input.pipe(hash);
    });
}