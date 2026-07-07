import nodemailer from "nodemailer";

export interface SpacefarerMessage {
  firstName: string;
  lastName: string;
  email: string;
  originPlanet: string;
  stardustCollection: number;
  wormholeNavigationSkill: number;
  spacesuitColor?: string;
}

export async function sendCosmicNotification(
  spacefarer: SpacefarerMessage,
): Promise<void> {
  const mailAccount = await nodemailer.createTestAccount();

  const transporter = nodemailer.createTransport({
    host: "smtp.ethereal.email",
    port: 587,
    auth: {
      user: mailAccount.user,
      pass: mailAccount.pass,
    },
  });

  const info = await transporter.sendMail({
    from: '"Galactic Control Center" <control-center@galactic.sap>',

    to: spacefarer.email,

    subject: "🚀 Welcome Aboard the Galactic Adventure!",

    text: `
Dear ${spacefarer.firstName} ${spacefarer.lastName},

Congratulations!

You have been enrolled in the Galactic Spacefarer Adventure.

Origin planet:
${spacefarer.originPlanet}

Cosmic statistics:

✦ Stardust collected:
${spacefarer.stardustCollection}

✦ Wormhole navigation skill:
${spacefarer.wormholeNavigationSkill}/100

✦ Spacesuit color:
${spacefarer.spacesuitColor ?? "Silver"}

May your journey through the SAP-verse be stellar!

— Galactic Control Center
        `.trim(),
  });

  console.log(`[cosmic-mail] Message sent: ${info.messageId}`);

  console.log(
    `[cosmic-mail] Preview URL: ${nodemailer.getTestMessageUrl(info)}`,
  );
}
