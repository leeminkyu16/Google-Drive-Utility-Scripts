/**
 * change-file-config.ts
 *
 * Created by Min-Kyu Lee on 12-04-2024
 * Copyright © 2024 Min-Kyu Lee. All rights reserved.
 */


import { Optional } from "../../shared/types/optional";

export const changeFileConfig_ = ({
    targetFile, shareableByEditors,
}: {
    targetFile: GoogleAppsScript.Drive.File;
    shareableByEditors: Optional<boolean>;
}): void => {
    if (shareableByEditors !== undefined &&
        targetFile.getOwner().getEmail() === Session.getEffectiveUser().getEmail()) {
        targetFile.setShareableByEditors(shareableByEditors);
    }
};
