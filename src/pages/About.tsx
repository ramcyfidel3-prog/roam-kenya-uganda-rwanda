import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { Smartphone, Users, Globe, Award } from 'lucide-react';

const About = () => {
  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      <main className="container px-4 py-8">
        {/* Hero Section */}
        <div className="text-center mb-16">
          <h1 className="text-4xl md:text-5xl font-bold text-gradient mb-6">
            About AfriRoam
          </h1>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto leading-relaxed">
            Connecting East Africa through innovative eSIM technology. We're bridging the digital divide 
            and empowering seamless communication across borders.
          </p>
        </div>

        {/* Mission Section */}
        <section className="mb-16">
          <div className="bg-card rounded-xl p-8 border border-border/50">
            <h2 className="text-3xl font-bold mb-6 text-center">Our Mission</h2>
            <p className="text-lg text-muted-foreground text-center max-w-4xl mx-auto leading-relaxed">
              To revolutionize mobile connectivity in East Africa by providing affordable, reliable, and instant eSIM solutions 
              that keep people connected across Kenya, Tanzania, Uganda, Rwanda, Burundi, and beyond. We believe that 
              communication should know no borders.
            </p>
          </div>
        </section>

        {/* Story Section */}
        <section className="mb-16">
          <h2 className="text-3xl font-bold mb-8 text-center">Our Story</h2>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <h3 className="text-2xl font-semibold mb-4">Born from Experience</h3>
              <p className="text-muted-foreground mb-6 leading-relaxed">
                AfriRoam was founded by a team of East African entrepreneurs who experienced firsthand the 
                frustration of expensive roaming charges and unreliable connectivity while traveling across 
                the region for business and leisure.
              </p>
              <p className="text-muted-foreground mb-6 leading-relaxed">
                We realized that despite the growing mobile penetration in East Africa, cross-border 
                connectivity remained expensive and complicated. That's when we decided to create a solution 
                that would make staying connected as simple as scanning a QR code.
              </p>
              <p className="text-muted-foreground leading-relaxed">
                Today, AfriRoam is proud to be the leading eSIM provider in East Africa, serving thousands 
                of customers from tourists to business travelers to digital nomads.
              </p>
            </div>
            <div className="bg-gradient-safari rounded-xl p-8 text-white">
              <h3 className="text-2xl font-bold mb-4">By the Numbers</h3>
              <div className="space-y-4">
                <div className="flex items-center gap-3">
                  <Users className="w-6 h-6" />
                  <span className="text-lg">50,000+ Happy Customers</span>
                </div>
                <div className="flex items-center gap-3">
                  <Globe className="w-6 h-6" />
                  <span className="text-lg">11 Countries Covered</span>
                </div>
                <div className="flex items-center gap-3">
                  <Smartphone className="w-6 h-6" />
                  <span className="text-lg">99.9% Network Uptime</span>
                </div>
                <div className="flex items-center gap-3">
                  <Award className="w-6 h-6" />
                  <span className="text-lg">Award-Winning Support</span>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Values Section */}
        <section className="mb-16">
          <h2 className="text-3xl font-bold mb-8 text-center">Our Values</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <div className="text-center p-6 bg-card rounded-xl border border-border/50">
              <div className="bg-gradient-safari rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
                <Smartphone className="w-8 h-8 text-white" />
              </div>
              <h3 className="font-semibold text-lg mb-2">Innovation</h3>
              <p className="text-muted-foreground text-sm">
                Embracing cutting-edge eSIM technology to provide seamless connectivity solutions.
              </p>
            </div>
            <div className="text-center p-6 bg-card rounded-xl border border-border/50">
              <div className="bg-gradient-safari rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
                <div className="text-2xl text-white">🤝</div>
              </div>
              <h3 className="font-semibold text-lg mb-2">Trust</h3>
              <p className="text-muted-foreground text-sm">
                Building lasting relationships through transparent pricing and reliable service.
              </p>
            </div>
            <div className="text-center p-6 bg-card rounded-xl border border-border/50">
              <div className="bg-gradient-safari rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
                <div className="text-2xl text-white">⚡</div>
              </div>
              <h3 className="font-semibold text-lg mb-2">Speed</h3>
              <p className="text-muted-foreground text-sm">
                Instant activation and fast customer support when you need it most.
              </p>
            </div>
            <div className="text-center p-6 bg-card rounded-xl border border-border/50">
              <div className="bg-gradient-safari rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
                <div className="text-2xl text-white">🌍</div>
              </div>
              <h3 className="font-semibold text-lg mb-2">Unity</h3>
              <p className="text-muted-foreground text-sm">
                Connecting East Africa and fostering regional integration through technology.
              </p>
            </div>
          </div>
        </section>

        {/* Team Section */}
        <section className="mb-16">
          <h2 className="text-3xl font-bold mb-8 text-center">Leadership Team</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="w-32 h-32 bg-gradient-safari rounded-full mx-auto mb-4 flex items-center justify-center">
                <span className="text-4xl text-white font-bold">JK</span>
              </div>
              <h3 className="font-semibold text-lg">James Kariuki</h3>
              <p className="text-primary font-medium">CEO & Co-Founder</p>
              <p className="text-muted-foreground text-sm mt-2">
                Former telecom executive with 15+ years experience in East African markets.
              </p>
            </div>
            <div className="text-center">
              <div className="w-32 h-32 bg-gradient-safari rounded-full mx-auto mb-4 flex items-center justify-center">
                <span className="text-4xl text-white font-bold">AM</span>
              </div>
              <h3 className="font-semibold text-lg">Amina Mwangi</h3>
              <p className="text-primary font-medium">CTO & Co-Founder</p>
              <p className="text-muted-foreground text-sm mt-2">
                Tech innovator specializing in mobile technologies and network infrastructure.
              </p>
            </div>
            <div className="text-center">
              <div className="w-32 h-32 bg-gradient-safari rounded-full mx-auto mb-4 flex items-center justify-center">
                <span className="text-4xl text-white font-bold">RN</span>
              </div>
              <h3 className="font-semibold text-lg">Robert Nkomo</h3>
              <p className="text-primary font-medium">Head of Operations</p>
              <p className="text-muted-foreground text-sm mt-2">
                Operations expert ensuring seamless service delivery across all markets.
              </p>
            </div>
          </div>
        </section>

        {/* Contact CTA */}
        <section className="text-center bg-gradient-safari rounded-xl p-8 text-white">
          <h2 className="text-3xl font-bold mb-4">Ready to Connect with Africa?</h2>
          <p className="text-xl mb-6 opacity-90">
            Join thousands of satisfied customers who trust AfriRoam for their connectivity needs.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button className="bg-white text-primary px-8 py-3 rounded-lg font-semibold hover:bg-white/90 transition-colors">
              Get Started Today
            </button>
            <button className="border border-white text-white px-8 py-3 rounded-lg font-semibold hover:bg-white/10 transition-colors">
              Contact Our Team
            </button>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
};

export default About;