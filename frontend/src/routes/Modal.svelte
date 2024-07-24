<script>
	export let showModal; // boolean

	let dialog; // HTMLDialogElement

	$: if(!showModal && dialog) dialog.close();
	$: if (dialog && showModal) dialog.showModal();
</script>

<!-- svelte-ignore a11y-click-events-have-key-events a11y-no-noninteractive-element-interactions -->
<!-- on:click|self={() => dialog.close()} -->
 
<dialog
	bind:this={dialog}
	on:close={() => (showModal = false)}
	class="w-1/2"
	id="modalDialog"
>
	<!-- svelte-ignore a11y-no-static-element-interactions -->
	<div on:click|stopPropagation class="flex flex-col bg-gray-200">
		<slot name="header" />
		<div class="h-[1px] w-full bg-gray-400 mt-1 mb-1" />
		<slot />
		<!-- <div class="h-[1px] w-full bg-gray-400 mt-1 mb-1" />
		<slot name="footer" /> -->
		<!-- svelte-ignore a11y-autofocus -->
		<!-- <button autofocus on:click={() => dialog.close()}>close modal</button> -->
	</div>
</dialog>

<style>
	dialog {
		/* max-width: 32em; */
		border-radius: 0.2em;
		border: none;
		padding: 0;
	}
	dialog::backdrop {
		background: rgba(0, 0, 0, 0.3);
	}
	dialog > div {
		padding: 1em;
	}
	dialog[open] {
		animation: zoom 0.3s cubic-bezier(0.34, 1.56, 0.64, 1);
	}
	@keyframes zoom {
		from {
			transform: scale(0.95);
		}
		to {
			transform: scale(1);
		}
	}
	dialog[open]::backdrop {
		animation: fade 0.2s ease-out;
	}
	@keyframes fade {
		from {
			opacity: 0;
		}
		to {
			opacity: 1;
		}
	}
	button {
		display: block;
	}
</style>
