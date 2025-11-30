function Quiz() {
  return (
    <section className="w-auto h-auto flex flex-col justify-center items-center px-8 space-y-3">
      <div className="w-full flex flex-col justify-start items-start space-y-3">
        <h3 className="text-lavender-font text-lg font-karla font-bold break-words">
          Which best selling toy of 1983 caused hysteria, resulting in riots
          breaking in stores?
        </h3>
        <div className="max-w-full flex flex-wrap justify-start items-center gap-3">
          <button className="border-1 border-lavender-button-start rounded-lg py-1 px-2 text-xs font-inter font-medium text-lavender-font hover:cursor-pointer active:scale-90 transform duration-200 ease-in-out">
            Cabbage Patch Kids
          </button>
          <button className="border-1 border-lavender-button-start rounded-lg py-1 px-2 text-xs font-inter font-medium text-lavender-font hover:cursor-pointer active:scale-90 transform duration-200 ease-in-out">
            Transformers
          </button>
          <button className="border-1 border-lavender-button-start rounded-lg py-1 px-2 text-xs font-inter font-medium text-lavender-font hover:cursor-pointer active:scale-90 transform duration-200 ease-in-out">
            Care Bears
          </button>
          <button className="border-1 border-lavender-button-start rounded-lg py-1 px-2 text-xs font-inter font-medium text-lavender-font hover:cursor-pointer active:scale-90 transform duration-200 ease-in-out">
            Rubik's Cube
          </button>
        </div>
        <hr className="w-full border-b-2 border-lavender-button mt-3.5" />
      </div>
      <footer className="w-full flex py-2.5 justify-center items-center gap-6">
        {/*<span className="font-inter font-bold text-[14px] text-lavender-font">
          You scored 5/5 correct answers
        </span>*/}
        <button className="min-w-30 h-10 flex justify-center items-center rounded-xl bg-lavender p-2.5 active:scale-90 transform duration-250 ease-in-out hover:cursor-pointer">
          <span className="text-white-custom text-xs font-inter font-semibold">
            Check answers
          </span>
        </button>
      </footer>
    </section>
  );
}

export default Quiz;
