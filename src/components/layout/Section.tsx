import { ReactNode, Suspense } from 'react';

interface SectionProps {
  id: string;
  children: ReactNode;
  className?: string;
}

export default function Section({ id, children, className = '' }: SectionProps) {
  return (
    <section id={id} className={`min-h-[50vh] py-12 scroll-mt-16 ${className}`}>
      <div className="container mx-auto px-4 h-full">
        <Suspense 
          fallback={
            <div className="h-full flex items-center justify-center">
              <div className="animate-pulse text-gray-500">Chargement...</div>
            </div>
          }
        >
          {children}
        </Suspense>
      </div>
    </section>
  );
}
