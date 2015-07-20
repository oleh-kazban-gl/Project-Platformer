/**
 * @license Project Platformer 1.0 Copyright (c) 2015, Oleh Kazban All Rights Reserved.
 * Available via the MIT or new BSD license.
 * see: https://github.com/olehkazban/Project-Platformer for details
 */

define(function(){
  'use strict';

  function element(name, className) {
    var elt = document.createElement(name);
    if (className) elt.className = className;

    return elt;
  }

  return element;
});

