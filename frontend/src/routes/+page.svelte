<script>
    import prepareJob from "$lib/index.js";
    import Modal from "./Modal.svelte";

    let jobs = [];
    let clientID = "";
    let clientSecret = "";
    let showModal = false;


    async function startNewJob() {
        if (validateFiles()) {
            console.log("Working OKAY");

            const files = document.getElementById("fileUpload").files;
            const name = document.getElementById("taskName").value;

            var ntask = {
                uuid: "",
                name: name,
                files: files,
                status: "INIT"
            }

            jobs = jobs.push(ntask)
            prepareJob(ntask, clientID, clientSecret, (obj) => {
                console.log(JSON.stringify(obj))
            })
        }
    }

    function validateFiles(event) {
        const name = document.getElementById("taskName").value;
        if( name === null || name.length === 0 ) {
            alert("Task job is required");
            event.preventDefault();
            return false;
        }

        const files = document.getElementById("fileUpload").files;
        let hasJson = false;
        let hasUsd = false;

        if (files.length !== 2) {
            alert("Please select exactly two files: one .json and one .usd");
            event.preventDefault();
            return false;
        }

        for (let i = 0; i < files.length; i++) {
            const file = files[i];
            if (file.name.endsWith(".json")) {
                hasJson = true;
            } else if (file.name.endsWith(".usd")) {
                hasUsd = true;
            }
        }

        if (!hasJson || !hasUsd) {
            alert("Please select one .json file and one .usd file.");
            event.preventDefault();
            return false;
        }

        return true;
    }
</script>

<div class="flex-1 flex-col bg-gray-200 m-6 rounded-md p-8">
    <h1 class="pt-4 pb-4 font-medium">Client Details</h1>
    <div class="flex row justify-between align-center">
        <div class="flex row">
            <input
                bind:value={clientID}
                type="password"
                placeholder="Client ID"
                class="pt-2 pb-2 pl-4 pr-4 rounded-sm"
            />

            <input
                bind:value={clientSecret}
                type="password"
                placeholder="Client Secret"
                class="pt-2 pb-2 pl-4 pr-4 rounded-sm ml-2"
            />
        </div>
        <div class="flex row spacing-1">
            <button
                class="pt-2 pb-2 pl-4 pr-4 bg-green-800 text-white"
                on:click={() => (showModal = true)}>Add Task</button
            >
        </div>
    </div>
    <div class="h-[1px] w-full bg-gray-400 mt-4 mb-4" />
    <div class="flex flex-col">
        <h1 class="pb-2 font-medium">Tasks</h1>

        <table class="border-collapse">
            <tr>
                <th>No.</th>
                <th>Task Name</th>
                <th>Files</th>
                <th>Status</th>
                <th>View</th>
            </tr>

            {#each jobs as job}
                <tr>
                    <td class="lp-2 rp-2 tp-1 bp-1">No.</td>
                    <td class="lp-2 rp-2 tp-1 bp-1">{job.name}</td>
                    <td class="lp-2 rp-2 tp-1 bp-1">{job.files}</td>
                    <td class="lp-2 rp-2 tp-1 bp-1">{job.status}</td>
                    <td class="lp-2 rp-2 tp-1 bp-1">View</td>
                </tr>
            {/each}
        </table>
    </div>
</div>

<Modal bind:showModal>
    <div
        slot="header"
        class="flex flex-row flex-1 justify-between items-center"
    >
        <h2 class="pb-2 pt-2 font-medium">New Task</h2>
        <button on:click={() => { showModal = false; }} class="w-[30px] h-[30px] text-red-500"
            >x</button
        >
    </div>

    <div class="flex flex-col pt-4 pb-4">
        <input
            placeholder="Task Name"
            id="taskName"
            class="pt-2 pb-2 pl-4 pr-4 rounded-sm"
        />
        <label for="fileUpload" class="mt-2 mb-2"
            >Upload your files (one .json and one .usd):</label
        >
        <input
            type="file"
            id="fileUpload"
            name="fileUpload"
            accept=".json, .usd"
            multiple
        />

        <div class="flex flex-row justify-end mt-4">
            <button
                on:click={startNewJob}
                class="pt-2 pb-2 w-full text-white bg-green-800 rounded-md"
                >Add Task</button
            >
        </div>
    </div>
</Modal>

<style>
    table,
    th,
    td {
        border: 1px solid;
    }
</style>
