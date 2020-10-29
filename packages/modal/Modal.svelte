<script>
  import { fade } from "svelte/transition";

  let isOpen = false;

  const open = () => {
    isOpen = true;
  };
  const close = () => {
    isOpen = false;
  };

  const keydown = (e) => {
    if (e.key === "Escape") {
      close();
    }
  };
</script>

<slot name="trigger" {open}>
  <button on:click={open}>open</button>
</slot>

{#if isOpen}
  <div
    class="gp-modal"
    on:keydown|stopPropagation={keydown}
    tabindex={0}
    autofocus
    transition:fade={{ duration: 250 }}>
    <div class="gp-modal__backdrop" on:click={close} />
    <div class="gp-modal__wrapper">
      <div class="gp-modal__header">
        <h1>
          <slot name="title" />
        </h1>
        <button on:click={close}>x</button>
      </div>
      <div class="gp-modal__content">
        <slot>
          <p>Content</p>
        </slot>
      </div>
    </div>
  </div>
{/if}
