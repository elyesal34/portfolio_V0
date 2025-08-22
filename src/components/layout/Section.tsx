import { ReactNode } from 'react';

interface SectionProps {
  id: string;
  children: ReactNode;
  className?: string;
}

export default function Section({ id, children, className = '' }: SectionProps) {
  return (
    <section id={id} className={`py-12 ${className}`}>
      <div className="container mx-auto px-4">
        {children}
      </div>
    </section>
  );
}
