<script lang="ts">
  import { findItem } from "../assets/catalog";
  import Skeleton from "./Skeleton.svelte";

  let loading = $state(false);
  let currentCat: number | null = $state(null);
  let currentItem: number | null = $state(null);
  let data: any | null = $state(null);
  let ticket = 0;

  const sleep = (ms: number) => new Promise(r => setTimeout(r, ms));

  // Same API as Plot1, different delay to show stagger
  export async function load(catId: number, itemId: number) {
    const my = ++ticket;
    loading = true;
    currentCat = catId;
    currentItem = itemId;
    data = null;

    await sleep(1200);

    if (my !== ticket) return;

    data = findItem(catId, itemId);
    loading = false;
  }

  export function reload() {
    if (currentCat != null && currentItem != null) void load(currentCat, currentItem);
  }
</script>

<div class="flex flex-col gap-2 w-1/2 h-full bg-gray-100 p-2 border rounded-lg">
  <div>Plot B</div>

  {#if loading}
    <Skeleton />
  {:else if data}
    <div class="flex flex-col h-full rounded border bg-white p-4">
      <div class="text-sm text-gray-500 mb-2">
        Loaded for Cat <b>{currentCat}</b> · Item <b>{currentItem}</b>
      </div>
      <div class="text-lg">{data.name}</div>
      <div class="rounded flex h-full items-center justify-center bg-gray-100">
        <span class="text-gray-400">{data.desc}</span>
      </div>
    </div>
  {:else}
    <div class="flex-1 rounded border bg-white p-4 text-gray-500">
      Pick an item to load.
    </div>
  {/if}
</div>
