import '../libs/firebase';

class StorageService {

  constructor(props) {
    this.firebase = new Firebase('https://mentorsdb.firebaseio.com');
    this.firebase.authWithPassword({
      email    : "mentors@devmeetings.org",
      password : "im_a_mentor_hunter"
    }, function(error, authData) {});
  }

  getProfile(id, callback) {
    this.firebase.child('profiles').child(id).once('value', function(res) {
      const value = res.val();
      if(value) {
        callback(value);
      } else {
        callback(false);
      }
    });
  }

  setProfile(data, callback) {
    this.firebase.child('profiles').child(data.id).set(data, () => {
      this.getProfile(data.id, function(res) {
        callback(res);
      });
    });
  }

}

const storageService = new StorageService;

export default storageService;