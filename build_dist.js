let esbuild = require("esbuild");
let path = require("path");
let fs = require("fs");

function buildTurfMinified() {
  let root_dir = process.cwd();
  let packages_dir = path.join(root_dir, "packages");
  let output_file = "turf.min.js";
  let main_entry = path.join(packages_dir, "turf", "index.ts");

  let deep_resolver_plugin = {
    name: "turf-deep-resolver",
    setup(build) {
      // Intercept any import starting with @turf/
      build.onResolve({ filter: /^@turf\// }, (args) => {
        let segments = args.path.split("/");
        let pkg_id = segments[0] + "/" + segments[1]; // e.g. @turf/internal
        let sub_path = segments.slice(2).join("/"); // e.g. clipper2

        // Potential base directories for the package
        let search_bases = [
          path.join(packages_dir, pkg_id.replace("@turf/", "turf-")),
          path.join(args.resolveDir, "node_modules", pkg_id),
          path.join(root_dir, "node_modules", pkg_id),
        ];

        for (let base of search_bases) {
          if (!fs.existsSync(base)) {
            continue;
          }

          let file_candidates = [];
          if (sub_path) {
            // Looking for something like @turf/internal/clipper2
            // Try standard TS/JS files
            file_candidates.push(path.join(base, "src", sub_path + ".ts"));
            file_candidates.push(path.join(base, sub_path + ".ts"));
            // Try directory indexes (what's likely happening with clipper2)
            file_candidates.push(path.join(base, "src", sub_path, "index.ts"));
            file_candidates.push(path.join(base, sub_path, "index.ts"));
            // Fallbacks for JS
            file_candidates.push(path.join(base, "src", sub_path + ".js"));
            file_candidates.push(path.join(base, sub_path, "index.js"));
          } else {
            // Standard package entry
            file_candidates.push(path.join(base, "index.ts"));
            file_candidates.push(path.join(base, "src", "index.ts"));
            file_candidates.push(path.join(base, "index.js"));
          }

          for (let candidate of file_candidates) {
            if (
              fs.existsSync(candidate) &&
              !fs.lstatSync(candidate).isDirectory()
            ) {
              return { path: path.resolve(candidate) };
            }
          }
        }

        return undefined;
      });
    },
  };

  console.log("Starting deep-scan build for Turf.js...");

  esbuild
    .build({
      entryPoints: [main_entry],
      bundle: true,
      minify: true,
      sourcemap: true,
      outfile: output_file,
      format: "iife",
      globalName: "turf",
      platform: "browser",
      target: ["es2017"],
      plugins: [deep_resolver_plugin],
      define: {
        "process.env.NODE_ENV": '"production"',
      },
      // Ensure it can find 3rd party deps like 'jsts' in the root
      nodePaths: [path.join(root_dir, "node_modules")],
      logLevel: "info",
    })
    .then(() => {
      console.log("Success! Distribution created: " + output_file);
    })
    .catch((err) => {
      console.error("The build was unable to complete:");
      console.error(err);
      process.exit(1);
    });
}

buildTurfMinified();