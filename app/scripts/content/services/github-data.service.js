var GithubDataService = (function() {

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

    function getEmail() {
        return textContent(document.querySelector('.email'));
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
        getUsername: getUsername,
        getEmail: getEmail,
        getJoindate: getJoindate,
        getFollowers: getFollowers,
        getStarred: getStarred,
        getFollowing: getFollowing,
        getContributions: getContributions
    };

})();