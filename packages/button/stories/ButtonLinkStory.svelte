<script>
import { Stack } from '../../stack';
import { Button, ButtonGroup } from '..';

export let level = 'high';
export let compact = false;
</script>

<Stack>
  <Button {level} {compact}>One is a Button</Button>
  <Button {level} {compact} href="https://github.com/graph-paper-org/graph-paper/">The other, a link</Button>

  <ButtonGroup {level} {compact}>
    <Button target="_blank" href="https://github.com/graph-paper-org/graph-paper/">Link 1</Button>
    <Button href="https://github.com/graph-paper-org/graph-paper/">Link 2</Button>
  </ButtonGroup>
</Stack>
