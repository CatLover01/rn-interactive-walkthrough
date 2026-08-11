import { themes as prismThemes } from "prism-react-renderer";
import type { Config } from "@docusaurus/types";
import type * as Preset from "@docusaurus/preset-classic";

const typedocWatch = process.env.TYPEDOC_WATCH === "true";

const config: Config = {
  title: "React Native Interactive Walkthrough",
  tagline:
    "A React Native library to create interactive walkthroughs for your app",
  future: {
    v4: true,
  },

  url: "https://catlover01.github.io",
  baseUrl: "/rn-interactive-walkthrough/",

  organizationName: "CatLover01",
  projectName: "rn-interactive-walkthrough",
  trailingSlash: false,

  onBrokenLinks: "throw",
  // typedoc's <a id> anchors are invisible to the broken-anchor checker
  // (facebook/docusaurus#9808), so the api-reference page reports false
  // positives. There is no per-page option, so warn instead of throw.
  onBrokenAnchors: "warn",
  markdown: {
    hooks: {
      onBrokenMarkdownLinks: "throw",
    },
  },

  i18n: {
    defaultLocale: "en",
    locales: ["en"],
  },

  presets: [
    [
      "classic",
      {
        docs: {
          sidebarPath: "./sidebars.ts",
          editUrl:
            "https://github.com/CatLover01/rn-interactive-walkthrough/tree/main/docs/",
        },
        theme: {
          customCss: "./src/css/custom.css",
        },
      } satisfies Preset.Options,
    ],
  ],

  plugins: [
    [
      "docusaurus-plugin-typedoc",
      {
        id: "docAPIReference",
        name: "rn-interactive-walkthrough API",
        entryPoints: ["../src/index.tsx"],
        tsconfig: "../tsconfig.build.json",
        watch: typedocWatch,
        outputFileStrategy: "modules",
        out: "docs/api-reference",
        cleanOutputDir: true,
        disableSources: true,
        expandObjects: true,
        expandParameters: true,
        readme: "none",
        parametersFormat: "table",
        typeDeclarationFormat: "table",
        classPropertiesFormat: "table",
        // Emit <a id="api-..."> anchors so typedoc's hash links survive the
        // slugger collision (see onBrokenAnchors comment above).
        useHTMLAnchors: true,
        anchorPrefix: "api-",
      },
    ],
  ],

  themeConfig: {
    colorMode: {
      respectPrefersColorScheme: true,
    },
    navbar: {
      title: "RN Interactive Walkthrough",
      items: [
        {
          type: "docSidebar",
          sidebarId: "guideSidebar",
          position: "left",
          label: "Guides",
        },
        {
          type: "docSidebar",
          sidebarId: "apiSidebar",
          position: "left",
          label: "API Reference",
        },
        {
          href: "https://github.com/CatLover01/rn-interactive-walkthrough/tree/main/example",
          label: "Example App",
          position: "right",
        },
        {
          href: "https://github.com/CatLover01/rn-interactive-walkthrough",
          label: "GitHub",
          position: "right",
        },
      ],
    },
    footer: {
      style: "dark",
      copyright: `Copyright © ${new Date().getFullYear()} <a href="https://github.com/CatLover01" target=”_blank”>Olivier Allard</a>. Built with Docusaurus.`,
    },
    prism: {
      theme: prismThemes.github,
      darkTheme: prismThemes.dracula,
    },
  } satisfies Preset.ThemeConfig,

  themes: [
    ["@easyops-cn/docusaurus-search-local", { hashed: true, indexBlog: false }],
  ],
};

export default config;
