function DividingHeader({ text }) {
    return (
        <div className="line-container flex justify-center w-full my-10">
            <div className="absolute horizontal-line h-1 border-b mb-4 w-7/12 border-lightgray"></div>
            <p className="relative bg-white text-xl bottom-2 w-72 text-center">{text}</p>
        </div>
    )
}

export default DividingHeader;