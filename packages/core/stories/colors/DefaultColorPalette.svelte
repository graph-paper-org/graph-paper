<script>
const families = [
  { color: 'blue-slate', role: 'primary', d: 'toolbar / sidebar' },
  { color: 'digital-blue', role: 'secondary', d: 'accessible buttons / links' },
  { color: 'pantone-red', role: 'error', d: 'dialogs, button states' },
  { color: 'bright-yellow', role: 'warning / alert', d: 'warning messages, etc.' },
  { color: 'cool-gray', role: 'UX Grays', d: 'bodies, lines, text' },
  { color: 'pond-green', role: 'success', d: 'success buttons, etc.' },
];

const tintsAndShades = (color) => {
  const vals = [
    100, 150, 200, 250, 300, 350, 400, 450, 500, 550, 600, 650, 700, 750, 800, 850, 900,
  ];
  return vals.map((v) => ({
    c: `${color}-${v}`,
    v,
  }));
};

</script>

<style>

.description {
    padding-left: var(--space-base);
    padding-right: var(--space-base);
    font-style: italic;
    font-weight: normal;
    width: calc(var(--increment) * 3);
    height: var(--increment);
    font-size: .875rem;
    color: var(--cool-gray-600);
}

.color.role {
    font-weight: 900;
    text-transform:uppercase;
    color: var(--cool-gray-800);
}

.swatches {
    display:flex;
    flex-wrap: row-wrap;
    font-size:.85rem;
    margin-bottom: var(--space-8x);
}

.color {
    height: var(--increment);
    width: calc(var(--increment) * 3);
    display: grid;
    align-content: center;
    padding-left: var(--space-base);
    padding-right: var(--space-base);
    font-weight: 100;
}

.dark {
    color: white;
}

</style>

<div class=story>
    <h1 class="story__title">Default Color Palette</h1>
    <div class=swatches>
        {#each families as {color, role, d}, i}
            <div>
                <div class="color role">{role}</div>
                <div class='description'>{d}</div>
                {#each tintsAndShades(color) as {c, v}, j}
                    <div>
                        <div style="
                            background-color: var(--{c});
                            display:grid;
                            grid-template-columns: var(--space-4x) max-content ;
                            align-items: baseline;
                            grid-column-gap: var(--space-2x);
                        " class="color
                        {c.includes('light') ? '' : 'dark'}">
                        <div style="
                            background-color: var(--{color}-100);
                            width:max-content;
                            padding: var(--space-1h);
                            color:var(--{color}-700);
                            border-radius: var(--space-1h);
                            font-size:12px;
                            font-weight:900;">{v}</div>

                            {#if v === 100}
                                <div style="
                                    color: var(--{color}-900)">{color}</div>
                            {/if}
                            {#if v === 900}
                            <div style="
                            color: var(--{color}-100)">{color}</div>
                            {/if}
                        </div>
                    </div>
                {/each}
            </div>
        {/each}
    </div>

    <h1 class=story__title>Color Shorthands</h1>
    <div class=swatches>
            <div>
                <div class='color role'>UX Gray Shorts</div>
                <div class='description'>based on UX grays above</div>
                <div style="background-color: var(--bg-gray-01); color: var(--body-gray-01);"
                class="color">bg-gray-01</div>
                <div style="background-color: var(--line-gray-01);  color: var(--body-gray-01);"
                class="color">line-gray-01</div>
                <div style="background-color: var(--bg-gray-02);  color: var(--body-gray-02);" class="color">bg-gray-02</div>
                <div style="background-color: var(--line-gray-02);  color: var(--body-gray-02);"
                class="color">line-gray-02</div>
                <div style="background-color: var(--subhead-gray-01);  color: var(--bg-gray-01);"
                class="color dark">subhead-gray-01</div>
                <div style="background-color: var(--subhead-gray-02); color: var(--bg-gray-01);"
                class="color dark">subhead-gray-02</div>
                <div style="background-color: var(--body-gray-01); color: var(--line-gray-01);" class="color
                dark">body-gray-01</div>
                <div style="background-color: var(--body-gray-02); color: var(--line-gray-01);" class="color dark">body-gray-02</div>
            </div>
    </div>
</div>
