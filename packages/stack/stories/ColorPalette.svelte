<script>
import { slide } from 'svelte/transition';
import { interpolateMagma } from 'd3-scale-chromatic';
import { Stack } from '../';
import { Button } from '../../button'
import { Add } from '../../icons'

function generateColor() {
  const index = Math.random();
  const r = Math.random();
  const r2 = Math.random();
  const text = r > .5 ? 0 : 1;
  return {bg: interpolateMagma(r), text: interpolateMagma(text), index};
}

let colors = Array.from({length:3}).map(generateColor);

function remove(i) {
  return () => {
    colors = colors.filter((di) => di.index !== i );
  }
}

</script>

<style>
h2 {
  margin:0px;
}

.color {
  --bg: transparent;
  --text: black;
  background-color: var(--bg);
  color: var(--text);
  border: none;
  transition: box-shadow 100ms;
}

.color:hover {
  box-shadow: 3px 3px 0px var(--hover);
}
</style>


<Stack space={4} justifyContent=start justifyItems=start>
  <h2>Color Palette</h2>
  <Button level=medium on:click={() => { colors = [...colors, generateColor()]}}>add color <Add size=1em /></Button>
  <div style="width: var(--space-24x);">
<Stack>
  {#each colors as { bg, text, index}, i (index)}
    <button on:click={remove(index)} transition:slide={{duration: 500}} class=color style="--bg:{bg}; --text: {text};">
      {bg}
    </button>
  {/each}
</Stack>
</div>

</Stack>
