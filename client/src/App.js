import {BrowserRouter as Router, Route, Switch} from 'react-router-dom'
import { useEffect } from 'react'
import Login from './pages/Login'
import Auth from './view/Auth'
import PageRender from './customRouter/PageRender'
import Home from './pages/Home'
import {refreshToken} from './redux/actions/authAction'
import Alert from './components/notify/Alert'
import { useDispatch, useSelector } from 'react-redux'
import Header from './components/header/Header'
import Anime from './pages/Anime'
import Forum from './pages/Forum'
import SearchPopUp from './components/header/SearchPopUp'
import {useQuery} from "@apollo/client";
import {GET_GEN_3} from "./graphql/Query";
import DisplayQplManga from "./graphql/DisplayQplManga";
import Notfound from "./components/notfound/_error";
import {io} from 'socket.io-client'
import {GLOBALTYPES} from "./redux/actions/globalTypes";
import SocketClient from "./SocketClient";
import {getPost} from "./redux/actions/postAction";
import {getPostForum} from './redux/actions/forumAction'
import {getNotify} from "./redux/actions/notifyAction";
import Message from '../src/components/message/Message'
import ForgotPassword from "./pages/ForgotPassword";
import {getSuggestion} from "./redux/actions/suggestionAction";
import ForumReal from "./pages/ForumReal";
function App() {
  const {auth, status, searchFilter} = useSelector(state => state)
  const dispatch = useDispatch()
    const { loading, error, data } = useQuery(GET_GEN_3);

    useEffect(() => {
        dispatch(refreshToken())
        const socket  = io()
         dispatch({type: GLOBALTYPES.SOCKET, payload: socket})
        return () => socket.close()
    }, [dispatch])

    useEffect(() => {
        if(auth.token)  {
            dispatch(getNotify(auth.token))
            dispatch(getSuggestion(auth.token))
        }
    }, [dispatch, auth.token])


  return (
    <Router>
      <Alert />
      {searchFilter && <SearchPopUp />}
        {/*<DisplayQpl data={data}/>*/}
      <input type="checkbox" id='theme' className='d-none'/>
          <div className="App">
              {auth.token && <SocketClient />}
            {auth.token && <Header /> }
            <Switch>
              <Route exact path='/' component={auth.token ? Home : Login} />
              <Route
                            exact
                            path='/register'
                            render={props => <Auth {...props} authRoute='register' />}
                        />
              <Route exact path="/anime" component={Anime} />
              <Route exact path="/manga" component={DisplayQplManga} />
                <Route exact path={'/forum_real'} component={ForumReal} />
              <Route exact path="/forum" component={Forum} />
                <Route exact path="/message" component={Message} />
                <Route exact path='/:page/:id' component={PageRender} />
              <Route exact path='*' component={Notfound} />
            </Switch>
          </div>
    </Router>  
  );
}

export default App;
