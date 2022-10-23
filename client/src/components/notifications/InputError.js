function InputError({ isSuccess = false, message, isVisible = false, dismissReducer }) {
    if (isVisible) {
        return (
            <div className={`w-full h-12  flex justify-center items-center text-lg font-roboto mb-4 ${isSuccess ? 'bg-green-200' : 'bg-red-200'}`}>
                <p>{message} <span className="underline text-matte cursor-pointer text-sm" onClick={dismissReducer}>(Dismiss)</span></p>
            </div>
        )
    }
}

export default InputError;