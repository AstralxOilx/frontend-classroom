import { Backend_URL } from "@/lib/constants";
import NextAuth, { NextAuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";


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
                    return {
                        ...user,
                        access_token: user.accessToken,
                    };
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

            return token;
        },

        async session({ token, session }) {
            session.accessToken = token.accessToken
            session.roleName = token.roleName
            session.fname =token.fname
            session.lname = token.lname
            return session

        },
    }, 

}

const handler = NextAuth(authOptions);
export { handler as GET, handler as POST };