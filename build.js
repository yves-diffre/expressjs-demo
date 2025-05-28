import { build } from "esbuild";

(async () => {
  try {
    await build({
      banner: {
        js: "import { createRequire } from 'module';const require = createRequire(import.meta.url);",
      },
      bundle: true,
      entryPoints: ["./bin/*.ts"],
      format: "esm",
      keepNames: true,
      minifySyntax: true,
      minifyWhitespace: true,
      outdir: "./dist/bin",
      platform: "node",
      sourcemap: true,
    });
  } catch (error) {
    console.error(error);
    process.exit(1);
  }
})();
