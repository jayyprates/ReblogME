import { useEffect, useState } from 'react'
import Post from '../components/Post'
import { useDispatch, useSelector } from 'react-redux'
import { RootState } from '../store'
import { createPost, getPost, getProfilePost } from '../services/posts'
import { clearProfileAction, getPostsAction, newPostCreated } from '../actions/profile'
import { useForm } from 'react-hook-form'
import { useParams } from 'react-router-dom'

const ProfilePage: React.FC = () => {
  const dispatch = useDispatch()
  const { register, handleSubmit } = useForm();
  const { username } = useParams()
  const sessionUsername = useSelector((state: RootState) => state.session?.username);
  const posts = useSelector((state: RootState) => state.profile?.posts);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setLoading(true);

    const usernameToFetch = username || sessionUsername;

    if (!usernameToFetch) {
      return
    }

    getProfilePost(usernameToFetch)
      .then(resp => {
        dispatch(getPostsAction(resp.data));
      })
      .catch(console.log)
      .finally(() => setLoading(false));

    return () => {
      dispatch(clearProfileAction())
    }
  }, []);

  const onNewPost = (data: any) => {
    const { content } = data;

    setLoading(true)

    createPost(content)
      .then((resp) => getPost(resp.data.id))
      .then((resp) => {
        dispatch(newPostCreated(resp.data));
      })
      .catch(e => console.log(e))
      .finally(() => setLoading(false))
  }

  return (
    <div className='mt-12 h-100' style={{ minWidth: 550 }}>
      <h1 className='text-2xl font-bold text-center mb-8'>{username ? '@' + username : '@' + sessionUsername}</h1>
      {(!username || username == sessionUsername) && (
        <form className='mb-8 w-full flex flex-col' onSubmit={handleSubmit(onNewPost)}>
          <textarea className='border-2 w-full' rows={4} {...register('content', { required: true })} disabled={loading}></textarea>
          <button
            className='bg-blue-500 px-4 py-2 w-full rounded-lg ml-auto mt-2 disabled:bg-gray-400'
            disabled={loading}
          >
            Post!
          </button>
        </form>
      )}
      <h1 className='text-xl font-bold mb-4'>Last activity</h1>
      {posts?.map(post => (
        <Post
          id={post.id}
          userId={post.blogger.id}
          username={post.blogger.username}
          content={post.content}
          comments={post.comments.length}
          createdAt={post.created_at}
        />
      ))}
    </div>
  )
}

export default ProfilePage
