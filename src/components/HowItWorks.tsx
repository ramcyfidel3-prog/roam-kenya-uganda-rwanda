import { Button } from '@/components/ui/button';
import { ShoppingCart, Download, Globe, CheckCircle } from 'lucide-react';
import womanEsimImage from '@/assets/woman-esim.jpg';
import eastAfricaMapImage from '@/assets/east-africa-map.jpg';
import esimInstallImage from '@/assets/esim-install.jpg';

const HowItWorks = () => {
  const steps = [
    {
      icon: ShoppingCart,
      title: 'Buy',
      description: 'Choose your East Africa eSIM package and complete your purchase securely',
      image: eastAfricaMapImage,
      color: 'bg-gradient-safari',
    },
    {
      icon: Download,
      title: 'Install',
      description: 'Scan the QR code and install your eSIM in seconds on your phone',
      image: esimInstallImage,
      color: 'bg-gradient-sunrise',
    },
    {
      icon: Globe,
      title: 'Connect',
      description: 'Enjoy seamless connectivity across all East African countries',
      image: womanEsimImage,
      color: 'bg-accent',
    },
  ];

  return (
    <section className="py-20 lg:py-32 bg-surface">
      <div className="container px-4">
        {/* Header */}
        <div className="text-center space-y-4 mb-16">
          <h2 className="text-3xl lg:text-5xl font-bold">
            How <span className="text-gradient">AfriRoam</span> Works
          </h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Get connected in just 3 simple steps. No physical SIM cards, no waiting.
          </p>
        </div>

        {/* Steps */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 lg:gap-12">
          {steps.map((step, index) => (
            <div key={index} className="relative group">
              {/* Connection Line */}
              {index < steps.length - 1 && (
                <div className="hidden md:block absolute top-8 left-full w-12 lg:w-16 xl:w-24 h-0.5 bg-gradient-to-r from-primary to-secondary z-10" />
              )}

              {/* Card */}
              <div className="card-feature text-center space-y-6 hover-lift">
                {/* Step Number */}
                <div className="relative">
                  <div className={`inline-flex h-16 w-16 items-center justify-center rounded-full ${step.color} shadow-medium mx-auto`}>
                    <step.icon className="h-8 w-8 text-white" />
                  </div>
                  <div className="absolute -top-2 -right-2 bg-primary text-primary-foreground rounded-full h-8 w-8 flex items-center justify-center text-sm font-bold">
                    {index + 1}
                  </div>
                </div>

                {/* Content */}
                <div className="space-y-4">
                  <h3 className="text-2xl font-bold">{step.title}</h3>
                  <p className="text-muted-foreground leading-relaxed">
                    {step.description}
                  </p>
                </div>

                {/* Image */}
                <div className="relative overflow-hidden rounded-xl">
                  <img
                    src={step.image}
                    alt={step.title}
                    className="w-full h-48 object-cover transition-transform duration-300 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent" />
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Benefits Section */}
        <div className="mt-20 text-center space-y-8">
          <h3 className="text-2xl lg:text-3xl font-bold">
            Why Choose AfriRoam?
          </h3>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              { icon: CheckCircle, text: 'No Roaming Charges' },
              { icon: CheckCircle, text: 'Instant Activation' },
              { icon: CheckCircle, text: '24/7 Support' },
              { icon: CheckCircle, text: 'Local Number' },
            ].map((benefit, index) => (
              <div key={index} className="flex items-center gap-3 justify-center lg:justify-start">
                <benefit.icon className="h-5 w-5 text-primary flex-shrink-0" />
                <span className="font-medium">{benefit.text}</span>
              </div>
            ))}
          </div>

          <Button size="lg" className="btn-hero text-lg px-8 py-4 mt-8">
            Start Your Journey
          </Button>
        </div>
      </div>
    </section>
  );
};

export default HowItWorks;