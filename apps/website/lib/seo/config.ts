const CANONICAL_HOST = "kuzenbo.com";
const WWW_HOST = `www.${CANONICAL_HOST}`;
const CANONICAL_SITE_URL = new URL(`https://${CANONICAL_HOST}`);

type EnvLike = Record<string, string | undefined>;

const trimTrailingSlash = (value: string): string =>
  value.endsWith("/") ? value.slice(0, -1) : value;

const normalizeCandidateUrl = (candidate: string): URL => {
  if (candidate.startsWith("http://") || candidate.startsWith("https://")) {
    return new URL(candidate);
  }

  const usesHttp =
    candidate.startsWith("localhost") || candidate.startsWith("127.0.0.1");
  return new URL(`${usesHttp ? "http" : "https"}://${candidate}`);
};

const resolveConfiguredSiteUrl = (env: EnvLike): URL => {
  const candidate =
    env.NEXT_PUBLIC_SITE_URL ??
    env.SITE_URL ??
    (env.VERCEL_URL ? `https://${env.VERCEL_URL}` : undefined) ??
    CANONICAL_SITE_URL.toString();

  return normalizeCandidateUrl(candidate);
};

const isProductionDeployment = (env: EnvLike): boolean => {
  const vercelEnvironment = env.VERCEL_ENV;
  if (vercelEnvironment) {
    return vercelEnvironment === "production";
  }

  return env.NODE_ENV === "production";
};

const normalizeHost = (url: URL): URL => {
  const normalized = new URL(url.toString());

  if (normalized.hostname === WWW_HOST) {
    normalized.hostname = CANONICAL_HOST;
    normalized.port = "";
    normalized.protocol = "https:";
  }

  return normalized;
};

export interface SeoConfig {
  canonicalHost: string;
  canonicalSiteUrl: URL;
  canonicalSiteUrlString: string;
  isProduction: boolean;
  metadataBase: URL;
  siteUrl: URL;
  siteUrlString: string;
}

export const resolveSeoConfig = (env: EnvLike = process.env): SeoConfig => {
  const resolvedSiteUrl = normalizeHost(resolveConfiguredSiteUrl(env));
  const production = isProductionDeployment(env);

  return {
    canonicalHost: CANONICAL_HOST,
    canonicalSiteUrl: CANONICAL_SITE_URL,
    canonicalSiteUrlString: trimTrailingSlash(CANONICAL_SITE_URL.toString()),
    isProduction: production,
    metadataBase: CANONICAL_SITE_URL,
    siteUrl: resolvedSiteUrl,
    siteUrlString: trimTrailingSlash(resolvedSiteUrl.toString()),
  };
};

export const normalizePathname = (pathname: string): string => {
  if (!pathname || pathname === "/") {
    return "/";
  }

  const prefixed = pathname.startsWith("/") ? pathname : `/${pathname}`;
  return prefixed.endsWith("/") ? prefixed.slice(0, -1) : prefixed;
};

export const toCanonicalUrl = (
  pathname: string,
  config: SeoConfig = resolveSeoConfig()
): string => {
  const normalizedPath = normalizePathname(pathname);
  return new URL(normalizedPath, config.canonicalSiteUrl).toString();
};

export const toSiteUrl = (
  pathname: string,
  config: SeoConfig = resolveSeoConfig()
): string => {
  const normalizedPath = normalizePathname(pathname);
  return new URL(normalizedPath, config.siteUrl).toString();
};
