const FileItem = {
    render(item, onRemove) {
        const article = document.createElement("article");
        const info = document.createElement("div");
        const name = document.createElement("span");
        const size = document.createElement("span");
        const status = document.createElement("span");
        const progress = document.createElement("div");
        const progressBar = document.createElement("div");
        const button = document.createElement("button");

        article.classList.add("file-item");

        info.classList.add("file-item-info");

        name.classList.add("file-item-name");
        size.classList.add("file-item-size");

        status.classList.add("file-item-status");

        progress.classList.add("file-item-progress");
        progressBar.classList.add("file-item-progress-bar");

        button.classList.add("file-item-remove");

        name.textContent = item.file.name;
        size.textContent = this.formatSize(item.file.size);

        button.type = "button";
        button.textContent = "Remove";

        button.addEventListener("click", onRemove);

        info.appendChild(name);
        info.appendChild(size);

        progress.appendChild(progressBar);

        article.appendChild(info);
        article.appendChild(status);
        article.appendChild(progress);

        article.appendChild(button);

        article.elements = {
            status,
            progressBar,
        };

        this.update(article, item);

        return article;
    },

    update(article, item) {
        const { status, progressBar } = article.elements;

        status.textContent = this.getStatusText(item.status);

        progressBar.classList.toggle(
            "is-converting",
            item.status === "converting"
        );

        progressBar.classList.toggle(
            "is-complete",
            item.status === "complete"
        );
    },

    getStatusText(status) {
        switch (status) {
            case "waiting":
                return "Waiting";

            case "converting":
                return "Converting...";

            case "complete":
                return "Complete";

            case "failed":
                return "Failed";

            default:
                return "";
        }
    },

    formatSize(bytes) {
        const megabytes = bytes / 1024 / 1024;

        return `${megabytes.toFixed(2)} MB`;
    },
};

export default FileItem;
