function StrategyButton({tag = '', name, children, config}) {
    return (
        <div className="shadow-container px-8 py-8 m-8 hover:bg-gray-200 cursor-pointer" style={{'width': '400px'}}>
            {tag != '' ? tag : ''}
            <p className="text-xl font-bold font-poppins mb-2">{name}</p>
            <p>{children}</p>
        </div>
    )
}

export default StrategyButton;