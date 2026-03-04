"use client";

import Link from "next/link";
import Image from "next/image";
import TeamCard from "@/components/TeamCard";
import ScrollReveal from "@/components/ScrollReveal";
import GradientOrb from "@/components/GradientOrb";

const founders = [
  { name: "Tyler Habetler", role: "Co-Founder", major: "Finance", year: "Student", bio: "As a finance student at North Park University, he noticed there weren't many opportunities on campus to gain hands-on experience or connect with like-minded students. He took the initiative to create a society where students can learn, grow, and engage with finance and investments beyond the classroom.", linkedin: "#", image: "/images/founder-third.jpg" },
  { name: "Temirlan Avtandilov", role: "Co-Founder", major: "Finance", year: "Student", bio: "Co-founded the North Park University Finance and Investment Society to help bridge the gap between classroom learning and real-world finance. Passionate about creating opportunities for students to gain hands-on experience in finance and investments.", linkedin: "#", image: "/images/founder-temirlan.jpg" },
  { name: "Mohamed Zarook Mohamed Shamri", role: "Co-Founder", major: "Finance", year: "Student", bio: "Co-founded NPFIS to build a community where students can develop practical financial skills and connect with like-minded peers. Dedicated to making finance education accessible to all North Park students.", linkedin: "#", image: "/images/founder-shamri.jpg" },
];

export default function Team() {
  return (
    <>
      {/* ▌HERO */}
      <section className="bg-base pt-36 pb-20 px-6 md:px-12">
        <ScrollReveal>
          <p className="text-accent text-[11px] tracking-[0.15em] uppercase font-medium mb-4">Team</p>
        </ScrollReveal>
        <ScrollReveal delay={100}>
          <h1 className="text-5xl md:text-7xl font-bold tracking-[-0.03em] max-w-3xl">The people behind NPFIS.</h1>
        </ScrollReveal>
        <ScrollReveal delay={200}>
          <p className="text-text-secondary text-sm mt-6">Click any card to learn more.</p>
          <div className="w-16 h-0.5 bg-accent/40 mt-6" />
        </ScrollReveal>
      </section>

      {/* ▌FOUNDERS GROUP PHOTO */}
      <section className="px-6 md:px-12 pb-8">
        <ScrollReveal>
          <div className="relative w-full h-[50vh] rounded-2xl overflow-hidden">
            <Image
              src="/images/founders-group-bench.jpg"
              alt="NPFIS Founders"
              fill
              className="object-cover object-top"
              sizes="100vw"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-base via-transparent to-transparent" />
            <div className="absolute bottom-0 left-0 px-8 md:px-12 pb-8">
              <div className="glass-accent rounded-lg px-4 py-3 inline-block">
                <p className="text-accent text-[10px] tracking-[0.15em] uppercase font-medium mb-1">Est. 2025</p>
                <p className="text-text-primary text-lg md:text-xl font-semibold">The founding team of NPFIS</p>
              </div>
            </div>
          </div>
        </ScrollReveal>
      </section>

      {/* ▌FOUNDERS */}
      <section className="bg-base pb-16">
        <ScrollReveal>
          <div className="px-6 md:px-12 py-6">
            <p className="text-accent text-[11px] tracking-[0.15em] uppercase font-medium">Founders</p>
          </div>
        </ScrollReveal>
        <div className="grid md:grid-cols-3 gap-5 px-6 md:px-12">
          {founders.map((m, i) => (
            <ScrollReveal key={m.name} delay={i * 100}>
              <TeamCard member={m} variant="board" />
            </ScrollReveal>
          ))}
        </div>
      </section>

      {/* ▌CTA */}
      <section className="relative bg-surface-0 py-28 md:py-36 text-center px-6 overflow-hidden">
        <div className="absolute inset-0 bg-grid" />
        <GradientOrb />
        <div className="relative z-10">
          <ScrollReveal>
            <h2 className="text-3xl md:text-5xl font-bold tracking-[-0.02em] mb-6">Want to lead?</h2>
          </ScrollReveal>
          <ScrollReveal delay={100}>
            <p className="text-text-secondary mb-10 max-w-md mx-auto">We recruit new board members every academic year.</p>
          </ScrollReveal>
          <ScrollReveal delay={200}>
            <Link href="/contact" className="text-[13px] font-semibold text-base bg-accent hover:bg-accent-light rounded-lg px-8 py-4 transition-all duration-300 glow-accent-hover">
              Apply to Join
            </Link>
          </ScrollReveal>
        </div>
      </section>
    </>
  );
}
