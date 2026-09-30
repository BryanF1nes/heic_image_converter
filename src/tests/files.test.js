import { getFiles, addFiles, removeFile, clearFiles } from "../state/files";

it('Should add a file to the files array', () => {
    const file = {
        id: crypto.randomUUID(),
        file: 'Test',
        status: "waiting",
        progress: 0,
        output: null,
        error: null,
    };

    addFiles([file]);
    expect(getFiles().length).toBe(1);
    clearFiles();
});

it('Should add multiple files to the files array', () => {
    const files = [
        {
            id: crypto.randomUUID(),
            file: 'Test',
            status: "waiting",
            progress: 0,
            output: null,
            error: null,
        },
        {
            id: crypto.randomUUID(),
            file: 'Test2',
            status: "waiting",
            progress: 0,
            output: null,
            error: null,
        },
    ];

    addFiles(files);
    expect(getFiles().length).toBe(2);
})
