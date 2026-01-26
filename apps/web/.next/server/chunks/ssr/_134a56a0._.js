module.exports=[870791,(a,b,c)=>{"use strict";var d=a.e&&a.e.__importDefault||function(a){return a&&a.__esModule?a:{default:a}};Object.defineProperty(c,"__esModule",{value:!0}),c.getKeyIndexes=c.hasFlag=c.exists=c.list=void 0;let e=d(a.r(869925));c.list=Object.keys(e.default);let f={};function g(a){"string"!=typeof a&&(a=String(a));let b=a.indexOf("->");return -1===b?a.length:b}c.list.forEach(a=>{f[a]=e.default[a].flags.reduce(function(a,b){return a[b]=!0,a},{})}),c.exists=function(a){return!!e.default[a]},c.hasFlag=function(a,b){if(!f[a])throw Error("Unknown command "+a);return!!f[a][b]},c.getKeyIndexes=function(a,b,c){let d=e.default[a];if(!d)throw Error("Unknown command "+a);if(!Array.isArray(b))throw Error("Expect args to be an array");let f=[],h=!!(c&&c.parseExternalKey),i=(a,b)=>{let c=[],d=Number(a[b]);for(let a=0;a<d;a++)c.push(a+b+1);return c},j=(a,b,c)=>{for(let d=b;d<a.length-1;d+=1)if(String(a[d]).toLowerCase()===c.toLowerCase())return d+1;return null};switch(a){case"zunionstore":case"zinterstore":case"zdiffstore":f.push(0,...i(b,1));break;case"eval":case"evalsha":case"eval_ro":case"evalsha_ro":case"fcall":case"fcall_ro":case"blmpop":case"bzmpop":f.push(...i(b,1));break;case"sintercard":case"lmpop":case"zunion":case"zinter":case"zmpop":case"zintercard":case"zdiff":f.push(...i(b,0));break;case"georadius":{f.push(0);let a=j(b,5,"STORE");a&&f.push(a);let c=j(b,5,"STOREDIST");c&&f.push(c);break}case"georadiusbymember":{f.push(0);let a=j(b,4,"STORE");a&&f.push(a);let c=j(b,4,"STOREDIST");c&&f.push(c);break}case"sort":case"sort_ro":f.push(0);for(let a=1;a<b.length-1;a++){let c=b[a];if("string"!=typeof c)continue;let d=c.toUpperCase();"GET"===d?(a+=1,"#"!==(c=b[a])&&(h?f.push([a,g(c)]):f.push(a))):"BY"===d?(a+=1,h?f.push([a,g(b[a])]):f.push(a)):"STORE"===d&&(a+=1,f.push(a))}break;case"migrate":if(""===b[2])for(let a=5;a<b.length-1;a++){let c=b[a];if("string"==typeof c&&"KEYS"===c.toUpperCase()){for(let c=a+1;c<b.length;c++)f.push(c);break}}else f.push(2);break;case"xreadgroup":case"xread":for(let c=3*("xread"!==a);c<b.length-1;c++)if("STREAMS"===String(b[c]).toUpperCase()){for(let a=c+1;a<=c+(b.length-1-c)/2;a++)f.push(a);break}break;default:if(d.step>0){let a=d.keyStart-1,c=d.keyStop>0?d.keyStop:b.length+d.keyStop+1;for(let b=a;b<c;b+=d.step)f.push(b)}}return f}},851419,(a,b,c)=>{"use strict";let d;function e(a,b){try{let a=d;return d=null,a.apply(this,arguments)}catch(a){return c.errorObj.e=a,c.errorObj}}Object.defineProperty(c,"__esModule",{value:!0}),c.tryCatch=c.errorObj=void 0,c.errorObj={e:{}},c.tryCatch=function(a){return d=a,e}},662839,(a,b,c)=>{"use strict";Object.defineProperty(c,"__esModule",{value:!0});let d=a.r(851419);function e(a){setTimeout(function(){throw a},0)}c.default=function(a,b,c){return"function"==typeof b&&a.then(a=>{let f;(f=void 0!==c&&Object(c).spread&&Array.isArray(a)?d.tryCatch(b).apply(void 0,[null].concat(a)):void 0===a?d.tryCatch(b)(null):d.tryCatch(b)(null,a))===d.errorObj&&e(f.e)},a=>{if(!a){let b=Error(a+"");Object.assign(b,{cause:a}),a=b}let c=d.tryCatch(b)(a);c===d.errorObj&&e(c.e)}),a}},859028,(a,b,c)=>{"use strict";let d=a.r(449719);class e extends Error{get name(){return this.constructor.name}}class f extends e{get name(){return this.constructor.name}}b.exports={RedisError:e,ParserError:class extends e{constructor(a,b,c){d(b),d.strictEqual(typeof c,"number");const e=Error.stackTraceLimit;Error.stackTraceLimit=2,super(a),Error.stackTraceLimit=e,this.offset=c,this.buffer=b}get name(){return this.constructor.name}},ReplyError:class extends e{constructor(a){const b=Error.stackTraceLimit;Error.stackTraceLimit=2,super(a),Error.stackTraceLimit=b}get name(){return this.constructor.name}},AbortError:f,InterruptError:class extends f{get name(){return this.constructor.name}}}},212305,(a,b,c)=>{"use strict";let d=a.r(449719),e=a.r(224361);function f(a){Object.defineProperty(this,"message",{value:a||"",configurable:!0,writable:!0}),Error.captureStackTrace(this,this.constructor)}function g(a,b,c){d(b),d.strictEqual(typeof c,"number"),Object.defineProperty(this,"message",{value:a||"",configurable:!0,writable:!0});let e=Error.stackTraceLimit;Error.stackTraceLimit=2,Error.captureStackTrace(this,this.constructor),Error.stackTraceLimit=e,this.offset=c,this.buffer=b}function h(a){Object.defineProperty(this,"message",{value:a||"",configurable:!0,writable:!0});let b=Error.stackTraceLimit;Error.stackTraceLimit=2,Error.captureStackTrace(this,this.constructor),Error.stackTraceLimit=b}function i(a){Object.defineProperty(this,"message",{value:a||"",configurable:!0,writable:!0}),Error.captureStackTrace(this,this.constructor)}function j(a){Object.defineProperty(this,"message",{value:a||"",configurable:!0,writable:!0}),Error.captureStackTrace(this,this.constructor)}e.inherits(f,Error),Object.defineProperty(f.prototype,"name",{value:"RedisError",configurable:!0,writable:!0}),e.inherits(g,f),Object.defineProperty(g.prototype,"name",{value:"ParserError",configurable:!0,writable:!0}),e.inherits(h,f),Object.defineProperty(h.prototype,"name",{value:"ReplyError",configurable:!0,writable:!0}),e.inherits(i,f),Object.defineProperty(i.prototype,"name",{value:"AbortError",configurable:!0,writable:!0}),e.inherits(j,i),Object.defineProperty(j.prototype,"name",{value:"InterruptError",configurable:!0,writable:!0}),b.exports={RedisError:f,ParserError:g,ReplyError:h,AbortError:i,InterruptError:j}},223950,(a,b,c)=>{"use strict";b.exports=55>process.version.charCodeAt(1)&&46===process.version.charCodeAt(2)?a.r(212305):a.r(859028)},749060,(a,b,c)=>{var d=[0,4129,8258,12387,16516,20645,24774,28903,33032,37161,41290,45419,49548,53677,57806,61935,4657,528,12915,8786,21173,17044,29431,25302,37689,33560,45947,41818,54205,50076,62463,58334,9314,13379,1056,5121,25830,29895,17572,21637,42346,46411,34088,38153,58862,62927,50604,54669,13907,9842,5649,1584,30423,26358,22165,18100,46939,42874,38681,34616,63455,59390,55197,51132,18628,22757,26758,30887,2112,6241,10242,14371,51660,55789,59790,63919,35144,39273,43274,47403,23285,19156,31415,27286,6769,2640,14899,10770,56317,52188,64447,60318,39801,35672,47931,43802,27814,31879,19684,23749,11298,15363,3168,7233,60846,64911,52716,56781,44330,48395,36200,40265,32407,28342,24277,20212,15891,11826,7761,3696,65439,61374,57309,53244,48923,44858,40793,36728,37256,33193,45514,41451,53516,49453,61774,57711,4224,161,12482,8419,20484,16421,28742,24679,33721,37784,41979,46042,49981,54044,58239,62302,689,4752,8947,13010,16949,21012,25207,29270,46570,42443,38312,34185,62830,58703,54572,50445,13538,9411,5280,1153,29798,25671,21540,17413,42971,47098,34713,38840,59231,63358,50973,55100,9939,14066,1681,5808,26199,30326,17941,22068,55628,51565,63758,59695,39368,35305,47498,43435,22596,18533,30726,26663,6336,2273,14466,10403,52093,56156,60223,64286,35833,39896,43963,48026,19061,23124,27191,31254,2801,6864,10931,14994,64814,60687,56684,52557,48554,44427,40424,36297,31782,27655,23652,19525,15522,11395,7392,3265,61215,65342,53085,57212,44955,49082,36825,40952,28183,32310,20053,24180,11923,16050,3793,7920],e=function(a){for(var b,c=0,d=0,e=[],f=a.length;c<f;c++)(b=a.charCodeAt(c))<128?e[d++]=b:(b<2048?e[d++]=b>>6|192:((64512&b)==55296&&c+1<a.length&&(64512&a.charCodeAt(c+1))==56320?(b=65536+((1023&b)<<10)+(1023&a.charCodeAt(++c)),e[d++]=b>>18|240,e[d++]=b>>12&63|128):e[d++]=b>>12|224,e[d++]=b>>6&63|128),e[d++]=63&b|128);return e},f=b.exports=function(a){for(var b,c=0,f=-1,g=0,h=0,i="string"==typeof a?e(a):a,j=i.length;c<j;){if(b=i[c++],-1===f)123===b&&(f=c);else if(125!==b)h=d[(b^h>>8)&255]^h<<8;else if(c-1!==f)return 16383&h;g=d[(b^g>>8)&255]^g<<8}return 16383&g};b.exports.generateMulti=function(a){for(var b=1,c=a.length,d=f(a[0]);b<c;)if(f(a[b++])!==d)return -1;return d}},717324,(a,b,c)=>{var d,e=/^(?:0|[1-9]\d*)$/;function f(a,b,c){switch(c.length){case 0:return a.call(b);case 1:return a.call(b,c[0]);case 2:return a.call(b,c[0],c[1]);case 3:return a.call(b,c[0],c[1],c[2])}return a.apply(b,c)}var g=Object.prototype,h=g.hasOwnProperty,i=g.toString,j=g.propertyIsEnumerable,k=Math.max;function l(a,b,c,d){return void 0===a||o(a,g[c])&&!h.call(d,c)?b:a}function m(a,b){return b=k(void 0===b?a.length-1:b,0),function(){for(var c=arguments,d=-1,e=k(c.length-b,0),g=Array(e);++d<e;)g[d]=c[b+d];d=-1;for(var h=Array(b+1);++d<b;)h[d]=c[d];return h[b]=g,f(a,this,h)}}function n(a,b){return!!(b=null==b?0x1fffffffffffff:b)&&("number"==typeof a||e.test(a))&&a>-1&&a%1==0&&a<b}function o(a,b){return a===b||a!=a&&b!=b}var p=Array.isArray;function q(a){var b,c,d;return null!=a&&"number"==typeof(b=a.length)&&b>-1&&b%1==0&&b<=0x1fffffffffffff&&"[object Function]"!=(d=r(c=a)?i.call(c):"")&&"[object GeneratorFunction]"!=d}function r(a){var b=typeof a;return!!a&&("object"==b||"function"==b)}var s=(d=function(a,b,c,d){var e;!function(a,b,c,d){c||(c={});for(var e=-1,f=b.length;++e<f;){var g=b[e],i=d?d(c[g],a[g],g,c,a):void 0;!function(a,b,c){var d=a[b];h.call(a,b)&&o(d,c)&&(void 0!==c||b in a)||(a[b]=c)}(c,g,void 0===i?a[g]:i)}}(b,q(e=b)?function(a,b){var c,d,e,f=p(a)||(e=d=c=a)&&"object"==typeof e&&q(d)&&h.call(c,"callee")&&(!j.call(c,"callee")||"[object Arguments]"==i.call(c))?function(a,b){for(var c=-1,d=Array(a);++c<a;)d[c]=b(c);return d}(a.length,String):[],g=f.length,k=!!g;for(var l in a)(b||h.call(a,l))&&!(k&&("length"==l||n(l,g)))&&f.push(l);return f}(e,!0):function(a){if(!r(a)){var b,c,d=a,e=[];if(null!=d)for(var f in Object(d))e.push(f);return e}var i=(c=(b=a)&&b.constructor,b===("function"==typeof c&&c.prototype||g)),j=[];for(var k in a)"constructor"==k&&(i||!h.call(a,k))||j.push(k);return j}(e),a,d)},m(function(a,b){var c=-1,e=b.length,f=e>1?b[e-1]:void 0,g=e>2?b[2]:void 0;for(f=d.length>3&&"function"==typeof f?(e--,f):void 0,g&&function(a,b,c){if(!r(c))return!1;var d=typeof b;return("number"==d?!!(q(c)&&n(b,c.length)):"string"==d&&b in c)&&o(c[b],a)}(b[0],b[1],g)&&(f=e<3?void 0:f,e=1),a=Object(a);++c<e;){var h=b[c];h&&d(a,h,c,f)}return a}));b.exports=m(function(a){return a.push(void 0,l),f(s,void 0,a)})},917003,(a,b,c)=>{var d=Object.prototype,e=d.hasOwnProperty,f=d.toString,g=d.propertyIsEnumerable;b.exports=function(a){var b,c,d,h,i,j,k,l;return!!(d=b=a)&&"object"==typeof d&&null!=(c=b)&&"number"==typeof(h=c.length)&&h>-1&&h%1==0&&h<=0x1fffffffffffff&&"[object Function]"!=(k=typeof(j=i=c),l=j&&("object"==k||"function"==k)?f.call(i):"")&&"[object GeneratorFunction]"!=l&&e.call(a,"callee")&&(!g.call(a,"callee")||"[object Arguments]"==f.call(a))}},159973,(a,b,c)=>{"use strict";Object.defineProperty(c,"__esModule",{value:!0}),c.isArguments=c.defaults=c.noop=void 0,c.defaults=a.r(717324),c.isArguments=a.r(917003),c.noop=function(){}},1392,(a,b,c)=>{function d(a,b,c,d){return Math.round(a/c)+" "+d+(b>=1.5*c?"s":"")}b.exports=function(a,b){b=b||{};var c,e,f,g,h=typeof a;if("string"===h&&a.length>0){var i=a;if(!((i=String(i)).length>100)){var j=/^(-?(?:\d+)?\.?\d+) *(milliseconds?|msecs?|ms|seconds?|secs?|s|minutes?|mins?|m|hours?|hrs?|h|days?|d|weeks?|w|years?|yrs?|y)?$/i.exec(i);if(j){var k=parseFloat(j[1]);switch((j[2]||"ms").toLowerCase()){case"years":case"year":case"yrs":case"yr":case"y":return 315576e5*k;case"weeks":case"week":case"w":return 6048e5*k;case"days":case"day":case"d":return 864e5*k;case"hours":case"hour":case"hrs":case"hr":case"h":return 36e5*k;case"minutes":case"minute":case"mins":case"min":case"m":return 6e4*k;case"seconds":case"second":case"secs":case"sec":case"s":return 1e3*k;case"milliseconds":case"millisecond":case"msecs":case"msec":case"ms":return k;default:break}}}return}if("number"===h&&isFinite(a)){return b.long?(e=Math.abs(c=a))>=864e5?d(c,e,864e5,"day"):e>=36e5?d(c,e,36e5,"hour"):e>=6e4?d(c,e,6e4,"minute"):e>=1e3?d(c,e,1e3,"second"):c+" ms":(g=Math.abs(f=a))>=864e5?Math.round(f/864e5)+"d":g>=36e5?Math.round(f/36e5)+"h":g>=6e4?Math.round(f/6e4)+"m":g>=1e3?Math.round(f/1e3)+"s":f+"ms"}throw Error("val is not a non-empty string or a valid number. val="+JSON.stringify(a))}},557916,(a,b,c)=>{b.exports=function(b){function c(a){let b,e,f,g=null;function h(...a){if(!h.enabled)return;let d=Number(new Date);h.diff=d-(b||d),h.prev=b,h.curr=d,b=d,a[0]=c.coerce(a[0]),"string"!=typeof a[0]&&a.unshift("%O");let e=0;a[0]=a[0].replace(/%([a-zA-Z%])/g,(b,d)=>{if("%%"===b)return"%";e++;let f=c.formatters[d];if("function"==typeof f){let c=a[e];b=f.call(h,c),a.splice(e,1),e--}return b}),c.formatArgs.call(h,a),(h.log||c.log).apply(h,a)}return h.namespace=a,h.useColors=c.useColors(),h.color=c.selectColor(a),h.extend=d,h.destroy=c.destroy,Object.defineProperty(h,"enabled",{enumerable:!0,configurable:!1,get:()=>null!==g?g:(e!==c.namespaces&&(e=c.namespaces,f=c.enabled(a)),f),set:a=>{g=a}}),"function"==typeof c.init&&c.init(h),h}function d(a,b){let d=c(this.namespace+(void 0===b?":":b)+a);return d.log=this.log,d}function e(a,b){let c=0,d=0,e=-1,f=0;for(;c<a.length;)if(d<b.length&&(b[d]===a[c]||"*"===b[d]))"*"===b[d]?(e=d,f=c):c++,d++;else{if(-1===e)return!1;d=e+1,c=++f}for(;d<b.length&&"*"===b[d];)d++;return d===b.length}return c.debug=c,c.default=c,c.coerce=function(a){return a instanceof Error?a.stack||a.message:a},c.disable=function(){let a=[...c.names,...c.skips.map(a=>"-"+a)].join(",");return c.enable(""),a},c.enable=function(a){for(let b of(c.save(a),c.namespaces=a,c.names=[],c.skips=[],("string"==typeof a?a:"").trim().replace(/\s+/g,",").split(",").filter(Boolean)))"-"===b[0]?c.skips.push(b.slice(1)):c.names.push(b)},c.enabled=function(a){for(let b of c.skips)if(e(a,b))return!1;for(let b of c.names)if(e(a,b))return!0;return!1},c.humanize=a.r(1392),c.destroy=function(){console.warn("Instance method `debug.destroy()` is deprecated and no longer does anything. It will be removed in the next major version of `debug`.")},Object.keys(b).forEach(a=>{c[a]=b[a]}),c.names=[],c.skips=[],c.formatters={},c.selectColor=function(a){let b=0;for(let c=0;c<a.length;c++)b=(b<<5)-b+a.charCodeAt(c)|0;return c.colors[Math.abs(b)%c.colors.length]},c.enable(c.load()),c}},788136,(a,b,c)=>{"use strict";b.exports=(a,b=process.argv)=>{let c=a.startsWith("-")?"":1===a.length?"-":"--",d=b.indexOf(c+a),e=b.indexOf("--");return -1!==d&&(-1===e||d<e)}},309040,(a,b,c)=>{"use strict";let d;a.r(446786);let e=a.r(870722),f=a.r(788136),{env:g}=process;function h(a){return 0!==a&&{level:a,hasBasic:!0,has256:a>=2,has16m:a>=3}}function i(a,b){if(0===d)return 0;if(f("color=16m")||f("color=full")||f("color=truecolor"))return 3;if(f("color=256"))return 2;if(a&&!b&&void 0===d)return 0;let c=d||0;if("dumb"===g.TERM)return c;if("CI"in g)return["TRAVIS","CIRCLECI","APPVEYOR","GITLAB_CI","GITHUB_ACTIONS","BUILDKITE"].some(a=>a in g)||"codeship"===g.CI_NAME?1:c;if("TEAMCITY_VERSION"in g)return+!!/^(9\.(0*[1-9]\d*)\.|\d{2,}\.)/.test(g.TEAMCITY_VERSION);if("truecolor"===g.COLORTERM)return 3;if("TERM_PROGRAM"in g){let a=parseInt((g.TERM_PROGRAM_VERSION||"").split(".")[0],10);switch(g.TERM_PROGRAM){case"iTerm.app":return a>=3?3:2;case"Apple_Terminal":return 2}}return/-256(color)?$/i.test(g.TERM)?2:/^screen|^xterm|^vt100|^vt220|^rxvt|color|ansi|cygwin|linux/i.test(g.TERM)||"COLORTERM"in g?1:c}f("no-color")||f("no-colors")||f("color=false")||f("color=never")?d=0:(f("color")||f("colors")||f("color=true")||f("color=always"))&&(d=1),"FORCE_COLOR"in g&&(d="true"===g.FORCE_COLOR?1:"false"===g.FORCE_COLOR?0:0===g.FORCE_COLOR.length?1:Math.min(parseInt(g.FORCE_COLOR,10),3)),b.exports={supportsColor:function(a){return h(i(a,a&&a.isTTY))},stdout:h(i(!0,e.isatty(1))),stderr:h(i(!0,e.isatty(2)))}},415714,(a,b,c)=>{let d=a.r(870722),e=a.r(224361);c.init=function(a){a.inspectOpts={};let b=Object.keys(c.inspectOpts);for(let d=0;d<b.length;d++)a.inspectOpts[b[d]]=c.inspectOpts[b[d]]},c.log=function(...a){return process.stderr.write(e.formatWithOptions(c.inspectOpts,...a)+"\n")},c.formatArgs=function(a){let{namespace:d,useColors:e}=this;if(e){let c=this.color,e="\x1b[3"+(c<8?c:"8;5;"+c),f=`  ${e};1m${d} \u001B[0m`;a[0]=f+a[0].split("\n").join("\n"+f),a.push(e+"m+"+b.exports.humanize(this.diff)+"\x1b[0m")}else a[0]=(c.inspectOpts.hideDate?"":new Date().toISOString()+" ")+d+" "+a[0]},c.save=function(a){a?process.env.DEBUG=a:delete process.env.DEBUG},c.load=function(){return process.env.DEBUG},c.useColors=function(){return"colors"in c.inspectOpts?!!c.inspectOpts.colors:d.isatty(process.stderr.fd)},c.destroy=e.deprecate(()=>{},"Instance method `debug.destroy()` is deprecated and no longer does anything. It will be removed in the next major version of `debug`."),c.colors=[6,2,3,4,5,1];try{let b=a.r(309040);b&&(b.stderr||b).level>=2&&(c.colors=[20,21,26,27,32,33,38,39,40,41,42,43,44,45,56,57,62,63,68,69,74,75,76,77,78,79,80,81,92,93,98,99,112,113,128,129,134,135,148,149,160,161,162,163,164,165,166,167,168,169,170,171,172,173,178,179,184,185,196,197,198,199,200,201,202,203,204,205,206,207,208,209,214,215,220,221])}catch(a){}c.inspectOpts=Object.keys(process.env).filter(a=>/^debug_/i.test(a)).reduce((a,b)=>{let c=b.substring(6).toLowerCase().replace(/_([a-z])/g,(a,b)=>b.toUpperCase()),d=process.env[b];return d=!!/^(yes|on|true|enabled)$/i.test(d)||!/^(no|off|false|disabled)$/i.test(d)&&("null"===d?null:Number(d)),a[c]=d,a},{}),b.exports=a.r(557916)(c);let{formatters:f}=b.exports;f.o=function(a){return this.inspectOpts.colors=this.useColors,e.inspect(a,this.inspectOpts).split("\n").map(a=>a.trim()).join(" ")},f.O=function(a){return this.inspectOpts.colors=this.useColors,e.inspect(a,this.inspectOpts)}},329180,(a,b,c)=>{let d;c.formatArgs=function(a){if(a[0]=(this.useColors?"%c":"")+this.namespace+(this.useColors?" %c":" ")+a[0]+(this.useColors?"%c ":" ")+"+"+b.exports.humanize(this.diff),!this.useColors)return;let c="color: "+this.color;a.splice(1,0,c,"color: inherit");let d=0,e=0;a[0].replace(/%[a-zA-Z%]/g,a=>{"%%"!==a&&(d++,"%c"===a&&(e=d))}),a.splice(e,0,c)},c.save=function(a){try{a?c.storage.setItem("debug",a):c.storage.removeItem("debug")}catch(a){}},c.load=function(){let a;try{a=c.storage.getItem("debug")||c.storage.getItem("DEBUG")}catch(a){}return!a&&"undefined"!=typeof process&&"env"in process&&(a=process.env.DEBUG),a},c.useColors=function(){let a;return!("undefined"!=typeof navigator&&navigator.userAgent&&navigator.userAgent.toLowerCase().match(/(edge|trident)\/(\d+)/))&&("undefined"!=typeof document&&document.documentElement&&document.documentElement.style&&document.documentElement.style.WebkitAppearance||"undefined"!=typeof navigator&&navigator.userAgent&&(a=navigator.userAgent.toLowerCase().match(/firefox\/(\d+)/))&&parseInt(a[1],10)>=31||"undefined"!=typeof navigator&&navigator.userAgent&&navigator.userAgent.toLowerCase().match(/applewebkit\/(\d+)/))},c.storage=function(){try{return localStorage}catch(a){}}(),d=!1,c.destroy=()=>{d||(d=!0,console.warn("Instance method `debug.destroy()` is deprecated and no longer does anything. It will be removed in the next major version of `debug`."))},c.colors=["#0000CC","#0000FF","#0033CC","#0033FF","#0066CC","#0066FF","#0099CC","#0099FF","#00CC00","#00CC33","#00CC66","#00CC99","#00CCCC","#00CCFF","#3300CC","#3300FF","#3333CC","#3333FF","#3366CC","#3366FF","#3399CC","#3399FF","#33CC00","#33CC33","#33CC66","#33CC99","#33CCCC","#33CCFF","#6600CC","#6600FF","#6633CC","#6633FF","#66CC00","#66CC33","#9900CC","#9900FF","#9933CC","#9933FF","#99CC00","#99CC33","#CC0000","#CC0033","#CC0066","#CC0099","#CC00CC","#CC00FF","#CC3300","#CC3333","#CC3366","#CC3399","#CC33CC","#CC33FF","#CC6600","#CC6633","#CC9900","#CC9933","#CCCC00","#CCCC33","#FF0000","#FF0033","#FF0066","#FF0099","#FF00CC","#FF00FF","#FF3300","#FF3333","#FF3366","#FF3399","#FF33CC","#FF33FF","#FF6600","#FF6633","#FF9900","#FF9933","#FFCC00","#FFCC33"],c.log=console.debug||console.log||(()=>{}),b.exports=a.r(557916)(c);let{formatters:e}=b.exports;e.j=function(a){try{return JSON.stringify(a)}catch(a){return"[UnexpectedJSONParseError]: "+a.message}}},42071,(a,b,c)=>{"undefined"==typeof process||"renderer"===process.type||process.__nwjs?b.exports=a.r(329180):b.exports=a.r(415714)},62754,(a,b,c)=>{"use strict";Object.defineProperty(c,"__esModule",{value:!0}),c.genRedactedString=c.getStringValue=c.MAX_ARGUMENT_LENGTH=void 0;let d=a.r(42071);function e(a){if(null!==a)switch(typeof a){case"boolean":case"number":return;case"object":if(Buffer.isBuffer(a))return a.toString("hex");if(Array.isArray(a))return a.join(",");try{return JSON.stringify(a)}catch(a){return}case"string":return a}}function f(a,b){let{length:c}=a;return c<=b?a:a.slice(0,b)+' ... <REDACTED full-length="'+c+'">'}c.MAX_ARGUMENT_LENGTH=200,c.getStringValue=e,c.genRedactedString=f,c.default=function(a){let b=(0,d.default)(`ioredis:${a}`);function c(...a){if(b.enabled){for(let b=1;b<a.length;b++){let c=e(a[b]);"string"==typeof c&&c.length>200&&(a[b]=f(c,200))}return b.apply(null,a)}}return Object.defineProperties(c,{namespace:{get:()=>b.namespace},enabled:{get:()=>b.enabled},destroy:{get:()=>b.destroy},log:{get:()=>b.log,set(a){b.log=a}}}),c}},167373,(a,b,c)=>{"use strict";Object.defineProperty(c,"__esModule",{value:!0});let d=`-----BEGIN CERTIFICATE-----
MIIDTzCCAjegAwIBAgIJAKSVpiDswLcwMA0GCSqGSIb3DQEBBQUAMD4xFjAUBgNV
BAoMDUdhcmFudGlhIERhdGExJDAiBgNVBAMMG1NTTCBDZXJ0aWZpY2F0aW9uIEF1
dGhvcml0eTAeFw0xMzEwMDExMjE0NTVaFw0yMzA5MjkxMjE0NTVaMD4xFjAUBgNV
BAoMDUdhcmFudGlhIERhdGExJDAiBgNVBAMMG1NTTCBDZXJ0aWZpY2F0aW9uIEF1
dGhvcml0eTCCASIwDQYJKoZIhvcNAQEBBQADggEPADCCAQoCggEBALZqkh/DczWP
JnxnHLQ7QL0T4B4CDKWBKCcisriGbA6ZePWVNo4hfKQC6JrzfR+081NeD6VcWUiz
rmd+jtPhIY4c+WVQYm5PKaN6DT1imYdxQw7aqO5j2KUCEh/cznpLxeSHoTxlR34E
QwF28Wl3eg2vc5ct8LjU3eozWVk3gb7alx9mSA2SgmuX5lEQawl++rSjsBStemY2
BDwOpAMXIrdEyP/cVn8mkvi/BDs5M5G+09j0gfhyCzRWMQ7Hn71u1eolRxwVxgi3
TMn+/vTaFSqxKjgck6zuAYjBRPaHe7qLxHNr1So/Mc9nPy+3wHebFwbIcnUojwbp
4nctkWbjb2cCAwEAAaNQME4wHQYDVR0OBBYEFP1whtcrydmW3ZJeuSoKZIKjze3w
MB8GA1UdIwQYMBaAFP1whtcrydmW3ZJeuSoKZIKjze3wMAwGA1UdEwQFMAMBAf8w
DQYJKoZIhvcNAQEFBQADggEBAG2erXhwRAa7+ZOBs0B6X57Hwyd1R4kfmXcs0rta
lbPpvgULSiB+TCbf3EbhJnHGyvdCY1tvlffLjdA7HJ0PCOn+YYLBA0pTU/dyvrN6
Su8NuS5yubnt9mb13nDGYo1rnt0YRfxN+8DM3fXIVr038A30UlPX2Ou1ExFJT0MZ
uFKY6ZvLdI6/1cbgmguMlAhM+DhKyV6Sr5699LM3zqeI816pZmlREETYkGr91q7k
BpXJu/dtHaGxg1ZGu6w/PCsYGUcECWENYD4VQPd8N32JjOfu6vEgoEAwfPP+3oGp
Z4m3ewACcWOAenqflb+cQYC4PsF7qbXDmRaWrbKntOlZ3n0=
-----END CERTIFICATE-----
-----BEGIN CERTIFICATE-----
MIIGMTCCBBmgAwIBAgICEAAwDQYJKoZIhvcNAQELBQAwajELMAkGA1UEBhMCVVMx
CzAJBgNVBAgMAkNBMQswCQYDVQQHDAJDQTESMBAGA1UECgwJUmVkaXNMYWJzMS0w
KwYDVQQDDCRSZWRpc0xhYnMgUm9vdCBDZXJ0aWZpY2F0ZSBBdXRob3JpdHkwHhcN
MTgwMjI1MTUzNzM3WhcNMjgwMjIzMTUzNzM3WjBfMQswCQYDVQQGEwJVUzELMAkG
A1UECAwCQ0ExEjAQBgNVBAoMCVJlZGlzTGFiczEvMC0GA1UEAwwmUkNQIEludGVy
bWVkaWF0ZSBDZXJ0aWZpY2F0ZSBBdXRob3JpdHkwggIiMA0GCSqGSIb3DQEBAQUA
A4ICDwAwggIKAoICAQDf9dqbxc8Bq7Ctq9rWcxrGNKKHivqLAFpPq02yLPx6fsOv
Tq7GsDChAYBBc4v7Y2Ap9RD5Vs3dIhEANcnolf27QwrG9RMnnvzk8pCvp1o6zSU4
VuOE1W66/O1/7e2rVxyrnTcP7UgK43zNIXu7+tiAqWsO92uSnuMoGPGpeaUm1jym
hjWKtkAwDFSqvHY+XL5qDVBEjeUe+WHkYUg40cAXjusAqgm2hZt29c2wnVrxW25W
P0meNlzHGFdA2AC5z54iRiqj57dTfBTkHoBczQxcyw6hhzxZQ4e5I5zOKjXXEhZN
r0tA3YC14CTabKRus/JmZieyZzRgEy2oti64tmLYTqSlAD78pRL40VNoaSYetXLw
hhNsXCHgWaY6d5bLOc/aIQMAV5oLvZQKvuXAF1IDmhPA+bZbpWipp0zagf1P1H3s
UzsMdn2KM0ejzgotbtNlj5TcrVwpmvE3ktvUAuA+hi3FkVx1US+2Gsp5x4YOzJ7u
P1WPk6ShF0JgnJH2ILdj6kttTWwFzH17keSFICWDfH/+kM+k7Y1v3EXMQXE7y0T9
MjvJskz6d/nv+sQhY04xt64xFMGTnZjlJMzfQNi7zWFLTZnDD0lPowq7l3YiPoTT
t5Xky83lu0KZsZBo0WlWaDG00gLVdtRgVbcuSWxpi5BdLb1kRab66JptWjxwXQID
AQABo4HrMIHoMDoGA1UdHwQzMDEwL6AtoCuGKWh0dHBzOi8vcmwtY2Etc2VydmVy
LnJlZGlzbGFicy5jb20vdjEvY3JsMEYGCCsGAQUFBwEBBDowODA2BggrBgEFBQcw
AYYqaHR0cHM6Ly9ybC1jYS1zZXJ2ZXIucmVkaXNsYWJzLmNvbS92MS9vY3NwMB0G
A1UdDgQWBBQHar5OKvQUpP2qWt6mckzToeCOHDAfBgNVHSMEGDAWgBQi42wH6hM4
L2sujEvLM0/u8lRXTzASBgNVHRMBAf8ECDAGAQH/AgEAMA4GA1UdDwEB/wQEAwIB
hjANBgkqhkiG9w0BAQsFAAOCAgEAirEn/iTsAKyhd+pu2W3Z5NjCko4NPU0EYUbr
AP7+POK2rzjIrJO3nFYQ/LLuC7KCXG+2qwan2SAOGmqWst13Y+WHp44Kae0kaChW
vcYLXXSoGQGC8QuFSNUdaeg3RbMDYFT04dOkqufeWVccoHVxyTSg9eD8LZuHn5jw
7QDLiEECBmIJHk5Eeo2TAZrx4Yx6ufSUX5HeVjlAzqwtAqdt99uCJ/EL8bgpWbe+
XoSpvUv0SEC1I1dCAhCKAvRlIOA6VBcmzg5Am12KzkqTul12/VEFIgzqu0Zy2Jbc
AUPrYVu/+tOGXQaijy7YgwH8P8n3s7ZeUa1VABJHcxrxYduDDJBLZi+MjheUDaZ1
jQRHYevI2tlqeSBqdPKG4zBY5lS0GiAlmuze5oENt0P3XboHoZPHiqcK3VECgTVh
/BkJcuudETSJcZDmQ8YfoKfBzRQNg2sv/hwvUv73Ss51Sco8GEt2lD8uEdib1Q6z
zDT5lXJowSzOD5ZA9OGDjnSRL+2riNtKWKEqvtEG3VBJoBzu9GoxbAc7wIZLxmli
iF5a/Zf5X+UXD3s4TMmy6C4QZJpAA2egsSQCnraWO2ULhh7iXMysSkF/nzVfZn43
iqpaB8++9a37hWq14ZmOv0TJIDz//b2+KC4VFXWQ5W5QC6whsjT+OlG4p5ZYG0jo
616pxqo=
-----END CERTIFICATE-----
-----BEGIN CERTIFICATE-----
MIIFujCCA6KgAwIBAgIJAJ1aTT1lu2ScMA0GCSqGSIb3DQEBCwUAMGoxCzAJBgNV
BAYTAlVTMQswCQYDVQQIDAJDQTELMAkGA1UEBwwCQ0ExEjAQBgNVBAoMCVJlZGlz
TGFiczEtMCsGA1UEAwwkUmVkaXNMYWJzIFJvb3QgQ2VydGlmaWNhdGUgQXV0aG9y
aXR5MB4XDTE4MDIyNTE1MjA0MloXDTM4MDIyMDE1MjA0MlowajELMAkGA1UEBhMC
VVMxCzAJBgNVBAgMAkNBMQswCQYDVQQHDAJDQTESMBAGA1UECgwJUmVkaXNMYWJz
MS0wKwYDVQQDDCRSZWRpc0xhYnMgUm9vdCBDZXJ0aWZpY2F0ZSBBdXRob3JpdHkw
ggIiMA0GCSqGSIb3DQEBAQUAA4ICDwAwggIKAoICAQDLEjXy7YrbN5Waau5cd6g1
G5C2tMmeTpZ0duFAPxNU4oE3RHS5gGiok346fUXuUxbZ6QkuzeN2/2Z+RmRcJhQY
Dm0ZgdG4x59An1TJfnzKKoWj8ISmoHS/TGNBdFzXV7FYNLBuqZouqePI6ReC6Qhl
pp45huV32Q3a6IDrrvx7Wo5ZczEQeFNbCeCOQYNDdTmCyEkHqc2AGo8eoIlSTutT
ULOC7R5gzJVTS0e1hesQ7jmqHjbO+VQS1NAL4/5K6cuTEqUl+XhVhPdLWBXJQ5ag
54qhX4v+ojLzeU1R/Vc6NjMvVtptWY6JihpgplprN0Yh2556ewcXMeturcKgXfGJ
xeYzsjzXerEjrVocX5V8BNrg64NlifzTMKNOOv4fVZszq1SIHR8F9ROrqiOdh8iC
JpUbLpXH9hWCSEO6VRMB2xJoKu3cgl63kF30s77x7wLFMEHiwsQRKxooE1UhgS9K
2sO4TlQ1eWUvFvHSTVDQDlGQ6zu4qjbOpb3Q8bQwoK+ai2alkXVR4Ltxe9QlgYK3
StsnPhruzZGA0wbXdpw0bnM+YdlEm5ffSTpNIfgHeaa7Dtb801FtA71ZlH7A6TaI
SIQuUST9EKmv7xrJyx0W1pGoPOLw5T029aTjnICSLdtV9bLwysrLhIYG5bnPq78B
cS+jZHFGzD7PUVGQD01nOQIDAQABo2MwYTAdBgNVHQ4EFgQUIuNsB+oTOC9rLoxL
yzNP7vJUV08wHwYDVR0jBBgwFoAUIuNsB+oTOC9rLoxLyzNP7vJUV08wDwYDVR0T
AQH/BAUwAwEB/zAOBgNVHQ8BAf8EBAMCAYYwDQYJKoZIhvcNAQELBQADggIBAHfg
z5pMNUAKdMzK1aS1EDdK9yKz4qicILz5czSLj1mC7HKDRy8cVADUxEICis++CsCu
rYOvyCVergHQLREcxPq4rc5Nq1uj6J6649NEeh4WazOOjL4ZfQ1jVznMbGy+fJm3
3Hoelv6jWRG9iqeJZja7/1s6YC6bWymI/OY1e4wUKeNHAo+Vger7MlHV+RuabaX+
hSJ8bJAM59NCM7AgMTQpJCncrcdLeceYniGy5Q/qt2b5mJkQVkIdy4TPGGB+AXDJ
D0q3I/JDRkDUFNFdeW0js7fHdsvCR7O3tJy5zIgEV/o/BCkmJVtuwPYOrw/yOlKj
TY/U7ATAx9VFF6/vYEOMYSmrZlFX+98L6nJtwDqfLB5VTltqZ4H/KBxGE3IRSt9l
FXy40U+LnXzhhW+7VBAvyYX8GEXhHkKU8Gqk1xitrqfBXY74xKgyUSTolFSfFVgj
mcM/X4K45bka+qpkj7Kfv/8D4j6aZekwhN2ly6hhC1SmQ8qjMjpG/mrWOSSHZFmf
ybu9iD2AYHeIOkshIl6xYIa++Q/00/vs46IzAbQyriOi0XxlSMMVtPx0Q3isp+ji
n8Mq9eOuxYOEQ4of8twUkUDd528iwGtEdwf0Q01UyT84S62N8AySl1ZBKXJz6W4F
UhWfa/HQYOAPDdEjNgnVwLI23b8t0TozyCWw7q8h
-----END CERTIFICATE-----

-----BEGIN CERTIFICATE-----
MIIEjzCCA3egAwIBAgIQe55B/ALCKJDZtdNT8kD6hTANBgkqhkiG9w0BAQsFADBM
MSAwHgYDVQQLExdHbG9iYWxTaWduIFJvb3QgQ0EgLSBSMzETMBEGA1UEChMKR2xv
YmFsU2lnbjETMBEGA1UEAxMKR2xvYmFsU2lnbjAeFw0yMjAxMjYxMjAwMDBaFw0y
NTAxMjYwMDAwMDBaMFgxCzAJBgNVBAYTAkJFMRkwFwYDVQQKExBHbG9iYWxTaWdu
IG52LXNhMS4wLAYDVQQDEyVHbG9iYWxTaWduIEF0bGFzIFIzIE9WIFRMUyBDQSAy
MDIyIFEyMIIBIjANBgkqhkiG9w0BAQEFAAOCAQ8AMIIBCgKCAQEAmGmg1LW9b7Lf
8zDD83yBDTEkt+FOxKJZqF4veWc5KZsQj9HfnUS2e5nj/E+JImlGPsQuoiosLuXD
BVBNAMcUFa11buFMGMeEMwiTmCXoXRrXQmH0qjpOfKgYc5gHG3BsRGaRrf7VR4eg
ofNMG9wUBw4/g/TT7+bQJdA4NfE7Y4d5gEryZiBGB/swaX6Jp/8MF4TgUmOWmalK
dZCKyb4sPGQFRTtElk67F7vU+wdGcrcOx1tDcIB0ncjLPMnaFicagl+daWGsKqTh
counQb6QJtYHa91KvCfKWocMxQ7OIbB5UARLPmC4CJ1/f8YFm35ebfzAeULYdGXu
jE9CLor0OwIDAQABo4IBXzCCAVswDgYDVR0PAQH/BAQDAgGGMB0GA1UdJQQWMBQG
CCsGAQUFBwMBBggrBgEFBQcDAjASBgNVHRMBAf8ECDAGAQH/AgEAMB0GA1UdDgQW
BBSH5Zq7a7B/t95GfJWkDBpA8HHqdjAfBgNVHSMEGDAWgBSP8Et/qC5FJK5NUPpj
move4t0bvDB7BggrBgEFBQcBAQRvMG0wLgYIKwYBBQUHMAGGImh0dHA6Ly9vY3Nw
Mi5nbG9iYWxzaWduLmNvbS9yb290cjMwOwYIKwYBBQUHMAKGL2h0dHA6Ly9zZWN1
cmUuZ2xvYmFsc2lnbi5jb20vY2FjZXJ0L3Jvb3QtcjMuY3J0MDYGA1UdHwQvMC0w
K6ApoCeGJWh0dHA6Ly9jcmwuZ2xvYmFsc2lnbi5jb20vcm9vdC1yMy5jcmwwIQYD
VR0gBBowGDAIBgZngQwBAgIwDAYKKwYBBAGgMgoBAjANBgkqhkiG9w0BAQsFAAOC
AQEAKRic9/f+nmhQU/wz04APZLjgG5OgsuUOyUEZjKVhNGDwxGTvKhyXGGAMW2B/
3bRi+aElpXwoxu3pL6fkElbX3B0BeS5LoDtxkyiVEBMZ8m+sXbocwlPyxrPbX6mY
0rVIvnuUeBH8X0L5IwfpNVvKnBIilTbcebfHyXkPezGwz7E1yhUULjJFm2bt0SdX
y+4X/WeiiYIv+fTVgZZgl+/2MKIsu/qdBJc3f3TvJ8nz+Eax1zgZmww+RSQWeOj3
15Iw6Z5FX+NwzY/Ab+9PosR5UosSeq+9HhtaxZttXG1nVh+avYPGYddWmiMT90J5
ZgKnO/Fx2hBgTxhOTMYaD312kg==
-----END CERTIFICATE-----

-----BEGIN CERTIFICATE-----
MIIDXzCCAkegAwIBAgILBAAAAAABIVhTCKIwDQYJKoZIhvcNAQELBQAwTDEgMB4G
A1UECxMXR2xvYmFsU2lnbiBSb290IENBIC0gUjMxEzARBgNVBAoTCkdsb2JhbFNp
Z24xEzARBgNVBAMTCkdsb2JhbFNpZ24wHhcNMDkwMzE4MTAwMDAwWhcNMjkwMzE4
MTAwMDAwWjBMMSAwHgYDVQQLExdHbG9iYWxTaWduIFJvb3QgQ0EgLSBSMzETMBEG
A1UEChMKR2xvYmFsU2lnbjETMBEGA1UEAxMKR2xvYmFsU2lnbjCCASIwDQYJKoZI
hvcNAQEBBQADggEPADCCAQoCggEBAMwldpB5BngiFvXAg7aEyiie/QV2EcWtiHL8
RgJDx7KKnQRfJMsuS+FggkbhUqsMgUdwbN1k0ev1LKMPgj0MK66X17YUhhB5uzsT
gHeMCOFJ0mpiLx9e+pZo34knlTifBtc+ycsmWQ1z3rDI6SYOgxXG71uL0gRgykmm
KPZpO/bLyCiR5Z2KYVc3rHQU3HTgOu5yLy6c+9C7v/U9AOEGM+iCK65TpjoWc4zd
QQ4gOsC0p6Hpsk+QLjJg6VfLuQSSaGjlOCZgdbKfd/+RFO+uIEn8rUAVSNECMWEZ
XriX7613t2Saer9fwRPvm2L7DWzgVGkWqQPabumDk3F2xmmFghcCAwEAAaNCMEAw
DgYDVR0PAQH/BAQDAgEGMA8GA1UdEwEB/wQFMAMBAf8wHQYDVR0OBBYEFI/wS3+o
LkUkrk1Q+mOai97i3Ru8MA0GCSqGSIb3DQEBCwUAA4IBAQBLQNvAUKr+yAzv95ZU
RUm7lgAJQayzE4aGKAczymvmdLm6AC2upArT9fHxD4q/c2dKg8dEe3jgr25sbwMp
jjM5RcOO5LlXbKr8EpbsU8Yt5CRsuZRj+9xTaGdWPoO4zzUhw8lo/s7awlOqzJCK
6fBdRoyV3XpYKBovHd7NADdBj+1EbddTKJd+82cEHhXXipa0095MJ6RMG3NzdvQX
mcIfeg7jLQitChws/zyrVQ4PkX4268NXSb7hLi18YIvDQVETI53O9zJrlAGomecs
Mx86OyXShkDOOyyGeMlhLxS67ttVb9+E7gUJTb0o2HLO02JQZR7rkpeDMdmztcpH
WD9f
-----END CERTIFICATE-----`;c.default={RedisCloudFixed:{ca:d},RedisCloudFlexible:{ca:d}}},473501,(a,b,c)=>{"use strict";Object.defineProperty(c,"__esModule",{value:!0}),c.noop=c.defaults=c.Debug=c.getPackageMeta=c.zipMap=c.CONNECTION_CLOSED_ERROR_MSG=c.shuffle=c.sample=c.resolveTLSProfile=c.parseURL=c.optimizeErrorStack=c.toArg=c.convertMapToArray=c.convertObjectToArray=c.timeout=c.packObject=c.isInt=c.wrapMultiResult=c.convertBufferToString=void 0;let d=a.r(522734),e=a.r(814747),f=a.r(792509),g=a.r(159973);Object.defineProperty(c,"defaults",{enumerable:!0,get:function(){return g.defaults}}),Object.defineProperty(c,"noop",{enumerable:!0,get:function(){return g.noop}}),c.Debug=a.r(62754).default;let h=a.r(167373);function i(a){let b=parseFloat(a);return!isNaN(a)&&(0|b)===b}c.convertBufferToString=function a(b,c){if(b instanceof Buffer)return b.toString(c);if(Array.isArray(b)){let d=b.length,e=Array(d);for(let f=0;f<d;++f)e[f]=b[f]instanceof Buffer&&"utf8"===c?b[f].toString():a(b[f],c);return e}return b},c.wrapMultiResult=function(a){if(!a)return null;let b=[],c=a.length;for(let d=0;d<c;++d){let c=a[d];c instanceof Error?b.push([c]):b.push([null,c])}return b},c.isInt=i,c.packObject=function(a){let b={},c=a.length;for(let d=1;d<c;d+=2)b[a[d-1]]=a[d];return b},c.timeout=function(a,b){let c=null,d=function(){c&&(clearTimeout(c),c=null,a.apply(this,arguments))};return c=setTimeout(d,b,Error("timeout")),d},c.convertObjectToArray=function(a){let b=[],c=Object.keys(a);for(let d=0,e=c.length;d<e;d++)b.push(c[d],a[c[d]]);return b},c.convertMapToArray=function(a){let b=[],c=0;return a.forEach(function(a,d){b[c]=d,b[c+1]=a,c+=2}),b},c.toArg=function(a){return null==a?"":String(a)},c.optimizeErrorStack=function(a,b,c){let d,e=b.split("\n"),f="";for(d=1;d<e.length&&-1!==e[d].indexOf(c);++d);for(let a=d;a<e.length;++a)f+="\n"+e[a];if(a.stack){let b=a.stack.indexOf("\n");a.stack=a.stack.slice(0,b)+f}return a},c.parseURL=function(a){if(i(a))return{port:a};let b=(0,f.parse)(a,!0,!0);b.slashes||"/"===a[0]||(a="//"+a,b=(0,f.parse)(a,!0,!0));let c=b.query||{},d={};if(b.auth){let a=b.auth.indexOf(":");d.username=-1===a?b.auth:b.auth.slice(0,a),d.password=-1===a?"":b.auth.slice(a+1)}if(b.pathname&&("redis:"===b.protocol||"rediss:"===b.protocol?b.pathname.length>1&&(d.db=b.pathname.slice(1)):d.path=b.pathname),b.host&&(d.host=b.hostname),b.port&&(d.port=b.port),"string"==typeof c.family){let a=Number.parseInt(c.family,10);Number.isNaN(a)||(d.family=a)}return(0,g.defaults)(d,c),d},c.resolveTLSProfile=function(a){let b=null==a?void 0:a.tls;"string"==typeof b&&(b={profile:b});let c=h.default[null==b?void 0:b.profile];return c&&(b=Object.assign({},c,b),delete b.profile,a=Object.assign({},a,{tls:b})),a},c.sample=function(a,b=0){let c=a.length;return b>=c?null:a[b+Math.floor(Math.random()*(c-b))]},c.shuffle=function(a){let b=a.length;for(;b>0;){let c=Math.floor(Math.random()*b);b--,[a[b],a[c]]=[a[c],a[b]]}return a},c.CONNECTION_CLOSED_ERROR_MSG="Connection is closed.",c.zipMap=function(a,b){let c=new Map;return a.forEach((a,d)=>{c.set(a,b[d])}),c};let j=null;c.getPackageMeta=async function(){if(j)return j;try{let a=(0,e.resolve)("/ROOT/node_modules/.pnpm/ioredis@5.8.2/node_modules/ioredis/built/utils","..","..","package.json"),b=await d.promises.readFile(a,"utf8");return j={version:JSON.parse(b).version}}catch(a){return j={version:"error-fetching-version"}}}},683302,(a,b,c)=>{"use strict";Object.defineProperty(c,"__esModule",{value:!0});let d=a.r(870791),e=a.r(749060),f=a.r(662839),g=a.r(473501);class h{constructor(a,b=[],c={},d){if(this.name=a,this.inTransaction=!1,this.isResolved=!1,this.transformed=!1,this.replyEncoding=c.replyEncoding,this.errorStack=c.errorStack,this.args=b.flat(),this.callback=d,this.initPromise(),c.keyPrefix){const a=c.keyPrefix instanceof Buffer;let b=a?c.keyPrefix:null;this._iterateKeys(d=>d instanceof Buffer?(null===b&&(b=Buffer.from(c.keyPrefix)),Buffer.concat([b,d])):a?Buffer.concat([c.keyPrefix,Buffer.from(String(d))]):c.keyPrefix+d)}c.readOnly&&(this.isReadOnly=!0)}static checkFlag(a,b){return!!this.getFlagMap()[a][b]}static setArgumentTransformer(a,b){this._transformer.argument[a]=b}static setReplyTransformer(a,b){this._transformer.reply[a]=b}static getFlagMap(){return this.flagMap||(this.flagMap=Object.keys(h.FLAGS).reduce((a,b)=>(a[b]={},h.FLAGS[b].forEach(c=>{a[b][c]=!0}),a),{})),this.flagMap}getSlot(){if(void 0===this.slot){let a=this.getKeys()[0];this.slot=null==a?null:e(a)}return this.slot}getKeys(){return this._iterateKeys()}toWritable(a){let b,c="*"+(this.args.length+1)+"\r\n$"+Buffer.byteLength(this.name)+"\r\n"+this.name+"\r\n";if(this.bufferMode){let a=new k;a.push(c);for(let b=0;b<this.args.length;++b){let c=this.args[b];c instanceof Buffer?0===c.length?a.push("$0\r\n\r\n"):(a.push("$"+c.length+"\r\n"),a.push(c),a.push("\r\n")):a.push("$"+Buffer.byteLength(c)+"\r\n"+c+"\r\n")}b=a.toBuffer()}else{b=c;for(let a=0;a<this.args.length;++a){let c=this.args[a];b+="$"+Buffer.byteLength(c)+"\r\n"+c+"\r\n"}}return b}stringifyArguments(){for(let a=0;a<this.args.length;++a){let b=this.args[a];"string"==typeof b||(b instanceof Buffer?this.bufferMode=!0:this.args[a]=(0,g.toArg)(b))}}transformReply(a){this.replyEncoding&&(a=(0,g.convertBufferToString)(a,this.replyEncoding));let b=h._transformer.reply[this.name];return b&&(a=b(a)),a}setTimeout(a){this._commandTimeoutTimer||(this._commandTimeoutTimer=setTimeout(()=>{this.isResolved||this.reject(Error("Command timed out"))},a))}initPromise(){let a=new Promise((a,b)=>{if(!this.transformed){this.transformed=!0;let a=h._transformer.argument[this.name];a&&(this.args=a(this.args)),this.stringifyArguments()}this.resolve=this._convertValue(a),this.errorStack?this.reject=a=>{b((0,g.optimizeErrorStack)(a,this.errorStack.stack,"/ROOT/node_modules/.pnpm/ioredis@5.8.2/node_modules/ioredis/built"))}:this.reject=b});this.promise=(0,f.default)(a,this.callback)}_iterateKeys(a=a=>a){if(void 0===this.keys&&(this.keys=[],(0,d.exists)(this.name)))for(let b of(0,d.getKeyIndexes)(this.name,this.args))this.args[b]=a(this.args[b]),this.keys.push(this.args[b]);return this.keys}_convertValue(a){return b=>{try{let c=this._commandTimeoutTimer;c&&(clearTimeout(c),delete this._commandTimeoutTimer),a(this.transformReply(b)),this.isResolved=!0}catch(a){this.reject(a)}return this.promise}}}c.default=h,h.FLAGS={VALID_IN_SUBSCRIBER_MODE:["subscribe","psubscribe","unsubscribe","punsubscribe","ssubscribe","sunsubscribe","ping","quit"],VALID_IN_MONITOR_MODE:["monitor","auth"],ENTER_SUBSCRIBER_MODE:["subscribe","psubscribe","ssubscribe"],EXIT_SUBSCRIBER_MODE:["unsubscribe","punsubscribe","sunsubscribe"],WILL_DISCONNECT:["quit"],HANDSHAKE_COMMANDS:["auth","select","client","readonly","info"],IGNORE_RECONNECT_ON_ERROR:["client"]},h._transformer={argument:{},reply:{}};let i=function(a){if(1===a.length){if(a[0]instanceof Map)return(0,g.convertMapToArray)(a[0]);if("object"==typeof a[0]&&null!==a[0])return(0,g.convertObjectToArray)(a[0])}return a},j=function(a){if(2===a.length){if(a[1]instanceof Map)return[a[0]].concat((0,g.convertMapToArray)(a[1]));if("object"==typeof a[1]&&null!==a[1])return[a[0]].concat((0,g.convertObjectToArray)(a[1]))}return a};h.setArgumentTransformer("mset",i),h.setArgumentTransformer("msetnx",i),h.setArgumentTransformer("hset",j),h.setArgumentTransformer("hmset",j),h.setReplyTransformer("hgetall",function(a){if(Array.isArray(a)){let b={};for(let c=0;c<a.length;c+=2){let d=a[c],e=a[c+1];d in b?Object.defineProperty(b,d,{value:e,configurable:!0,enumerable:!0,writable:!0}):b[d]=e}return b}return a});class k{constructor(){this.length=0,this.items=[]}push(a){this.length+=Buffer.byteLength(a),this.items.push(a)}toBuffer(){let a=Buffer.allocUnsafe(this.length),b=0;for(let c of this.items){let d=Buffer.byteLength(c);Buffer.isBuffer(c)?c.copy(a,b):a.write(c,b,d),b+=d}return a}}},184439,(a,b,c)=>{"use strict";Object.defineProperty(c,"__esModule",{value:!0});let d=a.r(223950);class e extends d.RedisError{constructor(a,b){super(a),this.lastNodeError=b,Error.captureStackTrace(this,this.constructor)}get name(){return this.constructor.name}}c.default=e,e.defaultMessage="Failed to refresh slots cache."},394558,(a,b,c)=>{"use strict";Object.defineProperty(c,"__esModule",{value:!0});let d=a.r(688947);class e extends d.Readable{constructor(a){super(a),this.opt=a,this._redisCursor="0",this._redisDrained=!1}_read(){if(this._redisDrained)return void this.push(null);let a=[this._redisCursor];this.opt.key&&a.unshift(this.opt.key),this.opt.match&&a.push("MATCH",this.opt.match),this.opt.type&&a.push("TYPE",this.opt.type),this.opt.count&&a.push("COUNT",String(this.opt.count)),this.opt.noValues&&a.push("NOVALUES"),this.opt.redis[this.opt.command](a,(a,b)=>{a?this.emit("error",a):(this._redisCursor=b[0]instanceof Buffer?b[0].toString():b[0],"0"===this._redisCursor&&(this._redisDrained=!0),this.push(b[1]))})}close(){this._redisDrained=!0}}c.default=e},586016,(a,b,c)=>{"use strict";Object.defineProperty(c,"__esModule",{value:!0}),c.executeWithAutoPipelining=c.getFirstValueInFlattenedArray=c.shouldUseAutoPipelining=c.notAllowedAutoPipelineCommands=c.kCallbacks=c.kExec=void 0;let d=a.r(159973),e=a.r(749060),f=a.r(662839);function g(a){for(let b=0;b<a.length;b++){let c=a[b];if("string"==typeof c)return c;if(Array.isArray(c)||(0,d.isArguments)(c)){if(0===c.length)continue;return c[0]}let e=[c].flat();if(e.length>0)return e[0]}}c.kExec=Symbol("exec"),c.kCallbacks=Symbol("callbacks"),c.notAllowedAutoPipelineCommands=["auth","info","script","quit","cluster","pipeline","multi","subscribe","psubscribe","unsubscribe","unpsubscribe","select","client"],c.shouldUseAutoPipelining=function(a,b,d){return b&&a.options.enableAutoPipelining&&!a.isPipeline&&!c.notAllowedAutoPipelineCommands.includes(d)&&!a.options.autoPipeliningIgnoredCommands.includes(d)},c.getFirstValueInFlattenedArray=g,c.executeWithAutoPipelining=function a(b,h,i,j,k){if(b.isCluster&&!b.slots.length)return"wait"===b.status&&b.connect().catch(d.noop),(0,f.default)(new Promise(function(c,d){b.delayUntilReady(e=>{e?d(e):a(b,h,i,j,null).then(c,d)})}),k);let l=b.options.keyPrefix||"",m=b.isCluster?b.slots[e(`${l}${g(j)}`)].join(","):"main";if(!b._autoPipelines.has(m)){let a=b.pipeline();a[c.kExec]=!1,a[c.kCallbacks]=[],b._autoPipelines.set(m,a)}let n=b._autoPipelines.get(m);n[c.kExec]||(n[c.kExec]=!0,setImmediate(function a(b,d){if(b._runningAutoPipelines.has(d)||!b._autoPipelines.has(d))return;b._runningAutoPipelines.add(d);let e=b._autoPipelines.get(d);b._autoPipelines.delete(d);let f=e[c.kCallbacks];e[c.kCallbacks]=null,e.exec(function(c,e){if(b._runningAutoPipelines.delete(d),c)for(let a=0;a<f.length;a++)process.nextTick(f[a],c);else for(let a=0;a<f.length;a++)process.nextTick(f[a],...e[a]);b._autoPipelines.has(d)&&a(b,d)})},b,m));let o=new Promise(function(a,b){n[c.kCallbacks].push(function(c,d){c?b(c):a(d)}),"call"===h&&j.unshift(i),n[h](...j)});return(0,f.default)(o,k)}},400376,(a,b,c)=>{"use strict";Object.defineProperty(c,"__esModule",{value:!0});let d=a.r(254799),e=a.r(683302),f=a.r(662839);c.default=class{constructor(a,b=null,c="",f=!1){this.lua=a,this.numberOfKeys=b,this.keyPrefix=c,this.readOnly=f,this.sha=(0,d.createHash)("sha1").update(a).digest("hex");const g=this.sha,h=new WeakSet;this.Command=class extends e.default{toWritable(b){let c=this.reject;return this.reject=a=>{-1!==a.message.indexOf("NOSCRIPT")&&h.delete(b),c.call(this,a)},h.has(b)?"eval"===this.name&&(this.name="evalsha",this.args[0]=g):(h.add(b),this.name="eval",this.args[0]=a),super.toWritable(b)}}}execute(a,b,c,d){"number"==typeof this.numberOfKeys&&b.unshift(this.numberOfKeys),this.keyPrefix&&(c.keyPrefix=this.keyPrefix),this.readOnly&&(c.readOnly=!0);let e=new this.Command("evalsha",[this.sha,...b],c);return e.promise=e.promise.catch(d=>{if(-1===d.message.indexOf("NOSCRIPT"))throw d;let e=new this.Command("evalsha",[this.sha,...b],c);return(a.isPipeline?a.redis:a).sendCommand(e)}),(0,f.default)(e.promise,d),a.sendCommand(e)}}},554e3,(a,b,c)=>{"use strict";Object.defineProperty(c,"__esModule",{value:!0});let d=a.r(870791),e=a.r(586016),f=a.r(683302),g=a.r(400376);class h{constructor(){this.options={},this.scriptsSet={},this.addedBuiltinSet=new Set}getBuiltinCommands(){return i.slice(0)}createBuiltinCommand(a){return{string:j(null,a,"utf8"),buffer:j(null,a,null)}}addBuiltinCommand(a){this.addedBuiltinSet.add(a),this[a]=j(a,a,"utf8"),this[a+"Buffer"]=j(a+"Buffer",a,null)}defineCommand(a,b){let c=new g.default(b.lua,b.numberOfKeys,this.options.keyPrefix,b.readOnly);this.scriptsSet[a]=c,this[a]=k(a,a,c,"utf8"),this[a+"Buffer"]=k(a+"Buffer",a,c,null)}sendCommand(a,b,c){throw Error('"sendCommand" is not implemented')}}let i=d.list.filter(a=>"monitor"!==a);function j(a,b,c){return void 0===c&&(c=b,b=null),function(...d){let g=b||d.shift(),h=d[d.length-1];"function"==typeof h?d.pop():h=void 0;let i={errorStack:this.options.showFriendlyErrorStack?Error():void 0,keyPrefix:this.options.keyPrefix,replyEncoding:c};return(0,e.shouldUseAutoPipelining)(this,a,g)?(0,e.executeWithAutoPipelining)(this,a,g,d,h):this.sendCommand(new f.default(g,d,i,h))}}function k(a,b,c,d){return function(...f){let g="function"==typeof f[f.length-1]?f.pop():void 0,h={replyEncoding:d};return(this.options.showFriendlyErrorStack&&(h.errorStack=Error()),(0,e.shouldUseAutoPipelining)(this,a,b))?(0,e.executeWithAutoPipelining)(this,a,b,f,g):c.execute(this,f,h,g)}}i.push("sentinel"),i.forEach(function(a){h.prototype[a]=j(a,a,"utf8"),h.prototype[a+"Buffer"]=j(a+"Buffer",a,null)}),h.prototype.call=j("call","utf8"),h.prototype.callBuffer=j("callBuffer",null),h.prototype.send_command=h.prototype.call,c.default=h},542541,(a,b,c)=>{"use strict";Object.defineProperty(c,"__esModule",{value:!0});let d=a.r(749060),e=a.r(870791),f=a.r(662839),g=a.r(224361),h=a.r(683302),i=a.r(473501),j=a.r(554e3);class k extends j.default{constructor(a){super(),this.redis=a,this.isPipeline=!0,this.replyPending=0,this._queue=[],this._result=[],this._transactions=0,this._shaToScript={},this.isCluster="Cluster"===this.redis.constructor.name||this.redis.isCluster,this.options=a.options,Object.keys(a.scriptsSet).forEach(b=>{let c=a.scriptsSet[b];this._shaToScript[c.sha]=c,this[b]=a[b],this[b+"Buffer"]=a[b+"Buffer"]}),a.addedBuiltinSet.forEach(b=>{this[b]=a[b],this[b+"Buffer"]=a[b+"Buffer"]}),this.promise=new Promise((a,b)=>{this.resolve=a,this.reject=b});const b=this;Object.defineProperty(this,"length",{get:function(){return b._queue.length}})}fillResult(a,b){if("exec"===this._queue[b].name&&Array.isArray(a[1])){let c=a[1].length;for(let d=0;d<c;d++){if(a[1][d]instanceof Error)continue;let e=this._queue[b-(c-d)];try{a[1][d]=e.transformReply(a[1][d])}catch(b){a[1][d]=b}}}if(this._result[b]=a,--this.replyPending)return;if(this.isCluster){let a,b=!0;for(let c=0;c<this._result.length;++c){let d=this._result[c][0],f=this._queue[c];if(d){if("exec"===f.name&&"EXECABORT Transaction discarded because of previous errors."===d.message)continue;if(a){if(a.name!==d.name||a.message!==d.message){b=!1;break}}else a={name:d.name,message:d.message}}else if(!f.inTransaction&&!((0,e.exists)(f.name)&&(0,e.hasFlag)(f.name,"readonly"))){b=!1;break}}if(a&&b){let b=this,c=a.message.split(" "),d=this._queue,e=!1;this._queue=[];for(let a=0;a<d.length;++a){if("ASK"===c[0]&&!e&&"asking"!==d[a].name&&(!d[a-1]||"asking"!==d[a-1].name)){let a=new h.default("asking");a.ignore=!0,this.sendCommand(a)}d[a].initPromise(),this.sendCommand(d[a]),e=d[a].inTransaction}let f=!0;void 0===this.leftRedirections&&(this.leftRedirections={});let g=function(){b.exec()},i=this.redis;if(i.handleError(a,this.leftRedirections,{moved:function(a,d){b.preferKey=d,i.slots[c[1]]=[d],i._groupsBySlot[c[1]]=i._groupsIds[i.slots[c[1]].join(";")],i.refreshSlotsCache(),b.exec()},ask:function(a,c){b.preferKey=c,b.exec()},tryagain:g,clusterDown:g,connectionClosed:g,maxRedirections:()=>{f=!1},defaults:()=>{f=!1}}),f)return}}let c=0;for(let a=0;a<this._queue.length-c;++a)this._queue[a+c].ignore&&(c+=1),this._result[a]=this._result[a+c];this.resolve(this._result.slice(0,this._result.length-c))}sendCommand(a){this._transactions>0&&(a.inTransaction=!0);let b=this._queue.length;return a.pipelineIndex=b,a.promise.then(a=>{this.fillResult([null,a],b)}).catch(a=>{this.fillResult([a],b)}),this._queue.push(a),this}addBatch(a){let b,c,d;for(let e=0;e<a.length;++e)c=(b=a[e])[0],d=b.slice(1),this[c].apply(this,d);return this}}c.default=k;let l=k.prototype.multi;k.prototype.multi=function(){return this._transactions+=1,l.apply(this,arguments)};let m=k.prototype.execBuffer;k.prototype.execBuffer=(0,g.deprecate)(function(){return this._transactions>0&&(this._transactions-=1),m.apply(this,arguments)},"Pipeline#execBuffer: Use Pipeline#exec instead"),k.prototype.exec=function(a){let b;if(this.isCluster&&!this.redis.slots.length)return"wait"===this.redis.status&&this.redis.connect().catch(i.noop),a&&!this.nodeifiedPromise&&(this.nodeifiedPromise=!0,(0,f.default)(this.promise,a)),this.redis.delayUntilReady(b=>{b?this.reject(b):this.exec(a)}),this.promise;if(this._transactions>0)return this._transactions-=1,m.apply(this,arguments);if(this.nodeifiedPromise||(this.nodeifiedPromise=!0,(0,f.default)(this.promise,a)),this._queue.length||this.resolve([]),this.isCluster){let a=[];for(let b=0;b<this._queue.length;b++){let c=this._queue[b].getKeys();if(c.length&&a.push(c[0]),c.length&&0>d.generateMulti(c))return this.reject(Error("All the keys in a pipeline command should belong to the same slot")),this.promise}if(a.length){if((b=function(a,b){let c=d(b[0]),e=a._groupsBySlot[c];for(let c=1;c<b.length;c++)if(a._groupsBySlot[d(b[c])]!==e)return -1;return c}(this.redis,a))<0)return this.reject(Error("All keys in the pipeline should belong to the same slots allocation group")),this.promise}else b=16384*Math.random()|0}let c=this;return function(){let a,d,e=c.replyPending=c._queue.length;c.isCluster&&(a={slot:b,redis:c.redis.connectionPool.nodes.all[c.preferKey]});let f="",g={isPipeline:!0,destination:c.isCluster?a:{redis:c.redis},write(a){"string"!=typeof a?(d||(d=[]),f&&(d.push(Buffer.from(f,"utf8")),f=""),d.push(a)):f+=a,--e||(d?(f&&d.push(Buffer.from(f,"utf8")),g.destination.redis.stream.write(Buffer.concat(d))):g.destination.redis.stream.write(f),e=c._queue.length,f="",d=void 0)}};for(let b=0;b<c._queue.length;++b)c.redis.sendCommand(c._queue[b],g,a);c.promise}(),this.promise}},979993,(a,b,c)=>{"use strict";Object.defineProperty(c,"__esModule",{value:!0}),c.addTransactionSupport=void 0;let d=a.r(473501),e=a.r(662839),f=a.r(542541);c.addTransactionSupport=function(a){a.pipeline=function(a){let b=new f.default(this);return Array.isArray(a)&&b.addBatch(a),b};let{multi:b}=a;a.multi=function(a,c){if(void 0!==c||Array.isArray(a)||(c=a,a=null),c&&!1===c.pipeline)return b.call(this);let g=new f.default(this);g.multi(),Array.isArray(a)&&g.addBatch(a);let h=g.exec;g.exec=function(a){if(this.isCluster&&!this.redis.slots.length)return"wait"===this.redis.status&&this.redis.connect().catch(d.noop),(0,e.default)(new Promise((a,b)=>{this.redis.delayUntilReady(c=>{c?b(c):this.exec(g).then(a,b)})}),a);if(this._transactions>0&&h.call(g),this.nodeifiedPromise)return h.call(g);let b=h.call(g);return(0,e.default)(b.then(function(a){let b=a[a.length-1];if(void 0===b)throw Error("Pipeline cannot be used to send any commands when the `exec()` has been called on it.");if(b[0]){b[0].previousErrors=[];for(let c=0;c<a.length-1;++c)a[c][0]&&b[0].previousErrors.push(a[c][0]);throw b[0]}return(0,d.wrapMultiResult)(b[1])}),a)};let{execBuffer:i}=g;return g.execBuffer=function(a){return this._transactions>0&&i.call(g),g.exec(a)},g};let{exec:c}=a;a.exec=function(a){return(0,e.default)(c.call(this).then(function(a){return Array.isArray(a)&&(a=(0,d.wrapMultiResult)(a)),a}),a)}}},668224,(a,b,c)=>{"use strict";Object.defineProperty(c,"__esModule",{value:!0}),c.default=function(a,b){Object.getOwnPropertyNames(b.prototype).forEach(c=>{Object.defineProperty(a.prototype,c,Object.getOwnPropertyDescriptor(b.prototype,c))})}},240987,(a,b,c)=>{"use strict";Object.defineProperty(c,"__esModule",{value:!0}),c.DEFAULT_CLUSTER_OPTIONS=void 0;let d=a.r(679594);c.DEFAULT_CLUSTER_OPTIONS={clusterRetryStrategy:a=>Math.min(100+2*a,2e3),enableOfflineQueue:!0,enableReadyCheck:!0,scaleReads:"master",maxRedirections:16,retryDelayOnMoved:0,retryDelayOnFailover:100,retryDelayOnClusterDown:100,retryDelayOnTryAgain:100,slotsRefreshTimeout:1e3,useSRVRecords:!1,resolveSrv:d.resolveSrv,dnsLookup:d.lookup,enableAutoPipelining:!1,autoPipeliningIgnoredCommands:[],shardedSubscribers:!1}},693208,(a,b,c)=>{"use strict";Object.defineProperty(c,"__esModule",{value:!0}),c.getConnectionName=c.weightSrvRecords=c.groupSrvRecords=c.getUniqueHostnamesFromOptions=c.normalizeNodeOptions=c.nodeKeyToRedisOptions=c.getNodeKey=void 0;let d=a.r(473501),e=a.r(504446);c.getNodeKey=function(a){return a.port=a.port||6379,a.host=a.host||"127.0.0.1",a.host+":"+a.port},c.nodeKeyToRedisOptions=function(a){let b=a.lastIndexOf(":");if(-1===b)throw Error(`Invalid node key ${a}`);return{host:a.slice(0,b),port:Number(a.slice(b+1))}},c.normalizeNodeOptions=function(a){return a.map(a=>{let b={};if("object"==typeof a)Object.assign(b,a);else if("string"==typeof a)Object.assign(b,(0,d.parseURL)(a));else if("number"==typeof a)b.port=a;else throw Error("Invalid argument "+a);return"string"==typeof b.port&&(b.port=parseInt(b.port,10)),delete b.db,b.port||(b.port=6379),b.host||(b.host="127.0.0.1"),(0,d.resolveTLSProfile)(b)})},c.getUniqueHostnamesFromOptions=function(a){let b={};return a.forEach(a=>{b[a.host]=!0}),Object.keys(b).filter(a=>!(0,e.isIP)(a))},c.groupSrvRecords=function(a){let b={};for(let c of a)b.hasOwnProperty(c.priority)?(b[c.priority].totalWeight+=c.weight,b[c.priority].records.push(c)):b[c.priority]={totalWeight:c.weight,records:[c]};return b},c.weightSrvRecords=function(a){if(1===a.records.length)return a.totalWeight=0,a.records.shift();let b=Math.floor(Math.random()*(a.totalWeight+a.records.length)),c=0;for(let[d,e]of a.records.entries())if((c+=1+e.weight)>b)return a.totalWeight-=e.weight,a.records.splice(d,1),e},c.getConnectionName=function(a,b){let c=`ioredis-cluster(${a})`;return b?`${c}:${b}`:c}},634528,(a,b,c)=>{"use strict";Object.defineProperty(c,"__esModule",{value:!0});let d=a.r(693208),e=a.r(473501),f=a.r(278199),g=(0,e.Debug)("cluster:subscriber");c.default=class{constructor(a,b,c=!1){this.connectionPool=a,this.emitter=b,this.isSharded=c,this.started=!1,this.subscriber=null,this.slotRange=[],this.onSubscriberEnd=()=>{this.started?(g("subscriber has disconnected, selecting a new one..."),this.selectSubscriber()):g("subscriber has disconnected, but ClusterSubscriber is not started, so not reconnecting.")},this.connectionPool.on("-node",(a,b)=>{this.started&&this.subscriber&&(0,d.getNodeKey)(this.subscriber.options)===b&&(g("subscriber has left, selecting a new one..."),this.selectSubscriber())}),this.connectionPool.on("+node",()=>{this.started&&!this.subscriber&&(g("a new node is discovered and there is no subscriber, selecting a new one..."),this.selectSubscriber())})}getInstance(){return this.subscriber}associateSlotRange(a){return this.isSharded&&(this.slotRange=a),this.slotRange}start(){this.started=!0,this.selectSubscriber(),g("started")}stop(){this.started=!1,this.subscriber&&(this.subscriber.disconnect(),this.subscriber=null)}isStarted(){return this.started}selectSubscriber(){let a=this.lastActiveSubscriber;a&&(a.off("end",this.onSubscriberEnd),a.disconnect()),this.subscriber&&(this.subscriber.off("end",this.onSubscriberEnd),this.subscriber.disconnect());let b=(0,e.sample)(this.connectionPool.getNodes());if(!b){g("selecting subscriber failed since there is no node discovered in the cluster yet"),this.subscriber=null;return}let{options:c}=b;g("selected a subscriber %s:%s",c.host,c.port);let h="subscriber";this.isSharded&&(h="ssubscriber"),this.subscriber=new f.default({port:c.port,host:c.host,username:c.username,password:c.password,enableReadyCheck:!0,connectionName:(0,d.getConnectionName)(h,c.connectionName),lazyConnect:!0,tls:c.tls,retryStrategy:null}),this.subscriber.on("error",e.noop),this.subscriber.on("moved",()=>{this.emitter.emit("forceRefresh")}),this.subscriber.once("end",this.onSubscriberEnd);let i={subscribe:[],psubscribe:[],ssubscribe:[]};if(a){let b=a.condition||a.prevCondition;b&&b.subscriber&&(i.subscribe=b.subscriber.channels("subscribe"),i.psubscribe=b.subscriber.channels("psubscribe"),i.ssubscribe=b.subscriber.channels("ssubscribe"))}if(i.subscribe.length||i.psubscribe.length||i.ssubscribe.length){let a=0;for(let b of["subscribe","psubscribe","ssubscribe"]){let c=i[b];if(0!=c.length)if(g("%s %d channels",b,c.length),"ssubscribe"===b)for(let d of c)a+=1,this.subscriber[b](d).then(()=>{--a||(this.lastActiveSubscriber=this.subscriber)}).catch(()=>{g("failed to ssubscribe to channel: %s",d)});else a+=1,this.subscriber[b](c).then(()=>{--a||(this.lastActiveSubscriber=this.subscriber)}).catch(()=>{g("failed to %s %d channels",b,c.length)})}}else this.lastActiveSubscriber=this.subscriber;for(let a of["message","messageBuffer"])this.subscriber.on(a,(b,c)=>{this.emitter.emit(a,b,c)});for(let a of["pmessage","pmessageBuffer"])this.subscriber.on(a,(b,c,d)=>{this.emitter.emit(a,b,c,d)});if(!0==this.isSharded)for(let a of["smessage","smessageBuffer"])this.subscriber.on(a,(b,c)=>{this.emitter.emit(a,b,c)})}}},775195,(a,b,c)=>{"use strict";Object.defineProperty(c,"__esModule",{value:!0});let d=a.r(427699),e=a.r(473501),f=a.r(693208),g=a.r(278199),h=(0,e.Debug)("cluster:connectionPool");class i extends d.EventEmitter{constructor(a){super(),this.redisOptions=a,this.nodes={all:{},master:{},slave:{}},this.specifiedOptions={}}getNodes(a="all"){let b=this.nodes[a];return Object.keys(b).map(a=>b[a])}getInstanceByKey(a){return this.nodes.all[a]}getSampleInstance(a){let b=Object.keys(this.nodes[a]),c=(0,e.sample)(b);return this.nodes[a][c]}addMasterNode(a){let b=(0,f.getNodeKey)(a.options),c=this.createRedisFromOptions(a,a.options.readOnly);return!a.options.readOnly&&(this.nodes.all[b]=c,this.nodes.master[b]=c,!0)}createRedisFromOptions(a,b){return new g.default((0,e.defaults)({retryStrategy:null,enableOfflineQueue:!0,readOnly:b},a,this.redisOptions,{lazyConnect:!0}))}findOrCreate(a,b=!1){let c,d=(0,f.getNodeKey)(a);return b=!!b,this.specifiedOptions[d]?Object.assign(a,this.specifiedOptions[d]):this.specifiedOptions[d]=a,this.nodes.all[d]?(c=this.nodes.all[d]).options.readOnly!==b&&(c.options.readOnly=b,h("Change role of %s to %s",d,b?"slave":"master"),c[b?"readonly":"readwrite"]().catch(e.noop),b?(delete this.nodes.master[d],this.nodes.slave[d]=c):(delete this.nodes.slave[d],this.nodes.master[d]=c)):(h("Connecting to %s as %s",d,b?"slave":"master"),c=this.createRedisFromOptions(a,b),this.nodes.all[d]=c,this.nodes[b?"slave":"master"][d]=c,c.once("end",()=>{this.removeNode(d),this.emit("-node",c,d),Object.keys(this.nodes.all).length||this.emit("drain")}),this.emit("+node",c,d),c.on("error",function(a){this.emit("nodeError",a,d)})),c}reset(a){h("Reset with %O",a);let b={};a.forEach(a=>{let c=(0,f.getNodeKey)(a);a.readOnly&&b[c]||(b[c]=a)}),Object.keys(this.nodes.all).forEach(a=>{b[a]||(h("Disconnect %s because the node does not hold any slot",a),this.nodes.all[a].disconnect(),this.removeNode(a))}),Object.keys(b).forEach(a=>{let c=b[a];this.findOrCreate(c,c.readOnly)})}removeNode(a){let{nodes:b}=this;b.all[a]&&(h("Remove %s from the pool",a),delete b.all[a]),delete b.master[a],delete b.slave[a]}}c.default=i},917769,(a,b,c)=>{"use strict";function d(a,b){var b=b||{};this._capacity=b.capacity,this._head=0,this._tail=0,Array.isArray(a)?this._fromArray(a):(this._capacityMask=3,this._list=[,,,,])}d.prototype.peekAt=function(a){var b=a;if(b===(0|b)){var c=this.size();if(!(b>=c)&&!(b<-c))return b<0&&(b+=c),b=this._head+b&this._capacityMask,this._list[b]}},d.prototype.get=function(a){return this.peekAt(a)},d.prototype.peek=function(){if(this._head!==this._tail)return this._list[this._head]},d.prototype.peekFront=function(){return this.peek()},d.prototype.peekBack=function(){return this.peekAt(-1)},Object.defineProperty(d.prototype,"length",{get:function(){return this.size()}}),d.prototype.size=function(){return this._head===this._tail?0:this._head<this._tail?this._tail-this._head:this._capacityMask+1-(this._head-this._tail)},d.prototype.unshift=function(a){if(0==arguments.length)return this.size();var b=this._list.length;return(this._head=this._head-1+b&this._capacityMask,this._list[this._head]=a,this._tail===this._head&&this._growArray(),this._capacity&&this.size()>this._capacity&&this.pop(),this._head<this._tail)?this._tail-this._head:this._capacityMask+1-(this._head-this._tail)},d.prototype.shift=function(){var a=this._head;if(a!==this._tail){var b=this._list[a];return this._list[a]=void 0,this._head=a+1&this._capacityMask,a<2&&this._tail>1e4&&this._tail<=this._list.length>>>2&&this._shrinkArray(),b}},d.prototype.push=function(a){if(0==arguments.length)return this.size();var b=this._tail;return(this._list[b]=a,this._tail=b+1&this._capacityMask,this._tail===this._head&&this._growArray(),this._capacity&&this.size()>this._capacity&&this.shift(),this._head<this._tail)?this._tail-this._head:this._capacityMask+1-(this._head-this._tail)},d.prototype.pop=function(){var a=this._tail;if(a!==this._head){var b=this._list.length;this._tail=a-1+b&this._capacityMask;var c=this._list[this._tail];return this._list[this._tail]=void 0,this._head<2&&a>1e4&&a<=b>>>2&&this._shrinkArray(),c}},d.prototype.removeOne=function(a){var b,c=a;if(c===(0|c)&&this._head!==this._tail){var d=this.size(),e=this._list.length;if(!(c>=d)&&!(c<-d)){c<0&&(c+=d),c=this._head+c&this._capacityMask;var f=this._list[c];if(a<d/2){for(b=a;b>0;b--)this._list[c]=this._list[c=c-1+e&this._capacityMask];this._list[c]=void 0,this._head=this._head+1+e&this._capacityMask}else{for(b=d-1-a;b>0;b--)this._list[c]=this._list[c=c+1+e&this._capacityMask];this._list[c]=void 0,this._tail=this._tail-1+e&this._capacityMask}return f}}},d.prototype.remove=function(a,b){var c,d,e=a,f=b;if(e===(0|e)&&this._head!==this._tail){var g=this.size(),h=this._list.length;if(!(e>=g)&&!(e<-g)&&!(b<1)){if(e<0&&(e+=g),1===b||!b)return(c=[,])[0]=this.removeOne(e),c;if(0===e&&e+b>=g)return c=this.toArray(),this.clear(),c;for(e+b>g&&(b=g-e),c=Array(b),d=0;d<b;d++)c[d]=this._list[this._head+e+d&this._capacityMask];if(e=this._head+e&this._capacityMask,a+b===g){for(this._tail=this._tail-b+h&this._capacityMask,d=b;d>0;d--)this._list[e=e+1+h&this._capacityMask]=void 0;return c}if(0===a){for(this._head=this._head+b+h&this._capacityMask,d=b-1;d>0;d--)this._list[e=e+1+h&this._capacityMask]=void 0;return c}if(e<g/2){for(this._head=this._head+a+b+h&this._capacityMask,d=a;d>0;d--)this.unshift(this._list[e=e-1+h&this._capacityMask]);for(e=this._head-1+h&this._capacityMask;f>0;)this._list[e=e-1+h&this._capacityMask]=void 0,f--;a<0&&(this._tail=e)}else{for(this._tail=e,e=e+b+h&this._capacityMask,d=g-(b+a);d>0;d--)this.push(this._list[e++]);for(e=this._tail;f>0;)this._list[e=e+1+h&this._capacityMask]=void 0,f--}return this._head<2&&this._tail>1e4&&this._tail<=h>>>2&&this._shrinkArray(),c}}},d.prototype.splice=function(a,b){var c=a;if(c===(0|c)){var d=this.size();if(c<0&&(c+=d),!(c>d))if(!(arguments.length>2))return this.remove(c,b);else{var e,f,g,h=arguments.length,i=this._list.length,j=2;if(!d||c<d/2){for(e=0,f=Array(c);e<c;e++)f[e]=this._list[this._head+e&this._capacityMask];for(0===b?(g=[],c>0&&(this._head=this._head+c+i&this._capacityMask)):(g=this.remove(c,b),this._head=this._head+c+i&this._capacityMask);h>j;)this.unshift(arguments[--h]);for(e=c;e>0;e--)this.unshift(f[e-1])}else{var k=(f=Array(d-(c+b))).length;for(e=0;e<k;e++)f[e]=this._list[this._head+c+b+e&this._capacityMask];for(0===b?(g=[],c!=d&&(this._tail=this._head+c+i&this._capacityMask)):(g=this.remove(c,b),this._tail=this._tail-k+i&this._capacityMask);j<h;)this.push(arguments[j++]);for(e=0;e<k;e++)this.push(f[e])}return g}}},d.prototype.clear=function(){this._list=Array(this._list.length),this._head=0,this._tail=0},d.prototype.isEmpty=function(){return this._head===this._tail},d.prototype.toArray=function(){return this._copyArray(!1)},d.prototype._fromArray=function(a){var b=a.length,c=this._nextPowerOf2(b);this._list=Array(c),this._capacityMask=c-1,this._tail=b;for(var d=0;d<b;d++)this._list[d]=a[d]},d.prototype._copyArray=function(a,b){var c,d=this._list,e=d.length,f=this.length;if((b|=f)==f&&this._head<this._tail)return this._list.slice(this._head,this._tail);var g=Array(b),h=0;if(a||this._head>this._tail){for(c=this._head;c<e;c++)g[h++]=d[c];for(c=0;c<this._tail;c++)g[h++]=d[c]}else for(c=this._head;c<this._tail;c++)g[h++]=d[c];return g},d.prototype._growArray=function(){if(0!=this._head){var a=this._copyArray(!0,this._list.length<<1);this._tail=this._list.length,this._head=0,this._list=a}else this._tail=this._list.length,this._list.length<<=1;this._capacityMask=this._capacityMask<<1|1},d.prototype._shrinkArray=function(){this._list.length>>>=1,this._capacityMask>>>=1},d.prototype._nextPowerOf2=function(a){return Math.max(1<<Math.log(a)/Math.log(2)+1,4)},b.exports=d},919901,(a,b,c)=>{"use strict";Object.defineProperty(c,"__esModule",{value:!0});let d=a.r(473501),e=a.r(917769),f=(0,d.Debug)("delayqueue");c.default=class{constructor(){this.queues={},this.timeouts={}}push(a,b,c){let d=c.callback||process.nextTick;this.queues[a]||(this.queues[a]=new e),this.queues[a].push(b),this.timeouts[a]||(this.timeouts[a]=setTimeout(()=>{d(()=>{this.timeouts[a]=null,this.execute(a)})},c.timeout))}execute(a){let b=this.queues[a];if(!b)return;let{length:c}=b;if(c)for(f("send %d commands in %s queue",c,a),this.queues[a]=null;b.length>0;)b.shift()()}}},484990,(a,b,c)=>{"use strict";Object.defineProperty(c,"__esModule",{value:!0});let d=a.r(473501),e=a.r(634528),f=a.r(775195),g=a.r(693208),h=a.r(749060),i=(0,d.Debug)("cluster:subscriberGroup");c.default=class{constructor(a,b){this.cluster=a,this.shardedSubscribers=new Map,this.clusterSlots=[],this.subscriberToSlotsIndex=new Map,this.channels=new Map,a.on("+node",a=>{this._addSubscriber(a)}),a.on("-node",a=>{this._removeSubscriber(a)}),a.on("refresh",()=>{this._refreshSlots(a)}),a.on("forceRefresh",()=>{b()})}getResponsibleSubscriber(a){let b=this.clusterSlots[a][0];return this.shardedSubscribers.get(b)}addChannels(a){let b=h(a[0]);a.forEach(a=>{if(h(a)!=b)return -1});let c=this.channels.get(b);return c?this.channels.set(b,c.concat(a)):this.channels.set(b,a),[...this.channels.values()].flatMap(a=>a).length}removeChannels(a){let b=h(a[0]);a.forEach(a=>{if(h(a)!=b)return -1});let c=this.channels.get(b);if(c){let d=c.filter(b=>!a.includes(b));this.channels.set(b,d)}return[...this.channels.values()].flatMap(a=>a).length}stop(){for(let a of this.shardedSubscribers.values())a.stop()}start(){for(let a of this.shardedSubscribers.values())a.isStarted()||a.start()}_addSubscriber(a){let b=new f.default(a.options);if(b.addMasterNode(a)){let c=new e.default(b,this.cluster,!0),d=(0,g.getNodeKey)(a.options);return this.shardedSubscribers.set(d,c),c.start(),this._resubscribe(),this.cluster.emit("+subscriber"),c}return null}_removeSubscriber(a){let b=(0,g.getNodeKey)(a.options),c=this.shardedSubscribers.get(b);return c&&(c.stop(),this.shardedSubscribers.delete(b),this._resubscribe(),this.cluster.emit("-subscriber")),this.shardedSubscribers}_refreshSlots(a){if(this._slotsAreEqual(a.slots))i("Nothing to refresh because the new cluster map is equal to the previous one.");else{i("Refreshing the slots of the subscriber group."),this.subscriberToSlotsIndex=new Map;for(let b=0;b<a.slots.length;b++){let c=a.slots[b][0];this.subscriberToSlotsIndex.has(c)||this.subscriberToSlotsIndex.set(c,[]),this.subscriberToSlotsIndex.get(c).push(Number(b))}return this._resubscribe(),this.clusterSlots=JSON.parse(JSON.stringify(a.slots)),this.cluster.emit("subscribersReady"),!0}return!1}_resubscribe(){this.shardedSubscribers&&this.shardedSubscribers.forEach((a,b)=>{let c=this.subscriberToSlotsIndex.get(b);c&&(a.associateSlotRange(c),c.forEach(b=>{let c=a.getInstance(),d=this.channels.get(b);d&&d.length>0&&c&&(c.ssubscribe(d),c.on("ready",()=>{c.ssubscribe(d)}))}))})}_slotsAreEqual(a){return void 0!==this.clusterSlots&&JSON.stringify(this.clusterSlots)===JSON.stringify(a)}}},138446,(a,b,c)=>{"use strict";Object.defineProperty(c,"__esModule",{value:!0});let d=a.r(870791),e=a.r(427699),f=a.r(223950),g=a.r(662839),h=a.r(683302),i=a.r(184439),j=a.r(278199),k=a.r(394558),l=a.r(979993),m=a.r(473501),n=a.r(668224),o=a.r(554e3),p=a.r(240987),q=a.r(634528),r=a.r(775195),s=a.r(919901),t=a.r(693208),u=a.r(917769),v=a.r(484990),w=(0,m.Debug)("cluster"),x=new WeakSet;class y extends o.default{constructor(a,b={}){if(super(),this.slots=[],this._groupsIds={},this._groupsBySlot=Array(16384),this.isCluster=!0,this.retryAttempts=0,this.delayQueue=new s.default,this.offlineQueue=new u,this.isRefreshing=!1,this._refreshSlotsCacheCallbacks=[],this._autoPipelines=new Map,this._runningAutoPipelines=new Set,this._readyDelayedCallbacks=[],this.connectionEpoch=0,e.EventEmitter.call(this),this.startupNodes=a,this.options=(0,m.defaults)({},b,p.DEFAULT_CLUSTER_OPTIONS,this.options),!0==this.options.shardedSubscribers&&(this.shardedSubscribers=new v.default(this,this.refreshSlotsCache.bind(this))),this.options.redisOptions&&this.options.redisOptions.keyPrefix&&!this.options.keyPrefix&&(this.options.keyPrefix=this.options.redisOptions.keyPrefix),"function"!=typeof this.options.scaleReads&&-1===["all","master","slave"].indexOf(this.options.scaleReads))throw Error('Invalid option scaleReads "'+this.options.scaleReads+'". Expected "all", "master", "slave" or a custom function');this.connectionPool=new r.default(this.options.redisOptions),this.connectionPool.on("-node",(a,b)=>{this.emit("-node",a)}),this.connectionPool.on("+node",a=>{this.emit("+node",a)}),this.connectionPool.on("drain",()=>{this.setStatus("close")}),this.connectionPool.on("nodeError",(a,b)=>{this.emit("node error",a,b)}),this.subscriber=new q.default(this.connectionPool,this),this.options.scripts&&Object.entries(this.options.scripts).forEach(([a,b])=>{this.defineCommand(a,b)}),this.options.lazyConnect?this.setStatus("wait"):this.connect().catch(a=>{w("connecting failed: %s",a)})}connect(){return new Promise((a,b)=>{if("connecting"===this.status||"connect"===this.status||"ready"===this.status)return void b(Error("Redis is already connecting/connected"));let c=++this.connectionEpoch;this.setStatus("connecting"),this.resolveStartupNodeHostnames().then(d=>{let e;if(this.connectionEpoch!==c){w("discard connecting after resolving startup nodes because epoch not match: %d != %d",c,this.connectionEpoch),b(new f.RedisError("Connection is discarded because a new connection is made"));return}if("connecting"!==this.status){w("discard connecting after resolving startup nodes because the status changed to %s",this.status),b(new f.RedisError("Connection is aborted"));return}this.connectionPool.reset(d);let g=()=>{this.setStatus("ready"),this.retryAttempts=0,this.executeOfflineCommands(),this.resetNodesRefreshInterval(),a()},h=()=>{this.invokeReadyDelayedCallbacks(void 0),this.removeListener("close",e),this.manuallyClosing=!1,this.setStatus("connect"),this.options.enableReadyCheck?this.readyCheck((a,b)=>{a||b?(w("Ready check failed (%s). Reconnecting...",a||b),"connect"===this.status&&this.disconnect(!0)):g()}):g()};e=()=>{let a=Error("None of startup nodes is available");this.removeListener("refresh",h),this.invokeReadyDelayedCallbacks(a),b(a)},this.once("refresh",h),this.once("close",e),this.once("close",this.handleCloseEvent.bind(this)),this.refreshSlotsCache(a=>{a&&a.message===i.default.defaultMessage&&(j.default.prototype.silentEmit.call(this,"error",a),this.connectionPool.reset([]))}),this.subscriber.start(),this.options.shardedSubscribers&&this.shardedSubscribers.start()}).catch(a=>{this.setStatus("close"),this.handleCloseEvent(a),this.invokeReadyDelayedCallbacks(a),b(a)})})}disconnect(a=!1){let b=this.status;this.setStatus("disconnecting"),a||(this.manuallyClosing=!0),this.reconnectTimeout&&!a&&(clearTimeout(this.reconnectTimeout),this.reconnectTimeout=null,w("Canceled reconnecting attempts")),this.clearNodesRefreshInterval(),this.subscriber.stop(),this.options.shardedSubscribers&&this.shardedSubscribers.stop(),"wait"===b?(this.setStatus("close"),this.handleCloseEvent()):this.connectionPool.reset([])}quit(a){let b=this.status;if(this.setStatus("disconnecting"),this.manuallyClosing=!0,this.reconnectTimeout&&(clearTimeout(this.reconnectTimeout),this.reconnectTimeout=null),this.clearNodesRefreshInterval(),this.subscriber.stop(),this.options.shardedSubscribers&&this.shardedSubscribers.stop(),"wait"===b){let b=(0,g.default)(Promise.resolve("OK"),a);return setImmediate((function(){this.setStatus("close"),this.handleCloseEvent()}).bind(this)),b}return(0,g.default)(Promise.all(this.nodes().map(a=>a.quit().catch(a=>{if(a.message===m.CONNECTION_CLOSED_ERROR_MSG)return"OK";throw a}))).then(()=>"OK"),a)}duplicate(a=[],b={}){return new y(a.length>0?a:this.startupNodes.slice(0),Object.assign({},this.options,b))}nodes(a="all"){if("all"!==a&&"master"!==a&&"slave"!==a)throw Error('Invalid role "'+a+'". Expected "all", "master" or "slave"');return this.connectionPool.getNodes(a)}delayUntilReady(a){this._readyDelayedCallbacks.push(a)}get autoPipelineQueueSize(){let a=0;for(let b of this._autoPipelines.values())a+=b.length;return a}refreshSlotsCache(a){if(a&&this._refreshSlotsCacheCallbacks.push(a),this.isRefreshing)return;this.isRefreshing=!0;let b=this,c=a=>{for(let b of(this.isRefreshing=!1,this._refreshSlotsCacheCallbacks))b(a);this._refreshSlotsCacheCallbacks=[]},d=(0,m.shuffle)(this.connectionPool.getNodes()),e=null;!function a(f){if(f===d.length)return c(new i.default(i.default.defaultMessage,e));let g=d[f],h=`${g.options.host}:${g.options.port}`;w("getting slot cache from %s",h),b.getInfoFromNode(g,function(d){switch(b.status){case"close":case"end":return c(Error("Cluster is disconnected."));case"disconnecting":return c(Error("Cluster is disconnecting."))}d?(b.emit("node error",d,h),e=d,a(f+1)):(b.emit("refresh"),c())})}(0)}sendCommand(a,b,c){if("wait"===this.status&&this.connect().catch(m.noop),"end"===this.status)return a.reject(Error(m.CONNECTION_CLOSED_ERROR_MSG)),a.promise;let e=this.options.scaleReads;"master"!==e&&(a.isReadOnly||(0,d.exists)(a.name)&&(0,d.hasFlag)(a.name,"readonly")||(e="master"));let g=c?c.slot:a.getSlot(),i={},j=this;if(!c&&!x.has(a)){x.add(a);let b=a.reject;a.reject=function(c){let d=k.bind(null,!0);j.handleError(c,i,{moved:function(b,c){w("command %s is moved to %s",a.name,c),g=Number(b),j.slots[b]?j.slots[b][0]=c:j.slots[b]=[c],j._groupsBySlot[b]=j._groupsIds[j.slots[b].join(";")],j.connectionPool.findOrCreate(j.natMapper(c)),k(),w("refreshing slot caches... (triggered by MOVED error)"),j.refreshSlotsCache()},ask:function(b,c){w("command %s is required to ask %s:%s",a.name,c);let d=j.natMapper(c);j.connectionPool.findOrCreate(d),k(!1,`${d.host}:${d.port}`)},tryagain:d,clusterDown:d,connectionClosed:d,maxRedirections:function(c){b.call(a,c)},defaults:function(){b.call(a,c)}})}}function k(d,i){let k;if("end"===j.status)return void a.reject(new f.AbortError("Cluster is ended."));if("ready"===j.status||"cluster"===a.name){if(c&&c.redis)k=c.redis;else if(h.default.checkFlag("ENTER_SUBSCRIBER_MODE",a.name)||h.default.checkFlag("EXIT_SUBSCRIBER_MODE",a.name)){if(!0==j.options.shardedSubscribers&&("ssubscribe"==a.name||"sunsubscribe"==a.name)){let b=j.shardedSubscribers.getResponsibleSubscriber(g),c=-1;"ssubscribe"==a.name&&(c=j.shardedSubscribers.addChannels(a.getKeys())),"sunsubscribe"==a.name&&(c=j.shardedSubscribers.removeChannels(a.getKeys())),-1!==c?k=b.getInstance():a.reject(new f.AbortError("Can't add or remove the given channels. Are they in the same slot?"))}else k=j.subscriber.getInstance();if(!k)return void a.reject(new f.AbortError("No subscriber for the cluster"))}else{if(!d){if("number"==typeof g&&j.slots[g]){let b=j.slots[g];if("function"==typeof e){let c=b.map(function(a){return j.connectionPool.getInstanceByKey(a)});Array.isArray(k=e(c,a))&&(k=(0,m.sample)(k)),k||(k=c[0])}else{let a;a="all"===e?(0,m.sample)(b):"slave"===e&&b.length>1?(0,m.sample)(b,1):b[0],k=j.connectionPool.getInstanceByKey(a)}}i&&(k=j.connectionPool.getInstanceByKey(i)).asking()}k||(k=("function"==typeof e?null:j.connectionPool.getSampleInstance(e))||j.connectionPool.getSampleInstance("all"))}c&&!c.redis&&(c.redis=k)}k?k.sendCommand(a,b):j.options.enableOfflineQueue?j.offlineQueue.push({command:a,stream:b,node:c}):a.reject(Error("Cluster isn't ready and enableOfflineQueue options is false"))}return k(),a.promise}sscanStream(a,b){return this.createScanStream("sscan",{key:a,options:b})}sscanBufferStream(a,b){return this.createScanStream("sscanBuffer",{key:a,options:b})}hscanStream(a,b){return this.createScanStream("hscan",{key:a,options:b})}hscanBufferStream(a,b){return this.createScanStream("hscanBuffer",{key:a,options:b})}zscanStream(a,b){return this.createScanStream("zscan",{key:a,options:b})}zscanBufferStream(a,b){return this.createScanStream("zscanBuffer",{key:a,options:b})}handleError(a,b,c){if(void 0===b.value?b.value=this.options.maxRedirections:b.value-=1,b.value<=0)return void c.maxRedirections(Error("Too many Cluster redirections. Last error: "+a));let d=a.message.split(" ");if("MOVED"===d[0]){let a=this.options.retryDelayOnMoved;a&&"number"==typeof a?this.delayQueue.push("moved",c.moved.bind(null,d[1],d[2]),{timeout:a}):c.moved(d[1],d[2])}else"ASK"===d[0]?c.ask(d[1],d[2]):"TRYAGAIN"===d[0]?this.delayQueue.push("tryagain",c.tryagain,{timeout:this.options.retryDelayOnTryAgain}):"CLUSTERDOWN"===d[0]&&this.options.retryDelayOnClusterDown>0?this.delayQueue.push("clusterdown",c.connectionClosed,{timeout:this.options.retryDelayOnClusterDown,callback:this.refreshSlotsCache.bind(this)}):a.message===m.CONNECTION_CLOSED_ERROR_MSG&&this.options.retryDelayOnFailover>0&&"ready"===this.status?this.delayQueue.push("failover",c.connectionClosed,{timeout:this.options.retryDelayOnFailover,callback:this.refreshSlotsCache.bind(this)}):c.defaults()}resetOfflineQueue(){this.offlineQueue=new u}clearNodesRefreshInterval(){this.slotsTimer&&(clearTimeout(this.slotsTimer),this.slotsTimer=null)}resetNodesRefreshInterval(){if(this.slotsTimer||!this.options.slotsRefreshInterval)return;let a=()=>{this.slotsTimer=setTimeout(()=>{w('refreshing slot caches... (triggered by "slotsRefreshInterval" option)'),this.refreshSlotsCache(()=>{a()})},this.options.slotsRefreshInterval)};a()}setStatus(a){w("status: %s -> %s",this.status||"[empty]",a),this.status=a,process.nextTick(()=>{this.emit(a)})}handleCloseEvent(a){let b;a&&w("closed because %s",a),this.manuallyClosing||"function"!=typeof this.options.clusterRetryStrategy||(b=this.options.clusterRetryStrategy.call(this,++this.retryAttempts,a)),"number"==typeof b?(this.setStatus("reconnecting"),this.reconnectTimeout=setTimeout(()=>{this.reconnectTimeout=null,w("Cluster is disconnected. Retrying after %dms",b),this.connect().catch(function(a){w("Got error %s when reconnecting. Ignoring...",a)})},b)):(this.setStatus("end"),this.flushQueue(Error("None of startup nodes is available")))}flushQueue(a){let b;for(;b=this.offlineQueue.shift();)b.command.reject(a)}executeOfflineCommands(){if(this.offlineQueue.length){let a;w("send %d commands in offline queue",this.offlineQueue.length);let b=this.offlineQueue;for(this.resetOfflineQueue();a=b.shift();)this.sendCommand(a.command,a.stream,a.node)}}natMapper(a){let b="string"==typeof a?a:`${a.host}:${a.port}`,c=null;return(this.options.natMap&&"function"==typeof this.options.natMap?c=this.options.natMap(b):this.options.natMap&&"object"==typeof this.options.natMap&&(c=this.options.natMap[b]),c)?(w("NAT mapping %s -> %O",b,c),Object.assign({},c)):"string"==typeof a?(0,t.nodeKeyToRedisOptions)(a):a}getInfoFromNode(a,b){if(!a)return b(Error("Node is disconnected"));let c=a.duplicate({enableOfflineQueue:!0,enableReadyCheck:!1,retryStrategy:null,connectionName:(0,t.getConnectionName)("refresher",this.options.redisOptions&&this.options.redisOptions.connectionName)});c.on("error",m.noop),c.cluster("SLOTS",(0,m.timeout)((a,d)=>{if(c.disconnect(),a)return w("error encountered running CLUSTER.SLOTS: %s",a),b(a);if("disconnecting"===this.status||"close"===this.status||"end"===this.status){w("ignore CLUSTER.SLOTS results (count: %d) since cluster status is %s",d.length,this.status),b();return}let e=[];w("cluster slots result count: %d",d.length);for(let a=0;a<d.length;++a){let b=d[a],c=b[0],f=b[1],g=[];for(let a=2;a<b.length;a++){if(!b[a][0])continue;let c=this.natMapper({host:b[a][0],port:b[a][1]});c.readOnly=2!==a,e.push(c),g.push(c.host+":"+c.port)}w("cluster slots result [%d]: slots %d~%d served by %s",a,c,f,g);for(let a=c;a<=f;a++)this.slots[a]=g}this._groupsIds=Object.create(null);let f=0;for(let a=0;a<16384;a++){let b=(this.slots[a]||[]).join(";");if(!b.length){this._groupsBySlot[a]=void 0;continue}this._groupsIds[b]||(this._groupsIds[b]=++f),this._groupsBySlot[a]=this._groupsIds[b]}this.connectionPool.reset(e),b()},this.options.slotsRefreshTimeout))}invokeReadyDelayedCallbacks(a){for(let b of this._readyDelayedCallbacks)process.nextTick(b,a);this._readyDelayedCallbacks=[]}readyCheck(a){this.cluster("INFO",(b,c)=>{let d;if(b)return a(b);if("string"!=typeof c)return a();let e=c.split("\r\n");for(let a=0;a<e.length;++a){let b=e[a].split(":");if("cluster_state"===b[0]){d=b[1];break}}"fail"===d?(w("cluster state not ok (%s)",d),a(null,d)):a()})}resolveSrv(a){return new Promise((b,c)=>{this.options.resolveSrv(a,(a,d)=>{if(a)return c(a);let e=this,f=(0,t.groupSrvRecords)(d),g=Object.keys(f).sort((a,b)=>parseInt(a)-parseInt(b));!function a(d){if(!g.length)return c(d);let h=f[g[0]],i=(0,t.weightSrvRecords)(h);h.records.length||g.shift(),e.dnsLookup(i.name).then(a=>b({host:a,port:i.port}),a)}()})})}dnsLookup(a){return new Promise((b,c)=>{this.options.dnsLookup(a,(d,e)=>{d?(w("failed to resolve hostname %s to IP: %s",a,d.message),c(d)):(w("resolved hostname %s to IP %s",a,e),b(e))})})}async resolveStartupNodeHostnames(){if(!Array.isArray(this.startupNodes)||0===this.startupNodes.length)throw Error("`startupNodes` should contain at least one node.");let a=(0,t.normalizeNodeOptions)(this.startupNodes),b=(0,t.getUniqueHostnamesFromOptions)(a);if(0===b.length)return a;let c=await Promise.all(b.map((this.options.useSRVRecords?this.resolveSrv:this.dnsLookup).bind(this))),d=(0,m.zipMap)(b,c);return a.map(a=>{let b=d.get(a.host);return b?this.options.useSRVRecords?Object.assign({},a,b):Object.assign({},a,{host:b}):a})}createScanStream(a,{key:b,options:c={}}){return new k.default({objectMode:!0,key:b,redis:this,command:a,...c})}}(0,n.default)(y,e.EventEmitter),(0,l.addTransactionSupport)(y.prototype),c.default=y},73776,(a,b,c)=>{"use strict";Object.defineProperty(c,"__esModule",{value:!0});let d=(0,a.r(473501).Debug)("AbstractConnector");c.default=class{constructor(a){this.connecting=!1,this.disconnectTimeout=a}check(a){return!0}disconnect(){if(this.connecting=!1,this.stream){let a=this.stream,b=setTimeout(()=>{d("stream %s:%s still open, destroying it",a.remoteAddress,a.remotePort),a.destroy()},this.disconnectTimeout);a.on("close",()=>clearTimeout(b)),a.end()}}}},385686,(a,b,c)=>{"use strict";Object.defineProperty(c,"__esModule",{value:!0});let d=a.r(504446),e=a.r(755004),f=a.r(473501),g=a.r(73776);class h extends g.default{constructor(a){super(a.disconnectTimeout),this.options=a}connect(a){let b,{options:c}=this;return this.connecting=!0,"path"in c&&c.path?b={path:c.path}:(b={},"port"in c&&null!=c.port&&(b.port=c.port),"host"in c&&null!=c.host&&(b.host=c.host),"family"in c&&null!=c.family&&(b.family=c.family)),c.tls&&Object.assign(b,c.tls),new Promise((a,g)=>{process.nextTick(()=>{if(!this.connecting)return void g(Error(f.CONNECTION_CLOSED_ERROR_MSG));try{c.tls?this.stream=(0,e.connect)(b):this.stream=(0,d.createConnection)(b)}catch(a){g(a);return}this.stream.once("error",a=>{this.firstError=a}),a(this.stream)})})}}c.default=h},718651,(a,b,c)=>{"use strict";Object.defineProperty(c,"__esModule",{value:!0}),c.default=class{constructor(a){this.cursor=0,this.sentinels=a.slice(0)}next(){let a=this.cursor>=this.sentinels.length;return{done:a,value:a?void 0:this.sentinels[this.cursor++]}}reset(a){a&&this.sentinels.length>1&&1!==this.cursor&&this.sentinels.unshift(...this.sentinels.splice(this.cursor-1)),this.cursor=0}add(a){for(let c=0;c<this.sentinels.length;c++){var b;if(b=this.sentinels[c],(a.host||"127.0.0.1")===(b.host||"127.0.0.1")&&(a.port||26379)===(b.port||26379))return!1}return this.sentinels.push(a),!0}toString(){return`${JSON.stringify(this.sentinels)} @${this.cursor}`}}},839885,(a,b,c)=>{"use strict";Object.defineProperty(c,"__esModule",{value:!0}),c.FailoverDetector=void 0;let d=(0,a.r(473501).Debug)("FailoverDetector"),e="+switch-master";c.FailoverDetector=class{constructor(a,b){this.isDisconnected=!1,this.connector=a,this.sentinels=b}cleanup(){for(let a of(this.isDisconnected=!0,this.sentinels))a.client.disconnect()}async subscribe(){d("Starting FailoverDetector");let a=[];for(let b of this.sentinels){let c=b.client.subscribe(e).catch(a=>{d("Failed to subscribe to failover messages on sentinel %s:%s (%s)",b.address.host||"127.0.0.1",b.address.port||26739,a.message)});a.push(c),b.client.on("message",a=>{this.isDisconnected||a!==e||this.disconnect()})}await Promise.all(a)}disconnect(){this.isDisconnected=!0,d("Failover detected, disconnecting"),this.connector.disconnect()}}},400903,(a,b,c)=>{"use strict";Object.defineProperty(c,"__esModule",{value:!0}),c.SentinelIterator=void 0;let d=a.r(504446),e=a.r(473501),f=a.r(755004),g=a.r(718651);c.SentinelIterator=g.default;let h=a.r(73776),i=a.r(278199),j=a.r(839885),k=(0,e.Debug)("SentinelConnector");class l extends h.default{constructor(a){if(super(a.disconnectTimeout),this.options=a,this.emitter=null,this.failoverDetector=null,!this.options.sentinels.length)throw Error("Requires at least one sentinel to connect to.");if(!this.options.name)throw Error("Requires the name of master.");this.sentinelIterator=new g.default(this.options.sentinels)}check(a){let b=!a.role||this.options.role===a.role;return b||(k("role invalid, expected %s, but got %s",this.options.role,a.role),this.sentinelIterator.next(),this.sentinelIterator.next(),this.sentinelIterator.reset(!0)),b}disconnect(){super.disconnect(),this.failoverDetector&&this.failoverDetector.cleanup()}connect(a){let b;this.connecting=!0,this.retryAttempts=0;let c=async()=>{let g=this.sentinelIterator.next();if(g.done){this.sentinelIterator.reset(!1);let d="function"==typeof this.options.sentinelRetryStrategy?this.options.sentinelRetryStrategy(++this.retryAttempts):null,e="number"!=typeof d?"All sentinels are unreachable and retry is disabled.":`All sentinels are unreachable. Retrying from scratch after ${d}ms.`;b&&(e+=` Last error: ${b.message}`),k(e);let f=Error(e);if("number"==typeof d)return a("error",f),await new Promise(a=>setTimeout(a,d)),c();throw f}let h=null,i=null;try{h=await this.resolve(g.value)}catch(a){i=a}if(!this.connecting)throw Error(e.CONNECTION_CLOSED_ERROR_MSG);let j=g.value.host+":"+g.value.port;if(h)return k("resolved: %s:%s from sentinel %s",h.host,h.port,j),this.options.enableTLSForSentinelMode&&this.options.tls?(Object.assign(h,this.options.tls),this.stream=(0,f.connect)(h),this.stream.once("secureConnect",this.initFailoverDetector.bind(this))):(this.stream=(0,d.createConnection)(h),this.stream.once("connect",this.initFailoverDetector.bind(this))),this.stream.once("error",a=>{this.firstError=a}),this.stream;{let d=i?"failed to connect to sentinel "+j+" because "+i.message:"connected to sentinel "+j+" successfully, but got an invalid reply: "+h;return k(d),a("sentinelError",Error(d)),i&&(b=i),c()}};return c()}async updateSentinels(a){if(!this.options.updateSentinels)return;let b=await a.sentinel("sentinels",this.options.name);Array.isArray(b)&&(b.map(e.packObject).forEach(a=>{if(-1===(a.flags?a.flags.split(","):[]).indexOf("disconnected")&&a.ip&&a.port){let b=this.sentinelNatResolve(m(a));this.sentinelIterator.add(b)&&k("adding sentinel %s:%s",b.host,b.port)}}),k("Updated internal sentinels: %s",this.sentinelIterator))}async resolveMaster(a){let b=await a.sentinel("get-master-addr-by-name",this.options.name);return await this.updateSentinels(a),this.sentinelNatResolve(Array.isArray(b)?{host:b[0],port:Number(b[1])}:null)}async resolveSlave(a){let b=await a.sentinel("slaves",this.options.name);if(!Array.isArray(b))return null;let c=b.map(e.packObject).filter(a=>a.flags&&!a.flags.match(/(disconnected|s_down|o_down)/));return this.sentinelNatResolve(function(a,b){let c;if(0===a.length)return null;if("function"==typeof b)c=b(a);else if(null!==b&&"object"==typeof b){let d=Array.isArray(b)?b:[b];d.sort((a,b)=>(a.prio||(a.prio=1),b.prio||(b.prio=1),a.prio<b.prio)?-1:+(a.prio>b.prio));for(let b=0;b<d.length;b++){for(let e=0;e<a.length;e++){let f=a[e];if(f.ip===d[b].ip&&f.port===d[b].port){c=f;break}}if(c)break}}return c||(c=(0,e.sample)(a)),m(c)}(c,this.options.preferredSlaves))}sentinelNatResolve(a){if(!a||!this.options.natMap)return a;let b=`${a.host}:${a.port}`,c=a;return"function"==typeof this.options.natMap?c=this.options.natMap(b)||a:"object"==typeof this.options.natMap&&(c=this.options.natMap[b]||a),c}connectToSentinel(a,b){return new i.default({port:a.port||26379,host:a.host,username:this.options.sentinelUsername||null,password:this.options.sentinelPassword||null,family:a.family||("path"in this.options&&this.options.path?void 0:this.options.family),tls:this.options.sentinelTLS,retryStrategy:null,enableReadyCheck:!1,connectTimeout:this.options.connectTimeout,commandTimeout:this.options.sentinelCommandTimeout,...b})}async resolve(a){let b=this.connectToSentinel(a);b.on("error",n);try{if("slave"===this.options.role)return await this.resolveSlave(b);return await this.resolveMaster(b)}finally{b.disconnect()}}async initFailoverDetector(){var a;if(!this.options.failoverDetector)return;this.sentinelIterator.reset(!0);let b=[];for(;b.length<this.options.sentinelMaxConnections;){let{done:a,value:c}=this.sentinelIterator.next();if(a)break;let d=this.connectToSentinel(c,{lazyConnect:!0,retryStrategy:this.options.sentinelReconnectStrategy});d.on("reconnecting",()=>{var a;null==(a=this.emitter)||a.emit("sentinelReconnecting")}),b.push({address:c,client:d})}this.sentinelIterator.reset(!1),this.failoverDetector&&this.failoverDetector.cleanup(),this.failoverDetector=new j.FailoverDetector(this,b),await this.failoverDetector.subscribe(),null==(a=this.emitter)||a.emit("failoverSubscribed")}}function m(a){return{host:a.ip,port:Number(a.port)}}function n(){}c.default=l},107509,(a,b,c)=>{"use strict";Object.defineProperty(c,"__esModule",{value:!0}),c.SentinelConnector=c.StandaloneConnector=void 0,c.StandaloneConnector=a.r(385686).default,c.SentinelConnector=a.r(400903).default},237214,(a,b,c)=>{"use strict";Object.defineProperty(c,"__esModule",{value:!0});let d=a.r(223950);class e extends d.AbortError{constructor(a){super(`Reached the max retries per request limit (which is ${a}). Refer to "maxRetriesPerRequest" option for details.`),Error.captureStackTrace(this,this.constructor)}get name(){return this.constructor.name}}c.default=e},348420,(a,b,c)=>{"use strict";Object.defineProperty(c,"__esModule",{value:!0}),c.MaxRetriesPerRequestError=void 0,c.MaxRetriesPerRequestError=a.r(237214).default},585829,(a,b,c)=>{"use strict";let d=a.r(500874).Buffer,e=new(a.r(99348)).StringDecoder,f=a.r(223950),g=f.ReplyError,h=f.ParserError;var i=d.allocUnsafe(32768),j=0,k=null,l=0,m=0;function n(a){let b=a.offset,c=a.buffer,d=c.length-1;for(var e=b;e<d;)if(13===c[e++]){if(a.offset=e+1,!0===a.optionReturnBuffers)return a.buffer.slice(b,e-1);return a.buffer.toString("utf8",b,e-1)}}function o(a){let b=a.buffer.length-1;for(var c=a.offset,d=0;c<b;){let b=a.buffer[c++];if(13===b)return a.offset=c+1,d;d=10*d+(b-48)}}function p(a,b,c){a.arrayCache.push(b),a.arrayPos.push(c)}function q(a){let b=a.arrayCache.pop();var c=a.arrayPos.pop();if(a.arrayCache.length){let d=q(a);if(void 0===d)return void p(a,b,c);b[c++]=d}return r(a,b,c)}function r(a,b,c){let d=a.buffer.length;for(;c<b.length;){let e=a.offset;if(a.offset>=d)return void p(a,b,c);let f=s(a,a.buffer[a.offset++]);if(void 0===f){a.arrayCache.length||a.bufferCache.length||(a.offset=e),p(a,b,c);return}b[c]=f,c++}return b}function s(a,b){switch(b){case 36:let c=o(a);if(void 0===c)return;if(c<0)return null;let d=a.offset+c;if(d+2>a.buffer.length){a.bigStrSize=d+2,a.totalChunkSize=a.buffer.length,a.bufferCache.push(a.buffer);return}let e=a.offset;return(a.offset=d+2,!0===a.optionReturnBuffers)?a.buffer.slice(e,d):a.buffer.toString("utf8",e,d);case 43:return n(a);case 42:let f;return void 0===(f=o(a))?void 0:f<0?null:r(a,Array(f),0);case 58:return!0===a.optionStringNumbers?function(a){let b=a.buffer.length-1;var c=a.offset,d=0,e="";for(45===a.buffer[c]&&(e+="-",c++);c<b;){var f=a.buffer[c++];if(13===f)return a.offset=c+1,0!==d&&(e+=d),e;d>0x19999998?(e+=10*d+(f-48),d=0):48===f&&0===d?e+=0:d=10*d+(f-48)}}(a):function(a){let b=a.buffer.length-1;var c=a.offset,d=0,e=1;for(45===a.buffer[c]&&(e=-1,c++);c<b;){let b=a.buffer[c++];if(13===b)return a.offset=c+1,e*d;d=10*d+(b-48)}}(a);case 45:var i=n(a);if(void 0!==i)return!0===a.optionReturnBuffers&&(i=i.toString()),new g(i);return;default:let j;return j=new h("Protocol error, got "+JSON.stringify(String.fromCharCode(b))+" as reply type byte",JSON.stringify(a.buffer),a.offset),void(a.buffer=null,a.returnFatalError(j))}}function t(){if(i.length>51200)if(1===l||m>2*l){let a=Math.floor(i.length/10),b=a<j?j:a;j=0,i=i.slice(b,i.length)}else m++,l--;else clearInterval(k),l=0,m=0,k=null}b.exports=class{constructor(a){if(!a)throw TypeError("Options are mandatory.");if("function"!=typeof a.returnError||"function"!=typeof a.returnReply)throw TypeError("The returnReply and returnError options have to be functions.");this.setReturnBuffers(!!a.returnBuffers),this.setStringNumbers(!!a.stringNumbers),this.returnError=a.returnError,this.returnFatalError=a.returnFatalError||a.returnError,this.returnReply=a.returnReply,this.reset()}reset(){this.offset=0,this.buffer=null,this.bigStrSize=0,this.totalChunkSize=0,this.bufferCache=[],this.arrayCache=[],this.arrayPos=[]}setReturnBuffers(a){if("boolean"!=typeof a)throw TypeError("The returnBuffers argument has to be a boolean");this.optionReturnBuffers=a}setStringNumbers(a){if("boolean"!=typeof a)throw TypeError("The stringNumbers argument has to be a boolean");this.optionStringNumbers=a}execute(a){if(null===this.buffer)this.buffer=a,this.offset=0;else if(0===this.bigStrSize){let b=this.buffer.length,c=b-this.offset,e=d.allocUnsafe(c+a.length);if(this.buffer.copy(e,0,this.offset,b),a.copy(e,c,0,a.length),this.buffer=e,this.offset=0,this.arrayCache.length){let a=q(this);if(void 0===a)return;this.returnReply(a)}}else if(this.totalChunkSize+a.length>=this.bigStrSize){this.bufferCache.push(a);var b=this.optionReturnBuffers?function(a){let b=a.bufferCache,c=a.offset,e=a.bigStrSize-c-2;var f=b.length,g=a.bigStrSize-a.totalChunkSize;if(a.offset=g,g<=2){if(2===f)return b[0].slice(c,b[0].length+g-2);f--,g=b[b.length-2].length+g}i.length<e+j&&(j>0x6f00000&&(j=0x3200000),i=d.allocUnsafe(e*(e>0x4b00000?2:3)+j),j=0,l++,null===k&&(k=setInterval(t,50)));let h=j;b[0].copy(i,h,c,b[0].length),j+=b[0].length-c;for(var m=1;m<f-1;m++)b[m].copy(i,j),j+=b[m].length;return b[m].copy(i,j,0,g-2),j+=g-2,i.slice(h,j)}(this):function(a){let b=a.bufferCache,c=a.offset;var d=b.length,f=a.bigStrSize-a.totalChunkSize;if(a.offset=f,f<=2){if(2===d)return b[0].toString("utf8",c,b[0].length+f-2);d--,f=b[b.length-2].length+f}for(var g=e.write(b[0].slice(c)),h=1;h<d-1;h++)g+=e.write(b[h]);return g+e.end(b[h].slice(0,f-2))}(this);if(this.bigStrSize=0,this.bufferCache=[],this.buffer=a,this.arrayCache.length&&(this.arrayCache[0][this.arrayPos[0]++]=b,void 0===(b=q(this))))return;this.returnReply(b)}else{this.bufferCache.push(a),this.totalChunkSize+=a.length;return}for(;this.offset<this.buffer.length;){let a=this.offset,b=this.buffer[this.offset++],c=s(this,b);if(void 0===c){this.arrayCache.length||this.bufferCache.length||(this.offset=a);return}45===b?this.returnError(c):this.returnReply(c)}this.buffer=null}}},788309,(a,b,c)=>{"use strict";b.exports=a.r(585829)},844019,(a,b,c)=>{"use strict";function d(a){return"unsubscribe"===a?"subscribe":"punsubscribe"===a?"psubscribe":"sunsubscribe"===a?"ssubscribe":a}Object.defineProperty(c,"__esModule",{value:!0}),c.default=class{constructor(){this.set={subscribe:{},psubscribe:{},ssubscribe:{}}}add(a,b){this.set[d(a)][b]=!0}del(a,b){delete this.set[d(a)][b]}channels(a){return Object.keys(this.set[d(a)])}isEmpty(){return 0===this.channels("subscribe").length&&0===this.channels("psubscribe").length&&0===this.channels("ssubscribe").length}}},112664,(a,b,c)=>{"use strict";Object.defineProperty(c,"__esModule",{value:!0});let d=a.r(683302),e=a.r(473501),f=a.r(788309),g=a.r(844019),h=(0,e.Debug)("dataHandler");c.default=class{constructor(a,b){this.redis=a;const c=new f({stringNumbers:b.stringNumbers,returnBuffers:!0,returnError:a=>{this.returnError(a)},returnFatalError:a=>{this.returnFatalError(a)},returnReply:a=>{this.returnReply(a)}});a.stream.prependListener("data",a=>{c.execute(a)}),a.stream.resume()}returnFatalError(a){a.message+=". Please report this.",this.redis.recoverFromFatalError(a,a,{offlineQueue:!1})}returnError(a){let b=this.shiftCommand(a);if(b){if(a.command={name:b.command.name,args:b.command.args},"ssubscribe"==b.command.name&&a.message.includes("MOVED"))return void this.redis.emit("moved");this.redis.handleReconnection(a,b)}}returnReply(a){if(this.handleMonitorReply(a)||this.handleSubscriberReply(a))return;let b=this.shiftCommand(a);b&&(d.default.checkFlag("ENTER_SUBSCRIBER_MODE",b.command.name)?(this.redis.condition.subscriber=new g.default,this.redis.condition.subscriber.add(b.command.name,a[1].toString()),j(b.command,a[2])||this.redis.commandQueue.unshift(b)):d.default.checkFlag("EXIT_SUBSCRIBER_MODE",b.command.name)?k(b.command,a[2])||this.redis.commandQueue.unshift(b):b.command.resolve(a))}handleSubscriberReply(a){if(!this.redis.condition.subscriber)return!1;let b=Array.isArray(a)?a[0].toString():null;switch(h('receive reply "%s" in subscriber mode',b),b){case"message":this.redis.listeners("message").length>0&&this.redis.emit("message",a[1].toString(),a[2]?a[2].toString():""),this.redis.emit("messageBuffer",a[1],a[2]);break;case"pmessage":{let b=a[1].toString();this.redis.listeners("pmessage").length>0&&this.redis.emit("pmessage",b,a[2].toString(),a[3].toString()),this.redis.emit("pmessageBuffer",b,a[2],a[3]);break}case"smessage":this.redis.listeners("smessage").length>0&&this.redis.emit("smessage",a[1].toString(),a[2]?a[2].toString():""),this.redis.emit("smessageBuffer",a[1],a[2]);break;case"ssubscribe":case"subscribe":case"psubscribe":{let c=a[1].toString();this.redis.condition.subscriber.add(b,c);let d=this.shiftCommand(a);if(!d)return;j(d.command,a[2])||this.redis.commandQueue.unshift(d);break}case"sunsubscribe":case"unsubscribe":case"punsubscribe":{let c=a[1]?a[1].toString():null;c&&this.redis.condition.subscriber.del(b,c);let d=a[2];0===Number(d)&&(this.redis.condition.subscriber=!1);let e=this.shiftCommand(a);if(!e)return;k(e.command,d)||this.redis.commandQueue.unshift(e);break}default:{let b=this.shiftCommand(a);if(!b)return;b.command.resolve(a)}}return!0}handleMonitorReply(a){if("monitoring"!==this.redis.status)return!1;let b=a.toString();if("OK"===b)return!1;let c=b.indexOf(" "),d=b.slice(0,c),e=b.indexOf('"'),f=b.slice(e+1,-1).split('" "').map(a=>a.replace(/\\"/g,'"')),g=b.slice(c+2,e-2).split(" ");return this.redis.emit("monitor",d,f,g[1],g[0]),!0}shiftCommand(a){let b=this.redis.commandQueue.shift();if(!b){let b=Error("Command queue state error. If you can reproduce this, please report it."+(a instanceof Error?` Last error: ${a.message}`:` Last reply: ${a.toString()}`));return this.redis.emit("error",b),null}return b}};let i=new WeakMap;function j(a,b){let c=i.has(a)?i.get(a):a.args.length;return(c-=1)<=0?(a.resolve(b),i.delete(a),!0):(i.set(a,c),!1)}function k(a,b){let c=i.has(a)?i.get(a):a.args.length;return 0===c?0===Number(b)&&(i.delete(a),a.resolve(b),!0):(c-=1)<=0?(a.resolve(b),!0):(i.set(a,c),!1)}},551493,(a,b,c)=>{"use strict";Object.defineProperty(c,"__esModule",{value:!0}),c.readyHandler=c.errorHandler=c.closeHandler=c.connectHandler=void 0;let d=a.r(223950),e=a.r(683302),f=a.r(348420),g=a.r(473501),h=a.r(112664),i=(0,g.Debug)("connection");function j(a){let b=new d.AbortError("Command aborted due to connection close");return b.command={name:a.name,args:a.args},b}c.connectHandler=function(a){return function(){var b;a.setStatus("connect"),a.resetCommandQueue();let d=!1,{connectionEpoch:e}=a;a.condition.auth&&a.auth(a.condition.auth,function(b){e===a.connectionEpoch&&b&&(-1!==b.message.indexOf("no password is set")?console.warn("[WARN] Redis server does not require a password, but a password was supplied."):-1!==b.message.indexOf("without any password configured for the default user")?console.warn("[WARN] This Redis server's `default` user does not require a password, but a password was supplied"):-1!==b.message.indexOf("wrong number of arguments for 'auth' command")?console.warn("[ERROR] The server returned \"wrong number of arguments for 'auth' command\". You are probably passing both username and password to Redis version 5 or below. You should only pass the 'password' option for Redis version 5 and under."):(d=!0,a.recoverFromFatalError(b,b)))}),a.condition.select&&a.select(a.condition.select).catch(b=>{a.silentEmit("error",b)}),new h.default(a,{stringNumbers:a.options.stringNumbers});let f=[];a.options.connectionName&&(i("set the connection name [%s]",a.options.connectionName),f.push(a.client("setname",a.options.connectionName).catch(g.noop))),a.options.disableClientInfo||(i("set the client info"),f.push((0,g.getPackageMeta)().then(b=>a.client("SETINFO","LIB-VER",b.version).catch(g.noop)).catch(g.noop)),f.push(a.client("SETINFO","LIB-NAME",(null==(b=a.options)?void 0:b.clientInfoTag)?`ioredis(${a.options.clientInfoTag})`:"ioredis").catch(g.noop))),Promise.all(f).catch(g.noop).finally(()=>{a.options.enableReadyCheck||c.readyHandler(a)(),a.options.enableReadyCheck&&a._readyCheck(function(b,f){e===a.connectionEpoch&&(b?d||a.recoverFromFatalError(Error("Ready check failed: "+b.message),b):a.connector.check(f)?c.readyHandler(a)():a.disconnect(!0))})})}},c.closeHandler=function(a){return function(){let c=a.status;if(a.setStatus("close"),a.commandQueue.length&&function(a){var b;let c=0;for(let d=0;d<a.length;){let e=null==(b=a.peekAt(d))?void 0:b.command,f=e.pipelineIndex;if((void 0===f||0===f)&&(c=0),void 0!==f&&f!==c++){a.remove(d,1),e.reject(j(e));continue}d++}}(a.commandQueue),a.offlineQueue.length&&function(a){var b;for(let c=0;c<a.length;){let d=null==(b=a.peekAt(c))?void 0:b.command;if("multi"===d.name)break;if("exec"===d.name){a.remove(c,1),d.reject(j(d));break}d.inTransaction?(a.remove(c,1),d.reject(j(d))):c++}}(a.offlineQueue),"ready"===c&&(a.prevCondition||(a.prevCondition=a.condition),a.commandQueue.length&&(a.prevCommandQueue=a.commandQueue)),a.manuallyClosing)return a.manuallyClosing=!1,i("skip reconnecting since the connection is manually closed."),b();if("function"!=typeof a.options.retryStrategy)return i("skip reconnecting because `retryStrategy` is not a function"),b();let d=a.options.retryStrategy(++a.retryAttempts);if("number"!=typeof d)return i("skip reconnecting because `retryStrategy` doesn't return a number"),b();i("reconnect in %sms",d),a.setStatus("reconnecting",d),a.reconnectTimeout=setTimeout(function(){a.reconnectTimeout=null,a.connect().catch(g.noop)},d);let{maxRetriesPerRequest:e}=a.options;"number"==typeof e&&(e<0?i("maxRetriesPerRequest is negative, ignoring..."):0==a.retryAttempts%(e+1)&&(i("reach maxRetriesPerRequest limitation, flushing command queue..."),a.flushQueue(new f.MaxRetriesPerRequestError(e))))};function b(){a.setStatus("end"),a.flushQueue(Error(g.CONNECTION_CLOSED_ERROR_MSG))}},c.errorHandler=function(a){return function(b){i("error: %s",b),a.silentEmit("error",b)}},c.readyHandler=function(a){return function(){if(a.setStatus("ready"),a.retryAttempts=0,a.options.monitor){a.call("monitor").then(()=>a.setStatus("monitoring"),b=>a.emit("error",b));let{sendCommand:b}=a;a.sendCommand=function(c){return e.default.checkFlag("VALID_IN_MONITOR_MODE",c.name)?b.call(a,c):(c.reject(Error("Connection is in monitoring mode, can't process commands.")),c.promise)},a.once("close",function(){delete a.sendCommand});return}let b=a.prevCondition?a.prevCondition.select:a.condition.select;if(a.options.readOnly&&(i("set the connection to readonly mode"),a.readonly().catch(g.noop)),a.prevCondition){let c=a.prevCondition;if(a.prevCondition=null,c.subscriber&&a.options.autoResubscribe){a.condition.select!==b&&(i("connect to db [%d]",b),a.select(b));let d=c.subscriber.channels("subscribe");d.length&&(i("subscribe %d channels",d.length),a.subscribe(d));let e=c.subscriber.channels("psubscribe");e.length&&(i("psubscribe %d channels",e.length),a.psubscribe(e));let f=c.subscriber.channels("ssubscribe");if(f.length)for(let b of(i("ssubscribe %s",f.length),f))a.ssubscribe(b)}}if(a.prevCommandQueue)if(a.options.autoResendUnfulfilledCommands)for(i("resend %d unfulfilled commands",a.prevCommandQueue.length);a.prevCommandQueue.length>0;){let b=a.prevCommandQueue.shift();b.select!==a.condition.select&&"select"!==b.command.name&&a.select(b.select),a.sendCommand(b.command,b.stream)}else a.prevCommandQueue=null;if(a.offlineQueue.length){i("send %d commands in offline queue",a.offlineQueue.length);let b=a.offlineQueue;for(a.resetOfflineQueue();b.length>0;){let c=b.shift();c.select!==a.condition.select&&"select"!==c.command.name&&a.select(c.select),a.sendCommand(c.command,c.stream)}}a.condition.select!==b&&(i("connect to db [%d]",b),a.select(b))}}},421633,(a,b,c)=>{"use strict";Object.defineProperty(c,"__esModule",{value:!0}),c.DEFAULT_REDIS_OPTIONS=void 0,c.DEFAULT_REDIS_OPTIONS={port:6379,host:"localhost",family:0,connectTimeout:1e4,disconnectTimeout:2e3,retryStrategy:function(a){return Math.min(50*a,2e3)},keepAlive:0,noDelay:!0,connectionName:null,disableClientInfo:!1,clientInfoTag:void 0,sentinels:null,name:null,role:"master",sentinelRetryStrategy:function(a){return Math.min(10*a,1e3)},sentinelReconnectStrategy:function(){return 6e4},natMap:null,enableTLSForSentinelMode:!1,updateSentinels:!0,failoverDetector:!1,username:null,password:null,db:0,enableOfflineQueue:!0,enableReadyCheck:!0,autoResubscribe:!0,autoResendUnfulfilledCommands:!0,lazyConnect:!1,keyPrefix:"",reconnectOnError:null,readOnly:!1,stringNumbers:!1,maxRetriesPerRequest:20,maxLoadingRetryTime:1e4,enableAutoPipelining:!1,autoPipeliningIgnoredCommands:[],sentinelMaxConnections:10}},278199,(a,b,c)=>{"use strict";Object.defineProperty(c,"__esModule",{value:!0});let d=a.r(870791),e=a.r(427699),f=a.r(662839),g=a.r(138446),h=a.r(683302),i=a.r(107509),j=a.r(400903),k=a.r(551493),l=a.r(421633),m=a.r(394558),n=a.r(979993),o=a.r(473501),p=a.r(668224),q=a.r(554e3),r=a.r(159973),s=a.r(917769),t=(0,o.Debug)("redis");class u extends q.default{constructor(a,b,c){if(super(),this.status="wait",this.isCluster=!1,this.reconnectTimeout=null,this.connectionEpoch=0,this.retryAttempts=0,this.manuallyClosing=!1,this._autoPipelines=new Map,this._runningAutoPipelines=new Set,this.parseOptions(a,b,c),e.EventEmitter.call(this),this.resetCommandQueue(),this.resetOfflineQueue(),this.options.Connector)this.connector=new this.options.Connector(this.options);else if(this.options.sentinels){const a=new j.default(this.options);a.emitter=this,this.connector=a}else this.connector=new i.StandaloneConnector(this.options);this.options.scripts&&Object.entries(this.options.scripts).forEach(([a,b])=>{this.defineCommand(a,b)}),this.options.lazyConnect?this.setStatus("wait"):this.connect().catch(r.noop)}static createClient(...a){return new u(...a)}get autoPipelineQueueSize(){let a=0;for(let b of this._autoPipelines.values())a+=b.length;return a}connect(a){let b=new Promise((a,b)=>{if("connecting"===this.status||"connect"===this.status||"ready"===this.status)return void b(Error("Redis is already connecting/connected"));this.connectionEpoch+=1,this.setStatus("connecting");let{options:c}=this;this.condition={select:c.db,auth:c.username?[c.username,c.password]:c.password,subscriber:!1};let d=this;(0,f.default)(this.connector.connect(function(a,b){d.silentEmit(a,b)}),function(e,f){if(e){d.flushQueue(e),d.silentEmit("error",e),b(e),d.setStatus("end");return}let g=c.tls?"secureConnect":"connect";if("sentinels"in c&&c.sentinels&&!c.enableTLSForSentinelMode&&(g="connect"),d.stream=f,c.noDelay&&f.setNoDelay(!0),"number"==typeof c.keepAlive&&(f.connecting?f.once(g,()=>{f.setKeepAlive(!0,c.keepAlive)}):f.setKeepAlive(!0,c.keepAlive)),f.connecting){if(f.once(g,k.connectHandler(d)),c.connectTimeout){let a=!1;f.setTimeout(c.connectTimeout,function(){if(a)return;f.setTimeout(0),f.destroy();let b=Error("connect ETIMEDOUT");b.errorno="ETIMEDOUT",b.code="ETIMEDOUT",b.syscall="connect",k.errorHandler(d)(b)}),f.once(g,function(){a=!0,f.setTimeout(0)})}}else if(f.destroyed){let a=d.connector.firstError;a&&process.nextTick(()=>{k.errorHandler(d)(a)}),process.nextTick(k.closeHandler(d))}else process.nextTick(k.connectHandler(d));f.destroyed||(f.once("error",k.errorHandler(d)),f.once("close",k.closeHandler(d)));let h=function(){d.removeListener("close",i),a()};var i=function(){d.removeListener("ready",h),b(Error(o.CONNECTION_CLOSED_ERROR_MSG))};d.once("ready",h),d.once("close",i)})});return(0,f.default)(b,a)}disconnect(a=!1){a||(this.manuallyClosing=!0),this.reconnectTimeout&&!a&&(clearTimeout(this.reconnectTimeout),this.reconnectTimeout=null),"wait"===this.status?k.closeHandler(this)():this.connector.disconnect()}end(){this.disconnect()}duplicate(a){return new u({...this.options,...a})}get mode(){var a;return this.options.monitor?"monitor":(null==(a=this.condition)?void 0:a.subscriber)?"subscriber":"normal"}monitor(a){let b=this.duplicate({monitor:!0,lazyConnect:!1});return(0,f.default)(new Promise(function(a,c){b.once("error",c),b.once("monitoring",function(){a(b)})}),a)}sendCommand(a,b){var c,e;if("wait"===this.status&&this.connect().catch(r.noop),"end"===this.status)return a.reject(Error(o.CONNECTION_CLOSED_ERROR_MSG)),a.promise;if((null==(c=this.condition)?void 0:c.subscriber)&&!h.default.checkFlag("VALID_IN_SUBSCRIBER_MODE",a.name))return a.reject(Error("Connection in subscriber mode, only subscriber commands may be used")),a.promise;"number"==typeof this.options.commandTimeout&&a.setTimeout(this.options.commandTimeout);let f="ready"===this.status||!b&&"connect"===this.status&&(0,d.exists)(a.name)&&((0,d.hasFlag)(a.name,"loading")||h.default.checkFlag("HANDSHAKE_COMMANDS",a.name));if(this.stream&&this.stream.writable?this.stream._writableState&&this.stream._writableState.ended&&(f=!1):f=!1,f)t.enabled&&t("write command[%s]: %d -> %s(%o)",this._getDescription(),null==(e=this.condition)?void 0:e.select,a.name,a.args),b?"isPipeline"in b&&b.isPipeline?b.write(a.toWritable(b.destination.redis.stream)):b.write(a.toWritable(b)):this.stream.write(a.toWritable(this.stream)),this.commandQueue.push({command:a,stream:b,select:this.condition.select}),h.default.checkFlag("WILL_DISCONNECT",a.name)&&(this.manuallyClosing=!0),void 0!==this.options.socketTimeout&&void 0===this.socketTimeoutTimer&&this.setSocketTimeout();else{if(!this.options.enableOfflineQueue)return a.reject(Error("Stream isn't writeable and enableOfflineQueue options is false")),a.promise;if("quit"===a.name&&0===this.offlineQueue.length)return this.disconnect(),a.resolve(Buffer.from("OK")),a.promise;t.enabled&&t("queue command[%s]: %d -> %s(%o)",this._getDescription(),this.condition.select,a.name,a.args),this.offlineQueue.push({command:a,stream:b,select:this.condition.select})}if("select"===a.name&&(0,o.isInt)(a.args[0])){let b=parseInt(a.args[0],10);this.condition.select!==b&&(this.condition.select=b,this.emit("select",b),t("switch to db [%d]",this.condition.select))}return a.promise}setSocketTimeout(){this.socketTimeoutTimer=setTimeout(()=>{this.stream.destroy(Error(`Socket timeout. Expecting data, but didn't receive any in ${this.options.socketTimeout}ms.`)),this.socketTimeoutTimer=void 0},this.options.socketTimeout),this.stream.once("data",()=>{clearTimeout(this.socketTimeoutTimer),this.socketTimeoutTimer=void 0,0!==this.commandQueue.length&&this.setSocketTimeout()})}scanStream(a){return this.createScanStream("scan",{options:a})}scanBufferStream(a){return this.createScanStream("scanBuffer",{options:a})}sscanStream(a,b){return this.createScanStream("sscan",{key:a,options:b})}sscanBufferStream(a,b){return this.createScanStream("sscanBuffer",{key:a,options:b})}hscanStream(a,b){return this.createScanStream("hscan",{key:a,options:b})}hscanBufferStream(a,b){return this.createScanStream("hscanBuffer",{key:a,options:b})}zscanStream(a,b){return this.createScanStream("zscan",{key:a,options:b})}zscanBufferStream(a,b){return this.createScanStream("zscanBuffer",{key:a,options:b})}silentEmit(a,b){let c;if("error"!==a||(c=b,"end"!==this.status&&(!this.manuallyClosing||!(c instanceof Error)||c.message!==o.CONNECTION_CLOSED_ERROR_MSG&&"connect"!==c.syscall&&"read"!==c.syscall)))return this.listeners(a).length>0?this.emit.apply(this,arguments):(c&&c instanceof Error&&console.error("[ioredis] Unhandled error event:",c.stack),!1)}recoverFromFatalError(a,b,c){this.flushQueue(b,c),this.silentEmit("error",b),this.disconnect(!0)}handleReconnection(a,b){var c;let d=!1;switch(this.options.reconnectOnError&&!h.default.checkFlag("IGNORE_RECONNECT_ON_ERROR",b.command.name)&&(d=this.options.reconnectOnError(a)),d){case 1:case!0:"reconnecting"!==this.status&&this.disconnect(!0),b.command.reject(a);break;case 2:"reconnecting"!==this.status&&this.disconnect(!0),(null==(c=this.condition)?void 0:c.select)!==b.select&&"select"!==b.command.name&&this.select(b.select),this.sendCommand(b.command);break;default:b.command.reject(a)}}_getDescription(){let a;return a="path"in this.options&&this.options.path?this.options.path:this.stream&&this.stream.remoteAddress&&this.stream.remotePort?this.stream.remoteAddress+":"+this.stream.remotePort:"host"in this.options&&this.options.host?this.options.host+":"+this.options.port:"",this.options.connectionName&&(a+=` (${this.options.connectionName})`),a}resetCommandQueue(){this.commandQueue=new s}resetOfflineQueue(){this.offlineQueue=new s}parseOptions(...a){let b={},c=!1;for(let d=0;d<a.length;++d){let e=a[d];if(null!=e)if("object"==typeof e)(0,r.defaults)(b,e);else if("string"==typeof e)(0,r.defaults)(b,(0,o.parseURL)(e)),e.startsWith("rediss://")&&(c=!0);else if("number"==typeof e)b.port=e;else throw Error("Invalid argument "+e)}c&&(0,r.defaults)(b,{tls:!0}),(0,r.defaults)(b,u.defaultOptions),"string"==typeof b.port&&(b.port=parseInt(b.port,10)),"string"==typeof b.db&&(b.db=parseInt(b.db,10)),this.options=(0,o.resolveTLSProfile)(b)}setStatus(a,b){t.enabled&&t("status[%s]: %s -> %s",this._getDescription(),this.status||"[empty]",a),this.status=a,process.nextTick(this.emit.bind(this,a,b))}createScanStream(a,{key:b,options:c={}}){return new m.default({objectMode:!0,key:b,redis:this,command:a,...c})}flushQueue(a,b){let c;if((b=(0,r.defaults)({},b,{offlineQueue:!0,commandQueue:!0})).offlineQueue)for(;c=this.offlineQueue.shift();)c.command.reject(a);if(b.commandQueue&&this.commandQueue.length>0)for(this.stream&&this.stream.removeAllListeners("data");c=this.commandQueue.shift();)c.command.reject(a)}_readyCheck(a){let b=this;this.info(function(c,d){if(c)return c.message&&c.message.includes("NOPERM")?(console.warn(`Skipping the ready check because INFO command fails: "${c.message}". You can disable ready check with "enableReadyCheck". More: https://github.com/luin/ioredis/wiki/Disable-ready-check.`),a(null,{})):a(c);if("string"!=typeof d)return a(null,d);let e={},f=d.split("\r\n");for(let a=0;a<f.length;++a){let[b,...c]=f[a].split(":"),d=c.join(":");d&&(e[b]=d)}if(e.loading&&"0"!==e.loading){let c=1e3*(e.loading_eta_seconds||1),d=b.options.maxLoadingRetryTime&&b.options.maxLoadingRetryTime<c?b.options.maxLoadingRetryTime:c;t("Redis server still loading, trying again in "+d+"ms"),setTimeout(function(){b._readyCheck(a)},d)}else a(null,e)}).catch(r.noop)}}u.Cluster=g.default,u.Command=h.default,u.defaultOptions=l.DEFAULT_REDIS_OPTIONS,(0,p.default)(u,e.EventEmitter),(0,n.addTransactionSupport)(u.prototype),c.default=u},319989,(a,b,c)=>{"use strict";Object.defineProperty(c,"__esModule",{value:!0}),c.print=c.ReplyError=c.SentinelIterator=c.SentinelConnector=c.AbstractConnector=c.Pipeline=c.ScanStream=c.Command=c.Cluster=c.Redis=c.default=void 0,c=b.exports=a.r(278199).default;var d=a.r(278199);Object.defineProperty(c,"default",{enumerable:!0,get:function(){return d.default}});var e=a.r(278199);Object.defineProperty(c,"Redis",{enumerable:!0,get:function(){return e.default}});var f=a.r(138446);Object.defineProperty(c,"Cluster",{enumerable:!0,get:function(){return f.default}});var g=a.r(683302);Object.defineProperty(c,"Command",{enumerable:!0,get:function(){return g.default}});var h=a.r(394558);Object.defineProperty(c,"ScanStream",{enumerable:!0,get:function(){return h.default}});var i=a.r(542541);Object.defineProperty(c,"Pipeline",{enumerable:!0,get:function(){return i.default}});var j=a.r(73776);Object.defineProperty(c,"AbstractConnector",{enumerable:!0,get:function(){return j.default}});var k=a.r(400903);Object.defineProperty(c,"SentinelConnector",{enumerable:!0,get:function(){return k.default}}),Object.defineProperty(c,"SentinelIterator",{enumerable:!0,get:function(){return k.SentinelIterator}}),c.ReplyError=a.r(223950).ReplyError,Object.defineProperty(c,"Promise",{get:()=>(console.warn("ioredis v5 does not support plugging third-party Promise library anymore. Native Promise will be used."),Promise),set(a){console.warn("ioredis v5 does not support plugging third-party Promise library anymore. Native Promise will be used.")}}),c.print=function(a,b){a?console.log("Error: "+a):console.log("Reply: "+b)}},532743,(a,b,c)=>{"use strict";let d=()=>"linux"===process.platform,e=null;b.exports={isLinux:d,getReport:()=>(!e&&(d()&&process.report||(e={})),e)}},918815,(a,b,c)=>{"use strict";let d=a.r(522734);b.exports={LDD_PATH:"/usr/bin/ldd",SELF_PATH:"/proc/self/exe",readFileSync:a=>{let b=d.openSync(a,"r"),c=Buffer.alloc(2048),e=d.readSync(b,c,0,2048,0);return d.close(b,()=>{}),c.subarray(0,e)},readFile:a=>new Promise((b,c)=>{d.open(a,"r",(a,e)=>{if(a)c(a);else{let a=Buffer.alloc(2048);d.read(e,a,0,2048,0,(c,f)=>{b(a.subarray(0,f)),d.close(e,()=>{})})}})})}},805498,(a,b,c)=>{"use strict";b.exports={interpreterPath:a=>{if(a.length<64||0x7f454c46!==a.readUInt32BE(0)||2!==a.readUInt8(4)||1!==a.readUInt8(5))return null;let b=a.readUInt32LE(32),c=a.readUInt16LE(54),d=a.readUInt16LE(56);for(let e=0;e<d;e++){let d=b+e*c;if(3===a.readUInt32LE(d)){let b=a.readUInt32LE(d+8),c=a.readUInt32LE(d+32);return a.subarray(b,b+c).toString().replace(/\0.*$/g,"")}}return null}}},368078,(a,b,c)=>{"use strict";let d,e,f,g=a.r(233405),{isLinux:h,getReport:i}=a.r(532743),{LDD_PATH:j,SELF_PATH:k,readFile:l,readFileSync:m}=a.r(918815),{interpreterPath:n}=a.r(805498),o="getconf GNU_LIBC_VERSION 2>&1 || true; ldd --version 2>&1 || true",p="",q=()=>p||new Promise(a=>{g.exec(o,(b,c)=>{a(p=b?" ":c)})}),r=()=>{if(!p)try{p=g.execSync(o,{encoding:"utf8"})}catch(a){p=" "}return p},s="glibc",t=/LIBC[a-z0-9 \-).]*?(\d+\.\d+)/i,u="musl",v=a=>a.includes("libc.musl-")||a.includes("ld-musl-"),w=()=>{let a=i();return a.header&&a.header.glibcVersionRuntime?s:Array.isArray(a.sharedObjects)&&a.sharedObjects.some(v)?u:null},x=a=>{let[b,c]=a.split(/[\r\n]+/);return b&&b.includes(s)?s:c&&c.includes(u)?u:null},y=a=>{if(a){if(a.includes("/ld-musl-"))return u;else if(a.includes("/ld-linux-"))return s}return null},z=a=>(a=a.toString()).includes("musl")?u:a.includes("GNU C Library")?s:null,A=async()=>{if(void 0!==e)return e;e=null;try{let a=await l(j);e=z(a)}catch(a){}return e},B=async()=>{if(void 0!==d)return d;d=null;try{let a=await l(k),b=n(a);d=y(b)}catch(a){}return d},C=async()=>{let a=null;return h()&&((a=await B())||((a=await A())||(a=w()),a||(a=x(await q())))),a},D=()=>{let a=null;return h()&&((a=(()=>{if(void 0!==d)return d;d=null;try{let a=m(k),b=n(a);d=y(b)}catch(a){}return d})())||((a=(()=>{if(void 0!==e)return e;e=null;try{let a=m(j);e=z(a)}catch(a){}return e})())||(a=w()),a||(a=x(r())))),a},E=async()=>h()&&await C()!==s,F=async()=>{if(void 0!==f)return f;f=null;try{let a=(await l(j)).match(t);a&&(f=a[1])}catch(a){}return f},G=()=>{let a=i();return a.header&&a.header.glibcVersionRuntime?a.header.glibcVersionRuntime:null},H=a=>a.trim().split(/\s+/)[1],I=a=>{let[b,c,d]=a.split(/[\r\n]+/);return b&&b.includes(s)?H(b):c&&d&&c.includes(u)?H(d):null};b.exports={GLIBC:s,MUSL:u,family:C,familySync:D,isNonGlibcLinux:E,isNonGlibcLinuxSync:()=>h()&&D()!==s,version:async()=>{let a=null;return h()&&((a=await F())||(a=G()),a||(a=I(await q()))),a},versionSync:()=>{let a=null;return h()&&((a=(()=>{if(void 0!==f)return f;f=null;try{let a=m(j).match(t);a&&(f=a[1])}catch(a){}return f})())||(a=G()),a||(a=I(r()))),a}}},998223,(a,b,c)=>{var d=a.r(522734),e=a.r(814747),f=a.r(792509),g=a.r(446786),h="function"==typeof __webpack_require__?__non_webpack_require__:a.t,i=process.config&&process.config.variables||{},j=!!process.env.PREBUILDS_ONLY,k=process.versions,l=k.modules;(k.deno||process.isBun)&&(l="unsupported");var m=process.versions&&process.versions.electron||process.env.ELECTRON_RUN_AS_NODE?"electron":process.versions&&process.versions.nw?"node-webkit":"node",n=process.env.npm_config_arch||g.arch(),o=process.env.npm_config_platform||g.platform(),p=process.env.LIBC||(!function(b){if("linux"!==b)return!1;let{familySync:c,MUSL:d}=a.r(368078);return c()===d}(o)?"glibc":"musl"),q=process.env.ARM_VERSION||("arm64"===n?"8":i.arm_version)||"",r=(k.uv||"").split(".")[0];function s(a){return h(s.resolve(a))}function t(a){try{return d.readdirSync(a)}catch(a){return[]}}function u(a,b){var c=t(a).filter(b);return c[0]&&e.join(a,c[0])}function v(a){return/\.node$/.test(a)}function w(a){var b=a.split("-");if(2===b.length){var c=b[0],d=b[1].split("+");if(c&&d.length&&d.every(Boolean))return{name:a,platform:c,architectures:d}}}function x(a,b){return function(c){return null!=c&&c.platform===a&&c.architectures.includes(b)}}function y(a,b){return a.architectures.length-b.architectures.length}function z(a){var b=a.split("."),c=b.pop(),d={file:a,specificity:0};if("node"===c){for(var e=0;e<b.length;e++){var f=b[e];if("node"===f||"electron"===f||"node-webkit"===f)d.runtime=f;else if("napi"===f)d.napi=!0;else if("abi"===f.slice(0,3))d.abi=f.slice(3);else if("uv"===f.slice(0,2))d.uv=f.slice(2);else if("armv"===f.slice(0,4))d.armv=f.slice(4);else{if("glibc"!==f&&"musl"!==f)continue;d.libc=f}d.specificity++}return d}}function A(a,b){return function(c){var d;return null!=c&&(c.runtime===a||!!("node"===(d=c).runtime&&d.napi))&&(c.abi===b||!!c.napi)&&(!c.uv||c.uv===r)&&(!c.armv||c.armv===q)&&(!c.libc||c.libc===p)&&!0}}function B(a){return function(b,c){return b.runtime!==c.runtime?b.runtime===a?-1:1:b.abi!==c.abi?b.abi?-1:1:b.specificity!==c.specificity?b.specificity>c.specificity?-1:1:0}}b.exports=s,s.resolve=s.path=function(b){b=e.resolve(b||".");var c,d,g="";try{var i=(g=h(e.join(b,"package.json")).name).toUpperCase().replace(/-/g,"_");process.env[i+"_PREBUILD"]&&(b=process.env[i+"_PREBUILD"])}catch(a){c=a}if(!j){var k=u(e.join(b,"build/Release"),v);if(k)return k;var s=u(e.join(b,"build/Debug"),v);if(s)return s}var C=H(b);if(C)return C;var D=H(e.dirname(process.execPath));if(D)return D;var E=("@"==g[0]?"":"@"+g+"/")+g+"-"+o+"-"+n;try{var F=e.dirname(a.r(362562).createRequire(f.pathToFileURL(e.join(b,"package.json"))).resolve(E));return I(F)}catch(a){d=a}let G="No native build was found for "+["platform="+o,"arch="+n,"runtime="+m,"abi="+l,"uv="+r,q?"armv="+q:"","libc="+p,"node="+process.versions.node,process.versions.electron?"electron="+process.versions.electron:"","function"==typeof __webpack_require__?"webpack=true":""].filter(Boolean).join(" ")+"\n    attempted loading from: "+b+" and package: "+E+"\n";throw c&&(G+="Error finding package.json: "+c.message+"\n"),d&&(G+="Error resolving package: "+d.message+"\n"),Error(G);function H(a){var b=t(e.join(a,"prebuilds")).map(w).filter(x(o,n)).sort(y)[0];if(b)return I(e.join(a,"prebuilds",b.name))}function I(a){var b=t(a).map(z).filter(A(m,l)).sort(B(m))[0];if(b)return e.join(a,b.file)}},s.parseTags=z,s.matchTags=A,s.compareTags=B,s.parseTuple=w,s.matchTuple=x,s.compareTuples=y},484286,(a,b,c)=>{let d="function"==typeof __webpack_require__?__non_webpack_require__:a.t;"function"==typeof d.addon?b.exports=d.addon.bind(d):b.exports=a.r(998223)},337531,(a,b,c)=>{b.exports=a.r(484286)("/ROOT/node_modules/.pnpm/msgpackr-extract@3.0.3/node_modules/msgpackr-extract")},666127,(a,b,c)=>{"use strict";let d;Object.defineProperty(c,"__esModule",{value:!0});class e extends Error{}class f extends e{constructor(a){super(`Invalid DateTime: ${a.toMessage()}`)}}class g extends e{constructor(a){super(`Invalid Interval: ${a.toMessage()}`)}}class h extends e{constructor(a){super(`Invalid Duration: ${a.toMessage()}`)}}class i extends e{}class j extends e{constructor(a){super(`Invalid unit ${a}`)}}class k extends e{}class l extends e{constructor(){super("Zone is an abstract class")}}let m="numeric",n="short",o="long",p={year:m,month:m,day:m},q={year:m,month:n,day:m},r={year:m,month:n,day:m,weekday:n},s={year:m,month:o,day:m},t={year:m,month:o,day:m,weekday:o},u={hour:m,minute:m},v={hour:m,minute:m,second:m},w={hour:m,minute:m,second:m,timeZoneName:n},x={hour:m,minute:m,second:m,timeZoneName:o},y={hour:m,minute:m,hourCycle:"h23"},z={hour:m,minute:m,second:m,hourCycle:"h23"},A={hour:m,minute:m,second:m,hourCycle:"h23",timeZoneName:n},B={hour:m,minute:m,second:m,hourCycle:"h23",timeZoneName:o},C={year:m,month:m,day:m,hour:m,minute:m},D={year:m,month:m,day:m,hour:m,minute:m,second:m},E={year:m,month:n,day:m,hour:m,minute:m},F={year:m,month:n,day:m,hour:m,minute:m,second:m},G={year:m,month:n,day:m,weekday:n,hour:m,minute:m},H={year:m,month:o,day:m,hour:m,minute:m,timeZoneName:n},I={year:m,month:o,day:m,hour:m,minute:m,second:m,timeZoneName:n},J={year:m,month:o,day:m,weekday:o,hour:m,minute:m,timeZoneName:o},K={year:m,month:o,day:m,weekday:o,hour:m,minute:m,second:m,timeZoneName:o};class L{get type(){throw new l}get name(){throw new l}get ianaName(){return this.name}get isUniversal(){throw new l}offsetName(a,b){throw new l}formatOffset(a,b){throw new l}offset(a){throw new l}equals(a){throw new l}get isValid(){throw new l}}let M=null;class N extends L{static get instance(){return null===M&&(M=new N),M}get type(){return"system"}get name(){return new Intl.DateTimeFormat().resolvedOptions().timeZone}get isUniversal(){return!1}offsetName(a,{format:b,locale:c}){return a4(a,b,c)}formatOffset(a,b){return a8(this.offset(a),b)}offset(a){return-new Date(a).getTimezoneOffset()}equals(a){return"system"===a.type}get isValid(){return!0}}let O=new Map,P={year:0,month:1,day:2,era:3,hour:4,minute:5,second:6},Q=new Map;class R extends L{static create(a){let b=Q.get(a);return void 0===b&&Q.set(a,b=new R(a)),b}static resetCache(){Q.clear(),O.clear()}static isValidSpecifier(a){return this.isValidZone(a)}static isValidZone(a){if(!a)return!1;try{return new Intl.DateTimeFormat("en-US",{timeZone:a}).format(),!0}catch(a){return!1}}constructor(a){super(),this.zoneName=a,this.valid=R.isValidZone(a)}get type(){return"iana"}get name(){return this.zoneName}get isUniversal(){return!1}offsetName(a,{format:b,locale:c}){return a4(a,b,c,this.name)}formatOffset(a,b){return a8(this.offset(a),b)}offset(a){var b;let c;if(!this.valid)return NaN;let d=new Date(a);if(isNaN(d))return NaN;let e=(b=this.name,void 0===(c=O.get(b))&&(c=new Intl.DateTimeFormat("en-US",{hour12:!1,timeZone:b,year:"numeric",month:"2-digit",day:"2-digit",hour:"2-digit",minute:"2-digit",second:"2-digit",era:"short"}),O.set(b,c)),c),[f,g,h,i,j,k,l]=e.formatToParts?function(a,b){let c=a.formatToParts(b),d=[];for(let a=0;a<c.length;a++){let{type:b,value:e}=c[a],f=P[b];"era"===b?d[f]=e:aL(f)||(d[f]=parseInt(e,10))}return d}(e,d):function(a,b){let c=a.format(b).replace(/\u200E/g,""),[,d,e,f,g,h,i,j]=/(\d+)\/(\d+)\/(\d+) (AD|BC),? (\d+):(\d+):(\d+)/.exec(c);return[f,d,e,g,h,i,j]}(e,d);"BC"===i&&(f=-Math.abs(f)+1);let m=a0({year:f,month:g,day:h,hour:24===j?0:j,minute:k,second:l,millisecond:0}),n=+d,o=n%1e3;return(m-(n-=o>=0?o:1e3+o))/6e4}equals(a){return"iana"===a.type&&a.name===this.name}get isValid(){return this.valid}}let S={},T=new Map;function U(a,b={}){let c=JSON.stringify([a,b]),d=T.get(c);return void 0===d&&(d=new Intl.DateTimeFormat(a,b),T.set(c,d)),d}let V=new Map,W=new Map,X=null,Y=new Map;function Z(a){let b=Y.get(a);return void 0===b&&(b=new Intl.DateTimeFormat(a).resolvedOptions(),Y.set(a,b)),b}let $=new Map;function _(a,b,c,d){let e=a.listingMode();return"error"===e?null:"en"===e?c(b):d(b)}class aa{constructor(a,b,c){this.padTo=c.padTo||0,this.floor=c.floor||!1;const{padTo:d,floor:e,...f}=c;if(!b||Object.keys(f).length>0){const b={useGrouping:!1,...c};c.padTo>0&&(b.minimumIntegerDigits=c.padTo),this.inf=function(a,b={}){let c=JSON.stringify([a,b]),d=V.get(c);return void 0===d&&(d=new Intl.NumberFormat(a,b),V.set(c,d)),d}(a,b)}}format(a){if(!this.inf)return aU(this.floor?Math.floor(a):aY(a,3),this.padTo);{let b=this.floor?Math.floor(a):a;return this.inf.format(b)}}}class ab{constructor(a,b,c){let d;if(this.opts=c,this.originalZone=void 0,this.opts.timeZone)this.dt=a;else if("fixed"===a.zone.type){const b=-1*(a.offset/60),c=b>=0?`Etc/GMT+${b}`:`Etc/GMT${b}`;0!==a.offset&&R.create(c).valid?(d=c,this.dt=a):(d="UTC",this.dt=0===a.offset?a:a.setZone("UTC").plus({minutes:a.offset}),this.originalZone=a.zone)}else"system"===a.zone.type?this.dt=a:"iana"===a.zone.type?(this.dt=a,d=a.zone.name):(d="UTC",this.dt=a.setZone("UTC").plus({minutes:a.offset}),this.originalZone=a.zone);const e={...this.opts};e.timeZone=e.timeZone||d,this.dtf=U(b,e)}format(){return this.originalZone?this.formatToParts().map(({value:a})=>a).join(""):this.dtf.format(this.dt.toJSDate())}formatToParts(){let a=this.dtf.formatToParts(this.dt.toJSDate());return this.originalZone?a.map(a=>{if("timeZoneName"!==a.type)return a;{let b=this.originalZone.offsetName(this.dt.ts,{locale:this.dt.locale,format:this.opts.timeZoneName});return{...a,value:b}}}):a}resolvedOptions(){return this.dtf.resolvedOptions()}}class ac{constructor(a,b,c){this.opts={style:"long",...c},!b&&aO()&&(this.rtf=function(a,b={}){let{base:c,...d}=b,e=JSON.stringify([a,d]),f=W.get(e);return void 0===f&&(f=new Intl.RelativeTimeFormat(a,b),W.set(e,f)),f}(a,c))}format(a,b){return this.rtf?this.rtf.format(a,b):function(a,b,c="always",d=!1){let e={years:["year","yr."],quarters:["quarter","qtr."],months:["month","mo."],weeks:["week","wk."],days:["day","day","days"],hours:["hour","hr."],minutes:["minute","min."],seconds:["second","sec."]},f=-1===["hours","minutes","seconds"].indexOf(a);if("auto"===c&&f){let c="days"===a;switch(b){case 1:return c?"tomorrow":`next ${e[a][0]}`;case -1:return c?"yesterday":`last ${e[a][0]}`;case 0:return c?"today":`this ${e[a][0]}`}}let g=Object.is(b,-0)||b<0,h=Math.abs(b),i=1===h,j=e[a],k=d?i?j[1]:j[2]||j[1]:i?e[a][0]:a;return g?`${h} ${k} ago`:`in ${h} ${k}`}(b,a,this.opts.numeric,"long"!==this.opts.style)}formatToParts(a,b){return this.rtf?this.rtf.formatToParts(a,b):[]}}let ad={firstDay:1,minimalDays:4,weekend:[6,7]};class ae{static fromOpts(a){return ae.create(a.locale,a.numberingSystem,a.outputCalendar,a.weekSettings,a.defaultToEN)}static create(a,b,c,d,e=!1){let f=a||aw.defaultLocale;return new ae(f||(e?"en-US":X||(X=new Intl.DateTimeFormat().resolvedOptions().locale)),b||aw.defaultNumberingSystem,c||aw.defaultOutputCalendar,aS(d)||aw.defaultWeekSettings,f)}static resetCache(){X=null,T.clear(),V.clear(),W.clear(),Y.clear(),$.clear()}static fromObject({locale:a,numberingSystem:b,outputCalendar:c,weekSettings:d}={}){return ae.create(a,b,c,d)}constructor(a,b,c,d,e){const[f,g,h]=function(a){let b=a.indexOf("-x-");-1!==b&&(a=a.substring(0,b));let c=a.indexOf("-u-");if(-1===c)return[a];{let b,d;try{b=U(a).resolvedOptions(),d=a}catch(f){let e=a.substring(0,c);b=U(e).resolvedOptions(),d=e}let{numberingSystem:e,calendar:f}=b;return[d,e,f]}}(a);this.locale=f,this.numberingSystem=b||g||null,this.outputCalendar=c||h||null,this.weekSettings=d,this.intl=function(a,b,c){return(c||b)&&(a.includes("-u-")||(a+="-u"),c&&(a+=`-ca-${c}`),b&&(a+=`-nu-${b}`)),a}(this.locale,this.numberingSystem,this.outputCalendar),this.weekdaysCache={format:{},standalone:{}},this.monthsCache={format:{},standalone:{}},this.meridiemCache=null,this.eraCache={},this.specifiedLocale=e,this.fastNumbersCached=null}get fastNumbers(){return null==this.fastNumbersCached&&(this.fastNumbersCached=(!this.numberingSystem||"latn"===this.numberingSystem)&&("latn"===this.numberingSystem||!this.locale||this.locale.startsWith("en")||"latn"===Z(this.locale).numberingSystem)),this.fastNumbersCached}listingMode(){let a=this.isEnglish(),b=(null===this.numberingSystem||"latn"===this.numberingSystem)&&(null===this.outputCalendar||"gregory"===this.outputCalendar);return a&&b?"en":"intl"}clone(a){return a&&0!==Object.getOwnPropertyNames(a).length?ae.create(a.locale||this.specifiedLocale,a.numberingSystem||this.numberingSystem,a.outputCalendar||this.outputCalendar,aS(a.weekSettings)||this.weekSettings,a.defaultToEN||!1):this}redefaultToEN(a={}){return this.clone({...a,defaultToEN:!0})}redefaultToSystem(a={}){return this.clone({...a,defaultToEN:!1})}months(a,b=!1){return _(this,a,bd,()=>{let c="ja"===this.intl||this.intl.startsWith("ja-"),d=(b&=!c)?{month:a,day:"numeric"}:{month:a},e=b?"format":"standalone";if(!this.monthsCache[e][a]){let b=c?a=>this.dtFormatter(a,d).format():a=>this.extract(a,d,"month");this.monthsCache[e][a]=function(a){let b=[];for(let c=1;c<=12;c++){let d=cW.utc(2009,c,1);b.push(a(d))}return b}(b)}return this.monthsCache[e][a]})}weekdays(a,b=!1){return _(this,a,bh,()=>{let c=b?{weekday:a,year:"numeric",month:"long",day:"numeric"}:{weekday:a},d=b?"format":"standalone";return this.weekdaysCache[d][a]||(this.weekdaysCache[d][a]=function(a){let b=[];for(let c=1;c<=7;c++){let d=cW.utc(2016,11,13+c);b.push(a(d))}return b}(a=>this.extract(a,c,"weekday"))),this.weekdaysCache[d][a]})}meridiems(){return _(this,void 0,()=>bi,()=>{if(!this.meridiemCache){let a={hour:"numeric",hourCycle:"h12"};this.meridiemCache=[cW.utc(2016,11,13,9),cW.utc(2016,11,13,19)].map(b=>this.extract(b,a,"dayperiod"))}return this.meridiemCache})}eras(a){return _(this,a,bm,()=>{let b={era:a};return this.eraCache[a]||(this.eraCache[a]=[cW.utc(-40,1,1),cW.utc(2017,1,1)].map(a=>this.extract(a,b,"era"))),this.eraCache[a]})}extract(a,b,c){let d=this.dtFormatter(a,b).formatToParts().find(a=>a.type.toLowerCase()===c);return d?d.value:null}numberFormatter(a={}){return new aa(this.intl,a.forceSimple||this.fastNumbers,a)}dtFormatter(a,b={}){return new ab(a,this.intl,b)}relFormatter(a={}){return new ac(this.intl,this.isEnglish(),a)}listFormatter(a={}){return function(a,b={}){let c=JSON.stringify([a,b]),d=S[c];return d||(d=new Intl.ListFormat(a,b),S[c]=d),d}(this.intl,a)}isEnglish(){return"en"===this.locale||"en-us"===this.locale.toLowerCase()||Z(this.intl).locale.startsWith("en-us")}getWeekSettings(){if(this.weekSettings)return this.weekSettings;if(!aP())return ad;var a=this.locale;let b=$.get(a);if(!b){let c=new Intl.Locale(a);"minimalDays"in(b="getWeekInfo"in c?c.getWeekInfo():c.weekInfo)||(b={...ad,...b}),$.set(a,b)}return b}getStartOfWeek(){return this.getWeekSettings().firstDay}getMinDaysInFirstWeek(){return this.getWeekSettings().minimalDays}getWeekendDays(){return this.getWeekSettings().weekend}equals(a){return this.locale===a.locale&&this.numberingSystem===a.numberingSystem&&this.outputCalendar===a.outputCalendar}toString(){return`Locale(${this.locale}, ${this.numberingSystem}, ${this.outputCalendar})`}}let af=null;class ag extends L{static get utcInstance(){return null===af&&(af=new ag(0)),af}static instance(a){return 0===a?ag.utcInstance:new ag(a)}static parseSpecifier(a){if(a){let b=a.match(/^utc(?:([+-]\d{1,2})(?::(\d{2}))?)?$/i);if(b)return new ag(a5(b[1],b[2]))}return null}constructor(a){super(),this.fixed=a}get type(){return"fixed"}get name(){return 0===this.fixed?"UTC":`UTC${a8(this.fixed,"narrow")}`}get ianaName(){return 0===this.fixed?"Etc/UTC":`Etc/GMT${a8(-this.fixed,"narrow")}`}offsetName(){return this.name}formatOffset(a,b){return a8(this.fixed,b)}get isUniversal(){return!0}offset(){return this.fixed}equals(a){return"fixed"===a.type&&a.fixed===this.fixed}get isValid(){return!0}}class ah extends L{constructor(a){super(),this.zoneName=a}get type(){return"invalid"}get name(){return this.zoneName}get isUniversal(){return!1}offsetName(){return null}formatOffset(){return""}offset(){return NaN}equals(){return!1}get isValid(){return!1}}function ai(a,b){if(aL(a)||null===a)return b;if(a instanceof L)return a;if("string"==typeof a){let c=a.toLowerCase();return"default"===c?b:"local"===c||"system"===c?N.instance:"utc"===c||"gmt"===c?ag.utcInstance:ag.parseSpecifier(c)||R.create(a)}if(aM(a))return ag.instance(a);if("object"==typeof a&&"offset"in a&&"function"==typeof a.offset)return a;else return new ah(a)}let aj={arab:"[٠-٩]",arabext:"[۰-۹]",bali:"[᭐-᭙]",beng:"[০-৯]",deva:"[०-९]",fullwide:"[０-９]",gujr:"[૦-૯]",hanidec:"[〇|一|二|三|四|五|六|七|八|九]",khmr:"[០-៩]",knda:"[೦-೯]",laoo:"[໐-໙]",limb:"[᥆-᥏]",mlym:"[൦-൯]",mong:"[᠐-᠙]",mymr:"[၀-၉]",orya:"[୦-୯]",tamldec:"[௦-௯]",telu:"[౦-౯]",thai:"[๐-๙]",tibt:"[༠-༩]",latn:"\\d"},ak={arab:[1632,1641],arabext:[1776,1785],bali:[6992,7001],beng:[2534,2543],deva:[2406,2415],fullwide:[65296,65303],gujr:[2790,2799],khmr:[6112,6121],knda:[3302,3311],laoo:[3792,3801],limb:[6470,6479],mlym:[3430,3439],mong:[6160,6169],mymr:[4160,4169],orya:[2918,2927],tamldec:[3046,3055],telu:[3174,3183],thai:[3664,3673],tibt:[3872,3881]},al=aj.hanidec.replace(/[\[|\]]/g,"").split(""),am=new Map;function an({numberingSystem:a},b=""){let c=a||"latn",d=am.get(c);void 0===d&&(d=new Map,am.set(c,d));let e=d.get(b);return void 0===e&&(e=RegExp(`${aj[c]}${b}`),d.set(b,e)),e}let ao=()=>Date.now(),ap="system",aq=null,ar=null,as=null,at=60,au,av=null;class aw{static get now(){return ao}static set now(a){ao=a}static set defaultZone(a){ap=a}static get defaultZone(){return ai(ap,N.instance)}static get defaultLocale(){return aq}static set defaultLocale(a){aq=a}static get defaultNumberingSystem(){return ar}static set defaultNumberingSystem(a){ar=a}static get defaultOutputCalendar(){return as}static set defaultOutputCalendar(a){as=a}static get defaultWeekSettings(){return av}static set defaultWeekSettings(a){av=aS(a)}static get twoDigitCutoffYear(){return at}static set twoDigitCutoffYear(a){at=a%100}static get throwOnInvalid(){return au}static set throwOnInvalid(a){au=a}static resetCaches(){ae.resetCache(),R.resetCache(),cW.resetCache(),am.clear()}}class ax{constructor(a,b){this.reason=a,this.explanation=b}toMessage(){return this.explanation?`${this.reason}: ${this.explanation}`:this.reason}}let ay=[0,31,59,90,120,151,181,212,243,273,304,334],az=[0,31,60,91,121,152,182,213,244,274,305,335];function aA(a,b){return new ax("unit out of range",`you specified ${b} (of type ${typeof b}) as a ${a}, which is invalid`)}function aB(a,b,c){let d=new Date(Date.UTC(a,b-1,c));a<100&&a>=0&&d.setUTCFullYear(d.getUTCFullYear()-1900);let e=d.getUTCDay();return 0===e?7:e}function aC(a,b){let c=aZ(a)?az:ay,d=c.findIndex(a=>a<b),e=b-c[d];return{month:d+1,day:e}}function aD(a,b){return(a-b+7)%7+1}function aE(a,b=4,c=1){let{year:d,month:e,day:f}=a,g=f+(aZ(d)?az:ay)[e-1],h=aD(aB(d,e,f),c),i=Math.floor((g-h+14-b)/7),j;return i<1?i=a2(j=d-1,b,c):i>a2(d,b,c)?(j=d+1,i=1):j=d,{weekYear:j,weekNumber:i,weekday:h,...a9(a)}}function aF(a,b=4,c=1){let{weekYear:d,weekNumber:e,weekday:f}=a,g=aD(aB(d,1,b),c),h=a$(d),i=7*e+f-g-7+b,j;i<1?i+=a$(j=d-1):i>h?(j=d+1,i-=a$(d)):j=d;let{month:k,day:l}=aC(j,i);return{year:j,month:k,day:l,...a9(a)}}function aG(a){let{year:b,month:c,day:d}=a,e=d+(aZ(b)?az:ay)[c-1];return{year:b,ordinal:e,...a9(a)}}function aH(a){let{year:b,ordinal:c}=a,{month:d,day:e}=aC(b,c);return{year:b,month:d,day:e,...a9(a)}}function aI(a,b){if(!(!aL(a.localWeekday)||!aL(a.localWeekNumber)||!aL(a.localWeekYear)))return{minDaysInFirstWeek:4,startOfWeek:1};if(!aL(a.weekday)||!aL(a.weekNumber)||!aL(a.weekYear))throw new i("Cannot mix locale-based week fields with ISO-based week fields");return aL(a.localWeekday)||(a.weekday=a.localWeekday),aL(a.localWeekNumber)||(a.weekNumber=a.localWeekNumber),aL(a.localWeekYear)||(a.weekYear=a.localWeekYear),delete a.localWeekday,delete a.localWeekNumber,delete a.localWeekYear,{minDaysInFirstWeek:b.getMinDaysInFirstWeek(),startOfWeek:b.getStartOfWeek()}}function aJ(a){let b=aN(a.year),c=aT(a.month,1,12),d=aT(a.day,1,a_(a.year,a.month));return b?c?!d&&aA("day",a.day):aA("month",a.month):aA("year",a.year)}function aK(a){let{hour:b,minute:c,second:d,millisecond:e}=a,f=aT(b,0,23)||24===b&&0===c&&0===d&&0===e,g=aT(c,0,59),h=aT(d,0,59),i=aT(e,0,999);return f?g?h?!i&&aA("millisecond",e):aA("second",d):aA("minute",c):aA("hour",b)}function aL(a){return void 0===a}function aM(a){return"number"==typeof a}function aN(a){return"number"==typeof a&&a%1==0}function aO(){try{return"undefined"!=typeof Intl&&!!Intl.RelativeTimeFormat}catch(a){return!1}}function aP(){try{return"undefined"!=typeof Intl&&!!Intl.Locale&&("weekInfo"in Intl.Locale.prototype||"getWeekInfo"in Intl.Locale.prototype)}catch(a){return!1}}function aQ(a,b,c){if(0!==a.length)return a.reduce((a,d)=>{let e=[b(d),d];return a&&c(a[0],e[0])===a[0]?a:e},null)[1]}function aR(a,b){return Object.prototype.hasOwnProperty.call(a,b)}function aS(a){if(null==a)return null;if("object"!=typeof a)throw new k("Week settings must be an object");if(!aT(a.firstDay,1,7)||!aT(a.minimalDays,1,7)||!Array.isArray(a.weekend)||a.weekend.some(a=>!aT(a,1,7)))throw new k("Invalid week settings");return{firstDay:a.firstDay,minimalDays:a.minimalDays,weekend:Array.from(a.weekend)}}function aT(a,b,c){return aN(a)&&a>=b&&a<=c}function aU(a,b=2){return a<0?"-"+(""+-a).padStart(b,"0"):(""+a).padStart(b,"0")}function aV(a){if(!aL(a)&&null!==a&&""!==a)return parseInt(a,10)}function aW(a){if(!aL(a)&&null!==a&&""!==a)return parseFloat(a)}function aX(a){if(!aL(a)&&null!==a&&""!==a)return Math.floor(1e3*parseFloat("0."+a))}function aY(a,b,c="round"){let d=10**b;switch(c){case"expand":return a>0?Math.ceil(a*d)/d:Math.floor(a*d)/d;case"trunc":return Math.trunc(a*d)/d;case"round":return Math.round(a*d)/d;case"floor":return Math.floor(a*d)/d;case"ceil":return Math.ceil(a*d)/d;default:throw RangeError(`Value rounding ${c} is out of range`)}}function aZ(a){return a%4==0&&(a%100!=0||a%400==0)}function a$(a){return aZ(a)?366:365}function a_(a,b){var c;let d=(c=b-1)-12*Math.floor(c/12)+1;return 2===d?aZ(a+(b-d)/12)?29:28:[31,null,31,30,31,30,31,31,30,31,30,31][d-1]}function a0(a){let b=Date.UTC(a.year,a.month-1,a.day,a.hour,a.minute,a.second,a.millisecond);return a.year<100&&a.year>=0&&(b=new Date(b)).setUTCFullYear(a.year,a.month-1,a.day),+b}function a1(a,b,c){return-aD(aB(a,1,b),c)+b-1}function a2(a,b=4,c=1){let d=a1(a,b,c),e=a1(a+1,b,c);return(a$(a)-d+e)/7}function a3(a){return a>99?a:a>aw.twoDigitCutoffYear?1900+a:2e3+a}function a4(a,b,c,d=null){let e=new Date(a),f={hourCycle:"h23",year:"numeric",month:"2-digit",day:"2-digit",hour:"2-digit",minute:"2-digit"};d&&(f.timeZone=d);let g={timeZoneName:b,...f},h=new Intl.DateTimeFormat(c,g).formatToParts(e).find(a=>"timezonename"===a.type.toLowerCase());return h?h.value:null}function a5(a,b){let c=parseInt(a,10);Number.isNaN(c)&&(c=0);let d=parseInt(b,10)||0,e=c<0||Object.is(c,-0)?-d:d;return 60*c+e}function a6(a){let b=Number(a);if("boolean"==typeof a||""===a||!Number.isFinite(b))throw new k(`Invalid unit value ${a}`);return b}function a7(a,b){let c={};for(let d in a)if(aR(a,d)){let e=a[d];if(null==e)continue;c[b(d)]=a6(e)}return c}function a8(a,b){let c=Math.trunc(Math.abs(a/60)),d=Math.trunc(Math.abs(a%60)),e=a>=0?"+":"-";switch(b){case"short":return`${e}${aU(c,2)}:${aU(d,2)}`;case"narrow":return`${e}${c}${d>0?`:${d}`:""}`;case"techie":return`${e}${aU(c,2)}${aU(d,2)}`;default:throw RangeError(`Value format ${b} is out of range for property format`)}}function a9(a){return["hour","minute","second","millisecond"].reduce((b,c)=>(b[c]=a[c],b),{})}let ba=["January","February","March","April","May","June","July","August","September","October","November","December"],bb=["Jan","Feb","Mar","Apr","May","Jun","Jul","Aug","Sep","Oct","Nov","Dec"],bc=["J","F","M","A","M","J","J","A","S","O","N","D"];function bd(a){switch(a){case"narrow":return[...bc];case"short":return[...bb];case"long":return[...ba];case"numeric":return["1","2","3","4","5","6","7","8","9","10","11","12"];case"2-digit":return["01","02","03","04","05","06","07","08","09","10","11","12"];default:return null}}let be=["Monday","Tuesday","Wednesday","Thursday","Friday","Saturday","Sunday"],bf=["Mon","Tue","Wed","Thu","Fri","Sat","Sun"],bg=["M","T","W","T","F","S","S"];function bh(a){switch(a){case"narrow":return[...bg];case"short":return[...bf];case"long":return[...be];case"numeric":return["1","2","3","4","5","6","7"];default:return null}}let bi=["AM","PM"],bj=["Before Christ","Anno Domini"],bk=["BC","AD"],bl=["B","A"];function bm(a){switch(a){case"narrow":return[...bl];case"short":return[...bk];case"long":return[...bj];default:return null}}function bn(a,b){let c="";for(let d of a)d.literal?c+=d.val:c+=b(d.val);return c}let bo={D:p,DD:q,DDD:s,DDDD:t,t:u,tt:v,ttt:w,tttt:x,T:y,TT:z,TTT:A,TTTT:B,f:C,ff:E,fff:H,ffff:J,F:D,FF:F,FFF:I,FFFF:K};class bp{static create(a,b={}){return new bp(a,b)}static parseFormat(a){let b=null,c="",d=!1,e=[];for(let f=0;f<a.length;f++){let g=a.charAt(f);"'"===g?((c.length>0||d)&&e.push({literal:d||/^\s+$/.test(c),val:""===c?"'":c}),b=null,c="",d=!d):d||g===b?c+=g:(c.length>0&&e.push({literal:/^\s+$/.test(c),val:c}),c=g,b=g)}return c.length>0&&e.push({literal:d||/^\s+$/.test(c),val:c}),e}static macroTokenToFormatOpts(a){return bo[a]}constructor(a,b){this.opts=b,this.loc=a,this.systemLoc=null}formatWithSystemDefault(a,b){return null===this.systemLoc&&(this.systemLoc=this.loc.redefaultToSystem()),this.systemLoc.dtFormatter(a,{...this.opts,...b}).format()}dtFormatter(a,b={}){return this.loc.dtFormatter(a,{...this.opts,...b})}formatDateTime(a,b){return this.dtFormatter(a,b).format()}formatDateTimeParts(a,b){return this.dtFormatter(a,b).formatToParts()}formatInterval(a,b){return this.dtFormatter(a.start,b).dtf.formatRange(a.start.toJSDate(),a.end.toJSDate())}resolvedOptions(a,b){return this.dtFormatter(a,b).resolvedOptions()}num(a,b=0,c){if(this.opts.forceSimple)return aU(a,b);let d={...this.opts};return b>0&&(d.padTo=b),c&&(d.signDisplay=c),this.loc.numberFormatter(d).format(a)}formatDateTimeFromString(a,b){let c="en"===this.loc.listingMode(),d=this.loc.outputCalendar&&"gregory"!==this.loc.outputCalendar,e=(b,c)=>this.loc.extract(a,b,c),f=b=>a.isOffsetFixed&&0===a.offset&&b.allowZ?"Z":a.isValid?a.zone.formatOffset(a.ts,b.format):"",g=(b,d)=>c?bd(b)[a.month-1]:e(d?{month:b}:{month:b,day:"numeric"},"month"),h=(b,d)=>c?bh(b)[a.weekday-1]:e(d?{weekday:b}:{weekday:b,month:"long",day:"numeric"},"weekday"),i=b=>{let c=bp.macroTokenToFormatOpts(b);return c?this.formatWithSystemDefault(a,c):b},j=b=>c?bm(b)[a.year<0?0:1]:e({era:b},"era"),k=b=>{switch(b){case"S":return this.num(a.millisecond);case"u":case"SSS":return this.num(a.millisecond,3);case"s":return this.num(a.second);case"ss":return this.num(a.second,2);case"uu":return this.num(Math.floor(a.millisecond/10),2);case"uuu":return this.num(Math.floor(a.millisecond/100));case"m":return this.num(a.minute);case"mm":return this.num(a.minute,2);case"h":return this.num(a.hour%12==0?12:a.hour%12);case"hh":return this.num(a.hour%12==0?12:a.hour%12,2);case"H":return this.num(a.hour);case"HH":return this.num(a.hour,2);case"Z":return f({format:"narrow",allowZ:this.opts.allowZ});case"ZZ":return f({format:"short",allowZ:this.opts.allowZ});case"ZZZ":return f({format:"techie",allowZ:this.opts.allowZ});case"ZZZZ":return a.zone.offsetName(a.ts,{format:"short",locale:this.loc.locale});case"ZZZZZ":return a.zone.offsetName(a.ts,{format:"long",locale:this.loc.locale});case"z":return a.zoneName;case"a":return c?bi[a.hour<12?0:1]:e({hour:"numeric",hourCycle:"h12"},"dayperiod");case"d":return d?e({day:"numeric"},"day"):this.num(a.day);case"dd":return d?e({day:"2-digit"},"day"):this.num(a.day,2);case"c":case"E":return this.num(a.weekday);case"ccc":return h("short",!0);case"cccc":return h("long",!0);case"ccccc":return h("narrow",!0);case"EEE":return h("short",!1);case"EEEE":return h("long",!1);case"EEEEE":return h("narrow",!1);case"L":return d?e({month:"numeric",day:"numeric"},"month"):this.num(a.month);case"LL":return d?e({month:"2-digit",day:"numeric"},"month"):this.num(a.month,2);case"LLL":return g("short",!0);case"LLLL":return g("long",!0);case"LLLLL":return g("narrow",!0);case"M":return d?e({month:"numeric"},"month"):this.num(a.month);case"MM":return d?e({month:"2-digit"},"month"):this.num(a.month,2);case"MMM":return g("short",!1);case"MMMM":return g("long",!1);case"MMMMM":return g("narrow",!1);case"y":return d?e({year:"numeric"},"year"):this.num(a.year);case"yy":return d?e({year:"2-digit"},"year"):this.num(a.year.toString().slice(-2),2);case"yyyy":return d?e({year:"numeric"},"year"):this.num(a.year,4);case"yyyyyy":return d?e({year:"numeric"},"year"):this.num(a.year,6);case"G":return j("short");case"GG":return j("long");case"GGGGG":return j("narrow");case"kk":return this.num(a.weekYear.toString().slice(-2),2);case"kkkk":return this.num(a.weekYear,4);case"W":return this.num(a.weekNumber);case"WW":return this.num(a.weekNumber,2);case"n":return this.num(a.localWeekNumber);case"nn":return this.num(a.localWeekNumber,2);case"ii":return this.num(a.localWeekYear.toString().slice(-2),2);case"iiii":return this.num(a.localWeekYear,4);case"o":return this.num(a.ordinal);case"ooo":return this.num(a.ordinal,3);case"q":return this.num(a.quarter);case"qq":return this.num(a.quarter,2);case"X":return this.num(Math.floor(a.ts/1e3));case"x":return this.num(a.ts);default:return i(b)}};return bn(bp.parseFormat(b),k)}formatDurationFromString(a,b){let c="negativeLargestOnly"===this.opts.signMode?-1:1,d=a=>{switch(a[0]){case"S":return"milliseconds";case"s":return"seconds";case"m":return"minutes";case"h":return"hours";case"d":return"days";case"w":return"weeks";case"M":return"months";case"y":return"years";default:return null}},e=(a,b)=>e=>{let f=d(e);if(!f)return e;{let d,g=b.isNegativeDuration&&f!==b.largestUnit?c:1;return d="negativeLargestOnly"===this.opts.signMode&&f!==b.largestUnit?"never":"all"===this.opts.signMode?"always":"auto",this.num(a.get(f)*g,e.length,d)}},f=bp.parseFormat(b),g=f.reduce((a,{literal:b,val:c})=>b?a:a.concat(c),[]),h=a.shiftTo(...g.map(d).filter(a=>a)),i={isNegativeDuration:h<0,largestUnit:Object.keys(h.values)[0]};return bn(f,e(h,i))}}let bq=/[A-Za-z_+-]{1,256}(?::?\/[A-Za-z0-9_+-]{1,256}(?:\/[A-Za-z0-9_+-]{1,256})?)?/;function br(...a){let b=a.reduce((a,b)=>a+b.source,"");return RegExp(`^${b}$`)}function bs(...a){return b=>a.reduce(([a,c,d],e)=>{let[f,g,h]=e(b,d);return[{...a,...f},g||c,h]},[{},null,1]).slice(0,2)}function bt(a,...b){if(null==a)return[null,null];for(let[c,d]of b){let b=c.exec(a);if(b)return d(b)}return[null,null]}function bu(...a){return(b,c)=>{let d,e={};for(d=0;d<a.length;d++)e[a[d]]=aV(b[c+d]);return[e,null,c+d]}}let bv=/(?:([Zz])|([+-]\d\d)(?::?(\d\d))?)/,bw=`(?:${bv.source}?(?:\\[(${bq.source})\\])?)?`,bx=/(\d\d)(?::?(\d\d)(?::?(\d\d)(?:[.,](\d{1,30}))?)?)?/,by=RegExp(`${bx.source}${bw}`),bz=RegExp(`(?:[Tt]${by.source})?`),bA=bu("weekYear","weekNumber","weekDay"),bB=bu("year","ordinal"),bC=RegExp(`${bx.source} ?(?:${bv.source}|(${bq.source}))?`),bD=RegExp(`(?: ${bC.source})?`);function bE(a,b,c){let d=a[b];return aL(d)?c:aV(d)}function bF(a,b){return[{hours:bE(a,b,0),minutes:bE(a,b+1,0),seconds:bE(a,b+2,0),milliseconds:aX(a[b+3])},null,b+4]}function bG(a,b){let c=!a[b]&&!a[b+1],d=a5(a[b+1],a[b+2]);return[{},c?null:ag.instance(d),b+3]}function bH(a,b){return[{},a[b]?R.create(a[b]):null,b+1]}let bI=RegExp(`^T?${bx.source}$`),bJ=/^-?P(?:(?:(-?\d{1,20}(?:\.\d{1,20})?)Y)?(?:(-?\d{1,20}(?:\.\d{1,20})?)M)?(?:(-?\d{1,20}(?:\.\d{1,20})?)W)?(?:(-?\d{1,20}(?:\.\d{1,20})?)D)?(?:T(?:(-?\d{1,20}(?:\.\d{1,20})?)H)?(?:(-?\d{1,20}(?:\.\d{1,20})?)M)?(?:(-?\d{1,20})(?:[.,](-?\d{1,20}))?S)?)?)$/;function bK(a){let[b,c,d,e,f,g,h,i,j]=a,k="-"===b[0],l=i&&"-"===i[0],m=(a,b=!1)=>void 0!==a&&(b||a&&k)?-a:a;return[{years:m(aW(c)),months:m(aW(d)),weeks:m(aW(e)),days:m(aW(f)),hours:m(aW(g)),minutes:m(aW(h)),seconds:m(aW(i),"-0"===i),milliseconds:m(aX(j),l)}]}let bL={GMT:0,EDT:-240,EST:-300,CDT:-300,CST:-360,MDT:-360,MST:-420,PDT:-420,PST:-480};function bM(a,b,c,d,e,f,g){let h={year:2===b.length?a3(aV(b)):aV(b),month:bb.indexOf(c)+1,day:aV(d),hour:aV(e),minute:aV(f)};return g&&(h.second=aV(g)),a&&(h.weekday=a.length>3?be.indexOf(a)+1:bf.indexOf(a)+1),h}let bN=/^(?:(Mon|Tue|Wed|Thu|Fri|Sat|Sun),\s)?(\d{1,2})\s(Jan|Feb|Mar|Apr|May|Jun|Jul|Aug|Sep|Oct|Nov|Dec)\s(\d{2,4})\s(\d\d):(\d\d)(?::(\d\d))?\s(?:(UT|GMT|[ECMP][SD]T)|([Zz])|(?:([+-]\d\d)(\d\d)))$/;function bO(a){let[,b,c,d,e,f,g,h,i,j,k,l]=a;return[bM(b,e,d,c,f,g,h),new ag(i?bL[i]:j?0:a5(k,l))]}let bP=/^(Mon|Tue|Wed|Thu|Fri|Sat|Sun), (\d\d) (Jan|Feb|Mar|Apr|May|Jun|Jul|Aug|Sep|Oct|Nov|Dec) (\d{4}) (\d\d):(\d\d):(\d\d) GMT$/,bQ=/^(Monday|Tuesday|Wednesday|Thursday|Friday|Saturday|Sunday), (\d\d)-(Jan|Feb|Mar|Apr|May|Jun|Jul|Aug|Sep|Oct|Nov|Dec)-(\d\d) (\d\d):(\d\d):(\d\d) GMT$/,bR=/^(Mon|Tue|Wed|Thu|Fri|Sat|Sun) (Jan|Feb|Mar|Apr|May|Jun|Jul|Aug|Sep|Oct|Nov|Dec) ( \d|\d\d) (\d\d):(\d\d):(\d\d) (\d{4})$/;function bS(a){let[,b,c,d,e,f,g,h]=a;return[bM(b,e,d,c,f,g,h),ag.utcInstance]}function bT(a){let[,b,c,d,e,f,g,h]=a;return[bM(b,h,c,d,e,f,g),ag.utcInstance]}let bU=br(/([+-]\d{6}|\d{4})(?:-?(\d\d)(?:-?(\d\d))?)?/,bz),bV=br(/(\d{4})-?W(\d\d)(?:-?(\d))?/,bz),bW=br(/(\d{4})-?(\d{3})/,bz),bX=br(by),bY=bs(function(a,b){return[{year:bE(a,b),month:bE(a,b+1,1),day:bE(a,b+2,1)},null,b+3]},bF,bG,bH),bZ=bs(bA,bF,bG,bH),b$=bs(bB,bF,bG,bH),b_=bs(bF,bG,bH),b0=bs(bF),b1=br(/(\d{4})-(\d\d)-(\d\d)/,bD),b2=br(bC),b3=bs(bF,bG,bH),b4="Invalid Duration",b5={weeks:{days:7,hours:168,minutes:10080,seconds:604800,milliseconds:6048e5},days:{hours:24,minutes:1440,seconds:86400,milliseconds:864e5},hours:{minutes:60,seconds:3600,milliseconds:36e5},minutes:{seconds:60,milliseconds:6e4},seconds:{milliseconds:1e3}},b6={years:{quarters:4,months:12,weeks:52,days:365,hours:8760,minutes:525600,seconds:31536e3,milliseconds:31536e6},quarters:{months:3,weeks:13,days:91,hours:2184,minutes:131040,seconds:7862400,milliseconds:78624e5},months:{weeks:4,days:30,hours:720,minutes:43200,seconds:2592e3,milliseconds:2592e6},...b5},b7={years:{quarters:4,months:12,weeks:52.1775,days:365.2425,hours:8765.82,minutes:525949.2,seconds:0x1e18558,milliseconds:31556952e3},quarters:{months:3,weeks:13.044375,days:91.310625,hours:2191.455,minutes:131487.3,seconds:7889238,milliseconds:7889238e3},months:{weeks:30.436875/7,days:30.436875,hours:730.485,minutes:43829.1,seconds:2629746,milliseconds:2629746e3},...b5},b8=["years","quarters","months","weeks","days","hours","minutes","seconds","milliseconds"],b9=b8.slice(0).reverse();function ca(a,b,c=!1){return new ce({values:c?b.values:{...a.values,...b.values||{}},loc:a.loc.clone(b.loc),conversionAccuracy:b.conversionAccuracy||a.conversionAccuracy,matrix:b.matrix||a.matrix})}function cb(a,b){var c;let d=null!=(c=b.milliseconds)?c:0;for(let c of b9.slice(1))b[c]&&(d+=b[c]*a[c].milliseconds);return d}function cc(a,b){let c=0>cb(a,b)?-1:1;b8.reduceRight((d,e)=>{if(aL(b[e]))return d;if(d){let f=b[d]*c,g=a[e][d],h=Math.floor(f/g);b[e]+=h*c,b[d]-=h*g*c}return e},null),b8.reduce((c,d)=>{if(aL(b[d]))return c;if(c){let e=b[c]%1;b[c]-=e,b[d]+=e*a[c][d]}return d},null)}function cd(a){let b={};for(let[c,d]of Object.entries(a))0!==d&&(b[c]=d);return b}class ce{constructor(a){const b="longterm"===a.conversionAccuracy;let c=b?b7:b6;a.matrix&&(c=a.matrix),this.values=a.values,this.loc=a.loc||ae.create(),this.conversionAccuracy=b?"longterm":"casual",this.invalid=a.invalid||null,this.matrix=c,this.isLuxonDuration=!0}static fromMillis(a,b){return ce.fromObject({milliseconds:a},b)}static fromObject(a,b={}){if(null==a||"object"!=typeof a)throw new k(`Duration.fromObject: argument expected to be an object, got ${null===a?"null":typeof a}`);return new ce({values:a7(a,ce.normalizeUnit),loc:ae.fromObject(b),conversionAccuracy:b.conversionAccuracy,matrix:b.matrix})}static fromDurationLike(a){if(aM(a))return ce.fromMillis(a);if(ce.isDuration(a))return a;if("object"==typeof a)return ce.fromObject(a);throw new k(`Unknown duration argument ${a} of type ${typeof a}`)}static fromISO(a,b){let[c]=bt(a,[bJ,bK]);return c?ce.fromObject(c,b):ce.invalid("unparsable",`the input "${a}" can't be parsed as ISO 8601`)}static fromISOTime(a,b){let[c]=bt(a,[bI,b0]);return c?ce.fromObject(c,b):ce.invalid("unparsable",`the input "${a}" can't be parsed as ISO 8601`)}static invalid(a,b=null){if(!a)throw new k("need to specify a reason the Duration is invalid");let c=a instanceof ax?a:new ax(a,b);if(!aw.throwOnInvalid)return new ce({invalid:c});throw new h(c)}static normalizeUnit(a){let b={year:"years",years:"years",quarter:"quarters",quarters:"quarters",month:"months",months:"months",week:"weeks",weeks:"weeks",day:"days",days:"days",hour:"hours",hours:"hours",minute:"minutes",minutes:"minutes",second:"seconds",seconds:"seconds",millisecond:"milliseconds",milliseconds:"milliseconds"}[a?a.toLowerCase():a];if(!b)throw new j(a);return b}static isDuration(a){return a&&a.isLuxonDuration||!1}get locale(){return this.isValid?this.loc.locale:null}get numberingSystem(){return this.isValid?this.loc.numberingSystem:null}toFormat(a,b={}){let c={...b,floor:!1!==b.round&&!1!==b.floor};return this.isValid?bp.create(this.loc,c).formatDurationFromString(this,a):b4}toHuman(a={}){if(!this.isValid)return b4;let b=!1!==a.showZeros,c=b8.map(c=>{let d=this.values[c];return aL(d)||0===d&&!b?null:this.loc.numberFormatter({style:"unit",unitDisplay:"long",...a,unit:c.slice(0,-1)}).format(d)}).filter(a=>a);return this.loc.listFormatter({type:"conjunction",style:a.listStyle||"narrow",...a}).format(c)}toObject(){return this.isValid?{...this.values}:{}}toISO(){if(!this.isValid)return null;let a="P";return 0!==this.years&&(a+=this.years+"Y"),(0!==this.months||0!==this.quarters)&&(a+=this.months+3*this.quarters+"M"),0!==this.weeks&&(a+=this.weeks+"W"),0!==this.days&&(a+=this.days+"D"),(0!==this.hours||0!==this.minutes||0!==this.seconds||0!==this.milliseconds)&&(a+="T"),0!==this.hours&&(a+=this.hours+"H"),0!==this.minutes&&(a+=this.minutes+"M"),(0!==this.seconds||0!==this.milliseconds)&&(a+=aY(this.seconds+this.milliseconds/1e3,3)+"S"),"P"===a&&(a+="T0S"),a}toISOTime(a={}){if(!this.isValid)return null;let b=this.toMillis();return b<0||b>=864e5?null:(a={suppressMilliseconds:!1,suppressSeconds:!1,includePrefix:!1,format:"extended",...a,includeOffset:!1},cW.fromMillis(b,{zone:"UTC"}).toISOTime(a))}toJSON(){return this.toISO()}toString(){return this.toISO()}[Symbol.for("nodejs.util.inspect.custom")](){return this.isValid?`Duration { values: ${JSON.stringify(this.values)} }`:`Duration { Invalid, reason: ${this.invalidReason} }`}toMillis(){return this.isValid?cb(this.matrix,this.values):NaN}valueOf(){return this.toMillis()}plus(a){if(!this.isValid)return this;let b=ce.fromDurationLike(a),c={};for(let a of b8)(aR(b.values,a)||aR(this.values,a))&&(c[a]=b.get(a)+this.get(a));return ca(this,{values:c},!0)}minus(a){if(!this.isValid)return this;let b=ce.fromDurationLike(a);return this.plus(b.negate())}mapUnits(a){if(!this.isValid)return this;let b={};for(let c of Object.keys(this.values))b[c]=a6(a(this.values[c],c));return ca(this,{values:b},!0)}get(a){return this[ce.normalizeUnit(a)]}set(a){return this.isValid?ca(this,{values:{...this.values,...a7(a,ce.normalizeUnit)}}):this}reconfigure({locale:a,numberingSystem:b,conversionAccuracy:c,matrix:d}={}){return ca(this,{loc:this.loc.clone({locale:a,numberingSystem:b}),matrix:d,conversionAccuracy:c})}as(a){return this.isValid?this.shiftTo(a).get(a):NaN}normalize(){if(!this.isValid)return this;let a=this.toObject();return cc(this.matrix,a),ca(this,{values:a},!0)}rescale(){return this.isValid?ca(this,{values:cd(this.normalize().shiftToAll().toObject())},!0):this}shiftTo(...a){let b;if(!this.isValid||0===a.length)return this;a=a.map(a=>ce.normalizeUnit(a));let c={},d={},e=this.toObject();for(let f of b8)if(a.indexOf(f)>=0){b=f;let a=0;for(let b in d)a+=this.matrix[b][f]*d[b],d[b]=0;aM(e[f])&&(a+=e[f]);let g=Math.trunc(a);c[f]=g,d[f]=(1e3*a-1e3*g)/1e3}else aM(e[f])&&(d[f]=e[f]);for(let a in d)0!==d[a]&&(c[b]+=a===b?d[a]:d[a]/this.matrix[b][a]);return cc(this.matrix,c),ca(this,{values:c},!0)}shiftToAll(){return this.isValid?this.shiftTo("years","months","weeks","days","hours","minutes","seconds","milliseconds"):this}negate(){if(!this.isValid)return this;let a={};for(let b of Object.keys(this.values))a[b]=0===this.values[b]?0:-this.values[b];return ca(this,{values:a},!0)}removeZeros(){return this.isValid?ca(this,{values:cd(this.values)},!0):this}get years(){return this.isValid?this.values.years||0:NaN}get quarters(){return this.isValid?this.values.quarters||0:NaN}get months(){return this.isValid?this.values.months||0:NaN}get weeks(){return this.isValid?this.values.weeks||0:NaN}get days(){return this.isValid?this.values.days||0:NaN}get hours(){return this.isValid?this.values.hours||0:NaN}get minutes(){return this.isValid?this.values.minutes||0:NaN}get seconds(){return this.isValid?this.values.seconds||0:NaN}get milliseconds(){return this.isValid?this.values.milliseconds||0:NaN}get isValid(){return null===this.invalid}get invalidReason(){return this.invalid?this.invalid.reason:null}get invalidExplanation(){return this.invalid?this.invalid.explanation:null}equals(a){if(!this.isValid||!a.isValid||!this.loc.equals(a.loc))return!1;for(let d of b8){var b,c;if(b=this.values[d],c=a.values[d],void 0===b||0===b?void 0!==c&&0!==c:b!==c)return!1}return!0}}let cf="Invalid Interval";class cg{constructor(a){this.s=a.start,this.e=a.end,this.invalid=a.invalid||null,this.isLuxonInterval=!0}static invalid(a,b=null){if(!a)throw new k("need to specify a reason the Interval is invalid");let c=a instanceof ax?a:new ax(a,b);if(!aw.throwOnInvalid)return new cg({invalid:c});throw new g(c)}static fromDateTimes(a,b){var c,d;let e=cX(a),f=cX(b),g=(c=e,d=f,c&&c.isValid?d&&d.isValid?d<c?cg.invalid("end before start",`The end of an interval must be after its start, but you had start=${c.toISO()} and end=${d.toISO()}`):null:cg.invalid("missing or invalid end"):cg.invalid("missing or invalid start"));return null==g?new cg({start:e,end:f}):g}static after(a,b){let c=ce.fromDurationLike(b),d=cX(a);return cg.fromDateTimes(d,d.plus(c))}static before(a,b){let c=ce.fromDurationLike(b),d=cX(a);return cg.fromDateTimes(d.minus(c),d)}static fromISO(a,b){let[c,d]=(a||"").split("/",2);if(c&&d){let a,e,f,g;try{e=(a=cW.fromISO(c,b)).isValid}catch(a){e=!1}try{g=(f=cW.fromISO(d,b)).isValid}catch(a){g=!1}if(e&&g)return cg.fromDateTimes(a,f);if(e){let c=ce.fromISO(d,b);if(c.isValid)return cg.after(a,c)}else if(g){let a=ce.fromISO(c,b);if(a.isValid)return cg.before(f,a)}}return cg.invalid("unparsable",`the input "${a}" can't be parsed as ISO 8601`)}static isInterval(a){return a&&a.isLuxonInterval||!1}get start(){return this.isValid?this.s:null}get end(){return this.isValid?this.e:null}get lastDateTime(){return this.isValid&&this.e?this.e.minus(1):null}get isValid(){return null===this.invalidReason}get invalidReason(){return this.invalid?this.invalid.reason:null}get invalidExplanation(){return this.invalid?this.invalid.explanation:null}length(a="milliseconds"){return this.isValid?this.toDuration(a).get(a):NaN}count(a="milliseconds",b){let c;if(!this.isValid)return NaN;let d=this.start.startOf(a,b);return Math.floor((c=(c=null!=b&&b.useLocaleWeeks?this.end.reconfigure({locale:d.locale}):this.end).startOf(a,b)).diff(d,a).get(a))+(c.valueOf()!==this.end.valueOf())}hasSame(a){return!!this.isValid&&(this.isEmpty()||this.e.minus(1).hasSame(this.s,a))}isEmpty(){return this.s.valueOf()===this.e.valueOf()}isAfter(a){return!!this.isValid&&this.s>a}isBefore(a){return!!this.isValid&&this.e<=a}contains(a){return!!this.isValid&&this.s<=a&&this.e>a}set({start:a,end:b}={}){return this.isValid?cg.fromDateTimes(a||this.s,b||this.e):this}splitAt(...a){if(!this.isValid)return[];let b=a.map(cX).filter(a=>this.contains(a)).sort((a,b)=>a.toMillis()-b.toMillis()),c=[],{s:d}=this,e=0;for(;d<this.e;){let a=b[e]||this.e,f=+a>+this.e?this.e:a;c.push(cg.fromDateTimes(d,f)),d=f,e+=1}return c}splitBy(a){let b=ce.fromDurationLike(a);if(!this.isValid||!b.isValid||0===b.as("milliseconds"))return[];let{s:c}=this,d=1,e,f=[];for(;c<this.e;){let a=this.start.plus(b.mapUnits(a=>a*d));e=+a>+this.e?this.e:a,f.push(cg.fromDateTimes(c,e)),c=e,d+=1}return f}divideEqually(a){return this.isValid?this.splitBy(this.length()/a).slice(0,a):[]}overlaps(a){return this.e>a.s&&this.s<a.e}abutsStart(a){return!!this.isValid&&+this.e==+a.s}abutsEnd(a){return!!this.isValid&&+a.e==+this.s}engulfs(a){return!!this.isValid&&this.s<=a.s&&this.e>=a.e}equals(a){return!!this.isValid&&!!a.isValid&&this.s.equals(a.s)&&this.e.equals(a.e)}intersection(a){if(!this.isValid)return this;let b=this.s>a.s?this.s:a.s,c=this.e<a.e?this.e:a.e;return b>=c?null:cg.fromDateTimes(b,c)}union(a){if(!this.isValid)return this;let b=this.s<a.s?this.s:a.s,c=this.e>a.e?this.e:a.e;return cg.fromDateTimes(b,c)}static merge(a){let[b,c]=a.sort((a,b)=>a.s-b.s).reduce(([a,b],c)=>b?b.overlaps(c)||b.abutsStart(c)?[a,b.union(c)]:[a.concat([b]),c]:[a,c],[[],null]);return c&&b.push(c),b}static xor(a){let b=null,c=0,d=[],e=a.map(a=>[{time:a.s,type:"s"},{time:a.e,type:"e"}]);for(let a of Array.prototype.concat(...e).sort((a,b)=>a.time-b.time))1===(c+="s"===a.type?1:-1)?b=a.time:(b&&+b!=+a.time&&d.push(cg.fromDateTimes(b,a.time)),b=null);return cg.merge(d)}difference(...a){return cg.xor([this].concat(a)).map(a=>this.intersection(a)).filter(a=>a&&!a.isEmpty())}toString(){return this.isValid?`[${this.s.toISO()} – ${this.e.toISO()})`:cf}[Symbol.for("nodejs.util.inspect.custom")](){return this.isValid?`Interval { start: ${this.s.toISO()}, end: ${this.e.toISO()} }`:`Interval { Invalid, reason: ${this.invalidReason} }`}toLocaleString(a=p,b={}){return this.isValid?bp.create(this.s.loc.clone(b),a).formatInterval(this):cf}toISO(a){return this.isValid?`${this.s.toISO(a)}/${this.e.toISO(a)}`:cf}toISODate(){return this.isValid?`${this.s.toISODate()}/${this.e.toISODate()}`:cf}toISOTime(a){return this.isValid?`${this.s.toISOTime(a)}/${this.e.toISOTime(a)}`:cf}toFormat(a,{separator:b=" – "}={}){return this.isValid?`${this.s.toFormat(a)}${b}${this.e.toFormat(a)}`:cf}toDuration(a,b){return this.isValid?this.e.diff(this.s,a,b):ce.invalid(this.invalidReason)}mapEndpoints(a){return cg.fromDateTimes(a(this.s),a(this.e))}}class ch{static hasDST(a=aw.defaultZone){let b=cW.now().setZone(a).set({month:12});return!a.isUniversal&&b.offset!==b.set({month:6}).offset}static isValidIANAZone(a){return R.isValidZone(a)}static normalizeZone(a){return ai(a,aw.defaultZone)}static getStartOfWeek({locale:a=null,locObj:b=null}={}){return(b||ae.create(a)).getStartOfWeek()}static getMinimumDaysInFirstWeek({locale:a=null,locObj:b=null}={}){return(b||ae.create(a)).getMinDaysInFirstWeek()}static getWeekendWeekdays({locale:a=null,locObj:b=null}={}){return(b||ae.create(a)).getWeekendDays().slice()}static months(a="long",{locale:b=null,numberingSystem:c=null,locObj:d=null,outputCalendar:e="gregory"}={}){return(d||ae.create(b,c,e)).months(a)}static monthsFormat(a="long",{locale:b=null,numberingSystem:c=null,locObj:d=null,outputCalendar:e="gregory"}={}){return(d||ae.create(b,c,e)).months(a,!0)}static weekdays(a="long",{locale:b=null,numberingSystem:c=null,locObj:d=null}={}){return(d||ae.create(b,c,null)).weekdays(a)}static weekdaysFormat(a="long",{locale:b=null,numberingSystem:c=null,locObj:d=null}={}){return(d||ae.create(b,c,null)).weekdays(a,!0)}static meridiems({locale:a=null}={}){return ae.create(a).meridiems()}static eras(a="short",{locale:b=null}={}){return ae.create(b,null,"gregory").eras(a)}static features(){return{relative:aO(),localeWeek:aP()}}}function ci(a,b){let c=a=>a.toUTC(0,{keepLocalTime:!0}).startOf("day").valueOf(),d=c(b)-c(a);return Math.floor(ce.fromMillis(d).as("days"))}function cj(a,b=a=>a){return{regex:a,deser:([a])=>b(function(a){let b=parseInt(a,10);if(!isNaN(b))return b;b="";for(let c=0;c<a.length;c++){let d=a.charCodeAt(c);if(-1!==a[c].search(aj.hanidec))b+=al.indexOf(a[c]);else for(let a in ak){let[c,e]=ak[a];d>=c&&d<=e&&(b+=d-c)}}return parseInt(b,10)}(a))}}let ck=String.fromCharCode(160),cl=`[ ${ck}]`,cm=RegExp(cl,"g");function cn(a){return a.replace(/\./g,"\\.?").replace(cm,cl)}function co(a){return a.replace(/\./g,"").replace(cm," ").toLowerCase()}function cp(a,b){return null===a?null:{regex:RegExp(a.map(cn).join("|")),deser:([c])=>a.findIndex(a=>co(c)===co(a))+b}}function cq(a,b){return{regex:a,deser:([,a,b])=>a5(a,b),groups:b}}function cr(a){return{regex:a,deser:([a])=>a}}let cs={year:{"2-digit":"yy",numeric:"yyyyy"},month:{numeric:"M","2-digit":"MM",short:"MMM",long:"MMMM"},day:{numeric:"d","2-digit":"dd"},weekday:{short:"EEE",long:"EEEE"},dayperiod:"a",dayPeriod:"a",hour12:{numeric:"h","2-digit":"hh"},hour24:{numeric:"H","2-digit":"HH"},minute:{numeric:"m","2-digit":"mm"},second:{numeric:"s","2-digit":"ss"},timeZoneName:{long:"ZZZZZ",short:"ZZZ"}},ct=null;function cu(a,b){return Array.prototype.concat(...a.map(a=>(function(a,b){if(a.literal)return a;let c=cx(bp.macroTokenToFormatOpts(a.val),b);return null==c||c.includes(void 0)?a:c})(a,b)))}class cv{constructor(a,b){if(this.locale=a,this.format=b,this.tokens=cu(bp.parseFormat(b),a),this.units=this.tokens.map(b=>{let c,d,e,f,g,h,i,j,k,l,m,n,o;return c=an(a),d=an(a,"{2}"),e=an(a,"{3}"),f=an(a,"{4}"),g=an(a,"{6}"),h=an(a,"{1,2}"),i=an(a,"{1,3}"),j=an(a,"{1,6}"),k=an(a,"{1,9}"),l=an(a,"{2,4}"),m=an(a,"{4,6}"),n=a=>({regex:RegExp(a.val.replace(/[\-\[\]{}()*+?.,\\\^$|#\s]/g,"\\$&")),deser:([a])=>a,literal:!0}),(o=(o=>{if(b.literal)return n(o);switch(o.val){case"G":return cp(a.eras("short"),0);case"GG":return cp(a.eras("long"),0);case"y":return cj(j);case"yy":case"kk":return cj(l,a3);case"yyyy":case"kkkk":return cj(f);case"yyyyy":return cj(m);case"yyyyyy":return cj(g);case"M":case"L":case"d":case"H":case"h":case"m":case"q":case"s":case"W":return cj(h);case"MM":case"LL":case"dd":case"HH":case"hh":case"mm":case"qq":case"ss":case"WW":return cj(d);case"MMM":return cp(a.months("short",!0),1);case"MMMM":return cp(a.months("long",!0),1);case"LLL":return cp(a.months("short",!1),1);case"LLLL":return cp(a.months("long",!1),1);case"o":case"S":return cj(i);case"ooo":case"SSS":return cj(e);case"u":return cr(k);case"uu":return cr(h);case"uuu":case"E":case"c":return cj(c);case"a":return cp(a.meridiems(),0);case"EEE":return cp(a.weekdays("short",!1),1);case"EEEE":return cp(a.weekdays("long",!1),1);case"ccc":return cp(a.weekdays("short",!0),1);case"cccc":return cp(a.weekdays("long",!0),1);case"Z":case"ZZ":return cq(RegExp(`([+-]${h.source})(?::(${d.source}))?`),2);case"ZZZ":return cq(RegExp(`([+-]${h.source})(${d.source})?`),2);case"z":return cr(/[a-z_+-/]{1,256}?/i);case" ":return cr(/[^\S\n\r]/);default:return n(o)}})(b)||{invalidReason:"missing Intl.DateTimeFormat.formatToParts support"}).token=b,o}),this.disqualifyingUnit=this.units.find(a=>a.invalidReason),!this.disqualifyingUnit){const[a,b]=function(a){let b=a.map(a=>a.regex).reduce((a,b)=>`${a}(${b.source})`,"");return[`^${b}$`,a]}(this.units);this.regex=RegExp(a,"i"),this.handlers=b}}explainFromTokens(a){if(!this.isValid)return{input:a,tokens:this.tokens,invalidReason:this.invalidReason};{let b,c,[d,e]=function(a,b,c){let d=a.match(b);if(!d)return[d,{}];{let a={},b=1;for(let e in c)if(aR(c,e)){let f=c[e],g=f.groups?f.groups+1:1;!f.literal&&f.token&&(a[f.token.val[0]]=f.deser(d.slice(b,b+g))),b+=g}return[d,a]}}(a,this.regex,this.handlers),[f,g,h]=e?(c=null,aL(e.z)||(c=R.create(e.z)),aL(e.Z)||(c||(c=new ag(e.Z)),b=e.Z),aL(e.q)||(e.M=(e.q-1)*3+1),aL(e.h)||(e.h<12&&1===e.a?e.h+=12:12===e.h&&0===e.a&&(e.h=0)),0===e.G&&e.y&&(e.y=-e.y),aL(e.u)||(e.S=aX(e.u)),[Object.keys(e).reduce((a,b)=>{let c=(a=>{switch(a){case"S":return"millisecond";case"s":return"second";case"m":return"minute";case"h":case"H":return"hour";case"d":return"day";case"o":return"ordinal";case"L":case"M":return"month";case"y":return"year";case"E":case"c":return"weekday";case"W":return"weekNumber";case"k":return"weekYear";case"q":return"quarter";default:return null}})(b);return c&&(a[c]=e[b]),a},{}),c,b]):[null,null,void 0];if(aR(e,"a")&&aR(e,"H"))throw new i("Can't include meridiem when specifying 24-hour format");return{input:a,tokens:this.tokens,regex:this.regex,rawMatches:d,matches:e,result:f,zone:g,specificOffset:h}}}get isValid(){return!this.disqualifyingUnit}get invalidReason(){return this.disqualifyingUnit?this.disqualifyingUnit.invalidReason:null}}function cw(a,b,c){return new cv(a,c).explainFromTokens(b)}function cx(a,b){if(!a)return null;let c=bp.create(b,a).dtFormatter((ct||(ct=cW.fromMillis(0x16a2e5618e3)),ct)),d=c.formatToParts(),e=c.resolvedOptions();return d.map(b=>(function(a,b,c){let{type:d,value:e}=a;if("literal"===d){let a=/^\s+$/.test(e);return{literal:!a,val:a?" ":e}}let f=b[d],g=d;"hour"===d&&(g=null!=b.hour12?b.hour12?"hour12":"hour24":null!=b.hourCycle?"h11"===b.hourCycle||"h12"===b.hourCycle?"hour12":"hour24":c.hour12?"hour12":"hour24");let h=cs[g];if("object"==typeof h&&(h=h[f]),h)return{literal:!1,val:h}})(b,a,e))}let cy="Invalid DateTime";function cz(a){return new ax("unsupported zone",`the zone "${a.name}" is not supported`)}function cA(a){return null===a.weekData&&(a.weekData=aE(a.c)),a.weekData}function cB(a){return null===a.localWeekData&&(a.localWeekData=aE(a.c,a.loc.getMinDaysInFirstWeek(),a.loc.getStartOfWeek())),a.localWeekData}function cC(a,b){let c={ts:a.ts,zone:a.zone,c:a.c,o:a.o,loc:a.loc,invalid:a.invalid};return new cW({...c,...b,old:c})}function cD(a,b,c){let d=a-60*b*1e3,e=c.offset(d);if(b===e)return[d,b];d-=(e-b)*6e4;let f=c.offset(d);return e===f?[d,e]:[a-60*Math.min(e,f)*1e3,Math.max(e,f)]}function cE(a,b){let c=new Date(a+=60*b*1e3);return{year:c.getUTCFullYear(),month:c.getUTCMonth()+1,day:c.getUTCDate(),hour:c.getUTCHours(),minute:c.getUTCMinutes(),second:c.getUTCSeconds(),millisecond:c.getUTCMilliseconds()}}function cF(a,b){let c=a.o,d=a.c.year+Math.trunc(b.years),e=a.c.month+Math.trunc(b.months)+3*Math.trunc(b.quarters),f={...a.c,year:d,month:e,day:Math.min(a.c.day,a_(d,e))+Math.trunc(b.days)+7*Math.trunc(b.weeks)},g=ce.fromObject({years:b.years-Math.trunc(b.years),quarters:b.quarters-Math.trunc(b.quarters),months:b.months-Math.trunc(b.months),weeks:b.weeks-Math.trunc(b.weeks),days:b.days-Math.trunc(b.days),hours:b.hours,minutes:b.minutes,seconds:b.seconds,milliseconds:b.milliseconds}).as("milliseconds"),[h,i]=cD(a0(f),c,a.zone);return 0!==g&&(h+=g,i=a.zone.offset(h)),{ts:h,o:i}}function cG(a,b,c,d,e,f){let{setZone:g,zone:h}=c;if((!a||0===Object.keys(a).length)&&!b)return cW.invalid(new ax("unparsable",`the input "${e}" can't be parsed as ${d}`));{let d=cW.fromObject(a,{...c,zone:b||h,specificOffset:f});return g?d:d.setZone(h)}}function cH(a,b,c=!0){return a.isValid?bp.create(ae.create("en-US"),{allowZ:c,forceSimple:!0}).formatDateTimeFromString(a,b):null}function cI(a,b,c){let d=a.c.year>9999||a.c.year<0,e="";if(d&&a.c.year>=0&&(e+="+"),e+=aU(a.c.year,d?6:4),"year"===c)return e;if(b){if(e+="-",e+=aU(a.c.month),"month"===c)return e;e+="-"}else if(e+=aU(a.c.month),"month"===c)return e;return e+aU(a.c.day)}function cJ(a,b,c,d,e,f,g){let h=!c||0!==a.c.millisecond||0!==a.c.second,i="";switch(g){case"day":case"month":case"year":break;default:if(i+=aU(a.c.hour),"hour"===g)break;if(b){if(i+=":",i+=aU(a.c.minute),"minute"===g)break;h&&(i+=":",i+=aU(a.c.second))}else{if(i+=aU(a.c.minute),"minute"===g)break;h&&(i+=aU(a.c.second))}if("second"===g)break;h&&(!d||0!==a.c.millisecond)&&(i+=".",i+=aU(a.c.millisecond,3))}return e&&(a.isOffsetFixed&&0===a.offset&&!f?i+="Z":a.o<0?(i+="-",i+=aU(Math.trunc(-a.o/60)),i+=":",i+=aU(Math.trunc(-a.o%60))):(i+="+",i+=aU(Math.trunc(a.o/60)),i+=":",i+=aU(Math.trunc(a.o%60)))),f&&(i+="["+a.zone.ianaName+"]"),i}let cK={month:1,day:1,hour:0,minute:0,second:0,millisecond:0},cL={weekNumber:1,weekday:1,hour:0,minute:0,second:0,millisecond:0},cM={ordinal:1,hour:0,minute:0,second:0,millisecond:0},cN=["year","month","day","hour","minute","second","millisecond"],cO=["weekYear","weekNumber","weekday","hour","minute","second","millisecond"],cP=["year","ordinal","hour","minute","second","millisecond"];function cQ(a){let b={year:"year",years:"year",month:"month",months:"month",day:"day",days:"day",hour:"hour",hours:"hour",minute:"minute",minutes:"minute",quarter:"quarter",quarters:"quarter",second:"second",seconds:"second",millisecond:"millisecond",milliseconds:"millisecond",weekday:"weekday",weekdays:"weekday",weeknumber:"weekNumber",weeksnumber:"weekNumber",weeknumbers:"weekNumber",weekyear:"weekYear",weekyears:"weekYear",ordinal:"ordinal"}[a.toLowerCase()];if(!b)throw new j(a);return b}function cR(a){switch(a.toLowerCase()){case"localweekday":case"localweekdays":return"localWeekday";case"localweeknumber":case"localweeknumbers":return"localWeekNumber";case"localweekyear":case"localweekyears":return"localWeekYear";default:return cQ(a)}}function cS(a,b){let c,e,f=ai(b.zone,aw.defaultZone);if(!f.isValid)return cW.invalid(cz(f));let g=ae.fromObject(b);if(aL(a.year))c=aw.now();else{for(let b of cN)aL(a[b])&&(a[b]=cK[b]);let b=aJ(a)||aK(a);if(b)return cW.invalid(b);let g=function(a){if(void 0===d&&(d=aw.now()),"iana"!==a.type)return a.offset(d);let b=a.name,c=cV.get(b);return void 0===c&&(c=a.offset(d),cV.set(b,c)),c}(f);[c,e]=cD(a0(a),g,f)}return new cW({ts:c,zone:f,loc:g,o:e})}function cT(a,b,c){let d=!!aL(c.round)||c.round,e=aL(c.rounding)?"trunc":c.rounding,f=(a,f)=>(a=aY(a,d||c.calendary?0:2,c.calendary?"round":e),b.loc.clone(c).relFormatter(c).format(a,f)),g=d=>c.calendary?b.hasSame(a,d)?0:b.startOf(d).diff(a.startOf(d),d).get(d):b.diff(a,d).get(d);if(c.unit)return f(g(c.unit),c.unit);for(let a of c.units){let b=g(a);if(Math.abs(b)>=1)return f(b,a)}return f(a>b?-0:0,c.units[c.units.length-1])}function cU(a){let b={},c;return a.length>0&&"object"==typeof a[a.length-1]?(b=a[a.length-1],c=Array.from(a).slice(0,a.length-1)):c=Array.from(a),[b,c]}let cV=new Map;class cW{constructor(a){const b=a.zone||aw.defaultZone;let c=a.invalid||(Number.isNaN(a.ts)?new ax("invalid input"):null)||(b.isValid?null:cz(b));this.ts=aL(a.ts)?aw.now():a.ts;let d=null,e=null;if(!c)if(a.old&&a.old.ts===this.ts&&a.old.zone.equals(b))[d,e]=[a.old.c,a.old.o];else{const f=aM(a.o)&&!a.old?a.o:b.offset(this.ts);d=(c=Number.isNaN((d=cE(this.ts,f)).year)?new ax("invalid input"):null)?null:d,e=c?null:f}this._zone=b,this.loc=a.loc||ae.create(),this.invalid=c,this.weekData=null,this.localWeekData=null,this.c=d,this.o=e,this.isLuxonDateTime=!0}static now(){return new cW({})}static local(){let[a,b]=cU(arguments),[c,d,e,f,g,h,i]=b;return cS({year:c,month:d,day:e,hour:f,minute:g,second:h,millisecond:i},a)}static utc(){let[a,b]=cU(arguments),[c,d,e,f,g,h,i]=b;return a.zone=ag.utcInstance,cS({year:c,month:d,day:e,hour:f,minute:g,second:h,millisecond:i},a)}static fromJSDate(a,b={}){let c="[object Date]"===Object.prototype.toString.call(a)?a.valueOf():NaN;if(Number.isNaN(c))return cW.invalid("invalid input");let d=ai(b.zone,aw.defaultZone);return d.isValid?new cW({ts:c,zone:d,loc:ae.fromObject(b)}):cW.invalid(cz(d))}static fromMillis(a,b={}){if(aM(a))if(a<-864e13||a>864e13)return cW.invalid("Timestamp out of range");else return new cW({ts:a,zone:ai(b.zone,aw.defaultZone),loc:ae.fromObject(b)});throw new k(`fromMillis requires a numerical input, but received a ${typeof a} with value ${a}`)}static fromSeconds(a,b={}){if(aM(a))return new cW({ts:1e3*a,zone:ai(b.zone,aw.defaultZone),loc:ae.fromObject(b)});throw new k("fromSeconds requires a numerical input")}static fromObject(a,b={}){var c;let d,e;a=a||{};let f=ai(b.zone,aw.defaultZone);if(!f.isValid)return cW.invalid(cz(f));let g=ae.fromObject(b),h=a7(a,cR),{minDaysInFirstWeek:j,startOfWeek:k}=aI(h,g),l=aw.now(),m=aL(b.specificOffset)?f.offset(l):b.specificOffset,n=!aL(h.ordinal),o=!aL(h.year),p=!aL(h.month)||!aL(h.day),q=o||p,r=h.weekYear||h.weekNumber;if((q||n)&&r)throw new i("Can't mix weekYear/weekNumber units with year/month/day or ordinals");if(p&&n)throw new i("Can't mix ordinal dates with month/day");let s=r||h.weekday&&!q,t,u,v=cE(l,m);s?(t=cO,u=cL,v=aE(v,j,k)):n?(t=cP,u=cM,v=aG(v)):(t=cN,u=cK);let w=!1;for(let a of t)aL(h[a])?w?h[a]=u[a]:h[a]=v[a]:w=!0;let x=(s?function(a,b=4,c=1){let d=aN(a.weekYear),e=aT(a.weekNumber,1,a2(a.weekYear,b,c)),f=aT(a.weekday,1,7);return d?e?!f&&aA("weekday",a.weekday):aA("week",a.weekNumber):aA("weekYear",a.weekYear)}(h,j,k):n?(d=aN(h.year),e=aT(h.ordinal,1,a$(h.year)),d?!e&&aA("ordinal",h.ordinal):aA("year",h.year)):aJ(h))||aK(h);if(x)return cW.invalid(x);let[y,z]=(c=s?aF(h,j,k):n?aH(h):h,cD(a0(c),m,f)),A=new cW({ts:y,zone:f,o:z,loc:g});return h.weekday&&q&&a.weekday!==A.weekday?cW.invalid("mismatched weekday",`you can't specify both a weekday of ${h.weekday} and a date of ${A.toISO()}`):A.isValid?A:cW.invalid(A.invalid)}static fromISO(a,b={}){let[c,d]=bt(a,[bU,bY],[bV,bZ],[bW,b$],[bX,b_]);return cG(c,d,b,"ISO 8601",a)}static fromRFC2822(a,b={}){let[c,d]=bt(a.replace(/\([^()]*\)|[\n\t]/g," ").replace(/(\s\s+)/g," ").trim(),[bN,bO]);return cG(c,d,b,"RFC 2822",a)}static fromHTTP(a,b={}){let[c,d]=bt(a,[bP,bS],[bQ,bS],[bR,bT]);return cG(c,d,b,"HTTP",b)}static fromFormat(a,b,c={}){if(aL(a)||aL(b))throw new k("fromFormat requires an input string and a format");let{locale:d=null,numberingSystem:e=null}=c,[f,g,h,i]=function(a,b,c){let{result:d,zone:e,specificOffset:f,invalidReason:g}=cw(a,b,c);return[d,e,f,g]}(ae.fromOpts({locale:d,numberingSystem:e,defaultToEN:!0}),a,b);return i?cW.invalid(i):cG(f,g,c,`format ${b}`,a,h)}static fromString(a,b,c={}){return cW.fromFormat(a,b,c)}static fromSQL(a,b={}){let[c,d]=bt(a,[b1,bY],[b2,b3]);return cG(c,d,b,"SQL",a)}static invalid(a,b=null){if(!a)throw new k("need to specify a reason the DateTime is invalid");let c=a instanceof ax?a:new ax(a,b);if(!aw.throwOnInvalid)return new cW({invalid:c});throw new f(c)}static isDateTime(a){return a&&a.isLuxonDateTime||!1}static parseFormatForOpts(a,b={}){let c=cx(a,ae.fromObject(b));return c?c.map(a=>a?a.val:null).join(""):null}static expandFormat(a,b={}){return cu(bp.parseFormat(a),ae.fromObject(b)).map(a=>a.val).join("")}static resetCache(){d=void 0,cV.clear()}get(a){return this[a]}get isValid(){return null===this.invalid}get invalidReason(){return this.invalid?this.invalid.reason:null}get invalidExplanation(){return this.invalid?this.invalid.explanation:null}get locale(){return this.isValid?this.loc.locale:null}get numberingSystem(){return this.isValid?this.loc.numberingSystem:null}get outputCalendar(){return this.isValid?this.loc.outputCalendar:null}get zone(){return this._zone}get zoneName(){return this.isValid?this.zone.name:null}get year(){return this.isValid?this.c.year:NaN}get quarter(){return this.isValid?Math.ceil(this.c.month/3):NaN}get month(){return this.isValid?this.c.month:NaN}get day(){return this.isValid?this.c.day:NaN}get hour(){return this.isValid?this.c.hour:NaN}get minute(){return this.isValid?this.c.minute:NaN}get second(){return this.isValid?this.c.second:NaN}get millisecond(){return this.isValid?this.c.millisecond:NaN}get weekYear(){return this.isValid?cA(this).weekYear:NaN}get weekNumber(){return this.isValid?cA(this).weekNumber:NaN}get weekday(){return this.isValid?cA(this).weekday:NaN}get isWeekend(){return this.isValid&&this.loc.getWeekendDays().includes(this.weekday)}get localWeekday(){return this.isValid?cB(this).weekday:NaN}get localWeekNumber(){return this.isValid?cB(this).weekNumber:NaN}get localWeekYear(){return this.isValid?cB(this).weekYear:NaN}get ordinal(){return this.isValid?aG(this.c).ordinal:NaN}get monthShort(){return this.isValid?ch.months("short",{locObj:this.loc})[this.month-1]:null}get monthLong(){return this.isValid?ch.months("long",{locObj:this.loc})[this.month-1]:null}get weekdayShort(){return this.isValid?ch.weekdays("short",{locObj:this.loc})[this.weekday-1]:null}get weekdayLong(){return this.isValid?ch.weekdays("long",{locObj:this.loc})[this.weekday-1]:null}get offset(){return this.isValid?+this.o:NaN}get offsetNameShort(){return this.isValid?this.zone.offsetName(this.ts,{format:"short",locale:this.locale}):null}get offsetNameLong(){return this.isValid?this.zone.offsetName(this.ts,{format:"long",locale:this.locale}):null}get isOffsetFixed(){return this.isValid?this.zone.isUniversal:null}get isInDST(){return!this.isOffsetFixed&&(this.offset>this.set({month:1,day:1}).offset||this.offset>this.set({month:5}).offset)}getPossibleOffsets(){if(!this.isValid||this.isOffsetFixed)return[this];let a=a0(this.c),b=this.zone.offset(a-864e5),c=this.zone.offset(a+864e5),d=this.zone.offset(a-6e4*b),e=this.zone.offset(a-6e4*c);if(d===e)return[this];let f=a-6e4*d,g=a-6e4*e,h=cE(f,d),i=cE(g,e);return h.hour===i.hour&&h.minute===i.minute&&h.second===i.second&&h.millisecond===i.millisecond?[cC(this,{ts:f}),cC(this,{ts:g})]:[this]}get isInLeapYear(){return aZ(this.year)}get daysInMonth(){return a_(this.year,this.month)}get daysInYear(){return this.isValid?a$(this.year):NaN}get weeksInWeekYear(){return this.isValid?a2(this.weekYear):NaN}get weeksInLocalWeekYear(){return this.isValid?a2(this.localWeekYear,this.loc.getMinDaysInFirstWeek(),this.loc.getStartOfWeek()):NaN}resolvedLocaleOptions(a={}){let{locale:b,numberingSystem:c,calendar:d}=bp.create(this.loc.clone(a),a).resolvedOptions(this);return{locale:b,numberingSystem:c,outputCalendar:d}}toUTC(a=0,b={}){return this.setZone(ag.instance(a),b)}toLocal(){return this.setZone(aw.defaultZone)}setZone(a,{keepLocalTime:b=!1,keepCalendarTime:c=!1}={}){if((a=ai(a,aw.defaultZone)).equals(this.zone))return this;{if(!a.isValid)return cW.invalid(cz(a));let e=this.ts;if(b||c){var d;let b=a.offset(this.ts),c=this.toObject();[e]=(d=a,cD(a0(c),b,d))}return cC(this,{ts:e,zone:a})}}reconfigure({locale:a,numberingSystem:b,outputCalendar:c}={}){return cC(this,{loc:this.loc.clone({locale:a,numberingSystem:b,outputCalendar:c})})}setLocale(a){return this.reconfigure({locale:a})}set(a){var b,c,d;let e;if(!this.isValid)return this;let f=a7(a,cR),{minDaysInFirstWeek:g,startOfWeek:h}=aI(f,this.loc),j=!aL(f.weekYear)||!aL(f.weekNumber)||!aL(f.weekday),k=!aL(f.ordinal),l=!aL(f.year),m=!aL(f.month)||!aL(f.day),n=f.weekYear||f.weekNumber;if((l||m||k)&&n)throw new i("Can't mix weekYear/weekNumber units with year/month/day or ordinals");if(m&&k)throw new i("Can't mix ordinal dates with month/day");j?e=aF({...aE(this.c,g,h),...f},g,h):aL(f.ordinal)?(e={...this.toObject(),...f},aL(f.day)&&(e.day=Math.min(a_(e.year,e.month),e.day))):e=aH({...aG(this.c),...f});let[o,p]=(b=e,c=this.o,d=this.zone,cD(a0(b),c,d));return cC(this,{ts:o,o:p})}plus(a){return this.isValid?cC(this,cF(this,ce.fromDurationLike(a))):this}minus(a){return this.isValid?cC(this,cF(this,ce.fromDurationLike(a).negate())):this}startOf(a,{useLocaleWeeks:b=!1}={}){if(!this.isValid)return this;let c={},d=ce.normalizeUnit(a);switch(d){case"years":c.month=1;case"quarters":case"months":c.day=1;case"weeks":case"days":c.hour=0;case"hours":c.minute=0;case"minutes":c.second=0;case"seconds":c.millisecond=0}if("weeks"===d)if(b){let a=this.loc.getStartOfWeek(),{weekday:b}=this;b<a&&(c.weekNumber=this.weekNumber-1),c.weekday=a}else c.weekday=1;return"quarters"===d&&(c.month=(Math.ceil(this.month/3)-1)*3+1),this.set(c)}endOf(a,b){return this.isValid?this.plus({[a]:1}).startOf(a,b).minus(1):this}toFormat(a,b={}){return this.isValid?bp.create(this.loc.redefaultToEN(b)).formatDateTimeFromString(this,a):cy}toLocaleString(a=p,b={}){return this.isValid?bp.create(this.loc.clone(b),a).formatDateTime(this):cy}toLocaleParts(a={}){return this.isValid?bp.create(this.loc.clone(a),a).formatDateTimeParts(this):[]}toISO({format:a="extended",suppressSeconds:b=!1,suppressMilliseconds:c=!1,includeOffset:d=!0,extendedZone:e=!1,precision:f="milliseconds"}={}){if(!this.isValid)return null;f=cQ(f);let g="extended"===a,h=cI(this,g,f);return cN.indexOf(f)>=3&&(h+="T"),h+=cJ(this,g,b,c,d,e,f)}toISODate({format:a="extended",precision:b="day"}={}){return this.isValid?cI(this,"extended"===a,cQ(b)):null}toISOWeekDate(){return cH(this,"kkkk-'W'WW-c")}toISOTime({suppressMilliseconds:a=!1,suppressSeconds:b=!1,includeOffset:c=!0,includePrefix:d=!1,extendedZone:e=!1,format:f="extended",precision:g="milliseconds"}={}){return this.isValid?(g=cQ(g),(d&&cN.indexOf(g)>=3?"T":"")+cJ(this,"extended"===f,b,a,c,e,g)):null}toRFC2822(){return cH(this,"EEE, dd LLL yyyy HH:mm:ss ZZZ",!1)}toHTTP(){return cH(this.toUTC(),"EEE, dd LLL yyyy HH:mm:ss 'GMT'")}toSQLDate(){return this.isValid?cI(this,!0):null}toSQLTime({includeOffset:a=!0,includeZone:b=!1,includeOffsetSpace:c=!0}={}){let d="HH:mm:ss.SSS";return(b||a)&&(c&&(d+=" "),b?d+="z":a&&(d+="ZZ")),cH(this,d,!0)}toSQL(a={}){return this.isValid?`${this.toSQLDate()} ${this.toSQLTime(a)}`:null}toString(){return this.isValid?this.toISO():cy}[Symbol.for("nodejs.util.inspect.custom")](){return this.isValid?`DateTime { ts: ${this.toISO()}, zone: ${this.zone.name}, locale: ${this.locale} }`:`DateTime { Invalid, reason: ${this.invalidReason} }`}valueOf(){return this.toMillis()}toMillis(){return this.isValid?this.ts:NaN}toSeconds(){return this.isValid?this.ts/1e3:NaN}toUnixInteger(){return this.isValid?Math.floor(this.ts/1e3):NaN}toJSON(){return this.toISO()}toBSON(){return this.toJSDate()}toObject(a={}){if(!this.isValid)return{};let b={...this.c};return a.includeConfig&&(b.outputCalendar=this.outputCalendar,b.numberingSystem=this.loc.numberingSystem,b.locale=this.loc.locale),b}toJSDate(){return new Date(this.isValid?this.ts:NaN)}diff(a,b="milliseconds",c={}){if(!this.isValid||!a.isValid)return ce.invalid("created by diffing an invalid DateTime");let d={locale:this.locale,numberingSystem:this.numberingSystem,...c},e=(Array.isArray(b)?b:[b]).map(ce.normalizeUnit),f=a.valueOf()>this.valueOf(),g=function(a,b,c,d){let[e,f,g,h]=function(a,b,c){let d,e,f={},g=a;for(let[h,i]of[["years",(a,b)=>b.year-a.year],["quarters",(a,b)=>b.quarter-a.quarter+(b.year-a.year)*4],["months",(a,b)=>b.month-a.month+(b.year-a.year)*12],["weeks",(a,b)=>{let c=ci(a,b);return(c-c%7)/7}],["days",ci]])c.indexOf(h)>=0&&(d=h,f[h]=i(a,b),(e=g.plus(f))>b?(f[h]--,(a=g.plus(f))>b&&(e=a,f[h]--,a=g.plus(f))):a=e);return[a,f,e,d]}(a,b,c),i=b-e,j=c.filter(a=>["hours","minutes","seconds","milliseconds"].indexOf(a)>=0);0===j.length&&(g<b&&(g=e.plus({[h]:1})),g!==e&&(f[h]=(f[h]||0)+i/(g-e)));let k=ce.fromObject(f,d);return j.length>0?ce.fromMillis(i,d).shiftTo(...j).plus(k):k}(f?this:a,f?a:this,e,d);return f?g.negate():g}diffNow(a="milliseconds",b={}){return this.diff(cW.now(),a,b)}until(a){return this.isValid?cg.fromDateTimes(this,a):this}hasSame(a,b,c){if(!this.isValid)return!1;let d=a.valueOf(),e=this.setZone(a.zone,{keepLocalTime:!0});return e.startOf(b,c)<=d&&d<=e.endOf(b,c)}equals(a){return this.isValid&&a.isValid&&this.valueOf()===a.valueOf()&&this.zone.equals(a.zone)&&this.loc.equals(a.loc)}toRelative(a={}){if(!this.isValid)return null;let b=a.base||cW.fromObject({},{zone:this.zone}),c=a.padding?this<b?-a.padding:a.padding:0,d=["years","months","days","hours","minutes","seconds"],e=a.unit;return Array.isArray(a.unit)&&(d=a.unit,e=void 0),cT(b,this.plus(c),{...a,numeric:"always",units:d,unit:e})}toRelativeCalendar(a={}){return this.isValid?cT(a.base||cW.fromObject({},{zone:this.zone}),this,{...a,numeric:"auto",units:["years","months","days"],calendary:!0}):null}static min(...a){if(!a.every(cW.isDateTime))throw new k("min requires all arguments be DateTimes");return aQ(a,a=>a.valueOf(),Math.min)}static max(...a){if(!a.every(cW.isDateTime))throw new k("max requires all arguments be DateTimes");return aQ(a,a=>a.valueOf(),Math.max)}static fromFormatExplain(a,b,c={}){let{locale:d=null,numberingSystem:e=null}=c;return cw(ae.fromOpts({locale:d,numberingSystem:e,defaultToEN:!0}),a,b)}static fromStringExplain(a,b,c={}){return cW.fromFormatExplain(a,b,c)}static buildFormatParser(a,b={}){let{locale:c=null,numberingSystem:d=null}=b;return new cv(ae.fromOpts({locale:c,numberingSystem:d,defaultToEN:!0}),a)}static fromFormatParser(a,b,c={}){if(aL(a)||aL(b))throw new k("fromFormatParser requires an input string and a format parser");let{locale:d=null,numberingSystem:e=null}=c,f=ae.fromOpts({locale:d,numberingSystem:e,defaultToEN:!0});if(!f.equals(b.locale))throw new k(`fromFormatParser called with a locale of ${f}, but the format parser was created for ${b.locale}`);let{result:g,zone:h,specificOffset:i,invalidReason:j}=b.explainFromTokens(a);return j?cW.invalid(j):cG(g,h,c,`format ${b.format}`,a,i)}static get DATE_SHORT(){return p}static get DATE_MED(){return q}static get DATE_MED_WITH_WEEKDAY(){return r}static get DATE_FULL(){return s}static get DATE_HUGE(){return t}static get TIME_SIMPLE(){return u}static get TIME_WITH_SECONDS(){return v}static get TIME_WITH_SHORT_OFFSET(){return w}static get TIME_WITH_LONG_OFFSET(){return x}static get TIME_24_SIMPLE(){return y}static get TIME_24_WITH_SECONDS(){return z}static get TIME_24_WITH_SHORT_OFFSET(){return A}static get TIME_24_WITH_LONG_OFFSET(){return B}static get DATETIME_SHORT(){return C}static get DATETIME_SHORT_WITH_SECONDS(){return D}static get DATETIME_MED(){return E}static get DATETIME_MED_WITH_SECONDS(){return F}static get DATETIME_MED_WITH_WEEKDAY(){return G}static get DATETIME_FULL(){return H}static get DATETIME_FULL_WITH_SECONDS(){return I}static get DATETIME_HUGE(){return J}static get DATETIME_HUGE_WITH_SECONDS(){return K}}function cX(a){if(cW.isDateTime(a))return a;if(a&&a.valueOf&&aM(a.valueOf()))return cW.fromJSDate(a);if(a&&"object"==typeof a)return cW.fromObject(a);throw new k(`Unknown datetime argument: ${a}, of type ${typeof a}`)}c.DateTime=cW,c.Duration=ce,c.FixedOffsetZone=ag,c.IANAZone=R,c.Info=ch,c.Interval=cg,c.InvalidZone=ah,c.Settings=aw,c.SystemZone=N,c.VERSION="3.7.2",c.Zone=L},409700,(a,b,c)=>{"use strict";var d=a.r(666127);function e(a,b){var c={zone:b};if(a?a instanceof e?this._date=a._date:a instanceof Date?this._date=d.DateTime.fromJSDate(a,c):"number"==typeof a?this._date=d.DateTime.fromMillis(a,c):"string"==typeof a&&(this._date=d.DateTime.fromISO(a,c),this._date.isValid||(this._date=d.DateTime.fromRFC2822(a,c)),this._date.isValid||(this._date=d.DateTime.fromSQL(a,c)),this._date.isValid||(this._date=d.DateTime.fromFormat(a,"EEE, d MMM yyyy HH:mm:ss",c))):this._date=d.DateTime.local(),!this._date||!this._date.isValid)throw Error("CronDate: unhandled timestamp: "+JSON.stringify(a));b&&b!==this._date.zoneName&&(this._date=this._date.setZone(b))}e.prototype.addYear=function(){this._date=this._date.plus({years:1})},e.prototype.addMonth=function(){this._date=this._date.plus({months:1}).startOf("month")},e.prototype.addDay=function(){this._date=this._date.plus({days:1}).startOf("day")},e.prototype.addHour=function(){var a=this._date;this._date=this._date.plus({hours:1}).startOf("hour"),this._date<=a&&(this._date=this._date.plus({hours:1}))},e.prototype.addMinute=function(){var a=this._date;this._date=this._date.plus({minutes:1}).startOf("minute"),this._date<a&&(this._date=this._date.plus({hours:1}))},e.prototype.addSecond=function(){var a=this._date;this._date=this._date.plus({seconds:1}).startOf("second"),this._date<a&&(this._date=this._date.plus({hours:1}))},e.prototype.subtractYear=function(){this._date=this._date.minus({years:1})},e.prototype.subtractMonth=function(){this._date=this._date.minus({months:1}).endOf("month").startOf("second")},e.prototype.subtractDay=function(){this._date=this._date.minus({days:1}).endOf("day").startOf("second")},e.prototype.subtractHour=function(){var a=this._date;this._date=this._date.minus({hours:1}).endOf("hour").startOf("second"),this._date>=a&&(this._date=this._date.minus({hours:1}))},e.prototype.subtractMinute=function(){var a=this._date;this._date=this._date.minus({minutes:1}).endOf("minute").startOf("second"),this._date>a&&(this._date=this._date.minus({hours:1}))},e.prototype.subtractSecond=function(){var a=this._date;this._date=this._date.minus({seconds:1}).startOf("second"),this._date>a&&(this._date=this._date.minus({hours:1}))},e.prototype.getDate=function(){return this._date.day},e.prototype.getFullYear=function(){return this._date.year},e.prototype.getDay=function(){var a=this._date.weekday;return 7==a?0:a},e.prototype.getMonth=function(){return this._date.month-1},e.prototype.getHours=function(){return this._date.hour},e.prototype.getMinutes=function(){return this._date.minute},e.prototype.getSeconds=function(){return this._date.second},e.prototype.getMilliseconds=function(){return this._date.millisecond},e.prototype.getTime=function(){return this._date.valueOf()},e.prototype.getUTCDate=function(){return this._getUTC().day},e.prototype.getUTCFullYear=function(){return this._getUTC().year},e.prototype.getUTCDay=function(){var a=this._getUTC().weekday;return 7==a?0:a},e.prototype.getUTCMonth=function(){return this._getUTC().month-1},e.prototype.getUTCHours=function(){return this._getUTC().hour},e.prototype.getUTCMinutes=function(){return this._getUTC().minute},e.prototype.getUTCSeconds=function(){return this._getUTC().second},e.prototype.toISOString=function(){return this._date.toUTC().toISO()},e.prototype.toJSON=function(){return this._date.toJSON()},e.prototype.setDate=function(a){this._date=this._date.set({day:a})},e.prototype.setFullYear=function(a){this._date=this._date.set({year:a})},e.prototype.setDay=function(a){this._date=this._date.set({weekday:a})},e.prototype.setMonth=function(a){this._date=this._date.set({month:a+1})},e.prototype.setHours=function(a){this._date=this._date.set({hour:a})},e.prototype.setMinutes=function(a){this._date=this._date.set({minute:a})},e.prototype.setSeconds=function(a){this._date=this._date.set({second:a})},e.prototype.setMilliseconds=function(a){this._date=this._date.set({millisecond:a})},e.prototype._getUTC=function(){return this._date.toUTC()},e.prototype.toString=function(){return this.toDate().toString()},e.prototype.toDate=function(){return this._date.toJSDate()},e.prototype.isLastDayOfMonth=function(){var a=this._date.plus({days:1}).startOf("day");return this._date.month!==a.month},e.prototype.isLastWeekdayOfMonth=function(){var a=this._date.plus({days:7}).startOf("day");return this._date.month!==a.month},b.exports=e},475700,(a,b,c)=>{"use strict";function d(a){return{start:a,count:1}}function e(a,b){a.end=b,a.step=b-a.start,a.count=2}function f(a,b,c){b&&(2===b.count?(a.push(d(b.start)),a.push(d(b.end))):a.push(b)),c&&a.push(c)}b.exports=function(a){for(var b=[],c=void 0,g=0;g<a.length;g++){var h=a[g];"number"!=typeof h?(f(b,c,d(h)),c=void 0):c?1===c.count?e(c,h):c.step===h-c.end?(c.count++,c.end=h):2===c.count?(b.push(d(c.start)),e(c=d(c.end),h)):(f(b,c),c=d(h)):c=d(h)}return f(b,c),b}},338934,(a,b,c)=>{"use strict";var d=a.r(475700);b.exports=function(a,b,c){var e=d(a);if(1===e.length){var f=e[0],g=f.step;if(1===g&&f.start===b&&f.end===c)return"*";if(1!==g&&f.start===b&&f.end===c-g+1)return"*/"+g}for(var h=[],i=0,j=e.length;i<j;++i){var k=e[i];if(1===k.count){h.push(k.start);continue}var g=k.step;if(1===k.step){h.push(k.start+"-"+k.end);continue}var l=0==k.start?k.count-1:k.count;k.step*l>k.end?h=h.concat(Array.from({length:k.end-k.start+1}).map(function(a,b){var c=k.start+b;return(c-k.start)%k.step==0?c:null}).filter(function(a){return null!=a})):k.end===c-k.step+1?h.push(k.start+"/"+k.step):h.push(k.start+"-"+k.end+"/"+k.step)}return h.join(",")}},901630,(a,b,c)=>{"use strict";var d=a.r(409700),e=a.r(338934);function f(a,b){this._options=b,this._utc=b.utc||!1,this._tz=this._utc?"UTC":b.tz,this._currentDate=new d(b.currentDate,this._tz),this._startDate=b.startDate?new d(b.startDate,this._tz):null,this._endDate=b.endDate?new d(b.endDate,this._tz):null,this._isIterator=b.iterator||!1,this._hasIterated=!1,this._nthDayOfWeek=b.nthDayOfWeek||0,this.fields=f._freezeFields(a)}f.map=["second","minute","hour","dayOfMonth","month","dayOfWeek"],f.predefined={"@yearly":"0 0 1 1 *","@monthly":"0 0 1 * *","@weekly":"0 0 * * 0","@daily":"0 0 * * *","@hourly":"0 * * * *"},f.constraints=[{min:0,max:59,chars:[]},{min:0,max:59,chars:[]},{min:0,max:23,chars:[]},{min:1,max:31,chars:["L"]},{min:1,max:12,chars:[]},{min:0,max:7,chars:["L"]}],f.daysInMonth=[31,29,31,30,31,30,31,31,30,31,30,31],f.aliases={month:{jan:1,feb:2,mar:3,apr:4,may:5,jun:6,jul:7,aug:8,sep:9,oct:10,nov:11,dec:12},dayOfWeek:{sun:0,mon:1,tue:2,wed:3,thu:4,fri:5,sat:6}},f.parseDefaults=["0","*","*","*","*","*"],f.standardValidCharacters=/^[,*\d/-]+$/,f.dayOfWeekValidCharacters=/^[?,*\dL#/-]+$/,f.dayOfMonthValidCharacters=/^[?,*\dL/-]+$/,f.validCharacters={second:f.standardValidCharacters,minute:f.standardValidCharacters,hour:f.standardValidCharacters,dayOfMonth:f.dayOfMonthValidCharacters,month:f.standardValidCharacters,dayOfWeek:f.dayOfWeekValidCharacters},f._isValidConstraintChar=function(a,b){return"string"==typeof b&&a.chars.some(function(a){return b.indexOf(a)>-1})},f._parseField=function(a,b,c){switch(a){case"month":case"dayOfWeek":var d=f.aliases[a];b=b.replace(/[a-z]{3}/gi,function(a){if(void 0!==d[a=a.toLowerCase()])return d[a];throw Error('Validation error, cannot resolve alias "'+a+'"')})}if(!f.validCharacters[a].test(b))throw Error("Invalid characters, got value: "+b);function e(a){var b=a.split("/");if(b.length>2)throw Error("Invalid repeat: "+a);return b.length>1?(b[0]==+b[0]&&(b=[b[0]+"-"+c.max,b[1]]),g(b[0],b[b.length-1])):g(a,1)}function g(b,d){var e=[],f=b.split("-");if(f.length>1){if(f.length<2)return+b;if(!f[0].length){if(!f[1].length)throw Error("Invalid range: "+b);return+b}var g=+f[0],h=+f[1];if(Number.isNaN(g)||Number.isNaN(h)||g<c.min||h>c.max)throw Error("Constraint error, got range "+g+"-"+h+" expected range "+c.min+"-"+c.max);if(g>h)throw Error("Invalid range: "+b);var i=+d;if(Number.isNaN(i)||i<=0)throw Error("Constraint error, cannot repeat at every "+i+" time.");"dayOfWeek"===a&&h%7==0&&e.push(0);for(var j=g;j<=h;j++)-1===e.indexOf(j)&&i>0&&i%d==0?(i=1,e.push(j)):i++;return e}return Number.isNaN(+b)?b:+b}return -1!==b.indexOf("*")?b=b.replace(/\*/g,c.min+"-"+c.max):-1!==b.indexOf("?")&&(b=b.replace(/\?/g,c.min+"-"+c.max)),function(b){var d=[];function g(b){if(b instanceof Array)for(var e=0,g=b.length;e<g;e++){var h=b[e];if(f._isValidConstraintChar(c,h)){d.push(h);continue}if("number"!=typeof h||Number.isNaN(h)||h<c.min||h>c.max)throw Error("Constraint error, got value "+h+" expected range "+c.min+"-"+c.max);d.push(h)}else{if(f._isValidConstraintChar(c,b))return void d.push(b);var i=+b;if(Number.isNaN(i)||i<c.min||i>c.max)throw Error("Constraint error, got value "+b+" expected range "+c.min+"-"+c.max);"dayOfWeek"===a&&(i%=7),d.push(i)}}var h=b.split(",");if(!h.every(function(a){return a.length>0}))throw Error("Invalid list value format");if(h.length>1)for(var i=0,j=h.length;i<j;i++)g(e(h[i]));else g(e(b));return d.sort(f._sortCompareFn),d}(b)},f._sortCompareFn=function(a,b){var c="number"==typeof a,d="number"==typeof b;return c&&d?a-b:!c&&d?1:c&&!d?-1:a.localeCompare(b)},f._handleMaxDaysInMonth=function(a){if(1===a.month.length){var b=f.daysInMonth[a.month[0]-1];if(a.dayOfMonth[0]>b)throw Error("Invalid explicit day of month definition");return a.dayOfMonth.filter(function(a){return"L"===a||a<=b}).sort(f._sortCompareFn)}},f._freezeFields=function(a){for(var b=0,c=f.map.length;b<c;++b){var d=f.map[b],e=a[d];a[d]=Object.freeze(e)}return Object.freeze(a)},f.prototype._applyTimezoneShift=function(a,b,c){if("Month"===c||"Day"===c){var d=a.getTime();a[b+c](),d===a.getTime()&&(0===a.getMinutes()&&0===a.getSeconds()?a.addHour():59===a.getMinutes()&&59===a.getSeconds()&&a.subtractHour())}else{var e=a.getHours();a[b+c]();var f=a.getHours(),g=f-e;2===g?24!==this.fields.hour.length&&(this._dstStart=f):0===g&&0===a.getMinutes()&&0===a.getSeconds()&&24!==this.fields.hour.length&&(this._dstEnd=f)}},f.prototype._findSchedule=function(a){function b(a,b){for(var c=0,d=b.length;c<d;c++)if(b[c]>=a)return b[c]===a;return b[0]===a}function c(a){return a.length>0&&a.some(function(a){return"string"==typeof a&&a.indexOf("L")>=0})}for(var e=(a=a||!1)?"subtract":"add",g=new d(this._currentDate,this._tz),h=this._startDate,i=this._endDate,j=g.getTime(),k=0;k<1e4;){if(k++,a){if(h&&g.getTime()-h.getTime()<0)throw Error("Out of the timespan range")}else if(i&&i.getTime()-g.getTime()<0)throw Error("Out of the timespan range");var l=b(g.getDate(),this.fields.dayOfMonth);c(this.fields.dayOfMonth)&&(l=l||g.isLastDayOfMonth());var m=b(g.getDay(),this.fields.dayOfWeek);c(this.fields.dayOfWeek)&&(m=m||this.fields.dayOfWeek.some(function(a){if(!c([a]))return!1;var b=Number.parseInt(a[0])%7;if(Number.isNaN(b))throw Error("Invalid last weekday of the month expression: "+a);return g.getDay()===b&&g.isLastWeekdayOfMonth()}));var n=this.fields.dayOfMonth.length>=f.daysInMonth[g.getMonth()],o=this.fields.dayOfWeek.length===f.constraints[5].max-f.constraints[5].min+1,p=g.getHours();if(!l&&(!m||o)||!n&&o&&!l||n&&!o&&!m||this._nthDayOfWeek>0&&!function(a,b){if(b<6){if(8>a.getDate()&&1===b)return!0;var c=a.getDate()%7?1:0;return Math.floor((a.getDate()-a.getDate()%7)/7)+c===b}return!1}(g,this._nthDayOfWeek)){this._applyTimezoneShift(g,e,"Day");continue}if(!b(g.getMonth()+1,this.fields.month)){this._applyTimezoneShift(g,e,"Month");continue}if(b(p,this.fields.hour)){if(this._dstEnd===p&&!a){this._dstEnd=null,this._applyTimezoneShift(g,"add","Hour");continue}}else if(this._dstStart!==p){this._dstStart=null,this._applyTimezoneShift(g,e,"Hour");continue}else if(!b(p-1,this.fields.hour)){g[e+"Hour"]();continue}if(!b(g.getMinutes(),this.fields.minute)){this._applyTimezoneShift(g,e,"Minute");continue}if(!b(g.getSeconds(),this.fields.second)){this._applyTimezoneShift(g,e,"Second");continue}if(j===g.getTime()){"add"===e||0===g.getMilliseconds()?this._applyTimezoneShift(g,e,"Second"):g.setMilliseconds(0);continue}break}if(k>=1e4)throw Error("Invalid expression, loop limit exceeded");return this._currentDate=new d(g,this._tz),this._hasIterated=!0,g},f.prototype.next=function(){var a=this._findSchedule();return this._isIterator?{value:a,done:!this.hasNext()}:a},f.prototype.prev=function(){var a=this._findSchedule(!0);return this._isIterator?{value:a,done:!this.hasPrev()}:a},f.prototype.hasNext=function(){var a=this._currentDate,b=this._hasIterated;try{return this._findSchedule(),!0}catch(a){return!1}finally{this._currentDate=a,this._hasIterated=b}},f.prototype.hasPrev=function(){var a=this._currentDate,b=this._hasIterated;try{return this._findSchedule(!0),!0}catch(a){return!1}finally{this._currentDate=a,this._hasIterated=b}},f.prototype.iterate=function(a,b){var c=[];if(a>=0)for(var d=0,e=a;d<e;d++)try{var f=this.next();c.push(f),b&&b(f,d)}catch(a){break}else for(var d=0,e=a;d>e;d--)try{var f=this.prev();c.push(f),b&&b(f,d)}catch(a){break}return c},f.prototype.reset=function(a){this._currentDate=new d(a||this._options.currentDate)},f.prototype.stringify=function(a){for(var b=[],c=+!a,d=f.map.length;c<d;++c){var g=f.map[c],h=this.fields[g],i=f.constraints[c];"dayOfMonth"===g&&1===this.fields.month.length?i={min:1,max:f.daysInMonth[this.fields.month[0]-1]}:"dayOfWeek"===g&&(i={min:0,max:6},h=7===h[h.length-1]?h.slice(0,-1):h),b.push(e(h,i.min,i.max))}return b.join(" ")},f.parse=function(a,b){var c=this;return"function"==typeof b&&(b={}),function(a,b){b||(b={}),void 0===b.currentDate&&(b.currentDate=new d(void 0,c._tz)),f.predefined[a]&&(a=f.predefined[a]);var e=[],g=(a+"").trim().split(/\s+/);if(g.length>6)throw Error("Invalid cron expression");for(var h=f.map.length-g.length,i=0,j=f.map.length;i<j;++i){var k=f.map[i],l=g[g.length>j?i:i-h];if(i<h||!l)e.push(f._parseField(k,f.parseDefaults[i],f.constraints[i]));else{var m="dayOfWeek"===k?function(a){var c=a.split("#");if(c.length>1){var d=+c[c.length-1];if(/,/.test(a))throw Error("Constraint error, invalid dayOfWeek `#` and `,` special characters are incompatible");if(/\//.test(a))throw Error("Constraint error, invalid dayOfWeek `#` and `/` special characters are incompatible");if(/-/.test(a))throw Error("Constraint error, invalid dayOfWeek `#` and `-` special characters are incompatible");if(c.length>2||Number.isNaN(d)||d<1||d>5)throw Error("Constraint error, invalid dayOfWeek occurrence number (#)");return b.nthDayOfWeek=d,c[0]}return a}(l):l;e.push(f._parseField(k,m,f.constraints[i]))}}for(var n={},i=0,j=f.map.length;i<j;i++)n[f.map[i]]=e[i];var o=f._handleMaxDaysInMonth(n);return n.dayOfMonth=o||n.dayOfMonth,new f(n,b)}(a,b)},f.fieldsToExpression=function(a,b){for(var c={},d=0,e=f.map.length;d<e;++d){var g=f.map[d],h=a[g];!function(a,b,c){if(!b)throw Error("Validation error, Field "+a+" is missing");if(0===b.length)throw Error("Validation error, Field "+a+" contains no values");for(var d=0,e=b.length;d<e;d++){var g=b[d];if(!f._isValidConstraintChar(c,g)&&("number"!=typeof g||Number.isNaN(g)||g<c.min||g>c.max))throw Error("Constraint error, got value "+g+" expected range "+c.min+"-"+c.max)}}(g,h,f.constraints[d]);for(var i=[],j=-1;++j<h.length;)i[j]=h[j];if((h=i.sort(f._sortCompareFn).filter(function(a,b,c){return!b||a!==c[b-1]})).length!==i.length)throw Error("Validation error, Field "+g+" contains duplicate values");c[g]=h}var k=f._handleMaxDaysInMonth(c);return c.dayOfMonth=k||c.dayOfMonth,new f(c,b||{})},b.exports=f},410471,(a,b,c)=>{"use strict";var d=a.r(901630);function e(){}e._parseEntry=function(a){var b=a.split(" ");if(6===b.length)return{interval:d.parse(a)};if(b.length>6)return{interval:d.parse(b.slice(0,6).join(" ")),command:b.slice(6,b.length)};throw Error("Invalid entry: "+a)},e.parseExpression=function(a,b){return d.parse(a,b)},e.fieldsToExpression=function(a,b){return d.fieldsToExpression(a,b)},e.parseString=function(a){for(var b=a.split("\n"),c={variables:{},expressions:[],errors:{}},d=0,f=b.length;d<f;d++){var g=b[d],h=null,i=g.trim();if(i.length>0)if(i.match(/^#/))continue;else if(h=i.match(/^(.*)=(.*)$/))c.variables[h[1]]=h[2];else{var j=null;try{j=e._parseEntry("0 "+i),c.expressions.push(j.interval)}catch(a){c.errors[i]=a}}}return c},e.parseFile=function(b,c){a.r(522734).readFile(b,function(a,b){return a?void c(a):c(null,e.parseString(b.toString()))})},b.exports=e},748064,(a,b,c)=>{let{EventEmitter:d}=a.r(427699);class AbortSignal{constructor(){this.eventEmitter=new d,this.onabort=null,this.aborted=!1,this.reason=void 0}toString(){return"[object AbortSignal]"}get[Symbol.toStringTag](){return"AbortSignal"}removeEventListener(a,b){this.eventEmitter.removeListener(a,b)}addEventListener(a,b){this.eventEmitter.on(a,b)}dispatchEvent(a){let b={type:a,target:this},c=`on${a}`;"function"==typeof this[c]&&this[c](b),this.eventEmitter.emit(a,b)}throwIfAborted(){if(this.aborted)throw this.reason}static abort(a){let b=new e;return b.abort(),b.signal}static timeout(a){let b=new e;return setTimeout(()=>b.abort(Error("TimeoutError")),a),b.signal}}class e{constructor(){this.signal=new AbortSignal}abort(a){this.signal.aborted||(this.signal.aborted=!0,a?this.signal.reason=a:this.signal.reason=Error("AbortError"),this.signal.dispatchEvent("abort"))}toString(){return"[object AbortController]"}get[Symbol.toStringTag](){return"AbortController"}}b.exports={AbortController:e,AbortSignal}},365976,a=>{"use strict";a.s(["HydrationBoundary",()=>b]);let b=(0,a.i(324998).registerClientReference)(function(){throw Error("Attempted to call HydrationBoundary() from the server but HydrationBoundary is on the client. It's not possible to invoke a client function from the server, it can only be rendered as a Component or passed to props of a Client Component.")},"[project]/node_modules/.pnpm/@tanstack+react-query@5.90.16_react@19.2.3/node_modules/@tanstack/react-query/build/modern/HydrationBoundary.js <module evaluation>","HydrationBoundary")},646492,a=>{"use strict";a.s(["HydrationBoundary",()=>b]);let b=(0,a.i(324998).registerClientReference)(function(){throw Error("Attempted to call HydrationBoundary() from the server but HydrationBoundary is on the client. It's not possible to invoke a client function from the server, it can only be rendered as a Component or passed to props of a Client Component.")},"[project]/node_modules/.pnpm/@tanstack+react-query@5.90.16_react@19.2.3/node_modules/@tanstack/react-query/build/modern/HydrationBoundary.js","HydrationBoundary")},316974,a=>{"use strict";a.i(365976);var b=a.i(646492);a.n(b)},124090,687261,a=>{"use strict";let b,c,d,e,f,g,h,i,j,k,l,m,n,o,p,q,r,s,t,u,v;var w,x,y,z,A,B,C,D,E,F,G,H,I,J,K,L,M,N,O,P,Q,R,S,T,U,V,W,X,Y,Z,$,_,aa,ab,ac,ad,ae,af,ag,ah,ai=a.i(398204);a.i(76515);var aj=a.i(514975);class ak{constructor(){this.keyToValue=new Map,this.valueToKey=new Map}set(a,b){this.keyToValue.set(a,b),this.valueToKey.set(b,a)}getByKey(a){return this.keyToValue.get(a)}getByValue(a){return this.valueToKey.get(a)}clear(){this.keyToValue.clear(),this.valueToKey.clear()}}class al{constructor(a){this.generateIdentifier=a,this.kv=new ak}register(a,b){this.kv.getByValue(a)||(b||(b=this.generateIdentifier(a)),this.kv.set(b,a))}clear(){this.kv.clear()}getIdentifier(a){return this.kv.getByValue(a)}getValue(a){return this.kv.getByKey(a)}}class am extends al{constructor(){super(a=>a.name),this.classToAllowedProps=new Map}register(a,b){"object"==typeof b?(b.allowProps&&this.classToAllowedProps.set(a,b.allowProps),super.register(a,b.identifier)):super.register(a,b)}getAllowedProps(a){return this.classToAllowedProps.get(a)}}function an(a,b){Object.entries(a).forEach(([a,c])=>b(c,a))}function ao(a,b){return -1!==a.indexOf(b)}function ap(a,b){for(let c=0;c<a.length;c++){let d=a[c];if(b(d))return d}}class aq{constructor(){this.transfomers={}}register(a){this.transfomers[a.name]=a}findApplicable(a){return function(a,b){let c=function(a){if("values"in Object)return Object.values(a);let b=[];for(let c in a)a.hasOwnProperty(c)&&b.push(a[c]);return b}(a);if("find"in c)return c.find(b);for(let a=0;a<c.length;a++){let d=c[a];if(b(d))return d}}(this.transfomers,b=>b.isApplicable(a))}findByName(a){return this.transfomers[a]}}let ar=a=>void 0===a,as=a=>"object"==typeof a&&null!==a&&a!==Object.prototype&&(null===Object.getPrototypeOf(a)||Object.getPrototypeOf(a)===Object.prototype),at=a=>as(a)&&0===Object.keys(a).length,au=a=>Array.isArray(a),av=a=>a instanceof Map,aw=a=>a instanceof Set,ax=a=>"Symbol"===Object.prototype.toString.call(a).slice(8,-1),ay=a=>a instanceof Error,az=a=>"number"==typeof a&&isNaN(a),aA=a=>a.replace(/\\/g,"\\\\").replace(/\./g,"\\."),aB=a=>a.map(String).map(aA).join("."),aC=(a,b)=>{let c=[],d="";for(let e=0;e<a.length;e++){let f=a.charAt(e);if(!b&&"\\"===f){let b=a.charAt(e+1);if("\\"===b){d+="\\",e++;continue}if("."!==b)throw Error("invalid path")}if("\\"===f&&"."===a.charAt(e+1)){d+=".",e++;continue}if("."===f){c.push(d),d="";continue}d+=f}let e=d;return c.push(e),c};function aD(a,b,c,d){return{isApplicable:a,annotation:b,transform:c,untransform:d}}let aE=[aD(ar,"undefined",()=>null,()=>void 0),aD(a=>"bigint"==typeof a,"bigint",a=>a.toString(),a=>"undefined"!=typeof BigInt?BigInt(a):(console.error("Please add a BigInt polyfill."),a)),aD(a=>a instanceof Date&&!isNaN(a.valueOf()),"Date",a=>a.toISOString(),a=>new Date(a)),aD(ay,"Error",(a,b)=>{let c={name:a.name,message:a.message};return"cause"in a&&(c.cause=a.cause),b.allowedErrorProps.forEach(b=>{c[b]=a[b]}),c},(a,b)=>{let c=Error(a.message,{cause:a.cause});return c.name=a.name,c.stack=a.stack,b.allowedErrorProps.forEach(b=>{c[b]=a[b]}),c}),aD(a=>a instanceof RegExp,"regexp",a=>""+a,a=>new RegExp(a.slice(1,a.lastIndexOf("/")),a.slice(a.lastIndexOf("/")+1))),aD(aw,"set",a=>[...a.values()],a=>new Set(a)),aD(av,"map",a=>[...a.entries()],a=>new Map(a)),aD(a=>az(a)||a===1/0||a===-1/0,"number",a=>az(a)?"NaN":a>0?"Infinity":"-Infinity",Number),aD(a=>0===a&&1/a==-1/0,"number",()=>"-0",Number),aD(a=>a instanceof URL,"URL",a=>a.toString(),a=>new URL(a))];function aF(a,b,c,d){return{isApplicable:a,annotation:b,transform:c,untransform:d}}let aG=aF((a,b)=>!!ax(a)&&!!b.symbolRegistry.getIdentifier(a),(a,b)=>["symbol",b.symbolRegistry.getIdentifier(a)],a=>a.description,(a,b,c)=>{let d=c.symbolRegistry.getValue(b[1]);if(!d)throw Error("Trying to deserialize unknown symbol");return d}),aH=[Int8Array,Uint8Array,Int16Array,Uint16Array,Int32Array,Uint32Array,Float32Array,Float64Array,Uint8ClampedArray].reduce((a,b)=>(a[b.name]=b,a),{}),aI=aF(a=>ArrayBuffer.isView(a)&&!(a instanceof DataView),a=>["typed-array",a.constructor.name],a=>[...a],(a,b)=>{let c=aH[b[1]];if(!c)throw Error("Trying to deserialize unknown typed array");return new c(a)});function aJ(a,b){return!!a?.constructor&&!!b.classRegistry.getIdentifier(a.constructor)}let aK=aF(aJ,(a,b)=>["class",b.classRegistry.getIdentifier(a.constructor)],(a,b)=>{let c=b.classRegistry.getAllowedProps(a.constructor);if(!c)return{...a};let d={};return c.forEach(b=>{d[b]=a[b]}),d},(a,b,c)=>{let d=c.classRegistry.getValue(b[1]);if(!d)throw Error(`Trying to deserialize unknown class '${b[1]}' - check https://github.com/blitz-js/superjson/issues/116#issuecomment-773996564`);return Object.assign(Object.create(d.prototype),a)}),aL=aF((a,b)=>!!b.customTransformerRegistry.findApplicable(a),(a,b)=>["custom",b.customTransformerRegistry.findApplicable(a).name],(a,b)=>b.customTransformerRegistry.findApplicable(a).serialize(a),(a,b,c)=>{let d=c.customTransformerRegistry.findByName(b[1]);if(!d)throw Error("Trying to deserialize unknown custom value");return d.deserialize(a)}),aM=[aK,aG,aL,aI],aN=(a,b)=>{let c=ap(aM,c=>c.isApplicable(a,b));if(c)return{value:c.transform(a,b),type:c.annotation(a,b)};let d=ap(aE,c=>c.isApplicable(a,b));if(d)return{value:d.transform(a,b),type:d.annotation}},aO={};aE.forEach(a=>{aO[a.annotation]=a});let aP=(a,b)=>{if(b>a.size)throw Error("index out of bounds");let c=a.keys();for(;b>0;)c.next(),b--;return c.next().value};function aQ(a){if(ao(a,"__proto__"))throw Error("__proto__ is not allowed as a property");if(ao(a,"prototype"))throw Error("prototype is not allowed as a property");if(ao(a,"constructor"))throw Error("constructor is not allowed as a property")}let aR=(a,b,c)=>{if(aQ(b),0===b.length)return c(a);let d=a;for(let a=0;a<b.length-1;a++){let c=b[a];if(au(d))d=d[+c];else if(as(d))d=d[c];else if(aw(d))d=aP(d,+c);else if(av(d)){if(a===b.length-2)break;let e=+c,f=0==+b[++a]?"key":"value",g=aP(d,e);switch(f){case"key":d=g;break;case"value":d=d.get(g)}}}let e=b[b.length-1];if(au(d)?d[+e]=c(d[+e]):as(d)&&(d[e]=c(d[e])),aw(d)){let a=aP(d,+e),b=c(a);a!==b&&(d.delete(a),d.add(b))}if(av(d)){let a=aP(d,+b[b.length-2]);switch(0==+e?"key":"value"){case"key":{let b=c(a);d.set(b,d.get(a)),b!==a&&d.delete(a);break}case"value":d.set(a,c(d.get(a)))}}return a},aS=(a,b,c,d,e=[],f=[],g=new Map)=>{let h=(a=>"boolean"==typeof a||null===a||ar(a)||"number"==typeof a&&!isNaN(a)||"string"==typeof a||ax(a))(a);if(!h){let c;(c=b.get(a))?c.push(e):b.set(a,[e]);let f=g.get(a);if(f)return d?{transformedValue:null}:f}if(!(as(a)||au(a)||av(a)||aw(a)||ay(a)||aJ(a,c))){let b=aN(a,c),d=b?{transformedValue:b.value,annotations:[b.type]}:{transformedValue:a};return h||g.set(a,d),d}if(ao(f,a))return{transformedValue:null};let i=aN(a,c),j=i?.value??a,k=au(j)?[]:{},l={};an(j,(h,i)=>{if("__proto__"===i||"constructor"===i||"prototype"===i)throw Error(`Detected property ${i}. This is a prototype pollution risk, please remove it from your object.`);let j=aS(h,b,c,d,[...e,i],[...f,a],g);k[i]=j.transformedValue,au(j.annotations)?l[aA(i)]=j.annotations:as(j.annotations)&&an(j.annotations,(a,b)=>{l[aA(i)+"."+b]=a})});let m=at(l)?{transformedValue:k,annotations:i?[i.type]:void 0}:{transformedValue:k,annotations:i?[i.type,l]:l};return h||g.set(a,m),m};function aT(a){return Object.prototype.toString.call(a).slice(8,-1)}function aU(a){return"Array"===aT(a)}class aV{constructor({dedupe:a=!1}={}){this.classRegistry=new am,this.symbolRegistry=new al(a=>a.description??""),this.customTransformerRegistry=new aq,this.allowedErrorProps=[],this.dedupe=a}serialize(a){var b;let c,d,e=new Map,f=aS(a,e,this,this.dedupe),g={json:f.transformedValue};f.annotations&&(g.meta={...g.meta,values:f.annotations});let h=(b=this.dedupe,c={},(e.forEach(a=>{if(a.length<=1)return;b||(a=a.map(a=>a.map(String)).sort((a,b)=>a.length-b.length));let[e,...f]=a;0===e.length?d=f.map(aB):c[aB(e)]=f.map(aB)}),d)?at(c)?[d]:[d,c]:at(c)?void 0:c);return h&&(g.meta={...g.meta,referentialEqualities:h}),g.meta&&(g.meta.v=1),g}deserialize(a,b){var c,d,e,f;let{json:g,meta:h}=a,i=b?.inPlace?g:function a(b,c={}){return aU(b)?b.map(b=>a(b,c)):!function(a){if("Object"!==aT(a))return!1;let b=Object.getPrototypeOf(a);return!!b&&b.constructor===Object&&b===Object.prototype}(b)?b:[...Object.getOwnPropertyNames(b),...Object.getOwnPropertySymbols(b)].reduce((d,e)=>{var f;let g;if("__proto__"===e||aU(c.props)&&!c.props.includes(e))return d;let h=a(b[e],c);return f=c.nonenumerable,"enumerable"==(g=({}).propertyIsEnumerable.call(b,e)?"enumerable":"nonenumerable")&&(d[e]=h),f&&"nonenumerable"===g&&Object.defineProperty(d,e,{value:h,enumerable:!1,writable:!0,configurable:!0}),d},{})}(g);return h?.values&&(c=i,d=h.values,e=h.v??0,f=this,function a(b,c,d,e=[]){if(!b)return;let f=d<1;if(!au(b))return void an(b,(b,g)=>a(b,c,d,[...e,...aC(g,f)]));let[g,h]=b;h&&an(h,(b,g)=>{a(b,c,d,[...e,...aC(g,f)])}),c(g,e)}(d,(a,b)=>{c=aR(c,b,b=>((a,b,c)=>{if(au(b))switch(b[0]){case"symbol":return aG.untransform(a,b,c);case"class":return aK.untransform(a,b,c);case"custom":return aL.untransform(a,b,c);case"typed-array":return aI.untransform(a,b,c);default:throw Error("Unknown transformation: "+b)}{let d=aO[b];if(!d)throw Error("Unknown transformation: "+b);return d.untransform(a,c)}})(b,a,f))},e),i=c),h?.referentialEqualities&&(i=function(a,b,c){let d=c<1;function e(b,c){let e=((a,b)=>{aQ(b);for(let c=0;c<b.length;c++){let d=b[c];if(aw(a))a=aP(a,+d);else if(av(a)){let e=+d,f=0==+b[++c]?"key":"value",g=aP(a,e);switch(f){case"key":a=g;break;case"value":a=a.get(g)}}else a=a[d]}return a})(a,aC(c,d));b.map(a=>aC(a,d)).forEach(b=>{a=aR(a,b,()=>e)})}if(au(b)){let[c,f]=b;c.forEach(b=>{a=aR(a,aC(b,d),()=>a)}),f&&an(f,e)}else an(b,e);return a}(i,h.referentialEqualities,h.v??0)),i}stringify(a){return JSON.stringify(this.serialize(a))}parse(a){return this.deserialize(JSON.parse(a),{inPlace:!0})}registerClass(a,b){this.classRegistry.register(a,b)}registerSymbol(a,b){this.symbolRegistry.register(a,b)}registerCustom(a,b){this.customTransformerRegistry.register({name:b,...a})}allowErrorProps(...a){this.allowedErrorProps.push(...a)}}aV.defaultInstance=new aV,aV.serialize=aV.defaultInstance.serialize.bind(aV.defaultInstance),aV.deserialize=aV.defaultInstance.deserialize.bind(aV.defaultInstance),aV.stringify=aV.defaultInstance.stringify.bind(aV.defaultInstance),aV.parse=aV.defaultInstance.parse.bind(aV.defaultInstance),aV.registerClass=aV.defaultInstance.registerClass.bind(aV.defaultInstance),aV.registerSymbol=aV.defaultInstance.registerSymbol.bind(aV.defaultInstance),aV.registerCustom=aV.defaultInstance.registerCustom.bind(aV.defaultInstance),aV.allowErrorProps=aV.defaultInstance.allowErrorProps.bind(aV.defaultInstance),aV.serialize,aV.deserialize,aV.stringify,aV.parse,aV.registerClass,aV.registerCustom,aV.registerSymbol,aV.allowErrorProps;var aW=a.i(791299);function aX(a,...b){let c=Object.assign(a$(),a);for(let a of b)for(let b in a){if(b in c&&c[b]!==a[b])throw Error(`Duplicate key ${b}`);c[b]=a[b]}return c}function aY(a){return!!a&&!Array.isArray(a)&&"object"==typeof a}function aZ(a){return"function"==typeof a}function a$(){return Object.create(null)}let a_="function"==typeof Symbol&&!!Symbol.asyncIterator;var a0=Object.create,a1=Object.defineProperty,a2=Object.getOwnPropertyDescriptor,a3=Object.getOwnPropertyNames,a4=Object.getPrototypeOf,a5=Object.prototype.hasOwnProperty,a6=(a,b)=>function(){return b||(0,a[a3(a)[0]])((b={exports:{}}).exports,b),b.exports},a7=(a,b,c)=>(c=null!=a?a0(a4(a)):{},((a,b,c,d)=>{if(b&&"object"==typeof b||"function"==typeof b)for(var e,f=a3(b),g=0,h=f.length;g<h;g++)e=f[g],a5.call(a,e)||e===c||a1(a,e,{get:(a=>b[a]).bind(null,e),enumerable:!(d=a2(b,e))||d.enumerable});return a})(!b&&a&&a.__esModule?c:a1(c,"default",{value:a,enumerable:!0}),a));let a8=()=>{},a9=a=>{Object.freeze&&Object.freeze(a)},ba=a=>(function a(b,c,d){let e=c.join(".");return null!=d[e]||(d[e]=new Proxy(a8,{get(e,f){if("string"==typeof f&&"then"!==f)return a(b,[...c,f],d)},apply(a,d,e){let f=c[c.length-1],g={args:e,path:c};return"call"===f?g={args:e.length>=2?[e[1]]:[],path:c.slice(0,-1)}:"apply"===f&&(g={args:e.length>=2?e[1]:[],path:c.slice(0,-1)}),a9(g.args),a9(g.path),b(g)}})),d[e]})(a,[],a$());var bb=a6({"../../node_modules/.pnpm/@oxc-project+runtime@0.72.2/node_modules/@oxc-project/runtime/src/helpers/typeof.js"(a,b){function c(a){return b.exports=c="function"==typeof Symbol&&"symbol"==typeof Symbol.iterator?function(a){return typeof a}:function(a){return a&&"function"==typeof Symbol&&a.constructor===Symbol&&a!==Symbol.prototype?"symbol":typeof a},b.exports.__esModule=!0,b.exports.default=b.exports,c(a)}b.exports=c,b.exports.__esModule=!0,b.exports.default=b.exports}}),bc=a6({"../../node_modules/.pnpm/@oxc-project+runtime@0.72.2/node_modules/@oxc-project/runtime/src/helpers/toPrimitive.js"(a,b){var c=bb().default;b.exports=function(a,b){if("object"!=c(a)||!a)return a;var d=a[Symbol.toPrimitive];if(void 0!==d){var e=d.call(a,b||"default");if("object"!=c(e))return e;throw TypeError("@@toPrimitive must return a primitive value.")}return("string"===b?String:Number)(a)},b.exports.__esModule=!0,b.exports.default=b.exports}}),bd=a6({"../../node_modules/.pnpm/@oxc-project+runtime@0.72.2/node_modules/@oxc-project/runtime/src/helpers/toPropertyKey.js"(a,b){var c=bb().default,d=bc();b.exports=function(a){var b=d(a,"string");return"symbol"==c(b)?b:b+""},b.exports.__esModule=!0,b.exports.default=b.exports}}),be=a6({"../../node_modules/.pnpm/@oxc-project+runtime@0.72.2/node_modules/@oxc-project/runtime/src/helpers/defineProperty.js"(a,b){var c=bd();b.exports=function(a,b,d){return(b=c(b))in a?Object.defineProperty(a,b,{value:d,enumerable:!0,configurable:!0,writable:!0}):a[b]=d,a},b.exports.__esModule=!0,b.exports.default=b.exports}}),bf=a6({"../../node_modules/.pnpm/@oxc-project+runtime@0.72.2/node_modules/@oxc-project/runtime/src/helpers/objectSpread2.js"(a,b){var c=be();function d(a,b){var c=Object.keys(a);if(Object.getOwnPropertySymbols){var d=Object.getOwnPropertySymbols(a);b&&(d=d.filter(function(b){return Object.getOwnPropertyDescriptor(a,b).enumerable})),c.push.apply(c,d)}return c}b.exports=function(a){for(var b=1;b<arguments.length;b++){var e=null!=arguments[b]?arguments[b]:{};b%2?d(Object(e),!0).forEach(function(b){c(a,b,e[b])}):Object.getOwnPropertyDescriptors?Object.defineProperties(a,Object.getOwnPropertyDescriptors(e)):d(Object(e)).forEach(function(b){Object.defineProperty(a,b,Object.getOwnPropertyDescriptor(e,b))})}return a},b.exports.__esModule=!0,b.exports.default=b.exports}});a7(bf(),1);let bg=({shape:a})=>a;var bh=a7(be(),1),bi=class extends Error{};function bj(a){if(a instanceof bk||a instanceof Error&&"TRPCError"===a.name)return a;let b=new bk({code:"INTERNAL_SERVER_ERROR",cause:a});return a instanceof Error&&a.stack&&(b.stack=a.stack),b}var bk=class extends Error{constructor(a){var b,c;const d=function(a){if(a instanceof Error)return a;let b=typeof a;if("undefined"!==b&&"function"!==b&&null!==a){if("object"!==b)return Error(String(a));if(aY(a))return Object.assign(new bi,a)}}(a.cause);super(null!=(b=null!=(c=a.message)?c:null==d?void 0:d.message)?b:a.code,{cause:d}),(0,bh.default)(this,"cause",void 0),(0,bh.default)(this,"code",void 0),this.code=a.code,this.name="TRPCError",null!=this.cause||(this.cause=d)}};a7(bf(),1);let bl={input:{serialize:a=>a,deserialize:a=>a},output:{serialize:a=>a,deserialize:a=>a}};var bm=a7(bf(),1);let bn={_ctx:null,_errorShape:null,_meta:null,queries:{},mutations:{},subscriptions:{},errorFormatter:bg,transformer:bl},bo=["then","call","apply"];function bp(a){return function(b){let c=new Set(Object.keys(b).filter(a=>bo.includes(a)));if(c.size>0)throw Error("Reserved words used in `router({})` call: "+Array.from(c).join(", "));let d=a$(),e=a$(),f=function a(b,c=[]){let f=a$();for(let[g,h]of Object.entries(null!=b?b:{})){if("function"==typeof h&&"lazyMarker"in h){e[[...c,g].join(".")]=function b(c){var d;let f,g;return{ref:c.ref,load:(d=async()=>{let d=await c.ref(),f=[...c.path,c.key],g=f.join(".");for(let[h,i]of(c.aggregate[c.key]=a(d._def.record,f),delete e[g],Object.entries(d._def.lazy)))e[[...f,h].join(".")]=b({ref:i.ref,path:f,key:h,aggregate:c.aggregate[c.key]})},g=f=Symbol(),()=>(g===f&&(g=d()),g))}}({path:c,ref:h,key:g,aggregate:f});continue}if(aY(h)&&aY(h._def)&&"router"in h._def){f[g]=a(h._def.record,[...c,g]);continue}if(!bq(h)){f[g]=a(h,[...c,g]);continue}let b=[...c,g].join(".");if(d[b])throw Error(`Duplicate key: ${b}`);d[b]=h,f[g]=h}return f}(b),g=(0,bm.default)((0,bm.default)({_config:a,router:!0,procedures:d,lazy:e},bn),{},{record:f});return(0,bm.default)((0,bm.default)({},f),{},{_def:g,createCaller:bt()({_def:g})})}}function bq(a){return"function"==typeof a}async function br(a,b){let{_def:c}=a,d=c.procedures[b];for(;!d;){let a=Object.keys(c.lazy).find(a=>b.startsWith(a));if(!a)return null;let e=c.lazy[a];await e.load(),d=c.procedures[b]}return d}async function bs(a){let{type:b,path:c}=a,d=await br(a.router,c);if(!d||!bq(d)||d._def.type!==b&&!a.allowMethodOverride)throw new bk({code:"NOT_FOUND",message:`No "${b}"-procedure on path "${c}"`});if(d._def.type!==b&&a.allowMethodOverride&&"subscription"===d._def.type)throw new bk({code:"METHOD_NOT_SUPPORTED",message:"Method override is not supported for subscriptions"});return d(a)}function bt(){return function(a){let{_def:b}=a;return function(c,d){return ba(async e=>{let f,{path:g,args:h}=e,i=g.join(".");if(1===g.length&&"_def"===g[0])return b;let j=await br(a,i);try{if(!j)throw new bk({code:"NOT_FOUND",message:`No procedure found on path "${g}"`});return f=aZ(c)?await Promise.resolve(c()):c,await j({path:i,getRawInput:async()=>h[0],ctx:f,type:j._def.type,signal:null==d?void 0:d.signal})}catch(a){var k,l;throw null==d||null==(k=d.onError)||k.call(d,{ctx:f,error:bj(a),input:h[0],path:i,type:null!=(l=null==j?void 0:j._def.type)?l:"unknown"}),a}})}}}function bu(...a){var b,c;let d=aX({},...a.map(a=>a._def.record));return bp({errorFormatter:a.reduce((a,b)=>{if(b._def._config.errorFormatter&&b._def._config.errorFormatter!==bg){if(a!==bg&&a!==b._def._config.errorFormatter)throw Error("You seem to have several error formatters");return b._def._config.errorFormatter}return a},bg),transformer:a.reduce((a,b)=>{if(b._def._config.transformer&&b._def._config.transformer!==bl){if(a!==bl&&a!==b._def._config.transformer)throw Error("You seem to have several transformers");return b._def._config.transformer}return a},bl),isDev:a.every(a=>a._def._config.isDev),allowOutsideOfServer:a.every(a=>a._def._config.allowOutsideOfServer),isServer:a.every(a=>a._def._config.isServer),$types:null==(b=a[0])?void 0:b._def._config.$types,sse:null==(c=a[0])?void 0:c._def._config.sse})(d)}Symbol();var bv=a7(bf(),1);let bw="middlewareMarker";var bx=a7(be(),1),by=class extends Error{constructor(a){var b;super(null==(b=a[0])?void 0:b.message),(0,bx.default)(this,"issues",void 0),this.name="SchemaError",this.issues=a}};function bz(a){let b="~standard"in a;if("function"==typeof a&&"function"==typeof a.assert)return a.assert.bind(a);if("function"==typeof a&&!b)return a;if("function"==typeof a.parseAsync)return a.parseAsync.bind(a);if("function"==typeof a.parse)return a.parse.bind(a);if("function"==typeof a.validateSync)return a.validateSync.bind(a);if("function"==typeof a.create)return a.create.bind(a);if("function"==typeof a.assert)return b=>(a.assert(b),b);if(b)return async b=>{let c=await a["~standard"].validate(b);if(c.issues)throw new by(c.issues);return c.value};throw Error("Could not find a validator fn")}var bA=a6({"../../node_modules/.pnpm/@oxc-project+runtime@0.72.2/node_modules/@oxc-project/runtime/src/helpers/objectWithoutPropertiesLoose.js"(a,b){b.exports=function(a,b){if(null==a)return{};var c={};for(var d in a)if(({}).hasOwnProperty.call(a,d)){if(b.includes(d))continue;c[d]=a[d]}return c},b.exports.__esModule=!0,b.exports.default=b.exports}}),bB=a7(a6({"../../node_modules/.pnpm/@oxc-project+runtime@0.72.2/node_modules/@oxc-project/runtime/src/helpers/objectWithoutProperties.js"(a,b){var c=bA();b.exports=function(a,b){if(null==a)return{};var d,e,f=c(a,b);if(Object.getOwnPropertySymbols){var g=Object.getOwnPropertySymbols(a);for(e=0;e<g.length;e++)d=g[e],b.includes(d)||({}).propertyIsEnumerable.call(a,d)&&(f[d]=a[d])}return f},b.exports.__esModule=!0,b.exports.default=b.exports}})(),1),bC=a7(bf(),1);let bD=["middlewares","inputs","meta"];function bE(a,b){let{middlewares:c=[],inputs:d,meta:e}=b,f=(0,bB.default)(b,bD);return bF((0,bC.default)((0,bC.default)({},aX(a,f)),{},{inputs:[...a.inputs,...null!=d?d:[]],middlewares:[...a.middlewares,...c],meta:a.meta&&e?(0,bC.default)((0,bC.default)({},a.meta),e):null!=e?e:a.meta}))}function bF(a={}){let b=(0,bC.default)({procedure:!0,inputs:[],middlewares:[]},a);return{_def:b,input(a){let c,d=bz(a);return bE(b,{inputs:[a],middlewares:[((c=async function(a){let b,c=await a.getRawInput();try{b=await d(c)}catch(a){throw new bk({code:"BAD_REQUEST",cause:a})}let e=aY(a.input)&&aY(b)?(0,bv.default)((0,bv.default)({},a.input),b):b;return a.next({input:e})})._type="input",c)]})},output(a){let c,d=bz(a);return bE(b,{output:a,middlewares:[((c=async function({next:a}){let b=await a();if(!b.ok)return b;try{let a=await d(b.data);return(0,bv.default)((0,bv.default)({},b),{},{data:a})}catch(a){throw new bk({message:"Output validation failed",code:"INTERNAL_SERVER_ERROR",cause:a})}})._type="output",c)]})},meta:a=>bE(b,{meta:a}),use:a=>bE(b,{middlewares:"_middlewares"in a?a._middlewares:[a]}),unstable_concat:a=>bE(b,a._def),concat:a=>bE(b,a._def),query:a=>bG((0,bC.default)((0,bC.default)({},b),{},{type:"query"}),a),mutation:a=>bG((0,bC.default)((0,bC.default)({},b),{},{type:"mutation"}),a),subscription:a=>bG((0,bC.default)((0,bC.default)({},b),{},{type:"subscription"}),a),experimental_caller:a=>bE(b,{caller:a})}}function bG(a,b){let c=bE(a,{resolver:b,middlewares:[async function(a){return{marker:bw,ok:!0,data:await b(a),ctx:a.ctx}}]}),d=(0,bC.default)((0,bC.default)({},c._def),{},{type:a.type,experimental_caller:!!c._def.caller,meta:c._def.meta,$types:null}),e=function(a){async function b(b){if(!b||!("getRawInput"in b))throw Error(bH);let c=await bI(0,a,b);if(!c)throw new bk({code:"INTERNAL_SERVER_ERROR",message:"No result from middlewares - did you forget to `return next()`?"});if(!c.ok)throw c.error;return c.data}return b._def=a,b.procedure=!0,b.meta=a.meta,b}(c._def),f=c._def.caller;if(!f)return e;let g=async(...a)=>await f({args:a,invoke:e,_def:d});return g._def=d,g}let bH=`
This is a client-only function.
If you want to call this function on the server, see https://trpc.io/docs/v11/server/server-side-calls
`.trim();async function bI(a,b,c){try{let d=b.middlewares[a];return await d((0,bC.default)((0,bC.default)({},c),{},{meta:b.meta,input:c.input,next(d){var e;return bI(a+1,b,(0,bC.default)((0,bC.default)({},c),{},{ctx:(null==d?void 0:d.ctx)?(0,bC.default)((0,bC.default)({},c.ctx),d.ctx):c.ctx,input:d&&"input"in d?d.input:c.input,getRawInput:null!=(e=null==d?void 0:d.getRawInput)?e:c.getRawInput}))}}))}catch(a){return{ok:!1,error:bj(a),marker:bw}}}var bJ=a7(bf(),1);let bK=new class a{context(){return new a}meta(){return new a}create(a){var b,c,d,e,f,g,h,i;let j=(0,bJ.default)((0,bJ.default)({},a),{},{transformer:"input"in(i=null!=(b=null==a?void 0:a.transformer)?b:bl)?i:{input:i,output:i},isDev:null!=(c=null==a?void 0:a.isDev)?c:(null==(d=globalThis.process)?void 0:d.env.NODE_ENV)!=="production",allowOutsideOfServer:null!=(e=null==a?void 0:a.allowOutsideOfServer)&&e,errorFormatter:null!=(f=null==a?void 0:a.errorFormatter)?f:bg,isServer:null==(g=null==a?void 0:a.isServer)||g,$types:null});if(!(null==(h=null==a?void 0:a.isServer)||h)&&(null==a?void 0:a.allowOutsideOfServer)!==!0)throw Error("You're trying to use @trpc/server in a non-server environment. This is not supported by default.");return{_config:j,procedure:bF({meta:null==a?void 0:a.defaultMeta}),middleware:function(a){return function a(b){return{_middlewares:b,unstable_pipe:c=>a([...b,..."_middlewares"in c?c._middlewares:[c]])}}([a])},router:bp(j),mergeRouters:bu,createCallerFactory:bt()}}};a.i(574581);var bL=a.i(71419),bM=a.i(983602);let bN=(0,aj.cache)(async()=>{await (0,bL.connectToDatabase)();let a=new Headers(await (0,aW.headers)()),b=await bM.auth.api.getSession({headers:a});return{session:b?.session,user:b?.user}}),bO=bK.context().create({transformer:aV}),bP=bO.router;bO.createCallerFactory;let bQ=bO.procedure,bR=bQ.use(async({ctx:a,next:b})=>{if(!a.session||!a.user)throw new bk({code:"UNAUTHORIZED",message:"You must be logged in to access this resource"});return b({ctx:{...a,session:a.session,user:a.user}})}),bS=Object.freeze({status:"aborted"});function bT(a,b,c){function d(c,d){if(c._zod||Object.defineProperty(c,"_zod",{value:{def:d,constr:g,traits:new Set},enumerable:!1}),c._zod.traits.has(a))return;c._zod.traits.add(a),b(c,d);let e=g.prototype,f=Object.keys(e);for(let a=0;a<f.length;a++){let b=f[a];b in c||(c[b]=e[b].bind(c))}}let e=c?.Parent??Object;class f extends e{}function g(a){var b;let e=c?.Parent?new f:this;for(let c of(d(e,a),(b=e._zod).deferred??(b.deferred=[]),e._zod.deferred))c();return e}return Object.defineProperty(f,"name",{value:a}),Object.defineProperty(g,"init",{value:d}),Object.defineProperty(g,Symbol.hasInstance,{value:b=>!!c?.Parent&&b instanceof c.Parent||b?._zod?.traits?.has(a)}),Object.defineProperty(g,"name",{value:a}),g}let bU=Symbol("zod_brand");class bV extends Error{constructor(){super("Encountered Promise during synchronous parse. Use .parseAsync() instead.")}}class bW extends Error{constructor(a){super(`Encountered unidirectional transform during encode: ${a}`),this.name="ZodEncodeError"}}let bX={};function bY(a){return a&&Object.assign(bX,a),bX}function bZ(a){return a}function b$(a){return a}function b_(a){}function b0(a){throw Error("Unexpected value in exhaustive check")}function b1(a){}function b2(a){let b=Object.values(a).filter(a=>"number"==typeof a);return Object.entries(a).filter(([a,c])=>-1===b.indexOf(+a)).map(([a,b])=>b)}function b3(a,b="|"){return a.map(a=>cw(a)).join(b)}function b4(a,b){return"bigint"==typeof b?b.toString():b}function b5(a){return{get value(){{let b=a();return Object.defineProperty(this,"value",{value:b}),b}}}}function b6(a){return null==a}function b7(a){let b=+!!a.startsWith("^"),c=a.endsWith("$")?a.length-1:a.length;return a.slice(b,c)}function b8(a,b){let c=(a.toString().split(".")[1]||"").length,d=b.toString(),e=(d.split(".")[1]||"").length;if(0===e&&/\d?e-\d?/.test(d)){let a=d.match(/\d?e-(\d?)/);a?.[1]&&(e=Number.parseInt(a[1]))}let f=c>e?c:e;return Number.parseInt(a.toFixed(f).replace(".",""))%Number.parseInt(b.toFixed(f).replace(".",""))/10**f}a.s(["$ZodAsyncError",()=>bV,"$ZodEncodeError",()=>bW,"$brand",0,bU,"$constructor",()=>bT,"NEVER",0,bS,"config",()=>bY,"globalConfig",0,bX],937547);let b9=Symbol("evaluating");function ca(a,b,c){let d;Object.defineProperty(a,b,{get(){if(d!==b9)return void 0===d&&(d=b9,d=c()),d},set(c){Object.defineProperty(a,b,{value:c})},configurable:!0})}function cb(a){return Object.create(Object.getPrototypeOf(a),Object.getOwnPropertyDescriptors(a))}function cc(a,b,c){Object.defineProperty(a,b,{value:c,writable:!0,enumerable:!0,configurable:!0})}function cd(...a){let b={};for(let c of a)Object.assign(b,Object.getOwnPropertyDescriptors(c));return Object.defineProperties({},b)}function ce(a){return cd(a._zod.def)}function cf(a,b){return b?b.reduce((a,b)=>a?.[b],a):a}function cg(a){let b=Object.keys(a);return Promise.all(b.map(b=>a[b])).then(a=>{let c={};for(let d=0;d<b.length;d++)c[b[d]]=a[d];return c})}function ch(a=10){let b="abcdefghijklmnopqrstuvwxyz",c="";for(let d=0;d<a;d++)c+=b[Math.floor(Math.random()*b.length)];return c}function ci(a){return JSON.stringify(a)}function cj(a){return a.toLowerCase().trim().replace(/[^\w\s-]/g,"").replace(/[\s_-]+/g,"-").replace(/^-+|-+$/g,"")}let ck="captureStackTrace"in Error?Error.captureStackTrace:(...a)=>{};function cl(a){return"object"==typeof a&&null!==a&&!Array.isArray(a)}let cm=b5(()=>{if("undefined"!=typeof navigator&&navigator?.userAgent?.includes("Cloudflare"))return!1;try{return Function(""),!0}catch(a){return!1}});function cn(a){if(!1===cl(a))return!1;let b=a.constructor;if(void 0===b||"function"!=typeof b)return!0;let c=b.prototype;return!1!==cl(c)&&!1!==Object.prototype.hasOwnProperty.call(c,"isPrototypeOf")}function co(a){return cn(a)?{...a}:Array.isArray(a)?[...a]:a}function cp(a){let b=0;for(let c in a)Object.prototype.hasOwnProperty.call(a,c)&&b++;return b}let cq=new Set(["string","number","symbol"]),cr=new Set(["string","number","bigint","boolean","symbol","undefined"]);function cs(a){return a.replace(/[.*+?^${}()|[\]\\]/g,"\\$&")}function ct(a,b,c){let d=new a._zod.constr(b??a._zod.def);return(!b||c?.parent)&&(d._zod.parent=a),d}function cu(a){if(!a)return{};if("string"==typeof a)return{error:()=>a};if(a?.message!==void 0){if(a?.error!==void 0)throw Error("Cannot specify both `message` and `error` params");a.error=a.message}return(delete a.message,"string"==typeof a.error)?{...a,error:()=>a.error}:a}function cv(a){let b;return new Proxy({},{get:(c,d,e)=>(b??(b=a()),Reflect.get(b,d,e)),set:(c,d,e,f)=>(b??(b=a()),Reflect.set(b,d,e,f)),has:(c,d)=>(b??(b=a()),Reflect.has(b,d)),deleteProperty:(c,d)=>(b??(b=a()),Reflect.deleteProperty(b,d)),ownKeys:c=>(b??(b=a()),Reflect.ownKeys(b)),getOwnPropertyDescriptor:(c,d)=>(b??(b=a()),Reflect.getOwnPropertyDescriptor(b,d)),defineProperty:(c,d,e)=>(b??(b=a()),Reflect.defineProperty(b,d,e))})}function cw(a){return"bigint"==typeof a?a.toString()+"n":"string"==typeof a?`"${a}"`:`${a}`}function cx(a){return Object.keys(a).filter(b=>"optional"===a[b]._zod.optin&&"optional"===a[b]._zod.optout)}let cy={safeint:[Number.MIN_SAFE_INTEGER,Number.MAX_SAFE_INTEGER],int32:[-0x80000000,0x7fffffff],uint32:[0,0xffffffff],float32:[-34028234663852886e22,34028234663852886e22],float64:[-Number.MAX_VALUE,Number.MAX_VALUE]},cz={int64:[BigInt("-9223372036854775808"),BigInt("9223372036854775807")],uint64:[BigInt(0),BigInt("18446744073709551615")]};function cA(a,b){let c=a._zod.def,d=c.checks;if(d&&d.length>0)throw Error(".pick() cannot be used on object schemas containing refinements");let e=cd(a._zod.def,{get shape(){let a={};for(let d in b){if(!(d in c.shape))throw Error(`Unrecognized key: "${d}"`);b[d]&&(a[d]=c.shape[d])}return cc(this,"shape",a),a},checks:[]});return ct(a,e)}function cB(a,b){let c=a._zod.def,d=c.checks;if(d&&d.length>0)throw Error(".omit() cannot be used on object schemas containing refinements");let e=cd(a._zod.def,{get shape(){let d={...a._zod.def.shape};for(let a in b){if(!(a in c.shape))throw Error(`Unrecognized key: "${a}"`);b[a]&&delete d[a]}return cc(this,"shape",d),d},checks:[]});return ct(a,e)}function cC(a,b){if(!cn(b))throw Error("Invalid input to extend: expected a plain object");let c=a._zod.def.checks;if(c&&c.length>0){let c=a._zod.def.shape;for(let a in b)if(void 0!==Object.getOwnPropertyDescriptor(c,a))throw Error("Cannot overwrite keys on object schemas containing refinements. Use `.safeExtend()` instead.")}let d=cd(a._zod.def,{get shape(){let c={...a._zod.def.shape,...b};return cc(this,"shape",c),c}});return ct(a,d)}function cD(a,b){if(!cn(b))throw Error("Invalid input to safeExtend: expected a plain object");let c=cd(a._zod.def,{get shape(){let c={...a._zod.def.shape,...b};return cc(this,"shape",c),c}});return ct(a,c)}function cE(a,b){let c=cd(a._zod.def,{get shape(){let c={...a._zod.def.shape,...b._zod.def.shape};return cc(this,"shape",c),c},get catchall(){return b._zod.def.catchall},checks:[]});return ct(a,c)}function cF(a,b,c){let d=b._zod.def.checks;if(d&&d.length>0)throw Error(".partial() cannot be used on object schemas containing refinements");let e=cd(b._zod.def,{get shape(){let d=b._zod.def.shape,e={...d};if(c)for(let b in c){if(!(b in d))throw Error(`Unrecognized key: "${b}"`);c[b]&&(e[b]=a?new a({type:"optional",innerType:d[b]}):d[b])}else for(let b in d)e[b]=a?new a({type:"optional",innerType:d[b]}):d[b];return cc(this,"shape",e),e},checks:[]});return ct(b,e)}function cG(a,b,c){let d=cd(b._zod.def,{get shape(){let d=b._zod.def.shape,e={...d};if(c)for(let b in c){if(!(b in e))throw Error(`Unrecognized key: "${b}"`);c[b]&&(e[b]=new a({type:"nonoptional",innerType:d[b]}))}else for(let b in d)e[b]=new a({type:"nonoptional",innerType:d[b]});return cc(this,"shape",e),e}});return ct(b,d)}function cH(a,b=0){if(!0===a.aborted)return!0;for(let c=b;c<a.issues.length;c++)if(a.issues[c]?.continue!==!0)return!0;return!1}function cI(a,b){return b.map(b=>(b.path??(b.path=[]),b.path.unshift(a),b))}function cJ(a){return"string"==typeof a?a:a?.message}function cK(a,b,c){let d={...a,path:a.path??[]};return a.message||(d.message=cJ(a.inst?._zod.def?.error?.(a))??cJ(b?.error?.(a))??cJ(c.customError?.(a))??cJ(c.localeError?.(a))??"Invalid input"),delete d.inst,delete d.continue,b?.reportInput||delete d.input,d}function cL(a){return a instanceof Set?"set":a instanceof Map?"map":a instanceof File?"file":"unknown"}function cM(a){return Array.isArray(a)?"array":"string"==typeof a?"string":"unknown"}function cN(a){let b=typeof a;switch(b){case"number":return Number.isNaN(a)?"nan":"number";case"object":if(null===a)return"null";if(Array.isArray(a))return"array";if(a&&Object.getPrototypeOf(a)!==Object.prototype&&"constructor"in a&&a.constructor)return a.constructor.name}return b}function cO(...a){let[b,c,d]=a;return"string"==typeof b?{message:b,code:"custom",input:c,inst:d}:{...b}}function cP(a){return Object.entries(a).filter(([a,b])=>Number.isNaN(Number.parseInt(a,10))).map(a=>a[1])}function cQ(a){let b=atob(a),c=new Uint8Array(b.length);for(let a=0;a<b.length;a++)c[a]=b.charCodeAt(a);return c}function cR(a){let b="";for(let c=0;c<a.length;c++)b+=String.fromCharCode(a[c]);return btoa(b)}function cS(a){let b=a.replace(/-/g,"+").replace(/_/g,"/"),c="=".repeat((4-b.length%4)%4);return cQ(b+c)}function cT(a){return cR(a).replace(/\+/g,"-").replace(/\//g,"_").replace(/=/g,"")}function cU(a){let b=a.replace(/^0x/,"");if(b.length%2!=0)throw Error("Invalid hex string length");let c=new Uint8Array(b.length/2);for(let a=0;a<b.length;a+=2)c[a/2]=Number.parseInt(b.slice(a,a+2),16);return c}function cV(a){return Array.from(a).map(a=>a.toString(16).padStart(2,"0")).join("")}class cW{constructor(...a){}}a.s(["BIGINT_FORMAT_RANGES",0,cz,"Class",()=>cW,"NUMBER_FORMAT_RANGES",0,cy,"aborted",()=>cH,"allowsEval",0,cm,"assert",()=>b1,"assertEqual",()=>bZ,"assertIs",()=>b_,"assertNever",()=>b0,"assertNotEqual",()=>b$,"assignProp",()=>cc,"base64ToUint8Array",()=>cQ,"base64urlToUint8Array",()=>cS,"cached",()=>b5,"captureStackTrace",0,ck,"cleanEnum",()=>cP,"cleanRegex",()=>b7,"clone",()=>ct,"cloneDef",()=>ce,"createTransparentProxy",()=>cv,"defineLazy",()=>ca,"esc",()=>ci,"escapeRegex",()=>cs,"extend",()=>cC,"finalizeIssue",()=>cK,"floatSafeRemainder",()=>b8,"getElementAtPath",()=>cf,"getEnumValues",()=>b2,"getLengthableOrigin",()=>cM,"getParsedType",0,a=>{let b=typeof a;switch(b){case"undefined":return"undefined";case"string":return"string";case"number":return Number.isNaN(a)?"nan":"number";case"boolean":return"boolean";case"function":return"function";case"bigint":return"bigint";case"symbol":return"symbol";case"object":if(Array.isArray(a))return"array";if(null===a)return"null";if(a.then&&"function"==typeof a.then&&a.catch&&"function"==typeof a.catch)return"promise";if("undefined"!=typeof Map&&a instanceof Map)return"map";if("undefined"!=typeof Set&&a instanceof Set)return"set";if("undefined"!=typeof Date&&a instanceof Date)return"date";if("undefined"!=typeof File&&a instanceof File)return"file";return"object";default:throw Error(`Unknown data type: ${b}`)}},"getSizableOrigin",()=>cL,"hexToUint8Array",()=>cU,"isObject",()=>cl,"isPlainObject",()=>cn,"issue",()=>cO,"joinValues",()=>b3,"jsonStringifyReplacer",()=>b4,"merge",()=>cE,"mergeDefs",()=>cd,"normalizeParams",()=>cu,"nullish",()=>b6,"numKeys",()=>cp,"objectClone",()=>cb,"omit",()=>cB,"optionalKeys",()=>cx,"parsedType",()=>cN,"partial",()=>cF,"pick",()=>cA,"prefixIssues",()=>cI,"primitiveTypes",0,cr,"promiseAllObject",()=>cg,"propertyKeyTypes",0,cq,"randomString",()=>ch,"required",()=>cG,"safeExtend",()=>cD,"shallowClone",()=>co,"slugify",()=>cj,"stringifyPrimitive",()=>cw,"uint8ArrayToBase64",()=>cR,"uint8ArrayToBase64url",()=>cT,"uint8ArrayToHex",()=>cV,"unwrapMessage",()=>cJ],691622);let cX=(a,b)=>{a.name="$ZodError",Object.defineProperty(a,"_zod",{value:a._zod,enumerable:!1}),Object.defineProperty(a,"issues",{value:b,enumerable:!1}),a.message=JSON.stringify(b,b4,2),Object.defineProperty(a,"toString",{value:()=>a.message,enumerable:!1})},cY=bT("$ZodError",cX),cZ=bT("$ZodError",cX,{Parent:Error});function c$(a,b=a=>a.message){let c={},d=[];for(let e of a.issues)e.path.length>0?(c[e.path[0]]=c[e.path[0]]||[],c[e.path[0]].push(b(e))):d.push(b(e));return{formErrors:d,fieldErrors:c}}function c_(a,b=a=>a.message){let c={_errors:[]},d=a=>{for(let e of a.issues)if("invalid_union"===e.code&&e.errors.length)e.errors.map(a=>d({issues:a}));else if("invalid_key"===e.code)d({issues:e.issues});else if("invalid_element"===e.code)d({issues:e.issues});else if(0===e.path.length)c._errors.push(b(e));else{let a=c,d=0;for(;d<e.path.length;){let c=e.path[d];d===e.path.length-1?(a[c]=a[c]||{_errors:[]},a[c]._errors.push(b(e))):a[c]=a[c]||{_errors:[]},a=a[c],d++}}};return d(a),c}function c0(a,b=a=>a.message){let c={errors:[]},d=(a,e=[])=>{var f,g;for(let h of a.issues)if("invalid_union"===h.code&&h.errors.length)h.errors.map(a=>d({issues:a},h.path));else if("invalid_key"===h.code)d({issues:h.issues},h.path);else if("invalid_element"===h.code)d({issues:h.issues},h.path);else{let a=[...e,...h.path];if(0===a.length){c.errors.push(b(h));continue}let d=c,i=0;for(;i<a.length;){let c=a[i],e=i===a.length-1;"string"==typeof c?(d.properties??(d.properties={}),(f=d.properties)[c]??(f[c]={errors:[]}),d=d.properties[c]):(d.items??(d.items=[]),(g=d.items)[c]??(g[c]={errors:[]}),d=d.items[c]),e&&d.errors.push(b(h)),i++}}};return d(a),c}function c1(a){let b=[];for(let c of a.map(a=>"object"==typeof a?a.key:a))"number"==typeof c?b.push(`[${c}]`):"symbol"==typeof c?b.push(`[${JSON.stringify(String(c))}]`):/[^\w$]/.test(c)?b.push(`[${JSON.stringify(c)}]`):(b.length&&b.push("."),b.push(c));return b.join("")}function c2(a){let b=[];for(let c of[...a.issues].sort((a,b)=>(a.path??[]).length-(b.path??[]).length))b.push(`✖ ${c.message}`),c.path?.length&&b.push(`  → at ${c1(c.path)}`);return b.join("\n")}a.s(["$ZodError",0,cY,"$ZodRealError",0,cZ,"flattenError",()=>c$,"formatError",()=>c_,"prettifyError",()=>c2,"toDotPath",()=>c1,"treeifyError",()=>c0],448440);let c3=a=>(b,c,d,e)=>{let f=d?Object.assign(d,{async:!1}):{async:!1},g=b._zod.run({value:c,issues:[]},f);if(g instanceof Promise)throw new bV;if(g.issues.length){let b=new(e?.Err??a)(g.issues.map(a=>cK(a,f,bY())));throw ck(b,e?.callee),b}return g.value},c4=c3(cZ),c5=a=>async(b,c,d,e)=>{let f=d?Object.assign(d,{async:!0}):{async:!0},g=b._zod.run({value:c,issues:[]},f);if(g instanceof Promise&&(g=await g),g.issues.length){let b=new(e?.Err??a)(g.issues.map(a=>cK(a,f,bY())));throw ck(b,e?.callee),b}return g.value},c6=c5(cZ),c7=a=>(b,c,d)=>{let e=d?{...d,async:!1}:{async:!1},f=b._zod.run({value:c,issues:[]},e);if(f instanceof Promise)throw new bV;return f.issues.length?{success:!1,error:new(a??cY)(f.issues.map(a=>cK(a,e,bY())))}:{success:!0,data:f.value}},c8=c7(cZ),c9=a=>async(b,c,d)=>{let e=d?Object.assign(d,{async:!0}):{async:!0},f=b._zod.run({value:c,issues:[]},e);return f instanceof Promise&&(f=await f),f.issues.length?{success:!1,error:new a(f.issues.map(a=>cK(a,e,bY())))}:{success:!0,data:f.value}},da=c9(cZ),db=a=>(b,c,d)=>{let e=d?Object.assign(d,{direction:"backward"}):{direction:"backward"};return c3(a)(b,c,e)},dc=db(cZ),dd=a=>(b,c,d)=>c3(a)(b,c,d),de=dd(cZ),df=a=>async(b,c,d)=>{let e=d?Object.assign(d,{direction:"backward"}):{direction:"backward"};return c5(a)(b,c,e)},dg=df(cZ),dh=a=>async(b,c,d)=>c5(a)(b,c,d),di=dh(cZ),dj=a=>(b,c,d)=>{let e=d?Object.assign(d,{direction:"backward"}):{direction:"backward"};return c7(a)(b,c,e)},dk=dj(cZ),dl=a=>(b,c,d)=>c7(a)(b,c,d),dm=dl(cZ),dn=a=>async(b,c,d)=>{let e=d?Object.assign(d,{direction:"backward"}):{direction:"backward"};return c9(a)(b,c,e)},dp=dn(cZ),dq=a=>async(b,c,d)=>c9(a)(b,c,d),dr=dq(cZ);a.s(["_decode",0,dd,"_decodeAsync",0,dh,"_encode",0,db,"_encodeAsync",0,df,"_parse",0,c3,"_parseAsync",0,c5,"_safeDecode",0,dl,"_safeDecodeAsync",0,dq,"_safeEncode",0,dj,"_safeEncodeAsync",0,dn,"_safeParse",0,c7,"_safeParseAsync",0,c9,"decode",0,de,"decodeAsync",0,di,"encode",0,dc,"encodeAsync",0,dg,"parse",0,c4,"parseAsync",0,c6,"safeDecode",0,dm,"safeDecodeAsync",0,dr,"safeEncode",0,dk,"safeEncodeAsync",0,dp,"safeParse",0,c8,"safeParseAsync",0,da],839766);let ds=/^[cC][^\s-]{8,}$/,dt=/^[0-9a-z]+$/,du=/^[0-9A-HJKMNP-TV-Za-hjkmnp-tv-z]{26}$/,dv=/^[0-9a-vA-V]{20}$/,dw=/^[A-Za-z0-9]{27}$/,dx=/^[a-zA-Z0-9_-]{21}$/,dy=/^P(?:(\d+W)|(?!.*W)(?=\d|T\d)(\d+Y)?(\d+M)?(\d+D)?(T(?=\d)(\d+H)?(\d+M)?(\d+([.,]\d+)?S)?)?)$/,dz=/^([0-9a-fA-F]{8}-[0-9a-fA-F]{4}-[0-9a-fA-F]{4}-[0-9a-fA-F]{4}-[0-9a-fA-F]{12})$/,dA=a=>a?RegExp(`^([0-9a-fA-F]{8}-[0-9a-fA-F]{4}-${a}[0-9a-fA-F]{3}-[89abAB][0-9a-fA-F]{3}-[0-9a-fA-F]{12})$`):/^([0-9a-fA-F]{8}-[0-9a-fA-F]{4}-[1-8][0-9a-fA-F]{3}-[89abAB][0-9a-fA-F]{3}-[0-9a-fA-F]{12}|00000000-0000-0000-0000-000000000000|ffffffff-ffff-ffff-ffff-ffffffffffff)$/,dB=dA(4),dC=dA(6),dD=dA(7),dE=/^(?!\.)(?!.*\.\.)([A-Za-z0-9_'+\-\.]*)[A-Za-z0-9_+-]@([A-Za-z0-9][A-Za-z0-9\-]*\.)+[A-Za-z]{2,}$/,dF=/^[^\s@"]{1,64}@[^\s@]{1,255}$/u;function dG(){return RegExp("^(\\p{Extended_Pictographic}|\\p{Emoji_Component})+$","u")}let dH=/^(?:(?:25[0-5]|2[0-4][0-9]|1[0-9][0-9]|[1-9][0-9]|[0-9])\.){3}(?:25[0-5]|2[0-4][0-9]|1[0-9][0-9]|[1-9][0-9]|[0-9])$/,dI=/^(([0-9a-fA-F]{1,4}:){7}[0-9a-fA-F]{1,4}|([0-9a-fA-F]{1,4}:){1,7}:|([0-9a-fA-F]{1,4}:){1,6}:[0-9a-fA-F]{1,4}|([0-9a-fA-F]{1,4}:){1,5}(:[0-9a-fA-F]{1,4}){1,2}|([0-9a-fA-F]{1,4}:){1,4}(:[0-9a-fA-F]{1,4}){1,3}|([0-9a-fA-F]{1,4}:){1,3}(:[0-9a-fA-F]{1,4}){1,4}|([0-9a-fA-F]{1,4}:){1,2}(:[0-9a-fA-F]{1,4}){1,5}|[0-9a-fA-F]{1,4}:((:[0-9a-fA-F]{1,4}){1,6})|:((:[0-9a-fA-F]{1,4}){1,7}|:))$/,dJ=a=>{let b=cs(a??":");return RegExp(`^(?:[0-9A-F]{2}${b}){5}[0-9A-F]{2}$|^(?:[0-9a-f]{2}${b}){5}[0-9a-f]{2}$`)},dK=/^((25[0-5]|2[0-4][0-9]|1[0-9][0-9]|[1-9][0-9]|[0-9])\.){3}(25[0-5]|2[0-4][0-9]|1[0-9][0-9]|[1-9][0-9]|[0-9])\/([0-9]|[1-2][0-9]|3[0-2])$/,dL=/^(([0-9a-fA-F]{1,4}:){7}[0-9a-fA-F]{1,4}|::|([0-9a-fA-F]{1,4})?::([0-9a-fA-F]{1,4}:?){0,6})\/(12[0-8]|1[01][0-9]|[1-9]?[0-9])$/,dM=/^$|^(?:[0-9a-zA-Z+/]{4})*(?:(?:[0-9a-zA-Z+/]{2}==)|(?:[0-9a-zA-Z+/]{3}=))?$/,dN=/^[A-Za-z0-9_-]*$/,dO=/^\+[1-9]\d{6,14}$/,dP="(?:(?:\\d\\d[2468][048]|\\d\\d[13579][26]|\\d\\d0[48]|[02468][048]00|[13579][26]00)-02-29|\\d{4}-(?:(?:0[13578]|1[02])-(?:0[1-9]|[12]\\d|3[01])|(?:0[469]|11)-(?:0[1-9]|[12]\\d|30)|(?:02)-(?:0[1-9]|1\\d|2[0-8])))",dQ=RegExp(`^${dP}$`);function dR(a){let b="(?:[01]\\d|2[0-3]):[0-5]\\d";return"number"==typeof a.precision?-1===a.precision?`${b}`:0===a.precision?`${b}:[0-5]\\d`:`${b}:[0-5]\\d\\.\\d{${a.precision}}`:`${b}(?::[0-5]\\d(?:\\.\\d+)?)?`}function dS(a){return RegExp(`^${dR(a)}$`)}function dT(a){let b=dR({precision:a.precision}),c=["Z"];a.local&&c.push(""),a.offset&&c.push("([+-](?:[01]\\d|2[0-3]):[0-5]\\d)");let d=`${b}(?:${c.join("|")})`;return RegExp(`^${dP}T(?:${d})$`)}let dU=a=>{let b=a?`[\\s\\S]{${a?.minimum??0},${a?.maximum??""}}`:"[\\s\\S]*";return RegExp(`^${b}$`)},dV=/^-?\d+n?$/,dW=/^-?\d+$/,dX=/^-?\d+(?:\.\d+)?$/,dY=/^(?:true|false)$/i,dZ=/^null$/i,d$=/^undefined$/i,d_=/^[^A-Z]*$/,d0=/^[^a-z]*$/;function d1(a,b){return RegExp(`^[A-Za-z0-9+/]{${a}}${b}$`)}function d2(a){return RegExp(`^[A-Za-z0-9_-]{${a}}$`)}let d3=d1(22,"=="),d4=d2(22),d5=d1(27,"="),d6=d2(27),d7=d1(43,"="),d8=d2(43),d9=d1(64,""),ea=d2(64),eb=d1(86,"=="),ec=d2(86);a.s(["base64",0,dM,"base64url",0,dN,"bigint",0,dV,"boolean",0,dY,"browserEmail",0,/^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$/,"cidrv4",0,dK,"cidrv6",0,dL,"cuid",0,ds,"cuid2",0,dt,"date",0,dQ,"datetime",()=>dT,"domain",0,/^([a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?\.)+[a-zA-Z]{2,}$/,"duration",0,dy,"e164",0,dO,"email",0,dE,"emoji",()=>dG,"extendedDuration",0,/^[-+]?P(?!$)(?:(?:[-+]?\d+Y)|(?:[-+]?\d+[.,]\d+Y$))?(?:(?:[-+]?\d+M)|(?:[-+]?\d+[.,]\d+M$))?(?:(?:[-+]?\d+W)|(?:[-+]?\d+[.,]\d+W$))?(?:(?:[-+]?\d+D)|(?:[-+]?\d+[.,]\d+D$))?(?:T(?=[\d+-])(?:(?:[-+]?\d+H)|(?:[-+]?\d+[.,]\d+H$))?(?:(?:[-+]?\d+M)|(?:[-+]?\d+[.,]\d+M$))?(?:[-+]?\d+(?:[.,]\d+)?S)?)??$/,"guid",0,dz,"hex",0,/^[0-9a-fA-F]*$/,"hostname",0,/^(?=.{1,253}\.?$)[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[-0-9a-zA-Z]{0,61}[0-9a-zA-Z])?)*\.?$/,"html5Email",0,/^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$/,"idnEmail",0,dF,"integer",0,dW,"ipv4",0,dH,"ipv6",0,dI,"ksuid",0,dw,"lowercase",0,d_,"mac",0,dJ,"md5_base64",0,d3,"md5_base64url",0,d4,"md5_hex",0,/^[0-9a-fA-F]{32}$/,"nanoid",0,dx,"null",()=>dZ,"number",0,dX,"rfc5322Email",0,/^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,"sha1_base64",0,d5,"sha1_base64url",0,d6,"sha1_hex",0,/^[0-9a-fA-F]{40}$/,"sha256_base64",0,d7,"sha256_base64url",0,d8,"sha256_hex",0,/^[0-9a-fA-F]{64}$/,"sha384_base64",0,d9,"sha384_base64url",0,ea,"sha384_hex",0,/^[0-9a-fA-F]{96}$/,"sha512_base64",0,eb,"sha512_base64url",0,ec,"sha512_hex",0,/^[0-9a-fA-F]{128}$/,"string",0,dU,"time",()=>dS,"ulid",0,du,"undefined",()=>d$,"unicodeEmail",0,dF,"uppercase",0,d0,"uuid",0,dA,"uuid4",0,dB,"uuid6",0,dC,"uuid7",0,dD,"xid",0,dv],79323);let ed=bT("$ZodCheck",(a,b)=>{var c;a._zod??(a._zod={}),a._zod.def=b,(c=a._zod).onattach??(c.onattach=[])}),ee={number:"number",bigint:"bigint",object:"date"},ef=bT("$ZodCheckLessThan",(a,b)=>{ed.init(a,b);let c=ee[typeof b.value];a._zod.onattach.push(a=>{let c=a._zod.bag,d=(b.inclusive?c.maximum:c.exclusiveMaximum)??1/0;b.value<d&&(b.inclusive?c.maximum=b.value:c.exclusiveMaximum=b.value)}),a._zod.check=d=>{(b.inclusive?d.value<=b.value:d.value<b.value)||d.issues.push({origin:c,code:"too_big",maximum:"object"==typeof b.value?b.value.getTime():b.value,input:d.value,inclusive:b.inclusive,inst:a,continue:!b.abort})}}),eg=bT("$ZodCheckGreaterThan",(a,b)=>{ed.init(a,b);let c=ee[typeof b.value];a._zod.onattach.push(a=>{let c=a._zod.bag,d=(b.inclusive?c.minimum:c.exclusiveMinimum)??-1/0;b.value>d&&(b.inclusive?c.minimum=b.value:c.exclusiveMinimum=b.value)}),a._zod.check=d=>{(b.inclusive?d.value>=b.value:d.value>b.value)||d.issues.push({origin:c,code:"too_small",minimum:"object"==typeof b.value?b.value.getTime():b.value,input:d.value,inclusive:b.inclusive,inst:a,continue:!b.abort})}}),eh=bT("$ZodCheckMultipleOf",(a,b)=>{ed.init(a,b),a._zod.onattach.push(a=>{var c;(c=a._zod.bag).multipleOf??(c.multipleOf=b.value)}),a._zod.check=c=>{if(typeof c.value!=typeof b.value)throw Error("Cannot mix number and bigint in multiple_of check.");("bigint"==typeof c.value?c.value%b.value===BigInt(0):0===b8(c.value,b.value))||c.issues.push({origin:typeof c.value,code:"not_multiple_of",divisor:b.value,input:c.value,inst:a,continue:!b.abort})}}),ei=bT("$ZodCheckNumberFormat",(a,b)=>{ed.init(a,b),b.format=b.format||"float64";let c=b.format?.includes("int"),d=c?"int":"number",[e,f]=cy[b.format];a._zod.onattach.push(a=>{let d=a._zod.bag;d.format=b.format,d.minimum=e,d.maximum=f,c&&(d.pattern=dW)}),a._zod.check=g=>{let h=g.value;if(c){if(!Number.isInteger(h))return void g.issues.push({expected:d,format:b.format,code:"invalid_type",continue:!1,input:h,inst:a});if(!Number.isSafeInteger(h))return void(h>0?g.issues.push({input:h,code:"too_big",maximum:Number.MAX_SAFE_INTEGER,note:"Integers must be within the safe integer range.",inst:a,origin:d,inclusive:!0,continue:!b.abort}):g.issues.push({input:h,code:"too_small",minimum:Number.MIN_SAFE_INTEGER,note:"Integers must be within the safe integer range.",inst:a,origin:d,inclusive:!0,continue:!b.abort}))}h<e&&g.issues.push({origin:"number",input:h,code:"too_small",minimum:e,inclusive:!0,inst:a,continue:!b.abort}),h>f&&g.issues.push({origin:"number",input:h,code:"too_big",maximum:f,inclusive:!0,inst:a,continue:!b.abort})}}),ej=bT("$ZodCheckBigIntFormat",(a,b)=>{ed.init(a,b);let[c,d]=cz[b.format];a._zod.onattach.push(a=>{let e=a._zod.bag;e.format=b.format,e.minimum=c,e.maximum=d}),a._zod.check=e=>{let f=e.value;f<c&&e.issues.push({origin:"bigint",input:f,code:"too_small",minimum:c,inclusive:!0,inst:a,continue:!b.abort}),f>d&&e.issues.push({origin:"bigint",input:f,code:"too_big",maximum:d,inclusive:!0,inst:a,continue:!b.abort})}}),ek=bT("$ZodCheckMaxSize",(a,b)=>{var c;ed.init(a,b),(c=a._zod.def).when??(c.when=a=>{let b=a.value;return!b6(b)&&void 0!==b.size}),a._zod.onattach.push(a=>{let c=a._zod.bag.maximum??1/0;b.maximum<c&&(a._zod.bag.maximum=b.maximum)}),a._zod.check=c=>{let d=c.value;d.size<=b.maximum||c.issues.push({origin:cL(d),code:"too_big",maximum:b.maximum,inclusive:!0,input:d,inst:a,continue:!b.abort})}}),el=bT("$ZodCheckMinSize",(a,b)=>{var c;ed.init(a,b),(c=a._zod.def).when??(c.when=a=>{let b=a.value;return!b6(b)&&void 0!==b.size}),a._zod.onattach.push(a=>{let c=a._zod.bag.minimum??-1/0;b.minimum>c&&(a._zod.bag.minimum=b.minimum)}),a._zod.check=c=>{let d=c.value;d.size>=b.minimum||c.issues.push({origin:cL(d),code:"too_small",minimum:b.minimum,inclusive:!0,input:d,inst:a,continue:!b.abort})}}),em=bT("$ZodCheckSizeEquals",(a,b)=>{var c;ed.init(a,b),(c=a._zod.def).when??(c.when=a=>{let b=a.value;return!b6(b)&&void 0!==b.size}),a._zod.onattach.push(a=>{let c=a._zod.bag;c.minimum=b.size,c.maximum=b.size,c.size=b.size}),a._zod.check=c=>{let d=c.value,e=d.size;if(e===b.size)return;let f=e>b.size;c.issues.push({origin:cL(d),...f?{code:"too_big",maximum:b.size}:{code:"too_small",minimum:b.size},inclusive:!0,exact:!0,input:c.value,inst:a,continue:!b.abort})}}),en=bT("$ZodCheckMaxLength",(a,b)=>{var c;ed.init(a,b),(c=a._zod.def).when??(c.when=a=>{let b=a.value;return!b6(b)&&void 0!==b.length}),a._zod.onattach.push(a=>{let c=a._zod.bag.maximum??1/0;b.maximum<c&&(a._zod.bag.maximum=b.maximum)}),a._zod.check=c=>{let d=c.value;if(d.length<=b.maximum)return;let e=cM(d);c.issues.push({origin:e,code:"too_big",maximum:b.maximum,inclusive:!0,input:d,inst:a,continue:!b.abort})}}),eo=bT("$ZodCheckMinLength",(a,b)=>{var c;ed.init(a,b),(c=a._zod.def).when??(c.when=a=>{let b=a.value;return!b6(b)&&void 0!==b.length}),a._zod.onattach.push(a=>{let c=a._zod.bag.minimum??-1/0;b.minimum>c&&(a._zod.bag.minimum=b.minimum)}),a._zod.check=c=>{let d=c.value;if(d.length>=b.minimum)return;let e=cM(d);c.issues.push({origin:e,code:"too_small",minimum:b.minimum,inclusive:!0,input:d,inst:a,continue:!b.abort})}}),ep=bT("$ZodCheckLengthEquals",(a,b)=>{var c;ed.init(a,b),(c=a._zod.def).when??(c.when=a=>{let b=a.value;return!b6(b)&&void 0!==b.length}),a._zod.onattach.push(a=>{let c=a._zod.bag;c.minimum=b.length,c.maximum=b.length,c.length=b.length}),a._zod.check=c=>{let d=c.value,e=d.length;if(e===b.length)return;let f=cM(d),g=e>b.length;c.issues.push({origin:f,...g?{code:"too_big",maximum:b.length}:{code:"too_small",minimum:b.length},inclusive:!0,exact:!0,input:c.value,inst:a,continue:!b.abort})}}),eq=bT("$ZodCheckStringFormat",(a,b)=>{var c,d;ed.init(a,b),a._zod.onattach.push(a=>{let c=a._zod.bag;c.format=b.format,b.pattern&&(c.patterns??(c.patterns=new Set),c.patterns.add(b.pattern))}),b.pattern?(c=a._zod).check??(c.check=c=>{b.pattern.lastIndex=0,b.pattern.test(c.value)||c.issues.push({origin:"string",code:"invalid_format",format:b.format,input:c.value,...b.pattern?{pattern:b.pattern.toString()}:{},inst:a,continue:!b.abort})}):(d=a._zod).check??(d.check=()=>{})}),er=bT("$ZodCheckRegex",(a,b)=>{eq.init(a,b),a._zod.check=c=>{b.pattern.lastIndex=0,b.pattern.test(c.value)||c.issues.push({origin:"string",code:"invalid_format",format:"regex",input:c.value,pattern:b.pattern.toString(),inst:a,continue:!b.abort})}}),es=bT("$ZodCheckLowerCase",(a,b)=>{b.pattern??(b.pattern=d_),eq.init(a,b)}),et=bT("$ZodCheckUpperCase",(a,b)=>{b.pattern??(b.pattern=d0),eq.init(a,b)}),eu=bT("$ZodCheckIncludes",(a,b)=>{ed.init(a,b);let c=cs(b.includes),d=new RegExp("number"==typeof b.position?`^.{${b.position}}${c}`:c);b.pattern=d,a._zod.onattach.push(a=>{let b=a._zod.bag;b.patterns??(b.patterns=new Set),b.patterns.add(d)}),a._zod.check=c=>{c.value.includes(b.includes,b.position)||c.issues.push({origin:"string",code:"invalid_format",format:"includes",includes:b.includes,input:c.value,inst:a,continue:!b.abort})}}),ev=bT("$ZodCheckStartsWith",(a,b)=>{ed.init(a,b);let c=RegExp(`^${cs(b.prefix)}.*`);b.pattern??(b.pattern=c),a._zod.onattach.push(a=>{let b=a._zod.bag;b.patterns??(b.patterns=new Set),b.patterns.add(c)}),a._zod.check=c=>{c.value.startsWith(b.prefix)||c.issues.push({origin:"string",code:"invalid_format",format:"starts_with",prefix:b.prefix,input:c.value,inst:a,continue:!b.abort})}}),ew=bT("$ZodCheckEndsWith",(a,b)=>{ed.init(a,b);let c=RegExp(`.*${cs(b.suffix)}$`);b.pattern??(b.pattern=c),a._zod.onattach.push(a=>{let b=a._zod.bag;b.patterns??(b.patterns=new Set),b.patterns.add(c)}),a._zod.check=c=>{c.value.endsWith(b.suffix)||c.issues.push({origin:"string",code:"invalid_format",format:"ends_with",suffix:b.suffix,input:c.value,inst:a,continue:!b.abort})}});function ex(a,b,c){a.issues.length&&b.issues.push(...cI(c,a.issues))}let ey=bT("$ZodCheckProperty",(a,b)=>{ed.init(a,b),a._zod.check=a=>{let c=b.schema._zod.run({value:a.value[b.property],issues:[]},{});if(c instanceof Promise)return c.then(c=>ex(c,a,b.property));ex(c,a,b.property)}}),ez=bT("$ZodCheckMimeType",(a,b)=>{ed.init(a,b);let c=new Set(b.mime);a._zod.onattach.push(a=>{a._zod.bag.mime=b.mime}),a._zod.check=d=>{c.has(d.value.type)||d.issues.push({code:"invalid_value",values:b.mime,input:d.value.type,inst:a,continue:!b.abort})}}),eA=bT("$ZodCheckOverwrite",(a,b)=>{ed.init(a,b),a._zod.check=a=>{a.value=b.tx(a.value)}});a.s(["$ZodCheck",0,ed,"$ZodCheckBigIntFormat",0,ej,"$ZodCheckEndsWith",0,ew,"$ZodCheckGreaterThan",0,eg,"$ZodCheckIncludes",0,eu,"$ZodCheckLengthEquals",0,ep,"$ZodCheckLessThan",0,ef,"$ZodCheckLowerCase",0,es,"$ZodCheckMaxLength",0,en,"$ZodCheckMaxSize",0,ek,"$ZodCheckMimeType",0,ez,"$ZodCheckMinLength",0,eo,"$ZodCheckMinSize",0,el,"$ZodCheckMultipleOf",0,eh,"$ZodCheckNumberFormat",0,ei,"$ZodCheckOverwrite",0,eA,"$ZodCheckProperty",0,ey,"$ZodCheckRegex",0,er,"$ZodCheckSizeEquals",0,em,"$ZodCheckStartsWith",0,ev,"$ZodCheckStringFormat",0,eq,"$ZodCheckUpperCase",0,et],940325);class eB{constructor(a=[]){this.content=[],this.indent=0,this&&(this.args=a)}indented(a){this.indent+=1,a(this),this.indent-=1}write(a){if("function"==typeof a){a(this,{execution:"sync"}),a(this,{execution:"async"});return}let b=a.split("\n").filter(a=>a),c=Math.min(...b.map(a=>a.length-a.trimStart().length));for(let a of b.map(a=>a.slice(c)).map(a=>" ".repeat(2*this.indent)+a))this.content.push(a)}compile(){return Function(...this?.args,[...(this?.content??[""]).map(a=>`  ${a}`)].join("\n"))}}a.s(["Doc",()=>eB],223502);let eC={major:4,minor:3,patch:4};a.s(["version",0,eC],724558);let eD=bT("$ZodType",(a,b)=>{var c;a??(a={}),a._zod.def=b,a._zod.bag=a._zod.bag||{},a._zod.version=eC;let d=[...a._zod.def.checks??[]];for(let b of(a._zod.traits.has("$ZodCheck")&&d.unshift(a),d))for(let c of b._zod.onattach)c(a);if(0===d.length)(c=a._zod).deferred??(c.deferred=[]),a._zod.deferred?.push(()=>{a._zod.run=a._zod.parse});else{let b=(a,b,c)=>{let d,e=cH(a);for(let f of b){if(f._zod.def.when){if(!f._zod.def.when(a))continue}else if(e)continue;let b=a.issues.length,g=f._zod.check(a);if(g instanceof Promise&&c?.async===!1)throw new bV;if(d||g instanceof Promise)d=(d??Promise.resolve()).then(async()=>{await g,a.issues.length!==b&&(e||(e=cH(a,b)))});else{if(a.issues.length===b)continue;e||(e=cH(a,b))}}return d?d.then(()=>a):a},c=(c,e,f)=>{if(cH(c))return c.aborted=!0,c;let g=b(e,d,f);if(g instanceof Promise){if(!1===f.async)throw new bV;return g.then(b=>a._zod.parse(b,f))}return a._zod.parse(g,f)};a._zod.run=(e,f)=>{if(f.skipChecks)return a._zod.parse(e,f);if("backward"===f.direction){let b=a._zod.parse({value:e.value,issues:[]},{...f,skipChecks:!0});return b instanceof Promise?b.then(a=>c(a,e,f)):c(b,e,f)}let g=a._zod.parse(e,f);if(g instanceof Promise){if(!1===f.async)throw new bV;return g.then(a=>b(a,d,f))}return b(g,d,f)}}ca(a,"~standard",()=>({validate:b=>{try{let c=c8(a,b);return c.success?{value:c.data}:{issues:c.error?.issues}}catch(c){return da(a,b).then(a=>a.success?{value:a.data}:{issues:a.error?.issues})}},vendor:"zod",version:1}))}),eE=bT("$ZodString",(a,b)=>{eD.init(a,b),a._zod.pattern=[...a?._zod.bag?.patterns??[]].pop()??dU(a._zod.bag),a._zod.parse=(c,d)=>{if(b.coerce)try{c.value=String(c.value)}catch(a){}return"string"==typeof c.value||c.issues.push({expected:"string",code:"invalid_type",input:c.value,inst:a}),c}}),eF=bT("$ZodStringFormat",(a,b)=>{eq.init(a,b),eE.init(a,b)}),eG=bT("$ZodGUID",(a,b)=>{b.pattern??(b.pattern=dz),eF.init(a,b)}),eH=bT("$ZodUUID",(a,b)=>{if(b.version){let a={v1:1,v2:2,v3:3,v4:4,v5:5,v6:6,v7:7,v8:8}[b.version];if(void 0===a)throw Error(`Invalid UUID version: "${b.version}"`);b.pattern??(b.pattern=dA(a))}else b.pattern??(b.pattern=dA());eF.init(a,b)}),eI=bT("$ZodEmail",(a,b)=>{b.pattern??(b.pattern=dE),eF.init(a,b)}),eJ=bT("$ZodURL",(a,b)=>{eF.init(a,b),a._zod.check=c=>{try{let d=c.value.trim(),e=new URL(d);b.hostname&&(b.hostname.lastIndex=0,b.hostname.test(e.hostname)||c.issues.push({code:"invalid_format",format:"url",note:"Invalid hostname",pattern:b.hostname.source,input:c.value,inst:a,continue:!b.abort})),b.protocol&&(b.protocol.lastIndex=0,b.protocol.test(e.protocol.endsWith(":")?e.protocol.slice(0,-1):e.protocol)||c.issues.push({code:"invalid_format",format:"url",note:"Invalid protocol",pattern:b.protocol.source,input:c.value,inst:a,continue:!b.abort})),b.normalize?c.value=e.href:c.value=d;return}catch(d){c.issues.push({code:"invalid_format",format:"url",input:c.value,inst:a,continue:!b.abort})}}}),eK=bT("$ZodEmoji",(a,b)=>{b.pattern??(b.pattern=dG()),eF.init(a,b)}),eL=bT("$ZodNanoID",(a,b)=>{b.pattern??(b.pattern=dx),eF.init(a,b)}),eM=bT("$ZodCUID",(a,b)=>{b.pattern??(b.pattern=ds),eF.init(a,b)}),eN=bT("$ZodCUID2",(a,b)=>{b.pattern??(b.pattern=dt),eF.init(a,b)}),eO=bT("$ZodULID",(a,b)=>{b.pattern??(b.pattern=du),eF.init(a,b)}),eP=bT("$ZodXID",(a,b)=>{b.pattern??(b.pattern=dv),eF.init(a,b)}),eQ=bT("$ZodKSUID",(a,b)=>{b.pattern??(b.pattern=dw),eF.init(a,b)}),eR=bT("$ZodISODateTime",(a,b)=>{b.pattern??(b.pattern=dT(b)),eF.init(a,b)}),eS=bT("$ZodISODate",(a,b)=>{b.pattern??(b.pattern=dQ),eF.init(a,b)}),eT=bT("$ZodISOTime",(a,b)=>{b.pattern??(b.pattern=dS(b)),eF.init(a,b)}),eU=bT("$ZodISODuration",(a,b)=>{b.pattern??(b.pattern=dy),eF.init(a,b)}),eV=bT("$ZodIPv4",(a,b)=>{b.pattern??(b.pattern=dH),eF.init(a,b),a._zod.bag.format="ipv4"}),eW=bT("$ZodIPv6",(a,b)=>{b.pattern??(b.pattern=dI),eF.init(a,b),a._zod.bag.format="ipv6",a._zod.check=c=>{try{new URL(`http://[${c.value}]`)}catch{c.issues.push({code:"invalid_format",format:"ipv6",input:c.value,inst:a,continue:!b.abort})}}}),eX=bT("$ZodMAC",(a,b)=>{b.pattern??(b.pattern=dJ(b.delimiter)),eF.init(a,b),a._zod.bag.format="mac"}),eY=bT("$ZodCIDRv4",(a,b)=>{b.pattern??(b.pattern=dK),eF.init(a,b)}),eZ=bT("$ZodCIDRv6",(a,b)=>{b.pattern??(b.pattern=dL),eF.init(a,b),a._zod.check=c=>{let d=c.value.split("/");try{if(2!==d.length)throw Error();let[a,b]=d;if(!b)throw Error();let c=Number(b);if(`${c}`!==b||c<0||c>128)throw Error();new URL(`http://[${a}]`)}catch{c.issues.push({code:"invalid_format",format:"cidrv6",input:c.value,inst:a,continue:!b.abort})}}});function e$(a){if(""===a)return!0;if(a.length%4!=0)return!1;try{return atob(a),!0}catch{return!1}}let e_=bT("$ZodBase64",(a,b)=>{b.pattern??(b.pattern=dM),eF.init(a,b),a._zod.bag.contentEncoding="base64",a._zod.check=c=>{e$(c.value)||c.issues.push({code:"invalid_format",format:"base64",input:c.value,inst:a,continue:!b.abort})}});function e0(a){if(!dN.test(a))return!1;let b=a.replace(/[-_]/g,a=>"-"===a?"+":"/");return e$(b.padEnd(4*Math.ceil(b.length/4),"="))}let e1=bT("$ZodBase64URL",(a,b)=>{b.pattern??(b.pattern=dN),eF.init(a,b),a._zod.bag.contentEncoding="base64url",a._zod.check=c=>{e0(c.value)||c.issues.push({code:"invalid_format",format:"base64url",input:c.value,inst:a,continue:!b.abort})}}),e2=bT("$ZodE164",(a,b)=>{b.pattern??(b.pattern=dO),eF.init(a,b)});function e3(a,b=null){try{let c=a.split(".");if(3!==c.length)return!1;let[d]=c;if(!d)return!1;let e=JSON.parse(atob(d));if("typ"in e&&e?.typ!=="JWT"||!e.alg||b&&(!("alg"in e)||e.alg!==b))return!1;return!0}catch{return!1}}let e4=bT("$ZodJWT",(a,b)=>{eF.init(a,b),a._zod.check=c=>{e3(c.value,b.alg)||c.issues.push({code:"invalid_format",format:"jwt",input:c.value,inst:a,continue:!b.abort})}}),e5=bT("$ZodCustomStringFormat",(a,b)=>{eF.init(a,b),a._zod.check=c=>{b.fn(c.value)||c.issues.push({code:"invalid_format",format:b.format,input:c.value,inst:a,continue:!b.abort})}}),e6=bT("$ZodNumber",(a,b)=>{eD.init(a,b),a._zod.pattern=a._zod.bag.pattern??dX,a._zod.parse=(c,d)=>{if(b.coerce)try{c.value=Number(c.value)}catch(a){}let e=c.value;if("number"==typeof e&&!Number.isNaN(e)&&Number.isFinite(e))return c;let f="number"==typeof e?Number.isNaN(e)?"NaN":Number.isFinite(e)?void 0:"Infinity":void 0;return c.issues.push({expected:"number",code:"invalid_type",input:e,inst:a,...f?{received:f}:{}}),c}}),e7=bT("$ZodNumberFormat",(a,b)=>{ei.init(a,b),e6.init(a,b)}),e8=bT("$ZodBoolean",(a,b)=>{eD.init(a,b),a._zod.pattern=dY,a._zod.parse=(c,d)=>{if(b.coerce)try{c.value=!!c.value}catch(a){}let e=c.value;return"boolean"==typeof e||c.issues.push({expected:"boolean",code:"invalid_type",input:e,inst:a}),c}}),e9=bT("$ZodBigInt",(a,b)=>{eD.init(a,b),a._zod.pattern=dV,a._zod.parse=(c,d)=>{if(b.coerce)try{c.value=BigInt(c.value)}catch(a){}return"bigint"==typeof c.value||c.issues.push({expected:"bigint",code:"invalid_type",input:c.value,inst:a}),c}}),fa=bT("$ZodBigIntFormat",(a,b)=>{ej.init(a,b),e9.init(a,b)}),fb=bT("$ZodSymbol",(a,b)=>{eD.init(a,b),a._zod.parse=(b,c)=>{let d=b.value;return"symbol"==typeof d||b.issues.push({expected:"symbol",code:"invalid_type",input:d,inst:a}),b}}),fc=bT("$ZodUndefined",(a,b)=>{eD.init(a,b),a._zod.pattern=d$,a._zod.values=new Set([void 0]),a._zod.optin="optional",a._zod.optout="optional",a._zod.parse=(b,c)=>{let d=b.value;return void 0===d||b.issues.push({expected:"undefined",code:"invalid_type",input:d,inst:a}),b}}),fd=bT("$ZodNull",(a,b)=>{eD.init(a,b),a._zod.pattern=dZ,a._zod.values=new Set([null]),a._zod.parse=(b,c)=>{let d=b.value;return null===d||b.issues.push({expected:"null",code:"invalid_type",input:d,inst:a}),b}}),fe=bT("$ZodAny",(a,b)=>{eD.init(a,b),a._zod.parse=a=>a}),ff=bT("$ZodUnknown",(a,b)=>{eD.init(a,b),a._zod.parse=a=>a}),fg=bT("$ZodNever",(a,b)=>{eD.init(a,b),a._zod.parse=(b,c)=>(b.issues.push({expected:"never",code:"invalid_type",input:b.value,inst:a}),b)}),fh=bT("$ZodVoid",(a,b)=>{eD.init(a,b),a._zod.parse=(b,c)=>{let d=b.value;return void 0===d||b.issues.push({expected:"void",code:"invalid_type",input:d,inst:a}),b}}),fi=bT("$ZodDate",(a,b)=>{eD.init(a,b),a._zod.parse=(c,d)=>{if(b.coerce)try{c.value=new Date(c.value)}catch(a){}let e=c.value,f=e instanceof Date;return f&&!Number.isNaN(e.getTime())||c.issues.push({expected:"date",code:"invalid_type",input:e,...f?{received:"Invalid Date"}:{},inst:a}),c}});function fj(a,b,c){a.issues.length&&b.issues.push(...cI(c,a.issues)),b.value[c]=a.value}let fk=bT("$ZodArray",(a,b)=>{eD.init(a,b),a._zod.parse=(c,d)=>{let e=c.value;if(!Array.isArray(e))return c.issues.push({expected:"array",code:"invalid_type",input:e,inst:a}),c;c.value=Array(e.length);let f=[];for(let a=0;a<e.length;a++){let g=e[a],h=b.element._zod.run({value:g,issues:[]},d);h instanceof Promise?f.push(h.then(b=>fj(b,c,a))):fj(h,c,a)}return f.length?Promise.all(f).then(()=>c):c}});function fl(a,b,c,d,e){if(a.issues.length){if(e&&!(c in d))return;b.issues.push(...cI(c,a.issues))}void 0===a.value?c in d&&(b.value[c]=void 0):b.value[c]=a.value}function fm(a){let b=Object.keys(a.shape);for(let c of b)if(!a.shape?.[c]?._zod?.traits?.has("$ZodType"))throw Error(`Invalid element at key "${c}": expected a Zod schema`);let c=cx(a.shape);return{...a,keys:b,keySet:new Set(b),numKeys:b.length,optionalKeys:new Set(c)}}function fn(a,b,c,d,e,f){let g=[],h=e.keySet,i=e.catchall._zod,j=i.def.type,k="optional"===i.optout;for(let e in b){if(h.has(e))continue;if("never"===j){g.push(e);continue}let f=i.run({value:b[e],issues:[]},d);f instanceof Promise?a.push(f.then(a=>fl(a,c,e,b,k))):fl(f,c,e,b,k)}return(g.length&&c.issues.push({code:"unrecognized_keys",keys:g,input:b,inst:f}),a.length)?Promise.all(a).then(()=>c):c}let fo=bT("$ZodObject",(a,b)=>{let c;eD.init(a,b);let d=Object.getOwnPropertyDescriptor(b,"shape");if(!d?.get){let a=b.shape;Object.defineProperty(b,"shape",{get:()=>{let c={...a};return Object.defineProperty(b,"shape",{value:c}),c}})}let e=b5(()=>fm(b));ca(a._zod,"propValues",()=>{let a=b.shape,c={};for(let b in a){let d=a[b]._zod;if(d.values)for(let a of(c[b]??(c[b]=new Set),d.values))c[b].add(a)}return c});let f=b.catchall;a._zod.parse=(b,d)=>{c??(c=e.value);let g=b.value;if(!cl(g))return b.issues.push({expected:"object",code:"invalid_type",input:g,inst:a}),b;b.value={};let h=[],i=c.shape;for(let a of c.keys){let c=i[a],e="optional"===c._zod.optout,f=c._zod.run({value:g[a],issues:[]},d);f instanceof Promise?h.push(f.then(c=>fl(c,b,a,g,e))):fl(f,b,a,g,e)}return f?fn(h,g,b,d,e.value,a):h.length?Promise.all(h).then(()=>b):b}}),fp=bT("$ZodObjectJIT",(a,b)=>{let c,d;fo.init(a,b);let e=a._zod.parse,f=b5(()=>fm(b)),g=!bX.jitless,h=g&&cm.value,i=b.catchall;a._zod.parse=(j,k)=>{d??(d=f.value);let l=j.value;return cl(l)?g&&h&&k?.async===!1&&!0!==k.jitless?(c||(c=(a=>{let b=new eB(["shape","payload","ctx"]),c=f.value,d=a=>{let b=ci(a);return`shape[${b}]._zod.run({ value: input[${b}], issues: [] }, ctx)`};b.write("const input = payload.value;");let e=Object.create(null),g=0;for(let a of c.keys)e[a]=`key_${g++}`;for(let f of(b.write("const newResult = {};"),c.keys)){let c=e[f],g=ci(f),h=a[f],i=h?._zod?.optout==="optional";b.write(`const ${c} = ${d(f)};`),i?b.write(`
        if (${c}.issues.length) {
          if (${g} in input) {
            payload.issues = payload.issues.concat(${c}.issues.map(iss => ({
              ...iss,
              path: iss.path ? [${g}, ...iss.path] : [${g}]
            })));
          }
        }
        
        if (${c}.value === undefined) {
          if (${g} in input) {
            newResult[${g}] = undefined;
          }
        } else {
          newResult[${g}] = ${c}.value;
        }
        
      `):b.write(`
        if (${c}.issues.length) {
          payload.issues = payload.issues.concat(${c}.issues.map(iss => ({
            ...iss,
            path: iss.path ? [${g}, ...iss.path] : [${g}]
          })));
        }
        
        if (${c}.value === undefined) {
          if (${g} in input) {
            newResult[${g}] = undefined;
          }
        } else {
          newResult[${g}] = ${c}.value;
        }
        
      `)}b.write("payload.value = newResult;"),b.write("return payload;");let h=b.compile();return(b,c)=>h(a,b,c)})(b.shape)),j=c(j,k),i)?fn([],l,j,k,d,a):j:e(j,k):(j.issues.push({expected:"object",code:"invalid_type",input:l,inst:a}),j)}});function fq(a,b,c,d){for(let c of a)if(0===c.issues.length)return b.value=c.value,b;let e=a.filter(a=>!cH(a));return 1===e.length?(b.value=e[0].value,e[0]):(b.issues.push({code:"invalid_union",input:b.value,inst:c,errors:a.map(a=>a.issues.map(a=>cK(a,d,bY())))}),b)}let fr=bT("$ZodUnion",(a,b)=>{eD.init(a,b),ca(a._zod,"optin",()=>b.options.some(a=>"optional"===a._zod.optin)?"optional":void 0),ca(a._zod,"optout",()=>b.options.some(a=>"optional"===a._zod.optout)?"optional":void 0),ca(a._zod,"values",()=>{if(b.options.every(a=>a._zod.values))return new Set(b.options.flatMap(a=>Array.from(a._zod.values)))}),ca(a._zod,"pattern",()=>{if(b.options.every(a=>a._zod.pattern)){let a=b.options.map(a=>a._zod.pattern);return RegExp(`^(${a.map(a=>b7(a.source)).join("|")})$`)}});let c=1===b.options.length,d=b.options[0]._zod.run;a._zod.parse=(e,f)=>{if(c)return d(e,f);let g=!1,h=[];for(let a of b.options){let b=a._zod.run({value:e.value,issues:[]},f);if(b instanceof Promise)h.push(b),g=!0;else{if(0===b.issues.length)return b;h.push(b)}}return g?Promise.all(h).then(b=>fq(b,e,a,f)):fq(h,e,a,f)}});function fs(a,b,c,d){let e=a.filter(a=>0===a.issues.length);return 1===e.length?b.value=e[0].value:0===e.length?b.issues.push({code:"invalid_union",input:b.value,inst:c,errors:a.map(a=>a.issues.map(a=>cK(a,d,bY())))}):b.issues.push({code:"invalid_union",input:b.value,inst:c,errors:[],inclusive:!1}),b}let ft=bT("$ZodXor",(a,b)=>{fr.init(a,b),b.inclusive=!1;let c=1===b.options.length,d=b.options[0]._zod.run;a._zod.parse=(e,f)=>{if(c)return d(e,f);let g=!1,h=[];for(let a of b.options){let b=a._zod.run({value:e.value,issues:[]},f);b instanceof Promise?(h.push(b),g=!0):h.push(b)}return g?Promise.all(h).then(b=>fs(b,e,a,f)):fs(h,e,a,f)}}),fu=bT("$ZodDiscriminatedUnion",(a,b)=>{b.inclusive=!1,fr.init(a,b);let c=a._zod.parse;ca(a._zod,"propValues",()=>{let a={};for(let c of b.options){let d=c._zod.propValues;if(!d||0===Object.keys(d).length)throw Error(`Invalid discriminated union option at index "${b.options.indexOf(c)}"`);for(let[b,c]of Object.entries(d))for(let d of(a[b]||(a[b]=new Set),c))a[b].add(d)}return a});let d=b5(()=>{let a=b.options,c=new Map;for(let d of a){let a=d._zod.propValues?.[b.discriminator];if(!a||0===a.size)throw Error(`Invalid discriminated union option at index "${b.options.indexOf(d)}"`);for(let b of a){if(c.has(b))throw Error(`Duplicate discriminator value "${String(b)}"`);c.set(b,d)}}return c});a._zod.parse=(e,f)=>{let g=e.value;if(!cl(g))return e.issues.push({code:"invalid_type",expected:"object",input:g,inst:a}),e;let h=d.value.get(g?.[b.discriminator]);return h?h._zod.run(e,f):b.unionFallback?c(e,f):(e.issues.push({code:"invalid_union",errors:[],note:"No matching discriminator",discriminator:b.discriminator,input:g,path:[b.discriminator],inst:a}),e)}}),fv=bT("$ZodIntersection",(a,b)=>{eD.init(a,b),a._zod.parse=(a,c)=>{let d=a.value,e=b.left._zod.run({value:d,issues:[]},c),f=b.right._zod.run({value:d,issues:[]},c);return e instanceof Promise||f instanceof Promise?Promise.all([e,f]).then(([b,c])=>fw(a,b,c)):fw(a,e,f)}});function fw(a,b,c){let d,e=new Map;for(let c of b.issues)if("unrecognized_keys"===c.code)for(let a of(d??(d=c),c.keys))e.has(a)||e.set(a,{}),e.get(a).l=!0;else a.issues.push(c);for(let b of c.issues)if("unrecognized_keys"===b.code)for(let a of b.keys)e.has(a)||e.set(a,{}),e.get(a).r=!0;else a.issues.push(b);let f=[...e].filter(([,a])=>a.l&&a.r).map(([a])=>a);if(f.length&&d&&a.issues.push({...d,keys:f}),cH(a))return a;let g=function a(b,c){if(b===c||b instanceof Date&&c instanceof Date&&+b==+c)return{valid:!0,data:b};if(cn(b)&&cn(c)){let d=Object.keys(c),e=Object.keys(b).filter(a=>-1!==d.indexOf(a)),f={...b,...c};for(let d of e){let e=a(b[d],c[d]);if(!e.valid)return{valid:!1,mergeErrorPath:[d,...e.mergeErrorPath]};f[d]=e.data}return{valid:!0,data:f}}if(Array.isArray(b)&&Array.isArray(c)){if(b.length!==c.length)return{valid:!1,mergeErrorPath:[]};let d=[];for(let e=0;e<b.length;e++){let f=a(b[e],c[e]);if(!f.valid)return{valid:!1,mergeErrorPath:[e,...f.mergeErrorPath]};d.push(f.data)}return{valid:!0,data:d}}return{valid:!1,mergeErrorPath:[]}}(b.value,c.value);if(!g.valid)throw Error(`Unmergable intersection. Error path: ${JSON.stringify(g.mergeErrorPath)}`);return a.value=g.data,a}let fx=bT("$ZodTuple",(a,b)=>{eD.init(a,b);let c=b.items;a._zod.parse=(d,e)=>{let f=d.value;if(!Array.isArray(f))return d.issues.push({input:f,inst:a,expected:"tuple",code:"invalid_type"}),d;d.value=[];let g=[],h=[...c].reverse().findIndex(a=>"optional"!==a._zod.optin),i=-1===h?0:c.length-h;if(!b.rest){let b=f.length>c.length,e=f.length<i-1;if(b||e)return d.issues.push({...b?{code:"too_big",maximum:c.length,inclusive:!0}:{code:"too_small",minimum:c.length},input:f,inst:a,origin:"array"}),d}let j=-1;for(let a of c){if(++j>=f.length&&j>=i)continue;let b=a._zod.run({value:f[j],issues:[]},e);b instanceof Promise?g.push(b.then(a=>fy(a,d,j))):fy(b,d,j)}if(b.rest)for(let a of f.slice(c.length)){j++;let c=b.rest._zod.run({value:a,issues:[]},e);c instanceof Promise?g.push(c.then(a=>fy(a,d,j))):fy(c,d,j)}return g.length?Promise.all(g).then(()=>d):d}});function fy(a,b,c){a.issues.length&&b.issues.push(...cI(c,a.issues)),b.value[c]=a.value}let fz=bT("$ZodRecord",(a,b)=>{eD.init(a,b),a._zod.parse=(c,d)=>{let e=c.value;if(!cn(e))return c.issues.push({expected:"record",code:"invalid_type",input:e,inst:a}),c;let f=[],g=b.keyType._zod.values;if(g){let h;c.value={};let i=new Set;for(let a of g)if("string"==typeof a||"number"==typeof a||"symbol"==typeof a){i.add("number"==typeof a?a.toString():a);let g=b.valueType._zod.run({value:e[a],issues:[]},d);g instanceof Promise?f.push(g.then(b=>{b.issues.length&&c.issues.push(...cI(a,b.issues)),c.value[a]=b.value})):(g.issues.length&&c.issues.push(...cI(a,g.issues)),c.value[a]=g.value)}for(let a in e)i.has(a)||(h=h??[]).push(a);h&&h.length>0&&c.issues.push({code:"unrecognized_keys",input:e,inst:a,keys:h})}else for(let g of(c.value={},Reflect.ownKeys(e))){if("__proto__"===g)continue;let h=b.keyType._zod.run({value:g,issues:[]},d);if(h instanceof Promise)throw Error("Async schemas not supported in object keys currently");if("string"==typeof g&&dX.test(g)&&h.issues.length&&h.issues.some(a=>"invalid_type"===a.code&&"number"===a.expected)){let a=b.keyType._zod.run({value:Number(g),issues:[]},d);if(a instanceof Promise)throw Error("Async schemas not supported in object keys currently");0===a.issues.length&&(h=a)}if(h.issues.length){"loose"===b.mode?c.value[g]=e[g]:c.issues.push({code:"invalid_key",origin:"record",issues:h.issues.map(a=>cK(a,d,bY())),input:g,path:[g],inst:a});continue}let i=b.valueType._zod.run({value:e[g],issues:[]},d);i instanceof Promise?f.push(i.then(a=>{a.issues.length&&c.issues.push(...cI(g,a.issues)),c.value[h.value]=a.value})):(i.issues.length&&c.issues.push(...cI(g,i.issues)),c.value[h.value]=i.value)}return f.length?Promise.all(f).then(()=>c):c}}),fA=bT("$ZodMap",(a,b)=>{eD.init(a,b),a._zod.parse=(c,d)=>{let e=c.value;if(!(e instanceof Map))return c.issues.push({expected:"map",code:"invalid_type",input:e,inst:a}),c;let f=[];for(let[g,h]of(c.value=new Map,e)){let i=b.keyType._zod.run({value:g,issues:[]},d),j=b.valueType._zod.run({value:h,issues:[]},d);i instanceof Promise||j instanceof Promise?f.push(Promise.all([i,j]).then(([b,f])=>{fB(b,f,c,g,e,a,d)})):fB(i,j,c,g,e,a,d)}return f.length?Promise.all(f).then(()=>c):c}});function fB(a,b,c,d,e,f,g){a.issues.length&&(cq.has(typeof d)?c.issues.push(...cI(d,a.issues)):c.issues.push({code:"invalid_key",origin:"map",input:e,inst:f,issues:a.issues.map(a=>cK(a,g,bY()))})),b.issues.length&&(cq.has(typeof d)?c.issues.push(...cI(d,b.issues)):c.issues.push({origin:"map",code:"invalid_element",input:e,inst:f,key:d,issues:b.issues.map(a=>cK(a,g,bY()))})),c.value.set(a.value,b.value)}let fC=bT("$ZodSet",(a,b)=>{eD.init(a,b),a._zod.parse=(c,d)=>{let e=c.value;if(!(e instanceof Set))return c.issues.push({input:e,inst:a,expected:"set",code:"invalid_type"}),c;let f=[];for(let a of(c.value=new Set,e)){let e=b.valueType._zod.run({value:a,issues:[]},d);e instanceof Promise?f.push(e.then(a=>fD(a,c))):fD(e,c)}return f.length?Promise.all(f).then(()=>c):c}});function fD(a,b){a.issues.length&&b.issues.push(...a.issues),b.value.add(a.value)}let fE=bT("$ZodEnum",(a,b)=>{eD.init(a,b);let c=b2(b.entries),d=new Set(c);a._zod.values=d,a._zod.pattern=RegExp(`^(${c.filter(a=>cq.has(typeof a)).map(a=>"string"==typeof a?cs(a):a.toString()).join("|")})$`),a._zod.parse=(b,e)=>{let f=b.value;return d.has(f)||b.issues.push({code:"invalid_value",values:c,input:f,inst:a}),b}}),fF=bT("$ZodLiteral",(a,b)=>{if(eD.init(a,b),0===b.values.length)throw Error("Cannot create literal schema with no valid values");let c=new Set(b.values);a._zod.values=c,a._zod.pattern=RegExp(`^(${b.values.map(a=>"string"==typeof a?cs(a):a?cs(a.toString()):String(a)).join("|")})$`),a._zod.parse=(d,e)=>{let f=d.value;return c.has(f)||d.issues.push({code:"invalid_value",values:b.values,input:f,inst:a}),d}}),fG=bT("$ZodFile",(a,b)=>{eD.init(a,b),a._zod.parse=(b,c)=>{let d=b.value;return d instanceof File||b.issues.push({expected:"file",code:"invalid_type",input:d,inst:a}),b}}),fH=bT("$ZodTransform",(a,b)=>{eD.init(a,b),a._zod.parse=(c,d)=>{if("backward"===d.direction)throw new bW(a.constructor.name);let e=b.transform(c.value,c);if(d.async)return(e instanceof Promise?e:Promise.resolve(e)).then(a=>(c.value=a,c));if(e instanceof Promise)throw new bV;return c.value=e,c}});function fI(a,b){return a.issues.length&&void 0===b?{issues:[],value:void 0}:a}let fJ=bT("$ZodOptional",(a,b)=>{eD.init(a,b),a._zod.optin="optional",a._zod.optout="optional",ca(a._zod,"values",()=>b.innerType._zod.values?new Set([...b.innerType._zod.values,void 0]):void 0),ca(a._zod,"pattern",()=>{let a=b.innerType._zod.pattern;return a?RegExp(`^(${b7(a.source)})?$`):void 0}),a._zod.parse=(a,c)=>{if("optional"===b.innerType._zod.optin){let d=b.innerType._zod.run(a,c);return d instanceof Promise?d.then(b=>fI(b,a.value)):fI(d,a.value)}return void 0===a.value?a:b.innerType._zod.run(a,c)}}),fK=bT("$ZodExactOptional",(a,b)=>{fJ.init(a,b),ca(a._zod,"values",()=>b.innerType._zod.values),ca(a._zod,"pattern",()=>b.innerType._zod.pattern),a._zod.parse=(a,c)=>b.innerType._zod.run(a,c)}),fL=bT("$ZodNullable",(a,b)=>{eD.init(a,b),ca(a._zod,"optin",()=>b.innerType._zod.optin),ca(a._zod,"optout",()=>b.innerType._zod.optout),ca(a._zod,"pattern",()=>{let a=b.innerType._zod.pattern;return a?RegExp(`^(${b7(a.source)}|null)$`):void 0}),ca(a._zod,"values",()=>b.innerType._zod.values?new Set([...b.innerType._zod.values,null]):void 0),a._zod.parse=(a,c)=>null===a.value?a:b.innerType._zod.run(a,c)}),fM=bT("$ZodDefault",(a,b)=>{eD.init(a,b),a._zod.optin="optional",ca(a._zod,"values",()=>b.innerType._zod.values),a._zod.parse=(a,c)=>{if("backward"===c.direction)return b.innerType._zod.run(a,c);if(void 0===a.value)return a.value=b.defaultValue,a;let d=b.innerType._zod.run(a,c);return d instanceof Promise?d.then(a=>fN(a,b)):fN(d,b)}});function fN(a,b){return void 0===a.value&&(a.value=b.defaultValue),a}let fO=bT("$ZodPrefault",(a,b)=>{eD.init(a,b),a._zod.optin="optional",ca(a._zod,"values",()=>b.innerType._zod.values),a._zod.parse=(a,c)=>("backward"===c.direction||void 0===a.value&&(a.value=b.defaultValue),b.innerType._zod.run(a,c))}),fP=bT("$ZodNonOptional",(a,b)=>{eD.init(a,b),ca(a._zod,"values",()=>{let a=b.innerType._zod.values;return a?new Set([...a].filter(a=>void 0!==a)):void 0}),a._zod.parse=(c,d)=>{let e=b.innerType._zod.run(c,d);return e instanceof Promise?e.then(b=>fQ(b,a)):fQ(e,a)}});function fQ(a,b){return a.issues.length||void 0!==a.value||a.issues.push({code:"invalid_type",expected:"nonoptional",input:a.value,inst:b}),a}let fR=bT("$ZodSuccess",(a,b)=>{eD.init(a,b),a._zod.parse=(a,c)=>{if("backward"===c.direction)throw new bW("ZodSuccess");let d=b.innerType._zod.run(a,c);return d instanceof Promise?d.then(b=>(a.value=0===b.issues.length,a)):(a.value=0===d.issues.length,a)}}),fS=bT("$ZodCatch",(a,b)=>{eD.init(a,b),ca(a._zod,"optin",()=>b.innerType._zod.optin),ca(a._zod,"optout",()=>b.innerType._zod.optout),ca(a._zod,"values",()=>b.innerType._zod.values),a._zod.parse=(a,c)=>{if("backward"===c.direction)return b.innerType._zod.run(a,c);let d=b.innerType._zod.run(a,c);return d instanceof Promise?d.then(d=>(a.value=d.value,d.issues.length&&(a.value=b.catchValue({...a,error:{issues:d.issues.map(a=>cK(a,c,bY()))},input:a.value}),a.issues=[]),a)):(a.value=d.value,d.issues.length&&(a.value=b.catchValue({...a,error:{issues:d.issues.map(a=>cK(a,c,bY()))},input:a.value}),a.issues=[]),a)}}),fT=bT("$ZodNaN",(a,b)=>{eD.init(a,b),a._zod.parse=(b,c)=>("number"==typeof b.value&&Number.isNaN(b.value)||b.issues.push({input:b.value,inst:a,expected:"nan",code:"invalid_type"}),b)}),fU=bT("$ZodPipe",(a,b)=>{eD.init(a,b),ca(a._zod,"values",()=>b.in._zod.values),ca(a._zod,"optin",()=>b.in._zod.optin),ca(a._zod,"optout",()=>b.out._zod.optout),ca(a._zod,"propValues",()=>b.in._zod.propValues),a._zod.parse=(a,c)=>{if("backward"===c.direction){let d=b.out._zod.run(a,c);return d instanceof Promise?d.then(a=>fV(a,b.in,c)):fV(d,b.in,c)}let d=b.in._zod.run(a,c);return d instanceof Promise?d.then(a=>fV(a,b.out,c)):fV(d,b.out,c)}});function fV(a,b,c){return a.issues.length?(a.aborted=!0,a):b._zod.run({value:a.value,issues:a.issues},c)}let fW=bT("$ZodCodec",(a,b)=>{eD.init(a,b),ca(a._zod,"values",()=>b.in._zod.values),ca(a._zod,"optin",()=>b.in._zod.optin),ca(a._zod,"optout",()=>b.out._zod.optout),ca(a._zod,"propValues",()=>b.in._zod.propValues),a._zod.parse=(a,c)=>{if("forward"===(c.direction||"forward")){let d=b.in._zod.run(a,c);return d instanceof Promise?d.then(a=>fX(a,b,c)):fX(d,b,c)}{let d=b.out._zod.run(a,c);return d instanceof Promise?d.then(a=>fX(a,b,c)):fX(d,b,c)}}});function fX(a,b,c){if(a.issues.length)return a.aborted=!0,a;if("forward"===(c.direction||"forward")){let d=b.transform(a.value,a);return d instanceof Promise?d.then(d=>fY(a,d,b.out,c)):fY(a,d,b.out,c)}{let d=b.reverseTransform(a.value,a);return d instanceof Promise?d.then(d=>fY(a,d,b.in,c)):fY(a,d,b.in,c)}}function fY(a,b,c,d){return a.issues.length?(a.aborted=!0,a):c._zod.run({value:b,issues:a.issues},d)}let fZ=bT("$ZodReadonly",(a,b)=>{eD.init(a,b),ca(a._zod,"propValues",()=>b.innerType._zod.propValues),ca(a._zod,"values",()=>b.innerType._zod.values),ca(a._zod,"optin",()=>b.innerType?._zod?.optin),ca(a._zod,"optout",()=>b.innerType?._zod?.optout),a._zod.parse=(a,c)=>{if("backward"===c.direction)return b.innerType._zod.run(a,c);let d=b.innerType._zod.run(a,c);return d instanceof Promise?d.then(f$):f$(d)}});function f$(a){return a.value=Object.freeze(a.value),a}let f_=bT("$ZodTemplateLiteral",(a,b)=>{eD.init(a,b);let c=[];for(let a of b.parts)if("object"==typeof a&&null!==a){if(!a._zod.pattern)throw Error(`Invalid template literal part, no pattern found: ${[...a._zod.traits].shift()}`);let b=a._zod.pattern instanceof RegExp?a._zod.pattern.source:a._zod.pattern;if(!b)throw Error(`Invalid template literal part: ${a._zod.traits}`);let d=+!!b.startsWith("^"),e=b.endsWith("$")?b.length-1:b.length;c.push(b.slice(d,e))}else if(null===a||cr.has(typeof a))c.push(cs(`${a}`));else throw Error(`Invalid template literal part: ${a}`);a._zod.pattern=RegExp(`^${c.join("")}$`),a._zod.parse=(c,d)=>("string"!=typeof c.value?c.issues.push({input:c.value,inst:a,expected:"string",code:"invalid_type"}):(a._zod.pattern.lastIndex=0,a._zod.pattern.test(c.value)||c.issues.push({input:c.value,inst:a,code:"invalid_format",format:b.format??"template_literal",pattern:a._zod.pattern.source})),c)}),f0=bT("$ZodFunction",(a,b)=>(eD.init(a,b),a._def=b,a._zod.def=b,a.implement=b=>{if("function"!=typeof b)throw Error("implement() must be called with a function");return function(...c){let d=Reflect.apply(b,this,a._def.input?c4(a._def.input,c):c);return a._def.output?c4(a._def.output,d):d}},a.implementAsync=b=>{if("function"!=typeof b)throw Error("implementAsync() must be called with a function");return async function(...c){let d=a._def.input?await c6(a._def.input,c):c,e=await Reflect.apply(b,this,d);return a._def.output?await c6(a._def.output,e):e}},a._zod.parse=(b,c)=>("function"!=typeof b.value?b.issues.push({code:"invalid_type",expected:"function",input:b.value,inst:a}):a._def.output&&"promise"===a._def.output._zod.def.type?b.value=a.implementAsync(b.value):b.value=a.implement(b.value),b),a.input=(...b)=>{let c=a.constructor;return new c(Array.isArray(b[0])?{type:"function",input:new fx({type:"tuple",items:b[0],rest:b[1]}),output:a._def.output}:{type:"function",input:b[0],output:a._def.output})},a.output=b=>new a.constructor({type:"function",input:a._def.input,output:b}),a)),f1=bT("$ZodPromise",(a,b)=>{eD.init(a,b),a._zod.parse=(a,c)=>Promise.resolve(a.value).then(a=>b.innerType._zod.run({value:a,issues:[]},c))}),f2=bT("$ZodLazy",(a,b)=>{eD.init(a,b),ca(a._zod,"innerType",()=>b.getter()),ca(a._zod,"pattern",()=>a._zod.innerType?._zod?.pattern),ca(a._zod,"propValues",()=>a._zod.innerType?._zod?.propValues),ca(a._zod,"optin",()=>a._zod.innerType?._zod?.optin??void 0),ca(a._zod,"optout",()=>a._zod.innerType?._zod?.optout??void 0),a._zod.parse=(b,c)=>a._zod.innerType._zod.run(b,c)}),f3=bT("$ZodCustom",(a,b)=>{ed.init(a,b),eD.init(a,b),a._zod.parse=(a,b)=>a,a._zod.check=c=>{let d=c.value,e=b.fn(d);if(e instanceof Promise)return e.then(b=>f4(b,c,d,a));f4(e,c,d,a)}});function f4(a,b,c,d){if(!a){let a={code:"custom",input:c,inst:d,path:[...d._zod.def.path??[]],continue:!d._zod.def.abort};d._zod.def.params&&(a.params=d._zod.def.params),b.issues.push(cO(a))}}function f5(a,b,c,d){let e=Math.abs(a),f=e%10,g=e%100;return g>=11&&g<=19?d:1===f?b:f>=2&&f<=4?c:d}function f6(){let a,b,c;return{localeError:(a={string:{unit:"characters",verb:"to have"},file:{unit:"bytes",verb:"to have"},array:{unit:"items",verb:"to have"},set:{unit:"items",verb:"to have"},map:{unit:"entries",verb:"to have"}},b={regex:"input",email:"email address",url:"URL",emoji:"emoji",uuid:"UUID",uuidv4:"UUIDv4",uuidv6:"UUIDv6",nanoid:"nanoid",guid:"GUID",cuid:"cuid",cuid2:"cuid2",ulid:"ULID",xid:"XID",ksuid:"KSUID",datetime:"ISO datetime",date:"ISO date",time:"ISO time",duration:"ISO duration",ipv4:"IPv4 address",ipv6:"IPv6 address",mac:"MAC address",cidrv4:"IPv4 range",cidrv6:"IPv6 range",base64:"base64-encoded string",base64url:"base64url-encoded string",json_string:"JSON string",e164:"E.164 number",jwt:"JWT",template_literal:"input"},c={nan:"NaN"},d=>{switch(d.code){case"invalid_type":{let a=c[d.expected]??d.expected,b=cN(d.input),e=c[b]??b;return`Invalid input: expected ${a}, received ${e}`}case"invalid_value":if(1===d.values.length)return`Invalid input: expected ${cw(d.values[0])}`;return`Invalid option: expected one of ${b3(d.values,"|")}`;case"too_big":{let b=d.inclusive?"<=":"<",c=a[d.origin]??null;if(c)return`Too big: expected ${d.origin??"value"} to have ${b}${d.maximum.toString()} ${c.unit??"elements"}`;return`Too big: expected ${d.origin??"value"} to be ${b}${d.maximum.toString()}`}case"too_small":{let b=d.inclusive?">=":">",c=a[d.origin]??null;if(c)return`Too small: expected ${d.origin} to have ${b}${d.minimum.toString()} ${c.unit}`;return`Too small: expected ${d.origin} to be ${b}${d.minimum.toString()}`}case"invalid_format":if("starts_with"===d.format)return`Invalid string: must start with "${d.prefix}"`;if("ends_with"===d.format)return`Invalid string: must end with "${d.suffix}"`;if("includes"===d.format)return`Invalid string: must include "${d.includes}"`;if("regex"===d.format)return`Invalid string: must match pattern ${d.pattern}`;return`Invalid ${b[d.format]??d.format}`;case"not_multiple_of":return`Invalid number: must be a multiple of ${d.divisor}`;case"unrecognized_keys":return`Unrecognized key${d.keys.length>1?"s":""}: ${b3(d.keys,", ")}`;case"invalid_key":return`Invalid key in ${d.origin}`;case"invalid_union":default:return"Invalid input";case"invalid_element":return`Invalid value in ${d.origin}`}})}}function f7(a,b,c){return 1===Math.abs(a)?b:c}function f8(a){if(!a)return"";let b=a[a.length-1];return a+(["ա","ե","ը","ի","ո","ու","օ"].includes(b)?"ն":"ը")}function f9(){let a,b,c;return{localeError:(a={string:{unit:"តួអក្សរ",verb:"គួរមាន"},file:{unit:"បៃ",verb:"គួរមាន"},array:{unit:"ធាតុ",verb:"គួរមាន"},set:{unit:"ធាតុ",verb:"គួរមាន"}},b={regex:"ទិន្នន័យបញ្ចូល",email:"អាសយដ្ឋានអ៊ីមែល",url:"URL",emoji:"សញ្ញាអារម្មណ៍",uuid:"UUID",uuidv4:"UUIDv4",uuidv6:"UUIDv6",nanoid:"nanoid",guid:"GUID",cuid:"cuid",cuid2:"cuid2",ulid:"ULID",xid:"XID",ksuid:"KSUID",datetime:"កាលបរិច្ឆេទ និងម៉ោង ISO",date:"កាលបរិច្ឆេទ ISO",time:"ម៉ោង ISO",duration:"រយៈពេល ISO",ipv4:"អាសយដ្ឋាន IPv4",ipv6:"អាសយដ្ឋាន IPv6",cidrv4:"ដែនអាសយដ្ឋាន IPv4",cidrv6:"ដែនអាសយដ្ឋាន IPv6",base64:"ខ្សែអក្សរអ៊ិកូដ base64",base64url:"ខ្សែអក្សរអ៊ិកូដ base64url",json_string:"ខ្សែអក្សរ JSON",e164:"លេខ E.164",jwt:"JWT",template_literal:"ទិន្នន័យបញ្ចូល"},c={nan:"NaN",number:"លេខ",array:"អារេ (Array)",null:"គ្មានតម្លៃ (null)"},d=>{switch(d.code){case"invalid_type":{let a=c[d.expected]??d.expected,b=cN(d.input),e=c[b]??b;if(/^[A-Z]/.test(d.expected))return`ទិន្នន័យបញ្ចូលមិនត្រឹមត្រូវ៖ ត្រូវការ instanceof ${d.expected} ប៉ុន្តែទទួលបាន ${e}`;return`ទិន្នន័យបញ្ចូលមិនត្រឹមត្រូវ៖ ត្រូវការ ${a} ប៉ុន្តែទទួលបាន ${e}`}case"invalid_value":if(1===d.values.length)return`ទិន្នន័យបញ្ចូលមិនត្រឹមត្រូវ៖ ត្រូវការ ${cw(d.values[0])}`;return`ជម្រើសមិនត្រឹមត្រូវ៖ ត្រូវជាមួយក្នុងចំណោម ${b3(d.values,"|")}`;case"too_big":{let b=d.inclusive?"<=":"<",c=a[d.origin]??null;if(c)return`ធំពេក៖ ត្រូវការ ${d.origin??"តម្លៃ"} ${b} ${d.maximum.toString()} ${c.unit??"ធាតុ"}`;return`ធំពេក៖ ត្រូវការ ${d.origin??"តម្លៃ"} ${b} ${d.maximum.toString()}`}case"too_small":{let b=d.inclusive?">=":">",c=a[d.origin]??null;if(c)return`តូចពេក៖ ត្រូវការ ${d.origin} ${b} ${d.minimum.toString()} ${c.unit}`;return`តូចពេក៖ ត្រូវការ ${d.origin} ${b} ${d.minimum.toString()}`}case"invalid_format":if("starts_with"===d.format)return`ខ្សែអក្សរមិនត្រឹមត្រូវ៖ ត្រូវចាប់ផ្តើមដោយ "${d.prefix}"`;if("ends_with"===d.format)return`ខ្សែអក្សរមិនត្រឹមត្រូវ៖ ត្រូវបញ្ចប់ដោយ "${d.suffix}"`;if("includes"===d.format)return`ខ្សែអក្សរមិនត្រឹមត្រូវ៖ ត្រូវមាន "${d.includes}"`;if("regex"===d.format)return`ខ្សែអក្សរមិនត្រឹមត្រូវ៖ ត្រូវតែផ្គូផ្គងនឹងទម្រង់ដែលបានកំណត់ ${d.pattern}`;return`មិនត្រឹមត្រូវ៖ ${b[d.format]??d.format}`;case"not_multiple_of":return`លេខមិនត្រឹមត្រូវ៖ ត្រូវតែជាពហុគុណនៃ ${d.divisor}`;case"unrecognized_keys":return`រកឃើញសោមិនស្គាល់៖ ${b3(d.keys,", ")}`;case"invalid_key":return`សោមិនត្រឹមត្រូវនៅក្នុង ${d.origin}`;case"invalid_union":default:return`ទិន្នន័យមិនត្រឹមត្រូវ`;case"invalid_element":return`ទិន្នន័យមិនត្រឹមត្រូវនៅក្នុង ${d.origin}`}})}}a.s(["$ZodAny",0,fe,"$ZodArray",0,fk,"$ZodBase64",0,e_,"$ZodBase64URL",0,e1,"$ZodBigInt",0,e9,"$ZodBigIntFormat",0,fa,"$ZodBoolean",0,e8,"$ZodCIDRv4",0,eY,"$ZodCIDRv6",0,eZ,"$ZodCUID",0,eM,"$ZodCUID2",0,eN,"$ZodCatch",0,fS,"$ZodCodec",0,fW,"$ZodCustom",0,f3,"$ZodCustomStringFormat",0,e5,"$ZodDate",0,fi,"$ZodDefault",0,fM,"$ZodDiscriminatedUnion",0,fu,"$ZodE164",0,e2,"$ZodEmail",0,eI,"$ZodEmoji",0,eK,"$ZodEnum",0,fE,"$ZodExactOptional",0,fK,"$ZodFile",0,fG,"$ZodFunction",0,f0,"$ZodGUID",0,eG,"$ZodIPv4",0,eV,"$ZodIPv6",0,eW,"$ZodISODate",0,eS,"$ZodISODateTime",0,eR,"$ZodISODuration",0,eU,"$ZodISOTime",0,eT,"$ZodIntersection",0,fv,"$ZodJWT",0,e4,"$ZodKSUID",0,eQ,"$ZodLazy",0,f2,"$ZodLiteral",0,fF,"$ZodMAC",0,eX,"$ZodMap",0,fA,"$ZodNaN",0,fT,"$ZodNanoID",0,eL,"$ZodNever",0,fg,"$ZodNonOptional",0,fP,"$ZodNull",0,fd,"$ZodNullable",0,fL,"$ZodNumber",0,e6,"$ZodNumberFormat",0,e7,"$ZodObject",0,fo,"$ZodObjectJIT",0,fp,"$ZodOptional",0,fJ,"$ZodPipe",0,fU,"$ZodPrefault",0,fO,"$ZodPromise",0,f1,"$ZodReadonly",0,fZ,"$ZodRecord",0,fz,"$ZodSet",0,fC,"$ZodString",0,eE,"$ZodStringFormat",0,eF,"$ZodSuccess",0,fR,"$ZodSymbol",0,fb,"$ZodTemplateLiteral",0,f_,"$ZodTransform",0,fH,"$ZodTuple",0,fx,"$ZodType",0,eD,"$ZodULID",0,eO,"$ZodURL",0,eJ,"$ZodUUID",0,eH,"$ZodUndefined",0,fc,"$ZodUnion",0,fr,"$ZodUnknown",0,ff,"$ZodVoid",0,fh,"$ZodXID",0,eP,"$ZodXor",0,ft,"isValidBase64",()=>e$,"isValidBase64URL",()=>e0,"isValidJWT",()=>e3],786691);let ga=a=>a.charAt(0).toUpperCase()+a.slice(1);function gb(a){let b=Math.abs(a),c=b%10,d=b%100;return d>=11&&d<=19||0===c?"many":1===c?"one":"few"}function gc(a,b,c,d){let e=Math.abs(a),f=e%10,g=e%100;return g>=11&&g<=19?d:1===f?b:f>=2&&f<=4?c:d}function gd(){let a,b,c;return{localeError:(a={string:{unit:"символів",verb:"матиме"},file:{unit:"байтів",verb:"матиме"},array:{unit:"елементів",verb:"матиме"},set:{unit:"елементів",verb:"матиме"}},b={regex:"вхідні дані",email:"адреса електронної пошти",url:"URL",emoji:"емодзі",uuid:"UUID",uuidv4:"UUIDv4",uuidv6:"UUIDv6",nanoid:"nanoid",guid:"GUID",cuid:"cuid",cuid2:"cuid2",ulid:"ULID",xid:"XID",ksuid:"KSUID",datetime:"дата та час ISO",date:"дата ISO",time:"час ISO",duration:"тривалість ISO",ipv4:"адреса IPv4",ipv6:"адреса IPv6",cidrv4:"діапазон IPv4",cidrv6:"діапазон IPv6",base64:"рядок у кодуванні base64",base64url:"рядок у кодуванні base64url",json_string:"рядок JSON",e164:"номер E.164",jwt:"JWT",template_literal:"вхідні дані"},c={nan:"NaN",number:"число",array:"масив"},d=>{switch(d.code){case"invalid_type":{let a=c[d.expected]??d.expected,b=cN(d.input),e=c[b]??b;if(/^[A-Z]/.test(d.expected))return`Неправильні вхідні дані: очікується instanceof ${d.expected}, отримано ${e}`;return`Неправильні вхідні дані: очікується ${a}, отримано ${e}`}case"invalid_value":if(1===d.values.length)return`Неправильні вхідні дані: очікується ${cw(d.values[0])}`;return`Неправильна опція: очікується одне з ${b3(d.values,"|")}`;case"too_big":{let b=d.inclusive?"<=":"<",c=a[d.origin]??null;if(c)return`Занадто велике: очікується, що ${d.origin??"значення"} ${c.verb} ${b}${d.maximum.toString()} ${c.unit??"елементів"}`;return`Занадто велике: очікується, що ${d.origin??"значення"} буде ${b}${d.maximum.toString()}`}case"too_small":{let b=d.inclusive?">=":">",c=a[d.origin]??null;if(c)return`Занадто мале: очікується, що ${d.origin} ${c.verb} ${b}${d.minimum.toString()} ${c.unit}`;return`Занадто мале: очікується, що ${d.origin} буде ${b}${d.minimum.toString()}`}case"invalid_format":if("starts_with"===d.format)return`Неправильний рядок: повинен починатися з "${d.prefix}"`;if("ends_with"===d.format)return`Неправильний рядок: повинен закінчуватися на "${d.suffix}"`;if("includes"===d.format)return`Неправильний рядок: повинен містити "${d.includes}"`;if("regex"===d.format)return`Неправильний рядок: повинен відповідати шаблону ${d.pattern}`;return`Неправильний ${b[d.format]??d.format}`;case"not_multiple_of":return`Неправильне число: повинно бути кратним ${d.divisor}`;case"unrecognized_keys":return`Нерозпізнаний ключ${d.keys.length>1?"і":""}: ${b3(d.keys,", ")}`;case"invalid_key":return`Неправильний ключ у ${d.origin}`;case"invalid_union":return"Неправильні вхідні дані";case"invalid_element":return`Неправильне значення у ${d.origin}`;default:return`Неправильні вхідні дані`}})}}a.s([],53056);let ge=Symbol("ZodOutput"),gf=Symbol("ZodInput");class gg{constructor(){this._map=new WeakMap,this._idmap=new Map}add(a,...b){let c=b[0];return this._map.set(a,c),c&&"object"==typeof c&&"id"in c&&this._idmap.set(c.id,a),this}clear(){return this._map=new WeakMap,this._idmap=new Map,this}remove(a){let b=this._map.get(a);return b&&"object"==typeof b&&"id"in b&&this._idmap.delete(b.id),this._map.delete(a),this}get(a){let b=a._zod.parent;if(b){let c={...this.get(b)??{}};delete c.id;let d={...c,...this._map.get(a)};return Object.keys(d).length?d:void 0}return this._map.get(a)}has(a){return this._map.has(a)}}function gh(){return new gg}(J=globalThis).__zod_globalRegistry??(J.__zod_globalRegistry=gh());let gi=globalThis.__zod_globalRegistry;function gj(a,b){return new a({type:"string",...cu(b)})}function gk(a,b){return new a({type:"string",coerce:!0,...cu(b)})}function gl(a,b){return new a({type:"string",format:"email",check:"string_format",abort:!1,...cu(b)})}function gm(a,b){return new a({type:"string",format:"guid",check:"string_format",abort:!1,...cu(b)})}function gn(a,b){return new a({type:"string",format:"uuid",check:"string_format",abort:!1,...cu(b)})}function go(a,b){return new a({type:"string",format:"uuid",check:"string_format",abort:!1,version:"v4",...cu(b)})}function gp(a,b){return new a({type:"string",format:"uuid",check:"string_format",abort:!1,version:"v6",...cu(b)})}function gq(a,b){return new a({type:"string",format:"uuid",check:"string_format",abort:!1,version:"v7",...cu(b)})}function gr(a,b){return new a({type:"string",format:"url",check:"string_format",abort:!1,...cu(b)})}function gs(a,b){return new a({type:"string",format:"emoji",check:"string_format",abort:!1,...cu(b)})}function gt(a,b){return new a({type:"string",format:"nanoid",check:"string_format",abort:!1,...cu(b)})}function gu(a,b){return new a({type:"string",format:"cuid",check:"string_format",abort:!1,...cu(b)})}function gv(a,b){return new a({type:"string",format:"cuid2",check:"string_format",abort:!1,...cu(b)})}function gw(a,b){return new a({type:"string",format:"ulid",check:"string_format",abort:!1,...cu(b)})}function gx(a,b){return new a({type:"string",format:"xid",check:"string_format",abort:!1,...cu(b)})}function gy(a,b){return new a({type:"string",format:"ksuid",check:"string_format",abort:!1,...cu(b)})}function gz(a,b){return new a({type:"string",format:"ipv4",check:"string_format",abort:!1,...cu(b)})}function gA(a,b){return new a({type:"string",format:"ipv6",check:"string_format",abort:!1,...cu(b)})}function gB(a,b){return new a({type:"string",format:"mac",check:"string_format",abort:!1,...cu(b)})}function gC(a,b){return new a({type:"string",format:"cidrv4",check:"string_format",abort:!1,...cu(b)})}function gD(a,b){return new a({type:"string",format:"cidrv6",check:"string_format",abort:!1,...cu(b)})}function gE(a,b){return new a({type:"string",format:"base64",check:"string_format",abort:!1,...cu(b)})}function gF(a,b){return new a({type:"string",format:"base64url",check:"string_format",abort:!1,...cu(b)})}function gG(a,b){return new a({type:"string",format:"e164",check:"string_format",abort:!1,...cu(b)})}function gH(a,b){return new a({type:"string",format:"jwt",check:"string_format",abort:!1,...cu(b)})}a.s(["$ZodRegistry",()=>gg,"$input",0,gf,"$output",0,ge,"globalRegistry",0,gi,"registry",()=>gh],316206);let gI={Any:null,Minute:-1,Second:0,Millisecond:3,Microsecond:6};function gJ(a,b){return new a({type:"string",format:"datetime",check:"string_format",offset:!1,local:!1,precision:null,...cu(b)})}function gK(a,b){return new a({type:"string",format:"date",check:"string_format",...cu(b)})}function gL(a,b){return new a({type:"string",format:"time",check:"string_format",precision:null,...cu(b)})}function gM(a,b){return new a({type:"string",format:"duration",check:"string_format",...cu(b)})}function gN(a,b){return new a({type:"number",checks:[],...cu(b)})}function gO(a,b){return new a({type:"number",coerce:!0,checks:[],...cu(b)})}function gP(a,b){return new a({type:"number",check:"number_format",abort:!1,format:"safeint",...cu(b)})}function gQ(a,b){return new a({type:"number",check:"number_format",abort:!1,format:"float32",...cu(b)})}function gR(a,b){return new a({type:"number",check:"number_format",abort:!1,format:"float64",...cu(b)})}function gS(a,b){return new a({type:"number",check:"number_format",abort:!1,format:"int32",...cu(b)})}function gT(a,b){return new a({type:"number",check:"number_format",abort:!1,format:"uint32",...cu(b)})}function gU(a,b){return new a({type:"boolean",...cu(b)})}function gV(a,b){return new a({type:"boolean",coerce:!0,...cu(b)})}function gW(a,b){return new a({type:"bigint",...cu(b)})}function gX(a,b){return new a({type:"bigint",coerce:!0,...cu(b)})}function gY(a,b){return new a({type:"bigint",check:"bigint_format",abort:!1,format:"int64",...cu(b)})}function gZ(a,b){return new a({type:"bigint",check:"bigint_format",abort:!1,format:"uint64",...cu(b)})}function g$(a,b){return new a({type:"symbol",...cu(b)})}function g_(a,b){return new a({type:"undefined",...cu(b)})}function g0(a,b){return new a({type:"null",...cu(b)})}function g1(a){return new a({type:"any"})}function g2(a){return new a({type:"unknown"})}function g3(a,b){return new a({type:"never",...cu(b)})}function g4(a,b){return new a({type:"void",...cu(b)})}function g5(a,b){return new a({type:"date",...cu(b)})}function g6(a,b){return new a({type:"date",coerce:!0,...cu(b)})}function g7(a,b){return new a({type:"nan",...cu(b)})}function g8(a,b){return new ef({check:"less_than",...cu(b),value:a,inclusive:!1})}function g9(a,b){return new ef({check:"less_than",...cu(b),value:a,inclusive:!0})}function ha(a,b){return new eg({check:"greater_than",...cu(b),value:a,inclusive:!1})}function hb(a,b){return new eg({check:"greater_than",...cu(b),value:a,inclusive:!0})}function hc(a){return ha(0,a)}function hd(a){return g8(0,a)}function he(a){return g9(0,a)}function hf(a){return hb(0,a)}function hg(a,b){return new eh({check:"multiple_of",...cu(b),value:a})}function hh(a,b){return new ek({check:"max_size",...cu(b),maximum:a})}function hi(a,b){return new el({check:"min_size",...cu(b),minimum:a})}function hj(a,b){return new em({check:"size_equals",...cu(b),size:a})}function hk(a,b){return new en({check:"max_length",...cu(b),maximum:a})}function hl(a,b){return new eo({check:"min_length",...cu(b),minimum:a})}function hm(a,b){return new ep({check:"length_equals",...cu(b),length:a})}function hn(a,b){return new er({check:"string_format",format:"regex",...cu(b),pattern:a})}function ho(a){return new es({check:"string_format",format:"lowercase",...cu(a)})}function hp(a){return new et({check:"string_format",format:"uppercase",...cu(a)})}function hq(a,b){return new eu({check:"string_format",format:"includes",...cu(b),includes:a})}function hr(a,b){return new ev({check:"string_format",format:"starts_with",...cu(b),prefix:a})}function hs(a,b){return new ew({check:"string_format",format:"ends_with",...cu(b),suffix:a})}function ht(a,b,c){return new ey({check:"property",property:a,schema:b,...cu(c)})}function hu(a,b){return new ez({check:"mime_type",mime:a,...cu(b)})}function hv(a){return new eA({check:"overwrite",tx:a})}function hw(a){return hv(b=>b.normalize(a))}function hx(){return hv(a=>a.trim())}function hy(){return hv(a=>a.toLowerCase())}function hz(){return hv(a=>a.toUpperCase())}function hA(){return hv(a=>cj(a))}function hB(a,b,c){return new a({type:"array",element:b,...cu(c)})}function hC(a,b,c){return new a({type:"union",options:b,...cu(c)})}function hD(a,b,c){return new a({type:"union",options:b,inclusive:!1,...cu(c)})}function hE(a,b,c,d){return new a({type:"union",options:c,discriminator:b,...cu(d)})}function hF(a,b,c){return new a({type:"intersection",left:b,right:c})}function hG(a,b,c,d){let e=c instanceof eD,f=e?d:c;return new a({type:"tuple",items:b,rest:e?c:null,...cu(f)})}function hH(a,b,c,d){return new a({type:"record",keyType:b,valueType:c,...cu(d)})}function hI(a,b,c,d){return new a({type:"map",keyType:b,valueType:c,...cu(d)})}function hJ(a,b,c){return new a({type:"set",valueType:b,...cu(c)})}function hK(a,b,c){return new a({type:"enum",entries:Array.isArray(b)?Object.fromEntries(b.map(a=>[a,a])):b,...cu(c)})}function hL(a,b,c){return new a({type:"enum",entries:b,...cu(c)})}function hM(a,b,c){return new a({type:"literal",values:Array.isArray(b)?b:[b],...cu(c)})}function hN(a,b){return new a({type:"file",...cu(b)})}function hO(a,b){return new a({type:"transform",transform:b})}function hP(a,b){return new a({type:"optional",innerType:b})}function hQ(a,b){return new a({type:"nullable",innerType:b})}function hR(a,b,c){return new a({type:"default",innerType:b,get defaultValue(){return"function"==typeof c?c():co(c)}})}function hS(a,b,c){return new a({type:"nonoptional",innerType:b,...cu(c)})}function hT(a,b){return new a({type:"success",innerType:b})}function hU(a,b,c){return new a({type:"catch",innerType:b,catchValue:"function"==typeof c?c:()=>c})}function hV(a,b,c){return new a({type:"pipe",in:b,out:c})}function hW(a,b){return new a({type:"readonly",innerType:b})}function hX(a,b,c){return new a({type:"template_literal",parts:b,...cu(c)})}function hY(a,b){return new a({type:"lazy",getter:b})}function hZ(a,b){return new a({type:"promise",innerType:b})}function h$(a,b,c){let d=cu(c);return d.abort??(d.abort=!0),new a({type:"custom",check:"custom",fn:b,...d})}function h_(a,b,c){return new a({type:"custom",check:"custom",fn:b,...cu(c)})}function h0(a){let b=h1(c=>(c.addIssue=a=>{"string"==typeof a?c.issues.push(cO(a,c.value,b._zod.def)):(a.fatal&&(a.continue=!1),a.code??(a.code="custom"),a.input??(a.input=c.value),a.inst??(a.inst=b),a.continue??(a.continue=!b._zod.def.abort),c.issues.push(cO(a)))},a(c.value,c)));return b}function h1(a,b){let c=new ed({check:"custom",...cu(b)});return c._zod.check=a,c}function h2(a){let b=new ed({check:"describe"});return b._zod.onattach=[b=>{let c=gi.get(b)??{};gi.add(b,{...c,description:a})}],b._zod.check=()=>{},b}function h3(a){let b=new ed({check:"meta"});return b._zod.onattach=[b=>{let c=gi.get(b)??{};gi.add(b,{...c,...a})}],b._zod.check=()=>{},b}function h4(a,b){let c=cu(b),d=c.truthy??["true","1","yes","on","y","enabled"],e=c.falsy??["false","0","no","off","n","disabled"];"sensitive"!==c.case&&(d=d.map(a=>"string"==typeof a?a.toLowerCase():a),e=e.map(a=>"string"==typeof a?a.toLowerCase():a));let f=new Set(d),g=new Set(e),h=a.Codec??fW,i=a.Boolean??e8,j=new h({type:"pipe",in:new(a.String??eE)({type:"string",error:c.error}),out:new i({type:"boolean",error:c.error}),transform:(a,b)=>{let d=a;return"sensitive"!==c.case&&(d=d.toLowerCase()),!!f.has(d)||!g.has(d)&&(b.issues.push({code:"invalid_value",expected:"stringbool",values:[...f,...g],input:b.value,inst:j,continue:!1}),{})},reverseTransform:(a,b)=>!0===a?d[0]||"true":e[0]||"false",error:c.error});return j}function h5(a,b,c,d={}){let e=cu(d),f={...cu(d),check:"string_format",type:"string",format:b,fn:"function"==typeof c?c:a=>c.test(a),...e};return c instanceof RegExp&&(f.pattern=c),new a(f)}function h6(a){let b=a?.target??"draft-2020-12";return"draft-4"===b&&(b="draft-04"),"draft-7"===b&&(b="draft-07"),{processors:a.processors??{},metadataRegistry:a?.metadata??gi,target:b,unrepresentable:a?.unrepresentable??"throw",override:a?.override??(()=>{}),io:a?.io??"output",counter:0,seen:new Map,cycles:a?.cycles??"ref",reused:a?.reused??"inline",external:a?.external??void 0}}function h7(a,b,c={path:[],schemaPath:[]}){var d;let e=a._zod.def,f=b.seen.get(a);if(f)return f.count++,c.schemaPath.includes(a)&&(f.cycle=c.path),f.schema;let g={schema:{},count:1,cycle:void 0,path:c.path};b.seen.set(a,g);let h=a._zod.toJSONSchema?.();if(h)g.schema=h;else{let d={...c,schemaPath:[...c.schemaPath,a],path:c.path};if(a._zod.processJSONSchema)a._zod.processJSONSchema(b,g.schema,d);else{let c=g.schema,f=b.processors[e.type];if(!f)throw Error(`[toJSONSchema]: Non-representable type encountered: ${e.type}`);f(a,b,c,d)}let f=a._zod.parent;f&&(g.ref||(g.ref=f),h7(f,b,d),b.seen.get(f).isParent=!0)}let i=b.metadataRegistry.get(a);return i&&Object.assign(g.schema,i),"input"===b.io&&function a(b,c){let d=c??{seen:new Set};if(d.seen.has(b))return!1;d.seen.add(b);let e=b._zod.def;if("transform"===e.type)return!0;if("array"===e.type)return a(e.element,d);if("set"===e.type)return a(e.valueType,d);if("lazy"===e.type)return a(e.getter(),d);if("promise"===e.type||"optional"===e.type||"nonoptional"===e.type||"nullable"===e.type||"readonly"===e.type||"default"===e.type||"prefault"===e.type)return a(e.innerType,d);if("intersection"===e.type)return a(e.left,d)||a(e.right,d);if("record"===e.type||"map"===e.type)return a(e.keyType,d)||a(e.valueType,d);if("pipe"===e.type)return a(e.in,d)||a(e.out,d);if("object"===e.type){for(let b in e.shape)if(a(e.shape[b],d))return!0;return!1}if("union"===e.type){for(let b of e.options)if(a(b,d))return!0;return!1}if("tuple"===e.type){for(let b of e.items)if(a(b,d))return!0;if(e.rest&&a(e.rest,d))return!0}return!1}(a)&&(delete g.schema.examples,delete g.schema.default),"input"===b.io&&g.schema._prefault&&((d=g.schema).default??(d.default=g.schema._prefault)),delete g.schema._prefault,b.seen.get(a).schema}function h8(a,b){let c=a.seen.get(b);if(!c)throw Error("Unprocessed schema. This is a bug in Zod.");let d=new Map;for(let b of a.seen.entries()){let c=a.metadataRegistry.get(b[0])?.id;if(c){let a=d.get(c);if(a&&a!==b[0])throw Error(`Duplicate schema id "${c}" detected during JSON Schema conversion. Two different schemas cannot share the same id when converted together.`);d.set(c,b[0])}}let e=b=>{if(b[1].schema.$ref)return;let d=b[1],{ref:e,defId:f}=(b=>{let d="draft-2020-12"===a.target?"$defs":"definitions";if(a.external){let c=a.external.registry.get(b[0])?.id,e=a.external.uri??(a=>a);if(c)return{ref:e(c)};let f=b[1].defId??b[1].schema.id??`schema${a.counter++}`;return b[1].defId=f,{defId:f,ref:`${e("__shared")}#/${d}/${f}`}}if(b[1]===c)return{ref:"#"};let e=`#/${d}/`,f=b[1].schema.id??`__schema${a.counter++}`;return{defId:f,ref:e+f}})(b);d.def={...d.schema},f&&(d.defId=f);let g=d.schema;for(let a in g)delete g[a];g.$ref=e};if("throw"===a.cycles)for(let b of a.seen.entries()){let a=b[1];if(a.cycle)throw Error(`Cycle detected: #/${a.cycle?.join("/")}/<root>

Set the \`cycles\` parameter to \`"ref"\` to resolve cyclical schemas with defs.`)}for(let c of a.seen.entries()){let d=c[1];if(b===c[0]){e(c);continue}if(a.external){let d=a.external.registry.get(c[0])?.id;if(b!==c[0]&&d){e(c);continue}}if(a.metadataRegistry.get(c[0])?.id||d.cycle||d.count>1&&"ref"===a.reused){e(c);continue}}}function h9(a,b){let c=a.seen.get(b);if(!c)throw Error("Unprocessed schema. This is a bug in Zod.");let d=b=>{let c=a.seen.get(b);if(null===c.ref)return;let e=c.def??c.schema,f={...e},g=c.ref;if(c.ref=null,g){d(g);let c=a.seen.get(g),h=c.schema;if(h.$ref&&("draft-07"===a.target||"draft-04"===a.target||"openapi-3.0"===a.target)?(e.allOf=e.allOf??[],e.allOf.push(h)):Object.assign(e,h),Object.assign(e,f),b._zod.parent===g)for(let a in e)"$ref"!==a&&"allOf"!==a&&(a in f||delete e[a]);if(h.$ref)for(let a in e)"$ref"!==a&&"allOf"!==a&&a in c.def&&JSON.stringify(e[a])===JSON.stringify(c.def[a])&&delete e[a]}let h=b._zod.parent;if(h&&h!==g){d(h);let b=a.seen.get(h);if(b?.schema.$ref&&(e.$ref=b.schema.$ref,b.def))for(let a in e)"$ref"!==a&&"allOf"!==a&&a in b.def&&JSON.stringify(e[a])===JSON.stringify(b.def[a])&&delete e[a]}a.override({zodSchema:b,jsonSchema:e,path:c.path??[]})};for(let b of[...a.seen.entries()].reverse())d(b[0]);let e={};if("draft-2020-12"===a.target?e.$schema="https://json-schema.org/draft/2020-12/schema":"draft-07"===a.target?e.$schema="http://json-schema.org/draft-07/schema#":"draft-04"===a.target?e.$schema="http://json-schema.org/draft-04/schema#":a.target,a.external?.uri){let c=a.external.registry.get(b)?.id;if(!c)throw Error("Schema is missing an `id` property");e.$id=a.external.uri(c)}Object.assign(e,c.def??c.schema);let f=a.external?.defs??{};for(let b of a.seen.entries()){let a=b[1];a.def&&a.defId&&(f[a.defId]=a.def)}a.external||Object.keys(f).length>0&&("draft-2020-12"===a.target?e.$defs=f:e.definitions=f);try{let c=JSON.parse(JSON.stringify(e));return Object.defineProperty(c,"~standard",{value:{...b["~standard"],jsonSchema:{input:ib(b,"input",a.processors),output:ib(b,"output",a.processors)}},enumerable:!1,writable:!1}),c}catch(a){throw Error("Error converting schema to JSON.")}}a.s(["TimePrecision",0,gI,"_any",()=>g1,"_array",()=>hB,"_base64",()=>gE,"_base64url",()=>gF,"_bigint",()=>gW,"_boolean",()=>gU,"_catch",()=>hU,"_check",()=>h1,"_cidrv4",()=>gC,"_cidrv6",()=>gD,"_coercedBigint",()=>gX,"_coercedBoolean",()=>gV,"_coercedDate",()=>g6,"_coercedNumber",()=>gO,"_coercedString",()=>gk,"_cuid",()=>gu,"_cuid2",()=>gv,"_custom",()=>h$,"_date",()=>g5,"_default",()=>hR,"_discriminatedUnion",()=>hE,"_e164",()=>gG,"_email",()=>gl,"_emoji",()=>gs,"_endsWith",()=>hs,"_enum",()=>hK,"_file",()=>hN,"_float32",()=>gQ,"_float64",()=>gR,"_gt",()=>ha,"_gte",()=>hb,"_guid",()=>gm,"_includes",()=>hq,"_int",()=>gP,"_int32",()=>gS,"_int64",()=>gY,"_intersection",()=>hF,"_ipv4",()=>gz,"_ipv6",()=>gA,"_isoDate",()=>gK,"_isoDateTime",()=>gJ,"_isoDuration",()=>gM,"_isoTime",()=>gL,"_jwt",()=>gH,"_ksuid",()=>gy,"_lazy",()=>hY,"_length",()=>hm,"_literal",()=>hM,"_lowercase",()=>ho,"_lt",()=>g8,"_lte",()=>g9,"_mac",()=>gB,"_map",()=>hI,"_max",()=>g9,"_maxLength",()=>hk,"_maxSize",()=>hh,"_mime",()=>hu,"_min",()=>hb,"_minLength",()=>hl,"_minSize",()=>hi,"_multipleOf",()=>hg,"_nan",()=>g7,"_nanoid",()=>gt,"_nativeEnum",()=>hL,"_negative",()=>hd,"_never",()=>g3,"_nonnegative",()=>hf,"_nonoptional",()=>hS,"_nonpositive",()=>he,"_normalize",()=>hw,"_null",()=>g0,"_nullable",()=>hQ,"_number",()=>gN,"_optional",()=>hP,"_overwrite",()=>hv,"_pipe",()=>hV,"_positive",()=>hc,"_promise",()=>hZ,"_property",()=>ht,"_readonly",()=>hW,"_record",()=>hH,"_refine",()=>h_,"_regex",()=>hn,"_set",()=>hJ,"_size",()=>hj,"_slugify",()=>hA,"_startsWith",()=>hr,"_string",()=>gj,"_stringFormat",()=>h5,"_stringbool",()=>h4,"_success",()=>hT,"_superRefine",()=>h0,"_symbol",()=>g$,"_templateLiteral",()=>hX,"_toLowerCase",()=>hy,"_toUpperCase",()=>hz,"_transform",()=>hO,"_trim",()=>hx,"_tuple",()=>hG,"_uint32",()=>gT,"_uint64",()=>gZ,"_ulid",()=>gw,"_undefined",()=>g_,"_union",()=>hC,"_unknown",()=>g2,"_uppercase",()=>hp,"_url",()=>gr,"_uuid",()=>gn,"_uuidv4",()=>go,"_uuidv6",()=>gp,"_uuidv7",()=>gq,"_void",()=>g4,"_xid",()=>gx,"_xor",()=>hD,"describe",()=>h2,"meta",()=>h3],268766);let ia=(a,b={})=>c=>{let d=h6({...c,processors:b});return h7(a,d),h8(d,a),h9(d,a)},ib=(a,b,c={})=>d=>{let{libraryOptions:e,target:f}=d??{},g=h6({...e??{},target:f,io:b,processors:c});return h7(a,g),h8(g,a),h9(g,a)};a.s(["createStandardJSONSchemaMethod",0,ib,"createToJSONSchemaMethod",0,ia,"extractDefs",()=>h8,"finalize",()=>h9,"initializeContext",()=>h6,"process",()=>h7],326886);let ic={guid:"uuid",url:"uri",datetime:"date-time",json_string:"json-string",regex:""},id=(a,b,c,d)=>{c.type="string";let{minimum:e,maximum:f,format:g,patterns:h,contentEncoding:i}=a._zod.bag;if("number"==typeof e&&(c.minLength=e),"number"==typeof f&&(c.maxLength=f),g&&(c.format=ic[g]??g,""===c.format&&delete c.format,"time"===g&&delete c.format),i&&(c.contentEncoding=i),h&&h.size>0){let a=[...h];1===a.length?c.pattern=a[0].source:a.length>1&&(c.allOf=[...a.map(a=>({..."draft-07"===b.target||"draft-04"===b.target||"openapi-3.0"===b.target?{type:"string"}:{},pattern:a.source}))])}},ie=(a,b,c,d)=>{let{minimum:e,maximum:f,format:g,multipleOf:h,exclusiveMaximum:i,exclusiveMinimum:j}=a._zod.bag;"string"==typeof g&&g.includes("int")?c.type="integer":c.type="number","number"==typeof j&&("draft-04"===b.target||"openapi-3.0"===b.target?(c.minimum=j,c.exclusiveMinimum=!0):c.exclusiveMinimum=j),"number"==typeof e&&(c.minimum=e,"number"==typeof j&&"draft-04"!==b.target&&(j>=e?delete c.minimum:delete c.exclusiveMinimum)),"number"==typeof i&&("draft-04"===b.target||"openapi-3.0"===b.target?(c.maximum=i,c.exclusiveMaximum=!0):c.exclusiveMaximum=i),"number"==typeof f&&(c.maximum=f,"number"==typeof i&&"draft-04"!==b.target&&(i<=f?delete c.maximum:delete c.exclusiveMaximum)),"number"==typeof h&&(c.multipleOf=h)},ig=(a,b,c,d)=>{c.type="boolean"},ih=(a,b,c,d)=>{if("throw"===b.unrepresentable)throw Error("BigInt cannot be represented in JSON Schema")},ii=(a,b,c,d)=>{if("throw"===b.unrepresentable)throw Error("Symbols cannot be represented in JSON Schema")},ij=(a,b,c,d)=>{"openapi-3.0"===b.target?(c.type="string",c.nullable=!0,c.enum=[null]):c.type="null"},ik=(a,b,c,d)=>{if("throw"===b.unrepresentable)throw Error("Undefined cannot be represented in JSON Schema")},il=(a,b,c,d)=>{if("throw"===b.unrepresentable)throw Error("Void cannot be represented in JSON Schema")},im=(a,b,c,d)=>{c.not={}},io=(a,b,c,d)=>{},ip=(a,b,c,d)=>{},iq=(a,b,c,d)=>{if("throw"===b.unrepresentable)throw Error("Date cannot be represented in JSON Schema")},ir=(a,b,c,d)=>{let e=b2(a._zod.def.entries);e.every(a=>"number"==typeof a)&&(c.type="number"),e.every(a=>"string"==typeof a)&&(c.type="string"),c.enum=e},is=(a,b,c,d)=>{let e=a._zod.def,f=[];for(let a of e.values)if(void 0===a){if("throw"===b.unrepresentable)throw Error("Literal `undefined` cannot be represented in JSON Schema")}else if("bigint"==typeof a)if("throw"===b.unrepresentable)throw Error("BigInt literals cannot be represented in JSON Schema");else f.push(Number(a));else f.push(a);if(0===f.length);else if(1===f.length){let a=f[0];c.type=null===a?"null":typeof a,"draft-04"===b.target||"openapi-3.0"===b.target?c.enum=[a]:c.const=a}else f.every(a=>"number"==typeof a)&&(c.type="number"),f.every(a=>"string"==typeof a)&&(c.type="string"),f.every(a=>"boolean"==typeof a)&&(c.type="boolean"),f.every(a=>null===a)&&(c.type="null"),c.enum=f},it=(a,b,c,d)=>{if("throw"===b.unrepresentable)throw Error("NaN cannot be represented in JSON Schema")},iu=(a,b,c,d)=>{let e=a._zod.pattern;if(!e)throw Error("Pattern not found in template literal");c.type="string",c.pattern=e.source},iv=(a,b,c,d)=>{let e={type:"string",format:"binary",contentEncoding:"binary"},{minimum:f,maximum:g,mime:h}=a._zod.bag;void 0!==f&&(e.minLength=f),void 0!==g&&(e.maxLength=g),h?1===h.length?(e.contentMediaType=h[0],Object.assign(c,e)):(Object.assign(c,e),c.anyOf=h.map(a=>({contentMediaType:a}))):Object.assign(c,e)},iw=(a,b,c,d)=>{c.type="boolean"},ix=(a,b,c,d)=>{if("throw"===b.unrepresentable)throw Error("Custom types cannot be represented in JSON Schema")},iy=(a,b,c,d)=>{if("throw"===b.unrepresentable)throw Error("Function types cannot be represented in JSON Schema")},iz=(a,b,c,d)=>{if("throw"===b.unrepresentable)throw Error("Transforms cannot be represented in JSON Schema")},iA=(a,b,c,d)=>{if("throw"===b.unrepresentable)throw Error("Map cannot be represented in JSON Schema")},iB=(a,b,c,d)=>{if("throw"===b.unrepresentable)throw Error("Set cannot be represented in JSON Schema")},iC=(a,b,c,d)=>{let e=a._zod.def,{minimum:f,maximum:g}=a._zod.bag;"number"==typeof f&&(c.minItems=f),"number"==typeof g&&(c.maxItems=g),c.type="array",c.items=h7(e.element,b,{...d,path:[...d.path,"items"]})},iD=(a,b,c,d)=>{let e=a._zod.def;c.type="object",c.properties={};let f=e.shape;for(let a in f)c.properties[a]=h7(f[a],b,{...d,path:[...d.path,"properties",a]});let g=new Set([...new Set(Object.keys(f))].filter(a=>{let c=e.shape[a]._zod;return"input"===b.io?void 0===c.optin:void 0===c.optout}));g.size>0&&(c.required=Array.from(g)),e.catchall?._zod.def.type==="never"?c.additionalProperties=!1:e.catchall?e.catchall&&(c.additionalProperties=h7(e.catchall,b,{...d,path:[...d.path,"additionalProperties"]})):"output"===b.io&&(c.additionalProperties=!1)},iE=(a,b,c,d)=>{let e=a._zod.def,f=!1===e.inclusive,g=e.options.map((a,c)=>h7(a,b,{...d,path:[...d.path,f?"oneOf":"anyOf",c]}));f?c.oneOf=g:c.anyOf=g},iF=(a,b,c,d)=>{let e=a._zod.def,f=h7(e.left,b,{...d,path:[...d.path,"allOf",0]}),g=h7(e.right,b,{...d,path:[...d.path,"allOf",1]}),h=a=>"allOf"in a&&1===Object.keys(a).length;c.allOf=[...h(f)?f.allOf:[f],...h(g)?g.allOf:[g]]},iG=(a,b,c,d)=>{let e=a._zod.def;c.type="array";let f="draft-2020-12"===b.target?"prefixItems":"items",g="draft-2020-12"===b.target||"openapi-3.0"===b.target?"items":"additionalItems",h=e.items.map((a,c)=>h7(a,b,{...d,path:[...d.path,f,c]})),i=e.rest?h7(e.rest,b,{...d,path:[...d.path,g,..."openapi-3.0"===b.target?[e.items.length]:[]]}):null;"draft-2020-12"===b.target?(c.prefixItems=h,i&&(c.items=i)):"openapi-3.0"===b.target?(c.items={anyOf:h},i&&c.items.anyOf.push(i),c.minItems=h.length,i||(c.maxItems=h.length)):(c.items=h,i&&(c.additionalItems=i));let{minimum:j,maximum:k}=a._zod.bag;"number"==typeof j&&(c.minItems=j),"number"==typeof k&&(c.maxItems=k)},iH=(a,b,c,d)=>{let e=a._zod.def;c.type="object";let f=e.keyType,g=f._zod.bag,h=g?.patterns;if("loose"===e.mode&&h&&h.size>0){let a=h7(e.valueType,b,{...d,path:[...d.path,"patternProperties","*"]});for(let b of(c.patternProperties={},h))c.patternProperties[b.source]=a}else("draft-07"===b.target||"draft-2020-12"===b.target)&&(c.propertyNames=h7(e.keyType,b,{...d,path:[...d.path,"propertyNames"]})),c.additionalProperties=h7(e.valueType,b,{...d,path:[...d.path,"additionalProperties"]});let i=f._zod.values;if(i){let a=[...i].filter(a=>"string"==typeof a||"number"==typeof a);a.length>0&&(c.required=a)}},iI=(a,b,c,d)=>{let e=a._zod.def,f=h7(e.innerType,b,d),g=b.seen.get(a);"openapi-3.0"===b.target?(g.ref=e.innerType,c.nullable=!0):c.anyOf=[f,{type:"null"}]},iJ=(a,b,c,d)=>{let e=a._zod.def;h7(e.innerType,b,d),b.seen.get(a).ref=e.innerType},iK=(a,b,c,d)=>{let e=a._zod.def;h7(e.innerType,b,d),b.seen.get(a).ref=e.innerType,c.default=JSON.parse(JSON.stringify(e.defaultValue))},iL=(a,b,c,d)=>{let e=a._zod.def;h7(e.innerType,b,d),b.seen.get(a).ref=e.innerType,"input"===b.io&&(c._prefault=JSON.parse(JSON.stringify(e.defaultValue)))},iM=(a,b,c,d)=>{let e,f=a._zod.def;h7(f.innerType,b,d),b.seen.get(a).ref=f.innerType;try{e=f.catchValue(void 0)}catch{throw Error("Dynamic catch values are not supported in JSON Schema")}c.default=e},iN=(a,b,c,d)=>{let e=a._zod.def,f="input"===b.io?"transform"===e.in._zod.def.type?e.out:e.in:e.out;h7(f,b,d),b.seen.get(a).ref=f},iO=(a,b,c,d)=>{let e=a._zod.def;h7(e.innerType,b,d),b.seen.get(a).ref=e.innerType,c.readOnly=!0},iP=(a,b,c,d)=>{let e=a._zod.def;h7(e.innerType,b,d),b.seen.get(a).ref=e.innerType},iQ=(a,b,c,d)=>{let e=a._zod.def;h7(e.innerType,b,d),b.seen.get(a).ref=e.innerType},iR=(a,b,c,d)=>{let e=a._zod.innerType;h7(e,b,d),b.seen.get(a).ref=e},iS={string:id,number:ie,boolean:ig,bigint:ih,symbol:ii,null:ij,undefined:ik,void:il,never:im,any:io,unknown:ip,date:iq,enum:ir,literal:is,nan:it,template_literal:iu,file:iv,success:iw,custom:ix,function:iy,transform:iz,map:iA,set:iB,array:iC,object:iD,union:iE,intersection:iF,tuple:iG,record:iH,nullable:iI,nonoptional:iJ,default:iK,prefault:iL,catch:iM,pipe:iN,readonly:iO,promise:iP,optional:iQ,lazy:iR};function iT(a,b){if("_idmap"in a){let c=h6({...b,processors:iS}),d={};for(let b of a._idmap.entries()){let[a,d]=b;h7(d,c)}let e={};for(let f of(c.external={registry:a,uri:b?.uri,defs:d},a._idmap.entries())){let[a,b]=f;h8(c,b),e[a]=h9(c,b)}return Object.keys(d).length>0&&(e.__shared={["draft-2020-12"===c.target?"$defs":"definitions"]:d}),{schemas:e}}let c=h6({...b,processors:iS});return h7(a,c),h8(c,a),h9(c,a)}class iU{get metadataRegistry(){return this.ctx.metadataRegistry}get target(){return this.ctx.target}get unrepresentable(){return this.ctx.unrepresentable}get override(){return this.ctx.override}get io(){return this.ctx.io}get counter(){return this.ctx.counter}set counter(a){this.ctx.counter=a}get seen(){return this.ctx.seen}constructor(a){let b=a?.target??"draft-2020-12";"draft-4"===b&&(b="draft-04"),"draft-7"===b&&(b="draft-07"),this.ctx=h6({processors:iS,target:b,...a?.metadata&&{metadata:a.metadata},...a?.unrepresentable&&{unrepresentable:a.unrepresentable},...a?.override&&{override:a.override},...a?.io&&{io:a.io}})}process(a,b={path:[],schemaPath:[]}){return h7(a,this.ctx,b)}emit(a,b){b&&(b.cycles&&(this.ctx.cycles=b.cycles),b.reused&&(this.ctx.reused=b.reused),b.external&&(this.ctx.external=b.external)),h8(this.ctx,a);let{"~standard":c,...d}=h9(this.ctx,a);return d}}a.s([],168567),a.s([],276019),a.s(["ZodAny",()=>kt,"ZodArray",()=>kD,"ZodBase64",()=>jX,"ZodBase64URL",()=>jZ,"ZodBigInt",()=>ki,"ZodBigIntFormat",()=>kk,"ZodBoolean",()=>kg,"ZodCIDRv4",()=>jT,"ZodCIDRv6",()=>jV,"ZodCUID",()=>jD,"ZodCUID2",()=>jF,"ZodCatch",()=>lo,"ZodCodec",()=>lu,"ZodCustom",()=>lG,"ZodCustomStringFormat",()=>j3,"ZodDate",()=>kB,"ZodDefault",()=>lg,"ZodDiscriminatedUnion",()=>kO,"ZodE164",()=>j_,"ZodEmail",()=>jn,"ZodEmoji",()=>jz,"ZodEnum",()=>k0,"ZodExactOptional",()=>lb,"ZodFile",()=>k5,"ZodFunction",()=>lE,"ZodGUID",()=>jp,"ZodIPv4",()=>jN,"ZodIPv6",()=>jR,"ZodIntersection",()=>kQ,"ZodJWT",()=>j1,"ZodKSUID",()=>jL,"ZodLazy",()=>lA,"ZodLiteral",()=>k3,"ZodMAC",()=>jP,"ZodMap",()=>kY,"ZodNaN",()=>lq,"ZodNanoID",()=>jB,"ZodNever",()=>kx,"ZodNonOptional",()=>lk,"ZodNull",()=>kr,"ZodNullable",()=>ld,"ZodNumber",()=>j8,"ZodNumberFormat",()=>ka,"ZodObject",()=>kG,"ZodOptional",()=>k9,"ZodPipe",()=>ls,"ZodPrefault",()=>li,"ZodPromise",()=>lC,"ZodReadonly",()=>lw,"ZodRecord",()=>kU,"ZodSet",()=>k$,"ZodString",()=>jk,"ZodStringFormat",()=>jm,"ZodSuccess",()=>lm,"ZodSymbol",()=>kn,"ZodTemplateLiteral",()=>ly,"ZodTransform",()=>k7,"ZodTuple",()=>kS,"ZodType",()=>ji,"ZodULID",()=>jH,"ZodURL",()=>jw,"ZodUUID",()=>jr,"ZodUndefined",()=>kp,"ZodUnion",()=>kK,"ZodUnknown",()=>kv,"ZodVoid",()=>kz,"ZodXID",()=>jJ,"ZodXor",()=>kM,"_ZodString",()=>jj,"_default",()=>lh,"_function",()=>lF,"any",()=>ku,"array",()=>kE,"base64",()=>jY,"base64url",()=>j$,"bigint",()=>kj,"boolean",()=>kh,"catch",()=>lp,"check",()=>lH,"cidrv4",()=>jU,"cidrv6",()=>jW,"codec",()=>lv,"cuid",()=>jE,"cuid2",()=>jG,"custom",()=>lI,"date",()=>kC,"describe",()=>lL,"discriminatedUnion",()=>kP,"e164",()=>j0,"email",()=>jo,"emoji",()=>jA,"enum",()=>k1,"exactOptional",()=>lc,"file",()=>k6,"float32",()=>kc,"float64",()=>kd,"function",()=>lF,"guid",()=>jq,"hash",()=>j7,"hex",()=>j6,"hostname",()=>j5,"httpUrl",()=>jy,"instanceof",()=>lN,"int",()=>kb,"int32",()=>ke,"int64",()=>kl,"intersection",()=>kR,"ipv4",()=>jO,"ipv6",()=>jS,"json",()=>lP,"jwt",()=>j2,"keyof",()=>kF,"ksuid",()=>jM,"lazy",()=>lB,"literal",()=>k4,"looseObject",()=>kJ,"looseRecord",()=>kX,"mac",()=>jQ,"map",()=>kZ,"meta",()=>lM,"nan",()=>lr,"nanoid",()=>jC,"nativeEnum",()=>k2,"never",()=>ky,"nonoptional",()=>ll,"null",()=>ks,"nullable",()=>le,"nullish",()=>lf,"number",()=>j9,"object",()=>kH,"optional",()=>la,"partialRecord",()=>kW,"pipe",()=>lt,"prefault",()=>lj,"preprocess",()=>lQ,"promise",()=>lD,"readonly",()=>lx,"record",()=>kV,"refine",()=>lJ,"set",()=>k_,"strictObject",()=>kI,"string",()=>jl,"stringFormat",()=>j4,"stringbool",()=>lO,"success",()=>ln,"superRefine",()=>lK,"symbol",()=>ko,"templateLiteral",()=>lz,"transform",()=>k8,"tuple",()=>kT,"uint32",()=>kf,"uint64",()=>km,"ulid",()=>jI,"undefined",()=>kq,"union",()=>kL,"unknown",()=>kw,"url",()=>jx,"uuid",()=>js,"uuidv4",()=>jt,"uuidv6",()=>ju,"uuidv7",()=>jv,"void",()=>kA,"xid",()=>jK,"xor",()=>kN],657177),a.i(786691),a.s(["$ZodAny",0,fe,"$ZodArray",0,fk,"$ZodBase64",0,e_,"$ZodBase64URL",0,e1,"$ZodBigInt",0,e9,"$ZodBigIntFormat",0,fa,"$ZodBoolean",0,e8,"$ZodCIDRv4",0,eY,"$ZodCIDRv6",0,eZ,"$ZodCUID",0,eM,"$ZodCUID2",0,eN,"$ZodCatch",0,fS,"$ZodCodec",0,fW,"$ZodCustom",0,f3,"$ZodCustomStringFormat",0,e5,"$ZodDate",0,fi,"$ZodDefault",0,fM,"$ZodDiscriminatedUnion",0,fu,"$ZodE164",0,e2,"$ZodEmail",0,eI,"$ZodEmoji",0,eK,"$ZodEnum",0,fE,"$ZodExactOptional",0,fK,"$ZodFile",0,fG,"$ZodFunction",0,f0,"$ZodGUID",0,eG,"$ZodIPv4",0,eV,"$ZodIPv6",0,eW,"$ZodISODate",0,eS,"$ZodISODateTime",0,eR,"$ZodISODuration",0,eU,"$ZodISOTime",0,eT,"$ZodIntersection",0,fv,"$ZodJWT",0,e4,"$ZodKSUID",0,eQ,"$ZodLazy",0,f2,"$ZodLiteral",0,fF,"$ZodMAC",0,eX,"$ZodMap",0,fA,"$ZodNaN",0,fT,"$ZodNanoID",0,eL,"$ZodNever",0,fg,"$ZodNonOptional",0,fP,"$ZodNull",0,fd,"$ZodNullable",0,fL,"$ZodNumber",0,e6,"$ZodNumberFormat",0,e7,"$ZodObject",0,fo,"$ZodObjectJIT",0,fp,"$ZodOptional",0,fJ,"$ZodPipe",0,fU,"$ZodPrefault",0,fO,"$ZodPromise",0,f1,"$ZodReadonly",0,fZ,"$ZodRecord",0,fz,"$ZodSet",0,fC,"$ZodString",0,eE,"$ZodStringFormat",0,eF,"$ZodSuccess",0,fR,"$ZodSymbol",0,fb,"$ZodTemplateLiteral",0,f_,"$ZodTransform",0,fH,"$ZodTuple",0,fx,"$ZodType",0,eD,"$ZodULID",0,eO,"$ZodURL",0,eJ,"$ZodUUID",0,eH,"$ZodUndefined",0,fc,"$ZodUnion",0,fr,"$ZodUnknown",0,ff,"$ZodVoid",0,fh,"$ZodXID",0,eP,"$ZodXor",0,ft,"clone",()=>ct,"isValidBase64",()=>e$,"isValidBase64URL",()=>e0,"isValidJWT",()=>e3],967594);var iV=a.i(79323),iV=iV,iW=a.i(691622),iW=iW;a.s([],850183),a.s(["ZodISODate",()=>iZ,"ZodISODateTime",()=>iX,"ZodISODuration",()=>i1,"ZodISOTime",()=>i_,"date",()=>i$,"datetime",()=>iY,"duration",()=>i2,"time",()=>i0],801117);let iX=bT("ZodISODateTime",(a,b)=>{eR.init(a,b),jm.init(a,b)});function iY(a){return gJ(iX,a)}let iZ=bT("ZodISODate",(a,b)=>{eS.init(a,b),jm.init(a,b)});function i$(a){return gK(iZ,a)}let i_=bT("ZodISOTime",(a,b)=>{eT.init(a,b),jm.init(a,b)});function i0(a){return gL(i_,a)}let i1=bT("ZodISODuration",(a,b)=>{eU.init(a,b),jm.init(a,b)});function i2(a){return gM(i1,a)}let i3=(a,b)=>{cY.init(a,b),a.name="ZodError",Object.defineProperties(a,{format:{value:b=>c_(a,b)},flatten:{value:b=>c$(a,b)},addIssue:{value:b=>{a.issues.push(b),a.message=JSON.stringify(a.issues,b4,2)}},addIssues:{value:b=>{a.issues.push(...b),a.message=JSON.stringify(a.issues,b4,2)}},isEmpty:{get:()=>0===a.issues.length}})},i4=bT("ZodError",i3),i5=bT("ZodError",i3,{Parent:Error});a.s(["ZodError",0,i4,"ZodRealError",0,i5],158269);let i6=c3(i5),i7=c5(i5),i8=c7(i5),i9=c9(i5),ja=db(i5),jb=dd(i5),jc=df(i5),jd=dh(i5),je=dj(i5),jf=dl(i5),jg=dn(i5),jh=dq(i5);a.s(["decode",0,jb,"decodeAsync",0,jd,"encode",0,ja,"encodeAsync",0,jc,"parse",0,i6,"parseAsync",0,i7,"safeDecode",0,jf,"safeDecodeAsync",0,jh,"safeEncode",0,je,"safeEncodeAsync",0,jg,"safeParse",0,i8,"safeParseAsync",0,i9],349372);let ji=bT("ZodType",(a,b)=>(eD.init(a,b),Object.assign(a["~standard"],{jsonSchema:{input:ib(a,"input"),output:ib(a,"output")}}),a.toJSONSchema=ia(a,{}),a.def=b,a.type=b.type,Object.defineProperty(a,"_def",{value:b}),a.check=(...c)=>a.clone(iW.mergeDefs(b,{checks:[...b.checks??[],...c.map(a=>"function"==typeof a?{_zod:{check:a,def:{check:"custom"},onattach:[]}}:a)]}),{parent:!0}),a.with=a.check,a.clone=(b,c)=>ct(a,b,c),a.brand=()=>a,a.register=(b,c)=>(b.add(a,c),a),a.parse=(b,c)=>i6(a,b,c,{callee:a.parse}),a.safeParse=(b,c)=>i8(a,b,c),a.parseAsync=async(b,c)=>i7(a,b,c,{callee:a.parseAsync}),a.safeParseAsync=async(b,c)=>i9(a,b,c),a.spa=a.safeParseAsync,a.encode=(b,c)=>ja(a,b,c),a.decode=(b,c)=>jb(a,b,c),a.encodeAsync=async(b,c)=>jc(a,b,c),a.decodeAsync=async(b,c)=>jd(a,b,c),a.safeEncode=(b,c)=>je(a,b,c),a.safeDecode=(b,c)=>jf(a,b,c),a.safeEncodeAsync=async(b,c)=>jg(a,b,c),a.safeDecodeAsync=async(b,c)=>jh(a,b,c),a.refine=(b,c)=>a.check(lJ(b,c)),a.superRefine=b=>a.check(h0(b)),a.overwrite=b=>a.check(hv(b)),a.optional=()=>la(a),a.exactOptional=()=>lc(a),a.nullable=()=>le(a),a.nullish=()=>la(le(a)),a.nonoptional=b=>ll(a,b),a.array=()=>kE(a),a.or=b=>kL([a,b]),a.and=b=>kR(a,b),a.transform=b=>lt(a,k8(b)),a.default=b=>lh(a,b),a.prefault=b=>lj(a,b),a.catch=b=>lp(a,b),a.pipe=b=>lt(a,b),a.readonly=()=>lx(a),a.describe=b=>{let c=a.clone();return gi.add(c,{description:b}),c},Object.defineProperty(a,"description",{get:()=>gi.get(a)?.description,configurable:!0}),a.meta=(...b)=>{if(0===b.length)return gi.get(a);let c=a.clone();return gi.add(c,b[0]),c},a.isOptional=()=>a.safeParse(void 0).success,a.isNullable=()=>a.safeParse(null).success,a.apply=b=>b(a),a)),jj=bT("_ZodString",(a,b)=>{eE.init(a,b),ji.init(a,b),a._zod.processJSONSchema=(b,c,d)=>id(a,b,c,d);let c=a._zod.bag;a.format=c.format??null,a.minLength=c.minimum??null,a.maxLength=c.maximum??null,a.regex=(...b)=>a.check(hn(...b)),a.includes=(...b)=>a.check(hq(...b)),a.startsWith=(...b)=>a.check(hr(...b)),a.endsWith=(...b)=>a.check(hs(...b)),a.min=(...b)=>a.check(hl(...b)),a.max=(...b)=>a.check(hk(...b)),a.length=(...b)=>a.check(hm(...b)),a.nonempty=(...b)=>a.check(hl(1,...b)),a.lowercase=b=>a.check(ho(b)),a.uppercase=b=>a.check(hp(b)),a.trim=()=>a.check(hx()),a.normalize=(...b)=>a.check(hw(...b)),a.toLowerCase=()=>a.check(hy()),a.toUpperCase=()=>a.check(hz()),a.slugify=()=>a.check(hA())}),jk=bT("ZodString",(a,b)=>{eE.init(a,b),jj.init(a,b),a.email=b=>a.check(gl(jn,b)),a.url=b=>a.check(gr(jw,b)),a.jwt=b=>a.check(gH(j1,b)),a.emoji=b=>a.check(gs(jz,b)),a.guid=b=>a.check(gm(jp,b)),a.uuid=b=>a.check(gn(jr,b)),a.uuidv4=b=>a.check(go(jr,b)),a.uuidv6=b=>a.check(gp(jr,b)),a.uuidv7=b=>a.check(gq(jr,b)),a.nanoid=b=>a.check(gt(jB,b)),a.guid=b=>a.check(gm(jp,b)),a.cuid=b=>a.check(gu(jD,b)),a.cuid2=b=>a.check(gv(jF,b)),a.ulid=b=>a.check(gw(jH,b)),a.base64=b=>a.check(gE(jX,b)),a.base64url=b=>a.check(gF(jZ,b)),a.xid=b=>a.check(gx(jJ,b)),a.ksuid=b=>a.check(gy(jL,b)),a.ipv4=b=>a.check(gz(jN,b)),a.ipv6=b=>a.check(gA(jR,b)),a.cidrv4=b=>a.check(gC(jT,b)),a.cidrv6=b=>a.check(gD(jV,b)),a.e164=b=>a.check(gG(j_,b)),a.datetime=b=>a.check(iY(b)),a.date=b=>a.check(i$(b)),a.time=b=>a.check(i0(b)),a.duration=b=>a.check(i2(b))});function jl(a){return gj(jk,a)}let jm=bT("ZodStringFormat",(a,b)=>{eF.init(a,b),jj.init(a,b)}),jn=bT("ZodEmail",(a,b)=>{eI.init(a,b),jm.init(a,b)});function jo(a){return gl(jn,a)}let jp=bT("ZodGUID",(a,b)=>{eG.init(a,b),jm.init(a,b)});function jq(a){return gm(jp,a)}let jr=bT("ZodUUID",(a,b)=>{eH.init(a,b),jm.init(a,b)});function js(a){return gn(jr,a)}function jt(a){return go(jr,a)}function ju(a){return gp(jr,a)}function jv(a){return gq(jr,a)}let jw=bT("ZodURL",(a,b)=>{eJ.init(a,b),jm.init(a,b)});function jx(a){return gr(jw,a)}function jy(a){return gr(jw,{protocol:/^https?$/,hostname:iV.domain,...iW.normalizeParams(a)})}let jz=bT("ZodEmoji",(a,b)=>{eK.init(a,b),jm.init(a,b)});function jA(a){return gs(jz,a)}let jB=bT("ZodNanoID",(a,b)=>{eL.init(a,b),jm.init(a,b)});function jC(a){return gt(jB,a)}let jD=bT("ZodCUID",(a,b)=>{eM.init(a,b),jm.init(a,b)});function jE(a){return gu(jD,a)}let jF=bT("ZodCUID2",(a,b)=>{eN.init(a,b),jm.init(a,b)});function jG(a){return gv(jF,a)}let jH=bT("ZodULID",(a,b)=>{eO.init(a,b),jm.init(a,b)});function jI(a){return gw(jH,a)}let jJ=bT("ZodXID",(a,b)=>{eP.init(a,b),jm.init(a,b)});function jK(a){return gx(jJ,a)}let jL=bT("ZodKSUID",(a,b)=>{eQ.init(a,b),jm.init(a,b)});function jM(a){return gy(jL,a)}let jN=bT("ZodIPv4",(a,b)=>{eV.init(a,b),jm.init(a,b)});function jO(a){return gz(jN,a)}let jP=bT("ZodMAC",(a,b)=>{eX.init(a,b),jm.init(a,b)});function jQ(a){return gB(jP,a)}let jR=bT("ZodIPv6",(a,b)=>{eW.init(a,b),jm.init(a,b)});function jS(a){return gA(jR,a)}let jT=bT("ZodCIDRv4",(a,b)=>{eY.init(a,b),jm.init(a,b)});function jU(a){return gC(jT,a)}let jV=bT("ZodCIDRv6",(a,b)=>{eZ.init(a,b),jm.init(a,b)});function jW(a){return gD(jV,a)}let jX=bT("ZodBase64",(a,b)=>{e_.init(a,b),jm.init(a,b)});function jY(a){return gE(jX,a)}let jZ=bT("ZodBase64URL",(a,b)=>{e1.init(a,b),jm.init(a,b)});function j$(a){return gF(jZ,a)}let j_=bT("ZodE164",(a,b)=>{e2.init(a,b),jm.init(a,b)});function j0(a){return gG(j_,a)}let j1=bT("ZodJWT",(a,b)=>{e4.init(a,b),jm.init(a,b)});function j2(a){return gH(j1,a)}let j3=bT("ZodCustomStringFormat",(a,b)=>{e5.init(a,b),jm.init(a,b)});function j4(a,b,c={}){return h5(j3,a,b,c)}function j5(a){return h5(j3,"hostname",iV.hostname,a)}function j6(a){return h5(j3,"hex",iV.hex,a)}function j7(a,b){let c=b?.enc??"hex",d=`${a}_${c}`,e=iV[d];if(!e)throw Error(`Unrecognized hash format: ${d}`);return h5(j3,d,e,b)}let j8=bT("ZodNumber",(a,b)=>{e6.init(a,b),ji.init(a,b),a._zod.processJSONSchema=(b,c,d)=>ie(a,b,c,d),a.gt=(b,c)=>a.check(ha(b,c)),a.gte=(b,c)=>a.check(hb(b,c)),a.min=(b,c)=>a.check(hb(b,c)),a.lt=(b,c)=>a.check(g8(b,c)),a.lte=(b,c)=>a.check(g9(b,c)),a.max=(b,c)=>a.check(g9(b,c)),a.int=b=>a.check(kb(b)),a.safe=b=>a.check(kb(b)),a.positive=b=>a.check(ha(0,b)),a.nonnegative=b=>a.check(hb(0,b)),a.negative=b=>a.check(g8(0,b)),a.nonpositive=b=>a.check(g9(0,b)),a.multipleOf=(b,c)=>a.check(hg(b,c)),a.step=(b,c)=>a.check(hg(b,c)),a.finite=()=>a;let c=a._zod.bag;a.minValue=Math.max(c.minimum??-1/0,c.exclusiveMinimum??-1/0)??null,a.maxValue=Math.min(c.maximum??1/0,c.exclusiveMaximum??1/0)??null,a.isInt=(c.format??"").includes("int")||Number.isSafeInteger(c.multipleOf??.5),a.isFinite=!0,a.format=c.format??null});function j9(a){return gN(j8,a)}let ka=bT("ZodNumberFormat",(a,b)=>{e7.init(a,b),j8.init(a,b)});function kb(a){return gP(ka,a)}function kc(a){return gQ(ka,a)}function kd(a){return gR(ka,a)}function ke(a){return gS(ka,a)}function kf(a){return gT(ka,a)}let kg=bT("ZodBoolean",(a,b)=>{e8.init(a,b),ji.init(a,b),a._zod.processJSONSchema=(b,c,d)=>ig(a,b,c,d)});function kh(a){return gU(kg,a)}let ki=bT("ZodBigInt",(a,b)=>{e9.init(a,b),ji.init(a,b),a._zod.processJSONSchema=(b,c,d)=>ih(a,b,c,d),a.gte=(b,c)=>a.check(hb(b,c)),a.min=(b,c)=>a.check(hb(b,c)),a.gt=(b,c)=>a.check(ha(b,c)),a.gte=(b,c)=>a.check(hb(b,c)),a.min=(b,c)=>a.check(hb(b,c)),a.lt=(b,c)=>a.check(g8(b,c)),a.lte=(b,c)=>a.check(g9(b,c)),a.max=(b,c)=>a.check(g9(b,c)),a.positive=b=>a.check(ha(BigInt(0),b)),a.negative=b=>a.check(g8(BigInt(0),b)),a.nonpositive=b=>a.check(g9(BigInt(0),b)),a.nonnegative=b=>a.check(hb(BigInt(0),b)),a.multipleOf=(b,c)=>a.check(hg(b,c));let c=a._zod.bag;a.minValue=c.minimum??null,a.maxValue=c.maximum??null,a.format=c.format??null});function kj(a){return gW(ki,a)}let kk=bT("ZodBigIntFormat",(a,b)=>{fa.init(a,b),ki.init(a,b)});function kl(a){return gY(kk,a)}function km(a){return gZ(kk,a)}let kn=bT("ZodSymbol",(a,b)=>{fb.init(a,b),ji.init(a,b),a._zod.processJSONSchema=(b,c,d)=>ii(a,b,c,d)});function ko(a){return g$(kn,a)}let kp=bT("ZodUndefined",(a,b)=>{fc.init(a,b),ji.init(a,b),a._zod.processJSONSchema=(b,c,d)=>ik(a,b,c,d)});function kq(a){return g_(kp,a)}let kr=bT("ZodNull",(a,b)=>{fd.init(a,b),ji.init(a,b),a._zod.processJSONSchema=(b,c,d)=>ij(a,b,c,d)});function ks(a){return g0(kr,a)}let kt=bT("ZodAny",(a,b)=>{fe.init(a,b),ji.init(a,b),a._zod.processJSONSchema=(b,c,d)=>io(a,b,c,d)});function ku(){return g1(kt)}let kv=bT("ZodUnknown",(a,b)=>{ff.init(a,b),ji.init(a,b),a._zod.processJSONSchema=(b,c,d)=>ip(a,b,c,d)});function kw(){return g2(kv)}let kx=bT("ZodNever",(a,b)=>{fg.init(a,b),ji.init(a,b),a._zod.processJSONSchema=(b,c,d)=>im(a,b,c,d)});function ky(a){return g3(kx,a)}let kz=bT("ZodVoid",(a,b)=>{fh.init(a,b),ji.init(a,b),a._zod.processJSONSchema=(b,c,d)=>il(a,b,c,d)});function kA(a){return g4(kz,a)}let kB=bT("ZodDate",(a,b)=>{fi.init(a,b),ji.init(a,b),a._zod.processJSONSchema=(b,c,d)=>iq(a,b,c,d),a.min=(b,c)=>a.check(hb(b,c)),a.max=(b,c)=>a.check(g9(b,c));let c=a._zod.bag;a.minDate=c.minimum?new Date(c.minimum):null,a.maxDate=c.maximum?new Date(c.maximum):null});function kC(a){return g5(kB,a)}let kD=bT("ZodArray",(a,b)=>{fk.init(a,b),ji.init(a,b),a._zod.processJSONSchema=(b,c,d)=>iC(a,b,c,d),a.element=b.element,a.min=(b,c)=>a.check(hl(b,c)),a.nonempty=b=>a.check(hl(1,b)),a.max=(b,c)=>a.check(hk(b,c)),a.length=(b,c)=>a.check(hm(b,c)),a.unwrap=()=>a.element});function kE(a,b){return hB(kD,a,b)}function kF(a){return k1(Object.keys(a._zod.def.shape))}let kG=bT("ZodObject",(a,b)=>{fp.init(a,b),ji.init(a,b),a._zod.processJSONSchema=(b,c,d)=>iD(a,b,c,d),iW.defineLazy(a,"shape",()=>b.shape),a.keyof=()=>k1(Object.keys(a._zod.def.shape)),a.catchall=b=>a.clone({...a._zod.def,catchall:b}),a.passthrough=()=>a.clone({...a._zod.def,catchall:kw()}),a.loose=()=>a.clone({...a._zod.def,catchall:kw()}),a.strict=()=>a.clone({...a._zod.def,catchall:ky()}),a.strip=()=>a.clone({...a._zod.def,catchall:void 0}),a.extend=b=>iW.extend(a,b),a.safeExtend=b=>iW.safeExtend(a,b),a.merge=b=>iW.merge(a,b),a.pick=b=>iW.pick(a,b),a.omit=b=>iW.omit(a,b),a.partial=(...b)=>iW.partial(k9,a,b[0]),a.required=(...b)=>iW.required(lk,a,b[0])});function kH(a,b){return new kG({type:"object",shape:a??{},...iW.normalizeParams(b)})}function kI(a,b){return new kG({type:"object",shape:a,catchall:ky(),...iW.normalizeParams(b)})}function kJ(a,b){return new kG({type:"object",shape:a,catchall:kw(),...iW.normalizeParams(b)})}let kK=bT("ZodUnion",(a,b)=>{fr.init(a,b),ji.init(a,b),a._zod.processJSONSchema=(b,c,d)=>iE(a,b,c,d),a.options=b.options});function kL(a,b){return new kK({type:"union",options:a,...iW.normalizeParams(b)})}let kM=bT("ZodXor",(a,b)=>{kK.init(a,b),ft.init(a,b),a._zod.processJSONSchema=(b,c,d)=>iE(a,b,c,d),a.options=b.options});function kN(a,b){return new kM({type:"union",options:a,inclusive:!1,...iW.normalizeParams(b)})}let kO=bT("ZodDiscriminatedUnion",(a,b)=>{kK.init(a,b),fu.init(a,b)});function kP(a,b,c){return new kO({type:"union",options:b,discriminator:a,...iW.normalizeParams(c)})}let kQ=bT("ZodIntersection",(a,b)=>{fv.init(a,b),ji.init(a,b),a._zod.processJSONSchema=(b,c,d)=>iF(a,b,c,d)});function kR(a,b){return new kQ({type:"intersection",left:a,right:b})}let kS=bT("ZodTuple",(a,b)=>{fx.init(a,b),ji.init(a,b),a._zod.processJSONSchema=(b,c,d)=>iG(a,b,c,d),a.rest=b=>a.clone({...a._zod.def,rest:b})});function kT(a,b,c){let d=b instanceof eD,e=d?c:b;return new kS({type:"tuple",items:a,rest:d?b:null,...iW.normalizeParams(e)})}let kU=bT("ZodRecord",(a,b)=>{fz.init(a,b),ji.init(a,b),a._zod.processJSONSchema=(b,c,d)=>iH(a,b,c,d),a.keyType=b.keyType,a.valueType=b.valueType});function kV(a,b,c){return new kU({type:"record",keyType:a,valueType:b,...iW.normalizeParams(c)})}function kW(a,b,c){let d=ct(a);return d._zod.values=void 0,new kU({type:"record",keyType:d,valueType:b,...iW.normalizeParams(c)})}function kX(a,b,c){return new kU({type:"record",keyType:a,valueType:b,mode:"loose",...iW.normalizeParams(c)})}let kY=bT("ZodMap",(a,b)=>{fA.init(a,b),ji.init(a,b),a._zod.processJSONSchema=(b,c,d)=>iA(a,b,c,d),a.keyType=b.keyType,a.valueType=b.valueType,a.min=(...b)=>a.check(hi(...b)),a.nonempty=b=>a.check(hi(1,b)),a.max=(...b)=>a.check(hh(...b)),a.size=(...b)=>a.check(hj(...b))});function kZ(a,b,c){return new kY({type:"map",keyType:a,valueType:b,...iW.normalizeParams(c)})}let k$=bT("ZodSet",(a,b)=>{fC.init(a,b),ji.init(a,b),a._zod.processJSONSchema=(b,c,d)=>iB(a,b,c,d),a.min=(...b)=>a.check(hi(...b)),a.nonempty=b=>a.check(hi(1,b)),a.max=(...b)=>a.check(hh(...b)),a.size=(...b)=>a.check(hj(...b))});function k_(a,b){return new k$({type:"set",valueType:a,...iW.normalizeParams(b)})}let k0=bT("ZodEnum",(a,b)=>{fE.init(a,b),ji.init(a,b),a._zod.processJSONSchema=(b,c,d)=>ir(a,b,c,d),a.enum=b.entries,a.options=Object.values(b.entries);let c=new Set(Object.keys(b.entries));a.extract=(a,d)=>{let e={};for(let d of a)if(c.has(d))e[d]=b.entries[d];else throw Error(`Key ${d} not found in enum`);return new k0({...b,checks:[],...iW.normalizeParams(d),entries:e})},a.exclude=(a,d)=>{let e={...b.entries};for(let b of a)if(c.has(b))delete e[b];else throw Error(`Key ${b} not found in enum`);return new k0({...b,checks:[],...iW.normalizeParams(d),entries:e})}});function k1(a,b){return new k0({type:"enum",entries:Array.isArray(a)?Object.fromEntries(a.map(a=>[a,a])):a,...iW.normalizeParams(b)})}function k2(a,b){return new k0({type:"enum",entries:a,...iW.normalizeParams(b)})}let k3=bT("ZodLiteral",(a,b)=>{fF.init(a,b),ji.init(a,b),a._zod.processJSONSchema=(b,c,d)=>is(a,b,c,d),a.values=new Set(b.values),Object.defineProperty(a,"value",{get(){if(b.values.length>1)throw Error("This schema contains multiple valid literal values. Use `.values` instead.");return b.values[0]}})});function k4(a,b){return new k3({type:"literal",values:Array.isArray(a)?a:[a],...iW.normalizeParams(b)})}let k5=bT("ZodFile",(a,b)=>{fG.init(a,b),ji.init(a,b),a._zod.processJSONSchema=(b,c,d)=>iv(a,b,c,d),a.min=(b,c)=>a.check(hi(b,c)),a.max=(b,c)=>a.check(hh(b,c)),a.mime=(b,c)=>a.check(hu(Array.isArray(b)?b:[b],c))});function k6(a){return hN(k5,a)}let k7=bT("ZodTransform",(a,b)=>{fH.init(a,b),ji.init(a,b),a._zod.processJSONSchema=(b,c,d)=>iz(a,b,c,d),a._zod.parse=(c,d)=>{if("backward"===d.direction)throw new bW(a.constructor.name);c.addIssue=d=>{"string"==typeof d?c.issues.push(iW.issue(d,c.value,b)):(d.fatal&&(d.continue=!1),d.code??(d.code="custom"),d.input??(d.input=c.value),d.inst??(d.inst=a),c.issues.push(iW.issue(d)))};let e=b.transform(c.value,c);return e instanceof Promise?e.then(a=>(c.value=a,c)):(c.value=e,c)}});function k8(a){return new k7({type:"transform",transform:a})}let k9=bT("ZodOptional",(a,b)=>{fJ.init(a,b),ji.init(a,b),a._zod.processJSONSchema=(b,c,d)=>iQ(a,b,c,d),a.unwrap=()=>a._zod.def.innerType});function la(a){return new k9({type:"optional",innerType:a})}let lb=bT("ZodExactOptional",(a,b)=>{fK.init(a,b),ji.init(a,b),a._zod.processJSONSchema=(b,c,d)=>iQ(a,b,c,d),a.unwrap=()=>a._zod.def.innerType});function lc(a){return new lb({type:"optional",innerType:a})}let ld=bT("ZodNullable",(a,b)=>{fL.init(a,b),ji.init(a,b),a._zod.processJSONSchema=(b,c,d)=>iI(a,b,c,d),a.unwrap=()=>a._zod.def.innerType});function le(a){return new ld({type:"nullable",innerType:a})}function lf(a){return la(le(a))}let lg=bT("ZodDefault",(a,b)=>{fM.init(a,b),ji.init(a,b),a._zod.processJSONSchema=(b,c,d)=>iK(a,b,c,d),a.unwrap=()=>a._zod.def.innerType,a.removeDefault=a.unwrap});function lh(a,b){return new lg({type:"default",innerType:a,get defaultValue(){return"function"==typeof b?b():iW.shallowClone(b)}})}let li=bT("ZodPrefault",(a,b)=>{fO.init(a,b),ji.init(a,b),a._zod.processJSONSchema=(b,c,d)=>iL(a,b,c,d),a.unwrap=()=>a._zod.def.innerType});function lj(a,b){return new li({type:"prefault",innerType:a,get defaultValue(){return"function"==typeof b?b():iW.shallowClone(b)}})}let lk=bT("ZodNonOptional",(a,b)=>{fP.init(a,b),ji.init(a,b),a._zod.processJSONSchema=(b,c,d)=>iJ(a,b,c,d),a.unwrap=()=>a._zod.def.innerType});function ll(a,b){return new lk({type:"nonoptional",innerType:a,...iW.normalizeParams(b)})}let lm=bT("ZodSuccess",(a,b)=>{fR.init(a,b),ji.init(a,b),a._zod.processJSONSchema=(b,c,d)=>iw(a,b,c,d),a.unwrap=()=>a._zod.def.innerType});function ln(a){return new lm({type:"success",innerType:a})}let lo=bT("ZodCatch",(a,b)=>{fS.init(a,b),ji.init(a,b),a._zod.processJSONSchema=(b,c,d)=>iM(a,b,c,d),a.unwrap=()=>a._zod.def.innerType,a.removeCatch=a.unwrap});function lp(a,b){return new lo({type:"catch",innerType:a,catchValue:"function"==typeof b?b:()=>b})}let lq=bT("ZodNaN",(a,b)=>{fT.init(a,b),ji.init(a,b),a._zod.processJSONSchema=(b,c,d)=>it(a,b,c,d)});function lr(a){return g7(lq,a)}let ls=bT("ZodPipe",(a,b)=>{fU.init(a,b),ji.init(a,b),a._zod.processJSONSchema=(b,c,d)=>iN(a,b,c,d),a.in=b.in,a.out=b.out});function lt(a,b){return new ls({type:"pipe",in:a,out:b})}let lu=bT("ZodCodec",(a,b)=>{ls.init(a,b),fW.init(a,b)});function lv(a,b,c){return new lu({type:"pipe",in:a,out:b,transform:c.decode,reverseTransform:c.encode})}let lw=bT("ZodReadonly",(a,b)=>{fZ.init(a,b),ji.init(a,b),a._zod.processJSONSchema=(b,c,d)=>iO(a,b,c,d),a.unwrap=()=>a._zod.def.innerType});function lx(a){return new lw({type:"readonly",innerType:a})}let ly=bT("ZodTemplateLiteral",(a,b)=>{f_.init(a,b),ji.init(a,b),a._zod.processJSONSchema=(b,c,d)=>iu(a,b,c,d)});function lz(a,b){return new ly({type:"template_literal",parts:a,...iW.normalizeParams(b)})}let lA=bT("ZodLazy",(a,b)=>{f2.init(a,b),ji.init(a,b),a._zod.processJSONSchema=(b,c,d)=>iR(a,b,c,d),a.unwrap=()=>a._zod.def.getter()});function lB(a){return new lA({type:"lazy",getter:a})}let lC=bT("ZodPromise",(a,b)=>{f1.init(a,b),ji.init(a,b),a._zod.processJSONSchema=(b,c,d)=>iP(a,b,c,d),a.unwrap=()=>a._zod.def.innerType});function lD(a){return new lC({type:"promise",innerType:a})}let lE=bT("ZodFunction",(a,b)=>{f0.init(a,b),ji.init(a,b),a._zod.processJSONSchema=(b,c,d)=>iy(a,b,c,d)});function lF(a){return new lE({type:"function",input:Array.isArray(a?.input)?kT(a?.input):a?.input??kE(kw()),output:a?.output??kw()})}let lG=bT("ZodCustom",(a,b)=>{f3.init(a,b),ji.init(a,b),a._zod.processJSONSchema=(b,c,d)=>ix(a,b,c,d)});function lH(a){let b=new ed({check:"custom"});return b._zod.check=a,b}function lI(a,b){return h$(lG,a??(()=>!0),b)}function lJ(a,b={}){return h_(lG,a,b)}function lK(a){return h0(a)}let lL=h2,lM=h3;function lN(a,b={}){let c=new lG({type:"custom",check:"custom",fn:b=>b instanceof a,abort:!0,...iW.normalizeParams(b)});return c._zod.bag.Class=a,c._zod.check=b=>{b.value instanceof a||b.issues.push({code:"invalid_type",expected:a.name,input:b.value,inst:c,path:[...c._zod.def.path??[]]})},c}let lO=(...a)=>h4({Codec:lu,Boolean:kg,String:jk},...a);function lP(a){let b=lB(()=>kL([jl(a),j9(),kh(),ks(),kE(b),kV(jl(),b)]));return b}function lQ(a,b){return lt(k8(a),b)}let lR={invalid_type:"invalid_type",too_big:"too_big",too_small:"too_small",invalid_format:"invalid_format",not_multiple_of:"not_multiple_of",unrecognized_keys:"unrecognized_keys",invalid_union:"invalid_union",invalid_key:"invalid_key",invalid_element:"invalid_element",invalid_value:"invalid_value",custom:"custom"};function lS(a){bY({customError:a})}function lT(){return bY().customError}K||(K={}),a.s(["ZodFirstPartyTypeKind",()=>K,"ZodIssueCode",0,lR,"getErrorMap",()=>lT,"setErrorMap",()=>lS],914177),a.i(850183),a.s(["endsWith",()=>hs,"gt",()=>ha,"gte",()=>hb,"includes",()=>hq,"length",()=>hm,"lowercase",()=>ho,"lt",()=>g8,"lte",()=>g9,"maxLength",()=>hk,"maxSize",()=>hh,"mime",()=>hu,"minLength",()=>hl,"minSize",()=>hi,"multipleOf",()=>hg,"negative",()=>hd,"nonnegative",()=>hf,"nonpositive",()=>he,"normalize",()=>hw,"overwrite",()=>hv,"positive",()=>hc,"property",()=>ht,"regex",()=>hn,"size",()=>hj,"slugify",()=>hA,"startsWith",()=>hr,"toLowerCase",()=>hy,"toUpperCase",()=>hz,"trim",()=>hx,"uppercase",()=>hp],943166);var lU=a.i(943166),lV=a.i(801117);let lW={...a.i(657177),...lU,iso:lV},lX=new Set(["$schema","$ref","$defs","definitions","$id","id","$comment","$anchor","$vocabulary","$dynamicRef","$dynamicAnchor","type","enum","const","anyOf","oneOf","allOf","not","properties","required","additionalProperties","patternProperties","propertyNames","minProperties","maxProperties","items","prefixItems","additionalItems","minItems","maxItems","uniqueItems","contains","minContains","maxContains","minLength","maxLength","pattern","format","minimum","maximum","exclusiveMinimum","exclusiveMaximum","multipleOf","description","default","contentEncoding","contentMediaType","contentSchema","unevaluatedItems","unevaluatedProperties","if","then","else","dependentSchemas","dependentRequired","nullable","readOnly"]);function lY(a,b){var c;let d;if("boolean"==typeof a)return a?lW.any():lW.never();let e={version:(c=b?.defaultTarget,"https://json-schema.org/draft/2020-12/schema"===(d=a.$schema)?"draft-2020-12":"http://json-schema.org/draft-07/schema#"===d?"draft-7":"http://json-schema.org/draft-04/schema#"===d?"draft-4":c??"draft-2020-12"),defs:a.$defs||a.definitions||{},refs:new Map,processing:new Set,rootSchema:a,registry:b?.registry??gi};return function a(b,c){if("boolean"==typeof b)return b?lW.any():lW.never();let d=function b(c,d){let e;if(void 0!==c.not){if("object"==typeof c.not&&0===Object.keys(c.not).length)return lW.never();throw Error("not is not supported in Zod (except { not: {} } for never)")}if(void 0!==c.unevaluatedItems)throw Error("unevaluatedItems is not supported");if(void 0!==c.unevaluatedProperties)throw Error("unevaluatedProperties is not supported");if(void 0!==c.if||void 0!==c.then||void 0!==c.else)throw Error("Conditional schemas (if/then/else) are not supported");if(void 0!==c.dependentSchemas||void 0!==c.dependentRequired)throw Error("dependentSchemas and dependentRequired are not supported");if(c.$ref){let b=c.$ref;if(d.refs.has(b))return d.refs.get(b);if(d.processing.has(b))return lW.lazy(()=>{if(!d.refs.has(b))throw Error(`Circular reference not resolved: ${b}`);return d.refs.get(b)});d.processing.add(b);let e=a(function(a,b){if(!a.startsWith("#"))throw Error("External $ref is not supported, only local refs (#/...) are allowed");let c=a.slice(1).split("/").filter(Boolean);if(0===c.length)return b.rootSchema;let d="draft-2020-12"===b.version?"$defs":"definitions";if(c[0]===d){let d=c[1];if(!d||!b.defs[d])throw Error(`Reference not found: ${a}`);return b.defs[d]}throw Error(`Reference not found: ${a}`)}(b,d),d);return d.refs.set(b,e),d.processing.delete(b),e}if(void 0!==c.enum){let a=c.enum;if("openapi-3.0"===d.version&&!0===c.nullable&&1===a.length&&null===a[0])return lW.null();if(0===a.length)return lW.never();if(1===a.length)return lW.literal(a[0]);if(a.every(a=>"string"==typeof a))return lW.enum(a);let b=a.map(a=>lW.literal(a));return b.length<2?b[0]:lW.union([b[0],b[1],...b.slice(2)])}if(void 0!==c.const)return lW.literal(c.const);let f=c.type;if(Array.isArray(f)){let a=f.map(a=>b({...c,type:a},d));return 0===a.length?lW.never():1===a.length?a[0]:lW.union(a)}if(!f)return lW.any();switch(f){case"string":{let a=lW.string();if(c.format){let b=c.format;"email"===b?a=a.check(lW.email()):"uri"===b||"uri-reference"===b?a=a.check(lW.url()):"uuid"===b||"guid"===b?a=a.check(lW.uuid()):"date-time"===b?a=a.check(lW.iso.datetime()):"date"===b?a=a.check(lW.iso.date()):"time"===b?a=a.check(lW.iso.time()):"duration"===b?a=a.check(lW.iso.duration()):"ipv4"===b?a=a.check(lW.ipv4()):"ipv6"===b?a=a.check(lW.ipv6()):"mac"===b?a=a.check(lW.mac()):"cidr"===b?a=a.check(lW.cidrv4()):"cidr-v6"===b?a=a.check(lW.cidrv6()):"base64"===b?a=a.check(lW.base64()):"base64url"===b?a=a.check(lW.base64url()):"e164"===b?a=a.check(lW.e164()):"jwt"===b?a=a.check(lW.jwt()):"emoji"===b?a=a.check(lW.emoji()):"nanoid"===b?a=a.check(lW.nanoid()):"cuid"===b?a=a.check(lW.cuid()):"cuid2"===b?a=a.check(lW.cuid2()):"ulid"===b?a=a.check(lW.ulid()):"xid"===b?a=a.check(lW.xid()):"ksuid"===b&&(a=a.check(lW.ksuid()))}"number"==typeof c.minLength&&(a=a.min(c.minLength)),"number"==typeof c.maxLength&&(a=a.max(c.maxLength)),c.pattern&&(a=a.regex(new RegExp(c.pattern))),e=a;break}case"number":case"integer":{let a="integer"===f?lW.number().int():lW.number();"number"==typeof c.minimum&&(a=a.min(c.minimum)),"number"==typeof c.maximum&&(a=a.max(c.maximum)),"number"==typeof c.exclusiveMinimum?a=a.gt(c.exclusiveMinimum):!0===c.exclusiveMinimum&&"number"==typeof c.minimum&&(a=a.gt(c.minimum)),"number"==typeof c.exclusiveMaximum?a=a.lt(c.exclusiveMaximum):!0===c.exclusiveMaximum&&"number"==typeof c.maximum&&(a=a.lt(c.maximum)),"number"==typeof c.multipleOf&&(a=a.multipleOf(c.multipleOf)),e=a;break}case"boolean":e=lW.boolean();break;case"null":e=lW.null();break;case"object":{let b={},f=c.properties||{},g=new Set(c.required||[]);for(let[c,e]of Object.entries(f)){let f=a(e,d);b[c]=g.has(c)?f:f.optional()}if(c.propertyNames){let f=a(c.propertyNames,d),g=c.additionalProperties&&"object"==typeof c.additionalProperties?a(c.additionalProperties,d):lW.any();if(0===Object.keys(b).length){e=lW.record(f,g);break}let h=lW.object(b).passthrough(),i=lW.looseRecord(f,g);e=lW.intersection(h,i);break}if(c.patternProperties){let f=c.patternProperties,g=Object.keys(f),h=[];for(let b of g){let c=a(f[b],d),e=lW.string().regex(new RegExp(b));h.push(lW.looseRecord(e,c))}let i=[];if(Object.keys(b).length>0&&i.push(lW.object(b).passthrough()),i.push(...h),0===i.length)e=lW.object({}).passthrough();else if(1===i.length)e=i[0];else{let a=lW.intersection(i[0],i[1]);for(let b=2;b<i.length;b++)a=lW.intersection(a,i[b]);e=a}break}let h=lW.object(b);e=!1===c.additionalProperties?h.strict():"object"==typeof c.additionalProperties?h.catchall(a(c.additionalProperties,d)):h.passthrough();break}case"array":{let b=c.prefixItems,f=c.items;if(b&&Array.isArray(b)){let g=b.map(b=>a(b,d)),h=f&&"object"==typeof f&&!Array.isArray(f)?a(f,d):void 0;e=h?lW.tuple(g).rest(h):lW.tuple(g),"number"==typeof c.minItems&&(e=e.check(lW.minLength(c.minItems))),"number"==typeof c.maxItems&&(e=e.check(lW.maxLength(c.maxItems)))}else if(Array.isArray(f)){let b=f.map(b=>a(b,d)),g=c.additionalItems&&"object"==typeof c.additionalItems?a(c.additionalItems,d):void 0;e=g?lW.tuple(b).rest(g):lW.tuple(b),"number"==typeof c.minItems&&(e=e.check(lW.minLength(c.minItems))),"number"==typeof c.maxItems&&(e=e.check(lW.maxLength(c.maxItems)))}else if(void 0!==f){let b=a(f,d),g=lW.array(b);"number"==typeof c.minItems&&(g=g.min(c.minItems)),"number"==typeof c.maxItems&&(g=g.max(c.maxItems)),e=g}else e=lW.array(lW.any());break}default:throw Error(`Unsupported type: ${f}`)}return c.description&&(e=e.describe(c.description)),void 0!==c.default&&(e=e.default(c.default)),e}(b,c),e=b.type||void 0!==b.enum||void 0!==b.const;if(b.anyOf&&Array.isArray(b.anyOf)){let f=b.anyOf.map(b=>a(b,c)),g=lW.union(f);d=e?lW.intersection(d,g):g}if(b.oneOf&&Array.isArray(b.oneOf)){let f=b.oneOf.map(b=>a(b,c)),g=lW.xor(f);d=e?lW.intersection(d,g):g}if(b.allOf&&Array.isArray(b.allOf))if(0===b.allOf.length)d=e?d:lW.any();else{let f=e?d:a(b.allOf[0],c),g=+!e;for(let d=g;d<b.allOf.length;d++)f=lW.intersection(f,a(b.allOf[d],c));d=f}!0===b.nullable&&"openapi-3.0"===c.version&&(d=lW.nullable(d)),!0===b.readOnly&&(d=lW.readonly(d));let f={};for(let a of["$id","id","$comment","$anchor","$vocabulary","$dynamicRef","$dynamicAnchor"])a in b&&(f[a]=b[a]);for(let a of["contentEncoding","contentMediaType","contentSchema"])a in b&&(f[a]=b[a]);for(let a of Object.keys(b))lX.has(a)||(f[a]=b[a]);return Object.keys(f).length>0&&c.registry.add(d,f),d}(a,e)}function lZ(a){return gk(jk,a)}function l$(a){return gO(j8,a)}function l_(a){return gV(kg,a)}function l0(a){return gX(ki,a)}function l1(a){return g6(kB,a)}a.s(["bigint",()=>l0,"boolean",()=>l_,"date",()=>l1,"number",()=>l$,"string",()=>lZ],279673),bY(f6()),a.s([],393775),a.i(393775),a.i(276019),a.i(937547),a.i(839766),a.i(448440),a.i(967594),a.i(940325),a.i(724558);var l2=iW,l3=iV;a.i(53056),a.s(["ar",0,function(){let a,b,c;return{localeError:(a={string:{unit:"حرف",verb:"أن يحوي"},file:{unit:"بايت",verb:"أن يحوي"},array:{unit:"عنصر",verb:"أن يحوي"},set:{unit:"عنصر",verb:"أن يحوي"}},b={regex:"مدخل",email:"بريد إلكتروني",url:"رابط",emoji:"إيموجي",uuid:"UUID",uuidv4:"UUIDv4",uuidv6:"UUIDv6",nanoid:"nanoid",guid:"GUID",cuid:"cuid",cuid2:"cuid2",ulid:"ULID",xid:"XID",ksuid:"KSUID",datetime:"تاريخ ووقت بمعيار ISO",date:"تاريخ بمعيار ISO",time:"وقت بمعيار ISO",duration:"مدة بمعيار ISO",ipv4:"عنوان IPv4",ipv6:"عنوان IPv6",cidrv4:"مدى عناوين بصيغة IPv4",cidrv6:"مدى عناوين بصيغة IPv6",base64:"نَص بترميز base64-encoded",base64url:"نَص بترميز base64url-encoded",json_string:"نَص على هيئة JSON",e164:"رقم هاتف بمعيار E.164",jwt:"JWT",template_literal:"مدخل"},c={nan:"NaN"},d=>{switch(d.code){case"invalid_type":{let a=c[d.expected]??d.expected,b=cN(d.input),e=c[b]??b;if(/^[A-Z]/.test(d.expected))return`مدخلات غير مقبولة: يفترض إدخال instanceof ${d.expected}، ولكن تم إدخال ${e}`;return`مدخلات غير مقبولة: يفترض إدخال ${a}، ولكن تم إدخال ${e}`}case"invalid_value":if(1===d.values.length)return`مدخلات غير مقبولة: يفترض إدخال ${cw(d.values[0])}`;return`اختيار غير مقبول: يتوقع انتقاء أحد هذه الخيارات: ${b3(d.values,"|")}`;case"too_big":{let b=d.inclusive?"<=":"<",c=a[d.origin]??null;if(c)return` أكبر من اللازم: يفترض أن تكون ${d.origin??"القيمة"} ${b} ${d.maximum.toString()} ${c.unit??"عنصر"}`;return`أكبر من اللازم: يفترض أن تكون ${d.origin??"القيمة"} ${b} ${d.maximum.toString()}`}case"too_small":{let b=d.inclusive?">=":">",c=a[d.origin]??null;if(c)return`أصغر من اللازم: يفترض لـ ${d.origin} أن يكون ${b} ${d.minimum.toString()} ${c.unit}`;return`أصغر من اللازم: يفترض لـ ${d.origin} أن يكون ${b} ${d.minimum.toString()}`}case"invalid_format":if("starts_with"===d.format)return`نَص غير مقبول: يجب أن يبدأ بـ "${d.prefix}"`;if("ends_with"===d.format)return`نَص غير مقبول: يجب أن ينتهي بـ "${d.suffix}"`;if("includes"===d.format)return`نَص غير مقبول: يجب أن يتضمَّن "${d.includes}"`;if("regex"===d.format)return`نَص غير مقبول: يجب أن يطابق النمط ${d.pattern}`;return`${b[d.format]??d.format} غير مقبول`;case"not_multiple_of":return`رقم غير مقبول: يجب أن يكون من مضاعفات ${d.divisor}`;case"unrecognized_keys":return`معرف${d.keys.length>1?"ات":""} غريب${d.keys.length>1?"ة":""}: ${b3(d.keys,"، ")}`;case"invalid_key":return`معرف غير مقبول في ${d.origin}`;case"invalid_union":default:return"مدخل غير مقبول";case"invalid_element":return`مدخل غير مقبول في ${d.origin}`}})}},"az",0,function(){let a,b,c;return{localeError:(a={string:{unit:"simvol",verb:"olmalıdır"},file:{unit:"bayt",verb:"olmalıdır"},array:{unit:"element",verb:"olmalıdır"},set:{unit:"element",verb:"olmalıdır"}},b={regex:"input",email:"email address",url:"URL",emoji:"emoji",uuid:"UUID",uuidv4:"UUIDv4",uuidv6:"UUIDv6",nanoid:"nanoid",guid:"GUID",cuid:"cuid",cuid2:"cuid2",ulid:"ULID",xid:"XID",ksuid:"KSUID",datetime:"ISO datetime",date:"ISO date",time:"ISO time",duration:"ISO duration",ipv4:"IPv4 address",ipv6:"IPv6 address",cidrv4:"IPv4 range",cidrv6:"IPv6 range",base64:"base64-encoded string",base64url:"base64url-encoded string",json_string:"JSON string",e164:"E.164 number",jwt:"JWT",template_literal:"input"},c={nan:"NaN"},d=>{switch(d.code){case"invalid_type":{let a=c[d.expected]??d.expected,b=cN(d.input),e=c[b]??b;if(/^[A-Z]/.test(d.expected))return`Yanlış dəyər: g\xf6zlənilən instanceof ${d.expected}, daxil olan ${e}`;return`Yanlış dəyər: g\xf6zlənilən ${a}, daxil olan ${e}`}case"invalid_value":if(1===d.values.length)return`Yanlış dəyər: g\xf6zlənilən ${cw(d.values[0])}`;return`Yanlış se\xe7im: aşağıdakılardan biri olmalıdır: ${b3(d.values,"|")}`;case"too_big":{let b=d.inclusive?"<=":"<",c=a[d.origin]??null;if(c)return`\xc7ox b\xf6y\xfck: g\xf6zlənilən ${d.origin??"dəyər"} ${b}${d.maximum.toString()} ${c.unit??"element"}`;return`\xc7ox b\xf6y\xfck: g\xf6zlənilən ${d.origin??"dəyər"} ${b}${d.maximum.toString()}`}case"too_small":{let b=d.inclusive?">=":">",c=a[d.origin]??null;if(c)return`\xc7ox ki\xe7ik: g\xf6zlənilən ${d.origin} ${b}${d.minimum.toString()} ${c.unit}`;return`\xc7ox ki\xe7ik: g\xf6zlənilən ${d.origin} ${b}${d.minimum.toString()}`}case"invalid_format":if("starts_with"===d.format)return`Yanlış mətn: "${d.prefix}" ilə başlamalıdır`;if("ends_with"===d.format)return`Yanlış mətn: "${d.suffix}" ilə bitməlidir`;if("includes"===d.format)return`Yanlış mətn: "${d.includes}" daxil olmalıdır`;if("regex"===d.format)return`Yanlış mətn: ${d.pattern} şablonuna uyğun olmalıdır`;return`Yanlış ${b[d.format]??d.format}`;case"not_multiple_of":return`Yanlış ədəd: ${d.divisor} ilə b\xf6l\xfcnə bilən olmalıdır`;case"unrecognized_keys":return`Tanınmayan a\xe7ar${d.keys.length>1?"lar":""}: ${b3(d.keys,", ")}`;case"invalid_key":return`${d.origin} daxilində yanlış a\xe7ar`;case"invalid_union":return"Yanlış dəyər";case"invalid_element":return`${d.origin} daxilində yanlış dəyər`;default:return`Yanlış dəyər`}})}},"be",0,function(){let a,b,c;return{localeError:(a={string:{unit:{one:"сімвал",few:"сімвалы",many:"сімвалаў"},verb:"мець"},array:{unit:{one:"элемент",few:"элементы",many:"элементаў"},verb:"мець"},set:{unit:{one:"элемент",few:"элементы",many:"элементаў"},verb:"мець"},file:{unit:{one:"байт",few:"байты",many:"байтаў"},verb:"мець"}},b={regex:"увод",email:"email адрас",url:"URL",emoji:"эмодзі",uuid:"UUID",uuidv4:"UUIDv4",uuidv6:"UUIDv6",nanoid:"nanoid",guid:"GUID",cuid:"cuid",cuid2:"cuid2",ulid:"ULID",xid:"XID",ksuid:"KSUID",datetime:"ISO дата і час",date:"ISO дата",time:"ISO час",duration:"ISO працягласць",ipv4:"IPv4 адрас",ipv6:"IPv6 адрас",cidrv4:"IPv4 дыяпазон",cidrv6:"IPv6 дыяпазон",base64:"радок у фармаце base64",base64url:"радок у фармаце base64url",json_string:"JSON радок",e164:"нумар E.164",jwt:"JWT",template_literal:"увод"},c={nan:"NaN",number:"лік",array:"масіў"},d=>{switch(d.code){case"invalid_type":{let a=c[d.expected]??d.expected,b=cN(d.input),e=c[b]??b;if(/^[A-Z]/.test(d.expected))return`Няправільны ўвод: чакаўся instanceof ${d.expected}, атрымана ${e}`;return`Няправільны ўвод: чакаўся ${a}, атрымана ${e}`}case"invalid_value":if(1===d.values.length)return`Няправільны ўвод: чакалася ${cw(d.values[0])}`;return`Няправільны варыянт: чакаўся адзін з ${b3(d.values,"|")}`;case"too_big":{let b=d.inclusive?"<=":"<",c=a[d.origin]??null;if(c){let a=f5(Number(d.maximum),c.unit.one,c.unit.few,c.unit.many);return`Занадта вялікі: чакалася, што ${d.origin??"значэнне"} павінна ${c.verb} ${b}${d.maximum.toString()} ${a}`}return`Занадта вялікі: чакалася, што ${d.origin??"значэнне"} павінна быць ${b}${d.maximum.toString()}`}case"too_small":{let b=d.inclusive?">=":">",c=a[d.origin]??null;if(c){let a=f5(Number(d.minimum),c.unit.one,c.unit.few,c.unit.many);return`Занадта малы: чакалася, што ${d.origin} павінна ${c.verb} ${b}${d.minimum.toString()} ${a}`}return`Занадта малы: чакалася, што ${d.origin} павінна быць ${b}${d.minimum.toString()}`}case"invalid_format":if("starts_with"===d.format)return`Няправільны радок: павінен пачынацца з "${d.prefix}"`;if("ends_with"===d.format)return`Няправільны радок: павінен заканчвацца на "${d.suffix}"`;if("includes"===d.format)return`Няправільны радок: павінен змяшчаць "${d.includes}"`;if("regex"===d.format)return`Няправільны радок: павінен адпавядаць шаблону ${d.pattern}`;return`Няправільны ${b[d.format]??d.format}`;case"not_multiple_of":return`Няправільны лік: павінен быць кратным ${d.divisor}`;case"unrecognized_keys":return`Нераспазнаны ${d.keys.length>1?"ключы":"ключ"}: ${b3(d.keys,", ")}`;case"invalid_key":return`Няправільны ключ у ${d.origin}`;case"invalid_union":return"Няправільны ўвод";case"invalid_element":return`Няправільнае значэнне ў ${d.origin}`;default:return`Няправільны ўвод`}})}},"bg",0,function(){let a,b,c;return{localeError:(a={string:{unit:"символа",verb:"да съдържа"},file:{unit:"байта",verb:"да съдържа"},array:{unit:"елемента",verb:"да съдържа"},set:{unit:"елемента",verb:"да съдържа"}},b={regex:"вход",email:"имейл адрес",url:"URL",emoji:"емоджи",uuid:"UUID",uuidv4:"UUIDv4",uuidv6:"UUIDv6",nanoid:"nanoid",guid:"GUID",cuid:"cuid",cuid2:"cuid2",ulid:"ULID",xid:"XID",ksuid:"KSUID",datetime:"ISO време",date:"ISO дата",time:"ISO време",duration:"ISO продължителност",ipv4:"IPv4 адрес",ipv6:"IPv6 адрес",cidrv4:"IPv4 диапазон",cidrv6:"IPv6 диапазон",base64:"base64-кодиран низ",base64url:"base64url-кодиран низ",json_string:"JSON низ",e164:"E.164 номер",jwt:"JWT",template_literal:"вход"},c={nan:"NaN",number:"число",array:"масив"},d=>{switch(d.code){case"invalid_type":{let a=c[d.expected]??d.expected,b=cN(d.input),e=c[b]??b;if(/^[A-Z]/.test(d.expected))return`Невалиден вход: очакван instanceof ${d.expected}, получен ${e}`;return`Невалиден вход: очакван ${a}, получен ${e}`}case"invalid_value":if(1===d.values.length)return`Невалиден вход: очакван ${cw(d.values[0])}`;return`Невалидна опция: очаквано едно от ${b3(d.values,"|")}`;case"too_big":{let b=d.inclusive?"<=":"<",c=a[d.origin]??null;if(c)return`Твърде голямо: очаква се ${d.origin??"стойност"} да съдържа ${b}${d.maximum.toString()} ${c.unit??"елемента"}`;return`Твърде голямо: очаква се ${d.origin??"стойност"} да бъде ${b}${d.maximum.toString()}`}case"too_small":{let b=d.inclusive?">=":">",c=a[d.origin]??null;if(c)return`Твърде малко: очаква се ${d.origin} да съдържа ${b}${d.minimum.toString()} ${c.unit}`;return`Твърде малко: очаква се ${d.origin} да бъде ${b}${d.minimum.toString()}`}case"invalid_format":{if("starts_with"===d.format)return`Невалиден низ: трябва да започва с "${d.prefix}"`;if("ends_with"===d.format)return`Невалиден низ: трябва да завършва с "${d.suffix}"`;if("includes"===d.format)return`Невалиден низ: трябва да включва "${d.includes}"`;if("regex"===d.format)return`Невалиден низ: трябва да съвпада с ${d.pattern}`;let a="Невалиден";return"emoji"===d.format&&(a="Невалидно"),"datetime"===d.format&&(a="Невалидно"),"date"===d.format&&(a="Невалидна"),"time"===d.format&&(a="Невалидно"),"duration"===d.format&&(a="Невалидна"),`${a} ${b[d.format]??d.format}`}case"not_multiple_of":return`Невалидно число: трябва да бъде кратно на ${d.divisor}`;case"unrecognized_keys":return`Неразпознат${d.keys.length>1?"и":""} ключ${d.keys.length>1?"ове":""}: ${b3(d.keys,", ")}`;case"invalid_key":return`Невалиден ключ в ${d.origin}`;case"invalid_union":return"Невалиден вход";case"invalid_element":return`Невалидна стойност в ${d.origin}`;default:return`Невалиден вход`}})}},"ca",0,function(){let a,b,c;return{localeError:(a={string:{unit:"caràcters",verb:"contenir"},file:{unit:"bytes",verb:"contenir"},array:{unit:"elements",verb:"contenir"},set:{unit:"elements",verb:"contenir"}},b={regex:"entrada",email:"adreça electrònica",url:"URL",emoji:"emoji",uuid:"UUID",uuidv4:"UUIDv4",uuidv6:"UUIDv6",nanoid:"nanoid",guid:"GUID",cuid:"cuid",cuid2:"cuid2",ulid:"ULID",xid:"XID",ksuid:"KSUID",datetime:"data i hora ISO",date:"data ISO",time:"hora ISO",duration:"durada ISO",ipv4:"adreça IPv4",ipv6:"adreça IPv6",cidrv4:"rang IPv4",cidrv6:"rang IPv6",base64:"cadena codificada en base64",base64url:"cadena codificada en base64url",json_string:"cadena JSON",e164:"número E.164",jwt:"JWT",template_literal:"entrada"},c={nan:"NaN"},d=>{switch(d.code){case"invalid_type":{let a=c[d.expected]??d.expected,b=cN(d.input),e=c[b]??b;if(/^[A-Z]/.test(d.expected))return`Tipus inv\xe0lid: s'esperava instanceof ${d.expected}, s'ha rebut ${e}`;return`Tipus inv\xe0lid: s'esperava ${a}, s'ha rebut ${e}`}case"invalid_value":if(1===d.values.length)return`Valor inv\xe0lid: s'esperava ${cw(d.values[0])}`;return`Opci\xf3 inv\xe0lida: s'esperava una de ${b3(d.values," o ")}`;case"too_big":{let b=d.inclusive?"com a màxim":"menys de",c=a[d.origin]??null;if(c)return`Massa gran: s'esperava que ${d.origin??"el valor"} contingu\xe9s ${b} ${d.maximum.toString()} ${c.unit??"elements"}`;return`Massa gran: s'esperava que ${d.origin??"el valor"} fos ${b} ${d.maximum.toString()}`}case"too_small":{let b=d.inclusive?"com a mínim":"més de",c=a[d.origin]??null;if(c)return`Massa petit: s'esperava que ${d.origin} contingu\xe9s ${b} ${d.minimum.toString()} ${c.unit}`;return`Massa petit: s'esperava que ${d.origin} fos ${b} ${d.minimum.toString()}`}case"invalid_format":if("starts_with"===d.format)return`Format inv\xe0lid: ha de comen\xe7ar amb "${d.prefix}"`;if("ends_with"===d.format)return`Format inv\xe0lid: ha d'acabar amb "${d.suffix}"`;if("includes"===d.format)return`Format inv\xe0lid: ha d'incloure "${d.includes}"`;if("regex"===d.format)return`Format inv\xe0lid: ha de coincidir amb el patr\xf3 ${d.pattern}`;return`Format inv\xe0lid per a ${b[d.format]??d.format}`;case"not_multiple_of":return`N\xfamero inv\xe0lid: ha de ser m\xfaltiple de ${d.divisor}`;case"unrecognized_keys":return`Clau${d.keys.length>1?"s":""} no reconeguda${d.keys.length>1?"s":""}: ${b3(d.keys,", ")}`;case"invalid_key":return`Clau inv\xe0lida a ${d.origin}`;case"invalid_union":return"Entrada invàlida";case"invalid_element":return`Element inv\xe0lid a ${d.origin}`;default:return`Entrada inv\xe0lida`}})}},"cs",0,function(){let a,b,c;return{localeError:(a={string:{unit:"znaků",verb:"mít"},file:{unit:"bajtů",verb:"mít"},array:{unit:"prvků",verb:"mít"},set:{unit:"prvků",verb:"mít"}},b={regex:"regulární výraz",email:"e-mailová adresa",url:"URL",emoji:"emoji",uuid:"UUID",uuidv4:"UUIDv4",uuidv6:"UUIDv6",nanoid:"nanoid",guid:"GUID",cuid:"cuid",cuid2:"cuid2",ulid:"ULID",xid:"XID",ksuid:"KSUID",datetime:"datum a čas ve formátu ISO",date:"datum ve formátu ISO",time:"čas ve formátu ISO",duration:"doba trvání ISO",ipv4:"IPv4 adresa",ipv6:"IPv6 adresa",cidrv4:"rozsah IPv4",cidrv6:"rozsah IPv6",base64:"řetězec zakódovaný ve formátu base64",base64url:"řetězec zakódovaný ve formátu base64url",json_string:"řetězec ve formátu JSON",e164:"číslo E.164",jwt:"JWT",template_literal:"vstup"},c={nan:"NaN",number:"číslo",string:"řetězec",function:"funkce",array:"pole"},d=>{switch(d.code){case"invalid_type":{let a=c[d.expected]??d.expected,b=cN(d.input),e=c[b]??b;if(/^[A-Z]/.test(d.expected))return`Neplatn\xfd vstup: oček\xe1v\xe1no instanceof ${d.expected}, obdrženo ${e}`;return`Neplatn\xfd vstup: oček\xe1v\xe1no ${a}, obdrženo ${e}`}case"invalid_value":if(1===d.values.length)return`Neplatn\xfd vstup: oček\xe1v\xe1no ${cw(d.values[0])}`;return`Neplatn\xe1 možnost: oček\xe1v\xe1na jedna z hodnot ${b3(d.values,"|")}`;case"too_big":{let b=d.inclusive?"<=":"<",c=a[d.origin]??null;if(c)return`Hodnota je př\xedliš velk\xe1: ${d.origin??"hodnota"} mus\xed m\xedt ${b}${d.maximum.toString()} ${c.unit??"prvků"}`;return`Hodnota je př\xedliš velk\xe1: ${d.origin??"hodnota"} mus\xed b\xfdt ${b}${d.maximum.toString()}`}case"too_small":{let b=d.inclusive?">=":">",c=a[d.origin]??null;if(c)return`Hodnota je př\xedliš mal\xe1: ${d.origin??"hodnota"} mus\xed m\xedt ${b}${d.minimum.toString()} ${c.unit??"prvků"}`;return`Hodnota je př\xedliš mal\xe1: ${d.origin??"hodnota"} mus\xed b\xfdt ${b}${d.minimum.toString()}`}case"invalid_format":if("starts_with"===d.format)return`Neplatn\xfd řetězec: mus\xed zač\xednat na "${d.prefix}"`;if("ends_with"===d.format)return`Neplatn\xfd řetězec: mus\xed končit na "${d.suffix}"`;if("includes"===d.format)return`Neplatn\xfd řetězec: mus\xed obsahovat "${d.includes}"`;if("regex"===d.format)return`Neplatn\xfd řetězec: mus\xed odpov\xeddat vzoru ${d.pattern}`;return`Neplatn\xfd form\xe1t ${b[d.format]??d.format}`;case"not_multiple_of":return`Neplatn\xe9 č\xedslo: mus\xed b\xfdt n\xe1sobkem ${d.divisor}`;case"unrecognized_keys":return`Nezn\xe1m\xe9 kl\xedče: ${b3(d.keys,", ")}`;case"invalid_key":return`Neplatn\xfd kl\xedč v ${d.origin}`;case"invalid_union":return"Neplatný vstup";case"invalid_element":return`Neplatn\xe1 hodnota v ${d.origin}`;default:return`Neplatn\xfd vstup`}})}},"da",0,function(){let a,b,c;return{localeError:(a={string:{unit:"tegn",verb:"havde"},file:{unit:"bytes",verb:"havde"},array:{unit:"elementer",verb:"indeholdt"},set:{unit:"elementer",verb:"indeholdt"}},b={regex:"input",email:"e-mailadresse",url:"URL",emoji:"emoji",uuid:"UUID",uuidv4:"UUIDv4",uuidv6:"UUIDv6",nanoid:"nanoid",guid:"GUID",cuid:"cuid",cuid2:"cuid2",ulid:"ULID",xid:"XID",ksuid:"KSUID",datetime:"ISO dato- og klokkeslæt",date:"ISO-dato",time:"ISO-klokkeslæt",duration:"ISO-varighed",ipv4:"IPv4-område",ipv6:"IPv6-område",cidrv4:"IPv4-spektrum",cidrv6:"IPv6-spektrum",base64:"base64-kodet streng",base64url:"base64url-kodet streng",json_string:"JSON-streng",e164:"E.164-nummer",jwt:"JWT",template_literal:"input"},c={nan:"NaN",string:"streng",number:"tal",boolean:"boolean",array:"liste",object:"objekt",set:"sæt",file:"fil"},d=>{switch(d.code){case"invalid_type":{let a=c[d.expected]??d.expected,b=cN(d.input),e=c[b]??b;if(/^[A-Z]/.test(d.expected))return`Ugyldigt input: forventede instanceof ${d.expected}, fik ${e}`;return`Ugyldigt input: forventede ${a}, fik ${e}`}case"invalid_value":if(1===d.values.length)return`Ugyldig v\xe6rdi: forventede ${cw(d.values[0])}`;return`Ugyldigt valg: forventede en af f\xf8lgende ${b3(d.values,"|")}`;case"too_big":{let b=d.inclusive?"<=":"<",e=a[d.origin]??null,f=c[d.origin]??d.origin;if(e)return`For stor: forventede ${f??"value"} ${e.verb} ${b} ${d.maximum.toString()} ${e.unit??"elementer"}`;return`For stor: forventede ${f??"value"} havde ${b} ${d.maximum.toString()}`}case"too_small":{let b=d.inclusive?">=":">",e=a[d.origin]??null,f=c[d.origin]??d.origin;if(e)return`For lille: forventede ${f} ${e.verb} ${b} ${d.minimum.toString()} ${e.unit}`;return`For lille: forventede ${f} havde ${b} ${d.minimum.toString()}`}case"invalid_format":if("starts_with"===d.format)return`Ugyldig streng: skal starte med "${d.prefix}"`;if("ends_with"===d.format)return`Ugyldig streng: skal ende med "${d.suffix}"`;if("includes"===d.format)return`Ugyldig streng: skal indeholde "${d.includes}"`;if("regex"===d.format)return`Ugyldig streng: skal matche m\xf8nsteret ${d.pattern}`;return`Ugyldig ${b[d.format]??d.format}`;case"not_multiple_of":return`Ugyldigt tal: skal v\xe6re deleligt med ${d.divisor}`;case"unrecognized_keys":return`${d.keys.length>1?"Ukendte nøgler":"Ukendt nøgle"}: ${b3(d.keys,", ")}`;case"invalid_key":return`Ugyldig n\xf8gle i ${d.origin}`;case"invalid_union":return"Ugyldigt input: matcher ingen af de tilladte typer";case"invalid_element":return`Ugyldig v\xe6rdi i ${d.origin}`;default:return"Ugyldigt input"}})}},"de",0,function(){let a,b,c;return{localeError:(a={string:{unit:"Zeichen",verb:"zu haben"},file:{unit:"Bytes",verb:"zu haben"},array:{unit:"Elemente",verb:"zu haben"},set:{unit:"Elemente",verb:"zu haben"}},b={regex:"Eingabe",email:"E-Mail-Adresse",url:"URL",emoji:"Emoji",uuid:"UUID",uuidv4:"UUIDv4",uuidv6:"UUIDv6",nanoid:"nanoid",guid:"GUID",cuid:"cuid",cuid2:"cuid2",ulid:"ULID",xid:"XID",ksuid:"KSUID",datetime:"ISO-Datum und -Uhrzeit",date:"ISO-Datum",time:"ISO-Uhrzeit",duration:"ISO-Dauer",ipv4:"IPv4-Adresse",ipv6:"IPv6-Adresse",cidrv4:"IPv4-Bereich",cidrv6:"IPv6-Bereich",base64:"Base64-codierter String",base64url:"Base64-URL-codierter String",json_string:"JSON-String",e164:"E.164-Nummer",jwt:"JWT",template_literal:"Eingabe"},c={nan:"NaN",number:"Zahl",array:"Array"},d=>{switch(d.code){case"invalid_type":{let a=c[d.expected]??d.expected,b=cN(d.input),e=c[b]??b;if(/^[A-Z]/.test(d.expected))return`Ung\xfcltige Eingabe: erwartet instanceof ${d.expected}, erhalten ${e}`;return`Ung\xfcltige Eingabe: erwartet ${a}, erhalten ${e}`}case"invalid_value":if(1===d.values.length)return`Ung\xfcltige Eingabe: erwartet ${cw(d.values[0])}`;return`Ung\xfcltige Option: erwartet eine von ${b3(d.values,"|")}`;case"too_big":{let b=d.inclusive?"<=":"<",c=a[d.origin]??null;if(c)return`Zu gro\xdf: erwartet, dass ${d.origin??"Wert"} ${b}${d.maximum.toString()} ${c.unit??"Elemente"} hat`;return`Zu gro\xdf: erwartet, dass ${d.origin??"Wert"} ${b}${d.maximum.toString()} ist`}case"too_small":{let b=d.inclusive?">=":">",c=a[d.origin]??null;if(c)return`Zu klein: erwartet, dass ${d.origin} ${b}${d.minimum.toString()} ${c.unit} hat`;return`Zu klein: erwartet, dass ${d.origin} ${b}${d.minimum.toString()} ist`}case"invalid_format":if("starts_with"===d.format)return`Ung\xfcltiger String: muss mit "${d.prefix}" beginnen`;if("ends_with"===d.format)return`Ung\xfcltiger String: muss mit "${d.suffix}" enden`;if("includes"===d.format)return`Ung\xfcltiger String: muss "${d.includes}" enthalten`;if("regex"===d.format)return`Ung\xfcltiger String: muss dem Muster ${d.pattern} entsprechen`;return`Ung\xfcltig: ${b[d.format]??d.format}`;case"not_multiple_of":return`Ung\xfcltige Zahl: muss ein Vielfaches von ${d.divisor} sein`;case"unrecognized_keys":return`${d.keys.length>1?"Unbekannte Schlüssel":"Unbekannter Schlüssel"}: ${b3(d.keys,", ")}`;case"invalid_key":return`Ung\xfcltiger Schl\xfcssel in ${d.origin}`;case"invalid_union":return"Ungültige Eingabe";case"invalid_element":return`Ung\xfcltiger Wert in ${d.origin}`;default:return`Ung\xfcltige Eingabe`}})}},"en",0,f6,"eo",0,function(){let a,b,c;return{localeError:(a={string:{unit:"karaktrojn",verb:"havi"},file:{unit:"bajtojn",verb:"havi"},array:{unit:"elementojn",verb:"havi"},set:{unit:"elementojn",verb:"havi"}},b={regex:"enigo",email:"retadreso",url:"URL",emoji:"emoĝio",uuid:"UUID",uuidv4:"UUIDv4",uuidv6:"UUIDv6",nanoid:"nanoid",guid:"GUID",cuid:"cuid",cuid2:"cuid2",ulid:"ULID",xid:"XID",ksuid:"KSUID",datetime:"ISO-datotempo",date:"ISO-dato",time:"ISO-tempo",duration:"ISO-daŭro",ipv4:"IPv4-adreso",ipv6:"IPv6-adreso",cidrv4:"IPv4-rango",cidrv6:"IPv6-rango",base64:"64-ume kodita karaktraro",base64url:"URL-64-ume kodita karaktraro",json_string:"JSON-karaktraro",e164:"E.164-nombro",jwt:"JWT",template_literal:"enigo"},c={nan:"NaN",number:"nombro",array:"tabelo",null:"senvalora"},d=>{switch(d.code){case"invalid_type":{let a=c[d.expected]??d.expected,b=cN(d.input),e=c[b]??b;if(/^[A-Z]/.test(d.expected))return`Nevalida enigo: atendiĝis instanceof ${d.expected}, riceviĝis ${e}`;return`Nevalida enigo: atendiĝis ${a}, riceviĝis ${e}`}case"invalid_value":if(1===d.values.length)return`Nevalida enigo: atendiĝis ${cw(d.values[0])}`;return`Nevalida opcio: atendiĝis unu el ${b3(d.values,"|")}`;case"too_big":{let b=d.inclusive?"<=":"<",c=a[d.origin]??null;if(c)return`Tro granda: atendiĝis ke ${d.origin??"valoro"} havu ${b}${d.maximum.toString()} ${c.unit??"elementojn"}`;return`Tro granda: atendiĝis ke ${d.origin??"valoro"} havu ${b}${d.maximum.toString()}`}case"too_small":{let b=d.inclusive?">=":">",c=a[d.origin]??null;if(c)return`Tro malgranda: atendiĝis ke ${d.origin} havu ${b}${d.minimum.toString()} ${c.unit}`;return`Tro malgranda: atendiĝis ke ${d.origin} estu ${b}${d.minimum.toString()}`}case"invalid_format":if("starts_with"===d.format)return`Nevalida karaktraro: devas komenciĝi per "${d.prefix}"`;if("ends_with"===d.format)return`Nevalida karaktraro: devas finiĝi per "${d.suffix}"`;if("includes"===d.format)return`Nevalida karaktraro: devas inkluzivi "${d.includes}"`;if("regex"===d.format)return`Nevalida karaktraro: devas kongrui kun la modelo ${d.pattern}`;return`Nevalida ${b[d.format]??d.format}`;case"not_multiple_of":return`Nevalida nombro: devas esti oblo de ${d.divisor}`;case"unrecognized_keys":return`Nekonata${d.keys.length>1?"j":""} ŝlosilo${d.keys.length>1?"j":""}: ${b3(d.keys,", ")}`;case"invalid_key":return`Nevalida ŝlosilo en ${d.origin}`;case"invalid_union":default:return"Nevalida enigo";case"invalid_element":return`Nevalida valoro en ${d.origin}`}})}},"es",0,function(){let a,b,c;return{localeError:(a={string:{unit:"caracteres",verb:"tener"},file:{unit:"bytes",verb:"tener"},array:{unit:"elementos",verb:"tener"},set:{unit:"elementos",verb:"tener"}},b={regex:"entrada",email:"dirección de correo electrónico",url:"URL",emoji:"emoji",uuid:"UUID",uuidv4:"UUIDv4",uuidv6:"UUIDv6",nanoid:"nanoid",guid:"GUID",cuid:"cuid",cuid2:"cuid2",ulid:"ULID",xid:"XID",ksuid:"KSUID",datetime:"fecha y hora ISO",date:"fecha ISO",time:"hora ISO",duration:"duración ISO",ipv4:"dirección IPv4",ipv6:"dirección IPv6",cidrv4:"rango IPv4",cidrv6:"rango IPv6",base64:"cadena codificada en base64",base64url:"URL codificada en base64",json_string:"cadena JSON",e164:"número E.164",jwt:"JWT",template_literal:"entrada"},c={nan:"NaN",string:"texto",number:"número",boolean:"booleano",array:"arreglo",object:"objeto",set:"conjunto",file:"archivo",date:"fecha",bigint:"número grande",symbol:"símbolo",undefined:"indefinido",null:"nulo",function:"función",map:"mapa",record:"registro",tuple:"tupla",enum:"enumeración",union:"unión",literal:"literal",promise:"promesa",void:"vacío",never:"nunca",unknown:"desconocido",any:"cualquiera"},d=>{switch(d.code){case"invalid_type":{let a=c[d.expected]??d.expected,b=cN(d.input),e=c[b]??b;if(/^[A-Z]/.test(d.expected))return`Entrada inv\xe1lida: se esperaba instanceof ${d.expected}, recibido ${e}`;return`Entrada inv\xe1lida: se esperaba ${a}, recibido ${e}`}case"invalid_value":if(1===d.values.length)return`Entrada inv\xe1lida: se esperaba ${cw(d.values[0])}`;return`Opci\xf3n inv\xe1lida: se esperaba una de ${b3(d.values,"|")}`;case"too_big":{let b=d.inclusive?"<=":"<",e=a[d.origin]??null,f=c[d.origin]??d.origin;if(e)return`Demasiado grande: se esperaba que ${f??"valor"} tuviera ${b}${d.maximum.toString()} ${e.unit??"elementos"}`;return`Demasiado grande: se esperaba que ${f??"valor"} fuera ${b}${d.maximum.toString()}`}case"too_small":{let b=d.inclusive?">=":">",e=a[d.origin]??null,f=c[d.origin]??d.origin;if(e)return`Demasiado peque\xf1o: se esperaba que ${f} tuviera ${b}${d.minimum.toString()} ${e.unit}`;return`Demasiado peque\xf1o: se esperaba que ${f} fuera ${b}${d.minimum.toString()}`}case"invalid_format":if("starts_with"===d.format)return`Cadena inv\xe1lida: debe comenzar con "${d.prefix}"`;if("ends_with"===d.format)return`Cadena inv\xe1lida: debe terminar en "${d.suffix}"`;if("includes"===d.format)return`Cadena inv\xe1lida: debe incluir "${d.includes}"`;if("regex"===d.format)return`Cadena inv\xe1lida: debe coincidir con el patr\xf3n ${d.pattern}`;return`Inv\xe1lido ${b[d.format]??d.format}`;case"not_multiple_of":return`N\xfamero inv\xe1lido: debe ser m\xfaltiplo de ${d.divisor}`;case"unrecognized_keys":return`Llave${d.keys.length>1?"s":""} desconocida${d.keys.length>1?"s":""}: ${b3(d.keys,", ")}`;case"invalid_key":return`Llave inv\xe1lida en ${c[d.origin]??d.origin}`;case"invalid_union":return"Entrada inválida";case"invalid_element":return`Valor inv\xe1lido en ${c[d.origin]??d.origin}`;default:return`Entrada inv\xe1lida`}})}},"fa",0,function(){let a,b,c;return{localeError:(a={string:{unit:"کاراکتر",verb:"داشته باشد"},file:{unit:"بایت",verb:"داشته باشد"},array:{unit:"آیتم",verb:"داشته باشد"},set:{unit:"آیتم",verb:"داشته باشد"}},b={regex:"ورودی",email:"آدرس ایمیل",url:"URL",emoji:"ایموجی",uuid:"UUID",uuidv4:"UUIDv4",uuidv6:"UUIDv6",nanoid:"nanoid",guid:"GUID",cuid:"cuid",cuid2:"cuid2",ulid:"ULID",xid:"XID",ksuid:"KSUID",datetime:"تاریخ و زمان ایزو",date:"تاریخ ایزو",time:"زمان ایزو",duration:"مدت زمان ایزو",ipv4:"IPv4 آدرس",ipv6:"IPv6 آدرس",cidrv4:"IPv4 دامنه",cidrv6:"IPv6 دامنه",base64:"base64-encoded رشته",base64url:"base64url-encoded رشته",json_string:"JSON رشته",e164:"E.164 عدد",jwt:"JWT",template_literal:"ورودی"},c={nan:"NaN",number:"عدد",array:"آرایه"},d=>{switch(d.code){case"invalid_type":{let a=c[d.expected]??d.expected,b=cN(d.input),e=c[b]??b;if(/^[A-Z]/.test(d.expected))return`ورودی نامعتبر: می‌بایست instanceof ${d.expected} می‌بود، ${e} دریافت شد`;return`ورودی نامعتبر: می‌بایست ${a} می‌بود، ${e} دریافت شد`}case"invalid_value":if(1===d.values.length)return`ورودی نامعتبر: می‌بایست ${cw(d.values[0])} می‌بود`;return`گزینه نامعتبر: می‌بایست یکی از ${b3(d.values,"|")} می‌بود`;case"too_big":{let b=d.inclusive?"<=":"<",c=a[d.origin]??null;if(c)return`خیلی بزرگ: ${d.origin??"مقدار"} باید ${b}${d.maximum.toString()} ${c.unit??"عنصر"} باشد`;return`خیلی بزرگ: ${d.origin??"مقدار"} باید ${b}${d.maximum.toString()} باشد`}case"too_small":{let b=d.inclusive?">=":">",c=a[d.origin]??null;if(c)return`خیلی کوچک: ${d.origin} باید ${b}${d.minimum.toString()} ${c.unit} باشد`;return`خیلی کوچک: ${d.origin} باید ${b}${d.minimum.toString()} باشد`}case"invalid_format":if("starts_with"===d.format)return`رشته نامعتبر: باید با "${d.prefix}" شروع شود`;if("ends_with"===d.format)return`رشته نامعتبر: باید با "${d.suffix}" تمام شود`;if("includes"===d.format)return`رشته نامعتبر: باید شامل "${d.includes}" باشد`;if("regex"===d.format)return`رشته نامعتبر: باید با الگوی ${d.pattern} مطابقت داشته باشد`;return`${b[d.format]??d.format} نامعتبر`;case"not_multiple_of":return`عدد نامعتبر: باید مضرب ${d.divisor} باشد`;case"unrecognized_keys":return`کلید${d.keys.length>1?"های":""} ناشناس: ${b3(d.keys,", ")}`;case"invalid_key":return`کلید ناشناس در ${d.origin}`;case"invalid_union":default:return`ورودی نامعتبر`;case"invalid_element":return`مقدار نامعتبر در ${d.origin}`}})}},"fi",0,function(){let a,b,c;return{localeError:(a={string:{unit:"merkkiä",subject:"merkkijonon"},file:{unit:"tavua",subject:"tiedoston"},array:{unit:"alkiota",subject:"listan"},set:{unit:"alkiota",subject:"joukon"},number:{unit:"",subject:"luvun"},bigint:{unit:"",subject:"suuren kokonaisluvun"},int:{unit:"",subject:"kokonaisluvun"},date:{unit:"",subject:"päivämäärän"}},b={regex:"säännöllinen lauseke",email:"sähköpostiosoite",url:"URL-osoite",emoji:"emoji",uuid:"UUID",uuidv4:"UUIDv4",uuidv6:"UUIDv6",nanoid:"nanoid",guid:"GUID",cuid:"cuid",cuid2:"cuid2",ulid:"ULID",xid:"XID",ksuid:"KSUID",datetime:"ISO-aikaleima",date:"ISO-päivämäärä",time:"ISO-aika",duration:"ISO-kesto",ipv4:"IPv4-osoite",ipv6:"IPv6-osoite",cidrv4:"IPv4-alue",cidrv6:"IPv6-alue",base64:"base64-koodattu merkkijono",base64url:"base64url-koodattu merkkijono",json_string:"JSON-merkkijono",e164:"E.164-luku",jwt:"JWT",template_literal:"templaattimerkkijono"},c={nan:"NaN"},d=>{switch(d.code){case"invalid_type":{let a=c[d.expected]??d.expected,b=cN(d.input),e=c[b]??b;if(/^[A-Z]/.test(d.expected))return`Virheellinen tyyppi: odotettiin instanceof ${d.expected}, oli ${e}`;return`Virheellinen tyyppi: odotettiin ${a}, oli ${e}`}case"invalid_value":if(1===d.values.length)return`Virheellinen sy\xf6te: t\xe4ytyy olla ${cw(d.values[0])}`;return`Virheellinen valinta: t\xe4ytyy olla yksi seuraavista: ${b3(d.values,"|")}`;case"too_big":{let b=d.inclusive?"<=":"<",c=a[d.origin]??null;if(c)return`Liian suuri: ${c.subject} t\xe4ytyy olla ${b}${d.maximum.toString()} ${c.unit}`.trim();return`Liian suuri: arvon t\xe4ytyy olla ${b}${d.maximum.toString()}`}case"too_small":{let b=d.inclusive?">=":">",c=a[d.origin]??null;if(c)return`Liian pieni: ${c.subject} t\xe4ytyy olla ${b}${d.minimum.toString()} ${c.unit}`.trim();return`Liian pieni: arvon t\xe4ytyy olla ${b}${d.minimum.toString()}`}case"invalid_format":if("starts_with"===d.format)return`Virheellinen sy\xf6te: t\xe4ytyy alkaa "${d.prefix}"`;if("ends_with"===d.format)return`Virheellinen sy\xf6te: t\xe4ytyy loppua "${d.suffix}"`;if("includes"===d.format)return`Virheellinen sy\xf6te: t\xe4ytyy sis\xe4lt\xe4\xe4 "${d.includes}"`;if("regex"===d.format)return`Virheellinen sy\xf6te: t\xe4ytyy vastata s\xe4\xe4nn\xf6llist\xe4 lauseketta ${d.pattern}`;return`Virheellinen ${b[d.format]??d.format}`;case"not_multiple_of":return`Virheellinen luku: t\xe4ytyy olla luvun ${d.divisor} monikerta`;case"unrecognized_keys":return`${d.keys.length>1?"Tuntemattomat avaimet":"Tuntematon avain"}: ${b3(d.keys,", ")}`;case"invalid_key":return"Virheellinen avain tietueessa";case"invalid_union":return"Virheellinen unioni";case"invalid_element":return"Virheellinen arvo joukossa";default:return`Virheellinen sy\xf6te`}})}},"fr",0,function(){let a,b,c;return{localeError:(a={string:{unit:"caractères",verb:"avoir"},file:{unit:"octets",verb:"avoir"},array:{unit:"éléments",verb:"avoir"},set:{unit:"éléments",verb:"avoir"}},b={regex:"entrée",email:"adresse e-mail",url:"URL",emoji:"emoji",uuid:"UUID",uuidv4:"UUIDv4",uuidv6:"UUIDv6",nanoid:"nanoid",guid:"GUID",cuid:"cuid",cuid2:"cuid2",ulid:"ULID",xid:"XID",ksuid:"KSUID",datetime:"date et heure ISO",date:"date ISO",time:"heure ISO",duration:"durée ISO",ipv4:"adresse IPv4",ipv6:"adresse IPv6",cidrv4:"plage IPv4",cidrv6:"plage IPv6",base64:"chaîne encodée en base64",base64url:"chaîne encodée en base64url",json_string:"chaîne JSON",e164:"numéro E.164",jwt:"JWT",template_literal:"entrée"},c={nan:"NaN",number:"nombre",array:"tableau"},d=>{switch(d.code){case"invalid_type":{let a=c[d.expected]??d.expected,b=cN(d.input),e=c[b]??b;if(/^[A-Z]/.test(d.expected))return`Entr\xe9e invalide : instanceof ${d.expected} attendu, ${e} re\xe7u`;return`Entr\xe9e invalide : ${a} attendu, ${e} re\xe7u`}case"invalid_value":if(1===d.values.length)return`Entr\xe9e invalide : ${cw(d.values[0])} attendu`;return`Option invalide : une valeur parmi ${b3(d.values,"|")} attendue`;case"too_big":{let b=d.inclusive?"<=":"<",c=a[d.origin]??null;if(c)return`Trop grand : ${d.origin??"valeur"} doit ${c.verb} ${b}${d.maximum.toString()} ${c.unit??"élément(s)"}`;return`Trop grand : ${d.origin??"valeur"} doit \xeatre ${b}${d.maximum.toString()}`}case"too_small":{let b=d.inclusive?">=":">",c=a[d.origin]??null;if(c)return`Trop petit : ${d.origin} doit ${c.verb} ${b}${d.minimum.toString()} ${c.unit}`;return`Trop petit : ${d.origin} doit \xeatre ${b}${d.minimum.toString()}`}case"invalid_format":if("starts_with"===d.format)return`Cha\xeene invalide : doit commencer par "${d.prefix}"`;if("ends_with"===d.format)return`Cha\xeene invalide : doit se terminer par "${d.suffix}"`;if("includes"===d.format)return`Cha\xeene invalide : doit inclure "${d.includes}"`;if("regex"===d.format)return`Cha\xeene invalide : doit correspondre au mod\xe8le ${d.pattern}`;return`${b[d.format]??d.format} invalide`;case"not_multiple_of":return`Nombre invalide : doit \xeatre un multiple de ${d.divisor}`;case"unrecognized_keys":return`Cl\xe9${d.keys.length>1?"s":""} non reconnue${d.keys.length>1?"s":""} : ${b3(d.keys,", ")}`;case"invalid_key":return`Cl\xe9 invalide dans ${d.origin}`;case"invalid_union":return"Entrée invalide";case"invalid_element":return`Valeur invalide dans ${d.origin}`;default:return`Entr\xe9e invalide`}})}},"frCA",0,function(){let a,b,c;return{localeError:(a={string:{unit:"caractères",verb:"avoir"},file:{unit:"octets",verb:"avoir"},array:{unit:"éléments",verb:"avoir"},set:{unit:"éléments",verb:"avoir"}},b={regex:"entrée",email:"adresse courriel",url:"URL",emoji:"emoji",uuid:"UUID",uuidv4:"UUIDv4",uuidv6:"UUIDv6",nanoid:"nanoid",guid:"GUID",cuid:"cuid",cuid2:"cuid2",ulid:"ULID",xid:"XID",ksuid:"KSUID",datetime:"date-heure ISO",date:"date ISO",time:"heure ISO",duration:"durée ISO",ipv4:"adresse IPv4",ipv6:"adresse IPv6",cidrv4:"plage IPv4",cidrv6:"plage IPv6",base64:"chaîne encodée en base64",base64url:"chaîne encodée en base64url",json_string:"chaîne JSON",e164:"numéro E.164",jwt:"JWT",template_literal:"entrée"},c={nan:"NaN"},d=>{switch(d.code){case"invalid_type":{let a=c[d.expected]??d.expected,b=cN(d.input),e=c[b]??b;if(/^[A-Z]/.test(d.expected))return`Entr\xe9e invalide : attendu instanceof ${d.expected}, re\xe7u ${e}`;return`Entr\xe9e invalide : attendu ${a}, re\xe7u ${e}`}case"invalid_value":if(1===d.values.length)return`Entr\xe9e invalide : attendu ${cw(d.values[0])}`;return`Option invalide : attendu l'une des valeurs suivantes ${b3(d.values,"|")}`;case"too_big":{let b=d.inclusive?"≤":"<",c=a[d.origin]??null;if(c)return`Trop grand : attendu que ${d.origin??"la valeur"} ait ${b}${d.maximum.toString()} ${c.unit}`;return`Trop grand : attendu que ${d.origin??"la valeur"} soit ${b}${d.maximum.toString()}`}case"too_small":{let b=d.inclusive?"≥":">",c=a[d.origin]??null;if(c)return`Trop petit : attendu que ${d.origin} ait ${b}${d.minimum.toString()} ${c.unit}`;return`Trop petit : attendu que ${d.origin} soit ${b}${d.minimum.toString()}`}case"invalid_format":if("starts_with"===d.format)return`Cha\xeene invalide : doit commencer par "${d.prefix}"`;if("ends_with"===d.format)return`Cha\xeene invalide : doit se terminer par "${d.suffix}"`;if("includes"===d.format)return`Cha\xeene invalide : doit inclure "${d.includes}"`;if("regex"===d.format)return`Cha\xeene invalide : doit correspondre au motif ${d.pattern}`;return`${b[d.format]??d.format} invalide`;case"not_multiple_of":return`Nombre invalide : doit \xeatre un multiple de ${d.divisor}`;case"unrecognized_keys":return`Cl\xe9${d.keys.length>1?"s":""} non reconnue${d.keys.length>1?"s":""} : ${b3(d.keys,", ")}`;case"invalid_key":return`Cl\xe9 invalide dans ${d.origin}`;case"invalid_union":return"Entrée invalide";case"invalid_element":return`Valeur invalide dans ${d.origin}`;default:return`Entr\xe9e invalide`}})}},"he",0,function(){let a,b,c,d,e,f,g,h,i;return{localeError:(a={string:{label:"מחרוזת",gender:"f"},number:{label:"מספר",gender:"m"},boolean:{label:"ערך בוליאני",gender:"m"},bigint:{label:"BigInt",gender:"m"},date:{label:"תאריך",gender:"m"},array:{label:"מערך",gender:"m"},object:{label:"אובייקט",gender:"m"},null:{label:"ערך ריק (null)",gender:"m"},undefined:{label:"ערך לא מוגדר (undefined)",gender:"m"},symbol:{label:"סימבול (Symbol)",gender:"m"},function:{label:"פונקציה",gender:"f"},map:{label:"מפה (Map)",gender:"f"},set:{label:"קבוצה (Set)",gender:"f"},file:{label:"קובץ",gender:"m"},promise:{label:"Promise",gender:"m"},NaN:{label:"NaN",gender:"m"},unknown:{label:"ערך לא ידוע",gender:"m"},value:{label:"ערך",gender:"m"}},b={string:{unit:"תווים",shortLabel:"קצר",longLabel:"ארוך"},file:{unit:"בייטים",shortLabel:"קטן",longLabel:"גדול"},array:{unit:"פריטים",shortLabel:"קטן",longLabel:"גדול"},set:{unit:"פריטים",shortLabel:"קטן",longLabel:"גדול"},number:{unit:"",shortLabel:"קטן",longLabel:"גדול"}},c=b=>b?a[b]:void 0,d=b=>{let d=c(b);return d?d.label:b??a.unknown.label},e=a=>`ה${d(a)}`,f=a=>{let b=c(a);return"f"===(b?.gender??"m")?"צריכה להיות":"צריך להיות"},g=a=>a?b[a]??null:null,h={regex:{label:"קלט",gender:"m"},email:{label:"כתובת אימייל",gender:"f"},url:{label:"כתובת רשת",gender:"f"},emoji:{label:"אימוג'י",gender:"m"},uuid:{label:"UUID",gender:"m"},nanoid:{label:"nanoid",gender:"m"},guid:{label:"GUID",gender:"m"},cuid:{label:"cuid",gender:"m"},cuid2:{label:"cuid2",gender:"m"},ulid:{label:"ULID",gender:"m"},xid:{label:"XID",gender:"m"},ksuid:{label:"KSUID",gender:"m"},datetime:{label:"תאריך וזמן ISO",gender:"m"},date:{label:"תאריך ISO",gender:"m"},time:{label:"זמן ISO",gender:"m"},duration:{label:"משך זמן ISO",gender:"m"},ipv4:{label:"כתובת IPv4",gender:"f"},ipv6:{label:"כתובת IPv6",gender:"f"},cidrv4:{label:"טווח IPv4",gender:"m"},cidrv6:{label:"טווח IPv6",gender:"m"},base64:{label:"מחרוזת בבסיס 64",gender:"f"},base64url:{label:"מחרוזת בבסיס 64 לכתובות רשת",gender:"f"},json_string:{label:"מחרוזת JSON",gender:"f"},e164:{label:"מספר E.164",gender:"m"},jwt:{label:"JWT",gender:"m"},ends_with:{label:"קלט",gender:"m"},includes:{label:"קלט",gender:"m"},lowercase:{label:"קלט",gender:"m"},starts_with:{label:"קלט",gender:"m"},uppercase:{label:"קלט",gender:"m"}},i={nan:"NaN"},b=>{switch(b.code){case"invalid_type":{let c=b.expected,e=i[c??""]??d(c),f=cN(b.input),g=i[f]??a[f]?.label??f;if(/^[A-Z]/.test(b.expected))return`קלט לא תקין: צריך להיות instanceof ${b.expected}, התקבל ${g}`;return`קלט לא תקין: צריך להיות ${e}, התקבל ${g}`}case"invalid_value":{if(1===b.values.length)return`ערך לא תקין: הערך חייב להיות ${cw(b.values[0])}`;let a=b.values.map(a=>cw(a));if(2===b.values.length)return`ערך לא תקין: האפשרויות המתאימות הן ${a[0]} או ${a[1]}`;let c=a[a.length-1],d=a.slice(0,-1).join(", ");return`ערך לא תקין: האפשרויות המתאימות הן ${d} או ${c}`}case"too_big":{let a=g(b.origin),c=e(b.origin??"value");if("string"===b.origin)return`${a?.longLabel??"ארוך"} מדי: ${c} צריכה להכיל ${b.maximum.toString()} ${a?.unit??""} ${b.inclusive?"או פחות":"לכל היותר"}`.trim();if("number"===b.origin){let a=b.inclusive?`קטן או שווה ל-${b.maximum}`:`קטן מ-${b.maximum}`;return`גדול מדי: ${c} צריך להיות ${a}`}if("array"===b.origin||"set"===b.origin){let d="set"===b.origin?"צריכה":"צריך",e=b.inclusive?`${b.maximum} ${a?.unit??""} או פחות`:`פחות מ-${b.maximum} ${a?.unit??""}`;return`גדול מדי: ${c} ${d} להכיל ${e}`.trim()}let d=b.inclusive?"<=":"<",h=f(b.origin??"value");if(a?.unit)return`${a.longLabel} מדי: ${c} ${h} ${d}${b.maximum.toString()} ${a.unit}`;return`${a?.longLabel??"גדול"} מדי: ${c} ${h} ${d}${b.maximum.toString()}`}case"too_small":{let a=g(b.origin),c=e(b.origin??"value");if("string"===b.origin)return`${a?.shortLabel??"קצר"} מדי: ${c} צריכה להכיל ${b.minimum.toString()} ${a?.unit??""} ${b.inclusive?"או יותר":"לפחות"}`.trim();if("number"===b.origin){let a=b.inclusive?`גדול או שווה ל-${b.minimum}`:`גדול מ-${b.minimum}`;return`קטן מדי: ${c} צריך להיות ${a}`}if("array"===b.origin||"set"===b.origin){let d="set"===b.origin?"צריכה":"צריך";if(1===b.minimum&&b.inclusive){let a=(b.origin,"לפחות פריט אחד");return`קטן מדי: ${c} ${d} להכיל ${a}`}let e=b.inclusive?`${b.minimum} ${a?.unit??""} או יותר`:`יותר מ-${b.minimum} ${a?.unit??""}`;return`קטן מדי: ${c} ${d} להכיל ${e}`.trim()}let d=b.inclusive?">=":">",h=f(b.origin??"value");if(a?.unit)return`${a.shortLabel} מדי: ${c} ${h} ${d}${b.minimum.toString()} ${a.unit}`;return`${a?.shortLabel??"קטן"} מדי: ${c} ${h} ${d}${b.minimum.toString()}`}case"invalid_format":{if("starts_with"===b.format)return`המחרוזת חייבת להתחיל ב "${b.prefix}"`;if("ends_with"===b.format)return`המחרוזת חייבת להסתיים ב "${b.suffix}"`;if("includes"===b.format)return`המחרוזת חייבת לכלול "${b.includes}"`;if("regex"===b.format)return`המחרוזת חייבת להתאים לתבנית ${b.pattern}`;let a=h[b.format],c=a?.label??b.format,d=a?.gender??"m";return`${c} לא ${"f"===d?"תקינה":"תקין"}`}case"not_multiple_of":return`מספר לא תקין: חייב להיות מכפלה של ${b.divisor}`;case"unrecognized_keys":return`מפתח${b.keys.length>1?"ות":""} לא מזוה${b.keys.length>1?"ים":"ה"}: ${b3(b.keys,", ")}`;case"invalid_key":return`שדה לא תקין באובייקט`;case"invalid_union":return"קלט לא תקין";case"invalid_element":{let a=e(b.origin??"array");return`ערך לא תקין ב${a}`}default:return`קלט לא תקין`}})}},"hu",0,function(){let a,b,c;return{localeError:(a={string:{unit:"karakter",verb:"legyen"},file:{unit:"byte",verb:"legyen"},array:{unit:"elem",verb:"legyen"},set:{unit:"elem",verb:"legyen"}},b={regex:"bemenet",email:"email cím",url:"URL",emoji:"emoji",uuid:"UUID",uuidv4:"UUIDv4",uuidv6:"UUIDv6",nanoid:"nanoid",guid:"GUID",cuid:"cuid",cuid2:"cuid2",ulid:"ULID",xid:"XID",ksuid:"KSUID",datetime:"ISO időbélyeg",date:"ISO dátum",time:"ISO idő",duration:"ISO időintervallum",ipv4:"IPv4 cím",ipv6:"IPv6 cím",cidrv4:"IPv4 tartomány",cidrv6:"IPv6 tartomány",base64:"base64-kódolt string",base64url:"base64url-kódolt string",json_string:"JSON string",e164:"E.164 szám",jwt:"JWT",template_literal:"bemenet"},c={nan:"NaN",number:"szám",array:"tömb"},d=>{switch(d.code){case"invalid_type":{let a=c[d.expected]??d.expected,b=cN(d.input),e=c[b]??b;if(/^[A-Z]/.test(d.expected))return`\xc9rv\xe9nytelen bemenet: a v\xe1rt \xe9rt\xe9k instanceof ${d.expected}, a kapott \xe9rt\xe9k ${e}`;return`\xc9rv\xe9nytelen bemenet: a v\xe1rt \xe9rt\xe9k ${a}, a kapott \xe9rt\xe9k ${e}`}case"invalid_value":if(1===d.values.length)return`\xc9rv\xe9nytelen bemenet: a v\xe1rt \xe9rt\xe9k ${cw(d.values[0])}`;return`\xc9rv\xe9nytelen opci\xf3: valamelyik \xe9rt\xe9k v\xe1rt ${b3(d.values,"|")}`;case"too_big":{let b=d.inclusive?"<=":"<",c=a[d.origin]??null;if(c)return`T\xfal nagy: ${d.origin??"érték"} m\xe9rete t\xfal nagy ${b}${d.maximum.toString()} ${c.unit??"elem"}`;return`T\xfal nagy: a bemeneti \xe9rt\xe9k ${d.origin??"érték"} t\xfal nagy: ${b}${d.maximum.toString()}`}case"too_small":{let b=d.inclusive?">=":">",c=a[d.origin]??null;if(c)return`T\xfal kicsi: a bemeneti \xe9rt\xe9k ${d.origin} m\xe9rete t\xfal kicsi ${b}${d.minimum.toString()} ${c.unit}`;return`T\xfal kicsi: a bemeneti \xe9rt\xe9k ${d.origin} t\xfal kicsi ${b}${d.minimum.toString()}`}case"invalid_format":if("starts_with"===d.format)return`\xc9rv\xe9nytelen string: "${d.prefix}" \xe9rt\xe9kkel kell kezdődnie`;if("ends_with"===d.format)return`\xc9rv\xe9nytelen string: "${d.suffix}" \xe9rt\xe9kkel kell v\xe9gződnie`;if("includes"===d.format)return`\xc9rv\xe9nytelen string: "${d.includes}" \xe9rt\xe9ket kell tartalmaznia`;if("regex"===d.format)return`\xc9rv\xe9nytelen string: ${d.pattern} mint\xe1nak kell megfelelnie`;return`\xc9rv\xe9nytelen ${b[d.format]??d.format}`;case"not_multiple_of":return`\xc9rv\xe9nytelen sz\xe1m: ${d.divisor} t\xf6bbsz\xf6r\xf6s\xe9nek kell lennie`;case"unrecognized_keys":return`Ismeretlen kulcs${d.keys.length>1?"s":""}: ${b3(d.keys,", ")}`;case"invalid_key":return`\xc9rv\xe9nytelen kulcs ${d.origin}`;case"invalid_union":return"Érvénytelen bemenet";case"invalid_element":return`\xc9rv\xe9nytelen \xe9rt\xe9k: ${d.origin}`;default:return`\xc9rv\xe9nytelen bemenet`}})}},"hy",0,function(){let a,b,c;return{localeError:(a={string:{unit:{one:"նշան",many:"նշաններ"},verb:"ունենալ"},file:{unit:{one:"բայթ",many:"բայթեր"},verb:"ունենալ"},array:{unit:{one:"տարր",many:"տարրեր"},verb:"ունենալ"},set:{unit:{one:"տարր",many:"տարրեր"},verb:"ունենալ"}},b={regex:"մուտք",email:"էլ. հասցե",url:"URL",emoji:"էմոջի",uuid:"UUID",uuidv4:"UUIDv4",uuidv6:"UUIDv6",nanoid:"nanoid",guid:"GUID",cuid:"cuid",cuid2:"cuid2",ulid:"ULID",xid:"XID",ksuid:"KSUID",datetime:"ISO ամսաթիվ և ժամ",date:"ISO ամսաթիվ",time:"ISO ժամ",duration:"ISO տևողություն",ipv4:"IPv4 հասցե",ipv6:"IPv6 հասցե",cidrv4:"IPv4 միջակայք",cidrv6:"IPv6 միջակայք",base64:"base64 ձևաչափով տող",base64url:"base64url ձևաչափով տող",json_string:"JSON տող",e164:"E.164 համար",jwt:"JWT",template_literal:"մուտք"},c={nan:"NaN",number:"թիվ",array:"զանգված"},d=>{switch(d.code){case"invalid_type":{let a=c[d.expected]??d.expected,b=cN(d.input),e=c[b]??b;if(/^[A-Z]/.test(d.expected))return`Սխալ մուտքագրում․ սպասվում էր instanceof ${d.expected}, ստացվել է ${e}`;return`Սխալ մուտքագրում․ սպասվում էր ${a}, ստացվել է ${e}`}case"invalid_value":if(1===d.values.length)return`Սխալ մուտքագրում․ սպասվում էր ${cw(d.values[1])}`;return`Սխալ տարբերակ․ սպասվում էր հետևյալներից մեկը՝ ${b3(d.values,"|")}`;case"too_big":{let b=d.inclusive?"<=":"<",c=a[d.origin]??null;if(c){let a=f7(Number(d.maximum),c.unit.one,c.unit.many);return`Չափազանց մեծ արժեք․ սպասվում է, որ ${f8(d.origin??"արժեք")} կունենա ${b}${d.maximum.toString()} ${a}`}return`Չափազանց մեծ արժեք․ սպասվում է, որ ${f8(d.origin??"արժեք")} լինի ${b}${d.maximum.toString()}`}case"too_small":{let b=d.inclusive?">=":">",c=a[d.origin]??null;if(c){let a=f7(Number(d.minimum),c.unit.one,c.unit.many);return`Չափազանց փոքր արժեք․ սպասվում է, որ ${f8(d.origin)} կունենա ${b}${d.minimum.toString()} ${a}`}return`Չափազանց փոքր արժեք․ սպասվում է, որ ${f8(d.origin)} լինի ${b}${d.minimum.toString()}`}case"invalid_format":if("starts_with"===d.format)return`Սխալ տող․ պետք է սկսվի "${d.prefix}"-ով`;if("ends_with"===d.format)return`Սխալ տող․ պետք է ավարտվի "${d.suffix}"-ով`;if("includes"===d.format)return`Սխալ տող․ պետք է պարունակի "${d.includes}"`;if("regex"===d.format)return`Սխալ տող․ պետք է համապատասխանի ${d.pattern} ձևաչափին`;return`Սխալ ${b[d.format]??d.format}`;case"not_multiple_of":return`Սխալ թիվ․ պետք է բազմապատիկ լինի ${d.divisor}-ի`;case"unrecognized_keys":return`Չճանաչված բանալի${d.keys.length>1?"ներ":""}. ${b3(d.keys,", ")}`;case"invalid_key":return`Սխալ բանալի ${f8(d.origin)}-ում`;case"invalid_union":return"Սխալ մուտքագրում";case"invalid_element":return`Սխալ արժեք ${f8(d.origin)}-ում`;default:return`Սխալ մուտքագրում`}})}},"id",0,function(){let a,b,c;return{localeError:(a={string:{unit:"karakter",verb:"memiliki"},file:{unit:"byte",verb:"memiliki"},array:{unit:"item",verb:"memiliki"},set:{unit:"item",verb:"memiliki"}},b={regex:"input",email:"alamat email",url:"URL",emoji:"emoji",uuid:"UUID",uuidv4:"UUIDv4",uuidv6:"UUIDv6",nanoid:"nanoid",guid:"GUID",cuid:"cuid",cuid2:"cuid2",ulid:"ULID",xid:"XID",ksuid:"KSUID",datetime:"tanggal dan waktu format ISO",date:"tanggal format ISO",time:"jam format ISO",duration:"durasi format ISO",ipv4:"alamat IPv4",ipv6:"alamat IPv6",cidrv4:"rentang alamat IPv4",cidrv6:"rentang alamat IPv6",base64:"string dengan enkode base64",base64url:"string dengan enkode base64url",json_string:"string JSON",e164:"angka E.164",jwt:"JWT",template_literal:"input"},c={nan:"NaN"},d=>{switch(d.code){case"invalid_type":{let a=c[d.expected]??d.expected,b=cN(d.input),e=c[b]??b;if(/^[A-Z]/.test(d.expected))return`Input tidak valid: diharapkan instanceof ${d.expected}, diterima ${e}`;return`Input tidak valid: diharapkan ${a}, diterima ${e}`}case"invalid_value":if(1===d.values.length)return`Input tidak valid: diharapkan ${cw(d.values[0])}`;return`Pilihan tidak valid: diharapkan salah satu dari ${b3(d.values,"|")}`;case"too_big":{let b=d.inclusive?"<=":"<",c=a[d.origin]??null;if(c)return`Terlalu besar: diharapkan ${d.origin??"value"} memiliki ${b}${d.maximum.toString()} ${c.unit??"elemen"}`;return`Terlalu besar: diharapkan ${d.origin??"value"} menjadi ${b}${d.maximum.toString()}`}case"too_small":{let b=d.inclusive?">=":">",c=a[d.origin]??null;if(c)return`Terlalu kecil: diharapkan ${d.origin} memiliki ${b}${d.minimum.toString()} ${c.unit}`;return`Terlalu kecil: diharapkan ${d.origin} menjadi ${b}${d.minimum.toString()}`}case"invalid_format":if("starts_with"===d.format)return`String tidak valid: harus dimulai dengan "${d.prefix}"`;if("ends_with"===d.format)return`String tidak valid: harus berakhir dengan "${d.suffix}"`;if("includes"===d.format)return`String tidak valid: harus menyertakan "${d.includes}"`;if("regex"===d.format)return`String tidak valid: harus sesuai pola ${d.pattern}`;return`${b[d.format]??d.format} tidak valid`;case"not_multiple_of":return`Angka tidak valid: harus kelipatan dari ${d.divisor}`;case"unrecognized_keys":return`Kunci tidak dikenali ${d.keys.length>1?"s":""}: ${b3(d.keys,", ")}`;case"invalid_key":return`Kunci tidak valid di ${d.origin}`;case"invalid_union":default:return"Input tidak valid";case"invalid_element":return`Nilai tidak valid di ${d.origin}`}})}},"is",0,function(){let a,b,c;return{localeError:(a={string:{unit:"stafi",verb:"að hafa"},file:{unit:"bæti",verb:"að hafa"},array:{unit:"hluti",verb:"að hafa"},set:{unit:"hluti",verb:"að hafa"}},b={regex:"gildi",email:"netfang",url:"vefslóð",emoji:"emoji",uuid:"UUID",uuidv4:"UUIDv4",uuidv6:"UUIDv6",nanoid:"nanoid",guid:"GUID",cuid:"cuid",cuid2:"cuid2",ulid:"ULID",xid:"XID",ksuid:"KSUID",datetime:"ISO dagsetning og tími",date:"ISO dagsetning",time:"ISO tími",duration:"ISO tímalengd",ipv4:"IPv4 address",ipv6:"IPv6 address",cidrv4:"IPv4 range",cidrv6:"IPv6 range",base64:"base64-encoded strengur",base64url:"base64url-encoded strengur",json_string:"JSON strengur",e164:"E.164 tölugildi",jwt:"JWT",template_literal:"gildi"},c={nan:"NaN",number:"númer",array:"fylki"},d=>{switch(d.code){case"invalid_type":{let a=c[d.expected]??d.expected,b=cN(d.input),e=c[b]??b;if(/^[A-Z]/.test(d.expected))return`Rangt gildi: \xde\xfa sl\xf3st inn ${e} \xfear sem \xe1 a\xf0 vera instanceof ${d.expected}`;return`Rangt gildi: \xde\xfa sl\xf3st inn ${e} \xfear sem \xe1 a\xf0 vera ${a}`}case"invalid_value":if(1===d.values.length)return`Rangt gildi: gert r\xe1\xf0 fyrir ${cw(d.values[0])}`;return`\xd3gilt val: m\xe1 vera eitt af eftirfarandi ${b3(d.values,"|")}`;case"too_big":{let b=d.inclusive?"<=":"<",c=a[d.origin]??null;if(c)return`Of st\xf3rt: gert er r\xe1\xf0 fyrir a\xf0 ${d.origin??"gildi"} hafi ${b}${d.maximum.toString()} ${c.unit??"hluti"}`;return`Of st\xf3rt: gert er r\xe1\xf0 fyrir a\xf0 ${d.origin??"gildi"} s\xe9 ${b}${d.maximum.toString()}`}case"too_small":{let b=d.inclusive?">=":">",c=a[d.origin]??null;if(c)return`Of l\xedti\xf0: gert er r\xe1\xf0 fyrir a\xf0 ${d.origin} hafi ${b}${d.minimum.toString()} ${c.unit}`;return`Of l\xedti\xf0: gert er r\xe1\xf0 fyrir a\xf0 ${d.origin} s\xe9 ${b}${d.minimum.toString()}`}case"invalid_format":if("starts_with"===d.format)return`\xd3gildur strengur: ver\xf0ur a\xf0 byrja \xe1 "${d.prefix}"`;if("ends_with"===d.format)return`\xd3gildur strengur: ver\xf0ur a\xf0 enda \xe1 "${d.suffix}"`;if("includes"===d.format)return`\xd3gildur strengur: ver\xf0ur a\xf0 innihalda "${d.includes}"`;if("regex"===d.format)return`\xd3gildur strengur: ver\xf0ur a\xf0 fylgja mynstri ${d.pattern}`;return`Rangt ${b[d.format]??d.format}`;case"not_multiple_of":return`R\xf6ng tala: ver\xf0ur a\xf0 vera margfeldi af ${d.divisor}`;case"unrecognized_keys":return`\xd3\xfeekkt ${d.keys.length>1?"ir lyklar":"ur lykill"}: ${b3(d.keys,", ")}`;case"invalid_key":return`Rangur lykill \xed ${d.origin}`;case"invalid_union":default:return"Rangt gildi";case"invalid_element":return`Rangt gildi \xed ${d.origin}`}})}},"it",0,function(){let a,b,c;return{localeError:(a={string:{unit:"caratteri",verb:"avere"},file:{unit:"byte",verb:"avere"},array:{unit:"elementi",verb:"avere"},set:{unit:"elementi",verb:"avere"}},b={regex:"input",email:"indirizzo email",url:"URL",emoji:"emoji",uuid:"UUID",uuidv4:"UUIDv4",uuidv6:"UUIDv6",nanoid:"nanoid",guid:"GUID",cuid:"cuid",cuid2:"cuid2",ulid:"ULID",xid:"XID",ksuid:"KSUID",datetime:"data e ora ISO",date:"data ISO",time:"ora ISO",duration:"durata ISO",ipv4:"indirizzo IPv4",ipv6:"indirizzo IPv6",cidrv4:"intervallo IPv4",cidrv6:"intervallo IPv6",base64:"stringa codificata in base64",base64url:"URL codificata in base64",json_string:"stringa JSON",e164:"numero E.164",jwt:"JWT",template_literal:"input"},c={nan:"NaN",number:"numero",array:"vettore"},d=>{switch(d.code){case"invalid_type":{let a=c[d.expected]??d.expected,b=cN(d.input),e=c[b]??b;if(/^[A-Z]/.test(d.expected))return`Input non valido: atteso instanceof ${d.expected}, ricevuto ${e}`;return`Input non valido: atteso ${a}, ricevuto ${e}`}case"invalid_value":if(1===d.values.length)return`Input non valido: atteso ${cw(d.values[0])}`;return`Opzione non valida: atteso uno tra ${b3(d.values,"|")}`;case"too_big":{let b=d.inclusive?"<=":"<",c=a[d.origin]??null;if(c)return`Troppo grande: ${d.origin??"valore"} deve avere ${b}${d.maximum.toString()} ${c.unit??"elementi"}`;return`Troppo grande: ${d.origin??"valore"} deve essere ${b}${d.maximum.toString()}`}case"too_small":{let b=d.inclusive?">=":">",c=a[d.origin]??null;if(c)return`Troppo piccolo: ${d.origin} deve avere ${b}${d.minimum.toString()} ${c.unit}`;return`Troppo piccolo: ${d.origin} deve essere ${b}${d.minimum.toString()}`}case"invalid_format":if("starts_with"===d.format)return`Stringa non valida: deve iniziare con "${d.prefix}"`;if("ends_with"===d.format)return`Stringa non valida: deve terminare con "${d.suffix}"`;if("includes"===d.format)return`Stringa non valida: deve includere "${d.includes}"`;if("regex"===d.format)return`Stringa non valida: deve corrispondere al pattern ${d.pattern}`;return`Invalid ${b[d.format]??d.format}`;case"not_multiple_of":return`Numero non valido: deve essere un multiplo di ${d.divisor}`;case"unrecognized_keys":return`Chiav${d.keys.length>1?"i":"e"} non riconosciut${d.keys.length>1?"e":"a"}: ${b3(d.keys,", ")}`;case"invalid_key":return`Chiave non valida in ${d.origin}`;case"invalid_union":default:return"Input non valido";case"invalid_element":return`Valore non valido in ${d.origin}`}})}},"ja",0,function(){let a,b,c;return{localeError:(a={string:{unit:"文字",verb:"である"},file:{unit:"バイト",verb:"である"},array:{unit:"要素",verb:"である"},set:{unit:"要素",verb:"である"}},b={regex:"入力値",email:"メールアドレス",url:"URL",emoji:"絵文字",uuid:"UUID",uuidv4:"UUIDv4",uuidv6:"UUIDv6",nanoid:"nanoid",guid:"GUID",cuid:"cuid",cuid2:"cuid2",ulid:"ULID",xid:"XID",ksuid:"KSUID",datetime:"ISO日時",date:"ISO日付",time:"ISO時刻",duration:"ISO期間",ipv4:"IPv4アドレス",ipv6:"IPv6アドレス",cidrv4:"IPv4範囲",cidrv6:"IPv6範囲",base64:"base64エンコード文字列",base64url:"base64urlエンコード文字列",json_string:"JSON文字列",e164:"E.164番号",jwt:"JWT",template_literal:"入力値"},c={nan:"NaN",number:"数値",array:"配列"},d=>{switch(d.code){case"invalid_type":{let a=c[d.expected]??d.expected,b=cN(d.input),e=c[b]??b;if(/^[A-Z]/.test(d.expected))return`無効な入力: instanceof ${d.expected}が期待されましたが、${e}が入力されました`;return`無効な入力: ${a}が期待されましたが、${e}が入力されました`}case"invalid_value":if(1===d.values.length)return`無効な入力: ${cw(d.values[0])}が期待されました`;return`無効な選択: ${b3(d.values,"、")}のいずれかである必要があります`;case"too_big":{let b=d.inclusive?"以下である":"より小さい",c=a[d.origin]??null;if(c)return`大きすぎる値: ${d.origin??"値"}は${d.maximum.toString()}${c.unit??"要素"}${b}必要があります`;return`大きすぎる値: ${d.origin??"値"}は${d.maximum.toString()}${b}必要があります`}case"too_small":{let b=d.inclusive?"以上である":"より大きい",c=a[d.origin]??null;if(c)return`小さすぎる値: ${d.origin}は${d.minimum.toString()}${c.unit}${b}必要があります`;return`小さすぎる値: ${d.origin}は${d.minimum.toString()}${b}必要があります`}case"invalid_format":if("starts_with"===d.format)return`無効な文字列: "${d.prefix}"で始まる必要があります`;if("ends_with"===d.format)return`無効な文字列: "${d.suffix}"で終わる必要があります`;if("includes"===d.format)return`無効な文字列: "${d.includes}"を含む必要があります`;if("regex"===d.format)return`無効な文字列: パターン${d.pattern}に一致する必要があります`;return`無効な${b[d.format]??d.format}`;case"not_multiple_of":return`無効な数値: ${d.divisor}の倍数である必要があります`;case"unrecognized_keys":return`認識されていないキー${d.keys.length>1?"群":""}: ${b3(d.keys,"、")}`;case"invalid_key":return`${d.origin}内の無効なキー`;case"invalid_union":return"無効な入力";case"invalid_element":return`${d.origin}内の無効な値`;default:return`無効な入力`}})}},"ka",0,function(){let a,b,c;return{localeError:(a={string:{unit:"სიმბოლო",verb:"უნდა შეიცავდეს"},file:{unit:"ბაიტი",verb:"უნდა შეიცავდეს"},array:{unit:"ელემენტი",verb:"უნდა შეიცავდეს"},set:{unit:"ელემენტი",verb:"უნდა შეიცავდეს"}},b={regex:"შეყვანა",email:"ელ-ფოსტის მისამართი",url:"URL",emoji:"ემოჯი",uuid:"UUID",uuidv4:"UUIDv4",uuidv6:"UUIDv6",nanoid:"nanoid",guid:"GUID",cuid:"cuid",cuid2:"cuid2",ulid:"ULID",xid:"XID",ksuid:"KSUID",datetime:"თარიღი-დრო",date:"თარიღი",time:"დრო",duration:"ხანგრძლივობა",ipv4:"IPv4 მისამართი",ipv6:"IPv6 მისამართი",cidrv4:"IPv4 დიაპაზონი",cidrv6:"IPv6 დიაპაზონი",base64:"base64-კოდირებული სტრინგი",base64url:"base64url-კოდირებული სტრინგი",json_string:"JSON სტრინგი",e164:"E.164 ნომერი",jwt:"JWT",template_literal:"შეყვანა"},c={nan:"NaN",number:"რიცხვი",string:"სტრინგი",boolean:"ბულეანი",function:"ფუნქცია",array:"მასივი"},d=>{switch(d.code){case"invalid_type":{let a=c[d.expected]??d.expected,b=cN(d.input),e=c[b]??b;if(/^[A-Z]/.test(d.expected))return`არასწორი შეყვანა: მოსალოდნელი instanceof ${d.expected}, მიღებული ${e}`;return`არასწორი შეყვანა: მოსალოდნელი ${a}, მიღებული ${e}`}case"invalid_value":if(1===d.values.length)return`არასწორი შეყვანა: მოსალოდნელი ${cw(d.values[0])}`;return`არასწორი ვარიანტი: მოსალოდნელია ერთ-ერთი ${b3(d.values,"|")}-დან`;case"too_big":{let b=d.inclusive?"<=":"<",c=a[d.origin]??null;if(c)return`ზედმეტად დიდი: მოსალოდნელი ${d.origin??"მნიშვნელობა"} ${c.verb} ${b}${d.maximum.toString()} ${c.unit}`;return`ზედმეტად დიდი: მოსალოდნელი ${d.origin??"მნიშვნელობა"} იყოს ${b}${d.maximum.toString()}`}case"too_small":{let b=d.inclusive?">=":">",c=a[d.origin]??null;if(c)return`ზედმეტად პატარა: მოსალოდნელი ${d.origin} ${c.verb} ${b}${d.minimum.toString()} ${c.unit}`;return`ზედმეტად პატარა: მოსალოდნელი ${d.origin} იყოს ${b}${d.minimum.toString()}`}case"invalid_format":if("starts_with"===d.format)return`არასწორი სტრინგი: უნდა იწყებოდეს "${d.prefix}"-ით`;if("ends_with"===d.format)return`არასწორი სტრინგი: უნდა მთავრდებოდეს "${d.suffix}"-ით`;if("includes"===d.format)return`არასწორი სტრინგი: უნდა შეიცავდეს "${d.includes}"-ს`;if("regex"===d.format)return`არასწორი სტრინგი: უნდა შეესაბამებოდეს შაბლონს ${d.pattern}`;return`არასწორი ${b[d.format]??d.format}`;case"not_multiple_of":return`არასწორი რიცხვი: უნდა იყოს ${d.divisor}-ის ჯერადი`;case"unrecognized_keys":return`უცნობი გასაღებ${d.keys.length>1?"ები":"ი"}: ${b3(d.keys,", ")}`;case"invalid_key":return`არასწორი გასაღები ${d.origin}-ში`;case"invalid_union":return"არასწორი შეყვანა";case"invalid_element":return`არასწორი მნიშვნელობა ${d.origin}-ში`;default:return`არასწორი შეყვანა`}})}},"kh",0,function(){return f9()},"km",0,f9,"ko",0,function(){let a,b,c;return{localeError:(a={string:{unit:"문자",verb:"to have"},file:{unit:"바이트",verb:"to have"},array:{unit:"개",verb:"to have"},set:{unit:"개",verb:"to have"}},b={regex:"입력",email:"이메일 주소",url:"URL",emoji:"이모지",uuid:"UUID",uuidv4:"UUIDv4",uuidv6:"UUIDv6",nanoid:"nanoid",guid:"GUID",cuid:"cuid",cuid2:"cuid2",ulid:"ULID",xid:"XID",ksuid:"KSUID",datetime:"ISO 날짜시간",date:"ISO 날짜",time:"ISO 시간",duration:"ISO 기간",ipv4:"IPv4 주소",ipv6:"IPv6 주소",cidrv4:"IPv4 범위",cidrv6:"IPv6 범위",base64:"base64 인코딩 문자열",base64url:"base64url 인코딩 문자열",json_string:"JSON 문자열",e164:"E.164 번호",jwt:"JWT",template_literal:"입력"},c={nan:"NaN"},d=>{switch(d.code){case"invalid_type":{let a=c[d.expected]??d.expected,b=cN(d.input),e=c[b]??b;if(/^[A-Z]/.test(d.expected))return`잘못된 입력: 예상 타입은 instanceof ${d.expected}, 받은 타입은 ${e}입니다`;return`잘못된 입력: 예상 타입은 ${a}, 받은 타입은 ${e}입니다`}case"invalid_value":if(1===d.values.length)return`잘못된 입력: 값은 ${cw(d.values[0])} 이어야 합니다`;return`잘못된 옵션: ${b3(d.values,"또는 ")} 중 하나여야 합니다`;case"too_big":{let b=d.inclusive?"이하":"미만",c="미만"===b?"이어야 합니다":"여야 합니다",e=a[d.origin]??null,f=e?.unit??"요소";if(e)return`${d.origin??"값"}이 너무 큽니다: ${d.maximum.toString()}${f} ${b}${c}`;return`${d.origin??"값"}이 너무 큽니다: ${d.maximum.toString()} ${b}${c}`}case"too_small":{let b=d.inclusive?"이상":"초과",c="이상"===b?"이어야 합니다":"여야 합니다",e=a[d.origin]??null,f=e?.unit??"요소";if(e)return`${d.origin??"값"}이 너무 작습니다: ${d.minimum.toString()}${f} ${b}${c}`;return`${d.origin??"값"}이 너무 작습니다: ${d.minimum.toString()} ${b}${c}`}case"invalid_format":if("starts_with"===d.format)return`잘못된 문자열: "${d.prefix}"(으)로 시작해야 합니다`;if("ends_with"===d.format)return`잘못된 문자열: "${d.suffix}"(으)로 끝나야 합니다`;if("includes"===d.format)return`잘못된 문자열: "${d.includes}"을(를) 포함해야 합니다`;if("regex"===d.format)return`잘못된 문자열: 정규식 ${d.pattern} 패턴과 일치해야 합니다`;return`잘못된 ${b[d.format]??d.format}`;case"not_multiple_of":return`잘못된 숫자: ${d.divisor}의 배수여야 합니다`;case"unrecognized_keys":return`인식할 수 없는 키: ${b3(d.keys,", ")}`;case"invalid_key":return`잘못된 키: ${d.origin}`;case"invalid_union":default:return`잘못된 입력`;case"invalid_element":return`잘못된 값: ${d.origin}`}})}},"lt",0,function(){return{localeError:(()=>{let a={string:{unit:{one:"simbolis",few:"simboliai",many:"simbolių"},verb:{smaller:{inclusive:"turi būti ne ilgesnė kaip",notInclusive:"turi būti trumpesnė kaip"},bigger:{inclusive:"turi būti ne trumpesnė kaip",notInclusive:"turi būti ilgesnė kaip"}}},file:{unit:{one:"baitas",few:"baitai",many:"baitų"},verb:{smaller:{inclusive:"turi būti ne didesnis kaip",notInclusive:"turi būti mažesnis kaip"},bigger:{inclusive:"turi būti ne mažesnis kaip",notInclusive:"turi būti didesnis kaip"}}},array:{unit:{one:"elementą",few:"elementus",many:"elementų"},verb:{smaller:{inclusive:"turi turėti ne daugiau kaip",notInclusive:"turi turėti mažiau kaip"},bigger:{inclusive:"turi turėti ne mažiau kaip",notInclusive:"turi turėti daugiau kaip"}}},set:{unit:{one:"elementą",few:"elementus",many:"elementų"},verb:{smaller:{inclusive:"turi turėti ne daugiau kaip",notInclusive:"turi turėti mažiau kaip"},bigger:{inclusive:"turi turėti ne mažiau kaip",notInclusive:"turi turėti daugiau kaip"}}}};function b(b,c,d,e){let f=a[b]??null;return null===f?f:{unit:f.unit[c],verb:f.verb[e][d?"inclusive":"notInclusive"]}}let c={regex:"įvestis",email:"el. pašto adresas",url:"URL",emoji:"jaustukas",uuid:"UUID",uuidv4:"UUIDv4",uuidv6:"UUIDv6",nanoid:"nanoid",guid:"GUID",cuid:"cuid",cuid2:"cuid2",ulid:"ULID",xid:"XID",ksuid:"KSUID",datetime:"ISO data ir laikas",date:"ISO data",time:"ISO laikas",duration:"ISO trukmė",ipv4:"IPv4 adresas",ipv6:"IPv6 adresas",cidrv4:"IPv4 tinklo prefiksas (CIDR)",cidrv6:"IPv6 tinklo prefiksas (CIDR)",base64:"base64 užkoduota eilutė",base64url:"base64url užkoduota eilutė",json_string:"JSON eilutė",e164:"E.164 numeris",jwt:"JWT",template_literal:"įvestis"},d={nan:"NaN",number:"skaičius",bigint:"sveikasis skaičius",string:"eilutė",boolean:"loginė reikšmė",undefined:"neapibrėžta reikšmė",function:"funkcija",symbol:"simbolis",array:"masyvas",object:"objektas",null:"nulinė reikšmė"};return a=>{switch(a.code){case"invalid_type":{let b=d[a.expected]??a.expected,c=cN(a.input),e=d[c]??c;if(/^[A-Z]/.test(a.expected))return`Gautas tipas ${e}, o tikėtasi - instanceof ${a.expected}`;return`Gautas tipas ${e}, o tikėtasi - ${b}`}case"invalid_value":if(1===a.values.length)return`Privalo būti ${cw(a.values[0])}`;return`Privalo būti vienas iš ${b3(a.values,"|")} pasirinkimų`;case"too_big":{let c=d[a.origin]??a.origin,e=b(a.origin,gb(Number(a.maximum)),a.inclusive??!1,"smaller");if(e?.verb)return`${ga(c??a.origin??"reikšmė")} ${e.verb} ${a.maximum.toString()} ${e.unit??"elementų"}`;let f=a.inclusive?"ne didesnis kaip":"mažesnis kaip";return`${ga(c??a.origin??"reikšmė")} turi būti ${f} ${a.maximum.toString()} ${e?.unit}`}case"too_small":{let c=d[a.origin]??a.origin,e=b(a.origin,gb(Number(a.minimum)),a.inclusive??!1,"bigger");if(e?.verb)return`${ga(c??a.origin??"reikšmė")} ${e.verb} ${a.minimum.toString()} ${e.unit??"elementų"}`;let f=a.inclusive?"ne mažesnis kaip":"didesnis kaip";return`${ga(c??a.origin??"reikšmė")} turi būti ${f} ${a.minimum.toString()} ${e?.unit}`}case"invalid_format":if("starts_with"===a.format)return`Eilutė privalo prasidėti "${a.prefix}"`;if("ends_with"===a.format)return`Eilutė privalo pasibaigti "${a.suffix}"`;if("includes"===a.format)return`Eilutė privalo įtraukti "${a.includes}"`;if("regex"===a.format)return`Eilutė privalo atitikti ${a.pattern}`;return`Neteisingas ${c[a.format]??a.format}`;case"not_multiple_of":return`Skaičius privalo būti ${a.divisor} kartotinis.`;case"unrecognized_keys":return`Neatpažint${a.keys.length>1?"i":"as"} rakt${a.keys.length>1?"ai":"as"}: ${b3(a.keys,", ")}`;case"invalid_key":return"Rastas klaidingas raktas";case"invalid_union":default:return"Klaidinga įvestis";case"invalid_element":{let b=d[a.origin]??a.origin;return`${ga(b??a.origin??"reikšmė")} turi klaidingą įvestį`}}}})()}},"mk",0,function(){let a,b,c;return{localeError:(a={string:{unit:"знаци",verb:"да имаат"},file:{unit:"бајти",verb:"да имаат"},array:{unit:"ставки",verb:"да имаат"},set:{unit:"ставки",verb:"да имаат"}},b={regex:"внес",email:"адреса на е-пошта",url:"URL",emoji:"емоџи",uuid:"UUID",uuidv4:"UUIDv4",uuidv6:"UUIDv6",nanoid:"nanoid",guid:"GUID",cuid:"cuid",cuid2:"cuid2",ulid:"ULID",xid:"XID",ksuid:"KSUID",datetime:"ISO датум и време",date:"ISO датум",time:"ISO време",duration:"ISO времетраење",ipv4:"IPv4 адреса",ipv6:"IPv6 адреса",cidrv4:"IPv4 опсег",cidrv6:"IPv6 опсег",base64:"base64-енкодирана низа",base64url:"base64url-енкодирана низа",json_string:"JSON низа",e164:"E.164 број",jwt:"JWT",template_literal:"внес"},c={nan:"NaN",number:"број",array:"низа"},d=>{switch(d.code){case"invalid_type":{let a=c[d.expected]??d.expected,b=cN(d.input),e=c[b]??b;if(/^[A-Z]/.test(d.expected))return`Грешен внес: се очекува instanceof ${d.expected}, примено ${e}`;return`Грешен внес: се очекува ${a}, примено ${e}`}case"invalid_value":if(1===d.values.length)return`Invalid input: expected ${cw(d.values[0])}`;return`Грешана опција: се очекува една ${b3(d.values,"|")}`;case"too_big":{let b=d.inclusive?"<=":"<",c=a[d.origin]??null;if(c)return`Премногу голем: се очекува ${d.origin??"вредноста"} да има ${b}${d.maximum.toString()} ${c.unit??"елементи"}`;return`Премногу голем: се очекува ${d.origin??"вредноста"} да биде ${b}${d.maximum.toString()}`}case"too_small":{let b=d.inclusive?">=":">",c=a[d.origin]??null;if(c)return`Премногу мал: се очекува ${d.origin} да има ${b}${d.minimum.toString()} ${c.unit}`;return`Премногу мал: се очекува ${d.origin} да биде ${b}${d.minimum.toString()}`}case"invalid_format":if("starts_with"===d.format)return`Неважечка низа: мора да започнува со "${d.prefix}"`;if("ends_with"===d.format)return`Неважечка низа: мора да завршува со "${d.suffix}"`;if("includes"===d.format)return`Неважечка низа: мора да вклучува "${d.includes}"`;if("regex"===d.format)return`Неважечка низа: мора да одгоара на патернот ${d.pattern}`;return`Invalid ${b[d.format]??d.format}`;case"not_multiple_of":return`Грешен број: мора да биде делив со ${d.divisor}`;case"unrecognized_keys":return`${d.keys.length>1?"Непрепознаени клучеви":"Непрепознаен клуч"}: ${b3(d.keys,", ")}`;case"invalid_key":return`Грешен клуч во ${d.origin}`;case"invalid_union":return"Грешен внес";case"invalid_element":return`Грешна вредност во ${d.origin}`;default:return`Грешен внес`}})}},"ms",0,function(){let a,b,c;return{localeError:(a={string:{unit:"aksara",verb:"mempunyai"},file:{unit:"bait",verb:"mempunyai"},array:{unit:"elemen",verb:"mempunyai"},set:{unit:"elemen",verb:"mempunyai"}},b={regex:"input",email:"alamat e-mel",url:"URL",emoji:"emoji",uuid:"UUID",uuidv4:"UUIDv4",uuidv6:"UUIDv6",nanoid:"nanoid",guid:"GUID",cuid:"cuid",cuid2:"cuid2",ulid:"ULID",xid:"XID",ksuid:"KSUID",datetime:"tarikh masa ISO",date:"tarikh ISO",time:"masa ISO",duration:"tempoh ISO",ipv4:"alamat IPv4",ipv6:"alamat IPv6",cidrv4:"julat IPv4",cidrv6:"julat IPv6",base64:"string dikodkan base64",base64url:"string dikodkan base64url",json_string:"string JSON",e164:"nombor E.164",jwt:"JWT",template_literal:"input"},c={nan:"NaN",number:"nombor"},d=>{switch(d.code){case"invalid_type":{let a=c[d.expected]??d.expected,b=cN(d.input),e=c[b]??b;if(/^[A-Z]/.test(d.expected))return`Input tidak sah: dijangka instanceof ${d.expected}, diterima ${e}`;return`Input tidak sah: dijangka ${a}, diterima ${e}`}case"invalid_value":if(1===d.values.length)return`Input tidak sah: dijangka ${cw(d.values[0])}`;return`Pilihan tidak sah: dijangka salah satu daripada ${b3(d.values,"|")}`;case"too_big":{let b=d.inclusive?"<=":"<",c=a[d.origin]??null;if(c)return`Terlalu besar: dijangka ${d.origin??"nilai"} ${c.verb} ${b}${d.maximum.toString()} ${c.unit??"elemen"}`;return`Terlalu besar: dijangka ${d.origin??"nilai"} adalah ${b}${d.maximum.toString()}`}case"too_small":{let b=d.inclusive?">=":">",c=a[d.origin]??null;if(c)return`Terlalu kecil: dijangka ${d.origin} ${c.verb} ${b}${d.minimum.toString()} ${c.unit}`;return`Terlalu kecil: dijangka ${d.origin} adalah ${b}${d.minimum.toString()}`}case"invalid_format":if("starts_with"===d.format)return`String tidak sah: mesti bermula dengan "${d.prefix}"`;if("ends_with"===d.format)return`String tidak sah: mesti berakhir dengan "${d.suffix}"`;if("includes"===d.format)return`String tidak sah: mesti mengandungi "${d.includes}"`;if("regex"===d.format)return`String tidak sah: mesti sepadan dengan corak ${d.pattern}`;return`${b[d.format]??d.format} tidak sah`;case"not_multiple_of":return`Nombor tidak sah: perlu gandaan ${d.divisor}`;case"unrecognized_keys":return`Kunci tidak dikenali: ${b3(d.keys,", ")}`;case"invalid_key":return`Kunci tidak sah dalam ${d.origin}`;case"invalid_union":default:return"Input tidak sah";case"invalid_element":return`Nilai tidak sah dalam ${d.origin}`}})}},"nl",0,function(){let a,b,c;return{localeError:(a={string:{unit:"tekens",verb:"heeft"},file:{unit:"bytes",verb:"heeft"},array:{unit:"elementen",verb:"heeft"},set:{unit:"elementen",verb:"heeft"}},b={regex:"invoer",email:"emailadres",url:"URL",emoji:"emoji",uuid:"UUID",uuidv4:"UUIDv4",uuidv6:"UUIDv6",nanoid:"nanoid",guid:"GUID",cuid:"cuid",cuid2:"cuid2",ulid:"ULID",xid:"XID",ksuid:"KSUID",datetime:"ISO datum en tijd",date:"ISO datum",time:"ISO tijd",duration:"ISO duur",ipv4:"IPv4-adres",ipv6:"IPv6-adres",cidrv4:"IPv4-bereik",cidrv6:"IPv6-bereik",base64:"base64-gecodeerde tekst",base64url:"base64 URL-gecodeerde tekst",json_string:"JSON string",e164:"E.164-nummer",jwt:"JWT",template_literal:"invoer"},c={nan:"NaN",number:"getal"},d=>{switch(d.code){case"invalid_type":{let a=c[d.expected]??d.expected,b=cN(d.input),e=c[b]??b;if(/^[A-Z]/.test(d.expected))return`Ongeldige invoer: verwacht instanceof ${d.expected}, ontving ${e}`;return`Ongeldige invoer: verwacht ${a}, ontving ${e}`}case"invalid_value":if(1===d.values.length)return`Ongeldige invoer: verwacht ${cw(d.values[0])}`;return`Ongeldige optie: verwacht \xe9\xe9n van ${b3(d.values,"|")}`;case"too_big":{let b=d.inclusive?"<=":"<",c=a[d.origin]??null,e="date"===d.origin?"laat":"string"===d.origin?"lang":"groot";if(c)return`Te ${e}: verwacht dat ${d.origin??"waarde"} ${b}${d.maximum.toString()} ${c.unit??"elementen"} ${c.verb}`;return`Te ${e}: verwacht dat ${d.origin??"waarde"} ${b}${d.maximum.toString()} is`}case"too_small":{let b=d.inclusive?">=":">",c=a[d.origin]??null,e="date"===d.origin?"vroeg":"string"===d.origin?"kort":"klein";if(c)return`Te ${e}: verwacht dat ${d.origin} ${b}${d.minimum.toString()} ${c.unit} ${c.verb}`;return`Te ${e}: verwacht dat ${d.origin} ${b}${d.minimum.toString()} is`}case"invalid_format":if("starts_with"===d.format)return`Ongeldige tekst: moet met "${d.prefix}" beginnen`;if("ends_with"===d.format)return`Ongeldige tekst: moet op "${d.suffix}" eindigen`;if("includes"===d.format)return`Ongeldige tekst: moet "${d.includes}" bevatten`;if("regex"===d.format)return`Ongeldige tekst: moet overeenkomen met patroon ${d.pattern}`;return`Ongeldig: ${b[d.format]??d.format}`;case"not_multiple_of":return`Ongeldig getal: moet een veelvoud van ${d.divisor} zijn`;case"unrecognized_keys":return`Onbekende key${d.keys.length>1?"s":""}: ${b3(d.keys,", ")}`;case"invalid_key":return`Ongeldige key in ${d.origin}`;case"invalid_union":default:return"Ongeldige invoer";case"invalid_element":return`Ongeldige waarde in ${d.origin}`}})}},"no",0,function(){let a,b,c;return{localeError:(a={string:{unit:"tegn",verb:"å ha"},file:{unit:"bytes",verb:"å ha"},array:{unit:"elementer",verb:"å inneholde"},set:{unit:"elementer",verb:"å inneholde"}},b={regex:"input",email:"e-postadresse",url:"URL",emoji:"emoji",uuid:"UUID",uuidv4:"UUIDv4",uuidv6:"UUIDv6",nanoid:"nanoid",guid:"GUID",cuid:"cuid",cuid2:"cuid2",ulid:"ULID",xid:"XID",ksuid:"KSUID",datetime:"ISO dato- og klokkeslett",date:"ISO-dato",time:"ISO-klokkeslett",duration:"ISO-varighet",ipv4:"IPv4-område",ipv6:"IPv6-område",cidrv4:"IPv4-spekter",cidrv6:"IPv6-spekter",base64:"base64-enkodet streng",base64url:"base64url-enkodet streng",json_string:"JSON-streng",e164:"E.164-nummer",jwt:"JWT",template_literal:"input"},c={nan:"NaN",number:"tall",array:"liste"},d=>{switch(d.code){case"invalid_type":{let a=c[d.expected]??d.expected,b=cN(d.input),e=c[b]??b;if(/^[A-Z]/.test(d.expected))return`Ugyldig input: forventet instanceof ${d.expected}, fikk ${e}`;return`Ugyldig input: forventet ${a}, fikk ${e}`}case"invalid_value":if(1===d.values.length)return`Ugyldig verdi: forventet ${cw(d.values[0])}`;return`Ugyldig valg: forventet en av ${b3(d.values,"|")}`;case"too_big":{let b=d.inclusive?"<=":"<",c=a[d.origin]??null;if(c)return`For stor(t): forventet ${d.origin??"value"} til \xe5 ha ${b}${d.maximum.toString()} ${c.unit??"elementer"}`;return`For stor(t): forventet ${d.origin??"value"} til \xe5 ha ${b}${d.maximum.toString()}`}case"too_small":{let b=d.inclusive?">=":">",c=a[d.origin]??null;if(c)return`For lite(n): forventet ${d.origin} til \xe5 ha ${b}${d.minimum.toString()} ${c.unit}`;return`For lite(n): forventet ${d.origin} til \xe5 ha ${b}${d.minimum.toString()}`}case"invalid_format":if("starts_with"===d.format)return`Ugyldig streng: m\xe5 starte med "${d.prefix}"`;if("ends_with"===d.format)return`Ugyldig streng: m\xe5 ende med "${d.suffix}"`;if("includes"===d.format)return`Ugyldig streng: m\xe5 inneholde "${d.includes}"`;if("regex"===d.format)return`Ugyldig streng: m\xe5 matche m\xf8nsteret ${d.pattern}`;return`Ugyldig ${b[d.format]??d.format}`;case"not_multiple_of":return`Ugyldig tall: m\xe5 v\xe6re et multiplum av ${d.divisor}`;case"unrecognized_keys":return`${d.keys.length>1?"Ukjente nøkler":"Ukjent nøkkel"}: ${b3(d.keys,", ")}`;case"invalid_key":return`Ugyldig n\xf8kkel i ${d.origin}`;case"invalid_union":default:return"Ugyldig input";case"invalid_element":return`Ugyldig verdi i ${d.origin}`}})}},"ota",0,function(){let a,b,c;return{localeError:(a={string:{unit:"harf",verb:"olmalıdır"},file:{unit:"bayt",verb:"olmalıdır"},array:{unit:"unsur",verb:"olmalıdır"},set:{unit:"unsur",verb:"olmalıdır"}},b={regex:"giren",email:"epostagâh",url:"URL",emoji:"emoji",uuid:"UUID",uuidv4:"UUIDv4",uuidv6:"UUIDv6",nanoid:"nanoid",guid:"GUID",cuid:"cuid",cuid2:"cuid2",ulid:"ULID",xid:"XID",ksuid:"KSUID",datetime:"ISO hengâmı",date:"ISO tarihi",time:"ISO zamanı",duration:"ISO müddeti",ipv4:"IPv4 nişânı",ipv6:"IPv6 nişânı",cidrv4:"IPv4 menzili",cidrv6:"IPv6 menzili",base64:"base64-şifreli metin",base64url:"base64url-şifreli metin",json_string:"JSON metin",e164:"E.164 sayısı",jwt:"JWT",template_literal:"giren"},c={nan:"NaN",number:"numara",array:"saf",null:"gayb"},d=>{switch(d.code){case"invalid_type":{let a=c[d.expected]??d.expected,b=cN(d.input),e=c[b]??b;if(/^[A-Z]/.test(d.expected))return`F\xe2sit giren: umulan instanceof ${d.expected}, alınan ${e}`;return`F\xe2sit giren: umulan ${a}, alınan ${e}`}case"invalid_value":if(1===d.values.length)return`F\xe2sit giren: umulan ${cw(d.values[0])}`;return`F\xe2sit tercih: m\xfbteberler ${b3(d.values,"|")}`;case"too_big":{let b=d.inclusive?"<=":"<",c=a[d.origin]??null;if(c)return`Fazla b\xfcy\xfck: ${d.origin??"value"}, ${b}${d.maximum.toString()} ${c.unit??"elements"} sahip olmalıydı.`;return`Fazla b\xfcy\xfck: ${d.origin??"value"}, ${b}${d.maximum.toString()} olmalıydı.`}case"too_small":{let b=d.inclusive?">=":">",c=a[d.origin]??null;if(c)return`Fazla k\xfc\xe7\xfck: ${d.origin}, ${b}${d.minimum.toString()} ${c.unit} sahip olmalıydı.`;return`Fazla k\xfc\xe7\xfck: ${d.origin}, ${b}${d.minimum.toString()} olmalıydı.`}case"invalid_format":if("starts_with"===d.format)return`F\xe2sit metin: "${d.prefix}" ile başlamalı.`;if("ends_with"===d.format)return`F\xe2sit metin: "${d.suffix}" ile bitmeli.`;if("includes"===d.format)return`F\xe2sit metin: "${d.includes}" ihtiv\xe2 etmeli.`;if("regex"===d.format)return`F\xe2sit metin: ${d.pattern} nakşına uymalı.`;return`F\xe2sit ${b[d.format]??d.format}`;case"not_multiple_of":return`F\xe2sit sayı: ${d.divisor} katı olmalıydı.`;case"unrecognized_keys":return`Tanınmayan anahtar ${d.keys.length>1?"s":""}: ${b3(d.keys,", ")}`;case"invalid_key":return`${d.origin} i\xe7in tanınmayan anahtar var.`;case"invalid_union":return"Giren tanınamadı.";case"invalid_element":return`${d.origin} i\xe7in tanınmayan kıymet var.`;default:return`Kıymet tanınamadı.`}})}},"pl",0,function(){let a,b,c;return{localeError:(a={string:{unit:"znaków",verb:"mieć"},file:{unit:"bajtów",verb:"mieć"},array:{unit:"elementów",verb:"mieć"},set:{unit:"elementów",verb:"mieć"}},b={regex:"wyrażenie",email:"adres email",url:"URL",emoji:"emoji",uuid:"UUID",uuidv4:"UUIDv4",uuidv6:"UUIDv6",nanoid:"nanoid",guid:"GUID",cuid:"cuid",cuid2:"cuid2",ulid:"ULID",xid:"XID",ksuid:"KSUID",datetime:"data i godzina w formacie ISO",date:"data w formacie ISO",time:"godzina w formacie ISO",duration:"czas trwania ISO",ipv4:"adres IPv4",ipv6:"adres IPv6",cidrv4:"zakres IPv4",cidrv6:"zakres IPv6",base64:"ciąg znaków zakodowany w formacie base64",base64url:"ciąg znaków zakodowany w formacie base64url",json_string:"ciąg znaków w formacie JSON",e164:"liczba E.164",jwt:"JWT",template_literal:"wejście"},c={nan:"NaN",number:"liczba",array:"tablica"},d=>{switch(d.code){case"invalid_type":{let a=c[d.expected]??d.expected,b=cN(d.input),e=c[b]??b;if(/^[A-Z]/.test(d.expected))return`Nieprawidłowe dane wejściowe: oczekiwano instanceof ${d.expected}, otrzymano ${e}`;return`Nieprawidłowe dane wejściowe: oczekiwano ${a}, otrzymano ${e}`}case"invalid_value":if(1===d.values.length)return`Nieprawidłowe dane wejściowe: oczekiwano ${cw(d.values[0])}`;return`Nieprawidłowa opcja: oczekiwano jednej z wartości ${b3(d.values,"|")}`;case"too_big":{let b=d.inclusive?"<=":"<",c=a[d.origin]??null;if(c)return`Za duża wartość: oczekiwano, że ${d.origin??"wartość"} będzie mieć ${b}${d.maximum.toString()} ${c.unit??"elementów"}`;return`Zbyt duż(y/a/e): oczekiwano, że ${d.origin??"wartość"} będzie wynosić ${b}${d.maximum.toString()}`}case"too_small":{let b=d.inclusive?">=":">",c=a[d.origin]??null;if(c)return`Za mała wartość: oczekiwano, że ${d.origin??"wartość"} będzie mieć ${b}${d.minimum.toString()} ${c.unit??"elementów"}`;return`Zbyt mał(y/a/e): oczekiwano, że ${d.origin??"wartość"} będzie wynosić ${b}${d.minimum.toString()}`}case"invalid_format":if("starts_with"===d.format)return`Nieprawidłowy ciąg znak\xf3w: musi zaczynać się od "${d.prefix}"`;if("ends_with"===d.format)return`Nieprawidłowy ciąg znak\xf3w: musi kończyć się na "${d.suffix}"`;if("includes"===d.format)return`Nieprawidłowy ciąg znak\xf3w: musi zawierać "${d.includes}"`;if("regex"===d.format)return`Nieprawidłowy ciąg znak\xf3w: musi odpowiadać wzorcowi ${d.pattern}`;return`Nieprawidłow(y/a/e) ${b[d.format]??d.format}`;case"not_multiple_of":return`Nieprawidłowa liczba: musi być wielokrotnością ${d.divisor}`;case"unrecognized_keys":return`Nierozpoznane klucze${d.keys.length>1?"s":""}: ${b3(d.keys,", ")}`;case"invalid_key":return`Nieprawidłowy klucz w ${d.origin}`;case"invalid_union":return"Nieprawidłowe dane wejściowe";case"invalid_element":return`Nieprawidłowa wartość w ${d.origin}`;default:return`Nieprawidłowe dane wejściowe`}})}},"ps",0,function(){let a,b,c;return{localeError:(a={string:{unit:"توکي",verb:"ولري"},file:{unit:"بایټس",verb:"ولري"},array:{unit:"توکي",verb:"ولري"},set:{unit:"توکي",verb:"ولري"}},b={regex:"ورودي",email:"بریښنالیک",url:"یو آر ال",emoji:"ایموجي",uuid:"UUID",uuidv4:"UUIDv4",uuidv6:"UUIDv6",nanoid:"nanoid",guid:"GUID",cuid:"cuid",cuid2:"cuid2",ulid:"ULID",xid:"XID",ksuid:"KSUID",datetime:"نیټه او وخت",date:"نېټه",time:"وخت",duration:"موده",ipv4:"د IPv4 پته",ipv6:"د IPv6 پته",cidrv4:"د IPv4 ساحه",cidrv6:"د IPv6 ساحه",base64:"base64-encoded متن",base64url:"base64url-encoded متن",json_string:"JSON متن",e164:"د E.164 شمېره",jwt:"JWT",template_literal:"ورودي"},c={nan:"NaN",number:"عدد",array:"ارې"},d=>{switch(d.code){case"invalid_type":{let a=c[d.expected]??d.expected,b=cN(d.input),e=c[b]??b;if(/^[A-Z]/.test(d.expected))return`ناسم ورودي: باید instanceof ${d.expected} وای, مګر ${e} ترلاسه شو`;return`ناسم ورودي: باید ${a} وای, مګر ${e} ترلاسه شو`}case"invalid_value":if(1===d.values.length)return`ناسم ورودي: باید ${cw(d.values[0])} وای`;return`ناسم انتخاب: باید یو له ${b3(d.values,"|")} څخه وای`;case"too_big":{let b=d.inclusive?"<=":"<",c=a[d.origin]??null;if(c)return`ډیر لوی: ${d.origin??"ارزښت"} باید ${b}${d.maximum.toString()} ${c.unit??"عنصرونه"} ولري`;return`ډیر لوی: ${d.origin??"ارزښت"} باید ${b}${d.maximum.toString()} وي`}case"too_small":{let b=d.inclusive?">=":">",c=a[d.origin]??null;if(c)return`ډیر کوچنی: ${d.origin} باید ${b}${d.minimum.toString()} ${c.unit} ولري`;return`ډیر کوچنی: ${d.origin} باید ${b}${d.minimum.toString()} وي`}case"invalid_format":if("starts_with"===d.format)return`ناسم متن: باید د "${d.prefix}" سره پیل شي`;if("ends_with"===d.format)return`ناسم متن: باید د "${d.suffix}" سره پای ته ورسيږي`;if("includes"===d.format)return`ناسم متن: باید "${d.includes}" ولري`;if("regex"===d.format)return`ناسم متن: باید د ${d.pattern} سره مطابقت ولري`;return`${b[d.format]??d.format} ناسم دی`;case"not_multiple_of":return`ناسم عدد: باید د ${d.divisor} مضرب وي`;case"unrecognized_keys":return`ناسم ${d.keys.length>1?"کلیډونه":"کلیډ"}: ${b3(d.keys,", ")}`;case"invalid_key":return`ناسم کلیډ په ${d.origin} کې`;case"invalid_union":default:return`ناسمه ورودي`;case"invalid_element":return`ناسم عنصر په ${d.origin} کې`}})}},"pt",0,function(){let a,b,c;return{localeError:(a={string:{unit:"caracteres",verb:"ter"},file:{unit:"bytes",verb:"ter"},array:{unit:"itens",verb:"ter"},set:{unit:"itens",verb:"ter"}},b={regex:"padrão",email:"endereço de e-mail",url:"URL",emoji:"emoji",uuid:"UUID",uuidv4:"UUIDv4",uuidv6:"UUIDv6",nanoid:"nanoid",guid:"GUID",cuid:"cuid",cuid2:"cuid2",ulid:"ULID",xid:"XID",ksuid:"KSUID",datetime:"data e hora ISO",date:"data ISO",time:"hora ISO",duration:"duração ISO",ipv4:"endereço IPv4",ipv6:"endereço IPv6",cidrv4:"faixa de IPv4",cidrv6:"faixa de IPv6",base64:"texto codificado em base64",base64url:"URL codificada em base64",json_string:"texto JSON",e164:"número E.164",jwt:"JWT",template_literal:"entrada"},c={nan:"NaN",number:"número",null:"nulo"},d=>{switch(d.code){case"invalid_type":{let a=c[d.expected]??d.expected,b=cN(d.input),e=c[b]??b;if(/^[A-Z]/.test(d.expected))return`Tipo inv\xe1lido: esperado instanceof ${d.expected}, recebido ${e}`;return`Tipo inv\xe1lido: esperado ${a}, recebido ${e}`}case"invalid_value":if(1===d.values.length)return`Entrada inv\xe1lida: esperado ${cw(d.values[0])}`;return`Op\xe7\xe3o inv\xe1lida: esperada uma das ${b3(d.values,"|")}`;case"too_big":{let b=d.inclusive?"<=":"<",c=a[d.origin]??null;if(c)return`Muito grande: esperado que ${d.origin??"valor"} tivesse ${b}${d.maximum.toString()} ${c.unit??"elementos"}`;return`Muito grande: esperado que ${d.origin??"valor"} fosse ${b}${d.maximum.toString()}`}case"too_small":{let b=d.inclusive?">=":">",c=a[d.origin]??null;if(c)return`Muito pequeno: esperado que ${d.origin} tivesse ${b}${d.minimum.toString()} ${c.unit}`;return`Muito pequeno: esperado que ${d.origin} fosse ${b}${d.minimum.toString()}`}case"invalid_format":if("starts_with"===d.format)return`Texto inv\xe1lido: deve come\xe7ar com "${d.prefix}"`;if("ends_with"===d.format)return`Texto inv\xe1lido: deve terminar com "${d.suffix}"`;if("includes"===d.format)return`Texto inv\xe1lido: deve incluir "${d.includes}"`;if("regex"===d.format)return`Texto inv\xe1lido: deve corresponder ao padr\xe3o ${d.pattern}`;return`${b[d.format]??d.format} inv\xe1lido`;case"not_multiple_of":return`N\xfamero inv\xe1lido: deve ser m\xfaltiplo de ${d.divisor}`;case"unrecognized_keys":return`Chave${d.keys.length>1?"s":""} desconhecida${d.keys.length>1?"s":""}: ${b3(d.keys,", ")}`;case"invalid_key":return`Chave inv\xe1lida em ${d.origin}`;case"invalid_union":return"Entrada inválida";case"invalid_element":return`Valor inv\xe1lido em ${d.origin}`;default:return`Campo inv\xe1lido`}})}},"ru",0,function(){let a,b,c;return{localeError:(a={string:{unit:{one:"символ",few:"символа",many:"символов"},verb:"иметь"},file:{unit:{one:"байт",few:"байта",many:"байт"},verb:"иметь"},array:{unit:{one:"элемент",few:"элемента",many:"элементов"},verb:"иметь"},set:{unit:{one:"элемент",few:"элемента",many:"элементов"},verb:"иметь"}},b={regex:"ввод",email:"email адрес",url:"URL",emoji:"эмодзи",uuid:"UUID",uuidv4:"UUIDv4",uuidv6:"UUIDv6",nanoid:"nanoid",guid:"GUID",cuid:"cuid",cuid2:"cuid2",ulid:"ULID",xid:"XID",ksuid:"KSUID",datetime:"ISO дата и время",date:"ISO дата",time:"ISO время",duration:"ISO длительность",ipv4:"IPv4 адрес",ipv6:"IPv6 адрес",cidrv4:"IPv4 диапазон",cidrv6:"IPv6 диапазон",base64:"строка в формате base64",base64url:"строка в формате base64url",json_string:"JSON строка",e164:"номер E.164",jwt:"JWT",template_literal:"ввод"},c={nan:"NaN",number:"число",array:"массив"},d=>{switch(d.code){case"invalid_type":{let a=c[d.expected]??d.expected,b=cN(d.input),e=c[b]??b;if(/^[A-Z]/.test(d.expected))return`Неверный ввод: ожидалось instanceof ${d.expected}, получено ${e}`;return`Неверный ввод: ожидалось ${a}, получено ${e}`}case"invalid_value":if(1===d.values.length)return`Неверный ввод: ожидалось ${cw(d.values[0])}`;return`Неверный вариант: ожидалось одно из ${b3(d.values,"|")}`;case"too_big":{let b=d.inclusive?"<=":"<",c=a[d.origin]??null;if(c){let a=gc(Number(d.maximum),c.unit.one,c.unit.few,c.unit.many);return`Слишком большое значение: ожидалось, что ${d.origin??"значение"} будет иметь ${b}${d.maximum.toString()} ${a}`}return`Слишком большое значение: ожидалось, что ${d.origin??"значение"} будет ${b}${d.maximum.toString()}`}case"too_small":{let b=d.inclusive?">=":">",c=a[d.origin]??null;if(c){let a=gc(Number(d.minimum),c.unit.one,c.unit.few,c.unit.many);return`Слишком маленькое значение: ожидалось, что ${d.origin} будет иметь ${b}${d.minimum.toString()} ${a}`}return`Слишком маленькое значение: ожидалось, что ${d.origin} будет ${b}${d.minimum.toString()}`}case"invalid_format":if("starts_with"===d.format)return`Неверная строка: должна начинаться с "${d.prefix}"`;if("ends_with"===d.format)return`Неверная строка: должна заканчиваться на "${d.suffix}"`;if("includes"===d.format)return`Неверная строка: должна содержать "${d.includes}"`;if("regex"===d.format)return`Неверная строка: должна соответствовать шаблону ${d.pattern}`;return`Неверный ${b[d.format]??d.format}`;case"not_multiple_of":return`Неверное число: должно быть кратным ${d.divisor}`;case"unrecognized_keys":return`Нераспознанн${d.keys.length>1?"ые":"ый"} ключ${d.keys.length>1?"и":""}: ${b3(d.keys,", ")}`;case"invalid_key":return`Неверный ключ в ${d.origin}`;case"invalid_union":return"Неверные входные данные";case"invalid_element":return`Неверное значение в ${d.origin}`;default:return`Неверные входные данные`}})}},"sl",0,function(){let a,b,c;return{localeError:(a={string:{unit:"znakov",verb:"imeti"},file:{unit:"bajtov",verb:"imeti"},array:{unit:"elementov",verb:"imeti"},set:{unit:"elementov",verb:"imeti"}},b={regex:"vnos",email:"e-poštni naslov",url:"URL",emoji:"emoji",uuid:"UUID",uuidv4:"UUIDv4",uuidv6:"UUIDv6",nanoid:"nanoid",guid:"GUID",cuid:"cuid",cuid2:"cuid2",ulid:"ULID",xid:"XID",ksuid:"KSUID",datetime:"ISO datum in čas",date:"ISO datum",time:"ISO čas",duration:"ISO trajanje",ipv4:"IPv4 naslov",ipv6:"IPv6 naslov",cidrv4:"obseg IPv4",cidrv6:"obseg IPv6",base64:"base64 kodiran niz",base64url:"base64url kodiran niz",json_string:"JSON niz",e164:"E.164 številka",jwt:"JWT",template_literal:"vnos"},c={nan:"NaN",number:"število",array:"tabela"},d=>{switch(d.code){case"invalid_type":{let a=c[d.expected]??d.expected,b=cN(d.input),e=c[b]??b;if(/^[A-Z]/.test(d.expected))return`Neveljaven vnos: pričakovano instanceof ${d.expected}, prejeto ${e}`;return`Neveljaven vnos: pričakovano ${a}, prejeto ${e}`}case"invalid_value":if(1===d.values.length)return`Neveljaven vnos: pričakovano ${cw(d.values[0])}`;return`Neveljavna možnost: pričakovano eno izmed ${b3(d.values,"|")}`;case"too_big":{let b=d.inclusive?"<=":"<",c=a[d.origin]??null;if(c)return`Preveliko: pričakovano, da bo ${d.origin??"vrednost"} imelo ${b}${d.maximum.toString()} ${c.unit??"elementov"}`;return`Preveliko: pričakovano, da bo ${d.origin??"vrednost"} ${b}${d.maximum.toString()}`}case"too_small":{let b=d.inclusive?">=":">",c=a[d.origin]??null;if(c)return`Premajhno: pričakovano, da bo ${d.origin} imelo ${b}${d.minimum.toString()} ${c.unit}`;return`Premajhno: pričakovano, da bo ${d.origin} ${b}${d.minimum.toString()}`}case"invalid_format":if("starts_with"===d.format)return`Neveljaven niz: mora se začeti z "${d.prefix}"`;if("ends_with"===d.format)return`Neveljaven niz: mora se končati z "${d.suffix}"`;if("includes"===d.format)return`Neveljaven niz: mora vsebovati "${d.includes}"`;if("regex"===d.format)return`Neveljaven niz: mora ustrezati vzorcu ${d.pattern}`;return`Neveljaven ${b[d.format]??d.format}`;case"not_multiple_of":return`Neveljavno število: mora biti večkratnik ${d.divisor}`;case"unrecognized_keys":return`Neprepoznan${d.keys.length>1?"i ključi":" ključ"}: ${b3(d.keys,", ")}`;case"invalid_key":return`Neveljaven ključ v ${d.origin}`;case"invalid_union":default:return"Neveljaven vnos";case"invalid_element":return`Neveljavna vrednost v ${d.origin}`}})}},"sv",0,function(){let a,b,c;return{localeError:(a={string:{unit:"tecken",verb:"att ha"},file:{unit:"bytes",verb:"att ha"},array:{unit:"objekt",verb:"att innehålla"},set:{unit:"objekt",verb:"att innehålla"}},b={regex:"reguljärt uttryck",email:"e-postadress",url:"URL",emoji:"emoji",uuid:"UUID",uuidv4:"UUIDv4",uuidv6:"UUIDv6",nanoid:"nanoid",guid:"GUID",cuid:"cuid",cuid2:"cuid2",ulid:"ULID",xid:"XID",ksuid:"KSUID",datetime:"ISO-datum och tid",date:"ISO-datum",time:"ISO-tid",duration:"ISO-varaktighet",ipv4:"IPv4-intervall",ipv6:"IPv6-intervall",cidrv4:"IPv4-spektrum",cidrv6:"IPv6-spektrum",base64:"base64-kodad sträng",base64url:"base64url-kodad sträng",json_string:"JSON-sträng",e164:"E.164-nummer",jwt:"JWT",template_literal:"mall-literal"},c={nan:"NaN",number:"antal",array:"lista"},d=>{switch(d.code){case"invalid_type":{let a=c[d.expected]??d.expected,b=cN(d.input),e=c[b]??b;if(/^[A-Z]/.test(d.expected))return`Ogiltig inmatning: f\xf6rv\xe4ntat instanceof ${d.expected}, fick ${e}`;return`Ogiltig inmatning: f\xf6rv\xe4ntat ${a}, fick ${e}`}case"invalid_value":if(1===d.values.length)return`Ogiltig inmatning: f\xf6rv\xe4ntat ${cw(d.values[0])}`;return`Ogiltigt val: f\xf6rv\xe4ntade en av ${b3(d.values,"|")}`;case"too_big":{let b=d.inclusive?"<=":"<",c=a[d.origin]??null;if(c)return`F\xf6r stor(t): f\xf6rv\xe4ntade ${d.origin??"värdet"} att ha ${b}${d.maximum.toString()} ${c.unit??"element"}`;return`F\xf6r stor(t): f\xf6rv\xe4ntat ${d.origin??"värdet"} att ha ${b}${d.maximum.toString()}`}case"too_small":{let b=d.inclusive?">=":">",c=a[d.origin]??null;if(c)return`F\xf6r lite(t): f\xf6rv\xe4ntade ${d.origin??"värdet"} att ha ${b}${d.minimum.toString()} ${c.unit}`;return`F\xf6r lite(t): f\xf6rv\xe4ntade ${d.origin??"värdet"} att ha ${b}${d.minimum.toString()}`}case"invalid_format":if("starts_with"===d.format)return`Ogiltig str\xe4ng: m\xe5ste b\xf6rja med "${d.prefix}"`;if("ends_with"===d.format)return`Ogiltig str\xe4ng: m\xe5ste sluta med "${d.suffix}"`;if("includes"===d.format)return`Ogiltig str\xe4ng: m\xe5ste inneh\xe5lla "${d.includes}"`;if("regex"===d.format)return`Ogiltig str\xe4ng: m\xe5ste matcha m\xf6nstret "${d.pattern}"`;return`Ogiltig(t) ${b[d.format]??d.format}`;case"not_multiple_of":return`Ogiltigt tal: m\xe5ste vara en multipel av ${d.divisor}`;case"unrecognized_keys":return`${d.keys.length>1?"Okända nycklar":"Okänd nyckel"}: ${b3(d.keys,", ")}`;case"invalid_key":return`Ogiltig nyckel i ${d.origin??"värdet"}`;case"invalid_union":default:return"Ogiltig input";case"invalid_element":return`Ogiltigt v\xe4rde i ${d.origin??"värdet"}`}})}},"ta",0,function(){let a,b,c;return{localeError:(a={string:{unit:"எழுத்துக்கள்",verb:"கொண்டிருக்க வேண்டும்"},file:{unit:"பைட்டுகள்",verb:"கொண்டிருக்க வேண்டும்"},array:{unit:"உறுப்புகள்",verb:"கொண்டிருக்க வேண்டும்"},set:{unit:"உறுப்புகள்",verb:"கொண்டிருக்க வேண்டும்"}},b={regex:"உள்ளீடு",email:"மின்னஞ்சல் முகவரி",url:"URL",emoji:"emoji",uuid:"UUID",uuidv4:"UUIDv4",uuidv6:"UUIDv6",nanoid:"nanoid",guid:"GUID",cuid:"cuid",cuid2:"cuid2",ulid:"ULID",xid:"XID",ksuid:"KSUID",datetime:"ISO தேதி நேரம்",date:"ISO தேதி",time:"ISO நேரம்",duration:"ISO கால அளவு",ipv4:"IPv4 முகவரி",ipv6:"IPv6 முகவரி",cidrv4:"IPv4 வரம்பு",cidrv6:"IPv6 வரம்பு",base64:"base64-encoded சரம்",base64url:"base64url-encoded சரம்",json_string:"JSON சரம்",e164:"E.164 எண்",jwt:"JWT",template_literal:"input"},c={nan:"NaN",number:"எண்",array:"அணி",null:"வெறுமை"},d=>{switch(d.code){case"invalid_type":{let a=c[d.expected]??d.expected,b=cN(d.input),e=c[b]??b;if(/^[A-Z]/.test(d.expected))return`தவறான உள்ளீடு: எதிர்பார்க்கப்பட்டது instanceof ${d.expected}, பெறப்பட்டது ${e}`;return`தவறான உள்ளீடு: எதிர்பார்க்கப்பட்டது ${a}, பெறப்பட்டது ${e}`}case"invalid_value":if(1===d.values.length)return`தவறான உள்ளீடு: எதிர்பார்க்கப்பட்டது ${cw(d.values[0])}`;return`தவறான விருப்பம்: எதிர்பார்க்கப்பட்டது ${b3(d.values,"|")} இல் ஒன்று`;case"too_big":{let b=d.inclusive?"<=":"<",c=a[d.origin]??null;if(c)return`மிக பெரியது: எதிர்பார்க்கப்பட்டது ${d.origin??"மதிப்பு"} ${b}${d.maximum.toString()} ${c.unit??"உறுப்புகள்"} ஆக இருக்க வேண்டும்`;return`மிக பெரியது: எதிர்பார்க்கப்பட்டது ${d.origin??"மதிப்பு"} ${b}${d.maximum.toString()} ஆக இருக்க வேண்டும்`}case"too_small":{let b=d.inclusive?">=":">",c=a[d.origin]??null;if(c)return`மிகச் சிறியது: எதிர்பார்க்கப்பட்டது ${d.origin} ${b}${d.minimum.toString()} ${c.unit} ஆக இருக்க வேண்டும்`;return`மிகச் சிறியது: எதிர்பார்க்கப்பட்டது ${d.origin} ${b}${d.minimum.toString()} ஆக இருக்க வேண்டும்`}case"invalid_format":if("starts_with"===d.format)return`தவறான சரம்: "${d.prefix}" இல் தொடங்க வேண்டும்`;if("ends_with"===d.format)return`தவறான சரம்: "${d.suffix}" இல் முடிவடைய வேண்டும்`;if("includes"===d.format)return`தவறான சரம்: "${d.includes}" ஐ உள்ளடக்க வேண்டும்`;if("regex"===d.format)return`தவறான சரம்: ${d.pattern} முறைபாட்டுடன் பொருந்த வேண்டும்`;return`தவறான ${b[d.format]??d.format}`;case"not_multiple_of":return`தவறான எண்: ${d.divisor} இன் பலமாக இருக்க வேண்டும்`;case"unrecognized_keys":return`அடையாளம் தெரியாத விசை${d.keys.length>1?"கள்":""}: ${b3(d.keys,", ")}`;case"invalid_key":return`${d.origin} இல் தவறான விசை`;case"invalid_union":return"தவறான உள்ளீடு";case"invalid_element":return`${d.origin} இல் தவறான மதிப்பு`;default:return`தவறான உள்ளீடு`}})}},"th",0,function(){let a,b,c;return{localeError:(a={string:{unit:"ตัวอักษร",verb:"ควรมี"},file:{unit:"ไบต์",verb:"ควรมี"},array:{unit:"รายการ",verb:"ควรมี"},set:{unit:"รายการ",verb:"ควรมี"}},b={regex:"ข้อมูลที่ป้อน",email:"ที่อยู่อีเมล",url:"URL",emoji:"อิโมจิ",uuid:"UUID",uuidv4:"UUIDv4",uuidv6:"UUIDv6",nanoid:"nanoid",guid:"GUID",cuid:"cuid",cuid2:"cuid2",ulid:"ULID",xid:"XID",ksuid:"KSUID",datetime:"วันที่เวลาแบบ ISO",date:"วันที่แบบ ISO",time:"เวลาแบบ ISO",duration:"ช่วงเวลาแบบ ISO",ipv4:"ที่อยู่ IPv4",ipv6:"ที่อยู่ IPv6",cidrv4:"ช่วง IP แบบ IPv4",cidrv6:"ช่วง IP แบบ IPv6",base64:"ข้อความแบบ Base64",base64url:"ข้อความแบบ Base64 สำหรับ URL",json_string:"ข้อความแบบ JSON",e164:"เบอร์โทรศัพท์ระหว่างประเทศ (E.164)",jwt:"โทเคน JWT",template_literal:"ข้อมูลที่ป้อน"},c={nan:"NaN",number:"ตัวเลข",array:"อาร์เรย์ (Array)",null:"ไม่มีค่า (null)"},d=>{switch(d.code){case"invalid_type":{let a=c[d.expected]??d.expected,b=cN(d.input),e=c[b]??b;if(/^[A-Z]/.test(d.expected))return`ประเภทข้อมูลไม่ถูกต้อง: ควรเป็น instanceof ${d.expected} แต่ได้รับ ${e}`;return`ประเภทข้อมูลไม่ถูกต้อง: ควรเป็น ${a} แต่ได้รับ ${e}`}case"invalid_value":if(1===d.values.length)return`ค่าไม่ถูกต้อง: ควรเป็น ${cw(d.values[0])}`;return`ตัวเลือกไม่ถูกต้อง: ควรเป็นหนึ่งใน ${b3(d.values,"|")}`;case"too_big":{let b=d.inclusive?"ไม่เกิน":"น้อยกว่า",c=a[d.origin]??null;if(c)return`เกินกำหนด: ${d.origin??"ค่า"} ควรมี${b} ${d.maximum.toString()} ${c.unit??"รายการ"}`;return`เกินกำหนด: ${d.origin??"ค่า"} ควรมี${b} ${d.maximum.toString()}`}case"too_small":{let b=d.inclusive?"อย่างน้อย":"มากกว่า",c=a[d.origin]??null;if(c)return`น้อยกว่ากำหนด: ${d.origin} ควรมี${b} ${d.minimum.toString()} ${c.unit}`;return`น้อยกว่ากำหนด: ${d.origin} ควรมี${b} ${d.minimum.toString()}`}case"invalid_format":if("starts_with"===d.format)return`รูปแบบไม่ถูกต้อง: ข้อความต้องขึ้นต้นด้วย "${d.prefix}"`;if("ends_with"===d.format)return`รูปแบบไม่ถูกต้อง: ข้อความต้องลงท้ายด้วย "${d.suffix}"`;if("includes"===d.format)return`รูปแบบไม่ถูกต้อง: ข้อความต้องมี "${d.includes}" อยู่ในข้อความ`;if("regex"===d.format)return`รูปแบบไม่ถูกต้อง: ต้องตรงกับรูปแบบที่กำหนด ${d.pattern}`;return`รูปแบบไม่ถูกต้อง: ${b[d.format]??d.format}`;case"not_multiple_of":return`ตัวเลขไม่ถูกต้อง: ต้องเป็นจำนวนที่หารด้วย ${d.divisor} ได้ลงตัว`;case"unrecognized_keys":return`พบคีย์ที่ไม่รู้จัก: ${b3(d.keys,", ")}`;case"invalid_key":return`คีย์ไม่ถูกต้องใน ${d.origin}`;case"invalid_union":return"ข้อมูลไม่ถูกต้อง: ไม่ตรงกับรูปแบบยูเนียนที่กำหนดไว้";case"invalid_element":return`ข้อมูลไม่ถูกต้องใน ${d.origin}`;default:return`ข้อมูลไม่ถูกต้อง`}})}},"tr",0,function(){let a,b,c;return{localeError:(a={string:{unit:"karakter",verb:"olmalı"},file:{unit:"bayt",verb:"olmalı"},array:{unit:"öğe",verb:"olmalı"},set:{unit:"öğe",verb:"olmalı"}},b={regex:"girdi",email:"e-posta adresi",url:"URL",emoji:"emoji",uuid:"UUID",uuidv4:"UUIDv4",uuidv6:"UUIDv6",nanoid:"nanoid",guid:"GUID",cuid:"cuid",cuid2:"cuid2",ulid:"ULID",xid:"XID",ksuid:"KSUID",datetime:"ISO tarih ve saat",date:"ISO tarih",time:"ISO saat",duration:"ISO süre",ipv4:"IPv4 adresi",ipv6:"IPv6 adresi",cidrv4:"IPv4 aralığı",cidrv6:"IPv6 aralığı",base64:"base64 ile şifrelenmiş metin",base64url:"base64url ile şifrelenmiş metin",json_string:"JSON dizesi",e164:"E.164 sayısı",jwt:"JWT",template_literal:"Şablon dizesi"},c={nan:"NaN"},d=>{switch(d.code){case"invalid_type":{let a=c[d.expected]??d.expected,b=cN(d.input),e=c[b]??b;if(/^[A-Z]/.test(d.expected))return`Ge\xe7ersiz değer: beklenen instanceof ${d.expected}, alınan ${e}`;return`Ge\xe7ersiz değer: beklenen ${a}, alınan ${e}`}case"invalid_value":if(1===d.values.length)return`Ge\xe7ersiz değer: beklenen ${cw(d.values[0])}`;return`Ge\xe7ersiz se\xe7enek: aşağıdakilerden biri olmalı: ${b3(d.values,"|")}`;case"too_big":{let b=d.inclusive?"<=":"<",c=a[d.origin]??null;if(c)return`\xc7ok b\xfcy\xfck: beklenen ${d.origin??"değer"} ${b}${d.maximum.toString()} ${c.unit??"öğe"}`;return`\xc7ok b\xfcy\xfck: beklenen ${d.origin??"değer"} ${b}${d.maximum.toString()}`}case"too_small":{let b=d.inclusive?">=":">",c=a[d.origin]??null;if(c)return`\xc7ok k\xfc\xe7\xfck: beklenen ${d.origin} ${b}${d.minimum.toString()} ${c.unit}`;return`\xc7ok k\xfc\xe7\xfck: beklenen ${d.origin} ${b}${d.minimum.toString()}`}case"invalid_format":if("starts_with"===d.format)return`Ge\xe7ersiz metin: "${d.prefix}" ile başlamalı`;if("ends_with"===d.format)return`Ge\xe7ersiz metin: "${d.suffix}" ile bitmeli`;if("includes"===d.format)return`Ge\xe7ersiz metin: "${d.includes}" i\xe7ermeli`;if("regex"===d.format)return`Ge\xe7ersiz metin: ${d.pattern} desenine uymalı`;return`Ge\xe7ersiz ${b[d.format]??d.format}`;case"not_multiple_of":return`Ge\xe7ersiz sayı: ${d.divisor} ile tam b\xf6l\xfcnebilmeli`;case"unrecognized_keys":return`Tanınmayan anahtar${d.keys.length>1?"lar":""}: ${b3(d.keys,", ")}`;case"invalid_key":return`${d.origin} i\xe7inde ge\xe7ersiz anahtar`;case"invalid_union":return"Geçersiz değer";case"invalid_element":return`${d.origin} i\xe7inde ge\xe7ersiz değer`;default:return`Ge\xe7ersiz değer`}})}},"ua",0,function(){return gd()},"uk",0,gd,"ur",0,function(){let a,b,c;return{localeError:(a={string:{unit:"حروف",verb:"ہونا"},file:{unit:"بائٹس",verb:"ہونا"},array:{unit:"آئٹمز",verb:"ہونا"},set:{unit:"آئٹمز",verb:"ہونا"}},b={regex:"ان پٹ",email:"ای میل ایڈریس",url:"یو آر ایل",emoji:"ایموجی",uuid:"یو یو آئی ڈی",uuidv4:"یو یو آئی ڈی وی 4",uuidv6:"یو یو آئی ڈی وی 6",nanoid:"نینو آئی ڈی",guid:"جی یو آئی ڈی",cuid:"سی یو آئی ڈی",cuid2:"سی یو آئی ڈی 2",ulid:"یو ایل آئی ڈی",xid:"ایکس آئی ڈی",ksuid:"کے ایس یو آئی ڈی",datetime:"آئی ایس او ڈیٹ ٹائم",date:"آئی ایس او تاریخ",time:"آئی ایس او وقت",duration:"آئی ایس او مدت",ipv4:"آئی پی وی 4 ایڈریس",ipv6:"آئی پی وی 6 ایڈریس",cidrv4:"آئی پی وی 4 رینج",cidrv6:"آئی پی وی 6 رینج",base64:"بیس 64 ان کوڈڈ سٹرنگ",base64url:"بیس 64 یو آر ایل ان کوڈڈ سٹرنگ",json_string:"جے ایس او این سٹرنگ",e164:"ای 164 نمبر",jwt:"جے ڈبلیو ٹی",template_literal:"ان پٹ"},c={nan:"NaN",number:"نمبر",array:"آرے",null:"نل"},d=>{switch(d.code){case"invalid_type":{let a=c[d.expected]??d.expected,b=cN(d.input),e=c[b]??b;if(/^[A-Z]/.test(d.expected))return`غلط ان پٹ: instanceof ${d.expected} متوقع تھا، ${e} موصول ہوا`;return`غلط ان پٹ: ${a} متوقع تھا، ${e} موصول ہوا`}case"invalid_value":if(1===d.values.length)return`غلط ان پٹ: ${cw(d.values[0])} متوقع تھا`;return`غلط آپشن: ${b3(d.values,"|")} میں سے ایک متوقع تھا`;case"too_big":{let b=d.inclusive?"<=":"<",c=a[d.origin]??null;if(c)return`بہت بڑا: ${d.origin??"ویلیو"} کے ${b}${d.maximum.toString()} ${c.unit??"عناصر"} ہونے متوقع تھے`;return`بہت بڑا: ${d.origin??"ویلیو"} کا ${b}${d.maximum.toString()} ہونا متوقع تھا`}case"too_small":{let b=d.inclusive?">=":">",c=a[d.origin]??null;if(c)return`بہت چھوٹا: ${d.origin} کے ${b}${d.minimum.toString()} ${c.unit} ہونے متوقع تھے`;return`بہت چھوٹا: ${d.origin} کا ${b}${d.minimum.toString()} ہونا متوقع تھا`}case"invalid_format":if("starts_with"===d.format)return`غلط سٹرنگ: "${d.prefix}" سے شروع ہونا چاہیے`;if("ends_with"===d.format)return`غلط سٹرنگ: "${d.suffix}" پر ختم ہونا چاہیے`;if("includes"===d.format)return`غلط سٹرنگ: "${d.includes}" شامل ہونا چاہیے`;if("regex"===d.format)return`غلط سٹرنگ: پیٹرن ${d.pattern} سے میچ ہونا چاہیے`;return`غلط ${b[d.format]??d.format}`;case"not_multiple_of":return`غلط نمبر: ${d.divisor} کا مضاعف ہونا چاہیے`;case"unrecognized_keys":return`غیر تسلیم شدہ کی${d.keys.length>1?"ز":""}: ${b3(d.keys,"، ")}`;case"invalid_key":return`${d.origin} میں غلط کی`;case"invalid_union":return"غلط ان پٹ";case"invalid_element":return`${d.origin} میں غلط ویلیو`;default:return`غلط ان پٹ`}})}},"uz",0,function(){let a,b,c;return{localeError:(a={string:{unit:"belgi",verb:"bo‘lishi kerak"},file:{unit:"bayt",verb:"bo‘lishi kerak"},array:{unit:"element",verb:"bo‘lishi kerak"},set:{unit:"element",verb:"bo‘lishi kerak"}},b={regex:"kirish",email:"elektron pochta manzili",url:"URL",emoji:"emoji",uuid:"UUID",uuidv4:"UUIDv4",uuidv6:"UUIDv6",nanoid:"nanoid",guid:"GUID",cuid:"cuid",cuid2:"cuid2",ulid:"ULID",xid:"XID",ksuid:"KSUID",datetime:"ISO sana va vaqti",date:"ISO sana",time:"ISO vaqt",duration:"ISO davomiylik",ipv4:"IPv4 manzil",ipv6:"IPv6 manzil",mac:"MAC manzil",cidrv4:"IPv4 diapazon",cidrv6:"IPv6 diapazon",base64:"base64 kodlangan satr",base64url:"base64url kodlangan satr",json_string:"JSON satr",e164:"E.164 raqam",jwt:"JWT",template_literal:"kirish"},c={nan:"NaN",number:"raqam",array:"massiv"},d=>{switch(d.code){case"invalid_type":{let a=c[d.expected]??d.expected,b=cN(d.input),e=c[b]??b;if(/^[A-Z]/.test(d.expected))return`Noto‘g‘ri kirish: kutilgan instanceof ${d.expected}, qabul qilingan ${e}`;return`Noto‘g‘ri kirish: kutilgan ${a}, qabul qilingan ${e}`}case"invalid_value":if(1===d.values.length)return`Noto‘g‘ri kirish: kutilgan ${cw(d.values[0])}`;return`Noto‘g‘ri variant: quyidagilardan biri kutilgan ${b3(d.values,"|")}`;case"too_big":{let b=d.inclusive?"<=":"<",c=a[d.origin]??null;if(c)return`Juda katta: kutilgan ${d.origin??"qiymat"} ${b}${d.maximum.toString()} ${c.unit} ${c.verb}`;return`Juda katta: kutilgan ${d.origin??"qiymat"} ${b}${d.maximum.toString()}`}case"too_small":{let b=d.inclusive?">=":">",c=a[d.origin]??null;if(c)return`Juda kichik: kutilgan ${d.origin} ${b}${d.minimum.toString()} ${c.unit} ${c.verb}`;return`Juda kichik: kutilgan ${d.origin} ${b}${d.minimum.toString()}`}case"invalid_format":if("starts_with"===d.format)return`Noto‘g‘ri satr: "${d.prefix}" bilan boshlanishi kerak`;if("ends_with"===d.format)return`Noto‘g‘ri satr: "${d.suffix}" bilan tugashi kerak`;if("includes"===d.format)return`Noto‘g‘ri satr: "${d.includes}" ni o‘z ichiga olishi kerak`;if("regex"===d.format)return`Noto‘g‘ri satr: ${d.pattern} shabloniga mos kelishi kerak`;return`Noto‘g‘ri ${b[d.format]??d.format}`;case"not_multiple_of":return`Noto‘g‘ri raqam: ${d.divisor} ning karralisi bo‘lishi kerak`;case"unrecognized_keys":return`Noma’lum kalit${d.keys.length>1?"lar":""}: ${b3(d.keys,", ")}`;case"invalid_key":return`${d.origin} dagi kalit noto‘g‘ri`;case"invalid_union":return"Noto‘g‘ri kirish";case"invalid_element":return`${d.origin} da noto‘g‘ri qiymat`;default:return`Noto‘g‘ri kirish`}})}},"vi",0,function(){let a,b,c;return{localeError:(a={string:{unit:"ký tự",verb:"có"},file:{unit:"byte",verb:"có"},array:{unit:"phần tử",verb:"có"},set:{unit:"phần tử",verb:"có"}},b={regex:"đầu vào",email:"địa chỉ email",url:"URL",emoji:"emoji",uuid:"UUID",uuidv4:"UUIDv4",uuidv6:"UUIDv6",nanoid:"nanoid",guid:"GUID",cuid:"cuid",cuid2:"cuid2",ulid:"ULID",xid:"XID",ksuid:"KSUID",datetime:"ngày giờ ISO",date:"ngày ISO",time:"giờ ISO",duration:"khoảng thời gian ISO",ipv4:"địa chỉ IPv4",ipv6:"địa chỉ IPv6",cidrv4:"dải IPv4",cidrv6:"dải IPv6",base64:"chuỗi mã hóa base64",base64url:"chuỗi mã hóa base64url",json_string:"chuỗi JSON",e164:"số E.164",jwt:"JWT",template_literal:"đầu vào"},c={nan:"NaN",number:"số",array:"mảng"},d=>{switch(d.code){case"invalid_type":{let a=c[d.expected]??d.expected,b=cN(d.input),e=c[b]??b;if(/^[A-Z]/.test(d.expected))return`Đầu v\xe0o kh\xf4ng hợp lệ: mong đợi instanceof ${d.expected}, nhận được ${e}`;return`Đầu v\xe0o kh\xf4ng hợp lệ: mong đợi ${a}, nhận được ${e}`}case"invalid_value":if(1===d.values.length)return`Đầu v\xe0o kh\xf4ng hợp lệ: mong đợi ${cw(d.values[0])}`;return`T\xf9y chọn kh\xf4ng hợp lệ: mong đợi một trong c\xe1c gi\xe1 trị ${b3(d.values,"|")}`;case"too_big":{let b=d.inclusive?"<=":"<",c=a[d.origin]??null;if(c)return`Qu\xe1 lớn: mong đợi ${d.origin??"giá trị"} ${c.verb} ${b}${d.maximum.toString()} ${c.unit??"phần tử"}`;return`Qu\xe1 lớn: mong đợi ${d.origin??"giá trị"} ${b}${d.maximum.toString()}`}case"too_small":{let b=d.inclusive?">=":">",c=a[d.origin]??null;if(c)return`Qu\xe1 nhỏ: mong đợi ${d.origin} ${c.verb} ${b}${d.minimum.toString()} ${c.unit}`;return`Qu\xe1 nhỏ: mong đợi ${d.origin} ${b}${d.minimum.toString()}`}case"invalid_format":if("starts_with"===d.format)return`Chuỗi kh\xf4ng hợp lệ: phải bắt đầu bằng "${d.prefix}"`;if("ends_with"===d.format)return`Chuỗi kh\xf4ng hợp lệ: phải kết th\xfac bằng "${d.suffix}"`;if("includes"===d.format)return`Chuỗi kh\xf4ng hợp lệ: phải bao gồm "${d.includes}"`;if("regex"===d.format)return`Chuỗi kh\xf4ng hợp lệ: phải khớp với mẫu ${d.pattern}`;return`${b[d.format]??d.format} kh\xf4ng hợp lệ`;case"not_multiple_of":return`Số kh\xf4ng hợp lệ: phải l\xe0 bội số của ${d.divisor}`;case"unrecognized_keys":return`Kh\xf3a kh\xf4ng được nhận dạng: ${b3(d.keys,", ")}`;case"invalid_key":return`Kh\xf3a kh\xf4ng hợp lệ trong ${d.origin}`;case"invalid_union":return"Đầu vào không hợp lệ";case"invalid_element":return`Gi\xe1 trị kh\xf4ng hợp lệ trong ${d.origin}`;default:return`Đầu v\xe0o kh\xf4ng hợp lệ`}})}},"yo",0,function(){let a,b,c;return{localeError:(a={string:{unit:"àmi",verb:"ní"},file:{unit:"bytes",verb:"ní"},array:{unit:"nkan",verb:"ní"},set:{unit:"nkan",verb:"ní"}},b={regex:"ẹ̀rọ ìbáwọlé",email:"àdírẹ́sì ìmẹ́lì",url:"URL",emoji:"emoji",uuid:"UUID",uuidv4:"UUIDv4",uuidv6:"UUIDv6",nanoid:"nanoid",guid:"GUID",cuid:"cuid",cuid2:"cuid2",ulid:"ULID",xid:"XID",ksuid:"KSUID",datetime:"àkókò ISO",date:"ọjọ́ ISO",time:"àkókò ISO",duration:"àkókò tó pé ISO",ipv4:"àdírẹ́sì IPv4",ipv6:"àdírẹ́sì IPv6",cidrv4:"àgbègbè IPv4",cidrv6:"àgbègbè IPv6",base64:"ọ̀rọ̀ tí a kọ́ ní base64",base64url:"ọ̀rọ̀ base64url",json_string:"ọ̀rọ̀ JSON",e164:"nọ́mbà E.164",jwt:"JWT",template_literal:"ẹ̀rọ ìbáwọlé"},c={nan:"NaN",number:"nọ́mbà",array:"akopọ"},d=>{switch(d.code){case"invalid_type":{let a=c[d.expected]??d.expected,b=cN(d.input),e=c[b]??b;if(/^[A-Z]/.test(d.expected))return`\xccb\xe1wọl\xe9 aṣ\xecṣe: a n\xed l\xe1ti fi instanceof ${d.expected}, \xe0mọ̀ a r\xed ${e}`;return`\xccb\xe1wọl\xe9 aṣ\xecṣe: a n\xed l\xe1ti fi ${a}, \xe0mọ̀ a r\xed ${e}`}case"invalid_value":if(1===d.values.length)return`\xccb\xe1wọl\xe9 aṣ\xecṣe: a n\xed l\xe1ti fi ${cw(d.values[0])}`;return`\xc0ṣ\xe0y\xe0n aṣ\xecṣe: yan ọ̀kan l\xe1ra ${b3(d.values,"|")}`;case"too_big":{let b=d.inclusive?"<=":"<",c=a[d.origin]??null;if(c)return`T\xf3 pọ̀ j\xf9: a n\xed l\xe1ti jẹ́ p\xe9 ${d.origin??"iye"} ${c.verb} ${b}${d.maximum} ${c.unit}`;return`T\xf3 pọ̀ j\xf9: a n\xed l\xe1ti jẹ́ ${b}${d.maximum}`}case"too_small":{let b=d.inclusive?">=":">",c=a[d.origin]??null;if(c)return`K\xe9r\xe9 ju: a n\xed l\xe1ti jẹ́ p\xe9 ${d.origin} ${c.verb} ${b}${d.minimum} ${c.unit}`;return`K\xe9r\xe9 ju: a n\xed l\xe1ti jẹ́ ${b}${d.minimum}`}case"invalid_format":if("starts_with"===d.format)return`Ọ̀rọ̀ aṣ\xecṣe: gbọ́dọ̀ bẹ̀rẹ̀ pẹ̀l\xfa "${d.prefix}"`;if("ends_with"===d.format)return`Ọ̀rọ̀ aṣ\xecṣe: gbọ́dọ̀ par\xed pẹ̀l\xfa "${d.suffix}"`;if("includes"===d.format)return`Ọ̀rọ̀ aṣ\xecṣe: gbọ́dọ̀ n\xed "${d.includes}"`;if("regex"===d.format)return`Ọ̀rọ̀ aṣ\xecṣe: gbọ́dọ̀ b\xe1 \xe0pẹẹrẹ mu ${d.pattern}`;return`Aṣ\xecṣe: ${b[d.format]??d.format}`;case"not_multiple_of":return`Nọ́mb\xe0 aṣ\xecṣe: gbọ́dọ̀ jẹ́ \xe8y\xe0 p\xedp\xedn ti ${d.divisor}`;case"unrecognized_keys":return`Bọt\xecn\xec \xe0\xecmọ̀: ${b3(d.keys,", ")}`;case"invalid_key":return`Bọt\xecn\xec aṣ\xecṣe n\xedn\xfa ${d.origin}`;case"invalid_union":default:return"Ìbáwọlé aṣìṣe";case"invalid_element":return`Iye aṣ\xecṣe n\xedn\xfa ${d.origin}`}})}},"zhCN",0,function(){let a,b,c;return{localeError:(a={string:{unit:"字符",verb:"包含"},file:{unit:"字节",verb:"包含"},array:{unit:"项",verb:"包含"},set:{unit:"项",verb:"包含"}},b={regex:"输入",email:"电子邮件",url:"URL",emoji:"表情符号",uuid:"UUID",uuidv4:"UUIDv4",uuidv6:"UUIDv6",nanoid:"nanoid",guid:"GUID",cuid:"cuid",cuid2:"cuid2",ulid:"ULID",xid:"XID",ksuid:"KSUID",datetime:"ISO日期时间",date:"ISO日期",time:"ISO时间",duration:"ISO时长",ipv4:"IPv4地址",ipv6:"IPv6地址",cidrv4:"IPv4网段",cidrv6:"IPv6网段",base64:"base64编码字符串",base64url:"base64url编码字符串",json_string:"JSON字符串",e164:"E.164号码",jwt:"JWT",template_literal:"输入"},c={nan:"NaN",number:"数字",array:"数组",null:"空值(null)"},d=>{switch(d.code){case"invalid_type":{let a=c[d.expected]??d.expected,b=cN(d.input),e=c[b]??b;if(/^[A-Z]/.test(d.expected))return`无效输入：期望 instanceof ${d.expected}，实际接收 ${e}`;return`无效输入：期望 ${a}，实际接收 ${e}`}case"invalid_value":if(1===d.values.length)return`无效输入：期望 ${cw(d.values[0])}`;return`无效选项：期望以下之一 ${b3(d.values,"|")}`;case"too_big":{let b=d.inclusive?"<=":"<",c=a[d.origin]??null;if(c)return`数值过大：期望 ${d.origin??"值"} ${b}${d.maximum.toString()} ${c.unit??"个元素"}`;return`数值过大：期望 ${d.origin??"值"} ${b}${d.maximum.toString()}`}case"too_small":{let b=d.inclusive?">=":">",c=a[d.origin]??null;if(c)return`数值过小：期望 ${d.origin} ${b}${d.minimum.toString()} ${c.unit}`;return`数值过小：期望 ${d.origin} ${b}${d.minimum.toString()}`}case"invalid_format":if("starts_with"===d.format)return`无效字符串：必须以 "${d.prefix}" 开头`;if("ends_with"===d.format)return`无效字符串：必须以 "${d.suffix}" 结尾`;if("includes"===d.format)return`无效字符串：必须包含 "${d.includes}"`;if("regex"===d.format)return`无效字符串：必须满足正则表达式 ${d.pattern}`;return`无效${b[d.format]??d.format}`;case"not_multiple_of":return`无效数字：必须是 ${d.divisor} 的倍数`;case"unrecognized_keys":return`出现未知的键(key): ${b3(d.keys,", ")}`;case"invalid_key":return`${d.origin} 中的键(key)无效`;case"invalid_union":return"无效输入";case"invalid_element":return`${d.origin} 中包含无效值(value)`;default:return`无效输入`}})}},"zhTW",0,function(){let a,b,c;return{localeError:(a={string:{unit:"字元",verb:"擁有"},file:{unit:"位元組",verb:"擁有"},array:{unit:"項目",verb:"擁有"},set:{unit:"項目",verb:"擁有"}},b={regex:"輸入",email:"郵件地址",url:"URL",emoji:"emoji",uuid:"UUID",uuidv4:"UUIDv4",uuidv6:"UUIDv6",nanoid:"nanoid",guid:"GUID",cuid:"cuid",cuid2:"cuid2",ulid:"ULID",xid:"XID",ksuid:"KSUID",datetime:"ISO 日期時間",date:"ISO 日期",time:"ISO 時間",duration:"ISO 期間",ipv4:"IPv4 位址",ipv6:"IPv6 位址",cidrv4:"IPv4 範圍",cidrv6:"IPv6 範圍",base64:"base64 編碼字串",base64url:"base64url 編碼字串",json_string:"JSON 字串",e164:"E.164 數值",jwt:"JWT",template_literal:"輸入"},c={nan:"NaN"},d=>{switch(d.code){case"invalid_type":{let a=c[d.expected]??d.expected,b=cN(d.input),e=c[b]??b;if(/^[A-Z]/.test(d.expected))return`無效的輸入值：預期為 instanceof ${d.expected}，但收到 ${e}`;return`無效的輸入值：預期為 ${a}，但收到 ${e}`}case"invalid_value":if(1===d.values.length)return`無效的輸入值：預期為 ${cw(d.values[0])}`;return`無效的選項：預期為以下其中之一 ${b3(d.values,"|")}`;case"too_big":{let b=d.inclusive?"<=":"<",c=a[d.origin]??null;if(c)return`數值過大：預期 ${d.origin??"值"} 應為 ${b}${d.maximum.toString()} ${c.unit??"個元素"}`;return`數值過大：預期 ${d.origin??"值"} 應為 ${b}${d.maximum.toString()}`}case"too_small":{let b=d.inclusive?">=":">",c=a[d.origin]??null;if(c)return`數值過小：預期 ${d.origin} 應為 ${b}${d.minimum.toString()} ${c.unit}`;return`數值過小：預期 ${d.origin} 應為 ${b}${d.minimum.toString()}`}case"invalid_format":if("starts_with"===d.format)return`無效的字串：必須以 "${d.prefix}" 開頭`;if("ends_with"===d.format)return`無效的字串：必須以 "${d.suffix}" 結尾`;if("includes"===d.format)return`無效的字串：必須包含 "${d.includes}"`;if("regex"===d.format)return`無效的字串：必須符合格式 ${d.pattern}`;return`無效的 ${b[d.format]??d.format}`;case"not_multiple_of":return`無效的數字：必須為 ${d.divisor} 的倍數`;case"unrecognized_keys":return`無法識別的鍵值${d.keys.length>1?"們":""}：${b3(d.keys,"、")}`;case"invalid_key":return`${d.origin} 中有無效的鍵值`;case"invalid_union":return"無效的輸入值";case"invalid_element":return`${d.origin} 中有無效的值`;default:return`無效的輸入值`}})}}],96899);var l4=a.i(96899);a.i(316206),a.i(223502),a.i(268766),a.i(326886);var l5=a.i(168567);a.s(["$ZodAny",0,fe,"$ZodArray",0,fk,"$ZodAsyncError",()=>bV,"$ZodBase64",0,e_,"$ZodBase64URL",0,e1,"$ZodBigInt",0,e9,"$ZodBigIntFormat",0,fa,"$ZodBoolean",0,e8,"$ZodCIDRv4",0,eY,"$ZodCIDRv6",0,eZ,"$ZodCUID",0,eM,"$ZodCUID2",0,eN,"$ZodCatch",0,fS,"$ZodCheck",0,ed,"$ZodCheckBigIntFormat",0,ej,"$ZodCheckEndsWith",0,ew,"$ZodCheckGreaterThan",0,eg,"$ZodCheckIncludes",0,eu,"$ZodCheckLengthEquals",0,ep,"$ZodCheckLessThan",0,ef,"$ZodCheckLowerCase",0,es,"$ZodCheckMaxLength",0,en,"$ZodCheckMaxSize",0,ek,"$ZodCheckMimeType",0,ez,"$ZodCheckMinLength",0,eo,"$ZodCheckMinSize",0,el,"$ZodCheckMultipleOf",0,eh,"$ZodCheckNumberFormat",0,ei,"$ZodCheckOverwrite",0,eA,"$ZodCheckProperty",0,ey,"$ZodCheckRegex",0,er,"$ZodCheckSizeEquals",0,em,"$ZodCheckStartsWith",0,ev,"$ZodCheckStringFormat",0,eq,"$ZodCheckUpperCase",0,et,"$ZodCodec",0,fW,"$ZodCustom",0,f3,"$ZodCustomStringFormat",0,e5,"$ZodDate",0,fi,"$ZodDefault",0,fM,"$ZodDiscriminatedUnion",0,fu,"$ZodE164",0,e2,"$ZodEmail",0,eI,"$ZodEmoji",0,eK,"$ZodEncodeError",()=>bW,"$ZodEnum",0,fE,"$ZodError",0,cY,"$ZodExactOptional",0,fK,"$ZodFile",0,fG,"$ZodFunction",0,f0,"$ZodGUID",0,eG,"$ZodIPv4",0,eV,"$ZodIPv6",0,eW,"$ZodISODate",0,eS,"$ZodISODateTime",0,eR,"$ZodISODuration",0,eU,"$ZodISOTime",0,eT,"$ZodIntersection",0,fv,"$ZodJWT",0,e4,"$ZodKSUID",0,eQ,"$ZodLazy",0,f2,"$ZodLiteral",0,fF,"$ZodMAC",0,eX,"$ZodMap",0,fA,"$ZodNaN",0,fT,"$ZodNanoID",0,eL,"$ZodNever",0,fg,"$ZodNonOptional",0,fP,"$ZodNull",0,fd,"$ZodNullable",0,fL,"$ZodNumber",0,e6,"$ZodNumberFormat",0,e7,"$ZodObject",0,fo,"$ZodObjectJIT",0,fp,"$ZodOptional",0,fJ,"$ZodPipe",0,fU,"$ZodPrefault",0,fO,"$ZodPromise",0,f1,"$ZodReadonly",0,fZ,"$ZodRealError",0,cZ,"$ZodRecord",0,fz,"$ZodRegistry",()=>gg,"$ZodSet",0,fC,"$ZodString",0,eE,"$ZodStringFormat",0,eF,"$ZodSuccess",0,fR,"$ZodSymbol",0,fb,"$ZodTemplateLiteral",0,f_,"$ZodTransform",0,fH,"$ZodTuple",0,fx,"$ZodType",0,eD,"$ZodULID",0,eO,"$ZodURL",0,eJ,"$ZodUUID",0,eH,"$ZodUndefined",0,fc,"$ZodUnion",0,fr,"$ZodUnknown",0,ff,"$ZodVoid",0,fh,"$ZodXID",0,eP,"$ZodXor",0,ft,"$brand",0,bU,"$constructor",()=>bT,"$input",0,gf,"$output",0,ge,"Doc",()=>eB,"JSONSchema",0,l5,"JSONSchemaGenerator",()=>iU,"NEVER",0,bS,"TimePrecision",0,gI,"_any",()=>g1,"_array",()=>hB,"_base64",()=>gE,"_base64url",()=>gF,"_bigint",()=>gW,"_boolean",()=>gU,"_catch",()=>hU,"_check",()=>h1,"_cidrv4",()=>gC,"_cidrv6",()=>gD,"_coercedBigint",()=>gX,"_coercedBoolean",()=>gV,"_coercedDate",()=>g6,"_coercedNumber",()=>gO,"_coercedString",()=>gk,"_cuid",()=>gu,"_cuid2",()=>gv,"_custom",()=>h$,"_date",()=>g5,"_decode",0,dd,"_decodeAsync",0,dh,"_default",()=>hR,"_discriminatedUnion",()=>hE,"_e164",()=>gG,"_email",()=>gl,"_emoji",()=>gs,"_encode",0,db,"_encodeAsync",0,df,"_endsWith",()=>hs,"_enum",()=>hK,"_file",()=>hN,"_float32",()=>gQ,"_float64",()=>gR,"_gt",()=>ha,"_gte",()=>hb,"_guid",()=>gm,"_includes",()=>hq,"_int",()=>gP,"_int32",()=>gS,"_int64",()=>gY,"_intersection",()=>hF,"_ipv4",()=>gz,"_ipv6",()=>gA,"_isoDate",()=>gK,"_isoDateTime",()=>gJ,"_isoDuration",()=>gM,"_isoTime",()=>gL,"_jwt",()=>gH,"_ksuid",()=>gy,"_lazy",()=>hY,"_length",()=>hm,"_literal",()=>hM,"_lowercase",()=>ho,"_lt",()=>g8,"_lte",()=>g9,"_mac",()=>gB,"_map",()=>hI,"_max",()=>g9,"_maxLength",()=>hk,"_maxSize",()=>hh,"_mime",()=>hu,"_min",()=>hb,"_minLength",()=>hl,"_minSize",()=>hi,"_multipleOf",()=>hg,"_nan",()=>g7,"_nanoid",()=>gt,"_nativeEnum",()=>hL,"_negative",()=>hd,"_never",()=>g3,"_nonnegative",()=>hf,"_nonoptional",()=>hS,"_nonpositive",()=>he,"_normalize",()=>hw,"_null",()=>g0,"_nullable",()=>hQ,"_number",()=>gN,"_optional",()=>hP,"_overwrite",()=>hv,"_parse",0,c3,"_parseAsync",0,c5,"_pipe",()=>hV,"_positive",()=>hc,"_promise",()=>hZ,"_property",()=>ht,"_readonly",()=>hW,"_record",()=>hH,"_refine",()=>h_,"_regex",()=>hn,"_safeDecode",0,dl,"_safeDecodeAsync",0,dq,"_safeEncode",0,dj,"_safeEncodeAsync",0,dn,"_safeParse",0,c7,"_safeParseAsync",0,c9,"_set",()=>hJ,"_size",()=>hj,"_slugify",()=>hA,"_startsWith",()=>hr,"_string",()=>gj,"_stringFormat",()=>h5,"_stringbool",()=>h4,"_success",()=>hT,"_superRefine",()=>h0,"_symbol",()=>g$,"_templateLiteral",()=>hX,"_toLowerCase",()=>hy,"_toUpperCase",()=>hz,"_transform",()=>hO,"_trim",()=>hx,"_tuple",()=>hG,"_uint32",()=>gT,"_uint64",()=>gZ,"_ulid",()=>gw,"_undefined",()=>g_,"_union",()=>hC,"_unknown",()=>g2,"_uppercase",()=>hp,"_url",()=>gr,"_uuid",()=>gn,"_uuidv4",()=>go,"_uuidv6",()=>gp,"_uuidv7",()=>gq,"_void",()=>g4,"_xid",()=>gx,"_xor",()=>hD,"clone",()=>ct,"config",()=>bY,"createStandardJSONSchemaMethod",0,ib,"createToJSONSchemaMethod",0,ia,"decode",0,de,"decodeAsync",0,di,"describe",()=>h2,"encode",0,dc,"encodeAsync",0,dg,"extractDefs",()=>h8,"finalize",()=>h9,"flattenError",()=>c$,"formatError",()=>c_,"globalConfig",0,bX,"globalRegistry",0,gi,"initializeContext",()=>h6,"isValidBase64",()=>e$,"isValidBase64URL",()=>e0,"isValidJWT",()=>e3,"locales",0,l4,"meta",()=>h3,"parse",0,c4,"parseAsync",0,c6,"prettifyError",()=>c2,"process",()=>h7,"regexes",0,l3,"registry",()=>gh,"safeDecode",0,dm,"safeDecodeAsync",0,dr,"safeEncode",0,dk,"safeEncodeAsync",0,dp,"safeParse",0,c8,"safeParseAsync",0,da,"toDotPath",()=>c1,"toJSONSchema",()=>iT,"treeifyError",()=>c0,"util",0,l2,"version",0,eC],363699);var l6=a.i(363699);a.i(158269),a.i(349372),a.i(914177),a.s(["$brand",0,bU,"ZodFirstPartyTypeKind",()=>K,"ZodIssueCode",0,lR,"config",()=>bY,"getErrorMap",()=>lT,"setErrorMap",()=>lS],19068),a.i(19068);var iV=iV,iW=iW,l7=a.i(279673);a.s(["$brand",0,bU,"$input",0,gf,"$output",0,ge,"NEVER",0,bS,"TimePrecision",0,gI,"ZodAny",0,kt,"ZodArray",0,kD,"ZodBase64",0,jX,"ZodBase64URL",0,jZ,"ZodBigInt",0,ki,"ZodBigIntFormat",0,kk,"ZodBoolean",0,kg,"ZodCIDRv4",0,jT,"ZodCIDRv6",0,jV,"ZodCUID",0,jD,"ZodCUID2",0,jF,"ZodCatch",0,lo,"ZodCodec",0,lu,"ZodCustom",0,lG,"ZodCustomStringFormat",0,j3,"ZodDate",0,kB,"ZodDefault",0,lg,"ZodDiscriminatedUnion",0,kO,"ZodE164",0,j_,"ZodEmail",0,jn,"ZodEmoji",0,jz,"ZodEnum",0,k0,"ZodError",0,i4,"ZodExactOptional",0,lb,"ZodFile",0,k5,"ZodFirstPartyTypeKind",()=>K,"ZodFunction",0,lE,"ZodGUID",0,jp,"ZodIPv4",0,jN,"ZodIPv6",0,jR,"ZodISODate",0,iZ,"ZodISODateTime",0,iX,"ZodISODuration",0,i1,"ZodISOTime",0,i_,"ZodIntersection",0,kQ,"ZodIssueCode",0,lR,"ZodJWT",0,j1,"ZodKSUID",0,jL,"ZodLazy",0,lA,"ZodLiteral",0,k3,"ZodMAC",0,jP,"ZodMap",0,kY,"ZodNaN",0,lq,"ZodNanoID",0,jB,"ZodNever",0,kx,"ZodNonOptional",0,lk,"ZodNull",0,kr,"ZodNullable",0,ld,"ZodNumber",0,j8,"ZodNumberFormat",0,ka,"ZodObject",0,kG,"ZodOptional",0,k9,"ZodPipe",0,ls,"ZodPrefault",0,li,"ZodPromise",0,lC,"ZodReadonly",0,lw,"ZodRealError",0,i5,"ZodRecord",0,kU,"ZodSet",0,k$,"ZodString",0,jk,"ZodStringFormat",0,jm,"ZodSuccess",0,lm,"ZodSymbol",0,kn,"ZodTemplateLiteral",0,ly,"ZodTransform",0,k7,"ZodTuple",0,kS,"ZodType",0,ji,"ZodULID",0,jH,"ZodURL",0,jw,"ZodUUID",0,jr,"ZodUndefined",0,kp,"ZodUnion",0,kK,"ZodUnknown",0,kv,"ZodVoid",0,kz,"ZodXID",0,jJ,"ZodXor",0,kM,"_ZodString",0,jj,"_default",()=>lh,"_function",()=>lF,"any",()=>ku,"array",()=>kE,"base64",()=>jY,"base64url",()=>j$,"bigint",()=>kj,"boolean",()=>kh,"catch",()=>lp,"check",()=>lH,"cidrv4",()=>jU,"cidrv6",()=>jW,"clone",()=>ct,"codec",()=>lv,"coerce",0,l7,"config",()=>bY,"core",0,l6,"cuid",()=>jE,"cuid2",()=>jG,"custom",()=>lI,"date",()=>kC,"decode",0,jb,"decodeAsync",0,jd,"describe",0,lL,"discriminatedUnion",()=>kP,"e164",()=>j0,"email",()=>jo,"emoji",()=>jA,"encode",0,ja,"encodeAsync",0,jc,"endsWith",()=>hs,"enum",()=>k1,"exactOptional",()=>lc,"file",()=>k6,"flattenError",()=>c$,"float32",()=>kc,"float64",()=>kd,"formatError",()=>c_,"fromJSONSchema",()=>lY,"function",()=>lF,"getErrorMap",()=>lT,"globalRegistry",0,gi,"gt",()=>ha,"gte",()=>hb,"guid",()=>jq,"hash",()=>j7,"hex",()=>j6,"hostname",()=>j5,"httpUrl",()=>jy,"includes",()=>hq,"instanceof",()=>lN,"int",()=>kb,"int32",()=>ke,"int64",()=>kl,"intersection",()=>kR,"ipv4",()=>jO,"ipv6",()=>jS,"iso",0,lV,"json",()=>lP,"jwt",()=>j2,"keyof",()=>kF,"ksuid",()=>jM,"lazy",()=>lB,"length",()=>hm,"literal",()=>k4,"locales",0,l4,"looseObject",()=>kJ,"looseRecord",()=>kX,"lowercase",()=>ho,"lt",()=>g8,"lte",()=>g9,"mac",()=>jQ,"map",()=>kZ,"maxLength",()=>hk,"maxSize",()=>hh,"meta",0,lM,"mime",()=>hu,"minLength",()=>hl,"minSize",()=>hi,"multipleOf",()=>hg,"nan",()=>lr,"nanoid",()=>jC,"nativeEnum",()=>k2,"negative",()=>hd,"never",()=>ky,"nonnegative",()=>hf,"nonoptional",()=>ll,"nonpositive",()=>he,"normalize",()=>hw,"null",()=>ks,"nullable",()=>le,"nullish",()=>lf,"number",()=>j9,"object",()=>kH,"optional",()=>la,"overwrite",()=>hv,"parse",0,i6,"parseAsync",0,i7,"partialRecord",()=>kW,"pipe",()=>lt,"positive",()=>hc,"prefault",()=>lj,"preprocess",()=>lQ,"prettifyError",()=>c2,"promise",()=>lD,"property",()=>ht,"readonly",()=>lx,"record",()=>kV,"refine",()=>lJ,"regex",()=>hn,"regexes",()=>iV,"registry",()=>gh,"safeDecode",0,jf,"safeDecodeAsync",0,jh,"safeEncode",0,je,"safeEncodeAsync",0,jg,"safeParse",0,i8,"safeParseAsync",0,i9,"set",()=>k_,"setErrorMap",()=>lS,"size",()=>hj,"slugify",()=>hA,"startsWith",()=>hr,"strictObject",()=>kI,"string",()=>jl,"stringFormat",()=>j4,"stringbool",0,lO,"success",()=>ln,"superRefine",()=>lK,"symbol",()=>ko,"templateLiteral",()=>lz,"toJSONSchema",()=>iT,"toLowerCase",()=>hy,"toUpperCase",()=>hz,"transform",()=>k8,"treeifyError",()=>c0,"trim",()=>hx,"tuple",()=>kT,"uint32",()=>kf,"uint64",()=>km,"ulid",()=>jI,"undefined",()=>kq,"union",()=>kL,"unknown",()=>kw,"uppercase",()=>hp,"url",()=>jx,"util",()=>iW,"uuid",()=>js,"uuidv4",()=>jt,"uuidv6",()=>ju,"uuidv7",()=>jv,"void",()=>kA,"xid",()=>jK,"xor",()=>kN],940929);var l8=a.i(940929);let l9={DEFAULT_PAGE:1,DEFAULT_PAGE_SIZE:10,MAX_PAGE_SIZE:100,MIN_PAGE_SIZE:1};a.s(["PAGINATION",0,l9],687261);let ma=l8.object({title:l8.string().min(2,{message:"Tool name must be at least 2 characters."}),link:l8.string().min(1,{message:"Tool URL is required."}),componentName:l8.string().min(2,{message:"Component name must be at least 2 characters."}),description:l8.string(),categoryId:l8.string().min(1,{message:"Category is required."}),icon:l8.string(),iconColor:l8.string(),bgColor:l8.string(),seoTitle:l8.string(),seoDescription:l8.string(),seoKeywords:l8.string(),h1Heading:l8.string().optional(),introText:l8.string().optional(),stepsTitle:l8.string().optional(),visualSteps:l8.array(l8.object({icon:l8.string(),title:l8.string(),description:l8.string(),iconColor:l8.string().optional(),bgColor:l8.string().optional()})).optional(),richContent:l8.string().optional(),faqs:l8.array(l8.object({question:l8.string(),answer:l8.string()})).optional(),closingText:l8.string().optional(),isActive:l8.boolean()});var mb=a.i(875174),mc=a.i(807271);let md=bP({create:bR.input(ma).mutation(async({input:a})=>{try{let b=new mc.ToolModel({title:a.title,link:a.link,componentName:a.componentName,description:a.description,category:a.categoryId,icon:a.icon,iconColor:a.iconColor,bgColor:a.bgColor,seoTitle:a.seoTitle,seoDescription:a.seoDescription,seoKeywords:a.seoKeywords,h1Heading:a.h1Heading,introText:a.introText,stepsTitle:a.stepsTitle,visualSteps:a.visualSteps,richContent:a.richContent,faqs:a.faqs,closingText:a.closingText,isActive:a.isActive??!0}),c=(await b.save()).toObject();return{...c,_id:c._id.toString()}}catch(a){throw new bk({code:"INTERNAL_SERVER_ERROR",message:`Failed to create tool: ${a instanceof Error?a.message:"Unknown error"}`})}}),getMany:bQ.input(l8.object({page:l8.number().default(l9.DEFAULT_PAGE),pageSize:l8.number().min(l9.MIN_PAGE_SIZE).max(l9.MAX_PAGE_SIZE).default(l9.DEFAULT_PAGE_SIZE),search:l8.string().default(""),categoryId:l8.string().optional()})).query(async({input:a,ctx:b})=>{let{page:c,pageSize:d,search:e,categoryId:f}=a,g={title:{$regex:RegExp(e,"i")}};b.session||(g.isActive=!0);let h={...g},i={...g};if(f&&mb.mongoose.Types.ObjectId.isValid(f)){let a=new mb.mongoose.Types.ObjectId(f);h.category=a,i.category=a}let[j,k]=await Promise.all([mc.ToolModel.aggregate([{$match:h},{$lookup:{from:"categories",localField:"category",foreignField:"_id",as:"category"}},{$unwind:{path:"$category",preserveNullAndEmptyArrays:!0}},{$sort:{createdAt:-1}},{$skip:(c-1)*d},{$limit:d}]),mc.ToolModel.countDocuments(i)]),l=Math.ceil(k/d);return{items:j.map(a=>({...a,_id:a._id.toString(),category:a.category&&"object"==typeof a.category&&"_id"in a.category?{...a.category,_id:a.category._id?.toString()||""}:null})),page:c,pageSize:d,totalCount:k,totalPages:l,hasNextPage:c<l,hasPreviousPage:c>1}}),getOne:bR.input(l8.object({id:l8.string()})).query(async({input:a})=>{try{let b=await mc.ToolModel.findById(a.id).populate("category").lean();if(!b)throw new bk({code:"NOT_FOUND",message:"Tool not found"});return{...b,_id:b._id.toString(),category:b.category?{...b.category,_id:b.category?._id?.toString()}:null}}catch(a){if(a instanceof bk)throw a;throw new bk({code:"INTERNAL_SERVER_ERROR",message:`Failed to fetch tool: ${a instanceof Error?a.message:"Unknown error"}`})}}),update:bR.input(l8.object({id:l8.string(),data:ma.partial()})).mutation(async({input:a})=>{try{let{categoryId:b,...c}=a.data,d={...c};void 0!==b&&(d.category=b);let e=await mc.ToolModel.findByIdAndUpdate(a.id,{$set:d},{new:!0,runValidators:!0}).lean();if(!e)throw new bk({code:"NOT_FOUND",message:"Tool not found"});return{...e,_id:e._id.toString()}}catch(a){if(a instanceof bk)throw a;throw new bk({code:"INTERNAL_SERVER_ERROR",message:`Failed to update tool: ${a instanceof Error?a.message:"Unknown error"}`})}}),delete:bR.input(l8.object({id:l8.string()})).mutation(async({input:a})=>{try{let b=await mc.ToolModel.findById(a.id);if(!b)throw new bk({code:"NOT_FOUND",message:"Tool not found"});return await mc.ToolModel.findByIdAndDelete(a.id),{id:b._id.toString(),title:b.title}}catch(a){if(a instanceof bk)throw a;throw new bk({code:"INTERNAL_SERVER_ERROR",message:`Failed to delete tool: ${a instanceof Error?a.message:"Unknown error"}`})}})});a.i(76010);var me=a.i(667177);class mf{static normalize(a){return Number.isFinite(a)?{type:"fixed",delay:a}:a||void 0}static calculate(a,b,c,d,e){if(a)return(function(a,b){if(a.type in mf.builtinStrategies)return mf.builtinStrategies[a.type](a.delay,a.jitter);if(b)return b;throw Error(`Unknown backoff strategy ${a.type}.
      If a custom backoff strategy is used, specify it when the queue is created.`)})(a,e)(b,a.type,c,d)}}mf.builtinStrategies={fixed:function(a,b=0){return function(){return b>0?Math.floor(Math.random()*a*b+a*(1-b)):a}},exponential:function(a,b=0){return function(c){if(!(b>0))return Math.round(Math.pow(2,c-1)*a);{let d=Math.round(Math.pow(2,c-1)*a);return Math.floor(Math.random()*d*b+d*(1-b))}}}},a.i(233405);a.i(504446);a.i(37702),(w=L||(L={}))[w.Init=0]="Init",w[w.Start=1]="Start",w[w.Stop=2]="Stop",w[w.GetChildrenValuesResponse=3]="GetChildrenValuesResponse",w[w.GetIgnoredChildrenFailuresResponse=4]="GetIgnoredChildrenFailuresResponse",w[w.MoveToWaitingChildrenResponse=5]="MoveToWaitingChildrenResponse",(x=M||(M={}))[x.JobNotExist=-1]="JobNotExist",x[x.JobLockNotExist=-2]="JobLockNotExist",x[x.JobNotInState=-3]="JobNotInState",x[x.JobPendingChildren=-4]="JobPendingChildren",x[x.ParentJobNotExist=-5]="ParentJobNotExist",x[x.JobLockMismatch=-6]="JobLockMismatch",x[x.ParentJobCannotBeReplaced=-7]="ParentJobCannotBeReplaced",x[x.JobBelongsToJobScheduler=-8]="JobBelongsToJobScheduler",x[x.JobHasFailedChildren=-9]="JobHasFailedChildren",x[x.SchedulerJobIdCollision=-10]="SchedulerJobIdCollision",x[x.SchedulerJobSlotsBusy=-11]="SchedulerJobSlotsBusy",(y=N||(N={}))[y.Completed=0]="Completed",y[y.Error=1]="Error",y[y.Failed=2]="Failed",y[y.InitFailed=3]="InitFailed",y[y.InitCompleted=4]="InitCompleted",y[y.Log=5]="Log",y[y.MoveToDelayed=6]="MoveToDelayed",y[y.MoveToWait=7]="MoveToWait",y[y.Progress=8]="Progress",y[y.Update=9]="Update",y[y.GetChildrenValues=10]="GetChildrenValues",y[y.GetIgnoredChildrenFailures=11]="GetIgnoredChildrenFailures",y[y.MoveToWaitingChildren=12]="MoveToWaitingChildren",(z=O||(O={}))[z.ONE_MINUTE=1]="ONE_MINUTE",z[z.FIVE_MINUTES=5]="FIVE_MINUTES",z[z.FIFTEEN_MINUTES=15]="FIFTEEN_MINUTES",z[z.THIRTY_MINUTES=30]="THIRTY_MINUTES",z[z.ONE_HOUR=60]="ONE_HOUR",z[z.ONE_WEEK=10080]="ONE_WEEK",z[z.TWO_WEEKS=20160]="TWO_WEEKS",z[z.ONE_MONTH=80640]="ONE_MONTH",(A=P||(P={})).QueueName="bullmq.queue.name",A.QueueOperation="bullmq.queue.operation",A.BulkCount="bullmq.job.bulk.count",A.BulkNames="bullmq.job.bulk.names",A.JobName="bullmq.job.name",A.JobId="bullmq.job.id",A.JobKey="bullmq.job.key",A.JobIds="bullmq.job.ids",A.JobAttemptsMade="bullmq.job.attempts.made",A.DeduplicationKey="bullmq.job.deduplication.key",A.JobOptions="bullmq.job.options",A.JobProgress="bullmq.job.progress",A.QueueDrainDelay="bullmq.queue.drain.delay",A.QueueGrace="bullmq.queue.grace",A.QueueCleanLimit="bullmq.queue.clean.limit",A.QueueRateLimit="bullmq.queue.rate.limit",A.JobType="bullmq.job.type",A.QueueOptions="bullmq.queue.options",A.QueueEventMaxLength="bullmq.queue.event.max.length",A.WorkerOptions="bullmq.worker.options",A.WorkerName="bullmq.worker.name",A.WorkerId="bullmq.worker.id",A.WorkerRateLimit="bullmq.worker.rate.limit",A.WorkerDoNotWaitActive="bullmq.worker.do.not.wait.active",A.WorkerForceClose="bullmq.worker.force.close",A.WorkerStalledJobs="bullmq.worker.stalled.jobs",A.WorkerFailedJobs="bullmq.worker.failed.jobs",A.WorkerJobsToExtendLocks="bullmq.worker.jobs.to.extend.locks",A.JobFinishedTimestamp="bullmq.job.finished.timestamp",A.JobProcessedTimestamp="bullmq.job.processed.timestamp",A.JobResult="bullmq.job.result",A.JobFailedReason="bullmq.job.failed.reason",A.FlowName="bullmq.flow.name",A.JobSchedulerId="bullmq.job.scheduler.id",(B=Q||(Q={}))[B.INTERNAL=0]="INTERNAL",B[B.SERVER=1]="SERVER",B[B.CLIENT=2]="CLIENT",B[B.PRODUCER=3]="PRODUCER",B[B.CONSUMER=4]="CONSUMER";var mg=a.i(427699);mg.EventEmitter;var mh=a.i(814747),mi=a.i(319989),mj=a.i(473501),mk=a.i(139833);let ml={value:null};function mm(a,b,c){try{return a.apply(b,c)}catch(a){return ml.value=a,ml}}function mn(a){let b={};for(let c=0;c<a.length;c+=2)b[a[c]]=a[c+1];return b}function mo(a){let b=[];for(let c in a)Object.prototype.hasOwnProperty.call(a,c)&&void 0!==a[c]&&(b[b.length]=c,b[b.length]=a[c]);return b}function mp(a,b){let c=a.getMaxListeners();a.setMaxListeners(c+b)}let mq={de:"deduplication",fpof:"failParentOnFailure",cpof:"continueParentOnFailure",idof:"ignoreDependencyOnFailure",kl:"keepLogs",rdof:"removeDependencyOnFailure"},mr=Object.assign(Object.assign({},Object.entries(mq).reduce((a,[b,c])=>(a[c]=b,a),{})),{debounce:"de"});function ms(a){return!!a&&["connect","disconnect","duplicate"].every(b=>"function"==typeof a[b])}function mt(a){if(a)return`${a.queue}:${a.id}`}let mu=/ERR unknown command ['`]\s*client\s*['`]/;function mv(a){let{code:b,message:c}=a;return c!==mj.CONNECTION_CLOSED_ERROR_MSG&&!c.includes("ECONNREFUSED")&&"ECONNREFUSED"!==b}let mw=(a,b)=>{let c=mk.valid(mk.coerce(a));return mk.lt(c,b)},mx=a=>{let b={};for(let c of Object.entries(a))b[c[0]]=JSON.parse(c[1]);return b};async function my(a,b,c,d,e,f,g){if(!a)return f();{let h,{tracer:i,contextManager:j}=a,k=j.active();g&&(h=j.fromMetadata(k,g));let l=e?`${d} ${e}`:d,m=i.startSpan(l,{kind:b},h);try{let a,e;return m.setAttributes({[P.QueueName]:c,[P.QueueOperation]:d}),a=b===Q.CONSUMER&&h?m.setSpanOnContext(h):m.setSpanOnContext(k),2==f.length&&(e=j.getMetadata(a)),await j.with(a,()=>f(m,e))}catch(a){throw m.recordException(a),a}finally{m.end()}}}(C=R||(R={}))[C.Idle=0]="Idle",C[C.Started=1]="Started",C[C.Terminating=2]="Terminating",C[C.Errored=3]="Errored";class mz extends Error{constructor(a="bullmq:unrecoverable"){super(a),this.name=this.constructor.name,Object.setPrototypeOf(this,new.target.prototype)}}var mA=a.i(254799);let mB={randomUUID:mA.randomUUID},mC=new Uint8Array(256),mD=mC.length,mE=[];for(let a=0;a<256;++a)mE.push((a+256).toString(16).slice(1));let mF=function(a,b,c){if(mB.randomUUID&&!b&&!a)return mB.randomUUID();let d=(a=a||{}).random??a.rng?.()??(mD>mC.length-16&&((0,mA.randomFillSync)(mC),mD=0),mC.slice(mD,mD+=16));if(d.length<16)throw Error("Random bytes length must be >= 16");if(d[6]=15&d[6]|64,d[8]=63&d[8]|128,b){if((c=c||0)<0||c+16>b.length)throw RangeError(`UUID byte range ${c}:${c+15} is out of buffer bounds`);for(let a=0;a<16;++a)b[c+a]=d[a];return b}return function(a,b=0){return(mE[a[b+0]]+mE[a[b+1]]+mE[a[b+2]]+mE[a[b+3]]+"-"+mE[a[b+4]]+mE[a[b+5]]+"-"+mE[a[b+6]]+mE[a[b+7]]+"-"+mE[a[b+8]]+mE[a[b+9]]+"-"+mE[a[b+10]]+mE[a[b+11]]+mE[a[b+12]]+mE[a[b+13]]+mE[a[b+14]]+mE[a[b+15]]).toLowerCase()}(d)};var mG=a.i(208466),mH=a.i(224361);try{S=new TextDecoder}catch(a){}var mI=0;let mJ=[];var mK=mJ,mL=0,mM={},mN=0,mO=0,mP=[],mQ={useRecords:!1,mapsAsObjects:!0};class mR{}let mS=new mR;mS.name="MessagePack 0xC1";var mT=!1,mU=2;try{Function("")}catch(a){mU=1/0}class mV{constructor(a){a&&(!1===a.useRecords&&void 0===a.mapsAsObjects&&(a.mapsAsObjects=!0),a.sequential&&!1!==a.trusted&&(a.trusted=!0,!a.structures&&!1!=a.useRecords&&(a.structures=[],a.maxSharedStructures||(a.maxSharedStructures=0))),a.structures?a.structures.sharedLength=a.structures.length:a.getStructures&&((a.structures=[]).uninitialized=!0,a.structures.sharedLength=0),a.int64AsNumber&&(a.int64AsType="number")),Object.assign(this,a)}unpack(a,b){if(T)return nm(()=>(nn(),this?this.unpack(a,b):mV.prototype.unpack.call(mQ,a,b)));a.buffer||a.constructor!==ArrayBuffer||(a="undefined"!=typeof Buffer?Buffer.from(a):new Uint8Array(a)),"object"==typeof b?(U=b.end||a.length,mI=b.start||0):(mI=0,U=b>-1?b:a.length),mL=0,mO=0,W=null,mK=mJ,X=null,T=a;try{Z=a.dataView||(a.dataView=new DataView(a.buffer,a.byteOffset,a.byteLength))}catch(b){if(T=null,a instanceof Uint8Array)throw b;throw Error("Source must be a Uint8Array or Buffer but was a "+(a&&"object"==typeof a?a.constructor.name:typeof a))}return this instanceof mV?(mM=this,this.structures?V=this.structures:(!V||V.length>0)&&(V=[])):(mM=mQ,(!V||V.length>0)&&(V=[])),mW(b)}unpackMultiple(a,b){let c,d=0;try{mT=!0;let e=a.length,f=this?this.unpack(a,e):np.unpack(a,e);if(b){if(!1===b(f,d,mI))return;for(;mI<e;)if(d=mI,!1===b(mW(),d,mI))return}else{for(c=[f];mI<e;)d=mI,c.push(mW());return c}}catch(a){throw a.lastPosition=d,a.values=c,a}finally{mT=!1,nn()}}_mergeStructures(a,b){_&&(a=_.call(this,a)),Object.isFrozen(a=a||[])&&(a=a.map(a=>a.slice(0)));for(let b=0,c=a.length;b<c;b++){let c=a[b];c&&(c.isShared=!0,b>=32&&(c.highByte=b-32>>5))}for(let c in a.sharedLength=a.length,b||[])if(c>=0){let d=a[c],e=b[c];e&&(d&&((a.restoreStructures||(a.restoreStructures=[]))[c]=d),a[c]=e)}return this.structures=a}decode(a,b){return this.unpack(a,b)}}function mW(a){try{let b;if(!mM.trusted&&!mT){let a=V.sharedLength||0;a<V.length&&(V.length=a)}if(mM.randomAccessStructure&&T[mI]<64&&T[mI]>=32&&$?(b=$(T,mI,U,mM),T=null,!(a&&a.lazy)&&b&&(b=b.toJSON()),mI=U):b=mY(),X&&(mI=X.postBundlePosition,X=null),mT&&(V.restoreStructures=null),mI==U)V&&V.restoreStructures&&mX(),V=null,T=null,Y&&(Y=null);else if(mI>U)throw Error("Unexpected end of MessagePack data");else if(!mT){let a;try{a=JSON.stringify(b,(a,b)=>"bigint"==typeof b?`${b}n`:b).slice(0,100)}catch(b){a="(JSON view not available "+b+")"}throw Error("Data read, but end of buffer not reached "+a)}return b}catch(a){throw V&&V.restoreStructures&&mX(),nn(),(a instanceof RangeError||a.message.startsWith("Unexpected end of buffer")||mI>U)&&(a.incomplete=!0),a}}function mX(){for(let a in V.restoreStructures)V[a]=V.restoreStructures[a];V.restoreStructures=null}function mY(){let a=T[mI++];if(a<160)if(a<128)if(a<64)return a;else{let b=V[63&a]||mM.getStructures&&m0()[63&a];return b?(b.read||(b.read=m$(b,63&a)),b.read()):a}else if(a<144){if(a-=128,mM.mapsAsObjects){let b={};for(let c=0;c<a;c++){let a=nf();"__proto__"===a&&(a="__proto_"),b[a]=mY()}return b}{let b=new Map;for(let c=0;c<a;c++)b.set(mY(),mY());return b}}else{let b=Array(a-=144);for(let c=0;c<a;c++)b[c]=mY();return mM.freezeData?Object.freeze(b):b}if(a<192){let b=a-160;if(mO>=mI)return W.slice(mI-mN,(mI+=b)-mN);if(0==mO&&U<140){let a=b<16?na(b):m9(b);if(null!=a)return a}return m1(b)}{let b;switch(a){case 192:return null;case 193:if(X){if((b=mY())>0)return X[1].slice(X.position1,X.position1+=b);return X[0].slice(X.position0,X.position0-=b)}return mS;case 194:return!1;case 195:return!0;case 196:if(void 0===(b=T[mI++]))throw Error("Unexpected end of buffer");return nc(b);case 197:return b=Z.getUint16(mI),mI+=2,nc(b);case 198:return b=Z.getUint32(mI),mI+=4,nc(b);case 199:return nd(T[mI++]);case 200:return b=Z.getUint16(mI),mI+=2,nd(b);case 201:return b=Z.getUint32(mI),mI+=4,nd(b);case 202:if(b=Z.getFloat32(mI),mM.useFloat32>2){let a=no[(127&T[mI])<<1|T[mI+1]>>7];return mI+=4,(a*b+(b>0?.5:-.5)|0)/a}return mI+=4,b;case 203:return b=Z.getFloat64(mI),mI+=8,b;case 204:return T[mI++];case 205:return b=Z.getUint16(mI),mI+=2,b;case 206:return b=Z.getUint32(mI),mI+=4,b;case 207:return"number"===mM.int64AsType?b=0x100000000*Z.getUint32(mI)+Z.getUint32(mI+4):"string"===mM.int64AsType?b=Z.getBigUint64(mI).toString():"auto"===mM.int64AsType?(b=Z.getBigUint64(mI))<=BigInt(2)<<BigInt(52)&&(b=Number(b)):b=Z.getBigUint64(mI),mI+=8,b;case 208:return Z.getInt8(mI++);case 209:return b=Z.getInt16(mI),mI+=2,b;case 210:return b=Z.getInt32(mI),mI+=4,b;case 211:return"number"===mM.int64AsType?b=0x100000000*Z.getInt32(mI)+Z.getUint32(mI+4):"string"===mM.int64AsType?b=Z.getBigInt64(mI).toString():"auto"===mM.int64AsType?(b=Z.getBigInt64(mI))>=BigInt(-2)<<BigInt(52)&&b<=BigInt(2)<<BigInt(52)&&(b=Number(b)):b=Z.getBigInt64(mI),mI+=8,b;case 212:if(114==(b=T[mI++]))return nh(63&T[mI++]);{let a=mP[b];if(a)if(a.read)return mI++,a.read(mY());else if(a.noBuffer)return mI++,a();else return a(T.subarray(mI,++mI));throw Error("Unknown extension "+b)}case 213:if(114==(b=T[mI]))return mI++,nh(63&T[mI++],T[mI++]);return nd(2);case 214:return nd(4);case 215:return nd(8);case 216:return nd(16);case 217:if(b=T[mI++],mO>=mI)return W.slice(mI-mN,(mI+=b)-mN);return m2(b);case 218:if(b=Z.getUint16(mI),mI+=2,mO>=mI)return W.slice(mI-mN,(mI+=b)-mN);return m3(b);case 219:if(b=Z.getUint32(mI),mI+=4,mO>=mI)return W.slice(mI-mN,(mI+=b)-mN);return m4(b);case 220:return b=Z.getUint16(mI),mI+=2,m6(b);case 221:return b=Z.getUint32(mI),mI+=4,m6(b);case 222:return b=Z.getUint16(mI),mI+=2,m7(b);case 223:return b=Z.getUint32(mI),mI+=4,m7(b);default:if(a>=224)return a-256;if(void 0===a){let a=Error("Unexpected end of MessagePack data");throw a.incomplete=!0,a}throw Error("Unknown MessagePack token "+a)}}}let mZ=/^[a-zA-Z_$][a-zA-Z\d_$]*$/;function m$(a,b){function c(){if(c.count++>mU){let c=a.read=Function("r","return function(){return "+(mM.freezeData?"Object.freeze":"")+"({"+a.map(a=>"__proto__"===a?"__proto_:r()":mZ.test(a)?a+":r()":"["+JSON.stringify(a)+"]:r()").join(",")+"})}")(mY);return 0===a.highByte&&(a.read=m_(b,a.read)),c()}let d={};for(let b=0,c=a.length;b<c;b++){let c=a[b];"__proto__"===c&&(c="__proto_"),d[c]=mY()}return mM.freezeData?Object.freeze(d):d}return(c.count=0,0===a.highByte)?m_(b,c):c}let m_=(a,b)=>function(){let c=T[mI++];if(0===c)return b();let d=a<32?-(a+(c<<5)):a+(c<<5),e=V[d]||m0()[d];if(!e)throw Error("Record id is not defined for "+d);return e.read||(e.read=m$(e,a)),e.read()};function m0(){let a=nm(()=>(T=null,mM.getStructures()));return V=mM._mergeStructures(a,V)}var m1=m5,m2=m5,m3=m5,m4=m5;function m5(a){let b;if(a<16&&(b=na(a)))return b;if(a>64&&S)return S.decode(T.subarray(mI,mI+=a));let c=mI+a,d=[];for(b="";mI<c;){let a=T[mI++];if((128&a)==0)d.push(a);else if((224&a)==192){let b=63&T[mI++];d.push((31&a)<<6|b)}else if((240&a)==224){let b=63&T[mI++],c=63&T[mI++];d.push((31&a)<<12|b<<6|c)}else if((248&a)==240){let b=(7&a)<<18|(63&T[mI++])<<12|(63&T[mI++])<<6|63&T[mI++];b>65535&&(b-=65536,d.push(b>>>10&1023|55296),b=56320|1023&b),d.push(b)}else d.push(a);d.length>=4096&&(b+=m8.apply(String,d),d.length=0)}return d.length>0&&(b+=m8.apply(String,d)),b}function m6(a){let b=Array(a);for(let c=0;c<a;c++)b[c]=mY();return mM.freezeData?Object.freeze(b):b}function m7(a){if(mM.mapsAsObjects){let b={};for(let c=0;c<a;c++){let a=nf();"__proto__"===a&&(a="__proto_"),b[a]=mY()}return b}{let b=new Map;for(let c=0;c<a;c++)b.set(mY(),mY());return b}}var m8=String.fromCharCode;function m9(a){let b=mI,c=Array(a);for(let d=0;d<a;d++){let a=T[mI++];if((128&a)>0){mI=b;return}c[d]=a}return m8.apply(String,c)}function na(a){if(a<4)if(a<2)if(0===a)return"";else{let a=T[mI++];if((128&a)>1){mI-=1;return}return m8(a)}else{let b=T[mI++],c=T[mI++];if((128&b)>0||(128&c)>0){mI-=2;return}if(a<3)return m8(b,c);let d=T[mI++];if((128&d)>0){mI-=3;return}return m8(b,c,d)}{let b=T[mI++],c=T[mI++],d=T[mI++],e=T[mI++];if((128&b)>0||(128&c)>0||(128&d)>0||(128&e)>0){mI-=4;return}if(a<6)if(4===a)return m8(b,c,d,e);else{let a=T[mI++];if((128&a)>0){mI-=5;return}return m8(b,c,d,e,a)}if(a<8){let f=T[mI++],g=T[mI++];if((128&f)>0||(128&g)>0){mI-=6;return}if(a<7)return m8(b,c,d,e,f,g);let h=T[mI++];if((128&h)>0){mI-=7;return}return m8(b,c,d,e,f,g,h)}{let f=T[mI++],g=T[mI++],h=T[mI++],i=T[mI++];if((128&f)>0||(128&g)>0||(128&h)>0||(128&i)>0){mI-=8;return}if(a<10)if(8===a)return m8(b,c,d,e,f,g,h,i);else{let a=T[mI++];if((128&a)>0){mI-=9;return}return m8(b,c,d,e,f,g,h,i,a)}if(a<12){let j=T[mI++],k=T[mI++];if((128&j)>0||(128&k)>0){mI-=10;return}if(a<11)return m8(b,c,d,e,f,g,h,i,j,k);let l=T[mI++];if((128&l)>0){mI-=11;return}return m8(b,c,d,e,f,g,h,i,j,k,l)}{let j=T[mI++],k=T[mI++],l=T[mI++],m=T[mI++];if((128&j)>0||(128&k)>0||(128&l)>0||(128&m)>0){mI-=12;return}if(a<14)if(12===a)return m8(b,c,d,e,f,g,h,i,j,k,l,m);else{let a=T[mI++];if((128&a)>0){mI-=13;return}return m8(b,c,d,e,f,g,h,i,j,k,l,m,a)}{let n=T[mI++],o=T[mI++];if((128&n)>0||(128&o)>0){mI-=14;return}if(a<15)return m8(b,c,d,e,f,g,h,i,j,k,l,m,n,o);let p=T[mI++];if((128&p)>0){mI-=15;return}return m8(b,c,d,e,f,g,h,i,j,k,l,m,n,o,p)}}}}}function nb(){let a,b=T[mI++];if(b<192)a=b-160;else switch(b){case 217:a=T[mI++];break;case 218:a=Z.getUint16(mI),mI+=2;break;case 219:a=Z.getUint32(mI),mI+=4;break;default:throw Error("Expected string")}return m5(a)}function nc(a){return mM.copyBuffers?Uint8Array.prototype.slice.call(T,mI,mI+=a):T.subarray(mI,mI+=a)}function nd(a){let b=T[mI++];if(mP[b]){let c;return mP[b](T.subarray(mI,c=mI+=a),a=>{mI=a;try{return mY()}finally{mI=c}})}throw Error("Unknown extension type "+b)}var ne=Array(4096);function nf(){let a,b=T[mI++];if(!(b>=160)||!(b<192))return mI--,ng(mY());if(b-=160,mO>=mI)return W.slice(mI-mN,(mI+=b)-mN);if(!(0==mO&&U<180))return m1(b);let c=(b<<5^(b>1?Z.getUint16(mI):b>0?T[mI]:0))&4095,d=ne[c],e=mI,f=mI+b-3,g=0;if(d&&d.bytes==b){for(;e<f;){if((a=Z.getUint32(e))!=d[g++]){e=0x70000000;break}e+=4}for(f+=3;e<f;)if((a=T[e++])!=d[g++]){e=0x70000000;break}if(e===f)return mI=e,d.string;f-=3,e=mI}for(d=[],ne[c]=d,d.bytes=b;e<f;)a=Z.getUint32(e),d.push(a),e+=4;for(f+=3;e<f;)a=T[e++],d.push(a);let h=b<16?na(b):m9(b);return null!=h?d.string=h:d.string=m1(b)}function ng(a){if("string"==typeof a)return a;if("number"==typeof a||"boolean"==typeof a||"bigint"==typeof a)return a.toString();if(null==a)return a+"";if(mM.allowArraysInMapKeys&&Array.isArray(a)&&a.flat().every(a=>["string","number","boolean","bigint"].includes(typeof a)))return a.flat().toString();throw Error(`Invalid property type for record: ${typeof a}`)}let nh=(a,b)=>{let c=mY().map(ng),d=a;void 0!==b&&(a=a<32?-((b<<5)+a):(b<<5)+a,c.highByte=b);let e=V[a];return e&&(e.isShared||mT)&&((V.restoreStructures||(V.restoreStructures=[]))[a]=e),V[a]=c,c.read=m$(c,d),c.read()};mP[0]=()=>{},mP[0].noBuffer=!0,mP[66]=a=>{let b=a.byteLength%8||8,c=BigInt(128&a[0]?a[0]-256:a[0]);for(let d=1;d<b;d++)c<<=BigInt(8),c+=BigInt(a[d]);if(a.byteLength!==b){let d=new DataView(a.buffer,a.byteOffset,a.byteLength),e=(a,b)=>{let c=b-a;if(c<=40){let c=d.getBigUint64(a);for(let e=a+8;e<b;e+=8)c<<=BigInt(64n),c|=d.getBigUint64(e);return c}let f=a+(c>>4<<3),g=e(a,f),h=e(f,b);return g<<BigInt((b-f)*8)|h};c=c<<BigInt((d.byteLength-b)*8)|e(b,d.byteLength)}return c};let ni={Error,EvalError,RangeError,ReferenceError,SyntaxError,TypeError,URIError,AggregateError:"function"==typeof AggregateError?AggregateError:null};mP[101]=()=>{let a=mY();if(!ni[a[0]]){let b=Error(a[1],{cause:a[2]});return b.name=a[0],b}return ni[a[0]](a[1],{cause:a[2]})},mP[105]=a=>{let b;if(!1===mM.structuredClone)throw Error("Structured clone extension is disabled");let c=Z.getUint32(mI-4);Y||(Y=new Map);let d=T[mI],e={target:b=d>=144&&d<160||220==d||221==d?[]:d>=128&&d<144||222==d||223==d?new Map:(d>=199&&d<=201||d>=212&&d<=216)&&115===T[mI+1]?new Set:{}};Y.set(c,e);let f=mY();if(!e.used)return e.target=f;if(Object.assign(b,f),b instanceof Map)for(let[a,c]of f.entries())b.set(a,c);if(b instanceof Set)for(let a of Array.from(f))b.add(a);return b},mP[112]=a=>{if(!1===mM.structuredClone)throw Error("Structured clone extension is disabled");let b=Z.getUint32(mI-4),c=Y.get(b);return c.used=!0,c.target},mP[115]=()=>new Set(mY());let nj=["Int8","Uint8","Uint8Clamped","Int16","Uint16","Int32","Uint32","Float32","Float64","BigInt64","BigUint64"].map(a=>a+"Array"),nk="object"==typeof globalThis?globalThis:window;mP[116]=a=>{let b=a[0],c=Uint8Array.prototype.slice.call(a,1).buffer,d=nj[b];if(!d){if(16===b)return c;if(17===b)return new DataView(c);throw Error("Could not find typed array for code "+b)}return new nk[d](c)},mP[120]=()=>{let a=mY();return new RegExp(a[0],a[1])};let nl=[];function nm(a){aa&&aa();let b=U,c=mI,d=mL,e=mN,f=mO,g=W,h=mK,i=Y,j=X,k=new Uint8Array(T.slice(0,U)),l=V,m=V.slice(0,V.length),n=mM,o=mT,p=a();return U=b,mI=c,mL=d,mN=e,mO=f,W=g,mK=h,Y=i,X=j,T=k,mT=o,(V=l).splice(0,V.length,...m),mM=n,Z=new DataView(T.buffer,T.byteOffset,T.byteLength),p}function nn(){T=null,Y=null,V=null}mP[98]=a=>{let b=(a[0]<<24)+(a[1]<<16)+(a[2]<<8)+a[3],c=mI;return mI+=b-a.length,X=nl,(X=[nb(),nb()]).position0=0,X.position1=0,X.postBundlePosition=mI,mI=c,mY()},mP[255]=a=>4==a.length?new Date((0x1000000*a[0]+(a[1]<<16)+(a[2]<<8)+a[3])*1e3):8==a.length?new Date(((a[0]<<22)+(a[1]<<14)+(a[2]<<6)+(a[3]>>2))/1e6+((3&a[3])*0x100000000+0x1000000*a[4]+(a[5]<<16)+(a[6]<<8)+a[7])*1e3):12==a.length?new Date(((a[0]<<24)+(a[1]<<16)+(a[2]<<8)+a[3])/1e6+((128&a[4]?-0x1000000000000:0)+0x10000000000*a[6]+0x100000000*a[7]+0x1000000*a[8]+(a[9]<<16)+(a[10]<<8)+a[11])*1e3):new Date("invalid");let no=Array(147);for(let a=0;a<256;a++)no[a]=+("1e"+Math.floor(45.15-.30103*a));var np=new mV({useRecords:!1});np.unpack,np.unpackMultiple,np.unpack,new Uint8Array(new Float32Array(1).buffer,0,4);try{b=new TextEncoder}catch(a){}let nq="undefined"!=typeof Buffer,nr=nq?function(a){return Buffer.allocUnsafeSlow(a)}:Uint8Array,ns=nq?Buffer:Uint8Array,nt=nq?0x100000000:0x7fd00000,nu=0,nv=null,nw=/[\u0080-\uFFFF]/,nx=Symbol("record-id");class ny extends mV{constructor(a){let j,k,l,m;super(a),this.offset=0;let n=ns.prototype.utf8Write?function(a,b){return e.utf8Write(a,b,e.byteLength-b)}:!!b&&!!b.encodeInto&&function(a,c){return b.encodeInto(a,e.subarray(c)).written},o=this;a||(a={});let p=a&&a.sequential,q=a.structures||a.saveStructures,r=a.maxSharedStructures;if(null==r&&(r=32*!!q),r>8160)throw Error("Maximum maxSharedStructure is 8160");a.structuredClone&&void 0==a.moreTypes&&(this.moreTypes=!0);let s=a.maxOwnStructures;null==s&&(s=q?32:64),this.structures||!1==a.useRecords||(this.structures=[]);let t=r>32||s+r>64,u=r+64,v=r+s+64;if(v>8256)throw Error("Maximum maxSharedStructure + maxOwnStructure is 8192");let w=[],x=0,y=0;this.pack=this.encode=function(a,b){let c;if(e||(g=(e=new nr(8192)).dataView||(e.dataView=new DataView(e.buffer,0,8192)),nu=0),(h=e.length-10)-nu<2048?(g=(e=new nr(e.length)).dataView||(e.dataView=new DataView(e.buffer,0,e.length)),h=e.length-10,nu=0):nu=nu+7&0x7ffffff8,j=nu,b&nL&&(nu+=255&b),m=o.structuredClone?new Map:null,o.bundleStrings&&"string"!=typeof a?(nv=[]).size=1/0:nv=null,l=o.structures){l.uninitialized&&(l=o._mergeStructures(o.getStructures()));let a=l.sharedLength||0;if(a>r)throw Error("Shared structures is larger than maximum shared structures, try increasing maxSharedStructures to "+l.sharedLength);if(!l.transitions){l.transitions=Object.create(null);for(let b=0;b<a;b++){let a=l[b];if(!a)continue;let c,d=l.transitions;for(let b=0,e=a.length;b<e;b++){let e=a[b];(c=d[e])||(c=d[e]=Object.create(null)),d=c}d[nx]=b+64}this.lastNamedStructuresLength=a}p||(l.nextId=a+64)}k&&(k=!1);try{o.randomAccessStructure&&a&&a.constructor&&a.constructor===Object?J(a):B(a);let c=nv;if(nv&&nC(j,B,0),m&&m.idsToInsert){let a=m.idsToInsert.sort((a,b)=>a.offset>b.offset?1:-1),b=a.length,d=-1;for(;c&&b>0;){let e=a[--b].offset+j;e<c.stringsPosition+j&&-1===d&&(d=0),e>c.position+j?d>=0&&(d+=6):(d>=0&&(g.setUint32(c.position+j,g.getUint32(c.position+j)+d),d=-1),c=c.previous,b++)}d>=0&&c&&g.setUint32(c.position+j,g.getUint32(c.position+j)+d),(nu+=6*a.length)>h&&G(nu),o.offset=nu;let f=function(a,b){let c,d=6*b.length,e=a.length-d;for(;c=b.pop();){let b=c.offset,f=c.id;a.copyWithin(b+d,b,e);let g=b+(d-=6);a[g++]=214,a[g++]=105,a[g++]=f>>24,a[g++]=f>>16&255,a[g++]=f>>8&255,a[g++]=255&f,e=b}return a}(e.subarray(j,nu),a);return m=null,f}if(o.offset=nu,b&nJ)return e.start=j,e.end=nu,e;return e.subarray(j,nu)}catch(a){throw c=a,a}finally{if(l&&(z(),k&&o.saveStructures)){let d=l.sharedLength||0,f=e.subarray(j,nu),g=nD(l,o);if(!c){if(!1===o.saveStructures(g,g.isCompatible))return o.pack(a,b);return o.lastNamedStructuresLength=d,e.length>0x40000000&&(e=null),f}}e.length>0x40000000&&(e=null),b&nK&&(nu=j)}};const z=()=>{y<10&&y++;let a=l.sharedLength||0;if(l.length>a&&!p&&(l.length=a),x>1e4)l.transitions=null,y=0,x=0,w.length>0&&(w=[]);else if(w.length>0&&!p){for(let a=0,b=w.length;a<b;a++)w[a][nx]=0;w=[]}},A=a=>{var b=a.length;b<16?e[nu++]=144|b:b<65536?(e[nu++]=220,e[nu++]=b>>8,e[nu++]=255&b):(e[nu++]=221,g.setUint32(nu,b),nu+=4);for(let c=0;c<b;c++)B(a[c])},B=a=>{nu>h&&(e=G(nu));var b,f=typeof a;if("string"===f){let c,d=a.length;if(nv&&d>=4&&d<4096){if((nv.size+=d)>21760){let a,b,c=(nv[0]?3*nv[0].length+nv[1].length:0)+10;nu+c>h&&(e=G(nu+c)),nv.position?(b=nv,e[nu]=200,nu+=3,e[nu++]=98,a=nu-j,nu+=4,nC(j,B,0),g.setUint16(a+j-3,nu-j-a)):(e[nu++]=214,e[nu++]=98,a=nu-j,nu+=4),(nv=["",""]).previous=b,nv.size=0,nv.position=a}let b=nw.test(a);nv[+!b]+=a,e[nu++]=193,B(b?-d:d);return}c=d<32?1:d<256?2:d<65536?3:5;let f=3*d;if(nu+f>h&&(e=G(nu+f)),d<64||!n){let f,g,h,i=nu+c;for(f=0;f<d;f++)(g=a.charCodeAt(f))<128?e[i++]=g:(g<2048?e[i++]=g>>6|192:((64512&g)==55296&&(64512&(h=a.charCodeAt(f+1)))==56320?(g=65536+((1023&g)<<10)+(1023&h),f++,e[i++]=g>>18|240,e[i++]=g>>12&63|128):e[i++]=g>>12|224,e[i++]=g>>6&63|128),e[i++]=63&g|128);b=i-nu-c}else b=n(a,nu+c);b<32?e[nu++]=160|b:b<256?(c<2&&e.copyWithin(nu+2,nu+1,nu+1+b),e[nu++]=217,e[nu++]=b):b<65536?(c<3&&e.copyWithin(nu+3,nu+2,nu+2+b),e[nu++]=218,e[nu++]=b>>8,e[nu++]=255&b):(c<5&&e.copyWithin(nu+5,nu+3,nu+3+b),e[nu++]=219,g.setUint32(nu,b),nu+=4),nu+=b}else if("number"===f)if(a>>>0===a)a<32||a<128&&!1===this.useRecords||a<64&&!this.randomAccessStructure?e[nu++]=a:a<256?(e[nu++]=204,e[nu++]=a):a<65536?(e[nu++]=205,e[nu++]=a>>8,e[nu++]=255&a):(e[nu++]=206,g.setUint32(nu,a),nu+=4);else if((0|a)===a)a>=-32?e[nu++]=256+a:a>=-128?(e[nu++]=208,e[nu++]=a+256):a>=-32768?(e[nu++]=209,g.setInt16(nu,a),nu+=2):(e[nu++]=210,g.setInt32(nu,a),nu+=4);else{let b;if((b=this.useFloat32)>0&&a<0x100000000&&a>=-0x80000000){let c;if(e[nu++]=202,g.setFloat32(nu,a),b<4||(0|(c=a*no[(127&e[nu])<<1|e[nu+1]>>7]))===c){nu+=4;return}nu--}e[nu++]=203,g.setFloat64(nu,a),nu+=8}else if("object"===f||"function"===f)if(a){if(m){let b=m.get(a);if(b){b.id||(b.id=(m.idsToInsert||(m.idsToInsert=[])).push(b)),e[nu++]=214,e[nu++]=112,g.setUint32(nu,b.id),nu+=4;return}m.set(a,{offset:nu-j})}let i=a.constructor;if(i===Object)F(a);else if(i===Array)A(a);else if(i===Map)if(this.mapAsEmptyObject)e[nu++]=128;else for(let[c,d]of((b=a.size)<16?e[nu++]=128|b:b<65536?(e[nu++]=222,e[nu++]=b>>8,e[nu++]=255&b):(e[nu++]=223,g.setUint32(nu,b),nu+=4),a))B(c),B(d);else{for(let b=0,f=c.length;b<f;b++)if(a instanceof d[b]){let d,f=c[b];if(f.write){f.type&&(e[nu++]=212,e[nu++]=f.type,e[nu++]=0);let b=f.write.call(this,a);b===a?Array.isArray(a)?A(a):F(a):B(b);return}let i=e,j=g,k=nu;e=null;try{d=f.pack.call(this,a,a=>(e=i,i=null,(nu+=a)>h&&G(nu),{target:e,targetView:g,position:nu-a}),B)}finally{i&&(e=i,g=j,nu=k,h=e.length-10)}d&&(d.length+nu>h&&G(d.length+nu),nu=nB(d,e,nu,f.type));return}if(Array.isArray(a))A(a);else{if(a.toJSON){let b=a.toJSON();if(b!==a)return B(b)}if("function"===f)return B(this.writeFunction&&this.writeFunction(a));F(a)}}}else e[nu++]=192;else if("boolean"===f)e[nu++]=a?195:194;else if("bigint"===f){if(a<0x8000000000000000&&a>=-0x8000000000000000)e[nu++]=211,g.setBigInt64(nu,a);else if(a<0xffffffffffffffff&&a>0)e[nu++]=207,g.setBigUint64(nu,a);else if(this.largeBigIntToFloat)e[nu++]=203,g.setFloat64(nu,Number(a));else if(this.largeBigIntToString)return B(a.toString());else if(this.useBigIntExtension||this.moreTypes){let b,c=a<0?BigInt(-1):BigInt(0);if(a>>BigInt(65536)===c){let d=BigInt(0xffffffffffffffff)-BigInt(1),e=[];for(;e.push(a&d),a>>BigInt(63)!==c;)a>>=BigInt(64);(b=new Uint8Array(new BigUint64Array(e).buffer)).reverse()}else{let c=a<0,d=(c?~a:a).toString(16);if(d.length%2?d="0"+d:parseInt(d.charAt(0),16)>=8&&(d="00"+d),nq)b=Buffer.from(d,"hex");else{b=new Uint8Array(d.length/2);for(let a=0;a<b.length;a++)b[a]=parseInt(d.slice(2*a,2*a+2),16)}if(c)for(let a=0;a<b.length;a++)b[a]=~b[a]}b.length+nu>h&&G(b.length+nu),nu=nB(b,e,nu,66);return}else throw RangeError(a+" was too large to fit in MessagePack 64-bit integer format, use useBigIntExtension, or set largeBigIntToFloat to convert to float-64, or set largeBigIntToString to convert to string");nu+=8}else if("undefined"===f)this.encodeUndefinedAsNil?e[nu++]=192:(e[nu++]=212,e[nu++]=0,e[nu++]=0);else throw Error("Unknown type: "+f)},C=this.variableMapSize||this.coercibleKeyAsNumber||this.skipValues?a=>{let b,c;if(this.skipValues)for(let c in b=[],a)("function"!=typeof a.hasOwnProperty||a.hasOwnProperty(c))&&!this.skipValues.includes(a[c])&&b.push(c);else b=Object.keys(a);let d=b.length;if(d<16?e[nu++]=128|d:d<65536?(e[nu++]=222,e[nu++]=d>>8,e[nu++]=255&d):(e[nu++]=223,g.setUint32(nu,d),nu+=4),this.coercibleKeyAsNumber)for(let e=0;e<d;e++){let d=Number(c=b[e]);B(isNaN(d)?c:d),B(a[c])}else for(let e=0;e<d;e++)B(c=b[e]),B(a[c])}:a=>{e[nu++]=222;let b=nu-j;nu+=2;let c=0;for(let b in a)("function"!=typeof a.hasOwnProperty||a.hasOwnProperty(b))&&(B(b),B(a[b]),c++);if(c>65535)throw Error('Object is too large to serialize with fast 16-bit map size, use the "variableMapSize" option to serialize this object');e[b+++j]=c>>8,e[b+j]=255&c},D=!1===this.useRecords?C:a.progressiveRecords&&!t?a=>{let b,c,d=l.transitions||(l.transitions=Object.create(null)),f=nu++-j;for(let e in a)if("function"!=typeof a.hasOwnProperty||a.hasOwnProperty(e)){if(c=d[e])d=c;else{let g=Object.keys(a),h=d;d=l.transitions;let i=0;for(let a=0,b=g.length;a<b;a++){let b=g[a];!(c=d[b])&&(c=d[b]=Object.create(null),i++),d=c}f+j+1==nu?(nu--,H(d,g,i)):I(d,g,f,i),b=!0,d=h[e]}B(a[e])}if(!b){let b=d[nx];b?e[f+j]=b:I(d,Object.keys(a),f,0)}}:a=>{let b,c=l.transitions||(l.transitions=Object.create(null)),d=0;for(let e in a)("function"!=typeof a.hasOwnProperty||a.hasOwnProperty(e))&&(!(b=c[e])&&(b=c[e]=Object.create(null),d++),c=b);let f=c[nx];for(let b in f?f>=96&&t?(e[nu++]=(31&(f-=96))+96,e[nu++]=f>>5):e[nu++]=f:H(c,c.__keys__||Object.keys(a),d),a)("function"!=typeof a.hasOwnProperty||a.hasOwnProperty(b))&&B(a[b])},E="function"==typeof this.useRecords&&this.useRecords,F=E?a=>{E(a)?D(a):C(a)}:D,G=a=>{let b;if(a>0x1000000){if(a-j>nt)throw Error("Packed buffer would be larger than maximum buffer size");b=Math.min(nt,4096*Math.round(Math.max((a-j)*(a>0x4000000?1.25:2),4194304)/4096))}else b=(Math.max(a-j<<2,e.length-1)>>12)+1<<12;let c=new nr(b);return g=c.dataView||(c.dataView=new DataView(c.buffer,0,b)),a=Math.min(a,e.length),e.copy?e.copy(c,0,j,a):c.set(e.slice(j,a)),nu-=j,j=0,h=c.length-10,e=c},H=(a,b,c)=>{let d=l.nextId;d||(d=64),d<u&&this.shouldShareStructure&&!this.shouldShareStructure(b)?((d=l.nextOwnId)<v||(d=u),l.nextOwnId=d+1):(d>=v&&(d=u),l.nextId=d+1);let f=b.highByte=d>=96&&t?d-96>>5:-1;a[nx]=d,a.__keys__=b,l[d-64]=b,d<u?(b.isShared=!0,l.sharedLength=d-63,k=!0,f>=0?(e[nu++]=(31&d)+96,e[nu++]=f):e[nu++]=d):(f>=0?(e[nu++]=213,e[nu++]=114,e[nu++]=(31&d)+96,e[nu++]=f):(e[nu++]=212,e[nu++]=114,e[nu++]=d),c&&(x+=y*c),w.length>=s&&(w.shift()[nx]=0),w.push(a),B(b))},I=(a,b,c,d)=>{let g=e,i=nu,k=h,l=j;nu=0,j=0,(e=f)||(f=e=new nr(8192)),h=e.length-10,H(a,b,d),f=e;let m=nu;if(e=g,nu=i,h=k,j=l,m>1){let a=nu+m-1;a>h&&G(a);let b=c+j;e.copyWithin(b+m,b+1,nu),e.set(f.slice(0,m),b),nu=a}else e[c+j]=f[0]},J=a=>{let b=i(a,e,j,nu,l,G,(a,b,c)=>{if(c)return k=!0;nu=b;let d=e;return(B(a),z(),d!==e)?{position:nu,targetView:g,target:e}:nu},this);if(0===b)return F(a);nu=b}}useBuffer(a){(e=a).dataView||(e.dataView=new DataView(e.buffer,e.byteOffset,e.byteLength)),g=e.dataView,nu=0}set position(a){nu=a}get position(){return nu}clearSharedData(){this.structures&&(this.structures=[]),this.typedStructs&&(this.typedStructs=[])}}function nz(a,b,c,d){let e=a.byteLength;if(e+1<256){var{target:f,position:g}=c(4+e);f[g++]=199,f[g++]=e+1}else if(e+1<65536){var{target:f,position:g}=c(5+e);f[g++]=200,f[g++]=e+1>>8,f[g++]=e+1&255}else{var{target:f,position:g,targetView:h}=c(7+e);f[g++]=201,h.setUint32(g,e+1),g+=4}f[g++]=116,f[g++]=b,a.buffer||(a=new Uint8Array(a)),f.set(new Uint8Array(a.buffer,a.byteOffset,a.byteLength),g)}function nA(a,b){let c=a.byteLength;if(c<256){var d,e,{target:d,position:e}=b(c+2);d[e++]=196,d[e++]=c}else if(c<65536){var{target:d,position:e}=b(c+3);d[e++]=197,d[e++]=c>>8,d[e++]=255&c}else{var{target:d,position:e,targetView:f}=b(c+5);d[e++]=198,f.setUint32(e,c),e+=4}d.set(a,e)}function nB(a,b,c,d){let e=a.length;switch(e){case 1:b[c++]=212;break;case 2:b[c++]=213;break;case 4:b[c++]=214;break;case 8:b[c++]=215;break;case 16:b[c++]=216;break;default:e<256?(b[c++]=199,b[c++]=e):(e<65536?(b[c++]=200,b[c++]=e>>8):(b[c++]=201,b[c++]=e>>24,b[c++]=e>>16&255,b[c++]=e>>8&255),b[c++]=255&e)}return b[c++]=d,b.set(a,c),c+=e}function nC(a,b,c){if(nv.length>0){g.setUint32(nv.position+a,nu+c-nv.position-a),nv.stringsPosition=nu-a;let d=nv;nv=null,b(d[0]),b(d[1])}}function nD(a,b){return a.isCompatible=a=>{let c=!a||(b.lastNamedStructuresLength||0)===a.length;return c||b._mergeStructures(a),c},a}d=[Date,Set,Error,RegExp,ArrayBuffer,Object.getPrototypeOf(Uint8Array.prototype).constructor,DataView,mR],c=[{pack(a,b,c){let d=a.getTime()/1e3;if((this.useTimestamp32||0===a.getMilliseconds())&&d>=0&&d<0x100000000){let{target:a,targetView:c,position:e}=b(6);a[e++]=214,a[e++]=255,c.setUint32(e,d)}else if(d>0&&d<0x100000000){let{target:c,targetView:e,position:f}=b(10);c[f++]=215,c[f++]=255,e.setUint32(f,4e6*a.getMilliseconds()+(d/1e3/0x100000000|0)),e.setUint32(f+4,d)}else if(isNaN(d)){if(this.onInvalidDate)return b(0),c(this.onInvalidDate());let{target:a,targetView:d,position:e}=b(3);a[e++]=212,a[e++]=255,a[e++]=255}else{let{target:c,targetView:e,position:f}=b(15);c[f++]=199,c[f++]=12,c[f++]=255,e.setUint32(f,1e6*a.getMilliseconds()),e.setBigInt64(f+4,BigInt(Math.floor(d)))}}},{pack(a,b,c){if(this.setAsEmptyObject)return b(0),c({});let d=Array.from(a),{target:e,position:f}=b(3*!!this.moreTypes);this.moreTypes&&(e[f++]=212,e[f++]=115,e[f++]=0),c(d)}},{pack(a,b,c){let{target:d,position:e}=b(3*!!this.moreTypes);this.moreTypes&&(d[e++]=212,d[e++]=101,d[e++]=0),c([a.name,a.message,a.cause])}},{pack(a,b,c){let{target:d,position:e}=b(3*!!this.moreTypes);this.moreTypes&&(d[e++]=212,d[e++]=120,d[e++]=0),c([a.source,a.flags])}},{pack(a,b){this.moreTypes?nz(a,16,b):nA(nq?Buffer.from(a):new Uint8Array(a),b)}},{pack(a,b){let c=a.constructor;c!==ns&&this.moreTypes?nz(a,nj.indexOf(c.name),b):nA(a,b)}},{pack(a,b){this.moreTypes?nz(a,17,b):nA(nq?Buffer.from(a):new Uint8Array(a),b)}},{pack(a,b){let{target:c,position:d}=b(1);c[d]=193}}];let nE=new ny({useRecords:!1});nE.pack,nE.pack;let{NEVER:nF,ALWAYS:nG,DECIMAL_ROUND:nH,DECIMAL_FIT:nI}={NEVER:0,ALWAYS:1,DECIMAL_ROUND:3,DECIMAL_FIT:4},nJ=512,nK=1024,nL=2048,nM=["num","object","string","ascii"];nM[16]="date";let nN=[!1,!0,!0,!1,!1,!0,!0,!1];try{Function(""),j=!0}catch(a){}let nO="undefined"!=typeof Buffer;try{l=new TextEncoder}catch(a){}let nP=nO?function(a,b,c){return a.utf8Write(b,c,a.byteLength-c)}:!!l&&!!l.encodeInto&&function(a,b,c){return l.encodeInto(b,a.subarray(c)).written};function nQ(a,b,c,d){let e;return(e=a.ascii8||a.num8)?(c.setInt8(b,d,!0),k=b+1,e):(e=a.string16||a.object16)?(c.setInt16(b,d,!0),k=b+2,e):(e=a.num32)?(c.setUint32(b,0xe0000100+d,!0),k=b+4,e):(e=a.num64)?(c.setFloat64(b,NaN,!0),c.setInt8(b,d),k=b+8,e):void(k=b)}function nR(a,b,c){let d=nM[b]+(c<<3),e=a[d]||(a[d]=Object.create(null));return e.__type=b,e.__size=c,e.__parent=a,e}Symbol("type"),Symbol("parent"),i=function a(b,c,d,e,f,g,h,i){let j,l=i.typedStructs||(i.typedStructs=[]),m=c.dataView,n=(l.lastStringStart||100)+e,o=c.length-10,p=e;e>o&&(m=(c=g(e)).dataView,e-=d,p-=d,n-=d,d=0,o=c.length-10);let q,r=n,s=l.transitions||(l.transitions=Object.create(null)),t=l.nextId||l.length,u=t<15?1:t<240?2:t<61440?3:4*(t<0xf00000);if(0===u)return 0;e+=u;let v=[],w=0;for(let a in b){let f=b[a],i=s[a];switch(!i&&(s[a]=i={key:a,parent:s,enumerationOffset:0,ascii0:null,ascii8:null,num8:null,string16:null,object16:null,num32:null,float64:null,date64:null}),e>o&&(m=(c=g(e)).dataView,e-=d,p-=d,n-=d,r-=d,d=0,o=c.length-10),typeof f){case"number":if(t<200||!i.num64){if((0|f)===f&&f<0x20000000&&f>-0x1f000000){f<246&&f>=0&&(i.num8&&!(t>200&&i.num32)||f<32&&!i.num32)?(s=i.num8||nR(i,0,1),c[e++]=f):(s=i.num32||nR(i,0,4),m.setUint32(e,f,!0),e+=4);break}else if(f<0x100000000&&f>=-0x80000000&&(m.setFloat32(e,f,!0),nN[c[e+3]>>>5])){let a;if((0|(a=f*no[(127&c[e+3])<<1|c[e+2]>>7]))===a){s=i.num32||nR(i,0,4),e+=4;break}}}s=i.num64||nR(i,0,8),m.setFloat64(e,f,!0),e+=8;break;case"string":let u,x=f.length;if(q=r-n,(x<<2)+r>o&&(m=(c=g((x<<2)+r)).dataView,e-=d,p-=d,n-=d,r-=d,d=0,o=c.length-10),x>65280+q>>2){v.push(a,f,e-p);break}let y=r;if(x<64){let a,b,d;for(a=0;a<x;a++)(b=f.charCodeAt(a))<128?c[r++]=b:(b<2048?(u=!0,c[r++]=b>>6|192):((64512&b)==55296&&(64512&(d=f.charCodeAt(a+1)))==56320?(u=!0,b=65536+((1023&b)<<10)+(1023&d),a++,c[r++]=b>>18|240,c[r++]=b>>12&63|128):(u=!0,c[r++]=b>>12|224),c[r++]=b>>6&63|128),c[r++]=63&b|128)}else r+=nP(c,f,r),u=r-y>x;if(q<160||q<246&&(i.ascii8||i.string8)){if(u)(s=i.string8)||(l.length>10&&(s=i.ascii8)?(s.__type=2,i.ascii8=null,i.string8=s,h(null,0,!0)):s=nR(i,2,1));else if(0!==q||j)(s=i.ascii8)||l.length>10&&(s=i.string8)||(s=nR(i,3,1));else{j=!0,s=i.ascii0||nR(i,3,0);break}c[e++]=q}else s=i.string16||nR(i,2,2),m.setUint16(e,q,!0),e+=2;break;case"object":f?f.constructor===Date?(s=i.date64||nR(i,16,8),m.setFloat64(e,f.getTime(),!0),e+=8):v.push(a,f,w):(i=nQ(i,e,m,-10))?(s=i,e=k):v.push(a,f,w);break;case"boolean":s=i.num8||i.ascii8||nR(i,0,1),c[e++]=f?249:248;break;case"undefined":(i=nQ(i,e,m,-9))?(s=i,e=k):v.push(a,f,w);break;default:v.push(a,f,w)}w++}for(let a=0,b=v.length;a<b;){let b,f=v[a++],g=v[a++],i=v[a++],j=s[f];if(j||(s[f]=j={key:f,parent:s,enumerationOffset:i-w,ascii0:null,ascii8:null,num8:null,string16:null,object16:null,num32:null,float64:null}),g){let a;(q=r-n)<65280?(s=j.object16)?a=2:(s=j.object32)?a=4:(s=nR(j,1,2),a=2):(s=j.object32||nR(j,1,4),a=4),"object"==typeof(b=h(g,r))?(r=b.position,m=b.targetView,c=b.target,n-=d,e-=d,p-=d,d=0):r=b,2===a?(m.setUint16(e,q,!0),e+=2):(m.setUint32(e,q,!0),e+=4)}else s=j.object16||nR(j,1,2),m.setInt16(e,null===g?-10:-9,!0),e+=2;w++}let x=s[nx];if(null==x){let a;x=i.typedStructs.length;let b=[],c=s;for(;void 0!==(a=c.__type);){let d=[a,c.__size,(c=c.__parent).key];c.enumerationOffset&&d.push(c.enumerationOffset),b.push(d),c=c.parent}b.reverse(),s[nx]=x,i.typedStructs[x]=b,h(null,0,!0)}switch(u){case 1:if(x>=16)return 0;c[p]=x+32;break;case 2:if(x>=256)return 0;c[p]=56,c[p+1]=x;break;case 3:if(x>=65536)return 0;c[p]=57,m.setUint16(p+1,x,!0);break;case 4:if(x>=0x1000000)return 0;m.setUint32(p,(x<<8)+58,!0)}if(e<n){if(n===r)return e;c.copyWithin(e,n,r),r+=e-n,l.lastStringStart=e-p}else if(e>n)return n===r?e:(l.lastStringStart=e-p,a(b,c,d,p,f,g,h,i));return r},nD=function(a,b){if(b.typedStructs){let c=new Map;c.set("named",a),c.set("typed",b.typedStructs),a=c}let c=b.lastTypedStructuresLength||0;return a.isCompatible=a=>{let d=!0;return a instanceof Map?((a.get("named")||[]).length!==(b.lastNamedStructuresLength||0)&&(d=!1),(a.get("typed")||[]).length!==c&&(d=!1)):(a instanceof Array||Array.isArray(a))&&a.length!==(b.lastNamedStructuresLength||0)&&(d=!1),d||b._mergeStructures(a),d},b.lastTypedStructuresLength=b.typedStructs&&b.typedStructs.length,a};var nS=Symbol.for("source");function nT(a){switch(a){case 246:return null;case 247:return;case 248:return!1;case 249:return!0}throw Error("Unknown constant")}$=function(a,b,c,d){let e=a[b++]-32;if(e>=24)switch(e){case 24:e=a[b++];break;case 25:e=a[b++]+(a[b++]<<8);break;case 26:e=a[b++]+(a[b++]<<8)+(a[b++]<<16);break;case 27:e=a[b++]+(a[b++]<<8)+(a[b++]<<16)+(a[b++]<<24)}let f=d.typedStructs&&d.typedStructs[e];if(!f){if(a=Uint8Array.prototype.slice.call(a,b,c),c-=b,b=0,!d.getStructures)throw Error(`Reference to shared structure ${e} without getStructures method`);if(d._mergeStructures(d.getStructures()),!d.typedStructs)throw Error("Could not find any shared typed structures");if(d.lastTypedStructuresLength=d.typedStructs.length,!(f=d.typedStructs[e]))throw Error("Could not find typed structure "+e)}var g=f.construct,h=f.fullConstruct;if(!g){let a;g=f.construct=function(){},(h=f.fullConstruct=function(){}).prototype=d.structPrototype||{};var i=g.prototype=d.structPrototype?Object.create(d.structPrototype):{};let b=[],c=0;for(let e=0,g=f.length;e<g;e++){let g,h,[i,j,k,l]=f[e];"__proto__"===k&&(k="__proto_");let n={key:k,offset:c};switch(l?b.splice(e+l,0,n):b.push(n),j){case 0:g=()=>0;break;case 1:g=(a,b)=>{let c=a.bytes[b+n.offset];return c>=246?nT(c):c};break;case 2:g=(a,b)=>{let c=a.bytes,d=(c.dataView||(c.dataView=new DataView(c.buffer,c.byteOffset,c.byteLength))).getUint16(b+n.offset,!0);return d>=65280?nT(255&d):d};break;case 4:g=(a,b)=>{let c=a.bytes,d=(c.dataView||(c.dataView=new DataView(c.buffer,c.byteOffset,c.byteLength))).getUint32(b+n.offset,!0);return d>=0xffffff00?nT(255&d):d}}switch(n.getRef=g,c+=j,i){case 3:a&&!a.next&&(a.next=n),a=n,n.multiGetCount=0,h=function(a){let b=a.bytes,d=a.position,e=c+d,f=g(a,d);if("number"!=typeof f)return f;let h,i=n.next;for(;i&&"number"!=typeof(h=i.getRef(a,d));)h=null,i=i.next;return(null==h&&(h=a.bytesEnd-e),a.srcString)?a.srcString.slice(f,h):function(a,b,c){let d=T;T=a,mI=b;try{return m5(c)}finally{T=d}}(b,f+e,h-f)};break;case 2:case 1:a&&!a.next&&(a.next=n),a=n,h=function(a){let b=a.position,e=c+b,f=g(a,b);if("number"!=typeof f)return f;let h=a.bytes,j,k=n.next;for(;k&&"number"!=typeof(j=k.getRef(a,b));)j=null,k=k.next;if(null==j&&(j=a.bytesEnd-e),2===i)return h.toString("utf8",f+e,j+e);m=a;try{return d.unpack(h,{start:f+e,end:j+e})}finally{m=null}};break;case 0:switch(j){case 4:h=function(a){let b=a.bytes,c=b.dataView||(b.dataView=new DataView(b.buffer,b.byteOffset,b.byteLength)),d=a.position+n.offset,e=c.getInt32(d,!0);if(e<0x20000000){if(e>-0x1f000000)return e;if(e>-0x20000000)return nT(255&e)}let f=c.getFloat32(d,!0),g=no[(127&b[d+3])<<1|b[d+2]>>7];return(g*f+(f>0?.5:-.5)|0)/g};break;case 8:h=function(a){let b=a.bytes,c=(b.dataView||(b.dataView=new DataView(b.buffer,b.byteOffset,b.byteLength))).getFloat64(a.position+n.offset,!0);if(isNaN(c)){let c=b[a.position+n.offset];if(c>=246)return nT(c)}return c};break;case 1:h=function(a){let b=a.bytes[a.position+n.offset];return b<246?b:nT(b)}}break;case 16:h=function(a){let b=a.bytes;return new Date((b.dataView||(b.dataView=new DataView(b.buffer,b.byteOffset,b.byteLength))).getFloat64(a.position+n.offset,!0))}}n.get=h}if(j){let a,c=[],e=[],f=0;for(let g of b){if(d.alwaysLazyProperty&&d.alwaysLazyProperty(g.key)){a=!0;continue}Object.defineProperty(i,g.key,{get:function(a){return function(){return a(this[nS])}}(g.get),enumerable:!0});let b="v"+f++;e.push(b),c.push("o["+JSON.stringify(g.key)+"]="+b+"(s)")}a&&c.push("__proto__:this");let g=Function(...e,"var c=this;return function(s){var o=new c();"+c.join(";")+";return o;}").apply(h,b.map(a=>a.get));Object.defineProperty(i,"toJSON",{value(a){return g.call(this,this[nS])}})}else Object.defineProperty(i,"toJSON",{value(a){let c={};for(let a=0,d=b.length;a<d;a++){let d=b[a].key;c[d]=this[d]}return c}})}var k=new g;return k[nS]={bytes:a,position:b,srcString:"",bytesEnd:c},k},_=function(a){if(!(a instanceof Map))return a;let b=a.get("typed")||[];Object.isFrozen(b)&&(b=b.map(a=>a.slice(0)));let c=a.get("named"),d=Object.create(null);for(let a=0,c=b.length;a<c;a++){let c=b[a],e=d;for(let[a,b,d]of c){let c=e[d];c||(e[d]=c={key:d,parent:e,enumerationOffset:0,ascii0:null,ascii8:null,num8:null,string16:null,object16:null,num32:null,float64:null,date64:null}),e=nR(c,a,b)}e[nx]=a}return b.transitions=d,this.typedStructs=b,this.lastTypedStructuresLength=b.length,c},aa=function(){m&&(m.bytes=Uint8Array.prototype.slice.call(m.bytes,m.position,m.bytesEnd),m.position=0,m.bytesEnd=m.bytes.length)};var nU=a.i(688947);if(nU.Transform,nU.Transform,a.i(362562),void 0===process.env.MSGPACKR_NATIVE_ACCELERATION_DISABLED||"true"!==process.env.MSGPACKR_NATIVE_ACCELERATION_DISABLED.toLowerCase()){let b;try{(b=a.r(337531))&&function(a){function b(b){return function(c){let d=mK[mL++];if(null==d){if(X)return m5(c);let e=T.byteOffset,f=a(mI-b+e,U+e,T.buffer);if("string"==typeof f)d=f,mK=mJ;else if(mL=1,mO=1,void 0===(d=(mK=f)[0]))throw Error("Unexpected end of buffer")}let e=d.length;return e<=c?(mI+=c,d):(W=d,mN=mI,mO=mI+e,mI+=c,d.slice(0,c))}}m1=b(1),m2=b(2),m3=b(3),m4=b(5)}(b.extractStrings)}catch(a){}}let nV="5.66.4",nW=new ny({useRecords:!1,encodeUndefinedAsNil:!0}).pack;class nX{constructor(a){this.queue=a,this.version=nV;const b=this.queue.keys;this.moveToFinishedKeys=[b.wait,b.active,b.prioritized,b.events,b.stalled,b.limiter,b.delayed,b.paused,b.meta,b.pc,void 0,void 0,void 0,void 0]}execCommand(a,b,c){return a[`${b}:${this.version}`](c)}async isJobInList(a,b){let c=await this.queue.client;return Number.isInteger(mw(this.queue.redisVersion,"6.0.6")?await this.execCommand(c,"isJobInList",[a,b]):await c.lpos(a,b))}addDelayedJobArgs(a,b,c){let d=this.queue.keys,e=[d.marker,d.meta,d.id,d.delayed,d.completed,d.events];return e.push(nW(c),a.data,b),e}addDelayedJob(a,b,c,d){let e=this.addDelayedJobArgs(b,c,d);return this.execCommand(a,"addDelayedJob",e)}addPrioritizedJobArgs(a,b,c){let d=this.queue.keys,e=[d.marker,d.meta,d.id,d.prioritized,d.delayed,d.completed,d.active,d.events,d.pc];return e.push(nW(c),a.data,b),e}addPrioritizedJob(a,b,c,d){let e=this.addPrioritizedJobArgs(b,c,d);return this.execCommand(a,"addPrioritizedJob",e)}addParentJobArgs(a,b,c){let d=this.queue.keys,e=[d.meta,d.id,d.delayed,d["waiting-children"],d.completed,d.events];return e.push(nW(c),a.data,b),e}addParentJob(a,b,c,d){let e=this.addParentJobArgs(b,c,d);return this.execCommand(a,"addParentJob",e)}addStandardJobArgs(a,b,c){let d=this.queue.keys,e=[d.wait,d.paused,d.meta,d.id,d.completed,d.delayed,d.active,d.events,d.marker];return e.push(nW(c),a.data,b),e}addStandardJob(a,b,c,d){let e=this.addStandardJobArgs(b,c,d);return this.execCommand(a,"addStandardJob",e)}async addJob(a,b,c,d,e={}){let f,g,h=this.queue.keys,i=b.parent,j=[h[""],void 0!==d?d:"",b.name,b.timestamp,b.parentKey||null,e.parentDependenciesKey||null,i,b.repeatJobKey,b.deduplicationId?`${h.de}:${b.deduplicationId}`:null];if(c.repeat){let a=Object.assign({},c.repeat);a.startDate&&(a.startDate=+new Date(a.startDate)),a.endDate&&(a.endDate=+new Date(a.endDate)),f=nW(Object.assign(Object.assign({},c),{repeat:a}))}else f=nW(c);if((g=e.addToWaitingChildren?await this.addParentJob(a,b,f,j):"number"==typeof c.delay&&c.delay>0?await this.addDelayedJob(a,b,f,j):c.priority?await this.addPrioritizedJob(a,b,f,j):await this.addStandardJob(a,b,f,j))<0)throw this.finishedErrors({code:g,parentKey:e.parentKey,command:"addJob"});return g}pauseArgs(a){let b="wait",c="paused";a||(b="paused",c="wait");let d=[b,c,"meta","prioritized"].map(a=>this.queue.toKey(a));return d.push(this.queue.keys.events,this.queue.keys.delayed,this.queue.keys.marker),d.concat([a?"paused":"resumed"])}async pause(a){let b=await this.queue.client,c=this.pauseArgs(a);return this.execCommand(b,"pause",c)}addRepeatableJobArgs(a,b,c,d){let e=this.queue.keys;return[e.repeat,e.delayed].concat([b,nW(c),d,a,e[""]])}async addRepeatableJob(a,b,c,d){let e=await this.queue.client,f=this.addRepeatableJobArgs(a,b,c,d);return this.execCommand(e,"addRepeatableJob",f)}async removeDeduplicationKey(a,b){let c=await this.queue.client,d=this.queue.keys,e=[`${d.de}:${a}`];return this.execCommand(c,"removeDeduplicationKey",e.concat([b]))}async addJobScheduler(a,b,c,d,e,f,g){let h=await this.queue.client,i=this.queue.keys,j=[i.repeat,i.delayed,i.wait,i.paused,i.meta,i.prioritized,i.marker,i.id,i.events,i.pc,i.active],k=[b,nW(e),a,c,nW(d),nW(f),Date.now(),i[""],g?this.queue.toKey(g):""],l=await this.execCommand(h,"addJobScheduler",j.concat(k));if("number"==typeof l&&l<0)throw this.finishedErrors({code:l,command:"addJobScheduler"});return l}async updateRepeatableJobMillis(a,b,c,d){let e=[this.queue.keys.repeat,c,b,d];return this.execCommand(a,"updateRepeatableJobMillis",e)}async updateJobSchedulerNextMillis(a,b,c,d,e){let f=await this.queue.client,g=this.queue.keys,h=[g.repeat,g.delayed,g.wait,g.paused,g.meta,g.prioritized,g.marker,g.id,g.events,g.pc,e?this.queue.toKey(e):"",g.active],i=[b,a,c,nW(d),Date.now(),g[""],e];return this.execCommand(f,"updateJobScheduler",h.concat(i))}removeRepeatableArgs(a,b,c){let d=this.queue.keys;return[d.repeat,d.delayed,d.events].concat([a,this.getRepeatConcatOptions(b,c),c,d[""]])}getRepeatConcatOptions(a,b){return b&&b.split(":").length>2?b:a}async removeRepeatable(a,b,c){let d=await this.queue.client,e=this.removeRepeatableArgs(a,b,c);return this.execCommand(d,"removeRepeatable",e)}async removeJobScheduler(a){let b=await this.queue.client,c=this.queue.keys,d=[c.repeat,c.delayed,c.events],e=[a,c[""]];return this.execCommand(b,"removeJobScheduler",d.concat(e))}removeArgs(a,b){let c=[a,"repeat"].map(a=>this.queue.toKey(a)),d=[a,+!!b,this.queue.toKey("")];return c.concat(d)}async remove(a,b){let c=await this.queue.client,d=this.removeArgs(a,b),e=await this.execCommand(c,"removeJob",d);if(e<0)throw this.finishedErrors({code:e,jobId:a,command:"removeJob"});return e}async removeUnprocessedChildren(a){let b=await this.queue.client,c=[this.queue.toKey(a),this.queue.keys.meta,this.queue.toKey(""),a];await this.execCommand(b,"removeUnprocessedChildren",c)}async extendLock(a,b,c,d){d=d||await this.queue.client;let e=[this.queue.toKey(a)+":lock",this.queue.keys.stalled,b,c,a];return this.execCommand(d,"extendLock",e)}async extendLocks(a,b,c){let d=await this.queue.client,e=[this.queue.keys.stalled,this.queue.toKey(""),nW(b),nW(a),c];return this.execCommand(d,"extendLocks",e)}async updateData(a,b){let c=await this.queue.client,d=[this.queue.toKey(a.id)],e=JSON.stringify(b),f=await this.execCommand(c,"updateData",d.concat([e]));if(f<0)throw this.finishedErrors({code:f,jobId:a.id,command:"updateData"})}async updateProgress(a,b){let c=await this.queue.client,d=[this.queue.toKey(a),this.queue.keys.events,this.queue.keys.meta],e=JSON.stringify(b),f=await this.execCommand(c,"updateProgress",d.concat([a,e]));if(f<0)throw this.finishedErrors({code:f,jobId:a,command:"updateProgress"})}async addLog(a,b,c){let d=await this.queue.client,e=[this.queue.toKey(a),this.queue.toKey(a)+":logs"],f=await this.execCommand(d,"addLog",e.concat([a,b,c||""]));if(f<0)throw this.finishedErrors({code:f,jobId:a,command:"addLog"});return f}moveToFinishedArgs(a,b,c,d,e,f,g,h=!0,i){var j,k,l,m,n,o,p;let q=this.queue.keys,r=this.queue.opts,s="completed"===e?r.removeOnComplete:r.removeOnFail,t=this.queue.toKey(`metrics:${e}`),u=this.moveToFinishedKeys;u[10]=q[e],u[11]=this.queue.toKey(null!=(j=a.id)?j:""),u[12]=t,u[13]=this.queue.keys.marker;let v=this.getKeepJobs(d,s),w=[a.id,g,c,void 0===b?"null":b,e,!h||this.queue.closing?0:1,q[""],nW({token:f,name:r.name,keepJobs:v,limiter:r.limiter,lockDuration:r.lockDuration,attempts:a.opts.attempts,maxMetricsSize:(null==(k=r.metrics)?void 0:k.maxDataPoints)?null==(l=r.metrics)?void 0:l.maxDataPoints:"",fpof:!!(null==(m=a.opts)?void 0:m.failParentOnFailure),cpof:!!(null==(n=a.opts)?void 0:n.continueParentOnFailure),idof:!!(null==(o=a.opts)?void 0:o.ignoreDependencyOnFailure),rdof:!!(null==(p=a.opts)?void 0:p.removeDependencyOnFailure)}),i?nW(mo(i)):void 0];return u.concat(w)}getKeepJobs(a,b){return void 0===a?b||{count:a?0:-1}:"object"==typeof a?a:"number"==typeof a?{count:a}:{count:a?0:-1}}async moveToFinished(a,b){let c=await this.queue.client,d=await this.execCommand(c,"moveToFinished",b);if(d<0)throw this.finishedErrors({code:d,jobId:a,command:"moveToFinished",state:"active"});if(void 0!==d)return nY(d)}drainArgs(a){let b=this.queue.keys;return[b.wait,b.paused,b.delayed,b.prioritized,b.repeat].concat([b[""],a?"1":"0"])}async drain(a){let b=await this.queue.client,c=this.drainArgs(a);return this.execCommand(b,"drain",c)}removeChildDependencyArgs(a,b){return[this.queue.keys[""]].concat([this.queue.toKey(a),b])}async removeChildDependency(a,b){let c=await this.queue.client,d=this.removeChildDependencyArgs(a,b),e=await this.execCommand(c,"removeChildDependency",d);switch(e){case 0:return!0;case 1:return!1;default:throw this.finishedErrors({code:e,jobId:a,parentKey:b,command:"removeChildDependency"})}}getRangesArgs(a,b,c,d){let e=this.queue.keys,f=a.map(a=>"waiting"===a?"wait":a);return[e[""]].concat([b,c,d?"1":"0",...f])}async getRanges(a,b=0,c=1,d=!1){let e=await this.queue.client,f=this.getRangesArgs(a,b,c,d);return await this.execCommand(e,"getRanges",f)}getCountsArgs(a){let b=this.queue.keys,c=a.map(a=>"waiting"===a?"wait":a);return[b[""]].concat([...c])}async getCounts(a){let b=await this.queue.client,c=this.getCountsArgs(a);return await this.execCommand(b,"getCounts",c)}getCountsPerPriorityArgs(a){return[this.queue.keys.wait,this.queue.keys.paused,this.queue.keys.meta,this.queue.keys.prioritized].concat(a)}async getCountsPerPriority(a){let b=await this.queue.client,c=this.getCountsPerPriorityArgs(a);return await this.execCommand(b,"getCountsPerPriority",c)}getDependencyCountsArgs(a,b){return[`${a}:processed`,`${a}:dependencies`,`${a}:failed`,`${a}:unsuccessful`].map(a=>this.queue.toKey(a)).concat(b)}async getDependencyCounts(a,b){let c=await this.queue.client,d=this.getDependencyCountsArgs(a,b);return await this.execCommand(c,"getDependencyCounts",d)}moveToCompletedArgs(a,b,c,d,e=!1){let f=Date.now();return this.moveToFinishedArgs(a,b,"returnvalue",c,"completed",d,f,e)}moveToFailedArgs(a,b,c,d,e=!1,f){let g=Date.now();return this.moveToFinishedArgs(a,b,"failedReason",c,"failed",d,g,e,f)}async isFinished(a,b=!1){let c=await this.queue.client,d=["completed","failed",a].map(a=>this.queue.toKey(a));return this.execCommand(c,"isFinished",d.concat([a,b?"1":""]))}async getState(a){let b=await this.queue.client,c=["completed","failed","delayed","active","wait","paused","waiting-children","prioritized"].map(a=>this.queue.toKey(a));return mw(this.queue.redisVersion,"6.0.6")?this.execCommand(b,"getState",c.concat([a])):this.execCommand(b,"getStateV2",c.concat([a]))}async changeDelay(a,b){let c=await this.queue.client,d=this.changeDelayArgs(a,b),e=await this.execCommand(c,"changeDelay",d);if(e<0)throw this.finishedErrors({code:e,jobId:a,command:"changeDelay",state:"delayed"})}changeDelayArgs(a,b){let c=Date.now();return[this.queue.keys.delayed,this.queue.keys.meta,this.queue.keys.marker,this.queue.keys.events].concat([b,JSON.stringify(c),a,this.queue.toKey(a)])}async changePriority(a,b=0,c=!1){let d=await this.queue.client,e=this.changePriorityArgs(a,b,c),f=await this.execCommand(d,"changePriority",e);if(f<0)throw this.finishedErrors({code:f,jobId:a,command:"changePriority"})}changePriorityArgs(a,b=0,c=!1){return[this.queue.keys.wait,this.queue.keys.paused,this.queue.keys.meta,this.queue.keys.prioritized,this.queue.keys.active,this.queue.keys.pc,this.queue.keys.marker].concat([b,this.queue.toKey(""),a,+!!c])}moveToDelayedArgs(a,b,c,d,e={}){let f=this.queue.keys;return[f.marker,f.active,f.prioritized,f.delayed,this.queue.toKey(a),f.events,f.meta,f.stalled].concat([this.queue.keys[""],b,a,c,d,e.skipAttempt?"1":"0",e.fieldsToUpdate?nW(mo(e.fieldsToUpdate)):void 0])}moveToWaitingChildrenArgs(a,b,c){let d=Date.now(),e=mt(c.child);return["active","waiting-children",a,`${a}:dependencies`,`${a}:unsuccessful`,"stalled","events"].map(a=>this.queue.toKey(a)).concat([b,null!=e?e:"",JSON.stringify(d),a,this.queue.toKey("")])}isMaxedArgs(){let a=this.queue.keys;return[a.meta,a.active]}async isMaxed(){let a=await this.queue.client,b=this.isMaxedArgs();return!!await this.execCommand(a,"isMaxed",b)}async moveToDelayed(a,b,c,d="0",e={}){let f=await this.queue.client,g=this.moveToDelayedArgs(a,b,d,c,e),h=await this.execCommand(f,"moveToDelayed",g);if(h<0)throw this.finishedErrors({code:h,jobId:a,command:"moveToDelayed",state:"active"})}async moveToWaitingChildren(a,b,c={}){let d=await this.queue.client,e=this.moveToWaitingChildrenArgs(a,b,c),f=await this.execCommand(d,"moveToWaitingChildren",e);switch(f){case 0:return!0;case 1:return!1;default:throw this.finishedErrors({code:f,jobId:a,command:"moveToWaitingChildren",state:"active"})}}getRateLimitTtlArgs(a){return[this.queue.keys.limiter,this.queue.keys.meta].concat([null!=a?a:"0"])}async getRateLimitTtl(a){let b=await this.queue.client,c=this.getRateLimitTtlArgs(a);return this.execCommand(b,"getRateLimitTtl",c)}async cleanJobsInSet(a,b,c=0){let d=await this.queue.client;return this.execCommand(d,"cleanJobsInSet",[this.queue.toKey(a),this.queue.toKey("events"),this.queue.toKey("repeat"),this.queue.toKey(""),b,c,a])}getJobSchedulerArgs(a){return[this.queue.keys.repeat].concat([a])}async getJobScheduler(a){let b=await this.queue.client,c=this.getJobSchedulerArgs(a);return this.execCommand(b,"getJobScheduler",c)}retryJobArgs(a,b,c,d={}){return[this.queue.keys.active,this.queue.keys.wait,this.queue.keys.paused,this.queue.toKey(a),this.queue.keys.meta,this.queue.keys.events,this.queue.keys.delayed,this.queue.keys.prioritized,this.queue.keys.pc,this.queue.keys.marker,this.queue.keys.stalled].concat([this.queue.toKey(""),Date.now(),(b?"R":"L")+"PUSH",a,c,d.fieldsToUpdate?nW(mo(d.fieldsToUpdate)):void 0])}async retryJob(a,b,c="0",d={}){let e=await this.queue.client,f=this.retryJobArgs(a,b,c,d),g=await this.execCommand(e,"retryJob",f);if(g<0)throw this.finishedErrors({code:g,jobId:a,command:"retryJob",state:"active"})}moveJobsToWaitArgs(a,b,c){return[this.queue.toKey(""),this.queue.keys.events,this.queue.toKey(a),this.queue.toKey("wait"),this.queue.toKey("paused"),this.queue.keys.meta,this.queue.keys.active,this.queue.keys.marker].concat([b,c,a])}async retryJobs(a="failed",b=1e3,c=new Date().getTime()){let d=await this.queue.client,e=this.moveJobsToWaitArgs(a,b,c);return this.execCommand(d,"moveJobsToWait",e)}async promoteJobs(a=1e3){let b=await this.queue.client,c=this.moveJobsToWaitArgs("delayed",a,Number.MAX_VALUE);return this.execCommand(b,"moveJobsToWait",c)}async reprocessJob(a,b,c={}){let d=await this.queue.client,e=[this.queue.toKey(a.id),this.queue.keys.events,this.queue.toKey(b),this.queue.keys.wait,this.queue.keys.meta,this.queue.keys.paused,this.queue.keys.active,this.queue.keys.marker],f=[a.id,(a.opts.lifo?"R":"L")+"PUSH","failed"===b?"failedReason":"returnvalue",b,c.resetAttemptsMade?"1":"0",c.resetAttemptsStarted?"1":"0"],g=await this.execCommand(d,"reprocessJob",e.concat(f));if(1!==g)throw this.finishedErrors({code:g,jobId:a.id,command:"reprocessJob",state:b})}async getMetrics(a,b=0,c=-1){let d=await this.queue.client,e=[this.queue.toKey(`metrics:${a}`),this.queue.toKey(`metrics:${a}:data`)];return await this.execCommand(d,"getMetrics",e.concat([b,c]))}async moveToActive(a,b,c){let d=this.queue.opts,e=this.queue.keys,f=[e.wait,e.active,e.prioritized,e.events,e.stalled,e.limiter,e.delayed,e.paused,e.meta,e.pc,e.marker],g=[e[""],Date.now(),nW({token:b,lockDuration:d.lockDuration,limiter:d.limiter,name:c})];return nY(await this.execCommand(a,"moveToActive",f.concat(g)))}async promote(a){let b=await this.queue.client,c=[this.queue.keys.delayed,this.queue.keys.wait,this.queue.keys.paused,this.queue.keys.meta,this.queue.keys.prioritized,this.queue.keys.active,this.queue.keys.pc,this.queue.keys.events,this.queue.keys.marker],d=[this.queue.toKey(""),a],e=await this.execCommand(b,"promote",c.concat(d));if(e<0)throw this.finishedErrors({code:e,jobId:a,command:"promote",state:"delayed"})}moveStalledJobsToWaitArgs(){let a=this.queue.opts;return[this.queue.keys.stalled,this.queue.keys.wait,this.queue.keys.active,this.queue.keys["stalled-check"],this.queue.keys.meta,this.queue.keys.paused,this.queue.keys.marker,this.queue.keys.events].concat([a.maxStalledCount,this.queue.toKey(""),Date.now(),a.stalledInterval])}async moveStalledJobsToWait(){let a=await this.queue.client,b=this.moveStalledJobsToWaitArgs();return this.execCommand(a,"moveStalledJobsToWait",b)}async moveJobFromActiveToWait(a,b="0"){let c=await this.queue.client,d=[this.queue.keys.active,this.queue.keys.wait,this.queue.keys.stalled,this.queue.keys.paused,this.queue.keys.meta,this.queue.keys.limiter,this.queue.keys.prioritized,this.queue.keys.marker,this.queue.keys.events],e=[a,b,this.queue.toKey(a)],f=await this.execCommand(c,"moveJobFromActiveToWait",d.concat(e));if(f<0)throw this.finishedErrors({code:f,jobId:a,command:"moveJobFromActiveToWait",state:"active"});return f}async obliterate(a){let b=await this.queue.client,c=[this.queue.keys.meta,this.queue.toKey("")],d=[a.count,a.force?"force":null],e=await this.execCommand(b,"obliterate",c.concat(d));if(e<0)switch(e){case -1:throw Error("Cannot obliterate non-paused queue");case -2:throw Error("Cannot obliterate queue with active jobs")}return e}async paginate(a,b){let c=await this.queue.client,d=[a],e=b.end>=0?b.end-b.start+1:1/0,f="0",g=0,h,i,j,k=[],l=[];do{let a=[b.start+k.length,b.end,f,g,5];b.fetchJobs&&a.push(1),[f,g,h,i,j]=await this.execCommand(c,"paginate",d.concat(a)),k=k.concat(h),j&&j.length&&(l=l.concat(j.map(mn)))}while("0"!=f&&k.length<e)if(!(k.length&&Array.isArray(k[0])))return{cursor:f,items:k.map(a=>({id:a})),total:i,jobs:l};{let a=[];for(let b=0;b<k.length;b++){let[c,d]=k[b];try{a.push({id:c,v:JSON.parse(d)})}catch(b){a.push({id:c,err:b.message})}}return{cursor:f,items:a,total:i,jobs:l}}}finishedErrors({code:a,jobId:b,parentKey:c,command:d,state:e}){let f;switch(a){case M.JobNotExist:f=Error(`Missing key for job ${b}. ${d}`);break;case M.JobLockNotExist:f=Error(`Missing lock for job ${b}. ${d}`);break;case M.JobNotInState:f=Error(`Job ${b} is not in the ${e} state. ${d}`);break;case M.JobPendingChildren:f=Error(`Job ${b} has pending dependencies. ${d}`);break;case M.ParentJobNotExist:f=Error(`Missing key for parent job ${c}. ${d}`);break;case M.JobLockMismatch:f=Error(`Lock mismatch for job ${b}. Cmd ${d} from ${e}`);break;case M.ParentJobCannotBeReplaced:f=Error(`The parent job ${c} cannot be replaced. ${d}`);break;case M.JobBelongsToJobScheduler:f=Error(`Job ${b} belongs to a job scheduler and cannot be removed directly. ${d}`);break;case M.JobHasFailedChildren:f=new mz(`Cannot complete job ${b} because it has at least one failed child. ${d}`);break;case M.SchedulerJobIdCollision:f=Error(`Cannot create job scheduler iteration - job ID already exists. ${d}`);break;case M.SchedulerJobSlotsBusy:f=Error(`Cannot create job scheduler iteration - current and next time slots already have jobs. ${d}`);break;default:f=Error(`Unknown code ${a} error for ${b}. ${d}`)}return f.code=a,f}}function nY(a){if(a){let b=[null,a[1],a[2],a[3]];return a[0]&&(b[0]=mn(a[0])),b}return[]}let nZ=a=>new nX({keys:a.keys,client:a.client,get redisVersion(){return a.redisVersion},toKey:a.toKey,opts:a.opts,closing:a.closing}),n$=(0,mH.debuglog)("bull");class n_{constructor(a,b,c,d={},e){this.queue=a,this.name=b,this.data=c,this.opts=d,this.id=e,this.progress=0,this.returnvalue=null,this.stacktrace=null,this.delay=0,this.priority=0,this.attemptsStarted=0,this.attemptsMade=0,this.stalledCounter=0;const f=this.opts,{repeatJobKey:g}=f,h=(0,mG.__rest)(f,["repeatJobKey"]);this.opts=Object.assign({attempts:0},h),this.delay=this.opts.delay,this.priority=this.opts.priority||0,this.repeatJobKey=g,this.timestamp=d.timestamp?d.timestamp:Date.now(),this.opts.backoff=mf.normalize(d.backoff),this.parentKey=mt(d.parent),d.parent&&(this.parent={id:d.parent.id,queueKey:d.parent.queue},d.failParentOnFailure&&(this.parent.fpof=!0),d.removeDependencyOnFailure&&(this.parent.rdof=!0),d.ignoreDependencyOnFailure&&(this.parent.idof=!0),d.continueParentOnFailure&&(this.parent.cpof=!0)),this.debounceId=d.debounce?d.debounce.id:void 0,this.deduplicationId=d.deduplication?d.deduplication.id:this.debounceId,this.toKey=a.toKey.bind(a),this.createScripts(),this.queueQualifiedName=a.qualifiedName}static async create(a,b,c,d){let e=await a.client,f=new this(a,b,c,d,d&&d.jobId);return f.id=await f.addJob(e,{parentKey:f.parentKey,parentDependenciesKey:f.parentKey?`${f.parentKey}:dependencies`:""}),f}static async createBulk(a,b){let c=await a.client,d=b.map(b=>{var c;return new this(a,b.name,b.data,b.opts,null==(c=b.opts)?void 0:c.jobId)}),e=c.pipeline();for(let a of d)a.addJob(e,{parentKey:a.parentKey,parentDependenciesKey:a.parentKey?`${a.parentKey}:dependencies`:""});let f=await e.exec();for(let a=0;a<f.length;++a){let[b,c]=f[a];if(b)throw b;d[a].id=c}return d}static fromJSON(a,b,c){let d=JSON.parse(b.data||"{}"),e=n_.optsFromJSON(b.opts),f=new this(a,b.name,d,e,b.id||c);return f.progress=JSON.parse(b.progress||"0"),f.delay=parseInt(b.delay),f.priority=parseInt(b.priority),f.timestamp=parseInt(b.timestamp),b.finishedOn&&(f.finishedOn=parseInt(b.finishedOn)),b.processedOn&&(f.processedOn=parseInt(b.processedOn)),b.rjk&&(f.repeatJobKey=b.rjk),b.deid&&(f.debounceId=b.deid,f.deduplicationId=b.deid),b.failedReason&&(f.failedReason=b.failedReason),f.attemptsStarted=parseInt(b.ats||"0"),f.attemptsMade=parseInt(b.attemptsMade||b.atm||"0"),f.stalledCounter=parseInt(b.stc||"0"),b.defa&&(f.deferredFailure=b.defa),f.stacktrace=function(a){if(!a)return[];let b=mm(JSON.parse,JSON,[a]);return b!==ml&&b instanceof Array?b:[]}(b.stacktrace),"string"==typeof b.returnvalue&&(f.returnvalue=n0(b.returnvalue)),b.parentKey&&(f.parentKey=b.parentKey),b.parent&&(f.parent=JSON.parse(b.parent)),b.pb&&(f.processedBy=b.pb),b.nrjid&&(f.nextRepeatableJobId=b.nrjid),f}createScripts(){this.scripts=nZ(this.queue)}static optsFromJSON(a,b=mq){let c=Object.entries(JSON.parse(a||"{}")),d={};for(let a of c){let[c,e]=a;b[c]?d[b[c]]=e:"tm"===c?d.telemetry=Object.assign(Object.assign({},d.telemetry),{metadata:e}):"omc"===c?d.telemetry=Object.assign(Object.assign({},d.telemetry),{omitContext:e}):d[c]=e}return d}static async fromId(a,b){if(b){let c=await a.client,d=await c.hgetall(a.toKey(b));return!function(a){for(let b in a)if(Object.prototype.hasOwnProperty.call(a,b))return!1;return!0}(d)?this.fromJSON(a,d,b):void 0}}static addJobLog(a,b,c,d){return a.scripts.addLog(b,c,d)}toJSON(){let{queue:a,scripts:b}=this;return(0,mG.__rest)(this,["queue","scripts"])}asJSON(){var a={id:this.id,name:this.name,data:JSON.stringify(void 0===this.data?{}:this.data),opts:n_.optsAsJSON(this.opts),parent:this.parent?Object.assign({},this.parent):void 0,parentKey:this.parentKey,progress:this.progress,attemptsMade:this.attemptsMade,attemptsStarted:this.attemptsStarted,stalledCounter:this.stalledCounter,finishedOn:this.finishedOn,processedOn:this.processedOn,timestamp:this.timestamp,failedReason:JSON.stringify(this.failedReason),stacktrace:JSON.stringify(this.stacktrace),debounceId:this.debounceId,deduplicationId:this.deduplicationId,repeatJobKey:this.repeatJobKey,returnvalue:JSON.stringify(this.returnvalue),nrjid:this.nextRepeatableJobId};let b={};for(let c in a)void 0!==a[c]&&(b[c]=a[c]);return b}static optsAsJSON(a={},b=mr){let c=Object.entries(a),d={};for(let[a,e]of c)void 0!==e&&(a in b?d[b[a]]=e:"telemetry"===a?(void 0!==e.metadata&&(d.tm=e.metadata),void 0!==e.omitContext&&(d.omc=e.omitContext)):d[a]=e);return d}asJSONSandbox(){return Object.assign(Object.assign({},this.asJSON()),{queueName:this.queueName,queueQualifiedName:this.queueQualifiedName,prefix:this.prefix})}updateData(a){return this.data=a,this.scripts.updateData(this,a)}async updateProgress(a){this.progress=a,await this.scripts.updateProgress(this.id,a),this.queue.emit("progress",this,a)}async log(a){return n_.addJobLog(this.queue,this.id,a,this.opts.keepLogs)}async removeChildDependency(){return!!await this.scripts.removeChildDependency(this.id,this.parentKey)&&(this.parent=void 0,this.parentKey=void 0,!0)}async clearLogs(a){let b=await this.queue.client,c=this.toKey(this.id)+":logs";a?await b.ltrim(c,-a,-1):await b.del(c)}async remove({removeChildren:a=!0}={}){await this.queue.waitUntilReady();let b=this.queue;if(await this.scripts.remove(this.id,a))b.emit("removed",this);else throw Error(`Job ${this.id} could not be removed because it is locked by another worker`)}async removeUnprocessedChildren(){let a=this.id;await this.scripts.removeUnprocessedChildren(a)}extendLock(a,b){return this.scripts.extendLock(this.id,a,b)}async moveToCompleted(a,b,c=!0){return this.queue.trace(Q.INTERNAL,"complete",this.queue.name,async(d,e)=>{var f,g;null==(g=null==(f=this.opts)?void 0:f.telemetry)||g.omitContext,await this.queue.waitUntilReady(),this.returnvalue=a||void 0;let h=mm(JSON.stringify,JSON,[a]);if(h===ml)throw ml.value;let i=this.scripts.moveToCompletedArgs(this,h,this.opts.removeOnComplete,b,c),j=await this.scripts.moveToFinished(this.id,i);return this.finishedOn=i[this.scripts.moveToFinishedKeys.length+1],this.attemptsMade+=1,j})}moveToWait(a){return this.scripts.moveJobFromActiveToWait(this.id,a)}async shouldRetryJob(a){if(!(this.attemptsMade+1<this.opts.attempts)||this.discarded||a instanceof mz||"UnrecoverableError"==a.name)return[!1,0];{let b=this.queue.opts,c=await mf.calculate(this.opts.backoff,this.attemptsMade+1,a,this,b.settings&&b.settings.backoffStrategy);return[-1!=c,-1==c?0:c]}}async moveToFailed(a,b,c=!1){this.failedReason=null==a?void 0:a.message;let[d,e]=await this.shouldRetryJob(a);return this.queue.trace(Q.INTERNAL,this.getSpanOperation(d,e),this.queue.name,async(f,g)=>{var h,i;let j,k,l;(null==(i=null==(h=this.opts)?void 0:h.telemetry)?void 0:i.omitContext)||!g||(j=g),this.updateStacktrace(a);let m={failedReason:this.failedReason,stacktrace:JSON.stringify(this.stacktrace),tm:j};if(d)k=e?await this.scripts.moveToDelayed(this.id,Date.now(),e,b,{fieldsToUpdate:m}):await this.scripts.retryJob(this.id,this.opts.lifo,b,{fieldsToUpdate:m});else{let a=this.scripts.moveToFailedArgs(this,this.failedReason,this.opts.removeOnFail,b,c,m);k=await this.scripts.moveToFinished(this.id,a),l=a[this.scripts.moveToFinishedKeys.length+1]}return l&&"number"==typeof l&&(this.finishedOn=l),e&&"number"==typeof e&&(this.delay=e),this.attemptsMade+=1,k})}getSpanOperation(a,b){return a?b?"delay":"retry":"fail"}isCompleted(){return this.isInZSet("completed")}isFailed(){return this.isInZSet("failed")}isDelayed(){return this.isInZSet("delayed")}isWaitingChildren(){return this.isInZSet("waiting-children")}isActive(){return this.isInList("active")}async isWaiting(){return await this.isInList("wait")||await this.isInList("paused")}get queueName(){return this.queue.name}get prefix(){return this.queue.opts.prefix}getState(){return this.scripts.getState(this.id)}async changeDelay(a){await this.scripts.changeDelay(this.id,a),this.delay=a}async changePriority(a){await this.scripts.changePriority(this.id,a.priority,a.lifo),this.priority=a.priority||0}async getChildrenValues(){let a=await this.queue.client,b=await a.hgetall(this.toKey(`${this.id}:processed`));if(b)return mx(b)}async getIgnoredChildrenFailures(){return(await this.queue.client).hgetall(this.toKey(`${this.id}:failed`))}async getFailedChildrenValues(){return(await this.queue.client).hgetall(this.toKey(`${this.id}:failed`))}async getDependencies(a={}){let b=(await this.queue.client).multi();if(a.processed||a.unprocessed||a.ignored||a.failed){let c,d,e,f,g,h,i,j,k={cursor:0,count:20},l=[];if(a.processed){l.push("processed");let c=Object.assign(Object.assign({},k),a.processed);b.hscan(this.toKey(`${this.id}:processed`),c.cursor,"COUNT",c.count)}if(a.unprocessed){l.push("unprocessed");let c=Object.assign(Object.assign({},k),a.unprocessed);b.sscan(this.toKey(`${this.id}:dependencies`),c.cursor,"COUNT",c.count)}if(a.ignored){l.push("ignored");let c=Object.assign(Object.assign({},k),a.ignored);b.hscan(this.toKey(`${this.id}:failed`),c.cursor,"COUNT",c.count)}if(a.failed){l.push("failed");let d=Object.assign(Object.assign({},k),a.failed);c=d.cursor+d.count,b.zrange(this.toKey(`${this.id}:unsuccessful`),d.cursor,d.count-1)}let m=await b.exec();return l.forEach((a,b)=>{switch(a){case"processed":{d=m[b][1][0];let a=m[b][1][1],c={};for(let b=0;b<a.length;++b)b%2&&(c[a[b-1]]=JSON.parse(a[b]));e=c;break}case"failed":h=m[b][1];break;case"ignored":{i=m[b][1][0];let a=m[b][1][1],c={};for(let b=0;b<a.length;++b)b%2&&(c[a[b-1]]=a[b]);j=c;break}case"unprocessed":f=m[b][1][0],g=m[b][1][1]}}),Object.assign(Object.assign(Object.assign(Object.assign({},d?{processed:e,nextProcessedCursor:Number(d)}:{}),i?{ignored:j,nextIgnoredCursor:Number(i)}:{}),c?{failed:h,nextFailedCursor:c}:{}),f?{unprocessed:g,nextUnprocessedCursor:Number(f)}:{})}{b.hgetall(this.toKey(`${this.id}:processed`)),b.smembers(this.toKey(`${this.id}:dependencies`)),b.hgetall(this.toKey(`${this.id}:failed`)),b.zrange(this.toKey(`${this.id}:unsuccessful`),0,-1);let[[a,c],[d,e],[f,g],[h,i]]=await b.exec();return{processed:mx(c),unprocessed:e,failed:i,ignored:g}}}async getDependenciesCount(a={}){let b=[];Object.entries(a).forEach(([a,c])=>{c&&b.push(a)});let c=b.length?b:["processed","unprocessed","ignored","failed"],d=await this.scripts.getDependencyCounts(this.id,c),e={};return d.forEach((a,b)=>{e[`${c[b]}`]=a||0}),e}async waitUntilFinished(a,b){await this.queue.waitUntilReady();let c=this.id;return new Promise(async(d,e)=>{let f;function g(a){k(),d(a.returnvalue)}function h(a){k(),e(Error(a.failedReason||a))}b&&(f=setTimeout(()=>h(`Job wait ${this.name} timed out before finishing, no finish notification arrived after ${b}ms (id=${c})`),b));let i=`completed:${c}`,j=`failed:${c}`;a.on(i,g),a.on(j,h),this.queue.on("closing",h);let k=()=>{clearInterval(f),a.removeListener(i,g),a.removeListener(j,h),this.queue.removeListener("closing",h)};await a.waitUntilReady();let[l,m]=await this.scripts.isFinished(c,!0);0!=l&&(-1==l||2==l?h({failedReason:m}):g({returnvalue:n0(m)}))})}async moveToDelayed(a,b){let c=Date.now(),d=a-c,e=d>0?d:0,f=await this.scripts.moveToDelayed(this.id,c,e,b,{skipAttempt:!0});return this.delay=e,f}async moveToWaitingChildren(a,b={}){return await this.scripts.moveToWaitingChildren(this.id,a,b)}async promote(){let a=this.id;await this.scripts.promote(a),this.delay=0}async retry(a="failed",b={}){await this.scripts.reprocessJob(this,a,b),this.failedReason=null,this.finishedOn=null,this.processedOn=null,this.returnvalue=null,b.resetAttemptsMade&&(this.attemptsMade=0),b.resetAttemptsStarted&&(this.attemptsStarted=0)}discard(){this.discarded=!0}async isInZSet(a){let b=await this.queue.client;return null!==await b.zscore(this.queue.toKey(a),this.id)}async isInList(a){return this.scripts.isJobInList(this.queue.toKey(a),this.id)}addJob(a,b){let c=this.asJSON();return this.validateOptions(c),this.scripts.addJob(a,c,c.opts,this.id,b)}async removeDeduplicationKey(){return!!this.deduplicationId&&await this.scripts.removeDeduplicationKey(this.deduplicationId,this.id)>0}validateOptions(a){var b,c,d,e,f,g,h,i,j;if(this.opts.sizeLimit&&(j=a.data,Buffer.byteLength(j,"utf8")>this.opts.sizeLimit))throw Error(`The size of job ${this.name} exceeds the limit ${this.opts.sizeLimit} bytes`);if(this.opts.delay&&this.opts.repeat&&!(null==(b=this.opts.repeat)?void 0:b.count))throw Error("Delay and repeat options could not be used together");let k=["removeDependencyOnFailure","failParentOnFailure","continueParentOnFailure","ignoreDependencyOnFailure"].filter(a=>this.opts[a]);if(k.length>1){let a=k.join(", ");throw Error(`The following options cannot be used together: ${a}`)}if(null==(c=this.opts)?void 0:c.jobId){if(`${parseInt(this.opts.jobId,10)}`===(null==(d=this.opts)?void 0:d.jobId))throw Error("Custom Id cannot be integers");if((null==(e=this.opts)?void 0:e.jobId.includes(":"))&&(null==(g=null==(f=this.opts)?void 0:f.jobId)?void 0:g.split(":").length)!==3)throw Error("Custom Id cannot contain :")}if(this.opts.priority){if(Math.trunc(this.opts.priority)!==this.opts.priority)throw Error("Priority should not be float");if(this.opts.priority>2097152)throw Error("Priority should be between 0 and 2097152")}if(this.opts.deduplication&&!(null==(h=this.opts.deduplication)?void 0:h.id))throw Error("Deduplication id must be provided");if(this.opts.debounce&&!(null==(i=this.opts.debounce)?void 0:i.id))throw Error("Debounce id must be provided");if("object"==typeof this.opts.backoff&&"number"==typeof this.opts.backoff.jitter&&(this.opts.backoff.jitter<0||this.opts.backoff.jitter>1))throw Error("Jitter should be between 0 and 1")}updateStacktrace(a){this.stacktrace=this.stacktrace||[],(null==a?void 0:a.stack)&&(this.stacktrace.push(a.stack),0===this.opts.stackTraceLimit?this.stacktrace=[]:this.opts.stackTraceLimit&&(this.stacktrace=this.stacktrace.slice(-this.opts.stackTraceLimit)))}}function n0(a){let b=mm(JSON.parse,JSON,[a]);if(b!==ml)return b;n$("corrupted returnvalue: "+a,b)}class n1{constructor(a="bull"){this.prefix=a}getKeys(a){let b={};return["","active","wait","waiting-children","paused","id","delayed","prioritized","stalled-check","completed","failed","stalled","repeat","limiter","meta","events","pc","marker","de"].forEach(c=>{b[c]=this.toKey(a,c)}),b}toKey(a,b){return`${this.getQueueQualifiedName(a)}:${b}`}getQueueQualifiedName(a){return`${this.prefix}:${a}`}}var n2=mg;let n3={name:"addDelayedJob",content:`--[[
  Adds a delayed job to the queue by doing the following:
    - Increases the job counter if needed.
    - Creates a new job key with the job data.
    - computes timestamp.
    - adds to delayed zset.
    - Emits a global event 'delayed' if the job is delayed.
    Input:
      KEYS[1] 'marker',
      KEYS[2] 'meta'
      KEYS[3] 'id'
      KEYS[4] 'delayed'
      KEYS[5] 'completed'
      KEYS[6] events stream key
      ARGV[1] msgpacked arguments array
            [1]  key prefix,
            [2]  custom id (use custom instead of one generated automatically)
            [3]  name
            [4]  timestamp
            [5]  parentKey?
            [6]  parent dependencies key.
            [7]  parent? {id, queueKey}
            [8]  repeat job key
            [9] deduplication key
      ARGV[2] Json stringified job data
      ARGV[3] msgpacked options
      Output:
        jobId  - OK
        -5     - Missing parent key
]]
local metaKey = KEYS[2]
local idKey = KEYS[3]
local delayedKey = KEYS[4]
local completedKey = KEYS[5]
local eventsKey = KEYS[6]
local jobId
local jobIdKey
local rcall = redis.call
local args = cmsgpack.unpack(ARGV[1])
local data = ARGV[2]
local parentKey = args[5]
local parent = args[7]
local repeatJobKey = args[8]
local deduplicationKey = args[9]
local parentData
-- Includes
--[[
  Adds a delayed job to the queue by doing the following:
    - Creates a new job key with the job data.
    - adds to delayed zset.
    - Emits a global event 'delayed' if the job is delayed.
]]
-- Includes
--[[
  Add delay marker if needed.
]]
-- Includes
--[[
  Function to return the next delayed job timestamp.
]]
local function getNextDelayedTimestamp(delayedKey)
  local result = rcall("ZRANGE", delayedKey, 0, 0, "WITHSCORES")
  if #result then
    local nextTimestamp = tonumber(result[2])
    if nextTimestamp ~= nil then
      return nextTimestamp / 0x1000
    end
  end
end
local function addDelayMarkerIfNeeded(markerKey, delayedKey)
  local nextTimestamp = getNextDelayedTimestamp(delayedKey)
  if nextTimestamp ~= nil then
    -- Replace the score of the marker with the newest known
    -- next timestamp.
    rcall("ZADD", markerKey, nextTimestamp, "1")
  end
end
--[[
  Bake in the job id first 12 bits into the timestamp
  to guarantee correct execution order of delayed jobs
  (up to 4096 jobs per given timestamp or 4096 jobs apart per timestamp)
  WARNING: Jobs that are so far apart that they wrap around will cause FIFO to fail
]]
local function getDelayedScore(delayedKey, timestamp, delay)
  local delayedTimestamp = (delay > 0 and (tonumber(timestamp) + delay)) or tonumber(timestamp)
  local minScore = delayedTimestamp * 0x1000
  local maxScore = (delayedTimestamp + 1 ) * 0x1000 - 1
  local result = rcall("ZREVRANGEBYSCORE", delayedKey, maxScore,
    minScore, "WITHSCORES","LIMIT", 0, 1)
  if #result then
    local currentMaxScore = tonumber(result[2])
    if currentMaxScore ~= nil then
      if currentMaxScore >= maxScore then
        return maxScore, delayedTimestamp
      else
        return currentMaxScore + 1, delayedTimestamp
      end
    end
  end
  return minScore, delayedTimestamp
end
local function addDelayedJob(jobId, delayedKey, eventsKey, timestamp,
  maxEvents, markerKey, delay)
  local score, delayedTimestamp = getDelayedScore(delayedKey, timestamp, tonumber(delay))
  rcall("ZADD", delayedKey, score, jobId)
  rcall("XADD", eventsKey, "MAXLEN", "~", maxEvents, "*", "event", "delayed",
    "jobId", jobId, "delay", delayedTimestamp)
  -- mark that a delayed job is available
  addDelayMarkerIfNeeded(markerKey, delayedKey)
end
--[[
  Function to debounce a job.
]]
-- Includes
--[[
  Function to remove job keys.
]]
local function removeJobKeys(jobKey)
  return rcall("DEL", jobKey, jobKey .. ':logs', jobKey .. ':dependencies',
    jobKey .. ':processed', jobKey .. ':failed', jobKey .. ':unsuccessful')
end
local function removeDelayedJob(delayedKey, deduplicationKey, eventsKey, maxEvents, currentDeduplicatedJobId,
    jobId, deduplicationId, prefix)
    if rcall("ZREM", delayedKey, currentDeduplicatedJobId) > 0 then
        removeJobKeys(prefix .. currentDeduplicatedJobId)
        rcall("XADD", eventsKey, "*", "event", "removed", "jobId", currentDeduplicatedJobId,
            "prev", "delayed")
        -- TODO remove debounced event in next breaking change
        rcall("XADD", eventsKey, "MAXLEN", "~", maxEvents, "*", "event", "debounced", "jobId",
            jobId, "debounceId", deduplicationId)
        rcall("XADD", eventsKey, "MAXLEN", "~", maxEvents, "*", "event", "deduplicated", "jobId",
            jobId, "deduplicationId", deduplicationId, "deduplicatedJobId", currentDeduplicatedJobId)
        return true
    end
    return false
end
local function deduplicateJob(deduplicationOpts, jobId, delayedKey, deduplicationKey, eventsKey, maxEvents,
    prefix)
    local deduplicationId = deduplicationOpts and deduplicationOpts['id']
    if deduplicationId then
        local ttl = deduplicationOpts['ttl']
        if deduplicationOpts['replace'] then
            if ttl and ttl > 0 then
                local currentDebounceJobId = rcall('GET', deduplicationKey)
                if currentDebounceJobId then
                    local isRemoved = removeDelayedJob(delayedKey, deduplicationKey, eventsKey, maxEvents,
                        currentDebounceJobId, jobId, deduplicationId, prefix)
                    if isRemoved then
                        if deduplicationOpts['extend'] then
                            rcall('SET', deduplicationKey, jobId, 'PX', ttl)
                        else
                            rcall('SET', deduplicationKey, jobId, 'KEEPTTL')
                        end
                        return
                    else
                        return currentDebounceJobId
                    end
                else
                    rcall('SET', deduplicationKey, jobId, 'PX', ttl)
                    return
                end
            else
                local currentDebounceJobId = rcall('GET', deduplicationKey)
                if currentDebounceJobId then
                    local isRemoved = removeDelayedJob(delayedKey, deduplicationKey, eventsKey, maxEvents,
                        currentDebounceJobId, jobId, deduplicationId, prefix)
                    if isRemoved then
                        rcall('SET', deduplicationKey, jobId)
                        return
                    else
                        return currentDebounceJobId
                    end
                else
                    rcall('SET', deduplicationKey, jobId)
                    return
                end
            end
        else
            local deduplicationKeyExists
            if ttl and ttl > 0 then
                if deduplicationOpts['extend'] then
                    local currentDebounceJobId = rcall('GET', deduplicationKey)
                    if currentDebounceJobId then
                        rcall('SET', deduplicationKey, currentDebounceJobId, 'PX', ttl)
                        rcall("XADD", eventsKey, "MAXLEN", "~", maxEvents, "*", "event", "debounced",
                            "jobId", currentDebounceJobId, "debounceId", deduplicationId)
                        rcall("XADD", eventsKey, "MAXLEN", "~", maxEvents, "*", "event", "deduplicated", "jobId",
                            currentDebounceJobId, "deduplicationId", deduplicationId, "deduplicatedJobId", jobId)
                        return currentDebounceJobId
                    else
                        rcall('SET', deduplicationKey, jobId, 'PX', ttl)
                        return
                    end
                else
                    deduplicationKeyExists = not rcall('SET', deduplicationKey, jobId, 'PX', ttl, 'NX')
                end
            else
                deduplicationKeyExists = not rcall('SET', deduplicationKey, jobId, 'NX')
            end
            if deduplicationKeyExists then
                local currentDebounceJobId = rcall('GET', deduplicationKey)
                -- TODO remove debounced event in next breaking change
                rcall("XADD", eventsKey, "MAXLEN", "~", maxEvents, "*", "event", "debounced", "jobId",
                    currentDebounceJobId, "debounceId", deduplicationId)
                rcall("XADD", eventsKey, "MAXLEN", "~", maxEvents, "*", "event", "deduplicated", "jobId",
                    currentDebounceJobId, "deduplicationId", deduplicationId, "deduplicatedJobId", jobId)
                return currentDebounceJobId
            end
        end
    end
end
--[[
  Function to get max events value or set by default 10000.
]]
local function getOrSetMaxEvents(metaKey)
  local maxEvents = rcall("HGET", metaKey, "opts.maxLenEvents")
  if not maxEvents then
    maxEvents = 10000
    rcall("HSET", metaKey, "opts.maxLenEvents", maxEvents)
  end
  return maxEvents
end
--[[
  Function to handle the case when job is duplicated.
]]
-- Includes
--[[
    This function is used to update the parent's dependencies if the job
    is already completed and about to be ignored. The parent must get its
    dependencies updated to avoid the parent job being stuck forever in 
    the waiting-children state.
]]
-- Includes
--[[
  Validate and move or add dependencies to parent.
]]
-- Includes
--[[
  Validate and move parent to a wait status (waiting, delayed or prioritized)
  if no pending dependencies.
]]
-- Includes
--[[
  Validate and move parent to a wait status (waiting, delayed or prioritized) if needed.
]]
-- Includes
--[[
  Move parent to a wait status (wait, prioritized or delayed)
]]
-- Includes
--[[
  Function to add job in target list and add marker if needed.
]]
-- Includes
--[[
  Add marker if needed when a job is available.
]]
local function addBaseMarkerIfNeeded(markerKey, isPausedOrMaxed)
  if not isPausedOrMaxed then
    rcall("ZADD", markerKey, 0, "0")
  end  
end
local function addJobInTargetList(targetKey, markerKey, pushCmd, isPausedOrMaxed, jobId)
  rcall(pushCmd, targetKey, jobId)
  addBaseMarkerIfNeeded(markerKey, isPausedOrMaxed)
end
--[[
  Function to add job considering priority.
]]
-- Includes
--[[
  Function to get priority score.
]]
local function getPriorityScore(priority, priorityCounterKey)
  local prioCounter = rcall("INCR", priorityCounterKey)
  return priority * 0x100000000 + prioCounter % 0x100000000
end
local function addJobWithPriority(markerKey, prioritizedKey, priority, jobId, priorityCounterKey,
  isPausedOrMaxed)
  local score = getPriorityScore(priority, priorityCounterKey)
  rcall("ZADD", prioritizedKey, score, jobId)
  addBaseMarkerIfNeeded(markerKey, isPausedOrMaxed)
end
--[[
  Function to check if queue is paused or maxed
  (since an empty list and !EXISTS are not really the same).
]]
local function isQueuePausedOrMaxed(queueMetaKey, activeKey)
  local queueAttributes = rcall("HMGET", queueMetaKey, "paused", "concurrency")
  if queueAttributes[1] then
    return true
  else
    if queueAttributes[2] then
      local activeCount = rcall("LLEN", activeKey)
      return activeCount >= tonumber(queueAttributes[2])
    end
  end
  return false
end
--[[
  Function to check for the meta.paused key to decide if we are paused or not
  (since an empty list and !EXISTS are not really the same).
]]
local function getTargetQueueList(queueMetaKey, activeKey, waitKey, pausedKey)
  local queueAttributes = rcall("HMGET", queueMetaKey, "paused", "concurrency", "max", "duration")
  if queueAttributes[1] then
    return pausedKey, true, queueAttributes[3], queueAttributes[4]
  else
    if queueAttributes[2] then
      local activeCount = rcall("LLEN", activeKey)
      if activeCount >= tonumber(queueAttributes[2]) then
        return waitKey, true, queueAttributes[3], queueAttributes[4]
      else
        return waitKey, false, queueAttributes[3], queueAttributes[4]
      end
    end
  end
  return waitKey, false, queueAttributes[3], queueAttributes[4]
end
local function moveParentToWait(parentQueueKey, parentKey, parentId, timestamp)
    local parentWaitKey = parentQueueKey .. ":wait"
    local parentPausedKey = parentQueueKey .. ":paused"
    local parentActiveKey = parentQueueKey .. ":active"
    local parentMetaKey = parentQueueKey .. ":meta"
    local parentMarkerKey = parentQueueKey .. ":marker"
    local jobAttributes = rcall("HMGET", parentKey, "priority", "delay")
    local priority = tonumber(jobAttributes[1]) or 0
    local delay = tonumber(jobAttributes[2]) or 0
    if delay > 0 then
        local delayedTimestamp = tonumber(timestamp) + delay
        local score = delayedTimestamp * 0x1000
        local parentDelayedKey = parentQueueKey .. ":delayed"
        rcall("ZADD", parentDelayedKey, score, parentId)
        rcall("XADD", parentQueueKey .. ":events", "*", "event", "delayed", "jobId", parentId, "delay",
            delayedTimestamp)
        addDelayMarkerIfNeeded(parentMarkerKey, parentDelayedKey)
    else
        if priority == 0 then
            local parentTarget, isParentPausedOrMaxed = getTargetQueueList(parentMetaKey, parentActiveKey,
                parentWaitKey, parentPausedKey)
            addJobInTargetList(parentTarget, parentMarkerKey, "RPUSH", isParentPausedOrMaxed, parentId)
        else
            local isPausedOrMaxed = isQueuePausedOrMaxed(parentMetaKey, parentActiveKey)
            addJobWithPriority(parentMarkerKey, parentQueueKey .. ":prioritized", priority, parentId,
                parentQueueKey .. ":pc", isPausedOrMaxed)
        end
        rcall("XADD", parentQueueKey .. ":events", "*", "event", "waiting", "jobId", parentId, "prev",
            "waiting-children")
    end
end
local function moveParentToWaitIfNeeded(parentQueueKey, parentKey, parentId, timestamp)
  if rcall("EXISTS", parentKey) == 1 then
    local parentWaitingChildrenKey = parentQueueKey .. ":waiting-children"
    if rcall("ZSCORE", parentWaitingChildrenKey, parentId) then    
      rcall("ZREM", parentWaitingChildrenKey, parentId)
      moveParentToWait(parentQueueKey, parentKey, parentId, timestamp)
    end
  end
end
local function moveParentToWaitIfNoPendingDependencies(parentQueueKey, parentDependenciesKey, parentKey,
  parentId, timestamp)
  local doNotHavePendingDependencies = rcall("SCARD", parentDependenciesKey) == 0
  if doNotHavePendingDependencies then
    moveParentToWaitIfNeeded(parentQueueKey, parentKey, parentId, timestamp)
  end
end
local function updateParentDepsIfNeeded(parentKey, parentQueueKey, parentDependenciesKey,
  parentId, jobIdKey, returnvalue, timestamp )
  local processedSet = parentKey .. ":processed"
  rcall("HSET", processedSet, jobIdKey, returnvalue)
  moveParentToWaitIfNoPendingDependencies(parentQueueKey, parentDependenciesKey, parentKey, parentId, timestamp)
end
local function updateExistingJobsParent(parentKey, parent, parentData,
                                        parentDependenciesKey, completedKey,
                                        jobIdKey, jobId, timestamp)
    if parentKey ~= nil then
        if rcall("ZSCORE", completedKey, jobId) then
            local returnvalue = rcall("HGET", jobIdKey, "returnvalue")
            updateParentDepsIfNeeded(parentKey, parent['queueKey'],
                                     parentDependenciesKey, parent['id'],
                                     jobIdKey, returnvalue, timestamp)
        else
            if parentDependenciesKey ~= nil then
                rcall("SADD", parentDependenciesKey, jobIdKey)
            end
        end
        rcall("HMSET", jobIdKey, "parentKey", parentKey, "parent", parentData)
    end
end
local function handleDuplicatedJob(jobKey, jobId, currentParentKey, currentParent,
  parentData, parentDependenciesKey, completedKey, eventsKey, maxEvents, timestamp)
  local existedParentKey = rcall("HGET", jobKey, "parentKey")
  if not existedParentKey or existedParentKey == currentParentKey then
    updateExistingJobsParent(currentParentKey, currentParent, parentData,
      parentDependenciesKey, completedKey, jobKey,
      jobId, timestamp)
  else
    if currentParentKey ~= nil and currentParentKey ~= existedParentKey
      and (rcall("EXISTS", existedParentKey) == 1) then
      return -7
    end
  end
  rcall("XADD", eventsKey, "MAXLEN", "~", maxEvents, "*", "event",
    "duplicated", "jobId", jobId)
  return jobId .. "" -- convert to string
end
--[[
  Function to store a job
]]
local function storeJob(eventsKey, jobIdKey, jobId, name, data, opts, timestamp,
                        parentKey, parentData, repeatJobKey)
    local jsonOpts = cjson.encode(opts)
    local delay = opts['delay'] or 0
    local priority = opts['priority'] or 0
    local debounceId = opts['de'] and opts['de']['id']
    local optionalValues = {}
    if parentKey ~= nil then
        table.insert(optionalValues, "parentKey")
        table.insert(optionalValues, parentKey)
        table.insert(optionalValues, "parent")
        table.insert(optionalValues, parentData)
    end
    if repeatJobKey then
        table.insert(optionalValues, "rjk")
        table.insert(optionalValues, repeatJobKey)
    end
    if debounceId then
        table.insert(optionalValues, "deid")
        table.insert(optionalValues, debounceId)
    end
    rcall("HMSET", jobIdKey, "name", name, "data", data, "opts", jsonOpts,
          "timestamp", timestamp, "delay", delay, "priority", priority,
          unpack(optionalValues))
    rcall("XADD", eventsKey, "*", "event", "added", "jobId", jobId, "name", name)
    return delay, priority
end
if parentKey ~= nil then
    if rcall("EXISTS", parentKey) ~= 1 then return -5 end
    parentData = cjson.encode(parent)
end
local jobCounter = rcall("INCR", idKey)
local maxEvents = getOrSetMaxEvents(metaKey)
local opts = cmsgpack.unpack(ARGV[3])
local parentDependenciesKey = args[6]
local timestamp = args[4]
if args[2] == "" then
    jobId = jobCounter
    jobIdKey = args[1] .. jobId
else
    jobId = args[2]
    jobIdKey = args[1] .. jobId
    if rcall("EXISTS", jobIdKey) == 1 then
        return handleDuplicatedJob(jobIdKey, jobId, parentKey, parent,
            parentData, parentDependenciesKey, completedKey, eventsKey,
            maxEvents, timestamp)
    end
end
local deduplicationJobId = deduplicateJob(opts['de'], jobId, delayedKey, deduplicationKey,
  eventsKey, maxEvents, args[1])
if deduplicationJobId then
  return deduplicationJobId
end
local delay, priority = storeJob(eventsKey, jobIdKey, jobId, args[3], ARGV[2],
    opts, timestamp, parentKey, parentData, repeatJobKey)
addDelayedJob(jobId, delayedKey, eventsKey, timestamp, maxEvents, KEYS[1], delay)
-- Check if this job is a child of another job, if so add it to the parents dependencies
if parentDependenciesKey ~= nil then
    rcall("SADD", parentDependenciesKey, jobIdKey)
end
return jobId .. "" -- convert to string
`,keys:6};a.s(["addDelayedJob",0,n3],299629);let n4={name:"addJobScheduler",content:`--[[
  Adds a job scheduler, i.e. a job factory that creates jobs based on a given schedule (repeat options).
    Input:
      KEYS[1]  'repeat' key
      KEYS[2]  'delayed' key
      KEYS[3]  'wait' key
      KEYS[4]  'paused' key
      KEYS[5]  'meta' key
      KEYS[6]  'prioritized' key
      KEYS[7]  'marker' key
      KEYS[8]  'id' key
      KEYS[9]  'events' key
      KEYS[10] 'pc' priority counter
      KEYS[11] 'active' key
      ARGV[1] next milliseconds
      ARGV[2] msgpacked options
            [1]  name
            [2]  tz?
            [3]  pattern?
            [4]  endDate?
            [5]  every?
      ARGV[3] jobs scheduler id
      ARGV[4] Json stringified template data
      ARGV[5] mspacked template opts
      ARGV[6] msgpacked delayed opts
      ARGV[7] timestamp
      ARGV[8] prefix key
      ARGV[9] producer key
      Output:
        repeatableKey  - OK
]] local rcall = redis.call
local repeatKey = KEYS[1]
local delayedKey = KEYS[2]
local waitKey = KEYS[3]
local pausedKey = KEYS[4]
local metaKey = KEYS[5]
local prioritizedKey = KEYS[6]
local eventsKey = KEYS[9]
local nextMillis = ARGV[1]
local jobSchedulerId = ARGV[3]
local templateOpts = cmsgpack.unpack(ARGV[5])
local now = tonumber(ARGV[7])
local prefixKey = ARGV[8]
local jobOpts = cmsgpack.unpack(ARGV[6])
-- Includes
--[[
  Add delay marker if needed.
]]
-- Includes
--[[
  Adds a delayed job to the queue by doing the following:
    - Creates a new job key with the job data.
    - adds to delayed zset.
    - Emits a global event 'delayed' if the job is delayed.
]]
-- Includes
--[[
  Add delay marker if needed.
]]
-- Includes
--[[
  Function to return the next delayed job timestamp.
]]
local function getNextDelayedTimestamp(delayedKey)
  local result = rcall("ZRANGE", delayedKey, 0, 0, "WITHSCORES")
  if #result then
    local nextTimestamp = tonumber(result[2])
    if nextTimestamp ~= nil then
      return nextTimestamp / 0x1000
    end
  end
end
local function addDelayMarkerIfNeeded(markerKey, delayedKey)
  local nextTimestamp = getNextDelayedTimestamp(delayedKey)
  if nextTimestamp ~= nil then
    -- Replace the score of the marker with the newest known
    -- next timestamp.
    rcall("ZADD", markerKey, nextTimestamp, "1")
  end
end
--[[
  Bake in the job id first 12 bits into the timestamp
  to guarantee correct execution order of delayed jobs
  (up to 4096 jobs per given timestamp or 4096 jobs apart per timestamp)
  WARNING: Jobs that are so far apart that they wrap around will cause FIFO to fail
]]
local function getDelayedScore(delayedKey, timestamp, delay)
  local delayedTimestamp = (delay > 0 and (tonumber(timestamp) + delay)) or tonumber(timestamp)
  local minScore = delayedTimestamp * 0x1000
  local maxScore = (delayedTimestamp + 1 ) * 0x1000 - 1
  local result = rcall("ZREVRANGEBYSCORE", delayedKey, maxScore,
    minScore, "WITHSCORES","LIMIT", 0, 1)
  if #result then
    local currentMaxScore = tonumber(result[2])
    if currentMaxScore ~= nil then
      if currentMaxScore >= maxScore then
        return maxScore, delayedTimestamp
      else
        return currentMaxScore + 1, delayedTimestamp
      end
    end
  end
  return minScore, delayedTimestamp
end
local function addDelayedJob(jobId, delayedKey, eventsKey, timestamp,
  maxEvents, markerKey, delay)
  local score, delayedTimestamp = getDelayedScore(delayedKey, timestamp, tonumber(delay))
  rcall("ZADD", delayedKey, score, jobId)
  rcall("XADD", eventsKey, "MAXLEN", "~", maxEvents, "*", "event", "delayed",
    "jobId", jobId, "delay", delayedTimestamp)
  -- mark that a delayed job is available
  addDelayMarkerIfNeeded(markerKey, delayedKey)
end
--[[
  Function to add job considering priority.
]]
-- Includes
--[[
  Add marker if needed when a job is available.
]]
local function addBaseMarkerIfNeeded(markerKey, isPausedOrMaxed)
  if not isPausedOrMaxed then
    rcall("ZADD", markerKey, 0, "0")
  end  
end
--[[
  Function to get priority score.
]]
local function getPriorityScore(priority, priorityCounterKey)
  local prioCounter = rcall("INCR", priorityCounterKey)
  return priority * 0x100000000 + prioCounter % 0x100000000
end
local function addJobWithPriority(markerKey, prioritizedKey, priority, jobId, priorityCounterKey,
  isPausedOrMaxed)
  local score = getPriorityScore(priority, priorityCounterKey)
  rcall("ZADD", prioritizedKey, score, jobId)
  addBaseMarkerIfNeeded(markerKey, isPausedOrMaxed)
end
--[[
  Function to check for the meta.paused key to decide if we are paused or not
  (since an empty list and !EXISTS are not really the same).
]]
local function isQueuePaused(queueMetaKey)
  return rcall("HEXISTS", queueMetaKey, "paused") == 1
end
--[[
  Function to store a job
]]
local function storeJob(eventsKey, jobIdKey, jobId, name, data, opts, timestamp,
                        parentKey, parentData, repeatJobKey)
    local jsonOpts = cjson.encode(opts)
    local delay = opts['delay'] or 0
    local priority = opts['priority'] or 0
    local debounceId = opts['de'] and opts['de']['id']
    local optionalValues = {}
    if parentKey ~= nil then
        table.insert(optionalValues, "parentKey")
        table.insert(optionalValues, parentKey)
        table.insert(optionalValues, "parent")
        table.insert(optionalValues, parentData)
    end
    if repeatJobKey then
        table.insert(optionalValues, "rjk")
        table.insert(optionalValues, repeatJobKey)
    end
    if debounceId then
        table.insert(optionalValues, "deid")
        table.insert(optionalValues, debounceId)
    end
    rcall("HMSET", jobIdKey, "name", name, "data", data, "opts", jsonOpts,
          "timestamp", timestamp, "delay", delay, "priority", priority,
          unpack(optionalValues))
    rcall("XADD", eventsKey, "*", "event", "added", "jobId", jobId, "name", name)
    return delay, priority
end
--[[
  Function to check for the meta.paused key to decide if we are paused or not
  (since an empty list and !EXISTS are not really the same).
]]
local function getTargetQueueList(queueMetaKey, activeKey, waitKey, pausedKey)
  local queueAttributes = rcall("HMGET", queueMetaKey, "paused", "concurrency", "max", "duration")
  if queueAttributes[1] then
    return pausedKey, true, queueAttributes[3], queueAttributes[4]
  else
    if queueAttributes[2] then
      local activeCount = rcall("LLEN", activeKey)
      if activeCount >= tonumber(queueAttributes[2]) then
        return waitKey, true, queueAttributes[3], queueAttributes[4]
      else
        return waitKey, false, queueAttributes[3], queueAttributes[4]
      end
    end
  end
  return waitKey, false, queueAttributes[3], queueAttributes[4]
end
--[[
  Function to add job in target list and add marker if needed.
]]
-- Includes
local function addJobInTargetList(targetKey, markerKey, pushCmd, isPausedOrMaxed, jobId)
  rcall(pushCmd, targetKey, jobId)
  addBaseMarkerIfNeeded(markerKey, isPausedOrMaxed)
end
local function addJobFromScheduler(jobKey, jobId, opts, waitKey, pausedKey, activeKey, metaKey, 
  prioritizedKey, priorityCounter, delayedKey, markerKey, eventsKey, name, maxEvents, timestamp,
  data, jobSchedulerId, repeatDelay)
  opts['delay'] = repeatDelay
  opts['jobId'] = jobId
  local delay, priority = storeJob(eventsKey, jobKey, jobId, name, data,
    opts, timestamp, nil, nil, jobSchedulerId)
  if delay ~= 0 then
    addDelayedJob(jobId, delayedKey, eventsKey, timestamp, maxEvents, markerKey, delay)
  else
    local target, isPausedOrMaxed = getTargetQueueList(metaKey, activeKey, waitKey, pausedKey)
    -- Standard or priority add
    if priority == 0 then
      local pushCmd = opts['lifo'] and 'RPUSH' or 'LPUSH'
      addJobInTargetList(target, markerKey, pushCmd, isPausedOrMaxed, jobId)
    else
      -- Priority add
      addJobWithPriority(markerKey, prioritizedKey, priority, jobId, priorityCounter, isPausedOrMaxed)
    end
    -- Emit waiting event
    rcall("XADD", eventsKey, "MAXLEN", "~", maxEvents,  "*", "event", "waiting", "jobId", jobId)
  end
end
--[[
  Function to get max events value or set by default 10000.
]]
local function getOrSetMaxEvents(metaKey)
  local maxEvents = rcall("HGET", metaKey, "opts.maxLenEvents")
  if not maxEvents then
    maxEvents = 10000
    rcall("HSET", metaKey, "opts.maxLenEvents", maxEvents)
  end
  return maxEvents
end
--[[
  Function to remove job.
]]
-- Includes
--[[
  Function to remove deduplication key if needed
  when a job is being removed.
]]
local function removeDeduplicationKeyIfNeededOnRemoval(prefixKey,
  jobId, deduplicationId)
  if deduplicationId then
    local deduplicationKey = prefixKey .. "de:" .. deduplicationId
    local currentJobId = rcall('GET', deduplicationKey)
    if currentJobId and currentJobId == jobId then
      return rcall("DEL", deduplicationKey)
    end
  end
end
--[[
  Function to remove job keys.
]]
local function removeJobKeys(jobKey)
  return rcall("DEL", jobKey, jobKey .. ':logs', jobKey .. ':dependencies',
    jobKey .. ':processed', jobKey .. ':failed', jobKey .. ':unsuccessful')
end
--[[
  Check if this job has a parent. If so we will just remove it from
  the parent child list, but if it is the last child we should move the parent to "wait/paused"
  which requires code from "moveToFinished"
]]
-- Includes
--[[
  Functions to destructure job key.
  Just a bit of warning, these functions may be a bit slow and affect performance significantly.
]]
local getJobIdFromKey = function (jobKey)
  return string.match(jobKey, ".*:(.*)")
end
local getJobKeyPrefix = function (jobKey, jobId)
  return string.sub(jobKey, 0, #jobKey - #jobId)
end
local function _moveParentToWait(parentPrefix, parentId, emitEvent)
  local parentTarget, isPausedOrMaxed = getTargetQueueList(parentPrefix .. "meta", parentPrefix .. "active",
    parentPrefix .. "wait", parentPrefix .. "paused")
  addJobInTargetList(parentTarget, parentPrefix .. "marker", "RPUSH", isPausedOrMaxed, parentId)
  if emitEvent then
    local parentEventStream = parentPrefix .. "events"
    rcall("XADD", parentEventStream, "*", "event", "waiting", "jobId", parentId, "prev", "waiting-children")
  end
end
local function removeParentDependencyKey(jobKey, hard, parentKey, baseKey, debounceId)
  if parentKey then
    local parentDependenciesKey = parentKey .. ":dependencies"
    local result = rcall("SREM", parentDependenciesKey, jobKey)
    if result > 0 then
      local pendingDependencies = rcall("SCARD", parentDependenciesKey)
      if pendingDependencies == 0 then
        local parentId = getJobIdFromKey(parentKey)
        local parentPrefix = getJobKeyPrefix(parentKey, parentId)
        local numRemovedElements = rcall("ZREM", parentPrefix .. "waiting-children", parentId)
        if numRemovedElements == 1 then
          if hard then -- remove parent in same queue
            if parentPrefix == baseKey then
              removeParentDependencyKey(parentKey, hard, nil, baseKey, nil)
              removeJobKeys(parentKey)
              if debounceId then
                rcall("DEL", parentPrefix .. "de:" .. debounceId)
              end
            else
              _moveParentToWait(parentPrefix, parentId)
            end
          else
            _moveParentToWait(parentPrefix, parentId, true)
          end
        end
      end
      return true
    end
  else
    local parentAttributes = rcall("HMGET", jobKey, "parentKey", "deid")
    local missedParentKey = parentAttributes[1]
    if( (type(missedParentKey) == "string") and missedParentKey ~= ""
      and (rcall("EXISTS", missedParentKey) == 1)) then
      local parentDependenciesKey = missedParentKey .. ":dependencies"
      local result = rcall("SREM", parentDependenciesKey, jobKey)
      if result > 0 then
        local pendingDependencies = rcall("SCARD", parentDependenciesKey)
        if pendingDependencies == 0 then
          local parentId = getJobIdFromKey(missedParentKey)
          local parentPrefix = getJobKeyPrefix(missedParentKey, parentId)
          local numRemovedElements = rcall("ZREM", parentPrefix .. "waiting-children", parentId)
          if numRemovedElements == 1 then
            if hard then
              if parentPrefix == baseKey then
                removeParentDependencyKey(missedParentKey, hard, nil, baseKey, nil)
                removeJobKeys(missedParentKey)
                if parentAttributes[2] then
                  rcall("DEL", parentPrefix .. "de:" .. parentAttributes[2])
                end
              else
                _moveParentToWait(parentPrefix, parentId)
              end
            else
              _moveParentToWait(parentPrefix, parentId, true)
            end
          end
        end
        return true
      end
    end
  end
  return false
end
local function removeJob(jobId, hard, baseKey, shouldRemoveDeduplicationKey)
  local jobKey = baseKey .. jobId
  removeParentDependencyKey(jobKey, hard, nil, baseKey)
  if shouldRemoveDeduplicationKey then
    local deduplicationId = rcall("HGET", jobKey, "deid")
    removeDeduplicationKeyIfNeededOnRemoval(baseKey, jobId, deduplicationId)
  end
  removeJobKeys(jobKey)
end
--[[
  Function to store a job scheduler
]]
local function storeJobScheduler(schedulerId, schedulerKey, repeatKey, nextMillis, opts,
  templateData, templateOpts)
  rcall("ZADD", repeatKey, nextMillis, schedulerId)
  local optionalValues = {}
  if opts['tz'] then
    table.insert(optionalValues, "tz")
    table.insert(optionalValues, opts['tz'])
  end
  if opts['limit'] then
    table.insert(optionalValues, "limit")
    table.insert(optionalValues, opts['limit'])
  end
  if opts['pattern'] then
    table.insert(optionalValues, "pattern")
    table.insert(optionalValues, opts['pattern'])
  end
  if opts['startDate'] then
    table.insert(optionalValues, "startDate")
    table.insert(optionalValues, opts['startDate'])
  end
  if opts['endDate'] then
    table.insert(optionalValues, "endDate")
    table.insert(optionalValues, opts['endDate'])
  end
  if opts['every'] then
    table.insert(optionalValues, "every")
    table.insert(optionalValues, opts['every'])
  end
  if opts['offset'] then
    table.insert(optionalValues, "offset")
    table.insert(optionalValues, opts['offset'])
  else
    local offset = rcall("HGET", schedulerKey, "offset")
    if offset then
      table.insert(optionalValues, "offset")
      table.insert(optionalValues, tonumber(offset))
    end
  end
  local jsonTemplateOpts = cjson.encode(templateOpts)
  if jsonTemplateOpts and jsonTemplateOpts ~= '{}' then
    table.insert(optionalValues, "opts")
    table.insert(optionalValues, jsonTemplateOpts)
  end
  if templateData and templateData ~= '{}' then
    table.insert(optionalValues, "data")
    table.insert(optionalValues, templateData)
  end
  table.insert(optionalValues, "ic")
  table.insert(optionalValues, rcall("HGET", schedulerKey, "ic") or 1)
  rcall("DEL", schedulerKey) -- remove all attributes and then re-insert new ones
  rcall("HMSET", schedulerKey, "name", opts['name'], unpack(optionalValues))
end
local function getJobSchedulerEveryNextMillis(prevMillis, every, now, offset, startDate)
    local nextMillis
    if not prevMillis then
        if startDate then
            -- Assuming startDate is passed as milliseconds from JavaScript
            nextMillis = tonumber(startDate)
            nextMillis = nextMillis > now and nextMillis or now
        else
            nextMillis = now
        end
    else
        nextMillis = prevMillis + every
        -- check if we may have missed some iterations
        if nextMillis < now then
            nextMillis = math.floor(now / every) * every + every + (offset or 0)
        end
    end
    if not offset or offset == 0 then
        local timeSlot = math.floor(nextMillis / every) * every;
        offset = nextMillis - timeSlot;
    end
    -- Return a tuple nextMillis, offset
    return math.floor(nextMillis), math.floor(offset)
end
-- If we are overriding a repeatable job we must delete the delayed job for
-- the next iteration.
local schedulerKey = repeatKey .. ":" .. jobSchedulerId
local maxEvents = getOrSetMaxEvents(metaKey)
local templateData = ARGV[4]
local prevMillis = rcall("ZSCORE", repeatKey, jobSchedulerId)
if prevMillis then
    prevMillis = tonumber(prevMillis)
end
local schedulerOpts = cmsgpack.unpack(ARGV[2])
local every = schedulerOpts['every']
-- For backwards compatibility we also check the offset from the job itself.
-- could be removed in future major versions.
local jobOffset = jobOpts['repeat'] and jobOpts['repeat']['offset'] or 0
local offset = schedulerOpts['offset'] or jobOffset or 0
local newOffset = offset
local updatedEvery = false
if every then
    -- if we changed the 'every' value we need to reset millis to nil
    local millis = prevMillis
    if prevMillis then
        local prevEvery = tonumber(rcall("HGET", schedulerKey, "every"))
        if prevEvery ~= every then
            millis = nil
            updatedEvery = true
        end
    end
    local startDate = schedulerOpts['startDate']
    nextMillis, newOffset = getJobSchedulerEveryNextMillis(millis, every, now, offset, startDate)
end
local function removeJobFromScheduler(prefixKey, delayedKey, prioritizedKey, waitKey, pausedKey, jobId, metaKey,
    eventsKey)
    if rcall("ZSCORE", delayedKey, jobId) then
        removeJob(jobId, true, prefixKey, true --[[remove debounce key]] )
        rcall("ZREM", delayedKey, jobId)
        return true
    elseif rcall("ZSCORE", prioritizedKey, jobId) then
        removeJob(jobId, true, prefixKey, true --[[remove debounce key]] )
        rcall("ZREM", prioritizedKey, jobId)
        return true
    else
        local pausedOrWaitKey = waitKey
        if isQueuePaused(metaKey) then
            pausedOrWaitKey = pausedKey
        end
        if rcall("LREM", pausedOrWaitKey, 1, jobId) > 0 then
            removeJob(jobId, true, prefixKey, true --[[remove debounce key]] )
            return true
        end
    end
    return false
end
local removedPrevJob = false
if prevMillis then
    local currentJobId = "repeat:" .. jobSchedulerId .. ":" .. prevMillis
    local currentJobKey = schedulerKey .. ":" .. prevMillis
    -- In theory it should always exist the currentJobKey if there is a prevMillis unless something has
    -- gone really wrong.
    if rcall("EXISTS", currentJobKey) == 1 then
        removedPrevJob = removeJobFromScheduler(prefixKey, delayedKey, prioritizedKey, waitKey, pausedKey, currentJobId,
            metaKey, eventsKey)
    end
end
if removedPrevJob then
    -- The jobs has been removed and we want to replace it, so lets use the same millis.
    if every and not updatedEvery then
        nextMillis = prevMillis
    end
else
    -- Special case where no job was removed, and we need to add the next iteration.
    schedulerOpts['offset'] = newOffset
end
-- Check for job ID collision with existing jobs (in any state)
local jobId = "repeat:" .. jobSchedulerId .. ":" .. nextMillis
local jobKey = prefixKey .. jobId
-- If there's already a job with this ID, in a state 
-- that is not updatable (active, completed, failed) we must 
-- handle the collision
local hasCollision = false
if rcall("EXISTS", jobKey) == 1 then
    if every then
        -- For 'every' case: try next time slot to avoid collision
        local nextSlotMillis = nextMillis + every
        local nextSlotJobId = "repeat:" .. jobSchedulerId .. ":" .. nextSlotMillis
        local nextSlotJobKey = prefixKey .. nextSlotJobId
        if rcall("EXISTS", nextSlotJobKey) == 0 then
            -- Next slot is free, use it
            nextMillis = nextSlotMillis
            jobId = nextSlotJobId
        else
            -- Next slot also has a job, return error code
            return -11 -- SchedulerJobSlotsBusy
        end
    else
        hasCollision = true
    end
end
local delay = nextMillis - now
-- Fast Clamp delay to minimum of 0
if delay < 0 then
    delay = 0
end
local nextJobKey = schedulerKey .. ":" .. nextMillis
if not hasCollision or removedPrevJob then
    -- jobId already calculated above during collision check
    storeJobScheduler(jobSchedulerId, schedulerKey, repeatKey, nextMillis, schedulerOpts, templateData, templateOpts)
    rcall("INCR", KEYS[8])
    addJobFromScheduler(nextJobKey, jobId, jobOpts, waitKey, pausedKey, KEYS[11], metaKey, prioritizedKey, KEYS[10],
        delayedKey, KEYS[7], eventsKey, schedulerOpts['name'], maxEvents, now, templateData, jobSchedulerId, delay)
elseif hasCollision then
    -- For 'pattern' case: return error code
    return -10 -- SchedulerJobIdCollision
end
if ARGV[9] ~= "" then
    rcall("HSET", ARGV[9], "nrjid", jobId)
end
return {jobId .. "", delay}
`,keys:11};a.s(["addJobScheduler",0,n4],279723);let n5={name:"addLog",content:`--[[
  Add job log
  Input:
    KEYS[1] job id key
    KEYS[2] job logs key
    ARGV[1] id
    ARGV[2] log
    ARGV[3] keepLogs
  Output:
    -1 - Missing job.
]]
local rcall = redis.call
if rcall("EXISTS", KEYS[1]) == 1 then -- // Make sure job exists
  local logCount = rcall("RPUSH", KEYS[2], ARGV[2])
  if ARGV[3] ~= '' then
    local keepLogs = tonumber(ARGV[3])
    rcall("LTRIM", KEYS[2], -keepLogs, -1)
    return math.min(keepLogs, logCount)
  end
  return logCount
else
  return -1
end
`,keys:2};a.s(["addLog",0,n5],279379);let n6={name:"addParentJob",content:`--[[
  Adds a parent job to the queue by doing the following:
    - Increases the job counter if needed.
    - Creates a new job key with the job data.
    - adds the job to the waiting-children zset
    Input:
      KEYS[1] 'meta'
      KEYS[2] 'id'
      KEYS[3] 'delayed'
      KEYS[4] 'waiting-children'
      KEYS[5] 'completed'
      KEYS[6] events stream key
      ARGV[1] msgpacked arguments array
            [1]  key prefix,
            [2]  custom id (will not generate one automatically)
            [3]  name
            [4]  timestamp
            [5]  parentKey?
            [6]  parent dependencies key.
            [7]  parent? {id, queueKey}
            [8]  repeat job key
            [9] deduplication key
      ARGV[2] Json stringified job data
      ARGV[3] msgpacked options
      Output:
        jobId  - OK
        -5     - Missing parent key
]]
local metaKey = KEYS[1]
local idKey = KEYS[2]
local completedKey = KEYS[5]
local eventsKey = KEYS[6]
local jobId
local jobIdKey
local rcall = redis.call
local args = cmsgpack.unpack(ARGV[1])
local data = ARGV[2]
local opts = cmsgpack.unpack(ARGV[3])
local parentKey = args[5]
local parent = args[7]
local repeatJobKey = args[8]
local deduplicationKey = args[9]
local parentData
-- Includes
--[[
  Function to get max events value or set by default 10000.
]]
local function getOrSetMaxEvents(metaKey)
  local maxEvents = rcall("HGET", metaKey, "opts.maxLenEvents")
  if not maxEvents then
    maxEvents = 10000
    rcall("HSET", metaKey, "opts.maxLenEvents", maxEvents)
  end
  return maxEvents
end
--[[
  Function to handle the case when job is duplicated.
]]
-- Includes
--[[
    This function is used to update the parent's dependencies if the job
    is already completed and about to be ignored. The parent must get its
    dependencies updated to avoid the parent job being stuck forever in 
    the waiting-children state.
]]
-- Includes
--[[
  Validate and move or add dependencies to parent.
]]
-- Includes
--[[
  Validate and move parent to a wait status (waiting, delayed or prioritized)
  if no pending dependencies.
]]
-- Includes
--[[
  Validate and move parent to a wait status (waiting, delayed or prioritized) if needed.
]]
-- Includes
--[[
  Move parent to a wait status (wait, prioritized or delayed)
]]
-- Includes
--[[
  Add delay marker if needed.
]]
-- Includes
--[[
  Function to return the next delayed job timestamp.
]]
local function getNextDelayedTimestamp(delayedKey)
  local result = rcall("ZRANGE", delayedKey, 0, 0, "WITHSCORES")
  if #result then
    local nextTimestamp = tonumber(result[2])
    if nextTimestamp ~= nil then
      return nextTimestamp / 0x1000
    end
  end
end
local function addDelayMarkerIfNeeded(markerKey, delayedKey)
  local nextTimestamp = getNextDelayedTimestamp(delayedKey)
  if nextTimestamp ~= nil then
    -- Replace the score of the marker with the newest known
    -- next timestamp.
    rcall("ZADD", markerKey, nextTimestamp, "1")
  end
end
--[[
  Function to add job in target list and add marker if needed.
]]
-- Includes
--[[
  Add marker if needed when a job is available.
]]
local function addBaseMarkerIfNeeded(markerKey, isPausedOrMaxed)
  if not isPausedOrMaxed then
    rcall("ZADD", markerKey, 0, "0")
  end  
end
local function addJobInTargetList(targetKey, markerKey, pushCmd, isPausedOrMaxed, jobId)
  rcall(pushCmd, targetKey, jobId)
  addBaseMarkerIfNeeded(markerKey, isPausedOrMaxed)
end
--[[
  Function to add job considering priority.
]]
-- Includes
--[[
  Function to get priority score.
]]
local function getPriorityScore(priority, priorityCounterKey)
  local prioCounter = rcall("INCR", priorityCounterKey)
  return priority * 0x100000000 + prioCounter % 0x100000000
end
local function addJobWithPriority(markerKey, prioritizedKey, priority, jobId, priorityCounterKey,
  isPausedOrMaxed)
  local score = getPriorityScore(priority, priorityCounterKey)
  rcall("ZADD", prioritizedKey, score, jobId)
  addBaseMarkerIfNeeded(markerKey, isPausedOrMaxed)
end
--[[
  Function to check if queue is paused or maxed
  (since an empty list and !EXISTS are not really the same).
]]
local function isQueuePausedOrMaxed(queueMetaKey, activeKey)
  local queueAttributes = rcall("HMGET", queueMetaKey, "paused", "concurrency")
  if queueAttributes[1] then
    return true
  else
    if queueAttributes[2] then
      local activeCount = rcall("LLEN", activeKey)
      return activeCount >= tonumber(queueAttributes[2])
    end
  end
  return false
end
--[[
  Function to check for the meta.paused key to decide if we are paused or not
  (since an empty list and !EXISTS are not really the same).
]]
local function getTargetQueueList(queueMetaKey, activeKey, waitKey, pausedKey)
  local queueAttributes = rcall("HMGET", queueMetaKey, "paused", "concurrency", "max", "duration")
  if queueAttributes[1] then
    return pausedKey, true, queueAttributes[3], queueAttributes[4]
  else
    if queueAttributes[2] then
      local activeCount = rcall("LLEN", activeKey)
      if activeCount >= tonumber(queueAttributes[2]) then
        return waitKey, true, queueAttributes[3], queueAttributes[4]
      else
        return waitKey, false, queueAttributes[3], queueAttributes[4]
      end
    end
  end
  return waitKey, false, queueAttributes[3], queueAttributes[4]
end
local function moveParentToWait(parentQueueKey, parentKey, parentId, timestamp)
    local parentWaitKey = parentQueueKey .. ":wait"
    local parentPausedKey = parentQueueKey .. ":paused"
    local parentActiveKey = parentQueueKey .. ":active"
    local parentMetaKey = parentQueueKey .. ":meta"
    local parentMarkerKey = parentQueueKey .. ":marker"
    local jobAttributes = rcall("HMGET", parentKey, "priority", "delay")
    local priority = tonumber(jobAttributes[1]) or 0
    local delay = tonumber(jobAttributes[2]) or 0
    if delay > 0 then
        local delayedTimestamp = tonumber(timestamp) + delay
        local score = delayedTimestamp * 0x1000
        local parentDelayedKey = parentQueueKey .. ":delayed"
        rcall("ZADD", parentDelayedKey, score, parentId)
        rcall("XADD", parentQueueKey .. ":events", "*", "event", "delayed", "jobId", parentId, "delay",
            delayedTimestamp)
        addDelayMarkerIfNeeded(parentMarkerKey, parentDelayedKey)
    else
        if priority == 0 then
            local parentTarget, isParentPausedOrMaxed = getTargetQueueList(parentMetaKey, parentActiveKey,
                parentWaitKey, parentPausedKey)
            addJobInTargetList(parentTarget, parentMarkerKey, "RPUSH", isParentPausedOrMaxed, parentId)
        else
            local isPausedOrMaxed = isQueuePausedOrMaxed(parentMetaKey, parentActiveKey)
            addJobWithPriority(parentMarkerKey, parentQueueKey .. ":prioritized", priority, parentId,
                parentQueueKey .. ":pc", isPausedOrMaxed)
        end
        rcall("XADD", parentQueueKey .. ":events", "*", "event", "waiting", "jobId", parentId, "prev",
            "waiting-children")
    end
end
local function moveParentToWaitIfNeeded(parentQueueKey, parentKey, parentId, timestamp)
  if rcall("EXISTS", parentKey) == 1 then
    local parentWaitingChildrenKey = parentQueueKey .. ":waiting-children"
    if rcall("ZSCORE", parentWaitingChildrenKey, parentId) then    
      rcall("ZREM", parentWaitingChildrenKey, parentId)
      moveParentToWait(parentQueueKey, parentKey, parentId, timestamp)
    end
  end
end
local function moveParentToWaitIfNoPendingDependencies(parentQueueKey, parentDependenciesKey, parentKey,
  parentId, timestamp)
  local doNotHavePendingDependencies = rcall("SCARD", parentDependenciesKey) == 0
  if doNotHavePendingDependencies then
    moveParentToWaitIfNeeded(parentQueueKey, parentKey, parentId, timestamp)
  end
end
local function updateParentDepsIfNeeded(parentKey, parentQueueKey, parentDependenciesKey,
  parentId, jobIdKey, returnvalue, timestamp )
  local processedSet = parentKey .. ":processed"
  rcall("HSET", processedSet, jobIdKey, returnvalue)
  moveParentToWaitIfNoPendingDependencies(parentQueueKey, parentDependenciesKey, parentKey, parentId, timestamp)
end
local function updateExistingJobsParent(parentKey, parent, parentData,
                                        parentDependenciesKey, completedKey,
                                        jobIdKey, jobId, timestamp)
    if parentKey ~= nil then
        if rcall("ZSCORE", completedKey, jobId) then
            local returnvalue = rcall("HGET", jobIdKey, "returnvalue")
            updateParentDepsIfNeeded(parentKey, parent['queueKey'],
                                     parentDependenciesKey, parent['id'],
                                     jobIdKey, returnvalue, timestamp)
        else
            if parentDependenciesKey ~= nil then
                rcall("SADD", parentDependenciesKey, jobIdKey)
            end
        end
        rcall("HMSET", jobIdKey, "parentKey", parentKey, "parent", parentData)
    end
end
local function handleDuplicatedJob(jobKey, jobId, currentParentKey, currentParent,
  parentData, parentDependenciesKey, completedKey, eventsKey, maxEvents, timestamp)
  local existedParentKey = rcall("HGET", jobKey, "parentKey")
  if not existedParentKey or existedParentKey == currentParentKey then
    updateExistingJobsParent(currentParentKey, currentParent, parentData,
      parentDependenciesKey, completedKey, jobKey,
      jobId, timestamp)
  else
    if currentParentKey ~= nil and currentParentKey ~= existedParentKey
      and (rcall("EXISTS", existedParentKey) == 1) then
      return -7
    end
  end
  rcall("XADD", eventsKey, "MAXLEN", "~", maxEvents, "*", "event",
    "duplicated", "jobId", jobId)
  return jobId .. "" -- convert to string
end
--[[
  Function to store a job
]]
local function storeJob(eventsKey, jobIdKey, jobId, name, data, opts, timestamp,
                        parentKey, parentData, repeatJobKey)
    local jsonOpts = cjson.encode(opts)
    local delay = opts['delay'] or 0
    local priority = opts['priority'] or 0
    local debounceId = opts['de'] and opts['de']['id']
    local optionalValues = {}
    if parentKey ~= nil then
        table.insert(optionalValues, "parentKey")
        table.insert(optionalValues, parentKey)
        table.insert(optionalValues, "parent")
        table.insert(optionalValues, parentData)
    end
    if repeatJobKey then
        table.insert(optionalValues, "rjk")
        table.insert(optionalValues, repeatJobKey)
    end
    if debounceId then
        table.insert(optionalValues, "deid")
        table.insert(optionalValues, debounceId)
    end
    rcall("HMSET", jobIdKey, "name", name, "data", data, "opts", jsonOpts,
          "timestamp", timestamp, "delay", delay, "priority", priority,
          unpack(optionalValues))
    rcall("XADD", eventsKey, "*", "event", "added", "jobId", jobId, "name", name)
    return delay, priority
end
if parentKey ~= nil then
    if rcall("EXISTS", parentKey) ~= 1 then return -5 end
    parentData = cjson.encode(parent)
end
local jobCounter = rcall("INCR", idKey)
local maxEvents = getOrSetMaxEvents(metaKey)
local parentDependenciesKey = args[6]
local timestamp = args[4]
if args[2] == "" then
    jobId = jobCounter
    jobIdKey = args[1] .. jobId
else
    jobId = args[2]
    jobIdKey = args[1] .. jobId
    if rcall("EXISTS", jobIdKey) == 1 then
        return handleDuplicatedJob(jobIdKey, jobId, parentKey, parent,
            parentData, parentDependenciesKey, completedKey, eventsKey,
            maxEvents, timestamp)
    end
end
-- Store the job.
storeJob(eventsKey, jobIdKey, jobId, args[3], ARGV[2], opts, timestamp,
         parentKey, parentData, repeatJobKey)
local waitChildrenKey = KEYS[4]
rcall("ZADD", waitChildrenKey, timestamp, jobId)
rcall("XADD", eventsKey, "MAXLEN", "~", maxEvents, "*", "event",
      "waiting-children", "jobId", jobId)
-- Check if this job is a child of another job, if so add it to the parents dependencies
if parentDependenciesKey ~= nil then
    rcall("SADD", parentDependenciesKey, jobIdKey)
end
return jobId .. "" -- convert to string
`,keys:6};a.s(["addParentJob",0,n6],716566);let n7={name:"addPrioritizedJob",content:`--[[
  Adds a priotitized job to the queue by doing the following:
    - Increases the job counter if needed.
    - Creates a new job key with the job data.
    - Adds the job to the "added" list so that workers gets notified.
    Input:
      KEYS[1] 'marker',
      KEYS[2] 'meta'
      KEYS[3] 'id'
      KEYS[4] 'prioritized'
      KEYS[5] 'delayed'
      KEYS[6] 'completed'
      KEYS[7] 'active'
      KEYS[8] events stream key
      KEYS[9] 'pc' priority counter
      ARGV[1] msgpacked arguments array
            [1]  key prefix,
            [2]  custom id (will not generate one automatically)
            [3]  name
            [4]  timestamp
            [5]  parentKey?
            [6]  parent dependencies key.
            [7]  parent? {id, queueKey}
            [8]  repeat job key
            [9] deduplication key
      ARGV[2] Json stringified job data
      ARGV[3] msgpacked options
      Output:
        jobId  - OK
        -5     - Missing parent key
]] 
local metaKey = KEYS[2]
local idKey = KEYS[3]
local priorityKey = KEYS[4]
local completedKey = KEYS[6]
local activeKey = KEYS[7]
local eventsKey = KEYS[8]
local priorityCounterKey = KEYS[9]
local jobId
local jobIdKey
local rcall = redis.call
local args = cmsgpack.unpack(ARGV[1])
local data = ARGV[2]
local opts = cmsgpack.unpack(ARGV[3])
local parentKey = args[5]
local parent = args[7]
local repeatJobKey = args[8]
local deduplicationKey = args[9]
local parentData
-- Includes
--[[
  Function to add job considering priority.
]]
-- Includes
--[[
  Add marker if needed when a job is available.
]]
local function addBaseMarkerIfNeeded(markerKey, isPausedOrMaxed)
  if not isPausedOrMaxed then
    rcall("ZADD", markerKey, 0, "0")
  end  
end
--[[
  Function to get priority score.
]]
local function getPriorityScore(priority, priorityCounterKey)
  local prioCounter = rcall("INCR", priorityCounterKey)
  return priority * 0x100000000 + prioCounter % 0x100000000
end
local function addJobWithPriority(markerKey, prioritizedKey, priority, jobId, priorityCounterKey,
  isPausedOrMaxed)
  local score = getPriorityScore(priority, priorityCounterKey)
  rcall("ZADD", prioritizedKey, score, jobId)
  addBaseMarkerIfNeeded(markerKey, isPausedOrMaxed)
end
--[[
  Function to debounce a job.
]]
-- Includes
--[[
  Function to remove job keys.
]]
local function removeJobKeys(jobKey)
  return rcall("DEL", jobKey, jobKey .. ':logs', jobKey .. ':dependencies',
    jobKey .. ':processed', jobKey .. ':failed', jobKey .. ':unsuccessful')
end
local function removeDelayedJob(delayedKey, deduplicationKey, eventsKey, maxEvents, currentDeduplicatedJobId,
    jobId, deduplicationId, prefix)
    if rcall("ZREM", delayedKey, currentDeduplicatedJobId) > 0 then
        removeJobKeys(prefix .. currentDeduplicatedJobId)
        rcall("XADD", eventsKey, "*", "event", "removed", "jobId", currentDeduplicatedJobId,
            "prev", "delayed")
        -- TODO remove debounced event in next breaking change
        rcall("XADD", eventsKey, "MAXLEN", "~", maxEvents, "*", "event", "debounced", "jobId",
            jobId, "debounceId", deduplicationId)
        rcall("XADD", eventsKey, "MAXLEN", "~", maxEvents, "*", "event", "deduplicated", "jobId",
            jobId, "deduplicationId", deduplicationId, "deduplicatedJobId", currentDeduplicatedJobId)
        return true
    end
    return false
end
local function deduplicateJob(deduplicationOpts, jobId, delayedKey, deduplicationKey, eventsKey, maxEvents,
    prefix)
    local deduplicationId = deduplicationOpts and deduplicationOpts['id']
    if deduplicationId then
        local ttl = deduplicationOpts['ttl']
        if deduplicationOpts['replace'] then
            if ttl and ttl > 0 then
                local currentDebounceJobId = rcall('GET', deduplicationKey)
                if currentDebounceJobId then
                    local isRemoved = removeDelayedJob(delayedKey, deduplicationKey, eventsKey, maxEvents,
                        currentDebounceJobId, jobId, deduplicationId, prefix)
                    if isRemoved then
                        if deduplicationOpts['extend'] then
                            rcall('SET', deduplicationKey, jobId, 'PX', ttl)
                        else
                            rcall('SET', deduplicationKey, jobId, 'KEEPTTL')
                        end
                        return
                    else
                        return currentDebounceJobId
                    end
                else
                    rcall('SET', deduplicationKey, jobId, 'PX', ttl)
                    return
                end
            else
                local currentDebounceJobId = rcall('GET', deduplicationKey)
                if currentDebounceJobId then
                    local isRemoved = removeDelayedJob(delayedKey, deduplicationKey, eventsKey, maxEvents,
                        currentDebounceJobId, jobId, deduplicationId, prefix)
                    if isRemoved then
                        rcall('SET', deduplicationKey, jobId)
                        return
                    else
                        return currentDebounceJobId
                    end
                else
                    rcall('SET', deduplicationKey, jobId)
                    return
                end
            end
        else
            local deduplicationKeyExists
            if ttl and ttl > 0 then
                if deduplicationOpts['extend'] then
                    local currentDebounceJobId = rcall('GET', deduplicationKey)
                    if currentDebounceJobId then
                        rcall('SET', deduplicationKey, currentDebounceJobId, 'PX', ttl)
                        rcall("XADD", eventsKey, "MAXLEN", "~", maxEvents, "*", "event", "debounced",
                            "jobId", currentDebounceJobId, "debounceId", deduplicationId)
                        rcall("XADD", eventsKey, "MAXLEN", "~", maxEvents, "*", "event", "deduplicated", "jobId",
                            currentDebounceJobId, "deduplicationId", deduplicationId, "deduplicatedJobId", jobId)
                        return currentDebounceJobId
                    else
                        rcall('SET', deduplicationKey, jobId, 'PX', ttl)
                        return
                    end
                else
                    deduplicationKeyExists = not rcall('SET', deduplicationKey, jobId, 'PX', ttl, 'NX')
                end
            else
                deduplicationKeyExists = not rcall('SET', deduplicationKey, jobId, 'NX')
            end
            if deduplicationKeyExists then
                local currentDebounceJobId = rcall('GET', deduplicationKey)
                -- TODO remove debounced event in next breaking change
                rcall("XADD", eventsKey, "MAXLEN", "~", maxEvents, "*", "event", "debounced", "jobId",
                    currentDebounceJobId, "debounceId", deduplicationId)
                rcall("XADD", eventsKey, "MAXLEN", "~", maxEvents, "*", "event", "deduplicated", "jobId",
                    currentDebounceJobId, "deduplicationId", deduplicationId, "deduplicatedJobId", jobId)
                return currentDebounceJobId
            end
        end
    end
end
--[[
  Function to store a job
]]
local function storeJob(eventsKey, jobIdKey, jobId, name, data, opts, timestamp,
                        parentKey, parentData, repeatJobKey)
    local jsonOpts = cjson.encode(opts)
    local delay = opts['delay'] or 0
    local priority = opts['priority'] or 0
    local debounceId = opts['de'] and opts['de']['id']
    local optionalValues = {}
    if parentKey ~= nil then
        table.insert(optionalValues, "parentKey")
        table.insert(optionalValues, parentKey)
        table.insert(optionalValues, "parent")
        table.insert(optionalValues, parentData)
    end
    if repeatJobKey then
        table.insert(optionalValues, "rjk")
        table.insert(optionalValues, repeatJobKey)
    end
    if debounceId then
        table.insert(optionalValues, "deid")
        table.insert(optionalValues, debounceId)
    end
    rcall("HMSET", jobIdKey, "name", name, "data", data, "opts", jsonOpts,
          "timestamp", timestamp, "delay", delay, "priority", priority,
          unpack(optionalValues))
    rcall("XADD", eventsKey, "*", "event", "added", "jobId", jobId, "name", name)
    return delay, priority
end
--[[
  Function to get max events value or set by default 10000.
]]
local function getOrSetMaxEvents(metaKey)
  local maxEvents = rcall("HGET", metaKey, "opts.maxLenEvents")
  if not maxEvents then
    maxEvents = 10000
    rcall("HSET", metaKey, "opts.maxLenEvents", maxEvents)
  end
  return maxEvents
end
--[[
  Function to handle the case when job is duplicated.
]]
-- Includes
--[[
    This function is used to update the parent's dependencies if the job
    is already completed and about to be ignored. The parent must get its
    dependencies updated to avoid the parent job being stuck forever in 
    the waiting-children state.
]]
-- Includes
--[[
  Validate and move or add dependencies to parent.
]]
-- Includes
--[[
  Validate and move parent to a wait status (waiting, delayed or prioritized)
  if no pending dependencies.
]]
-- Includes
--[[
  Validate and move parent to a wait status (waiting, delayed or prioritized) if needed.
]]
-- Includes
--[[
  Move parent to a wait status (wait, prioritized or delayed)
]]
-- Includes
--[[
  Add delay marker if needed.
]]
-- Includes
--[[
  Function to return the next delayed job timestamp.
]]
local function getNextDelayedTimestamp(delayedKey)
  local result = rcall("ZRANGE", delayedKey, 0, 0, "WITHSCORES")
  if #result then
    local nextTimestamp = tonumber(result[2])
    if nextTimestamp ~= nil then
      return nextTimestamp / 0x1000
    end
  end
end
local function addDelayMarkerIfNeeded(markerKey, delayedKey)
  local nextTimestamp = getNextDelayedTimestamp(delayedKey)
  if nextTimestamp ~= nil then
    -- Replace the score of the marker with the newest known
    -- next timestamp.
    rcall("ZADD", markerKey, nextTimestamp, "1")
  end
end
--[[
  Function to add job in target list and add marker if needed.
]]
-- Includes
local function addJobInTargetList(targetKey, markerKey, pushCmd, isPausedOrMaxed, jobId)
  rcall(pushCmd, targetKey, jobId)
  addBaseMarkerIfNeeded(markerKey, isPausedOrMaxed)
end
--[[
  Function to check if queue is paused or maxed
  (since an empty list and !EXISTS are not really the same).
]]
local function isQueuePausedOrMaxed(queueMetaKey, activeKey)
  local queueAttributes = rcall("HMGET", queueMetaKey, "paused", "concurrency")
  if queueAttributes[1] then
    return true
  else
    if queueAttributes[2] then
      local activeCount = rcall("LLEN", activeKey)
      return activeCount >= tonumber(queueAttributes[2])
    end
  end
  return false
end
--[[
  Function to check for the meta.paused key to decide if we are paused or not
  (since an empty list and !EXISTS are not really the same).
]]
local function getTargetQueueList(queueMetaKey, activeKey, waitKey, pausedKey)
  local queueAttributes = rcall("HMGET", queueMetaKey, "paused", "concurrency", "max", "duration")
  if queueAttributes[1] then
    return pausedKey, true, queueAttributes[3], queueAttributes[4]
  else
    if queueAttributes[2] then
      local activeCount = rcall("LLEN", activeKey)
      if activeCount >= tonumber(queueAttributes[2]) then
        return waitKey, true, queueAttributes[3], queueAttributes[4]
      else
        return waitKey, false, queueAttributes[3], queueAttributes[4]
      end
    end
  end
  return waitKey, false, queueAttributes[3], queueAttributes[4]
end
local function moveParentToWait(parentQueueKey, parentKey, parentId, timestamp)
    local parentWaitKey = parentQueueKey .. ":wait"
    local parentPausedKey = parentQueueKey .. ":paused"
    local parentActiveKey = parentQueueKey .. ":active"
    local parentMetaKey = parentQueueKey .. ":meta"
    local parentMarkerKey = parentQueueKey .. ":marker"
    local jobAttributes = rcall("HMGET", parentKey, "priority", "delay")
    local priority = tonumber(jobAttributes[1]) or 0
    local delay = tonumber(jobAttributes[2]) or 0
    if delay > 0 then
        local delayedTimestamp = tonumber(timestamp) + delay
        local score = delayedTimestamp * 0x1000
        local parentDelayedKey = parentQueueKey .. ":delayed"
        rcall("ZADD", parentDelayedKey, score, parentId)
        rcall("XADD", parentQueueKey .. ":events", "*", "event", "delayed", "jobId", parentId, "delay",
            delayedTimestamp)
        addDelayMarkerIfNeeded(parentMarkerKey, parentDelayedKey)
    else
        if priority == 0 then
            local parentTarget, isParentPausedOrMaxed = getTargetQueueList(parentMetaKey, parentActiveKey,
                parentWaitKey, parentPausedKey)
            addJobInTargetList(parentTarget, parentMarkerKey, "RPUSH", isParentPausedOrMaxed, parentId)
        else
            local isPausedOrMaxed = isQueuePausedOrMaxed(parentMetaKey, parentActiveKey)
            addJobWithPriority(parentMarkerKey, parentQueueKey .. ":prioritized", priority, parentId,
                parentQueueKey .. ":pc", isPausedOrMaxed)
        end
        rcall("XADD", parentQueueKey .. ":events", "*", "event", "waiting", "jobId", parentId, "prev",
            "waiting-children")
    end
end
local function moveParentToWaitIfNeeded(parentQueueKey, parentKey, parentId, timestamp)
  if rcall("EXISTS", parentKey) == 1 then
    local parentWaitingChildrenKey = parentQueueKey .. ":waiting-children"
    if rcall("ZSCORE", parentWaitingChildrenKey, parentId) then    
      rcall("ZREM", parentWaitingChildrenKey, parentId)
      moveParentToWait(parentQueueKey, parentKey, parentId, timestamp)
    end
  end
end
local function moveParentToWaitIfNoPendingDependencies(parentQueueKey, parentDependenciesKey, parentKey,
  parentId, timestamp)
  local doNotHavePendingDependencies = rcall("SCARD", parentDependenciesKey) == 0
  if doNotHavePendingDependencies then
    moveParentToWaitIfNeeded(parentQueueKey, parentKey, parentId, timestamp)
  end
end
local function updateParentDepsIfNeeded(parentKey, parentQueueKey, parentDependenciesKey,
  parentId, jobIdKey, returnvalue, timestamp )
  local processedSet = parentKey .. ":processed"
  rcall("HSET", processedSet, jobIdKey, returnvalue)
  moveParentToWaitIfNoPendingDependencies(parentQueueKey, parentDependenciesKey, parentKey, parentId, timestamp)
end
local function updateExistingJobsParent(parentKey, parent, parentData,
                                        parentDependenciesKey, completedKey,
                                        jobIdKey, jobId, timestamp)
    if parentKey ~= nil then
        if rcall("ZSCORE", completedKey, jobId) then
            local returnvalue = rcall("HGET", jobIdKey, "returnvalue")
            updateParentDepsIfNeeded(parentKey, parent['queueKey'],
                                     parentDependenciesKey, parent['id'],
                                     jobIdKey, returnvalue, timestamp)
        else
            if parentDependenciesKey ~= nil then
                rcall("SADD", parentDependenciesKey, jobIdKey)
            end
        end
        rcall("HMSET", jobIdKey, "parentKey", parentKey, "parent", parentData)
    end
end
local function handleDuplicatedJob(jobKey, jobId, currentParentKey, currentParent,
  parentData, parentDependenciesKey, completedKey, eventsKey, maxEvents, timestamp)
  local existedParentKey = rcall("HGET", jobKey, "parentKey")
  if not existedParentKey or existedParentKey == currentParentKey then
    updateExistingJobsParent(currentParentKey, currentParent, parentData,
      parentDependenciesKey, completedKey, jobKey,
      jobId, timestamp)
  else
    if currentParentKey ~= nil and currentParentKey ~= existedParentKey
      and (rcall("EXISTS", existedParentKey) == 1) then
      return -7
    end
  end
  rcall("XADD", eventsKey, "MAXLEN", "~", maxEvents, "*", "event",
    "duplicated", "jobId", jobId)
  return jobId .. "" -- convert to string
end
if parentKey ~= nil then
    if rcall("EXISTS", parentKey) ~= 1 then return -5 end
    parentData = cjson.encode(parent)
end
local jobCounter = rcall("INCR", idKey)
local maxEvents = getOrSetMaxEvents(metaKey)
local parentDependenciesKey = args[6]
local timestamp = args[4]
if args[2] == "" then
    jobId = jobCounter
    jobIdKey = args[1] .. jobId
else
    jobId = args[2]
    jobIdKey = args[1] .. jobId
    if rcall("EXISTS", jobIdKey) == 1 then
        return handleDuplicatedJob(jobIdKey, jobId, parentKey, parent,
            parentData, parentDependenciesKey, completedKey, eventsKey,
            maxEvents, timestamp)
    end
end
local deduplicationJobId = deduplicateJob(opts['de'], jobId, KEYS[5],
  deduplicationKey, eventsKey, maxEvents, args[1])
if deduplicationJobId then
  return deduplicationJobId
end
-- Store the job.
local delay, priority = storeJob(eventsKey, jobIdKey, jobId, args[3], ARGV[2],
                                 opts, timestamp, parentKey, parentData,
                                 repeatJobKey)
-- Add the job to the prioritized set
local isPausedOrMaxed = isQueuePausedOrMaxed(metaKey, activeKey)
addJobWithPriority( KEYS[1], priorityKey, priority, jobId, priorityCounterKey, isPausedOrMaxed)
-- Emit waiting event
rcall("XADD", eventsKey, "MAXLEN", "~", maxEvents, "*", "event", "waiting",
      "jobId", jobId)
-- Check if this job is a child of another job, if so add it to the parents dependencies
if parentDependenciesKey ~= nil then
    rcall("SADD", parentDependenciesKey, jobIdKey)
end
return jobId .. "" -- convert to string
`,keys:9};a.s(["addPrioritizedJob",0,n7],581636);let n8={name:"addRepeatableJob",content:`--[[
  Adds a repeatable job
    Input:
      KEYS[1] 'repeat' key
      KEYS[2] 'delayed' key
      ARGV[1] next milliseconds
      ARGV[2] msgpacked options
            [1]  name
            [2]  tz?
            [3]  pattern?
            [4]  endDate?
            [5]  every?
      ARGV[3] legacy custom key TODO: remove this logic in next breaking change
      ARGV[4] custom key
      ARGV[5] prefix key
      Output:
        repeatableKey  - OK
]]
local rcall = redis.call
local repeatKey = KEYS[1]
local delayedKey = KEYS[2]
local nextMillis = ARGV[1]
local legacyCustomKey = ARGV[3]
local customKey = ARGV[4]
local prefixKey = ARGV[5]
-- Includes
--[[
  Function to remove job.
]]
-- Includes
--[[
  Function to remove deduplication key if needed
  when a job is being removed.
]]
local function removeDeduplicationKeyIfNeededOnRemoval(prefixKey,
  jobId, deduplicationId)
  if deduplicationId then
    local deduplicationKey = prefixKey .. "de:" .. deduplicationId
    local currentJobId = rcall('GET', deduplicationKey)
    if currentJobId and currentJobId == jobId then
      return rcall("DEL", deduplicationKey)
    end
  end
end
--[[
  Function to remove job keys.
]]
local function removeJobKeys(jobKey)
  return rcall("DEL", jobKey, jobKey .. ':logs', jobKey .. ':dependencies',
    jobKey .. ':processed', jobKey .. ':failed', jobKey .. ':unsuccessful')
end
--[[
  Check if this job has a parent. If so we will just remove it from
  the parent child list, but if it is the last child we should move the parent to "wait/paused"
  which requires code from "moveToFinished"
]]
-- Includes
--[[
  Function to add job in target list and add marker if needed.
]]
-- Includes
--[[
  Add marker if needed when a job is available.
]]
local function addBaseMarkerIfNeeded(markerKey, isPausedOrMaxed)
  if not isPausedOrMaxed then
    rcall("ZADD", markerKey, 0, "0")
  end  
end
local function addJobInTargetList(targetKey, markerKey, pushCmd, isPausedOrMaxed, jobId)
  rcall(pushCmd, targetKey, jobId)
  addBaseMarkerIfNeeded(markerKey, isPausedOrMaxed)
end
--[[
  Functions to destructure job key.
  Just a bit of warning, these functions may be a bit slow and affect performance significantly.
]]
local getJobIdFromKey = function (jobKey)
  return string.match(jobKey, ".*:(.*)")
end
local getJobKeyPrefix = function (jobKey, jobId)
  return string.sub(jobKey, 0, #jobKey - #jobId)
end
--[[
  Function to check for the meta.paused key to decide if we are paused or not
  (since an empty list and !EXISTS are not really the same).
]]
local function getTargetQueueList(queueMetaKey, activeKey, waitKey, pausedKey)
  local queueAttributes = rcall("HMGET", queueMetaKey, "paused", "concurrency", "max", "duration")
  if queueAttributes[1] then
    return pausedKey, true, queueAttributes[3], queueAttributes[4]
  else
    if queueAttributes[2] then
      local activeCount = rcall("LLEN", activeKey)
      if activeCount >= tonumber(queueAttributes[2]) then
        return waitKey, true, queueAttributes[3], queueAttributes[4]
      else
        return waitKey, false, queueAttributes[3], queueAttributes[4]
      end
    end
  end
  return waitKey, false, queueAttributes[3], queueAttributes[4]
end
local function _moveParentToWait(parentPrefix, parentId, emitEvent)
  local parentTarget, isPausedOrMaxed = getTargetQueueList(parentPrefix .. "meta", parentPrefix .. "active",
    parentPrefix .. "wait", parentPrefix .. "paused")
  addJobInTargetList(parentTarget, parentPrefix .. "marker", "RPUSH", isPausedOrMaxed, parentId)
  if emitEvent then
    local parentEventStream = parentPrefix .. "events"
    rcall("XADD", parentEventStream, "*", "event", "waiting", "jobId", parentId, "prev", "waiting-children")
  end
end
local function removeParentDependencyKey(jobKey, hard, parentKey, baseKey, debounceId)
  if parentKey then
    local parentDependenciesKey = parentKey .. ":dependencies"
    local result = rcall("SREM", parentDependenciesKey, jobKey)
    if result > 0 then
      local pendingDependencies = rcall("SCARD", parentDependenciesKey)
      if pendingDependencies == 0 then
        local parentId = getJobIdFromKey(parentKey)
        local parentPrefix = getJobKeyPrefix(parentKey, parentId)
        local numRemovedElements = rcall("ZREM", parentPrefix .. "waiting-children", parentId)
        if numRemovedElements == 1 then
          if hard then -- remove parent in same queue
            if parentPrefix == baseKey then
              removeParentDependencyKey(parentKey, hard, nil, baseKey, nil)
              removeJobKeys(parentKey)
              if debounceId then
                rcall("DEL", parentPrefix .. "de:" .. debounceId)
              end
            else
              _moveParentToWait(parentPrefix, parentId)
            end
          else
            _moveParentToWait(parentPrefix, parentId, true)
          end
        end
      end
      return true
    end
  else
    local parentAttributes = rcall("HMGET", jobKey, "parentKey", "deid")
    local missedParentKey = parentAttributes[1]
    if( (type(missedParentKey) == "string") and missedParentKey ~= ""
      and (rcall("EXISTS", missedParentKey) == 1)) then
      local parentDependenciesKey = missedParentKey .. ":dependencies"
      local result = rcall("SREM", parentDependenciesKey, jobKey)
      if result > 0 then
        local pendingDependencies = rcall("SCARD", parentDependenciesKey)
        if pendingDependencies == 0 then
          local parentId = getJobIdFromKey(missedParentKey)
          local parentPrefix = getJobKeyPrefix(missedParentKey, parentId)
          local numRemovedElements = rcall("ZREM", parentPrefix .. "waiting-children", parentId)
          if numRemovedElements == 1 then
            if hard then
              if parentPrefix == baseKey then
                removeParentDependencyKey(missedParentKey, hard, nil, baseKey, nil)
                removeJobKeys(missedParentKey)
                if parentAttributes[2] then
                  rcall("DEL", parentPrefix .. "de:" .. parentAttributes[2])
                end
              else
                _moveParentToWait(parentPrefix, parentId)
              end
            else
              _moveParentToWait(parentPrefix, parentId, true)
            end
          end
        end
        return true
      end
    end
  end
  return false
end
local function removeJob(jobId, hard, baseKey, shouldRemoveDeduplicationKey)
  local jobKey = baseKey .. jobId
  removeParentDependencyKey(jobKey, hard, nil, baseKey)
  if shouldRemoveDeduplicationKey then
    local deduplicationId = rcall("HGET", jobKey, "deid")
    removeDeduplicationKeyIfNeededOnRemoval(baseKey, jobId, deduplicationId)
  end
  removeJobKeys(jobKey)
end
local function storeRepeatableJob(repeatKey, customKey, nextMillis, rawOpts)
  rcall("ZADD", repeatKey, nextMillis, customKey)
  local opts = cmsgpack.unpack(rawOpts)
  local optionalValues = {}
  if opts['tz'] then
    table.insert(optionalValues, "tz")
    table.insert(optionalValues, opts['tz'])
  end
  if opts['pattern'] then
    table.insert(optionalValues, "pattern")
    table.insert(optionalValues, opts['pattern'])
  end
  if opts['endDate'] then
    table.insert(optionalValues, "endDate")
    table.insert(optionalValues, opts['endDate'])
  end
  if opts['every'] then
    table.insert(optionalValues, "every")
    table.insert(optionalValues, opts['every'])
  end
  rcall("HMSET", repeatKey .. ":" .. customKey, "name", opts['name'],
    unpack(optionalValues))
  return customKey
end
-- If we are overriding a repeatable job we must delete the delayed job for
-- the next iteration.
local prevMillis = rcall("ZSCORE", repeatKey, customKey)
if prevMillis then
  local delayedJobId =  "repeat:" .. customKey .. ":" .. prevMillis
  local nextDelayedJobId =  repeatKey .. ":" .. customKey .. ":" .. nextMillis
  if rcall("ZSCORE", delayedKey, delayedJobId)
   and rcall("EXISTS", nextDelayedJobId) ~= 1 then
    removeJob(delayedJobId, true, prefixKey, true --[[remove debounce key]])
    rcall("ZREM", delayedKey, delayedJobId)
  end
end
-- Keep backwards compatibility with old repeatable jobs (<= 3.0.0)
if rcall("ZSCORE", repeatKey, legacyCustomKey) ~= false then
  return storeRepeatableJob(repeatKey, legacyCustomKey, nextMillis, ARGV[2])
end
return storeRepeatableJob(repeatKey, customKey, nextMillis, ARGV[2])
`,keys:2};a.s(["addRepeatableJob",0,n8],258042);let n9={name:"addStandardJob",content:`--[[
  Adds a job to the queue by doing the following:
    - Increases the job counter if needed.
    - Creates a new job key with the job data.
    - if delayed:
      - computes timestamp.
      - adds to delayed zset.
      - Emits a global event 'delayed' if the job is delayed.
    - if not delayed
      - Adds the jobId to the wait/paused list in one of three ways:
         - LIFO
         - FIFO
         - prioritized.
      - Adds the job to the "added" list so that workers gets notified.
    Input:
      KEYS[1] 'wait',
      KEYS[2] 'paused'
      KEYS[3] 'meta'
      KEYS[4] 'id'
      KEYS[5] 'completed'
      KEYS[6] 'delayed'
      KEYS[7] 'active'
      KEYS[8] events stream key
      KEYS[9] marker key
      ARGV[1] msgpacked arguments array
            [1]  key prefix,
            [2]  custom id (will not generate one automatically)
            [3]  name
            [4]  timestamp
            [5]  parentKey?
            [6]  parent dependencies key.
            [7]  parent? {id, queueKey}
            [8]  repeat job key
            [9] deduplication key
      ARGV[2] Json stringified job data
      ARGV[3] msgpacked options
      Output:
        jobId  - OK
        -5     - Missing parent key
]]
local eventsKey = KEYS[8]
local jobId
local jobIdKey
local rcall = redis.call
local args = cmsgpack.unpack(ARGV[1])
local data = ARGV[2]
local opts = cmsgpack.unpack(ARGV[3])
local parentKey = args[5]
local parent = args[7]
local repeatJobKey = args[8]
local deduplicationKey = args[9]
local parentData
-- Includes
--[[
  Function to add job in target list and add marker if needed.
]]
-- Includes
--[[
  Add marker if needed when a job is available.
]]
local function addBaseMarkerIfNeeded(markerKey, isPausedOrMaxed)
  if not isPausedOrMaxed then
    rcall("ZADD", markerKey, 0, "0")
  end  
end
local function addJobInTargetList(targetKey, markerKey, pushCmd, isPausedOrMaxed, jobId)
  rcall(pushCmd, targetKey, jobId)
  addBaseMarkerIfNeeded(markerKey, isPausedOrMaxed)
end
--[[
  Function to debounce a job.
]]
-- Includes
--[[
  Function to remove job keys.
]]
local function removeJobKeys(jobKey)
  return rcall("DEL", jobKey, jobKey .. ':logs', jobKey .. ':dependencies',
    jobKey .. ':processed', jobKey .. ':failed', jobKey .. ':unsuccessful')
end
local function removeDelayedJob(delayedKey, deduplicationKey, eventsKey, maxEvents, currentDeduplicatedJobId,
    jobId, deduplicationId, prefix)
    if rcall("ZREM", delayedKey, currentDeduplicatedJobId) > 0 then
        removeJobKeys(prefix .. currentDeduplicatedJobId)
        rcall("XADD", eventsKey, "*", "event", "removed", "jobId", currentDeduplicatedJobId,
            "prev", "delayed")
        -- TODO remove debounced event in next breaking change
        rcall("XADD", eventsKey, "MAXLEN", "~", maxEvents, "*", "event", "debounced", "jobId",
            jobId, "debounceId", deduplicationId)
        rcall("XADD", eventsKey, "MAXLEN", "~", maxEvents, "*", "event", "deduplicated", "jobId",
            jobId, "deduplicationId", deduplicationId, "deduplicatedJobId", currentDeduplicatedJobId)
        return true
    end
    return false
end
local function deduplicateJob(deduplicationOpts, jobId, delayedKey, deduplicationKey, eventsKey, maxEvents,
    prefix)
    local deduplicationId = deduplicationOpts and deduplicationOpts['id']
    if deduplicationId then
        local ttl = deduplicationOpts['ttl']
        if deduplicationOpts['replace'] then
            if ttl and ttl > 0 then
                local currentDebounceJobId = rcall('GET', deduplicationKey)
                if currentDebounceJobId then
                    local isRemoved = removeDelayedJob(delayedKey, deduplicationKey, eventsKey, maxEvents,
                        currentDebounceJobId, jobId, deduplicationId, prefix)
                    if isRemoved then
                        if deduplicationOpts['extend'] then
                            rcall('SET', deduplicationKey, jobId, 'PX', ttl)
                        else
                            rcall('SET', deduplicationKey, jobId, 'KEEPTTL')
                        end
                        return
                    else
                        return currentDebounceJobId
                    end
                else
                    rcall('SET', deduplicationKey, jobId, 'PX', ttl)
                    return
                end
            else
                local currentDebounceJobId = rcall('GET', deduplicationKey)
                if currentDebounceJobId then
                    local isRemoved = removeDelayedJob(delayedKey, deduplicationKey, eventsKey, maxEvents,
                        currentDebounceJobId, jobId, deduplicationId, prefix)
                    if isRemoved then
                        rcall('SET', deduplicationKey, jobId)
                        return
                    else
                        return currentDebounceJobId
                    end
                else
                    rcall('SET', deduplicationKey, jobId)
                    return
                end
            end
        else
            local deduplicationKeyExists
            if ttl and ttl > 0 then
                if deduplicationOpts['extend'] then
                    local currentDebounceJobId = rcall('GET', deduplicationKey)
                    if currentDebounceJobId then
                        rcall('SET', deduplicationKey, currentDebounceJobId, 'PX', ttl)
                        rcall("XADD", eventsKey, "MAXLEN", "~", maxEvents, "*", "event", "debounced",
                            "jobId", currentDebounceJobId, "debounceId", deduplicationId)
                        rcall("XADD", eventsKey, "MAXLEN", "~", maxEvents, "*", "event", "deduplicated", "jobId",
                            currentDebounceJobId, "deduplicationId", deduplicationId, "deduplicatedJobId", jobId)
                        return currentDebounceJobId
                    else
                        rcall('SET', deduplicationKey, jobId, 'PX', ttl)
                        return
                    end
                else
                    deduplicationKeyExists = not rcall('SET', deduplicationKey, jobId, 'PX', ttl, 'NX')
                end
            else
                deduplicationKeyExists = not rcall('SET', deduplicationKey, jobId, 'NX')
            end
            if deduplicationKeyExists then
                local currentDebounceJobId = rcall('GET', deduplicationKey)
                -- TODO remove debounced event in next breaking change
                rcall("XADD", eventsKey, "MAXLEN", "~", maxEvents, "*", "event", "debounced", "jobId",
                    currentDebounceJobId, "debounceId", deduplicationId)
                rcall("XADD", eventsKey, "MAXLEN", "~", maxEvents, "*", "event", "deduplicated", "jobId",
                    currentDebounceJobId, "deduplicationId", deduplicationId, "deduplicatedJobId", jobId)
                return currentDebounceJobId
            end
        end
    end
end
--[[
  Function to get max events value or set by default 10000.
]]
local function getOrSetMaxEvents(metaKey)
  local maxEvents = rcall("HGET", metaKey, "opts.maxLenEvents")
  if not maxEvents then
    maxEvents = 10000
    rcall("HSET", metaKey, "opts.maxLenEvents", maxEvents)
  end
  return maxEvents
end
--[[
  Function to check for the meta.paused key to decide if we are paused or not
  (since an empty list and !EXISTS are not really the same).
]]
local function getTargetQueueList(queueMetaKey, activeKey, waitKey, pausedKey)
  local queueAttributes = rcall("HMGET", queueMetaKey, "paused", "concurrency", "max", "duration")
  if queueAttributes[1] then
    return pausedKey, true, queueAttributes[3], queueAttributes[4]
  else
    if queueAttributes[2] then
      local activeCount = rcall("LLEN", activeKey)
      if activeCount >= tonumber(queueAttributes[2]) then
        return waitKey, true, queueAttributes[3], queueAttributes[4]
      else
        return waitKey, false, queueAttributes[3], queueAttributes[4]
      end
    end
  end
  return waitKey, false, queueAttributes[3], queueAttributes[4]
end
--[[
  Function to handle the case when job is duplicated.
]]
-- Includes
--[[
    This function is used to update the parent's dependencies if the job
    is already completed and about to be ignored. The parent must get its
    dependencies updated to avoid the parent job being stuck forever in 
    the waiting-children state.
]]
-- Includes
--[[
  Validate and move or add dependencies to parent.
]]
-- Includes
--[[
  Validate and move parent to a wait status (waiting, delayed or prioritized)
  if no pending dependencies.
]]
-- Includes
--[[
  Validate and move parent to a wait status (waiting, delayed or prioritized) if needed.
]]
-- Includes
--[[
  Move parent to a wait status (wait, prioritized or delayed)
]]
-- Includes
--[[
  Add delay marker if needed.
]]
-- Includes
--[[
  Function to return the next delayed job timestamp.
]]
local function getNextDelayedTimestamp(delayedKey)
  local result = rcall("ZRANGE", delayedKey, 0, 0, "WITHSCORES")
  if #result then
    local nextTimestamp = tonumber(result[2])
    if nextTimestamp ~= nil then
      return nextTimestamp / 0x1000
    end
  end
end
local function addDelayMarkerIfNeeded(markerKey, delayedKey)
  local nextTimestamp = getNextDelayedTimestamp(delayedKey)
  if nextTimestamp ~= nil then
    -- Replace the score of the marker with the newest known
    -- next timestamp.
    rcall("ZADD", markerKey, nextTimestamp, "1")
  end
end
--[[
  Function to add job considering priority.
]]
-- Includes
--[[
  Function to get priority score.
]]
local function getPriorityScore(priority, priorityCounterKey)
  local prioCounter = rcall("INCR", priorityCounterKey)
  return priority * 0x100000000 + prioCounter % 0x100000000
end
local function addJobWithPriority(markerKey, prioritizedKey, priority, jobId, priorityCounterKey,
  isPausedOrMaxed)
  local score = getPriorityScore(priority, priorityCounterKey)
  rcall("ZADD", prioritizedKey, score, jobId)
  addBaseMarkerIfNeeded(markerKey, isPausedOrMaxed)
end
--[[
  Function to check if queue is paused or maxed
  (since an empty list and !EXISTS are not really the same).
]]
local function isQueuePausedOrMaxed(queueMetaKey, activeKey)
  local queueAttributes = rcall("HMGET", queueMetaKey, "paused", "concurrency")
  if queueAttributes[1] then
    return true
  else
    if queueAttributes[2] then
      local activeCount = rcall("LLEN", activeKey)
      return activeCount >= tonumber(queueAttributes[2])
    end
  end
  return false
end
local function moveParentToWait(parentQueueKey, parentKey, parentId, timestamp)
    local parentWaitKey = parentQueueKey .. ":wait"
    local parentPausedKey = parentQueueKey .. ":paused"
    local parentActiveKey = parentQueueKey .. ":active"
    local parentMetaKey = parentQueueKey .. ":meta"
    local parentMarkerKey = parentQueueKey .. ":marker"
    local jobAttributes = rcall("HMGET", parentKey, "priority", "delay")
    local priority = tonumber(jobAttributes[1]) or 0
    local delay = tonumber(jobAttributes[2]) or 0
    if delay > 0 then
        local delayedTimestamp = tonumber(timestamp) + delay
        local score = delayedTimestamp * 0x1000
        local parentDelayedKey = parentQueueKey .. ":delayed"
        rcall("ZADD", parentDelayedKey, score, parentId)
        rcall("XADD", parentQueueKey .. ":events", "*", "event", "delayed", "jobId", parentId, "delay",
            delayedTimestamp)
        addDelayMarkerIfNeeded(parentMarkerKey, parentDelayedKey)
    else
        if priority == 0 then
            local parentTarget, isParentPausedOrMaxed = getTargetQueueList(parentMetaKey, parentActiveKey,
                parentWaitKey, parentPausedKey)
            addJobInTargetList(parentTarget, parentMarkerKey, "RPUSH", isParentPausedOrMaxed, parentId)
        else
            local isPausedOrMaxed = isQueuePausedOrMaxed(parentMetaKey, parentActiveKey)
            addJobWithPriority(parentMarkerKey, parentQueueKey .. ":prioritized", priority, parentId,
                parentQueueKey .. ":pc", isPausedOrMaxed)
        end
        rcall("XADD", parentQueueKey .. ":events", "*", "event", "waiting", "jobId", parentId, "prev",
            "waiting-children")
    end
end
local function moveParentToWaitIfNeeded(parentQueueKey, parentKey, parentId, timestamp)
  if rcall("EXISTS", parentKey) == 1 then
    local parentWaitingChildrenKey = parentQueueKey .. ":waiting-children"
    if rcall("ZSCORE", parentWaitingChildrenKey, parentId) then    
      rcall("ZREM", parentWaitingChildrenKey, parentId)
      moveParentToWait(parentQueueKey, parentKey, parentId, timestamp)
    end
  end
end
local function moveParentToWaitIfNoPendingDependencies(parentQueueKey, parentDependenciesKey, parentKey,
  parentId, timestamp)
  local doNotHavePendingDependencies = rcall("SCARD", parentDependenciesKey) == 0
  if doNotHavePendingDependencies then
    moveParentToWaitIfNeeded(parentQueueKey, parentKey, parentId, timestamp)
  end
end
local function updateParentDepsIfNeeded(parentKey, parentQueueKey, parentDependenciesKey,
  parentId, jobIdKey, returnvalue, timestamp )
  local processedSet = parentKey .. ":processed"
  rcall("HSET", processedSet, jobIdKey, returnvalue)
  moveParentToWaitIfNoPendingDependencies(parentQueueKey, parentDependenciesKey, parentKey, parentId, timestamp)
end
local function updateExistingJobsParent(parentKey, parent, parentData,
                                        parentDependenciesKey, completedKey,
                                        jobIdKey, jobId, timestamp)
    if parentKey ~= nil then
        if rcall("ZSCORE", completedKey, jobId) then
            local returnvalue = rcall("HGET", jobIdKey, "returnvalue")
            updateParentDepsIfNeeded(parentKey, parent['queueKey'],
                                     parentDependenciesKey, parent['id'],
                                     jobIdKey, returnvalue, timestamp)
        else
            if parentDependenciesKey ~= nil then
                rcall("SADD", parentDependenciesKey, jobIdKey)
            end
        end
        rcall("HMSET", jobIdKey, "parentKey", parentKey, "parent", parentData)
    end
end
local function handleDuplicatedJob(jobKey, jobId, currentParentKey, currentParent,
  parentData, parentDependenciesKey, completedKey, eventsKey, maxEvents, timestamp)
  local existedParentKey = rcall("HGET", jobKey, "parentKey")
  if not existedParentKey or existedParentKey == currentParentKey then
    updateExistingJobsParent(currentParentKey, currentParent, parentData,
      parentDependenciesKey, completedKey, jobKey,
      jobId, timestamp)
  else
    if currentParentKey ~= nil and currentParentKey ~= existedParentKey
      and (rcall("EXISTS", existedParentKey) == 1) then
      return -7
    end
  end
  rcall("XADD", eventsKey, "MAXLEN", "~", maxEvents, "*", "event",
    "duplicated", "jobId", jobId)
  return jobId .. "" -- convert to string
end
--[[
  Function to store a job
]]
local function storeJob(eventsKey, jobIdKey, jobId, name, data, opts, timestamp,
                        parentKey, parentData, repeatJobKey)
    local jsonOpts = cjson.encode(opts)
    local delay = opts['delay'] or 0
    local priority = opts['priority'] or 0
    local debounceId = opts['de'] and opts['de']['id']
    local optionalValues = {}
    if parentKey ~= nil then
        table.insert(optionalValues, "parentKey")
        table.insert(optionalValues, parentKey)
        table.insert(optionalValues, "parent")
        table.insert(optionalValues, parentData)
    end
    if repeatJobKey then
        table.insert(optionalValues, "rjk")
        table.insert(optionalValues, repeatJobKey)
    end
    if debounceId then
        table.insert(optionalValues, "deid")
        table.insert(optionalValues, debounceId)
    end
    rcall("HMSET", jobIdKey, "name", name, "data", data, "opts", jsonOpts,
          "timestamp", timestamp, "delay", delay, "priority", priority,
          unpack(optionalValues))
    rcall("XADD", eventsKey, "*", "event", "added", "jobId", jobId, "name", name)
    return delay, priority
end
if parentKey ~= nil then
    if rcall("EXISTS", parentKey) ~= 1 then return -5 end
    parentData = cjson.encode(parent)
end
local jobCounter = rcall("INCR", KEYS[4])
local metaKey = KEYS[3]
local maxEvents = getOrSetMaxEvents(metaKey)
local parentDependenciesKey = args[6]
local timestamp = args[4]
if args[2] == "" then
    jobId = jobCounter
    jobIdKey = args[1] .. jobId
else
    jobId = args[2]
    jobIdKey = args[1] .. jobId
    if rcall("EXISTS", jobIdKey) == 1 then
        return handleDuplicatedJob(jobIdKey, jobId, parentKey, parent,
            parentData, parentDependenciesKey, KEYS[5], eventsKey,
            maxEvents, timestamp)
    end
end
local deduplicationJobId = deduplicateJob(opts['de'], jobId, KEYS[6],
  deduplicationKey, eventsKey, maxEvents, args[1])
if deduplicationJobId then
  return deduplicationJobId
end
-- Store the job.
storeJob(eventsKey, jobIdKey, jobId, args[3], ARGV[2], opts, timestamp,
         parentKey, parentData, repeatJobKey)
local target, isPausedOrMaxed = getTargetQueueList(metaKey, KEYS[7], KEYS[1], KEYS[2])
-- LIFO or FIFO
local pushCmd = opts['lifo'] and 'RPUSH' or 'LPUSH'
addJobInTargetList(target, KEYS[9], pushCmd, isPausedOrMaxed, jobId)
-- Emit waiting event
rcall("XADD", eventsKey, "MAXLEN", "~", maxEvents, "*", "event", "waiting",
      "jobId", jobId)
-- Check if this job is a child of another job, if so add it to the parents dependencies
if parentDependenciesKey ~= nil then
    rcall("SADD", parentDependenciesKey, jobIdKey)
end
return jobId .. "" -- convert to string
`,keys:9};a.s(["addStandardJob",0,n9],656768);let oa={name:"changeDelay",content:`--[[
  Change job delay when it is in delayed set.
  Input:
    KEYS[1] delayed key
    KEYS[2] meta key
    KEYS[3] marker key
    KEYS[4] events stream
    ARGV[1] delay
    ARGV[2] timestamp
    ARGV[3] the id of the job
    ARGV[4] job key
  Output:
    0 - OK
   -1 - Missing job.
   -3 - Job not in delayed set.
  Events:
    - delayed key.
]]
local rcall = redis.call
-- Includes
--[[
  Add delay marker if needed.
]]
-- Includes
--[[
  Function to return the next delayed job timestamp.
]]
local function getNextDelayedTimestamp(delayedKey)
  local result = rcall("ZRANGE", delayedKey, 0, 0, "WITHSCORES")
  if #result then
    local nextTimestamp = tonumber(result[2])
    if nextTimestamp ~= nil then
      return nextTimestamp / 0x1000
    end
  end
end
local function addDelayMarkerIfNeeded(markerKey, delayedKey)
  local nextTimestamp = getNextDelayedTimestamp(delayedKey)
  if nextTimestamp ~= nil then
    -- Replace the score of the marker with the newest known
    -- next timestamp.
    rcall("ZADD", markerKey, nextTimestamp, "1")
  end
end
--[[
  Bake in the job id first 12 bits into the timestamp
  to guarantee correct execution order of delayed jobs
  (up to 4096 jobs per given timestamp or 4096 jobs apart per timestamp)
  WARNING: Jobs that are so far apart that they wrap around will cause FIFO to fail
]]
local function getDelayedScore(delayedKey, timestamp, delay)
  local delayedTimestamp = (delay > 0 and (tonumber(timestamp) + delay)) or tonumber(timestamp)
  local minScore = delayedTimestamp * 0x1000
  local maxScore = (delayedTimestamp + 1 ) * 0x1000 - 1
  local result = rcall("ZREVRANGEBYSCORE", delayedKey, maxScore,
    minScore, "WITHSCORES","LIMIT", 0, 1)
  if #result then
    local currentMaxScore = tonumber(result[2])
    if currentMaxScore ~= nil then
      if currentMaxScore >= maxScore then
        return maxScore, delayedTimestamp
      else
        return currentMaxScore + 1, delayedTimestamp
      end
    end
  end
  return minScore, delayedTimestamp
end
--[[
  Function to get max events value or set by default 10000.
]]
local function getOrSetMaxEvents(metaKey)
  local maxEvents = rcall("HGET", metaKey, "opts.maxLenEvents")
  if not maxEvents then
    maxEvents = 10000
    rcall("HSET", metaKey, "opts.maxLenEvents", maxEvents)
  end
  return maxEvents
end
if rcall("EXISTS", ARGV[4]) == 1 then
  local jobId = ARGV[3]
  local delay = tonumber(ARGV[1])
  local score, delayedTimestamp = getDelayedScore(KEYS[1], ARGV[2], delay)
  local numRemovedElements = rcall("ZREM", KEYS[1], jobId)
  if numRemovedElements < 1 then
    return -3
  end
  rcall("HSET", ARGV[4], "delay", delay)
  rcall("ZADD", KEYS[1], score, jobId)
  local maxEvents = getOrSetMaxEvents(KEYS[2])
  rcall("XADD", KEYS[4], "MAXLEN", "~", maxEvents, "*", "event", "delayed",
    "jobId", jobId, "delay", delayedTimestamp)
  -- mark that a delayed job is available
  addDelayMarkerIfNeeded(KEYS[3], KEYS[1])
  return 0
else
  return -1
end`,keys:4};a.s(["changeDelay",0,oa],766008);let ob={name:"changePriority",content:`--[[
  Change job priority
  Input:
    KEYS[1] 'wait',
    KEYS[2] 'paused'
    KEYS[3] 'meta'
    KEYS[4] 'prioritized'
    KEYS[5] 'active'
    KEYS[6] 'pc' priority counter
    KEYS[7] 'marker'
    ARGV[1] priority value
    ARGV[2] prefix key
    ARGV[3] job id
    ARGV[4] lifo
    Output:
       0  - OK
      -1  - Missing job
]]
local jobId = ARGV[3]
local jobKey = ARGV[2] .. jobId
local priority = tonumber(ARGV[1])
local rcall = redis.call
-- Includes
--[[
  Function to add job in target list and add marker if needed.
]]
-- Includes
--[[
  Add marker if needed when a job is available.
]]
local function addBaseMarkerIfNeeded(markerKey, isPausedOrMaxed)
  if not isPausedOrMaxed then
    rcall("ZADD", markerKey, 0, "0")
  end  
end
local function addJobInTargetList(targetKey, markerKey, pushCmd, isPausedOrMaxed, jobId)
  rcall(pushCmd, targetKey, jobId)
  addBaseMarkerIfNeeded(markerKey, isPausedOrMaxed)
end
--[[
  Function to add job considering priority.
]]
-- Includes
--[[
  Function to get priority score.
]]
local function getPriorityScore(priority, priorityCounterKey)
  local prioCounter = rcall("INCR", priorityCounterKey)
  return priority * 0x100000000 + prioCounter % 0x100000000
end
local function addJobWithPriority(markerKey, prioritizedKey, priority, jobId, priorityCounterKey,
  isPausedOrMaxed)
  local score = getPriorityScore(priority, priorityCounterKey)
  rcall("ZADD", prioritizedKey, score, jobId)
  addBaseMarkerIfNeeded(markerKey, isPausedOrMaxed)
end
--[[
  Function to check for the meta.paused key to decide if we are paused or not
  (since an empty list and !EXISTS are not really the same).
]]
local function getTargetQueueList(queueMetaKey, activeKey, waitKey, pausedKey)
  local queueAttributes = rcall("HMGET", queueMetaKey, "paused", "concurrency", "max", "duration")
  if queueAttributes[1] then
    return pausedKey, true, queueAttributes[3], queueAttributes[4]
  else
    if queueAttributes[2] then
      local activeCount = rcall("LLEN", activeKey)
      if activeCount >= tonumber(queueAttributes[2]) then
        return waitKey, true, queueAttributes[3], queueAttributes[4]
      else
        return waitKey, false, queueAttributes[3], queueAttributes[4]
      end
    end
  end
  return waitKey, false, queueAttributes[3], queueAttributes[4]
end
--[[
  Function to push back job considering priority in front of same prioritized jobs.
]]
local function pushBackJobWithPriority(prioritizedKey, priority, jobId)
  -- in order to put it at front of same prioritized jobs
  -- we consider prioritized counter as 0
  local score = priority * 0x100000000
  rcall("ZADD", prioritizedKey, score, jobId)
end
local function reAddJobWithNewPriority( prioritizedKey, markerKey, targetKey,
    priorityCounter, lifo, priority, jobId, isPausedOrMaxed)
    if priority == 0 then
        local pushCmd = lifo and 'RPUSH' or 'LPUSH'
        addJobInTargetList(targetKey, markerKey, pushCmd, isPausedOrMaxed, jobId)
    else
        if lifo then
            pushBackJobWithPriority(prioritizedKey, priority, jobId)
        else
            addJobWithPriority(markerKey, prioritizedKey, priority, jobId,
                priorityCounter, isPausedOrMaxed)
        end
    end
end
if rcall("EXISTS", jobKey) == 1 then
    local metaKey = KEYS[3]
    local target, isPausedOrMaxed = getTargetQueueList(metaKey, KEYS[5], KEYS[1], KEYS[2])
    local prioritizedKey = KEYS[4]
    local priorityCounterKey = KEYS[6]
    local markerKey = KEYS[7]
    -- Re-add with the new priority
    if rcall("ZREM", prioritizedKey, jobId) > 0 then
        reAddJobWithNewPriority( prioritizedKey, markerKey, target,
            priorityCounterKey, ARGV[4] == '1', priority, jobId, isPausedOrMaxed)
    elseif rcall("LREM", target, -1, jobId) > 0 then
        reAddJobWithNewPriority( prioritizedKey, markerKey, target,
            priorityCounterKey, ARGV[4] == '1', priority, jobId, isPausedOrMaxed)
    end
    rcall("HSET", jobKey, "priority", priority)
    return 0
else
    return -1
end
`,keys:7};a.s(["changePriority",0,ob],529263);let oc={name:"cleanJobsInSet",content:`--[[
  Remove jobs from the specific set.
  Input:
    KEYS[1]  set key,
    KEYS[2]  events stream key
    KEYS[3]  repeat key
    ARGV[1]  jobKey prefix
    ARGV[2]  timestamp
    ARGV[3]  limit the number of jobs to be removed. 0 is unlimited
    ARGV[4]  set name, can be any of 'wait', 'active', 'paused', 'delayed', 'completed', or 'failed'
]]
local rcall = redis.call
local repeatKey = KEYS[3]
local rangeStart = 0
local rangeEnd = -1
local limit = tonumber(ARGV[3])
-- If we're only deleting _n_ items, avoid retrieving all items
-- for faster performance
--
-- Start from the tail of the list, since that's where oldest elements
-- are generally added for FIFO lists
if limit > 0 then
  rangeStart = -1 - limit + 1
  rangeEnd = -1
end
-- Includes
--[[
  Function to clean job list.
  Returns jobIds and deleted count number.
]]
-- Includes
--[[
  Function to get the latest saved timestamp.
]]
local function getTimestamp(jobKey, attributes)
  if #attributes == 1 then
    return rcall("HGET", jobKey, attributes[1])
  end
  local jobTs
  for _, ts in ipairs(rcall("HMGET", jobKey, unpack(attributes))) do
    if (ts) then
      jobTs = ts
      break
    end
  end
  return jobTs
end
--[[
  Function to check if the job belongs to a job scheduler and
  current delayed job matches with jobId
]]
local function isJobSchedulerJob(jobId, jobKey, jobSchedulersKey)
  local repeatJobKey = rcall("HGET", jobKey, "rjk")
  if repeatJobKey  then
    local prevMillis = rcall("ZSCORE", jobSchedulersKey, repeatJobKey)
    if prevMillis then
      local currentDelayedJobId = "repeat:" .. repeatJobKey .. ":" .. prevMillis
      return jobId == currentDelayedJobId
    end
  end
  return false
end
--[[
  Function to remove job.
]]
-- Includes
--[[
  Function to remove deduplication key if needed
  when a job is being removed.
]]
local function removeDeduplicationKeyIfNeededOnRemoval(prefixKey,
  jobId, deduplicationId)
  if deduplicationId then
    local deduplicationKey = prefixKey .. "de:" .. deduplicationId
    local currentJobId = rcall('GET', deduplicationKey)
    if currentJobId and currentJobId == jobId then
      return rcall("DEL", deduplicationKey)
    end
  end
end
--[[
  Function to remove job keys.
]]
local function removeJobKeys(jobKey)
  return rcall("DEL", jobKey, jobKey .. ':logs', jobKey .. ':dependencies',
    jobKey .. ':processed', jobKey .. ':failed', jobKey .. ':unsuccessful')
end
--[[
  Check if this job has a parent. If so we will just remove it from
  the parent child list, but if it is the last child we should move the parent to "wait/paused"
  which requires code from "moveToFinished"
]]
-- Includes
--[[
  Function to add job in target list and add marker if needed.
]]
-- Includes
--[[
  Add marker if needed when a job is available.
]]
local function addBaseMarkerIfNeeded(markerKey, isPausedOrMaxed)
  if not isPausedOrMaxed then
    rcall("ZADD", markerKey, 0, "0")
  end  
end
local function addJobInTargetList(targetKey, markerKey, pushCmd, isPausedOrMaxed, jobId)
  rcall(pushCmd, targetKey, jobId)
  addBaseMarkerIfNeeded(markerKey, isPausedOrMaxed)
end
--[[
  Functions to destructure job key.
  Just a bit of warning, these functions may be a bit slow and affect performance significantly.
]]
local getJobIdFromKey = function (jobKey)
  return string.match(jobKey, ".*:(.*)")
end
local getJobKeyPrefix = function (jobKey, jobId)
  return string.sub(jobKey, 0, #jobKey - #jobId)
end
--[[
  Function to check for the meta.paused key to decide if we are paused or not
  (since an empty list and !EXISTS are not really the same).
]]
local function getTargetQueueList(queueMetaKey, activeKey, waitKey, pausedKey)
  local queueAttributes = rcall("HMGET", queueMetaKey, "paused", "concurrency", "max", "duration")
  if queueAttributes[1] then
    return pausedKey, true, queueAttributes[3], queueAttributes[4]
  else
    if queueAttributes[2] then
      local activeCount = rcall("LLEN", activeKey)
      if activeCount >= tonumber(queueAttributes[2]) then
        return waitKey, true, queueAttributes[3], queueAttributes[4]
      else
        return waitKey, false, queueAttributes[3], queueAttributes[4]
      end
    end
  end
  return waitKey, false, queueAttributes[3], queueAttributes[4]
end
local function _moveParentToWait(parentPrefix, parentId, emitEvent)
  local parentTarget, isPausedOrMaxed = getTargetQueueList(parentPrefix .. "meta", parentPrefix .. "active",
    parentPrefix .. "wait", parentPrefix .. "paused")
  addJobInTargetList(parentTarget, parentPrefix .. "marker", "RPUSH", isPausedOrMaxed, parentId)
  if emitEvent then
    local parentEventStream = parentPrefix .. "events"
    rcall("XADD", parentEventStream, "*", "event", "waiting", "jobId", parentId, "prev", "waiting-children")
  end
end
local function removeParentDependencyKey(jobKey, hard, parentKey, baseKey, debounceId)
  if parentKey then
    local parentDependenciesKey = parentKey .. ":dependencies"
    local result = rcall("SREM", parentDependenciesKey, jobKey)
    if result > 0 then
      local pendingDependencies = rcall("SCARD", parentDependenciesKey)
      if pendingDependencies == 0 then
        local parentId = getJobIdFromKey(parentKey)
        local parentPrefix = getJobKeyPrefix(parentKey, parentId)
        local numRemovedElements = rcall("ZREM", parentPrefix .. "waiting-children", parentId)
        if numRemovedElements == 1 then
          if hard then -- remove parent in same queue
            if parentPrefix == baseKey then
              removeParentDependencyKey(parentKey, hard, nil, baseKey, nil)
              removeJobKeys(parentKey)
              if debounceId then
                rcall("DEL", parentPrefix .. "de:" .. debounceId)
              end
            else
              _moveParentToWait(parentPrefix, parentId)
            end
          else
            _moveParentToWait(parentPrefix, parentId, true)
          end
        end
      end
      return true
    end
  else
    local parentAttributes = rcall("HMGET", jobKey, "parentKey", "deid")
    local missedParentKey = parentAttributes[1]
    if( (type(missedParentKey) == "string") and missedParentKey ~= ""
      and (rcall("EXISTS", missedParentKey) == 1)) then
      local parentDependenciesKey = missedParentKey .. ":dependencies"
      local result = rcall("SREM", parentDependenciesKey, jobKey)
      if result > 0 then
        local pendingDependencies = rcall("SCARD", parentDependenciesKey)
        if pendingDependencies == 0 then
          local parentId = getJobIdFromKey(missedParentKey)
          local parentPrefix = getJobKeyPrefix(missedParentKey, parentId)
          local numRemovedElements = rcall("ZREM", parentPrefix .. "waiting-children", parentId)
          if numRemovedElements == 1 then
            if hard then
              if parentPrefix == baseKey then
                removeParentDependencyKey(missedParentKey, hard, nil, baseKey, nil)
                removeJobKeys(missedParentKey)
                if parentAttributes[2] then
                  rcall("DEL", parentPrefix .. "de:" .. parentAttributes[2])
                end
              else
                _moveParentToWait(parentPrefix, parentId)
              end
            else
              _moveParentToWait(parentPrefix, parentId, true)
            end
          end
        end
        return true
      end
    end
  end
  return false
end
local function removeJob(jobId, hard, baseKey, shouldRemoveDeduplicationKey)
  local jobKey = baseKey .. jobId
  removeParentDependencyKey(jobKey, hard, nil, baseKey)
  if shouldRemoveDeduplicationKey then
    local deduplicationId = rcall("HGET", jobKey, "deid")
    removeDeduplicationKeyIfNeededOnRemoval(baseKey, jobId, deduplicationId)
  end
  removeJobKeys(jobKey)
end
local function cleanList(listKey, jobKeyPrefix, rangeStart, rangeEnd,
  timestamp, isWaiting, jobSchedulersKey)
  local jobs = rcall("LRANGE", listKey, rangeStart, rangeEnd)
  local deleted = {}
  local deletedCount = 0
  local jobTS
  local deletionMarker = ''
  local jobIdsLen = #jobs
  for i, job in ipairs(jobs) do
    if limit > 0 and deletedCount >= limit then
      break
    end
    local jobKey = jobKeyPrefix .. job
    if (isWaiting or rcall("EXISTS", jobKey .. ":lock") == 0) and
      not isJobSchedulerJob(job, jobKey, jobSchedulersKey) then
      -- Find the right timestamp of the job to compare to maxTimestamp:
      -- * finishedOn says when the job was completed, but it isn't set unless the job has actually completed
      -- * processedOn represents when the job was last attempted, but it doesn't get populated until
      --   the job is first tried
      -- * timestamp is the original job submission time
      -- Fetch all three of these (in that order) and use the first one that is set so that we'll leave jobs
      -- that have been active within the grace period:
      jobTS = getTimestamp(jobKey, {"finishedOn", "processedOn", "timestamp"})
      if (not jobTS or jobTS <= timestamp) then
        -- replace the entry with a deletion marker; the actual deletion will
        -- occur at the end of the script
        rcall("LSET", listKey, rangeEnd - jobIdsLen + i, deletionMarker)
        removeJob(job, true, jobKeyPrefix, true --[[remove debounce key]])
        deletedCount = deletedCount + 1
        table.insert(deleted, job)
      end
    end
  end
  rcall("LREM", listKey, 0, deletionMarker)
  return {deleted, deletedCount}
end
--[[
  Function to clean job set.
  Returns jobIds and deleted count number.
]] 
-- Includes
--[[
  Function to loop in batches.
  Just a bit of warning, some commands as ZREM
  could receive a maximum of 7000 parameters per call.
]]
local function batches(n, batchSize)
  local i = 0
  return function()
    local from = i * batchSize + 1
    i = i + 1
    if (from <= n) then
      local to = math.min(from + batchSize - 1, n)
      return from, to
    end
  end
end
--[[
  We use ZRANGEBYSCORE to make the case where we're deleting a limited number
  of items in a sorted set only run a single iteration. If we simply used
  ZRANGE, we may take a long time traversing through jobs that are within the
  grace period.
]]
local function getJobsInZset(zsetKey, rangeEnd, limit)
  if limit > 0 then
    return rcall("ZRANGEBYSCORE", zsetKey, 0, rangeEnd, "LIMIT", 0, limit)
  else
    return rcall("ZRANGEBYSCORE", zsetKey, 0, rangeEnd)
  end
end
local function cleanSet(
    setKey,
    jobKeyPrefix,
    rangeEnd,
    timestamp,
    limit,
    attributes,
    isFinished,
    jobSchedulersKey)
    local jobs = getJobsInZset(setKey, rangeEnd, limit)
    local deleted = {}
    local deletedCount = 0
    local jobTS
    for i, job in ipairs(jobs) do
        if limit > 0 and deletedCount >= limit then
            break
        end
        local jobKey = jobKeyPrefix .. job
        -- Extract a Job Scheduler Id from jobId ("repeat:job-scheduler-id:millis") 
        -- and check if it is in the scheduled jobs
        if not (jobSchedulersKey and isJobSchedulerJob(job, jobKey, jobSchedulersKey)) then
            if isFinished then
                removeJob(job, true, jobKeyPrefix, true --[[remove debounce key]] )
                deletedCount = deletedCount + 1
                table.insert(deleted, job)
            else
                -- * finishedOn says when the job was completed, but it isn't set unless the job has actually completed
                jobTS = getTimestamp(jobKey, attributes)
                if (not jobTS or jobTS <= timestamp) then
                    removeJob(job, true, jobKeyPrefix, true --[[remove debounce key]] )
                    deletedCount = deletedCount + 1
                    table.insert(deleted, job)
                end
            end
        end
    end
    if (#deleted > 0) then
        for from, to in batches(#deleted, 7000) do
            rcall("ZREM", setKey, unpack(deleted, from, to))
        end
    end
    return {deleted, deletedCount}
end
local result
if ARGV[4] == "active" then
  result = cleanList(KEYS[1], ARGV[1], rangeStart, rangeEnd, ARGV[2], false --[[ hasFinished ]],
                      repeatKey)
elseif ARGV[4] == "delayed" then
  rangeEnd = "+inf"
  result = cleanSet(KEYS[1], ARGV[1], rangeEnd, ARGV[2], limit,
                    {"processedOn", "timestamp"}, false  --[[ hasFinished ]], repeatKey)
elseif ARGV[4] == "prioritized" then
  rangeEnd = "+inf"
  result = cleanSet(KEYS[1], ARGV[1], rangeEnd, ARGV[2], limit,
                    {"timestamp"}, false  --[[ hasFinished ]], repeatKey)
elseif ARGV[4] == "wait" or ARGV[4] == "paused" then
  result = cleanList(KEYS[1], ARGV[1], rangeStart, rangeEnd, ARGV[2], true --[[ hasFinished ]],
                      repeatKey)
else
  rangeEnd = ARGV[2]
  -- No need to pass repeat key as in that moment job won't be related to a job scheduler
  result = cleanSet(KEYS[1], ARGV[1], rangeEnd, ARGV[2], limit,
                    {"finishedOn"}, true  --[[ hasFinished ]])
end
rcall("XADD", KEYS[2], "*", "event", "cleaned", "count", result[2])
return result[1]
`,keys:3};a.s(["cleanJobsInSet",0,oc],48414);let od={name:"drain",content:`--[[
  Drains the queue, removes all jobs that are waiting
  or delayed, but not active, completed or failed
  Input:
    KEYS[1] 'wait',
    KEYS[2] 'paused'
    KEYS[3] 'delayed'
    KEYS[4] 'prioritized'
    KEYS[5] 'jobschedulers' (repeat)
    ARGV[1]  queue key prefix
    ARGV[2]  should clean delayed jobs
]]
local rcall = redis.call
local queueBaseKey = ARGV[1]
--[[
  Functions to remove jobs.
]]
-- Includes
--[[
  Function to filter out jobs to ignore from a table.
]]
local function filterOutJobsToIgnore(jobs, jobsToIgnore)
  local filteredJobs = {}
  for i = 1, #jobs do
    if not jobsToIgnore[jobs[i]] then
      table.insert(filteredJobs, jobs[i])
    end
  end
  return filteredJobs
end
--[[
  Functions to remove jobs.
]]
-- Includes
--[[
  Function to remove job.
]]
-- Includes
--[[
  Function to remove deduplication key if needed
  when a job is being removed.
]]
local function removeDeduplicationKeyIfNeededOnRemoval(prefixKey,
  jobId, deduplicationId)
  if deduplicationId then
    local deduplicationKey = prefixKey .. "de:" .. deduplicationId
    local currentJobId = rcall('GET', deduplicationKey)
    if currentJobId and currentJobId == jobId then
      return rcall("DEL", deduplicationKey)
    end
  end
end
--[[
  Function to remove job keys.
]]
local function removeJobKeys(jobKey)
  return rcall("DEL", jobKey, jobKey .. ':logs', jobKey .. ':dependencies',
    jobKey .. ':processed', jobKey .. ':failed', jobKey .. ':unsuccessful')
end
--[[
  Check if this job has a parent. If so we will just remove it from
  the parent child list, but if it is the last child we should move the parent to "wait/paused"
  which requires code from "moveToFinished"
]]
-- Includes
--[[
  Function to add job in target list and add marker if needed.
]]
-- Includes
--[[
  Add marker if needed when a job is available.
]]
local function addBaseMarkerIfNeeded(markerKey, isPausedOrMaxed)
  if not isPausedOrMaxed then
    rcall("ZADD", markerKey, 0, "0")
  end  
end
local function addJobInTargetList(targetKey, markerKey, pushCmd, isPausedOrMaxed, jobId)
  rcall(pushCmd, targetKey, jobId)
  addBaseMarkerIfNeeded(markerKey, isPausedOrMaxed)
end
--[[
  Functions to destructure job key.
  Just a bit of warning, these functions may be a bit slow and affect performance significantly.
]]
local getJobIdFromKey = function (jobKey)
  return string.match(jobKey, ".*:(.*)")
end
local getJobKeyPrefix = function (jobKey, jobId)
  return string.sub(jobKey, 0, #jobKey - #jobId)
end
--[[
  Function to check for the meta.paused key to decide if we are paused or not
  (since an empty list and !EXISTS are not really the same).
]]
local function getTargetQueueList(queueMetaKey, activeKey, waitKey, pausedKey)
  local queueAttributes = rcall("HMGET", queueMetaKey, "paused", "concurrency", "max", "duration")
  if queueAttributes[1] then
    return pausedKey, true, queueAttributes[3], queueAttributes[4]
  else
    if queueAttributes[2] then
      local activeCount = rcall("LLEN", activeKey)
      if activeCount >= tonumber(queueAttributes[2]) then
        return waitKey, true, queueAttributes[3], queueAttributes[4]
      else
        return waitKey, false, queueAttributes[3], queueAttributes[4]
      end
    end
  end
  return waitKey, false, queueAttributes[3], queueAttributes[4]
end
local function _moveParentToWait(parentPrefix, parentId, emitEvent)
  local parentTarget, isPausedOrMaxed = getTargetQueueList(parentPrefix .. "meta", parentPrefix .. "active",
    parentPrefix .. "wait", parentPrefix .. "paused")
  addJobInTargetList(parentTarget, parentPrefix .. "marker", "RPUSH", isPausedOrMaxed, parentId)
  if emitEvent then
    local parentEventStream = parentPrefix .. "events"
    rcall("XADD", parentEventStream, "*", "event", "waiting", "jobId", parentId, "prev", "waiting-children")
  end
end
local function removeParentDependencyKey(jobKey, hard, parentKey, baseKey, debounceId)
  if parentKey then
    local parentDependenciesKey = parentKey .. ":dependencies"
    local result = rcall("SREM", parentDependenciesKey, jobKey)
    if result > 0 then
      local pendingDependencies = rcall("SCARD", parentDependenciesKey)
      if pendingDependencies == 0 then
        local parentId = getJobIdFromKey(parentKey)
        local parentPrefix = getJobKeyPrefix(parentKey, parentId)
        local numRemovedElements = rcall("ZREM", parentPrefix .. "waiting-children", parentId)
        if numRemovedElements == 1 then
          if hard then -- remove parent in same queue
            if parentPrefix == baseKey then
              removeParentDependencyKey(parentKey, hard, nil, baseKey, nil)
              removeJobKeys(parentKey)
              if debounceId then
                rcall("DEL", parentPrefix .. "de:" .. debounceId)
              end
            else
              _moveParentToWait(parentPrefix, parentId)
            end
          else
            _moveParentToWait(parentPrefix, parentId, true)
          end
        end
      end
      return true
    end
  else
    local parentAttributes = rcall("HMGET", jobKey, "parentKey", "deid")
    local missedParentKey = parentAttributes[1]
    if( (type(missedParentKey) == "string") and missedParentKey ~= ""
      and (rcall("EXISTS", missedParentKey) == 1)) then
      local parentDependenciesKey = missedParentKey .. ":dependencies"
      local result = rcall("SREM", parentDependenciesKey, jobKey)
      if result > 0 then
        local pendingDependencies = rcall("SCARD", parentDependenciesKey)
        if pendingDependencies == 0 then
          local parentId = getJobIdFromKey(missedParentKey)
          local parentPrefix = getJobKeyPrefix(missedParentKey, parentId)
          local numRemovedElements = rcall("ZREM", parentPrefix .. "waiting-children", parentId)
          if numRemovedElements == 1 then
            if hard then
              if parentPrefix == baseKey then
                removeParentDependencyKey(missedParentKey, hard, nil, baseKey, nil)
                removeJobKeys(missedParentKey)
                if parentAttributes[2] then
                  rcall("DEL", parentPrefix .. "de:" .. parentAttributes[2])
                end
              else
                _moveParentToWait(parentPrefix, parentId)
              end
            else
              _moveParentToWait(parentPrefix, parentId, true)
            end
          end
        end
        return true
      end
    end
  end
  return false
end
local function removeJob(jobId, hard, baseKey, shouldRemoveDeduplicationKey)
  local jobKey = baseKey .. jobId
  removeParentDependencyKey(jobKey, hard, nil, baseKey)
  if shouldRemoveDeduplicationKey then
    local deduplicationId = rcall("HGET", jobKey, "deid")
    removeDeduplicationKeyIfNeededOnRemoval(baseKey, jobId, deduplicationId)
  end
  removeJobKeys(jobKey)
end
local function removeJobs(keys, hard, baseKey, max)
  for i, key in ipairs(keys) do
    removeJob(key, hard, baseKey, true --[[remove debounce key]])
  end
  return max - #keys
end
local function getListItems(keyName, max)
  return rcall('LRANGE', keyName, 0, max - 1)
end
local function removeListJobs(keyName, hard, baseKey, max, jobsToIgnore)
  local jobs = getListItems(keyName, max)
  if jobsToIgnore then
    jobs = filterOutJobsToIgnore(jobs, jobsToIgnore)
  end
  local count = removeJobs(jobs, hard, baseKey, max)
  rcall("LTRIM", keyName, #jobs, -1)
  return count
end
-- Includes
--[[
  Function to loop in batches.
  Just a bit of warning, some commands as ZREM
  could receive a maximum of 7000 parameters per call.
]]
local function batches(n, batchSize)
  local i = 0
  return function()
    local from = i * batchSize + 1
    i = i + 1
    if (from <= n) then
      local to = math.min(from + batchSize - 1, n)
      return from, to
    end
  end
end
--[[
  Function to get ZSet items.
]]
local function getZSetItems(keyName, max)
  return rcall('ZRANGE', keyName, 0, max - 1)
end
local function removeZSetJobs(keyName, hard, baseKey, max, jobsToIgnore)
  local jobs = getZSetItems(keyName, max)
  if jobsToIgnore then
    jobs = filterOutJobsToIgnore(jobs, jobsToIgnore)
  end
  local count = removeJobs(jobs, hard, baseKey, max)
  if(#jobs > 0) then
    for from, to in batches(#jobs, 7000) do
      rcall("ZREM", keyName, unpack(jobs, from, to))
    end
  end
  return count
end
-- We must not remove delayed jobs if they are associated to a job scheduler.
local scheduledJobs = {}
local jobSchedulers = rcall("ZRANGE", KEYS[5], 0, -1, "WITHSCORES")
-- For every job scheduler, get the current delayed job id.
for i = 1, #jobSchedulers, 2 do
    local jobSchedulerId = jobSchedulers[i]
    local jobSchedulerMillis = jobSchedulers[i + 1]
    local delayedJobId = "repeat:" .. jobSchedulerId .. ":" .. jobSchedulerMillis
    scheduledJobs[delayedJobId] = true
end
removeListJobs(KEYS[1], true, queueBaseKey, 0, scheduledJobs) -- wait
removeListJobs(KEYS[2], true, queueBaseKey, 0, scheduledJobs) -- paused
if ARGV[2] == "1" then
  removeZSetJobs(KEYS[3], true, queueBaseKey, 0, scheduledJobs) -- delayed
end
removeZSetJobs(KEYS[4], true, queueBaseKey, 0, scheduledJobs) -- prioritized
`,keys:5};a.s(["drain",0,od],438564);let oe={name:"extendLock",content:`--[[
  Extend lock and removes the job from the stalled set.
  Input:
    KEYS[1] 'lock',
    KEYS[2] 'stalled'
    ARGV[1]  token
    ARGV[2]  lock duration in milliseconds
    ARGV[3]  jobid
  Output:
    "1" if lock extented succesfully.
]]
local rcall = redis.call
if rcall("GET", KEYS[1]) == ARGV[1] then
  --   if rcall("SET", KEYS[1], ARGV[1], "PX", ARGV[2], "XX") then
  if rcall("SET", KEYS[1], ARGV[1], "PX", ARGV[2]) then
    rcall("SREM", KEYS[2], ARGV[3])
    return 1
  end
end
return 0
`,keys:2};a.s(["extendLock",0,oe],19165);let of={name:"extendLocks",content:`--[[
  Extend locks for multiple jobs and remove them from the stalled set if successful.
  Return the list of job IDs for which the operation failed.
  KEYS[1] = stalled key
  ARGV[1] = baseKey
  ARGV[2] = tokens
  ARGV[3] = jobIds
  ARGV[4] = lockDuration (ms)
  Output:
    An array of failed job IDs. If empty, all succeeded.
]]
local rcall = redis.call
local stalledKey = KEYS[1]
local baseKey = ARGV[1]
local tokens = cmsgpack.unpack(ARGV[2])
local jobIds = cmsgpack.unpack(ARGV[3])
local lockDuration = ARGV[4]
local jobCount = #jobIds
local failedJobs = {}
for i = 1, jobCount, 1 do
    local lockKey = baseKey .. jobIds[i] .. ':lock'
    local jobId = jobIds[i]
    local token = tokens[i]
    local currentToken = rcall("GET", lockKey)
    if currentToken then
        if currentToken == token then
            local setResult = rcall("SET", lockKey, token, "PX", lockDuration)
            if setResult then
                rcall("SREM", stalledKey, jobId)
            else
                table.insert(failedJobs, jobId)
            end
        else
            table.insert(failedJobs, jobId)
        end
    else
        table.insert(failedJobs, jobId)
    end
end
return failedJobs
`,keys:1};a.s(["extendLocks",0,of],634563);let og={name:"getCounts",content:`--[[
  Get counts per provided states
    Input:
      KEYS[1]    'prefix'
      ARGV[1...] types
]]
local rcall = redis.call;
local prefix = KEYS[1]
local results = {}
for i = 1, #ARGV do
  local stateKey = prefix .. ARGV[i]
  if ARGV[i] == "wait" or ARGV[i] == "paused" then
    -- Markers in waitlist DEPRECATED in v5: Remove in v6.
    local marker = rcall("LINDEX", stateKey, -1)
    if marker and string.sub(marker, 1, 2) == "0:" then
      local count = rcall("LLEN", stateKey)
      if count > 1 then
        rcall("RPOP", stateKey)
        results[#results+1] = count-1
      else
        results[#results+1] = 0
      end
    else
      results[#results+1] = rcall("LLEN", stateKey)
    end
  elseif ARGV[i] == "active" then
    results[#results+1] = rcall("LLEN", stateKey)
  else
    results[#results+1] = rcall("ZCARD", stateKey)
  end
end
return results
`,keys:1};a.s(["getCounts",0,og],900552);let oh={name:"getCountsPerPriority",content:`--[[
  Get counts per provided states
    Input:
      KEYS[1] wait key
      KEYS[2] paused key
      KEYS[3] meta key
      KEYS[4] prioritized key
      ARGV[1...] priorities
]]
local rcall = redis.call
local results = {}
local waitKey = KEYS[1]
local pausedKey = KEYS[2]
local prioritizedKey = KEYS[4]
-- Includes
--[[
  Function to check for the meta.paused key to decide if we are paused or not
  (since an empty list and !EXISTS are not really the same).
]]
local function isQueuePaused(queueMetaKey)
  return rcall("HEXISTS", queueMetaKey, "paused") == 1
end
for i = 1, #ARGV do
  local priority = tonumber(ARGV[i])
  if priority == 0 then
    if isQueuePaused(KEYS[3]) then
      results[#results+1] = rcall("LLEN", pausedKey)
    else
      results[#results+1] = rcall("LLEN", waitKey)
    end
  else
    results[#results+1] = rcall("ZCOUNT", prioritizedKey,
      priority * 0x100000000, (priority + 1)  * 0x100000000 - 1)
  end
end
return results
`,keys:4};a.s(["getCountsPerPriority",0,oh],322821);let oi={name:"getDependencyCounts",content:`--[[
  Get counts per child states
    Input:
      KEYS[1]    processed key
      KEYS[2]    unprocessed key
      KEYS[3]    ignored key
      KEYS[4]    failed key
      ARGV[1...] types
]]
local rcall = redis.call;
local processedKey = KEYS[1]
local unprocessedKey = KEYS[2]
local ignoredKey = KEYS[3]
local failedKey = KEYS[4]
local results = {}
for i = 1, #ARGV do
  if ARGV[i] == "processed" then
    results[#results+1] = rcall("HLEN", processedKey)
  elseif ARGV[i] == "unprocessed" then
    results[#results+1] = rcall("SCARD", unprocessedKey)
  elseif ARGV[i] == "ignored" then
    results[#results+1] = rcall("HLEN", ignoredKey)
  else
    results[#results+1] = rcall("ZCARD", failedKey)
  end
end
return results
`,keys:4};a.s(["getDependencyCounts",0,oi],436227);let oj={name:"getJobScheduler",content:`--[[
  Get job scheduler record.
  Input:
    KEYS[1] 'repeat' key
    ARGV[1] id
]]
local rcall = redis.call
local jobSchedulerKey = KEYS[1] .. ":" .. ARGV[1]
local score = rcall("ZSCORE", KEYS[1], ARGV[1])
if score then
  return {rcall("HGETALL", jobSchedulerKey), score} -- get job data
end
return {nil, nil}
`,keys:1};a.s(["getJobScheduler",0,oj],54650);let ok={name:"getMetrics",content:`--[[
  Get metrics
  Input:
    KEYS[1] 'metrics' key
    KEYS[2] 'metrics data' key
    ARGV[1] start index
    ARGV[2] end index
]]
local rcall = redis.call;
local metricsKey = KEYS[1]
local dataKey = KEYS[2]
local metrics = rcall("HMGET", metricsKey, "count", "prevTS", "prevCount")
local data = rcall("LRANGE", dataKey, tonumber(ARGV[1]), tonumber(ARGV[2]))
local numPoints = rcall("LLEN", dataKey)
return {metrics, data, numPoints}
`,keys:2};a.s(["getMetrics",0,ok],284762);let ol={name:"getRanges",content:`--[[
  Get job ids per provided states
    Input:
      KEYS[1]    'prefix'
      ARGV[1]    start
      ARGV[2]    end
      ARGV[3]    asc
      ARGV[4...] types
]]
local rcall = redis.call
local prefix = KEYS[1]
local rangeStart = tonumber(ARGV[1])
local rangeEnd = tonumber(ARGV[2])
local asc = ARGV[3]
local results = {}
local function getRangeInList(listKey, asc, rangeStart, rangeEnd, results)
  if asc == "1" then
    local modifiedRangeStart
    local modifiedRangeEnd
    if rangeStart == -1 then
      modifiedRangeStart = 0
    else
      modifiedRangeStart = -(rangeStart + 1)
    end
    if rangeEnd == -1 then
      modifiedRangeEnd = 0
    else
      modifiedRangeEnd = -(rangeEnd + 1)
    end
    results[#results+1] = rcall("LRANGE", listKey,
      modifiedRangeEnd,
      modifiedRangeStart)
  else
    results[#results+1] = rcall("LRANGE", listKey, rangeStart, rangeEnd)
  end
end
for i = 4, #ARGV do
  local stateKey = prefix .. ARGV[i]
  if ARGV[i] == "wait" or ARGV[i] == "paused" then
    -- Markers in waitlist DEPRECATED in v5: Remove in v6.
    local marker = rcall("LINDEX", stateKey, -1)
    if marker and string.sub(marker, 1, 2) == "0:" then
      local count = rcall("LLEN", stateKey)
      if count > 1 then
        rcall("RPOP", stateKey)
        getRangeInList(stateKey, asc, rangeStart, rangeEnd, results)
      else
        results[#results+1] = {}
      end
    else
      getRangeInList(stateKey, asc, rangeStart, rangeEnd, results)
    end
  elseif ARGV[i] == "active" then
    getRangeInList(stateKey, asc, rangeStart, rangeEnd, results)
  else
    if asc == "1" then
      results[#results+1] = rcall("ZRANGE", stateKey, rangeStart, rangeEnd)
    else
      results[#results+1] = rcall("ZREVRANGE", stateKey, rangeStart, rangeEnd)
    end
  end
end
return results
`,keys:1};a.s(["getRanges",0,ol],77930);let om={name:"getRateLimitTtl",content:`--[[
  Get rate limit ttl
    Input:
      KEYS[1] 'limiter'
      KEYS[2] 'meta'
      ARGV[1] maxJobs
]]
local rcall = redis.call
-- Includes
--[[
  Function to get current rate limit ttl.
]]
local function getRateLimitTTL(maxJobs, rateLimiterKey)
  if maxJobs and maxJobs <= tonumber(rcall("GET", rateLimiterKey) or 0) then
    local pttl = rcall("PTTL", rateLimiterKey)
    if pttl == 0 then
      rcall("DEL", rateLimiterKey)
    end
    if pttl > 0 then
      return pttl
    end
  end
  return 0
end
local rateLimiterKey = KEYS[1]
if ARGV[1] ~= "0" then
  return getRateLimitTTL(tonumber(ARGV[1]), rateLimiterKey)
else
  local rateLimitMax = rcall("HGET", KEYS[2], "max")
  if rateLimitMax then
    return getRateLimitTTL(tonumber(rateLimitMax), rateLimiterKey)
  end
  return rcall("PTTL", rateLimiterKey)
end
`,keys:2};a.s(["getRateLimitTtl",0,om],699422);let on={name:"getState",content:`--[[
  Get a job state
  Input: 
    KEYS[1] 'completed' key,
    KEYS[2] 'failed' key
    KEYS[3] 'delayed' key
    KEYS[4] 'active' key
    KEYS[5] 'wait' key
    KEYS[6] 'paused' key
    KEYS[7] 'waiting-children' key
    KEYS[8] 'prioritized' key
    ARGV[1] job id
  Output:
    'completed'
    'failed'
    'delayed'
    'active'
    'prioritized'
    'waiting'
    'waiting-children'
    'unknown'
]]
local rcall = redis.call
if rcall("ZSCORE", KEYS[1], ARGV[1]) then
  return "completed"
end
if rcall("ZSCORE", KEYS[2], ARGV[1]) then
  return "failed"
end
if rcall("ZSCORE", KEYS[3], ARGV[1]) then
  return "delayed"
end
if rcall("ZSCORE", KEYS[8], ARGV[1]) then
  return "prioritized"
end
-- Includes
--[[
  Functions to check if a item belongs to a list.
]]
local function checkItemInList(list, item)
  for _, v in pairs(list) do
    if v == item then
      return 1
    end
  end
  return nil
end
local active_items = rcall("LRANGE", KEYS[4] , 0, -1)
if checkItemInList(active_items, ARGV[1]) ~= nil then
  return "active"
end
local wait_items = rcall("LRANGE", KEYS[5] , 0, -1)
if checkItemInList(wait_items, ARGV[1]) ~= nil then
  return "waiting"
end
local paused_items = rcall("LRANGE", KEYS[6] , 0, -1)
if checkItemInList(paused_items, ARGV[1]) ~= nil then
  return "waiting"
end
if rcall("ZSCORE", KEYS[7], ARGV[1]) then
  return "waiting-children"
end
return "unknown"
`,keys:8};a.s(["getState",0,on],260312);let oo={name:"getStateV2",content:`--[[
  Get a job state
  Input: 
    KEYS[1] 'completed' key,
    KEYS[2] 'failed' key
    KEYS[3] 'delayed' key
    KEYS[4] 'active' key
    KEYS[5] 'wait' key
    KEYS[6] 'paused' key
    KEYS[7] 'waiting-children' key
    KEYS[8] 'prioritized' key
    ARGV[1] job id
  Output:
    'completed'
    'failed'
    'delayed'
    'active'
    'waiting'
    'waiting-children'
    'unknown'
]]
local rcall = redis.call
if rcall("ZSCORE", KEYS[1], ARGV[1]) then
  return "completed"
end
if rcall("ZSCORE", KEYS[2], ARGV[1]) then
  return "failed"
end
if rcall("ZSCORE", KEYS[3], ARGV[1]) then
  return "delayed"
end
if rcall("ZSCORE", KEYS[8], ARGV[1]) then
  return "prioritized"
end
if rcall("LPOS", KEYS[4] , ARGV[1]) then
  return "active"
end
if rcall("LPOS", KEYS[5] , ARGV[1]) then
  return "waiting"
end
if rcall("LPOS", KEYS[6] , ARGV[1]) then
  return "waiting"
end
if rcall("ZSCORE", KEYS[7] , ARGV[1]) then
  return "waiting-children"
end
return "unknown"
`,keys:8};a.s(["getStateV2",0,oo],940649);let op={name:"isFinished",content:`--[[
  Checks if a job is finished (.i.e. is in the completed or failed set)
  Input: 
    KEYS[1] completed key
    KEYS[2] failed key
    KEYS[3] job key
    ARGV[1] job id
    ARGV[2] return value?
  Output:
    0 - Not finished.
    1 - Completed.
    2 - Failed.
   -1 - Missing job. 
]]
local rcall = redis.call
if rcall("EXISTS", KEYS[3]) ~= 1 then
  if ARGV[2] == "1" then
    return {-1,"Missing key for job " .. KEYS[3] .. ". isFinished"}
  end  
  return -1
end
if rcall("ZSCORE", KEYS[1], ARGV[1]) then
  if ARGV[2] == "1" then
    local returnValue = rcall("HGET", KEYS[3], "returnvalue")
    return {1,returnValue}
  end
  return 1
end
if rcall("ZSCORE", KEYS[2], ARGV[1]) then
  if ARGV[2] == "1" then
    local failedReason = rcall("HGET", KEYS[3], "failedReason")
    return {2,failedReason}
  end
  return 2
end
if ARGV[2] == "1" then
  return {0}
end
return 0
`,keys:3};a.s(["isFinished",0,op],182886);let oq={name:"isJobInList",content:`--[[
  Checks if job is in a given list.
  Input:
    KEYS[1]
    ARGV[1]
  Output:
    1 if element found in the list.
]]
-- Includes
--[[
  Functions to check if a item belongs to a list.
]]
local function checkItemInList(list, item)
  for _, v in pairs(list) do
    if v == item then
      return 1
    end
  end
  return nil
end
local items = redis.call("LRANGE", KEYS[1] , 0, -1)
return checkItemInList(items, ARGV[1])
`,keys:1};a.s(["isJobInList",0,oq],47199);let or={name:"isMaxed",content:`--[[
  Checks if queue is maxed.
  Input:
    KEYS[1] meta key
    KEYS[2] active key
  Output:
    1 if element found in the list.
]]
local rcall = redis.call
-- Includes
--[[
  Function to check if queue is maxed or not.
]]
local function isQueueMaxed(queueMetaKey, activeKey)
  local maxConcurrency = rcall("HGET", queueMetaKey, "concurrency")
  if maxConcurrency then
    local activeCount = rcall("LLEN", activeKey)
    if activeCount >= tonumber(maxConcurrency) then
      return true
    end
  end
  return false
end
return isQueueMaxed(KEYS[1], KEYS[2])
`,keys:2};a.s(["isMaxed",0,or],874170);let os={name:"moveJobFromActiveToWait",content:`--[[
  Function to move job from active state to wait.
  Input:
    KEYS[1]  active key
    KEYS[2]  wait key
    KEYS[3]  stalled key
    KEYS[4]  paused key
    KEYS[5]  meta key
    KEYS[6]  limiter key
    KEYS[7]  prioritized key
    KEYS[8]  marker key
    KEYS[9]  event key
    ARGV[1] job id
    ARGV[2] lock token
    ARGV[3] job id key
]]
local rcall = redis.call
-- Includes
--[[
  Function to add job in target list and add marker if needed.
]]
-- Includes
--[[
  Add marker if needed when a job is available.
]]
local function addBaseMarkerIfNeeded(markerKey, isPausedOrMaxed)
  if not isPausedOrMaxed then
    rcall("ZADD", markerKey, 0, "0")
  end  
end
local function addJobInTargetList(targetKey, markerKey, pushCmd, isPausedOrMaxed, jobId)
  rcall(pushCmd, targetKey, jobId)
  addBaseMarkerIfNeeded(markerKey, isPausedOrMaxed)
end
--[[
  Function to push back job considering priority in front of same prioritized jobs.
]]
local function pushBackJobWithPriority(prioritizedKey, priority, jobId)
  -- in order to put it at front of same prioritized jobs
  -- we consider prioritized counter as 0
  local score = priority * 0x100000000
  rcall("ZADD", prioritizedKey, score, jobId)
end
--[[
  Function to get max events value or set by default 10000.
]]
local function getOrSetMaxEvents(metaKey)
  local maxEvents = rcall("HGET", metaKey, "opts.maxLenEvents")
  if not maxEvents then
    maxEvents = 10000
    rcall("HSET", metaKey, "opts.maxLenEvents", maxEvents)
  end
  return maxEvents
end
--[[
  Function to check for the meta.paused key to decide if we are paused or not
  (since an empty list and !EXISTS are not really the same).
]]
local function getTargetQueueList(queueMetaKey, activeKey, waitKey, pausedKey)
  local queueAttributes = rcall("HMGET", queueMetaKey, "paused", "concurrency", "max", "duration")
  if queueAttributes[1] then
    return pausedKey, true, queueAttributes[3], queueAttributes[4]
  else
    if queueAttributes[2] then
      local activeCount = rcall("LLEN", activeKey)
      if activeCount >= tonumber(queueAttributes[2]) then
        return waitKey, true, queueAttributes[3], queueAttributes[4]
      else
        return waitKey, false, queueAttributes[3], queueAttributes[4]
      end
    end
  end
  return waitKey, false, queueAttributes[3], queueAttributes[4]
end
local function removeLock(jobKey, stalledKey, token, jobId)
  if token ~= "0" then
    local lockKey = jobKey .. ':lock'
    local lockToken = rcall("GET", lockKey)
    if lockToken == token then
      rcall("DEL", lockKey)
      rcall("SREM", stalledKey, jobId)
    else
      if lockToken then
        -- Lock exists but token does not match
        return -6
      else
        -- Lock is missing completely
        return -2
      end
    end
  end
  return 0
end
local jobId = ARGV[1]
local token = ARGV[2]
local jobKey = ARGV[3]
if rcall("EXISTS", jobKey) == 0 then
  return -1
end
local errorCode = removeLock(jobKey, KEYS[3], token, jobId)
if errorCode < 0 then
  return errorCode
end
local metaKey = KEYS[5]
local removed = rcall("LREM", KEYS[1], 1, jobId)
if removed > 0 then
  local target, isPausedOrMaxed = getTargetQueueList(metaKey, KEYS[1], KEYS[2], KEYS[4])
  local priority = tonumber(rcall("HGET", ARGV[3], "priority")) or 0
  if priority > 0 then
    pushBackJobWithPriority(KEYS[7], priority, jobId)
  else
    addJobInTargetList(target, KEYS[8], "RPUSH", isPausedOrMaxed, jobId)
  end
  local maxEvents = getOrSetMaxEvents(metaKey)
  -- Emit waiting event
  rcall("XADD", KEYS[9], "MAXLEN", "~", maxEvents, "*", "event", "waiting",
    "jobId", jobId, "prev", "active")
end
local pttl = rcall("PTTL", KEYS[6])
if pttl > 0 then
  return pttl
else
  return 0
end
`,keys:9};a.s(["moveJobFromActiveToWait",0,os],938677);let ot={name:"moveJobsToWait",content:`--[[
  Move completed, failed or delayed jobs to wait.
  Note: Does not support jobs with priorities.
  Input:
    KEYS[1] base key
    KEYS[2] events stream
    KEYS[3] state key (failed, completed, delayed)
    KEYS[4] 'wait'
    KEYS[5] 'paused'
    KEYS[6] 'meta'
    KEYS[7] 'active'
    KEYS[8] 'marker'
    ARGV[1] count
    ARGV[2] timestamp
    ARGV[3] prev state
  Output:
    1  means the operation is not completed
    0  means the operation is completed
]]
local maxCount = tonumber(ARGV[1])
local timestamp = tonumber(ARGV[2])
local rcall = redis.call;
-- Includes
--[[
  Add marker if needed when a job is available.
]]
local function addBaseMarkerIfNeeded(markerKey, isPausedOrMaxed)
  if not isPausedOrMaxed then
    rcall("ZADD", markerKey, 0, "0")
  end  
end
--[[
  Function to loop in batches.
  Just a bit of warning, some commands as ZREM
  could receive a maximum of 7000 parameters per call.
]]
local function batches(n, batchSize)
  local i = 0
  return function()
    local from = i * batchSize + 1
    i = i + 1
    if (from <= n) then
      local to = math.min(from + batchSize - 1, n)
      return from, to
    end
  end
end
--[[
  Function to get max events value or set by default 10000.
]]
local function getOrSetMaxEvents(metaKey)
  local maxEvents = rcall("HGET", metaKey, "opts.maxLenEvents")
  if not maxEvents then
    maxEvents = 10000
    rcall("HSET", metaKey, "opts.maxLenEvents", maxEvents)
  end
  return maxEvents
end
--[[
  Function to check for the meta.paused key to decide if we are paused or not
  (since an empty list and !EXISTS are not really the same).
]]
local function getTargetQueueList(queueMetaKey, activeKey, waitKey, pausedKey)
  local queueAttributes = rcall("HMGET", queueMetaKey, "paused", "concurrency", "max", "duration")
  if queueAttributes[1] then
    return pausedKey, true, queueAttributes[3], queueAttributes[4]
  else
    if queueAttributes[2] then
      local activeCount = rcall("LLEN", activeKey)
      if activeCount >= tonumber(queueAttributes[2]) then
        return waitKey, true, queueAttributes[3], queueAttributes[4]
      else
        return waitKey, false, queueAttributes[3], queueAttributes[4]
      end
    end
  end
  return waitKey, false, queueAttributes[3], queueAttributes[4]
end
local metaKey = KEYS[6]
local target, isPausedOrMaxed = getTargetQueueList(metaKey, KEYS[7], KEYS[4], KEYS[5])
local jobs = rcall('ZRANGEBYSCORE', KEYS[3], 0, timestamp, 'LIMIT', 0, maxCount)
if (#jobs > 0) then
    if ARGV[3] == "failed" then
        for i, key in ipairs(jobs) do
            local jobKey = KEYS[1] .. key
            rcall("HDEL", jobKey, "finishedOn", "processedOn", "failedReason")
        end
    elseif ARGV[3] == "completed" then
        for i, key in ipairs(jobs) do
            local jobKey = KEYS[1] .. key
            rcall("HDEL", jobKey, "finishedOn", "processedOn", "returnvalue")
        end
    end
    local maxEvents = getOrSetMaxEvents(metaKey)
    for i, key in ipairs(jobs) do
        -- Emit waiting event
        rcall("XADD", KEYS[2], "MAXLEN", "~", maxEvents, "*", "event",
              "waiting", "jobId", key, "prev", ARGV[3]);
    end
    for from, to in batches(#jobs, 7000) do
        rcall("ZREM", KEYS[3], unpack(jobs, from, to))
        rcall("LPUSH", target, unpack(jobs, from, to))
    end
    addBaseMarkerIfNeeded(KEYS[8], isPausedOrMaxed)
end
maxCount = maxCount - #jobs
if (maxCount <= 0) then return 1 end
return 0
`,keys:8};a.s(["moveJobsToWait",0,ot],274909);let ou={name:"moveStalledJobsToWait",content:`--[[
  Move stalled jobs to wait.
    Input:
      KEYS[1] 'stalled' (SET)
      KEYS[2] 'wait',   (LIST)
      KEYS[3] 'active', (LIST)
      KEYS[4] 'stalled-check', (KEY)
      KEYS[5] 'meta', (KEY)
      KEYS[6] 'paused', (LIST)
      KEYS[7] 'marker'
      KEYS[8] 'event stream' (STREAM)
      ARGV[1]  Max stalled job count
      ARGV[2]  queue.toKey('')
      ARGV[3]  timestamp
      ARGV[4]  max check time
    Events:
      'stalled' with stalled job id.
]]
local rcall = redis.call
-- Includes
--[[
  Function to add job in target list and add marker if needed.
]]
-- Includes
--[[
  Add marker if needed when a job is available.
]]
local function addBaseMarkerIfNeeded(markerKey, isPausedOrMaxed)
  if not isPausedOrMaxed then
    rcall("ZADD", markerKey, 0, "0")
  end  
end
local function addJobInTargetList(targetKey, markerKey, pushCmd, isPausedOrMaxed, jobId)
  rcall(pushCmd, targetKey, jobId)
  addBaseMarkerIfNeeded(markerKey, isPausedOrMaxed)
end
--[[
  Function to loop in batches.
  Just a bit of warning, some commands as ZREM
  could receive a maximum of 7000 parameters per call.
]]
local function batches(n, batchSize)
  local i = 0
  return function()
    local from = i * batchSize + 1
    i = i + 1
    if (from <= n) then
      local to = math.min(from + batchSize - 1, n)
      return from, to
    end
  end
end
--[[
  Function to move job to wait to be picked up by a waiting worker.
]]
-- Includes
--[[
  Function to check for the meta.paused key to decide if we are paused or not
  (since an empty list and !EXISTS are not really the same).
]]
local function getTargetQueueList(queueMetaKey, activeKey, waitKey, pausedKey)
  local queueAttributes = rcall("HMGET", queueMetaKey, "paused", "concurrency", "max", "duration")
  if queueAttributes[1] then
    return pausedKey, true, queueAttributes[3], queueAttributes[4]
  else
    if queueAttributes[2] then
      local activeCount = rcall("LLEN", activeKey)
      if activeCount >= tonumber(queueAttributes[2]) then
        return waitKey, true, queueAttributes[3], queueAttributes[4]
      else
        return waitKey, false, queueAttributes[3], queueAttributes[4]
      end
    end
  end
  return waitKey, false, queueAttributes[3], queueAttributes[4]
end
local function moveJobToWait(metaKey, activeKey, waitKey, pausedKey, markerKey, eventStreamKey,
  jobId, pushCmd)
  local target, isPausedOrMaxed = getTargetQueueList(metaKey, activeKey, waitKey, pausedKey)
  addJobInTargetList(target, markerKey, pushCmd, isPausedOrMaxed, jobId)
  rcall("XADD", eventStreamKey, "*", "event", "waiting", "jobId", jobId, 'prev', 'active')
end
--[[
  Function to trim events, default 10000.
]]
-- Includes
--[[
  Function to get max events value or set by default 10000.
]]
local function getOrSetMaxEvents(metaKey)
  local maxEvents = rcall("HGET", metaKey, "opts.maxLenEvents")
  if not maxEvents then
    maxEvents = 10000
    rcall("HSET", metaKey, "opts.maxLenEvents", maxEvents)
  end
  return maxEvents
end
local function trimEvents(metaKey, eventStreamKey)
  local maxEvents = getOrSetMaxEvents(metaKey)
  if maxEvents then
    rcall("XTRIM", eventStreamKey, "MAXLEN", "~", maxEvents)
  else
    rcall("XTRIM", eventStreamKey, "MAXLEN", "~", 10000)
  end
end
local stalledKey = KEYS[1]
local waitKey = KEYS[2]
local activeKey = KEYS[3]
local stalledCheckKey = KEYS[4]
local metaKey = KEYS[5]
local pausedKey = KEYS[6]
local markerKey = KEYS[7]
local eventStreamKey = KEYS[8]
local maxStalledJobCount = tonumber(ARGV[1])
local queueKeyPrefix = ARGV[2]
local timestamp = ARGV[3]
local maxCheckTime = ARGV[4]
if rcall("EXISTS", stalledCheckKey) == 1 then
    return {}
end
rcall("SET", stalledCheckKey, timestamp, "PX", maxCheckTime)
-- Trim events before emiting them to avoid trimming events emitted in this script
trimEvents(metaKey, eventStreamKey)
-- Move all stalled jobs to wait
local stalling = rcall('SMEMBERS', stalledKey)
local stalled = {}
if (#stalling > 0) then
    rcall('DEL', stalledKey)
    -- Remove from active list
    for i, jobId in ipairs(stalling) do
        -- Markers in waitlist DEPRECATED in v5: Remove in v6.
        if string.sub(jobId, 1, 2) == "0:" then
            -- If the jobId is a delay marker ID we just remove it.
            rcall("LREM", activeKey, 1, jobId)
        else
            local jobKey = queueKeyPrefix .. jobId
            -- Check that the lock is also missing, then we can handle this job as really stalled.
            if (rcall("EXISTS", jobKey .. ":lock") == 0) then
                --  Remove from the active queue.
                local removed = rcall("LREM", activeKey, 1, jobId)
                if (removed > 0) then
                    -- If this job has been stalled too many times, such as if it crashes the worker, then fail it.
                    local stalledCount = rcall("HINCRBY", jobKey, "stc", 1)
                    -- Check if this is a repeatable job by looking at job options
                    local jobOpts = rcall("HGET", jobKey, "opts")
                    local isRepeatableJob = false
                    if jobOpts then
                        local opts = cjson.decode(jobOpts)
                        if opts and opts["repeat"] then
                            isRepeatableJob = true
                        end
                    end
                    -- Only fail job if it exceeds stall limit AND is not a repeatable job
                    if stalledCount > maxStalledJobCount and not isRepeatableJob then
                        local failedReason = "job stalled more than allowable limit"
                        rcall("HSET", jobKey, "defa", failedReason)
                    end
                    moveJobToWait(metaKey, activeKey, waitKey, pausedKey, markerKey, eventStreamKey, jobId,
                        "RPUSH")
                    -- Emit the stalled event
                    rcall("XADD", eventStreamKey, "*", "event", "stalled", "jobId", jobId)
                    table.insert(stalled, jobId)
                end
            end
        end
    end
end
-- Mark potentially stalled jobs
local active = rcall('LRANGE', activeKey, 0, -1)
if (#active > 0) then
    for from, to in batches(#active, 7000) do
        rcall('SADD', stalledKey, unpack(active, from, to))
    end
end
return stalled
`,keys:8};a.s(["moveStalledJobsToWait",0,ou],974753);let ov={name:"moveToActive",content:`--[[
  Move next job to be processed to active, lock it and fetch its data. The job
  may be delayed, in that case we need to move it to the delayed set instead.
  This operation guarantees that the worker owns the job during the lock
  expiration time. The worker is responsible of keeping the lock fresh
  so that no other worker picks this job again.
  Input:
    KEYS[1] wait key
    KEYS[2] active key
    KEYS[3] prioritized key
    KEYS[4] stream events key
    KEYS[5] stalled key
    -- Rate limiting
    KEYS[6] rate limiter key
    KEYS[7] delayed key
    -- Delayed jobs
    KEYS[8] paused key
    KEYS[9] meta key
    KEYS[10] pc priority counter
    -- Marker
    KEYS[11] marker key
    -- Arguments
    ARGV[1] key prefix
    ARGV[2] timestamp
    ARGV[3] opts
    opts - token - lock token
    opts - lockDuration
    opts - limiter
    opts - name - worker name
]]
local rcall = redis.call
local waitKey = KEYS[1]
local activeKey = KEYS[2]
local eventStreamKey = KEYS[4]
local rateLimiterKey = KEYS[6]
local delayedKey = KEYS[7]
local opts = cmsgpack.unpack(ARGV[3])
-- Includes
--[[
  Function to return the next delayed job timestamp.
]]
local function getNextDelayedTimestamp(delayedKey)
  local result = rcall("ZRANGE", delayedKey, 0, 0, "WITHSCORES")
  if #result then
    local nextTimestamp = tonumber(result[2])
    if nextTimestamp ~= nil then
      return nextTimestamp / 0x1000
    end
  end
end
--[[
  Function to get current rate limit ttl.
]]
local function getRateLimitTTL(maxJobs, rateLimiterKey)
  if maxJobs and maxJobs <= tonumber(rcall("GET", rateLimiterKey) or 0) then
    local pttl = rcall("PTTL", rateLimiterKey)
    if pttl == 0 then
      rcall("DEL", rateLimiterKey)
    end
    if pttl > 0 then
      return pttl
    end
  end
  return 0
end
--[[
  Function to check for the meta.paused key to decide if we are paused or not
  (since an empty list and !EXISTS are not really the same).
]]
local function getTargetQueueList(queueMetaKey, activeKey, waitKey, pausedKey)
  local queueAttributes = rcall("HMGET", queueMetaKey, "paused", "concurrency", "max", "duration")
  if queueAttributes[1] then
    return pausedKey, true, queueAttributes[3], queueAttributes[4]
  else
    if queueAttributes[2] then
      local activeCount = rcall("LLEN", activeKey)
      if activeCount >= tonumber(queueAttributes[2]) then
        return waitKey, true, queueAttributes[3], queueAttributes[4]
      else
        return waitKey, false, queueAttributes[3], queueAttributes[4]
      end
    end
  end
  return waitKey, false, queueAttributes[3], queueAttributes[4]
end
--[[
  Function to move job from prioritized state to active.
]]
local function moveJobFromPrioritizedToActive(priorityKey, activeKey, priorityCounterKey)
  local prioritizedJob = rcall("ZPOPMIN", priorityKey)
  if #prioritizedJob > 0 then
    rcall("LPUSH", activeKey, prioritizedJob[1])
    return prioritizedJob[1]
  else
    rcall("DEL", priorityCounterKey)
  end
end
--[[
  Function to move job from wait state to active.
  Input:
    opts - token - lock token
    opts - lockDuration
    opts - limiter
]]
-- Includes
--[[
  Add marker if needed when a job is available.
]]
local function addBaseMarkerIfNeeded(markerKey, isPausedOrMaxed)
  if not isPausedOrMaxed then
    rcall("ZADD", markerKey, 0, "0")
  end  
end
local function prepareJobForProcessing(keyPrefix, rateLimiterKey, eventStreamKey,
    jobId, processedOn, maxJobs, limiterDuration, markerKey, opts)
  local jobKey = keyPrefix .. jobId
  -- Check if we need to perform rate limiting.
  if maxJobs then
    local jobCounter = tonumber(rcall("INCR", rateLimiterKey))
    if jobCounter == 1 then
      local integerDuration = math.floor(math.abs(limiterDuration))
      rcall("PEXPIRE", rateLimiterKey, integerDuration)
    end
  end
  -- get a lock
  if opts['token'] ~= "0" then
    local lockKey = jobKey .. ':lock'
    rcall("SET", lockKey, opts['token'], "PX", opts['lockDuration'])
  end
  local optionalValues = {}
  if opts['name'] then
    -- Set "processedBy" field to the worker name
    table.insert(optionalValues, "pb")
    table.insert(optionalValues, opts['name'])
  end
  rcall("XADD", eventStreamKey, "*", "event", "active", "jobId", jobId, "prev", "waiting")
  rcall("HMSET", jobKey, "processedOn", processedOn, unpack(optionalValues))
  rcall("HINCRBY", jobKey, "ats", 1)
  addBaseMarkerIfNeeded(markerKey, false)
  -- rate limit delay must be 0 in this case to prevent adding more delay
  -- when job that is moved to active needs to be processed
  return {rcall("HGETALL", jobKey), jobId, 0, 0} -- get job data
end
--[[
  Updates the delay set, by moving delayed jobs that should
  be processed now to "wait".
     Events:
      'waiting'
]]
-- Includes
--[[
  Function to add job in target list and add marker if needed.
]]
-- Includes
local function addJobInTargetList(targetKey, markerKey, pushCmd, isPausedOrMaxed, jobId)
  rcall(pushCmd, targetKey, jobId)
  addBaseMarkerIfNeeded(markerKey, isPausedOrMaxed)
end
--[[
  Function to add job considering priority.
]]
-- Includes
--[[
  Function to get priority score.
]]
local function getPriorityScore(priority, priorityCounterKey)
  local prioCounter = rcall("INCR", priorityCounterKey)
  return priority * 0x100000000 + prioCounter % 0x100000000
end
local function addJobWithPriority(markerKey, prioritizedKey, priority, jobId, priorityCounterKey,
  isPausedOrMaxed)
  local score = getPriorityScore(priority, priorityCounterKey)
  rcall("ZADD", prioritizedKey, score, jobId)
  addBaseMarkerIfNeeded(markerKey, isPausedOrMaxed)
end
-- Try to get as much as 1000 jobs at once
local function promoteDelayedJobs(delayedKey, markerKey, targetKey, prioritizedKey,
                                  eventStreamKey, prefix, timestamp, priorityCounterKey, isPaused)
    local jobs = rcall("ZRANGEBYSCORE", delayedKey, 0, (timestamp + 1) * 0x1000 - 1, "LIMIT", 0, 1000)
    if (#jobs > 0) then
        rcall("ZREM", delayedKey, unpack(jobs))
        for _, jobId in ipairs(jobs) do
            local jobKey = prefix .. jobId
            local priority =
                tonumber(rcall("HGET", jobKey, "priority")) or 0
            if priority == 0 then
                -- LIFO or FIFO
                rcall("LPUSH", targetKey, jobId)
            else
                local score = getPriorityScore(priority, priorityCounterKey)
                rcall("ZADD", prioritizedKey, score, jobId)
            end
            -- Emit waiting event
            rcall("XADD", eventStreamKey, "*", "event", "waiting", "jobId",
                  jobId, "prev", "delayed")
            rcall("HSET", jobKey, "delay", 0)
        end
        addBaseMarkerIfNeeded(markerKey, isPaused)
    end
end
local target, isPausedOrMaxed, rateLimitMax, rateLimitDuration = getTargetQueueList(KEYS[9],
    activeKey, waitKey, KEYS[8])
-- Check if there are delayed jobs that we can move to wait.
local markerKey = KEYS[11]
promoteDelayedJobs(delayedKey, markerKey, target, KEYS[3], eventStreamKey, ARGV[1],
                   ARGV[2], KEYS[10], isPausedOrMaxed)
local maxJobs = tonumber(rateLimitMax or (opts['limiter'] and opts['limiter']['max']))
local expireTime = getRateLimitTTL(maxJobs, rateLimiterKey)
-- Check if we are rate limited first.
if expireTime > 0 then return {0, 0, expireTime, 0} end
-- paused or maxed queue
if isPausedOrMaxed then return {0, 0, 0, 0} end
local limiterDuration = (opts['limiter'] and opts['limiter']['duration']) or rateLimitDuration
-- no job ID, try non-blocking move from wait to active
local jobId = rcall("RPOPLPUSH", waitKey, activeKey)
-- Markers in waitlist DEPRECATED in v5: Will be completely removed in v6.
if jobId and string.sub(jobId, 1, 2) == "0:" then
    rcall("LREM", activeKey, 1, jobId)
    jobId = rcall("RPOPLPUSH", waitKey, activeKey)
end
if jobId then
    return prepareJobForProcessing(ARGV[1], rateLimiterKey, eventStreamKey, jobId, ARGV[2],
                                   maxJobs, limiterDuration, markerKey, opts)
else
    jobId = moveJobFromPrioritizedToActive(KEYS[3], activeKey, KEYS[10])
    if jobId then
        return prepareJobForProcessing(ARGV[1], rateLimiterKey, eventStreamKey, jobId, ARGV[2],
                                       maxJobs, limiterDuration, markerKey, opts)
    end
end
-- Return the timestamp for the next delayed job if any.
local nextTimestamp = getNextDelayedTimestamp(delayedKey)
if nextTimestamp ~= nil then return {0, 0, 0, nextTimestamp} end
return {0, 0, 0, 0}
`,keys:11};a.s(["moveToActive",0,ov],949704);let ow={name:"moveToDelayed",content:`--[[
  Moves job from active to delayed set.
  Input:
    KEYS[1] marker key
    KEYS[2] active key
    KEYS[3] prioritized key
    KEYS[4] delayed key
    KEYS[5] job key
    KEYS[6] events stream
    KEYS[7] meta key
    KEYS[8] stalled key
    ARGV[1] key prefix
    ARGV[2] timestamp
    ARGV[3] the id of the job
    ARGV[4] queue token
    ARGV[5] delay value
    ARGV[6] skip attempt
    ARGV[7] optional job fields to update
  Output:
    0 - OK
   -1 - Missing job.
   -3 - Job not in active set.
  Events:
    - delayed key.
]]
local rcall = redis.call
-- Includes
--[[
  Add delay marker if needed.
]]
-- Includes
--[[
  Function to return the next delayed job timestamp.
]]
local function getNextDelayedTimestamp(delayedKey)
  local result = rcall("ZRANGE", delayedKey, 0, 0, "WITHSCORES")
  if #result then
    local nextTimestamp = tonumber(result[2])
    if nextTimestamp ~= nil then
      return nextTimestamp / 0x1000
    end
  end
end
local function addDelayMarkerIfNeeded(markerKey, delayedKey)
  local nextTimestamp = getNextDelayedTimestamp(delayedKey)
  if nextTimestamp ~= nil then
    -- Replace the score of the marker with the newest known
    -- next timestamp.
    rcall("ZADD", markerKey, nextTimestamp, "1")
  end
end
--[[
  Bake in the job id first 12 bits into the timestamp
  to guarantee correct execution order of delayed jobs
  (up to 4096 jobs per given timestamp or 4096 jobs apart per timestamp)
  WARNING: Jobs that are so far apart that they wrap around will cause FIFO to fail
]]
local function getDelayedScore(delayedKey, timestamp, delay)
  local delayedTimestamp = (delay > 0 and (tonumber(timestamp) + delay)) or tonumber(timestamp)
  local minScore = delayedTimestamp * 0x1000
  local maxScore = (delayedTimestamp + 1 ) * 0x1000 - 1
  local result = rcall("ZREVRANGEBYSCORE", delayedKey, maxScore,
    minScore, "WITHSCORES","LIMIT", 0, 1)
  if #result then
    local currentMaxScore = tonumber(result[2])
    if currentMaxScore ~= nil then
      if currentMaxScore >= maxScore then
        return maxScore, delayedTimestamp
      else
        return currentMaxScore + 1, delayedTimestamp
      end
    end
  end
  return minScore, delayedTimestamp
end
--[[
  Function to get max events value or set by default 10000.
]]
local function getOrSetMaxEvents(metaKey)
  local maxEvents = rcall("HGET", metaKey, "opts.maxLenEvents")
  if not maxEvents then
    maxEvents = 10000
    rcall("HSET", metaKey, "opts.maxLenEvents", maxEvents)
  end
  return maxEvents
end
local function removeLock(jobKey, stalledKey, token, jobId)
  if token ~= "0" then
    local lockKey = jobKey .. ':lock'
    local lockToken = rcall("GET", lockKey)
    if lockToken == token then
      rcall("DEL", lockKey)
      rcall("SREM", stalledKey, jobId)
    else
      if lockToken then
        -- Lock exists but token does not match
        return -6
      else
        -- Lock is missing completely
        return -2
      end
    end
  end
  return 0
end
--[[
  Function to update a bunch of fields in a job.
]]
local function updateJobFields(jobKey, msgpackedFields)
  if msgpackedFields and #msgpackedFields > 0 then
    local fieldsToUpdate = cmsgpack.unpack(msgpackedFields)
    if fieldsToUpdate then
      rcall("HMSET", jobKey, unpack(fieldsToUpdate))
    end
  end
end
local jobKey = KEYS[5]
local metaKey = KEYS[7]
local token = ARGV[4] 
if rcall("EXISTS", jobKey) == 1 then
    local errorCode = removeLock(jobKey, KEYS[8], token, ARGV[3])
    if errorCode < 0 then
        return errorCode
    end
    updateJobFields(jobKey, ARGV[7])
    local delayedKey = KEYS[4]
    local jobId = ARGV[3]
    local delay = tonumber(ARGV[5])
    local numRemovedElements = rcall("LREM", KEYS[2], -1, jobId)
    if numRemovedElements < 1 then return -3 end
    local score, delayedTimestamp = getDelayedScore(delayedKey, ARGV[2], delay)
    if ARGV[6] == "0" then
        rcall("HINCRBY", jobKey, "atm", 1)
    end
    rcall("HSET", jobKey, "delay", ARGV[5])
    local maxEvents = getOrSetMaxEvents(metaKey)
    rcall("ZADD", delayedKey, score, jobId)
    rcall("XADD", KEYS[6], "MAXLEN", "~", maxEvents, "*", "event", "delayed",
          "jobId", jobId, "delay", delayedTimestamp)
    -- Check if we need to push a marker job to wake up sleeping workers.
    local markerKey = KEYS[1]
    addDelayMarkerIfNeeded(markerKey, delayedKey)
    return 0
else
    return -1
end
`,keys:8};a.s(["moveToDelayed",0,ow],622279);let ox={name:"moveToFinished",content:`--[[
  Move job from active to a finished status (completed o failed)
  A job can only be moved to completed if it was active.
  The job must be locked before it can be moved to a finished status,
  and the lock must be released in this script.
    Input:
      KEYS[1] wait key
      KEYS[2] active key
      KEYS[3] prioritized key
      KEYS[4] event stream key
      KEYS[5] stalled key
      -- Rate limiting
      KEYS[6] rate limiter key
      KEYS[7] delayed key
      KEYS[8] paused key
      KEYS[9] meta key
      KEYS[10] pc priority counter
      KEYS[11] completed/failed key
      KEYS[12] jobId key
      KEYS[13] metrics key
      KEYS[14] marker key
      ARGV[1]  jobId
      ARGV[2]  timestamp
      ARGV[3]  msg property returnvalue / failedReason
      ARGV[4]  return value / failed reason
      ARGV[5]  target (completed/failed)
      ARGV[6]  fetch next?
      ARGV[7]  keys prefix
      ARGV[8]  opts
      ARGV[9]  job fields to update
      opts - token - lock token
      opts - keepJobs
      opts - lockDuration - lock duration in milliseconds
      opts - attempts max attempts
      opts - maxMetricsSize
      opts - fpof - fail parent on fail
      opts - cpof - continue parent on fail
      opts - idof - ignore dependency on fail
      opts - rdof - remove dependency on fail
      opts - name - worker name
    Output:
      0 OK
      -1 Missing key.
      -2 Missing lock.
      -3 Job not in active set
      -4 Job has pending children
      -6 Lock is not owned by this client
      -9 Job has failed children
    Events:
      'completed/failed'
]]
local rcall = redis.call
--- Includes
--[[
  Functions to collect metrics based on a current and previous count of jobs.
  Granualarity is fixed at 1 minute.
]]
--[[
  Function to loop in batches.
  Just a bit of warning, some commands as ZREM
  could receive a maximum of 7000 parameters per call.
]]
local function batches(n, batchSize)
  local i = 0
  return function()
    local from = i * batchSize + 1
    i = i + 1
    if (from <= n) then
      local to = math.min(from + batchSize - 1, n)
      return from, to
    end
  end
end
local function collectMetrics(metaKey, dataPointsList, maxDataPoints,
                                 timestamp)
    -- Increment current count
    local count = rcall("HINCRBY", metaKey, "count", 1) - 1
    -- Compute how many data points we need to add to the list, N.
    local prevTS = rcall("HGET", metaKey, "prevTS")
    if not prevTS then
        -- If prevTS is nil, set it to the current timestamp
        rcall("HSET", metaKey, "prevTS", timestamp, "prevCount", 0)
        return
    end
    local N = math.min(math.floor(timestamp / 60000) - math.floor(prevTS / 60000), tonumber(maxDataPoints))
    if N > 0 then
        local delta = count - rcall("HGET", metaKey, "prevCount")
        -- If N > 1, add N-1 zeros to the list
        if N > 1 then
            local points = {}
            points[1] = delta
            for i = 2, N do
                points[i] = 0
            end
            for from, to in batches(#points, 7000) do
                rcall("LPUSH", dataPointsList, unpack(points, from, to))
            end
        else
            -- LPUSH delta to the list
            rcall("LPUSH", dataPointsList, delta)
        end
        -- LTRIM to keep list to its max size
        rcall("LTRIM", dataPointsList, 0, maxDataPoints - 1)
        -- update prev count with current count
        rcall("HSET", metaKey, "prevCount", count, "prevTS", timestamp)
    end
end
--[[
  Function to return the next delayed job timestamp.
]]
local function getNextDelayedTimestamp(delayedKey)
  local result = rcall("ZRANGE", delayedKey, 0, 0, "WITHSCORES")
  if #result then
    local nextTimestamp = tonumber(result[2])
    if nextTimestamp ~= nil then
      return nextTimestamp / 0x1000
    end
  end
end
--[[
  Function to get current rate limit ttl.
]]
local function getRateLimitTTL(maxJobs, rateLimiterKey)
  if maxJobs and maxJobs <= tonumber(rcall("GET", rateLimiterKey) or 0) then
    local pttl = rcall("PTTL", rateLimiterKey)
    if pttl == 0 then
      rcall("DEL", rateLimiterKey)
    end
    if pttl > 0 then
      return pttl
    end
  end
  return 0
end
--[[
  Function to check for the meta.paused key to decide if we are paused or not
  (since an empty list and !EXISTS are not really the same).
]]
local function getTargetQueueList(queueMetaKey, activeKey, waitKey, pausedKey)
  local queueAttributes = rcall("HMGET", queueMetaKey, "paused", "concurrency", "max", "duration")
  if queueAttributes[1] then
    return pausedKey, true, queueAttributes[3], queueAttributes[4]
  else
    if queueAttributes[2] then
      local activeCount = rcall("LLEN", activeKey)
      if activeCount >= tonumber(queueAttributes[2]) then
        return waitKey, true, queueAttributes[3], queueAttributes[4]
      else
        return waitKey, false, queueAttributes[3], queueAttributes[4]
      end
    end
  end
  return waitKey, false, queueAttributes[3], queueAttributes[4]
end
--[[
  Function to move job from prioritized state to active.
]]
local function moveJobFromPrioritizedToActive(priorityKey, activeKey, priorityCounterKey)
  local prioritizedJob = rcall("ZPOPMIN", priorityKey)
  if #prioritizedJob > 0 then
    rcall("LPUSH", activeKey, prioritizedJob[1])
    return prioritizedJob[1]
  else
    rcall("DEL", priorityCounterKey)
  end
end
--[[
  Function to recursively move from waitingChildren to failed.
]]
-- Includes
--[[
  Validate and move parent to a wait status (waiting, delayed or prioritized)
  if no pending dependencies.
]]
-- Includes
--[[
  Validate and move parent to a wait status (waiting, delayed or prioritized) if needed.
]]
-- Includes
--[[
  Move parent to a wait status (wait, prioritized or delayed)
]]
-- Includes
--[[
  Add delay marker if needed.
]]
-- Includes
local function addDelayMarkerIfNeeded(markerKey, delayedKey)
  local nextTimestamp = getNextDelayedTimestamp(delayedKey)
  if nextTimestamp ~= nil then
    -- Replace the score of the marker with the newest known
    -- next timestamp.
    rcall("ZADD", markerKey, nextTimestamp, "1")
  end
end
--[[
  Function to add job in target list and add marker if needed.
]]
-- Includes
--[[
  Add marker if needed when a job is available.
]]
local function addBaseMarkerIfNeeded(markerKey, isPausedOrMaxed)
  if not isPausedOrMaxed then
    rcall("ZADD", markerKey, 0, "0")
  end  
end
local function addJobInTargetList(targetKey, markerKey, pushCmd, isPausedOrMaxed, jobId)
  rcall(pushCmd, targetKey, jobId)
  addBaseMarkerIfNeeded(markerKey, isPausedOrMaxed)
end
--[[
  Function to add job considering priority.
]]
-- Includes
--[[
  Function to get priority score.
]]
local function getPriorityScore(priority, priorityCounterKey)
  local prioCounter = rcall("INCR", priorityCounterKey)
  return priority * 0x100000000 + prioCounter % 0x100000000
end
local function addJobWithPriority(markerKey, prioritizedKey, priority, jobId, priorityCounterKey,
  isPausedOrMaxed)
  local score = getPriorityScore(priority, priorityCounterKey)
  rcall("ZADD", prioritizedKey, score, jobId)
  addBaseMarkerIfNeeded(markerKey, isPausedOrMaxed)
end
--[[
  Function to check if queue is paused or maxed
  (since an empty list and !EXISTS are not really the same).
]]
local function isQueuePausedOrMaxed(queueMetaKey, activeKey)
  local queueAttributes = rcall("HMGET", queueMetaKey, "paused", "concurrency")
  if queueAttributes[1] then
    return true
  else
    if queueAttributes[2] then
      local activeCount = rcall("LLEN", activeKey)
      return activeCount >= tonumber(queueAttributes[2])
    end
  end
  return false
end
local function moveParentToWait(parentQueueKey, parentKey, parentId, timestamp)
    local parentWaitKey = parentQueueKey .. ":wait"
    local parentPausedKey = parentQueueKey .. ":paused"
    local parentActiveKey = parentQueueKey .. ":active"
    local parentMetaKey = parentQueueKey .. ":meta"
    local parentMarkerKey = parentQueueKey .. ":marker"
    local jobAttributes = rcall("HMGET", parentKey, "priority", "delay")
    local priority = tonumber(jobAttributes[1]) or 0
    local delay = tonumber(jobAttributes[2]) or 0
    if delay > 0 then
        local delayedTimestamp = tonumber(timestamp) + delay
        local score = delayedTimestamp * 0x1000
        local parentDelayedKey = parentQueueKey .. ":delayed"
        rcall("ZADD", parentDelayedKey, score, parentId)
        rcall("XADD", parentQueueKey .. ":events", "*", "event", "delayed", "jobId", parentId, "delay",
            delayedTimestamp)
        addDelayMarkerIfNeeded(parentMarkerKey, parentDelayedKey)
    else
        if priority == 0 then
            local parentTarget, isParentPausedOrMaxed = getTargetQueueList(parentMetaKey, parentActiveKey,
                parentWaitKey, parentPausedKey)
            addJobInTargetList(parentTarget, parentMarkerKey, "RPUSH", isParentPausedOrMaxed, parentId)
        else
            local isPausedOrMaxed = isQueuePausedOrMaxed(parentMetaKey, parentActiveKey)
            addJobWithPriority(parentMarkerKey, parentQueueKey .. ":prioritized", priority, parentId,
                parentQueueKey .. ":pc", isPausedOrMaxed)
        end
        rcall("XADD", parentQueueKey .. ":events", "*", "event", "waiting", "jobId", parentId, "prev",
            "waiting-children")
    end
end
local function moveParentToWaitIfNeeded(parentQueueKey, parentKey, parentId, timestamp)
  if rcall("EXISTS", parentKey) == 1 then
    local parentWaitingChildrenKey = parentQueueKey .. ":waiting-children"
    if rcall("ZSCORE", parentWaitingChildrenKey, parentId) then    
      rcall("ZREM", parentWaitingChildrenKey, parentId)
      moveParentToWait(parentQueueKey, parentKey, parentId, timestamp)
    end
  end
end
local function moveParentToWaitIfNoPendingDependencies(parentQueueKey, parentDependenciesKey, parentKey,
  parentId, timestamp)
  local doNotHavePendingDependencies = rcall("SCARD", parentDependenciesKey) == 0
  if doNotHavePendingDependencies then
    moveParentToWaitIfNeeded(parentQueueKey, parentKey, parentId, timestamp)
  end
end
--[[
  Functions to remove jobs when removeOnFail option is provided.
]]
-- Includes
--[[
  Function to remove job.
]]
-- Includes
--[[
  Function to remove deduplication key if needed
  when a job is being removed.
]]
local function removeDeduplicationKeyIfNeededOnRemoval(prefixKey,
  jobId, deduplicationId)
  if deduplicationId then
    local deduplicationKey = prefixKey .. "de:" .. deduplicationId
    local currentJobId = rcall('GET', deduplicationKey)
    if currentJobId and currentJobId == jobId then
      return rcall("DEL", deduplicationKey)
    end
  end
end
--[[
  Function to remove job keys.
]]
local function removeJobKeys(jobKey)
  return rcall("DEL", jobKey, jobKey .. ':logs', jobKey .. ':dependencies',
    jobKey .. ':processed', jobKey .. ':failed', jobKey .. ':unsuccessful')
end
--[[
  Check if this job has a parent. If so we will just remove it from
  the parent child list, but if it is the last child we should move the parent to "wait/paused"
  which requires code from "moveToFinished"
]]
-- Includes
--[[
  Functions to destructure job key.
  Just a bit of warning, these functions may be a bit slow and affect performance significantly.
]]
local getJobIdFromKey = function (jobKey)
  return string.match(jobKey, ".*:(.*)")
end
local getJobKeyPrefix = function (jobKey, jobId)
  return string.sub(jobKey, 0, #jobKey - #jobId)
end
local function _moveParentToWait(parentPrefix, parentId, emitEvent)
  local parentTarget, isPausedOrMaxed = getTargetQueueList(parentPrefix .. "meta", parentPrefix .. "active",
    parentPrefix .. "wait", parentPrefix .. "paused")
  addJobInTargetList(parentTarget, parentPrefix .. "marker", "RPUSH", isPausedOrMaxed, parentId)
  if emitEvent then
    local parentEventStream = parentPrefix .. "events"
    rcall("XADD", parentEventStream, "*", "event", "waiting", "jobId", parentId, "prev", "waiting-children")
  end
end
local function removeParentDependencyKey(jobKey, hard, parentKey, baseKey, debounceId)
  if parentKey then
    local parentDependenciesKey = parentKey .. ":dependencies"
    local result = rcall("SREM", parentDependenciesKey, jobKey)
    if result > 0 then
      local pendingDependencies = rcall("SCARD", parentDependenciesKey)
      if pendingDependencies == 0 then
        local parentId = getJobIdFromKey(parentKey)
        local parentPrefix = getJobKeyPrefix(parentKey, parentId)
        local numRemovedElements = rcall("ZREM", parentPrefix .. "waiting-children", parentId)
        if numRemovedElements == 1 then
          if hard then -- remove parent in same queue
            if parentPrefix == baseKey then
              removeParentDependencyKey(parentKey, hard, nil, baseKey, nil)
              removeJobKeys(parentKey)
              if debounceId then
                rcall("DEL", parentPrefix .. "de:" .. debounceId)
              end
            else
              _moveParentToWait(parentPrefix, parentId)
            end
          else
            _moveParentToWait(parentPrefix, parentId, true)
          end
        end
      end
      return true
    end
  else
    local parentAttributes = rcall("HMGET", jobKey, "parentKey", "deid")
    local missedParentKey = parentAttributes[1]
    if( (type(missedParentKey) == "string") and missedParentKey ~= ""
      and (rcall("EXISTS", missedParentKey) == 1)) then
      local parentDependenciesKey = missedParentKey .. ":dependencies"
      local result = rcall("SREM", parentDependenciesKey, jobKey)
      if result > 0 then
        local pendingDependencies = rcall("SCARD", parentDependenciesKey)
        if pendingDependencies == 0 then
          local parentId = getJobIdFromKey(missedParentKey)
          local parentPrefix = getJobKeyPrefix(missedParentKey, parentId)
          local numRemovedElements = rcall("ZREM", parentPrefix .. "waiting-children", parentId)
          if numRemovedElements == 1 then
            if hard then
              if parentPrefix == baseKey then
                removeParentDependencyKey(missedParentKey, hard, nil, baseKey, nil)
                removeJobKeys(missedParentKey)
                if parentAttributes[2] then
                  rcall("DEL", parentPrefix .. "de:" .. parentAttributes[2])
                end
              else
                _moveParentToWait(parentPrefix, parentId)
              end
            else
              _moveParentToWait(parentPrefix, parentId, true)
            end
          end
        end
        return true
      end
    end
  end
  return false
end
local function removeJob(jobId, hard, baseKey, shouldRemoveDeduplicationKey)
  local jobKey = baseKey .. jobId
  removeParentDependencyKey(jobKey, hard, nil, baseKey)
  if shouldRemoveDeduplicationKey then
    local deduplicationId = rcall("HGET", jobKey, "deid")
    removeDeduplicationKeyIfNeededOnRemoval(baseKey, jobId, deduplicationId)
  end
  removeJobKeys(jobKey)
end
--[[
  Functions to remove jobs by max age.
]]
-- Includes
local function removeJobsByMaxAge(timestamp, maxAge, targetSet, prefix,
  shouldRemoveDebounceKey)
  local start = timestamp - maxAge * 1000
  local jobIds = rcall("ZREVRANGEBYSCORE", targetSet, start, "-inf")
  for i, jobId in ipairs(jobIds) do
    removeJob(jobId, false, prefix, false --[[remove debounce key]])
  end
  rcall("ZREMRANGEBYSCORE", targetSet, "-inf", start)
end
--[[
  Functions to remove jobs by max count.
]]
-- Includes
local function removeJobsByMaxCount(maxCount, targetSet, prefix)
  local start = maxCount
  local jobIds = rcall("ZREVRANGE", targetSet, start, -1)
  for i, jobId in ipairs(jobIds) do
    removeJob(jobId, false, prefix, false --[[remove debounce key]])
  end
  rcall("ZREMRANGEBYRANK", targetSet, 0, -(maxCount + 1))
end
local function removeJobsOnFail(queueKeyPrefix, failedKey, jobId, opts, timestamp)
  local removeOnFailType = type(opts["removeOnFail"])
  if removeOnFailType == "number" then
    removeJobsByMaxCount(opts["removeOnFail"],
                        failedKey, queueKeyPrefix)
  elseif removeOnFailType == "boolean" then
    if opts["removeOnFail"] then
      removeJob(jobId, false, queueKeyPrefix,
                false --[[remove debounce key]])
      rcall("ZREM", failedKey, jobId)
    end
  elseif removeOnFailType ~= "nil" then
    local maxAge = opts["removeOnFail"]["age"]
    local maxCount = opts["removeOnFail"]["count"]
    if maxAge ~= nil then
      removeJobsByMaxAge(timestamp, maxAge,
                        failedKey, queueKeyPrefix)
    end
    if maxCount ~= nil and maxCount > 0 then
      removeJobsByMaxCount(maxCount, failedKey,
                            queueKeyPrefix)
    end
  end 
end
local moveParentToFailedIfNeeded = function (parentQueueKey, parentKey, parentId, jobIdKey, timestamp)
  if rcall("EXISTS", parentKey) == 1 then
    local parentWaitingChildrenKey = parentQueueKey .. ":waiting-children"
    local parentDelayedKey = parentQueueKey .. ":delayed"
    local parentPrioritizedKey = parentQueueKey .. ":prioritized"
    local parentWaitingChildrenOrDelayedKey
    local prevState
    if rcall("ZSCORE", parentWaitingChildrenKey, parentId) then
      parentWaitingChildrenOrDelayedKey = parentWaitingChildrenKey
      prevState = "waiting-children"
    elseif rcall("ZSCORE", parentDelayedKey, parentId) then
      parentWaitingChildrenOrDelayedKey = parentDelayedKey
      prevState = "delayed"
      rcall("HSET", parentKey, "delay", 0)
    end
    if parentWaitingChildrenOrDelayedKey then
      rcall("ZREM", parentWaitingChildrenOrDelayedKey, parentId)
      local parentQueuePrefix = parentQueueKey .. ":"
      local parentFailedKey = parentQueueKey .. ":failed"
      local deferredFailure = "child " .. jobIdKey .. " failed"
      rcall("HSET", parentKey, "defa", deferredFailure)
      moveParentToWait(parentQueueKey, parentKey, parentId, timestamp)
    else
      if not rcall("ZSCORE", parentQueueKey .. ":failed", parentId) then
        local deferredFailure = "child " .. jobIdKey .. " failed"
        rcall("HSET", parentKey, "defa", deferredFailure)
      end
    end
  end
end
local moveChildFromDependenciesIfNeeded = function (rawParentData, childKey, failedReason, timestamp)
  if rawParentData then
    local parentData = cjson.decode(rawParentData)
    local parentKey = parentData['queueKey'] .. ':' .. parentData['id']
    local parentDependenciesChildrenKey = parentKey .. ":dependencies"
    if parentData['fpof'] then
      if rcall("SREM", parentDependenciesChildrenKey, childKey) == 1 then
        local parentUnsuccesssfulChildrenKey = parentKey .. ":unsuccessful"
        rcall("ZADD", parentUnsuccesssfulChildrenKey, timestamp, childKey)
        moveParentToFailedIfNeeded(
          parentData['queueKey'],
          parentKey,
          parentData['id'],
          childKey,
          timestamp
        )
      end
    elseif parentData['cpof'] then
      if rcall("SREM", parentDependenciesChildrenKey, childKey) == 1 then
        local parentFailedChildrenKey = parentKey .. ":failed"
        rcall("HSET", parentFailedChildrenKey, childKey, failedReason)
        moveParentToWaitIfNeeded(parentData['queueKey'], parentKey, parentData['id'], timestamp)
      end
    elseif parentData['idof'] or parentData['rdof'] then
      if rcall("SREM", parentDependenciesChildrenKey, childKey) == 1 then
        moveParentToWaitIfNoPendingDependencies(parentData['queueKey'], parentDependenciesChildrenKey,
          parentKey, parentData['id'], timestamp)
        if parentData['idof'] then
          local parentFailedChildrenKey = parentKey .. ":failed"
          rcall("HSET", parentFailedChildrenKey, childKey, failedReason)
        end
      end
    end
  end
end
--[[
  Function to move job from wait state to active.
  Input:
    opts - token - lock token
    opts - lockDuration
    opts - limiter
]]
-- Includes
local function prepareJobForProcessing(keyPrefix, rateLimiterKey, eventStreamKey,
    jobId, processedOn, maxJobs, limiterDuration, markerKey, opts)
  local jobKey = keyPrefix .. jobId
  -- Check if we need to perform rate limiting.
  if maxJobs then
    local jobCounter = tonumber(rcall("INCR", rateLimiterKey))
    if jobCounter == 1 then
      local integerDuration = math.floor(math.abs(limiterDuration))
      rcall("PEXPIRE", rateLimiterKey, integerDuration)
    end
  end
  -- get a lock
  if opts['token'] ~= "0" then
    local lockKey = jobKey .. ':lock'
    rcall("SET", lockKey, opts['token'], "PX", opts['lockDuration'])
  end
  local optionalValues = {}
  if opts['name'] then
    -- Set "processedBy" field to the worker name
    table.insert(optionalValues, "pb")
    table.insert(optionalValues, opts['name'])
  end
  rcall("XADD", eventStreamKey, "*", "event", "active", "jobId", jobId, "prev", "waiting")
  rcall("HMSET", jobKey, "processedOn", processedOn, unpack(optionalValues))
  rcall("HINCRBY", jobKey, "ats", 1)
  addBaseMarkerIfNeeded(markerKey, false)
  -- rate limit delay must be 0 in this case to prevent adding more delay
  -- when job that is moved to active needs to be processed
  return {rcall("HGETALL", jobKey), jobId, 0, 0} -- get job data
end
--[[
  Updates the delay set, by moving delayed jobs that should
  be processed now to "wait".
     Events:
      'waiting'
]]
-- Includes
-- Try to get as much as 1000 jobs at once
local function promoteDelayedJobs(delayedKey, markerKey, targetKey, prioritizedKey,
                                  eventStreamKey, prefix, timestamp, priorityCounterKey, isPaused)
    local jobs = rcall("ZRANGEBYSCORE", delayedKey, 0, (timestamp + 1) * 0x1000 - 1, "LIMIT", 0, 1000)
    if (#jobs > 0) then
        rcall("ZREM", delayedKey, unpack(jobs))
        for _, jobId in ipairs(jobs) do
            local jobKey = prefix .. jobId
            local priority =
                tonumber(rcall("HGET", jobKey, "priority")) or 0
            if priority == 0 then
                -- LIFO or FIFO
                rcall("LPUSH", targetKey, jobId)
            else
                local score = getPriorityScore(priority, priorityCounterKey)
                rcall("ZADD", prioritizedKey, score, jobId)
            end
            -- Emit waiting event
            rcall("XADD", eventStreamKey, "*", "event", "waiting", "jobId",
                  jobId, "prev", "delayed")
            rcall("HSET", jobKey, "delay", 0)
        end
        addBaseMarkerIfNeeded(markerKey, isPaused)
    end
end
--[[
  Function to remove deduplication key if needed
  when a job is moved to completed or failed states.
]]
local function removeDeduplicationKeyIfNeededOnFinalization(prefixKey,
  deduplicationId, jobId)
  if deduplicationId then
    local deduplicationKey = prefixKey .. "de:" .. deduplicationId
    local pttl = rcall("PTTL", deduplicationKey)
    if pttl == 0 then
      return rcall("DEL", deduplicationKey)
    end
    if pttl == -1 then
      local currentJobId = rcall('GET', deduplicationKey)
      if currentJobId and currentJobId == jobId then
        return rcall("DEL", deduplicationKey)
      end
    end
  end
end
local function removeLock(jobKey, stalledKey, token, jobId)
  if token ~= "0" then
    local lockKey = jobKey .. ':lock'
    local lockToken = rcall("GET", lockKey)
    if lockToken == token then
      rcall("DEL", lockKey)
      rcall("SREM", stalledKey, jobId)
    else
      if lockToken then
        -- Lock exists but token does not match
        return -6
      else
        -- Lock is missing completely
        return -2
      end
    end
  end
  return 0
end
--[[
  Function to trim events, default 10000.
]]
-- Includes
--[[
  Function to get max events value or set by default 10000.
]]
local function getOrSetMaxEvents(metaKey)
  local maxEvents = rcall("HGET", metaKey, "opts.maxLenEvents")
  if not maxEvents then
    maxEvents = 10000
    rcall("HSET", metaKey, "opts.maxLenEvents", maxEvents)
  end
  return maxEvents
end
local function trimEvents(metaKey, eventStreamKey)
  local maxEvents = getOrSetMaxEvents(metaKey)
  if maxEvents then
    rcall("XTRIM", eventStreamKey, "MAXLEN", "~", maxEvents)
  else
    rcall("XTRIM", eventStreamKey, "MAXLEN", "~", 10000)
  end
end
--[[
  Validate and move or add dependencies to parent.
]]
-- Includes
local function updateParentDepsIfNeeded(parentKey, parentQueueKey, parentDependenciesKey,
  parentId, jobIdKey, returnvalue, timestamp )
  local processedSet = parentKey .. ":processed"
  rcall("HSET", processedSet, jobIdKey, returnvalue)
  moveParentToWaitIfNoPendingDependencies(parentQueueKey, parentDependenciesKey, parentKey, parentId, timestamp)
end
--[[
  Function to update a bunch of fields in a job.
]]
local function updateJobFields(jobKey, msgpackedFields)
  if msgpackedFields and #msgpackedFields > 0 then
    local fieldsToUpdate = cmsgpack.unpack(msgpackedFields)
    if fieldsToUpdate then
      rcall("HMSET", jobKey, unpack(fieldsToUpdate))
    end
  end
end
local jobIdKey = KEYS[12]
if rcall("EXISTS", jobIdKey) == 1 then -- Make sure job exists
    -- Make sure it does not have pending dependencies
    -- It must happen before removing lock
    if ARGV[5] == "completed" then
        if rcall("SCARD", jobIdKey .. ":dependencies") ~= 0 then
            return -4
        end
        if rcall("ZCARD", jobIdKey .. ":unsuccessful") ~= 0 then
            return -9
        end
    end
    local opts = cmsgpack.unpack(ARGV[8])
    local token = opts['token']
    local errorCode = removeLock(jobIdKey, KEYS[5], token, ARGV[1])
    if errorCode < 0 then
        return errorCode
    end
    updateJobFields(jobIdKey, ARGV[9]);
    local attempts = opts['attempts']
    local maxMetricsSize = opts['maxMetricsSize']
    local maxCount = opts['keepJobs']['count']
    local maxAge = opts['keepJobs']['age']
    local jobAttributes = rcall("HMGET", jobIdKey, "parentKey", "parent", "deid")
    local parentKey = jobAttributes[1] or ""
    local parentId = ""
    local parentQueueKey = ""
    if jobAttributes[2] then -- TODO: need to revisit this logic if it's still needed
        local jsonDecodedParent = cjson.decode(jobAttributes[2])
        parentId = jsonDecodedParent['id']
        parentQueueKey = jsonDecodedParent['queueKey']
    end
    local jobId = ARGV[1]
    local timestamp = ARGV[2]
    -- Remove from active list (if not active we shall return error)
    local numRemovedElements = rcall("LREM", KEYS[2], -1, jobId)
    if (numRemovedElements < 1) then
        return -3
    end
    local eventStreamKey = KEYS[4]
    local metaKey = KEYS[9]
    -- Trim events before emiting them to avoid trimming events emitted in this script
    trimEvents(metaKey, eventStreamKey)
    local prefix = ARGV[7]
    removeDeduplicationKeyIfNeededOnFinalization(prefix, jobAttributes[3], jobId)
    -- If job has a parent we need to
    -- 1) remove this job id from parents dependencies
    -- 2) move the job Id to parent "processed" set
    -- 3) push the results into parent "results" list
    -- 4) if parent's dependencies is empty, then move parent to "wait/paused". Note it may be a different queue!.
    if parentId == "" and parentKey ~= "" then
        parentId = getJobIdFromKey(parentKey)
        parentQueueKey = getJobKeyPrefix(parentKey, ":" .. parentId)
    end
    if parentId ~= "" then
        if ARGV[5] == "completed" then
            local dependenciesSet = parentKey .. ":dependencies"
            if rcall("SREM", dependenciesSet, jobIdKey) == 1 then
                updateParentDepsIfNeeded(parentKey, parentQueueKey, dependenciesSet, parentId, jobIdKey, ARGV[4],
                    timestamp)
            end
        else
            moveChildFromDependenciesIfNeeded(jobAttributes[2], jobIdKey, ARGV[4], timestamp)
        end
    end
    local attemptsMade = rcall("HINCRBY", jobIdKey, "atm", 1)
    -- Remove job?
    if maxCount ~= 0 then
        local targetSet = KEYS[11]
        -- Add to complete/failed set
        rcall("ZADD", targetSet, timestamp, jobId)
        rcall("HSET", jobIdKey, ARGV[3], ARGV[4], "finishedOn", timestamp)
        -- "returnvalue" / "failedReason" and "finishedOn"
        if ARGV[5] == "failed" then
            rcall("HDEL", jobIdKey, "defa")
        end
        -- Remove old jobs?
        if maxAge ~= nil then
            removeJobsByMaxAge(timestamp, maxAge, targetSet, prefix)
        end
        if maxCount ~= nil and maxCount > 0 then
            removeJobsByMaxCount(maxCount, targetSet, prefix)
        end
    else
        removeJobKeys(jobIdKey)
        if parentKey ~= "" then
            -- TODO: when a child is removed when finished, result or failure in parent
            -- must not be deleted, those value references should be deleted when the parent
            -- is deleted
            removeParentDependencyKey(jobIdKey, false, parentKey, jobAttributes[3])
        end
    end
    rcall("XADD", eventStreamKey, "*", "event", ARGV[5], "jobId", jobId, ARGV[3], ARGV[4], "prev", "active")
    if ARGV[5] == "failed" then
        if tonumber(attemptsMade) >= tonumber(attempts) then
            rcall("XADD", eventStreamKey, "*", "event", "retries-exhausted", "jobId", jobId, "attemptsMade",
                attemptsMade)
        end
    end
    -- Collect metrics
    if maxMetricsSize ~= "" then
        collectMetrics(KEYS[13], KEYS[13] .. ':data', maxMetricsSize, timestamp)
    end
    -- Try to get next job to avoid an extra roundtrip if the queue is not closing,
    -- and not rate limited.
    if (ARGV[6] == "1") then
        local target, isPausedOrMaxed, rateLimitMax, rateLimitDuration = getTargetQueueList(metaKey, KEYS[2],
            KEYS[1], KEYS[8])
        local markerKey = KEYS[14]
        -- Check if there are delayed jobs that can be promoted
        promoteDelayedJobs(KEYS[7], markerKey, target, KEYS[3], eventStreamKey, prefix, timestamp, KEYS[10],
            isPausedOrMaxed)
        local maxJobs = tonumber(rateLimitMax or (opts['limiter'] and opts['limiter']['max']))
        -- Check if we are rate limited first.
        local expireTime = getRateLimitTTL(maxJobs, KEYS[6])
        if expireTime > 0 then
            return {0, 0, expireTime, 0}
        end
        -- paused or maxed queue
        if isPausedOrMaxed then
            return {0, 0, 0, 0}
        end
        local limiterDuration = (opts['limiter'] and opts['limiter']['duration']) or rateLimitDuration
        jobId = rcall("RPOPLPUSH", KEYS[1], KEYS[2])
        if jobId then
            -- Markers in waitlist DEPRECATED in v5: Remove in v6.
            if string.sub(jobId, 1, 2) == "0:" then
                rcall("LREM", KEYS[2], 1, jobId)
                -- If jobId is special ID 0:delay (delay greater than 0), then there is no job to process
                -- but if ID is 0:0, then there is at least 1 prioritized job to process
                if jobId == "0:0" then
                    jobId = moveJobFromPrioritizedToActive(KEYS[3], KEYS[2], KEYS[10])
                    return prepareJobForProcessing(prefix, KEYS[6], eventStreamKey, jobId, timestamp, maxJobs,
                        limiterDuration, markerKey, opts)
                end
            else
                return prepareJobForProcessing(prefix, KEYS[6], eventStreamKey, jobId, timestamp, maxJobs,
                    limiterDuration, markerKey, opts)
            end
        else
            jobId = moveJobFromPrioritizedToActive(KEYS[3], KEYS[2], KEYS[10])
            if jobId then
                return prepareJobForProcessing(prefix, KEYS[6], eventStreamKey, jobId, timestamp, maxJobs,
                    limiterDuration, markerKey, opts)
            end
        end
        -- Return the timestamp for the next delayed job if any.
        local nextTimestamp = getNextDelayedTimestamp(KEYS[7])
        if nextTimestamp ~= nil then
            -- The result is guaranteed to be positive, since the
            -- ZRANGEBYSCORE command would have return a job otherwise.
            return {0, 0, 0, nextTimestamp}
        end
    end
    local waitLen = rcall("LLEN", KEYS[1])
    if waitLen == 0 then
        local activeLen = rcall("LLEN", KEYS[2])
        if activeLen == 0 then
            local prioritizedLen = rcall("ZCARD", KEYS[3])
            if prioritizedLen == 0 then
                rcall("XADD", eventStreamKey, "*", "event", "drained")
            end
        end
    end
    return 0
else
    return -1
end
`,keys:14};a.s(["moveToFinished",0,ox],274877);let oy={name:"moveToWaitingChildren",content:`--[[
  Moves job from active to waiting children set.
  Input:
    KEYS[1] active key
    KEYS[2] wait-children key
    KEYS[3] job key
    KEYS[4] job dependencies key
    KEYS[5] job unsuccessful key
    KEYS[6] stalled key
    KEYS[7] events key
    ARGV[1] token
    ARGV[2] child key
    ARGV[3] timestamp
    ARGV[4] jobId
    ARGV[5] prefix
  Output:
    0 - OK
    1 - There are not pending dependencies.
   -1 - Missing job.
   -2 - Missing lock
   -3 - Job not in active set
   -9 - Job has failed children
]]
local rcall = redis.call
local activeKey = KEYS[1]
local waitingChildrenKey = KEYS[2]
local jobKey = KEYS[3]
local jobDependenciesKey = KEYS[4]
local jobUnsuccessfulKey = KEYS[5]
local stalledKey = KEYS[6]
local eventStreamKey = KEYS[7]
local token = ARGV[1]
local timestamp = ARGV[3]
local jobId = ARGV[4]
--- Includes
local function removeLock(jobKey, stalledKey, token, jobId)
  if token ~= "0" then
    local lockKey = jobKey .. ':lock'
    local lockToken = rcall("GET", lockKey)
    if lockToken == token then
      rcall("DEL", lockKey)
      rcall("SREM", stalledKey, jobId)
    else
      if lockToken then
        -- Lock exists but token does not match
        return -6
      else
        -- Lock is missing completely
        return -2
      end
    end
  end
  return 0
end
local function removeJobFromActive(activeKey, stalledKey, jobKey, jobId,
    token)
  local errorCode = removeLock(jobKey, stalledKey, token, jobId)
  if errorCode < 0 then
    return errorCode
  end
  local numRemovedElements = rcall("LREM", activeKey, -1, jobId)
  if numRemovedElements < 1 then
    return -3
  end
  return 0
end
local function moveToWaitingChildren(activeKey, waitingChildrenKey, stalledKey, eventStreamKey,
    jobKey, jobId, timestamp, token)
  local errorCode = removeJobFromActive(activeKey, stalledKey, jobKey, jobId, token)
  if errorCode < 0 then
    return errorCode
  end
  local score = tonumber(timestamp)
  rcall("ZADD", waitingChildrenKey, score, jobId)
  rcall("XADD", eventStreamKey, "*", "event", "waiting-children", "jobId", jobId, 'prev', 'active')
  return 0
end
if rcall("EXISTS", jobKey) == 1 then
  if rcall("ZCARD", jobUnsuccessfulKey) ~= 0 then
    return -9
  else
    if ARGV[2] ~= "" then
      if rcall("SISMEMBER", jobDependenciesKey, ARGV[2]) ~= 0 then
        return moveToWaitingChildren(activeKey, waitingChildrenKey, stalledKey, eventStreamKey,
          jobKey, jobId, timestamp, token)
      end
      return 1
    else
      if rcall("SCARD", jobDependenciesKey) ~= 0 then 
        return moveToWaitingChildren(activeKey, waitingChildrenKey, stalledKey, eventStreamKey,
          jobKey, jobId, timestamp, token)
      end
      return 1
    end    
  end
end
return -1
`,keys:7};a.s(["moveToWaitingChildren",0,oy],502043);let oz={name:"obliterate",content:`--[[
  Completely obliterates a queue and all of its contents
  This command completely destroys a queue including all of its jobs, current or past 
  leaving no trace of its existence. Since this script needs to iterate to find all the job
  keys, consider that this call may be slow for very large queues.
  The queue needs to be "paused" or it will return an error
  If the queue has currently active jobs then the script by default will return error,
  however this behaviour can be overrided using the 'force' option.
  Input:
    KEYS[1] meta
    KEYS[2] base
    ARGV[1] count
    ARGV[2] force
]]
local maxCount = tonumber(ARGV[1])
local baseKey = KEYS[2]
local rcall = redis.call
-- Includes
--[[
  Functions to remove jobs.
]]
-- Includes
--[[
  Function to remove job.
]]
-- Includes
--[[
  Function to remove deduplication key if needed
  when a job is being removed.
]]
local function removeDeduplicationKeyIfNeededOnRemoval(prefixKey,
  jobId, deduplicationId)
  if deduplicationId then
    local deduplicationKey = prefixKey .. "de:" .. deduplicationId
    local currentJobId = rcall('GET', deduplicationKey)
    if currentJobId and currentJobId == jobId then
      return rcall("DEL", deduplicationKey)
    end
  end
end
--[[
  Function to remove job keys.
]]
local function removeJobKeys(jobKey)
  return rcall("DEL", jobKey, jobKey .. ':logs', jobKey .. ':dependencies',
    jobKey .. ':processed', jobKey .. ':failed', jobKey .. ':unsuccessful')
end
--[[
  Check if this job has a parent. If so we will just remove it from
  the parent child list, but if it is the last child we should move the parent to "wait/paused"
  which requires code from "moveToFinished"
]]
-- Includes
--[[
  Function to add job in target list and add marker if needed.
]]
-- Includes
--[[
  Add marker if needed when a job is available.
]]
local function addBaseMarkerIfNeeded(markerKey, isPausedOrMaxed)
  if not isPausedOrMaxed then
    rcall("ZADD", markerKey, 0, "0")
  end  
end
local function addJobInTargetList(targetKey, markerKey, pushCmd, isPausedOrMaxed, jobId)
  rcall(pushCmd, targetKey, jobId)
  addBaseMarkerIfNeeded(markerKey, isPausedOrMaxed)
end
--[[
  Functions to destructure job key.
  Just a bit of warning, these functions may be a bit slow and affect performance significantly.
]]
local getJobIdFromKey = function (jobKey)
  return string.match(jobKey, ".*:(.*)")
end
local getJobKeyPrefix = function (jobKey, jobId)
  return string.sub(jobKey, 0, #jobKey - #jobId)
end
--[[
  Function to check for the meta.paused key to decide if we are paused or not
  (since an empty list and !EXISTS are not really the same).
]]
local function getTargetQueueList(queueMetaKey, activeKey, waitKey, pausedKey)
  local queueAttributes = rcall("HMGET", queueMetaKey, "paused", "concurrency", "max", "duration")
  if queueAttributes[1] then
    return pausedKey, true, queueAttributes[3], queueAttributes[4]
  else
    if queueAttributes[2] then
      local activeCount = rcall("LLEN", activeKey)
      if activeCount >= tonumber(queueAttributes[2]) then
        return waitKey, true, queueAttributes[3], queueAttributes[4]
      else
        return waitKey, false, queueAttributes[3], queueAttributes[4]
      end
    end
  end
  return waitKey, false, queueAttributes[3], queueAttributes[4]
end
local function _moveParentToWait(parentPrefix, parentId, emitEvent)
  local parentTarget, isPausedOrMaxed = getTargetQueueList(parentPrefix .. "meta", parentPrefix .. "active",
    parentPrefix .. "wait", parentPrefix .. "paused")
  addJobInTargetList(parentTarget, parentPrefix .. "marker", "RPUSH", isPausedOrMaxed, parentId)
  if emitEvent then
    local parentEventStream = parentPrefix .. "events"
    rcall("XADD", parentEventStream, "*", "event", "waiting", "jobId", parentId, "prev", "waiting-children")
  end
end
local function removeParentDependencyKey(jobKey, hard, parentKey, baseKey, debounceId)
  if parentKey then
    local parentDependenciesKey = parentKey .. ":dependencies"
    local result = rcall("SREM", parentDependenciesKey, jobKey)
    if result > 0 then
      local pendingDependencies = rcall("SCARD", parentDependenciesKey)
      if pendingDependencies == 0 then
        local parentId = getJobIdFromKey(parentKey)
        local parentPrefix = getJobKeyPrefix(parentKey, parentId)
        local numRemovedElements = rcall("ZREM", parentPrefix .. "waiting-children", parentId)
        if numRemovedElements == 1 then
          if hard then -- remove parent in same queue
            if parentPrefix == baseKey then
              removeParentDependencyKey(parentKey, hard, nil, baseKey, nil)
              removeJobKeys(parentKey)
              if debounceId then
                rcall("DEL", parentPrefix .. "de:" .. debounceId)
              end
            else
              _moveParentToWait(parentPrefix, parentId)
            end
          else
            _moveParentToWait(parentPrefix, parentId, true)
          end
        end
      end
      return true
    end
  else
    local parentAttributes = rcall("HMGET", jobKey, "parentKey", "deid")
    local missedParentKey = parentAttributes[1]
    if( (type(missedParentKey) == "string") and missedParentKey ~= ""
      and (rcall("EXISTS", missedParentKey) == 1)) then
      local parentDependenciesKey = missedParentKey .. ":dependencies"
      local result = rcall("SREM", parentDependenciesKey, jobKey)
      if result > 0 then
        local pendingDependencies = rcall("SCARD", parentDependenciesKey)
        if pendingDependencies == 0 then
          local parentId = getJobIdFromKey(missedParentKey)
          local parentPrefix = getJobKeyPrefix(missedParentKey, parentId)
          local numRemovedElements = rcall("ZREM", parentPrefix .. "waiting-children", parentId)
          if numRemovedElements == 1 then
            if hard then
              if parentPrefix == baseKey then
                removeParentDependencyKey(missedParentKey, hard, nil, baseKey, nil)
                removeJobKeys(missedParentKey)
                if parentAttributes[2] then
                  rcall("DEL", parentPrefix .. "de:" .. parentAttributes[2])
                end
              else
                _moveParentToWait(parentPrefix, parentId)
              end
            else
              _moveParentToWait(parentPrefix, parentId, true)
            end
          end
        end
        return true
      end
    end
  end
  return false
end
local function removeJob(jobId, hard, baseKey, shouldRemoveDeduplicationKey)
  local jobKey = baseKey .. jobId
  removeParentDependencyKey(jobKey, hard, nil, baseKey)
  if shouldRemoveDeduplicationKey then
    local deduplicationId = rcall("HGET", jobKey, "deid")
    removeDeduplicationKeyIfNeededOnRemoval(baseKey, jobId, deduplicationId)
  end
  removeJobKeys(jobKey)
end
local function removeJobs(keys, hard, baseKey, max)
  for i, key in ipairs(keys) do
    removeJob(key, hard, baseKey, true --[[remove debounce key]])
  end
  return max - #keys
end
--[[
  Functions to remove jobs.
]]
-- Includes
--[[
  Function to filter out jobs to ignore from a table.
]]
local function filterOutJobsToIgnore(jobs, jobsToIgnore)
  local filteredJobs = {}
  for i = 1, #jobs do
    if not jobsToIgnore[jobs[i]] then
      table.insert(filteredJobs, jobs[i])
    end
  end
  return filteredJobs
end
local function getListItems(keyName, max)
  return rcall('LRANGE', keyName, 0, max - 1)
end
local function removeListJobs(keyName, hard, baseKey, max, jobsToIgnore)
  local jobs = getListItems(keyName, max)
  if jobsToIgnore then
    jobs = filterOutJobsToIgnore(jobs, jobsToIgnore)
  end
  local count = removeJobs(jobs, hard, baseKey, max)
  rcall("LTRIM", keyName, #jobs, -1)
  return count
end
-- Includes
--[[
  Function to loop in batches.
  Just a bit of warning, some commands as ZREM
  could receive a maximum of 7000 parameters per call.
]]
local function batches(n, batchSize)
  local i = 0
  return function()
    local from = i * batchSize + 1
    i = i + 1
    if (from <= n) then
      local to = math.min(from + batchSize - 1, n)
      return from, to
    end
  end
end
--[[
  Function to get ZSet items.
]]
local function getZSetItems(keyName, max)
  return rcall('ZRANGE', keyName, 0, max - 1)
end
local function removeZSetJobs(keyName, hard, baseKey, max, jobsToIgnore)
  local jobs = getZSetItems(keyName, max)
  if jobsToIgnore then
    jobs = filterOutJobsToIgnore(jobs, jobsToIgnore)
  end
  local count = removeJobs(jobs, hard, baseKey, max)
  if(#jobs > 0) then
    for from, to in batches(#jobs, 7000) do
      rcall("ZREM", keyName, unpack(jobs, from, to))
    end
  end
  return count
end
local function removeLockKeys(keys)
  for i, key in ipairs(keys) do
    rcall("DEL", baseKey .. key .. ':lock')
  end
end
-- 1) Check if paused, if not return with error.
if rcall("HEXISTS", KEYS[1], "paused") ~= 1 then
  return -1 -- Error, NotPaused
end
-- 2) Check if there are active jobs, if there are and not "force" return error.
local activeKey = baseKey .. 'active'
local activeJobs = getListItems(activeKey, maxCount)
if (#activeJobs > 0) then
  if(ARGV[2] == "") then 
    return -2 -- Error, ExistActiveJobs
  end
end
removeLockKeys(activeJobs)
maxCount = removeJobs(activeJobs, true, baseKey, maxCount)
rcall("LTRIM", activeKey, #activeJobs, -1)
if(maxCount <= 0) then
  return 1
end
local delayedKey = baseKey .. 'delayed'
maxCount = removeZSetJobs(delayedKey, true, baseKey, maxCount)
if(maxCount <= 0) then
  return 1
end
local repeatKey = baseKey .. 'repeat'
local repeatJobsIds = getZSetItems(repeatKey, maxCount)
for i, key in ipairs(repeatJobsIds) do
  local jobKey = repeatKey .. ":" .. key
  rcall("DEL", jobKey)
end
if(#repeatJobsIds > 0) then
  for from, to in batches(#repeatJobsIds, 7000) do
    rcall("ZREM", repeatKey, unpack(repeatJobsIds, from, to))
  end
end
maxCount = maxCount - #repeatJobsIds
if(maxCount <= 0) then
  return 1
end
local completedKey = baseKey .. 'completed'
maxCount = removeZSetJobs(completedKey, true, baseKey, maxCount)
if(maxCount <= 0) then
  return 1
end
local waitKey = baseKey .. 'paused'
maxCount = removeListJobs(waitKey, true, baseKey, maxCount)
if(maxCount <= 0) then
  return 1
end
local prioritizedKey = baseKey .. 'prioritized'
maxCount = removeZSetJobs(prioritizedKey, true, baseKey, maxCount)
if(maxCount <= 0) then
  return 1
end
local failedKey = baseKey .. 'failed'
maxCount = removeZSetJobs(failedKey, true, baseKey, maxCount)
if(maxCount <= 0) then
  return 1
end
if(maxCount > 0) then
  rcall("DEL",
    baseKey .. 'events',
    baseKey .. 'delay', 
    baseKey .. 'stalled-check',
    baseKey .. 'stalled',
    baseKey .. 'id',
    baseKey .. 'pc',
    baseKey .. 'meta',
    baseKey .. 'metrics:completed',
    baseKey .. 'metrics:completed:data',
    baseKey .. 'metrics:failed',
    baseKey .. 'metrics:failed:data')
  return 0
else
  return 1
end
`,keys:2};a.s(["obliterate",0,oz],288402);let oA={name:"paginate",content:`--[[
    Paginate a set or hash
    Input:
      KEYS[1] key pointing to the set or hash to be paginated.
      ARGV[1]  page start offset
      ARGV[2]  page end offset (-1 for all the elements)
      ARGV[3]  cursor
      ARGV[4]  offset
      ARGV[5]  max iterations
      ARGV[6]  fetch jobs?
    Output:
      [cursor, offset, items, numItems]
]]
local rcall = redis.call
-- Includes
--[[
  Function to achieve pagination for a set or hash.
  This function simulates pagination in the most efficient way possible
  for a set using sscan or hscan.
  The main limitation is that sets are not order preserving, so the
  pagination is not stable. This means that if the set is modified
  between pages, the same element may appear in different pages.
]] -- Maximum number of elements to be returned by sscan per iteration.
local maxCount = 100
-- Finds the cursor, and returns the first elements available for the requested page.
local function findPage(key, command, pageStart, pageSize, cursor, offset,
                        maxIterations, fetchJobs)
    local items = {}
    local jobs = {}
    local iterations = 0
    repeat
        -- Iterate over the set using sscan/hscan.
        local result = rcall(command, key, cursor, "COUNT", maxCount)
        cursor = result[1]
        local members = result[2]
        local step = 1
        if command == "HSCAN" then
            step = 2
        end
        if #members == 0 then
            -- If the result is empty, we can return the result.
            return cursor, offset, items, jobs
        end
        local chunkStart = offset
        local chunkEnd = offset + #members / step
        local pageEnd = pageStart + pageSize
        if chunkEnd < pageStart then
            -- If the chunk is before the page, we can skip it.
            offset = chunkEnd
        elseif chunkStart > pageEnd then
            -- If the chunk is after the page, we can return the result.
            return cursor, offset, items, jobs
        else
            -- If the chunk is overlapping the page, we need to add the elements to the result.
            for i = 1, #members, step do
                if offset >= pageEnd then
                    return cursor, offset, items, jobs
                end
                if offset >= pageStart then
                    local index = #items + 1
                    if fetchJobs ~= nil then
                        jobs[#jobs+1] = rcall("HGETALL", members[i])
                    end
                    if step == 2 then
                        items[index] = {members[i], members[i + 1]}
                    else
                        items[index] = members[i]
                    end
                end
                offset = offset + 1
            end
        end
        iterations = iterations + 1
    until cursor == "0" or iterations >= maxIterations
    return cursor, offset, items, jobs
end
local key = KEYS[1]
local scanCommand = "SSCAN"
local countCommand = "SCARD"
local type = rcall("TYPE", key)["ok"]
if type == "none" then
    return {0, 0, {}, 0}
elseif type == "hash" then
    scanCommand = "HSCAN"
    countCommand = "HLEN"
elseif type ~= "set" then
    return
        redis.error_reply("Pagination is only supported for sets and hashes.")
end
local numItems = rcall(countCommand, key)
local startOffset = tonumber(ARGV[1])
local endOffset = tonumber(ARGV[2])
if endOffset == -1 then 
  endOffset = numItems
end
local pageSize = (endOffset - startOffset) + 1
local cursor, offset, items, jobs = findPage(key, scanCommand, startOffset,
                                       pageSize, ARGV[3], tonumber(ARGV[4]),
                                       tonumber(ARGV[5]), ARGV[6])
return {cursor, offset, items, numItems, jobs}
`,keys:1};a.s(["paginate",0,oA],360629);let oB={name:"pause",content:`--[[
  Pauses or resumes a queue globably.
  Input:
    KEYS[1] 'wait' or 'paused''
    KEYS[2] 'paused' or 'wait'
    KEYS[3] 'meta'
    KEYS[4] 'prioritized'
    KEYS[5] events stream key
    KEYS[6] 'delayed'
    KEYS|7] 'marker'
    ARGV[1] 'paused' or 'resumed'
  Event:
    publish paused or resumed event.
]]
local rcall = redis.call
-- Includes
--[[
  Add delay marker if needed.
]]
-- Includes
--[[
  Function to return the next delayed job timestamp.
]]
local function getNextDelayedTimestamp(delayedKey)
  local result = rcall("ZRANGE", delayedKey, 0, 0, "WITHSCORES")
  if #result then
    local nextTimestamp = tonumber(result[2])
    if nextTimestamp ~= nil then
      return nextTimestamp / 0x1000
    end
  end
end
local function addDelayMarkerIfNeeded(markerKey, delayedKey)
  local nextTimestamp = getNextDelayedTimestamp(delayedKey)
  if nextTimestamp ~= nil then
    -- Replace the score of the marker with the newest known
    -- next timestamp.
    rcall("ZADD", markerKey, nextTimestamp, "1")
  end
end
local markerKey = KEYS[7]
local hasJobs = rcall("EXISTS", KEYS[1]) == 1
--TODO: check this logic to be reused when changing a delay
if hasJobs then rcall("RENAME", KEYS[1], KEYS[2]) end
if ARGV[1] == "paused" then
    rcall("HSET", KEYS[3], "paused", 1)
    rcall("DEL", markerKey)
else
    rcall("HDEL", KEYS[3], "paused")
    if hasJobs or rcall("ZCARD", KEYS[4]) > 0 then
        -- Add marker if there are waiting or priority jobs
        rcall("ZADD", markerKey, 0, "0")
    else
        addDelayMarkerIfNeeded(markerKey, KEYS[6])
    end
end
rcall("XADD", KEYS[5], "*", "event", ARGV[1]);
`,keys:7};a.s(["pause",0,oB],357991);let oC={name:"promote",content:`--[[
  Promotes a job that is currently "delayed" to the "waiting" state
    Input:
      KEYS[1] 'delayed'
      KEYS[2] 'wait'
      KEYS[3] 'paused'
      KEYS[4] 'meta'
      KEYS[5] 'prioritized'
      KEYS[6] 'active'
      KEYS[7] 'pc' priority counter
      KEYS[8] 'event stream'
      KEYS[9] 'marker'
      ARGV[1]  queue.toKey('')
      ARGV[2]  jobId
    Output:
       0 - OK
      -3 - Job not in delayed zset.
    Events:
      'waiting'
]]
local rcall = redis.call
local jobId = ARGV[2]
-- Includes
--[[
  Function to add job in target list and add marker if needed.
]]
-- Includes
--[[
  Add marker if needed when a job is available.
]]
local function addBaseMarkerIfNeeded(markerKey, isPausedOrMaxed)
  if not isPausedOrMaxed then
    rcall("ZADD", markerKey, 0, "0")
  end  
end
local function addJobInTargetList(targetKey, markerKey, pushCmd, isPausedOrMaxed, jobId)
  rcall(pushCmd, targetKey, jobId)
  addBaseMarkerIfNeeded(markerKey, isPausedOrMaxed)
end
--[[
  Function to add job considering priority.
]]
-- Includes
--[[
  Function to get priority score.
]]
local function getPriorityScore(priority, priorityCounterKey)
  local prioCounter = rcall("INCR", priorityCounterKey)
  return priority * 0x100000000 + prioCounter % 0x100000000
end
local function addJobWithPriority(markerKey, prioritizedKey, priority, jobId, priorityCounterKey,
  isPausedOrMaxed)
  local score = getPriorityScore(priority, priorityCounterKey)
  rcall("ZADD", prioritizedKey, score, jobId)
  addBaseMarkerIfNeeded(markerKey, isPausedOrMaxed)
end
--[[
  Function to check for the meta.paused key to decide if we are paused or not
  (since an empty list and !EXISTS are not really the same).
]]
local function getTargetQueueList(queueMetaKey, activeKey, waitKey, pausedKey)
  local queueAttributes = rcall("HMGET", queueMetaKey, "paused", "concurrency", "max", "duration")
  if queueAttributes[1] then
    return pausedKey, true, queueAttributes[3], queueAttributes[4]
  else
    if queueAttributes[2] then
      local activeCount = rcall("LLEN", activeKey)
      if activeCount >= tonumber(queueAttributes[2]) then
        return waitKey, true, queueAttributes[3], queueAttributes[4]
      else
        return waitKey, false, queueAttributes[3], queueAttributes[4]
      end
    end
  end
  return waitKey, false, queueAttributes[3], queueAttributes[4]
end
if rcall("ZREM", KEYS[1], jobId) == 1 then
    local jobKey = ARGV[1] .. jobId
    local priority = tonumber(rcall("HGET", jobKey, "priority")) or 0
    local metaKey = KEYS[4]
    local markerKey = KEYS[9]
    -- Remove delayed "marker" from the wait list if there is any.
    -- Since we are adding a job we do not need the marker anymore.
    -- Markers in waitlist DEPRECATED in v5: Remove in v6.
    local target, isPausedOrMaxed = getTargetQueueList(metaKey, KEYS[6], KEYS[2], KEYS[3])
    local marker = rcall("LINDEX", target, 0)
    if marker and string.sub(marker, 1, 2) == "0:" then rcall("LPOP", target) end
    if priority == 0 then
        -- LIFO or FIFO
        addJobInTargetList(target, markerKey, "LPUSH", isPausedOrMaxed, jobId)
    else
        addJobWithPriority(markerKey, KEYS[5], priority, jobId, KEYS[7], isPausedOrMaxed)
    end
    rcall("XADD", KEYS[8], "*", "event", "waiting", "jobId", jobId, "prev",
          "delayed");
    rcall("HSET", jobKey, "delay", 0)
    return 0
else
    return -3
end
`,keys:9};a.s(["promote",0,oC],260051);let oD={name:"releaseLock",content:`--[[
  Release lock
    Input:
      KEYS[1] 'lock',
      ARGV[1]  token
      ARGV[2]  lock duration in milliseconds
    Output:
      "OK" if lock extented succesfully.
]]
local rcall = redis.call
if rcall("GET", KEYS[1]) == ARGV[1] then
  return rcall("DEL", KEYS[1])
else
  return 0
end
`,keys:1};a.s(["releaseLock",0,oD],121230);let oE={name:"removeChildDependency",content:`--[[
  Break parent-child dependency by removing
  child reference from parent
  Input:
    KEYS[1] 'key' prefix,
    ARGV[1] job key
    ARGV[2] parent key
    Output:
       0  - OK
       1  - There is not relationship.
      -1  - Missing job key
      -5  - Missing parent key
]]
local rcall = redis.call
local jobKey = ARGV[1]
local parentKey = ARGV[2]
-- Includes
--[[
  Check if this job has a parent. If so we will just remove it from
  the parent child list, but if it is the last child we should move the parent to "wait/paused"
  which requires code from "moveToFinished"
]]
-- Includes
--[[
  Function to add job in target list and add marker if needed.
]]
-- Includes
--[[
  Add marker if needed when a job is available.
]]
local function addBaseMarkerIfNeeded(markerKey, isPausedOrMaxed)
  if not isPausedOrMaxed then
    rcall("ZADD", markerKey, 0, "0")
  end  
end
local function addJobInTargetList(targetKey, markerKey, pushCmd, isPausedOrMaxed, jobId)
  rcall(pushCmd, targetKey, jobId)
  addBaseMarkerIfNeeded(markerKey, isPausedOrMaxed)
end
--[[
  Functions to destructure job key.
  Just a bit of warning, these functions may be a bit slow and affect performance significantly.
]]
local getJobIdFromKey = function (jobKey)
  return string.match(jobKey, ".*:(.*)")
end
local getJobKeyPrefix = function (jobKey, jobId)
  return string.sub(jobKey, 0, #jobKey - #jobId)
end
--[[
  Function to check for the meta.paused key to decide if we are paused or not
  (since an empty list and !EXISTS are not really the same).
]]
local function getTargetQueueList(queueMetaKey, activeKey, waitKey, pausedKey)
  local queueAttributes = rcall("HMGET", queueMetaKey, "paused", "concurrency", "max", "duration")
  if queueAttributes[1] then
    return pausedKey, true, queueAttributes[3], queueAttributes[4]
  else
    if queueAttributes[2] then
      local activeCount = rcall("LLEN", activeKey)
      if activeCount >= tonumber(queueAttributes[2]) then
        return waitKey, true, queueAttributes[3], queueAttributes[4]
      else
        return waitKey, false, queueAttributes[3], queueAttributes[4]
      end
    end
  end
  return waitKey, false, queueAttributes[3], queueAttributes[4]
end
--[[
  Function to remove job keys.
]]
local function removeJobKeys(jobKey)
  return rcall("DEL", jobKey, jobKey .. ':logs', jobKey .. ':dependencies',
    jobKey .. ':processed', jobKey .. ':failed', jobKey .. ':unsuccessful')
end
local function _moveParentToWait(parentPrefix, parentId, emitEvent)
  local parentTarget, isPausedOrMaxed = getTargetQueueList(parentPrefix .. "meta", parentPrefix .. "active",
    parentPrefix .. "wait", parentPrefix .. "paused")
  addJobInTargetList(parentTarget, parentPrefix .. "marker", "RPUSH", isPausedOrMaxed, parentId)
  if emitEvent then
    local parentEventStream = parentPrefix .. "events"
    rcall("XADD", parentEventStream, "*", "event", "waiting", "jobId", parentId, "prev", "waiting-children")
  end
end
local function removeParentDependencyKey(jobKey, hard, parentKey, baseKey, debounceId)
  if parentKey then
    local parentDependenciesKey = parentKey .. ":dependencies"
    local result = rcall("SREM", parentDependenciesKey, jobKey)
    if result > 0 then
      local pendingDependencies = rcall("SCARD", parentDependenciesKey)
      if pendingDependencies == 0 then
        local parentId = getJobIdFromKey(parentKey)
        local parentPrefix = getJobKeyPrefix(parentKey, parentId)
        local numRemovedElements = rcall("ZREM", parentPrefix .. "waiting-children", parentId)
        if numRemovedElements == 1 then
          if hard then -- remove parent in same queue
            if parentPrefix == baseKey then
              removeParentDependencyKey(parentKey, hard, nil, baseKey, nil)
              removeJobKeys(parentKey)
              if debounceId then
                rcall("DEL", parentPrefix .. "de:" .. debounceId)
              end
            else
              _moveParentToWait(parentPrefix, parentId)
            end
          else
            _moveParentToWait(parentPrefix, parentId, true)
          end
        end
      end
      return true
    end
  else
    local parentAttributes = rcall("HMGET", jobKey, "parentKey", "deid")
    local missedParentKey = parentAttributes[1]
    if( (type(missedParentKey) == "string") and missedParentKey ~= ""
      and (rcall("EXISTS", missedParentKey) == 1)) then
      local parentDependenciesKey = missedParentKey .. ":dependencies"
      local result = rcall("SREM", parentDependenciesKey, jobKey)
      if result > 0 then
        local pendingDependencies = rcall("SCARD", parentDependenciesKey)
        if pendingDependencies == 0 then
          local parentId = getJobIdFromKey(missedParentKey)
          local parentPrefix = getJobKeyPrefix(missedParentKey, parentId)
          local numRemovedElements = rcall("ZREM", parentPrefix .. "waiting-children", parentId)
          if numRemovedElements == 1 then
            if hard then
              if parentPrefix == baseKey then
                removeParentDependencyKey(missedParentKey, hard, nil, baseKey, nil)
                removeJobKeys(missedParentKey)
                if parentAttributes[2] then
                  rcall("DEL", parentPrefix .. "de:" .. parentAttributes[2])
                end
              else
                _moveParentToWait(parentPrefix, parentId)
              end
            else
              _moveParentToWait(parentPrefix, parentId, true)
            end
          end
        end
        return true
      end
    end
  end
  return false
end
if rcall("EXISTS", jobKey) ~= 1 then return -1 end
if rcall("EXISTS", parentKey) ~= 1 then return -5 end
if removeParentDependencyKey(jobKey, false, parentKey, KEYS[1], nil) then
  rcall("HDEL", jobKey, "parentKey", "parent")
  return 0
else
  return 1
end`,keys:1};a.s(["removeChildDependency",0,oE],305547);let oF={name:"removeDeduplicationKey",content:`--[[
  Remove deduplication key if it matches the job id.
  Input:
    KEYS[1] deduplication key
    ARGV[1] job id
  Output:
    0 - false
    1 - true
]]
local rcall = redis.call
local deduplicationKey = KEYS[1]
local jobId = ARGV[1]
local currentJobId = rcall('GET', deduplicationKey)
if currentJobId and currentJobId == jobId then
  return rcall("DEL", deduplicationKey)
end
return 0
`,keys:1};a.s(["removeDeduplicationKey",0,oF],668274);let oG={name:"removeJob",content:`--[[
    Remove a job from all the statuses it may be in as well as all its data.
    In order to be able to remove a job, it cannot be active.
    Input:
      KEYS[1] jobKey
      KEYS[2] repeat key
      ARGV[1] jobId
      ARGV[2] remove children
      ARGV[3] queue prefix
    Events:
      'removed'
]]
local rcall = redis.call
-- Includes
--[[
  Function to check if the job belongs to a job scheduler and
  current delayed job matches with jobId
]]
local function isJobSchedulerJob(jobId, jobKey, jobSchedulersKey)
  local repeatJobKey = rcall("HGET", jobKey, "rjk")
  if repeatJobKey  then
    local prevMillis = rcall("ZSCORE", jobSchedulersKey, repeatJobKey)
    if prevMillis then
      local currentDelayedJobId = "repeat:" .. repeatJobKey .. ":" .. prevMillis
      return jobId == currentDelayedJobId
    end
  end
  return false
end
--[[
  Function to recursively check if there are no locks
  on the jobs to be removed.
  returns:
    boolean
]]
--[[
  Functions to destructure job key.
  Just a bit of warning, these functions may be a bit slow and affect performance significantly.
]]
local getJobIdFromKey = function (jobKey)
  return string.match(jobKey, ".*:(.*)")
end
local getJobKeyPrefix = function (jobKey, jobId)
  return string.sub(jobKey, 0, #jobKey - #jobId)
end
local function isLocked( prefix, jobId, removeChildren)
  local jobKey = prefix .. jobId;
  -- Check if this job is locked
  local lockKey = jobKey .. ':lock'
  local lock = rcall("GET", lockKey)
  if not lock then
    if removeChildren == "1" then
      local dependencies = rcall("SMEMBERS", jobKey .. ":dependencies")
      if (#dependencies > 0) then
        for i, childJobKey in ipairs(dependencies) do
          -- We need to get the jobId for this job.
          local childJobId = getJobIdFromKey(childJobKey)
          local childJobPrefix = getJobKeyPrefix(childJobKey, childJobId)
          local result = isLocked( childJobPrefix, childJobId, removeChildren )
          if result then
            return true
          end
        end
      end
    end
    return false
  end
  return true
end
--[[
    Remove a job from all the statuses it may be in as well as all its data,
    including its children. Active children can be ignored.
    Events:
      'removed'
]]
local rcall = redis.call
-- Includes
--[[
  Function to get max events value or set by default 10000.
]]
local function getOrSetMaxEvents(metaKey)
  local maxEvents = rcall("HGET", metaKey, "opts.maxLenEvents")
  if not maxEvents then
    maxEvents = 10000
    rcall("HSET", metaKey, "opts.maxLenEvents", maxEvents)
  end
  return maxEvents
end
--[[
  Function to remove deduplication key if needed
  when a job is being removed.
]]
local function removeDeduplicationKeyIfNeededOnRemoval(prefixKey,
  jobId, deduplicationId)
  if deduplicationId then
    local deduplicationKey = prefixKey .. "de:" .. deduplicationId
    local currentJobId = rcall('GET', deduplicationKey)
    if currentJobId and currentJobId == jobId then
      return rcall("DEL", deduplicationKey)
    end
  end
end
--[[
  Function to remove from any state.
  returns:
    prev state
]]
local function removeJobFromAnyState( prefix, jobId)
  -- We start with the ZSCORE checks, since they have O(1) complexity
  if rcall("ZSCORE", prefix .. "completed", jobId) then
    rcall("ZREM", prefix .. "completed", jobId)
    return "completed"
  elseif rcall("ZSCORE", prefix .. "waiting-children", jobId) then
    rcall("ZREM", prefix .. "waiting-children", jobId)
    return "waiting-children"
  elseif rcall("ZSCORE", prefix .. "delayed", jobId) then
    rcall("ZREM", prefix .. "delayed", jobId)
    return "delayed"
  elseif rcall("ZSCORE", prefix .. "failed", jobId) then
    rcall("ZREM", prefix .. "failed", jobId)
    return "failed"
  elseif rcall("ZSCORE", prefix .. "prioritized", jobId) then
    rcall("ZREM", prefix .. "prioritized", jobId)
    return "prioritized"
  -- We remove only 1 element from the list, since we assume they are not added multiple times
  elseif rcall("LREM", prefix .. "wait", 1, jobId) == 1 then
    return "wait"
  elseif rcall("LREM", prefix .. "paused", 1, jobId) == 1 then
    return "paused"
  elseif rcall("LREM", prefix .. "active", 1, jobId) == 1 then
    return "active"
  end
  return "unknown"
end
--[[
  Function to remove job keys.
]]
local function removeJobKeys(jobKey)
  return rcall("DEL", jobKey, jobKey .. ':logs', jobKey .. ':dependencies',
    jobKey .. ':processed', jobKey .. ':failed', jobKey .. ':unsuccessful')
end
--[[
  Check if this job has a parent. If so we will just remove it from
  the parent child list, but if it is the last child we should move the parent to "wait/paused"
  which requires code from "moveToFinished"
]]
-- Includes
--[[
  Function to add job in target list and add marker if needed.
]]
-- Includes
--[[
  Add marker if needed when a job is available.
]]
local function addBaseMarkerIfNeeded(markerKey, isPausedOrMaxed)
  if not isPausedOrMaxed then
    rcall("ZADD", markerKey, 0, "0")
  end  
end
local function addJobInTargetList(targetKey, markerKey, pushCmd, isPausedOrMaxed, jobId)
  rcall(pushCmd, targetKey, jobId)
  addBaseMarkerIfNeeded(markerKey, isPausedOrMaxed)
end
--[[
  Function to check for the meta.paused key to decide if we are paused or not
  (since an empty list and !EXISTS are not really the same).
]]
local function getTargetQueueList(queueMetaKey, activeKey, waitKey, pausedKey)
  local queueAttributes = rcall("HMGET", queueMetaKey, "paused", "concurrency", "max", "duration")
  if queueAttributes[1] then
    return pausedKey, true, queueAttributes[3], queueAttributes[4]
  else
    if queueAttributes[2] then
      local activeCount = rcall("LLEN", activeKey)
      if activeCount >= tonumber(queueAttributes[2]) then
        return waitKey, true, queueAttributes[3], queueAttributes[4]
      else
        return waitKey, false, queueAttributes[3], queueAttributes[4]
      end
    end
  end
  return waitKey, false, queueAttributes[3], queueAttributes[4]
end
local function _moveParentToWait(parentPrefix, parentId, emitEvent)
  local parentTarget, isPausedOrMaxed = getTargetQueueList(parentPrefix .. "meta", parentPrefix .. "active",
    parentPrefix .. "wait", parentPrefix .. "paused")
  addJobInTargetList(parentTarget, parentPrefix .. "marker", "RPUSH", isPausedOrMaxed, parentId)
  if emitEvent then
    local parentEventStream = parentPrefix .. "events"
    rcall("XADD", parentEventStream, "*", "event", "waiting", "jobId", parentId, "prev", "waiting-children")
  end
end
local function removeParentDependencyKey(jobKey, hard, parentKey, baseKey, debounceId)
  if parentKey then
    local parentDependenciesKey = parentKey .. ":dependencies"
    local result = rcall("SREM", parentDependenciesKey, jobKey)
    if result > 0 then
      local pendingDependencies = rcall("SCARD", parentDependenciesKey)
      if pendingDependencies == 0 then
        local parentId = getJobIdFromKey(parentKey)
        local parentPrefix = getJobKeyPrefix(parentKey, parentId)
        local numRemovedElements = rcall("ZREM", parentPrefix .. "waiting-children", parentId)
        if numRemovedElements == 1 then
          if hard then -- remove parent in same queue
            if parentPrefix == baseKey then
              removeParentDependencyKey(parentKey, hard, nil, baseKey, nil)
              removeJobKeys(parentKey)
              if debounceId then
                rcall("DEL", parentPrefix .. "de:" .. debounceId)
              end
            else
              _moveParentToWait(parentPrefix, parentId)
            end
          else
            _moveParentToWait(parentPrefix, parentId, true)
          end
        end
      end
      return true
    end
  else
    local parentAttributes = rcall("HMGET", jobKey, "parentKey", "deid")
    local missedParentKey = parentAttributes[1]
    if( (type(missedParentKey) == "string") and missedParentKey ~= ""
      and (rcall("EXISTS", missedParentKey) == 1)) then
      local parentDependenciesKey = missedParentKey .. ":dependencies"
      local result = rcall("SREM", parentDependenciesKey, jobKey)
      if result > 0 then
        local pendingDependencies = rcall("SCARD", parentDependenciesKey)
        if pendingDependencies == 0 then
          local parentId = getJobIdFromKey(missedParentKey)
          local parentPrefix = getJobKeyPrefix(missedParentKey, parentId)
          local numRemovedElements = rcall("ZREM", parentPrefix .. "waiting-children", parentId)
          if numRemovedElements == 1 then
            if hard then
              if parentPrefix == baseKey then
                removeParentDependencyKey(missedParentKey, hard, nil, baseKey, nil)
                removeJobKeys(missedParentKey)
                if parentAttributes[2] then
                  rcall("DEL", parentPrefix .. "de:" .. parentAttributes[2])
                end
              else
                _moveParentToWait(parentPrefix, parentId)
              end
            else
              _moveParentToWait(parentPrefix, parentId, true)
            end
          end
        end
        return true
      end
    end
  end
  return false
end
local removeJobChildren
local removeJobWithChildren
removeJobChildren = function(prefix, jobKey, options)
    -- Check if this job has children
    -- If so, we are going to try to remove the children recursively in a depth-first way
    -- because if some job is locked, we must exit with an error.
    if not options.ignoreProcessed then
        local processed = rcall("HGETALL", jobKey .. ":processed")
        if #processed > 0 then
            for i = 1, #processed, 2 do
                local childJobId = getJobIdFromKey(processed[i])
                local childJobPrefix = getJobKeyPrefix(processed[i], childJobId)
                removeJobWithChildren(childJobPrefix, childJobId, jobKey, options)
            end
        end
        local failed = rcall("HGETALL", jobKey .. ":failed")
        if #failed > 0 then
            for i = 1, #failed, 2 do
                local childJobId = getJobIdFromKey(failed[i])
                local childJobPrefix = getJobKeyPrefix(failed[i], childJobId)
                removeJobWithChildren(childJobPrefix, childJobId, jobKey, options)
            end
        end
        local unsuccessful = rcall("ZRANGE", jobKey .. ":unsuccessful", 0, -1)
        if #unsuccessful > 0 then
            for i = 1, #unsuccessful, 1 do
                local childJobId = getJobIdFromKey(unsuccessful[i])
                local childJobPrefix = getJobKeyPrefix(unsuccessful[i], childJobId)
                removeJobWithChildren(childJobPrefix, childJobId, jobKey, options)
            end
        end
    end
    local dependencies = rcall("SMEMBERS", jobKey .. ":dependencies")
    if #dependencies > 0 then
        for i, childJobKey in ipairs(dependencies) do
            local childJobId = getJobIdFromKey(childJobKey)
            local childJobPrefix = getJobKeyPrefix(childJobKey, childJobId)
            removeJobWithChildren(childJobPrefix, childJobId, jobKey, options)
        end
    end
end
removeJobWithChildren = function(prefix, jobId, parentKey, options)
    local jobKey = prefix .. jobId
    if options.ignoreLocked then
        if isLocked(prefix, jobId) then
            return
        end
    end
    -- Check if job is in the failed zset
    local failedSet = prefix .. "failed"
    if not (options.ignoreProcessed and rcall("ZSCORE", failedSet, jobId)) then
        removeParentDependencyKey(jobKey, false, parentKey, nil)
        if options.removeChildren then
            removeJobChildren(prefix, jobKey, options)
        end
        local prev = removeJobFromAnyState(prefix, jobId)
        local deduplicationId = rcall("HGET", jobKey, "deid")
        removeDeduplicationKeyIfNeededOnRemoval(prefix, jobId, deduplicationId)
        if removeJobKeys(jobKey) > 0 then
            local metaKey = prefix .. "meta"
            local maxEvents = getOrSetMaxEvents(metaKey)
            rcall("XADD", prefix .. "events", "MAXLEN", "~", maxEvents, "*", "event", "removed",
                "jobId", jobId, "prev", prev)
        end
    end
end
local jobId = ARGV[1]
local shouldRemoveChildren = ARGV[2]
local prefix = ARGV[3]
local jobKey = KEYS[1]
local repeatKey = KEYS[2]
if isJobSchedulerJob(jobId, jobKey, repeatKey) then
    return -8
end
if not isLocked(prefix, jobId, shouldRemoveChildren) then
    local options = {
        removeChildren = shouldRemoveChildren == "1",
        ignoreProcessed = false,
        ignoreLocked = false
    }
    removeJobWithChildren(prefix, jobId, nil, options)
    return 1
end
return 0
`,keys:2};a.s(["removeJob",0,oG],352559);let oH={name:"removeJobScheduler",content:`--[[
  Removes a job scheduler and its next scheduled job.
  Input:
    KEYS[1] job schedulers key
    KEYS[2] delayed jobs key
    KEYS[3] events key
    ARGV[1] job scheduler id
    ARGV[2] prefix key
  Output:
    0 - OK
    1 - Missing repeat job
  Events:
    'removed'
]]
local rcall = redis.call
-- Includes
--[[
  Function to remove job keys.
]]
local function removeJobKeys(jobKey)
  return rcall("DEL", jobKey, jobKey .. ':logs', jobKey .. ':dependencies',
    jobKey .. ':processed', jobKey .. ':failed', jobKey .. ':unsuccessful')
end
local jobSchedulerId = ARGV[1]
local prefix = ARGV[2]
local millis = rcall("ZSCORE", KEYS[1], jobSchedulerId)
if millis then
  -- Delete next programmed job.
  local delayedJobId = "repeat:" .. jobSchedulerId .. ":" .. millis
  if(rcall("ZREM", KEYS[2], delayedJobId) == 1) then
    removeJobKeys(prefix .. delayedJobId)
    rcall("XADD", KEYS[3], "*", "event", "removed", "jobId", delayedJobId, "prev", "delayed")
  end
end
if(rcall("ZREM", KEYS[1], jobSchedulerId) == 1) then
  rcall("DEL", KEYS[1] .. ":" .. jobSchedulerId)
  return 0
end
return 1
`,keys:3};a.s(["removeJobScheduler",0,oH],812754);let oI={name:"removeRepeatable",content:`--[[
  Removes a repeatable job
  Input:
    KEYS[1] repeat jobs key
    KEYS[2] delayed jobs key
    KEYS[3] events key
    ARGV[1] old repeat job id
    ARGV[2] options concat
    ARGV[3] repeat job key
    ARGV[4] prefix key
  Output:
    0 - OK
    1 - Missing repeat job
  Events:
    'removed'
]]
local rcall = redis.call
local millis = rcall("ZSCORE", KEYS[1], ARGV[2])
-- Includes
--[[
  Function to remove job keys.
]]
local function removeJobKeys(jobKey)
  return rcall("DEL", jobKey, jobKey .. ':logs', jobKey .. ':dependencies',
    jobKey .. ':processed', jobKey .. ':failed', jobKey .. ':unsuccessful')
end
-- legacy removal TODO: remove in next breaking change
if millis then
  -- Delete next programmed job.
  local repeatJobId = ARGV[1] .. millis
  if(rcall("ZREM", KEYS[2], repeatJobId) == 1) then
    removeJobKeys(ARGV[4] .. repeatJobId)
    rcall("XADD", KEYS[3], "*", "event", "removed", "jobId", repeatJobId, "prev", "delayed");
  end
end
if(rcall("ZREM", KEYS[1], ARGV[2]) == 1) then
  return 0
end
-- new removal
millis = rcall("ZSCORE", KEYS[1], ARGV[3])
if millis then
  -- Delete next programmed job.
  local repeatJobId = "repeat:" .. ARGV[3] .. ":" .. millis
  if(rcall("ZREM", KEYS[2], repeatJobId) == 1) then
    removeJobKeys(ARGV[4] .. repeatJobId)
    rcall("XADD", KEYS[3], "*", "event", "removed", "jobId", repeatJobId, "prev", "delayed")
  end
end
if(rcall("ZREM", KEYS[1], ARGV[3]) == 1) then
  rcall("DEL", KEYS[1] .. ":" .. ARGV[3])
  return 0
end
return 1
`,keys:3};a.s(["removeRepeatable",0,oI],618446);let oJ={name:"removeUnprocessedChildren",content:`--[[
    Remove a job from all the statuses it may be in as well as all its data.
    In order to be able to remove a job, it cannot be active.
    Input:
      KEYS[1] jobKey
      KEYS[2] meta key
      ARGV[1] prefix
      ARGV[2] jobId
    Events:
      'removed' for every children removed
]]
-- Includes
--[[
    Remove a job from all the statuses it may be in as well as all its data,
    including its children. Active children can be ignored.
    Events:
      'removed'
]]
local rcall = redis.call
-- Includes
--[[
  Functions to destructure job key.
  Just a bit of warning, these functions may be a bit slow and affect performance significantly.
]]
local getJobIdFromKey = function (jobKey)
  return string.match(jobKey, ".*:(.*)")
end
local getJobKeyPrefix = function (jobKey, jobId)
  return string.sub(jobKey, 0, #jobKey - #jobId)
end
--[[
  Function to get max events value or set by default 10000.
]]
local function getOrSetMaxEvents(metaKey)
  local maxEvents = rcall("HGET", metaKey, "opts.maxLenEvents")
  if not maxEvents then
    maxEvents = 10000
    rcall("HSET", metaKey, "opts.maxLenEvents", maxEvents)
  end
  return maxEvents
end
--[[
  Function to check if the job belongs to a job scheduler and
  current delayed job matches with jobId
]]
local function isJobSchedulerJob(jobId, jobKey, jobSchedulersKey)
  local repeatJobKey = rcall("HGET", jobKey, "rjk")
  if repeatJobKey  then
    local prevMillis = rcall("ZSCORE", jobSchedulersKey, repeatJobKey)
    if prevMillis then
      local currentDelayedJobId = "repeat:" .. repeatJobKey .. ":" .. prevMillis
      return jobId == currentDelayedJobId
    end
  end
  return false
end
--[[
  Function to remove deduplication key if needed
  when a job is being removed.
]]
local function removeDeduplicationKeyIfNeededOnRemoval(prefixKey,
  jobId, deduplicationId)
  if deduplicationId then
    local deduplicationKey = prefixKey .. "de:" .. deduplicationId
    local currentJobId = rcall('GET', deduplicationKey)
    if currentJobId and currentJobId == jobId then
      return rcall("DEL", deduplicationKey)
    end
  end
end
--[[
  Function to remove from any state.
  returns:
    prev state
]]
local function removeJobFromAnyState( prefix, jobId)
  -- We start with the ZSCORE checks, since they have O(1) complexity
  if rcall("ZSCORE", prefix .. "completed", jobId) then
    rcall("ZREM", prefix .. "completed", jobId)
    return "completed"
  elseif rcall("ZSCORE", prefix .. "waiting-children", jobId) then
    rcall("ZREM", prefix .. "waiting-children", jobId)
    return "waiting-children"
  elseif rcall("ZSCORE", prefix .. "delayed", jobId) then
    rcall("ZREM", prefix .. "delayed", jobId)
    return "delayed"
  elseif rcall("ZSCORE", prefix .. "failed", jobId) then
    rcall("ZREM", prefix .. "failed", jobId)
    return "failed"
  elseif rcall("ZSCORE", prefix .. "prioritized", jobId) then
    rcall("ZREM", prefix .. "prioritized", jobId)
    return "prioritized"
  -- We remove only 1 element from the list, since we assume they are not added multiple times
  elseif rcall("LREM", prefix .. "wait", 1, jobId) == 1 then
    return "wait"
  elseif rcall("LREM", prefix .. "paused", 1, jobId) == 1 then
    return "paused"
  elseif rcall("LREM", prefix .. "active", 1, jobId) == 1 then
    return "active"
  end
  return "unknown"
end
--[[
  Function to remove job keys.
]]
local function removeJobKeys(jobKey)
  return rcall("DEL", jobKey, jobKey .. ':logs', jobKey .. ':dependencies',
    jobKey .. ':processed', jobKey .. ':failed', jobKey .. ':unsuccessful')
end
--[[
  Check if this job has a parent. If so we will just remove it from
  the parent child list, but if it is the last child we should move the parent to "wait/paused"
  which requires code from "moveToFinished"
]]
-- Includes
--[[
  Function to add job in target list and add marker if needed.
]]
-- Includes
--[[
  Add marker if needed when a job is available.
]]
local function addBaseMarkerIfNeeded(markerKey, isPausedOrMaxed)
  if not isPausedOrMaxed then
    rcall("ZADD", markerKey, 0, "0")
  end  
end
local function addJobInTargetList(targetKey, markerKey, pushCmd, isPausedOrMaxed, jobId)
  rcall(pushCmd, targetKey, jobId)
  addBaseMarkerIfNeeded(markerKey, isPausedOrMaxed)
end
--[[
  Function to check for the meta.paused key to decide if we are paused or not
  (since an empty list and !EXISTS are not really the same).
]]
local function getTargetQueueList(queueMetaKey, activeKey, waitKey, pausedKey)
  local queueAttributes = rcall("HMGET", queueMetaKey, "paused", "concurrency", "max", "duration")
  if queueAttributes[1] then
    return pausedKey, true, queueAttributes[3], queueAttributes[4]
  else
    if queueAttributes[2] then
      local activeCount = rcall("LLEN", activeKey)
      if activeCount >= tonumber(queueAttributes[2]) then
        return waitKey, true, queueAttributes[3], queueAttributes[4]
      else
        return waitKey, false, queueAttributes[3], queueAttributes[4]
      end
    end
  end
  return waitKey, false, queueAttributes[3], queueAttributes[4]
end
local function _moveParentToWait(parentPrefix, parentId, emitEvent)
  local parentTarget, isPausedOrMaxed = getTargetQueueList(parentPrefix .. "meta", parentPrefix .. "active",
    parentPrefix .. "wait", parentPrefix .. "paused")
  addJobInTargetList(parentTarget, parentPrefix .. "marker", "RPUSH", isPausedOrMaxed, parentId)
  if emitEvent then
    local parentEventStream = parentPrefix .. "events"
    rcall("XADD", parentEventStream, "*", "event", "waiting", "jobId", parentId, "prev", "waiting-children")
  end
end
local function removeParentDependencyKey(jobKey, hard, parentKey, baseKey, debounceId)
  if parentKey then
    local parentDependenciesKey = parentKey .. ":dependencies"
    local result = rcall("SREM", parentDependenciesKey, jobKey)
    if result > 0 then
      local pendingDependencies = rcall("SCARD", parentDependenciesKey)
      if pendingDependencies == 0 then
        local parentId = getJobIdFromKey(parentKey)
        local parentPrefix = getJobKeyPrefix(parentKey, parentId)
        local numRemovedElements = rcall("ZREM", parentPrefix .. "waiting-children", parentId)
        if numRemovedElements == 1 then
          if hard then -- remove parent in same queue
            if parentPrefix == baseKey then
              removeParentDependencyKey(parentKey, hard, nil, baseKey, nil)
              removeJobKeys(parentKey)
              if debounceId then
                rcall("DEL", parentPrefix .. "de:" .. debounceId)
              end
            else
              _moveParentToWait(parentPrefix, parentId)
            end
          else
            _moveParentToWait(parentPrefix, parentId, true)
          end
        end
      end
      return true
    end
  else
    local parentAttributes = rcall("HMGET", jobKey, "parentKey", "deid")
    local missedParentKey = parentAttributes[1]
    if( (type(missedParentKey) == "string") and missedParentKey ~= ""
      and (rcall("EXISTS", missedParentKey) == 1)) then
      local parentDependenciesKey = missedParentKey .. ":dependencies"
      local result = rcall("SREM", parentDependenciesKey, jobKey)
      if result > 0 then
        local pendingDependencies = rcall("SCARD", parentDependenciesKey)
        if pendingDependencies == 0 then
          local parentId = getJobIdFromKey(missedParentKey)
          local parentPrefix = getJobKeyPrefix(missedParentKey, parentId)
          local numRemovedElements = rcall("ZREM", parentPrefix .. "waiting-children", parentId)
          if numRemovedElements == 1 then
            if hard then
              if parentPrefix == baseKey then
                removeParentDependencyKey(missedParentKey, hard, nil, baseKey, nil)
                removeJobKeys(missedParentKey)
                if parentAttributes[2] then
                  rcall("DEL", parentPrefix .. "de:" .. parentAttributes[2])
                end
              else
                _moveParentToWait(parentPrefix, parentId)
              end
            else
              _moveParentToWait(parentPrefix, parentId, true)
            end
          end
        end
        return true
      end
    end
  end
  return false
end
--[[
  Function to recursively check if there are no locks
  on the jobs to be removed.
  returns:
    boolean
]]
local function isLocked( prefix, jobId, removeChildren)
  local jobKey = prefix .. jobId;
  -- Check if this job is locked
  local lockKey = jobKey .. ':lock'
  local lock = rcall("GET", lockKey)
  if not lock then
    if removeChildren == "1" then
      local dependencies = rcall("SMEMBERS", jobKey .. ":dependencies")
      if (#dependencies > 0) then
        for i, childJobKey in ipairs(dependencies) do
          -- We need to get the jobId for this job.
          local childJobId = getJobIdFromKey(childJobKey)
          local childJobPrefix = getJobKeyPrefix(childJobKey, childJobId)
          local result = isLocked( childJobPrefix, childJobId, removeChildren )
          if result then
            return true
          end
        end
      end
    end
    return false
  end
  return true
end
local removeJobChildren
local removeJobWithChildren
removeJobChildren = function(prefix, jobKey, options)
    -- Check if this job has children
    -- If so, we are going to try to remove the children recursively in a depth-first way
    -- because if some job is locked, we must exit with an error.
    if not options.ignoreProcessed then
        local processed = rcall("HGETALL", jobKey .. ":processed")
        if #processed > 0 then
            for i = 1, #processed, 2 do
                local childJobId = getJobIdFromKey(processed[i])
                local childJobPrefix = getJobKeyPrefix(processed[i], childJobId)
                removeJobWithChildren(childJobPrefix, childJobId, jobKey, options)
            end
        end
        local failed = rcall("HGETALL", jobKey .. ":failed")
        if #failed > 0 then
            for i = 1, #failed, 2 do
                local childJobId = getJobIdFromKey(failed[i])
                local childJobPrefix = getJobKeyPrefix(failed[i], childJobId)
                removeJobWithChildren(childJobPrefix, childJobId, jobKey, options)
            end
        end
        local unsuccessful = rcall("ZRANGE", jobKey .. ":unsuccessful", 0, -1)
        if #unsuccessful > 0 then
            for i = 1, #unsuccessful, 1 do
                local childJobId = getJobIdFromKey(unsuccessful[i])
                local childJobPrefix = getJobKeyPrefix(unsuccessful[i], childJobId)
                removeJobWithChildren(childJobPrefix, childJobId, jobKey, options)
            end
        end
    end
    local dependencies = rcall("SMEMBERS", jobKey .. ":dependencies")
    if #dependencies > 0 then
        for i, childJobKey in ipairs(dependencies) do
            local childJobId = getJobIdFromKey(childJobKey)
            local childJobPrefix = getJobKeyPrefix(childJobKey, childJobId)
            removeJobWithChildren(childJobPrefix, childJobId, jobKey, options)
        end
    end
end
removeJobWithChildren = function(prefix, jobId, parentKey, options)
    local jobKey = prefix .. jobId
    if options.ignoreLocked then
        if isLocked(prefix, jobId) then
            return
        end
    end
    -- Check if job is in the failed zset
    local failedSet = prefix .. "failed"
    if not (options.ignoreProcessed and rcall("ZSCORE", failedSet, jobId)) then
        removeParentDependencyKey(jobKey, false, parentKey, nil)
        if options.removeChildren then
            removeJobChildren(prefix, jobKey, options)
        end
        local prev = removeJobFromAnyState(prefix, jobId)
        local deduplicationId = rcall("HGET", jobKey, "deid")
        removeDeduplicationKeyIfNeededOnRemoval(prefix, jobId, deduplicationId)
        if removeJobKeys(jobKey) > 0 then
            local metaKey = prefix .. "meta"
            local maxEvents = getOrSetMaxEvents(metaKey)
            rcall("XADD", prefix .. "events", "MAXLEN", "~", maxEvents, "*", "event", "removed",
                "jobId", jobId, "prev", prev)
        end
    end
end
local prefix = ARGV[1]
local jobId = ARGV[2]
local jobKey = KEYS[1]
local metaKey = KEYS[2]
local options = {
  removeChildren = "1",
  ignoreProcessed = true,
  ignoreLocked = true
}
removeJobChildren(prefix, jobKey, options) 
`,keys:2};a.s(["removeUnprocessedChildren",0,oJ],933727);let oK={name:"reprocessJob",content:`--[[
  Attempts to reprocess a job
  Input:
    KEYS[1] job key
    KEYS[2] events stream
    KEYS[3] job state
    KEYS[4] wait key
    KEYS[5] meta
    KEYS[6] paused key
    KEYS[7] active key
    KEYS[8] marker key
    ARGV[1] job.id
    ARGV[2] (job.opts.lifo ? 'R' : 'L') + 'PUSH'
    ARGV[3] propVal - failedReason/returnvalue
    ARGV[4] prev state - failed/completed
    ARGV[5] reset attemptsMade - "1" or "0"
    ARGV[6] reset attemptsStarted - "1" or "0"
  Output:
     1 means the operation was a success
    -1 means the job does not exist
    -3 means the job was not found in the expected set.
]]
local rcall = redis.call;
-- Includes
--[[
  Function to add job in target list and add marker if needed.
]]
-- Includes
--[[
  Add marker if needed when a job is available.
]]
local function addBaseMarkerIfNeeded(markerKey, isPausedOrMaxed)
  if not isPausedOrMaxed then
    rcall("ZADD", markerKey, 0, "0")
  end  
end
local function addJobInTargetList(targetKey, markerKey, pushCmd, isPausedOrMaxed, jobId)
  rcall(pushCmd, targetKey, jobId)
  addBaseMarkerIfNeeded(markerKey, isPausedOrMaxed)
end
--[[
  Function to get max events value or set by default 10000.
]]
local function getOrSetMaxEvents(metaKey)
  local maxEvents = rcall("HGET", metaKey, "opts.maxLenEvents")
  if not maxEvents then
    maxEvents = 10000
    rcall("HSET", metaKey, "opts.maxLenEvents", maxEvents)
  end
  return maxEvents
end
--[[
  Function to check for the meta.paused key to decide if we are paused or not
  (since an empty list and !EXISTS are not really the same).
]]
local function getTargetQueueList(queueMetaKey, activeKey, waitKey, pausedKey)
  local queueAttributes = rcall("HMGET", queueMetaKey, "paused", "concurrency", "max", "duration")
  if queueAttributes[1] then
    return pausedKey, true, queueAttributes[3], queueAttributes[4]
  else
    if queueAttributes[2] then
      local activeCount = rcall("LLEN", activeKey)
      if activeCount >= tonumber(queueAttributes[2]) then
        return waitKey, true, queueAttributes[3], queueAttributes[4]
      else
        return waitKey, false, queueAttributes[3], queueAttributes[4]
      end
    end
  end
  return waitKey, false, queueAttributes[3], queueAttributes[4]
end
local jobKey = KEYS[1]
if rcall("EXISTS", jobKey) == 1 then
  local jobId = ARGV[1]
  if (rcall("ZREM", KEYS[3], jobId) == 1) then
    local attributesToRemove = {}
    if ARGV[5] == "1" then
      table.insert(attributesToRemove, "atm")
    end
    if ARGV[6] == "1" then
      table.insert(attributesToRemove, "ats")
    end
    rcall("HDEL", jobKey, "finishedOn", "processedOn", ARGV[3], unpack(attributesToRemove))
    local target, isPausedOrMaxed = getTargetQueueList(KEYS[5], KEYS[7], KEYS[4], KEYS[6])
    addJobInTargetList(target, KEYS[8], ARGV[2], isPausedOrMaxed, jobId)
    local parentKey = rcall("HGET", jobKey, "parentKey")
    if parentKey and rcall("EXISTS", parentKey) == 1 then
      if ARGV[4] == "failed" then
        if rcall("ZREM", parentKey .. ":unsuccessful", jobKey) == 1 or
          rcall("ZREM", parentKey .. ":failed", jobKey) == 1 then
          rcall("SADD", parentKey .. ":dependencies", jobKey)
        end
      else
        if rcall("HDEL", parentKey .. ":processed", jobKey) == 1 then
          rcall("SADD", parentKey .. ":dependencies", jobKey)
        end
      end
    end
    local maxEvents = getOrSetMaxEvents(KEYS[5])
    -- Emit waiting event
    rcall("XADD", KEYS[2], "MAXLEN", "~", maxEvents, "*", "event", "waiting",
      "jobId", jobId, "prev", ARGV[4]);
    return 1
  else
    return -3
  end
else
  return -1
end
`,keys:8};a.s(["reprocessJob",0,oK],584119);let oL={name:"retryJob",content:`--[[
  Retries a failed job by moving it back to the wait queue.
    Input:
      KEYS[1]  'active',
      KEYS[2]  'wait'
      KEYS[3]  'paused'
      KEYS[4]  job key
      KEYS[5]  'meta'
      KEYS[6]  events stream
      KEYS[7]  delayed key
      KEYS[8]  prioritized key
      KEYS[9]  'pc' priority counter
      KEYS[10] 'marker'
      KEYS[11] 'stalled'
      ARGV[1]  key prefix
      ARGV[2]  timestamp
      ARGV[3]  pushCmd
      ARGV[4]  jobId
      ARGV[5]  token
      ARGV[6]  optional job fields to update
    Events:
      'waiting'
    Output:
     0  - OK
     -1 - Missing key
     -2 - Missing lock
     -3 - Job not in active set
]]
local rcall = redis.call
-- Includes
--[[
  Function to add job in target list and add marker if needed.
]]
-- Includes
--[[
  Add marker if needed when a job is available.
]]
local function addBaseMarkerIfNeeded(markerKey, isPausedOrMaxed)
  if not isPausedOrMaxed then
    rcall("ZADD", markerKey, 0, "0")
  end  
end
local function addJobInTargetList(targetKey, markerKey, pushCmd, isPausedOrMaxed, jobId)
  rcall(pushCmd, targetKey, jobId)
  addBaseMarkerIfNeeded(markerKey, isPausedOrMaxed)
end
--[[
  Function to add job considering priority.
]]
-- Includes
--[[
  Function to get priority score.
]]
local function getPriorityScore(priority, priorityCounterKey)
  local prioCounter = rcall("INCR", priorityCounterKey)
  return priority * 0x100000000 + prioCounter % 0x100000000
end
local function addJobWithPriority(markerKey, prioritizedKey, priority, jobId, priorityCounterKey,
  isPausedOrMaxed)
  local score = getPriorityScore(priority, priorityCounterKey)
  rcall("ZADD", prioritizedKey, score, jobId)
  addBaseMarkerIfNeeded(markerKey, isPausedOrMaxed)
end
--[[
  Function to get max events value or set by default 10000.
]]
local function getOrSetMaxEvents(metaKey)
  local maxEvents = rcall("HGET", metaKey, "opts.maxLenEvents")
  if not maxEvents then
    maxEvents = 10000
    rcall("HSET", metaKey, "opts.maxLenEvents", maxEvents)
  end
  return maxEvents
end
--[[
  Function to check for the meta.paused key to decide if we are paused or not
  (since an empty list and !EXISTS are not really the same).
]]
local function getTargetQueueList(queueMetaKey, activeKey, waitKey, pausedKey)
  local queueAttributes = rcall("HMGET", queueMetaKey, "paused", "concurrency", "max", "duration")
  if queueAttributes[1] then
    return pausedKey, true, queueAttributes[3], queueAttributes[4]
  else
    if queueAttributes[2] then
      local activeCount = rcall("LLEN", activeKey)
      if activeCount >= tonumber(queueAttributes[2]) then
        return waitKey, true, queueAttributes[3], queueAttributes[4]
      else
        return waitKey, false, queueAttributes[3], queueAttributes[4]
      end
    end
  end
  return waitKey, false, queueAttributes[3], queueAttributes[4]
end
--[[
  Function to check if queue is paused or maxed
  (since an empty list and !EXISTS are not really the same).
]]
local function isQueuePausedOrMaxed(queueMetaKey, activeKey)
  local queueAttributes = rcall("HMGET", queueMetaKey, "paused", "concurrency")
  if queueAttributes[1] then
    return true
  else
    if queueAttributes[2] then
      local activeCount = rcall("LLEN", activeKey)
      return activeCount >= tonumber(queueAttributes[2])
    end
  end
  return false
end
--[[
  Updates the delay set, by moving delayed jobs that should
  be processed now to "wait".
     Events:
      'waiting'
]]
-- Includes
-- Try to get as much as 1000 jobs at once
local function promoteDelayedJobs(delayedKey, markerKey, targetKey, prioritizedKey,
                                  eventStreamKey, prefix, timestamp, priorityCounterKey, isPaused)
    local jobs = rcall("ZRANGEBYSCORE", delayedKey, 0, (timestamp + 1) * 0x1000 - 1, "LIMIT", 0, 1000)
    if (#jobs > 0) then
        rcall("ZREM", delayedKey, unpack(jobs))
        for _, jobId in ipairs(jobs) do
            local jobKey = prefix .. jobId
            local priority =
                tonumber(rcall("HGET", jobKey, "priority")) or 0
            if priority == 0 then
                -- LIFO or FIFO
                rcall("LPUSH", targetKey, jobId)
            else
                local score = getPriorityScore(priority, priorityCounterKey)
                rcall("ZADD", prioritizedKey, score, jobId)
            end
            -- Emit waiting event
            rcall("XADD", eventStreamKey, "*", "event", "waiting", "jobId",
                  jobId, "prev", "delayed")
            rcall("HSET", jobKey, "delay", 0)
        end
        addBaseMarkerIfNeeded(markerKey, isPaused)
    end
end
local function removeLock(jobKey, stalledKey, token, jobId)
  if token ~= "0" then
    local lockKey = jobKey .. ':lock'
    local lockToken = rcall("GET", lockKey)
    if lockToken == token then
      rcall("DEL", lockKey)
      rcall("SREM", stalledKey, jobId)
    else
      if lockToken then
        -- Lock exists but token does not match
        return -6
      else
        -- Lock is missing completely
        return -2
      end
    end
  end
  return 0
end
--[[
  Function to update a bunch of fields in a job.
]]
local function updateJobFields(jobKey, msgpackedFields)
  if msgpackedFields and #msgpackedFields > 0 then
    local fieldsToUpdate = cmsgpack.unpack(msgpackedFields)
    if fieldsToUpdate then
      rcall("HMSET", jobKey, unpack(fieldsToUpdate))
    end
  end
end
local target, isPausedOrMaxed = getTargetQueueList(KEYS[5], KEYS[1], KEYS[2], KEYS[3])
local markerKey = KEYS[10]
-- Check if there are delayed jobs that we can move to wait.
-- test example: when there are delayed jobs between retries
promoteDelayedJobs(KEYS[7], markerKey, target, KEYS[8], KEYS[6], ARGV[1], ARGV[2], KEYS[9], isPausedOrMaxed)
local jobKey = KEYS[4]
if rcall("EXISTS", jobKey) == 1 then
  local errorCode = removeLock(jobKey, KEYS[11], ARGV[5], ARGV[4]) 
  if errorCode < 0 then
    return errorCode
  end
  updateJobFields(jobKey, ARGV[6])
  local numRemovedElements = rcall("LREM", KEYS[1], -1, ARGV[4])
  if (numRemovedElements < 1) then return -3 end
  local priority = tonumber(rcall("HGET", jobKey, "priority")) or 0
  --need to re-evaluate after removing job from active
  isPausedOrMaxed = isQueuePausedOrMaxed(KEYS[5], KEYS[1])
  -- Standard or priority add
  if priority == 0 then
    addJobInTargetList(target, markerKey, ARGV[3], isPausedOrMaxed, ARGV[4])
  else
    addJobWithPriority(markerKey, KEYS[8], priority, ARGV[4], KEYS[9], isPausedOrMaxed)
  end
  rcall("HINCRBY", jobKey, "atm", 1)
  local maxEvents = getOrSetMaxEvents(KEYS[5])
  -- Emit waiting event
  rcall("XADD", KEYS[6], "MAXLEN", "~", maxEvents, "*", "event", "waiting",
    "jobId", ARGV[4], "prev", "active")
  return 0
else
  return -1
end
`,keys:11};a.s(["retryJob",0,oL],765187);let oM={name:"saveStacktrace",content:`--[[
  Save stacktrace and failedReason.
  Input:
    KEYS[1] job key
    ARGV[1]  stacktrace
    ARGV[2]  failedReason
  Output:
     0 - OK
    -1 - Missing key
]]
local rcall = redis.call
if rcall("EXISTS", KEYS[1]) == 1 then
  rcall("HMSET", KEYS[1], "stacktrace", ARGV[1], "failedReason", ARGV[2])
  return 0
else
  return -1
end
`,keys:1};a.s(["saveStacktrace",0,oM],454674);let oN={name:"updateData",content:`--[[
  Update job data
  Input:
    KEYS[1] Job id key
    ARGV[1] data
  Output:
    0 - OK
   -1 - Missing job.
]]
local rcall = redis.call
if rcall("EXISTS",KEYS[1]) == 1 then -- // Make sure job exists
  rcall("HSET", KEYS[1], "data", ARGV[1])
  return 0
else
  return -1
end
`,keys:1};a.s(["updateData",0,oN],771589);let oO={name:"updateJobScheduler",content:`--[[
  Updates a job scheduler and adds next delayed job
  Input:
    KEYS[1]  'repeat' key
    KEYS[2]  'delayed'
    KEYS[3]  'wait' key
    KEYS[4]  'paused' key
    KEYS[5]  'meta'
    KEYS[6]  'prioritized' key
    KEYS[7]  'marker',
    KEYS[8]  'id'
    KEYS[9]  events stream key
    KEYS[10] 'pc' priority counter
    KEYS[11] producer key
    KEYS[12] 'active' key
    ARGV[1] next milliseconds
    ARGV[2] jobs scheduler id
    ARGV[3] Json stringified delayed data
    ARGV[4] msgpacked delayed opts
    ARGV[5] timestamp
    ARGV[6] prefix key
    ARGV[7] producer id
    Output:
      next delayed job id  - OK
]] local rcall = redis.call
local repeatKey = KEYS[1]
local delayedKey = KEYS[2]
local waitKey = KEYS[3]
local pausedKey = KEYS[4]
local metaKey = KEYS[5]
local prioritizedKey = KEYS[6]
local nextMillis = tonumber(ARGV[1])
local jobSchedulerId = ARGV[2]
local timestamp = tonumber(ARGV[5])
local prefixKey = ARGV[6]
local producerId = ARGV[7]
local jobOpts = cmsgpack.unpack(ARGV[4])
-- Includes
--[[
  Add delay marker if needed.
]]
-- Includes
--[[
  Adds a delayed job to the queue by doing the following:
    - Creates a new job key with the job data.
    - adds to delayed zset.
    - Emits a global event 'delayed' if the job is delayed.
]]
-- Includes
--[[
  Add delay marker if needed.
]]
-- Includes
--[[
  Function to return the next delayed job timestamp.
]]
local function getNextDelayedTimestamp(delayedKey)
  local result = rcall("ZRANGE", delayedKey, 0, 0, "WITHSCORES")
  if #result then
    local nextTimestamp = tonumber(result[2])
    if nextTimestamp ~= nil then
      return nextTimestamp / 0x1000
    end
  end
end
local function addDelayMarkerIfNeeded(markerKey, delayedKey)
  local nextTimestamp = getNextDelayedTimestamp(delayedKey)
  if nextTimestamp ~= nil then
    -- Replace the score of the marker with the newest known
    -- next timestamp.
    rcall("ZADD", markerKey, nextTimestamp, "1")
  end
end
--[[
  Bake in the job id first 12 bits into the timestamp
  to guarantee correct execution order of delayed jobs
  (up to 4096 jobs per given timestamp or 4096 jobs apart per timestamp)
  WARNING: Jobs that are so far apart that they wrap around will cause FIFO to fail
]]
local function getDelayedScore(delayedKey, timestamp, delay)
  local delayedTimestamp = (delay > 0 and (tonumber(timestamp) + delay)) or tonumber(timestamp)
  local minScore = delayedTimestamp * 0x1000
  local maxScore = (delayedTimestamp + 1 ) * 0x1000 - 1
  local result = rcall("ZREVRANGEBYSCORE", delayedKey, maxScore,
    minScore, "WITHSCORES","LIMIT", 0, 1)
  if #result then
    local currentMaxScore = tonumber(result[2])
    if currentMaxScore ~= nil then
      if currentMaxScore >= maxScore then
        return maxScore, delayedTimestamp
      else
        return currentMaxScore + 1, delayedTimestamp
      end
    end
  end
  return minScore, delayedTimestamp
end
local function addDelayedJob(jobId, delayedKey, eventsKey, timestamp,
  maxEvents, markerKey, delay)
  local score, delayedTimestamp = getDelayedScore(delayedKey, timestamp, tonumber(delay))
  rcall("ZADD", delayedKey, score, jobId)
  rcall("XADD", eventsKey, "MAXLEN", "~", maxEvents, "*", "event", "delayed",
    "jobId", jobId, "delay", delayedTimestamp)
  -- mark that a delayed job is available
  addDelayMarkerIfNeeded(markerKey, delayedKey)
end
--[[
  Function to add job considering priority.
]]
-- Includes
--[[
  Add marker if needed when a job is available.
]]
local function addBaseMarkerIfNeeded(markerKey, isPausedOrMaxed)
  if not isPausedOrMaxed then
    rcall("ZADD", markerKey, 0, "0")
  end  
end
--[[
  Function to get priority score.
]]
local function getPriorityScore(priority, priorityCounterKey)
  local prioCounter = rcall("INCR", priorityCounterKey)
  return priority * 0x100000000 + prioCounter % 0x100000000
end
local function addJobWithPriority(markerKey, prioritizedKey, priority, jobId, priorityCounterKey,
  isPausedOrMaxed)
  local score = getPriorityScore(priority, priorityCounterKey)
  rcall("ZADD", prioritizedKey, score, jobId)
  addBaseMarkerIfNeeded(markerKey, isPausedOrMaxed)
end
--[[
  Function to check for the meta.paused key to decide if we are paused or not
  (since an empty list and !EXISTS are not really the same).
]]
local function isQueuePaused(queueMetaKey)
  return rcall("HEXISTS", queueMetaKey, "paused") == 1
end
--[[
  Function to store a job
]]
local function storeJob(eventsKey, jobIdKey, jobId, name, data, opts, timestamp,
                        parentKey, parentData, repeatJobKey)
    local jsonOpts = cjson.encode(opts)
    local delay = opts['delay'] or 0
    local priority = opts['priority'] or 0
    local debounceId = opts['de'] and opts['de']['id']
    local optionalValues = {}
    if parentKey ~= nil then
        table.insert(optionalValues, "parentKey")
        table.insert(optionalValues, parentKey)
        table.insert(optionalValues, "parent")
        table.insert(optionalValues, parentData)
    end
    if repeatJobKey then
        table.insert(optionalValues, "rjk")
        table.insert(optionalValues, repeatJobKey)
    end
    if debounceId then
        table.insert(optionalValues, "deid")
        table.insert(optionalValues, debounceId)
    end
    rcall("HMSET", jobIdKey, "name", name, "data", data, "opts", jsonOpts,
          "timestamp", timestamp, "delay", delay, "priority", priority,
          unpack(optionalValues))
    rcall("XADD", eventsKey, "*", "event", "added", "jobId", jobId, "name", name)
    return delay, priority
end
--[[
  Function to check for the meta.paused key to decide if we are paused or not
  (since an empty list and !EXISTS are not really the same).
]]
local function getTargetQueueList(queueMetaKey, activeKey, waitKey, pausedKey)
  local queueAttributes = rcall("HMGET", queueMetaKey, "paused", "concurrency", "max", "duration")
  if queueAttributes[1] then
    return pausedKey, true, queueAttributes[3], queueAttributes[4]
  else
    if queueAttributes[2] then
      local activeCount = rcall("LLEN", activeKey)
      if activeCount >= tonumber(queueAttributes[2]) then
        return waitKey, true, queueAttributes[3], queueAttributes[4]
      else
        return waitKey, false, queueAttributes[3], queueAttributes[4]
      end
    end
  end
  return waitKey, false, queueAttributes[3], queueAttributes[4]
end
--[[
  Function to add job in target list and add marker if needed.
]]
-- Includes
local function addJobInTargetList(targetKey, markerKey, pushCmd, isPausedOrMaxed, jobId)
  rcall(pushCmd, targetKey, jobId)
  addBaseMarkerIfNeeded(markerKey, isPausedOrMaxed)
end
local function addJobFromScheduler(jobKey, jobId, opts, waitKey, pausedKey, activeKey, metaKey, 
  prioritizedKey, priorityCounter, delayedKey, markerKey, eventsKey, name, maxEvents, timestamp,
  data, jobSchedulerId, repeatDelay)
  opts['delay'] = repeatDelay
  opts['jobId'] = jobId
  local delay, priority = storeJob(eventsKey, jobKey, jobId, name, data,
    opts, timestamp, nil, nil, jobSchedulerId)
  if delay ~= 0 then
    addDelayedJob(jobId, delayedKey, eventsKey, timestamp, maxEvents, markerKey, delay)
  else
    local target, isPausedOrMaxed = getTargetQueueList(metaKey, activeKey, waitKey, pausedKey)
    -- Standard or priority add
    if priority == 0 then
      local pushCmd = opts['lifo'] and 'RPUSH' or 'LPUSH'
      addJobInTargetList(target, markerKey, pushCmd, isPausedOrMaxed, jobId)
    else
      -- Priority add
      addJobWithPriority(markerKey, prioritizedKey, priority, jobId, priorityCounter, isPausedOrMaxed)
    end
    -- Emit waiting event
    rcall("XADD", eventsKey, "MAXLEN", "~", maxEvents,  "*", "event", "waiting", "jobId", jobId)
  end
end
--[[
  Function to get max events value or set by default 10000.
]]
local function getOrSetMaxEvents(metaKey)
  local maxEvents = rcall("HGET", metaKey, "opts.maxLenEvents")
  if not maxEvents then
    maxEvents = 10000
    rcall("HSET", metaKey, "opts.maxLenEvents", maxEvents)
  end
  return maxEvents
end
local function getJobSchedulerEveryNextMillis(prevMillis, every, now, offset, startDate)
    local nextMillis
    if not prevMillis then
        if startDate then
            -- Assuming startDate is passed as milliseconds from JavaScript
            nextMillis = tonumber(startDate)
            nextMillis = nextMillis > now and nextMillis or now
        else
            nextMillis = now
        end
    else
        nextMillis = prevMillis + every
        -- check if we may have missed some iterations
        if nextMillis < now then
            nextMillis = math.floor(now / every) * every + every + (offset or 0)
        end
    end
    if not offset or offset == 0 then
        local timeSlot = math.floor(nextMillis / every) * every;
        offset = nextMillis - timeSlot;
    end
    -- Return a tuple nextMillis, offset
    return math.floor(nextMillis), math.floor(offset)
end
local prevMillis = rcall("ZSCORE", repeatKey, jobSchedulerId)
-- Validate that scheduler exists.
-- If it does not exist we should not iterate anymore.
if prevMillis then
    prevMillis = tonumber(prevMillis)
    local schedulerKey = repeatKey .. ":" .. jobSchedulerId
    local schedulerAttributes = rcall("HMGET", schedulerKey, "name", "data", "every", "startDate", "offset")
    local every = tonumber(schedulerAttributes[3])
    local now = tonumber(timestamp)
    -- If every is not found in scheduler attributes, try to get it from job options
    if not every and jobOpts['repeat'] and jobOpts['repeat']['every'] then
        every = tonumber(jobOpts['repeat']['every'])
    end
    if every then
        local startDate = schedulerAttributes[4]
        local jobOptsOffset = jobOpts['repeat'] and jobOpts['repeat']['offset'] or 0
        local offset = schedulerAttributes[5] or jobOptsOffset or 0
        local newOffset
        nextMillis, newOffset = getJobSchedulerEveryNextMillis(prevMillis, every, now, offset, startDate)
        if not offset then
            rcall("HSET", schedulerKey, "offset", newOffset)
            jobOpts['repeat']['offset'] = newOffset
        end
    end
    local nextDelayedJobId = "repeat:" .. jobSchedulerId .. ":" .. nextMillis
    local nextDelayedJobKey = schedulerKey .. ":" .. nextMillis
    local currentDelayedJobId = "repeat:" .. jobSchedulerId .. ":" .. prevMillis
    if producerId == currentDelayedJobId then
        local eventsKey = KEYS[9]
        local maxEvents = getOrSetMaxEvents(metaKey)
        if rcall("EXISTS", nextDelayedJobKey) ~= 1 then
            rcall("ZADD", repeatKey, nextMillis, jobSchedulerId)
            rcall("HINCRBY", schedulerKey, "ic", 1)
            rcall("INCR", KEYS[8])
            -- TODO: remove this workaround in next breaking change,
            -- all job-schedulers must save job data
            local templateData = schedulerAttributes[2] or ARGV[3]
            if templateData and templateData ~= '{}' then
                rcall("HSET", schedulerKey, "data", templateData)
            end
            local delay = nextMillis - now
            -- Fast Clamp delay to minimum of 0
            if delay < 0 then
                delay = 0
            end
            jobOpts["delay"] = delay
            addJobFromScheduler(nextDelayedJobKey, nextDelayedJobId, jobOpts, waitKey, pausedKey, KEYS[12], metaKey,
                prioritizedKey, KEYS[10], delayedKey, KEYS[7], eventsKey, schedulerAttributes[1], maxEvents, ARGV[5],
                templateData or '{}', jobSchedulerId, delay)
            -- TODO: remove this workaround in next breaking change
            if KEYS[11] ~= "" then
                rcall("HSET", KEYS[11], "nrjid", nextDelayedJobId)
            end
            return nextDelayedJobId .. "" -- convert to string
        else
            rcall("XADD", eventsKey, "MAXLEN", "~", maxEvents, "*", "event", "duplicated", "jobId", nextDelayedJobId)
        end
    end
end
`,keys:12};a.s(["updateJobScheduler",0,oO],518096);let oP={name:"updateProgress",content:`--[[
  Update job progress
  Input:
    KEYS[1] Job id key
    KEYS[2] event stream key
    KEYS[3] meta key
    ARGV[1] id
    ARGV[2] progress
  Output:
     0 - OK
    -1 - Missing job.
  Event:
    progress(jobId, progress)
]]
local rcall = redis.call
-- Includes
--[[
  Function to get max events value or set by default 10000.
]]
local function getOrSetMaxEvents(metaKey)
  local maxEvents = rcall("HGET", metaKey, "opts.maxLenEvents")
  if not maxEvents then
    maxEvents = 10000
    rcall("HSET", metaKey, "opts.maxLenEvents", maxEvents)
  end
  return maxEvents
end
if rcall("EXISTS", KEYS[1]) == 1 then -- // Make sure job exists
    local maxEvents = getOrSetMaxEvents(KEYS[3])
    rcall("HSET", KEYS[1], "progress", ARGV[2])
    rcall("XADD", KEYS[2], "MAXLEN", "~", maxEvents, "*", "event", "progress",
          "jobId", ARGV[1], "data", ARGV[2]);
    return 0
else
    return -1
end
`,keys:3};a.s(["updateProgress",0,oP],587976);let oQ={name:"updateRepeatableJobMillis",content:`--[[
  Adds a repeatable job
    Input:
      KEYS[1] 'repeat' key
      ARGV[1] next milliseconds
      ARGV[2] custom key
      ARGV[3] legacy custom key TODO: remove this logic in next breaking change
      Output:
        repeatableKey  - OK
]]
local rcall = redis.call
local repeatKey = KEYS[1]
local nextMillis = ARGV[1]
local customKey = ARGV[2]
local legacyCustomKey = ARGV[3]
if rcall("ZSCORE", repeatKey, customKey) then
    rcall("ZADD", repeatKey, nextMillis, customKey)
    return customKey
elseif rcall("ZSCORE", repeatKey, legacyCustomKey) ~= false then
    rcall("ZADD", repeatKey, nextMillis, legacyCustomKey)
    return legacyCustomKey
end
return ''
`,keys:1};a.s(["updateRepeatableJobMillis",0,oQ],683478),a.s([],719457),a.i(719457),a.i(299629),a.i(279723),a.i(279379),a.i(716566),a.i(581636),a.i(258042),a.i(656768),a.i(766008),a.i(529263),a.i(48414),a.i(438564),a.i(19165),a.i(634563),a.i(900552),a.i(322821),a.i(436227),a.i(54650),a.i(284762),a.i(77930),a.i(699422),a.i(260312),a.i(940649),a.i(182886),a.i(47199),a.i(874170),a.i(938677),a.i(274909),a.i(974753),a.i(949704),a.i(622279),a.i(274877),a.i(502043),a.i(288402),a.i(360629),a.i(357991),a.i(260051),a.i(121230),a.i(305547),a.i(668274),a.i(352559),a.i(812754),a.i(618446),a.i(933727),a.i(584119),a.i(765187),a.i(454674),a.i(771589),a.i(518096),a.i(587976),a.i(683478),a.s(["addDelayedJob",0,n3,"addJobScheduler",0,n4,"addLog",0,n5,"addParentJob",0,n6,"addPrioritizedJob",0,n7,"addRepeatableJob",0,n8,"addStandardJob",0,n9,"changeDelay",0,oa,"changePriority",0,ob,"cleanJobsInSet",0,oc,"drain",0,od,"extendLock",0,oe,"extendLocks",0,of,"getCounts",0,og,"getCountsPerPriority",0,oh,"getDependencyCounts",0,oi,"getJobScheduler",0,oj,"getMetrics",0,ok,"getRanges",0,ol,"getRateLimitTtl",0,om,"getState",0,on,"getStateV2",0,oo,"isFinished",0,op,"isJobInList",0,oq,"isMaxed",0,or,"moveJobFromActiveToWait",0,os,"moveJobsToWait",0,ot,"moveStalledJobsToWait",0,ou,"moveToActive",0,ov,"moveToDelayed",0,ow,"moveToFinished",0,ox,"moveToWaitingChildren",0,oy,"obliterate",0,oz,"paginate",0,oA,"pause",0,oB,"promote",0,oC,"releaseLock",0,oD,"removeChildDependency",0,oE,"removeDeduplicationKey",0,oF,"removeJob",0,oG,"removeJobScheduler",0,oH,"removeRepeatable",0,oI,"removeUnprocessedChildren",0,oJ,"reprocessJob",0,oK,"retryJob",0,oL,"saveStacktrace",0,oM,"updateData",0,oN,"updateJobScheduler",0,oO,"updateProgress",0,oP,"updateRepeatableJobMillis",0,oQ],893160);var oR=a.i(893160);class oS extends n2.EventEmitter{constructor(a,b){if(super(),this.extraOptions=b,this.capabilities={canDoubleTimeout:!1,canBlockFor1Ms:!0},this.status="initializing",this.packageVersion=nV,this.extraOptions=Object.assign({shared:!1,blocking:!0,skipVersionCheck:!1,skipWaitingForReady:!1},b),ms(a)){if(this._client=a,this._client.options.keyPrefix)throw Error("BullMQ: ioredis does not support ioredis prefixes, use the prefix option instead.");!function(a){return ms(a)&&a.isCluster}(this._client)?this.opts=this._client.options:this.opts=this._client.options.redisOptions,this.checkBlockingOptions("BullMQ: Your redis options maxRetriesPerRequest must be null.",this.opts,!0)}else this.checkBlockingOptions("BullMQ: WARNING! Your redis options maxRetriesPerRequest must be null and will be overridden by BullMQ.",a),this.opts=Object.assign({port:6379,host:"127.0.0.1",retryStrategy:function(a){return Math.max(Math.min(Math.exp(a),2e4),1e3)}},a),this.extraOptions.blocking&&(this.opts.maxRetriesPerRequest=null);this.skipVersionCheck=(null==b?void 0:b.skipVersionCheck)||!!(this.opts&&this.opts.skipVersionCheck),this.handleClientError=a=>{this.emit("error",a)},this.handleClientClose=()=>{this.emit("close")},this.handleClientReady=()=>{this.emit("ready")},this.initializing=this.init(),this.initializing.catch(a=>this.emit("error",a))}checkBlockingOptions(a,b,c=!1){if(this.extraOptions.blocking&&b&&b.maxRetriesPerRequest)if(c)throw Error(a);else console.error(a)}static async waitUntilReady(a){let b,c,d;if("ready"!==a.status){if("wait"===a.status)return a.connect();if("end"===a.status)throw Error(mj.CONNECTION_CLOSED_ERROR_MSG);try{await new Promise((e,f)=>{let g;d=a=>{g=a},b=()=>{e()},c=()=>{"end"!==a.status?f(g||Error(mj.CONNECTION_CLOSED_ERROR_MSG)):g?f(g):e()},mp(a,3),a.once("ready",b),a.on("end",c),a.once("error",d)})}finally{a.removeListener("end",c),a.removeListener("error",d),a.removeListener("ready",b),mp(a,-3)}}}get client(){return this.initializing}loadCommands(a,b){let c=b||oR;for(let b in c){let d=`${c[b].name}:${a}`;this._client[d]||this._client.defineCommand(d,{numberOfKeys:c[b].keys,lua:c[b].content})}}async init(){if(!this._client){let a=this.opts,{url:b}=a,c=(0,mG.__rest)(a,["url"]);this._client=b?new mi.default(b,c):new mi.default(c)}if(mp(this._client,3),this._client.on("error",this.handleClientError),this._client.on("close",this.handleClientClose),this._client.on("ready",this.handleClientReady),this.extraOptions.skipWaitingForReady||await oS.waitUntilReady(this._client),this.loadCommands(this.packageVersion),"end"!==this._client.status){if(this.version=await this.getRedisVersion(),!0!==this.skipVersionCheck&&!this.closing){if(mw(this.version,oS.minimumVersion))throw Error(`Redis version needs to be greater or equal than ${oS.minimumVersion} Current: ${this.version}`);mw(this.version,oS.recommendedMinimumVersion)&&console.warn(`It is highly recommended to use a minimum Redis version of ${oS.recommendedMinimumVersion}
             Current: ${this.version}`)}this.capabilities={canDoubleTimeout:!mw(this.version,"6.0.0"),canBlockFor1Ms:!mw(this.version,"7.0.8")},this.status="ready"}return this._client}async disconnect(a=!0){let b=await this.client;if("end"!==b.status){let c,d;if(!a)return b.disconnect();let e=new Promise((a,e)=>{mp(b,2),b.once("end",a),b.once("error",e),c=a,d=e});b.disconnect();try{await e}finally{mp(b,-2),b.removeListener("end",c),b.removeListener("error",d)}}}async reconnect(){return(await this.client).connect()}async close(a=!1){if(!this.closing){let b=this.status;this.status="closing",this.closing=!0;try{"ready"===b&&await this.initializing,this.extraOptions.shared||("initializing"==b||a?this._client.disconnect():await this._client.quit(),this._client.status="end")}catch(a){if(mv(a))throw a}finally{this._client.off("error",this.handleClientError),this._client.off("close",this.handleClientClose),this._client.off("ready",this.handleClientReady),mp(this._client,-3),this.removeAllListeners(),this.status="closed"}}}async getRedisVersion(){let a;if(this.skipVersionCheck)return oS.minimumVersion;let b=await this._client.info(),c="redis_version:",d="maxmemory_policy:",e=b.split(/\r?\n/);for(let b=0;b<e.length;b++){if(0===e[b].indexOf(d)){let a=e[b].substr(d.length);"noeviction"!==a&&console.warn(`IMPORTANT! Eviction policy is ${a}. It should be "noeviction"`)}0===e[b].indexOf(c)&&(a=e[b].substr(c.length))}return a}get redisVersion(){return this.version}}oS.minimumVersion="5.0.0",oS.recommendedMinimumVersion="6.2.0",mg.EventEmitter;var oT=a.i(410471),oU=mg;class oV extends oU.EventEmitter{constructor(a,b={connection:{}},c=oS,d=!1){if(super(),this.name=a,this.opts=b,this.closed=!1,this.hasBlockingConnection=!1,this.hasBlockingConnection=d,this.opts=Object.assign({prefix:"bull"},b),!a)throw Error("Queue name must be provided");if(a.includes(":"))throw Error("Queue name cannot contain :");this.connection=new c(b.connection,{shared:ms(b.connection),blocking:d,skipVersionCheck:b.skipVersionCheck,skipWaitingForReady:b.skipWaitingForReady}),this.connection.on("error",a=>this.emit("error",a)),this.connection.on("close",()=>{this.closing||this.emit("ioredis:close")});const e=new n1(b.prefix);this.qualifiedName=e.getQueueQualifiedName(a),this.keys=e.getKeys(a),this.toKey=b=>e.toKey(a,b),this.createScripts()}get client(){return this.connection.client}createScripts(){this.scripts=nZ(this)}get redisVersion(){return this.connection.redisVersion}get Job(){return n_}emit(a,...b){try{return super.emit(a,...b)}catch(a){try{return super.emit("error",a)}catch(a){return console.error(a),!1}}}waitUntilReady(){return this.client}base64Name(){return Buffer.from(this.name).toString("base64")}clientName(a=""){let b=this.base64Name();return`${this.opts.prefix}:${b}${a}`}async close(){this.closing||(this.closing=this.connection.close()),await this.closing,this.closed=!0}disconnect(){return this.connection.disconnect()}async checkConnectionError(a,b=5e3){try{return await a()}catch(a){if(mv(a)&&this.emit("error",a),this.closing||!b)return;await new Promise(a=>{let c;c=setTimeout(()=>{clearTimeout(c),a()},b)})}}trace(a,b,c,d,e){return my(this.opts.telemetry,a,this.name,b,c,d,e)}}class oW extends oV{constructor(a,b,c){super(a,b,c),this.repeatStrategy=b.settings&&b.settings.repeatStrategy||oX}async upsertJobScheduler(a,b,c,d,e,{override:f,producerId:g}){let h,{every:i,limit:j,pattern:k,offset:l}=b;if(k&&i)throw Error("Both .pattern and .every options are defined for this repeatable job");if(!k&&!i)throw Error("Either .pattern or .every options must be defined for this repeatable job");if(b.immediately&&b.startDate)throw Error("Both .immediately and .startDate options are defined for this repeatable job");b.immediately&&b.every&&console.warn("Using option immediately with every does not affect the job's schedule. Job will run immediately anyway.");let m=b.count?b.count+1:1;if(void 0!==b.limit&&m>b.limit)return;let n=Date.now(),{endDate:o}=b;if(o&&n>new Date(o).getTime())return;let p=e.prevMillis||0;n=p<n?n:p;let{immediately:q}=b,r=(0,mG.__rest)(b,["immediately"]);if(k&&(h=await this.repeatStrategy(n,b,c))<n&&(h=n),h||i)return this.trace(Q.PRODUCER,"add",`${this.name}.${c}`,async(l,p)=>{var q,s;let t=e.telemetry;if(p){let a=null==(q=e.telemetry)?void 0:q.omitContext,b=(null==(s=e.telemetry)?void 0:s.metadata)||!a&&p;(b||a)&&(t={metadata:b,omitContext:a})}let u=this.getNextJobOpts(h,a,Object.assign(Object.assign({},e),{repeat:r,telemetry:t}),m,null);if(f){h<n&&(h=n);let[f,m]=await this.scripts.addJobScheduler(a,h,JSON.stringify(void 0===d?{}:d),n_.optsAsJSON(e),{name:c,startDate:b.startDate?new Date(b.startDate).getTime():void 0,endDate:o?new Date(o).getTime():void 0,tz:b.tz,pattern:k,every:i,limit:j,offset:null},n_.optsAsJSON(u),g),p="string"==typeof m?parseInt(m,10):m,q=new this.Job(this,c,d,Object.assign(Object.assign({},u),{delay:p}),f);return q.id=f,null==l||l.setAttributes({[P.JobSchedulerId]:a,[P.JobId]:q.id}),q}{let b=await this.scripts.updateJobSchedulerNextMillis(a,h,JSON.stringify(void 0===d?{}:d),n_.optsAsJSON(u),g);if(b){let e=new this.Job(this,c,d,u,b);return e.id=b,null==l||l.setAttributes({[P.JobSchedulerId]:a,[P.JobId]:e.id}),e}}})}getNextJobOpts(a,b,c,d,e){var f,g;let h=this.getSchedulerNextJobId({jobSchedulerId:b,nextMillis:a}),i=Date.now(),j=a+e-i,k=Object.assign(Object.assign({},c),{jobId:h,delay:j<0?0:j,timestamp:i,prevMillis:a,repeatJobKey:b});return k.repeat=Object.assign(Object.assign({},c.repeat),{offset:e,count:d,startDate:(null==(f=c.repeat)?void 0:f.startDate)?new Date(c.repeat.startDate).getTime():void 0,endDate:(null==(g=c.repeat)?void 0:g.endDate)?new Date(c.repeat.endDate).getTime():void 0}),k}async removeJobScheduler(a){return this.scripts.removeJobScheduler(a)}async getSchedulerData(a,b,c){let d=await a.hgetall(this.toKey("repeat:"+b));return this.transformSchedulerData(b,d,c)}transformSchedulerData(a,b,c){if(b){let d={key:a,name:b.name,next:c};return b.ic&&(d.iterationCount=parseInt(b.ic)),b.limit&&(d.limit=parseInt(b.limit)),b.startDate&&(d.startDate=parseInt(b.startDate)),b.endDate&&(d.endDate=parseInt(b.endDate)),b.tz&&(d.tz=b.tz),b.pattern&&(d.pattern=b.pattern),b.every&&(d.every=parseInt(b.every)),b.offset&&(d.offset=parseInt(b.offset)),(b.data||b.opts)&&(d.template=this.getTemplateFromJSON(b.data,b.opts)),d}if(a.includes(":"))return this.keyToData(a,c)}keyToData(a,b){let c=a.split(":"),d=c.slice(4).join(":")||null;return{key:a,name:c[0],id:c[1]||null,endDate:parseInt(c[2])||null,tz:c[3]||null,pattern:d,next:b}}async getScheduler(a){let[b,c]=await this.scripts.getJobScheduler(a);return this.transformSchedulerData(a,b?mn(b):null,c?parseInt(c):null)}getTemplateFromJSON(a,b){let c={};return a&&(c.data=JSON.parse(a)),b&&(c.opts=n_.optsFromJSON(b)),c}async getJobSchedulers(a=0,b=-1,c=!1){let d=await this.client,e=this.keys.repeat,f=c?await d.zrange(e,a,b,"WITHSCORES"):await d.zrevrange(e,a,b,"WITHSCORES"),g=[];for(let a=0;a<f.length;a+=2)g.push(this.getSchedulerData(d,f[a],parseInt(f[a+1])));return Promise.all(g)}async getSchedulersCount(){let a=this.keys.repeat;return(await this.client).zcard(a)}getSchedulerNextJobId({nextMillis:a,jobSchedulerId:b}){return`repeat:${b}:${a}`}}let oX=(a,b)=>{let{pattern:c}=b,d=new Date(a),e=b.startDate&&new Date(b.startDate),f=(0,oT.parseExpression)(c,Object.assign(Object.assign({},b),{currentDate:e>d?e:d}));try{if(b.immediately)return new Date().getTime();return f.next().getTime()}catch(a){}};a.i(748064);class oY extends oV{getJob(a){return this.Job.fromId(this,a)}commandByType(a,b,c){return a.map(a=>{a="waiting"===a?"wait":a;let d=this.toKey(a);switch(a){case"completed":case"failed":case"delayed":case"prioritized":case"repeat":case"waiting-children":return c(d,b?"zcard":"zrange");case"active":case"wait":case"paused":return c(d,b?"llen":"lrange")}})}sanitizeJobTypes(a){let b="string"==typeof a?[a]:a;if(Array.isArray(b)&&b.length>0){let a=[...b];return -1!==a.indexOf("waiting")&&a.push("paused"),[...new Set(a)]}return["active","completed","delayed","failed","paused","prioritized","waiting","waiting-children"]}async count(){return await this.getJobCountByTypes("waiting","paused","delayed","prioritized","waiting-children")}async getRateLimitTtl(a){return this.scripts.getRateLimitTtl(a)}async getDebounceJobId(a){return(await this.client).get(`${this.keys.de}:${a}`)}async getDeduplicationJobId(a){return(await this.client).get(`${this.keys.de}:${a}`)}async getGlobalConcurrency(){let a=await this.client,b=await a.hget(this.keys.meta,"concurrency");return b?Number(b):null}async getGlobalRateLimit(){let a=await this.client,[b,c]=await a.hmget(this.keys.meta,"max","duration");return b&&c?{max:Number(b),duration:Number(c)}:null}async getJobCountByTypes(...a){return Object.values(await this.getJobCounts(...a)).reduce((a,b)=>a+b,0)}async getJobCounts(...a){let b=this.sanitizeJobTypes(a),c=await this.scripts.getCounts(b),d={};return c.forEach((a,c)=>{d[b[c]]=a||0}),d}getJobState(a){return this.scripts.getState(a)}async getMeta(){let a=await this.client,b=await a.hgetall(this.keys.meta),{concurrency:c,max:d,duration:e,paused:f,"opts.maxLenEvents":g}=b,h=(0,mG.__rest)(b,["concurrency","max","duration","paused","opts.maxLenEvents"]);return c&&(h.concurrency=Number(c)),g&&(h.maxLenEvents=Number(g)),d&&(h.max=Number(d)),e&&(h.duration=Number(e)),h.paused="1"===f,h}getCompletedCount(){return this.getJobCountByTypes("completed")}getFailedCount(){return this.getJobCountByTypes("failed")}getDelayedCount(){return this.getJobCountByTypes("delayed")}getActiveCount(){return this.getJobCountByTypes("active")}getPrioritizedCount(){return this.getJobCountByTypes("prioritized")}async getCountsPerPriority(a){let b=[...new Set(a)],c=await this.scripts.getCountsPerPriority(b),d={};return c.forEach((a,c)=>{d[`${b[c]}`]=a||0}),d}getWaitingCount(){return this.getJobCountByTypes("waiting")}getWaitingChildrenCount(){return this.getJobCountByTypes("waiting-children")}getWaiting(a=0,b=-1){return this.getJobs(["waiting"],a,b,!0)}getWaitingChildren(a=0,b=-1){return this.getJobs(["waiting-children"],a,b,!0)}getActive(a=0,b=-1){return this.getJobs(["active"],a,b,!0)}getDelayed(a=0,b=-1){return this.getJobs(["delayed"],a,b,!0)}getPrioritized(a=0,b=-1){return this.getJobs(["prioritized"],a,b,!0)}getCompleted(a=0,b=-1){return this.getJobs(["completed"],a,b,!1)}getFailed(a=0,b=-1){return this.getJobs(["failed"],a,b,!1)}async getDependencies(a,b,c,d){let e=this.toKey("processed"==b?`${a}:processed`:`${a}:dependencies`),{items:f,total:g,jobs:h}=await this.scripts.paginate(e,{start:c,end:d,fetchJobs:!0});return{items:f,jobs:h,total:g}}async getRanges(a,b=0,c=1,d=!1){let e=[];this.commandByType(a,!1,(a,b)=>{switch(b){case"lrange":e.push("lrange");break;case"zrange":e.push("zrange")}});let f=await this.scripts.getRanges(a,b,c,d),g=[];return f.forEach((a,b)=>{let c=a||[];g=d&&"lrange"===e[b]?g.concat(c.reverse()):g.concat(c)}),[...new Set(g)]}async getJobs(a,b=0,c=-1,d=!1){let e=this.sanitizeJobTypes(a);return Promise.all((await this.getRanges(e,b,c,d)).map(a=>this.Job.fromId(this,a)))}async getJobLogs(a,b=0,c=-1,d=!0){let e=(await this.client).multi(),f=this.toKey(a+":logs");d?e.lrange(f,b,c):e.lrange(f,-(c+1),-(b+1)),e.llen(f);let g=await e.exec();return d||g[0][1].reverse(),{logs:g[0][1],count:g[1][1]}}async baseGetClients(a){let b=await this.client;try{let c=await b.client("LIST");return this.parseClientList(c,a)}catch(a){if(!mu.test(a.message))throw a;return[{name:"GCP does not support client list"}]}}getWorkers(){let a=`${this.clientName()}`,b=`${this.clientName()}:w:`;return this.baseGetClients(c=>c&&(c===a||c.startsWith(b)))}async getWorkersCount(){return(await this.getWorkers()).length}async getQueueEvents(){let a=`${this.clientName()}:qe`;return this.baseGetClients(b=>b===a)}async getMetrics(a,b=0,c=-1){let[d,e,f]=await this.scripts.getMetrics(a,b,c);return{meta:{count:parseInt(d[0]||"0",10),prevTS:parseInt(d[1]||"0",10),prevCount:parseInt(d[2]||"0",10)},data:e.map(a=>+a||0),count:f}}parseClientList(a,b){let c=a.split(/\r?\n/),d=[];return c.forEach(a=>{let c={};a.split(" ").forEach(function(a){let b=a.indexOf("="),d=a.substring(0,b),e=a.substring(b+1);c[d]=e});let e=c.name;b(e)&&(c.name=this.name,c.rawname=e,d.push(c))}),d}async exportPrometheusMetrics(a){let b=await this.getJobCounts(),c=[];c.push("# HELP bullmq_job_count Number of jobs in the queue by state"),c.push("# TYPE bullmq_job_count gauge");let d=a?Object.keys(a).reduce((b,c)=>`${b}, ${c}="${a[c]}"`,""):"";for(let[a,e]of Object.entries(b))c.push(`bullmq_job_count{queue="${this.name}", state="${a}"${d}} ${e}`);return c.join("\n")}}class oZ extends oV{constructor(a,b,c){super(a,b,c),this.repeatStrategy=b.settings&&b.settings.repeatStrategy||o_,this.repeatKeyHashAlgorithm=b.settings&&b.settings.repeatKeyHashAlgorithm||"md5"}async updateRepeatableJob(a,b,c,{override:d}){var e;let f=Object.assign({},c.repeat);null!=f.pattern||(f.pattern=f.cron),delete f.cron;let g=f.count?f.count+1:1;if(void 0!==f.limit&&g>f.limit)return;let h=Date.now(),{endDate:i}=f;if(i&&h>new Date(i).getTime())return;let j=c.prevMillis||0;h=j<h?h:j;let k=await this.repeatStrategy(h,f,a),{every:l,pattern:m}=f,n=!!((l||m)&&f.immediately),o=n&&l?h-k:void 0;if(k){let h;!j&&c.jobId&&(f.jobId=c.jobId);let p=o$(a,f),q=null!=(e=c.repeat.key)?e:this.hash(p);if(d)h=await this.scripts.addRepeatableJob(q,k,{name:a,endDate:i?new Date(i).getTime():void 0,tz:f.tz,pattern:m,every:l},p);else{let a=await this.client;h=await this.scripts.updateRepeatableJobMillis(a,q,k,p)}let{immediately:r}=f,s=(0,mG.__rest)(f,["immediately"]);return this.createNextJob(a,k,h,Object.assign(Object.assign({},c),{repeat:Object.assign({offset:o},s)}),b,g,n)}}async createNextJob(a,b,c,d,e,f,g){let h=this.getRepeatJobKey(a,b,c,e),i=Date.now(),j=b+(d.repeat.offset?d.repeat.offset:0)-i,k=Object.assign(Object.assign({},d),{jobId:h,delay:j<0||g?0:j,timestamp:i,prevMillis:b,repeatJobKey:c});return k.repeat=Object.assign(Object.assign({},d.repeat),{count:f}),this.Job.create(this,a,e,k)}getRepeatJobKey(a,b,c,d){return c.split(":").length>2?this.getRepeatJobId({name:a,nextMillis:b,namespace:this.hash(c),jobId:null==d?void 0:d.id}):this.getRepeatDelayedJobId({customKey:c,nextMillis:b})}async removeRepeatable(a,b,c){var d;let e=o$(a,Object.assign(Object.assign({},b),{jobId:c})),f=null!=(d=b.key)?d:this.hash(e),g=this.getRepeatJobId({name:a,nextMillis:"",namespace:this.hash(e),jobId:null!=c?c:b.jobId,key:b.key});return this.scripts.removeRepeatable(g,e,f)}async removeRepeatableByKey(a){let b=this.keyToData(a),c=this.getRepeatJobId({name:b.name,nextMillis:"",namespace:this.hash(a),jobId:b.id});return this.scripts.removeRepeatable(c,"",a)}async getRepeatableData(a,b,c){let d=await a.hgetall(this.toKey("repeat:"+b));return d?{key:b,name:d.name,endDate:parseInt(d.endDate)||null,tz:d.tz||null,pattern:d.pattern||null,every:d.every||null,next:c}:this.keyToData(b,c)}keyToData(a,b){let c=a.split(":"),d=c.slice(4).join(":")||null;return{key:a,name:c[0],id:c[1]||null,endDate:parseInt(c[2])||null,tz:c[3]||null,pattern:d,next:b}}async getRepeatableJobs(a=0,b=-1,c=!1){let d=await this.client,e=this.keys.repeat,f=c?await d.zrange(e,a,b,"WITHSCORES"):await d.zrevrange(e,a,b,"WITHSCORES"),g=[];for(let a=0;a<f.length;a+=2)g.push(this.getRepeatableData(d,f[a],parseInt(f[a+1])));return Promise.all(g)}async getRepeatableCount(){return(await this.client).zcard(this.toKey("repeat"))}hash(a){return(0,mA.createHash)(this.repeatKeyHashAlgorithm).update(a).digest("hex")}getRepeatDelayedJobId({nextMillis:a,customKey:b}){return`repeat:${b}:${a}`}getRepeatJobId({name:a,nextMillis:b,namespace:c,jobId:d,key:e}){let f=null!=e?e:this.hash(`${a}${d||""}${c}`);return`repeat:${f}:${b}`}}function o$(a,b){let c=b.endDate?new Date(b.endDate).getTime():"",d=b.tz||"",e=b.pattern||String(b.every)||"",f=b.jobId?b.jobId:"";return`${a}:${f}:${c}:${d}:${e}`}let o_=(a,b)=>{let c=b.pattern;if(c&&b.every)throw Error("Both .pattern and .every options are defined for this repeatable job");if(b.every)return Math.floor(a/b.every)*b.every+(b.immediately?0:b.every);let d=new Date(b.startDate&&new Date(b.startDate)>new Date(a)?b.startDate:a),e=(0,oT.parseExpression)(c,Object.assign(Object.assign({},b),{currentDate:d}));try{if(b.immediately)return new Date().getTime();return e.next().getTime()}catch(a){}};var o0=a.i(522734);a.i(792509),(D=ab||(ab={})).blocking="blocking",D.normal="normal";let o1=process.env.REDIS_URL;o1||console.warn("REDIS_URL is not defined in environment variables");let o2=new URL(o1||"redis://localhost:6379"),o3={host:o2.hostname,port:Number(o2.port||6379),username:o2.username,password:o2.password,tls:"rediss:"===o2.protocol?{rejectUnauthorized:!1}:void 0,maxRetriesPerRequest:null,enableReadyCheck:!0,enableOfflineQueue:!0,connectTimeout:1e4,retryStrategy:a=>a>3?null:Math.min(200*a,2e3),reconnectOnError:a=>!!a.message.includes("READONLY")},o4=new mi.Redis(o3),o5=new class extends oY{constructor(a,b,c){var d;super(a,Object.assign({},b),c),this.token=mF(),this.libName="bullmq",this.jobsOpts=null!=(d=null==b?void 0:b.defaultJobOptions)?d:{},this.waitUntilReady().then(a=>{if(!this.closing&&!(null==b?void 0:b.skipMetasUpdate))return a.hmset(this.keys.meta,this.metaValues)}).catch(a=>{})}emit(a,...b){return super.emit(a,...b)}off(a,b){return super.off(a,b),this}on(a,b){return super.on(a,b),this}once(a,b){return super.once(a,b),this}get defaultJobOptions(){return Object.assign({},this.jobsOpts)}get metaValues(){var a,b,c,d;return{"opts.maxLenEvents":null!=(d=null==(c=null==(b=null==(a=this.opts)?void 0:a.streams)?void 0:b.events)?void 0:c.maxLen)?d:1e4,version:`${this.libName}:${nV}`}}async getVersion(){let a=await this.client;return await a.hget(this.keys.meta,"version")}get repeat(){return new Promise(async a=>{this._repeat||(this._repeat=new oZ(this.name,Object.assign(Object.assign({},this.opts),{connection:await this.client})),this._repeat.on("error",a=>this.emit.bind(this,a))),a(this._repeat)})}get jobScheduler(){return new Promise(async a=>{this._jobScheduler||(this._jobScheduler=new oW(this.name,Object.assign(Object.assign({},this.opts),{connection:await this.client})),this._jobScheduler.on("error",a=>this.emit.bind(this,a))),a(this._jobScheduler)})}async setGlobalConcurrency(a){return(await this.client).hset(this.keys.meta,"concurrency",a)}async setGlobalRateLimit(a,b){return(await this.client).hset(this.keys.meta,"max",a,"duration",b)}async removeGlobalConcurrency(){return(await this.client).hdel(this.keys.meta,"concurrency")}async removeGlobalRateLimit(){return(await this.client).hdel(this.keys.meta,"max","duration")}async add(a,b,c){return this.trace(Q.PRODUCER,"add",`${this.name}.${a}`,async(d,e)=>{var f;!e||(null==(f=null==c?void 0:c.telemetry)?void 0:f.omitContext)||(c=Object.assign(Object.assign({},c),{telemetry:{metadata:e}}));let g=await this.addJob(a,b,c);return null==d||d.setAttributes({[P.JobName]:a,[P.JobId]:g.id}),g})}async addJob(a,b,c){if(c&&c.repeat){if(c.repeat.endDate&&+new Date(c.repeat.endDate)<Date.now())throw Error("End date must be greater than current timestamp");return(await this.repeat).updateRepeatableJob(a,b,Object.assign(Object.assign({},this.jobsOpts),c),{override:!0})}{let d=null==c?void 0:c.jobId;if("0"==d||(null==d?void 0:d.startsWith("0:")))throw Error("JobId cannot be '0' or start with 0:");let e=await this.Job.create(this,a,b,Object.assign(Object.assign(Object.assign({},this.jobsOpts),c),{jobId:d}));return this.emit("waiting",e),e}}async addBulk(a){return this.trace(Q.PRODUCER,"addBulk",this.name,async(b,c)=>(b&&b.setAttributes({[P.BulkNames]:a.map(a=>a.name),[P.BulkCount]:a.length}),await this.Job.createBulk(this,a.map(a=>{var b,d,e,f,g,h;let i=null==(b=a.opts)?void 0:b.telemetry;if(c){let b=null==(e=null==(d=a.opts)?void 0:d.telemetry)?void 0:e.omitContext,h=(null==(g=null==(f=a.opts)?void 0:f.telemetry)?void 0:g.metadata)||!b&&c;(h||b)&&(i={metadata:h,omitContext:b})}return{name:a.name,data:a.data,opts:Object.assign(Object.assign(Object.assign({},this.jobsOpts),a.opts),{jobId:null==(h=a.opts)?void 0:h.jobId,telemetry:i})}}))))}async upsertJobScheduler(a,b,c){var d,e;if(b.endDate&&+new Date(b.endDate)<Date.now())throw Error("End date must be greater than current timestamp");return(await this.jobScheduler).upsertJobScheduler(a,b,null!=(d=null==c?void 0:c.name)?d:a,null!=(e=null==c?void 0:c.data)?e:{},Object.assign(Object.assign({},this.jobsOpts),null==c?void 0:c.opts),{override:!0})}async pause(){await this.trace(Q.INTERNAL,"pause",this.name,async()=>{await this.scripts.pause(!0),this.emit("paused")})}async close(){await this.trace(Q.INTERNAL,"close",this.name,async()=>{!this.closing&&this._repeat&&await this._repeat.close(),await super.close()})}async rateLimit(a){await this.trace(Q.INTERNAL,"rateLimit",this.name,async b=>{null==b||b.setAttributes({[P.QueueRateLimit]:a}),await this.client.then(b=>b.set(this.keys.limiter,Number.MAX_SAFE_INTEGER,"PX",a))})}async resume(){await this.trace(Q.INTERNAL,"resume",this.name,async()=>{await this.scripts.pause(!1),this.emit("resumed")})}async isPaused(){let a=await this.client;return 1===await a.hexists(this.keys.meta,"paused")}isMaxed(){return this.scripts.isMaxed()}async getRepeatableJobs(a,b,c){return(await this.repeat).getRepeatableJobs(a,b,c)}async getJobScheduler(a){return(await this.jobScheduler).getScheduler(a)}async getJobSchedulers(a,b,c){return(await this.jobScheduler).getJobSchedulers(a,b,c)}async getJobSchedulersCount(){return(await this.jobScheduler).getSchedulersCount()}async removeRepeatable(a,b,c){return this.trace(Q.INTERNAL,"removeRepeatable",`${this.name}.${a}`,async d=>{null==d||d.setAttributes({[P.JobName]:a,[P.JobId]:c});let e=await this.repeat;return!await e.removeRepeatable(a,b,c)})}async removeJobScheduler(a){let b=await this.jobScheduler;return!await b.removeJobScheduler(a)}async removeDebounceKey(a){return this.trace(Q.INTERNAL,"removeDebounceKey",`${this.name}`,async b=>{null==b||b.setAttributes({[P.JobKey]:a});let c=await this.client;return await c.del(`${this.keys.de}:${a}`)})}async removeDeduplicationKey(a){return this.trace(Q.INTERNAL,"removeDeduplicationKey",`${this.name}`,async b=>(null==b||b.setAttributes({[P.DeduplicationKey]:a}),(await this.client).del(`${this.keys.de}:${a}`)))}async removeRateLimitKey(){return(await this.client).del(this.keys.limiter)}async removeRepeatableByKey(a){return this.trace(Q.INTERNAL,"removeRepeatableByKey",`${this.name}`,async b=>{null==b||b.setAttributes({[P.JobKey]:a});let c=await this.repeat;return!await c.removeRepeatableByKey(a)})}async remove(a,{removeChildren:b=!0}={}){return this.trace(Q.INTERNAL,"remove",this.name,async c=>{null==c||c.setAttributes({[P.JobId]:a,[P.JobOptions]:JSON.stringify({removeChildren:b})});let d=await this.scripts.remove(a,b);return 1===d&&this.emit("removed",a),d})}async updateJobProgress(a,b){await this.trace(Q.INTERNAL,"updateJobProgress",this.name,async c=>{null==c||c.setAttributes({[P.JobId]:a,[P.JobProgress]:JSON.stringify(b)}),await this.scripts.updateProgress(a,b),this.emit("progress",a,b)})}async addJobLog(a,b,c){return n_.addJobLog(this,a,b,c)}async drain(a=!1){await this.trace(Q.INTERNAL,"drain",this.name,async b=>{null==b||b.setAttributes({[P.QueueDrainDelay]:a}),await this.scripts.drain(a)})}async clean(a,b,c="completed"){return this.trace(Q.INTERNAL,"clean",this.name,async d=>{let e=b||1/0,f=Math.min(1e4,e),g=Date.now()-a,h=0,i=[],j="waiting"===c?"wait":c;for(;h<e;){let a=await this.scripts.cleanJobsInSet(j,g,f);if(this.emit("cleaned",a,j),h+=a.length,i.push(...a),a.length<f)break}return null==d||d.setAttributes({[P.QueueGrace]:a,[P.JobType]:c,[P.QueueCleanLimit]:e,[P.JobIds]:i}),i})}async obliterate(a){await this.trace(Q.INTERNAL,"obliterate",this.name,async()=>{await this.pause();let b=0;do b=await this.scripts.obliterate(Object.assign({force:!1,count:1e3},a));while(b)})}async retryJobs(a={}){await this.trace(Q.PRODUCER,"retryJobs",this.name,async b=>{null==b||b.setAttributes({[P.QueueOptions]:JSON.stringify(a)});let c=0;do c=await this.scripts.retryJobs(a.state,a.count,a.timestamp);while(c)})}async promoteJobs(a={}){await this.trace(Q.INTERNAL,"promoteJobs",this.name,async b=>{null==b||b.setAttributes({[P.QueueOptions]:JSON.stringify(a)});let c=0;do c=await this.scripts.promoteJobs(a.count);while(c)})}async trimEvents(a){return this.trace(Q.INTERNAL,"trimEvents",this.name,async b=>{null==b||b.setAttributes({[P.QueueEventMaxLength]:a});let c=await this.client;return await c.xtrim(this.keys.events,"MAXLEN","~",a)})}async removeDeprecatedPriorityKey(){return(await this.client).del(this.toKey("priority"))}}("job-queue",{connection:o4,defaultJobOptions:{attempts:1,backoff:{type:"exponential",delay:1e3},removeOnComplete:!0}});var o6=a.i(82664);a.i(188646);var o7=a.i(106651);class o8{onabort=null;_aborted=!1;constructor(){Object.defineProperty(this,"_aborted",{value:!1,writable:!0})}get aborted(){return this._aborted}abort(){this._aborted=!0,this.onabort&&(this.onabort(this),this.onabort=null)}}class o9{signal=new o8;abort(){this.signal.abort()}}let pa=async a=>{let b=a?.Bucket||"";if("string"==typeof a.Bucket&&(a.Bucket=b.replace(/#/g,encodeURIComponent("#")).replace(/\?/g,encodeURIComponent("?"))),pf(b)){if(!0===a.ForcePathStyle)throw Error("Path-style addressing cannot be used with ARN buckets")}else pe(b)&&(-1===b.indexOf(".")||String(a.Endpoint).startsWith("http:"))&&b.toLowerCase()===b&&!(b.length<3)||(a.ForcePathStyle=!0);return a.DisableMultiRegionAccessPoints&&(a.disableMultiRegionAccessPoints=!0,a.DisableMRAP=!0),a},pb=/^[a-z0-9][a-z0-9\.\-]{1,61}[a-z0-9]$/,pc=/(\d+\.){3}\d+/,pd=/\.\./,pe=a=>pb.test(a)&&!pc.test(a)&&!pd.test(a),pf=a=>{let[b,c,d,,,e]=a.split(":"),f="arn"===b&&a.split(":").length>=6,g=!!(f&&c&&d&&e);if(f&&!g)throw Error(`Invalid ARN: ${a} was an invalid ARN.`);return g},pg=(a,b,c,d=!1)=>{let e=async()=>{let e;if(d){let d=c.clientContextParams;e=d?.[a]??c[a]??c[b]}else e=c[a]??c[b];return"function"==typeof e?e():e};return"credentialScope"===a||"CredentialScope"===b?async()=>{let a="function"==typeof c.credentials?await c.credentials():c.credentials;return a?.credentialScope??a?.CredentialScope}:"accountId"===a||"AccountId"===b?async()=>{let a="function"==typeof c.credentials?await c.credentials():c.credentials;return a?.accountId??a?.AccountId}:"endpoint"===a||"endpoint"===b?async()=>{if(!1===c.isCustomEndpoint)return;let a=await e();if(a&&"object"==typeof a){if("url"in a)return a.url.href;if("hostname"in a){let{protocol:b,hostname:c,port:d,path:e}=a;return`${b}//${c}${d?":"+d:""}${e}`}}return a}:e};class ph extends Error{name="ProviderError";tryNextLink;constructor(a,b=!0){let c,d=!0;"boolean"==typeof b?(c=void 0,d=b):null!=b&&"object"==typeof b&&(c=b.logger,d=b.tryNextLink??!0),super(a),this.tryNextLink=d,Object.setPrototypeOf(this,ph.prototype),c?.debug?.(`@smithy/property-provider ${d?"->":"(!)"} ${a}`)}static from(a,b=!0){return Object.assign(new this(a.message,b),a)}}class pi extends ph{name="CredentialsProviderError";constructor(a,b=!0){super(a,b),Object.setPrototypeOf(this,pi.prototype)}}function pj(a){try{let b=new Set(Array.from(a.match(/([A-Z_]){3,}/g)??[]));return b.delete("CONFIG"),b.delete("CONFIG_PREFIX_SEPARATOR"),b.delete("ENV"),[...b].join(", ")}catch(b){return a}}(E=ac||(ac={})).PROFILE="profile",E.SSO_SESSION="sso-session",E.SERVICES="services";let pk=a=>Object.entries(a).filter(([a])=>{let b=a.indexOf(".");return -1!==b&&Object.values(ac).includes(a.substring(0,b))}).reduce((a,[b,c])=>{let d=b.indexOf(".");return a[b.substring(0,d)===ac.PROFILE?b.substring(d+1):b]=c,a},{...a.default&&{default:a.default}});var pl=a.i(446786);let pm={},pn=()=>{let{HOME:a,USERPROFILE:b,HOMEPATH:c,HOMEDRIVE:d=`C:${mh.sep}`}=process.env;if(a)return a;if(b)return b;if(c)return`${d}${c}`;let e=process&&process.geteuid?`${process.geteuid()}`:"DEFAULT";return pm[e]||(pm[e]=(0,pl.homedir)()),pm[e]},po=/^([\w-]+)\s(["'])?([\w-@\+\.%:/]+)\2$/,pp=["__proto__","profile __proto__"],pq=a=>{let b,c,d={};for(let e of a.split(/\r?\n/)){let a=e.split(/(^|\s)[;#]/)[0].trim();if("["===a[0]&&"]"===a[a.length-1]){b=void 0,c=void 0;let d=a.substring(1,a.length-1),e=po.exec(d);if(e){let[,a,,c]=e;Object.values(ac).includes(a)&&(b=[a,c].join("."))}else b=d;if(pp.includes(d))throw Error(`Found invalid profile name "${d}"`)}else if(b){let f=a.indexOf("=");if(![0,-1].includes(f)){let[g,h]=[a.substring(0,f).trim(),a.substring(f+1).trim()];if(""===h)c=g;else{c&&e.trimStart()===e&&(c=void 0),d[b]=d[b]||{};let a=c?[c,g].join("."):g;d[b][a]=h}}}}return d};var pr=a.i(912714);let ps={},pt={},pu=(a,b)=>void 0!==pt[a]?pt[a]:((!ps[a]||b?.ignoreCache)&&(ps[a]=(0,pr.readFile)(a,"utf8")),ps[a]),pv=()=>({}),pw=async(a={})=>{let{filepath:b=process.env.AWS_SHARED_CREDENTIALS_FILE||(0,mh.join)(pn(),".aws","credentials"),configFilepath:c=process.env.AWS_CONFIG_FILE||(0,mh.join)(pn(),".aws","config")}=a,d=pn(),e=b;b.startsWith("~/")&&(e=(0,mh.join)(d,b.slice(2)));let f=c;c.startsWith("~/")&&(f=(0,mh.join)(d,c.slice(2)));let g=await Promise.all([pu(f,{ignoreCache:a.ignoreCache}).then(pq).then(pk).catch(pv),pu(e,{ignoreCache:a.ignoreCache}).then(pq).catch(pv)]);return{configFile:g[0],credentialsFile:g[1]}},px="AWS_ENDPOINT_URL",py="endpoint_url",pz=async a=>{let b;return(({environmentVariableSelector:a,configFileSelector:b,default:c},d={})=>{var e,f,g;let h,i,j,k,l,m,{signingName:n,logger:o}=d;return e=((...a)=>async()=>{let b;if(0===a.length)throw new ph("No providers in chain");for(let c of a)try{return await c()}catch(a){if(b=a,a?.tryNextLink)continue;throw a}throw b})((h={signingName:n,logger:o},async()=>{try{let b=a(process.env,h);if(void 0===b)throw Error();return b}catch(b){throw new pi(b.message||`Not found in ENV: ${pj(a.toString())}`,{logger:h?.logger})}}),((a,{preferredFile:b="config",...c}={})=>async()=>{let d=c.profile||process.env.AWS_PROFILE||"default",{configFile:e,credentialsFile:f}=await pw(c),g=f[d]||{},h=e[d]||{},i="config"===b?{...g,...h}:{...h,...g};try{let c="config"===b?e:f,d=a(i,c);if(void 0===d)throw Error();return d}catch(b){throw new pi(b.message||`Not found in config files w/ profile [${d}]: ${pj(a.toString())}`,{logger:c.logger})}})(b,d),(a=>"function"==typeof a?async()=>await a():()=>Promise.resolve(a))(c)),l=!1,m=async()=>{j||(j=e());try{i=await j,k=!0,l=!1}finally{j=void 0}return i},void 0===f?async a=>((!k||a?.forceRefresh)&&(i=await m()),i):async a=>((!k||a?.forceRefresh)&&(i=await m()),l||(g&&!g(i)?l=!0:f(i)&&await m()),i)})((b=a??"",{environmentVariableSelector:a=>{let c=a[[px,...b.split(" ").map(a=>a.toUpperCase())].join("_")];if(c)return c;let d=a[px];if(d)return d},configFileSelector:(a,c)=>{if(c&&a.services){let d=c[["services",a.services].join(".")];if(d){let a=d[[b.split(" ").map(a=>a.toLowerCase()).join("_"),py].join(".")];if(a)return a}}let d=a[py];if(d)return d},default:void 0}))()},pA=a=>{let b;if("string"==typeof a)return pA(new URL(a));let{hostname:c,pathname:d,port:e,protocol:f,search:g}=a;return g&&(b=function(a){let b={};if(a=a.replace(/^\?/,""))for(let c of a.split("&")){let[a,d=null]=c.split("=");a=decodeURIComponent(a),d&&(d=decodeURIComponent(d)),a in b?Array.isArray(b[a])?b[a].push(d):b[a]=[b[a],d]:b[a]=d}return b}(g)),{hostname:c,port:e?parseInt(e):void 0,protocol:f,path:d,query:b}},pB=a=>"object"==typeof a?"url"in a?pA(a.url):a:pA(a),pC=async(a,b,c,d)=>{if(!c.isCustomEndpoint){let a;(a=c.serviceConfiguredEndpoint?await c.serviceConfiguredEndpoint():await pz(c.serviceId))&&(c.endpoint=()=>Promise.resolve(pB(a)),c.isCustomEndpoint=!0)}let e=await pD(a,b,c);if("function"!=typeof c.endpointProvider)throw Error("config.endpointProvider is not set.");return c.endpointProvider(e,d)},pD=async(a,b,c)=>{let d={},e=b?.getEndpointParameterInstructions?.()||{};for(let[b,f]of Object.entries(e))switch(f.type){case"staticContextParams":d[b]=f.value;break;case"contextParams":d[b]=a[f.name];break;case"clientContextParams":case"builtInParams":d[b]=await pg(f.name,b,c,"builtInParams"!==f.type)();break;case"operationContextParams":d[b]=f.get(a);break;default:throw Error("Unrecognized endpoint parameter instruction: "+JSON.stringify(f))}return 0===Object.keys(e).length&&Object.assign(d,c),"s3"===String(c.serviceId).toLowerCase()&&await pa(d),d};function pE(a){return encodeURIComponent(a).replace(/[!'()*]/g,function(a){return"%"+a.charCodeAt(0).toString(16).toUpperCase()})}var pF=mg,pG=a.i(500874);let pH={...{lstatSync:()=>{},isFileReadStream:a=>!1},runtime:"node",lstatSync:o0.lstatSync,isFileReadStream:a=>a instanceof o0.ReadStream},pI=a=>{if(null==a)return 0;if("string"==typeof a)return pG.Buffer.byteLength(a);if("number"==typeof a.byteLength)return a.byteLength;if("number"==typeof a.length)return a.length;if("number"==typeof a.size)return a.size;if("number"==typeof a.start&&"number"==typeof a.end)return a.end+1-a.start;if(pH.isFileReadStream(a))try{return pH.lstatSync(a.path).size}catch(a){}};async function*pJ(a,b,c){let d=1,e={chunks:[],length:0};for await(let f of c(a))for(e.chunks.push(f),e.length+=f.byteLength;e.length>b;){let a=e.chunks.length>1?pG.Buffer.concat(e.chunks):e.chunks[0];yield{partNumber:d,data:a.subarray(0,b)},e.chunks=[a.subarray(b)],e.length=e.chunks[0].byteLength,d+=1}yield{partNumber:d,data:1!==e.chunks.length?pG.Buffer.concat(e.chunks):e.chunks[0],lastPart:!0}}async function*pK(a,b){let c=1,d=0,e=b;for(;e<a.byteLength;)yield{partNumber:c,data:a.subarray(d,e)},c+=1,e=(d=e)+b;yield{partNumber:c,data:a.subarray(d),lastPart:!0}}async function*pL(a){for await(let b of a)pG.Buffer.isBuffer(b)||b instanceof Uint8Array?yield b:yield pG.Buffer.from(b)}async function*pM(a){let b=a.getReader();try{for(;;){let{done:a,value:c}=await b.read();if(a)return;pG.Buffer.isBuffer(c)||c instanceof Uint8Array?yield c:yield pG.Buffer.from(c)}}catch(a){throw a}finally{b.releaseLock()}}(F=ad||(ad={})).EMPTY_INPUT="a null or undefined Body",F.CONTENT_LENGTH="the ContentLength property of the params set by the caller",F.STRING_LENGTH="the encoded byte length of the Body string",F.TYPED_ARRAY="the byteLength of a typed byte array such as Uint8Array",F.LENGTH="the value of Body.length",F.SIZE="the value of Body.size",F.START_END_DIFF="the numeric difference between Body.start and Body.end",F.LSTAT="the size of the file given by Body.path on disk as reported by lstatSync";class pN extends pF.EventEmitter{static MIN_PART_SIZE=5242880;MAX_PARTS=1e4;queueSize=4;partSize;leavePartsOnError=!1;tags=[];client;params;totalBytes;totalBytesSource;bytesUploadedSoFar;abortController;concurrentUploaders=[];createMultiPartPromise;abortMultipartUploadCommand=null;uploadedParts=[];uploadEnqueuedPartsCount=0;expectedPartsCount;uploadId;uploadEvent;isMultiPart=!0;singleUploadResult;sent=!1;constructor(a){if(super(),this.queueSize=a.queueSize||this.queueSize,this.leavePartsOnError=a.leavePartsOnError||this.leavePartsOnError,this.tags=a.tags||this.tags,this.client=a.client,this.params=a.params,!this.params)throw Error("InputError: Upload requires params to be passed to upload.");this.totalBytes=this.params.ContentLength??pI(this.params.Body),this.totalBytesSource=((a,b)=>{if(null!=b)return ad.CONTENT_LENGTH;if(null==a)return ad.EMPTY_INPUT;if("string"==typeof a)return ad.STRING_LENGTH;if("number"==typeof a.byteLength)return ad.TYPED_ARRAY;if("number"==typeof a.length)return ad.LENGTH;if("number"==typeof a.size)return ad.SIZE;if("number"==typeof a.start&&"number"==typeof a.end)return ad.START_END_DIFF;if(pH.isFileReadStream(a))try{return pH.lstatSync(a.path).size,ad.LSTAT}catch(a){}})(this.params.Body,this.params.ContentLength),this.bytesUploadedSoFar=0,this.abortController=a.abortController??new o9,this.partSize=a.partSize||Math.max(pN.MIN_PART_SIZE,Math.floor((this.totalBytes||0)/this.MAX_PARTS)),void 0!==this.totalBytes&&(this.expectedPartsCount=Math.ceil(this.totalBytes/this.partSize)),this.__validateInput()}async abort(){this.abortController.abort()}async done(){if(this.sent)throw Error("@aws-sdk/lib-storage: this instance of Upload has already executed .done(). Create a new instance.");return this.sent=!0,await Promise.race([this.__doMultipartUpload(),this.__abortTimeout(this.abortController.signal)])}on(a,b){return this.uploadEvent=a,super.on(a,b)}async __uploadUsingPut(a){let b,c,d;this.isMultiPart=!1;let e={...this.params,Body:a.data},f=this.client.config,g=f.requestHandler,h=g instanceof pF.EventEmitter?g:null,i=b=>{this.bytesUploadedSoFar=b.loaded,this.totalBytes=b.total,this.__notifyProgress({loaded:this.bytesUploadedSoFar,total:this.totalBytes,part:a.partNumber,Key:this.params.Key,Bucket:this.params.Bucket})};null!==h&&h.on("xhr.upload.progress",i);let j=await Promise.all([this.client.send(new o7.PutObjectCommand(e)),f?.endpoint?.()]),k=j[0],l=j[1];if(l||(l=pB(await pC(e,o7.PutObjectCommand,{...f}))),!l)throw Error('Could not resolve endpoint from S3 "client.config.endpoint()" nor EndpointsV2.');null!==h&&h.off("xhr.upload.progress",i);let m=this.params.Key.split("/").map(a=>pE(a)).join("/"),n=pE(this.params.Bucket),o=(b=l.hostname.startsWith(`${n}.`),c=this.client.config.forcePathStyle,d=l.port?`:${l.port}`:"",c?`${l.protocol}//${l.hostname}${d}/${n}/${m}`:b?`${l.protocol}//${l.hostname}${d}/${m}`:`${l.protocol}//${n}.${l.hostname}${d}/${m}`);this.singleUploadResult={...k,Bucket:this.params.Bucket,Key:this.params.Key,Location:o};let p=pI(a.data);this.__notifyProgress({loaded:p,total:p,part:1,Key:this.params.Key,Bucket:this.params.Bucket})}async __createMultipartUpload(){let a=await this.client.config.requestChecksumCalculation();if(!this.createMultiPartPromise){let b={...this.params,Body:void 0};"WHEN_SUPPORTED"===a&&(b.ChecksumAlgorithm=this.params.ChecksumAlgorithm||o7.ChecksumAlgorithm.CRC32),this.createMultiPartPromise=this.client.send(new o7.CreateMultipartUploadCommand(b)).then(a=>(this.abortMultipartUploadCommand=new o7.AbortMultipartUploadCommand({Bucket:this.params.Bucket,Key:this.params.Key,UploadId:a.UploadId}),a))}return this.createMultiPartPromise}async __doConcurrentUpload(a){for await(let b of a){if(this.uploadEnqueuedPartsCount>this.MAX_PARTS)throw Error(`Exceeded ${this.MAX_PARTS} parts in multipart upload to Bucket: ${this.params.Bucket} Key: ${this.params.Key}.`);if(this.abortController.signal.aborted)return;if(1===b.partNumber&&b.lastPart)return await this.__uploadUsingPut(b);if(!this.uploadId){let{UploadId:a}=await this.__createMultipartUpload();if(this.uploadId=a,this.abortController.signal.aborted)return}let a=pI(b.data)||0,c=this.client.config.requestHandler,d=c instanceof pF.EventEmitter?c:null,e=0,f=(c,d)=>{(Number(d.query.partNumber)||-1)===b.partNumber&&(c.total&&a&&(this.bytesUploadedSoFar+=c.loaded-e,e=c.loaded),this.__notifyProgress({loaded:this.bytesUploadedSoFar,total:this.totalBytes,part:b.partNumber,Key:this.params.Key,Bucket:this.params.Bucket}))};null!==d&&d.on("xhr.upload.progress",f),this.uploadEnqueuedPartsCount+=1,this.__validateUploadPart(b);let g=await this.client.send(new o7.UploadPartCommand({...this.params,ContentLength:void 0,UploadId:this.uploadId,Body:b.data,PartNumber:b.partNumber}));if(null!==d&&d.off("xhr.upload.progress",f),this.abortController.signal.aborted)return;if(!g.ETag)throw Error(`Part ${b.partNumber} is missing ETag in UploadPart response. Missing Bucket CORS configuration for ETag header?`);this.uploadedParts.push({PartNumber:b.partNumber,ETag:g.ETag,...g.ChecksumCRC32&&{ChecksumCRC32:g.ChecksumCRC32},...g.ChecksumCRC32C&&{ChecksumCRC32C:g.ChecksumCRC32C},...g.ChecksumSHA1&&{ChecksumSHA1:g.ChecksumSHA1},...g.ChecksumSHA256&&{ChecksumSHA256:g.ChecksumSHA256}}),null===d&&(this.bytesUploadedSoFar+=a),this.__notifyProgress({loaded:this.bytesUploadedSoFar,total:this.totalBytes,part:b.partNumber,Key:this.params.Key,Bucket:this.params.Bucket})}}async __doMultipartUpload(){let a,b=((a,b)=>{if(a instanceof Uint8Array)return pK(a,b);if(a instanceof nU.Readable)return pJ(a,b,pL);if(a instanceof String||"string"==typeof a)return pK(pG.Buffer.from(a),b);if("function"==typeof a.stream)return pJ(a.stream(),b,pM);if(a instanceof ReadableStream)return pJ(a,b,pM);throw Error("Body Data is unsupported format, expected data to be one of: string | Uint8Array | Buffer | Readable | ReadableStream | Blob;.")})(this.params.Body,this.partSize),c=[];for(let a=0;a<this.queueSize;a++){let a=this.__doConcurrentUpload(b).catch(a=>{c.push(a)});this.concurrentUploaders.push(a)}if(await Promise.all(this.concurrentUploaders),c.length>=1)throw await this.markUploadAsAborted(),c[0];if(this.abortController.signal.aborted)throw await this.markUploadAsAborted(),Object.assign(Error("Upload aborted."),{name:"AbortError"});if(this.isMultiPart){let{expectedPartsCount:b,uploadedParts:c,totalBytes:d,totalBytesSource:e}=this;if(void 0!==d&&void 0!==b&&c.length!==b)throw Error(`Expected ${b} part(s) but uploaded ${c.length} part(s).
The expected part count is based on the byte-count of the input.params.Body,
which was read from ${e} and is ${d}.
If this is not correct, provide an override value by setting a number
to input.params.ContentLength in bytes.
`);this.uploadedParts.sort((a,b)=>a.PartNumber-b.PartNumber);let f={...this.params,Body:void 0,UploadId:this.uploadId,MultipartUpload:{Parts:this.uploadedParts}};a=await this.client.send(new o7.CompleteMultipartUploadCommand(f)),"string"==typeof a?.Location&&a.Location.includes("%2F")&&(a.Location=a.Location.replace(/%2F/g,"/"))}else a=this.singleUploadResult;return this.abortMultipartUploadCommand=null,this.tags.length&&await this.client.send(new o7.PutObjectTaggingCommand({...this.params,Tagging:{TagSet:this.tags}})),a}async markUploadAsAborted(){this.uploadId&&!this.leavePartsOnError&&null!==this.abortMultipartUploadCommand&&(await this.client.send(this.abortMultipartUploadCommand),this.abortMultipartUploadCommand=null)}__notifyProgress(a){this.uploadEvent&&this.emit(this.uploadEvent,a)}async __abortTimeout(a){return new Promise((b,c)=>{a.onabort=()=>{let a=Error("Upload aborted.");a.name="AbortError",c(a)}})}__validateUploadPart(a){let b=pI(a.data);if(void 0===b)throw Error(`A dataPart was generated without a measurable data chunk size for part number ${a.partNumber}`);if((1!==a.partNumber||!a.lastPart)&&!a.lastPart&&b!==this.partSize)throw Error(`The byte size for part number ${a.partNumber}, size ${b} does not match expected size ${this.partSize}`)}__validateInput(){if(!this.client)throw Error("InputError: Upload requires a AWS client to do uploads with.");if(this.partSize<pN.MIN_PART_SIZE)throw Error(`EntityTooSmall: Your proposed upload part size [${this.partSize}] is smaller than the minimum allowed size [${pN.MIN_PART_SIZE}] (5MB)`);if(this.queueSize<1)throw Error("Queue size: Must have at least one uploading queue.")}}a.i(902157);let pO=a=>encodeURIComponent(a).replace(/[!'()*]/g,pP),pP=a=>`%${a.charCodeAt(0).toString(16).toUpperCase()}`;class pQ{method;protocol;hostname;port;path;query;headers;username;password;fragment;body;constructor(a){this.method=a.method||"GET",this.hostname=a.hostname||"localhost",this.port=a.port,this.query=a.query||{},this.headers=a.headers||{},this.body=a.body,this.protocol=a.protocol?":"!==a.protocol.slice(-1)?`${a.protocol}:`:a.protocol:"https:",this.path=a.path?"/"!==a.path.charAt(0)?`/${a.path}`:a.path:"/",this.username=a.username,this.password=a.password,this.fragment=a.fragment}static clone(a){var b;let c=new pQ({...a,headers:{...a.headers}});return c.query&&(c.query=Object.keys(b=c.query).reduce((a,c)=>{let d=b[c];return{...a,[c]:Array.isArray(d)?[...d]:d}},{})),c}static isInstance(a){return!!a&&"method"in a&&"protocol"in a&&"hostname"in a&&"path"in a&&"object"==typeof a.query&&"object"==typeof a.headers}clone(){return pQ.clone(this)}}let pR={},pS={};for(let a=0;a<256;a++){let b=a.toString(16).toLowerCase();1===b.length&&(b=`0${b}`),pR[a]=b,pS[b]=a}function pT(a){let b="";for(let c=0;c<a.byteLength;c++)b+=pR[a[c]];return b}let pU=a=>{let b=((a,b)=>{if("string"!=typeof a)throw TypeError(`The "input" argument must be of type string. Received type ${typeof a} (${a})`);return b?pG.Buffer.from(a,b):pG.Buffer.from(a)})(a,"utf8");return new Uint8Array(b.buffer,b.byteOffset,b.byteLength/Uint8Array.BYTES_PER_ELEMENT)},pV=a=>"string"==typeof a?pU(a):ArrayBuffer.isView(a)?new Uint8Array(a.buffer,a.byteOffset,a.byteLength/Uint8Array.BYTES_PER_ELEMENT):new Uint8Array(a),pW="X-Amz-Date",pX="X-Amz-Signature",pY="X-Amz-Security-Token",pZ="authorization",p$=pW.toLowerCase(),p_=[pZ,p$,"date"],p0=pX.toLowerCase(),p1="x-amz-content-sha256",p2=pY.toLowerCase(),p3={authorization:!0,"cache-control":!0,connection:!0,expect:!0,from:!0,"keep-alive":!0,"max-forwards":!0,pragma:!0,referer:!0,te:!0,trailer:!0,"transfer-encoding":!0,upgrade:!0,"user-agent":!0,"x-amzn-trace-id":!0},p4=/^proxy-/,p5=/^sec-/,p6="AWS4-HMAC-SHA256",p7="aws4_request",p8={},p9=[],qa=(a,b,c)=>`${a}/${b}/${c}/${p7}`,qb=async(a,b,c,d,e)=>{let f=await qc(a,b.secretAccessKey,b.accessKeyId),g=`${c}:${d}:${e}:${pT(f)}:${b.sessionToken}`;if(g in p8)return p8[g];for(p9.push(g);p9.length>50;)delete p8[p9.shift()];let h=`AWS4${b.secretAccessKey}`;for(let b of[c,d,e,p7])h=await qc(a,h,b);return p8[g]=h},qc=(a,b,c)=>{let d=new a(b);return d.update(pV(c)),d.digest()},qd=({headers:a},b,c)=>{let d={};for(let e of Object.keys(a).sort()){if(void 0==a[e])continue;let f=e.toLowerCase();(!(f in p3||b?.has(f)||p4.test(f)||p5.test(f))||c&&(!c||c.has(f)))&&(d[f]=a[e].trim().replace(/\s+/g," "))}return d},qe=async({headers:a,body:b},c)=>{for(let b of Object.keys(a))if(b.toLowerCase()===p1)return a[b];if(void 0==b)return"e3b0c44298fc1c149afbf4c8996fb92427ae41e4649b934ca495991b7852b855";if("string"==typeof b||ArrayBuffer.isView(b)||"function"==typeof ArrayBuffer&&b instanceof ArrayBuffer||"[object ArrayBuffer]"===Object.prototype.toString.call(b)){let a=new c;return a.update(pV(b)),pT(await a.digest())}return"UNSIGNED-PAYLOAD"};class qf{format(a){let b=[];for(let c of Object.keys(a)){let d=pU(c);b.push(Uint8Array.from([d.byteLength]),d,this.formatHeaderValue(a[c]))}let c=new Uint8Array(b.reduce((a,b)=>a+b.byteLength,0)),d=0;for(let a of b)c.set(a,d),d+=a.byteLength;return c}formatHeaderValue(a){switch(a.type){case"boolean":return Uint8Array.from([+!a.value]);case"byte":return Uint8Array.from([2,a.value]);case"short":let b=new DataView(new ArrayBuffer(3));return b.setUint8(0,3),b.setInt16(1,a.value,!1),new Uint8Array(b.buffer);case"integer":let c=new DataView(new ArrayBuffer(5));return c.setUint8(0,4),c.setInt32(1,a.value,!1),new Uint8Array(c.buffer);case"long":let d=new Uint8Array(9);return d[0]=5,d.set(a.value.bytes,1),d;case"binary":let e=new DataView(new ArrayBuffer(3+a.value.byteLength));e.setUint8(0,6),e.setUint16(1,a.value.byteLength,!1);let f=new Uint8Array(e.buffer);return f.set(a.value,3),f;case"string":let g=pU(a.value),h=new DataView(new ArrayBuffer(3+g.byteLength));h.setUint8(0,7),h.setUint16(1,g.byteLength,!1);let i=new Uint8Array(h.buffer);return i.set(g,3),i;case"timestamp":let j=new Uint8Array(9);return j[0]=8,j.set(qh.fromNumber(a.value.valueOf()).bytes,1),j;case"uuid":if(!qg.test(a.value))throw Error(`Invalid UUID received: ${a.value}`);let k=new Uint8Array(17);return k[0]=9,k.set(function(a){if(a.length%2!=0)throw Error("Hex encoded strings must have an even number length");let b=new Uint8Array(a.length/2);for(let c=0;c<a.length;c+=2){let d=a.slice(c,c+2).toLowerCase();if(d in pS)b[c/2]=pS[d];else throw Error(`Cannot decode unrecognized sequence ${d} as hexadecimal`)}return b}(a.value.replace(/\-/g,"")),1),k}}}(G=ae||(ae={}))[G.boolTrue=0]="boolTrue",G[G.boolFalse=1]="boolFalse",G[G.byte=2]="byte",G[G.short=3]="short",G[G.integer=4]="integer",G[G.long=5]="long",G[G.byteArray=6]="byteArray",G[G.string=7]="string",G[G.timestamp=8]="timestamp",G[G.uuid=9]="uuid";let qg=/^[a-f0-9]{8}-[a-f0-9]{4}-[a-f0-9]{4}-[a-f0-9]{4}-[a-f0-9]{12}$/;class qh{bytes;constructor(a){if(this.bytes=a,8!==a.byteLength)throw Error("Int64 buffers must be exactly 8 bytes")}static fromNumber(a){if(a>0x8000000000000000||a<-0x8000000000000000)throw Error(`${a} is too large (or, if negative, too small) to represent as an Int64`);let b=new Uint8Array(8);for(let c=7,d=Math.abs(Math.round(a));c>-1&&d>0;c--,d/=256)b[c]=d;return a<0&&qi(b),new qh(b)}valueOf(){let a=this.bytes.slice(0),b=128&a[0];return b&&qi(a),parseInt(pT(a),16)*(b?-1:1)}toString(){return String(this.valueOf())}}function qi(a){for(let b=0;b<8;b++)a[b]^=255;for(let b=7;b>-1&&(a[b]++,0===a[b]);b--);}let qj=a=>{for(let b of Object.keys((a=pQ.clone(a)).headers))p_.indexOf(b.toLowerCase())>-1&&delete a.headers[b];return a},qk=a=>{if("function"==typeof a)return a;let b=Promise.resolve(a);return()=>b};class ql{service;regionProvider;credentialProvider;sha256;uriEscapePath;applyChecksum;constructor({applyChecksum:a,credentials:b,region:c,service:d,sha256:e,uriEscapePath:f=!0}){this.service=d,this.sha256=e,this.uriEscapePath=f,this.applyChecksum="boolean"!=typeof a||a,this.regionProvider=qk(c),this.credentialProvider=qk(b)}createCanonicalRequest(a,b,c){let d=Object.keys(b).sort();return`${a.method}
${this.getCanonicalPath(a)}
${(({query:a={}})=>{let b=[],c={};for(let d of Object.keys(a)){if(d.toLowerCase()===p0)continue;let e=pO(d);b.push(e);let f=a[d];"string"==typeof f?c[e]=`${e}=${pO(f)}`:Array.isArray(f)&&(c[e]=f.slice(0).reduce((a,b)=>a.concat([`${e}=${pO(b)}`]),[]).sort().join("&"))}return b.sort().map(a=>c[a]).filter(a=>a).join("&")})(a)}
${d.map(a=>`${a}:${b[a]}`).join("\n")}

${d.join(";")}
${c}`}async createStringToSign(a,b,c,d){let e=new this.sha256;e.update(pV(c));let f=await e.digest();return`${d}
${a}
${b}
${pT(f)}`}getCanonicalPath({path:a}){if(this.uriEscapePath){let b=[];for(let c of a.split("/"))c?.length!==0&&"."!==c&&(".."===c?b.pop():b.push(c));return pO(`${a?.startsWith("/")?"/":""}${b.join("/")}${b.length>0&&a?.endsWith("/")?"/":""}`).replace(/%2F/g,"/")}return a}validateResolvedCredentials(a){if("object"!=typeof a||"string"!=typeof a.accessKeyId||"string"!=typeof a.secretAccessKey)throw Error("Resolved credential object is not valid")}formatDate(a){var b;let c=("number"==typeof(b=a)?new Date(1e3*b):"string"==typeof b?new Date(Number(b)?1e3*Number(b):b):b).toISOString().replace(/\.\d{3}Z$/,"Z").replace(/[\-:]/g,"");return{longDate:c,shortDate:c.slice(0,8)}}getCanonicalHeaderList(a){return Object.keys(a).sort().join(";")}}class qm extends ql{headerFormatter=new qf;constructor({applyChecksum:a,credentials:b,region:c,service:d,sha256:e,uriEscapePath:f=!0}){super({applyChecksum:a,credentials:b,region:c,service:d,sha256:e,uriEscapePath:f})}async presign(a,b={}){let{signingDate:c=new Date,expiresIn:d=3600,unsignableHeaders:e,unhoistableHeaders:f,signableHeaders:g,hoistableHeaders:h,signingRegion:i,signingService:j}=b,k=await this.credentialProvider();this.validateResolvedCredentials(k);let l=i??await this.regionProvider(),{longDate:m,shortDate:n}=this.formatDate(c);if(d>604800)return Promise.reject("Signature version 4 presigned URLs must have an expiration date less than one week in the future");let o=qa(n,l,j??this.service),p=((a,b={})=>{let{headers:c,query:d={}}=pQ.clone(a);for(let a of Object.keys(c)){let e=a.toLowerCase();("x-amz-"===e.slice(0,6)&&!b.unhoistableHeaders?.has(e)||b.hoistableHeaders?.has(e))&&(d[a]=c[a],delete c[a])}return{...a,headers:c,query:d}})(qj(a),{unhoistableHeaders:f,hoistableHeaders:h});k.sessionToken&&(p.query[pY]=k.sessionToken),p.query["X-Amz-Algorithm"]=p6,p.query["X-Amz-Credential"]=`${k.accessKeyId}/${o}`,p.query[pW]=m,p.query["X-Amz-Expires"]=d.toString(10);let q=qd(p,e,g);return p.query["X-Amz-SignedHeaders"]=this.getCanonicalHeaderList(q),p.query[pX]=await this.getSignature(m,o,this.getSigningKey(k,l,n,j),this.createCanonicalRequest(p,q,await qe(a,this.sha256))),p}async sign(a,b){return"string"==typeof a?this.signString(a,b):a.headers&&a.payload?this.signEvent(a,b):a.message?this.signMessage(a,b):this.signRequest(a,b)}async signEvent({headers:a,payload:b},{signingDate:c=new Date,priorSignature:d,signingRegion:e,signingService:f}){let g=e??await this.regionProvider(),{shortDate:h,longDate:i}=this.formatDate(c),j=qa(h,g,f??this.service),k=await qe({headers:{},body:b},this.sha256),l=new this.sha256;l.update(a);let m=["AWS4-HMAC-SHA256-PAYLOAD",i,j,d,pT(await l.digest()),k].join("\n");return this.signString(m,{signingDate:c,signingRegion:g,signingService:f})}async signMessage(a,{signingDate:b=new Date,signingRegion:c,signingService:d}){return this.signEvent({headers:this.headerFormatter.format(a.message.headers),payload:a.message.body},{signingDate:b,signingRegion:c,signingService:d,priorSignature:a.priorSignature}).then(b=>({message:a.message,signature:b}))}async signString(a,{signingDate:b=new Date,signingRegion:c,signingService:d}={}){let e=await this.credentialProvider();this.validateResolvedCredentials(e);let f=c??await this.regionProvider(),{shortDate:g}=this.formatDate(b),h=new this.sha256(await this.getSigningKey(e,f,g,d));return h.update(pV(a)),pT(await h.digest())}async signRequest(a,{signingDate:b=new Date,signableHeaders:c,unsignableHeaders:d,signingRegion:e,signingService:f}={}){let g=await this.credentialProvider();this.validateResolvedCredentials(g);let h=e??await this.regionProvider(),i=qj(a),{longDate:j,shortDate:k}=this.formatDate(b),l=qa(k,h,f??this.service);i.headers[p$]=j,g.sessionToken&&(i.headers[p2]=g.sessionToken);let m=await qe(i,this.sha256);!((a,b)=>{for(let c of(a=a.toLowerCase(),Object.keys(b)))if(a===c.toLowerCase())return!0;return!1})(p1,i.headers)&&this.applyChecksum&&(i.headers[p1]=m);let n=qd(i,d,c),o=await this.getSignature(j,l,this.getSigningKey(g,h,k,f),this.createCanonicalRequest(i,n,m));return i.headers[pZ]=`${p6} Credential=${g.accessKeyId}/${l}, SignedHeaders=${this.getCanonicalHeaderList(n)}, Signature=${o}`,i}async getSignature(a,b,c,d){let e=await this.createStringToSign(a,b,d,p6),f=new this.sha256(await c);return f.update(pV(e)),pT(await f.digest())}getSigningKey(a,b,c,d){return qb(this.sha256,a,c,b,d||this.service)}}(H=af||(af={})).ENV="env",H.CONFIG="shared config entry";let qn="X-Amz-S3session-Token",qo=qn.toLowerCase();class qp extends qm{async signWithCredentials(a,b,c){let d=qq(b);return a.headers[qo]=b.sessionToken,qr(this,d),this.signRequest(a,c??{})}async presignWithCredentials(a,b,c){let d=qq(b);return delete a.headers[qo],a.headers[qn]=b.sessionToken,a.query=a.query??{},a.query[qn]=b.sessionToken,qr(this,d),this.presign(a,c)}}function qq(a){return{accessKeyId:a.accessKeyId,secretAccessKey:a.secretAccessKey,expiration:a.expiration}}function qr(a,b){let c=setTimeout(()=>{throw Error("SignatureV4S3Express credential override was created but not called.")},10),d=a.credentialProvider;a.credentialProvider=()=>(clearTimeout(c),a.credentialProvider=d,Promise.resolve(b))}class qs{sigv4aSigner;sigv4Signer;signerOptions;static sigv4aDependency(){return"none"}constructor(a){this.sigv4Signer=new qp(a),this.signerOptions=a}async sign(a,b={}){return"*"===b.signingRegion?this.getSigv4aSigner().sign(a,b):this.sigv4Signer.sign(a,b)}async signWithCredentials(a,b,c={}){if("*"===c.signingRegion){let a=this.getSigv4aSigner();!1;throw Error('signWithCredentials with signingRegion \'*\' is only supported when using the CRT dependency @aws-sdk/signature-v4-crt. Please check whether you have installed the "@aws-sdk/signature-v4-crt" package explicitly. You must also register the package by calling [require("@aws-sdk/signature-v4-crt");] or an ESM equivalent such as [import "@aws-sdk/signature-v4-crt";]. For more information please go to https://github.com/aws/aws-sdk-js-v3#functionality-requiring-aws-common-runtime-crt')}return this.sigv4Signer.signWithCredentials(a,b,c)}async presign(a,b={}){if("*"===b.signingRegion){let a=this.getSigv4aSigner();!1;throw Error('presign with signingRegion \'*\' is only supported when using the CRT dependency @aws-sdk/signature-v4-crt. Please check whether you have installed the "@aws-sdk/signature-v4-crt" package explicitly. You must also register the package by calling [require("@aws-sdk/signature-v4-crt");] or an ESM equivalent such as [import "@aws-sdk/signature-v4-crt";]. For more information please go to https://github.com/aws/aws-sdk-js-v3#functionality-requiring-aws-common-runtime-crt')}return this.sigv4Signer.presign(a,b)}async presignWithCredentials(a,b,c={}){if("*"===c.signingRegion)throw Error("Method presignWithCredentials is not supported for [signingRegion=*].");return this.sigv4Signer.presignWithCredentials(a,b,c)}getSigv4aSigner(){if(!this.sigv4aSigner)if("node"===this.signerOptions.runtime){!0;throw Error("Neither CRT nor JS SigV4a implementation is available. Please load either @aws-sdk/signature-v4-crt or @aws-sdk/signature-v4a. For more information please go to https://github.com/aws/aws-sdk-js-v3#functionality-requiring-aws-common-runtime-crt")}else{!0;throw Error("JS SigV4a implementation is not available or not a valid constructor. Please check whether you have installed the @aws-sdk/signature-v4a package explicitly. The CRT implementation is not available for browsers. You must also register the package by calling [require('@aws-sdk/signature-v4a');] or an ESM equivalent such as [import '@aws-sdk/signature-v4a';]. For more information please go to https://github.com/aws/aws-sdk-js-v3#using-javascript-non-crt-implementation-of-sigv4a")}return this.sigv4aSigner}}class qt{signer;constructor(a){const b={service:a.signingName||a.service||"s3",uriEscapePath:a.uriEscapePath||!1,applyChecksum:a.applyChecksum||!1,...a};this.signer=new qs(b)}presign(a,{unsignableHeaders:b=new Set,hoistableHeaders:c=new Set,unhoistableHeaders:d=new Set,...e}={}){return this.prepareRequest(a,{unsignableHeaders:b,unhoistableHeaders:d,hoistableHeaders:c}),this.signer.presign(a,{expiresIn:900,unsignableHeaders:b,unhoistableHeaders:d,...e})}presignWithCredentials(a,b,{unsignableHeaders:c=new Set,hoistableHeaders:d=new Set,unhoistableHeaders:e=new Set,...f}={}){return this.prepareRequest(a,{unsignableHeaders:c,unhoistableHeaders:e,hoistableHeaders:d}),this.signer.presignWithCredentials(a,b,{expiresIn:900,unsignableHeaders:c,unhoistableHeaders:e,...f})}prepareRequest(a,{unsignableHeaders:b=new Set,unhoistableHeaders:c=new Set,hoistableHeaders:d=new Set}={}){b.add("content-type"),Object.keys(a.headers).map(a=>a.toLowerCase()).filter(a=>a.startsWith("x-amz-server-side-encryption")).forEach(a=>{d.has(a)||c.add(a)}),a.headers["X-Amz-Content-Sha256"]="UNSIGNED-PAYLOAD";let e=a.headers.host,f=a.port,g=`${a.hostname}${null!=a.port?":"+f:""}`;e&&(e!==a.hostname||null==a.port)||(a.headers.host=g)}}let qu=async(a,b,c={})=>{let d,e;if("function"==typeof a.config.endpointProvider){let c=await pC(b.input,b.constructor,a.config),f=c.properties?.authSchemes?.[0];e=f?.name==="sigv4a"?f?.signingRegionSet?.join(","):f?.signingRegion,d=new qt({...a.config,signingName:f?.signingName,region:async()=>e})}else d=new qt(a.config);let f=a.middlewareStack.clone();f.addRelativeTo((a,b)=>async a=>{let{request:f}=a;if(!pQ.isInstance(f))throw Error("Request to be presigned is not an valid HTTP request.");delete f.headers["amz-sdk-invocation-id"],delete f.headers["amz-sdk-request"],delete f.headers["x-amz-user-agent"];let g={...c,signingRegion:c.signingRegion??b.signing_region??e,signingService:c.signingService??b.signing_service};return{response:{},output:{$metadata:{httpStatusCode:200},presigned:b.s3ExpressIdentity?await d.presignWithCredentials(f,b.s3ExpressIdentity,g):await d.presign(f,g)}}},{name:"presignInterceptMiddleware",relation:"before",toMiddleware:"awsAuthMiddleware",override:!0});let g=b.resolveMiddleware(f,a.config,{}),{output:h}=await g({input:b.input}),{presigned:i}=h;return function(a){let{port:b,query:c}=a,{protocol:d,path:e,hostname:f}=a;d&&":"!==d.slice(-1)&&(d+=":"),b&&(f+=`:${b}`),e&&"/"!==e.charAt(0)&&(e=`/${e}`);let g=c?function(a){let b=[];for(let c of Object.keys(a).sort()){let d=a[c];if(c=pO(c),Array.isArray(d))for(let a=0,e=d.length;a<e;a++)b.push(`${c}=${pO(d[a])}`);else{let a=c;(d||"string"==typeof d)&&(a+=`=${pO(d)}`),b.push(a)}}return b.join("&")}(c):"";g&&"?"!==g[0]&&(g=`?${g}`);let h="";if(null!=a.username||null!=a.password){let b=a.username??"",c=a.password??"";h=`${b}:${c}@`}let i="";return a.fragment&&(i=`#${a.fragment}`),`${d}//${h}${f}${e}${g}${i}`}(i)},qv=new o7.S3Client({endpoint:process.env.DO_SPACES_ENDPOINT,region:process.env.DO_SPACES_REGION,credentials:{accessKeyId:process.env.DO_SPACES_ACCESS_KEY||"",secretAccessKey:process.env.DO_SPACES_SECRET_KEY||""}}),qw=process.env.DO_SPACES_BUCKET;async function qx(a,b){return qu(qv,new o7.GetObjectCommand({Bucket:qw,Key:a,ResponseContentDisposition:b?`attachment; filename="${b}"`:"attachment"}),{expiresIn:3600})}let qy=l8.object({tool:l8.string().min(1,{message:"Tool name is required."}),inputFile:l8.string().min(1,{message:"Input file is required."}),metadata:l8.record(l8.string(),l8.any()).optional()}),qz=bP({create:bQ.input(qy).mutation(async({input:a})=>{let b=await o6.JobModel.create({tool:a.tool,status:me.Status.IN_PROGRESS,inputFile:a.inputFile,metadata:a.metadata||{}});return await o5.add(b.tool,{jobId:b.id,tool:b.tool,inputFile:b.inputFile,metadata:b.metadata,status:b.status}),{jobId:b.id,status:b.status}}),getById:bQ.input(l8.object({jobId:l8.string().min(1)})).query(async({input:a})=>{let b=await o6.JobModel.findById(a.jobId).lean();if(!b)throw Error("Job not found");let c="";if(b.outputFile){let a=b.metadata,d="string"==typeof a?.originalName?a.originalName:"result",e=b.outputFile.split(".").pop()||"dat",f=`${d.replace(/\.[^/.]+$/,"")}.${e}`;c=await qx(b.outputFile,f)}return{...b,_id:b._id.toString(),downloadUrl:c}})});var qA=a.i(648571);let qB=l8.object({name:l8.string().min(2,{message:"Category name must be at least 2 characters."}),slug:l8.string().min(2,{message:"Slug must be at least 2 characters."}),description:l8.string().min(5,{message:"Description must be at least 5 characters."}),icon:l8.string().min(1,{message:"Icon is required."}),color:l8.string().min(4,{message:"Color must be a valid hex code."}),isActive:l8.boolean()}),qC=bP({create:bR.input(qB).mutation(async({input:a})=>{try{let b=new qA.CategoryModel({name:a.name,slug:a.slug,description:a.description,icon:a.icon,color:a.color,isActive:!0}),c=(await b.save()).toObject();return{...c,_id:c._id.toString()}}catch(a){throw new bk({code:"INTERNAL_SERVER_ERROR",message:`Failed to create category: ${a instanceof Error?a.message:"Unknown error"}`})}}),getMany:bQ.input(l8.object({page:l8.number().default(l9.DEFAULT_PAGE),pageSize:l8.number().min(l9.MIN_PAGE_SIZE).max(l9.MAX_PAGE_SIZE).default(l9.DEFAULT_PAGE_SIZE),search:l8.string().default("")})).query(async({input:a,ctx:b})=>{let{page:c,pageSize:d,search:e}=a,f={name:{$regex:RegExp(e,"i")},...b.session?{}:{isActive:!0}},[g,h]=await Promise.all([qA.CategoryModel.aggregate([{$match:f},{$lookup:{from:"tools",localField:"_id",foreignField:"category",as:"tools"}},{$addFields:{toolsCount:{$size:"$tools"}}},{$project:{tools:0}},{$sort:{createdAt:1}},{$skip:(c-1)*d},{$limit:d}]),qA.CategoryModel.countDocuments(f)]),i=Math.ceil(h/d);return{items:g.map(a=>({...a,_id:a._id.toString()})),page:c,pageSize:d,totalCount:h,totalPages:i,hasNextPage:c<i,hasPreviousPage:c>1}}),getOne:bR.input(l8.object({id:l8.string()})).query(async({input:a})=>{try{let b=await qA.CategoryModel.findById(a.id).lean();if(!b)throw new bk({code:"NOT_FOUND",message:"Category not found"});return{...b,_id:b._id.toString()}}catch(a){if(a instanceof bk)throw a;throw new bk({code:"INTERNAL_SERVER_ERROR",message:`Failed to fetch category: ${a instanceof Error?a.message:"Unknown error"}`})}}),getCategoryWithTools:bQ.input(l8.object({slug:l8.string()})).query(async({input:a})=>{let b=await qA.CategoryModel.findOne({slug:a.slug}).lean();if(!b)throw new bk({code:"NOT_FOUND",message:"Category not found"});let c=await mc.ToolModel.find({category:b._id,isActive:!0}).lean();return{...b,tools:c.map(a=>({...a,category:a.category.toString(),_id:a._id.toString()})),_id:b._id.toString()}}),update:bR.input(l8.object({id:l8.string(),data:qB.partial()})).mutation(async({input:a})=>{try{if(!await qA.CategoryModel.findById(a.id))throw new bk({code:"NOT_FOUND",message:"Category not found"});let b=await qA.CategoryModel.findByIdAndUpdate(a.id,{...a.data},{new:!0}).lean();if(!b)throw new bk({code:"INTERNAL_SERVER_ERROR",message:"Failed to update category"});return{success:!0,category:{...b,_id:b._id.toString()},message:"Category updated successfully"}}catch(a){if(a instanceof bk)throw a;throw new bk({code:"INTERNAL_SERVER_ERROR",message:`Failed to update category: ${a instanceof Error?a.message:"Unknown error"}`})}}),delete:bR.input(l8.object({id:l8.string()})).mutation(async({input:a})=>{try{let b=await qA.CategoryModel.findById(a.id);if(b)return await qA.CategoryModel.findByIdAndDelete(a.id),{id:b._id.toString(),name:b.name};return{id:a.id,name:"Category not found"}}catch(a){if(a instanceof bk)throw a;throw new bk({code:"INTERNAL_SERVER_ERROR",message:`Failed to delete category: ${a instanceof Error?a.message:"Unknown error"}`})}})});var qD=l8,qE=a.i(704249),qF=a.i(587342);let qG=qD.object({slug:qD.string().min(1)}),qH=qD.object({id:qD.string().min(1)}),qI=qD.object({seoTitle:qD.string().min(1),seoDescription:qD.string().min(1),seoKeywords:qD.string(),heroSection:qD.object({badge:qD.string().min(1),heading:qD.string().min(1),description:qD.string().min(1),primaryButtonText:qD.string().min(1),primaryButtonLink:qD.string().min(1),secondaryButtonText:qD.string().min(1),secondaryButtonLink:qD.string().min(1)}),howItWorksSection:qD.object({title:qD.string().min(1),subtitle:qD.string().min(1),steps:qD.array(qD.object({iconName:qD.string().min(1),title:qD.string().min(1),description:qD.string().min(1),order:qD.number()})).min(1)}),isActive:qD.boolean()}),qJ=qD.object({seoTitle:qD.string().min(1),seoDescription:qD.string().min(1),seoKeywords:qD.string(),h1Heading:qD.string().min(1),shortDescription:qD.string().min(1),isActive:qD.boolean()}),qK=qD.object({title:qD.string().min(1),slug:qD.string().min(1).regex(/^[a-z0-9-]+$/,"Slug must be lowercase letters, numbers, and hyphens only"),seoTitle:qD.string().min(1),seoDescription:qD.string().min(1),seoKeywords:qD.string(),content:qD.string().min(1),showInFooter:qD.boolean().default(!0),footerOrder:qD.number().default(0),footerLabel:qD.string().optional(),isActive:qD.boolean().default(!0)}),qL=qK.extend({id:qD.string().min(1)}),qM=qD.object({id:qD.string().min(1)}),qN=bP({getBySlug:bQ.input(qG).query(async({input:a})=>{let b=await qE.PageModel.findOne({slug:a.slug,isActive:!0}).lean();if(!b)throw new bk({code:"NOT_FOUND",message:"Page not found"});return{...b,_id:b._id.toString()}}),getHomepage:bQ.query(async()=>{let a=await qE.PageModel.findOne({pageType:qF.PageType.HOMEPAGE}).lean();if(!a)throw new bk({code:"NOT_FOUND",message:"Homepage not found"});return{...a,_id:a._id.toString()}}),getAllToolsPage:bQ.query(async()=>{let a=await qE.PageModel.findOne({pageType:qF.PageType.ALL_TOOLS}).lean();if(!a)throw new bk({code:"NOT_FOUND",message:"All Tools page not found"});return{...a,_id:a._id.toString()}}),getFooterPages:bQ.query(async()=>(await qE.PageModel.find({pageType:qF.PageType.CUSTOM,showInFooter:!0,isActive:!0}).sort({footerOrder:1}).lean()).map(a=>({...a,_id:a._id.toString()}))),getAll:bR.query(async()=>(await qE.PageModel.find({}).sort({pageType:1,footerOrder:1}).lean()).map(a=>({...a,_id:a._id.toString()}))),getById:bR.input(qH).query(async({input:a})=>{let b=await qE.PageModel.findById(a.id).lean();if(!b)throw new bk({code:"NOT_FOUND",message:"Page not found"});return{...b,_id:b._id.toString()}}),updateHomepage:bR.input(qI).mutation(async({input:a})=>{let b=await qE.PageModel.findOneAndUpdate({pageType:qF.PageType.HOMEPAGE},{seoTitle:a.seoTitle,seoDescription:a.seoDescription,seoKeywords:a.seoKeywords,heroSection:a.heroSection,howItWorksSection:a.howItWorksSection,isActive:a.isActive},{new:!0,upsert:!0,lean:!0});if(!b)throw new bk({code:"INTERNAL_SERVER_ERROR",message:"Failed to update homepage"});return{...b,_id:b._id.toString()}}),updateAllToolsPage:bR.input(qJ).mutation(async({input:a})=>{let b=await qE.PageModel.findOneAndUpdate({pageType:qF.PageType.ALL_TOOLS},{seoTitle:a.seoTitle,seoDescription:a.seoDescription,seoKeywords:a.seoKeywords,h1Heading:a.h1Heading,shortDescription:a.shortDescription,isActive:a.isActive},{new:!0,upsert:!0,lean:!0});if(!b)throw new bk({code:"INTERNAL_SERVER_ERROR",message:"Failed to update all tools page"});return{...b,_id:b._id.toString()}}),createCustomPage:bR.input(qK).mutation(async({input:a})=>{if(await qE.PageModel.findOne({slug:a.slug}))throw new bk({code:"CONFLICT",message:"A page with this slug already exists"});let b=(await qE.PageModel.create({pageType:qF.PageType.CUSTOM,slug:a.slug,title:a.title,seoTitle:a.seoTitle,seoDescription:a.seoDescription,seoKeywords:a.seoKeywords,content:a.content,showInFooter:a.showInFooter,footerOrder:a.footerOrder,footerLabel:a.footerLabel,isActive:a.isActive})).toObject();return{...b,_id:b._id.toString()}}),updateCustomPage:bR.input(qL).mutation(async({input:a})=>{let b=await qE.PageModel.findById(a.id);if(!b)throw new bk({code:"NOT_FOUND",message:"Page not found"});if(b.pageType!==qF.PageType.CUSTOM)throw new bk({code:"BAD_REQUEST",message:"Cannot update non-custom pages with this method"});if(a.slug!==b.slug&&await qE.PageModel.findOne({slug:a.slug}))throw new bk({code:"CONFLICT",message:"A page with this slug already exists"});b.slug=a.slug,b.title=a.title,b.seoTitle=a.seoTitle,b.seoDescription=a.seoDescription,b.seoKeywords=a.seoKeywords,b.content=a.content,b.showInFooter=a.showInFooter,b.footerOrder=a.footerOrder,b.footerLabel=a.footerLabel,b.isActive=a.isActive,await b.save();let c=b.toObject();return{...c,_id:c._id.toString()}}),deleteCustomPage:bR.input(qM).mutation(async({input:a})=>{let b=await qE.PageModel.findById(a.id);if(!b)throw new bk({code:"NOT_FOUND",message:"Page not found"});if(b.pageType!==qF.PageType.CUSTOM)throw new bk({code:"BAD_REQUEST",message:"Cannot delete fixed pages (Homepage, All Tools)"});return await qE.PageModel.findByIdAndDelete(a.id),{success:!0,message:"Custom page deleted successfully"}})});var qO=a.i(986961),qD=l8;let qP=qD.object({name:qD.string().min(1,"Name is required"),content:qD.string().min(1,"Script content is required"),location:qD.enum(["HEAD","BODY"]),isActive:qD.boolean().default(!0)}),qQ=bP({create:bR.input(qP).mutation(async({input:a})=>{try{let b=new qO.GlobalScriptModel({...a}),c=(await b.save()).toObject();return{...c,_id:c._id.toString()}}catch(a){throw new bk({code:"INTERNAL_SERVER_ERROR",message:`Failed to create script: ${a instanceof Error?a.message:"Unknown error"}`})}}),update:bR.input(l8.object({id:l8.string(),data:qP})).mutation(async({input:a})=>{let{id:b,data:c}=a;try{let a=await qO.GlobalScriptModel.findByIdAndUpdate(b,c,{new:!0});if(!a)throw new bk({code:"NOT_FOUND",message:"Script not found"});let d=a.toObject();return{...d,_id:d._id.toString()}}catch(a){throw new bk({code:"INTERNAL_SERVER_ERROR",message:`Failed to update script: ${a instanceof Error?a.message:"Unknown error"}`})}}),delete:bR.input(l8.object({id:l8.string()})).mutation(async({input:a})=>{try{return await qO.GlobalScriptModel.findByIdAndDelete(a.id),{success:!0}}catch(a){throw new bk({code:"INTERNAL_SERVER_ERROR",message:`Failed to delete script: ${a instanceof Error?a.message:"Unknown error"}`})}}),getMany:bR.input(l8.object({page:l8.number().default(l9.DEFAULT_PAGE),pageSize:l8.number().default(l9.DEFAULT_PAGE_SIZE),search:l8.string().default("")})).query(async({input:a})=>{let{page:b,pageSize:c,search:d}=a,e={name:{$regex:RegExp(d,"i")}};try{let[a,d]=await Promise.all([qO.GlobalScriptModel.find(e).skip((b-1)*c).limit(c).sort({createdAt:-1}),qO.GlobalScriptModel.countDocuments(e)]);return{items:a.map(a=>{let b=a.toObject();return{...b,_id:b._id.toString()}}),total:d}}catch{throw new bk({code:"INTERNAL_SERVER_ERROR",message:"Failed to fetch scripts"})}}),getById:bR.input(l8.object({id:l8.string()})).query(async({input:a})=>{try{let b=await qO.GlobalScriptModel.findById(a.id);if(!b)throw new bk({code:"NOT_FOUND",message:"Script not found"});let c=b.toObject();return{...c,_id:c._id.toString()}}catch{throw new bk({code:"INTERNAL_SERVER_ERROR",message:"Failed to fetch script"})}})}),qR=bP({jobs:qz,tools:md,categories:qC,pages:qN,globalScripts:qQ});var qS={setTimeout:(a,b)=>setTimeout(a,b),clearTimeout:a=>clearTimeout(a),setInterval:(a,b)=>setInterval(a,b),clearInterval:a=>clearInterval(a)},qT=new class{#a=qS;#b=!1;setTimeoutProvider(a){this.#a=a}setTimeout(a,b){return this.#a.setTimeout(a,b)}clearTimeout(a){this.#a.clearTimeout(a)}setInterval(a,b){return this.#a.setInterval(a,b)}clearInterval(a){this.#a.clearInterval(a)}};function qU(){}function qV(a,b){return"function"==typeof a?a(b):a}function qW(a,b){let{type:c="all",exact:d,fetchStatus:e,predicate:f,queryKey:g,stale:h}=a;if(g){if(d){if(b.queryHash!==qY(g,b.options))return!1}else if(!q$(b.queryKey,g))return!1}if("all"!==c){let a=b.isActive();if("active"===c&&!a||"inactive"===c&&a)return!1}return("boolean"!=typeof h||b.isStale()===h)&&(!e||e===b.state.fetchStatus)&&(!f||!!f(b))}function qX(a,b){let{exact:c,status:d,predicate:e,mutationKey:f}=a;if(f){if(!b.options.mutationKey)return!1;if(c){if(qZ(b.options.mutationKey)!==qZ(f))return!1}else if(!q$(b.options.mutationKey,f))return!1}return(!d||b.state.status===d)&&(!e||!!e(b))}function qY(a,b){return(b?.queryKeyHashFn||qZ)(a)}function qZ(a){return JSON.stringify(a,(a,b)=>q1(b)?Object.keys(b).sort().reduce((a,c)=>(a[c]=b[c],a),{}):b)}function q$(a,b){return a===b||typeof a==typeof b&&!!a&&!!b&&"object"==typeof a&&"object"==typeof b&&Object.keys(b).every(c=>q$(a[c],b[c]))}var q_=Object.prototype.hasOwnProperty;function q0(a){return Array.isArray(a)&&a.length===Object.keys(a).length}function q1(a){if(!q2(a))return!1;let b=a.constructor;if(void 0===b)return!0;let c=b.prototype;return!!q2(c)&&!!c.hasOwnProperty("isPrototypeOf")&&Object.getPrototypeOf(a)===Object.prototype}function q2(a){return"[object Object]"===Object.prototype.toString.call(a)}function q3(a,b,c=0){let d=[...a,b];return c&&d.length>c?d.slice(1):d}function q4(a,b,c=0){let d=[b,...a];return c&&d.length>c?d.slice(0,-1):d}var q5=Symbol();function q6(a,b){return!a.queryFn&&b?.initialPromise?()=>b.initialPromise:a.queryFn&&a.queryFn!==q5?a.queryFn:()=>Promise.reject(Error(`Missing queryFn: '${a.queryHash}'`))}function q7(a){return a}function q8(a){return a.state.isPaused}function q9(a){return"success"===a.state.status}function ra(a){return!0}var rb=(o=[],p=0,q=a=>{a()},r=a=>{a()},s=function(a){setTimeout(a,0)},{batch:a=>{let b;p++;try{b=a()}finally{let a;--p||(a=o,o=[],a.length&&s(()=>{r(()=>{a.forEach(a=>{q(a)})})}))}return b},batchCalls:a=>(...b)=>{t(()=>{a(...b)})},schedule:t=a=>{p?o.push(a):s(()=>{q(a)})},setNotifyFunction:a=>{q=a},setBatchNotifyFunction:a=>{r=a},setScheduler:a=>{s=a}}),rc=class{constructor(){this.listeners=new Set,this.subscribe=this.subscribe.bind(this)}subscribe(a){return this.listeners.add(a),this.onSubscribe(),()=>{this.listeners.delete(a),this.onUnsubscribe()}}hasListeners(){return this.listeners.size>0}onSubscribe(){}onUnsubscribe(){}},rd=new class extends rc{#c;#d;#e;constructor(){super(),this.#e=a=>{}}onSubscribe(){this.#d||this.setEventListener(this.#e)}onUnsubscribe(){this.hasListeners()||(this.#d?.(),this.#d=void 0)}setEventListener(a){this.#e=a,this.#d?.(),this.#d=a(a=>{"boolean"==typeof a?this.setFocused(a):this.onFocus()})}setFocused(a){this.#c!==a&&(this.#c=a,this.onFocus())}onFocus(){let a=this.isFocused();this.listeners.forEach(b=>{b(a)})}isFocused(){return"boolean"==typeof this.#c?this.#c:globalThis.document?.visibilityState!=="hidden"}},re=new class extends rc{#f=!0;#d;#e;constructor(){super(),this.#e=a=>{}}onSubscribe(){this.#d||this.setEventListener(this.#e)}onUnsubscribe(){this.hasListeners()||(this.#d?.(),this.#d=void 0)}setEventListener(a){this.#e=a,this.#d?.(),this.#d=a(this.setOnline.bind(this))}setOnline(a){this.#f!==a&&(this.#f=a,this.listeners.forEach(b=>{b(a)}))}isOnline(){return this.#f}};function rf(a){return Math.min(1e3*2**a,3e4)}function rg(a){return(a??"online")!=="online"||re.isOnline()}var rh=class extends Error{constructor(a){super("CancelledError"),this.revert=a?.revert,this.silent=a?.silent}};function ri(a){let b,c=!1,d=0,e=function(){let a,b,c=new Promise((c,d)=>{a=c,b=d});function d(a){Object.assign(c,a),delete c.resolve,delete c.reject}return c.status="pending",c.catch(()=>{}),c.resolve=b=>{d({status:"fulfilled",value:b}),a(b)},c.reject=a=>{d({status:"rejected",reason:a}),b(a)},c}(),f=()=>rd.isFocused()&&("always"===a.networkMode||re.isOnline())&&a.canRun(),g=()=>rg(a.networkMode)&&a.canRun(),h=a=>{"pending"===e.status&&(b?.(),e.resolve(a))},i=a=>{"pending"===e.status&&(b?.(),e.reject(a))},j=()=>new Promise(c=>{b=a=>{("pending"!==e.status||f())&&c(a)},a.onPause?.()}).then(()=>{b=void 0,"pending"===e.status&&a.onContinue?.()}),k=()=>{let b;if("pending"!==e.status)return;let g=0===d?a.initialPromise:void 0;try{b=g??a.fn()}catch(a){b=Promise.reject(a)}Promise.resolve(b).then(h).catch(b=>{if("pending"!==e.status)return;let g=a.retry??0,h=a.retryDelay??rf,l="function"==typeof h?h(d,b):h,m=!0===g||"number"==typeof g&&d<g||"function"==typeof g&&g(d,b);c||!m?i(b):(d++,a.onFail?.(d,b),new Promise(a=>{qT.setTimeout(a,l)}).then(()=>f()?void 0:j()).then(()=>{c?i(b):k()}))})};return{promise:e,status:()=>e.status,cancel:b=>{if("pending"===e.status){let c=new rh(b);i(c),a.onCancel?.(c)}},continue:()=>(b?.(),e),cancelRetry:()=>{c=!0},continueRetry:()=>{c=!1},canStart:g,start:()=>(g()?k():j().then(k),e)}}var rj=class{#g;destroy(){this.clearGcTimeout()}scheduleGc(){var a;this.clearGcTimeout(),"number"==typeof(a=this.gcTime)&&a>=0&&a!==1/0&&(this.#g=qT.setTimeout(()=>{this.optionalRemove()},this.gcTime))}updateGcTime(a){this.gcTime=Math.max(this.gcTime||0,a??1/0)}clearGcTimeout(){this.#g&&(qT.clearTimeout(this.#g),this.#g=void 0)}},rk=class extends rj{#h;#i;#j;#k;#l;#m;#n;constructor(a){super(),this.#n=!1,this.#m=a.defaultOptions,this.setOptions(a.options),this.observers=[],this.#k=a.client,this.#j=this.#k.getQueryCache(),this.queryKey=a.queryKey,this.queryHash=a.queryHash,this.#h=rm(this.options),this.state=a.state??this.#h,this.scheduleGc()}get meta(){return this.options.meta}get promise(){return this.#l?.promise}setOptions(a){if(this.options={...this.#m,...a},this.updateGcTime(this.options.gcTime),this.state&&void 0===this.state.data){let a=rm(this.options);void 0!==a.data&&(this.setState(rl(a.data,a.dataUpdatedAt)),this.#h=a)}}optionalRemove(){this.observers.length||"idle"!==this.state.fetchStatus||this.#j.remove(this)}setData(a,b){var c,d;let e=(c=this.state.data,"function"==typeof(d=this.options).structuralSharing?d.structuralSharing(c,a):!1!==d.structuralSharing?function a(b,c){if(b===c)return b;let d=q0(b)&&q0(c);if(!d&&!(q1(b)&&q1(c)))return c;let e=(d?b:Object.keys(b)).length,f=d?c:Object.keys(c),g=f.length,h=d?Array(g):{},i=0;for(let j=0;j<g;j++){let g=d?j:f[j],k=b[g],l=c[g];if(k===l){h[g]=k,(d?j<e:q_.call(b,g))&&i++;continue}if(null===k||null===l||"object"!=typeof k||"object"!=typeof l){h[g]=l;continue}let m=a(k,l);h[g]=m,m===k&&i++}return e===g&&i===e?b:h}(c,a):a);return this.#o({data:e,type:"success",dataUpdatedAt:b?.updatedAt,manual:b?.manual}),e}setState(a,b){this.#o({type:"setState",state:a,setStateOptions:b})}cancel(a){let b=this.#l?.promise;return this.#l?.cancel(a),b?b.then(qU).catch(qU):Promise.resolve()}destroy(){super.destroy(),this.cancel({silent:!0})}reset(){this.destroy(),this.setState(this.#h)}isActive(){return this.observers.some(a=>{var b;return!1!==(b=a.options.enabled,"function"==typeof b?b(this):b)})}isDisabled(){return this.getObserversCount()>0?!this.isActive():this.options.queryFn===q5||this.state.dataUpdateCount+this.state.errorUpdateCount===0}isStatic(){return this.getObserversCount()>0&&this.observers.some(a=>"static"===qV(a.options.staleTime,this))}isStale(){return this.getObserversCount()>0?this.observers.some(a=>a.getCurrentResult().isStale):void 0===this.state.data||this.state.isInvalidated}isStaleByTime(a=0){return void 0===this.state.data||"static"!==a&&(!!this.state.isInvalidated||!Math.max(this.state.dataUpdatedAt+(a||0)-Date.now(),0))}onFocus(){let a=this.observers.find(a=>a.shouldFetchOnWindowFocus());a?.refetch({cancelRefetch:!1}),this.#l?.continue()}onOnline(){let a=this.observers.find(a=>a.shouldFetchOnReconnect());a?.refetch({cancelRefetch:!1}),this.#l?.continue()}addObserver(a){this.observers.includes(a)||(this.observers.push(a),this.clearGcTimeout(),this.#j.notify({type:"observerAdded",query:this,observer:a}))}removeObserver(a){this.observers.includes(a)&&(this.observers=this.observers.filter(b=>b!==a),this.observers.length||(this.#l&&(this.#n?this.#l.cancel({revert:!0}):this.#l.cancelRetry()),this.scheduleGc()),this.#j.notify({type:"observerRemoved",query:this,observer:a}))}getObserversCount(){return this.observers.length}invalidate(){this.state.isInvalidated||this.#o({type:"invalidate"})}async fetch(a,b){let c;if("idle"!==this.state.fetchStatus&&this.#l?.status()!=="rejected"){if(void 0!==this.state.data&&b?.cancelRefetch)this.cancel({silent:!0});else if(this.#l)return this.#l.continueRetry(),this.#l.promise}if(a&&this.setOptions(a),!this.options.queryFn){let a=this.observers.find(a=>a.options.queryFn);a&&this.setOptions(a.options)}let d=new AbortController,e=a=>{Object.defineProperty(a,"signal",{enumerable:!0,get:()=>(this.#n=!0,d.signal)})},f=()=>{let a,c=q6(this.options,b),d=(e(a={client:this.#k,queryKey:this.queryKey,meta:this.meta}),a);return(this.#n=!1,this.options.persister)?this.options.persister(c,d,this):c(d)},g=(e(c={fetchOptions:b,options:this.options,queryKey:this.queryKey,client:this.#k,state:this.state,fetchFn:f}),c);this.options.behavior?.onFetch(g,this),this.#i=this.state,("idle"===this.state.fetchStatus||this.state.fetchMeta!==g.fetchOptions?.meta)&&this.#o({type:"fetch",meta:g.fetchOptions?.meta}),this.#l=ri({initialPromise:b?.initialPromise,fn:g.fetchFn,onCancel:a=>{a instanceof rh&&a.revert&&this.setState({...this.#i,fetchStatus:"idle"}),d.abort()},onFail:(a,b)=>{this.#o({type:"failed",failureCount:a,error:b})},onPause:()=>{this.#o({type:"pause"})},onContinue:()=>{this.#o({type:"continue"})},retry:g.options.retry,retryDelay:g.options.retryDelay,networkMode:g.options.networkMode,canRun:()=>!0});try{let a=await this.#l.start();if(void 0===a)throw Error(`${this.queryHash} data is undefined`);return this.setData(a),this.#j.config.onSuccess?.(a,this),this.#j.config.onSettled?.(a,this.state.error,this),a}catch(a){if(a instanceof rh){if(a.silent)return this.#l.promise;else if(a.revert){if(void 0===this.state.data)throw a;return this.state.data}}throw this.#o({type:"error",error:a}),this.#j.config.onError?.(a,this),this.#j.config.onSettled?.(this.state.data,a,this),a}finally{this.scheduleGc()}}#o(a){let b=b=>{switch(a.type){case"failed":return{...b,fetchFailureCount:a.failureCount,fetchFailureReason:a.error};case"pause":return{...b,fetchStatus:"paused"};case"continue":return{...b,fetchStatus:"fetching"};case"fetch":var c;return{...b,...(c=b.data,{fetchFailureCount:0,fetchFailureReason:null,fetchStatus:rg(this.options.networkMode)?"fetching":"paused",...void 0===c&&{error:null,status:"pending"}}),fetchMeta:a.meta??null};case"success":let d={...b,...rl(a.data,a.dataUpdatedAt),dataUpdateCount:b.dataUpdateCount+1,...!a.manual&&{fetchStatus:"idle",fetchFailureCount:0,fetchFailureReason:null}};return this.#i=a.manual?d:void 0,d;case"error":let e=a.error;return{...b,error:e,errorUpdateCount:b.errorUpdateCount+1,errorUpdatedAt:Date.now(),fetchFailureCount:b.fetchFailureCount+1,fetchFailureReason:e,fetchStatus:"idle",status:"error",isInvalidated:!0};case"invalidate":return{...b,isInvalidated:!0};case"setState":return{...b,...a.state}}};this.state=b(this.state),rb.batch(()=>{this.observers.forEach(a=>{a.onQueryUpdate()}),this.#j.notify({query:this,type:"updated",action:a})})}};function rl(a,b){return{data:a,dataUpdatedAt:b??Date.now(),error:null,isInvalidated:!1,status:"success"}}function rm(a){let b="function"==typeof a.initialData?a.initialData():a.initialData,c=void 0!==b,d=c?"function"==typeof a.initialDataUpdatedAt?a.initialDataUpdatedAt():a.initialDataUpdatedAt:0;return{data:b,dataUpdateCount:0,dataUpdatedAt:c?d??Date.now():0,error:null,errorUpdateCount:0,errorUpdatedAt:0,fetchFailureCount:0,fetchFailureReason:null,fetchMeta:null,isInvalidated:!1,status:c?"success":"pending",fetchStatus:"idle"}}var rn=class extends rc{constructor(a={}){super(),this.config=a,this.#p=new Map}#p;build(a,b,c){let d=b.queryKey,e=b.queryHash??qY(d,b),f=this.get(e);return f||(f=new rk({client:a,queryKey:d,queryHash:e,options:a.defaultQueryOptions(b),state:c,defaultOptions:a.getQueryDefaults(d)}),this.add(f)),f}add(a){this.#p.has(a.queryHash)||(this.#p.set(a.queryHash,a),this.notify({type:"added",query:a}))}remove(a){let b=this.#p.get(a.queryHash);b&&(a.destroy(),b===a&&this.#p.delete(a.queryHash),this.notify({type:"removed",query:a}))}clear(){rb.batch(()=>{this.getAll().forEach(a=>{this.remove(a)})})}get(a){return this.#p.get(a)}getAll(){return[...this.#p.values()]}find(a){let b={exact:!0,...a};return this.getAll().find(a=>qW(b,a))}findAll(a={}){let b=this.getAll();return Object.keys(a).length>0?b.filter(b=>qW(a,b)):b}notify(a){rb.batch(()=>{this.listeners.forEach(b=>{b(a)})})}onFocus(){rb.batch(()=>{this.getAll().forEach(a=>{a.onFocus()})})}onOnline(){rb.batch(()=>{this.getAll().forEach(a=>{a.onOnline()})})}},ro=class extends rj{#k;#q;#r;#l;constructor(a){super(),this.#k=a.client,this.mutationId=a.mutationId,this.#r=a.mutationCache,this.#q=[],this.state=a.state||{context:void 0,data:void 0,error:null,failureCount:0,failureReason:null,isPaused:!1,status:"idle",variables:void 0,submittedAt:0},this.setOptions(a.options),this.scheduleGc()}setOptions(a){this.options=a,this.updateGcTime(this.options.gcTime)}get meta(){return this.options.meta}addObserver(a){this.#q.includes(a)||(this.#q.push(a),this.clearGcTimeout(),this.#r.notify({type:"observerAdded",mutation:this,observer:a}))}removeObserver(a){this.#q=this.#q.filter(b=>b!==a),this.scheduleGc(),this.#r.notify({type:"observerRemoved",mutation:this,observer:a})}optionalRemove(){this.#q.length||("pending"===this.state.status?this.scheduleGc():this.#r.remove(this))}continue(){return this.#l?.continue()??this.execute(this.state.variables)}async execute(a){let b=()=>{this.#o({type:"continue"})},c={client:this.#k,meta:this.options.meta,mutationKey:this.options.mutationKey};this.#l=ri({fn:()=>this.options.mutationFn?this.options.mutationFn(a,c):Promise.reject(Error("No mutationFn found")),onFail:(a,b)=>{this.#o({type:"failed",failureCount:a,error:b})},onPause:()=>{this.#o({type:"pause"})},onContinue:b,retry:this.options.retry??0,retryDelay:this.options.retryDelay,networkMode:this.options.networkMode,canRun:()=>this.#r.canRun(this)});let d="pending"===this.state.status,e=!this.#l.canStart();try{if(d)b();else{this.#o({type:"pending",variables:a,isPaused:e}),await this.#r.config.onMutate?.(a,this,c);let b=await this.options.onMutate?.(a,c);b!==this.state.context&&this.#o({type:"pending",context:b,variables:a,isPaused:e})}let f=await this.#l.start();return await this.#r.config.onSuccess?.(f,a,this.state.context,this,c),await this.options.onSuccess?.(f,a,this.state.context,c),await this.#r.config.onSettled?.(f,null,this.state.variables,this.state.context,this,c),await this.options.onSettled?.(f,null,a,this.state.context,c),this.#o({type:"success",data:f}),f}catch(b){try{await this.#r.config.onError?.(b,a,this.state.context,this,c)}catch(a){Promise.reject(a)}try{await this.options.onError?.(b,a,this.state.context,c)}catch(a){Promise.reject(a)}try{await this.#r.config.onSettled?.(void 0,b,this.state.variables,this.state.context,this,c)}catch(a){Promise.reject(a)}try{await this.options.onSettled?.(void 0,b,a,this.state.context,c)}catch(a){Promise.reject(a)}throw this.#o({type:"error",error:b}),b}finally{this.#r.runNext(this)}}#o(a){this.state=(b=>{switch(a.type){case"failed":return{...b,failureCount:a.failureCount,failureReason:a.error};case"pause":return{...b,isPaused:!0};case"continue":return{...b,isPaused:!1};case"pending":return{...b,context:a.context,data:void 0,failureCount:0,failureReason:null,error:null,isPaused:a.isPaused,status:"pending",variables:a.variables,submittedAt:Date.now()};case"success":return{...b,data:a.data,failureCount:0,failureReason:null,error:null,status:"success",isPaused:!1};case"error":return{...b,data:void 0,error:a.error,failureCount:b.failureCount+1,failureReason:a.error,isPaused:!1,status:"error"}}})(this.state),rb.batch(()=>{this.#q.forEach(b=>{b.onMutationUpdate(a)}),this.#r.notify({mutation:this,type:"updated",action:a})})}},rp=class extends rc{constructor(a={}){super(),this.config=a,this.#s=new Set,this.#t=new Map,this.#u=0}#s;#t;#u;build(a,b,c){let d=new ro({client:a,mutationCache:this,mutationId:++this.#u,options:a.defaultMutationOptions(b),state:c});return this.add(d),d}add(a){this.#s.add(a);let b=rq(a);if("string"==typeof b){let c=this.#t.get(b);c?c.push(a):this.#t.set(b,[a])}this.notify({type:"added",mutation:a})}remove(a){if(this.#s.delete(a)){let b=rq(a);if("string"==typeof b){let c=this.#t.get(b);if(c)if(c.length>1){let b=c.indexOf(a);-1!==b&&c.splice(b,1)}else c[0]===a&&this.#t.delete(b)}}this.notify({type:"removed",mutation:a})}canRun(a){let b=rq(a);if("string"!=typeof b)return!0;{let c=this.#t.get(b),d=c?.find(a=>"pending"===a.state.status);return!d||d===a}}runNext(a){let b=rq(a);if("string"!=typeof b)return Promise.resolve();{let c=this.#t.get(b)?.find(b=>b!==a&&b.state.isPaused);return c?.continue()??Promise.resolve()}}clear(){rb.batch(()=>{this.#s.forEach(a=>{this.notify({type:"removed",mutation:a})}),this.#s.clear(),this.#t.clear()})}getAll(){return Array.from(this.#s)}find(a){let b={exact:!0,...a};return this.getAll().find(a=>qX(b,a))}findAll(a={}){return this.getAll().filter(b=>qX(a,b))}notify(a){rb.batch(()=>{this.listeners.forEach(b=>{b(a)})})}resumePausedMutations(){let a=this.getAll().filter(a=>a.state.isPaused);return rb.batch(()=>Promise.all(a.map(a=>a.continue().catch(qU))))}};function rq(a){return a.options.scope?.id}function rr(a){return{onFetch:(b,c)=>{let d=b.options,e=b.fetchOptions?.meta?.fetchMore?.direction,f=b.state.data?.pages||[],g=b.state.data?.pageParams||[],h={pages:[],pageParams:[]},i=0,j=async()=>{let c=!1,j=q6(b.options,b.fetchOptions),k=async(a,d,e)=>{if(c)return Promise.reject();if(null==d&&a.pages.length)return Promise.resolve(a);let f=(()=>{var a,f;let g,h,i={client:b.client,queryKey:b.queryKey,pageParam:d,direction:e?"backward":"forward",meta:b.options.meta};return a=()=>b.signal,f=()=>c=!0,h=!1,Object.defineProperty(i,"signal",{enumerable:!0,get:()=>(g??=a(),h||(h=!0,g.aborted?f():g.addEventListener("abort",f,{once:!0})),g)}),i})(),g=await j(f),{maxPages:h}=b.options,i=e?q4:q3;return{pages:i(a.pages,g,h),pageParams:i(a.pageParams,d,h)}};if(e&&f.length){let a="backward"===e,b={pages:f,pageParams:g},c=(a?function(a,{pages:b,pageParams:c}){return b.length>0?a.getPreviousPageParam?.(b[0],b,c[0],c):void 0}:rs)(d,b);h=await k(b,c,a)}else{let b=a??f.length;do{let a=0===i?g[0]??d.initialPageParam:rs(d,h);if(i>0&&null==a)break;h=await k(h,a),i++}while(i<b)}return h};b.options.persister?b.fetchFn=()=>b.options.persister?.(j,{client:b.client,queryKey:b.queryKey,meta:b.options.meta,signal:b.signal},c):b.fetchFn=j}}}function rs(a,{pages:b,pageParams:c}){let d=b.length-1;return b.length>0?a.getNextPageParam(b[d],b,c[d],c):void 0}var rt=class{#v;#r;#m;#w;#x;#y;#z;#A;constructor(a={}){this.#v=a.queryCache||new rn,this.#r=a.mutationCache||new rp,this.#m=a.defaultOptions||{},this.#w=new Map,this.#x=new Map,this.#y=0}mount(){this.#y++,1===this.#y&&(this.#z=rd.subscribe(async a=>{a&&(await this.resumePausedMutations(),this.#v.onFocus())}),this.#A=re.subscribe(async a=>{a&&(await this.resumePausedMutations(),this.#v.onOnline())}))}unmount(){this.#y--,0===this.#y&&(this.#z?.(),this.#z=void 0,this.#A?.(),this.#A=void 0)}isFetching(a){return this.#v.findAll({...a,fetchStatus:"fetching"}).length}isMutating(a){return this.#r.findAll({...a,status:"pending"}).length}getQueryData(a){let b=this.defaultQueryOptions({queryKey:a});return this.#v.get(b.queryHash)?.state.data}ensureQueryData(a){let b=this.defaultQueryOptions(a),c=this.#v.build(this,b),d=c.state.data;return void 0===d?this.fetchQuery(a):(a.revalidateIfStale&&c.isStaleByTime(qV(b.staleTime,c))&&this.prefetchQuery(b),Promise.resolve(d))}getQueriesData(a){return this.#v.findAll(a).map(({queryKey:a,state:b})=>[a,b.data])}setQueryData(a,b,c){let d=this.defaultQueryOptions({queryKey:a}),e=this.#v.get(d.queryHash),f=e?.state.data,g="function"==typeof b?b(f):b;if(void 0!==g)return this.#v.build(this,d).setData(g,{...c,manual:!0})}setQueriesData(a,b,c){return rb.batch(()=>this.#v.findAll(a).map(({queryKey:a})=>[a,this.setQueryData(a,b,c)]))}getQueryState(a){let b=this.defaultQueryOptions({queryKey:a});return this.#v.get(b.queryHash)?.state}removeQueries(a){let b=this.#v;rb.batch(()=>{b.findAll(a).forEach(a=>{b.remove(a)})})}resetQueries(a,b){let c=this.#v;return rb.batch(()=>(c.findAll(a).forEach(a=>{a.reset()}),this.refetchQueries({type:"active",...a},b)))}cancelQueries(a,b={}){let c={revert:!0,...b};return Promise.all(rb.batch(()=>this.#v.findAll(a).map(a=>a.cancel(c)))).then(qU).catch(qU)}invalidateQueries(a,b={}){return rb.batch(()=>(this.#v.findAll(a).forEach(a=>{a.invalidate()}),a?.refetchType==="none")?Promise.resolve():this.refetchQueries({...a,type:a?.refetchType??a?.type??"active"},b))}refetchQueries(a,b={}){let c={...b,cancelRefetch:b.cancelRefetch??!0};return Promise.all(rb.batch(()=>this.#v.findAll(a).filter(a=>!a.isDisabled()&&!a.isStatic()).map(a=>{let b=a.fetch(void 0,c);return c.throwOnError||(b=b.catch(qU)),"paused"===a.state.fetchStatus?Promise.resolve():b}))).then(qU)}fetchQuery(a){let b=this.defaultQueryOptions(a);void 0===b.retry&&(b.retry=!1);let c=this.#v.build(this,b);return c.isStaleByTime(qV(b.staleTime,c))?c.fetch(b):Promise.resolve(c.state.data)}prefetchQuery(a){return this.fetchQuery(a).then(qU).catch(qU)}fetchInfiniteQuery(a){return a.behavior=rr(a.pages),this.fetchQuery(a)}prefetchInfiniteQuery(a){return this.fetchInfiniteQuery(a).then(qU).catch(qU)}ensureInfiniteQueryData(a){return a.behavior=rr(a.pages),this.ensureQueryData(a)}resumePausedMutations(){return re.isOnline()?this.#r.resumePausedMutations():Promise.resolve()}getQueryCache(){return this.#v}getMutationCache(){return this.#r}getDefaultOptions(){return this.#m}setDefaultOptions(a){this.#m=a}setQueryDefaults(a,b){this.#w.set(qZ(a),{queryKey:a,defaultOptions:b})}getQueryDefaults(a){let b=[...this.#w.values()],c={};return b.forEach(b=>{q$(a,b.queryKey)&&Object.assign(c,b.defaultOptions)}),c}setMutationDefaults(a,b){this.#x.set(qZ(a),{mutationKey:a,defaultOptions:b})}getMutationDefaults(a){let b=[...this.#x.values()],c={};return b.forEach(b=>{q$(a,b.mutationKey)&&Object.assign(c,b.defaultOptions)}),c}defaultQueryOptions(a){if(a._defaulted)return a;let b={...this.#m.queries,...this.getQueryDefaults(a.queryKey),...a,_defaulted:!0};return b.queryHash||(b.queryHash=qY(b.queryKey,b)),void 0===b.refetchOnReconnect&&(b.refetchOnReconnect="always"!==b.networkMode),void 0===b.throwOnError&&(b.throwOnError=!!b.suspense),!b.networkMode&&b.persister&&(b.networkMode="offlineFirst"),b.queryFn===q5&&(b.enabled=!1),b}defaultMutationOptions(a){return a?._defaulted?a:{...this.#m.mutations,...a?.mutationKey&&this.getMutationDefaults(a.mutationKey),...a,_defaulted:!0}}clear(){this.#v.clear(),this.#r.clear()}},ru=a.i(316974),rv=Object.create,rw=Object.defineProperty,rx=Object.getOwnPropertyDescriptor,ry=Object.getOwnPropertyNames,rz=Object.getPrototypeOf,rA=Object.prototype.hasOwnProperty,rB=(a,b)=>function(){return b||(0,a[ry(a)[0]])((b={exports:{}}).exports,b),b.exports},rC=(a,b,c)=>(c=null!=a?rv(rz(a)):{},((a,b,c,d)=>{if(b&&"object"==typeof b||"function"==typeof b)for(var e,f=ry(b),g=0,h=f.length;g<h;g++)e=f[g],rA.call(a,e)||e===c||rw(a,e,{get:(a=>b[a]).bind(null,e),enumerable:!(d=rx(b,e))||d.enumerable});return a})(!b&&a&&a.__esModule?c:rw(c,"default",{value:a,enumerable:!0}),a)),rD=rB({"../../node_modules/.pnpm/@oxc-project+runtime@0.72.2/node_modules/@oxc-project/runtime/src/helpers/typeof.js"(a,b){function c(a){return b.exports=c="function"==typeof Symbol&&"symbol"==typeof Symbol.iterator?function(a){return typeof a}:function(a){return a&&"function"==typeof Symbol&&a.constructor===Symbol&&a!==Symbol.prototype?"symbol":typeof a},b.exports.__esModule=!0,b.exports.default=b.exports,c(a)}b.exports=c,b.exports.__esModule=!0,b.exports.default=b.exports}}),rE=rB({"../../node_modules/.pnpm/@oxc-project+runtime@0.72.2/node_modules/@oxc-project/runtime/src/helpers/toPrimitive.js"(a,b){var c=rD().default;b.exports=function(a,b){if("object"!=c(a)||!a)return a;var d=a[Symbol.toPrimitive];if(void 0!==d){var e=d.call(a,b||"default");if("object"!=c(e))return e;throw TypeError("@@toPrimitive must return a primitive value.")}return("string"===b?String:Number)(a)},b.exports.__esModule=!0,b.exports.default=b.exports}}),rF=rB({"../../node_modules/.pnpm/@oxc-project+runtime@0.72.2/node_modules/@oxc-project/runtime/src/helpers/toPropertyKey.js"(a,b){var c=rD().default,d=rE();b.exports=function(a){var b=d(a,"string");return"symbol"==c(b)?b:b+""},b.exports.__esModule=!0,b.exports.default=b.exports}}),rG=rB({"../../node_modules/.pnpm/@oxc-project+runtime@0.72.2/node_modules/@oxc-project/runtime/src/helpers/defineProperty.js"(a,b){var c=rF();b.exports=function(a,b,d){return(b=c(b))in a?Object.defineProperty(a,b,{value:d,enumerable:!0,configurable:!0,writable:!0}):a[b]=d,a},b.exports.__esModule=!0,b.exports.default=b.exports}}),rH=rB({"../../node_modules/.pnpm/@oxc-project+runtime@0.72.2/node_modules/@oxc-project/runtime/src/helpers/objectSpread2.js"(a,b){var c=rG();function d(a,b){var c=Object.keys(a);if(Object.getOwnPropertySymbols){var d=Object.getOwnPropertySymbols(a);b&&(d=d.filter(function(b){return Object.getOwnPropertyDescriptor(a,b).enumerable})),c.push.apply(c,d)}return c}b.exports=function(a){for(var b=1;b<arguments.length;b++){var e=null!=arguments[b]?arguments[b]:{};b%2?d(Object(e),!0).forEach(function(b){c(a,b,e[b])}):Object.getOwnPropertyDescriptors?Object.defineProperties(a,Object.getOwnPropertyDescriptors(e)):d(Object(e)).forEach(function(b){Object.defineProperty(a,b,Object.getOwnPropertyDescriptor(e,b))})}return a},b.exports.__esModule=!0,b.exports.default=b.exports}});function rI(a){let b={subscribe(b){let c=null,d=!1,e=!1,f=!1;function g(){if(null===c){f=!0;return}!e&&(e=!0,"function"==typeof c?c():c&&c.unsubscribe())}return c=a({next(a){var c;d||null==(c=b.next)||c.call(b,a)},error(a){var c;d||(d=!0,null==(c=b.error)||c.call(b,a),g())},complete(){var a;d||(d=!0,null==(a=b.complete)||a.call(b),g())}}),f&&g(),{unsubscribe:g}},pipe:(...a)=>a.reduce(rJ,b)};return b}function rJ(a,b){return b(a)}var rK=rC(rG(),1),rL=rC(rH(),1),rM=class a extends Error{constructor(b,c){var d,e;const f=null==c?void 0:c.cause;super(b,{cause:f}),(0,rK.default)(this,"cause",void 0),(0,rK.default)(this,"shape",void 0),(0,rK.default)(this,"data",void 0),(0,rK.default)(this,"meta",void 0),this.meta=null==c?void 0:c.meta,this.cause=f,this.shape=null==c||null==(d=c.result)?void 0:d.error,this.data=null==c||null==(e=c.result)?void 0:e.error.data,this.name="TRPCClientError",Object.setPrototypeOf(this,a.prototype)}static from(b,c={}){return b instanceof rM?(c.meta&&(b.meta=(0,rL.default)((0,rL.default)({},b.meta),c.meta)),b):aY(b)&&aY(b.error)&&"number"==typeof b.error.code&&"string"==typeof b.error.message?new a(b.error.message,(0,rL.default)((0,rL.default)({},c),{},{result:b})):new a("string"==typeof b?b:aY(b)&&"string"==typeof b.message?b.message:"Unknown error",(0,rL.default)((0,rL.default)({},c),{},{cause:b}))}};rC(rH(),1);rC(rH(),1),rC(rH(),1),Symbol(),rC(rH(),1);let rN=(a,...b)=>"function"==typeof a?a(...b):a;async function rO(a){let b=await rN(a.url);if(!a.connectionParams)return b;let c=b.includes("?")?"&":"?";return b+`${c}connectionParams=1`}async function rP(a){return JSON.stringify({method:"connectionParams",data:await rN(a)})}rC(rG(),1),rC(rG(),1);var rQ=rC(rG(),1),rR=class a{constructor(b){var c;if((0,rQ.default)(this,"id",++a.connectCount),(0,rQ.default)(this,"WebSocketPonyfill",void 0),(0,rQ.default)(this,"urlOptions",void 0),(0,rQ.default)(this,"keepAliveOpts",void 0),(0,rQ.default)(this,"wsObservable",function(a){let b=null,c=[],d=rI(a=>(void 0!==b&&a.next(b),c.push(a),()=>{c.splice(c.indexOf(a),1)}));return d.next=a=>{if(b!==a)for(let d of(b=a,c))d.next(a)},d.get=()=>b,d}(0)),(0,rQ.default)(this,"openPromise",null),this.WebSocketPonyfill=null!=(c=b.WebSocketPonyfill)?c:WebSocket,!this.WebSocketPonyfill)throw Error("No WebSocket implementation found - you probably don't want to use this on the server, but if you do you need to pass a `WebSocket`-ponyfill");this.urlOptions=b.urlOptions,this.keepAliveOpts=b.keepAlive}get ws(){return this.wsObservable.get()}set ws(a){this.wsObservable.next(a)}isOpen(){return!!this.ws&&this.ws.readyState===this.WebSocketPonyfill.OPEN&&!this.openPromise}isClosed(){return!!this.ws&&(this.ws.readyState===this.WebSocketPonyfill.CLOSING||this.ws.readyState===this.WebSocketPonyfill.CLOSED)}async open(){var b=this;if(b.openPromise)return b.openPromise;b.id=++a.connectCount;let c=rO(b.urlOptions).then(a=>new b.WebSocketPonyfill(a));b.openPromise=c.then(async a=>{b.ws=a,a.addEventListener("message",function({data:a}){"PING"===a&&this.send("PONG")}),b.keepAliveOpts.enabled&&function(a,{intervalMs:b,pongTimeoutMs:c}){let d,e;function f(){d=setTimeout(()=>{a.send("PING"),e=setTimeout(()=>{a.close()},c)},b)}a.addEventListener("open",f),a.addEventListener("message",({data:a})=>{clearTimeout(d),f(),"PONG"===a&&(clearTimeout(e),clearTimeout(d),f())}),a.addEventListener("close",()=>{clearTimeout(d),clearTimeout(e)})}(a,b.keepAliveOpts),a.addEventListener("close",()=>{b.ws===a&&(b.ws=null)}),await function(a){let b,c,{promise:d,resolve:e,reject:f}={promise:new Promise((a,d)=>{b=a,c=d}),resolve:b,reject:c};return a.addEventListener("open",()=>{a.removeEventListener("error",f),e()}),a.addEventListener("error",f),d}(a),b.urlOptions.connectionParams&&a.send(await rP(b.urlOptions.connectionParams))});try{await b.openPromise}finally{b.openPromise=null}}async close(){var a;try{await this.openPromise}finally{null==(a=this.ws)||a.close()}}};(0,rQ.default)(rR,"connectCount",0),rC(rG(),1),rC(rH(),1),a7(bf(),1);var rS=a7(be(),1);let rT=new WeakMap,rU=()=>{};n=Symbol.toStringTag;var rV=class a{constructor(a){(0,rS.default)(this,"promise",void 0),(0,rS.default)(this,"subscribers",[]),(0,rS.default)(this,"settlement",null),(0,rS.default)(this,n,"Unpromise"),"function"==typeof a?this.promise=new Promise(a):this.promise=a;const b=this.promise.then(a=>{let{subscribers:b}=this;this.subscribers=null,this.settlement={status:"fulfilled",value:a},null==b||b.forEach(({resolve:b})=>{b(a)})});"catch"in b&&b.catch(a=>{let{subscribers:b}=this;this.subscribers=null,this.settlement={status:"rejected",reason:a},null==b||b.forEach(({reject:b})=>{b(a)})})}subscribe(){let a,b,{settlement:c}=this;if(null===c){var d;let c,e;if(null===this.subscribers)throw Error("Unpromise settled but still has subscribers");let f={promise:new Promise((a,b)=>{c=a,e=b}),resolve:c,reject:e};this.subscribers=(d=this.subscribers,[...d,f]),a=f.promise,b=()=>{null!==this.subscribers&&(this.subscribers=function(a,b){let c=a.indexOf(b);if(-1!==c)return[...a.slice(0,c),...a.slice(c+1)];return a}(this.subscribers,f))}}else{let{status:d}=c;a="fulfilled"===d?Promise.resolve(c.value):Promise.reject(c.reason),b=rU}return Object.assign(a,{unsubscribe:b})}then(a,b){let c=this.subscribe(),{unsubscribe:d}=c;return Object.assign(c.then(a,b),{unsubscribe:d})}catch(a){let b=this.subscribe(),{unsubscribe:c}=b;return Object.assign(b.catch(a),{unsubscribe:c})}finally(a){let b=this.subscribe(),{unsubscribe:c}=b;return Object.assign(b.finally(a),{unsubscribe:c})}static proxy(b){let c=a.getSubscribablePromise(b);return void 0!==c?c:a.createSubscribablePromise(b)}static createSubscribablePromise(b){let c=new a(b);return rT.set(b,c),rT.set(c,c),c}static getSubscribablePromise(a){return rT.get(a)}static resolve(b){let c="object"==typeof b&&null!==b&&"then"in b&&"function"==typeof b.then?b:Promise.resolve(b);return a.proxy(c).subscribe()}static async any(b){let c=(Array.isArray(b)?b:[...b]).map(a.resolve);try{return await Promise.any(c)}finally{c.forEach(({unsubscribe:a})=>{a()})}}static async race(b){let c=(Array.isArray(b)?b:[...b]).map(a.resolve);try{return await Promise.race(c)}finally{c.forEach(({unsubscribe:a})=>{a()})}}static async raceReferences(a){let b=a.map(rW);try{return await Promise.race(b)}finally{for(let a of b)a.unsubscribe()}}};function rW(a){return rV.proxy(a).then(()=>[a])}null!=(ag=Symbol).dispose||(ag.dispose=Symbol()),null!=(ah=Symbol).asyncDispose||(ah.asyncDispose=Symbol()),Symbol();var rX=a6({"../../node_modules/.pnpm/@oxc-project+runtime@0.72.2/node_modules/@oxc-project/runtime/src/helpers/usingCtx.js"(a,b){b.exports=function(){var a="function"==typeof SuppressedError?SuppressedError:function(a,b){var c=Error();return c.name="SuppressedError",c.error=a,c.suppressed=b,c},b={},c=[];function d(a,b){if(null!=b){if(Object(b)!==b)throw TypeError("using declarations can only be used with objects, functions, null, or undefined.");if(a)var d=b[Symbol.asyncDispose||Symbol.for("Symbol.asyncDispose")];if(void 0===d&&(d=b[Symbol.dispose||Symbol.for("Symbol.dispose")],a))var e=d;if("function"!=typeof d)throw TypeError("Object is not disposable.");e&&(d=function(){try{e.call(b)}catch(a){return Promise.reject(a)}}),c.push({v:b,d:d,a:a})}else a&&c.push({d:b,a:a});return b}return{e:b,u:d.bind(null,!1),a:d.bind(null,!0),d:function(){var d,e=this.e,f=0;function g(){for(;d=c.pop();)try{if(!d.a&&1===f)return f=0,c.push(d),Promise.resolve().then(g);if(d.d){var a=d.d.call(d.v);if(d.a)return f|=2,Promise.resolve(a).then(g,h)}else f|=1}catch(a){return h(a)}if(1===f)return e!==b?Promise.reject(e):Promise.resolve();if(e!==b)throw e}function h(c){return e=e!==b?new a(c,e):c,g()}return g()}}},b.exports.__esModule=!0,b.exports.default=b.exports}}),rY=a6({"../../node_modules/.pnpm/@oxc-project+runtime@0.72.2/node_modules/@oxc-project/runtime/src/helpers/OverloadYield.js"(a,b){b.exports=function(a,b){this.v=a,this.k=b},b.exports.__esModule=!0,b.exports.default=b.exports}}),rZ=a6({"../../node_modules/.pnpm/@oxc-project+runtime@0.72.2/node_modules/@oxc-project/runtime/src/helpers/awaitAsyncGenerator.js"(a,b){var c=rY();b.exports=function(a){return new c(a,0)},b.exports.__esModule=!0,b.exports.default=b.exports}}),r$=a6({"../../node_modules/.pnpm/@oxc-project+runtime@0.72.2/node_modules/@oxc-project/runtime/src/helpers/wrapAsyncGenerator.js"(a,b){var c=rY();function d(a){var b,d;function e(b,d){try{var g=a[b](d),h=g.value,i=h instanceof c;Promise.resolve(i?h.v:h).then(function(c){if(i){var d="return"===b?"return":"next";if(!h.k||c.done)return e(d,c);c=a[d](c).value}f(g.done?"return":"normal",c)},function(a){e("throw",a)})}catch(a){f("throw",a)}}function f(a,c){switch(a){case"return":b.resolve({value:c,done:!0});break;case"throw":b.reject(c);break;default:b.resolve({value:c,done:!1})}(b=b.next)?e(b.key,b.arg):d=null}this._invoke=function(a,c){return new Promise(function(f,g){var h={key:a,arg:c,resolve:f,reject:g,next:null};d?d=d.next=h:(b=d=h,e(a,c))})},"function"!=typeof a.return&&(this.return=void 0)}d.prototype["function"==typeof Symbol&&Symbol.asyncIterator||"@@asyncIterator"]=function(){return this},d.prototype.next=function(a){return this._invoke("next",a)},d.prototype.throw=function(a){return this._invoke("throw",a)},d.prototype.return=function(a){return this._invoke("return",a)},b.exports=function(a){return function(){return new d(a.apply(this,arguments))}},b.exports.__esModule=!0,b.exports.default=b.exports}});a7(rX(),1),a7(rZ(),1),a7(r$(),1),a7(rX(),1),a7(rZ(),1),a7(r$(),1),a7(rX(),1),a7(rZ(),1),a7(r$(),1),Symbol("ping");var r_=a6({"../../node_modules/.pnpm/@oxc-project+runtime@0.72.2/node_modules/@oxc-project/runtime/src/helpers/asyncIterator.js"(a,b){function c(a){function b(a){if(Object(a)!==a)return Promise.reject(TypeError(a+" is not an object."));var b=a.done;return Promise.resolve(a.value).then(function(a){return{value:a,done:b}})}return(c=function(a){this.s=a,this.n=a.next}).prototype={s:null,n:null,next:function(){return b(this.n.apply(this.s,arguments))},return:function(a){var c=this.s.return;return void 0===c?Promise.resolve({value:a,done:!0}):b(c.apply(this.s,arguments))},throw:function(a){var c=this.s.return;return void 0===c?Promise.reject(a):b(c.apply(this.s,arguments))}},new c(a)}b.exports=function(a){var b,d,e,f=2;for("undefined"!=typeof Symbol&&(d=Symbol.asyncIterator,e=Symbol.iterator);f--;){if(d&&null!=(b=a[d]))return b.call(a);if(e&&null!=(b=a[e]))return new c(b.call(a));d="@@asyncIterator",e="@@iterator"}throw TypeError("Object is not async iterable")},b.exports.__esModule=!0,b.exports.default=b.exports}});a7(rZ(),1),a7(r$(),1),a7(rX(),1),a7(r_(),1);var r0=a6({"../../node_modules/.pnpm/@oxc-project+runtime@0.72.2/node_modules/@oxc-project/runtime/src/helpers/asyncGeneratorDelegate.js"(a,b){var c=rY();b.exports=function(a){var b={},d=!1;function e(b,e){return d=!0,{done:!1,value:new c(e=new Promise(function(c){c(a[b](e))}),1)}}return b["undefined"!=typeof Symbol&&Symbol.iterator||"@@iterator"]=function(){return this},b.next=function(a){return d?(d=!1,a):e("next",a)},"function"==typeof a.throw&&(b.throw=function(a){if(d)throw d=!1,a;return e("throw",a)}),"function"==typeof a.return&&(b.return=function(a){return d?(d=!1,a):e("return",a)}),b},b.exports.__esModule=!0,b.exports.default=b.exports}});a7(r_(),1),a7(rZ(),1),a7(r$(),1),a7(r0(),1),a7(rX(),1),a7(r$(),1),a7(bf(),1);var r1=rC(rG(),1),r2=rC(rH(),1),r3=class{constructor(a){(0,r1.default)(this,"links",void 0),(0,r1.default)(this,"runtime",void 0),(0,r1.default)(this,"requestId",void 0),this.requestId=0,this.runtime={},this.links=a.links.map(a=>a(this.runtime))}$request(a){var b,c;return(c={links:this.links,op:(0,r2.default)((0,r2.default)({},a),{},{context:null!=(b=a.context)?b:{},id:++this.requestId})},rI(a=>(function a(b=0,d=c.op){let e=c.links[b];if(!e)throw Error("No more links to execute - did you forget to add an ending link?");return e({op:d,next:c=>a(b+1,c)})})().subscribe(a))).pipe(a=>{let b=0,c=null,d=[];return rI(e=>(b++,d.push(e),c||(c=a.subscribe({next(a){for(let c of d){var b;null==(b=c.next)||b.call(c,a)}},error(a){for(let c of d){var b;null==(b=c.error)||b.call(c,a)}},complete(){for(let b of d){var a;null==(a=b.complete)||a.call(b)}}})),{unsubscribe(){if(0==--b&&c){let a=c;c=null,a.unsubscribe()}let a=d.findIndex(a=>a===e);a>-1&&d.splice(a,1)}}))})}async requestAsPromise(a){try{let b,c=this.$request(a);return(await (b=new AbortController,new Promise((a,d)=>{let e=!1;function f(){e||(e=!0,g.unsubscribe())}b.signal.addEventListener("abort",()=>{d(b.signal.reason)});let g=c.subscribe({next(b){e=!0,a(b),f()},error(a){d(a)},complete(){b.abort(),f()}})}))).result.data}catch(a){throw rM.from(a)}}query(a,b,c){return this.requestAsPromise({type:"query",path:a,input:b,context:null==c?void 0:c.context,signal:null==c?void 0:c.signal})}mutation(a,b,c){return this.requestAsPromise({type:"mutation",path:a,input:b,context:null==c?void 0:c.context,signal:null==c?void 0:c.signal})}subscription(a,b,c){return this.$request({type:"subscription",path:a,input:b,context:c.context,signal:c.signal}).subscribe({next(a){var b,d,e,f;switch(a.result.type){case"state":null==(b=c.onConnectionStateChange)||b.call(c,a.result);break;case"started":null==(d=c.onStarted)||d.call(c,{context:a.context});break;case"stopped":null==(e=c.onStopped)||e.call(c);break;case"data":case void 0:null==(f=c.onData)||f.call(c,a.result.data)}},error(a){var b;null==(b=c.onError)||b.call(c,a)},complete(){var a;null==(a=c.onComplete)||a.call(c)}})}};let r4=Symbol.for("trpc_untypedClient");rC(rH(),1),rC(rH(),1),rC(rB({"../../node_modules/.pnpm/@oxc-project+runtime@0.72.2/node_modules/@oxc-project/runtime/src/helpers/asyncIterator.js"(a,b){function c(a){function b(a){if(Object(a)!==a)return Promise.reject(TypeError(a+" is not an object."));var b=a.done;return Promise.resolve(a.value).then(function(a){return{value:a,done:b}})}return(c=function(a){this.s=a,this.n=a.next}).prototype={s:null,n:null,next:function(){return b(this.n.apply(this.s,arguments))},return:function(a){var c=this.s.return;return void 0===c?Promise.resolve({value:a,done:!0}):b(c.apply(this.s,arguments))},throw:function(a){var c=this.s.return;return void 0===c?Promise.reject(a):b(c.apply(this.s,arguments))}},new c(a)}b.exports=function(a){var b,d,e,f=2;for("undefined"!=typeof Symbol&&(d=Symbol.asyncIterator,e=Symbol.iterator);f--;){if(d&&null!=(b=a[d]))return b.call(a);if(e&&null!=(b=a[e]))return new c(b.call(a));d="@@asyncIterator",e="@@iterator"}throw TypeError("Object is not async iterable")},b.exports.__esModule=!0,b.exports.default=b.exports}})(),1),rC(rH(),1);var r5=rB({"../../node_modules/.pnpm/@oxc-project+runtime@0.72.2/node_modules/@oxc-project/runtime/src/helpers/usingCtx.js"(a,b){b.exports=function(){var a="function"==typeof SuppressedError?SuppressedError:function(a,b){var c=Error();return c.name="SuppressedError",c.error=a,c.suppressed=b,c},b={},c=[];function d(a,b){if(null!=b){if(Object(b)!==b)throw TypeError("using declarations can only be used with objects, functions, null, or undefined.");if(a)var d=b[Symbol.asyncDispose||Symbol.for("Symbol.asyncDispose")];if(void 0===d&&(d=b[Symbol.dispose||Symbol.for("Symbol.dispose")],a))var e=d;if("function"!=typeof d)throw TypeError("Object is not disposable.");e&&(d=function(){try{e.call(b)}catch(a){return Promise.reject(a)}}),c.push({v:b,d:d,a:a})}else a&&c.push({d:b,a:a});return b}return{e:b,u:d.bind(null,!1),a:d.bind(null,!0),d:function(){var d,e=this.e,f=0;function g(){for(;d=c.pop();)try{if(!d.a&&1===f)return f=0,c.push(d),Promise.resolve().then(g);if(d.d){var a=d.d.call(d.v);if(d.a)return f|=2,Promise.resolve(a).then(g,h)}else f|=1}catch(a){return h(a)}if(1===f)return e!==b?Promise.reject(e):Promise.resolve();if(e!==b)throw e}function h(c){return e=e!==b?new a(c,e):c,g()}return g()}}},b.exports.__esModule=!0,b.exports.default=b.exports}}),r6=rB({"../../node_modules/.pnpm/@oxc-project+runtime@0.72.2/node_modules/@oxc-project/runtime/src/helpers/OverloadYield.js"(a,b){b.exports=function(a,b){this.v=a,this.k=b},b.exports.__esModule=!0,b.exports.default=b.exports}}),r7=rB({"../../node_modules/.pnpm/@oxc-project+runtime@0.72.2/node_modules/@oxc-project/runtime/src/helpers/awaitAsyncGenerator.js"(a,b){var c=r6();b.exports=function(a){return new c(a,0)},b.exports.__esModule=!0,b.exports.default=b.exports}}),r8=rB({"../../node_modules/.pnpm/@oxc-project+runtime@0.72.2/node_modules/@oxc-project/runtime/src/helpers/wrapAsyncGenerator.js"(a,b){var c=r6();function d(a){var b,d;function e(b,d){try{var g=a[b](d),h=g.value,i=h instanceof c;Promise.resolve(i?h.v:h).then(function(c){if(i){var d="return"===b?"return":"next";if(!h.k||c.done)return e(d,c);c=a[d](c).value}f(g.done?"return":"normal",c)},function(a){e("throw",a)})}catch(a){f("throw",a)}}function f(a,c){switch(a){case"return":b.resolve({value:c,done:!0});break;case"throw":b.reject(c);break;default:b.resolve({value:c,done:!1})}(b=b.next)?e(b.key,b.arg):d=null}this._invoke=function(a,c){return new Promise(function(f,g){var h={key:a,arg:c,resolve:f,reject:g,next:null};d?d=d.next=h:(b=d=h,e(a,c))})},"function"!=typeof a.return&&(this.return=void 0)}d.prototype["function"==typeof Symbol&&Symbol.asyncIterator||"@@asyncIterator"]=function(){return this},d.prototype.next=function(a){return this._invoke("next",a)},d.prototype.throw=function(a){return this._invoke("throw",a)},d.prototype.return=function(a){return this._invoke("return",a)},b.exports=function(a){return function(){return new d(a.apply(this,arguments))}},b.exports.__esModule=!0,b.exports.default=b.exports}});rC(r5(),1),rC(r7(),1),rC(r8(),1),rC(rH(),1);var r9=Object.create,sa=Object.defineProperty,sb=Object.getOwnPropertyDescriptor,sc=Object.getOwnPropertyNames,sd=Object.getPrototypeOf,se=Object.prototype.hasOwnProperty,sf=(a,b)=>function(){return b||(0,a[sc(a)[0]])((b={exports:{}}).exports,b),b.exports},sg=(a,b,c)=>(c=null!=a?r9(sd(a)):{},((a,b,c,d)=>{if(b&&"object"==typeof b||"function"==typeof b)for(var e,f=sc(b),g=0,h=f.length;g<h;g++)e=f[g],se.call(a,e)||e===c||sa(a,e,{get:(a=>b[a]).bind(null,e),enumerable:!(d=sb(b,e))||d.enumerable});return a})(!b&&a&&a.__esModule?c:sa(c,"default",{value:a,enumerable:!0}),a)),sh=sf({"../../node_modules/.pnpm/@oxc-project+runtime@0.72.2/node_modules/@oxc-project/runtime/src/helpers/typeof.js"(a,b){function c(a){return b.exports=c="function"==typeof Symbol&&"symbol"==typeof Symbol.iterator?function(a){return typeof a}:function(a){return a&&"function"==typeof Symbol&&a.constructor===Symbol&&a!==Symbol.prototype?"symbol":typeof a},b.exports.__esModule=!0,b.exports.default=b.exports,c(a)}b.exports=c,b.exports.__esModule=!0,b.exports.default=b.exports}}),si=sf({"../../node_modules/.pnpm/@oxc-project+runtime@0.72.2/node_modules/@oxc-project/runtime/src/helpers/toPrimitive.js"(a,b){var c=sh().default;b.exports=function(a,b){if("object"!=c(a)||!a)return a;var d=a[Symbol.toPrimitive];if(void 0!==d){var e=d.call(a,b||"default");if("object"!=c(e))return e;throw TypeError("@@toPrimitive must return a primitive value.")}return("string"===b?String:Number)(a)},b.exports.__esModule=!0,b.exports.default=b.exports}}),sj=sf({"../../node_modules/.pnpm/@oxc-project+runtime@0.72.2/node_modules/@oxc-project/runtime/src/helpers/toPropertyKey.js"(a,b){var c=sh().default,d=si();b.exports=function(a){var b=d(a,"string");return"symbol"==c(b)?b:b+""},b.exports.__esModule=!0,b.exports.default=b.exports}}),sk=sf({"../../node_modules/.pnpm/@oxc-project+runtime@0.72.2/node_modules/@oxc-project/runtime/src/helpers/defineProperty.js"(a,b){var c=sj();b.exports=function(a,b,d){return(b=c(b))in a?Object.defineProperty(a,b,{value:d,enumerable:!0,configurable:!0,writable:!0}):a[b]=d,a},b.exports.__esModule=!0,b.exports.default=b.exports}}),sl=sf({"../../node_modules/.pnpm/@oxc-project+runtime@0.72.2/node_modules/@oxc-project/runtime/src/helpers/objectSpread2.js"(a,b){var c=sk();function d(a,b){var c=Object.keys(a);if(Object.getOwnPropertySymbols){var d=Object.getOwnPropertySymbols(a);b&&(d=d.filter(function(b){return Object.getOwnPropertyDescriptor(a,b).enumerable})),c.push.apply(c,d)}return c}b.exports=function(a){for(var b=1;b<arguments.length;b++){var e=null!=arguments[b]?arguments[b]:{};b%2?d(Object(e),!0).forEach(function(b){c(a,b,e[b])}):Object.getOwnPropertyDescriptors?Object.defineProperties(a,Object.getOwnPropertyDescriptors(e)):d(Object(e)).forEach(function(b){Object.defineProperty(a,b,Object.getOwnPropertyDescriptor(e,b))})}return a},b.exports.__esModule=!0,b.exports.default=b.exports}}),sm=sf({"../../node_modules/.pnpm/@oxc-project+runtime@0.72.2/node_modules/@oxc-project/runtime/src/helpers/asyncIterator.js"(a,b){function c(a){function b(a){if(Object(a)!==a)return Promise.reject(TypeError(a+" is not an object."));var b=a.done;return Promise.resolve(a.value).then(function(a){return{value:a,done:b}})}return(c=function(a){this.s=a,this.n=a.next}).prototype={s:null,n:null,next:function(){return b(this.n.apply(this.s,arguments))},return:function(a){var c=this.s.return;return void 0===c?Promise.resolve({value:a,done:!0}):b(c.apply(this.s,arguments))},throw:function(a){var c=this.s.return;return void 0===c?Promise.reject(a):b(c.apply(this.s,arguments))}},new c(a)}b.exports=function(a){var b,d,e,f=2;for("undefined"!=typeof Symbol&&(d=Symbol.asyncIterator,e=Symbol.iterator);f--;){if(d&&null!=(b=a[d]))return b.call(a);if(e&&null!=(b=a[e]))return new c(b.call(a));d="@@asyncIterator",e="@@iterator"}throw TypeError("Object is not async iterable")},b.exports.__esModule=!0,b.exports.default=b.exports}}),sn=sf({"../../node_modules/.pnpm/@oxc-project+runtime@0.72.2/node_modules/@oxc-project/runtime/src/helpers/objectWithoutPropertiesLoose.js"(a,b){b.exports=function(a,b){if(null==a)return{};var c={};for(var d in a)if(({}).hasOwnProperty.call(a,d)){if(b.includes(d))continue;c[d]=a[d]}return c},b.exports.__esModule=!0,b.exports.default=b.exports}}),so=sf({"../../node_modules/.pnpm/@oxc-project+runtime@0.72.2/node_modules/@oxc-project/runtime/src/helpers/objectWithoutProperties.js"(a,b){var c=sn();b.exports=function(a,b){if(null==a)return{};var d,e,f=c(a,b);if(Object.getOwnPropertySymbols){var g=Object.getOwnPropertySymbols(a);for(e=0;e<g.length;e++)d=g[e],b.includes(d)||({}).propertyIsEnumerable.call(a,d)&&(f[d]=a[d])}return f},b.exports.__esModule=!0,b.exports.default=b.exports}}),sp=sg(sl(),1),sq=sg(sm(),1),sr=sg(so(),1);let ss=["cursor","direction"];function st(a){return{path:a.path.join(".")}}function su(a){return a.length>=3?{type:"prefixed",prefix:a[0],path:a[1],args:a[2]}:{type:"unprefixed",prefix:void 0,path:a[0],args:a[1]}}function sv(a,b,c){var d,e,f;let g=su(a),h=null==(d=g.args)?void 0:d.input;return c&&(h=(0,sp.default)((0,sp.default)((0,sp.default)({},null!=(e=null==(f=g.args)?void 0:f.input)?e:{}),void 0!==c.pageParam?{cursor:c.pageParam}:{}),{},{direction:c.direction})),[g.path.join("."),h,null==b?void 0:b.trpc]}async function sw(a,b,c){let d=b.getQueryCache().build(b,{queryKey:c});d.setState({data:[],status:"success"});let e=[];var f=!1,g=!1;try{for(var h,i,j=(0,sq.default)(a);f=!(i=await j.next()).done;f=!1){let a=i.value;e.push(a),d.setState({data:[...e]})}}catch(a){g=!0,h=a}finally{try{f&&null!=j.return&&await j.return()}finally{if(g)throw h}}return e}function sx(a){let b=(()=>{let{input:b,type:c}=a,d=a.path.flatMap(a=>a.split("."));if(!b&&"any"===c)return d.length?[d]:[];if("infinite"===c&&aY(b)&&("direction"in b||"cursor"in b)){let{cursor:a,direction:c}=b;return[d,{input:(0,sr.default)(b,ss),type:"infinite"}]}return[d,(0,sp.default)((0,sp.default)({},void 0!==b&&b!==q5&&{input:b}),c&&"any"!==c&&{type:c})]})();return a.prefix&&b.unshift([a.prefix]),b}function sy(a){let b=[a.path.flatMap(a=>a.split("."))];return a.prefix&&b.unshift([a.prefix]),b}function sz(a){return aZ(a)?a():a}var sA=sg(sl()),sB=sg(sl()),sC=sg(sl()),sD=sg(sl(),1),sE=sg(sl(),1);let sF=(0,aj.cache)(function(){return new rt({defaultOptions:{queries:{staleTime:3e4},dehydrate:{serializeData:aV.serialize,shouldDehydrateQuery:a=>q9(a)||"pending"===a.state.status},hydrate:{deserializeData:aV.deserialize}}})}),sG=(u=(I={ctx:bN,router:qR,queryClient:sF}).keyPrefix,v=a=>(b,c,d)=>"router"in I?Promise.resolve(sz(I.ctx)).then(d=>bs({router:I.router,path:b,getRawInput:async()=>c,ctx:d,type:a,signal:void 0})):(I.client instanceof r3?I.client:I.client[r4])[a](b,c,d),ba(({args:a,path:b})=>{let c=[...b],d=c.pop(),[e,f]=a;return({"~types":void 0,pathKey:()=>sx({path:c,type:"any",prefix:u}),pathFilter:()=>(0,sE.default)((0,sE.default)({},e),{},{queryKey:sx({path:c,type:"any",prefix:u})}),queryOptions:()=>(function(a){let{input:b,query:c,path:d,queryKey:e,opts:f}=a,g=sz(a.queryClient),h=b===q5,i=async a=>{var b;let d=(0,sC.default)((0,sC.default)({},f),{},{trpc:(0,sC.default)((0,sC.default)({},null==f?void 0:f.trpc),(null==f||null==(b=f.trpc)?void 0:b.abortOnUnmount)?{signal:a.signal}:{signal:null})}),e=a.queryKey,h=await c(...sv(e,d));return a_&&aY(h)&&Symbol.asyncIterator in h?sw(h,g,e):h};return Object.assign((0,sC.default)((0,sC.default)({},f),{},{queryKey:e,queryFn:h?q5:i}),{trpc:st({path:d})})})({input:e,opts:f,path:c,queryClient:I.queryClient,queryKey:sx({path:c,input:e,type:"query",prefix:u}),query:v("query")}),queryKey:()=>sx({path:c,input:e,type:"query",prefix:u}),queryFilter:()=>(0,sE.default)((0,sE.default)({},f),{},{queryKey:sx({path:c,input:e,type:"query",prefix:u})}),infiniteQueryOptions:()=>(function(a){var b;let{input:c,query:d,path:e,queryKey:f,opts:g}=a,h=c===q5,i=async a=>{var b;let c=(0,sA.default)((0,sA.default)({},g),{},{trpc:(0,sA.default)((0,sA.default)({},null==g?void 0:g.trpc),(null==g||null==(b=g.trpc)?void 0:b.abortOnUnmount)?{signal:a.signal}:{signal:null})});return await d(...sv(f,c,{direction:a.direction,pageParam:a.pageParam}))};return Object.assign((0,sA.default)((0,sA.default)({},null!=g?g:{}),{},{queryKey:f,queryFn:h?q5:i,initialPageParam:null!=(b=null==g?void 0:g.initialCursor)?b:null==c?void 0:c.cursor}),{trpc:st({path:e})})})({input:e,opts:f,path:c,queryClient:I.queryClient,queryKey:sx({path:c,input:e,type:"infinite",prefix:u}),query:v("query")}),infiniteQueryKey:()=>sx({path:c,input:e,type:"infinite",prefix:u}),infiniteQueryFilter:()=>(0,sE.default)((0,sE.default)({},f),{},{queryKey:sx({path:c,input:e,type:"infinite",prefix:u})}),mutationOptions:()=>{var a;return function(a){var b;let{mutate:c,path:d,opts:e,overrides:f}=a,g=sz(a.queryClient),h=sy({path:d,prefix:null==e?void 0:e.keyPrefix}),i=g.defaultMutationOptions(g.getMutationDefaults(h)),j=null!=(b=null==f?void 0:f.onSuccess)?b:a=>a.originalFn(),k=async a=>await c(...sv([...h,{input:a}],e));return(0,sB.default)((0,sB.default)({},e),{},{mutationKey:h,mutationFn:k,onSuccess(...a){var b,c;return j({originalFn:()=>{var b,c,d;return null!=(b=null==e||null==(c=e.onSuccess)?void 0:c.call(e,...a))?b:null==i||null==(d=i.onSuccess)?void 0:d.call(i,...a)},queryClient:g,meta:null!=(b=null!=(c=null==e?void 0:e.meta)?c:null==i?void 0:i.meta)?b:{}})},trpc:st({path:d})})}({opts:e,path:c,queryClient:I.queryClient,mutate:v("mutation"),overrides:null==(a=I.overrides)?void 0:a.mutations})},mutationKey:()=>sy({path:c,prefix:u}),subscriptionOptions:()=>(a=>{var b;let{subscribe:c,path:d,queryKey:e,opts:f={}}=a,g=null==(b=su(e))||null==(b=b.args)?void 0:b.input,h="enabled"in f?!!f.enabled:g!==q5;return(0,sD.default)((0,sD.default)({},f),{},{enabled:h,subscribe:a=>c(d.join("."),null!=g?g:void 0,a),queryKey:e,trpc:st({path:d})})})({opts:f,path:c,queryKey:sx({path:c,input:e,type:"any",prefix:u}),subscribe:v("subscription")})})[d]()})),sH=qR.createCaller(bN);function sI(a){let b=sF();return(0,ai.jsx)(ru.HydrationBoundary,{state:function(a,b={}){let c=b.shouldDehydrateMutation??a.getDefaultOptions().dehydrate?.shouldDehydrateMutation??q8,d=a.getMutationCache().getAll().flatMap(a=>c(a)?[{mutationKey:a.options.mutationKey,state:a.state,...a.options.scope&&{scope:a.options.scope},...a.meta&&{meta:a.meta}}]:[]),e=b.shouldDehydrateQuery??a.getDefaultOptions().dehydrate?.shouldDehydrateQuery??q9,f=b.shouldRedactErrors??a.getDefaultOptions().dehydrate?.shouldRedactErrors??ra,g=b.serializeData??a.getDefaultOptions().dehydrate?.serializeData??q7;return{mutations:d,queries:a.getQueryCache().getAll().flatMap(a=>{let b;return e(a)?[{dehydratedAt:Date.now(),state:{...a.state,...void 0!==a.state.data&&{data:g(a.state.data)}},queryKey:a.queryKey,queryHash:a.queryHash,..."pending"===a.state.status&&{promise:(b=a.promise?.then(g).catch(a=>f(a)?Promise.reject(Error("redacted")):Promise.reject(a)),b?.catch(qU),b)},...a.meta&&{meta:a.meta}}]:[]})}}(b),children:a.children})}function sJ(a){let b=sF();a.queryKey[1]?.type==="infinite"?b.prefetchInfiniteQuery(a):b.prefetchQuery(a)}a.s(["HydrateClient",()=>sI,"caller",0,sH,"prefetch",()=>sJ,"trpc",0,sG],124090)}];

//# sourceMappingURL=_134a56a0._.js.map