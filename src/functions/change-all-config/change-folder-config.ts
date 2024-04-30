/**
 * change-folder-config.ts
 *
 * Created by Min-Kyu Lee on 12-04-2024
 * Copyright © 2024 Min-Kyu Lee. All rights reserved.
 */


import { Optional } from "../../shared/types/optional";

export const changeFolderConfig_ = ({
    targetFolder, shareableByEditors,
}: {
    targetFolder: GoogleAppsScript.Drive.Folder;
    shareableByEditors: Optional<boolean>;
}): void => {
    if (shareableByEditors !== undefined) {
        targetFolder.setShareableByEditors(shareableByEditors);
    }
};
