import { Link } from 'react-router-dom';
import { Minus, Plus, Trash2, ShoppingBag, ArrowRight, Tag } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';
import { useLanguage } from '@/context/LanguageContext';
import { useCart } from '@/context/CartContext';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';

const Cart = () => {
  const { language, t } = useLanguage();
  const { items, updateQuantity, removeFromCart, totalPrice } = useCart();

  if (items.length === 0) {
    return (
      <div className="min-h-screen bg-background">
        <Header />
        <main className="section-padding">
          <div className="container-custom max-w-lg text-center">
            <ShoppingBag className="h-20 w-20 mx-auto mb-6 text-muted-foreground" />
            <h1 className="font-heading text-2xl font-bold text-foreground mb-4">
              {t.cart.empty}
            </h1>
            <Link to="/products">
              <Button size="lg">
                {t.cart.continueShopping}
              </Button>
            </Link>
          </div>
        </main>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <Header />

      <main className="section-padding">
        <div className="container-custom">
          <h1 className="font-heading text-3xl font-bold text-foreground mb-8">
            {t.cart.title}
          </h1>

          <div className="grid lg:grid-cols-3 gap-8">
            {/* Cart Items */}
            <div className="lg:col-span-2 space-y-4">
              {items.map((item) => {
                const name = language === 'hi' ? item.nameHi : item.name;
                return (
                  <Card key={item.id} className="border-0 shadow-soft overflow-hidden">
                    <CardContent className="p-4">
                      <div className="flex gap-4">
                        {/* Image */}
                        <div className="w-24 h-24 rounded-lg overflow-hidden shrink-0">
                          <img
                            src={item.image}
                            alt={name}
                            className="w-full h-full object-cover"
                          />
                        </div>

                        {/* Details */}
                        <div className="flex-1 min-w-0">
                          <h3 className="font-medium text-foreground truncate">{name}</h3>
                          <p className="text-sm text-muted-foreground">{item.artisanName}</p>
                          <p className="text-lg font-bold text-foreground mt-1">
                            ₹{item.price.toLocaleString()}
                          </p>
                        </div>

                        {/* Quantity & Remove */}
                        <div className="flex flex-col items-end justify-between">
                          <Button
                            variant="ghost"
                            size="icon"
                            onClick={() => removeFromCart(item.id)}
                            className="text-destructive hover:text-destructive"
                          >
                            <Trash2 className="h-4 w-4" />
                          </Button>
                          
                          <div className="flex items-center gap-2">
                            <Button
                              variant="outline"
                              size="icon"
                              className="h-8 w-8"
                              onClick={() => updateQuantity(item.id, item.quantity - 1)}
                            >
                              <Minus className="h-3 w-3" />
                            </Button>
                            <span className="w-8 text-center font-medium">{item.quantity}</span>
                            <Button
                              variant="outline"
                              size="icon"
                              className="h-8 w-8"
                              onClick={() => updateQuantity(item.id, item.quantity + 1)}
                            >
                              <Plus className="h-3 w-3" />
                            </Button>
                          </div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                );
              })}
            </div>

            {/* Order Summary */}
            <div>
              <Card className="border-0 shadow-card sticky top-24">
                <CardContent className="p-6">
                  <h2 className="font-heading text-xl font-semibold mb-6">
                    {language === 'hi' ? 'ऑर्डर सारांश' : 'Order Summary'}
                  </h2>

                  <div className="space-y-3">
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">{t.cart.subtotal}</span>
                      <span className="font-medium">₹{totalPrice.toLocaleString()}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">{t.cart.shipping}</span>
                      <span className="font-medium text-secondary">{t.cart.free}</span>
                    </div>
                  </div>

                  <Separator className="my-4" />

                  {/* Coupon */}
                  <div className="mb-4">
                    <p className="text-sm text-muted-foreground mb-2 flex items-center gap-2">
                      <Tag className="h-4 w-4" />
                      {t.cart.coupon}
                    </p>
                    <div className="flex gap-2">
                      <Input placeholder="ARTISAN10" className="flex-1" />
                      <Button variant="outline">{t.cart.applyCoupon}</Button>
                    </div>
                  </div>

                  <Separator className="my-4" />

                  <div className="flex justify-between mb-6">
                    <span className="font-semibold text-lg">{t.cart.total}</span>
                    <span className="font-bold text-xl text-primary">
                      ₹{totalPrice.toLocaleString()}
                    </span>
                  </div>

                  <Link to="/checkout" className="block">
                    <Button className="w-full" size="lg">
                      {t.cart.proceedCheckout}
                      <ArrowRight className="ml-2 h-4 w-4" />
                    </Button>
                  </Link>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default Cart;
