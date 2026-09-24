import { heicTo } from "heic-to";

const Converter = {
    async convert(file) {
        const buffer = await file.arrayBuffer();

        const bytes = new Uint8Array(buffer);

        console.log("File:", file);
        console.log("Type:", file.type);
        console.log("Size:", file.size);
        console.log("First 16 bytes:", bytes.slice(0, 16));

        const blob = new Blob([buffer], {
            type: file.type,
        });

        console.log("Blob:", blob);

        const output = await heicTo({
            blob,
            type: "image/jpeg",
            quality: 0.9,
        });

        return output;
    },
};

export default Converter;
