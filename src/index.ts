/**
 * Add two numbers together.
 *
 * @param a number
 * @param b number
 */
export const sum = (a: number, b: number) => {
  if ('development' === process.env.NODE_ENV) {
    console.log('boop');
  }
  return a + b;
};
