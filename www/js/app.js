angular.module("canastaApp", ['ngMaterial'])
  .controller('MainController', ["$scope", "$http", function($scope, $http) {

    alert("El resultado de los sliders será enviado a NODEJS y posteriormente a R, se devolverá la multiplicación de ambos valores");

    $scope.rankInvSlider = Math.floor(Math.random() * 100);
    $scope.impulsoSlider = Math.floor(Math.random() * 100);

    $scope.nits = [{id:'all', text:"TODOS"},
                    {id:'exito', text:"EXITO"},
                    {id:'olimpica', text:"OLIMPICA"},
                    {id:'jumbo', text:"JUMBO"}];
    $scope.nitSeleccionado = $scope.nits[0];

    $scope.meses = [{id:0,text:"TODOS"},
                    {id:1,text:"ENERO"},
                    {id:2,text:"FEBRERO"},
                    {id:3,text:"MARZO"},
                    {id:4,text:"ABRIL"},
                    {id:5,text:"MAYO"},
                    {id:6,text:"JUNIO"},
                    {id:7,text:"JULIO"},
                    {id:8,text:"AGOSTO"},
                    {id:9,text:"SEPTIEMBRE"},
                    {id:10,text:"OCTUBRE"},
                    {id:11,text:"NOVIEMBRE"},
                    {id:12,text:"DICIEMBRE"}];
    $scope.mesSeleccionado = $scope.meses[0];

    $scope.prueba = function(){
      console.log($scope.nitSeleccionado);
      console.log($scope.mesSeleccionado);
    };

    $scope.pruebaHttp = function(){
        /*$http.post("/form", {dato1:1,dato2:2})
            .success(function(data){
                console.log("respuesta de servidor");
                console.log(data);
            })
            .error(function(err){
                console.log('Error: ' + err);
            });*/

        $http.post("/peticion2", {dato1:$scope.rankInvSlider,dato2:$scope.impulsoSlider})
            .success(function(data){
                console.log("respuesta de servidor");
                console.log(data);
                alert("Multiplicación de sliders devuelta desde R: " + data.resultado);
            })
            .error(function(err){
                console.log('Error: ' + err);
            });
    };
  }]);