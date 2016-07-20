class StorageService {

  getProfile(id, callback) {
    const xhr = new XMLHttpRequest();
    xhr.open('GET', `https://mentorsdb.yado.pl/profile?linkedin=${id}`, true);
    xhr.onreadystatechange = () => {
      if (xhr.readyState === 4) {
        if (xhr.status !== 200) {
          console.error('XHR error');
          callback(false);
        } else {
          const res = JSON.parse(xhr.responseText);
          callback(res.linkedin);
        }
      }
    };
    xhr.send();
  }

  setProfile(data, callback) {
    /* this.firebase.child('profiles').child(data.id).set(data, () => {
      this.getProfile(data.id, function(res) {
        callback(res);
      });
    }); */
  }

}

const storageService = new StorageService;

export default storageService;