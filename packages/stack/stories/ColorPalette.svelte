<script>
  // eslint-disable-next-line import/no-extraneous-dependencies
  import { slide, fade } from "svelte/transition";
  // eslint-disable-next-line import/no-extraneous-dependencies
  import { interpolateMagma } from "d3-scale-chromatic";
  import { Stack } from "..";
  import { Button } from "../../button";
  import { Add } from "../../icons";
  import { DataGraphic } from "../../datagraphic";
  import { Point } from "../../elements";
  import { Axis } from "../../guides";

  function generateColor() {
    const index = Math.random();
    const value = Math.random();
    const text = value > 0.5 ? 0 : 1;
    return {
      value,
      bg: interpolateMagma(value),
      text: interpolateMagma(text),
      index,
    };
  }

  let colors = Array.from({ length: 3 }).map(generateColor);

  function remove(i) {
    return () => {
      colors = colors.filter((di) => di.index !== i);
    };
  }
</script>

<style>
  h2 {
    margin: 0px;
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

<Stack space={4} justifyContent="start" justifyItems="start">
  <h2>Color Palette</h2>
  <DataGraphic
    xType="linear"
    yType="scaleBand"
    yDomain={['Magma']}
    xDomain={[0, 1]}
    width={200}
    height={50}
    top={0}
    left={4}>
    <Axis side="bottom" lineStyle="long" tickColor="var(--cool-gray-200)" />
    <Axis side="left" />
    {#each colors as color, i (color.bg)}
      <g transition:fade={{ duration: 200 }}>
        <Point x={color.value} y="Magma" color={color.bg} size={3} stroke={interpolateMagma(0)} strokeWidth={1} strokeAlpha={.5} />
      </g>
    {/each}
  </DataGraphic>
  <Button
    level="medium"
    on:click={() => {
      colors = [...colors, generateColor()];
    }}>
    add color
    <Add size="1em" />
  </Button>
  <div style="width: var(--space-24x);">
    <Stack>
      {#each colors as { bg, text, index }, i (index)}
        <button
          on:click={remove(index)}
          transition:slide={{ duration: 200 }}
          class="color"
          style="--bg:{bg}; --text: {text};">
          {bg}
        </button>
      {/each}
    </Stack>
  </div>

</Stack>
