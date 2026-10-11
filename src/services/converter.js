import { heicTo } from "heic-to";

const Converter = {
    async convert(file) {
        const buffer = await file.arrayBuffer();

        const blob = new Blob([buffer], {
            type: file.type,
        });

        const output = await heicTo({
            blob,
            type: "image/jpeg",
            quality: 0.9,
        });

        return output;
    },
};

export default Converter;
