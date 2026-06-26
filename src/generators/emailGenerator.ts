const usedEmails = new Set<string>();

function random(min: number, max: number) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

function clean(value: string) {
  return value
    .toLowerCase()
    .replace(/[^a-z]/g, "");
}

export function generateEmail(
  firstName: string,
  fatherName: string
): string {

  const first = clean(firstName);
  const father = clean(fatherName);

  while (true) {

    const patterns = [

      `${first}${random(100,9999)}`,

      `${first}.${random(1000,9999)}`,

      `${first}${random(10,99)}${father[0]}`,

      `${first}.${father}${random(10,99)}`,

      `${first}_${random(100,999)}`,

      `${first}${random(1980,2006)}`,

      `${first}.${random(1980,2006)}`,

      `${first}${father}${random(1,99)}`,

      `${first}.${father[0]}${random(100,999)}`,

      `${first}${random(1000,9999)}.${father[0]}`,

      `${first}${random(100,999)}mail`,

      `${first}${random(100,999)}work`,

      `${first}${random(100,999)}iq`,

      `${first}${random(100,999)}iraq`,

      `${first}${father[0]}${random(1000,9999)}`,

      `${first}.${father[0]}${random(10,99)}`,

      `${first}${random(100,999)}x`,

      `${first}${random(100,999)}a`,

      `${first}${random(100,999)}m`,

      `${first}.${father}.${random(10,99)}`
    ];

    const localPart =
      patterns[random(0, patterns.length - 1)];

    const email =
      `${localPart}@gmail.com`;

    if (usedEmails.has(email)) continue;

    usedEmails.add(email);

    return email;
  }
}