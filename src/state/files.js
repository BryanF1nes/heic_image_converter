const files = [];

export function getFiles() {
    return files;
}

export function addFiles(newFiles) {
    newFiles.forEach((file) => {
        files.push({
            id: crypto.randomUUID(),
            file,
            status: "waiting",
            progress: 0,
            output: null,
            error: null,
        });
    });
}

export function updateFile(id, updates) {
    const item = files.find((file) => file.id === id);

    if (!item) {
        return;
    }

    Object.assign(item, updates);
}

export function removeFile(id) {
    const index = files.findIndex((item) => item.id === id);

    if (index !== -1) {
        files.splice(index, 1);
    }
}

export function clearFiles() {
    files.length = 0;
}
