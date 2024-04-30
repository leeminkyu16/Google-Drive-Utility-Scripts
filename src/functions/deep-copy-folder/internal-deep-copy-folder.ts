/**
 * internal-deep-copy-folder.ts
*
* Created by Min-Kyu Lee on 10-03-2024
* Copyright © 2024 Min-Kyu Lee. All rights reserved.
*/


import { DeepCopyFolderSettingExistingFileHandling } from "./deep-copy-folder-setting-existing-file-handling";
import { deepCopyFile_ } from "./deep-copy-file";
import { createFolderIfNeeded_ } from "./create-folder-if-needed";
import { DeepCopyFolderSettings } from "./deep-copy-folder-settings";
import { folderExists_ } from "./folder-exists";

export const internalDeepCopyFolder_ = ({
    sourceFolder,
    destinationFolder,
    currentFilePath,
    deepCopyFolderSettings,
}: {
    sourceFolder: GoogleAppsScript.Drive.Folder;
    destinationFolder: GoogleAppsScript.Drive.Folder;
    currentFilePath: string;
    deepCopyFolderSettings: DeepCopyFolderSettings,
}): void => {
    if (
        deepCopyFolderSettings.folderAllowList.length !== 0 &&
        !deepCopyFolderSettings.folderAllowList.some(r => r.test(currentFilePath))
    ) {
        console.log(`DEEP_COPY_FOLDER: Skipping ${currentFilePath} (Folder Not on Allow List)`);
        return;
    }
    
    if (
        deepCopyFolderSettings.folderBlockList.length !== 0 &&
        deepCopyFolderSettings.folderBlockList.some(r => r.test(currentFilePath))
    ) {
        console.log(`DEEP_COPY_FOLDER: Skipping ${currentFilePath} (Folder on Block List)`);
        return;
    }

    const sourceFolderFileIterator: GoogleAppsScript.Drive.FileIterator = sourceFolder.getFiles();
    while (sourceFolderFileIterator.hasNext()) {
        const file: GoogleAppsScript.Drive.File = sourceFolderFileIterator.next();

        deepCopyFile_({
            sourceFile: file,
            destinationFolder: destinationFolder,
            currentFilePath: currentFilePath + `/${file.getName()}`,
            deepCopyFolderSettings: deepCopyFolderSettings,
        });
    }

    const sourceFolderFolderIterator: GoogleAppsScript.Drive.FolderIterator = sourceFolder.getFolders();
    while (sourceFolderFolderIterator.hasNext()) {
        const currentFolder: GoogleAppsScript.Drive.Folder = sourceFolderFolderIterator.next();
        const currentFolderName: string = currentFolder.getName();
        const currentFolderNameWithCopyingSuffix: string = currentFolderName + deepCopyFolderSettings.copyingFolderSuffix;
        
        if (
            deepCopyFolderSettings.existingFileHandling === DeepCopyFolderSettingExistingFileHandling.Skip &&
            folderExists_({fileName: currentFolderName, parentFolder: destinationFolder})
        ) {
            continue;
        }

        const newDestinationFolder: GoogleAppsScript.Drive.Folder = createFolderIfNeeded_({
            parentFolder: destinationFolder,
            folderName: deepCopyFolderSettings.existingFileHandling === DeepCopyFolderSettingExistingFileHandling.Skip ? 
                currentFolderNameWithCopyingSuffix : currentFolderName,
        });

        internalDeepCopyFolder_({
            sourceFolder: currentFolder,
            destinationFolder: newDestinationFolder,
            currentFilePath: currentFilePath + `/${currentFolderName}`,
            deepCopyFolderSettings: deepCopyFolderSettings,
        });

        if (deepCopyFolderSettings.existingFileHandling === DeepCopyFolderSettingExistingFileHandling.Skip) {
            newDestinationFolder.setName(currentFolderName  );
        }
    }
};
