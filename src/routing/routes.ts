export const APP_ROUTES = {
  landing: "/",
  explorer: "/styles",
} as const;

export type AppRoutePath = (typeof APP_ROUTES)[keyof typeof APP_ROUTES];

const appRoutePaths = Object.values(APP_ROUTES) as AppRoutePath[];

export function isAppRoutePath(pathname: string): pathname is AppRoutePath {
  return appRoutePaths.includes(pathname as AppRoutePath);
}
