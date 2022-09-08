import * as jose from 'jose'
/*
openssl ecparam -name prime256v1 -genkey -noout -out private.ec.key  //generate private key
openssl pkcs8 -topk8 -in private.ec.key -out private.pem
openssl ec -in private.pem -pubout -out public.pem //generate public key from private.pem

openssl pkcs8 -topk8 -inform PEM -outform PEM -nocrypt -in private.ec.key -out privatejose.key   //change to jose format
*/

export async function joseKey() {
    const algorithm = 'ES256'
const pkcs8 = `-----BEGIN PRIVATE KEY-----
MIGHAgEAMBMGByqGSM49AgEGCCqGSM49AwEHBG0wawIBAQQgCavM8LM9WBsM4O9R
2289WjliITt2VEY3wKdtsJvuiFmhRANCAARVOAeCubNPbD2LdndZOBPoVIxy1gzd
TRXhv/jaE+Mp9s3LeWFXN+D0IsrUz/5SdBC57mCSpa/6g6JBVjpzharp
-----END PRIVATE KEY-----`
 return await jose.importPKCS8(pkcs8, algorithm)
}

export async function josePublicKey() {
    const algorithm = 'ES256'
const spki = `-----BEGIN PUBLIC KEY-----
MFkwEwYHKoZIzj0CAQYIKoZIzj0DAQcDQgAEVTgHgrmzT2w9i3Z3WTgT6FSMctYM
3U0V4b/42hPjKfbNy3lhVzfg9CLK1M/+UnQQue5gkqWv+oOiQVY6c4Wq6Q==
-----END PUBLIC KEY-----`
 return await jose.importSPKI(spki, algorithm)
}

