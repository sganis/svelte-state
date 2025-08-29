<script lang="ts">
    import Right from './Right.svelte';
    import Left from './Left.svelte';

    let { params } = $props();
    const selected = $derived.by(() => {
        const n = Number(params?.id ?? 0);
        return Number.isFinite(n) && n >= 1 && n <= 20 ? n : 0;
    });

    let right: InstanceType<typeof Right> | null = null;

    // Minimal, single effect: when route param changes, (re)load both plots
    $effect(() => {
        if (selected) 
            right?.load(selected);
    });

</script>

<div class="flex h-full w-full bg-gray-300 p-4 gap-4">
  <Right bind:this={right} />
  <Left {selected}  />
</div>
