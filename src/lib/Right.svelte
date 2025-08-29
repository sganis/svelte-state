<script lang="ts">
  import Plot1 from "./Plot1.svelte";
  import Plot2 from "./Plot2.svelte";

  let p1: InstanceType<typeof Plot1> | null = null;
  let p2: InstanceType<typeof Plot2> | null = null;

  // Prefill from Main for Plot1
  let { prefill = null as null | { id: number; title: string; hint: string },
        selectedCatId = 0, selectedItemId = 0 
  } = $props();
  
  // NOTE: load now accepts (categoryId, itemId)
  export function load(catId: number, itemId: number) {
    p1?.load(catId, itemId);
    p2?.load(catId, itemId);
  }

  function reload() {
    p1?.reload();
    p2?.reload();
  }
</script>

<div class="flex flex-col gap-2 w-1/2 h-full bg-gray-100 p-2 border rounded-lg">
  <div class="flex items-center justify-between">
    <div>Cagerogy {selectedCatId} / Item {selectedItemId}</div>
    <button
      class="px-3 py-1 text-sm border rounded hover:bg-gray-50"
      onclick={reload}
      title="Reload current item in both plots"
    >
      Reload
    </button>
  </div>

  <div class="flex gap-2 grow">
    <Plot1 bind:this={p1} {prefill} />
    <Plot2 bind:this={p2} />
  </div>
</div>
