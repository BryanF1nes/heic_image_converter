import { getFiles, updateFile } from "../state/files";
import Converter from "./converter";

const ConversionQueue = {
    isProcessing: false,

    async start(onUpdate) {
        if (this.isProcessing) {
            return;
        }

        this.isProcessing = true;

        try {
            const files = getFiles();

            for (const item of files) {
                if (item.status !== "waiting") {
                    continue;
                }

                await this.process(item, onUpdate);
            }
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
