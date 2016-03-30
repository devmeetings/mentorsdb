var Github = (function() {

    function GithubModel(data) {
        this.username = data.username || '';
        this.email = data.email || '';
        this.joindate = data.joindate || '';
        this.followers = data.followers || 0;
        this.starred = data.starred || 0;
        this.following = data.following || 0;
        this.contributions = data.contributions || 0;
    }

    return GithubModel;

})();