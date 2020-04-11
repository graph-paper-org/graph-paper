# Icons

This package contains a small set of icons needed to build data apps. It primarily consists of adapted icons from the [Photon Design System](https://design.firefox.com/photon/) (in all cases, merely adding a `size` prop) or icons the graph-paper team has contributed. Attribution is given in either direction in all cases.

## how to use the icons

To install, run

```
npm install @graph-paper/icons
```

To use in a component, try

```svelte

<script>
import { ArrowheadLeft } from '@graph-paper/icons';
</script>

<span><ArrowheadLeft size={16} /> See More </span>

```

_NOTE:_ there is no stylesheet associated with these icons, so when using the Svelte REPL, you will not need to import the style.
