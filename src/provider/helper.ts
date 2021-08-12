/**
 * Function to generator array of random numbers.
 * @param {number} length of random numbers.
 * @param {string} product to decide the different dataset.
 * @returns {Array}
 */
export function randomGenerator(range: number, product: string) {
  let multipler = product === 'product-a' ? 100 : 1000;

  let arr = [];
  while (arr.length <= range) {
    var r = Math.floor(Math.random() * multipler) + 1;
    if (arr.indexOf(r) === -1) arr.push(r);
  }
  return arr;
}
