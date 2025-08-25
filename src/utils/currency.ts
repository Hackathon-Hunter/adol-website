/**
 * Format a number as Indonesian Rupiah currency
 * @param amount - The amount to format
 * @returns Formatted currency string
 */
export function formatRupiah(amount: number | bigint | string | undefined | null): string {
  if (amount === undefined || amount === null) {
    return 'Rp 0';
  }
  
  const numAmount = typeof amount === 'string' ? parseFloat(amount) : Number(amount);
  
  if (isNaN(numAmount)) {
    return 'Rp 0';
  }

  return new Intl.NumberFormat('id-ID', {
    style: 'currency',
    currency: 'IDR',
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(numAmount);
}

/**
 * Format a number as Indonesian Rupiah without currency symbol
 * @param amount - The amount to format
 * @returns Formatted number string with thousand separators
 */
export function formatRupiahNumber(amount: number | bigint | string): string {
  const numAmount = typeof amount === 'string' ? parseFloat(amount) : Number(amount);
  
  if (isNaN(numAmount)) {
    return '0';
  }

  return new Intl.NumberFormat('id-ID').format(numAmount);
}
