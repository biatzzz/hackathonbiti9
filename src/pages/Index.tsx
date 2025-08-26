import React from "react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { AspectRatio } from "@/components/ui/aspect-ratio";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { useToast } from "@/hooks/use-toast";
import { FlipClock } from "@/components/FlipClock";
import { Calendar, MapPin, Clock, Trophy, Users, GraduationCap, ArrowRight, Twitter, Instagram, Linkedin, Youtube, PlayCircle } from "lucide-react";
const eventStart = new Date("2025-09-15T09:00:00-03:00");
const eventEnd = new Date("2025-09-26T23:59:59-03:00");
function useCountdown(target: Date) {
  const [timeLeft, setTimeLeft] = React.useState({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0,
    hasStarted: false
  });
  
  React.useEffect(() => {
    const calculateTimeLeft = () => {
      const now = new Date().getTime();
      const targetTime = target.getTime();
      const difference = targetTime - now;
      
      console.log("Debug countdown:", {
        now: new Date(now).toLocaleString(),
        target: new Date(targetTime).toLocaleString(),
        difference,
        hasStarted: difference <= 0
      });
      
      if (difference <= 0) {
        console.log("Event has started!");
        setTimeLeft({
          days: 0,
          hours: 0,
          minutes: 0,
          seconds: 0,
          hasStarted: true
        });
        return;
      }
      
      const days = Math.floor(difference / (1000 * 60 * 60 * 24));
      const hours = Math.floor((difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
      const minutes = Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60));
      const seconds = Math.floor((difference % (1000 * 60)) / 1000);
      
      console.log("Calculated time:", { days, hours, minutes, seconds });
      
      setTimeLeft({
        days,
        hours,
        minutes,
        seconds,
        hasStarted: false
      });
    };
    
    calculateTimeLeft();
    const interval = setInterval(calculateTimeLeft, 1000);
    
    return () => clearInterval(interval);
  }, [target]);
  
  return timeLeft;
}
const Index = () => {
  const {
    toast
  } = useToast();
  const {
    days,
    hours,
    minutes,
    seconds,
    hasStarted
  } = useCountdown(eventStart);
  const [parallax, setParallax] = React.useState({
    x: 0,
    y: 0
  });
  const handleHeroMouseMove = React.useCallback((e: React.MouseEvent) => {
    const {
      innerWidth,
      innerHeight
    } = window;
    const x = (e.clientX / innerWidth - 0.5) * 40;
    const y = (e.clientY / innerHeight - 0.5) * 40;
    setParallax({
      x,
      y
    });
  }, []);
  const handleRegister: React.FormEventHandler<HTMLFormElement> = e => {
    e.preventDefault();
    toast({
      title: "Projeto submetido!",
      description: "Recebemos seu projeto. Em breve entraremos em contato."
    });
    (e.currentTarget as HTMLFormElement).reset();
  };
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Event",
    name: "Hackathon Tech Sprint 2025",
    description: "Participe do Hackathon Tech Sprint 2025: 24h de inovação, prêmios, networking e muito aprendizado.",
    startDate: eventStart.toISOString(),
    endDate: eventEnd.toISOString(),
    eventAttendanceMode: "https://schema.org/OnlineEventAttendanceMode",
    eventStatus: "https://schema.org/EventScheduled",
    image: ["/placeholder.svg"],
    location: {
      "@type": "VirtualLocation",
      url: typeof window !== "undefined" ? window.location.origin : "/"
    },
    organizer: {
      "@type": "Organization",
      name: "Tech Sprint",
      url: "/"
    },
    offers: {
      "@type": "Offer",
      url: "#inscricao",
      price: "0",
      priceCurrency: "BRL",
      availability: "https://schema.org/InStock",
      validFrom: new Date().toISOString()
    }
  };
  React.useEffect(() => {
    document.title = "Hackathon Biti9 – Desafios em Inteligência Artificial";
    const descName = "description";
    let meta = document.querySelector(`meta[name="${descName}"]`) as HTMLMetaElement | null;
    if (!meta) {
      meta = document.createElement("meta");
      meta.name = descName;
      document.head.appendChild(meta);
    }
    meta.content = "O futuro é agora! Transforme suas ideias com inteligência artificial em protótipos reais. Aprenda novas habilidades e concorra a prêmios incríveis!";
    let link = document.querySelector(`link[rel="canonical"]`) as HTMLLinkElement | null;
    if (!link) {
      link = document.createElement("link");
      link.rel = "canonical";
      document.head.appendChild(link);
    }
    link.href = `${window.location.origin}/`;
    const scriptId = "event-json-ld";
    const prev = document.getElementById(scriptId);
    if (prev) prev.remove();
    const script = document.createElement("script");
    script.type = "application/ld+json";
    script.id = scriptId;
    script.textContent = JSON.stringify(jsonLd);
    document.head.appendChild(script);
    return () => {
      const s = document.getElementById(scriptId);
      if (s) s.remove();
    };
  }, []);
  return <>

      <header className="border-b bg-background/80 backdrop-blur supports-[backdrop-filter]:bg-background/60 sticky top-0 z-40">
        <nav className="container flex items-center justify-between h-16">
          <a href="#topo" className="font-semibold">Hackathon Biti9</a>
          <div className="hidden md:flex gap-6 text-sm">
            <a href="#beneficios" className="text-muted-foreground hover:text-foreground">Benefícios</a>
            <a href="#agenda" className="text-muted-foreground hover:text-foreground">Agenda</a>
            
            <a href="#faq" className="text-muted-foreground hover:text-foreground">FAQ</a>
          </div>
          <Button asChild size="sm" variant="attention">
            <a href="#inscricao">Submeter seu projeto</a>
          </Button>
        </nav>
      </header>

      <main id="topo">
        {/* Hero */}
        <section className="relative" onMouseMove={handleHeroMouseMove}>
          <div className="absolute inset-0 -z-10 bg-gradient-to-b from-primary/10 via-transparent to-transparent" />
          <span aria-hidden className="pointer-events-none absolute -z-10 left-1/4 top-8 h-40 w-40 rounded-full blur-3xl opacity-30" style={{
          transform: `translate3d(${parallax.x}px, ${parallax.y}px, 0)`,
          background: "radial-gradient(600px circle at center, hsl(var(--primary) / 0.35), transparent 60%)"
        }} />
          <span aria-hidden className="pointer-events-none absolute -z-10 right-10 bottom-0 h-56 w-56 rounded-full blur-3xl opacity-20" style={{
          transform: `translate3d(${parallax.x * -0.6}px, ${parallax.y * -0.6}px, 0)`,
          background: "radial-gradient(520px circle at center, hsl(var(--primary) / 0.25), transparent 60%)"
        }} />
          <div className="container py-16 md:py-24 grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <Badge className="mb-3">Edição 2025</Badge>
              <h1 className="text-4xl md:text-5xl font-bold tracking-tight">Hackathon Biti9 – Desafios em Inteligência Artificial</h1>
              <p className="mt-4 text-muted-foreground text-lg">O futuro é agora! Transforme suas ideias com inteligência artificial em protótipos reais. Aprenda novas habilidades e concorra a prêmios incríveis!</p>

              <div className="mt-6 flex flex-wrap gap-3 text-sm">
                <span className="inline-flex items-center gap-2 rounded-md border px-3 py-1.5"><Calendar className="h-4 w-4" /> 15 a 30 de setembro de 2025</span>
                <span className="inline-flex items-center gap-2 rounded-md border px-3 py-1.5"><Clock className="h-4 w-4" /> 24 horas</span>
                <span className="inline-flex items-center gap-2 rounded-md border px-3 py-1.5"><MapPin className="h-4 w-4" /> Online</span>
              </div>

              {/* Countdown */}
              <div className="mt-8">
                {hasStarted ? (
                  <div className="text-center bg-gradient-to-r from-primary/20 to-primary/10 rounded-lg p-6 border">
                    <div className="text-3xl sm:text-4xl font-bold text-primary mb-2">🚀 Já começou!</div>
                    <div className="text-sm text-muted-foreground">O hackathon está em andamento</div>
                  </div>
                ) : (
                  <div className="text-center">
                    <div className="text-sm text-muted-foreground mb-3">Faltam para o início:</div>
                    <FlipClock days={days} hours={hours} minutes={minutes} seconds={seconds} />
                  </div>
                )}
              </div>

              <div className="mt-8 flex flex-wrap gap-3">
                <Button asChild size="lg" variant="attention">
                  <a href="#inscricao" className="inline-flex items-center gap-2">Submeter seu projeto <ArrowRight className="h-4 w-4" /></a>
                </Button>
                <Button variant="outline" asChild size="lg">
                  <a href="#video" className="inline-flex items-center gap-2"><PlayCircle className="h-5 w-5" /> Ver vídeo</a>
                </Button>
              </div>
            </div>

            {/* Vídeo */}
            <div id="video" className="hover-scale">
              <AspectRatio ratio={16 / 9}>
                <iframe className="h-full w-full rounded-md border" src="https://www.youtube.com/embed/ysz5S6PUM-U?rel=0" title="Vídeo do Hackathon Tech Sprint" loading="lazy" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" allowFullScreen />
              </AspectRatio>
            </div>
          </div>
        </section>

        {/* Benefícios */}
        <section id="beneficios" className="container py-16 md:py-24">
          <h2 className="text-3xl font-semibold tracking-tight">Por que participar?</h2>
          <p className="mt-2 text-muted-foreground">Vantagens que você leva ao se juntar ao Hackathon.</p>

          <div className="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {[{
            icon: <Trophy className="h-6 w-6" />,
            title: "Prêmios",
            desc: "Premiações para os melhores projetos, incluindo bolsas e gadgets."
          }, {
            icon: <Users className="h-6 w-6" />,
            title: "Networking",
            desc: "Conecte-se com profissionais, empresas e outros devs."
          }, {
            icon: <GraduationCap className="h-6 w-6" />,
            title: "Aprendizado",
            desc: "Workshops e mentorias com especialistas do mercado."
          }, {
            icon: <Clock className="h-6 w-6" />,
            title: "Experiência",
            desc: "Desenvolva habilidades práticas trabalhando em equipe sob pressão."
          }].map(b => <Card key={b.title}>
                <CardHeader>
                  <CardTitle className="flex items-center gap-3 text-lg">{b.icon}{b.title}</CardTitle>
                </CardHeader>
                <CardContent className="text-sm text-muted-foreground">{b.desc}</CardContent>
              </Card>)}
          </div>
        </section>

        {/* Agenda */}
        <section id="agenda" className="container py-16 md:py-24">
          <h2 className="text-3xl font-semibold tracking-tight">Agenda do Evento</h2>
          <p className="mt-2 text-muted-foreground">Cronograma das atividades principais.</p>

          <div className="mt-8 grid gap-6 lg:grid-cols-3">
            {[{
            time: "A partir do dia 28 de agosto",
            title: "Treinamento sobre IA no Nichoos",
            desc: "Este treinamento opcional vai te ajudar a entender sobre IA!"
          }, {
            time: "5 a 12 de setembro",
            title: "Formação de grupos",
            desc: "Forme um grupo de 3 pessoas. Conversem para encontrar um interesse em comum ou de alguém do grupo para criar uma solução com IA!"
          }, {
            time: "15 a 29 de setembro",
            title: "Desenvolvimento do Hackathon",
            desc: "Você irá receber suporte do comitê do Hackathon para desenvolver seu projeto e criar uma solução!"
          }, {
            time: "30 de Setembro",
            title: "último dia para submeter seu projeto!",
            desc: "Fique atento para não perder o prazo!"
          }, {
            time: "13 de outubro",
            title: "Premiação!",
            desc: "Após avaliação e a apuração, vamos premiar os 3 principais projetos!"
          }].map(a => <Card key={a.time}>
                <CardHeader>
                  <CardTitle className="text-lg">{a.time} — {a.title}</CardTitle>
                </CardHeader>
                <CardContent className="text-sm text-muted-foreground">{a.desc}</CardContent>
              </Card>)}
          </div>
        </section>

        {/* Patrocinadores */}
        

        {/* Testemunhos */}
        

        {/* Inscrição */}
        <section id="inscricao" className="container py-16 md:py-24">
          <div className="grid lg:grid-cols-2 gap-10 items-start">
            <div>
              <h2 className="text-3xl font-semibold tracking-tight">Submeter seu projeto</h2>
              <p className="mt-2 text-muted-foreground">Para todos os colaboradores Biti9!</p>

              <form onSubmit={handleRegister} className="mt-6 grid gap-4 max-w-md">
                <Button type="submit" className="w-full" variant="attention">Submeter seu projeto</Button>
              </form>

              
            </div>

            {/* FAQs */}
            <div id="faq">
              <h2 className="text-3xl font-semibold tracking-tight">Perguntas Frequentes</h2>
              <Accordion type="single" collapsible className="mt-6">
                <AccordionItem value="q2">
                  <AccordionTrigger>Preciso formar um time antes?</AccordionTrigger>
                  <AccordionContent>Não. Teremos uma dinâmica de formação de times no início.</AccordionContent>
                </AccordionItem>
                <AccordionItem value="q3">
                  <AccordionTrigger>Qual o nível de experiência necessário?</AccordionTrigger>
                  <AccordionContent>Todos os níveis são bem-vindos. Haverá mentorias para apoiar os participantes.</AccordionContent>
                </AccordionItem>
                <AccordionItem value="q4">
                  <AccordionTrigger>O evento será presencial ou online?</AccordionTrigger>
                  <AccordionContent>Formato híbrido: presencial em São Paulo e transmissão online.</AccordionContent>
                </AccordionItem>
              </Accordion>
            </div>
          </div>
        </section>
      </main>

      <footer className="border-t">
        <div className="container py-10 text-sm text-muted-foreground flex flex-col md:flex-row items-center justify-between gap-4">
          
          <nav className="flex gap-6">
            <a href="#beneficios" className="hover:text-foreground">Benefícios</a>
            <a href="#agenda" className="hover:text-foreground">Agenda</a>
            
            <a href="#faq" className="hover:text-foreground">FAQ</a>
          </nav>
        </div>
      </footer>
    </>;
};
export default Index;