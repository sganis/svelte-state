<script lang="ts">
    import { push } from 'svelte-spa-router';
    import { items } from "../assets/items";
    let { selected = 0 } = $props();
    
</script>

<div class="flex flex-col gap-2 w-1/2 h-full bg-gray-100 p-2 border rounded-lg">
  <div class="">Left</div>
  <div class="grid grid-cols-1 gap-2 grow overflow-auto">
    {#each items as item}
      <button
        class="bg-gray-200 rounded flex items-center justify-center py-3 hover:bg-gray-300 transition
               data-[active=true]:bg-blue-600 data-[active=true]:text-white"
        data-active={item.id === selected}
        onclick={() => push(`/item/${item.id}`)}
      >
        {item.name}
      </button>
    {/each}
  </div>
</div>
