import { useParams, Link } from 'react-router-dom';
import { MapPin, Star, ShieldCheck, Calendar, Users, Package, MessageCircle, UserPlus } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Separator } from '@/components/ui/separator';
import { useLanguage } from '@/context/LanguageContext';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import ProductCard from '@/components/ProductCard';
import { artisans } from '@/data/artisans';
import { products } from '@/data/products';

const ArtisanProfile = () => {
  const { id } = useParams();
  const { language, t } = useLanguage();

  const artisan = artisans.find(a => a.id === Number(id));

  if (!artisan) {
    return (
      <div className="min-h-screen bg-background">
        <Header />
        <main className="section-padding text-center">
          <h1 className="font-heading text-2xl font-bold">Artisan not found</h1>
          <Link to="/artisans">
            <Button className="mt-4">Back to Artisans</Button>
          </Link>
        </main>
        <Footer />
      </div>
    );
  }

  const name = language === 'hi' ? artisan.nameHi : artisan.name;
  const tagline = language === 'hi' ? artisan.taglineHi : artisan.tagline;
  const bio = language === 'hi' ? artisan.bioHi : artisan.bio;
  const location = language === 'hi' ? artisan.locationHi : artisan.location;
  const skills = language === 'hi' ? artisan.skillsHi : artisan.skills;

  const artisanProducts = products.filter(p => p.artisanId === artisan.id);

  return (
    <div className="min-h-screen bg-background">
      <Header />

      <main>
        {/* Cover Image */}
        <div className="relative h-48 md:h-64 lg:h-80">
          <img
            src={artisan.coverImage}
            alt={name}
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-foreground/60 to-transparent" />
        </div>

        {/* Profile Header */}
        <div className="container-custom">
          <div className="relative -mt-16 md:-mt-20 pb-8">
            <div className="flex flex-col md:flex-row md:items-end gap-4 md:gap-6">
              {/* Avatar */}
              <Avatar className="h-28 w-28 md:h-36 md:w-36 border-4 border-background shadow-lg">
                <AvatarImage src={artisan.avatar} alt={name} />
                <AvatarFallback className="bg-primary text-primary-foreground text-3xl">
                  {name.charAt(0)}
                </AvatarFallback>
              </Avatar>

              {/* Info */}
              <div className="flex-1 bg-background rounded-lg p-4 md:p-0 md:bg-transparent">
                <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
                  <div>
                    <div className="flex items-center gap-2">
                      <h1 className="font-heading text-2xl md:text-3xl font-bold text-foreground">
                        {name}
                      </h1>
                      {artisan.isVerified && (
                        <ShieldCheck className="h-6 w-6 text-secondary" />
                      )}
                    </div>
                    <p className="text-muted-foreground mt-1">{tagline}</p>
                  </div>
                  
                  <div className="flex gap-3">
                    <Button variant="outline" className="flex-1 md:flex-none">
                      <UserPlus className="h-4 w-4 mr-2" />
                      {t.artisans.follow}
                    </Button>
                    <Button className="flex-1 md:flex-none">
                      <MessageCircle className="h-4 w-4 mr-2" />
                      {t.artisans.message}
                    </Button>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Stats & Info */}
          <div className="grid md:grid-cols-3 gap-8 pb-12">
            {/* Left Column - Stats */}
            <div className="space-y-6">
              {/* Quick Stats */}
              <div className="grid grid-cols-3 gap-4 p-4 bg-muted rounded-xl">
                <div className="text-center">
                  <Package className="h-5 w-5 mx-auto mb-1 text-primary" />
                  <div className="font-bold text-lg">{artisan.productsCount}</div>
                  <div className="text-xs text-muted-foreground">{t.artisans.products}</div>
                </div>
                <div className="text-center">
                  <Users className="h-5 w-5 mx-auto mb-1 text-primary" />
                  <div className="font-bold text-lg">{artisan.followers.toLocaleString()}</div>
                  <div className="text-xs text-muted-foreground">{t.artisans.followers}</div>
                </div>
                <div className="text-center">
                  <Star className="h-5 w-5 mx-auto mb-1 text-accent" />
                  <div className="font-bold text-lg">{artisan.rating}</div>
                  <div className="text-xs text-muted-foreground">{t.stats.rating}</div>
                </div>
              </div>

              {/* Location */}
              <div className="p-4 bg-card rounded-xl shadow-soft">
                <h3 className="font-medium mb-2 flex items-center gap-2">
                  <MapPin className="h-4 w-4 text-primary" />
                  {t.artisans.location}
                </h3>
                <p className="text-muted-foreground">{location}</p>
              </div>

              {/* Skills */}
              <div className="p-4 bg-card rounded-xl shadow-soft">
                <h3 className="font-medium mb-3">{t.artisans.skills}</h3>
                <div className="flex flex-wrap gap-2">
                  {skills.map((skill, index) => (
                    <Badge key={index} variant="secondary">
                      {skill}
                    </Badge>
                  ))}
                </div>
              </div>

              {/* Member Since */}
              <div className="flex items-center gap-2 text-sm text-muted-foreground">
                <Calendar className="h-4 w-4" />
                <span>
                  {language === 'hi' ? 'से सदस्य' : 'Member since'} {artisan.joinedYear}
                </span>
              </div>
            </div>

            {/* Right Column - About & Products */}
            <div className="md:col-span-2 space-y-8">
              {/* About */}
              <div>
                <h2 className="font-heading text-xl font-semibold mb-3">{t.artisans.about}</h2>
                <p className="text-muted-foreground leading-relaxed">{bio}</p>
              </div>

              <Separator />

              {/* Artisan's Products */}
              <div>
                <h2 className="font-heading text-xl font-semibold mb-6">{t.artisans.artisanProducts}</h2>
                {artisanProducts.length > 0 ? (
                  <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                    {artisanProducts.map((product) => (
                      <ProductCard key={product.id} product={product} />
                    ))}
                  </div>
                ) : (
                  <p className="text-muted-foreground">
                    {language === 'hi' ? 'कोई उत्पाद नहीं' : 'No products yet'}
                  </p>
                )}
              </div>
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default ArtisanProfile;
