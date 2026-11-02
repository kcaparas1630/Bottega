const priceFormatter = new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD' });

export function formatPrice(priceCents: number) {
  return priceFormatter.format(priceCents / 100);
}
