"server-only";
import { google } from "googleapis";
import { envConfig } from ".";

export const oauthClient = new google.auth.OAuth2(
  envConfig.googleClientId,
  envConfig.googleClientSecret
);

oauthClient.setCredentials({ refresh_token: envConfig.googleRefreshToken });
