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
const conversionSettings = document.createElement("div");
const actionButtons = document.createElement("div");

const convertButton = document.createElement("button");
const downloadButton = document.createElement("button");
const startNewButton = document.createElement("button");

const conversionMode = document.createElement("select");
const modeLabel = document.createElement("label");

modeLabel.textContent = "Conversion speed:";
modeLabel.htmlFor = "conversion-mode";

conversionMode.id = "conversion-mode";

const standardOption = document.createElement("option");
standardOption.value = "3";
standardOption.textContent = "Standard (3 at a time)";

const lowResourceOption = document.createElement("option");
lowResourceOption.value = "1";
lowResourceOption.textContent = "Low resource usage (1 at a time)";

conversionMode.append(standardOption, lowResourceOption);

startNewButton.type = "button";
startNewButton.textContent = "Start New";
startNewButton.disabled = true;
startNewButton.id = "start-new-button";

convertButton.type = "button";
convertButton.textContent = "Convert All";

convertButton.addEventListener("click", async () => {
    const concurrencyLimit = Number(conversionMode.value);

    conversionMode.disabled = true;
    convertButton.disabled = true;

    try {
        await ConversionQueue.start(updateUI, concurrencyLimit);
    } finally {
        conversionMode.disabled = false;
        updateUI();
    }
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
});

conversionSettings.classList.add("conversion-settings");
conversionSettings.append(modeLabel, conversionMode);

actionButtons.classList.add("action-buttons");
actionButtons.append(convertButton, downloadButton, startNewButton);

container.classList.add("container");
container.append(conversionSettings, actionButtons);

heading.textContent = "HEIC/HEIF Image Converter";
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
