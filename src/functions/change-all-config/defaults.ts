/**
 * change-all-config/defaults.ts
 *
 * Created by Min-Kyu Lee on 24-02-2024
 * Copyright © 2024 Min-Kyu Lee. All rights reserved.
 */

import { ChangeAllConfigSettings } from "./change-all-config-settings";
import { Optional } from "../../shared/types/optional";


export const defaultShareableByEditors_: Optional<boolean> = undefined;
export const defaultChangeAllConfigSettings_: ChangeAllConfigSettings = {
    fileAllowList: [],
    fileBlockList: [],
    folderAllowList: [],
    folderBlockList: [],
    runIfSourceModifiedSince: undefined,
    skipIfDestinationModifiedSince: undefined,
};
