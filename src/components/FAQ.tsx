import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';
import { HelpCircle } from 'lucide-react';

const FAQ = () => {
  const faqs = [
    {
      question: 'What is an eSIM?',
      answer: 'An eSIM (embedded SIM) is a digital SIM card that\'s built into your device. Instead of inserting a physical SIM card, you can activate cellular service by downloading your eSIM profile. It\'s more convenient, secure, and allows you to switch between carriers without swapping physical cards.',
    },
    {
      question: 'Which countries does AfriRoam eSIM cover?',
      answer: 'AfriRoam eSIM provides coverage across all major East African countries including Kenya, Tanzania, Uganda, Rwanda, and Burundi. You can travel seamlessly between these countries with one eSIM and one phone number.',
    },
    {
      question: 'How do I install my AfriRoam eSIM?',
      answer: 'After purchase, you\'ll receive a QR code via email. Simply scan this QR code with your phone\'s camera, follow the installation prompts, and your eSIM will be ready in minutes. We also provide detailed step-by-step instructions for your specific device.',
    },
    {
      question: 'Is my device compatible with eSIM?',
      answer: 'Most modern smartphones support eSIM technology. This includes iPhone XS and newer, Google Pixel 3 and newer, Samsung Galaxy S20 and newer, and many other recent Android devices. Check our compatibility guide or contact support to verify your specific device.',
    },
    {
      question: 'Can I keep my existing SIM card active?',
      answer: 'Yes! Your AfriRoam eSIM works alongside your existing physical SIM card. You can use both simultaneously - your home SIM for receiving calls and messages, and your AfriRoam eSIM for data and local connectivity in East Africa.',
    },
    {
      question: 'What happens if I lose my phone or eSIM stops working?',
      answer: 'If you lose your phone or experience technical issues, contact our 24/7 support team immediately. For Pro and Unlimited plans, we provide free eSIM replacement. We can help you transfer your service to a new device quickly.',
    },
    {
      question: 'Are there any hidden fees or roaming charges?',
      answer: 'No hidden fees! The price you see is what you pay. There are no roaming charges when using your AfriRoam eSIM within our coverage area. You\'ll have full transparency on all costs upfront.',
    },
    {
      question: 'How do I top up my wallet or buy additional data?',
      answer: 'You can easily top up your wallet through your AfriRoam dashboard using M-Pesa, Airtel Money, or international credit/debit cards. Additional data packages can be purchased instantly and activated immediately.',
    },
  ];

  return (
    <section className="py-20 lg:py-32 bg-surface">
      <div className="container px-4">
        {/* Header */}
        <div className="text-center space-y-4 mb-16">
          <div className="inline-flex h-16 w-16 items-center justify-center rounded-full bg-gradient-safari shadow-medium mx-auto">
            <HelpCircle className="h-8 w-8 text-white" />
          </div>
          <h2 className="text-3xl lg:text-5xl font-bold">
            Frequently Asked <span className="text-gradient">Questions</span>
          </h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Got questions? We've got answers. Everything you need to know about AfriRoam eSIM.
          </p>
        </div>

        {/* FAQ Accordion */}
        <div className="max-w-4xl mx-auto">
          <Accordion type="single" collapsible className="space-y-4">
            {faqs.map((faq, index) => (
              <AccordionItem 
                key={index} 
                value={`item-${index}`}
                className="card-gradient border-border px-6"
              >
                <AccordionTrigger className="text-left font-semibold text-lg hover:text-primary hover:no-underline py-6">
                  {faq.question}
                </AccordionTrigger>
                <AccordionContent className="text-muted-foreground leading-relaxed pb-6">
                  {faq.answer}
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </div>

        {/* CTA */}
        <div className="text-center mt-16 space-y-6">
          <h3 className="text-2xl font-bold">
            Still have questions?
          </h3>
          <p className="text-muted-foreground">
            Our support team is available 24/7 to help you get connected.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button className="btn-hero-outline px-8 py-3 text-lg">
              Contact Support
            </button>
            <button className="btn-hero px-8 py-3 text-lg">
              Start Live Chat
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default FAQ;