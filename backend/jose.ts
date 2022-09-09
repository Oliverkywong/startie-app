import * as jose from "jose";
/*
openssl ecparam -name prime256v1 -genkey -noout -out private.ec.key  //generate private key
openssl pkcs8 -topk8 -in private.ec.key -out private.pem
openssl ec -in private.pem -pubout -out public.pem //generate public key from private.pem

openssl pkcs8 -topk8 -inform PEM -outform PEM -nocrypt -in private.ec.key -out privatejose.key   //change to jose format
*/

export async function joseKey() {
  const algorithm = "ES256";
  const pkcs8 = `-----BEGIN PRIVATE KEY-----
  MIGHAgEAMBMGByqGSM49AgEGCCqGSM49AwEHBG0wawIBAQQgna7zdC3j7B6Az6+L
  avf40UJbQKcMdJpGMcIHXkKmDfqhRANCAAScXmf5FVlWrzKAvdGUANTsUSC+3W81
  w2GMfB9G4YBSbEuxAfF+QMyCSUqZkZGb0+HgTBu8VAsIOdJuhUeoBgzF
  -----END PRIVATE KEY-----`;
  return await jose.importPKCS8(pkcs8, algorithm);
}

export async function josePublicKey() {
  const algorithm = "ES256";
  const spki = `-----BEGIN PUBLIC KEY-----
  MFkwEwYHKoZIzj0CAQYIKoZIzj0DAQcDQgAEnF5n+RVZVq8ygL3RlADU7FEgvt1v
  NcNhjHwfRuGAUmxLsQHxfkDMgklKmZGRm9Ph4EwbvFQLCDnSboVHqAYMxQ==
  -----END PUBLIC KEY-----`;
  return await jose.importSPKI(spki, algorithm);
}
