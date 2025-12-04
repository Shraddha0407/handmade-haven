import { useState } from 'react';
import { Heart, Star, ShoppingCart, Check } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { useLanguage } from '@/context/LanguageContext';
import { useCart } from '@/context/CartContext';
import { Product } from '@/data/products';
import { cn } from '@/lib/utils';

interface ProductCardProps {
  product: Product;
}

const ProductCard = ({ product }: ProductCardProps) => {
  const { language, t } = useLanguage();
  const { addToCart } = useCart();
  const [isWishlisted, setIsWishlisted] = useState(false);
  const [isAdded, setIsAdded] = useState(false);

  const name = language === 'hi' ? product.nameHi : product.name;
  const category = language === 'hi' ? product.categoryHi : product.category;

  const handleAddToCart = () => {
    addToCart(product);
    setIsAdded(true);
    setTimeout(() => setIsAdded(false), 2000);
  };

  return (
    <Card className="group overflow-hidden border-0 shadow-card card-hover bg-card">
      <div className="relative aspect-square overflow-hidden">
        <img
          src={product.image}
          alt={name}
          className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-110"
        />
        
        {/* Wishlist Button */}
        <button
          onClick={() => setIsWishlisted(!isWishlisted)}
          className={cn(
            'absolute top-3 right-3 p-2 rounded-full transition-all duration-300',
            isWishlisted
              ? 'bg-primary text-primary-foreground'
              : 'bg-background/80 text-foreground hover:bg-background'
          )}
        >
          <Heart className={cn('h-4 w-4', isWishlisted && 'fill-current')} />
        </button>

        {/* Badges */}
        <div className="absolute top-3 left-3 flex flex-col gap-2">
          {product.isBestSeller && (
            <Badge className="bg-accent text-accent-foreground">
              {language === 'hi' ? 'बेस्टसेलर' : 'Best Seller'}
            </Badge>
          )}
          {product.isNew && (
            <Badge className="bg-secondary text-secondary-foreground">
              {language === 'hi' ? 'नया' : 'New'}
            </Badge>
          )}
          {product.originalPrice && (
            <Badge variant="destructive">
              -{Math.round((1 - product.price / product.originalPrice) * 100)}%
            </Badge>
          )}
        </div>

        {/* Quick Add Button */}
        <div className="absolute bottom-0 left-0 right-0 p-3 translate-y-full group-hover:translate-y-0 transition-transform duration-300">
          <Button
            onClick={handleAddToCart}
            className={cn(
              'w-full transition-all',
              isAdded ? 'bg-secondary hover:bg-secondary' : ''
            )}
          >
            {isAdded ? (
              <>
                <Check className="mr-2 h-4 w-4" />
                {t.common.addedToCart}
              </>
            ) : (
              <>
                <ShoppingCart className="mr-2 h-4 w-4" />
                {t.common.addToCart}
              </>
            )}
          </Button>
        </div>
      </div>

      <CardContent className="p-4">
        {/* Category */}
        <p className="text-xs text-muted-foreground mb-1">{category}</p>
        
        {/* Name */}
        <h3 className="font-medium text-foreground line-clamp-1 mb-2">{name}</h3>
        
        {/* Rating */}
        <div className="flex items-center gap-1 mb-2">
          <Star className="h-4 w-4 fill-accent text-accent" />
          <span className="text-sm font-medium">{product.rating}</span>
          <span className="text-xs text-muted-foreground">
            ({product.reviews} {t.common.reviews})
          </span>
        </div>

        {/* Price */}
        <div className="flex items-center gap-2">
          <span className="text-lg font-bold text-foreground">
            ₹{product.price.toLocaleString()}
          </span>
          {product.originalPrice && (
            <span className="text-sm text-muted-foreground line-through">
              ₹{product.originalPrice.toLocaleString()}
            </span>
          )}
        </div>
      </CardContent>
    </Card>
  );
};

export default ProductCard;
