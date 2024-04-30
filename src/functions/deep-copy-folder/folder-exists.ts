/**
 * folder-exists.ts
 *
 * Created by Min-Kyu Lee on 06-04-2024
 * Copyright © 2024 Min-Kyu Lee. All rights reserved.
 */


export const folderExists_ = ({
    fileName,
    parentFolder,
}: {
    fileName: string,
    parentFolder: GoogleAppsScript.Drive.Folder,
}): boolean => {
    const folderIterator = parentFolder.getFoldersByName(fileName);
    return folderIterator.hasNext();
};
