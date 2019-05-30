// SMD (Synchronous Module Definition)
// AMD (Asynchronous Module Definition)

// AMD
!(function(F) {
  var moduleCache = {};
})(
  (function() {
    return (window.F = {});
  })()
);

F.show = function() {
  console.table(moduleCache);
};
/**
 * @param url 模块url
 * @param deps 依赖模块
 * @param callback
 */
F.module = function(url, modDeps, modCallback) {
  var args = [].slice.call(arguments),
    callback = args.pop(),
    deps = args.length && args[args.length - 1] instanceof Array ? args.pop() : [],
    url = args.length ? args.pop() : null,
    params = [],
    depsCount = 0,
    i = 0,
    len;
  if ((len = deps.length)) {
    while (i < len) {
      (function(i) {
        depsCount++;
        loadModule(deps[i], function(mod) {
          params[i] = mod;
          depsCount--;
          if (depsCount === 0) {
            setModule(url, params, callback);
          }
        });
      })(i);
      i++;
    }
  } else {
    setModule(url, [], callback);
  }
};

var moduleCache, setModule, loadModule, getUrl, loadScript;
moduleCache = {};
loadModule = function(moduleName, callback) {
  var _module;
  if (moduleCache[moduleName]) {
    _module = moduleCache[moduleName];
    if (_module.status === 'loaded') {
      setTimeout(callback(_module.exports), 0);
    } else {
      _module.onload.push(callback);
    }
  } else {
    moduleCache[moduleName] = {
      moduleName: moduleName,
      status: 'loading',
      onload: [callback]
    };
    loadScript(getUrl(moduleName));
  }
};
getUrl = function(moduleName) {
  return String(moduleName).replace(/\.js$/g, '') + '.js';
};
// 页面加载js
loadScript = function(src) {
  var _script = document.createElement('script');
  _script.type = 'text/javascript';
  _script.charset = 'UTF-8';
  _script.async = true;
  _script.src = src;
  document.getElementsByTagName('head')[0].appendChild(_script);
};

setModule = function(moduleName, params, callback) {
  var _module, fn;
  if (moduleCache[moduleName]) {
    _module = moduleCache[moduleName];
    _module.status = 'loaded';
    _module.exports = callback ? callback.apply(_module, params) : null;
    while ((fn = _module.onload.shift())) {
      fn(_module.exports);
    }
  } else {
    callback && callback.apply(null, params);
  }
};

//********************************************* */
//AMD
var FF = FF || {};

/**
 * @param str 模块路由
 * @param fn 模块方法
 */
FF.define = function(str, fn) {
  var parts = str.split('.'),
    old = (parent = this),
    i = (len = 0);
  if (parts[0] === 'FF') {
    parts = parts.slice(1);
  }
  if (parts[0] === 'define' || parts[0] === 'module') {
    return;
  }
  for (len = parts.length; i < len; i++) {
    if (typeof parent[parts[i]] === 'undefined') {
      parent[parts[i]] = {};
    }
    old = parent;
    parent = parent[parts[i]];
  }
  if (fn) {
    // 遍历后i已经越界了，所以要减一
    old[parts[--i]] = fn();
  }
  return this;
};

FF.define('string', function() {
  return {
    trim: function(str) {
      return str.replace(/^\s+|\s+$/g, '');
    }
  };
});

FF.module = function() {
  var args = [].slice.call(arguments),
    fn = args.pop(),
    parts = args[0] && args[0] instanceof Array ? args[0] : args,
    modules = [],
    modIDs = '',
    i = 0,
    ilen = parts.length,
    parent,
    j,
    jlen;
  while (i < ilen) {
    if (typeof parts[i] === 'string') {
      parent = this;
      modIDs = parts[i].replace(/^FF\./, '').split('.');
      for (j = 0, jlen = modIDs.length; j < jlen; j++) {
        parent = parent[modIDs[j]] || false;
      }
      modules.push(parent);
    } else {
      modules.push(parts[i]);
    }
    i++;
  }
  fn.apply(null, modules);
};

FF.string.trim('   test....    ');

FF.define('dom', function() {
  var $ = function(id) {
    $.dom = document.getElementById(id);
    return $;
  };
  $.html = function(html) {
    if (html) {
      this.dom.innerHTML = html;
    } else {
      return this.dom.innerHTML;
    }
  };
  return $;
});
