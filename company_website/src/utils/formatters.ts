/**
 * Formats a number to Philippine Peso currency (₱1,234.56 or ₱1,234)
 */
export function formatCurrency(amount: number, showCents: boolean = false): string {
  if (isNaN(amount)) return '₱0';
  return `₱${new Intl.NumberFormat('en-PH', {
    minimumFractionDigits: showCents ? 2 : 0,
    maximumFractionDigits: showCents ? 2 : 0,
  }).format(amount)}`;
}

/**
 * Formats a number with comma separators (e.g. 50,000)
 */
export function formatNumber(val: number): string {
  if (isNaN(val)) return '0';
  return new Intl.NumberFormat('en-US').format(val);
}

/**
 * Formats percentage e.g. 5.99%
 */
export function formatPercent(rate: number, decimals: number = 2): string {
  if (isNaN(rate)) return '0%';
  return `${rate.toFixed(decimals)}%`;
}

/**
 * Formats human readable date
 */
export function formatDate(dateStringOrTimestamp: string | number | Date): string {
  try {
    const d = new Date(dateStringOrTimestamp);
    return d.toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
    });
  } catch {
    return String(dateStringOrTimestamp);
  }
}

/**
 * Formats phone number string into (XXX) XXX-XXXX
 */
export function formatPhoneNumber(phone: string): string {
  const cleaned = ('' + phone).replace(/\D/g, '');
  const match = cleaned.match(/^(\d{3})(\d{3})(\d{4})$/);
  if (match) {
    return '(' + match[1] + ') ' + match[2] + '-' + match[3];
  }
  return phone;
}
