import { Smartphone, Globe, Mail, Phone, MapPin, Facebook, Twitter, Instagram, Linkedin } from 'lucide-react';

const Footer = () => {
  const footerSections = [
    {
      title: 'Our eSIMs',
      links: [
        { name: 'Kenya eSIM', href: '/country/ke' },
        { name: 'Tanzania eSIM', href: '/country/tz' },
        { name: 'Uganda eSIM', href: '/country/ug' },
        { name: 'Rwanda eSIM', href: '/country/rw' },
        { name: 'Burundi eSIM', href: '/country/bi' },
        { name: 'East Africa Bundle', href: '/our-esims' },
      ],
    },
    {
      title: 'Company',
      links: [
        { name: 'About AfriRoam', href: '/about' },
        { name: 'How It Works', href: '/about' },
        { name: 'Coverage Map', href: '/about' },
        { name: 'Careers', href: '/about' },
        { name: 'Press', href: '/about' },
        { name: 'Partners', href: '/about' },
      ],
    },
    {
      title: 'Get Help',
      links: [
        { name: 'Support Center', href: '/help' },
        { name: 'Installation Guide', href: '/help' },
        { name: 'Device Compatibility', href: '/help' },
        { name: 'Troubleshooting', href: '/help' },
        { name: 'Contact Us', href: '/contact' },
        { name: 'Live Chat', href: '/contact' },
      ],
    },
    {
      title: 'Magazine',
      links: [
        { name: 'Travel Guides', href: '/magazine' },
        { name: 'East Africa Tips', href: '/magazine' },
        { name: 'Cultural Insights', href: '/magazine' },
        { name: 'Tech Updates', href: '/magazine' },
        { name: 'eSIM News', href: '/magazine' },
        { name: 'Blog', href: '/magazine' },
      ],
    },
  ];

  const socialLinks = [
    { icon: Facebook, href: '#', name: 'Facebook' },
    { icon: Twitter, href: '#', name: 'Twitter' },
    { icon: Instagram, href: '#', name: 'Instagram' },
    { icon: Linkedin, href: '#', name: 'LinkedIn' },
  ];

  return (
    <footer className="bg-card border-t border-border">
      <div className="container px-4 py-16">
        {/* Main Footer Content */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-6 gap-8">
          {/* Brand Column */}
          <div className="lg:col-span-2 space-y-6">
            {/* Logo */}
            <div className="flex items-center space-x-2">
              <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-gradient-safari">
                <Smartphone className="h-6 w-6 text-white" />
              </div>
              <span className="text-2xl font-bold text-gradient">AfriRoam</span>
            </div>

            {/* Description */}
            <p className="text-muted-foreground leading-relaxed max-w-sm">
              Connecting East Africa with cutting-edge eSIM technology. 
              One number, seamless connectivity across Kenya, Tanzania, Uganda, Rwanda, and Burundi.
            </p>

            {/* Contact Info */}
            <div className="space-y-3">
              <div className="flex items-center gap-3 text-sm">
                <Mail className="h-4 w-4 text-primary" />
                <span>support@afriroam.com</span>
              </div>
              <div className="flex items-center gap-3 text-sm">
                <Phone className="h-4 w-4 text-primary" />
                <span>+254 700 123 456</span>
              </div>
              <div className="flex items-center gap-3 text-sm">
                <MapPin className="h-4 w-4 text-primary" />
                <span>Nairobi, Kenya</span>
              </div>
            </div>

            {/* Social Links */}
            <div className="flex gap-4">
              {socialLinks.map((social, index) => (
                <a
                  key={index}
                  href={social.href}
                  aria-label={social.name}
                  className="flex h-10 w-10 items-center justify-center rounded-lg bg-muted hover:bg-primary hover:text-primary-foreground transition-colors duration-200"
                >
                  <social.icon className="h-5 w-5" />
                </a>
              ))}
            </div>
          </div>

          {/* Links Columns */}
          {footerSections.map((section, index) => (
            <div key={index} className="space-y-4">
              <h3 className="font-semibold text-lg">{section.title}</h3>
              <ul className="space-y-3">
                {section.links.map((link, linkIndex) => (
                  <li key={linkIndex}>
                    <a
                      href={link.href}
                      className="text-muted-foreground hover:text-primary transition-colors duration-200 text-sm"
                    >
                      {link.name}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Bottom Section */}
        <div className="border-t border-border pt-8 mt-16">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            {/* Copyright */}
            <div className="flex items-center gap-2 text-sm text-muted-foreground">
              <Globe className="h-4 w-4" />
              <span>© 2024 AfriRoam. All rights reserved.</span>
            </div>

            {/* Legal Links */}
            <div className="flex gap-6 text-sm">
              <a href="#" className="text-muted-foreground hover:text-primary transition-colors">
                Privacy Policy
              </a>
              <a href="#" className="text-muted-foreground hover:text-primary transition-colors">
                Terms of Service
              </a>
              <a href="#" className="text-muted-foreground hover:text-primary transition-colors">
                Cookie Policy
              </a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;