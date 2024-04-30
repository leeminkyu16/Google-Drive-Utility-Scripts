/**
 * change-all-file-config-in-folder.ts
 *
 * Created by Min-Kyu Lee on 12-04-2024
 * Copyright © 2024 Min-Kyu Lee. All rights reserved.
 */


import { runOnAllInFolder_ } from "../../shared/functions/run-on-all-files-in-folder";
import { skipFilePredicateFactory_ } from "../../shared/functions/skip-file-predicate-factory";
import { skipFolderPredicateFactory_ } from "../../shared/functions/skip-folder-predicate-factory";
import { Optional } from "../../shared/types/optional";
import { ChangeAllConfigSettings } from "./change-all-config-settings";
import { changeFileConfig_ } from "./change-file-config";
import { changeFolderConfig_ } from "./change-folder-config";

export const changeAllFileConfigInFolder_ = ({
    targetFolder, shareableByEditors, changeAllConfigSettings,
}: {
    targetFolder: GoogleAppsScript.Drive.Folder;
    shareableByEditors: Optional<boolean>;
    changeAllConfigSettings: ChangeAllConfigSettings;
}): void => {
    runOnAllInFolder_({
        inputFolder: targetFolder,
        fileFunction: (inputFile: GoogleAppsScript.Drive.File) => {
            changeFileConfig_({
                targetFile: inputFile,
                shareableByEditors: shareableByEditors,
            });
        },
        folderFunction: (inputFolder: GoogleAppsScript.Drive.Folder): void => {
            changeFolderConfig_({
                targetFolder: inputFolder,
                shareableByEditors: shareableByEditors,
            });
        },
        skipFilePredicate: skipFilePredicateFactory_({
            fileAllowList: changeAllConfigSettings.fileAllowList,
            fileBlockList: changeAllConfigSettings.fileBlockList,
            runIfSourceModifiedSince: changeAllConfigSettings.runIfSourceModifiedSince,
            skipIfDestinationModifiedSince: changeAllConfigSettings.skipIfDestinationModifiedSince,
        }),
        skipFolderPredicate: skipFolderPredicateFactory_({
            folderAllowList: changeAllConfigSettings.folderAllowList,
            folderBlockList: changeAllConfigSettings.folderBlockList,
            runIfSourceModifiedSince: undefined,
            skipIfDestinationModifiedSince: undefined,
        }),
        currentPath: ".",
    });
};
