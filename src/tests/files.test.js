import { getFiles, addFiles, removeFile, removeFile } from "../state/files";


it('Adding files to the queue', () => {
    const file = {
        id: crypto.randomUUID(),
        file: 'Test',
        status: "waiting",
        progress: 0,
        output: null,
        error: null,
    }
    expect(getFiles.length()).toBe(2)
})
