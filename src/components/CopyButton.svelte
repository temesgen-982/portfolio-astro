<script>
  export let text = "";
  let copied = false;

  async function copyToClipboard() {
    await navigator.clipboard.writeText(text);
    copied = true;
    setTimeout(() => (copied = false), 2000);
  }
</script>

<button
  on:click={copyToClipboard}
  class="text-sm px-2 py-0 rounded border dark:border-linen-white/70 dark:hover:border-brand-teal transition"
>
  {#if copied}
    Copied!
  {:else}
    Copy
  {/if}
</button>
