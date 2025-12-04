import { Link } from 'react-router-dom';
import { MapPin, Star, ShieldCheck } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { useLanguage } from '@/context/LanguageContext';
import { Artisan } from '@/data/artisans';

interface ArtisanCardProps {
  artisan: Artisan;
}

const ArtisanCard = ({ artisan }: ArtisanCardProps) => {
  const { language, t } = useLanguage();

  const name = language === 'hi' ? artisan.nameHi : artisan.name;
  const tagline = language === 'hi' ? artisan.taglineHi : artisan.tagline;
  const location = language === 'hi' ? artisan.locationHi : artisan.location;
  const skills = language === 'hi' ? artisan.skillsHi : artisan.skills;

  return (
    <Card className="overflow-hidden border-0 shadow-card card-hover bg-card">
      {/* Cover Image */}
      <div className="relative h-32 overflow-hidden">
        <img
          src={artisan.coverImage}
          alt={name}
          className="h-full w-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-foreground/60 to-transparent" />
      </div>

      <CardContent className="relative pt-0 px-4 pb-4">
        {/* Avatar */}
        <div className="relative -mt-10 mb-3">
          <Avatar className="h-20 w-20 border-4 border-card shadow-lg">
            <AvatarImage src={artisan.avatar} alt={name} />
            <AvatarFallback className="bg-primary text-primary-foreground text-xl">
              {name.charAt(0)}
            </AvatarFallback>
          </Avatar>
          {artisan.isVerified && (
            <div className="absolute bottom-0 right-0 bg-secondary text-secondary-foreground p-1 rounded-full">
              <ShieldCheck className="h-4 w-4" />
            </div>
          )}
        </div>

        {/* Info */}
        <div className="space-y-2">
          <div>
            <h3 className="font-heading font-semibold text-lg text-foreground">{name}</h3>
            <p className="text-sm text-muted-foreground">{tagline}</p>
          </div>

          <div className="flex items-center gap-1 text-sm text-muted-foreground">
            <MapPin className="h-3.5 w-3.5" />
            <span>{location}</span>
          </div>

          <div className="flex items-center gap-1">
            <Star className="h-4 w-4 fill-accent text-accent" />
            <span className="text-sm font-medium">{artisan.rating}</span>
            <span className="text-xs text-muted-foreground">
              • {artisan.productsCount} {t.artisans.products}
            </span>
          </div>

          {/* Skills */}
          <div className="flex flex-wrap gap-1.5 pt-1">
            {skills.slice(0, 2).map((skill, index) => (
              <Badge key={index} variant="secondary" className="text-xs font-normal">
                {skill}
              </Badge>
            ))}
            {skills.length > 2 && (
              <Badge variant="outline" className="text-xs font-normal">
                +{skills.length - 2}
              </Badge>
            )}
          </div>
        </div>

        {/* CTA */}
        <Link to={`/artisans/${artisan.id}`} className="block mt-4">
          <Button variant="outline" className="w-full">
            {t.artisans.viewProfile}
          </Button>
        </Link>
      </CardContent>
    </Card>
  );
};

export default ArtisanCard;
