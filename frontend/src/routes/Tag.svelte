<script>
    export let filePath;
    export let fileName;

    function openDirectory() {
        openFileDir(filePath);
        return false;
    }

    async function openFileDir(url) {
        if (url === "") {
            alert("Path to file is missing");
            return;
        }

        try {
            const response = await fetch("http://127.0.0.1:3000/dir", {
                method: "POST",
                body: JSON.stringify({ path: url }),
                headers: {
                    "Content-Type": "application/json",
                },
            });

            if(!response.ok) {
                console.log(response)
            } else {
                alert("File directory opened in 'Explorer'")
            }
        } catch(err) {
            console.log(err)
            alert(err)
        }
    }
</script>

<a href="#" on:click={openDirectory} >
    {fileName}
</a>

<style>
    a {
        text-decoration: underline; /* Underline text */
        color: blue; /* Set text color */
    }

    /* Optional: Style for hovered links */
    a:hover {
        color: darkblue; /* Change color on hover */
    }
</style>