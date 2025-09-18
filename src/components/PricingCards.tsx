import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { CheckCircle, Star, Zap, Crown } from 'lucide-react';

const PricingCards = () => {
  const plans = [
    {
      name: 'Starter',
      icon: Zap,
      price: '$12',
      period: '7 days',
      data: '1GB',
      description: 'Perfect for short trips',
      features: [
        '1GB High-Speed Data',
        '7 Days Validity',
        'All 5 East African Countries',
        'Data Only Plan',
        'Instant Activation',
      ],
      color: 'bg-gradient-safari',
      popular: false,
    },
    {
      name: 'Pro',
      icon: Star,
      price: '$35',
      period: '30 days',
      data: '5GB',
      description: 'Most popular choice',
      features: [
        '5GB High-Speed Data',
        '30 Days Validity',
        'All 5 East African Countries',
        'Data + Voice + SMS',
        'Local Phone Number',
        'Priority Support',
      ],
      color: 'bg-gradient-sunrise',
      popular: true,
    },
    {
      name: 'Unlimited',
      icon: Crown,
      price: '$65',
      period: '30 days',
      data: 'Unlimited',
      description: 'For heavy users',
      features: [
        'Unlimited High-Speed Data',
        '30 Days Validity',
        'All 5 East African Countries',
        'Data + Voice + SMS',
        'Local Phone Number',
        '24/7 Premium Support',
        'Free eSIM Replacement',
      ],
      color: 'bg-accent',
      popular: false,
    },
  ];

  return (
    <section className="py-20 lg:py-32 bg-background">
      <div className="container px-4">
        {/* Header */}
        <div className="text-center space-y-4 mb-16">
          <h2 className="text-3xl lg:text-5xl font-bold">
            Choose Your <span className="text-gradient">Adventure</span>
          </h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Simple, transparent pricing for every type of traveler across East Africa.
          </p>
        </div>

        {/* Pricing Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto">
          {plans.map((plan, index) => (
            <div
              key={index}
              className={`relative card-gradient p-8 hover-lift ${
                plan.popular ? 'ring-2 ring-primary shadow-glow scale-105' : ''
              }`}
            >
              {/* Popular Badge */}
              {plan.popular && (
                <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
                  <Badge className="bg-primary text-primary-foreground px-4 py-2 text-sm font-semibold">
                    Most Popular
                  </Badge>
                </div>
              )}

              {/* Header */}
              <div className="text-center space-y-6">
                {/* Icon */}
                <div className={`inline-flex h-16 w-16 items-center justify-center rounded-full ${plan.color} shadow-medium`}>
                  <plan.icon className="h-8 w-8 text-white" />
                </div>

                {/* Plan Name & Description */}
                <div>
                  <h3 className="text-2xl font-bold">{plan.name}</h3>
                  <p className="text-muted-foreground mt-2">{plan.description}</p>
                </div>

                {/* Price */}
                <div className="space-y-2">
                  <div className="flex items-baseline justify-center gap-2">
                    <span className="text-4xl font-bold text-gradient">{plan.price}</span>
                    <span className="text-muted-foreground">/{plan.period}</span>
                  </div>
                  <div className="flex items-center justify-center gap-2">
                    <Badge variant="secondary" className="bg-accent/10 text-accent">
                      {plan.data}
                    </Badge>
                  </div>
                </div>
              </div>

              {/* Features */}
              <div className="space-y-4 mt-8">
                {plan.features.map((feature, featureIndex) => (
                  <div key={featureIndex} className="flex items-center gap-3">
                    <CheckCircle className="h-5 w-5 text-primary flex-shrink-0" />
                    <span className="text-sm font-medium">{feature}</span>
                  </div>
                ))}
              </div>

              {/* CTA Button */}
              <Button
                size="lg"
                className={`w-full mt-8 ${
                  plan.popular
                    ? 'btn-hero text-lg'
                    : 'btn-hero-outline text-lg'
                }`}
              >
                Get {plan.name}
              </Button>

              {/* Coverage Info */}
              <p className="text-xs text-center text-muted-foreground mt-4">
                Covers Kenya, Tanzania, Uganda, Rwanda, Burundi
              </p>
            </div>
          ))}
        </div>

        {/* Additional Info */}
        <div className="text-center mt-16 space-y-4">
          <p className="text-muted-foreground">
            All plans include instant activation and free customer support
          </p>
          <div className="flex justify-center gap-8 text-sm">
            <div className="flex items-center gap-2">
              <CheckCircle className="h-4 w-4 text-primary" />
              <span>No Hidden Fees</span>
            </div>
            <div className="flex items-center gap-2">
              <CheckCircle className="h-4 w-4 text-primary" />
              <span>30-Day Money Back</span>
            </div>
            <div className="flex items-center gap-2">
              <CheckCircle className="h-4 w-4 text-primary" />
              <span>24/7 Support</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default PricingCards;