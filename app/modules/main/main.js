'use strict';

angular.module('main', ['ui.router'])
    .config(function($stateProvider, $urlRouterProvider) {
        $stateProvider
            .state('main', {
                abstract: true,
                url: '/main',
                templateUrl: 'modules/main/main.html',
                controller: 'MainCtrl'
            });
    })
    .controller('MainCtrl', function($scope) {
        //TODO
        $scope.test = {};
    })
    .directive('sidebarToggle', function() {
        return {
            restrict: 'C',
            link: function(scope, element, attrs) {
                element.bind('click', function(e) {
                    e.preventDefault();

                    //If window is small enough, enable sidebar push menu
                    if ($(window).width() <= 992) {
                        $('.row-offcanvas').toggleClass('active');
                        $('.left-side').removeClass("collapse-left");
                        $('.right-side').removeClass("strech");
                        $('.row-offcanvas').toggleClass("relative");
                    } else {
                        //Else, enable content streching
                        $('.left-side').toggleClass("collapse-left");
                        $('.right-side').toggleClass("strech");
                    }
                });
            }
        };
    })
    .directive('btn', function() {
        //Add hover support for touch devices
        return {
            restrict: 'C',
            link: function(scope, element, attrs) {
                element.bind('touchstart', function() {
                    $(this).addClass('hover');
                }).bind('touchend', function() {
                    $(this).removeClass('hover');
                });
            }
        };
    })
    .directive('treeview', function() {
        /*
         * SIDEBAR MENU
         * ------------
         * This is a custom plugin for the sidebar menu. It provides a tree view.
         *
         * Usage:
         * $(".sidebar).tree();
         *
         * Note: This plugin does not accept any options. Instead, it only requires a class
         *       added to the element that contains a sub-menu.
         *
         * When used with the sidebar, for example, it would look something like this:
         * <ul class='sidebar-menu'>
         *      <li class="treeview active">
         *          <a href="#>Menu</a>
         *          <ul class='treeview-menu'>
         *              <li class='active'><a href=#>Level 1</a></li>
         *          </ul>
         *      </li>
         * </ul>
         *
         * Add .active class to <li> elements if you want the menu to be open automatically
         * on page load. See above for an example.
         */
        $.fn.tree = function() {
            return this.each(function() {
                var btn = $(this).children("a").first();
                var menu = $(this).children(".treeview-menu").first();
                var isActive = $(this).hasClass('active');

                //initialize already active menus
                if (isActive) {
                    menu.show();
                    btn.children(".fa-angle-left").first().removeClass("fa-angle-left").addClass("fa-angle-down");
                }
                //Slide open or close the menu on link click
                btn.click(function(e) {
                    e.preventDefault();
                    if (isActive) {
                        //Slide up to close menu
                        menu.slideUp();
                        isActive = false;
                        btn.children(".fa-angle-down").first().removeClass("fa-angle-down").addClass("fa-angle-left");
                        btn.parent("li").removeClass("active");
                    } else {
                        //Slide down to open menu
                        menu.slideDown();
                        isActive = true;
                        btn.children(".fa-angle-left").first().removeClass("fa-angle-left").addClass("fa-angle-down");
                        btn.parent("li").addClass("active");
                    }
                });

                /* Add margins to submenu elements to give it a tree look */
                menu.find("li > a").each(function() {
                    var pad = parseInt($(this).css("margin-left")) + 10;

                    $(this).css({
                        "margin-left": pad + "px"
                    });
                });

            });

        };
        return {
            restrict: 'C',
            link: function(scope, element, attrs) {
                element.tree();
            }
        };
    });
