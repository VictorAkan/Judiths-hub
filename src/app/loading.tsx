export default function Loading() {
  return (
    <div className="flex items-center justify-center min-h-[60vh]">
      <div className="flex flex-col items-center gap-3">
        <div className="h-6 w-6 border-2 border-charcoal/20 border-t-charcoal rounded-full animate-spin" />
        <p className="text-xs text-stone/60">Loading...</p>
      </div>
    </div>
  );
}
