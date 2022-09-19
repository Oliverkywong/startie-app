import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import * as serviceWorkerRegistration from './serviceWorkerRegistration';
import reportWebVitals from './reportWebVitals';
import { Provider } from 'react-redux';
import { store } from './store';


import OneSignal from 'onesignal-cordova-plugin';

// import { createRoot } from 'react-dom/client';
// const container = document.getElementById('app');
// const root = createRoot(container!);

ReactDOM.render(
  <React.StrictMode>
    <Provider store={store}>
      <App />
    </Provider>
  </React.StrictMode>,
  document.getElementById('root')
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://cra.link/PWA
serviceWorkerRegistration.unregister();

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();

OneSignalInit();


// Call this function when your app starts
function OneSignalInit(): void {
  // Uncomment to set OneSignal device logging to VERBOSE  
  // OneSignal.setLogLevel(6, 0);

  // NOTE: Update the setAppId value below with your OneSignal AppId.
  OneSignal.setAppId("44c4071b-601c-4944-bced-46e0d17fa722");
  OneSignal.setNotificationOpenedHandler(function(jsonData) {
      console.log('notificationOpenedCallback: ' + JSON.stringify(jsonData));
  });

  // Prompts the user for notification permissions.
  //    * Since this shows a generic native prompt, we recommend instead using an In-App Message to prompt for notification permission (See step 7) to better communicate to your users what notifications they will get.
  OneSignal.promptForPushNotificationsWithUserResponse(function(accepted) {
      console.log("User accepted notifications: " + accepted);
  });
}