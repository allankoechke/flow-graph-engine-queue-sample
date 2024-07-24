import { c as create_ssr_component, d as add_attribute, e as escape, f as each, v as validate_component } from "../../chunks/ssr.js";
const css$2 = {
  code: "dialog.svelte-1dp5n4f.svelte-1dp5n4f{border-radius:0.2em;border:none;padding:0}dialog.svelte-1dp5n4f.svelte-1dp5n4f::backdrop{background:rgba(0, 0, 0, 0.3)}dialog.svelte-1dp5n4f>div.svelte-1dp5n4f{padding:1em}dialog[open].svelte-1dp5n4f.svelte-1dp5n4f{animation:svelte-1dp5n4f-zoom 0.3s cubic-bezier(0.34, 1.56, 0.64, 1)}@keyframes svelte-1dp5n4f-zoom{from{transform:scale(0.95)}to{transform:scale(1)}}dialog[open].svelte-1dp5n4f.svelte-1dp5n4f::backdrop{animation:svelte-1dp5n4f-fade 0.2s ease-out}@keyframes svelte-1dp5n4f-fade{from{opacity:0}to{opacity:1}}",
  map: '{"version":3,"file":"Modal.svelte","sources":["Modal.svelte"],"sourcesContent":["<script>\\r\\n\\texport let showModal; // boolean\\r\\n\\r\\n\\tlet dialog; // HTMLDialogElement\\r\\n\\r\\n\\t$: if(!showModal && dialog) dialog.close();\\r\\n\\t$: if (dialog && showModal) dialog.showModal();\\r\\n<\/script>\\r\\n\\r\\n<!-- svelte-ignore a11y-click-events-have-key-events a11y-no-noninteractive-element-interactions -->\\r\\n<!-- on:click|self={() => dialog.close()} -->\\r\\n \\r\\n<dialog\\r\\n\\tbind:this={dialog}\\r\\n\\ton:close={() => (showModal = false)}\\r\\n\\tclass=\\"w-1/2\\"\\r\\n\\tid=\\"modalDialog\\"\\r\\n>\\r\\n\\t<!-- svelte-ignore a11y-no-static-element-interactions -->\\r\\n\\t<div on:click|stopPropagation class=\\"flex flex-col bg-gray-200\\">\\r\\n\\t\\t<slot name=\\"header\\" />\\r\\n\\t\\t<div class=\\"h-[1px] w-full bg-gray-400 mt-1 mb-1\\" />\\r\\n\\t\\t<slot />\\r\\n\\t\\t<!-- <div class=\\"h-[1px] w-full bg-gray-400 mt-1 mb-1\\" />\\r\\n\\t\\t<slot name=\\"footer\\" /> -->\\r\\n\\t\\t<!-- svelte-ignore a11y-autofocus -->\\r\\n\\t\\t<!-- <button autofocus on:click={() => dialog.close()}>close modal</button> -->\\r\\n\\t</div>\\r\\n</dialog>\\r\\n\\r\\n<style>\\r\\n\\tdialog {\\r\\n\\t\\t/* max-width: 32em; */\\r\\n\\t\\tborder-radius: 0.2em;\\r\\n\\t\\tborder: none;\\r\\n\\t\\tpadding: 0;\\r\\n\\t}\\r\\n\\tdialog::backdrop {\\r\\n\\t\\tbackground: rgba(0, 0, 0, 0.3);\\r\\n\\t}\\r\\n\\tdialog > div {\\r\\n\\t\\tpadding: 1em;\\r\\n\\t}\\r\\n\\tdialog[open] {\\r\\n\\t\\tanimation: zoom 0.3s cubic-bezier(0.34, 1.56, 0.64, 1);\\r\\n\\t}\\r\\n\\t@keyframes zoom {\\r\\n\\t\\tfrom {\\r\\n\\t\\t\\ttransform: scale(0.95);\\r\\n\\t\\t}\\r\\n\\t\\tto {\\r\\n\\t\\t\\ttransform: scale(1);\\r\\n\\t\\t}\\r\\n\\t}\\r\\n\\tdialog[open]::backdrop {\\r\\n\\t\\tanimation: fade 0.2s ease-out;\\r\\n\\t}\\r\\n\\t@keyframes fade {\\r\\n\\t\\tfrom {\\r\\n\\t\\t\\topacity: 0;\\r\\n\\t\\t}\\r\\n\\t\\tto {\\r\\n\\t\\t\\topacity: 1;\\r\\n\\t\\t}\\r\\n\\t}\\r\\n\\tbutton {\\r\\n\\t\\tdisplay: block;\\r\\n\\t}\\r\\n</style>\\r\\n"],"names":[],"mappings":"AA+BC,oCAAO,CAEN,aAAa,CAAE,KAAK,CACpB,MAAM,CAAE,IAAI,CACZ,OAAO,CAAE,CACV,CACA,oCAAM,UAAW,CAChB,UAAU,CAAE,KAAK,CAAC,CAAC,CAAC,CAAC,CAAC,CAAC,CAAC,CAAC,CAAC,GAAG,CAC9B,CACA,qBAAM,CAAG,kBAAI,CACZ,OAAO,CAAE,GACV,CACA,MAAM,CAAC,IAAI,+BAAE,CACZ,SAAS,CAAE,mBAAI,CAAC,IAAI,CAAC,aAAa,IAAI,CAAC,CAAC,IAAI,CAAC,CAAC,IAAI,CAAC,CAAC,CAAC,CACtD,CACA,WAAW,mBAAK,CACf,IAAK,CACJ,SAAS,CAAE,MAAM,IAAI,CACtB,CACA,EAAG,CACF,SAAS,CAAE,MAAM,CAAC,CACnB,CACD,CACA,MAAM,CAAC,IAAI,+BAAC,UAAW,CACtB,SAAS,CAAE,mBAAI,CAAC,IAAI,CAAC,QACtB,CACA,WAAW,mBAAK,CACf,IAAK,CACJ,OAAO,CAAE,CACV,CACA,EAAG,CACF,OAAO,CAAE,CACV,CACD"}'
};
const Modal = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let { showModal } = $$props;
  let dialog;
  if ($$props.showModal === void 0 && $$bindings.showModal && showModal !== void 0) $$bindings.showModal(showModal);
  $$result.css.add(css$2);
  {
    if (!showModal && dialog) dialog.close();
  }
  return `  <dialog class="w-1/2 svelte-1dp5n4f" id="modalDialog"${add_attribute("this", dialog, 0)}> <div class="flex flex-col bg-gray-200 svelte-1dp5n4f">${slots.header ? slots.header({}) : ``} <div class="h-[1px] w-full bg-gray-400 mt-1 mb-1"></div> ${slots.default ? slots.default({}) : ``}   </div> </dialog>`;
});
const css$1 = {
  code: "a.svelte-7ap6w5{text-decoration:underline;color:blue}a.svelte-7ap6w5:hover{color:darkblue}",
  map: `{"version":3,"file":"Tag.svelte","sources":["Tag.svelte"],"sourcesContent":["<script>\\r\\n    export let filePath;\\r\\n    export let fileName;\\r\\n\\r\\n    function openDirectory() {\\r\\n        openFileDir(filePath);\\r\\n        return false;\\r\\n    }\\r\\n\\r\\n    async function openFileDir(url) {\\r\\n        if (url === \\"\\") {\\r\\n            alert(\\"Path to file is missing\\");\\r\\n            return;\\r\\n        }\\r\\n\\r\\n        try {\\r\\n            const response = await fetch(\\"http://127.0.0.1:3000/dir\\", {\\r\\n                method: \\"POST\\",\\r\\n                body: JSON.stringify({ path: url }),\\r\\n                headers: {\\r\\n                    \\"Content-Type\\": \\"application/json\\",\\r\\n                },\\r\\n            });\\r\\n\\r\\n            if(!response.ok) {\\r\\n                console.log(response)\\r\\n            } else {\\r\\n                alert(\\"File directory opened in 'Explorer'\\")\\r\\n            }\\r\\n        } catch(err) {\\r\\n            console.log(err)\\r\\n            alert(err)\\r\\n        }\\r\\n    }\\r\\n<\/script>\\r\\n\\r\\n<a href=\\"#\\" on:click={openDirectory} >\\r\\n    {fileName}\\r\\n</a>\\r\\n\\r\\n<style>\\r\\n    a {\\r\\n        text-decoration: underline; /* Underline text */\\r\\n        color: blue; /* Set text color */\\r\\n    }\\r\\n\\r\\n    /* Optional: Style for hovered links */\\r\\n    a:hover {\\r\\n        color: darkblue; /* Change color on hover */\\r\\n    }\\r\\n</style>"],"names":[],"mappings":"AAyCI,eAAE,CACE,eAAe,CAAE,SAAS,CAC1B,KAAK,CAAE,IACX,CAGA,eAAC,MAAO,CACJ,KAAK,CAAE,QACX"}`
};
const Tag = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let { filePath } = $$props;
  let { fileName } = $$props;
  if ($$props.filePath === void 0 && $$bindings.filePath && filePath !== void 0) $$bindings.filePath(filePath);
  if ($$props.fileName === void 0 && $$bindings.fileName && fileName !== void 0) $$bindings.fileName(fileName);
  $$result.css.add(css$1);
  return `<a href="#" class="svelte-7ap6w5">${escape(fileName)} </a>`;
});
const css = {
  code: "tbody.svelte-1sq09sd tr.svelte-1sq09sd{border-bottom:1px solid #9e9999}thead.svelte-1sq09sd th.svelte-1sq09sd{text-align:left}#table.svelte-1sq09sd.svelte-1sq09sd{border:1px solid #9e9999}.button.svelte-1sq09sd.svelte-1sq09sd{padding:10px 20px;background-color:#258e48;color:white;border:none;border-radius:4px;cursor:pointer;position:relative;display:inline-flex;align-items:center}.button.svelte-1sq09sd.svelte-1sq09sd:disabled{background-color:#5a6268;cursor:not-allowed}@keyframes svelte-1sq09sd-spin{0%{transform:rotate(0deg)}100%{transform:rotate(360deg)}}",
  map: `{"version":3,"file":"+page.svelte","sources":["+page.svelte"],"sourcesContent":["<script>\\n    import Modal from \\"./Modal.svelte\\";\\n    import Tag from \\"./Tag.svelte\\";\\n\\n    let jobs = [];\\n\\n    let clientID = \\"\\";\\n    let clientSecret = \\"\\";\\n    let token = \\"\\";\\n    let showModal = false;\\n    let isAuthenticated = false;\\n    let anotherStatusRequestPending = false;\\n\\n    async function startNewJob() {\\n        if (validateFiles()) {\\n            const button = document.getElementById('addTaskButton');\\n            button.disabled = true;\\n            button.innerHTML = 'Processing... <div class=\\"spinner\\"></div>';\\n\\n            const submitBtn = document.getElementById(\\"fileUpload\\");\\n\\n            const fileInput = document.getElementById(\\"fileUpload\\");\\n            const name = document.getElementById(\\"taskName\\").value;\\n            let selectedFiles = []\\n\\n            const formData = new FormData();\\n            for (const file of fileInput.files) {\\n                selectedFiles.push(file.name)\\n                formData.append('taskFiles', file);\\n            }\\n\\n            formData.append('taskName', name);\\n\\n            try {\\n                const response = await fetch('http://127.0.0.1:3000/task', {\\n                    method: 'POST',\\n                    body: formData,\\n                    headers: {\\n                        'Authorization': \`Bearer \${token}\`\\n                    },\\n                });\\n\\n                if (!response.ok) {\\n                    throw new Error('Network response was not ok ' + response.statusText);\\n                }\\n\\n                const data = await response.json();\\n\\n                // console.log(data)\\n\\n                var newJob = {\\n                    jobId: data.jobId,\\n                    queueId: data.queueId,\\n                    taskName: name,\\n                    files: selectedFiles,\\n                    status: \\"QUEUED\\",\\n                    outputs: [],\\n                    logs: []\\n                }\\n\\n                jobs = [...jobs, newJob]\\n\\n                document.getElementById(\\"fileUpload\\").value = \\"\\";\\n                document.getElementById(\\"taskName\\").value = \\"\\";\\n                document.getElementById(\\"modalDialog\\").close();\\n\\n                const intervalId = setInterval(() => {\\n                    // Call the function and pass the handle (intervalId) to it\\n                    checkStatus(data.jobId, data.queueId, intervalId);\\n                }, 5000);\\n\\n            } catch (error) {\\n                console.error('There has been a problem with your fetch operation:', error);\\n                alert('There has been a problem with your fetch operation:', error)\\n            }\\n\\n            button.disabled = false;\\n            button.innerHTML = 'Add Task';\\n        }\\n\\n        async function checkStatus(jobId, queueId, intervalId) {\\n            if(!anotherStatusRequestPending) {\\n                anotherStatusRequestPending = true;\\n                const response = await fetch(\\"http://127.0.0.1:3000/status\\", {\\n                    method: \\"POST\\",\\n                    body: JSON.stringify({ jobId, queueId }),\\n                    headers: {\\n                        \\"Content-Type\\": \\"application/json\\",\\n                        \\"Authorization\\": \`Bearer \${token}\`,\\n                    },\\n                });\\n\\n                if(!response.ok) {\\n\\n                    alert(\\"Check Status Failed\\")\\n                    clearInterval(intervalId);\\n                }\\n                \\n                else {\\n                    const data = await response.json()\\n                    jobs = jobs.map(job => job.jobId === jobId ? { ...job, status: data.status, logs: data.logs, outputs: data.outputs} : job);\\n\\n                    if (data.status === 'SUCCEEDED' || data.status === 'FAILED' || data.status === 'CANCELED') {\\n                        clearInterval(intervalId);\\n                    }\\n                }\\n\\n                anotherStatusRequestPending = false;\\n            }\\n        }\\n\\n    }\\n\\n    function validateFiles(event) {\\n        const name = document.getElementById(\\"taskName\\").value;\\n        if (name === null || name.length === 0) {\\n            alert(\\"Task job is required\\");\\n            event.preventDefault();\\n            return false;\\n        }\\n\\n        const files = document.getElementById(\\"fileUpload\\").files;\\n        let hasJson = false;\\n        let hasUsd = false;\\n\\n        if (files.length !== 2) {\\n            alert(\\"Please select exactly two files: one .json and one .usd\\");\\n            event.preventDefault();\\n            return false;\\n        }\\n\\n        for (let i = 0; i < files.length; i++) {\\n            const file = files[i];\\n            if (file.name.endsWith(\\".json\\")) {\\n                hasJson = true;\\n            } else if (file.name.endsWith(\\".usd\\")) {\\n                hasUsd = true;\\n            }\\n        }\\n\\n        if (!hasJson || !hasUsd) {\\n            alert(\\"Please select one .json file and one .usd file.\\");\\n            event.preventDefault();\\n            return false;\\n        }\\n\\n        return true;\\n    }\\n\\n    async function authenticateUser() {\\n        if (clientID === \\"\\" || clientSecret === \\"\\") {\\n            alert(\\"Client ID and Secret is required\\");\\n            return;\\n        }\\n\\n        try {\\n            console.log(\\"Sending request ...\\")\\n            const response = await fetch(\\"http://127.0.0.1:3000/login\\", {\\n                method: \\"POST\\",\\n                body: JSON.stringify({ clientID, clientSecret }),\\n                headers: {\\n                    \\"Content-Type\\": \\"application/json\\",\\n                },\\n            });\\n\\n            if(!response?.ok) {\\n                console.log(\\"Error: \\", response)\\n            } else {\\n                const data = await response.json()\\n                console.log(data)\\n                isAuthenticated = true;\\n                token = data.token;\\n            }\\n        } catch(err) {\\n            console.log(\\"Error: \\", err)\\n        }\\n    }\\n\\n    let selectedFiles = [];\\n\\n    // Function to handle the change event\\n    function handleFileChange(event) {\\n        // Get the selected files from the input element\\n        const files = event.target.files;\\n        // Convert the FileList to an array and update the selectedFiles variable\\n        selectedFiles = Array.from(files);\\n\\n        console.log(selectedFiles)\\n    }\\n<\/script>\\n\\n<div class=\\"flex flex-1 flex-col bg-gray-200 m-6 rounded-md p-8\\">\\n    <h1 class=\\"pt-4 pb-4 font-medium\\">Client Details</h1>\\n    <div class=\\"flex row grow-0 justify-between align-center\\">\\n        <div class=\\"flex row gap-2 items-center\\">\\n            <input\\n                bind:value={clientID}\\n                placeholder=\\"Client ID\\"\\n                class=\\"pt-2 pb-2 pl-4 pr-4 rounded-sm\\"\\n            />\\n\\n            <input\\n                bind:value={clientSecret}\\n                type=\\"password\\"\\n                placeholder=\\"Client Secret\\"\\n                class=\\"pt-2 pb-2 pl-4 pr-4 rounded-sm ml-2\\"\\n            />\\n\\n            {#if isAuthenticated}\\n                <div\\n                    class=\\"text-green-800 text-bold border-2 rounded-md border-green-800 h-full flex flex-row items-center justify-center pl-4 pr-4\\"\\n                >\\n                    Authenticated\\n                </div>\\n            {:else}\\n                <button\\n                    class=\\"pt-2 pb-2 pl-4 pr-4 bg-green-800 text-white button\\"\\n                    on:click={authenticateUser}>Authenticate</button\\n                >\\n            {/if}\\n        </div>\\n        <div class=\\"flex row spacing-1\\">\\n            {#if isAuthenticated}\\n                <button\\n                    class=\\"pt-2 pb-2 pl-4 pr-4 bg-green-800 text-white\\"\\n                    on:click={() => (showModal = true)}>Add Task</button\\n                >\\n            {/if}\\n        </div>\\n    </div>\\n    <div class=\\"h-[1px] w-full bg-gray-400 mt-4 mb-4 grow-0\\" />\\n    <div class=\\"flex flex-col flex-grow grow overflow-auto\\">\\n        <h1 class=\\"pt-4 pb-2 font-medium\\">Tasks</h1>\\n\\n        <div id=\\"table\\" class=\\"flex-grow flex flex-col bg-gray-300\\">\\n            <table class=\\"w-full table-auto\\">\\n                <thead class=\\"h-[40px] bg-gray-400 border-gray-200 pt-4 pb-4\\">\\n                    <th class=\\"pl-2 pr-2 pt-1 pb-1\\">Job ID</th>\\n                    <th class=\\"pl-2 pr-2 pt-1 pb-1\\">Job Name</th>\\n                    <th class=\\"pl-2 pr-2 pt-1 pb-1\\">Files</th>\\n                    <th class=\\"pl-2 pr-2 pt-1 pb-1\\">Status</th>\\n                    <th class=\\"pl-2 pr-2 pt-1 pb-1\\">Results</th>\\n                </thead>\\n    \\n                {#each jobs as job}\\n                    <tbody class=\\"h-[30px]\\">\\n                        <tr>\\n                            <td class=\\"pl-2 pr-2 pt-1 pb-1\\">\\n                                {job.jobId}\\n                            </td>\\n                            <td class=\\"pl-2 pr-2 pt-1 pb-1\\">\\n                                {job.taskName}\\n                            </td>\\n                            <td class=\\"pl-2 pr-2 pt-1 pb-1\\">\\n                                {job.files}\\n                            </td>\\n                            <td class=\\"pl-2 pr-2 pt-1 pb-1\\">\\n                                {job.status}\\n                            </td>\\n                            <td class=\\"pl-2 pr-2 pt-1 pb-1\\">\\n                                {#if job.status !== 'SUCCEEDED' && job.status !== 'FAILED' && job.status !== 'CANCELED' }\\n                                    <h1>--</h1>\\n                                {:else if job.logs.length === 0 && job.outputs.length === 0}\\n                                    <h1>[]</h1>\\n                                {:else}\\n                                    {#each job.outputs as item}\\n                                        <Tag \\n                                            filePath={item}\\n                                            fileName={item.replaceAll(\\"\\\\\\\\\\", \\"/\\").split(\\"/\\").pop()}\\n                                        />\\n                                    {/each}\\n\\n                                    {#each job.logs as item}\\n                                        <Tag \\n                                            filePath={item}\\n                                            fileName={item.replaceAll(\\"\\\\\\\\\\", \\"/\\").split(\\"/\\").pop()}\\n                                        />\\n                                    {/each}\\n\\n                                {/if}\\n                            </td>\\n                        </tr>\\n                    </tbody>\\n                {/each}\\n            </table>\\n        </div>\\n    </div>\\n</div>\\n\\n<Modal bind:showModal class=\\"w-1/2\\">\\n    <div\\n        slot=\\"header\\"\\n        class=\\"flex flex-row flex-1 justify-between items-center\\"\\n    >\\n        <h2 class=\\"pb-2 pt-2 font-medium\\">New Task</h2>\\n        <button\\n            on:click={() => {\\n                showModal = false;\\n            }}\\n            class=\\"h-[30px] text-red-500\\">close</button\\n        >\\n    </div>\\n\\n    <div class=\\"flex flex-col pt-4 pb-4\\">\\n        <label for=\\"taskName\\" class=\\"mb-2\\"\\n            >Job Name</label\\n        >\\n        <input\\n            placeholder=\\"Task Name\\"\\n            id=\\"taskName\\"\\n            class=\\"pt-2 pb-2 pl-4 pr-4 rounded-sm\\"\\n        />\\n        <label for=\\"fileUpload\\" class=\\"mt-3 mb-2\\"\\n            ></label>\\n\\n        <div class=\\"flex items-center justify-center w-full\\">\\n            <label for=\\"fileUpload\\" class=\\"flex flex-col items-center justify-center w-full h-64 border-2 border-gray-300 border-dashed rounded-lg cursor-pointer bg-gray-50 hover:bg-gray-100\\">\\n                <div class=\\"flex flex-col items-center justify-center pt-5 pb-6\\">\\n                    <svg class=\\"w-8 h-8 mb-4 text-gray-500 dark:text-gray-400\\" aria-hidden=\\"true\\" xmlns=\\"http://www.w3.org/2000/svg\\" fill=\\"none\\" viewBox=\\"0 0 20 16\\">\\n                        <path stroke=\\"currentColor\\" stroke-linecap=\\"round\\" stroke-linejoin=\\"round\\" stroke-width=\\"2\\" d=\\"M13 13h3a3 3 0 0 0 0-6h-.025A5.56 5.56 0 0 0 16 6.5 5.5 5.5 0 0 0 5.207 5.021C5.137 5.017 5.071 5 5 5a4 4 0 0 0 0 8h2.167M10 15V6m0 0L8 8m2-2 2 2\\"/>\\n                    </svg>\\n                    {#if selectedFiles.length=== 2}\\n                        <p class=\\"mb-2 text-sm text-gray-500 dark:text-gray-400\\"><span class=\\"font-semibold\\">Files selected</span> (click to change)</p>\\n                        <ul class=\\"p-0\\">\\n                            {#each selectedFiles as selFile}\\n                                <li class=\\"text-xs text-gray-700 dark:text-gray-600\\">- {selFile.name}</li>                            \\n                            {/each}\\n                        </ul>\\n                    {:else}\\n                        <p class=\\"mb-2 text-sm text-gray-500 dark:text-gray-400\\"><span class=\\"font-semibold\\">Click to upload</span> or drag and drop</p>\\n                        <p class=\\"text-xs text-gray-500 dark:text-gray-400\\">Select two files (One .USD and .JSON)</p>\\n                    {/if}\\n                </div>\\n                <input \\n                    id=\\"fileUpload\\" \\n                    type=\\"file\\" \\n                    class=\\"hidden\\" \\n                    name=\\"fileUpload\\"\\n                    accept=\\".json, .usd\\"\\n                    on:change={handleFileChange}\\n                    multiple />\\n            </label>\\n        </div> \\n\\n        <div class=\\"flex flex-row justify-end mt-4\\">\\n            <button\\n                id=\\"addTaskButton\\"\\n                on:click={startNewJob}\\n                class=\\"button pt-2 pb-2 w-full text-white bg-green-800 rounded-md\\"\\n                >Add Task</button\\n            >\\n        </div>\\n    </div>\\n</Modal>\\n\\n<style>\\n    tbody tr {\\n        border-bottom: 1px solid #9e9999;\\n    }\\n\\n    thead th {\\n        text-align: left;\\n    }\\n\\n    #table {\\n        border: 1px solid #9e9999;\\n    }\\n\\n    .button {\\n      padding: 10px 20px;\\n      background-color: #258e48;\\n      color: white;\\n      border: none;\\n      border-radius: 4px;\\n      cursor: pointer;\\n      position: relative;\\n      display: inline-flex;\\n      align-items: center;\\n    }\\n\\n    .button:disabled {\\n      background-color: #5a6268;\\n      cursor: not-allowed;\\n    }\\n\\n    .spinner {\\n      border: 4px solid rgba(255, 255, 255, 0.3);\\n      border-top: 4px solid white;\\n      border-radius: 50%;\\n      width: 20px;\\n      height: 20px;\\n      animation: spin 1s linear infinite;\\n      margin-left: 10px;\\n    }\\n\\n    @keyframes spin {\\n      0% {\\n        transform: rotate(0deg);\\n      }\\n      100% {\\n        transform: rotate(360deg);\\n      }\\n    }\\n</style>\\n"],"names":[],"mappings":"AAoWI,oBAAK,CAAC,iBAAG,CACL,aAAa,CAAE,GAAG,CAAC,KAAK,CAAC,OAC7B,CAEA,oBAAK,CAAC,iBAAG,CACL,UAAU,CAAE,IAChB,CAEA,oCAAO,CACH,MAAM,CAAE,GAAG,CAAC,KAAK,CAAC,OACtB,CAEA,qCAAQ,CACN,OAAO,CAAE,IAAI,CAAC,IAAI,CAClB,gBAAgB,CAAE,OAAO,CACzB,KAAK,CAAE,KAAK,CACZ,MAAM,CAAE,IAAI,CACZ,aAAa,CAAE,GAAG,CAClB,MAAM,CAAE,OAAO,CACf,QAAQ,CAAE,QAAQ,CAClB,OAAO,CAAE,WAAW,CACpB,WAAW,CAAE,MACf,CAEA,qCAAO,SAAU,CACf,gBAAgB,CAAE,OAAO,CACzB,MAAM,CAAE,WACV,CAYA,WAAW,mBAAK,CACd,EAAG,CACD,SAAS,CAAE,OAAO,IAAI,CACxB,CACA,IAAK,CACH,SAAS,CAAE,OAAO,MAAM,CAC1B,CACF"}`
};
const Page = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let jobs = [];
  let clientID = "";
  let clientSecret = "";
  let showModal = false;
  let selectedFiles = [];
  $$result.css.add(css);
  let $$settled;
  let $$rendered;
  let previous_head = $$result.head;
  do {
    $$settled = true;
    $$result.head = previous_head;
    $$rendered = `<div class="flex flex-1 flex-col bg-gray-200 m-6 rounded-md p-8"><h1 class="pt-4 pb-4 font-medium" data-svelte-h="svelte-14dd60t">Client Details</h1> <div class="flex row grow-0 justify-between align-center"><div class="flex row gap-2 items-center"><input placeholder="Client ID" class="pt-2 pb-2 pl-4 pr-4 rounded-sm"${add_attribute("value", clientID, 0)}> <input type="password" placeholder="Client Secret" class="pt-2 pb-2 pl-4 pr-4 rounded-sm ml-2"${add_attribute("value", clientSecret, 0)}> ${`<button class="pt-2 pb-2 pl-4 pr-4 bg-green-800 text-white button svelte-1sq09sd" data-svelte-h="svelte-16eigo5">Authenticate</button>`}</div> <div class="flex row spacing-1">${``}</div></div> <div class="h-[1px] w-full bg-gray-400 mt-4 mb-4 grow-0"></div> <div class="flex flex-col flex-grow grow overflow-auto"><h1 class="pt-4 pb-2 font-medium" data-svelte-h="svelte-1xjxcoy">Tasks</h1> <div id="table" class="flex-grow flex flex-col bg-gray-300 svelte-1sq09sd"><table class="w-full table-auto"><thead class="h-[40px] bg-gray-400 border-gray-200 pt-4 pb-4 svelte-1sq09sd" data-svelte-h="svelte-1yyogpi"><th class="pl-2 pr-2 pt-1 pb-1 svelte-1sq09sd">Job ID</th> <th class="pl-2 pr-2 pt-1 pb-1 svelte-1sq09sd">Job Name</th> <th class="pl-2 pr-2 pt-1 pb-1 svelte-1sq09sd">Files</th> <th class="pl-2 pr-2 pt-1 pb-1 svelte-1sq09sd">Status</th> <th class="pl-2 pr-2 pt-1 pb-1 svelte-1sq09sd">Results</th></thead> ${each(jobs, (job) => {
      return `<tbody class="h-[30px] svelte-1sq09sd"><tr class="svelte-1sq09sd"><td class="pl-2 pr-2 pt-1 pb-1">${escape(job.jobId)}</td> <td class="pl-2 pr-2 pt-1 pb-1">${escape(job.taskName)}</td> <td class="pl-2 pr-2 pt-1 pb-1">${escape(job.files)}</td> <td class="pl-2 pr-2 pt-1 pb-1">${escape(job.status)}</td> <td class="pl-2 pr-2 pt-1 pb-1">${job.status !== "SUCCEEDED" && job.status !== "FAILED" && job.status !== "CANCELED" ? `<h1 data-svelte-h="svelte-1u9d1aq">--</h1>` : `${job.logs.length === 0 && job.outputs.length === 0 ? `<h1 data-svelte-h="svelte-yfcrok">[]</h1>` : `${each(job.outputs, (item) => {
        return `${validate_component(Tag, "Tag").$$render(
          $$result,
          {
            filePath: item,
            fileName: item.replaceAll("\\", "/").split("/").pop()
          },
          {},
          {}
        )}`;
      })} ${each(job.logs, (item) => {
        return `${validate_component(Tag, "Tag").$$render(
          $$result,
          {
            filePath: item,
            fileName: item.replaceAll("\\", "/").split("/").pop()
          },
          {},
          {}
        )}`;
      })}`}`} </td></tr> </tbody>`;
    })}</table></div></div></div> ${validate_component(Modal, "Modal").$$render(
      $$result,
      { class: "w-1/2", showModal },
      {
        showModal: ($$value) => {
          showModal = $$value;
          $$settled = false;
        }
      },
      {
        header: () => {
          return `<div slot="header" class="flex flex-row flex-1 justify-between items-center"><h2 class="pb-2 pt-2 font-medium" data-svelte-h="svelte-vwifd9">New Task</h2> <button class="h-[30px] text-red-500" data-svelte-h="svelte-1d8eh0b">close</button></div>`;
        },
        default: () => {
          return `<div class="flex flex-col pt-4 pb-4"><label for="taskName" class="mb-2" data-svelte-h="svelte-10hlc1z">Job Name</label> <input placeholder="Task Name" id="taskName" class="pt-2 pb-2 pl-4 pr-4 rounded-sm"> <label for="fileUpload" class="mt-3 mb-2"></label> <div class="flex items-center justify-center w-full"><label for="fileUpload" class="flex flex-col items-center justify-center w-full h-64 border-2 border-gray-300 border-dashed rounded-lg cursor-pointer bg-gray-50 hover:bg-gray-100"><div class="flex flex-col items-center justify-center pt-5 pb-6"><svg class="w-8 h-8 mb-4 text-gray-500 dark:text-gray-400" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 16"><path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 13h3a3 3 0 0 0 0-6h-.025A5.56 5.56 0 0 0 16 6.5 5.5 5.5 0 0 0 5.207 5.021C5.137 5.017 5.071 5 5 5a4 4 0 0 0 0 8h2.167M10 15V6m0 0L8 8m2-2 2 2"></path></svg> ${selectedFiles.length === 2 ? `<p class="mb-2 text-sm text-gray-500 dark:text-gray-400" data-svelte-h="svelte-keofhd"><span class="font-semibold">Files selected</span> (click to change)</p> <ul class="p-0">${each(selectedFiles, (selFile) => {
            return `<li class="text-xs text-gray-700 dark:text-gray-600">- ${escape(selFile.name)}</li>`;
          })}</ul>` : `<p class="mb-2 text-sm text-gray-500 dark:text-gray-400" data-svelte-h="svelte-24npbu"><span class="font-semibold">Click to upload</span> or drag and drop</p> <p class="text-xs text-gray-500 dark:text-gray-400" data-svelte-h="svelte-l8bbx8">Select two files (One .USD and .JSON)</p>`}</div> <input id="fileUpload" type="file" class="hidden" name="fileUpload" accept=".json, .usd" multiple></label></div> <div class="flex flex-row justify-end mt-4"><button id="addTaskButton" class="button pt-2 pb-2 w-full text-white bg-green-800 rounded-md svelte-1sq09sd" data-svelte-h="svelte-1ensx1p">Add Task</button></div></div>`;
        }
      }
    )}`;
  } while (!$$settled);
  return $$rendered;
});
export {
  Page as default
};
