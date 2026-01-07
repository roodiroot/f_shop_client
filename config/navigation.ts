export type NavLink = {
  name: string;
  href: string;
};

export const PAGES = {
  BLOG: { name: "Блог", href: "/contacts" },
  DELIVERY: { name: "Доставка и оплата", href: "/contacts" },
  RETURNS: { name: "Возврат товара", href: "/contacts" },
  FAQ: { name: "FAQ", href: "/contacts" },
  SIZE_GUIDE: { name: "Гайд по размерам", href: "/size-guide" },
  CATALOG: { name: "Каталог", href: "/catalog" },

  ABOUT: { name: "О компании", href: "/contacts" },
  CONTACTS: { name: "Контакты", href: "/contacts" },
  QUALITY: { name: "Гарантия качества", href: "/contacts" },

  OFFER: { name: "Оферта", href: "/contacts" },
  PERSONAL_DATA: { name: "Персональные данные", href: "/contacts" },
  PRIVACY: { name: "Политика конфиденциальности", href: "/contacts" },
} as const;

export const headerNavigation: NavLink[] = [PAGES.CATALOG, PAGES.CONTACTS];

export type NavSection = {
  title: string;
  links: NavLink[];
};

export const footerNavigation: NavSection[] = [
  {
    title: "Покупателям",
    links: [
      PAGES.BLOG,
      PAGES.DELIVERY,
      PAGES.RETURNS,
      PAGES.FAQ,
      PAGES.SIZE_GUIDE,
    ],
  },
  {
    title: "О компании",
    links: [PAGES.ABOUT, PAGES.CONTACTS, PAGES.QUALITY],
  },
  {
    title: "Информация",
    links: [PAGES.OFFER, PAGES.PERSONAL_DATA, PAGES.PRIVACY],
  },
];
