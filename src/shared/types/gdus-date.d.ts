/**
 * gdus-date.d.ts
*
* Created by Min-Kyu Lee on 24-02-2024
* Copyright © 2024 Min-Kyu Lee. All rights reserved.
*/

import { Optional } from "./optional";

export interface GdusDate { 
    year: number,
    month: number,
    dayOfMonth: number,
    hours: Optional<number>,
    minutes: Optional<number>,
    seconds: Optional<number>,
    timeZone: Optional<string | number>,
}
