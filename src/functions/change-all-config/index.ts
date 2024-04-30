/**
 * change-all-config/index.ts
 *
 * Created by Min-Kyu Lee on 24-02-2024
 * Copyright © 2024 Min-Kyu Lee. All rights reserved.
 */


import { FolderId } from "../../shared/types/folder-id";
import { Optional } from "../../shared/types/optional";
import { trimInputtedFolderId_ } from "../../shared/functions/trim-inputted-folder-id";
import { ChangeAllConfigSettings } from "./change-all-config-settings";
import { changeAllFileConfigInFolder_ } from "./change-all-file-config-in-folder";
import { defaultChangeAllConfigSettings_, defaultShareableByEditors_ } from "./defaults";

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
    changeAllConfigSettings = defaultChangeAllConfigSettings_,
} : {
    targetFolderId: FolderId,
    shareableByEditors: Optional<boolean>,
    changeAllConfigSettings: ChangeAllConfigSettings,
}): void => {
    const trimmedTargetFolderId: FolderId = trimInputtedFolderId_(targetFolderId);

    const targetFolder: GoogleAppsScript.Drive.Folder = DriveApp.getFolderById(trimmedTargetFolderId.folderId);

    changeAllFileConfigInFolder_({
        targetFolder: targetFolder,
        shareableByEditors: shareableByEditors,
        changeAllConfigSettings: changeAllConfigSettings,
    });
};
