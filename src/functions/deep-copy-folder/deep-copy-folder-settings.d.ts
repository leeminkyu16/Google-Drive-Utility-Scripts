/**
 * deep-copy-folder-settings.d.ts
 *
 * Created by Min-Kyu Lee on 05-04-2024
 * Copyright © 2024 Min-Kyu Lee. All rights reserved.
 */

import { GdusDate } from "../../shared/types/gdus-date";
import { Optional } from "../../shared/types/optional";
import { DeepCopyFolderSettingExistingFileHandling } from "./deep-copy-folder-setting-existing-file-handling";


export interface DeepCopyFolderSettings {
    existingFileHandling: DeepCopyFolderSettingExistingFileHandling,
    copyingFolderSuffix: string,
    fileAllowList: RegExp[],
    fileBlockList: RegExp[],
    folderAllowList: RegExp[],
    folderBlockList: RegExp[],
    copyIfSourceModifiedSince: Optional<number | GdusDate>,
    skipIfDestinationModifiedSince: Optional<number | GdusDate>,
}
