export function randomScenario() {
  const scenarios = [
    1, // You
    2, // You -> MG
    3, // You -> MG -> You
    4, // You -> MG -> You -> MG
    5, // You -> MG -> You -> MG -> You
    6, // You -> MG -> You -> MG -> You -> MG
  ];

  return scenarios[
    Math.floor(Math.random() * scenarios.length)
  ];
}