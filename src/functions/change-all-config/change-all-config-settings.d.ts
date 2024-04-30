/**
 * change-all-config-settings.d.ts
 *
 * Created by Min-Kyu Lee on 12-04-2024
 * Copyright © 2024 Min-Kyu Lee. All rights reserved.
 */


import { GdusDate } from "../../shared/types/gdus-date";
import { Optional } from "../../shared/types/optional";


export interface ChangeAllConfigSettings {
    fileAllowList: RegExp[];
    fileBlockList: RegExp[];
    folderAllowList: RegExp[];
    folderBlockList: RegExp[];
    runIfSourceModifiedSince: Optional<number | GdusDate>;
    skipIfDestinationModifiedSince: Optional<number | GdusDate>;
}
