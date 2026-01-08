export const getAlternateVariants = (index, distance = 30) => ({
  hidden: {
    opacity: 0,
    x: index % 2 === 0 ? distance : -distance,
  },
  visible: {
    opacity: 1,
    x: 0,
  },
});
