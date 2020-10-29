<script>
  import Modal from "../Modal.svelte";
</script>

<Modal>
  <span slot="title">Test</span>
  <div>
    <p>
      This is a plain modal with no header. You can put
      <strong>any</strong>
      HTML content inside.
    </p>
    <p>
      Click the close button or
      <code>ESC</code>
      to close it.
    </p>
  </div>
</Modal>
