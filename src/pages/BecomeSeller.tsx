import { useState } from 'react';
import { Link } from 'react-router-dom';
import { Check, Users, BadgePercent, Headphones, CreditCard, Upload, ArrowLeft, ArrowRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Card, CardContent } from '@/components/ui/card';
import { Label } from '@/components/ui/label';
import { useLanguage } from '@/context/LanguageContext';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import { cn } from '@/lib/utils';

const BecomeSeller = () => {
  const { language, t } = useLanguage();
  const [currentStep, setCurrentStep] = useState(1);
  const [isSubmitted, setIsSubmitted] = useState(false);

  const benefits = [
    { icon: Users, text: t.seller.benefit1 },
    { icon: BadgePercent, text: t.seller.benefit2 },
    { icon: Headphones, text: t.seller.benefit3 },
    { icon: CreditCard, text: t.seller.benefit4 },
  ];

  const steps = [
    { number: 1, label: t.seller.step1 },
    { number: 2, label: t.seller.step2 },
    { number: 3, label: t.seller.step3 },
  ];

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitted(true);
  };

  if (isSubmitted) {
    return (
      <div className="min-h-screen bg-background">
        <Header />
        <main className="section-padding">
          <div className="container-custom max-w-lg text-center">
            <div className="mb-6 inline-flex items-center justify-center w-20 h-20 rounded-full bg-secondary/10">
              <Check className="w-10 h-10 text-secondary" />
            </div>
            <h1 className="font-heading text-3xl font-bold text-foreground mb-4">
              {t.seller.successTitle}
            </h1>
            <p className="text-muted-foreground mb-8">
              {t.seller.successMessage}
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

  return (
    <div className="min-h-screen bg-background">
      <Header />

      <main className="section-padding">
        <div className="container-custom max-w-4xl">
          {/* Header */}
          <div className="text-center mb-12">
            <h1 className="font-heading text-3xl md:text-4xl font-bold text-foreground mb-3">
              {t.seller.title}
            </h1>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              {t.seller.subtitle}
            </p>
          </div>

          {/* Benefits */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-12">
            {benefits.map((benefit, index) => (
              <Card key={index} className="border-0 shadow-soft animate-fade-up" style={{ animationDelay: `${index * 0.1}s` }}>
                <CardContent className="p-4 text-center">
                  <benefit.icon className="h-8 w-8 mx-auto mb-3 text-primary" />
                  <p className="text-sm font-medium text-foreground">{benefit.text}</p>
                </CardContent>
              </Card>
            ))}
          </div>

          {/* Progress Steps */}
          <div className="flex items-center justify-center mb-8">
            {steps.map((step, index) => (
              <div key={step.number} className="flex items-center">
                <div className="flex flex-col items-center">
                  <div
                    className={cn(
                      'w-10 h-10 rounded-full flex items-center justify-center font-medium transition-colors',
                      currentStep >= step.number
                        ? 'bg-primary text-primary-foreground'
                        : 'bg-muted text-muted-foreground'
                    )}
                  >
                    {currentStep > step.number ? (
                      <Check className="h-5 w-5" />
                    ) : (
                      step.number
                    )}
                  </div>
                  <span className="text-xs mt-2 text-muted-foreground hidden sm:block">
                    {step.label}
                  </span>
                </div>
                {index < steps.length - 1 && (
                  <div
                    className={cn(
                      'w-16 md:w-24 h-1 mx-2',
                      currentStep > step.number ? 'bg-primary' : 'bg-muted'
                    )}
                  />
                )}
              </div>
            ))}
          </div>

          {/* Form */}
          <Card className="border-0 shadow-card">
            <CardContent className="p-6 md:p-8">
              <form onSubmit={handleSubmit}>
                {/* Step 1: Personal Details */}
                {currentStep === 1 && (
                  <div className="space-y-6 animate-fade-up">
                    <h2 className="font-heading text-xl font-semibold mb-6">{t.seller.step1}</h2>
                    <div className="grid md:grid-cols-2 gap-6">
                      <div className="space-y-2">
                        <Label htmlFor="fullName">{t.seller.fullName}</Label>
                        <Input id="fullName" required />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="email">{t.seller.email}</Label>
                        <Input id="email" type="email" required />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="phone">{t.seller.phone}</Label>
                        <Input id="phone" type="tel" required />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="city">{t.seller.city}</Label>
                        <Input id="city" required />
                      </div>
                      <div className="space-y-2 md:col-span-2">
                        <Label htmlFor="state">{t.seller.state}</Label>
                        <Select>
                          <SelectTrigger>
                            <SelectValue placeholder={language === 'hi' ? 'राज्य चुनें' : 'Select state'} />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="rajasthan">Rajasthan</SelectItem>
                            <SelectItem value="up">Uttar Pradesh</SelectItem>
                            <SelectItem value="gujarat">Gujarat</SelectItem>
                            <SelectItem value="karnataka">Karnataka</SelectItem>
                            <SelectItem value="bihar">Bihar</SelectItem>
                            <SelectItem value="ap">Andhra Pradesh</SelectItem>
                            <SelectItem value="other">{language === 'hi' ? 'अन्य' : 'Other'}</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                    </div>
                  </div>
                )}

                {/* Step 2: Shop Details */}
                {currentStep === 2 && (
                  <div className="space-y-6 animate-fade-up">
                    <h2 className="font-heading text-xl font-semibold mb-6">{t.seller.step2}</h2>
                    <div className="space-y-6">
                      <div className="space-y-2">
                        <Label htmlFor="shopName">{t.seller.shopName}</Label>
                        <Input id="shopName" required />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="shopDescription">{t.seller.shopDescription}</Label>
                        <Textarea id="shopDescription" rows={4} required />
                      </div>
                      <div className="grid md:grid-cols-2 gap-6">
                        <div className="space-y-2">
                          <Label htmlFor="craftType">{t.seller.craftType}</Label>
                          <Select>
                            <SelectTrigger>
                              <SelectValue placeholder={language === 'hi' ? 'शिल्प प्रकार चुनें' : 'Select craft type'} />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="pottery">{language === 'hi' ? 'मिट्टी के बर्तन' : 'Pottery & Ceramics'}</SelectItem>
                              <SelectItem value="textiles">{language === 'hi' ? 'कपड़े' : 'Textiles & Fabrics'}</SelectItem>
                              <SelectItem value="jewelry">{language === 'hi' ? 'आभूषण' : 'Jewelry'}</SelectItem>
                              <SelectItem value="wood">{language === 'hi' ? 'लकड़ी का काम' : 'Wood Crafts'}</SelectItem>
                              <SelectItem value="paintings">{language === 'hi' ? 'पेंटिंग' : 'Paintings & Art'}</SelectItem>
                              <SelectItem value="metal">{language === 'hi' ? 'धातु का काम' : 'Brass & Metal'}</SelectItem>
                            </SelectContent>
                          </Select>
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="experience">{t.seller.experience}</Label>
                          <Select>
                            <SelectTrigger>
                              <SelectValue placeholder={language === 'hi' ? 'अनुभव चुनें' : 'Select experience'} />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="0-2">0-2 {language === 'hi' ? 'वर्ष' : 'years'}</SelectItem>
                              <SelectItem value="3-5">3-5 {language === 'hi' ? 'वर्ष' : 'years'}</SelectItem>
                              <SelectItem value="5-10">5-10 {language === 'hi' ? 'वर्ष' : 'years'}</SelectItem>
                              <SelectItem value="10+">10+ {language === 'hi' ? 'वर्ष' : 'years'}</SelectItem>
                            </SelectContent>
                          </Select>
                        </div>
                      </div>
                    </div>
                  </div>
                )}

                {/* Step 3: Sample Product */}
                {currentStep === 3 && (
                  <div className="space-y-6 animate-fade-up">
                    <h2 className="font-heading text-xl font-semibold mb-6">{t.seller.step3}</h2>
                    <div className="space-y-6">
                      <div className="space-y-2">
                        <Label htmlFor="productName">{t.seller.productName}</Label>
                        <Input id="productName" required />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="productDescription">{t.seller.productDescription}</Label>
                        <Textarea id="productDescription" rows={4} required />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="productPrice">{t.seller.productPrice}</Label>
                        <Input id="productPrice" type="number" required />
                      </div>
                      <div className="space-y-2">
                        <Label>{t.seller.uploadImage}</Label>
                        <div className="border-2 border-dashed border-border rounded-xl p-8 text-center hover:border-primary/50 transition-colors cursor-pointer">
                          <Upload className="h-10 w-10 mx-auto mb-3 text-muted-foreground" />
                          <p className="text-sm text-muted-foreground">
                            {language === 'hi' ? 'क्लिक करें या खींचें और छोड़ें' : 'Click to upload or drag and drop'}
                          </p>
                          <p className="text-xs text-muted-foreground mt-1">
                            PNG, JPG up to 5MB
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                )}

                {/* Navigation */}
                <div className="flex justify-between mt-8 pt-6 border-t border-border">
                  {currentStep > 1 ? (
                    <Button
                      type="button"
                      variant="outline"
                      onClick={() => setCurrentStep(currentStep - 1)}
                    >
                      <ArrowLeft className="h-4 w-4 mr-2" />
                      {t.seller.previous}
                    </Button>
                  ) : (
                    <div />
                  )}

                  {currentStep < 3 ? (
                    <Button
                      type="button"
                      onClick={() => setCurrentStep(currentStep + 1)}
                    >
                      {t.seller.next}
                      <ArrowRight className="h-4 w-4 ml-2" />
                    </Button>
                  ) : (
                    <Button type="submit">
                      {t.seller.submit}
                    </Button>
                  )}
                </div>
              </form>
            </CardContent>
          </Card>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default BecomeSeller;
