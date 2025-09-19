import { useState } from 'react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Mail, Phone, MapPin, Send } from 'lucide-react';

const Contact = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  });
  const [loading, setLoading] = useState(false);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    
    // TODO: Implement form submission
    setTimeout(() => {
      setLoading(false);
      alert('Message sent successfully!');
      setFormData({ name: '', email: '', subject: '', message: '' });
    }, 1000);
  };

  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      <main className="container px-4 py-12">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-bold text-gradient mb-4">
            Contact Our Team
          </h1>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Have questions? We're here to help. Reach out to our support team for assistance with your AfriRoam services.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Contact Form */}
          <Card className="card-gradient">
            <CardHeader>
              <CardTitle className="text-2xl">Send us a message</CardTitle>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <label htmlFor="name" className="text-sm font-medium">Name</label>
                    <Input
                      id="name"
                      name="name"
                      type="text"
                      placeholder="Your full name"
                      value={formData.name}
                      onChange={handleInputChange}
                      required
                    />
                  </div>
                  <div className="space-y-2">
                    <label htmlFor="email" className="text-sm font-medium">Email</label>
                    <Input
                      id="email"
                      name="email"
                      type="email"
                      placeholder="your@email.com"
                      value={formData.email}
                      onChange={handleInputChange}
                      required
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <label htmlFor="subject" className="text-sm font-medium">Subject</label>
                  <Input
                    id="subject"
                    name="subject"
                    type="text"
                    placeholder="What's this about?"
                    value={formData.subject}
                    onChange={handleInputChange}
                    required
                  />
                </div>

                <div className="space-y-2">
                  <label htmlFor="message" className="text-sm font-medium">Message</label>
                  <Textarea
                    id="message"
                    name="message"
                    placeholder="Tell us how we can help..."
                    rows={6}
                    value={formData.message}
                    onChange={handleInputChange}
                    required
                  />
                </div>

                <Button 
                  type="submit" 
                  className="w-full btn-hero gap-2"
                  disabled={loading}
                >
                  <Send className="h-4 w-4" />
                  {loading ? 'Sending...' : 'Send Message'}
                </Button>
              </form>
            </CardContent>
          </Card>

          {/* Contact Information */}
          <div className="space-y-8">
            <Card className="card-gradient">
              <CardContent className="p-6">
                <h3 className="text-xl font-semibold mb-4">Get in Touch</h3>
                <div className="space-y-4">
                  <div className="flex items-center gap-3">
                    <div className="h-10 w-10 rounded-lg bg-gradient-safari flex items-center justify-center">
                      <Mail className="h-5 w-5 text-white" />
                    </div>
                    <div>
                      <p className="font-medium">Email Support</p>
                      <p className="text-muted-foreground">support@afriroam.com</p>
                    </div>
                  </div>
                  
                  <div className="flex items-center gap-3">
                    <div className="h-10 w-10 rounded-lg bg-gradient-safari flex items-center justify-center">
                      <Phone className="h-5 w-5 text-white" />
                    </div>
                    <div>
                      <p className="font-medium">Phone Support</p>
                      <p className="text-muted-foreground">+254 700 123 456</p>
                    </div>
                  </div>
                  
                  <div className="flex items-center gap-3">
                    <div className="h-10 w-10 rounded-lg bg-gradient-safari flex items-center justify-center">
                      <MapPin className="h-5 w-5 text-white" />
                    </div>
                    <div>
                      <p className="font-medium">Office Location</p>
                      <p className="text-muted-foreground">Nairobi, Kenya</p>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="card-gradient">
              <CardContent className="p-6">
                <h3 className="text-xl font-semibold mb-4">Business Hours</h3>
                <div className="space-y-2">
                  <div className="flex justify-between">
                    <span>Monday - Friday</span>
                    <span className="text-muted-foreground">8:00 AM - 8:00 PM EAT</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Saturday</span>
                    <span className="text-muted-foreground">9:00 AM - 6:00 PM EAT</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Sunday</span>
                    <span className="text-muted-foreground">10:00 AM - 4:00 PM EAT</span>
                  </div>
                </div>
                <p className="text-sm text-muted-foreground mt-4">
                  We aim to respond to all inquiries within 24 hours.
                </p>
              </CardContent>
            </Card>

            <Card className="bg-gradient-safari text-white">
              <CardContent className="p-6">
                <h3 className="text-xl font-semibold mb-4">Need Immediate Help?</h3>
                <p className="mb-4 opacity-90">
                  For urgent technical support or account issues, reach out via our live chat or WhatsApp support.
                </p>
                <Button className="bg-white text-primary hover:bg-white/90">
                  Start Live Chat
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default Contact;