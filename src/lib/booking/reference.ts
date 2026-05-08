export function createBookingReference(): string {
  const t = Date.now().toString(36).toUpperCase().slice(-6);
  return `MZ-${t}`;
}
