## Development

First, run `npm install` to install all dependencies. Then, run
`npm run storybook` to run this project in development mode.

### Code quality

To automatically benefit from the code quality tools that are included with this
project, use an editor (such as
[Visual Studio Code](https://code.visualstudio.com/)) with plugins for
[EditorConfig](https://editorconfig.org/), [ESLint](https://eslint.org/),
[Prettier](https://prettier.io/), and [Svelte](https://svelte.dev/).

When installed correctly, these plugins will warn you when your code contains
potential problems or when it's formatted inconsistently. If you choose to, you
can also configure your editor to automatically format files with Prettier upon
save.

Even with these plugins, you may want to run `npm run format` and `npm test`
before sharing your code to be sure that you didn't miss anything. Also, be
aware that Prettier and its plugins can rarely break existing code. You may want
to double-check that everything works after running `npm run format` just in
case.
