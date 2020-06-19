<script>
  // eslint-disable-next-line import/no-extraneous-dependencies
  import { createEventDispatcher, tick } from "svelte";
  // eslint-disable-next-line import/no-extraneous-dependencies
  import { fly } from "svelte/transition";
  // eslint-disable-next-line import/no-extraneous-dependencies
  import { timeFormat, timeParse } from "d3-time-format";
  // eslint-disable-next-line import/no-extraneous-dependencies
  import { timeDay } from "d3-time";
  import { placeElement } from "../../../../core/utils/float-placement";

  import { Button } from "../../../../button";
  import { CaretDown, Calendar } from "../../../../icons";

  const dispatch = createEventDispatcher();

  export let active = false;

  let whichOption = "BETWEEN";

  function setActive() {
    active = !active;
  }

  function changeOption(which) {
    return () => {
      whichOption = which;
    };
  }

  const FORMAT = "%Y-%m-%d";
  const LABEL_FORMAT = "%b %d, %Y";
  const formatLabel = timeFormat(LABEL_FORMAT);

  function toDate(str) {
    const fmt = timeParse(FORMAT);
    return fmt(str);
  }

  function fromDate(dt) {
    const fmt = timeFormat(FORMAT);
    return fmt(dt);
  }

  function validateDate(str) {
    if (!str) return false;
    let [y, m, d] = str.split("-");
    d = +d;
    m = +m;
    y = +y;
    const dt = new Date(y, m - 1, d);
    return Boolean(+dt) && dt.getDate() === d && y > 2010;
  }

  let lastValue = 90;

  export let startDate;
  export let endDate;

  let formattedStartDate = fromDate(startDate);
  let formattedEndDate = fromDate(endDate);
  let boundStart = formattedStartDate;
  let boundEnd = formattedEndDate;

  async function applyDates() {
    if (boundStart !== formattedStartDate) formattedStartDate = boundStart;
    if (boundEnd !== formattedEndDate) formattedEndDate = boundEnd;
    if (startIsValid && endIsValid) {
      dispatch("applyDates", {
        start: toDate(formattedStartDate),
        end: toDate(formattedEndDate),
      });
    }
  }

  async function resetDates() {
    dispatch("resetDates");
    await tick();
    boundStart = fromDate(startDate);
    boundEnd = fromDate(endDate);
  }

  function withKey(keybinding, callback) {
    return (evt) => {
      if (evt.key === keybinding) callback();
    };
  }

  $: startIsValid = validateDate(boundStart);
  $: endIsValid = validateDate(boundEnd);

  let parent;
  let element;
  let leftPlacement = 0;
  let topPlacement = 0;
  export let location = "bottom";
  export let alignment = "left";
  let scrollY;

  $: if (active && element && parent) {
    [leftPlacement, topPlacement] = placeElement({
      location,
      alignment,
      elementPosition: element.getBoundingClientRect(),
      parentPosition: parent.getBoundingClientRect(),
      distance: 20,
      y: scrollY,
    });
  }
</script>

