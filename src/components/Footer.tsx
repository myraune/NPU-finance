import Link from "next/link";
import Logo from "./Logo";

export default function Footer() {
  return (
    <footer className="relative bg-surface-0 overflow-hidden">
      {/* Ambient orb */}
      <div
        className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[300px] rounded-full opacity-[0.07] blur-[100px] pointer-events-none"
        style={{ background: "radial-gradient(circle, var(--color-accent) 0%, transparent 70%)" }}
      />

      {/* Gold line */}
      <div className="h-px bg-gradient-to-r from-transparent via-accent/30 to-transparent" />

      <div className="relative z-10 max-w-6xl mx-auto px-6 md:px-12 py-16 md:py-20">
        <div className="grid md:grid-cols-3 gap-12 md:gap-8">
          {/* Brand */}
          <div>
            <div className="flex items-center gap-3 mb-4">
              <Logo size={48} />
              <span className="text-accent font-bold tracking-widest text-lg">NPFIS</span>
            </div>
            <p className="text-text-secondary text-sm leading-relaxed max-w-xs">
              North Park University&apos;s Finance &amp; Investment Society. Building the next generation of finance leaders.
            </p>
          </div>

          {/* Navigate */}
          <div>
            <p className="text-text-tertiary text-[11px] tracking-[0.15em] uppercase font-medium mb-5">Navigate</p>
            <div className="flex flex-col gap-3">
              {[
                { href: "/about", label: "About" },
                { href: "/team", label: "Team" },
                { href: "/contact", label: "Contact" },
              ].map((l) => (
                <Link key={l.href} href={l.href} className="text-text-secondary text-sm hover:text-accent transition-colors duration-300 w-fit">
                  {l.label}
                </Link>
              ))}
            </div>
          </div>

          {/* Connect */}
          <div>
            <p className="text-text-tertiary text-[11px] tracking-[0.15em] uppercase font-medium mb-5">Connect</p>
            <div className="flex flex-col gap-3">
              <a href="mailto:npfis@northpark.edu" className="text-text-secondary text-sm hover:text-accent transition-colors duration-300 w-fit">
                npfis@northpark.edu
              </a>
              <p className="text-text-tertiary text-sm">3225 W Foster Ave, Chicago IL</p>
            </div>
            <div className="flex gap-3 mt-5">
              {/* LinkedIn */}
              <a href="https://www.linkedin.com/company/north-park-university-finance-and-investment-society" target="_blank" rel="noopener noreferrer" className="rounded-lg bg-surface-1 hover:bg-surface-2 p-2.5 text-text-secondary hover:text-accent transition-all duration-300" aria-label="LinkedIn">
                <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
                </svg>
              </a>
              {/* Instagram */}
              <a href="https://www.instagram.com/fis_npu/" target="_blank" rel="noopener noreferrer" className="rounded-lg bg-surface-1 hover:bg-surface-2 p-2.5 text-text-secondary hover:text-accent transition-all duration-300" aria-label="Instagram">
                <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z" />
                </svg>
              </a>
            </div>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="mt-16 pt-6 border-t border-border-subtle flex flex-col md:flex-row justify-between items-center gap-2">
          <p className="text-text-muted text-xs">&copy; {new Date().getFullYear()} NPFIS at North Park University. All rights reserved.</p>
          <p className="text-text-muted text-xs">Built by <a href="https://frostagroup.no/" target="_blank" rel="noopener noreferrer" className="hover:text-accent transition-colors duration-300">Frosta Group</a></p>
        </div>
      </div>
    </footer>
  );
}
