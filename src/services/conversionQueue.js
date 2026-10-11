import { getFiles, updateFile } from "../state/files";
import Converter from "./converter";

const ConversionQueue = {
    isProcessing: false,

    async start(onUpdate, concurrencyLimit = 3) {
        if (this.isProcessing) {
            return;
        }

        this.isProcessing = true;

        try {
            const files = getFiles();
            const waitingFiles = files.filter(item => item.status === "waiting");

            let nextIndex = 0;

            async function worker() {
                while (nextIndex < waitingFiles.length) {
                    const item = waitingFiles[nextIndex];
                    nextIndex++;

                    await ConversionQueue.process(item, onUpdate)
                }
            }

            const workerCount = Math.min(
                concurrencyLimit,
                waitingFiles.length
            );

            await Promise.all(
                Array.from({
                    length: workerCount
                }, () => worker())
            )
        } finally {
            this.isProcessing = false;
        }

    },

    async process(item, onUpdate) {
        updateFile(item.id, {
            status: "converting",
            progress: 0,
        });

        onUpdate();

        try {
            const output = await Converter.convert(item.file);

            updateFile(item.id, {
                status: "complete",
                progress: 100,
                output,
            });

            onUpdate();
        } catch (error) {
            console.error(error);

            updateFile(item.id, {
                status: "failed",
                error,
            });

            onUpdate();
        }
    }
};

export default ConversionQueue;
