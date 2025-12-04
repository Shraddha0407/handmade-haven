import { Link } from 'react-router-dom';
import { ArrowRight, Users, Package, MapPin, Star } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useLanguage } from '@/context/LanguageContext';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import ProductCard from '@/components/ProductCard';
import ArtisanCard from '@/components/ArtisanCard';
import CategoryCard from '@/components/CategoryCard';
import { products } from '@/data/products';
import { artisans } from '@/data/artisans';
import { categories } from '@/data/categories';

const Index = () => {
  const { t } = useLanguage();

  const bestSellingProducts = products.filter(p => p.isBestSeller).slice(0, 4);
  const topArtisans = artisans.slice(0, 4);
  const featuredCategories = categories.slice(0, 6);

  const stats = [
    { value: '500+', label: t.stats.artisans, icon: Users },
    { value: '2,000+', label: t.stats.products, icon: Package },
    { value: '50+', label: t.stats.cities, icon: MapPin },
    { value: '4.8', label: t.stats.rating, icon: Star },
  ];

  return (
    <div className="min-h-screen bg-background">
      <Header />

      <main>
        {/* Hero Section */}
        <section className="relative overflow-hidden bg-gradient-to-br from-muted via-background to-muted">
          <div className="absolute inset-0 opacity-5">
            <div className="absolute top-20 left-10 w-72 h-72 bg-primary rounded-full blur-3xl" />
            <div className="absolute bottom-20 right-10 w-96 h-96 bg-secondary rounded-full blur-3xl" />
          </div>
          
          <div className="container-custom py-16 md:py-24 lg:py-32">
            <div className="grid lg:grid-cols-2 gap-12 items-center">
              <div className="space-y-6 text-center lg:text-left animate-fade-up">
                <h1 className="font-heading text-4xl md:text-5xl lg:text-6xl font-bold text-foreground leading-tight">
                  {t.hero.headline}
                </h1>
                <p className="text-lg text-muted-foreground max-w-xl mx-auto lg:mx-0 whitespace-pre-line">
                  {t.hero.subheadline}
                </p>
                <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start pt-4">
                  <Link to="/products">
                    <Button size="lg" className="text-base px-8 shadow-lg hover:shadow-xl transition-shadow">
                      {t.hero.cta1}
                      <ArrowRight className="ml-2 h-5 w-5" />
                    </Button>
                  </Link>
                  <Link to="/become-seller">
                    <Button size="lg" variant="outline" className="text-base px-8">
                      {t.hero.cta2}
                    </Button>
                  </Link>
                </div>
              </div>

              <div className="relative hidden lg:block">
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-4">
                    <div className="rounded-2xl overflow-hidden shadow-hover animate-fade-up stagger-1">
                      <img
                        src="https://images.unsplash.com/photo-1565193566173-7a0ee3dbe261?w=300&h=400&fit=crop"
                        alt="Pottery"
                        className="w-full h-64 object-cover"
                      />
                    </div>
                    <div className="rounded-2xl overflow-hidden shadow-hover animate-fade-up stagger-3">
                      <img
                        src="https://images.unsplash.com/photo-1515562141207-7a88fb7ce338?w=300&h=300&fit=crop"
                        alt="Jewelry"
                        className="w-full h-48 object-cover"
                      />
                    </div>
                  </div>
                  <div className="space-y-4 pt-8">
                    <div className="rounded-2xl overflow-hidden shadow-hover animate-fade-up stagger-2">
                      <img
                        src="https://images.unsplash.com/photo-1558171813-4c088753af8f?w=300&h=300&fit=crop"
                        alt="Textiles"
                        className="w-full h-48 object-cover"
                      />
                    </div>
                    <div className="rounded-2xl overflow-hidden shadow-hover animate-fade-up stagger-4">
                      <img
                        src="https://images.unsplash.com/photo-1582738411706-bfc8e691d1c2?w=300&h=400&fit=crop"
                        alt="Art"
                        className="w-full h-64 object-cover"
                      />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Stats Section */}
        <section className="py-12 bg-foreground text-background">
          <div className="container-custom">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
              {stats.map((stat, index) => (
                <div key={index} className="text-center animate-fade-up" style={{ animationDelay: `${index * 0.1}s` }}>
                  <stat.icon className="h-8 w-8 mx-auto mb-3 text-primary" />
                  <div className="font-heading text-3xl md:text-4xl font-bold mb-1">{stat.value}</div>
                  <div className="text-sm text-background/70">{stat.label}</div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Featured Categories */}
        <section className="section-padding">
          <div className="container-custom">
            <div className="text-center mb-12">
              <h2 className="font-heading text-3xl md:text-4xl font-bold text-foreground mb-3">
                {t.sections.categories}
              </h2>
              <p className="text-muted-foreground max-w-2xl mx-auto">
                {t.sections.categoriesSubtitle}
              </p>
            </div>

            <div className="grid grid-cols-2 md:grid-cols-3 gap-4 md:gap-6">
              {featuredCategories.map((category, index) => (
                <div key={category.id} className="animate-fade-up" style={{ animationDelay: `${index * 0.1}s` }}>
                  <CategoryCard category={category} />
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Best Selling Products */}
        <section className="section-padding bg-muted/50">
          <div className="container-custom">
            <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-4">
              <div>
                <h2 className="font-heading text-3xl md:text-4xl font-bold text-foreground mb-3">
                  {t.sections.bestSelling}
                </h2>
                <p className="text-muted-foreground">
                  {t.sections.bestSellingSubtitle}
                </p>
              </div>
              <Link to="/products">
                <Button variant="outline" className="group">
                  {t.sections.viewAll}
                  <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
                </Button>
              </Link>
            </div>

            <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6">
              {bestSellingProducts.map((product, index) => (
                <div key={product.id} className="animate-fade-up" style={{ animationDelay: `${index * 0.1}s` }}>
                  <ProductCard product={product} />
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Top Artisans */}
        <section className="section-padding">
          <div className="container-custom">
            <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-4">
              <div>
                <h2 className="font-heading text-3xl md:text-4xl font-bold text-foreground mb-3">
                  {t.sections.topArtisans}
                </h2>
                <p className="text-muted-foreground">
                  {t.sections.topArtisansSubtitle}
                </p>
              </div>
              <Link to="/artisans">
                <Button variant="outline" className="group">
                  {t.sections.viewAll}
                  <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
                </Button>
              </Link>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {topArtisans.map((artisan, index) => (
                <div key={artisan.id} className="animate-fade-up" style={{ animationDelay: `${index * 0.1}s` }}>
                  <ArtisanCard artisan={artisan} />
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-20 bg-gradient-to-r from-primary to-secondary text-primary-foreground">
          <div className="container-custom text-center">
            <h2 className="font-heading text-3xl md:text-4xl font-bold mb-4">
              {t.hero.cta2}
            </h2>
            <p className="text-primary-foreground/80 max-w-2xl mx-auto mb-8">
              {t.seller.subtitle}
            </p>
            <Link to="/become-seller">
              <Button size="lg" variant="secondary" className="text-base px-8">
                {t.hero.cta2}
                <ArrowRight className="ml-2 h-5 w-5" />
              </Button>
            </Link>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
};

export default Index;
