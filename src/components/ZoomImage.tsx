import { useState } from 'react';
import { Dialog, DialogContent, DialogTitle } from '@project/components/ui/dialog';
import { ZoomIn, ZoomOut, X } from 'lucide-react';

export default function ZoomImage({ src, alt = '', className = '' }: { src: string; alt?: string; className?: string }) {
  const [open, setOpen] = useState(false);
  const [zoom, setZoom] = useState(1);
  const close = () => { setOpen(false); setZoom(1); };
  return (
    <>
      <img src={src} alt={alt} loading="lazy" onClick={() => setOpen(true)} className={`cursor-zoom-in ${className}`} />
      <Dialog open={open} onOpenChange={(o) => !o && close()}>
        <DialogContent className="h-[92vh] max-w-[96vw] border-0 bg-black/85 p-0 backdrop-blur-xl [&>button]:hidden">
          <DialogTitle className="sr-only">{alt || 'Photo'}</DialogTitle>
          <div className="h-full w-full overflow-auto" style={{ touchAction: 'pinch-zoom pan-x pan-y' }}>
            <div className="flex min-h-full min-w-full items-center justify-center" style={{ width: `${zoom * 100}%` }}>
              <img src={src} alt={alt} onClick={() => setZoom(zoom > 1 ? 1 : 2.5)} className={`max-w-none ${zoom > 1 ? 'cursor-zoom-out' : 'max-h-[92vh] cursor-zoom-in object-contain'}`} style={{ width: '100%' }} />
            </div>
          </div>
          <div className="absolute bottom-4 left-1/2 flex -translate-x-1/2 gap-2 rounded-full bg-white/80 p-1.5 shadow-lg backdrop-blur">
            <button aria-label="Zoom out" onClick={() => setZoom(Math.max(1, zoom - 0.5))} className="rounded-full p-2 hover:bg-white"><ZoomOut className="h-5 w-5" /></button>
            <span className="flex items-center px-1 text-sm font-semibold">{Math.round(zoom * 100)}%</span>
            <button aria-label="Zoom in" onClick={() => setZoom(Math.min(4, zoom + 0.5))} className="rounded-full p-2 hover:bg-white"><ZoomIn className="h-5 w-5" /></button>
            <button aria-label="Close" onClick={close} className="rounded-full p-2 hover:bg-white"><X className="h-5 w-5" /></button>
          </div>
        </DialogContent>
      </Dialog>
    </>
  );
}
