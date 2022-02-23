<script>
  // eslint-disable-next-line import/no-extraneous-dependencies
  import { getContext } from "svelte";
  import { window1D } from "../core/utils/window-functions";

  export let datasets;
  export let value;

  const x = getContext("xScale");

  const get = (d, v, key, dom) => {
    const w = window1D({
      value: v,
      data: d,
      key,
      lowestValue: dom[0],
      highestValue: dom[1],
    });
    if (w.current) return w.current;
    return 0;
  };
  //  !== undefined ? value : defaultValue(d.data)[d.x] || $x.domain()[1]
  $: datapoint = datasets.map((d) => ({
    match: get(d.data, value, d.x, $x.domain()),
    ...d,
  }));

  $: output = (
    value
      ? datapoint
      : datasets.map((di) => ({ ...di, match: di.data.slice(-1)[0] }))
  ) // default value
    .map((o) => ({
      ...o,
      x: o.match[o.x],
      y: o.match[o.y],
    }));
</script>

<slot {output} />
