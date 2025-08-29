<script lang="ts">
  import { findItem } from "../assets/catalog";
  import Skeleton from "./Skeleton.svelte";

  // Prefill coming from Main (arrives instantly)
  let { prefill = null as null | { id: number; title: string; hint: string } } = $props();

  let loading = $state(false);
  let currentCat: number | null = $state(null);
  let currentItem: number | null = $state(null);
  let data: any | null = $state(null);
  let ticket = 0;

  const sleep = (ms: number) => new Promise(r => setTimeout(r, ms));

  // Single-flight simulated load based on (catId, itemId)
  export async function load(catId: number, itemId: number) {
    const my = ++ticket;
    loading = true;
    currentCat = catId;
    currentItem = itemId;
    data = null;                  // keep skeleton behavior

    await sleep(800);             // simulate API latency

    if (my !== ticket) return;

    data = findItem(catId, itemId);
    loading = false;
  }

  export function reload() {
    if (currentCat != null && currentItem != null) void load(currentCat, currentItem);
  }
</script>

<div class="flex flex-col gap-2 w-1/2 h-full bg-gray-100 p-2 border rounded-lg">
  <div>Plot A</div>

  {#if loading}
    {#if prefill && currentItem === prefill.id}
      <div class="text-sm text-gray-500">
        {prefill.title} · <span class="italic">{prefill.hint}</span>
      </div>
    {/if}
    <Skeleton />
  {:else if data}
    <div class="flex flex-col h-full rounded border bg-white p-4">
      <div class="text-sm text-gray-500 mb-2">
        Loaded for Cat <b>{currentCat}</b> · Item <b>{currentItem}</b>
      </div>

      <div class="text-lg">{data.name}</div>
      {#if prefill && prefill.id === data.id}
        <div class="text-xs text-gray-500 mb-2">{prefill.title}</div>
      {/if}

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
