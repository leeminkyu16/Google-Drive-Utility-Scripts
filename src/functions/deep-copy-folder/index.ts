/**
 * deep-copy-folder/index.ts
 *
 * Created by Min-Kyu Lee on 24-02-2024
 * Copyright © 2024 Min-Kyu Lee. All rights reserved.
 */


import { FolderId } from "../../shared/types/folder-id";
import { Optional } from "../../shared/types/optional";
import { createFolderIfNeeded_ } from "./create-folder-if-needed";
import { defaultDeepCopyFolderSettings_, defaultDestinationFolderId_, defaultNewDestinationFolderName_, defaultSourceFolderId_ } from "./defaults";
import { internalDeepCopyFolder_ } from "./internal-deep-copy-folder";
import { DeepCopyFolderSettings } from "./deep-copy-folder-settings";
import { trimInputtedFolderId_ as trimInputtedFolderId_ } from "../../shared/functions/trim-inputted-folder-id";
import { gdusDateToNumber_ } from "../../shared/functions/gdus-date-to-number";

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
    deepCopyFolderSettings = defaultDeepCopyFolderSettings_,
}: {
    sourceFolderId: FolderId,
    destinationFolderId: FolderId,
    newDestinationFolderName: Optional<string>,
    deepCopyFolderSettings: DeepCopyFolderSettings,
} = {
    sourceFolderId: defaultSourceFolderId_,
    destinationFolderId: defaultDestinationFolderId_,
    newDestinationFolderName: defaultNewDestinationFolderName_,
    deepCopyFolderSettings: defaultDeepCopyFolderSettings_,
}): void => {
    const trimmedSourceFolderId: FolderId = trimInputtedFolderId_(sourceFolderId);
    const trimmedDestinationFolderId: FolderId = trimInputtedFolderId_(destinationFolderId);

    const sourceFolder: GoogleAppsScript.Drive.Folder = DriveApp.getFolderById(trimmedSourceFolderId.folderId);
    let destinationFolder: GoogleAppsScript.Drive.Folder;

    if (new Set([
        "my drive",
        "root folder",
    ]).has(trimmedDestinationFolderId.folderId.toLowerCase())) {
        destinationFolder = DriveApp.getRootFolder();
    }
    else {
        destinationFolder = DriveApp.getFolderById(trimmedDestinationFolderId.folderId);
    }

    if (newDestinationFolderName !== undefined) {
        destinationFolder = createFolderIfNeeded_({
            parentFolder: destinationFolder,
            folderName: newDestinationFolderName,
        });
    }

    if (destinationFolder === null) {
        console.error("Error: Invalid source or destination folder");
        return;
    }

    internalDeepCopyFolder_({
        sourceFolder: sourceFolder,
        destinationFolder: destinationFolder,
        currentFilePath: ".",
        deepCopyFolderSettings: {
            ...deepCopyFolderSettings,
            copyIfSourceModifiedSince: gdusDateToNumber_(
                deepCopyFolderSettings.copyIfSourceModifiedSince
            ),
            skipIfDestinationModifiedSince: gdusDateToNumber_(
                deepCopyFolderSettings.skipIfDestinationModifiedSince
            ),
        },
    });
};
