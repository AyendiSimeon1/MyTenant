interface DiscussionCardProps {
    author: string;
    content: string;
    likes: string;
    replies: string;
  }
  
  const DiscussionCard: React.FC<DiscussionCardProps> = ({
    author,
    content,
    likes,
    replies,
  }) => {
    return (
      <div className="bg-white p-6 rounded-lg shadow-lg">
        <h3 className="text-lg font-bold">{author}</h3>
        <p>{content}</p>
        <p>Likes: {likes}, Replies: {replies}</p>
      </div>
    );
  };
  
  export default DiscussionCard;
  