<script>
    import Modal from "./Modal.svelte";
    import Tag from "./Tag.svelte";

    let jobs = [];

    let clientID = "";
    let clientSecret = "";
    let token = "";
    let showModal = false;
    let isAuthenticated = false;
    let anotherStatusRequestPending = false;

    async function startNewJob() {
        if (validateFiles()) {
            const button = document.getElementById('addTaskButton');
            button.disabled = true;
            button.innerHTML = 'Processing... <div class="spinner"></div>';

            const submitBtn = document.getElementById("fileUpload");

            const fileInput = document.getElementById("fileUpload");
            const name = document.getElementById("taskName").value;
            let selectedFiles = []

            const formData = new FormData();
            for (const file of fileInput.files) {
                selectedFiles.push(file.name)
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

                // console.log(data)

                var newJob = {
                    jobId: data.jobId,
                    queueId: data.queueId,
                    taskName: name,
                    files: selectedFiles,
                    status: "QUEUED",
                    outputs: [],
                    logs: []
                }

                jobs = [...jobs, newJob]

                document.getElementById("fileUpload").value = "";
                document.getElementById("taskName").value = "";
                document.getElementById("modalDialog").close();

                const intervalId = setInterval(() => {
                    // Call the function and pass the handle (intervalId) to it
                    checkStatus(data.jobId, data.queueId, intervalId);
                }, 5000);

            } catch (error) {
                console.error('There has been a problem with your fetch operation:', error);
                alert('There has been a problem with your fetch operation:', error)
            }

            button.disabled = false;
            button.innerHTML = 'Add Task';
        }

        async function checkStatus(jobId, queueId, intervalId) {
            if(!anotherStatusRequestPending) {
                anotherStatusRequestPending = true;
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
                    clearInterval(intervalId);
                }
                
                else {
                    const data = await response.json()
                    jobs = jobs.map(job => job.jobId === jobId ? { ...job, status: data.status, logs: data.logs, outputs: data.outputs} : job);

                    if (data.status === 'SUCCEEDED' || data.status === 'FAILED' || data.status === 'CANCELED') {
                        clearInterval(intervalId);
                    }
                }

                anotherStatusRequestPending = false;
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

        try {
            const response = await fetch("http://127.0.0.1:3000/login", {
                method: "POST",
                body: JSON.stringify({ clientID, clientSecret }),
                headers: {
                    "Content-Type": "application/json",
                },
            });

            if(!response?.ok) {
                console.log(response.error())
            } else {
                const data = await response.json()
                // console.log(data)
                isAuthenticated = true;
                token = data.token;
            }
        } catch(err) {
            console.log(err)
        }
    }

    let selectedFiles = [];

    // Function to handle the change event
    function handleFileChange(event) {
        // Get the selected files from the input element
        const files = event.target.files;
        // Convert the FileList to an array and update the selectedFiles variable
        selectedFiles = Array.from(files);

        console.log(selectedFiles)
    }
</script>

<div class="flex flex-1 flex-col bg-gray-200 m-6 rounded-md p-8">
    <h1 class="pt-4 pb-4 font-medium">Client Details</h1>
    <div class="flex row grow-0 justify-between align-center">
        <div class="flex row gap-2 items-center">
            <input
                bind:value={clientID}
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
                    class="button pt-2 pb-2 pl-4 pr-4 bg-green-800 text-white"
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
    <div class="h-[1px] w-full bg-gray-400 mt-4 mb-4 grow-0" />
    <div class="flex flex-col flex-grow grow overflow-auto">
        <h1 class="pt-4 pb-2 font-medium">Tasks</h1>

        <div id="table" class="flex-grow flex flex-col bg-gray-300">
            <table class="w-full table-auto">
                <thead class="h-[40px] bg-gray-400 border-gray-200 pt-4 pb-4">
                    <th class="pl-2 pr-2 pt-1 pb-1">Job ID</th>
                    <th class="pl-2 pr-2 pt-1 pb-1">Job Name</th>
                    <th class="pl-2 pr-2 pt-1 pb-1">Files</th>
                    <th class="pl-2 pr-2 pt-1 pb-1">Status</th>
                    <th class="pl-2 pr-2 pt-1 pb-1">Results</th>
                </thead>
    
                {#each jobs as job}
                    <tbody class="h-[30px]">
                        <tr>
                            <td class="pl-2 pr-2 pt-1 pb-1">
                                {job.jobId}
                            </td>
                            <td class="pl-2 pr-2 pt-1 pb-1">
                                {job.taskName}
                            </td>
                            <td class="pl-2 pr-2 pt-1 pb-1">
                                {job.files}
                            </td>
                            <td class="pl-2 pr-2 pt-1 pb-1">
                                {job.status}
                            </td>
                            <td class="pl-2 pr-2 pt-1 pb-1">
                                {#if job.status !== 'SUCCEEDED' && job.status !== 'FAILED' && job.status !== 'CANCELED' }
                                    <h1>--</h1>
                                {:else if job.logs.length === 0 && job.outputs.length === 0}
                                    <h1>[]</h1>
                                {:else}
                                    {#each job.outputs as item}
                                        <Tag 
                                            filePath={item}
                                            fileName={item.replaceAll("\\", "/").split("/").pop()}
                                        />
                                    {/each}

                                    {#each job.logs as item}
                                        <Tag 
                                            filePath={item}
                                            fileName={item.replaceAll("\\", "/").split("/").pop()}
                                        />
                                    {/each}

                                {/if}
                            </td>
                        </tr>
                    </tbody>
                {/each}
            </table>
        </div>
    </div>
</div>

<Modal bind:showModal class="w-1/2">
    <div
        slot="header"
        class="flex flex-row flex-1 justify-between items-center"
    >
        <h2 class="pb-2 pt-2 font-medium">New Task</h2>
        <button
            on:click={() => {
                showModal = false;
            }}
            class="h-[30px] text-red-500">close</button
        >
    </div>

    <div class="flex flex-col pt-4 pb-4">
        <label for="taskName" class="mb-2"
            >Job Name</label
        >
        <input
            placeholder="Task Name"
            id="taskName"
            class="pt-2 pb-2 pl-4 pr-4 rounded-sm"
        />
        <label for="fileUpload" class="mt-3 mb-2"
            ></label>

        <div class="flex items-center justify-center w-full">
            <label for="fileUpload" class="flex flex-col items-center justify-center w-full h-64 border-2 border-gray-300 border-dashed rounded-lg cursor-pointer bg-gray-50 hover:bg-gray-100">
                <div class="flex flex-col items-center justify-center pt-5 pb-6">
                    <svg class="w-8 h-8 mb-4 text-gray-500 dark:text-gray-400" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 16">
                        <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 13h3a3 3 0 0 0 0-6h-.025A5.56 5.56 0 0 0 16 6.5 5.5 5.5 0 0 0 5.207 5.021C5.137 5.017 5.071 5 5 5a4 4 0 0 0 0 8h2.167M10 15V6m0 0L8 8m2-2 2 2"/>
                    </svg>
                    {#if selectedFiles.length=== 2}
                        <p class="mb-2 text-sm text-gray-500 dark:text-gray-400"><span class="font-semibold">Files selected</span> (click to change)</p>
                        <ul class="p-0">
                            {#each selectedFiles as selFile}
                                <li class="text-xs text-gray-700 dark:text-gray-600">- {selFile.name}</li>                            
                            {/each}
                        </ul>
                    {:else}
                        <p class="mb-2 text-sm text-gray-500 dark:text-gray-400"><span class="font-semibold">Click to upload</span> or drag and drop</p>
                        <p class="text-xs text-gray-500 dark:text-gray-400">Select two files (One .USD and .JSON)</p>
                    {/if}
                </div>
                <input 
                    id="fileUpload" 
                    type="file" 
                    class="hidden" 
                    name="fileUpload"
                    accept=".json, .usd"
                    on:change={handleFileChange}
                    multiple />
            </label>
        </div> 

        <div class="flex flex-row justify-end mt-4">
            <button
                id="addTaskButton"
                on:click={startNewJob}
                class="button pt-2 pb-2 w-full text-white bg-green-800 rounded-md"
                >Add Task</button
            >
        </div>
    </div>
</Modal>

<style>
    tbody tr {
        border-bottom: 1px solid #9e9999;
    }

    thead th {
        text-align: left;
    }

    #table {
        border: 1px solid #9e9999;
    }

    .button {
      padding: 10px 20px;
      background-color: #258e48;
      color: white;
      border: none;
      border-radius: 4px;
      cursor: pointer;
      position: relative;
      display: inline-flex;
      align-items: center;
    }

    .button:disabled {
      background-color: #5a6268;
      cursor: not-allowed;
    }

    .spinner {
      border: 4px solid rgba(255, 255, 255, 0.3);
      border-top: 4px solid white;
      border-radius: 50%;
      width: 20px;
      height: 20px;
      animation: spin 1s linear infinite;
      margin-left: 10px;
    }

    @keyframes spin {
      0% {
        transform: rotate(0deg);
      }
      100% {
        transform: rotate(360deg);
      }
    }
</style>
