(function(){var c=tinymce.makeMap("id,width,height,type"),b=tinymce.html.Node,f,a,g=tinymce.util.JSON,e;f=[["Flash","d27cdb6e-ae6d-11cf-96b8-444553540000","application/x-shockwave-flash","http://download.macromedia.com/pub/shockwave/cabs/flash/swflash.cab#version=6,0,40,0"],["ShockWave","166b1bca-3f9c-11cf-8075-444553540000","application/x-director","http://download.macromedia.com/pub/shockwave/cabs/director/sw.cab#version=8,5,1,0"],["WindowsMedia","6bf52a52-394a-11d3-b153-00c04f79faa6,22d6f312-b0f6-11d0-94ab-0080c74c7e95,05589fa1-c356-11ce-bf01-00aa0055595a","application/x-mplayer2","http://activex.microsoft.com/activex/controls/mplayer/en/nsmp2inf.cab#Version=5,1,52,701"],["QuickTime","02bf25d5-8c17-4b23-bc80-d3488abddc6b","video/quicktime","http://www.apple.com/qtactivex/qtplugin.cab#version=6,0,2,0"],["RealMedia","cfcdaa03-8be4-11cf-b84b-0020afbbccfa","audio/x-pn-realaudio-plugin","http://download.macromedia.com/pub/shockwave/cabs/flash/swflash.cab#version=6,0,40,0"],["Java","8ad9c840-044e-11d1-b3e9-00805f499d93","application/x-java-applet","http://java.sun.com/products/plugin/autodl/jinstall-1_5_0-windows-i586.cab#Version=1,5,0,0"],["Silverlight","dfeaf541-f3e1-4c24-acac-99c30715084a","application/x-silverlight-2"],["Video"]];function d(l){var k,h,j;if(l&&!l.splice){h=[];for(j=0;true;j++){if(l[j]){h[j]=l[j]}else{break}}return h}return l}tinymce.create("tinymce.plugins.MediaPlugin",{init:function(m,h){var q=this,k={},l,o,p,j;function n(i){return i&&i.nodeName==="IMG"&&m.dom.hasClass(i,"mceItemMedia")}q.editor=m;q.url=h;a="";for(l=0;l<f.length;l++){j=f[l][0];p={name:j,clsids:tinymce.explode(f[l][1]||""),mimes:tinymce.explode(f[l][2]||""),codebase:f[l][3]};for(o=0;o<p.clsids.length;o++){k["clsid:"+p.clsids[o]]=p}for(o=0;o<p.mimes.length;o++){k[p.mimes[o]]=p}k["mceItem"+j]=p;k[j.toLowerCase()]=p;a+=(a?"|":"")+j}tinymce.each(m.getParam("media_types","video=mp4,m4v,ogv,webm;silverlight=xap;flash=swf,flv;shockwave=dcr;quicktime=mov,qt,mpg,mp3,mpeg;shockwave=dcr;windowsmedia=avi,wmv,wm,asf,asx,wmx,wvx;realmedia=rm,ra,ram;java=jar").split(";"),function(u){var r,t,s;u=u.split(/=/);t=tinymce.explode(u[1].toLowerCase());for(r=0;r<t.length;r++){s=k[u[0].toLowerCase()];if(s){k[t[r]]=s}}});a=new RegExp("write("+a+")\\(([^)]+)\\)");q.lookup=k;m.onPreInit.add(function(){m.schema.addValidElements("object[id|style|width|height|classid|codebase|*],param[name|value],embed[id|style|width|height|type|src|*],video[*],audio[*],source[*]");m.parser.addNodeFilter("object,embed,video,audio,script",function(r){var s=r.length;while(s--){q.objectToImg(r[s])}});m.serializer.addNodeFilter("img",function(r,t,s){var u=r.length,v;while(u--){v=r[u];if((v.attr("class")||"").indexOf("mceItemMedia")!==-1){q.imgToObject(v,s)}}})});if(m.settings.content_css!==false){m.contentCSS.push(h+"/css/content.css")}m.onInit.add(function(){if(m.theme&&m.theme.onResolveName){m.theme.onResolveName.add(function(i,r){if(r.name==="img"&&m.dom.hasClass(r.node,"mceItemMedia")){r.name="media"}})}if(m&&m.plugins.contextmenu){m.plugins.contextmenu.onContextMenu.add(function(r,s,i){if(i.nodeName==="IMG"&&i.className.indexOf("mceItemMedia")!==-1){s.add({title:"media.edit",icon:"media",cmd:"mceMedia"})}})}});m.addCommand("mceMedia",function(){var r,i;i=m.selection.getNode();if(n(i)){r=g.parse(m.dom.getAttrib(i,"data-mce-json"));tinymce.each("id,width,height,class".split(","),function(s){var t=m.dom.getAttrib(i,s);if(t){r[s]=t}});r.type=q.getType(i.className).name.toLowerCase()}if(!r){r={type:"flash",video:{sources:[]},params:{}}}m.windowManager.open({file:h+"/media.htm",width:430+parseInt(m.getLang("media.delta_width",0)),height:500+parseInt(m.getLang("media.delta_height",0)),inline:1},{plugin_url:h,data:r})});m.addButton("media",{title:"media.desc",cmd:"mceMedia"});m.onNodeChange.add(function(r,i,s){i.setActive("media",n(s))})},convertUrl:function(j,m){var i=this,l=i.editor,k=l.settings,n=k.url_converter,h=k.url_converter_scope||i;if(!j){return j}if(m){return l.documentBaseURI.toAbsolute(j)}return n.call(h,j,"src","object")},getInfo:function(){return{longname:"Media",author:"Moxiecode Systems AB",authorurl:"http://tinymce.moxiecode.com",infourl:"http://wiki.moxiecode.com/index.php/TinyMCE:Plugins/media",version:tinymce.majorVersion+"."+tinymce.minorVersion}},dataToImg:function(l,j){var q=this,n=q.editor,o=n.documentBaseURI,h,p,m,k;l.params.src=q.convertUrl(l.params.src,j);p=l.video.attrs;if(p){p.src=q.convertUrl(p.src,j)}if(p){p.poster=q.convertUrl(p.poster,j)}h=d(l.video.sources);if(h){for(k=0;k<h.length;k++){h[k].src=q.convertUrl(h[k].src,j)}}m=q.editor.dom.create("img",{id:l.id,style:l.style,src:q.url+"/img/trans.gif","class":"mceItemMedia mceItem"+q.getType(l.type).name,"data-mce-json":g.serialize(l,"'")});m.width=l.width||"320";m.height=l.height||"240";return m},dataToHtml:function(h,i){return this.editor.serializer.serialize(this.dataToImg(h,i),{force_absolute:i})},htmlToData:function(j){var i,h,k;k={type:"flash",video:{sources:[]},params:{}};i=this.editor.parser.parse(j);h=i.getAll("img")[0];if(h){k=g.parse(h.attr("data-mce-json"));k.type=this.getType(h.attr("class")).name.toLowerCase();tinymce.each("id,width,height,class".split(","),function(l){var m=h.attr(l);if(m){k[l]=m}})}return k},getType:function(l){var j,h,k;h=tinymce.explode(l," ");for(j=0;j<h.length;j++){k=this.lookup[h[j]];if(k){return k}}},imgToObject:function(u,m){var r=this,n=r.editor,x,B,h,C,t,A,s,j,z,q,o,v,y,l,k,w;function p(i,D){var G,F,H,E;G=n.documentBaseURI;A.params.src=n.getParam("flash_video_player_url",r.convertUrl(r.url+"/img/moxieplayer.swf"));if(n.getParam("flash_video_player_absvideourl",true)){i=G.toAbsolute(i||"",true);D=G.toAbsolute(D||"",true)}H="";F=n.getParam("flash_video_player_flashvars",{url:"$url",poster:"$poster"});tinymce.each(F,function(J,I){J=J.replace(/\$url/,i||"");J=J.replace(/\$poster/,D||"");if(J.length>0){H+=(H?"&":"")+I+"="+escape(J)}});if(H.length){A.params.flashvars=H}E=n.getParam("flash_video_player_params",{allowfullscreen:true,allowscriptaccess:true});tinymce.each(E,function(J,I){A.params[I]=""+J})}A=g.parse(u.attr("data-mce-json"));o=this.getType(u.attr("class"));w=u.attr("data-mce-style");if(!w){w=u.attr("style");if(w){w=n.dom.serializeStyle(n.dom.parseStyle(w,"img"))}}if(this.editor.settings.media_use_script){replacement=new b("script",1).attr("type","text/javascript");t=new b("#text",3);t.value="write"+o.name+"("+g.serialize(tinymce.extend(A.params,{width:u.attr("width"),height:u.attr("height")}))+");";replacement.append(t);u.replace(replacement);return}if(o.name==="Video"&&A.video.sources[0]){x=new b("video",1).attr(tinymce.extend({id:u.attr("id"),width:u.attr("width"),height:u.attr("height"),style:w},A.video.attrs));if(A.video.attrs){k=A.video.attrs.poster}j=A.video.sources=d(A.video.sources);for(v=0;v<j.length;v++){if(/\.mp4$/.test(j[v].src)){l=j[v].src}}if(!j[0].type){x.attr("src",j[0].src);j.splice(0,1)}for(v=0;v<j.length;v++){s=new b("source",1).attr(j[v]);s.shortEnded=true;x.append(s)}if(l){p(l,k);o=r.getType("flash")}else{A.params.src=""}}if(A.params.src){if(/\.flv$/i.test(A.params.src)){p(A.params.src,"")}if(m&&m.force_absolute){A.params.src=n.documentBaseURI.toAbsolute(A.params.src)}B=new b("object",1).attr({id:u.attr("id"),width:u.attr("width"),height:u.attr("height"),style:w});tinymce.each(tinymce.explode("name,bgcolor,align,vspace,hspace"),function(i){if(A[i]){B.attr(i,A[i])}});for(C in A.params){q=new b("param",1);q.shortEnded=true;t=A.params[C];if(C==="src"&&o.name==="WindowsMedia"){C="url"}q.attr({name:C,value:t});B.append(q)}if(this.editor.getParam("media_strict",true)){B.attr({data:A.params.src,type:o.mimes[0]})}else{B.attr({classid:"clsid:"+o.clsids[0],codebase:o.codebase});h=new b("embed",1);h.shortEnded=true;h.attr({id:u.attr("id"),width:u.attr("width"),height:u.attr("height"),style:w,type:o.mimes[0]});for(C in A.params){h.attr(C,A.params[C])}tinymce.each(tinymce.explode("name,bgcolor,align,vspace,hspace"),function(i){if(A[i]){h.attr(i,A[i])}});B.append(h)}if(A.object_html){t=new b("#text",3);t.raw=true;t.value=A.object_html;B.append(t)}if(x){x.append(B)}}if(x){if(A.video_html){t=new b("#text",3);t.raw=true;t.value=A.video_html;x.append(t)}}if(x||B){u.replace(x||B)}else{u.remove()}},objectToImg:function(w){var D,h,y,E,F,s,u,r,z,x,o,n,B,v,j,C,m,A=this.lookup,k,t,q=this.editor.settings.url_converter,l=this.editor.settings.url_converter_scope;function p(i){return new tinymce.html.Serializer({inner:true,validate:false}).serialize(i)}if(!w.parent){return}if(w.name==="script"){if(w.firstChild){k=a.exec(w.firstChild.value)}if(!k){return}m=k[1];C={video:{},params:g.parse(k[2])};u=C.params.width;r=C.params.height}C=C||{video:{},params:{}};E=new b("img",1);E.attr({src:this.url+"/img/trans.gif"});F=w.name;if(F==="video"){y=w;D=w.getAll("object")[0];h=w.getAll("embed")[0];u=y.attr("width");r=y.attr("height");s=y.attr("id");C.video={attrs:{},sources:[]};t=C.video.attrs;for(F in y.attributes.map){t[F]=y.attributes.map[F]}v=w.attr("src");if(v){C.video.sources.push({src:q.call(l,v,"src","video")})}j=y.getAll("source");for(x=0;x<j.length;x++){v=j[x].remove();C.video.sources.push({src:q.call(l,v.attr("src"),"src","source"),type:v.attr("type"),media:v.attr("media")})}if(t.poster){t.poster=q.call(l,t.poster,"poster","video")}}if(w.name==="object"){D=w;h=w.getAll("embed")[0]}if(w.name==="embed"){h=w}if(D){u=u||D.attr("width");r=r||D.attr("height");z=z||D.attr("style");s=s||D.attr("id");B=D.getAll("param");for(x=0;x<B.length;x++){n=B[x];F=n.remove().attr("name");if(!c[F]){C.params[F]=n.attr("value")}}C.params.src=C.params.src||D.attr("data")}if(h){u=u||h.attr("width");r=r||h.attr("height");z=z||h.attr("style");s=s||h.attr("id");for(F in h.attributes.map){if(!c[F]&&!C.params[F]){C.params[F]=h.attributes.map[F]}}}if(C.params.movie){C.params.src=C.params.src||C.params.movie;delete C.params.movie}if(C.params.src){C.params.src=q.call(l,C.params.src,"src","object")}if(y){m=A.video.name}if(D&&!m){m=(A[(D.attr("clsid")||"").toLowerCase()]||A[(D.attr("type")||"").toLowerCase()]||{}).name}if(h&&!m){m=(A[(h.attr("type")||"").toLowerCase()]||{}).name}w.replace(E);if(h){h.remove()}if(D){o=p(D.remove());if(o){C.object_html=o}}if(y){o=p(y.remove());if(o){C.video_html=o}}E.attr({id:s,"class":"mceItemMedia mceItem"+(m||"Flash"),style:z,width:u||"320",height:r||"240","data-mce-json":g.serialize(C,"'")})}});tinymce.PluginManager.add("media",tinymce.plugins.MediaPlugin)})();