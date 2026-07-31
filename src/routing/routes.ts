export const APP_ROUTES = {
  landing: "/",
  explorer: "/styles",
  styleDetail: "/styles/:slug",
} as const;

export type StyleRoutePath = `/styles/${string}`;
export type AppRoutePath = (typeof APP_ROUTES)["landing"] | (typeof APP_ROUTES)["explorer"] | StyleRoutePath;

const appRoutePaths = [APP_ROUTES.landing, APP_ROUTES.explorer] as const;

export function getStyleRoute(slug: string): StyleRoutePath {
  return `${APP_ROUTES.explorer}/${encodeURIComponent(slug)}`;
}

export function getStyleSlug(pathname: string): string | null {
  const match = pathname.match(/^\/styles\/([^/]+)\/?$/);

  if (!match) {
    return null;
  }

  try {
    return decodeURIComponent(match[1]);
  } catch {
    return null;
  }
}

export function isAppRoutePath(pathname: string): pathname is AppRoutePath {
  return appRoutePaths.includes(pathname as (typeof appRoutePaths)[number]) || getStyleSlug(pathname) !== null;
}
