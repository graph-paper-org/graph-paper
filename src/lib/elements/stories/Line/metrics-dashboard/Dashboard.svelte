<script>
  import { format } from "d3-format";
  import { timeFormat } from "d3-time-format";

  // eslint-disable-next-line import/no-extraneous-dependencies
  import { fly } from "svelte/transition";
  // eslint-disable-next-line import/no-extraneous-dependencies
  import { writable } from "svelte/store";

  import { Box } from "../../../../box";
  import MetricChart from "./MetricChart.svelte";

  import {
    Close,
    Stack,
    Tile,
    ThreeByThree,
    Checkbox,
    CheckboxBlank,
  } from "../../../../icons";

  import { Button, ButtonGroup } from "../../../../button";

  import DatePicker from "./DatePicker.svelte";

  import Key from "./Key.svelte";
  import Shortcuts from "./Shortcuts.svelte";

  const store = writable({
    graphSize: "small", // medium, large.
  });

  function changeSize(size) {
    return () => {
      store.update((state) => {
        const newState = { ...state };
        newState.graphSize = size;
        return newState;
      });
    };
  }

  let dtfmt = timeFormat("%b %d, %Y");

  let dates = (n = 365 * 2) => {
    let dt = new Date("2017-01-01");
    return Array.from({ length: n })
      .fill(null)
      .map(() => {
        let dt2 = new Date(dt);
        dt.setDate(dt.getDate() + 1);
        return dt2;
      });
  };

  let M = Math.random() * 10;
  let dau = 1000000 * M;
  let wau = dau * 3;
  let mau = dau * 5.5;
  let usage = 2.5;
  let r01 = 0.8;
  let r02 = 0.7;

  const metricData = dates().map((date, i) => {
    const dow = i % 7;
    const weekend = dow > 4;
    dau += (Math.random() - 0.45) * 100000 * M;
    wau += (Math.random() - 0.45) * 50000 * M;
    mau += (Math.random() - 0.45) * 50000 * M;
    r01 += (Math.random() - 0.5) * (0.01 * (dow === 6 || dow === 7 ? 0.1 : 1));
    r02 += (Math.random() - 0.5) * (0.01 * (dow === 6 || dow === 7 ? 0.1 : 1));
    const r = Math.random();
    if (r < 0.005) {
      r01 += (Math.random() - 0.6) * 0.1;
    }
    usage +=
      (Math.random() - 0.5) * (0.01 * (dow === 6 || dow === 7 ? 0.1 : 1));

    return {
      date,
      dts: dtfmt(date),
      dau: dau * (weekend ? 0.5 : 1),
      dauLow: dau * (weekend ? 0.4 : 1) * 0.9 * (1 - Math.random() / 8),
      dauHigh: dau * (weekend ? 0.7 : 1) * 1.1,
      wau: i > 100 && i < 160 ? undefined : wau,
      wauLow: i > 100 && i < 160 ? undefined : wau * 0.95,
      wauHigh: i > 100 && i < 160 ? undefined : wau * 1.05,
      mau,
      mauLow: mau * 0.9,
      mauHigh: mau * 1.1,
      usage,
      usageLow: usage * 0.8 + Math.random() / 5,
      usageHigh: usage * 1.2 + Math.random() / 5,
      retention01: r01,
      retention02: r02,
      retention01Low: r01 * 0.95,
      retention01High: r01 * 1.05,
      retention02Low: r02 * 0.95,
      retention02High: r02 * 1.05,
    };
  });

  const generateDomain = () => [
    new Date(Math.min(...metricData.map((d) => d.date))),
    new Date(Math.max(...metricData.map((d) => d.date))),
  ];

  let xDomain = generateDomain();

  let auMax =
    Math.max(
      ...metricData.map((d) => d.dauHigh),
      ...metricData.map((d) => d.wauHigh || 0),
      ...metricData.map((d) => d.mauHigh)
    ) * 1.1;

  const resetDomain = () => {
    xDomain = generateDomain();
  };

  let withCommas = format(",");
  let count = (v) => (v !== undefined ? withCommas(Math.round(v)) : "missing");

  const graphs = [
    {
      name: "DAU",
      key: "dau",
      type: "count",
      yMax: auMax,
      axisFormat: format("~s"),
      hoverFormat: count,
    },
    {
      name: "WAU",
      key: "wau",
      type: "count",
      yMax: auMax,
      axisFormat: format("~s"),
      hoverFormat: count,
    },
    {
      name: "MAU",
      key: "mau",
      type: "count",
      yMax: auMax,
      axisFormat: format("~s"),
      hoverFormat: count,
    },
    {
      name: "Usage",
      key: "usage",
      type: "rate",
      yMax: 7,
      axisFormat: format(",d"),
      hoverFormat: format(".2f"),
    },
    {
      name: "Retention ",
      key: "retention01",
      type: "percentage",
      yMax: 1,
      axisFormat: format(".0%"),
      hoverFormat: format(".2%"),
    },
    {
      name: "Retention (1 wk. new)",
      key: "retention02",
      type: "percentage",
      yMax: 1,
      axisFormat: format(".0%"),
      hoverFormat: format(".2%"),
    },
  ];

  let mouseDownValue = {};
  let mouseMoveValue = {};
  let startValue;
  let endValue;

  let xMouse;

  const resetMouseClicks = () => {
    mouseDownValue = {};
    mouseMoveValue = {};
  };
  let isScrubbing = false;

  const endMouseEvent = () => {
    startValue = new Date(Math.min(mouseDownValue.x, mouseMoveValue.x));
    endValue = new Date(Math.max(mouseDownValue.x, mouseMoveValue.x));
    xDomain = [startValue, endValue];
    isScrubbing = true;
    resetMouseClicks();
  };

  let isComparing = false;
  let commonScales = true;

  let width = 375;
  let height = 250;
  $: if ($store.graphSize === "small") {
    width = 375;
    height = 250;
  } else if ($store.graphSize === "medium") {
    width = 550;
    height = 325;
  } else if ($store.graphSize === "large") {
    width = 1200;
    height = 400;
  }
