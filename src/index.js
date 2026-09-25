import "./styles.css";

import DropZone from "./components/DropZone";
import FileList from "./components/FileList";
import ConversionQueue from "./services/conversionQueue";
import Download from "./services/download";
import { getFiles, clearFiles } from "./state/files";

const app = document.querySelector("#app");

const heading = document.createElement("h3");
const dropZone = DropZone.render(updateUI);
const fileList = FileList.render(updateUI);
const container = document.createElement("div");
const convertButton = document.createElement("button");
const downloadButton = document.createElement("button");
const startNewButton = document.createElement("button");

startNewButton.type = "button";
startNewButton.textContent = "Start New";
startNewButton.disabled = true;
startNewButton.id = "start-new-button";

container.append(convertButton, downloadButton, startNewButton);
container.classList.add("container")

heading.textContent = "HEIC/HEIF Image Converter";

convertButton.type = "button";
convertButton.textContent = "Convert All";

convertButton.addEventListener("click", async () => {
    await ConversionQueue.start(updateUI);
});

downloadButton.type = "button";
downloadButton.textContent = "Download";
downloadButton.disabled = true;

downloadButton.addEventListener("click", async () => {
    await Download.download(getFiles());
});

startNewButton.addEventListener("click", () => {
    clearFiles();

    updateUI();
})

app.append(heading, dropZone, fileList, container);

function updateUI() {
    FileList.update();

    const files = getFiles();

    const allFilesComplete =
        files.length > 0 &&
        files.every(file => file.status === "complete");

    downloadButton.disabled = !allFilesComplete;
    startNewButton.disabled = files.length === 0;
}
