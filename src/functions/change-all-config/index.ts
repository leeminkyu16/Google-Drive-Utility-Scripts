/**
 * change-all-config/index.ts
 *
 * Created by Min-Kyu Lee on 24-02-2024
 * Copyright © 2024 Min-Kyu Lee. All rights reserved.
 */


import { runOnAllInFolder_ } from "../../shared/functions/run-on-all-files-in-folder";
import { FolderId } from "../../shared/types/folder-id";
import { Optional } from "../../shared/types/optional";
import { defaultSecurityUpdateEnabled_, defaultShareableByEditors_ } from "./defaults";

/**
 * 
 * @param {Object} parameters - parameters for function
 * @param {FolderId} parameters.targetFolderId
 * @param {Optional<boolean>} parameters.shareableByEditors
 * @param {Optional<boolean>} parameters.securityUpdateEnabled
 */
export const changeAllConfig = ({
    targetFolderId,
    shareableByEditors = defaultShareableByEditors_,
    securityUpdateEnabled = defaultSecurityUpdateEnabled_,
} : {
    targetFolderId: FolderId,
    shareableByEditors: Optional<boolean>,
    securityUpdateEnabled: Optional<boolean>,
}) => {
    const targetFolder = DriveApp.getFolderById(targetFolderId.folderId);

    changeAllFileConfigInFolder_({
        targetFolder: targetFolder,
        shareableByEditors: shareableByEditors,
        securityUpdateEnabled: securityUpdateEnabled,
    });
};

const changeAllFileConfigInFolder_ = ({
    targetFolder,
    shareableByEditors,
    securityUpdateEnabled,
} : {
    targetFolder: GoogleAppsScript.Drive.Folder,
    shareableByEditors: Optional<boolean>,
    securityUpdateEnabled: Optional<boolean>,
}) => {
    runOnAllInFolder_({
        inputFolder: targetFolder,
        fileFunction: (inputFile) => {
            changeFileConfig_({
                targetFile: inputFile,
                shareableByEditors: shareableByEditors,
                securityUpdateEnabled: securityUpdateEnabled,
            });
        },
        folderFunction: (inputFolder) => {
            changeFolderConfig_({
                targetFolder: inputFolder,
                shareableByEditors: shareableByEditors,
                securityUpdateEnabled: securityUpdateEnabled, 
            });
        },
    });
};

const changeFileConfig_ = ({
    targetFile,
    shareableByEditors,
    securityUpdateEnabled,
} : {
    targetFile: GoogleAppsScript.Drive.File,
    shareableByEditors: Optional<boolean>,
    securityUpdateEnabled: Optional<boolean>,
}) => {
    if (shareableByEditors !== undefined) {
        targetFile.setShareableByEditors(shareableByEditors);
    }
    if (securityUpdateEnabled !== undefined) {
        targetFile.setSecurityUpdateEnabled(securityUpdateEnabled);
    }
};

const changeFolderConfig_ = ({
    targetFolder,
    shareableByEditors,
    securityUpdateEnabled,
} : {
    targetFolder: GoogleAppsScript.Drive.Folder,
    shareableByEditors: Optional<boolean>,
    securityUpdateEnabled: Optional<boolean>,
}) => {
    if (shareableByEditors !== undefined) {
        targetFolder.setShareableByEditors(shareableByEditors);
    }
    if (securityUpdateEnabled !== undefined) {
        targetFolder.setSecurityUpdateEnabled(securityUpdateEnabled);
    }
};
