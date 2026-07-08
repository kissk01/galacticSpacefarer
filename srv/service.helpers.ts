export interface SpacefarerCreate {
  firstName: string;
  lastName: string;
  email: string;
  originPlanet: string;
  spacesuitColor?: string;
  stardustCollection?: number;
  wormholeNavigationSkill?: number;
  position_ID?: string;
  positionId?: string;
}

export function syncPositionFields(data: SpacefarerCreate): void {
  if (data.positionId && !data.position_ID) {
    data.position_ID = data.positionId;
  }

  if (data.position_ID && !data.positionId) {
    data.positionId = data.position_ID;
  }
}

export function getValidationErrors(data: SpacefarerCreate): string[] {
  const errors: string[] = [];

  if ((data.stardustCollection ?? 0) < 0) {
    errors.push(
      `Stardust collection cannot be negative.${data.stardustCollection}`,
    );
  }

  if (
    data.wormholeNavigationSkill !== undefined &&
    (data.wormholeNavigationSkill < 0 || data.wormholeNavigationSkill > 100)
  ) {
    errors.push("Wormhole navigation skill must be between 0 and 100.");
  }

  return errors;
}

export function normalizeName(name: string): string {
  const trimmed = name.trim();

  return trimmed.charAt(0).toUpperCase() + trimmed.slice(1).toLowerCase();
}

export function normalizeData(data: SpacefarerCreate): void {
  data.firstName = normalizeName(data.firstName);
  data.lastName = normalizeName(data.lastName);
}

export function applyDefaults(data: SpacefarerCreate): void {
  if (!data.spacesuitColor) {
    data.spacesuitColor = "Silver";
  }

  if (data.stardustCollection == null) {
    data.stardustCollection = 0;
  }
}
