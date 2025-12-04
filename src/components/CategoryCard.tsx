import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';
import { useLanguage } from '@/context/LanguageContext';
import { Category } from '@/data/categories';

interface CategoryCardProps {
  category: Category;
}

const CategoryCard = ({ category }: CategoryCardProps) => {
  const { language } = useLanguage();
  const name = language === 'hi' ? category.nameHi : category.name;

  return (
    <Link
      to={`/products?category=${category.slug}`}
      className="group relative overflow-hidden rounded-2xl aspect-[4/5] block"
    >
      <img
        src={category.image}
        alt={name}
        className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-110"
      />
      
      {/* Overlay */}
      <div className="absolute inset-0 bg-gradient-to-t from-foreground/80 via-foreground/20 to-transparent" />
      
      {/* Content */}
      <div className="absolute bottom-0 left-0 right-0 p-5">
        <h3 className="font-heading text-xl font-semibold text-background mb-1">
          {name}
        </h3>
        <p className="text-sm text-background/70 mb-3">
          {category.productCount}+ {language === 'hi' ? 'उत्पाद' : 'products'}
        </p>
        <div className="flex items-center gap-2 text-sm font-medium text-background group-hover:text-accent transition-colors">
          <span>{language === 'hi' ? 'देखें' : 'Explore'}</span>
          <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
        </div>
      </div>
    </Link>
  );
};

export default CategoryCard;
