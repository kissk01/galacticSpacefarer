import cds from "@sap/cds";
import { sendCosmicNotification } from "./services/email.service";
import {
  applyDefaults,
  getValidationErrors,
  normalizeData,
  type SpacefarerCreate,
  syncPositionFields,
} from "./service.helpers";

function getPlanetOrReject(req: cds.Request, message: string): string {
  const planet = req.user.attr?.planet;

  if (!planet) {
    req.reject(403, message);
  }

  return planet as string;
}

function logUserContext(req: cds.Request): void {
  console.log({
    id: req.user.id,
    attr: req.user.attr,
    additional: req.user,
  });
}

function validateData(req: cds.Request, data: SpacefarerCreate): void {
  for (const error of getValidationErrors(data)) {
    req.error(400, error);
  }
}

function restrictReadToPlanet(req: cds.Request, planet: string): void {
  const where = req.query.SELECT?.where;
  const planetFilter = [{ ref: ["originPlanet"] }, "=", { val: planet }];

  req.query.SELECT!.where =
    where && where.length > 0 ? [...where, "and", ...planetFilter] : planetFilter;
}

async function sendCreateNotification(data: SpacefarerCreate): Promise<void> {
  console.log("Sending email to:", data.email);
  console.log(data, " spacefarer create ");

  await sendCosmicNotification({
    firstName: data.firstName,
    lastName: data.lastName,
    email: data.email,
    originPlanet: data.originPlanet,
    stardustCollection: data.stardustCollection ?? 0,
    wormholeNavigationSkill: data.wormholeNavigationSkill ?? 0,
    spacesuitColor: data.spacesuitColor,
  });
}

export default cds.service.impl(function () {
  const { Spacefarers } = this.entities;

  this.before(["NEW", "PATCH", "CREATE", "UPDATE"], Spacefarers, (req) => {
    syncPositionFields(req.data as SpacefarerCreate);
  });

  this.before("CREATE", Spacefarers, (req) => {
    const data = req.data as SpacefarerCreate;
    const planet = getPlanetOrReject(req, "User has no planet assigned");

    logUserContext(req);
    req.data.originPlanet = planet;
    validateData(req, data);
    normalizeData(data);
    applyDefaults(data);
  });

  this.before("READ", Spacefarers, (req) => {
    const planet = getPlanetOrReject(req, "No planet assigned to user");
    restrictReadToPlanet(req, planet);
  });

  this.after("CREATE", Spacefarers, async (_, req) => {
    await sendCreateNotification(req.data as SpacefarerCreate);
  });
});
