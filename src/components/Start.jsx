function Start(props) {
    return(
        <>
            <div className="flex flex-col justify-center items-center gap-[30px]">
                <div className="flex flex-col justify-center items-center gap-[7px] text-lavender-font">
                    <h1 className="text-[48px] font-karla font-bold">
                        Quizzical
                    </h1>
                    <span className="text-[16px] font-inter font-normal">
                        Unlock your knowledge.
                    </span>
                </div>
                <button onClick={props.startQuiz} className="w-[193px] h-[52px] bg-lavender-button-start flex justify-center items-center rounded-[15px] text-white-custom text-[16px] font-inter font-medium active:scale-90 transform duration-200 ease-in-out hover:cursor-pointer">
                    Start Quiz
                </button>
            </div>
        </>
    )
}

export default Start