import { getTokens } from "next-firebase-auth-edge";
import { cookies } from "next/headers";
import { notFound, redirect } from "next/navigation";
import { clientConfig, serverConfig } from "../../config";

export default async function Home() {
  const tokens = await getTokens(cookies(), {
    apiKey: clientConfig.apiKey,
    cookieName: serverConfig.cookieName,
    cookieSignatureKeys: serverConfig.cookieSignatureKeys,
    serviceAccount: serverConfig.serviceAccount,
  });

  if (!tokens) {
    redirect("/login");
  } else {
    redirect("/calendar");
  }
}