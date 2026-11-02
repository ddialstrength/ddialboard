// Verified competition results. Add an athlete once, with only completed lifts.
// Use null for lifts without a verified result; never use 0 as a placeholder.
// Store only the public weight category here. Keep exact weigh-ins in staff records.
window.records = [
  { sex: "female", division: "Under 120 lb", athletes: [] },
  { sex: "female", division: "120–154 lb", athletes: [] },
  {
    sex: "female", division: "155–187 lb",
    athletes: [
      { name: "Maya Cross-Lovelace", bench: 140, squat: null, row: null }
    ]
  },
  { sex: "female", division: "188 lb+", athletes: [] },
  { sex: "male", division: "Under 150 lb", athletes: [] },
  { sex: "male", division: "150–187 lb", athletes: [] },
  {
    sex: "male", division: "188–220 lb",
    athletes: [
      { name: "Ancir Russell", bench: 225, squat: null, row: null }
    ]
  },
  { sex: "male", division: "221 lb+", athletes: [] }
];
