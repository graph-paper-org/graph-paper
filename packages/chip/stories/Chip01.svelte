<script>
// eslint-disable-next-line import/no-extraneous-dependencies
import { flip } from 'svelte/animate';
// eslint-disable-next-line import/no-extraneous-dependencies
import { fade } from 'svelte/transition';
import { Stack } from '@graph-paper/stack';
import { Button } from '@graph-paper/button';
import {
  LineChart, BarChart, Table, Information,
  Warning,
} from '@graph-paper/icons';
import { Chip, ChipSet } from '..';


let which = 0;
function setToggle(w) {
  return () => { which = w; };
}


let index = 0;
let cancelables = [];
const countries = ['US', 'GB', 'FR', 'BR', 'IN', 'ID', 'IT', 'MX', 'CA', 'JP', 'CN', 'RU', 'NG', 'IR'];
function addCancelable() {
  const country = countries[Math.round((countries.length - 1) * Math.random())];
  cancelables = [...cancelables, { index, country }];
  index += 1;
}

function removeCancelable(k) {
  cancelables = [...cancelables.filter((c) => c.index !== k)];
}

addCancelable();
addCancelable();
addCancelable();

let multipleFilters = [0];

function handleMultipleFilter(v) {
  return () => {
    if (multipleFilters.includes(v)) {
      multipleFilters = [...multipleFilters.filter((di) => di !== v)];
    } else {
      multipleFilters = [...multipleFilters, v];
    }
  };
}

</script>

<style>
h3 {
  margin: 0;
  padding: 0;
  padding-left: calc(var(--space-base) * 1.3);
  padding-bottom: var(--space-base);
  font-size: var(--text-02);
  color: var(--cool-gray-650);
  text-transform: uppercase;
  font-weight: normal;
}
</style>

<div style="width: var(--space-72x);">
  <Stack space={3}>

  <div>
    <h3>Plain</h3>
    <ChipSet>
      <Chip>Normal Chip</Chip>
      <Chip disabled>Disabled</Chip>
    </ChipSet>
  </div>

  <div>
    <h3>Toggled / Filterable / Cancelable</h3>
    <ChipSet>
      <Chip toggled>Toggled</Chip>
      <Chip filterable toggled>Filterable</Chip>
      <Chip cancelable>Cancelable</Chip>
      <Chip toggled cancelable>Cancelable + Toggled</Chip>
    </ChipSet>
  </div>

  <div>
    <h3>slot elements have align: center</h3>
    <ChipSet>
      <Chip> <LineChart size={12} /> One</Chip>
      <Chip> <BarChart size={12} />Two</Chip>
      <Chip> <Table size={12} />Three</Chip>
      <Chip>Four</Chip>
    </ChipSet>
  </div>

  <div>
    <h3>Toggled (radios)</h3>
    <ChipSet>
      <Chip toggled={which === 0} on:click={setToggle(0)}><LineChart size={12} /> Charts</Chip>
      <Chip toggled={which === 1} on:click={setToggle(1)}><Table size={12} /> Tables</Chip>
      <Chip toggled={which === 2} on:click={setToggle(2)}><Information size={12} /> Details</Chip>
      <Chip toggled={which === 3} on:click={setToggle(3)}><Warning size={12} /> Warnings</Chip>
    </ChipSet>
  </div>

  <div>
    <h3>Filterable (radios)</h3>
    <ChipSet>
      <Chip filterable toggled={which === 0} on:click={setToggle(0)}>Charts</Chip>
      <Chip filterable toggled={which === 1} on:click={setToggle(1)}>Tables</Chip>
      <Chip filterable toggled={which === 2} on:click={setToggle(2)}>Details</Chip>
      <Chip filterable toggled={which === 3} on:click={setToggle(3)}>Warnings</Chip>
    </ChipSet>
  </div>

  <div>
    <h3>Filterable (checkboxes)</h3>
    <ChipSet>
      <Chip filterable toggled={multipleFilters.includes(0)} on:click={handleMultipleFilter(0)}>
        US
      </Chip>
      <Chip filterable toggled={multipleFilters.includes(1)} on:click={handleMultipleFilter(1)}>
        GB
      </Chip>
      <Chip filterable toggled={multipleFilters.includes(3)} on:click={handleMultipleFilter(3)}>
        DE
      </Chip>
      <Chip filterable toggled={multipleFilters.includes(2)} on:click={handleMultipleFilter(2)}>
        BR
      </Chip>
    </ChipSet>
  </div>

  <div>
    <h3>Cancelable</h3>
    <ChipSet>
      {#each cancelables as {index, country}, i (index)}
      <div animate:flip={{ duration: 200 }}>
        <Chip cancelable on:cancel={removeCancelable(index)}>{country}</Chip>
      </div>
      {:else}
        <div style='font-size: var(--text-02);' transition:fade={{ duration: 10000, delay: 1000 }}>
          No Chips.
        </div>
      {/each}
    </ChipSet>
  </div>

  <Button compact level=low on:click={addCancelable}>+ Add Item</Button>

  </Stack>
</div>
