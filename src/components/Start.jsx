function Start() {
  return (
    <div className="flex flex-col justify-center items-center">
      <div className="flex flex-col justify-center items-center gap-[7px] text-lavender-font mb-7.5">
        <h1 className="text-5xl font-karla font-bold">Quizzical</h1>
        <span className="text-base font-inter font-normal">
          Unlock your knowledge.
        </span>
      </div>
      <button className="min-w-48 min-h-13 bg-lavender-button-start rounded-2xl text-white-custom text-base font-inter font-medium hover:cursor-pointer active:scale-90 transform duration-200 ease-in-out">
        Start Quiz
      </button>
    </div>
  );
}

export default Start;
