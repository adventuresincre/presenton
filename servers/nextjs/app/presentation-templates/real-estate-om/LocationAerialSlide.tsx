import * as z from "zod";
import {
  AddressSchema,
  AerialImageSchema,
  KeyFactSchema,
  OmFooterSchema,
} from "./omSchemas";

export const Schema = z.object({
  title: z.string().min(1).max(40).default("Location").meta({
    description: "Section title — typically 'Location', 'Submarket Overview', or 'Trade Area'",
  }),
  address: AddressSchema,
  aerial: AerialImageSchema,
  locationFacts: z.array(KeyFactSchema).min(3).max(6).default([
    { label: "MSA", value: "Dallas–Fort Worth–Arlington" },
    { label: "Submarket", value: "North Plano" },
    { label: "1-Mi Population", value: "18,420 (+6.2% 5-yr)" },
    { label: "3-Mi Median HH Income", value: "$112,300" },
    { label: "Major Employers (5-Mi)", value: "Toyota NA HQ, Liberty Mutual, JPMC Plano" },
  ]).meta({
    description: "3 to 6 location and submarket facts that contextualize the aerial. Include MSA, submarket, demographic facts (population growth, HH income), and major employment drivers when relevant. Auto-populates from the A.CRE Intelligence Hub when a Hub API key is configured.",
  }),
  hubAttribution: z.string().max(80).optional().default("Demographics: A.CRE Intelligence Hub · ACS 2020-2024").meta({
    description: "Attribution line for location data sources, shown beneath the facts when present",
  }),
  footer: OmFooterSchema,
});
export type SchemaType = z.infer<typeof Schema>;

export const slideLayoutId = "om-location-aerial";
export const slideLayoutName = "OM Location Aerial";
export const slideLayoutDescription =
  "Location slide for an Offering Memorandum. Large aerial image of the subject property with the address overlay, plus 3-6 submarket context facts (MSA, submarket, demographics, major employers). Aerial auto-fetches from Google Maps Static via the A.CRE Intelligence Hub when a Hub key is configured.";

const LocationAerialSlide = ({ data }: { data: Partial<SchemaType> }) => {
  const { title, address, aerial, locationFacts, hubAttribution, footer } = data;
  const facts = locationFacts ?? [];
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

        <div className="flex-1 flex gap-8">
          <div className="flex-1 relative">
            {aerial?.url ? (
              <img
                src={aerial.url}
                alt={`Aerial of ${fullAddress}`}
                className="w-full h-[500px] object-cover rounded-sm"
              />
            ) : (
              <div className="w-full h-[500px] rounded-sm bg-gray-100 flex items-center justify-center text-gray-400 text-[14px]">
                Aerial image — upload or connect A.CRE Intelligence Hub
              </div>
            )}
            <div
              className="absolute bottom-3 left-3 px-3 py-2 rounded-sm text-white"
              style={{ backgroundColor: "rgba(15,26,43,0.85)" }}
            >
              <p className="text-[12px] tracking-[0.15em] uppercase opacity-80 leading-none mb-1">
                {aerial?.zoomLabel || "Site"}
              </p>
              <p className="text-[14px] font-semibold leading-tight">{fullAddress}</p>
            </div>
            {aerial?.source && (
              <p className="text-[10px] opacity-50 mt-1 italic">
                Imagery: {aerial.source}
              </p>
            )}
          </div>

          <div className="w-[340px] flex-shrink-0 flex flex-col">
            <div className="space-y-4">
              {facts.map((f, i) => (
                <div key={i} className="border-l-2 pl-3" style={{ borderColor: "var(--primary-color, #C9A35B)" }}>
                  <p className="text-[11px] tracking-[0.2em] uppercase opacity-70 mb-1">
                    {f.label}
                  </p>
                  <p className="text-[15px] font-semibold leading-tight">{f.value}</p>
                </div>
              ))}
            </div>
            {hubAttribution && (
              <p className="text-[10px] opacity-50 mt-auto pt-4 italic">{hubAttribution}</p>
            )}
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

export default LocationAerialSlide;
