import {
  IonApp,
  IonIcon,
  IonLabel,
  IonRouterOutlet,
  IonTabBar,
  IonTabButton,
  IonTabs,
  setupIonicReact
} from '@ionic/react';
import { IonReactRouter } from '@ionic/react-router';
import { addCircleOutline, chatbubbleEllipsesOutline, homeOutline, personOutline, planetOutline } from 'ionicons/icons';
import Tab3 from './pages/Tab3';

/* Core CSS required for Ionic components to work properly */
import '@ionic/react/css/core.css';

/* Basic CSS for apps built with Ionic */
import '@ionic/react/css/normalize.css';
import '@ionic/react/css/structure.css';
import '@ionic/react/css/typography.css';

/* Optional CSS utils that can be commented out */
import '@ionic/react/css/padding.css';
import '@ionic/react/css/float-elements.css';
import '@ionic/react/css/text-alignment.css';
import '@ionic/react/css/text-transformation.css';
import '@ionic/react/css/flex-utils.css';
import '@ionic/react/css/display.css';

/* Theme variables */
import './theme/variables.css';

import Homepage from './pages/Homepage';
import Login from './pages/Login';
import SignUp from './pages/SignUp';
import Profile from './pages/Profile';
import { useState, useEffect } from 'react';
import { Route } from 'react-router';
import UserSettings from './pages/UserSettings';
import { useSelector } from 'react-redux';
import { RootState } from './store';
import Routes from './Routes';

setupIonicReact();

const App: React.FC = () => {

  const token = useSelector((state: RootState) => state.auth.token);
  const isLogin = useSelector((state: RootState) => state.auth.loggedIn) || false;

  const [user, setUserInfo] = useState({
    id: 0,
    username: "dummy",
    profilepic: './img/tonystarkicon.png',
    description: "testing"
  });

  useEffect(() => {
    async function userInfo() {
      const res = await fetch(`${process.env.REACT_APP_BACKEND_URL}/userInfo`,{
        headers: {
          Authorization: `Bearer ${token}`
        }
      })
      const userRecord = await res.json()
      setUserInfo(userRecord)
    }

    userInfo();
  }, [token])


  return (
    <IonApp>
      <IonReactRouter>
        <Routes />
      </IonReactRouter>
    </IonApp>
  )
};

export default App;
