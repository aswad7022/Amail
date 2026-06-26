export function randomBetween(
  from: Date,
  to: Date
) {
  return new Date(
    from.getTime() +
      Math.random() *
        (to.getTime() - from.getTime())
  );
}

export function addDays(
  date: Date,
  min: number,
  max: number
) {
  const days =
    Math.floor(
      Math.random() * (max - min + 1)
    ) + min;

  return new Date(
    date.getTime() +
      days * 24 * 60 * 60 * 1000
  );
}