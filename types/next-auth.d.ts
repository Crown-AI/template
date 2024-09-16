// eslint-disable-next-line @typescript-eslint/no-unused-vars
import NextAuth from "next-auth/next";

declare module "next-auth" {
    interface Session {
        user: {
            email?: string;
            name?: string;
            image?: string;
            /**A means of differentiating the users from each other */
            id: string
            /**The number of courses the user plans to achieve during the week */
            goals?: number;
            /**This checks if the user has added a goal or not */
            goalSet: boolean;
        }
    }
}