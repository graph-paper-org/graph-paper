<script>
  import { OptionMenu, Option, OptionDivider } from "..";

  export let knobProps;

  let selected = "win";

  const options = [
    {
      key: "win",
      label: "Windows",
    },
    {
      key: "mac",
      label: "Mac",
      description: "Not including versions before Mac OS X",
    },
    {
      key: "linux",
      label: "Linux",
      description: "Not currently collecting data",
      disabled: true,
    },
    {
      divider: true,
    },
    {
      key: "mobile",
      label: "Mobile",
      description: "All mobile operating systems",
    },
  ];

  function handleSelection({ detail: { key } }) {
    selected = key;
  }
</script>

<OptionMenu {...knobProps} on:selection={handleSelection}>
  {#each options as { key, label, description, disabled, divider }, i (key)}
    {#if divider}
      <OptionDivider />
    {:else}
      <Option
        {key}
        {disabled}
        {label}
        {description}
        selected={selected === key}
      />
    {/if}
  {/each}
</OptionMenu>
