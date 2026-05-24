import * as z from "zod";
import { FinancialMetricSchema, OmFooterSchema } from "./omSchemas";

export const Schema = z.object({
  title: z.string().min(1).max(40).default("Financial Summary").meta({
    description: "Section title — typically 'Financial Summary', 'Pricing & Returns', or 'Investment Summary'",
  }),
  subtitle: z.string().max(120).optional().default("Year 1 stabilized assumptions").meta({
    description: "Optional subtitle clarifying the underwriting basis (e.g. 'Year 1 stabilized', 'In-place T-12', 'Sponsor pro forma')",
  }),
  metrics: z.array(FinancialMetricSchema).min(4).max(8).default([
    { label: "Asking Price", value: "$24,500,000" },
    { label: "Price / Unit", value: "$115,566", caveat: "212 units" },
    { label: "Cap Rate", value: "5.80%", caveat: "In-place NOI" },
    { label: "Year 1 NOI", value: "$1,421,000", caveat: "Stabilized" },
    { label: "GRM", value: "8.2x", caveat: "T-12 GPR" },
    { label: "Year 1 CoC", value: "7.4%", caveat: "Assumes 65% LTV" },
  ]).meta({
    description: "4 to 8 headline financial metrics. Asset-class-appropriate: multifamily uses Price/Unit, GRM, CoC, Cap Rate, NOI; STNL uses Lease Term Remaining, Rent Escalations, Credit Rating, Price; industrial uses Price/SF, WALT, Rent vs. Market. Every metric should include a caveat line that names the basis.",
  }),
  notes: z.array(z.string().max(140)).max(4).default([
    "Underwriting reflects in-place rents with 4.0% Y2 growth and 3.0% thereafter.",
    "Loan assumption analysis available upon execution of CA.",
  ]).optional().meta({
    description: "Up to 4 short underwriting notes shown beneath the metrics grid. Each ≤ 140 characters.",
  }),
  footer: OmFooterSchema,
});
export type SchemaType = z.infer<typeof Schema>;

export const slideLayoutId = "om-financial-summary";
export const slideLayoutName = "OM Financial Summary";
export const slideLayoutDescription =
  "Financial Summary slide for an Offering Memorandum. A 3-column grid of 4-8 headline financial metrics (Asking Price, Cap Rate, NOI, Price/Unit or Price/SF, GRM or WALT, Year 1 CoC, etc.) each with a small-print caveat naming the basis, plus optional underwriting notes below.";

const FinancialSummarySlide = ({ data }: { data: Partial<SchemaType> }) => {
  const { title, subtitle, metrics, notes, footer } = data;
  const items = metrics ?? [];

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
        <div className="flex items-baseline justify-between mb-2">
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
        {subtitle && (
          <p className="text-[14px] opacity-70 mb-8">{subtitle}</p>
        )}

        <div className="flex-1 grid grid-cols-3 gap-5 content-start">
          {items.map((m, i) => (
            <div
              key={i}
              className="border-t-2 pt-4"
              style={{ borderColor: "var(--primary-color, #C9A35B)" }}
            >
              <p className="text-[11px] tracking-[0.2em] uppercase opacity-70 mb-2">
                {m.label}
              </p>
              <p className="text-[36px] font-semibold leading-none mb-1">{m.value}</p>
              {m.caveat && (
                <p className="text-[11px] opacity-60 italic">{m.caveat}</p>
              )}
            </div>
          ))}
        </div>

        {notes && notes.length > 0 && (
          <div className="mt-8 pt-4 border-t border-black/10">
            {notes.map((n, i) => (
              <p key={i} className="text-[11px] opacity-60 leading-snug mb-1">
                · {n}
              </p>
            ))}
          </div>
        )}

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

export default FinancialSummarySlide;
