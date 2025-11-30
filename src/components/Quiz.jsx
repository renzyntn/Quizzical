function Quiz(props) {

    const data = props.apiData.map((data, index) => {

        const answerChoices = data.shuffledAnswers
        
        return (
            <div key={index} className="w-full flex flex-col justify-start items-start gap-[12px]">
                <h3 className="text-lavender-font text-[18px] font-karla font-bold break-words">
                    {data.question}
                </h3>
                <div className="w-full flex flex-wrap justify-start items-center gap-[12px]">
                    {answerChoices.map((choice) => (
                        <button
                            key={choice}
                            onClick={() => props.getSelectedAnswers(index, choice)}
                            disabled={props.answerButton}
                            className={`border-1 border-lavender-button-start rounded-[8px] py-[4px] px-[8px]
                                text-[12px] font-inter font-medium text-lavender-font hover:cursor-pointer
                                ${!props.answerButton && "active:scale-90 transform duration-200 ease-in-out"} 
                                ${props.selectedAnswers[index] === choice ? "bg-lavender-button" : null}`}>
                            {choice}
                        </button>
                    ))}
                </div>
                <hr className="w-full border-t-[2px] border-lavender-button mt-[14px]"/>
            </div>
        )
    })

    return(
        <section className="w-auto h-auto flex flex-col justify-center items-center px-[32px] gap-[12px]">
            {data}
            <footer className="w-full flex py-[10px] justify-center items-center gap-[24px]">
                {props.displayScore && 
                    <span className="font-inter font-bold text-[14px] text-lavender-font">
                        You scored {props.score}/5 correct answers
                    </span>}
                <button onClick={props.checkAnswers} disabled={props.submitButton} className="w-[120px] h-[40px] flex justify-center items-center rounded-[10px] 
                                bg-lavender p-[10px] active:scale-90 transform duration-250 ease-in-out hover:cursor-pointer">
                    <span className="text-white-custom text-[12px] font-inter font-semibold">
                        {props.displayScore ? "Play Again" : "Check Answers"}
                    </span>
                </button>
            </footer>
        </section>
    )
}

export default Quiz