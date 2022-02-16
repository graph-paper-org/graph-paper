import adapter from "@sveltejs/adapter-auto";
import mm from "micromatch";

/** @type {import('@sveltejs/kit').Config} */
const config = {
  kit: {
    adapter: adapter(),
    package: {
      files: (filepath) => mm.all(filepath, ["!**/(stories|tests)/**"]),
    },
  },
};

export default config;
