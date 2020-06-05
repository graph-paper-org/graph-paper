# Getting Started

## If you're developing an app with graph-paper

The quickest way to get started with graph paper is to use
[degit](https://github.com/Rich-Harris/degit) to clone a template svelte
project.

```

npx degit sveltejs/template my-project
// or
npx degit graph-paper-org/app-template my-project
```

Either the `graph-paper` template or the standard Svelte template suffices.

The `graph-paper` template provides a number of other niceties for development,
including (1) eslint support, (2) prettier configuration, (3) Jest testing
pre-configured, (4) Storybook. The `graph-paper` team uses this template for
applications to speed up our own development and provide tools. This template is
_not_ a requirement to use `graph-paper`.

If you do use the Svelte template, you will need to add `rollup-plugin-postcss`
to your Rollup configuration before using `graph-paper`. See
[this rollup config](https://github.com/graph-paper-org/app-template/blob/master/rollup.config.js#L36)
for an example. If you use Webpack, you can use the
[postcss-loader](https://webpack.js.org/loaders/postcss-loader/).

Once you have done the above, adding `graph-paper` packages is straightforward.

## If you're developing graph-paper
