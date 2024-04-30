/**
 * deep-copy-folder/defaults.ts
 *
 * Created by Min-Kyu Lee on 24-02-2024
 * Copyright © 2024 Min-Kyu Lee. All rights reserved.
 */


import { FolderId } from "../../shared/types/folder-id";
import { Optional } from "../../shared/types/optional";
import { DeepCopyFolderSettings } from "./deep-copy-folder-settings";
import { DeepCopyFolderSettingExistingFileHandling } from "./deep-copy-folder-setting-existing-file-handling";

export const defaultSourceFolderId_: FolderId = { folderId: "" };
export const defaultDestinationFolderId_: FolderId = { folderId: "Root Folder" };
export const defaultNewDestinationFolderName_: Optional<string> = "New Test Folder";
export const defaultDeepCopyFolderSettings_: DeepCopyFolderSettings = {
    existingFileHandling: DeepCopyFolderSettingExistingFileHandling.Skip,
    copyingFolderSuffix: "-(Copying)",
    fileAllowList: [],
    fileBlockList: [],
    folderAllowList: [],
    folderBlockList: [],
    copyIfSourceModifiedSince: undefined,
    skipIfDestinationModifiedSince: undefined,
};
