function UpdateMessage({ isSuccess = false, message, isVisible = false, dismissReducer }) {
    if (isVisible) {
        return (
            <div className={`w-full py-3 flex justify-center items-center text-lg font-roboto mb-4 ${isSuccess ? 'bg-green-200' : 'bg-red-200'}`} style={{'minHeight': '20px'}}>
                <p>{message} <span className="underline text-matte cursor-pointer text-sm" onClick={dismissReducer}>(Dismiss)</span></p>
            </div>
        )
    }
}

export default UpdateMessage;