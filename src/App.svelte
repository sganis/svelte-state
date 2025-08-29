<script lang="ts">
  import Router from 'svelte-spa-router';
  import Main from './lib/Main.svelte';

  const routes = {
    '/': Main,
    '/item/:id': Main,
  };

</script>

<div class="flex h-screen w-screen bg-gray-300 p-4 gap-4 overflow-hidden">
  <Router {routes} />
</div>
