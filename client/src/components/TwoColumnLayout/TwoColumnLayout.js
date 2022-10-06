function TwoColumnLayout({background, children}) {
    return (
        <div id="layout-container w-full h-screen">
            {background}
            <div className="h-full w-1/2 bg-white absolute">
                {children}
            </div>
        </div>
    )
}

export default TwoColumnLayout;