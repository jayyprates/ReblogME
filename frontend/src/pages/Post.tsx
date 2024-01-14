import { useEffect, useState } from 'react'
import Post from '../components/Post'
import { useDispatch, useSelector } from 'react-redux'
import { RootState } from '../store'
import { createComment, getPost } from '../services/posts'
import { createCommentAction } from '../actions/post'
import { useForm } from 'react-hook-form'
import { useParams } from 'react-router-dom'
import { getPostAction } from '../actions/post'
import Comment from '../components/Comment'

const PostPage: React.FC = () => {
  const { id } = useParams()
  const dispatch = useDispatch()
  const { register, handleSubmit } = useForm();
  const post = useSelector((state: RootState) => state.post?.post);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (!id) {
      return
    }

    setLoading(true);

    getPost(id)
      .then((resp) => dispatch(getPostAction(resp.data)))
      .catch(console.log)
      .finally(() => setLoading(false));
  }, [])

  const handleNewComment = (data: any) => {
    if (!id) {
      return
    }
    
    const { content } = data;

    setLoading(true)

    createComment(id, content)
      .then((resp) => dispatch(createCommentAction(resp.data)))
      .catch(e => console.log(e))
      .finally(() => setLoading(false))
  }

  return (
    <div className='mt-12 h-100'>
      {post && (
        <Post
          id={post.id}
          userId={post.blogger.id}
          username={post.blogger.username}
          content={post.content}
          comments={post.comments.length}
          createdAt={post.created_at}
        />
      )}

      <form className='mb-8 w-full flex flex-col' onSubmit={handleSubmit(handleNewComment)}>
        <textarea className='border-2 w-full' rows={4} {...register('content', { required: true })} disabled={loading}></textarea>
        <button
          className='bg-blue-500 px-4 py-2 w-full rounded-lg ml-auto mt-2 disabled:bg-gray-400'
          disabled={loading}
        >
          Send comment!
        </button>
      </form>

      <div className='bg-white'>
        {post?.comments.map((comment) => (
          <>
            <Comment
              userId={comment.blogger.id}
              username={comment.blogger.username}
              content={comment.content}
              createdAt={comment.created_at}
            />
            <hr/>
          </>
        ))}
      </div>
    </div>
  )
}

export default PostPage
