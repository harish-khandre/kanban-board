/*
 * Public Routes
 * @type {string[]}
 */

export const publicRoutes = ["/", "/auth/new-verification"];

/*
 * Routes used for authentication
 * @type {string[]}
 */

export const authRoutes = [
  "/auth/login",
  "/auth/register",
  "/auth/error",
  "/auth/reset",
  "/auth/new-password",
];

/*
 * API Prefix for authentication routes
 * @type {string}
 */

export const apiAuthPrefix = "/api/auth";

/*
 * default redirect after login
 * @type {string}
 */

export const DEFAULT_LOGIN_REDIRECT = "/board";
