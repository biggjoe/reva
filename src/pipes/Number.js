export default function numberWithCommas(x) {
  let input = typeof x === "number" ? x : parseFloat(x);
  return input.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
}
