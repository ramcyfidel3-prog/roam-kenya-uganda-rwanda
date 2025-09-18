import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Calendar, Clock, Search, Bookmark } from 'lucide-react';

const Magazine = () => {
  const featuredArticles = [
    {
      id: 1,
      title: "The Ultimate Guide to East African Safari Destinations",
      excerpt: "Discover the hidden gems and iconic wildlife parks across Kenya, Tanzania, and Uganda. From the Serengeti to Mount Kenya, plan your perfect safari adventure.",
      category: "Travel",
      readTime: "8 min read",
      date: "2024-03-15",
      image: "🦁",
      featured: true
    },
    {
      id: 2,
      title: "Digital Nomad's Guide to Working from East Africa",
      excerpt: "Remote work opportunities, co-working spaces, and the best cities for digital nomads in the East African region.",
      category: "Digital Life",
      readTime: "6 min read",
      date: "2024-03-12",
      image: "💻",
      featured: true
    }
  ];

  const articles = [
    {
      id: 3,
      title: "Understanding eSIM Technology: A Complete Guide",
      excerpt: "Learn everything you need to know about eSIM technology, how it works, and why it's the future of mobile connectivity.",
      category: "Technology",
      readTime: "5 min read",
      date: "2024-03-10",
      image: "📱"
    },
    {
      id: 4,
      title: "Cultural Etiquette: Doing Business in East Africa",
      excerpt: "Navigate the cultural nuances of conducting business across different East African countries with confidence.",
      category: "Business",
      readTime: "7 min read",
      date: "2024-03-08",
      image: "🤝"
    },
    {
      id: 5,
      title: "Street Food Adventures: Must-Try Dishes in Each Country",
      excerpt: "From Ugali in Kenya to Injera in Ethiopia, explore the rich culinary landscape of East Africa.",
      category: "Food & Culture",
      readTime: "4 min read",
      date: "2024-03-05",
      image: "🍽️"
    },
    {
      id: 6,
      title: "Mobile Money Revolution in East Africa",
      excerpt: "How mobile payment systems like M-Pesa have transformed financial inclusion across the region.",
      category: "Technology",
      readTime: "6 min read",
      date: "2024-03-03",
      image: "💰"
    },
    {
      id: 7,
      title: "Sustainable Tourism: Protecting East Africa's Natural Heritage",
      excerpt: "Learn how responsible tourism practices are helping preserve the region's incredible biodiversity.",
      category: "Environment",
      readTime: "5 min read",
      date: "2024-03-01",
      image: "🌿"
    },
    {
      id: 8,
      title: "Language Learning: Basic Swahili for Travelers",
      excerpt: "Master essential Swahili phrases that will enhance your travel experience across East Africa.",
      category: "Travel",
      readTime: "3 min read",
      date: "2024-02-28",
      image: "🗣️"
    }
  ];

  const categories = ["All", "Travel", "Technology", "Business", "Food & Culture", "Digital Life", "Environment"];

  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      <main className="container px-4 py-8">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-bold text-gradient mb-4">
            AfriRoam Magazine
          </h1>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Discover East Africa through our curated articles on travel, technology, culture, and the latest in mobile connectivity.
          </p>
        </div>

        {/* Search and Categories */}
        <div className="mb-12">
          <div className="flex flex-col md:flex-row gap-4 mb-6">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input
                type="text"
                placeholder="Search articles..."
                className="pl-10"
              />
            </div>
            <Button variant="outline" className="gap-2">
              <Bookmark className="w-4 h-4" />
              Saved Articles
            </Button>
          </div>

          <div className="flex flex-wrap gap-2">
            {categories.map((category) => (
              <Badge 
                key={category}
                variant={category === "All" ? "default" : "outline"}
                className="cursor-pointer hover:bg-primary hover:text-primary-foreground transition-colors"
              >
                {category}
              </Badge>
            ))}
          </div>
        </div>

        {/* Featured Articles */}
        <section className="mb-16">
          <h2 className="text-2xl font-bold mb-8">Featured Stories</h2>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {featuredArticles.map((article) => (
              <Card key={article.id} className="group cursor-pointer hover:shadow-lg hover:shadow-primary/20 transition-all duration-300 overflow-hidden">
                <div className="bg-gradient-safari p-8 text-white">
                  <div className="text-6xl mb-4">{article.image}</div>
                  <Badge variant="secondary" className="mb-3 bg-white/20 text-white border-white/30">
                    {article.category}
                  </Badge>
                  <CardTitle className="text-2xl mb-3 group-hover:text-orange-200 transition-colors">
                    {article.title}
                  </CardTitle>
                  <p className="text-white/90 leading-relaxed">
                    {article.excerpt}
                  </p>
                </div>
                <CardContent className="p-6">
                  <div className="flex items-center gap-4 text-sm text-muted-foreground">
                    <div className="flex items-center gap-1">
                      <Calendar className="w-4 h-4" />
                      {new Date(article.date).toLocaleDateString()}
                    </div>
                    <div className="flex items-center gap-1">
                      <Clock className="w-4 h-4" />
                      {article.readTime}
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </section>

        {/* Recent Articles */}
        <section>
          <h2 className="text-2xl font-bold mb-8">Latest Articles</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {articles.map((article) => (
              <Card key={article.id} className="group cursor-pointer hover:shadow-lg hover:shadow-primary/20 transition-all duration-300">
                <CardHeader className="text-center">
                  <div className="text-5xl mb-4 group-hover:scale-110 transition-transform duration-300">
                    {article.image}
                  </div>
                  <Badge variant="outline" className="mb-3 group-hover:border-primary transition-colors">
                    {article.category}
                  </Badge>
                  <CardTitle className="text-lg group-hover:text-primary transition-colors leading-tight">
                    {article.title}
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground text-sm mb-4 leading-relaxed">
                    {article.excerpt}
                  </p>
                  <div className="flex items-center justify-between text-xs text-muted-foreground">
                    <div className="flex items-center gap-1">
                      <Calendar className="w-3 h-3" />
                      {new Date(article.date).toLocaleDateString()}
                    </div>
                    <div className="flex items-center gap-1">
                      <Clock className="w-3 h-3" />
                      {article.readTime}
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </section>

        {/* Newsletter Signup */}
        <section className="mt-16">
          <div className="bg-gradient-safari rounded-xl p-8 text-white text-center">
            <h2 className="text-3xl font-bold mb-4">Stay Updated</h2>
            <p className="text-xl mb-6 opacity-90">
              Get the latest articles, travel tips, and technology insights delivered to your inbox.
            </p>
            <div className="max-w-md mx-auto flex gap-3">
              <Input 
                type="email" 
                placeholder="Enter your email" 
                className="bg-white/10 border-white/30 text-white placeholder:text-white/70"
              />
              <Button className="bg-white text-primary hover:bg-white/90 transition-colors">
                Subscribe
              </Button>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
};

export default Magazine;