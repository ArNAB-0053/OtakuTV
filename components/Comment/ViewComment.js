'use client'
import useSWR from 'swr';

const fetcher = (url) => fetch(url).then((res) => res.json());

const CommentsList = () => {
  const { data, error } = useSWR('/api/Comment', fetcher, {
    refreshInterval: 1000 // Poll every 1 second
  });

  if (error) return <div>Failed to load comments</div>;
  if (!data) return <div>Loading...</div>;

  return (
    <div>
      {data.comments?.map((comment) => (
        <div key={comment._id} className="bg-gray-100 p-2 mb-2 rounded">
          <p>{comment.comment}</p>
          <h2 className="text-sm text-gray-600">By: {comment.userName}</h2>
        </div>
      ))}
    </div>
  );
};

export default CommentsList;