<style>
  .date-picker {
    --header-bg: var(--cool-gray-150);
    width: var(--space-40x);
    border-radius: var(--space-base);
    background-color: white;
    box-shadow: 0 1px 2px rgba(0, 0, 0, 0.07), 0 2px 4px rgba(0, 0, 0, 0.07),
      0 4px 8px rgba(0, 0, 0, 0.07), 0 8px 16px rgba(0, 0, 0, 0.07),
      0 16px 32px rgba(0, 0, 0, 0.07), 0 32px 64px rgba(0, 0, 0, 0.07);
  }

  .date-picker:before {
    --wedge: var(--space-2x);
    content: "";
    display: block;
    position: absolute;
    width: 0;
    height: 0;
    transform: translateX(var(--wedge)) translateY(calc(var(--wedge) * -1));
    border-left: var(--wedge) solid transparent;
    border-right: var(--wedge) solid transparent;
    border-bottom: var(--wedge) solid var(--header-bg);
  }

  .date-picker__optionset {
    display: grid;
    grid-auto-flow: column;
    grid-column-gap: var(--space-base);
    background-color: var(--header-bg);
    padding-top: var(--space-base);
    padding-left: var(--space-2x);
    padding-right: var(--space-2x);
    border-top-right-radius: var(--space-base);
    border-top-left-radius: var(--space-base);
  }

  .date-picker__option {
    justify-self: start;
    padding: var(--space-base);
    padding-left: var(--space-2x);
    padding-right: var(--space-2x);
    font-size: var(--text-02);
    text-align: center;
    color: var(--cool-gray-550);
    cursor: pointer;
  }

  .date-picker__option--active {
    background-color: white;
    color: var(--digital-blue-500);
  }

  .date-picker--last {
    padding: var(--space-base);
  }

  .date-picker--between {
    padding: var(--space-base);
    padding-left: var(--space-2x);
    padding-right: var(--space-2x);
  }

  .date-picker__input {
    display: inline;
    font-size: var(--text-02);
    border-radius: var(--space-1h);
    border-width: 2px;
    transition: 120ms border, 200ms box-shadow;
  }

  .date-picker__input:focus {
    border: 2px solid var(--digital-blue-300);
    box-shadow: 4px 4px 0px var(--digital-blue-100);
  }

  .date-picker__input--last {
    width: 72px;
  }

  .date-picker__input--between {
    width: 102px;
  }

  .date-picker__apply {
    padding: var(--space-base);
    padding-left: var(--space-2x);
    padding-right: var(--space-2x);
    padding-bottom: var(--space-2x);
    display: grid;
    grid-auto-flow: column;
    justify-content: end;
    grid-column-gap: var(--space-base);
  }

  .date-picker__input--invalid,
  .date-picker__input--invalid:focus {
    border: 2px solid var(--pantone-red-300);
  }

  .date-picker__input--invalid:focus {
    box-shadow: 2px 2px 0px var(--pantone-red-500);
  }

  .date-picker__reset {
    justify-self: end;
  }

  .date-picker__range {
    padding-left: var(--space-2x);
    padding-right: var(--space-2x);
    color: var(--ux-gray-500);
    font-size: var(--text-02);
  }

  /* FIXME: we are duplicating */
  .gafc {
    display: grid;
    grid-auto-flow: column;
    align-items: center;
    grid-column-gap: var(--space-1x);
  }
</style>

<svelte:window
  bind:scrollY
  on:keydown={withKey('Escape', () => {
    if (active) active = false;
  })} />

<div bind:this={parent}>
  <Button compact level="medium" on:click={setActive}>
    <div class="gafc col-gap-1x">
      <Calendar size={12} />
      {formatLabel(startDate)} - {formatLabel(endDate)}
      <CaretDown size={14} />
    </div>
  </Button>
</div>

{#if active}
  <!-- <FloatingMenu offset={16} {parent}> -->
  <div
    bind:this={element}
    class="date-picker"
    transition:fly={{ duration: 65, y: -5 }}
    style=" position: absolute; left: {leftPlacement}px; top: {topPlacement}px;">
    <div class="date-picker__optionset">
      <div
        class="date-picker__option"
        class:date-picker__option--active={whichOption === 'BETWEEN'}
        on:click={changeOption('BETWEEN')}>
        Between
      </div>
      <div class="date-picker__reset">
        <Button level="low" compact on:click={resetDates}>Reset</Button>
      </div>
    </div>
    {#if whichOption === 'LAST'}
      <div class="date-picker--last">
        <div>
          last
          <input
            type="number"
            class="date-picker__input date-picker__input--last"
            bind:value={lastValue} />
          days
        </div>
      </div>
    {/if}
    {#if whichOption === 'BETWEEN'}
      <div class="date-picker--between">
        <input
          class="date-picker__input date-picker__input--between"
          class:date-picker__input--invalid={!startIsValid}
          bind:value={boundStart} />
        to
        <input
          class="date-picker__input date-picker__input--between"
          class:date-picker__input--invalid={!endIsValid}
          bind:value={boundEnd} />
      </div>
      <div class="date-picker__range">
        {#if startIsValid && endIsValid}
          {timeDay.count(toDate(boundStart), toDate(boundEnd))} days
        {:else}Invalid dates.{/if}
      </div>
    {/if}
    <div class="date-picker__apply">
      <Button
        compact
        level="low"
        on:click={() => {
          active = false;
        }}>
        Cancel
      </Button>
      <Button compact level="high" on:click={applyDates}>Apply</Button>
    </div>
  </div>
  <!-- </FloatingMenu> -->
{/if}
