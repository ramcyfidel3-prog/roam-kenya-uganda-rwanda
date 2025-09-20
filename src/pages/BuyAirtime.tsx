import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';

const BuyAirtime = () => {
  const [selectedCountry, setSelectedCountry] = useState('');

  const countries = [
    { code: 'KE', name: 'Kenya', flag: '🇰🇪', currency: 'KES' },
    { code: 'UG', name: 'Uganda', flag: '🇺🇬', currency: 'UGX' },
    { code: 'TZ', name: 'Tanzania', flag: '🇹🇿', currency: 'TZS' },
    { code: 'RW', name: 'Rwanda', flag: '🇷🇼', currency: 'RWF' },
    { code: 'BI', name: 'Burundi', flag: '🇧🇮', currency: 'BIF' }
  ];

  const plans = {
    KE: [
      { name: 'Starter', data: '1GB', price: 500, currency: 'KES', calls: false, sms: false, days: 7 },
      { name: 'Pro', data: '5GB', price: 1200, currency: 'KES', calls: true, sms: true, days: 30 },
      { name: 'Unlimited', data: 'Unlimited', price: 2500, currency: 'KES', calls: true, sms: true, days: 30 }
    ],
    UG: [
      { name: 'Starter', data: '1GB', price: 15000, currency: 'UGX', calls: false, sms: false, days: 7 },
      { name: 'Pro', data: '5GB', price: 35000, currency: 'UGX', calls: true, sms: true, days: 30 },
      { name: 'Unlimited', data: 'Unlimited', price: 75000, currency: 'UGX', calls: true, sms: true, days: 30 }
    ],
    TZ: [
      { name: 'Starter', data: '1GB', price: 2500, currency: 'TZS', calls: false, sms: false, days: 7 },
      { name: 'Pro', data: '5GB', price: 6000, currency: 'TZS', calls: true, sms: true, days: 30 },
      { name: 'Unlimited', data: 'Unlimited', price: 12000, currency: 'TZS', calls: true, sms: true, days: 30 }
    ],
    RW: [
      { name: 'Starter', data: '1GB', price: 1500, currency: 'RWF', calls: false, sms: false, days: 7 },
      { name: 'Pro', data: '5GB', price: 3500, currency: 'RWF', calls: true, sms: true, days: 30 },
      { name: 'Unlimited', data: 'Unlimited', price: 7500, currency: 'RWF', calls: true, sms: true, days: 30 }
    ],
    BI: [
      { name: 'Starter', data: '1GB', price: 3000, currency: 'BIF', calls: false, sms: false, days: 7 },
      { name: 'Pro', data: '5GB', price: 7000, currency: 'BIF', calls: true, sms: true, days: 30 },
      { name: 'Unlimited', data: 'Unlimited', price: 15000, currency: 'BIF', calls: true, sms: true, days: 30 }
    ]
  };

  const selectedCountryData = countries.find(c => c.code === selectedCountry);
  const availablePlans = selectedCountry ? plans[selectedCountry as keyof typeof plans] || [] : [];

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold">Buy Airtime & Data</h1>
        <p className="text-muted-foreground">Select a country to view available plans</p>
      </div>

      {/* Country Selection */}
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
        {countries.map((country) => (
          <Card 
            key={country.code} 
            className={`cursor-pointer transition-all duration-200 hover:shadow-md hover:scale-105 ${
              selectedCountry === country.code ? 'ring-2 ring-primary' : ''
            }`}
            onClick={() => setSelectedCountry(country.code)}
          >
            <CardContent className="p-4 text-center">
              <div className="text-4xl mb-2">{country.flag}</div>
              <h3 className="font-semibold">{country.name}</h3>
              <p className="text-sm text-muted-foreground">{country.currency}</p>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Plans Display */}
      {selectedCountry && (
        <div className="space-y-4">
          <div className="flex items-center gap-2">
            <h2 className="text-2xl font-semibold">Available Plans for</h2>
            <span className="text-2xl">{selectedCountryData?.flag}</span>
            <span className="text-2xl font-semibold">{selectedCountryData?.name}</span>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {availablePlans.map((plan, index) => (
              <Card key={index} className="card-gradient hover-lift">
                <CardHeader className="text-center">
                  <CardTitle className="text-xl">{plan.name}</CardTitle>
                  <div className="text-3xl font-bold text-gradient">{plan.data}</div>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-3 text-sm">
                    <div className="flex justify-between items-center">
                      <span>Data:</span>
                      <Badge variant="secondary">{plan.data}</Badge>
                    </div>
                    <div className="flex justify-between items-center">
                      <span>Calls:</span>
                      <span className={plan.calls ? 'text-green-600' : 'text-muted-foreground'}>
                        {plan.calls ? '✓ Included' : '✗ Not included'}
                      </span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span>SMS:</span>
                      <span className={plan.sms ? 'text-green-600' : 'text-muted-foreground'}>
                        {plan.sms ? '✓ Included' : '✗ Not included'}
                      </span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span>Phone Number:</span>
                      <span className="text-green-600">✓ Assigned</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span>Validity:</span>
                      <Badge variant="outline">{plan.days} days</Badge>
                    </div>
                  </div>
                  
                  <div className="border-t pt-4">
                    <div className="text-center mb-4">
                      <div className="text-2xl font-bold text-gradient">
                        {plan.currency} {plan.price.toLocaleString()}
                      </div>
                    </div>
                    <Button className="w-full btn-hero">
                      Buy Now
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      )}

      {!selectedCountry && (
        <Card className="card-gradient">
          <CardContent className="text-center py-12">
            <div className="text-6xl mb-4">🌍</div>
            <h3 className="text-lg font-semibold mb-2">Choose Your Destination</h3>
            <p className="text-muted-foreground">
              Select a country above to view available eSIM plans and pricing
            </p>
          </CardContent>
        </Card>
      )}
    </div>
  );
};

export default BuyAirtime;