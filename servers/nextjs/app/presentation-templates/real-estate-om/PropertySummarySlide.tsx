import * as z from "zod";
import {
  AddressSchema,
  KeyFactSchema,
  OmFooterSchema,
  PropertyPhotoSchema,
} from "./omSchemas";

export const Schema = z.object({
  title: z.string().min(1).max(40).default("Property Summary").meta({
    description: "Section title — typically 'Property Summary' or 'Property Overview'",
  }),
  propertyName: z.string().min(1).max(60).default("Maple Ridge Apartments").meta({
    description: "Property marketing name",
  }),
  address: AddressSchema,
  keyFacts: z.array(KeyFactSchema).min(6).max(14).default([
    { label: "Year Built", value: "1998" },
    { label: "Year Renovated", value: "2019 (partial)" },
    { label: "Units", value: "212" },
    { label: "Avg Unit Size", value: "892 SF" },
    { label: "Rentable SF", value: "189,104 SF" },
    { label: "Site Size", value: "8.4 acres" },
    { label: "Occupancy (T-12)", value: "93.8%" },
    { label: "Parking", value: "1.8 / unit (surface)" },
    { label: "Construction", value: "Wood frame, 3-story" },
    { label: "Submarket", value: "North Suburban" },
  ]).meta({
    description: "6 to 14 key facts about the property. Asset-class-appropriate fields: multifamily uses units/avg unit size/parking; industrial uses clear height/dock doors/column spacing; office uses floor plates/parking ratio/typical floor; retail uses GLA/anchor/co-tenancy. Always include Year Built and Submarket.",
  }),
  primaryPhoto: PropertyPhotoSchema,
  footer: OmFooterSchema,
});
export type SchemaType = z.infer<typeof Schema>;

export const slideLayoutId = "om-property-summary";
export const slideLayoutName = "OM Property Summary";
export const slideLayoutDescription =
  "Property Summary slide for an Offering Memorandum. Left side: primary property photo. Right side: 6-14 asset-class-appropriate key facts in a two-column label/value grid (year built, units, SF, occupancy, parking, construction, etc.).";

const PropertySummarySlide = ({ data }: { data: Partial<SchemaType> }) => {
  const { title, propertyName, address, keyFacts, primaryPhoto, footer } = data;
  const facts = keyFacts ?? [];
  const fullAddress = address
    ? `${address.street}, ${address.city}, ${address.state} ${address.zip}`
    : "";

  return (
    <>
      <link
        href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700&family=Source+Serif+4:wght@400;600;700&display=swap"
        rel="stylesheet"
      />
      <div
        className="relative w-[1280px] h-[720px] aspect-video bg-white px-12 py-12 flex flex-col"
        style={{
          backgroundColor: "var(--background-color, #FFFFFF)",
          color: "var(--background-text, #0F1A2B)",
          fontFamily: "var(--body-font-family, 'Inter')",
        }}
      >
        <div className="flex items-baseline justify-between mb-8">
          <h2
            className="text-[40px] font-semibold leading-none"
            style={{ fontFamily: "var(--heading-font-family, 'Source Serif 4')" }}
          >
            {title}
          </h2>
          <div
            className="h-[3px] w-[120px]"
            style={{ backgroundColor: "var(--primary-color, #C9A35B)" }}
          />
        </div>

        <div className="flex-1 flex gap-10">
          {primaryPhoto?.url && (
            <div className="w-[520px] flex-shrink-0">
              <img
                src={primaryPhoto.url}
                alt={propertyName || "Subject property"}
                className="w-full h-[500px] object-cover rounded-sm"
              />
              {primaryPhoto.caption && (
                <p className="text-[12px] opacity-60 mt-2 italic">{primaryPhoto.caption}</p>
              )}
            </div>
          )}

          <div className="flex-1 flex flex-col">
            <p className="text-[24px] font-semibold leading-tight mb-1">{propertyName}</p>
            <p className="text-[14px] opacity-70 mb-6">{fullAddress}</p>

            <div className="grid grid-cols-2 gap-x-6 gap-y-3">
              {facts.map((f, i) => (
                <div
                  key={i}
                  className="flex justify-between items-baseline border-b border-black/10 pb-2"
                >
                  <span className="text-[12px] tracking-[0.15em] uppercase opacity-70">
                    {f.label}
                  </span>
                  <span className="text-[14px] font-semibold text-right">{f.value}</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {footer && (
          <div className="absolute bottom-4 left-12 right-12 flex justify-between text-[10px] tracking-[0.15em] uppercase opacity-50">
            <span>{footer.brokerage}</span>
            <span>{footer.propertyShortName}</span>
            <span>{footer.confidentialityLabel}</span>
          </div>
        )}
      </div>
    </>
  );
};

export default PropertySummarySlide;
