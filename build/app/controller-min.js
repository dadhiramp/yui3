YUI.add("controller",function(f){var d=f.Array,b=f.QueryString,c=f.HistoryBase.html5&&(!f.UA.android||f.UA.android>=3),a=f.config.win.location;function e(){e.superclass.constructor.apply(this,arguments);}f.Controller=f.extend(e,f.Base,{base:"",routes:[],_regexPathParam:/([:*])([\w\d-]+)/g,_regexUrlQuery:/\?([^#]*).*$/,initializer:function(g){g||(g={});this._routes=[];g.base&&(this.base=g.base);g.routes&&(this.routes=g.routes);d.each(this.routes,function(h){this.route(h.path,h.callback,true);},this);this._history=c?new f.HistoryHTML5():new f.HistoryHash();this._history.after("change",this._afterHistoryChange,this);this._dispatch(this._getPath(),this._getState());},destructor:function(){this._history.detachAll();},match:function(g){return d.filter(this._routes,function(h){return g.search(h.regex)>-1;});},replace:function(g,i,h){return this._save(g,i,h,true);},route:function(h,i){var g=[];this._routes.push({callback:i,keys:g,path:h,regex:this._getRegex(h,g)});return this;},save:function(g,i,h){return this._save(g,i,h);},_decode:function(g){return decodeURIComponent(g.replace(/\+/g," "));},_dispatch:function(m,l){var g=this.match(m),k,i,h;if(!g||!g.length){return;}k=this._getRequest(m,l);h=this;function j(n){var p,o;if(n){f.error(n);}else{if((i=g.shift())){o=i.regex.exec(m);p=typeof i.callback==="string"?h[i.callback]:i.callback;if(o.length===i.keys.length+1){k.params=d.hash(i.keys,o.slice(1));}else{k.params={};d.each(o,function(r,q){k.params[q]=r;});}p.call(h,k,j);}}}j();},_getPath:c?function(){var g=this.base,h=a.pathname;if(g&&h.indexOf(g)===0){h=h.substring(g.length);}return h;}:function(){return this._history.get("path")||this.base+a.pathname;},_getQuery:c?function(){return a.search.substring(1);}:function(){return this._history.get("query")||a.search.substring(1);},_getRegex:function(h,g){if(h instanceof RegExp){return h;}h=h.replace(this._regexPathParam,function(j,i,k){g.push(k);return i==="*"?"(.*?)":"([^/]*)";});return new RegExp("^"+h+"$");},_getRequest:function(h,g){return{path:h,query:this._parseQuery(this._getQuery()),state:g};},_getState:c?function(){return this._history.get();}:function(){var g=this._history.get("state");return g?f.JSON.parse(g):{};},_parseQuery:b&&b.parse?b.parse:function(k){var l=this._decode,n=k.split("&"),j=0,h=n.length,g={},m;for(;j<h;++j){m=n[j].split("=");if(m[0]){g[l(m[0])]=l(m[1]||"");}}return g;},_save:function(g,l,k,i){var h,j;if(c){if(typeof g==="string"){g=this.base+g;}}else{h=k&&f.JSON.stringify(k);g=g.replace(this._regexUrlQuery,function(m,n){j=n;return"";});k={path:g||this._getPath()};j&&(k.query=j);h&&(k.state=h);}this._history[i?"replace":"add"](k||{},{merge:false,title:l,url:g});return this;},_afterHistoryChange:function(h){var g=this;setTimeout(function(){g._dispatch(g._getPath(),g._getState());},1);}},{NAME:"controller"});},"@VERSION@",{optional:["querystring-parse"],requires:["array-extras","base-build","history","json"]});