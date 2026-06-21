# Rebuilding Turf.performant

**Build Steps:**

1. Download the current folder as a .zip: `Code > Download ZIP`.
2. Extract the base folder.
3. Run your terminal inside the base folder (on Windows 11, `Right Click > Open in Terminal`).
4. Ensure [Node.js](https://nodejs.org/en/download) and [pnpm](https://pnpm.io/installation) are installed on your system.
5. Run `pnpm install --ignore-scripts`.
6. Run `pnpm add -D esbuild --ignore-scripts`
7. Run `node build_dist.js`.

The finished `turf.min.js` and its linker address map should now appear in the base directory. If you wish to use the pre-built version, see [turf.min.js](https://raw.githubusercontent.com/ConfoederatioVF/Turf.performant/refs/heads/main/turf.min.js).
