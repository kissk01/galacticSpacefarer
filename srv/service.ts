import cds from "@sap/cds";
import { sendCosmicNotification } from "./services/email.service";

interface SpacefarerCreate {
  firstName: string;

  lastName: string;

  email: string;

  originPlanet: string;

  spacesuitColor?: string;

  stardustCollection?: number;

  wormholeNavigationSkill?: number;

  position_ID: string;
}

export default cds.service.impl(function () {
  const { Spacefarers } = this.entities;
  this.before("CREATE", Spacefarers, async (req) => {
    const data = req.data as SpacefarerCreate;
    const planet = req.user.attr?.planet;

    console.log({
      id: req.user.id,
      attr: req.user.attr,
      additional: req.user,
    });

    if (!planet) {
      req.reject(403, "User has no planet assigned");
    }

    req.data.originPlanet = planet;

    if ((data.stardustCollection ?? 0) < 0) {
      req.error(
        400,
        "Stardust collection cannot be negative." + data.stardustCollection,
      );
    }
    if (data.wormholeNavigationSkill !== undefined) {
      if (
        data.wormholeNavigationSkill < 0 ||
        data.wormholeNavigationSkill > 100
      ) {
        req.error(400, "Wormhole navigation skill must be between 0 and 100.");
      }
    }

    function normalizeName(name: string): string {
      const trimmed = name.trim();

      return trimmed.charAt(0).toUpperCase() + trimmed.slice(1).toLowerCase();
    }

    data.firstName = normalizeName(data.firstName);
    data.lastName = normalizeName(data.lastName);

    if (!data.spacesuitColor) {
      data.spacesuitColor = "Silver";
    }

    if (data.stardustCollection == null) {
      data.stardustCollection = 0;
    }
  });

  this.before("READ", Spacefarers, async (req) => {
    const planet = req.user.attr?.planet;

    if (!planet) {
      req.reject(403, "No planet assigned to user");
    }

    const where = req.query.SELECT?.where;

    if (where && where.length > 0) {
      req.query.SELECT!.where = [
        ...where,
        "and",
        {
          ref: ["originPlanet"],
        },
        "=",
        {
          val: planet,
        },
      ];
    } else {
      req.query.SELECT!.where = [
        {
          ref: ["originPlanet"],
        },
        "=",
        {
          val: planet,
        },
      ];
    }
  });

  this.after("CREATE", Spacefarers, async (_, req) => {
    const spacefarer = req.data as SpacefarerCreate;
    console.log("Sending email to:", spacefarer.email);
    console.log(spacefarer, " spacefarer create ");
    await sendCosmicNotification({
      firstName: spacefarer.firstName,
      lastName: spacefarer.lastName,
      email: spacefarer.email,
      originPlanet: spacefarer.originPlanet,
      stardustCollection: spacefarer.stardustCollection ?? 0,
      wormholeNavigationSkill: spacefarer.wormholeNavigationSkill ?? 0,
      spacesuitColor: spacefarer.spacesuitColor,
    });
  });
});
