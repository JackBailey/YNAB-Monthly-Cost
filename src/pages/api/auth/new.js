import dotenv from "dotenv";
dotenv.config();

const { YNAB_CLIENT_ID: clientID, YNAB_CLIENT_SECRET: clientSecret} = process.env;

export const prerender = false;

export const GET = ({site, redirect}) => {
    const params = new URLSearchParams({
        client_id: clientID,
        redirect_uri: `${site.href}api/auth/callback`,
        response_type: "code",
        scope: "read-only"
    });

    return redirect(`https://app.ynab.com/oauth/authorize?${params.toString()}`);
}