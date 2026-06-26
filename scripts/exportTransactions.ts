import * as XLSX from "xlsx";
import { generateSeed } from "../src/generators/seedGenerator";

const accounts = generateSeed(410);

const data = accounts.map((account, index) => ({
  No: index + 1,
  ReceiverName: account.transaction.receiverName,
  ReferenceNumber: account.transaction.referenceNumber,
}));

const worksheet = XLSX.utils.json_to_sheet(data);

const workbook = XLSX.utils.book_new();

XLSX.utils.book_append_sheet(
  workbook,
  worksheet,
  "Transactions"
);

XLSX.writeFile(workbook, "transactions.xlsx");

console.log("✅ transactions.xlsx created");