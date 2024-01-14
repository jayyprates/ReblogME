// @ts-nocheck
import { useEffect, useState } from 'react'
import Post from '../components/Post'
import { useDispatch, useSelector } from 'react-redux'
import { RootState } from '../store'
import { createPost, getPost, getPosts } from '../services/posts'
import { getPostsAction, newPostCreated } from '../actions/home'
import { useForm } from 'react-hook-form'

const HomePage: React.FC = () => {
  const dispatch = useDispatch()
  const { register, handleSubmit } = useForm();
  const posts = useSelector((state: RootState) => state.home?.posts);
  const offset = useSelector((state: RootState) => state.home?.offset);
  const limit = useSelector((state: RootState) => state.home?.limit); 
  const [loading, setLoading] = useState(false);
  const [noMorePosts, setNoMorePosts] = useState(false);
  const authenticated = useSelector((state: RootState) => state.session?.authenticated)

  useEffect(() => {
    if (!posts?.length) {
      handleLoadMorePosts()
    }
  }, [])

  const handleLoadMorePosts = () => {
    setLoading(true)
    getPosts(offset, limit)
        .then((resp) => {
          if(resp.data.length == 0) {
            setNoMorePosts(true);
            return;
          }
          dispatch(getPostsAction(resp.data));
        })
        .catch((e) => console.log(e))
        .finally(() => setLoading(false));
  }

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
    <div className='mt-12 h-100' style={{ width: 550 }}>
      <h1 className='text-xl font-bold'>Have something on mind?</h1>
      <p className='text-md mb-4'>Send a message to the world</p>
      <form className='mb-8 w-full flex flex-col' onSubmit={handleSubmit(onNewPost)}>
        <textarea
          className='border-2 w-full'
          rows={4} 
          {...register('content', { required: true })}
          disabled={loading || !authenticated}
        >
        </textarea>
        <button 
          className='bg-blue-500 px-4 py-2 w-full rounded-lg ml-auto mt-2 disabled:bg-gray-400'
          disabled={loading || !authenticated}
        >
          {authenticated ? "Post!" : "Create an account to contribute"}
        </button>
      </form>
      <h1 className='text-xl font-bold'>Last posts created</h1>
      <p className='text-md mb-4'>Give a quick look at what people are posting ✍️</p>
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
      {noMorePosts && <p className='text-center text-gray-500 mb-4'>No more posts to fetch =(</p>}
      <button
        className='w-full bg-blue-500 hover:bg-blue-700 px-4 py-2 rounded-lg mb-4 disabled:bg-gray-400'
        onClick={handleLoadMorePosts}
        disabled={loading || noMorePosts}
      >
        Load more posts
      </button>
    </div>
  )
}

export default HomePage
