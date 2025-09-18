import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Smartphone, Wifi, Phone, MessageSquare, Clock, Shield } from 'lucide-react';
import { supabase } from '@/integrations/supabase/client';
import CompatibilityModal from '@/components/CompatibilityModal';

interface Country {
  id: string;
  name: string;
  code: string;
  flag_url: string;
}

interface ESIMProduct {
  id: string;
  name: string;
  data_amount: string;
  validity_days: number;
  price: number;
  currency: string;
  includes_calls: boolean;
  includes_sms: boolean;
}

const CountryDetails = () => {
  const { countryCode } = useParams<{ countryCode: string }>();
  const [country, setCountry] = useState<Country | null>(null);
  const [products, setProducts] = useState<ESIMProduct[]>([]);
  const [loading, setLoading] = useState(true);
  const [showCompatibilityModal, setShowCompatibilityModal] = useState(false);

  useEffect(() => {
    if (countryCode) {
      fetchCountryData();
    }
  }, [countryCode]);

  const fetchCountryData = async () => {
    try {
      // Fetch country details
      const { data: countryData, error: countryError } = await supabase
        .from('countries')
        .select('*')
        .eq('code', countryCode?.toUpperCase())
        .single();

      if (countryError) throw countryError;
      setCountry(countryData);

      // Fetch eSIM products for this country
      const { data: productsData, error: productsError } = await supabase
        .from('esim_products')
        .select('*')
        .eq('country_id', countryData.id)
        .eq('is_active', true)
        .order('price');

      if (productsError) throw productsError;
      setProducts(productsData || []);
    } catch (error) {
      console.error('Error fetching country data:', error);
    } finally {
      setLoading(false);
    }
  };

  const handlePurchase = (productId: string) => {
    // TODO: Implement purchase flow
    console.log('Purchase product:', productId);
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-background">
        <Header />
        <main className="container px-4 py-8">
          <div className="text-center py-12">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto"></div>
            <p className="text-muted-foreground mt-4">Loading country details...</p>
          </div>
        </main>
        <Footer />
      </div>
    );
  }

  if (!country) {
    return (
      <div className="min-h-screen bg-background">
        <Header />
        <main className="container px-4 py-8">
          <div className="text-center py-12">
            <h1 className="text-2xl font-bold mb-4">Country Not Found</h1>
            <p className="text-muted-foreground">The requested country could not be found.</p>
          </div>
        </main>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      <main className="container px-4 py-8">
        {/* Country Header */}
        <div className="text-center mb-12">
          <div className="text-8xl mb-4">{country.flag_url}</div>
          <h1 className="text-4xl md:text-5xl font-bold text-gradient mb-4">
            {country.name} eSIM
          </h1>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Stay connected in {country.name} with our premium eSIM packages. 
            Choose from data-only or plans with calls and SMS included.
          </p>
          
          {/* Compatibility Check Button */}
          <Button 
            variant="outline" 
            className="mt-6 gap-2"
            onClick={() => setShowCompatibilityModal(true)}
          >
            <Shield className="w-4 h-4" />
            Check Device Compatibility
          </Button>
        </div>

        {/* Country Info */}
        <section className="mb-12">
          <div className="bg-card rounded-xl p-8 border border-border/50">
            <h2 className="text-2xl font-bold mb-6 text-center">What You Need to Know</h2>
            <div className="grid grid-cols-1 md:grid-cols-4 gap-6 text-center">
              <div>
                <div className="bg-gradient-safari rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-3">
                  <Smartphone className="w-8 h-8 text-white" />
                </div>
                <h3 className="font-semibold mb-2">Instant Activation</h3>
                <p className="text-muted-foreground text-sm">
                  Get connected within minutes via QR code
                </p>
              </div>
              <div>
                <div className="bg-gradient-safari rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-3">
                  <Wifi className="w-8 h-8 text-white" />
                </div>
                <h3 className="font-semibold mb-2">4G/5G Coverage</h3>
                <p className="text-muted-foreground text-sm">
                  Fast data speeds across major cities and towns
                </p>
              </div>
              <div>
                <div className="bg-gradient-safari rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-3">
                  <Clock className="w-8 h-8 text-white" />
                </div>
                <h3 className="font-semibold mb-2">Flexible Duration</h3>
                <p className="text-muted-foreground text-sm">
                  Plans from 7 days to 30 days validity
                </p>
              </div>
              <div>
                <div className="bg-gradient-safari rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-3">
                  <Shield className="w-8 h-8 text-white" />
                </div>
                <h3 className="font-semibold mb-2">No Roaming Fees</h3>
                <p className="text-muted-foreground text-sm">
                  Local rates with no surprise charges
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* eSIM Packages */}
        <section className="mb-12">
          <h2 className="text-3xl font-bold mb-8 text-center">Choose Your Plan</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {products.map((product) => (
              <Card 
                key={product.id} 
                className={`relative hover:shadow-lg hover:shadow-primary/20 transition-all duration-300 hover:scale-105 ${
                  product.name === 'Pro Plan' ? 'border-primary ring-2 ring-primary/20' : ''
                }`}
              >
                {product.name === 'Pro Plan' && (
                  <div className="absolute -top-3 left-1/2 transform -translate-x-1/2">
                    <Badge className="bg-gradient-safari text-white border-0">Most Popular</Badge>
                  </div>
                )}
                
                <CardHeader className="text-center">
                  <CardTitle className="text-2xl">{product.name}</CardTitle>
                  <div className="text-3xl font-bold text-primary">
                    ${product.price}
                    <span className="text-sm font-normal text-muted-foreground">
                      /{product.validity_days} days
                    </span>
                  </div>
                </CardHeader>
                
                <CardContent className="space-y-4">
                  <div className="text-center">
                    <div className="text-xl font-semibold mb-2">{product.data_amount}</div>
                    <p className="text-muted-foreground text-sm">High-speed data</p>
                  </div>
                  
                  <div className="space-y-3">
                    <div className="flex items-center gap-2">
                      <Wifi className="w-4 h-4 text-primary" />
                      <span className="text-sm">4G/5G Network Access</span>
                    </div>
                    <div className="flex items-center gap-2">
                      {product.includes_calls ? (
                        <Phone className="w-4 h-4 text-primary" />
                      ) : (
                        <Phone className="w-4 h-4 text-muted-foreground" />
                      )}
                      <span className={`text-sm ${product.includes_calls ? '' : 'text-muted-foreground'}`}>
                        {product.includes_calls ? 'Local Calls Included' : 'Data Only'}
                      </span>
                    </div>
                    <div className="flex items-center gap-2">
                      {product.includes_sms ? (
                        <MessageSquare className="w-4 h-4 text-primary" />
                      ) : (
                        <MessageSquare className="w-4 h-4 text-muted-foreground" />
                      )}
                      <span className={`text-sm ${product.includes_sms ? '' : 'text-muted-foreground'}`}>
                        {product.includes_sms ? 'SMS Included' : 'No SMS'}
                      </span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Clock className="w-4 h-4 text-primary" />
                      <span className="text-sm">{product.validity_days} Days Validity</span>
                    </div>
                  </div>
                  
                  <Button 
                    className={`w-full mt-6 ${product.name === 'Pro Plan' ? 'btn-hero' : ''}`}
                    variant={product.name === 'Pro Plan' ? 'default' : 'outline'}
                    onClick={() => handlePurchase(product.id)}
                  >
                    Buy Now
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        </section>

        {/* Installation Guide */}
        <section className="mb-12">
          <div className="bg-card rounded-xl p-8 border border-border/50">
            <h2 className="text-2xl font-bold mb-6 text-center">How to Install Your eSIM</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <div className="text-center">
                <div className="bg-gradient-safari rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
                  <span className="text-2xl font-bold text-white">1</span>
                </div>
                <h3 className="font-semibold text-lg mb-2">Purchase & Receive</h3>
                <p className="text-muted-foreground text-sm">
                  Complete your purchase and receive your eSIM QR code via email instantly
                </p>
              </div>
              <div className="text-center">
                <div className="bg-gradient-safari rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
                  <span className="text-2xl font-bold text-white">2</span>
                </div>
                <h3 className="font-semibold text-lg mb-2">Scan QR Code</h3>
                <p className="text-muted-foreground text-sm">
                  Open camera or settings and scan the QR code to install your eSIM
                </p>
              </div>
              <div className="text-center">
                <div className="bg-gradient-safari rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
                  <span className="text-2xl font-bold text-white">3</span>
                </div>
                <h3 className="font-semibold text-lg mb-2">Get Connected</h3>
                <p className="text-muted-foreground text-sm">
                  Activate your eSIM and start enjoying local data rates immediately
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* FAQ for Country */}
        <section>
          <div className="bg-gradient-safari rounded-xl p-8 text-white text-center">
            <h2 className="text-3xl font-bold mb-4">Need Help?</h2>
            <p className="text-xl mb-6 opacity-90">
              Our 24/7 support team is here to help with installation and any questions.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button className="bg-white text-primary hover:bg-white/90 transition-colors">
                Contact Support
              </Button>
              <Button 
                variant="outline" 
                className="border-white text-white hover:bg-white/10 transition-colors"
                onClick={() => setShowCompatibilityModal(true)}
              >
                Check Compatibility
              </Button>
            </div>
          </div>
        </section>
      </main>

      <Footer />
      
      {/* Compatibility Modal */}
      <CompatibilityModal 
        isOpen={showCompatibilityModal}
        onClose={() => setShowCompatibilityModal(false)}
      />
    </div>
  );
};

export default CountryDetails;