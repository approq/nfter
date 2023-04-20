import "@testing-library/jest-dom";

import MockDate from "mockdate";
import React from "react";

beforeEach(() => {
    MockDate.set(new Date("2023-03-01T00:00:00"));
});

afterEach(() => {
    MockDate.reset();
});

afterAll(() => {
    // Run garbage collector after each test file.
    if (global.gc) {
        global.gc();
    }
});

window.IS_REACT_ACT_ENVIRONMENT = true;
