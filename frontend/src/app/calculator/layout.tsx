export default async function PublicLayout({ children }: { children: React.ReactNode }) {
    return (
        <>
            <header className="sticky top-0 z-20 flex h-16 items-center justify-between border-b bg-background/80 px-4 backdrop-blur-sm lg:px-6">
            </header>
            <main className="flex-1 p-4 md:p-6 lg:p-8">
                {children}
            </main>
            <footer className="border-t p-4 text-center text-sm text-muted-foreground md:px-6">
                © {new Date().getFullYear()} LendFlow. All rights reserved.
            </footer>
        </>
    )
}
