import { generatePerson } from "./iraqiNames";

export function generateReceiver() {
  return generatePerson().fullName;
}