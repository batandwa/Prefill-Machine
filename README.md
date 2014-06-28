Prefill-Machine
===============

A bookmarklet that automatically fills form fields based on their names.

Inspired by (or stolen from) [Adam Lichtenstein's](https://twitter.com/seeThroughTrees) [article on CSS-Tricks](http://css-tricks.com/prefilling-forms-custom-bookmarklet/)


Bookmarklet
===========

    javascript:(function(){window.s195=document.createElement('script');window.s195.setAttribute('type','text/javascript');window.s195.setAttribute('src','https://raw.githubusercontent.com/batandwa/Prefill-Machine/master/prefill_machine.js');document.getElementsByTagName('body')[0].appendChild(window.s195);})();

Uses
====
[Faker.js](https://github.com/marak/Faker.js/) - A Javascript library that generates sample data.

...and other technicques mentioned in Adam Lichtenstein's article.