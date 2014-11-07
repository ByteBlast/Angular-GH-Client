app.controller("mainController", function($scope, $http, $interval, $log) {

    function onUserAvailable(response) {
        $scope.user = response.data;
        $http.get($scope.user.repos_url).then(onReposAvailable, onError)
    };

    function onReposAvailable(response) {
        $scope.repos = response.data;
    }

    function onError(reason) {
        $log.error("Unable to fetch data: " + reason);
        $scope.error = "Could not fetch data.";
    };
    
    function decrementCountdown() {
        $scope.countdown -= 1;
        if ($scope.countdown == 0) {
            $scope.search($scope.username);
        }
    }
    
    function startCountdown() {
        $interval(decrementCountdown, 1000, $scope.countdown);
    }
    
    $scope.search = function(username) {
        $log.info("Searching for: " + username);
        $http.get("https://api.github.com/users/" + username).then(onUserAvailable, onError);
    }

    $scope.username = "Angular";
    $scope.repoSortOrder = "-stargazers_count"
    $scope.countdown = 5;
    startCountdown();
});