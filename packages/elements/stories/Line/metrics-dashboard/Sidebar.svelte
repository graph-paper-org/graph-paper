<script>
  import { Button } from "../../../../button";
  import { Stack } from "../../../../stack";
  import { Box } from "../../../../box";
</script>

<nav>
  <div>
    <Box padding={2}>
      <h1>SprocketCo</h1>
    </Box>
    <Box pad={2}>
      <Stack space={1}>
        <Button level="low">Explore</Button>
        <Button level="low">Table</Button>
        <!-- {#each plots as { shorthand, title, source, key }, i}
          <Button
            level="low"
            toggled={key === currentPlot.key}
            href={`/${key}`}>
            {shorthand || title}
          </Button>
        {/each} -->
      </Stack>
    </Box>
    <!-- footer -->
    <!-- {#if site.feedback}
      <Box padding={3}>
        <div
          style="padding-top: var(--space-4x); font-size: var(--text-02); color:
          var(--cool-gray-7500);">
          <div
            style="font-size: var(--text-015); text-transform: uppercase;color:
            var(--cool-gray-550); font-weight: bold;">
            feedback
          </div>
          {site.feedback}
        </div>
      </Box>
    {/if} -->

  </div>
</nav>
