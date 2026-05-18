export type SupplementStage = 'general' | 'perimenopause' | 'menopause'

export interface Supplement {
  id: string
  name: string
  brand: string
  brandUrl: string
  affiliateUrl: string
  stage: SupplementStage
  keyBenefit: string
  evidence: string
  dose: string
}

const supplements: Supplement[] = [
  // General cycle health
  {
    id: 'vitl-omega3',
    name: 'Omega-3 (EPA + DHA)',
    brand: 'Bare Biology',
    brandUrl: 'https://www.barebiology.com',
    affiliateUrl: 'https://www.barebiology.com/products/life-and-soul-omega-3',
    stage: 'general',
    keyBenefit: 'Reduces menstrual cramping and supports mood across all phases',
    evidence: 'EPA inhibits prostaglandin synthesis — the same pathway targeted by ibuprofen. A 2011 RCT (Moghadamnia et al.) found fish oil supplementation superior to ibuprofen for primary dysmenorrhoea. EPA also supports serotonin receptor function, stabilising mood in the luteal phase.',
    dose: '2g EPA+DHA daily with food',
  },
  {
    id: 'wildnutrition-magnesium',
    name: 'Magnesium Glycinate',
    brand: 'Wild Nutrition',
    brandUrl: 'https://www.wildnutrition.com',
    affiliateUrl: 'https://www.wildnutrition.com/products/magnesium-glycinate',
    stage: 'general',
    keyBenefit: 'Reduces PMS-related cramping, mood changes, and sleep disruption',
    evidence: 'Multiple RCTs confirm magnesium supplementation (200–400mg/day) significantly reduces PMS symptom severity. Glycinate form is best absorbed and least likely to cause GI side effects. Magnesium is a cofactor for serotonin synthesis and regulates HPA axis stress response.',
    dose: '300–400mg elemental magnesium before bed',
  },
  {
    id: 'cytoplan-vitd3k2',
    name: 'Vitamin D3 + K2',
    brand: 'Cytoplan',
    brandUrl: 'https://www.cytoplan.co.uk',
    affiliateUrl: 'https://www.cytoplan.co.uk/vitamin-d3-k2',
    stage: 'general',
    keyBenefit: 'Supports immune function, mood, and calcium utilisation year-round',
    evidence: 'UK studies show over 60% of women are vitamin D deficient by winter. Vitamin D receptors are present in ovarian and uterine tissue. D3 combined with K2 (MK-7 form) directs calcium to bone rather than arteries — critical for long-term cardiovascular and bone health.',
    dose: '2000–4000IU D3 + 100mcg K2 daily with fat-containing meal',
  },
  {
    id: 'vitl-b6',
    name: 'Vitamin B6 (P5P form)',
    brand: 'Vitl',
    brandUrl: 'https://www.vitl.com',
    affiliateUrl: 'https://www.vitl.com/products/b6',
    stage: 'general',
    keyBenefit: 'Reduces PMS mood symptoms, supports progesterone metabolism',
    evidence: 'Pyridoxal-5-phosphate (P5P) is the bioactive form of B6, bypassing the conversion step required by standard pyridoxine. B6 is essential for serotonin and GABA synthesis. Meta-analysis (Wyatt et al., BMJ 1999) found B6 significantly reduces PMS emotional symptoms at 80–100mg/day.',
    dose: '50–100mg B6 as P5P daily, taken with B complex',
  },
  {
    id: 'wileys-iron',
    name: 'Iron Bisglycinate',
    brand: 'Wiley\'s Finest',
    brandUrl: 'https://wileysfinest.com',
    affiliateUrl: 'https://wileysfinest.com/products/iron-bisglycinate',
    stage: 'general',
    keyBenefit: 'Restores iron lost through menstruation without GI side effects',
    evidence: 'Iron deficiency is the most common nutritional deficiency in premenopausal women globally (WHO). Bisglycinate form demonstrates 4× greater absorption than ferrous sulphate with significantly fewer GI side effects (Layrisse et al., 2000). Test ferritin before supplementing — target above 50ng/mL for energy and thyroid function.',
    dose: '14–28mg elemental iron on empty stomach with vitamin C; retest in 12 weeks',
  },

  // Perimenopause
  {
    id: 'wildnutrition-adaptogen',
    name: 'Ashwagandha (KSM-66)',
    brand: 'Wild Nutrition',
    brandUrl: 'https://www.wildnutrition.com',
    affiliateUrl: 'https://www.wildnutrition.com/products/ashwagandha',
    stage: 'perimenopause',
    keyBenefit: 'Reduces cortisol, improves sleep quality, and attenuates hot flushes',
    evidence: 'KSM-66 is the most clinically studied ashwagandha extract. A 2021 RCT (Gopukumar et al.) showed KSM-66 significantly reduced perimenopausal symptoms including hot flushes, sleep disruption, and anxiety. Mechanism: adaptogenic regulation of HPA axis reduces cortisol which amplifies perimenopausal symptoms.',
    dose: '300–600mg KSM-66 daily (morning or bedtime)',
  },
  {
    id: 'cytoplan-evening-primrose',
    name: 'Evening Primrose Oil',
    brand: 'Cytoplan',
    brandUrl: 'https://www.cytoplan.co.uk',
    affiliateUrl: 'https://www.cytoplan.co.uk/evening-primrose-oil',
    stage: 'perimenopause',
    keyBenefit: 'Reduces hot flush frequency and intensity',
    evidence: 'Evening primrose oil contains gamma-linolenic acid (GLA), which modulates prostaglandin E1 production involved in thermoregulation. A 2013 RCT (Farzaneh et al.) demonstrated significant reduction in hot flush frequency and severity with 500mg/day EPO vs. placebo over 8 weeks.',
    dose: '500–1000mg GLA-standardised EPO daily with food',
  },
  {
    id: 'barebiology-magnesium-peri',
    name: 'Magnesium L-Threonate',
    brand: 'Bare Biology',
    brandUrl: 'https://www.barebiology.com',
    affiliateUrl: 'https://www.barebiology.com/products/magnesium',
    stage: 'perimenopause',
    keyBenefit: 'Supports cognitive function and memory affected by hormonal shifts',
    evidence: 'Magnesium L-threonate is the only form shown to cross the blood-brain barrier and increase brain magnesium levels (MIT research, Slutsky et al., Neuron 2010). Perimenopausal women frequently report cognitive symptoms — brain magnesium supports synaptic plasticity, NMDA receptor function, and sleep quality critical for memory consolidation.',
    dose: '1.5–2g L-threonate daily (split morning and evening)',
  },

  // Menopause
  {
    id: 'cytoplan-calcium-complex',
    name: 'Calcium + Magnesium + D3 + K2 Complex',
    brand: 'Cytoplan',
    brandUrl: 'https://www.cytoplan.co.uk',
    affiliateUrl: 'https://www.cytoplan.co.uk/calcium-magnesium-d3-k2',
    stage: 'menopause',
    keyBenefit: 'Comprehensive bone protection as oestrogen\'s bone-preserving effect ends',
    evidence: 'Post-menopausal women lose 2–3% bone density per year in the first decade without oestrogen. This combination addresses all four key nutrients: calcium (structural bone mineral), magnesium (regulates calcium absorption), D3 (calcium absorption from gut), and K2-MK7 (directs calcium to bone, prevents arterial calcification). NICE guidelines recommend calcium and vitamin D as first-line alongside lifestyle for post-menopausal osteoporosis prevention.',
    dose: '1000–1200mg calcium, 300mg magnesium, 2000IU D3, 100mcg K2-MK7 daily',
  },
  {
    id: 'vitl-collagen',
    name: 'Marine Collagen + Vitamin C',
    brand: 'Vitl',
    brandUrl: 'https://www.vitl.com',
    affiliateUrl: 'https://www.vitl.com/products/collagen',
    stage: 'menopause',
    keyBenefit: 'Supports skin, joint, bone matrix, and vaginal tissue health',
    evidence: 'Oestrogen stimulates collagen synthesis; its decline accelerates collagen loss. Marine collagen peptides (type I and III) have been shown in clinical trials to improve skin elasticity and reduce joint pain in post-menopausal women. Vitamin C is essential co-factor for collagen cross-linking. Study: Proksch et al. (2014) showed significant improvements in skin moisture and elasticity with 2.5g collagen peptides.',
    dose: '5–10g marine collagen peptides + 500mg vitamin C daily',
  },
  {
    id: 'wileys-omega3-menopause',
    name: 'High-Strength Omega-3 (EPA+DHA)',
    brand: 'Wiley\'s Finest',
    brandUrl: 'https://wileysfinest.com',
    affiliateUrl: 'https://wileysfinest.com/products/peak-omega-3',
    stage: 'menopause',
    keyBenefit: 'Reduces cardiovascular risk, supports brain health, and eases hot flushes',
    evidence: 'Cardiovascular disease is the leading cause of death in post-menopausal women. High-dose EPA+DHA reduce triglycerides by 25–30%, improve endothelial function, and have anti-inflammatory effects on the vascular wall (REDUCE-IT trial, NEJM 2018). DHA is a primary structural component of brain cell membranes — supporting the cognitive changes of menopause.',
    dose: '2–4g EPA+DHA combined daily; higher doses require GP supervision',
  },
  {
    id: 'wildnutrition-soy-isoflavones',
    name: 'Soy Isoflavones (standardised extract)',
    brand: 'Wild Nutrition',
    brandUrl: 'https://www.wildnutrition.com',
    affiliateUrl: 'https://www.wildnutrition.com/products/soy-isoflavones',
    stage: 'menopause',
    keyBenefit: 'Natural oestrogen-like activity to reduce hot flushes and support bone',
    evidence: 'Soy isoflavones (genistein, daidzein) are the most studied phytoestrogen class for menopausal symptoms. A Cochrane meta-analysis (2013, 17 trials) found phytoestrogen supplementation reduced hot flush frequency by 21%. Genistein at 54mg/day also shown to reduce bone resorption markers. Safe for most women including those with a history of hormone-sensitive cancer at food-equivalent doses.',
    dose: '40–80mg total isoflavones daily with food; discuss with GP if breast cancer history',
  },
]

export default supplements
