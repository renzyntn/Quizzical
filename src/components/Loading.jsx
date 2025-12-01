import { ClipLoader } from "react-spinners";

function Loading() {
  return (
    <div className="text-lavender">
      <ClipLoader color={"currentColor"} size={80} speedMultiplier={0.5} />
    </div>
  );
}

export default Loading;
