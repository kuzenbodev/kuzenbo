import type { Route } from "next";

export type DocsSectionId =
  | "overview"
  | "getting-started"
  | "foundations"
  | "patterns"
  | "components"
  | "hooks"
  | "reference";

export interface DocsRouteEntry {
  description: string;
  href: Route;
  order: number;
  section: DocsSectionId;
  title: string;
}

export interface DocsSectionEntry {
  description: string;
  href: Route;
  id: Exclude<DocsSectionId, "overview">;
  pages: DocsRouteEntry[];
  title: string;
}

const SECTION_TITLES: Record<Exclude<DocsSectionId, "overview">, string> = {
  components: "Components",
  foundations: "Foundations",
  "getting-started": "Getting Started",
  hooks: "Hooks",
  patterns: "Patterns",
  reference: "Reference",
};

const SECTION_DESCRIPTIONS: Record<
  Exclude<DocsSectionId, "overview">,
  string
> = {
  components: "Component APIs and behavior references.",
  foundations: "Theme, accessibility, architecture, and runtime fundamentals.",
  "getting-started":
    "Install and configure Kuzenbo packages in production apps.",
  hooks: "Standalone hooks for runtime behavior and composition.",
  patterns: "Reusable composition patterns and migration guidance.",
  reference: "Support, versioning, and operational docs reference.",
};

const SECTION_ORDER: readonly Exclude<DocsSectionId, "overview">[] = [
  "getting-started",
  "foundations",
  "patterns",
  "components",
  "hooks",
  "reference",
];

