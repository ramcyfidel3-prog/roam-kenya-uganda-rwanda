import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { 
  MessageSquare, 
  Phone, 
  Mail, 
  ExternalLink,
  Clock,
  CheckCircle,
  HelpCircle,
  User
} from 'lucide-react';

const Support = () => {
  const supportChannels = [
    {
      title: 'Live Chat',
      description: 'Get instant help from our support team',
      icon: MessageSquare,
      action: 'Start Chat',
      available: true,
      response: '< 2 min'
    },
    {
      title: 'WhatsApp',
      description: 'Message us on WhatsApp for quick support',
      icon: Phone,
      action: 'Open WhatsApp',
      available: true,
      response: '< 5 min',
      link: 'https://wa.me/254700123456'
    },
    {
      title: 'Email Support',
      description: 'Send us an email for detailed inquiries',
      icon: Mail,
      action: 'Send Email',
      available: true,
      response: '< 4 hours',
      link: 'mailto:support@afriroam.com'
    },
    {
      title: 'Phone Support',
      description: 'Call our support hotline',
      icon: Phone,
      action: 'Call Now',
      available: false,
      response: '9 AM - 6 PM EAT',
      link: 'tel:+254700123456'
    }
  ];

  const recentTickets = [
    {
      id: 'SUP001',
      subject: 'Unable to install eSIM profile',
      status: 'resolved',
      date: '2024-10-14',
      category: 'Technical'
    },
    {
      id: 'SUP002',
      subject: 'Wallet top-up not reflecting',
      status: 'in-progress',
      date: '2024-10-13',
      category: 'Billing'
    },
    {
      id: 'SUP003',
      subject: 'KYC verification delay',
      status: 'resolved',
      date: '2024-10-10',
      category: 'Account'
    }
  ];

  const faqs = [
    {
      question: 'How do I install my eSIM?',
      answer: 'Download the QR code from your dashboard and scan it with your phone camera. Follow the on-screen instructions.'
    },
    {
      question: 'What devices are compatible?',
      answer: 'Most modern smartphones support eSIM. Check our compatibility list for your specific device model.'
    },
    {
      question: 'How long does KYC verification take?',
      answer: 'KYC verification typically takes 1-2 business days. You\'ll receive an email once it\'s complete.'
    },
    {
      question: 'Can I use my eSIM in multiple countries?',
      answer: 'Each eSIM plan is specific to one country. You\'ll need separate plans for different countries.'
    }
  ];

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'resolved':
        return <Badge className="bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-100">Resolved</Badge>;
      case 'in-progress':
        return <Badge className="bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-100">In Progress</Badge>;
      case 'pending':
        return <Badge className="bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-100">Pending</Badge>;
      default:
        return <Badge variant="secondary">{status}</Badge>;
    }
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold">Support & Help</h1>
        <p className="text-muted-foreground">Get help with your AfriRoam account and services</p>
      </div>

      {/* Support Channels */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {supportChannels.map((channel, index) => (
          <Card key={index} className="card-gradient hover-lift">
            <CardHeader className="text-center">
              <div className="flex justify-center mb-2">
                <div className="flex h-12 w-12 items-center justify-center rounded-full bg-gradient-safari">
                  <channel.icon className="h-6 w-6 text-white" />
                </div>
              </div>
              <CardTitle className="text-lg">{channel.title}</CardTitle>
            </CardHeader>
            <CardContent className="text-center space-y-3">
              <p className="text-sm text-muted-foreground">{channel.description}</p>
              <div className="flex items-center justify-center gap-1">
                <Clock className="h-3 w-3" />
                <span className="text-xs text-muted-foreground">{channel.response}</span>
              </div>
              <Button 
                className={`w-full ${channel.available ? 'btn-hero' : ''}`}
                variant={channel.available ? 'default' : 'outline'}
                disabled={!channel.available}
                onClick={() => {
                  if (channel.link) {
                    window.open(channel.link, '_blank');
                  }
                }}
              >
                {channel.available && <ExternalLink className="h-4 w-4 mr-2" />}
                {channel.action}
              </Button>
            </CardContent>
          </Card>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Recent Support Tickets */}
        <Card className="card-gradient">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <User className="h-5 w-5" />
              Recent Support Tickets
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {recentTickets.map((ticket) => (
                <div 
                  key={ticket.id} 
                  className="flex items-center justify-between p-3 border border-border rounded-lg"
                >
                  <div>
                    <p className="font-medium">{ticket.subject}</p>
                    <p className="text-sm text-muted-foreground">
                      {ticket.id} • {ticket.date} • {ticket.category}
                    </p>
                  </div>
                  {getStatusBadge(ticket.status)}
                </div>
              ))}
            </div>
            <Button variant="outline" className="w-full mt-4">
              View All Tickets
            </Button>
          </CardContent>
        </Card>

        {/* FAQs */}
        <Card className="card-gradient">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <HelpCircle className="h-5 w-5" />
              Frequently Asked Questions
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {faqs.map((faq, index) => (
                <div key={index} className="space-y-2">
                  <p className="font-medium text-sm">{faq.question}</p>
                  <p className="text-sm text-muted-foreground">{faq.answer}</p>
                  {index < faqs.length - 1 && <hr className="border-border" />}
                </div>
              ))}
            </div>
            <Button variant="outline" className="w-full mt-4">
              View All FAQs
            </Button>
          </CardContent>
        </Card>
      </div>

      {/* Emergency Contact */}
      <Card className="card-gradient border-orange-200 dark:border-orange-800">
        <CardContent className="p-6">
          <div className="flex items-center gap-4">
            <div className="flex h-12 w-12 items-center justify-center rounded-full bg-orange-100 dark:bg-orange-900">
              <Phone className="h-6 w-6 text-orange-600" />
            </div>
            <div className="flex-1">
              <h3 className="font-semibold">Emergency Support</h3>
              <p className="text-sm text-muted-foreground">
                For urgent issues while traveling, call our 24/7 emergency hotline
              </p>
            </div>
            <Button variant="outline" className="gap-2">
              <Phone className="h-4 w-4" />
              Call Emergency
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default Support;