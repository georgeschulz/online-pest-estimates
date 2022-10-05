function BenefitBox({headline, benefit, icon}) {
    return (
        <div className='hero-feature-row-item w-1/4 max-w-md'>
            <div className="img-icon-container absolute w-1/4 flex justify-center max-w-md">
                <div className="icon-background bg-primary h-32 w-32 rounded-full flex justify-center items-center">
                    <img src={icon} className="h-16 absolute" />
                </div>
            </div>
            <div className='bg-light feature-item-text mt-16 pt-16 pb-10 px-10 shadow shadow-slate-600'>
                <p className="md:text-2xl font-bold mb-2 mt-4 sm:text-xl xl:text-3xl">{headline}</p>
                <p className="lg:text-lg md:text-md">{benefit}</p>
            </div>
        </div>
    );
}

export default BenefitBox;