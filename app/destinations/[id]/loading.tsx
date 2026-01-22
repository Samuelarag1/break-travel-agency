export default function DestinationLoading() {
  return (
    <div className="container mx-auto px-4 py-12">
      <div className="space-y-8 animate-pulse">
        <div className="h-[60vh] w-full rounded-xl bg-gray-200" />
        <div className="grid gap-12 lg:grid-cols-3">
          <div className="lg:col-span-2 space-y-4">
            <div className="h-8 w-1/3 bg-gray-200 rounded" />
            <div className="h-4 w-full bg-gray-200 rounded" />
            <div className="h-4 w-full bg-gray-200 rounded" />
            <div className="h-4 w-2/3 bg-gray-200 rounded" />
          </div>
          <div className="lg:col-span-1">
            <div className="h-64 w-full bg-gray-200 rounded-xl" />
          </div>
        </div>
      </div>
    </div>
  )
}
