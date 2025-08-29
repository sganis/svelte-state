<script lang="ts">
  import { push } from 'svelte-spa-router';

  let { categories = [], selectedCatId = 0, selectedItemId = 0 } = $props();

  let scrollbox: HTMLDivElement | null = $state(null);

  function gotoItem(catId: number, itemId: number) {
    push(`/categories/${catId}/item/${itemId}`);
  }

  // --- NEW: action to scroll the selected item into the scrollbox ---
  function scrollSelected(
    node: HTMLElement,
    params: { selected: boolean; container: HTMLElement | null }
  ) {
    let { selected, container } = params;

    const run = () => {
      if (!selected || !container) return;

      // Only scroll if outside the visible area of the container
      const item = node.getBoundingClientRect();
      const box  = container.getBoundingClientRect();

      if (item.top < box.top || item.bottom > box.bottom) {
        node.scrollIntoView({ block: 'nearest', inline: 'nearest' });
      }
    };

    // Defer to after layout
    queueMicrotask(run);

    return {
      update(next: typeof params) {
        selected = next.selected;
        container = next.container;
        queueMicrotask(run);
      }
    };
  }
  // -----------------------------------------------------------------
</script>

<div class="flex flex-col h-full gap-2 w-1/2 bg-gray-100 p-4 border rounded-lg">
  <div class="flex items-center justify-between">
    <div>Category {selectedCatId} Items</div>
    <div class="text-xs text-gray-500">{categories.length} categories</div>
  </div>
  <div bind:this={scrollbox}
    class="flex overflow-hidden flex-col h-full gap-2 p-1 border 
    rounded bg-white scroll-smooth">
  <!-- scrollable list: fill remaining space, allow overflow -->
  <div class="flex-1 min-h-0 overflow-y-auto">
    {#if categories.length}
      {#each categories as c}
        {#if c.id === selectedCatId}
          <div class="flex flex-col gap-2 p-2 min-h-0">
            {#each c.items as item}
              <button
                class="bg-gray-200 rounded flex items-center justify-center py-3 hover:bg-gray-300 transition flex-shrink-0
                       data-[active=true]:bg-blue-600 data-[active=true]:text-white"
                data-active={item.id === selectedItemId}
                onclick={() => gotoItem(c.id, item.id)}
                title={item.name}
                use:scrollSelected={{ selected: item.id === selectedItemId, container: scrollbox }}
              >
                {item.name}
              </button>
            {/each}
          </div>
        {/if}
      {/each}
    {/if}
  </div>
  </div>
</div>