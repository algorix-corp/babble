export { default } from "next-auth/middleware";

export const config = { matcher: ["/api/auth/me", "/u",] };