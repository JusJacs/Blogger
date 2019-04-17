var app = angular.module('bloggerApp', ['ngRoute']);  //need to add 'ngRoute' inside brackets

//*** Authentication Service and Methods **
app.service('authentication', authentication);
authentication.$inject = ['$window', '$http'];
function authentication ($window, $http) {

    var saveToken = function (token) {
        $window.localStorage['blog-token'] = token;
    };

    var getToken = function () {
        return $window.localStorage['blog-token'];
    };

    var register = function(user) {
        console.log('Registering user ' + user.email + ' ' + user.password);
        return $http.post('/api/register', user).success(function(data){
            saveToken(data.token);
        });
    };

    var login = function(user) {
        console.log('Attempting to login user ' + user.email + ' ' + user.password);
        return $http.post('/api/login', user).success(function(data) {
            saveToken(data.token);
        });
    };

    var logout = function() {
        $window.localStorage.removeItem('blog-token');
    };

    var isLoggedIn = function() {
        var token = getToken();

        if(token){
            var payload = JSON.parse($window.atob(token.split('.')[1]));

            return payload.exp > Date.now() / 1000;
        } else {
            return false;
        }
    };

    var currentUser = function() {
        if(isLoggedIn()){
            var token = getToken();
            var payload = JSON.parse($window.atob(token.split('.')[1]));
            return {
                email : payload.email,
                name : payload.name
            };
        }
    };

    return {
        saveToken : saveToken,
        getToken : getToken,
        register : register,
        login : login,
        logout : logout,
        isLoggedIn : isLoggedIn,
        currentUser : currentUser
    };
}


//*** Router Provider ***
app.config(function($routeProvider) {
    $routeProvider
        .when('/', {
            templateUrl: 'pages/home.html',
            controller: 'homeController',
            controllerAs: 'vm'
        })

        .when('/bloglist', {
            templateUrl: 'pages/bloglist.html',
            controller : 'blogListController',
            controllerAs: 'vm'
        })

        .when('/blogadd', {
            templateUrl: 'pages/blogadd.html',
            controller: 'addController',
            controllerAs: 'vm'
        })

        .when('/blogedit/:blogId', {
            templateUrl: 'pages/blogedit.html',
            controller: 'editController',
            controllerAs: 'vm'
        })

        .when('/blogdelete/:blogId', {
            templateUrl: 'pages/blogdelete.html',
            controller: 'deleteController',
            controllerAs: 'vm'
        })

        .when('/login', {
            templateUrl: 'pages/login.html',
            controller: 'LoginController',
            controllerAs: 'vm'
        })

        .when('/register', {
            templateUrl: 'pages/register.html',
            controller: 'RegisterController',
            controllerAs: 'vm'
        })

        .otherwise({redirectTo: '/'});
});

//*** Controllers ***
//HOME CONTROLLER
app.controller('homeController', function homeController() {
    var vm = this;
    vm.pageHeader = {
        title: "My Blogs"
    };
    vm.message = "Welcome to my blog site!";
});


//BLOGLIST CONTROLLER
app.controller('blogListController', function blogListController($http) {
    var vm = this;
    vm.pageHeader = {
        title: 'Blog List'
    };

    getBlogList($http)
        .success(function(data) {
            vm.blogList = data;
            vm.message = "Blogs found!";
        })
        .error(function (e) {
            vm.message = "Could not find blog list";
        });
});

//BLOGADD CONTROLLER
app.controller('addController', [ '$http', '$location', 'authentication', function addController($http, $location, authentication) {
    var vm = this;
    vm.blog = {};
    vm.pageHeader = {
        title: 'Add Blog'
    };

    vm.isLoggedIn = function() {
        return authentication.isLoggedIn();
    }

    vm.onSubmit = function() {
        var blogData = vm.blog;
        blogData.blogTitle = userForm.blogTitle.value;
        blogData.blogText = userForm.blogText.value;

        addBlog($http, blogData, authentication)
            .success(function(blogData) {
                console.log(blogData);
                $location.path('/bloglist').replace();
            })
            .error(function(e) {
                console.log(e);
            });
    };
}]);

//EDIT BLOG CONTROLLER
app.controller('editController', [ '$http', '$routeParams', '$location', 'authentication', function editController($http, $routeParams, $location, authentication) {
    var vm = this;
    vm.pageHeader = {
        title: 'Edit a Blog'
    };
    vm.blog = {};
    vm.id = $routeParams.blogId;

    vm.isLoggedIn = function() {
        return authentication.isLoggedIn();
    }

    getBlogById($http, vm.id)
        .success(function(blogData) {
            vm.blog = blogData;
        })
        .error(function(e) {
            vm.message = vm.id + " not found.";
        })

    vm.onSubmit = function() {
        var blogData = {};
        blogData.blogTitle = userForm.blogTitle.value;
        blogData.blogText = userForm.blogText.value;

        editBlog($http, blogData, vm.id, authentication)
            .success(function(blogData) {
                vm.message = "Blog has been edited";
                $location.path('/bloglist').replace();
            })
            .error(function(e) {
                vm.message = vm.id + " not found.";
            });
    }
}]);

//DELETE BLOG CONTROLLER
app.controller('deleteController', [ '$http', '$routeParams', '$location', 'authentication', function deleteController($http, $routeParams, $location, authentication) {
    var vm = this;
    vm.pageHeader = {
        title: 'Delete Blog'
    };
    vm.blog = {};
    vm.id = $routeParams.blogId;

    vm.isLoggedIn = function() {
        return authentication.isLoggedIn();
    }

    getBlogById($http, vm.id)
        .success(function(blogData) {
            vm.blog = blogData;
            vm.message = "Confirm Delete";
        })
        .error(function(e) {
            vm.message = vm.id + " not found.";
        })

    vm.onSubmit = function() {
        var blogData = vm.blog;

        deleteBlog($http, vm.id, authentication)
            .success(function(blogData) {
                vm.message = "Blog deleted";
                $location.path('/bloglist').replace();
            })
            .error(function(e) {
                vm.message = vm.id + " not found.";
            });
    }
}]);


 //REST Web API functions
function getBlogList($http) {
    return $http.get('/api/blog');
}

function addBlog($http, blogData, authentication) {
    return $http.post('/api/blog', blogData, { headers: { Authorization: 'Bearer '+ authentication.getToken() }});
}

function getBlogById($http, blogId) {
    return $http.get('/api/blog/' + blogId);
}


function editBlog($http, blogData, blogId, authentication) {
    return $http.put('/api/blog/' + blogId, blogData, { headers: { Authorization: 'Bearer '+ authentication.getToken() }} );
}

function deleteBlog($http, blogId, authentication) {
    return $http.delete('/api/blog/' + blogId, { headers: { Authorization: 'Bearer '+ authentication.getToken() }});
}



// function updateBlogById($http, authentication, id, data) {
//     return $http.put('/api/blogs/' + id, data, { headers: { Authorization: 'Bearer '+ authentication.getToken() }} );
// }

