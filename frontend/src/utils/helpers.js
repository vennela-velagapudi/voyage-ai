/**
 * Formats a date string to local locale format
 */
export function formatDate(date) {
  if (!date) return '';
  return new Date(date).toLocaleDateString(undefined, {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });
}

/**
 * Capitalizes the first letter of a string
 */
export function capitalize(str) {
  if (typeof str !== 'string') return '';
  return str.charAt(0).toUpperCase() + str.slice(1);
}
