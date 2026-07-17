export function formatLkr(value: number): string {
  return `Rs. ${new Intl.NumberFormat("en-LK", {
    maximumFractionDigits: 0,
  }).format(value)}`;
}
