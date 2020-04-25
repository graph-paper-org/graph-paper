<script>
// eslint-disable-next-line import/no-extraneous-dependencies
import { getContext } from 'svelte';
// eslint-disable-next-line import/no-extraneous-dependencies
import { get_current_component as getComponent } from 'svelte/internal';
import { tooltip as tooltipAction, forwardEvents } from '@graph-paper/core/actions';

export let level = getContext('level') || 'high';
export let tooltip;
export let compact = getContext('compact') || false;
export let label;
export let href;
export let target;

const forwardAll = forwardEvents(getComponent());

const isLink = href !== undefined;

export let toggled = false;

export let size = compact ? 'compact' : 'standard';
export let dark = getContext('appDarkMode') || false;

</script>

{#if isLink}
<a
  {href}
  {target}
  class="gp-button gp-button--{level} gp-button--{size} gp-button-text--{size}"
  class:dark
  class:toggled
  use:forwardAll
>
  <slot>{label}</slot>
</a>
{:else}
<button
    use:tooltipAction={{ text: tooltip }}
    class="gp-button gp-button--{level} gp-button--{size} gp-button-text--{size}"
    class:dark
    class:toggled
    use:forwardAll>
    <slot>{label}</slot>
</button>
{/if}
