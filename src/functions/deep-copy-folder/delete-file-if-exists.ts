/**
 * delete-file-if-exists.ts
 *
 * Created by Min-Kyu Lee on 02-04-2024
 * Copyright © 2024 Min-Kyu Lee. All rights reserved.
 */


export const deleteFileByNameIfExists_ = ({
    fileName,
    folder,
}: {
    fileName: string,
    folder: GoogleAppsScript.Drive.Folder,
}): void => {
    const fileIterator = folder.getFilesByName(fileName);

    while (fileIterator.hasNext()) {
        const currentFile: GoogleAppsScript.Drive.File = fileIterator.next();
        
        currentFile.setTrashed(true);
    }
};
