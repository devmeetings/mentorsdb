const Github = (function() {

    function GithubModel(data) {
        this.username = data.username || '';
        this.avatar = data.avatar || '';
        this.city = data.city || '';
        this.email = data.email || '';
        this.url = data.url || '';
        this.joindate = data.joindate || '';
        this.followers = data.followers || 0;
        this.starred = data.starred || 0;
        this.following = data.following || 0;
        this.contributions = data.contributions || 0;
        this.removed = false;
    }

    return GithubModel;

})();

export default Github;