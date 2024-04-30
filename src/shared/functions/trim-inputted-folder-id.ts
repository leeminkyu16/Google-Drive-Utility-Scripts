/**
 * trim-input-folder-id.ts
 *
 * Created by Min-Kyu Lee on 06-04-2024
 * Copyright © 2024 Min-Kyu Lee. All rights reserved.
 */

import { FolderId } from "../types/folder-id";

export const trimInputtedFolderId_ = (
    inputFolderId: FolderId
): FolderId => {
    let outputFolderId: string = inputFolderId.folderId.trim();

    const substringsToTrimFromStart: string[] = [
        "https://",
        "drive.google.com/drive/folders/",
    ];

    substringsToTrimFromStart.forEach((element: string): void => {
        const substringFromId: string = outputFolderId.substring(0, element.length);
        if (substringFromId === element) {
            outputFolderId = outputFolderId.substring(element.length);
        }
    });

    return {
        folderId: outputFolderId,
    };
};
