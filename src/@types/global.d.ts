import 'react';

// Augment React module to add `fetchpriority` to ImgHTMLAttributes
declare module 'react' {
  interface ImgHTMLAttributes<T> extends HTMLAttributes<T> {
    fetchpriority?: 'high' | 'low' | 'auto';
  }
}

// Module declarations for external libraries
declare module 'lucide-react' {
  import { FC, SVGProps } from 'react';
  export const Menu: FC<SVGProps<SVGSVGElement>>;
  export const X: FC<SVGProps<SVGSVGElement>>;
  export const Code2: FC<SVGProps<SVGSVGElement>>;
  export const BookOpen: FC<SVGProps<SVGSVGElement>>;
  export const Briefcase: FC<SVGProps<SVGSVGElement>>;
  export const GraduationCap: FC<SVGProps<SVGSVGElement>>;
  export const Mail: FC<SVGProps<SVGSVGElement>>;
  export const Home: FC<SVGProps<SVGSVGElement>>;
  export const FileText: FC<SVGProps<SVGSVGElement>>;
  export const Brain: FC<SVGProps<SVGSVGElement>>;
  export const ChevronUp: FC<SVGProps<SVGSVGElement>>;
}

declare module 'react-router-hash-link' {
  import { ForwardRefExoticComponent, RefAttributes } from 'react';
  export const HashLink: ForwardRefExoticComponent<
    {
      to: string;
      scroll?: (element: HTMLElement) => void;
      className?: string;
      onClick?: () => void;
      children?: React.ReactNode;
    } & RefAttributes<HTMLAnchorElement>
  >;
}

// Global JSX and Window type declarations
declare global {
  namespace JSX {
    interface IntrinsicElements {
      // Allow any HTML elements with any attributes
      [elemName: string]: any;
    }
  }

  interface Window {
    gtag: (command: string, action: string, params: Record<string, unknown>) => void;
  }
}

export {};

