import { useEffect, useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Heart, Sparkles } from "lucide-react";

interface Situation {
  id: string;
  title: string;
  icon: string;
  scripts: string[];
  principles: string[];
}

interface ScriptsData {
  situations: Situation[];
  quickPrinciples: string[];
}

export default function Home() {
  const [scriptsData, setScriptsData] = useState<ScriptsData | null>(null);
  const [selectedSituation, setSelectedSituation] = useState<Situation | null>(null);
  const [showPrinciples, setShowPrinciples] = useState(false);

  useEffect(() => {
    fetch('/scripts.json')
      .then(res => res.json())
      .then(data => setScriptsData(data))
      .catch(err => console.error('Failed to load scripts:', err));
  }, []);

  if (!scriptsData) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-background">
        <div className="text-center">
          <div className="animate-pulse-gentle text-4xl mb-4">💚</div>
          <p className="text-muted-foreground">Loading healing scripts...</p>
        </div>
      </div>
    );
  }

  if (selectedSituation) {
    return (
      <div className="min-h-screen bg-background">
        <div className="container py-8 max-w-4xl">
          <Button 
            variant="ghost" 
            onClick={() => setSelectedSituation(null)}
            className="mb-6"
          >
            ← Back to situations
          </Button>

          <div className="animate-fade-in">
            <Card className="border-2 border-primary/20 shadow-lg">
              <CardHeader className="text-center pb-4">
                <div className="text-6xl mb-4">{selectedSituation.icon}</div>
                <CardTitle className="text-3xl mb-2">{selectedSituation.title}</CardTitle>
                <CardDescription className="text-base">
                  Tap any script to help you respond with calm and connection
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div>
                  <h3 className="text-lg font-semibold mb-3 flex items-center gap-2">
                    <Heart className="w-5 h-5 text-primary" />
                    Scripts to Use
                  </h3>
                  <div className="space-y-3">
                    {selectedSituation.scripts.map((script, idx) => (
                      <Button
                        key={idx}
                        variant="outline"
                        className="w-full h-auto py-4 px-5 text-left justify-start whitespace-normal hover:bg-accent hover:border-primary transition-all"
                        onClick={() => {
                          navigator.clipboard.writeText(script);
                        }}
                      >
                        <span className="text-base leading-relaxed">"{script}"</span>
                      </Button>
                    ))}
                  </div>
                  <p className="text-xs text-muted-foreground mt-3 text-center">
                    Tap any script to copy it to your clipboard
                  </p>
                </div>

                <div className="pt-4 border-t">
                  <h3 className="text-lg font-semibold mb-3 flex items-center gap-2">
                    <Sparkles className="w-5 h-5 text-primary" />
                    Remember
                  </h3>
                  <div className="space-y-2">
                    {selectedSituation.principles.map((principle, idx) => (
                      <div key={idx} className="flex items-start gap-2">
                        <Badge variant="secondary" className="mt-0.5">
                          {idx + 1}
                        </Badge>
                        <p className="text-sm text-muted-foreground leading-relaxed">
                          {principle}
                        </p>
                      </div>
                    ))}
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="border-b bg-card/50 backdrop-blur-sm sticky top-0 z-10">
        <div className="container py-6">
          <div className="text-center">
            <h1 className="text-4xl font-bold mb-2 text-foreground">
              Healing Home Scripts
            </h1>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Quick-access trauma-informed scripts for challenging moments with your child
            </p>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="container py-8 max-w-6xl">
        <div className="mb-8 text-center">
          <p className="text-lg text-foreground/80 mb-4">
            In the heat of the moment, tap a situation below for scripts that bring calm, connection, and healing.
          </p>
          <Button 
            variant="outline" 
            onClick={() => setShowPrinciples(!showPrinciples)}
            className="gap-2"
          >
            <Sparkles className="w-4 h-4" />
            {showPrinciples ? 'Hide' : 'Show'} Core Principles
          </Button>
        </div>

        {showPrinciples && (
          <Card className="mb-8 animate-fade-in border-primary/30">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Sparkles className="w-5 h-5 text-primary" />
                Core Principles of The Healing Home Approach™
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid gap-3 sm:grid-cols-2">
                {scriptsData.quickPrinciples.map((principle, idx) => (
                  <div key={idx} className="flex items-start gap-2 p-3 rounded-lg bg-accent/50">
                    <Badge variant="secondary" className="mt-0.5 shrink-0">
                      {idx + 1}
                    </Badge>
                    <p className="text-sm font-medium">{principle}</p>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        )}

        {/* Situation Cards Grid */}
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {scriptsData.situations.map((situation) => (
            <Card
              key={situation.id}
              className="cursor-pointer hover:shadow-lg hover:border-primary/50 transition-all hover:scale-105 animate-fade-in"
              onClick={() => setSelectedSituation(situation)}
            >
              <CardHeader className="text-center pb-3">
                <div className="text-5xl mb-2">{situation.icon}</div>
                <CardTitle className="text-xl">{situation.title}</CardTitle>
              </CardHeader>
              <CardContent className="text-center">
                <p className="text-sm text-muted-foreground mb-2">
                  {situation.scripts.length} scripts available
                </p>
                <Button variant="outline" size="sm" className="w-full">
                  View Scripts
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>
      </main>

      {/* Footer */}
      <footer className="border-t mt-16 py-8 bg-card/30">
        <div className="container text-center">
          <p className="text-sm text-muted-foreground mb-2">
            Based on <strong>The Healing Home Approach™</strong>
          </p>
          <p className="text-xs text-muted-foreground">
            Trauma-informed parenting rooted in neuroscience and attachment theory
          </p>
          <div className="mt-4 text-2xl">💚</div>
        </div>
      </footer>
    </div>
  );
}

