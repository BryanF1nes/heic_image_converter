import JSZip from "jszip";

const Download = {
    async download(files) {
        const completedFiles = files.filter(
            (item) => item.status === "complete" && item.output
        );

        if (completedFiles.length === 0) {
            return;
        }

        if (completedFiles.length === 1) {
            this.downloadFile(completedFiles[0]);

            return;
        }

        await this.downloadZip(completedFiles);
    },

    downloadFile(item) {
        const url = URL.createObjectURL(item.output);

        const link = document.createElement("a");

        link.href = url;
        link.download = this.getOutputName(item.file.name);

        link.click();

        URL.revokeObjectURL(url);
    },

    async downloadZip(files) {
        const zip = new JSZip();

        files.forEach((item) => {
            zip.file(
                this.getOutputName(item.file.name),
                item.output
            );
        });

        const blob = await zip.generateAsync({
            type: "blob",
        });

        const url = URL.createObjectURL(blob);

        const link = document.createElement("a");

        link.href = url;
        link.download = "converted-images.zip";

        link.click();

        URL.revokeObjectURL(url);
    },

    getOutputName(filename) {
        return filename.replace(
            /\.(heic|heif)$/i,
            ".jpg"
        );
    },
};

export default Download;
