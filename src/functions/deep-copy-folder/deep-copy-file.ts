/**
 * deep-copy-file.ts
 *
 * Created by Min-Kyu Lee on 10-03-2024
 * Copyright © 2024 Min-Kyu Lee. All rights reserved.
 */

import { deleteFileByNameIfExists_ } from "./delete-file-if-exists";
import { DeepCopyFolderSettings } from "./deep-copy-folder-settings";
import { DeepCopyFolderSettingExistingFileHandling } from "./deep-copy-folder-setting-existing-file-handling";
import { Optional } from "../../shared/types/optional";


export const deepCopyFile_ = ({
    sourceFile,
    destinationFolder,
    currentFilePath,
    deepCopyFolderSettings,
}: {
    sourceFile: GoogleAppsScript.Drive.File;
    destinationFolder: GoogleAppsScript.Drive.Folder;
    currentFilePath: string;
    deepCopyFolderSettings: DeepCopyFolderSettings,
}): void => {
    const sourceFileName: string = sourceFile.getName();
    const destinationFolderSourceNameIterator: GoogleAppsScript.Drive.FileIterator =
        destinationFolder.getFilesByName(sourceFileName);
    const sourceNameExistsInDestination: boolean = destinationFolderSourceNameIterator.hasNext();
    let sourceNameFileInDestination: Optional<GoogleAppsScript.Drive.File> = undefined;
    if (sourceNameExistsInDestination) {
        sourceNameFileInDestination = destinationFolderSourceNameIterator.next();
    }

    if (
        deepCopyFolderSettings.fileAllowList.length !== 0 &&
        !deepCopyFolderSettings.fileAllowList.some(r => r.test(currentFilePath))
    ) {
        console.log(`DEEP_COPY_FOLDER: Skipping ${currentFilePath} (File Not on Allow List)`);
        return;
    }

    if (
        deepCopyFolderSettings.fileBlockList.length !== 0 &&
        deepCopyFolderSettings.fileBlockList.some(r => r.test(currentFilePath))
    ) {
        console.log(`DEEP_COPY_FOLDER: Skipping ${currentFilePath} (File on Block List)`);
        return;
    }

    if (
        typeof (deepCopyFolderSettings.copyIfSourceModifiedSince) === "number" &&
        deepCopyFolderSettings.copyIfSourceModifiedSince > sourceFile.getLastUpdated().valueOf()
    ) {
        console.log(`DEEP_COPY_FOLDER: Skipping ${currentFilePath} (Source Not Modified)`);
        return;
    }
    if (
        sourceNameFileInDestination !== undefined &&
        typeof (deepCopyFolderSettings.skipIfDestinationModifiedSince) === "number" &&
        deepCopyFolderSettings.skipIfDestinationModifiedSince < sourceNameFileInDestination.getLastUpdated().valueOf()
    ) {
        console.log(`DEEP_COPY_FOLDER: Skipping ${currentFilePath} (Destination Recently Modified)`);
        return;
    }

    if (
        deepCopyFolderSettings.existingFileHandling === DeepCopyFolderSettingExistingFileHandling.Skip &&
        destinationFolderSourceNameIterator.hasNext()
    ) {
        console.log(`DEEP_COPY_FOLDER: Skipping ${currentFilePath} (File Exists)`);
        return;
    }

    console.log(`DEEP_COPY_FOLDER: Copying ${currentFilePath}`);

    if (deepCopyFolderSettings.existingFileHandling === DeepCopyFolderSettingExistingFileHandling.Override) {
        deleteFileByNameIfExists_({
            fileName: sourceFileName,
            folder: destinationFolder,
        });
    }

    const newFile: GoogleAppsScript.Drive.File = sourceFile.makeCopy(destinationFolder);
    newFile.setShareableByEditors(sourceFile.isShareableByEditors());

    newFile.setName(sourceFileName);
    newFile.moveTo(destinationFolder);

    if (deepCopyFolderSettings.existingFileHandling === DeepCopyFolderSettingExistingFileHandling.Skip) {
        deleteFileByNameIfExists_({
            fileName: `Copy of ${sourceFileName}`,
            folder: destinationFolder,
        });
    }
};
