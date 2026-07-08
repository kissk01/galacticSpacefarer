import test from "node:test";
import assert from "node:assert/strict";

import {
  applyDefaults,
  getValidationErrors,
  normalizeData,
  syncPositionFields,
  type SpacefarerCreate,
} from "../srv/service.helpers";

function createSpacefarer(
  overrides: Partial<SpacefarerCreate> = {},
): SpacefarerCreate {
  return {
    firstName: "jANE",
    lastName: "doE",
    email: "jane.doe@example.com",
    originPlanet: "Earth",
    ...overrides,
  };
}

test("syncPositionFields copies positionId into position_ID", () => {
  const data = createSpacefarer({ positionId: "role-123" });

  syncPositionFields(data);

  assert.equal(data.position_ID, "role-123");
});

test("syncPositionFields copies position_ID into positionId", () => {
  const data = createSpacefarer({ position_ID: "role-456" });

  syncPositionFields(data);

  assert.equal(data.positionId, "role-456");
});

test("normalizeData trims and capitalizes names", () => {
  const data = createSpacefarer({
    firstName: "  aLICE ",
    lastName: " joHNSON  ",
  });

  normalizeData(data);

  assert.equal(data.firstName, "Alice");
  assert.equal(data.lastName, "Johnson");
});

test("applyDefaults fills optional values", () => {
  const data = createSpacefarer();

  applyDefaults(data);

  assert.equal(data.spacesuitColor, "Silver");
  assert.equal(data.stardustCollection, 0);
});

test("getValidationErrors reports invalid numeric fields", () => {
  const data = createSpacefarer({
    stardustCollection: -1,
    wormholeNavigationSkill: 120,
  });

  assert.deepEqual(getValidationErrors(data), [
    "Stardust collection cannot be negative.-1",
    "Wormhole navigation skill must be between 0 and 100.",
  ]);
});
