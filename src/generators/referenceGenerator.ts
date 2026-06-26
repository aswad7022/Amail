const used = new Set<string>();

export function generateReferenceNumber() {
  while (true) {
    const number = Math.floor(
      10000000 + Math.random() * 90000000
    ).toString();

    if (!used.has(number)) {
      used.add(number);
      return number;
    }
  }
}