function CodeBlock({children}) {
    return (
        <div style={{'backgroundColor': '#373333', 'color': 'white'}} className="px-12 py-8 mx-8 my-8 leading-loose font-code">
            {children}
        </div>
    )
}

export default CodeBlock;