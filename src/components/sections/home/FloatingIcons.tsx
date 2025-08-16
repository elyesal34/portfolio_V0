import { Code, Database, Smartphone } from 'lucide-react';

export default function FloatingIcons() {
  return (
    <>
      <div className="absolute -top-6 -left-6 bg-blue-500 p-4 rounded-full shadow-lg animate-bounce" role="presentation">
        <Code className="w-6 h-6 md:w-8 md:h-8 text-white" aria-hidden="true" />
      </div>
      <div className="absolute -bottom-6 -right-6 bg-purple-500 p-4 rounded-full shadow-lg animate-bounce delay-1000" role="presentation">
        <Database className="w-6 h-6 md:w-8 md:h-8 text-white" aria-hidden="true" />
      </div>
      <div className="absolute top-1/2 -right-8 bg-green-500 p-4 rounded-full shadow-lg animate-bounce delay-2000" role="presentation">
        <Smartphone className="w-6 h-6 md:w-8 md:h-8 text-white" aria-hidden="true" />
      </div>
    </>
  );
}
