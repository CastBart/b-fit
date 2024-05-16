export type HomeNavBarItem = {
  id: string;
  href: string;
  text: string;
};

//Start User Type
export type User = {
  id: string;
  name: string;
  email: string;
  password: string;
};


export type Pages = {
  [key: string]: Page;
};

export type Page = {
  name: string;
  link: string;
};
//Webiste Links
export const websiteLinks: Pages = {
  home: { name: "Home", link: "/" },
  welcome: {name: "Welcome", link: "/welcome"},
  login: { name: "Login", link: "/login" },
  register: {name: "register", link: "/register"},
  services: { name: "Services", link: "/services" },
};
