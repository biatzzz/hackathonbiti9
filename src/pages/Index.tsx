import React from "react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { AspectRatio } from "@/components/ui/aspect-ratio";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { useToast } from "@/hooks/use-toast";
import { Calendar, MapPin, Clock, Trophy, Users, GraduationCap, ArrowRight, Twitter, Instagram, Linkedin, Youtube, PlayCircle } from "lucide-react";
const eventStart = new Date("2025-10-18T09:00:00-03:00");
const eventEnd = new Date("2025-10-19T18:00:00-03:00");
function useCountdown(target: Date) {
  const [timeLeft, setTimeLeft] = React.useState({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0
  });
  React.useEffect(() => {
    const tick = () => {
      const now = new Date().getTime();
      const distance = Math.max(0, target.getTime() - now);
      const days = Math.floor(distance / (1000 * 60 * 60 * 24));
      const hours = Math.floor(distance % (1000 * 60 * 60 * 24) / (1000 * 60 * 60));
      const minutes = Math.floor(distance % (1000 * 60 * 60) / (1000 * 60));
      const seconds = Math.floor(distance % (1000 * 60) / 1000);
      setTimeLeft({
        days,
        hours,
        minutes,
        seconds
      });
    };
    tick();
    const id = setInterval(tick, 1000);
    return () => clearInterval(id);
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
    seconds
  } = useCountdown(eventStart);
  const handleRegister: React.FormEventHandler<HTMLFormElement> = e => {
    e.preventDefault();
    toast({
      title: "Inscrição enviada!",
      description: "Em breve entraremos em contato por e-mail."
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
    eventAttendanceMode: "https://schema.org/MixedEventAttendanceMode",
    eventStatus: "https://schema.org/EventScheduled",
    image: ["/placeholder.svg"],
    location: {
      "@type": "Place",
      name: "São Paulo Expo",
      address: {
        "@type": "PostalAddress",
        streetAddress: "Rod. dos Imigrantes, km 1,5",
        addressLocality: "São Paulo",
        addressRegion: "SP",
        postalCode: "04329-900",
        addressCountry: "BR"
      }
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
    document.title = "Hackathon Tech Sprint 2025 — Inove e Construa";
    const descName = "description";
    let meta = document.querySelector(`meta[name="${descName}"]`) as HTMLMetaElement | null;
    if (!meta) {
      meta = document.createElement("meta");
      meta.name = descName;
      document.head.appendChild(meta);
    }
    meta.content = "Inscreva-se no Hackathon Tech Sprint 2025. 24h de inovação, prêmios, networking e aprendizado prático.";
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
          <a href="#topo" className="font-semibold">Tech Sprint</a>
          <div className="hidden md:flex gap-6 text-sm">
            <a href="#beneficios" className="text-muted-foreground hover:text-foreground">Benefícios</a>
            <a href="#agenda" className="text-muted-foreground hover:text-foreground">Agenda</a>
            <a href="#patrocinadores" className="text-muted-foreground hover:text-foreground">Patrocinadores</a>
            <a href="#faq" className="text-muted-foreground hover:text-foreground">FAQ</a>
          </div>
          <Button asChild size="sm">
            
          </Button>
        </nav>
      </header>

      <main id="topo">
        {/* Hero */}
        <section className="relative">
          <div className="absolute inset-0 -z-10 bg-gradient-to-b from-primary/10 via-transparent to-transparent" />
          <div className="container py-16 md:py-24 grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <Badge className="mb-3">Edição 2025</Badge>
              <h1 className="text-4xl md:text-5xl font-bold tracking-tight">Hackathon Interno Biti9:
Crie seu agente de IA</h1>
              <p className="mt-4 text-muted-foreground text-lg">
                24 horas para transformar ideias em protótipos reais. Conecte-se com mentores, aprenda novas habilidades e concorra a prêmios incríveis.
              </p>

              <div className="mt-6 flex flex-wrap gap-3 text-sm">
                <span className="inline-flex items-center gap-2 rounded-md border px-3 py-1.5"><Calendar className="h-4 w-4" /> 18–19 Out 2025</span>
                <span className="inline-flex items-center gap-2 rounded-md border px-3 py-1.5"><Clock className="h-4 w-4" /> 24 horas</span>
                <span className="inline-flex items-center gap-2 rounded-md border px-3 py-1.5"><MapPin className="h-4 w-4" /> São Paulo + Online</span>
              </div>

              {/* Countdown */}
              <div className="mt-8 grid grid-cols-4 max-w-md text-center">
                {[{
                label: "Dias",
                value: days
              }, {
                label: "Horas",
                value: hours
              }, {
                label: "Min",
                value: minutes
              }, {
                label: "Seg",
                value: seconds
              }].map(t => <div key={t.label} className="p-3">
                    <div className="text-3xl font-bold tabular-nums">{String(t.value).padStart(2, "0")}</div>
                    <div className="text-xs text-muted-foreground">{t.label}</div>
                  </div>)}
              </div>

              
            </div>

            {/* Vídeo */}
            <div id="video">
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
            time: "09:00",
            title: "Abertura & Boas-vindas",
            desc: "Credenciamento e apresentação das regras."
          }, {
            time: "10:00",
            title: "Workshop #1",
            desc: "Boas práticas de prototipagem rápida."
          }, {
            time: "12:30",
            title: "Almoço",
            desc: "Intervalo e networking."
          }, {
            time: "14:00",
            title: "Início do Hacking",
            desc: "Formação dos times e kick-off."
          }, {
            time: "20:00",
            title: "Mentorias",
            desc: "Sessões com especialistas."
          }, {
            time: "09:00 (Dia 2)",
            title: "Pitch & Demonstrações",
            desc: "Apresentação dos projetos finalistas."
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
              <h2 className="text-3xl font-semibold tracking-tight">Inscreva-se</h2>
              <p className="mt-2 text-muted-foreground">Garanta sua vaga gratuitamente. Vagas limitadas.</p>

              <form onSubmit={handleRegister} className="mt-6 grid gap-4 max-w-md">
                <div className="grid gap-2">
                  <Label htmlFor="nome">Nome</Label>
                  <Input id="nome" name="nome" placeholder="Seu nome" required />
                </div>
                <div className="grid gap-2">
                  <Label htmlFor="email">E-mail</Label>
                  <Input id="email" name="email" type="email" placeholder="voce@email.com" required />
                </div>
                <Button type="submit" className="w-full">Enviar inscrição</Button>
              </form>

              <div className="mt-8 flex items-center gap-4">
                <span className="text-sm text-muted-foreground">Siga o evento:</span>
                <div className="flex gap-3">
                  <a href="#" aria-label="Twitter" className="inline-flex h-9 w-9 items-center justify-center rounded-md border hover:bg-accent"><Twitter className="h-4 w-4" /></a>
                  <a href="#" aria-label="Instagram" className="inline-flex h-9 w-9 items-center justify-center rounded-md border hover:bg-accent"><Instagram className="h-4 w-4" /></a>
                  <a href="#" aria-label="LinkedIn" className="inline-flex h-9 w-9 items-center justify-center rounded-md border hover:bg-accent"><Linkedin className="h-4 w-4" /></a>
                  <a href="#" aria-label="YouTube" className="inline-flex h-9 w-9 items-center justify-center rounded-md border hover:bg-accent"><Youtube className="h-4 w-4" /></a>
                </div>
              </div>
            </div>

            {/* FAQs */}
            <div id="faq">
              <h2 className="text-3xl font-semibold tracking-tight">Perguntas Frequentes</h2>
              <Accordion type="single" collapsible className="mt-6">
                <AccordionItem value="q1">
                  <AccordionTrigger>O evento é gratuito?</AccordionTrigger>
                  <AccordionContent>Sim, a participação é 100% gratuita.</AccordionContent>
                </AccordionItem>
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
          <p>&copy; {new Date().getFullYear()} Tech Sprint. Todos os direitos reservados.</p>
          <nav className="flex gap-6">
            <a href="#beneficios" className="hover:text-foreground">Benefícios</a>
            <a href="#agenda" className="hover:text-foreground">Agenda</a>
            <a href="#patrocinadores" className="hover:text-foreground">Patrocinadores</a>
            <a href="#faq" className="hover:text-foreground">FAQ</a>
          </nav>
        </div>
      </footer>
    </>;
};
export default Index;