import * as z from "zod";
import {
  AddressSchema,
  BrokerContactSchema,
  PropertyPhotoSchema,
  PropertyTypeSchema,
} from "./omSchemas";

export const Schema = z.object({
  propertyName: z.string().min(1).max(60).default("Maple Ridge Apartments").meta({
    description: "Marketing name of the subject property as it should appear on the OM cover",
  }),
  propertyTypeLabel: z.string().min(1).max(40).default("Class B Multifamily").meta({
    description: "Short human label for the property type and class (e.g. 'Class B Multifamily', 'Single-Tenant Net Lease', 'Class A Industrial — Last Mile')",
  }),
  propertyType: PropertyTypeSchema.default("multifamily"),
  address: AddressSchema,
  askingPrice: z.string().min(1).max(30).default("$24,500,000").meta({
    description: "Asking price formatted for display, or 'Call for Pricing'",
  }),
  capRate: z.string().min(1).max(20).default("5.80% Cap").meta({
    description: "Headline cap rate label (e.g. '5.80% Cap', 'Unpriced', '6.25% Y1 / 7.10% Y3')",
  }),
  heroPhoto: PropertyPhotoSchema,
  broker: BrokerContactSchema,
  confidentialityLabel: z.string().min(1).max(60).default("Confidential Offering Memorandum").meta({
    description: "Top-of-cover confidentiality tag",
  }),
  generatedByAcre: z.boolean().default(true).meta({
    description: "Show A.CRE open-source attribution on the cover. Off for white-labeled distribution.",
  }),
});
export type SchemaType = z.infer<typeof Schema>;

export const slideLayoutId = "om-cover";
export const slideLayoutName = "OM Cover";
export const slideLayoutDescription =
  "Offering Memorandum cover slide. Full-bleed hero photo of the subject property, confidentiality tag, property name, address, asking price, headline cap rate, and listing broker contact block. First slide of every OM.";

const OmCoverSlide = ({ data }: { data: Partial<SchemaType> }) => {
  const {
    propertyName,
    propertyTypeLabel,
    address,
    askingPrice,
    capRate,
    heroPhoto,
    broker,
    confidentialityLabel,
    generatedByAcre,
  } = data;

  const fullAddress = address
    ? `${address.street}, ${address.city}, ${address.state} ${address.zip}`
    : "";

  return (
    <>
      <link
        href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700;800&family=Source+Serif+4:wght@400;600;700&display=swap"
        rel="stylesheet"
      />
      <div
        className="relative w-[1280px] h-[720px] aspect-video overflow-hidden bg-[#0F1A2B]"
        style={{
          backgroundColor: "var(--background-color, #0F1A2B)",
          fontFamily: "var(--body-font-family, 'Inter')",
        }}
      >
        {heroPhoto?.url && (
          <img
            src={heroPhoto.url}
            alt={propertyName || "Subject property"}
            className="absolute inset-0 w-full h-full object-cover"
          />
        )}

        <div
          className="absolute inset-0"
          style={{
            background:
              "linear-gradient(180deg, rgba(15,26,43,0.55) 0%, rgba(15,26,43,0.25) 45%, rgba(15,26,43,0.85) 100%)",
          }}
        />

        <div className="absolute top-10 left-12 right-12 flex justify-between items-center text-white">
          <span className="text-[14px] tracking-[0.25em] uppercase font-medium opacity-90">
            {confidentialityLabel}
          </span>
          <span
            className="text-[12px] tracking-[0.2em] uppercase font-semibold px-3 py-1 rounded-sm"
            style={{
              backgroundColor: "var(--primary-color, #C9A35B)",
              color: "var(--primary-text, #0F1A2B)",
            }}
          >
            {propertyTypeLabel}
          </span>
        </div>

        <div className="absolute left-12 right-12 bottom-[200px] text-white">
          <h1
            className="text-[72px] leading-[1.05] font-semibold mb-3"
            style={{ fontFamily: "var(--heading-font-family, 'Source Serif 4')" }}
          >
            {propertyName}
          </h1>
          <p className="text-[20px] font-light opacity-90">{fullAddress}</p>
        </div>

        <div className="absolute bottom-12 left-12 right-12 flex justify-between items-end text-white">
          <div className="flex gap-12">
            <div>
              <p className="text-[11px] tracking-[0.25em] uppercase opacity-70 mb-1">
                Asking Price
              </p>
              <p className="text-[32px] font-semibold leading-none">{askingPrice}</p>
            </div>
            <div>
              <p className="text-[11px] tracking-[0.25em] uppercase opacity-70 mb-1">
                Pricing
              </p>
              <p className="text-[32px] font-semibold leading-none">{capRate}</p>
            </div>
          </div>

          {broker && (
            <div className="text-right">
              <p className="text-[11px] tracking-[0.25em] uppercase opacity-70 mb-2">
                Listed By
              </p>
              <p className="text-[18px] font-semibold leading-tight">{broker.name}</p>
              <p className="text-[13px] opacity-90 leading-tight">{broker.title}</p>
              <p className="text-[13px] opacity-90 leading-tight">{broker.firm}</p>
              <p className="text-[12px] opacity-80 mt-1 leading-tight">
                {broker.phone} · {broker.email}
              </p>
            </div>
          )}
        </div>

        {generatedByAcre && (
          <div className="absolute bottom-2 left-12 right-12 flex justify-center">
            <p className="text-[10px] tracking-[0.2em] uppercase text-white opacity-50">
              Generated with A.CRE OM · adventuresincre.com
            </p>
          </div>
        )}
      </div>
    </>
  );
};

export default OmCoverSlide;
