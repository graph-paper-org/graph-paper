<script>
  import { slide } from "svelte/transition";
  import { Button } from "../../../../button";
  import { Stack } from "../../../../stack";
  import { Box } from "../../../../box";
  import { Chip, ChipSet } from "../../../../chip";
  import DimensionMenu from "./DimensionMenu.svelte";

  let filters = [
    {
      title: "Product",
      key: "product",
      options: [
        { label: "Sprocket Classic", key: "sprocket" },
        { label: "Sprocket Premium", key: "premium" },
        { label: "Sprocket Whatever", key: "whatever" },
      ],
    },
    {
      title: "Country",
      key: "country",
      multi: true,
      options: [
        { label: "USA", key: "us" },
        { label: "United Kingdom", key: "gb" },
        { label: "China", key: "zh" },
        { label: "Mexico", key: "mx" },
        { label: "Nigeria", key: "ng" },
        { label: "France", key: "fr" },
      ],
    },
  ];

  let selections = filters.reduce((acc, v) => {
    acc[v.key] = [v.options[0].key];
    return acc;
  }, {});

  function removeSelection(key, value) {
    return () => {
      selections[key] = [...selections[key].filter((s) => s !== value)];
    };
  }

  function handleDimensionSelection(key) {
    return (event) => {
      const value = event.detail;
      selections[key] = value;
    };
  }
</script>

<style>
  h1 {
    padding: 0px;
    margin: 0px;
  }

  h2 {
    font-size: var(--text-03);
    font-weight: normal;
    text-transform: uppercase;
  }
</style>

<nav>
  <div>
    <Box padding={2}>
      <h1>SprocketCo</h1>
    </Box>
    <Box pad={2}>
      <Stack space={1}>
        <Button level="low">Explore</Button>
        <Button level="low">Table</Button>
      </Stack>
    </Box>
    <Box pad={2}>
      <h2>Filters</h2>
      <Stack>
        {#each filters as filter}
          <Stack space={0}>
            <DimensionMenu
              on:selection={handleDimensionSelection(filter.key)}
              selections={selections[filter.key]}
              multi={!!filter.multi}
              options={filter.options}>
              {filter.title}
            </DimensionMenu>
            {#if selections[filter.key].length && filter.multi}
              <div transition:slide>
                <ChipSet>
                  {#each selections[filter.key] as value, i (value)}
                    <Chip
                      cancelable
                      on:cancel={removeSelection(filter.key, value)}>
                      {value}
                    </Chip>
                  {/each}
                </ChipSet>
              </div>
            {:else if !filter.multi}{selections[filter.key]}{/if}
          </Stack>
        {/each}
      </Stack>
    </Box>
    <!-- footer -->
    <!-- {#if site.feedback}
      <Box padding={3}>
        <div
          style="padding-top: var(--space-4x); font-size: var(--text-02); color:
          var(--cool-gray-7500);">
          <div
            style="font-size: var(--text-015); text-transform: uppercase;color:
            var(--cool-gray-550); font-weight: bold;">
            feedback
          </div>
          {site.feedback}
        </div>
      </Box>
    {/if} -->

  </div>
</nav>
