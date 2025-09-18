import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Search, Smartphone } from 'lucide-react';
import { supabase } from '@/integrations/supabase/client';

interface Country {
  id: string;
  name: string;
  code: string;
  flag_url: string;
  is_active: boolean;
}

const OurESIMs = () => {
  const [countries, setCountries] = useState<Country[]>([]);
  const [filteredCountries, setFilteredCountries] = useState<Country[]>([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    fetchCountries();
  }, []);

  useEffect(() => {
    const filtered = countries.filter(country =>
      country.name.toLowerCase().includes(searchTerm.toLowerCase())
    );
    setFilteredCountries(filtered);
  }, [searchTerm, countries]);

  const fetchCountries = async () => {
    try {
      const { data, error } = await supabase
        .from('countries')
        .select('*')
        .eq('is_active', true)
        .order('name');

      if (error) throw error;
      setCountries(data || []);
      setFilteredCountries(data || []);
    } catch (error) {
      console.error('Error fetching countries:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleCountryClick = (countryCode: string) => {
    navigate(`/country/${countryCode}`);
  };

  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      <main className="container px-4 py-8">
        {/* Header Section */}
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-bold text-gradient mb-4">
            East Africa eSIMs
          </h1>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto mb-8">
            Choose your destination and stay connected across East Africa with AfriRoam's premium eSIM solutions.
          </p>
          
          {/* Search Bar */}
          <div className="relative max-w-md mx-auto">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input
              type="text"
              placeholder="Search countries..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10"
            />
          </div>
        </div>

        {/* Loading State */}
        {loading && (
          <div className="text-center py-12">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto"></div>
            <p className="text-muted-foreground mt-4">Loading countries...</p>
          </div>
        )}

        {/* Countries Grid */}
        {!loading && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {filteredCountries.map((country) => (
              <Card 
                key={country.id} 
                className="group hover:shadow-lg hover:shadow-primary/20 transition-all duration-300 hover:scale-105 cursor-pointer border-border/50 hover:border-primary/30"
                onClick={() => handleCountryClick(country.code)}
              >
                <CardHeader className="text-center pb-4">
                  <div className="text-6xl mb-4 group-hover:scale-110 transition-transform duration-300">
                    {country.flag_url}
                  </div>
                  <CardTitle className="text-xl group-hover:text-primary transition-colors">
                    {country.name}
                  </CardTitle>
                </CardHeader>
                <CardContent className="text-center">
                  <Button 
                    className="btn-hero w-full group-hover:bg-primary/90 transition-colors"
                    onClick={(e) => {
                      e.stopPropagation();
                      handleCountryClick(country.code);
                    }}
                  >
                    <Smartphone className="w-4 h-4 mr-2" />
                    Buy eSIM
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        )}

        {/* No Results */}
        {!loading && filteredCountries.length === 0 && searchTerm && (
          <div className="text-center py-12">
            <p className="text-muted-foreground text-lg">
              No countries found matching "{searchTerm}"
            </p>
          </div>
        )}

        {/* Info Section */}
        <div className="mt-16 bg-card rounded-xl p-8 border border-border/50">
          <h2 className="text-2xl font-bold mb-4 text-center">Why Choose AfriRoam?</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="text-center">
              <div className="bg-gradient-safari rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
                <Smartphone className="w-8 h-8 text-white" />
              </div>
              <h3 className="font-semibold mb-2">Instant Activation</h3>
              <p className="text-muted-foreground text-sm">
                Get connected in minutes with our QR code activation system
              </p>
            </div>
            <div className="text-center">
              <div className="bg-gradient-safari rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
                <div className="text-2xl">🌍</div>
              </div>
              <h3 className="font-semibold mb-2">Regional Coverage</h3>
              <p className="text-muted-foreground text-sm">
                One eSIM works across multiple East African countries
              </p>
            </div>
            <div className="text-center">
              <div className="bg-gradient-safari rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
                <div className="text-2xl">💰</div>
              </div>
              <h3 className="font-semibold mb-2">Best Rates</h3>
              <p className="text-muted-foreground text-sm">
                Competitive pricing with transparent, no-hidden-fee packages
              </p>
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default OurESIMs;