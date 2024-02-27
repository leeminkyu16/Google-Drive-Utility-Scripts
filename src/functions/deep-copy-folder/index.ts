/**
 * deep-copy-folder/index.ts
 *
 * Created by Min-Kyu Lee on 24-02-2024
 * Copyright © 2024 Min-Kyu Lee. All rights reserved.
 */

import { FolderId } from "../../shared/types/folder-id";
import { Optional } from "../../shared/types/optional";
import { defaultDestinationFolderId_, defaultNewDestinationFolderName_, defaultSourceFolderId_ } from "./defaults";

/**
 * 
 * @param {Object} parameters
 * @param {FolderId} parameters.sourceFolderId
 * @param {FolderId} parameters.destinationFolderId
 * @param {Optional<string>} parameters.newDestinationFolderName
 */
export const deepCopyFolder = ({
    sourceFolderId = defaultSourceFolderId_,
    destinationFolderId = defaultDestinationFolderId_,
    newDestinationFolderName = defaultNewDestinationFolderName_,
}: {
    sourceFolderId: FolderId,
    destinationFolderId: FolderId,
    newDestinationFolderName: Optional<string>,
} = {
    sourceFolderId: defaultSourceFolderId_,
    destinationFolderId: defaultDestinationFolderId_,
    newDestinationFolderName: defaultNewDestinationFolderName_,
}) => {
    const sourceFolder: GoogleAppsScript.Drive.Folder = DriveApp.getFolderById(sourceFolderId.folderId);
    let destinationFolder: GoogleAppsScript.Drive.Folder = new Set([
        "my drive",
        "root folder",
    ]).has(destinationFolderId.folderId.toLowerCase()) ?
        DriveApp.getRootFolder() :
        DriveApp.getFolderById(destinationFolderId.folderId);

    if (newDestinationFolderName !== undefined) {
        destinationFolder = destinationFolder.createFolder(newDestinationFolderName);
    }

    if (destinationFolder === null) {
        console.error("Error: Invalid source or destination folder");
        return;
    }

    internalDeepCopyFolder_({sourceFolder: sourceFolder, destinationFolder: destinationFolder});
};

const internalDeepCopyFolder_ = ({
    sourceFolder,
    destinationFolder,
}: {
    sourceFolder: GoogleAppsScript.Drive.Folder,
    destinationFolder: GoogleAppsScript.Drive.Folder,
}) => {
    const sourceFolderFileIterator: GoogleAppsScript.Drive.FileIterator = sourceFolder.getFiles();
    while (sourceFolderFileIterator.hasNext()) {
        const file: GoogleAppsScript.Drive.File = sourceFolderFileIterator.next();

        copyFile_({
            sourceFile: file,
            destinationFolder: destinationFolder,
        });
    }

    const sourceFolderFolderIterator: GoogleAppsScript.Drive.FolderIterator = sourceFolder.getFolders();
    while (sourceFolderFolderIterator.hasNext()) {
        const folder: GoogleAppsScript.Drive.Folder = sourceFolderFolderIterator.next();
        const newDestinationFolder = destinationFolder.createFolder(folder.getName());
        
        internalDeepCopyFolder_({
            sourceFolder: folder,
            destinationFolder: newDestinationFolder
        });
    }
};

const copyFile_ = ({
    sourceFile,
    destinationFolder,
}: {
    sourceFile: GoogleAppsScript.Drive.File,
    destinationFolder: GoogleAppsScript.Drive.Folder,
}) => {
    const newFile = sourceFile.makeCopy(destinationFolder);
    newFile.setShareableByEditors;
    newFile.setSecurityUpdateEnabled;
    
    newFile.setName(sourceFile.getName());
    newFile.moveTo(destinationFolder);
};
