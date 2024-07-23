<script>
    import Modal from "./Modal.svelte";

    let jobs = [];
    let clientID = "EaWFXup2bfhWIrCALMOmgqFLqs7Y9Qq6FPYmG7F3PP0o13wg";
    let clientSecret = "0zb6od47E9ZPAGe5AWqCPecKCDVkb6SzFB1NisxV0WwlPAGgmwphkaLIJfGFYZVU";
    let token = "";
    let showModal = false;
    let isAuthenticated = false;

    async function startNewJob() {
        if (validateFiles()) {
            console.log("Working OKAY");

            const fileInput = document.getElementById("fileUpload");
            const name = document.getElementById("taskName").value;

            const formData = new FormData();

            // Assuming fileInput is an <input type="file" multiple> element
            for (const file of fileInput.files) {
                formData.append('taskFiles', file);
            }

            formData.append('taskName', name);

            try {
                const response = await fetch('http://127.0.0.1:3000/task', {
                    method: 'POST',
                    body: formData,
                    headers: {
                        'Authorization': `Bearer ${token}`
                    },
                });

                if (!response.ok) {
                    throw new Error('Network response was not ok ' + response.statusText);
                }

                const data = await response.json();

                console.log(data)

                var newJob = {
                    jobId: data.jobId,
                    queueId: data.queueId,
                    taskName: name,
                    status: "QUEUED"
                }

                jobs = [...jobs, newJob]

                const intervalId = setInterval(() => {
                    // Call the function and pass the handle (intervalId) to it
                    checkStatus(data.jobId, data.queueId, intervalId);
                }, 5000);

            } catch (error) {
                alert('There has been a problem with your fetch operation:', error)
                console.error('There has been a problem with your fetch operation:', error);
            }
        }

        async function checkStatus(jobId, queueId, intervalId) {
            const response = await fetch("http://127.0.0.1:3000/status", {
                method: "POST",
                body: JSON.stringify({ jobId, queueId }),
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": `Bearer ${token}`,
                },
            });

            if(!response.ok) {
                alert("Check Status Failed")
                // console.log(response.error())
                clearInterval(intervalId);
            }
            
            else {
                const data = await response.json()
                jobs = jobs.map(job => job.jobId === jobId ? { ...job, status: data.status} : job);

                if (data.status === 'SUCCEEDED' || data.status === 'FAILED' || data.status === 'CANCELED') {
                    clearInterval(intervalId);
                }
            }
        }

    }

    function validateFiles(event) {
        const name = document.getElementById("taskName").value;
        if (name === null || name.length === 0) {
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

    async function authenticateUser() {
        if (clientID === "" || clientSecret === "") {
            alert("Client ID and Secret is required");
            return;
        }

        const response = await fetch("http://127.0.0.1:3000/login", {
            method: "POST",
            body: JSON.stringify({ clientID, clientSecret }),
            headers: {
                "Content-Type": "application/json",
            },
        });

        if(!response.ok) {
            console.log(response.error())
        } else {
            const data = await response.json()
            // console.log(data)
            isAuthenticated = true;
            token = data.token;
        }
    }
</script>

<div class="flex-1 flex-col bg-gray-200 m-6 rounded-md p-8">
    <h1 class="pt-4 pb-4 font-medium">Client Details</h1>
    <div class="flex row justify-between align-center">
        <div class="flex row gap-2 items-center">
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

            {#if isAuthenticated}
                <div
                    class="text-green-800 text-bold border-2 rounded-md border-green-800 h-full flex flex-row items-center justify-center pl-4 pr-4"
                >
                    Authenticated
                </div>
            {:else}
                <button
                    class="pt-2 pb-2 pl-4 pr-4 bg-green-800 text-white"
                    on:click={authenticateUser}>Authenticate</button
                >
            {/if}
        </div>
        <div class="flex row spacing-1">
            {#if isAuthenticated}
                <button
                    class="pt-2 pb-2 pl-4 pr-4 bg-green-800 text-white"
                    on:click={() => (showModal = true)}>Add Task</button
                >
            {/if}
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
                    <td class="lp-2 rp-2 tp-1 bp-1">{job.taskName}</td>
                    <td class="lp-2 rp-2 tp-1 bp-1">{job.jobId}</td>
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
        <button
            on:click={() => {
                showModal = false;
            }}
            class="w-[30px] h-[30px] text-red-500">x</button
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
