/**
 * src/index.ts
 *
 * Created by Min-Kyu Lee on 24-02-2024
 * Copyright © 2024 Min-Kyu Lee. All rights reserved.
 */

import { changeAllConfig } from "./functions/change-all-config";
import { deepCopyFolder } from "./functions/deep-copy-folder";

// eslint-disable-next-line no-unused-vars, @typescript-eslint/no-unused-vars
const main_ = (a: string): void => {
    console.log(deepCopyFolder);
    console.log(changeAllConfig);
};
