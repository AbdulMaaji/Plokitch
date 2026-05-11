export const DISH_CATEGORIES = [
  "Mains",
  "Sides",
  "Desserts",
  "Drinks",
  "Starters",
  "Specials"
];

export const formatCategory = (cat: string) => {
  if (!cat) return "";
  return cat.charAt(0).toUpperCase() + cat.slice(1).toLowerCase();
};
