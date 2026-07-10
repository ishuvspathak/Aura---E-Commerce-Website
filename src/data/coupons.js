export const coupons = [
  {
    code: "AURA10",
    discountType: "percentage",
    value: 10,
    minSpend: 0,
    description: "10% OFF on all products, no minimum spend required!"
  },
  {
    code: "WELCOME20",
    discountType: "percentage",
    value: 20,
    minSpend: 100,
    description: "20% OFF on purchases of $100 or more!"
  },
  {
    code: "TECH50",
    discountType: "fixed",
    value: 50,
    minSpend: 500,
    description: "$50 OFF on purchases of $500 or more!"
  },
  {
    code: "FREESHIP",
    discountType: "freeshipping",
    value: 0,
    minSpend: 50,
    description: "Free Shipping on orders above $50!"
  }
];
