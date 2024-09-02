import { useState, useEffect } from "react";
import { formatDistanceStrict } from "date-fns";

const CommentTime = ({ createdAt }) => {
  const [timeAgo, setTimeAgo] = useState("");

  useEffect(() => {
    const updateTimeAgo = () => {
      const formattedTime = formatDistanceStrict(new Date(createdAt), new Date(), {
        addSuffix: true,
      });
      setTimeAgo(formattedTime);
    };
    updateTimeAgo();
    const interval = setInterval(updateTimeAgo, 60000);
    return () => clearInterval(interval);
  }, [createdAt]);

  return <p className="text-xs">{timeAgo}</p>;
};

export default CommentTime;
