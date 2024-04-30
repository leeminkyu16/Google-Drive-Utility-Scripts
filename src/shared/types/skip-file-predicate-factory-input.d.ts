/**
 * skip-file-predicate-factory-input.d.ts
 *
 * Created by Min-Kyu Lee on 12-04-2024
 * Copyright © 2024 Min-Kyu Lee. All rights reserved.
 */


import { GdusDate } from "./gdus-date";
import { Optional } from "./optional";

export interface SkipFilePredicateFactoryInput {
    fileAllowList: RegExp[];
    fileBlockList: RegExp[];
    runIfSourceModifiedSince: Optional<number | GdusDate>;
    skipIfDestinationModifiedSince: Optional<number | GdusDate>;
}
