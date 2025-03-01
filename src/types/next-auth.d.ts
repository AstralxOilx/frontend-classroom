import NextAuth from 'next-auth';
import { JWT } from 'next-auth/jwt';


declare module 'next-auth' {

  interface Session {
    user: {
      roleId: number;
      roleName: string;
      fname: string;
      lname: string;
    };

    backendToken: {
      access_token: string,
      refresh_token: string,
      expiresIn:number,
    };
  }


}

declare module 'next-auth/jwt' {
  interface JWT {
    user: {
      roleId: number;
      roleName: string;
      fname: string;
      lname: string;
    };

    backendToken: {
      access_token: string,
      refresh_token: string,
      expiresIn:number,
    };
  }
}