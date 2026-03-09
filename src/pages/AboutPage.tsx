import { UtensilsCrossed, Heart, Award, Users, Sparkles, ChefHat, Leaf } from "lucide-react";
import { useCountUp } from "@/hooks/useCountUp";

const StatCounter = ({ value, label }: { value: string; label: string }) => {
  // Extract number from value (e.g., "5+" -> 5, "10K+" -> 10000, "4.5/5★" -> 45)
  const numericValue = value.includes("K") 
    ? parseFloat(value.replace("K+", "")) * 1000
    : value.includes("/5★")
    ? parseFloat(value.replace("/5★", "")) * 10 // Multiply by 10 for decimal precision
    : parseFloat(value.replace(/[^\d.]/g, ""));
  
  const { count, elementRef } = useCountUp({ end: numericValue, duration: 2500 });
  
  // Format the count back to original format
  const formatCount = (num: number) => {
    if (value.includes("K+")) {
      return `${(num / 1000).toFixed(num >= 1000 ? 0 : 1)}K+`;
    } else if (value.includes("/5★")) {
      return `${(num / 10).toFixed(1)}/5★`;
    } else if (value.includes("+")) {
      return `${num}+`;
    }
    return num.toString();
  };

  return (
    <div ref={elementRef} className="text-center group animate-bounce-in">
      <div className="mb-3 relative inline-block">
        <div className="absolute inset-0 bg-primary/20 rounded-full blur-xl group-hover:blur-2xl transition-all" />
        <p className="font-body text-5xl md:text-6xl font-black gradient-text relative hover-scale tracking-tight">
          {formatCount(count)}
        </p>
      </div>
      <p className="font-body text-sm md:text-base text-muted-foreground font-medium">
        {label}
      </p>
    </div>
  );
};

