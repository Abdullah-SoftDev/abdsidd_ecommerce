const footerSections = [
  {
    title: "SHOP",
    links: [
      { label: "T-SHIRTS", href: "/tshirts" },
      { label: "AIRPOD", href: "/airpod" },
      { label: "HOODIES", href: "/iwatch" }
    ]
  },
  {
    title: "CUSTOMER SERVICE",
    links: [
      { label: "Contact Us", href: "/" },
      { label: "About Us", href: "/about" },
      { label: "Return Policy", href: "/" }
    ]
  },
  {
    title: "POLICY",
    links: [
      { label: "Privacy Policy", href: "/" },
      { label: "Terms and Conditions", href: "/" }
    ]
  }
];

export default function Footer() {
  return (
    <footer className="mx-auto px-2 bg-zinc-100">
      <div className="flex lg:items-center lg:flex-row lg:flex-nowrap flex-wrap flex-col mx-auto max-w-5xl">
        <div className="lg:w-1/4 flex items-center justify-center w-full px-2">
          <nav className="list-none w-60 pt-3">
            <img
              src="https://www.logolynx.com/images/logolynx/56/56afea50b83164e3e272d4ebeccd94fb.png"
              alt=""
            />
          </nav>
        </div>
        <div className="flex-grow flex flex-wrap lg:justify-end justify-center mt-10 text-center">
          {footerSections.map((section, index) => (
            <div className="sm:w-1/4 w-full px-4" key={index}>
              <h2 className="title-font font-medium tracking-widest text-sm mb-3">
                {section.title}
              </h2>
              <nav className="list-none mb-10">
                {section.links.map((link, linkIndex) => (
                  <li key={linkIndex}>
                    <a className="hover:text-pink-600" href={link.href}>
                      {link.label}
                    </a>
                  </li>
                ))}
              </nav>
            </div>
          ))}
        </div>
      </div>
    </footer>
  );
}
