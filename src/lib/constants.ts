export const SITE_NAME = "Judith's Hub";
export const SITE_DESCRIPTION =
  'Affordable, beautiful, trendy fashion — pre-loved, recycled, and upcycled.';
export const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL ?? 'http://localhost:3000';
export const SITE_EMAIL = 'judithubon@gmail.com';
export const SITE_ADDRESS = '15 Ekpenyong street, Uyo, Akwa Ibom state';

export const CONDITION_LABELS: Record<string, string> = {
  'pre-loved': 'Pre-Loved',
  recycled: 'Recycled',
  upcycled: 'Upcycled',
};

export const ECO_IMPACT = {
  waterSavedPerItem: 2700, // litres
  co2SavedPerItem: 6.8, // kg
  wasteDivertedPerItem: 2.3, // kg
};
