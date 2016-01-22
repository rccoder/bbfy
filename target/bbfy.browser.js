!function(n){if("object"==typeof exports&&"undefined"!=typeof module)module.exports=n();else if("function"==typeof define&&define.amd)define([],n);else{var t;t="undefined"!=typeof window?window:"undefined"!=typeof global?global:"undefined"!=typeof self?self:this,t.bbfy=n()}}(function(){var n;return function t(n,r,e){function u(a,o){if(!r[a]){if(!n[a]){var c="function"==typeof require&&require;if(!o&&c)return c(a,!0);if(i)return i(a,!0);var s=new Error("Cannot find module '"+a+"'");throw s.code="MODULE_NOT_FOUND",s}var f=r[a]={exports:{}};n[a][0].call(f.exports,function(t){var r=n[a][1][t];return u(r?r:t)},f,f.exports,t,n,r,e)}return r[a].exports}for(var i="function"==typeof require&&require,a=0;a<e.length;a++)u(e[a]);return u}({1:[function(n,t,r){var e={};e.Parser=function(){"use strict";function n(t){return this instanceof n?void(this._=t):new n(t)}function t(n,t){return{status:!0,index:n,value:t,furthest:-1,expected:[]}}function r(n,t){return{status:!1,index:-1,value:null,furthest:n,expected:[t]}}function u(n,t){if(!t)return n;if(n.furthest>t.furthest)return n;var r=n.furthest===t.furthest?n.expected.concat(t.expected):t.expected;return{status:n.status,index:n.index,value:n.value,furthest:t.furthest,expected:r}}function i(t){if(!(t instanceof n))throw new Error("not a parser: "+t)}function a(n){return 1===n.length?n[0]:"one of "+n.join(", ")}function o(n,t){var r=t.index;if(r===n.length)return", got the end of the stream";var e=r>0?"'...":"'",u=n.length-r>12?"...'":"'";return" at character "+r+", got "+e+n.slice(r,r+12)+u}var c=n.prototype;e.formatError=function(n,t){return"expected "+a(t.expected)+o(n,t)};c.parse=function(n){var t=this.skip(m)._(n,0);return t.status?{status:!0,value:t.value}:{status:!1,index:t.furthest,expected:t.expected}};var s=e.seq=function(){var r=[].slice.call(arguments),e=r.length;return n(function(n,i){for(var a,o=new Array(e),c=0;e>c;c+=1){if(a=u(r[c]._(n,i),a),!a.status)return a;o[c]=a.value,i=a.index}return u(t(i,o),a)})},f=e.seqMap=function(){var n=[].slice.call(arguments),t=n.pop();return s.apply(null,n).map(function(n){return t.apply(null,n)})},l=(e.custom=function(e){return n(e(t,r))},e.alt=function(){var t=[].slice.call(arguments),r=t.length;return 0===r?v("zero alternates"):n(function(n,r){for(var e,i=0;i<t.length;i+=1)if(e=u(t[i]._(n,r),e),e.status)return e;return e})});c.or=function(n){return l(this,n)},c.then=function(n){if("function"==typeof n)throw new Error("chaining features of .then are no longer supported, use .chain instead");return i(n),s(this,n).map(function(n){return n[1]})},c.many=function(){var r=this;return n(function(n,e){for(var i,a=[];;){if(i=u(r._(n,e),i),!i.status)return u(t(e,a),i);e=i.index,a.push(i.value)}})},c.times=function(r,e){arguments.length<2&&(e=r);var i=this;return n(function(n,a){for(var o,c,s=[],f=0;r>f;f+=1){if(o=i._(n,a),c=u(o,c),!o.status)return c;a=o.index,s.push(o.value)}for(;e>f&&(o=i._(n,a),c=u(o,c),o.status);f+=1)a=o.index,s.push(o.value);return u(t(a,s),c)})},c.result=function(n){return this.map(function(t){return n})},c.atMost=function(n){return this.times(0,n)},c.atLeast=function(n){return f(this.times(n),this.many(),function(n,t){return n.concat(t)})},c.map=function(r){var e=this;return n(function(n,i){var a=e._(n,i);return a.status?u(t(a.index,r(a.value)),a):a})},c.skip=function(n){return s(this,n).map(function(n){return n[0]})},c.mark=function(){return f(g,this,g,function(n,t,r){return{start:n,value:t,end:r}})},c.desc=function(t){var r=this;return n(function(n,e){var u=r._(n,e);return u.status||(u.expected=[t]),u})};var p=(e.string=function(e){var u=e.length,i="'"+e+"'";return n(function(n,a){var o=n.slice(a,a+u);return o===e?t(a+u,o):r(a,i)})},e.regex=function(e,u){var i=RegExp("^(?:"+e.source+")",(""+e).slice((""+e).lastIndexOf("/")+1)),a=""+e;return null==u&&(u=0),n(function(n,e){var o=i.exec(n.slice(e));if(o){var c=o[0],s=o[u];if(null!=s)return t(e+c.length,s)}return r(e,a)})}),h=e.succeed=function(r){return n(function(n,e){return t(e,r)})},v=e.fail=function(t){return n(function(n,e){return r(e,t)})},m=(e.letter=p(/[a-z]/i).desc("a letter"),e.letters=p(/[a-z]*/i),e.digit=p(/[0-9]/).desc("a digit"),e.digits=p(/[0-9]*/),e.whitespace=p(/\s+/).desc("whitespace"),e.optWhitespace=p(/\s*/),e.any=n(function(n,e){return e>=n.length?r(e,"any character"):t(e+1,n.charAt(e))}),e.all=n(function(n,r){return t(n.length,n.slice(r))}),e.eof=n(function(n,e){return e<n.length?r(e,"EOF"):t(e,null)})),d=e.test=function(e){return n(function(n,u){var i=n.charAt(u);return u<n.length&&e(i)?t(u+1,i):r(u,"a character matching "+e)})},g=(e.oneOf=function(n){return d(function(t){return n.indexOf(t)>=0})},e.noneOf=function(n){return d(function(t){return n.indexOf(t)<0})},e.takeWhile=function(r){return n(function(n,e){for(var u=e;u<n.length&&r(n.charAt(u));)u+=1;return t(u,n.slice(e,u))})},e.lazy=function(t,r){arguments.length<2&&(r=t,t=void 0);var e=n(function(n,t){return e._=r()._,e._(n,t)});return t&&(e=e.desc(t)),e},e.index=n(function(n,r){return t(r,r)}));return c.concat=c.or,c.empty=v("empty"),c.of=n.of=e.of=h,c.ap=function(n){return f(this,n,function(n,t){return n(t)})},c.chain=function(t){var r=this;return n(function(n,e){var i=r._(n,e);if(!i.status)return i;var a=t(i.value);return u(a._(n,i.index),i)})},n}(),t.exports=e},{}],2:[function(n,t,r){t.exports=n("./build/parsimmon.commonjs"),r.version=n("./package.json").version},{"./build/parsimmon.commonjs":1,"./package.json":3}],3:[function(n,t,r){t.exports={name:"parsimmon",version:"0.7.0",description:"A monadic LL(infinity) parser combinator library",keywords:["parsing","parse","parser combinators"],author:{name:"Jeanine Adkisson",email:"jneen at jneen dot net"},repository:{type:"git",url:"git://github.com/jneen/parsimmon"},files:["index.js","src","test","Makefile","package.json","build/parsimmon.commonjs.js","build/parsimmon.browser.js","build/parsimmon.browser.min.js"],main:"index.js",devDependencies:{mocha:"1.8.x",chai:"1.5.x","uglify-js":"2.x"},dependencies:{pjs:"5.x"},scripts:{test:"make test"},bugs:{url:"https://github.com/jneen/parsimmon/issues"},homepage:"https://github.com/jneen/parsimmon",_id:"parsimmon@0.7.0",_shasum:"652fc7cbade73c5edb42a266ec556c906d82c9fb",_resolved:"https://registry.npmjs.org/parsimmon/-/parsimmon-0.7.0.tgz",_from:"parsimmon@*",_npmVersion:"1.4.14",_npmUser:{name:"jayferd",email:"jjmadkisson@gmail.com"},maintainers:[{name:"jayferd",email:"jjmadkisson@gmail.com"},{name:"jneen",email:"jneen@jneen.net"}],dist:{shasum:"652fc7cbade73c5edb42a266ec556c906d82c9fb",tarball:"http://registry.npmjs.org/parsimmon/-/parsimmon-0.7.0.tgz"},directories:{}}},{}],4:[function(t,r,e){(function(){function t(n){function t(t,r,e,u,i,a){for(;i>=0&&a>i;i+=n){var o=u?u[i]:i;e=r(e,t[o],o,t)}return e}return function(r,e,u,i){e=_(e,i,4);var a=!S(r)&&j.keys(r),o=(a||r).length,c=n>0?0:o-1;return arguments.length<3&&(u=r[a?a[c]:c],c+=n),t(r,e,u,a,c,o)}}function u(n){return function(t,r,e){r=w(r,e);for(var u=M(t),i=n>0?0:u-1;i>=0&&u>i;i+=n)if(r(t[i],i,t))return i;return-1}}function i(n,t,r){return function(e,u,i){var a=0,o=M(e);if("number"==typeof i)n>0?a=i>=0?i:Math.max(i+o,a):o=i>=0?Math.min(i+1,o):i+o+1;else if(r&&i&&o)return i=r(e,u),e[i]===u?i:-1;if(u!==u)return i=t(h.call(e,a,o),j.isNaN),i>=0?i+a:-1;for(i=n>0?a:o-1;i>=0&&o>i;i+=n)if(e[i]===u)return i;return-1}}function a(n,t){var r=N.length,e=n.constructor,u=j.isFunction(e)&&e.prototype||f,i="constructor";for(j.has(n,i)&&!j.contains(t,i)&&t.push(i);r--;)i=N[r],i in n&&n[i]!==u[i]&&!j.contains(t,i)&&t.push(i)}var o=this,c=o._,s=Array.prototype,f=Object.prototype,l=Function.prototype,p=s.push,h=s.slice,v=f.toString,m=f.hasOwnProperty,d=Array.isArray,g=Object.keys,y=l.bind,x=Object.create,b=function(){},j=function(n){return n instanceof j?n:this instanceof j?void(this._wrapped=n):new j(n)};"undefined"!=typeof e?("undefined"!=typeof r&&r.exports&&(e=r.exports=j),e._=j):o._=j,j.VERSION="1.8.3";var _=function(n,t,r){if(void 0===t)return n;switch(null==r?3:r){case 1:return function(r){return n.call(t,r)};case 2:return function(r,e){return n.call(t,r,e)};case 3:return function(r,e,u){return n.call(t,r,e,u)};case 4:return function(r,e,u,i){return n.call(t,r,e,u,i)}}return function(){return n.apply(t,arguments)}},w=function(n,t,r){return null==n?j.identity:j.isFunction(n)?_(n,t,r):j.isObject(n)?j.matcher(n):j.property(n)};j.iteratee=function(n,t){return w(n,t,1/0)};var k=function(n,t){return function(r){var e=arguments.length;if(2>e||null==r)return r;for(var u=1;e>u;u++)for(var i=arguments[u],a=n(i),o=a.length,c=0;o>c;c++){var s=a[c];t&&void 0!==r[s]||(r[s]=i[s])}return r}},A=function(n){if(!j.isObject(n))return{};if(x)return x(n);b.prototype=n;var t=new b;return b.prototype=null,t},O=function(n){return function(t){return null==t?void 0:t[n]}},E=Math.pow(2,53)-1,M=O("length"),S=function(n){var t=M(n);return"number"==typeof t&&t>=0&&E>=t};j.each=j.forEach=function(n,t,r){t=_(t,r);var e,u;if(S(n))for(e=0,u=n.length;u>e;e++)t(n[e],e,n);else{var i=j.keys(n);for(e=0,u=i.length;u>e;e++)t(n[i[e]],i[e],n)}return n},j.map=j.collect=function(n,t,r){t=w(t,r);for(var e=!S(n)&&j.keys(n),u=(e||n).length,i=Array(u),a=0;u>a;a++){var o=e?e[a]:a;i[a]=t(n[o],o,n)}return i},j.reduce=j.foldl=j.inject=t(1),j.reduceRight=j.foldr=t(-1),j.find=j.detect=function(n,t,r){var e;return e=S(n)?j.findIndex(n,t,r):j.findKey(n,t,r),void 0!==e&&-1!==e?n[e]:void 0},j.filter=j.select=function(n,t,r){var e=[];return t=w(t,r),j.each(n,function(n,r,u){t(n,r,u)&&e.push(n)}),e},j.reject=function(n,t,r){return j.filter(n,j.negate(w(t)),r)},j.every=j.all=function(n,t,r){t=w(t,r);for(var e=!S(n)&&j.keys(n),u=(e||n).length,i=0;u>i;i++){var a=e?e[i]:i;if(!t(n[a],a,n))return!1}return!0},j.some=j.any=function(n,t,r){t=w(t,r);for(var e=!S(n)&&j.keys(n),u=(e||n).length,i=0;u>i;i++){var a=e?e[i]:i;if(t(n[a],a,n))return!0}return!1},j.contains=j.includes=j.include=function(n,t,r,e){return S(n)||(n=j.values(n)),("number"!=typeof r||e)&&(r=0),j.indexOf(n,t,r)>=0},j.invoke=function(n,t){var r=h.call(arguments,2),e=j.isFunction(t);return j.map(n,function(n){var u=e?t:n[t];return null==u?u:u.apply(n,r)})},j.pluck=function(n,t){return j.map(n,j.property(t))},j.where=function(n,t){return j.filter(n,j.matcher(t))},j.findWhere=function(n,t){return j.find(n,j.matcher(t))},j.max=function(n,t,r){var e,u,i=-(1/0),a=-(1/0);if(null==t&&null!=n){n=S(n)?n:j.values(n);for(var o=0,c=n.length;c>o;o++)e=n[o],e>i&&(i=e)}else t=w(t,r),j.each(n,function(n,r,e){u=t(n,r,e),(u>a||u===-(1/0)&&i===-(1/0))&&(i=n,a=u)});return i},j.min=function(n,t,r){var e,u,i=1/0,a=1/0;if(null==t&&null!=n){n=S(n)?n:j.values(n);for(var o=0,c=n.length;c>o;o++)e=n[o],i>e&&(i=e)}else t=w(t,r),j.each(n,function(n,r,e){u=t(n,r,e),(a>u||u===1/0&&i===1/0)&&(i=n,a=u)});return i},j.shuffle=function(n){for(var t,r=S(n)?n:j.values(n),e=r.length,u=Array(e),i=0;e>i;i++)t=j.random(0,i),t!==i&&(u[i]=u[t]),u[t]=r[i];return u},j.sample=function(n,t,r){return null==t||r?(S(n)||(n=j.values(n)),n[j.random(n.length-1)]):j.shuffle(n).slice(0,Math.max(0,t))},j.sortBy=function(n,t,r){return t=w(t,r),j.pluck(j.map(n,function(n,r,e){return{value:n,index:r,criteria:t(n,r,e)}}).sort(function(n,t){var r=n.criteria,e=t.criteria;if(r!==e){if(r>e||void 0===r)return 1;if(e>r||void 0===e)return-1}return n.index-t.index}),"value")};var F=function(n){return function(t,r,e){var u={};return r=w(r,e),j.each(t,function(e,i){var a=r(e,i,t);n(u,e,a)}),u}};j.groupBy=F(function(n,t,r){j.has(n,r)?n[r].push(t):n[r]=[t]}),j.indexBy=F(function(n,t,r){n[r]=t}),j.countBy=F(function(n,t,r){j.has(n,r)?n[r]++:n[r]=1}),j.toArray=function(n){return n?j.isArray(n)?h.call(n):S(n)?j.map(n,j.identity):j.values(n):[]},j.size=function(n){return null==n?0:S(n)?n.length:j.keys(n).length},j.partition=function(n,t,r){t=w(t,r);var e=[],u=[];return j.each(n,function(n,r,i){(t(n,r,i)?e:u).push(n)}),[e,u]},j.first=j.head=j.take=function(n,t,r){return null!=n?null==t||r?n[0]:j.initial(n,n.length-t):void 0},j.initial=function(n,t,r){return h.call(n,0,Math.max(0,n.length-(null==t||r?1:t)))},j.last=function(n,t,r){return null!=n?null==t||r?n[n.length-1]:j.rest(n,Math.max(0,n.length-t)):void 0},j.rest=j.tail=j.drop=function(n,t,r){return h.call(n,null==t||r?1:t)},j.compact=function(n){return j.filter(n,j.identity)};var I=function(n,t,r,e){for(var u=[],i=0,a=e||0,o=M(n);o>a;a++){var c=n[a];if(S(c)&&(j.isArray(c)||j.isArguments(c))){t||(c=I(c,t,r));var s=0,f=c.length;for(u.length+=f;f>s;)u[i++]=c[s++]}else r||(u[i++]=c)}return u};j.flatten=function(n,t){return I(n,t,!1)},j.without=function(n){return j.difference(n,h.call(arguments,1))},j.uniq=j.unique=function(n,t,r,e){j.isBoolean(t)||(e=r,r=t,t=!1),null!=r&&(r=w(r,e));for(var u=[],i=[],a=0,o=M(n);o>a;a++){var c=n[a],s=r?r(c,a,n):c;t?(a&&i===s||u.push(c),i=s):r?j.contains(i,s)||(i.push(s),u.push(c)):j.contains(u,c)||u.push(c)}return u},j.union=function(){return j.uniq(I(arguments,!0,!0))},j.intersection=function(n){for(var t=[],r=arguments.length,e=0,u=M(n);u>e;e++){var i=n[e];if(!j.contains(t,i)){for(var a=1;r>a&&j.contains(arguments[a],i);a++);a===r&&t.push(i)}}return t},j.difference=function(n){var t=I(arguments,!0,!0,1);return j.filter(n,function(n){return!j.contains(t,n)})},j.zip=function(){return j.unzip(arguments)},j.unzip=function(n){for(var t=n&&j.max(n,M).length||0,r=Array(t),e=0;t>e;e++)r[e]=j.pluck(n,e);return r},j.object=function(n,t){for(var r={},e=0,u=M(n);u>e;e++)t?r[n[e]]=t[e]:r[n[e][0]]=n[e][1];return r},j.findIndex=u(1),j.findLastIndex=u(-1),j.sortedIndex=function(n,t,r,e){r=w(r,e,1);for(var u=r(t),i=0,a=M(n);a>i;){var o=Math.floor((i+a)/2);r(n[o])<u?i=o+1:a=o}return i},j.indexOf=i(1,j.findIndex,j.sortedIndex),j.lastIndexOf=i(-1,j.findLastIndex),j.range=function(n,t,r){null==t&&(t=n||0,n=0),r=r||1;for(var e=Math.max(Math.ceil((t-n)/r),0),u=Array(e),i=0;e>i;i++,n+=r)u[i]=n;return u};var q=function(n,t,r,e,u){if(!(e instanceof t))return n.apply(r,u);var i=A(n.prototype),a=n.apply(i,u);return j.isObject(a)?a:i};j.bind=function(n,t){if(y&&n.bind===y)return y.apply(n,h.call(arguments,1));if(!j.isFunction(n))throw new TypeError("Bind must be called on a function");var r=h.call(arguments,2),e=function(){return q(n,e,t,this,r.concat(h.call(arguments)))};return e},j.partial=function(n){var t=h.call(arguments,1),r=function(){for(var e=0,u=t.length,i=Array(u),a=0;u>a;a++)i[a]=t[a]===j?arguments[e++]:t[a];for(;e<arguments.length;)i.push(arguments[e++]);return q(n,r,this,this,i)};return r},j.bindAll=function(n){var t,r,e=arguments.length;if(1>=e)throw new Error("bindAll must be passed function names");for(t=1;e>t;t++)r=arguments[t],n[r]=j.bind(n[r],n);return n},j.memoize=function(n,t){var r=function(e){var u=r.cache,i=""+(t?t.apply(this,arguments):e);return j.has(u,i)||(u[i]=n.apply(this,arguments)),u[i]};return r.cache={},r},j.delay=function(n,t){var r=h.call(arguments,2);return setTimeout(function(){return n.apply(null,r)},t)},j.defer=j.partial(j.delay,j,1),j.throttle=function(n,t,r){var e,u,i,a=null,o=0;r||(r={});var c=function(){o=r.leading===!1?0:j.now(),a=null,i=n.apply(e,u),a||(e=u=null)};return function(){var s=j.now();o||r.leading!==!1||(o=s);var f=t-(s-o);return e=this,u=arguments,0>=f||f>t?(a&&(clearTimeout(a),a=null),o=s,i=n.apply(e,u),a||(e=u=null)):a||r.trailing===!1||(a=setTimeout(c,f)),i}},j.debounce=function(n,t,r){var e,u,i,a,o,c=function(){var s=j.now()-a;t>s&&s>=0?e=setTimeout(c,t-s):(e=null,r||(o=n.apply(i,u),e||(i=u=null)))};return function(){i=this,u=arguments,a=j.now();var s=r&&!e;return e||(e=setTimeout(c,t)),s&&(o=n.apply(i,u),i=u=null),o}},j.wrap=function(n,t){return j.partial(t,n)},j.negate=function(n){return function(){return!n.apply(this,arguments)}},j.compose=function(){var n=arguments,t=n.length-1;return function(){for(var r=t,e=n[t].apply(this,arguments);r--;)e=n[r].call(this,e);return e}},j.after=function(n,t){return function(){return--n<1?t.apply(this,arguments):void 0}},j.before=function(n,t){var r;return function(){return--n>0&&(r=t.apply(this,arguments)),1>=n&&(t=null),r}},j.once=j.partial(j.before,2);var z=!{toString:null}.propertyIsEnumerable("toString"),N=["valueOf","isPrototypeOf","toString","propertyIsEnumerable","hasOwnProperty","toLocaleString"];j.keys=function(n){if(!j.isObject(n))return[];if(g)return g(n);var t=[];for(var r in n)j.has(n,r)&&t.push(r);return z&&a(n,t),t},j.allKeys=function(n){if(!j.isObject(n))return[];var t=[];for(var r in n)t.push(r);return z&&a(n,t),t},j.values=function(n){for(var t=j.keys(n),r=t.length,e=Array(r),u=0;r>u;u++)e[u]=n[t[u]];return e},j.mapObject=function(n,t,r){t=w(t,r);for(var e,u=j.keys(n),i=u.length,a={},o=0;i>o;o++)e=u[o],a[e]=t(n[e],e,n);return a},j.pairs=function(n){for(var t=j.keys(n),r=t.length,e=Array(r),u=0;r>u;u++)e[u]=[t[u],n[t[u]]];return e},j.invert=function(n){for(var t={},r=j.keys(n),e=0,u=r.length;u>e;e++)t[n[r[e]]]=r[e];return t},j.functions=j.methods=function(n){var t=[];for(var r in n)j.isFunction(n[r])&&t.push(r);return t.sort()},j.extend=k(j.allKeys),j.extendOwn=j.assign=k(j.keys),j.findKey=function(n,t,r){t=w(t,r);for(var e,u=j.keys(n),i=0,a=u.length;a>i;i++)if(e=u[i],t(n[e],e,n))return e},j.pick=function(n,t,r){var e,u,i={},a=n;if(null==a)return i;j.isFunction(t)?(u=j.allKeys(a),e=_(t,r)):(u=I(arguments,!1,!1,1),e=function(n,t,r){return t in r},a=Object(a));for(var o=0,c=u.length;c>o;o++){var s=u[o],f=a[s];e(f,s,a)&&(i[s]=f)}return i},j.omit=function(n,t,r){if(j.isFunction(t))t=j.negate(t);else{var e=j.map(I(arguments,!1,!1,1),String);t=function(n,t){return!j.contains(e,t)}}return j.pick(n,t,r)},j.defaults=k(j.allKeys,!0),j.create=function(n,t){var r=A(n);return t&&j.extendOwn(r,t),r},j.clone=function(n){return j.isObject(n)?j.isArray(n)?n.slice():j.extend({},n):n},j.tap=function(n,t){return t(n),n},j.isMatch=function(n,t){var r=j.keys(t),e=r.length;if(null==n)return!e;for(var u=Object(n),i=0;e>i;i++){var a=r[i];if(t[a]!==u[a]||!(a in u))return!1}return!0};var T=function(n,t,r,e){if(n===t)return 0!==n||1/n===1/t;if(null==n||null==t)return n===t;n instanceof j&&(n=n._wrapped),t instanceof j&&(t=t._wrapped);var u=v.call(n);if(u!==v.call(t))return!1;switch(u){case"[object RegExp]":case"[object String]":return""+n==""+t;case"[object Number]":return+n!==+n?+t!==+t:0===+n?1/+n===1/t:+n===+t;case"[object Date]":case"[object Boolean]":return+n===+t}var i="[object Array]"===u;if(!i){if("object"!=typeof n||"object"!=typeof t)return!1;var a=n.constructor,o=t.constructor;if(a!==o&&!(j.isFunction(a)&&a instanceof a&&j.isFunction(o)&&o instanceof o)&&"constructor"in n&&"constructor"in t)return!1}r=r||[],e=e||[];for(var c=r.length;c--;)if(r[c]===n)return e[c]===t;if(r.push(n),e.push(t),i){if(c=n.length,c!==t.length)return!1;for(;c--;)if(!T(n[c],t[c],r,e))return!1}else{var s,f=j.keys(n);if(c=f.length,j.keys(t).length!==c)return!1;for(;c--;)if(s=f[c],!j.has(t,s)||!T(n[s],t[s],r,e))return!1}return r.pop(),e.pop(),!0};j.isEqual=function(n,t){return T(n,t)},j.isEmpty=function(n){return null==n?!0:S(n)&&(j.isArray(n)||j.isString(n)||j.isArguments(n))?0===n.length:0===j.keys(n).length},j.isElement=function(n){return!(!n||1!==n.nodeType)},j.isArray=d||function(n){return"[object Array]"===v.call(n)},j.isObject=function(n){var t=typeof n;return"function"===t||"object"===t&&!!n},j.each(["Arguments","Function","String","Number","Date","RegExp","Error"],function(n){j["is"+n]=function(t){return v.call(t)==="[object "+n+"]"}}),j.isArguments(arguments)||(j.isArguments=function(n){return j.has(n,"callee")}),"function"!=typeof/./&&"object"!=typeof Int8Array&&(j.isFunction=function(n){return"function"==typeof n||!1}),j.isFinite=function(n){return isFinite(n)&&!isNaN(parseFloat(n))},j.isNaN=function(n){return j.isNumber(n)&&n!==+n},j.isBoolean=function(n){return n===!0||n===!1||"[object Boolean]"===v.call(n)},j.isNull=function(n){return null===n},j.isUndefined=function(n){return void 0===n},j.has=function(n,t){return null!=n&&m.call(n,t)},j.noConflict=function(){return o._=c,this},j.identity=function(n){return n},j.constant=function(n){return function(){return n}},j.noop=function(){},j.property=O,j.propertyOf=function(n){return null==n?function(){}:function(t){return n[t]}},j.matcher=j.matches=function(n){return n=j.extendOwn({},n),function(t){return j.isMatch(t,n)}},j.times=function(n,t,r){var e=Array(Math.max(0,n));t=_(t,r,1);for(var u=0;n>u;u++)e[u]=t(u);return e},j.random=function(n,t){return null==t&&(t=n,n=0),n+Math.floor(Math.random()*(t-n+1))},j.now=Date.now||function(){return(new Date).getTime()};var B={"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;","'":"&#x27;","`":"&#x60;"},L=j.invert(B),R=function(n){var t=function(t){return n[t]},r="(?:"+j.keys(n).join("|")+")",e=RegExp(r),u=RegExp(r,"g");return function(n){return n=null==n?"":""+n,e.test(n)?n.replace(u,t):n}};j.escape=R(B),j.unescape=R(L),j.result=function(n,t,r){var e=null==n?void 0:n[t];return void 0===e&&(e=r),j.isFunction(e)?e.call(n):e};var D=0;j.uniqueId=function(n){var t=++D+"";return n?n+t:t},j.templateSettings={evaluate:/<%([\s\S]+?)%>/g,interpolate:/<%=([\s\S]+?)%>/g,escape:/<%-([\s\S]+?)%>/g};var K=/(.)^/,$={"'":"'","\\":"\\","\r":"r","\n":"n","\u2028":"u2028","\u2029":"u2029"},P=/\\|'|\r|\n|\u2028|\u2029/g,U=function(n){return"\\"+$[n]};j.template=function(n,t,r){!t&&r&&(t=r),t=j.defaults({},t,j.templateSettings);var e=RegExp([(t.escape||K).source,(t.interpolate||K).source,(t.evaluate||K).source].join("|")+"|$","g"),u=0,i="__p+='";n.replace(e,function(t,r,e,a,o){return i+=n.slice(u,o).replace(P,U),u=o+t.length,r?i+="'+\n((__t=("+r+"))==null?'':_.escape(__t))+\n'":e?i+="'+\n((__t=("+e+"))==null?'':__t)+\n'":a&&(i+="';\n"+a+"\n__p+='"),t}),i+="';\n",t.variable||(i="with(obj||{}){\n"+i+"}\n"),i="var __t,__p='',__j=Array.prototype.join,print=function(){__p+=__j.call(arguments,'');};\n"+i+"return __p;\n";try{var a=new Function(t.variable||"obj","_",i)}catch(o){throw o.source=i,o}var c=function(n){return a.call(this,n,j)},s=t.variable||"obj";return c.source="function("+s+"){\n"+i+"}",c},j.chain=function(n){var t=j(n);return t._chain=!0,t};var W=function(n,t){return n._chain?j(t).chain():t};j.mixin=function(n){j.each(j.functions(n),function(t){var r=j[t]=n[t];j.prototype[t]=function(){var n=[this._wrapped];return p.apply(n,arguments),W(this,r.apply(j,n))}})},j.mixin(j),j.each(["pop","push","reverse","shift","sort","splice","unshift"],function(n){var t=s[n];j.prototype[n]=function(){var r=this._wrapped;return t.apply(r,arguments),"shift"!==n&&"splice"!==n||0!==r.length||delete r[0],W(this,r)}}),j.each(["concat","join","slice"],function(n){var t=s[n];j.prototype[n]=function(){return W(this,t.apply(this._wrapped,arguments))}}),j.prototype.value=function(){return this._wrapped},j.prototype.valueOf=j.prototype.toJSON=j.prototype.value,j.prototype.toString=function(){return""+this._wrapped},"function"==typeof n&&n.amd&&n("underscore",[],function(){return j})}).call(this)},{}],5:[function(n,t,r){"use strict";function e(n){return n&&n.__esModule?n:{"default":n}}function u(n){return Array.isArray(n)?n:Array.from(n)}function i(n){return function(t){return"<"+n+">"+t+"</"+n+">"}}function a(n,t){return'<span style="'+n+'">'+t+"</span>"}function o(n){function t(n){return function(t){return{type:n,value:t}}}var r=(0,p.string)("\n").map(t("newline")),e=(0,p.regex)(/[^\] =]+/),u=(0,p.string)("=").then(e),i=(0,p.string)("["),a=(0,p.string)("]"),o=(0,p.string)("/"),c=(0,p.regex)(/[^[\n]+/).map(t("text")),s=(0,p.regex)(/[\[\] ]/).map(t("text")),f=(0,p.seq)(e),h=(0,p.seq)(e,u),m=(0,p.seq)(e.skip(p.whitespace),h.skip(p.optWhitespace).many().map(v["default"].object)),d=m.or(h).or(f).map(function(n){var t=l(n,2),r=t[0],e=t[1];return{tag:r,assignments:e}}),g=i.then(d).skip(a).map(t("open-tag")),y=i.then(o).then(e).skip(a).map(t("close-tag")),x=(0,p.alt)(y,g,c,r,s).many();return x.parse(n)}function c(n){var t=arguments.length<=1||void 0===arguments[1]?d:arguments[1],r=t.lineTags,e=void 0===r?d.lineTags:r,u=n.reduce(function(n,t){function r(t,r,e){if(-1===t)return v["default"].extend({},n,e);if(0===t)return v["default"].extend({},n,{result:a.concat([r]),tags:o.slice(1)});var u=o.slice(0,t+1);return v["default"].extend({},n,{result:a.concat(u.map(function(n){return{type:"close-tag",value:n}})),tags:o.slice(t+1),sane:!1})}var u=t.type,i=t.value,a=n.result,o=(n.sane,n.tags);if("text"===u)return v["default"].extend({},n,{result:a.concat([{type:u,value:i}])});if("open-tag"===u)return v["default"].extend({},n,{result:a.concat([{type:u,value:i}]),tags:[i.tag].concat(o)});if("close-tag"===u)return r(o.indexOf(i),{type:u,value:i},{sane:!1});if("newline"===u)return r(v["default"].findIndex(o,function(n){return v["default"].contains(e,n)}),{type:"close-tag",value:o[0]},{result:a.concat([{type:"text",value:i}])});throw"Unsupported lexeme "+u},{result:[],sane:!0,tags:[]}),i=u.result,a=u.sane,o=u.tags;return{lexemes:i,sane:a&&0===o.length,tags:o}}function s(n){function t(n){for(var r=n,e=[],i=void 0;void 0!==r&&r.length>0;){var a=r,o=u(a);i=o[0],r=o.slice(1);var c=i,s=c.type,f=c.value;if("text"===s)e.push(i);else if("open-tag"===s){var l=t(r);e.push({type:"tag",value:f,children:l.result}),r=l.rest}else if("close-tag"===s)return{result:e,rest:r}}return{result:e,rest:r}}return{type:"root",children:t(n).result}}function f(n,t,r){function e(n,e){var u=e.tag,i=e.assignments;return(t[u]||r)(n,u,i)}function u(n){var t=n.type,r=n.value,i=n.children;return"text"===t?r:"tag"===t?e(i.reduce(function(n,t){return n+u(t)},""),r):i.reduce(function(n,t){return n+u(t)},"")}return u(n)}Object.defineProperty(r,"__esModule",{value:!0});var l=function(){function n(n,t){var r=[],e=!0,u=!1,i=void 0;try{for(var a,o=n[Symbol.iterator]();!(e=(a=o.next()).done)&&(r.push(a.value),!t||r.length!==t);e=!0);}catch(c){u=!0,i=c}finally{try{!e&&o["return"]&&o["return"]()}finally{if(u)throw i}}return r}return function(t,r){if(Array.isArray(t))return t;if(Symbol.iterator in Object(t))return n(t,r);throw new TypeError("Invalid attempt to destructure non-iterable instance")}}(),p=n("parsimmon"),h=n("underscore"),v=e(h),m={strip:{},html:{b:i("b"),i:i("i"),u:i("u"),s:i("s"),color:function(n,t){var r=arguments.length<=2||void 0===arguments[2]?"":arguments[2];return r.match(/^(#[0-9a-f]{6}|\w+)$/i)?a("color: "+r.toLowerCase()+";",n):n},font:function(n,t){var r=arguments.length<=2||void 0===arguments[2]?"":arguments[2];return r.match(/^\w+$/)?a("font-family: "+r+";",n):n},size:function(n,t){var r=arguments.length<=2||void 0===arguments[2]?"":arguments[2];return r.match(/^\d+$/)?a("font-size: "+r+"px;",n):n},url:function(n,t){var r=arguments.length<=2||void 0===arguments[2]?"":arguments[2];return r.match(/^https?:\/\/.+/)?'<a href="'+r+'">'+n+"</a>":n},img:function(n,t,r){if(n.match(/^https?:\/\/.+/)){if(r){var e="string"==typeof r?(/(\d+)x(\d+)/.exec(r)||[]).slice(1):[r.width,r.height],u=l(e,2),i=u[0],a=void 0===i?"":i,o=u[1],c=void 0===o?"":o;if(a.match(/^\d+$/)&&c.match(/^\d+$/))return'<img src="'+n+'" width="'+a+'" height="'+c+'"/>'}return'<img src="'+n+'"/>'}return""}}},d={rules:m.html,unsupported:function(n){return n},lineTags:["*"]},g={converter:function(){var n=arguments.length<=0||void 0===arguments[0]?d:arguments[0],t=n.rules,r=void 0===t?d.rules:t,e=n.unsupported,u=void 0===e?d.unsupported:e;return function(t){var e=o(t,n);if(!e.status)throw parsimmon.formatError(t,e);return f(s(c(e.value,n).lexemes),r,u)}},options:d,ruleSets:m,api:{parse:o,transform:f,sanitize:c,cst:s}};r["default"]=g,t.exports=r["default"]},{parsimmon:2,underscore:4}]},{},[5])(5)});
//# sourceMappingURL=bbfy.browser.js.map