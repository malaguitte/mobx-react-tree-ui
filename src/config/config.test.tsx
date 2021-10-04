import CONFIG from "./config";

// We expect 7 keys as of now, please update this variable in case the CONFIG keys change.
const EXPECTED_CONFIG_KEYS = 7;

it("CONFIG should not be undefined when importing it", () => {
    expect(CONFIG).not.toBe(undefined);
});

it("CONFIG has a key named RENDER_TREE_UI", () => {
    expect(CONFIG.RENDER_TREE_UI).not.toBe(undefined);
});

it("CONFIG has a key named RENDER_TREE_OUTPUT", () => {
    expect(CONFIG.RENDER_TREE_OUTPUT).not.toBe(undefined);
});

it("CONFIG should have the expected number keys", () => {
    expect(Object.keys(CONFIG).length).toBe(EXPECTED_CONFIG_KEYS);
});