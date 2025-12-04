import { useLanguage } from '@/context/LanguageContext';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import ArtisanCard from '@/components/ArtisanCard';
import { artisans } from '@/data/artisans';

const Artisans = () => {
  const { t } = useLanguage();

  return (
    <div className="min-h-screen bg-background">
      <Header />

      <main className="section-padding">
        <div className="container-custom">
          {/* Page Header */}
          <div className="text-center mb-12">
            <h1 className="font-heading text-3xl md:text-4xl font-bold text-foreground mb-3">
              {t.artisans.title}
            </h1>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              {t.artisans.subtitle}
            </p>
          </div>

          {/* Artisans Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {artisans.map((artisan, index) => (
              <div key={artisan.id} className="animate-fade-up" style={{ animationDelay: `${index * 0.1}s` }}>
                <ArtisanCard artisan={artisan} />
              </div>
            ))}
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default Artisans;
