import Header from '@/components/Header';
import Footer from '@/components/Footer';
import FAQ from '@/components/FAQ';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { MessageCircle, Phone, Mail, FileText, Clock, Users } from 'lucide-react';

const Help = () => {
  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      <main className="container px-4 py-8">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-bold text-gradient mb-4">
            Help & Support
          </h1>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Get the help you need with our comprehensive support resources and dedicated team.
          </p>
        </div>

        {/* Quick Support Options */}
        <section className="mb-16">
          <h2 className="text-2xl font-bold mb-8 text-center">Get Help Instantly</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <Card className="text-center hover:shadow-lg hover:shadow-primary/20 transition-all duration-300">
              <CardHeader>
                <div className="bg-gradient-safari rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
                  <MessageCircle className="w-8 h-8 text-white" />
                </div>
                <CardTitle>Live Chat</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground mb-4">
                  Chat with our support team in real-time for immediate assistance.
                </p>
                <Button className="btn-hero w-full">Start Chat</Button>
              </CardContent>
            </Card>

            <Card className="text-center hover:shadow-lg hover:shadow-primary/20 transition-all duration-300">
              <CardHeader>
                <div className="bg-gradient-safari rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
                  <Phone className="w-8 h-8 text-white" />
                </div>
                <CardTitle>Call Support</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground mb-4">
                  Speak directly with our technical support specialists.
                </p>
                <Button variant="outline" className="w-full">+254 700 123 456</Button>
              </CardContent>
            </Card>

            <Card className="text-center hover:shadow-lg hover:shadow-primary/20 transition-all duration-300">
              <CardHeader>
                <div className="bg-gradient-safari rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
                  <Mail className="w-8 h-8 text-white" />
                </div>
                <CardTitle>Email Support</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground mb-4">
                  Send us your questions and we'll respond within 24 hours.
                </p>
                <Button variant="outline" className="w-full">support@afriroam.com</Button>
              </CardContent>
            </Card>
          </div>
        </section>

        {/* Support Hours */}
        <section className="mb-16">
          <div className="bg-card rounded-xl p-8 border border-border/50">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
              <div className="flex flex-col items-center">
                <Clock className="w-8 h-8 text-primary mb-3" />
                <h3 className="font-semibold text-lg mb-2">Support Hours</h3>
                <p className="text-muted-foreground">
                  24/7 for urgent issues<br/>
                  Mon-Fri 8AM-6PM EAT for general support
                </p>
              </div>
              <div className="flex flex-col items-center">
                <Users className="w-8 h-8 text-primary mb-3" />
                <h3 className="font-semibold text-lg mb-2">Response Time</h3>
                <p className="text-muted-foreground">
                  Live Chat: Instant<br/>
                  Email: Within 24 hours<br/>
                  Phone: Immediate
                </p>
              </div>
              <div className="flex flex-col items-center">
                <FileText className="w-8 h-8 text-primary mb-3" />
                <h3 className="font-semibold text-lg mb-2">Languages</h3>
                <p className="text-muted-foreground">
                  English, Swahili<br/>
                  French, Kinyarwanda<br/>
                  Kirundi, Amharic
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Contact Form */}
        <section className="mb-16">
          <div className="max-w-2xl mx-auto">
            <Card>
              <CardHeader>
                <CardTitle className="text-center text-2xl">Send us a Message</CardTitle>
                <p className="text-center text-muted-foreground">
                  Can't find what you're looking for? Send us a detailed message and we'll get back to you.
                </p>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label htmlFor="name" className="block text-sm font-medium mb-2">Name</label>
                    <Input id="name" placeholder="Your full name" />
                  </div>
                  <div>
                    <label htmlFor="email" className="block text-sm font-medium mb-2">Email</label>
                    <Input id="email" type="email" placeholder="your@email.com" />
                  </div>
                </div>
                <div>
                  <label htmlFor="subject" className="block text-sm font-medium mb-2">Subject</label>
                  <Input id="subject" placeholder="How can we help you?" />
                </div>
                <div>
                  <label htmlFor="message" className="block text-sm font-medium mb-2">Message</label>
                  <Textarea 
                    id="message" 
                    rows={5} 
                    placeholder="Please provide as much detail as possible about your issue or question..."
                  />
                </div>
                <Button className="btn-hero w-full">Send Message</Button>
              </CardContent>
            </Card>
          </div>
        </section>

        {/* Help Resources */}
        <section className="mb-16">
          <h2 className="text-2xl font-bold mb-8 text-center">Popular Help Topics</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            <Card className="hover:shadow-lg hover:shadow-primary/20 transition-all duration-300 cursor-pointer">
              <CardContent className="p-6 text-center">
                <div className="text-3xl mb-3">📱</div>
                <h3 className="font-semibold mb-2">eSIM Installation</h3>
                <p className="text-muted-foreground text-sm">Step-by-step installation guides</p>
              </CardContent>
            </Card>

            <Card className="hover:shadow-lg hover:shadow-primary/20 transition-all duration-300 cursor-pointer">
              <CardContent className="p-6 text-center">
                <div className="text-3xl mb-3">📶</div>
                <h3 className="font-semibold mb-2">Network Issues</h3>
                <p className="text-muted-foreground text-sm">Troubleshooting connectivity problems</p>
              </CardContent>
            </Card>

            <Card className="hover:shadow-lg hover:shadow-primary/20 transition-all duration-300 cursor-pointer">
              <CardContent className="p-6 text-center">
                <div className="text-3xl mb-3">💳</div>
                <h3 className="font-semibold mb-2">Billing & Payments</h3>
                <p className="text-muted-foreground text-sm">Payment methods and billing queries</p>
              </CardContent>
            </Card>

            <Card className="hover:shadow-lg hover:shadow-primary/20 transition-all duration-300 cursor-pointer">
              <CardContent className="p-6 text-center">
                <div className="text-3xl mb-3">🔧</div>
                <h3 className="font-semibold mb-2">Device Compatibility</h3>
                <p className="text-muted-foreground text-sm">Check if your device supports eSIM</p>
              </CardContent>
            </Card>
          </div>
        </section>

        {/* FAQ Section */}
        <section>
          <h2 className="text-2xl font-bold mb-8 text-center">Frequently Asked Questions</h2>
          <FAQ />
        </section>
      </main>

      <Footer />
    </div>
  );
};

export default Help;