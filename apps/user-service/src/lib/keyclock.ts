import { createRemoteJWKSet, jwtVerify } from "jose";

const KEYCLOAK_URL = process.env.KEYCLOAK_URL!;

const JWKS = createRemoteJWKSet(
  new URL(`${KEYCLOAK_URL}/protocol/openid-connect/certs`)
);

export async function verifyToken(token: string) {

  const { payload } = await jwtVerify(token, JWKS, {
    issuer: KEYCLOAK_URL,
  });
  console.log("this is payload ",payload)

  return payload;
} 