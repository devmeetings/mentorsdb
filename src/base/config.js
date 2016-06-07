const config = () => {
  const firebaseConfig = {
    apiKey: 'AIzaSyBOwz5If-w3eKMIM5dLDS5FfAwihhqSaM0',
    authDomain: 'mentorsdb.firebaseapp.com',
    databaseURL: 'https://mentorsdb.firebaseio.com',
    storageBucket: 'mentorsdb.appspot.com'
  };
  firebase.initializeApp(firebaseConfig);
  const provider = new firebase.auth.GoogleAuthProvider();
  firebase.auth().signInWithEmailAndPassword('mentors@devmeetings.org', 'im_a_mentor_hunter').then(() => {
    console.log('signed in');
  }).catch(() => {
    console.log('a problem occured with signing in');
  });
};

export default config;
