/**
 * run-on-all-files-in-folder.ts
 *
 * Created by Min-Kyu Lee on 24-02-2024
 * Copyright © 2024 Min-Kyu Lee. All rights reserved.
 */

export const runOnAllInFolder_ = ({
    inputFolder,
    fileFunction,
    folderFunction,
}: {
    inputFolder: GoogleAppsScript.Drive.Folder,
    fileFunction: (inputFile: GoogleAppsScript.Drive.File) => void,
    folderFunction: (inputFolder: GoogleAppsScript.Drive.Folder) => void,
}) => {
    const inputFolderFilesIterator: GoogleAppsScript.Drive.FileIterator = inputFolder.getFiles();
    while (inputFolderFilesIterator.hasNext()) {
        const fileElement = inputFolderFilesIterator.next();

        fileFunction(fileElement);
    }

    const inputFolderFolderIterator: GoogleAppsScript.Drive.FolderIterator = inputFolder.getFolders();
    while (inputFolderFolderIterator.hasNext()) {
        const folderElement = inputFolderFolderIterator.next();

        folderFunction(folderElement);
        runOnAllInFolder_({
            inputFolder: folderElement,
            fileFunction: fileFunction,
            folderFunction: folderFunction,
        });
    } 
};
