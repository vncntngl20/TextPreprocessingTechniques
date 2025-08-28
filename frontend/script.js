document.getElementById("uploadForm").addEventListener("submit", async function(e) {
    e.preventDefault();

    let fileInput = document.getElementById("fileInput");
    if (!fileInput.files.length) {
        alert("Please select a file first!");
        return;
    }

    let formData = new FormData();
    formData.append("file", fileInput.files[0]);

    // Send file to backend
    let response = await fetch("http://localhost:5000/upload", {
        method: "POST",
        body: formData
    });

    if (response.ok) {
        let data = await response.json();

        // Show cleaned text preview
        document.getElementById("preview").innerText = data.cleaned_text;

        // Enable download
        let downloadLink = document.getElementById("downloadLink");
        downloadLink.href = "data:text/plain;charset=utf-8," + encodeURIComponent(data.cleaned_text);
        downloadLink.download = "cleaned_text.txt";
        downloadLink.style.display = "block";
        downloadLink.innerText = "Download Cleaned File";
    } else {
        alert("Error cleaning file!");
    }
});
 