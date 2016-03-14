var Bookmarklet = (function(global) {
"use strict";
global = this;
/* ========================================================================
 * Bootstrap: collapse.js v3.1.1
 * http://getbootstrap.com/javascript/#collapse
 * ========================================================================
 * Copyright 2011-2014 Twitter, Inc.
 * Licensed under MIT (https://github.com/twbs/bootstrap/blob/master/LICENSE)
 * ======================================================================== */


window.initCollapse = function ($) {
  'use strict';

  // COLLAPSE PUBLIC CLASS DEFINITION
  // ================================

  var Collapse = function (element, options) {
    this.$element      = $(element)
    this.options       = $.extend({}, Collapse.DEFAULTS, options)
    this.transitioning = null

    if (this.options.parent) this.$parent = $(this.options.parent)
    if (this.options.toggle) this.toggle()
  }

  Collapse.VERSION  = '3.1.1'

  Collapse.DEFAULTS = {
    toggle: true
  }

  Collapse.prototype.dimension = function () {
    var hasWidth = this.$element.hasClass('width')
    return hasWidth ? 'width' : 'height'
  }

  Collapse.prototype.show = function () {
    if (this.transitioning || this.$element.hasClass('in')) return

    var startEvent = $.Event('show.bs.collapse')
    this.$element.trigger(startEvent)
    if (startEvent.isDefaultPrevented()) return

    var actives = this.$parent && this.$parent.find('> .panel > .in')

    if (actives && actives.length) {
      var hasData = actives.data('bs.collapse')
      if (hasData && hasData.transitioning) return
      Plugin.call(actives, 'hide')
      hasData || actives.data('bs.collapse', null)
    }

    var dimension = this.dimension()

    this.$element
      .removeClass('collapse')
      .addClass('collapsing')[dimension](0)

    this.transitioning = 1

    var complete = function (e) {
      if (e && e.target != this.$element[0]) {
        this.$element
          .one($.support.transition.end, $.proxy(complete, this))
        return
      }
      this.$element
        .removeClass('collapsing')
        .addClass('collapse in')[dimension]('')
      this.transitioning = 0
      this.$element
        .off($.support.transition.end + '.bs.collapse')
        .trigger('shown.bs.collapse')
    }

    if (!$.support.transition) return complete.call(this)

    var scrollSize = $.camelCase(['scroll', dimension].join('-'))

    this.$element
      .on($.support.transition.end + '.bs.collapse', $.proxy(complete, this))
      .emulateTransitionEnd(350)[dimension](this.$element[0][scrollSize])
  }

  Collapse.prototype.hide = function () {
    if (this.transitioning || !this.$element.hasClass('in')) return

    var startEvent = $.Event('hide.bs.collapse')
    this.$element.trigger(startEvent)
    if (startEvent.isDefaultPrevented()) return

    var dimension = this.dimension()

    this.$element[dimension](this.$element[dimension]())[0].offsetHeight

    this.$element
      .addClass('collapsing')
      .removeClass('collapse')
      .removeClass('in')

    this.transitioning = 1

    var complete = function (e) {
      if (e && e.target != this.$element[0]) {
        this.$element
          .one($.support.transition.end, $.proxy(complete, this))
        return
      }
      this.transitioning = 0
      this.$element
        .trigger('hidden.bs.collapse')
        .removeClass('collapsing')
        .addClass('collapse')
    }

    if (!$.support.transition) return complete.call(this)

    this.$element
      [dimension](0)
      .one($.support.transition.end, $.proxy(complete, this))
      .emulateTransitionEnd(350)
  }

  Collapse.prototype.toggle = function () {
    this[this.$element.hasClass('in') ? 'hide' : 'show']()
  }


  // COLLAPSE PLUGIN DEFINITION
  // ==========================

  function Plugin(option) {
    return this.each(function () {
      var $this   = $(this)
      var data    = $this.data('bs.collapse')
      var options = $.extend({}, Collapse.DEFAULTS, $this.data(), typeof option == 'object' && option)

      if (!data && options.toggle && option == 'show') option = !option
      if (!data) $this.data('bs.collapse', (data = new Collapse(this, options)))
      if (typeof option == 'string') data[option]()
    })
  }

  var old = $.fn.collapse

  $.fn.collapse             = Plugin
  $.fn.collapse.Constructor = Collapse


  // COLLAPSE NO CONFLICT
  // ====================

  $.fn.collapse.noConflict = function () {
    $.fn.collapse = old
    return this
  }


  // COLLAPSE DATA-API
  // =================

  $(document).on('click.bs.collapse.data-api', '[data-toggle="collapse"]', function (e) {
    var $this   = $(this), href
    var target  = $this.attr('data-target')
        || e.preventDefault()
        || (href = $this.attr('href')) && href.replace(/.*(?=#[^\s]+$)/, '') //strip for ie7
    var $target = $(target)
    var data    = $target.data('bs.collapse')
    var option  = data ? 'toggle' : $this.data()
    var parent  = $this.attr('data-parent')
    var $parent = parent && $(parent)

    if (!data || !data.transitioning) {
      if ($parent) $parent.find('[data-toggle="collapse"][data-parent="' + parent + '"]').not($this).addClass('collapsed')
      $this[$target.hasClass('in') ? 'addClass' : 'removeClass']('collapsed')
    }

    Plugin.call($target, option)
  })

};

/*!

 handlebars v1.3.0

Copyright (C) 2011 by Yehuda Katz

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in
all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
THE SOFTWARE.

@license
*/
/* exported Handlebars */
var Handlebars = (function() {
// handlebars/safe-string.js
var __module3__ = (function() {
  "use strict";
  var __exports__;
  // Build out our basic SafeString type
  function SafeString(string) {
    this.string = string;
  }

  SafeString.prototype.toString = function() {
    return "" + this.string;
  };

  __exports__ = SafeString;
  return __exports__;
})();

// handlebars/utils.js
var __module2__ = (function(__dependency1__) {
  "use strict";
  var __exports__ = {};
  /*jshint -W004 */
  var SafeString = __dependency1__;

  var escape = {
    "&": "&amp;",
    "<": "&lt;",
    ">": "&gt;",
    '"': "&quot;",
    "'": "&#x27;",
    "`": "&#x60;"
  };

  var badChars = /[&<>"'`]/g;
  var possible = /[&<>"'`]/;

  function escapeChar(chr) {
    return escape[chr] || "&amp;";
  }

  function extend(obj, value) {
    for(var key in value) {
      if(Object.prototype.hasOwnProperty.call(value, key)) {
        obj[key] = value[key];
      }
    }
  }

  __exports__.extend = extend;var toString = Object.prototype.toString;
  __exports__.toString = toString;
  // Sourced from lodash
  // https://github.com/bestiejs/lodash/blob/master/LICENSE.txt
  var isFunction = function(value) {
    return typeof value === 'function';
  };
  // fallback for older versions of Chrome and Safari
  if (isFunction(/x/)) {
    isFunction = function(value) {
      return typeof value === 'function' && toString.call(value) === '[object Function]';
    };
  }
  var isFunction;
  __exports__.isFunction = isFunction;
  var isArray = Array.isArray || function(value) {
    return (value && typeof value === 'object') ? toString.call(value) === '[object Array]' : false;
  };
  __exports__.isArray = isArray;

  function escapeExpression(string) {
    // don't escape SafeStrings, since they're already safe
    if (string instanceof SafeString) {
      return string.toString();
    } else if (!string && string !== 0) {
      return "";
    }

    // Force a string conversion as this will be done by the append regardless and
    // the regex test will do this transparently behind the scenes, causing issues if
    // an object's to string has escaped characters in it.
    string = "" + string;

    if(!possible.test(string)) { return string; }
    return string.replace(badChars, escapeChar);
  }

  __exports__.escapeExpression = escapeExpression;function isEmpty(value) {
    if (!value && value !== 0) {
      return true;
    } else if (isArray(value) && value.length === 0) {
      return true;
    } else {
      return false;
    }
  }

  __exports__.isEmpty = isEmpty;
  return __exports__;
})(__module3__);

// handlebars/exception.js
var __module4__ = (function() {
  "use strict";
  var __exports__;

  var errorProps = ['description', 'fileName', 'lineNumber', 'message', 'name', 'number', 'stack'];

  function Exception(message, node) {
    var line;
    if (node && node.firstLine) {
      line = node.firstLine;

      message += ' - ' + line + ':' + node.firstColumn;
    }

    var tmp = Error.prototype.constructor.call(this, message);

    // Unfortunately errors are not enumerable in Chrome (at least), so `for prop in tmp` doesn't work.
    for (var idx = 0; idx < errorProps.length; idx++) {
      this[errorProps[idx]] = tmp[errorProps[idx]];
    }

    if (line) {
      this.lineNumber = line;
      this.column = node.firstColumn;
    }
  }

  Exception.prototype = new Error();

  __exports__ = Exception;
  return __exports__;
})();

// handlebars/base.js
var __module1__ = (function(__dependency1__, __dependency2__) {
  "use strict";
  var __exports__ = {};
  var Utils = __dependency1__;
  var Exception = __dependency2__;

  var VERSION = "1.3.0";
  __exports__.VERSION = VERSION;var COMPILER_REVISION = 4;
  __exports__.COMPILER_REVISION = COMPILER_REVISION;
  var REVISION_CHANGES = {
    1: '<= 1.0.rc.2', // 1.0.rc.2 is actually rev2 but doesn't report it
    2: '== 1.0.0-rc.3',
    3: '== 1.0.0-rc.4',
    4: '>= 1.0.0'
  };
  __exports__.REVISION_CHANGES = REVISION_CHANGES;
  var isArray = Utils.isArray,
      isFunction = Utils.isFunction,
      toString = Utils.toString,
      objectType = '[object Object]';

  function HandlebarsEnvironment(helpers, partials) {
    this.helpers = helpers || {};
    this.partials = partials || {};

    registerDefaultHelpers(this);
  }

  __exports__.HandlebarsEnvironment = HandlebarsEnvironment;HandlebarsEnvironment.prototype = {
    constructor: HandlebarsEnvironment,

    logger: logger,
    log: log,

    registerHelper: function(name, fn, inverse) {
      if (toString.call(name) === objectType) {
        if (inverse || fn) { throw new Exception('Arg not supported with multiple helpers'); }
        Utils.extend(this.helpers, name);
      } else {
        if (inverse) { fn.not = inverse; }
        this.helpers[name] = fn;
      }
    },

    registerPartial: function(name, str) {
      if (toString.call(name) === objectType) {
        Utils.extend(this.partials,  name);
      } else {
        this.partials[name] = str;
      }
    }
  };

  function registerDefaultHelpers(instance) {
    instance.registerHelper('helperMissing', function(arg) {
      if(arguments.length === 2) {
        return undefined;
      } else {
        throw new Exception("Missing helper: '" + arg + "'");
      }
    });

    instance.registerHelper('blockHelperMissing', function(context, options) {
      var inverse = options.inverse || function() {}, fn = options.fn;

      if (isFunction(context)) { context = context.call(this); }

      if(context === true) {
        return fn(this);
      } else if(context === false || context == null) {
        return inverse(this);
      } else if (isArray(context)) {
        if(context.length > 0) {
          return instance.helpers.each(context, options);
        } else {
          return inverse(this);
        }
      } else {
        return fn(context);
      }
    });

    instance.registerHelper('each', function(context, options) {
      var fn = options.fn, inverse = options.inverse;
      var i = 0, ret = "", data;

      if (isFunction(context)) { context = context.call(this); }

      if (options.data) {
        data = createFrame(options.data);
      }

      if(context && typeof context === 'object') {
        if (isArray(context)) {
          for(var j = context.length; i<j; i++) {
            if (data) {
              data.index = i;
              data.first = (i === 0);
              data.last  = (i === (context.length-1));
            }
            ret = ret + fn(context[i], { data: data });
          }
        } else {
          for(var key in context) {
            if(context.hasOwnProperty(key)) {
              if(data) { 
                data.key = key; 
                data.index = i;
                data.first = (i === 0);
              }
              ret = ret + fn(context[key], {data: data});
              i++;
            }
          }
        }
      }

      if(i === 0){
        ret = inverse(this);
      }

      return ret;
    });

    instance.registerHelper('if', function(conditional, options) {
      if (isFunction(conditional)) { conditional = conditional.call(this); }

      // Default behavior is to render the positive path if the value is truthy and not empty.
      // The `includeZero` option may be set to treat the condtional as purely not empty based on the
      // behavior of isEmpty. Effectively this determines if 0 is handled by the positive path or negative.
      if ((!options.hash.includeZero && !conditional) || Utils.isEmpty(conditional)) {
        return options.inverse(this);
      } else {
        return options.fn(this);
      }
    });

    instance.registerHelper('unless', function(conditional, options) {
      return instance.helpers['if'].call(this, conditional, {fn: options.inverse, inverse: options.fn, hash: options.hash});
    });

    instance.registerHelper('with', function(context, options) {
      if (isFunction(context)) { context = context.call(this); }

      if (!Utils.isEmpty(context)) return options.fn(context);
    });

    instance.registerHelper('log', function(context, options) {
      var level = options.data && options.data.level != null ? parseInt(options.data.level, 10) : 1;
      instance.log(level, context);
    });
  }

  var logger = {
    methodMap: { 0: 'debug', 1: 'info', 2: 'warn', 3: 'error' },

    // State enum
    DEBUG: 0,
    INFO: 1,
    WARN: 2,
    ERROR: 3,
    level: 3,

    // can be overridden in the host environment
    log: function(level, obj) {
      if (logger.level <= level) {
        var method = logger.methodMap[level];
        if (typeof console !== 'undefined' && console[method]) {
          console[method].call(console, obj);
        }
      }
    }
  };
  __exports__.logger = logger;
  function log(level, obj) { logger.log(level, obj); }

  __exports__.log = log;var createFrame = function(object) {
    var obj = {};
    Utils.extend(obj, object);
    return obj;
  };
  __exports__.createFrame = createFrame;
  return __exports__;
})(__module2__, __module4__);

// handlebars/runtime.js
var __module5__ = (function(__dependency1__, __dependency2__, __dependency3__) {
  "use strict";
  var __exports__ = {};
  var Utils = __dependency1__;
  var Exception = __dependency2__;
  var COMPILER_REVISION = __dependency3__.COMPILER_REVISION;
  var REVISION_CHANGES = __dependency3__.REVISION_CHANGES;

  function checkRevision(compilerInfo) {
    var compilerRevision = compilerInfo && compilerInfo[0] || 1,
        currentRevision = COMPILER_REVISION;

    if (compilerRevision !== currentRevision) {
      if (compilerRevision < currentRevision) {
        var runtimeVersions = REVISION_CHANGES[currentRevision],
            compilerVersions = REVISION_CHANGES[compilerRevision];
        throw new Exception("Template was precompiled with an older version of Handlebars than the current runtime. "+
              "Please update your precompiler to a newer version ("+runtimeVersions+") or downgrade your runtime to an older version ("+compilerVersions+").");
      } else {
        // Use the embedded version info since the runtime doesn't know about this revision yet
        throw new Exception("Template was precompiled with a newer version of Handlebars than the current runtime. "+
              "Please update your runtime to a newer version ("+compilerInfo[1]+").");
      }
    }
  }

  __exports__.checkRevision = checkRevision;// TODO: Remove this line and break up compilePartial

  function template(templateSpec, env) {
    if (!env) {
      throw new Exception("No environment passed to template");
    }

    // Note: Using env.VM references rather than local var references throughout this section to allow
    // for external users to override these as psuedo-supported APIs.
    var invokePartialWrapper = function(partial, name, context, helpers, partials, data) {
      var result = env.VM.invokePartial.apply(this, arguments);
      if (result != null) { return result; }

      if (env.compile) {
        var options = { helpers: helpers, partials: partials, data: data };
        partials[name] = env.compile(partial, { data: data !== undefined }, env);
        return partials[name](context, options);
      } else {
        throw new Exception("The partial " + name + " could not be compiled when running in runtime-only mode");
      }
    };

    // Just add water
    var container = {
      escapeExpression: Utils.escapeExpression,
      invokePartial: invokePartialWrapper,
      programs: [],
      program: function(i, fn, data) {
        var programWrapper = this.programs[i];
        if(data) {
          programWrapper = program(i, fn, data);
        } else if (!programWrapper) {
          programWrapper = this.programs[i] = program(i, fn);
        }
        return programWrapper;
      },
      merge: function(param, common) {
        var ret = param || common;

        if (param && common && (param !== common)) {
          ret = {};
          Utils.extend(ret, common);
          Utils.extend(ret, param);
        }
        return ret;
      },
      programWithDepth: env.VM.programWithDepth,
      noop: env.VM.noop,
      compilerInfo: null
    };

    return function(context, options) {
      options = options || {};
      var namespace = options.partial ? options : env,
          helpers,
          partials;

      if (!options.partial) {
        helpers = options.helpers;
        partials = options.partials;
      }
      var result = templateSpec.call(
            container,
            namespace, context,
            helpers,
            partials,
            options.data);

      if (!options.partial) {
        env.VM.checkRevision(container.compilerInfo);
      }

      return result;
    };
  }

  __exports__.template = template;function programWithDepth(i, fn, data /*, $depth */) {
    var args = Array.prototype.slice.call(arguments, 3);

    var prog = function(context, options) {
      options = options || {};

      return fn.apply(this, [context, options.data || data].concat(args));
    };
    prog.program = i;
    prog.depth = args.length;
    return prog;
  }

  __exports__.programWithDepth = programWithDepth;function program(i, fn, data) {
    var prog = function(context, options) {
      options = options || {};

      return fn(context, options.data || data);
    };
    prog.program = i;
    prog.depth = 0;
    return prog;
  }

  __exports__.program = program;function invokePartial(partial, name, context, helpers, partials, data) {
    var options = { partial: true, helpers: helpers, partials: partials, data: data };

    if(partial === undefined) {
      throw new Exception("The partial " + name + " could not be found");
    } else if(partial instanceof Function) {
      return partial(context, options);
    }
  }

  __exports__.invokePartial = invokePartial;function noop() { return ""; }

  __exports__.noop = noop;
  return __exports__;
})(__module2__, __module4__, __module1__);

// handlebars.runtime.js
var __module0__ = (function(__dependency1__, __dependency2__, __dependency3__, __dependency4__, __dependency5__) {
  "use strict";
  var __exports__;
  /*globals Handlebars: true */
  var base = __dependency1__;

  // Each of these augment the Handlebars object. No need to setup here.
  // (This is done to easily share code between commonjs and browse envs)
  var SafeString = __dependency2__;
  var Exception = __dependency3__;
  var Utils = __dependency4__;
  var runtime = __dependency5__;

  // For compatibility and usage outside of module systems, make the Handlebars object a namespace
  var create = function() {
    var hb = new base.HandlebarsEnvironment();

    Utils.extend(hb, base);
    hb.SafeString = SafeString;
    hb.Exception = Exception;
    hb.Utils = Utils;

    hb.VM = runtime;
    hb.template = function(spec) {
      return runtime.template(spec, hb);
    };

    return hb;
  };

  var Handlebars = create();
  Handlebars.create = create;

  __exports__ = Handlebars;
  return __exports__;
})(__module1__, __module3__, __module4__, __module2__, __module5__);

  return __module0__;
})();

/* ========================================================================
 * Bootstrap: transition.js v3.1.1
 * http://getbootstrap.com/javascript/#transitions
 * ========================================================================
 * Copyright 2011-2014 Twitter, Inc.
 * Licensed under MIT (https://github.com/twbs/bootstrap/blob/master/LICENSE)
 * ======================================================================== */


window.initTransition = function ($) {
  'use strict';

  // CSS TRANSITION SUPPORT (Shoutout: http://www.modernizr.com/)
  // ============================================================

  function transitionEnd() {
    var el = document.createElement('bootstrap')

    var transEndEventNames = {
      WebkitTransition : 'webkitTransitionEnd',
      MozTransition    : 'transitionend',
      OTransition      : 'oTransitionEnd otransitionend',
      transition       : 'transitionend'
    }

    for (var name in transEndEventNames) {
      if (el.style[name] !== undefined) {
        return { end: transEndEventNames[name] }
      }
    }

    return false // explicit for ie8 (  ._.)
  }

  // http://blog.alexmaccaw.com/css-transitions
  $.fn.emulateTransitionEnd = function (duration) {
    var called = false, $el = this
    $(this).one($.support.transition.end, function () { called = true })
    var callback = function () { if (!called) $($el).trigger($.support.transition.end) }
    setTimeout(callback, duration)
    return this
  }

  $(function () {
    $.support.transition = transitionEnd()
  })

};

var ogp, override;

ogp = (function(ogp) {
  var $, ogPrefixRegex, ogProperties, productPrefixRegex, productProperties;
  $ = null;
  ogPrefixRegex = /(?:([\S]*):\s?)?http:\/\/ogp.me\/ns#/;
  productPrefixRegex = /(?:([\S]*):\s?)?http:\/\/ogp.me\/ns\/product\#/;
  ogProperties = ["url", "title", "image", "image:url", "image:width", "image:height", "description", "locale", "site_name"];
  productProperties = ["upc", "ean", "brand", "mfr_part_no", "size", "color", "availability", "category", "price:amount", "price:currency", "material", "pattern", "target_gender", "age_group"];
  ogp.parse = function() {
    var metas, ogData;
    $ = window.jQueryVS;
    metas = $("meta");
    ogData = {};
    $.each(metas, function(index, meta) {
      var n, p;
      meta = $(meta);
      p = meta.attr("property");
      n = meta.attr("name");
      if (ogp.validProperty(p, ogp.concatAllProperties())) {
        return ogp.setData(meta, p, ogData);
      } else if (ogp.validProperty(n, ogp.concatAllProperties())) {
        return ogp.setData(meta, n, ogData);
      }
    });
    return ogData;
  };
  ogp.setData = function(meta, property, data) {
    var key, prefixes;
    prefixes = ogp.parsePrefix(ogp.selectPrefix());
    key = property.replace(prefixes.og + ":", "").replace(prefixes.product + ":", "");
    if (data[key] && !$.isArray(data[key])) {
      data[key] = [data[key]];
    }
    if ($.isArray(data[key])) {
      data[key].push(meta.attr("content"));
    } else {
      data[key] = meta.attr("content");
    }
  };
  ogp.parsePrefix = function(prefixes) {
    var res;
    res = {
      og: "og",
      product: "og:product"
    };
    if (prefixes.length > 0) {
      $.each(prefixes, function(index, prefix) {
        var ogMatch, productMatch;
        ogMatch = prefix.value.match(ogPrefixRegex);
        productMatch = prefix.value.match(productPrefixRegex);
        if (ogMatch && ogMatch.length === 2 && ogMatch[1]) {
          res.og = ogMatch[1];
        } else if (ogMatch && prefix.name.match(/xmlns:/)) {
          res.og = prefix.name.replace(/xmlns:/, "");
        }
        if (productMatch && productMatch.length === 2 && productMatch[1]) {
          res.product = productMatch[1];
        } else if (productMatch && prefix.name.match(/xmlns:/)) {
          res.product = prefix.name.replace(/xmlns:/, "");
        } else {
          res.product = res.og + ":product";
        }
      });
    }
    return res;
  };
  ogp.selectPrefix = function() {
    var head, html, prefix;
    html = $("html");
    head = $("head");
    prefix = ogp.extractPrefix(head[0]);
    if (prefix.length === 0) {
      prefix = ogp.extractPrefix(html[0]);
    }
    return prefix;
  };
  ogp.extractPrefix = function(el) {
    var prefix;
    prefix = [];
    $.each(el.attributes, function(index, attr) {
      var p;
      p = {};
      if (attr.value.match(/ogp\.me/)) {
        p.name = attr.name;
        p.value = attr.value;
        return prefix.push(p);
      }
    });
    return prefix;
  };
  ogp.concatAllProperties = function() {
    var prefixes;
    prefixes = ogp.parsePrefix(ogp.selectPrefix());
    return $.merge(ogp.concatProperties(prefixes.og, ogProperties), ogp.concatProperties(prefixes.product, productProperties));
  };
  ogp.concatProperties = function(prefix, props) {
    var res;
    res = [];
    $.each(props, function(index, prop) {
      return res.push(prefix + ":" + prop);
    });
    return res;
  };
  ogp.validProperty = function(property, validProperties) {
    return property && $.inArray(property, validProperties) !== -1;
  };
  return ogp;
})(ogp || {});

override = (function(override) {
  var $, regions;
  $ = null;
  override.div = null;
  override.styles = '#virtusize-bookmarklet{-ms-text-size-adjust:100%;-webkit-text-size-adjust:100%;margin:0;-webkit-tap-highlight-color:transparent;font-family:"Helvetica Neue",Helvetica,Arial,sans-serif;font-size:14px;line-height:1.42857143;color:#333;background-color:#fff}#virtusize-bookmarklet article,#virtusize-bookmarklet aside,#virtusize-bookmarklet details,#virtusize-bookmarklet figcaption,#virtusize-bookmarklet figure,#virtusize-bookmarklet footer,#virtusize-bookmarklet header,#virtusize-bookmarklet hgroup,#virtusize-bookmarklet main,#virtusize-bookmarklet nav,#virtusize-bookmarklet section,#virtusize-bookmarklet summary{display:block}#virtusize-bookmarklet audio,#virtusize-bookmarklet canvas,#virtusize-bookmarklet progress,#virtusize-bookmarklet video{display:inline-block;vertical-align:baseline}#virtusize-bookmarklet audio:not([controls]){display:none;height:0}#virtusize-bookmarklet [hidden],#virtusize-bookmarklet template{display:none}#virtusize-bookmarklet a{background:0 0;color:#428bca;text-decoration:none}#virtusize-bookmarklet a:active,#virtusize-bookmarklet a:hover{outline:0}#virtusize-bookmarklet b,#virtusize-bookmarklet optgroup,#virtusize-bookmarklet strong{font-weight:700}#virtusize-bookmarklet dfn{font-style:italic}#virtusize-bookmarklet h1{margin:.67em 0}#virtusize-bookmarklet mark{background:#ff0;color:#000}#virtusize-bookmarklet sub,#virtusize-bookmarklet sup{font-size:75%;line-height:0;position:relative;vertical-align:baseline}#virtusize-bookmarklet sup{top:-.5em}#virtusize-bookmarklet sub{bottom:-.25em}#virtusize-bookmarklet img{border:0;vertical-align:middle}#virtusize-bookmarklet svg:not(:root){overflow:hidden}#virtusize-bookmarklet hr{-moz-box-sizing:content-box;box-sizing:content-box;height:0}#virtusize-bookmarklet pre,#virtusize-bookmarklet textarea{overflow:auto}#virtusize-bookmarklet code,#virtusize-bookmarklet kbd,#virtusize-bookmarklet pre,#virtusize-bookmarklet samp{font-size:1em}#virtusize-bookmarklet button,#virtusize-bookmarklet input,#virtusize-bookmarklet optgroup,#virtusize-bookmarklet select,#virtusize-bookmarklet textarea{color:inherit;font:inherit;margin:0}#virtusize-bookmarklet button{overflow:visible}#virtusize-bookmarklet button,#virtusize-bookmarklet select{text-transform:none}#virtusize-bookmarklet button,#virtusize-bookmarklet html input[type=button],#virtusize-bookmarklet input[type=reset],#virtusize-bookmarklet input[type=submit]{-webkit-appearance:button;cursor:pointer}#virtusize-bookmarklet button[disabled],#virtusize-bookmarklet html input[disabled]{cursor:default}#virtusize-bookmarklet button::-moz-focus-inner,#virtusize-bookmarklet input::-moz-focus-inner{border:0;padding:0}#virtusize-bookmarklet input[type=checkbox],#virtusize-bookmarklet input[type=radio]{box-sizing:border-box;padding:0}#virtusize-bookmarklet input[type=number]::-webkit-inner-spin-button,#virtusize-bookmarklet input[type=number]::-webkit-outer-spin-button{height:auto}#virtusize-bookmarklet input[type=search]::-webkit-search-cancel-button,#virtusize-bookmarklet input[type=search]::-webkit-search-decoration{-webkit-appearance:none}#virtusize-bookmarklet td,#virtusize-bookmarklet th{padding:0}#virtusize-bookmarklet *,#virtusize-bookmarklet :after,#virtusize-bookmarklet :before{-webkit-box-sizing:border-box;-moz-box-sizing:border-box;box-sizing:border-box}#virtusize-bookmarklet button,#virtusize-bookmarklet input,#virtusize-bookmarklet select,#virtusize-bookmarklet textarea{font-family:inherit;font-size:inherit;line-height:inherit}#virtusize-bookmarklet a:focus,#virtusize-bookmarklet a:hover{color:#2a6496;text-decoration:underline}#virtusize-bookmarklet a:focus{outline:dotted thin;outline:-webkit-focus-ring-color auto 5px;outline-offset:-2px}#virtusize-bookmarklet figure{margin:0}#virtusize-bookmarklet .img-responsive{display:block;max-width:100%;height:auto}#virtusize-bookmarklet .img-rounded{border-radius:6px}#virtusize-bookmarklet .img-thumbnail{padding:4px;line-height:1.42857143;background-color:#fff;border:1px solid #ddd;border-radius:4px;-webkit-transition:all .2s ease-in-out;-o-transition:all .2s ease-in-out;transition:all .2s ease-in-out;display:inline-block;max-width:100%;height:auto}#virtusize-bookmarklet .img-circle{border-radius:50%}#virtusize-bookmarklet hr{margin-top:20px;margin-bottom:20px;border:0;border-top:1px solid #eee}#virtusize-bookmarklet .sr-only{position:absolute;width:1px;height:1px;margin:-1px;padding:0;overflow:hidden;clip:rect(0,0,0,0);border:0}#virtusize-bookmarklet .sr-only-focusable:active,#virtusize-bookmarklet .sr-only-focusable:focus{position:static;width:auto;height:auto;margin:0;overflow:visible;clip:auto}#virtusize-bookmarklet .h1,#virtusize-bookmarklet .h2,#virtusize-bookmarklet .h3,#virtusize-bookmarklet .h4,#virtusize-bookmarklet .h5,#virtusize-bookmarklet .h6,#virtusize-bookmarklet h1,#virtusize-bookmarklet h2,#virtusize-bookmarklet h3,#virtusize-bookmarklet h4,#virtusize-bookmarklet h5,#virtusize-bookmarklet h6{font-family:inherit;font-weight:500;line-height:1.1;color:inherit}#virtusize-bookmarklet .h1 .small,#virtusize-bookmarklet .h1 small,#virtusize-bookmarklet .h2 .small,#virtusize-bookmarklet .h2 small,#virtusize-bookmarklet .h3 .small,#virtusize-bookmarklet .h3 small,#virtusize-bookmarklet .h4 .small,#virtusize-bookmarklet .h4 small,#virtusize-bookmarklet .h5 .small,#virtusize-bookmarklet .h5 small,#virtusize-bookmarklet .h6 .small,#virtusize-bookmarklet .h6 small,#virtusize-bookmarklet h1 .small,#virtusize-bookmarklet h1 small,#virtusize-bookmarklet h2 .small,#virtusize-bookmarklet h2 small,#virtusize-bookmarklet h3 .small,#virtusize-bookmarklet h3 small,#virtusize-bookmarklet h4 .small,#virtusize-bookmarklet h4 small,#virtusize-bookmarklet h5 .small,#virtusize-bookmarklet h5 small,#virtusize-bookmarklet h6 .small,#virtusize-bookmarklet h6 small{font-weight:400;line-height:1;color:#999}#virtusize-bookmarklet .h1,#virtusize-bookmarklet .h2,#virtusize-bookmarklet .h3,#virtusize-bookmarklet h1,#virtusize-bookmarklet h2,#virtusize-bookmarklet h3{margin-top:20px;margin-bottom:10px}#virtusize-bookmarklet .h1 .small,#virtusize-bookmarklet .h1 small,#virtusize-bookmarklet .h2 .small,#virtusize-bookmarklet .h2 small,#virtusize-bookmarklet .h3 .small,#virtusize-bookmarklet .h3 small,#virtusize-bookmarklet h1 .small,#virtusize-bookmarklet h1 small,#virtusize-bookmarklet h2 .small,#virtusize-bookmarklet h2 small,#virtusize-bookmarklet h3 .small,#virtusize-bookmarklet h3 small{font-size:65%}#virtusize-bookmarklet .h4,#virtusize-bookmarklet .h5,#virtusize-bookmarklet .h6,#virtusize-bookmarklet h4,#virtusize-bookmarklet h5,#virtusize-bookmarklet h6{margin-top:10px;margin-bottom:10px}#virtusize-bookmarklet .h4 .small,#virtusize-bookmarklet .h4 small,#virtusize-bookmarklet .h5 .small,#virtusize-bookmarklet .h5 small,#virtusize-bookmarklet .h6 .small,#virtusize-bookmarklet .h6 small,#virtusize-bookmarklet h4 .small,#virtusize-bookmarklet h4 small,#virtusize-bookmarklet h5 .small,#virtusize-bookmarklet h5 small,#virtusize-bookmarklet h6 .small,#virtusize-bookmarklet h6 small{font-size:75%}#virtusize-bookmarklet .h1,#virtusize-bookmarklet h1{font-size:36px}#virtusize-bookmarklet .h2,#virtusize-bookmarklet h2{font-size:30px}#virtusize-bookmarklet .h3,#virtusize-bookmarklet h3{font-size:24px}#virtusize-bookmarklet .h4,#virtusize-bookmarklet h4{font-size:18px}#virtusize-bookmarklet .h5,#virtusize-bookmarklet h5{font-size:14px}#virtusize-bookmarklet .h6,#virtusize-bookmarklet h6{font-size:12px}#virtusize-bookmarklet p{margin:0 0 10px}#virtusize-bookmarklet .lead{margin-bottom:20px;font-size:16px;font-weight:300;line-height:1.4}@media (min-width:768px){#virtusize-bookmarklet .lead{font-size:21px}}#virtusize-bookmarklet .small,#virtusize-bookmarklet small{font-size:85%}#virtusize-bookmarklet cite{font-style:normal}#virtusize-bookmarklet .mark,#virtusize-bookmarklet mark{background-color:#fcf8e3;padding:.2em}#virtusize-bookmarklet .text-left{text-align:left}#virtusize-bookmarklet .text-right{text-align:right}#virtusize-bookmarklet .text-center{text-align:center}#virtusize-bookmarklet .text-justify{text-align:justify}#virtusize-bookmarklet .text-muted{color:#999}#virtusize-bookmarklet .text-primary{color:#428bca}a#virtusize-bookmarklet .text-primary:hover{color:#3071a9}#virtusize-bookmarklet .text-success{color:#3c763d}a#virtusize-bookmarklet .text-success:hover{color:#2b542c}#virtusize-bookmarklet .text-info{color:#31708f}a#virtusize-bookmarklet .text-info:hover{color:#245269}#virtusize-bookmarklet .text-warning{color:#8a6d3b}a#virtusize-bookmarklet .text-warning:hover{color:#66512c}#virtusize-bookmarklet .text-danger{color:#a94442}a#virtusize-bookmarklet .text-danger:hover{color:#843534}#virtusize-bookmarklet .bg-primary{color:#fff;background-color:#428bca}a#virtusize-bookmarklet .bg-primary:hover{background-color:#3071a9}#virtusize-bookmarklet .bg-success{background-color:#dff0d8}a#virtusize-bookmarklet .bg-success:hover{background-color:#c1e2b3}#virtusize-bookmarklet .bg-info{background-color:#d9edf7}a#virtusize-bookmarklet .bg-info:hover{background-color:#afd9ee}#virtusize-bookmarklet .bg-warning{background-color:#fcf8e3}a#virtusize-bookmarklet .bg-warning:hover{background-color:#f7ecb5}#virtusize-bookmarklet .bg-danger{background-color:#f2dede}a#virtusize-bookmarklet .bg-danger:hover{background-color:#e4b9b9}#virtusize-bookmarklet .page-header{padding-bottom:9px;margin:40px 0 20px;border-bottom:1px solid #eee}#virtusize-bookmarklet blockquote ol:last-child,#virtusize-bookmarklet blockquote p:last-child,#virtusize-bookmarklet blockquote ul:last-child,#virtusize-bookmarklet ol ol,#virtusize-bookmarklet ol ul,#virtusize-bookmarklet ul ol,#virtusize-bookmarklet ul ul{margin-bottom:0}#virtusize-bookmarklet ol,#virtusize-bookmarklet ul{margin-top:0;margin-bottom:10px}#virtusize-bookmarklet .list-unstyled{padding-left:0;list-style:none}#virtusize-bookmarklet .list-inline{padding-left:0;list-style:none;margin-left:-5px}#virtusize-bookmarklet .list-inline>li{display:inline-block;padding-left:5px;padding-right:5px}#virtusize-bookmarklet dl{margin-top:0;margin-bottom:20px}#virtusize-bookmarklet dd,#virtusize-bookmarklet dt{line-height:1.42857143}#virtusize-bookmarklet dt{font-weight:700}#virtusize-bookmarklet dd{margin-left:0}@media (min-width:768px){#virtusize-bookmarklet .dl-horizontal dt{float:left;width:160px;clear:left;text-align:right;overflow:hidden;text-overflow:ellipsis;white-space:nowrap}#virtusize-bookmarklet .dl-horizontal dd{margin-left:180px}#virtusize-bookmarklet .container{width:750px}}#virtusize-bookmarklet abbr[data-original-title],#virtusize-bookmarklet abbr[title]{cursor:help;border-bottom:1px dotted #999}#virtusize-bookmarklet .initialism{font-size:90%;text-transform:uppercase}#virtusize-bookmarklet blockquote{padding:10px 20px;margin:0 0 20px;font-size:17.5px;border-left:5px solid #eee}#virtusize-bookmarklet blockquote .small,#virtusize-bookmarklet blockquote footer,#virtusize-bookmarklet blockquote small{display:block;font-size:80%;line-height:1.42857143;color:#999}#virtusize-bookmarklet blockquote .small:before,#virtusize-bookmarklet blockquote footer:before,#virtusize-bookmarklet blockquote small:before{content:"\\2014 \\00A0"}#virtusize-bookmarklet .blockquote-reverse,#virtusize-bookmarklet blockquote.pull-right{padding-right:15px;padding-left:0;border-right:5px solid #eee;border-left:0;text-align:right}#virtusize-bookmarklet .blockquote-reverse .small:before,#virtusize-bookmarklet .blockquote-reverse footer:before,#virtusize-bookmarklet .blockquote-reverse small:before,#virtusize-bookmarklet blockquote.pull-right .small:before,#virtusize-bookmarklet blockquote.pull-right footer:before,#virtusize-bookmarklet blockquote.pull-right small:before{content:""}#virtusize-bookmarklet .blockquote-reverse .small:after,#virtusize-bookmarklet .blockquote-reverse footer:after,#virtusize-bookmarklet .blockquote-reverse small:after,#virtusize-bookmarklet blockquote.pull-right .small:after,#virtusize-bookmarklet blockquote.pull-right footer:after,#virtusize-bookmarklet blockquote.pull-right small:after{content:"\\00A0 \\2014"}#virtusize-bookmarklet blockquote:after,#virtusize-bookmarklet blockquote:before{content:""}#virtusize-bookmarklet address{margin-bottom:20px;font-style:normal;line-height:1.42857143}#virtusize-bookmarklet code,#virtusize-bookmarklet kbd,#virtusize-bookmarklet pre,#virtusize-bookmarklet samp{font-family:Menlo,Monaco,Consolas,"Courier New",monospace}#virtusize-bookmarklet code{padding:2px 4px;font-size:90%;color:#c7254e;background-color:#f9f2f4;border-radius:4px}#virtusize-bookmarklet kbd{padding:2px 4px;font-size:90%;color:#fff;background-color:#333;border-radius:3px;box-shadow:inset 0 -1px 0 rgba(0,0,0,.25)}#virtusize-bookmarklet pre{display:block;padding:9.5px;margin:0 0 10px;font-size:13px;line-height:1.42857143;word-break:break-all;word-wrap:break-word;color:#333;background-color:#f5f5f5;border:1px solid #ccc;border-radius:4px}#virtusize-bookmarklet .container,#virtusize-bookmarklet .container-fluid{margin-right:auto;margin-left:auto;padding-left:15px;padding-right:15px}#virtusize-bookmarklet pre code{padding:0;font-size:inherit;color:inherit;white-space:pre-wrap;background-color:transparent;border-radius:0}#virtusize-bookmarklet .pre-scrollable{max-height:340px;overflow-y:scroll}@media (min-width:992px){#virtusize-bookmarklet .container{width:970px}}@media (min-width:1200px){#virtusize-bookmarklet .container{width:1170px}}#virtusize-bookmarklet .row{margin-left:-15px;margin-right:-15px}#virtusize-bookmarklet .col-xs-1,.col-lg-1,.col-lg-10,.col-lg-11,.col-lg-12,.col-lg-2,.col-lg-3,.col-lg-4,.col-lg-5,.col-lg-6,.col-lg-7,.col-lg-8,.col-lg-9,.col-md-1,.col-md-10,.col-md-11,.col-md-12,.col-md-2,.col-md-3,.col-md-4,.col-md-5,.col-md-6,.col-md-7,.col-md-8,.col-md-9,.col-sm-1,.col-sm-10,.col-sm-11,.col-sm-12,.col-sm-2,.col-sm-3,.col-sm-4,.col-sm-5,.col-sm-6,.col-sm-7,.col-sm-8,.col-sm-9,.col-xs-10,.col-xs-11,.col-xs-12,.col-xs-2,.col-xs-3,.col-xs-4,.col-xs-5,.col-xs-6,.col-xs-7,.col-xs-8,.col-xs-9{position:relative;min-height:1px;padding-left:15px;padding-right:15px}#virtusize-bookmarklet .col-xs-1,.col-xs-10,.col-xs-11,.col-xs-12,.col-xs-2,.col-xs-3,.col-xs-4,.col-xs-5,.col-xs-6,.col-xs-7,.col-xs-8,.col-xs-9{float:left}#virtusize-bookmarklet .col-xs-12{width:100%}#virtusize-bookmarklet .col-xs-11{width:91.66666667%}#virtusize-bookmarklet .col-xs-10{width:83.33333333%}#virtusize-bookmarklet .col-xs-9{width:75%}#virtusize-bookmarklet .col-xs-8{width:66.66666667%}#virtusize-bookmarklet .col-xs-7{width:58.33333333%}#virtusize-bookmarklet .col-xs-6{width:50%}#virtusize-bookmarklet .col-xs-5{width:41.66666667%}#virtusize-bookmarklet .col-xs-4{width:33.33333333%}#virtusize-bookmarklet .col-xs-3{width:25%}#virtusize-bookmarklet .col-xs-2{width:16.66666667%}#virtusize-bookmarklet .col-xs-1{width:8.33333333%}#virtusize-bookmarklet .col-xs-pull-12{right:100%}#virtusize-bookmarklet .col-xs-pull-11{right:91.66666667%}#virtusize-bookmarklet .col-xs-pull-10{right:83.33333333%}#virtusize-bookmarklet .col-xs-pull-9{right:75%}#virtusize-bookmarklet .col-xs-pull-8{right:66.66666667%}#virtusize-bookmarklet .col-xs-pull-7{right:58.33333333%}#virtusize-bookmarklet .col-xs-pull-6{right:50%}#virtusize-bookmarklet .col-xs-pull-5{right:41.66666667%}#virtusize-bookmarklet .col-xs-pull-4{right:33.33333333%}#virtusize-bookmarklet .col-xs-pull-3{right:25%}#virtusize-bookmarklet .col-xs-pull-2{right:16.66666667%}#virtusize-bookmarklet .col-xs-pull-1{right:8.33333333%}#virtusize-bookmarklet .col-xs-pull-0{right:auto}#virtusize-bookmarklet .col-xs-push-12{left:100%}#virtusize-bookmarklet .col-xs-push-11{left:91.66666667%}#virtusize-bookmarklet .col-xs-push-10{left:83.33333333%}#virtusize-bookmarklet .col-xs-push-9{left:75%}#virtusize-bookmarklet .col-xs-push-8{left:66.66666667%}#virtusize-bookmarklet .col-xs-push-7{left:58.33333333%}#virtusize-bookmarklet .col-xs-push-6{left:50%}#virtusize-bookmarklet .col-xs-push-5{left:41.66666667%}#virtusize-bookmarklet .col-xs-push-4{left:33.33333333%}#virtusize-bookmarklet .col-xs-push-3{left:25%}#virtusize-bookmarklet .col-xs-push-2{left:16.66666667%}#virtusize-bookmarklet .col-xs-push-1{left:8.33333333%}#virtusize-bookmarklet .col-xs-push-0{left:auto}#virtusize-bookmarklet .col-xs-offset-12{margin-left:100%}#virtusize-bookmarklet .col-xs-offset-11{margin-left:91.66666667%}#virtusize-bookmarklet .col-xs-offset-10{margin-left:83.33333333%}#virtusize-bookmarklet .col-xs-offset-9{margin-left:75%}#virtusize-bookmarklet .col-xs-offset-8{margin-left:66.66666667%}#virtusize-bookmarklet .col-xs-offset-7{margin-left:58.33333333%}#virtusize-bookmarklet .col-xs-offset-6{margin-left:50%}#virtusize-bookmarklet .col-xs-offset-5{margin-left:41.66666667%}#virtusize-bookmarklet .col-xs-offset-4{margin-left:33.33333333%}#virtusize-bookmarklet .col-xs-offset-3{margin-left:25%}#virtusize-bookmarklet .col-xs-offset-2{margin-left:16.66666667%}#virtusize-bookmarklet .col-xs-offset-1{margin-left:8.33333333%}#virtusize-bookmarklet .col-xs-offset-0{margin-left:0}@media (min-width:768px){#virtusize-bookmarklet .col-sm-1,.col-sm-10,.col-sm-11,.col-sm-12,.col-sm-2,.col-sm-3,.col-sm-4,.col-sm-5,.col-sm-6,.col-sm-7,.col-sm-8,.col-sm-9{float:left}#virtusize-bookmarklet .col-sm-12{width:100%}#virtusize-bookmarklet .col-sm-11{width:91.66666667%}#virtusize-bookmarklet .col-sm-10{width:83.33333333%}#virtusize-bookmarklet .col-sm-9{width:75%}#virtusize-bookmarklet .col-sm-8{width:66.66666667%}#virtusize-bookmarklet .col-sm-7{width:58.33333333%}#virtusize-bookmarklet .col-sm-6{width:50%}#virtusize-bookmarklet .col-sm-5{width:41.66666667%}#virtusize-bookmarklet .col-sm-4{width:33.33333333%}#virtusize-bookmarklet .col-sm-3{width:25%}#virtusize-bookmarklet .col-sm-2{width:16.66666667%}#virtusize-bookmarklet .col-sm-1{width:8.33333333%}#virtusize-bookmarklet .col-sm-pull-12{right:100%}#virtusize-bookmarklet .col-sm-pull-11{right:91.66666667%}#virtusize-bookmarklet .col-sm-pull-10{right:83.33333333%}#virtusize-bookmarklet .col-sm-pull-9{right:75%}#virtusize-bookmarklet .col-sm-pull-8{right:66.66666667%}#virtusize-bookmarklet .col-sm-pull-7{right:58.33333333%}#virtusize-bookmarklet .col-sm-pull-6{right:50%}#virtusize-bookmarklet .col-sm-pull-5{right:41.66666667%}#virtusize-bookmarklet .col-sm-pull-4{right:33.33333333%}#virtusize-bookmarklet .col-sm-pull-3{right:25%}#virtusize-bookmarklet .col-sm-pull-2{right:16.66666667%}#virtusize-bookmarklet .col-sm-pull-1{right:8.33333333%}#virtusize-bookmarklet .col-sm-pull-0{right:auto}#virtusize-bookmarklet .col-sm-push-12{left:100%}#virtusize-bookmarklet .col-sm-push-11{left:91.66666667%}#virtusize-bookmarklet .col-sm-push-10{left:83.33333333%}#virtusize-bookmarklet .col-sm-push-9{left:75%}#virtusize-bookmarklet .col-sm-push-8{left:66.66666667%}#virtusize-bookmarklet .col-sm-push-7{left:58.33333333%}#virtusize-bookmarklet .col-sm-push-6{left:50%}#virtusize-bookmarklet .col-sm-push-5{left:41.66666667%}#virtusize-bookmarklet .col-sm-push-4{left:33.33333333%}#virtusize-bookmarklet .col-sm-push-3{left:25%}#virtusize-bookmarklet .col-sm-push-2{left:16.66666667%}#virtusize-bookmarklet .col-sm-push-1{left:8.33333333%}#virtusize-bookmarklet .col-sm-push-0{left:auto}#virtusize-bookmarklet .col-sm-offset-12{margin-left:100%}#virtusize-bookmarklet .col-sm-offset-11{margin-left:91.66666667%}#virtusize-bookmarklet .col-sm-offset-10{margin-left:83.33333333%}#virtusize-bookmarklet .col-sm-offset-9{margin-left:75%}#virtusize-bookmarklet .col-sm-offset-8{margin-left:66.66666667%}#virtusize-bookmarklet .col-sm-offset-7{margin-left:58.33333333%}#virtusize-bookmarklet .col-sm-offset-6{margin-left:50%}#virtusize-bookmarklet .col-sm-offset-5{margin-left:41.66666667%}#virtusize-bookmarklet .col-sm-offset-4{margin-left:33.33333333%}#virtusize-bookmarklet .col-sm-offset-3{margin-left:25%}#virtusize-bookmarklet .col-sm-offset-2{margin-left:16.66666667%}#virtusize-bookmarklet .col-sm-offset-1{margin-left:8.33333333%}#virtusize-bookmarklet .col-sm-offset-0{margin-left:0}}@media (min-width:992px){#virtusize-bookmarklet .col-md-1,.col-md-10,.col-md-11,.col-md-12,.col-md-2,.col-md-3,.col-md-4,.col-md-5,.col-md-6,.col-md-7,.col-md-8,.col-md-9{float:left}#virtusize-bookmarklet .col-md-12{width:100%}#virtusize-bookmarklet .col-md-11{width:91.66666667%}#virtusize-bookmarklet .col-md-10{width:83.33333333%}#virtusize-bookmarklet .col-md-9{width:75%}#virtusize-bookmarklet .col-md-8{width:66.66666667%}#virtusize-bookmarklet .col-md-7{width:58.33333333%}#virtusize-bookmarklet .col-md-6{width:50%}#virtusize-bookmarklet .col-md-5{width:41.66666667%}#virtusize-bookmarklet .col-md-4{width:33.33333333%}#virtusize-bookmarklet .col-md-3{width:25%}#virtusize-bookmarklet .col-md-2{width:16.66666667%}#virtusize-bookmarklet .col-md-1{width:8.33333333%}#virtusize-bookmarklet .col-md-pull-12{right:100%}#virtusize-bookmarklet .col-md-pull-11{right:91.66666667%}#virtusize-bookmarklet .col-md-pull-10{right:83.33333333%}#virtusize-bookmarklet .col-md-pull-9{right:75%}#virtusize-bookmarklet .col-md-pull-8{right:66.66666667%}#virtusize-bookmarklet .col-md-pull-7{right:58.33333333%}#virtusize-bookmarklet .col-md-pull-6{right:50%}#virtusize-bookmarklet .col-md-pull-5{right:41.66666667%}#virtusize-bookmarklet .col-md-pull-4{right:33.33333333%}#virtusize-bookmarklet .col-md-pull-3{right:25%}#virtusize-bookmarklet .col-md-pull-2{right:16.66666667%}#virtusize-bookmarklet .col-md-pull-1{right:8.33333333%}#virtusize-bookmarklet .col-md-pull-0{right:auto}#virtusize-bookmarklet .col-md-push-12{left:100%}#virtusize-bookmarklet .col-md-push-11{left:91.66666667%}#virtusize-bookmarklet .col-md-push-10{left:83.33333333%}#virtusize-bookmarklet .col-md-push-9{left:75%}#virtusize-bookmarklet .col-md-push-8{left:66.66666667%}#virtusize-bookmarklet .col-md-push-7{left:58.33333333%}#virtusize-bookmarklet .col-md-push-6{left:50%}#virtusize-bookmarklet .col-md-push-5{left:41.66666667%}#virtusize-bookmarklet .col-md-push-4{left:33.33333333%}#virtusize-bookmarklet .col-md-push-3{left:25%}#virtusize-bookmarklet .col-md-push-2{left:16.66666667%}#virtusize-bookmarklet .col-md-push-1{left:8.33333333%}#virtusize-bookmarklet .col-md-push-0{left:auto}#virtusize-bookmarklet .col-md-offset-12{margin-left:100%}#virtusize-bookmarklet .col-md-offset-11{margin-left:91.66666667%}#virtusize-bookmarklet .col-md-offset-10{margin-left:83.33333333%}#virtusize-bookmarklet .col-md-offset-9{margin-left:75%}#virtusize-bookmarklet .col-md-offset-8{margin-left:66.66666667%}#virtusize-bookmarklet .col-md-offset-7{margin-left:58.33333333%}#virtusize-bookmarklet .col-md-offset-6{margin-left:50%}#virtusize-bookmarklet .col-md-offset-5{margin-left:41.66666667%}#virtusize-bookmarklet .col-md-offset-4{margin-left:33.33333333%}#virtusize-bookmarklet .col-md-offset-3{margin-left:25%}#virtusize-bookmarklet .col-md-offset-2{margin-left:16.66666667%}#virtusize-bookmarklet .col-md-offset-1{margin-left:8.33333333%}#virtusize-bookmarklet .col-md-offset-0{margin-left:0}}@media (min-width:1200px){#virtusize-bookmarklet .col-lg-1,.col-lg-10,.col-lg-11,.col-lg-12,.col-lg-2,.col-lg-3,.col-lg-4,.col-lg-5,.col-lg-6,.col-lg-7,.col-lg-8,.col-lg-9{float:left}#virtusize-bookmarklet .col-lg-12{width:100%}#virtusize-bookmarklet .col-lg-11{width:91.66666667%}#virtusize-bookmarklet .col-lg-10{width:83.33333333%}#virtusize-bookmarklet .col-lg-9{width:75%}#virtusize-bookmarklet .col-lg-8{width:66.66666667%}#virtusize-bookmarklet .col-lg-7{width:58.33333333%}#virtusize-bookmarklet .col-lg-6{width:50%}#virtusize-bookmarklet .col-lg-5{width:41.66666667%}#virtusize-bookmarklet .col-lg-4{width:33.33333333%}#virtusize-bookmarklet .col-lg-3{width:25%}#virtusize-bookmarklet .col-lg-2{width:16.66666667%}#virtusize-bookmarklet .col-lg-1{width:8.33333333%}#virtusize-bookmarklet .col-lg-pull-12{right:100%}#virtusize-bookmarklet .col-lg-pull-11{right:91.66666667%}#virtusize-bookmarklet .col-lg-pull-10{right:83.33333333%}#virtusize-bookmarklet .col-lg-pull-9{right:75%}#virtusize-bookmarklet .col-lg-pull-8{right:66.66666667%}#virtusize-bookmarklet .col-lg-pull-7{right:58.33333333%}#virtusize-bookmarklet .col-lg-pull-6{right:50%}#virtusize-bookmarklet .col-lg-pull-5{right:41.66666667%}#virtusize-bookmarklet .col-lg-pull-4{right:33.33333333%}#virtusize-bookmarklet .col-lg-pull-3{right:25%}#virtusize-bookmarklet .col-lg-pull-2{right:16.66666667%}#virtusize-bookmarklet .col-lg-pull-1{right:8.33333333%}#virtusize-bookmarklet .col-lg-pull-0{right:auto}#virtusize-bookmarklet .col-lg-push-12{left:100%}#virtusize-bookmarklet .col-lg-push-11{left:91.66666667%}#virtusize-bookmarklet .col-lg-push-10{left:83.33333333%}#virtusize-bookmarklet .col-lg-push-9{left:75%}#virtusize-bookmarklet .col-lg-push-8{left:66.66666667%}#virtusize-bookmarklet .col-lg-push-7{left:58.33333333%}#virtusize-bookmarklet .col-lg-push-6{left:50%}#virtusize-bookmarklet .col-lg-push-5{left:41.66666667%}#virtusize-bookmarklet .col-lg-push-4{left:33.33333333%}#virtusize-bookmarklet .col-lg-push-3{left:25%}#virtusize-bookmarklet .col-lg-push-2{left:16.66666667%}#virtusize-bookmarklet .col-lg-push-1{left:8.33333333%}#virtusize-bookmarklet .col-lg-push-0{left:auto}#virtusize-bookmarklet .col-lg-offset-12{margin-left:100%}#virtusize-bookmarklet .col-lg-offset-11{margin-left:91.66666667%}#virtusize-bookmarklet .col-lg-offset-10{margin-left:83.33333333%}#virtusize-bookmarklet .col-lg-offset-9{margin-left:75%}#virtusize-bookmarklet .col-lg-offset-8{margin-left:66.66666667%}#virtusize-bookmarklet .col-lg-offset-7{margin-left:58.33333333%}#virtusize-bookmarklet .col-lg-offset-6{margin-left:50%}#virtusize-bookmarklet .col-lg-offset-5{margin-left:41.66666667%}#virtusize-bookmarklet .col-lg-offset-4{margin-left:33.33333333%}#virtusize-bookmarklet .col-lg-offset-3{margin-left:25%}#virtusize-bookmarklet .col-lg-offset-2{margin-left:16.66666667%}#virtusize-bookmarklet .col-lg-offset-1{margin-left:8.33333333%}#virtusize-bookmarklet .col-lg-offset-0{margin-left:0}}#virtusize-bookmarklet table{border-collapse:collapse;border-spacing:0;max-width:100%;background-color:transparent}#virtusize-bookmarklet th{text-align:left}#virtusize-bookmarklet .table{width:100%;margin-bottom:20px}#virtusize-bookmarklet .table>tbody>tr>td,#virtusize-bookmarklet .table>tbody>tr>th,#virtusize-bookmarklet .table>tfoot>tr>td,#virtusize-bookmarklet .table>tfoot>tr>th,#virtusize-bookmarklet .table>thead>tr>td,#virtusize-bookmarklet .table>thead>tr>th{padding:8px;line-height:1.42857143;vertical-align:top;border-top:1px solid #ddd}#virtusize-bookmarklet .table>thead>tr>th{vertical-align:bottom;border-bottom:2px solid #ddd}#virtusize-bookmarklet .table>caption+thead>tr:first-child>td,#virtusize-bookmarklet .table>caption+thead>tr:first-child>th,#virtusize-bookmarklet .table>colgroup+thead>tr:first-child>td,#virtusize-bookmarklet .table>colgroup+thead>tr:first-child>th,#virtusize-bookmarklet .table>thead:first-child>tr:first-child>td,#virtusize-bookmarklet .table>thead:first-child>tr:first-child>th{border-top:0}#virtusize-bookmarklet .table>tbody+tbody{border-top:2px solid #ddd}#virtusize-bookmarklet .table .table{background-color:#fff}#virtusize-bookmarklet .table-condensed>tbody>tr>td,#virtusize-bookmarklet .table-condensed>tbody>tr>th,#virtusize-bookmarklet .table-condensed>tfoot>tr>td,#virtusize-bookmarklet .table-condensed>tfoot>tr>th,#virtusize-bookmarklet .table-condensed>thead>tr>td,#virtusize-bookmarklet .table-condensed>thead>tr>th{padding:5px}#virtusize-bookmarklet .table-bordered,#virtusize-bookmarklet .table-bordered>tbody>tr>td,#virtusize-bookmarklet .table-bordered>tbody>tr>th,#virtusize-bookmarklet .table-bordered>tfoot>tr>td,#virtusize-bookmarklet .table-bordered>tfoot>tr>th,#virtusize-bookmarklet .table-bordered>thead>tr>td,#virtusize-bookmarklet .table-bordered>thead>tr>th{border:1px solid #ddd}#virtusize-bookmarklet .table-bordered>thead>tr>td,#virtusize-bookmarklet .table-bordered>thead>tr>th{border-bottom-width:2px}#virtusize-bookmarklet .table-striped>tbody>tr:nth-child(odd)>td,#virtusize-bookmarklet .table-striped>tbody>tr:nth-child(odd)>th{background-color:#f9f9f9}#virtusize-bookmarklet .table-hover>tbody>tr:hover>td,#virtusize-bookmarklet .table-hover>tbody>tr:hover>th,#virtusize-bookmarklet .table>tbody>tr.active>td,#virtusize-bookmarklet .table>tbody>tr.active>th,#virtusize-bookmarklet .table>tbody>tr>td.active,#virtusize-bookmarklet .table>tbody>tr>th.active,#virtusize-bookmarklet .table>tfoot>tr.active>td,#virtusize-bookmarklet .table>tfoot>tr.active>th,#virtusize-bookmarklet .table>tfoot>tr>td.active,#virtusize-bookmarklet .table>tfoot>tr>th.active,#virtusize-bookmarklet .table>thead>tr.active>td,#virtusize-bookmarklet .table>thead>tr.active>th,#virtusize-bookmarklet .table>thead>tr>td.active,#virtusize-bookmarklet .table>thead>tr>th.active{background-color:#f5f5f5}#virtusize-bookmarklet table col[class*=col-]{position:static;float:none;display:table-column}#virtusize-bookmarklet table td[class*=col-],#virtusize-bookmarklet table th[class*=col-]{position:static;float:none;display:table-cell}#virtusize-bookmarklet .table-hover>tbody>tr.active:hover>td,#virtusize-bookmarklet .table-hover>tbody>tr.active:hover>th,#virtusize-bookmarklet .table-hover>tbody>tr:hover>.active,#virtusize-bookmarklet .table-hover>tbody>tr>td.active:hover,#virtusize-bookmarklet .table-hover>tbody>tr>th.active:hover{background-color:#e8e8e8}#virtusize-bookmarklet .table>tbody>tr.success>td,#virtusize-bookmarklet .table>tbody>tr.success>th,#virtusize-bookmarklet .table>tbody>tr>td.success,#virtusize-bookmarklet .table>tbody>tr>th.success,#virtusize-bookmarklet .table>tfoot>tr.success>td,#virtusize-bookmarklet .table>tfoot>tr.success>th,#virtusize-bookmarklet .table>tfoot>tr>td.success,#virtusize-bookmarklet .table>tfoot>tr>th.success,#virtusize-bookmarklet .table>thead>tr.success>td,#virtusize-bookmarklet .table>thead>tr.success>th,#virtusize-bookmarklet .table>thead>tr>td.success,#virtusize-bookmarklet .table>thead>tr>th.success{background-color:#dff0d8}#virtusize-bookmarklet .table-hover>tbody>tr.success:hover>td,#virtusize-bookmarklet .table-hover>tbody>tr.success:hover>th,#virtusize-bookmarklet .table-hover>tbody>tr:hover>.success,#virtusize-bookmarklet .table-hover>tbody>tr>td.success:hover,#virtusize-bookmarklet .table-hover>tbody>tr>th.success:hover{background-color:#d0e9c6}#virtusize-bookmarklet .table>tbody>tr.info>td,#virtusize-bookmarklet .table>tbody>tr.info>th,#virtusize-bookmarklet .table>tbody>tr>td.info,#virtusize-bookmarklet .table>tbody>tr>th.info,#virtusize-bookmarklet .table>tfoot>tr.info>td,#virtusize-bookmarklet .table>tfoot>tr.info>th,#virtusize-bookmarklet .table>tfoot>tr>td.info,#virtusize-bookmarklet .table>tfoot>tr>th.info,#virtusize-bookmarklet .table>thead>tr.info>td,#virtusize-bookmarklet .table>thead>tr.info>th,#virtusize-bookmarklet .table>thead>tr>td.info,#virtusize-bookmarklet .table>thead>tr>th.info{background-color:#d9edf7}#virtusize-bookmarklet .table-hover>tbody>tr.info:hover>td,#virtusize-bookmarklet .table-hover>tbody>tr.info:hover>th,#virtusize-bookmarklet .table-hover>tbody>tr:hover>.info,#virtusize-bookmarklet .table-hover>tbody>tr>td.info:hover,#virtusize-bookmarklet .table-hover>tbody>tr>th.info:hover{background-color:#c4e3f3}#virtusize-bookmarklet .table>tbody>tr.warning>td,#virtusize-bookmarklet .table>tbody>tr.warning>th,#virtusize-bookmarklet .table>tbody>tr>td.warning,#virtusize-bookmarklet .table>tbody>tr>th.warning,#virtusize-bookmarklet .table>tfoot>tr.warning>td,#virtusize-bookmarklet .table>tfoot>tr.warning>th,#virtusize-bookmarklet .table>tfoot>tr>td.warning,#virtusize-bookmarklet .table>tfoot>tr>th.warning,#virtusize-bookmarklet .table>thead>tr.warning>td,#virtusize-bookmarklet .table>thead>tr.warning>th,#virtusize-bookmarklet .table>thead>tr>td.warning,#virtusize-bookmarklet .table>thead>tr>th.warning{background-color:#fcf8e3}#virtusize-bookmarklet .table-hover>tbody>tr.warning:hover>td,#virtusize-bookmarklet .table-hover>tbody>tr.warning:hover>th,#virtusize-bookmarklet .table-hover>tbody>tr:hover>.warning,#virtusize-bookmarklet .table-hover>tbody>tr>td.warning:hover,#virtusize-bookmarklet .table-hover>tbody>tr>th.warning:hover{background-color:#faf2cc}#virtusize-bookmarklet .table>tbody>tr.danger>td,#virtusize-bookmarklet .table>tbody>tr.danger>th,#virtusize-bookmarklet .table>tbody>tr>td.danger,#virtusize-bookmarklet .table>tbody>tr>th.danger,#virtusize-bookmarklet .table>tfoot>tr.danger>td,#virtusize-bookmarklet .table>tfoot>tr.danger>th,#virtusize-bookmarklet .table>tfoot>tr>td.danger,#virtusize-bookmarklet .table>tfoot>tr>th.danger,#virtusize-bookmarklet .table>thead>tr.danger>td,#virtusize-bookmarklet .table>thead>tr.danger>th,#virtusize-bookmarklet .table>thead>tr>td.danger,#virtusize-bookmarklet .table>thead>tr>th.danger{background-color:#f2dede}#virtusize-bookmarklet .table-hover>tbody>tr.danger:hover>td,#virtusize-bookmarklet .table-hover>tbody>tr.danger:hover>th,#virtusize-bookmarklet .table-hover>tbody>tr:hover>.danger,#virtusize-bookmarklet .table-hover>tbody>tr>td.danger:hover,#virtusize-bookmarklet .table-hover>tbody>tr>th.danger:hover{background-color:#ebcccc}@media screen and (max-width:767px){#virtusize-bookmarklet .table-responsive{width:100%;margin-bottom:15px;overflow-y:hidden;overflow-x:scroll;-ms-overflow-style:-ms-autohiding-scrollbar;border:1px solid #ddd;-webkit-overflow-scrolling:touch}#virtusize-bookmarklet .table-responsive>.table{margin-bottom:0}#virtusize-bookmarklet .table-responsive>.table>tbody>tr>td,#virtusize-bookmarklet .table-responsive>.table>tbody>tr>th,#virtusize-bookmarklet .table-responsive>.table>tfoot>tr>td,#virtusize-bookmarklet .table-responsive>.table>tfoot>tr>th,#virtusize-bookmarklet .table-responsive>.table>thead>tr>td,#virtusize-bookmarklet .table-responsive>.table>thead>tr>th{white-space:nowrap}#virtusize-bookmarklet .table-responsive>.table-bordered{border:0}#virtusize-bookmarklet .table-responsive>.table-bordered>tbody>tr>td:first-child,#virtusize-bookmarklet .table-responsive>.table-bordered>tbody>tr>th:first-child,#virtusize-bookmarklet .table-responsive>.table-bordered>tfoot>tr>td:first-child,#virtusize-bookmarklet .table-responsive>.table-bordered>tfoot>tr>th:first-child,#virtusize-bookmarklet .table-responsive>.table-bordered>thead>tr>td:first-child,#virtusize-bookmarklet .table-responsive>.table-bordered>thead>tr>th:first-child{border-left:0}#virtusize-bookmarklet .table-responsive>.table-bordered>tbody>tr>td:last-child,#virtusize-bookmarklet .table-responsive>.table-bordered>tbody>tr>th:last-child,#virtusize-bookmarklet .table-responsive>.table-bordered>tfoot>tr>td:last-child,#virtusize-bookmarklet .table-responsive>.table-bordered>tfoot>tr>th:last-child,#virtusize-bookmarklet .table-responsive>.table-bordered>thead>tr>td:last-child,#virtusize-bookmarklet .table-responsive>.table-bordered>thead>tr>th:last-child{border-right:0}#virtusize-bookmarklet .table-responsive>.table-bordered>tbody>tr:last-child>td,#virtusize-bookmarklet .table-responsive>.table-bordered>tbody>tr:last-child>th,#virtusize-bookmarklet .table-responsive>.table-bordered>tfoot>tr:last-child>td,#virtusize-bookmarklet .table-responsive>.table-bordered>tfoot>tr:last-child>th{border-bottom:0}}#virtusize-bookmarklet fieldset{padding:0;margin:0;border:0;min-width:0}#virtusize-bookmarklet legend{display:block;width:100%;padding:0;margin-bottom:20px;font-size:21px;line-height:inherit;color:#333;border:0;border-bottom:1px solid #e5e5e5}#virtusize-bookmarklet label{display:inline-block;max-width:100%;margin-bottom:5px;font-weight:700}#virtusize-bookmarklet input[type=search]{-webkit-box-sizing:border-box;-moz-box-sizing:border-box;box-sizing:border-box;-webkit-appearance:none}#virtusize-bookmarklet input[type=checkbox],#virtusize-bookmarklet input[type=radio]{margin:4px 0 0;line-height:normal}#virtusize-bookmarklet input[type=file]{display:block}#virtusize-bookmarklet input[type=range]{display:block;width:100%}#virtusize-bookmarklet select[multiple],#virtusize-bookmarklet select[size]{height:auto}#virtusize-bookmarklet input[type=file]:focus,#virtusize-bookmarklet input[type=checkbox]:focus,#virtusize-bookmarklet input[type=radio]:focus{outline:dotted thin;outline:-webkit-focus-ring-color auto 5px;outline-offset:-2px}#virtusize-bookmarklet output{display:block;padding-top:7px;font-size:14px;line-height:1.42857143;color:#555}#virtusize-bookmarklet .form-control{display:block;width:100%;height:34px;padding:6px 12px;font-size:14px;line-height:1.42857143;color:#555;background-color:#fff;background-image:none;border:1px solid #ccc;border-radius:4px;-webkit-box-shadow:inset 0 1px 1px rgba(0,0,0,.075);box-shadow:inset 0 1px 1px rgba(0,0,0,.075);-webkit-transition:border-color ease-in-out .15s,box-shadow ease-in-out .15s;-o-transition:border-color ease-in-out .15s,box-shadow ease-in-out .15s;transition:border-color ease-in-out .15s,box-shadow ease-in-out .15s}#virtusize-bookmarklet .form-control:focus{border-color:#66afe9;outline:0;-webkit-box-shadow:inset 0 1px 1px rgba(0,0,0,.075),0 0 8px rgba(102,175,233,.6);box-shadow:inset 0 1px 1px rgba(0,0,0,.075),0 0 8px rgba(102,175,233,.6)}#virtusize-bookmarklet .form-control::-moz-placeholder{color:#999;opacity:1}#virtusize-bookmarklet .form-control:-ms-input-placeholder{color:#999}#virtusize-bookmarklet .form-control::-webkit-input-placeholder{color:#999}#virtusize-bookmarklet .has-success .checkbox,#virtusize-bookmarklet .has-success .checkbox-inline,#virtusize-bookmarklet .has-success .control-label,#virtusize-bookmarklet .has-success .form-control-feedback,#virtusize-bookmarklet .has-success .help-block,#virtusize-bookmarklet .has-success .radio,#virtusize-bookmarklet .has-success .radio-inline{color:#3c763d}#virtusize-bookmarklet .form-control[disabled],#virtusize-bookmarklet .form-control[readonly],fieldset[disabled] #virtusize-bookmarklet .form-control{cursor:not-allowed;background-color:#eee;opacity:1}textarea#virtusize-bookmarklet .form-control{height:auto}#virtusize-bookmarklet input[type=date],#virtusize-bookmarklet input[type=time],#virtusize-bookmarklet input[type=datetime-local],#virtusize-bookmarklet input[type=month]{line-height:34px}#virtusize-bookmarklet input[type=date].input-sm,#virtusize-bookmarklet input[type=time].input-sm,#virtusize-bookmarklet input[type=datetime-local].input-sm,#virtusize-bookmarklet input[type=month].input-sm{line-height:30px}#virtusize-bookmarklet input[type=date].input-lg,#virtusize-bookmarklet input[type=time].input-lg,#virtusize-bookmarklet input[type=datetime-local].input-lg,#virtusize-bookmarklet input[type=month].input-lg{line-height:46px}#virtusize-bookmarklet .form-group{margin-bottom:15px}#virtusize-bookmarklet .checkbox,#virtusize-bookmarklet .radio{display:block;min-height:20px;margin-top:10px;margin-bottom:10px}#virtusize-bookmarklet .checkbox label,#virtusize-bookmarklet .radio label{padding-left:20px;margin-bottom:0;font-weight:400;cursor:pointer}#virtusize-bookmarklet .checkbox input[type=checkbox],#virtusize-bookmarklet .checkbox-inline input[type=checkbox],#virtusize-bookmarklet .radio input[type=radio],#virtusize-bookmarklet .radio-inline input[type=radio]{float:left;margin-left:-20px}#virtusize-bookmarklet .checkbox+.checkbox,#virtusize-bookmarklet .radio+.radio{margin-top:-5px}#virtusize-bookmarklet .checkbox-inline,#virtusize-bookmarklet .radio-inline{display:inline-block;padding-left:20px;margin-bottom:0;vertical-align:middle;font-weight:400;cursor:pointer}#virtusize-bookmarklet .checkbox-inline+.checkbox-inline,#virtusize-bookmarklet .radio-inline+.radio-inline{margin-top:0;margin-left:10px}#virtusize-bookmarklet .checkbox-inline[disabled],#virtusize-bookmarklet .checkbox[disabled],#virtusize-bookmarklet .radio-inline[disabled],#virtusize-bookmarklet .radio[disabled],#virtusize-bookmarklet input[type=checkbox][disabled],#virtusize-bookmarklet input[type=radio][disabled],fieldset[disabled] #virtusize-bookmarklet .checkbox,fieldset[disabled] #virtusize-bookmarklet .checkbox-inline,fieldset[disabled] #virtusize-bookmarklet .radio,fieldset[disabled] #virtusize-bookmarklet .radio-inline,fieldset[disabled] #virtusize-bookmarklet input[type=checkbox],fieldset[disabled] #virtusize-bookmarklet input[type=radio]{cursor:not-allowed}#virtusize-bookmarklet .input-sm{height:30px;padding:5px 10px;font-size:12px;line-height:1.5;border-radius:3px}select#virtusize-bookmarklet .input-sm{height:30px;line-height:30px}select[multiple]#virtusize-bookmarklet .input-sm,textarea#virtusize-bookmarklet .input-sm{height:auto}#virtusize-bookmarklet .input-lg{height:46px;padding:10px 16px;font-size:18px;line-height:1.33;border-radius:6px}select#virtusize-bookmarklet .input-lg{height:46px;line-height:46px}select[multiple]#virtusize-bookmarklet .input-lg,textarea#virtusize-bookmarklet .input-lg{height:auto}#virtusize-bookmarklet .has-feedback{position:relative}#virtusize-bookmarklet .has-feedback .form-control{padding-right:42.5px}#virtusize-bookmarklet .form-control-feedback{position:absolute;top:25px;right:0;z-index:2;display:block;width:34px;height:34px;line-height:34px;text-align:center}#virtusize-bookmarklet .input-lg+.form-control-feedback{width:46px;height:46px;line-height:46px}#virtusize-bookmarklet .input-sm+.form-control-feedback{width:30px;height:30px;line-height:30px}#virtusize-bookmarklet .has-success .form-control{border-color:#3c763d;-webkit-box-shadow:inset 0 1px 1px rgba(0,0,0,.075);box-shadow:inset 0 1px 1px rgba(0,0,0,.075)}#virtusize-bookmarklet .has-success .form-control:focus{border-color:#2b542c;-webkit-box-shadow:inset 0 1px 1px rgba(0,0,0,.075),0 0 6px #67b168;box-shadow:inset 0 1px 1px rgba(0,0,0,.075),0 0 6px #67b168}#virtusize-bookmarklet .has-success .input-group-addon{color:#3c763d;border-color:#3c763d;background-color:#dff0d8}#virtusize-bookmarklet .has-warning .checkbox,#virtusize-bookmarklet .has-warning .checkbox-inline,#virtusize-bookmarklet .has-warning .control-label,#virtusize-bookmarklet .has-warning .form-control-feedback,#virtusize-bookmarklet .has-warning .help-block,#virtusize-bookmarklet .has-warning .radio,#virtusize-bookmarklet .has-warning .radio-inline{color:#8a6d3b}#virtusize-bookmarklet .has-warning .form-control{border-color:#8a6d3b;-webkit-box-shadow:inset 0 1px 1px rgba(0,0,0,.075);box-shadow:inset 0 1px 1px rgba(0,0,0,.075)}#virtusize-bookmarklet .has-warning .form-control:focus{border-color:#66512c;-webkit-box-shadow:inset 0 1px 1px rgba(0,0,0,.075),0 0 6px #c0a16b;box-shadow:inset 0 1px 1px rgba(0,0,0,.075),0 0 6px #c0a16b}#virtusize-bookmarklet .has-warning .input-group-addon{color:#8a6d3b;border-color:#8a6d3b;background-color:#fcf8e3}#virtusize-bookmarklet .has-error .checkbox,#virtusize-bookmarklet .has-error .checkbox-inline,#virtusize-bookmarklet .has-error .control-label,#virtusize-bookmarklet .has-error .form-control-feedback,#virtusize-bookmarklet .has-error .help-block,#virtusize-bookmarklet .has-error .radio,#virtusize-bookmarklet .has-error .radio-inline{color:#a94442}#virtusize-bookmarklet .has-error .form-control{border-color:#a94442;-webkit-box-shadow:inset 0 1px 1px rgba(0,0,0,.075);box-shadow:inset 0 1px 1px rgba(0,0,0,.075)}#virtusize-bookmarklet .has-error .form-control:focus{border-color:#843534;-webkit-box-shadow:inset 0 1px 1px rgba(0,0,0,.075),0 0 6px #ce8483;box-shadow:inset 0 1px 1px rgba(0,0,0,.075),0 0 6px #ce8483}#virtusize-bookmarklet .has-error .input-group-addon{color:#a94442;border-color:#a94442;background-color:#f2dede}#virtusize-bookmarklet .has-feedback label.sr-only~.form-control-feedback{top:0}#virtusize-bookmarklet .form-control-static{margin-bottom:0}#virtusize-bookmarklet .help-block{display:block;margin-top:5px;margin-bottom:10px;color:#737373}@media (min-width:768px){#virtusize-bookmarklet .form-inline .form-group{display:inline-block;margin-bottom:0;vertical-align:middle}#virtusize-bookmarklet .form-inline .form-control{display:inline-block;width:auto;vertical-align:middle}#virtusize-bookmarklet .form-inline .input-group{display:inline-table;vertical-align:middle}#virtusize-bookmarklet .form-inline .input-group .form-control,#virtusize-bookmarklet .form-inline .input-group .input-group-addon,#virtusize-bookmarklet .form-inline .input-group .input-group-btn{width:auto}#virtusize-bookmarklet .form-inline .input-group>.form-control{width:100%}#virtusize-bookmarklet .form-inline .control-label{margin-bottom:0;vertical-align:middle}#virtusize-bookmarklet .form-inline .checkbox,#virtusize-bookmarklet .form-inline .radio{display:inline-block;margin-top:0;margin-bottom:0;vertical-align:middle}#virtusize-bookmarklet .form-inline .checkbox label,#virtusize-bookmarklet .form-inline .radio label{padding-left:0}#virtusize-bookmarklet .form-inline .checkbox input[type=checkbox],#virtusize-bookmarklet .form-inline .radio input[type=radio]{float:none;margin-left:0}#virtusize-bookmarklet .form-inline .has-feedback .form-control-feedback{top:0}#virtusize-bookmarklet .form-horizontal .control-label{text-align:right;margin-bottom:0;padding-top:7px}}#virtusize-bookmarklet .form-horizontal .checkbox,#virtusize-bookmarklet .form-horizontal .checkbox-inline,#virtusize-bookmarklet .form-horizontal .radio,#virtusize-bookmarklet .form-horizontal .radio-inline{margin-top:0;margin-bottom:0;padding-top:7px}#virtusize-bookmarklet .form-horizontal .checkbox,#virtusize-bookmarklet .form-horizontal .radio{min-height:27px}#virtusize-bookmarklet .form-horizontal .form-group{margin-left:-15px;margin-right:-15px}#virtusize-bookmarklet .form-horizontal .form-control-static{padding-top:7px;padding-bottom:7px}#virtusize-bookmarklet .form-horizontal .has-feedback .form-control-feedback{top:0;right:15px}#virtusize-bookmarklet .btn{display:inline-block;margin-bottom:0;font-weight:400;text-align:center;vertical-align:middle;cursor:pointer;background-image:none;border:1px solid transparent;white-space:nowrap;padding:6px 12px;font-size:14px;line-height:1.42857143;border-radius:4px;-webkit-user-select:none;-moz-user-select:none;-ms-user-select:none;user-select:none}#virtusize-bookmarklet .btn.active:focus,#virtusize-bookmarklet .btn:active:focus,#virtusize-bookmarklet .btn:focus{outline:dotted thin;outline:-webkit-focus-ring-color auto 5px;outline-offset:-2px}#virtusize-bookmarklet .btn:focus,#virtusize-bookmarklet .btn:hover{color:#333;text-decoration:none}#virtusize-bookmarklet .btn.active,#virtusize-bookmarklet .btn:active{outline:0;background-image:none;-webkit-box-shadow:inset 0 3px 5px rgba(0,0,0,.125);box-shadow:inset 0 3px 5px rgba(0,0,0,.125)}#virtusize-bookmarklet .btn.disabled,#virtusize-bookmarklet .btn[disabled],fieldset[disabled] #virtusize-bookmarklet .btn{cursor:not-allowed;pointer-events:none;opacity:.65;filter:alpha(opacity=65);-webkit-box-shadow:none;box-shadow:none}#virtusize-bookmarklet .btn-default{color:#333;background-color:#fff;border-color:#ccc}#virtusize-bookmarklet .btn-default.active,#virtusize-bookmarklet .btn-default:active,#virtusize-bookmarklet .btn-default:focus,#virtusize-bookmarklet .btn-default:hover,.open>.dropdown-toggle#virtusize-bookmarklet .btn-default{color:#333;background-color:#e6e6e6;border-color:#adadad}#virtusize-bookmarklet .btn-default.active,#virtusize-bookmarklet .btn-default:active,.open>.dropdown-toggle#virtusize-bookmarklet .btn-default{background-image:none}#virtusize-bookmarklet .btn-default.disabled,#virtusize-bookmarklet .btn-default.disabled.active,#virtusize-bookmarklet .btn-default.disabled:active,#virtusize-bookmarklet .btn-default.disabled:focus,#virtusize-bookmarklet .btn-default.disabled:hover,#virtusize-bookmarklet .btn-default[disabled],#virtusize-bookmarklet .btn-default[disabled].active,#virtusize-bookmarklet .btn-default[disabled]:active,#virtusize-bookmarklet .btn-default[disabled]:focus,#virtusize-bookmarklet .btn-default[disabled]:hover,fieldset[disabled] #virtusize-bookmarklet .btn-default,fieldset[disabled] #virtusize-bookmarklet .btn-default.active,fieldset[disabled] #virtusize-bookmarklet .btn-default:active,fieldset[disabled] #virtusize-bookmarklet .btn-default:focus,fieldset[disabled] #virtusize-bookmarklet .btn-default:hover{background-color:#fff;border-color:#ccc}#virtusize-bookmarklet .btn-default .badge{color:#fff;background-color:#333}#virtusize-bookmarklet .btn-primary{color:#fff;background-color:#428bca;border-color:#357ebd}#virtusize-bookmarklet .btn-primary.active,#virtusize-bookmarklet .btn-primary:active,#virtusize-bookmarklet .btn-primary:focus,#virtusize-bookmarklet .btn-primary:hover,.open>.dropdown-toggle#virtusize-bookmarklet .btn-primary{color:#fff;background-color:#3071a9;border-color:#285e8e}#virtusize-bookmarklet .btn-primary.active,#virtusize-bookmarklet .btn-primary:active,.open>.dropdown-toggle#virtusize-bookmarklet .btn-primary{background-image:none}#virtusize-bookmarklet .btn-primary.disabled,#virtusize-bookmarklet .btn-primary.disabled.active,#virtusize-bookmarklet .btn-primary.disabled:active,#virtusize-bookmarklet .btn-primary.disabled:focus,#virtusize-bookmarklet .btn-primary.disabled:hover,#virtusize-bookmarklet .btn-primary[disabled],#virtusize-bookmarklet .btn-primary[disabled].active,#virtusize-bookmarklet .btn-primary[disabled]:active,#virtusize-bookmarklet .btn-primary[disabled]:focus,#virtusize-bookmarklet .btn-primary[disabled]:hover,fieldset[disabled] #virtusize-bookmarklet .btn-primary,fieldset[disabled] #virtusize-bookmarklet .btn-primary.active,fieldset[disabled] #virtusize-bookmarklet .btn-primary:active,fieldset[disabled] #virtusize-bookmarklet .btn-primary:focus,fieldset[disabled] #virtusize-bookmarklet .btn-primary:hover{background-color:#428bca;border-color:#357ebd}#virtusize-bookmarklet .btn-primary .badge{color:#428bca;background-color:#fff}#virtusize-bookmarklet .btn-success{color:#fff;background-color:#5cb85c;border-color:#4cae4c}#virtusize-bookmarklet .btn-success.active,#virtusize-bookmarklet .btn-success:active,#virtusize-bookmarklet .btn-success:focus,#virtusize-bookmarklet .btn-success:hover,.open>.dropdown-toggle#virtusize-bookmarklet .btn-success{color:#fff;background-color:#449d44;border-color:#398439}#virtusize-bookmarklet .btn-success.active,#virtusize-bookmarklet .btn-success:active,.open>.dropdown-toggle#virtusize-bookmarklet .btn-success{background-image:none}#virtusize-bookmarklet .btn-success.disabled,#virtusize-bookmarklet .btn-success.disabled.active,#virtusize-bookmarklet .btn-success.disabled:active,#virtusize-bookmarklet .btn-success.disabled:focus,#virtusize-bookmarklet .btn-success.disabled:hover,#virtusize-bookmarklet .btn-success[disabled],#virtusize-bookmarklet .btn-success[disabled].active,#virtusize-bookmarklet .btn-success[disabled]:active,#virtusize-bookmarklet .btn-success[disabled]:focus,#virtusize-bookmarklet .btn-success[disabled]:hover,fieldset[disabled] #virtusize-bookmarklet .btn-success,fieldset[disabled] #virtusize-bookmarklet .btn-success.active,fieldset[disabled] #virtusize-bookmarklet .btn-success:active,fieldset[disabled] #virtusize-bookmarklet .btn-success:focus,fieldset[disabled] #virtusize-bookmarklet .btn-success:hover{background-color:#5cb85c;border-color:#4cae4c}#virtusize-bookmarklet .btn-success .badge{color:#5cb85c;background-color:#fff}#virtusize-bookmarklet .btn-info{color:#fff;background-color:#5bc0de;border-color:#46b8da}#virtusize-bookmarklet .btn-info.active,#virtusize-bookmarklet .btn-info:active,#virtusize-bookmarklet .btn-info:focus,#virtusize-bookmarklet .btn-info:hover,.open>.dropdown-toggle#virtusize-bookmarklet .btn-info{color:#fff;background-color:#31b0d5;border-color:#269abc}#virtusize-bookmarklet .btn-info.active,#virtusize-bookmarklet .btn-info:active,.open>.dropdown-toggle#virtusize-bookmarklet .btn-info{background-image:none}#virtusize-bookmarklet .btn-info.disabled,#virtusize-bookmarklet .btn-info.disabled.active,#virtusize-bookmarklet .btn-info.disabled:active,#virtusize-bookmarklet .btn-info.disabled:focus,#virtusize-bookmarklet .btn-info.disabled:hover,#virtusize-bookmarklet .btn-info[disabled],#virtusize-bookmarklet .btn-info[disabled].active,#virtusize-bookmarklet .btn-info[disabled]:active,#virtusize-bookmarklet .btn-info[disabled]:focus,#virtusize-bookmarklet .btn-info[disabled]:hover,fieldset[disabled] #virtusize-bookmarklet .btn-info,fieldset[disabled] #virtusize-bookmarklet .btn-info.active,fieldset[disabled] #virtusize-bookmarklet .btn-info:active,fieldset[disabled] #virtusize-bookmarklet .btn-info:focus,fieldset[disabled] #virtusize-bookmarklet .btn-info:hover{background-color:#5bc0de;border-color:#46b8da}#virtusize-bookmarklet .btn-info .badge{color:#5bc0de;background-color:#fff}#virtusize-bookmarklet .btn-warning{color:#fff;background-color:#f0ad4e;border-color:#eea236}#virtusize-bookmarklet .btn-warning.active,#virtusize-bookmarklet .btn-warning:active,#virtusize-bookmarklet .btn-warning:focus,#virtusize-bookmarklet .btn-warning:hover,.open>.dropdown-toggle#virtusize-bookmarklet .btn-warning{color:#fff;background-color:#ec971f;border-color:#d58512}#virtusize-bookmarklet .btn-warning.active,#virtusize-bookmarklet .btn-warning:active,.open>.dropdown-toggle#virtusize-bookmarklet .btn-warning{background-image:none}#virtusize-bookmarklet .btn-warning.disabled,#virtusize-bookmarklet .btn-warning.disabled.active,#virtusize-bookmarklet .btn-warning.disabled:active,#virtusize-bookmarklet .btn-warning.disabled:focus,#virtusize-bookmarklet .btn-warning.disabled:hover,#virtusize-bookmarklet .btn-warning[disabled],#virtusize-bookmarklet .btn-warning[disabled].active,#virtusize-bookmarklet .btn-warning[disabled]:active,#virtusize-bookmarklet .btn-warning[disabled]:focus,#virtusize-bookmarklet .btn-warning[disabled]:hover,fieldset[disabled] #virtusize-bookmarklet .btn-warning,fieldset[disabled] #virtusize-bookmarklet .btn-warning.active,fieldset[disabled] #virtusize-bookmarklet .btn-warning:active,fieldset[disabled] #virtusize-bookmarklet .btn-warning:focus,fieldset[disabled] #virtusize-bookmarklet .btn-warning:hover{background-color:#f0ad4e;border-color:#eea236}#virtusize-bookmarklet .btn-warning .badge{color:#f0ad4e;background-color:#fff}#virtusize-bookmarklet .btn-danger{color:#fff;background-color:#d9534f;border-color:#d43f3a}#virtusize-bookmarklet .btn-danger.active,#virtusize-bookmarklet .btn-danger:active,#virtusize-bookmarklet .btn-danger:focus,#virtusize-bookmarklet .btn-danger:hover,.open>.dropdown-toggle#virtusize-bookmarklet .btn-danger{color:#fff;background-color:#c9302c;border-color:#ac2925}#virtusize-bookmarklet .btn-danger.active,#virtusize-bookmarklet .btn-danger:active,.open>.dropdown-toggle#virtusize-bookmarklet .btn-danger{background-image:none}#virtusize-bookmarklet .btn-danger.disabled,#virtusize-bookmarklet .btn-danger.disabled.active,#virtusize-bookmarklet .btn-danger.disabled:active,#virtusize-bookmarklet .btn-danger.disabled:focus,#virtusize-bookmarklet .btn-danger.disabled:hover,#virtusize-bookmarklet .btn-danger[disabled],#virtusize-bookmarklet .btn-danger[disabled].active,#virtusize-bookmarklet .btn-danger[disabled]:active,#virtusize-bookmarklet .btn-danger[disabled]:focus,#virtusize-bookmarklet .btn-danger[disabled]:hover,fieldset[disabled] #virtusize-bookmarklet .btn-danger,fieldset[disabled] #virtusize-bookmarklet .btn-danger.active,fieldset[disabled] #virtusize-bookmarklet .btn-danger:active,fieldset[disabled] #virtusize-bookmarklet .btn-danger:focus,fieldset[disabled] #virtusize-bookmarklet .btn-danger:hover{background-color:#d9534f;border-color:#d43f3a}#virtusize-bookmarklet .btn-danger .badge{color:#d9534f;background-color:#fff}#virtusize-bookmarklet .btn-link{color:#428bca;font-weight:400;cursor:pointer;border-radius:0}#virtusize-bookmarklet .btn-link,#virtusize-bookmarklet .btn-link:active,#virtusize-bookmarklet .btn-link[disabled],fieldset[disabled] #virtusize-bookmarklet .btn-link{background-color:transparent;-webkit-box-shadow:none;box-shadow:none}#virtusize-bookmarklet .btn-link,#virtusize-bookmarklet .btn-link:active,#virtusize-bookmarklet .btn-link:focus,#virtusize-bookmarklet .btn-link:hover{border-color:transparent}#virtusize-bookmarklet .btn-link:focus,#virtusize-bookmarklet .btn-link:hover{color:#2a6496;text-decoration:underline;background-color:transparent}#virtusize-bookmarklet .btn-link[disabled]:focus,#virtusize-bookmarklet .btn-link[disabled]:hover,fieldset[disabled] #virtusize-bookmarklet .btn-link:focus,fieldset[disabled] #virtusize-bookmarklet .btn-link:hover{color:#999;text-decoration:none}#virtusize-bookmarklet .btn-lg{padding:10px 16px;font-size:18px;line-height:1.33;border-radius:6px}#virtusize-bookmarklet .btn-sm{padding:5px 10px;font-size:12px;line-height:1.5;border-radius:3px}#virtusize-bookmarklet .btn-xs{padding:1px 5px;font-size:12px;line-height:1.5;border-radius:3px}#virtusize-bookmarklet .btn-block{display:block;width:100%;padding-left:0;padding-right:0}#virtusize-bookmarklet .btn-block+.btn-block{margin-top:5px}#virtusize-bookmarklet input[type=button].btn-block,#virtusize-bookmarklet input[type=reset].btn-block,#virtusize-bookmarklet input[type=submit].btn-block{width:100%}#virtusize-bookmarklet .fade{opacity:0;-webkit-transition:opacity .15s linear;-o-transition:opacity .15s linear;transition:opacity .15s linear}#virtusize-bookmarklet .fade.in{opacity:1}#virtusize-bookmarklet .collapse{display:none}#virtusize-bookmarklet .collapse.in{display:block}tr#virtusize-bookmarklet .collapse.in{display:table-row}tbody#virtusize-bookmarklet .collapse.in{display:table-row-group}#virtusize-bookmarklet .collapsing{position:relative;height:0;overflow:hidden;-webkit-transition:height .35s ease;-o-transition:height .35s ease;transition:height .35s ease}#virtusize-bookmarklet .caret{display:inline-block;width:0;height:0;margin-left:2px;vertical-align:middle;border-top:4px solid;border-right:4px solid transparent;border-left:4px solid transparent}#virtusize-bookmarklet .dropdown{position:relative}#virtusize-bookmarklet .dropdown-toggle:focus{outline:0}#virtusize-bookmarklet .dropdown-menu{position:absolute;top:100%;left:0;z-index:1000;display:none;float:left;min-width:160px;padding:5px 0;margin:2px 0 0;list-style:none;font-size:14px;text-align:left;background-color:#fff;border:1px solid #ccc;border:1px solid rgba(0,0,0,.15);border-radius:4px;-webkit-box-shadow:0 6px 12px rgba(0,0,0,.175);box-shadow:0 6px 12px rgba(0,0,0,.175);background-clip:padding-box}#virtusize-bookmarklet .dropdown-menu-right,#virtusize-bookmarklet .dropdown-menu.pull-right{left:auto;right:0}#virtusize-bookmarklet .btn-group-vertical>.btn:not(:first-child):not(:last-child),#virtusize-bookmarklet .btn-group>.btn-group:not(:first-child):not(:last-child)>.btn,#virtusize-bookmarklet .btn-group>.btn:not(:first-child):not(:last-child):not(.dropdown-toggle){border-radius:0}#virtusize-bookmarklet .dropdown-menu .divider{height:1px;margin:9px 0;overflow:hidden;background-color:#e5e5e5}#virtusize-bookmarklet .dropdown-menu>li>a{display:block;padding:3px 20px;clear:both;font-weight:400;line-height:1.42857143;color:#333;white-space:nowrap}#virtusize-bookmarklet .dropdown-menu>li>a:focus,#virtusize-bookmarklet .dropdown-menu>li>a:hover{text-decoration:none;color:#262626;background-color:#f5f5f5}#virtusize-bookmarklet .dropdown-menu>.active>a,#virtusize-bookmarklet .dropdown-menu>.active>a:focus,#virtusize-bookmarklet .dropdown-menu>.active>a:hover{color:#fff;text-decoration:none;outline:0;background-color:#428bca}#virtusize-bookmarklet .dropdown-menu>.disabled>a,#virtusize-bookmarklet .dropdown-menu>.disabled>a:focus,#virtusize-bookmarklet .dropdown-menu>.disabled>a:hover{color:#999}#virtusize-bookmarklet .dropdown-menu>.disabled>a:focus,#virtusize-bookmarklet .dropdown-menu>.disabled>a:hover{text-decoration:none;background-color:transparent;background-image:none;filter:progid:DXImageTransform.Microsoft.gradient(enabled=false);cursor:not-allowed}#virtusize-bookmarklet .open>.dropdown-menu{display:block}#virtusize-bookmarklet .open>a{outline:0}#virtusize-bookmarklet .dropdown-menu-left{left:0;right:auto}#virtusize-bookmarklet .dropdown-header{display:block;padding:3px 20px;font-size:12px;line-height:1.42857143;color:#999}#virtusize-bookmarklet .dropdown-backdrop{position:fixed;left:0;right:0;bottom:0;top:0;z-index:990}#virtusize-bookmarklet .nav-justified>.dropdown .dropdown-menu,#virtusize-bookmarklet .nav-tabs.nav-justified>.dropdown .dropdown-menu{top:auto;left:auto}#virtusize-bookmarklet .pull-right>.dropdown-menu{right:0;left:auto}#virtusize-bookmarklet .dropup .caret,#virtusize-bookmarklet .navbar-fixed-bottom .dropdown .caret{border-top:0;border-bottom:4px solid;content:""}#virtusize-bookmarklet .dropup .dropdown-menu,#virtusize-bookmarklet .navbar-fixed-bottom .dropdown .dropdown-menu{top:auto;bottom:100%;margin-bottom:1px}@media (min-width:768px){#virtusize-bookmarklet .navbar-right .dropdown-menu{left:auto;right:0}#virtusize-bookmarklet .navbar-right .dropdown-menu-left{left:0;right:auto}}#virtusize-bookmarklet .btn-group,#virtusize-bookmarklet .btn-group-vertical{position:relative;display:inline-block;vertical-align:middle}#virtusize-bookmarklet .btn-group-vertical>.btn,#virtusize-bookmarklet .btn-group>.btn{position:relative;float:left}#virtusize-bookmarklet .btn-group-vertical>.btn.active,#virtusize-bookmarklet .btn-group-vertical>.btn:active,#virtusize-bookmarklet .btn-group-vertical>.btn:focus,#virtusize-bookmarklet .btn-group-vertical>.btn:hover,#virtusize-bookmarklet .btn-group>.btn.active,#virtusize-bookmarklet .btn-group>.btn:active,#virtusize-bookmarklet .btn-group>.btn:focus,#virtusize-bookmarklet .btn-group>.btn:hover{z-index:2}#virtusize-bookmarklet .btn-group-vertical>.btn:focus,#virtusize-bookmarklet .btn-group>.btn:focus{outline:0}#virtusize-bookmarklet .btn-group .btn+.btn,#virtusize-bookmarklet .btn-group .btn+.btn-group,#virtusize-bookmarklet .btn-group .btn-group+.btn,#virtusize-bookmarklet .btn-group .btn-group+.btn-group{margin-left:-1px}#virtusize-bookmarklet .btn-toolbar{margin-left:-5px}#virtusize-bookmarklet .btn-toolbar .btn-group,#virtusize-bookmarklet .btn-toolbar .input-group{float:left}#virtusize-bookmarklet .btn-toolbar>.btn,#virtusize-bookmarklet .btn-toolbar>.btn-group,#virtusize-bookmarklet .btn-toolbar>.input-group{margin-left:5px}#virtusize-bookmarklet .btn .caret,#virtusize-bookmarklet .btn-group>.btn:first-child{margin-left:0}#virtusize-bookmarklet .btn-group>.btn:first-child:not(:last-child):not(.dropdown-toggle){border-bottom-right-radius:0;border-top-right-radius:0}#virtusize-bookmarklet .btn-group>.btn:last-child:not(:first-child),#virtusize-bookmarklet .btn-group>.dropdown-toggle:not(:first-child){border-bottom-left-radius:0;border-top-left-radius:0}#virtusize-bookmarklet .btn-group>.btn-group{float:left}#virtusize-bookmarklet .btn-group>.btn-group:first-child>.btn:last-child,#virtusize-bookmarklet .btn-group>.btn-group:first-child>.dropdown-toggle{border-bottom-right-radius:0;border-top-right-radius:0}#virtusize-bookmarklet .btn-group>.btn-group:last-child>.btn:first-child{border-bottom-left-radius:0;border-top-left-radius:0}#virtusize-bookmarklet .btn-group .dropdown-toggle:active,#virtusize-bookmarklet .btn-group.open .dropdown-toggle{outline:0}#virtusize-bookmarklet .btn-group>.btn+.dropdown-toggle{padding-left:8px;padding-right:8px}#virtusize-bookmarklet .btn-group>.btn-lg+.dropdown-toggle{padding-left:12px;padding-right:12px}#virtusize-bookmarklet .btn-group.open .dropdown-toggle{-webkit-box-shadow:inset 0 3px 5px rgba(0,0,0,.125);box-shadow:inset 0 3px 5px rgba(0,0,0,.125)}#virtusize-bookmarklet .btn-group.open .dropdown-toggle.btn-link{-webkit-box-shadow:none;box-shadow:none}#virtusize-bookmarklet .btn-lg .caret{border-width:5px 5px 0}#virtusize-bookmarklet .dropup .btn-lg .caret{border-width:0 5px 5px}#virtusize-bookmarklet .btn-group-vertical>.btn,#virtusize-bookmarklet .btn-group-vertical>.btn-group,#virtusize-bookmarklet .btn-group-vertical>.btn-group>.btn{display:block;float:none;width:100%;max-width:100%}#virtusize-bookmarklet .btn-group-vertical>.btn-group>.btn{float:none}#virtusize-bookmarklet .btn-group-vertical>.btn+.btn,#virtusize-bookmarklet .btn-group-vertical>.btn+.btn-group,#virtusize-bookmarklet .btn-group-vertical>.btn-group+.btn,#virtusize-bookmarklet .btn-group-vertical>.btn-group+.btn-group{margin-top:-1px;margin-left:0}#virtusize-bookmarklet .btn-group-vertical>.btn:first-child:not(:last-child){border-top-right-radius:4px;border-bottom-right-radius:0;border-bottom-left-radius:0}#virtusize-bookmarklet .btn-group-vertical>.btn:last-child:not(:first-child){border-bottom-left-radius:4px;border-top-right-radius:0;border-top-left-radius:0}#virtusize-bookmarklet .btn-group-vertical>.btn-group:not(:first-child):not(:last-child)>.btn{border-radius:0}#virtusize-bookmarklet .btn-group-vertical>.btn-group:first-child:not(:last-child)>.btn:last-child,#virtusize-bookmarklet .btn-group-vertical>.btn-group:first-child:not(:last-child)>.dropdown-toggle{border-bottom-right-radius:0;border-bottom-left-radius:0}#virtusize-bookmarklet .btn-group-vertical>.btn-group:last-child:not(:first-child)>.btn:first-child{border-top-right-radius:0;border-top-left-radius:0}#virtusize-bookmarklet .btn-group-justified{display:table;width:100%;table-layout:fixed;border-collapse:separate}#virtusize-bookmarklet .btn-group-justified>.btn,#virtusize-bookmarklet .btn-group-justified>.btn-group{float:none;display:table-cell;width:1%}#virtusize-bookmarklet .btn-group-justified>.btn-group .btn{width:100%}#virtusize-bookmarklet .btn-group-justified>.btn-group .dropdown-menu{left:auto}#virtusize-bookmarklet [data-toggle=buttons]>.btn>input[type=checkbox],#virtusize-bookmarklet [data-toggle=buttons]>.btn>input[type=radio]{position:absolute;z-index:-1;opacity:0;filter:alpha(opacity=0)}#virtusize-bookmarklet .nav{margin-bottom:0;padding-left:0;list-style:none}#virtusize-bookmarklet .nav>li{position:relative;display:block}#virtusize-bookmarklet .nav>li>a{position:relative;display:block;padding:10px 15px}#virtusize-bookmarklet .nav>li>a:focus,#virtusize-bookmarklet .nav>li>a:hover{text-decoration:none;background-color:#eee}#virtusize-bookmarklet .nav>li.disabled>a{color:#999}#virtusize-bookmarklet .nav>li.disabled>a:focus,#virtusize-bookmarklet .nav>li.disabled>a:hover{color:#999;text-decoration:none;background-color:transparent;cursor:not-allowed}#virtusize-bookmarklet .nav .open>a,#virtusize-bookmarklet .nav .open>a:focus,#virtusize-bookmarklet .nav .open>a:hover{background-color:#eee;border-color:#428bca}#virtusize-bookmarklet .nav .nav-divider{height:1px;margin:9px 0;overflow:hidden;background-color:#e5e5e5}#virtusize-bookmarklet .nav>li>a>img{max-width:none}#virtusize-bookmarklet .nav-tabs{border-bottom:1px solid #ddd}#virtusize-bookmarklet .nav-tabs>li{float:left;margin-bottom:-1px}#virtusize-bookmarklet .nav-tabs>li>a{margin-right:2px;line-height:1.42857143;border:1px solid transparent;border-radius:4px 4px 0 0}#virtusize-bookmarklet .nav-tabs>li>a:hover{border-color:#eee #eee #ddd}#virtusize-bookmarklet .nav-tabs>li.active>a,#virtusize-bookmarklet .nav-tabs>li.active>a:focus,#virtusize-bookmarklet .nav-tabs>li.active>a:hover{color:#555;background-color:#fff;border:1px solid #ddd;border-bottom-color:transparent;cursor:default}#virtusize-bookmarklet .nav-tabs.nav-justified{width:100%;border-bottom:0}#virtusize-bookmarklet .nav-tabs.nav-justified>li{float:none}#virtusize-bookmarklet .nav-tabs.nav-justified>li>a{text-align:center;margin-bottom:5px;margin-right:0;border-radius:4px}#virtusize-bookmarklet .nav-tabs.nav-justified>.active>a,#virtusize-bookmarklet .nav-tabs.nav-justified>.active>a:focus,#virtusize-bookmarklet .nav-tabs.nav-justified>.active>a:hover{border:1px solid #ddd}@media (min-width:768px){#virtusize-bookmarklet .nav-tabs.nav-justified>li{display:table-cell;width:1%}#virtusize-bookmarklet .nav-tabs.nav-justified>li>a{margin-bottom:0;border-bottom:1px solid #ddd;border-radius:4px 4px 0 0}#virtusize-bookmarklet .nav-tabs.nav-justified>.active>a,#virtusize-bookmarklet .nav-tabs.nav-justified>.active>a:focus,#virtusize-bookmarklet .nav-tabs.nav-justified>.active>a:hover{border-bottom-color:#fff}}#virtusize-bookmarklet .nav-pills>li{float:left}#virtusize-bookmarklet .nav-justified>li,#virtusize-bookmarklet .nav-stacked>li{float:none}#virtusize-bookmarklet .nav-pills>li>a{border-radius:4px}#virtusize-bookmarklet .nav-pills>li+li{margin-left:2px}#virtusize-bookmarklet .nav-pills>li.active>a,#virtusize-bookmarklet .nav-pills>li.active>a:focus,#virtusize-bookmarklet .nav-pills>li.active>a:hover{color:#fff;background-color:#428bca}#virtusize-bookmarklet .nav-stacked>li+li{margin-top:2px;margin-left:0}#virtusize-bookmarklet .nav-justified{width:100%}#virtusize-bookmarklet .nav-justified>li>a{text-align:center;margin-bottom:5px}#virtusize-bookmarklet .nav-tabs-justified{border-bottom:0}#virtusize-bookmarklet .nav-tabs-justified>li>a{margin-right:0;border-radius:4px}#virtusize-bookmarklet .nav-tabs-justified>.active>a,#virtusize-bookmarklet .nav-tabs-justified>.active>a:focus,#virtusize-bookmarklet .nav-tabs-justified>.active>a:hover{border:1px solid #ddd}@media (min-width:768px){#virtusize-bookmarklet .nav-justified>li{display:table-cell;width:1%}#virtusize-bookmarklet .nav-justified>li>a{margin-bottom:0}#virtusize-bookmarklet .nav-tabs-justified>li>a{border-bottom:1px solid #ddd;border-radius:4px 4px 0 0}#virtusize-bookmarklet .nav-tabs-justified>.active>a,#virtusize-bookmarklet .nav-tabs-justified>.active>a:focus,#virtusize-bookmarklet .nav-tabs-justified>.active>a:hover{border-bottom-color:#fff}}#virtusize-bookmarklet .tab-content>.tab-pane{display:none}#virtusize-bookmarklet .tab-content>.active{display:block}#virtusize-bookmarklet .nav-tabs .dropdown-menu{margin-top:-1px;border-top-right-radius:0;border-top-left-radius:0}#virtusize-bookmarklet .navbar{position:relative;min-height:50px;margin-bottom:20px;border:1px solid transparent}#virtusize-bookmarklet .navbar-collapse{overflow-x:visible;padding-right:15px;padding-left:15px;border-top:1px solid transparent;box-shadow:inset 0 1px 0 rgba(255,255,255,.1);-webkit-overflow-scrolling:touch}#virtusize-bookmarklet .navbar-collapse.in{overflow-y:auto}#virtusize-bookmarklet .navbar-fixed-bottom .navbar-collapse,#virtusize-bookmarklet .navbar-fixed-top .navbar-collapse{max-height:340px}@media (max-width:480px) and (orientation:landscape){#virtusize-bookmarklet .navbar-fixed-bottom .navbar-collapse,#virtusize-bookmarklet .navbar-fixed-top .navbar-collapse{max-height:200px}}#virtusize-bookmarklet .container-fluid>.navbar-collapse,#virtusize-bookmarklet .container-fluid>.navbar-header,#virtusize-bookmarklet .container>.navbar-collapse,#virtusize-bookmarklet .container>.navbar-header{margin-right:-15px;margin-left:-15px}@media (min-width:768px){#virtusize-bookmarklet .navbar{border-radius:4px}#virtusize-bookmarklet .navbar-header{float:left}#virtusize-bookmarklet .navbar-collapse{width:auto;border-top:0;box-shadow:none}#virtusize-bookmarklet .navbar-collapse.collapse{display:block!important;height:auto!important;padding-bottom:0;overflow:visible!important}#virtusize-bookmarklet .navbar-collapse.in{overflow-y:visible}.navbar-fixed-bottom #virtusize-bookmarklet .navbar-collapse,.navbar-fixed-top #virtusize-bookmarklet .navbar-collapse,.navbar-static-top #virtusize-bookmarklet .navbar-collapse{padding-left:0;padding-right:0}#virtusize-bookmarklet .container-fluid>.navbar-collapse,#virtusize-bookmarklet .container-fluid>.navbar-header,#virtusize-bookmarklet .container>.navbar-collapse,#virtusize-bookmarklet .container>.navbar-header{margin-right:0;margin-left:0}#virtusize-bookmarklet .navbar-static-top{border-radius:0}}#virtusize-bookmarklet .navbar-static-top{z-index:1000;border-width:0 0 1px}#virtusize-bookmarklet .navbar-fixed-bottom,#virtusize-bookmarklet .navbar-fixed-top{position:fixed;right:0;left:0;z-index:1030}#virtusize-bookmarklet .navbar-fixed-top{top:0;border-width:0 0 1px}#virtusize-bookmarklet .navbar-fixed-bottom{bottom:0;margin-bottom:0;border-width:1px 0 0}#virtusize-bookmarklet .navbar-brand{float:left;padding:15px;font-size:18px;height:50px}#virtusize-bookmarklet .navbar-brand:focus,#virtusize-bookmarklet .navbar-brand:hover{text-decoration:none}@media (min-width:768px){#virtusize-bookmarklet .navbar-fixed-bottom,#virtusize-bookmarklet .navbar-fixed-top{border-radius:0}.navbar>.container #virtusize-bookmarklet .navbar-brand,.navbar>.container-fluid #virtusize-bookmarklet .navbar-brand{margin-left:-15px}}#virtusize-bookmarklet .navbar-toggle{position:relative;float:right;margin-right:15px;padding:9px 10px;margin-top:8px;margin-bottom:8px;background-color:transparent;background-image:none;border:1px solid transparent;border-radius:4px}#virtusize-bookmarklet .navbar-toggle:focus{outline:0}#virtusize-bookmarklet .navbar-toggle .icon-bar{display:block;width:22px;height:2px;border-radius:1px}#virtusize-bookmarklet .navbar-toggle .icon-bar+.icon-bar{margin-top:4px}#virtusize-bookmarklet .navbar-nav{margin:7.5px -15px}#virtusize-bookmarklet .navbar-nav>li>a{padding-top:10px;padding-bottom:10px;line-height:20px}@media (max-width:767px){#virtusize-bookmarklet .navbar-nav .open .dropdown-menu{position:static;float:none;width:auto;margin-top:0;background-color:transparent;border:0;box-shadow:none}#virtusize-bookmarklet .navbar-nav .open .dropdown-menu .dropdown-header,#virtusize-bookmarklet .navbar-nav .open .dropdown-menu>li>a{padding:5px 15px 5px 25px}#virtusize-bookmarklet .navbar-nav .open .dropdown-menu>li>a{line-height:20px}#virtusize-bookmarklet .navbar-nav .open .dropdown-menu>li>a:focus,#virtusize-bookmarklet .navbar-nav .open .dropdown-menu>li>a:hover{background-image:none}}@media (min-width:768px){#virtusize-bookmarklet .navbar-toggle{display:none}#virtusize-bookmarklet .navbar-nav{float:left;margin:0}#virtusize-bookmarklet .navbar-nav>li{float:left}#virtusize-bookmarklet .navbar-nav>li>a{padding-top:15px;padding-bottom:15px}#virtusize-bookmarklet .navbar-nav.navbar-right:last-child{margin-right:-15px}#virtusize-bookmarklet .navbar-left{float:left!important}#virtusize-bookmarklet .navbar-right{float:right!important}}#virtusize-bookmarklet .navbar-form{padding:10px 15px;border-top:1px solid transparent;border-bottom:1px solid transparent;-webkit-box-shadow:inset 0 1px 0 rgba(255,255,255,.1),0 1px 0 rgba(255,255,255,.1);box-shadow:inset 0 1px 0 rgba(255,255,255,.1),0 1px 0 rgba(255,255,255,.1);margin:8px -15px}@media (min-width:768px){#virtusize-bookmarklet .navbar-form .form-group{display:inline-block;margin-bottom:0;vertical-align:middle}#virtusize-bookmarklet .navbar-form .form-control{display:inline-block;width:auto;vertical-align:middle}#virtusize-bookmarklet .navbar-form .input-group{display:inline-table;vertical-align:middle}#virtusize-bookmarklet .navbar-form .input-group .form-control,#virtusize-bookmarklet .navbar-form .input-group .input-group-addon,#virtusize-bookmarklet .navbar-form .input-group .input-group-btn{width:auto}#virtusize-bookmarklet .navbar-form .input-group>.form-control{width:100%}#virtusize-bookmarklet .navbar-form .control-label{margin-bottom:0;vertical-align:middle}#virtusize-bookmarklet .navbar-form .checkbox,#virtusize-bookmarklet .navbar-form .radio{display:inline-block;margin-top:0;margin-bottom:0;vertical-align:middle}#virtusize-bookmarklet .navbar-form .checkbox label,#virtusize-bookmarklet .navbar-form .radio label{padding-left:0}#virtusize-bookmarklet .navbar-form .checkbox input[type=checkbox],#virtusize-bookmarklet .navbar-form .radio input[type=radio]{float:none;margin-left:0}#virtusize-bookmarklet .navbar-form .has-feedback .form-control-feedback{top:0}#virtusize-bookmarklet .navbar-form{width:auto;border:0;margin-left:0;margin-right:0;padding-top:0;padding-bottom:0;-webkit-box-shadow:none;box-shadow:none}#virtusize-bookmarklet .navbar-form.navbar-right:last-child{margin-right:-15px}}@media (max-width:767px){#virtusize-bookmarklet .navbar-form .form-group{margin-bottom:5px}}#virtusize-bookmarklet .navbar-nav>li>.dropdown-menu{margin-top:0;border-top-right-radius:0;border-top-left-radius:0}#virtusize-bookmarklet .navbar-fixed-bottom .navbar-nav>li>.dropdown-menu{border-bottom-right-radius:0;border-bottom-left-radius:0}#virtusize-bookmarklet .navbar-btn{margin-top:8px;margin-bottom:8px}#virtusize-bookmarklet .navbar-btn.btn-sm{margin-top:10px;margin-bottom:10px}#virtusize-bookmarklet .navbar-btn.btn-xs{margin-top:14px;margin-bottom:14px}#virtusize-bookmarklet .navbar-text{margin-top:15px;margin-bottom:15px}@media (min-width:768px){#virtusize-bookmarklet .navbar-text{float:left;margin-left:15px;margin-right:15px}#virtusize-bookmarklet .navbar-text.navbar-right:last-child{margin-right:0}}#virtusize-bookmarklet .navbar-default{background-color:#f8f8f8;border-color:#e7e7e7}#virtusize-bookmarklet .navbar-default .navbar-brand{color:#777}#virtusize-bookmarklet .navbar-default .navbar-brand:focus,#virtusize-bookmarklet .navbar-default .navbar-brand:hover{color:#5e5e5e;background-color:transparent}#virtusize-bookmarklet .navbar-default .navbar-nav>li>a,#virtusize-bookmarklet .navbar-default .navbar-text{color:#777}#virtusize-bookmarklet .navbar-default .navbar-nav>li>a:focus,#virtusize-bookmarklet .navbar-default .navbar-nav>li>a:hover{color:#333;background-color:transparent}#virtusize-bookmarklet .navbar-default .navbar-nav>.active>a,#virtusize-bookmarklet .navbar-default .navbar-nav>.active>a:focus,#virtusize-bookmarklet .navbar-default .navbar-nav>.active>a:hover{color:#555;background-color:#e7e7e7}#virtusize-bookmarklet .navbar-default .navbar-nav>.disabled>a,#virtusize-bookmarklet .navbar-default .navbar-nav>.disabled>a:focus,#virtusize-bookmarklet .navbar-default .navbar-nav>.disabled>a:hover{color:#ccc;background-color:transparent}#virtusize-bookmarklet .navbar-default .navbar-toggle{border-color:#ddd}#virtusize-bookmarklet .navbar-default .navbar-toggle:focus,#virtusize-bookmarklet .navbar-default .navbar-toggle:hover{background-color:#ddd}#virtusize-bookmarklet .navbar-default .navbar-toggle .icon-bar{background-color:#888}#virtusize-bookmarklet .navbar-default .navbar-collapse,#virtusize-bookmarklet .navbar-default .navbar-form{border-color:#e7e7e7}#virtusize-bookmarklet .navbar-default .navbar-nav>.open>a,#virtusize-bookmarklet .navbar-default .navbar-nav>.open>a:focus,#virtusize-bookmarklet .navbar-default .navbar-nav>.open>a:hover{background-color:#e7e7e7;color:#555}@media (max-width:767px){#virtusize-bookmarklet .navbar-default .navbar-nav .open .dropdown-menu>li>a{color:#777}#virtusize-bookmarklet .navbar-default .navbar-nav .open .dropdown-menu>li>a:focus,#virtusize-bookmarklet .navbar-default .navbar-nav .open .dropdown-menu>li>a:hover{color:#333;background-color:transparent}#virtusize-bookmarklet .navbar-default .navbar-nav .open .dropdown-menu>.active>a,#virtusize-bookmarklet .navbar-default .navbar-nav .open .dropdown-menu>.active>a:focus,#virtusize-bookmarklet .navbar-default .navbar-nav .open .dropdown-menu>.active>a:hover{color:#555;background-color:#e7e7e7}#virtusize-bookmarklet .navbar-default .navbar-nav .open .dropdown-menu>.disabled>a,#virtusize-bookmarklet .navbar-default .navbar-nav .open .dropdown-menu>.disabled>a:focus,#virtusize-bookmarklet .navbar-default .navbar-nav .open .dropdown-menu>.disabled>a:hover{color:#ccc;background-color:transparent}}#virtusize-bookmarklet .navbar-default .navbar-link{color:#777}#virtusize-bookmarklet .navbar-default .navbar-link:hover{color:#333}#virtusize-bookmarklet .navbar-default .btn-link{color:#777}#virtusize-bookmarklet .navbar-default .btn-link:focus,#virtusize-bookmarklet .navbar-default .btn-link:hover{color:#333}#virtusize-bookmarklet .navbar-default .btn-link[disabled]:focus,#virtusize-bookmarklet .navbar-default .btn-link[disabled]:hover,fieldset[disabled] #virtusize-bookmarklet .navbar-default .btn-link:focus,fieldset[disabled] #virtusize-bookmarklet .navbar-default .btn-link:hover{color:#ccc}#virtusize-bookmarklet .navbar-inverse{background-color:#222;border-color:#080808}#virtusize-bookmarklet .navbar-inverse .navbar-brand{color:#999}#virtusize-bookmarklet .navbar-inverse .navbar-brand:focus,#virtusize-bookmarklet .navbar-inverse .navbar-brand:hover{color:#fff;background-color:transparent}#virtusize-bookmarklet .navbar-inverse .navbar-nav>li>a,#virtusize-bookmarklet .navbar-inverse .navbar-text{color:#999}#virtusize-bookmarklet .navbar-inverse .navbar-nav>li>a:focus,#virtusize-bookmarklet .navbar-inverse .navbar-nav>li>a:hover{color:#fff;background-color:transparent}#virtusize-bookmarklet .navbar-inverse .navbar-nav>.active>a,#virtusize-bookmarklet .navbar-inverse .navbar-nav>.active>a:focus,#virtusize-bookmarklet .navbar-inverse .navbar-nav>.active>a:hover{color:#fff;background-color:#080808}#virtusize-bookmarklet .navbar-inverse .navbar-nav>.disabled>a,#virtusize-bookmarklet .navbar-inverse .navbar-nav>.disabled>a:focus,#virtusize-bookmarklet .navbar-inverse .navbar-nav>.disabled>a:hover{color:#444;background-color:transparent}#virtusize-bookmarklet .navbar-inverse .navbar-toggle{border-color:#333}#virtusize-bookmarklet .navbar-inverse .navbar-toggle:focus,#virtusize-bookmarklet .navbar-inverse .navbar-toggle:hover{background-color:#333}#virtusize-bookmarklet .navbar-inverse .navbar-toggle .icon-bar{background-color:#fff}#virtusize-bookmarklet .navbar-inverse .navbar-collapse,#virtusize-bookmarklet .navbar-inverse .navbar-form{border-color:#101010}#virtusize-bookmarklet .navbar-inverse .navbar-nav>.open>a,#virtusize-bookmarklet .navbar-inverse .navbar-nav>.open>a:focus,#virtusize-bookmarklet .navbar-inverse .navbar-nav>.open>a:hover{background-color:#080808;color:#fff}@media (max-width:767px){#virtusize-bookmarklet .navbar-inverse .navbar-nav .open .dropdown-menu>.dropdown-header{border-color:#080808}#virtusize-bookmarklet .navbar-inverse .navbar-nav .open .dropdown-menu .divider{background-color:#080808}#virtusize-bookmarklet .navbar-inverse .navbar-nav .open .dropdown-menu>li>a{color:#999}#virtusize-bookmarklet .navbar-inverse .navbar-nav .open .dropdown-menu>li>a:focus,#virtusize-bookmarklet .navbar-inverse .navbar-nav .open .dropdown-menu>li>a:hover{color:#fff;background-color:transparent}#virtusize-bookmarklet .navbar-inverse .navbar-nav .open .dropdown-menu>.active>a,#virtusize-bookmarklet .navbar-inverse .navbar-nav .open .dropdown-menu>.active>a:focus,#virtusize-bookmarklet .navbar-inverse .navbar-nav .open .dropdown-menu>.active>a:hover{color:#fff;background-color:#080808}#virtusize-bookmarklet .navbar-inverse .navbar-nav .open .dropdown-menu>.disabled>a,#virtusize-bookmarklet .navbar-inverse .navbar-nav .open .dropdown-menu>.disabled>a:focus,#virtusize-bookmarklet .navbar-inverse .navbar-nav .open .dropdown-menu>.disabled>a:hover{color:#444;background-color:transparent}}#virtusize-bookmarklet .navbar-inverse .navbar-link{color:#999}#virtusize-bookmarklet .navbar-inverse .navbar-link:hover{color:#fff}#virtusize-bookmarklet .navbar-inverse .btn-link{color:#999}#virtusize-bookmarklet .navbar-inverse .btn-link:focus,#virtusize-bookmarklet .navbar-inverse .btn-link:hover{color:#fff}#virtusize-bookmarklet .navbar-inverse .btn-link[disabled]:focus,#virtusize-bookmarklet .navbar-inverse .btn-link[disabled]:hover,fieldset[disabled] #virtusize-bookmarklet .navbar-inverse .btn-link:focus,fieldset[disabled] #virtusize-bookmarklet .navbar-inverse .btn-link:hover{color:#444}#virtusize-bookmarklet .label{display:inline;padding:.2em .6em .3em;font-size:75%;font-weight:700;line-height:1;color:#fff;text-align:center;white-space:nowrap;vertical-align:baseline;border-radius:.25em}a#virtusize-bookmarklet .label:focus,a#virtusize-bookmarklet .label:hover{color:#fff;text-decoration:none;cursor:pointer}#virtusize-bookmarklet .panel-heading>.dropdown .dropdown-toggle,#virtusize-bookmarklet .panel-title>a{color:inherit}#virtusize-bookmarklet .label:empty{display:none}.btn #virtusize-bookmarklet .label{position:relative;top:-1px}#virtusize-bookmarklet .label-default{background-color:#999}#virtusize-bookmarklet .label-default[href]:focus,#virtusize-bookmarklet .label-default[href]:hover{background-color:grey}#virtusize-bookmarklet .label-primary{background-color:#428bca}#virtusize-bookmarklet .label-primary[href]:focus,#virtusize-bookmarklet .label-primary[href]:hover{background-color:#3071a9}#virtusize-bookmarklet .label-success{background-color:#5cb85c}#virtusize-bookmarklet .label-success[href]:focus,#virtusize-bookmarklet .label-success[href]:hover{background-color:#449d44}#virtusize-bookmarklet .label-info{background-color:#5bc0de}#virtusize-bookmarklet .label-info[href]:focus,#virtusize-bookmarklet .label-info[href]:hover{background-color:#31b0d5}#virtusize-bookmarklet .label-warning{background-color:#f0ad4e}#virtusize-bookmarklet .label-warning[href]:focus,#virtusize-bookmarklet .label-warning[href]:hover{background-color:#ec971f}#virtusize-bookmarklet .label-danger{background-color:#d9534f}#virtusize-bookmarklet .label-danger[href]:focus,#virtusize-bookmarklet .label-danger[href]:hover{background-color:#c9302c}#virtusize-bookmarklet .panel{margin-bottom:20px;background-color:#fff;border:1px solid transparent;border-radius:4px;-webkit-box-shadow:0 1px 1px rgba(0,0,0,.05);box-shadow:0 1px 1px rgba(0,0,0,.05)}#virtusize-bookmarklet .panel-body{padding:15px}#virtusize-bookmarklet .panel-heading{padding:10px 15px;border-bottom:1px solid transparent;border-top-right-radius:3px;border-top-left-radius:3px}#virtusize-bookmarklet .panel-title{margin-top:0;margin-bottom:0;font-size:16px;color:inherit}#virtusize-bookmarklet .panel-footer{padding:10px 15px;background-color:#f5f5f5;border-top:1px solid #ddd;border-bottom-right-radius:3px;border-bottom-left-radius:3px}#virtusize-bookmarklet .panel>.list-group{margin-bottom:0}#virtusize-bookmarklet .panel>.list-group .list-group-item{border-width:1px 0;border-radius:0}#virtusize-bookmarklet .panel-group .panel-heading,#virtusize-bookmarklet .panel>.table-bordered>tbody>tr:first-child>td,#virtusize-bookmarklet .panel>.table-bordered>tbody>tr:first-child>th,#virtusize-bookmarklet .panel>.table-bordered>tbody>tr:last-child>td,#virtusize-bookmarklet .panel>.table-bordered>tbody>tr:last-child>th,#virtusize-bookmarklet .panel>.table-bordered>tfoot>tr:last-child>td,#virtusize-bookmarklet .panel>.table-bordered>tfoot>tr:last-child>th,#virtusize-bookmarklet .panel>.table-bordered>thead>tr:first-child>td,#virtusize-bookmarklet .panel>.table-bordered>thead>tr:first-child>th,#virtusize-bookmarklet .panel>.table-responsive>.table-bordered>tbody>tr:first-child>td,#virtusize-bookmarklet .panel>.table-responsive>.table-bordered>tbody>tr:first-child>th,#virtusize-bookmarklet .panel>.table-responsive>.table-bordered>tbody>tr:last-child>td,#virtusize-bookmarklet .panel>.table-responsive>.table-bordered>tbody>tr:last-child>th,#virtusize-bookmarklet .panel>.table-responsive>.table-bordered>tfoot>tr:last-child>td,#virtusize-bookmarklet .panel>.table-responsive>.table-bordered>tfoot>tr:last-child>th,#virtusize-bookmarklet .panel>.table-responsive>.table-bordered>thead>tr:first-child>td,#virtusize-bookmarklet .panel>.table-responsive>.table-bordered>thead>tr:first-child>th{border-bottom:0}#virtusize-bookmarklet .panel>.list-group:first-child .list-group-item:first-child{border-top:0;border-top-right-radius:3px;border-top-left-radius:3px}#virtusize-bookmarklet .panel>.list-group:last-child .list-group-item:last-child{border-bottom:0;border-bottom-right-radius:3px;border-bottom-left-radius:3px}#virtusize-bookmarklet .panel-heading+.list-group .list-group-item:first-child{border-top-width:0}#virtusize-bookmarklet .panel>.table,#virtusize-bookmarklet .panel>.table-responsive>.table{margin-bottom:0}#virtusize-bookmarklet .panel>.table-responsive:first-child>.table:first-child,#virtusize-bookmarklet .panel>.table:first-child{border-top-right-radius:3px;border-top-left-radius:3px}#virtusize-bookmarklet .panel>.table-responsive:first-child>.table:first-child>tbody:first-child>tr:first-child td:first-child,#virtusize-bookmarklet .panel>.table-responsive:first-child>.table:first-child>tbody:first-child>tr:first-child th:first-child,#virtusize-bookmarklet .panel>.table-responsive:first-child>.table:first-child>thead:first-child>tr:first-child td:first-child,#virtusize-bookmarklet .panel>.table-responsive:first-child>.table:first-child>thead:first-child>tr:first-child th:first-child,#virtusize-bookmarklet .panel>.table:first-child>tbody:first-child>tr:first-child td:first-child,#virtusize-bookmarklet .panel>.table:first-child>tbody:first-child>tr:first-child th:first-child,#virtusize-bookmarklet .panel>.table:first-child>thead:first-child>tr:first-child td:first-child,#virtusize-bookmarklet .panel>.table:first-child>thead:first-child>tr:first-child th:first-child{border-top-left-radius:3px}#virtusize-bookmarklet .panel>.table-responsive:first-child>.table:first-child>tbody:first-child>tr:first-child td:last-child,#virtusize-bookmarklet .panel>.table-responsive:first-child>.table:first-child>tbody:first-child>tr:first-child th:last-child,#virtusize-bookmarklet .panel>.table-responsive:first-child>.table:first-child>thead:first-child>tr:first-child td:last-child,#virtusize-bookmarklet .panel>.table-responsive:first-child>.table:first-child>thead:first-child>tr:first-child th:last-child,#virtusize-bookmarklet .panel>.table:first-child>tbody:first-child>tr:first-child td:last-child,#virtusize-bookmarklet .panel>.table:first-child>tbody:first-child>tr:first-child th:last-child,#virtusize-bookmarklet .panel>.table:first-child>thead:first-child>tr:first-child td:last-child,#virtusize-bookmarklet .panel>.table:first-child>thead:first-child>tr:first-child th:last-child{border-top-right-radius:3px}#virtusize-bookmarklet .panel>.table-responsive:last-child>.table:last-child,#virtusize-bookmarklet .panel>.table:last-child{border-bottom-right-radius:3px;border-bottom-left-radius:3px}#virtusize-bookmarklet .panel>.table-responsive:last-child>.table:last-child>tbody:last-child>tr:last-child td:first-child,#virtusize-bookmarklet .panel>.table-responsive:last-child>.table:last-child>tbody:last-child>tr:last-child th:first-child,#virtusize-bookmarklet .panel>.table-responsive:last-child>.table:last-child>tfoot:last-child>tr:last-child td:first-child,#virtusize-bookmarklet .panel>.table-responsive:last-child>.table:last-child>tfoot:last-child>tr:last-child th:first-child,#virtusize-bookmarklet .panel>.table:last-child>tbody:last-child>tr:last-child td:first-child,#virtusize-bookmarklet .panel>.table:last-child>tbody:last-child>tr:last-child th:first-child,#virtusize-bookmarklet .panel>.table:last-child>tfoot:last-child>tr:last-child td:first-child,#virtusize-bookmarklet .panel>.table:last-child>tfoot:last-child>tr:last-child th:first-child{border-bottom-left-radius:3px}#virtusize-bookmarklet .panel>.table-responsive:last-child>.table:last-child>tbody:last-child>tr:last-child td:last-child,#virtusize-bookmarklet .panel>.table-responsive:last-child>.table:last-child>tbody:last-child>tr:last-child th:last-child,#virtusize-bookmarklet .panel>.table-responsive:last-child>.table:last-child>tfoot:last-child>tr:last-child td:last-child,#virtusize-bookmarklet .panel>.table-responsive:last-child>.table:last-child>tfoot:last-child>tr:last-child th:last-child,#virtusize-bookmarklet .panel>.table:last-child>tbody:last-child>tr:last-child td:last-child,#virtusize-bookmarklet .panel>.table:last-child>tbody:last-child>tr:last-child th:last-child,#virtusize-bookmarklet .panel>.table:last-child>tfoot:last-child>tr:last-child td:last-child,#virtusize-bookmarklet .panel>.table:last-child>tfoot:last-child>tr:last-child th:last-child{border-bottom-right-radius:3px}#virtusize-bookmarklet .panel>.panel-body+.table,#virtusize-bookmarklet .panel>.panel-body+.table-responsive{border-top:1px solid #ddd}#virtusize-bookmarklet .panel>.table>tbody:first-child>tr:first-child td,#virtusize-bookmarklet .panel>.table>tbody:first-child>tr:first-child th{border-top:0}#virtusize-bookmarklet .panel>.table-bordered,#virtusize-bookmarklet .panel>.table-responsive>.table-bordered{border:0}#virtusize-bookmarklet .panel>.table-bordered>tbody>tr>td:first-child,#virtusize-bookmarklet .panel>.table-bordered>tbody>tr>th:first-child,#virtusize-bookmarklet .panel>.table-bordered>tfoot>tr>td:first-child,#virtusize-bookmarklet .panel>.table-bordered>tfoot>tr>th:first-child,#virtusize-bookmarklet .panel>.table-bordered>thead>tr>td:first-child,#virtusize-bookmarklet .panel>.table-bordered>thead>tr>th:first-child,#virtusize-bookmarklet .panel>.table-responsive>.table-bordered>tbody>tr>td:first-child,#virtusize-bookmarklet .panel>.table-responsive>.table-bordered>tbody>tr>th:first-child,#virtusize-bookmarklet .panel>.table-responsive>.table-bordered>tfoot>tr>td:first-child,#virtusize-bookmarklet .panel>.table-responsive>.table-bordered>tfoot>tr>th:first-child,#virtusize-bookmarklet .panel>.table-responsive>.table-bordered>thead>tr>td:first-child,#virtusize-bookmarklet .panel>.table-responsive>.table-bordered>thead>tr>th:first-child{border-left:0}#virtusize-bookmarklet .panel>.table-bordered>tbody>tr>td:last-child,#virtusize-bookmarklet .panel>.table-bordered>tbody>tr>th:last-child,#virtusize-bookmarklet .panel>.table-bordered>tfoot>tr>td:last-child,#virtusize-bookmarklet .panel>.table-bordered>tfoot>tr>th:last-child,#virtusize-bookmarklet .panel>.table-bordered>thead>tr>td:last-child,#virtusize-bookmarklet .panel>.table-bordered>thead>tr>th:last-child,#virtusize-bookmarklet .panel>.table-responsive>.table-bordered>tbody>tr>td:last-child,#virtusize-bookmarklet .panel>.table-responsive>.table-bordered>tbody>tr>th:last-child,#virtusize-bookmarklet .panel>.table-responsive>.table-bordered>tfoot>tr>td:last-child,#virtusize-bookmarklet .panel>.table-responsive>.table-bordered>tfoot>tr>th:last-child,#virtusize-bookmarklet .panel>.table-responsive>.table-bordered>thead>tr>td:last-child,#virtusize-bookmarklet .panel>.table-responsive>.table-bordered>thead>tr>th:last-child{border-right:0}#virtusize-bookmarklet .panel>.table-responsive{border:0;margin-bottom:0}#virtusize-bookmarklet .panel-group{margin-bottom:20px}#virtusize-bookmarklet .panel-group .panel{margin-bottom:0;border-radius:4px}#virtusize-bookmarklet .panel-group .panel+.panel{margin-top:5px}#virtusize-bookmarklet .panel-group .panel-heading+.panel-collapse .panel-body{border-top:1px solid #ddd}#virtusize-bookmarklet .panel-group .panel-footer{border-top:0}#virtusize-bookmarklet .panel-group .panel-footer+.panel-collapse .panel-body{border-bottom:1px solid #ddd}#virtusize-bookmarklet .panel-default{border-color:#ddd}#virtusize-bookmarklet .panel-default>.panel-heading{color:#333;background-color:#f5f5f5;border-color:#ddd}#virtusize-bookmarklet .panel-default>.panel-heading+.panel-collapse>.panel-body{border-top-color:#ddd}#virtusize-bookmarklet .panel-default>.panel-footer+.panel-collapse>.panel-body{border-bottom-color:#ddd}#virtusize-bookmarklet .panel-primary{border-color:#428bca}#virtusize-bookmarklet .panel-primary>.panel-heading{color:#fff;background-color:#428bca;border-color:#428bca}#virtusize-bookmarklet .panel-primary>.panel-heading+.panel-collapse>.panel-body{border-top-color:#428bca}#virtusize-bookmarklet .panel-primary>.panel-footer+.panel-collapse>.panel-body{border-bottom-color:#428bca}#virtusize-bookmarklet .panel-success{border-color:#d6e9c6}#virtusize-bookmarklet .panel-success>.panel-heading{color:#3c763d;background-color:#dff0d8;border-color:#d6e9c6}#virtusize-bookmarklet .panel-success>.panel-heading+.panel-collapse>.panel-body{border-top-color:#d6e9c6}#virtusize-bookmarklet .panel-success>.panel-footer+.panel-collapse>.panel-body{border-bottom-color:#d6e9c6}#virtusize-bookmarklet .panel-info{border-color:#bce8f1}#virtusize-bookmarklet .panel-info>.panel-heading{color:#31708f;background-color:#d9edf7;border-color:#bce8f1}#virtusize-bookmarklet .panel-info>.panel-heading+.panel-collapse>.panel-body{border-top-color:#bce8f1}#virtusize-bookmarklet .panel-info>.panel-footer+.panel-collapse>.panel-body{border-bottom-color:#bce8f1}#virtusize-bookmarklet .panel-warning{border-color:#faebcc}#virtusize-bookmarklet .panel-warning>.panel-heading{color:#8a6d3b;background-color:#fcf8e3;border-color:#faebcc}#virtusize-bookmarklet .panel-warning>.panel-heading+.panel-collapse>.panel-body{border-top-color:#faebcc}#virtusize-bookmarklet .panel-warning>.panel-footer+.panel-collapse>.panel-body{border-bottom-color:#faebcc}#virtusize-bookmarklet .panel-danger{border-color:#ebccd1}#virtusize-bookmarklet .panel-danger>.panel-heading{color:#a94442;background-color:#f2dede;border-color:#ebccd1}#virtusize-bookmarklet .panel-danger>.panel-heading+.panel-collapse>.panel-body{border-top-color:#ebccd1}#virtusize-bookmarklet .panel-danger>.panel-footer+.panel-collapse>.panel-body{border-bottom-color:#ebccd1}#virtusize-bookmarklet .close{float:right;font-size:21px;font-weight:700;line-height:1;color:#000;text-shadow:0 1px 0 #fff;opacity:.2;filter:alpha(opacity=20)}#virtusize-bookmarklet .close:focus,#virtusize-bookmarklet .close:hover{color:#000;text-decoration:none;cursor:pointer;opacity:.5;filter:alpha(opacity=50)}#virtusize-bookmarklet button.close{padding:0;cursor:pointer;background:0 0;border:0;-webkit-appearance:none}#virtusize-bookmarklet .modal-open{overflow:hidden}#virtusize-bookmarklet .modal{display:none;overflow:auto;overflow-y:scroll;position:fixed;top:0;right:0;bottom:0;left:0;z-index:1050;-webkit-overflow-scrolling:touch;outline:0}#virtusize-bookmarklet .modal.fade .modal-dialog{-webkit-transform:translate(0,-25%);-ms-transform:translate(0,-25%);-o-transform:translate(0,-25%);transform:translate(0,-25%);-webkit-transition:-webkit-transform .3s ease-out;-moz-transition:-moz-transform .3s ease-out;-o-transition:-o-transform .3s ease-out;transition:transform .3s ease-out}#virtusize-bookmarklet .modal.in .modal-dialog{-webkit-transform:translate(0,0);-ms-transform:translate(0,0);-o-transform:translate(0,0);transform:translate(0,0)}#virtusize-bookmarklet .modal-dialog{position:relative;width:auto;margin:10px}#virtusize-bookmarklet .modal-content{position:relative;background-color:#fff;border:1px solid #999;border:1px solid rgba(0,0,0,.2);border-radius:6px;-webkit-box-shadow:0 3px 9px rgba(0,0,0,.5);box-shadow:0 3px 9px rgba(0,0,0,.5);background-clip:padding-box;outline:0}#virtusize-bookmarklet .modal-backdrop{position:fixed;top:0;right:0;bottom:0;left:0;z-index:1040;background-color:#000}#virtusize-bookmarklet .modal-backdrop.fade{opacity:0;filter:alpha(opacity=0)}#virtusize-bookmarklet .modal-backdrop.in{opacity:.5;filter:alpha(opacity=50)}#virtusize-bookmarklet .modal-header{padding:15px;border-bottom:1px solid #e5e5e5;min-height:16.43px}#virtusize-bookmarklet .modal-header .close{margin-top:-2px}#virtusize-bookmarklet .modal-title{margin:0;line-height:1.42857143}#virtusize-bookmarklet .modal-body{position:relative;padding:15px}#virtusize-bookmarklet .modal-footer{padding:15px;text-align:right;border-top:1px solid #e5e5e5}#virtusize-bookmarklet .modal-footer .btn+.btn{margin-left:5px;margin-bottom:0}#virtusize-bookmarklet .modal-footer .btn-group .btn+.btn{margin-left:-1px}#virtusize-bookmarklet .modal-footer .btn-block+.btn-block{margin-left:0}#virtusize-bookmarklet .modal-scrollbar-measure{position:absolute;top:-9999px;width:50px;height:50px;overflow:scroll}@media (min-width:768px){#virtusize-bookmarklet .modal-dialog{width:600px;margin:30px auto}#virtusize-bookmarklet .modal-content{-webkit-box-shadow:0 5px 15px rgba(0,0,0,.5);box-shadow:0 5px 15px rgba(0,0,0,.5)}#virtusize-bookmarklet .modal-sm{width:300px}}@media (min-width:992px){#virtusize-bookmarklet .modal-lg{width:900px}}#virtusize-bookmarklet #virtusize-bookmarklet .btn-group-vertical>.btn-group:after,#virtusize-bookmarklet #virtusize-bookmarklet .btn-group-vertical>.btn-group:before,#virtusize-bookmarklet #virtusize-bookmarklet .btn-toolbar:after,#virtusize-bookmarklet #virtusize-bookmarklet .btn-toolbar:before,#virtusize-bookmarklet #virtusize-bookmarklet .container-fluid:after,#virtusize-bookmarklet #virtusize-bookmarklet .container-fluid:before,#virtusize-bookmarklet #virtusize-bookmarklet .container:after,#virtusize-bookmarklet #virtusize-bookmarklet .container:before,#virtusize-bookmarklet #virtusize-bookmarklet .dl-horizontal dd:after,#virtusize-bookmarklet #virtusize-bookmarklet .dl-horizontal dd:before,#virtusize-bookmarklet #virtusize-bookmarklet .form-horizontal .form-group:after,#virtusize-bookmarklet #virtusize-bookmarklet .form-horizontal .form-group:before,#virtusize-bookmarklet #virtusize-bookmarklet .modal-footer:after,#virtusize-bookmarklet #virtusize-bookmarklet .modal-footer:before,#virtusize-bookmarklet #virtusize-bookmarklet .nav:after,#virtusize-bookmarklet #virtusize-bookmarklet .nav:before,#virtusize-bookmarklet #virtusize-bookmarklet .navbar-collapse:after,#virtusize-bookmarklet #virtusize-bookmarklet .navbar-collapse:before,#virtusize-bookmarklet #virtusize-bookmarklet .navbar-header:after,#virtusize-bookmarklet #virtusize-bookmarklet .navbar-header:before,#virtusize-bookmarklet #virtusize-bookmarklet .navbar:after,#virtusize-bookmarklet #virtusize-bookmarklet .navbar:before,#virtusize-bookmarklet #virtusize-bookmarklet .panel-body:after,#virtusize-bookmarklet #virtusize-bookmarklet .panel-body:before,#virtusize-bookmarklet #virtusize-bookmarklet .row:after,#virtusize-bookmarklet #virtusize-bookmarklet .row:before,#virtusize-bookmarklet .clearfix:after,#virtusize-bookmarklet .clearfix:before{content:" ";display:table}#virtusize-bookmarklet #virtusize-bookmarklet .btn-group-vertical>.btn-group:after,#virtusize-bookmarklet #virtusize-bookmarklet .btn-toolbar:after,#virtusize-bookmarklet #virtusize-bookmarklet .container-fluid:after,#virtusize-bookmarklet #virtusize-bookmarklet .container:after,#virtusize-bookmarklet #virtusize-bookmarklet .dl-horizontal dd:after,#virtusize-bookmarklet #virtusize-bookmarklet .form-horizontal .form-group:after,#virtusize-bookmarklet #virtusize-bookmarklet .modal-footer:after,#virtusize-bookmarklet #virtusize-bookmarklet .nav:after,#virtusize-bookmarklet #virtusize-bookmarklet .navbar-collapse:after,#virtusize-bookmarklet #virtusize-bookmarklet .navbar-header:after,#virtusize-bookmarklet #virtusize-bookmarklet .navbar:after,#virtusize-bookmarklet #virtusize-bookmarklet .panel-body:after,#virtusize-bookmarklet #virtusize-bookmarklet .row:after,#virtusize-bookmarklet .clearfix:after{clear:both}#virtusize-bookmarklet .center-block{display:block;margin-left:auto;margin-right:auto}#virtusize-bookmarklet .pull-right{float:right!important}#virtusize-bookmarklet .pull-left{float:left!important}#virtusize-bookmarklet .hide{display:none!important}#virtusize-bookmarklet .show{display:block!important}#virtusize-bookmarklet .invisible{visibility:hidden}#virtusize-bookmarklet .text-hide{font:0/0 a;color:transparent;text-shadow:none;background-color:transparent;border:0}#virtusize-bookmarklet .hidden{display:none!important;visibility:hidden!important}#virtusize-bookmarklet .affix{position:fixed}#virtusize-bookmarklet #vs-panels form.form-inline input[type=text]{display:block;width:100%;height:34px;padding:6px 12px;font-size:14px;line-height:1.42857143;color:#555;background-color:#fff;background-image:none;border:1px solid #ccc;border-radius:4px;-webkit-box-shadow:inset 0 1px 1px rgba(0,0,0,.075);box-shadow:inset 0 1px 1px rgba(0,0,0,.075);-webkit-transition:border-color ease-in-out .15s,box-shadow ease-in-out .15s;-o-transition:border-color ease-in-out .15s,box-shadow ease-in-out .15s;transition:border-color ease-in-out .15s,box-shadow ease-in-out .15s}#virtusize-bookmarklet #vs-panels form.form-inline input[type=text]:focus{border-color:#66afe9;outline:0;-webkit-box-shadow:inset 0 1px 1px rgba(0,0,0,.075),0 0 8px rgba(102,175,233,.6);box-shadow:inset 0 1px 1px rgba(0,0,0,.075),0 0 8px rgba(102,175,233,.6)}#virtusize-bookmarklet #vs-panels form.form-inline input[type=text]::-moz-placeholder{color:#999;opacity:1}#virtusize-bookmarklet #vs-panels form.form-inline input[type=text]:-ms-input-placeholder{color:#999}#virtusize-bookmarklet #vs-panels form.form-inline input[type=text]::-webkit-input-placeholder{color:#999}#virtusize-bookmarklet #vs-panels form.form-inline input[type=text][disabled],#virtusize-bookmarklet #vs-panels form.form-inline input[type=text][readonly],fieldset[disabled] #virtusize-bookmarklet #vs-panels form.form-inline input[type=text]{cursor:not-allowed;background-color:#eee;opacity:1}textarea#virtusize-bookmarklet #vs-panels form.form-inline input[type=text]{height:auto}#virtusize-bookmarklet{z-index:2147483647}#virtusize-bookmarklet *{z-index:2147483647;font-size:14px;text-transform:none;font-family:"Helvetica Neue",Helvetica,Arial,sans-serif!important}#virtusize-bookmarklet dl,#virtusize-bookmarklet ol,#virtusize-bookmarklet ul{font-size:auto}#virtusize-bookmarklet .btn,#virtusize-bookmarklet .label,#virtusize-bookmarklet input{width:auto;height:auto}#virtusize-bookmarklet .navbar-brand{padding-top:7px;padding-bottom:0;line-height:40px}#virtusize-bookmarklet .navbar-brand .logo{vertical-align:top;background:0 0;height:40px;width:40px;margin:0;padding:0}#virtusize-bookmarklet .navbar-collapse{background-color:transparent}#virtusize-bookmarklet .panel-virtusize{position:fixed;bottom:50px;left:15px;right:15px;-webkit-box-shadow:0 3px 9px rgba(0,0,0,.5);box-shadow:0 3px 9px rgba(0,0,0,.5);display:none}#virtusize-bookmarklet .panel-title .close{line-height:14px}#virtusize-bookmarklet .navbar-nav>li>.close{line-height:16px}@media screen and (max-width:767px){#virtusize-bookmarklet .navbar-nav>li>.close{float:left}}#virtusize-bookmarklet .vs-status .label{margin-left:5px;margin-right:5px}#virtusize-bookmarklet .navbar-nav .label{margin-top:15px;margin-bottom:15px;padding:.4em .6em .5em}@media (min-width:768px){#virtusize-bookmarklet .navbar-nav .label{float:left}#virtusize-bookmarklet .navbar-nav .label.navbar-right:last-child{margin-right:0}}#virtusize-bookmarklet .form-inline{margin-bottom:15px;display:block}';
  override.jQueryCDN = 'https://ajax.googleapis.com/ajax/libs/jquery/1.11.1/jquery.min.js';
  override.bootstrapCDN = 'https://netdna.bootstrapcdn.com/bootstrap/3.3.6/js/bootstrap.min.js';
  override.snippet = '!function(a,b,c,d,e,f,g){var h,i,j,k;for(a.Virtusize=e,a[e]=a[e]||[],a[e].methods=["setApiKey","setRegion","setLanguage","setWidgetOverlayColor","addWidget","ready","on","setAvailableSizes","setSizeAliases","addOrder","setUserId"],a[e].factory=function(b){return function(){var c;return c=Array.prototype.slice.call(arguments),c.unshift(b),a[e].push(c),a[e]}},k=a[e].methods,i=0,j=k.length;j>i;i++)h=k[i],a[e][h]=a[e].factory(h);a[e].snippetVersion="3.0.2",f=b.createElement(c),g=b.getElementsByTagName(c)[0],f.async=1,f.src=("https:"===a.location.protocol?"https://":"http://")+d,f.id="vs-integration",g.parentNode.insertBefore(f,g)}';
  override.utilIFrameName = "virtusize-util-iframe";
  override.tldRegex = /[^.]*\.([^.]*|..\...|...\...)$/;
  override.bidCookieKey = "vs.bid";
  override.envs = {
    staging: "staging.virtusize.com",
    develop: "develop.virtusize.com",
    translations: "translations.virtusize.com",
    api: "api.virtusize.com",
    www: "www.virtusize.com"
  };
  override.languages = ['default', 'en', 'de', 'es', 'fr', 'it', 'ja', 'nl', 'pt', 'sv'];
  regions = ["default", "AT", "AU", "DE", "DK", "ES", "EU", "FI", "FR", "GB", "IT", "JP", "NL", "NO", "RU", "SE", "US"];
  override.init = function() {
    override.registerHandlebarsHelpers();
    return override.loadScript(override.jQueryCDN, function() {
      $ = window.jQueryVS = jQuery.noConflict(true);
      window.initTransition($);
      window.initCollapse($);
      override.injectStyle();
      override.injectMarkup();
      override.render();
      override.hide(true);
      return override.initParams();
    });
  };
  override.initParams = function() {
    var url;
    url = override.getUrlParam('vsUrl');
    if (url != null) {
      override.envs['custom'] = url;
      return override.loadIntegrationScript('custom', false);
    }
  };
  override.injectStyle = function() {
    var style;
    style = $('<style id="virtusize-bookmarklet-styles"></style>');
    style.attr('type', 'text/css');
    style.html(override.styles);
    return style.appendTo($('head'));
  };
  override.injectMarkup = function() {
    override.div = $('<div id="virtusize-bookmarklet"></div>');
    return override.div.appendTo($("body"));
  };
  override.show = function(fast) {
    var navbar;
    if (fast == null) {
      fast = false;
    }
    navbar = override.div.find('.navbar');
    if (fast) {
      return navbar.show();
    } else {
      return navbar.fadeIn();
    }
  };
  override.hide = function(fast) {
    var navbar, panels;
    if (fast == null) {
      fast = false;
    }
    navbar = override.div.find('.navbar');
    panels = override.div.find('.panel');
    if (fast) {
      navbar.hide();
      return panels.hide();
    } else {
      navbar.fadeOut();
      return panels.fadeOut();
    }
  };
  override.open = function() {
    return setTimeout(function() {
      return override.show();
    }, 200);
  };
  override.close = function() {
    override.hide();
    return setTimeout(function() {
      override.remove();
      override.removeUtilIframe();
      return $('vs-bookmarklet').remove();
    }, 300);
  };
  override.remove = function() {
    override.div.remove();
    return override.div = null;
  };
  override.showPanel = function(panel, fast) {
    var panelLink, panelLinks, panels;
    if (fast == null) {
      fast = false;
    }
    panelLink = override.div.find('.navbar [data-toggle="panel"][data-target="' + panel + '"]');
    panelLinks = override.div.find('.navbar [data-toggle="panel"]');
    panels = override.div.find('.panel');
    panel = override.div.find(panel);
    panels.removeClass('in');
    panel.addClass('in');
    if (fast) {
      panels.hide();
      panel.show();
    } else {
      panels.fadeOut();
      panel.fadeIn();
    }
    panelLinks.parent().removeClass('active');
    return panelLink.parent().addClass('active');
  };
  override.hidePanel = function(panel, fast) {
    var panelLink;
    if (fast == null) {
      fast = false;
    }
    panelLink = override.div.find('.navbar [data-toggle="panel"][data-target="' + panel + '"]');
    panel = override.div.find(panel);
    panel.removeClass('in');
    if (fast) {
      panel.hide();
    } else {
      panel.fadeOut();
    }
    return panelLink.parent().removeClass('active');
  };
  override.togglePanel = function(panel) {
    panel = override.div.find(panel);
    if (panel.hasClass('in')) {
      return override.hidePanel(panel);
    } else {
      return override.showPanel(panel);
    }
  };
  override.registerHandlers = function() {
    override.div.on('click', '[data-toggle="panel"]', function(ev) {
      var target;
      ev.preventDefault();
      target = override.div.find(ev.target);
      return override.togglePanel(target.data('target'));
    });
    override.div.on('click', '.navbar .close', function(ev) {
      ev.preventDefault();
      return override.close();
    });
    override.div.on('click', '#panel-widgets [data-toggle="widget"]', function(ev) {
      var id, target;
      ev.preventDefault();
      target = override.div.find(ev.target);
      id = target.data('target');
      return window[Virtusize].getWidget(id).open();
    });
    override.div.on('click', '#panel-integrate [data-action="integrate-env"]', function(ev) {
      var env, target;
      ev.preventDefault();
      target = override.div.find(ev.target);
      env = target.data('target');
      override.loadIntegrationScript(env);
      override.div.find('#panel-integrate [data-action="integrate-env"]').removeClass('btn-primary').addClass('btn-default');
      return target.addClass('btn-primary');
    });
    override.div.on('click', '[data-action="fill-input-field"]', function(ev) {
      var input, target, value;
      ev.preventDefault();
      target = override.div.find(ev.target);
      input = target.data('target');
      value = target.data('value');
      return override.div.find(input).val(value);
    });
    override.div.on('click', '#panel-purchase [data-action="reset-bid"]', function(ev) {
      ev.preventDefault();
      return override.resetBid();
    });
    override.div.on('submit', 'form[data-action="add-widget"]', function(ev) {
      var target;
      ev.preventDefault();
      target = override.div.find(ev.target);
      window[Virtusize].addWidget({
        productId: target.find('[name="productId"]').val(),
        buttonSelector: target.find('[name="buttonSelector"]').val(),
        language: target.find('[name="language"]').val(),
        productImageUrl: target.find('[name="productImageUrl"]').val()
      });
      return window.setTimeout(function() {
        return override.refresh('#panel-integrate');
      }, 700);
    });
    override.div.on('submit', 'form[data-action="add-order"]', function(ev) {
      var orderItem, target;
      ev.preventDefault();
      target = override.div.find(ev.target);
      orderItem = {
        productId: target.find('[name="productId"]').val(),
        size: target.find('[name="size"]').val(),
        sizeAlias: target.find('[name="sizeAlias"]').val(),
        imageUrl: target.find('[name="imageUrl"]').val()
      };
      override.purchase(orderItem);
      return window.setTimeout(function() {
        return override.refresh('#panel-orders');
      }, 300);
    });
    override.div.on('click', '#panel-tooltip [data-action="open-tooltip"]', function(ev) {
      var id, target, widget;
      ev.preventDefault();
      target = override.div.find(ev.target);
      id = target.data('target');
      widget = window[Virtusize].getWidget(id);
      widget.setTooltipEnabled(true);
      widget.on('backend-checked-purchase-history', function() {
        this.setDebugTooltipData();
        return this.openTooltip();
      });
      return widget.checkPurchaseHistory();
    });
    override.div.on('click', '#panel-tooltip [data-action="toggle-tooltip-style"]', function(ev) {
      ev.preventDefault();
      return $('.vs-tooltip').toggleClass('vs-tooltip-light');
    });
    return override.div.on('click', '#panel-tooltip #mobile-widget-buttons .btn', function(ev) {
      ev.preventDefault();
      window[Virtusize].setMobile($(this).data('value'));
      $('#panel-tooltip #mobile-widget-buttons .btn').removeClass('active');
      return $(this).addClass('active');
    });
  };
  override.render = function() {
    override.registerHandlers();
    override.renderNav();
    override.renderPanels();
    override.setIntegrationStatus();
    return override.open();
  };
  override.refresh = function(backToPanel) {
    override.renderNav();
    override.renderPanels();
    override.setIntegrationStatus();
    override.show(true);
    if ((backToPanel != null) && backToPanel) {
      return override.showPanel(backToPanel, true);
    }
  };
  override.renderNav = function() {
    return override.div.html(global.templates["src/templates/bookmarklet.handlebars"]({
      panelLinks: override.getPanelLinksData()
    }));
  };
  override.renderPanels = function() {
    var env, panelLinks;
    override.div.find('#vs-panels').remove();
    panelLinks = override.div.find('.navbar [data-toggle="panel"]');
    panelLinks.parent().removeClass('active');
    override.div.append(global.templates["src/templates/panels.handlebars"]({
      panels: override.getPanelData()
    }));
    if (override.hasIntegrated()) {
      env = override.detectEnvironment();
      return override.div.find('#panel-integrate [data-action="integrate-env"][data-target="' + env + '"]').removeClass('btn-default').addClass('btn-primary');
    }
  };
  override.setStatus = function(statuses) {
    var i, len, s, status;
    status = override.div.find('.vs-status');
    status.html('');
    status.hide();
    for (i = 0, len = statuses.length; i < len; i++) {
      s = statuses[i];
      status.append($('<span class="label label-' + s.type + '">' + s.label + '</span> '));
    }
    return status.fadeIn();
  };
  override.setIntegrationStatus = function() {
    if (override.hasIntegrated()) {
      return override.setStatus([
        {
          label: 'integrated',
          type: 'success'
        }, {
          label: override.detectEnvironment(),
          type: 'default'
        }
      ]);
    } else {
      return override.setStatus([
        {
          label: 'not integrated',
          type: 'warning'
        }
      ]);
    }
  };
  override.hasIntegrated = function() {
    return (typeof Virtusize !== "undefined" && Virtusize !== null) && typeof Virtusize === 'string' && 'integrationVersion' in window[Virtusize];
  };
  override.detectEnvironment = function() {
    var k, m, ref, v;
    m = $('#vs-integration').attr('src').match(/https?\:\/\/(.*\.virtusize\.com)/);
    ref = override.envs;
    for (k in ref) {
      v = ref[k];
      if (v === m[1]) {
        return k;
      }
    }
    return 'other';
  };
  override.getPanelData = function() {
    var panels;
    panels = {
      integrate: {
        id: 'panel-integrate',
        title: 'Integrate',
        askForApiKey: !override.hasIntegrated()
      },
      orders: {
        id: 'panel-orders',
        title: 'Orders'
      },
      widgets: {
        id: 'panel-widgets',
        title: 'Widgets'
      },
      debug: {
        id: 'panel-debug',
        title: 'Debug'
      },
      purchase: {
        id: 'panel-purchase',
        title: 'Purchase'
      },
      tooltip: {
        id: 'panel-tooltip',
        title: 'Settings'
      }
    };
    if (override.hasIntegrated()) {
      $.extend(panels.debug, {
        apiKey: window[Virtusize].apiKey,
        bid: window[Virtusize].bid,
        snippetVersion: window[Virtusize].snippetVersion,
        integrationVersion: window[Virtusize].integrationVersion,
        jQueryVersion: jQuery().jquery,
        isModernBrowser: "" + window[Virtusize].isModernBrowser,
        cookiesDisabled: "" + window[Virtusize].environment.cookiesDisabled,
        numberOfWidgets: Object.keys(window[Virtusize].widgets).length,
        numberOfOrders: Object.keys(window[Virtusize].orders).length,
        location: window.location.href
      });
      $.extend(panels.widgets, {
        widgets: window[Virtusize].widgets
      });
      $.extend(panels.orders, {
        orders: window[Virtusize].orders
      });
      $.extend(panels.integrate, {
        hasWidgets: Object.keys(window[Virtusize].widgets).length > 0,
        widgets: window[Virtusize].widgets,
        isDemoStore: window[Virtusize].apiKey === '15cc36e1d7dad62b8e11722ce1a245cb6c5e6692',
        ogpImageUrl: override.getOgpImage()
      });
      $.extend(panels.purchase, {
        bid: window[Virtusize].bid,
        widgets: window[Virtusize].widgets,
        ogpImageUrl: override.getOgpImage(),
        isDemoStore: window[Virtusize].apiKey === '15cc36e1d7dad62b8e11722ce1a245cb6c5e6692'
      });
      $.extend(panels.tooltip, {
        widgets: window[Virtusize].widgets
      });
    }
    return panels;
  };
  override.getPanelLinksData = function() {
    var panelLinks;
    panelLinks = [];
    if (override.hasIntegrated()) {
      if ((Object.keys(window[Virtusize].orders).length === 0 && Object.keys(window[Virtusize].widgets).length === 0) || (Object.keys(window[Virtusize].widgets).length > 0)) {
        panelLinks.push({
          id: 'panel-integrate',
          title: 'Integrate'
        });
      }
      if (Object.keys(window[Virtusize].widgets).length > 0) {
        panelLinks.push({
          id: 'panel-purchase',
          title: 'Purchase'
        });
        panelLinks.push({
          id: 'panel-widgets',
          title: 'Widgets'
        });
      }
      if (Object.keys(window[Virtusize].orders).length > 0) {
        panelLinks.push({
          id: 'panel-orders',
          title: 'Orders'
        });
      }
      panelLinks.push({
        id: 'panel-tooltip',
        title: 'Settings'
      });
      panelLinks.push({
        id: 'panel-debug',
        title: 'Debug'
      });
    } else {
      panelLinks.push({
        id: 'panel-integrate',
        title: 'Integrate'
      });
    }
    return panelLinks;
  };
  override.loadScript = function(uri, callback) {
    var firstScript, s, script;
    s = "script";
    firstScript = document.getElementsByTagName(s)[0];
    script = document.createElement(s);
    script.async = true;
    script.type = "text/javascript";
    script.src = uri;
    script.onload = script.onreadystatechange = function(ignore, isAbort) {
      if (isAbort || !script.readyState || /loaded|complete/.test(script.readyState)) {
        script.onload = script.onreadystatechange = null;
        if (script.parentNode) {
          script.parentNode.removeChild(script);
        }
        script = undefined;
        if (!isAbort) {
          return callback();
        }
      }
    };
    firstScript.parentNode.insertBefore(script, firstScript);
    return script;
  };
  override.loadIntegrationScript = function(env, panel) {
    var apiKey, script;
    if (panel == null) {
      panel = "#panel-integrate";
    }
    $('#vs-integration').remove();
    override.removeUtilIframe();
    if (override.hasIntegrated()) {
      override.previousVs = window[Virtusize];
      override.removeButtonEventHandlers(override.previousVs);
      window[Virtusize] = null;
    } else {
      apiKey = override.div.find('#integrate-apiKey').val();
    }
    console.log('Integrating with: ' + override.envs[env]);
    script = $('<script type="text/javascript"></script>');
    script.text(override.snippet + '(window,document,"script","' + override.envs[env] + '/integration/v3.source.js","vs");');
    $('head').append(script);
    window[Virtusize].setApiKey(override.previousVs != null ? override.previousVs.apiKey : apiKey);
    if (override.previousVs != null) {
      override.addAllWidgets(override.previousVs);
    }
    return window.setTimeout(function() {
      return override.refresh(panel);
    }, 1000);
  };
  override.removeUtilIframe = function() {
    return $("iframe[name=\"virtusize-util-iframe\"]").remove();
  };
  override.removeButtonEventHandlers = function(vs) {
    var productId, ref, results1, widget;
    ref = vs.widgets;
    results1 = [];
    for (productId in ref) {
      widget = ref[productId];
      widget.buttons.unbind("click.virtusize");
      results1.push(widget.buttons.hide());
    }
    return results1;
  };
  override.addAllWidgets = function(vs) {
    var productId, ref, results1, widget;
    ref = vs.widgets;
    results1 = [];
    for (productId in ref) {
      widget = ref[productId];
      results1.push(window[Virtusize].addWidget(override.widgetToObject(widget)));
    }
    return results1;
  };
  override.widgetToObject = function(widget) {
    return {
      productId: widget.getProductId(),
      productImageUrl: widget.getProductImageUrl(),
      buttonSelector: widget.getButtonSelector(),
      productVersion: widget.getProductVersion(),
      region: widget.getRegion(),
      language: widget.getLanguage(),
      availableSizes: widget.getAvailableSizes(),
      sizeAliases: widget.getSizeAliases()
    };
  };
  override.purchase = function(orderItem) {
    return window[Virtusize].addOrder({
      orderId: new Date().getTime(),
      userId: window[Virtusize].bid,
      items: [orderItem]
    });
  };
  override.resetBid = function() {
    var ev, host, iframe, utilIFrame;
    override.removeBid();
    iframe = $('iframe[name="' + override.utilIFrameName + '"]');
    host = iframe.attr('src').match(/(^.*)\/integration\/v3/)[1];
    utilIFrame = iframe[0].contentWindow;
    ev = {
      url: '/integration/v3/destroy-session-hash?apiKey=' + window[Virtusize].apiKey,
      type: 'POST',
      name: 'integration-reset-bid'
    };
    utilIFrame.postMessage(JSON.stringify(ev), host);
    return window.setTimeout(function() {
      return override.loadIntegrationScript(override.detectEnvironment(), '#panel-purchase');
    }, 500);
  };
  override.writeCookie = function(key, value, options) {
    var days, t;
    if ((value != null) && !$.isFunction(value)) {
      options = $.extend({
        expires: 1,
        path: "/"
      }, options);
      if (typeof options.expires === "number") {
        days = options.expires;
        t = options.expires = new Date();
        t.setDate(t.getDate() + days);
      }
      return (document.cookie = [encodeURIComponent(key), "=", String(value), (options.expires ? "; expires=" + options.expires.toUTCString() : ""), (options.path ? "; path=" + options.path : ""), (options.domain ? "; domain=" + options.domain : ""), (options.secure ? "; secure" : "")].join(""));
    }
    return null;
  };
  override.readCookie = function(key) {
    var cookie, cookies, i, len, name, parts;
    cookies = (document.cookie ? document.cookie.split("; ") : []);
    for (i = 0, len = cookies.length; i < len; i++) {
      cookie = cookies[i];
      parts = cookie.split("=");
      name = decodeURIComponent(parts.shift());
      if ((key != null) && key === name) {
        return parts.join("=");
      }
    }
    return null;
  };
  override.removeCookie = function(key, options) {
    if (override.readCookie(key === null)) {
      return false;
    }
    override.writeCookie(key, "", $.extend({}, options, {
      expires: -1
    }));
    return !override.readCookie(key);
  };
  override.removeBid = function() {
    override.removeCookie(override.bidCookieKey, {
      domain: override.tld(window.location.hostname)
    });
    return override.removeCookie(override.bidCookieKey, {
      domain: '.virtusize.com'
    });
  };

  /*
  Identifies the current top level domain by a regex. This regex is only
  considering the amount of characters in the domain and will not work
  properly for domains shorter than 3 characters.
  
  The regex is from https://github.com/rails/rails/blob/master/actionpack/lib/action_dispatch/middleware/cookies.rb
  
  This regular expression is used to split the levels of a domain.
  The top level domain can be any string without a period or
  .**, ***.** style TLDs like co.uk or com.au
  
  www.example.co.uk gives:
  $& => example.co.uk
  
  example.com gives:
  $& => example.com
  
  lots.of.subdomains.example.local gives:
  $& => example.local
   */
  override.tld = function(hostname) {
    var match;
    match = hostname.match(override.tldRegex);
    if (match) {
      return "." + match[0];
    } else {
      return hostname;
    }
  };
  override.getOgpImage = function() {
    var data, image;
    data = ogp.parse();
    if ('image' in data) {
      image = data.image;
    } else if ('image_url' in data) {
      image = data.image_url;
    }
    if ($.isArray(image)) {
      return image[0];
    } else {
      return image;
    }
  };
  override.registerHandlebarsHelpers = function() {
    Handlebars.registerHelper('language_select_box', function() {
      var i, lang, len, ref, str;
      str = '<select name="language" class="form-control">';
      ref = override.languages;
      for (i = 0, len = ref.length; i < len; i++) {
        lang = ref[i];
        str += '<option value="' + lang + '"' + ((typeof this !== "undefined" && this !== null) && this.language === lang ? ' selected' : '') + '>' + lang + '</option>';
      }
      str += '</select>';
      return new Handlebars.SafeString(str);
    });
    Handlebars.registerHelper('mobileButtonClass', function() {
      if (this.mobile) {
        return ' active';
      } else {
        return '';
      }
    });
    return Handlebars.registerHelper('desktopButtonClass', function() {
      if (!this.mobile) {
        return ' active';
      } else {
        return '';
      }
    });
  };
  override.getUrlParam = function(name) {
    var regex, results;
    name = name.replace(/[\[]/, "\\[").replace(/[\]]/, "\\]");
    regex = new RegExp("[\\?&]" + name + "=([^&#]*)");
    results = regex.exec(location.search);
    if (results != null) {
      return decodeURIComponent(results[1].replace(/\+/g, " "));
    } else {
      return null;
    }
  };
  return override;
})(override || {});

this["templates"] = this["templates"] || {};

Handlebars.registerPartial("panel_debug", Handlebars.template(function (Handlebars,depth0,helpers,partials,data) {
  this.compilerInfo = [4,'>= 1.0.0'];
helpers = this.merge(helpers, Handlebars.helpers); data = data || {};
  var buffer = "", stack1, helper, functionType="function", escapeExpression=this.escapeExpression;


  buffer += "<div id=\"";
  if (helper = helpers.id) { stack1 = helper.call(depth0, {hash:{},data:data}); }
  else { helper = (depth0 && depth0.id); stack1 = typeof helper === functionType ? helper.call(depth0, {hash:{},data:data}) : helper; }
  buffer += escapeExpression(stack1)
    + "\" class=\"panel panel-default panel-virtusize\">\n    <div class=\"panel-heading\">\n        <h3 class=\"panel-title\">\n            ";
  if (helper = helpers.title) { stack1 = helper.call(depth0, {hash:{},data:data}); }
  else { helper = (depth0 && depth0.title); stack1 = typeof helper === functionType ? helper.call(depth0, {hash:{},data:data}) : helper; }
  buffer += escapeExpression(stack1)
    + "\n            <a href=\"#\" class=\"close\" data-toggle=\"panel\" data-target=\"#";
  if (helper = helpers.id) { stack1 = helper.call(depth0, {hash:{},data:data}); }
  else { helper = (depth0 && depth0.id); stack1 = typeof helper === functionType ? helper.call(depth0, {hash:{},data:data}) : helper; }
  buffer += escapeExpression(stack1)
    + "\">&times;</a>\n        </h3>\n    </div>\n    <div class=\"panel-body\">\n        <div class=\"container\">\n            <div class=\"row\">\n                <div class=\"col-md-6\">\n                    <h4>Virtusize</h4>\n                    <dl class=\"dl-horizontal\">\n                        <dt>API Key</dt>\n                        <dd>";
  if (helper = helpers.apiKey) { stack1 = helper.call(depth0, {hash:{},data:data}); }
  else { helper = (depth0 && depth0.apiKey); stack1 = typeof helper === functionType ? helper.call(depth0, {hash:{},data:data}) : helper; }
  buffer += escapeExpression(stack1)
    + "</dd>\n                        <dt>BID</dt>\n                        <dd>";
  if (helper = helpers.bid) { stack1 = helper.call(depth0, {hash:{},data:data}); }
  else { helper = (depth0 && depth0.bid); stack1 = typeof helper === functionType ? helper.call(depth0, {hash:{},data:data}) : helper; }
  buffer += escapeExpression(stack1)
    + "</dd>\n                        <dt>Snippet Version</dt>\n                        <dd>";
  if (helper = helpers.snippetVersion) { stack1 = helper.call(depth0, {hash:{},data:data}); }
  else { helper = (depth0 && depth0.snippetVersion); stack1 = typeof helper === functionType ? helper.call(depth0, {hash:{},data:data}) : helper; }
  buffer += escapeExpression(stack1)
    + "</dd>\n                        <dt>Integration Version</dt>\n                        <dd>";
  if (helper = helpers.integrationVersion) { stack1 = helper.call(depth0, {hash:{},data:data}); }
  else { helper = (depth0 && depth0.integrationVersion); stack1 = typeof helper === functionType ? helper.call(depth0, {hash:{},data:data}) : helper; }
  buffer += escapeExpression(stack1)
    + "</dd>\n                        <dt>Number of Widgets</dt>\n                        <dd>";
  if (helper = helpers.numberOfWidgets) { stack1 = helper.call(depth0, {hash:{},data:data}); }
  else { helper = (depth0 && depth0.numberOfWidgets); stack1 = typeof helper === functionType ? helper.call(depth0, {hash:{},data:data}) : helper; }
  buffer += escapeExpression(stack1)
    + "</dd>\n                        <dt>Number of Orders</dt>\n                        <dd>";
  if (helper = helpers.numberOfOrders) { stack1 = helper.call(depth0, {hash:{},data:data}); }
  else { helper = (depth0 && depth0.numberOfOrders); stack1 = typeof helper === functionType ? helper.call(depth0, {hash:{},data:data}) : helper; }
  buffer += escapeExpression(stack1)
    + "</dd>\n                    </dl>\n                </div>\n                <div class=\"col-md-6\">\n                    <h4>Environment</h4>\n                    <dl class=\"dl-horizontal\">\n                        <dt>URL</dt>\n                        <dd><a href=\"";
  if (helper = helpers.location) { stack1 = helper.call(depth0, {hash:{},data:data}); }
  else { helper = (depth0 && depth0.location); stack1 = typeof helper === functionType ? helper.call(depth0, {hash:{},data:data}) : helper; }
  buffer += escapeExpression(stack1)
    + "\">";
  if (helper = helpers.location) { stack1 = helper.call(depth0, {hash:{},data:data}); }
  else { helper = (depth0 && depth0.location); stack1 = typeof helper === functionType ? helper.call(depth0, {hash:{},data:data}) : helper; }
  buffer += escapeExpression(stack1)
    + "</a></dd>\n                        <dt>jQuery Version</dt>\n                        <dd>";
  if (helper = helpers.jQueryVersion) { stack1 = helper.call(depth0, {hash:{},data:data}); }
  else { helper = (depth0 && depth0.jQueryVersion); stack1 = typeof helper === functionType ? helper.call(depth0, {hash:{},data:data}) : helper; }
  buffer += escapeExpression(stack1)
    + "</dd>\n                        <dt>Is Modern Browser</dt>\n                        <dd>";
  if (helper = helpers.isModernBrowser) { stack1 = helper.call(depth0, {hash:{},data:data}); }
  else { helper = (depth0 && depth0.isModernBrowser); stack1 = typeof helper === functionType ? helper.call(depth0, {hash:{},data:data}) : helper; }
  buffer += escapeExpression(stack1)
    + "</dd>\n                        <dt>Cookies Disabled</dt>\n                        <dd>";
  if (helper = helpers.cookiesDisabled) { stack1 = helper.call(depth0, {hash:{},data:data}); }
  else { helper = (depth0 && depth0.cookiesDisabled); stack1 = typeof helper === functionType ? helper.call(depth0, {hash:{},data:data}) : helper; }
  buffer += escapeExpression(stack1)
    + "</dd>\n                    </dl>\n                </div>\n            </div>\n        </div>\n    </div>\n</div>\n\n";
  return buffer;
  }));

Handlebars.registerPartial("panel_integrate", Handlebars.template(function (Handlebars,depth0,helpers,partials,data) {
  this.compilerInfo = [4,'>= 1.0.0'];
helpers = this.merge(helpers, Handlebars.helpers); data = data || {};
  var buffer = "", stack1, helper, functionType="function", escapeExpression=this.escapeExpression, self=this;

function program1(depth0,data) {
  
  
  return "\n            <div class=\"col-md-6\">\n                <input type=\"text\" class=\"form-control\" id=\"integrate-apiKey\" placeholder=\"API Key\">\n                <br>\n                <button type=\"button\" data-action=\"fill-input-field\" data-target=\"#integrate-apiKey\" data-value=\"15cc36e1d7dad62b8e11722ce1a245cb6c5e6692\" class=\"btn btn-default\">Use Virtusize Demo Store</button>\n            </div>\n            ";
  }

function program3(depth0,data) {
  
  
  return "\n        <div class=\"row\">\n            <div class=\"col-md-12\">\n                <h4>Demo Store Products</h4>\n                <div class=\"btn-group\">\n                    <button type=\"button\" data-action=\"fill-input-field\" data-target=\"[name='productId']\" data-value=\"vs_dress\" class=\"btn btn-default\">Dress</button>\n                    <button type=\"button\" data-action=\"fill-input-field\" data-target=\"[name='productId']\" data-value=\"vs_shirt\" class=\"btn btn-default\">Shirt</button>\n                    <button type=\"button\" data-action=\"fill-input-field\" data-target=\"[name='productId']\" data-value=\"vs_pants\" class=\"btn btn-default\">Pants</button>\n                    <button type=\"button\" data-action=\"fill-input-field\" data-target=\"[name='productId']\" data-value=\"vs_bag\" class=\"btn btn-default\">Bag</button>\n                    <button type=\"button\" data-action=\"fill-input-field\" data-target=\"[name='productId']\" data-value=\"vs_shoe\" class=\"btn btn-default\">Shoe</button>\n                </div>\n            </div>\n        </div>\n        ";
  }

function program5(depth0,data) {
  
  var buffer = "", stack1;
  buffer += "\n        <div class=\"row\">\n            <div class=\"col-md-12\">\n                <h4>Override Widgets</h4>\n                ";
  stack1 = helpers.each.call(depth0, (depth0 && depth0.widgets), {hash:{},inverse:self.noop,fn:self.program(6, program6, data),data:data});
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += "\n            </div>\n        </div>\n        ";
  return buffer;
  }
function program6(depth0,data) {
  
  var buffer = "", stack1, helper;
  buffer += "\n                <form data-action=\"add-widget\" class=\"form-inline\" role=\"form\">\n                    <div class=\"form-group\">\n                        <label class=\"sr-only\" for=\"productId\">Product ID</label>\n                        <input type=\"text\" class=\"form-control\" name=\"productId\" value=\"";
  if (helper = helpers.productId) { stack1 = helper.call(depth0, {hash:{},data:data}); }
  else { helper = (depth0 && depth0.productId); stack1 = typeof helper === functionType ? helper.call(depth0, {hash:{},data:data}) : helper; }
  buffer += escapeExpression(stack1)
    + "\" placeholder=\"Product ID\">\n                    </div>\n                    <div class=\"form-group\">\n                        <label class=\"sr-only\" for=\"buttonSelector\">Button Selector</label>\n                        <input type=\"text\" class=\"form-control\" name=\"buttonSelector\" value=\"";
  if (helper = helpers.buttonSelector) { stack1 = helper.call(depth0, {hash:{},data:data}); }
  else { helper = (depth0 && depth0.buttonSelector); stack1 = typeof helper === functionType ? helper.call(depth0, {hash:{},data:data}) : helper; }
  buffer += escapeExpression(stack1)
    + "\" placeholder=\"Button Selector\">\n                    </div>\n                    <div class=\"form-group\">\n                        <label class=\"sr-only\" for=\"productImageUrl\">Product Image URL</label>\n                        <input type=\"text\" class=\"form-control\" name=\"productImageUrl\" value=\"";
  if (helper = helpers.productImageUrl) { stack1 = helper.call(depth0, {hash:{},data:data}); }
  else { helper = (depth0 && depth0.productImageUrl); stack1 = typeof helper === functionType ? helper.call(depth0, {hash:{},data:data}) : helper; }
  buffer += escapeExpression(stack1)
    + "\" placeholder=\"Product Image URL\">\n                    </div>\n                    <div class=\"form-group\">\n                        <label class=\"sr-only\" for=\"language\">Language</label>\n                        ";
  if (helper = helpers.language_select_box) { stack1 = helper.call(depth0, {hash:{},data:data}); }
  else { helper = (depth0 && depth0.language_select_box); stack1 = typeof helper === functionType ? helper.call(depth0, {hash:{},data:data}) : helper; }
  buffer += escapeExpression(stack1)
    + "\n                    </div>\n                    <button type=\"submit\" class=\"btn btn-default\">Override Widget</button>\n                </form>\n                ";
  return buffer;
  }

  buffer += "<div id=\"";
  if (helper = helpers.id) { stack1 = helper.call(depth0, {hash:{},data:data}); }
  else { helper = (depth0 && depth0.id); stack1 = typeof helper === functionType ? helper.call(depth0, {hash:{},data:data}) : helper; }
  buffer += escapeExpression(stack1)
    + "\" class=\"panel panel-default panel-virtusize\">\n    <div class=\"panel-heading\">\n        <h3 class=\"panel-title\">\n            ";
  if (helper = helpers.title) { stack1 = helper.call(depth0, {hash:{},data:data}); }
  else { helper = (depth0 && depth0.title); stack1 = typeof helper === functionType ? helper.call(depth0, {hash:{},data:data}) : helper; }
  buffer += escapeExpression(stack1)
    + "\n            <a href=\"#\" class=\"close\" data-toggle=\"panel\" data-target=\"#";
  if (helper = helpers.id) { stack1 = helper.call(depth0, {hash:{},data:data}); }
  else { helper = (depth0 && depth0.id); stack1 = typeof helper === functionType ? helper.call(depth0, {hash:{},data:data}) : helper; }
  buffer += escapeExpression(stack1)
    + "\">&times;</a>\n        </h3>\n    </div>\n\n    <div class=\"container\">\n        <div class=\"row\">\n            <div class=\"col-md-12\">\n                <h4>Environment <span class=\"vs-status\"></span></h4>\n            </div>\n\n            ";
  stack1 = helpers['if'].call(depth0, (depth0 && depth0.askForApiKey), {hash:{},inverse:self.noop,fn:self.program(1, program1, data),data:data});
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += "\n\n            <div class=\"col-md-6\">\n                <div class=\"btn-group\">\n                    <button type=\"button\" data-action=\"integrate-env\" data-target=\"api\" class=\"btn btn-default\">Production</button>\n                    <button type=\"button\" data-action=\"integrate-env\" data-target=\"staging\" class=\"btn btn-default\">Staging</button>\n                    <button type=\"button\" data-action=\"integrate-env\" data-target=\"develop\" class=\"btn btn-default\">Develop</button>\n                </div>\n            </div>\n        </div>\n\n        ";
  stack1 = helpers['if'].call(depth0, (depth0 && depth0.isDemoStore), {hash:{},inverse:self.noop,fn:self.program(3, program3, data),data:data});
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += "\n\n        <div class=\"row\">\n            <div class=\"col-md-12\">\n                <h4>Add Widget</h4>\n                <form data-action=\"add-widget\" class=\"form-inline\" role=\"form\">\n                    <div class=\"form-group\">\n                        <label class=\"sr-only\" for=\"productId\">Product ID</label>\n                        <input type=\"text\" class=\"form-control\" name=\"productId\" placeholder=\"Product ID\">\n                    </div>\n                    <div class=\"form-group\">\n                        <label class=\"sr-only\" for=\"buttonSelector\">Button Selector</label>\n                        <input type=\"text\" class=\"form-control\" name=\"buttonSelector\" placeholder=\"Button Selector\">\n                    </div>\n                    <div class=\"form-group\">\n                        <label class=\"sr-only\" for=\"productImageUrl\">Product Image URL</label>\n                        <input type=\"text\" class=\"form-control\" name=\"productImageUrl\" placeholder=\"Product Image URL\">\n                    </div>\n                    <div class=\"form-group\">\n                        <label class=\"sr-only\" for=\"language\">Language</label>\n                        ";
  if (helper = helpers.language_select_box) { stack1 = helper.call(depth0, {hash:{},data:data}); }
  else { helper = (depth0 && depth0.language_select_box); stack1 = typeof helper === functionType ? helper.call(depth0, {hash:{},data:data}) : helper; }
  buffer += escapeExpression(stack1)
    + "\n                    </div>\n                    <button type=\"submit\" class=\"btn btn-default\">Add Widget</button>\n                </form>\n            </div>\n        </div>\n\n        ";
  stack1 = helpers['if'].call(depth0, (depth0 && depth0.hasWidgets), {hash:{},inverse:self.noop,fn:self.program(5, program5, data),data:data});
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += "\n    </div>\n</div>\n";
  return buffer;
  }));

Handlebars.registerPartial("panel_orders", Handlebars.template(function (Handlebars,depth0,helpers,partials,data) {
  this.compilerInfo = [4,'>= 1.0.0'];
helpers = this.merge(helpers, Handlebars.helpers); data = data || {};
  var buffer = "", stack1, helper, functionType="function", escapeExpression=this.escapeExpression, self=this;

function program1(depth0,data) {
  
  var buffer = "", stack1, helper;
  buffer += "\n            <dl class=\"dl-horizontal\">\n                <dt>Order ID</dt>\n                <dd>";
  if (helper = helpers.orderId) { stack1 = helper.call(depth0, {hash:{},data:data}); }
  else { helper = (depth0 && depth0.orderId); stack1 = typeof helper === functionType ? helper.call(depth0, {hash:{},data:data}) : helper; }
  buffer += escapeExpression(stack1)
    + "</dd>\n                <dt>User ID</dt>\n                <dd>";
  if (helper = helpers.userId) { stack1 = helper.call(depth0, {hash:{},data:data}); }
  else { helper = (depth0 && depth0.userId); stack1 = typeof helper === functionType ? helper.call(depth0, {hash:{},data:data}) : helper; }
  buffer += escapeExpression(stack1)
    + "</dd>\n                <dt>Region</dt>\n                <dd>";
  if (helper = helpers.region) { stack1 = helper.call(depth0, {hash:{},data:data}); }
  else { helper = (depth0 && depth0.region); stack1 = typeof helper === functionType ? helper.call(depth0, {hash:{},data:data}) : helper; }
  buffer += escapeExpression(stack1)
    + "</dd>\n                <dt>Total items</dt>\n                <dd>";
  if (helper = helpers.totalItems) { stack1 = helper.call(depth0, {hash:{},data:data}); }
  else { helper = (depth0 && depth0.totalItems); stack1 = typeof helper === functionType ? helper.call(depth0, {hash:{},data:data}) : helper; }
  buffer += escapeExpression(stack1)
    + "</dd>\n            </dl>\n        ";
  return buffer;
  }

function program3(depth0,data) {
  
  var buffer = "", stack1;
  buffer += "\n                    ";
  stack1 = helpers.each.call(depth0, (depth0 && depth0.items), {hash:{},inverse:self.noop,fn:self.program(4, program4, data),data:data});
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += "\n                ";
  return buffer;
  }
function program4(depth0,data) {
  
  var buffer = "", stack1, helper;
  buffer += "\n                        <tr>\n                            <td>";
  if (helper = helpers.productId) { stack1 = helper.call(depth0, {hash:{},data:data}); }
  else { helper = (depth0 && depth0.productId); stack1 = typeof helper === functionType ? helper.call(depth0, {hash:{},data:data}) : helper; }
  buffer += escapeExpression(stack1)
    + "</td>\n                            <td>";
  if (helper = helpers.size) { stack1 = helper.call(depth0, {hash:{},data:data}); }
  else { helper = (depth0 && depth0.size); stack1 = typeof helper === functionType ? helper.call(depth0, {hash:{},data:data}) : helper; }
  buffer += escapeExpression(stack1)
    + "</td>\n                            <td>";
  if (helper = helpers.sizeAlias) { stack1 = helper.call(depth0, {hash:{},data:data}); }
  else { helper = (depth0 && depth0.sizeAlias); stack1 = typeof helper === functionType ? helper.call(depth0, {hash:{},data:data}) : helper; }
  buffer += escapeExpression(stack1)
    + "</td>\n                            <td>";
  if (helper = helpers.color) { stack1 = helper.call(depth0, {hash:{},data:data}); }
  else { helper = (depth0 && depth0.color); stack1 = typeof helper === functionType ? helper.call(depth0, {hash:{},data:data}) : helper; }
  buffer += escapeExpression(stack1)
    + "</td>\n                            <td>";
  if (helper = helpers.gender) { stack1 = helper.call(depth0, {hash:{},data:data}); }
  else { helper = (depth0 && depth0.gender); stack1 = typeof helper === functionType ? helper.call(depth0, {hash:{},data:data}) : helper; }
  buffer += escapeExpression(stack1)
    + "</td>\n                            <td>";
  if (helper = helpers.quantity) { stack1 = helper.call(depth0, {hash:{},data:data}); }
  else { helper = (depth0 && depth0.quantity); stack1 = typeof helper === functionType ? helper.call(depth0, {hash:{},data:data}) : helper; }
  buffer += escapeExpression(stack1)
    + "</td>\n                            <td>";
  if (helper = helpers.unitPrice) { stack1 = helper.call(depth0, {hash:{},data:data}); }
  else { helper = (depth0 && depth0.unitPrice); stack1 = typeof helper === functionType ? helper.call(depth0, {hash:{},data:data}) : helper; }
  buffer += escapeExpression(stack1)
    + "</td>\n                            <td><a href=\"";
  if (helper = helpers.imageUrl) { stack1 = helper.call(depth0, {hash:{},data:data}); }
  else { helper = (depth0 && depth0.imageUrl); stack1 = typeof helper === functionType ? helper.call(depth0, {hash:{},data:data}) : helper; }
  buffer += escapeExpression(stack1)
    + "\" target=\"_blank\" class=\"btn btn-xs btn-primary\">Show</a></td>\n                            <td><a href=\"";
  if (helper = helpers.url) { stack1 = helper.call(depth0, {hash:{},data:data}); }
  else { helper = (depth0 && depth0.url); stack1 = typeof helper === functionType ? helper.call(depth0, {hash:{},data:data}) : helper; }
  buffer += escapeExpression(stack1)
    + "\" target=\"_blank\" class=\"btn btn-xs btn-primary\">Open</a></td>\n                        </tr>\n                    ";
  return buffer;
  }

  buffer += "<div id=\"";
  if (helper = helpers.id) { stack1 = helper.call(depth0, {hash:{},data:data}); }
  else { helper = (depth0 && depth0.id); stack1 = typeof helper === functionType ? helper.call(depth0, {hash:{},data:data}) : helper; }
  buffer += escapeExpression(stack1)
    + "\" class=\"panel panel-default panel-virtusize\">\n    <div class=\"panel-heading\">\n        <h3 class=\"panel-title\">\n            ";
  if (helper = helpers.title) { stack1 = helper.call(depth0, {hash:{},data:data}); }
  else { helper = (depth0 && depth0.title); stack1 = typeof helper === functionType ? helper.call(depth0, {hash:{},data:data}) : helper; }
  buffer += escapeExpression(stack1)
    + "\n            <a href=\"#\" class=\"close\" data-toggle=\"panel\" data-target=\"#";
  if (helper = helpers.id) { stack1 = helper.call(depth0, {hash:{},data:data}); }
  else { helper = (depth0 && depth0.id); stack1 = typeof helper === functionType ? helper.call(depth0, {hash:{},data:data}) : helper; }
  buffer += escapeExpression(stack1)
    + "\">&times;</a>\n        </h3>\n    </div>\n    <div class=\"panel-body\">\n        <h4>Order</h4>\n        ";
  stack1 = helpers.each.call(depth0, (depth0 && depth0.orders), {hash:{},inverse:self.noop,fn:self.program(1, program1, data),data:data});
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += "\n        <h4>Order Items</h4>\n    </div>\n    <div class=\"table-responsive\">\n        <table class=\"table table-striped\">\n            <thead>\n                <tr>\n                    <th>Product ID</th>\n                    <th>Size</th>\n                    <th>Alias</th>\n                    <th>Color</th>\n                    <th>Gender</th>\n                    <th>Quantity</th>\n                    <th>Price</th>\n                    <th>Image</th>\n                    <th>URL</th>\n                </tr>\n            </thead>\n            <tbody>\n                ";
  stack1 = helpers.each.call(depth0, (depth0 && depth0.orders), {hash:{},inverse:self.noop,fn:self.program(3, program3, data),data:data});
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += "\n            </tbody>\n        </table>\n    </div>\n</div>\n\n";
  return buffer;
  }));

Handlebars.registerPartial("panel_purchase", Handlebars.template(function (Handlebars,depth0,helpers,partials,data) {
  this.compilerInfo = [4,'>= 1.0.0'];
helpers = this.merge(helpers, Handlebars.helpers); data = data || {};
  var buffer = "", stack1, helper, functionType="function", escapeExpression=this.escapeExpression, self=this;

function program1(depth0,data) {
  
  
  return "\n        <h4>Demo Store Product Sizes</h4>\n        <div class=\"btn-group\" style=\"margin-bottom:15px;\">\n            <button type=\"button\" data-action=\"fill-input-field\" data-target=\"[name='size']\" data-value=\"small\" class=\"btn btn-default\">Dress</button>\n            <button type=\"button\" data-action=\"fill-input-field\" data-target=\"[name='size']\" data-value=\"medium\" class=\"btn btn-default\">Shirt</button>\n            <button type=\"button\" data-action=\"fill-input-field\" data-target=\"[name='size']\" data-value=\"Strech\" class=\"btn btn-default\">Pants</button>\n            <button type=\"button\" data-action=\"fill-input-field\" data-target=\"[name='size']\" data-value=\"Medium\" class=\"btn btn-default\">Bag</button>\n            <button type=\"button\" data-action=\"fill-input-field\" data-target=\"[name='size']\" data-value=\"42\" class=\"btn btn-default\">Shoe</button>\n        </div>\n        ";
  }

function program3(depth0,data,depth1) {
  
  var buffer = "", stack1, helper;
  buffer += "\n        <form data-action=\"add-order\" class=\"form-inline\" role=\"form\">\n            <div class=\"form-group\">\n                <label class=\"sr-only\" for=\"productId\">Product ID</label>\n                <input type=\"text\" class=\"form-control\" name=\"productId\" value=\"";
  if (helper = helpers.productId) { stack1 = helper.call(depth0, {hash:{},data:data}); }
  else { helper = (depth0 && depth0.productId); stack1 = typeof helper === functionType ? helper.call(depth0, {hash:{},data:data}) : helper; }
  buffer += escapeExpression(stack1)
    + "\" placeholder=\"Product ID\" required>\n            </div>\n            <div class=\"form-group\">\n                <label class=\"sr-only\" for=\"size\">Size</label>\n                <input type=\"text\" class=\"form-control\" name=\"size\" placeholder=\"Size\" required>\n            </div>\n            <div class=\"form-group\">\n                <label class=\"sr-only\" for=\"sizeAlias\">Size Alias</label>\n                <input type=\"text\" class=\"form-control\" name=\"sizeAlias\" placeholder=\"Size Alias\">\n            </div>\n            <div class=\"form-group\">\n                <label class=\"sr-only\" for=\"imageUrl\">Image URL</label>\n                <input type=\"text\" class=\"form-control\" name=\"imageUrl\" value=\"";
  stack1 = helpers['if'].call(depth0, (depth0 && depth0.productImageUrl), {hash:{},inverse:self.programWithDepth(6, program6, data, depth1),fn:self.program(4, program4, data),data:data});
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += "\" placeholder=\"Image URL\" required>\n            </div>\n            <button type=\"submit\" class=\"btn btn-default\">Purchase</button>\n        </form>\n        ";
  return buffer;
  }
function program4(depth0,data) {
  
  var stack1, helper;
  if (helper = helpers.productImageUrl) { stack1 = helper.call(depth0, {hash:{},data:data}); }
  else { helper = (depth0 && depth0.productImageUrl); stack1 = typeof helper === functionType ? helper.call(depth0, {hash:{},data:data}) : helper; }
  return escapeExpression(stack1);
  }

function program6(depth0,data,depth2) {
  
  var stack1;
  return escapeExpression(((stack1 = (depth2 && depth2.ogpImageUrl)),typeof stack1 === functionType ? stack1.apply(depth0) : stack1));
  }

  buffer += "<div id=\"";
  if (helper = helpers.id) { stack1 = helper.call(depth0, {hash:{},data:data}); }
  else { helper = (depth0 && depth0.id); stack1 = typeof helper === functionType ? helper.call(depth0, {hash:{},data:data}) : helper; }
  buffer += escapeExpression(stack1)
    + "\" class=\"panel panel-default panel-virtusize\">\n    <div class=\"panel-heading\">\n        <h3 class=\"panel-title\">\n            ";
  if (helper = helpers.title) { stack1 = helper.call(depth0, {hash:{},data:data}); }
  else { helper = (depth0 && depth0.title); stack1 = typeof helper === functionType ? helper.call(depth0, {hash:{},data:data}) : helper; }
  buffer += escapeExpression(stack1)
    + "\n            <a href=\"#\" class=\"close\" data-toggle=\"panel\" data-target=\"#";
  if (helper = helpers.id) { stack1 = helper.call(depth0, {hash:{},data:data}); }
  else { helper = (depth0 && depth0.id); stack1 = typeof helper === functionType ? helper.call(depth0, {hash:{},data:data}) : helper; }
  buffer += escapeExpression(stack1)
    + "\">&times;</a>\n        </h3>\n    </div>\n    <div class=\"panel-body\">\n        <dl class=\"dl-horizontal\">\n            <dt>Environment</dt>\n            <dd><span class=\"vs-status\"></span></dd>\n            <dt>BID</dt>\n            <dd>";
  if (helper = helpers.bid) { stack1 = helper.call(depth0, {hash:{},data:data}); }
  else { helper = (depth0 && depth0.bid); stack1 = typeof helper === functionType ? helper.call(depth0, {hash:{},data:data}) : helper; }
  buffer += escapeExpression(stack1)
    + "</dd>\n        </dl>\n        <p>\n            <button type=\"button\" data-action=\"reset-bid\" class=\"btn btn-default\">Reset your identity</button>\n        </p>\n\n\n        ";
  stack1 = helpers['if'].call(depth0, (depth0 && depth0.isDemoStore), {hash:{},inverse:self.noop,fn:self.program(1, program1, data),data:data});
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += "\n\n        ";
  stack1 = helpers.each.call(depth0, (depth0 && depth0.widgets), {hash:{},inverse:self.noop,fn:self.programWithDepth(3, program3, data, depth0),data:data});
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += "\n\n    </div>\n</div>\n\n";
  return buffer;
  }));

Handlebars.registerPartial("panel_tooltip", Handlebars.template(function (Handlebars,depth0,helpers,partials,data) {
  this.compilerInfo = [4,'>= 1.0.0'];
helpers = this.merge(helpers, Handlebars.helpers); data = data || {};
  var buffer = "", stack1, helper, functionType="function", escapeExpression=this.escapeExpression, self=this;

function program1(depth0,data) {
  
  var buffer = "", stack1, helper;
  buffer += "\n                <tr>\n                    <td>";
  if (helper = helpers.productId) { stack1 = helper.call(depth0, {hash:{},data:data}); }
  else { helper = (depth0 && depth0.productId); stack1 = typeof helper === functionType ? helper.call(depth0, {hash:{},data:data}) : helper; }
  buffer += escapeExpression(stack1)
    + "</td>\n                    <td>";
  if (helper = helpers.buttonSelector) { stack1 = helper.call(depth0, {hash:{},data:data}); }
  else { helper = (depth0 && depth0.buttonSelector); stack1 = typeof helper === functionType ? helper.call(depth0, {hash:{},data:data}) : helper; }
  buffer += escapeExpression(stack1)
    + "</td>\n                    <td>\n                        <div id=\"mobile-widget-buttons\" class=\"btn-group\" data-toggle=\"buttons\">\n                            <label class=\"btn btn-xs btn-primary";
  if (helper = helpers.desktopButtonClass) { stack1 = helper.call(depth0, {hash:{},data:data}); }
  else { helper = (depth0 && depth0.desktopButtonClass); stack1 = typeof helper === functionType ? helper.call(depth0, {hash:{},data:data}) : helper; }
  buffer += escapeExpression(stack1)
    + "\" data-value=\"false\">\n                                <input type=\"radio\" name=\"mobileWidget\"/> Desktop\n                            </label>\n                            <label class=\"btn btn-xs btn-primary";
  if (helper = helpers.mobileButtonClass) { stack1 = helper.call(depth0, {hash:{},data:data}); }
  else { helper = (depth0 && depth0.mobileButtonClass); stack1 = typeof helper === functionType ? helper.call(depth0, {hash:{},data:data}) : helper; }
  buffer += escapeExpression(stack1)
    + "\" data-value=\"true\">\n                                <input type=\"radio\" name=\"mobileWidget\"/> Mobile\n                            </label>\n                        </div>\n                    </td>\n                    <td>\n                        ";
  stack1 = helpers['if'].call(depth0, (depth0 && depth0.validProduct), {hash:{},inverse:self.noop,fn:self.program(2, program2, data),data:data});
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += "\n                    </td>\n                    <td>\n                        ";
  stack1 = helpers['if'].call(depth0, (depth0 && depth0.validProduct), {hash:{},inverse:self.noop,fn:self.program(4, program4, data),data:data});
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += "\n                    </td>\n                </tr>\n                ";
  return buffer;
  }
function program2(depth0,data) {
  
  var buffer = "", stack1, helper;
  buffer += "\n                            <button class=\"btn btn-xs btn-primary\" data-action=\"open-tooltip\" data-target=\"";
  if (helper = helpers.productId) { stack1 = helper.call(depth0, {hash:{},data:data}); }
  else { helper = (depth0 && depth0.productId); stack1 = typeof helper === functionType ? helper.call(depth0, {hash:{},data:data}) : helper; }
  buffer += escapeExpression(stack1)
    + "\">Open Tooltip</button>\n                        ";
  return buffer;
  }

function program4(depth0,data) {
  
  var buffer = "", stack1, helper;
  buffer += "\n                            <button class=\"btn btn-xs btn-primary\" data-action=\"toggle-tooltip-style\" data-target=\"";
  if (helper = helpers.productId) { stack1 = helper.call(depth0, {hash:{},data:data}); }
  else { helper = (depth0 && depth0.productId); stack1 = typeof helper === functionType ? helper.call(depth0, {hash:{},data:data}) : helper; }
  buffer += escapeExpression(stack1)
    + "\">Toggle Style</button>\n                        ";
  return buffer;
  }

  buffer += "<div id=\"";
  if (helper = helpers.id) { stack1 = helper.call(depth0, {hash:{},data:data}); }
  else { helper = (depth0 && depth0.id); stack1 = typeof helper === functionType ? helper.call(depth0, {hash:{},data:data}) : helper; }
  buffer += escapeExpression(stack1)
    + "\" class=\"panel panel-default panel-virtusize\">\n    <div class=\"panel-heading\">\n        <h3 class=\"panel-title\">\n            ";
  if (helper = helpers.title) { stack1 = helper.call(depth0, {hash:{},data:data}); }
  else { helper = (depth0 && depth0.title); stack1 = typeof helper === functionType ? helper.call(depth0, {hash:{},data:data}) : helper; }
  buffer += escapeExpression(stack1)
    + "\n            <a href=\"#\" class=\"close\" data-toggle=\"panel\" data-target=\"#";
  if (helper = helpers.id) { stack1 = helper.call(depth0, {hash:{},data:data}); }
  else { helper = (depth0 && depth0.id); stack1 = typeof helper === functionType ? helper.call(depth0, {hash:{},data:data}) : helper; }
  buffer += escapeExpression(stack1)
    + "\">&times;</a>\n        </h3>\n    </div>\n    <div class=\"table-responsive\">\n        <table class=\"table table-striped\">\n            <thead>\n                <tr>\n                    <th>Product ID</th>\n                    <th>Button Selector</th>\n                    <th>Desktop/Mobile</th>\n                    <th>Open Tooltip</th>\n                    <th>Toggle Style</th>\n                </tr>\n            </thead>\n            <tbody>\n                ";
  stack1 = helpers.each.call(depth0, (depth0 && depth0.widgets), {hash:{},inverse:self.noop,fn:self.program(1, program1, data),data:data});
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += "\n            </tbody>\n        </table>\n    </div>\n</div>\n\n";
  return buffer;
  }));

Handlebars.registerPartial("panel_widgets", Handlebars.template(function (Handlebars,depth0,helpers,partials,data) {
  this.compilerInfo = [4,'>= 1.0.0'];
helpers = this.merge(helpers, Handlebars.helpers); data = data || {};
  var buffer = "", stack1, helper, functionType="function", escapeExpression=this.escapeExpression, self=this;

function program1(depth0,data) {
  
  var buffer = "", stack1, helper;
  buffer += "\n                <tr>\n                    <td>";
  if (helper = helpers.productId) { stack1 = helper.call(depth0, {hash:{},data:data}); }
  else { helper = (depth0 && depth0.productId); stack1 = typeof helper === functionType ? helper.call(depth0, {hash:{},data:data}) : helper; }
  buffer += escapeExpression(stack1)
    + "</td>\n                    <td>";
  if (helper = helpers.buttonSelector) { stack1 = helper.call(depth0, {hash:{},data:data}); }
  else { helper = (depth0 && depth0.buttonSelector); stack1 = typeof helper === functionType ? helper.call(depth0, {hash:{},data:data}) : helper; }
  buffer += escapeExpression(stack1)
    + "</td>\n                    <td>";
  if (helper = helpers.language) { stack1 = helper.call(depth0, {hash:{},data:data}); }
  else { helper = (depth0 && depth0.language); stack1 = typeof helper === functionType ? helper.call(depth0, {hash:{},data:data}) : helper; }
  buffer += escapeExpression(stack1)
    + "</td>\n                    <td>";
  if (helper = helpers.storeId) { stack1 = helper.call(depth0, {hash:{},data:data}); }
  else { helper = (depth0 && depth0.storeId); stack1 = typeof helper === functionType ? helper.call(depth0, {hash:{},data:data}) : helper; }
  buffer += escapeExpression(stack1)
    + "</td>\n                    <td>";
  if (helper = helpers.storeProductId) { stack1 = helper.call(depth0, {hash:{},data:data}); }
  else { helper = (depth0 && depth0.storeProductId); stack1 = typeof helper === functionType ? helper.call(depth0, {hash:{},data:data}) : helper; }
  buffer += escapeExpression(stack1)
    + "</td>\n                    <td>";
  stack1 = helpers['if'].call(depth0, (depth0 && depth0.validProduct), {hash:{},inverse:self.program(4, program4, data),fn:self.program(2, program2, data),data:data});
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += "</td>\n                    <td>\n                        ";
  stack1 = helpers['if'].call(depth0, (depth0 && depth0.validProduct), {hash:{},inverse:self.noop,fn:self.program(6, program6, data),data:data});
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += "\n                    </td>\n                    <td>\n                        ";
  stack1 = helpers['if'].call(depth0, (depth0 && depth0.validProduct), {hash:{},inverse:self.noop,fn:self.program(9, program9, data),data:data});
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += "\n                    </td>\n                </tr>\n                ";
  return buffer;
  }
function program2(depth0,data) {
  
  var stack1, helper;
  if (helper = helpers.validProduct) { stack1 = helper.call(depth0, {hash:{},data:data}); }
  else { helper = (depth0 && depth0.validProduct); stack1 = typeof helper === functionType ? helper.call(depth0, {hash:{},data:data}) : helper; }
  return escapeExpression(stack1);
  }

function program4(depth0,data) {
  
  
  return "false";
  }

function program6(depth0,data) {
  
  var buffer = "", stack1;
  buffer += "\n                            ";
  stack1 = helpers['if'].call(depth0, (depth0 && depth0.productImageUrl), {hash:{},inverse:self.noop,fn:self.program(7, program7, data),data:data});
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += "\n                        ";
  return buffer;
  }
function program7(depth0,data) {
  
  var buffer = "", stack1, helper;
  buffer += "\n                                <a href=\"";
  if (helper = helpers.productImageUrl) { stack1 = helper.call(depth0, {hash:{},data:data}); }
  else { helper = (depth0 && depth0.productImageUrl); stack1 = typeof helper === functionType ? helper.call(depth0, {hash:{},data:data}) : helper; }
  buffer += escapeExpression(stack1)
    + "\" target=\"_blank\" class=\"btn btn-xs btn-primary\">Show</a>\n                            ";
  return buffer;
  }

function program9(depth0,data) {
  
  var buffer = "", stack1, helper;
  buffer += "\n                            <button class=\"btn btn-xs btn-primary\" data-toggle=\"widget\" data-target=\"";
  if (helper = helpers.productId) { stack1 = helper.call(depth0, {hash:{},data:data}); }
  else { helper = (depth0 && depth0.productId); stack1 = typeof helper === functionType ? helper.call(depth0, {hash:{},data:data}) : helper; }
  buffer += escapeExpression(stack1)
    + "\">Open</button>\n                        ";
  return buffer;
  }

  buffer += "<div id=\"";
  if (helper = helpers.id) { stack1 = helper.call(depth0, {hash:{},data:data}); }
  else { helper = (depth0 && depth0.id); stack1 = typeof helper === functionType ? helper.call(depth0, {hash:{},data:data}) : helper; }
  buffer += escapeExpression(stack1)
    + "\" class=\"panel panel-default panel-virtusize\">\n    <div class=\"panel-heading\">\n        <h3 class=\"panel-title\">\n            ";
  if (helper = helpers.title) { stack1 = helper.call(depth0, {hash:{},data:data}); }
  else { helper = (depth0 && depth0.title); stack1 = typeof helper === functionType ? helper.call(depth0, {hash:{},data:data}) : helper; }
  buffer += escapeExpression(stack1)
    + "\n            <a href=\"#\" class=\"close\" data-toggle=\"panel\" data-target=\"#";
  if (helper = helpers.id) { stack1 = helper.call(depth0, {hash:{},data:data}); }
  else { helper = (depth0 && depth0.id); stack1 = typeof helper === functionType ? helper.call(depth0, {hash:{},data:data}) : helper; }
  buffer += escapeExpression(stack1)
    + "\">&times;</a>\n        </h3>\n    </div>\n    <div class=\"table-responsive\">\n        <table class=\"table table-striped\">\n            <thead>\n                <tr>\n                    <th>Product ID</th>\n                    <th>Button Selector</th>\n                    <th>Language</th>\n                    <th>Store ID</th>\n                    <th>StoreProduct ID</th>\n                    <th>Valid</th>\n                    <th>Product Image URL</th>\n                    <th>Open</th>\n                </tr>\n            </thead>\n            <tbody>\n                ";
  stack1 = helpers.each.call(depth0, (depth0 && depth0.widgets), {hash:{},inverse:self.noop,fn:self.program(1, program1, data),data:data});
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += "\n            </tbody>\n        </table>\n    </div>\n</div>\n\n";
  return buffer;
  }));

this["templates"]["src/templates/bookmarklet.handlebars"] = Handlebars.template(function (Handlebars,depth0,helpers,partials,data) {
  this.compilerInfo = [4,'>= 1.0.0'];
helpers = this.merge(helpers, Handlebars.helpers); data = data || {};
  var buffer = "", stack1, functionType="function", escapeExpression=this.escapeExpression, self=this;

function program1(depth0,data) {
  
  var buffer = "", stack1, helper;
  buffer += "\n                <li id=\"";
  if (helper = helpers.id) { stack1 = helper.call(depth0, {hash:{},data:data}); }
  else { helper = (depth0 && depth0.id); stack1 = typeof helper === functionType ? helper.call(depth0, {hash:{},data:data}) : helper; }
  buffer += escapeExpression(stack1)
    + "-link\"><a href=\"#\" data-toggle=\"panel\" data-target=\"#";
  if (helper = helpers.id) { stack1 = helper.call(depth0, {hash:{},data:data}); }
  else { helper = (depth0 && depth0.id); stack1 = typeof helper === functionType ? helper.call(depth0, {hash:{},data:data}) : helper; }
  buffer += escapeExpression(stack1)
    + "\">";
  if (helper = helpers.title) { stack1 = helper.call(depth0, {hash:{},data:data}); }
  else { helper = (depth0 && depth0.title); stack1 = typeof helper === functionType ? helper.call(depth0, {hash:{},data:data}) : helper; }
  buffer += escapeExpression(stack1)
    + "</a></li>\n                ";
  return buffer;
  }

  buffer += "<nav class=\"navbar navbar-default navbar-fixed-bottom\" role=\"navigation\">\n    <div class=\"container\">\n        <div class=\"navbar-header\">\n            <button type=\"button\" class=\"navbar-toggle\" data-toggle=\"collapse\" data-target=\"#vs-navbar-collapse\">\n                <span class=\"sr-only\">Toggle navigation</span>\n                <span class=\"icon-bar\"></span>\n                <span class=\"icon-bar\"></span>\n                <span class=\"icon-bar\"></span>\n            </button>\n            <a class=\"navbar-brand\" href=\"http://www.virtusize.com/\"><img class=\"logo\" src=\"//res.cloudinary.com/virtusize/image/upload/c_scale,h_40/v1421932104/tests/vs-logo.png\" alt=\"Virtusize\" /></a>\n        </div>\n\n        <div class=\"collapse navbar-collapse\" id=\"vs-navbar-collapse\">\n            <ul class=\"nav navbar-nav\">\n                ";
  stack1 = helpers.each.call(depth0, (depth0 && depth0.panelLinks), {hash:{},inverse:self.noop,fn:self.program(1, program1, data),data:data});
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += "\n            </ul> \n\n            <ul class=\"nav navbar-nav navbar-right\">\n                <li class=\"vs-status\"></li>\n                <li><a href=\"#\" class=\"close\">&times;</a></li>\n            </ul>\n        </div>\n    </div>\n</nav>\n";
  return buffer;
  });

this["templates"]["src/templates/panels.handlebars"] = Handlebars.template(function (Handlebars,depth0,helpers,partials,data) {
  this.compilerInfo = [4,'>= 1.0.0'];
helpers = this.merge(helpers, Handlebars.helpers); partials = this.merge(partials, Handlebars.partials); data = data || {};
  var buffer = "", stack1, self=this;


  buffer += "<div id=\"vs-panels\">\n    ";
  stack1 = self.invokePartial(partials.panel_integrate, 'panel_integrate', ((stack1 = (depth0 && depth0.panels)),stack1 == null || stack1 === false ? stack1 : stack1.integrate), helpers, partials, data);
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += "\n    ";
  stack1 = self.invokePartial(partials.panel_widgets, 'panel_widgets', ((stack1 = (depth0 && depth0.panels)),stack1 == null || stack1 === false ? stack1 : stack1.widgets), helpers, partials, data);
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += "\n    ";
  stack1 = self.invokePartial(partials.panel_orders, 'panel_orders', ((stack1 = (depth0 && depth0.panels)),stack1 == null || stack1 === false ? stack1 : stack1.orders), helpers, partials, data);
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += "\n    ";
  stack1 = self.invokePartial(partials.panel_debug, 'panel_debug', ((stack1 = (depth0 && depth0.panels)),stack1 == null || stack1 === false ? stack1 : stack1.debug), helpers, partials, data);
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += "\n    ";
  stack1 = self.invokePartial(partials.panel_purchase, 'panel_purchase', ((stack1 = (depth0 && depth0.panels)),stack1 == null || stack1 === false ? stack1 : stack1.purchase), helpers, partials, data);
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += "\n    ";
  stack1 = self.invokePartial(partials.panel_tooltip, 'panel_tooltip', ((stack1 = (depth0 && depth0.panels)),stack1 == null || stack1 === false ? stack1 : stack1.tooltip), helpers, partials, data);
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += "\n</div>\n\n";
  return buffer;
  });override.init();
return {override: override, ogp: ogp, Handlebars: Handlebars};}).apply({});