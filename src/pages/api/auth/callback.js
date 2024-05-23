import dotenv from "dotenv";
dotenv.config();

const { YNAB_CLIENT_ID: clientID, YNAB_CLIENT_SECRET: clientSecret} = process.env;

export const prerender = false;

export const GET = async ({request, site, redirect, url}) => {
    const code = url.searchParams.get("code");

    if (!code) return new Response("No code provided", {status: 400});

    
    const params = new URLSearchParams({
        client_id: clientID,
        client_secret: clientSecret,
        redirect_uri: `${site.href}api/auth/callback`,
        grant_type: "authorization_code",
        code
    });

    const response = await fetch(`https://app.ynab.com/oauth/token?${params.toString()}`, {
        method: "POST",
    });

    const data = await response.json();

    console.log(data);

    // return redirect(`https://app.ynab.com/oauth/authorize?${params.toString()}`);

    return new Response("Hello, world!");
}