export const docsRouteEntries: DocsRouteEntry[] = [
  {
    description:
      "Package-aware component catalog for Kuzenbo publishable UI surfaces.",
    href: "/docs/components",
    order: 1,
    section: "components",
    title: "Components",
  },
  {
    description:
      "Build expandable sections with @kuzenbo/core Accordion, including variant contracts and composition patterns for dense settings UIs.",
    href: "/docs/components/accordion",
    order: 2,
    section: "components",
    title: "Accordion",
  },
  {
    description:
      "Pin UI to viewport edges with optional portal mounting and explicit position/z-index control.",
    href: "/docs/components/affix",
    order: 3,
    section: "components",
    title: "Affix",
  },
  {
    description:
      "Build lightweight assistant surfaces with @kuzenbo/ai AiWidget, including title handling, composition guidance, and runtime boundaries.",
    href: "/docs/components/ai-widget",
    order: 4,
    section: "components",
    title: "AI Widget",
  },
  {
    description:
      "Use Alert for inline status messaging and AlertDialog for irreversible confirmations in @kuzenbo/core.",
    href: "/docs/components/alert",
    order: 5,
    section: "components",
    title: "Alert",
  },
  {
    description:
      "Confirmation-focused modal dialogs in @kuzenbo/core for destructive or irreversible actions.",
    href: "/docs/components/alert-dialog",
    order: 6,
    section: "components",
    title: "Alert Dialog",
  },
  {
    description:
      "Inline announcement pill built on Badge with Tag/Title slots, themed mode, and production composition guidance.",
    href: "/docs/components/announcement",
    order: 7,
    section: "components",
    title: "Announcement",
  },
  {
    description:
      "Build multi-series area visualizations with legend highlighting, gradient fills, stacking modes, and dual-axis support.",
    href: "/docs/components/area-chart",
    order: 8,
    section: "components",
    title: "Area Chart",
  },
  {
    description:
      "Maintain stable media layouts with ratio-locked containers in @kuzenbo/core.",
    href: "/docs/components/aspect-ratio",
    order: 9,
    section: "components",
    title: "Aspect Ratio",
  },
  {
    description:
      "Build search-first suggestion UIs with @kuzenbo/core Autocomplete, including grouped options, async filtering, and status feedback.",
    href: "/docs/components/autocomplete",
    order: 10,
    section: "components",
    title: "Autocomplete",
  },
  {
    description:
      "Render user identity with image, fallback, badge, and grouped avatar stacks.",
    href: "/docs/components/avatar",
    order: 11,
    section: "components",
    title: "Avatar",
  },
  {
    description:
      "Use Badge in @kuzenbo/core for compact status, taxonomy, and inline metadata labels with semantic variant support.",
    href: "/docs/components/badge",
    order: 12,
    section: "components",
    title: "Badge",
  },
  {
    description:
      "Prebuilt Recharts bar visualizations in @kuzenbo/charts with legend, tooltip, stacking, and waterfall support.",
    href: "/docs/components/bar-chart",
    order: 13,
    section: "components",
    title: "Bar Chart",
  },
  {
    description:
      "Build semantic breadcrumb navigation in @kuzenbo/core with composable items, separators, and overflow affordances.",
    href: "/docs/components/breadcrumb",
    order: 14,
    section: "components",
    title: "Breadcrumb",
  },
  {
    description:
      "Prebuilt BubbleChart for multi-series x/y/z comparisons with legend highlighting, reference lines, and formatter controls.",
    href: "/docs/components/bubble-chart",
    order: 15,
    section: "components",
    title: "Bubble Chart",
  },
  {
    description:
      "Action buttons, loading states, and grouped controls with @kuzenbo/core.",
    href: "/docs/components/button",
    order: 16,
    section: "components",
    title: "Button",
  },
  {
    description:
      "Compose adjacent action controls with shared borders, orientation-aware layout, and helper subcomponents.",
    href: "/docs/components/button-group",
    order: 17,
    section: "components",
    title: "Button Group",
  },
  {
    description:
      "Use @kuzenbo/date Calendar for display-only and interactive date selection with provider-aware size precedence and week-number/locale modes.",
    href: "/docs/components/calendar",
    order: 18,
    section: "components",
    title: "Calendar",
  },
  {
    description:
      "Compose content blocks with header, action, body, and footer slots.",
    href: "/docs/components/card",
    order: 19,
    section: "components",
    title: "Card",
  },
  {
    description:
      "Build swipeable or keyboard-driven slide sequences with @kuzenbo/core Carousel and Embla-backed controls.",
    href: "/docs/components/carousel",
    order: 20,
    section: "components",
    title: "Carousel",
  },
  {
    description:
      "Low-level chart primitives in @kuzenbo/charts for composing Recharts with shared config, legend, tooltip, and style behavior.",
    href: "/docs/components/chart",
    order: 21,
    section: "components",
    title: "Chart",
  },
  {
    description:
      "Binary and indeterminate checkbox control with Base UI semantics, plus CheckboxGroup composition for preference sets.",
    href: "/docs/components/checkbox",
    order: 22,
    section: "components",
    title: "Checkbox",
  },
  {
    description:
      "Compose multiple checkbox choices with shared state and labeling using @kuzenbo/core CheckboxGroup.",
    href: "/docs/components/checkbox-group",
    order: 23,
    section: "components",
    title: "Checkbox Group",
  },
  {
    description:
      "Build code-focused docs and product surfaces with @kuzenbo/code blocks, tabs, diffs, terminals, and playground primitives.",
    href: "/docs/components/code",
    order: 24,
    section: "components",
    title: "Code Components",
  },
  {
    description:
      "Build controlled or uncontrolled disclosure panels with smooth height transitions and find-in-page support.",
    href: "/docs/components/collapsible",
    order: 24,
    section: "components",
    title: "Collapsible",
  },
  {
    description:
      "Searchable single and multi-select composition with the @kuzenbo/core Combobox API.",
    href: "/docs/components/combobox",
    order: 25,
    section: "components",
    title: "Combobox",
  },
  {
    description:
      "Create command palettes and searchable action lists with @kuzenbo/core Command and CommandDialog composition.",
    href: "/docs/components/command",
    order: 26,
    section: "components",
    title: "Command",
  },
  {
    description:
      "Combine line, bar, and area series in one chart surface with shared tooltip/legend runtime.",
    href: "/docs/components/composite-chart",
    order: 27,
    section: "components",
    title: "Composite Chart",
  },
  {
    description:
      "Use Container from @kuzenbo/core to apply consistent max-width and horizontal gutters across app sections.",
    href: "/docs/components/container",
    order: 28,
    section: "components",
    title: "Container",
  },
  {
    description:
      "Right-click and context-action menus in @kuzenbo/core with groups, check/radio items, and nested submenus.",
    href: "/docs/components/context-menu",
    order: 29,
    section: "components",
    title: "Context Menu",
  },
  {
    description:
      "Build modal interactions in @kuzenbo/core with composable Dialog slots and Base UI render-based triggers.",
    href: "/docs/components/dialog",
    order: 30,
    section: "components",
    title: "Dialog",
  },
  {
    description:
      "Prebuilt DonutChart with center labels, label modes, semicircle support, and legend/tooltip coordination.",
    href: "/docs/components/donut-chart",
    order: 31,
    section: "components",
    title: "Donut Chart",
  },
  {
    description:
      "Compose bottom sheets and side drawers with detachable triggers, provider indentation, and swipe-direction control.",
    href: "/docs/components/drawer",
    order: 32,
    section: "components",
    title: "Drawer",
  },
  {
    description:
      "Previous docs route kept for compatibility. Use the canonical Dropdown Menu page.",
    href: "/docs/components/dropdown-menu",
    order: 999,
    section: "components",
    title: "Dropdown Menu (Previous Route)",
  },
  {
    description:
      "Handle drag-and-drop file intake with @kuzenbo/core Dropzone, including accept/reject states, validation limits, and programmatic open control.",
    href: "/docs/components/dropzone",
    order: 34,
    section: "components",
    title: "Dropzone",
  },
  {
    description:
      "Compose searchable emoji selection UIs with list, search, empty/loading, and skin-tone controls.",
    href: "/docs/components/emoji-picker",
    order: 35,
    section: "components",
    title: "Emoji Picker",
  },
  {
    description:
      "Compose clear empty states with @kuzenbo/core Empty slots for media, title, description, and recovery actions.",
    href: "/docs/components/empty",
    order: 36,
    section: "components",
    title: "Empty",
  },
  {
    description:
      "Label-control-description-error composition primitives in @kuzenbo/core for accessible form rows and validation messaging.",
    href: "/docs/components/field",
    order: 40,
    section: "components",
    title: "Field",
  },
  {
    description:
      "Group related controls with Fieldset primitives in @kuzenbo/core for accessible legends and section-level structure.",
    href: "/docs/components/fieldset",
    order: 41,
    section: "components",
    title: "Fieldset",
  },
  {
    description:
      "Base form root primitives in @kuzenbo/core for validation state, submit flow control, and structured form composition.",
    href: "/docs/components/form",
    order: 42,
    section: "components",
    title: "Form",
  },
  {
    description:
      "Previous route for the former FormField API. Use Form, Field, and Fieldset as canonical primitives.",
    href: "/docs/components/form-field",
    order: 999,
    section: "components",
    title: "Form Field (Previous Alias)",
  },
  {
    description:
      "Render stage-dropoff funnels in @kuzenbo/charts with optional labels, legend highlighting, and tooltip strategies.",
    href: "/docs/components/funnel-chart",
    order: 38,
    section: "components",
    title: "Funnel Chart",
  },
  {
    description:
      "Calendar-style Heatmap for date/value datasets with month splitting, outside-date handling, and custom domain/color mapping.",
    href: "/docs/components/heatmap",
    order: 39,
    section: "components",
    title: "Heatmap",
  },
  {
    description:
      "Use Input, InputGroup, and InputOTP from @kuzenbo/core for standard fields, add-on compositions, and verification code entry.",
    href: "/docs/components/input",
    order: 41,
    section: "components",
    title: "Input",
  },
  {
    description:
      "Compose text fields, addons, buttons, and textarea controls with @kuzenbo/core Input Group for structured form input layouts.",
    href: "/docs/components/input-group",
    order: 42,
    section: "components",
    title: "Input Group",
  },
  {
    description:
      "Build one-time passcode inputs with slot-level control over groups, separators, and cells.",
    href: "/docs/components/input-otp",
    order: 43,
    section: "components",
    title: "Input OTP",
  },
  {
    description:
      "Structured list-row primitive in @kuzenbo/core for media, title, description, metadata, and row actions.",
    href: "/docs/components/item",
    order: 44,
    section: "components",
    title: "Item",
  },
  {
    description:
      "Document and present keyboard shortcuts with Kbd and KbdGroup from @kuzenbo/core.",
    href: "/docs/components/kbd",
    order: 45,
    section: "components",
    title: "Kbd",
  },
  {
    description:
      "Semantic form label primitive for associating text with controls via htmlFor/id and disabled-state-aware styling.",
    href: "/docs/components/label",
    order: 46,
    section: "components",
    title: "Label",
  },
  {
    description:
      "Render trend and time-series lines with gradient mode, dual axes, legend highlighting, and point-label controls.",
    href: "/docs/components/line-chart",
    order: 47,
    section: "components",
    title: "Line Chart",
  },
  {
    description:
      "Scrollable ticker-style content and fade edges with @kuzenbo/core Marquee.",
    href: "/docs/components/marquee",
    order: 48,
    section: "components",
    title: "Marquee",
  },
  {
    description:
      "Context action menus with checkbox, radio, link items, and submenu composition in @kuzenbo/core.",
    href: "/docs/components/menu",
    order: 33,
    section: "components",
    title: "Dropdown Menu",
  },
  {
    description:
      "Build application-style top menus with @kuzenbo/core Menubar, including groups, radio and checkbox items, and nested submenus.",
    href: "/docs/components/menubar",
    order: 49,
    section: "components",
    title: "Menubar",
  },
  {
    description:
      "Display bounded measurement values with semantic label, value text, and progress indicator slots.",
    href: "/docs/components/meter",
    order: 50,
    section: "components",
    title: "Meter",
  },
  {
    description:
      "Render typed demo tables quickly with @kuzenbo/datatable MockDataTable and TanStack column definitions.",
    href: "/docs/components/mock-data-table",
    order: 51,
    section: "components",
    title: "Mock Data Table",
  },
  {
    description:
      "Composable top-level navigation with trigger/content patterns and route-aware active semantics in @kuzenbo/core.",
    href: "/docs/components/navigation-menu",
    order: 52,
    section: "components",
    title: "Navigation Menu",
  },
  {
    description:
      "Aside navigation rows with active states, sections, and collapsible nesting in @kuzenbo/core.",
    href: "/docs/components/navigation-list",
    order: 53,
    section: "components",
    title: "Navigation List",
  },
  {
    description:
      "Compose numeric inputs with steppers, scrub controls, and min/max boundaries using @kuzenbo/core NumberField.",
    href: "/docs/components/number-field",
    order: 53,
    section: "components",
    title: "Number Field",
  },
  {
    description:
      "Composable pagination navigation primitives with active link semantics, boundary controls, and ellipsis support.",
    href: "/docs/components/pagination",
    order: 54,
    section: "components",
    title: "Pagination",
  },
  {
    description:
      "Visualize part-to-whole distributions with optional labels, legend highlighting, radial sizing, and tooltip source control.",
    href: "/docs/components/pie-chart",
    order: 55,
    section: "components",
    title: "Pie Chart",
  },
  {
    description:
      "Compact status chips with avatars, indicators, deltas, and actions in @kuzenbo/core.",
    href: "/docs/components/pill",
    order: 56,
    section: "components",
    title: "Pill",
  },
  {
    description:
      "Use @kuzenbo/core Popover for contextual overlays with render-prop triggers, aligned positioning, and structured content sections.",
    href: "/docs/components/popover",
    order: 57,
    section: "components",
    title: "Popover",
  },
  {
    description:
      "Render UI outside normal DOM flow with shared or custom target nodes.",
    href: "/docs/components/portal",
    order: 58,
    section: "components",
    title: "Portal",
  },
  {
    description:
      "Contextual preview overlays with trigger, popup, portal, viewport, and positioning primitives in @kuzenbo/core.",
    href: "/docs/components/preview-card",
    order: 58,
    section: "components",
    title: "Preview Card",
  },
  {
    description:
      "Display determinate and indeterminate progress states with @kuzenbo/core Progress and slot exports.",
    href: "/docs/components/progress",
    order: 59,
    section: "components",
    title: "Progress",
  },
  {
    description:
      "Client-side SVG QR generation in @kuzenbo/core with semantic theme defaults and configurable error correction.",
    href: "/docs/components/qr-code",
    order: 60,
    section: "components",
    title: "QR Code",
  },
  {
    description:
      "Compare multi-series metrics across categories with @kuzenbo/charts RadarChart and polar axis controls.",
    href: "/docs/components/radar-chart",
    order: 61,
    section: "components",
    title: "Radar Chart",
  },
  {
    description:
      "Prebuilt RadialBarChart for segmented comparisons with label modes, background tracks, and legend-highlight behavior.",
    href: "/docs/components/radial-bar-chart",
    order: 62,
    section: "components",
    title: "Radial Bar Chart",
  },
  {
    description:
      "Collect a single selection from multiple options with Base UI radio semantics and Kuzenbo styling contracts.",
    href: "/docs/components/radio-group",
    order: 63,
    section: "components",
    title: "Radio Group",
  },
  {
    description:
      "Use @kuzenbo/core RangeSlider for two-thumb tuple range selection with marks, constraints, and orientation support.",
    href: "/docs/components/range-slider",
    order: 74,
    section: "components",
    title: "Range Slider",
  },
  {
    description:
      "Read-only and editable star ratings with fractional display and provider-aware size precedence in @kuzenbo/core.",
    href: "/docs/components/rating",
    order: 64,
    section: "components",
    title: "Rating",
  },
  {
    description:
      "Compose split layouts with @kuzenbo/core ResizablePanelGroup, ResizablePanel, and ResizableHandle for editor- and dashboard-style UIs.",
    href: "/docs/components/resizable",
    order: 65,
    section: "components",
    title: "Resizable",
  },
  {
    description:
      "Plot two numeric dimensions across one or more series with formatters, labels, and reference lines.",
    href: "/docs/components/scatter-chart",
    order: 66,
    section: "components",
    title: "Scatter Chart",
  },
  {
    description:
      "Use ScrollArea from @kuzenbo/core to add consistent custom scrollbars and viewport focus behavior around overflow content.",
    href: "/docs/components/scroll-area",
    order: 67,
    section: "components",
    title: "Scroll Area",
  },
  {
    description:
      "Typed single- and multi-select primitives in @kuzenbo/core built on Base UI Select.",
    href: "/docs/components/select",
    order: 68,
    section: "components",
    title: "Select",
  },
  {
    description:
      "Use Separator from @kuzenbo/core for semantic visual division in horizontal and vertical layouts.",
    href: "/docs/components/separator",
    order: 69,
    section: "components",
    title: "Separator",
  },
  {
    description:
      "Dialog-based side panel with trigger, content, overlay, and side-aware layout controls for workflows and settings panels.",
    href: "/docs/components/sheet",
    order: 70,
    section: "components",
    title: "Sheet",
  },
  {
    description:
      "Build responsive app-shell navigation with provider state, desktop collapse modes, and mobile sheet behavior.",
    href: "/docs/components/sidebar",
    order: 71,
    section: "components",
    title: "Sidebar",
  },
  {
    description:
      "Accessible loading placeholders with semantic token styling in @kuzenbo/core.",
    href: "/docs/components/skeleton",
    order: 72,
    section: "components",
    title: "Skeleton",
  },
  {
    description:
      "Use @kuzenbo/core Slider for single-value selection with orientation support, marks, and thumb labels.",
    href: "/docs/components/slider",
    order: 73,
    section: "components",
    title: "Slider",
  },
  {
    description:
      "Create flexible or fixed whitespace in horizontal and vertical layouts.",
    href: "/docs/components/spacer",
    order: 74,
    section: "components",
    title: "Spacer",
  },
  {
    description:
      "Visualize compact trend lines with @kuzenbo/charts Sparkline, including gradient, trend-color, and tooltip configuration.",
    href: "/docs/components/sparkline",
    order: 75,
    section: "components",
    title: "Sparkline",
  },
  {
    description:
      "Lightweight loading indicator in @kuzenbo/core with built-in status semantics and icon-based rendering.",
    href: "/docs/components/spinner",
    order: 76,
    section: "components",
    title: "Spinner",
  },
  {
    description:
      "Use Switch from @kuzenbo/core for immediate binary settings with clear on/off semantics.",
    href: "/docs/components/switch",
    order: 77,
    section: "components",
    title: "Switch",
  },
  {
    description:
      "Semantic table primitive with built-in scroll container, slot-based subcomponents, and token-aligned row/cell styling.",
    href: "/docs/components/table",
    order: 78,
    section: "components",
    title: "Table",
  },
  {
    description:
      "Switch between related content panels with default, line, and pill list variants plus sm/default/lg sizing.",
    href: "/docs/components/tabs",
    order: 79,
    section: "components",
    title: "Tabs",
  },
  {
    description:
      "Auto-resizing multiline input powered by @kuzenbo/core Textarea.",
    href: "/docs/components/textarea",
    order: 80,
    section: "components",
    title: "Textarea",
  },
  {
    description:
      "Use @kuzenbo/core ThemeIcon for icon containers with semantic variant tokens, size controls, and render-prop element composition.",
    href: "/docs/components/theme-icon",
    order: 81,
    section: "components",
    title: "Theme Icon",
  },
  {
    description:
      "Compose chronological or step-based flows with orientation, status, and alternate layout variants.",
    href: "/docs/components/timeline",
    order: 82,
    section: "components",
    title: "Timeline",
  },
  {
    description:
      "Deliver transient notifications with @kuzenbo/notifications Toast primitives, provider wiring, and useToast helpers.",
    href: "/docs/components/toast",
    order: 83,
    section: "components",
    title: "Toast",
  },
  {
    description:
      "Build pressed-state controls and grouped selection patterns with Toggle and ToggleGroup from @kuzenbo/core.",
    href: "/docs/components/toggle",
    order: 84,
    section: "components",
    title: "Toggle",
  },
  {
    description:
      "Segmented single- or multi-select toggle controls in @kuzenbo/core with shared size, variant, spacing, and orientation context.",
    href: "/docs/components/toggle-group",
    order: 85,
    section: "components",
    title: "Toggle Group",
  },
  {
    description:
      "Composable action toolbar with grouped controls, separators, link/input slots, and button variant integration.",
    href: "/docs/components/toolbar",
    order: 86,
    section: "components",
    title: "Toolbar",
  },
  {
    description:
      "Attach contextual hints to focusable controls with provider-managed timing and side-aware popup placement.",
    href: "/docs/components/tooltip",
    order: 87,
    section: "components",
    title: "Tooltip",
  },
  {
    description:
      "Semantic typography primitives and aliases for consistent text hierarchy in @kuzenbo/core.",
    href: "/docs/components/typography",
    order: 88,
    section: "components",
    title: "Typography",
  },
  {
    description:
      "How Kuzenbo is built — design principles, tokens, accessibility, and best practices.",
    href: "/docs/foundations",
    order: 1,
    section: "foundations",
    title: "Foundations",
  },
  {
    description:
      "Build accessible Kuzenbo interfaces with semantic primitives, robust keyboard support, and testable interaction contracts.",
    href: "/docs/foundations/accessibility",
    order: 2,
    section: "foundations",
    title: "Accessibility",
  },
  {
    description:
      "Practical prompting patterns for @kuzenbo/ai using buildAiPrompt, useAiSession, and AiWidget.",
    href: "/docs/foundations/ai-prompting",
    order: 3,
    section: "foundations",
    title: "AI Prompting",
  },
  {
    description:
      "How to use @kuzenbo/charts primitives and prebuilt charts in production apps.",
    href: "/docs/foundations/charts",
    order: 4,
    section: "foundations",
    title: "Charts",
  },
  {
    description:
      "Define and evolve Kuzenbo color tokens through @kuzenbo/theme while keeping semantic class usage stable across packages.",
    href: "/docs/foundations/color-primitives",
    order: 5,
    section: "foundations",
    title: "Color Primitives",
  },
  {
    description:
      "Implement dark mode in Next.js with @kuzenbo/theme bootstrap, provider wiring, and storage sync.",
    href: "/docs/foundations/dark-mode",
    order: 6,
    section: "foundations",
    title: "Dark Mode",
  },
  {
    description:
      "Architecture guidance for @kuzenbo/datatable and how to extend its current public surface safely.",
    href: "/docs/foundations/datatable-architecture",
    order: 7,
    section: "foundations",
    title: "Datatable Architecture",
  },
  {
    description:
      "Practical layout composition with @kuzenbo/core primitives such as Container, Card, Separator, Spacer, and AspectRatio.",
    href: "/docs/foundations/layout-and-spacing",
    order: 8,
    section: "foundations",
    title: "Layout and Spacing",
  },
  {
    description:
      "Performance guidance for Kuzenbo package consumption, runtime setup, and regression prevention.",
    href: "/docs/foundations/performance",
    order: 9,
    section: "foundations",
    title: "Performance",
  },
  {
    description:
      "Ship reliable right-to-left experiences in Kuzenbo by combining document direction, logical layout decisions, and component-level verification.",
    href: "/docs/foundations/rtl",
    order: 10,
    section: "foundations",
    title: "RTL",
  },
  {
    description:
      "Use Kuzenbo packages safely with Next.js Server Components and explicit client boundaries.",
    href: "/docs/foundations/server-components",
    order: 11,
    section: "foundations",
    title: "Server Components",
  },
  {
    description:
      "How to apply @kuzenbo/styles/recommended.css as an optional app-level baseline.",
    href: "/docs/foundations/styles-baseline",
    order: 12,
    section: "foundations",
    title: "Styles Baseline",
  },
  {
    description:
      "Test Kuzenbo components and hooks with behavior-focused, user-facing coverage.",
    href: "/docs/foundations/testing",
    order: 13,
    section: "foundations",
    title: "Testing",
  },
  {
    description:
      "Reference for @kuzenbo/theme runtime APIs, bootstrap behavior, and persistence strategy.",
    href: "/docs/foundations/theme-runtime",
    order: 14,
    section: "foundations",
    title: "Theme Runtime",
  },
  {
    description:
      "Production theming guidance for @kuzenbo/theme, including prepaint bootstrap and runtime provider setup.",
    href: "/docs/foundations/theming",
    order: 15,
    section: "foundations",
    title: "Theming",
  },
  {
    description:
      "Use Kuzenbo typography primitives for semantic hierarchy, consistent variants, and composable render targets.",
    href: "/docs/foundations/typography-system",
    order: 16,
    section: "foundations",
    title: "Typography System",
  },
  {
    description:
      "Get Kuzenbo running in minutes — install, add styles, and build your first page.",
    href: "/docs/getting-started",
    order: 1,
    section: "getting-started",
    title: "Getting Started",
  },
  {
    description: "Add Kuzenbo to your React or Next.js app in a few steps.",
    href: "/docs/getting-started/installation",
    order: 2,
    section: "getting-started",
    title: "Installation",
  },
  {
    description:
      "What Kuzenbo is, why it's built this way, and which package to use when.",
    href: "/docs/getting-started/introduction",
    order: 3,
    section: "getting-started",
    title: "Introduction",
  },
  {
    description: "Set up Kuzenbo in Next.js App Router with SSR-safe theming.",
    href: "/docs/getting-started/nextjs",
    order: 4,
    section: "getting-started",
    title: "Next.js",
  },
  {
    description: "Build your first Kuzenbo page in about 5 minutes.",
    href: "/docs/getting-started/quickstart",
    order: 5,
    section: "getting-started",
    title: "Quickstart",
  },
  {
    description:
      "Theme tokens, optional baseline styles, and how to use semantic colors.",
    href: "/docs/getting-started/styling",
    order: 7,
    section: "getting-started",
    title: "Styling",
  },
  {
    description:
      "Light and dark mode, how theme is picked, and custom integration.",
    href: "/docs/getting-started/theming",
    order: 8,
    section: "getting-started",
    title: "Theming",
  },
  {
    description:
      "Hook index across public Kuzenbo packages with ownership guidance, SSR boundaries, and testing notes.",
    href: "/docs/hooks",
    order: 1,
    section: "hooks",
    title: "Hooks",
  },
  {
    description:
      "Read the active tooltip x/y coordinate from Recharts chart state so custom overlays can follow pointer interaction.",
    href: "/docs/hooks/use-active-tooltip-coordinate",
    order: 2,
    section: "hooks",
    title: "useActiveTooltipCoordinate",
  },
  {
    description:
      "Read the currently active tooltip payload objects from Recharts state during chart interaction.",
    href: "/docs/hooks/use-active-tooltip-data-points",
    order: 3,
    section: "hooks",
    title: "useActiveTooltipDataPoints",
  },
  {
    description:
      "Read the active tooltip label from Recharts interaction state to drive custom headers, badges, or synchronized UI.",
    href: "/docs/hooks/use-active-tooltip-label",
    order: 4,
    section: "hooks",
    title: "useActiveTooltipLabel",
  },
  {
    description:
      "Manage local AI session state with start and reset controls plus a message counter.",
    href: "/docs/hooks/use-ai-session",
    order: 5,
    section: "hooks",
    title: "useAiSession",
  },
  {
    description:
      "Copy text with status lifecycle, accessibility announcements, and optional previous execCommand fallback.",
    href: "/docs/hooks/use-clipboard",
    order: 6,
    section: "hooks",
    title: "useClipboard",
  },
  {
    description:
      "Use chart runtime hooks for context, dimensions, and portal target wiring when building custom chart primitives.",
    href: "/docs/hooks/use-chart",
    order: 7,
    section: "hooks",
    title: "useChart",
  },
  {
    description:
      "Read the current chart context from Chart.Provider or Chart.Root, including config, chart id, and color resolver helpers.",
    href: "/docs/hooks/use-chart-config",
    order: 8,
    section: "hooks",
    title: "useChartConfig",
  },
  {
    description:
      "Read the current chart container height from Recharts layout state inside chart context.",
    href: "/docs/hooks/use-chart-height",
    order: 9,
    section: "hooks",
    title: "useChartHeight",
  },
  {
    description:
      "Create a portal mount target for chart overlays with a ref callback and nullable HTMLElement state.",
    href: "/docs/hooks/use-chart-portal-target",
    order: 10,
    section: "hooks",
    title: "useChartPortalTarget",
  },
  {
    description:
      "Read the current chart container width from Recharts layout state inside chart context.",
    href: "/docs/hooks/use-chart-width",
    order: 11,
    section: "hooks",
    title: "useChartWidth",
  },
  {
    description:
      "Track local datatable page state with a lower-bound clamp that prevents pages below 1.",
    href: "/docs/hooks/use-datatable-state",
    order: 12,
    section: "hooks",
    title: "useDatatableState",
  },
  {
    description:
      "Toggle element or document fullscreen with cross-browser fallbacks, reactive fullscreen state, and cleanup-safe event handling.",
    href: "/docs/hooks/use-fullscreen",
    order: 13,
    section: "hooks",
    title: "useFullscreen",
  },
  {
    description:
      "Read whether the Recharts tooltip is currently active for the current chart interaction state.",
    href: "/docs/hooks/use-is-tooltip-active",
    order: 14,
    section: "hooks",
    title: "useIsTooltipActive",
  },
  {
    description:
      "Run layout effects in the browser and automatically fall back to useEffect when document is unavailable.",
    href: "/docs/hooks/use-isomorphic-effect",
    order: 15,
    section: "hooks",
    title: "useIsomorphicEffect",
  },
  {
    description:
      "Detect whether viewport width is below 768px using matchMedia-driven updates in the browser.",
    href: "/docs/hooks/use-mobile",
    order: 16,
    section: "hooks",
    title: "useMobile",
  },
  {
    description:
      "Read chart offset (top, right, bottom, left) from Recharts to place custom layers relative to the plot area.",
    href: "/docs/hooks/use-offset",
    order: 17,
    section: "hooks",
    title: "useOffset",
  },
  {
    description:
      "Read the computed plot-area rectangle (x, y, width, height) from Recharts chart state.",
    href: "/docs/hooks/use-plot-area",
    order: 18,
    section: "hooks",
    title: "usePlotArea",
  },
  {
    description:
      "Resolve a series color string from Chart config and active theme using Chart context.",
    href: "/docs/hooks/use-series-color",
    order: 19,
    section: "hooks",
    title: "useSeriesColor",
  },
  {
    description:
      "Resolve a CSS variable reference for a chart series key, with deterministic slug fallback for unknown keys.",
    href: "/docs/hooks/use-series-color-var",
    order: 20,
    section: "hooks",
    title: "useSeriesColorVar",
  },
  {
    description:
      "Implementation patterns for building reliable Kuzenbo interfaces across packages and teams.",
    href: "/docs/patterns",
    order: 1,
    section: "patterns",
    title: "Patterns",
  },
  {
    description:
      "Compose Kuzenbo interfaces with explicit slots, render-prop polymorphism, and package-safe ownership boundaries.",
    href: "/docs/patterns/composition",
    order: 2,
    section: "patterns",
    title: "Composition",
  },
  {
    description:
      "Form composition patterns with canonical Form, Field, and Fieldset primitives, plus Kuzenbo input controls and validation flows.",
    href: "/docs/patterns/forms",
    order: 3,
    section: "patterns",
    title: "Forms",
  },
  {
    description:
      "Migrate Kuzenbo codebases safely across package splits and runtime setup updates.",
    href: "/docs/patterns/migration",
    order: 4,
    section: "patterns",
    title: "Migration",
  },
  {
    description:
      "Choose and compose Kuzenbo navigation primitives for global IA, local context, and app command flows.",
    href: "/docs/patterns/navigation-patterns",
    order: 5,
    section: "patterns",
    title: "Navigation Patterns",
  },
  {
    description:
      "Production overlay patterns for dialogs, drawers, sheets, popovers, tooltips, and menu surfaces in @kuzenbo/core.",
    href: "/docs/patterns/overlay-patterns",
    order: 6,
    section: "patterns",
    title: "Overlay Patterns",
  },
  {
    description:
      "Reference hub for Kuzenbo package surfaces, support paths, and upgrade guidance.",
    href: "/docs/reference",
    order: 1,
    section: "reference",
    title: "Reference",
  },
  {
    description:
      "Track Kuzenbo release notes and understand what changed before you upgrade.",
    href: "/docs/reference/changelog",
    order: 4,
    section: "reference",
    title: "Changelog",
  },
  {
    description:
      "Runtime and framework compatibility guidance for Kuzenbo package consumers.",
    href: "/docs/reference/compatibility",
    order: 6,
    section: "reference",
    title: "Compatibility",
  },
  {
    description:
      "Answers to common Kuzenbo questions about package scope, setup, theming, and upgrades.",
    href: "/docs/reference/faq",
    order: 2,
    section: "reference",
    title: "FAQ",
  },
  {
    description:
      "How to get support for Kuzenbo packages and report issues effectively.",
    href: "/docs/reference/support",
    order: 3,
    section: "reference",
    title: "Support",
  },
  {
    description: "Common Kuzenbo integration issues and practical fixes.",
    href: "/docs/reference/troubleshooting",
    order: 7,
    section: "reference",
    title: "Troubleshooting",
  },
  {
    description:
      "Understand Kuzenbo version channels, lockstep package versions, and upgrade paths.",
    href: "/docs/reference/versioning",
    order: 5,
    section: "reference",
    title: "Versioning",
  },
];

const sortPages = (left: DocsRouteEntry, right: DocsRouteEntry): number => {
  const byOrder = left.order - right.order;
  if (byOrder !== 0) {
    return byOrder;
  }

  return left.title.localeCompare(right.title);
};

export const docsSectionEntries: DocsSectionEntry[] = SECTION_ORDER.map(
  (id) => {
    const pages = docsRouteEntries
      .filter((entry) => entry.section === id)
      .toSorted(sortPages);

    return {
      description: SECTION_DESCRIPTIONS[id],
      href: `/docs/${id}`,
      id,
      pages,
      title: SECTION_TITLES[id],
    };
  }
);

export const docsRoutes: string[] = docsRouteEntries.map((entry) => entry.href);

export const getDocsRouteEntry = (href: string): DocsRouteEntry | undefined =>
  docsRouteEntries.find((entry) => entry.href === href);
