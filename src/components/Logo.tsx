import Image from "next/image";

export default function Logo({ size = 32, className = "" }: { size?: number; className?: string }) {
  return (
    <Image
      src="/images/logo.png"
      alt="NPFIS Logo"
      width={size}
      height={size}
      className={`object-contain ${className}`}
      priority
    />
  );
}
