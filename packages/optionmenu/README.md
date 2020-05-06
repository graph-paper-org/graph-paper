# OptionMenu

This package provides a menu that can be used to select one or more options. It
is a more fully-featured alternative to a `<select>` element.

## usage

```
npm install @graph-paper/optionmenu
```

```svelte
<script>
  import { OptionMenu } from "@graph-paper/optionmenu";
  let fontSize;
</script>

<OptionMenu
  title="Font size"
  description="Select font size for body text"
  showTooltip={true}
  options={[
    { key: '16px', label: '16px' },
    { key: '24px', label: '24px' },
    { key: '32px', label: '32px' },
  ]}
  currentOption={{ key: '16px', label: '16px' }}
  on:selection={(evt) => {
    fontSize = evt.detail.option.key;
  }}
/>
```
