var App=angular.module('TestApp',[]);

App.service('TestService',function($http,$q){
    return {

        uploadFile:function(file){

            var fd = new FormData()
           
            fd.append('file',file);
            var url='https://upload.wistia.com?access_token='+'bfb28267f99313e1c37c41ef97653e35a48f156be4f81cc9080806e690e27181';
            console.log(url);
               
          return  $http.post(url, fd,
                    {
                        transformRequest: angular.identity,
                        headers: {
                            'Content-Type':undefined}
                }).then(function(response){
                        return response.data;
                },function(error){
                    return( $q.reject( error.data ) );
                })

        }
    }

});


App.controller('TestController',function($scope,$http,TestService){
    $scope.file='';
    $scope.imageUrl='';
    $scope.hashedId='';
    $scope.loader=false;
    $scope.error=false;
    $scope.errorMessage='';
        $scope.filesChanged = function (file) {
        $scope.file=file.files[0];
        $scope.uploadFunction();
    }
    $scope.uploadFunction=function(){
        $scope.loader =true;
        $scope.error=false;
           TestService.uploadFile($scope.file)
                .then(function(response){
                    $scope.loader =false;
                   $scope.hashedId=response.hashed_id;
                },function(error){
                    $scope.loader =false;
                    $scope.error=true;
                    $scope.errorMessage=error.error;
                        
                });
            }

    });