export function BrandMark({ className = "mark" }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 26 26" aria-hidden="true">
      <rect x="0" y="0" width="26" height="26" rx="6" fill="#EFB13B" />
      <text x="13" y="18.5" textAnchor="middle" fontFamily="Bricolage Grotesque, Georgia, serif" fontSize="12.5" fontWeight="700" fill="#101B2B">
        DH
      </text>
    </svg>
  );
}
