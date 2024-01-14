import { ReactNode, useEffect } from "react";
import JSCookie from 'js-cookie';
import Navbar from "../Navbar"
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../store";
import { refreshAction } from "../../actions/session";
import { refresh } from "../../services/auth";
import { useNavigate } from "react-router-dom";


interface IProps {
  children: ReactNode
}

const BaseLayout: React.FC<IProps> = ({ children }) => {
  const authenticated = useSelector((state: RootState) => state?.session?.authenticated);
  const dispatch = useDispatch();
  const navigate = useNavigate()

  useEffect(() => {
    const refreshToken = JSCookie.get('refresh');

    if (!authenticated && refreshToken) {
      refresh(refreshToken)
        .then((resp) => {
          const { refreshToken, accessToken } = resp.data;

          dispatch(refreshAction(accessToken, refreshToken));
        })
        .catch(e => console.log(e));
    }
  }, []);

  useEffect(() => {
    if(authenticated) {
      navigate('/');
    }

  }, [authenticated])

  return (
    <div className="flex flex-col items-center" style={{ height: '100%'}}>
      <Navbar />
      {children}
    </div>
  )
}

export default BaseLayout;