<script>
import { getContext } from 'svelte';
import { tooltip as tooltipAction } from '@graph-paper/core/actions';

export let level = getContext('level') || 'high';
export let tooltip;
export let compact = getContext('compact') || false;
export let label;

export let toggled = false;

export let size = compact ? 'compact' : 'standard';
export let dark = getContext('appDarkMode') || false;

</script>

<button 
    use:tooltipAction={{ text: tooltip }} 
    class="gp-button gp-button--{level} gp-button--{size} gp-button-text--{size}" 
    class:dark 
    class:toggled 
    on:click>
    <slot>{label}</slot>
</button>
