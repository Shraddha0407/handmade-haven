import { useState } from 'react';
import { Link } from 'react-router-dom';
import { Check, CreditCard, Smartphone, Truck } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent } from '@/components/ui/card';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Separator } from '@/components/ui/separator';
import { useLanguage } from '@/context/LanguageContext';
import { useCart } from '@/context/CartContext';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import { cn } from '@/lib/utils';

const Checkout = () => {
  const { language, t } = useLanguage();
  const { items, totalPrice, clearCart } = useCart();
  const [paymentMethod, setPaymentMethod] = useState('cod');
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitted(true);
    clearCart();
  };

  if (isSubmitted) {
    const orderNumber = `HH${Date.now().toString().slice(-8)}`;
    return (
      <div className="min-h-screen bg-background">
        <Header />
        <main className="section-padding">
          <div className="container-custom max-w-lg text-center">
            <div className="mb-6 inline-flex items-center justify-center w-20 h-20 rounded-full bg-secondary/10">
              <Check className="w-10 h-10 text-secondary" />
            </div>
            <h1 className="font-heading text-3xl font-bold text-foreground mb-4">
              {t.checkout.orderConfirmed}
            </h1>
            <p className="text-muted-foreground mb-4">
              {t.checkout.orderMessage}
            </p>
            <p className="text-sm text-muted-foreground mb-8">
              {t.checkout.orderNumber}: <span className="font-mono font-bold text-foreground">{orderNumber}</span>
            </p>
            <Link to="/">
              <Button size="lg">
                {t.seller.backHome}
              </Button>
            </Link>
          </div>
        </main>
        <Footer />
      </div>
    );
  }

  if (items.length === 0) {
    return (
      <div className="min-h-screen bg-background">
        <Header />
        <main className="section-padding text-center">
          <h1 className="font-heading text-2xl font-bold">{t.cart.empty}</h1>
          <Link to="/products">
            <Button className="mt-4">{t.cart.continueShopping}</Button>
          </Link>
        </main>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <Header />

      <main className="section-padding">
        <div className="container-custom max-w-5xl">
          <h1 className="font-heading text-3xl font-bold text-foreground mb-8">
            {t.checkout.title}
          </h1>

          <form onSubmit={handleSubmit}>
            <div className="grid lg:grid-cols-3 gap-8">
              {/* Shipping & Payment */}
              <div className="lg:col-span-2 space-y-8">
                {/* Shipping Details */}
                <Card className="border-0 shadow-card">
                  <CardContent className="p-6">
                    <h2 className="font-heading text-xl font-semibold mb-6 flex items-center gap-2">
                      <Truck className="h-5 w-5 text-primary" />
                      {t.checkout.shippingDetails}
                    </h2>

                    <div className="grid md:grid-cols-2 gap-6">
                      <div className="space-y-2">
                        <Label htmlFor="firstName">{t.checkout.firstName}</Label>
                        <Input id="firstName" required />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="lastName">{t.checkout.lastName}</Label>
                        <Input id="lastName" required />
                      </div>
                      <div className="space-y-2 md:col-span-2">
                        <Label htmlFor="address">{t.checkout.address}</Label>
                        <Input id="address" required />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="city">{t.checkout.city}</Label>
                        <Input id="city" required />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="state">{t.checkout.state}</Label>
                        <Input id="state" required />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="pincode">{t.checkout.pincode}</Label>
                        <Input id="pincode" required />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="phone">{t.checkout.phone}</Label>
                        <Input id="phone" type="tel" required />
                      </div>
                    </div>
                  </CardContent>
                </Card>

                {/* Payment Method */}
                <Card className="border-0 shadow-card">
                  <CardContent className="p-6">
                    <h2 className="font-heading text-xl font-semibold mb-6">
                      {t.checkout.paymentMethod}
                    </h2>

                    <RadioGroup value={paymentMethod} onValueChange={setPaymentMethod} className="space-y-3">
                      <Label
                        htmlFor="cod"
                        className={cn(
                          'flex items-center gap-4 p-4 rounded-xl border-2 cursor-pointer transition-colors',
                          paymentMethod === 'cod' ? 'border-primary bg-primary/5' : 'border-border hover:border-primary/50'
                        )}
                      >
                        <RadioGroupItem value="cod" id="cod" />
                        <Truck className="h-5 w-5 text-muted-foreground" />
                        <div>
                          <p className="font-medium">{t.checkout.cod}</p>
                          <p className="text-sm text-muted-foreground">
                            {language === 'hi' ? 'डिलीवरी पर भुगतान करें' : 'Pay when you receive'}
                          </p>
                        </div>
                      </Label>

                      <Label
                        htmlFor="upi"
                        className={cn(
                          'flex items-center gap-4 p-4 rounded-xl border-2 cursor-pointer transition-colors',
                          paymentMethod === 'upi' ? 'border-primary bg-primary/5' : 'border-border hover:border-primary/50'
                        )}
                      >
                        <RadioGroupItem value="upi" id="upi" />
                        <Smartphone className="h-5 w-5 text-muted-foreground" />
                        <div>
                          <p className="font-medium">{t.checkout.upi}</p>
                          <p className="text-sm text-muted-foreground">
                            GPay, PhonePe, Paytm
                          </p>
                        </div>
                      </Label>

                      <Label
                        htmlFor="card"
                        className={cn(
                          'flex items-center gap-4 p-4 rounded-xl border-2 cursor-pointer transition-colors',
                          paymentMethod === 'card' ? 'border-primary bg-primary/5' : 'border-border hover:border-primary/50'
                        )}
                      >
                        <RadioGroupItem value="card" id="card" />
                        <CreditCard className="h-5 w-5 text-muted-foreground" />
                        <div>
                          <p className="font-medium">{t.checkout.card}</p>
                          <p className="text-sm text-muted-foreground">
                            Visa, Mastercard, RuPay
                          </p>
                        </div>
                      </Label>
                    </RadioGroup>
                  </CardContent>
                </Card>
              </div>

              {/* Order Summary */}
              <div>
                <Card className="border-0 shadow-card sticky top-24">
                  <CardContent className="p-6">
                    <h2 className="font-heading text-xl font-semibold mb-4">
                      {language === 'hi' ? 'ऑर्डर सारांश' : 'Order Summary'}
                    </h2>

                    <div className="space-y-3 max-h-64 overflow-y-auto">
                      {items.map((item) => {
                        const name = language === 'hi' ? item.nameHi : item.name;
                        return (
                          <div key={item.id} className="flex gap-3">
                            <div className="w-16 h-16 rounded-lg overflow-hidden shrink-0">
                              <img
                                src={item.image}
                                alt={name}
                                className="w-full h-full object-cover"
                              />
                            </div>
                            <div className="flex-1 min-w-0">
                              <p className="text-sm font-medium truncate">{name}</p>
                              <p className="text-xs text-muted-foreground">
                                {t.cart.quantity}: {item.quantity}
                              </p>
                              <p className="text-sm font-bold">
                                ₹{(item.price * item.quantity).toLocaleString()}
                              </p>
                            </div>
                          </div>
                        );
                      })}
                    </div>

                    <Separator className="my-4" />

                    <div className="space-y-2">
                      <div className="flex justify-between text-sm">
                        <span className="text-muted-foreground">{t.cart.subtotal}</span>
                        <span>₹{totalPrice.toLocaleString()}</span>
                      </div>
                      <div className="flex justify-between text-sm">
                        <span className="text-muted-foreground">{t.cart.shipping}</span>
                        <span className="text-secondary">{t.cart.free}</span>
                      </div>
                    </div>

                    <Separator className="my-4" />

                    <div className="flex justify-between mb-6">
                      <span className="font-semibold">{t.cart.total}</span>
                      <span className="font-bold text-xl text-primary">
                        ₹{totalPrice.toLocaleString()}
                      </span>
                    </div>

                    <Button type="submit" className="w-full" size="lg">
                      {t.checkout.placeOrder}
                    </Button>
                  </CardContent>
                </Card>
              </div>
            </div>
          </form>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default Checkout;
