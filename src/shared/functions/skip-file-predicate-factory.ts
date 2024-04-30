/**
 * skip-file-predicate-factory.ts
 *
 * Created by Min-Kyu Lee on 12-04-2024
 * Copyright © 2024 Min-Kyu Lee. All rights reserved.
 */


import { gdusDateToNumber_ } from "./gdus-date-to-number";
import { Optional } from "../types/optional";
import { SkipFilePredicateFactoryInput } from "../types/skip-file-predicate-factory-input";
import { SkipFilePredicateInput } from "../types/skip-file-predicate-input";

export const skipFilePredicateFactory_ = (
    factoryInput: SkipFilePredicateFactoryInput,
) => {
    const predicateComponents: ((input: SkipFilePredicateInput) => boolean)[] = [];

    if (factoryInput.fileAllowList.length > 0) {
        predicateComponents.push(
            (predicateInput: SkipFilePredicateInput): boolean => {
                return !factoryInput.fileAllowList.some((r: RegExp): boolean => r.test(predicateInput.currentPath));
            }
        );
    }

    if (factoryInput.fileBlockList.length > 0) {
        predicateComponents.push(
            (predicateInput: SkipFilePredicateInput): boolean => {
                return factoryInput.fileAllowList.some((r: RegExp): boolean => r.test(predicateInput.currentPath));
            }
        );
    }

    const runIfSourceModifiedSince: Optional<number> = gdusDateToNumber_(factoryInput.runIfSourceModifiedSince);
    if (runIfSourceModifiedSince !== undefined) {
        predicateComponents.push(
            (predicateInput: SkipFilePredicateInput): boolean => {
                return runIfSourceModifiedSince > predicateInput.currentFile.getLastUpdated().valueOf();
            }
        );
    }

    const skipIfDestinationModifiedSince: Optional<number> = gdusDateToNumber_(factoryInput.skipIfDestinationModifiedSince);
    if (skipIfDestinationModifiedSince !== undefined) {
        predicateComponents.push(
            (predicateInput: SkipFilePredicateInput): boolean => {
                return skipIfDestinationModifiedSince < predicateInput.currentFile.getLastUpdated().valueOf();
            }
        );
    }
    
    return (predicateInput: SkipFilePredicateInput): boolean => {
        return predicateComponents.some((predicateComponent): boolean => {
            return predicateComponent(predicateInput);
        });
    };
};
