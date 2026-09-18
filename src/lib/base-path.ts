export const basePath = "/SaimBlog";

const EXTERNAL = /^(?:[a-z][a-z0-9+.-]*:|\/\/|#|data:|blob:)/i;

export function withBasePath(path: string): string {
  if (!path || EXTERNAL.test(path)) return path;
  return `${basePath}${path.startsWith("/") ? path : `/${path}`}`;
}