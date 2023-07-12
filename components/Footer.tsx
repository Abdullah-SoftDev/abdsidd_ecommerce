const footerSections = [
  {
    title: "SHOP",
    links: [
      { label: "T-SHIRTS", href: "/tshirts" },
      { label: "AIRPOD", href: "/sweatshirts" },
      { label: "HOODIES", href: "/hoodies" }
    ]
  },
  {
    title: "CUSTOMER SERVICE",
    links: [
      { label: "Contact Us", href: "/contact" },
      { label: "About Us", href: "/about" },
      { label: "Return Policy", href: "/returnpolicy" }
    ]
  },
  {
    title: "POLICY",
    links: [
      { label: "Privacy Policy", href: "/privacy" },
      { label: "Terms and Conditions", href: "/terms" }
    ]
  }
];

export default function Footer() {
  return (
    <footer className="mx-auto px-2 bg-zinc-100">
      <div className="flex lg:items-center lg:flex-row lg:flex-nowrap flex-wrap flex-col mx-auto max-w-5xl">
        <div className="lg:w-1/4 flex items-center justify-center w-full px-2">
          <nav className="list-none w-60">
            <img
              src="https://codeswear.com/_next/image?url=%2Flogo.png&w=640&q=75"
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
