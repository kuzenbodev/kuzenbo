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
  href: string;
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

export const docsHomePage: DocsRouteEntry = {
  href: "/docs",
  title: "Documentation",
  description:
    "Kuzenbo docs for developers — React UI library with design tokens, dark mode, and modular packages.",
  order: 0,
  section: "overview",
};

export const docsRouteEntries: DocsRouteEntry[] = [
  {
    href: "/docs",
    title: "Documentation",
    description:
      "Kuzenbo docs for developers — React UI library with design tokens, dark mode, and modular packages.",
    order: 0,
    section: "overview",
  },
  {
    href: "/docs/components",
    title: "Components",
    description:
      "Package-aware component catalog for Kuzenbo publishable UI surfaces.",
    order: 1,
    section: "components",
  },
  {
    href: "/docs/components/accordion",
    title: "Accordion",
    description:
      "Build expandable sections with @kuzenbo/core Accordion, including variant contracts and composition patterns for dense settings UIs.",
    order: 2,
    section: "components",
  },
  {
    href: "/docs/components/affix",
    title: "Affix",
    description:
      "Pin UI to viewport edges with optional portal mounting and explicit position/z-index control.",
    order: 3,
    section: "components",
  },
  {
    href: "/docs/components/ai-widget",
    title: "AI Widget",
    description:
      "Build lightweight assistant surfaces with @kuzenbo/ai AiWidget, including title handling, composition guidance, and runtime boundaries.",
    order: 4,
    section: "components",
  },
  {
    href: "/docs/components/alert",
    title: "Alert",
    description:
      "Use Alert for inline status messaging and AlertDialog for irreversible confirmations in @kuzenbo/core.",
    order: 5,
    section: "components",
  },
  {
    href: "/docs/components/alert-dialog",
    title: "Alert Dialog",
    description:
      "Confirmation-focused modal dialogs in @kuzenbo/core for destructive or irreversible actions.",
    order: 6,
    section: "components",
  },
  {
    href: "/docs/components/announcement",
    title: "Announcement",
    description:
      "Inline announcement pill built on Badge with Tag/Title slots, themed mode, and production composition guidance.",
    order: 7,
    section: "components",
  },
  {
    href: "/docs/components/area-chart",
    title: "Area Chart",
    description:
      "Build multi-series area visualizations with legend highlighting, gradient fills, stacking modes, and dual-axis support.",
    order: 8,
    section: "components",
  },
  {
    href: "/docs/components/aspect-ratio",
    title: "Aspect Ratio",
    description:
      "Maintain stable media layouts with ratio-locked containers in @kuzenbo/core.",
    order: 9,
    section: "components",
  },
  {
    href: "/docs/components/autocomplete",
    title: "Autocomplete",
    description:
      "Build search-first suggestion UIs with @kuzenbo/core Autocomplete, including grouped options, async filtering, and status feedback.",
    order: 10,
    section: "components",
  },
  {
    href: "/docs/components/avatar",
    title: "Avatar",
    description:
      "Render user identity with image, fallback, badge, and grouped avatar stacks.",
    order: 11,
    section: "components",
  },
  {
    href: "/docs/components/badge",
    title: "Badge",
    description:
      "Use Badge in @kuzenbo/core for compact status, taxonomy, and inline metadata labels with semantic variant support.",
    order: 12,
    section: "components",
  },
  {
    href: "/docs/components/bar-chart",
    title: "Bar Chart",
    description:
      "Prebuilt Recharts bar visualizations in @kuzenbo/charts with legend, tooltip, stacking, and waterfall support.",
    order: 13,
    section: "components",
  },
  {
    href: "/docs/components/breadcrumb",
    title: "Breadcrumb",
    description:
      "Build semantic breadcrumb navigation in @kuzenbo/core with composable items, separators, and overflow affordances.",
    order: 14,
    section: "components",
  },
  {
    href: "/docs/components/bubble-chart",
    title: "Bubble Chart",
    description:
      "Prebuilt BubbleChart for multi-series x/y/z comparisons with legend highlighting, reference lines, and formatter controls.",
    order: 15,
    section: "components",
  },
  {
    href: "/docs/components/button",
    title: "Button",
    description:
      "Action buttons, loading states, and grouped controls with @kuzenbo/core.",
    order: 16,
    section: "components",
  },
  {
    href: "/docs/components/button-group",
    title: "Button Group",
    description:
      "Compose adjacent action controls with shared borders, orientation-aware layout, and helper subcomponents.",
    order: 17,
    section: "components",
  },
  {
    href: "/docs/components/calendar",
    title: "Calendar",
    description:
      "Use @kuzenbo/date Calendar for display-only and interactive date selection with single, range, locale, and week-number modes.",
    order: 18,
    section: "components",
  },
  {
    href: "/docs/components/card",
    title: "Card",
    description:
      "Compose content blocks with header, action, body, and footer slots.",
    order: 19,
    section: "components",
  },
  {
    href: "/docs/components/carousel",
    title: "Carousel",
    description:
      "Build swipeable or keyboard-driven slide sequences with @kuzenbo/core Carousel and Embla-backed controls.",
    order: 20,
    section: "components",
  },
  {
    href: "/docs/components/chart",
    title: "Chart",
    description:
      "Low-level chart primitives in @kuzenbo/charts for composing Recharts with shared config, legend, tooltip, and style behavior.",
    order: 21,
    section: "components",
  },
  {
    href: "/docs/components/checkbox",
    title: "Checkbox",
    description:
      "Binary and indeterminate checkbox control with Base UI semantics, plus CheckboxGroup composition for preference sets.",
    order: 22,
    section: "components",
  },
  {
    href: "/docs/components/checkbox-group",
    title: "Checkbox Group",
    description:
      "Compose multiple checkbox choices with shared state and labeling using @kuzenbo/core CheckboxGroup.",
    order: 23,
    section: "components",
  },
  {
    href: "/docs/components/code",
    title: "Code Components",
    description:
      "Build code-focused docs and product surfaces with @kuzenbo/code blocks, tabs, diffs, terminals, and playground primitives.",
    order: 24,
    section: "components",
  },
  {
    href: "/docs/components/collapsible",
    title: "Collapsible",
    description:
      "Build controlled or uncontrolled disclosure panels with smooth height transitions and find-in-page support.",
    order: 24,
    section: "components",
  },
  {
    href: "/docs/components/combobox",
    title: "Combobox",
    description:
      "Searchable single and multi-select composition with the @kuzenbo/core Combobox API.",
    order: 25,
    section: "components",
  },
  {
    href: "/docs/components/command",
    title: "Command",
    description:
      "Create command palettes and searchable action lists with @kuzenbo/core Command and CommandDialog composition.",
    order: 26,
    section: "components",
  },
  {
    href: "/docs/components/composite-chart",
    title: "Composite Chart",
    description:
      "Combine line, bar, and area series in one chart surface with shared tooltip/legend runtime.",
    order: 27,
    section: "components",
  },
  {
    href: "/docs/components/container",
    title: "Container",
    description:
      "Use Container from @kuzenbo/core to apply consistent max-width and horizontal gutters across app sections.",
    order: 28,
    section: "components",
  },
  {
    href: "/docs/components/context-menu",
    title: "Context Menu",
    description:
      "Right-click and context-action menus in @kuzenbo/core with groups, check/radio items, and nested submenus.",
    order: 29,
    section: "components",
  },
  {
    href: "/docs/components/dialog",
    title: "Dialog",
    description:
      "Build modal interactions in @kuzenbo/core with composable Dialog slots and Base UI render-based triggers.",
    order: 30,
    section: "components",
  },
  {
    href: "/docs/components/donut-chart",
    title: "Donut Chart",
    description:
      "Prebuilt DonutChart with center labels, label modes, semicircle support, and legend/tooltip coordination.",
    order: 31,
    section: "components",
  },
  {
    href: "/docs/components/drawer",
    title: "Drawer",
    description:
      "Compose bottom sheets and side drawers with detachable triggers, provider indentation, and swipe-direction control.",
    order: 32,
    section: "components",
  },
  {
    href: "/docs/components/dropdown-menu",
    title: "Dropdown Menu (Legacy Alias)",
    description:
      "Legacy route for the former DropdownMenu API. Use Menu as the canonical surface.",
    order: 999,
    section: "components",
  },
  {
    href: "/docs/components/dropzone",
    title: "Dropzone",
    description:
      "Handle drag-and-drop file intake with @kuzenbo/core Dropzone, including accept/reject states, validation limits, and programmatic open control.",
    order: 34,
    section: "components",
  },
  {
    href: "/docs/components/emoji-picker",
    title: "Emoji Picker",
    description:
      "Compose searchable emoji selection UIs with list, search, empty/loading, and skin-tone controls.",
    order: 35,
    section: "components",
  },
  {
    href: "/docs/components/empty",
    title: "Empty",
    description:
      "Compose clear empty states with @kuzenbo/core Empty slots for media, title, description, and recovery actions.",
    order: 36,
    section: "components",
  },
  {
    href: "/docs/components/field",
    title: "Field",
    description:
      "Label-control-description-error composition primitives in @kuzenbo/core for accessible form rows and validation messaging.",
    order: 40,
    section: "components",
  },
  {
    href: "/docs/components/fieldset",
    title: "Fieldset",
    description:
      "Group related controls with Fieldset primitives in @kuzenbo/core for accessible legends and section-level structure.",
    order: 41,
    section: "components",
  },
  {
    href: "/docs/components/form",
    title: "Form",
    description:
      "Base form root primitives in @kuzenbo/core for validation state, submit flow control, and structured form composition.",
    order: 42,
    section: "components",
  },
  {
    href: "/docs/components/form-field",
    title: "Form Field (Legacy Alias)",
    description:
      "Legacy route for the former FormField API. Use Form, Field, and Fieldset as canonical primitives.",
    order: 999,
    section: "components",
  },
  {
    href: "/docs/components/funnel-chart",
    title: "Funnel Chart",
    description:
      "Render stage-dropoff funnels in @kuzenbo/charts with optional labels, legend highlighting, and tooltip strategies.",
    order: 38,
    section: "components",
  },
  {
    href: "/docs/components/heatmap",
    title: "Heatmap",
    description:
      "Calendar-style Heatmap for date/value datasets with month splitting, outside-date handling, and custom domain/color mapping.",
    order: 39,
    section: "components",
  },
  {
    href: "/docs/components/input",
    title: "Input",
    description:
      "Use Input, InputGroup, and InputOTP from @kuzenbo/core for standard fields, add-on compositions, and verification code entry.",
    order: 41,
    section: "components",
  },
  {
    href: "/docs/components/input-group",
    title: "Input Group",
    description:
      "Compose text fields, addons, buttons, and textarea controls with @kuzenbo/core Input Group for structured form input layouts.",
    order: 42,
    section: "components",
  },
  {
    href: "/docs/components/input-otp",
    title: "Input OTP",
    description:
      "Build one-time passcode inputs with slot-level control over groups, separators, and cells.",
    order: 43,
    section: "components",
  },
  {
    href: "/docs/components/item",
    title: "Item",
    description:
      "Structured list-row primitive in @kuzenbo/core for media, title, description, metadata, and row actions.",
    order: 44,
    section: "components",
  },
  {
    href: "/docs/components/kbd",
    title: "Kbd",
    description:
      "Document and present keyboard shortcuts with Kbd and KbdGroup from @kuzenbo/core.",
    order: 45,
    section: "components",
  },
  {
    href: "/docs/components/label",
    title: "Label",
    description:
      "Semantic form label primitive for associating text with controls via htmlFor/id and disabled-state-aware styling.",
    order: 46,
    section: "components",
  },
  {
    href: "/docs/components/line-chart",
    title: "Line Chart",
    description:
      "Render trend and time-series lines with gradient mode, dual axes, legend highlighting, and point-label controls.",
    order: 47,
    section: "components",
  },
  {
    href: "/docs/components/marquee",
    title: "Marquee",
    description:
      "Scrollable ticker-style content and fade edges with @kuzenbo/core Marquee.",
    order: 48,
    section: "components",
  },
  {
    href: "/docs/components/menu",
    title: "Menu",
    description:
      "Context action menus with checkbox, radio, link items, and submenu composition in @kuzenbo/core.",
    order: 33,
    section: "components",
  },
  {
    href: "/docs/components/menubar",
    title: "Menubar",
    description:
      "Build application-style top menus with @kuzenbo/core Menubar, including groups, radio and checkbox items, and nested submenus.",
    order: 49,
    section: "components",
  },
  {
    href: "/docs/components/meter",
    title: "Meter",
    description:
      "Display bounded measurement values with semantic label, value text, and progress indicator slots.",
    order: 50,
    section: "components",
  },
  {
    href: "/docs/components/mock-data-table",
    title: "Mock Data Table",
    description:
      "Render typed demo tables quickly with @kuzenbo/datatable MockDataTable and TanStack column definitions.",
    order: 51,
    section: "components",
  },
  {
    href: "/docs/components/navigation-menu",
    title: "Navigation Menu",
    description:
      "Composable top-level navigation with trigger/content patterns in @kuzenbo/core.",
    order: 52,
    section: "components",
  },
  {
    href: "/docs/components/navigation-list",
    title: "Navigation List",
    description:
      "Aside navigation rows with active states, sections, and collapsible nesting in @kuzenbo/core.",
    order: 53,
    section: "components",
  },
  {
    href: "/docs/components/number-field",
    title: "Number Field",
    description:
      "Compose numeric inputs with steppers, scrub controls, and min/max boundaries using @kuzenbo/core NumberField.",
    order: 53,
    section: "components",
  },
  {
    href: "/docs/components/pagination",
    title: "Pagination",
    description:
      "Composable pagination navigation primitives with active link semantics, boundary controls, and ellipsis support.",
    order: 54,
    section: "components",
  },
  {
    href: "/docs/components/pie-chart",
    title: "Pie Chart",
    description:
      "Visualize part-to-whole distributions with optional labels, legend highlighting, radial sizing, and tooltip source control.",
    order: 55,
    section: "components",
  },
  {
    href: "/docs/components/pill",
    title: "Pill",
    description:
      "Compact status chips with avatars, indicators, deltas, and actions in @kuzenbo/core.",
    order: 56,
    section: "components",
  },
  {
    href: "/docs/components/popover",
    title: "Popover",
    description:
      "Use @kuzenbo/core Popover for contextual overlays with render-prop triggers, aligned positioning, and structured content sections.",
    order: 57,
    section: "components",
  },
  {
    href: "/docs/components/portal",
    title: "Portal",
    description:
      "Render UI outside normal DOM flow with shared or custom target nodes.",
    order: 58,
    section: "components",
  },
  {
    href: "/docs/components/preview-card",
    title: "Preview Card",
    description:
      "Contextual preview overlays with trigger, popup, portal, viewport, and positioning primitives in @kuzenbo/core.",
    order: 58,
    section: "components",
  },
  {
    href: "/docs/components/progress",
    title: "Progress",
    description:
      "Display determinate and indeterminate progress states with @kuzenbo/core Progress and slot exports.",
    order: 59,
    section: "components",
  },
  {
    href: "/docs/components/qr-code",
    title: "QR Code",
    description:
      "Client-side SVG QR generation in @kuzenbo/core with semantic theme defaults and configurable error correction.",
    order: 60,
    section: "components",
  },
  {
    href: "/docs/components/radar-chart",
    title: "Radar Chart",
    description:
      "Compare multi-series metrics across categories with @kuzenbo/charts RadarChart and polar axis controls.",
    order: 61,
    section: "components",
  },
  {
    href: "/docs/components/radial-bar-chart",
    title: "Radial Bar Chart",
    description:
      "Prebuilt RadialBarChart for segmented comparisons with label modes, background tracks, and legend-highlight behavior.",
    order: 62,
    section: "components",
  },
  {
    href: "/docs/components/radio-group",
    title: "Radio Group",
    description:
      "Collect a single selection from multiple options with Base UI radio semantics and Kuzenbo styling contracts.",
    order: 63,
    section: "components",
  },
  {
    href: "/docs/components/range-slider",
    title: "Range Slider",
    description:
      "Use @kuzenbo/core RangeSlider for two-thumb tuple range selection with marks, constraints, and orientation support.",
    order: 74,
    section: "components",
  },
  {
    href: "/docs/components/rating",
    title: "Rating",
    description:
      "Read-only and editable star ratings with fractional display in @kuzenbo/core.",
    order: 64,
    section: "components",
  },
  {
    href: "/docs/components/resizable",
    title: "Resizable",
    description:
      "Compose split layouts with @kuzenbo/core ResizablePanelGroup, ResizablePanel, and ResizableHandle for editor- and dashboard-style UIs.",
    order: 65,
    section: "components",
  },
  {
    href: "/docs/components/scatter-chart",
    title: "Scatter Chart",
    description:
      "Plot two numeric dimensions across one or more series with formatters, labels, and reference lines.",
    order: 66,
    section: "components",
  },
  {
    href: "/docs/components/scroll-area",
    title: "Scroll Area",
    description:
      "Use ScrollArea from @kuzenbo/core to add consistent custom scrollbars and viewport focus behavior around overflow content.",
    order: 67,
    section: "components",
  },
  {
    href: "/docs/components/select",
    title: "Select",
    description:
      "Typed single- and multi-select primitives in @kuzenbo/core built on Base UI Select.",
    order: 68,
    section: "components",
  },
  {
    href: "/docs/components/separator",
    title: "Separator",
    description:
      "Use Separator from @kuzenbo/core for semantic visual division in horizontal and vertical layouts.",
    order: 69,
    section: "components",
  },
  {
    href: "/docs/components/sheet",
    title: "Sheet",
    description:
      "Dialog-based side panel with trigger, content, overlay, and side-aware layout controls for workflows and settings panels.",
    order: 70,
    section: "components",
  },
  {
    href: "/docs/components/sidebar",
    title: "Sidebar",
    description:
      "Build responsive app-shell navigation with provider state, desktop collapse modes, and mobile sheet behavior.",
    order: 71,
    section: "components",
  },
  {
    href: "/docs/components/skeleton",
    title: "Skeleton",
    description:
      "Accessible loading placeholders with semantic token styling in @kuzenbo/core.",
    order: 72,
    section: "components",
  },
  {
    href: "/docs/components/slider",
    title: "Slider",
    description:
      "Use @kuzenbo/core Slider for single-value selection with orientation support, marks, and thumb labels.",
    order: 73,
    section: "components",
  },
  {
    href: "/docs/components/spacer",
    title: "Spacer",
    description:
      "Create flexible or fixed whitespace in horizontal and vertical layouts.",
    order: 74,
    section: "components",
  },
  {
    href: "/docs/components/sparkline",
    title: "Sparkline",
    description:
      "Visualize compact trend lines with @kuzenbo/charts Sparkline, including gradient, trend-color, and tooltip configuration.",
    order: 75,
    section: "components",
  },
  {
    href: "/docs/components/spinner",
    title: "Spinner",
    description:
      "Lightweight loading indicator in @kuzenbo/core with built-in status semantics and icon-based rendering.",
    order: 76,
    section: "components",
  },
  {
    href: "/docs/components/switch",
    title: "Switch",
    description:
      "Use Switch from @kuzenbo/core for immediate binary settings with clear on/off semantics.",
    order: 77,
    section: "components",
  },
  {
    href: "/docs/components/table",
    title: "Table",
    description:
      "Semantic table primitive with built-in scroll container, slot-based subcomponents, and token-aligned row/cell styling.",
    order: 78,
    section: "components",
  },
  {
    href: "/docs/components/tabs",
    title: "Tabs",
    description:
      "Switch between related content panels with default, line, and pill list variants plus sm/default/lg sizing.",
    order: 79,
    section: "components",
  },
  {
    href: "/docs/components/textarea",
    title: "Textarea",
    description:
      "Auto-resizing multiline input powered by @kuzenbo/core Textarea.",
    order: 80,
    section: "components",
  },
  {
    href: "/docs/components/theme-icon",
    title: "Theme Icon",
    description:
      "Use @kuzenbo/core ThemeIcon for icon containers with semantic variant tokens, size controls, and render-prop element composition.",
    order: 81,
    section: "components",
  },
  {
    href: "/docs/components/timeline",
    title: "Timeline",
    description:
      "Compose chronological or step-based flows with orientation, status, and alternate layout variants.",
    order: 82,
    section: "components",
  },
  {
    href: "/docs/components/toast",
    title: "Toast",
    description:
      "Deliver transient notifications with @kuzenbo/notifications Toast primitives, provider wiring, and useToast helpers.",
    order: 83,
    section: "components",
  },
  {
    href: "/docs/components/toggle",
    title: "Toggle",
    description:
      "Build pressed-state controls and grouped selection patterns with Toggle and ToggleGroup from @kuzenbo/core.",
    order: 84,
    section: "components",
  },
  {
    href: "/docs/components/toggle-group",
    title: "Toggle Group",
    description:
      "Segmented single- or multi-select toggle controls in @kuzenbo/core with shared size, variant, spacing, and orientation context.",
    order: 85,
    section: "components",
  },
  {
    href: "/docs/components/toolbar",
    title: "Toolbar",
    description:
      "Composable action toolbar with grouped controls, separators, link/input slots, and button variant integration.",
    order: 86,
    section: "components",
  },
  {
    href: "/docs/components/tooltip",
    title: "Tooltip",
    description:
      "Attach contextual hints to focusable controls with provider-managed timing and side-aware popup placement.",
    order: 87,
    section: "components",
  },
  {
    href: "/docs/components/typography",
    title: "Typography",
    description:
      "Semantic typography primitives and aliases for consistent text hierarchy in @kuzenbo/core.",
    order: 88,
    section: "components",
  },
  {
    href: "/docs/foundations",
    title: "Foundations",
    description:
      "How Kuzenbo is built — design principles, tokens, accessibility, and best practices.",
    order: 1,
    section: "foundations",
  },
  {
    href: "/docs/foundations/accessibility",
    title: "Accessibility",
    description:
      "Build accessible Kuzenbo interfaces with semantic primitives, robust keyboard support, and testable interaction contracts.",
    order: 2,
    section: "foundations",
  },
  {
    href: "/docs/foundations/ai-prompting",
    title: "AI Prompting",
    description:
      "Practical prompting patterns for @kuzenbo/ai using buildAiPrompt, useAiSession, and AiWidget.",
    order: 3,
    section: "foundations",
  },
  {
    href: "/docs/foundations/charts",
    title: "Charts",
    description:
      "How to use @kuzenbo/charts primitives and prebuilt charts in production apps.",
    order: 4,
    section: "foundations",
  },
  {
    href: "/docs/foundations/color-primitives",
    title: "Color Primitives",
    description:
      "Define and evolve Kuzenbo color tokens through @kuzenbo/theme while keeping semantic class usage stable across packages.",
    order: 5,
    section: "foundations",
  },
  {
    href: "/docs/foundations/dark-mode",
    title: "Dark Mode",
    description:
      "Implement dark mode in Next.js with @kuzenbo/theme bootstrap, provider wiring, and storage sync.",
    order: 6,
    section: "foundations",
  },
  {
    href: "/docs/foundations/datatable-architecture",
    title: "Datatable Architecture",
    description:
      "Architecture guidance for @kuzenbo/datatable and how to extend its current public surface safely.",
    order: 7,
    section: "foundations",
  },
  {
    href: "/docs/foundations/layout-and-spacing",
    title: "Layout and Spacing",
    description:
      "Practical layout composition with @kuzenbo/core primitives such as Container, Card, Separator, Spacer, and AspectRatio.",
    order: 8,
    section: "foundations",
  },
  {
    href: "/docs/foundations/performance",
    title: "Performance",
    description:
      "Performance guidance for Kuzenbo package consumption, runtime setup, and regression prevention.",
    order: 9,
    section: "foundations",
  },
  {
    href: "/docs/foundations/rtl",
    title: "RTL",
    description:
      "Ship reliable right-to-left experiences in Kuzenbo by combining document direction, logical layout decisions, and component-level verification.",
    order: 10,
    section: "foundations",
  },
  {
    href: "/docs/foundations/server-components",
    title: "Server Components",
    description:
      "Use Kuzenbo packages safely with Next.js Server Components and explicit client boundaries.",
    order: 11,
    section: "foundations",
  },
  {
    href: "/docs/foundations/styles-baseline",
    title: "Styles Baseline",
    description:
      "How to apply @kuzenbo/styles/recommended.css as an optional app-level baseline.",
    order: 12,
    section: "foundations",
  },
  {
    href: "/docs/foundations/testing",
    title: "Testing",
    description:
      "Test Kuzenbo components and hooks with behavior-focused, user-facing coverage.",
    order: 13,
    section: "foundations",
  },
  {
    href: "/docs/foundations/theme-runtime",
    title: "Theme Runtime",
    description:
      "Reference for @kuzenbo/theme runtime APIs, bootstrap behavior, and persistence strategy.",
    order: 14,
    section: "foundations",
  },
  {
    href: "/docs/foundations/theming",
    title: "Theming",
    description:
      "Production theming guidance for @kuzenbo/theme, including prepaint bootstrap and runtime provider setup.",
    order: 15,
    section: "foundations",
  },
  {
    href: "/docs/foundations/typography-system",
    title: "Typography System",
    description:
      "Use Kuzenbo typography primitives for semantic hierarchy, consistent variants, and composable render targets.",
    order: 16,
    section: "foundations",
  },
  {
    href: "/docs/getting-started",
    title: "Getting Started",
    description:
      "Get Kuzenbo running in minutes — install, add styles, and build your first page.",
    order: 1,
    section: "getting-started",
  },
  {
    href: "/docs/getting-started/installation",
    title: "Installation",
    description: "Add Kuzenbo to your React or Next.js app in a few steps.",
    order: 2,
    section: "getting-started",
  },
  {
    href: "/docs/getting-started/introduction",
    title: "Introduction",
    description:
      "What Kuzenbo is, why it's built this way, and which package to use when.",
    order: 3,
    section: "getting-started",
  },
  {
    href: "/docs/getting-started/nextjs",
    title: "Next.js",
    description: "Set up Kuzenbo in Next.js App Router with SSR-safe theming.",
    order: 4,
    section: "getting-started",
  },
  {
    href: "/docs/getting-started/quickstart",
    title: "Quickstart",
    description: "Build your first Kuzenbo page in about 5 minutes.",
    order: 5,
    section: "getting-started",
  },
  {
    href: "/docs/getting-started/styling",
    title: "Styling",
    description:
      "Theme tokens, optional baseline styles, and how to use semantic colors.",
    order: 7,
    section: "getting-started",
  },
  {
    href: "/docs/getting-started/theming",
    title: "Theming",
    description:
      "Light and dark mode, how theme is picked, and custom integration.",
    order: 8,
    section: "getting-started",
  },
  {
    href: "/docs/hooks",
    title: "Hooks",
    description:
      "Hook index across public Kuzenbo packages with ownership guidance, SSR boundaries, and testing notes.",
    order: 1,
    section: "hooks",
  },
  {
    href: "/docs/hooks/use-active-tooltip-coordinate",
    title: "useActiveTooltipCoordinate",
    description:
      "Read the active tooltip x/y coordinate from Recharts chart state so custom overlays can follow pointer interaction.",
    order: 2,
    section: "hooks",
  },
  {
    href: "/docs/hooks/use-active-tooltip-data-points",
    title: "useActiveTooltipDataPoints",
    description:
      "Read the currently active tooltip payload objects from Recharts state during chart interaction.",
    order: 3,
    section: "hooks",
  },
  {
    href: "/docs/hooks/use-active-tooltip-label",
    title: "useActiveTooltipLabel",
    description:
      "Read the active tooltip label from Recharts interaction state to drive custom headers, badges, or synchronized UI.",
    order: 4,
    section: "hooks",
  },
  {
    href: "/docs/hooks/use-ai-session",
    title: "useAiSession",
    description:
      "Manage local AI session state with start and reset controls plus a message counter.",
    order: 5,
    section: "hooks",
  },
  {
    href: "/docs/hooks/use-clipboard",
    title: "useClipboard",
    description:
      "Copy text with status lifecycle, accessibility announcements, and optional legacy execCommand fallback.",
    order: 6,
    section: "hooks",
  },
  {
    href: "/docs/hooks/use-chart",
    title: "useChart",
    description:
      "Use chart runtime hooks for context, dimensions, and portal target wiring when building custom chart primitives.",
    order: 7,
    section: "hooks",
  },
  {
    href: "/docs/hooks/use-chart-config",
    title: "useChartConfig",
    description:
      "Read the current chart context from Chart.Provider or Chart.Root, including config, chart id, and color resolver helpers.",
    order: 8,
    section: "hooks",
  },
  {
    href: "/docs/hooks/use-chart-height",
    title: "useChartHeight",
    description:
      "Read the current chart container height from Recharts layout state inside chart context.",
    order: 9,
    section: "hooks",
  },
  {
    href: "/docs/hooks/use-chart-portal-target",
    title: "useChartPortalTarget",
    description:
      "Create a portal mount target for chart overlays with a ref callback and nullable HTMLElement state.",
    order: 10,
    section: "hooks",
  },
  {
    href: "/docs/hooks/use-chart-width",
    title: "useChartWidth",
    description:
      "Read the current chart container width from Recharts layout state inside chart context.",
    order: 11,
    section: "hooks",
  },
  {
    href: "/docs/hooks/use-datatable-state",
    title: "useDatatableState",
    description:
      "Track local datatable page state with a lower-bound clamp that prevents pages below 1.",
    order: 12,
    section: "hooks",
  },
  {
    href: "/docs/hooks/use-fullscreen",
    title: "useFullscreen",
    description:
      "Toggle element or document fullscreen with cross-browser fallbacks, reactive fullscreen state, and cleanup-safe event handling.",
    order: 13,
    section: "hooks",
  },
  {
    href: "/docs/hooks/use-is-tooltip-active",
    title: "useIsTooltipActive",
    description:
      "Read whether the Recharts tooltip is currently active for the current chart interaction state.",
    order: 14,
    section: "hooks",
  },
  {
    href: "/docs/hooks/use-isomorphic-effect",
    title: "useIsomorphicEffect",
    description:
      "Run layout effects in the browser and automatically fall back to useEffect when document is unavailable.",
    order: 15,
    section: "hooks",
  },
  {
    href: "/docs/hooks/use-mobile",
    title: "useMobile",
    description:
      "Detect whether viewport width is below 768px using matchMedia-driven updates in the browser.",
    order: 16,
    section: "hooks",
  },
  {
    href: "/docs/hooks/use-offset",
    title: "useOffset",
    description:
      "Read chart offset (top, right, bottom, left) from Recharts to place custom layers relative to the plot area.",
    order: 17,
    section: "hooks",
  },
  {
    href: "/docs/hooks/use-plot-area",
    title: "usePlotArea",
    description:
      "Read the computed plot-area rectangle (x, y, width, height) from Recharts chart state.",
    order: 18,
    section: "hooks",
  },
  {
    href: "/docs/hooks/use-series-color",
    title: "useSeriesColor",
    description:
      "Resolve a series color string from Chart config and active theme using Chart context.",
    order: 19,
    section: "hooks",
  },
  {
    href: "/docs/hooks/use-series-color-var",
    title: "useSeriesColorVar",
    description:
      "Resolve a CSS variable reference for a chart series key, with deterministic slug fallback for unknown keys.",
    order: 20,
    section: "hooks",
  },
  {
    href: "/docs/patterns",
    title: "Patterns",
    description:
      "Implementation patterns for building reliable Kuzenbo interfaces across packages and teams.",
    order: 1,
    section: "patterns",
  },
  {
    href: "/docs/patterns/composition",
    title: "Composition",
    description:
      "Compose Kuzenbo interfaces with explicit slots, render-prop polymorphism, and package-safe ownership boundaries.",
    order: 2,
    section: "patterns",
  },
  {
    href: "/docs/patterns/forms",
    title: "Forms",
    description:
      "Form composition patterns with canonical Form, Field, and Fieldset primitives, plus Kuzenbo input controls and validation flows.",
    order: 3,
    section: "patterns",
  },
  {
    href: "/docs/patterns/migration",
    title: "Migration",
    description:
      "Migrate Kuzenbo codebases safely across package splits and runtime setup updates.",
    order: 4,
    section: "patterns",
  },
  {
    href: "/docs/patterns/navigation-patterns",
    title: "Navigation Patterns",
    description:
      "Choose and compose Kuzenbo navigation primitives for global IA, local context, and app command flows.",
    order: 5,
    section: "patterns",
  },
  {
    href: "/docs/patterns/overlay-patterns",
    title: "Overlay Patterns",
    description:
      "Production overlay patterns for dialogs, drawers, sheets, popovers, tooltips, and menu surfaces in @kuzenbo/core.",
    order: 6,
    section: "patterns",
  },
  {
    href: "/docs/reference",
    title: "Reference",
    description:
      "Reference hub for Kuzenbo package surfaces, support paths, and upgrade guidance.",
    order: 1,
    section: "reference",
  },
  {
    href: "/docs/reference/changelog",
    title: "Changelog",
    description:
      "Track Kuzenbo release notes and understand what changed before you upgrade.",
    order: 4,
    section: "reference",
  },
  {
    href: "/docs/reference/compatibility",
    title: "Compatibility",
    description:
      "Runtime and framework compatibility guidance for Kuzenbo package consumers.",
    order: 6,
    section: "reference",
  },
  {
    href: "/docs/reference/faq",
    title: "FAQ",
    description:
      "Answers to common Kuzenbo questions about package scope, setup, theming, and upgrades.",
    order: 2,
    section: "reference",
  },
  {
    href: "/docs/reference/support",
    title: "Support",
    description:
      "How to get support for Kuzenbo packages and report issues effectively.",
    order: 3,
    section: "reference",
  },
  {
    href: "/docs/reference/troubleshooting",
    title: "Troubleshooting",
    description: "Common Kuzenbo integration issues and practical fixes.",
    order: 7,
    section: "reference",
  },
  {
    href: "/docs/reference/versioning",
    title: "Versioning",
    description:
      "Understand Kuzenbo version channels, lockstep package versions, and upgrade paths.",
    order: 5,
    section: "reference",
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
      id,
      href: `/docs/${id}`,
      title: SECTION_TITLES[id],
      description: SECTION_DESCRIPTIONS[id],
      pages,
    };
  }
);

export const docsRoutes: string[] = docsRouteEntries.map((entry) => entry.href);

export const getDocsRouteEntry = (href: string): DocsRouteEntry | undefined =>
  docsRouteEntries.find((entry) => entry.href === href);
