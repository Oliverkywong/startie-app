import React from 'react'
import { IonIcon, IonImg, IonLabel, IonPage, useIonRouter } from '@ionic/react';

import icon from '../img/tonystarkicon.png'
import { bookmarkOutline, documentTextOutline, pencil, peopleOutline, settingsOutline, statsChart } from 'ionicons/icons';

import './css/Profile.css'
import UserInfo from './UserInfo';
import UserStats from './UserStats';
import UserTeams from './UserTeams';
import UserFollows from './UserFollows';
import UserSettings from './UserSettings';

const Profile: React.FC = () => {

    const [info, setInfo] = React.useState(true);
    const [stat, setStat] = React.useState(false);
    const [follow, setFollow] = React.useState(false);
    const [team, setTeam] = React.useState(false);
    const [setting, setSetting] = React.useState(false);

    const router = useIonRouter();

    return (
        <IonPage>
            <div className="profile">
                <IonImg className='profilepic' src={icon} />
                <IonIcon className='proedit' icon={pencil} />
                <IonLabel className="uresname">Tony Stark</IonLabel>

                <div className="profilebar">
                    <div onClick={() => { setInfo(true); setStat(false); setFollow(false); setTeam(false); setSetting(false) }}>
                        <IonIcon icon={documentTextOutline} />
                        <IonLabel>Details</IonLabel>
                    </div>
                    <div onClick={() => { setInfo(false); setStat(true); setFollow(false); setTeam(false); setSetting(false) }}>
                        <IonIcon icon={statsChart} />
                        <IonLabel>Stats</IonLabel>
                    </div>
                    <div onClick={() => { setInfo(false); setStat(false); setFollow(true); setTeam(false); setSetting(false) }}>
                        <IonIcon icon={bookmarkOutline} />
                        <IonLabel>My Follows</IonLabel>
                    </div>
                    <div onClick={() => { setInfo(false); setStat(false); setFollow(false); setTeam(true); setSetting(false) }}>
                        <IonIcon icon={peopleOutline} />
                        <IonLabel>My Teams</IonLabel>
                    </div>
                    <div onClick={() => { router.push("/tab6", "forward", "push"); }}>
                        <IonIcon icon={settingsOutline} />
                        <IonLabel>Settings</IonLabel>
                    </div>
                </div>
                {info && <UserInfo />}
                {stat && <UserStats />}
                {follow && <UserFollows />}
                {team && <UserTeams />}
                {setting && <UserSettings />}
            </div>
        </IonPage>
    );
};

export default Profile;
