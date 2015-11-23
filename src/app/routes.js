'use strict';

/**
 * Route configuration for the RDash module.
 */
angular.module('RDash').config(['$stateProvider', '$urlRouterProvider',
    function($stateProvider, $urlRouterProvider) {

        // For unmatched routes
        $urlRouterProvider.otherwise('/');

        // Application routes
        $stateProvider
            .state('index', {
                url: '/',
                templateUrl: 'templates/dashboard.html'
            })
            .state('tables', {
                url: '/tables',
                templateUrl: 'templates/tables.html'
            })
            .state('drinkCreation', {
                url: '/drinkCreation',
                templateUrl: 'templates/drinkCreation.html'
            })
            .state('absolutSearch', {
                url: '/absolutSearch',
                templateUrl: 'templates/absolutSearch.html'
            })
            .state('drinkSearch', {
                url: '/drinkSearch',
                templateUrl: 'templates/drinkSearch.html'
            })
            .state('drinkView', {
                url: '/drinkView',
                templateUrl: 'templates/drinkView.html'

            })
            .state('userCabinet', {
                url: '/userCabinet',
                templateUrl: 'templates/userCabinet.html'

            })
            .state('userFavorites', {
                url: '/userFavorites',
                templateUrl: 'templates/userFavorites.html'

            })
            .state('features', {
                url: '/features',
                templateUrl: 'templates/features.html'

            });

    }
]);
