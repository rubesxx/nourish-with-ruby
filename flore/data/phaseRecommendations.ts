export interface FoodItem { food: string; reason: string }
export interface MealItem  { name: string; why: string }
export interface ExerciseItem { name: string; why: string }

export interface PhaseData {
  key: string
  label: string
  tagline: string
  accent: string
  meals: MealItem[]
  exercises: ExerciseItem[]
  priorityFoods: FoodItem[]
  reduceFoods: FoodItem[]
}

const recommendations: Record<string, PhaseData> = {
  menstrual: {
    key: 'menstrual',
    label: 'Menstrual Phase',
    tagline: 'Rest, replenish, and rebuild. Your body is working hard.',
    accent: '#BE123C',
    meals: [
      {
        name: 'Slow-cooked beef and lentil stew',
        why: 'Red meat replaces lost iron; lentils add non-haem iron and fibre to support gut motility during prostaglandin activity.',
      },
      {
        name: 'Salmon with roasted sweet potato and spinach',
        why: 'Omega-3s from salmon reduce prostaglandin-driven cramping. Sweet potato provides magnesium and complex carbs for steady energy.',
      },
      {
        name: 'Dark chocolate bark with walnuts and dried cherries',
        why: 'Dark chocolate (85%+) delivers magnesium; walnuts provide omega-3 ALA; cherries contain anthocyanins that dampen inflammation.',
      },
    ],
    exercises: [
      {
        name: 'Yin yoga or restorative yoga',
        why: 'Long-held poses stimulate parasympathetic tone, ease pelvic tension, and align with low oestrogen and progesterone levels. No cortisol spike.',
      },
      {
        name: 'Gentle walking (20–30 min)',
        why: 'Maintains circulation and can reduce cramp severity through endorphin release without taxing a body already under inflammatory load.',
      },
    ],
    priorityFoods: [
      { food: 'Dark leafy greens (spinach, kale)', reason: 'Iron to replace menstrual losses; vitamin K and folate for cellular repair.' },
      { food: 'Red meat or organ meat', reason: 'Haem iron — the most bioavailable form. Even 100g 3×/week makes a measurable difference to ferritin.' },
      { food: 'Magnesium-rich foods (dark chocolate, pumpkin seeds)', reason: 'Clinical trials show magnesium reduces menstrual cramping and improves mood via serotonin pathway support.' },
    ],
    reduceFoods: [
      { food: 'Alcohol', reason: 'Depletes B vitamins and magnesium, worsens prostaglandin-driven inflammation, and disrupts the liver\'s ability to clear oestrogen metabolites.' },
      { food: 'Highly processed foods and trans fats', reason: 'Increase systemic inflammation, exacerbating cramping and fatigue.' },
      { food: 'Excess caffeine', reason: 'Constricts blood vessels, worsens cramps, and disrupts iron absorption when consumed with meals.' },
    ],
  },

  follicular: {
    key: 'follicular',
    label: 'Follicular Phase',
    tagline: 'Oestrogen is rising. Your metabolism, cognition, and resilience are building.',
    accent: '#0F766E',
    meals: [
      {
        name: 'Probiotic-rich grain bowl: quinoa, fermented tempeh, avocado, kimchi',
        why: 'Rising oestrogen is metabolised in the gut via the oestrobolome. Fermented foods and fibre support diverse microbiome function critical to healthy oestrogen recirculation.',
      },
      {
        name: 'Smoked salmon and egg scramble on rye',
        why: 'Protein and choline from eggs support liver detoxification of oestrogen. Rye provides prebiotic fibre. Salmon omega-3s support oestrogen receptor sensitivity.',
      },
      {
        name: 'Chickpea and roasted vegetable tray bake with tahini dressing',
        why: 'Chickpeas contain phytoestrogens (isoflavones) that support gentle oestrogen signalling. Tahini provides zinc and selenium for follicular development.',
      },
    ],
    exercises: [
      {
        name: 'Strength training — compound lifts',
        why: 'Rising oestrogen enhances muscle protein synthesis and improves neuromuscular recruitment. This is the best phase to push progressive overload. Recovery is faster now.',
      },
      {
        name: 'HIIT or moderate cardio',
        why: 'Insulin sensitivity peaks in the follicular phase, making high-intensity work efficient for fuel use. Women in this phase show better VO₂ max response to interval training.',
      },
    ],
    priorityFoods: [
      { food: 'Cruciferous vegetables (broccoli, Brussels sprouts, cauliflower)', reason: 'Contain DIM and indole-3-carbinol, which support the liver\'s Phase I and II oestrogen detoxification pathways.' },
      { food: 'Flaxseeds', reason: 'Lignans bind to oestrogen receptors and support healthy oestrogen metabolism. Grind fresh to activate.' },
      { food: 'Fermented foods (kefir, sauerkraut, kimchi)', reason: 'Oestrobolome health depends on gut microbiome diversity. Fermented foods reduce beta-glucuronidase activity that drives oestrogen recirculation.' },
    ],
    reduceFoods: [
      { food: 'Refined sugar', reason: 'Dysregulates insulin even during the phase of best insulin sensitivity, and feeds less beneficial gut bacteria that impair oestrogen clearance.' },
      { food: 'Excess alcohol', reason: 'Impairs liver Phase I and II detox of oestrogen, contributing to oestrogen excess symptoms over time.' },
      { food: 'Conventional dairy (in excess)', reason: 'Contains exogenous oestrogens and growth hormones that may compete with endogenous oestrogen signalling when consumed in large quantities.' },
    ],
  },

  ovulatory: {
    key: 'ovulatory',
    label: 'Ovulatory Phase',
    tagline: 'Peak oestrogen. Peak you. Nutrient demands are highest — meet them.',
    accent: '#D97706',
    meals: [
      {
        name: 'Tuna steak with mango salsa, brown rice and edamame',
        why: 'High zinc from tuna supports LH surge and egg quality. Vitamin C in mango enhances progesterone production. Edamame isoflavones gently modulate oestrogen receptor activity.',
      },
      {
        name: 'Raw vegetable platter with hummus and seeds',
        why: 'Liver is working hardest to clear the oestrogen peak. Raw fibre, cruciferous veg and seeds support hepatic and gut oestrogen clearance simultaneously.',
      },
      {
        name: 'Chicken, feta, rocket and walnut salad with lemon dressing',
        why: 'Protein maintains satiety during the phase where appetite may dip. Walnuts and lemon support anti-inflammatory pathways as the body prepares for ovulation.',
      },
    ],
    exercises: [
      {
        name: 'Peak cardio, races, PBs',
        why: 'Oestrogen-dominant environment maximises cardiovascular output, pain tolerance, and fast-twitch fibre recruitment. Research shows women achieve highest VO₂ max test scores at ovulation.',
      },
      {
        name: 'Group fitness or competitive sport',
        why: 'Elevated testosterone at ovulation increases confidence and social motivation. Use this window for classes, team sport, or activities with accountability partners.',
      },
    ],
    priorityFoods: [
      { food: 'Zinc-rich foods (oysters, pumpkin seeds, beef)', reason: 'Zinc is essential for LH surge — the trigger for ovulation. Deficiency is directly linked to anovulatory cycles.' },
      { food: 'Antioxidant-rich berries and leafy greens', reason: 'Protect the egg from oxidative stress during the final maturation and release phase. Vitamin E specifically protects ovarian tissue.' },
      { food: 'Lean protein (chicken, turkey, fish)', reason: 'Amino acids support follicular fluid production. Protein also supports progesterone production in the days immediately post-ovulation.' },
    ],
    reduceFoods: [
      { food: 'Excess omega-6 vegetable oils (sunflower, corn oil)', reason: 'Inflammatory omega-6:3 ratio impairs oestrogen receptor signalling and disrupts healthy ovulatory function.' },
      { food: 'Processed soy (soy isolate, soy protein bars)', reason: 'Highly processed soy phytoestrogens at high doses may interfere with oestrogen signalling at the receptor level during oestrogen peak.' },
      { food: 'Alcohol', reason: 'Even moderate intake raises oestrogen in the days around ovulation, which can delay or suppress the LH surge in some women.' },
    ],
  },

  luteal: {
    key: 'luteal',
    label: 'Luteal Phase',
    tagline: 'Progesterone rises. Your metabolism shifts. Nourish to minimise PMS.',
    accent: '#6D28D9',
    meals: [
      {
        name: 'Turkey and roasted root vegetable Buddha bowl with tahini',
        why: 'Turkey is high in tryptophan — the serotonin precursor depleted by falling progesterone. Root vegetables provide slow-release carbs that ease the tryptophan:LNAA ratio, improving brain uptake.',
      },
      {
        name: 'Black bean and sweet potato chilli with brown rice',
        why: 'Complex carbs reduce cortisol-driven cravings. Black beans provide magnesium and B6, both of which are clinically shown to reduce PMS severity.',
      },
      {
        name: 'Oat-based dark chocolate and almond energy balls',
        why: 'Addresses cravings with purpose: oats provide beta-glucan fibre, almonds give magnesium and vitamin E, dark chocolate supplies both magnesium and dopaminergic flavonoids.',
      },
    ],
    exercises: [
      {
        name: 'Moderate weight training (reduce volume 10–20%)',
        why: 'Progesterone increases core body temperature and accelerates glycogen depletion. Keeping weights moderate with adequate rest prevents over-training and excessive cortisol.',
      },
      {
        name: 'Pilates, swimming, or steady-state walking',
        why: 'Lower-impact movement respects the parasympathetic shift in the late luteal phase. Swimming is particularly effective as water immersion may reduce bloating and joint discomfort.',
      },
    ],
    priorityFoods: [
      { food: 'Magnesium-rich foods (dark chocolate, pumpkin seeds, leafy greens)', reason: 'Multiple RCTs confirm magnesium reduces PMS-related anxiety, bloating, and cramps. Deficiency is common in luteal phase.' },
      { food: 'Vitamin B6 foods (poultry, bananas, potatoes)', reason: 'B6 is a cofactor for serotonin and GABA synthesis. Supplementation studies show significant reduction in PMS mood symptoms.' },
      { food: 'Complex carbohydrates (oats, sweet potato, lentils)', reason: 'Progesterone raises BMR by ~100–300kcal. Slow carbs support serotonin production and prevent blood sugar crashes driving cravings.' },
    ],
    reduceFoods: [
      { food: 'Salt and high-sodium foods', reason: 'Progesterone-driven fluid retention is worsened by sodium. Reduction can meaningfully reduce breast tenderness and bloating.' },
      { food: 'Refined sugar and ultra-processed carbs', reason: 'Spike and crash blood glucose, worsening mood instability, fatigue, and cravings in an already progesterone-dominant state.' },
      { food: 'Caffeine (particularly in late luteal)', reason: 'Exacerbates breast tenderness, anxiety, and sleep disruption during the phase when all three are already elevated.' },
    ],
  },

  perimenopause: {
    key: 'perimenopause',
    label: 'Perimenopause',
    tagline: 'Hormones are fluctuating. Build your nutritional foundation now — it matters more than ever.',
    accent: '#7C3AED',
    meals: [
      {
        name: 'Edamame, brown rice and miso-glazed salmon bowl',
        why: 'Phytoestrogens from edamame can reduce hot flush frequency by up to 50% in clinical trials. Salmon omega-3s lower cardiovascular risk that rises in perimenopause. Miso provides probiotics that support gut oestrogen metabolism.',
      },
      {
        name: 'Tofu and broccoli stir-fry with sesame, ginger and black rice',
        why: 'Tofu provides isoflavones shown to reduce menopausal symptoms and preserve bone density. Cruciferous broccoli supports detox of fluctuating oestrogen. Black rice anthocyanins reduce oxidative stress.',
      },
      {
        name: 'Greek yoghurt with walnuts, berries, flaxseed and honey',
        why: 'Calcium and protein for bone maintenance. Walnuts provide anti-inflammatory omega-3s. Flaxseed lignans support hormonal balance. Berries lower systemic inflammation associated with perimenopausal metabolic shifts.',
      },
    ],
    exercises: [
      {
        name: 'Resistance training 3× per week (heavy compound movements)',
        why: 'Declining oestrogen accelerates muscle and bone loss. Heavy resistance training is the single most evidence-backed intervention to preserve both. Study evidence: SWAN longitudinal data shows resistance exercise attenuates perimenopausal bone density decline.',
      },
      {
        name: 'Yoga or tai chi for stress and sleep',
        why: 'HPA axis dysregulation in perimenopause amplifies cortisol response to stress, worsening hot flushes and sleep disruption. Mindful movement interventions show significant improvements in sleep quality and hot flush severity.',
      },
    ],
    priorityFoods: [
      { food: 'Phytoestrogen-rich foods (soy, flaxseed, legumes)', reason: 'Isoflavones and lignans act as weak oestrogen agonists, partially compensating for declining endogenous oestrogen and reducing hot flush frequency.' },
      { food: 'Calcium-rich foods (dairy, fortified plant milks, sardines with bones)', reason: 'Bone resorption accelerates dramatically in perimenopause. 1200mg calcium/day from food sources — not supplements alone — is the evidence-based target.' },
      { food: 'Omega-3 fatty acids (oily fish, walnuts, chia)', reason: 'Cardiovascular risk rises as oestrogen falls. EPA and DHA reduce triglycerides, improve vascular function, and reduce inflammatory markers associated with perimenopausal metabolic shift.' },
    ],
    reduceFoods: [
      { food: 'Alcohol', reason: 'Directly triggers hot flushes in many women. Also disrupts sleep architecture, raises breast cancer risk (already elevated by hormonal flux), and depletes magnesium and B vitamins.' },
      { food: 'Refined carbohydrates and sugar', reason: 'Insulin resistance worsens in perimenopause. High glycaemic foods exacerbate weight redistribution to the abdomen and increase metabolic syndrome risk.' },
      { food: 'Caffeine (especially after midday)', reason: 'Amplifies hot flush intensity and severity, disrupts sleep already impaired by night sweats, and raises cortisol in women whose HPA axis is already dysregulated.' },
    ],
  },

  menopause: {
    key: 'menopause',
    label: 'Menopause',
    tagline: 'Oestrogen is low. Your nutrition strategy protects your bones, brain, heart, and metabolism.',
    accent: '#9333EA',
    meals: [
      {
        name: 'Sardine and white bean salad with lemon, capers and rocket',
        why: 'Sardines with bones deliver calcium and vitamin D in a highly bioavailable form. White beans add plant protein and magnesium. This combination directly addresses the two most critical post-menopausal bone health nutrients.',
      },
      {
        name: 'Tempeh, roasted beetroot and quinoa bowl with tahini dressing',
        why: 'Tempeh provides isoflavones and complete protein — studies show soy protein maintains muscle mass post-menopause. Beetroot nitrates support cardiovascular function. Quinoa and tahini deliver bone-protective minerals.',
      },
      {
        name: 'Walnut and berry overnight oats with ground flaxseed',
        why: 'Beta-glucan in oats reduces LDL cholesterol, a priority as cardiovascular risk rises sharply post-menopause. Flaxseed lignans and berries provide antioxidants that counteract oestrogen-decline-associated oxidative stress in the brain.',
      },
    ],
    exercises: [
      {
        name: 'Weight-bearing exercise and resistance training',
        why: 'Without oestrogen\'s bone-protective effect, mechanical loading is the primary driver of bone formation. WHO and NICE guidelines recommend resistance training as a first-line intervention for post-menopausal osteoporosis prevention.',
      },
      {
        name: 'Balance and flexibility training (yoga, pilates, tai chi)',
        why: 'Fall prevention becomes critical when bone density is compromised. Balance training reduces fracture risk by 34% in post-menopausal women (Cochrane review, 2019). Flexibility training reduces the pain and stiffness of joint changes associated with oestrogen loss.',
      },
    ],
    priorityFoods: [
      { food: 'Calcium + Vitamin D (dairy, fortified foods, oily fish)', reason: '1200mg calcium and 800–1000IU vitamin D daily are the evidence-based targets for post-menopausal bone protection. These must come from food first, supplements as backup.' },
      { food: 'Protein at every meal (minimum 1.2–1.6g/kg body weight)', reason: 'Oestrogen loss accelerates sarcopenia. Higher protein intake preserves muscle mass, supports metabolic rate, and reduces osteoporotic fracture risk by improving muscle function.' },
      { food: 'Phytoestrogens (soy, red clover, flaxseed)', reason: 'Act on oestrogen receptors to reduce hot flush frequency, protect bone density, and support cardiovascular and cognitive function. Most effective when consumed regularly from whole food sources.' },
    ],
    reduceFoods: [
      { food: 'High-sodium foods', reason: 'Sodium increases urinary calcium excretion. Post-menopausal women already have compromised calcium retention — high salt intake accelerates bone density loss.' },
      { food: 'Alcohol (more than 1 unit/day)', reason: 'Directly inhibits osteoblasts (bone-building cells), disrupts sleep, raises breast cancer risk, and worsens hot flushes and cognitive symptoms. The evidence threshold for harm is lower post-menopause.' },
      { food: 'Excess saturated fat', reason: 'Cardiovascular risk is the leading cause of mortality in post-menopausal women. Replacing saturated fats with unsaturated fats reduces LDL-C by 10–15% in this population.' },
    ],
  },
}

export default recommendations
