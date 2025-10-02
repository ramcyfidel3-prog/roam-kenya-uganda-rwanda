import { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Slider } from '@/components/ui/slider';
import { Calculator, Smartphone, Calendar, DollarSign } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useNavigate } from 'react-router-dom';

const countries = [
  { name: 'Kenya', code: 'KE', basePrice: 15 },
  { name: 'Tanzania', code: 'TZ', basePrice: 18 },
  { name: 'Uganda', code: 'UG', basePrice: 16 },
  { name: 'Rwanda', code: 'RW', basePrice: 17 },
  { name: 'Burundi', code: 'BI', basePrice: 19 },
  { name: 'East Africa Bundle', code: 'EA', basePrice: 45 }
];

const dataPlans = [
  { amount: '1GB', multiplier: 1 },
  { amount: '3GB', multiplier: 2.5 },
  { amount: '5GB', multiplier: 4 },
  { amount: '10GB', multiplier: 7 },
  { amount: '20GB', multiplier: 12 },
  { amount: 'Unlimited', multiplier: 20 }
];

const PricingCalculator = () => {
  const navigate = useNavigate();
  const [selectedCountry, setSelectedCountry] = useState('KE');
  const [selectedData, setSelectedData] = useState('3GB');
  const [duration, setDuration] = useState([7]);
  const [totalCost, setTotalCost] = useState(0);

  useEffect(() => {
    calculatePrice();
  }, [selectedCountry, selectedData, duration]);

  const calculatePrice = () => {
    const country = countries.find(c => c.code === selectedCountry);
    const dataPlan = dataPlans.find(d => d.amount === selectedData);
    
    if (country && dataPlan) {
      const baseCost = country.basePrice * dataPlan.multiplier;
      const durationMultiplier = duration[0] / 7; // 7 days as base
      const total = baseCost * durationMultiplier;
      setTotalCost(Math.round(total));
    }
  };

  const handleGetStarted = () => {
    navigate('/our-esims');
  };

  return (
    <section className="py-16 bg-background">
      <div className="container px-4">
        <div className="text-center mb-12 animate-fade-up">
          <div className="inline-flex items-center gap-2 bg-primary/10 text-primary px-4 py-2 rounded-full mb-4">
            <Calculator className="w-4 h-4" />
            <span className="text-sm font-medium">Pricing Calculator</span>
          </div>
          <h2 className="text-4xl font-bold mb-4 text-gradient">
            Calculate Your Perfect Plan
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Customize your eSIM package based on destination, data needs, and trip duration
          </p>
        </div>

        <div className="max-w-4xl mx-auto">
          <div className="grid md:grid-cols-2 gap-8">
            {/* Calculator Form */}
            <Card className="card-gradient animate-slide-in">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Smartphone className="w-5 h-5" />
                  Customize Your Plan
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                {/* Country Selection */}
                <div className="space-y-2">
                  <Label className="flex items-center gap-2">
                    <span className="text-2xl">🌍</span>
                    Destination
                  </Label>
                  <Select value={selectedCountry} onValueChange={setSelectedCountry}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select country" />
                    </SelectTrigger>
                    <SelectContent>
                      {countries.map(country => (
                        <SelectItem key={country.code} value={country.code}>
                          {country.name}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                {/* Data Plan Selection */}
                <div className="space-y-2">
                  <Label className="flex items-center gap-2">
                    <Smartphone className="w-4 h-4" />
                    Data Amount
                  </Label>
                  <Select value={selectedData} onValueChange={setSelectedData}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select data amount" />
                    </SelectTrigger>
                    <SelectContent>
                      {dataPlans.map(plan => (
                        <SelectItem key={plan.amount} value={plan.amount}>
                          {plan.amount}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                {/* Duration Slider */}
                <div className="space-y-4">
                  <Label className="flex items-center gap-2">
                    <Calendar className="w-4 h-4" />
                    Duration: {duration[0]} days
                  </Label>
                  <Slider
                    value={duration}
                    onValueChange={setDuration}
                    min={1}
                    max={30}
                    step={1}
                    className="w-full"
                  />
                  <div className="flex justify-between text-xs text-muted-foreground">
                    <span>1 day</span>
                    <span>30 days</span>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Price Display */}
            <Card className="card-gradient animate-slide-in border-2 border-primary/20" style={{ animationDelay: '200ms' }}>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <DollarSign className="w-5 h-5" />
                  Your Total Cost
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                {/* Price Breakdown */}
                <div className="space-y-4">
                  <div className="flex justify-between items-center pb-2 border-b border-border">
                    <span className="text-muted-foreground">Country</span>
                    <span className="font-medium">
                      {countries.find(c => c.code === selectedCountry)?.name}
                    </span>
                  </div>
                  <div className="flex justify-between items-center pb-2 border-b border-border">
                    <span className="text-muted-foreground">Data</span>
                    <span className="font-medium">{selectedData}</span>
                  </div>
                  <div className="flex justify-between items-center pb-2 border-b border-border">
                    <span className="text-muted-foreground">Duration</span>
                    <span className="font-medium">{duration[0]} days</span>
                  </div>
                </div>

                {/* Total Price */}
                <div className="bg-gradient-safari rounded-xl p-6 text-center">
                  <p className="text-primary-foreground/80 text-sm mb-2">Estimated Total</p>
                  <p className="text-5xl font-bold text-primary-foreground mb-1">
                    ${totalCost}
                  </p>
                  <p className="text-primary-foreground/60 text-sm">One-time payment</p>
                </div>

                {/* Features */}
                <div className="space-y-2 text-sm">
                  <div className="flex items-center gap-2 text-muted-foreground">
                    <div className="w-1.5 h-1.5 rounded-full bg-primary"></div>
                    <span>Instant activation</span>
                  </div>
                  <div className="flex items-center gap-2 text-muted-foreground">
                    <div className="w-1.5 h-1.5 rounded-full bg-primary"></div>
                    <span>24/7 customer support</span>
                  </div>
                  <div className="flex items-center gap-2 text-muted-foreground">
                    <div className="w-1.5 h-1.5 rounded-full bg-primary"></div>
                    <span>No hidden fees</span>
                  </div>
                  <div className="flex items-center gap-2 text-muted-foreground">
                    <div className="w-1.5 h-1.5 rounded-full bg-primary"></div>
                    <span>Money-back guarantee</span>
                  </div>
                </div>

                <Button 
                  className="w-full btn-hero" 
                  size="lg"
                  onClick={handleGetStarted}
                >
                  Get Started
                </Button>
              </CardContent>
            </Card>
          </div>

          {/* Info Banner */}
          <div className="mt-8 bg-accent/10 border border-accent/20 rounded-xl p-6 text-center animate-fade-up" style={{ animationDelay: '400ms' }}>
            <p className="text-sm text-muted-foreground">
              💡 <span className="font-semibold">Pro Tip:</span> Save up to 30% by choosing the East Africa Bundle if you're visiting multiple countries!
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default PricingCalculator;
