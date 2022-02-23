# OptionMenu

This package provides a menu that can be used to select one or more options. It
is a more fully-featured alternative to a `<select>` element.

## usage

```
npm install @graph-paper/optionmenu
```

```svelte
<script>
  import { OptionMenu, Option, OptionDivider } from "../optionmenu";

  let fontSize = "16px";
  let formatting = [];
</script>

<OptionMenu
  on:selection={({ detail: { key } }) => {
    fontSize = key;
  }}
>
  <Option selected={fontSize === "8px"} key="8px" label="Small" />
  <Option selected={fontSize === "16px"} key="16px" label="Normal" />
  <Option selected={fontSize === "32px"} key="32px" label="Large" />
  <OptionDivider />
  <Option selected={fontSize === "64px"} key="64px" label="Huge" />
</OptionMenu>

<OptionMenu
  multi
  on:selection={({ detail: { keys } }) => {
    formatting = keys;
  }}
>
  <Option selected={formatting.includes("bold")} key="bold" label="Bold">
    <span slot="right">B</span>
  </Option>
  <Option selected={formatting.includes("italic")} key="italic" label="Italic">
    <span slot="right">I</span>
  </Option>
  <Option
    selected={formatting.includes("underline")}
    key="underline"
    label="Underlined"
  >
    <span slot="right">U</span>
  </Option>
</OptionMenu>
```
