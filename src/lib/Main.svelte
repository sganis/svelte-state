<script lang="ts">
    import Right from './Right.svelte';
    import Left from './Left.svelte';

    let { params } = $props();
    const selected = $derived.by(() => {
        const n = Number(params?.id ?? 0);
        return Number.isFinite(n) && n >= 1 && n <= 20 ? n : 0;
    });

    // --- NEW: simple "loaded in Main" quick data (pretend this came from elsewhere) ---
    // Keep it synchronous for testing; you could replace with a real fetch later.
    const quickData = Array.from({ length: 20 }, (_, i) => {
        const id = i + 1;
        return { id, title: `Quick title #${id}`, hint: `prefill from Main for ${id}` };
    });

    // prefill for the currently selected item (or null)
    const prefill = $derived.by(() => quickData.find(q => q.id === selected) ?? null);
    // -------------------------------------------------------------------------------


    let right: InstanceType<typeof Right> | null = null;

    // Minimal, single effect: when route param changes, (re)load both plots
    $effect(() => {
        if (selected) 
            right?.load(selected);
    });

</script>

<div class="flex h-full w-full bg-gray-300 p-4 gap-4">
  <Right bind:this={right} {prefill}/>
  <Left {selected}  />
</div>
