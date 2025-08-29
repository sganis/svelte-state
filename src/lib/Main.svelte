<script lang="ts">
  import Right from './Right.svelte';
  import Left from './Left.svelte';
  import { push } from 'svelte-spa-router';
  import {
    categories,
    firstCategoryId,
    findCategory,
    firstItemId,
    findItem
  } from '../assets/catalog';

  // svelte-spa-router provides { params }
  let { params } = $props();

  // Selected CATEGORY id from URL, default to first
  const selectedCatId = $derived.by(() => {
    const c = Number(params?.cat ?? 0);
    if (Number.isFinite(c) && findCategory(c)) return c;
    return firstCategoryId();
  });

  const selectedCategory = $derived.by(() => findCategory(selectedCatId));

  // Selected ITEM id from URL, default to first in the category
  const selectedItemId = $derived.by(() => {
    const idNum = Number(params?.id ?? 0);
    if (Number.isFinite(idNum) && findItem(selectedCatId, idNum)) return idNum;
    return firstItemId(selectedCategory);
  });

  const selectedItem = $derived.by(() => findItem(selectedCatId, selectedItemId));

  // Prefill (fast data from Main) for Plot1 – arrives immediately
  const prefill = $derived.by(() =>
    selectedItem
      ? { id: selectedItem.id, title: `${selectedItem.name} (Cat ${selectedCatId})`, hint: 'prefill from Main' }
      : null
  );

  let right: InstanceType<typeof Right> | null = null;

  // route change -> trigger plots
  $effect(() => {
    if (selectedCategory && selectedItem) {
      right?.load(selectedCatId, selectedItemId);
    }
  });

  // --- NEW: dropdown handler ---
  function onSelectCategory(catId: number) {
    const cat = findCategory(catId);
    const first = firstItemId(cat);
    // Navigate so back/forward work and defaults are consistent
    push(`/categories/${catId}/item/${first}`);
  }
</script>


 <div class="flex flex-col w-full h-full gap-2">
    <div class="flex items-center justify-between gap-3">
        <select
            class="px-2 py-1 rounded border bg-white outline-0"
            value={selectedCatId}
            onchange={(e) => onSelectCategory(Number((e.currentTarget as HTMLSelectElement).value))}
            aria-label="Select category"
            title="Select category"
        >
        {#each categories as c}
            <option value={c.id}>{c.name}</option>
        {/each}
        </select>
        <div class="grow"></div>
        <div class="text-2xl font-bold">Category {selectedCatId} / Item {selectedItemId}</div>
    </div>
    <div class="flex h-full w-full bg-gray-300 gap-4 min-h-0">
        <Right bind:this={right} {prefill} {selectedCatId} {selectedItemId}/>
        <Left {categories} {selectedCatId} {selectedItemId} />
    </div>
</div>


