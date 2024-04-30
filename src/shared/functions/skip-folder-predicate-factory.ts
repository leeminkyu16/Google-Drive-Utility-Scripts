/**
 * skip-folder-predicate-factory.ts
 *
 * Created by Min-Kyu Lee on 12-04-2024
 * Copyright © 2024 Min-Kyu Lee. All rights reserved.
 */


import { gdusDateToNumber_ } from "./gdus-date-to-number";
import { Optional } from "../types/optional";
import { SkipFolderPredicateInput } from "../types/skip-folder-predicate-input";
import { SkipFolderPredicateFactoryInput } from "../types/skip-folder-predicate-factory-input";

export const skipFolderPredicateFactory_ = (
    factoryInput: SkipFolderPredicateFactoryInput,
) => {
    const predicateComponents: ((input: SkipFolderPredicateInput) => boolean)[] = [];

    if (factoryInput.folderAllowList.length > 0) {
        predicateComponents.push(
            (predicateInput: SkipFolderPredicateInput): boolean => {
                return !factoryInput.folderAllowList.some((r: RegExp): boolean => r.test(predicateInput.currentPath));
            }
        );
    }

    if (factoryInput.folderBlockList.length > 0) {
        predicateComponents.push(
            (predicateInput: SkipFolderPredicateInput): boolean => {
                return factoryInput.folderBlockList.some((r: RegExp): boolean => r.test(predicateInput.currentPath));
            }
        );
    }

    const runIfSourceModifiedSince: Optional<number> = gdusDateToNumber_(factoryInput.runIfSourceModifiedSince);
    if (runIfSourceModifiedSince !== undefined) {
        predicateComponents.push(
            (predicateInput: SkipFolderPredicateInput): boolean => {
                return runIfSourceModifiedSince > predicateInput.currentFolder.getLastUpdated().valueOf();
            }
        );
    }

    const skipIfDestinationModifiedSince: Optional<number> = gdusDateToNumber_(factoryInput.skipIfDestinationModifiedSince);
    if (skipIfDestinationModifiedSince !== undefined) {
        predicateComponents.push(
            (predicateInput: SkipFolderPredicateInput): boolean => {
                return skipIfDestinationModifiedSince < predicateInput.currentFolder.getLastUpdated().valueOf();
            }
        );
    }
    
    return (predicateInput: SkipFolderPredicateInput): boolean => {
        return predicateComponents.some((predicateComponent): boolean => {
            return predicateComponent(predicateInput);
        });
    };
};
