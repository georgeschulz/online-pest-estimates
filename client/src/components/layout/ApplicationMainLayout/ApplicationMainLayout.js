import Nav from "../Nav/nav";
import Loading from "../../loading/loading";

function ApplicationMainLayout({header, children, isDataLoading, currentPage = '', controls = ''}) {
    return (
        <div className="min-h-screen flex flex-wrap content-between">
            <div className="w-full">
                <Nav currentPage={currentPage} />
                <main className="px-16 py-8">
                    <div className="flex justify-between items-center">
                        <h1 className="text-5xl mb-4 ">{header}</h1>
                        <div>
                            {controls}
                        </div>
                    </div>
                    { isDataLoading 
                        ? (<div className="flex w-full items-center" style={{'height': '250px'}}><Loading /></div>)
                        : children
                    }
                </main>
            </div>
            <div className="w-full">
                <footer className="w-full bg-pink h-14"></footer>
            </div>
        </div>
    )
}

export default ApplicationMainLayout;