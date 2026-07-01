export type HealthPackage = {
  id: string;
  name: string;
  tagline: string;
  price: number;
  originalPrice: number;
  testsCount: number;
  includes: string[];
  turnaround: string;
  bestFor: string;
  tier: "Essential" | "Advanced" | "Premium" | "Wellness";
  popular?: boolean;
};

export const PACKAGES: HealthPackage[] = [
  {
    id: "basic-health",
    name: "Basic Health Checkup",
    tagline: "Start your wellness journey",
    price: 999,
    originalPrice: 1800,
    testsCount: 32,
    includes: ["Complete Blood Count", "Fasting Blood Sugar", "Lipid Profile", "Liver & Kidney Function"],
    turnaround: "Reports in 24 hrs",
    bestFor: "Ages 18-35 · Annual screening",
    tier: "Essential",
  },
  {
    id: "full-body",
    name: "Full Body Advanced",
    tagline: "Comprehensive 360° screening",
    price: 2499,
    originalPrice: 4500,
    testsCount: 68,
    includes: ["CBC + ESR", "Thyroid Profile", "HbA1c", "Vitamin D & B12", "Lipid + Cardiac Risk"],
    turnaround: "Reports in 24 hrs",
    bestFor: "Ages 30+ · Complete health snapshot",
    tier: "Advanced",
    popular: true,
  },
  {
    id: "diabetes-care",
    name: "Diabetes Care Plus",
    tagline: "Track & manage blood sugar",
    price: 1299,
    originalPrice: 2200,
    testsCount: 24,
    includes: ["HbA1c", "Fasting & PP Sugar", "Insulin", "Microalbumin", "Lipid Profile"],
    turnaround: "Reports in 24 hrs",
    bestFor: "Diabetics & pre-diabetics",
    tier: "Wellness",
  },
  {
    id: "heart-health",
    name: "Heart Health Panel",
    tagline: "Cardiac risk assessment",
    price: 1799,
    originalPrice: 3200,
    testsCount: 28,
    includes: ["Lipid Profile", "Troponin-I", "hs-CRP", "Homocysteine", "ECG interpretation"],
    turnaround: "Reports in 24 hrs",
    bestFor: "Ages 35+ · Family history",
    tier: "Advanced",
  },
  {
    id: "women-wellness",
    name: "Women's Wellness",
    tagline: "Hormonal & nutritional balance",
    price: 2199,
    originalPrice: 3800,
    testsCount: 52,
    includes: ["Thyroid Profile", "Iron Studies", "Vitamin D & B12", "PCOS Panel", "CBC"],
    turnaround: "Reports in 24 hrs",
    bestFor: "Women 20-50",
    tier: "Wellness",
  },
  {
    id: "senior-care",
    name: "Senior Citizen Elite",
    tagline: "Complete geriatric checkup",
    price: 3499,
    originalPrice: 6200,
    testsCount: 85,
    includes: ["Full Body Profile", "Cardiac Markers", "Bone Health", "Cancer Markers", "Thyroid"],
    turnaround: "Reports in 48 hrs",
    bestFor: "Ages 60+ · Preventive care",
    tier: "Premium",
  },
];
