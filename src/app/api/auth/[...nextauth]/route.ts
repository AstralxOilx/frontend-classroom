import { Backend_URL } from "@/lib/constants";
import NextAuth, { NextAuthOptions } from "next-auth";
import { JWT } from "next-auth/jwt";
import CredentialsProvider from "next-auth/providers/credentials";


async function refreshToken(token: JWT): Promise<JWT> {

    console.log(token.backendToken)
    const res = await fetch(`${Backend_URL}/auth/refresh`, {
        method: "POST",
        headers: {
            authorization: `Refresh ${token.backendToken.refresh_token}`
        },
    });

    const response = await res.json();

    console.log('Refresh')
    console.log(response);

    return {
        ...token,
        backendToken: response,
    }
}

export const authOptions: NextAuthOptions = {
    providers: [
        CredentialsProvider({
            name: "Credentials",
            credentials: {
                email: { label: "Email", type: "email" },
                password: { label: "Password", type: "password" },
            },
            async authorize(credentials, req) {

                if (!credentials?.email || !credentials?.password) return null;

                const res = await fetch(`${Backend_URL}/auth/login`, {
                    method: "POST",
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify(credentials),
                    credentials: "include",
                });

                if (res.ok) {
                    const user = await res.json();
                    return user;
                }
                return null;  // กรณีข้อมูลไม่ถูกต้อง
            },
        }),
    ],
    callbacks: {
        async jwt({ token, user }) {

            if (user) return { ...token, ...user }
            // console.log("tokend")
            // console.log(token)
            // ตรวจสอบว่า token หมดอายุหรือยัง
            const isExpired = new Date().getTime() > token.backendToken.expiresIn;
            if (isExpired) {
                return await refreshToken(token); // รีเฟรช token
            }
            return token; 
        },

        async session({ token, session }) {
            session.backendToken = token.backendToken
            session.user = token.user
            return session

        },
    },

}

const handler = NextAuth(authOptions);
export { handler as GET, handler as POST };