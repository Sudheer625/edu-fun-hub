import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { BookOpen, Video, Mail, GraduationCap, FileText, Play } from "lucide-react";
import { Navigation } from "@/components/Navigation";
import { useAuth } from "@/contexts/AuthContext";

const Index = () => {
  const { user } = useAuth();

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-accent/10 to-background">
      <Navigation />
      
      {/* Hero Section */}
      <section className="container mx-auto px-4 py-20">
        <div className="text-center max-w-3xl mx-auto">
          <div className="inline-flex items-center justify-center p-4 bg-primary/10 rounded-full mb-6">
            <GraduationCap className="h-12 w-12 text-primary" />
          </div>
          <h1 className="text-5xl md:text-6xl font-bold mb-6 bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
            Welcome to Edu Fun
          </h1>
          <p className="text-xl text-muted-foreground mb-8">
            Your complete academic learning management system. Access study materials, watch educational videos, and excel in your studies.
          </p>
          {!user ? (
            <Link to="/auth">
              <Button size="lg" className="gap-2">
                <GraduationCap className="h-5 w-5" />
                Get Started
              </Button>
            </Link>
          ) : (
            <Link to="/subjects">
              <Button size="lg" className="gap-2">
                <BookOpen className="h-5 w-5" />
                Browse Subjects
              </Button>
            </Link>
          )}
        </div>
      </section>

      {/* Features Section */}
      <section className="container mx-auto px-4 py-16">
        <h2 className="text-3xl font-bold text-center mb-12">
          Everything You Need to Learn
        </h2>
        <div className="grid md:grid-cols-3 gap-8">
          <div className="bg-card p-6 rounded-lg border shadow-sm hover:shadow-lg transition-shadow">
            <div className="h-12 w-12 bg-primary/10 rounded-lg flex items-center justify-center mb-4">
              <FileText className="h-6 w-6 text-primary" />
            </div>
            <h3 className="text-xl font-semibold mb-2">Study Materials</h3>
            <p className="text-muted-foreground">
              Access comprehensive PDF materials for all subjects. View online or download for offline study.
            </p>
          </div>

          <div className="bg-card p-6 rounded-lg border shadow-sm hover:shadow-lg transition-shadow">
            <div className="h-12 w-12 bg-secondary/10 rounded-lg flex items-center justify-center mb-4">
              <Play className="h-6 w-6 text-secondary" />
            </div>
            <h3 className="text-xl font-semibold mb-2">Video Lessons</h3>
            <p className="text-muted-foreground">
              Watch curated educational videos from YouTube. Learn from expert instructors at your own pace.
            </p>
          </div>

          <div className="bg-card p-6 rounded-lg border shadow-sm hover:shadow-lg transition-shadow">
            <div className="h-12 w-12 bg-accent/20 rounded-lg flex items-center justify-center mb-4">
              <BookOpen className="h-6 w-6 text-accent-foreground" />
            </div>
            <h3 className="text-xl font-semibold mb-2">Organized by Subject</h3>
            <p className="text-muted-foreground">
              All resources organized by subject for easy navigation. Search and filter to find exactly what you need.
            </p>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      {!user && (
        <section className="container mx-auto px-4 py-16">
          <div className="bg-gradient-to-r from-primary to-secondary rounded-2xl p-12 text-center text-primary-foreground">
            <h2 className="text-3xl font-bold mb-4">Ready to Start Learning?</h2>
            <p className="text-lg mb-8 opacity-90">
              Join Edu Fun today and access all study materials and videos
            </p>
            <Link to="/auth">
              <Button size="lg" variant="secondary" className="gap-2">
                Sign Up Now
              </Button>
            </Link>
          </div>
        </section>
      )}

      {/* Footer */}
      <footer className="border-t py-8 mt-16">
        <div className="container mx-auto px-4 text-center text-muted-foreground">
          <p>&copy; 2025 Edu Fun. All rights reserved.</p>
          <p className="mt-2">Copyrights Reserved to Singidi Sai Naga Sudheer</p>
        </div>
      </footer>
    </div>
  );
};

export default Index;
