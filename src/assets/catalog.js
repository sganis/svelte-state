export const categories = [
  {
    id: 1, name: "Category 1",
    items: [
      { id: 1,  name: "Alpha",     desc: "Alpha in Cat 1" },
      { id: 2,  name: "Beta",      desc: "Beta in Cat 1" },
      { id: 3,  name: "Gamma",     desc: "Gamma in Cat 1" },
      { id: 4,  name: "Delta",     desc: "Delta in Cat 1" },
      { id: 5,  name: "Epsilon",   desc: "Epsilon in Cat 1" },
      { id: 6,  name: "Zeta",      desc: "Zeta in Cat 1" },
      { id: 7,  name: "Eta",       desc: "Eta in Cat 1" },
      { id: 8,  name: "Theta",     desc: "Theta in Cat 1" },
      { id: 9,  name: "Iota",      desc: "Iota in Cat 1" },
      { id: 10, name: "Kappa",     desc: "Kappa in Cat 1" },
      { id: 11, name: "Lambda",    desc: "Lambda in Cat 1" },
      { id: 12, name: "Mu",        desc: "Mu in Cat 1" },
      { id: 13, name: "Nu",        desc: "Nu in Cat 1" },
      { id: 14, name: "Xi",        desc: "Xi in Cat 1" },
      { id: 15, name: "Omicron",   desc: "Omicron in Cat 1" },
      { id: 16, name: "Pi",        desc: "Pi in Cat 1" },
      { id: 17, name: "Rho",       desc: "Rho in Cat 1" },
      { id: 18, name: "Sigma",     desc: "Sigma in Cat 1" },
      { id: 19, name: "Tau",       desc: "Tau in Cat 1" },
      { id: 20, name: "Upsilon",   desc: "Upsilon in Cat 1" }
    ]
  },
  {
    id: 2, name: "Category 2",
    items: [
      { id: 1,  name: "Phi",       desc: "Phi in Cat 2" },
      { id: 2,  name: "Chi",       desc: "Chi in Cat 2" },
      { id: 3,  name: "Psi",       desc: "Psi in Cat 2" },
      { id: 4,  name: "Omega",     desc: "Omega in Cat 2" },
      { id: 5,  name: "Alpha-2",   desc: "Alpha-2 in Cat 2" },
      { id: 6,  name: "Beta-2",    desc: "Beta-2 in Cat 2" },
      { id: 7,  name: "Gamma-2",   desc: "Gamma-2 in Cat 2" },
      { id: 8,  name: "Delta-2",   desc: "Delta-2 in Cat 2" },
      { id: 9,  name: "Epsilon-2", desc: "Epsilon-2 in Cat 2" },
      { id: 10, name: "Zeta-2",    desc: "Zeta-2 in Cat 2" },
      { id: 11, name: "Eta-2",     desc: "Eta-2 in Cat 2" },
      { id: 12, name: "Theta-2",   desc: "Theta-2 in Cat 2" },
      { id: 13, name: "Iota-2",    desc: "Iota-2 in Cat 2" },
      { id: 14, name: "Kappa-2",   desc: "Kappa-2 in Cat 2" },
      { id: 15, name: "Lambda-2",  desc: "Lambda-2 in Cat 2" },
      { id: 16, name: "Mu-2",      desc: "Mu-2 in Cat 2" },
      { id: 17, name: "Nu-2",      desc: "Nu-2 in Cat 2" },
      { id: 18, name: "Xi-2",      desc: "Xi-2 in Cat 2" },
      { id: 19, name: "Omicron-2", desc: "Omicron-2 in Cat 2" },
      { id: 20, name: "Pi-2",      desc: "Pi-2 in Cat 2" }
    ]
  },
  {
    id: 3, name: "Category 3",
    items: [
      { id: 1,  name: "Rho-3",     desc: "Rho in Cat 3" },
      { id: 2,  name: "Sigma-3",   desc: "Sigma in Cat 3" },
      { id: 3,  name: "Tau-3",     desc: "Tau in Cat 3" },
      { id: 4,  name: "Upsilon-3", desc: "Upsilon in Cat 3" },
      { id: 5,  name: "Phi-3",     desc: "Phi in Cat 3" },
      { id: 6,  name: "Chi-3",     desc: "Chi in Cat 3" },
      { id: 7,  name: "Psi-3",     desc: "Psi in Cat 3" },
      { id: 8,  name: "Omega-3",   desc: "Omega in Cat 3" },
      { id: 9,  name: "Alpha-3",   desc: "Alpha in Cat 3" },
      { id: 10, name: "Beta-3",    desc: "Beta in Cat 3" },
      { id: 11, name: "Gamma-3",   desc: "Gamma in Cat 3" },
      { id: 12, name: "Delta-3",   desc: "Delta in Cat 3" },
      { id: 13, name: "Epsilon-3", desc: "Epsilon in Cat 3" },
      { id: 14, name: "Zeta-3",    desc: "Zeta in Cat 3" },
      { id: 15, name: "Eta-3",     desc: "Eta in Cat 3" },
      { id: 16, name: "Theta-3",   desc: "Theta in Cat 3" },
      { id: 17, name: "Iota-3",    desc: "Iota in Cat 3" },
      { id: 18, name: "Kappa-3",   desc: "Kappa in Cat 3" },
      { id: 19, name: "Lambda-3",  desc: "Lambda in Cat 3" },
      { id: 20, name: "Mu-3",      desc: "Mu in Cat 3" }
    ]
  }
];

// Helpers
export function firstCategoryId() {
  return categories[0]?.id ?? 0;
}
export function findCategory(catId) {
  return categories.find(c => c.id === catId) ?? null;
}
export function firstItemId(cat) {
  return cat?.items?.[0]?.id ?? 0;
}
export function findItem(catId, itemId) {
  const cat = findCategory(catId);
  return cat?.items?.find(i => i.id === itemId) ?? null;
}
