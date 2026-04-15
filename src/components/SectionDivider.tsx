const SectionDivider = ({ label }: { label: string }) => {
  return (
    <div className="flex items-center justify-center gap-4 py-4">
      <svg width="20" height="20" viewBox="0 0 40 40" className="text-gold opacity-60">
        <path d="M20 2c-3 6-9 12-9 22a9 9 0 0018 0c0-10-6-16-9-22z" stroke="currentColor" strokeWidth="1.5" fill="none"/>
      </svg>
      <span className="section-label">{label}</span>
      <svg width="20" height="20" viewBox="0 0 40 40" className="text-gold opacity-60">
        <path d="M20 2c-3 6-9 12-9 22a9 9 0 0018 0c0-10-6-16-9-22z" stroke="currentColor" strokeWidth="1.5" fill="none"/>
      </svg>
    </div>
  );
};

export default SectionDivider;
