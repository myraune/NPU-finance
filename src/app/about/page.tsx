import Image from "next/image";
import Link from "next/link";
import { images } from "@/lib/images";
import ScrollReveal from "@/components/ScrollReveal";
import AnimatedCounter from "@/components/AnimatedCounter";
import GradientOrb from "@/components/GradientOrb";

export default function About() {
  return (
    <>
      {/* ---- HERO ---- */}
      <section className="relative h-[75vh] w-full overflow-hidden">
        <Image
          src={images.oldMain}
          alt="Old Main building at North Park University"
          fill
          className="object-cover"
          priority
        />
        <div className="absolute inset-0 bg-grid" />
        <div className="absolute inset-0 bg-gradient-to-b from-base/60 via-base/30 to-base" />

        <div className="relative z-10 h-full flex flex-col justify-end px-6 md:px-12 pb-16 md:pb-24">
          <p className="reveal text-[11px] tracking-[0.15em] uppercase font-medium text-accent mb-4">
            About NPFIS
          </p>
          <h1 className="reveal reveal-d1 text-5xl md:text-7xl lg:text-8xl font-bold tracking-tight leading-[0.95]">
            Our Story
          </h1>
          <p className="reveal reveal-d2 text-text-secondary text-lg md:text-xl mt-4 max-w-xl">
            Built by students who believed finance education should be for everyone.
          </p>
        </div>
      </section>

      {/* ---- MISSION / ORIGIN ---- */}
      <section className="grid md:grid-cols-2 gap-0">
        <div className="bg-surface-0 px-6 md:px-16 py-20 md:py-24">
          <ScrollReveal>
            <p className="text-[11px] tracking-[0.15em] uppercase font-medium text-accent mb-6">
              Mission
            </p>
          </ScrollReveal>
          <ScrollReveal delay={100}>
            <h2 className="text-3xl md:text-4xl font-bold tracking-tight mb-8 leading-tight">
              Empowering students to take control of their financial futures.
            </h2>
          </ScrollReveal>
          <ScrollReveal delay={200}>
            <p className="text-[15px] leading-[1.8] text-text-secondary max-w-lg">
              NPFIS exists to bridge the gap between classroom theory and real-world
              finance. We create an environment where curiosity is welcomed, ambition
              is rewarded, and every student — regardless of major — can develop the
              skills needed to thrive in the financial world.
            </p>
          </ScrollReveal>
        </div>

        <div className="bg-surface-1 px-6 md:px-16 py-20 md:py-24">
          <ScrollReveal>
            <p className="text-[11px] tracking-[0.15em] uppercase font-medium text-accent mb-6">
              Origin
            </p>
          </ScrollReveal>
          <ScrollReveal delay={100}>
            <h2 className="text-3xl md:text-4xl font-bold tracking-tight mb-8 leading-tight">
              Founded by students, for students.
            </h2>
          </ScrollReveal>
          <ScrollReveal delay={200}>
            <p className="text-[15px] leading-[1.8] text-text-secondary max-w-lg">
              As a finance student at North Park University, one of our founders
              noticed there weren&apos;t many opportunities on campus to gain
              hands-on experience or connect with like-minded students. To bridge
              that gap, he teamed up with Temirlan Avtandilov and Mohamed Zarook
              Mohamed Shamri to start the North Park University Finance and
              Investment Society — now an officially approved Registered Student
              Organization (RSO) on campus.
            </p>
          </ScrollReveal>
        </div>
      </section>

      {/* ---- VALUES ---- */}
      <section className="bg-base">
        <div className="hr-gold" />
        <div className="px-6 md:px-12 pt-16 pb-4">
          <ScrollReveal>
            <p className="text-[11px] tracking-[0.15em] uppercase font-medium text-accent mb-2">
              What We Stand For
            </p>
            <h2 className="text-3xl md:text-4xl font-bold tracking-tight">
              Our Values
            </h2>
          </ScrollReveal>
        </div>

        {[
          {
            num: 1,
            title: "Education First",
            desc: "We make financial literacy accessible to everyone, demystifying markets and creating real-world learning experiences.",
          },
          {
            num: 2,
            title: "Community",
            desc: "An inclusive space where students support each other, share ideas, and build relationships that last beyond graduation.",
          },
          {
            num: 3,
            title: "Excellence",
            desc: "We hold ourselves to the highest standard — in our events, our research, and the way we represent North Park.",
          },
          {
            num: 4,
            title: "Integrity",
            desc: "Ethical decision-making is at the core of everything we do. We believe in doing finance the right way.",
          },
        ].map((v, i) => (
          <ScrollReveal key={v.title} delay={i * 80}>
            <div className="group border-b border-border-subtle hover:bg-surface-1/50 transition-all duration-500 rounded-xl mx-2 md:mx-4">
              <div className="flex flex-col md:flex-row md:items-center gap-4 md:gap-16 px-6 md:px-12 py-10 md:py-14">
                <span className="font-data text-accent/30 text-xs tracking-widest">
                  0{v.num}
                </span>
                <h3 className="text-2xl md:text-3xl font-bold text-text-primary tracking-tight md:w-60 shrink-0 group-hover:text-accent transition-colors duration-500">
                  {v.title}
                </h3>
                <p className="text-[15px] leading-[1.8] text-text-tertiary flex-1 max-w-xl group-hover:text-text-secondary transition-colors duration-500">
                  {v.desc}
                </p>
              </div>
            </div>
          </ScrollReveal>
        ))}
      </section>

      {/* ---- NUMBERS ---- */}
      <section className="bg-surface-0">
        <div className="flex justify-center">
          <ScrollReveal>
            <div className="border border-border-subtle px-16 md:px-24 py-12 md:py-16 text-center">
              <p className="text-4xl md:text-6xl font-bold text-accent tracking-tight">
                <AnimatedCounter target={50} suffix="+" />
              </p>
              <p className="text-[11px] tracking-[0.15em] uppercase font-medium text-text-tertiary mt-3">
                Active Members
              </p>
            </div>
          </ScrollReveal>
        </div>
      </section>

      {/* ---- CAMPUS PHOTO (inset) ---- */}
      <section className="bg-base py-20 md:py-28">
        <ScrollReveal>
          <div className="relative h-[50vh] md:h-[60vh] rounded-2xl mx-6 md:mx-12 overflow-hidden group">
            <Image
              src={images.campusAerial}
              alt="Aerial view of North Park University campus"
              fill
              className="object-cover image-reveal"
            />
            <div className="absolute inset-0 bg-base/40 group-hover:bg-base/30 transition-colors duration-700" />
            <div className="relative z-10 h-full flex flex-col justify-center items-center text-center px-6">
              <p className="text-[11px] tracking-[0.15em] uppercase font-medium text-accent mb-4">
                North Park University
              </p>
              <p className="text-text-primary text-2xl md:text-4xl font-bold tracking-tight max-w-2xl">
                3225 W Foster Ave, Chicago, IL 60625
              </p>
            </div>
          </div>
        </ScrollReveal>
      </section>

      {/* ---- CTA ---- */}
      <section className="relative bg-base py-28 md:py-40 text-center px-6 overflow-hidden">
        <div className="absolute inset-0 bg-grid" />
        <GradientOrb />

        <div className="relative z-10">
          <ScrollReveal>
            <p className="text-[11px] tracking-[0.15em] uppercase font-medium text-accent mb-6">
              Ready?
            </p>
          </ScrollReveal>
          <ScrollReveal delay={100}>
            <h2 className="text-4xl md:text-6xl font-bold tracking-tight mb-6 max-w-3xl mx-auto leading-tight">
              Want to be part of it?
            </h2>
          </ScrollReveal>
          <ScrollReveal delay={200}>
            <p className="text-text-tertiary text-lg mb-10 max-w-md mx-auto">
              All majors. All skill levels. One community.
            </p>
          </ScrollReveal>
          <ScrollReveal delay={300}>
            <Link
              href="/contact"
              className="group relative overflow-hidden inline-flex items-center gap-2 text-sm font-semibold text-base bg-accent hover:bg-accent-light px-8 py-4 rounded-lg glow-accent-hover transition-all duration-300 hover:scale-[1.02] btn-shimmer"
            >
              Join NPFIS
              <svg className="w-4 h-4 group-hover:translate-x-0.5 transition-transform duration-300" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5 21 12m0 0-7.5 7.5M21 12H3" />
              </svg>
            </Link>
          </ScrollReveal>
        </div>
      </section>
    </>
  );
}
