import "./styles.css";

import DropZone from "./components/DropZone";
import FileList from "./components/FileList";
import ConversionQueue from "./services/conversionQueue";
import Download from "./services/download";

const app = document.querySelector("#app");

const heading = document.createElement("h1");
const dropZone = DropZone.render(updateUI);
const fileList = FileList.render();
const convertButton = document.createElement("button");
const downloadButton = document.createElement("button");

heading.textContent = "HEIC Converter";

convertButton.type = "button";
convertButton.textContent = "Convert All";

convertButton.addEventListener("click", async () => {
    await ConversionQueue.start(updateUI);
});

downloadButton.type = "button";
downloadButton.textContent = "Download";
downloadButton.disabled = true;

downloadButton.addEventListener("click", async () => {
    const { getFiles } = await import("./state/files");

    await Download.download(getFiles());
});

app.appendChild(heading);
app.appendChild(dropZone);
app.appendChild(fileList);
app.appendChild(convertButton);
app.appendChild(downloadButton);

function updateUI() {
    FileList.update();
}
