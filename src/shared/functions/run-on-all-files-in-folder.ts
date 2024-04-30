import { SkipFolderPredicateInput } from "./../types/skip-folder-predicate-input.d";
/**
 * run-on-all-files-in-folder.ts
 *
 * Created by Min-Kyu Lee on 24-02-2024
 * Copyright © 2024 Min-Kyu Lee. All rights reserved.
 */

import { SkipFilePredicateInput } from "../types/skip-file-predicate-input";

export const runOnAllInFolder_ = ({
    inputFolder,
    fileFunction,
    folderFunction, 
    skipFilePredicate,
    skipFolderPredicate,
    currentPath = ".",
}: {
    inputFolder: GoogleAppsScript.Drive.Folder,
    fileFunction: (
        inputFile: GoogleAppsScript.Drive.File,
        currentPath: string,
    ) => void,
    folderFunction: (
        inputFolder: GoogleAppsScript.Drive.Folder,
        currentPath: string,
    ) => void,
    skipFilePredicate: (
        skipFilePredicateInput: SkipFilePredicateInput,
    ) => boolean,
    skipFolderPredicate: (
        skipFolderPredicateInput: SkipFolderPredicateInput,
    ) => boolean,
    currentPath: string,
}): void => {
    if (skipFolderPredicate({currentFolder: inputFolder, currentPath: currentPath})) {
        console.log(`RUN_ON_ALL_FILES_IN_FOLDER: Skipping ${currentPath}`);
        return;
    }

    const inputFolderFilesIterator: GoogleAppsScript.Drive.FileIterator = inputFolder.getFiles();
    while (inputFolderFilesIterator.hasNext()) {
        const fileElement: GoogleAppsScript.Drive.File = inputFolderFilesIterator.next();

        if (skipFilePredicate({currentFile: fileElement, currentPath: currentPath})) {
            console.log(`RUN_ON_ALL_FILES_IN_FOLDER: Skipping ${currentPath}`);
            continue;
        }

        fileFunction(
            fileElement,
            `${currentPath}/${fileElement.getName()}`,
        );
    }

    const inputFolderFolderIterator: GoogleAppsScript.Drive.FolderIterator = inputFolder.getFolders();
    while (inputFolderFolderIterator.hasNext()) {
        const folderElement: GoogleAppsScript.Drive.Folder = inputFolderFolderIterator.next();

        const newPath: string = `${currentPath}/${folderElement.getName()}`;

        folderFunction(
            folderElement,
            newPath,
        );
        runOnAllInFolder_({
            inputFolder: folderElement,
            fileFunction: fileFunction,
            folderFunction: folderFunction,
            skipFilePredicate: skipFilePredicate,
            skipFolderPredicate: skipFolderPredicate,
            currentPath: newPath,
        });
    } 
};