</script>

<main>
  <Box padding={2}>
    <h1>Metrics Dashboard</h1>

    <div class="main-controls">
      <div class="gafc">
        <DatePicker
          startDate={xDomain[0]}
          endDate={xDomain[1]}
          on:applyDates={(evt) => {
            isScrubbing = true;
            let { start, end } = evt.detail;
            xDomain = [start, end];
          }}
          on:resetDates={resetDomain}
        />

        {#if isScrubbing}
          <div in:fly={{ duration: 400, y: -10 }}>
            <Button
              level="medium"
              compact
              on:click={() => {
                isScrubbing = false;
                resetDomain();
              }}
            >
              clear zoom
              <Close size={16} />
            </Button>
          </div>
        {/if}
      </div>
      <div class="gafc" style="justify-self: end">
        <Button
          compact
          level="medium"
          on:click={() => {
            commonScales = !commonScales;
          }}
        >
          <div class="gafc" style="grid-column-gap: var(--space-base);">
            common scales
            {#if commonScales}
              <Checkbox size="1em" />
            {:else}
              <CheckboxBlank size="1em" />
            {/if}
          </div>
        </Button>
        <ButtonGroup level="medium" compact>
          <Button on:click={changeSize("small")}>
            <ThreeByThree size={16} />
          </Button>
          <Button on:click={changeSize("medium")}>
            <Tile size={16} />
          </Button>
          <Button on:click={changeSize("large")}>
            <Stack size={16} />
          </Button>
        </ButtonGroup>
      </div>
    </div>

    <div class="multiples multiples--{$store.graphSize}">
      {#each graphs as { name, type, key, yMax, axisFormat, hoverFormat }, i (name)}
        <div>
          <MetricChart
            size={$store.size}
            {width}
            {height}
            {name}
            data={metricData}
            y={key}
            {xDomain}
            yMin={commonScales ? 0 : undefined}
            yMax={commonScales ? yMax : undefined}
            {axisFormat}
            {hoverFormat}
            {endMouseEvent}
            {resetMouseClicks}
            bind:xMouse
            bind:mouseDownValue
            bind:mouseMoveValue
            bind:isComparing
          />
        </div>
      {/each}
    </div>

    <div
      class="bottom"
      in:fly={{ duration: 500, delay: 1000, y: -10 }}
      style=" width: 970px; display: grid; grid-template-columns: auto auto;
      align-items: start; justify-content: space-between; "
    >
      <Shortcuts />
      <Key />
    </div>
  </Box>
</main>

<style>
  h1 {
    margin: 0px;
    padding: 0px;
    padding-left: var(--space-2x);
    padding-bottom: var(--space-2x);
  }

  .gafc {
    display: grid;
    grid-auto-flow: column;
    align-items: center;
    grid-column-gap: var(--space-2x);
  }

  main {
    min-width: 1200px;
  }

  .multiples {
    display: grid;
    grid-column-gap: var(--space-4x);
    grid-row-gap: var(--space-8x);
    justify-content: center;
    justify-items: start;
  }

  .multiples--small {
    grid-template-columns: auto auto auto;
  }

  .multiples--medium {
    grid-template-columns: auto auto;
  }

  .multiples--large {
    grid-template-columns: auto;
  }

  .main-controls {
    padding-left: var(--space-2x);
    padding-right: var(--space-2x);
    display: grid;
    grid-auto-flow: column;
    justify-content: stretch;
    justify-items: start;
    align-items: center;
    margin-bottom: var(--space-4x);
  }

  .bottom {
    margin: auto;
  }
</style>
