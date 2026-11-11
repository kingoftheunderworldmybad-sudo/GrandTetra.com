export default function LogoMark({ className = 'h-8 w-8' }: { className?: string }) {
  return (
    <span className={`relative inline-block shrink-0 overflow-hidden ${className}`}>
      <img
        src="https://images.fillout.com/912381/apgeydyfuj/generated-images/dBwCUdeGPhRGKdWsSwbMwK/img_Ni21xFYuR2pMc3kf.jpg"
        alt="Grand Tetra"
        className="absolute max-w-none mix-blend-multiply"
        style={{ width: '197%', left: '-3.8%', top: '-1%' }}
      />
    </span>
  );
}
