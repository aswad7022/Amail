import { generateSeed } from "../generators/seedGenerator";
import { setAccounts } from "./database";

let initialized = false;

export function initDatabase() {
  if (initialized) return;

  const accounts = generateSeed(410);

  setAccounts(accounts);

  initialized = true;
}