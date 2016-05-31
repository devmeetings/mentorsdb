export default class Model {

    constructor() {
        this.id = null;
        this.route = '';
        this.post = () => {};
        this.put = () => {};
        this.delete = () => {};
    }

    setData(initData) {
        if (initData) {
            Object.keys(initData).forEach(key => {
                if (this.hasOwnProperty(key)) {
                    this[key] = initData[key];
                }
            });
        }
    }

}
