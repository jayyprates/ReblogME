// Packages
import { LiaComments } from "react-icons/lia";
import { Link } from "react-router-dom";
import relativeTime from 'dayjs/plugin/relativeTime';
import dayjs from "dayjs";

dayjs.extend(relativeTime)

interface IProps {
  id: number
  userId: number,
  username: string
  content: string
  comments: number,
  createdAt: string
}

const Post: React.FC<IProps> = ({id, userId, username, content, comments,createdAt }) => {
  return (
    <Link to={`/posts/${id}`}>
      <div className="w-100 border-2 p-4 rounded-md bg-white mb-5" style={{ minHeight: 150, width: 550 }}>
        <div className="flex items-center w-full">
          <img
            src={`https://api.dicebear.com/7.x/thumbs/svg?seed=user_id_${userId}`} 
            alt='avatar' 
            width={40} 
            className="rounded-full border-4 hover:cursor-pointer"
          />
          <Link to={`/profile/${username}`}><small className="ml-2 hover:cursor-pointer hover:text-black hover:underline">@{username}</small></Link>
          <small className="ml-auto">Posted {dayjs(createdAt).fromNow()}</small>
        </div>
        <hr className="my-4"/>
        <p className="text-left break-all">
          {content}
        </p>
        <hr className="my-4"/>
        <div className="flex items-center justify-center">
          <div className="flex items-center px-4 py-1 rounded-lg hover:bg-gray-200">
            <LiaComments />
            <p className="ml-2">{comments} comments</p>
          </div>
        </div>
      </div>
    </Link>
  )
}

export default Post;