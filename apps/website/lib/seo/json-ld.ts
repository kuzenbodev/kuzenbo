import type {
  Article,
  BreadcrumbList,
  FAQPage,
  HowTo,
  Organization,
  WebSite,
  WithContext,
} from "schema-dts";

const LEFT_ANGLE_BRACKET_PATTERN = /</g;
const SCHEMA_CONTEXT = "https://schema.org" as const;

export type OrganizationJsonLd = WithContext<Organization>;
export type WebSiteJsonLd = WithContext<WebSite>;
export type BreadcrumbListJsonLd = WithContext<BreadcrumbList>;
export type ArticleJsonLd = WithContext<Article>;
export type FAQPageJsonLd = WithContext<FAQPage>;
export type HowToJsonLd = WithContext<HowTo>;

export type SupportedJsonLd =
  | OrganizationJsonLd
  | WebSiteJsonLd
  | BreadcrumbListJsonLd
  | ArticleJsonLd
  | FAQPageJsonLd
  | HowToJsonLd;

export type JsonLdInput<TSchema extends SupportedJsonLd> = Omit<
  TSchema,
  "@context"
>;

export type JsonLdPayload = SupportedJsonLd | ReadonlyArray<SupportedJsonLd>;

const withSchemaContext = <TSchema extends SupportedJsonLd>(
  payload: JsonLdInput<TSchema>
): TSchema =>
  ({
    "@context": SCHEMA_CONTEXT,
    ...payload,
  }) as TSchema;

export const createOrganizationJsonLd = (
  payload: JsonLdInput<OrganizationJsonLd>
): OrganizationJsonLd => withSchemaContext(payload);

export const createWebSiteJsonLd = (
  payload: JsonLdInput<WebSiteJsonLd>
): WebSiteJsonLd => withSchemaContext(payload);

export const createBreadcrumbListJsonLd = (
  payload: JsonLdInput<BreadcrumbListJsonLd>
): BreadcrumbListJsonLd => withSchemaContext(payload);

export const createArticleJsonLd = (
  payload: JsonLdInput<ArticleJsonLd>
): ArticleJsonLd => withSchemaContext(payload);

export const createFAQPageJsonLd = (
  payload: JsonLdInput<FAQPageJsonLd>
): FAQPageJsonLd => withSchemaContext(payload);

export const createHowToJsonLd = (
  payload: JsonLdInput<HowToJsonLd>
): HowToJsonLd => withSchemaContext(payload);

export const serializeJsonLd = (payload: JsonLdPayload): string =>
  JSON.stringify(payload).replace(LEFT_ANGLE_BRACKET_PATTERN, "\\u003c");
