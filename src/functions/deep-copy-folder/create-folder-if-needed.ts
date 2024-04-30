/**
 * create-folder-if-needed.ts
 *
 * Created by Min-Kyu Lee on 02-04-2024
 * Copyright © 2024 Min-Kyu Lee. All rights reserved.
 */


export const createFolderIfNeeded_ = ({
    parentFolder,
    folderName,
}: {
    parentFolder: GoogleAppsScript.Drive.Folder,
    folderName: string,
}): GoogleAppsScript.Drive.Folder => {
    const givenFolderNameIterator: GoogleAppsScript.Drive.FolderIterator = parentFolder.getFoldersByName(
        folderName
    );

    let newFolder: GoogleAppsScript.Drive.Folder;
    if (givenFolderNameIterator.hasNext()) {
        newFolder = givenFolderNameIterator.next();
    }
    else {
        newFolder = parentFolder.createFolder(folderName);
    }

    return newFolder;
};
