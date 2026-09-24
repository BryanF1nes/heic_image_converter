import { addFiles } from "../state/files";

const DropZone = {
    render(onFilesAdded) {
        const section = document.createElement("section");
        const input = document.createElement("input");
        const label = document.createElement("label");
        const text = document.createElement("p");

        section.classList.add("drop-zone");

        input.type = "file";
        input.multiple = true;
        input.accept = ".heic,.heif";
        input.hidden = true;

        label.htmlFor = input.id = "file-input";

        text.textContent =
            "Drop HEIC images here or click to browse";

        label.appendChild(text);

        section.appendChild(input);
        section.appendChild(label);

        input.addEventListener("change", () => {
            const selectedFiles = Array.from(input.files);

            addFiles(selectedFiles);

            onFilesAdded();

            input.value = "";
        });

        section.addEventListener("dragover", (event) => {
            event.preventDefault();

            section.classList.add("dragging");
        });

        section.addEventListener("dragleave", () => {
            section.classList.remove("dragging");
        });

        section.addEventListener("drop", (event) => {
            event.preventDefault();

            section.classList.remove("dragging");

            const droppedFiles = Array.from(
                event.dataTransfer.files
            );

            addFiles(droppedFiles);

            onFilesAdded();
        });

        return section;
    },
};

export default DropZone;
