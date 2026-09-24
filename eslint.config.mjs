import { defineConfig, globalIgnores } from "eslint/config";
import nextVitals from "eslint-config-next/core-web-vitals";
import nextTs from "eslint-config-next/typescript";

const eslintConfig = defineConfig([
  ...nextVitals,
  ...nextTs,
  // Override default ignores of eslint-config-next.
  globalIgnores([
    // Default ignores of eslint-config-next:
    ".next/**",
    "out/**",
    "build/**",
    "next-env.d.ts",
    ".wrangler/**",
    // Statik export çıktısı (GitHub Pages için köke kopyalanır):
    "_next/**",
    "blog/**",
    "projeler/**",
    "hakkimda/**",
    "iletisim/**",
    "404/**",
    "_not-found/**",
    "*.html",
    "*.txt",
    "feed.xml",
  ]),
]);

export default eslintConfig;
