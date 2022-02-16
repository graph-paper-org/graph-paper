# Chip

A chip is a discrete interaction element conveying information that is
filterable, cancelable, and clickable. More information about chips can be found
in the
[Material Design documentation](https://material.io/components/chips/#input-chips).

## usage

```
npm install @graph-paper/core @graph-paper/chip
```

```svelte
<script>
  import { Chip, ChipSet } from "@graph-paper/chip";
</script>

<ChipSet>
  <Chip>a plain chip</Chip>
  <Chip disabled>a plain chip</Chip>
  <Chip
    toggled={whichChip}
    on:click={() => {
      whichChip = true;
    }}>A</Chip
  >
  <Chip
    toggled={whichChip}
    on:click={() => {
      whichChip = true;
    }}>B</Chip
  >
  <Chip
    filterable
    toggled={whichChip}
    on:click={() => {
      whichChip = true;
    }}
  >
    A filterable
  </Chip>
  <Chip
    filterable
    toggled={whichChip}
    on:click={() => {
      whichChip = true;
    }}
  >
    B filterable
  </Chip>
  <Chip cancelable on:cancel={console.log}>Cancelable Chip</Chip>
</ChipSet>
```
