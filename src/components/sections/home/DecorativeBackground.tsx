export default function DecorativeBackground() {
  return (
    <div className="relative min-h-[120px]" aria-hidden="true">
      <div className="absolute inset-0 opacity-10">
        <div className="absolute top-20 left-10 w-20 h-20 border border-white rounded-full animate-pulse"></div>
        <div className="absolute top-40 right-20 w-16 h-16 bg-white rounded-full animate-bounce delay-1000"></div>
        <div className="absolute bottom-40 left-20 w-12 h-12 bg-blue-400 rounded-full animate-pulse delay-2000"></div>
        <div className="absolute bottom-20 right-40 w-24 h-24 border border-purple-400 rounded-full animate-bounce delay-500"></div>
      </div>
    </div>
  );
}