const AboutPage = () => {
  const values = [
    {
      icon: UtensilsCrossed,
      title: "Authentic Flavors",
      desc: "We stay true to traditional recipes passed down through generations, using authentic spices and cooking methods to deliver genuine Indian taste.",
    },
    {
      icon: Heart,
      title: "Made with Love",
      desc: "Every dish is prepared with care and passion. Our chefs treat each order as if they're cooking for their own family, ensuring quality in every bite.",
    },
    {
      icon: Award,
      title: "Quality Ingredients",
      desc: "We source fresh, locally-grown vegetables, premium meats, and authentic spices. No compromises on quality, ever.",
    },
    {
      icon: Users,
      title: "Community First",
      desc: "We're more than a restaurant — we're part of the community. We support local farmers, employ local talent, and give back to society.",
    },
  ];

  const stats = [
    { value: "5+", label: "Years of Excellence" },
    { value: "50+", label: "Signature Dishes" },
    { value: "10K+", label: "Happy Customers" },
    { value: "4.5/5★", label: "Average Rating" },
  ];

  return (
    <main className="pt-24 pb-20 min-h-screen bg-background overflow-hidden">
      <div className="container max-w-6xl">
        {/* Hero Section */}
        <div className="text-center mb-16 relative">
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-64 h-64 bg-primary/10 rounded-full blur-3xl -z-10 animate-pulse" />
          <p className="font-body text-primary font-semibold text-sm tracking-widest uppercase mb-3 animate-fade-in-down">Our Story</p>
          <h1 className="font-display text-5xl md:text-6xl lg:text-7xl font-bold mb-6 animate-fade-in-up gradient-text">
            About Spice Garden
          </h1>
          <p className="font-body text-muted-foreground text-lg md:text-xl leading-relaxed max-w-3xl mx-auto animate-fade-in-up stagger-1">
            Founded in 2020, Spice Garden is a celebration of culinary art — blending time-honored Indian traditions with modern innovation. Every dish is crafted from locally sourced, seasonal ingredients by our team of passionate chefs.
          </p>
        </div>

        {/* Journey Section with Image */}
        <div className="grid md:grid-cols-2 gap-8 mb-16 items-center">
          <div className="relative animate-slide-in-left">
            <div className="absolute -top-4 -left-4 w-24 h-24 bg-primary/20 rounded-full blur-2xl" />
            <div className="bg-card border border-border rounded-3xl p-8 hover-lift relative overflow-hidden">
              <div className="absolute top-0 right-0 w-32 h-32 bg-primary/5 rounded-full -translate-y-1/2 translate-x-1/2" />
              <div className="flex items-center gap-3 mb-6">
                <div className="p-3 rounded-xl bg-primary/10">
                  <Sparkles className="w-6 h-6 text-primary" />
                </div>
                <h2 className="font-display text-3xl font-bold">Our Journey</h2>
              </div>
              <div className="space-y-4 font-body text-muted-foreground leading-relaxed">
                <p>
                  Spice Garden was born from a simple dream: to bring authentic Indian flavors to food lovers while honoring the rich culinary heritage of India. What started as a small family kitchen in Mumbai has grown into a beloved restaurant.
                </p>
                <p>
                  Our name reflects our philosophy. Just as a garden nurtures diverse plants, we celebrate the incredible variety of Indian cuisine — from fiery curries to aromatic biryanis, from tandoori delights to coastal seafood specialties.
                </p>
              </div>
            </div>
          </div>

          <div className="relative animate-slide-in-right">
            <div className="absolute -bottom-4 -right-4 w-24 h-24 bg-primary/20 rounded-full blur-2xl" />
            <div className="bg-card border border-border rounded-3xl p-8 hover-lift relative overflow-hidden">
              <div className="absolute bottom-0 left-0 w-32 h-32 bg-primary/5 rounded-full translate-y-1/2 -translate-x-1/2" />
              <div className="flex items-center gap-3 mb-6">
                <div className="p-3 rounded-xl bg-primary/10">
                  <Leaf className="w-6 h-6 text-primary" />
                </div>
                <h2 className="font-display text-3xl font-bold">Our Philosophy</h2>
              </div>
              <div className="space-y-4 font-body text-muted-foreground leading-relaxed">
                <p>
                  Every spice in our kitchen tells a story. We source our ingredients directly from local farmers and trusted suppliers, ensuring that each dish captures the true essence of Indian cooking.
                </p>
                <p>
                  Our chefs, trained in traditional techniques and modern culinary arts, pour their heart into every plate that leaves our kitchen. Quality, authenticity, and innovation are at the core of everything we do.
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Values Grid */}
        <div className="mb-16">
          <h2 className="font-display text-3xl md:text-4xl font-bold text-center mb-12 animate-fade-in-up">
            What Makes Us <span className="gradient-text">Special</span>
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {values.map((value, i) => (
              <div
                key={i}
                className={`group bg-card border border-border rounded-2xl p-6 hover-lift animate-fade-in-up stagger-${i + 1} relative overflow-hidden`}
              >
                <div className="absolute top-0 right-0 w-20 h-20 bg-primary/5 rounded-full -translate-y-1/2 translate-x-1/2 group-hover:scale-150 transition-transform duration-500" />
                <div className="w-14 h-14 rounded-xl bg-gradient-to-br from-primary/20 to-primary/5 flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300">
                  <value.icon className="w-7 h-7 text-primary" />
                </div>
                <h3 className="font-display text-xl font-semibold mb-3 group-hover:text-primary transition-colors">
                  {value.title}
                </h3>
                <p className="font-body text-sm text-muted-foreground leading-relaxed">
                  {value.desc}
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* Chef's Message */}
        <div className="mb-16 animate-fade-in-up">
          <div className="bg-gradient-to-br from-primary/10 via-primary/5 to-transparent border-2 border-primary/20 rounded-3xl p-8 md:p-12 hover-lift relative overflow-hidden">
            <div className="absolute top-0 left-0 w-40 h-40 bg-primary/10 rounded-full -translate-y-1/2 -translate-x-1/2" />
            <div className="absolute bottom-0 right-0 w-40 h-40 bg-primary/10 rounded-full translate-y-1/2 translate-x-1/2" />
            
            <div className="flex flex-col md:flex-row items-start gap-6 mb-6 relative">
              <div className="relative">
                <div className="absolute inset-0 bg-primary/20 rounded-full blur-xl" />
                <img 
                  src="https://api.dicebear.com/7.x/avataaars/svg?seed=Chef" 
                  alt="Head Chef" 
                  className="w-20 h-20 rounded-full border-4 border-primary shadow-xl relative hover-scale"
                />
                <div className="absolute -bottom-1 -right-1 w-8 h-8 bg-primary rounded-full flex items-center justify-center border-2 border-background">
                  <ChefHat className="w-4 h-4 text-primary-foreground" />
                </div>
              </div>
              <div>
                <h3 className="font-display text-2xl md:text-3xl font-bold mb-1">Chef Vikram Malhotra</h3>
                <p className="font-body text-sm text-muted-foreground mb-2">Head Chef & Co-Founder</p>
                <div className="flex gap-1">
                  {[...Array(5)].map((_, i) => (
                    <span key={i} className="text-primary text-lg">★</span>
                  ))}
                </div>
              </div>
            </div>
            
            <blockquote className="font-body text-muted-foreground leading-relaxed border-l-4 border-primary pl-6 relative">
              <span className="absolute -top-2 -left-2 text-6xl text-primary/20 font-serif">"</span>
              <p className="text-base md:text-lg italic">
                At Spice Garden, we believe that food is not just sustenance — it's an experience, a memory, a celebration. Every dish we create is a labor of love, combining the wisdom of traditional Indian cooking with contemporary techniques. When you dine with us, you're not just eating a meal; you're embarking on a culinary journey through the diverse regions of India. That's our promise to you.
              </p>
            </blockquote>
          </div>
        </div>

        {/* Stats */}
        <div className="bg-gradient-to-r from-primary/5 via-primary/10 to-primary/5 rounded-3xl p-8 md:p-12 animate-fade-in-up">
          <h2 className="font-display text-3xl md:text-4xl font-bold text-center mb-10">
            Our <span className="gradient-text">Achievements</span>
          </h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {stats.map((stat, i) => (
              <StatCounter key={i} value={stat.value} label={stat.label} />
            ))}
          </div>
        </div>
      </div>
    </main>
  );
};

export default AboutPage;
