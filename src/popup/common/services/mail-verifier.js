import angular from 'angular';
import {
  removeDiacritics,
} from '../../../common/helpers';
import Email from '../../../content-scripts/models/email.model';

const mailVerifierService = function mailVerifierService($rootScope, profileService) {
  'ngInject';

  var _this;
  var searchEmailPort = chrome.runtime.connect({name: "searchEmail"});

  function MailVerifier() {
    this.queue = [];
    this.profile = profileService.profile.current;
  }

  MailVerifier.prototype.addEmail = function(email) {
    _this.queue.push(removeDiacritics(email));
  };

  MailVerifier.prototype.searchEmail = function() {
    var names = _this.profile.name.split(' ').reduce(function permute(res, item, key, arr) {
      return res.concat(arr.length > 1 && arr.slice(0, key).concat(arr.slice(key + 1))
        .reduce(permute, [])
        .map(function(perm) {
          return [item].concat(perm);
        }) || item
      );
    }, []);
    names.forEach(function(item) {
      _this.addEmail(item.join('').toLowerCase() + '@gmail.com');
    });
    names.forEach(function(item) {
      _this.addEmail(item.join('.').toLowerCase() + '@gmail.com');
    });
    names.forEach(function(item) {
      var name = item[0][0] + item.slice(1).join('');
      _this.addEmail(name.toLowerCase() + '@gmail.com');
    });
    names.forEach(function(item) {
      var name = item[0][0] + '.' + item.slice(1).join('.');
      _this.addEmail(name.toLowerCase() + '@gmail.com');
    });
    names.forEach(function(item) {
      var name = item.slice(1).join('') + item[0][0];
      _this.addEmail(name.toLowerCase() + '@gmail.com');
    });
    names.forEach(function(item) {
      var name =  item.slice(1).join('.') + '.' + item[0][0];
      _this.addEmail(name.toLowerCase() + '@gmail.com');
    });
    if(_this.profile.github) {
      _this.profile.github.forEach(function(github) {
        _this.addEmail(github.username + '@gmail.com');
      });
    }
    _this.processEmailQueue();
  };

  MailVerifier.prototype.checkEmail = function(email) {
    _this.addEmail(email);
    _this.processEmailQueue();
  };

  MailVerifier.prototype.processEmailQueue = function() {
    if(_this.queue.length > 0) {
      searchEmailPort.postMessage({
        email: _this.queue.shift()
      });
    }
    $rootScope.$apply();
  };

  searchEmailPort.onMessage.addListener(function(response) {
    var result = JSON.parse(response);
    var confirmed = result.found && result.profile === _this.profile.linkedin.id;
    if(_this.profile.email.filter(function(email) {
      var found = email.address === result.email;
      if(found) {
        email.confirmed = confirmed;
      }
      return found;
    }).length === 0 && confirmed) {
      _this.profile.email.push(new Email({
        address: result.email,
        source: 'search',
        confirmed: true
      }));
    }
    if(confirmed) {
      _this.queue.length = 0;
      $rootScope.$apply();
    } else {
      _this.processEmailQueue();
    }
  });

  _this = new MailVerifier;
  return _this;
};

export default mailVerifierService;
