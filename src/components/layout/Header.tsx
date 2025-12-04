import { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Search, ShoppingCart, User, Menu, X } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Sheet, SheetContent, SheetTrigger, SheetClose } from '@/components/ui/sheet';
import { Badge } from '@/components/ui/badge';
import { useLanguage } from '@/context/LanguageContext';
import { useCart } from '@/context/CartContext';
import { cn } from '@/lib/utils';

const Header = () => {
  const { language, setLanguage, t } = useLanguage();
  const { totalItems } = useCart();
  const location = useLocation();
  const [searchOpen, setSearchOpen] = useState(false);

  const navLinks = [
    { href: '/', label: t.nav.home },
    { href: '/products', label: t.nav.products },
    { href: '/artisans', label: t.nav.artisans },
    { href: '/become-seller', label: t.nav.becomeSeller },
  ];

  const isActive = (path: string) => location.pathname === path;

  return (
    <header className="sticky top-0 z-50 w-full border-b border-border bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container-custom">
        <div className="flex h-16 items-center justify-between">
          {/* Logo */}
          <Link to="/" className="flex items-center gap-2">
            <div className="flex items-center">
              <span className="font-heading text-xl md:text-2xl font-bold text-primary">
                Handmade
              </span>
              <span className="font-heading text-xl md:text-2xl font-bold text-secondary">
                Haven
              </span>
            </div>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden lg:flex items-center gap-8">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                to={link.href}
                className={cn(
                  'text-sm font-medium transition-colors hover:text-primary relative',
                  isActive(link.href)
                    ? 'text-primary'
                    : 'text-muted-foreground'
                )}
              >
                {link.label}
                {isActive(link.href) && (
                  <span className="absolute -bottom-1 left-0 right-0 h-0.5 bg-primary rounded-full" />
                )}
              </Link>
            ))}
          </nav>

          {/* Actions */}
          <div className="flex items-center gap-2 md:gap-4">
            {/* Search - Desktop */}
            <div className="hidden md:flex items-center">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <Input
                  placeholder={t.nav.search}
                  className="pl-10 w-64 bg-muted/50 border-0 focus-visible:ring-primary"
                />
              </div>
            </div>

            {/* Search - Mobile */}
            <Sheet open={searchOpen} onOpenChange={setSearchOpen}>
              <SheetTrigger asChild className="md:hidden">
                <Button variant="ghost" size="icon">
                  <Search className="h-5 w-5" />
                </Button>
              </SheetTrigger>
              <SheetContent side="top" className="h-auto">
                <div className="pt-4">
                  <div className="relative">
                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                    <Input
                      placeholder={t.nav.search}
                      className="pl-10 w-full"
                      autoFocus
                    />
                  </div>
                </div>
              </SheetContent>
            </Sheet>

            {/* Language Toggle */}
            <div className="flex items-center border border-border rounded-full overflow-hidden">
              <button
                onClick={() => setLanguage('en')}
                className={cn(
                  'px-2.5 py-1 text-xs font-medium transition-colors',
                  language === 'en'
                    ? 'bg-primary text-primary-foreground'
                    : 'text-muted-foreground hover:text-foreground'
                )}
              >
                EN
              </button>
              <button
                onClick={() => setLanguage('hi')}
                className={cn(
                  'px-2.5 py-1 text-xs font-medium transition-colors',
                  language === 'hi'
                    ? 'bg-primary text-primary-foreground'
                    : 'text-muted-foreground hover:text-foreground'
                )}
              >
                हि
              </button>
            </div>

            {/* Cart */}
            <Link to="/cart">
              <Button variant="ghost" size="icon" className="relative">
                <ShoppingCart className="h-5 w-5" />
                {totalItems > 0 && (
                  <Badge className="absolute -top-1 -right-1 h-5 w-5 flex items-center justify-center p-0 text-xs bg-primary">
                    {totalItems}
                  </Badge>
                )}
              </Button>
            </Link>

            {/* User */}
            <Button variant="ghost" size="icon" className="hidden md:flex">
              <User className="h-5 w-5" />
            </Button>

            {/* Mobile Menu */}
            <Sheet>
              <SheetTrigger asChild className="lg:hidden">
                <Button variant="ghost" size="icon">
                  <Menu className="h-5 w-5" />
                </Button>
              </SheetTrigger>
              <SheetContent side="right" className="w-80">
                <div className="flex flex-col gap-6 pt-8">
                  <nav className="flex flex-col gap-4">
                    {navLinks.map((link) => (
                      <SheetClose key={link.href} asChild>
                        <Link
                          to={link.href}
                          className={cn(
                            'text-lg font-medium transition-colors py-2 border-b border-border',
                            isActive(link.href)
                              ? 'text-primary'
                              : 'text-foreground hover:text-primary'
                          )}
                        >
                          {link.label}
                        </Link>
                      </SheetClose>
                    ))}
                  </nav>
                  <div className="flex items-center gap-4 pt-4">
                    <User className="h-5 w-5 text-muted-foreground" />
                    <span className="text-sm text-muted-foreground">Account</span>
                  </div>
                </div>
              </SheetContent>
            </Sheet>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
