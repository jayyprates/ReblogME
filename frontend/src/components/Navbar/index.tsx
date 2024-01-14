import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../store";
import { Link, useNavigate } from "react-router-dom";
import { logoutAction } from "../../actions/session";

const Navbar: React.FC = () => {
  const session = useSelector((state: RootState) => state.session);
  const dispatch = useDispatch()
  const navigate = useNavigate();

  const handleLogout = () => {
    dispatch(logoutAction())
  }

  const handleLogin = () => {
    navigate('/login')
  }

  return (
    <div className="w-full bg-purple-500 flex items-center px-4" style={{ minHeight: 50 }}>
      <Link to='/'><h1 className="text-xl font-bold">reblogME</h1></Link>
      <div className="flex items-center ml-auto">
        {session?.authenticated && (
          <>
            <Link to='/profile'>
              <small className="mr-2 hover:cursor-pointer hover:text-black hover:underline">
                @{session?.username}
              </small>
            </Link>
            
            <img
              src={`https://api.dicebear.com/7.x/thumbs/svg?seed=user_id_${session?.userId}`} 
              alt='avatar' 
              width={30} 
              className="rounded-full border-2 hover:cursor-pointer"
            />

            <small 
              className="ml-2 hover:cursor-pointer bg-purple-400 px-2 py-1 rounded-lg hover:text-black hover:underline"
              onClick={handleLogout}
            >
              Exit session
            </small>
          </>
        )}
        {!session?.authenticated && (
          <small 
            className="ml-2 hover:cursor-pointer bg-purple-400 px-2 py-1 rounded-lg hover:text-black hover:underline"
            onClick={handleLogin}
          >
            Log in
          </small>
        )}
      </div>
    </div>
  )
}

export default Navbar;