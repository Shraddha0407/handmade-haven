import { useState, useMemo } from 'react';
import { useSearchParams } from 'react-router-dom';
import { Filter, X, ChevronDown, Star } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Slider } from '@/components/ui/slider';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from '@/components/ui/sheet';
import { Checkbox } from '@/components/ui/checkbox';
import { Label } from '@/components/ui/label';
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from '@/components/ui/collapsible';
import { useLanguage } from '@/context/LanguageContext';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import ProductCard from '@/components/ProductCard';
import { products } from '@/data/products';
import { categories } from '@/data/categories';
import { cn } from '@/lib/utils';

const Products = () => {
  const { language, t } = useLanguage();
  const [searchParams, setSearchParams] = useSearchParams();
  
  const [selectedCategory, setSelectedCategory] = useState<string>(
    searchParams.get('category') || ''
  );
  const [priceRange, setPriceRange] = useState<[number, number]>([0, 20000]);
  const [minRating, setMinRating] = useState<number>(0);
  const [sortBy, setSortBy] = useState<string>('newest');
  const [filtersOpen, setFiltersOpen] = useState(false);

  const maxPrice = Math.max(...products.map(p => p.price));

  const filteredProducts = useMemo(() => {
    let filtered = [...products];

    // Category filter
    if (selectedCategory) {
      filtered = filtered.filter(p => {
        const cat = categories.find(c => c.slug === selectedCategory);
        return cat && p.category === cat.name;
      });
    }

    // Price filter
    filtered = filtered.filter(p => p.price >= priceRange[0] && p.price <= priceRange[1]);

    // Rating filter
    if (minRating > 0) {
      filtered = filtered.filter(p => p.rating >= minRating);
    }

    // Sorting
    switch (sortBy) {
      case 'priceLow':
        filtered.sort((a, b) => a.price - b.price);
        break;
      case 'priceHigh':
        filtered.sort((a, b) => b.price - a.price);
        break;
      case 'newest':
      default:
        filtered.sort((a, b) => (b.isNew ? 1 : 0) - (a.isNew ? 1 : 0));
    }

    return filtered;
  }, [selectedCategory, priceRange, minRating, sortBy]);

  const clearFilters = () => {
    setSelectedCategory('');
    setPriceRange([0, 20000]);
    setMinRating(0);
    setSortBy('newest');
    setSearchParams({});
  };

  const hasActiveFilters = selectedCategory || priceRange[0] > 0 || priceRange[1] < 20000 || minRating > 0;

  const FilterContent = () => (
    <div className="space-y-6">
      {/* Category Filter */}
      <Collapsible defaultOpen>
        <CollapsibleTrigger className="flex items-center justify-between w-full py-2 font-medium">
          {t.products.category}
          <ChevronDown className="h-4 w-4" />
        </CollapsibleTrigger>
        <CollapsibleContent className="pt-3 space-y-2">
          <div
            className={cn(
              'px-3 py-2 rounded-lg cursor-pointer transition-colors',
              !selectedCategory ? 'bg-primary text-primary-foreground' : 'hover:bg-muted'
            )}
            onClick={() => setSelectedCategory('')}
          >
            {t.products.allCategories}
          </div>
          {categories.map((cat) => (
            <div
              key={cat.id}
              className={cn(
                'px-3 py-2 rounded-lg cursor-pointer transition-colors',
                selectedCategory === cat.slug ? 'bg-primary text-primary-foreground' : 'hover:bg-muted'
              )}
              onClick={() => setSelectedCategory(cat.slug)}
            >
              {language === 'hi' ? cat.nameHi : cat.name}
            </div>
          ))}
        </CollapsibleContent>
      </Collapsible>

      {/* Price Range */}
      <Collapsible defaultOpen>
        <CollapsibleTrigger className="flex items-center justify-between w-full py-2 font-medium">
          {t.products.priceRange}
          <ChevronDown className="h-4 w-4" />
        </CollapsibleTrigger>
        <CollapsibleContent className="pt-4 px-2">
          <Slider
            value={priceRange}
            min={0}
            max={maxPrice}
            step={100}
            onValueChange={(value) => setPriceRange(value as [number, number])}
            className="mb-4"
          />
          <div className="flex justify-between text-sm text-muted-foreground">
            <span>₹{priceRange[0].toLocaleString()}</span>
            <span>₹{priceRange[1].toLocaleString()}</span>
          </div>
        </CollapsibleContent>
      </Collapsible>

      {/* Rating Filter */}
      <Collapsible defaultOpen>
        <CollapsibleTrigger className="flex items-center justify-between w-full py-2 font-medium">
          {t.products.rating}
          <ChevronDown className="h-4 w-4" />
        </CollapsibleTrigger>
        <CollapsibleContent className="pt-3 space-y-2">
          {[4, 3, 2, 1].map((rating) => (
            <div key={rating} className="flex items-center gap-2">
              <Checkbox
                id={`rating-${rating}`}
                checked={minRating === rating}
                onCheckedChange={(checked) => setMinRating(checked ? rating : 0)}
              />
              <Label htmlFor={`rating-${rating}`} className="flex items-center gap-1 cursor-pointer">
                {rating}
                <Star className="h-4 w-4 fill-accent text-accent" />
                & up
              </Label>
            </div>
          ))}
        </CollapsibleContent>
      </Collapsible>

      {/* Clear Filters */}
      {hasActiveFilters && (
        <Button variant="outline" className="w-full" onClick={clearFilters}>
          <X className="h-4 w-4 mr-2" />
          {t.products.clearFilters}
        </Button>
      )}
    </div>
  );

  return (
    <div className="min-h-screen bg-background">
      <Header />

      <main className="section-padding">
        <div className="container-custom">
          {/* Page Header */}
          <div className="mb-8">
            <h1 className="font-heading text-3xl md:text-4xl font-bold text-foreground mb-2">
              {t.products.title}
            </h1>
            <p className="text-muted-foreground">
              {filteredProducts.length} {t.products.results}
            </p>
          </div>

          <div className="flex gap-8">
            {/* Desktop Sidebar */}
            <aside className="hidden lg:block w-64 shrink-0">
              <div className="sticky top-24">
                <h2 className="font-medium text-lg mb-4">{t.products.filters}</h2>
                <FilterContent />
              </div>
            </aside>

            {/* Main Content */}
            <div className="flex-1">
              {/* Mobile Filter & Sort */}
              <div className="flex items-center justify-between mb-6 lg:mb-8">
                {/* Mobile Filter */}
                <Sheet open={filtersOpen} onOpenChange={setFiltersOpen}>
                  <SheetTrigger asChild className="lg:hidden">
                    <Button variant="outline" size="sm">
                      <Filter className="h-4 w-4 mr-2" />
                      {t.products.filters}
                      {hasActiveFilters && (
                        <span className="ml-2 h-5 w-5 rounded-full bg-primary text-primary-foreground text-xs flex items-center justify-center">
                          !
                        </span>
                      )}
                    </Button>
                  </SheetTrigger>
                  <SheetContent side="left" className="w-80">
                    <SheetHeader>
                      <SheetTitle>{t.products.filters}</SheetTitle>
                    </SheetHeader>
                    <div className="mt-6">
                      <FilterContent />
                    </div>
                  </SheetContent>
                </Sheet>

                {/* Sort */}
                <div className="flex items-center gap-2">
                  <span className="text-sm text-muted-foreground hidden sm:inline">
                    {t.products.sortBy}:
                  </span>
                  <Select value={sortBy} onValueChange={setSortBy}>
                    <SelectTrigger className="w-40">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="newest">{t.products.newest}</SelectItem>
                      <SelectItem value="priceLow">{t.products.priceLow}</SelectItem>
                      <SelectItem value="priceHigh">{t.products.priceHigh}</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>

              {/* Products Grid */}
              <div className="grid grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 md:gap-6">
                {filteredProducts.map((product, index) => (
                  <div key={product.id} className="animate-fade-up" style={{ animationDelay: `${index * 0.05}s` }}>
                    <ProductCard product={product} />
                  </div>
                ))}
              </div>

              {filteredProducts.length === 0 && (
                <div className="text-center py-16">
                  <p className="text-lg text-muted-foreground">
                    {language === 'hi' ? 'कोई उत्पाद नहीं मिला' : 'No products found'}
                  </p>
                  <Button variant="outline" className="mt-4" onClick={clearFilters}>
                    {t.products.clearFilters}
                  </Button>
                </div>
              )}
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default Products;
