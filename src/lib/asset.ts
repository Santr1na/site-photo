export function assetSrc(path: string) {
  const base = (process.env.NEXT_PUBLIC_BASE_PATH ?? "").replace(/\/$/, "");
  if (!base) return path;
  return `${base}${path.startsWith("/") ? path : `/${path}`}`;
}
