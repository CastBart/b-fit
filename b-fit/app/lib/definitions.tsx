export type HomeNavBarItem = {
  id: string;
  href: string;
  text: string;
};

export type Pages = {
  [key: string]: Page;
};

export type Page = {
  name: string;
  link: string;
};
//Webiste Links
export const pages: Pages = {
  home: { name: "Home", link: "/home" },
  about: { name: "Login", link: "/about" },
  services: { name: "Services", link: "/services" },
};
