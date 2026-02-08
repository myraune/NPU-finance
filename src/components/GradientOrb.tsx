export default function GradientOrb() {
  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none" aria-hidden="true">
      {/* Gold orb */}
      <div
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] md:w-[800px] md:h-[800px] rounded-full opacity-[0.12] blur-[120px]"
        style={{
          background: "radial-gradient(circle, rgba(212,168,67,0.4) 0%, rgba(212,168,67,0.1) 40%, transparent 70%)",
          animation: "orbFloat 15s ease-in-out infinite",
        }}
      />
      {/* Cool blue orb */}
      <div
        className="absolute top-1/3 right-1/4 w-[400px] h-[400px] md:w-[500px] md:h-[500px] rounded-full opacity-[0.08] blur-[100px]"
        style={{
          background: "radial-gradient(circle, rgba(96,165,250,0.35) 0%, transparent 70%)",
          animation: "orbFloat 20s ease-in-out infinite reverse",
        }}
      />
      {/* Deep indigo orb */}
      <div
        className="absolute bottom-1/4 left-1/3 w-[350px] h-[350px] md:w-[450px] md:h-[450px] rounded-full opacity-[0.15] blur-[100px]"
        style={{
          background: "radial-gradient(circle, rgba(99,102,241,0.3) 0%, transparent 70%)",
          animation: "orbFloat 18s ease-in-out 3s infinite",
        }}
      />
      {/* Warm accent orb (top-right) */}
      <div
        className="absolute top-0 right-0 w-[300px] h-[300px] md:w-[400px] md:h-[400px] rounded-full opacity-[0.06] blur-[80px]"
        style={{
          background: "radial-gradient(circle, rgba(212,168,67,0.3) 0%, transparent 70%)",
          animation: "orbFloat 22s ease-in-out 5s infinite",
        }}
      />
    </div>
  );
}
