var app = angular.module('bloggerApp', ['ngRoute']);  //need to add 'ngRoute' inside brackets


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
app.controller('addController', [ '$http', '$location', function addController($http, $location) {
    var vm = this;
    vm.blog = {};
    vm.pageHeader = {
        title: 'Add Blog'
    };

    vm.onSubmit = function() {
        var blogData = vm.blog;
        blogData.blogTitle = userForm.blogTitle.value;
        blogData.blogText = userForm.blogText.value;

        addBlog($http, blogData)
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
app.controller('editController', [ '$http', '$routeParams', '$location', function editController($http, $routeParams, $location) {
    var vm = this;
    vm.pageHeader = {
        title: 'Edit a Blog'
    };
    vm.blog = {};
    vm.id = $routeParams.blogId;

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

        editBlog($http, blogData, vm.id)
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
app.controller('deleteController', [ '$http', '$routeParams', '$location', function deleteController($http, $routeParams, $location) {
    var vm = this;
    vm.pageHeader = {
        title: 'Delete Blog'
    };
    vm.blog = {};
    vm.id = $routeParams.blogId;

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

        deleteBlog($http, vm.id)
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

function addBlog($http, blogData) {
    return $http.post('/api/blog/' , blogData);
}

function getBlogById($http, blogId) {
    return $http.get('/api/blog/' + blogId);
}


function editBlog($http, blogData, blogId) {
    return $http.put('/api/blog/' + blogId, blogData);
}

function deleteBlog($http, blogId) {
    return $http.delete('/api/blog/' + blogId);
}





