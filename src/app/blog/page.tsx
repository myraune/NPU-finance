import Link from "next/link";

const posts = [
  { title: "Understanding the Basics of Stock Valuation", excerpt: "Key metrics and methods to determine whether a stock is fairly valued.", date: "Feb 1, 2026", category: "Education" },
  { title: "5 Tips for Building Your First Portfolio", excerpt: "Five principles every new investor should know before putting money to work.", date: "Jan 18, 2026", category: "Investing" },
  { title: "Market Recap: Q4 2025 in Review", excerpt: "Major market moves, trends, and takeaways from Q4 2025.", date: "Jan 5, 2026", category: "Analysis" },
  { title: "Breaking Into Finance: Networking Strategies", excerpt: "Leveraging campus resources, LinkedIn, and alumni networks.", date: "Dec 15, 2025", category: "Career" },
  { title: "What Is an ETF and Why Should You Care?", excerpt: "How ETFs work and why they matter for beginner investors.", date: "Dec 1, 2025", category: "Education" },
  { title: "The Power of Compound Interest", excerpt: "Why starting early is the most important financial decision you can make.", date: "Nov 18, 2025", category: "Education" },
];

export default function Blog() {
  return (
    <>
      <section className="pt-32 pb-20 border-b border-white/[0.04]">
        <div className="max-w-6xl mx-auto px-6">
          <p className="text-xs text-text-tertiary tracking-[0.25em] uppercase mb-3">Blog</p>
          <h1 className="text-4xl md:text-5xl font-medium text-text-primary tracking-tight mb-4">Insights &amp; analysis.</h1>
          <p className="text-lg text-text-tertiary max-w-xl">Educational content from the NPFIS research team.</p>
        </div>
      </section>

      <section className="py-20">
        <div className="max-w-6xl mx-auto px-6">
          <div className="space-y-1">
            {posts.map((post) => (
              <Link
                key={post.title}
                href="#"
                className="group flex flex-col md:flex-row md:items-center gap-2 md:gap-8 py-6 border-b border-white/[0.04] hover:bg-surface-0 -mx-4 px-4 rounded-lg transition-colors duration-200"
              >
                <span className="text-xs text-text-tertiary md:w-28 shrink-0">{post.date}</span>
                <span className="text-xs text-text-tertiary md:w-20 shrink-0">{post.category}</span>
                <div className="flex-1">
                  <h3 className="text-base font-medium text-text-primary group-hover:text-accent transition-colors duration-200">{post.title}</h3>
                  <p className="text-sm text-text-secondary mt-0.5">{post.excerpt}</p>
                </div>
                <svg className="w-4 h-4 text-text-tertiary group-hover:text-accent shrink-0 opacity-0 group-hover:opacity-100 transition-all duration-200 transform group-hover:translate-x-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5 21 12m0 0-7.5 7.5M21 12H3" />
                </svg>
              </Link>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
