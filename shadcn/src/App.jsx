import { useCallback, useEffect, useState } from "react";
import { ChevronLeft, ChevronRight, MoonStar, Printer, SunMedium } from "lucide-react";
import { Navigate, Route, Routes, useLocation, useNavigate, useParams } from "react-router-dom";
import { Toaster } from "sonner";

import { SlideRenderer } from "@/components/presentation/SlideRenderer";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Separator } from "@/components/ui/separator";
import { slides, totalPresentationTime } from "@/data/slides";

const CASE_3_CARD_COUNT = 3;
const CASE_5_STAGE_COUNT = 7;
const CASE_11_CARD_COUNT = 4;

function SlidePage() {
  const navigate = useNavigate();
  const location = useLocation();
  const { slideId } = useParams();
  const numericId = Number(slideId || "1");
  const slideIndex = slides.findIndex((slide) => slide.id === numericId);
  const currentSlide = slideIndex >= 0 ? slides[slideIndex] : slides[0];
  const progress = ((currentSlide.id - 1) / (slides.length - 1)) * 100;
  const [theme, setTheme] = useState(() => document.documentElement.dataset.theme || "light");
  const [case3VisibleCards, setCase3VisibleCards] = useState(0);
  const [case5VisibleStages, setCase5VisibleStages] = useState(0);
  const [case11VisibleCards, setCase11VisibleCards] = useState(0);

  const goToSlide = useCallback(
    (targetId, direction = "direct") => {
      if (targetId === 3) {
        setCase3VisibleCards(direction === "backward" ? CASE_3_CARD_COUNT : 0);
      }

      if (targetId === 5) {
        setCase5VisibleStages(direction === "backward" ? CASE_5_STAGE_COUNT : 0);
      }

      if (targetId === 11) {
        setCase11VisibleCards(direction === "backward" ? CASE_11_CARD_COUNT : 0);
      }

      navigate(`/slides/${targetId}`);
    },
    [navigate],
  );

  const goNext = useCallback(() => {
    if (currentSlide.id === 3 && case3VisibleCards < CASE_3_CARD_COUNT) {
      setCase3VisibleCards((visibleCards) => Math.min(visibleCards + 1, CASE_3_CARD_COUNT));
      return;
    }

    if (currentSlide.id === 5 && case5VisibleStages < CASE_5_STAGE_COUNT) {
      setCase5VisibleStages((visibleStages) => Math.min(visibleStages + 1, CASE_5_STAGE_COUNT));
      return;
    }

    if (currentSlide.id === 11 && case11VisibleCards < CASE_11_CARD_COUNT) {
      setCase11VisibleCards((visibleCards) => Math.min(visibleCards + 1, CASE_11_CARD_COUNT));
      return;
    }

    if (currentSlide.id < slides.length) {
      goToSlide(currentSlide.id + 1, "forward");
    }
  }, [case3VisibleCards, case5VisibleStages, case11VisibleCards, currentSlide.id, goToSlide]);

  const goPrevious = useCallback(() => {
    if (currentSlide.id === 3 && case3VisibleCards > 0) {
      setCase3VisibleCards((visibleCards) => Math.max(visibleCards - 1, 0));
      return;
    }

    if (currentSlide.id === 5 && case5VisibleStages > 0) {
      setCase5VisibleStages((visibleStages) => Math.max(visibleStages - 1, 0));
      return;
    }

    if (currentSlide.id === 11 && case11VisibleCards > 0) {
      setCase11VisibleCards((visibleCards) => Math.max(visibleCards - 1, 0));
      return;
    }

    if (currentSlide.id > 1) {
      goToSlide(currentSlide.id - 1, "backward");
    }
  }, [case3VisibleCards, case5VisibleStages, case11VisibleCards, currentSlide.id, goToSlide]);

  useEffect(() => {
    if (slideIndex === -1) {
      navigate("/slides/1", { replace: true });
    }
  }, [navigate, slideIndex]);

  useEffect(() => {
    function onKeyDown(event) {
      const tag = document.activeElement?.tagName?.toLowerCase();
      if (tag === "input" || tag === "textarea") return;

      if (["ArrowRight", "PageDown", " "].includes(event.key)) {
        event.preventDefault();
        goNext();
      }

      if (["ArrowLeft", "PageUp"].includes(event.key)) {
        event.preventDefault();
        goPrevious();
      }

      if (event.key === "Home") goToSlide(1);
      if (event.key === "End") goToSlide(slides.length);
    }

    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [goNext, goPrevious, goToSlide]);

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, [location.pathname]);

  function toggleTheme() {
    const root = document.documentElement;
    const next = theme === "dark" ? "light" : "dark";
    root.dataset.theme = next;
    localStorage.setItem("presentation-theme", next);
    setTheme(next);
  }

  return (
    <div className="min-h-screen bg-[var(--background)] text-foreground">
      <div className="grid min-h-screen lg:grid-cols-[320px_1fr]">
        <aside className="hidden border-r border-[var(--border)] bg-white/40 backdrop-blur-xl lg:flex lg:flex-col">
          <div className="p-6">
            <div className="flex items-center gap-3">
              <div className="presentation-mark small" />
              <div>
                <h1 className="text-lg font-semibold tracking-tight">Shadcn/UI</h1>
              </div>
            </div>
          </div>
          <Separator />
          <ScrollArea className="flex-1 px-4 pb-4">
            <div className="grid gap-2 py-4">
              {slides.map((slide) => (
                <button
                  className={`rounded-2xl border px-4 py-3 text-left transition ${
                    slide.id === currentSlide.id
                      ? "border-emerald-400 bg-emerald-400 text-emerald-950 shadow-sm"
                      : "border-[var(--border)] bg-[var(--surface)] text-foreground hover:border-emerald-300 hover:bg-[var(--surface-2)]"
                  }`}
                  key={slide.id}
                  onClick={() => goToSlide(slide.id)}
                  type="button"
                >
                  <div className="flex items-center justify-between gap-3">
                    <span className="text-sm font-semibold">{String(slide.id).padStart(2, "0")}</span>
                    <span className="text-xs uppercase tracking-[0.18em] opacity-70">{slide.duration}</span>
                  </div>
                  <div className="mt-2 text-sm font-medium">{slide.title}</div>
                </button>
              ))}
            </div>
          </ScrollArea>
        </aside>

        <main className="flex min-h-screen flex-col">
          <header className="sticky top-0 z-20 border-b border-[var(--border)] bg-[color:var(--background)]/86 backdrop-blur-xl">
            <div className="mx-auto flex w-full max-w-7xl flex-col gap-4 px-4 py-4 md:px-6 lg:px-8">
              <div className="flex flex-wrap items-center justify-between gap-4">
                <div className="flex flex-wrap items-center gap-3">
                  <Badge>React + Shadcn</Badge>
                  <Badge variant="muted">{totalPresentationTime}</Badge>
                  <Badge variant="outline">
                    Slide {currentSlide.id} / {slides.length}
                  </Badge>
                </div>
                <div className="flex items-center gap-2">
                  <Button onClick={toggleTheme} size="icon" variant="outline">
                    {theme === "dark" ? <SunMedium className="size-4" /> : <MoonStar className="size-4" />}
                  </Button>
                  <Button onClick={() => window.print()} size="icon" variant="outline">
                    <Printer className="size-4" />
                  </Button>
                </div>
              </div>
              <Progress value={progress} />
            </div>
          </header>

          <div className="flex-1 px-4 py-6 md:px-6 lg:px-8">
            <SlideRenderer
              case3VisibleCards={case3VisibleCards}
              case5VisibleStages={case5VisibleStages}
              case11VisibleCards={case11VisibleCards}
              slide={currentSlide}
            />
          </div>

          <footer className="border-t border-[var(--border)] bg-[color:var(--background)]/86 backdrop-blur-xl">
            <div className="mx-auto flex w-full max-w-7xl items-center justify-between gap-3 px-4 py-4 md:px-6 lg:px-8">
              <Button disabled={currentSlide.id === 1} onClick={goPrevious} variant="outline">
                <ChevronLeft className="size-4" />
                Anterior
              </Button>
              <div className="hidden text-sm text-[var(--muted-foreground)] md:block">{currentSlide.title}</div>
              <Button disabled={currentSlide.id === slides.length} onClick={goNext}>
                Próximo
                <ChevronRight className="size-4" />
              </Button>
            </div>
          </footer>
        </main>
      </div>
      <Toaster position="bottom-right" richColors />
    </div>
  );
}

function App() {
  useEffect(() => {
    const savedTheme = localStorage.getItem("presentation-theme");
    document.documentElement.dataset.theme = savedTheme || "light";
  }, []);

  return (
    <Routes>
      <Route element={<Navigate replace to="/slides/1" />} path="/" />
      <Route element={<SlidePage />} path="/slides/:slideId" />
      <Route element={<Navigate replace to="/slides/1" />} path="*" />
    </Routes>
  );
}

export default App;
