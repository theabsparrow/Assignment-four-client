export type ReactionType = "like" | "love" | "dislike" | null;
const ReactionIcon = ({ reaction }: { reaction: ReactionType }) => {
  switch (reaction) {
    case "like":
      return <span className="text-blue-600">&#128077;</span>;
    case "love":
      return <span className="text-red-600">&#10084;&#65039;</span>;
    case "dislike":
      return <span className="text-gray-600">&#128078;</span>;
    default:
      return <span className="text-gray-400">&#128077;</span>;
  }
};

export default ReactionIcon;
