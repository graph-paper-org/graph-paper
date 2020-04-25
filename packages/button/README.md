# button

## usage

```
npm install @graph-paper/button
```

```svelte
<script>
import { Button, ButtonGroup } from '@graph-paper/button`;
</script>

<Button on:click={console.log}>A simple Button</Button>
<Button compact on:click={console.log}>A compact Button</Button>
<Button level="medium on:click={console.log}>A medium Button</Button>

<Button level="low" href="https://example.net">A link Button</Button>


<ButtonGroup>
  <Button>First</Button>
  <Button>Second</Button>
  <Button>Third</Button>
</ButtonGroup>

```
