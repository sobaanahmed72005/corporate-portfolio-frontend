export default function Loading() {
  return (
    <div className="flex min-h-[60vh] items-center justify-center py-20">
      <div
        className="h-10 w-10 animate-spin rounded-full border-4 border-contentCard-200 border-t-brand-600"
        role="status"
        aria-label="Loading"
      />
    </div>
  );
}
