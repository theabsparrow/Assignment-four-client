import { ReactionType } from "./ReactionIcon";

const ReactionButton = ({
  reaction,
  active,
  onClick,
}: {
  reaction: ReactionType;
  active: boolean;
  onClick: () => void;
}) => {
  const colors = {
    like: "text-blue-600",
    love: "text-red-600",
    dislike: "text-gray-600",
  };

  const icons = {
    like: "👍",
    love: "❤️",
    dislike: "👎",
  };
  return (
    <button
      onClick={onClick}
      aria-label={`React ${reaction}`}
      className={`text-2xl cursor-pointer hover:scale-110 transform transition ${
        active ? colors[reaction!] : "text-gray-400"
      }`}
    >
      {icons[reaction!]}
    </button>
  );
};

export default ReactionButton;
