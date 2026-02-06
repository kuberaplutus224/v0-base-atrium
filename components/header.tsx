export default function Header() {
  return (
    <header className="border-b border-border bg-card">
      <div className="mx-auto max-w-6xl px-4 py-8 md:px-8">
        <div className="flex items-center justify-between">
          <h1 className="font-serif text-4xl font-semibold text-foreground">
            SellerGPT
          </h1>
          <div className="flex items-center gap-4">
            <button className="text-sm text-muted-foreground transition-colors hover:text-foreground">
              Settings
            </button>
          </div>
        </div>
      </div>
    </header>
  )
}
