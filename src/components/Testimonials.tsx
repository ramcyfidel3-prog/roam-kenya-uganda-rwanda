import { Star } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';
import testimonial1 from '@/assets/testimonial-1.jpg';
import testimonial2 from '@/assets/testimonial-2.jpg';
import testimonial3 from '@/assets/testimonial-3.jpg';

const testimonials = [
  {
    name: 'Amara Okonkwo',
    role: 'Travel Blogger',
    image: testimonial1,
    rating: 5,
    text: "AfriRoam made my East African adventure seamless! I traveled through Kenya, Tanzania, and Uganda without worrying about connectivity. The eSIM activation was instant, and the data speeds were excellent everywhere I went.",
    country: 'Nigeria'
  },
  {
    name: 'David Kamau',
    role: 'Business Consultant',
    image: testimonial2,
    rating: 5,
    text: "As someone who travels frequently for business across East Africa, AfriRoam has been a game-changer. No more dealing with multiple SIM cards or expensive roaming charges. Highly recommended!",
    country: 'Kenya'
  },
  {
    name: 'Sarah Mwangi',
    role: 'Digital Nomad',
    image: testimonial3,
    rating: 5,
    text: "The pricing is transparent, the setup was incredibly easy, and customer support was responsive when I had questions. I've recommended AfriRoam to all my fellow digital nomads working across the region.",
    country: 'Tanzania'
  }
];

const Testimonials = () => {
  return (
    <section className="py-16 bg-background">
      <div className="container px-4">
        <div className="text-center mb-12 animate-fade-up">
          <h2 className="text-4xl font-bold mb-4 text-gradient">
            Trusted by Travelers Across Africa
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Join thousands of satisfied customers who stay connected with AfriRoam
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-7xl mx-auto">
          {testimonials.map((testimonial, index) => (
            <Card 
              key={testimonial.name}
              className="card-gradient hover-lift animate-fade-up"
              style={{ animationDelay: `${index * 150}ms` }}
            >
              <CardContent className="p-6">
                <div className="flex items-center gap-4 mb-4">
                  <img
                    src={testimonial.image}
                    alt={testimonial.name}
                    className="w-16 h-16 rounded-full object-cover shadow-medium"
                  />
                  <div className="flex-1">
                    <h3 className="font-semibold text-lg">{testimonial.name}</h3>
                    <p className="text-sm text-muted-foreground">{testimonial.role}</p>
                    <p className="text-xs text-muted-foreground">{testimonial.country}</p>
                  </div>
                </div>

                <div className="flex gap-1 mb-4">
                  {[...Array(testimonial.rating)].map((_, i) => (
                    <Star 
                      key={i} 
                      className="w-4 h-4 fill-accent text-accent" 
                    />
                  ))}
                </div>

                <p className="text-muted-foreground leading-relaxed">
                  "{testimonial.text}"
                </p>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Stats Section */}
        <div className="mt-16 grid grid-cols-2 md:grid-cols-4 gap-6 max-w-4xl mx-auto">
          {[
            { value: '50K+', label: 'Active Users' },
            { value: '5', label: 'Countries' },
            { value: '4.9/5', label: 'Rating' },
            { value: '99.9%', label: 'Uptime' }
          ].map((stat, index) => (
            <div 
              key={stat.label}
              className="text-center card-feature animate-scale-in"
              style={{ animationDelay: `${400 + index * 100}ms` }}
            >
              <p className="text-3xl font-bold text-gradient mb-2">{stat.value}</p>
              <p className="text-sm text-muted-foreground">{stat.label}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Testimonials;
