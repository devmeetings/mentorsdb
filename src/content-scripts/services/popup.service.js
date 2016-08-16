import backgroundService from './background.service';

const PopupService = (function() {

    function request(what, data) {
        data = data || {};
        data.method = what;
        return backgroundService.request('passToPopup', {
            data,
        });
    }

    return {
        request,
    };

})();

export default PopupService;