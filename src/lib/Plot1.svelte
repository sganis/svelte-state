<script lang="ts">
  import { items } from "../assets/items.js";
  import Skeleton from "./Skeleton.svelte";

  // --- NEW: prefill coming from Main (arrives instantly) ---
  // Example shape: { id, title, hint }
  let { prefill = null as null | { id: number; title: string; hint: string } } = $props();
  // ---------------------------------------------------------


  let loading = $state(false);
  let current: number | null = $state(null);
  let data: any | null = $state(null);
  let ticket = 0;

  const sleep = (ms: number) => new Promise(r => setTimeout(r, ms));

  export async function load(id: number) {
    const my = ++ticket;
    loading = true; 
    current = id; 
    data = null;
    await sleep(800);
    if (my !== ticket) 
      return;
    data = items.find(x => x.id === id);
    loading = false;
  }

  export function reload() {
    if (current != null) 
      void load(current);
  }
</script>

<div class="flex flex-col gap-2 w-1/2 h-full bg-gray-100 p-2 border rounded-lg">
  <div>Plot A</div>
  {#if loading}
    <!-- NEW: show quick info from Main while loading (only if it matches current id) -->
    {#if prefill && current === prefill.id}
      <div class="text-sm text-gray-500">
        {prefill.title} · <span class="italic">{prefill.hint}</span>
      </div>
    {/if}
    <Skeleton />
  {:else if data}
    <div class="flex flex-col h-full rounded border bg-white p-4">
      <div class="text-sm text-gray-500 mb-2">Loaded for item <b>{current}</b></div>
      <!-- Prefer loaded name; optionally show prefill title as a subtitle if present -->
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
      Click an item on the Left to load.
    </div>
  {/if}
</div>
