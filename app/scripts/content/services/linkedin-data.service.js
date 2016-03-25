var LinkedinDataService = (function() {

    function textContent(node) {
        return node? node.textContent: '';
    }

    function getName() {
        return document.querySelector('.full-name').textContent;
    }

    function getCity() {
        return document.querySelector('.locality a').textContent;
    }

    function getPhoto() {
        return document.querySelector('.profile-picture img').src;
    }

    function getDescription() {
        var description = '';
        var wrapper = document.getElementById('background-summary');
        if(wrapper) {
            description = textContent(wrapper.querySelector('.description'));
        }
        return description;
    }

    function getSkills() {
        var result = [];
        var wrapper = document.getElementById('profile-skills');
        if(wrapper) {
            Array.prototype.forEach.call(wrapper.querySelectorAll('.skill-pill'), function(item) {
                result.push({
                    name: textContent(item.querySelector('.endorse-item-name-text')),
                    count: parseInt(textContent(item.querySelector('.num-endorsements')))
                });
            });
        }
        return result;
    }

    function getJobs() {
        var result = [];
        var wrapper = document.getElementById('background-experience');
        if(wrapper) {
            Array.prototype.forEach.call(wrapper.querySelectorAll('.section-item'), function(item) {
                result.push({
                    position: textContent(item.querySelector('header h4 a')),
                    company: textContent(item.querySelector('header h4 ~ h5 a')),
                    locality: textContent(item.querySelector('.locality')),
                    period: textContent(item.querySelector('.experience-date-locale'))
                        .match(/\(.*\)/)[0]
                        .match(/(\d+) /)
                        .reverse()
                        .reduce(function(prev, cur, i) {
                            return prev + parseInt(cur) * Math.pow(12, i);
                        }, 0),
                    current: item.className.split(' ').indexOf('current-position') >= 0
                });
            });
        }
        return result;
    }

    function getLanguages() {
        var result = [];
        var wrapper = document.getElementById('languages');
        if(wrapper) {
            Array.prototype.forEach.call(wrapper.querySelectorAll('.section-item'), function(item) {
                result.push({
                    name: textContent(item.querySelector('h4')),
                    proficiency: textContent(item.querySelector('.languages-proficiency'))
                });
            });
        }
        return result;
    }

    function getEducation() {
        var result = [];
        var wrapper = document.getElementById('background-education');
        if(wrapper) {
            Array.prototype.forEach.call(wrapper.querySelectorAll('.section-item'), function(item) {
                result.push({
                    school: textContent(item.querySelector('header h4 a')),
                    degree: textContent(item.querySelector('header h4 ~ h5 .degree')),
                    major: textContent(item.querySelector('header h4 ~ h5 .major')),
                    date: textContent(item.querySelector('.education-date'))
                });
            });
        }
        return result;
    }

    return {
        getName: getName,
        getCity: getCity,
        getPhoto: getPhoto,
        getDescription: getDescription,
        getSkills: getSkills,
        getJobs: getJobs,
        getLanguages: getLanguages,
        getEducation: getEducation
    };

})();