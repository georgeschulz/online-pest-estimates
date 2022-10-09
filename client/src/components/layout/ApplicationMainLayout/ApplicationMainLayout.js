import Nav from "../Nav/nav";

function ApplicationMainLayout({header, children}) {
    return (
        <div className="min-h-screen flex flex-wrap content-between">
            <div className="w-full">
                <Nav />
                <main className="px-16 py-8">
                    <h1 className="text-5xl mb-4 ">{header}</h1>
                    {children}
                </main>
            </div>
            <div className="w-full">
                <footer className="w-full bg-pink h-14"></footer>
            </div>
        </div>
    )
}

export default ApplicationMainLayout;