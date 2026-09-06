/**
 * Site configuration and canonical URL helpers.
 * Ensures consistent domain references across metadata, OpenGraph, schemas, and sitemaps.
 */

export const SITE_URL = (
  process.env.NEXT_PUBLIC_SITE_URL ||
  (process.env.VERCEL_URL ? `https://${process.env.VERCEL_URL}` : 'https://tradecalc-henna.vercel.app')
).replace(/\/+$/, '');

export function getCanonicalUrl(path: string = ''): string {
  const cleanPath = path.startsWith('/') ? path : `/${path}`;
  return `${SITE_URL}${cleanPath === '/' ? '' : cleanPath}`;
}
