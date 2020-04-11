<script>
import { Stack } from '../../stack';
import { ButtonGroup, Button } from '..';


export let level = 'high';
export let compact = false;

let which = 0;

function set(v) { return () => { which = v; }; }

</script>

<Stack>
    <ButtonGroup {level} {compact}>
        <Button>First</Button>
        <Button>Second</Button>
        <Button>Third</Button>
    </ButtonGroup>

    <ButtonGroup {level} {compact}>
        <Button on:click={set(0)} toggled={which === 0}>These</Button>
        <Button on:click={set(1)} toggled={which === 1}>Buttons</Button>
        <Button on:click={set(2)} toggled={which === 2}>Toggle</Button>
    </ButtonGroup>
</Stack>
