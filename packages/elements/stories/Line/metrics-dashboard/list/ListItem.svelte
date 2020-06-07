<style>
  li {
    cursor: pointer;
  }

  button {
    margin: 0px;
    background-color: transparent;
    border: none;
    width: 100%;
    text-align: left;
    padding: var(--space-2x) var(--space-2x);
    display: grid;
    grid-template-columns: max-content auto max-content;
  }

  button:focus,
  button:hover {
    background-color: var(--cool-gray-100);
  }

  .list-item__body {
    padding-left: var(--space-2x);
    padding-right: var(--space-2x);
  }

  :global(.list-item__left > *) {
    padding-left: var(--space-2x);
    padding-right: var(--space-2x);
  }

  :global(.list-item__right > *) {
    padding-left: var(--space-2x);
    padding-right: var(--space-2x);
  }

  .list-item--centered {
    display: grid;
    align-items: center;
    grid-auto-flow: column;
  }

  .list-item__body__primary-text {
    font-size: var(--text-03);
    color: var(--cool-gray-750);
  }

  .list-item__body__secondary-text {
    font-size: var(--text-02);
    color: var(--cool-gray-550);
  }

  :global(.gp-list-item .list-item__right > *) {
    display: grid;
    align-items: center;
    grid-auto-flow: column;
  }
</style>

<li class="gp-list-item">
  <button on:click>
    <div class="list-item__left list-item--centered">
      <slot name="left" />
    </div>
    <div class="list-item__body list-item--centered">
      <div>
        <div class="list-item__body__primary-text">
          <slot name="primary" />
          <slot />
        </div>
        <div class="list-item__body__secondary-text">
          <slot name="secondary" />
        </div>
      </div>
    </div>
    <div class="list-item__right list-item--centered">
      <slot name="right" />
    </div>
  </button>
</li>
