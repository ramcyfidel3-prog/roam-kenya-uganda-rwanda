import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Search, Play, Globe, Zap, Shield } from 'lucide-react';
import heroImage from '@/assets/hero-image.jpg';

const Hero = () => {
  const [searchQuery, setSearchQuery] = useState('');

  const features = [
    { icon: Globe, text: 'East Africa Coverage' },
    { icon: Zap, text: 'Instant Activation' },
    { icon: Shield, text: 'Secure Connection' },
  ];

  return (
    <section className="relative overflow-hidden bg-gradient-earth">
      {/* Background Image */}
      <div className="absolute inset-0">
        <img
          src={heroImage}
          alt="African landscape with connectivity"
          className="h-full w-full object-cover opacity-20"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-background via-background/80 to-transparent" />
      </div>

      {/* Content */}
      <div className="relative container px-4 py-20 lg:py-32">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          {/* Left Column - Content */}
          <div className="space-y-8 animate-fade-up">
            {/* Badge */}
            <Badge className="bg-accent/10 text-accent border-accent/20 text-sm font-medium px-4 py-2">
              ✨ Now Available in East Africa
            </Badge>

            {/* Headline */}
            <div className="space-y-4">
              <h1 className="text-4xl lg:text-6xl font-bold leading-tight">
                One Number.{' '}
                <span className="text-hero-gradient">One East Africa.</span>
              </h1>
              <p className="text-xl lg:text-2xl text-muted-foreground leading-relaxed">
                Stay Connected with AfriRoam.
              </p>
              <p className="text-lg text-muted-foreground">
                Get instant connectivity across Kenya, Tanzania, Uganda, Rwanda, and Burundi 
                with our revolutionary eSIM technology.
              </p>
            </div>

            {/* Search Bar */}
            <div className="space-y-4">
              <div className="relative">
                <Search className="absolute left-4 top-1/2 h-5 w-5 -translate-y-1/2 text-muted-foreground" />
                <select 
                  className="pl-12 h-14 text-lg bg-card/50 backdrop-blur border border-border/50 focus:border-primary rounded-lg w-full pr-12 appearance-none cursor-pointer"
                  value={searchQuery}
                  onChange={(e) => {
                    setSearchQuery(e.target.value);
                    if (e.target.value) {
                      window.location.href = `/country/${e.target.value.toLowerCase()}`;
                    }
                  }}
                >
                  <option value="">Where are you traveling?</option>
                  <option value="KE">🇰🇪 Kenya</option>
                  <option value="TZ">🇹🇿 Tanzania</option>
                  <option value="UG">🇺🇬 Uganda</option>
                  <option value="RW">🇷🇼 Rwanda</option>
                  <option value="BI">🇧🇮 Burundi</option>
                </select>
              </div>
              <p className="text-sm text-muted-foreground">
                Select a country to view available eSIM plans
              </p>
            </div>

            {/* Action Buttons */}
            <div className="flex flex-col sm:flex-row gap-4">
              <Button 
                size="lg" 
                className="btn-hero text-lg px-8 py-4"
                onClick={() => window.location.href = '/register'}
              >
                Get Started
              </Button>
              <Button 
                size="lg" 
                variant="outline" 
                className="btn-hero-outline text-lg px-8 py-4"
                onClick={() => window.location.href = '/contact'}
              >
                Contact Our Team
              </Button>
            </div>

            {/* Explainer Content */}
            <div className="bg-card/30 backdrop-blur rounded-xl p-6 border border-border/50">
              <h3 className="text-lg font-semibold mb-4">How AfriRoam Works</h3>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-center">
                <div className="space-y-2">
                  <div className="h-12 w-12 rounded-full bg-gradient-safari flex items-center justify-center mx-auto">
                    <span className="text-white font-bold">1</span>
                  </div>
                  <h4 className="font-medium">Buy</h4>
                  <p className="text-sm text-muted-foreground">Choose your destination and plan</p>
                </div>
                <div className="space-y-2">
                  <div className="h-12 w-12 rounded-full bg-gradient-safari flex items-center justify-center mx-auto">
                    <span className="text-white font-bold">2</span>
                  </div>
                  <h4 className="font-medium">Install</h4>
                  <p className="text-sm text-muted-foreground">Scan QR code to activate</p>
                </div>
                <div className="space-y-2">
                  <div className="h-12 w-12 rounded-full bg-gradient-safari flex items-center justify-center mx-auto">
                    <span className="text-white font-bold">3</span>
                  </div>
                  <h4 className="font-medium">Connect</h4>
                  <p className="text-sm text-muted-foreground">Stay connected instantly</p>
                </div>
              </div>
            </div>

            {/* Features */}
            <div className="flex flex-wrap gap-6 pt-4">
              {features.map((feature, index) => (
                <div key={index} className="flex items-center gap-2 text-muted-foreground">
                  <feature.icon className="h-5 w-5 text-primary" />
                  <span className="font-medium">{feature.text}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Right Column - Visual Element */}
          <div className="relative animate-slide-in">
            <div className="relative z-10">
              {/* Floating Cards */}
              <div className="space-y-4">
                <div className="card-gradient p-6 hover-lift">
                  <div className="flex items-center gap-4">
                    <div className="h-12 w-12 rounded-full bg-gradient-safari flex items-center justify-center">
                      <Globe className="h-6 w-6 text-white" />
                    </div>
                    <div>
                      <h3 className="font-semibold text-lg">5 Countries</h3>
                      <p className="text-muted-foreground">One eSIM</p>
                    </div>
                  </div>
                </div>

                <div className="card-gradient p-6 hover-lift ml-8">
                  <div className="flex items-center gap-4">
                    <div className="h-12 w-12 rounded-full bg-gradient-sunrise flex items-center justify-center">
                      <Zap className="h-6 w-6 text-white" />
                    </div>
                    <div>
                      <h3 className="font-semibold text-lg">Instant Setup</h3>
                      <p className="text-muted-foreground">Ready in 2 minutes</p>
                    </div>
                  </div>
                </div>

                <div className="card-gradient p-6 hover-lift">
                  <div className="flex items-center gap-4">
                    <div className="h-12 w-12 rounded-full bg-accent flex items-center justify-center">
                      <Shield className="h-6 w-6 text-accent-foreground" />
                    </div>
                    <div>
                      <h3 className="font-semibold text-lg">Secure & Reliable</h3>
                      <p className="text-muted-foreground">Bank-grade security</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Background Decoration */}
            <div className="absolute -top-4 -right-4 h-32 w-32 rounded-full bg-gradient-sunrise opacity-20 blur-2xl" />
            <div className="absolute -bottom-4 -left-4 h-24 w-24 rounded-full bg-gradient-safari opacity-30 blur-xl" />
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;