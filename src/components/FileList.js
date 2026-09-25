import { getFiles, removeFile } from "../state/files";
import FileItem from "./FileItem";

const FileList = {
    elements: new Map(),

    render(onUpdate) {
        const container = document.createElement("section");

        container.classList.add("file-list");

        this.container = container;
        this.onUpdate = onUpdate;

        this.update();

        return container;
    },

    update() {
        const files = getFiles();

        const currentIds = new Set(
            files.map((item) => item.id)
        );

        // Remove DOM elements that no longer exist in state
        this.elements.forEach((element, id) => {
            if (!currentIds.has(id)) {
                element.remove();

                this.elements.delete(id);
            }
        });

        // Add new files and update existing files
        files.forEach((item) => {
            const existingElement = this.elements.get(item.id);

            if (existingElement) {
                FileItem.update(existingElement, item);

                return;
            }

            const fileItem = FileItem.render(item, () => {
                removeFile(item.id);

                this.onUpdate();
            });

            this.elements.set(item.id, fileItem);

            this.container.appendChild(fileItem);
        });
    },
};

export default FileList;
