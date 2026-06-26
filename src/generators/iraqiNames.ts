import { maleFirstNames } from "../data/names/maleFirstNames";
import { femaleFirstNames } from "../data/names/femaleFirstNames";
import { maleMiddleNames } from "../data/names/maleMiddleNames";
import { iraqiLastNames } from "../data/names/iraqiLastNames";

export type Gender = "male" | "female";

export interface IraqiPerson {
  gender: Gender;
  firstName: string;
  fatherName: string;
  grandfatherName: string;
  lastName: string;
  fullName: string;
}

const usedFullNames = new Set<string>();

function randomItem<T>(array: T[]): T {
  if (array.length === 0) {
    throw new Error(
      "One of the name arrays is empty. Please fill the name lists first."
    );
  }

  return array[Math.floor(Math.random() * array.length)];
}

function buildMaleName(): IraqiPerson {
  let attempts = 0;

  while (attempts < 100) {
    attempts++;

    const firstName = randomItem(maleFirstNames);

    let fatherName = randomItem(maleMiddleNames);
    while (fatherName === firstName) {
      fatherName = randomItem(maleMiddleNames);
    }

    let grandfatherName = randomItem(maleMiddleNames);
    while (
      grandfatherName === firstName ||
      grandfatherName === fatherName
    ) {
      grandfatherName = randomItem(maleMiddleNames);
    }

    const lastName =
      Math.random() < 0.12
        ? grandfatherName
        : randomItem(iraqiLastNames);

    const fullName = `${firstName} ${fatherName} ${grandfatherName} ${lastName}`;

    if (usedFullNames.has(fullName)) continue;

    usedFullNames.add(fullName);

    return {
      gender: "male",
      firstName,
      fatherName,
      grandfatherName,
      lastName,
      fullName,
    };
  }

  throw new Error("Unable to generate a unique male name.");
}

function buildFemaleName(): IraqiPerson {
  let attempts = 0;

  while (attempts < 100) {
    attempts++;

    const firstName = randomItem(femaleFirstNames);

    const fatherName = randomItem(maleMiddleNames);

    let grandfatherName = randomItem(maleMiddleNames);

    while (grandfatherName === fatherName) {
      grandfatherName = randomItem(maleMiddleNames);
    }

    const lastName =
      Math.random() < 0.12
        ? grandfatherName
        : randomItem(iraqiLastNames);

    const fullName = `${firstName} ${fatherName} ${grandfatherName} ${lastName}`;

    if (usedFullNames.has(fullName)) continue;

    usedFullNames.add(fullName);

    return {
      gender: "female",
      firstName,
      fatherName,
      grandfatherName,
      lastName,
      fullName,
    };
  }

  throw new Error("Unable to generate a unique female name.");
}

export function generatePerson(
  gender?: Gender
): IraqiPerson {
  const selectedGender =
    gender ?? (Math.random() < 0.65 ? "male" : "female");

  return selectedGender === "male"
    ? buildMaleName()
    : buildFemaleName();
}