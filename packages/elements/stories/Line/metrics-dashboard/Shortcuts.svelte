<script>
  import { Calendar } from "../../../../icons";
</script>

<style>
  div {
    padding-top: var(--space-2x);
  }

  .shortcuts {
    display: grid;
    grid-template-columns: max-content max-content;
    grid-column-gap: var(--space-2x);
    font-size: var(--text-02);
    padding: 0px;
    margin: 0px;
  }

  h4 {
    padding: 0px;
    margin: 0px;
    padding-bottom: var(--space-base);
    color: var(--cool-gray-650);
    font-weight: normal;
    text-transform: uppercase;
  }

  span {
    color: var(--cool-gray-700);
    border: 1px solid var(--cool-gray-700);
    padding: var(--space-1h) var(--space-1x);
    border-radius: var(--space-1h);
    display: inline-grid;
    grid-auto-flow: column;
    align-items: center;
    grid-column-gap: var(--space-1h);
  }
</style>

<div>
  <h4>Shortcuts</h4>
  <dl class="shortcuts">
    <dt>click + drag + release</dt>
    <dd>
      set a new
      <span>
        date range
        <Calendar size="1em" />
      </span>
      for all graphs
    </dd>

    <dt>shift + drag</dt>
    <dd>compare whichever point was highlighted on shift to a hover point</dd>
  </dl>
</div>
