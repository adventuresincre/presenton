import * as z from "zod";
import { OmFooterSchema, PropertyPhotoSchema } from "./omSchemas";

const HighlightSchema = z.object({
  headline: z.string().min(1).max(50).meta({
    description: "Short headline for one investment highlight (e.g. 'Below-Market Rents', 'Investment-Grade Tenant', 'Irreplaceable Infill Location')",
  }),
  detail: z.string().min(1).max(180).meta({
    description: "One- to two-sentence explanation supporting the headline with specifics, ideally with a number or comparable",
  }),
});

export const Schema = z.object({
  title: z.string().min(1).max(40).default("Investment Highlights").meta({
    description: "Section title — typically 'Investment Highlights' or 'Why <Property Name>'",
  }),
  highlights: z.array(HighlightSchema).min(3).max(6).default([
    {
      headline: "Below-Market Rents",
      detail: "In-place rents are ~14% below comparable Class B properties within a 2-mile radius, supporting a clear value-add thesis with no capex required.",
    },
    {
      headline: "Strong Infill Location",
      detail: "Walkable to grocery, retail, and three major employment nodes; 1-mile population grew 6.2% over the past five years vs. 3.8% for the MSA.",
    },
    {
      headline: "Stabilized Cash Flow",
      detail: "T-12 occupancy of 93.8% and ~$1.42M NOI provides immediate cash flow with limited execution risk for an incoming sponsor.",
    },
    {
      headline: "Assumable Financing",
      detail: "Existing agency loan at 4.10% with ~7 years remaining is fully assumable, delivering a meaningful spread to current market rates.",
    },
  ]).meta({
    description: "3 to 6 investment highlights. Each is a short headline plus a specific, evidence-backed one- to two-sentence explanation. Avoid generic marketing claims — every highlight should include a number, comparable, or named fact.",
  }),
  supportingPhoto: PropertyPhotoSchema.optional(),
  footer: OmFooterSchema,
});
export type SchemaType = z.infer<typeof Schema>;

export const slideLayoutId = "om-investment-highlights";
export const slideLayoutName = "OM Investment Highlights";
export const slideLayoutDescription =
  "Investment Highlights slide for an Offering Memorandum. 3-6 numbered highlights with a short headline and a specific, evidence-backed one- to two-sentence detail. Optional supporting property photo on the right.";

const InvestmentHighlightsSlide = ({ data }: { data: Partial<SchemaType> }) => {
  const { title, highlights, supportingPhoto, footer } = data;
  const items = highlights ?? [];

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
          <div className={supportingPhoto?.url ? "flex-1" : "w-full"}>
            <ol className="space-y-5">
              {items.map((h, i) => (
                <li key={i} className="flex gap-5">
                  <span
                    className="flex-shrink-0 w-10 h-10 rounded-full flex items-center justify-center text-[16px] font-semibold"
                    style={{
                      backgroundColor: "var(--primary-color, #C9A35B)",
                      color: "var(--primary-text, #0F1A2B)",
                    }}
                  >
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  <div className="flex-1 pt-1">
                    <p className="text-[18px] font-semibold leading-tight mb-1">
                      {h.headline}
                    </p>
                    <p className="text-[14px] leading-snug opacity-80">{h.detail}</p>
                  </div>
                </li>
              ))}
            </ol>
          </div>

          {supportingPhoto?.url && (
            <div className="w-[420px] flex-shrink-0">
              <img
                src={supportingPhoto.url}
                alt={supportingPhoto.caption || "Subject property"}
                className="w-full h-[480px] object-cover rounded-sm"
              />
              {supportingPhoto.caption && (
                <p className="text-[12px] opacity-60 mt-2 italic">
                  {supportingPhoto.caption}
                </p>
              )}
            </div>
          )}
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

export default InvestmentHighlightsSlide;
