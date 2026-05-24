import * as z from "zod";

export const AddressSchema = z.object({
  street: z.string().min(1).max(80).default("123 Main Street").meta({
    description: "Street address of the subject property",
  }),
  city: z.string().min(1).max(40).default("Anytown").meta({
    description: "City",
  }),
  state: z.string().min(2).max(2).default("TX").meta({
    description: "Two-letter US state code (e.g. TX, CA, NY)",
  }),
  zip: z.string().min(5).max(10).default("75001").meta({
    description: "US ZIP or ZIP+4",
  }),
});
export type AddressType = z.infer<typeof AddressSchema>;

export const BrokerContactSchema = z.object({
  name: z.string().min(1).max(60).default("Jane Broker").meta({
    description: "Listing broker full name",
  }),
  title: z.string().min(1).max(60).default("Senior Managing Director").meta({
    description: "Listing broker title",
  }),
  firm: z.string().min(1).max(60).default("Brokerage Firm Name").meta({
    description: "Listing brokerage firm name",
  }),
  phone: z.string().min(7).max(20).default("(555) 555-1234").meta({
    description: "Listing broker direct phone",
  }),
  email: z.string().min(5).max(80).default("jbroker@firm.com").meta({
    description: "Listing broker email",
  }),
  license: z.string().min(1).max(40).optional().default("TX RE License #123456").meta({
    description: "State real estate license number (per state disclosure rules)",
  }),
});
export type BrokerContactType = z.infer<typeof BrokerContactSchema>;

export const KeyFactSchema = z.object({
  label: z.string().min(1).max(30).meta({
    description: "Label for the key fact (e.g. 'Year Built', 'Rentable SF', 'Units', 'Occupancy')",
  }),
  value: z.string().min(1).max(40).meta({
    description: "Display value for the key fact (e.g. '1998', '128,450 SF', '212 units', '93.8%')",
  }),
});
export type KeyFactType = z.infer<typeof KeyFactSchema>;

export const FinancialMetricSchema = z.object({
  label: z.string().min(1).max(30).meta({
    description: "Metric label (e.g. 'Asking Price', 'NOI', 'Cap Rate', 'Price / Unit', 'GRM')",
  }),
  value: z.string().min(1).max(30).meta({
    description: "Display value for the metric, formatted for human reading (e.g. '$24,500,000', '$1,420,000', '5.80%', '$115,566', '8.2x')",
  }),
  caveat: z.string().max(60).optional().meta({
    description: "Optional small-print caveat (e.g. 'In-place', 'Year 1 stabilized', 'On T-12')",
  }),
});
export type FinancialMetricType = z.infer<typeof FinancialMetricSchema>;

export const PropertyTypeSchema = z.enum([
  "multifamily",
  "retail-stnl",
  "retail-multi-tenant",
  "office",
  "industrial",
  "hospitality",
  "self-storage",
  "manufactured-housing",
  "senior-housing",
  "student-housing",
  "medical-office",
  "life-sciences",
  "data-center",
  "land",
  "mixed-use",
  "specialty",
]).meta({
  description: "Property type / asset class. Drives which slide layouts are appropriate and which data fields are required.",
});
export type PropertyTypeType = z.infer<typeof PropertyTypeSchema>;

export const DealStageSchema = z.enum([
  "stabilized",
  "value-add",
  "opportunistic",
  "development",
]).meta({
  description: "Deal stage / risk profile. Drives narrative emphasis (cash flow vs. upside vs. vision vs. entitlement).",
});
export type DealStageType = z.infer<typeof DealStageSchema>;

export const PropertyPhotoSchema = z.object({
  url: z.url().meta({
    description: "Public URL to a property photo (uploaded by broker, hosted by the OM service)",
  }),
  caption: z.string().max(80).optional().meta({
    description: "Optional caption (e.g. 'Pool deck and clubhouse', 'Truck court — north elevation')",
  }),
});
export type PropertyPhotoType = z.infer<typeof PropertyPhotoSchema>;

export const AerialImageSchema = z.object({
  url: z.url().meta({
    description: "Aerial image URL. Sourced from Google Maps Static API via the A.CRE Intelligence Hub when a Hub key is configured; otherwise uploaded by the broker.",
  }),
  source: z.string().max(60).optional().default("Google Maps").meta({
    description: "Attribution string for the aerial image (e.g. 'Google Maps', 'Nearmap', 'A.CRE Intelligence Hub')",
  }),
  zoomLabel: z.string().max(30).optional().meta({
    description: "Optional zoom-level label for context (e.g. 'Submarket', 'Site close-up', '1-mile radius')",
  }),
});
export type AerialImageType = z.infer<typeof AerialImageSchema>;

export const OmFooterSchema = z.object({
  brokerage: z.string().min(1).max(60).default("Brokerage Firm Name").meta({
    description: "Listing brokerage name shown in the slide footer",
  }),
  propertyShortName: z.string().min(1).max(40).default("Subject Property").meta({
    description: "Short property name for the footer (e.g. 'Maple Ridge Apartments')",
  }),
  confidentialityLabel: z.string().min(1).max(40).default("Confidential — Do Not Distribute").meta({
    description: "Confidentiality notice shown in the slide footer",
  }),
  generatedByAcre: z.boolean().default(true).meta({
    description: "Show A.CRE attribution in the footer. Off by default for white-labeled distribution; on by default in the open-source build.",
  }),
});
export type OmFooterType = z.infer<typeof OmFooterSchema>;
