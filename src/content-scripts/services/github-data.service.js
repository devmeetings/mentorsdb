import Github from '../models/github.model';

const GithubDataService = (function() {

    function getGithub() {
        return new Github({
            username: getUsername(),
            avatar: getAvatar(),
            city: getCity(),
            email: getEmail(),
            url: getUrl(),
            joindate: getJoindate(),
            followers: getFollowers(),
            starred: getStarred(),
            following: getFollowing(),
            contributions: getContributions(),
        });
    }

    function isProfilePage() {
        const body = document.querySelector('body');
        return body.className.split(' ').indexOf('page-profile') >= 0;
    }

    function textContent(node) {
        return node? node.textContent: '';
    }

    function numContent(node) {
        return node? parseInt(node.textContent): 0;
    }

    function attribute(node, name) {
        return node? node.getAttribute(name): '';
    }

    function getUsername() {
        return textContent(document.querySelector('.vcard-username'));
    }

    function getAvatar() {
        var img = document.querySelector('.vcard .avatar');
        var src;
        if(img) {
            src = img.src;
        }
        return src;
    }

    function getCity() {
        return textContent(document.querySelector('.vcard-detail[itemprop="homeLocation"]'));
    }

    function getEmail() {
        return textContent(document.querySelector('.vcard-detail[itemprop="email"]'));
    }

    function getUrl() {
        return textContent(document.querySelector('.vcard-detail[itemprop="url"]'));
    }

    function getJoindate() {
        return attribute(document.querySelector('.join-date'), 'datetime');
    }

    function getFollowers() {
        return numContent(document.querySelector('.vcard-stat[href$="followers"] strong'));
    }

    function getStarred() {
        return numContent(document.querySelector('.vcard-stat[href^="/stars"]'));
    }

    function getFollowing() {
        return numContent(document.querySelector('.vcard-stat[href$="following"]'));
    }

    function getContributions() {
        return numContent(document.querySelector('.contrib-number'));
    }

    return {
        getGithub,
        isProfilePage,
    };

})();

export default GithubDataService;