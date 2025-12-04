import { Link } from 'react-router-dom';
import { Facebook, Instagram, Twitter, Youtube, Mail } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { useLanguage } from '@/context/LanguageContext';

const Footer = () => {
  const { t } = useLanguage();

  return (
    <footer className="bg-foreground text-background">
      <div className="container-custom py-12 md:py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-12">
          {/* About */}
          <div className="space-y-4">
            <div className="flex items-center">
              <span className="font-heading text-xl font-bold text-primary">Handmade</span>
              <span className="font-heading text-xl font-bold text-accent">Haven</span>
            </div>
            <p className="text-sm text-background/70 leading-relaxed">
              {t.footer.about}
            </p>
            <div className="flex gap-4 pt-2">
              <a href="#" className="text-background/60 hover:text-primary transition-colors">
                <Facebook className="h-5 w-5" />
              </a>
              <a href="#" className="text-background/60 hover:text-primary transition-colors">
                <Instagram className="h-5 w-5" />
              </a>
              <a href="#" className="text-background/60 hover:text-primary transition-colors">
                <Twitter className="h-5 w-5" />
              </a>
              <a href="#" className="text-background/60 hover:text-primary transition-colors">
                <Youtube className="h-5 w-5" />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div className="space-y-4">
            <h4 className="font-heading font-semibold text-lg">{t.footer.quickLinks}</h4>
            <ul className="space-y-2">
              <li>
                <Link to="/" className="text-sm text-background/70 hover:text-primary transition-colors">
                  {t.nav.home}
                </Link>
              </li>
              <li>
                <Link to="/products" className="text-sm text-background/70 hover:text-primary transition-colors">
                  {t.nav.products}
                </Link>
              </li>
              <li>
                <Link to="/artisans" className="text-sm text-background/70 hover:text-primary transition-colors">
                  {t.nav.artisans}
                </Link>
              </li>
              <li>
                <Link to="/become-seller" className="text-sm text-background/70 hover:text-primary transition-colors">
                  {t.nav.becomeSeller}
                </Link>
              </li>
            </ul>
          </div>

          {/* Customer Service */}
          <div className="space-y-4">
            <h4 className="font-heading font-semibold text-lg">{t.footer.customerService}</h4>
            <ul className="space-y-2">
              <li>
                <a href="#" className="text-sm text-background/70 hover:text-primary transition-colors">
                  {t.footer.contact}
                </a>
              </li>
              <li>
                <a href="#" className="text-sm text-background/70 hover:text-primary transition-colors">
                  {t.footer.faq}
                </a>
              </li>
              <li>
                <a href="#" className="text-sm text-background/70 hover:text-primary transition-colors">
                  {t.footer.shipping}
                </a>
              </li>
              <li>
                <a href="#" className="text-sm text-background/70 hover:text-primary transition-colors">
                  {t.footer.returns}
                </a>
              </li>
            </ul>
          </div>

          {/* Newsletter */}
          <div className="space-y-4">
            <h4 className="font-heading font-semibold text-lg">{t.footer.newsletter}</h4>
            <p className="text-sm text-background/70">{t.footer.newsletterText}</p>
            <div className="flex gap-2">
              <Input
                type="email"
                placeholder={t.footer.emailPlaceholder}
                className="bg-background/10 border-background/20 text-background placeholder:text-background/50"
              />
              <Button variant="default" className="shrink-0">
                <Mail className="h-4 w-4" />
              </Button>
            </div>
          </div>
        </div>

        {/* Copyright */}
        <div className="mt-12 pt-8 border-t border-background/10">
          <p className="text-center text-sm text-background/60">
            {t.footer.copyright}
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
