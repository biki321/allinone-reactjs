import firebase from "firebase/app";
import "firebase/analytics";
import "firebase/messaging";
import axios from "axios";
import { apiurl } from "./apiurl";

var firebaseConfig = {
  apiKey: "AIzaSyDDi6t_zCvkGKeh90u0cvxVm7hml8K6xbs",
  authDomain: "allinone-1e128.firebaseapp.com",
  projectId: "allinone-1e128",
  storageBucket: "allinone-1e128.appspot.com",
  messagingSenderId: "370418206823",
  appId: "1:370418206823:web:cf75fc5b65c8a9f5d12cc2",
  measurementId: "G-HDBSJ90RVF",
};
// Initialize Firebase
firebase.initializeApp(firebaseConfig);
firebase.analytics();

const messaging = firebase.messaging();
export const getToken = async () => {
  const authtoken = localStorage.getItem("alino");
  if (!authtoken) {
    return;
  }
  return messaging
    .getToken({
      vapidKey:
        "BChOi7EhJZ51GU_IbsyE15PfcQ84PUN87kSAOmx0IoDLaAy1d1nuVvhLTSyyd0GLfZk4QRY8Hp0KAgjjFHAStug",
    })
    .then(async (currentToken) => {
      if (currentToken) {
        try {
          await sendFCMTokenToServer(currentToken, authtoken);
        } catch (error) {}
        // Track the token -> client mapping, by sending to backend server
        // show on the UI that permission is secured
      } else {
        // shows on the UI that permission is required
      }
    })
    .catch((err) => {
      // catch error while creating client token
    });
};

const sendFCMTokenToServer = async (
  currentToken: string,
  authtoken: string
) => {
  try {
    await axios({
      method: "post",
      url: `${apiurl}/api/subscribe`,
      data: {
        fcmtoken: currentToken,
      },
      headers: {
        "auth-token": authtoken,
      },
    });
  } catch (error) {
    throw error;
  }
};

// export const onMessageListener = () =>
//   new Promise((resolve) => {
//     messaging.onMessage((payload) => {
//       resolve(payload);
//     });
//   });

messaging.onMessage((payload) => {});

// getToken();
