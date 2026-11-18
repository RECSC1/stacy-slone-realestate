export const FORM_FIELDS = {
  'stacy-contact': ['name','email','phone','message'],
  'stacy-buyer-inquiry': ['name','email','phone','timeline','priceRange','interests','message','criteria'],
  'stacy-seller-inquiry': ['name','email','phone','propertyAddress','timeline','sellingReason','message'],
  'stacy-home-valuation': ['name','email','phone','propertyAddress','timeline','sellingPlans','notes'],
  'stacy-property-alerts': ['name','email','phone','area','priceRange','propertyType','beds','baths','timeline','notes'],
  'stacy-relocation-inquiry': ['name','email','phone','currentLocation','timeline','relocatingReason','message'],
  'stacy-land-investment-inquiry': ['name','email','phone','investmentType','budget','timeline','message'],
} as const;
export type FormName = keyof typeof FORM_FIELDS;
export const FORM_ENDPOINT = '/__forms.html';
