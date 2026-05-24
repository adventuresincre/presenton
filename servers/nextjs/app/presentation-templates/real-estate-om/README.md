# Real Estate Offering Memorandum (OM) Template

Open-source Offering Memorandum template for commercial real estate investment sales.
Built by [Adventures in CRE](https://adventuresincre.com) as a service to the industry.

## What this is

This template turns a property data package — rent roll, T-12, photos, address — into an
editable PPTX Offering Memorandum that brokers can hand to buyers. It runs on the same
React-component + Zod-schema pipeline as the rest of Presenton: every slide is a typed
layout, the data contract is the schema, and the export pipeline produces a
PowerPoint-editable deck plus a PDF.

When an [A.CRE Intelligence Hub](https://adventuresincre.com) API key is configured,
location, demographics, employment, residential permits, and aerial imagery
auto-populate. Without a Hub key the tool still works — the broker enters or uploads
those fields manually.

## Section catalog

OMs have a roughly fixed section order per property type. Below is the MVP coverage
plus the full target catalog.

### Shipped (this scaffold)
| # | Layout ID | File | Purpose |
|---|---|---|---|
| 1 | `real-estate-om:om-cover` | `OmCoverSlide.tsx` | Hero photo, property name, address, asking price, cap rate, listing broker contact block |
| 2 | `real-estate-om:om-investment-highlights` | `InvestmentHighlightsSlide.tsx` | 3-6 numbered investment highlights with evidence-backed details |
| 3 | `real-estate-om:om-property-summary` | `PropertySummarySlide.tsx` | Primary photo + asset-class-appropriate key facts grid |
| 4 | `real-estate-om:om-location-aerial` | `LocationAerialSlide.tsx` | Aerial imagery + submarket / demographic context facts |
| 5 | `real-estate-om:om-financial-summary` | `FinancialSummarySlide.tsx` | 4-8 headline financial metrics in a 3-column grid with caveats |

### Target catalog (MVP-complete — to be built)
| # | Layout ID | Purpose |
|---|---|---|
| 6 | `om-toc` | Table of contents |
| 7 | `om-executive-summary` | One-page narrative summary |
| 8 | `om-property-photos-grid` | 4 / 6 / 9-up photo grid |
| 9 | `om-site-plan` | Site plan with parcel boundary and key features |
| 10 | `om-floor-plans` | Unit floor plans (multifamily) or floor stacking (office) |
| 11 | `om-submarket-map` | Submarket-level map with major employers / drivers labeled |
| 12 | `om-demographics-tiles` | Demographics in 1/3/5-mile radii (Hub-auto) |
| 13 | `om-employment-drivers` | Major employers + employment trend (Hub-auto) |
| 14 | `om-rent-roll` | Tabular rent roll (multifamily / commercial — different layouts) |
| 15 | `om-unit-mix` | Unit mix table (multifamily) |
| 16 | `om-tenancy-overview` | Tenant roster + WALT (commercial) |
| 17 | `om-lease-abstract` | Lease abstract — key terms (STNL / single-tenant) |
| 18 | `om-t12-summary` | T-12 operating statement summary |
| 19 | `om-pro-forma` | Year 1-5 pro forma |
| 20 | `om-expense-detail` | Expense detail with PSF / per-unit |
| 21 | `om-rent-comps` | Lease comparable set (5-10 comps) |
| 22 | `om-sale-comps` | Sale comparable set (5-10 comps) |
| 23 | `om-value-add-thesis` | Value-add plan with capex schedule (when applicable) |
| 24 | `om-capital-stack` | Capital stack + assumed financing (when applicable) |
| 25 | `om-process-timing` | Bid date, deposit, contingencies, contact for tours |
| 26 | `om-disclaimer` | Confidentiality + state-specific disclosures |

## Property type axis

The template supports all 16 institutional + niche property types via the
`PropertyTypeSchema` enum in `omSchemas.ts`. Different property types use different
subsets of the catalog — e.g. STNL uses `om-lease-abstract` but not `om-rent-roll`;
multifamily uses `om-unit-mix` and a tabular `om-rent-roll`; industrial uses key-facts
fields like clear height and dock doors.

| Property type | Subtypes |
|---|---|
| `multifamily` | Garden, mid-rise, high-rise, BTR/SFR, student, senior |
| `retail-stnl` | Single-tenant net lease (credit / lease-driven) |
| `retail-multi-tenant` | Strip, neighborhood, community, anchored, mall, urban street |
| `office` | CBD, suburban, creative, single-tenant |
| `industrial` | Warehouse, manufacturing, flex, cold storage, last-mile, IOS |
| `hospitality` | Full-service, select-service, extended-stay, resort, boutique |
| `self-storage` | Climate / non-climate |
| `manufactured-housing` | All-age, 55+, RV park hybrid |
| `senior-housing` | IL, AL, MC, SNF, CCRC |
| `student-housing` | Pedestrian, drive-to, purpose-built |
| `medical-office` | On-campus, off-campus, ambulatory surgery |
| `life-sciences` | Wet lab, dry lab, GMP |
| `data-center` | Wholesale, colo, hyperscale |
| `land` | Entitled, partially entitled, raw, redevelopment |
| `mixed-use` | Combinations of the above |
| `specialty` | Gas / c-store, car wash, auto dealer, parking, marina, RV, religious, etc. |

## Deal stage axis

`DealStageSchema` in `omSchemas.ts` drives narrative emphasis:

- `stabilized` — cash flow story dominates
- `value-add` — upside story dominates
- `opportunistic` — vision / business plan dominates
- `development` — entitlement + market study dominates

## Architecture notes

- **OMs use the API's `slides_markdown` mode**, not the generic outline step. The OM
  orchestration endpoint (to be added) will assemble a fixed section sequence per
  property type and pass each section as pre-structured content. The LLM is only used
  for narrative connecting tissue (investment thesis paragraph, market commentary,
  executive summary). Structured data — rent roll, T-12, comps, demographics — is
  injected from sources, not generated.
- **Shared schemas** live in `omSchemas.ts`: `AddressSchema`, `BrokerContactSchema`,
  `KeyFactSchema`, `FinancialMetricSchema`, `PropertyPhotoSchema`, `AerialImageSchema`,
  `PropertyTypeSchema`, `DealStageSchema`, `OmFooterSchema`. Slide layouts compose
  these.
- **Theming via CSS variables**: `--primary-color`, `--background-color`,
  `--background-text`, `--primary-text`, `--heading-font-family`, `--body-font-family`.
  Per-brokerage branding ships as a CSS preset.
- **Hub integration** is opt-in: the OM orchestration endpoint calls the A.CRE
  Intelligence Hub MCP (or HTTP API) for demographics / employment / permits / aerials
  when an `ACRE_HUB_API_KEY` is configured. Without it, all fields are user-supplied.

## Contributing

This is open source. New property-type layouts, brand presets, and disclaimer
boilerplate are all welcome. See the root `CONTRIBUTING.md`.
