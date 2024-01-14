// Packages
import { Link } from "react-router-dom";
import relativeTime from 'dayjs/plugin/relativeTime';
import dayjs from "dayjs";

dayjs.extend(relativeTime)

interface IProps {
  userId: number,
  username: string
  content: string
  createdAt: string
}

const Comment: React.FC<IProps> = ({userId, username, content ,createdAt }) => {
  return (
    <div className="w-100 p-4 rounded-md bg-white" style={{ minWidth: 550 }}>
      <div className="flex items-center w-full">
        <img
          src={`https://api.dicebear.com/7.x/thumbs/svg?seed=user_id_${userId}`} 
          alt='avatar' 
          width={40} 
          className="rounded-full border-4 hover:cursor-pointer"
        />
        <Link to={`/profile/${userId}`}><small className="ml-2 hover:cursor-pointer hover:text-black hover:underline">@{username}</small></Link>
        <small className="ml-auto">Posted {dayjs(createdAt).fromNow()}</small>
      </div>
      <p className="text-left text-xs mt-4">
        {content}
      </p>
    </div>
  )
}

export default Comment;