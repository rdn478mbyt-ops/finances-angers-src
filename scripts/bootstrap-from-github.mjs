import { execSync } from "node:child_process";

const ARCHIVE =
  "https://codeload.github.com/rdn478mbyt-ops/finances-angers-src/tar.gz/refs/heads/main";

execSync(`curl -fsSL "${ARCHIVE}" | tar xz --strip-components=1`, {
  stdio: "inherit",
});
execSync("npm install", { stdio: "inherit" });
execSync("node scripts/ensure-pieces.mjs && npx next build", { stdio: "inherit" });
