/**
 * gdus-date-to-number.ts
 *
 * Created by Min-Kyu Lee on 10-04-2024
 * Copyright © 2024 Min-Kyu Lee. All rights reserved.
 */

import { timeZoneToOffset_ } from "../constants/timezone_to_offset";
import { GdusDate } from "../types/gdus-date";
import { Optional } from "../types/optional";

export const gdusDateToNumber_ = (input: Optional<number | GdusDate>): Optional<number> => {
    if (
        input === undefined ||
		typeof input === "number"
    ) {
        return input;
    }

    let timeZoneOffset: number = 0;
    if (typeof input.timeZone === "number") {
        timeZoneOffset = input.timeZone;
    }
    else if (timeZoneToOffset_.has(input.timeZone?.toUpperCase() ?? "")) {
        timeZoneOffset = timeZoneToOffset_.get(input.timeZone?.toUpperCase() ?? "") as number;
    }

    return Date.UTC(
        input.year,
        input.month - 1,
        input.dayOfMonth,
        input.hours ?? 0,
        input.minutes ?? 0,
        input.seconds ?? 0,
    ) - (
        (timeZoneOffset ?? 0) * (60 * 1000)
    );
}; 
