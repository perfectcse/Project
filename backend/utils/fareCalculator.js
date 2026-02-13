exports.calculateFare = (distance) => {
  const baseFare = 30;
  const perKmRate = 12;

  return baseFare + distance * perKmRate;
};
