export default function currencyFormat(number: number) {
  return "$" + number.toFixed(2).replace(/(\d)(?=(\d{3})+(?!\d))/g, "$1,");
}
