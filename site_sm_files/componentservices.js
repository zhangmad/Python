uiCore.directive("guide",[function(){return{restrict:"AE",replace:true,require:"^pid",template:'<div class="c60_fbar_bg_guide_block"><div class="c60_fbar_guidemask"></div><div class="c60_fbar_guideimg"></div><ul class="c60_fbar_zhidao_ul_circle"><li class="c60_fbar_zh_uc_li_curr" ng-repeat="i in indexarray" ng-style="getcircleStyle($index)"></li></ul></div>',scope:{},controller:["$scope","$element","$attrs","coreService","coreUtils","Const",function(d,c,b,e,a,f){d.cid=b.cid;d.eventMap={};d.compData={};var g=angular.element(c[0].querySelector(".c60_fbar_guideimg"));d.currentIndex=0;d.updateData=function(m){var h=d.compData.JS.stepconfig;var l=[];var k=[];for(var j=0;j<10;j++){if(h["step"+j]){l.push(j);k.push(h["step"+j])}}d.indexarray=l;d.cssarray=k;d.maxindex=k.length-1;d.ismessagestatuschange=false};d.getcircleStyle=function(h){if(d.indexarray.length>1){if(h==d.currentIndex){return{"background-color":""}}else{return{"background-color":"#FFF"}}}else{return{display:"none"}}};d.init=function(){e.registerComponentInstance(c.attr("cid"),d);var h=e.getInitProperties(b.cid)||{};d.compData=a.extendDeep(d.compData||{},h);c.css(d.compData.css||{});d.updateData();d.drag()};d.currentIndex=0;d.drag=function(){var j=f.touchEvent.start;var i=f.touchEvent.move;var o=f.touchEvent.end;var l=0;var n=0;var m=0;var h=0;g.bind(j,function(p){n=p.touches?p.touches[0].pageX:p.pageX});g.bind(i,function(p){h=p.touches?p.touches[0].pageX:p.pageX});var k=function(){if(false==d.ismessagestatuschange){if(top.tlbs.messageid!=""){e.fireEvent(d.cid,"messagestatuschange",{messageid:top.tlbs.messageid})}}};g.bind(o,function(q){var p=h-n;k();d.ismessagestatuschange=true;if(p<0){if(d.currentIndex<d.maxindex){d.currentIndex=d.currentIndex+1}else{top.tlbs.notificationCdrData=null;d.hide()}}else{if(d.currentIndex>0){d.currentIndex=d.currentIndex-1}}g.css(d.cssarray[d.currentIndex]);d.$apply()})};d.hide=function(){c.css({display:"none"})};d.goSummaryAndShowGuide=function(h){e.fireEvent("buoy","click",h)};d.show=function(h){if(!h||!h.showGuide){return}top.tlbs.messageid=h.messageid||"";g.css(d.cssarray[0]);d.currentIndex=0;c.css({display:"block"})};d.eventMap.show=d.show;d.eventMap.hide=d.hide;d.eventMap.goSummaryAndShowGuide=d.goSummaryAndShowGuide;d.$on(b.cid+"_handleEvent",function(j,k,i,h){if(d.eventMap[k]){d.eventMap[k](i);if(null!=h){h.resolve()}}})}],link:function(d,b,a,c){d.pageID=c.pageID;d.componentType="guide";d.init()}}}]);
uiCore.directive("richtrafficdata",[function(){return{restrict:"AE",replace:true,require:"^pid",scope:{traffic:"=traffic",traffictime:"=traffictime"},template:'<div class="c60_fbar_liul_text c60_fbar_common_open_gpu"><p class="c60_fbar_liul_texth1 clearfloat"><span class="c60_fbar_liul_texth1span" ng-bind=remainnumvalue></span><span class="c60_fbar_liul_texth1spanalarm"><span class="c60_fbar_liul_alarm" ng-bind=alarm></span><b class="c60_fbar_liul_texth1b" ng-bind=remainfloatvalue></b></span></p><p class="c60-trafficdata-desc"><span class="c60_fbar_liul_textpspan" ng-bind=unit></span><b class="c60_fbar_liul_textpb" ng-bind=remaintips></b></p><p class="c60_fbar_date"><i class="c60_fbar_liul_textpi" ng-bind=traffictime></i></p></div>',controller:["$scope","$element","$attrs","coreService","coreUtils","Const",function(i,j,h,b,d,a){var c=angular.element(j[0].querySelector(".c60_fbar_liul_texth1span"));var k=angular.element(j[0].querySelector(".c60_fbar_liul_texth1b"));var g=angular.element(j[0].querySelector(".c60_fbar_liul_textpspan"));var f=angular.element(j[0].querySelector(".c60_fbar_liul_textpb"));var e=angular.element(j[0].querySelector(".c60_fbar_liul_alarm"));i.applyConfig=function(){var n=d.String2JSON(h.stateconfig);n.num=n.num||{};n.desc=n.desc||{};n.exceeddesc=n.exceeddesc||n.desc;n.exceednum=n.exceednum||n.num;var q=i.traffic.remainN.v;i.unit=i.traffic.remainN.u;var p=n.alarm||{};i.alarm=p.text||"";var m=(Math.abs(q)+"").split(".");i.remainnumvalue=m[0];if(m[1]){i.remainfloatvalue="."+m[1]}var o=q>0?n.desc.style:n.exceeddesc.style;var l=q>0?n.num.style:n.exceednum.style;if(q<0){i.remaintips=i.traffic.desc.overflowdesc}else{i.remaintips=i.traffic.desc.remaindesc}f.css(o||{});g.css(o||{});c.css(l||{});k.css(l||{});e.css(p.style||{})};i.$watch(h,function(){i.applyConfig()})}],link:function(d,b,a,c){}}}]);
uiCore.directive("trafficball",[function(){return{restrict:"AE",replace:true,require:"^pid",template:'<div class="c60_fbar_liul_tab_box"><div class="c60_fbar_liul_tab_cont"><div class="c60_fbar_trafficball"><div class="c60_fbar_trafficball_img"></div><richtrafficdata traffic=traffic traffictime=traffictime stateconfig="{{::config.descConfig}}"></richtrafficdata></div>',scope:{traffic:"=traffic",traffictime:"=traffictime",index:"=index"},controller:["$scope","$element","$attrs","coreService","coreUtils","Const","$timeout",function(d,c,b,f,a,g,e){var h=angular.element(c[0].querySelector(".c60_fbar_trafficball_img"));d.updatecount=0;d.getStates=function(m){var j=a.String2JSON(b.stateconfig);for(var k=0;k<10;k++){var l=j["state"+k];if(l){if(m<=Number(l.maxvalue)&&m>Number(l.minvalue)){return{ballStyle:l.config.ballStyle,imageStyle:l.config.imageStyle,descConfig:l.config.descConfig}}}}return{ballStyle:{},imageStyle:{},descConfig:{}}};d.createAnmiateFrame=function(){var p=d.currentpercent;var r=top.document.styleSheets;var j=(1-p)*12.5;var m="ui-com-trafficball-wave-animation-"+d.index+"-"+d.updatecount;d.updatecount++;try{var l=top.document.styleSheets;var q=null;var n=0;for(var k in l){try{if(l[k].cssRules&&l[k].title!="toolbar"){q=l[k];n=l[k].cssRules.length;break}}catch(o){}}var s=m+" { 0% {background-position: 0 "+j+"em;} 100% {background-position: 12.5em "+j+"em;}}";try{q.insertRule("@-webkit-keyframes "+s,n)}catch(o){try{q.insertRule("@-moz-keyframes "+s,n)}catch(o){try{q.insertRule("@keyframes "+s,n)}catch(o){try{q.insertRule("@-o-keyframes "+s,n)}catch(o){throw o}}}}h.css({"-webkit-animation":m+" 1s linear infinite",animation:m+" 1s infinite linear","-moz-animation":m+" 1s infinite linear","-webkit-animation":m+" 1s infinite linear","-o-animation":m+" 1s infinite linear","-webkit-transform":"translate3d(0,0,0)",transform:"translate3d(0,0,0)",})}catch(o){h.css({"background-position":"0px "+j+"em"})}};d.show=function(){var m=d.traffic;if(m){var k=m.total||0;var j=m.used||0;var n=k-j;n=n<0?0:n;d.ecid=m.ecid;var l=0;if(k!=0){l=Number(n/k*100)}d.currentpercent=l/100;d.createAnmiateFrame();e(d.createAnmiateFrame,2000);var i=null;if(l==0){i=d.getStates(l+0.001)}else{i=d.getStates(l)}if(i){d.config=i;h.css(i.imageStyle||{});c.css(i.ballStyle||{})}}};d.$watch(b,function(){d.show()});d.init=function(){try{var i=parseInt(top.window.innerHeight);if(i<=375){c.css({"margin-top":"0em"})}}catch(j){}}}],link:function(d,b,a,c){d.init()}}}]);
uiCore.directive("abnormaltips",[function(){return{restrict:"AE",replace:true,require:"^pid",template:'<div class="c60_fbar_abnormalwrapper"><div class="c60_fbar_abnormalicon"><span class="c60_fbar_abnormalspan"></span></div><div class="c60_fbar_abnormaldesc" ng-bind="compData.js.description"></div></div>',scope:{},controller:["$scope","$element","$attrs","coreService","coreUtils","Const",function(j,k,h,c,d,b){j.eventMap={};j.compData={js:{},css:{}};var a=k;var g=null;var f=angular.element(k[0].querySelector(".c60_fbar_abnormalicon"));var i=angular.element(k[0].querySelector(".c60_fbar_abnormalspan"));var e=angular.element(k[0].querySelector(".c60_fbar_abnormaldesc"));j.init=function(l){a.css(l.CSS||{});f.css(l.JS.icon||{});i.css(l.JS.text||{});e.css(l.JS.desc||{});g=l.JS.errorcodetips};j.show=function(o){var m=g[o.errorcode]||g["default"]||{};var l=m.CSS||{};var n=m.JS?m.JS.description:"";j.compData.js.description=n;f.css(l)};j.$on("trafficquryerror",function(l,m){j.show(m)});j.$on("abnormaltipsinit",function(l,m){j.init(m)})}],link:function(d,b,a,c){d.pageID=c.pageID;d.componentType="abnormaltips"}}}]);
uiCore.directive("summary",[function(){return{restrict:"AE",replace:true,require:"^pid",template:'<div class="c60_fbar_summary" event="noevent"><abnormaltips ng-click="ballclick()" ng-show="compData.JS.errortipsshow"></abnormaltips><div class="c60_fbar_liul_tab"><ul class="c60_fbar_liul_tab_ul"><li class="c60_fbar_liul_tab_li" ccid="c60_fbar_liul_tab_li" ng-style="getFontColor($index)" ng-click="tabClick($event,$index,trafficlist.length,this);" ng-repeat="category in trafficlist" ng-bind=category.categoryname></li></ul></div><div class="c60_fbar_liul_tab_container_div"><dl ng-style="getWidth(trafficlist.length)" class="c60_fbar_liul_tab_container_dl"><dd class="c60_fbar_liul_tab_container_dd" ng-repeat="traffic in trafficlist"><div class="c60_fbar_liul_tab_container_dd_left"><trafficdata  value=traffic.leftdata></trafficdata></div><div class="c60_fbar_liul_tab_ul"><trafficball ng-click="ballclick()" ccid="c60_fbar_trafficball" index=$index traffic=traffic traffictime=traffictime stateconfig="{{::compData.JS}}"></trafficball></div><div class="c60_fbar_liul_tab_container_dd_right"><trafficdata  value=traffic.rightdata></trafficdata></div></div></dd></dl></div></div>',scope:{},controller:["$scope","$element","$attrs","coreService","coreUtils","Const","$compile",function(l,m,k,b,e,a,f){l.compData={js:{},css:{}};l.eventMap={};var h=null;var d=null;l.currentIndex=0;l.getFontColor=function(n){if(n==l.currentIndex){return{color:"#fff"}}else{return{color:"#0d7164"}}};var j=function(n){e.recordTracingCdr(l.pageID,"us"+l.trafficlist[n].category||"-1",l.compData.JS.c60_fbar_liul_tab_li.JS.cdrConfig)};l.drag=function(){var s=a.touchEvent.start;var p=a.touchEvent.move;var u=a.touchEvent.end;var n=0;var q=0;var v=0;var o=0;var r=angular.element(m[0].querySelector(".c60_fbar_liul_tab_container_div"));var t=false;r.bind(s,function(w){w.stopPropagation();w.preventDefault();t=false;n=w.touches?w.touches[0].pageY:w.pageY;q=w.touches?w.touches[0].pageX:w.pageX});r.bind(p,function(w){w.stopPropagation();w.preventDefault();v=w.touches?w.touches[0].pageY:w.pageY;o=w.touches?w.touches[0].pageX:w.pageX;t=true});r.bind(u,function(y){y.stopPropagation();y.preventDefault();var x=o-q;var w=v-n;if(t&&Math.abs(x)>5){if(x<0){if(l.currentIndex<l.totallength-1){l.currentIndex=l.currentIndex+1;j(l.currentIndex)}}else{if(l.currentIndex>0){l.currentIndex=l.currentIndex-1;j(l.currentIndex)}}l.$apply();l.slideBall(l.currentIndex,l.totallength)}})};l.ballclick=function(){e.recordTracingCdr(l.pageID,e.createCdrid(l.pageID,k.cid,"ball"),l.compData.JS.c60_fbar_trafficball.JS.cdrConfig);b.fireEvent(m.attr("cid"),"ballclick")};l.tabClick=function(q,n,p,o){j(n);q.preventDefault();q.stopPropagation();l.currentIndex=n;l.slideBall(n,p)};l.slideBall=function(n,p){h=h||angular.element(m[0].querySelector(".c60_fbar_liul_tab_container_dl"));var o=n*100/p;h.css("-webkit-transform","translate(-"+o+"%,0px)");h.css("-moz-transform","translate(-"+o+"%,0px)");h.css("-ms-transform","translate(-"+o+"%,0px)");h.css("-o-transform","translate(-"+o+"%,0px)")};l.getWidth=function(n){l.totallength=n;return{width:(n*100)+"%"}};var g=function(n){return e.trafficValueTransferfromKB(n,Number(l.compData.JS.floatnum||2))};var c=function(s){var u=Number(l.compData.JS.floatnum||2);if(s){var x=null;for(var r=0,v=s.length;r<v;r++){x=s[r];x.ecid=l.cid;var t=Number(x.total)-Number(x.used);var p=Number(x.overflow);var n;var o=l.compData.JS.datadesc[x.categoryType+""]||{totaldesc:"总流量",useddesc:"已用流量",remaindesc:"剩余流量",overflowdesc:"超出流量",dayleftdesc:"日均可用"};x.desc=o;var w=function(y){return !y||y=="2"};if(w(x.categoryType)){x.totalN=g(x.total);x.totalN.desc=o.totaldesc;x.usedN=g(x.used);x.usedN.desc=o.useddesc;if(x.dateleft||(x.dateleft==0)){x.dayleftN=g(x.dateleft);x.dayleftN.desc=o.dayleftdesc}}else{x.totalN={v:e.formatNum(x.total,u),u:x.unit,desc:o.totaldesc};x.usedN={v:e.formatNum(x.used,u),u:x.unit,desc:o.useddesc};if(x.dateleft||(x.dateleft==0)){x.dayleftN={v:e.formatNum(x.dateleft,u),u:x.unit,desc:o.dayleftdesc}}}var q=(l.compData.JS.showItem||"total,used").split(",");x.leftdata=x[q[0]+"N"]||{v:"",u:""};x.rightdata=x[q[1]+"N"]||{v:"",u:""};if(p>0){if(w(x.categoryType)){n=g(p)}else{n={v:e.formatNum(p,u),u:x.unit}}n.v=0-n.v}else{if(w(x.categoryType)){n=g(t)}else{n={v:e.formatNum(t,u),u:x.unit}}}if(t!=0&&n.v==0){n.v=0.01}x.remainN=n}}};l.update=function(n){if(n.respparam){var o;l.totallength=0;if(n.respparam.trafficusage.traffics!==undefined&&n.respparam.trafficusage.traffics!==""&&n.respparam.trafficusage.traffics!==null){o=n.respparam.trafficusage.traffics;c(o);l.trafficlist=o;l.traffictime=n.respparam.trafficusage.traffictime;l.totallength=n.respparam.trafficusage.traffics.length}if(l.totallength==0){l.compData.JS.errortipsshow=true;l.showError({errorcode:"nodata"})}else{l.compData.JS.errortipsshow=false}}};l.getparam=function(n){try{var o=new RegExp("(^|&)"+n+"=([^&]*)(&|$)","i");var p=top.window.location.search.substr(1).match(o);if(p!=null){return unescape(p[2])}return""}catch(q){}};l.init=function(){b.registerComponentInstance(m.attr("cid"),l);var n=b.getInitProperties(k.cid)||{};l.compData.css=n.CSS||{};l.compData.JS=n.JS||{};m.css(l.compData.css);l.drag();l.$broadcast("abnormaltipsinit",l.compData.JS.errortipsconfig);if(l.getparam("subscribeid")&&l.getparam("appkey")){b.fireEvent(k.cid,"init1");top.subscribeid=l.getparam("subscribeid");top.subscribeid1=top.subscribeid}else{b.fireEvent(k.cid,"init")}i()};var i=function(){var p=angular.element(m[0].querySelector(".c60_fbar_liul_tab"));var o=l.compData.JS.showCategoryTab&&l.compData.JS.showCategoryTab==true;var n=o?"visible":"hidden";p.css("visibility",n)};l.showError=function(o){var n=o.errorcode;l.compData.JS.errortipsshow=true;l.trafficlist=null;l.$broadcast("trafficquryerror",{errorcode:n})};l.$on(k.cid+"_handleEvent",function(p,q,o,n){if(l.eventMap[q]){l.eventMap[q](o);if(null!=n){n.resolve()}}});l.changesrc=function(n){if(n&&n.ordersrc){top.tlbs.ordersrc=n.ordersrc}};l.eventMap.changesrc=l.changesrc;l.eventMap.update=l.update;l.eventMap.showerror=l.showError}],link:function(d,b,a,c){d.pageID=c.pageID;d.cid=a.cid;d.componentType="summary";d.init()}}}]);
uiCore.directive("trafficdata",[function(){return{restrict:"AE",replace:true,require:"^pid",template:'<div class="c60_fbar_top_left"><p class="c60_fbar_top_leftp"><b class="c60_fbar_top_leftpb" ng-bind=value.desc></b><span class="c60_fbar_top_leftpspan" ng-bind=value.u></span></p><p class="c60_fbar_top_leftp" ng-bind=value.v></p></div>',scope:{value:"=value",},controller:["$scope","$element","$attrs","coreService","coreUtils","Const",function(d,c,b,e,a,f){}],link:function(){}}}]);
uiCore.directive("togglebtn",[function(){return{restrict:"AE",replace:true,require:"^pid",template:'<div ng-click="doclick();$event.preventDefault();$event.stopPropagation();" ng-style="getStyle();" class="c60_fbar_toggle_btn" ccid="detailbtn"></div>',scope:{},controller:["$scope","$element","$attrs","coreService","coreUtils","Const",function(h,i,g,b,e,a){var d={};h.compData={JS:{},CSS:{}};var c=0;h.doclick=function(){f();b.fireEvent(i.attr("cid"),"toggle"+c);c=(c=="0"?"1":"0")};var f=function(){e.recordTracingCdr(h.pageID,e.createCdrid(h.pageID,g.cid,"btn"),h.compData.JS.cdrConfig)};var j=function(){c="0"};d.changState=j;h.init=function(){b.registerComponentInstance(i.attr("cid"),h);var k=b.getInitProperties(g.cid)||{};var m=k.JS||{};var l=k.CSS||{};h.jsProp=e.extendDeep(h.compData.JS,m);h.cssProp=e.extendDeep(h.compData.CSS,l);h.compData.JS=h.jsProp;h.compData.CSS=h.cssProp;i.css(h.compData.CSS||{})};h.getStyle=function(){return h.compData.JS["state"+c]||{}};h.$on(g.cid+"_handleEvent",function(m,n,l,k){if(d[n]){d[n](l);if(null!=k){k.resolve()}}})}],link:function(d,b,a,c){d.pageID=c.pageID;d.componentType="togglebtn";d.init()}}}]);
uiCore.directive("storefee",[function(){return{restrict:"EA",replace:true,require:"^pid",template:'<div class="c60_fbar_feewrapdiv"><div class="c60_fbar_feewrap"><div class="c60_fbar_feecontentwrap" ><div class="c60_fbar_feecons" ng-repeat="fee in feepkg"><div class="c60_fbar_feecon_title c60_fbar_clearfloat"><div class="c60_fbar_feecon_title_type ng-binding" style="background:{{fee.ccolor}}" ng-bind="fee.text==\'当前\'?fee.text:\'B\'"></div><div class="c60_fbar_feecon_title_price" style="background:{{fee.ccolor}}"><span class="c60_fbar_feecon_title_price_color" ><span class="c60_fbar_feecon_title_price_left_color" ng-bind="fee.name"></span><span class="c60_fbar_feecon_title_price_right_color" ng-bind="compData.JS.priceunit.value+fee.price"></span></span></div></div><div class="c60_fbar_feecon_comwrap"><div ng-show="fee.comboProperies.length>0?true:false" class="c60_fbar_feecon_txt" ng-repeat="com in fee.comboProperies" ng-bind="compData.JS.keyconfig[com.key].key+\':\'+com.value" ng-style="compData.JS.cssconfig[fee.comboProperies.length].CSS"></div><div class="c60_fbar_feecon_effecttype" ng-show="fee.effecttype!=undefined&&fee.effecttype!=null&&fee.effecttype!=\'\'" ng-bind="compData.JS.effectconfig[fee.effecttype].value"></div><div class="c60_fbar_feecon_txtdesc" ng-style="compData.JS.txtdesc.CSS" ng-bind-html="to_trusted(fee.desc)"></div></div></div></div><div class="c60_fbar_comments" ng-bind="compData.JS.comments.text"></div></div><div class="c60_fbar_changeorderbtn"><button class="c60_fbar_btn_changeorderd" ccid="c60_fbar_btn_changeorderd" ng-click="changebtn()" ng-bind="btncon"></button></div></div></div>',scope:{},controller:["$scope","$element","$attrs","coreService","coreUtils","Const",function(d,c,b,f,a,g){d.cid=b.cid;d.eventMap={};d.compData={CSS:{},JS:{}};var e=angular.element(c[0].querySelector(".c60_fbar_btn_changeorderd"));d.to_trusted=function(h){return a.getTrustedHtml(h)};d.update=function(i){if(i){d.pmdatas=i.pmdatas||"",d.feepkg=i.pmdata||"";var h=[d.feepkg[0].color,d.feepkg[1].color];d.feepkg[0].ccolor=h[1];d.feepkg[1].ccolor=h[0];d.btncon=d.compData.JS.buttonconfig.text||"";d.taskId=i.taskId||""}};d.changebtn=function(){if(top.tlbs.messageid!=""){f.fireEvent(d.cid,"messagestatuschange",{messageid:top.tlbs.messageid})}a.recordTracingCdr(d.pageID,a.createCdrid(d.pageID,b.cid,"btn"),d.compData.JS.changeorderdbtn.cdrConfig,{iseComp:"1"});f.fireEvent(d.cid,"receive",{pmdata:d.pmdatas,taskId:d.taskId})};d.eventMap.update=d.update;d.extendComponentData=function(h){a.extendDeep(d.compData,h)};d.init=function(){f.registerComponentInstance(d.cid,d);var h=f.getInitProperties(b.cid)||{};d.compData=a.extendDeep(d.compData||{},h);c.css(d.compData.CSS||{});d.extendComponentData(f.getInitProperties(d.cid)||{})};d.$on(d.cid+"_handleEvent",function(k,i,j,h){d.eventMap[i](j,h);if(null!=h){h.resolve()}})}],link:function(d,b,a,c){d.pageID=c.pageID;d.componentType="storefee";d.init()}}}]);
uiCore.directive("buoy",[function(){return{restrict:"AE",replace:true,require:"^pid",template:'<div class="c60_fbar_buoy" ccid="c60_fbar_buoy"><div class="c60_fbar_buoy_img">&nbsp;</div><div class="c60_fbar_buoy_value"><span class="c60_fbar_buoy_value_percent" ng-bind="compData.JS.value"></span></div></div>',scope:{},controller:["$scope","$element","$attrs","coreService","coreUtils","Const","$timeout","$interval",function(m,n,l,b,d,a,c,e){m.cid=l.cid;m.compData={js:{},css:{}};var i=0;m.eventMap={};m.doclick=function(){b.fireEvent(n.attr("cid"),l.event||"click")};var f=angular.element(n[0].querySelector(".c60_fbar_buoy_img"));var k=angular.element(n[0].querySelector(".c60_fbar_buoy_value"));var o=angular.element(n[0].querySelector(".c60_fbar_buoy_value_percent"));var h=0;var g=0;var j=function(p,q){n.css("-webkit-transform","translate("+p+"px,"+q+"px)");n.css("-moz-transform","translate("+p+"px,"+q+"px)");n.css("-ms-transform","translate("+p+"px,"+q+"px)");n.css("-o-transform","translate("+p+"px,"+q+"px)")};m.getStates=function(r){for(var p=0;p<10;p++){var q=m.compData.JS["state"+p];if(q){if(r<=Number(q.maxvalue)&&r>Number(q.minvalue)){return{valueStyle:q.valueStyle,imageStyle:q.imageStyle}}}}return{valueStyle:{},imageStyle:{}}};m.createAnmiateFrame=function(w){var p=(1-w)*(m.compData.JS.height||3.5);try{i++;var A="c60_fbar_buoy_wave_animation_"+(i)+"{0% {background-position: 0 "+p+"em;} 100% {background-position: 3.54em "+p+"em;}}";var t=top.document.styleSheets;var x=null;var u=0;var q=t.length;for(var s in t){try{if(t[s].cssRules&&t[s].title!="toolbar"){x=t[s];u=t[s].cssRules.length;break}}catch(v){}}try{x.insertRule("@-webkit-keyframes "+A,u)}catch(v){try{x.insertRule("@keyframes  "+A,u)}catch(v){try{x.insertRule("@-moz-keyframes  "+A,u)}catch(v){try{x.insertRule("@-o-keyframes  "+A,u)}catch(v){throw v}}}}var r=[];r.push("c60_fbar_buoy_wave_animation_"+i);r.push(m.compData.JS.animation.duration||"1s");r.push(m.compData.JS.animation.times||"infinite");r.push(m.compData.JS.animation.func||"linear");var y=r.join(" ");var z={"-moz-animation":y,"-o-animation":y,"-webkit-animation":y,animation:y};f.css(z)}catch(v){console.log(v);f.css({"background-position":"0 "+p+"em",})}};m.createJumpAnmiateFrame=function(){var r=(parseInt(top.window.getComputedStyle(n[0],null)["width"])-top.window.innerWidth)/2;try{var v=top.document.styleSheets;var q=null;var p=0;for(var s=v.length-1;s>=0;s--){if(v[s].cssRules&&v[s].href){q=v[s];p=v[s].cssRules.length;break}}try{var u="@-webkit-keyframes c60_fbar_buoy_jump_animation {0% {-webkit-transform: translate("+r+"px, -300px);} 40% { -webkit-transform: translate("+r+"px, -0px);} 60% {-webkit-transform: translate("+r+"px, -80px);} 70% {-webkit-transform: translate("+r+"px, -0px);} 80% {-webkit-transform: translate("+r+"px, -30px);} 90% {-webkit-transform: translate("+r+"px, 0px);} 100% {-webkit-transform: translate("+r+"px, 0px);}}";q.insertRule(u,p)}catch(t){try{q.insertRule("@keyframes c60_fbar_buoy_jump_animation {0% {transform: translate(-500px, -300px);} 40% { transform: translate(-500px, -0px);} 60% {transform: translate(-500px, -80px);} 70% {transform: translate(-500px, -0px);} 80% {transform: translate(-500px, -30px);} 90% {transform: translate(-500px, 0px);} 100% {transform: translate(-500px, 0px);}}",p)}catch(t){try{q.insertRule("@-moz-keyframes c60_fbar_buoy_jump_animation {0% {-moz-transform: translate(-500px, -300px);} 40% { -moz-transform: translate(-500px, -0px);} 60% {-moz-transform: translate(-500px, -80px);} 70% {-moz-transform: translate(-500px, -0px);} 80% {-moz-transform: translate(-500px, -30px);} 90% {-moz-transform: translate(-500px, 0px);} 100% {-moz-transform: translate(-500px, 0px);}}",p)}catch(t){try{q.insertRule("@-o-keyframes c60_fbar_buoy_jump_animation {0% {-o-transform: translate(-500px, -300px);} 40% { -o-transform: translate(-500px, -0px);} 60% {-o-transform: translate(-500px, -80px);} 70% {-o-transform: translate(-500px, -0px);} 80% {-o-transform: translate(-500px, -30px);} 90% {-o-transform: translate(-500px, 0px);} 100% {-o-transform: translate(-500px, 0px);}}",p)}catch(t){throw t}}}}n.css(m.compData.JS.jumpanimation)}catch(t){n.css({display:"block"})}};m.showerror=function(){f.css(m.compData.JS.defaultImageStyle||{})};m.show=function(t){var r=t.respparam;if(r&&r.trafficusage){var q=r.trafficusage;var w=q.total;var y=q.used;if(m.total==w&&m.used==y){return}else{m.total=w;m.used=y}var v=w-y;v=v<0?0:v;var u=m.compData.JS.floatcount||2;var s="0";if(w!=0){s=Number(v/w*100).toFixed(u)}else{f.css(m.compData.JS.defaultImageStyle||{});k.css(m.compData.JS.defaultValueStyle||{});return true}if(m.compData.JS.threshold&&Number(s)>Number(m.compData.JS.threshold)){f.css(m.compData.JS.defaultImageStyle||{});k.css(m.compData.JS.defaultValueStyle||{});return true}m.createAnmiateFrame(s/100);var p=null;if(s==0){p=m.getStates(Number(s)+0.001)}else{p=m.getStates(Number(s))}if(p){f.css(p.imageStyle);k.css(p.valueStyle);if(p.valueStyle.color){o.css({color:p.valueStyle.color})}}var x=s.split(".");if(x.length==2&&Number(x[1])==0){s=x[0]}m.compData.JS.value=s+"%"}};m.setInitPosition=function(){var p=top.tlbs.ballpos;if(p){if(Number(p.x||"0")!==0){h=parseInt(top.window.getComputedStyle(n[0],null)["width"])-top.window.innerWidth;g=Number(p.y||"0")*top.window.innerHeight}else{h=0;g=Number(p.y||"0")*top.window.innerHeight}}j(h,g)};m.init=function(){b.registerComponentInstance(n.attr("cid"),m);var q=b.getInitProperties(l.cid)||{};m.compData.css=q.CSS||{};m.compData.JS=q.JS||{};n.css(m.compData.css);f.css(m.compData.JS.defaultImageStyle||{});k.css(m.compData.JS.defaultValueStyle||{});m.setInitPosition();if(top.tlbs.dayfirstflag=="1"){m.createJumpAnmiateFrame()}if(m.compData.JS.timerstate){m.compData.JS.timerstate=false;m.startAutoStateChangeTimer(null,null)}b.fireEvent(n.attr("cid"),"init");var r={cdrType:"uidisplaycdr",enable:true,storeData:false};var p={pageId:"ibuoy",displayType:1,displayResult:0};d.cdrService(r,p)};m.drag=function(){var u=a.touchEvent.start;var q=a.touchEvent.move;var w=a.touchEvent.end;var s=0;var v=0;var t=0;var p=0;var r=false;n.bind(u,function(z){z.stopPropagation();z.preventDefault();s=top.window.innerWidth;v=top.window.innerHeight;var y=z.touches?z.touches[0].pageY:z.pageY;var B=z.touches?z.touches[0].pageX:z.pageX;var A=function(F){F.stopPropagation();F.preventDefault();m.stopAutoStateChangeTimer();var G=F.touches?F.touches[0].pageY:F.pageY;var C=F.touches?F.touches[0].pageX:F.pageX;var D=G-y;var E=C-B;y=G;B=C;if(Math.abs(D)>3||Math.abs(E)>3||r){r=true;h=h+E;g=g+D;j(h,g)}};var x=function(C){try{C.stopPropagation();C.preventDefault();m.startAutoStateChangeTimer();if(!r){var D={pageId:"ibuoy",pageid:"summarypage"};d.recordTracingCdr(m.pageID,d.createCdrid(m.pageID,l.cid,"btn"),m.compData.JS.buoyCdr.cdrConfig,{iseComp:"1"});b.fireEvent(n.attr("cid"),l.event||"click")}else{t=parseInt(top.window.getComputedStyle(n[0],null)["width"]);p=parseInt(top.window.getComputedStyle(n[0],null)["height"]);if(h>0){h=0}else{if(Math.abs(h)*2>s){h=0-s+t}else{(h=0)}}if(g>0){g=0}else{if(Math.abs(g)>v-p){g=0-v+p}}j(h,g);b.fireEvent(n.attr("cid"),"positionchange",{x:Number(h/s).toFixed(3),y:Number(g/v).toFixed(3)})}}finally{r=false;top.document.removeEventListener(q,A,false);top.document.removeEventListener(w,x,false)}};top.document.addEventListener(q,A,false);top.document.addEventListener(w,x,false)})};m.startAutoStateChangeTimer=function(q,p){if(!m.compData.JS.timerstate){m.compData.JS.timerstate=true;m.timerInterval=e(function(){m.compData.JS.stateconfig.state=0;var r=m.compData.JS.stateconfig["state"+m.compData.JS.stateconfig.state];n.css(r);e.cancel(m.timerInterval);m.compData.JS.timerstate=false},m.compData.JS.autostatechangetimeout)}if(null!=p){p.resolve()}};m.stopAutoStateChangeTimer=function(q,p){e.cancel(m.timerInterval);m.compData.JS.stateconfig.state=1;m.compData.JS.timerstate=false;var r=m.compData.JS.stateconfig["state"+m.compData.JS.stateconfig.state];n.css(r)};m.eventMap.startAutoStateChangeTimer=m.startAutoStateChangeTimer;m.eventMap.stopAutoStateChangeTimer=m.stopAutoStateChangeTimer;m.$on(l.cid+"_handleEvent",function(r,s,q,p){if(m.eventMap[s]){m.eventMap[s](q);if(null!=p){p.resolve()}}});m.eventMap.show=m.show;m.eventMap.showerror=m.showerror;m.hide=function(){n.css("display","none")};m.eventMap.hide=m.hide}],link:function(d,b,a,c){d.pageID=c.pageID;d.componentType="buoy";d.init();d.drag()}}}]);
uiCore.directive("datagift",[function(){return{restrict:"AE",replace:true,require:"^pid",template:'<div ng-class="{\'c60_fbar_store\':true}" class="c60_fbar_store"><div ng-class="{\'c60_fbar_wrapper\':true}" class="c60_fbar_wrapper c60_fbar_datagiftwrapper"><div ng-style="compData.JS.c60_fbar_img_bgimg"></div><div ng-class="{\'c60_fbar_datalistpackageList\':true}"><ul ng-class="{\'c60_fbar_datagiftpackagePriceDescList\':true}" class="c60_fbar_ulwrapper" simplescroll><datagifttable  catatoryindex=$index param=redEnvs ></datagifttable></ul><div class="c60_fbar_store_no_more" ng-show="catagroy.list.length==0?true:false"><span ng-bind="no_more_title"></span><div ng-bind-html="to_trusted(no_more_desc)"></div></div></div></div><div ng-class="{\'c60_fbar_bg_pop_block2\':true}"  ng-click="$event.stopPropagation();"><div class="c60_fbar_bg_pop_nopkg"></div></div><div ng-class="{\'c60_fbar_pop_datagiftblock2\':true}"><div ng-class="{\'c60_fbar_getcoinloader\':true}"><div class="c60_fbar_taocan_result_con1"><div class="c60_fbar_datouwang8"><div class="c60_fbar_datouwang8-container c60_fbar_container1"><div class="c60_fbar_circle1 c60_fbar_container_div"></div><div class="c60_fbar_circle2 c60_fbar_container1_circle2 c60_fbar_container_div"></div><div class="c60_fbar_circle3 c60_fbar_container1_circle3 c60_fbar_container_div"></div><div class="c60_fbar_circle4 c60_fbar_container1_circle4 c60_fbar_container_div"></div></div><div class="c60_fbar_datouwang8-container c60_fbar_container2"><div class="c60_fbar_circle1 c60_fbar_container2_circle1 c60_fbar_container_div"></div><div class="c60_fbar_circle2 c60_fbar_container2_circle2 c60_fbar_container_div"></div><div class="c60_fbar_circle3 c60_fbar_container2_circle3 c60_fbar_container_div"></div><div class="c60_fbar_circle4 c60_fbar_container2_circle4 c60_fbar_container_div"></div></div><div class="c60_fbar_datouwang8-container c60_fbar_container3"><div class="c60_fbar_circle1 c60_fbar_container3_circle1 c60_fbar_container_div"></div><div class="c60_fbar_circle2 c60_fbar_container3_circle2 c60_fbar_container_div"></div><div class="c60_fbar_circle3 c60_fbar_container3_circle3 c60_fbar_container_div"></div><div class="c60_fbar_circle4 c60_fbar_container3_circle4 c60_fbar_container_div"></div></div></div><div class="c60_fbar_tips_txt_loading ng-binding" ng-bind="compData.JS.loadingtext.JS.textdata">Loading...</div></div></div><div ng-class="{\'c60_fbar_getcoinsuccess\':true}"><div class="c60_fbar_datagifttit"><span class="c60_fbar_ncp_tit_txt ng-binding"></span><span class="c60_fbar_ncp_datagiftclose"  ng-click="popBlockHide();$event.stopPropagation();"></span></div><div ng-class="{\'c60_fbar_getcoinsuccessInner\':true}"><table cellpadding="0" cellspacing="0" ng-class="{\'c60_fbar_img_txt_table\':true}"><tr><td ng-class="{\'c60_fbar_totalwoncoin\':true}"><span ng-bind="giftcointotal">60</span></td></tr><tr><td><div ng-class="{\'c60_fbar_pop_congratulations\':true}" ng-bind="compData.JS.dgsubscribesuccessdata0.JS.textdata">Congratulations!</div></td></tr><tr><td><div ng-class="{\'c60_fbar_pop_successmessage\':true}"><span ng-class="{\'c60_fbar_datagift_obtaintxt\':true}" ng-bind="compData.JS.dgsubscribesuccessdata1.JS.textdata" >You have obtained </span><span ng-class="{\'c60_fbar_sx_giftcount\':true}" ng-bind="giftcointotal">60</span><span ng-bind="compData.JS.dgsubscribesuccessdata3.JS.textdata"> data coins.</span></div></td></tr><tr class="c60_fbar_datagift_successbutton"><td><div class="c60_fbar_datagift_successbuttonholder"><button ng-class="{\'c60_fbar_datagiftBuyNowBtnf\':true}" ng-click="popBlockHide();$event.stopPropagation();" ng-bind="compData.JS.dgsubscribesuccessok.JS.textdata">OK</button></div></td></tr></table></div></div><div ng-class="{\'c60_fbar_getcoinerror\':true}"><div class="c60_fbar_datagifttit"><span class="c60_fbar_ncp_tit_txt ng-binding"></span><span class="c60_fbar_ncp_datagiftclose"  ng-click="popBlockHide();$event.stopPropagation();"></span></div><div ng-class="{\'c60_fbar_getcoinerrorInner\':true}"><table cellpadding="0" cellspacing="0" ng-class="{\'c60_fbar_img_txt_table\':true}"><tr><td ng-class="{\'c60_fbar_totalwoncoin\':true}"><span>?</span></td></tr><tr><td><div ng-class="{\'c60_fbar_pop_failure\':true}"  ng-bind="compData.JS.dgerrormsg.JS.textdata">Oops, the prize is gone.</div></td></tr><tr class="c60_fbar_datagift_successbutton"><td><div class="c60_fbar_datagift_successbuttonholder"><button ng-class="{\'c60_fbar_datagiftBuyNowBtnf\':true}" ng-click="dgobtainAgain();$event.stopPropagation();" ng-bind="compData.JS.dgerrorbtn.JS.textdata">Obtain Again</button></div></td></tr></table></div></div><div ng-style="compData.JS.c60_fbar_img_dgbtmbgimg"></div></div></div>',scope:{},controller:["$scope","$element","$attrs","$timeout","coreService","coreUtils","Const","$sce",function(o,p,n,d,c,e,a,l){o.cid=n.cid;o.compData={};o.selectedPkg={};o.homeflag=0;o.effectiveWayFlag=0;o.effectiveLeftRightFlag=0;o.effectiveLeftRightFlag2=0;o.flowUpshiftFlag="1";o.buyBtnType={};o.currentCategoryId=undefined;o.eventMap={};o.orderedPackage={};o.packageStatus={};o.taskId="";o.no_more_title="";o.no_more_desc="";o.effecttimevalue="0";o.effectperiod="0";o.monthpack="1";o.globalpackages={};o.to_trusted=function(q){if(q!=null&&q!=undefined){q=q+"";return l.trustAsHtml(q.replace(/\n/g,"<br/>"))}else{return""}};var k=true;var h=undefined;var g=undefined;var j=true;var i=undefined;var f=1;o.updateData=function(r,q){o.redEnvs=r.respparam.redEnvs};o.getStyleWidth=function(q,r){if(q!=null&&q!=undefined&&r!=null&&r!=undefined){if(r==0){if(q.length<=o.maxdisplaynum){return{width:"100%"}}else{return{width:q.length*100/o.maxdisplaynum+"%"}}}else{if(r==1){return{width:q.length*100+"%"}}else{return{width:(100/(q.length))+"%"}}}}};o.buyNowBtnStyle=function(){if(o.selectedPkg[o.currentCategoryId]!=null&&o.selectedPkg[o.currentCategoryId]!=undefined&&o.selectedPkg[o.currentCategoryId]){return o.compData.JS.buynowbtnconfig.JS.stateconfig.state}else{return o.compData.JS.buynowbtnconfig.JS.stateconfig.state1}};o.buyNowBtnStyleForEach=function(q){if(q.status=="0"||o.orderedPackage[q.id]==1||q.ordering==1){return o.compData.JS.buynowbtnconfig.JS.stateconfig.state1}else{return o.compData.JS.buynowbtnconfig.JS.stateconfig.state}};o.buyNowBtn=function(){return o.buyBtnType[o.currentCategoryId]};o.buyNowBtnForEach=function(q){var r=o.compData.JS.buynowbtnconfig.JS.stateconfig.text0||"????";if(q.iscombo=="1"){r=o.compData.JS.buynowbtnconfig.JS.stateconfig.text1||"????"}return r};o.dgobtainAgain=function(){o.buyNowForEach(datagiftdata)};o.hideConfirmDialog=function(){o.compData.JS.confirmBtn=false;o.compData.JS.curNum=o.compData.JS.checkCode.JS.curNum;if(!i){i=angular.element(p[0].querySelector(".c60_fbar_inputNum"))}i.css({border:""});g=angular.element(p[0].querySelector(".c60_fbar_pop_datagiftblock2"));g.css({display:"none",});if(!h){h=angular.element(p[0].querySelector(".c60_fbar_bg_pop_block2"))}h.css({"z-index":"0",display:"none"});if(f===0){c.fireEvent(p.attr("cid"),n.event||"queryListRedenvelope")}};o.popBlockHide=function(){o.hideConfirmDialog();e.recordTracingCdr(o.pageID,o.pageID+"_canclebtn",o.compData.JS.popblockconfig.JS.cdrConfig,{taskId:o.taskId})};o.popBlock=function(q){if(q!=null&&q!=undefined){if(q=="ico"){return o.compData.JS.popblockconfig.JS.icoconfig}else{if(q=="packagename"){return o.compData.JS.popblockconfig.JS.packagenameconfig}else{if(q=="cancel"){return o.compData.JS.popblockconfig.JS.btnconfig.state0}else{if(q=="submit"){return o.compData.JS.popblockconfig.JS.btnconfig.state1}else{if(q=="specialdescstyle"){return o.compData.JS.packageeffectstate.JS.specialdescstyle}else{}}}}}}};o.respconfirm=function(t){t=t.respparam;if(t.returnCode!=null&&t.returnCode!=undefined&&t.returnCode!=""&&t.returnCode=="0"){f=0;var q=angular.element(p[0].querySelector(".c60_fbar_getcoinsuccess"));var r=angular.element(p[0].querySelector(".c60_fbar_getcoinloader"));o.giftcointotal=t.volume;q.css({"z-index":"2047483647889",display:"block",background:"rgba(0, 0, 0, 0)",});r.css({display:"none",})}else{g=angular.element(p[0].querySelector(".c60_fbar_getcoinerror"));var r=angular.element(p[0].querySelector(".c60_fbar_getcoinloader"));g.css({"z-index":"2047483647889",display:"block",background:"rgba(0, 0, 0, 0)",});r.css({display:"none",})}};o.showpopdatagift=function(q){angular.element(p[0].querySelector(".c60_fbar_getcoinsuccess")).css({display:"none"});angular.element(p[0].querySelector(".c60_fbar_getcoinerror")).css({display:"none"});var t=angular.element(p[0].querySelector(".c60_fbar_pop_datagiftblock2"));t.css({display:"block",});var r=angular.element(p[0].querySelector(".c60_fbar_getcoinloader"));r.css({display:"block",})};o.buyNowForEach=function(q){datagiftdata=q;if(q){h=angular.element(p[0].querySelector(".c60_fbar_bg_pop_block2"));h.css({"z-index":"2047483647888",display:"block"});c.fireEvent(p.attr("cid"),n.event||"click0",{id:q.campaignId,epageId:top.tlbs.ordersrc});o.notFromStore=true;var r=o.notFromStore?{storeData:false}:{};var r=o.notFromStore?{storeData:false}:{};e.recordTracingCdr(o.pageID,o.pageID+"_buybtn",o.compData.JS.popblockconfig.JS.cdrConfig,{pkgid:q.campaignId},{},r)}};o.queryerror=function(){if(!h){h=angular.element(p[0].querySelector(".c60_fbar_bg_pop_block2"))}h.css({"z-index":"0",display:"none"})};o.packageCurrent=function(t){var r="";if(t!=null&&t!=undefined){var q=t.categoryid,r;if(o.orderedPackage[t.id]==1&&t.iscombo==1){r=o.compData.JS.packagetitlebgstate.JS.stateconfig.state0}else{if(o.orderedPackage[t.id]==1&&t.iscombo!=1){r=o.compData.JS.packagetitlebgstate.JS.stateconfig.state2}else{if(t.status==1&&t.iscombo==1&&t.id==o.selectedPkg[q]){r=o.compData.JS.packagetitlebgstate.JS.stateconfig.state1}else{if(t.status==1&&t.iscombo==1&&t.id!==o.selectedPkg[q]){r=o.compData.JS.packagetitlebgstate.JS.stateconfig.state0}else{if(t.status==0&&t.iscombo==1){r=o.compData.JS.packagetitlebgstate.JS.stateconfig.state0}else{if(t.status==1&&t.iscombo!=1&&t.id==o.selectedPkg[q]){r=o.compData.JS.packagetitlebgstate.JS.stateconfig.state3}else{if(t.status==1&&t.iscombo!=1&&t.id!==o.selectedPkg[q]){r=o.compData.JS.packagetitlebgstate.JS.stateconfig.state2}else{if(t.status==0&&t.iscombo!=1){r=o.compData.JS.packagetitlebgstate.JS.stateconfig.state2}}}}}}}}return r}};o.delaytime=function(r){if(r!=null&&r!=undefined){if(r.respparam.subscribtionstatus!=null&&r.respparam.subscribtionstatus!=undefined&&r.respparam.subscribtionstatus==0){var q=o.selectedPkg[o.currentCategoryId];o.selectedPkg[o.currentCategoryId]=undefined;o.orderedPackage[q]=1;d(function(){for(var u=0;u<o.revData.length;u++){var v=o.revData[u].list;for(var t=0;t<v.length;t++){for(var t=0;t<v.length;t++){if(q==v[t].id){o.orderedPackage[q]=0;o.revData[u].list[t].status=o.packageStatus[q]}}}}},o.compData.JS.packagetitlebgstate.JS.stateconfig.settimer)}}};var b=0;var m=angular.element(p[0].querySelector('[id="dfdfdf"]'));o.changeCurrent=function(r,t){o.taskId="";if(top.tlbs.cdrData){o.taskId=top.tlbs.cdrData.taskId||""}o.notFromStore=true;var A=A||0;var v=angular.element(p[0].querySelector(".c60_fbar_bg_pop_nopkg"));var y=angular.element(p[0].querySelector(".c60_fbar_bg_pop_block2"));var z=angular.element(p[0].querySelector(".c60_fbar_pop_datagiftblock2"));z.css({display:"none","z-index":"0",background:"rgba(0, 0, 0, 0)",});var q=function(){y.css({display:"none","z-index":"0"});v.css({display:"none","z-index":"0"})};var u=function(){v[0].innerHTML=o.compData.JS.changingtips||"???...";y.css({display:"block","z-index":"2047483647888"});v.css({display:"block","z-index":"2047483647889"})};var x=function(B,D,C){o.updateData(B,true)};var w=function(B,D,C){v.innerHTML=o.compData.JS.nopkgtips||"???,????????";setTimeout(q,Number(o.compData.JS.pkgnofoundautohide||2)*1000)};u();if(!o.revData){e.sendRequest(o.compData.JS.pkgservice||"packagestore",{},x,w)}else{s()}};o.init=function(){c.registerComponentInstance(p.attr("cid"),o);var q=c.getInitProperties(n.cid)||{};o.compData=e.extendDeep(o.compData,q);p.css(o.compData.CSS||{});var r=angular.element(p[0].querySelector(".c60_fbar_wrapper"));r.css(o.compData.JS.wrappercss||{"padding-bottom":"1em"});c.fireEvent(p.attr("cid"),"init")};o.$on(n.cid+"_handleEvent",function(t,u,r,q){if(o.eventMap[u]){o.eventMap[u](r);if(null!==q){q.resolve()}}});o.eventMap.changepackgeas=o.changepackgeas;o.eventMap.changecurrent=o.changeCurrent;o.eventMap.changecurrentbyoid=o.changeCurrentByOid;o.eventMap.respconfirm=o.respconfirm;o.eventMap.showpopdatagift=o.showpopdatagift;o.eventMap.delaytime=o.delaytime;o.eventMap.queryerror=o.queryerror;o.eventMap.hideConfirmDialog=o.hideConfirmDialog;o.eventMap.update=o.updateData}],link:function(b,d,c,a){b.pageID=a.pageID;b.componentType="page";b.init()}}}]);uiCore.directive("datagifttable",[function(){return{restrict:"AE",replace:true,require:"^pid",template:'<li ng-class="{\'c60_fbar_datagiftpackagePriceDesc\':true}" ng-repeat="package in param"><div ng-class="{\'c60_fbar_datagiftpackagePriceDescInner\':true}"><div class="backgroundCurved"></div><div ng-class="{\'c60_fbar_datagiftpackagePriceDescTitle\':true}"><div ng-class="{\'c60_fbar_datagiftpackagePriceDescTitleContent\':true}"><div ng-class="{\'c60_fbar_datagiftpackagePriceDescTitleNameprice\':true}"><p ng-class="{\'c60_fbar_datagiftpackagePriceDescTitleName\':true}"  ng-bind="package.identityName"></p><p ng-class="{\'c60_fbar_datagiftpackagePriceDescTitleprice\':true}">(<span ng-class="{\'c60_fbar_datagiftpackagecount\':true}" ng-bind="package.remainCount"></span>)</p><p ng-class="{\'c60_fbar_datagiftpackagecount\':true}" ng-bind="package.totalCount">3000</p></div></div></div><div ng-class="{\'c60_fbar_datagiftpackagePriceDescContent\':true}" class="c60_fbar_detail"><div><div class="c60_fbar_datagiftdescription"><p ng-bind-html="to_trusted(package.campaignName)"></p></div><div class="c60_fbar_datagiftobtain"><button ng-if="!compData.JS.showbottombuybtn" ng-class="{\'c60_fbar_datagiftBuyNowBtn\':true}" ng-style="buyNowBtnStyleForEach(package)" ng-click="buyNowForEach(package,0);$event.stopPropagation();" ng-bind="buyNowBtnForEach(package)"></button></div></div><div class="c60_fbar_datagiftactivityperiodholder"><p class="c60_fbar_datagiftactivityperiodholder_activity" ng-bind="compData.JS.c60_fbar_activityperiodname"></p><p class="c60_fbar_datagiftactivityperiodholder_date"  ng-bind="package.dateRange"></p></div></div></li>',scope:{param:"=param",},controller:["$scope","$element","$attrs","coreService","coreUtils","Const","$sce",function(e,d,b,f,a,g,c){e.cid=b.cid;e.eventMap={};e.to_trusted=function(h){if(h!=null&&h!=undefined){h=h+"";return c.trustAsHtml(h.replace(/\n/g,"<br/>"))}else{return""}}}],link:function(d,b,a,c){d.pageID=c.pageID;d.componentType="page"}}}]);
﻿uiCore.directive('store', [function () {
			return {
				restrict : 'AE',
				replace : true,
				require : '^pid',
				/*template : '<div ng-class="{\'c60_fbar_store\':true}" class="c60_fbar_store">' + '<div ng-class="{\'c60_fbar_tab\':true}">' + '<ul ng-class="{\'c60_fbar_tabList\':true}" ng-style="getStyleWidth(revData,0);" id="dfdfdf" class="c60_fbar_tabList2">' + '<li ng-class="{\'c60_fbar_tabTitle\':true}" ng-repeat="category in revData" ng-style="tabCurrent($index,revData);" ccid="c60_fbar_tabcategory"  ng-click="categoryClick($index,category,true);$event.stopPropagation();"><span ng-bind="category.categoryname"></span>(<span ng-class="{\'c60_fbar_tabTitleNum\':true}" ng-bind="category.list.length"></span>)</li>' + '</ul>' + '</div>' + '<div ng-class="{\'c60_fbar_wrapper\':true}" class="c60_fbar_wrapper">' + '<div ng-class="{\'c60_fbar_packageList\':true}" ng-style="getStyleWidth(revData,1)">' + '<ul  ng-repeat="catagroy in revData"  ng-class="{\'c60_fbar_packagePriceDescList\':true}" ng-style="getStyleWidth(revData,2)" class="c60_fbar_ulwrapper" simplescroll>' + '<ntable  catatoryindex=$index param=catagroy ></ntable>' + '<div class="c60_fbar_store_no_more" ng-show="catagroy.list.length==0?true:false"><span ng-bind="no_more_title"></span><div ng-bind-html="to_trusted(no_more_desc)"></div></div></ul>' + '</div>' + '</div>' + '<div ng-if="compData.JS.showbottombuybtn" ng-class="{\'c60_fbar_fixedBtn\':true}" >' + '<button ng-class="{\'c60_fbar_BuyNowBtn\':true}" ng-style="buyNowBtnStyle()" ccid="c60_fbar_store_buybtn" ng-click="buyNow(1);$event.stopPropagation();" ng-bind="buyNowBtn()"></button>' + ' </div>' + '<div ng-class="{\'c60_fbar_bg_pop_block2\':true}"  ng-click="$event.stopPropagation();"><div class="c60_fbar_bg_pop_nopkg"></div></div>' + '<div ng-class="{\'c60_fbar_pop_block2\':true}">' + '<div ng-class="{\'c60_fbar_img_bgimg\':true}"></div>' + '<div ng-class="{\'c60_fbar_img_txt_info\':true}">' + '<table cellpadding="0" cellspacing="0" ng-class="{\'c60_fbar_img_txt_table\':true}">' + '<tr>' + '<td><span ng-class="{\'c60_fbar_haveatea\':true}" ng-style="popBlock(\'ico\')"></span></td>' + '<td>' + '<div ng-class="{\'c60_fbar_pop_txt1\':true}" ng-bind="revConfirmData.phoneNo"></div>' + '<div ng-class="{\'c60_fbar_pop_txt1\':true}"><p ng-class="{\'c60_fbar_txt_green\':true}" ng-style="popBlock(\'packagename\')" ng-bind="revConfirmData.packageName"></p><p ng-class="{\'c60_fbar_pkgprice\':true}" class="c60_fbar_pkgprice" ng-bind="revConfirmData.packagePrice"></p></div>'
				+ '</td></tr><tr><td colspan="2"><div ng-class="{\'c60_fbar_pop_txt1\':true}" ng-show="effectiveWayFlag==1?true:false"><span ng-class="{\'c60_fbar_sx_txt_out\':true}" >本套餐</span><span ng-class="{\'c60_fbar_sx_time\':true}"><span ng-class="{\'c60_fbar_sx_month c60_fbar_br_circle_left\':true}" ng-style="effectiveLeftRight(1)" ccid="c60_fbar_store_effective1" ng-click="checkEffectiveClick(1);$event.stopPropagation();" ng-bind="revConfirmData.effectiveWay0"></span><span ng-class="{\'c60_fbar_sx_month c60_fbar_br_circle_right\':true}" ng-style="effectiveLeftRight(2)" ccid="c60_fbar_store_effective2" ng-click="checkEffectiveClick(2);$event.stopPropagation();" ng-bind="revConfirmData.effectiveWay1"></span></span></div>'
				+ '<div ng-class="{\'c60_fbar_txt1\':true}" ng-show="effectiveWayFlag==0?true:false">本套餐<span ng-bind="revConfirmData.effectiveWay"></span></div><div ng-class="{\'c60_fbar_pop_txt1\':true}" ng-show="effectiveWayFlag==2?true:false"><span ng-class="{\'c60_fbar_sx_txt_out\':true}" >本套餐</span><span ng-class="{\'c60_fbar_sx_time\':true}"><span ng-class="{\'c60_fbar_sx_month c60_fbar_br_circle_left\':true}" ng-style="effectiveLeftRight2(1)" ccid="c60_fbar_store_effective_special1" ng-click="checkEffectiveClick2(1);$event.stopPropagation();" ng-bind="revConfirmData.effectiveWayspecial1"></span><span ng-class="{\'c60_fbar_sx_month c60_fbar_br_circle_right\':true}" ng-style="effectiveLeftRight2(2)" ccid="c60_fbar_store_effective_special2" ng-click="checkEffectiveClick2(2);$event.stopPropagation();"  ng-bind="revConfirmData.effectiveWayspecial2"></span></span></div><div ng-class="{\'c60_fbar_pop_txt1\':true}"  ng-show="effectiveWayFlag==3?true:false"><span ng-class="{\'c60_fbar_sx_txt_out\':true}" >本套餐</span><div style="clear:both"></div><span ng-class="{\'c60_fbar_sx_time2\':true}" class="c60_fbar_sx_time2"><span ng-class="{\'c60_fbar_sx_month2 c60_fbar_br_circle_left\':true}" class="c60_fbar_sx_month2" ng-style="effectiveLeftRight2(1)" ccid="c60_fbar_store_effective_special1" ng-click="checkEffectiveClick2(1);$event.stopPropagation();" ng-bind="revConfirmData.effectiveWayspecial1"></span><span ng-class="{\'c60_fbar_sx_month2\':true}" class="c60_fbar_sx_month2" ng-style="effectiveLeftRight2(2)" ccid="c60_fbar_store_effective_special2" ng-click="checkEffectiveClick2(2);$event.stopPropagation();"  ng-bind="revConfirmData.effectiveWayspecial2"></span><span ng-class="{\'c60_fbar_sx_month3 c60_fbar_br_circle_right\':true}" ng-style="effectiveLeftRight2(3)" ccid="c60_fbar_store_effective_special3" ng-click="checkEffectiveClick2(3);$event.stopPropagation();"  ng-bind="revConfirmData.effectiveWayspecial3"></span></span></div></div><div ng-class="{\'c60_fbar_pop_txt1\':true}" ng-bind="compData.JS.packageeffectstate.JS.specialdesc" ng-show="(effectiveWayFlag==2||effectiveWayFlag==3)?true:false" class="c60_fbar_pop_txt1" ng-style="popBlock(\'specialdescstyle\')"></div>' + '</td>' + '</tr>'
				+ '<tr class="c60_fbar_store_inputwarp" ng-show="compData.JS.checkCode.JS.isShow"><td colspan="2"><span style="float: left;font-size: 1em;padding-top: 0.1em;margin-right: 1em;width: 18%;height: 2.5em;line-height: 2.5em;-moz-box-sizing: border-box;-webkit-box-sizing: border-box;box-sizing: border-box;" class="c60_fbar_inputTxt">验证码</span><span class="c60_fbar_inputNum" ng-bind="compData.JS.curNum"></span><span class="c60_fbar_inputNumRight" ng-bind="compData.JS.keyNum"></span></td></tr>'
				+ '</table>' + '</div>'
				+ '<div class="c60_fbar_store_keyboard"  ng-show="compData.JS.checkCode.JS.isShow"><ul class="c60_fbar_store_keyboard_warp c60_fbar_clearfloat"><li ng-repeat="item in compData.JS.keyboardNum track by $index" ng-bind="item" ng-click="numclick($index);$event.stopPropagation();" class="c60_fbar_store_keyboard_num"></li></ul></div>'
				+ '<div ng-class="{\'c60_fbar_img_txt_btn2\':true}">' + '<div ng-class="{\'c60_fbar_left_itbtn\':true}"  ng-style="popBlock(\'cancel\')"  ccid="c60_fbar_store_closebtn" ng-click="popBlockHide();$event.stopPropagation();">不了，谢谢</div>' + '<div ng-class="{\'c60_fbar_right_itbtn\':true}" ng-style="popBlock(\'submit\')"  ccid="c60_fbar_store_btn" ng-click="submitConfirm()">是的，确认</div>' + '</div>' + '</div>' + '</div>',
				 */
				template : '<div ng-class="{\'c60_fbar_store\':true}" class="c60_fbar_store"><div id="cdcdcd" ng-class="{\'c60_fbar_tab\':true}"><ul ng-class="{\'c60_fbar_tabList\':true}" id="dfdfdf" class="c60_fbar_tabList2"><li ng-class="{\'c60_fbar_tabTitle\':true}" ng-repeat="category in revData" ng-style="tabCurrent($index,revData);" ccid="c60_fbar_tabcategory"  ng-click="categoryClick($index,category,true);$event.stopPropagation();"><span ng-bind="category.categoryTitle"/></li></ul></div><div ng-class="{\'c60_fbar_wrapper\':true}" class="c60_fbar_wrapper"><div ng-class="{\'c60_fbar_packageList\':true}" ng-style="getStyleWidth(revData,1)"><ul  ng-repeat="catagroy in revData"  ng-class="{\'c60_fbar_packagePriceDescList\':true}" ng-style="getStyleWidth(revData,2)" class="c60_fbar_ulwrapper" simplescroll><ntable  catatoryindex=$index param=catagroy /><div class="c60_fbar_store_no_more" ng-show="catagroy.list.length==0?true:false"><span ng-bind="no_more_title"/><div ng-bind-html="to_trusted(no_more_desc)"/></div></ul></div></div><div ng-if="compData.JS.showbottombuybtn" ng-class="{\'c60_fbar_fixedBtn\':true}" ><button ng-class="{\'c60_fbar_BuyNowBtn\':true}" ng-style="buyNowBtnStyle()" ccid="c60_fbar_store_buybtn" ng-click="buyNow(1);$event.stopPropagation();" ng-bind="buyNowBtn()"/></div><div ng-class="{\'c60_fbar_bg_pop_block2\':true}"  ng-click="$event.stopPropagation();"><div class="c60_fbar_bg_pop_nopkg"/></div><div ng-class="{\'c60_fbar_pop_block2\':true}"><div ng-class="{\'c60_fbar_img_bgimg\':true}" ng-style="compData.JS.c60_fbar_img_bgimg"/><div ng-class="{\'c60_fbar_img_txt_info\':true}"><table cellpadding="0" cellspacing="0" ng-class="{\'c60_fbar_img_txt_table\':true}"><tr><td><span ng-class="{\'c60_fbar_haveatea\':true}" ng-style="popBlock(\'ico\')"/></td><td><div ng-class="{\'c60_fbar_pop_txt1\':true}" ng-bind="revConfirmData.phoneNo"/><div ng-class="{\'c60_fbar_pop_txt1\':true}"><p ng-class="{\'c60_fbar_txt_green\':true}" ng-style="popBlock(\'packagename\')" ng-bind="revConfirmData.packageName"/><p ng-class="{\'c60_fbar_pkgprice\':true}" class="c60_fbar_pkgprice" ng-bind="revConfirmData.packagePrice"/></div></td></tr><tr><td colspan="2"><div ng-class="{\'c60_fbar_pop_txt1\':true}" ng-show="effectiveWayFlag==1?true:false"><span ng-class="{\'c60_fbar_sx_txt_out\':true}" ng-bind="compData.JS.c60_fbar_txt1"></span><span ng-class="{\'c60_fbar_sx_time\':true}"><span ng-class="{\'c60_fbar_sx_month c60_fbar_br_circle_left\':true}" ng-style="effectiveLeftRight(1)" ccid="c60_fbar_store_effective1" ng-click="checkEffectiveClick(1);$event.stopPropagation();" ng-bind="revConfirmData.effectiveWay0"/><span ng-class="{\'c60_fbar_sx_month c60_fbar_br_circle_right\':true}" ng-style="effectiveLeftRight(2)" ccid="c60_fbar_store_effective2" ng-click="checkEffectiveClick(2);$event.stopPropagation();" ng-bind="revConfirmData.effectiveWay1"/></span></div><div ng-class="{\'c60_fbar_txt1\':true}" ng-show="effectiveWayFlag==0?true:false" ><span ng-bind="compData.JS.c60_fbar_txt1"/><span ng-bind="revConfirmData.effectiveWay"/></div><div ng-class="{\'c60_fbar_pop_txt1\':true}" ng-show="effectiveWayFlag==2?true:false"><span ng-class="{\'c60_fbar_sx_txt_out\':true}" ng-bind="compData.JS.c60_fbar_txt1"></span><span ng-class="{\'c60_fbar_sx_time\':true}"><span ng-class="{\'c60_fbar_sx_month c60_fbar_br_circle_left\':true}" ng-style="effectiveLeftRight2(1)" ccid="c60_fbar_store_effective_special1" ng-click="checkEffectiveClick2(1);$event.stopPropagation();" ng-bind="revConfirmData.effectiveWayspecial1"/><span ng-class="{\'c60_fbar_sx_month c60_fbar_br_circle_right\':true}" ng-style="effectiveLeftRight2(2)" ccid="c60_fbar_store_effective_special2" ng-click="checkEffectiveClick2(2);$event.stopPropagation();"  ng-bind="revConfirmData.effectiveWayspecial2"/></span></div><div ng-class="{\'c60_fbar_pop_txt1\':true}"  ng-show="effectiveWayFlag==3?true:false"><span ng-class="{\'c60_fbar_sx_txt_out\':true}" ng-bind="compData.JS.c60_fbar_txt1"></span><div style="clear:both"/><span ng-class="{\'c60_fbar_sx_time2\':true}" class="c60_fbar_sx_time2"><span ng-class="{\'c60_fbar_sx_month2 c60_fbar_br_circle_left\':true}" class="c60_fbar_sx_month2" ng-style="effectiveLeftRight2(1)" ccid="c60_fbar_store_effective_special1" ng-click="checkEffectiveClick2(1);$event.stopPropagation();" ng-bind="revConfirmData.effectiveWayspecial1"/><span ng-class="{\'c60_fbar_sx_month2\':true}" class="c60_fbar_sx_month2" ng-style="effectiveLeftRight2(2)" ccid="c60_fbar_store_effective_special2" ng-click="checkEffectiveClick2(2);$event.stopPropagation();"  ng-bind="revConfirmData.effectiveWayspecial2"/><span ng-class="{\'c60_fbar_sx_month3 c60_fbar_br_circle_right\':true}" ng-style="effectiveLeftRight2(3)" ccid="c60_fbar_store_effective_special3" ng-click="checkEffectiveClick2(3);$event.stopPropagation();"  ng-bind="revConfirmData.effectiveWayspecial3"/></span></div></div><div ng-class="{\'c60_fbar_pop_txt1\':true}" ng-bind="compData.JS.packageeffectstate.JS.specialdesc" ng-show="(effectiveWayFlag==2||effectiveWayFlag==3)?true:false" class="c60_fbar_pop_txt1" ng-style="popBlock(\'specialdescstyle\')"/></td></tr><tr class="c60_fbar_store_inputwarp" ng-show="compData.JS.checkCode.JS.isShow && isShowverifycfg"><td colspan="2"><span style="float: left;font-size: 1em;padding-top: 0.1em;margin-right: 1em;width: 18%;height: 2.5em;line-height: 2.5em;-moz-box-sizing: border-box;-webkit-box-sizing: border-box;box-sizing: border-box;" class="c60_fbar_inputTxt">验证码</span><span class="c60_fbar_inputNum" ng-bind="compData.JS.curNum"/><span class="c60_fbar_inputNumRight" ng-bind="compData.JS.keyNum"/></td></tr></table></div><div class="c60_fbar_store_keyboard"  ng-show="compData.JS.checkCode.JS.isShow && isShowverifycfg"><ul class="c60_fbar_store_keyboard_warp c60_fbar_clearfloat"><li ng-repeat="item in compData.JS.keyboardNum track by $index" ng-bind="item" ng-click="numclick($index);$event.stopPropagation();" class="c60_fbar_store_keyboard_num"/></ul></div><div ng-class="{\'c60_fbar_img_txt_btn2\':true}"><div ng-class="{\'c60_fbar_left_itbtn\':true}"  ng-style="popBlock(\'cancel\')"  ccid="c60_fbar_store_closebtn" ng-click="popBlockHide();$event.stopPropagation();" ng-bind="compData.JS.c60_fbar_store_closebtn_txt"></div><div ng-class="{\'c60_fbar_right_itbtn\':true}" ng-style="popBlock(\'submit\')"  ccid="c60_fbar_store_btn" id="c60_fbar_store_btn_id" ng-bind="compData.JS.c60_fbar_store_submitbtn_txt"></div></div></div>',
				scope : {},
				controller : ["$scope", "$element", "$attrs", "$timeout", 'coreService', 'coreUtils', 'Const',
					function ($scope, $element, $attrs, $timeout, coreService, coreUtils, Const) {
						$scope.cid = $attrs.cid;
						$scope.compData = {};
						$scope.selectedPkg = {}; //初始化套餐类型对应被选中的套餐
						$scope.homeflag = 0;
						$scope.effectiveWayFlag = 0; //初始化生效方式时显示状态
						$scope.effectiveLeftRightFlag = 0; //初始化存在两种生效方式时立即生效状态
						$scope.effectiveLeftRightFlag2 = 0;
						$scope.flowUpshiftFlag = '1'; //初始化二次确认确认后被传递的生效状态
						$scope.buyBtnType = {}; //初始化套餐类型对应底部按钮文字
						$scope.currentCategoryId = undefined; //初始化当前套餐类型ID
						$scope.eventMap = {};
						$scope.orderedPackage = {};
						$scope.packageStatus = {};
						$scope.taskId = '';
						$scope.no_more_title = '';
						$scope.no_more_desc = '';
						$scope.effecttimevalue = '0';
						$scope.effectperiod = '0';
						$scope.monthpack = '1';
						$scope.globalpackages = {};
						$scope.to_trusted = function (text) {
							return coreUtils.getTrustedHtml(text);
						};
						var buybtncanclick = true; //为防止页面响应慢，用户重复点击导致误点订购按钮
						var popupmask = undefined; //订购遮罩
						var confirmdialog = undefined; //确认框
						var submitconfirmbtn = true; //为防止页面响应慢，用户重复点击导致误点确认按钮
						var verify = undefined; //验证码输入框
						//标签类需要的总长度，如果标签类总长度不足100%，平均每个标签类平分剩余长度
						var categoryliTotalCssWidth = 0;
						var hundredwidth = 0; //记录标签类wrapper宽度
						//获取后台数据
						$scope.updateData = function (param, flag) {
							categoryliTotalCssWidth = 0;
							if (!flag) {
								$scope.notFromStore = false;
								$scope.taskId = '';
							}
							$scope.maxdisplaynum = parseInt($scope.compData.JS.tabTitleconfig.JS.maxdisplaynum); //可视区域显示TAB导航个数
							var word = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L', 'M', 'N', 'O', 'P', 'Q', 'R', 'S', 'T', 'U', 'V', 'W', 'X', 'Y', 'Z'];
							if (param && param.respparam && param.respparam.packages) {
								var temp = param.respparam.packages; //接收后台数据
								var pkg = null;
								var mn = 0;
								$scope.no_more_title = $scope.compData.JS.nomoreconfig.JS.no_more_title;
								$scope.no_more_desc = $scope.compData.JS.nomoreconfig.JS.no_more_desc;
								$scope.maxdisplaynum = (param.respparam.packages.length >= $scope.maxdisplaynum && $scope.maxdisplaynum !== 0) ? $scope.maxdisplaynum : param.respparam.packages.length;
								temp = param.respparam.packages;
								for (var i = 0, len = temp.length; i < len; i++) {
									temp[i].categoryTitle = temp[i].categoryname + '(' + (temp[i].list || []).length + ')';
									categoryliTotalCssWidth += temp[i].categoryTitle.length;
									var list = temp[i].list;
									if (list != null && list != undefined && list.length != 0) {
										for (var j = 0, vlen = list.length; j < vlen; j++) {
											pkg = list[j];
											$scope.globalpackages[pkg.id] = pkg;
											pkg.catagoryindex = i;
											$scope.packageStatus[pkg.id] = pkg.status;
											if ($scope.orderedPackage[pkg.id] == 1) {
												pkg.status = '0';
											}
											if (pkg.iscombo == '1') {
												pkg.iscomboflag = true;
												pkg.iscomboflag2 = (pkg.comboProperies == null || pkg.comboProperies == undefined || pkg.comboProperies.length == 0) ? false : true;
												pkg.title = word[j];
												pkg.name = pkg.name;
											} else {
												pkg.iscomboflag = false;
												pkg.iscomboflag2 = false;
												pkg.name = pkg.price;
											}

											pkg.description = pkg.desc;
											if (pkg.comboProperies != null && pkg.comboProperies != undefined && pkg.comboProperies.length != 0) {
												var keyconfig = $scope.compData.JS.packagedescstate.JS.keyconfig,
												traffickey = $scope.compData.JS.packagedescstate.JS.traffickeyconfig,
												n = 0;
												pkg.properies = {};
												for (var k = 0; k < pkg.comboProperies.length; k++) {
													for (var m in keyconfig) {
														if (pkg.comboProperies[k].key == m) {
															if (pkg.iscombo == '1') {
																if (keyconfig[m].unit == null || keyconfig[m].unit == undefined)
																	keyconfig[m].unit = '';
																pkg.properies[n] = keyconfig[m].key + '：' + pkg.comboProperies[k].value + keyconfig[m].unit;
																n++;
															} else if (pkg.iscombo == '0') {
																if (keyconfig[m].unit == null || keyconfig[m].unit == undefined)
																	keyconfig[m].unit = '';
																if (pkg.comboProperies[k].key == traffickey)
																	pkg.title = pkg.comboProperies[k].value + keyconfig[m].unit;
															} else {}
														}
													}
												}
											}
											pkg.categoryid = temp[i].categoryid;
											var packageeffectstate = $scope.compData.JS.packageeffectstate.JS.stateconfig;
											for (var n in packageeffectstate) {
												if (pkg.effecttype == n) {
													pkg.effectdesc = packageeffectstate[n].value;
												}
											}
										}
									} {
										var tabcontainerwrapper = angular.element($element[0].querySelector('[id="cdcdcd"]'));
										var tabcontainer = angular.element($element[0].querySelector('[id="dfdfdf"]'));
										hundredwidth = parseInt(top.window.getComputedStyle(tabcontainerwrapper[0], null)['width']);
										var fontsize = parseInt(top.window.getComputedStyle(tabcontainer[0], null)['fontSize']);
										if (categoryliTotalCssWidth * fontsize < hundredwidth) {
											tabcontainer.css({
												width : '100%'
											});
										} else {
											tabcontainer.css({
												width : categoryliTotalCssWidth + 'em'
											});
										}
									}
								}
								//存储数据
								$scope.revData = temp; //param.respparam.packages;
								var temppkg;
								for (var i = 0, len = $scope.revData.length; i < len; i++) {
									var categoryid = $scope.revData[i].categoryid;
									//设置订购按钮文字
									if ($scope.revData[i].list && $scope.revData[i].list && $scope.revData[i].list.length != 0) {
										if ($scope.revData[i].list[0].iscombo != null && $scope.revData[i].list[0].iscombo != undefined) {
											if ($scope.revData[i].list[0].iscombo == 1) {
												$scope.buyBtnType[categoryid] = $scope.compData.JS.buynowbtnconfig.JS.stateconfig.text1;
											} else {
												$scope.buyBtnType[categoryid] = $scope.compData.JS.buynowbtnconfig.JS.stateconfig.text0;
											}
										}

										//如果用户已经选择过该套餐，则不初始化该套餐
										if (categoryid == $scope.currentCategoryId) {
											//add by y00131156 at 20151117 begin
											//if no other pkg can be ordered,display the first package or the package last ordered,
											//else display the first pkg which can be ordered
											var lastorderedpkgindex = -1;

											for (var tk = 0; tk < $scope.revData[i].list.length; tk++) {
												var tpkg = $scope.revData[i].list[tk];
												if (tpkg.status == '1') {
													$scope.selectedPkg[categoryid] = tpkg.id;
													$scope.compData.JS.packageIndex = tk;
													break;
												} else if (tpkg.id == $scope.userbuypkg) {
													lastorderedpkgindex = tk;

												}
											}

											if (!$scope.selectedPkg[categoryid]) {
												if (lastorderedpkgindex != -1) {
													$scope.selectedPkg[categoryid] = $scope.userbuypkg;
													$scope.compData.JS.packageIndex = lastorderedpkgindex;

												} else {
													$scope.selectedPkg[categoryid] = $scope.revData[i].list[0].id;
													$scope.compData.JS.packageIndex = 0;
												}
											}
											//add by y00131156 at 20151117 end
											continue;
										}
										$scope.selectedPkg[categoryid] = undefined;
										for (var j = 0; j < $scope.revData[i].list.length; j++) {
											temppkg = $scope.revData[i].list[j];
											if (temppkg.status == '1') {
												$scope.selectedPkg[categoryid] = temppkg.id;
												if (!$scope.currentCategoryId) {
													$scope.currentCategoryId = categoryid;
													$scope.compData.JS.tabcategoryIndex = i;
													$scope.compData.JS.tabTitleconfig.JS.index = i;
													angular.element($element[0].querySelector('.c60_fbar_packageList')).css({
														'margin-left' : -i * 100 + '%'
													});
													$scope.compData.JS.packageIndex = j;
												}
												break;
											}

										}																				
									} else {
										$scope.buyBtnType[categoryid] = $scope.compData.JS.buynowbtnconfig.JS.stateconfig.text0;
									}
								}

								if (top.subscribeid) {
									$scope.changeCurrentByOid({
										'oid' : top.subscribeid
									});
									top.subscribeid = undefined;
								}
							}
						};

						//编辑套餐类型对应被选中的套餐ID
						$scope.setCurrentPkgid = function (pkgid) {
							var lastpkgid = $scope.selectedPkg[$scope.currentCategoryId]; //上一个被选中的套餐id
							if (pkgid != null && pkgid != undefined && pkgid != lastpkgid) {								
								$scope.selectedPkg[$scope.currentCategoryId] = pkgid;     //重复选中一个套餐时，返回true
								return true;
							}
							return false;
						};
						//Tab菜单样式
						$scope.tabCurrent = function (index, pkg) {
							/*console.log(top.window.getComputedStyle(tabcontainer[0], null)['width'], categoryliTotalCssWidth);
							if (index != null && index != undefined && pkg != null && pkg != undefined) {
							if (pkg.length <= $scope.maxdisplaynum) {
							$scope.compData.JS.tabTitleconfig.JS.stateconfig.state0.width = 100 / pkg.length + '%';
							$scope.compData.JS.tabTitleconfig.JS.stateconfig.state1.width = 100 / pkg.length + '%';
							} else {
							$scope.compData.JS.tabTitleconfig.JS.stateconfig.state0.width = 1 / pkg.length * 100 + '%';
							$scope.compData.JS.tabTitleconfig.JS.stateconfig.state1.width = 1 / pkg.length * 100 + '%';
							}
							if ($scope.compData.JS.tabTitleconfig.JS.index == index) {
							return $scope.compData.JS.tabTitleconfig.JS.stateconfig.state1;
							} else {
							return $scope.compData.JS.tabTitleconfig.JS.stateconfig.state0;
							}
							}*/

							var tabcontainerwrapper = angular.element($element[0].querySelector('[id="cdcdcd"]'));
							var hundredwidth = parseInt(top.window.getComputedStyle(tabcontainerwrapper[0], null)['width']);
							var fontsize = parseInt(top.window.getComputedStyle(tabcontainerwrapper[0], null)['fontSize']) * 0.9;
							var width = 0;
							if (categoryliTotalCssWidth * fontsize < hundredwidth) {

								width = pkg[index].categoryTitle.length - 0.21 + (hundredwidth / fontsize - categoryliTotalCssWidth) / pkg.length + 'em';

							} else {
								width = pkg[index].categoryTitle.length - 0.21 + 'em';
							}
							if ($scope.compData.JS.tabTitleconfig.JS.index == index) {
								$scope.compData.JS.tabTitleconfig.JS.stateconfig.state1.width = width;
								return $scope.compData.JS.tabTitleconfig.JS.stateconfig.state1;
							} else {
								$scope.compData.JS.tabTitleconfig.JS.stateconfig.state0.width = width;
								return $scope.compData.JS.tabTitleconfig.JS.stateconfig.state0;
							}

						};

						//计算选中标签类的位置，如果在可视范围以外，需要设置tabcontainer的位移
						var moveCategoryTab = (function () {
							//var tabcontainerwrapper = angular.element($element[0].querySelector('[id="cdcdcd"]'));
							var tabcontainer = angular.element($element[0].querySelector('[id="dfdfdf"]'));
							var translatex = 0;
							var execute = function (currentIndex) {
								var totalWidth = hundredwidth;
								var ulWidth = parseInt(top.window.getComputedStyle(tabcontainer[0], null)['width']);
								var fontSize = parseInt(top.window.getComputedStyle(tabcontainer[0], null)['fontSize']);
								if (totalWidth < ulWidth) {
									if (currentIndex == $scope.revData.length - 1) {
										translatex = totalWidth - ulWidth;
									} else {

										//计算当前套餐标题是否在可视区域内
										var posx1 = 0;
										var posx2 = 0;
										for (var i = 0; i < currentIndex; i++) {
											posx1 = posx1 + $scope.revData[i].categoryTitle.length;
										}
										posx1 = posx1 * fontSize + translatex;
										posx2 = posx1 + $scope.revData[currentIndex].categoryTitle.length * fontSize;
										if (posx1 < 0) {
											translatex = translatex - posx1 + 2 * fontSize;
											if (translatex > 0) {
												translatex = 0;
											}

										} else if (posx2 > totalWidth) {

											translatex = translatex + totalWidth - posx2;
										}

									}
//console.log("----",translatex)
									tabcontainer.css('-webkit-transform', 'translate(' + translatex + 'px,0px)');
									tabcontainer.css('-moz-transform', 'translate(' + translatex + 'px,0px)');
									tabcontainer.css('-ms-transform', 'translate(' + translatex + 'px,0px)');
									tabcontainer.css('-o-transform', 'translate(' + translatex + 'px,0px)');

								}
							}

							return execute;
						})();
						//Tab菜单点击事件
						$scope.categoryClick = function (index, catetory, flag) {
							if (index != null && index != undefined && catetory != null && catetory != undefined) {
								$scope.compData.JS.tabcategoryIndex = index;
								$scope.compData.JS.tabTitleconfig.JS.index = index;
								$scope.currentCategoryId = catetory.categoryid;
								angular.element($element[0].querySelector('.c60_fbar_packageList')).css({
									'margin-left' : -index * 100 + '%'
								});

								//delete by y00131156 at 20151117 use moveCategoryTab replace the below function begin
								//resolve zjyd when click recommanded pkg,the pkg category not show fully
								/*var marginLeft = 0;
								if (Number(index) < Number($scope.maxdisplaynum)) {
								marginLeft = 0;
								} else {
								marginLeft = -100 / $scope.maxdisplaynum * (Number(index) - Number($scope.maxdisplaynum) + 1);
								}
								angular.element($element[0].querySelector('.c60_fbar_tabList2')).css({
								'margin-left' : marginLeft + '%'
								});*/
								//delete by y00131156 at 20151117 use moveCategoryTab replace the below function end
								moveCategoryTab(index);
							
								if (flag) {
								
									coreUtils.recordTracingCdr($scope.pageID, 'ca' + catetory.categoryid, $scope.compData.JS.packagetitlebgstate.JS.cdrConfig);
								}
							}
						};
						//初始化套餐内容列表整体和个体宽度
						$scope.getStyleWidth = function (pkg, no) {
							if (pkg != null && pkg != undefined && no != null && no != undefined) {
								if (no == 0) {

									//如果套餐类总宽度>100%,直接设置宽度
									//如果套餐类总宽度<100%，设置100%
									/*if (pkg.length <= $scope.maxdisplaynum) {
									return {
									width : '100%'
									};
									} else {
									return {
									width : pkg.length * 100 / $scope.maxdisplaynum + '%'
									};
									}*/
								} else if (no == 1) {
									return {
										width : pkg.length * 100 + '%'
									};
								} else {
									return {
										width : (100 / (pkg.length)) + '%'
									};
								}
							}
						};
						//底部订购按钮样式
						$scope.buyNowBtnStyle = function () {
							if ($scope.selectedPkg[$scope.currentCategoryId] != null && $scope.selectedPkg[$scope.currentCategoryId] != undefined && $scope.selectedPkg[$scope.currentCategoryId])
								return $scope.compData.JS.buynowbtnconfig.JS.stateconfig.state;
							else
								return $scope.compData.JS.buynowbtnconfig.JS.stateconfig.state1;

						};
						//底部订购按钮样式
						$scope.buyNowBtnStyleForEach = function (pkg) {
							if (pkg.status == '0' || $scope.orderedPackage[pkg.id] == 1 || pkg.ordering == 1)
								return $scope.compData.JS.buynowbtnconfig.JS.stateconfig.state1;
							else
								return $scope.compData.JS.buynowbtnconfig.JS.stateconfig.state;

						};
						//底部订购按钮文本
						$scope.buyNowBtn = function () {
							return $scope.buyBtnType[$scope.currentCategoryId];
						};

						$scope.buyNowBtnForEach = function (pkg) {
							var text = $scope.compData.JS.buynowbtnconfig.JS.stateconfig.text0 || '立即订购';
							if (pkg.iscombo == '1') {
								text = $scope.compData.JS.buynowbtnconfig.JS.stateconfig.text1 || '预约升档';
							}
							return text;
						};
                        //隐藏二次确认对话框
						$scope.hideConfirmDialog = function () {
							//将"是的，确认"按钮状态修改为不可点击，直到用户二维码才对位置
							$scope.compData.JS.confirmBtn = false;
							$scope.compData.JS.curNum = $scope.compData.JS.checkCode.JS.curNum;
							if (!verify) {

								verify = angular.element($element[0].querySelector('.c60_fbar_inputNum'))
							}
							verify.css({
								'border' : ''
							});
							if (!confirmdialog) {
								confirmdialog = angular.element($element[0].querySelector('.c60_fbar_pop_block2'));
							}
							confirmdialog.css({
								'z-index' : '0',
								'display' : 'none'
							});
							if (!popupmask) {
								popupmask = angular.element($element[0].querySelector('.c60_fbar_bg_pop_block2'));
							}

							popupmask.css({
								'z-index' : '0',
								'display' : 'none'
							});

						}

						//取消按钮关闭事件
						$scope.popBlockHide = function () {
							//将"是的，确认"按钮状态修改为不可点击，直到用户二维码才对位置
							/*$scope.compData.JS.confirmBtn = false;
							$scope.compData.JS.curNum = $scope.compData.JS.checkCode.JS.curNum;
							angular.element($element[0].querySelector('.c60_fbar_inputNum')).css({'border':''});
							angular.element($element[0].querySelector('.c60_fbar_bg_pop_block2')).css({
							'z-index' : '0',
							'display' : 'none'
							});
							angular.element($element[0].querySelector('.c60_fbar_pop_block2')).css({
							'z-index' : '0',
							'display' : 'none'
							});*/
							$scope.hideConfirmDialog();
					
							coreUtils.recordTracingCdr($scope.pageID, $scope.pageID + "_" + 'canclebtn', $scope.compData.JS.popblockconfig.JS.uitracingcancel.cdrConfig, {"taskId": $scope.taskId });

							//top.tlbs.cdrData = null;
						};
						//二次确认弹出层样式（小图片，套餐名，取消按钮，提交按钮）
						$scope.popBlock = function (type) {
							if (type != null && type != undefined) {
								if (type == 'ico') {
									return $scope.compData.JS.popblockconfig.JS.icoconfig;
								} else if (type == 'packagename') {
									return $scope.compData.JS.popblockconfig.JS.packagenameconfig;
								} else if (type == 'cancel') {
									return $scope.compData.JS.popblockconfig.JS.btnconfig.state0;
								} else if (type == 'submit') {
									return $scope.compData.JS.popblockconfig.JS.btnconfig.state1;
								} else if (type == 'specialdescstyle') {
									return $scope.compData.JS.packageeffectstate.JS.specialdescstyle;
								} else {}
							}
						};
						//二次确认弹出层存在多种生效方式时：立即和预约生效样式
						$scope.effectiveLeftRight = function (no) {
							if (no != null && no != undefined) {
								if (no == 1) {
									if ($scope.effectiveLeftRightFlag == 1) {
										return $scope.compData.JS.popblockconfig.JS.effectivewayconfig.state0;
									} else {
										return $scope.compData.JS.popblockconfig.JS.effectivewayconfig.state1;
									}
								} else {
									if ($scope.effectiveLeftRightFlag == 0) {
										return $scope.compData.JS.popblockconfig.JS.effectivewayconfig.state0;
									} else {
										return $scope.compData.JS.popblockconfig.JS.effectivewayconfig.state1;
									}
								}
							}
						};

						$scope.effectiveLeftRight2 = function (no) {
							if (no != null && no != undefined) {
								if (no == 1) {
									if ($scope.effectiveLeftRightFlag2 == 0) {
										return $scope.compData.JS.popblockconfig.JS.effectivewayconfig.state0;
									} else {
										return $scope.compData.JS.popblockconfig.JS.effectivewayconfig.state1;
									}
								} else if (no == 2) {
									if ($scope.effectiveLeftRightFlag2 == 1) {
										return $scope.compData.JS.popblockconfig.JS.effectivewayconfig.state0;
									} else {
										return $scope.compData.JS.popblockconfig.JS.effectivewayconfig.state1;
									}
								} else {
									if ($scope.effectiveLeftRightFlag2 == 2) {
										return $scope.compData.JS.popblockconfig.JS.effectivewayconfig.state0;
									} else {
										return $scope.compData.JS.popblockconfig.JS.effectivewayconfig.state1;
									}

								}
							}
						};
						//二次确认弹出层存在多种生效方式时：点击事件
						$scope.checkEffectiveClick = function (no) {
							if (no != null && no != undefined) {
								if (no == 1) {
									$scope.effectiveLeftRightFlag = 1;
									$scope.flowUpshiftFlag = '0';
								
									coreUtils.recordTracingCdr($scope.pageID, $scope.pageID + '_' + 'effectway_0', $scope.compData.JS.packageeffectstate.JS.cdrConfig);

								} else {
									$scope.effectiveLeftRightFlag = 0;
									$scope.flowUpshiftFlag = '1';
							
									coreUtils.recordTracingCdr($scope.pageID, $scope.pageID + '_' + 'effectway_1', $scope.compData.JS.packageeffectstate.JS.cdrConfig);
								}
							}
						};
						$scope.checkEffectiveClick2 = function (no) {
							if (no != null && no != undefined) {
								if (no == 1) {
									$scope.effectiveLeftRightFlag2 = 0;
									$scope.effecttimevalue = '0';
									$scope.effectperiod = '1';
									$scope.flowUpshiftFlag = '0';
				
									coreUtils.recordTracingCdr($scope.pageID, $scope.pageID + '_' + 'effectway_01', $scope.compData.JS.packageeffectstate.JS.cdrConfig);
								} else if (no == 2) {
									$scope.effectiveLeftRightFlag2 = 1;
									$scope.flowUpshiftFlag = '0';
									$scope.effecttimevalue = '0';
									$scope.effectperiod = '0';
								
									coreUtils.recordTracingCdr($scope.pageID, $scope.pageID + '_' + 'effectway_02', $scope.compData.JS.packageeffectstate.JS.cdrConfig);
								} else {
									$scope.effectiveLeftRightFlag2 = 2;
									$scope.flowUpshiftFlag = '1';
									$scope.effecttimevalue = '1';
									$scope.effectperiod = '0';
							
									coreUtils.recordTracingCdr($scope.pageID, $scope.pageID + '_' + 'effectway_12', $scope.compData.JS.packageeffectstate.JS.cdrConfig);
								}
							}
						};
						var auhidetimeout = null;
						//根据id查询套餐
						$scope.getpkgById = function (pkgid) {
							return $scope.globalpackages[pkgid];
						};
						$scope.compData.JS = {};
						//手机号码参数
						$scope.compData.JS.phoneconfig = {  
								"prefix" : "86",
								"len" : "13",
								"maskbegin" : "5",
								"maskend" : "9",
								"commonlen" : "11",
								"commonbegin" : "3",
								"commonend" : "7"
						};
						//手机号格式化
						$scope.phoneFilter = function(param) {
							if (param == undefined)
								return '<i style="visibility:hidden">&nbsp;</i>';
							var maskstr = '';
							for(var i = parseInt($scope.compData.JS.phoneconfig.maskbegin);i < parseInt($scope.compData.JS.phoneconfig.maskend);i++){
								maskstr = maskstr + '*';
							}
							var phone = '';
							if(param.indexOf($scope.compData.JS.phoneconfig.prefix)==0 && param.length == $scope.compData.JS.phoneconfig.len){
								phone = param.substring(0, parseInt($scope.compData.JS.phoneconfig.maskbegin)) + maskstr + param.substring(parseInt($scope.compData.JS.phoneconfig.maskend));
							}else if(param.length >= parseInt($scope.compData.JS.phoneconfig.commonlen)){
								phone = param.substring(0, parseInt($scope.compData.JS.phoneconfig.commonbegin)) + maskstr + param.substring(parseInt($scope.compData.JS.phoneconfig.commonend));
							}
							return phone; //该函数返回一个手机号码
						};
						//获取后台数据-二次确认弹出层显示数据

						$scope.confirmData = function (param) {
							if (param != null && param != undefined) {
								$scope.revConfirmData = param.respparam; //获取二次确认后台数据
								if ($scope.revConfirmData.packageId != null && $scope.revConfirmData.packageId != undefined && $scope.revConfirmData.effectiveWay != null && $scope.revConfirmData.effectiveWay != undefined) {
									var temp = {};
									var pkg = $scope.getpkgById($scope.revConfirmData.packageId); //通过套餐id获取套餐包
									if (pkg) {
										$scope.monthpack = pkg.isMonthPack + '';
										temp.packagePrice = "" + pkg.price;
									}
									temp.phoneNo = $scope.phoneFilter($scope.revConfirmData.msisdn) + ','+$scope.compData.JS.phone_text; //电话号码加密
									temp.packageName = $scope.revConfirmData.packageName; //从后台获取套餐包名

									$scope.compData.JS.packageeffectstate.JS.specialstate = $scope.compData.JS.packageeffectstate.JS.specialstate + '';
									$scope.compData.JS.packageeffectstate.JS.specialstateconfig = $scope.compData.JS.packageeffectstate.JS.specialstateconfig || {
										"0" : {
											"value1" : "当月生效",
											"value2" : "永久生效"
										},
										"1" : {
											"value" : "预约生效"
										}
									};
									temp.effectiveWayspecial1 = $scope.compData.JS.packageeffectstate.JS.specialstateconfig["0"].value1;
									temp.effectiveWayspecial2 = $scope.compData.JS.packageeffectstate.JS.specialstateconfig["0"].value2;
									temp.effectiveWayspecial3 = $scope.compData.JS.packageeffectstate.JS.specialstateconfig["1"].value;

									if ($scope.revConfirmData.effectiveWay == 0) { //如果从后台获取的生效方式是0
										if ($scope.compData.JS.packageeffectstate && $scope.compData.JS.packageeffectstate.JS.specialstate == '1' && $scope.monthpack == '0') {
											$scope.effectiveWayFlag = 2;
											$scope.effecttimevalue = '0';
											$scope.effectperiod = '1';
										} else {
											temp.effectiveWay = $scope.compData.JS.packageeffectstate.JS.stateconfig[0].value;
											$scope.effectiveWayFlag = 0;
										}
										$scope.flowUpshiftFlag = $scope.revConfirmData.effectiveWay;
									} else if ($scope.revConfirmData.effectiveWay == 1) { //如果从后台获取的生效方式是1
										if ($scope.compData.JS.packageeffectstate.JS.specialstate == '1' && $scope.monthpack == '0') {
											$scope.effectiveWayFlag = 0;
											temp.effectiveWay = temp.effectiveWayspecial3;
											$scope.effecttimevalue = '1';
											$scope.effectperiod = '0';

										} else {
											temp.effectiveWay = $scope.compData.JS.packageeffectstate.JS.stateconfig[1].value;
											$scope.effectiveWayFlag = 0;
										}
										$scope.flowUpshiftFlag = $scope.revConfirmData.effectiveWay;
									} else if ($scope.revConfirmData.effectiveWay == 2) { //如果从后台获取的生效方式是2
										if ($scope.compData.JS.packageeffectstate.JS.specialstate == '1' && $scope.monthpack == '0') {
											$scope.effectiveWayFlag = 3;
											$scope.effecttimevalue = '0';
											$scope.effectperiod = '1';
											$scope.flowUpshiftFlag = '0';

										} else {
											temp.effectiveWay0 = $scope.compData.JS.packageeffectstate.JS.stateconfig[0].value;
											temp.effectiveWay1 = $scope.compData.JS.packageeffectstate.JS.stateconfig[1].value;
											$scope.effectiveWayFlag = 1;
											$scope.flowUpshiftFlag = '1';
										}
									} else {  //其它生效方式
										$scope.effectiveWayFlag = -1;
										$scope.flowUpshiftFlag = $scope.revConfirmData.effectiveWay;
									}
									$scope.userbuypkg = $scope.revConfirmData.packageId;
									$scope.revConfirmData = temp;
									$scope.flag = 1;
									submitconfirmbtn = false;
									if (!confirmdialog) {
										confirmdialog = angular.element($element[0].querySelector('.c60_fbar_pop_block2'));
									}
									$scope.isShowverifycfg = false;//给是否展示验证码设定一个初始值，默认不展示
									var verifycfg = $scope.compData.JS.isShowverifybyId;//获取订购套餐展示验证码的配置项										
									if ($scope.compData.JS.checkCode.JS.isShow) { //如果验证码总开关开启								
										if(verifycfg != null && verifycfg != undefined){
											if(verifycfg[$scope.currentpkgid]){
												$scope.isShowverifycfg = true; //验证码总开关开启，配置的套餐验证码也开启，则所配置的套餐展示验证码
											}else{
												$scope.isShowverifycfg = false; //验证码总开关开启，配置的套餐验证码关闭，则所配置的套餐不展示验证码
											}													
										}else{
											$scope.isShowverifycfg = true; //验证码总开关开启，没有进行套餐验证码配置，则所有套餐都展示验证码
										}																												
										$scope.compData.JS.keyNum = $scope.compData.JS.keyboardNum[new Date().getTime() % $scope.compData.JS.checkCodelen];																																		
									}else{  //如果验证码总开关关闭
										$scope.isShowverifycfg = false; //验证码总开关关闭，则所有套餐均不展示验证码
									}

									confirmdialog.css({
										'z-index' : '2047483647889',
										'display' : 'block'
									});
									if ($scope.compData.JS.checkCode.JS.isShow) { //如果开启了验证码功能，给二次确认div附加一个样式
										confirmdialog.css({
											'margin-bottom' : '-10em'
										});
									}
									setTimeout(function () {
										submitconfirmbtn = true
									}, Number($scope.compData.JS.delaysubmitbtn || 200));
									auhidetimeout = setTimeout($scope.hideConfirmDialog, Number($scope.compData.JS.confirmPopupAutohide || 10) * 1000);
									$scope.effectiveLeftRightFlag = 0;
									$scope.effectiveLeftRightFlag2 = 0;
								} else {
									coreService.fireEvent($element.attr('cid'), $attrs['event'] || 'clickTime');
								}
							}
						};
						//底部订购和升档按钮事件-传递套餐ID
						$scope.buyNow = function (clickFrom) {

							if (auhidetimeout) {
								clearTimeout(auhidetimeout);
								auhidetimeout = null;
							}
							if ($scope.currentCategoryId != null && $scope.currentCategoryId != undefined && $scope.selectedPkg[$scope.currentCategoryId] != null && $scope.selectedPkg[$scope.currentCategoryId] != undefined) {
								angular.element($element[0].querySelector('.c60_fbar_bg_pop_block2')).css({    //显示遮罩
									'z-index' : '2047483647888',
									'display' : 'block'
								});
								coreService.fireEvent($element.attr('cid'), $attrs['event'] || 'click0', {
									"id" : encodeURIComponent($scope.selectedPkg[$scope.currentCategoryId]),
									"epageId" : top.tlbs.ordersrc
								});
						
								var storeData  = $scope.notFromStore ? {"storeData": false} : {};
								
								coreUtils.recordTracingCdr($scope.pageID, $scope.pageID + "_" + 'buybtn', $scope.compData.JS.buynowbtnconfig.JS.cdrConfig, {}, storeData);
								/*for (var i = 0, len = $scope.revData.length; i < len; i++) {
								if ($scope.currentCategoryId == $scope.revData[i].categoryid) {
								for (var j = 0, len2 = $scope.revData[i].list.length; j < len2; j++) {
								if ($scope.revData[i].list[j].id == $scope.selectedPkg[$scope.currentCategoryId]) {
								$scope.monthpack = $scope.revData[i].list[j].isMonthPack;
								return false;
								}
								}
								}
								}*/
							}
						};

						//底部订购和升档按钮事件-传递套餐ID

						$scope.buyNowForEach = function (pkg, cdrflag) {
							if (auhidetimeout) {
								clearTimeout(auhidetimeout);
								auhidetimeout = null;
							}

							if (pkg) {
								if (pkg.status == '0' || $scope.orderedPackage[pkg.id] == 1 || !buybtncanclick || pkg.ordering == 1) {
									return
								}
								pkg.ordering = 1;
								//设置一个订购按钮点击时间间隔
								setTimeout(function () {
									pkg.ordering = 0
								}, Number($scope.buybtnclickinterval || 500));
								if (!popupmask) {    
									popupmask = angular.element($element[0].querySelector('.c60_fbar_bg_pop_block2'));
								}
								popupmask.css({      //显示遮罩
									'z-index' : '2047483647888',
									'display' : 'block'
								});
								coreService.fireEvent($element.attr('cid'), $attrs['event'] || 'click0', {
									"id" : encodeURIComponent(pkg.id),
									"epageId" : top.tlbs.ordersrc
								});
								$scope.currentpkgid = pkg.oid;//通过订购和升档按钮的点击事件来获取当前选中套餐的套餐id
								if (cdrflag != '0') {
						
                                    var extendCdrConfigData  = $scope.notFromStore ? {"storeData": false} : {};
								
								    coreUtils.recordTracingCdr($scope.pageID,  $scope.pageID + "_" + 'buybtn', $scope.compData.JS.buynowbtnconfig.JS.cdrConfig,{"pkgid" : pkg.id}, extendCdrConfigData);
								}
								/*for (var i = 0, len = $scope.revData.length; i < len; i++) {
								if ($scope.currentCategoryId == $scope.revData[i].categoryid) {
								for (var j = 0, len2 = $scope.revData[i].list.length; j < len2; j++) {
								if ($scope.revData[i].list[j].id == $scope.selectedPkg[$scope.currentCategoryId]) {
								$scope.monthpack = $scope.revData[i].list[j].isMonthPack;
								return false;
								}
								}
								}
								}*/
							}
						};

						$scope.queryerror = function () {
							if (!popupmask) {
								popupmask = angular.element($element[0].querySelector('.c60_fbar_bg_pop_block2'));
							}
							popupmask.css({          //隐藏遮罩
								'z-index' : '0',
								'display' : 'none'
							});

						}
						//二次确认弹出层中确定按钮事件-传递套餐ID+生效类型ID
						$scope.submitConfirm = function () {
							//当有二维码确认并且用户验证错误情况下，直接返回
							if ($scope.compData.JS.checkCode.JS.isShow && $scope.compData.JS.isShowverifybyId[$scope.currentpkgid] && ($scope.compData.JS.confirmBtn == false)) {
								return;
							}
							if (!submitconfirmbtn) {
								return;
							}
							/*if (!confirmdialog) {
							confirmdialog = angular.element($element[0].querySelector('.c60_fbar_pop_block2'));
							}
							//将"是的，确认"按钮状态修改为不可点击，直到用户二维码才对位置
							$scope.compData.JS.confirmBtn = false;
							$scope.compData.JS.curNum = $scope.compData.JS.checkCode.JS.curNum;
							angular.element($element[0].querySelector('.c60_fbar_inputNum')).css({'border':''});
							confirmdialog.css({
							'z-index' : '0',
							'display' : 'none'
							});
							if (!popupmask) {
							popupmask = angular.element($element[0].querySelector('.c60_fbar_bg_pop_block2'));
							}

							popupmask.css({
							'z-index' : '0',
							'display' : 'none'
							});*/
							$scope.hideConfirmDialog();
							var inputData;
							//将前台参数传递给后台
							if ($scope.compData.JS.packageeffectstate.JS.specialstate == '1' && $scope.monthpack == '0') {
								inputData = {
									"id" : encodeURIComponent($scope.userbuypkg),
									"flowUpshiftFlag" : $scope.flowUpshiftFlag,
									"saleid" : "",
									"epageId" : top.tlbs.ordersrc,
									"effecttime" : {
										"value" : $scope.effecttimevalue
									},
									"effectperiod" : {
										"value" : $scope.effectperiod
									},
									"isMonthPack" : $scope.monthpack || ''
								};

							} else {
								inputData = {
									"id" : encodeURIComponent($scope.userbuypkg),
									"flowUpshiftFlag" : $scope.flowUpshiftFlag,
									"saleid" : "",
									"epageId" : top.tlbs.ordersrc,
									"effecttime" : {
										"value" : $scope.flowUpshiftFlag
									},
									"effectperiod" : {
										"value" : $scope.flowUpshiftFlag == '0' ? '1' : '0'
									},
									"isMonthPack" : $scope.monthpack || ''
								};
							}
							if (null != top.tlbs.cdrData) {
								inputData['epageId'] = top.tlbs.cdrData.pageId || '';
							}

							inputData['taskId'] = $scope.taskId || '';

							//console.log(inputData)
							coreService.fireEvent($element.attr('cid'), $attrs['event'] || 'clickSubmit', inputData);
				
							coreUtils.recordTracingCdr($scope.pageID, $scope.pageID + '_' + 'okbtn', $scope.compData.JS.popblockconfig.JS.uitracingsubmit.cdrConfig, {"taskId": $scope.taskId});
							//top.tlbs.cdrData = null;
						};
						//套餐列表样式
						$scope.packageCurrent = function (pkg) {
							var style = '';
							if (pkg != null && pkg != undefined) {
								var categoryid = pkg.categoryid,
								style;
								if ($scope.orderedPackage[pkg.id] == 1 && pkg.iscombo == 1) {
									style = $scope.compData.JS.packagetitlebgstate.JS.stateconfig.state0;
								} else if ($scope.orderedPackage[pkg.id] == 1 && pkg.iscombo != 1) {
									style = $scope.compData.JS.packagetitlebgstate.JS.stateconfig.state2;
								} else if (pkg.status == 1 && pkg.iscombo == 1 && pkg.id == $scope.selectedPkg[categoryid]) {
									style = $scope.compData.JS.packagetitlebgstate.JS.stateconfig.state1;
								} else if (pkg.status == 1 && pkg.iscombo == 1 && pkg.id !== $scope.selectedPkg[categoryid]) {
									style = $scope.compData.JS.packagetitlebgstate.JS.stateconfig.state0;
								} else if (pkg.status == 0 && pkg.iscombo == 1) {
									style = $scope.compData.JS.packagetitlebgstate.JS.stateconfig.state0;
								} else if (pkg.status == 1 && pkg.iscombo != 1 && pkg.id == $scope.selectedPkg[categoryid]) {
									style = $scope.compData.JS.packagetitlebgstate.JS.stateconfig.state3;
								} else if (pkg.status == 1 && pkg.iscombo != 1 && pkg.id !== $scope.selectedPkg[categoryid]) {
									style = $scope.compData.JS.packagetitlebgstate.JS.stateconfig.state2;
								} else if (pkg.status == 0 && pkg.iscombo != 1) {
									style = $scope.compData.JS.packagetitlebgstate.JS.stateconfig.state2;
								}
								return style;
							}

						};
						//套餐列表中颜色块标题样式
						$scope.packageCurrent2 = function (pkg) {
							if (pkg != null && pkg != undefined) {
								var categoryid = pkg.categoryid,
								style;
								if (pkg.status == 0 || $scope.orderedPackage[pkg.id] == 1) {
									style = $scope.compData.JS.packagetitlestate.JS.stateconfig.state2;
								} else if (pkg.id == $scope.selectedPkg[categoryid]) {
									style = $scope.compData.JS.packagetitlestate.JS.stateconfig.state1;
								} else {
									style = $scope.compData.JS.packagetitlestate.JS.stateconfig.state0;
								}
								return style;
							}
						};
						//单个套餐点击事件

						$scope.packageClick = function (pkg, index, flag) {
							if (index != null && index != undefined && pkg != null && pkg != undefined) {
								$scope.compData.JS.packageIndex = index;						
								//if (pkg.status == 1) //去掉如果套餐不能订购无法点击的限制
								{
									var notExpandedBefore = $scope.setCurrentPkgid(pkg.id);
									//如果已经展开，不需要重复记录话单
									if (flag && notExpandedBefore) {
										//top.tlbs.cdrData = null;
               
										coreUtils.recordTracingCdr($scope.pageID, 'pa' + pkg.oid, $scope.compData.JS.packagetitlebgstate.JS.cdrConfig, {"iseComp": pkg.oid});
										buybtncanclick = false;

										setTimeout(function () {
											buybtncanclick = true
										}, Number($scope.compData.JS.delaybuybtn || 200));

									} else {
										buybtncanclick = true;
									}
								}

							}
						};

						//升档包和非升档包详情信息显示隐藏（流量，语音，短信，套餐详情，生效方式）
						$scope.packagePriceDescContentHide = function (pkg) {
							if (pkg != null && pkg != undefined) {
								var categoryid = pkg.categoryid;
								if (pkg.iscombo == 1) {
									return $scope.compData.JS.packagedescstate.JS.stateconfig.state2;
								} else if (pkg.id == $scope.selectedPkg[categoryid]) {
									return $scope.compData.JS.packagedescstate.JS.stateconfig.state1;
								} else {
									return $scope.compData.JS.packagedescstate.JS.stateconfig.state0;
								}
							}
						};

						$scope.delaytime = function (param) {
							if (param != null && param != undefined) {
								if (param.respparam.subscribtionstatus != null && param.respparam.subscribtionstatus != undefined && param.respparam.subscribtionstatus == 0) {
									var pkgid = $scope.selectedPkg[$scope.currentCategoryId];
									$scope.selectedPkg[$scope.currentCategoryId] = undefined;
									$scope.orderedPackage[pkgid] = 1;
									$timeout(function () {
										for (var i = 0; i < $scope.revData.length; i++) {
											var list = $scope.revData[i].list;
											for (var j = 0; j < list.length; j++) {
												for (var j = 0; j < list.length; j++) {
													if (pkgid == list[j].id) {
														$scope.orderedPackage[pkgid] = 0;
														$scope.revData[i].list[j].status = $scope.packageStatus[pkgid];
														// if($scope.packageStatus[pkgid]=='1'&&j==0)
														//$scope.packageClick(list[0]);
													}
												}
											}
										}
									}, $scope.compData.JS.packagetitlebgstate.JS.stateconfig.settimer);

								}

							}
						}

						var marginLeft = 0;
						var tabcontainer = angular.element($element[0].querySelector('[id="dfdfdf"]')); //用一个变量接收id为dfdfdf的div容器

						//套餐切换
						$scope.changeCurrent = function (param, buyflag) {

							$scope.taskId = '';
							if (top.tlbs.cdrData) {
								$scope.taskId = top.tlbs.cdrData.taskId || '';
							}
							$scope.notFromStore = true;
							var times = times || 0;
							var tipsel = angular.element($element[0].querySelector('.c60_fbar_bg_pop_nopkg'));
							var popblock = angular.element($element[0].querySelector('.c60_fbar_bg_pop_block2'));
							var confirmdiag = angular.element($element[0].querySelector('.c60_fbar_pop_block2'));
							confirmdiag.css({
								'display' : 'none',
								'z-index' : '0'
							});
							var hideTips = function () {
								popblock.css({
									'display' : 'none',
									'z-index' : '0'
								});
								tipsel.css({
									'display' : 'none',
									'z-index' : '0'
								});
							};
							var displayTips = function () {
								tipsel[0].innerHTML = $scope.compData.JS.changingtips || '查询中...';
								popblock.css({
									'display' : 'block',
									'z-index' : '2047483647888'
								});
								tipsel.css({
									'display' : 'block',
									'z-index' : '2047483647889'
								});
							};
							var process = function () {
								var pkg = $scope.setSelected(param);
								if (pkg) {
									hideTips();
									if ((buyflag || $scope.compData.JS.directBuy) && pkg.status == '1') {
										$scope.buyNowForEach(pkg, 0);
									}
								} else {
									tipsel[0].innerHTML = $scope.compData.JS.nopkgtips || '对不起，未找到指定套餐。';
									setTimeout(
										hideTips, Number($scope.compData.JS.pkgnofoundautohide || 2) * 1000);
								}
							}
							var remoteData = undefined;
							var onSuccess = function (data, status, headers) {
								remoteData = data;
								$scope.updateData(data, true);
								process();
							};
							var onError = function (data, status, headers) {
								tipsel.innerHTML = $scope.compData.JS.nopkgtips || '对不起，未找到指定套餐。';
								setTimeout(
									hideTips, Number($scope.compData.JS.pkgnofoundautohide || 2) * 1000);
							};

							displayTips();
							//如果 $scope.revData为空，触发查询
							//tab错位问题修改
							coreUtils.sendRequest($scope.compData.JS.pkgservice || 'packagestore', {}, onSuccess, onError);
//							if (!$scope.revData) {
//								coreUtils.sendRequest($scope.compData.JS.pkgservice || 'packagestore', {}, onSuccess, onError);
//							} else {
//								process();
//							}
						};
                        //选中套餐函数
						$scope.setSelected = function (param) {
							if (param != null && param != undefined) {
								var pkgid = param.pkgid;
								var categorys = $scope.revData || [];
								for (var i = 0, len = categorys.length; i < len; i++) {
									list = categorys[i].list;
									for (var j = 0, llen = list.length; j < llen; j++) {
										if (list[j].id == pkgid || list[j].oid == param.oid || list[j].oid == param.pkgoid) {
											$scope.compData.JS.tabcategoryIndex = i;
											categoryid = categorys[i].categoryid;
											pkg = list[j];
											$scope.categoryClick(i, categorys[i], false);
											$scope.packageClick(pkg, j, false);
											/*if (i <= 3) {
											marginLeft = 0;
											tabcontainer.css({
											'margin-left' : 0
											});
											} else {
											marginLeft =  - (i - 3) * 100 / 3;
											tabcontainer.css({
											'margin-left' :  - (i - 3) * 100 / 3 + '%'
											});
											}*/
											if (list[j].status == "1") {
												//$scope.taskId = param.taskId;
											} else {
												$scope.selectedPkg[categoryid] = undefined;
											}
											return pkg;
										}
									}
								}
							}
							return undefined;
						};

						$scope.changeCurrentByOid = function (param) {
							$scope.changeCurrent(param, true);

						};

						$scope.touchTab = function () {
							var _touchstart = Const.touchEvent.start;
							var _touchmove = Const.touchEvent.move;
							var _touchend = Const.touchEvent.end;
							var _lastYPos = 0;
							var _lastXPos = 0;
							var _currentYPos = 0;
							var _currentXPos = 0;
							var translatex = 0;
							var tabcontainerwrapper = angular.element($element[0].querySelector('[id="cdcdcd"]'));
							var moveflag = false;
							tabcontainer.bind(_touchstart, function (e) {
								_lastYPos = e.touches ? e.touches[0].pageY : e.pageY;
								_lastXPos = e.touches ? e.touches[0].pageX : e.pageX;

							});
							tabcontainer.bind(_touchmove, function (e) {
								_currentYPos = e.touches ? e.touches[0].pageY : e.pageY;
								_currentXPos = e.touches ? e.touches[0].pageX : e.pageX;
								if (Math.abs(_currentXPos - _lastXPos) > 3 || moveflag) {
									e.stopPropagation();
									e.preventDefault();
									moveflag = true;
								}
							});
							tabcontainer.bind(_touchend, function (e) {

								var xdistance = _currentXPos - _lastXPos;
								var ydistance = _currentYPos - _lastYPos;

								var currentIndex = $scope.compData.JS.tabcategoryIndex;
								var maxIndex = ($scope.revData || []).length - 1;
								if (moveflag) {
									if (xdistance < 0) {
										currentIndex++;
										if (currentIndex > maxIndex) {
											currentIndex = maxIndex;
										}

									} else {
										currentIndex--;
										if (currentIndex < 0) {
											currentIndex = 0;
										}
									}
									$scope.categoryClick(currentIndex, $scope.revData[currentIndex], true)
								}
								moveflag = false;

								//var distance = 100 / $scope.maxdisplaynum;
								//var maxWidth =  - ($scope.revData.length - $scope.maxdisplaynum) * distance;
								//console.log(marginLeft+'---------'+distance+'+++++++++'+xdistance)
								/*if ($scope.revData.length > $scope.maxdisplaynum) {
								if (xdistance < 0) {
								if (marginLeft - distance >= maxWidth) {
								tabcontainer.css({
								'margin-left' : marginLeft - distance + '%'
								});
								marginLeft = marginLeft - distance;
								} else {
								tabcontainer.css({
								'margin-left' : maxWidth + '%'
								});
								marginLeft = maxWidth;
								}
								} else {
								if (marginLeft + distance <= 0) {
								tabcontainer.css({
								'margin-left' : marginLeft + distance + '%'
								});
								marginLeft = marginLeft + distance;
								} else {
								tabcontainer.css({
								'margin-left' : 0
								});
								marginLeft = 0;
								}
								}
								}*/
								$scope.$apply();
							});
						};
						//当点击数字列表时候处理函数
						$scope.numclick = function (index) {
							var curNum = $scope.compData.JS.keyboardNum[index];
							if (Number($scope.compData.JS.keyNum) == Number(curNum)) {
								$scope.compData.JS.confirmBtn = true;
								$scope.compData.JS.curNum = curNum;
								angular.element($element[0].querySelector('.c60_fbar_inputNum')).css({
									'border' : ''
								});
							} else {
								$scope.compData.JS.curNum = $scope.compData.JS.checkCode.JS.errorTips;
								$scope.compData.JS.confirmBtn = false;
								angular.element($element[0].querySelector('.c60_fbar_inputNum')).css({
									'border' : '1px solid red'
								});
							}
						};
						//组件初始化函数
						$scope.init = function () {
							coreService.registerComponentInstance($element.attr('cid'), $scope);
							var properties = coreService.getInitProperties($attrs['cid']) || {};
							$scope.compData = coreUtils.extendDeep($scope.compData, properties);
							$element.css($scope.compData.CSS || {});
							var wrapper = angular.element($element[0].querySelector(".c60_fbar_wrapper"));
							wrapper.css($scope.compData.JS.wrappercss || {
								"padding-bottom" : "1em"
							});
							var pricetips = angular.element($element[0].querySelector(".c60_fbar_pkgprice"));
							pricetips.css($scope.compData.JS.pricetipscss || {
								"font-size" : "1em",
								"color" : "red"
							});
							//将配置中的数字转化为数组-----start
							if ($scope.compData.JS.checkCode.JS.isShow) {
								var nums = $scope.compData.JS.checkCode.JS.nums;
								if (nums == undefined || nums == null || nums == "") {
									nums = $scope.compData.JS.checkCode.JS.defaultNum;
								}
								var numarr = [];
								$scope.compData.JS.checkCodelen = nums.length < 6 ? nums.length : 6;
								for (var i = 0; i < $scope.compData.JS.checkCodelen; i++) {
									numarr[i] = nums[i];
								}
								//输出选择数字列表
								$scope.compData.JS.keyboardNum = numarr;
								$scope.compData.JS.curNum = $scope.compData.JS.checkCode.JS.curNum;
								//将"是的，确认"按钮状态修改为不可点击，直到用户二维码才对位置
								$scope.compData.JS.confirmBtn = false;
							}
							//将配置中的数字转化为数组-----end
							coreService.fireEvent($element.attr('cid'), 'init');
							$scope.touchTab();
							
							touchEnd();
						};
						
						function touchEnd(){
							var _touchEnd = Const.touchEvent.end;
							var subConfiremBtn = angular.element($element[0].querySelector("#c60_fbar_store_btn_id"));
							    subConfiremBtn.bind(_touchEnd,function(e){
							    	e.stopPropagation();
							    	e.preventDefault();
							    	$scope.submitConfirm();
							    });
						}
						    
						$scope.$on($attrs['cid'] + '_handleEvent', function (event, cevent, args, deferred) {
							if ($scope.eventMap[cevent]) {
								$scope.eventMap[cevent](args);
								if (null != deferred) {
									deferred.resolve();
								}
							}
						});

						$scope.eventMap['changecurrent'] = $scope.changeCurrent;
						$scope.eventMap['changecurrentbyoid'] = $scope.changeCurrentByOid;
						$scope.eventMap['confirm'] = $scope.confirmData;
						$scope.eventMap['update'] = $scope.updateData;
						$scope.eventMap['delaytime'] = $scope.delaytime;
						$scope.eventMap['queryerror'] = $scope.queryerror;
						$scope.eventMap['hideConfirmDialog'] = $scope.hideConfirmDialog;

					}
				],
				link : function ($scope, $element, $attrs, ctl) {
					$scope.pageID = ctl.pageID;
					$scope.componentType = 'page';
					$scope.init();
				}
			}
		}
	]);

uiCore.directive('ntable', [function () {
			return {
				restrict : 'AE',
				replace : true,
				require : '^pid',
				template : '<li ng-class="{\'c60_fbar_packagePriceDesc\':true}" ng-repeat="package in param.list" ng-style="packageCurrent(package)" >' + '<div ng-class="{\'c60_fbar_packagePriceDescTitle\':true}" ng-click="packageClick(package,$index,true);">' + '<div  ng-class="{\'c60_fbar_packagePriceDescTitleSize\':true}"  ng-style="packageCurrent2(package)" ng-bind="package.title"></div>' + '<div ng-class="{\'c60_fbar_packagePriceDescTitleContent\':true,\'c60_fbar_packagePriceDescTitleContent2\':package.iscombo==1}"  ng-style="packageCurrent2(package)"  >' + '<div ng-class="{\'c60_fbar_packagePriceDescTitleNameprice\':true}">' + '<p ng-class="{\'c60_fbar_packagePriceDescTitleName\':true}"  ng-bind="package.name"></p>' + '<p ng-class="{\'c60_fbar_packagePriceDescTitleprice\':true}" ng-show="package.iscomboflag" ng-bind="package.price"></p>' + '</div>' + '</div>' + '</div>' + '<div ng-class="{\'c60_fbar_packagePriceDescContent\':true}" class="c60_fbar_detail" ng-style="packagePriceDescContentHide(package)">' + '<div ng-show="package.iscomboflag">' + '<p ng-repeat="properies in package.properies" ng-class="{\'c60_fbar_packagePriceDescContentP\':true}"  ng-bind="properies"></p>' + '</div>' + '<p ng-class="{\'c60_fbar_packagePriceDescContentP2\':true}" ng-show="!(package.iscomboflag2)"  ng-bind-html="to_trusted(package.desc)"></p>' + '<p ng-class="{\'c60_fbar_packagePriceDescContentremarks\':true}" ng-bind="package.effectdesc"></p>' + '<button ng-if="!compData.JS.showbottombuybtn" ng-class="{\'c60_fbar_BuyNowBtn\':true}" ng-style="buyNowBtnStyleForEach(package)" ng-click="buyNowForEach(package);$event.stopPropagation();" ng-bind="buyNowBtnForEach(package)"></button>' + '</div>' + '</li>',
				scope : {
					param : '=param',
				},
				controller : ["$scope", "$element", "$attrs", 'coreService', 'coreUtils', 'Const',
					function ($scope, $element, $attrs, coreService, coreUtils, Const) {
						$scope.cid = $attrs.cid;
						$scope.eventMap = {};
						$scope.to_trusted = function (text) {
							return coreUtils.getTrustedHtml(text);
						};
					}
				],
				link : function ($scope, $element, $attrs, ctl) {
					$scope.pageID = ctl.pageID;
					$scope.componentType = 'page';
				}
			}
		}
	]);
uiCore.directive("ipopuppkgrec",[function(){return{restrict:"AE",replace:true,transclude:true,scope:{},require:"^pid",template:'<div class="c60_fbar_tanchuang_bottom"><div class="c60_fbar_tanchuangpkgrec_wrapper"  ng-show="pkgflag"><div style="overflow:hidden" simplescroll><ipoppack ecid="cid" config="{{::compData.JS}}" ppid="pageID" ng-repeat="ipack in packagelist" taskid="taskId" ipack=ipack></ipoppack></div></div><div class="c60_fbar_tuisong_name clearfloat" ng-show="pkgflag"><span class="c60_fbar_tuisong_name_txt" ng-bind="compData.JS.tuisong_name_txt.text"></span></div><div class="c60_fbar_mainpkg" ng-show="!pkgflag"><ul class="c60_fbar_mainpkg_list"><li ng-click="liCkick(mainpkg.id);" ng-repeat="mainpkg in pmdata" ccid="c60_fbar_mainpkgtj"><div class="c60_fbar_mainpkg_title c60_fbar_clearfloat"><div class="c60_fbar_mainpkg_title_type" style="background:{{mainpkg.color}}" ng-bind="mainpkg.text"></div><div class="c60_fbar_mainpkg_title_price" ><div class="c60_fbar_mainpkg_title_pricebgcolor" style="background:{{mainpkg.color}}"></div><span class="c60_fbar_mainpkg_title_price_color" ></span></div></div><div class="c60_fbar_mainpkg_title_names" ng-bind="mainpkg.name"></div><div  class="c60_fbar_mainpkg_txt"><div class="c60_fbar_mainpkg_txt_scroll" ng-bind-html="to_trusted(mainpkg.desc)" simplescroll></div></div></li></ul></div></div>',controller:["$scope","$element","$attrs","coreService","coreUtils","Const","$compile","$interval",function(d,c,b,f,a,g,e,h){d.cid=b.cid;d.eventMap={};d.pkgflag=true;d.taskId=null;d.to_trusted=function(i){return a.getTrustedHtml(i)};d.update=function(l){d.taskId=l.taskId;if(l.pmdata){d.pkgflag=false;var m=l.pmdata;d.pmdatas=l.pmdata;d.ptaskId=l.pmdata.taskId;if(d.compData.JS.colorconfig){m.currentpackage.color=d.compData.JS.colorconfig.color0;m.recommandpackage.color=d.compData.JS.colorconfig.color1}if(d.compData.JS.textconfig){m.currentpackage.text=d.compData.JS.textconfig.text0;m.recommandpackage.text=d.compData.JS.textconfig.text1}d.pmdata=[m.currentpackage||{},m.recommandpackage||{}]}else{d.pkgflag=true;var q=d.compData.JS.colorconfig;var k=l.packagelist||[];var s=[];var v=[];var w=[];for(var p=0,r=k.length;p<r;p++){s=k[p].list;for(var o=0,n=s.length;o<n;o++){var t=function(i){for(var j in i){return true}return false};if(t(s[o])){if(t(s[o].comboProperies)){for(var u=0;u<s[o].comboProperies.length;u++){if(s[o].comboProperies[u].key=="2"){s[o].value=s[o].comboProperies[u].value}}}s[o].categoryname=k[p].categoryname;s[o].eid=d.cid;s[o].color=q["color"+p];w.push(s[o])}else{}}}d.packagelist=w}};d.liCkick=function(k){if(top.tlbs.popupTxtMove==true){return}if(top.tlbs.messageid!=""){f.fireEvent(d.cid,"messagestatuschange",{messageid:top.tlbs.messageid})}a.recordTracingCdr(d.pageID,d.pageID+"_"+k,d.compData.JS.cdrConfig,{taskId:d.taskId,iseComp:"1"});var i=d.compData.JS.phonetitle||"存费送机";var j=d.compData.JS.feetitle||"存费送费";f.fireEvent(d.cid,"storefee",{pmdatas:d.pmdatas,pmdata:d.pmdata,taskId:d.ptaskId,linktype:d.compData.JS.linkconfig.linktype||"2",url:d.compData.JS.linkconfig.url||"istorefee",stitle:d.pmdatas.isoffer==true||d.pmdatas.isoffer=="true"?i:j})};d.eventMap.update=d.update;d.extendComponentData=function(i){a.extendDeep(d.compData,i)};d.init=function(){f.registerComponentInstance(d.cid,d);var i=f.getInitProperties(b.cid)||{};d.compData=a.extendDeep(d.compData||{},i);c.css(d.compData.CSS||{});d.extendComponentData(f.getInitProperties(d.cid)||{})};d.$on(d.cid+"_handleEvent",function(l,j,k,i){d.eventMap[j](k,i);if(null!=i){i.resolve()}})}],link:function(c,b,a,d){c.pageID=d.pageID;c.componentType="ipopuppkgrec";c.init()}}}]);uiCore.directive("ipoppack",function(){return{restrict:"EA",replace:true,require:"^pid",scope:{ipack:"=ipack",pageID:"=ppid",taskId:"=taskid"},template:'<div  class="c60_fbar_flux_bag_recomm" ccid="c60_fbar_flux_bag_recomm"><div class="c60_fbar_flux_bag_type_price c60_fbar_clearfloat"><div class="c60_fbar_flux_bag_type c60_fbar_bg_90c666" style="background:{{ipack.color}}" ng-bind="ipack.categoryname"></div><div class="c60_fbar_flux_bag_price c60_fbar_bg_90c666" style="background:{{ipack.color}}"><span class="c60_fbar_flux_bag_price_color" ng-bind="unitconfig+ipack.price"></span></div></div><div class="c60_fbar_flux_volume_txt" ng-bind="ipack.value"></div></div>',controller:["$scope","$element","$attrs","coreService","coreUtils","Const",function(d,c,b,e,a,f){d.touchLink=function(){var l=f.touchEvent.start;var j=f.touchEvent.move;var n=f.touchEvent.end;var g=0;var k=0;var o=0;var i=0;var m=false;var h=false;c.bind(l,function(p){g=p.touches?p.touches[0].pageY:p.pageY;m=false;h=true});c.bind(j,function(p){o=p.touches?p.touches[0].pageY:p.pageY;if(Math.abs(o-g)>3){m=true}else{m=false}});c.bind(n,function(q){try{if(top.tlbs.messageid!=""){e.fireEvent(d.cid,"messagestatuschange",{messageid:top.tlbs.messageid})}if(h==true&&m==false){var p=a.String2JSON(b.config);a.recordTracingCdr(d.pageID,d.pageID+"_"+d.ipack.id,d.compData.JS.cdrConfig,{taskId:d.taskId,iseComp:"1"});e.fireEvent(d.ipack.eid,"click0",{pkgid:d.ipack.id,taskid:d.taskId});e.fireEvent(d.ipack.eid,"click",{pkgid:d.ipack.id,pkgoid:d.ipack.oid,taskid:d.taskId})}}finally{h=false;m=false}})};d.click=function(h){if(top.tlbs.messageid!=""){e.fireEvent(d.cid,"messagestatuschange",{messageid:top.tlbs.messageid})}var g=a.String2JSON(b.config);a.recordTracingCdr(d.pageID,d.pageID+"_"+h.id,d.compData.JS.cdrConfig,{taskId:d.taskId,iseComp:"1"});e.fireEvent(h.eid,"click0",{pkgid:h.id,taskid:d.taskId});e.fireEvent(h.eid,"click",{pkgid:h.id,taskid:d.taskId})};d.init=function(){var g=a.String2JSON(b.config);d.unitconfig=g.unitconfig.unitisShow==true?g.unitconfig.unit:"";d.compData.JS.cdrConfig=g.flux_bag_recomm.cdrConfig;d.touchLink()}}],link:function(d,b,a,c){d.compData={JS:{},CSS:{}};d.init()}}});
uiCore.directive("ipopuptop",[function(){return{restrict:"AE",replace:true,require:"^pid",scope:{},template:'<div class="c60_fbar_tanchuang_top"><div class="c60_fbar_pop_close " ng-style="compData.JS.c60_fbar_tctj_pop_close" id="c60_fbar_tctj_pop_close" ccid="c60_fbar_pop_close" ng-bind="compData.JS.popclose.text" ></div><div class="c60_fbar_flux_info_wrap" ng-show="textflag"><div class="c60_fbar_flux_info c60_fbar_clearfloat" ng-show="toptextflag"><div class="c60_fbar_flux_big_txt" ng-bind="remaincomp.v"></div><div class="c60_fbar_flux_small_txt"><div class="c60_fbar_shengyu_txt" ng-bind="compData.JS.shengyu.JS.text"></div><div class="c60_fbar_shengyu_txt" ng-bind="remaincomp.u"></div></div></div></div><div class="c60_fbar_flux_textmes c60_fbar_clearfloat" ng-show="!textflag" ng-bind="compData.JS.tipstext.text"></div><div class="c60_fbar_alert_txt"><div class="C60_fbar_alert_texts" ng-bind-html="to_trusted(message)" ng-style="cus_style"  simplescroll style="overflow:hidden;"></div></div><div class="c60_fbar_look_detail_btn" ccid="c60_fbar_look_detail_btn" ng-click="detail();$event.stopPropagation();$event.preventDefault();"><a class="c60_fbar_ld_btn_link" ng-bind="compData.JS.ld_btn_link.JS.text" ng-style="btn_style"></a></div></div>',controller:["$scope","$element","$attrs","coreService","coreUtils","Const","$compile","$interval",function(k,l,j,d,f,c,g,h){k.cid=j.cid;k.eventMap={};k.compData={};k.summary={};k.taskId=null;k.textflag=true;k.toptextflag=true;var m={K:1024,M:1024*1024,G:1024*1024*1024,T:1024*1024*1024*1024};k.to_trusted=function(n){return f.getTrustedHtml(n)};k.transferK=function(p,q){var r=q||2;var o=0;if(p<m.M){o=p/1024;return{v:f.formatNum(o,r),u:"MB"}}else{if(p<m.G){o=p/1024/1024;return{v:f.formatNum(o,r),u:"GB"}}else{o=p/1024/1024/1024;return{v:f.formatNum(o,r),u:"TB"}}}};k.extendComponentData=function(n){f.extendDeep(k.compData,n)};var b=angular.element(l[0].querySelector('[id="c60_fbar_tctj_pop_close"]'));k.touchClose=function(){var p=c.touchEvent.start;var o=c.touchEvent.move;var t=c.touchEvent.end;var q=0;var s=0;var r=0;var n=0;b.bind(t,function(u){u.stopPropagation();u.preventDefault();d.fireEvent(k.cid,"notificationclose");i("closeBtn");k.$apply();top.tlbs.notificationCdrData=null})};k.init=function(){d.registerComponentInstance(k.cid,k);var n=d.getInitProperties(j.cid)||{};k.compData=f.extendDeep(k.compData||{},n);l.css(k.compData.CSS||{});angular.element(l[0].querySelector(".flux_info")).css(k.compData.JS.flux_info.CSS);angular.element(l[0].querySelector(".ld_btn_link")).css(k.compData.JS.ld_btn_link.CSS);angular.element(l[0].querySelector(".c60_fbar_alert_txt")).css((k.compData.JS.c60_fbar_alert_txt||{}).CSS||{});k.touchClose()};k.$on(k.cid+"_handleEvent",function(q,o,p,n){k.eventMap[o](p,n);if(null!=n){n.resolve()}});k.update=function(o){if(o.pmdata){k.textflag=false;angular.element(l[0].querySelector(".C60_fbar_alert_texts")).css((k.compData.JS.alert_texts||{}).CSS||{});var n=o.pmdata;k.pmdatas=o.pmdata;k.ptaskId=o.pmdata.taskId;n.currentpackage.color=k.compData.JS.colorconfig.color0;n.recommandpackage.color=k.compData.JS.colorconfig.color1;n.currentpackage.text=k.compData.JS.textconfig.text0;n.recommandpackage.text=k.compData.JS.textconfig.text1;k.pmdata=[n.currentpackage||{},n.recommandpackage||{}]}else{k.textflag=true}k.message=o.message;k.cus_style=o.style||{};k.btn_style=o.btnstyle||{};if(o.traffic){k.traffic=o.traffic;if(o.traffic.summary!==undefined&&o.traffic.summary!==""&&o.traffic.summary!==null){k.summary=o.traffic.summary[0]||[];if(k.summary.remain==null||k.summary.remain==""||k.summary.remain==undefined){k.toptextflag=false;angular.element(l[0].querySelector(".tbholder .c60_fbar_alert_txt")).css("margin-top","1.4em")}else{k.remaincomp=k.transferK(k.summary.remain);k.toptextflag=true}}}k.taskId=o.taskId;top.tlbs.messageid=o.messageid||""};k.eventMap.update=k.update;k.processConfig=function(){angular.element(l[0].querySelector(".c60_fbar_alert_txt")).css(k.compData.JS.c60_fbar_alert_txt.CSS||{})};k.showNotification=function(n){if(null!=n&&null!=n.notifyImage){a(n.notifyImage).done(function(){l.css("display","block");angular.element(l[0].querySelector('[id="imageholder"]')).css("background-image","url('"+n.notifyImage+"')")})}};k.eventMap.showNotification=k.showNotification;k.notificationClick=function(){d.fireEvent(k.cid,"notificationClick")};k.detail=function(){if(k.pmdatas){var n=k.compData.JS.phonetitle||"存费送机";var o=k.compData.JS.feetitle||"存费送费";d.fireEvent(k.cid,"storefee",{pmdatas:k.pmdatas,pmdata:k.pmdata,taskId:k.ptaskId,linktype:k.compData.JS.ld_btn_link.JS.linktype||"2",url:k.compData.JS.ld_btn_link.JS.url||"istorefee",stitle:k.pmdatas.isoffer==true||k.pmdatas.isoffer=="true"?n:o})}else{d.fireEvent(k.cid,"todetail")}if(top.tlbs.messageid!=""){d.fireEvent(k.cid,"messagestatuschange",{messageid:top.tlbs.messageid})}i("detailbtn",{iseComp:"1"})};var e=[];function a(n){var o=0;var r=function(){};var n=(typeof n!="object")?[n]:n;function q(){o++;if(o==n.length){r(e)}}for(var p=0;p<n.length;p++){e[p]=new Image();e[p].src=n[p];e[p].onload=function(){q()};e[p].onerror=function(){q()}}return{done:function(s){r=s||r}}}function i(o,n){f.recordTracingCdr(k.pageID,k.pageID+"_"+o,k.compData.JS.popclose.cdrConfig,n)}}],link:function(c,b,a,d){c.pageID=d.pageID;c.componentType="ipopuptop";c.init()}}}]);
uiCore.directive("popupwelcome",[function(){return{restrict:"AE",replace:true,require:"^pid",template:'<div class="c60_fbar_popupwelcome"><div class="c60_fbar_wchbg_pop_block"></div><div class="c60_fbar_bg_piru" ng-style="pureWelcomeStyle(\'bg\')"><div class="c60_fbar_piru_close" ccid="c60_fbar_popupwelcome_btnclose"   ng-style="pureWelcomeStyle(\'close\')"></div><div class="c60_fbar_piru_btn_txt"><div class="c60_fbar_piru_txt"  ng-style="pureWelcomeStyle(\'message\')" ><p ng-bind-html="to_trusted(revData.message)" simplescroll></p></div><div class="c60_fbar_piru_btn"  ccid="c60_fbar_popupwelcome_btn" ng-style="pureWelcomeStyle(\'begin\')" ng-bind="nowbegin()"></div></div></div></div>',scope:{},controller:["$scope","$element","$attrs","$timeout","coreService","coreUtils","Const",function(i,j,h,e,d,f,c){i.cid=h.cid;i.compData={};i.eventMap={};i.revData={};i.to_trusted=function(k){return f.getTrustedHtml(k)};i.updateData=function(l){j.css({display:"block"});if(l!=null&&l!=undefined){if(l.message!=null&&l.message!=undefined){top.tlbs.messageid=l.messageid||"";i.revData.message=l.message}else{i.revData.message=""}}var k=i.compData.JS.closetime;if(top.tlbs.messageid!=""){e(function(){if(j.css("display")!="none"){top.tlbs.notificationCdrData=null}i.hide()},k)}};i.hide=function(){j.css({display:"none"})};var g=c.touchEvent.start,b=angular.element(j[0].querySelector(".c60_fbar_piru_btn")),a=angular.element(j[0].querySelector(".c60_fbar_piru_close"));b.bind(g,function(k){k.stopPropagation();k.preventDefault();_lastYPos=k.touches?k.touches[0].pageY:k.pageY;_lastXPos=k.touches?k.touches[0].pageX:k.pageX;j.css({display:"none"});if(top.tlbs.messageid!=""){d.fireEvent(i.cid,"messagestatuschange",{messageid:top.tlbs.messageid})}f.recordTracingCdr(i.pageID,f.createCdrid(i.pageID,"","startbtn"),i.compData.JS.popupbeginconfig.JS.cdrConfig)});a.bind(g,function(k){k.stopPropagation();k.preventDefault();_lastYPos=k.touches?k.touches[0].pageY:k.pageY;_lastXPos=k.touches?k.touches[0].pageX:k.pageX;j.css({display:"none"});f.recordTracingCdr(i.pageID,f.createCdrid(i.pageID,"","closebtn"),i.compData.JS.popupcloseconfig.JS.cdrConfig);top.tlbs.notificationCdrData=null});i.nowbegin=function(){return i.compData.JS.popupbeginconfig.JS.stateconfig.text};i.pureWelcomeStyle=function(k){if(k!=null&&k!=undefined){switch(k){case"bg":return i.compData.JS.popupbgconfig.JS.stateconfig.state;break;case"close":return i.compData.JS.popupcloseconfig.JS.stateconfig.state;break;case"begin":return i.compData.JS.popupbeginconfig.JS.stateconfig.state;break;case"message":return i.compData.JS.popupdescconfig.JS.stateconfig.state;break;default:break}}};i.init=function(){d.registerComponentInstance(j.attr("cid"),i);var k=d.getInitProperties(h.cid)||{};i.compData=f.extendDeep(i.compData,k);d.fireEvent(j.attr("cid"),"init")};i.$on(h.cid+"_handleEvent",function(m,n,l,k){if(i.eventMap[n]){i.eventMap[n](l);if(null!=k){k.resolve()}}});i.eventMap.update=i.updateData}],link:function(d,b,a,c){d.pageID=c.pageID;d.componentType="popupwelcome";d.init()}}}]);
uiCore.directive("appdownload",[function(){return{restrict:"AE",replace:true,require:"^pid",template:'<div class="c60_fbar_appdownload" ng-style="getConfigStyle({appdownload:1})"><div class="c60_fbar_app_result_con" ng-style="getapp_result_conStyle()"><div class="c60_fbar_succ_img_con"><img class="c60_fbar_succ_img"  ng-src="{{appresulturl()}}"/></div><div class="c60_fbar_tips_txt" ng-bind="appresulttips()"></div><div class="c60_fbar_result_btn" ccid="c60_fbar_link_btn"><a class="c60_fbar_link_btn" ng-bind="appresulttxt()" ng-click="returnclick()"></a></div></div><div class="tbholder c60_fbar_download">    <div class="c60_fbar_download_app" simplescroll>        <div class="c60_fbar_download_app_list" ng-repeat="appCategory in appCategorys">        	<div class="c60_fbar_download_app_list_title c60_fbar_clearfloat">            	<span class="c60_fbar_dalt_colorline" ng-style="getColorStyle($index)"></span>                <span class="c60_fbar_dalt_txt">					<span class="c60_fbar_dalt_txt_tit">{{appCategory.categoryName}}</span>					<span class="c60_fbar_dalt_txt_name" ng-style="getTxtStyle($index)">{{appCategory.description}}</span></span>                 <a class="c60_fbar_dalt_link" ccid="c60_fbar_dalt_link" ng-style="getStyle()" ng-click="more(appCategory.appCategoryID,$index)" ng-bind="compData.JS.more.JS.text"></a>           </div>           <div class="c60_fbar_download_app_list_detail">           	<ul class="c60_fbar_dald_ul c60_fbar_clearfloat">               	<li class="c60_fbar_dald_li" ccid="c60_fbar_dald_li" ng-repeat="app in appCategory.apps" ng-click="download(app.link,app.iappID)">                   	<img class="c60_fbar_dald_ul_img" ng-src="{{app.logourl}}" alt=""/>                       <p class="c60_fbar_dald_ul_txt">{{app.appName}}</p>                   </li>               </ul>           </div>       </div>  </div></div></div>',scope:{},controller:["$scope","$element","$attrs","coreService","coreUtils","Const",function(d,c,b,e,a,f){d.cid=b.cid;d.compData={};d.eventMap={};d.len1=7.2;d.download=function(h,g){if(h!=null&&h!=undefined&&h!=""&&g!=null&&g!=undefined){window.open(h);e.fireEvent(c.attr("cid"),"gaingoldcoinchain",{id:g});a.recordTracingCdr(d.pageID,"ap"+g,d.compData.JS.appdownloadCdr.cdrConfig)}};d.getColorStyle=function(g){if(g!=null&&g!=undefined){if(Number(g)%2==0){return d.compData.JS.c60_fbar_dalt_colorline_green}else{return d.compData.JS.c60_fbar_dalt_colorline_orange}}};d.getTxtStyle=function(g){if(g!=null&&g!=undefined){if(Number(g)%2==0){return d.compData.JS.c60_fbar_dalt_green_txt}else{return d.compData.JS.c60_fbar_dalt_orange_txt}}};d.getStyle=function(){if(d.compData.JS!=null&&d.compData.JS!=undefined){if(d.compData.JS.more.CSS.isShow==true){return d.compData.JS.more.CSS.show}else{return d.compData.JS.more.CSS.hide}}};d.getConfigStyle=function(g){var h;for(item in g){h=item;break}if(d.compData.JS[h]&&d.compData.JS[h].CSS){return d.compData.JS[h].CSS}};d.more=function(j,i){if(d.woChain!=null&&d.woChain!=undefined){if(d.woChain.auth==null||d.woChain.auth==undefined||d.woChain.auth==""){var l=""}else{var l=d.woChain.auth}if(d.woChain.jsessionid==null||d.woChain.jsessionid==undefined||d.woChain.jsessionid==""){var k=""}else{var k=d.woChain.jsessionid}}else{var l="";var k=""}var m=d.compData.JS.more.JS.link.defaulturl||"";var n=d.compData.JS.more.JS.link.defaultstatus||"0";var g=d.compData.JS.more.JS.link["url"+i]||m;var h=g.replace("{auth}",l);h=h.replace("{jsessionid}",k);if(Number(d.compData.JS.more.JS.linktype["status"+i]||n)==1){window.open(h)}else{e.fireEvent(c.attr("cid"),"more",{url:h})}a.recordTracingCdr(d.pageID,j+"_more",d.compData.JS.appdownloadCdr.cdrConfig)};d.changeStyle=function(){angular.element(c[0].querySelector(".tbholder .c60_fbar_download")).css({"padding-top":"10em"})};d.init=function(){e.registerComponentInstance(c.attr("cid"),d);var g=e.getInitProperties(b.cid)||{};d.compData.css=g.CSS||{};d.compData.JS=g.JS||{};d.paddingtop=d.compData.JS.appdownload.CSS;c.css(g.CSS)};d.$on(b.cid+"_handleEvent",function(i,j,h,g){if(d.eventMap[j]){d.eventMap[j](h);if(null!=g){g.resolve()}}});d.updateData=function(p){if(p!=null&&p!=undefined&&p.respparam!=null&&p.respparam!=undefined){d.respData=p.respparam;if(d.respData.appdownload!=null&&d.respData.appdownload!=undefined&&d.respData.appdownload.appCategorys!=null&&d.respData.appdownload.appCategorys!=undefined&&d.respData.appdownload.appCategorys.length>0){d.appCategorys=[];var g=d.respData.appdownload.appCategorys.length;var n=0;for(var k=0;k<g;k++){if(d.respData.appdownload.appCategorys[k].apps.length>0){d.appCategorys[n]=d.respData.appdownload.appCategorys[k];n++}}if(d.appCategorys.length==0){d.showError();return false}d.showSuccess();for(var m=0;m<d.appCategorys.length;m++){var o=d.appCategorys[m].apps;var h=Math.ceil(o.length/5);d.len1=d.len1+h*5.5}angular.element(c[0].querySelector(".c60_fbar_download_app")).attr("totalheight",d.len1*16+"px")}else{d.showError();return false}}else{d.showError();return false}};d.gainGoldCoin=function(g){if(g&&g.respparam){d.gainGoldCoin=g.respparam}};d.queryWoChain=function(g){if(g&&g.respparam){d.woChain=g.respparam.session}};d.showError=function(){d.compData.JS.c60_fbar_app_result_con.JS.showconfig.status=1;d.compData.JS.appdownload.CSS={"padding-top":"5em"};c.css(d.compData.JS.appdownload.CSS);angular.element(c[0].querySelector(".c60_fbar_download_app")).css({display:"none"});e.fireEvent(c.attr("cid"),"showerror")};d.showSuccess=function(){d.compData.JS.c60_fbar_app_result_con.JS.showconfig.status=0;d.compData.JS.appdownload.CSS=d.paddingtop;c.css(d.compData.JS.appdownload.CSS);angular.element(c[0].querySelector(".c60_fbar_download_app")).css({display:"block"});e.fireEvent(c.attr("cid"),"showsucc")};d.error=function(){d.showError()};d.getapp_result_conStyle=function(){if(d.compData.JS&&d.compData.JS.c60_fbar_app_result_con){if(d.compData.JS.c60_fbar_app_result_con.JS.showconfig.status==0){return d.compData.JS.c60_fbar_app_result_con.JS.showconfig.status0}else{return d.compData.JS.c60_fbar_app_result_con.JS.showconfig.status1}}};d.appresulturl=function(){if(d.compData.JS&&d.compData.JS.c60_fbar_app_result_con){var g="status"+d.compData.JS.c60_fbar_app_result_con.JS.statusconfig.status;var h=d.compData.JS.c60_fbar_app_result_con.JS.statusconfig[g].imgUrl;return h.replace(/'/g,"")}};d.appresulttxt=function(){if(d.compData.JS&&d.compData.JS.c60_fbar_app_result_con){var g="status"+d.compData.JS.c60_fbar_app_result_con.JS.statusconfig.status;var h=d.compData.JS.c60_fbar_app_result_con.JS.statusconfig[g].btntxt;return h}};d.appresulttips=function(){if(d.compData.JS&&d.compData.JS.c60_fbar_app_result_con){var g="status"+d.compData.JS.c60_fbar_app_result_con.JS.statusconfig.status;var h=d.compData.JS.c60_fbar_app_result_con.JS.statusconfig[g].tipstxt;return h}};d.returnclick=function(){a.recordTracingCdr(d.pageID,a.createCdrid(d.pageID,"","goFirstPage"),d.compData.JS.appdownloadCdr.cdrConfig);e.fireEvent(c.attr("cid"),b.event||"goFirstPage")};d.eventMap.update=d.updateData;d.eventMap.change=d.changeStyle;d.eventMap.gaingoldcoin=d.gainGoldCoin;d.eventMap.querywo=d.queryWoChain;d.eventMap.error=d.error}],link:function(d,b,a,c){d.pageID=c.pageID;d.componentType="page";d.path=top.tlbs.templatePath;d.init()}}}]);
uiCore.directive("fbtn",[function(){return{restrict:"AE",replace:true,require:"^pid",template:'<div class="c60_fbar_fbtn"><div ng-bind="compData.js.text" class="c60_fbar_fbtn_txt"></div></div>',scope:{},controller:["$scope","$element","$attrs","coreService","coreUtils","Const","$compile","$timeout",function(i,j,h,c,e,b,f,d){i.compData={js:{},css:{}};i.eventMap={};var a=angular.element(j[0].querySelector(".c60_fbar_fbtn_txt"));i.clickbtn=function(k){k.preventDefault();k.stopPropagation();e.recordTracingCdr(i.pageID,i.cid+"_btn",i.compData.js.cdrConfig);if(j.attr("cid")=="closebtn"){}c.fireEvent(j.attr("cid"),"btnclick")};i.showTxt=function(k){if(k&&k.text){if(i.cid=="messagebtn"&&(Number(k.text)>99)){i.compData.js.text=i.compData.js.defaultText;a.css(i.compData.js.state1||{})}else{i.compData.js.text=k.text;a.css(i.compData.js.state0||{})}}a.css({display:"block"})};i.hideTxt=function(){a.css({display:"none"})};i.queryMessageStatusFunOne=function(){c.fireEvent(j.attr("cid"),"queryMessageStatus")};i.eventMap.queryMessageStatusFunOne=i.queryMessageStatusFunOne;var g=function(){c.fireEvent(j.attr("cid"),"queryMessageStatus");d(g,Number(i.compData.js.queryStatusTimer)*1000)};i.queryMsgBoxTimer=function(){g()};i.eventMap.queryMsgBoxTimer=i.queryMsgBoxTimer;i.queryMsgBox=function(k){if(k&&k.respparam){if(Number(k.respparam.unreadmessages)>0){i.showTxt({text:k.respparam.unreadmessages})}else{i.hideTxt()}}};i.eventMap.queryMsgBox=i.queryMsgBox;i.init=function(){c.registerComponentInstance(j.attr("cid"),i);var k=c.getInitProperties(h.cid)||{};i.compData.css=k.CSS||{};i.compData.js=k.JS||{};j.css(i.compData.css);a.css(i.compData.js.textstyle||{});j[0].addEventListener(b.touchEvent.end,i.clickbtn,false);c.fireEvent(j.attr("cid"),"init")};i.$on(h.cid+"_handleEvent",function(m,n,l,k){if(i.eventMap[n]){i.eventMap[n](l);if(null!=k){k.resolve()}}});i.eventMap.hidetxt=i.hideTxt;i.eventMap.showtxt=i.showTxt}],link:function(d,b,a,c){d.pageID=c.pageID;d.cid=a.cid;d.componentType="fbtn";d.init()}}}]);
uiCore.directive('packageactivity', [function() {
    return {
        restrict: 'AE',
        replace: true,
        require: '^pid',
        template: '<div>' + '<div class="c60_fbar_packageactivity" >' + '<div class="c60_fbar_pkgact_result_con" ng-style="gettaocan_result_conStyle()">' + '<div class="c60_fbar_succ_img_con"><img class="c60_fbar_succ_img"  ng-src="{{taocanresulturl()}}"/></div>' + '<div class="c60_fbar_tips_txt" ng-bind="taocanresulttips()"></div>' + '<div class="c60_fbar_result_btn" ccid="c60_fbar_link_btn"><a class="c60_fbar_link_btn" ng-bind="taocanresulttxt()" ng-click="returnclick()"></a></div>' + '</div>' + '<div class="c60_fbar_tc_activity_con">' + '<div class="c60_fbar_pwrapper"><div style="width:100%;height:100%;position:relative">' + '<ul simplescroll>' + '<li ng-repeat="package in respData.packages" ccid="c60_fbar_icon_click" ng-click="iconClick($index);$event.stopPropagation();">' + '<div class="c60_fbar_taocan_type_list">' + '<div class="c60_fbar_type_name c60_fbar_clearfloat">' + '<div class="c60_fbar_name">{{package.packageName}}（<span class="c60_fbar_txt_orange">{{package.packagePrice}}</span>{{package.priceUnit}}）</div>' + '<div class="c60_fbar_arrow_btn">' + '<span class="c60_fbar_arrow_right" ng-style="getIconStyle($index)"></span>' + '<span class="c60_fbar_buy_btn" ccid="c60_fbar_buy_btn" ng-click="popDown($index);$event.stopPropagation();" ng-style="getBtnStyle($index)" ng-bind = "compData.JS.bookbtntext"></span>' + '	</div>' + '</div>' + '<div class="c60_fbar_type_txt" ng-style="getOptionStyle($index)" ng-bind-html="to_trusted(package.packageDesc)"></div>' + '</div>' + '</li></ul></div>' + '</div>' + '<div class="c60_fbar_activity_tips">' + '<div class="c60_fbar_activity_tips_tit" ng-bind = "compData.JS.activitytipstext"></div>' + '  <div class="c60_fbar_activity_tips_txt">{{activityDesc}}</div>' + '<div>' + '</div>' + '</div>' + '<div ng-class="{\'c60_fbar_mbg_pop_block\':true}"  ng-click="$event.stopPropagation();" ng-show="flag"></div>' + '<div ng-class="{\'c60_fbar_mpop_block\':true}"  ng-show="flag">' + '<div ng-class="{\'c60_fbar_img_txt_info\':true}">' + '<table cellpadding="0" cellspacing="0" ng-class="{\'c60_fbar_img_txt_table\':true}">' + '<tr>' + '<td><span ng-class="{\'c60_fbar_haveatea\':true}" ng-style="popBlock(\'ico\')"></span></td>' + '<td>' + '<div ng-class="{\'c60_fbar_pop_txt1\':true}" ng-bind="recedata.phoneNo"></div>' + '<div ng-class="{\'c60_fbar_pop_txt1\':true}">确认订购<span ng-class="{\'c60_fbar_txt_green\':true}" ng-style="popBlock(\'packagename\')" ng-bind="packageName"></span>？</div>' + '<div ng-class="{\'c60_fbar_pop_txt1\':true}" ng-show="effectiveWayFlag==1?true:false"><span ng-class="{\'c60_fbar_sx_txt_out\':true}" >本套餐</span>' + '<span ng-class="{\'c60_fbar_sx_time\':true}"><span ng-class="{\'c60_fbar_sx_month c60_fbar_br_circle_left\':true}" ng-style="effectiveLeftRight(1)" ccid="c60_fbar_pkgact_effective1" ng-click="checkEffectiveClick(1);$event.stopPropagation();" ng-bind="recedata.effectiveWay0"></span>' + '<span ng-class="{\'c60_fbar_sx_month c60_fbar_br_circle_right\':true}" ng-style="effectiveLeftRight(2)" ccid="c60_fbar_pkgact_effective2" ng-click="checkEffectiveClick(2);$event.stopPropagation();" ng-bind="recedata.effectiveWay1"></span></span></div>' + '<div ng-class="{\'c60_fbar_txt1\':true}" ng-show="effectiveWayFlag==0?true:false">本套餐<span ng-bind="recedata.effectiveWay"></span></div></div>' + '</td>' + '</tr>' + '</table>' + '</div>' + '<div ng-class="{\'c60_fbar_img_txt_btn2\':true}">' + '<div ng-class="{\'c60_fbar_left_itbtn\':true}" ccid="c60_fbar_left_itbtn" ng-style="popBlock(\'cancel\')" ng-click="popBlockHide();$event.stopPropagation();">不了，谢谢</div>' + '<div ng-class="{\'c60_fbar_right_itbtn\':true}" ccid="c60_fbar_right_itbtn" ng-style="popBlock(\'submit\')"  ccid="c60_fbar_pkgact_btn" ng-click="popSubmit()">是的，确认</div>' + '</div>' + '</div>' + '</div>',
        scope: {},
        controller: ["$scope", "$element", "$attrs", 'coreService', 'coreUtils',
            'Const',
            function($scope, $element, $attrs, coreService, coreUtils, Const) {
                $scope.cid = $attrs.cid;
                $scope.compData = {};
                $scope.flag = false;
                $scope.eventMap = {};
                $scope.to_trusted = function(text) {
                	return coreUtils.getTrustedHtml(text);
                };
                $scope.popDown = function(index) {
                    $scope.obj = $scope.respData.packages[index];
                    $scope.packageName = "【" + $scope.obj.packageName + "】";
                    coreService.fireEvent($element.attr('cid'), $attrs['event'] || 'click0', {
                        "id": $scope.obj.packageID
                    });
                    coreUtils.recordTracingCdr($scope.pageID, $scope.obj.packageID, $scope.compData.JS.c60_fbar_buy_btn.JS.cdrConfig);
                };
                $scope.popBlock = function(type) {
                    if (type != null && type != undefined) {
                        if (type == 'ico') {
                            return $scope.compData.JS.popblockconfig.JS.icoconfig;
                        } else if (type == 'packagename') {
                            return $scope.compData.JS.popblockconfig.JS.packagenameconfig;
                        } else if (type == 'cancel') {
                            return $scope.compData.JS.popblockconfig.JS.btnconfig.state0;
                        } else if (type == 'submit') {
                            return $scope.compData.JS.popblockconfig.JS.btnconfig.state1;
                        }
                    }
                };
                $scope.effectiveLeftRight = function(no) {
                    if (no != null && no != undefined) {
                        if (no == 1) {
                            if ($scope.effectiveLeftRightFlag == 1) {
                                return $scope.compData.JS.popblockconfig.JS.effectivewayconfig.state0;
                            } else {
                                return $scope.compData.JS.popblockconfig.JS.effectivewayconfig.state1;
                            }
                        } else {
                            if ($scope.effectiveLeftRightFlag == 0) {
                                return $scope.compData.JS.popblockconfig.JS.effectivewayconfig.state0;
                            } else {
                                return $scope.compData.JS.popblockconfig.JS.effectivewayconfig.state1;
                            }
                        }
                    }
                };
                $scope.checkEffectiveClick = function(no) {
                    if (no != null && no != undefined) {
                        if (no == 1) {
                            $scope.effectiveLeftRightFlag = 1;
                            $scope.flowUpshiftFlag = '0';
                            coreUtils.recordTracingCdr($scope.pageID, $scope.pageID+"_"+'effectway_0', $scope.compData.JS.c60_fbar_pkgact_effective1.JS.cdrConfig);
                        } else {
                            $scope.effectiveLeftRightFlag = 0;
                            $scope.flowUpshiftFlag = '1';
                            coreUtils.recordTracingCdr($scope.pageID, $scope.pageID+"_"+'effectway_1', $scope.compData.JS.c60_fbar_pkgact_effective2.JS.cdrConfig);
                        }
                    }
                };

                $scope.getInfo = function(param) {
                    if (param != null && param != undefined) {
                        $scope.recedata = param.respparam;
                        if ($scope.recedata.packageId != null && $scope.recedata.packageId != undefined && $scope.recedata.effectiveWay != null && $scope.recedata.effectiveWay != undefined) {
                            var temp = {};
                            temp.phoneNo = $scope.recedata.msisdn.replace($scope.recedata.msisdn.substr($scope.recedata.msisdn.length == 11 ? 3 : 4, 4), "****") + '，您好';
                            if ($scope.recedata.effectiveWay == 0) {
                                temp.effectiveWay = $scope.compData.JS.packageeffectstate.JS.stateconfig[0].value;
                                $scope.effectiveWayFlag = 0;
                                $scope.flowUpshiftFlag = $scope.recedata.effectiveWay;
                            } else if ($scope.recedata.effectiveWay == 1) {
                                temp.effectiveWay = $scope.compData.JS.packageeffectstate.JS.stateconfig[1].value;
                                $scope.effectiveWayFlag = 0;
                                $scope.flowUpshiftFlag = $scope.recedata.effectiveWay;
                            } else if ($scope.recedata.effectiveWay == 2) {
                                temp.effectiveWay0 = $scope.compData.JS.packageeffectstate.JS.stateconfig[0].value;
                                temp.effectiveWay1 = $scope.compData.JS.packageeffectstate.JS.stateconfig[1].value;
                                $scope.effectiveWayFlag = 1;
                                $scope.flowUpshiftFlag = '1';
                            } else if ($scope.recedata.effectiveWay == 4) {
                                temp.effectiveWay = $scope.compData.JS.packageeffectstate.JS.stateconfig[4].value;
                                $scope.effectiveWayFlag = 0;
                                $scope.flowUpshiftFlag = $scope.recedata.effectiveWay;
                            } else {
                                coreService.fireEvent($element.attr('cid'), $attrs['event'] || 'updaterror', {
                                    "errorcode": $scope.compData.JS.errorcode
                                });
                                return false;
                            }
                            $scope.recedata = temp;
                            $scope.flag = 1;
                            angular.element($element[0].querySelector('.c60_fbar_mbg_pop_block')).css({
                                'z-index': '4444443647888'
                            });
                            angular.element($element[0].querySelector('.c60_fbar_mpop_block')).css({
                                'z-index': '4444443647889'
                            });
                            $scope.effectiveLeftRightFlag = 0;
                        } else {
                            coreService.fireEvent($element.attr('cid'), $attrs['event'] || 'updaterror', {
                                "errorcode": $scope.compData.JS.errorcode
                            });
                        }
                    } else {
                        coreService.fireEvent($element.attr('cid'), $attrs['event'] || 'updaterror', {
                            "errorcode": $scope.compData.JS.errorcode
                        });
                    }
                };

                $scope.popBlockHide = function() {
                    $scope.flag = false;
                    coreUtils.recordTracingCdr($scope.pageID,coreUtils.createCdrid($scope.pageID,'','cancelbtn'), $scope.compData.JS.c60_fbar_left_itbtn.JS.cdrConfig);
                    top.tlbs.cdrData = null;
                };
                $scope.popSubmit = function() {
                    var inputData = {
                        "id": $scope.obj.packageID,
                        "flowUpshiftFlag": $scope.flowUpshiftFlag,
                        "saleid": $scope.obj.saleID,
                        "epageId": top.tlbs.ordersrc
                    };
                    if (null != top.tlbs.cdrData) {
                        inputData['epageId'] = top.tlbs.cdrData.pageId || '';
                    }
                    coreService.fireEvent($element.attr('cid'), $attrs['event'] || 'click1', inputData);
                    $scope.flag = false;
                    coreUtils.recordTracingCdr($scope.pageID, coreUtils.createCdrid($scope.pageID,'','submitbtn'), $scope.compData.JS.c60_fbar_pkgact_btn.JS.cdrConfig);
                    top.tlbs.cdrData = null;
                }
                $scope.iconClick = function(item) {
                    $scope.compData.JS.native.JS.index = item;
                    coreUtils.recordTracingCdr($scope.pageID, coreUtils.createCdrid($scope.pageID,'','recordbtn'), $scope.compData.JS.c60_fbar_icon_click.JS.cdrConfig);
                };

                $scope.getBtnStyle = function(index) {
                    if (index == $scope.compData.JS.native.JS.index) {
                        return $scope.compData.JS.native.JS.btn.statusconfig.state0;
                    } else {
                        return $scope.compData.JS.native.JS.btn.statusconfig.state;
                    }
                };

                $scope.getIconStyle = function(index) {
                    if (index == $scope.compData.JS.native.JS.index) {
                        return $scope.compData.JS.native.JS.icon.statusconfig.state;
                    } else {
                        return $scope.compData.JS.native.JS.icon.statusconfig.state0;
                    }
                };
                $scope.getOptionStyle = function(index) {
                    if (index == $scope.compData.JS.native.JS.index) {
                        return $scope.compData.JS.native.JS.option.statusconfig.state0;
                    } else {
                        return $scope.compData.JS.native.JS.option.statusconfig.state;
                    }
                };
                $scope.updateData = function(param) {
                    $scope.respData = param.respparam;
                    if ($scope.respData && $scope.respData.packages && $scope.respData.packages.length > 0) {
                        $scope.showSuccess();
                    } else {
                        $scope.showError();
                        return false;
                    }
                };
                $scope.showError = function() {
                    $scope.compData.JS.c60_fbar_pkgact_result_con.JS.showconfig.status = 1;
                    angular.element($element[0].querySelector('.c60_fbar_pwrapper')).css({
                        'display': 'none'
                    });
                    angular.element($element[0].querySelector('.c60_fbar_activity_tips')).css({
                        "background-color": "#fff"
                    });
                    angular.element($element[0].querySelector('.c60_fbar_activity_tips_tit')).css({
                        'display': 'none'
                    });
                    angular.element($element[0].querySelector('.c60_fbar_activity_tips_txt')).css({
                        'display': 'none'
                    });
                    coreService.fireEvent($element.attr('cid'), 'showerror');
                };
                $scope.showSuccess = function() {
                    $scope.compData.JS.c60_fbar_pkgact_result_con.JS.showconfig.status = 0;
                    coreService.fireEvent($element.attr('cid'), 'showsucc');
                };
                $scope.gettaocan_result_conStyle = function() {
                    if ($scope.compData.JS && $scope.compData.JS.c60_fbar_pkgact_result_con) {
                        if ($scope.compData.JS.c60_fbar_pkgact_result_con.JS.showconfig.status == 0) {
                            return $scope.compData.JS.c60_fbar_pkgact_result_con.JS.showconfig.status0;
                        } else {
                            return $scope.compData.JS.c60_fbar_pkgact_result_con.JS.showconfig.status1;
                        }
                    }
                };
                $scope.taocanresulturl = function() {
                    if ($scope.compData.JS != null && $scope.compData.JS != undefined && $scope.compData.JS.c60_fbar_pkgact_result_con) {
                        var status = 'status' + $scope.compData.JS.c60_fbar_pkgact_result_con.JS.statusconfig.status;
                        var imgUrl = $scope.compData.JS.c60_fbar_pkgact_result_con.JS.statusconfig[status].imgUrl;
                        return imgUrl.replace(/'/g, '');
                    }
                };
                $scope.taocanresulttxt = function() {
                    if ($scope.compData.JS && $scope.compData.JS.c60_fbar_pkgact_result_con) {
                        var status = 'status' + $scope.compData.JS.c60_fbar_pkgact_result_con.JS.statusconfig.status;
                        var btntxt = $scope.compData.JS.c60_fbar_pkgact_result_con.JS.statusconfig[status].btntxt;
                        return btntxt;
                    }
                };
                $scope.taocanresulttips = function() {
                    if ($scope.compData.JS && $scope.compData.JS.c60_fbar_pkgact_result_con) {
                        var status = 'status' + $scope.compData.JS.c60_fbar_pkgact_result_con.JS.statusconfig.status;
                        var tipstxt = $scope.compData.JS.c60_fbar_pkgact_result_con.JS.statusconfig[status].tipstxt;
                        return tipstxt;
                    }
                };
                $scope.returnclick = function() {
                	coreUtils.recordTracingCdr($scope.pageID,coreUtils.createCdrid($scope.pageID,'','goFirstPage'), $scope.compData.JS.c60_fbar_link_btn.JS.cdrConfig);
                    coreService.fireEvent($element.attr('cid'), $attrs['event'] || 'goFirstPage');
                };
                $scope.init = function() {
                    coreService.registerComponentInstance($element.attr('cid'), $scope);
                    var properties = coreService.getInitProperties($attrs['cid']) || {};
                    $scope.compData.css = properties.CSS || {};
                    $scope.compData.JS = properties.JS || {};
                    $element.css(properties.CSS);
                    $scope.activityDesc = $scope.compData.JS.activityDesc;
                };
                $scope.initPage = function() {
                    coreService.fireEvent($element.attr('cid'), 'init', {
                        "activityID": $scope.compData.JS.activityID
                    });
                };
                $scope.error = function() {
                	 $scope.showError();
                };
                $scope.$on($attrs['cid'] + '_handleEvent', function(event, cevent, args, deferred) {
                    if ($scope.eventMap[cevent]) {
                        $scope.eventMap[cevent](args);
                        if (null != deferred) {
                            deferred.resolve();
                        }
                    }
                });

                $scope.eventMap['update'] = $scope.updateData;
                $scope.eventMap['getInfo'] = $scope.getInfo;
                $scope.eventMap['initPage'] = $scope.initPage;
                $scope.eventMap['error'] = $scope.error;
            }
        ],
        link: function($scope, $element, $attrs, ctl) {
            $scope.pageID = ctl.pageID;
            $scope.componentType = 'packageactivity';
            $scope.init();
        }
    }
}]);
uiCore.directive("redenvsrecordinfo",[function(){return{restrict:"AE",require:"^pid",replace:true,template:"<div class = 'c60_fbar_redenvsrecordinfo_infos' ><div class = 'c60_fbar_redenvsrecordinfo_container_top' ng-style = 'compData.CSS'><div class = 'c60_fbar_redenvsrecordinfo_container_top_img' ng-show = 'compData.JS.pageTypeConfig.common.top_banner_image_show' ng-style='compData.JS.pageTypeConfig.common.c60_fbar_redenvsrecordinfo_container_top_img'></div><div class = 'c60_fbar_redenvsrecordinfo_container_top_tips' ng-style = 'compData.JS.pageTypeConfig.common.c60_fbar_redenvsrecordinfo_container_top_tips'><span class ='c60_fbar_redenvsrecordinfo_container_top_tips_info' ng-bind-html = 'getTopContainerTips(compData.JS.pageTypeConfig.common.topbanner_main_tips_text,temp.totalcount||0,totalcoins||0)' ></span></div><div class = 'c60_fbar_redenvsrecordinfo_container_top_tips_dated'   ng-show = 'compData.JS.pageTypeConfig.common.top_banner_other_tips_show'  ng-if = '2==pageType' ng-bind='otherTips' ></div><div class = 'c60_fbar_redenvsrecordinfo_container_top_tips_copy'  ng-show = 'compData.JS.pageTypeConfig.common.top_banner_other_tips_show'  ng-if = '1==pageType'><span ng-bind = 'otherTips'> </span><p ng-bind = 'accessURL'></p></div></div><div class = 'c60_fbar_redenvsrecordinfo_middle_tips'><span class = 'c60_fbar_redenvsrecordinfo_middle_tips_one' ng-bind = 'getMiddleTips(compData.JS.pageTypeConfig.common.redenvs_grabed_info_text, temp.grabedcounts||0, temp.totalcount ||0,compData.middleTipsRedenvelopeStatus[pageType])'></span></div><div class = 'c60_fbar_redenvsredcordinfo_container_bottom'><div class = 'c60_fbar_redenvsredcordinfo_container_bottom_info' simplescroll><div class = 'c60_fbar_redenvsrecordinfo_iteminfo' ng-repeat = 'item in redenvsitems track by item.id' ><div class = 'c60_fbar_redenvsrecordinfo_iteminfo_img' ng-style = 'compData.JS.pageTypeConfig.common.c60_fbar_redenvsrecordinfo_iteminfo_img.CSS'></div><div class = 'c60_fbar_redenvsrecordinfo_iteminfo_info1' ><div class ='c60_fbar_redenvsrecordinfo_iteminfo_info1_type' ng-bind='item.account' ></div><div class ='c60_fbar_redenvsrecordinfo_iteminfo_info1_grabtime' ng-bind='changeFormatTime(item.grabTime)' ></div></div><div class = 'c60_fbar_redenvsrecordinfo_iteminfo_info2' ><span class = 'c60_fbar_redenvsrecordinfo_iteminfo_info2_coinmount' ng-bind='item.amount+compData.JS.pageTypeConfig.common.coinunit_text'></span></div><div class='c60_fbar_redenvsrecordinfo_iteminfo_clear'></div></div><div class = 'c60_fbar_redenvsrecordinfo_moredata' ng-disable = 'btndisable' ng-click = '!btndisable&&queryMoreData({type:1})' ng-bind = 'queryMoreBtnInfo'></div></div></div></div>",scope:{},controller:["$scope","$element","$attrs","coreService","coreUtils","Const","$timeout",function(h,i,g,b,d,a,c){h.eventMap={};h.compData={CSS:{},JS:{}};var f=1;h.redenvsitems=[];var e={"0":"Finished","1":"Unfinished","2":"Dated"};h.middleTips="";h.init=function(){b.registerComponentInstance(i.attr("cid"),h);var j=b.getInitProperties(g.cid);h.compData.CSS=j.CSS||{};h.compData.JS=j.JS||{};h.compData.middleTipsRedenvelopeStatus={"0":h.compData.JS.pageTypeConfig.common.redEnvsStatus_text,"1":h.compData.JS.pageTypeConfig.common.redEnvsUnfinishtext,"2":h.compData.JS.pageTypeConfig.common.redEnvsDatedtext};h.queryMoreBtnInfo=h.compData.JS.pageTypeConfig.common.moredatatext};h.initPageInfo=function(j){if(1!==f&&"0"!==j.respparam.result){angular.element(i[0].querySelector(".c60_fbar_redenvsrecordinfo_moredata")).css({color:"#eee"});h.btndisable=true;h.queryMoreBtnInfo=h.compData.JS.pageTypeConfig.common.errotext;return}if(j.respparam&&"0"===j.respparam.result){h.temp=j.respparam;h.redenvsitems=h.redenvsitems.concat(j.respparam.userRedEnvelop);if(h.oldGrabedAmount<=h.temp.grabedcounts){if("2"!==h.pageType&&h.temp.totalcount===h.temp.grabedcounts){h.pageType="0";b.fireEvent(g.cid,"updateTitleText",{stitle:"已领完红包"})}b.fireEvent(g.cid,"updateSurveyUnfinishRedEnvs",{index:h.index,grabedcounts:h.temp.grabedcounts,pageType:h.pageType})}if("1"===h.pageType){h.otherTips=h.compData.JS.pageTypeConfig.common.copyUrl_text}else{if("2"===h.pageType){h.otherTips=d.mergeParameter4String(h.compData.JS.pageTypeConfig.common.thisRedEnvs_text,h.outTime.substring(0,10))}}if("0"===h.temp.moredatas){angular.element(i[0].querySelector(".c60_fbar_redenvsrecordinfo_moredata")).css({color:"#eee"});h.btndisable=true}}else{b.fireEvent(g.cid,"error",{errorcode:j.respparam.result||"1"})}};h.getTopContainerTips=function(m,l,k){var j=m;j=d.mergeParameter4Html(j,l,k);return j};h.changeFormatTime=function(j){if(j&&j.length===19){return j.substring(0,10)}};h.getMiddleTips=function(l,k,m,n){var j=l;j=d.mergeParameter4String(j,k,m,n);if(h.compData.JS.pageTypeConfig.common.middle_tips_return_coin_time_show){j=j+"  "+h.compData.JS.pageTypeConfig.common.middle_tips_return_coin_time_text}return j};h.getDataFromRedEnvsRcordPage=function(k){h.totalcoins=k.totalcoins;h.oldGrabedAmount=k.usedcount;h.pageType=k.pageType;h.accessURL=k.accessURL;h.index=k.index;h.outTime=k.outTime;h.redEnvelopID=k.redEnvelopID;h.totalcount=k.totalcount;var j="status"+e[h.pageType];h.compData.JS.pageTypeConfig.common=d.extendDeep(h.compData.JS.pageTypeConfig.common,h.compData.JS.pageTypeConfig[j])};h.queryMoreData=function(j){d.recordTracingCdr(h.pageID,g.cid+"_moredata",h.compData.JS.queryMoreRedenvsRecord.cdrConfig);if("0"===j.type){f=1;h.redenvsitems=[]}else{f++}b.fireEvent(g.cid,"queryusersingleredenv",{pageNum:h.compData.JS.pageTypeConfig.common.pageNum,pageID:f,redEnvelopID:h.redEnvelopID,totalcount:h.totalcount})};h.eventMap.initPageInfo=h.initPageInfo;h.eventMap.getDataFromRedEnvsRcordPage=h.getDataFromRedEnvsRcordPage;h.eventMap.queryMoreData=h.queryMoreData;h.$on(g.cid+"_handleEvent",function(l,m,k,j){if(h.eventMap[m]){h.eventMap[m](k);if(null!==j){j.resolve()}}})}],link:function(d,b,a,c){d.pageID=c.pageID;d.componentType="redenvsrecordinfo";d.init()}}}]);
uiCore.directive("iframeholder",["coreService","coreUtils",function(b,a){return{restrict:"AE",replace:true,transclude:true,template:'<div><iframe id="ciframe"></iframe></div>',scope:{},require:"^pid",controller:["$scope","$element","$attrs",function(e,d,c){e.cid=c.cid;e.eventMap={};e.compData={CSS:{width:"100%",height:"100%",position:"relative"},JS:{clickable:false,animation:false,clickevent:"",stateconfig:{state:0,state0:{},state1:{}},iframecfg:{CSS:{border:"0",position:"absolute",top:"0",left:"0",width:"100%",height:"100%",},JS:{preload:true,iframeUrl:""}}}};e.extendComponentData=function(f){e.compData=a.extendDeep(e.compData,f)};e.init=function(){b.registerComponentInstance(e.cid,e);e.extendComponentData(b.getInitProperties(e.cid));e.customIframe=angular.element(d[0].querySelector('[id="ciframe"]'));e.processStyle();e.processConfig()};e.processStyle=function(){d.css(e.compData.CSS);e.customIframe.css(e.compData.JS.iframecfg.CSS)};e.processConfig=function(){if(e.compData.JS.iframecfg.JS.preload){e.customIframe.removeAttr("src");e.customIframe.attr("src",e.compData.JS.iframecfg.JS.iframeUrl)}};e.receive=function(g,f){e.customIframe.removeAttr("src");e.customIframe.attr("src",g.url);if(null!=f){f.resolve()}};e.loadFrame=function(g,f){e.customIframe.removeAttr("src");e.customIframe.attr("src",e.compData.JS.iframecfg.JS.iframeUrl);if(null!=f){f.resolve()}};e.unloadFrame=function(g,f){e.customIframe.removeAttr("src");if(null!=f){f.resolve()}};e.updateFrameURL=function(g,f){e.compData.JS.iframecfg.JS.iframeUrl=g.iframeUrl||"";if(null!=f){f.resolve()}};e.eventMap.receive=e.receive;e.eventMap.loadFrame=e.loadFrame;e.eventMap.unloadFrame=e.unloadFrame;e.eventMap.updateFrameURL=e.updateFrameURL;e.$on(e.cid+"_handleEvent",function(i,g,h,f){e.eventMap[g](h,f)})}],link:function(e,d,c,f){e.pageID=f.pageID;e.componentType="iframeholder";e.init()}}}]);
uiCore.directive("msgbox",function(){return{restrict:"EA",replace:true,require:"^pid",template:'<div class="tbholder" style="display:block">   <div class="c60_fbar_bg_black_pop" ng-style="getbg_black_popStyle()">   <div class="c60_fbar_tips_txt" style="color:white;margin-top:0" ng-bind="compData.JS.bg_black_pop.JS.text"></div>   </div><div class="c60_fbar_bg_pop_block" ng-style="getbg_pop_blockStyle()" ng-click="$event.stopPropagation();"></div><div class="c60_fbar_pop_block"  ng-style="getpop_blockStyle()">	<div class="c60_fbar_img_txt_info">    	<table cellpadding="0" cellspacing="0" class="c60_fbar_img_txt_table">        	<tr>            	<td><span class="c60_fbar_haveatea"></span></td>                <td>                	<div class="c60_fbar_txt"><span ng-bind="phoneFilter(phoneNumber)"></span><span ng-bind="compData.JS.c60_fbar_pop_block_text.JS.text1"></span></div>                	<div class="c60_fbar_txt"><span ng-bind="compData.JS.c60_fbar_pop_block_text.JS.text2"></span></div>                	<div class="c60_fbar_txt"><span ng-bind="compData.JS.c60_fbar_pop_block_text.JS.text3"></span></div>                </td>            </tr>        </table>    </div>    <div class="c60_fbar_img_txt_btn clearfloat">        <div class="c60_fbar_left_itbtn" ng-click="click(\'c60_fbar_left_itbtn\');" ng-bind="compData.JS.c60_fbar_left_itbtn.JS.text"></div>        <div class="c60_fbar_right_itbtn" ng-click="click(\'c60_fbar_right_itbtn\');" ng-bind="compData.JS.c60_fbar_right_itbtn.JS.text"></div>    </div></div>	<div class="c60_fbar_news_center_df" ng-bind="c60_fbar_news_center_dfText()" ng-click="click(\'c60_fbar_news_center_df\');$event.stopPropagation();"></div>    <div class="c60_fbar_news_center">    	<ul class="c60_fbar_nc_tabtit c60_fbar_clearfloat">        	<li ng-style="c60_fbar_nc_tabtitStyle(0)" ng-click="click(\'c60_fbar_nc_tabtit0\')"><span ng-bind="compData.JS.c60_fbar_nc_tabtit.JS.text0"></span><span ng-show="c60_fbar_nc_tabtitNum(0)"><span ng-bind="compData.JS.c60_fbar_nc_tabtit0span.JS.text0"></span><span ng-bind="compData.JS.c60_fbar_ncc_list.JS.unread0"></span><span ng-bind="compData.JS.c60_fbar_nc_tabtit0span.JS.text1"></span></span></li>          <li ng-style="c60_fbar_nc_tabtitStyle(1)" ng-click="click(\'c60_fbar_nc_tabtit1\')"><span ng-bind="compData.JS.c60_fbar_nc_tabtit.JS.text1"></span><span ng-show="c60_fbar_nc_tabtitNum(1)"><span ng-bind="compData.JS.c60_fbar_nc_tabtit1span.JS.text0"></span><span ng-bind="compData.JS.c60_fbar_ncc_list.JS.unread1"></span><span ng-bind="compData.JS.c60_fbar_nc_tabtit1span.JS.text1"></span></span></li>      </ul>      <div class="c60_fbar_msg_conlist" ng-style="c60_fbar_nc_conStyle(0)">        <div class="c60_fbar_nc_con c60_fbar_nc_container1" simplescroll>        	<div class="c60_fbar_ncc_list" ng-style="c60_fbar_ncc_listStyle0(item.status)" ng-repeat="item in respData[0].list" ng-click="c60_fbar_ncc_lb_icoClick0($index);$event.stopPropagation();">            	<div class="c60_fbar_ncc_list_top">                	<div class="c60_fbar_ncc_lt_tit c60_fbar_clearfloat">                    	<span class="c60_fbar_ncc_lt_title" ng-bind="getTitleType(item.category)"></span>                        <a class="c60_fbar_ncc_lt_looktxt" ng-click="c60_fbar_ncc_listClick0($index);$event.stopPropagation();" ng-bind="compData.JS.c60_fbar_ncc_lt_looktxt.JS.text"></a>                    </div>                    <div class="c60_fbar_ncc_lt_detailtxt" ng-bind-html="to_trusted(item.subject)"></div>                </div>                <div class="c60_fbar_ncc_list_bottom c60_fbar_clearfloat">                	  <span class="c60_fbar_ncc_lb_time" ng-bind="formatTime(item.date)"></span>                    <span class="c60_fbar_ncc_lb_ico_gray" ng-style="c60_fbar_ncc_lb_icoStyle(item.id)" ng-show="compData.JS.c60_fbar_ncc_list.JS.show" ></span>                </div>            </div>            <div class="c60_fbar_ncc_more0" ng-style="c60_fbar_ncc_moreStyle0();" ng-bind="compData.JS.c60_fbar_ncc_more0.JS.text" ng-click="click(\'c60_fbar_ncc_more0\')"></div>            <div class="c60_fbar_ncc_nomore0" ><span class="c60_fbar_ncc_nomore_icotxt" ng-bind="compData.JS.c60_fbar_ncc_nomore0.JS.text">no more...</span></div>        </div>        <div class="c60_fbar_news_center_del" ng-show="compData.JS.c60_fbar_news_center_del.JS.show">            <div class="c60_fbar_news_center_delbtn" ng-style="c60_fbar_news_center_delbtnStyle()" ng-click="click(\'c60_fbar_news_center_del\')" ng-bind="compData.JS.c60_fbar_news_center_del.JS.text"></div>            <span class="c60_fbar_ncc_lb_ico_gray_all" ng-style="c60_fbar_ncc_lb_ico_gray_allStyle()" ng-click="c60_fbar_ncc_lb_ico_gray_allClick();$event.stopPropagation();"></span>        </div>       </div>      <div class="c60_fbar_msg_conlist" ng-style="c60_fbar_nc_conStyle(1)" >        <div class="c60_fbar_nc_con c60_fbar_nc_container2" simplescroll>        	<div class="c60_fbar_ncc_list" ng-click="c60_fbar_ncc_listClick1($index)" ng-style="c60_fbar_ncc_listStyle1(item.status)" ng-repeat="item in respData[1].list">            	<div class="c60_fbar_ncc_list_top">                	<div class="c60_fbar_ncc_lt_tit c60_fbar_clearfloat">                    	<span class="c60_fbar_ncc_lt_title" ng-bind="getTitleType(item.category)"></span>                    </div>                    <div class="c60_fbar_ncc_lt_detailtxt" ng-bind-html="to_trusted(item.subject)"></div>                </div>                <div class="c60_fbar_ncc_list_bottom c60_fbar_clearfloat">                	  <span class="c60_fbar_ncc_lb_time" ng-bind="formatTime(item.date)"></span>                    <span class="c60_fbar_ncc_lb_ico_gray" ng-style="c60_fbar_ncc_lb_icoStyle(item.id)" ng-show="compData.JS.c60_fbar_ncc_list.JS.show"></span>                </div>            </div>            <div class="c60_fbar_ncc_more1" ng-style="c60_fbar_ncc_moreStyle1();" ng-bind="compData.JS.c60_fbar_ncc_more1.JS.text" ng-click="click(\'c60_fbar_ncc_more1\')"></div>            <div class="c60_fbar_ncc_nomore1" ><span class="c60_fbar_ncc_nomore_icotxt" ng-bind="compData.JS.c60_fbar_ncc_nomore1.JS.text">no more...</span></div>        </div>        <div class="c60_fbar_news_center_del" ng-show="compData.JS.c60_fbar_news_center_del.JS.show">            <div class="c60_fbar_news_center_delbtn" ng-style="c60_fbar_news_center_delbtnStyle()" ng-click="click(\'c60_fbar_news_center_del\')" ng-bind="compData.JS.c60_fbar_news_center_del.JS.text"></div>            <span class="c60_fbar_ncc_lb_ico_gray_all" ng-style="c60_fbar_ncc_lb_ico_gray_allStyle()" ng-click="c60_fbar_ncc_lb_ico_gray_allClick();$event.stopPropagation();"></span>        </div>       </div></div>',scope:{},controller:["$scope","$element","$attrs","coreService","coreUtils","Const",function(d,c,b,f,a,g){d.cid=b.cid;d.eventMap={};d.respData={};d.phoneNumber="";d.compData={CSS:{},JS:{c60_formattime:{text1:"年",text2:"月",text3:"日 ",}}};d.to_trusted=function(i){return a.getTrustedHtml(i)};d.compData.JS.phoneconfig={prefix:"86",len:"13",maskbegin:"5",maskend:"9",commonlen:"11",commonbegin:"3",commonend:"7"};d.phoneFilter=function(m){if(m==undefined){return'<i style="visibility:hidden">&nbsp;</i>'}var l="";for(var k=parseInt(d.compData.JS.phoneconfig.maskbegin);k<parseInt(d.compData.JS.phoneconfig.maskend);k++){l=l+"*"}var j="";if(m.indexOf(d.compData.JS.phoneconfig.prefix)==0&&m.length==d.compData.JS.phoneconfig.len){j=m.substring(0,parseInt(d.compData.JS.phoneconfig.maskbegin))+l+m.substring(parseInt(d.compData.JS.phoneconfig.maskend))}else{if(m.length>=parseInt(d.compData.JS.phoneconfig.commonlen)){j=m.substring(0,parseInt(d.compData.JS.phoneconfig.commonbegin))+l+m.substring(parseInt(d.compData.JS.phoneconfig.commonend))}}return j};d.extendComponentData=function(i){d.compData=a.extendDeep(d.compData,i)};var h=function(){d.compData.JS.c60_fbar_news_center_df.JS.msgids=[];d.compData.JS.c60_fbar_news_center_df.JS.textconfig.index=0;d.compData.JS.c60_fbar_news_center_df.JS.index=0;d.compData.JS.c60_fbar_ncc_list.JS.listconfig.curIndex=0;d.compData.JS.c60_fbar_news_center_df.JS.del=false;d.compData.JS.moreDel="init";d.compData.JS.c60_fbar_ncc_list.JS.msgids=[];d.compData.JS.c60_fbar_ncc_list.JS.unread0=0;d.compData.JS.c60_fbar_ncc_list.JS.unread1=0;d.compData.JS.c60_fbar_news_center_df.JS.count=0;var j=angular.element(c[0].querySelector(".c60_fbar_nc_con"));var i="0";j.css("-webkit-transform","translate3d(0,"+i+"px,0)");j.css("-moz-transform","translate3d(0,"+i+"px,0)");j.css("-o-transform","translate3d(0,"+i+"px,0)");j.css("-ms-transform","translate3d(0,"+i+"px,0)");j.css("transform","translate3d(0,"+i+"px,0)");d.compData.JS.c60_fbar_ncc_list.JS.listconfig.curNum0=10;d.compData.JS.c60_fbar_ncc_list.JS.listconfig.curNum1=10;d.compData.JS.c60_fbar_ncc_list.JS.listconfig.lastcurNum0=10;d.compData.JS.c60_fbar_ncc_list.JS.listconfig.lastcurNum1=10;d.compData.JS.c60_fbar_ncc_list.JS.listconfig.lastgetNum0=0;d.compData.JS.c60_fbar_ncc_list.JS.listconfig.lastgetNum1=0};d.init=function(){f.registerComponentInstance(c.attr("cid"),d);d.extendComponentData(f.getInitProperties(d.cid)||{});c.css(d.compData.css||{});h();d.compData.JS.c60_fbar_ncc_list.JS.listconfig.moreindex=-1;d.compData.JS.c60_fbar_news_center_del.JS.show=false;angular.element(c[0].querySelector(".c60_fbar_ncc_nomore0")).css("display","none");angular.element(c[0].querySelector(".c60_fbar_ncc_more0")).css("display","none");angular.element(c[0].querySelector(".c60_fbar_ncc_nomore1")).css("display","none");angular.element(c[0].querySelector(".c60_fbar_ncc_more2")).css("display","none");d.compData.JS.delete0=0;d.compData.JS.delete1=0};d.formatTime=function(i){if(i&&i.length>=14){return i.substring(0,4)+" "+d.compData.JS.c60_formattime.text1+" "+i.substring(4,6)+" "+d.compData.JS.c60_formattime.text2+" "+i.substring(6,8)+" "+d.compData.JS.c60_formattime.text3+" "+i.substring(8,10)+":"+i.substring(10,12)}};d.c60_fbar_ncc_listStyle0=function(i){return d.compData.JS.c60_fbar_ncc_list.JS.stateconfig["state"+i]};d.c60_fbar_ncc_listStyle1=function(i){return d.compData.JS.c60_fbar_ncc_list.JS.stateconfig["state"+i]};d.c60_fbar_nc_tabtitStyle=function(i){if(Number(d.compData.JS.c60_fbar_ncc_list.JS.listconfig.curIndex)==Number(i)){return d.compData.JS.c60_fbar_nc_tabtit.JS.stateconfig.state0}else{return d.compData.JS.c60_fbar_nc_tabtit.JS.stateconfig.state1}};d.getbg_black_popStyle=function(){if(Number(d.compData.JS.bg_black_pop.JS.stateconfig.state)==1){return d.compData.JS.bg_black_pop.JS.stateconfig.state1}else{return d.compData.JS.bg_black_pop.JS.stateconfig.state0}};d.bg_black_popShow=function(i){d.compData.JS.bg_black_pop.JS.text=i;d.compData.JS.bg_black_pop.JS.stateconfig.state=1;angular.element(c[0].querySelector(".c60_fbar_bg_black_pop")).css({display:"block"});setTimeout(function(){d.compData.JS.bg_black_pop.JS.stateconfig.state=0;angular.element(c[0].querySelector(".c60_fbar_bg_black_pop")).css({display:"none"})},d.compData.JS.bg_black_pop.JS.stateconfig.time*1000)};d.c60_fbar_nc_conStyle=function(i){if(Number(d.compData.JS.c60_fbar_ncc_list.JS.listconfig.curIndex)==Number(i)){return{display:"block"}}else{return{display:"none"}}};d.getTitleType=function(i){return d.compData.JS.titleType.JS[i]};d.getbg_pop_blockStyle=function(){if(Number(d.compData.JS.bg_pop_block.JS.stateconfig.status)==0){return d.compData.JS.bg_pop_block.JS.stateconfig.status0}else{return d.compData.JS.bg_pop_block.JS.stateconfig.status1}};d.getpop_blockStyle=function(){if(Number(d.compData.JS.pop_block.JS.stateconfig.status)==0){return d.compData.JS.pop_block.JS.stateconfig.status0}else{return d.compData.JS.pop_block.JS.stateconfig.status1}};d.queryMessageListRecvd=function(k){if(k&&k.respparam){if(k.respparam.messages.length==0){d.respData={phoneNumber:k.respparam.phoneNumber,messages:[{type:"0",messagenumber:"0",unreadmessagenumber:"0",list:[]},{type:"1",messagenumber:"0",unreadmessagenumber:"0",list:[]}]}}else{if(k.respparam.messages.length==2){d.respData=k.respparam.messages;var j=angular.element(c[0].querySelector(".c60_fbar_nc_container1"));var i="0";j.css("-webkit-transform","translate3d(0,"+i+"px,0)");j.css("-moz-transform","translate3d(0,"+i+"px,0)");j.css("-o-transform","translate3d(0,"+i+"px,0)");j.css("-ms-transform","translate3d(0,"+i+"px,0)");j.css("transform","translate3d(0,"+i+"px,0)");j=angular.element(c[0].querySelector(".c60_fbar_nc_container2"));j.css("-webkit-transform","translate3d(0,"+i+"px,0)");j.css("-moz-transform","translate3d(0,"+i+"px,0)");j.css("-o-transform","translate3d(0,"+i+"px,0)");j.css("-ms-transform","translate3d(0,"+i+"px,0)");j.css("transform","translate3d(0,"+i+"px,0)")}}if(d.compData.JS.moreDel=="delete"){d.compData.JS.c60_fbar_news_center_df.JS.msgids=[];d.compData.JS.c60_fbar_news_center_df.JS.textconfig.index=0;d.compData.JS.moreDel="init";var j=angular.element(c[0].querySelector(".c60_fbar_nc_container1"));var i="0";j.css("-webkit-transform","translate3d(0,"+i+"px,0)");j.css("-moz-transform","translate3d(0,"+i+"px,0)");j.css("-o-transform","translate3d(0,"+i+"px,0)");j.css("-ms-transform","translate3d(0,"+i+"px,0)");j.css("transform","translate3d(0,"+i+"px,0)");j=angular.element(c[0].querySelector(".c60_fbar_nc_container2"));j.css("-webkit-transform","translate3d(0,"+i+"px,0)");j.css("-moz-transform","translate3d(0,"+i+"px,0)");j.css("-o-transform","translate3d(0,"+i+"px,0)");j.css("-ms-transform","translate3d(0,"+i+"px,0)");j.css("transform","translate3d(0,"+i+"px,0)");d.compData.JS.c60_fbar_ncc_list.JS.listconfig.curNum0=10;d.compData.JS.c60_fbar_ncc_list.JS.listconfig.curNum1=10;d.compData.JS.c60_fbar_ncc_list.JS.listconfig.lastcurNum0=10;d.compData.JS.c60_fbar_ncc_list.JS.listconfig.lastcurNum1=10;d.compData.JS.c60_fbar_ncc_list.JS.listconfig.lastgetNum0=0;d.compData.JS.c60_fbar_ncc_list.JS.listconfig.lastgetNum1=0}else{if(d.compData.JS.moreDel=="more0"){d.respData[0]=k.respparam.messages[0];d.compData.JS.c60_fbar_ncc_list.JS.listconfig.curNum0=d.compData.JS.c60_fbar_ncc_list.JS.listconfig.lastcurNum0;if((Number(d.compData.JS.c60_fbar_news_center_df.JS.textconfig.index)==1)&&((d.compData.JS.delete0)==1)){d.c60_fbar_ncc_lb_ico_gray_allClick("delmore")}d.compData.JS.moreDel="init"}else{if(d.compData.JS.moreDel=="more1"){d.respData[1]=k.respparam.messages[0];d.compData.JS.c60_fbar_ncc_list.JS.listconfig.curNum1=d.compData.JS.c60_fbar_ncc_list.JS.listconfig.lastcurNum1;if((Number(d.compData.JS.c60_fbar_news_center_df.JS.textconfig.index)==1)&&((d.compData.JS.delete1)==1)){d.c60_fbar_ncc_lb_ico_gray_allClick("delmore")}d.compData.JS.moreDel="init"}else{d.compData.JS.c60_fbar_news_center_df.JS.textconfig.index=0;d.compData.JS.c60_fbar_ncc_list.JS.show=false;d.compData.JS.c60_fbar_news_center_del.JS.show=false;d.compData.JS.c60_fbar_ncc_list.JS.listconfig.moreindex=-1}}}if(Number(d.compData.JS.c60_fbar_ncc_list.JS.listconfig.moreindex)==-1){h()}d.phoneNumber=k.respparam.phoneNumber;d.compData.JS.c60_fbar_ncc_list.JS.listconfig.lastgetNum0=d.respData[0].list.length;d.compData.JS.c60_fbar_ncc_list.JS.listconfig.lastgetNum1=d.respData[1].list.length;d.compData.JS.c60_fbar_ncc_list.JS.unread0=Number(d.respData[0].unreadmessagenumber);d.compData.JS.c60_fbar_ncc_list.JS.unread1=Number(d.respData[1].unreadmessagenumber)}};d.c60_fbar_nc_tabtitNum=function(i){if(i==0){if(Number(d.compData.JS.c60_fbar_ncc_list.JS.unread0)==0){return false}else{return true}}if(i==1){if(Number(d.compData.JS.c60_fbar_ncc_list.JS.unread1)==0){return false}else{return true}}};d.eventMap.queryMessageListRecvd=d.queryMessageListRecvd;d.c60_fbar_ncc_moreStyle0=function(){if(Number(d.compData.JS.c60_fbar_ncc_list.JS.listconfig.curIndex)==0){if(Number(d.compData.JS.c60_fbar_ncc_list.JS.listconfig.lastgetNum0)<10){angular.element(c[0].querySelector(".c60_fbar_ncc_nomore0")).css("display","block");angular.element(c[0].querySelector(".c60_fbar_ncc_more0")).css("display","none");return}if(d.compData.JS.c60_fbar_ncc_list.JS.listconfig.curNum0<=d.compData.JS.c60_fbar_ncc_list.JS.listconfig.lastgetNum0){angular.element(c[0].querySelector(".c60_fbar_ncc_nomore0")).css("display","none");angular.element(c[0].querySelector(".c60_fbar_ncc_more0")).css("display","block");return}else{angular.element(c[0].querySelector(".c60_fbar_ncc_nomore0")).css("display","block");angular.element(c[0].querySelector(".c60_fbar_ncc_more0")).css("display","none");return}}else{angular.element(c[0].querySelector(".c60_fbar_ncc_nomore0")).css("display","block");angular.element(c[0].querySelector(".c60_fbar_ncc_more0")).css("display","none");return}};d.c60_fbar_ncc_moreStyle1=function(){if(Number(d.compData.JS.c60_fbar_ncc_list.JS.listconfig.curIndex)==1){if(Number(d.compData.JS.c60_fbar_ncc_list.JS.listconfig.lastgetNum1)<10){angular.element(c[0].querySelector(".c60_fbar_ncc_nomore1")).css("display","block");angular.element(c[0].querySelector(".c60_fbar_ncc_more1")).css("display","none");return}if(d.compData.JS.c60_fbar_ncc_list.JS.listconfig.curNum1<=d.compData.JS.c60_fbar_ncc_list.JS.listconfig.lastgetNum1){angular.element(c[0].querySelector(".c60_fbar_ncc_nomore1")).css("display","none");angular.element(c[0].querySelector(".c60_fbar_ncc_more1")).css("display","block");return}else{angular.element(c[0].querySelector(".c60_fbar_ncc_nomore1")).css("display","block");angular.element(c[0].querySelector(".c60_fbar_ncc_more1")).css("display","none");return}}else{angular.element(c[0].querySelector(".c60_fbar_ncc_nomore1")).css("display","block");angular.element(c[0].querySelector(".c60_fbar_ncc_more1")).css("display","none");return}};d.c60_fbar_news_center_delbtnStyle=function(){if(Number(d.compData.JS.c60_fbar_news_center_df.JS.count)!=0){d.compData.JS.c60_fbar_news_center_del.JS.stateconfig.state="0"}else{d.compData.JS.c60_fbar_news_center_del.JS.stateconfig.state="1"}if(Number(d.compData.JS.c60_fbar_news_center_del.JS.stateconfig.state)=="0"){return d.compData.JS.c60_fbar_news_center_del.JS.stateconfig.state0}else{return d.compData.JS.c60_fbar_news_center_del.JS.stateconfig.state1}};d.c60_fbar_ncc_lb_icoStyle=function(i){if(d.compData.JS.c60_fbar_news_center_df.JS.msgids.length>0){if(d.compData.JS.c60_fbar_news_center_df.JS.msgids[i]==true){d.compData.JS.c60_fbar_ncc_lb_ico.JS.stateconfig.state=1}else{d.compData.JS.c60_fbar_ncc_lb_ico.JS.stateconfig.state=0}}else{d.compData.JS.c60_fbar_ncc_lb_ico.JS.stateconfig.state=0}if(Number(d.compData.JS.c60_fbar_ncc_lb_ico.JS.stateconfig.state)==0){return d.compData.JS.c60_fbar_ncc_lb_ico.JS.stateconfig.state0}else{return d.compData.JS.c60_fbar_ncc_lb_ico.JS.stateconfig.state1}};d.c60_fbar_ncc_lb_icoClick0=function(i){if(Number(d.compData.JS.c60_fbar_news_center_df.JS.textconfig.index)==0){return}var j=d.respData[0].list[i].id;a.recordTracingCdr(d.pageID,a.createCdrid(d.pageID,b.cid,"lbico0"),d.compData.JS.c60_fbar_ncc_lb_ico.JS.cdrConfig);if(d.compData.JS.c60_fbar_news_center_df.JS.msgids[j]!=true){d.compData.JS.c60_fbar_news_center_df.JS.msgids[j]=true;d.compData.JS.c60_fbar_news_center_df.JS.count++}else{d.compData.JS.c60_fbar_news_center_df.JS.msgids[j]=false;d.compData.JS.c60_fbar_news_center_df.JS.count--}};d.c60_fbar_ncc_lb_icoClick1=function(i){var j=d.respData[1].list[i].id;a.recordTracingCdr(d.pageID,a.createCdrid(d.pageID,b.cid,"lbico1"),d.compData.JS.c60_fbar_ncc_lb_ico.JS.cdrConfig);if(d.compData.JS.c60_fbar_news_center_df.JS.msgids[j]!=true){d.compData.JS.c60_fbar_news_center_df.JS.msgids[j]=true;d.compData.JS.c60_fbar_news_center_df.JS.count++}else{d.compData.JS.c60_fbar_news_center_df.JS.msgids[j]=false;d.compData.JS.c60_fbar_news_center_df.JS.count--}};d.c60_fbar_ncc_listClick0=function(i){var j=d.respData[0].list[i].id;if(Number(d.respData[0].list[i].status)==0){d.compData.JS.c60_fbar_ncc_list.JS.msgids[j]=true;if(d.compData.JS.c60_fbar_ncc_list.JS.unread0>0){d.compData.JS.c60_fbar_ncc_list.JS.unread0--}}d.respData[0].list[i].status="1";a.recordTracingCdr(d.pageID,a.createCdrid(d.pageID,b.cid,"list0"),d.compData.JS.c60_fbar_ncc_list.JS.cdrConfig);f.fireEvent(c.attr("cid"),b.event||"queryMessageDetail",{messageid:j})};d.c60_fbar_ncc_listClick1=function(i){if(Number(d.compData.JS.c60_fbar_news_center_df.JS.textconfig.index)==1){d.c60_fbar_ncc_lb_icoClick1(i)}else{var j=d.respData[1].list[i].id;if(Number(d.respData[1].list[i].status)==0){d.compData.JS.c60_fbar_ncc_list.JS.msgids[j]=true;if(d.compData.JS.c60_fbar_ncc_list.JS.unread1>0){d.compData.JS.c60_fbar_ncc_list.JS.unread1--}}d.respData[1].list[i].status="1";a.recordTracingCdr(d.pageID,a.createCdrid(d.pageID,b.cid,"list1"),d.compData.JS.c60_fbar_ncc_list1.JS.cdrConfig)}};d.c60_fbar_ncc_lb_ico_gray_allStyle=function(){if(Number(d.compData.JS.c60_fbar_ncc_list.JS.listconfig.curIndex)==0){if(Number(d.compData.JS.delete0)==0){return d.compData.JS.c60_fbar_ncc_lb_ico_gray_all.JS.stateconfig.state0}else{return d.compData.JS.c60_fbar_ncc_lb_ico_gray_all.JS.stateconfig.state1}}else{if(Number(d.compData.JS.delete1)==0){return d.compData.JS.c60_fbar_ncc_lb_ico_gray_all.JS.stateconfig.state0}else{return d.compData.JS.c60_fbar_ncc_lb_ico_gray_all.JS.stateconfig.state1}}};d.c60_fbar_ncc_lb_ico_gray_allClick=function(l){if(Number(d.compData.JS.c60_fbar_ncc_list.JS.listconfig.curIndex)==0){var j=d.respData[0].list;var k;if(l=="delmore"){for(item in j){k=j[item].id;if(d.compData.JS.c60_fbar_news_center_df.JS.msgids[k]!=true){d.compData.JS.c60_fbar_news_center_df.JS.msgids[k]=true;d.compData.JS.c60_fbar_news_center_df.JS.count++}}return}if(Number(d.compData.JS.delete0)==0){d.compData.JS.delete0=1;for(item in j){k=j[item].id;if(d.compData.JS.c60_fbar_news_center_df.JS.msgids[k]!=true){d.compData.JS.c60_fbar_news_center_df.JS.msgids[k]=true;d.compData.JS.c60_fbar_news_center_df.JS.count++}}}else{d.compData.JS.delete0=0;for(item in j){k=j[item].id;if(d.compData.JS.c60_fbar_news_center_df.JS.msgids[k]==true){d.compData.JS.c60_fbar_news_center_df.JS.msgids[k]=false;d.compData.JS.c60_fbar_news_center_df.JS.count--}}}}if(Number(d.compData.JS.c60_fbar_ncc_list.JS.listconfig.curIndex)==1){var i=d.respData[1].list;var k;if(l=="delmore"){for(item in i){k=i[item].id;if(d.compData.JS.c60_fbar_news_center_df.JS.msgids[k]!=true){d.compData.JS.c60_fbar_news_center_df.JS.msgids[k]=true;d.compData.JS.c60_fbar_news_center_df.JS.count++}}return}if(Number(d.compData.JS.delete1)==0){d.compData.JS.delete1=1;for(item in i){k=i[item].id;if(d.compData.JS.c60_fbar_news_center_df.JS.msgids[k]!=true){d.compData.JS.c60_fbar_news_center_df.JS.msgids[k]=true;d.compData.JS.c60_fbar_news_center_df.JS.count++}}}else{d.compData.JS.delete1=0;for(item in i){k=i[item].id;if(d.compData.JS.c60_fbar_news_center_df.JS.msgids[k]==true){d.compData.JS.c60_fbar_news_center_df.JS.msgids[k]=false;d.compData.JS.c60_fbar_news_center_df.JS.count--}}}}a.recordTracingCdr(d.pageID,a.createCdrid(d.pageID,b.cid,"delallicon"),d.compData.JS.c60_fbar_ncc_lb_ico_gray_all.JS.cdrConfig)};d.c60_fbar_news_center_dfText=function(){if(Number(d.compData.JS.c60_fbar_news_center_df.JS.textconfig.index)==0){return d.compData.JS.c60_fbar_news_center_df.JS.textconfig.text0}else{return d.compData.JS.c60_fbar_news_center_df.JS.textconfig.text1}};d.deleteMessageDetailRecvd=function(j){if(j&&j.respparam){var i=j.respparam.result;if(Number(i)==0){d.bg_black_popShow(d.compData.JS.c60_fbar_right_itbtn.JS.text2)}else{d.bg_black_popShow(d.compData.JS.c60_fbar_right_itbtn.JS.text3)}var k={flag:"-2",startNum:"1",number:"10"};f.fireEvent(c.attr("cid"),b.event||"queryMessageList",k)}};d.eventMap.deleteMessageDetailRecvd=d.deleteMessageDetailRecvd;var e={c60_fbar_news_center_df:function(i){a.recordTracingCdr(d.pageID,a.createCdrid(d.pageID,b.cid,"centerdf"),d.compData.JS.c60_fbar_news_center_df.JS.cdrConfig);d.compData.JS.c60_fbar_news_center_df.JS.msgids=[];d.compData.JS.c60_fbar_news_center_df.JS.count=0;if(Number(d.compData.JS.c60_fbar_news_center_df.JS.textconfig.index)==0){d.compData.JS.c60_fbar_news_center_df.JS.textconfig.index=1;d.compData.JS.c60_fbar_ncc_list.JS.show=true;d.compData.JS.c60_fbar_news_center_del.JS.show=true;d.compData.JS.delete0=0;d.compData.JS.delete1=0}else{d.compData.JS.c60_fbar_news_center_df.JS.textconfig.index=0;d.compData.JS.c60_fbar_ncc_list.JS.show=false;d.compData.JS.c60_fbar_news_center_del.JS.show=false}},c60_fbar_news_center_del:function(i){if(Number(d.compData.JS.c60_fbar_news_center_del.JS.stateconfig.state)==1){return false}a.recordTracingCdr(d.pageID,a.createCdrid(d.pageID,b.cid,"centerdel"),d.compData.JS.c60_fbar_news_center_del.JS.cdrConfig);d.compData.JS.bg_pop_block.JS.stateconfig.status=1;d.compData.JS.pop_block.JS.stateconfig.status=1},c60_fbar_nc_tabtit0:function(i){a.recordTracingCdr(d.pageID,d.compData.JS.c60_fbar_nc_tabtit0.JS.cdrConfig,a.createCdrid(d.pageID,b.cid,"tabtit0"));d.compData.JS.c60_fbar_ncc_list.JS.listconfig.curIndex=0},c60_fbar_nc_tabtit1:function(i){a.recordTracingCdr(d.pageID,a.createCdrid(d.pageID,b.cid,"tabtit1"),d.compData.JS.c60_fbar_nc_tabtit1.JS.cdrConfig);d.compData.JS.c60_fbar_ncc_list.JS.listconfig.curIndex=1},c60_fbar_left_itbtn:function(i){a.recordTracingCdr(d.pageID,a.createCdrid(d.pageID,b.cid,"litbtn"),d.compData.JS.c60_fbar_left_itbtn.JS.cdrConfig);d.compData.JS.bg_pop_block.JS.stateconfig.status=0;d.compData.JS.pop_block.JS.stateconfig.status=0},c60_fbar_right_itbtn:function(k){a.recordTracingCdr(d.pageID,a.createCdrid(d.pageID,b.cid,"ritbtn"),d.compData.JS.c60_fbar_right_itbtn.JS.cdrConfig);d.compData.JS.c60_fbar_news_center_df.JS.del=true;d.compData.JS.c60_fbar_ncc_list.JS.listconfig.moreindex=d.compData.JS.c60_fbar_ncc_list.JS.listconfig.curIndex;var j=d.compData.JS.c60_fbar_news_center_df.JS.msgids;var i="";for(key in j){if(j[key]==true){i=i+"|"+key}}if(i.length>=1){i=i.substring(1)}f.fireEvent(c.attr("cid"),b.event||"deleteMessageDetail",{messageid:i});d.compData.JS.bg_pop_block.JS.stateconfig.status=0;d.compData.JS.pop_block.JS.stateconfig.status=0;d.compData.JS.c60_fbar_news_center_df.JS.textconfig.index=0;d.compData.JS.c60_fbar_ncc_list.JS.show=false;d.compData.JS.c60_fbar_news_center_del.JS.show=false;d.compData.JS.moreDel="delete";d.compData.JS.c60_fbar_news_center_df.JS.msgids=[];d.compData.JS.c60_fbar_news_center_df.JS.count=0},c60_fbar_ncc_more0:function(j){a.recordTracingCdr(d.pageID,"c60_fbar_ncc_more0",d.compData.JS.c60_fbar_ncc_more0.JS.cdrConfig);d.compData.JS.c60_fbar_ncc_list.JS.listconfig.moreindex=0;var i=Number(d.compData.JS.c60_fbar_ncc_list.JS.listconfig.curNum0)+Number(d.compData.JS.c60_fbar_ncc_list.JS.listconfig.step);i=""+i;d.compData.JS.c60_fbar_ncc_list.JS.listconfig.lastcurNum0=i;var j={flag:"0",startNum:d.compData.JS.c60_fbar_ncc_list.JS.listconfig.startNum,number:i};f.fireEvent(c.attr("cid"),b.event||"queryMessageList",j);d.compData.JS.moreDel="more0"},c60_fbar_ncc_more1:function(j){a.recordTracingCdr(d.pageID,"c60_fbar_ncc_more1",d.compData.JS.c60_fbar_ncc_more1.JS.cdrConfig);d.compData.JS.c60_fbar_ncc_list.JS.listconfig.moreindex=1;var i=Number(d.compData.JS.c60_fbar_ncc_list.JS.listconfig.curNum1)+Number(d.compData.JS.c60_fbar_ncc_list.JS.listconfig.step);i=""+i;d.compData.JS.c60_fbar_ncc_list.JS.listconfig.lastcurNum1=i;var j={flag:"1",startNum:d.compData.JS.c60_fbar_ncc_list.JS.listconfig.startNum,number:i};f.fireEvent(c.attr("cid"),b.event||"queryMessageList",j);d.compData.JS.moreDel="more1"},};d.click=function(i,j){if(i==undefined||i==null){return false}switch(i){case"c60_fbar_news_center_df":e.c60_fbar_news_center_df(j);break;case"c60_fbar_news_center_del":e.c60_fbar_news_center_del(j);break;case"c60_fbar_nc_tabtit0":e.c60_fbar_nc_tabtit0(j);break;case"c60_fbar_nc_tabtit1":e.c60_fbar_nc_tabtit1(j);break;case"c60_fbar_left_itbtn":e.c60_fbar_left_itbtn(j);break;case"c60_fbar_right_itbtn":e.c60_fbar_right_itbtn(j);break;case"c60_fbar_ncc_more0":e.c60_fbar_ncc_more0(j);break;case"c60_fbar_ncc_more1":e.c60_fbar_ncc_more1(j);break;default:}};d.$on(d.cid+"_handleEvent",function(l,j,k,i){d.eventMap[j](k);if(null!=i){i.resolve()}})}],link:function(d,b,a,c){d.pageID=c.pageID;d.componentType="msgbox";d.init()}}});
uiCore.directive("minetui",function(){return{restrict:"EA",replace:true,require:"^pid",template:'<div class="c60_fbar_my_con_tui">   <div class="c60_fbar_bg_black_pop" ng-style="getbg_black_popStyle()">    <div class="c60_fbar_tips_txt" style="color:white;margin-top:0" ng-bind="compData.JS.bg_black_pop.JS.desc"></div>   </div>   <div class="c60_fbar_sug_con">    <textarea class="c60_fbar_sug_textarea" ng-focus="focus();" ng-blur="blur();" ng-model="compData.JS.c60_fbar_sug_textarea.JS.text"></textarea>    <div class="c60_fbar_sug_btn_con">     <a class="c60_fbar_sug_btn" ccid="c60_fbar_sug_btn" ng-style="getsug_btnStyle()" ng-click="sug_btnClick();" ng-bind="compData.JS.c60_fbar_sug_btn.JS.text"></a>    </div>   </div>   <div class="c60_fbar_tuiding_tips" ng-bind="compData.JS.c60_fbar_tuiding_tips.JS.text">   </div></div>',scope:{},controller:["$scope","$element","$attrs","coreService","coreUtils","Const",function(d,c,b,e,a,f){d.focus=function(){if(d.compData.JS.c60_fbar_sug_textarea.JS.text==d.compData.JS.c60_fbar_sug_textarea.JS.oldtext){d.compData.JS.c60_fbar_sug_textarea.JS.text="";d.compData.JS.c60_fbar_sug_btn.JS.stateconfig.state=1}};d.blur=function(){if(d.compData.JS.c60_fbar_sug_textarea.JS.text==""){d.compData.JS.c60_fbar_sug_textarea.JS.text=d.compData.JS.c60_fbar_sug_textarea.JS.oldtext}};d.getsug_btnStyle=function(){if(d.compData.JS.c60_fbar_sug_textarea.JS.text==""){d.compData.JS.c60_fbar_sug_btn.JS.stateconfig.state=1}else{d.compData.JS.c60_fbar_sug_btn.JS.stateconfig.state=0}if(d.compData.JS.c60_fbar_sug_btn.JS.stateconfig.state==0){return d.compData.JS.c60_fbar_sug_btn.JS.stateconfig.state0}else{return d.compData.JS.c60_fbar_sug_btn.JS.stateconfig.state1}};d.cid=b.cid;d.eventMap={};d.compData={CSS:{},JS:{}};d.getStyle=function(g){if(d.compData.JS[g]&&d.compData.JS[g].CSS){return d.compData.JS[g].CSS}};d.extendComponentData=function(g){d.compData=a.extendDeep(d.compData,g)};d.init=function(){e.registerComponentInstance(c.attr("cid"),d);d.extendComponentData(e.getInitProperties(d.cid)||{});c.css(d.compData.css||{});d.compData.JS.c60_fbar_sug_textarea.JS.oldtext=d.compData.JS.c60_fbar_sug_textarea.JS.text};d.getbg_black_popStyle=function(){if(d.compData.JS.bg_black_pop.JS.stateconfig.state==1){return d.compData.JS.bg_black_pop.JS.stateconfig.state1}else{return d.compData.JS.bg_black_pop.JS.stateconfig.state0}};d.bg_black_popShow=function(g){d.compData.JS.bg_black_pop.JS.desc=g;d.compData.JS.bg_black_pop.JS.stateconfig.state=1;angular.element(c[0].querySelector(".c60_fbar_bg_black_pop")).css({display:"block"});setTimeout(function(){d.compData.JS.bg_black_pop.JS.stateconfig.state=0;angular.element(c[0].querySelector(".c60_fbar_bg_black_pop")).css({display:"none"})},d.compData.JS.bg_black_pop.JS.stateconfig.time*1000)};d.sug_btnClick=function(){if(d.compData.JS.c60_fbar_sug_btn.JS.stateconfig.state==1){return false}a.recordTracingCdr(d.pageID,a.createCdrid(d.pageID,b.cid,"seeyou"),d.compData.JS.c60_fbar_sug_btn.JS.cdrConfig);var g=d.compData.JS.c60_fbar_sug_textarea.JS.text;if(g==""){d.bg_black_popShow(d.compData.JS.c60_fbar_sug_textarea.JS.tips1)}else{if(g==d.compData.JS.c60_fbar_sug_textarea.JS.oldtext){d.bg_black_popShow(d.compData.JS.c60_fbar_sug_textarea.JS.tips2)}else{top.tlbs.toolbarclose="close";var h={feedback:encodeURIComponent(g),componentId:"cminetui",pageId:"iminetui",templateId:top.tlbs.templateID};d.bg_black_popShow(d.compData.JS.c60_fbar_sug_textarea.JS.tips3);e.fireEvent(c.attr("cid"),b.event||"tuisubmit",h);setTimeout(function(){var i={closeunit:4,templateId:top.tlbs.templateID};e.fireEvent(c.attr("cid"),b.event||"tuisubmitclose",i);d.compData.JS.c60_fbar_sug_textarea.JS.text=""},d.compData.JS.c60_fbar_sug_btn.JS.time*1000)}}};d.getDataFromRet=function(g){e.fireEvent(c.attr("cid"),b.event||"tuisuccess")};d.eventMap.getDataFromRet=d.getDataFromRet;d.$on(d.cid+"_handleEvent",function(j,h,i,g){d.eventMap[h](i);if(null!=g){g.resolve()}})}],link:function(d,b,a,c){d.pageID=c.pageID;d.componentType="cminetui";d.init()}}});
uiCore.directive("wrapenvelope",[function(){return{restrict:"AE",replace:true,require:"^pid",template:'<div class="c60_fbar_luck_money_common"><form name="redEnvelopeFrm">		<div class="c60_fbar_padding_top_275"></div> 		<div class="c60_fbar_luck_money_input">			<span class="c60_fbar_luck_money_input_l" ng-bind="compData.JS.config.envCountText"></span>			<span class="c60_fbar_luck_money_input_r" ng-bind="compData.JS.config.countUnitText"></span>			<input name="redEnvelopeNums" ng-change="inputValue()" class="c60_fbar_luck_money_input_num c60_fbar_luck_money_common_input_num" type="number" required positive-integer max-value="{{compData.JS.config.maxcount}}" ng-model="compData.JS.num" placeholder="{{compData.JS.config.tip4CountText}}" />		</div>		<div class="c60_fbar_luck_money_input">			<span class="c60_fbar_luck_money_input_l" ng-bind="compData.JS.config.trafficCoinText"></span>			<span class="c60_fbar_luck_money_input_r" ng-bind="compData.JS.config.trafficUnitText"></span>			<input type="number" name="trafficDataCoinNums" ng-change="inputValue()" ng-model="compData.JS.val" required positive-integer max-value="{{compData.JS.config.maxcoin}}" class="c60_fbar_luck_money_input_val c60_fbar_luck_money_common_input_val" placeholder="{{compData.JS.config.tip4CoinText}}" /></div>			<p class="c60_fbar_luck_money_inner_msg" ng-bind="compData.JS.config.noticeText"></p>		<div class="c60_fbar_luck_money_textarea">			<textarea name="remark" placeholder="{{compData.JS.config.blessText}}" ng-maxlength="compData.JS.config.maxlength" ng-model="compData.JS.currentBless"></textarea>		</div>		<div class="c60_fbar_luck_result_confirm_massage"><div ng-bind="compData.JS.config.errorMsg" ng-show="showErrorMsg(redEnvelopeFrm)"></div></div>		<button ng-disabled="redEnvelopeFrm.$invalid" ng-style="getSubmitBtnStyle(redEnvelopeFrm.$invalid)" ng-click="clickWrap()" ng-bind="compData.JS.config.wrapText" class="c60_fbar_luck_money_inner_btn"></button></form>		<div ng-if="showRecharge" class="c60_fbar_luck_money_pop_bg"></div>		<div ng-if="showRecharge" class="c60_fbar_luck_money_pop"><div ng-click="hideRecharge()" class="c60_fbar_luck_money_pop_close" ng-style="compData.JS.config.closeStyle.CSS"></div> 			<p class="c60_fbar_luck_money_pop_msg c60_fbar_luck_money_pop_msg1" ng-bind="compData.JS.config.residueTipsText"></p>			<p class="c60_fbar_luck_money_pop_msg c60_fbar_luck_money_pop_msg2">			<span ng-bind="balance"></span>{{compData.JS.config.residueUnitText}}			</p>			<ul style="position:relative;">				<li ng-repeat="item in recharge" ng-click= "clickItem($index)" ng-style="getStyle($index)" ng-bind="item"></li>				<li ng-if="isOther" style="border:none;padding:2px;float:right;" ng-style="btnStyle">					<div style="float:right;padding-top:0em;text-align:right;text-align:right;line-height:4em;position:absolute;top:4.8em;left:12.5em;" ng-bind="compData.JS.config.morebtnText""></div>				</li>			</ul>			<button ng-click="gotoRecharge($index)" class="c60_fbar_luck_money_pop_btn" ng-bind="compData.JS.config.rechargeText"></button>		</div>		</div>',scope:{},controller:["$scope","$element","$attrs","coreService","coreUtils","Const",function(k,l,h,b,f,a){k.cid=h.cid;k.compData={CSS:{},JS:{}};k.eventMap={};var g;var d;var e;var j=0;var m=true;k.isOther=true;k.showRecharge=false;k.init=function(){b.registerComponentInstance(l.attr("cid"),k);var n=b.getInitProperties(h.cid)||{};k.compData.CSS=n.CSS||{};k.compData.JS=n.JS||{}};k.setType=function(n){g=n.contentType;k.compData.JS.config=f.extendDeep(k.compData.JS.configType.common,k.compData.JS.configType[g]);e=k.compData.JS.typeMapping[g];b.fireEvent(h.cid,"updatetitle",{stitle:k.compData.JS.config.titleText})};k.initData=function(){k.compData.JS.val=null;k.compData.JS.num=null;k.compData.JS.currentBless=null;m=true;j=0;k.showRecharge=false};k.update=function(p){var n=true;if(p&&p.respparam&&p.respparam.result){k.balance=p.respparam.balance;k.redEnvUrl=p.respparam.redEnvUrl;k.result=p.respparam.result;k.recharge=[];k.shortcharge=[];var o=p.respparam.rechargedata||[];k.btnStyle=c(o.length);d=o.length>=3?3:o.length;for(i=0;i<d;i++){k.recharge.push(o[i].amount+k.compData.JS.config.residueUnitText)}if(o.length>3){k.isOther=false;k.recharge.push(k.compData.JS.config.morebtnText)}if(k.result==0&&k.redEnvUrl!=null&&k.redEnvUrl!=undefined){b.fireEvent(l.attr("cid"),"error",{errorcode:"0",resultText:(k.compData.JS.config.successTipsText+"<div style='word-break: break-all; '>"+k.redEnvUrl+"</div>")});n=false}if(k.result==1&&p.respparam.rechargedata!=null&&p.respparam.rechargedata.length>0&&k.balance!=null&&k.balance!=undefined){k.showRecharge=true;n=false}if(k.result==2){b.fireEvent(l.attr("cid"),"error",{errorcode:"-1"});n=false}}if(n){b.fireEvent(l.attr("cid"),"error",{errorcode:"-1"})}};var c=function(n){if(3<n){return null}else{return k.compData.JS.config.morebtnStyle}};k.clickWrap=function(){f.recordTracingCdr(k.pageID,h.cid+"_inner_btn",k.compData.JS.config.sendRedenvsRecord.cdrConfig);var n=k.compData.JS.currentBless;if(null==k.compData.JS.currentBless||""==k.compData.JS.currentBless){n=k.compData.JS.config.blessText}b.fireEvent(l.attr("cid"),"clickbtn",{EnvelopeType:e,EnvelopeNumber:k.compData.JS.num,EnvelopeCount:k.compData.JS.val,bless:encodeURIComponent(n)})};k.getSubmitBtnStyle=function(o){var n=o?"disable":"enable";return k.compData.JS.configType.common.submitBtnStyle[n]};k.inputValue=function(){m=false};k.showErrorMsg=function(n){if(m){return false}if(n.remark.$invalid){k.compData.JS.config.errorMsg=k.compData.JS.config.starText+k.compData.JS.config.inputErrorText.blessErrorText}if(n.trafficDataCoinNums.$invalid){k.compData.JS.config.errorMsg=k.compData.JS.config.starText+k.compData.JS.config.inputErrorText.valueErrorText}if(n.redEnvelopeNums.$invalid){k.compData.JS.config.errorMsg=k.compData.JS.config.starText+k.compData.JS.config.inputErrorText.countErrorText}return n.$invalid};k.getStyle=function(n){if(j===n){return k.compData.JS.config.borderStyle}else{return k.compData.JS.config.grayBorderStyle}};k.clickItem=function(n){f.recordTracingCdr(k.pageID,h.cid+"_li"+n,k.compData.JS.config.sendRedenvsRecord.cdrConfig);j=n;if(n==d){k.showRecharge=false;b.fireEvent(l.attr("cid"),"torecharge",{linktype:"2",url:k.compData.JS.config.rechargePageid,index:j,length:d});j=0}};k.gotoRecharge=function(){f.recordTracingCdr(k.pageID,h.cid+"_pop_btn",k.compData.JS.config.sendRedenvsRecord.cdrConfig);k.showRecharge=false;j=0;b.fireEvent(l.attr("cid"),"torecharge",{linktype:"2",url:k.compData.JS.config.rechargePageid,index:j,length:d})};k.hideRecharge=function(){f.recordTracingCdr(k.pageID,h.cid+"_close",k.compData.JS.config.sendRedenvsRecord.cdrConfig);k.showRecharge=false};k.eventMap.setType=k.setType;k.eventMap.update=k.update;k.eventMap.initData=k.initData;k.$on(h.cid+"_handleEvent",function(p,q,o,n){if(k.eventMap[q]){k.eventMap[q](o);if(null!=n){n.resolve()}}})}],link:function(d,b,a,c){d.pageID=c.pageID;d.componentType="page";d.init()}}}]);
uiCore.directive("ftsiappholder",["coreService","coreUtils","$timeout",function(c,a,b){return{restrict:"AE",replace:true,template:"<div></div>",transclude:true,scope:{},require:"^pid",controller:["$scope","$element","$attrs","$compile","$templateCache","$interval","$timeout",function(r,s,q,j,g,m,f){r.cid=q.cid;r.tempAccessTime=undefined;top.tlbs.lastAccessTime="false";var i={};r.eventMap={};r.compData={CSS:{position:"relative",height:"100%",width:"100%",left:"0px",top:"0px","background-color":"#fff"},JS:{backable:true,closeable:true,cdr:true,clickable:false,animation:false,apploadState:false,pagercompmapping:{},stateconfig:{state:0,state0:{},state1:{}},currentpageid:"",backimageconfig:{CSS:{"background-repeat":"no-repeat","background-size":"1.6em 1.6em",height:"1.6em",left:"0.6em",position:"absolute",top:"0.4em",width:"1.6em","z-index":"2047483649"},JS:{clickable:"true",stateconfig:{state:"0",state0:{"background-image":"none",cursor:"auto"},state1:{"background-image":"url('"+top.tlbs.templatePath+"/images/toback.png')",cursor:"pointer"}}}},backimageconfigtouch:{CSS:{display:"block",height:"2.4em",left:"0em",position:"absolute",top:"0em",width:"5em","z-index":"2047483649"},JS:{clickable:"true",stateconfig:{state:"0"},cdrConfig:{uitracingcdr:{cdrType:"uitracingcdr",enable:true,storeData:false}}}},closeimageconfig:{CSS:{"background-image":"url('"+top.tlbs.templatePath+"/images/close.png')","background-repeat":"no-repeat","background-size":"1.6em 1.6em",cursor:"pointer",height:"1.6em",position:"absolute",right:"0.6em",top:"0.4em",width:"1.6em","z-index":"2047483649"},JS:{clickable:"true",stateconfig:{state:"0"}}},closeimageconfigtouch:{CSS:{display:"block",height:"2.4em",position:"absolute",right:"0em",top:"0em",width:"5em","z-index":"2047483649"},JS:{clickable:"true",stateconfig:{state:"0"}}},progresswindowconfig:{CSS:{position:"fixed",height:"100%",width:"100%",left:"0px",display:"none","z-index":"2047483649",top:"0px",background:"rgba(0,0,0,0.498039)"},JS:{}},progresstextconfig:{CSS:{"background-color":"#4C4C4C","border-radius":".1em .1em .1em .1em",color:"white",height:"2em","line-height":"1.8em",margin:"0 auto",position:"relative","text-align":"center",top:"6.75em",width:"8em"},JS:{progresstext:"Please Wait..."}},statusholderconfig:{CSS:{display:"none",height:"4.5em",top:"30%",color:"#BDBDBD",border:"0.05em solid #F2F2F2","background-color":"#F9F9F9",position:"absolute",width:"50%",left:"25%","line-height":"100%","text-align":"left","-webkit-tap-highlight-color":"rgba(0,0,0,0)","list-style":"none outside none",padding:"0","z-index":"2047483649",},},pagercompmapping:{goldcoin:"goldcoinlayout"}}};r.compData.JS.previouspageid="";r.pagechangeChangeTimer=null;r.pageChangeFlag=true;r.extendComponentData=function(u){r.compData=a.extendDeep(r.compData,u)};var e=function(){};e.prototype.eexecute=function(){if(!r.compData.JS.apploadState){var v=g.get(q.templateurl);v='<div id="progressholder"><div id="progresstextholder">{{compData.JS.progresstextconfig.JS.progresstext}}</div></div><div id="statusholder" class="reload"></div>'+v;s.html(v);j(s.contents())(r);r.compData.JS.apploadState=true;r.ctrlPageGroup={};r.progressHolderElement=angular.element(s[0].querySelector('[id="progressholder"]'));r.progressTextHolderElement=angular.element(s[0].querySelector('[id="progresstextholder"]'));r.statusHolder=angular.element(s[0].querySelector('[id="statusholder"]'));r.titleBackImage=angular.element(s[0].querySelector(".c60_fbar_titlebackimage"));var u=angular.element(s[0].querySelectorAll('[lload="0"]'));for(var w=0;w<u.length;w++){var x=angular.element(u[w]);r.ctrlPageGroup[x.attr("pid")]=x}}};r.loadApps=function(w,v){var u=new e().eexecute();if(null!=v){v.resolve()}};r.eventMap.loadApps=r.loadApps;r.lloadApps=function(w,v){if(null!=w.applist&&w.applist.length>0){var u=w.applist.split(",");var x=new o().eexecute(u,v)}else{if(null!=v){v.resolve()}}};var o=function(){};o.prototype.eexecute=function(A,u){var w=0,v=A.length,z=0,y=A,u=u;var x=function(B){var C=r.ctrlPageGroup[y[z]];if(null!=C&&C.attr("lload")==0){new l(C).eexecute()}z=z+1;if(z==v&&null!=u){u.resolve()}};m(x,150,v,this.loadKey)};var l=function(u){this.singleAppObject=u};l.prototype.eexecute=function(){this.singleAppObject.attr("lload","1")};r.eventMap.lloadApps=r.lloadApps;r.init=function(){c.registerComponentInstance(r.cid,r);r.extendComponentData(c.getInitProperties(r.cid));r.loadApps();r.applyStyle();r.initNext();c.fireEvent(r.cid,"init",null)};r.initNext=function(){r.statusHolder.css(r.compData.JS.statusholderconfig.CSS);r.statusHolder[0].innerHTML=r.compData.JS.statusholderconfig.JS.statustext};r.showStatus=function(){r.statusHolder.css("display","block")};r.hideStatusMessage=function(){r.statusHolder.css("display","none")};r.applyStyle=function(){if(null!=r.compData.JS.stateconfig["state"+r.compData.JS.stateconfig.state]){a.extendDeep(r.compData.CSS,r.compData.JS.stateconfig["state"+r.compData.JS.stateconfig.state])}s.css(r.compData.CSS);r.progressHolderElement.css(r.compData.JS.progresswindowconfig.CSS);r.progressTextHolderElement.css(r.compData.JS.progresstextconfig.CSS);if(null!=r.titleBackImage){if(null!=r.compData.JS.backimageconfig.JS.stateconfig["state"+r.compData.JS.backimageconfig.JS.stateconfig.state]){a.extendDeep(r.compData.JS.backimageconfig.CSS,r.compData.JS.backimageconfig.JS.stateconfig["state"+r.compData.JS.backimageconfig.JS.stateconfig.state])}r.titleBackImage.css(r.compData.JS.backimageconfig.CSS)}};r.changeState=function(v,u){if(null!=v&&null!=v.cstate){if(r.compData.JS.stateconfig.state!=v.cstate){r.compData.JS.stateconfig.state=v.cstate;r.applyStyle();r.$evalAsync(function(){if(null!=u){if(r.compData.JS.animation){s.on(top.tlbs.transitionendEvent,function(w){u.resolve()})}else{u.resolve()}}})}else{if(null!=u){u.resolve()}}}};r.eventMap.changeState=r.changeState;r.eventMap.showStatus=r.showStatus;r.changeCurrentPageIDB=function(x,v){if(null!=x&&null!=x.pageid&&x.pageid.length>0){if(r.compData.JS.progresswindowconfig.CSS.display=="block"){r.compData.JS.progresswindowconfig.CSS.display="none"}r.updateLastAccess();r.hideStatusMessage();var w=r.compData.JS.pagercompmapping[x.pageid];if(null!=w&&w.length>0){var u=c.getComponentScope(w);if(null!=u){typeof u.showcb==="function"&&u.showcb()}}if(null!=x.cpageid&&x.cpageid!=r.compData.JS.currentpageid){return}if(x.pageid==r.compData.JS.currentpageid){return}r.pageChangeFlag=true;r.compData.JS.previouspageid=r.compData.JS.currentpageid;r.compData.JS.currentpageid=x.pageid;if(null!=x.state&&"1"==x.state){k(x.pageid,r.compData.JS.previouspageid);if(Object.keys(i).length>1){r.compData.JS.backimageconfig.JS.stateconfig.state=1}else{r.compData.JS.backimageconfig.JS.stateconfig.state=0}}else{k(x.pageid,null);r.compData.JS.backimageconfig.JS.stateconfig.state=0}f(function(){r.compData.JS.backimageconfigtouch.JS.stateconfig.state=r.compData.JS.backimageconfig.JS.stateconfig.state;var A=angular.element(s[0].querySelectorAll('[pid="'+x.pageid+'"]'));var y=A[0].getAttribute("backable");var z=A[0].getAttribute("closable");r.compData.JS.backable=y=="0"?false:true;r.compData.JS.closable=z=="0"?false:true},10)}if(null!=v){v.resolve()}r.applyStyle()};r.eventMap.changeCurrentPageIDB=r.changeCurrentPageIDB;var d;function p(u,x){var w=angular.element(s[0].querySelectorAll('[pid="'+u+'"]'));var v=w[0].innerHTML;if("<div></div>"==v){d=f(function(){p(u,x)},50)}else{if(d){clearTimeout(d)}c.fireEvent((w[0].getAttribute("pagesrcid")||u)+"show","recvd",x)}}r.changeCurrentPageID=function(A,C){if(null!=A&&null!=A.pageid&&A.pageid.length>0){if(r.compData.JS.progresswindowconfig.CSS.display=="block"){r.compData.JS.progresswindowconfig.CSS.display="none"}r.hideStatusMessage();var u=r.compData.JS.pagercompmapping[A.pageid];if(null!=u&&u.length>0){var w=c.getComponentScope(u);if(null!=w){typeof w.showcb==="function"&&w.showcb()}}if(null!=A.cpageid&&A.cpageid!=r.compData.JS.currentpageid){return}if(r.compData.JS.cdr){var B={cdrType:"uidisplaycdr",enable:true,storeData:false};var z={pageId:A.pageid,displayType:1,displayResult:0};if(A.pageid!=r.compData.JS.currentpageid){var y={pageId:r.compData.JS.currentpageid,displayType:0,displayResult:0};a.cdrService(B,z);a.cdrService(B,y)}else{a.cdrService(B,z)}}top.tlbs.currentpageid=A.pageid;var v=angular.element(s[0].querySelectorAll('[pid="'+A.pageid+'"]'));if(A.pageid!=r.compData.JS.currentpageid){r.pageChangeFlag=true;r.compData.JS.previouspageid=r.compData.JS.currentpageid;r.compData.JS.currentpageid=A.pageid;if(null!=A.state&&"1"==A.state){k(A.pageid,r.compData.JS.previouspageid);if(Object.keys(i).length>1){r.compData.JS.backimageconfig.JS.stateconfig.state=1}else{r.compData.JS.backimageconfig.JS.stateconfig.state=0}}else{k(A.pageid,null);r.compData.JS.backimageconfig.JS.stateconfig.state=0}f(function(){r.compData.JS.backimageconfigtouch.JS.stateconfig.state=r.compData.JS.backimageconfig.JS.stateconfig.state;var D=v[0].getAttribute("backable");var E=v[0].getAttribute("closable");r.compData.JS.backable=D=="0"?false:true;r.compData.JS.closable=E=="0"?false:true},10)}var x=v[0].getAttribute("lload");if(x=="0"){r.lloadApps({applist:A.pageid});p(A.pageid,A)}else{if(A.reload!="0"){c.fireEvent((v[0].getAttribute("pagesrcid")||A.pageid)+"show","recvd",A)}}}if(null!=C){C.resolve()}r.applyStyle()};r.eventMap.changeCurrentPageID=r.changeCurrentPageID;var k=function(u,v){if(i[u]){return}i[u]=v};var n=function(u){if(!i[u]){return null}var v=i[u];delete i[u];return v};var t=function(){return i&&Object.keys(i).length>0};var h=function(){i={}};r.popPage=function(v,u){top.tlbs.cdrData=null;if(t()){var w=n(r.compData.JS.currentpageid);if(null!=w){if(w==r.compData.JS.currentpageid){r.popPage()}else{r.changeCurrentPageID({pageid:w,state:1,reload:(v||{}).reload||"0"},u)}}else{h();r.compData.JS.backimageconfig.JS.stateconfig.state=0}}if(null!=u){u.resolve()}};r.eventMap.popPage=r.popPage;r.$on(r.cid+"_handleEvent",function(x,v,w,u){r.eventMap[v](w,u)});r.isCurrentPage=function(u){return r.compData.JS.currentpageid==u?true:false};r.getPageClass=function(u){return(r.compData.JS.previouspageid==u&&r.pageChangeFlag)?"pprevious":r.compData.JS.currentpageid==u?"pcurrent":"phidden"};r.showProgress=function(v,u){r.compData.JS.progresswindowconfig.CSS.display="block";if(null!=u){u.resolve()}r.applyStyle()};r.eventMap.showProgress=r.showProgress;r.hideProgress=function(v,u){r.compData.JS.progresswindowconfig.CSS.display="none";if(null!=u){u.resolve()}r.applyStyle()};r.eventMap.hideProgress=r.hideProgress;r.writeCPageOpenCDR=function(w,v){if(r.compData.JS.cdr){var x={cdrType:"uidisplaycdr",enable:true,storeData:false};var u={pageId:r.compData.JS.currentpageid,displayType:1,displayResult:0};a.cdrService(x,u);if(null!=v){v.resolve()}}};r.writeCPageCloseCDR=function(w,v){top.tlbs.cdrData=null;if(r.compData.JS.cdr){var x={cdrType:"uidisplaycdr",enable:true,storeData:false};var u={pageId:r.compData.JS.currentpageid,displayType:0,displayResult:0};a.cdrService(x,u);if(null!=v){v.resolve()}}};r.updateLastAccess=function(){var u=new Date().getTime();if(!r.tempAccessTime){r.tempAccessTime=u;top.tlbs.lastAccessTime="true"}else{var v=u-r.tempAccessTime;if(v>120000){r.tempAccessTime=u;top.tlbs.lastAccessTime="true"}else{top.tlbs.lastAccessTime="false"}}};r.$watch(function(){return r.compData.JS.previouspageid},function(v,u){if(null!=v&&v.length>0){f.cancel(r.pagechangeChangeTimer);r.pagechangeChangeTimer=f(function(){r.pageChangeFlag=false},500)}});r.$on("$destroy",function(u){f.cancel(r.pagechangeChangeTimer)});r.eventMap.writeCPageOpenCDR=r.writeCPageOpenCDR;r.eventMap.writeCPageCloseCDR=r.writeCPageCloseCDR}],link:function(f,e,d,g){f.pageID=d.ppid||g.pageID;f.componentType="ftsiappholder";f.init()}}}]);
uiCore.directive("ifscoupon",["coreService","coreUtils",function(b,a){return{restrict:"AE",replace:true,transclude:true,template:'<div class="c60_fbar_my_privilege_con"><div simplescroll><div id="topImgBanner" class="c60_fbar_mp_barnner"><img class="c60_fbar_mp_barnner_img" ng-src="{{compData.JS.topImgBanner.JS.bannerImgURLForImg}}" alt=""/></div><div id="bottomListHolder" class="c60_fbar_mp_con"><div class="c60_fbar_mp_list" ng-repeat="data in compData.JS.couponData"><div class="c60_fbar_mp_list_top"><table class="c60_fbar_mp_list_top_table" cellpadding="0" cellspacing="0"><tbody><tr><td ng-style={{::compData.JS.couponIndex.CSS}}>{{::$index+1}}</td><td><div class="c60_fbar_mp_lt_table_tit" ng-style={{::compData.JS.couponName.CSS}}>{{::data.couponname}}</div><div class="c60_fbar_mp_lt_table_tit_txt" ng-style={{::compData.JS.couponDesc.CSS}}>{{::data.description}}</div></td><td class="c60_fbar_clearfloat" ccid="couponLink" ng-click="openCouponURL($index)"><span class="c60_fbar_mp_lt_table_tit_btn" ng-style={{::compData.JS.couponLink.CSS}}>{{::compData.JS.couponLink.JS.text}}</span></td></tr></tbody></table></div><div class="c60_fbar_mp_list_bottom"><div class="c60_fbar_mp_lb_detail c60_fbar_clearfloat"><span class="c60_fbar_mp_lb_d_ico_01" ng-style={{::compData.JS.couponCodeText.CSS}}>{{::compData.JS.couponCodeText.JS.text}}</span><span class="c60_fbar_mp_lb_d_txt" ng-style={{::compData.JS.couponCodeValue.CSS}}>{{::data.exchangecode}}</span></div><div class="c60_fbar_mp_lb_detail c60_fbar_clearfloat"><span class="c60_fbar_mp_lb_d_ico_02" ng-style={{::compData.JS.couponValidDateText.CSS}}>{{::compData.JS.couponValidDateText.JS.text}}</span><span class="c60_fbar_mp_lb_d_txt" ng-style={{::compData.JS.couponValidDateValue.CSS}}>{{::data.startdate+" - "+data.expiredate}}</span></div><div class="c60_fbar_mp_lb_detail c60_fbar_clearfloat"><span class="c60_fbar_mp_lb_d_ico_03" ng-style={{::compData.JS.couponExDescText.CSS}}>{{::compData.JS.couponExDescText.JS.text}}</span><span class="c60_fbar_mp_lb_d_txt" ng-style={{::compData.JS.couponExDescValue.CSS}}>{{::data.exchangedescrption}}</span></div></div></div></div></div></div>',scope:{},require:"^pid",controller:["$scope","$element","$attrs",function(e,d,c){e.cid=c.cid;e.eventMap={};e.compData={CSS:{height:"100%",width:"100%",position:"relative"},JS:{clickable:false,animation:false,clickevent:"",stateconfig:{state:0,state0:{},state1:{}},topImgBanner:{CSS:{height:"6em"},JS:{bannerImgURL:"url('"+top.tlbs.templatePath+"/images/my_privilege_banner.png')",bannerImgURLForImg:""}},bottomListHolder:{CSS:{},JS:{}},couponIndex:{CSS:{color:"#f9807c"},JS:{}},couponName:{CSS:{width:"90%","font-size":"1em",color:"#222","white-space":"nowrap",overflow:"hidden","text-overflow":"ellipsis"},JS:{}},couponDesc:{CSS:{width:"90%","font-size":"0.8em",color:"#ff7d55","white-space":"nowrap",overflow:"hidden","text-overflow":"ellipsis","margin-top":"0.6em"},JS:{}},couponLink:{CSS:{"float":"right",width:"4.5em",height:"2.2em","line-height":"2.2em",background:"#ff7d55",color:"#fff","text-align":"center","font-size":"1em","margin-right":"1.2em","-moz-border-radius":"2.2em","-webkit-border-radius":"2.2em","border-radius":"2.2em"},JS:{text:"详情"}},couponCodeText:{CSS:{"float":"left",width:"5em","font-size":"0.8em","line-height":"1.8em",color:"#222",background:"left center no-repeat","background-size":"1.2em 1.2em","padding-left":"1.5em","background-image":"url('"+top.tlbs.templatePath+"/images/my_privilege_ico_01.png')"},JS:{text:"兑换码:"}},couponCodeValue:{CSS:{"float":"left",width:"65%","line-height":"1.8em",color:"#222","font-size":"0.8em"},JS:{}},couponValidDateText:{CSS:{"float":"left",width:"5em","font-size":"0.8em","line-height":"1.8em",color:"#222",background:"left center no-repeat","background-size":"1.2em 1.2em","padding-left":"1.5em","background-image":"url('"+top.tlbs.templatePath+"/images/my_privilege_ico_02.png')"},JS:{text:"兑换日期:"}},couponValidDateValue:{CSS:{"float":"left",width:"65%","line-height":"1.8em",color:"#ff7d55","font-size":"0.8em"},JS:{}},couponExDescText:{CSS:{"float":"left",width:"5em","font-size":"0.8em","line-height":"1.8em",color:"#222",background:"left center no-repeat","background-size":"1.2em 1.2em","padding-left":"1.5em","background-image":"url('"+top.tlbs.templatePath+"/images/my_privilege_ico_03.png')"},JS:{text:"使用方法:"}},couponExDescValue:{CSS:{"float":"left",width:"65%","line-height":"1.8em",color:"#222","font-size":"0.8em"},JS:{}}}};e.compData.JS.couponData=[];e.extendComponentData=function(f){e.compData=a.extendDeep(e.compData,f)};e.init=function(){b.registerComponentInstance(e.cid,e);e.extendComponentData(b.getInitProperties(e.cid));e.processConfig();e.processStyle()};e.processConfig=function(){e.compData.JS.topImgBanner.JS.bannerImgURLForImg=e.compData.JS.topImgBanner.JS.bannerImgURL.replace("url('","").replace("')","")};e.processStyle=function(){e.topImgBanner=angular.element(d[0].querySelector('[id="topImgBanner"]'));e.bottomListHolder=angular.element(d[0].querySelector('[id="bottomListHolder"]'));d.css(e.compData.CSS);e.topImgBanner.css(e.compData.JS.topImgBanner.CSS);e.bottomListHolder.css(e.compData.JS.bottomListHolder.CSS)};e.openCouponURL=function(f){var g=e.compData.JS.couponData[f];a.recordTracingCdr(e.pageID,e.compData.JS.couponData[f].couponid,e.compData.JS.couponLink.JS.cdrConfig);if(g.couponlink!==""&&g.couponlink!==undefined&&g.couponlink!==null){window.open(g.couponlink)}};e.updateCouponData=function(g,f){if(null!=g&&null!=g.respparam.usercoupons){e.compData.JS.couponData=g.respparam.usercoupons}if(null!=f){f.resolve()}};e.eventMap.init=e.init;e.eventMap.updateCouponData=e.updateCouponData;e.$on(e.cid+"_handleEvent",function(i,g,h,f){e.eventMap[g](h,f)})}],link:function(e,d,c,f){e.pageID=f.pageID;e.componentType="ifscoupon";e.init()}}}]);
uiCore.directive('newtcdetail', [function () {
			return {
				restrict : 'AE',
				replace : true,
				require : '^pid',
				template : '<div class="c60_fbar_taocan_xq">' + '<abnormaltips ng-show="errorflag"></abnormaltips>' + '<div class="c60_fbar_taocan_detailxq" ng-show="details && details.length>0"><div class="c60_fbar_detailwrapscroll" simplescroll>' + '<linechart ng-show="chartflag" config="{{::compData.js.lineChart}}"></linechart>' + '<div class="c60_fbar_taocan_xq_title" ><div class="c60_fbar_taocan_xq_title_text" ng-bind="compData.js.taocan_xq_title.text"></div><a class="c60_fbar_link_overbuy" ng-bind="compData.js.link_overbuy.JS.text" ccid="c60_fbar_link_overbuy" ng-click="oblink()" ng-show="showLink(\'link_overbuy\')"></a></div><div  class="c60_fbar_packwrap"><div class="c60_fbar_tcdetailscroll"><div ng-repeat="detail in details">' + '<div class="c60_fbar_taocan_block"><div class="c60_fbar_taocan_tit" ng-show="compData.js.taocan_detail.showCategory"  ng-bind="detail.category"></div>' + '<tcpack  ng-repeat="tp in detail.item" tpitemtext="compData.js.tpitemtext" tpitem="tp"></tcpack>' + '</div></div><div class="c60_fbar_packwrapkb"></div></div></div></div>',
				scope : {},
				controller : ["$scope", "$element", "$attrs", 'coreService', 'coreUtils',
					'Const', "$compile","$timeout",
					function ($scope, $element, $attrs, coreService, coreUtils, Const, $compile,$timeout) {
						$scope.cid = $attrs.cid;
						$scope.compData = {
							'CSS' : {},
							'JS' : {
								"lineChart" : {
									"CSS" : {},
									"JS" : {
										"chartText" : {
											"CSS" : {},
											"JS" : {
												"titletext" : {
													"isShow" : true,
													"text" : "数据只含主套餐和叠加包流量，不含闲时和定向流量"
												},
												"usedtext" : {
													"text" : "已用日均:"
												},
												"lefttext" : {

													"text" : "剩余日均:"
												}
											}
										},
										"chartConfig" : {
											"showNumber" : 7,
											"spacing" : 100,
											"xStartSpacing" : 20,
											"lineColor" : "#73d7bd",
											"lineWidth" : 2,
											"isShowBgLine" : true,
											"bgLineWidth" : 2,
											"bgLineColor" : "#F2F1F1",
											"isShowXContent" : true,
											"XContentColor" : "#000",
											"XContentCurrentColor" : "#73d7bd",
											"XContentCurrentFont" : "bold 0.8em/2em Arial",
											"XContentFont" : "0.8em/2em Arial",
											"polyLineShow" : true,
											"polyPointShow" : true,
											"polyPointColor" : "#73d7bd",
											"PolygonShow" : true,
											"PolygonColor" : "rgba(152, 151, 151, 0.2)",
											"avgusedlineShow" : true,
											"avgusedlineStyle" : "#ccc",
											"avgusedlineWidth" : 1,
											"avgremainlineShow" : true,
											"avgremainlineStyle" : "#73d7bd",
											"avgremainlineWidth" : 1,
											"todayText" : "今天"
										}

									}
								},
								'titleStyle' : {
									'JS' : {
										'state0': {
					                        'top': '12.5em',
					                        'padding': '0 1em',
					                        'height': '2em',
					                        'border-top':'1px solid #ccc'
					                    },
					                    'state1': {
					                        'top': '0em',
					                        'padding': '0em 1em',
					                        'height': '2em',
					                        'background':'#fff',
					                        'border-top':'none',
					                        'z-index':'2047483650'
					                    }

									}
								}
							}
						};
						$scope.eventMap = {};
						$scope.errorflag = false;
						$scope.chartflag = false;
						//var titleStyle = angular.element($element[0].querySelector('.c60_fbar_taocan_xq_title'));
						//var packwrapStyle = angular.element($element[0].querySelector('.c60_fbar_packwrap'));
						var packwrapkbStyle = angular.element($element[0].querySelector('.c60_fbar_packwrapkb'));
						var setting = {
							'K' : 1024,
							'M' : 1024 * 1024,
							'G' : 1024 * 1024 * 1024,
							'T' : 1024 * 1024 * 1024 * 1024
						};
						$scope.showLink = function (classname) {
							if ($scope.compData.js[classname]) {
								return $scope.compData.js[classname].JS.isShow;
							}
						}
						$scope.oblink = function () {
							if (coreUtils.cdrUtils.canWriteUITracingCDR($scope.compData.js.link_overbuy.JS.cdrConfig)) {
								$scope.compData.JS['cdrData'] = {};
								$scope.compData.JS.cdrData = {
									'pageId' : $scope.pageID,
									'componentId' : coreUtils.createCdrid($scope.pageID,$attrs.cid,'link')
								};
								coreUtils.cdrService($scope.compData.js.link_overbuy.JS.cdrConfig.uitracingcdr, $scope.compData.JS.cdrData);
							}
							coreService.fireEvent($scope.cid, 'linkbuy');
						};
						$scope.transferK = function (value, keepfloat) {
							var n = keepfloat || 2;
						    //return coreUtils.trafficValueTransferfromKB(value,n);
						    
		                    var valueMB = value / 1024;
		                    valueMB = coreUtils.formatNum(valueMB,n);
		                    
		                    return {v: valueMB,u: 'MB'};
			                
						};
						$scope.getStates = function (value) {
							var properties = coreService.getInitProperties($attrs['cid']) || {};
							var states;
							if (properties.JS != undefined) {
								var states = properties.JS;
								for (var i = 0; i < 3; i++) {
									var state = properties.JS['state' + i];
									if (value <= state.maxvalue && value >= state.minvalue) {
										return state.config
									}
								}

							}

						};
						$scope.error = function (data) {
							$scope.errorflag = true;
							$scope.$broadcast('trafficquryerror', {
								'errorcode' : data.errorcode
							});
						};
						var children,
						wrapperDiv,
						minHeight = 0,
						totalHeight = 0;
						var isOpera = /preto/i.test(navigator.userAgent) || /opera/i.test(navigator.userAgent);
						var tcscroll = angular.element($element[0].querySelector('.c60_fbar_detailwrapscroll'));
						var packwrap = angular.element($element[0].querySelector('.c60_fbar_detailwrap'));

						var touchMove = function () {
							var _touchstart = Const.touchEvent.start;
							var _touchmove = Const.touchEvent.move;
							var _touchend = Const.touchEvent.end;
							var totalDistance = 0;
							var _lastYPos = 0;
							var _currentYPos = 0;
							var ydistance = 0;
							var flag = false;
							var elHeight = 0;
							var parentHeight = 0;
							var touchstartflag = false;
							var touchstart = function (e) {
								var transform = tcscroll[0].style['webkitTransform'] || tcscroll[0].style['mozTransform'] || tcscroll[0].style['msTransform'] || tcscroll[0].style['msTransform'] || tcscroll[0].style['oTransform'];
								if (transform) {
									totalDistance = transform.split(',')[1] && parseInt(transform.split(',')[1]);
								} else {
									totalDistance = 0;
								}
								touchstartflag = true;
								elHeight = parseInt(packwrap['totalheight'] || top.window.getComputedStyle(tcscroll[0], null)['height'])+20;
								parentHeight = parseInt(packwrap['parentheight'] || top.window.getComputedStyle(tcscroll[0].parentNode, null)['height']);
								_lastYPos = e.touches ? e.touches[0].pageY : e.pageY;
								if (elHeight > parentHeight) {
									top.document.addEventListener(_touchmove, touch, false);

									top.document.addEventListener(_touchend, endTouch, false);
								}

							}

							var touch = function (e) {
		                       if (touchstartflag) {
									_currentYPos = e.touches ? e.touches[0].pageY : e.pageY;

									ydistance = _currentYPos - _lastYPos;

									if (Math.abs(ydistance) > 3 || flag) {
										flag = true;
										
										e.stopPropagation();
										e.preventDefault();
									}
									_lastYPos = _currentYPos;
									totalDistance += ydistance;

									if (totalDistance > 0) {
										totalDistance = 0;
									} else if (totalDistance + elHeight <= parentHeight) {

										totalDistance = parentHeight - elHeight;
										
										
									}
									if (isOpera) {
										tcscroll.css('-o-transform', 'translate(0,' + totalDistance + 'px)');
										tcscroll.css('transform', 'translate(0,' + totalDistance + 'px)');
									} else {
										tcscroll.css('-webkit-transform', 'translate3d(0,' + totalDistance + 'px,0)');
										tcscroll.css('-moz-transform', 'translate3d(0,' + totalDistance + 'px,0)');
										tcscroll.css('-o-transform', 'translate3d(0,' + totalDistance + 'px,0)');
										tcscroll.css('-ms-transform', 'translate3d(0,' + totalDistance + 'px,0)');
										tcscroll.css('transform', 'translate3d(0,' + totalDistance + 'px,0)');
									}
								}
							};
							var endTouch = function (e) {
								if (flag) {
									e.stopPropagation();
									e.preventDefault();
									flag = false;
								}
								touchstartflag = false;
								top.document.removeEventListener(_touchmove, touch, false);
								top.document.removeEventListener(_touchend, endTouch, false);
							};
							$element.bind(_touchstart, touchstart);
						};
						//$timeout(touchMove, 0);
						$scope.update = function (data) {
							
							if (data && data.respparam && data.respparam.trafficusage) {
								if (data.respparam.trafficusage.details) {
									var linechartss = [];
									if (data.respparam.trafficusage.avgremain && data.respparam.trafficusage.avgused && data.respparam.trafficusage.trafficchart) {
										var avgremain = data.respparam.trafficusage.avgremain;
										var avgused = data.respparam.trafficusage.avgused;
										var trafficchart = data.respparam.trafficusage.trafficchart || [];

										if (trafficchart.length > 0) {
											linechartss = {
													'avgremain' : avgremain,
													'avgused' : avgused,
													'trafficchart' : trafficchart
												};
												//titleStyle.css($scope.compData.js.titleStyle.JS.state0);
												//packwrapStyle.css($scope.compData.js.packwrapStyle.JS.state0);
												$scope.chartflag = true;
										} else if(trafficchart.length == 0){
											$scope.chartflag = false;
										}

										//packwrapkbStyle.css($scope.compData.JS.packwrapkbStyle.CSS);
										

									} else {
										$scope.chartflag = false;
									}

									$scope.errorflag = false;
									var temp = data.respparam.trafficusage.details || [];
									var voltemp = data.respparam.trafficusage.vollume || [];
									
									var categorydetail;
									var items;
									var item;
									var detailitems;

									for (var i = 0, len = temp.length; i < len; i++) {
										categorydetail = temp[i];
										items = categorydetail.item || [];
										
									    var alltotal =0;
										var allremain =0;
										for (var j = 0, ilen = items.length; j < ilen; j++) {
											item = items[j];
											
											/**detailitems = item.detalitem;
								
											if (undefined != detailitems)
											{
												for (var index=0;index < detailitems.length;index++)
												{
													
													var remaintmp = {v:detailitems[index].total-detailitems[index].used,u:detailitems[index].unit};
													
													remaintmp = $scope.transferK(detailitems[index].total - detailitems[index].used,Number($scope.compData.js.floatnum||2));
													
													detailitems[index].remain = remaintmp.v;
													detailitems[index].remainunit = remaintmp.u;
													
												}

												item.detalitem = detailitems;
												alert(item.detalitem[1].remain);
											}**/
										
											var left = item.total - item.used;
											item.usagepercent = item.used / item.total * 100;
							
											item.leftpercent = left / item.total * 100;
											var remaintmp = {v:item.total-item.used,u:item.unit};
											var totaltmp = {v:item.total,u:item.unit};
											if(item.categoryType == 2 || !item.categoryType){
												remaintmp = $scope.transferK(item.total - item.used,Number($scope.compData.js.floatnum||2));
												totaltmp = $scope.transferK(item.total,Number($scope.compData.js.floatnum||2));
											}
											//allremain = allremain + remaintmp.v;
											item.remain = remaintmp.v;
											item.remainunit = remaintmp.u;
											
											item.total = totaltmp.v;
											item.totalunit = totaltmp.v;
											
											var config = null;
											if (item.usagepercent == 0) {
												config = $scope.getStates(item.leftpercent + 0.001);
											} else {
												config = $scope.getStates(item.leftpercent)
											}
											if (config) {
												item.imagestyle = config.faceStyle;
												item.linestyle = coreUtils.extendDeep({}, config.lineStyle || {});
											}
											if (item.linestyle) {

												item.linestyle.width = item.usagepercent + '%';
											}

										}
										
									}

									
									$scope.details = temp;

									$scope.compData.js.lineChart.trraficdata = linechartss;
									$scope.$broadcast('lineconfig', $scope.compData.js.lineChart);
									if ($scope.details.length == 0) {
										$scope.error({
											errorcode : 'nodata'
										});

									}
								} else {
									$scope.error({
										errorcode : 'default'
									})
								}
							} else {
								$scope.errorflag = true;
								$scope.details = undefined;
							}
						};
						$scope.hide = function () {
							$element.css({
								'top' : '100%'
							});

						};
						$scope.show = function () {
							angular.element($element[0].querySelector('.c60_fbar_curcircle')).css({
								'-webkit-transform' : 'scale(1)',
								'transform' : 'scale(1)',
								'margin-left':'-0.3em',
								'margin-top':'-0.3em',
								}).removeClass("c60_fbar_curcircle");
							angular.element($element[0].querySelector('.c60_fbar_curcontent')).css({
								'display' : 'none'
							}).removeClass("c60_fbar_curcontent");
							$element.css({
								'top' : '2.8em'
							});
						}
						$scope.init = function (param) {
							coreService.registerComponentInstance($element.attr('cid'), $scope);
							var properties = coreService.getInitProperties($attrs['cid']) || {};
							$scope.compData.css = properties.CSS || {};
							$scope.compData.js = properties.JS || {};
							$scope.$broadcast('abnormaltipsinit', $scope.compData.js.errortipsconfig);
							coreService.fireEvent($element.attr('cid'), 'init');
						};
						$scope.$on($attrs['cid'] + '_handleEvent', function (event, cevent, args, deferred) {
							if ($scope.eventMap[cevent]) {
								$scope.eventMap[cevent](args);
								if (null != deferred) {
									deferred.resolve();
								}
							}
						});
						$scope.eventMap['update'] = $scope.update;
						$scope.eventMap['hide'] = $scope.hide;
						$scope.eventMap['show'] = $scope.show;
						$scope.eventMap['error'] = $scope.error;
					}
				],
				link : function ($scope, $element, $attrs, ctl) {
					$scope.pageID = ctl.pageID;
					$scope.componentType = 'newtcdetail';
					$scope.init();
				}

			}

		}
	]);
uiCore.directive('popuptrafficimg', [function() {
    return {
        restrict: 'AE',
        replace: true,
        require: '^pid',
        template: '<div class="popuptrafficimg">'
	        	+'<div class="popuptrafficimgdiv" ng-style="getDivStyle();">'
	        	+'<div class="c60_fbar_traffic_close" ng-style="compData.JS.close.CSS" id="c60_fbar_traffic_close" ccid="c60_fbar_traffic_close"></div>'
	        	+'<div class="c60_fbar_traffic">'
	        	+'<div class="c60_fbar_traffic_img" id="c60_fbar_traffic_img" ng-style="getImgStyle();">'
	        	+'<div class="c60_fbar_traffic_img_desc" ng-show="compData.JS.advertdesc.JS.isShow" ng-style="getAdvertdescStyle();" ng-bind="getSubStrnig(compData.JS.advertdesc.JS.text);"></<div>'
	        	+'</div>'
	        	+'</div>'
	        	+'<div class="popuptrafficpkg">'
	        	+'<div class="c60_fbar_traffic_container" ng-style="getContainerStyle();">'
	        	+'<div class="c60_fbar_traffic_title" ng-style="getDescStyle();" ng-bind="packageData.name"></div>'
	        	+'<div class="c60_fbar_pkg_txt" ng-bind="packageData.comboProperies[0].value" ng-style="getPkgStyle();"></div>'
	        	+'<div class="c60_fbar_pkg_icon" ng-show="compData.JS.icon.JS.isShow" ng-style="getIconStyle();"></div>'
	        	+'<div class="c60_fbar_pkg_btn" id="c60_fbar_pkg_btn" ng-bind="packageData.price" ng-style="getBtnStyle();"></div>'
	        	+'</div>'
	        	+'<div class="popuptrafficbottom" ng-style="getBottomStyle();">'
	        	+'<div class="c60_fbar_traffic_bottomlogo" ng-style="getLogoStyle();"></div>'
	        	+'<div class="c60_fbar_traffic_bottomdesc" ng-style="getBottomDescStyle();" ng-bind-html="to_trusted(compData.JS.bottomdesc.JS.text);"></div>'
	        	+'<div class="c60_fbar_traffic_bottombtn" id="c60_fbar_traffic_bottombtn" ng-style="getBottomBtnStyle();">'
	        	+'<span class="c60_fbar_traffic_bottombtn_txt" ng-style="getBottomBtnTxtStyle();" ng-bind="compData.JS.bottombtntxt.JS.text"></span>'
	        	+'</div>'
	        	+'</div>'
	        	+'</div>'
	        	+'</div>',
        scope: {},
        controller: ["$scope", "$element", "$attrs", 'coreService', 'coreUtils',
            'Const','$timeout',
            function($scope, $element, $attrs, coreService, coreUtils, Const, $timeout) {
                $scope.cid = $attrs.cid;
                $scope.eventMap = {};
                $scope.compData = {};
                $scope.isShowPkg= false;
                $scope.getDivStyle = function() {
                	if (/(iPhone|iOS|IOS|iphone|ios)/ig.test($scope.compData.userAgent)){
                		$scope.winHeight = top.window.innerHeight;
                		if($scope.winHeight < 500){
                			$scope.compData.JS.trafficimgdiv.CSS['margin-top'] = '-11.5em';
                		}
             		}
                	return $scope.compData.JS.trafficimgdiv.CSS;
                };
                $scope.getImgStyle = function() {
                	return $scope.compData.JS.advertimg.CSS;
                };
                $scope.getAdvertdescStyle = function() {
                	return $scope.compData.JS.advertdesc.CSS;
                };
                $scope.getContainerStyle = function(){
                	if($scope.isShowPkg){
                		$scope.compData.JS.container.CSS['display'] = 'block';
                		return $scope.compData.JS.container.CSS;
                	}else{
                		return {'display':'none'};
                	}
                };
                $scope.getDescStyle = function(){
                	return $scope.compData.JS.desc.CSS;
                };
                $scope.getPkgStyle = function(){
               	 	return $scope.compData.JS.trafficpkg.CSS;
                };
                $scope.getIconStyle = function(){
                	return $scope.compData.JS.icon.CSS;
                };
                $scope.getBtnStyle = function(){
                	return $scope.compData.JS.btn.CSS;
                };
                $scope.getBottomStyle = function() {
                	return $scope.compData.JS.bottom.CSS;
                };
                $scope.getLogoStyle = function() {
                	return $scope.compData.JS.logo.CSS;
                };
                $scope.getBottomDescStyle = function() {
                	return $scope.compData.JS.bottomdesc.CSS;
                };
                $scope.getBottomBtnStyle = function() {
                	return $scope.compData.JS.bottombtn.CSS;
                };
                $scope.getBottomBtnTxtStyle = function() {
                	return $scope.compData.JS.bottombtntxt.CSS;
                };
                var _touchstart = Const.touchEvent.start,
                container = angular.element($element[0].querySelector('[id="c60_fbar_traffic_img"]')),
                container2 = angular.element($element[0].querySelector('[id="c60_fbar_traffic_close"]')),
                container3 = angular.element($element[0].querySelector('.c60_fbar_pkg_btn')),
                container4 = angular.element($element[0].querySelector('.c60_fbar_traffic_bottombtn'));
                container.bind(_touchstart, function(e) {
                    e.stopPropagation();
                    e.preventDefault();
                    _lastYPos = e.touches ? e.touches[0].pageY : e.pageY;
                    _lastXPos = e.touches ? e.touches[0].pageX : e.pageX;
                    var url = $scope.compData.JS.advertimg.JS.url;
                    var linktype = $scope.compData.JS.advertimg.JS.linktype;
                    if (top.tlbs.messageid != "" && top.tlbs.messageid != null && top.tlbs.messageid != undefined) {
                        coreService.fireEvent($scope.cid, 'messagestatuschange', {
                            "messageid": top.tlbs.messageid
                        });
                    }
                	
                	if (linktype == '0') {
	                	if (url) {
	                		if (/(iPhone|iOS|IOS|iphone|ios)/ig.test($scope.compData.userAgent)){
	                			if(/(OS 9|OS 10|OS 11)/ig.test($scope.compData.userAgent)){
	                				top.location.href=url;
	                			}else{
	                				window.open(url);
	                			}
	                		}else{
                				window.open(url);
                			}
	                	}
	                } else {
	                	if (linktype && url) {
	                		coreService.fireEvent($scope.cid, 'clickimg', {
	                            "url": url,"linktype":linktype
	                        });
	                	}
	                }
                    coreUtils.recordTracingCdr($scope.pageID,coreUtils.createCdrid($scope.pageID, '', 'traffic_img'), $scope.compData.JS.cdrConfig);
                });
                container2.bind(_touchstart, function(e) {
                    e.stopPropagation();
                    e.preventDefault();
                    _lastYPos = e.touches ? e.touches[0].pageY : e.pageY;
                    _lastXPos = e.touches ? e.touches[0].pageX : e.pageX;
                    coreService.fireEvent($scope.cid, 'closebtn');
                    coreUtils.recordTracingCdr($scope.pageID,coreUtils.createCdrid($scope.pageID, '', 'traffic_close'), $scope.compData.JS.cdrConfig);
                    top.tlbs.notificationCdrData = null;
                });
                container3.bind(_touchstart, function(e) {
                    e.stopPropagation();
                    e.preventDefault();
                    _lastYPos = e.touches ? e.touches[0].pageY : e.pageY;
                    _lastXPos = e.touches ? e.touches[0].pageX : e.pageX;
                    coreService.fireEvent($scope.cid, 'tostore', 
                    {	'pkgid': $scope.packageData.id,
                        'pkgoid': $scope.packageData.oid,
                        'taskid': $scope.taskId
                    });
                    coreUtils.recordTracingCdr($scope.pageID,coreUtils.createCdrid($scope.pageID, '', 'pkgbtn'), $scope.compData.JS.cdrConfig);
                });
                container4.bind(_touchstart, function(e) {
                    e.stopPropagation();
                    e.preventDefault();
                    _lastYPos = e.touches ? e.touches[0].pageY : e.pageY;
                    _lastXPos = e.touches ? e.touches[0].pageX : e.pageX;
                    coreService.fireEvent($scope.cid, 'bottombtn');
                    coreUtils.recordTracingCdr($scope.pageID,coreUtils.createCdrid($scope.pageID, '', 'bottombtn'), $scope.compData.JS.cdrConfig);
                });
                var time = null;
                $scope.show = function() {
                	time =$scope.compData.JS.closetime||8000;
                	$element.css("display","block");
                	$timeout(function(){
                    	$element.css("display","none");
                    },time);
                };
                $scope.hide = function() {
                	$element.css("display","none");
                };
                function isEmpty(obj){
 	                for (var name in obj){
 	                	return false;
 	                }
 	                return true;
                };
                $scope.packageData = {};
                $scope.update = function(param) {
                    $scope.taskId = param.taskId;
                    top.tlbs.messageid = param.messageid || "";
                    if(param && !isEmpty(param.packagelist) && !isEmpty(param.packagelist[0].list) && param.packagelist[0].list.length > 0){
                        $scope.packageData = param.packagelist[0].list[0];
                        $scope.isShowPkg= true;
                    }else{
                    	$scope.isShowPkg= false;
                    }
                };
                $scope.to_trusted = function(text) {
                	return coreUtils.getTrustedHtml(text);
                };
                $scope.getSubStrnig = function(str) {
                	if(str && str != "" && str != null && str != undefined){
	                	var len = $scope.compData.JS.advertdesc.JS.strLen || 26;
	                	if(str.length > len){
	                		return str.substring(0,len)+"……";
	                	}else{
	                		return str;
	                	}
                	}else{
                		$scope.compData.JS.advertdesc.JS.isShow = false;
                	}
                };
                $scope.eventMap['update'] = $scope.update;
                $scope.eventMap['hide'] = $scope.hide;
                $scope.init = function() {
                    coreService.registerComponentInstance($scope.cid, $scope);
                    var properties = coreService.getInitProperties($attrs['cid']) || {};
                    $scope.compData = coreUtils.extendDeep($scope.compData || {}, properties);
                    $element.css($scope.compData.CSS || {});
                    $scope.compData.userAgent=navigator.userAgent;
                };
                $scope.eventMap['show'] = $scope.show;
                $scope.$on($scope.cid + '_handleEvent', function(eventObj, event, inputData, deferred) {
                    $scope.eventMap[event](inputData, deferred);
                    if (null != deferred) {
                        deferred.resolve();
                    }
                });
            }
        ],
        link: function(scope, element, attrs, ctrl) {
            scope.pageID = ctrl.pageID;
            scope.componentType = 'popuptrafficimg';
            scope.init();
        }
    };
}]);
uiCore.directive("popupmessage",[function(){return{restrict:"AE",replace:true,require:"^pid",template:'<div class="c60_fbar_popuppure"><div class="c60_fbar_wchbg_pop_block"></div><div class="c60_fbar_wchpop_block"><div class="c60_fbar_wchimg_txt_title"><span class="c60_fbar_wchyidong" ng-style="pureStyle(\'title\')" ng-bind="pureText(\'title\')"></span></div><div class="c60_fbar_wchimg_txt_info"><div class="c60_fbar_wchpop_txt2"  ng-style="pureStyle(\'message\')" ng-bind-html="to_trusted(revData.message)"></div></div><div class="c60_fbar_wchimg_txt_btn clearfloat"><div class="c60_fbar_wchleft_itbtn2" ng-bind="pureText(\'cancel\')" ccid="c60_fbar_popupmessage_btnclose"  ng-style="pureStyle(\'cancel\')"></div></div></div></div>',scope:{},controller:["$scope","$element","$attrs","$timeout","coreService","coreUtils","Const",function(h,i,g,d,c,e,b){h.cid=g.cid;h.compData={};h.eventMap={};h.revData={};h.to_trusted=function(j){return e.getTrustedHtml(j)};h.updateData=function(k){i.css({display:"block"});if(k!=null&&k!=undefined){if(k.message!=null&&k.message!=undefined){top.tlbs.messageid=k.messageid||"";h.revData.message=k.message}else{h.revData.message=""}}var j=h.compData.JS.closetime;if(top.tlbs.messageid!=""){d(function(){if(i.css("display")!="none"){top.tlbs.notificationCdrData=null}h.hide()},j)}};h.hide=function(){i.css({display:"none"})};var f=b.touchEvent.start,a=angular.element(i[0].querySelector(".c60_fbar_wchleft_itbtn2"));a.bind(f,function(j){j.stopPropagation();j.preventDefault();_lastYPos=j.touches?j.touches[0].pageY:j.pageY;_lastXPos=j.touches?j.touches[0].pageX:j.pageX;i.css({display:"none"});if(top.tlbs.messageid!=""){c.fireEvent(h.cid,"messagestatuschange",{messageid:top.tlbs.messageid})}e.recordTracingCdr(h.pageID,e.createCdrid(h.pageID,"","closebtn"),h.compData.JS.popupcloseconfig.JS.cdrConfig);top.tlbs.notificationCdrData=null});h.pureStyle=function(j){if(j!=null&&j!=undefined){switch(j){case"title":return h.compData.JS.popuptitleconfig.JS.stateconfig.state;break;case"cancel":return h.compData.JS.popupbtnconfig.JS.stateconfig.state0;break;case"message":return h.compData.JS.popupcolorconfig.JS.stateconfig.state;break;default:break}}};h.pureText=function(j){if(j!=null&&j!=undefined){switch(j){case"title":return h.compData.JS.popuptitleconfig.JS.stateconfig.title;break;case"cancel":return h.compData.JS.popupbtnconfig.JS.stateconfig.title0;break;default:break}}};h.init=function(){c.registerComponentInstance(i.attr("cid"),h);var j=c.getInitProperties(g.cid)||{};h.compData=e.extendDeep(h.compData,j);c.fireEvent(i.attr("cid"),"init")};h.$on(g.cid+"_handleEvent",function(l,m,k,j){if(h.eventMap[m]){h.eventMap[m](k);if(null!=j){j.resolve()}}});h.eventMap.update=h.updateData}],link:function(d,b,a,c){d.pageID=c.pageID;d.componentType="popupmessage";d.init()}}}]);
uiCore.directive("tcdetail",[function(){return{restrict:"AE",replace:true,require:"^pid",template:'<div class="c60_fbar_taocan_xq"><abnormaltips ng-show="errorflag"></abnormaltips><div class="c60_fbar_taocan_detailxq" ng-show="details && details.length>0"><div class="c60_fbar_detailwrapscroll" simplescroll><linechart ng-show="chartflag" config="{{::compData.js.lineChart}}"></linechart><div class="c60_fbar_taocan_xq_title" ><div class="c60_fbar_taocan_xq_title_text" ng-bind="compData.js.taocan_xq_title.text"></div><a class="c60_fbar_link_overbuy" ng-bind="compData.js.link_overbuy.JS.text" ccid="c60_fbar_link_overbuy" ng-click="oblink()" ng-show="showLink(\'link_overbuy\')"></a></div><div  class="c60_fbar_packwrap"><div class="c60_fbar_tcdetailscroll"><div ng-repeat="detail in details"><div class="c60_fbar_taocan_block"><div class="c60_fbar_taocan_tit" ng-show="compData.js.taocan_detail.showCategory"  ng-bind="detail.category"></div><tcpack  ng-repeat="tp in detail.item" tpitemtext="compData.js.tpitemtext" tpitem="tp"></tcpack></div></div><div class="c60_fbar_packwrapkb"></div></div></div></div>',scope:{},controller:["$scope","$element","$attrs","coreService","coreUtils","Const","$compile","$timeout",function(j,h,e,n,c,g,o,q){j.cid=e.cid;j.compData={CSS:{},JS:{lineChart:{CSS:{},JS:{chartText:{CSS:{},JS:{titletext:{isShow:true,text:"数据只含主套餐和叠加包流量，不含闲时和定向流量"},usedtext:{text:"已用日均:"},lefttext:{text:"剩余日均:"}}},chartConfig:{showNumber:7,spacing:100,xStartSpacing:20,lineColor:"#73d7bd",lineWidth:2,isShowBgLine:true,bgLineWidth:2,bgLineColor:"#F2F1F1",isShowXContent:true,XContentColor:"#000",XContentCurrentColor:"#73d7bd",XContentCurrentFont:"bold 0.8em/2em Arial",XContentFont:"0.8em/2em Arial",polyLineShow:true,polyPointShow:true,polyPointColor:"#73d7bd",PolygonShow:true,PolygonColor:"rgba(152, 151, 151, 0.2)",avgusedlineShow:true,avgusedlineStyle:"#ccc",avgusedlineWidth:1,avgremainlineShow:true,avgremainlineStyle:"#73d7bd",avgremainlineWidth:1,todayText:"今天"}}},titleStyle:{JS:{state0:{top:"12.5em",padding:"0 1em",height:"2em","border-top":"1px solid #ccc"},state1:{top:"0em",padding:"0em 1em",height:"2em",background:"#fff","border-top":"none","z-index":"2047483650"}}}}};j.eventMap={};j.errorflag=false;j.chartflag=false;var l=angular.element(h[0].querySelector(".c60_fbar_packwrapkb"));var i={K:1024,M:1024*1024,G:1024*1024*1024,T:1024*1024*1024*1024};j.showLink=function(s){if(j.compData.js[s]){return j.compData.js[s].JS.isShow}};j.oblink=function(){c.recordTracingCdr(j.pageID,c.createCdrid(j.pageID,e.cid,"link"),j.compData.js.link_overbuy.JS.cdrConfig);n.fireEvent(j.cid,"linkbuy")};j.transferK=function(s,t){var u=t||2;return c.trafficValueTransferfromKB(s,u)};j.getStates=function(w){var u=n.getInitProperties(e.cid)||{};var s;if(u.JS!=undefined){var s=u.JS;for(var t=0;t<3;t++){var v=u.JS["state"+t];if(w<=v.maxvalue&&w>=v.minvalue){return v.config}}}};j.error=function(s){j.errorflag=true;j.$broadcast("trafficquryerror",{errorcode:s.errorcode})};var d,b,f=0,p=0;var r=/preto/i.test(navigator.userAgent)||/opera/i.test(navigator.userAgent);var a=angular.element(h[0].querySelector(".c60_fbar_detailwrapscroll"));var k=angular.element(h[0].querySelector(".c60_fbar_detailwrap"));var m=function(){var A=g.touchEvent.start;var v=g.touchEvent.move;var E=g.touchEvent.end;var C=0;var s=0;var F=0;var w=0;var D=false;var z=0;var B=0;var u=false;var y=function(H){var G=a[0].style.webkitTransform||a[0].style.mozTransform||a[0].style.msTransform||a[0].style.msTransform||a[0].style.oTransform;if(G){C=G.split(",")[1]&&parseInt(G.split(",")[1])}else{C=0}u=true;z=parseInt(k.totalheight||top.window.getComputedStyle(a[0],null)["height"])+20;B=parseInt(k.parentheight||top.window.getComputedStyle(a[0].parentNode,null)["height"]);s=H.touches?H.touches[0].pageY:H.pageY;if(z>B){top.document.addEventListener(v,x,false);top.document.addEventListener(E,t,false)}};var x=function(G){if(u){F=G.touches?G.touches[0].pageY:G.pageY;w=F-s;if(Math.abs(w)>3||D){D=true;G.stopPropagation();G.preventDefault()}s=F;C+=w;if(C>0){C=0}else{if(C+z<=B){C=B-z}}if(r){a.css("-o-transform","translate(0,"+C+"px)");a.css("transform","translate(0,"+C+"px)")}else{a.css("-webkit-transform","translate3d(0,"+C+"px,0)");a.css("-moz-transform","translate3d(0,"+C+"px,0)");a.css("-o-transform","translate3d(0,"+C+"px,0)");a.css("-ms-transform","translate3d(0,"+C+"px,0)");a.css("transform","translate3d(0,"+C+"px,0)")}}};var t=function(G){if(D){G.stopPropagation();G.preventDefault();D=false}u=false;top.document.removeEventListener(v,x,false);top.document.removeEventListener(E,t,false)};h.bind(A,y)};j.update=function(y){if(y&&y.respparam&&y.respparam.trafficusage){if(y.respparam.trafficusage.details){var F=[];if(y.respparam.trafficusage.avgremain&&y.respparam.trafficusage.avgused&&y.respparam.trafficusage.trafficchart){var v=y.respparam.trafficusage.avgremain;var E=y.respparam.trafficusage.avgused;var A=y.respparam.trafficusage.trafficchart||[];if(A.length>0){F={avgremain:v,avgused:E,trafficchart:A};j.chartflag=true}else{if(A.length==0){j.chartflag=false}}}else{j.chartflag=false}j.errorflag=false;var G=y.respparam.trafficusage.details||[];var z;var C;var H;for(var x=0,B=G.length;x<B;x++){z=G[x];C=z.item||[];for(var w=0,s=C.length;w<s;w++){H=C[w];var u=H.total-H.used;H.usagepercent=H.used/H.total*100;H.leftpercent=u/H.total*100;var D={v:H.total-H.used,u:H.unit};if(H.categoryType==2||!H.categoryType){D=j.transferK(H.total-H.used,Number(j.compData.js.floatnum||2))}H.remain=D.v;H.remainunit=D.u;var t=null;if(H.usagepercent==0){t=j.getStates(H.leftpercent+0.001)}else{H.leftpercent=H.leftpercent<0?1:H.leftpercent;t=j.getStates(H.leftpercent)}if(t){H.imagestyle=t.faceStyle;H.linestyle=c.extendDeep({},t.lineStyle||{})}if(H.linestyle){H.usagepercent=H.usagepercent>100?100:H.usagepercent;H.linestyle.width=H.usagepercent+"%"}}}j.details=G;j.compData.js.lineChart.trraficdata=F;j.$broadcast("lineconfig",j.compData.js.lineChart);if(j.details.length==0){j.error({errorcode:"nodata"})}}else{j.error({errorcode:"default"})}}else{j.errorflag=true;j.details=undefined}};j.hide=function(){h.css({top:"100%"})};j.show=function(){angular.element(h[0].querySelector(".c60_fbar_curcircle")).css({"-webkit-transform":"scale(1)",transform:"scale(1)","margin-left":"-0.3em","margin-top":"-0.3em",}).removeClass("c60_fbar_curcircle");angular.element(h[0].querySelector(".c60_fbar_curcontent")).css({display:"none"}).removeClass("c60_fbar_curcontent");h.css({top:"0%"})};j.init=function(t){n.registerComponentInstance(h.attr("cid"),j);var s=n.getInitProperties(e.cid)||{};j.compData.css=s.CSS||{};j.compData.js=s.JS||{};j.$broadcast("abnormaltipsinit",j.compData.js.errortipsconfig);n.fireEvent(h.attr("cid"),"init")};j.$on(e.cid+"_handleEvent",function(u,v,t,s){if(j.eventMap[v]){j.eventMap[v](t);if(null!=s){s.resolve()}}});j.eventMap.update=j.update;j.eventMap.hide=j.hide;j.eventMap.show=j.show;j.eventMap.error=j.error}],link:function(d,b,a,c){d.pageID=c.pageID;d.componentType="tcdetail";d.init()}}}]);uiCore.directive("tcpack",[function(){return{restrict:"EA",require:"^?pid",replace:true,scope:{tpitem:"=tpitem",tpitemtext:"=tpitemtext"},template:'<div><div class="c60_fbar_taocan_type c60_fbar_clearfloat"><div class="c60_fbar_taocan_type_info" ng-bind="tpitem.packagename"></div><div class="c60_fbar_taocan_surplus_info" ng-bind="tpitemtext+tpitem.remain +tpitem.remainunit"></div></div><div class="c60_fbar_line"><div class="c60_fbar_line_in_green lineStyle" ng-style="tpitem.linestyle"><span class="c60_fbar_faceStyle faceStyle" ng-style="tpitem.imagestyle"></span></div></div></div>',controller:["$scope","$element","$attrs","coreService","coreUtils","Const",function(d,c,b,e,a,f){d.init=function(){}}],link:function(d,b,a,c){d.init()}}}]);
uiCore.directive("linechart",[function(){return{restrict:"EA",replace:true,require:"^pid",template:'<div class="c60_fbar_linechartwrap"><div class="c60_fbar_linechart"><div class="c60_fbar_linechart_title"><span class="c60_fbar_linechart_titleicon"></span><span class="c60_fbar_linechart_titletext" ng-bind="chartText.JS.titletext.text"></span></div><div class="c60_fbar_linechart_text"><span class="c60_fbar_linechart_used"><b class="c6_fbar_usedtext_text" ng-bind="chartText.JS.usedtext.text"></b><b class="c6_fbar_usedtext_value" ng-bind="avgused.v+avgused.u"></b></span><span class="c60_fbar_linechart_left"><b class="c6_fbar_usedtext_value" ng-bind="chartText.JS.lefttext.text"></b><b class="c6_fbar_usedtext_value" ng-bind="avgremain.v+avgremain.u"></b></span></div><div class="c60_fbar_linewrap" ng-show="linewrapflag"><div class="c60_fbar_lineballwrap" id="c60_fbar_lineballwrap" style="position:absolute;top:0;" ><canvas id="lineChart" class="c60_fbar_lineCanvas" style="position:absolute;top:0;left:0;z-index:99">browser does not support the canvas element.</canvas><div class="c60_fbar_lineballs"></div></div></div></div></div>',scope:{},controller:["$scope","$element","$attrs","coreService","coreUtils","Const",function(g,h,e,b,d,a){var i=angular.element(h[0].querySelector(".tbholder .c60_fbar_linechart"));g.linewrapflag=false;g.compData={CSS:{},JS:{}};var j={K:1024,M:1024*1024,G:1024*1024*1024,T:1024*1024*1024*1024};g.transferK=function(k,l){var m=l||2;return d.trafficValueTransferfromKB(k,m)};g.eventMap={};g.init=function(){};g.showLine=function(k){if(k){var l=k.JS.chartConfig||{};g.chartText=k.JS.chartText||{};if(k.trraficdata.avgremain&&k.trraficdata.avgused&&k.trraficdata.trafficchart){g.linewrapflag=true;g.avgremain=g.transferK(k.trraficdata.avgremain.value);g.avgused=g.transferK(k.trraficdata.avgused.value);var n=k.trraficdata.trafficchart;var m=function(){var Y=angular.element(h[0].querySelector(".c60_fbar_lineballs"))[0];var u=top.document.getElementById("lineChart");var w=angular.element(h[0].querySelector(".c60_fbar_lineballwrap"));var ag=u.getContext("2d");var T=[],v=[],E=[];var L=[],aj,au=[];var K=n.length;var ap=new Date();var O=ap.getDate();if(K>0){if(K>l.showNumber){w.css({right:"0px"})}else{if(K<l.showNumber){w.css({left:"0px"})}else{if(K==l.showNumber){w.css({right:"0px"})}}}}var ak;if(K<8&&K>0){ak=7}else{ak=K}for(var ah=0;ah<ak;ah++){T[ah]=parseInt(ah+1)}for(var an=0;an<K;an++){v[an]=n[an].traffic;E[an]=g.transferK(n[an].traffic)}v.push(k.trraficdata.avgremain.value);v.push(k.trraficdata.avgused.value);var x=top.window.innerWidth,I=top.window.innerHeight,Q=320;var ad;var F=top.document.getElementsByName("viewport")[0];var ar=top.document.getElementsByTagName("head")[0];if(F!=undefined){var N=F.getAttribute("content").split(",")[1].split("width=")[1];if(/taobao/.test(top.window.location.href)){if(/tmall|ju|jhs|taoshenghuo|app/.test(top.window.location.href)){ad=1}else{var X=parseFloat(F.getAttribute("content").split(",")[0].split("initial-scale=")[1]).toFixed(2);ad=Math.round(1/X*100)/100}}else{if(/163/.test(top.window.location.href)){if(navigator.userAgent.indexOf("iPhone")!=-1){if(navigator.userAgent.indexOf("NewsApp")!=-1){ad=2}else{ad=1}if(/m.163/.test(top.window.location.href)){ad=2}}else{if(navigator.userAgent.indexOf("Android")!=-1){if(navigator.userAgent.indexOf("NewsApp")!=-1){ad=1}else{ad=1}if(/m.163/.test(top.window.location.href)){ad=2}}else{ad=1}}}else{ad=1}}}else{ad=top.window.innerWidth/320}var ac=ad==1?30:60;l.xStartSpacing=ad==1?30:l.xStartSpacing;l.spacing=parseInt((x-l.xStartSpacing-ac)/parseInt(l.showNumber-1));var ai=parseInt((ak-1)*l.spacing)+parseInt(l.xStartSpacing)+ac;w.css("width",ai+"px");u.setAttribute("width",ai+"px");u.setAttribute("height",160*ad+"px");u.setAttribute("style","border-bottom:1px solid #ccc");var A=0,z=130*ad,H=100*ad;function av(ax,ay){if(ay=="max"){return Math.max.apply(Math,ax)}else{if(ay=="min"){return Math.min.apply(Math,ax)}}}var ao=av(v,"max");var S=av(v,"min");var U=parseInt(ao-S);var p,W;p=Math.abs(H/U*(k.trraficdata.avgused.value-S)),W=Math.abs(H/U*(k.trraficdata.avgremain.value-S));var am=z,y=parseInt(A+l.xStartSpacing),R=0;var s=[],Z=[];var ae=[],aq=[],at=[];for(var al=0;al<ak;al++){var aw=parseInt(am-H),C=parseInt(y+R);var o=parseInt(am-(H/U*(v[al]-S))),G=parseInt(y+R);R=parseInt(R+l.spacing);s[al]=[C+","+aw];Z[al]=[C+","+am];if(K==1){aq[al]={x:G,y:o}}else{if(K>1){aq[al]={x:G,y:o}}}ae.push(aq[al]);if(l.isShowBgLine){ag.beginPath();ag.strokeStyle=l.bgLineColor;ag.lineWidth=l.bgLineWidth;ag.moveTo(C,aw);ag.lineTo(C,am);ag.stroke();ag.closePath()}if(l.isShowXContent){if(al==(O-1)){var r=angular.element('<div class="c60_fbar_xcontents">'+l.todayText+"</div>")[0];at.push(r);Y.appendChild(r);angular.element(at[al]).css({width:l.spacing+"px",left:parseInt(C)+"px",top:z+"px",font:l.XContentCurrentFont,color:l.XContentCurrentColor,"word-wrap":"normal","white-space":"nowrap","margin-left":-l.spacing*0.5+"px"})}else{var r=angular.element('<div class="c60_fbar_xcontents">'+T[al]+"</div>")[0];at.push(r);Y.appendChild(r);angular.element(at[al]).css({width:l.spacing+"px",left:parseInt(C)+"px",top:z+"px",font:l.XContentFont,color:l.XContentColor,"margin-left":-l.spacing*0.5+"px"})}}}B(ag);function B(ax){if(l.PolygonShow){ax.beginPath();ax.moveTo(ae[0].x,ae[0].y);for(var ay=0;ay<K-1;ay++){ax.fillStyle=l.PolygonColor;ax.lineTo(ae[ay+1].x,ae[ay+1].y)}ax.lineTo(ae[K-1].x,am);ax.lineTo(y,am);ax.fill();ax.closePath()}}ab(ag);function ab(){for(var ax=0;ax<K-1;ax++){if(l.polyLineShow){ag.beginPath();ag.strokeStyle=l.lineColor;ag.lineWidth=l.lineWidth;ag.moveTo(ae[ax].x,ae[ax].y);ag.lineTo(ae[ax+1].x,ae[ax+1].y);ag.stroke();ag.closePath()}}}if(l.polyPointShow){q()}function q(){var ax=[],aE=[];for(var aA=0;aA<K;aA++){var aG=angular.element('<div class="c60_fbar_linecirclewrap"><div class="c60_fbar_linecircle"></div></div>')[0];var aD=angular.element('<div class="c60_fbar_linecontent">'+E[aA].v+E[aA].u+"</div>")[0];ax.push(aG);aE.push(aD);Y.appendChild(aG);Y.appendChild(aD)}for(var az=0;az<K;az++){angular.element(ax[az]).css({left:ae[az].x+"px",top:ae[az].y+"px"});angular.element(aE[az]).css({left:ae[az].x+"px",top:ae[az].y+"px"});var aB=a.touchEvent.start,aF=a.touchEvent.end,ay=angular.element(ax[az]);var aC=(function(aH){var aI=function(aK){aK.stopPropagation();aK.preventDefault();for(var aJ=0;aJ<K;aJ++){if(aJ!=aH){angular.element(ax[aJ]).removeClass("c60_fbar_curcircle").css({"-webkit-transform":"scale(1)","-moz-transform":"scale(1)","-o-transform":"scale(1)","-ms-transform":"scale(1)",transform:"scale(1)","margin-left":"-0.3em","margin-top":"-0.3em",});angular.element(aE[aJ]).removeClass("c60_fbar_curcontent").css({display:"none"})}}angular.element(ax[aH]).addClass("c60_fbar_curcircle").css({"-webkit-transform":"scale(1.5)","-moz-transform":"scale(1.5)","-o-transform":"scale(1.5)","-ms-transform":"scale(1.5)",transform:"scale(1.5)","margin-left":"-0.15em","margin-top":"-0.15em",});angular.element(aE[aH]).addClass("c60_fbar_curcontent").css({display:"block"})};return aI})(az);ay.bind(aB,aC)}}if(l.avgusedlineShow){var t=angular.element('<div class="c60_fbar_avgusedline"></div>')[0];Y.appendChild(t);var P=angular.element(h[0].querySelector(".c60_fbar_avgusedline"));if(F!=undefined){P.css("border-top","1px solid #ccc")}var aa=parseInt(ae[K-1].x-A),M=Math.abs(parseInt(z-p));P.css({top:M+"px",width:aa+"px","border-color":l.avgusedlineStyle})}if(l.avgremainlineShow){var D=angular.element('<div class="c60_fbar_avgremainline"></div>')[0];Y.appendChild(D);var J=angular.element(h[0].querySelector(".c60_fbar_avgremainline"));if(F!=undefined){J.css("border-top","1px dotted #ccc")}var V=parseInt(ai-ae[K-1].x),af=Math.abs(parseInt(z-W));J.css({top:af+"px",left:parseInt(ae[K-1].x-A)+"px",width:V+"px","border-color":l.avgremainlineStyle})}};m();if(l.showNumber<n.length){c()}}else{i.css("height","4em");g.linewrapflag=false}}};var f=0;var c=function(){var p=a.touchEvent.start;var n=a.touchEvent.move;var r=a.touchEvent.end;var l=0;var o=0;var s=0;var m=0;var q=false;var k=angular.element(h[0].querySelector("#c60_fbar_lineballwrap"));k.bind(p,function(t){o=t.touches?t.touches[0].pageX:t.pageX;l=t.touches?t.touches[0].pageY:t.pageY;q=false});k.bind(n,function(x){m=x.touches?x.touches[0].pageX:x.pageX;s=x.touches?x.touches[0].pageY:x.pageY;if(!q&&Math.abs(s-l)>Math.abs(m-o)){return}if(Math.abs(m-o)>3||q){x.stopPropagation();x.preventDefault();q=true;var w=parseInt(k.css("width"));var v=top.window.innerWidth;var t=parseInt(w-v);if(q){var u=m-o;o=m;f=f+u;if(f<=0){f=0}else{if(f>t){f=t}}k.css({"-webkit-transform":"translateX("+f+"px)"});k.css({"-moz-transform":"translateX("+f+"px)"});k.css({"-o-transform":"translateX("+f+"px)"});k.css({"-ms-transform":"translateX("+f+"px)"});k.css({transform:"translateX("+f+"px)"})}}});k.bind(r,function(t){q=false})};g.$on("lineconfig",function(k,l){g.showLine(l)})}],link:function(d,b,a,c){d.pageID=c.pageID;d.componentType="linechart";d.init()}}}]);
uiCore.directive('record', [function () {
			return {
				restrict : 'AE',
				replace : true,
				require : '^pid',
				template : '<div class="c60_tbholder_record">'
							 +'<img width="100%" ng-src="{{imgUrl}}" ng-style="getStyle(\'recordtop\')">'
							   +'<ul class="c60_fbar_recordtitle"  ng-style="getStyle(\'recordlisttitle\')">'
							       +'<li ng-bind="compData.JS.recordlisttitle.JS.text0" ng-style="getStyle(\'recordtitleli\')"></li>'
							       +'<li ng-bind="compData.JS.recordlisttitle.JS.text1" ng-style="getStyle(\'recordtitleli\')"></li>'
							       +'<li ng-bind="compData.JS.recordlisttitle.JS.text2" ng-style="getStyle(\'recordtitleli\')"></li>'
							   +'</ul>'
							   +'<div class="c60_fbar_recordmiddle" ng-style="getStyle(\'recordmiddle\')">'
								   +'<div class="c60_fbar_recordcontent" simplescroll ng-style="getStyle(\'recordcontent\')">'
								    +'<div class="c60_fbar_recordlist" ng-style="getStyle(\'recordlist\')">'
									+'<table cellpadding="0" cellspacing="0" border="0" width="100%" ng-style="getStyle(\'recordtable\')">'							
									   +'<tr class="c60_fbar_record_list" ng-repeat="data in compData.datas.detail" ng-style="getEvenStyleTr($index)" ng-show="!norecordflag">'
								      	  +'<td  ng-style="getEvenStyle($index)"><p ng-bind="dateFilter(data.time,true)"></p><p ng-bind="dateFilter(data.time,false)"></p></td>'
									      +'<td ng-bind="data.name"  ng-style="getEvenStyle($index)"></td>'
									      +'<td ng-bind="data.result"  ng-style="getEvenStyle($index)"></td>'
									   +'</tr>'
									   +'<tr class="c60_fbar_record_list" ng-style="getEvenStyleTr(0)" ng-show="norecordflag">'
								      	  +'<td  ng-style="getStyle(\'norecord\')"  colspan="3"><p ng-bind="compData.JS.norecord.JS.text"></p></td>'
									   +'</tr>'
									+'</table>'
								  +'</div>'
								 +'</div>'
							+'</div>'
						  +'</div>',
				scope : {},
				controller : ["$scope", "$element", "$attrs", 'coreService',
					'coreUtils',
					'Const',
					function ($scope, $element, $attrs, coreService, coreUtils, Const) {
						$scope.cid = $attrs.cid;
						$scope.compData = {
							CSS : {},
							JS : {}
						};
						$scope.eventMap = {};
						$scope.errorData = function (param) {}
						$scope.norecordflag=false;
						
		                $scope.getStyle = function(input) {
		                    if ($scope.compData.JS[input] && $scope.compData.JS[input].CSS) {
		                        return $scope.compData.JS[input].CSS;
		                    }
		                };
		                $scope.getEvenStyle = function(input) {
			                	if(parseInt((input+1)%2)==0){ 
			                		if ($scope.compData.JS["recordtabletdeven"] && $scope.compData.JS["recordtabletdeven"].CSS)    
			                		return $scope.compData.JS.recordtabletdeven.CSS;
			                	}else{
			                		if ($scope.compData.JS["recordtabletd"] && $scope.compData.JS["recordtabletd"].CSS)    
			                		return $scope.compData.JS.recordtabletd.CSS;			                		
			                	}	
		                };
		                $scope.getEvenStyleTr = function(input) {
		                	if(parseInt((input+1)%2)==0){ 
		                		if ($scope.compData.JS["recordtabletreven"] && $scope.compData.JS["recordtabletreven"].CSS)    
		                		return $scope.compData.JS.recordtabletreven.CSS;
		                	}
	                    };
						$scope.updateData = function (param) {	
						   $scope.norecordflag=false;
							$element.css({
								"display" : "block"
							});
						   $scope.imgUrl = $scope.compData.JS.recordtop.JS.imgUrl.replace(/'/g, '');
						   if(param.respparam.detail!= null && param.respparam.detail != undefined && param.respparam.detail != "") {
								$scope.compData.datas=param.respparam;
							}else{
								$scope.norecordflag=true;
		                		//coreService.fireEvent($element.attr('cid'), 'queryerror');
		                	}
						};
						$scope.dateFilter = function(input,flag) {
					    	if(input==undefined)
					    		return '';
					    	if(flag){
					    		var ret = input.substring(0,4)+"-"+input.substring(4,6)
						    	+"-"+input.substring(6,8)
						       
					    	}else{
					    		var ret = input.substring(8,10)
						    	+":"+input.substring(10,12)+":"+input.substring(12,14);
					    	}
					    	 return ret;
					    }; 
						$scope.init = function () {
							coreService.registerComponentInstance($element.attr('cid'), $scope);
							var properties = coreService.getInitProperties($attrs['cid']) || {};
							$scope.compData = coreUtils.extendDeep($scope.compData || {}, properties);
							$element.css($scope.compData.CSS || {});
							$scope.imgUrl = $scope.compData.JS.recordtop.JS.imgUrl.replace(/'/g, '');
						};
						$scope.$on($attrs['cid'] + '_handleEvent', function (event, cevent, args, deferred) {
							if ($scope.eventMap[cevent]) {
								$scope.eventMap[cevent](args);
								if(null != deferred) {
									deferred.resolve();
								}
							}
						});
						$scope.eventMap['update'] = $scope.updateData;
						$scope.eventMap['error'] = $scope.errorData;
						$scope.eventMap['loading'] = $scope.loadingData;

					}
				],
				link : function ($scope, $element, $attrs, ctl) {
					$scope.pageID = ctl.pageID;
					$scope.componentType = 'page';
					$scope.init();
				}
			}
		}
	]);
uiCore.directive("popuppuretext",[function(){return{restrict:"AE",replace:true,require:"^pid",template:'<div class="c60_fbar_popuppuretext"><div class="c60_fbar_wchbg_pop_block"></div><div class="c60_fbar_wchpop_block"><div class="c60_fbar_wchimg_txt_title"><span class="c60_fbar_wchyidong" ng-style="pureTextStyle(\'title\')" ng-bind="pureTextText(\'title\')"></span></div><div class="c60_fbar_wchimg_txt_info"><div class="c60_fbar_wchpop_txt2"  ng-style="pureTextStyle(\'message\')" ng-bind-html="to_trusted(revData.message)"></div></div><div class="c60_fbar_wchimg_txt_btn clearfloat"><div class="c60_fbar_wchleft_itbtn"  ccid="c60_fbar_popuppuretext_btnclose"  ng-bind="pureTextText(\'cancel\')" ng-style="pureTextStyle(\'cancel\')"></div><div class="c60_fbar_wchright_itbtn"  ccid="c60_fbar_popuppuretext_btn" ng-bind="pureTextText(\'detail\')" ng-style="pureTextStyle(\'detail\')" ng-click = "goToOutSideUrl()"></div></div></div></div>',scope:{},controller:["$scope","$element","$attrs","$timeout","coreService","coreUtils","Const",function(i,j,h,d,c,e,b){i.cid=h.cid;i.compData={};i.eventMap={};i.revData={};i.to_trusted=function(k){return e.getTrustedHtml(k)};i.updateData=function(m){j.css({display:"block"});if(m!=null&&m!=undefined){if(m.message!=null&&m.message!=undefined){top.tlbs.messageid=m.messageid||"";i.revData.message=m.message}else{i.revData.message=""}if(m.campaign!=null&&m.campaign!=undefined){var k=m.campaign;i.revData.url=k.url||i.compData.JS.popupbtnconfig.JS.url;i.revData.linkType=k.linkType||i.compData.JS.popupbtnconfig.JS.linktype}else{i.revData.url=i.compData.JS.popupbtnconfig.JS.url;i.revData.linkType=i.compData.JS.popupbtnconfig.JS.linktype}if(!i.compData.JS.popupbtnconfig.JS.url){j[0].querySelector(".c60_fbar_wchright_itbtn").style.display="none";j[0].querySelector(".c60_fbar_wchleft_itbtn").style.width="100%"}}var l=i.compData.JS.closetime;if(top.tlbs.messageid!=""){d(function(){if(j.css("display")!="none"){top.tlbs.notificationCdrData=null}i.hide()},l)}};i.hide=function(){j.css({display:"none"})};var f=b.touchEvent.start,a=angular.element(j[0].querySelector(".c60_fbar_wchleft_itbtn"));a.bind(f,function(k){k.stopPropagation();k.preventDefault();_lastYPos=k.touches?k.touches[0].pageY:k.pageY;_lastXPos=k.touches?k.touches[0].pageX:k.pageX;j.css({display:"none"});if(top.tlbs.messageid!=""){c.fireEvent(i.cid,"messagestatuschange",{messageid:top.tlbs.messageid})}e.recordTracingCdr(i.pageID,e.createCdrid(i.pageID,"","closebtn"),i.compData.JS.popupbtnconfig.JS.cdrConfig);top.tlbs.notificationCdrData=null});i.goToOutSideUrl=function(){j.css({display:"none"});if(top.tlbs.messageid!=""){c.fireEvent(i.cid,"messagestatuschange",{messageid:top.tlbs.messageid})}i.compData.JS.popupbtnconfig.JS.linktype=i.compData.JS.popupbtnconfig.JS.linktype+"";c.fireEvent(j.attr("cid"),"gotoPage",{linktype:i.revData.linkType,url:i.revData.url});g(i.compData.JS.popupbtnconfig.JS.cdrConfig,e.createCdrid(i.pageID,"","returnbtn"),"1")};i.pureTextStyle=function(k){if(k!=null&&k!=undefined){switch(k){case"title":return i.compData.JS.popuptitleconfig.JS.stateconfig.state;break;case"cancel":return i.compData.JS.popupbtnconfig.JS.stateconfig.state0;break;case"detail":return i.compData.JS.popupbtnconfig.JS.stateconfig.state1;break;case"message":return i.compData.JS.popupcolorconfig.JS.stateconfig.state;break;default:break}}};i.pureTextText=function(k){if(k!=null&&k!=undefined){switch(k){case"title":return i.compData.JS.popuptitleconfig.JS.stateconfig.title;break;case"cancel":return i.compData.JS.popupbtnconfig.JS.stateconfig.title0;break;case"detail":return i.compData.JS.popupbtnconfig.JS.stateconfig.title1;break;default:break}}};i.init=function(){c.registerComponentInstance(j.attr("cid"),i);var k=c.getInitProperties(h.cid)||{};i.compData=e.extendDeep(i.compData,k);c.fireEvent(j.attr("cid"),"init")};function g(l,m,k){if(e.cdrUtils.canWriteUITracingCDR(l)){i.compData.JS.cdrData={};i.compData.JS.cdrData={pageId:i.pageID,componentId:m,iseComp:k,};e.cdrService(l.uitracingcdr,i.compData.JS.cdrData)}}i.$on(h.cid+"_handleEvent",function(m,n,l,k){if(i.eventMap[n]){i.eventMap[n](l);if(null!=k){k.resolve()}}});i.eventMap.update=i.updateData}],link:function(d,b,a,c){d.pageID=c.pageID;d.componentType="popuppuretext";d.init()}}}]);
uiCore.directive("redenveloperecharge",[function(){return{restrict:"AE",replace:true,require:"^pid",template:'<div class="c60_fbar_recharge_main"><form name="redenveloperechargeFrm" class="c60_fbar_recharge_form"><div simplescroll><div class="c60_fbar_recharge_username"><div class="c60_fbar_phone" ng-bind="rechargeUser"></div><div class="c60_fbar_pone_title" ng-style="compData.JS.user_icon.CSS" ng-bind="compData.JS.user_icon.JS.text" ng-click="gotopage()"></div></div><div class="c60_fbar_recharge_choose"><div class="c60_fbar_choose_title"><div ng-bind="compData.JS.recharge_choose.JS.rechargetitle"></div><div ng-bind="compData.JS.recharge_choose.JS.rechargetheory"></div></div><div class="c60_fbar_choose_box"><div class="c60_fbar_normal_value"><div class="c60_fbar_choose_value" ng-repeat="rechargeValue in rechargeValues"><div class="c60_fbar_choose_value_box" ng-click="clickItem($index)"><div class="c60_fbar_choose_value_coin" href="#" ng-style="getStyle($index)" ng-bind-html="getcoin(compData.JS.recharge_choose.JS.coinText,rechargeValue.amount)"></div></div></div></div><div class="c60_fbar_other_value" ng-style="getStyleInputField()" ng-if="false"><div ng-bind="compData.JS.other_value.JS.othervalue"></div><input class="c60_fbar_other_value_quantity" type="number" name="trafficDataCoinNums" ng-change="inputValue()" placeholder="{{compData.JS.other_value.JS.placeholder}}" ng-focus="focus()" ng-model="val" positive-integer /><div ng-bind="compData.JS.other_value.JS.num"></div></div><div class="c60_fbar_confirm_pay">         <div class="c60_fbar_confirm_pay_centent"><div ng-bind="compData.JS.error_massage.JS.warning+compData.JS.errorMsg" ng-style="compData.JS.error_massage.CSS" ng-show="showErrorMsg(redenveloperechargeFrm)"></div><div class="c60_fbar_confirm_pay_btn" ng-style="compData.JS.confirm_pay.CSS" ng-click="confirmPayNum()"><div class="c60_fbar_confirm_pic" ng-style="compData.JS.confirm_btn.CSS"  href="#"></div><div class="c60_fbar_confirm_massage" ng-bind="compData.JS.confirm_btn.JS.text"></div></div>          </div>          <div class="c60_fbar_coin_message"><div ng-bind-html="getHtml(compData.JS.realfee.JS.realfeetext,compData.JS.realfee.JS.realfee)"></div>          </div></div><div class="c60_fbar_recharge_button"><button href="#" ng-disabled="compData.JS.recharge_btn.disabled" ng-style="compData.JS.recharge_btn.CSS" ng-bind="compData.JS.recharge_btn.JS.btntext" ng-click="rechargeClick()"></button></div></div><div class="c60_fbar_recharge_bottom"></div></div></div></form></div>',scope:{},controller:["$scope","$element","$attrs","coreService","coreUtils","Const",function(j,k,h,b,c,a){j.cid=h.cid;j.compData={CSS:{},JS:{}};j.eventMap={};var i=0;var g=false;var e=true;var l=true;var d;j.init=function(){b.registerComponentInstance(k.attr("cid"),j);var m=b.getInitProperties(h.cid)||{};j.compData=c.extendDeep(j.compData||{},m)};j.$on(h.cid+"_handleEvent",function(o,p,n,m){if(j.eventMap[p]){j.eventMap[p](n);if(null!=m){m.resolve()}}});j.getcoin=function(m,o){var n=m;n=c.mergeParameter4Html(n,o);return n};j.getHtml=function(m,o){var n=m;n=c.mergeParameter4Html(n,o);return n};j.initDate=function(){e=true;j.compData.JS.realfee.JS.realfee=0;j.compData.JS.recharge_btn.CSS={};j.compData.JS.recharge_btn.disabled=true;j.val="";j.compData.JS.confirm_btn.CSS=j.compData.JS.confirm_btn_disabled.CSS;j.rechargeUser="***********"};j.updataData=function(m){if(!m||!m.respparam||!m.respparam.trafficcoin||!m.respparam.trafficcoin.rechargetoken||!m.respparam.trafficcoin.rechargeuser||!m.respparam.trafficcoin.rechargedata||!m.respparam.trafficcoin.rechargedata.length||!m.respparam.trafficcoin.rechargerate){b.fireEvent(h.cid,"error");return}j.rechargeValues=m.respparam.trafficcoin.rechargedata;j.rechargeUser=m.respparam.trafficcoin.rechargeuser;j.rechargeRate=m.respparam.trafficcoin.rechargerate;j.rechargetoken=m.respparam.trafficcoin.rechargetoken};j.gotopage=function(){b.fireEvent(h.cid,"gotoPage");f("user_icon")};j.getChargeItem=function(m){if(m&&m.index&&m.length){j.index=m.index;i=j.index;return}i=0};j.getStyle=function(m){if(i===m){return j.compData.JS.choose_coin_active.CSS}else{return j.compData.JS.choose_coin_normal.CSS}};j.clickItem=function(m){i=m;g=false;e=true;j.compData.JS.recharge_btn.disabled=true;j.compData.JS.confirm_btn.CSS=j.compData.JS.confirm_btn_disabled.CSS;j.compData.JS.recharge_btn.CSS={};j.compData.JS.realfee.JS.realfee=0;j.val="";f("coin")};j.focus=function(){g=true;i=-1;j.compData.JS.confirm_btn.CSS=j.compData.JS.confirm_btn_disabled.CSS;j.compData.JS.recharge_btn.CSS={};e=false;j.compData.JS.recharge_btn.disabled=true};j.getStyleInputField=function(){if(g){return j.compData.JS.input_focus.CSS}else{return j.compData.JS.input_blur.CSS}};j.inputValue=function(){l=false;if(j.val>0){e=true}d=j.val};j.showErrorMsg=function(m){if(l){return false}if(m.trafficDataCoinNums.$invalid){j.compData.JS.errorMsg=j.compData.JS.error_massage.JS.interror_massage;j.compData.JS.error_massage.CSS.display="blcok";j.compData.JS.confirm_pay.CSS.display="none"}else{if(j.val>j.compData.JS.error_massage.JS.maxvalue){j.compData.JS.errorMsg=j.compData.JS.error_massage.JS.maxvalue_massage;j.compData.JS.error_massage.CSS.display="blcok";j.compData.JS.confirm_pay.CSS.display="none";return m.$invalid=true}else{j.compData.JS.confirm_pay.CSS.display="block"}}return m.$invalid};j.confirmPayNum=function(){if(j.compData.JS&&j.compData.JS.confirm_btn&&e&&!g){j.chooseSuccess();e=false;f("confirm_pay_btn")}else{if(j.compData.JS&&j.compData.JS.confirm_btn&&e&&g&&j.val<=j.compData.JS.error_massage.JS.maxvalue){b.fireEvent(k.attr("cid"),"otherinput",{amount:j.val});e=false}else{j.compData.JS.confirm_btn.CSS=j.compData.JS.confirm_btn_disabled.CSS;j.compData.JS.recharge_btn.CSS={};j.compData.JS.recharge_btn.disabled=true;e=true}}};j.chooseSuccess=function(){j.compData.JS.confirm_btn.CSS=j.compData.JS.confirm_btn_active.CSS;j.compData.JS.recharge_btn.disabled=false;j.compData.JS.recharge_btn.CSS=j.compData.JS.recharge_btn_active.CSS;var m=j.rechargeRate;d=j.rechargeValues[i].amount;var o=j.rechargeValues[i].discount;var n=(m*d*(1-o)).toFixed(2);j.compData.JS.realfee.JS.realfee=n};j.otherval=function(m){if(m&&m.respparam&&m.respparam.trafficcoin&&m.respparam.trafficcoin.realFee&&m.respparam.trafficcoin.result==0){j.compData.JS.confirm_btn.CSS=j.compData.JS.confirm_btn_active.CSS;j.compData.JS.recharge_btn.disabled=false;j.compData.JS.recharge_btn.CSS=j.compData.JS.recharge_btn_active.CSS;j.compData.JS.realfee.JS.realfee=m.respparam.trafficcoin.realFee}else{b.fireEvent(h.cid,"error",{errorcode:"-1"})}};j.rechargeClick=function(){j.compData.JS.recharge_btn.CSS={};j.compData.JS.recharge_btn.disabled=true;b.fireEvent(k.attr("cid"),"recharge",{token:j.rechargetoken,amount:d});e=true;g=false;j.compData.JS.realfee.JS.realfee=0;j.val="";j.compData.JS.confirm_btn.CSS=j.compData.JS.confirm_btn_disabled.CSS;f("recharge_button")};function f(m){c.recordTracingCdr(j.pageID,h.cid+"_"+m,j.compData.JS.redenvelopeRechargeCrd.cdrConfig)}j.eventMap.update=j.updataData;j.eventMap.initDate=j.initDate;j.eventMap.otherValue=j.otherval;j.eventMap.getChargeItem=j.getChargeItem}],link:function(d,b,a,c){d.pageID=c.pageID;d.componentType="redenveloperecharge";d.init()}}}]);
uiCore.directive("iapplink",["coreService","coreUtils","$timeout",function(c,a,b){return{restrict:"AE",replace:true,transclude:true,template:'<div id="mainholder" ccid="mainholder"><ul class="c60_fbar_app_list"><li id="innerholder" ccid="c60_fbar_gcapplink" ng-style="getInnerholderStyle(app.JS.id)" ng-repeat="app in arrays" ng-click="appLinkClick(app.JS.id)"><div id="c60_fbar_appwrap" class="c60_fbar_appwrap" ng-style="getappwrapstyle()"><div class="c60_fbar_appimgwrap" ng-style="getConfigStyle(app.JS.id)"><div class="c60_fbar_app_textwrap" style="width:53%;float:right"><h5 id="appname" ng-style="getStyles(\'appname\')">{{app.JS.appname.JS.text}}</h5><p id="appdesc"  ng-style="getStyles(\'appdesc\')">{{app.JS.appdesc.JS.text}}</p></div></div></div></li></ul></div>',scope:{param:"=param"},require:"^pid",controller:["$scope","$element","$attrs",function(f,e,d){f.cid=d.cid;f.classid="."+f.cid;f.eventMap={};f.compData={};f.extendComponentData=function(j){a.extendDeep(f.compData,j);f.arrays=[];if(f.compData&&f.compData.JS){var g=f.compData.JS.text.JS.len;for(var h=0;h<g;h++){f.arrays.push(f.compData.JS[(f.compData.JS.text.JS["text"+h])])}}};f.getappwrapstyle=function(){if(f.arrays.length==1){return{width:"53%",margin:"0 auto"}}else{return{width:"100%",margin:"0 auto"}}};f.getInnerholderStyle=function(g){if(g){if(f.compData.JS[g]&&f.compData.JS[g].JS){return f.compData.JS[g].JS.innerholder.CSS}}};f.getStyles=function(g){if(g){if(f.compData.JS[g]&&f.compData.JS[g].CSS){return f.compData.JS[g].CSS}}};f.getConfigStyle=function(g){if(g){if(f.compData.JS[g]&&f.compData.JS[g].JS){return f.compData.JS[g].JS.iconholder.CSS}}};f.init=function(){c.registerComponentInstance(f.cid,f);f.extendComponentData(c.getInitProperties(f.cid));f.processConfig()};f.appLinkClick=function(g){if(g){a.recordTracingCdr(f.pageID,d.cid+"_"+g,f.compData.JS[g].JS.mainholder.JS.cdrConfig);c.fireEvent(f.cid,g+"Click")}};f.processConfig=function(){if(f.compData&&f.compData.JS){e.css(f.compData.CSS);angular.element(e[0].querySelector('[id="appname"]')).css(f.compData.JS.appname.CSS);angular.element(e[0].querySelector('[id="appdesc"]')).css(f.compData.JS.appdesc.CSS)}};f.$on(f.cid+"_handleEvent",function(j,h,i,g){f.eventMap[h](i,g);if(null!=g){g.resolve()}});f.hide=function(){f.compData.CSS.display="none";e.css(f.compData.CSS)};f.show=function(){f.compData.CSS.display="block";e.css(f.compData.CSS)};f.eventMap.show=f.show;f.eventMap.hide=f.hide}],link:function(f,e,d,g){f.pageID=g.pageID;f.componentType="iapplink";f.init()}}}]);
uiCore.directive("dashboard",[function(){return{restrict:"AE",replace:true,require:"^pid",template:'<div class="c60_fbar_cesu_con_wrapper"><div class="c60_fbar_cesu_con" simplescroll><ul class="c60_fbar_cs_toptitle c60_fbar_clearfloat"><li><div class="c60_fbar_cs_toptitle_uptxt" ng-bind=compData.js.networktitle></div><div class="c60_fbar_cs_toptitle_downtxt" ng-bind=compData.js.network></div></li><li><div class="c60_fbar_cs_toptitle_uptxt" ng-bind=compData.js.speedtitle></div><div class="c60_fbar_cs_toptitle_downtxt" ng-bind=compData.js.speed></div></li></ul><div class="c60_fbar_cs_plate"><div class="c60_fbar_cs_plate_bg"><div class="c60_fbar_cs_plate_point"></div><div class="c60_fbar_cs_plate_circle1"></div><div class="c60_fbar_cs_plate_uptxt" ng-bind=compData.js.network></div><div class="c60_fbar_cs_plate_downtxt"><div class="c60_fbar_cs_plate_downtxt_num" ng-bind=compData.js.speedvalue></div><div class="c60_fbar_cs_plate_downtxt_unit" ng-bind=compData.js.speedunit></div></div></div></div><div class="c60_fbar_cs_btn" ><span ng-click=speedtest() class="c60_fbar_cs_btn_link" ccid="c60_fbar_cs_btn_link" ng-bind=compData.js.btntext></span></div><div class="c60_fbar_cs_result"><div class="c60_fbar_cs_result_tit" ng-bind=compData.js.result></div><div class="c60_fbar_csr_imgtxt c60_fbar_clearfloat"><div class="c60_fbar_csr_imgtxt_left"><span class="c60_fbar_csr_imgtxt_left_img"><img class="c60_fbar_csr_img_feiji" ng-src="{{compData.js.resultimg}}" alt=""></span></div><div class="c60_fbar_csr_imgtxt_right"><div class="c60_fbar_csr_itr_uptxt"><span ng-bind=compData.js.desc></span><span class="c60_fbar_csr_itr_orangetxt" ng-bind=compData.js.traffic></span><span class="c60_fbar_csr_itr_orangetxt" ng-bind=compData.js.inter>/S<span></div><div class="c60_fbar_csr_itr_downtxt"><span ng-bind=compData.js.detail1></span><span class="c60_fbar_csr_itr_orangetxt" ng-bind=compData.js.percent></span><span ng-bind=compData.js.detail2></span></div></div></div><div class="c60_fbar_cs_result_progess"><div class="c60_fbar_csr_progess_line"><div class="c60_fbar_csr_plt_line2 c60_fbar_csr_bg_73d7bd"></div><div class="c60_fbar_csr_plt_con"><span class="c60_fbar_csr_plt_ico" ng-repeat="image in imagelist"><img class="c60_fbar_csr_pl_ico c60_fbar_csr_bg_dcdcdc" ng-style="{{image.style}}" ng-src="{{image.src}}" alt=""/></span></div></div></div></div><div class="c60_fbar_cs_tips"><div class="c60_fbar_cs_tips_tit" ng-bind=compData.js.tipstitle></div><div class="c60_fbar_cs_tips_txt" ng-bind=compData.js.tips></div></div></div></div>',scope:{},controller:["$scope","$element","$attrs","coreService","coreUtils","Const",function(m,n,k,b,c,a){m.eventMap={};m.compData={};m.testing=false;var d="btnlink";var f=angular.element(n[0].querySelector(".c60_fbar_csr_plt_line2"));var g=angular.element(n[0].querySelector(".c60_fbar_cs_btn_link"));var j=angular.element(n[0].querySelector(".c60_fbar_csr_imgtxt_left_img"));var o=angular.element(n[0].querySelector(".c60_fbar_cs_result"));var e=angular.element(n[0].querySelector(".c60_fbar_cs_tips"));var i=angular.element(n[0].querySelector(".c60_fbar_cs_plate_point"));var h=function(){try{var u=top.document.styleSheets;var q=null;var p=0;for(var r=u.length-1;r>=0;r--){if(u[r].cssRules&&u[r].title!="toolbar"){q=u[r];p=u[r].cssRules.length;break}}var t;try{t="@-webkit-keyframes speedpoint_animation {0% {-webkit-transform: rotate(35deg);} 25% { -webkit-transform: rotate(135deg);} 50% {-webkit-transform: rotate(235deg);} 75% {-webkit-transform: rotate(135deg);} 100% {-webkit-transform: rotate(35deg);}}";q.insertRule(t,p)}catch(s){try{t="@keyframes speedpoint_animation {0% {transform: rotate(35deg);} 25% {transform: rotate(135deg);} 50% {transform: rotate(235deg);} 75% {transform: rotate(135deg);} 100% {transform: rotate(35deg);}}";q.insertRule(t,p)}catch(s){try{t="@-moz-keyframes speedpoint_animation {0% {-moz-transform: rotate(35deg);} 25% { -moz-transform: rotate(135deg);} 50% {-moz-transform: rotate(235deg);} 75% {-moz-transform: rotate(135deg);} 100% {-moz-transform: rotate(35deg);}}";q.insertRule(t,p)}catch(s){try{t="@-o-keyframes speedpoint_animation {0% {-o-transform: rotate(35deg);} 25% { -o-transform: rotate(135deg);} 50% {-o-transform: rotate(235deg);} 75% {-o-transform: rotate(135deg);} 100% {-o-transform: rotate(35deg);}}";q.insertRule(t,p)}catch(s){throw s}}}}}catch(s){}};m.init=function(){b.registerComponentInstance(n.attr("cid"),m);var p=b.getInitProperties(k.cid)||{};m.compData.css=p.CSS||{};m.compData.js=p.JS||{};m.compData.js.btntext=m.compData.js.beforetesttext;n.css(m.compData.css);h()};m.update=function(p){m.compData.js=c.extendDeep(m.compData.js,p.respparam)};m.getState=function(w){var r=m.compData.js.speedconfig;var s={};var u;var q;var p;for(var t=0;t<10;t++){var v=r["state"+t];if(v){if(v.maxvalue&&v.minvalue){q=Number(v.maxvalue);p=Number(v.minvalue);basepercent=Number(r["state"+(t-1)].percent);if(w<=q&&w>p){u=basepercent+(v.percent-basepercent)*(w-p)/(q-p);s={state:v,index:t,percent:u};break}}else{if(v.maxvalue){q=Number(v.maxvalue);if(w<=q){u=v.percent*w/q;s={state:v,index:t,percent:u};break}}else{if(v.minvalue){if(w>Number(v.minvalue)){s={state:v,index:t,percent:v.percent};break}}}}}else{break}}return s};m.getImagelist=function(r){var q=m.compData.js.speedconfig;var p=[];var u;for(var s=0;s<10;s++){var t=q["state"+s];if(t){u={};u.src=t.imagesrc.replace(/'/g,"");if(s<=r){u.style=m.compData.js.levelcss||{"background-color":"#73d7bd"}}else{u.style=m.compData.js.nolevelcss||{"background-color":"#dcdcdc"}}p.push(u)}else{break}}return p};m.speedtest=function(){l(d);if(m.testing){return}m.testing=true;m.compData.js.btntext=m.compData.js.testingtext;g.css(m.compData.js.testingcss||{"background-color":"#dcdcdc"});i.attr("class","c60_fbar_cs_plate_point c60_fbar_speedpoint_animation");var y;var r;var D;var C;var x="KB";var t="/S";var v=m.compData.js.fileurl;var z=m.compData.js.filesize;var F;var s;var u;var p=new Image();var w=null;var B=function(H,K){var J=K||2;var L=10;var M=[];for(var I=0;I<J-1;I++){M.push("0")}for(var I=1;I<J;I++){if(H<L){return M.join("")+H}L=L*10;M.pop()}return H};var E=function(I){var H=[];H.push(I.getFullYear());H.push(B(I.getMonth()+1));H.push(B(I.getDate()));H.push(B(I.getHours()));H.push(B(I.getMinutes()));H.push(B(I.getSeconds()));H.push(B(I.getMilliseconds(),3));return H.join("")};var G=function(M){var O=[0,64,128,256,512,1024,2048,5120,10240];var J=15;var I=30;var L=0;var N=0;for(;L<O.length;L++){if(M<O[L]){break}}if(L==O.length){L=O.length-1}var K=O[L];var H=O[L-1];N=30*(L-1)+30*(M-H)/(K-H);if(N>240){N=245}return N};var q=function(){i.attr("class","c60_fbar_cs_plate_point");A();m.testing=false;m.imagelist=m.getImagelist(-1);m.compData.js=c.extendDeep(m.compData.js,{speed:"--",speedvalue:"0.00",speedunit:"KB/S",desc:m.compData.js.faildesctext,traffic:"",inter:"",detail1:m.compData.js.faildetail1text,detail2:"",resultimg:m.compData.js.failimagesrc.replace(/'/g,""),percent:""});m.testing=false;m.compData.js.btntext=m.compData.js.aftertesttext;g.css(m.compData.js.testedcss||{"background-color":"#73d7bd"});f.css({width:"0%"});j.css({"background-color":"#dcdcdc"});m.$apply();o.css({display:"block"});e.css({display:"none"});b.fireEvent(n.attr("cid"),"updatefail")};p.onload=function(){try{A();r=new Date();D=r.getTime()-y.getTime();var J=(z*1000)/(D*1024);var H=c.trafficValueTransfer(J,Number(m.compData.js.floatnum||2));C=H.v;x=H.u;F=m.getState(J);s=F.state;u=F.index;m.imagelist=m.getImagelist(u);m.compData.js=c.extendDeep(m.compData.js,{speed:C+x+t,speedvalue:C,speedunit:x+t,desc:s.desc||m.compData.js.desctxt,traffic:C+x,inter:t,detail1:s.detail1||m.compData.js.detail1txt,detail2:s.detail2||m.compData.js.detail2txt,resultimg:s.imagesrc.replace(/'/g,""),percent:c.formatNum(F.percent,Number(m.compData.js.floatnum||2))+"%"});f.css({width:Math.min(Number(s.linewidthpercent),100)+"%"});j.css({"background-color":"#73d7bd"});m.testing=false;m.compData.js.btntext=m.compData.js.aftertesttext;g.css(m.compData.js.testedcss||{"background-color":"#73d7bd"});m.$apply();o.css({display:"block"});e.css({display:"none"});var I="rotate("+G(J)+"deg)";i.css({"-webkit-transform":I,transform:I,"-moz-transform":I,"-o-transform":I});i.attr("class","c60_fbar_cs_plate_point");b.fireEvent(n.attr("cid"),"updatesucess",{testStartTime:E(y),testEndTime:E(r),testSpeed:J,range:F.percent,text:m.compData.js.speed})}catch(K){q()}};var A=function(){if(w){p.onload=null;p.onerror=null;clearTimeout(w);w=null}};p.onerror=q;w=setTimeout(q,Number(m.compData.js.timeout||5)*1000);y=new Date();p.src=v+"?"+new Date().getTime()};function l(p){if(c.cdrUtils.canWriteUITracingCDR(m.compData.js.speedpageCdr.cdrConfig)){m.compData.js.cdrData={};m.compData.js.cdrData={pageId:m.pageID,componentId:n.attr("cid")+"_"+p,};c.cdrService(m.compData.js.speedpageCdr.cdrConfig.uitracingcdr,m.compData.js.cdrData)}}m.eventMap.update=m.update;m.$on(k.cid+"_handleEvent",function(r,s,q,p){if(m.eventMap[s]){m.eventMap[s](q);if(null!=p){p.resolve()}}})}],link:function(d,b,a,c){d.pageID=c.pageID;d.componentType="dashboard";d.init()}}}]);
uiCore.directive("pid",function(){return{restrict:"E",replace:false,template:"<div></div>",controller:["$scope","$element","$attrs",function(c,b,a){this.pageID=a.pid}]}});
uiCore.directive("result",[function(){return{restrict:"AE",replace:true,require:"^pid",template:'<div class="c60_fbar_result_root" ng-show="compData.JS.resultConfigInfo.show || compData.JS.popupMsgConfig.show">	<div class="c60_fbar_result_page" ng-show="compData.JS.resultConfigInfo.show">		<div class="c60_fbar_result_image_wrapper">			<span class="c60_fbar_result_image" ng-style="getStyle4Image()" /></span>		</div>		<div class="c60_fbar_tips_txt1" ng-bind-html="getTipsHtml()"></div>		<div class="c60_fbar_result_btn_wrapper" ccid="c60_fbar_link_btn">			<div class="c60_fbar_result_button" ng-click="clickButton(compData.JS.resultConfigInfo.action)" ng-if="compData.JS.resultConfigInfo.btntxt" id="c60_fbar_result_btn_id"  ng-style="getStyle4Button()" ng-bind="compData.JS.resultConfigInfo.btntxt"></div>		</div>	</div>	<div class="c60_fbar_result_popup_message" ng-style="getStyle4PopupMsg()" ng-show="compData.JS.popupMsgConfig.show">		<span class="c60_fbar_result_popup_msg_text" ng-bind="compData.JS.popupMsgConfig.message"></span>	</div></div>',scope:{},controller:["$scope","$element","$attrs","coreService","coreUtils","Const","$timeout",function(r,q,h,u,d,l,w){r.cid=h.cid;r.compData={CSS:{},JS:{popupMsgConfig:{show:false},resultConfigInfo:{show:false}}};r.eventMap={};r.gobackClick=function(){};var v="弹出消息";var i=2000;var g="default";var k="errorcode";var s="resultText";var m="showIntfMsgCode";r.init=function(){u.registerComponentInstance(q.attr("cid"),r);var z=u.getInitProperties(h.cid)||{};r.compData=d.extendDeep(r.compData||{},z);q.css(r.compData.CSS||{});a();y("init")};r.getTipsHtml=function(){return d.getTrustedHtml(r.compData.JS.resultConfigInfo.tipstxt)};function y(A,z){u.fireEvent(q.attr("cid"),A,z)}var c=function(B,z){if(z==r.compData.JS.resultsconfig.JS[m]){z=g}var A=r.compData.JS.resultsconfig.JS[z];if(!A){A=r.compData.JS.resultsconfig.JS[g]}return A};var x=function(D,A,B,z){var E=r.compData.JS.resultsconfig.JS[m];if(E&&z!=E){return A.tipstxt}var C=d.getDynamicParam(D,B);if(!C){C=A.tipstxt}return C};var n=function(B,z){var A=d.getDynamicParam(B,z);if(null==A||undefined==A){A=g}return A};var e=function(D,z,C){var B=n(D,z);var A=c(D,B);A.imgUrl=A.imgUrl.replace(/'/g,"");r.compData.JS.resultConfigInfo=A;r.compData.JS.resultConfigInfo.tipstxt=x(D,A,C,B);r.compData.JS.resultConfigInfo.show=true;y("changebackbtn",{state:A.backaction||"0"})};var t=function(z){e(z,k,s)};var j=function(A){var z=r.compData.JS.resultsconfig;e(A,z.resultCodePath,z.resultMsgPath)};var p=function(z){try{var A=new RegExp("(^|&)"+z+"=([^&]*)(&|$)","i");var B=top.window.location.search.substr(1).match(A);if(B!=null){return unescape(B[2])}return""}catch(C){}};r.clickButton=function(z){if(z=="0"){if(p("appkey")&&p("subscribeid")){y(h.event||"click1")}else{y(h.event||"click0")}}else{if(z=="1"){o();y(h.event||"click1")}else{if(z=="2"){y(h.event||"click2")}else{if(z=="3"){o()}}}}if(r.compData.JS.c60_fbar_link_btn){d.recordTracingCdr(r.pageID,d.createCdrid(r.pageID,h.cid,"returnbtn"),r.compData.JS.c60_fbar_link_btn.JS.cdrConfig)}};var a=function(){r.compData.JS.popupMsgConfig=r.compData.JS.popupMsgConfig||{};r.compData.JS.popupMsgConfig.message=r.compData.JS.popupMsgConfig.message||v;r.compData.JS.popupMsgConfig.timeout=r.compData.JS.popupMsgConfig.timeout||i;r.compData.JS.popupMsgConfig.position=r.compData.JS.popupMsgConfig.position||{}};r.getStyle4PopupMsg=function(){if(!r.compData.JS.popupMsgConfig.position){return{}}else{return r.compData.JS.popupMsgConfig.position}};r.getStyle4Image=function(){if(!r.compData.JS.resultConfigInfo){return{}}var A="url('"+r.compData.JS.resultConfigInfo.imgUrl+"')";var B={};B["background-image"]=A;if(r.compData.JS.resultConfigInfo.imgSize){B["background-size"]=r.compData.JS.resultConfigInfo.imgSize;var z=r.compData.JS.resultConfigInfo.imgSize.split(" ");B.width=z[0];B.height=z[1]}return B};r.getStyle4Button=function(){var z={};if(!r.compData.JS.resultConfigInfo||!r.compData.JS.resultConfigInfo.btnStyle){return z}z=r.compData.JS.resultConfigInfo.btnStyle;return z};function o(){r.compData.JS.resultConfigInfo.show=false;r.compData.JS.popupMsgConfig.show=false}var b=function(z){if(!z){return}r.compData.JS.popupMsgConfig.show=true;r.compData.JS.popupMsgConfig.message=z.message||r.compData.JS.popupMsgConfig.message;w(function(){r.compData.JS.popupMsgConfig.show=false},r.compData.JS.popupMsgConfig.timeout)};r.$on(h.cid+"_handleEvent",function(B,C,A,z){if(r.eventMap[C]){r.eventMap[C](A);if(null!=z){z.resolve()}}});function f(){var z=l.touchEvent.end;var A=angular.element(q[0].querySelector("#c60_fbar_result_btn_id"));A.bind(z,function(B){B.stopPropagation();B.preventDefault();r.clickButton(r.compData.JS.resultConfigInfo.action)})}r.eventMap.showResult=t;r.eventMap.showCtzResult=j;r.eventMap.hide=o;r.eventMap.popupMessage=b}],link:function(d,b,a,c){d.pageID=c.pageID;d.componentType="page";d.init()}}}]);
uiCore.directive('lifeservices', [function () {
			return {
				restrict : 'AE',
				replace : true,
				require : '^pid',
				template : '<div class="c60_lifeservices"><div class="c60_lifeservicesscrollc" ><div class="c60_lifeservicesscroll" ng-style="getStyle(\'scroll\')" simplescroll>'
					         +'<div class="c60_lifeservicesbanner" ng-style="getStyle(\'banner\')" ng-show="compData.JS.banner.JS.isShow&&bannerisShow"  >'
					                +'<ul class="c60_lsbannerul" id="c60_lsbannerul" ng-style="getStyle(\'bannerul\')"><li class="c60_lsbannerli" ng-style="getStyle(\'bannerli\')" ng-repeat="item in banner" ng-click="clickbanner(item.linktype,item.url,$index);$event.stopPropagation();" ><img ng-src="{{item.imgurl}}"  ccid="c60_lifeservicesbannerimg"  width="100%" class="c60_lifeservicesbannerimg" ng-style="getStyle(\'bannerimg\')" ></li></ul>'
					                +'<dl class="c60_lsbannerdl" ng-style="getStyle(\'bannerdl\')"  ng-show="compData.JS.bannerdl.JS.isShow" ><dd class="c60_lsbannerdd" ng-style="getStyle(\'bannerdd\')" ng-repeat="item in banner" >&nbsp;</dd></dl>'
					         +'</div>'
					         +'<div class="c60_hotwordscontent"  ng-show="compData.JS.hotwordscontent.JS.isShow&&hotwordscontentisShow"  ng-style="getStyle(\'hotwordscontent\')" >'
					             +'<div class="c60_baiduhotwords" id="c60_baiduhotwords">'
					         +'</div>'
					         +'</div>'
					         +'<div class="c60_lifeservicesmovie" ng-style="getStyle(\'movie\')" ng-show="compData.JS.movie.JS.isShow&&movieisShow" >'
					             +'<div class="c60_lsmovietitlecontent" ng-style="getStyle(\'movietitlecontent\')"><span class="c60_lsmovietitle" ng-style="getStyle(\'movietitle\')" ng-bind="movietitle"></span><span class="c60_lsmoviesubtitle" ng-style="getStyle(\'moviesubtitle\')" ng-bind="moviesubtitle"></span></div>'
						         +'<div class="c60_lsmoviecontent" ng-style="getStyle(\'moviecontent\')">'
					                +'<ul  class="c60_lsmoviecontentul" id="c60_lsmoviecontentul" ng-style="getStyle(\'movieul\')"><li ng-style="getStyle(\'movieli\')"  ng-repeat="item in movie" ><img ng-src="{{item.imgurl}}"  ng-click="clickmovie($index);$event.stopPropagation();" ccid="c60_lifeservicesmovieimg"  width="100%" class="c60_lifeservicesmovieimg" ng-style="getImgStyle($index)" ><span class="c60_lifeservicesmoviearrow"  ng-style="getStyle(\'moviearrow\')"  ng-show="$index==currentmovieindex"></span><span class="c60_lifeservicesmoviearrow2"  ng-style="getStyle(\'moviearrow2\')"  ng-show="$index==currentmovieindex"></span></li></ul>'
						         +'</div>'
						         +'<div class="c60_lsmoviemsg" ng-style="getStyle(\'moviemsg\')"><span class="c60_lsmoviename" ng-style="getStyle(\'moviename\')" ng-bind="moviename"></span><span class="c60_lsmoviescore" ng-style="getStyle(\'moviescore\')" ng-bind="moviescore"></span><p class="c60_lsmoviebtn" ng-style="getStyle(\'moviebtngo\')" ng-click="moviebtnclick();$event.stopPropagation();" ng-bind="compData.JS.moviebtngo.JS.text"></p></div>'
					         +'</div>'
					       +'</div></div></div>',
             scope : {},
		controller : ["$scope", "$element", "$attrs", 'coreService','coreUtils','Const','$timeout',
					function ($scope, $element, $attrs, coreService, coreUtils, Const,$timeout) {
						$scope.cid = $attrs.cid;
						$scope.compData = {
							CSS : {},
							JS : {}
						};
						$scope.eventMap = {};
						$scope.errorData = function (param) {}
						
		                $scope.getStyle = function(input) {
		                    if ($scope.compData.JS[input] && $scope.compData.JS[input].CSS) {
		                        return $scope.compData.JS[input].CSS;
		                    }
		                };
						$scope.updateData = function (param) {
							$element.css({
								"display" : "block"
							});
							  $scope.lifeservicesscrolltransform();
							   if(param.respparam!= null && param.respparam != undefined && param.respparam != "") {				            	 
								   if(param.respparam.bannerlist!= null && param.respparam.bannerlist!= undefined && param.respparam.bannerlist!= ""){	
									    $scope.bannerisShow=true;	
									    if($scope.compData.JS.banner.JS.isShow){
											$scope.banner=param.respparam.bannerlist;	
											$scope.bannerpoint(0);
											$scope.bannerinit($scope.banner);				
									    }
									}else{
										$scope.bannerisShow=false;
									}
									if(param.respparam.frameurl!= null && param.respparam.frameurl!= undefined && param.respparam.frameurl!= ""){									
											    $scope.hotwordscontentisShow=true;	
											    $scope.hotwordsurl=param.respparam.frameurl;
												//$scope.baiduiframe=angular.element($element[0].querySelector('.c60_baiduhotwords'));
												//$scope.baiduiframe.removeAttr('src');
												if($scope.compData.JS.hotwordscontent.JS.isShow){
													angular.element($element[0].querySelector('.c60_baiduhotwords')).empty();
												    var obj = angular.element($element[0].querySelector('.c60_baiduhotwords'));
												    var variables = document.createElement("script"),oScript = document.createElement("script"); 
												    variables.type = "text/javascript";
												    oScript.type = "text/javascript";
												    variables.charset = "UTF-8";
												    oScript.charset = "UTF-8";
												    variables.innerHTML = "var cpro_psid = '"+$scope.compData.JS["baiduhotwords"].JS["cpro_psid"]+"';var cpro_pswidth = '"+$scope.compData.JS["baiduhotwords"].JS["cpro_pswidth"]+"';var cpro_psheight = "+parseInt($scope.compData.JS["baiduhotwords"].JS["cpro_psheight"])+";";
												    oScript.src=$scope.hotwordsurl.replace(/(^\s*)|(\s*$)/g, ""); 
												    angular.element($element[0].querySelector('.c60_baiduhotwords')).append(variables);
												    angular.element($element[0].querySelector('.c60_baiduhotwords')).append(oScript)
											}
													
									}else{	
										angular.element($element[0].querySelector('.c60_baiduhotwords')).empty();
										//$scope.baiduiframe=angular.element($element[0].querySelector('.c60_baiduhotwords'));
										//$scope.baiduiframe.removeAttr('src');
										$scope.hotwordscontentisShow=false;
									}
									if(param.respparam.movielist!= null && param.respparam.movielist!= undefined && param.respparam.movielist!= ""){									
											    $scope.movieisShow=true;	
											    if($scope.compData.JS.movie.JS.isShow){
												    $scope.movietitle=param.respparam.movietitle;
													$scope.moviesubtitle=param.respparam.moviesubtitle;
													$scope.movie=param.respparam.movielist;
													$scope.currentmovieindex=0;
													$scope.currentmovie($scope.movie,0);
													$scope.movieinit($scope.movie);									    	
											    }
												
									}else{
										$scope.movieisShow=false;
									}
									if( !$scope.bannerisShow && !$scope.movieisShow && (!$scope.hotwordscontentisShow ||!$scope.compData.JS.hotwordscontent.JS.isShow)){
										coreService.fireEvent($attrs['cid'], 'error');
									}
								}
						};	           
						var direction="left",
		                 bannerobj= angular.element($element[0].querySelector('.c60_lsbannerul'));  
			             $scope.touchflag=false;
			             $scope.bannernum=1;
			             $scope.currentindex=0;
			             $scope.currentpoint=0;
		                 $scope.bannerinit = function(obj) {	
		                	 var dlmarginleft,
		                	 objwidth=$scope.compData.JS["bannerdd"].CSS["width"],
		                	 objmarginleft=$scope.compData.JS["bannerdd"].CSS["margin-right"];
		                	
		                	 $scope.bannernum=obj.length;
		                	$scope.compData.JS["bannerul"].CSS["width"]= $scope.bannernum * 100 + '%';
		                	$scope.compData.JS["bannerli"].CSS["width"]= 100/$scope.bannernum + '%';
		                	if(objwidth.indexOf("em")!=-1){
			                	dlmarginleft=-$scope.bannernum*objwidth.split("em")[0];		                			
		                	}else if(objwidth.indexOf("px")!=-1){
			                	dlmarginleft=-$scope.bannernum*objwidth.split("px")[0];	                			
		                	}else{		                		
			                	dlmarginleft=-$scope.bannernum*objwidth;		                		
		                	}
		                	if(objmarginleft.indexOf("em")!=-1){
			                	dlmarginleft=0.5*(-($scope.bannernum-1)*objmarginleft.split("em")[0]+dlmarginleft)+"em";
		                	}else if(objmarginleft.indexOf("px")!=-1){
			                	dlmarginleft=0.5*(-($scope.bannernum-1)*objmarginleft.split("px")[0]+dlmarginleft)+"px";	                			
		                	}else{		                		
			                	dlmarginleft=0.5*(-($scope.bannernum-1)*objmarginleft+dlmarginleft);		                		
		                	}
		                	$scope.compData.JS["bannerdl"].CSS["margin-left"]= dlmarginleft;
		                	
		                	$scope.bannerdefault();
		                	if($scope.bannernum>1){
		                		var time=parseInt($scope.compData.JS.banner.JS.transitiontime/1000);
		                		$scope.touchflag=true;
		                		$scope.bannertransition(time);
		                		$scope.bannerautoscroll();
								$scope.bannertouch();
		                	}else{	
		                		$scope.bannerdefault();
		                	}
			            };
			            $scope.bannerdefault = function(){
	                		  $scope.touchflag=false;
				              direction="left";
                              clearInterval($scope.autoscroll);	
	                		  $scope.bannertransform(0,1);
							  $scope.currentindex=0;
				              $scope.currentpoint=0;	
							  TotalDistance = 0;
							    bannerobj.unbind(_touchstart, touchstartfun);	
			    				bannerobj.unbind(_touchmove, touchmovefun);
			    				bannerobj.unbind(_touchend,touchmoveend);	
			            }
			            $scope.bannerautoscroll = function(){
			            	clearInterval($scope.autoscroll);	
			            	$scope.autoscroll=setInterval(function () {
				            	if($scope.currentindex==0){
	       		                    direction="left";
	                			}
	                			if($scope.currentindex==-($scope.bannernum-1)){
	       		                    direction="right";
	                			}
	                			if(direction=="left"){
		                			$scope.currentindex=$scope.currentindex-1;
				            		$scope.currentpoint=$scope.currentpoint+1;
				            		$scope.bannertransform($scope.currentindex,$scope.bannernum);
									$scope.bannerpoint($scope.currentpoint);
	                			}else{
		                			$scope.currentindex=$scope.currentindex+1;
				            		$scope.currentpoint=$scope.currentpoint-1;
				            		$scope.bannertransform($scope.currentindex,$scope.bannernum);
									$scope.bannerpoint($scope.currentpoint);
	                			}
							},$scope.compData.JS.banner.JS.autoscrolltime)
			            }
		                $scope.bannerpoint = function (current){	
		                	 angular.element($element[0].querySelector('.c60_lsbannerdl')).find("dd").css("background",$scope.compData.JS["bannerdd"].JS.stateconfig.state0["background"]);    	
		                	 angular.element($element[0].querySelector('.c60_lsbannerdl')).find("dd").eq(current).css("background",$scope.compData.JS["bannerdd"].JS.stateconfig.state1["background"]);
		                }
		                $scope.bannertransition = function (time){		                	
		                	bannerobj.css('transition', 'transform '+time+'s');
		                	bannerobj.css('moz-transition', '-moz-transform '+time+'s');
		                	bannerobj.css('-webkit-transition', '-webkit-transform '+time+'s');
		                	bannerobj.css('-o-transition', '-o-transform '+time+'s');
		                }	
		                $scope.bannertransform = function (currentindex,bannernum){ 
		                	bannerobj.css('-webkit-transform', 'translate('+currentindex*100/bannernum+'%,0)');
		                	bannerobj.css('-moz-transform', 'translate('+currentindex*100/bannernum+'%,0)');
		                	bannerobj.css('-ms-transform', 'translate('+currentindex*100/bannernum+'%,0)');
		                	bannerobj.css('-o-transform', 'translate('+currentindex*100/bannernum+'%,0)');
		                }			                
		                $scope.clickbanner = function(linktype,url,index) {
		                	if (coreUtils.cdrUtils.canWriteUITracingCDR($scope.compData.JS.bannerli.JS.cdrConfig)) {
			                    $scope.compData.JS['cdrData'] = {};
			                    $scope.compData.JS.cdrData = {
			                        'pageId': $scope.pageID,
			                        'componentId': coreUtils.createCdrid($scope.pageID, '', 'bannerli'+index)
			                    };
			                    coreUtils.cdrService($scope.compData.JS.bannerli.JS.cdrConfig.uitracingcdr, $scope.compData.JS.cdrData);
			                }
			                top.tlbs.notificationCdrData = null;
			                coreService.fireEvent($element.attr('cid'), 'gotoPage', {
		                        "linktype": linktype,
		                        "url": url,
		                        "title":$scope.compData.JS.bannerli.JS.title
		                    });
		                };
	                    var _touchstart = Const.touchEvent.start;
	    				var _touchmove = Const.touchEvent.move;
	    				var _touchend = Const.touchEvent.end;
	    				var _lastXPos = 0;
	    				var _currentXPos = 0;  		
						var Xdistance = 0;	
						var TotalDistance = 0;
						touchstartfun=  function (e) {
	    					if(!$scope.touchflag){
	    						return false;
	    					}
	    					_lastXPos = e.touches ? e.touches[0].pageX : e.pageX;
	    					 clearInterval($scope.autoscroll);	
						}
	    				touchmovefun=  function (e) {
	    					if(!$scope.touchflag){
	    						return false;
	    					}
	    					_currentXPos = e.touches ? e.touches[0].pageX : e.pageX;   
						}  
	    				touchmoveend=  function (e) {
		    					if(!$scope.touchflag){
		    						return false;
		    					}
								 Xdistance=_currentXPos - _lastXPos;
								 if(Xdistance>0){	
									 if (Xdistance> $scope.compData.JS.banner.JS.mindistance) {	
										 if($scope.currentindex<0){
											    $scope.currentindex=$scope.currentindex+1;
							            		$scope.currentpoint=$scope.currentpoint-1;
								            	$scope.bannertransform($scope.currentindex,$scope.bannernum);
												 $scope.bannerpoint($scope.currentpoint);
										 }	
				                     }
								 }else{	
									 if (-Xdistance> $scope.compData.JS.banner.JS.mindistance) {
										 if($scope.currentindex>-($scope.bannernum-1)){
											    $scope.currentindex=$scope.currentindex-1;
							            		$scope.currentpoint=$scope.currentpoint+1;	
								            	$scope.bannertransform($scope.currentindex,$scope.bannernum);
												 $scope.bannerpoint($scope.currentpoint);
										 }		
				                     }						 
								 }
                                 $scope.bannerautoscroll();			                		
                                 _lastXPos = 0;
				    			 _currentXPos = 0;  	
								 Xdistance = 0;	
								 TotalDistance = 0;	
						}
			            $scope.bannertouch = function (){      
		    				
		    				if($scope.touchflag){
			    				bannerobj.unbind(_touchstart, touchstartfun);	
			    				bannerobj.unbind(_touchmove, touchmovefun);
			    				bannerobj.unbind(_touchend,touchmoveend);	
			    				bannerobj.bind(_touchstart, touchstartfun);	
			    				bannerobj.bind(_touchmove, touchmovefun);
			    				bannerobj.bind(_touchend,touchmoveend);
		    				}else{
			    				bannerobj.unbind(_touchstart, touchstartfun);	
			    				bannerobj.unbind(_touchmove, touchmovefun);
			    				bannerobj.unbind(_touchend,touchmoveend);		    					
		    				}
		                }	
			            var movienum=0,
			             moviecontent = angular.element($element[0].querySelector('.c60_lsmoviecontent')),
			             moviecontentul = angular.element($element[0].querySelector('.c60_lsmoviecontentul')),
			             lifeservicesscroll = angular.element($element[0].querySelector('.c60_lifeservicesscroll')); 
              		     $scope.touchflag2=false;
			             $scope.movieinit = function(obj) {	
		                	var objwidth=$scope.compData.JS["movieli"].CSS["width"];
		                	movienum=obj.length;
		                	if(objwidth.indexOf("em")!=-1){
		                		$scope.compData.JS["movieul"].CSS["width"]=movienum*objwidth.split("em")[0]+"em";		                			
		                	}else if(objwidth.indexOf("px")!=-1){
		                		$scope.compData.JS["movieul"].CSS["width"]=movienum*objwidth.split("px")[0]+"px";	                			
		                	}else{		                			                		
		                	}
							$scope.movietransform(0);
							 
		                	if(movienum>3){
		                		var time=parseInt($scope.compData.JS.banner.JS.transitiontime/1000);
		                		$scope.touchflag2=true;
		                		$scope.movietransition(movienum*0.15);
								$scope.movietouch();
		                	}else{
		                		  $scope.touchflag2=false;		                		  
		                		  $scope.movietransform(0);
		                	}
			            };
		                $scope.lifeservicesscrolltransform = function (){                			
		                	lifeservicesscroll.css('-webkit-transform', 'translate3d(0px, 0, 0px)');
		                	lifeservicesscroll.css('-moz-transform', 'translate3d(0px, 0, 0px)');
		                	lifeservicesscroll.css('-ms-transform', 'translate3d(0px, 0, 0px)');
		                	lifeservicesscroll.css('-o-transform', 'translate3d(0px, 0, 0px)');
		                }
			            $scope.movietransition = function (time){		                	
			            	moviecontentul.css('transition', 'transform '+time+'s');
			            	moviecontentul.css('moz-transition', '-moz-transform '+time+'s');
			            	moviecontentul.css('-webkit-transition', '-webkit-transform '+time+'s');
			            	moviecontentul.css('-o-transition', '-o-transform '+time+'s');
		                }
		                $scope.movietransform = function (currentindex){                			
		                	moviecontentul.css('-webkit-transform', 'translate('+currentindex+'px,0)');
		                	moviecontentul.css('-moz-transform', 'translate('+currentindex+'px,0)');
		                	moviecontentul.css('-ms-transform', 'translate('+currentindex+'px,0)');
		                	moviecontentul.css('-o-transform', 'translate('+currentindex+'px,0)');
		                }	
	                    var _touchstart2 = Const.touchEvent.start;
	    				var _touchmove2 = Const.touchEvent.move;
	    				var _touchend2 = Const.touchEvent.end;
	    				var _lastXPos2 = 0;
	    				var _currentXPos2 = 0;  		
						var Xdistance2 = 0;	
						var totalDistance2 = 0;
						touchstart2fun = function (e) {
							if(!$scope.touchflag2 || top.document.getElementById("c60_lsmoviecontentul").offsetWidth<=top.window.innerWidth){
								return false;
							}
							var transform = $element[0].style['webkitTransform'] || $element[0].style['mozTransform'] || $element[0].style['msTransform'] || $element[0].style['msTransform'] || $element[0].style['oTransform'];
							if (transform) {
								totalDistance2 = transform.split(',')[1] && parseInt(transform.split(',')[1]);
							} else {
								totalDistance2 = 0;
							}
	    					_lastXPos2 = e.touches ? e.touches[0].pageX : e.pageX;
						}
						touchmove2fun = function (e) {
							if(!$scope.touchflag2 || top.document.getElementById("c60_lsmoviecontentul").offsetWidth<=top.window.innerWidth){
								return false;
							}
	    					_currentXPos2 = e.touches ? e.touches[0].pageX : e.pageX;  
							 Xdistance2=_currentXPos2 - _lastXPos2;

							    if (Math.abs(Xdistance2) <24) {
									return false;
								}
								totalDistance2 = totalDistance2+Xdistance2;
								if (totalDistance2 > 0) {
									totalDistance2 = 0;
								}else if (totalDistance2 +top.document.getElementById("c60_lsmoviecontentul").offsetWidth<= top.window.innerWidth) {
									totalDistance2 = top.window.innerWidth - top.document.getElementById("c60_lsmoviecontentul").offsetWidth;
								    var transform = $element[0].style['webkitTransform'] || $element[0].style['mozTransform'] || $element[0].style['msTransform'] || $element[0].style['msTransform'] || $element[0].style['oTransform'];
									if (transform) {
										if((transform.split(',')[1] && parseInt(transform.split(',')[1]))==totalDistance2){
											return false;
										}
									}
								}
								$scope.movietransform(totalDistance2);
						}
			            $scope.movietouch = function (){ 
							
							if($scope.touchflag2){
			    				moviecontent.unbind(_touchstart2,touchstart2fun);		            	
								moviecontent.unbind(_touchmove2, touchmove2fun);
								moviecontent.bind(_touchstart2,touchstart2fun);		            	
								moviecontent.bind(_touchmove2, touchmove2fun);
		    				}else{	
			    				moviecontent.unbind(_touchstart2,touchstart2fun);		            	
								moviecontent.unbind(_touchmove2, touchmove2fun);	    					
		    				}
							
							moviecontent.bind(_touchend2, function (e) {
							});
		                }
			            

		                $scope.moviebtnclick=function() {			                
			                if (coreUtils.cdrUtils.canWriteUITracingCDR($scope.compData.JS.moviebtngo.JS.cdrConfig)) {
			                    $scope.compData.JS['cdrData'] = {};
			                    $scope.compData.JS.cdrData = {
			                        'pageId': $scope.pageID,
			                        'componentId': coreUtils.createCdrid($scope.pageID, '', 'moviebtngo')
			                    };
			                    coreUtils.cdrService($scope.compData.JS.moviebtngo.JS.cdrConfig.uitracingcdr, $scope.compData.JS.cdrData);
			                }
			                top.tlbs.notificationCdrData = null;
			                if($scope.movielinktype=='0'){
			                	   if($scope.movieurl){
			                		   /*var f=document.createElement("form");
			                	         f.setAttribute("action" , $scope.movieurl );
			                	         f.setAttribute("method" , 'get' );
			                	         f.setAttribute("target" , '_black' );
			                	         document.body.appendChild(f)
			                	         f.submit();*/
			                		     top.window.open($scope.movieurl);
					                	/*var w=window.open();
					                	setTimeout(function(){			                	 
					                	w.location=$scope.movieurl;
					                	}, 250);*/	
			                	   }		                	
			                }else{
			                	if($scope.movielinktype && $scope.movieurl){
				                coreService.fireEvent($element.attr('cid'), 'gotoPage', {
			                        "linktype": $scope.movielinktype,
			                        "url": $scope.movieurl,
			                        "title":$scope.compData.JS.moviebtngo.JS.title
			                    });
			                	}
			                	
			                }
			            }; 
			            var _moviebtntouchstart = Const.touchEvent.start,
			                _moviebtntouchend = Const.touchEvent.end,
	                    moviebtn = angular.element($element[0].querySelector('.c60_lsmoviebtn'));

		                moviebtn.bind(_moviebtntouchstart, function(e) {
		                	var u = navigator.userAgent;
	                        if (/(android|Android)/ig.test(u)&&/(baidu|baidubrowser)/ig.test(u)&&/(SAMSUNG|GT-N7100)/ig.test(u)){   
	                        	 $scope.moviebtnclick();
	                        } 	
		                	
		                })
		                moviebtn.bind(_moviebtntouchend, function(e) {	
		                	var u = navigator.userAgent;
	                        if (/(android|Android)/ig.test(u)&&/(baidu|baidubrowser)/ig.test(u)&&/(SAMSUNG|GT-N7100)/ig.test(u)){   
	                        	 $scope.moviebtnclick();
	                        }
		                })
	                
		                $scope.currentmovie= function (list,current){	
							$scope.currentmovieindex=current;
							$scope.movieimgurl=list[current].imgurl;
							$scope.moviename=list[current].name;
							$scope.moviescore=list[current].score;
							$scope.movieurl=list[current].url;
							$scope.movielinktype=list[current].linktype;
		                }
		                $scope.getImgStyle= function (index){
		                	if(index==$scope.currentmovieindex){
		                		return $scope.compData.JS.movieimg.JS.stateconfig.state1;
		                	}else{
		                		return $scope.compData.JS.movieimg.JS.stateconfig.state0;		                		
		                	}		                		
		                }		                
		                $scope.clickmovie = function(index) {
		                	if (coreUtils.cdrUtils.canWriteUITracingCDR($scope.compData.JS.movieimg.JS.cdrConfig)) {
			                    $scope.compData.JS['cdrData'] = {};
			                    $scope.compData.JS.cdrData = {
			                        'pageId': $scope.pageID,
			                        'componentId': coreUtils.createCdrid($scope.pageID, '', 'movieimg'+index)
			                    };
			                    coreUtils.cdrService($scope.compData.JS.movieimg.JS.cdrConfig.uitracingcdr, $scope.compData.JS.cdrData);
			                }
			                top.tlbs.notificationCdrData = null;
			                $scope.currentmovieindex=index;
			                $scope.currentmovie($scope.movie,$scope.currentmovieindex);
		                };
						$scope.init = function () {
							coreService.registerComponentInstance($element.attr('cid'), $scope);
							var properties = coreService.getInitProperties($attrs['cid']) || {};
							$scope.compData = coreUtils.extendDeep($scope.compData || {}, properties);
							$element.css($scope.compData.CSS || {});						
						};
						$scope.$on($attrs['cid'] + '_handleEvent', function (event, cevent, args, deferred) {
							if ($scope.eventMap[cevent]) {
								$scope.eventMap[cevent](args);
								if(null != deferred) {
									deferred.resolve();
								}
							}
						});
						$scope.eventMap['update'] = $scope.updateData;
						$scope.eventMap['error'] = $scope.errorData;
						$scope.eventMap['loading'] = $scope.loadingData;
						$scope.eventMap['defaultinit'] = $scope.bannerdefault;
					}
				],
				link : function ($scope, $element, $attrs, ctl) {
					$scope.pageID = ctl.pageID;
					$scope.componentType = 'page';
					$scope.init();
				}
			}
		}
	]);
uiCore.directive("iappiconholder",["coreService","coreUtils","$timeout",function(c,a,b){return{restrict:"AE",replace:true,transclude:true,template:'<div class="c60_fbar_appsholder"><div class="c60_fbar_drag" ccid="c60_fbar_drag" ng-click="drag();$event.preventDefault();$event.stopPropagation();"><b ng-class="{\'c60_fbar_bup\':compData.JS.currentStyle==\'dropdown\'}"></b></div><div class="c60_fbar_apps"><a ng-repeat="app in compData.JS.appconfig"  appindex={{$index}} class="c60_fbar_apps_box" ccid="c60_fbar_apps_box"><div  appindex={{$index}} class="c60_fbar_app"><div  appindex={{$index}}  ng-show="compData.JS.remind.JS.pageid==app.pageid" ng-style="compData.JS.remind.CSS"></div><div  appindex={{$index}} class="c60_fbar_app_icon" ng-style="{\'background-image\':\'url(\'+app.defaultimage+\')\'}"></div><h2   appindex={{$index}} class="c60_fbar_app_title" ng-bind="app.name"></h2></div></a><div class="c60_fbar_app_hline"></div><div class="c60_fbar_app_vline"></div></div></div>',scope:{param:"=param"},require:"^pid",controller:["$scope","$element","$attrs","coreService","coreUtils","Const",function(g,f,e,h,d,i){g.cid=e.cid;g.classid="."+g.cid;g.eventMap={};g.compData={CSS:{},JS:{}};g.compData.JS.currentStyle="dropdown";g.compData.JS.appconfig=top.tlbs.appholder||[];g.extendComponentData=function(l){d.extendDeep(g.compData,l)};g.init=function(){h.registerComponentInstance(g.cid,g);g.extendComponentData(h.getInitProperties(g.cid));g.dragMove()};g.appLinkClick=function(){h.fireEvent(g.cid,"applinkClick")};g.dropup=function(){g.compData.JS.currentStyle="dropdown";f.css(g.compData.JS.uptyle||{top:"0em"})};g.dropdownaauto=function(){if(!k){g.dropdown()}};g.dropdown=function(){g.compData.JS.currentStyle="dropup";f.css(g.compData.JS.downstyle||{top:"8em"})};var k=false;g.drag=function(){j(d.createCdrid(g.pageID,"","dragbtn"));k=true;if(g.compData.JS.currentStyle=="dropup"){g.dropup()}else{g.dropdown()}};var j=function(l){d.recordTracingCdr(g.pageID,l,g.compData.JS.c60_fbar_drag.JS.cdrConfig)};g.dragMove=function(){var q=i.touchEvent.start;var o=i.touchEvent.move;var s=i.touchEvent.end;var l=0;var p=0;var t=0;var m=0;var r=false;var n=false;f.bind(q,function(u){r=false;n=true;l=u.touches?u.touches[0].pageY:u.pageY;p=u.touches?u.touches[0].pageX:u.pageX});f.bind(o,function(u){t=u.touches?u.touches[0].pageY:u.pageY;m=u.touches?u.touches[0].pageX:u.pageX;if(Math.abs(t-l)>3||r){u.stopPropagation();u.preventDefault();r=true}});f.bind(s,function(y){try{if(r==true){var w=m-p;var v=t-l;if(v<0){k=true;g.compData.JS.currentStyle="dropdown";f.css(g.compData.JS.uptyle||{top:"0em"});j(d.createCdrid(g.pageID,"","dragbtn"))}else{if(v>0){k=true;g.compData.JS.currentStyle="dropup";f.css(g.compData.JS.downstyle||{top:"8em"});j(d.createCdrid(g.pageID,"","dragbtn"))}}}else{if(n){var x=y.target;y.preventDefault();y.stopPropagation();if(x.getAttribute("appindex")){var u=Number(x.getAttribute("appindex"));var z=g.compData.JS.appconfig[u];g.appclick(z.appid,z.pageid,z.linktype,z.url,z.content)}}}}finally{r=false;n=false}})};g.appclick=function(p,l,n,o,m){if(m){h.fireEvent(f.attr("cid"),"click",{content:m})}j(p);if(n=="1"){window.open(o)}else{h.fireEvent(f.attr("cid"),"clickappbtn",{pageid:l,reload:"1"})}};g.gotopage=function(l){h.fireEvent(f.attr("cid"),"clickappbtn",{pageid:url})};g.topage=function(o){var m=Number(o.linktype);var l=o.url;var n=o.title||"链接";if(l){switch(m){case 0:window.open(l);break;case 1:h.fireEvent(f.attr("cid"),"embedpage",{url:l,stitle:n});break;case 2:o.pageid=l;h.fireEvent(f.attr("cid"),"clickappbtn",o);break;case 9:break;default:window.open(l)}if(l!=g.pageID&&o.notify){h.fireEvent(f.attr("cid"),"initsummary")}}};g.notifytopage=function(m){var l=m;l.notify=true;g.topage(m)};g.eventMap.notifytopage=g.notifytopage;g.eventMap.topage=g.topage;g.eventMap.dropdown=g.dropdownaauto;g.eventMap.dropup=g.dropup;g.$on(e.cid+"_handleEvent",function(n,o,m,l){if(g.eventMap[o]){g.eventMap[o](m);if(null!=l){l.resolve()}}})}],link:function(f,e,d,g){f.pageID=g.pageID;f.componentType="iappiconholder";f.init()}}}]);
uiCore.directive("minecoin",function(){return{restrict:"EA",replace:true,require:"^pid",template:'<div ccid="c60_fbar_minecoin" ng-style="compData.JS.c60_fbar_minecoin.CSS">   <div class="c60_fbar_bg_black_pop" ng-style="getbg_black_popStyle()">    <div class="c60_fbar_tips_txt_coin" ng-bind="compData.JS.bg_black_pop.JS.desc"></div>   </div>   <div class="c60_fbar_my_coin_con" ><div simplescroll>    <div class="c60_fbar_my_coin_top c60_fbar_clearfloat">     <div class="c60_fbar_coin_img_txt">      <span class="c60_fbar_myjinbi"></span>      <div class="c60_fbar_money_txt">       <p class="c60_fbar_money_txt_p"><span class="c60_fbar_coin_type" ng-bind="compData.JS.c60_fbar_coin_type.JS.text"></span><span ng-bind="revData.respparam.total"></span></p>       <p class="c60_fbar_money_txt_p"><span class="c60_fbar_coin_detail"  ng-bind="compData.JS.c60_fbar_coin_detail.JS.text"></span><span ng-bind="revData.respparam.totaldata"></span></p>      </div>     </div>     <div class="c60_fbar_exchange_btn">      <a class="c60_fbar_exchange_btn_link" ccid="c60_fbar_exchange_btn_link" ng-style="getexchange_btnStyle()" ng-click="click(\'c60_fbar_exchange_btn_link\')"  ng-bind="compData.JS.c60_fbar_exchange_btn_link.JS.text"></a>     </div>     <div class="c60_fbar_exchange_btn" ng-show="compData.JS.c60_fbar_transfer_btn_link.JS.isShow">      <a class="c60_fbar_exchange_btn_link" ccid="c60_fbar_transfer_btn_link" ng-style="gettransfer_btnStyle()" ng-click="click(\'c60_fbar_transfer_btn_link\')"  ng-bind="compData.JS.c60_fbar_transfer_btn_link.JS.text"></a>     </div>    </div>    <div class="c60_fbar_exchange_flux_con" ng-show="isexchange_flux_conShow()">     <span class="c60_fbar_arrow_top"></span>     <p class="c60_fbar_tit"><span ng-bind="compData.JS.c60_fbar_tit1.JS.text"></span><span class="c60_fbar_tit_txt_gray" ng-bind="compData.JS.tit_txt_gray.JS.text" ng-show="compData.JS.tit_txt_gray.JS.isShow"></span></p>     <div class="c60_fbar_type c60_fbar_clearfloat">      <span class="c60_fbar_type_exchange" ccid="c60_fbar_type_exchange" ng-bind="compData.JS.c60_fbar_type_exchange.JS.text"></span>      <ul>       <li ng-repeat="item in coinTypes" ng-click="selectedClick($index)" ng-style="isSelected($index)" ng-bind="item.productname"></li>      </ul>     </div>     <div class="c60_fbar_mobile c60_fbar_clearfloat">      <span class="c60_fbar_type_exchange2" ng-bind="compData.JS.c60_fbar_mobile.JS.text"></span><span ng-bind="phoneFilter(revData.respparam.msisdn)"></span>      <span class="c60_fbar_mobile_txt_gray" ng-bind="compData.JS.c60_fbar_mobile_txt_gray.JS.text"></span>     </div>     <div class="c60_fbar_exchange_flux_btn" ccid="c60_fbar_exchange_flux_btn">      <a class="c60_fbar_exchange_flux_btn_link" ng-style="getexchange_flux_btn_linkStyle()" ng-click="click(\'c60_fbar_exchange_flux_btn\');" ng-bind="compData.JS.c60_fbar_exchange_flux_btn_link.JS.text"></a>     </div>    </div>    <div class="c60_fbar_exchange_flux_con" ng-show="istransfer_flux_canShow()">     <span class="c60_fbar_arrow_top transfer"></span>     <p class="c60_fbar_tit"><span ng-bind="compData.JS.c60_fbar_tit1_transfer.JS.text"></span><span class="c60_fbar_tit_txt_gray" ng-bind="compData.JS.transfer_txt_gray.JS.text" ng-show="compData.JS.transfer_txt_gray.JS.isShow"></span></p>     <div class="c60_fbar_type c60_fbar_clearfloat">      <span class="c60_fbar_type_transfer" ccid="c60_fbar_type_transfer" ng-bind="compData.JS.c60_fbar_type_transfer.JS.text"></span><div class="c60_fbar_ri_type_right c60_fbar_ri_type_width65"><input type="number" min="0" ng-required="true" ng-minlength="1" ng-maxlength="5" ng-model="transferCoinCount" value placeholder="{{compData.JS.c60_fbar_type_transfer.JS.hinttext}}" class="c60_fbar_ri_type_number_input" /><div class="c60_fbar_ri_type_right c60_fbar_ri_type_width65 c60_fbar_tipstextcolor transfercoincount" ng-bind="compData.JS.c60_fbar_type_transfer.JS.errortext"></div></div>     </div>     <div class="c60_fbar_mobile c60_fbar_clearfloat">      <span class="c60_fbar_type_transfer2" ng-bind="compData.JS.c60_fbar_mobile_transfer.JS.text"></span><div class="c60_fbar_ri_type_right c60_fbar_ri_type_width65"><input type="number" min="0" ng-required="true" ng-minlength="5" ng-maxlength="20" ng-model="transferMsisdn" value placeholder="{{compData.JS.c60_fbar_mobile_transfer.JS.hinttext}}" class="c60_fbar_ri_type_number_input" /><div class="c60_fbar_ri_type_right c60_fbar_ri_type_width65 c60_fbar_tipstextcolor transfermsisdn" ng-bind="compData.JS.c60_fbar_mobile_transfer.JS.errortext"></div></div>     </div>     <div class="c60_fbar_exchange_flux_btn" ccid="c60_fbar_transfer_flux_btn">      <a class="c60_fbar_exchange_flux_btn_link" ng-style="gettransfer_flux_btn_linkStyle()" ng-click="click(\'c60_fbar_transfer_flux_btn\');" ng-bind="compData.JS.c60_fbar_transfer_flux_btn_link.JS.text"></a>     </div>    </div>    <ul class="c60_fbar_mycoin_tab c60_fbar_clearfloat" ng-style="getmycoin_tabStyle()">     <li ng-style="getStyleUp(0)" ccid="c60_fbar_mycoin_tab0" ng-click="handClick(0)"  ng-bind="compData.JS.c60_fbar_mycoin_tab0.JS.text"></li>     <li ng-style="getStyleUp(1)" ccid="c60_fbar_mycoin_tab1" ng-click="handClick(1)"  ng-bind="compData.JS.c60_fbar_mycoin_tab1.JS.text"></li>    </ul>  <div class="c60_fbar_mycoin_date c60_fbar_money_detail0" ng-style="getmoney_detail0Style()" ng-show="isShow(0)">    <ul class="c60_fbar_mycoin_date_title c60_fbar_clearfloat">     <li ng-repeat="item in compData.JS.detail.money_detail0.head"><span ng-bind="item"></span></li>    </ul>    <div ng-style="compData.JS.nodata.CSS" ng-bind="compData.JS.nodata.JS.nodataText" ng-hide="isHide1"></div>    <div class="c60_fbar_mycoin_date_detail">     <ul class="c60_fbar_mycoin_date_detail_ul c60_fbar_clearfloat" ng-repeat="item in revData.respparam.detail">       <li><p ng-bind="dateFilter(item.time,true)"></p><p ng-bind="dateFilter(item.time,false)"></p></li>       <li ng-bind="item.sourceName"></li>       <li ng-bind="item.count"></li>     </ul>     <div class="c60_fbar_c60_toolbar_loading_more0" ccid="c60_fbar_c60_toolbar_loading_more0" ng-bind="compData.JS.c60_fbar_c60_toolbar_loading_more.JS.text" ng-style="getc60_fbar_c60_toolbar_loading_more0Style();" ng-click="click(\'c60_toolbar_loading_more\');$event.stopPropagation();">    </div>   </div>    </div>   <div class="c60_fbar_mycoin_date c60_fbar_money_detail1" ng-style="getmoney_detail1Style()" ng-show="isShow(1)">    <ul class="c60_fbar_mycoin_date_title c60_fbar_clearfloat">     <li ng-repeat="item in compData.JS.detail.money_detail1.head"><span ng-bind="item"></span></li>    </ul>     <div ng-style="compData.JS.nodata.CSS" ng-bind="compData.JS.nodata.JS.nodataText" ng-hide="isHide2"></div>    <div class="c60_fbar_mycoin_date_detail">     <ul class="c60_fbar_mycoin_date_detail_ul c60_fbar_clearfloat" ng-repeat="item in revData.respparam.history" >       <li><p ng-bind="dateFilter(item.time,true)"></p><p ng-bind="dateFilter(item.time,false)"></p></li>      <li><span ng-bind="item.data"></span><span ng-bind="item.unit"></span></li>      <li><span ng-bind="item.cost"></span></li>     </ul>     <div class="c60_fbar_c60_toolbar_loading_more1" ccid="c60_fbar_c60_toolbar_loading_more1" ng-bind="compData.JS.c60_fbar_c60_toolbar_loading_more.JS.text" ng-style="getc60_fbar_c60_toolbar_loading_more1Style();" ng-click="click(\'c60_toolbar_loading_more\');$event.stopPropagation();">    </div></div>   </div>   </div></div>',scope:{},controller:["$scope","$element","$attrs","coreService","coreUtils","Const",function(d,c,b,f,a,g){d.cid=b.cid;d.eventMap={};d.compData={CSS:{},JS:{}};d.getexchange_flux_btn_linkStyle=function(){if(d.compData.JS.exchange_flux_btn_link.JS.stateconfig.state==0){return d.compData.JS.exchange_flux_btn_link.JS.stateconfig.state0}else{return d.compData.JS.exchange_flux_btn_link.JS.stateconfig.state1}};d.gettransfer_flux_btn_linkStyle=function(){if(d.compData.JS.transfer_flux_btn_link.JS.stateconfig.state==0){return d.compData.JS.transfer_flux_btn_link.JS.stateconfig.state0}else{return d.compData.JS.transfer_flux_btn_link.JS.stateconfig.state1}};d.extendComponentData=function(i){d.compData=a.extendDeep(d.compData,i)};var h=function(){var j=Number(d.compData.JS.detail.money_detail0.len);d.compData.JS.detail.money_detail0.head=[];for(var k=0;k<j;k++){d.compData.JS.detail.money_detail0.head.push(d.compData.JS.detail.money_detail0["head"+k])}j=Number(d.compData.JS.detail.money_detail1.len);d.compData.JS.detail.money_detail1.head=[];for(var k=0;k<j;k++){d.compData.JS.detail.money_detail1.head.push(d.compData.JS.detail.money_detail1["head"+k])}};d.init=function(){f.registerComponentInstance(c.attr("cid"),d);d.extendComponentData(f.getInitProperties(d.cid)||{});c.css(d.compData.css||{});h()};d.compData.JS.phoneconfig={prefix:"86",len:"13",maskbegin:"5",maskend:"9",commonlen:"11",commonbegin:"3",commonend:"7"};d.phoneFilter=function(m){if(m==undefined){return'<i style="visibility:hidden">&nbsp;</i>'}var l="";for(var k=parseInt(d.compData.JS.phoneconfig.maskbegin);k<parseInt(d.compData.JS.phoneconfig.maskend);k++){l=l+"*"}var j="";if(m.indexOf(d.compData.JS.phoneconfig.prefix)==0&&m.length==d.compData.JS.phoneconfig.len){j=m.substring(0,parseInt(d.compData.JS.phoneconfig.maskbegin))+l+m.substring(parseInt(d.compData.JS.phoneconfig.maskend))}else{if(m.length>=parseInt(d.compData.JS.phoneconfig.commonlen)){j=m.substring(0,parseInt(d.compData.JS.phoneconfig.commonbegin))+l+m.substring(parseInt(d.compData.JS.phoneconfig.commonend))}}return j};d.dateFilter=function(j,i){if(j==undefined){return""}if(i){var k=j.substring(0,4)+"-"+j.substring(4,6)+"-"+j.substring(6,8)}else{var k=j.substring(8,10)+":"+j.substring(10,12)+":"+j.substring(12,14)}return k};d.getbg_black_popStyle=function(){if(d.compData.JS.bg_black_pop.JS.stateconfig.state==1){return d.compData.JS.bg_black_pop.JS.stateconfig.state1}else{return d.compData.JS.bg_black_pop.JS.stateconfig.state0}};d.getexchange_btnStyle=function(){if(d.compData.JS.exchange_btn.JS.stateconfig.state==0){return d.compData.JS.exchange_btn.JS.stateconfig.state0}else{return d.compData.JS.exchange_btn.JS.stateconfig.state1}};d.gettransfer_btnStyle=function(){if(d.compData.JS.transfer_btn.JS.stateconfig.state==0){return d.compData.JS.transfer_btn.JS.stateconfig.state0}else{return d.compData.JS.transfer_btn.JS.stateconfig.state1}};d.isexchange_flux_conShow=function(){return d.compData.JS.exchange_flux_con.JS.stateconfig.state==1?true:false};d.istransfer_flux_canShow=function(){return d.compData.JS.transfer_flux_con.JS.stateconfig.state==1?true:false};var e={c60_fbar_exchange_btn_link:function(i){a.recordTracingCdr(d.pageID,a.createCdrid(d.pageID,b.cid,"exclink"),d.compData.JS.c60_fbar_exchange_btn_link.JS.cdrConfig);if(d.compData.JS.exchange_btn.JS.stateconfig.state==0){d.getCoinTypes();d.compData.JS.exchange_btn.JS.stateconfig.state=1;d.compData.JS.exchange_flux_con.JS.stateconfig.state=1}else{d.compData.JS.exchange_btn.JS.stateconfig.state=0;d.compData.JS.exchange_flux_con.JS.stateconfig.state=0}d.compData.JS.transfer_btn.JS.stateconfig.state=0;d.compData.JS.transfer_flux_con.JS.stateconfig.state=0},c60_fbar_exchange_flux_btn:function(j){if(d.compData.JS.exchange_flux_btn_link.JS.stateconfig.state==1){return false}d.compData.JS.exchange_flux_btn_link.JS.stateconfig.state=1;a.recordTracingCdr(d.pageID,a.createCdrid(d.pageID,b.cid,"excflux"),d.compData.JS.exchange_flux_btn_link.JS.cdrConfig);var i=d.coinTypes[d.compData.JS.exchange_flux_con.JS.stateconfig.index].productid;f.fireEvent(c.attr("cid"),b.event||"sendExchange",{dataID:i,count:"1"})},c60_toolbar_loading_more:function(i){a.recordTracingCdr(d.pageID,a.createCdrid(d.pageID,b.cid,"more")+d.compData.JS.detail.index,d.compData.JS.c60_toolbar_loading_more.JS.cdrConfig);if(d.compData.JS.detail.index==0){d.compData.JS.detail.money_detail0.number=Number(d.compData.JS.detail.money_detail0.number)+Number(d.compData.JS.detail.step);f.fireEvent(c.attr("cid"),b.event||"init",{startNote:1,noteNo:d.compData.JS.detail.money_detail0.number})}else{d.compData.JS.detail.money_detail1.number=Number(d.compData.JS.detail.money_detail1.number)+Number(d.compData.JS.detail.step);f.fireEvent(c.attr("cid"),b.event||"init",{startNote:1,noteNo:d.compData.JS.detail.money_detail1.number})}},c60_fbar_transfer_btn_link:function(i){a.recordTracingCdr(d.pageID,a.createCdrid(d.pageID,b.cid,"exclink"),d.compData.JS.c60_fbar_transfer_btn_link.JS.cdrConfig);if(d.compData.JS.transfer_btn.JS.stateconfig.state==0){d.compData.JS.transfer_btn.JS.stateconfig.state=1;d.compData.JS.transfer_flux_con.JS.stateconfig.state=1}else{d.compData.JS.transfer_btn.JS.stateconfig.state=0;d.compData.JS.transfer_flux_con.JS.stateconfig.state=0}d.compData.JS.exchange_btn.JS.stateconfig.state=0;d.compData.JS.exchange_flux_con.JS.stateconfig.state=0},c60_fbar_transfer_flux_btn:function(i){if(d.compData.JS.transfer_flux_btn_link.JS.stateconfig.state==1){return false}d.compData.JS.transfer_flux_btn_link.JS.stateconfig.state=1;a.recordTracingCdr(d.pageID,a.createCdrid(d.pageID,b.cid,"transferflux"),d.compData.JS.transfer_flux_btn_link.JS.cdrConfig);if((d.transferCoinCount==undefined||d.transferCoinCount=="")||!(parseInt(d.transferCoinCount)===d.transferCoinCount)||parseInt(d.transferCoinCount)>parseInt(d.revData.respparam.total)){angular.element(c[0].querySelector(".transfercoincount")).css("display","block");d.compData.JS.transfer_flux_btn_link.JS.stateconfig.state=0;if((d.transferMsisdn==undefined||d.transferMsisdn=="")||!(parseInt(d.transferMsisdn)===d.transferMsisdn)||d.revData.respparam.msisdn===d.transferMsisdn){angular.element(c[0].querySelector(".transfermsisdn")).css("display","block");d.compData.JS.transfer_flux_btn_link.JS.stateconfig.state=0}else{angular.element(c[0].querySelector(".transfermsisdn")).css("display","none")}}else{angular.element(c[0].querySelector(".transfercoincount")).css("display","none");if((d.transferMsisdn==undefined||d.transferMsisdn=="")||!(parseInt(d.transferMsisdn)===d.transferMsisdn)||d.revData.respparam.msisdn===d.transferMsisdn){angular.element(c[0].querySelector(".transfermsisdn")).css("display","block");d.compData.JS.transfer_flux_btn_link.JS.stateconfig.state=0}else{angular.element(c[0].querySelector(".transfermsisdn")).css("display","none");f.fireEvent(c.attr("cid"),"sendTransfer",{destmsisdn:d.transferMsisdn,transfercount:d.transferCoinCount})}}}};d.click=function(i,j){if(i==undefined||i==null){return false}switch(i){case"c60_fbar_exchange_btn_link":e.c60_fbar_exchange_btn_link(j);break;case"c60_fbar_exchange_flux_btn":e.c60_fbar_exchange_flux_btn(j);break;case"c60_toolbar_loading_more":e.c60_toolbar_loading_more(j);break;case"c60_fbar_transfer_btn_link":e.c60_fbar_transfer_btn_link(j);break;case"c60_fbar_transfer_flux_btn":e.c60_fbar_transfer_flux_btn(j);break;default:}};d.selectedClick=function(i){a.recordTracingCdr(d.pageID,a.createCdrid(d.pageID,b.cid,"typexc"),d.compData.JS.c60_fbar_type_exchange.JS.cdrConfig);d.compData.JS.exchange_flux_con.JS.stateconfig.index=i};d.isSelected=function(i){if(d.compData.JS.exchange_flux_con.JS.stateconfig.index==i){return d.compData.JS.exchange_flux_con.JS.stateconfig.state1}else{return d.compData.JS.exchange_flux_con.JS.stateconfig.state0}};d.bg_black_popShow=function(i){d.compData.JS.bg_black_pop.JS.stateconfig.state=1;angular.element(c[0].querySelector(".c60_fbar_bg_black_pop")).css({display:"block"});setTimeout(function(){d.compData.JS.bg_black_pop.JS.stateconfig.state=0;angular.element(c[0].querySelector(".c60_fbar_bg_black_pop")).css({display:"none"})},d.compData.JS.bg_black_pop.JS.stateconfig.time*1000);d.compData.JS.bg_black_pop.JS.desc=i};d.getExchangeRes=function(m){if(m&&m.respparam){var k=m.respparam;if(k.status=="success"){var p=d.compData.JS.exchange_flux_con.JS.respons.defaultSuccessCode;var j="";var n="";if(m.respparam.desc==undefined||m.respparam.desc==""||m.respparam.desc==null){j=d.compData.JS.exchange_flux_con.JS.respons[p]}else{var i=d.compData.JS.exchange_flux_con.JS.respons[m.respparam.desc];if(i==undefined||i==null||i==""){j=d.compData.JS.exchange_flux_con.JS.respons[p]||""}else{j=i||""}}if(m.respparam.invoice){n=m.respparam.invoice}var l=j+d.coinTypes[d.compData.JS.exchange_flux_con.JS.stateconfig.index].productname+d.compData.JS.tips1+n+d.compData.JS.tips2;d.bg_black_popShow(l);f.fireEvent(c.attr("cid"),b.event||"init",{startNote:"1",noteNo:"10"});var o={respparam:{vaIncreased:(0-Number(n))}};f.fireEvent(c.attr("cid"),b.event||"updateCoinsTotal",o)}else{var p=d.compData.JS.exchange_flux_con.JS.respons.defaultErrorCode;var j="";var n="";if(m.respparam.desc==undefined||m.respparam.desc==""||m.respparam.desc==null){j=d.compData.JS.exchange_flux_con.JS.respons[p]}else{var i=d.compData.JS.exchange_flux_con.JS.respons[m.respparam.desc];if(i==undefined||i==null||i==""){j=m.respparam.desc}else{j=i}}if(m.respparam.invoice){n=m.respparam.invoice}var l=j;d.bg_black_popShow(l)}d.compData.JS.exchange_flux_btn_link.JS.stateconfig.state=0}};d.eventMap.getExchangeRes=d.getExchangeRes;d.getTransferRes=function(l){if(l&&l.respparam){var i=l.respparam.transferresult;var k=d.compData.JS.transfer_flux_con.JS.respons.defaultSuccessCode;var j=d.compData.JS.transfer_flux_con.JS.respons.errorMessage;if(i===k){j=d.compData.JS.transfer_flux_con.JS.respons.successMessage}d.bg_black_popShow(j);d.compData.JS.transfer_flux_btn_link.JS.stateconfig.state=0}};d.eventMap.getTransferRes=d.getTransferRes;d.getCoinTypes=function(){f.fireEvent(c.attr("cid"),b.event||"getTypes")};d.getTypesFunc=function(n){if(n.respparam.datas){if(n.respparam.datas.length>0){var m=n.respparam.datas;d.coinTypes=[];var j=m.length;if(d.compData.JS.maxtype==""||d.compData.JS.maxtype==undefined||d.compData.JS.maxtype==null){d.compData.JS.maxtype=4}var k=j>d.compData.JS.maxtype?d.compData.JS.maxtype:j;for(var l=0;l<j;l++){if(l<k){d.coinTypes[l]=m[l]||{}}}d.compData.JS.exchange_flux_btn_link.JS.stateconfig.state=0}else{d.compData.JS.exchange_flux_btn_link.JS.stateconfig.state=1}}};d.eventMap.getTypesFunc=d.getTypesFunc;d.getStyleUp=function(j){var i=false;if(d.compData.JS.detail.index==j){return d.compData.JS.detail.state1}else{return d.compData.JS.detail.state0}};d.isShow=function(i){if(d.compData.JS.detail.index==i){return true}else{return false}};d.getc60_fbar_c60_toolbar_loading_more0Style=function(){if(Number(d.compData.JS.detail.money_detail0.number)<=Number(d.compData.JS.detail.money_detail0.totalget)){angular.element(c[0].querySelector(".c60_fbar_c60_toolbar_loading_more0")).css({display:"block"})}else{angular.element(c[0].querySelector(".c60_fbar_c60_toolbar_loading_more0")).css({display:"none"})}};d.getc60_fbar_c60_toolbar_loading_more1Style=function(){if(Number(d.compData.JS.detail.money_detail1.number)<=Number(d.compData.JS.detail.money_detail1.totalget)){angular.element(c[0].querySelector(".c60_fbar_c60_toolbar_loading_more1")).css({display:"block"})}else{angular.element(c[0].querySelector(".c60_fbar_c60_toolbar_loading_more1")).css({display:"none"})}};d.handClick=function(i){a.recordTracingCdr(d.pageID,a.createCdrid(d.pageID,b.cid,"tab")+i,d.compData.JS.c60_fbar_mycoin_tab.JS.cdrConfig);d.compData.JS.detail.index=i};d.isHide1=true;d.isHide2=true;d.getDataFromRet=function(i){if(!i||!i.respparam||i.respparam.total==null||i.respparam.total==undefined||i.respparam.totaldata==null||i.respparam.totaldata==undefined){f.fireEvent(b.cid,"error");return}if(!i.respparam.detail||0===i.respparam.detail.length){d.isHide1=false}if(!i.respparam.history||0===i.respparam.history.length){d.isHide2=false}d.revData=i;d.compData.JS.detail.money_detail0.totalget=i.respparam.detail.length;d.compData.JS.detail.money_detail1.totalget=i.respparam.history.length};d.eventMap.getDataFromRet=d.getDataFromRet;d.$on(d.cid+"_handleEvent",function(l,j,k,i){d.eventMap[j](k);if(null!=i){i.resolve()}})}],link:function(d,b,a,c){d.pageID=c.pageID;d.componentType="cminecoin";d.init()}}});
uiCore.directive("imagelist",[function(){return{restrict:"AE",replace:true,require:"^pid",template:'<div class="c60_fbar_imagelist"><div class="c60_fbar_imagelist_wrapper" ng-style="wrapperstyle"><div ng-style="image.imagestyle" ng-click="weblink($index,image);$event.stopPropagation()" ng-repeat="image in imagearray" class="c60_fbar_imagelist_image_container" ccid="c60_fbar_link_click"></div></div><div class="c60_fbar_circle_dotted_con"><span class="c60_fbar_circle_dotted" ng-repeat="image in imagearray" ng-style="getStyle($index)"></span></div></div>',scope:{},controller:["$scope","$element","$attrs","coreService","coreUtils","Const",function(d,c,b,e,a,f){d.cid=b.cid;d.eventMap={};d.compData={CSS:{display:"block"},JS:{}};d.updateData=function(j){var g=j.respparam.adlocation||[];d.wrapperstyle={width:g.length*100+"%"};d.totallength=g.length;for(var h=0;h<g.length;h++){g[h].imagestyle={"background-image":"url("+g[h].imageurl+")",width:(100/g.length)+"%"}}d.imagearray=g};d.weblink=function(g,h){if(a.cdrUtils.canWriteUITracingCDR(d.compData.JS.c60_fbar_link_click.JS.cdrConfig)){d.compData.JS.cdrData={};d.compData.JS.cdrData={pageId:d.pageID,componentId:b.cid+"_"+h.CONTENTID||h.contentid};a.cdrService(d.compData.JS.c60_fbar_link_click.JS.cdrConfig.uitracingcdr,d.compData.JS.cdrData)}e.fireEvent(c.attr("cid"),"gotoPage",{linktype:h.linktype,url:h.weblink})};d.getStyle=function(g){if(d.totallength>1){if(g==d.currentIndex){return{"background-color":"#FFF"}}else{return{"background-color":""}}}else{return{display:"none"}}};d.init=function(){e.registerComponentInstance(c.attr("cid"),d);var g=e.getInitProperties(b.cid)||{};d.compData.css=g.CSS||{};d.compData.js=g.JS||{};d.compData=a.extendDeep(d.compData||{},g);c.css(d.compData.css||{});var h={adlocation:d.compData.JS.adposid};e.fireEvent(c.attr("cid"),"init",h);d.drag()};d.currentIndex=0;d.drag=function(){var j=f.touchEvent.start;var h=f.touchEvent.move;var n=f.touchEvent.end;var k=0;var m=0;var l=0;var g=0;var i=angular.element(c[0].querySelector(".c60_fbar_imagelist_wrapper"));i.bind(j,function(o){k=o.touches?o.touches[0].pageY:o.pageY;m=o.touches?o.touches[0].pageX:o.pageX});i.bind(h,function(o){l=o.touches?o.touches[0].pageY:o.pageY;g=o.touches?o.touches[0].pageX:o.pageX;if(Math.abs(g-m)>3||moveflag){o.stopPropagation();o.preventDefault();moveflag=true}});i.bind(n,function(q){var p=g-m;var o=l-k;if(p<0){if(d.currentIndex<d.totallength-1){d.currentIndex=d.currentIndex+1}}else{if(d.currentIndex>0){d.currentIndex=d.currentIndex-1}}d.$apply();d.slide(d.currentIndex,d.totallength)})};d.slide=function(h,k){var g=angular.element(c[0].querySelector(".c60_fbar_imagelist_wrapper"));var j=h*100/k;var i="translate(-"+j+"%,0px)";g.css({"-webkit-transform":i,"-moz-transform":i,"-ms-transform":i,"-o-transform":i})};d.$on(b.cid+"_handleEvent",function(i,j,h,g){if(d.eventMap[j]){d.eventMap[j](h);if(null!=g){g.resolve()}}});d.eventMap.update=d.updateData;d.hide=function(){d.compData.CSS.display="none";c.css(d.compData.CSS)};d.show=function(){d.compData.CSS.display="block";c.css(d.compData.CSS)};d.eventMap.show=d.show;d.eventMap.hide=d.hide}],link:function(d,b,a,c){d.pageID=c.pageID;d.componentType="imagelist";d.init()}}}]);
﻿﻿uiCore.directive('goldeneggs', [function() {
    return {
        restrict: 'AE',
        replace: true,
        require: '^pid',
        template: '<div class="c60_fbar_goldeneggs" ng-style="getStyle(\'background\')" ng-show="showflag"><div class="c60_fbar_goldeneggsscrollc" ><div class="c60_fbar_goldeneggsscroll"  simplescroll>'
			        +'<div class="c60_fbar_top">'
			          +'<img  class="c60_fbar_top_img" ng-src="{{compData.datas.image}}">'
			        +'</div>'
			        +'<div class="c60_fbar_midd">'
			           +'<span  class="c60_fbar_rule" ng-bind="compData.JS.rule.JS.text" ng-style="getStyle(\'rule\')" ccid="c60_fbar_rule" ng-click="queryRule();$event.stopPropagation();"></span>'
			           +'<p class="c60_fbar_count_img" ng-style="getStyle(\'countimg\')"><span ng-bind="compData.JS.countimg.JS.text0"></span>'
			              +'<span class="c60_fbar_count_num" ng-style="getStyle(\'countimgnum\')" ng-bind="number"></span><span ng-bind="compData.JS.countimg.JS.text1"></span></p>'
			           +'<span class="c60_fbar_detail" ng-style="getStyle(\'detail\')" ng-bind="compData.JS.detail.JS.text" ccid="c60_fbar_detail" ng-click="queryDetil();$event.stopPropagation();"></span>'
			        +'</div>'
			        +'<div class="c60_fbar_goldeneggs_midd_d"><div class="c60_fbar_goldeneggs_hammer" ng-style="getStyle(\'hammer\')"></div><ul class="c60_fbar_goldeneggs_midd">'
			          +'<li class="c60_fbar_midd_img_li" ng-style="getStyle(\'imgli1\')"><span class="c60_fbar_midd_imgbg1 c60_fbar_midd_img c60_fbar_midd_img1" ng-style="getStyle(\'goldenegg\')"></span><p class="c60_fbar_midd_img_li_name"  ng-style="getStyle(\'imgli1desc\')" ng-bind="compData.JS.imgli1desc.JS.text"></p></li>'
			          +'<li class="c60_fbar_midd_img_li" ng-style="getStyle(\'imgli2\')"><span class="c60_fbar_midd_imgbg2 c60_fbar_midd_img c60_fbar_midd_img2" ng-style="getStyle(\'goldenegg\')"></span><p class="c60_fbar_midd_img_li_name"  ng-style="getStyle(\'imgli2desc\')" ng-bind="compData.JS.imgli2desc.JS.text"></p></li>'
			          +'<li class="c60_fbar_midd_img_li" ng-style="getStyle(\'imgli3\')"><span class="c60_fbar_midd_imgbg3 c60_fbar_midd_img c60_fbar_midd_img3" ng-style="getStyle(\'goldenegg\')"></span><p class="c60_fbar_midd_img_li_name"  ng-style="getStyle(\'imgli3desc\')" ng-bind="compData.JS.imgli3desc.JS.text"></p></li>'
			        +'</ul><div class="c60_fbar_goldeneggsimg1" ng-style="goldeneggsimgStyle(\'state1\')" style="position: absolute;width:0;height:0;font-size:0;line-height:0;right:0;bottom:0;overflow:hidden;">&nbsp;</div><div class="c60_fbar_goldeneggsimg2"  ng-style="goldeneggsimgStyle(\'state2\')" style="position: absolute;width:0;height:0;font-size:0;line-height:0;right:0;bottom:0;overflow:hidden;">&nbsp;</div><div class="c60_fbar_goldeneggsimg3" ng-style="goldeneggsimgStyle(\'state3\')" style="position: absolute;width:0;height:0;font-size:0;line-height:0;right:0;bottom:0;overflow:hidden;">&nbsp;</div></div>'
			        +'</div><div class="c60_goldeneggs_bg" ng-style="getStyle(\'popbg\')" ng-show="popbgflag"></div>'
			        +'<div class="c60_goldeneggs_loading" ng-style="getStyle(\'poploading\')" ng-show="poploadingflag"><p ng-bind="compData.JS.poploading.JS.text" ng-show="poploadingflag"></p></div>'
			        +'<div class="c60_goldeneggs_tips" ng-style="getStyle(\'poptips\')" ng-show="poptipsflag">'			        
			          +'<div class="c60_goldeneggs_tipstitle" ng-style="getStyle(\'tipstitlewarp\')"><h5 ng-style="getStyle(\'tipstitle\')" ng-bind="compData.JS.tipstitle.JS.text" ng-style="getStyle(\'tipstitle\')"></h5><span class="c60_goldeneggs_tipsclose" ccid="c60_goldeneggs_tipsclose" ng-style="getStyle(\'tipsclose\')"  ng-click="popclose();$event.stopPropagation();"></span></div>'
			          +'<div class="c60_goldeneggs_tipscontent" ng-style="getStyle(\'tipscontent\')">'
			              +'<p ng-style="getStyle(\'winningprize\')" ng-show="winningprizeflag"><span ng-bind-html="to_trusted(compData.datas.message)" ></span> <span ng-bind="compData.datas.prizename" ng-style="getStyle(\'prizename\')"></span></p><div ng-show="winningprizeflag" ng-style="getStyle(\'resultbtn\')" ng-show="compData.JS.resultbtn.JS.isShow" ng-bind="compData.datas.btntext" ng-click="returnclick(compData.datas.action)"></div>'
			              +'<p ng-style="getStyle(\'resultmessage\')" ng-show="!winningprizeflag" ng-bind-html="to_trusted(compData.datas.message)" ></p><div ng-style="getStyle(\'resultbtn\')" ng-show="!winningprizeflag" ng-show="compData.JS.resultbtn.JS.isShow" ng-bind="compData.datas.btntext" ng-click="returnclick(compData.datas.action)"></div>'
			          +'</div>'
			        +'</div>'
			        +'<div class="c60_goldeneggs_tips" ng-style="getStyle(\'poptips\')" ng-show="timeoutflag">'			        
			          +'<div class="c60_goldeneggs_tipstitle" ng-style="getStyle(\'tipstitlewarp\')"><h5 ng-style="getStyle(\'tipstitle\')" ng-bind="compData.JS.tipstitle.JS.text" ng-style="getStyle(\'tipstitle\')"></h5><span class="c60_goldeneggs_tipsclose" ccid="c60_goldeneggs_tipsclose" ng-style="getStyle(\'tipsclose\')"  ng-click="popclose();$event.stopPropagation();"></span></div>'
			          +'<div class="c60_goldeneggs_tipscontent" ng-style="getStyle(\'tipscontent\')">'
			              +'<p ng-style="getStyle(\'resultmessage\')" ng-bind-html="to_trusted(compData.JS.resultmessage.JS.timeouttext)" ></p><div ng-style="getStyle(\'resultbtn\')" ng-show="compData.JS.resultbtn.JS.isShow" ng-bind="compData.JS.resultnochancebtn.JS.text" ng-click="returnclick(0)"></div>'
			          +'</div>'
			        +'</div>'
			        +'<div class="c60_goldeneggs_tips" ng-style="getStyle(\'popruletips\')" ng-show="popruleflag">'			        
			          +'<div class="c60_goldeneggs_tipstitle" ng-style="getStyle(\'tipstitlewarp\')"><h5 ng-style="getStyle(\'tipstitle\')" ng-bind="compData.JS.tipstitle.JS.text" ng-style="getStyle(\'tipstitle\')"></h5><span class="c60_goldeneggs_tipsclose c60_goldeneggs_tipscloserule" ccid="c60_goldeneggs_tipsclose" ng-style="getStyle(\'tipsclose\')"  ng-click="popclose();$event.stopPropagation();"></span></div>'
			          +'<div class="c60_goldeneggs_tipsrule" ng-style="getStyle(\'tipsrule\')"><h5 class="c60_goldeneggs_tipsruletitle" ng-bind="compData.JS.tipsruletitle.JS.text"  ng-style="getStyle(\'tipsruletitle\')"></h5><div ng-style="getStyle(\'tipsrulecontent\')"><div simplescroll ng-style="getStyle(\'tipsruledesc\')" ng-bind-html="to_trusted(compData.datas.desc)" ></div></div></div>'
			       +'</div>'
			      +'</div>',
        scope: {},
   controller: ["$scope", "$element", "$attrs", "$timeout", 'coreService', 'coreUtils', 'Const', '$sce',
               function($scope, $element, $attrs, $timeout, coreService, coreUtils, Const, $sce) {
                $scope.cid = $attrs.cid;
                $scope.compData = {
                    CSS: {},
                    JS: {}
                };
                $scope.eventMap = {};
                //整个页面显示状态
                $scope.showflag=false;
                //弹出遮罩层显示状态
                $scope.popbgflag=false;
                //弹出loading显示状态
                $scope.poploadingflag=false;
                //弹出砸蛋结果显示状态
                $scope.poptipsflag=false;
                //弹出砸蛋规则显示状态
                $scope.popruleflag=false;
                //砸蛋区域是否可点击状态
                $scope.goldeneggsbtnflag=true;
                //默认剩余次数
                $scope.number=0;
                //默认已点击次数
                $scope.clicknum=0;
                //默认已点击次数
                $scope.maxclicknum=0;
                //记录第一次被点击金蛋
                $scope.firstclickobj='';
                $scope.firstclickfalg=true;
                //金蛋2次点击时间间隔(延迟防止点击过快)
                $scope.delaytime=0;     
                //点击金蛋解雇返回状态    
               // $scope.backflag=false;
                $scope.winningprizeflag=false;
                //活动未开始标记
                $scope.nowflag=false;
                //超时时提示到消息盒子查看
                $scope.timeoutflag=false;  
                
                //delayclose:全部弹出层倒计时关闭计时器
                //timeoutshow:超时时显示弹出层-到消息盒子查看计时器
                //timeoutclose:超时时显示弹出层倒计时关闭计时器          
				var delayclose,timeoutshow,timeoutclose;
				
				//HTML代码转义解析
				$scope.to_trusted = function(text) {
					if(text != null && text != undefined){
						text=text+'';
						return $sce.trustAsHtml(text.replace(/\n/g, "<br/>"));
					}else{
						return "";
					}
				}
				//样式
                $scope.getStyle = function(input) {
                    if ($scope.compData.JS[input] && $scope.compData.JS[input].CSS) {
                        return $scope.compData.JS[input].CSS;
                    }
                };
                $scope.goldeneggsimgStyle = function(input) {
                        return $scope.compData.JS.goldenegg.JS.stateconfig[input];
                };
				//显示砸金蛋结果弹出层
                $scope.showTips = function() {     	
                    $scope.poploadingflag=false;
                    $scope.popruleflag=false;
                	$scope.popbgflag=true;
                    $scope.poptipsflag=true;
                }
				//显示规则详情弹出层
                $scope.showRule = function() {     	
                    $scope.poploadingflag=false;
                    $scope.poptipsflag=false;
                	$scope.popbgflag=true;
                    $scope.popruleflag=true;
                    $scope.autoclosetips();
                }
				//自动隐藏全部弹出层
                $scope.autoclosetips = function(){
            		delayclose=setTimeout(function () {
                		$scope.doreset();
					},$scope.compData.JS.resultmessage.JS.autoclosetime)
                }
				//点击活动规则按钮
                $scope.queryRule = function() {
                	if (coreUtils.cdrUtils.canWriteUITracingCDR($scope.compData.JS.rule.JS.cdrConfig)) {
                        $scope.compData.JS['cdrData'] = {};
                        $scope.compData.JS.cdrData = {
                            'pageId': $scope.pageID,
                            'componentId': coreUtils.createCdrid($scope.pageID,$attrs.cid,'rule')
                        };
                        coreUtils.cdrService($scope.compData.JS.rule.JS.cdrConfig.uitracingcdr, $scope.compData.JS.cdrData);
                    }                	
                	$scope.showRule();
                }
				//点击中奖纪录按钮
                $scope.queryDetil = function() {
                	if (coreUtils.cdrUtils.canWriteUITracingCDR($scope.compData.JS.detail.JS.cdrConfig)) {
                        $scope.compData.JS['cdrData'] = {};
                        $scope.compData.JS.cdrData = {
                            'pageId': $scope.pageID,
                            'componentId': coreUtils.createCdrid($scope.pageID,$attrs.cid,'detail')
                        };
                        coreUtils.cdrService($scope.compData.JS.detail.JS.cdrConfig.uitracingcdr, $scope.compData.JS.cdrData);
                    }
                	coreService.fireEvent($element.attr('cid'),'queryRecord', {
						"lotteryid" : $scope.compData.datas.lotteryid
					});
                }
				//恢复默认状态：弹出层全部隐藏，锤子恢复默认位置，三个金蛋恢复默认样式
                $scope.doreset = function() {
                    $scope.popbgflag=false;
                    $scope.poptipsflag=false;
                    $scope.popruleflag=false;
                    $scope.winningprizeflag=false;
					hammer.css({'margin-left': $scope.defaultLeft,"top":$scope.defaultTop});
                    goldenegg1.css($scope.compData.JS.goldenegg.CSS);
                    goldenegg2.css($scope.compData.JS.goldenegg.CSS);
                    goldenegg3.css($scope.compData.JS.goldenegg.CSS);
                	$scope.firstclickobj='';
                	$scope.firstclickfalg=true;
                }
                //弹出层关闭按钮
                $scope.popclose = function() {
                	if (coreUtils.cdrUtils.canWriteUITracingCDR($scope.compData.JS.tipsclose.JS.cdrConfig)) {
                        $scope.compData.JS['cdrData'] = {};
                        $scope.compData.JS.cdrData = {
                            'pageId': $scope.pageID,
                            'componentId': coreUtils.createCdrid($scope.pageID,$attrs.cid,'tipsclose')
                        };
                        coreUtils.cdrService($scope.compData.JS.tipsclose.JS.cdrConfig.uitracingcdr, $scope.compData.JS.cdrData);
                    }

	                clearTimeout(delayclose);
                	$scope.doreset();
			}
                var _closetouchstart = Const.touchEvent.start,_
                    closetouchend = Const.touchEvent.end;
                angular.element($element[0].querySelector('.c60_goldeneggs_tipscloserule')).bind(_closetouchstart, function(e) {
	                clearTimeout(delayclose);
	                $scope.popclose();
                }); 
                angular.element($element[0].querySelector('.c60_goldeneggs_tipscloserule')).bind(closetouchend, function(e) {
	                clearTimeout(delayclose);
	                $scope.popclose();
                }); 
                //弹出层内容区按钮:再玩一次，返回首页等等
				$scope.returnclick = function(type) {
					if (coreUtils.cdrUtils.canWriteUITracingCDR($scope.compData.JS.resultbtn.JS.cdrConfig)) {
                        $scope.compData.JS['cdrData'] = {};
                        $scope.compData.JS.cdrData = {
                            'pageId': $scope.pageID,
                            'componentId': coreUtils.createCdrid($scope.pageID,$attrs.cid,'resultbtn')
                        };
                        coreUtils.cdrService($scope.compData.JS.resultbtn.JS.cdrConfig.uitracingcdr, $scope.compData.JS.cdrData);
                    }
					if(parseInt(type)==1){
						$scope.popclose();
					}else{
						coreService.fireEvent($element.attr('cid'), $attrs['event'] || 'click0');
					}
				}
				//页面加载时重置属性：页面显示状态，全部弹出层隐藏，清除倒计时事件
				$scope.hideConfirmDialog = function() {
	                $scope.showflag=false;
					$scope.popbgflag=false;
	                $scope.poploadingflag=false;
	                $scope.poptipsflag=false;
	                $scope.popruleflag=false;
                    $scope.winningprizeflag=false;
                    $scope.nowflag=false;
                	$scope.firstclickobj='';
                	$scope.firstclickfalg=true;
	                clearTimeout(delayclose);
				}
				//发送错误码请求，并显示错误页面
				$scope.senderrorcode = function(){		
					$scope.showflag=false;
					coreService.fireEvent($element.attr('cid'), $attrs['event'] || 'queryerror', {
						"errorcode" : parseInt($scope.compData.JS.resultmessage.JS.defaulterrorcode)
					});
					return false;
				}
				//通过随机码设定未中奖提示语和按钮
                $scope.getrandom= function(){
               	    var n=Math.floor(Math.random()*6);
        			$scope.compData.datas.message=$scope.compData.JS.resultfailuremessage.JS[n];
        			$scope.compData.datas.btntext=$scope.compData.JS.resultfailurebtn.JS.text;	
    				$scope.compData.datas.action=$scope.compData.JS.resultfailurebtn.JS.action;
               }
            	var hammer  = angular.element($element[0].querySelector('.c60_fbar_goldeneggs_hammer')),
            	goldenegg1 = angular.element($element[0].querySelector('.c60_fbar_midd_img1')),
				goldenegg2 = angular.element($element[0].querySelector('.c60_fbar_midd_img2')),
				goldenegg3 = angular.element($element[0].querySelector('.c60_fbar_midd_img3'));
	        	//锤子和金蛋等属性设定
	            $scope.currentPosition = function (){
					$scope.defaultTop=$scope.compData.JS.hammer.CSS["top"] || "-2em";
	                $scope.defaultLeft=$scope.compData.JS.hammer.CSS["margin-left"] || "0";
					$scope.currentTop=$scope.compData.JS.hammer.JS["top"] || "0";
					var left=$scope.compData.JS.imgli1.CSS["width"].replace(/(^\s*)|(\s*$)/g, "");
					$scope.currenttLeft1=-left.split("em")[0]+'em';
					$scope.currenttLeft2=0;
					$scope.currenttLeft3=left.split("em")[0]+'em';
					$scope.angle=$scope.compData.JS.hammer.JS["angle"] || "-30deg";
					hammer.css({'margin-left': $scope.defaultLeft,"top":$scope.defaultTop});
	                $scope.clicknum=0;
	                $scope.maxclicknum=parseInt($scope.compData.JS.hammer.JS["clickcount"]) || 3;
	                $scope.delaytime=parseInt($scope.compData.JS.hammer.JS["delaytime"]) || 500;
	                $scope.firstclickobj='';
	                $scope.firstclickfalg=true;
	                goldenegg1.css($scope.compData.JS.goldenegg.CSS);
	                goldenegg2.css($scope.compData.JS.goldenegg.CSS);
	                goldenegg3.css($scope.compData.JS.goldenegg.CSS);
					$scope.popbgflag=false;
	                $scope.poploadingflag=false;
	                $scope.poptipsflag=false;
	                $scope.popruleflag=false;
	            }
				//接受返回数据：砸金蛋页面相关信息
                $scope.updateData = function(param) {                	 
                	if(param.respparam && param.respparam!= null && param.respparam != undefined) {
                		$scope.compData.datas=param.respparam.goldeneggs;
                		if(typeof(param.respparam.goldeneggs.status)==undefined){
                			$scope.senderrorcode();
                		}         		
            			$scope.status=parseInt($scope.compData.datas.status);
            			$scope.number=parseInt($scope.compData.datas.count) || 0;                		
                		if($scope.status!==0){
                			$scope.goldeneggsbtnflag=false;
                			if($scope.compData.JS.resultmessage.JS.statustype[$scope.status]){
                				$scope.compData.datas.message=$scope.compData.JS.resultmessage.JS.statustype[$scope.status].text;
                				$scope.compData.datas.btntext=$scope.compData.JS.resultbtn.JS.statustype[$scope.status].text; 
                				$scope.compData.datas.action=$scope.compData.JS.resultbtn.JS.statustype[$scope.status].action; 
                			}else{
                    			$scope.senderrorcode();
                			}                			
                			var leng=$scope.compData.JS.resultmessage.JS.errorstatuscode;
                			for(var i=0;i<leng.split(",").length;i++){
                				if($scope.status==parseInt(leng.split(",")[i])){
                					$scope.showflag=false;
        							coreService.fireEvent($element.attr('cid'), $attrs['event'] || 'queryerror', {
        								"errorcode" : $scope.status
        							});
        							return false;
                				}
                			}      
                			$scope.nowflag=true;
                    		$scope.showflag=true;
                		}else{
                    		$scope.showflag=true;
		        			  if($scope.number!==0){
		                    		$scope.poploadingflag=true;		        				  
		        			  }else{
	                    			$scope.compData.datas.message=$scope.compData.JS.resultnochancemessage.JS.text;
	                    			$scope.compData.datas.btntext=$scope.compData.JS.resultnochancebtn.JS.text;	
	                				$scope.compData.datas.action=$scope.compData.JS.resultnochancebtn.JS.action; 	        				  
		        			  }         			
                		}
                		if($scope.number==0){
                			$scope.goldeneggsbtnflag=false;
                		}else{
                			$scope.goldeneggsbtnflag=true;
                		}
                	}
                	$scope.currentPosition();
                }  
              //接受返回数据：砸金蛋结果相关信息
                $scope.getResult = function(param) {
                	if (param.respparam.status != null && param.respparam.status != undefined && param.respparam.status != "") {
                		//$scope.backflag=true;
                		$scope.showTips();
    	                $scope.status=parseInt(param.respparam.status);
    	                $scope.type=parseInt(param.respparam.type);
                		$scope.number= parseInt(param.respparam.count) || 0;                		
                    		if(parseInt(param.respparam.status)==0){
                    			if(parseInt(param.respparam.type)==0){   
                    				//中奖
                                    $scope.winningprizeflag=true;  
                                    $scope.compData.datas.message=$scope.compData.JS.resultmessage.JS.statustype['0'].text;
	                    			$scope.compData.datas.prizename=param.respparam.name;
	                    		    $scope.compData.datas.btntext=$scope.compData.JS.resultbtn.JS.statustype["0"].text;	
	                				$scope.compData.datas.action=$scope.compData.JS.resultbtn.JS.statustype["0"].action;
                    			}else{   
                    				//未中奖
                                    $scope.winningprizeflag=false;
                                    $scope.getrandom();                   				
                    			}
                    		}else{
                				if($scope.compData.JS.resultmessage.JS.statustype[$scope.status]){
                    				$scope.compData.datas.message=$scope.compData.JS.resultmessage.JS.statustype[$scope.status].text;
                    				$scope.compData.datas.btntext=$scope.compData.JS.resultbtn.JS.statustype[$scope.status].text; 
                    				$scope.compData.datas.action=$scope.compData.JS.resultbtn.JS.statustype[$scope.status].action; 
                    			}else{
                    				//未中奖
                    				$scope.winningprizeflag=false;
                    				$scope.getrandom();                      				
                    			}   
                    		} 
                	}
                }
                //锤子过程动画
                $scope.hammerAngle = function (angle){
					hammer.css('-webkit-transform', 'rotate('+angle+')');
					hammer.css('-moz-transform', 'rotate('+angle+')');
					hammer.css('-ms-transform', 'rotate('+angle+')');
					hammer.css('-o-transform', 'rotate('+angle+')');
                }
                //根据配置的蛋破裂需砸次数-发送请求
                $scope.lastclick =function(){                 	
                	$scope.firstclickobj.css($scope.compData.JS.goldenegg.JS.stateconfig.state3);
                	$scope.popbgflag=true;
	                $scope.poploadingflag=true;	                

                    $scope.poptipsflag=false;
                    $scope.popruleflag=false;
                    $scope.winningprizeflag=false;
                	$scope.firstclickobj='';
                	$scope.firstclickfalg=true;
	                
					coreService.fireEvent($element.attr('cid'), $attrs['event'] || 'clickEgg', {
                        "pageId": $scope.pageID,
						"lotteryid" : $scope.compData.datas.lotteryid
					});
					$scope.clicknum=0;
					$scope.goldeneggsbtnflag=$scope.number!==0?true:false;
                }
                //处理砸金蛋次数出发结果请求
                $scope.statisticsclicknum = function (){
                	if($scope.clicknum==1){	        
                        if($scope.maxclicknum==1){ 
                        	$scope.lastclick();
                        }else{
                        	$scope.firstclickobj.css($scope.compData.JS.goldenegg.JS.stateconfig.state1);		                        	
                        }               	
                    }else if($scope.clicknum==2){       
                        if($scope.maxclicknum==2){
                        	$scope.lastclick();
                        }else{
                        	$scope.firstclickobj.css($scope.compData.JS.goldenegg.JS.stateconfig.state2);		                        	
                        }    
                    }else if($scope.clicknum==3){                     	
                    	    $scope.lastclick();
                    }else{ 
						//$scope.clicknum=0;
                		//$scope.showTips();
						//$scope.goldeneggsbtnflag=$scope.number!==0?true:false;
                    }
                }
                //砸金蛋触屏事件
                $scope.objTouch = function (obj,l,t){ 
                    var _touchstart = Const.touchEvent.start;
    				var _touchmove = Const.touchEvent.move;
    				var _touchend = Const.touchEvent.end;
    				var _lastYPos = 0;
    				var _lastXPos = 0;
    				var _currentYPos = 0;
    				var _currentXPos = 0;  					            	
                	obj.bind(_touchstart, function (e) {
                		if($scope.goldeneggsbtnflag){
                    		if($scope.number==0 || $scope.nowflag==true){
                   			 hammer.css({'margin-left': $scope.defaultLeft,"top":$scope.defaultTop});	
                   		   }else{
    						  hammer.css({'margin-left':l,"top":t});
    						  $scope.hammerAngle($scope.angle);                    		 	
                   		   }               			
                		}
					});
                	obj.bind(_touchend, function (e) {
                		    if($scope.nowflag){
                		    	$scope.showTips();
                        		$scope.autoclosetips();
                        		return false;
                		    }
	                		if($scope.number==0){
                    			$scope.compData.datas.message=$scope.compData.JS.resultnochancemessage.JS.text;
                    			$scope.compData.datas.btntext=$scope.compData.JS.resultnochancebtn.JS.text;	
                				$scope.compData.datas.action=$scope.compData.JS.resultnochancebtn.JS.action;
                        		$scope.showTips();
                        		$scope.autoclosetips();
	                		}else{
		                		if($scope.goldeneggsbtnflag){
									$scope.hammerAngle(0);
									$scope.clicknum=$scope.clicknum+1;
			                    	$scope.goldeneggsbtnflag=false;
			                        if($scope.firstclickfalg){
			                        	$scope.firstclickobj=obj;
			                        	$scope.firstclickfalg=false;
			                        }
			                        $timeout(function(){
			                        	if($scope.clicknum<$scope.maxclicknum){ 
			                        	  $scope.goldeneggsbtnflag=true;
			                        	}else{
				                          $scope.goldeneggsbtnflag=false;	                        		
			                        	}
		                    			$scope.goldeneggsbtnflag=$scope.number!==0?true:false;
			                        }, $scope.delaytime);
			                        $scope.statisticsclicknum();
		                        }
	                		}
					});
                }
                //三个金蛋触屏事件
                $scope.goldeneggTouch = function (){
    				$scope.objTouch(goldenegg1,$scope.currenttLeft1,$scope.currentTop);
    	            $scope.objTouch(goldenegg2,$scope.currenttLeft2,$scope.currentTop);
    	            $scope.objTouch(goldenegg3,$scope.currenttLeft3,$scope.currentTop);
                }
                $scope.init = function() {
                    coreService.registerComponentInstance($element.attr('cid'), $scope);
                    var properties = coreService.getInitProperties($attrs['cid']) || {};
                    $scope.compData = coreUtils.extendDeep($scope.compData || {}, properties);
                    $scope.compData.JS = $scope.compData.JS || {};
                    $element.css($scope.compData.CSS || {});
                    $scope.hideConfirmDialog();
                    $scope.currentPosition();
                    $scope.goldeneggTouch();
                }
                $scope.$on($attrs['cid'] + '_handleEvent', function(event, cevent, args, deferred) {
                    if($scope.eventMap[cevent]) {
                        $scope.eventMap[cevent](args);
                        if(null != deferred) {
                            deferred.resolve();
                        }
                    }
                });
                $scope.eventMap['update'] = $scope.updateData;
                $scope.eventMap['getResult'] = $scope.getResult;
                $scope.eventMap['hideConfirmDialog'] = $scope.hideConfirmDialog;
            }
        ],
        link: function($scope, $element, $attrs, ctl) {
            $scope.pageID = ctl.pageID;
            $scope.componentType = 'page';
            $scope.init();
        }
    }
}]);
uiCore.directive("iimagenotification",["coreService","coreUtils","$timeout",function(c,a,b){return{restrict:"AE",replace:true,transclude:true,template:'<div id="mainholder"><div id="notificationholder"><img class="imageholder" ccid="C60_fbar_imageholder" ng-src="{{campaign.image}}" ng-style="compData.JS.imageholder.CSS" ng-click="notificationClick()" /><div id="closeholder" class="C60_fbar_closeholder" ccid="C60_fbar_closeholder"  ng-bind="compData.JS.closeholder.JS.text"></div><div class="checkBtn" ng-show="compData.JS.checkBtn.JS.isShow" ccid="C60_fbar_checkBtn" ng-click="btnClick()" ng-style="compData.JS.checkBtn.CSS" ng-bind="compData.JS.checkBtn.JS.text"></div></div></div>',scope:{param:"=param"},require:"^pid",controller:["$scope","$element","$attrs","coreService","coreUtils","Const","$compile","$interval","$timeout",function(p,q,o,g,j,f,k,m,h){p.cid=o.cid;p.classid="."+p.cid;p.eventMap={};p.compData={CSS:{},JS:{}};p.campaign={};p.taskId="";p.btnClick=function(){if(top.tlbs.messageid!=""){g.fireEvent(p.cid,"messagestatuschange",{messageid:top.tlbs.messageid})}n("C60_fbar_checkBtn");var r=p.campaign;window.open(r.url)};p.extendComponentData=function(r){j.extendDeep(p.compData,r)};p.upDate=function(r){};p.init=function(){g.registerComponentInstance(p.cid,p);p.extendComponentData(g.getInitProperties(p.cid));var r=g.getInitProperties(o.cid)||{};p.compData.css=r.CSS||{};p.compData.js=r.JS||{};p.processConfig()};p.$on(p.cid+"_handleEvent",function(u,s,t,r){p.eventMap[s](t,r);if(null!=r){r.resolve()}});p.processConfig=function(){q.css(p.compData.CSS);angular.element(q[0].querySelector('[id="notificationholder"]')).css(p.compData.JS.notificationholder.CSS);angular.element(q[0].querySelector('[id="imageholder"]')).css(p.compData.JS.imageholder.CSS);angular.element(q[0].querySelector('[id="closeholder"]')).css(p.compData.JS.closeholder.CSS)};p.showNotification=function(r){if(null!=r&&null!=r.campaign.image){p.taskId=r.taskId;p.campaign=r.campaign;top.tlbs.messageid=r.messageid||"";d(p.campaign.image).done(function(){q.css("display","block");var s=p.compData.js.closeTime;if(top.tlbs.messageid!=""){h(function(){if(q.css("display")!="none"){top.tlbs.notificationCdrData=null}p.closeNotification()},s)}})}};p.eventMap.showNotification=p.showNotification;p.eventMap.update=p.upDate;var l=f.touchEvent.start,e=angular.element(q[0].querySelector(".C60_fbar_closeholder"));e.bind(l,function(r){r.stopPropagation();r.preventDefault();_lastYPos=r.touches?r.touches[0].pageY:r.pageY;_lastXPos=r.touches?r.touches[0].pageX:r.pageX;q.css({display:"none"});n("closebtn");top.tlbs.notificationCdrData=null});p.closeNotification=function(){q.css("display","none")};p.notificationClick=function(){if(top.tlbs.messageid!=""){g.fireEvent(p.cid,"messagestatuschange",{messageid:top.tlbs.messageid})}n("imagebtn",{taskId:p.taskId});q.css("display","none");if(p.campaign.linkType==undefined){p.campaign.linkType="0"}g.fireEvent(q.attr("cid"),"gotoPage",{linktype:p.campaign.linkType,url:p.campaign.url})};var i=[];function d(r){var s=0;var v=function(){};var r=(typeof r!="object")?[r]:r;function u(){s++;if(s==r.length){v(i)}}for(var t=0;t<r.length;t++){i[t]=new Image();i[t].src=r[t];i[t].onload=function(){u()};i[t].onerror=function(){u()}}return{done:function(w){v=w||v}}}function n(s,r){j.recordTracingCdr(p.pageID,p.pageID+"_"+s,p.compData.JS.cdrConfig,r)}}],link:function(f,e,d,g){f.pageID=g.pageID;f.componentType="iimagenotification";f.init()}}}]);
uiCore.directive("repackholder",[function(){return{restrict:"AE",replace:true,require:"^pid",scope:{},template:'<div class=" c60_fbar_taocan_tj"><div class="c60_fbar_sytips"><h1 class="c60_fbar_sytips_title"><span ng-bind-html="to_trusted(desc[0])"></span><b></b></h1><p class="c60_fbar_sytips_desc" ng-bind-html="to_trusted(desc[1])"></p></div><div class="c60_fbar_package"><div style="overflow:hidden"><pack ppid="pageID" taskid="taskId" ecid=cid recommandations=recommandations stateconfig="{{::compData.JS.config}}" config="{{::compData.js}}"  ng-repeat="pack in recommandations" pack-color="pack.color" packid="pack.id" pack-name="pack.categoryname" pack-price="pack.price" pack-total="pack.value"></pack></div><div class="c60_fbar_package_more" ng-show="compData.js.moreflag.isShow"><a class="c60_fbar_package_more_a" ng-click="toPackageStore()" ng-bind="compData.JS.config.recommandationtitle"></a></div></div></div>',controller:["$scope","$element","$attrs","coreService","coreUtils","Const","$compile",function(d,c,b,f,a,g,e){d.cid=b.cid;d.compData={JS:{config:{packages:{"margin-left":"0%","float":"none",margin:"0 auto"},}},CSS:{}};d.eventMap={};d.recommandations=[];d.taskId=null;d.to_trusted=function(h){return a.getTrustedHtml(h)};d.getDatavalue=function(i){if(i){for(var h=0;h<i.length;h++){if(i[h]){if(i[h].key=="2"){return i[h].value}}}}return""};d.show=function(){if(d.recommandations.length>0){setTimeout(function(){f.fireEvent(c.attr("cid"),"initfinished")},Number(d.compData.js.showdelay||1000))}};d.update=function(p){if(p){var t=p.respparam.desc||"";d.taskId=p.respparam.taskId;var j=t.split("|");d.desc=j;var q=[];if(p.respparam.recommandations){q=p.respparam.recommandations}d.recommandationlen=q.length;var z=[];var u=[];var n=d.revData;var v=function(i){for(var m in i){return true}return false};var w=[],k=0;for(var o=0;o<q.length;o++){u=q[o].list;for(var y=0;y<u.length;y++){var x=d.getDatavalue(u[y].comboProperies);w[k]={categoryname:q[o].categoryname||"",value:x,price:u[y].price||"",id:u[y].id};k++}}var s=Math.min(d.compData.js.packnum,w.length);for(var h=0;h<s;h++){d.recommandations[h]=w[h];d.recommandations[h].color=d.compData.js.packcolor["color"+h]||" "}var A={cdrType:"uinotiftracingcdr",enable:true,storeData:false};var l={taskId:d.taskId,componentId:"c60_fbar_p_package",pageId:d.pageID,message:"",sresptime:"",functionid:""};a.cdrService(A,l)}if(d.recommandationlen>0){if(d.compData.js.packagestore){d.compData.JS.config.recommandationtitle=d.compData.js.packagestore.title1}}else{if(d.compData.js.packagestore){d.compData.JS.config.recommandationtitle=d.compData.js.packagestore.title2}}if(d.compData.js.autoShow){d.show()}};d.toPackageStore=function(){f.fireEvent(c.attr("cid"),"topackagestore")};d.init=function(){f.registerComponentInstance(c.attr("cid"),d);var h=f.getInitProperties(b.cid)||{};d.compData.css=h.CSS||{};d.compData.js=h.JS||{};if(d.compData.js.packagestore){d.compData.JS.config.recommandationtitle=d.compData.js.packagestore.title2}f.fireEvent(c.attr("cid"),"init")};d.$on(b.cid+"_handleEvent",function(j,k,i,h){if(d.eventMap[k]){d.eventMap[k](i);if(null!=h){h.resolve()}}});d.eventMap.update=d.update;d.eventMap.show=d.show}],link:function(d,b,a,c){d.pageID=c.pageID;d.componentType="repackholder";d.init()}}}]);uiCore.directive("pack",function(){return{restrict:"EA",replace:true,require:"^?pid",scope:{name:"=packName",price:"=packPrice",total:"=packTotal",color:"=packColor",pkgid:"=packid",ecid:"=ecid",recommandations:"=recommandations",pageID:"=ppid",taskId:"=taskid"},template:'<div class="c60_fbar_packs" ><div class="c60_fbar_p_package"><div ccid="c60_fbar_p_package" ng-click="tostore();$event.preventDefault();$event.stopPropagation();"><div class="c60_fbar_package_title " ccid="c60_fbar_package_title" ><div class="c60_fbar_packagetip"><p class="c60_fbar_jybpackagetipp" style="background:{{color}}" ng-bind="name"></p></div><div class="c60_fbar_jybpackageprice" ><div class="c60_fbar_pricebgcolor" style="background:{{color}}"></div><p class="c60_fbar_packagepricep" ng-bind="price"></p></div></div><div class="c60_fbar_packagecont" ng-bind="total"></div></div></div></div>',controller:["$scope","$element","$attrs","coreService","coreUtils","Const",function(d,c,b,e,a,f){d.changeStyle=function(){var h=a.String2JSON(b.stateconfig);var i=d.recommandations;var g=i.length;if(g==1){c.css(h.packages)}};d.$watch(b,function(){d.changeStyle()});d.tostore=function(){var g=a.String2JSON(b.config);a.recordTracingCdr(d.pageID,d.pkgid,g.p_package.cdrConfig,{taskId:d.taskId});top.tlbs.ordersrc=d.pageID;e.fireEvent(d.ecid,"tostore",{pkgid:d.pkgid,taskid:d.taskId})};d.init=function(){}}],link:function(d,b,a,c){d.compData={JS:{},CSS:{}}}}});
uiCore.directive("redenvsrecord",[function(){return{restrict:"AE",require:"^pid",replace:true,template:"<div class = 'c60_fbar_redenvsrecord_infos' ><div class = 'c60_fbar_redenvsrecord_container_top'><div class = 'c60_fbar_redenvsrecord_container_top_tips'><div ><span class='c60_fbar_redenvsrecord_container_top_tips_info' ng-bind-html = 'getTopContainerTips(compData.JS.pagetipsinfoconfig.tips_in_top_container_text,temp.totalcount||0,totalcoins||0)'></span></div></div></div><div class = 'c60_fbar_redenvsredcord_container_bottom'><div class = 'c60_fbar_redenvsredcord_container_bottom_info' simplescroll><div class = 'c60_fbar_redenvsrecord_iteminfo' ng-repeat = 'item in redenvsitems track by item.id' ng-click = 'queryredenvsinfo($index,item.redEnvelopID,item.totalcount,item.status,item.totalamount,item.expireTime,item.accessURL,item.usedcount)'><div class = 'c60_fbar_redenvsrecord_iteminfo_img' ng-style = 'compData.JS.c60_fbar_redenvsrecord_iteminfo_img.CSS' ></div><div class = 'c60_fbar_redenvsrecord_iteminfo_info1' ><div class ='c60_fbar_redenvsrecord_iteminfo_info1_type' ng-bind='redEnvsType[item.distributemode]' ></div><div class ='c60_fbar_redenvsrecord_iteminfo_info1_createtime' ng-bind='changeFormatTime(item.createTime)' ></div></div><div class = 'c60_fbar_redenvsrecord_iteminfo_info2' ><div class = 'c60_fbar_redenvsrecord_iteminfo_info2_coinmount' ng-bind='item.totalamount+compData.JS.pagetipsinfoconfig.coinunit_text'></div><div class = 'c60_fbar_redenvsrecord_iteminfo_info2_tips' ng-style = 'redEnvsTipsStyle(item.status)' ng-bind='getItemUsedTips(compData.JS.pagetipsinfoconfig.tips_of_each_redenvs_text,item.usedcount,item.totalcount,redEnvsStatus[item.status])'></div></div><div class='c60_fbar_redenvsrecord_iteminfo_clear'></div></div><div class = 'c60_fbar_redenvsrecord_moredata' ng-disable = 'btndisable' ng-click = '!btndisable&&queryMoreData({type:1})'  ng-bind = 'queryMoreBtnInfo'></div></div></div></div>",scope:{},controller:["$scope","$element","$attrs","coreService","coreUtils","Const",function(e,d,b,f,a,g){e.eventMap={};e.compData={CSS:{},JS:{}};var c=1;e.redenvsitems=[];var h={};e.init=function(){f.registerComponentInstance(d.attr("cid"),e);var j=f.getInitProperties(b.cid);e.compData.CSS=j.CSS||{};e.compData.JS=j.JS||{};angular.element(d[0].querySelector(".c60_fbar_redenvsrecord_container_top")).css(e.compData.CSS);e.redEnvsType={"1":e.compData.JS.pagetipsinfoconfig.nomarlRedEvns_text,"2":e.compData.JS.pagetipsinfoconfig.randomRedEvns_text};var i=e.compData.JS.pagetipsinfoconfig.redenvsfinish_text||"";var l=e.compData.JS.pagetipsinfoconfig.redenvssurplus_text||"";var k=e.compData.JS.pagetipsinfoconfig.redenvsdated_text||"";e.redEnvsStatus={"0":i,"1":l,"2":k};h={"0":e.compData.JS.pagetipsinfoconfig.redenvsfinishtitle_text+e.compData.JS.pagetipsinfoconfig.redenvs_text,"1":e.compData.JS.pagetipsinfoconfig.redenvssurplustitle_text+e.compData.JS.pagetipsinfoconfig.redenvs_text,"2":e.compData.JS.pagetipsinfoconfig.redenvsdatedtitle_text+e.compData.JS.pagetipsinfoconfig.redenvs_text};e.queryMoreBtnInfo=e.compData.JS.moredatatext};e.getTopContainerTips=function(l,k,j){var i=l;i=a.mergeParameter4Html(i,k,j);return i};e.getItemUsedTips=function(k,j,m,i){var l=k;l=a.mergeParameter4String(l,j,m,i);return l};e.initPageInfo=function(i){if(1!==c&&"0"!==i.respparam.result){angular.element(d[0].querySelector(".c60_fbar_redenvsrecord_moredata")).css({color:"#eee"});e.btndisable=true;e.queryMoreBtnInfo=e.compData.JS.errotext;return}if(i.respparam&&"0"===i.respparam.result){if(c===1){e.totalcoins=i.respparam.totalcoins}e.temp=i.respparam;e.redenvsitems=e.redenvsitems.concat(i.respparam.userRedEnvelop);if("0"===e.temp.moredatas){angular.element(d[0].querySelector(".c60_fbar_redenvsrecord_moredata")).css({color:"#eee"});e.btndisable=true}}else{f.fireEvent(b.cid,"error",{errorcode:i.respparam.result||"1"})}};e.changeFormatTime=function(i){if(i&&i.length===19){return i.substring(0,10)}};e.queryredenvsinfo=function(k,p,m,i,n,o,l,j){a.recordTracingCdr(e.pageID,b.cid+"_iteminfo",e.compData.JS.queryRedenvsRecordInfos.cdrConfig,{redEnvelopID:p});if(p){f.fireEvent(b.cid,"queryRedEnvsInfos",{pageType:i,stitle:h[i],totalcount:m,redEnvelopID:p,totalcoins:n,index:k,outTime:o,accessURL:l,usedcount:j})}};e.updateUnfinishRedEnvs=function(i){e.redenvsitems[i.index].usedcount=i.grabedcounts;e.redenvsitems[i.index].status=i.pageType};e.queryMoreData=function(i){a.recordTracingCdr(e.pageID,b.cid+"_moredata",e.compData.JS.queryMoreRedenvsRecord.cdrConfig);if("0"===i.type){c=1;e.redenvsitems=[]}else{c++}f.fireEvent(b.cid,"queryuserpublishedredenvs",{pageNum:e.compData.JS.pageNum,pageID:c})};e.redEnvsTipsStyle=function(i){if("1"===i){return e.compData.JS.c60_fbar_redenvsrecord_iteminfo_info2_tips_redEnvsSurplus.CSS}};e.eventMap.initPageInfo=e.initPageInfo;e.eventMap.queryMoreData=e.queryMoreData;e.eventMap.updateUnfinishRedEnvs=e.updateUnfinishRedEnvs;e.$on(b.cid+"_handleEvent",function(k,l,j,i){if(e.eventMap[l]){e.eventMap[l](j);if(null!==i){i.resolve()}}})}],link:function(d,b,a,c){d.pageID=c.pageID;d.componentType="redenvsrecord";d.init()}}}]);
uiCore.directive('recommendedpkg', [function () {
			return {
				restrict: 'AE',
				replace: true,
				require: '^pid',
				template: '<div>'
							+'<div "id="c60_fbar_recompkg_top" class="c60_fbar_recompkg_top">'
							+'<div class="c60_fbar_swiper_container" id="c60_fbar_swiper_container" ng-style="getContainerStyle();">'
							+'<div class="c60_fbar_swiper_wrapper" id="c60_fbar_swiper_wrapper" ng-style="getWrapperStyle(recommData.length);">'
							+'<div class="c60_fbar_swiper_slide" ng-style="getWidthStyle();" ng-repeat="data in recommData" ng-click="clickbanner(data,$index);$event.stopPropagation();">'
							+'<a ng-if="data.isImg" class="c60_fbar_swiper_banner">'
							+'<img class="c60_fbar_banner_img" ng-src="{{data.imgurl}}">'
							+'</a>'
							+'<div ng-if="data.isPkg" id="c60_fbar_swiper_box" class="c60_fbar_swiper_box">'
							+'<p class="c60_fbar_swiper_title" ng-bind="data.name"></p>'
							+'<div class="c60_fbar_swiper_pkg">'
							+'<div class="c60_fbar_swiper_btn" ng-bind="data.price+compData.JS.config.subscribe"></div>'
							+'<div class="c60_fbar_swiper_txt" ng-bind="data.comboProperies[0].value" ng-style="getPkgStyle();"></div>'
							+'</div>'
							+'</div>'
							+'</div>'
							+'</div>'
							+'</div>'
							+'<dl class="nav_list_point" id="nav_list_point" ng-style="getNavStyle();">'
							+'<dd class="nav_list_point_li" ng-repeat="nav in navData" ng-style="getPointStyle($index);"></dd>'
							+'</dl>'							
							+'</div>'
							+'</div>',
				scope : {},
				controller : ["$scope", "$element", "$attrs", 'coreService',
					'coreUtils',
					'Const',"$timeout", function ($scope, $element, $attrs, coreService, coreUtils, Const, $timeout) {
						$scope.compData = {
							"JS" : {},
							"CSS" : {}
						};
						$scope.recommData = [];
						$scope.eventMap = {};
						$scope.currentIndex = 0;
						$scope.currentPointIndex =0;
						var len = 0;
						var reg = /[a-zA-Z]/g;
		            	var toolbar = top.document.getElementById('tlbstoolbar');
		           	 	var fontSize = Number(toolbar.style.fontSize.replace(reg,""));
		           	 	$scope.slideWidth = parseInt(top.window.innerWidth-0.625*fontSize*2);
						/**
						 * 加载配置的页面样式
						 */
			           	$scope.getContainerStyle = function (){
			           		$scope.compData.JS.swiper.CSS["width"]= $scope.slideWidth+"px";
		                	return $scope.compData.JS.swiper.CSS;
			           	};
						$scope.getWrapperStyle = function (length){
							 return {"width":($scope.slideWidth*length)+"px","height":$scope.compData.JS.config.recommHeight};
		                 };
		                 $scope.getWidthStyle = function (){
		                     return {"width":$scope.slideWidth+"px"};
		                 };
		                 $scope.getPkgStyle = function(){
		                	 return $scope.compData.JS.pkgfont.CSS;
		                 };
		                 $scope.getNavStyle = function(){
		                	 if($scope.recommData.length < 2){
		                		 return {'display': 'none' };
		                	 }else{
			                	 var width = ($scope.recommData.length*2-1)*(0.4*fontSize);
			                	 var left =width/2;
			                     return {'margin-left':-left+"px" };
		                	 }
		                };
		                $scope.getPointStyle= function(index){
		                    if(index == $scope.currentPointIndex){
		                    	$scope.compData.JS.list_point.JS.stateconfig["left"] = 0.4*2*fontSize*index+"px";
		                        return $scope.compData.JS.list_point.JS.stateconfig||{"border": "1px solid #3abeaa","background": "#3abeaa"};
		                    }else{
		                    	 return {"left":0.4*2*fontSize*index+"px"};
		                    }
		                };
		                function isEmpty(obj){
		 	                for (var name in obj){
		 	                	return false;
		 	                }
		 	                return true;
		                 };
		                 /**
		                  * 页面加载时,数据初始化
		                  */
						 $scope.updateData = function(param) {
		                     if (param && !isEmpty(param.respparam) && ((!isEmpty(param.respparam.recommandations) && !isEmpty(param.respparam.recommandations[0])) || (!isEmpty(param.respparam.advlist) && param.respparam.advlist.length > 0 ))) {
		                    	 var percentage = (Number(param.respparam.left)/Number(param.respparam.total))*100;
		                    	 var imgDatas =[];
		                    	 var pkgDatas =[];
		                    	 var imgLen = 0;
		                    	 var temp =null;
		                    	 $scope.recommData = [];
		                    	 $scope.taskId = param.respparam.taskId;
		                    	 if( percentage > Number($scope.compData.JS.recommthreshold)){
		                    		 if(!isEmpty(param.respparam.advlist) && param.respparam.advlist.length > 0){
		                    			 imgDatas= param.respparam.advlist;
		                    			 imgLen = imgDatas.length;
		                    			 for(var i=0;i<imgLen;i++){
		                    				 temp = imgDatas[i];
		                    				 temp.isImg = true;
		                    				 $scope.recommData.push(imgDatas[i]);
		                    			 }
		                    		 }
		                    		 if(!isEmpty(param.respparam.recommandations) && !isEmpty(param.respparam.recommandations[0]) && !isEmpty(param.respparam.recommandations[0].list) && param.respparam.recommandations[0].list.length > 0){
		                    			 temp = param.respparam.recommandations[0].list[0];
		                				 temp.isPkg = true;
		                				 $scope.recommData.push(temp);
		                    		 }
		                    	 }else{
		                    		 if(!isEmpty(param.respparam.recommandations) && !isEmpty(param.respparam.recommandations[0]) && !isEmpty(param.respparam.recommandations[0].list) && param.respparam.recommandations[0].list.length > 0){
		                				 temp = param.respparam.recommandations[0].list[0];
		                				 temp.isPkg = true;
		                				 $scope.recommData.push(temp);
		                    		 }
		                    		 if(!isEmpty(param.respparam.advlist) && param.respparam.advlist.length > 0){
		                    			 imgDatas= param.respparam.advlist;
		                    			 imgLen = imgDatas.length;
		                    			 for(var j=0;j<imgLen;j++){
		                    				 temp = imgDatas[j];
		                    				 temp.isImg = true;
		                    				 $scope.recommData.push(temp);
		                    			 }
		                    		 }
		                    	 }
		                    	 len = $scope.recommData.length;
		                    	 var cdrConfig = {
			                             'cdrType': 'uinotiftracingcdr',
			                             'enable': true,
			                             'storeData': false
		                         };
		                         var cdrData = {
		                             'taskId': $scope.taskId,
		                             'componentId': 'c60_fbar_p_package',
		                             'pageId': $scope.pageID,
		                             'message': '',
		                             'sresptime': '',
		                             'functionid': ''
		                         };
		                         coreUtils.cdrService(cdrConfig, cdrData);
		                    	 if($scope.recommData.length < 1){
		                    		 $element.css("display","none");
		                    		 return false;
		                    	 }else{
		                    		 $element.css("display","block");
		                    	 }
		                    	 $scope.bannerpoint(0);
								 $scope.bannerinit($scope.recommData);
		                    	 $scope.navData = [];
		                         var navPoint = $scope.recommData.length;
		                         for(var p=0;p<navPoint;p++){
		                        	 $scope.navData.push({"id":p});
		                         }
		                     }
		                 };
		                 $scope.updateColor = function (param){
		                	 $element.removeClass("green-linears").removeClass("orange-linears").removeClass("red-linears");
		                	 $element.addClass(param.color ||"green-linears");
		                 }
		                 /**
		                  * 控制广告位滚动和点击事件
		                  */
		                 var direction="left",
		                 bannerobj= angular.element($element[0].querySelector('[id="c60_fbar_swiper_wrapper"]'));  
		 	             $scope.touchflag=false;
		 	             $scope.bannernum=1;
		 	             $scope.currentindex=0;
		 	             $scope.currentpoint=0;
		                  $scope.bannerinit = function(obj) {	
		 	               	 var dlmarginleft,
		 	               	 objwidth=$scope.compData.JS["list_point"].CSS["width"],
		 	               	 objmarginleft=$scope.compData.JS["list_point"].JS["margin-right"];
		 	               	
		 	               	 $scope.bannernum=obj.length;
		 	               	if(objwidth.indexOf("em")!=-1){
		 		                dlmarginleft=-$scope.bannernum*objwidth.split("em")[0];		                			
		 	               	}else if(objwidth.indexOf("px")!=-1){
		 		                dlmarginleft=-$scope.bannernum*objwidth.split("px")[0];	                			
		 	               	}else{		                		
		 		                dlmarginleft=-$scope.bannernum*objwidth;		                		
		 	               	}
		 	               	if(objmarginleft.indexOf("em")!=-1){
		 		                dlmarginleft=0.5*(-($scope.bannernum-1)*objmarginleft.split("em")[0]+dlmarginleft)+"em";
		 	               	}else if(objmarginleft.indexOf("px")!=-1){
		 		                dlmarginleft=0.5*(-($scope.bannernum-1)*objmarginleft.split("px")[0]+dlmarginleft)+"px";	                			
		 	               	}else{		                		
		 		                dlmarginleft=0.5*(-($scope.bannernum-1)*objmarginleft+dlmarginleft);		                		
		 	               	}
		 	               	$scope.bannerdefault();
		 	               	if($scope.bannernum>1){
		 	               		var time=parseInt($scope.compData.JS.swiper.JS.transitiontime/1000);
		 	               		$scope.touchflag=true;
		 	               		$scope.bannertransition(time);
		 	               		$scope.bannerautoscroll();
		 						$scope.bannertouch();
		 	               	}else{	
		 	               		$scope.bannerdefault();
		 	               	}
		 	            };
		 	            $scope.bannerdefault = function(){
		           		  $scope.touchflag=false;
		 		            direction="left";
		                     clearInterval($scope.autoscroll);	
		           		  $scope.bannertransform(0,1);
		 					  $scope.currentindex=0;
		 		              $scope.currentpoint=0;	
		 					  TotalDistance = 0;
		 					  bannerobj.unbind(_touchstart, touchstartfun);	
		 					  bannerobj.unbind(_touchmove, touchmovefun);
		 					  bannerobj.unbind(_touchend,touchmoveend);	
		 	            }
		 	            $scope.bannerautoscroll = function(){
		 	            	clearInterval($scope.autoscroll);	
		 	            	$scope.autoscroll=setInterval(function () {
		 		            	if($scope.currentindex==0){
		  		                    direction="left";
		 	          			}
		 	          			if($scope.currentindex==-($scope.bannernum-1)){
		 	 		                    direction="right";
		 	          			}
		 	          			if(direction=="left"){
		 	              			$scope.currentindex=$scope.currentindex-1;
		 			            	$scope.currentpoint=$scope.currentpoint+1;
		 			            	$scope.bannerpoint($scope.currentpoint);
		 			            	$scope.bannertransform($scope.currentindex,$scope.bannernum);
		 								
		 	          			}else{
		 	              			$scope.currentindex=$scope.currentindex+1;
		 			            	$scope.currentpoint=$scope.currentpoint-1;
		 			            	$scope.bannerpoint($scope.currentpoint);
		 			            	$scope.bannertransform($scope.currentindex,$scope.bannernum);
		 							
		 	          			}


		 					},Number($scope.compData.JS.swiper.JS.autoscrolltime))
		 	            }
		               $scope.bannerpoint = function (current){	
		             	 $scope.currentPointIndex =current;
		             	 $timeout(function() {
		             		 $scope.currentPointIndex =current;
		                  }, Number($scope.compData.JS.swiper.JS.transitiontime)/2);
		               }
		               $scope.bannertransition = function (time){		                	
		             	  bannerobj.css('transition', 'transform '+time+'s');
		             	  bannerobj.css('moz-transition', '-moz-transform '+time+'s');
		             	  bannerobj.css('-webkit-transition', '-webkit-transform '+time+'s');
		             	  bannerobj.css('-o-transition', '-o-transform '+time+'s');
		               }	
		               $scope.bannertransform = function (currentindex,bannernum){ 
		             	  bannerobj.css('-webkit-transform', 'translate('+(currentindex*$scope.slideWidth)+'px,0)');
		             	  bannerobj.css('-moz-transform', 'translate('+(currentindex*$scope.slideWidth)+'px,0)');
		             	  bannerobj.css('-ms-transform', 'translate('+(currentindex*$scope.slideWidth)+'px,0)');
		             	  bannerobj.css('-o-transform', 'translate('+(currentindex*$scope.slideWidth)+'px,0)');
		             	 // bannerobj.css('margin-left', '-1px');		                	
		               }
		               function timedCount()
		               {
		            	    top.document.querySelector('.c60_fbar_ballcanvas').style['position']= 'absolute'; 
		             		top.document.querySelector('.c60_fbar_ballcanvas').style['padding']= '0'; 
		             		top.document.querySelector('.c60_fbar_ballcanvas').style['margin']= '0'; 
		             		top.document.querySelector('.c60_fbar_ballcanvas').style['left']= '0';
		                    t=setTimeout("timedCount()",0)
		               }
		               /**
		                * 广告点击事件
		                */
		               $scope.clickbanner = function(data,index) {
		               	if (coreUtils.cdrUtils.canWriteUITracingCDR($scope.compData.JS.swiper.JS.cdrConfig)) {
		 	                    $scope.compData.JS['cdrData'] = {};
		 	                    $scope.compData.JS.cdrData = {
		 	                        'pageId': $scope.pageID,
		 	                        'componentId': coreUtils.createCdrid($scope.pageID, '', 'swiper_'+index)
		 	                    };
		 	                    coreUtils.cdrService($scope.compData.JS.swiper.JS.cdrConfig.uitracingcdr, $scope.compData.JS.cdrData);
		 	                }
		 	                top.tlbs.notificationCdrData = null;
		 	                if(data.isPkg){
		 	                	coreService.fireEvent($element.attr('cid'), 'tostore', {
		 	                		'pkgid': data.id,
		 	                        'taskid': $scope.taskId
		 	                    });
		 	                }else{
		 		                coreService.fireEvent($element.attr('cid'), 'gotoPage', {
		 	                       "linktype": data.linktype,
		 	                       "url": data.url,
		 	                       "title":$scope.compData.JS.swiper.JS.title
		 	                   });
		 	                }
		               };
		               var _touchstart = Const.touchEvent.start;
		 				var _touchmove = Const.touchEvent.move;
		 				var _touchend = Const.touchEvent.end;
		 				var _lastXPos = 0;
		 				var _currentXPos = 0;  		
		 				var Xdistance = 0;	
		 				var TotalDistance = 0;
		 				touchstartfun=  function (e) {
		 					if(!$scope.touchflag){
		 						return false;
		 					}
		 					_lastXPos = e.touches ? e.touches[0].pageX : e.pageX;
		 					 clearInterval($scope.autoscroll);	
		 				}
		 				touchmovefun=  function (e) {
		 					if(!$scope.touchflag){
		 						return false;
		 					}
		 					_currentXPos = e.touches ? e.touches[0].pageX : e.pageX;   
		 				}  
		 				touchmoveend=  function (e) {
		   					if(!$scope.touchflag){
		   						return false;
		   					}
		 						 Xdistance=_currentXPos - _lastXPos;
		 						 if(Xdistance>0){	
		 							 if (Xdistance> $scope.compData.JS.swiper.JS.mindistance) {	
		 								 if($scope.currentindex<0){
		 									    $scope.currentindex=$scope.currentindex+1;
		 					            		$scope.currentpoint=$scope.currentpoint-1;
		 					            		$scope.bannerpoint($scope.currentpoint);
		 						            	$scope.bannertransform($scope.currentindex,$scope.bannernum);
		 								 }	
		 		                     }
		 						 }else{	
		 							 if (-Xdistance> $scope.compData.JS.swiper.JS.mindistance) {
		 								 if($scope.currentindex>-($scope.bannernum-1)){
		 								    $scope.currentindex=$scope.currentindex-1;
		 				            		$scope.currentpoint=$scope.currentpoint+1;	
		 				            		$scope.bannerpoint($scope.currentpoint);
		 					            	$scope.bannertransform($scope.currentindex,$scope.bannernum);
		 								 }		
		 		                     }						 
		 						 }
		                        $scope.bannerautoscroll();			                		
		                        _lastXPos = 0;
		                        _currentXPos = 0;  	
		                        Xdistance = 0;	
		                        TotalDistance = 0;	
		 				};
		 	            $scope.bannertouch = function (){      
		 	  				if($scope.touchflag){
		 		    				bannerobj.unbind(_touchstart, touchstartfun);	
		 		    				bannerobj.unbind(_touchmove, touchmovefun);
		 		    				bannerobj.unbind(_touchend,touchmoveend);	
		 		    				bannerobj.bind(_touchstart, touchstartfun);	
		 		    				bannerobj.bind(_touchmove, touchmovefun);
		 		    				bannerobj.bind(_touchend,touchmoveend);
		 	  				}else{
		 		    				bannerobj.unbind(_touchstart, touchstartfun);	
		 		    				bannerobj.unbind(_touchmove, touchmovefun);
		 		    				bannerobj.unbind(_touchend,touchmoveend);		    					
		 	  				}
		 	            };
						$scope.init = function () {
							coreService.registerComponentInstance($element.attr('cid'), $scope);
							var properties = coreService.getInitProperties($attrs['cid']) || {};
							$scope.compData.CSS = properties.CSS || {};
							$scope.compData.JS = properties.JS || {};
							$element.css($scope.compData.CSS);
						};
						$scope.$on($attrs['cid'] + '_handleEvent', function (event, cevent, args, deferred) {
							if ($scope.eventMap[cevent]) {
								$scope.eventMap[cevent](args);
								if (null != deferred) {
									deferred.resolve();
								}
							}
						});
						$scope.eventMap['update'] = $scope.updateData;
						$scope.eventMap['updatecolor'] = $scope.updateColor;
					}
				],
				link : function ($scope, $element, $attrs, ctl) {
					$scope.pageID = ctl.pageID;
					$scope.cid = $attrs['cid'];
					$scope.componentType = 'recommendedpkg';
					$scope.init();
				}
			}
		}
	]);
uiCore.directive('cniappiconholder', [
		'coreService',
		'coreUtils',
		'$timeout',
		function (coreService, coreUtils, $timeout) {
			return {
				restrict : 'AE',
				replace : true,
				transclude : true,
				template : '<div id="c60_fbar_app_container" class="c60_fbar_app_container">'
			            +'<ul class="c60_fbar_app_container_ul clearfloat" id="c60_fbar_app_container_ul" ng-show="isShowApp1">'
			            +'<li class="c60_fbar_app_container_li" id="{{\'c60_fbar_list_\'+$index%9}}" ng-repeat="app in appDatas" ng-click="appclick(app,$index);$event.stopPropagation();">'
			            +'<a class="c60_fbar_app_container_a" ng-style="getNavlistStyle();">'
			            +'<p class="c60_fbar_app_ball" ng-style="getAppBallStyle($index);">'
			            +'<span class="c60_fbar_icontip" ng-if="app.tip.isShow"><span class="c60_fbar_icontip_img" ng-style="getTipImgStyle(app.tip.CSS);"></span></span>'
			            +'<span class="c60_fbar_icon_img" ng-style="getImgStyle(app.defaultimage)"></span>'
			            +'</p>'
			            +'</a>'
			            +'<p class="c60_fbar_icon_title" ng-bind="app.name" ng-style="getTitleStyle($index)"></p>'
			            +'</li>'
			            +'</ul>'
			            +'<ul class="c60_fbar_app_container_ul clearfloat" id="c60_fbar_app_container_ul" ng-show="isShowApp2">'
			            +'<li class="c60_fbar_app_container_li_2" id="{{\'c60_fbar_list_\'+$index%9}}" ng-repeat="app in appDatas" ng-click="appclick(app,$index);$event.stopPropagation();">'
			            +'<a class="c60_fbar_app_container_a_2" ng-style="getNavlistStyle_2();">'
			            +'<p class="c60_fbar_app_ball" ng-style="getAppBallStyle($index);">'
			            +'<span class="c60_fbar_icontip" ng-if="app.tip.isShow"><span class="c60_fbar_icontip_img" ng-style="getTipImgStyle(app.tip.CSS);"></span></span>'
			            +'<span class="c60_fbar_icon_img" ng-style="getImgStyle(app.defaultimage)"></span>'
			            +'</p>'
			            +'</a>'
			            +'<p class="c60_fbar_icon_title_2" ng-bind="app.name" ng-style="getTitleStyle_2($index)"></p>'
			            +'</li>'
			            +'</ul>'
			            +'<div class="c60_fbar_border_bottom" id="c60_fbar_border_bottom" ng-show="isShowApp2"></div>'
			            +'<div class="c60_fbar_border_left"  id="c60_fbar_border_left" ng-show="isShowApp2"></div>'
						+'</div>',
				scope : {},
				require : '^pid',
				controller : ["$scope", "$element", "$attrs", 'coreService',
					'coreUtils',
					'Const',
					function ($scope, $element, $attrs, coreService, coreUtils, Const) {
						$scope.cid = $attrs.cid;
						$scope.classid = '.' + $scope.cid;
						$scope.eventMap = {};
						$scope.compData = {
							'CSS' : {},
							'JS' : {}
						};
						$scope.isShowApp1 = false;
						$scope.isShowApp2 = false;
						$scope.appDatas=top.tlbs.appholder||[];
						var HAS_RED_DOT = "1";
						var NO_REDO_DOT = "0";
						var MSGBOX_CONTENT = "-1";
						var EFFECT_UP_STATUS = "1";
						var RED_DOT_DATA ;
						var iconcontainer = angular.element($element[0].querySelector('[id="c60_fbar_app_container_ul"]'));
						var border_bottom = angular.element($element[0].querySelector('[id="c60_fbar_border_bottom"]'));
						var border_left = angular.element($element[0].querySelector('[id="c60_fbar_border_left"]'));
						var isQidaiApp=false;
						var qidaiAppId=0;
						/**
						 * 页面加载,数据初始化
						 */
						$scope.updateData = function (){
							iconcontainer.removeClass("c60_fbar_doublestyle").removeClass("c60_fbar_triplestyle").removeClass("c60_fbar_quatarystyle")
							var applen=$scope.appDatas.length;
							var defaultApp = $scope.compData.JS.appstyle.JS["defaultApp"];
							var defaultLen = Number($scope.compData.JS.appstyle.JS["default"].number)||9;
							if(applen > 0){
								var config=null;
								if(applen <= defaultLen){
									config=$scope.compData.JS.appstyle.JS[""+applen];
									iconcontainer.addClass(config.styleconfig);
									if(config.isPlus){
										isQidaiApp=true;
										qidaiAppId=applen;
										$scope.appDatas.push(defaultApp);
									}
								}else{
									config=$scope.compData.JS.appstyle.JS["default"];
									iconcontainer.addClass(config.styleconfig);
									if(config.isPlus){
										isQidaiApp=true;
										qidaiAppId=applen;
										$scope.appDatas.push(defaultApp);
									}
								}
							}else{
								if($scope.compData.JS.appstyle.JS["0"].isPlus){
									isQidaiApp=true;
									qidaiAppId=applen;
									$scope.appDatas.push(defaultApp);
									iconcontainer.addClass($scope.compData.JS.appstyle.JS["0"].styleconfig);
								}else{
									$scope.appIsShow =false;
								}
							}
							var appCount = $scope.appDatas.length;
							if(appCount == 1 || appCount ==2 || appCount ==4){
								$scope.isShowApp1 = false;
								$scope.isShowApp2 = true;
								if(appCount < 4){
									border_bottom.css("display","none");
									if(appCount < 2){
										border_left.css("display","none");
									}
								};
							}else{
								$scope.isShowApp1 = true;
								$scope.isShowApp2 = false;
							}
						};
						$scope.getIconStyle = function (index){
							if($scope.compData.JS.c60_fbar_icon.JS["color"+index]){
								return $scope.compData.JS.c60_fbar_icon.JS["color"+index];
							}
						};
						$scope.getNavlistStyle = function (){
							return $scope.compData.JS.container_a||{"height": "2.8125em","width": "2.8125em","padding-top": "0.8em"};
						};
						$scope.getNavlistStyle_2 = function (){
							return $scope.compData.JS.container_a_2||{"height": "2.8125em","width": "2.8125em","padding-top": "0.8em"};
						};
						$scope.getTipImgStyle = function (CSS){
							return CSS||{"width": "100%","height": "auto"};
						};
						$scope.getAppBallStyle = function (index){
							if(isQidaiApp&&index==qidaiAppId){
								return $scope.compData.JS.app_ball.JS;
							}else{
								return $scope.compData.JS.app_ball.CSS;
							}
						}
						$scope.getImgStyle = function (image){
							image= image.replace(/'/g,"");
							$scope.compData.JS.icon_img.CSS["background-image"] ="url('"+image+"')";
							return $scope.compData.JS.icon_img.CSS||{"background-size": "100% 100%","width": "2.8125em","height": "2.8125em","background-image":"url('"+image+"')"};
						};
						$scope.getTitleStyle = function (index){
							if(isQidaiApp&&index==qidaiAppId){
								$scope.compData.JS.icon_title["color"] = "#ccc";
							}else{
								$scope.compData.JS.icon_title["color"] = "rgb(51, 51, 51)";
							}
							return $scope.compData.JS.icon_title;
						};
						$scope.getTitleStyle_2 = function (index){
							if(isQidaiApp&&index==qidaiAppId){
								$scope.compData.JS.icon_title_2["color"] = "#ccc";
							}else{
								$scope.compData.JS.icon_title_2["color"] = "rgb(51, 51, 51)";
							}
							return $scope.compData.JS.icon_title_2;
						};
						$scope.extendComponentData = function (componetData) {
							coreUtils.extendDeep($scope.compData, componetData);
						};
						$scope.init = function () {
							coreService.registerComponentInstance($scope.cid, $scope);
							$scope.extendComponentData(coreService.getInitProperties($scope.cid));
							var properties = coreService.getInitProperties($attrs['cid']) || {};
							$scope.compData.CSS = properties.CSS || {};
		                    $scope.compData.JS = properties.JS || {};
		                    var tipconfig = $scope.compData.JS.icontip;
		                    $element.css($scope.compData.CSS);
		                    for(var i = 0; i < $scope.appDatas.length; i++){
		                    	if(tipconfig.JS[""+i] && tipconfig.JS[""+i] != null  && tipconfig.JS[""+i] != undefined){
		                    		$scope.appDatas[i]["tip"] = tipconfig.JS[""+i];
		                    	}else{
		                    		$scope.appDatas[i]["tip"]={"isShow":false,"imgUrl":"","CSS":{}};
		                    	}
							}
							//queryRedDotStatus();
							$scope.updateData();
						};
						function queryRedDotStatus (){
							var contents = getContent();
							coreService.fireEvent($element.attr('cid'), "querydotstatus", {"content" : contents});
						};
						function getContent (){
							var content = [MSGBOX_CONTENT];
							var app;
							var length = $scope.appDatas.length;
							for(var j = 0; j < length; j++){
								app = $scope.appDatas[j];
								content.push(app.content);
							}
							return content.toString();
						};
						function setRedDot (param) {
							if(!param || !param.respparam || !param.respparam.newmsgstatus){
								return;
							}
							RED_DOT_DATA = param.respparam.newmsgstatus;
							var app;
							var redDot;
							var reddotstatus;
							var length = $scope.appDatas.length;
							var tipconfig = $scope.compData.JS.icontip;
							for(var i in RED_DOT_DATA){
								redDot = RED_DOT_DATA[i];
								for(var j = 0; j < length; j++){
									app = $scope.appDatas[j];
									if (redDot.content == app.content && redDot.reddotStatus == HAS_RED_DOT){
										app.tip.isShow = true;	
										app.tip.imgUrl=tipconfig.JS[""+i].imgUrl;
										app.tip.CSS=tipconfig.JS[""+i].CSS;
									}else if(redDot.content == app.content && redDot.reddotStatus != HAS_RED_DOT){
										app.tip.isShow = false;
									}
								}
							}
							coreService.fireEvent($element.attr('cid'), "informAppData", {"reddot" : RED_DOT_DATA});
						};
						function clearRedDot (content) {
							var redDot;
							var reddotstatus;
							var length = $scope.appDatas.length;
							for(var i in RED_DOT_DATA){
								redDot = RED_DOT_DATA[i];
								for(var j = 0; j < length; j++){
									app = $scope.appDatas[j];
									if (content == app.content){
										app.tip.isShow = false;
									}
								  }
							   }
							coreService.fireEvent($element.attr('cid'), "informAppData", {"reddot" : RED_DOT_DATA});
							coreService.fireEvent($element.attr('cid'), "click", {"content" : content});
						};
						$scope.appLinkClick = function () {
							coreService.fireEvent($scope.cid, 'applinkClick');
						};
						/**
						 * app点击跳转
						 */
						$scope.appclick = function (app,index) {	
							/*if(app.tip.isShow){
								app.tip.isShow= false;
							}*/
							if(isQidaiApp&&index==qidaiAppId){
								return false;
							}
							if (app.linktype == '1') {
								window.open(app.url);
							} else {
								coreService.fireEvent($element.attr('cid'), 'clickappbtn', {
									"pageid" : app.pageid,
									"reload" : '1'
								});
							}
							coreService.fireEvent($element.attr('cid'), "informAppData", {"reddot" : RED_DOT_DATA});
							coreService.fireEvent($element.attr('cid'), "click", {"content" : app.content});
							tracingcdr(app.appid);
						};
						var tracingcdr = function (ccid) {
							coreUtils.recordTracingCdr($scope.pageID,ccid,$scope.compData.JS.cdrConfig);
						};
						$scope.gotopage = function (param) {
							coreService.fireEvent($element.attr('cid'), 'clickappbtn', {
								"pageid" : url
							});
						};

						$scope.topage = function (param) {
							var type = Number(param.linktype);
							var url = param.url;
							var title = param.title || '链接';
							if (url) {
								switch (type) {
								case 0:
									window.open(url);
									break;
								case 1:
									coreService.fireEvent($element.attr('cid'), 'embedpage', {
										"url" : url,
										'stitle' : title
									});
									break;
								case 2:
									param.pageid = url;
									coreService.fireEvent($element.attr('cid'), 'clickappbtn', param);
									break;
								case 9:
									break;
								default:
									window.open(url);
								}
								if (url != $scope.pageID && param.notify) {
									coreService.fireEvent($element.attr('cid'), "initsummary");
								}
							}
						};

						$scope.notifytopage = function (param) {
							var p = param;
							p.notify = true;
							$scope.topage(param);
						};
						$scope.eventMap['setRedDot'] = setRedDot;
						$scope.eventMap['queryRedDotStatus'] = queryRedDotStatus;
						$scope.eventMap['notifytopage'] = $scope.notifytopage;
						$scope.eventMap['topage'] = $scope.topage;
						$scope.eventMap['update'] = $scope.updateData;
						$scope.$on($attrs['cid'] + '_handleEvent', function (event, cevent, args, deferred) {
							if ($scope.eventMap[cevent]) {
								$scope.eventMap[cevent](args);
								if (null != deferred) {
									deferred.resolve();
								}
							}
						});

					}
				],
				link : function (scope, element, attrs, ctrl) {
					scope.pageID = ctrl.pageID;
					scope.componentType = 'cniappiconholder';
					scope.init();
				}
			};
		}
	]);
uiCore.directive('cnfbtn', [function () {
			return {
				restrict : 'AE',
				replace : true,
				require : '^pid',
				template : '<div class="c60_fbar_fbtn"><div ng-show="isRodShow" ng-style="compData.js.redDotStyle" class="c60_fbar_fbtn_newnews"></div></div>',
				scope : {},
				controller : ["$scope", "$element", "$attrs", 'coreService',
					'coreUtils',
					'Const', "$compile" ,"$timeout", function ($scope, $element, $attrs, coreService, coreUtils, Const, $compile,$timeout) {
						$scope.compData = {
							js : {},
							css : {
								"redDotStyle" :{}
							}
						};
						$scope.eventMap = {};
						var txtelement = angular.element($element[0].querySelector('.c60_fbar_fbtn_newnews'));
						/**
						 * 按钮点击事件
						 */
						$scope.clickbtn = function (e) {
							e.preventDefault();
							e.stopPropagation();
							coreUtils.recordTracingCdr($scope.pageID,$scope.cid + "_" + "btn",$scope.compData.js.cdrConfig);
							coreService.fireEvent($element.attr('cid'), "btnclick");
							if($element.attr('cid') == 'cnclosebtn'){
								if(top.window.location.href.indexOf("163.com")>=0 && /Android/ig.test(navigator.userAgent)){
			                		 var htmls = top.document.getElementsByTagName('html')[0];
			    					 var bodys = top.document.getElementsByTagName('body')[0];
			    					 htmls.style.overflowY='auto';
			    					 bodys.style.overflowY='auto';
			    					 top.document.querySelector('#l-indexheader').style['display']= 'block';
			    					 top.document.querySelector('.fixedhack').style['display']= 'block';
			    					 top.document.querySelector('.headslide').style['display']= 'block';
			    					 
			                	 }
							}
						};
						$scope.showTxt = function(data){
							if(data && data.text){
								if($scope.cid=="cnmessagebtn"){
									$scope.isRodShow = true;
								}else{
									$scope.compData.js.text = data.text;
									txtelement.css($scope.compData.js.state0||{});
								}
							}
						};
						$scope.hideTxt = function(){
							$scope.isRodShow = false;
						};
						$scope.queryMessageStatusFunOne = function(){
							 coreService.fireEvent($element.attr('cid'), 'queryMessageStatus');
						};
						$scope.eventMap['queryMessageStatusFunOne'] = $scope.queryMessageStatusFunOne;
						var queryMessageStatusFun = function(){
							 coreService.fireEvent($element.attr('cid'), 'queryMessageStatus');
							 $timeout(queryMessageStatusFun,Number($scope.compData.js.queryStatusTimer)*1000);
						};
						//每隔一段时间查询下消息状态
						$scope.queryMsgBoxTimer = function () {
							queryMessageStatusFun();
						};
						$scope.eventMap['queryMsgBoxTimer'] = $scope.queryMsgBoxTimer;
						$scope.queryMsgBox = function (data) {
							if(data && data.respparam){
								if(Number(data.respparam.unreadmessages) > 0){
									$scope.showTxt({"text":data.respparam.unreadmessages});
								}else{
									$scope.hideTxt();
								}
							}
						};
						$scope.eventMap['queryMsgBox'] = $scope.queryMsgBox;
						$scope.init = function () {
							coreService.registerComponentInstance($element.attr('cid'), $scope);
							var properties = coreService.getInitProperties($attrs['cid']) || {};
							$scope.compData.css = properties.CSS || {};
							$scope.compData.js = properties.JS || {};
							$element.css($scope.compData.css);
							txtelement.css($scope.compData.js.textstyle||{});
							//$element[0].addEventListener(Const.touchEvent.end,$scope.clickbtn,false);
							$element[0].addEventListener("click",$scope.clickbtn,false);
							coreService.fireEvent($element.attr('cid'), 'init');
							$scope.isRodShow = $scope.compData.js.isRodShow || false;
						};

						$scope.$on($attrs['cid'] + '_handleEvent', function (event, cevent, args, deferred) {
							if ($scope.eventMap[cevent]) {
								$scope.eventMap[cevent](args);
								if (null != deferred) {
									deferred.resolve();
								}
							}
						});
						$scope.eventMap['hidetxt'] = $scope.hideTxt;
						$scope.eventMap['showtxt'] = $scope.showTxt;
					}
				],
				link : function ($scope, $element, $attrs, ctl) {
					$scope.pageID = ctl.pageID;
					$scope.cid = $attrs['cid'];
					$scope.componentType = 'cnfbtn';
					$scope.init();
				}
			}
		}
	]);
uiCore.directive('cnsummary', [function() {
    return {
        restrict: 'AE',
        replace: true,
        require: '^pid',
        template: '<div><section class="c60_fbar_view" id="c60_fbar_personHome">'
            +'<div id="c60_fbar_flowcontainer" class="c60_fbar_flowcontainer" ng-style="getContainerStyle();">'
            +'<div id="c60_fbar_tophead" class="c60_fbar_tophead clearfloat">'
            +'<p id="c60_fbar_number" class="c60_fbar_number" ng-style="getNumberStyle()" ng-bind="compData.JS.msisdn"></p>'
            +'</div>'
            +'<div class="c60_fbar_midflow">'
	            +'<div class="c60_fbar_midflow_bd1px" ng-show="compData.JS.flowball.JS.isShow">'
	            	+'<div class="c60_fbar_flowball" id="c60_fbar_flowball" ng-click="ballclick();$event.stopPropagation();">'
	            		+'<div id="c60_fbar_flownormal" class="c60_fbar_flownormal" ng-show="compData.JS.ball.JS.isShow">'
		            		+'<div id="c60_fbar_flowValue" class="c60_fbar_flowValue">'
		            			+'<span id="c60_fbar_valnum" class="c60_fbar_valnum"></span>'
		            			+'<i ng-if="tip.JS.isShow" id="c60_fbar_flow_tip" class="c60_fbar_flow_tip" ng-bind="tip.JS.txt" ng-style="{\'font-size\':compData.JS.ball.JS.tipfont}"></i>'
		            		+'</div>'
		            		+'<p class="c60_fbar_seldomflowtip" id="c60_fbar_seldomflowtip"><span class="c60_fbar_text_desc_span" ng-bind="compData.JS.remainN.desc"></span>&nbsp;<span class="c60_fbar_text_desc_unit" ng-bind="compData.JS.remainN.u"></span></p>'
		            		+'<p id="c60_fbar_text_time" class="c60_fbar_seldomflowtime" ng-bind="compData.JS.traffictime" ng-style="{\'font-size\':compData.JS.ball.JS.timefont}"></p>'
		            		+'<p id="c60_fbar_text_click" ng-click="todetail();$event.stopPropagation();" class="c60_fbar_todetail" ng-bind="compData.JS.config.todetail" ng-style="{\'font-size\':compData.JS.ball.JS.detailfont}"></p>'
	            		+'</div>'
			            +'<div ccid="c60_fbar_ballcanvas" id="c60_fbar_ballcanvas" class="c60_fbar_ballcanvas">'
			            +'</div>'
			            +'<div id="c60_fbar_ballcover" class="c60_fbar_ballcover"></div>'
		            +'</div>'
	            +'</div>'
	            +'<div class="c60_fbar_flowball_error" id="c60_fbar_flowball_error" ng-show="compData.JS.errortips.isShow">'
	            	+'<div class="c60_fbar_flow_error" id="c60_fbar_flow_error">'
			            +'<div class="c60_fbar_container_error" ng-click="ballclick();$event.stopPropagation();">'
				            +'<div id="c60_fbar_flow_error_ball" class="c60_fbar_flow_error_ball">'
					            +'<p class="c60_fbar_flow_error_img" ng-style="getErrorStyle();"></p>'
					            +'<p id="c60_fbar_text_click" ng-if="compData.JS.errorconfig.JS.todetail.JS.isShow" ng-click="todetail();$event.stopPropagation();" class="c60_fbar_todetail" ng-bind="compData.JS.errorconfig.JS.todetail.JS.text" ng-style="getNocommonTodetail();"></p>'
				            +'</div>'
			            +'</div>'
			         +'</div>'
		            +'<div id="c60_fbar_flow_error_desc" class="c60_fbar_flow_error_desc" ng-bind="compData.JS.notification" ng-style="getErrorDescStyle();"></div>'
	            +'</div>'
	        +'</div>'
            +'</section></div>',
		scope: {},
					
        controller: ["$scope", "$element", "$attrs", 'coreService',
            'coreUtils',
            'Const', "$compile","$timeout",
            function($scope, $element, $attrs, coreService, coreUtils, Const, $compile,$timeout) {
        		$scope.slideWidth = (top.window.innerWidth-20);
        		var reg = /[a-zA-Z]/g;
            	var toolbar = top.document.getElementById('tlbstoolbar');
           	 	var fontSize = Number(toolbar.style.fontSize.replace(reg,""));
                $scope.compData = {
                    "JS": {
                    	"total":0,
                    	"left":0,
                    	"percentage":0,
                    	"notification":""
                    },
                    "CSS": {}
                };
                $scope.eventMap = {};
                $scope.tip ={
            		"JS":{
            			"isShow":false,
            			"txt":""
            		}
                };
                //流量球波浪canvas
                var bCanvasObj =angular.element($element[0].querySelector('[id="c60_fbar_ballcanvas"]'));
                //波浪canvas
                var progress = 0;
                var maxProcess = 101;
                var step = 1;
                var stoped = false;
                var canvas_w,canvas_h;
                function getObj(obj){
            	    if(obj!=="" && obj!==undefined){
            	        return document.getElementById(obj);
            	    }else{
            	        return undefined;
            	    }
            	}
                function CountUp(a, b, c, d, e, f) {
                    for (var g = 0, h = ["webkit", "moz", "ms", "o"], i = 0; i < h.length && !window.requestAnimationFrame; ++i)
                        window.requestAnimationFrame = window[h[i] + "RequestAnimationFrame"], window.cancelAnimationFrame = window[h[i] + "CancelAnimationFrame"] || window[h[i] + "CancelRequestAnimationFrame"];
                    window.requestAnimationFrame || (window.requestAnimationFrame = function(a) {
                        var c = (new Date).getTime(), d = Math.max(0, 16 - (c - g)), e = window.setTimeout(function() {
                            a(c + d)
                        }, d);
                        return g = c + d, e
                    }), window.cancelAnimationFrame || (window.cancelAnimationFrame = function(a) {
                        clearTimeout(a)
                    }), this.options = {useEasing: !0,useGrouping: !0,separator: ",",decimal: "."};
                    for (var j in f)
                        f.hasOwnProperty(j) && (this.options[j] = f[j]);
                    "" == this.options.separator && (this.options.useGrouping = !1), null == this.options.prefix && (this.options.prefix = ""), null == this.options.suffix && (this.options.suffix = "");
                    var k = this;
                    this.d = "string" == typeof a ? document.getElementById(a) : a, this.startVal = Number(b), this.endVal = Number(c), this.countDown = this.startVal > this.endVal, this.startTime = null, this.timestamp = null, this.remaining = null, this.frameVal = this.startVal, this.rAF = null, this.decimals = Math.max(0, d || 0), this.dec = Math.pow(10, this.decimals), this.duration = 1e3 * e || 2e3, this.version = function() {
                        return "1.4.0"
                    }, this.printValue = function(a) {
                        var b = isNaN(a) ? "--" : k.formatNumber(a);
                        "INPUT" == k.d.tagName ? this.d.value = b : "text" == k.d.tagName ? this.d.textContent = b : this.d.innerHTML = b
                    }, this.easeOutExpo = function(a, b, c, d) {
                        return 1024 * c * (-Math.pow(2, -10 * a / d) + 1) / 1023 + b
                    }, this.count = function(a) {
                        null === k.startTime && (k.startTime = a), k.timestamp = a;
                        var b = a - k.startTime;
                        if (k.remaining = k.duration - b, k.options.useEasing)
                            if (k.countDown) {
                                var c = k.easeOutExpo(b, 0, k.startVal - k.endVal, k.duration);
                                k.frameVal = k.startVal - c
                            } else
                                k.frameVal = k.easeOutExpo(b, k.startVal, k.endVal - k.startVal, k.duration);
                        else if (k.countDown) {
                            var c = (k.startVal - k.endVal) * (b / k.duration);
                            k.frameVal = k.startVal - c
                        } else
                            k.frameVal = k.startVal + (k.endVal - k.startVal) * (b / k.duration);
                        k.frameVal = k.countDown ? k.frameVal < k.endVal ? k.endVal : k.frameVal : k.frameVal > k.endVal ? k.endVal : k.frameVal, k.frameVal = Math.round(k.frameVal * k.dec) / k.dec, k.printValue(k.frameVal), b < k.duration ? k.rAF = requestAnimationFrame(k.count) : null != k.callback && k.callback()
                    }, this.start = function(a) {
                        return k.callback = a, isNaN(k.endVal) || isNaN(k.startVal) ? (console.log("countUp error: startVal or endVal is not a number"), k.printValue()) : k.rAF = requestAnimationFrame(k.count), !1
                    }, this.pauseResume = function() {
                        k.paused ? (k.paused = !1, k.startTime = null, k.duration = k.remaining, k.startVal = k.frameVal, requestAnimationFrame(k.count)) : (k.paused = !0, cancelAnimationFrame(k.rAF))
                    }, this.stop = function() {
                        cancelAnimationFrame(k.rAF)
                    }, this.resume = function() {
                        k.stop(), k.startTime = null, k.duration = k.remaining, k.startVal = k.frameVal, requestAnimationFrame(k.count)
                    }, this.reset = function() {
                        k.paused = !1, k.startTime = null, k.startVal = b, cancelAnimationFrame(k.rAF), k.printValue(k.startVal)
                    }, this.update = function(a) {
                        cancelAnimationFrame(k.rAF), k.paused = !1, k.startTime = null, k.startVal = k.frameVal, k.endVal = Number(a), k.countDown = k.startVal > k.endVal, k.rAF = requestAnimationFrame(k.count)
                    }, this.formatNumber = function(a) {
                        a = a.toFixed(k.decimals), a += "";
                        var b, c, d, e;
                        if (b = a.split("."), c = b[0], d = b.length > 1 ? k.options.decimal + b[1] : "", e = /(\d+)(\d{3})/, k.options.useGrouping)
                            for (; e.test(c); )
                                c = c.replace(e, "$1" + k.options.separator + "$2");
                        return k.options.prefix + c + d + k.options.suffix
                    }, k.printValue(k.startVal)
                }

                var waveLoading = function () {
                    "use strict";

                    var canvas, ctx;
                    var timer      = null;
                    var haveInited = false;
                    var waveBehind, waveFront;
                    var oldInitArgument;

                    // 全局常量声明，初始化在init中进行
                    var WIDTH, HEIGHT;
                    var LINE_OFFSET, R;
                    var COLOR, TEXT_COLOR, BACKGROUND_COLOR;
                    var GLOBAL_ALPHA, LINE_WIDTH;
                    var CALLBACK;
                    var SHOW_TEXT, TEXT_SIZE, FONT_FAMILY, FONT_WEIGHT;
                    var SPEED;

                    /**
                     * 初始化参数
                     * @param {object} options
                     */
                    function init(options) {
                        haveInited      = true;
                        oldInitArgument = options;
                        options         = options ? options : {};
                        canvas           =  options.target ? (typeof options.target === 'string' ? document.querySelector(options.target) : options.target) : top.document.getElementById('c60_fbar_canvas');//ballcanvas;
                        ctx              = canvas.getContext('2d');
                        WIDTH            = canvas.width;
                        HEIGHT           = canvas.height;
                        LINE_OFFSET      = 0.5;
                        R                = Math.min(WIDTH, HEIGHT) / 2;
                        COLOR            = options.color ? options.color : 'rgba(40, 230, 200, 1)';
                        BACKGROUND_COLOR = options.bgColor ? options.bgColor : 'white';
                        GLOBAL_ALPHA     = options.alpha ? options.alpha : 1;
                        LINE_WIDTH       = options.lineWidth ? options.lineWidth : 1;
                        CALLBACK         = options.callback ? options.callback : function () {};
                        SHOW_TEXT        = !!options.showText;
                        TEXT_SIZE        = options.textSize ? options.textSize + ' ' : '16px ';
                        TEXT_COLOR       = options.textColor ? options.textColor : COLOR;
                        FONT_FAMILY      = options.fontFamily ? ' ' + options.fontFamily : ' Helvetica, Tahoma, Arial, STXihei, "华文细黑", "Microsoft YaHei", "微软雅黑", sans-serif';
                        FONT_WEIGHT      = options.fontWeight ? options.fontWeight + ' ' : 'lighter ';
                        SPEED            = options.speed ? options.speed : 1;

                        ctx.strokeStyle = COLOR;
                        ctx.lineWidth   = LINE_WIDTH;
                        ctx.translate(WIDTH / 2, HEIGHT / 2);

                        // 背景波浪
                        waveBehind = wave({
                            alpha  : 0.5,
                            yOffset: -4,
                            speed  : 0.07 * SPEED
                        });

                        // 前景波浪
                        waveFront = wave({
                            alpha  : 0.8,
                            yOffset: 0,
                            speed  : 0.06 * SPEED
                        });
                    }

                    var progress = function () {
                        var _progress = 0;

                        function set(num) {
                            if (num >= 0 && num <= 101) {
                                _progress = num;
                            }
                        }

                        function get() {
                            return _progress;
                        }

                        function reset() {
                            set(0);
                        }

                        function isCompleted() {
                            return _progress >= 100;
                        }

                        return {
                            set        : set,
                            get        : get,
                            reset      : reset,
                            isCompleted: isCompleted
                        }
                    }();

                    function draw() {
                        if (!haveInited) {
                            return;
                        }

                        ctx.clearRect(-WIDTH / 2, -HEIGHT / 2, WIDTH, HEIGHT);

                        ctx.arc(0, 0, R, 0, Math.PI * 2);
                        ctx.stroke();

                        ctx.lineWidth = 1;
                        waveBehind.render();
                        waveFront.render();
                        //drawText();

                        if (!progress.isCompleted()) {
                            timer = requestAnimationFrame(draw);
                        } else {
                            finalDraw();
                        }
                    }

                    /**
                     * 进度完成后的绘制
                     * 接管前景波浪和背景波浪的进度控制
                     * 使其快速上升填满容器然后停止动画
                     */
                    function finalDraw() {
                        var tempProcess = progress.get();
                        var MAX_PROCESS = 120;
                        var STEP        = 0.8;

                        (function tempLoop() {
                            ctx.clearRect(-WIDTH / 2, -HEIGHT / 2, WIDTH, HEIGHT);
                            // 接管进度
                            waveFront.setOffset(tempProcess);
                            waveBehind.setOffset(tempProcess);
                            waveFront.render();
                            waveBehind.render();
                            //drawText();

                            if (tempProcess < MAX_PROCESS) {
                                tempProcess += STEP;
                                timer = requestAnimationFrame(tempLoop);
                            } else {
                                // 下面代码会导致结束时闪一下，暂不知原因
                                // 在波浪的render中，整个while循环结束时再stroke，要比每画一根线都stroke颜色要浅一些，可能与此有关，深色深浅瞬间变化
                                //  ctx.arc(0, 0, R, 0, Math.PI * 2);
                                //  ctx.fillStyle = COLOR;
                                //  ctx.fill();
                                //  ctx.stroke();
                                //  drawText();

                                // 重置与进度相关的属性，便于可能的再次绘制
                                progress.reset();
                                waveBehind.resetOffset();
                                waveFront.resetOffset();
                                // 执行结束时的回调函数
                                CALLBACK.call(null);
                            }
                        })()
                    }

                    /**
                     * 绘制进度提示字样（百分比）
                     */
                    function drawText() {
                        if (!SHOW_TEXT) {
                            return;
                        }

                        var THRESHOLD   = 55;
                        var tempProcess = progress.get();
                        tempProcess     = tempProcess > 100 ? 100 : tempProcess;
                        ctx.save();
                        ctx.font         = FONT_WEIGHT + TEXT_SIZE + FONT_FAMILY;
                        ctx.textBaseline = 'middle';
                        ctx.textAlign    = 'center';
                        ctx.fillStyle    = tempProcess > THRESHOLD ? BACKGROUND_COLOR : TEXT_COLOR;
                        ctx.fillText(tempProcess.toFixed(1) + '%', 0, 0);
                        ctx.restore();
                    }

                    function dist(x1, y1, x2, y2) {
                        x2 = x2 ? x2 : 0;
                        y2 = y2 ? y2 : 0;
                        return Math.sqrt(Math.pow((x1 - x2), 2) + Math.pow((y1 - y2), 2));
                    }

                    /**
                     * 单个基础波浪动画生成函数
                     */
                    function wave(options) {
                        options            = options ? options : {};
                        var xPos           = -R;
                        var yPos           = 0;
                        var xStep          = 1;
                        var angleStep      = 0.025;
                        var angle          = 0;
                        var alpha          = options.alpha ? options.alpha * GLOBAL_ALPHA : 1;
                        var peak           = options.peak ? options.peak : 18;
                        var yOffset        = options.yOffset ? options.yOffset : 0;
                        var angleIncrement = options.speed ? options.speed : 0.06;

                        var getAngle = function () {
                            var count = Math.PI / 2;
                            return function () {
                                count += angleIncrement;
                                return count;
                            }
                        }();

                        /**
                         * 偏移量处理
                         */
                        var offset = function () {
                            var count;
                            var basicOffset = 5;
                            var isTrusteed  = false;
                            var trusteedNum = 0;

                            function calc() {
                                var tempProcess = isTrusteed ? trusteedNum : progress.get();
                                count           = R - (2 * R) * tempProcess / 100 + yOffset + basicOffset;
                            }

                            function get() {
                                calc();
                                return count;
                            }

                            function trustee(num) {
                                isTrusteed  = true;
                                trusteedNum = num;
                            }

                            function reset() {
                                isTrusteed  = false;
                                trusteedNum = 0;
                            }

                            return {
                                get    : get,
                                reset  : reset,
                                trustee: trustee
                            }
                        }();

                        function render() {
                            ctx.save();
                            ctx.globalAlpha = alpha;

                            angle = getAngle();
                            xPos  = -R;
                            yPos  = 0;

                            ctx.beginPath();

                            while (xPos < R) {
                                var tempOffset = offset.get();
                                var yEnd       = Math.sqrt(Math.pow(R, 2) - Math.pow(xPos, 2));
                                var nextXPos   = xPos + xStep;
                                var nextYPos   = Math.sin(angle) * peak + tempOffset;
                                var nextAngle  = angle + angleStep;

                                // 解决canvas线宽（lineWidth）引起的坐标不准问题，引入LINE_OFFSET，偏移0.5个像素
                                ctx.moveTo(xPos - LINE_OFFSET, yPos);
                                ctx.lineTo(xPos - LINE_OFFSET, yEnd);

                                xPos  = nextXPos;
                                yPos  = dist(nextXPos, nextYPos) < R ? nextYPos : yEnd * (tempOffset > 0 ? 1 : -1);
                                angle = nextAngle;
                            }

                            ctx.closePath();
                            ctx.stroke();
                            ctx.restore();
                        }

                        return {
                            render     : render,
                            setOffset  : offset.trustee,
                            resetOffset: offset.reset
                        }
                    }

                    return {
                        init       : init,
                        draw       : draw,
                        get        : progress.get,
                        setProgress: progress.set
                    }
                }();

                
                //初始化波浪
                function initCanvas(){
                    waveLoading.init({
                        showText: true,
                        color   : 'rgba(255,255,255,0.8)',
                        alpha     : 0.8,
                        callback: function () {
                            stoped = true;
                        }
                    });
                    waveLoading.draw();
                    waveLoading.setProgress(100);
                }
                //动画执行剩余流量
                function initLeft(valnum,total,num,m) {
                    var options = {
                        useEasing: false, // toggle easing
                        useGrouping: true, // 1,000,000 vs 1000000
                        separator: ',', // character to use as a separator
                        decimal: '.' // character to use as a decimal
                    };
                    var demo = new CountUp(valnum, total, num, m, 2, options);
                    demo.start();
                }
                //设置波浪位置
                function setNewlevel(newlev){
                    speed=true;
                    if (stoped) {
                        waveLoading.draw();
                        stoped = false;
                    }
                    (function anim(){
                        var oldlev = parseInt(waveLoading.get());
                        waveLoading.setProgress(oldlev);
                        var dt = parseInt(newlev)- oldlev;
                        var DT = Math.abs(dt);
                        if(DT){
                            oldlev += (step*dt/DT);
                            waveLoading.setProgress(oldlev);
                            requestAnimationFrame(anim);
                        }
                        else{
                            waveLoading.setProgress(newlev);
                        }
                    })();
                }
                waveLoading;
                $scope.ballclick = function() {
					coreUtils.recordTracingCdr($scope.pageID, coreUtils.createCdrid($scope.pageID,$attrs['cid'],'ballclick'), $scope.compData.JS.cdrConfig);
                    coreService.fireEvent($element.attr('cid'), "ballclick");
                }
                $scope.todetail = function() {
                	coreUtils.recordTracingCdr($scope.pageID, coreUtils.createCdrid($scope.pageID,$attrs['cid'],'todetail'), $scope.compData.JS.cdrConfig);
                    coreService.fireEvent($element.attr('cid'), "todetail");
                }
                var transferK = function(value) {
                    return coreUtils.trafficValueTransferfromKB(value,Number($scope.compData.JS.floatnum||1));
                };
                var iskbunit= function(type){
                	return !type || type=='2';
                };
                var numfloat = Number($scope.compData.JS.floatnum||1);
                var calculateLeft = function(trafficarray) {
                	if (trafficarray && !isEmpty(trafficarray)) {
                		var leftN;
                		var left = Number(trafficarray.total)-Number(trafficarray.used);
                		if (iskbunit(trafficarray.categoryType)) {
                        	leftN = transferK(left);
                        	leftN.desc = $scope.compData.JS.ball.JS.remaindesc;
                        } else {
                        	leftN = {
                                v: coreUtils.formatNum(left,numfloat),
                                u: trafficarray.unit,
                                desc:$scope.compData.JS.ball.JS.remaindesc
                            };
                        }
                        return leftN;
                	}
                	return null;
                }
                var calculateOverflow = function(trafficarray) {
                	if (trafficarray && !isEmpty(trafficarray)) {
                		var overflowN;
                		var overflow = Number(trafficarray.overflow);
                		if (iskbunit(trafficarray.categoryType)) {
                        	overflowN = transferK(overflow);
                        	overflowN.desc= $scope.compData.JS.ball.JS.overflowdesc;
                        } else {
                        	overflowN = {
                                v: coreUtils.formatNum(overflow,numfloat),
                                u: trafficarray.unit,
                                desc:$scope.compData.JS.ball.JS.overflowdesc
                            };
                        }
                        return overflowN;
                	}
                	return null;
                }
                var calculateTotal = function(trafficarray) {
                	if (trafficarray && !isEmpty(trafficarray)) {
                		var totalN;
                		var total = Number(trafficarray.total);
                		if (iskbunit(trafficarray.categoryType)) {
                			totalN = transferK(total);
                        } else {
                        	totalN = {
                                v: coreUtils.formatNum(total,numfloat),
                                u: trafficarray.unit,
                            };
                        }
                        return totalN;
                	}
                	return null;
                }
                function isEmpty(obj){
 	                for (var name in obj){
 	                	return false;
 	                }
 	                return true;
                 };
                var flowcontainer = angular.element($element[0].querySelector('[id="c60_fbar_personHome"]'));
                $scope.tPercentage = 0;
                $scope.trafficData;
                var ballcanvas ;
                var valnum = angular.element($element[0].querySelector('[id="c60_fbar_valnum"]'))[0];
                $scope.compData.JS.remainN ;
                $scope.isInitCanvas = false;
                $scope.update = function(data) {
                	if((top.window.location.href.indexOf("163.com") || top.window.location.href.indexOf("sina.cn"))>=0 && /Android/ig.test(navigator.userAgent)){
     					 top.document.documentElement.scrollTop=0;
     					 top.document.body.scrollTop=0;
                  		 var htmls = top.document.getElementsByTagName('html')[0];
      					 var bodys = top.document.getElementsByTagName('body')[0];
      					 htmls.style.overflowY='hidden';
      					 bodys.style.overflowY='hidden';
      					 top.document.querySelector('#l-indexheader').style['display']= 'none';
      					 top.document.querySelector('.fixedhack').style['display']= 'none';
      					 top.document.querySelector('.headslide').style['display']= 'none';
                  	 }
                	top.document.querySelector('.c60_fbar_cnsummarydiv').style['-webkit-transform']= 'translate3d(0,0,0)';
                	top.document.querySelector('.c60_fbar_cnsummarydiv').style['-moz-transform']= 'translate3d(0,0,0)';
                	top.document.querySelector('.c60_fbar_cnsummarydiv').style['-o-transform']= 'translate3d(0,0,0)';
                	top.document.querySelector('.c60_fbar_cnsummarydiv').style['-ms-transform']= 'translate3d(0,0,0)';
                	top.document.querySelector('.c60_fbar_cnsummarydiv').style['transform']= 'translate3d(0,0,0)';
                	$element.removeClass("green-linear").removeClass("orange-linear").removeClass("red-linear");
                    if (data.respparam &&  !isEmpty(data.respparam) && !isEmpty(data.respparam.trafficusage) && !isEmpty(data.respparam.trafficusage.commontraffic)) {
                    	$scope.trafficData= data.respparam.trafficusage.commontraffic;
                    	//是否有通用套餐
                    	if($scope.trafficData && !isEmpty($scope.trafficData) && $scope.trafficData.total !=null && $scope.trafficData.total !=undefined && $scope.trafficData.total !="" && $scope.trafficData.total > 0 ){
                    		$scope.compData.JS.errortips.isShow=false;
                    		$scope.compData.JS.flowball.JS.isShow = true;
	                		$scope.compData.JS.ball.JS.isShow=true;
	                		$scope.trafficData= data.respparam.trafficusage.commontraffic;
	                		$scope.compData.JS.msisdn = data.respparam.trafficusage.msisdn;
	                		$scope.compData.JS.traffictime = data.respparam.trafficusage.traffictime;
	                		$scope.compData.JS.left = Number($scope.trafficData.total-$scope.trafficData.used);
	                		if($scope.compData.JS.left >= 0 && ($scope.trafficData.overflow <= 0 || $scope.trafficData.overflow == '') ){
	                			$scope.compData.JS.remainN = calculateLeft($scope.trafficData);
	                			$scope.tPercentage = $scope.compData.JS.left/$scope.trafficData.total*100;
	                			if($scope.tPercentage >= $scope.compData.JS.config.trafficthreshold.value1){
	                				$element.addClass("green-linear");
		                			$scope.tip.JS.isShow= false;
		                		}else if($scope.tPercentage >= $scope.compData.JS.config.trafficthreshold.value2){
		                			$element.addClass("orange-linear");
		                			$scope.tip.JS.isShow= true;
		                			$scope.tip.JS.txt = $scope.compData.JS.config.trafficthreshold.warning;
		                		}else{
		                			$element.addClass("red-linear");
		                			$scope.tip.JS.txt = $scope.compData.JS.config.trafficthreshold.alarm;
		                			$scope.tip.JS.isShow= true;
		                		}
	                		}else if($scope.trafficData.overflow > 0 && ($scope.compData.JS.left <= 0 || $scope.compData.JS.left == '')){
	                			$scope.compData.JS.remainN = calculateOverflow($scope.trafficData);
	                			$scope.tPercentage = 0;
	                			$element.addClass("red-linear");
	                			$scope.tip.JS.txt = $scope.compData.JS.config.trafficthreshold.alarm;
	                			$scope.tip.JS.isShow= true;
	                		}else if($scope.trafficData.overflow > 0 && $scope.compData.JS.left > 0){
	                			if(!$scope.compData.JS.showOverflow){  //不显示超出流量
	                				$scope.compData.JS.remainN = calculateLeft($scope.trafficData);
		                			$scope.tPercentage = $scope.compData.JS.left/$scope.trafficData.total*100;
		                			if($scope.tPercentage >= $scope.compData.JS.config.trafficthreshold.value1){
		                				$element.addClass("green-linear");
			                			$scope.tip.JS.isShow= false;
			                		}else if($scope.tPercentage >= $scope.compData.JS.config.trafficthreshold.value2){
			                			$element.addClass("orange-linear");
			                			$scope.tip.JS.isShow= true;
			                			$scope.tip.JS.txt = $scope.compData.JS.config.trafficthreshold.warning;
			                		}else{
			                			$element.addClass("red-linear");
			                			$scope.tip.JS.txt = $scope.compData.JS.config.trafficthreshold.alarm;
			                			$scope.tip.JS.isShow= true;
			                		}
	                			}else{
	                				$scope.compData.JS.remainN = calculateOverflow($scope.trafficData);
		                			$scope.tPercentage = 0;
		                			$element.addClass("red-linear");
		                			$scope.tip.JS.txt = $scope.compData.JS.config.trafficthreshold.alarm;
		                			$scope.tip.JS.isShow= true;
	                			}
	                		}else{
	                			$element.addClass("green-linear");
	                        	$scope.compData.JS.errorconfig = $scope.compData.JS.errortips['default'];
	                    		$scope.compData.JS.notification = $scope.compData.JS.errorconfig.JS.description;
	                    		$scope.compData.JS.flowball.JS.isShow = false;
	                    		$scope.compData.JS.errortips.isShow=true;
		                		$scope.compData.JS.ball.JS.isShow=false;
	                        }
	                		if($scope.compData.JS.ball.JS.isShow){
		                		var check;
		                    	if(fontSize<20){
		                    		check = 2;
		                    	}else{
		                    		check = 1;
		                    	}
		                    	try {
									for (var g = 0, h = ["webkit", "moz", "ms", "o"], i = 0; i < h.length && !window.requestAnimationFrame; ++i){
										window.requestAnimationFrame = window[h[i] + "RequestAnimationFrame"], window.cancelAnimationFrame = window[h[i] + "CancelAnimationFrame"] || window[h[i] + "CancelRequestAnimationFrame"];
									}
									if (!$scope.isInitCanvas) {
										$scope.isInitCanvas = true;
										bCanvasObj.css("display", "block");
										bCanvasObj[0].innerHTML = '<canvas id="c60_fbar_canvas" class="c60_fbar_canvas" width=' + '"' + (9 * fontSize * check) + '"' + ' height=' + '"' + (9 * fontSize * check) + '"' + '></canvas>';
										initCanvas(); //初始化波浪
									}
								} catch (e) {
									console.log("error");
								}
		                        var totalN= calculateTotal($scope.trafficData);
		                        var m = 0;
			                	if ($scope.compData.JS.remainN.v <= 10){
			                		m=1;
			                	}else{
			                		m=0;
			                	}
			                	if($scope.compData.JS.remainN.v >=100){
			                		angular.element($element[0].querySelector('[id="c60_fbar_flowValue"]')).css("padding-top", "0.625em");
			                		valnum.style["font-size"]="2em";
			                	}
			                	if($scope.trafficData.overflow>0){
			                		if(!$scope.compData.JS.showOverflow){
			                			initLeft(valnum,totalN.v,$scope.compData.JS.remainN.v,m);
				                		setNewlevel($scope.tPercentage);
			                		}else{
			                			initLeft(valnum,totalN.v,$scope.compData.JS.remainN.v,m);
				                		setNewlevel(0);
				                		$scope.tip.JS.isShow= true;
				                		bCanvasObj.css("display" , "none");
			                		}
			                	}else{
			                		initLeft(valnum,totalN.v,$scope.compData.JS.remainN.v,m);
			                		setNewlevel($scope.tPercentage);
			                	}
			                	if($scope.tPercentage == 0){
		                			bCanvasObj.css("display" , "none");
		                		}
	                		}
                    	}else{
                    		$element.addClass("green-linear");
                        	$scope.compData.JS.errorconfig = $scope.compData.JS.errortips['nocommon'];
                    		$scope.compData.JS.notification = $scope.compData.JS.errorconfig.JS.description;
                    		$scope.compData.JS.flowball.JS.isShow = false;
                    		$scope.compData.JS.errortips.isShow=true;
                        }
                    }else if(data.respparam &&  !isEmpty(data.respparam) && !isEmpty(data.respparam.trafficusage) && (isEmpty(data.respparam.trafficusage.traffics) || data.respparam.trafficusage.traffics.length < 1)){
                    	$element.addClass("green-linear");
                    	$scope.compData.JS.errorconfig = $scope.compData.JS.errortips['nodata'];
                		$scope.compData.JS.notification = $scope.compData.JS.errorconfig.JS.description;
                		$scope.compData.JS.flowball.JS.isShow = false;
                		$scope.compData.JS.errortips.isShow=true;
                    }else if(data.respparam &&  !isEmpty(data.respparam) && !isEmpty(data.respparam.trafficusage) && !isEmpty(data.respparam.trafficusage.traffics)  && data.respparam.trafficusage.traffics.length > 0){
                    	$element.addClass("green-linear");
                    	$scope.compData.JS.errorconfig = $scope.compData.JS.errortips['nocommon'];
                		$scope.compData.JS.notification = $scope.compData.JS.errorconfig.JS.description;
                		$scope.compData.JS.flowball.JS.isShow = false;
                		$scope.compData.JS.errortips.isShow=true;
                    }else{
                    	$element.addClass("green-linear");
                    	$scope.compData.JS.errorconfig = $scope.compData.JS.errortips['default'];
                		$scope.compData.JS.notification = $scope.compData.JS.errorconfig.JS.description;
                		$scope.compData.JS.flowball.JS.isShow = false;
                		$scope.compData.JS.errortips.isShow=true;
                    }
                };
                $scope.getparam = function(name) {
                    try{var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)", "i");
                        var r = top.window.location.search.substr(1).match(reg);
                        if (r != null) return unescape(r[2]);
            	        return "";
            	        }
            		catch(e){
            			
            		}
                 };
                 $scope.getContainerStyle = function (){
                	 return $scope.compData.JS.flowcontainer.CSS;
                 }
                 $scope.getNumberStyle = function (){
                     return $scope.compData.JS.number.CSS;
                 };
                 $scope.getCanvasStyle = function (){
                	 return $scope.compData.JS.canvasStyle.CSS;
                 };
                 $scope.compData.JS.errorconfig ;
                 $scope.getErrorStyle = function (){
                	 return $scope.compData.JS.errorconfig.CSS;
                 };
                 $scope.getErrorDescStyle = function (){
                	 return $scope.compData.JS.errortips.desc.CSS;
                 };
                 $scope.getNocommonTodetail = function (){
                	 return $scope.compData.JS.errorconfig.JS.todetail.CSS ;
                 }
                $scope.init = function() {
                    coreService.registerComponentInstance($element.attr('cid'), $scope);
                    var properties = coreService.getInitProperties($attrs['cid']) || {};
                    $scope.compData.css = properties.CSS || {};
                    $scope.compData.JS = properties.JS || {};
                    $element.removeClass("green-linear").removeClass("orange-linear").removeClass("red-linear");
                    $element.addClass("green-linear");
                    if($scope.compData.JS.isShowbgimg){
                    	flowcontainer.css($scope.compData.JS.bgimg)
                    }
                    $scope.compData.JS.flowball.JS.isShow = true;
                    $scope.compData.JS.errorconfig = {
    						"JS" : {
    							"description" : "",
    						},
    						"CSS" : {
    							"background-position" : "center 60%",
    							"background-size" : "8em 4em"
    						}
    					};
                    //$scope.$broadcast('abnormaltipsinit', $scope.compData.JS.errortipsconfig);
                    //用于appbar直接显示页面订购
                    if($scope.getparam('subscribeid')&&$scope.getparam('appkey')){
                    	 coreService.fireEvent($attrs['cid'], 'init1');
                         top.subscribeid =$scope.getparam('subscribeid');
                         //用于appbar有subscribeid时其他组件判断
                         top.subscribeid1 = top.subscribeid;
                    }else{
                    	coreService.fireEvent($attrs['cid'], 'init');
                    }
				};
                $scope.showError = function(data) {
                	 var errorcode = data.errorcode;
                	flowcontainer.removeClass("green-linear").removeClass("orange-linear").removeClass("red-linear");
                	flowcontainer.addClass("green-linear");
                	$scope.compData.JS.flowball.JS.isShow = false;
            		$scope.compData.JS.errortips.isShow=true;
            		$scope.compData.JS.errorconfig = $scope.compData.JS.errortips[errorcode]|| $scope.compData.JS.errortips['default'];
            		$scope.compData.JS.notification =$scope.compData.JS.errorconfig.JS.description|| $scope.compData.JS.errortips['default'].JS.description;
                };
                $scope.$on($attrs['cid'] + '_handleEvent', function(event, cevent, args, deferred) {
                    if ($scope.eventMap[cevent]) {
                        $scope.eventMap[cevent](args);
                        if (null != deferred) {
                            deferred.resolve();
                        }
                    }
                });
                $scope.changesrc = function(data) {
                    if (data && data.ordersrc) {
                        top.tlbs.ordersrc = data.ordersrc;
                    }
                };
                $scope.eventMap['changesrc'] = $scope.changesrc;
                $scope.eventMap['update'] = $scope.update;
                $scope.eventMap['showerror'] = $scope.showError;
            }
        ],
        link: function($scope, $element, $attrs, ctl) {

            $scope.pageID = ctl.pageID;
            $scope.cid = $attrs['cid'];
            $scope.componentType = 'cnsummary';
            $scope.init();

        }
    }
}]);
uiCore.directive('cnsimplescroll', function () {
	return {
		restrict : 'A',
		controller : [
			'$scope',
			'$element',
			'$attrs',
			'$timeout',
			'Const',
			function ($scope, $element, $attrs, $timeout, Const) {
				var children,
				wrapperDiv,
				minHeight = 0,
				totalHeight = 0;
				var isOpera = /preto/i.test(navigator.userAgent) || /opera/i.test(navigator.userAgent);
				var bind = function () {
					var _touchstart = Const.touchEvent.start;
					var _touchmove = Const.touchEvent.move;
					var _touchend = Const.touchEvent.end;
					var totalDistance = 0;
					var _lastYPos = 0;
					var _currentYPos = 0;
					var ydistance = 0;
					var flag = false;
					var elHeight = 0;
					var parentHeight = 0;
					var touchstartflag = false;
					var touchstart = function (e) {
						top.tlbs.popupTxtMove = false;
						var transform = $element[0].style['webkitTransform'] || $element[0].style['mozTransform'] || $element[0].style['msTransform'] || $element[0].style['msTransform'] || $element[0].style['oTransform'];
						if (transform) {
							totalDistance = transform.split(',')[1] && parseInt(transform.split(',')[1]);
						} else {
							totalDistance = 0;
						}
						touchstartflag = true;
						elHeight = parseInt($attrs['totalheight'] || top.window.getComputedStyle($element[0], null)['height'])-4;
						parentHeight = parseInt($attrs['parentheight'] || top.window.getComputedStyle($element[0].parentNode, null)['height']);
						_lastYPos = e.touches ? e.touches[0].pageY : e.pageY;
						if (elHeight > parentHeight) {
							top.document.addEventListener(_touchmove, touch, false);

							top.document.addEventListener(_touchend, endTouch, false);
						}

					}
					var touch = function (e) {
                       if (touchstartflag) {
							_currentYPos = e.touches ? e.touches[0].pageY : e.pageY;
							ydistance = _currentYPos - _lastYPos;
							if(ydistance<0){
								if(top.window.location.href.indexOf("163.com")>=0 || top.window.location.href.indexOf("sina.cn")){
									if (/Android/ig.test(navigator.userAgent)){
										e.stopPropagation();
										e.preventDefault();
										setTimeout(function() { 
											top.window.scrollTo(0, 1) 
											}, 0); 
									}									
			                  	 }
							}
							if (Math.abs(ydistance) > 3 || flag) {
								top.tlbs.popupTxtMove = true;
								flag = true;
								e.stopPropagation();
								e.preventDefault();
							}
							
							_lastYPos = _currentYPos;
							totalDistance += ydistance;
                            
							if (totalDistance > 0) {
								totalDistance = 0;
							} else if (totalDistance + elHeight <= parentHeight) {

								totalDistance = parentHeight - elHeight;
							}
							if (isOpera) {
								$element.css('-o-transform', 'translate(0,' + totalDistance + 'px)');
								$element.css('transform', 'translate(0,' + totalDistance + 'px)');
							} else {
								$element.css('-webkit-transform', 'translate3d(0,' + totalDistance + 'px,0)');
								$element.css('-moz-transform', 'translate3d(0,' + totalDistance + 'px,0)');
								$element.css('-o-transform', 'translate3d(0,' + totalDistance + 'px,0)');
								$element.css('-ms-transform', 'translate3d(0,' + totalDistance + 'px,0)');
								$element.css('transform', 'translate3d(0,' + totalDistance + 'px,0)');
							}
						}
					};
					var endTouch = function (e) {
						if (flag) {
							e.stopPropagation();
							e.preventDefault();
							flag = false;
						}
						touchstartflag = false;
						top.document.removeEventListener(_touchstart, touchstart, false);
						top.document.removeEventListener(_touchmove, touch, false);
						top.document.removeEventListener(_touchend, endTouch, false);
					};
					$element.bind(_touchstart, touchstart);
				};

				$timeout(bind, 0);
			}
		],
		link : function ($scope, $element, $attrs) {}
	};
});
uiCore.directive("goldcoinlayout",["coreService","coreUtils","$timeout",function(c,a,b){return{restrict:"AE",replace:true,transclude:true,template:'<div id="mainholder"><div id="noticetextholder"><div id="noticetext"></div><a id="noticelink" ng-click="noticelinkClick()"></a></div><div class="c60_fbar_goldcoin_result_con" ng-style="gettaocan_result_conStyle()"><div class="c60_fbar_succ_img_con"><img class="c60_fbar_succ_img"  ng-src="{{taocanresulturl()}}"/></div><div class="c60_fbar_tips_txt" ng-bind="taocanresulttips()"></div><div class="c60_fbar_result_btn" ccid="c60_fbar_link_btn"><a class="c60_fbar_link_btn" ng-bind="taocanresulttxt()" ng-click="returnclick()"></a></div></div><div id="circleholder"><div id="circle"><div id="circletxt1">{{::compData.JS.circletxt1.JS.text}}</div><div id="circletxt2">{{compData.JS.circletxt2.JS.text}}</div><div id="circletxt3" ccid="circletxt3" ng-click="circletxt3Click();$event.stopPropagation();">{{::compData.JS.circletxt3.JS.text}}</div></div></div><div id="coinbtn1" ccid="coinbtn1" ng-click="coinbtn1Click()"><div id="coinbtn1text">{{::compData.JS.coinbtn1text.JS.text}}</div></div><div id="coinbtn2" ccid="coinbtn2" ng-click="coinbtn2Click()"><div id="coinbtn2text">{{::compData.JS.coinbtn2text.JS.text}}</div></div><div id="tipholder"><div id="tiptext"></div></div><div id="mainholder1" ng-transclude class="money-list-animate" ng-class="compData.JS.moneyListDisplay?\'showmlist\':\'hidemlist\'"></div></div>',scope:{param:"=param"},require:"^pid",controller:["$scope","$element","$attrs","$interval","$q",function(o,p,m,j,k){o.cid=m.cid;o.classid="."+o.cid;o.startUp=true;o.runningCount=0;o.eventMap={};var h;o.compData={CSS:{width:"100%",height:"100%",background:"#ff7d55","text-align":"center",position:"relative","overflow-y":"hidden","z-index":"2047483647"},JS:{cdr:true,buttonEnable:false,moneyListDisplay:false,goldcoinAnimationTime:2000,goldcoinToAnimate:100,circleholder:{CSS:{width:"8.9em",height:"8.9em","text-align":"center",background:"#ff7d55",border:"0.2em solid #fff","-moz-border-radius":"8.9em","-webkit-border-radius":"8.9em","border-radius":"8.9em",margin:"0 auto","margin-top":"4em"},JS:{}},circle:{CSS:{width:"8em",height:"8em","text-align":"center","line-height":"8em",background:"#fff","-moz-border-radius":"8em","-webkit-border-radius":"8em","border-radius":"8em",position:"relative"},JS:{}},circletxt1:{CSS:{width:"100%",color:"#222","line-height":"normal","font-size":"0.875em","text-align":"center",position:"absolute",left:"0",top:"1.8em"},JS:{text:"我的金币"}},circletxt2:{CSS:{color:"#222","font-size":"2em","line-height":"4em","text-align":"center","padding-top":"0.2em"},JS:{text:"0",newtext:"",datamapping:"respparam.total"}},circletxt3:{CSS:{width:"100%",color:"#73d7bd","line-height":"normal","font-size":"0.875em","text-align":"center",position:"absolute",left:"0",bottom:"1em"},JS:{cdrConfig:{uitracingcdr:{cdrType:"uitracingcdr",enable:true,storeData:false}},text:"兑换流量"}},coinbtn1:{CSS:{width:"100%","text-align":"center","margin-top":"1em"},JS:{isEnables:0,datamapping:"respparam.signflag",cdaysdatamapping:"respparam.cdays",cdrConfig:{uitracingcdr:{cdrType:"uitracingcdr",enable:true,storeData:false}},stateconfig:{state:0,state0:{"background-color":"#fff",},state1:{"background-color":"#cacecd",}}}},coinbtn1_second:{CSS:{},JS:{cdrConfig:{uitracingcdr:{cdrType:"uitracingcdr",enable:true,storeData:false}}}},coinbtn1text:{CSS:{display:"inline-block",width:"45%",height:"3.5em","line-height":"3.5em","text-align":"center",background:"#fff",color:"#222","font-size":"0.875em","  -moz-border-radius":"0.4em","-webkit-border-radius":"0.4em","border-radius":"0.4em"},JS:{text:"签到送金币",text1:"恭喜您签到成功",text2:"已连续签到cdays天"}},coinbtn2:{CSS:{width:"100%","text-align":"center","margin-top":"1em"},JS:{isEnables:1,cdrConfig:{uitracingcdr:{cdrType:"uitracingcdr",enable:true,storeData:false}}}},coinbtn2text:{CSS:{display:"inline-block",width:"45%",height:"3.5em","line-height":"3.3em","text-align":"center",background:"#ff7d55",color:"#222","font-size":"0.875em","-moz-border-radius":"0.4em","-webkit-border-radius":"0.4em","border-radius":"0.4em",border:"0.2em solid #fff","-webkit-box-sizing":"border-box","-moz-box-sizing":"border-box","box-sizing":"border-box"},JS:{text:"企业签到送金币"}},tipholder:{CSS:{width:"70%",height:"4em",background:"rgba(0,0,0,0.5)",padding:"0.8em 1.5em","text-align":"center",position:"absolute","z-index":"101",left:"50%","margin-left":"-35%",bottom:"9em","-moz-border-radius":"4em","-webkit-border-radius":"4em","border-radius":"4em","-moz-box-sizing":"border-box","-webkit-box-sizing":"border-box","box-sizing":"border-box",display:"none"},JS:{timeout:3}},tiptext:{CSS:{color:"#fff","font-size":"0.875em"},JS:{text:"今日签到成功，{1}个金币已存入您的金币账户",text1:"不好意思，刚刚没签上，麻烦您再签一次",text2:"不好意思，您已经签过到了，明天再来吧~",text3:"我也是醉了，系统出小差了.",coinsAdded:0,datamapping:"respparam.vaIncreased"}},coinholder:{CSS:{position:"absolute","text-align":"center","z-index":"9998",top:"-100px",width:"67px",height:"67px","-webkit-animation-iteration-count":"1","-webkit-animation-direction":"normal, normal","-webkit-animation-timing-function":"linear, ease-in","-moz-animation-iteration-count":"1","-moz-animation-direction":"normal, normal","-moz-animation-timing-function":"linear, ease-in","background-image":"url('"+top.tlbs.templatePath+"/images/gold.png?V=1')","background-position":"0 0","background-repeat":"no-repeat","background-color":"transparent","background-size":"100% 100%"},JS:{}},coinholderspan:{CSS:{position:"absolute",display:"block","-webkit-animation-iteration-count":"1","-webkit-animation-direction":"alternate","-webkit-animation-timing-function":"ease-in-out","-webkit-transform-origin":"50%-100%","-moz-animation-iteration-count":"1","-moz-animation-direction":"alternate","-moz-animation-timing-function":"ease-in-out","-moz-transform-origin":"50%-100%"},JS:{}},status:{CSS:{},JS:{datamapping:"respparam.status",status:"0",status0:"2015521",status1:"2015522",status2:"2015523",status3:"2015524",}},c60_fbar_goldcoin_result_con:{CSS:{},JS:{showconfig:{status:"0",status0:{display:"none"},status1:{display:"block"}},statusconfig:{status:"1",status1:{tipstxt:"不要阻止我，我要去天台思考人生",btntxt:"去首页看看",imgUrl:top.tlbs.templatePath+"/images/404.jpg"},status2:{tipstxt:"攻程狮正在奋力开采中，敬请期待!",btntxt:"去首页看看",imgUrl:top.tlbs.templatePath+"/images/gongchengshi.jpg"},status3:{tipstxt:"我也是醉了，系统出小差了",btntxt:"返回看看",imgUrl:top.tlbs.templatePath+"/images/zuile.jpg"}}}},c60_fbar_link_btn:{CSS:{},JS:{cdrConfig:{uitracingcdr:{cdrType:"uitracingcdr",enable:true,storeData:false}}}},noticetextholder:{CSS:{top:"1.5em",position:"relative",width:"90%","text-align":"center","margin-left":"5%",display:"none"},JS:{}},noticetext:{CSS:{"font-size":"0.8em",color:"rgb(255,255,255)",display:"inline-block"},JS:{text:"签到送金币，连续签到最高可得9个金币"}},noticelink:{CSS:{"font-size":"0.8em",color:"rgb(252, 209, 22)","text-decoration":"underline",display:"inline-block"},JS:{text:"查看规则"}}}};o.extendComponentData=function(q){a.extendDeep(o.compData,q)};o.init=function(){c.registerComponentInstance(o.cid,o);o.extendComponentData(c.getInitProperties(o.cid));o.processConfig();var q=JSON.stringify(o.compData.JS.coinholder.CSS);q=o.formatStyleData(q);c.commonServiceRef.appendStyle(".coinholder","",q);q=JSON.stringify(o.compData.JS.coinholderspan.CSS);q=o.formatStyleData(q);c.commonServiceRef.appendStyle(".coinholder span","",q);c.fireEvent(o.cid,"init",null)};o.noticelinkClick=function(){var q=c.getComponentScope("pvctrl");if(null!=q){var r=k.defer();var s=r.promise;q.lloadApps({applist:"ipopuppage"},r);s.then(function(){c.fireEvent(o.cid,"shownotice")})}};o.processConfig=function(){p.css(o.compData.CSS);var s=angular.element(p[0].querySelector('[id="circleholder"]'));s.css(o.compData.JS.circleholder.CSS);try{var q=parseInt(top.window.innerHeight);if(q<=400){s.css({"margin-top":"0.8em"})}}catch(r){}angular.element(p[0].querySelector('[id="circle"]')).css(o.compData.JS.circle.CSS);angular.element(p[0].querySelector('[id="circletxt1"]')).css(o.compData.JS.circletxt1.CSS);angular.element(p[0].querySelector('[id="circletxt2"]')).css(o.compData.JS.circletxt2.CSS);angular.element(p[0].querySelector('[id="circletxt3"]')).css(o.compData.JS.circletxt3.CSS);angular.element(p[0].querySelector('[id="coinbtn1"]')).css(o.compData.JS.coinbtn1.CSS);angular.element(p[0].querySelector('[id="coinbtn1text"]')).css(o.compData.JS.coinbtn1text.CSS);angular.element(p[0].querySelector('[id="coinbtn2"]')).css(o.compData.JS.coinbtn2.CSS);angular.element(p[0].querySelector('[id="coinbtn2text"]')).css(o.compData.JS.coinbtn2text.CSS);angular.element(p[0].querySelector('[id="tipholder"]')).css(o.compData.JS.tipholder.CSS);angular.element(p[0].querySelector('[id="tiptext"]')).css(o.compData.JS.tiptext.CSS);angular.element(p[0].querySelector('[id="noticetextholder"]')).css(o.compData.JS.noticetextholder.CSS);angular.element(p[0].querySelector('[id="noticetext"]')).css(o.compData.JS.noticetext.CSS);angular.element(p[0].querySelector('[id="noticelink"]')).css(o.compData.JS.noticelink.CSS);angular.element(p[0].querySelector('[id="noticetext"]'))[0].innerHTML=o.compData.JS.noticetext.JS.text;angular.element(p[0].querySelector('[id="noticelink"]'))[0].innerHTML=o.compData.JS.noticelink.JS.text};o.updateCoinsData=function(q){c.fireEvent(o.cid,"coinUpdated");var r=o.extractData(q,o.compData.JS.circletxt2.JS.datamapping);if(null!=r&&r.length>0){o.hideTip();o.showSuccess();o.compData.JS.buttonEnable=true;o.compData.JS.circletxt2.JS.text=0;o.compData.JS.circletxt2.JS.newtext=o.extractData(q,o.compData.JS.circletxt2.JS.datamapping)||o.compData.JS.circletxt2.JS.text;o.compData.JS.tiptext.JS.coinsAdded=o.extractData(q,o.compData.JS.tiptext.JS.datamapping)||o.compData.JS.tiptext.JS.coinsAdded;if(null!=q.respparam.ndcoins){o.compData.JS.tiptext.JS.nextDayCoins=param.respparam.ndcoins}else{o.compData.JS.tiptext.JS.nextDayCoins=o.compData.JS.tiptext.JS.coinsAdded}o.compData.JS.coinbtn1.JS.isEnables=o.extractData(q,o.compData.JS.coinbtn1.JS.datamapping)||o.compData.JS.coinbtn1.JS.isEnables;o.compData.JS.coinbtn1.JS.continuousDays=o.extractData(q,o.compData.JS.coinbtn1.JS.cdaysdatamapping)||0;if(o.compData.JS.coinbtn1.JS.continuousDays>0&&o.compData.JS.coinbtn1.JS.isEnables==0){var s=o.compData.JS.coinbtn1text.JS.text2.replace("cdays",o.compData.JS.coinbtn1.JS.continuousDays);angular.element(p[0].querySelector('[id="coinbtn1text"]')).text(s)}else{if(o.compData.JS.coinbtn1.JS.isEnables==0){angular.element(p[0].querySelector('[id="coinbtn1text"]')).text(o.compData.JS.coinbtn1text.JS.text1)}else{angular.element(p[0].querySelector('[id="coinbtn1text"]')).text(o.compData.JS.coinbtn1text.JS.text)}}c.fireEvent(o.cid,"showsucc");if(o.compData.JS.tiptext.JS.coinsAdded>0&&(o.compData.JS.circletxt2.JS.text+o.compData.JS.tiptext.JS.coinsAdded)>o.compData.JS.circletxt2.JS.newtext){o.compData.JS.circletxt2.JS.newtext=o.compData.JS.circletxt2.JS.text+o.compData.JS.tiptext.JS.coinsAdded}o.updateCoinCount();if(!o.startUp&&o.compData.JS.tiptext.JS.coinsAdded>0){o.animationStart();o.updateSuccessTip();angular.element(p[0].querySelector('[id="coinbtn1text"]')).text(o.compData.JS.coinbtn1text.JS.text1);o.compData.JS.coinbtn1.JS.isEnables=0}else{o.startUp=false}}else{o.compData.JS.buttonEnable=false;o.hideTip();c.fireEvent(o.cid,"showerror");o.showError();return false}};o.showError=function(){o.compData.JS.c60_fbar_goldcoin_result_con.JS.showconfig.status=1;angular.element(p[0].querySelector(".c60_fbar_goldcoin_result_con")).css({background:"#fff"});angular.element(p[0].querySelector('[id="circleholder"]')).css({display:"none"});angular.element(p[0].querySelector('[id="coinbtn1"]')).css({display:"none"});angular.element(p[0].querySelector('[id="coinbtn2"]')).css({display:"none"});angular.element(p[0].querySelector('[id="tipholder"]')).css({display:"none"});angular.element(p[0].querySelector('[id="noticetextholder"]')).css({display:"none"});o.compData.CSS.background="#fff";p.css(o.compData.CSS)};o.showSuccess=function(){o.compData.JS.c60_fbar_goldcoin_result_con.JS.showconfig.status=0;angular.element(p[0].querySelector('[id="circleholder"]')).css({display:"block"});angular.element(p[0].querySelector('[id="coinbtn1"]')).css({display:"block"});angular.element(p[0].querySelector('[id="coinbtn2"]')).css({display:"block"});o.compData.CSS.background="#ff7d55";p.css(o.compData.CSS)};o.gettaocan_result_conStyle=function(){if(o.compData.JS&&o.compData.JS.c60_fbar_goldcoin_result_con!=null&&o.compData.JS.c60_fbar_goldcoin_result_con!=undefined){if(o.compData.JS.c60_fbar_goldcoin_result_con.JS.showconfig.status==0){return o.compData.JS.c60_fbar_goldcoin_result_con.JS.showconfig.status0}else{return o.compData.JS.c60_fbar_goldcoin_result_con.JS.showconfig.status1}}};o.taocanresulturl=function(){if(o.compData.JS&&o.compData.JS.c60_fbar_goldcoin_result_con!=null&&o.compData.JS.c60_fbar_goldcoin_result_con!=undefined){var q="status"+o.compData.JS.c60_fbar_goldcoin_result_con.JS.statusconfig.status;var r=o.compData.JS.c60_fbar_goldcoin_result_con.JS.statusconfig[q].imgUrl;return r.replace(/'/g,"")}};o.taocanresulttxt=function(){if(o.compData.JS&&o.compData.JS.c60_fbar_goldcoin_result_con!=null&&o.compData.JS.c60_fbar_goldcoin_result_con!=undefined){var q="status"+o.compData.JS.c60_fbar_goldcoin_result_con.JS.statusconfig.status;var r=o.compData.JS.c60_fbar_goldcoin_result_con.JS.statusconfig[q].btntxt;return r}};o.taocanresulttips=function(){if(o.compData.JS&&o.compData.JS.c60_fbar_goldcoin_result_con!=null&&o.compData.JS.c60_fbar_goldcoin_result_con!=undefined){var q="status"+o.compData.JS.c60_fbar_goldcoin_result_con.JS.statusconfig.status;var r=o.compData.JS.c60_fbar_goldcoin_result_con.JS.statusconfig[q].tipstxt;return r}};o.returnclick=function(){c.fireEvent(p.attr("cid"),m.event||"goFirstPage");a.recordTracingCdr(o.pageID,a.createCdrid(o.pageID,"","goFirstPage"),o.compData.JS.goldcoinCdr.JS.cdrConfig)};o.updateCoinsData2=function(q){o.compData.JS.tiptext.JS.coinsAdded=q.respparam.vaIncreased;if(null!=q.respparam.ndcoins){o.compData.JS.tiptext.JS.nextDayCoins=q.respparam.ndcoins}else{o.compData.JS.tiptext.JS.nextDayCoins=o.compData.JS.tiptext.JS.coinsAdded}o.compData.JS.status.JS.status=q.respparam.status;if(o.compData.JS.status.JS.status==o.compData.JS.status.JS.status1||o.compData.JS.status.JS.status==o.compData.JS.status.JS.status3){if(o.compData.JS.tiptext.JS.coinsAdded!=null&&o.compData.JS.tiptext.JS.coinsAdded!=undefined){c.fireEvent(o.cid,"coinIncreased",q);o.compData.JS.circletxt2.JS.newtext=Number(o.compData.JS.circletxt2.JS.text)+Number(o.compData.JS.tiptext.JS.coinsAdded);o.updateCoinCount();o.animationStart();o.updateSuccessTip();o.compData.JS.coinbtn1.JS.isEnables=0;angular.element(p[0].querySelector('[id="coinbtn1text"]')).text(o.compData.JS.coinbtn1text.JS.text1)}else{o.updateFailesTip(true,o.compData.JS.tiptext.JS.text1)}}else{o.updateFailesTip(true,o.compData.JS.tiptext.JS.text1)}o.compData.JS.tiptext.JS.coinsAdded=0;o.compData.JS.coinbtn1.JS.stateconfig.state=0;angular.element(p[0].querySelector('[id="coinbtn1text"]')).css(o.compData.JS.coinbtn1.JS.stateconfig.state0)};o.updateCoinsData3=function(q){o.compData.JS.tiptext.JS.coinsAdded=q.respparam.vaIncreased;if(null!=q.respparam.ndcoins){o.compData.JS.tiptext.JS.nextDayCoins=q.respparam.ndcoins}else{o.compData.JS.tiptext.JS.nextDayCoins=o.compData.JS.tiptext.JS.coinsAdded}if(o.compData.JS.tiptext.JS.coinsAdded!=null&&o.compData.JS.tiptext.JS.coinsAdded!=undefined){o.compData.JS.circletxt2.JS.text=Number(o.compData.JS.circletxt2.JS.text)+Number(o.compData.JS.tiptext.JS.coinsAdded)}if(q.respparam.status==o.compData.JS.status.JS.status1||q.respparam.status==o.compData.JS.status.JS.status3){o.compData.JS.coinbtn1.JS.isEnables=0;angular.element(p[0].querySelector('[id="coinbtn1text"]')).text(o.compData.JS.coinbtn1text.JS.text1)}o.compData.JS.tiptext.JS.coinsAdded=0};o.updateSuccessTip=function(){angular.element(p[0].querySelector('[id="tiptext"]')).text(o.compData.JS.tiptext.JS.text.replace("{1}",o.compData.JS.tiptext.JS.coinsAdded).replace("{2}",o.compData.JS.tiptext.JS.nextDayCoins));angular.element(p[0].querySelector('[id="tipholder"]')).css("display","block");b(function(){angular.element(p[0].querySelector('[id="tipholder"]')).css("display","none");o.compData.JS.tiptext.JS.coinsAdded=0},o.compData.JS.tipholder.JS.timeout*1000)};o.updateFailesTip=function(q,r){angular.element(p[0].querySelector('[id="tiptext"]')).text(r);angular.element(p[0].querySelector('[id="tipholder"]')).css("display","block");if(q){b(function(){angular.element(p[0].querySelector('[id="tipholder"]')).css("display","none")},o.compData.JS.tipholder.JS.timeout*1000)}};o.hideTip=function(){angular.element(p[0].querySelector('[id="tipholder"]')).css("display","none")};o.hideMoney=function(){o.compData.JS.moneyListDisplay=false;c.fireEvent(o.cid,"moneyhide")};o.secondClickTip=function(){a.recordTracingCdr(o.pageID,a.createCdrid(o.pageID,"","personalSign"),o.compData.JS.c60_fbar_link_btn.JS.cdrConfig);angular.element(p[0].querySelector('[id="tiptext"]')).text(o.compData.JS.tiptext.JS.text2);angular.element(p[0].querySelector('[id="tipholder"]')).css("display","block");b(function(){angular.element(p[0].querySelector('[id="tipholder"]')).css("display","none")},o.compData.JS.tipholder.JS.timeout*1000)};o.error=function(){o.hideTip();c.fireEvent(o.cid,"showerror");o.showError()};o.eventMap.updateCoinsData=o.updateCoinsData;o.eventMap.updateCoinsData2=o.updateCoinsData2;o.eventMap.updateCoinsData3=o.updateCoinsData3;o.eventMap.hideMoney=o.hideMoney;o.eventMap.error=o.error;o.$on(o.cid+"_handleEvent",function(t,r,s,q){o.eventMap[r](s,q);if(null!=q){q.resolve()}});o.circletxt3Click=function(){c.fireEvent(o.cid,"circletxt3Click");a.recordTracingCdr(o.pageID,a.createCdrid(o.pageID,"","trafficExchange"),o.compData.JS.c60_fbar_link_btn.JS.cdrConfig)};o.coinbtn1Click=function(){if(o.compData.JS.coinbtn1.JS.stateconfig.state==1){return false}if(o.compData.JS.buttonEnable){if(o.compData.JS.coinbtn1.JS.isEnables==1){a.recordTracingCdr(o.pageID,a.createCdrid(o.pageID,"","personalSign"),o.compData.JS.c60_fbar_link_btn.JS.cdrConfig);o.compData.JS.coinbtn1.JS.stateconfig.state=1;angular.element(p[0].querySelector('[id="coinbtn1text"]')).css(o.compData.JS.coinbtn1.JS.stateconfig.state1);c.fireEvent(o.cid,"coinbtn1Click")}else{o.secondClickTip()}}};o.coinbtn2Click=function(){if(o.compData.JS.buttonEnable&&o.compData.JS.coinbtn2.JS.isEnables==1){a.recordTracingCdr(o.pageID,a.createCdrid(o.pageID,"","companySign"),o.compData.JS.c60_fbar_link_btn.JS.cdrConfig);o.compData.JS.moneyListDisplay=true;c.fireEvent(o.cid,"coinbtn2Click")}};o.updateCoinCount=function(){if(o.runningCount==0){var r=Number(o.compData.JS.circletxt2.JS.newtext)-Number(o.compData.JS.circletxt2.JS.text);o.compData.JS.circletxt2.JS.text=Number(o.compData.JS.circletxt2.JS.text);var q=Math.abs(r);if(q>100){if(r>0){o.compData.JS.circletxt2.JS.text=Number(o.compData.JS.circletxt2.JS.text)+q-100}else{o.compData.JS.circletxt2.JS.text=Number(o.compData.JS.circletxt2.JS.text)-q+100}q=100}o.runningCount=q;if(r>0){h=j(g,10,q)}else{if(r<0){h=j(l,10,q)}}}};function g(){if(o.compData.JS.circletxt2.JS.text<=o.compData.JS.circletxt2.JS.newtext){o.compData.JS.circletxt2.JS.text+=1;o.runningCount-=1}}function l(){if(o.compData.JS.circletxt2.JS.text<=o.compData.JS.circletxt2.JS.newtext){o.compData.JS.circletxt2.JS.text-=1;o.runningCount-=1}}p.on("$destroy",function(){j.cancel(h)});o.animationStart=function(){d();for(var q=0;q<15;q++){p[0].appendChild(f())}};o.formatStyleData=function(q){q=q.replace(/","/g,";").replace(/":"/g,":").replace(/\\/g,"").replace(/{"/,"{").replace(/"}/,"}");return q};o.extractData=function(t,r){if(null!=t&&null!=r){var s=r.split(".");var u=t[s[0]];if(null!=u){for(var q=1;q<s.length;q++){u=u[s[q]]}if(null!=u){return u}else{return null}}else{return null}}else{return null}};o.showcb=function(){o.compData.JS.moneyListDisplay=false};function f(){var t=document.createElement("div");t.className="coinholder";var r=document.createElement("span");r.innerHTML="&nbsp;";t.appendChild(r);var q=n();var s=1;t.style.webkitAnimationName="fade, drop";t.style.webkitAnimationDuration=q+", "+q;t.style.webkitAnimationDelay=s;t.style.MozAnimationName="fade, drop";t.style.MozAnimationDuration=q+", "+q;t.style.MozAnimationDelay=s;t.style.left=e(10,90)+"%";angular.element(t).on("webkitAnimationEnd oanimationend msAnimationEnd animationend",function(u){var v=u.target||u.srcElement;p[0].removeChild(v)});return t}function d(){var q=top.top.document.styleSheets[document.styleSheets.length-1];var r=top.window.innerHeight;try{q.insertRule("@-webkit-keyframes drop { 0% { -webkit-transform: translate(0px, -50px); } 100% { -webkit-transform: translate(0px, "+r+"px); } }",q.cssRules.length)}catch(s){}try{q.insertRule("@keyframes drop { 0% { transform: translate(0px, -50px); } 100% { transform: translate(0px, "+r+"px); } }",q.cssRules.length)}catch(s){}try{q.insertRule("@-moz-keyframes drop { 0% { -moz-transform: translate(0px, -50px); } 100% { -moz-transform: translate(0px, "+r+"px); } }",q.cssRules.length)}catch(s){}try{q.insertRule("@-o-keyframes drop { 0% { -o-transform: translate(0px, -50px); } 100% { -o-transform: translate(0px, "+r+"px); } }",q.cssRules.length)}catch(s){}}function n(){return i(1,3)+"s"}function i(q,r){return q+Math.random()*(r-q)}function e(q,r){return q+Math.floor(Math.random()*(r-q))}}],link:function(f,e,d,g){f.pageID=g.pageID;f.componentType="goldcoinlayout";f.init()}}}]);
uiCore.directive("ipopup",[function(){return{restrict:"AE",replace:true,require:"^pid",template:'<div style="display:none;"><div class="c60_fbar_bg_pop_block" ng-style="getbg_pop_blockStyle()" ng-click="$event.stopPropagation();"></div><div class="c60_fbar_new_center_pop" id="popupholder"><div class="c60_fbar_ncp_top"><div class="c60_fbar_ncp_tit"><span class="c60_fbar_ncp_tit_txt" ng-bind="compData.JS.titleconfig.JS.text"></span><span class="c60_fbar_ncp_tit_close" ccid="class="c60_fbar_ncp_tit_close" ng-click="c60_fbar_ncp_tit_closeClick()"></span></div><div style="height:12em;"><div class="c60_fbar_ncp_bottom" simplescroll><div class="c60_fbar_ncpb_txt" id="popupbodytext"></div><div class="c60_fbar_ncpb_txt" id="popupbottomtext"></div></div></div></div></div></div>',scope:{},controller:["$scope","$element","$attrs","$timeout","coreService","coreUtils","Const","$compile",function(h,i,g,c,b,d,a,e){h.cid=g.cid;h.compData={CSS:{},JS:{}};h.eventMap={};h.respData={};h.trustAsHtml=function(j){return d.getTrustedHtml(j)};h.c60_fbar_ncp_tit_closeClick=function(){f("closebtn");top.tlbs.notificationCdrData=null;h.hide()};h.getbg_pop_blockStyle=function(){if(h.compData.JS.bg_pop_block.JS.stateconfig.state==0){return h.compData.JS.bg_pop_block.JS.stateconfig.state0}else{return h.compData.JS.bg_pop_block.JS.stateconfig.state1}};h.updateData=function(j){if(j!=null&&j!=undefined){h.respData=j;i.css({display:"block"});h.compData.JS.bg_pop_block.JS.stateconfig.state=1;angular.element(i[0].querySelector(".c60_fbar_hwlfeedback")).html(j.feedback.answer)}};h.eventMap.update=h.updateData;h.hide=function(){h.compData.JS.bg_pop_block.JS.stateconfig.state=0;i.css({display:"none"})};h.extendComponentData=function(j){h.compData=d.extendDeep(h.compData,j)};h.init=function(){b.registerComponentInstance(i.attr("cid"),h);h.extendComponentData(b.getInitProperties(h.cid)||{});i.css(h.compData.css||{});angular.element(i[0].querySelector('[id="popupbodytext"]'))[0].innerHTML=h.compData.JS.bodyconfig.JS.text;angular.element(i[0].querySelector('[id="popupholder"]')).css(h.compData.CSS);angular.element(i[0].querySelector('[id="popupbottomtext"]')).css(h.compData.JS.bottomtextconfig.CSS);angular.element(i[0].querySelector('[id="popupbottomtext"]'))[0].innerHTML=h.compData.JS.bottomtextconfig.JS.text;e(i.contents())(h)};h.$on(g.cid+"_handleEvent",function(l,m,k,j){if(h.eventMap[m]){h.eventMap[m](k);if(null!=j){j.resolve()}}});h.show=function(){i.css({display:"block"});h.compData.JS.bg_pop_block.JS.stateconfig.state=1};h.eventMap.show=h.show;h.eventMap.hide=h.hide;h.applink=function(j){if(null!=j){f("applink");top.tlbs.notificationCdrData=null;h.hide();b.fireEvent(h.cid,"applinkclick",{pageid:j})}};function f(j){d.recordTracingCdr(h.pageID,h.pageID+"_"+j,h.compData.JS.cdrConfig)}}],link:function(d,b,a,c){d.pageID=c.pageID;d.componentType="ipopup";d.init()}}}]);
uiCore.directive("money",[function(){return{restrict:"AE",replace:true,require:"^pid",template:'<div class="gmainmoney"><div class="c60_fbar_bg_black_pop" ng-style="getbg_black_popStyle()"><div class="c60_fbar_tips_txt" ng-bind="compData.JS.bg_black_pop.JS.desc" style="color:white;margin-top:0"></div></div><div class="c60_fbar_myGold c60_fbar_titleNumDesc" ><h5 class="c60_fbar_titleNumDesc-Title">{{compData.JS.titleNumDescText}}<span class="c60_fbar_titleNumDesc-Num">{{compData.JS.respparam.total}}</span></h5><p class="c60_fbar_titleNumDesc-Desc"></p></div><div class="c60_fbar_money_result_con" ng-style="gettaocan_result_conStyle()"><div class="c60_fbar_succ_img_con"><span class="c60_fbar_money_succ_img"  ng-style="taocanresulturl()"></span></div><div class="c60_fbar_tips_txt" ng-bind="taocanresulttips()"></div><div class="c60_fbar_result_btn" ccid="c60_fbar_link_btn"><a class="c60_fbar_link_btn" ng-bind="taocanresulttxt()" ng-click="returnclick()"></a></div></div><div class="c60_fbar_mwrapper"  id="gcwrapper"><ul class="c60_fbar_cimgTitleList" simplescroll><li ng-repeat="commpany in compData.JS.respparam.commpany" ng-class="{\'c60_fbar_imgTitlem\':true}"><img ng-src="{{commpany.image}}" ng-class="{\'c60_fbar_imgTitle-Img\':true}" /><p ng-class="{\'c60_fbar_imgTitle-Title\':true}" >{{commpany.description}}</p><span ng-click="myclick(commpany,$index);$event.stopPropagation();" ng-class="{\'c60_fbar_imgTitle_Btn\':true}" >{{commpany.signflag==1?compData.JS.commpany.signflag1:compData.JS.commpany.signflag2}}</span></li></ul></div><div class="c60_fbar_bg_pop_block" ng-click="$event.stopPropagation();"></div><div class="c60_fbar_pop_block"><div class="c60_fbar_img_txt_info"><table cellpadding="0" cellspacing="0" class="c60_fbar_img_txt_table"><tr><td><span class="c60_fbar_goldIcon" ng-style="getStyle({goldIcon:1})"></span></td><td><div class="c60_fbar_pop_txt3"><span  class="c60_fbar_pop_txt3">{{signRes}}</span><span  class="c60_fbar_pop_txt3 c60_fbar_txt_blue">{{commpanyname}}</span><span  class="c60_fbar_pop_txt3" ng-bind="signTips"></span><span  class="c60_fbar_pop_txt3" style="color:red;" ng-bind="vaIncreased"></span><span  class="c60_fbar_pop_txt3" ng-bind="signTips1"></span></div></td></tr></table></div><div class="c60_fbar_img_txt_btn c60_fbar_clearfloat"><div class="c60_fbar_left_itbtn" ng-click="signOther()">{{signOtherComp}}</div><div class="c60_fbar_right_itbtn" ng-click="goShopping(golink)">{{rightbtnOption}}</div></div></div></div>',scope:{},controller:["$scope","$element","$attrs","coreService","coreUtils","Const",function(d,c,b,e,a,f){d.cid=b.cid;d.compData={CSS:{},JS:{commpany:{signflag1:"签到",signflag2:"去逛逛"},c60_fbar_imgTitle_Btn:{CSS:{},JS:{stateconfig:{state:0,state0:{"background-color":"#fff",},state1:{"background-color":"#cacecd",}}}}}};d.eventMap={};var g=null;d.getStyle=function(h){var i;for(item in h){i=item;break}if(d.compData.JS[i]&&d.compData.JS[i].CSS){return d.compData.JS[i].CSS}};d.getbg_black_popStyle=function(){if(d.compData.JS.bg_black_pop.JS.stateconfig.state==1){return d.compData.JS.bg_black_pop.JS.stateconfig.state1}else{return d.compData.JS.bg_black_pop.JS.stateconfig.state0}};d.bg_black_popShow=function(h){d.compData.JS.bg_black_pop.JS.stateconfig.state=1;angular.element(c[0].querySelector(".c60_fbar_bg_black_pop")).css({display:"block"});setTimeout(function(){d.compData.JS.bg_black_pop.JS.stateconfig.state=0;angular.element(c[0].querySelector(".c60_fbar_bg_black_pop")).css({display:"none"})},d.compData.JS.bg_black_pop.JS.stateconfig.time*1000)};d.popDown=function(){e.fireEvent(c.attr("cid"),"showerror");angular.element(c[0].querySelector(".c60_fbar_bg_pop_block")).css({display:"block"});angular.element(c[0].querySelector(".c60_fbar_pop_block")).css({display:"block"});angular.element(c[0].querySelector(".c60_fbar_bg_pop_block")).css({"z-index":"2047483647888"});angular.element(c[0].querySelector(".c60_fbar_pop_block")).css({"z-index":"2047483647889"})};d.myclick=function(i,h){if(d.compData.JS.c60_fbar_imgTitle_Btn.JS.stateconfig.state==1){return false}if(h!=null&&h!=undefined&&i!=null&&i!=undefined){d.compData.JS.index=h;a.recordTracingCdr(d.pageID,i.commpanyid,d.compData.JS.c60_fbar_imgTitle_Btn.JS.cdrConfig);d.obj=i;if(i.signflag=="1"){d.compData.JS.c60_fbar_imgTitle_Btn.JS.stateconfig.state=1;angular.element(c[0].querySelectorAll(".c60_fbar_imgTitle_Btn")).css(d.compData.JS.c60_fbar_imgTitle_Btn.JS.stateconfig.state1);d.bg_black_popShow();e.fireEvent(c.attr("cid"),b.event||"click0",{id:i.commpanyid})}else{if(i.signflag=="0"){window.open(i.link)}}}};d.signOther=function(){a.recordTracingCdr(d.pageID,a.createCdrid(d.pageID,b.cid,"leftBtn"),d.compData.JS.c60_fbar_left_itbtn.JS.cdrConfig);angular.element(c[0].querySelector(".c60_fbar_bg_pop_block")).css({display:"none"});angular.element(c[0].querySelector(".c60_fbar_pop_block")).css({display:"none"});e.fireEvent(c.attr("cid"),"showsucc")};d.goShopping=function(h){if(h!=null&&h!=undefined){a.recordTracingCdr(d.pageID,a.createCdrid(d.pageID,b.cid,"rightBtn"),d.compData.JS.c60_fbar_right_itbtn.JS.cdrConfig);if(d.compData.JS.sign.isFailed){angular.element(c[0].querySelector(".c60_fbar_bg_pop_block")).css({display:"none"});angular.element(c[0].querySelector(".c60_fbar_pop_block")).css({display:"none"})}else{angular.element(c[0].querySelector(".c60_fbar_bg_pop_block")).css({display:"none"});angular.element(c[0].querySelector(".c60_fbar_pop_block")).css({display:"none"});window.open(h)}e.fireEvent(c.attr("cid"),"showsucc")}};d.updateData=function(h){d.compData.JS.respparam=h.respparam;if(h.respparam.commpany&&h.respparam.total.length>0&&h.respparam.commpany.length>0){d.compData.JS.respparam.total=h.respparam.total;d.showSuccess()}else{d.showError();return false}};d.showError=function(){d.compData.JS.c60_fbar_money_result_con.JS.showconfig.status=1;angular.element(c[0].querySelector(".gmainmoney")).css({background:"#fff"});angular.element(c[0].querySelector(".c60_fbar_money_result_con")).css({background:"#fff"})};d.showSuccess=function(){d.compData.JS.c60_fbar_money_result_con.JS.showconfig.status=0};d.gettaocan_result_conStyle=function(){if(d.compData.JS&&d.compData.JS.c60_fbar_money_result_con!=null&&d.compData.JS.c60_fbar_money_result_con!=undefined){if(d.compData.JS.c60_fbar_money_result_con.JS.showconfig.status==0){return d.compData.JS.c60_fbar_money_result_con.JS.showconfig.status0}else{return d.compData.JS.c60_fbar_money_result_con.JS.showconfig.status1}}};d.taocanresulturl=function(){if(d.compData.JS&&d.compData.JS.c60_fbar_money_result_con!=null&&d.compData.JS.c60_fbar_money_result_con!=undefined){var h="status"+d.compData.JS.c60_fbar_money_result_con.JS.statusconfig.status;var j=d.compData.JS.c60_fbar_money_result_con.JS.statusconfig[h].imgUrl;var i=j.replace(/'/g,"");if(i){return{"background-image":"url("+i+")"}}else{return{}}}};d.taocanresulttxt=function(){if(d.compData.JS&&d.compData.JS.c60_fbar_money_result_con!=null&&d.compData.JS.c60_fbar_money_result_con!=undefined){var h="status"+d.compData.JS.c60_fbar_money_result_con.JS.statusconfig.status;var i=d.compData.JS.c60_fbar_money_result_con.JS.statusconfig[h].btntxt;return i}};d.taocanresulttips=function(){if(d.compData.JS&&d.compData.JS.c60_fbar_money_result_con!=null&&d.compData.JS.c60_fbar_money_result_con!=undefined){var h="status"+d.compData.JS.c60_fbar_money_result_con.JS.statusconfig.status;var i=d.compData.JS.c60_fbar_money_result_con.JS.statusconfig[h].tipstxt;return i}};d.returnclick=function(){a.recordTracingCdr(d.pageID,a.createCdrid(d.pageID,b.cid,"goFirstPage"),d.compData.JS.c60_fbar_link_btn.JS.cdrConfig);e.fireEvent(c.attr("cid"),b.event||"goFirstPage")};d.updateCoinsTotal=function(h){if(null!=h.respparam.vaIncreased||undefined!=h.respparam.vaIncreased){d.compData.JS.respparam.total=Number(d.compData.JS.respparam.total)+Number(h.respparam.vaIncreased)}};d.signData=function(h){d.compData.JS.bg_black_pop.JS.stateconfig.state=0;angular.element(c[0].querySelector(".c60_fbar_bg_black_pop")).css({display:"none"});d.compData.JS.c60_fbar_imgTitle_Btn.JS.stateconfig.state=0;angular.element(c[0].querySelectorAll(".c60_fbar_imgTitle_Btn")).css(d.compData.JS.c60_fbar_imgTitle_Btn.JS.stateconfig.state0);if(h!=null&&h!=undefined){d.compData.JS.status=h.respparam.status;d.compData.JS.desc=h.respparam.desc;d.compData.JS.vaIncreased=h.respparam.vaIncreased;if(d.compData.JS.status!=null&&d.compData.JS.status!=undefined){if(d.compData.JS.status==d.compData.JS.sign.status.status3||d.compData.JS.status==d.compData.JS.sign.status.status1){d.compData.JS.respparam.total=Number(d.compData.JS.respparam.total)+Number(d.compData.JS.vaIncreased);d.obj.signflag="0";d.signOtherComp=d.compData.JS.sign.option.option0;d.rightbtnOption=d.compData.JS.sign.option.option2;d.signRes=d.compData.JS.sign.text.text0.signRes;d.signTips=d.compData.JS.sign.text.text0.signTips;d.signTips1=d.compData.JS.sign.text.text0.signTips1;d.vaIncreased=d.compData.JS.vaIncreased;d.commpanyname=d.obj.name;d.golink=d.obj.link;d.popDown();e.fireEvent(d.cid,"coinIncreased",h)}else{if(d.compData.JS.status==d.compData.JS.sign.status.status4){d.obj.signflag="0";d.signOtherComp=d.compData.JS.sign.option.option1;d.rightbtnOption=d.compData.JS.sign.option.option2;d.signRes=d.compData.JS.sign.text.text1.signRes;d.signTips=d.compData.JS.sign.text.text1.signTips;d.signTips1="";d.vaIncreased="";d.commpanyname=d.obj.name;d.golink=d.obj.link;d.popDown()}else{if(d.compData.JS.status==d.compData.JS.sign.status.status5){e.fireEvent(c.attr("cid"),b.event||"updaterror",{errorcode:d.compData.JS.errorcode})}else{d.compData.JS.sign.isFailed=true;d.signOtherComp=d.compData.JS.sign.option.option1;d.rightbtnOption=d.compData.JS.sign.option.option0;d.signRes=d.compData.JS.sign.text.text2.signRes;d.signTips=d.compData.JS.sign.text.text2.signTips;d.signTips1="";d.vaIncreased="";d.commpanyname=d.obj.name;d.golink=d.obj.link;d.compData.JS.vaIncreased="";d.popDown()}}}}else{e.fireEvent(c.attr("cid"),b.event||"updaterror",{errorcode:d.compData.JS.errorcode})}}else{e.fireEvent(c.attr("cid"),b.event||"updaterror",{errorcode:d.compData.JS.errorcode})}};d.extendComponentData=function(h){d.compData=a.extendDeep(d.compData,h)};d.init=function(){e.registerComponentInstance(c.attr("cid"),d);d.extendComponentData(e.getInitProperties(d.cid));d.compData.css=d.compData.CSS||{};d.compData.JS=d.compData.JS||{};c.css(d.compData.CSS)};d.$on(b.cid+"_handleEvent",function(j,k,i,h){if(d.eventMap[k]){d.eventMap[k](i);if(null!=h){h.resolve()}}});d.eventMap.update=d.updateData;d.eventMap.signData=d.signData;d.eventMap.updateCoinsTotal=d.updateCoinsTotal}],link:function(d,b,a,c){d.pageID=c.pageID;d.componentType="page";d.path=top.tlbs.templatePath;d.init()}}}]);
uiCore.directive("popupfeedback",[function(){return{restrict:"AE",replace:true,require:"^pid",template:'<div style="display:none;">	  <div class="c60_fbar_bg_pop_block" ng-style="getbg_pop_blockStyle()" ng-click="$event.stopPropagation();"></div>    <div class="c60_fbar_new_center_pop">        <div class="c60_fbar_ncp_top">        	<div class="c60_fbar_ncp_tit">                <span class="c60_fbar_ncp_tit_txt" ng-bind="compData.JS.c60_fbar_ncp_tit_txt.JS.text"></span>                <span class="c60_fbar_ncp_tit_close" ccid="class="c60_fbar_ncp_tit_close" ng-click="c60_fbar_ncp_tit_closeClick()"></span>            </div>        <div style="height:12em;">        	<div class="c60_fbar_ncp_bottom" simplescroll>            	<div class="c60_fbar_ncpb_txt"><span ng-bind="compData.JS.c60_fbar_ncpb_txt.JS.text0"></span><span ng-bind="respData.feedback.question"></span></div>                <div class="c60_fbar_ncpb_txt"><span ng-bind="compData.JS.c60_fbar_ncpb_txt.JS.text1"></span><span class="c60_fbar_hwlfeedback"></span></div>            </div>        </div>        </div>    </div></div>',scope:{},controller:["$scope","$element","$attrs","$timeout","coreService","coreUtils","Const",function(d,c,b,e,f,a,g){d.cid=b.cid;d.compData={CSS:{},JS:{}};d.eventMap={};d.respData={};d.trustAsHtml=function(h){return a.getTrustedHtml(h)};d.c60_fbar_ncp_tit_closeClick=function(){a.recordTracingCdr(d.pageID,a.createCdrid(d.pageID,"","closebtn"),d.compData.JS.c60_fbar_ncp_tit_close.JS.cdrConfig);top.tlbs.notificationCdrData=null;d.hide()};d.getbg_pop_blockStyle=function(){if(d.compData.JS.bg_pop_block.JS.stateconfig.state==0){return d.compData.JS.bg_pop_block.JS.stateconfig.state0}else{return d.compData.JS.bg_pop_block.JS.stateconfig.state1}};d.updateData=function(h){if(h!=null&&h!=undefined){d.respData=h;c.css({display:"block"});d.compData.JS.bg_pop_block.JS.stateconfig.state=1;angular.element(c[0].querySelector(".c60_fbar_hwlfeedback")).html(h.feedback.answer)}};d.eventMap.update=d.updateData;d.hide=function(){d.compData.JS.bg_pop_block.JS.stateconfig.state=0;c.css({display:"none"})};d.extendComponentData=function(h){d.compData=a.extendDeep(d.compData,h)};d.init=function(){f.registerComponentInstance(c.attr("cid"),d);d.extendComponentData(f.getInitProperties(d.cid)||{});c.css(d.compData.css||{})};d.$on(b.cid+"_handleEvent",function(j,k,i,h){if(d.eventMap[k]){d.eventMap[k](i);if(null!=h){h.resolve()}}})}],link:function(d,b,a,c){d.pageID=c.pageID;d.componentType="popupfeedback";d.init()}}}]);
uiCore.directive("redenvelope",[function(){return{restrict:"AE",replace:true,require:"^pid",template:'  <div>		 <div class="c60_fbar_top_title_right" ng-bind="compData.JS.contentText.JS.myLuckMoney" ng-click="goMyLuckmoney()"></div> 	 	 <div class="c60_fbar_luck_money c60_fbar_common_open_gpu" ng-style="compData.JS.luckMoney.CSS"></div> 		 <div class="c60_fbar_luck_money_btn"> 			<div class="c60_fbar_normal_luckmoney" ng-style="compData.JS.luckMoneyBtn.CSS" ng-bind="compData.JS.contentText.JS.normalLuckMoney" ng-click="goNormalLuckmoney()"></div>			<div class="c60_fbar_random_luckmoney" ng-style="compData.JS.luckMoneyBtn.CSS" ng-bind="compData.JS.contentText.JS.randomLuckMoney" ng-click="goRandomLuckmoney()"></div> 	 	    <div class="c60_fbar_luck_money_msg" ng-bind="compData.JS.contentText.JS.luckMoneyMsg"></div>	 	 </div>	 	 <div class="c60_fbar_luck_money_btn_recharge" >		 	<div class="c60_fbar_luck_money_btn_recharge_msg" ng-style="compData.JS.btnRecharge.CSS" ng-bind="compData.JS.btnRecharge.JS.text" ng-click="goLuckmoneyCharge()"></div>	     </div>  </div>',scope:{},controller:["$scope","$element","$attrs","coreService","coreUtils","Const",function(m,n,l,d,f,c){m.cid=l.cid;m.compData={CSS:{},JS:{}};var i="2";var h="normal";var a="random";var b="normalBtn";var k="randomBtn";var e="titleRight";var g="rechargeBtn";m.init=function(){d.registerComponentInstance(n.attr("cid"),m);var o=d.getInitProperties(l.cid)||{};m.compData=f.extendDeep(m.compData||{},o)};m.goNormalLuckmoney=function(){j(m.compData.JS.pageid.wrapenvelopepagePid,h);f.recordTracingCdr(m.pageID,n.attr("cid")+"_"+b,m.compData.JS.redenvelopeCdr.cdrConfig)};m.goRandomLuckmoney=function(){j(m.compData.JS.pageid.wrapenvelopepagePid,a);f.recordTracingCdr(m.pageID,n.attr("cid")+"_"+k,m.compData.JS.redenvelopeCdr.cdrConfig)};m.goMyLuckmoney=function(){j(m.compData.JS.pageid.redenvsrecordsurveyPid);f.recordTracingCdr(m.pageID,n.attr("cid")+"_"+e,m.compData.JS.redenvelopeCdr.cdrConfig)};m.goLuckmoneyCharge=function(){j(m.compData.JS.pageid.redenveloperechargePid);f.recordTracingCdr(m.pageID,n.attr("cid")+"_"+g,m.compData.JS.redenvelopeCdr.cdrConfig)};function j(o,p){d.fireEvent(n.attr("cid"),"gotoPage",{linktype:i,url:o,contentType:p})}}],link:function(d,b,a,c){d.pageID=c.pageID;d.componentType="redenvelope";d.init()}}}]);
uiCore.directive("mine",function(){return{restrict:"EA",replace:true,require:"^pid",template:'<div>   <div class="c60_fbar_bg_black_pop2" ng-style="getbg_black_popStyle()">    <div class="c60_fbar_tips_txt2" ng-style="compData.JS.c60_fbar_tips_txt2" style="color:white;margin-top:0" ng-bind="compData.JS.bg_black_pop.JS.desc"></div>   </div><div class="c60_fbar_my_con2" ng-style="getStyle(\'c60_fbar_my_con\')">   <div class="c60_fbar_my_top2 clearfloat" ng-style="getStyle(\'my_top\')" ng-show="compData.JS.c60_fbar_my_con.JS.isShow">    <div class="c60_fbar_my_img_txt2" ng-style="getStyle(\'my_img_txt\')">     <span class="c60_fbar_mybg_green2" ng-style="getStyle(\'c60_fbar_mybg_green\')" ng-show="compData.JS.c60_fbar_mybg_green.JS.isShow"></span>     <div class="c60_fbar_my_txt2" ng-style="getStyle(\'my_txt\')" ng-show="compData.JS.c60_fbar_c60_fbar_moblie.JS.isShow">      <p class="c60_fbar_moblie2" ng-bind="phoneFilter(revData.respparam.msisdn)" ng-style="getStyle(\'moblie\')"></p>     </div>    </div>    <div class="c60_fbar_attend_btn2" ccid="c60_fbar_attend_btn" ng-click="click(\'c60_fbar_attend_btn\');$event.stopPropagation();"  ng-show="compData.JS.c60_fbar_attend_btn.JS.isShow">     <a class="c60_fbar_attend_btn_link2" ng-style="getattend_btn_linkStyle()" ng-bind="getattend_btn_linkBtn()"></a>    </div>    <div class="c60_fbar_attend_btn2" ccid="c60_fbar_rules_btn" ng-click="click(\'c60_fbar_rules_btn\');$event.stopPropagation();"  ng-show="compData.JS.c60_fbar_rules_btn.JS.isShow">    <span class="c60_fbar_my_coin2" ng-style="compData.JS.c60_fbar_rules_btn_link.CSS" ng-bind="compData.JS.c60_fbar_rules_btn_link.JS.text"></span>    </div>   </div>   <div class="c60_fbar_my_list_con2" ccid="c60_fbar_my_list_coin" ng-click="click(\'c60_fbar_my_list_coin\');$event.stopPropagation();" ng-show="compData.JS.c60_fbar_my_list_coin.JS.isShow">    <div class="c60_fbar_my_list2" ng-style="getStyle(\'my_list\')">     <div class="c60_fbar_my_list_detail2 clearfloat" ng-style="getStyle(\'my_list_detail\')">      <div class="c60_fbar_cointitle2" ng-style="getStyle(\'cointitle\')">       <span class="c60_fbar_my_coin2" ng-style="getStyle(\'c60_fbar_my_coin\')" ng-bind="compData.JS.c60_fbar_my_coin.JS.text"></span><span class="c60_fbar_coin_txt_bold" ng-bind="revData.respparam.total" ng-show="compData.JS.c60_fbar_coin_txt_bold.JS.isShow" ng-style="getStyle(\'c60_fbar_coin_txt_bold\')"></span>      </div>      <div class="c60_fbar_arrow_jump2">       <span class="c60_fbar_arrow_jump_text2" ng-show="compData.JS.c60_fbar_arrow_jump_text1.JS.isShow" ng-bind="compData.JS.c60_fbar_arrow_jump_text1.JS.text"></span>       <span class="c60_fbar_arrow_jump_ico2" ng-style="getStyle(\'c60_fbar_arrow_jump_ico1\')"></span>      </div>     </div>    </div>   </div> <div class="c60_fbar_my_border_w" ng-show="compData.JS.c60_fbar_my_list_privilege.JS.isShow"><div class="c60_fbar_my_border"></div></div>   <div class="c60_fbar_my_list_con2 c60_fbar_my_list_con22" ccid="c60_fbar_my_list_privilege" ng-click="click(\'c60_fbar_my_list_privilege\');$event.stopPropagation();" ng-show="compData.JS.c60_fbar_my_list_privilege.JS.isShow">    <div class="c60_fbar_my_list2" ng-style="getStyle(\'my_list\')">     <div class="c60_fbar_my_list_detail2 clearfloat" ng-style="getStyle(\'my_list_detail\')">      <div class="c60_fbar_cointitle2" ng-style="getStyle(\'cointitle\')">       <span class="c60_fbar_set2" ng-style="getStyle(\'c60_fbar_privilege\')" ng-bind="compData.JS.c60_fbar_privilege.JS.text"></span><span class="c60_fbar_privilege_redpoint" ng-show="compData.JS.c60_fbar_my_list_privilege.JS.redPointShow"></span>      </div>      <div class="c60_fbar_arrow_jump2">       <span class="c60_fbar_arrow_jump_text2" ng-show="compData.JS.c60_fbar_arrow_jump_text2.JS.isShow" ng-bind="compData.JS.c60_fbar_arrow_jump_text2.JS.text"></span>       <span class="c60_fbar_arrow_jump_ico2" ng-style="getStyle(\'c60_fbar_arrow_jump_ico2\')"></span>      </div>     </div>    </div>   </div>   <div class="c60_fbar_my_list_con2" ccid="c60_fbar_my_list_set" ng-click="click(\'c60_fbar_my_list_set\');$event.stopPropagation();" ng-show="compData.JS.c60_fbar_my_list_set.JS.isShow">    <div class="c60_fbar_my_list2" ng-style="getStyle(\'my_list\')">     <div class="c60_fbar_my_list_detail2 clearfloat" ng-style="getStyle(\'my_list_detail\')">      <div class="c60_fbar_cointitle2" ng-style="getStyle(\'cointitle\')">       <span class="c60_fbar_set2" ng-style="getStyle(\'c60_fbar_set\')" ng-bind="compData.JS.c60_fbar_set.JS.text"></span>      </div>      <div class="c60_fbar_arrow_jump2">       <span class="c60_fbar_arrow_jump_text2" ng-show="compData.JS.c60_fbar_arrow_jump_text2.JS.isShow" ng-bind="compData.JS.c60_fbar_arrow_jump_text2.JS.text"></span>       <span class="c60_fbar_arrow_jump_ico2" ng-style="getStyle(\'c60_fbar_arrow_jump_ico2\')"></span>      </div>     </div>    </div>   </div>   <div class="c60_fbar_my_add_btn" ng-style="getStyle(\'c60_fbar_my_add_desktop\')" ng-show="compData.JS.c60_fbar_my_add_desktop.JS.isShow" ccid="c60_fbar_my_add_desktop" ng-click="click(\'c60_fbar_my_add_desktop\');$event.stopPropagation();" >     <span class="c60_fbar_my_add_btn_ico" ng-bind="compData.JS.c60_fbar_my_add_desktop_text.JS.text" ng-style="getStyle(\'c60_fbar_my_add_desktop_text\')" ></span>  </div></div></div>',scope:{},controller:["$scope","$element","$attrs","coreService","coreUtils","Const","$q",function(g,h,f,b,c,a,d){g.cid=f.cid;g.eventMap={};g.compData={CSS:{},JS:{stateconfig:{state:0,state0:{"background-color":"#fff",},state1:{"background-color":"#cacecd",}}}};g.getbg_black_popStyle=function(){if(g.compData.JS.bg_black_pop.JS.stateconfig.state=="1"){return g.compData.JS.bg_black_pop.JS.stateconfig.state1}else{return g.compData.JS.bg_black_pop.JS.stateconfig.state0}};g.getattend_btn_linkStyle=function(){if(g.compData.JS.attend_btn_link.JS.stateconfig.state=="0"){return g.compData.JS.attend_btn_link.JS.stateconfig.state0}else{return g.compData.JS.attend_btn_link.JS.stateconfig.state1}};g.getattend_btn_linkBtn=function(){if(g.compData.JS.attend_btn_link.JS.stateconfig.state=="0"){return g.compData.JS.c60_fbar_attend_btn_link.JS.text1}else{return g.compData.JS.c60_fbar_attend_btn_link.JS.text2}};g.bg_black_popShow=function(j){g.compData.JS.bg_black_pop.JS.desc=j;g.compData.JS.bg_black_pop.JS.stateconfig.state="1";angular.element(h[0].querySelector(".c60_fbar_bg_black_pop2")).css({display:"block"});setTimeout(function(){g.compData.JS.bg_black_pop.JS.stateconfig.state="0";angular.element(h[0].querySelector(".c60_fbar_bg_black_pop2")).css({display:"none"})},parseInt(g.compData.JS.bg_black_pop.JS.stateconfig.time)*1000)};g.compData.JS.phoneconfig={prefix:"86",len:"13",maskbegin:"5",maskend:"9",commonlen:"11",commonbegin:"3",commonend:"7"};g.phoneFilter=function(m){if(m==undefined){return'<i style="visibility:hidden">&nbsp;</i>'}var l="";for(var k=parseInt(g.compData.JS.phoneconfig.maskbegin);k<parseInt(g.compData.JS.phoneconfig.maskend);k++){l=l+"*"}var j="";if(m.indexOf(g.compData.JS.phoneconfig.prefix)==0&&m.length==g.compData.JS.phoneconfig.len){j=m.substring(0,parseInt(g.compData.JS.phoneconfig.maskbegin))+l+m.substring(parseInt(g.compData.JS.phoneconfig.maskend))}else{if(m.length>=parseInt(g.compData.JS.phoneconfig.commonlen)){j=m.substring(0,parseInt(g.compData.JS.phoneconfig.commonbegin))+l+m.substring(parseInt(g.compData.JS.phoneconfig.commonend))}}return j};g.getStyle=function(j){if(g.compData.JS[j]&&g.compData.JS[j].CSS){return g.compData.JS[j].CSS}};g.extendComponentData=function(j){g.compData=c.extendDeep(g.compData,j)};g.init=function(){b.registerComponentInstance(h.attr("cid"),g);g.extendComponentData(b.getInitProperties(g.cid)||{});h.css(g.compData.css||{})};g.getDataFromRet=function(k){if(k&&k.respparam){g.revData=k;var j=k.respparam;if(j.signflag=="1"){g.compData.JS.attend_btn_link.JS.stateconfig.state="0"}else{g.compData.JS.attend_btn_link.JS.stateconfig.state="1"}}};g.eventMap.getDataFromRet=g.getDataFromRet;g.signRet=function(k){if(k&&k.respparam){var j=k.respparam;if(j.signtype=="111001"){if(j.status=="2015522"||j.status=="2015524"){g.compData.JS.attend_btn_link.JS.stateconfig.state="1";g.bg_black_popShow(g.compData.JS.tips2+j.vaIncreased+g.compData.JS.tips3);g.revData.respparam.total=Number(g.revData.respparam.total)+Number(k.respparam.vaIncreased)}else{if(j.status=="9206"){g.compData.JS.attend_btn_link.JS.stateconfig.state="1";g.bg_black_popShow(g.compData.JS.tips4)}else{angular.element(h[0].querySelector(".c60_fbar_attend_btn_link2")).css(g.compData.JS.stateconfig.state0);g.compData.JS.stateconfig.state="0";g.bg_black_popShow(g.compData.JS.tips5)}}}else{angular.element(h[0].querySelector(".c60_fbar_attend_btn_link2")).css(g.compData.JS.stateconfig.state0);g.compData.JS.stateconfig.state="0";g.bg_black_popShow(g.compData.JS.tips5)}}};var i={c60_fbar_my_list_coin:function(j){e("coin");b.fireEvent(h.attr("cid"),f.event||"coinclick")},c60_fbar_my_list_privilege:function(j){e("privilege");b.fireEvent(h.attr("cid"),f.event||"privilegeclick")},c60_fbar_my_list_set:function(j){e("set");b.fireEvent(h.attr("cid"),f.event||"mysetclick")},c60_fbar_attend_btn:function(j){if(g.compData.JS.stateconfig.state=="1"){return false}if(g.compData.JS.attend_btn_link.JS.stateconfig.state=="1"){return false}g.compData.JS.stateconfig.state="1";e("attend");angular.element(h[0].querySelector(".c60_fbar_attend_btn_link2")).css(g.compData.JS.stateconfig.state1);g.bg_black_popShow(g.compData.JS.tips1);b.fireEvent(h.attr("cid"),f.event||"myattendClick",{id:""})},c60_fbar_my_add_desktop:function(k){e("desktop");var j=navigator.userAgent;if(/(android|Android)/ig.test(j)){window.open(g.compData.JS.c60_fbar_my_add_desktop.JS.androidurl)}else{if(/(iPhone|iPad|iOS|iphone|ipad|ios)/ig.test(j)){window.open(g.compData.JS.c60_fbar_my_add_desktop.JS.iosurl)}else{if(j.indexOf("Windows Phone")>-1){}}}},c60_fbar_rules_btn:function(){e("rules");var j=b.getComponentScope("pvctrl");if(null!=j){var k=d.defer();var l=k.promise;j.lloadApps({applist:"ipopuppage"},k);l.then(function(){b.fireEvent(h.attr("cid"),"rulesClick")})}}};g.click=function(j,k){if(j==undefined||j==null){return false}switch(j){case"c60_fbar_my_list_coin":i.c60_fbar_my_list_coin(k);break;case"c60_fbar_my_list_privilege":i.c60_fbar_my_list_privilege(k);break;case"c60_fbar_my_add_desktop":i.c60_fbar_my_add_desktop(k);break;case"c60_fbar_my_list_set":i.c60_fbar_my_list_set(k);break;case"c60_fbar_attend_btn":i.c60_fbar_attend_btn(k);break;case"c60_fbar_rules_btn":i.c60_fbar_rules_btn();default:}};g.eventMap.signRet=g.signRet;g.$on(g.cid+"_handleEvent",function(m,k,l,j){g.eventMap[k](l);if(null!=j){j.resolve()}});g.updateCoinsTotal=function(j){if(null!=j&&null!=j.respparam&&undefined!=j.respparam&&null!=j.respparam.vaIncreased&&undefined!=j.respparam.vaIncreased){g.revData.respparam.total=Number(g.revData.respparam.total)+Number(j.respparam.vaIncreased)}if(j.respparam.status=="2015522"||j.respparam.status=="2015524"){g.compData.JS.attend_btn_link.JS.stateconfig.state="1"}};function e(j){c.recordTracingCdr(g.pageID,g.pageID+f.cid+"_"+j,g.compData.JS.cdrConfig)}g.eventMap.updateCoinsTotal=g.updateCoinsTotal}],link:function(d,b,a,c){d.pageID=c.pageID;d.componentType="cmine";d.init()}}});
uiCore.directive('popupimage', [function() {
    return {
        restrict: 'AE',
        replace: true,
        require: '^pid',
        template: '<div class="c60_fbar_popupimage">'
        		+'<div class="c60_fbar_container" ng-style="getContainerStyle();">'
        		+'<div class="c60_fbar_popupimage_close" ng-style="compData.JS.close.CSS" id="c60_fbar_popupimage_close" ccid="c60_fbar_popupimage_close" ng-click="close();;$event.stopPropagation()"></div>'
        		+'<div class="c60_fbar_popupimage_img" id="c60_fbar_popupimage_img" ng-style="compData.JS.bgimg.CSS" ng-click="imgClick();;$event.stopPropagation()">'
        		+'</div>'
        		+'</div>'
        		+'</div>',
        scope: {},
        controller: ["$scope", "$element", "$attrs", 'coreService', 'coreUtils',
            'Const','$timeout',
            function($scope, $element, $attrs, coreService, coreUtils, Const, $timeout) {
                $scope.cid = $attrs.cid;
                $scope.eventMap = {};
                $scope.compData = {};
                $scope.getContainerStyle = function() {
                	if (/(iPhone|iOS|IOS|iphone|ios)/ig.test($scope.compData.userAgent)){
                		$scope.winHeight = top.window.innerHeight;
                		if($scope.winHeight < 500){
                			$scope.compData.JS.container.CSS['margin-top'] = '-11.5em';
                		}
             		}
                	return $scope.compData.JS.container.CSS;
                };
                $scope.imgClick = function () {
                     var linktype = $scope.compData.JS.linktype;
                     var url = $scope.compData.JS.url;
                     if($scope.hasPkg){
                     	coreService.fireEvent($scope.cid, 'tostore', 
                         {	'pkgid': $scope.packageData.id,
                             'pkgoid': $scope.packageData.oid,
                             'taskid': $scope.taskId
                         });
                     }else{
                     	if (linktype == '0') {
 		                	if (url) {
 		                		if (/(iPhone|iOS|IOS|iphone|ios)/ig.test($scope.compData.userAgent)){
 		                			if(/(OS 9|OS 10|OS 11)/ig.test($scope.compData.userAgent)){
 		                				top.location.href=url;
 		                			}else{
 		                				window.open(url);
 		                			}
 		                		}else{
 	                				window.open(url);
 	                			}
 		                	}
 		                } else {
 		                	if (linktype && url) {
 		                		coreService.fireEvent($scope.cid, 'gotopage',{
 		                            "url": url,"linktype":linktype
 		                        });
 		                	}
 		                }
                     }
                     if (top.tlbs.messageid != "" && top.tlbs.messageid != null && top.tlbs.messageid != undefined) {
                         coreService.fireEvent($scope.cid, 'messagestatuschange', {
                             "messageid": top.tlbs.messageid
                         });
                     }
                     $element.css("display","none");
                     coreUtils.recordTracingCdr($scope.pageID,coreUtils.createCdrid($scope.pageID, '', 'popupimage'), $scope.compData.JS.cdrConfig);
				};
                $scope.close = function() {
                    $element.css("display","none");
                    coreUtils.recordTracingCdr($scope.pageID,coreUtils.createCdrid($scope.pageID, '', 'popupimage_close'), $scope.compData.JS.cdrConfig);
                    top.tlbs.notificationCdrData = null;
                };
                var time = null;
                function isEmpty(obj){
 	                for (var name in obj){
 	                	return false;
 	                }
 	                return true;
                 };
                $scope.show = function() {
                	time =$scope.compData.JS.closetime||8000;
                	$element.css("display","block");
                	$timeout(function(){
                    	$element.css("display","none");
                    },time);
                };
                $scope.hasPkg = false;
                $scope.update = function(param) {
                    $scope.taskId = param.taskId;
                   	top.tlbs.messageid = param.messageid || "";
                    if(param && !isEmpty(param.packagelist) && !isEmpty(param.packagelist[0].list) && param.packagelist[0].list.length > 0){
                        $scope.packageData = param.packagelist[0].list[0];
                        $scope.hasPkg = true;
                    }else{
                    	$scope.hasPkg = false;
                    }
                };
                $scope.hide = function() {
                	$element.css("display","none");
                };
                $scope.to_trusted = function(text) {
                	return coreUtils.getTrustedHtml(text);
                };
                $scope.extendComponentData = function(componetData) {
                    coreUtils.extendDeep($scope.compData, componetData);
                };
                $scope.init = function() {
                    coreService.registerComponentInstance($scope.cid, $scope);
                    var properties = coreService.getInitProperties($attrs['cid']) || {};
                    $scope.compData = coreUtils.extendDeep($scope.compData || {}, properties);
                    $element.css($scope.compData.CSS || {});
                    $scope.compData.userAgent=navigator.userAgent;
                };
                $scope.eventMap['update'] = $scope.update;
                $scope.eventMap['show'] = $scope.show;
                $scope.eventMap['hide'] = $scope.hide;
                $scope.$on($scope.cid + '_handleEvent', function(eventObj, event, inputData, deferred) {
                    $scope.eventMap[event](inputData, deferred);
                    if (null != deferred) {
                        deferred.resolve();
                    }
                });
            }
        ],
        link: function(scope, element, attrs, ctrl) {
            scope.pageID = ctrl.pageID;
            scope.componentType = 'popupimage';
            scope.init();
        }
    };
}]);
uiCore.directive("iholdert",["coreService","coreUtils","$timeout",function(c,a,b){return{restrict:"E",replace:true,transclude:true,template:"<div {{param}} ng-transclude></div>",scope:{param:"=param"},require:"^pid",controller:["$scope","$element","$attrs","$compile","$templateCache","$timeout",function(g,f,e,i,d,h){g.cid=e.cid;g.classid="."+g.cid;g.eventMap={};g.compData={CSS:{},JS:{clickable:false,animation:false,clickevent:"",stateconfig:{stylestates:"",extrastates:"",cstylestate:"",cextrastate:"",state:0,estate:0,state0:{},state1:{}}}};g.extendComponentData=function(j){g.compData=a.extendDeep(g.compData,j)};g.init=function(){c.registerComponentInstance(g.cid,g);g.extendComponentData(c.getInitProperties(g.cid));g.processStyle();g.updateStyle();if(null!=e.templateurl){g.getTemplate()}};g.getHolderStyle=function(){if(null!=g.compData.JS.stateconfig["state"+g.compData.JS.stateconfig.state]){return a.extendDeep(g.compData.CSS,g.compData.JS.stateconfig["state"+g.compData.JS.stateconfig.state])}};g.handleClick=function(){c.fireEvent(g.cid,(g.compData.JS.clickevent||"")+"click"+g.compData.JS.stateconfig.state)};g.changeState=function(k,j){if(null!=k&&null!=k.cstate){if(g.compData.JS.stateconfig.state!=k.cstate){g.compData.JS.stateconfig.state=k.cstate;g.updateStyle();g.$evalAsync(function(){if(null!=j){if(g.compData.JS.animation){f.on(top.tlbs.transitionendEvent,function(l){j.resolve()})}else{j.resolve()}}})}else{if(null!=j){j.resolve()}}}};g.changeExtraState=function(k,j){if(g.compData.JS.stateconfig.estate!=k.cstate){g.compData.JS.stateconfig.estate=k.cstate;g.updateStyle()}if(null!=j){j.resolve()}};g.hide=function(){f.css({display:"none"})};g.show=function(j){f.css({display:"block"});var k=g.compData.JS.closetime;if(k){h(g.hide,k)}};g.eventMap.changeState=g.changeState;g.eventMap.hide=g.hide;g.eventMap.show=g.show;g.eventMap.changeExtraState=g.changeExtraState;g.$on(g.cid+"_handleEvent",function(m,k,l,j){g.eventMap[k](l,j)});g.$watch(g.param,function(j){if(g.param){g.compData=g.param}});g.processStyle=function(){var s=JSON.stringify(g.compData.CSS);s=g.formatStyleData(s);c.commonServiceRef.appendStyle(g.classid,"",s);var q=g.compData.JS.stateconfig.stylestates.split("|");var p=q.length;var r=g.compData.JS.stateconfig.extrastates.split("|");var t=r.length;for(var o=0;o<p;o++){var m=q[o];if(m.length>0){s=JSON.stringify(g.compData.JS.stateconfig[m]);s=g.formatStyleData(s);c.commonServiceRef.appendStyle(g.classid,"."+m,s);for(var n=0;n<t;n++){var k=r[n];if(k.length>0){s=JSON.stringify(g.compData.JS.stateconfig[k]);s=g.formatStyleData(s);c.commonServiceRef.appendStyle(g.classid,"."+m+"."+k,s)}}}}f.addClass(g.cid);if(null!=g.compData.JS.stateconfig.state){var l="state"+g.compData.JS.stateconfig.state;g.compData.JS.stateconfig.stylestates=l}};g.formatStyleData=function(j){j=j.replace(/","/g,";").replace(/":"/g,":").replace(/\\/g,"").replace(/{"/,"{").replace(/"}/,"}");return j};g.updateStyle=function(){f.removeClass(g.compData.JS.stateconfig.cstylestate);f.removeClass(g.compData.JS.stateconfig.cextrastate);g.compData.JS.stateconfig.cstylestate="state"+g.compData.JS.stateconfig.state;f.addClass(g.compData.JS.stateconfig.cstylestate);if(g.compData.JS.stateconfig.state!=g.compData.JS.stateconfig.estate){g.compData.JS.stateconfig.cextrastate="state"+g.compData.JS.stateconfig.estate;f.addClass(g.compData.JS.stateconfig.cextrastate)}};g.getTemplate=function(){var j=d.get(e.templateurl);f.html(j);i(f.contents())(g)}}],link:function(f,e,d,g){f.pageID=g.pageID;f.componentType="iholdert";f.init()}}}]);
uiCore.directive('activity', [function() {
    return {
        restrict: 'AE',
        replace: true,
        require: '^pid',
        template: '<div><div class="c60_fbar_activitywrapper">' + '<div class="c60_fbar_wrapper1">' + '<div class="c60_fbar_activity" simplescroll>'

            + '<div class="c60_fbar_taocan_result_con">' + '<div class="c60_fbar_succ_img_con"><img class="c60_fbar_succ_img_act"  ng-src="{{compData.JS.statusconfig.status.imgUrl}}"/></div>' + '<div class="c60_fbar_tips_txt" ng-bind="compData.JS.statusconfig.status.tipstxt"></div>' + '<div class="c60_fbar_result_btn" ccid="c60_fbar_link_btn"><a class="c60_fbar_link_btn" ng-bind="compData.JS.statusconfig.status.btntxt" ng-click="returnclick()"></a></div>' + '</div>'

            + '<ul class="c60_fbar_imgTitleDescList">' + '<li ng-repeat="imgTitleDesc in compData.JS.imgTitleDescs | objectSort: \'priority\'" ng-class="{\'c60_fbar_imgTitleDesc\':true}">' + '<a ng-click="imageclick(imgTitleDesc,$index)" ccid="c60_fbar_link_click"><img ng-src="{{imgTitleDesc.imageurl}}" ng-class="{\'c60_fbar_imgTitleDesc-Img\':true}"/></a>' + '<p ng-class="{\'c60_fbar_imgTitleDesc-Title\':true}" ng-bind="imgTitleDesc.title"></p>' + '<p ng-class="{\'c60_fbar_imgTitleDesc-Desc1\':true}" ng-bind="imgTitleDesc.description"></p></li>' + '</ul>' + '</div>' + '</div>' + '</div></div>',
        scope: {},
        controller: ["$scope", "$element", "$attrs", 'coreService',
            'coreUtils',
            'Const',
            function($scope, $element, $attrs, coreService, coreUtils, Const) {
                $scope.cid = $attrs.cid;
                $scope.compData = {
                    CSS: {},
                    JS: {}
                };
                $scope.eventMap = {};


                $scope.updateData = function(param) {
                    if (param.respparam) {
                        if (param.respparam.advertisement.maxprioritylist && param.respparam.advertisement.maxprioritylist.length > 0) {
                            angular.element($element[0].querySelector('.c60_fbar_imgTitleDescList')).css({
                                'display': 'block'
                            });
                            angular.element($element[0].querySelector('.c60_fbar_taocan_result_con')).css({
                                'display': 'none'
                            });
                            $scope.compData.JS.imgTitleDescs = [];
                            $scope.temp = [param.respparam.advertisement.maxprioritylist || [], param.respparam.advertisement.minprioritylist || []];
                            for (var i = 0; i < $scope.temp.length; i++) {
                                for (var j = 0; j < $scope.temp[i].length; j++) {
                                    $scope.compData.JS.imgTitleDescs.push($scope.temp[i][j]);
                                }
                            }
                        } else {
                            angular.element($element[0].querySelector('.c60_fbar_imgTitleDescList')).css({
                                'display': 'none'
                            });
                            angular.element($element[0].querySelector('.c60_fbar_taocan_result_con')).css({
                                'display': 'block'
                            });
                        }
                    }
                };
                
                $scope.errorupdate = function() {
                	 angular.element($element[0].querySelector('.c60_fbar_imgTitleDescList')).css({
                         'display': 'none'
                     });
                     angular.element($element[0].querySelector('.c60_fbar_taocan_result_con')).css({
                         'display': 'block'
                     });
                };
                
                $scope.init = function() {
                    coreService.registerComponentInstance($element.attr('cid'), $scope);
                    var properties = coreService.getInitProperties($attrs['cid']) || {};
                    var imgUrl = properties.JS.statusconfig.status.imgUrl;
                    properties.JS.statusconfig.status.imgUrl = imgUrl.replace(/'/g, '');
                    $scope.compData = coreUtils.extendDeep($scope.compData || {}, properties);
                    $element.css($scope.compData.css || {});
                    coreService.fireEvent($element.attr('cid'), 'init');
                };

                $scope.returnclick = function() {
                	coreUtils.recordTracingCdr($scope.pageID, $scope.pageID + "_" + 'btn', $scope.compData.JS.activityCdr.cdrConfig);
                    coreService.fireEvent($element.attr('cid'), $attrs['event'] || 'goFirstPage');
                };

                $scope.imageclick = function(imgTitleDesc, index) {
                	coreUtils.recordTracingCdr($scope.pageID,'in' + imgTitleDesc.CONTENTID,$scope.compData.JS.activityCdr.cdrConfig);
                    coreService.fireEvent($element.attr('cid'),'gotoPage',{linktype:imgTitleDesc.linktype,url:imgTitleDesc.weblink});
                }

                $scope.$on($attrs['cid'] + '_handleEvent', function(event, cevent, args, deferred) {
                    if ($scope.eventMap[cevent]) {
                        $scope.eventMap[cevent](args);
                        if (null != deferred) {
                            deferred.resolve();
                        }
                    }
                });
                $scope.eventMap['update'] = $scope.updateData;
                $scope.eventMap['errorupdate'] = $scope.errorupdate;
            }
        ],
        link: function($scope, $element, $attrs, ctl) {
            $scope.pageID = ctl.pageID;
            $scope.componentType = 'page';
            $scope.init();
        }
    }
}]);
uiCore.filter("objectSort", function() {
    var listSort = function(list, field) {
        if (list == undefined) {
            return
        };
        for (var i = 0; i < list.length - 1; i++) {
            for (var j = 0; j < list.length - i - 1; j++) {
                if (list[j][field] > list[j + 1][field]) {
                    var temp = list[j];
                    list[j] = list[j + 1];
                    list[j + 1] = temp;
                }
            }
        }
        return list;
    };
    return listSort;
});
uiCore.directive("loadingmask",function(){return{restrict:"EA",replace:true,require:"^pid",template:'<div class="c60_fbar_loadingmask"><div class="c60_fbar_loadingmask_datouwang8"><div class="c60_fbar_loadingmask_datouwang8-container c60_fbar_loadingmask_container1"><div class="c60_fbar_loadingmask_circle1 c60_fbar_loadingmask_container_div"></div><div class="c60_fbar_loadingmask_circle2 c60_fbar_loadingmask_container1_circle2 c60_fbar_loadingmask_container_div"></div><div class="c60_fbar_loadingmask_circle3 c60_fbar_loadingmask_container1_circle3 c60_fbar_loadingmask_container_div"></div><div class="c60_fbar_loadingmask_circle4 c60_fbar_loadingmask_container1_circle4 c60_fbar_loadingmask_container_div"></div></div><div class="c60_fbar_loadingmask_datouwang8-container c60_fbar_loadingmask_container2"><div class="c60_fbar_loadingmask_circle1 c60_fbar_loadingmask_container2_circle1 c60_fbar_loadingmask_container_div"></div><div class="c60_fbar_loadingmask_circle2 c60_fbar_loadingmask_container2_circle2 c60_fbar_loadingmask_container_div"></div><div class="c60_fbar_loadingmask_circle3 c60_fbar_loadingmask_container2_circle3 c60_fbar_loadingmask_container_div"></div><div class="c60_fbar_loadingmask_circle4 c60_fbar_loadingmask_container2_circle4 c60_fbar_loadingmask_container_div"></div></div><div class="c60_fbar_loadingmask_datouwang8-container c60_fbar_loadingmask_container3"><div class="c60_fbar_loadingmask_circle1 c60_fbar_loadingmask_container3_circle1 c60_fbar_loadingmask_container_div"></div><div class="c60_fbar_loadingmask_circle2 c60_fbar_loadingmask_container3_circle2 c60_fbar_loadingmask_container_div"></div><div class="c60_fbar_loadingmask_circle3 c60_fbar_loadingmask_container3_circle3 c60_fbar_loadingmask_container_div"></div><div class="c60_fbar_loadingmask_circle4 c60_fbar_loadingmask_container3_circle4 c60_fbar_loadingmask_container_div"></div></div></div><div class="c60_fbar_loadingmask_tips_txt_loading" ng-bind="compData.JS.loadingtext"></div></div>',scope:{},controller:["$scope","$element","$attrs","coreService","coreUtils","Const",function(d,c,b,e,a,f){var g=null;d.compData={};d.eventMap={};d.init=function(){e.registerComponentInstance(c.attr("cid"),d);var h=e.getInitProperties(b.cid)||{};d.compData.css=h.CSS||{};d.compData.JS=h.JS||{};d.compData.JS.loadingtext=d.compData.JS.loadingtext||"加载中";c.css(d.compData.css);if(d.compData.JS.loadingposition&&d.compData.JS.loadingposition.CSS){var i=angular.element(c[0].querySelector(".c60_fbar_loadingmask_datouwang8"));i.css(d.compData.JS.loadingposition.CSS)}};d.show=function(i){var h=i&&i.timeout?i.timeout:d.compData.JS.autohide||10000;c.css({display:"block"});if("-1"!==h){g=setTimeout(d.hide,h)}};d.hide=function(){c.css({display:"none"});if(g){clearTimeout(g);g=null}};d.eventMap.show=d.show;d.eventMap.hide=d.hide;d.$on(b.cid+"_handleEvent",function(k,i,j,h){d.eventMap[i](j,h);if(null!=h){h.resolve()}})}],link:function(d,b,a,c){d.pageID=c.pageID;d.componentType="loadingmask";d.init()}}});
uiCore.directive("ipopupapprec",[function(){return{restrict:"AE",replace:true,transclude:true,template:'<div ng-click="link()" ccid="c60_fbar_tanchuang_bottom" class="c60_fbar_tanchuang_bottom"><div class="c60_fbar_guess_mark_coin c60_fbar_clearfloat"><div class="c60_fbar_guess_mark_img" ng-style="compData.JS.guess_mark_img.CSS"></div><div class="c60_fbar_mark_txt" ng-style="compData.JS.c60_fbar_mark"><div class="c60_fbar_mark_big_txt" ng-bind="compData.JS.mark_big_txt.text" ng-style="compData.JS.c60_fbar_mark_txt"></div><div class="c60_fbar_mark_small_txt" ng-bind="compData.JS.mark_small_txt.text"></div></div></div><div class="c60_fbar_tuisong_name c60_fbar_clearfloat"><span class="c60_fbar_tuisong_name_txt" ng-style="compData.JS.c60_fbar_tuisong" ng-bind="compData.JS.tuisong_name_txt.text"></span></div></div>',scope:{},require:"^pid",controller:["$scope","$element","$attrs","coreService","coreUtils","Const",function(d,c,b,e,a,f){d.cid=b.cid;d.compData={CSS:{},JS:{}};d.link=function(){if(top.tlbs.messageid!=""){e.fireEvent(d.cid,"messagestatuschange",{messageid:top.tlbs.messageid})}a.recordTracingCdr(d.pageID,d.pageID+"_linkapp",d.compData.JS.tanchuang_bottom.JS.cdrConfig,{iseComp:"1"});e.fireEvent(c.attr("cid"),"linkapp")};d.init=function(){e.registerComponentInstance(c.attr("cid"),d);var g=e.getInitProperties(b.cid)||{};d.compData.CSS=g.CSS||{};d.compData.JS=g.JS||{};c.css(g.CSS);e.fireEvent(c.attr("cid"),"init")};d.$on(b.cid+"_handleEvent",function(i,j,h,g){if(d.eventMap[j]){d.eventMap[j](h);if(null!=g){g.resolve()}}})}],link:function(c,b,a,d){c.pageID=d.pageID;c.componentType="ipopupapprec";c.init()}}}]);
uiCore.directive("popupimgtext",[function(){return{restrict:"AE",replace:true,require:"^pid",template:'<div class="c60_fbar_popupimgtext"><div class="c60_fbar_wchbg_pop_block"></div><div class="c60_fbar_wchpop_block"><div class="c60_fbar_wchimg_txt_info"><table cellpadding="0" cellspacing="0" class="c60_fbar_wchimg_txt_table"><tr><td><span class="c60_fbar_wchadv_img" ng-style="revData.imgstyle"></span></td><td style="display:inline-block;"><div class="c60_fbar_wchpop_txt4_tit" ng-bind="revData.title" ng-style="pureTextStyle2(\'title\')"></div><div class="c60_fbar_wchpop_txt4"  ng-bind-html="to_trusted(revData.titledesc)" ng-style="pureTextStyle2(\'titledesc\')"></div></td></tr></table></div><div class="c60_fbar_wchimg_txt_btn clearfloat"><div class="c60_fbar_wchleft_itbtn" ccid="c60_fbar_popupimgtext_btnclose"  ng-bind="pureTextBtn(\'cancel\')" ng-style="pureTextStyle2(\'cancel\')"></div><div class="c60_fbar_wchright_itbtn" ccid="c60_fbar_popupimgtext_btn"  ng-bind="pureTextBtn(\'detail\')" ng-style="pureTextStyle2(\'detail\')" ng-click = "goToOutSideUrl()" ></div></div></div></div>',scope:{},controller:["$scope","$element","$attrs","$timeout","coreService","coreUtils","Const",function(i,j,h,d,c,e,b){i.cid=h.cid;i.compData={};i.eventMap={};i.revData={};i.to_trusted=function(k){return e.getTrustedHtml(k)};i.updateData=function(m){j.css({display:"block"});if(m!=null&&m!=undefined){if(m.campaign!=null&&m.campaign!=undefined){top.tlbs.messageid=m.messageid||"";var k=m.campaign;i.revData.title=k.name;i.revData.titledesc=k.desc;i.revData.imgstyle=i.compData.JS.popuptitleconfig.JS.stateconfig.state2;i.revData.imgstyle["background-image"]="url("+k.image+")";i.revData.url=k.url;i.revData.linkType=k.linkType}else{i.revData.title="";i.revData.titledesc="";i.revData.url=i.compData.JS.popupbtnconfig.JS.url;i.revData.linkType=i.compData.JS.popupbtnconfig.JS.linktype}}var l=i.compData.JS.closetime;if(top.tlbs.messageid!=""){d(function(){if(j.css("display")!="none"){top.tlbs.notificationCdrData=null}i.hide()},l)}};i.hide=function(){j.css({display:"none"})};var f=b.touchEvent.start,a=angular.element(j[0].querySelector(".c60_fbar_wchleft_itbtn"));a.bind(f,function(k){k.stopPropagation();k.preventDefault();_lastYPos=k.touches?k.touches[0].pageY:k.pageY;_lastXPos=k.touches?k.touches[0].pageX:k.pageX;j.css({display:"none"});if(top.tlbs.messageid!=""){c.fireEvent(i.cid,"messagestatuschange",{messageid:top.tlbs.messageid})}e.recordTracingCdr(i.pageID,e.createCdrid(i.pageID,"","closebtn"),i.compData.JS.popupbtnconfig.JS.cdrConfig);top.tlbs.notificationCdrData=null});i.goToOutSideUrl=function(){j.css({display:"none"});if(top.tlbs.messageid!=""){c.fireEvent(i.cid,"messagestatuschange",{messageid:top.tlbs.messageid})}e.recordTracingCdr(i.pageID,e.createCdrid(i.pageID,"","returnbtn"),i.compData.JS.popupbtnconfig.JS.cdrConfig);c.fireEvent(j.attr("cid"),"gotoPage",{linktype:i.revData.linkType,url:i.revData.url})};i.pureTextStyle2=function(k){if(k!=null&&k!=undefined){switch(k){case"title":return i.compData.JS.popuptitleconfig.JS.stateconfig.state0;break;case"titledesc":return i.compData.JS.popuptitleconfig.JS.stateconfig.state1;break;case"cancel":return i.compData.JS.popupbtnconfig.JS.stateconfig.state0;break;case"detail":return i.compData.JS.popupbtnconfig.JS.stateconfig.state1;break;default:break}}};i.pureTextBtn=function(k){if(k!=null&&k!=undefined){switch(k){case"cancel":return i.compData.JS.popupbtnconfig.JS.stateconfig.title0;break;case"detail":return i.compData.JS.popupbtnconfig.JS.stateconfig.title1;break;default:break}}};function g(k){angular.element(j[0].querySelector(".c60_fbar_wchpop_block")).css(k||{left:"0",bottom:"0em"})}i.init=function(){c.registerComponentInstance(j.attr("cid"),i);var k=c.getInitProperties(h.cid)||{};i.compData=e.extendDeep(i.compData,k);j.css(i.compData.css||{});g(i.compData.JS.position);c.fireEvent(j.attr("cid"),"init")};i.$on(h.cid+"_handleEvent",function(m,n,l,k){if(i.eventMap[n]){i.eventMap[n](l);if(null!=k){k.resolve()}}});i.eventMap.update=i.updateData}],link:function(d,b,a,c){d.pageID=c.pageID;d.componentType="page";d.init()}}}]);
﻿uiCore.directive('popuptopbanner', [function() {
    return {
        restrict: 'AE',
        replace: true,
        require: '^pid',
        template: '<div class="c60_popuptopbanner"><div class="c60_topbannerbg"  ng-show="compData.JS.topbannerbg.JS.isShow"  ng-style="getStyle(\'topbannerbg\')"></div><div class="c60_popuptopbannerbg" ng-style="getStyle(\'popuptopbannerbg\')"><div class="c60_popuptopbannerbgwarp"><span class="c60_popuptopbannerclose"  ccid="c60_popuptopbannerclose"  ng-style="getStyle(\'popuptopbannerclose\')">&nbsp;</span><img ng-src="{{revData.image}}" ccid="popuptopbannerimg" ng-click="bannerimgclick();$event.stopPropagation();"  ng-show="compData.JS.popuptopbannerimg.JS.isShow"  class="c60_popuptopbannerimg" ng-style="getStyle(\'popuptopbannerimg\')"><p ng-show="compData.JS.popuptopbannertitle.JS.isShow" ccid="popuptopbannerimg" ng-click="bannerimgclick();$event.stopPropagation();"   class="c60_popuptopbannertitle" ng-style="getStyle(\'popuptopbannertitle\')" ng-bind="revData.desc"></p></div></div></div>',
        scope: {},
        controller: ["$scope", "$element", "$attrs", "$timeout", 'coreService', 'coreUtils', 'Const', '$sce',
            function($scope, $element, $attrs, $timeout, coreService, coreUtils, Const, $sce) {
                $scope.cid = $attrs.cid;
                $scope.compData = {};
                $scope.eventMap = {};
                $scope.revData = {};
                $scope.getStyle = function(input) {
                    if ($scope.compData.JS[input] && $scope.compData.JS[input].CSS) {
                        return $scope.compData.JS[input].CSS;
                    }
                };
                //获取后台数据
                $scope.updateData = function(param) {
                    if (param != null && param != undefined) {
                        if (param.campaign != null && param.campaign != undefined) {
                            $element.css({
                                'display': 'block'
                            });
                            top.tlbs.messageid = param.messageid || "";
                            var temp = param.campaign;
                            $scope.revData.name = temp.name;
                            $scope.revData.desc = temp.desc;
                            $scope.revData.url = temp.url;
                            $scope.revData.linktype=temp.linkType;
                            $scope.revData.image = temp.image;
                            if($scope.revData.desc && $scope.revData.desc != null && $scope.revData.desc != undefined){
                            	$scope.compData.JS.popuptopbannertitle.JS.isShow=true;	
                            }else{
                            	$scope.compData.JS.popuptopbannertitle.JS.isShow=false;                            	
                            }
                        } else {
                             $scope.revData.name = '';
                             $scope.revData.desc = '';
                             $scope.revData.url = '';
                             $scope.revData.image = '';
                             $scope.revData.linktype='';
                             $element.css({
                                 'display': 'none'
                             });
                        }
                        if($scope.compData.JS.position.top){
                        	$scope.compData.JS["popuptopbannerbg"].CSS.top=0;
                        }else{
                        	$scope.compData.JS["popuptopbannerbg"].CSS.bottom=0;                     	
                        }
                    }
                    var time = $scope.compData.JS.closetime;
                    if (top.tlbs.messageid != "") {
                        $timeout(function() {
                            if ($element.css('display') != 'none') {
                                top.tlbs.notificationCdrData = null;
                            }
                            $scope.hide();
                        }, time);
                    }
                };
                $scope.hide = function() {
                    $element.css({
                        'display': 'none'
                    });
                };       
                var _touchstart = Const.touchEvent.start,
                    _touchend = Const.touchEvent.end,
                container = angular.element($element[0].querySelector('.c60_popuptopbannerclose'));

	            container.bind(_touchend, function(e) {
	                e.stopPropagation();
	                e.preventDefault();
	                if (coreUtils.cdrUtils.canWriteUITracingCDR($scope.compData.JS.popuptopbannerclose.JS.cdrConfig)) {
	                    $scope.compData.JS['cdrData'] = {};
	                    $scope.compData.JS.cdrData = {
	                        'pageId': $scope.pageID,
	                        'componentId': coreUtils.createCdrid($scope.pageID, '', 'popuptopbannerclose')
	                    };
	                    coreUtils.cdrService($scope.compData.JS.popuptopbannerclose.JS.cdrConfig.uitracingcdr, $scope.compData.JS.cdrData);
	                }
	                top.tlbs.notificationCdrData = null;
		                top.document.getElementsByTagName('body')[0].style["pointer-events"]="none";
		                container.css({"pointer-events":"auto"});
		                $timeout(function() {
		                	top.document.getElementsByTagName('body')[0].style["pointer-events"]="";
		                	top.document.getElementsByTagName('body')[0].removeAttribute["pointer-events"];
		                }, 500);
	                $element.css({
	                    'display': 'none'
	                });
	            }); 
	            $scope.bannerimgclick=function(){	 
		                if (coreUtils.cdrUtils.canWriteUITracingCDR($scope.compData.JS.popuptopbannerimg.JS.cdrConfig)) {
		                    $scope.compData.JS['cdrData'] = {};
		                    $scope.compData.JS.cdrData = {
		                        'pageId': $scope.pageID,
		                        'componentId': coreUtils.createCdrid($scope.pageID, '', 'popuptopbannerimg')
		                    };
		                    coreUtils.cdrService($scope.compData.JS.popuptopbannerimg.JS.cdrConfig.uitracingcdr, $scope.compData.JS.cdrData);
		                }
		                top.tlbs.notificationCdrData = null;
		                coreService.fireEvent($element.attr('cid'), 'gotoPage', {
	                        "linktype": $scope.revData.linktype,
	                        "url": $scope.revData.url,
	                        "title":$scope.compData.JS.popuptopbannerimg.JS.title
	                    });
		                $element.css({
		                    'display': 'none'
		                });
		            
	            } 
	            
                $scope.init = function() {
                    coreService.registerComponentInstance($element.attr('cid'), $scope);
                    var properties = coreService.getInitProperties($attrs['cid']) || {};
                    $scope.compData = coreUtils.extendDeep($scope.compData, properties);
                    $element.css($scope.compData.css || {});
                    coreService.fireEvent($element.attr('cid'), 'init');
                };
                $scope.$on($attrs['cid'] + '_handleEvent', function(event, cevent, args, deferred) {
                    if ($scope.eventMap[cevent]) {
                        $scope.eventMap[cevent](args);
                        if (null != deferred) {
                            deferred.resolve();
                        }
                    }
                });
                $scope.eventMap['update'] = $scope.updateData;
            }
        ],
        link: function($scope, $element, $attrs, ctl) {
            $scope.pageID = ctl.pageID;
            $scope.componentType = 'page';
            $scope.init();
        }
    }
}]);
uiCore.directive("iappsearch",[function(){return{restrict:"AE",replace:true,require:"^pid",template:'<div><div class="c60_fbar_search"><div class="c60_fbar_search_box"><form class="c60_fbar_search_innerbox"><div class="c60_fbar_search_text"><input id="searchinput" type="text" name="fname" ng-model="searchkeys" class="c60_fbar_search_input1" placeholder="{{compData.JS.placeholder}}"/></div><div class="c60_fbar_search_submit"><input type="submit" ccid="c60_fbar_search_submit" class="c60_fbar_search_input2" ng-click="submit()"/></div></form></div></div></div>',scope:{},controller:["$scope","$element","$attrs","coreService","coreUtils","Const",function(d,c,b,e,a,f){d.cid=b.cid;d.compData={};d.eventMap={};d.changeStyle=function(){};d.init=function(){e.registerComponentInstance(c.attr("cid"),d);var g=e.getInitProperties(b.cid)||{};d.compData=a.extendDeep(d.compData||{},g);angular.element(c[0].querySelector(".c60_fbar_search")).css(d.compData.CSS||{});e.fireEvent(c.attr("cid"),"init")};d.searchkeys="";d.queryWoChain=function(g){if(g&&g.respparam){d.queryWoChain1=g.respparam.session}};d.submit=function(){var h=d.compData.JS.searchurl.iframeurl;if(d.queryWoChain1){if(d.queryWoChain1.auth==null||d.queryWoChain1.auth==undefined){d.queryWoChain1.auth=""}if(d.queryWoChain1.jsessionid==null||d.queryWoChain1.jsessionid==undefined){d.queryWoChain1.jsessionid=""}h=h.replace("{jsessionid}",d.queryWoChain1.jsessionid);h=h.replace("{auth}",d.queryWoChain1.auth)}else{h=h.replace("{jsessionid}","");h=h.replace("{auth}","")}if(d.compData.JS.encodeflag!="0"){var i=function(k,j,l){h=h.replace("{searchkeys}",(k.respparam.appsearch||{}).encodedstr||"");e.fireEvent(d.cid,"urltranslate",{url:h})};var g=function(){h=h.replace("{searchkeys}","");e.fireEvent(d.cid,"urltranslate",{url:h})};a.sendRequest(d.compData.JS.encodeservcie||"encodeservice",{str:encodeURI(d.searchkeys),encodetype:d.compData.JS.encodetype||"DES"},i,g)}else{h=h.replace("{searchkeys}",d.searchkeys);e.fireEvent(d.cid,"urltranslate",{url:h})}a.recordTracingCdr(d.pageID,b.cid+"_sub",d.compData.JS.c60_fbar_search_submit.JS.cdrConfig)};d.hide=function(){d.compData.CSS.display="none";c.css(d.compData.CSS)};d.show=function(){d.compData.CSS.display="block";c.css(d.compData.CSS)};d.eventMap.querywo1=d.queryWoChain;d.eventMap.hide=d.hide;d.eventMap.show=d.show;d.$on(b.cid+"_handleEvent",function(i,j,h,g){if(d.eventMap[j]){d.eventMap[j](h);if(null!=g){g.resolve()}}})}],link:function(d,b,a,c){d.pageID=c.pageID;d.componentType="iappsearch";d.init()}}}]);
uiCore.directive("my",function(){return{restrict:"EA",replace:true,require:"^pid",template:'<div><div class="c60_fbar_mine_result_waiting"><div class="c60_fbar_datouwang8"><div class="c60_fbar_datouwang8-container c60_fbar_container1"><div class="c60_fbar_circle1 c60_fbar_container_div"></div><div class="c60_fbar_circle2 c60_fbar_container1_circle2 c60_fbar_container_div"></div><div class="c60_fbar_circle3 c60_fbar_container1_circle3 c60_fbar_container_div"></div><div class="c60_fbar_circle4 c60_fbar_container1_circle4 c60_fbar_container_div"></div></div><div class="c60_fbar_datouwang8-container c60_fbar_container2"><div class="c60_fbar_circle1 c60_fbar_container2_circle1 c60_fbar_container_div"></div><div class="c60_fbar_circle2 c60_fbar_container2_circle2 c60_fbar_container_div"></div><div class="c60_fbar_circle3 c60_fbar_container2_circle3 c60_fbar_container_div"></div><div class="c60_fbar_circle4 c60_fbar_container2_circle4 c60_fbar_container_div"></div></div><div class="c60_fbar_datouwang8-container c60_fbar_container3"><div class="c60_fbar_circle1 c60_fbar_container3_circle1 c60_fbar_container_div"></div><div class="c60_fbar_circle2 c60_fbar_container3_circle2 c60_fbar_container_div"></div><div class="c60_fbar_circle3 c60_fbar_container3_circle3 c60_fbar_container_div"></div><div class="c60_fbar_circle4 c60_fbar_container3_circle4 c60_fbar_container_div"></div></div></div><div class="c60_fbar_tips_txt_loading ng-binding" ng-bind="compData.JS.loadingtext.JS.textdata">爱我，别走~~</div></div><div class="c60_fbar_mine_result" ><div><div class="c60_fbar_mine_result_con" ><div class="c60_fbar_mine_result_con_img"><span class="c60_fbar_mine_result_con_img_span" ng-show="compData.JS.c60_fbar_mine_result.JS.isShow"   ng-style="getStyle(\'c60_fbar_mine_result\')"></span></div><div class="c60_fbar_mine_result_title " ng-show="compData.JS.c60_fbar_mine_result.JS.isShow" ng-bind="compData.JS.c60_fbar_mine_result.JS.title"></div><div class="c60_fbar_mine_result_btn" ><a class="c60_fbar_my_result_link_btn" ng-show="compData.JS.c60_fbar_my_result_link_btn.JS.isShow" ng-click="click(\'c60_fbar_my_result_link_btn\');$event.stopPropagation();" ng-bind="compData.JS.c60_fbar_my_result_link_btn.JS.text"  ng-style="getStyle(\'c60_fbar_my_result_link_btn\')"></a></div></div></div></div><div class="c60_fbar_mine_tips" ng-style="getStyle(\'c60_fbar_mine_tips\')"><div class="c60_fbar_mine_tipstext" ng-style="getStyle(\'c60_fbar_mine_tipstext\')" ng-bind="compData.JS.c60_fbar_mine_tipstext.JS.waitmessage"></div></div><div class="c60_fbar_mine_pop_block"></div>   <div class="c60_fbar_memberday_pop">    <div class="c60_fbar_memberday_pop_top">      <div class="c60_fbar_memberday_pop_tit">         <span class="c60_fbar_memberday_pop_tit_txt" ng-bind="compData.JS.c60_fbar_my_head_member_tips.JS.title"></span>         <span class="c60_fbar_memberday_pop_tit_close"  ccid="c60_fbar_my_tips_closebtn" ng-click="click(\'c60_fbar_my_tips_closebtn\');$event.stopPropagation();" ng-style="getStyle(\'c60_fbar_my_tips_closebtn\')"></span>     </div>     </div>     <div class="c60_fbar_memberday_pop_bottom">       <div class="c60_fbar_memberday_pop_bottom_txt" ng-bind-html="to_trusted(compData.JS.c60_fbar_my_head_member_tips.JS.text)"></div>     </div>   </div>	   <div class="c60_fbar_qiandao_pop">      <div class=" c60_fbar_qiandao_pop_top">        <div class="c60_fbar_qiandao_pop_tit">           <span class="c60_fbar_qiandao_pop_tit_txt" ng-bind="compData.JS.c60_fbar_my_head_attend_tips.JS.title"></span>           <span class="c60_fbar_qiandao_pop_tit_close" ccid="c60_fbar_my_tips_closebtn" ng-click="click(\'c60_fbar_my_tips_closebtn\');$event.stopPropagation();"  ng-style="getStyle(\'c60_fbar_my_tips_closebtn\')"></span>       </div>     </div>     <div class="c60_fbar_qiandao_pop_bottom" ng-show="signResultFlag==0">       <div class="c60_fbar_qiandao_pop_bottom_txt" ng-show="vaIncreasedFlag==0"><i ng-bind="compData.JS.c60_fbar_my_head_attend_tips.JS.resultmessage.successmessagebegin"></i><span ng-bind="revData.respparam.vaIncreased"></span><i ng-bind="compData.JS.c60_fbar_my_head_attend_tips.JS.unit"></i></div>       <div class="c60_fbar_qiandao_pop_bottom_txt" ng-show="vaIncreasedFlag==0" ng-bind="compData.JS.c60_fbar_my_head_attend_tips.JS.resultmessage.successmessageend"></div><div class="c60_fbar_qiandao_pop_bottom_txt" ng-show="vaIncreasedFlag==1" ng-bind="compData.JS.c60_fbar_my_head_attend_tips.JS.resultmessage.successmessage"></div>       <div class="c60_fbar_qiandao_pop_bottom_btn" ng-show="compData.JS.c60_fbar_my_tips_successbtn.JS.isShow" ng-bind="compData.JS.c60_fbar_my_tips_successbtn.JS.text"  ccid="c60_fbar_my_tips_successbtn" ng-click="click(\'c60_fbar_my_tips_successbtn\');$event.stopPropagation();"  ng-style="getStyle(\'c60_fbar_my_head_attend_tips_textbtn\')"></div>     </div>     <div class="c60_fbar_qiandao_pop_bottom" ng-show="signResultFlag==1">       <div class="c60_fbar_qiandao_pop_bottom_txt c60_fbar_qiandao_pop_bottom_txt2" ng-bind-html="to_trusted(compData.JS.c60_fbar_my_head_attend_tips.JS.resultmessage.failuremessage1)" ></div>       <div class="c60_fbar_qiandao_pop_bottom_btn" ng-show="compData.JS.c60_fbar_my_tips_failurebtn.JS.isShow" ng-bind="compData.JS.c60_fbar_my_tips_failurebtn.JS.text" ng-click="click(\'c60_fbar_my_tips_failurebtn\');$event.stopPropagation();"  ng-style="getStyle(\'c60_fbar_my_head_attend_tips_textbtn\')"></div>     </div>     <div class="c60_fbar_qiandao_pop_bottom" ng-show="signResultFlag==2">       <div class="c60_fbar_qiandao_pop_bottom_txt c60_fbar_qiandao_pop_bottom_txt2"  ng-bind-html="to_trusted(compData.JS.c60_fbar_my_head_attend_tips.JS.resultmessage.failuremessage2)" ></div>       <div class="c60_fbar_qiandao_pop_bottom_btn" ccid="c60_fbar_my_tips_failurebtn" ng-click="click(\'c60_fbar_my_tips_failurebtn\');$event.stopPropagation();"  ng-bind="compData.JS.c60_fbar_my_tips_failurebtn.JS.text"  ng-style="getStyle(\'c60_fbar_my_head_attend_tips_textbtn\')"></div>     </div>   </div>   <div class="c60_fbar_qiandao_rule_pop">     <div class="c60_fbar_qiandao_rule_pop_top">       <div class="c60_fbar_qiandao_rule_pop_tit">         <span class="c60_fbar_qiandao_rule_pop_tit_txt"  ng-bind="compData.JS.c60_fbar_my_head_rule_tips.JS.title" ></span>         <span class="c60_fbar_qiandao_rule_pop_tit_close" ccid="c60_fbar_my_tips_closebtn" ng-click="click(\'c60_fbar_my_tips_closebtn\');$event.stopPropagation();"  ng-style="getStyle(\'c60_fbar_my_tips_closebtn\')"></span>       </div>    </div>    <div class="c60_fbar_qiandao_rule_pop_bottom">        <div class="c60_fbar_qiandao_rule_pop_bottom_txt" ng-bind-html="to_trusted(compData.JS.c60_fbar_my_head_rule_tips.JS.listdesc1)"></div>        <div class="c60_fbar_qiandao_rule_pop_bottom_txt" ng-bind-html="to_trusted(compData.JS.c60_fbar_my_head_rule_tips.JS.listdesc2)"></div>        <div class="c60_fbar_qiandao_rule_pop_bottom_txt" ng-bind-html="to_trusted(compData.JS.c60_fbar_my_head_rule_tips.JS.listdesc3)"></div>        <div class="c60_fbar_qiandao_rule_pop_bottom_linktxt"><i ng-bind="compData.JS.c60_fbar_my_head_rule_tips.JS.textbegin"></i><a class="c60_fbar_qiandao_rule_pop_bottom_orangelinktxt"  ng-style="getStyle(\'c60_fbar_my_rule_textbtn\')" ccid="c60_fbar_my_rule_textbtn" ng-click="click(\'c60_fbar_my_rule_textbtn\');$event.stopPropagation();"  ng-bind="compData.JS.c60_fbar_my_rule_textbtn.JS.text"></a><i ng-bind="compData.JS.c60_fbar_my_head_rule_tips.JS.textend"></i></div>    </div>   </div><div class="c60_fbar_my_con" ><div class="c60_fbar_my_conscroll" simplescroll>   <div class="c60_fbar_my_top clearfloat" >    <div class="c60_fbar_my_img_txt">     <span class="c60_fbar_my_head_ico" ng-style="getStyle(\'c60_fbar_my_head_ico\')" ng-show="compData.JS.c60_fbar_my_head_ico.JS.isShow"></span>     <div class="c60_fbar_my_txt" >      <p class="c60_fbar_moblie" ng-bind-html="to_trusted(phoneFilter(revData.respparam.msisdn))"></p>     <div class="c60_fbar_my_level">     <span class="c60_fbar_my_degree" ng-show="compData.JS.c60_fbar_my_head_degree.JS.isShow" ng-style="getStyle(\'c60_fbar_my_head_degree\')"><i class="c60_fbar_degreeunit" ng-bind="compData.JS.c60_fbar_my_head_degree.JS.text"></i> <i class="c60_fbar_degreenumber" ng-bind="revData.respparam.level"></i></span>     <span class="c60_fbar_my_member" ng-show="compData.JS.c60_fbar_my_head_member.JS.isShow" ng-style="getStyle(\'c60_fbar_my_head_member\')"  ccid="c60_fbar_my_head_member"  ng-click="click(\'c60_fbar_my_head_member\');$event.stopPropagation();" ><i ng-bind="compData.JS.c60_fbar_my_head_member.JS.text"></i><i class="c60_fbar_my_head_member_redpoint" ng-show="RedPointFlag==true"></i></span>     </div>     </div>    </div>    <div class="c60_fbar_attend_btn" >    <span class="c60_fbar_attend_rule" ng-show="compData.JS.c60_fbar_my_head_rule.JS.isShow" ng-style="getStyle(\'c60_fbar_my_head_rule\')" ng-bind="compData.JS.c60_fbar_my_head_rule.JS.text"  ccid="c60_fbar_my_head_rule"  ng-click="click(\'c60_fbar_my_head_rule\');$event.stopPropagation();"></span>     <a class="c60_fbar_attend_btn_link" ng-style="getattend_btn_linkStyle()" ng-bind="c60_fbar_attend_btn_text" ccid="c60_fbar_my_attend_btn" ng-click="click(\'c60_fbar_attend_btn\');$event.stopPropagation();"  ng-show="compData.JS.c60_fbar_attend_btn_link.JS.isShow"></a>    </div>   </div>   <div class="c60_fbar_my_list_con" ><div class="c60_fbar_my_list c60_fbar_my_list_coin" ccid="c60_fbar_my_list_coin" ng-click="click(\'c60_fbar_my_list_coin\');$event.stopPropagation();" ng-show="compData.JS.c60_fbar_my_list_coin.JS.isShow">    <div class="c60_fbar_my_list_detail clearfloat">    <div class="c60_fbar_cointitle">    <span class="c60_fbar_mylist c60_fbar_my_list_coin" ng-style="getStyle(\'c60_fbar_my_list_coin\')" ng-bind="compData.JS.c60_fbar_my_list_coin.JS.text" ></span><span class="c60_fbar_my_list_coin_num " ng-style="getStyle(\'c60_fbar_my_list_coin_num\')" ng-show="compData.JS.c60_fbar_my_list_coin_num.JS.isShow"  ng-bind-html="to_trusted(unitFilter(revData.respparam.coin,\'mycoin\'))"></span>    </div>    <div class="c60_fbar_arrow_jump">       <span class="c60_fbar_arrow_jump_text" ng-show="compData.JS.c60_fbar_my_list_coin.JS.c60_fbar_arrow_jump_text.JS.isShow" ng-bind="compData.JS.c60_fbar_my_list_coin.JS.c60_fbar_arrow_jump_text.JS.text"></span>       <span class="c60_fbar_arrow_jump_ico" ng-style="getJumpStyle(\'c60_fbar_my_list_coin\')" ></span>    </div>     </div>    </div>   <div class="c60_fbar_my_border_w" ng-show="(compData.JS.c60_fbar_my_list_coin.JS.isShow&&compData.JS.c60_fbar_my_list_red.JS.isShow) || (compData.JS.c60_fbar_my_list_coin.JS.isShow&&compData.JS.c60_fbar_my_list_red.JS.isShow) || (compData.JS.c60_fbar_my_list_coin.JS.isShow&&compData.JS.c60_fbar_my_list_discount.JS.isShow) || (compData.JS.c60_fbar_my_list_coin.JS.isShow&&compData.JS.c60_fbar_my_list_privilege.JS.isShow)"><div class="c60_fbar_my_border"></div></div> <div class="c60_fbar_my_list c60_fbar_my_list_wealth"  ccid="c60_fbar_my_list_wealth" ng-click="click(\'c60_fbar_my_list_wealth\');$event.stopPropagation();" ng-show="compData.JS.c60_fbar_my_list_wealth.JS.isShow">     <div class="c60_fbar_my_list_detail clearfloat" >      <div class="c60_fbar_cointitle" >       <span class="c60_fbar_mylist c60_fbar_my_list_wealth" ng-style="getStyle(\'c60_fbar_my_list_wealth\')" ng-bind="compData.JS.c60_fbar_my_list_wealth.JS.text"></span>      </div>      <div class="c60_fbar_arrow_jump">       <span class="c60_fbar_arrow_jump_text" ng-show="compData.JS.c60_fbar_my_list_wealth.JS.c60_fbar_arrow_jump_text.JS.isShow" ng-bind="compData.JS.c60_fbar_my_list_wealth.JS.c60_fbar_arrow_jump_text.JS.text"></span>       <span class="c60_fbar_arrow_jump_ico" ng-style="getJumpStyle(\'c60_fbar_my_list_wealth\')"></span>      </div>     </div>    </div>    <div class="c60_fbar_my_border_w" ng-show="(compData.JS.c60_fbar_my_list_wealth.JS.isShow&&compData.JS.c60_fbar_my_list_red.JS.isShow) || (compData.JS.c60_fbar_my_list_wealth.JS.isShow&&compData.JS.c60_fbar_my_list_discount.JS.isShow) || (compData.JS.c60_fbar_my_list_wealth.JS.isShow&&compData.JS.c60_fbar_my_list_privilege.JS.isShow)"><div class="c60_fbar_my_border"></div></div>    <div class="c60_fbar_my_list_second" ng-show="showFlag==\'c60_fbar_my_list_wealth\'">        <div class="c60_fbar_ml_second_con c60_fbar_my_bt_d8d8d8 c60_fbar_clearfloat" ng-show="compData.JS.c60_fbar_my_flowcurrency.JS.isShow">           <div class="c60_fbar_ml_second_con_left"  ng-bind-html="to_trusted(unitFilter(revData.respparam.coin,\'coin\'))"></div>           <div class="c60_fbar_ml_second_con_right"><span class="c60_fbar_ml_sc_right_btn" ccid="c60_fbar_my_flowcurrency" ng-click="click(\'c60_fbar_my_flowcurrency\');$event.stopPropagation();" ng-style="getStyle(\'c60_fbar_my_list_subitem_btn_link\')"  ng-bind="compData.JS.c60_fbar_my_flowcurrency.JS.c60_fbar_arrow_jump_text.JS.text"></span></div>        </div>         <div class="c60_fbar_my_border_w c60_fbar_my_border_w2"  ng-show="compData.JS.c60_fbar_my_luckdraw.JS.isShow"><div class="c60_fbar_my_border"></div></div>        <div class="c60_fbar_ml_second_con c60_fbar_clearfloat"  ng-show="compData.JS.c60_fbar_my_luckdraw.JS.isShow">           <div class="c60_fbar_ml_second_con_left" ng-bind-html="to_trusted(unitFilter(revData.respparam.wodou,\'wodou\'))" ></div>           <div class="c60_fbar_ml_second_con_right"><span class="c60_fbar_ml_sc_right_btn" ccid="c60_fbar_my_luckdraw" ng-click="click(\'c60_fbar_my_luckdraw\');$event.stopPropagation();" ng-style="getStyle(\'c60_fbar_my_list_subitem_btn_link\')" ng-bind="compData.JS.c60_fbar_my_luckdraw.JS.c60_fbar_arrow_jump_text.JS.text"></span></div>       </div>    </div>    <div class="c60_fbar_my_border_w" ng-show="showFlag==\'c60_fbar_my_list_wealth\'"><div class="c60_fbar_my_border"></div></div>    <div class="c60_fbar_my_list c60_fbar_my_list_red"  ccid="c60_fbar_my_list_red" ng-click="click(\'c60_fbar_my_list_red\');$event.stopPropagation();" ng-show="compData.JS.c60_fbar_my_list_red.JS.isShow">     <div class="c60_fbar_my_list_detail clearfloat" >      <div class="c60_fbar_cointitle" >       <span class="c60_fbar_mylist c60_fbar_my_list_red" ng-style="getStyle(\'c60_fbar_my_list_red\')" ng-bind="compData.JS.c60_fbar_my_list_red.JS.text"></span>      </div>      <div class="c60_fbar_arrow_jump">       <span class="c60_fbar_arrow_jump_text" ng-show="compData.JS.c60_fbar_my_list_red.JS.c60_fbar_arrow_jump_text.JS.isShow" ng-bind="compData.JS.c60_fbar_my_list_red.JS.c60_fbar_arrow_jump_text.JS.text"></span>       <span class="c60_fbar_arrow_jump_ico" ng-style="getJumpStyle(\'c60_fbar_my_list_red\')"></span>      </div>     </div>    </div>    <div class="c60_fbar_my_border_w" ng-show="(compData.JS.c60_fbar_my_list_red.JS.isShow&&compData.JS.c60_fbar_my_list_discount.JS.isShow) || (compData.JS.c60_fbar_my_list_red.JS.isShow&&compData.JS.c60_fbar_my_list_privilege.JS.isShow)"><div class="c60_fbar_my_border"></div></div>    <div class="c60_fbar_my_list_second" ng-show="showFlag==\'c60_fbar_my_list_red\'">        <div class="c60_fbar_ml_second_con c60_fbar_my_bt_d8d8d8 c60_fbar_clearfloat" ng-show="compData.JS.c60_fbar_my_list_red_openred.JS.isShow">           <div class="c60_fbar_ml_second_con_left"  ng-bind="compData.JS.c60_fbar_my_list_red_openred.JS.text"></div>           <div class="c60_fbar_ml_second_con_right"><span class="c60_fbar_ml_sc_right_btn" ccid="c60_fbar_my_list_red_openred" ng-click="click(\'c60_fbar_my_list_red_openred\');$event.stopPropagation();" ng-style="getStyle(\'c60_fbar_my_list_subitem_btn_link\')"  ng-bind="compData.JS.c60_fbar_my_list_red_openred.JS.c60_fbar_arrow_jump_text.JS.text"></span></div>        </div>         <div class="c60_fbar_my_border_w c60_fbar_my_border_w2"  ng-show="compData.JS.c60_fbar_my_list_red_hairred.JS.isShow"><div class="c60_fbar_my_border"></div></div>        <div class="c60_fbar_ml_second_con c60_fbar_clearfloat"  ng-show="compData.JS.c60_fbar_my_list_red_hairred.JS.isShow">           <div class="c60_fbar_ml_second_con_left" ng-bind="compData.JS.c60_fbar_my_list_red_hairred.JS.text" ></div>           <div class="c60_fbar_ml_second_con_right"><span class="c60_fbar_ml_sc_right_btn" ccid="c60_fbar_my_list_red_hairred" ng-click="click(\'c60_fbar_my_list_red_hairred\');$event.stopPropagation();" ng-style="getStyle(\'c60_fbar_my_list_subitem_btn_link\')" ng-bind="compData.JS.c60_fbar_my_list_red_hairred.JS.c60_fbar_arrow_jump_text.JS.text"></span></div>       </div>    </div>    <div class="c60_fbar_my_border_w" ng-show="showFlag==\'c60_fbar_my_list_red\'"><div class="c60_fbar_my_border"></div></div>    <div class="c60_fbar_my_list c60_fbar_my_list_discount" ccid="c60_fbar_my_list_discount" ng-click="click(\'c60_fbar_my_list_discount\');$event.stopPropagation();" ng-show="compData.JS.c60_fbar_my_list_discount.JS.isShow">     <div class="c60_fbar_my_list_detail clearfloat">      <div class="c60_fbar_cointitle" >       <span class="c60_fbar_mylist c60_fbar_my_list_discount" ng-style="getStyle(\'c60_fbar_my_list_discount\')" ng-bind="compData.JS.c60_fbar_my_list_discount.JS.text"></span>      </div>      <div class="c60_fbar_arrow_jump">       <span class="c60_fbar_arrow_jump_text" ng-show="compData.JS.c60_fbar_my_list_discount.JS.c60_fbar_arrow_jump_text.JS.isShow" ng-bind="compData.JS.c60_fbar_my_list_discount.JS.c60_fbar_arrow_jump_text.JS.text"></span>       <span class="c60_fbar_arrow_jump_ico" ng-style="getJumpStyle(\'c60_fbar_my_list_discount\')"></span>      </div>     </div>    </div>    <div class="c60_fbar_my_border_w" ng-show="showFlag==\'c60_fbar_my_list_discount\'"><div class="c60_fbar_my_border"></div></div>    <div class="c60_fbar_my_list_second" ng-show="showFlag==\'c60_fbar_my_list_discount\'">        <div class="c60_fbar_ml_second_con c60_fbar_my_bt_d8d8d8 c60_fbar_clearfloat" ng-show="compData.JS.c60_fbar_my_latestactivity.JS.isShow">           <div class="c60_fbar_ml_second_con_left"  ng-bind="compData.JS.c60_fbar_my_latestactivity.JS.text"></div>            <div class="c60_fbar_ml_second_con_middle"><div class="c60_fbar_ml_mysale_guaguaka" ng-style="getStyle(\'c60_fbar_my_latestactivity\')" >&nbsp;</div></div>            <div class="c60_fbar_ml_second_con_right"><span class="c60_fbar_ml_sc_right_btn" ccid="c60_fbar_my_latestactivity" ng-click="click(\'c60_fbar_my_latestactivity\');$event.stopPropagation();" ng-style="getStyle(\'c60_fbar_my_list_subitem_btn_link\')"  ng-bind="compData.JS.c60_fbar_my_latestactivity.JS.c60_fbar_arrow_jump_text.JS.text"></span></div>        </div>         <div class="c60_fbar_my_border_w c60_fbar_my_border_w2"  ng-show="compData.JS.c60_fbar_my_preferences.JS.isShow"><div class="c60_fbar_my_border"></div></div>        <div class="c60_fbar_ml_second_con c60_fbar_clearfloat"  ng-show="compData.JS.c60_fbar_my_preferences.JS.isShow">           <div class="c60_fbar_ml_second_con_left" ng-bind="compData.JS.c60_fbar_my_preferences.JS.text" ></div>           <div class="c60_fbar_ml_second_con_right"><span class="c60_fbar_ml_sc_right_btn" ccid="c60_fbar_my_preferences" ng-click="click(\'c60_fbar_my_preferences\');$event.stopPropagation();" ng-style="getStyle(\'c60_fbar_my_list_subitem_btn_link\')" ng-bind="compData.JS.c60_fbar_my_preferences.JS.c60_fbar_arrow_jump_text.JS.text"></span></div></div></div><div class="c60_fbar_my_border_w" ng-show="compData.JS.c60_fbar_my_list_discount.JS.isShow&&compData.JS.c60_fbar_my_list_privilege.JS.isShow"><div class="c60_fbar_my_border"></div></div>   <div class="c60_fbar_my_list c60_fbar_my_list_privilege" ccid="c60_fbar_my_list_privilege" ng-click="click(\'c60_fbar_my_list_privilege\');$event.stopPropagation();" ng-show="compData.JS.c60_fbar_my_list_privilege.JS.isShow">    <div class="c60_fbar_my_list_detail clearfloat">    <div class="c60_fbar_cointitle">    <span class="c60_fbar_mylist c60_fbar_my_list_privilege" ng-style="getStyle(\'c60_fbar_my_list_privilege\')" ng-bind="compData.JS.c60_fbar_my_list_privilege.JS.text" ></span>    </div>    <div class="c60_fbar_arrow_jump">       <span class="c60_fbar_arrow_jump_text" ng-show="compData.JS.c60_fbar_my_list_privilege.JS.c60_fbar_arrow_jump_text.JS.isShow" ng-bind="compData.JS.c60_fbar_my_list_privilege.JS.c60_fbar_arrow_jump_text.JS.text"></span>       <span class="c60_fbar_arrow_jump_ico" ng-style="getJumpStyle(\'c60_fbar_my_list_privilege\')" ></span>    </div>     </div>    </div></div>   <div class="c60_fbar_my_list_con" ng-show="compData.JS.c60_fbar_my_list_growup.JS.isShow || compData.JS.c60_fbar_my_list_task.JS.isShow"><div class="c60_fbar_my_list c60_fbar_my_list_growup" ccid="c60_fbar_my_list_growup" ng-click="click(\'c60_fbar_my_list_growup\');$event.stopPropagation();"  ng-show="compData.JS.c60_fbar_my_list_growup.JS.isShow">     <div class="c60_fbar_my_list_detail clearfloat " >      <div class="c60_fbar_cointitle" >       <span class="c60_fbar_mylist c60_fbar_my_list_growup" ng-style="getStyle(\'c60_fbar_my_list_growup\')" ng-bind="compData.JS.c60_fbar_my_list_growup.JS.text"></span>      </div>      <div class="c60_fbar_arrow_jump">       <span class="c60_fbar_arrow_jump_text" ng-show="compData.JS.c60_fbar_my_list_growup.JS.c60_fbar_arrow_jump_text.JS.isShow" ng-bind="compData.JS.c60_fbar_my_list_growup.JS.c60_fbar_arrow_jump_text.JS.text"></span>       <span class="c60_fbar_arrow_jump_ico" ng-style="getJumpStyle(\'c60_fbar_my_list_growup\')"></span>      </div>     </div>    </div>    <div class="c60_fbar_my_border_w"  ng-show="compData.JS.c60_fbar_my_list_task.JS.isShow"><div class="c60_fbar_my_border" ng-show="compData.JS.c60_fbar_my_list_task.JS.isShow"></div></div>    <div class="c60_fbar_my_list c60_fbar_my_list_task" ccid="c60_fbar_my_list_task" ng-click="click(\'c60_fbar_my_list_task\');$event.stopPropagation();"  ng-show="compData.JS.c60_fbar_my_list_task.JS.isShow">     <div class="c60_fbar_my_list_detail clearfloat" >      <div class="c60_fbar_cointitle" >       <span class="c60_fbar_mylist c60_fbar_my_list_task" ng-style="getStyle(\'c60_fbar_my_list_task\')" ng-bind="compData.JS.c60_fbar_my_list_task.JS.text"></span>      </div>      <div class="c60_fbar_arrow_jump">       <span class="c60_fbar_arrow_jump_text" ng-show="compData.JS.c60_fbar_my_list_task.JS.c60_fbar_arrow_jump_text.JS.isShow" ng-bind="compData.JS.c60_fbar_my_list_task.JS.c60_fbar_arrow_jump_text.JS.text"></span>       <span class="c60_fbar_arrow_jump_ico" ng-style="getJumpStyle(\'c60_fbar_my_list_task\')"></span>      </div>     </div>    </div>   </div>   <div class="c60_fbar_my_list_con " >    <div class="c60_fbar_my_list c60_fbar_my_list_set"  ccid="c60_fbar_my_list_set" ng-click="click(\'c60_fbar_my_list_set\');$event.stopPropagation();"   ng-show="compData.JS.c60_fbar_my_list_set.JS.isShow">     <div class="c60_fbar_my_list_detail clearfloat" >      <div class="c60_fbar_cointitle">       <span class="c60_fbar_mylist c60_fbar_my_list_set" ng-style="getStyle(\'c60_fbar_my_list_set\')" ng-bind="compData.JS.c60_fbar_my_list_set.JS.text"></span>      </div>      <div class="c60_fbar_arrow_jump">       <span class="c60_fbar_arrow_jump_text" ng-show="compData.JS.c60_fbar_my_list_set.JS.c60_fbar_arrow_jump_text.JS.isShow" ng-bind="compData.JS.c60_fbar_my_list_set.JS.c60_fbar_arrow_jump_text.JS.text"></span>       <span class="c60_fbar_arrow_jump_ico" ng-style="getJumpStyle(\'c60_fbar_my_list_set\')"></span>      </div>     </div>    </div>   </div>   <div class="c60_fbar_my_add_btn" ng-style="getStyle(\'c60_fbar_my_add_desktop\')" ng-show="compData.JS.c60_fbar_my_add_desktop.JS.isShow" ccid="c60_fbar_my_add_desktop" ng-click="click(\'c60_fbar_my_add_desktop\');$event.stopPropagation();"><span class="c60_fbar_my_add_btn_ico" ng-bind="compData.JS.c60_fbar_my_add_desktop_text.JS.text" ng-style="getStyle(\'c60_fbar_my_add_desktop_text\')"></span></div>   </div></div></div>',scope:{},controller:["$scope","$element","$attrs","$timeout","coreService","coreUtils","Const",function(d,c,b,f,g,a,h){d.cid=b.cid;d.eventMap={};d.compData={CSS:{},JS:{}};d.to_trusted=function(i){return a.getTrustedHtml(i)};d.memberInfoFlag=false;d.c60_fbar_attend_btn_text="";d.c60_fbar_attend_btn_style="";d.RedPointFlag=false;d.signResultFlag=-1;d.showFlag="";d.vaIncreasedFlag=-1;d.time="";d.getattend_btn_linkStyle=function(){if(d.compData.JS.c60_fbar_attend_btn_link.JS.stateconfig.state=="0"){d.c60_fbar_attend_btn_text=d.compData.JS.c60_fbar_attend_btn_link.JS.text0;d.c60_fbar_attend_btn_style=d.compData.JS.c60_fbar_attend_btn_link.JS.stateconfig.state0}else{if(d.compData.JS.c60_fbar_attend_btn_link.JS.stateconfig.state=="1"){d.c60_fbar_attend_btn_text=d.compData.JS.c60_fbar_attend_btn_link.JS.text1;d.c60_fbar_attend_btn_style=d.compData.JS.c60_fbar_attend_btn_link.JS.stateconfig.state1}else{d.c60_fbar_attend_btn_text=d.compData.JS.c60_fbar_attend_btn_link.JS.text0;d.c60_fbar_attend_btn_style={background:"#ddd",color:"#FFFFFF"}}}return d.c60_fbar_attend_btn_style};d.compData.JS.phoneconfig={prefix:"86",len:"13",maskbegin:"5",maskend:"9",commonlen:"11",commonbegin:"3",commonend:"7"};d.phoneFilter=function(m){if(m==undefined){return'<i style="visibility:hidden">&nbsp;</i>'}var l="";for(var k=parseInt(d.compData.JS.phoneconfig.maskbegin);k<parseInt(d.compData.JS.phoneconfig.maskend);k++){l=l+"*"}var j="";if(m.indexOf(d.compData.JS.phoneconfig.prefix)==0&&m.length==d.compData.JS.phoneconfig.len){j=m.substring(0,parseInt(d.compData.JS.phoneconfig.maskbegin))+l+m.substring(parseInt(d.compData.JS.phoneconfig.maskend))}else{if(m.length>=parseInt(d.compData.JS.phoneconfig.commonlen)){j=m.substring(0,parseInt(d.compData.JS.phoneconfig.commonbegin))+l+m.substring(parseInt(d.compData.JS.phoneconfig.commonend))}}return j};d.unitFilter=function(n,k){var l=0;if(n==""||n==undefined||Number(n)==0){l=0}else{l=parseInt(n).toString();if(parseInt(n)%10000==0&&parseInt(n)!==0){l=(parseInt(l)/10000)+"万"}else{var i=(parseInt(l)/10000).toString();var j=Number(d.compData.JS.tfloatcount||"2");l=(l>=10000)?a.formatNum(parseInt(l)/10000,j)+"万":l}}if(k=="coin"){num=d.compData.JS.c60_fbar_my_flowcurrency.JS.text+'<div class="c60_fbar_my_list_wealth_num">&nbsp;'+l+"&nbsp;</div>"+d.compData.JS.c60_fbar_my_flowcurrency.JS.unit}else{if(k=="wodou"){num=d.compData.JS.c60_fbar_my_luckdraw.JS.text+'<div class="c60_fbar_my_list_wealth_num">&nbsp;'+l+"&nbsp;</div>"+d.compData.JS.c60_fbar_my_luckdraw.JS.unit}else{num=l}}return num};d.getStyle=function(i){if(d.compData.JS[i]&&d.compData.JS[i].CSS){return d.compData.JS[i].CSS}};d.getJumpStyle=function(i){if(i==d.showFlag&&d.compData.JS[i].JS.linktype=="2"){return d.compData.JS.c60_fbar_arrow_jump_ico.JS.stateconfig.state1}else{return d.compData.JS.c60_fbar_arrow_jump_ico.JS.stateconfig.state0}};d.show=function(){angular.element(c[0].querySelector(".c60_fbar_mine_pop_block")).css({display:"block"});angular.element(c[0].querySelector(".c60_fbar_qiandao_pop")).css({display:"block"});if(d.signResultFlag==0||d.signResultFlag==1){d.compData.JS.c60_fbar_attend_btn_link.JS.stateconfig.state="1"}else{d.compData.JS.c60_fbar_attend_btn_link.JS.stateconfig.state="0"}d.memberInfoFlag=true};d.show2=function(){angular.element(c[0].querySelector(".c60_fbar_mine_result")).css({display:"block"})};d.hide=function(){angular.element(c[0].querySelector(".c60_fbar_mine_tips")).css({display:"none"})};d.hide3=function(){angular.element(c[0].querySelector(".c60_fbar_mine_result_waiting")).css({display:"none"})};d.extendComponentData=function(i){d.compData=a.extendDeep(d.compData,i)};d.init=function(){g.registerComponentInstance(c.attr("cid"),d);d.extendComponentData(g.getInitProperties(d.cid)||{});c.css(d.compData.css||{});g.fireEvent(c.attr("cid"),"init")};d.memberinfo=function(i){d.time=d.compData.JS.c60_fbar_mine_tips.JS.closetime;if(i&&i.respparam){if(i.respparam.level&&i.respparam.level!==""&&i.respparam.level!==undefined&&i.respparam.jsessionid&&i.respparam.jsessionid!==""&&i.respparam.jsessionid!==undefined){angular.element(c[0].querySelector(".c60_fbar_mine_result_waiting")).css({display:"none"});d.revData=i;d.revData.respparam.coin=i.respparam.data[0].coin+"";d.revData.respparam.wodou=i.respparam.data[0].wodou+"";angular.element(c[0].querySelector(".c60_fbar_mine_result")).css({display:"none"});angular.element(c[0].querySelector(".c60_fbar_my_con")).css({display:"block"});i.respparam.memberdate=i.respparam.memberdate+"";d.RedPointFlag=(i.respparam.memberdate=="1")?true:false;i.respparam.signflag=i.respparam.signflag+"";if(i.respparam.signflag=="1"){d.memberInfoFlag=true;d.c60_fbar_attend_btn_text=d.compData.JS.c60_fbar_attend_btn_link.JS.text0;d.compData.JS.c60_fbar_attend_btn_link.JS.stateconfig.state="0"}else{if(i.respparam.signflag=="0"){d.memberInfoFlag=true;d.c60_fbar_attend_btn_text=d.compData.JS.c60_fbar_attend_btn_link.JS.text1;d.compData.JS.c60_fbar_attend_btn_link.JS.stateconfig.state="1"}else{d.memberInfoFlag=false;d.c60_fbar_attend_btn_text=d.compData.JS.c60_fbar_attend_btn_link.JS.text0;d.compData.JS.c60_fbar_attend_btn_link.JS.stateconfig.state="0"}}}else{f(d.hide3,d.time);f(d.show2,d.time)}}};d.signRet=function(j){if(j&&j.respparam){d.revData.respparam.jsessionid=j.respparam.jsessionid;if(j.respparam.level!==""&&j.respparam.level&&j.respparam.level!==undefined){d.revData.respparam.level=j.respparam.level}if(j.respparam.data[0].coin!==""&&j.respparam.data[0].coin&&j.respparam.data[0].coin!==undefined){d.revData.respparam.coin=j.respparam.data[0].coin}if(j.respparam.data[0].wodou!==""&&j.respparam.data[0].wodou&&j.respparam.data[0].wodou!==undefined){d.revData.respparam.wodou=j.respparam.data[0].wodou}if(j.respparam.vaIncreased!==""&&j.respparam.vaIncreased&&j.respparam.vaIncreased!==undefined){var i=Number(d.compData.JS.vafloatcount||"0");d.revData.respparam.vaIncreased=a.formatNum(Number(j.respparam.vaIncreased),i);d.vaIncreasedFlag=0}else{d.vaIncreasedFlag=1}d.signResultFlag=0}f(d.hide,d.time);f(d.show,d.time)};d.error=function(i){if(i){if(i.errorcode=="1-140-1-027"){d.signResultFlag=1;f(d.hide,d.time);f(d.show,d.time)}else{d.signResultFlag=2;f(d.hide,d.time);f(d.show,d.time)}}};d.linkEvent=function(k,i){if(d.memberInfoFlag){if(d.compData.JS[k].JS.linktype=="0"){var j=d.compData.JS[k].JS.url;if(j.indexOf("{jsessionid}")!=-1){j=j.replace("{jsessionid}",d.revData.respparam.jsessionid)}if(j.indexOf("{auth}")!=-1){j=j.replace("{auth}",d.revData.respparam.auth)}if(j.indexOf("{msisdn}")!=-1){j=j.replace("{msisdn}",d.revData.respparam.msisdn)}g.fireEvent(d.cid,i,{url:j})}else{if(d.compData.JS[k].JS.linktype=="1"){var j=d.compData.JS[k].JS.url;if(j.indexOf("{jsessionid}")!=-1){j=j.replace("{jsessionid}",d.revData.respparam.jsessionid)}if(j.indexOf("{auth}")!=-1){j=j.replace("{auth}",d.revData.respparam.auth)}if(j.indexOf("{msisdn}")!=-1){j=j.replace("{msisdn}",d.revData.respparam.msisdn)}window.open(j)}else{d.showFlag==k?d.showFlag="":d.showFlag=k}}}else{if(d.compData.JS[k].JS.linktype=="2"){d.showFlag==k?d.showFlag="":d.showFlag=k}}};var e={c60_fbar_my_result_link_btn:function(i){if(a.cdrUtils.canWriteUITracingCDR(d.compData.JS.c60_fbar_my_result_link_btn.JS.cdrConfig)){d.compData.JS.cdrData={};d.compData.JS.cdrData={pageId:d.pageID,componentId:a.createCdrid(d.pageID,b.cid,"linkbtn")};angular.element(c[0].querySelector(".c60_fbar_mine_result")).css({display:"none"});angular.element(c[0].querySelector(".c60_fbar_mine_result_waiting")).css({display:"none"});a.cdrService(d.compData.JS.c60_fbar_my_result_link_btn.JS.cdrConfig.uitracingcdr,d.compData.JS.cdrData)}g.fireEvent(c.attr("cid"),b.event||"backclick")},c60_fbar_my_head_member:function(i){a.recordTracingCdr(d.pageID,a.createCdrid(d.pageID,b.cid,"member"),d.compData.JS.c60_fbar_my_head_member.JS.cdrConfig);if(!d.RedPointFlag){angular.element(c[0].querySelector(".c60_fbar_mine_pop_block")).css({display:"block"});angular.element(c[0].querySelector(".c60_fbar_memberday_pop")).css({display:"block"})}else{d.linkEvent("c60_fbar_my_head_member","memberclick")}},c60_fbar_my_head_rule:function(i){a.recordTracingCdr(d.pageID,a.createCdrid(d.pageID,b.cid,"rule"),d.compData.JS.c60_fbar_my_head_rule.JS.cdrConfig);angular.element(c[0].querySelector(".c60_fbar_mine_pop_block")).css({display:"block"});angular.element(c[0].querySelector(".c60_fbar_qiandao_rule_pop")).css({display:"block"})},c60_fbar_my_rule_textbtn:function(i){a.recordTracingCdr(d.pageID,a.createCdrid(d.pageID,b.cid,"textbtn"),d.compData.JS.c60_fbar_my_rule_textbtn.JS.cdrConfig);angular.element(c[0].querySelector(".c60_fbar_mine_pop_block")).css({display:"none"});angular.element(c[0].querySelector(".c60_fbar_qiandao_rule_pop")).css({display:"none"});d.linkEvent("c60_fbar_my_rule_textbtn","rulebtnclick")},c60_fbar_my_tips_closebtn:function(i){a.recordTracingCdr(d.pageID,a.createCdrid(d.pageID,b.cid,"closebtn"),d.compData.JS.c60_fbar_my_tips_closebtn.JS.cdrConfig);angular.element(c[0].querySelector(".c60_fbar_mine_pop_block")).css({display:"none"});angular.element(c[0].querySelector(".c60_fbar_memberday_pop")).css({display:"none"});angular.element(c[0].querySelector(".c60_fbar_qiandao_rule_pop")).css({display:"none"});angular.element(c[0].querySelector(".c60_fbar_qiandao_pop")).css({display:"none"})},c60_fbar_attend_btn:function(i){if(d.memberInfoFlag==undefined){return false}if(d.memberInfoFlag){if(d.compData.JS.c60_fbar_attend_btn_link.JS.stateconfig.state=="0"){angular.element(c[0].querySelector(".c60_fbar_mine_tips")).css({display:"block"});d.memberInfoFlag=undefined;d.compData.JS.c60_fbar_attend_btn_link.JS.stateconfig.state="2";g.fireEvent(c.attr("cid"),b.event||"attendclick")}else{d.signResultFlag=1;angular.element(c[0].querySelector(".c60_fbar_mine_pop_block")).css({display:"block"});angular.element(c[0].querySelector(".c60_fbar_qiandao_pop")).css({display:"block"})}}else{d.signResultFlag=2;angular.element(c[0].querySelector(".c60_fbar_mine_pop_block")).css({display:"block"});angular.element(c[0].querySelector(".c60_fbar_qiandao_pop")).css({display:"block"})}a.recordTracingCdr(d.pageID,a.createCdrid(d.pageID,b.cid,"attend"),d.compData.JS.c60_fbar_attend_btn_link.JS.cdrConfig)},c60_fbar_my_tips_successbtn:function(i){a.recordTracingCdr(d.pageID,a.createCdrid(d.pageID,b.cid,"success"),d.compData.JS.c60_fbar_my_tips_successbtn.JS.cdrConfig);angular.element(c[0].querySelector(".c60_fbar_mine_pop_block")).css({display:"none"});angular.element(c[0].querySelector(".c60_fbar_qiandao_pop")).css({display:"none"});d.linkEvent("c60_fbar_my_tips_successbtn","successbtnclick")},c60_fbar_my_tips_failurebtn:function(i){a.recordTracingCdr(d.pageID,a.createCdrid(d.pageID,b.cid,"failure"),d.compData.JS.c60_fbar_my_tips_failurebtn.JS.cdrConfig);angular.element(c[0].querySelector(".c60_fbar_mine_pop_block")).css({display:"none"});angular.element(c[0].querySelector(".c60_fbar_memberday_pop")).css({display:"none"});angular.element(c[0].querySelector(".c60_fbar_qiandao_rule_pop")).css({display:"none"});angular.element(c[0].querySelector(".c60_fbar_qiandao_pop")).css({display:"none"})},c60_fbar_my_list_coin:function(i){a.recordTracingCdr(d.pageID,a.createCdrid(d.pageID,b.cid,"coin"),d.compData.JS.c60_fbar_my_list_coin.JS.cdrConfig);g.fireEvent(c.attr("cid"),b.event||"coinclick")},c60_fbar_my_list_wealth:function(i){a.recordTracingCdr(d.pageID,a.createCdrid(d.pageID,b.cid,"wealth"),d.compData.JS.c60_fbar_my_list_wealth.JS.cdrConfig);d.linkEvent("c60_fbar_my_list_wealth","wealthclick")},c60_fbar_my_flowcurrency:function(i){a.recordTracingCdr(d.pageID,a.createCdrid(d.pageID,b.cid,"flowcurrency"),d.compData.JS.c60_fbar_my_flowcurrency.JS.cdrConfig);d.linkEvent("c60_fbar_my_flowcurrency","flowcurrencyclick")},c60_fbar_my_luckdraw:function(i){a.recordTracingCdr(d.pageID,a.createCdrid(d.pageID,b.cid,"luckdraw"),d.compData.JS.c60_fbar_my_luckdraw.JS.cdrConfig);d.linkEvent("c60_fbar_my_luckdraw","luckdrawclick")},c60_fbar_my_list_red:function(i){a.recordTracingCdr(d.pageID,a.createCdrid(d.pageID,b.cid,"red"),d.compData.JS.c60_fbar_my_list_red.JS.cdrConfig);d.linkEvent("c60_fbar_my_list_red","redclick")},c60_fbar_my_list_red_openred:function(i){a.recordTracingCdr(d.pageID,a.createCdrid(d.pageID,b.cid,"openred"),d.compData.JS.c60_fbar_my_list_red_openred.JS.cdrConfig);d.linkEvent("c60_fbar_my_list_red_openred","openredclick")},c60_fbar_my_list_red_hairred:function(i){a.recordTracingCdr(d.pageID,a.createCdrid(d.pageID,b.cid,"hairred"),d.compData.JS.c60_fbar_my_list_red_hairred.JS.cdrConfig);d.linkEvent("c60_fbar_my_list_red_hairred","hairredclick")},c60_fbar_my_list_discount:function(i){a.recordTracingCdr(d.pageID,a.createCdrid(d.pageID,b.cid,"discount"),d.compData.JS.c60_fbar_my_list_discount.JS.cdrConfig);d.linkEvent("c60_fbar_my_list_discount","discountclick")},c60_fbar_my_latestactivity:function(i){a.recordTracingCdr(d.pageID,a.createCdrid(d.pageID,b.cid,"latestactivity"),d.compData.JS.c60_fbar_my_latestactivity.JS.cdrConfig);d.linkEvent("c60_fbar_my_latestactivity","latestactivityclick")},c60_fbar_my_preferences:function(i){a.recordTracingCdr(d.pageID,a.createCdrid(d.pageID,b.cid,"preferences"),d.compData.JS.c60_fbar_my_preferences.JS.cdrConfig);d.linkEvent("c60_fbar_my_preferences","oldcustomerpreferencesclick")},c60_fbar_my_list_privilege:function(i){a.recordTracingCdr(d.pageID,a.createCdrid(d.pageID,b.cid,"privilege"),d.compData.JS.c60_fbar_my_list_privilege.JS.cdrConfig);g.fireEvent(c.attr("cid"),b.event||"privilegeclick")},c60_fbar_my_list_growup:function(i){a.recordTracingCdr(d.pageID,a.createCdrid(d.pageID,b.cid,"growup"),d.compData.JS.c60_fbar_my_list_growup.JS.cdrConfig);d.linkEvent("c60_fbar_my_list_growup","growupclick")},c60_fbar_my_list_task:function(i){a.recordTracingCdr(d.pageID,a.createCdrid(d.pageID,b.cid,"task"),d.compData.JS.c60_fbar_my_list_task.JS.cdrConfig);d.linkEvent("c60_fbar_my_list_task","taskclick")},c60_fbar_my_list_set:function(i){a.recordTracingCdr(d.pageID,a.createCdrid(d.pageID,b.cid,"set"),d.compData.JS.c60_fbar_my_list_set.JS.cdrConfig);g.fireEvent(c.attr("cid"),b.event||"setclick")},c60_fbar_my_add_desktop:function(j){a.recordTracingCdr(d.pageID,a.createCdrid(d.pageID,b.cid,"desktop"),d.compData.JS.c60_fbar_my_add_desktop.JS.cdrConfig);var i=navigator.userAgent;if(/(android|Android)/ig.test(i)){window.open(d.compData.JS.c60_fbar_my_add_desktop.JS.androidurl)}else{if(/(iPhone|iPad|iOS|iphone|ipad|ios)/ig.test(i)){window.open(d.compData.JS.c60_fbar_my_add_desktop.JS.iosurl)}else{if(i.indexOf("Windows Phone")>-1){}}}}};d.click=function(i,j){if(i==undefined||i==null){return false}switch(i){case"c60_fbar_my_result_link_btn":e.c60_fbar_my_result_link_btn(j);break;case"c60_fbar_my_head_member":e.c60_fbar_my_head_member(j);break;case"c60_fbar_my_head_rule":e.c60_fbar_my_head_rule(j);break;case"c60_fbar_my_rule_textbtn":e.c60_fbar_my_rule_textbtn(j);break;case"c60_fbar_my_tips_closebtn":e.c60_fbar_my_tips_closebtn(j);break;case"c60_fbar_attend_btn":e.c60_fbar_attend_btn(j);break;case"c60_fbar_my_tips_successbtn":e.c60_fbar_my_tips_successbtn(j);break;case"c60_fbar_my_tips_failurebtn":e.c60_fbar_my_tips_failurebtn(j);break;case"c60_fbar_my_list_coin":e.c60_fbar_my_list_coin(j);break;case"c60_fbar_my_list_wealth":e.c60_fbar_my_list_wealth(j);break;case"c60_fbar_my_flowcurrency":e.c60_fbar_my_flowcurrency(j);break;case"c60_fbar_my_luckdraw":e.c60_fbar_my_luckdraw(j);break;case"c60_fbar_my_list_red":e.c60_fbar_my_list_red(j);break;case"c60_fbar_my_list_red_openred":e.c60_fbar_my_list_red_openred(j);break;case"c60_fbar_my_list_red_hairred":e.c60_fbar_my_list_red_hairred(j);break;case"c60_fbar_my_list_discount":e.c60_fbar_my_list_discount(j);break;case"c60_fbar_my_latestactivity":e.c60_fbar_my_latestactivity(j);break;case"c60_fbar_my_preferences":e.c60_fbar_my_preferences(j);break;case"c60_fbar_my_list_privilege":e.c60_fbar_my_list_privilege(j);break;case"c60_fbar_my_list_growup":e.c60_fbar_my_list_growup(j);break;case"c60_fbar_my_list_task":e.c60_fbar_my_list_task(j);break;case"c60_fbar_my_list_set":e.c60_fbar_my_list_set(j);break;case"c60_fbar_my_add_desktop":e.c60_fbar_my_add_desktop(j);break;default:break}};d.$on(d.cid+"_handleEvent",function(k,j,l,i){d.eventMap[j](l);if(null!=i){i.resolve()}});d.eventMap.memberinfo=d.memberinfo;d.eventMap.error=d.error;d.eventMap.signRet=d.signRet}],link:function(d,b,a,c){d.pageID=c.pageID;d.componentType="cmine";d.init()}}});
uiCore.directive("guesspeek",function(){return{restrict:"EA",replace:true,require:"^pid",template:'<div class="c60_fbar_c60_toolbar_aodi_con"><span class="c60_fbar_c60_toolbar_aodi_img" ccid="c60_toolbar_aodi_img" ng-style="getStyle(\'c60_toolbar_aodi_img\')" ng-click="click(\'c60_toolbar_aodi_img\')"></span><span class="c60_fbar_c60_toolbar_aodi_close" ccid="c60_fbar_c60_toolbar_aodi_close" ng-style="getStyle(\'c60_toolbar_aodi_close\')" ng-click="click(\'c60_toolbar_aodi_close\');$event.stopPropagation();" ng-bind="compData.JS.c60_toolbar_aodi_close.JS.text"></span></div>',scope:{},controller:["$scope","$element","$attrs","coreService","coreUtils","Const",function(d,c,b,f,a,g){d.cid=b.cid;d.eventMap={};d.compData={CSS:{},JS:{}};var e={c60_toolbar_aodi_img:function(h){if(d.compData.JS.compdata.imgLink){a.recordTracingCdr(d.pageID,a.createCdrid(d.pageID,b.cid,"pictClk"),d.compData.JS.cdrConfig);window.open(d.compData.JS.compdata.imgLink)}},c60_toolbar_aodi_close:function(h){a.recordTracingCdr(d.pageID,a.createCdrid(d.pageID,b.cid,"close"),d.compData.JS.cdrConfig);f.fireEvent(c.attr("cid"),b.event||"goback")}};d.getStyle=function(h){if(d.compData.JS[h]&&d.compData.JS[h].CSS){return d.compData.JS[h].CSS}};d.click=function(h,i){if(h==undefined||h==null){return false}switch(h){case"c60_toolbar_aodi_img":e.c60_toolbar_aodi_img(i);break;case"c60_toolbar_aodi_close":e.c60_toolbar_aodi_close(i);break;default:}};d.getDataInit=function(h){if(h!=undefined&&Object.keys(h).length>0){d.compData.JS.compdata=h;if(d.compData.JS.compdata&&d.compData.JS.compdata.imgUrl){angular.element(c[0].querySelector(".c60_fbar_c60_toolbar_aodi_img")).css("background-image","url("+d.compData.JS.compdata.imgUrl+")")}}};d.eventMap.getDataInit=d.getDataInit;d.getStyle=function(h){if(h==undefined||h==null){return false}if(d.compData.JS[h]&&d.compData.JS[h].CSS){return d.compData.JS[h].CSS}};d.extendComponentData=function(h){d.compData=a.extendDeep(d.compData,h)};d.init=function(){f.registerComponentInstance(c.attr("cid"),d);d.extendComponentData(f.getInitProperties(d.cid)||{});c.css(d.compData.css||{})};d.getDataFromRet=function(h){f.fireEvent(c.attr("cid"),b.event||"tuisuccess")};d.eventMap.getDataFromRet=d.getDataFromRet;d.$on(d.cid+"_handleEvent",function(k,i,j,h){d.eventMap[i](j);if(null!=h){h.resolve()}})}],link:function(d,b,a,c){d.pageID=c.pageID;d.componentType="guesspeek";d.init()}}});
uiCore.directive("ititlefts",["coreService","coreUtils","$timeout",function(c,a,b){return{restrict:"EA",replace:true,require:"^pid",scope:{param:"=param"},template:'<div {{param}}><imageholder cid="titleimage" ng-show="compData.JS.titleimageconfigflag" param="compData.JS.titleimageconfig"></imageholder><irichtext cid="titletext" param="compData.JS.titletextconfig"></irichtext></div>',controller:["$scope","$element","$attrs","coreService","coreUtils","Const",function(g,f,e,h,d,i){g.cid=e.cid;g.eventMap={};g.compData={CSS:{"z-index":"2047483648",position:"relative",width:"100%",left:"0px",top:"0px",right:"0px",height:"2.4em","line-height":"2.4em","text-align":"left","padding-left":"2.3em","border-bottom-width":"1px","border-bottom-style":"solid","border-bottom-color":"rgb(214,214,214)",background:"rgb(248,248,248)","-webkit-box-sizing":"border-box","-moz-box-sizing":"border-box","box-sizing":"border-box"},JS:{clickable:false,stateconfig:{state:"0"},titleimageconfig:{CSS:{},JS:{stateconfig:{state:"0"}}},titletextconfig:{CSS:{"text-align":"left",color:"rgb(34,34,34)",display:"block","font-size":"1em",height:"2.4em","line-height":"2.4em"},JS:{clickable:false,stateconfig:{state:"0"}}}}};g.setEvents=function(){if(g.compData.JS.clickable){var l=i.touchEvent.start;var k=i.touchEvent.move;var p=i.touchEvent.end;var m=0;var o=0;var n=0;var j=0;f.bind(p,function(q){d.recordTracingCdr(g.pageID,g.pageID+"_returnback",g.compData.JS.cdrConfig);h.fireEvent(g.cid,"click"+g.compData.JS.stateconfig.state)})}};g.setState=function(j){g.compData.JS.stateconfig.state=j.state};g.$on(e.cid+"_handleEvent",function(l,m,k,j){if(g.eventMap[m]){g.eventMap[m](k);if(null!=j){j.resolve()}}});g.extendComponentData=function(j){g.compData=d.extendDeep(g.compData,j)};g.init=function(){h.registerComponentInstance(f.attr("cid"),g);g.extendComponentData(h.getInitProperties(g.cid));g.applyStyle();g.setEvents()};g.applyStyle=function(){if(null!=g.compData.JS.stateconfig["state"+g.compData.JS.stateconfig.state]){d.extendDeep(g.compData.CSS,g.compData.JS.stateconfig["state"+g.compData.JS.stateconfig.state])}f.css(g.compData.CSS)};g.$watch(g.param,function(j){if(g.param){g.compData=g.param;g.applyStyle()}});g.updateTitleText=function(k,j){g.compData.JS.titletextconfig.JS.textdata=k.stitle;if(null!=j){j.resolve()}};g.eventMap.updateState=g.setState;g.eventMap.updateTitleText=g.updateTitleText;g.$on(e.cid+"_handleEvent",function(l,m,k,j){if(g.eventMap[m]){g.eventMap[m](k);if(null!=j){j.resolve()}}})}],link:function(g,e,d,f){g.pageID=f.pageID;g.componentType="ititlefts";g.init()}}}]);
uiCore.directive("receiveinfo",[function(){return{restrict:"EA",replace:true,require:"^pid",template:'<div class="c60_fbar_recevicer_info"><div class="c60_fbar_recevicer_info_con" ng-show="infoflag"><div class="c60_fbar_ri_type c60_fbar_clearfloat"><div class="c60_fbar_ri_type_left" ng-bind="compData.JS.receiveinfoname.text"></div><div class="c60_fbar_ri_type_right"><span class="c60_fbar_ri_type_righttxt" ng-bind="offerdetails.name"></span></div></div><div class="c60_fbar_ri_type c60_fbar_clearfloat"><div class="c60_fbar_ri_type_left" ng-bind="compData.JS.receiveinfomemory.text"></div><div class="c60_fbar_ri_type_right"><span class="c60_fbar_ri_type_righttxt" ng-bind="offerdetails.memory"></span></div></div><div class="c60_fbar_ri_type c60_fbar_clearfloat"><div class="c60_fbar_ri_type_left" ng-bind="compData.JS.receiveinfocolor.JS.text"></div><div class="c60_fbar_ri_type_right c60_fbar_ri_type_colorcons"></div></div><div class="c60_fbar_ri_type c60_fbar_clearfloat"><div class="c60_fbar_ri_type_left" ng-bind="compData.JS.receiveinfopkg.text"></div><div class="c60_fbar_ri_type_right"><span class="c60_fbar_ri_type_righttxt" ng-bind="offerdetails.tariff"></span></div></div></div><div class="c60_fbar_recevicer_info_con"><div class="c60_fbar_ri_type c60_fbar_clearfloat"><div class="c60_fbar_ri_type_left c60_fbar_ri_type_width30" ng-bind="compData.JS.receiveinfoaddress.text"></div><div class="c60_fbar_ri_type_right c60_fbar_ri_type_width65"><input type="text" ng-model="inputData" value placeholder="{{compData.JS.inputtext.text}}" class="c60_fbar_ri_type_address_input" /><div class="c60_fbar_ri_type_right c60_fbar_ri_type_width65 c60_fbar_tipstextcolor" ng-bind="compData.JS.inputtext.tips"></div></div></div></div><div class="c60_fbar_ri_banli_btn" ><span class="c60_fbar_ri_banli_btn_link" ccid="c60_fbar_ri_banli_btn_link" ng-click="confirmclick()" ng-style="compData.JS.button.CSS" ng-bind="compData.JS.button.JS.text"></span></div><div class="c60_fbar_ri_tips"><div class="c60_fbar_ri_tips_tit" ng-bind="compData.JS.tiptitle.JS.text" ng-style="compData.JS.tiptitle.CSS"></div><div class="c60_fbar_ri_tips_txt"></div></div></div>',scope:{},controller:["$scope","$element","$attrs","coreService","coreUtils","Const",function(h,i,f,b,e,a){h.cid=f.cid;h.eventMap={};h.infoflag=false;var g=angular.element(i[0].querySelector(".c60_fbar_ri_tips_txt"));var d=angular.element(i[0].querySelector(".c60_fbar_ri_type_colorcons"))[0];var c=[],j=[];h.compData={CSS:{},JS:{}};h.confirmclick=function(){var k;if(h.infoflag==true){k={address:encodeURIComponent(h.inputData),color:h.colordatas,taskId:h.taskId}}else{if(h.infoflag==false){k={address:h.inputData,taskId:h.taskId}}else{}}if(h.inputData==undefined||h.inputData==""){angular.element(i[0].querySelector(".c60_fbar_tipstextcolor")).css("display","block")}else{angular.element(i[0].querySelector(".c60_fbar_tipstextcolor")).css("display","none");if(top.tlbs.messageid!=""){b.fireEvent(h.cid,"messagestatuschange",{messageid:top.tlbs.messageid})}e.recordTracingCdr(h.pageID,e.createCdrid(h.pageID,f.cid,"btn"),h.compData.JS.confirmbtn.cdrConfig,{iseComp:"1"});b.fireEvent(i.attr("cid"),f.event||"confirmclick",k)}};h.update=function(k){if(k){var m=k.pmdata||{};h.taskId=k.taskId||"";if(m.isoffer=="true"||m.isoffer==true){h.infoflag=true;h.offerdetails=m.offerdetails;var n=m.offerdetails.colors;if((i[0].querySelector(".c60_fbar_ri_type_color_chose"))==null){for(var p=0;p<n.length;p++){var l;if(p==0){l=angular.element('<div class="c60_fbar_ri_type_color_chose c60_fbar_cur" color="'+n[p].color+'" style="color:'+h.compData.JS.receiveinfocolor.CSS.color+'">'+n[p].name+"</div>")[0]}else{l=angular.element('<div class="c60_fbar_ri_type_color_chose" color="'+n[p].color+'" style="color:'+h.compData.JS.receiveinfocolor.CSS.color+'">'+n[p].name+"</div>")[0]}c.push(l);d.appendChild(l)}}else{}var s=angular.element(i[0].querySelector(".c60_fbar_cur"));s.css({border:"3px solid #ff7a03",color:"#ff6600",background:"#fff"});h.colordatas=s.attr("color");for(var o=0;o<c.length;o++){var q=a.touchEvent.start,u=a.touchEvent.end;var t=angular.element(c[o]);var r=(function(v){h.colordatas=angular.element(c[0]).attr("color");var w=function(y){y.stopPropagation();y.preventDefault();for(var x=0;x<c.length;x++){if(x!=v){angular.element(c[x]).removeClass("c60_fbar_cur").css({border:"3px solid #eee",color:h.compData.JS.receiveinfocolor.CSS.color,background:"#eee"})}}angular.element(c[v]).addClass("c60_fbar_cur").css({border:"3px solid #ff7a03",color:"#ff6600",background:"#fff"});h.colordatas=angular.element(c[v]).attr("color")};return w})(o);t.bind(q,r)}}else{h.infoflag=false}g.html(h.compData.JS.tips_txt.text)}else{}};h.eventMap.update=h.update;h.extendComponentData=function(k){e.extendDeep(h.compData,k)};h.init=function(){b.registerComponentInstance(h.cid,h);var k=b.getInitProperties(f.cid)||{};h.compData=e.extendDeep(h.compData||{},k);i.css(h.compData.CSS||{});h.extendComponentData(b.getInitProperties(h.cid)||{});b.fireEvent(i.attr("cid"),"test")};h.$on(h.cid+"_handleEvent",function(n,l,m,k){h.eventMap[l](m,k);if(null!=k){k.resolve()}})}],link:function(d,b,a,c){d.pageID=c.pageID;d.componentType="receiveinfo";d.init()}}}]);
uiCore.directive("guess",function(){return{restrict:"EA",replace:true,require:"^pid",template:'<div style="height:100%;background-color:#fff;">  <div class="c60_fbar_bg_black_pop" ng-style="getbg_black_popStyle()">	   <div class="c60_fbar_tips_txt" ng-bind="compData.JS.bg_black_pop.JS.desc" style="color:white;margin-top:0"></div>  </div><div class="c60_fbar_taocan_result_con c60_fbar_taocan_result_con_guess" ng-style="gettaocan_result_conStyle()"><div class="c60_fbar_succ_img_con"><span class="c60_fbar_succ_img" ng-style="compData.JS.c60_fbar_taocan_result_con.JS.state.CSS"></span></div><div class="c60_fbar_tips_txt" ng-bind="compData.JS.c60_fbar_taocan_result_con.JS.state.tipstxt"></div><div class="c60_fbar_result_btn" ccid="c60_fbar_link_btn"><a class="c60_fbar_link_btn" ng-bind="compData.JS.c60_fbar_taocan_result_con.JS.state.btntxt" ng-click="returnclick()"></a></div></div><div class="c60_fbar_bg_pop_block" ng-click="click(\'bg_pop_block\');"></div><div class="c60_fbar_pop_block"><div class="c60_fbar_img_txt_info"><table cellpadding="0" cellspacing="0" class="c60_fbar_img_txt_table"><tr><td><span class="c60_fbar_goldIcon"></span></td><td><div class="c60_fbar_pop_txt3"><span  class="c60_fbar_pop_txt3" ng-show="compData.JS.tips0.isShow" ng-bind="compData.JS.tips0.text"></span><span  class="c60_fbar_pop_txt3" ng-show="compData.JS.tips1.isShow" ng-bind="compData.JS.tips1.text" ng-style="compData.JS.tips1.CSS"></span><span  class="c60_fbar_pop_txt3"  ng-show="compData.JS.tips2.isShow" ng-bind="compData.JS.tips2.text"></span><span  class="c60_fbar_pop_txt3" ng-show="compData.JS.tips3.isShow" ng-bind="compData.JS.tips3.text" ng-style="compData.JS.tips3.CSS"></span><span  class="c60_fbar_pop_txt3" ng-show="compData.JS.tips4.isShow" ng-bind="compData.JS.tips4.text"></span></div></td></tr></table></div><div class="c60_fbar_img_txt_btn c60_fbar_clearfloat"><div class="c60_fbar_left_itbtn" ccid="c60_fbar_left_itbtn" ng-click="click(\'c60_fbar_left_itbtn\');$event.stopPropagation();" ng-bind="compData.JS.c60_fbar_left_itbtn.JS.text" ng-style="compData.JS.c60_fbar_left_itbtn.CSS"></div><div class="c60_fbar_right_itbtn" ccid="c60_fbar_right_itbtn" ng-click="click(\'c60_fbar_right_itbtn\');$event.stopPropagation();" ng-bind="compData.JS.c60_fbar_right_itbtn.JS.text" ng-style="compData.JS.c60_fbar_right_itbtn.CSS"></div></div></div>	<div class="c60_fbar_guess_mark_con" ng-style="getguess_mark_conStyle()">		<div class="c60_fbar_mark_banner" ccid="c60_fbar_mark_banner" ng-style="getStyle(\'c60_fbar_mark_banner\')" ng-click="click(\'c60_fbar_mark_banner\');">	    	<span class="c60_fbar_tou_look" ccid="c60_fbar_tou_look" ng-click="click(\'c60_fbar_tou_look\');$event.stopPropagation();" ng-bind="compData.JS.c60_fbar_tou_look.JS.text"></span>	    	<div class="c60_fbar_mark_banner_txt"><span ng-bind="compData.JS.c60_fbar_mark_banner_txt.JS.text"></span><span ng-bind="compData.JS.resp.guesslist[0].vaIncreased"></span><span ng-bind="compData.JS.c60_fbar_mark_banner_txt2.JS.text"></span></div>	    </div>	    <div class="c60_fbar_write_txt_zone">	    	<div class="c60_fbar_mark_text_con">	        	<span class="c60_fbar_mark_text" ng-repeat="item in compData.JS.wirte_txt_table.JS.answerlist track by $index" ng-bind="getItem($index)"></span>	        </div>	    </div>	    <div class="c60_fbar_wirte_txt_chose">	    	<ul class="c60_fbar_wirte_txt_table c60_fbar_clearfloat">	        	<li ng-repeat="item in compData.JS.wirte_txt_table.JS.wordlist track by $index" ng-bind="item"  ng-click="wordclick($index);$event.stopPropagation();"></li>	        </ul>	    </div>	</div></div>',scope:{},controller:["$scope","$element","$attrs","coreService","coreUtils","Const",function(i,j,g,b,e,a){i.cid=g.cid;i.eventMap={};i.compData={CSS:{},JS:{}};var c=true;i.getguess_mark_conStyle=function(){if(i.compData.JS.guess_mark_con.JS.stateconfig.state==0){return i.compData.JS.guess_mark_con.JS.stateconfig.state0}else{return i.compData.JS.guess_mark_con.JS.stateconfig.state1}};i.gettaocan_result_conStyle=function(){if(i.compData.JS.c60_fbar_taocan_result_con.JS.showconfig.state==0){return i.compData.JS.c60_fbar_taocan_result_con.JS.showconfig.state0}else{return i.compData.JS.c60_fbar_taocan_result_con.JS.showconfig.state1}};i.taocanresulturl=function(){if(i.compData.JS&&i.compData.JS.c60_fbar_taocan_result_con){cssvalue=i.compData.JS.c60_fbar_taocan_result_con.JS.stateconfig["state"+i.compData.JS.c60_fbar_taocan_result_con.JS.stateconfig.state].CSS;return cssvalue}};i.taocanresulttxt=function(){if(i.compData.JS&&i.compData.JS.c60_fbar_taocan_result_con){return i.compData.JS.c60_fbar_taocan_result_con.JS.stateconfig["state"+i.compData.JS.c60_fbar_taocan_result_con.JS.stateconfig.state].btntxt}};i.taocanresulttips=function(){if(i.compData.JS&&i.compData.JS.c60_fbar_taocan_result_con){return i.compData.JS.c60_fbar_taocan_result_con.JS.stateconfig["state"+i.compData.JS.c60_fbar_taocan_result_con.JS.stateconfig.state].tipstxt}};i.returnclick=function(){e.recordTracingCdr(i.pageID,e.createCdrid(i.pageID,g.cid,"goFirstPage"),i.compData.JS.guessCdr.cdrConfig);b.fireEvent(j.attr("cid"),g.event||"goFirstPage")};i.getbg_black_popStyle=function(){if(i.compData.JS.bg_black_pop.JS.stateconfig.state==1){return i.compData.JS.bg_black_pop.JS.stateconfig.state1}else{return i.compData.JS.bg_black_pop.JS.stateconfig.state0}};i.getItem=function(m){return i.compData.JS.wirte_txt_table.JS.answerlistcollect[m]};i.bg_black_popShow=function(m,n){i.compData.JS.bg_black_pop.JS.stateconfig.state=1;angular.element(j[0].querySelector(".c60_fbar_bg_black_pop")).css({display:"block"});setTimeout(function(){i.compData.JS.bg_black_pop.JS.stateconfig.state=0;angular.element(j[0].querySelector(".c60_fbar_bg_black_pop")).css({display:"none"})},i.compData.JS.bg_black_pop.JS.stateconfig.time*1000);i.compData.JS.bg_black_pop.JS.desc=m};i.bg_pop_blockShow=function(){return i.compData.JS.bg_pop_block.JS.show};var f=function(){i.compData.JS.wirte_txt_table.JS.answerapp="";i.compData.JS.wirte_txt_table.JS.answerindex=0;i.compData.JS.wirte_txt_table.JS.answerlistcollect=[]};i.wordclick=function(m){if(false===c){return}if(i.compData.JS.isGuessAble==false){i.bg_black_popShow(i.compData.JS.tipstext1);return false}if(i.compData.JS.bg_black_pop.JS.stateconfig.state==1){f();return false}e.recordTracingCdr(i.pageID,e.createCdrid(i.pageID,g.cid,"wordClick"),i.compData.JS.guessCdr.cdrConfig);i.compData.JS.wirte_txt_table.JS.answerlistcollect[i.compData.JS.wirte_txt_table.JS.answerindex]=i.compData.JS.wirte_txt_table.JS.wordlist[m];i.compData.JS.wirte_txt_table.JS.answerindex=i.compData.JS.wirte_txt_table.JS.answerindex+1;i.compData.JS.wirte_txt_table.JS.answerapp=i.compData.JS.wirte_txt_table.JS.answerapp+i.compData.JS.wirte_txt_table.JS.wordlist[m];if(i.compData.JS.wirte_txt_table.JS.answerindex>=i.compData.JS.wirte_txt_table.JS.answerlen){if(i.compData.JS.wirte_txt_table.JS.answerapp==i.compData.JS.resp.guesslist[i.compData.JS.adindex].answer){if(i.compData.JS.resp.remainTimes<=0){i.bg_black_popShow(i.compData.JS.tipstext1);return false}d("guesssuc");c=false;i.compData.JS.isGuessed=true}else{i.compData.JS.wirte_txt_table.JS.answerapp="";i.bg_black_popShow(i.compData.JS.tipstext2);setTimeout(function(){f()},i.compData.JS.bg_black_pop.JS.stateconfig.time*1000)}}};i.guesssucRet=function(m){if(m&&m.respparam){i.compData.JS.guesssucresp=m.respparam;angular.element(j[0].querySelector(".c60_fbar_bg_pop_block")).css({display:"block"});angular.element(j[0].querySelector(".c60_fbar_pop_block")).css({display:"inline"});c=true;if(i.compData.JS.guesssucresp.status=="2015528"){i.compData.JS.tips0.isShow=true;i.compData.JS.tips1.isShow=true;i.compData.JS.tips2.isShow=true;i.compData.JS.tips3.isShow=true;i.compData.JS.tips4.isShow=true;i.compData.JS.tips0.text=i.compData.JS.tipsok.tipstext0;i.compData.JS.tips1.text=i.compData.JS.answer;i.compData.JS.tips2.text=i.compData.JS.tipsok.tipstext1;i.compData.JS.tips3.text=m.respparam.vaIncreased;i.compData.JS.tips4.text=i.compData.JS.tipsok.tipstext2;var n={respparam:{vaIncreased:m.respparam.vaIncreased}};b.fireEvent(j.attr("cid"),g.event||"updateCoinsTotal",n)}else{if(i.compData.JS.guesssucresp.status=="9206"){i.compData.JS.tips0.isShow=true;i.compData.JS.tips1.isShow=true;i.compData.JS.tips2.isShow=true;i.compData.JS.tips3.isShow=false;i.compData.JS.tips4.isShow=false;i.compData.JS.tips0.text=i.compData.JS.tipsfail.tipstext0;i.compData.JS.tips1.text=i.compData.JS.answer;i.compData.JS.tips2.text=i.compData.JS.tipsfail.tipstext1}else{i.compData.JS.tips0.text=i.compData.JS.tipserror.tipstext0;i.compData.JS.tips0.isShow=true;i.compData.JS.tips1.isShow=false;i.compData.JS.tips2.isShow=false;i.compData.JS.tips3.isShow=false;i.compData.JS.tips4.isShow=false}}}};i.eventMap.guesssucRet=i.guesssucRet;i.nodatarecvd=function(){i.showError()};i.eventMap.nodatarecvd=i.nodatarecvd;var k={c60_fbar_mark_banner:function(m){if(i.compData.JS.resp.guesslist.length>0){e.recordTracingCdr(i.pageID,e.createCdrid(i.pageID,g.cid,"pictClick"),i.compData.JS.guessCdr.cdrConfig);window.open(i.compData.JS.resp.guesslist&&i.compData.JS.resp.guesslist[0].tipslink)}},c60_fbar_left_itbtn:function(m){e.recordTracingCdr(i.pageID,e.createCdrid(i.pageID,g.cid,"continue"),i.compData.JS.guessCdr.cdrConfig);d("guessagain");angular.element(j[0].querySelector(".c60_fbar_bg_pop_block")).css({display:"none"});angular.element(j[0].querySelector(".c60_fbar_pop_block")).css({display:"none"})},c60_fbar_right_itbtn:function(m){if(i.compData.JS.resp.guesslist.length>0){e.recordTracingCdr(i.pageID,e.createCdrid(i.pageID,g.cid,"officialWeb"),i.compData.JS.guessCdr.cdrConfig);window.open(i.compData.JS.resp.guesslist&&i.compData.JS.resp.guesslist[0].tipslink)}},c60_fbar_tou_look:function(n){if(i.compData.JS.adindex>=i.compData.JS.wirte_txt_table.JS.wordlen){i.bg_black_popShow(i.compData.JS.tipstext1);return false}var m={};if(i.compData.JS.resp.guesslist.length>0){m={imgUrl:i.compData.JS.resp.guesslist[i.compData.JS.adindex].tipsImage,imgLink:i.compData.JS.resp.guesslist[i.compData.JS.adindex].tipslink}}e.recordTracingCdr(i.pageID,e.createCdrid(i.pageID,g.cid,"look"),i.compData.JS.guessCdr.cdrConfig);b.fireEvent(j.attr("cid"),g.event||"peek");b.fireEvent(j.attr("cid"),g.event||"peek2",m)},bg_pop_block:function(m){angular.element(j[0].querySelector(".c60_fbar_bg_pop_block")).css({display:"none"});angular.element(j[0].querySelector(".c60_fbar_pop_block")).css({display:"none"})}};i.click=function(m,n){if(m==undefined||m==null){return false}switch(m){case"c60_fbar_left_itbtn":k.c60_fbar_left_itbtn(n);break;case"c60_fbar_right_itbtn":k.c60_fbar_right_itbtn(n);break;case"c60_fbar_tou_look":k.c60_fbar_tou_look(n);break;case"bg_pop_block":k.bg_pop_block(n);break;case"c60_fbar_mark_banner":k.c60_fbar_mark_banner(n);break;default:}};i.getStyle=function(m){if(m==undefined||m==null){return false}if(i.compData.JS[m]&&i.compData.JS[m].CSS){return i.compData.JS[m].CSS}};i.extendComponentData=function(m){i.compData=e.extendDeep(i.compData,m)};var d=function(o){if("guessagain"==o){b.fireEvent(j.attr("cid"),g.event||o)}else{var m=i.compData.JS.adindex;var n=i.compData.JS.resp.guesslist[m];var p={id:n.id};b.fireEvent(j.attr("cid"),g.event||o,p)}};var l=function(){i.compData.JS.wirte_txt_table={CSS:{},JS:{}};i.compData.JS.wirte_txt_table.JS.answerlistcollect=[];i.compData.JS.wirte_txt_table.JS.answerlist=[];i.compData.JS.isGuessAble=true;i.compData.JS.isGuessed=false;i.compData.JS.remainTimes=100;i.compData.JS.adindex=0;i.compData.JS.answer="";i.compData.JS.resp={};i.compData.JS.guesssucresp={};i.compData.JS.wirte_txt_table.JS.answerindex=0;i.compData.JS.wirte_txt_table.JS.answerapp=0;i.compData.JS.wirte_txt_table.JS.answerlen=0;i.compData.JS.wirte_txt_table.JS.wordindex=0;i.compData.JS.wirte_txt_table.JS.wordlen=0};i.init=function(){b.registerComponentInstance(j.attr("cid"),i);i.extendComponentData(b.getInitProperties(i.cid)||{});j.css(i.compData.css||{});l()};i.showError=function(){i.compData.JS.c60_fbar_taocan_result_con.JS.showconfig.state=1;i.compData.JS.guess_mark_con.JS.stateconfig.state=0};function h(n){if((n.guesslist&&n.guesslist.length<=0)||(n.guesslist[0]&&Object.keys(n.guesslist[0]).length<=0)){i.compData.JS.isGuessAble=false;if(i.compData.JS.isGuessed==false){i.showError();return false}else{i.bg_black_popShow(i.compData.JS.tipstext1);return false}}f();i.compData.JS.resp=n;var u=i.compData.JS.adindex;var v=i.compData.JS.resp.guesslist[u];var t=v.words;if(t==null||t==undefined||t.length<=0){i.showError();return false}var m=[];var s=t.length;var o=i.compData.JS.maxline*i.compData.JS.maxlist;s=s>o?o:s;i.compData.JS.wirte_txt_table.JS.wordlist=[];for(var r=0;r<s;r++){m[r]=t.charAt(r)}i.compData.JS.wirte_txt_table.JS.wordlist=m;var w=v.answer;var q=[];var p=w.length;i.compData.JS.wirte_txt_table.JS.answerlist=[];for(var r=0;r<p;r++){q[r]=w.charAt(r)}angular.element(j[0].querySelector(".c60_fbar_mark_banner")).css("background-image","url("+i.compData.JS.resp.guesslist[u].image+")");i.compData.JS.wirte_txt_table.JS.answerlist=q;i.compData.JS.wirte_txt_table.JS.answerlen=v.answer.length;i.compData.JS.wirte_txt_table.JS.wordlen=i.compData.JS.resp.guesslist.length;i.compData.JS.answer=i.compData.JS.resp.guesslist[u].answer}i.getDataInit=function(m){if(m&&m.respparam){h(m.respparam)}else{i.showError();return false}};i.eventMap.getDataInit=i.getDataInit;i.getDataFromRet=function(m){};i.eventMap.getDataFromRet=i.getDataFromRet;i.$on(i.cid+"_handleEvent",function(p,n,o,m){i.eventMap[n](o);if(null!=m){m.resolve()}})}],link:function(d,b,a,c){d.pageID=c.pageID;d.componentType="guess";d.init()}}});
uiCore.directive('mineset', function () {
	return {
		restrict : 'EA',
		replace : true,
		require : '^pid',
		template : '<div>'
			+'   <div class="c60_fbar_returnwrap" ng-click="returnbackclick()"><div class="c60_fbar_returnback" ccid="c60_fbar_returnback"></div></div>'
				+'   <div class="c60_fbar_bg_black_pop" ng-style="getbg_black_popStyle()">'
				+'    <div class="c60_fbar_tips_txt" ng-style="compData.JS.c60_fbar_tips_txt" style="color:white;margin-top:.7em;" ng-bind="compData.JS.bg_black_pop.JS.desc"></div>'
				+'   </div>'
				+'<div class="c60_fbar_bg_pop_block" ng-style="getbg_pop_blockStyle()" ng-click="$event.stopPropagation();"></div>'
				+'<div class="c60_fbar_pop_block"  ng-style="getpop_blockStyle()">'
				+'	<div class="c60_fbar_img_txt_info">'
				+'    	<table cellpadding="0" cellspacing="0" class="c60_fbar_img_txt_table">'
				+'        	<tr>'
				+'            	<td><span class="c60_fbar_haveatea"></span></td>'
				+'                <td>'
				+'                	<div class="c60_fbar_txt1"><span ng-bind="compData.JS.c60_fbar_txt1.JS.text"></span>&nbsp;&nbsp;<span ng-style="compData.JS.c60_fbar_txt2.CSS"><span ng-bind="compData.JS.c60_fbar_txt5.JS.text"></span><span ng-bind="compData.JS.close_list_detail.JS.curText"></span><span ng-bind="compData.JS.c60_fbar_txt6.JS.text"></span></span>&nbsp;&nbsp;?</div>'
				+'                    <div class="c60_fbar_txt1" ng-style="compData.JS.c60_fbar_txt3.CSS"><span ng-bind="compData.JS.c60_fbar_txt3.JS.text"></span>&nbsp;，&nbsp;<span ng-bind="compData.JS.close_list_detail.JS.curInfo"></span><span ng-bind="compData.JS.c60_fbar_txt4.JS.text"></span></div>'
				+'                </td>'
				+'            </tr>'
				+'        </table>'
				+'    </div>'
				+'    <div class="c60_fbar_img_txt_btn clearfloat">'
				+'        <div class="c60_fbar_left_itbtn" ng-click="c60_fbar_left_itbtnClick();" ng-bind="compData.JS.c60_fbar_left_itbtn.JS.text"></div>'
				+'        <div class="c60_fbar_right_itbtn" ng-click="c60_fbar_right_itbtnClick();" ng-bind="compData.JS.c60_fbar_right_itbtn.JS.text"></div>'
				+'    </div>'
				+'</div>'
				
				+'   <div class="c60_fbar_my_con_sz" ng-style="getStyle(\'my_con\')" ><div class="c60_fbar_my_con_div" simplescroll>'
				//个性化设置
				+'    <div class="c60_fbar_my_list_con c60_fbar_my_con_sz" ccid="c60_fbar_my_list_con4" ng-click="my_list_conClick(4)" ng-show="compData.JS.c60_fbar_gexinghua.JS.isShow">'
				+'     <div class="c60_fbar_my_list">'
				+'      <div class="c60_fbar_my_list_detail clearfloat">'
				+'       <div class="c60_fbar_mytitle" ng-style="getStyle(\'mytitle\')">'
				+'        <span class="c60_fbar_gexinghua" ng-style="compData.JS.c60_fbar_gexinghua.CSS" ng-bind="compData.JS.c60_fbar_gexinghua.JS.text"></span>'
				+'       </div>'
				+'       <div class="c60_fbar_arrow_down">'
				+'        <span class="c60_fbar_arrow_down_ico" id="down_up" ng-style="getIconStyle(4)"></span>'
				+'       </div>'
				+'      </div>'
				+'     </div>'
				+'     <div class="c60_fbar_gexinghua_on" ng-style="getOptionStyle(4)" ng-click="$event.stopPropagation()" >'
				//展开的内容start
				+'			<div class="c60_fbar_gexinghua_con c60_fbar_hid">'
				+'        	<div class="c60_fbar_gexinghua_detail">'
				+'            	<div class="c60_fbar_gexinghua_detail_tit">{{compData.JS.c60_fbar_gexinghua.JS.text1}} <span class="c60_fbar_gexinghua_detail_orangetxt" ng-bind="compData.JS.c60_fbar_gexinghua.JS.aveTrafficNotifyValue"></span> MB，{{compData.JS.c60_fbar_gexinghua.JS.text2}}</div>'
				+'                <div class="c60_fbar_gxh_d_cbox_con">'
				+'                	<span id="selectedline" class="c60_fbar_gxh_d_cbox_selected_line"></span>'
				+'                	<ul id="avetraffic"class="c60_fbar_gexinghua_detail_chosebox c60_fbar_clearfloat" ccid="c60_fbar_touchslide_up">'
				+'                        <li ng-repeat="item in compData.JS.avetraffic_chose.JS.text track by $index" ccid="c60_fbar_avetraffic_chose_txt" ng-click="choseTrafficNotify($index)" ng-bind="item"></li>'
				+'                  </ul>'
				+'                </div>'
				+'            </div>'
				+'            <div class="c60_fbar_gexinghua_detail">'
				+'              <div class="c60_fbar_gexinghua_detail_tit">{{compData.JS.c60_fbar_gexinghua.JS.text3}} <span class="c60_fbar_gexinghua_detail_orangetxt1" ng-bind="compData.JS.c60_fbar_gexinghua.JS.consumeTrafficNotifyValue"></span> %，{{compData.JS.c60_fbar_gexinghua.JS.text2}}</div>'
				+'                <div class="c60_fbar_gxh_d_cbox_con">'
				+'                	<span  id="selectedline1" class="c60_fbar_gxh_d_cbox_selected_line1"></span>'
				+'                	<ul  id="consumeTrafficSet" class="c60_fbar_gexinghua_detail_chosebox c60_fbar_clearfloat" ccid="c60_fbar_touchslide_down">'
				+' 					<li ng-repeat="item in compData.JS.consumetraffic_chose.JS.text track by $index" ccid="c60_fbar_consumetr_chose_txt" ng-click="choseConsumeTrafficNotify($index)" ng-bind="item"></li>'
				+'                  </ul>'
				+'                </div>'
				+'            </div>'
				+'        </div>'
				//展开的内容end
				+'     </div>'
				+'    </div>'
				

				+'    <div class="c60_fbar_my_list_con c60_fbar_my_con_sz" ccid="c60_fbar_my_list_con1" ng-click="my_list_conClick(1)" >'
				+'     <div class="c60_fbar_my_list">'
				+'      <div class="c60_fbar_my_list_detail clearfloat">'
				+'       <div class="c60_fbar_mytitle" ng-style="getStyle(\'mytitle\')">'
				+'        <span class="c60_fbar_about" ng-style="compData.JS.c60_fbar_about.CSS" ng-bind="compData.JS.c60_fbar_about.JS.text"></span>'
				+'       </div>'
				+'       <div class="c60_fbar_arrow_down">'
				+'        <span class="c60_fbar_arrow_down_ico" id="down_up" ng-style="getIconStyle(1)"></span>'
				+'       </div>'
				+'      </div>'
				+'     </div>'
				+'     <div class="c60_fbar_about_con" ng-style="getOptionStyle(1)" ng-click="$event.stopPropagation()" >'
				+'      <h4 class="c60_fbar_about_tit"  ng-bind="compData.JS.textconfig.text2"></h4>'
				+'      <div class="c60_fbar_about_txt_img">'
				+'       <div class="c60_fbar_guanyu_img_left">'
				+'        <span class="c60_fbar_guanyu1_img">&nbsp;</span><span class="c60_fbar_span_text" ng-bind="compData.JS.textconfig.text3"></span>'
				+'        <span class="c60_fbar_span_text c60_fbar_font_bold"  ng-bind="compData.JS.textconfig.text4"></span><span class="c60_fbar_span_text" ng-bind="compData.JS.textconfig.text5"></span>'
				+'        <span class="c60_fbar_span_text c60_fbar_font_bold"  ng-bind="compData.JS.textconfig.text6"></span><span class="c60_fbar_span_text" ng-bind="compData.JS.textconfig.text7"></span>'
				+'        <span class="c60_fbar_span_text c60_fbar_font_bold" ng-bind="compData.JS.textconfig.text8"></span><span class="c60_fbar_span_text"  ng-bind="compData.JS.textconfig.text9"></span>'
				+'        <span class="c60_fbar_span_text c60_fbar_font_bold" ng-bind="compData.JS.textconfig.text10"></span><span class="c60_fbar_span_text" ng-bind="compData.JS.textconfig.text11"></span>'
				+'       </div>'
				+'       <div class="c60_fbar_guanyu_img_right">'
				+'        <span class="c60_fbar_guanyu2_img">&nbsp;</span><span ng-bind="compData.JS.textconfig.text12"></span>'
				+'        <span class="c60_fbar_font_bold" ng-bind="compData.JS.textconfig.text13"></span><span ng-bind="compData.JS.textconfig.text14"></span>'
				+'       </div>'
				+'       <div class="c60_fbar_guanyu_img_left">'
				+'        <span class="c60_fbar_guanyu3_img">&nbsp;</span><span  ng-bind="compData.JS.textconfig.text15"></span>'
				+'       </div>'
				+'       <div class="c60_fbar_guanyu_img_right">'
				+'        <span class="c60_fbar_guanyu4_img">&nbsp;</span><span  ng-bind="compData.JS.textconfig.text16"></span>'
				+'        <span class="c60_fbar_font_bold" ng-bind="compData.JS.textconfig.text17"></span></span><span ng-bind="compData.JS.textconfig.text18"></span>'
				+'       </div>'
				+'      </div>'
				+'     </div>'
				+'    </div>'
				+'    <div class="c60_fbar_my_list_con c60_fbar_my_con_sz" ccid="c60_fbar_my_list_con2" ng-click="my_list_conClick(2)">'
				+'     <div class="c60_fbar_my_list">'
				+'      <div class="c60_fbar_my_list_detail clearfloat">'
				+'       <div class="c60_fbar_mytitle" ng-style="getStyle(\'mytitle\')">'
				+'        <span class="c60_fbar_feedback" ng-style="compData.JS.c60_fbar_feedback.CSS" ng-bind="compData.JS.c60_fbar_feedback.JS.text"></span>'
				+'       </div>'
				+'       <div class="c60_fbar_arrow_down">'
				+'        <span class="c60_fbar_arrow_down_ico" id="down_up" ng-style="getIconStyle(2)"></span>'
				+'       </div>'
				+'      </div>'
				+'     </div>'
				+'    </div>'
				
				+'    <div class="c60_fbar_my_list_confeed">'
				+'     <div class="c60_fbar_feedback_con" ng-style="getOptionStyle(2)">'
				+'      <div class="c60_fbar_feedback_tit" ccid="c60_fbar_feedback_tit" ng-bind="compData.JS.c60_fbar_feedback_tit.JS.text">'
				+'      </div>'
				+'      <div class="c60_fbar_feedback_chose clearfloat">'
				+'       <span class="c60_fbar_feedback_chose_txt" ccid="c60_fbar_feedback_chose_txt" ng-repeat="item in compData.JS.feedback_chose.JS.text" ng-style="isSelected($index)" ng-click="feedbackChoseTxtClick($index);$event.stopPropagation();"><span ng-bind="item"></span></span>'
				+'      </div>'
				+'      <span><textarea class="c60_fbar_feedback_zone" ng-focus="focus()" ng-blur="blur()"  ng-style="isfeedback_zoneShow()" ng-model="compData.JS.feedback_zone.JS.text"></textarea></span>'
				+'      <div class="c60_fbar_submit_btn clearfloat">'
				+'       <span class="c60_fbar_tijiao_btn" ccid="c60_fbar_tijiao_btn" ng-style="gettijiao_btnStyle()" ng-click="tijiao_btnClick();$event.stopPropagation();" ng-bind="compData.JS.c60_fbar_tijiao_btn.JS.text"></span>'
				+'       <span class="c60_fbar_tuiding" ng-click="tuidingClick();$event.stopPropagation();" ccid="c60_fbar_tuiding" ng-show="compData.JS.c60_fbar_tuiding.JS.isShow" ng-bind="compData.JS.c60_fbar_tuiding.JS.text"></span>'
				+'      </div>'
				+'     </div>'
				+'    </div>'
				
				+'    <div class="c60_fbar_my_list_con c60_fbar_my_con_sz" ccid="c60_fbar_my_list_con3" ng-click="my_list_conClick(3)">'
				+'     <div class="c60_fbar_my_list">'
				+'      <div class="c60_fbar_my_list_detail clearfloat">'
				+'       <div class="c60_fbar_mytitle" ng-style="getStyle(\'mytitle\')">'
				+'        <span class="c60_fbar_set_close" ng-style="compData.JS.c60_fbar_set_close.CSS" ng-bind="compData.JS.c60_fbar_set_close.JS.text"></span>'
				+'       </div>'
				+'       <div class="c60_fbar_arrow_down">'
				+'        <span class="c60_fbar_arrow_down_ico" id="down_up" ng-style="getIconStyle(3)"></span>'
				+'       </div>'
				+'      </div>'
				+'     </div>'
				+'     <div class="c60_fbar_close_con" ng-style="getOptionStyle(3)" ng-click="$event.stopPropagation()">'
				+'      <table class="c60_fbar_close_list_detail">'
				+'       <tbody>'
				+'        <tr class="c60_fbar_close_list" ng-repeat="item in compData.JS.close_list_detail.JS.text" ng-show="item.isShow">'
				+'         <td ng-bind="item.desc"></td>'
				+'         <td><a class="c60_fbar_guanbi_btn" ccid="c60_fbar_guanbi_btn" ng-click="close_list_detailClick($index);$event.stopPropagation();" ng-bind="item.type"></a></td>'
				+'        </tr>'
				+'       </tbody>'
				+'      </table>'
				+'     </div>'
				+'     </div>'
//				+'    </div>'
//				+'   </div>'
//				+'</div>'
				
				+'    <div class="c60_fbar_my_list_con c60_fbar_my_con_sz" ccid="c60_fbar_my_list_con5" ng-click="my_list_conClick(5)" ng-if="compData.JS.isShowLang">'
				+'     <div class="c60_fbar_my_list">'
				+'      <div class="c60_fbar_my_list_detail clearfloat">'
				+'       <div class="c60_fbar_mytitle" ng-style="getStyle(\'mytitle\')">'
				+'        <span class="c60_fbar_set_language" ng-style="compData.JS.c60_fbar_language.CSS" ng-style="compData.JS.c60_fbar_set_language.CSS" ng-bind="compData.JS.c60_fbar_set_language.JS.text"></span>'
				+'       </div>'
				+'       <div class="c60_fbar_arrow_down">'
				+'        <span class="c60_fbar_arrow_down_ico" id="down_up" ng-style="getIconStyle(5)"></span>'
				+'       </div>'
				+'      </div>'
				+'     </div>'
				+'     <div class="c60_fbar_close_con" ng-style="getOptionStyle(5)" ng-click="$event.stopPropagation()">'
				+'      <table class="c60_fbar_close_list_detail">'
				+'       <tbody>'
				+'        <tr class="c60_fbar_close_list" ng-repeat="item in compData.JS.language_list_detail">'
				+'         <td ng-bind="item.langname"></td>'
				+'         <td><a class="c60_fbar_guanbi_btn" ccid="c60_fbar_guanbi_btn" ng-click="language_list_detailClick(item.langid);$event.stopPropagation();" ng-bind="compData.JS.c60_fbar_tijiao_btn.JS.text"></a></td>'
				+'        </tr>'
				+'       </tbody>'
				+'      </table>'
				+'     </div>'
				+'     </div>'
				
				
				+'    </div>'
				+'   </div>'
				+'</div>',
		scope : {},
		controller : [
			'$scope',
			'$element',
			'$attrs',
			'coreService',
			'coreUtils',
			'Const',
			function ($scope, $element, $attrs,coreService, coreUtils, Const) {
				$scope.compData = {
						"CSS" : {},
						"JS" : {}
					};
				//当用户点击进去的时候，置空
				$scope.focus = function(){
					if($scope.compData.JS.feedback_zone.JS.text == $scope.compData.JS.feedback_zone.JS.oldtext){
						$scope.compData.JS.feedback_zone.JS.text = "";	
						$scope.compData.JS.c60_fbar_tijiao_btn.JS.stateconfig.state = 1;
					}
				};
				//当用户点击进去的时候，置空
				$scope.blur = function(){
					if($scope.compData.JS.feedback_zone.JS.text == ""){
						$scope.compData.JS.feedback_zone.JS.text = $scope.compData.JS.feedback_zone.JS.oldtext;
					}
				};
				$scope.gettijiao_btnStyle = function(){
					if($scope.compData.JS.c60_fbar_tijiao_btn.JS.stateconfig.click == true){
						return $scope.compData.JS.c60_fbar_tijiao_btn.JS.stateconfig.state1;
					}
					if($scope.compData.JS.feedback_zone.JS.text == ''){
						$scope.compData.JS.c60_fbar_tijiao_btn.JS.stateconfig.state = 1;
					}else{
						$scope.compData.JS.c60_fbar_tijiao_btn.JS.stateconfig.state = 0;
					}
					if($scope.compData.JS.c60_fbar_tijiao_btn.JS.stateconfig.state == 0){
						return $scope.compData.JS.c60_fbar_tijiao_btn.JS.stateconfig.state0;
					}else{
						return $scope.compData.JS.c60_fbar_tijiao_btn.JS.stateconfig.state1;
					}
				}
				$scope.cid = $attrs.cid;
				$scope.eventMap = {};
					//页面元素配置项
					 $scope.extendComponentData = function(componetData) {
	                     $scope.compData = coreUtils.extendDeep($scope.compData, componetData);
	                     /*$timeout(function() {
	                         $scope.$apply();
	                     });*/
	                 };
	                 var stringToArray = function(){
	                	//关于内容
//	                	var len = $scope.compData.JS.about_tit.JS.len;
//						$scope.compData.JS.about_tit.JS.content = [];
//						for(var i = 0;i<len;i++){
//							$scope.compData.JS.about_tit.JS.content.push($scope.compData.JS.about_tit.JS["content"+i]);
//						}
						//反馈内容
						len = $scope.compData.JS.feedback_chose.JS.len;
						//点击提交时候，记录下
						$scope.compData.JS.c60_fbar_tijiao_btn.JS.stateconfig.click = false;
						$scope.compData.JS.feedback_chose.JS.text = [];
						for(var i = 0;i<len;i++){
							$scope.compData.JS.feedback_chose.JS.text.push($scope.compData.JS.feedback_chose.JS["text"+i]);
						}
						//选择日均流量提醒内容
						len = $scope.compData.JS.avetraffic_chose.JS.len;
						
						$scope.compData.JS.avetraffic_chose.JS.text = [];
						for(var i = 0;i<len;i++){
							$scope.compData.JS.avetraffic_chose.JS.text.push($scope.compData.JS.avetraffic_chose.JS["text"+i]);
						}
						//选择消耗流量提醒内容
						len = $scope.compData.JS.consumetraffic_chose.JS.len;
						$scope.compData.JS.consumetraffic_chose.JS.text = [];
						for(var i = 0;i<len;i++){
							$scope.compData.JS.consumetraffic_chose.JS.text.push($scope.compData.JS.consumetraffic_chose.JS["text"+i]);
						}
						//关闭内容
						len = $scope.compData.JS.close_list_detail.JS.len;
						$scope.compData.JS.close_list_detail.JS.text = [];
						for(var i = 0;i<len;i++){
							$scope.compData.JS.close_list_detail.JS.text.push($scope.compData.JS.close_list_detail.JS["text"+i]);
						}
						//初始化数据
						//将之前反馈框中内容记录下来
	                     $scope.compData.JS.feedback_zone.JS.oldtext = $scope.compData.JS.feedback_zone.JS.text; 
	                     $scope.compData.JS.feedback_chose.JS.content = $scope.compData.JS.feedback_chose.JS.text[$scope.compData.JS.feedback_chose.JS.index];
	                 }
	                 $scope.init = function() {
	                     coreService.registerComponentInstance($element.attr('cid'), $scope);
	                     $scope.extendComponentData(coreService.getInitProperties($scope.cid)||{});
	                     $element.css($scope.compData.css || {});
	                     //将后台字符串转换为数组
	                     stringToArray();

	                   //resolve when scrol feedback,the parent page alse scroll
	 					(function () {
	 						var inputbox = $element[0].querySelector('textarea');
	 						var _lastYPos = 0;
	 						var _currentYPos = 0;
	 						var moveFlag = false;
	 						var touchFlag = false;
	 						var start = function (e) {
	 						    touchFlag = true;
	 							_lastYPos = e.touches ? e.touches[0].pageY : e.pageY;
	 						};
	 						var move = function (e) {
	 							_currentYPos = e.touches ? e.touches[0].pageY : e.pageY;
	 							if (Math.abs(_currentYPos - _lastYPos) > 3 || moveFlag ||!touchFlag) {
	 								moveFlag = true;
	 								e.stopPropagation();
	 								e.preventDefault();
	 							}
	 							_lastYPos = _currentYPos;
	 						};
	 						var end = function (e) {
	 							if (moveFlag) {
	 								e.stopPropagation();
	 								e.preventDefault();
	 							}
	 							_lastYPos = 0;
	 						    _currentYPos = 0;
	 							touchFlag = false;
	 							moveFlag = false;
	 						};
	 						inputbox.addEventListener('touchstart', start);
	 						inputbox.addEventListener('touchmove', move);
	 						inputbox.addEventListener('touchend', end);

	 					})();
					};
					$scope.getStyle = function (classname) {
						if ($scope.compData.JS[classname] && $scope.compData.JS[classname].CSS) {
							return $scope.compData.JS[classname].CSS;
						}
					};
					$scope.isSelected = function(index){
						if($scope.compData.JS.feedback_chose.JS.index == index){
							return $scope.compData.JS.feedback_chose.JS.stateconfig.status1;
						}else{
							return $scope.compData.JS.feedback_chose.JS.stateconfig.status0;
						}
					};
					$scope.feedbackChoseTxtClick = function(index){
						if($scope.compData.JS.c60_fbar_tijiao_btn.JS.stateconfig.click == true){
							if(Number($scope.compData.JS.feedback_chose.JS.index) != Number(index)){
								angular.element($element[0].querySelector('.c60_fbar_tijiao_btn')).css(
										{"background-color":"#73d7bd",
										 "color": "#fff"});
								$scope.compData.JS.c60_fbar_tijiao_btn.JS.stateconfig.state = 0;
								$scope.compData.JS.c60_fbar_tijiao_btn.JS.stateconfig.click = false;
							}
						}
						
						$scope.compData.JS.feedback_chose.JS.index = index;
						var texts = $scope.compData.JS.feedback_chose.JS.text;
						var len = texts.length;
						if(index == len-1){
							$scope.compData.JS.feedback_chose.JS.index = index;
							$scope.compData.JS.feedback_zone.JS.stateconfig.status = 1;
						}else{
							//每次点击，记录下当前字符串
							$scope.compData.JS.feedback_chose.JS.content = $scope.compData.JS.feedback_chose.JS.text[index];
							$scope.compData.JS.feedback_zone.JS.stateconfig.status = 0;
						}
//						//跟踪话单
						coreUtils.recordTracingCdr($scope.pageID, coreUtils.createCdrid($scope.pageID,$attrs.cid,'chosetxt'), $scope.compData.JS.c60_fbar_feedback_chose_txt.JS.cdrConfig);
					}
					$scope.isfeedback_zoneShow = function(){
						if($scope.compData.JS.feedback_zone.JS.stateconfig.status == 0){
							return $scope.compData.JS.feedback_zone.JS.stateconfig.status0;
						}else{
							return $scope.compData.JS.feedback_zone.JS.stateconfig.status1;
						}
					};
					$scope.getbg_black_popStyle = function(){
						if($scope.compData.JS.bg_black_pop.JS.stateconfig.state == 1){
							return $scope.compData.JS.bg_black_pop.JS.stateconfig.state1;
						}else{
							return $scope.compData.JS.bg_black_pop.JS.stateconfig.state0;
						}
					};

					$scope.bg_black_popShow = function(msg){
						$scope.compData.JS.bg_black_pop.JS.stateconfig.state = 1;
						angular.element($element[0].querySelector('.c60_fbar_bg_black_pop')).css({'display':'block'});	
						setTimeout(function(){
							//将弹框隐藏 
							$scope.compData.JS.bg_black_pop.JS.stateconfig.state = 0;
					        angular.element($element[0].querySelector('.c60_fbar_bg_black_pop')).css({'display':'none'});	
						},$scope.compData.JS.bg_black_pop.JS.stateconfig.time*1000);
						$scope.compData.JS.bg_black_pop.JS.desc = msg;
					};
					
					//提交反馈内容
					$scope.tijiao_btnClick = function () {
						if(Number($scope.compData.JS.c60_fbar_tijiao_btn.JS.stateconfig.state) != 1){
							//跟踪话单
							coreUtils.recordTracingCdr($scope.pageID, coreUtils.createCdrid($scope.pageID,$attrs.cid,'submit'), $scope.compData.JS.c60_fbar_tijiao_btn.JS.cdrConfig);
							var curIndex = $scope.compData.JS.feedback_chose.JS.index;
							var texts = $scope.compData.JS.feedback_chose.JS.text;
							var len = texts.length;
							var content = "";
							var last = false;
							//说明用户提交的是反馈框中内容
							if(curIndex == len-1){
								content = $scope.compData.JS.feedback_zone.JS.text;
								last = true;
							}else{
								content = $scope.compData.JS.feedback_chose.JS.content;
							}
							if (content == '') {
								$scope.bg_black_popShow($scope.compData.JS.feedback_zone.JS.tips1);
							}else if(content == $scope.compData.JS.feedback_zone.JS.oldtext){
								$scope.bg_black_popShow($scope.compData.JS.feedback_zone.JS.tips2);
							} else {
								if(last == true){
									$scope.compData.JS.feedback_zone.JS.text = "";
								}
								$scope.compData.JS.c60_fbar_tijiao_btn.JS.stateconfig.click = true;
								$scope.compData.JS.c60_fbar_tijiao_btn.JS.stateconfig.state = 1; 
								angular.element($element[0].querySelector('.c60_fbar_tijiao_btn')).css(
										{"background-color":"#cacecd",
										 "color": "#999"});
								//将反馈内容发送到后台
								var param = {
									"feedback" : encodeURIComponent(content),
									"componentId" : "cmineset",
									"pageId" : "imineset",
									"templateId" : "fullscreenbar"
								};
								coreService.fireEvent($element.attr('cid'), $attrs['event'] || 'feedsubmit', param);
								
							}
						}
					};
					//当点击反馈
					$scope.feedFunc = function(inputData){
						if(inputData && inputData.respparam && inputData.respparam.success == 'Feedback Submitted Successfully'){
							$scope.bg_black_popShow($scope.compData.JS.tips.submittextSuccess);
						}else{
							$scope.bg_black_popShow($scope.compData.JS.tips.submittextFail);
						}
					};
					//language
					$scope.languageFunc = function(inputData){
						if(inputData && inputData.respparam && inputData.respparam.languagechangestatus == '0'){
							$scope.bg_black_popShow($scope.compData.JS.tips.languageSubmittextSuccess);
						}else{
							$scope.bg_black_popShow($scope.compData.JS.tips.languageSubmittextFail);
						}
					};
					//updateLanguage
					$scope.updateLanguage = function (param, flag) {
					
						$scope.compData.JS.language_list_detail = [];
						if (param && param.respparam && param.respparam.usrPref && param.respparam.usrPref.templateLangList) {
							var templateLangList = param.respparam.usrPref.templateLangList;
							$scope.compData.JS.language_list_detail = templateLangList;
						}
					}
					//退订按钮,进入到退订页面
					$scope.tuidingClick = function(){
						//跟踪话单
						coreUtils.recordTracingCdr($scope.pageID, coreUtils.createCdrid($scope.pageID,$attrs.cid,'tuiding'), $scope.compData.JS.c60_fbar_tuiding.JS.cdrConfig);
						coreService.fireEvent($element.attr('cid'), $attrs['event'] || 'tuiclick');
					};
					$scope.getbg_pop_blockStyle = function(){
						if($scope.compData.JS.bg_pop_block.JS.stateconfig.status == 0){
							return $scope.compData.JS.bg_pop_block.JS.stateconfig.status0;
						}else{
							return $scope.compData.JS.bg_pop_block.JS.stateconfig.status1;
						}
					};
					$scope.getpop_blockStyle = function(){
						if($scope.compData.JS.pop_block.JS.stateconfig.status == 0){
							return $scope.compData.JS.pop_block.JS.stateconfig.status0;
						}else{
							return $scope.compData.JS.pop_block.JS.stateconfig.status1;
						}
					};
					$scope.c60_fbar_left_itbtnClick = function(){
						//跟踪话单
						coreUtils.recordTracingCdr($scope.pageID, coreUtils.createCdrid($scope.pageID,$attrs.cid,'bule'), $scope.compData.JS.c60_fbar_left_itbtn.JS.cdrConfig);
						$scope.compData.JS.bg_pop_block.JS.stateconfig.status = 0;
						$scope.compData.JS.pop_block.JS.stateconfig.status = 0;
					};
					$scope.c60_fbar_right_itbtnClick = function(){
						top.tlbs.toolbarclose="close";
						//跟踪话单
						coreUtils.recordTracingCdr($scope.pageID, coreUtils.createCdrid($scope.pageID,$attrs.cid,'shide'), $scope.compData.JS.c60_fbar_right_itbtn.JS.cdrConfig);
						$scope.compData.JS.pop_block.JS.stateconfig.status = 0;
						$scope.compData.JS.bg_pop_block.JS.stateconfig.status = 0;
						var index = $scope.compData.JS.close_list_detail.JS.curIndex;
						//本日关闭
						var param = {
								"closeunit" : "1",
								"cycle" : "1",
								"interval" : "0",
								"start" : "1",
								"componentId" : 'cmineset',
								"isSelfOperation" : "true",
								"pageId" : "imineset",
								"templateId" : "fullscreenbar"
							}
						//本周关闭
						if(index == 1){
							param.closeunit = '2';
						}
						//本月关闭
						if(index == 2){
							param.closeunit = '3';
						}
						coreService.fireEvent($element.attr('cid'), $attrs['event'] || 'close',param);
					};
					
					$scope.language_list_detailClick = function (index) {
						var param = {};
						param.newlangId = index;
						coreService.fireEvent($element.attr('cid'), 'language', param);
					};
					//关闭类型
					$scope.close_list_detailClick = function(index){
						//跟踪话单
						coreUtils.recordTracingCdr($scope.pageID, coreUtils.createCdrid($scope.pageID,$attrs.cid,'guanbi') + index, $scope.compData.JS.c60_fbar_guanbi_btn.JS.cdrConfig);
						$scope.compData.JS.bg_pop_block.JS.stateconfig.status = 1;
						$scope.compData.JS.pop_block.JS.stateconfig.status = 1;
						$scope.compData.JS.close_list_detail.JS.curIndex = index;
						$scope.compData.JS.close_list_detail.JS.curText = $scope.compData.JS.close_list_detail.JS.text[index].type;
						$scope.compData.JS.close_list_detail.JS.curInfo = $scope.compData.JS.close_list_detail.JS.text[index].info;
						
					};
					//当点击关闭后关闭toolbar
					$scope.closeFunc = function(){
						coreService.fireEvent($element.attr('cid'), $attrs['event'] || 'closeToolbar');
					};
					$scope.eventMap['closeFunc'] = $scope.closeFunc;
					$scope.eventMap['feedFunc'] = $scope.feedFunc;
					$scope.eventMap['languageFunc'] = $scope.languageFunc;
					$scope.eventMap['updateLanguage'] = $scope.updateLanguage;
					$scope.my_list_conClick = function(item){
						//跟踪话单
						coreUtils.recordTracingCdr($scope.pageID, coreUtils.createCdrid($scope.pageID,$attrs.cid,'con') + item, $scope.compData.JS.c60_fbar_tijiao_btn.JS.cdrConfig);
						$scope.compData.JS.native.JS.index = item;
						if(item == $scope.compData.JS.native.JS.last){
							$scope.compData.JS.native.JS.index = -1;
							$scope.compData.JS.native.JS.last = 0;
						}else{
							$scope.compData.JS.native.JS.last = item;
						}
						 angular.element($element[0].querySelector('.c60_fbar_my_con_div')).css('transform', 'translate3d(0px, 0px, 0px)');
						 angular.element($element[0].querySelector('.c60_fbar_my_con_div')).css('-webkit-transform', 'translate3d(0px, 0px, 0px)');
						 angular.element($element[0].querySelector('.c60_fbar_my_con_div')).css('-moz-transform', 'translate3d(0px, 0px, 0px)');
						 angular.element($element[0].querySelector('.c60_fbar_my_con_div')).css('-ms-transform', 'translate3d(0px, 0px, 0px)');
						 angular.element($element[0].querySelector('.c60_fbar_my_con_div')).css('-o-transform', 'translate3d(0px, 0px, 0px)');
                 	};
					$scope.getIconStyle = function(index){
						if(index == $scope.compData.JS.native.JS.index){
							return $scope.compData.JS.native.JS.icon.stateconfig.state1;
						}else{
							return $scope.compData.JS.native.JS.icon.stateconfig.state0;
						}
					};
					$scope.getOptionStyle = function(index){
						if(index == $scope.compData.JS.native.JS.index){
							return $scope.compData.JS.native.JS.option.stateconfig.state1;
						}else{
							return $scope.compData.JS.native.JS.option.stateconfig.state0;
						}
					};
					//选择日均流量提醒函数
					$scope.choseTrafficNotify = function(index){
						//上面红线移动的距离
						 angular.element($element[0].querySelector('.c60_fbar_gxh_d_cbox_selected_line')).css('left', index*10+'%');
						 $scope.compData.JS.c60_fbar_gexinghua.JS.aveTrafficNotifyValue = parseInt($scope.compData.JS.avetraffic_chose.JS["text"+index]);
						 coreUtils.recordTracingCdr($scope.pageID, coreUtils.createCdrid($scope.pageID,$attrs.cid,'avetraf'), $scope.compData.JS.c60_fbar_avetraffic_chose_txt.JS.cdrConfig);
					}
					
					//选择消耗流量提醒函数
					$scope.choseConsumeTrafficNotify = function(index1){
						//上面红线移动的距离
						 angular.element($element[0].querySelector('.c60_fbar_gxh_d_cbox_selected_line1')).css('left', index1*10+"%");
						 $scope.compData.JS.c60_fbar_gexinghua.JS.consumeTrafficNotifyValue = parseInt($scope.compData.JS.consumetraffic_chose.JS["text"+index1]);
						 coreUtils.recordTracingCdr($scope.pageID, coreUtils.createCdrid($scope.pageID,$attrs.cid,'consutr'), $scope.compData.JS.c60_fbar_consumetraffic_chose_txt.JS.cdrConfig);
					}
					//返回按钮点击
					$scope.returnbackclick = function(){
						var value1 =  $scope.compData.JS.c60_fbar_gexinghua.JS.aveTrafficNotifyValue;
						var value2 = $scope.compData.JS.c60_fbar_gexinghua.JS.consumeTrafficNotifyValue;
						//如果用户没设置任何值，不发送保存报文请求
						if(value1==$scope.initvalue1&&value2==$scope.initvalue2)
						coreService.fireEvent($element.attr('cid'), $attrs['event'] || 'setreturnback');
						else
							coreService.fireEvent($element.attr('cid'), $attrs['event'] || 'setreturnback1',{'avgremain':value1*1024,'exceedpercent':value2});
						//话单
						coreUtils.recordTracingCdr($scope.pageID, coreUtils.createCdrid($scope.pageID,$attrs.cid,'return'), $scope.compData.JS.c60_fbar_returnback.JS.cdrConfig);
					}
					
					//日均流量红线滑动
					var redlinewidth  = angular.element($element[0].querySelector('.c60_fbar_gxh_d_cbox_selected_line'))[0].offsetWidth;//红线长度
					$scope.dragMove = function () {
						var _touchstart = Const.touchEvent.start;
						var _touchmove = Const.touchEvent.move;
						var _touchend = Const.touchEvent.end;
						var _lastYPos = 0;
						var _lastXPos = 0;
						var _currentYPos = 0;
						var _currentXPos = 0;
						var moveflag = false;
						var touchArea = angular.element($element[0].querySelector('#avetraffic'));
						var ulpaddingleft = angular.element($element[0].querySelector('.c60_fbar_gexinghua_con'));
						//屏幕可见宽度
						var screenWidth = top.window.innerWidth;
						//ul宽度
						var ulAveTrafficWidth = angular.element($element[0].querySelector('#avetraffic'))[0].offsetWidth;
						//计算ul左边长度
						var ulpaddingleft = (screenWidth- ulAveTrafficWidth)/2;
						//用于判断是滑动的话单
						var slideup = false;
						touchArea.bind(_touchstart, function (e) {
							redlinewidth  = angular.element($element[0].querySelector('.c60_fbar_gxh_d_cbox_selected_line'))[0].offsetWidth;//红线长度
							screenWidth = top.window.innerWidth;
							//ul宽度
							ulAveTrafficWidth = angular.element($element[0].querySelector('#avetraffic'))[0].offsetWidth;
							//计算ul左边长度
							ulpaddingleft = (screenWidth- ulAveTrafficWidth)/2;
							_lastXPos = e.touches ? e.touches[0].pageX : e.pageX;
							moveflag = true;
							
						});
						touchArea.bind(_touchmove, function (e) {
							_currentXPos = e.touches ? e.touches[0].pageX : e.pageX;
							if (Math.abs(_currentXPos - _lastXPos) > 3 || moveflag) {
								e.stopPropagation();
								e.preventDefault();
								_lastXPos = _currentXPos;
								slideup = true;
								if(moveflag){
									if((_currentXPos>=ulpaddingleft)&&(_currentXPos<=ulAveTrafficWidth))
										{
										 var aveTrafficNotifyValuePosition = parseInt((_currentXPos-ulpaddingleft)/redlinewidth);
										 if(aveTrafficNotifyValuePosition>=$scope.compData.JS.avetraffic_chose.JS.len-1)
											 angular.element($element[0].querySelector('.c60_fbar_gxh_d_cbox_selected_line')).css({'right':"0","left":"inherit"});
										 else
									     angular.element($element[0].querySelector('.c60_fbar_gxh_d_cbox_selected_line')).css('left', aveTrafficNotifyValuePosition*10+"%");
										 $scope.compData.JS.c60_fbar_gexinghua.JS.aveTrafficNotifyValue = parseInt($scope.compData.JS.avetraffic_chose.JS["text"+aveTrafficNotifyValuePosition]);
										}
								}
							}
							
						});
						
						touchArea.bind(_touchend, function (e) {
							if(moveflag&&slideup){
								//跟踪话单
								coreUtils.recordTracingCdr($scope.pageID, coreUtils.createCdrid($scope.pageID,$attrs.cid,'slideup'), $scope.compData.JS.c60_fbar_touchslide_up.JS.cdrConfig);
							}
							moveflag = false;
							slideup = false;
							$scope.$apply();
						});
						
							
							
					};
					//流量消耗红线滑动
					$scope.dragMove1 = function () {
						var _touchstart = Const.touchEvent.start;
						var _touchmove = Const.touchEvent.move;
						var _touchend = Const.touchEvent.end;
						var _lastYPos = 0;
						var _lastXPos = 0;
						var _currentYPos = 0;
						var _currentXPos = 0;
						var moveflag = false;
						var touchArea = angular.element($element[0].querySelector('#consumeTrafficSet'));
						var redline1 =angular.element($element[0].querySelector('#selectedline1'));
						var ulpaddingleft = angular.element($element[0].querySelector('.c60_fbar_gexinghua_con'));
						//屏幕可见宽度
						var screenWidth = top.window.innerWidth;
						//ul宽度
						var ulAveTrafficWidth = angular.element($element[0].querySelector('#consumeTrafficSet'))[0].offsetWidth;
						//计算ul左边长度
						var ulpaddingleft = (screenWidth- ulAveTrafficWidth)/2;
						//用于判断是滑动的话单
						var slidedown = false;
						touchArea.bind(_touchstart, function (e) {
							redlinewidth  = angular.element($element[0].querySelector('.c60_fbar_gxh_d_cbox_selected_line'))[0].offsetWidth;//红线长度
							screenWidth = top.window.innerWidth;
							//ul宽度
							ulAveTrafficWidth = angular.element($element[0].querySelector('#consumeTrafficSet'))[0].offsetWidth;
							//计算ul左边长度
							ulpaddingleft = (screenWidth- ulAveTrafficWidth)/2;
							_lastXPos = e.touches ? e.touches[0].pageX : e.pageX;
							moveflag = true;
							
						});
						touchArea.bind(_touchmove, function (e) {
							_currentXPos = e.touches ? e.touches[0].pageX : e.pageX;
							if (Math.abs(_currentXPos - _lastXPos) > 3 || moveflag) {
								e.stopPropagation();
								e.preventDefault();
								slidedown = true;
								_lastXPos = _currentXPos;
								if(moveflag){
									if((_currentXPos>=ulpaddingleft)&&(_currentXPos<=ulAveTrafficWidth))
									{
									 var consumeTrafficPosition = parseInt((_currentXPos-ulpaddingleft)/redlinewidth);
									 if(consumeTrafficPosition>=$scope.compData.JS.consumetraffic_chose.JS.len-1)
										 angular.element($element[0].querySelector('.c60_fbar_gxh_d_cbox_selected_line1')).css({'right':"0","left":"inherit"});
									 else
								     angular.element($element[0].querySelector('.c60_fbar_gxh_d_cbox_selected_line1')).css('left', consumeTrafficPosition*10+"%");
									 $scope.compData.JS.c60_fbar_gexinghua.JS.consumeTrafficNotifyValue = parseInt($scope.compData.JS.consumetraffic_chose.JS["text"+consumeTrafficPosition]);
									
									}
								}
							}
						});
						touchArea.bind(_touchend, function (e) {
							if(moveflag&&slidedown){
								//跟踪话单
								coreUtils.recordTracingCdr($scope.pageID, coreUtils.createCdrid($scope.pageID,$attrs.cid,'slidedown'), $scope.compData.JS.c60_fbar_touchslide_down.JS.cdrConfig);	
							}
							moveflag = false;
							slidedown = false;
								
							$scope.$apply();
						});
						
					};
					
					$scope.dragMove();
					$scope.dragMove1();
					
					//查询个性化设置初始日均流量值，流量百分比
					$scope.settingrecvd = function (param) {
						if(param && param.respparam){
							$scope.settingValue = param.respparam;
							if($scope.settingValue.avgremain!=null&&$scope.settingValue.avgremain!=undefined&&$scope.settingValue.avgremain!==""){
								//日均流量初始值获取及红线移动初始化
								$scope.compData.JS.c60_fbar_gexinghua.JS.aveTrafficNotifyValue = parseInt($scope.settingValue.avgremain)/1024;
								//个性化设置初始值
								$scope.initvalue1 = $scope.compData.JS.c60_fbar_gexinghua.JS.aveTrafficNotifyValue;
								var aveTrafficNotifyValue = $scope.compData.JS.c60_fbar_gexinghua.JS.aveTrafficNotifyValue;
								if(aveTrafficNotifyValue/5>9)
									 angular.element($element[0].querySelector('.c60_fbar_gxh_d_cbox_selected_line')).css({'right':"0","left":"inherit"});
								else
									 angular.element($element[0].querySelector('.c60_fbar_gxh_d_cbox_selected_line')).css('left', aveTrafficNotifyValue/5*10+"%");
							}else{
								$scope.initvalue1 = $scope.settingValue.avgremain;
							}
							if($scope.settingValue.exceedpercent!=null&&$scope.settingValue.exceedpercent!=undefined&&$scope.settingValue.exceedpercent!==""){
								//剩余百分比初始值及红线移动初始化
								$scope.compData.JS.c60_fbar_gexinghua.JS.consumeTrafficNotifyValue = parseInt($scope.settingValue.exceedpercent);
								var consumeTrafficNotifyValue = $scope.compData.JS.c60_fbar_gexinghua.JS.consumeTrafficNotifyValue;
								if((consumeTrafficNotifyValue-50)/5>9){
									angular.element($element[0].querySelector('.c60_fbar_gxh_d_cbox_selected_line1')).css({'right':"0","left":"inherit"});
								}else if((consumeTrafficNotifyValue-50)/5<0){
									angular.element($element[0].querySelector('.c60_fbar_gxh_d_cbox_selected_line1')).css('left',0);
								}else{
									angular.element($element[0].querySelector('.c60_fbar_gxh_d_cbox_selected_line1')).css('left', (consumeTrafficNotifyValue-50)/5*10+"%");
								}
							}else{
								$scope.initvalue2 = $scope.settingValue.exceedpercent;
							}
						}
					};

//					$scope.show = function(){
//						$scope.compa.JS.my_coin_con.JS.stateconfig.state = 1;
//					};
//					$scope.eventMap['show'] = $scope.show;
					$scope.eventMap['settingrecvd'] = $scope.settingrecvd;
	                $scope.$on($scope.cid + '_handleEvent', function(eventObj, event, inputData, deferred) {
	                    $scope.eventMap[event](inputData);
	                    if (null != deferred) {
	                        deferred.resolve();
	                    }
	                });
					
				}
		],
		link : function ($scope, $element, $attrs,ctl) {
			$scope.pageID = ctl.pageID;
			$scope.componentType = "cmineset";
			$scope.init();
		}
	};
});
uiCore.directive("sitenavigation",[function(){return{restrict:"AE",replace:true,require:"^pid",template:'<div class="c60_fbar_navigation_main"><div  class="c60_fbar_navigation" simplescroll><div class="c60_fbar_navigation_sites" ng-repeat="site in sites" ng-click="skip(site.weblink,site.linktype)"><div class="c60_fbar_detail" ><div class="c60_fbar_site_image"><img ng-src="{{site.iconurl}}"/></div><div class="c60_fbar_site_title" ng-bind="site.title"></div></div></div></div></div>',scope:{},controller:["$scope","$element","$attrs","coreService","coreUtils","Const",function(d,c,b,e,a,f){d.cid=b.cid;d.compData={CSS:{},JS:{}};d.eventMap={};d.init=function(){e.registerComponentInstance(c.attr("cid"),d);var g=e.getInitProperties(b.cid)||{};d.compData=a.extendDeep(d.compData||{},g)};d.$on(b.cid+"_handleEvent",function(i,j,h,g){if(d.eventMap[j]){d.eventMap[j](h);if(null!=g){g.resolve()}}});d.update=function(g){if(!g||!g.respparam||!g.respparam.type||!g.respparam.taskId||!g.respparam.website||0<=g.respparam.website){e.fireEvent(c.attr("cid"),"error");return}d.sites=g.respparam.website};d.skip=function(h,g){if(undefined==g&&0==g){window.open(h)}else{e.fireEvent(c.attr("cid"),"gotoPage",{linktype:g,url:h})}};d.eventMap.update=d.update}],link:function(d,b,a,c){d.pageID=c.pageID;d.componentType="page";d.init()}}}]);
uiCore.directive('resultpage', [function () {
			return {
				restrict : 'AE',
				replace : true,
				require : '^pid',
				template : '<div class="c60_fbar_resultpagediv">'
						+'<div class="c60_fbar_result_page_con1">'
						+'<div class="c60_fbar_datouwang8 c60_fbar_datouwang888">'
				        + '</div>' 
						+'<div class="c60_fbar_page_tips_loading" ng-bind="compData.JS.loadingtext.JS.textdata"></div>'
						+'</div>'
						+'<div class="c60_fbar_result_page_con2">'
						+'<div class="c60_fbar_page_img"><span class="c60_fbar_page_succ_img"  ng-style="{\'background-image\':\'url(\'+resultpage.imgUrl+\')\'}"/></span></div>'
						+'<div class="c60_fbar_page_tips_txt1"></div>'
						+'<div class="c60_fbar_result_page_btn" ccid="c60_fbar_page_link_btn"><a class="c60_fbar_page_link_btn" ng-bind="resultpage.btntxt" ng-click="returnclick(resultpage.action)"></a></div>'
						+'</div>'
						+'</div>',
				scope : {},
				controller : ["$scope", "$element", "$attrs", 'coreService',
					'coreUtils',
					'Const',
					'$timeout',
					function ($scope, $element, $attrs, coreService, coreUtils, Const, $timeout) {
						$scope.cid = $attrs.cid;
						$scope.compData = {
							CSS : {},
							JS : {}
						};
						$scope.eventMap = {};
						$scope.gobackClick = function () {};
						var loadingel = null;
						var resultel = null;
						var descel = null;
						$scope.loadingData = function (param) {
							$element.css({
								"display" : "block"
							});
							loadingel.css({
								'display' : 'block'
							});
							resultel.css({
								'display' : 'none'
							});

						};

						$scope.errorData = function (param) {
							var JS = $scope.compData.JS.resultsconfig.JS;
							var temp = null;
							if (param.errorcode!= null && param.errorcode!= undefined && param.errorcode!= "") {
								$scope.result = param.errorcode;
								//后台没有找到对应错误码，将原始接口错误信息直接通过suberrordesc返回到前台
								if($scope.result==JS['defaultErrorCode'] || JS[$scope.result]==undefined || JS[$scope.result]==null){
									temp = JS['default'];
									if(param.suberrordesc != "" && param.suberrordesc != null && param.suberrordesc != undefined){
										temp.tipstxt = param.suberrordesc||"";
									}
								}else{
									//找到对应的错误码
									temp = JS[$scope.result];
									//当返回的错误码前台没有对应信息后，显示默认错误码
									if(temp == undefined || temp == null || temp == ""){
										temp = JS['default'];
									}
								}
							} else {
								temp = JS['default'];
							}
							$element.css({
								'display' : 'block'
							});
							loadingel.css({
								'display' : 'none'
							});
							resultel.css({
								'display' : 'block'
							});
							temp.imgUrl = temp.imgUrl.replace(/'/g, '');
							$scope.resultpage = temp;
							descel.innerHTML = $scope.resultpage.tipstxt;
							coreService.fireEvent($element.attr('cid'), 'changebackbtn', {
								"state" : temp.backaction || '0'
							});
						}
						$scope.updateData = function (param) {
							var JS = $scope.compData.JS.resultsconfig.JS;
							var temp = null;
							if (param.respparam.subscribtionstatus != null && param.respparam.subscribtionstatus != undefined && param.respparam.subscribtionstatus != "") {
								$scope.result = param.respparam.subscribtionstatus;
								//后台没有找到对应错误码，将原始接口错误信息直接通过suberrordesc返回到前台
								if($scope.result==JS['defaultErrorCode'] || JS[$scope.result]==undefined || JS[$scope.result]==null){
									temp = JS['default'];
									if(param.respparam.suberrordesc != "" && param.respparam.suberrordesc != null && param.respparam.suberrordesc != undefined){
										temp.tipstxt = param.respparam.suberrordesc||"";
									}
								}else{
									//找到对应的错误码
									temp = JS[$scope.result];
									//当返回的错误码前台没有对应信息后，显示默认错误码
									if(temp == undefined || temp == null || temp == ""){
										temp = JS['default'];
									}
								}
							} else {
								temp = JS['default'];
							}
							$element.css({
								'display' : 'block'
							});
							loadingel.css({
								'display' : 'none'
							});
							resultel.css({
								'display' : 'block'
							});
							temp.imgUrl = temp.imgUrl.replace(/'/g, '');
							$scope.resultpage = temp;
							descel.innerHTML = $scope.resultpage.tipstxt;
							coreService.fireEvent($element.attr('cid'), 'changebackbtn', {
								"state" : temp.backaction || '0'
							});
						};

						$scope.getparam = function (name) {
							try {
								var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)", "i");
								var r = top.window.location.search.substr(1).match(reg);
								if (r != null)
									return unescape(r[2]);
								return "";
							} catch (e) {}
						};

						$scope.returnclick = function (type) {
							//                    coreUtils.addToLocalStorage("cdrcid", "c60_fbar_link_btn");
							if (type == '0') {
								//用于appbar直接显示页面订购
								if ($scope.getparam('appkey') && $scope.getparam('subscribeid'))
									coreService.fireEvent($element.attr('cid'), $attrs['event'] || 'click1');
								else {
									coreService.fireEvent($element.attr('cid'), $attrs['event'] || 'click0');
								}

							} else if (type == '1') {								
								coreService.fireEvent($element.attr('cid'), 'click1');
								$timeout(function() {
									loadingel.css({
										'display' : 'none'
									});
									resultel.css({
										'display' : 'none'
									});
									$element.css({
										'display' : 'none'
									});
								}, 1000);
							}  else if (type == '2') {
								coreService.fireEvent($element.attr('cid'), $attrs['event'] || 'click2');
							} else if (type == '3') {

								$element.css({
									'display' : 'none'
								});
								loadingel.css({
									'display' : 'none'
								});
								resultel.css({
									'display' : 'none'
								});

							}else{
								coreService.fireEvent($element.attr('cid'), $attrs['event'] || 'click'+type);
							}
							if (coreUtils.cdrUtils.canWriteUITracingCDR($scope.compData.JS.c60_fbar_link_btn.JS.cdrConfig)) {
								$scope.compData.JS['cdrData'] = {};
								$scope.compData.JS.cdrData = {
									'pageId' : $scope.pageID,
									'componentId' : coreUtils.createCdrid($scope.pageID, $attrs['cid'], 'returnbtn')
								};
								coreUtils.cdrService($scope.compData.JS.c60_fbar_link_btn.JS.cdrConfig.uitracingcdr, $scope.compData.JS.cdrData);
							}
						};
						$scope.hide = function () {
							$element.css({
								'display' : 'none'
							});
							loadingel.css({
								'display' : 'none'
							});
							resultel.css({
								'display' : 'none'
							});

						};
						$scope.init = function () {
							coreService.registerComponentInstance($element.attr('cid'), $scope);
							var properties = coreService.getInitProperties($attrs['cid']) || {};
							$scope.compData = coreUtils.extendDeep($scope.compData || {}, properties);
							$element.css($scope.compData.CSS || {});
							loadingel = angular.element($element[0].querySelector('.c60_fbar_result_page_con1'));
							resultel = angular.element($element[0].querySelector('.c60_fbar_result_page_con2'));
							descel = $element[0].querySelector(".c60_fbar_page_tips_txt1");
							//coreService.fireEvent($element.attr('cid'), 'init');
						};

						$scope.$on($attrs['cid'] + '_handleEvent', function (event, cevent, args, deferred) {
							if ($scope.eventMap[cevent]) {
								$scope.eventMap[cevent](args);
								if (null != deferred) {
									deferred.resolve();
								}
							}
						});
						$scope.eventMap['update'] = $scope.updateData;
						$scope.eventMap['error'] = $scope.errorData;
						$scope.eventMap['loading'] = $scope.loadingData;
						$scope.eventMap['hide'] = $scope.hide;
					}
				],
				link : function ($scope, $element, $attrs, ctl) {
					$scope.pageID = ctl.pageID;
					$scope.componentType = 'page';
					$scope.init();
				}
			}
		}
	]);
uiCore.directive("overed",[function(){return{restrict:"AE",replace:true,require:"^pid",template:'<div class="c60_fbar_overed_buy_con"><div style="overflow:hidden;height:100%" simplescroll><overedpack stateconfig="{{::compData.JS.config}}" ordered=orderedProducts ng-repeat="opack in orderedProducts" opack-name="opack.name" opack-name="opack.name" opack-time="opack.orderedtime" opack-desc="opack.description"></overedpack><div class="c60_fbar_no_more"><span ng-bind="compData.js.noMore"></span></div></div></div>',scope:{},controller:["$scope","$element","$attrs","coreService","coreUtils","Const","$compile",function(d,c,b,f,a,g,e){d.cid=b.cid;d.compData={CSS:{},JS:{config:{up:{background:'url("'+top.tlbs.templatePath+'/images/shengdangtip.png") center right no-repeat',"background-size":"0.65em 0.65em","padding-right":"0.9em"}}}};d.eventMap={};d.orderedProducts=[];d.update=function(h){if(h&&h.respparam&&h.respparam.trafficusage){d.orderedProducts=h.respparam.trafficusage.orderedProducts}};d.init=function(i){f.registerComponentInstance(c.attr("cid"),d);var h=f.getInitProperties(b.cid)||{};d.compData.css=h.CSS||{};d.compData.js=h.JS||{};f.fireEvent(c.attr("cid"),"init")};d.$on(b.cid+"_handleEvent",function(j,k,i,h){if(d.eventMap[k]){d.eventMap[k](i);if(null!=h){h.resolve()}}});d.eventMap.update=d.update}],link:function(d,b,a,c){d.pageID=c.pageID;d.componentType="overed";d.init()}}}]);uiCore.directive("overedpack",[function(){return{restrict:"EA",require:"^?pid",replace:true,scope:{name:"=opackName",time:"=opackTime",desc:"=opackDesc",ordered:"=ordered",},template:'<div class="c60_fbar_overed_buy_list"><div class="c60_fbar_type_time c60_fbar_clearfloat"><div class="c60_fbar_type"><span class="c60_fbar_up" ng-bind="name"></span></div><div class="c60_fbar_time" ng-bind="time"></div></div><div class="c60_fbar_txt" ng-bind="desc"></div></div>',controller:["$scope","$element","$attrs","coreService","coreUtils","Const",function(d,c,b,e,a,f){d.changeStyle=function(){var g=a.String2JSON(b.stateconfig);var i=angular.element(c[0].querySelector(".c60_fbar_up"));var h=d.name;if(h.indexOf("升级包")>0){i.css(g.up)}};d.init=function(){d.changeStyle()}}],link:function(d,b,a,c){d.init()}}}]);
uiCore.directive("pvctrl",["coreService","coreUtils","$timeout",function(c,a,b){return{restrict:"A",replace:false,controller:["$scope","$element","$attrs","$interval",function(g,f,d,j){g.cid="pvctrl";g.init=function(){c.registerComponentInstance(g.cid,g);g.ctrlPageGroup={};var k=angular.element(f[0].querySelectorAll('[lload="0"]'));for(var l=0;l<k.length;l++){var m=angular.element(k[l]);g.ctrlPageGroup[m.attr("pid")]=m}};function h(m){var l=new RegExp("[\\u4E00-\\u9FA5\uFE30-\uFFA0]+","g");var k=new RegExp("[0-9a-zA-z]+","g");if(l.test(m)==true){return 15}else{if(k.test(m)==true){return 1}else{return 15}}}function i(o){var l="";var n=0,k=0,m;for(m=0;m<o.length;m++){k=n+h(o[m]);if(k>1000){break}else{n=k}}if(m==o.length){return o}else{return o.substring(0,m)}}g.lloadApps=function(o,n){if(null!=o.applist&&o.applist.length>0){var m=o.applist.split(",");var q=new e().eexecute(m,n);var k=o.sresptime||"";var p={cdrType:"uinotiftracingcdr",enable:true,storeData:false};var l={taskId:o.taskId,componentId:m[0],pageId:m[0],message:encodeURIComponent(encodeURIComponent(i(o.message||""))),sresptime:k,functionid:o.functionid};a.cdrService(p,l);top.tlbs.notificationCdrData=l}else{if(null!=n){n.resolve()}}};var e=function(){};e.prototype.eexecute=function(q,k){var m=0,l=q.length,p=0,o=q,k=k;var n=function(s){var t=o[p];var v=g.ctrlPageGroup[t];if(null!=v&&v.attr("lload")==0){v.attr("lload","1");var u={cdrType:"uidisplaycdr",enable:true,storeData:false};var r={pageId:t,displayType:1,displayResult:0};a.cdrService(u,r)}p=p+1;if(p==l&&null!=k){b(function(){k.resolve()})}};j(n,10,l,this.loadKey)}}],link:function(f,e,d,g){f.pageID=g.pageID;f.componentType="pvctrl";f.init()}}}]);
uiCore.directive("logodrag",["coreService",function(a){return{restrict:"A",controller:["$scope","$element","$attrs","$timeout","Const","coreService",function(h,i,g,d,b,c){h.cid=g.cid;var j=function(){var m=0,k=0,n=i[0];var o=top.window.innerHeight,l=top.window.innerWidth;if(o==undefined){o=top.document.documentElement.offsetHeight;l=top.document.documentElement.offsetWidth}while(n!=null){m+=n.offsetLeft;k+=n.offsetTop;n=n.offsetParent;bottomPos=o-k-i[0].offsetHeight;rightPos=l-m-i[0].offsetWidth}return{x:rightPos,y:bottomPos}};var f=function(){var p="ontouchstart" in document?"touchstart":"mousedown",n="ontouchmove" in document?"touchmove":"mousemove",u="ontouchend" in document?"touchend":"mouseup",q=false,s=false,m=true,r=0,v=0,l=false;i.parent().css({position:"fixed"});i.bind(p,function(y){y.preventDefault();y.stopPropagation();var x=j();var z=y.touches?y.touches[0].pageY:y.pageY;var B=y.touches?y.touches[0]:y,A={x:B.pageX,y:B.pageY};if(o()){return}if(!(/Windows NT/g.test(navigator.userAgent))){c.fireEvent(h.cid,"unlockLogoClick",null);t()}l=true;var C=function(E){E.preventDefault();E.stopPropagation();if(o()){return}k();if(!q){q=true}var F=E.touches?E.touches[0].pageY:E.pageY;var D=E.touches?E.touches[0]:E;if(Math.abs(F-z)<5){return}i.parent().css({right:x.x+A.x-D.pageX+"px",bottom:x.y+A.y-D.pageY+"px"});l=false;c.fireEvent(h.cid,"lockLogoClick",null)},w=function(D){r=i.parent().css("bottom"),v=i.parent().css("right");if((r==""&&v=="")||(r=="18px"&&v=="30px")){top.document.removeEventListener(n,C,false);top.document.removeEventListener(u,w,false);return}if(l){c.fireEvent(h.cid,"unlockLogoClick",null);t()}if(q){D.stopPropagation();D.preventDefault();q=false}top.document.removeEventListener(n,C,false);top.document.removeEventListener(u,w,false)};top.document.addEventListener(n,C,false);top.document.addEventListener(u,w,false)});var o=function(){s=i.parent().hasClass("state1");return s},t=function(){l=false;i.parent().css({bottom:"18px",right:"30px"})},k=function(){i.css({opacity:"1"})}},e=function(){f()};d(e,0)}],link:function(d,c,b){}}}]);
uiCore.directive("iresize",["$window","$interval",function(b,a){return{restrict:"A",replace:false,controller:["$scope","$element","$attrs",function(f,e,c){var d=angular.element(top.window);d.bind("resize",function(){f.$apply()});f.getWindowDimensions=function(){return{h:top.window.innerHeight,w:top.window.innerWidth}};f.$watch(f.getWindowDimensions,function(h,g){f.rresize()},true);f.prevWidth=0;f.prevHeight=0;f.currWidth=top.window.innerWidth;f.currHeight=top.window.innerHeight;f.rresize=function(){var h=360,j=320;f.currWidth=top.window.innerWidth;f.currHeight=top.window.innerHeight;var k=0,g=0;if(f.prevWidth==f.currWidth&&f.currHeight!=f.prevHeight&&Math.min(f.prevHeight,f.currHeight)/Math.max(f.prevHeight,f.currHeight)>=0.8){f.prevWidth=f.currWidth;f.prevHeight=f.currHeight;return}if(f.prevWidth==f.currWidth&&f.prevHeight==f.currHeight){return}if(f.currWidth<=f.currHeight){k=f.currWidth/j}else{k=f.currHeight/h}if(j*k>f.currWidth){k=f.currWidth/j}var i=k*18;i=i>27?27:i;e.css("font-size",i+"px");f.prevWidth=f.currWidth;f.prevHeight=f.currHeight}}]}}]);uiCore.directive("lresize",["$window","$interval",function(b,a){return{restrict:"A",replace:false,controller:["$scope","$element","$attrs",function(h,f,c){var e=angular.element(top.window);e.bind("resize",function(){h.$apply()});h.getWindowDimensions=function(){return{h:top.window.innerHeight,w:top.window.innerWidth,fs:parseFloat(top.window.getComputedStyle(f[0],null)["fontSize"]),width:(top.window.innerWidth||top.window.document.documentElement.clientWidth||top.window.document.body.clientWidth),height:(top.window.innerHeight||top.window.document.documentElement.clientHeight||top.window.document.body.clientHeight),ph:top.window.getComputedStyle(f.parent()[0]).height,pw:parseFloat(top.window.getComputedStyle(f.parent()[0]).width),cw:f.css("width")}};e.bind("scroll",function(){h.rresize()});h.$watch(h.getWindowDimensions,function(j,i){h.rresize()},true);var d=360,g=320;h.prevWidth=0;h.prevHeight=0;h.rresize=function(){if((top.window.innerWidth/top.document.documentElement.clientWidth)!=1){f.css("bottom",top.document.documentElement.clientHeight-(top.window.pageYOffset+top.window.innerHeight)+"px");f.css("position","absolute");if(f.css("width")!="0%"){f.css("right","-"+top.window.pageXOffset+"px")}else{if(top.window.pageXOffset==0){f.css("right",top.document.documentElement.clientWidth-top.window.innerWidth+"px")}else{if(top.window.pageXOffset>0){f.css("right","-"+top.window.pageXOffset+"px")}}}}else{h.setFontSize();f.css("position","fixed");f.css("bottom","0px");f.css("right","0px")}f.css("-webkit-transform","scale("+top.window.innerWidth/top.document.documentElement.clientWidth+")");f.css("-webkit-box-sizing","border-box");f.css("box-sizing","border-box");f.css("-webkit-transition","all 0.2s ease-in-out");f.css("-webkit-transform-origin","0 100%")};h.setFontSize=function(){h.currWidth=top.window.innerWidth;h.currHeight=top.window.innerHeight;var k=0,i=0;if(h.prevWidth==h.currWidth&&h.currHeight!=h.prevHeight&&Math.min(h.prevHeight,h.currHeight)/Math.max(h.prevHeight,h.currHeight)>=0.8){h.prevWidth=h.currWidth;h.prevHeight=h.currHeight;return}if(h.prevWidth==h.currWidth&&h.prevHeight==h.currHeight){return}if(h.currWidth<=h.currHeight){k=h.currWidth/g}else{k=h.currHeight/d}if(g*k>h.currWidth){k=h.currWidth/g}var j=k*18;f.css("font-size",j+"px");h.prevWidth=h.currWidth;h.prevHeight=h.currHeight;h.prevWidth=h.currWidth;h.prevHeight=h.currHeight}}]}}]);
uiCore.directive("iappbuttonholder",["coreService","coreUtils","$timeout","Const","$window",function(j,g,f,i,h){return{restrict:"AE",replace:true,template:'<div ng-style="compData.CSS" ><div ng-style="compData.JS.appbuttoncontainer.CSS"><div  ng-style="compData.JS.appbutton.CSS" ng-repeat="apps in compData.JS.dataset | limitTo:compData.JS.maxcount" id="news_app_{{$index}}" ng-click="compData.JS.clickable?handleClick({{$index}}):clickDisable();$event.stopPropagation();"><imageholder cid="appimage" dynamicproperties="{\'CSS\':{\'background-image\':apps.imageurl}}" param="compData.JS.appbutton.JS.imageconfig"></imageholder><irichtext cid="apptext" param="settextdata(compData.JS.appbutton.JS.textconfig,apps.title)"></irichtext></div></div></div>',scope:{param:"=param"},require:"^pid",controller:["$scope","$element","$attrs",function(a,b,c){a.cid=c.cid;a.index=0;a.maxindex=0;a.eventMap={};a.imageset={};a.compData={};a.handleClick=function(d){d=a.compData.JS.dataset[d].weblink;if(null!=d&&d.length!=0){j.commonServiceRef.dynamicService(null,{serviceType:"urlservice",openurl:d})}};a.clickDisable=function(){};a.settextdata=function(d,e){d.JS.textdata=e;return d};a.extendComponentData=function(d){a.compData=g.extendDeep(a.compData,d);f(function(){a.$apply()})};a.init=function(){j.registerComponentInstance(a.cid,a);a.extendComponentData(j.getInitProperties(a.cid));a.maxindex=a.compData.JS.maxcount;this.setNewsappData(window.newsparam)};a.setNewsappData=function(d){if(a.compData.JS.newsappsConfigRespPath){a.compData.JS.dataset=g.transfer(d,a.compData.JS.newsappsConfigRespPath)}if(null!=a.compData.JS.dataset&&a.compData.JS.dataset.length<a.compData.JS.maxcount){a.maxindex=a.compData.JS.dataset.length}};a.eventMap.setNewsappData=a.setNewsappData;a.$on(a.cid+"_handleEvent",function(d,m,e,n){a.eventMap[m](e,n)})}],link:function(b,c,d,a){b.pageID=d.ppageid||a.pageID;b.componentType="iappbuttonholder";b.init()}}}]);
uiCore.directive("ibutton",["coreService","coreUtils","$timeout",function(c,a,b){return{restrict:"EA",replace:true,require:"^pid",scope:{param:"=param"},template:'<div ng-click="compData.JS.clickable?handleClick():clickDisable();$event.stopPropagation();" {{param}}><div id="buttontextdiv">{{compData.JS.buttontext}}<div></div>',controller:["$scope","$element","$attrs","coreService","coreUtils",function(g,f,e,h,d){g.cid=e.cid;g.eventMap={};g.compData={CSS:{},JS:{buttontext:"",clickable:false,stateconfig:{state:0,state0:{},state1:{}},buttontextstyle:{CSS:{"font-size":"0.8em"},JS:{}}}};g.handleClick=function(){h.fireEvent(g.cid,"click"+g.compData.JS.stateconfig.state)};g.clickDisable=function(){};g.$on(e.cid+"_handleEvent",function(k,l,j,i){if(g.eventMap[l]){g.eventMap[l](j);if(null!=i){i.resolve()}}});g.extendComponentData=function(i){g.compData=d.extendDeep(g.compData,i);b(function(){g.$apply()})};g.init=function(){g.compData=g.param;g.applyStyle()};g.$watch(g.param,function(i){if(g.param){g.compData=g.param;g.applyStyle()}});g.applyStyle=function(){if(null!=g.compData.JS.stateconfig["state"+g.compData.JS.stateconfig.state]){d.extendDeep(g.compData.CSS,g.compData.JS.stateconfig["state"+g.compData.JS.stateconfig.state])}f.css(g.compData.CSS);angular.element(f[0].querySelector('[id="buttontextdiv"]')).css(g.compData.JS.buttontextstyle.CSS)}}],link:function(g,e,d,f){g.pageID=f.pageID;g.componentType="ibutton";g.init()}}}]);
uiCore.directive("pid",function(){return{restrict:"A",replace:false,controller:["$scope","$element","$attrs",function(c,b,a){this.pageID=a.pid}]}});
uiCore.directive("ipage",function(){return{restrict:"AE",replace:false,scope:{},templateUrl:function(b,a){if(null!=a.lload&&a.lload==0){return"empty"}else{return a.templateurl||""}},controller:["$scope","$element","$attrs","$compile","$templateCache",function(d,c,b,e,a){d.loadState=c.attr("lload")|0;if(null!=c.attr("lload")){var f=d.$watch(function(){return c.attr("lload")},function(){var g=c.attr("lload");if(null!=g&&1==g&&0==d.loadState){var h=a.get(b.templateurl);c.html(h);e(c.contents())(d);d.loadState=1;f()}},true)}}],link:function(c,b,a){}}});
uiCore.directive("idivholder",["coreService","coreUtils","$timeout",function(c,a,b){return{restrict:"AE",replace:true,transclude:true,template:"<div {{param}} ng-transclude></div>",scope:{param:"=param"},require:"^pid",controller:["$scope","$element","$attrs",function(f,e,d){f.cid=d.cid;f.eventMap={};f.compData={CSS:{},JS:{clickable:false,animation:false,clickevent:"",stateconfig:{state:0,state0:{},state1:{}}}};f.extendComponentData=function(g){f.compData=a.extendDeep(f.compData,g)};f.init=function(){c.registerComponentInstance(f.cid,f);f.extendComponentData(c.getInitProperties(f.cid))};f.getHolderStyle=function(){if(null!=f.compData.JS.stateconfig["state"+f.compData.JS.stateconfig.state]){return a.extendDeep(f.compData.CSS,f.compData.JS.stateconfig["state"+f.compData.JS.stateconfig.state])}};f.handleClick=function(){c.fireEvent(f.cid,(f.compData.JS.clickevent||"")+"click"+f.compData.JS.stateconfig.state)};f.clickDisable=function(){};f.changeState=function(h,g){if(null!=h&&null!=h.cstate){if(f.compData.JS.stateconfig.state!=h.cstate){f.compData.JS.stateconfig.state=h.cstate;f.applyStyle();f.$evalAsync(function(){if(null!=g){if(f.compData.JS.animation){if(top.tlbs.isTransitionSupported){e.on(top.tlbs.transitionendEvent,function(i){g.resolve()})}else{g.resolve()}}else{g.resolve()}}})}else{if(null!=g){g.resolve()}}}};f.applyStyle=function(){if(null!=f.compData.JS.stateconfig["state"+f.compData.JS.stateconfig.state]){a.extendDeep(f.compData.CSS,f.compData.JS.stateconfig["state"+f.compData.JS.stateconfig.state])}e.css(f.compData.CSS)};f.changeExtraState=function(h,g){if(null!=h&&null!=h.cstate){f.compData.CSS=a.extendDeep(f.compData.CSS,f.compData.JS.stateconfig["state"+h.cstate]);f.applyStyle()}};f.eventMap.changeState=f.changeState;f.eventMap.changeExtraState=f.changeExtraState;f.$on(f.cid+"_handleEvent",function(j,h,i,g){f.eventMap[h](i,g)});f.$on("stateChange",function(g){f.applyStyle()});f.$watch(f.param,function(g){if(f.param){f.compData=f.param;f.applyStyle()}})}],link:function(f,e,d,g){f.pageID=g.pageID;f.componentType="idivholder";f.init()}}}]);
uiCore.directive("ifit",["$window","coreService",function(a){return{restrict:"A",replace:false,controller:["$scope","$element","$attrs","$window",function(e,d,b,g,f){var c=angular.element(top.window);e.getDimentions=function(){return{width:(top.window.innerWidth||top.window.document.documentElement.clientWidth||top.window.document.body.clientWidth),height:(top.window.innerHeight||top.window.document.documentElement.clientHeight||top.window.document.body.clientHeight),h:top.window.innerHeight,w:top.window.innerWidth,ph:top.window.getComputedStyle(d.parent()[0]).height,pw:parseFloat(top.window.getComputedStyle(d.parent()[0]).width),fs:parseFloat(top.window.getComputedStyle(d[0],null)["fontSize"])}};e.$watch(e.getDimentions,function(j,h){e.rresize()},true);e.rresize=function(){var j=e.getDimentions();var m=d.attr("ifit");var q=!isNaN(parseFloat(m))&&isFinite(m);var r=j.fs;var l=j.pw;if(!q){if(l>0){var o=0;var n=d.parent().children();for(i=0;i<n.length;i++){var h=n[i];if(null==h.attributes.ifit){o+=parseFloat(top.window.getComputedStyle(h).width)}}var p=o/r;if(m=="bnBar"){d.css("width",(((l/r)-p)-1)+"em")}else{d.css("width",((l/r)-p)+"em")}}}else{var k=j.width;if(m==0){d.css("width",(k/r)+"em")}else{if(l>0){d.css("width",((l/r)-m)+"em")}}}};e.$watch(function(){return d.attr("ifit")},function(h){e.rresize()});c.bind("resize",function(){e.$apply()})}]}}]);
uiCore.directive("imageholder",["coreService","coreUtils","$timeout",function(c,a,b){return{restrict:"AE",replace:true,template:'<div ng-click="compData.JS.clickable && handleClick();$event.preventDefault();compData.JS.stopp && $event.stopPropagation()" {{param}}></div>',scope:{param:"=param",dynamicproperties:"=dynamicproperties"},require:"^pid",controller:["$scope","$element","$attrs",function(f,e,d){f.cid=d.cid;f.eventMap={};f.compData={CSS:{},JS:{clickable:false,stopp:false,stateconfig:{state:0,state0:{},state1:{}},cdrConfig:{uitracingcdr:{cdrType:"uitracingcdr",enable:true,storeData:false}}}};var g=[];var h=function(i){if(!i.pid||!i.cid||!i.event){return}g.push(i)};f.changeState=function(j,i){if(null!=j&&null!=j.cstate){if(f.compData.JS.stateconfig.state!=j.cstate){f.compData.JS.stateconfig.state=j.cstate;f.applyStyle();f.$evalAsync(function(){if(null!=i){if(f.compData.JS.animation){if(top.tlbs.isTransitionSupported){e.on(top.tlbs.transitionendEvent,function(k){i.resolve()})}else{i.resolve()}}else{i.resolve()}}})}}else{if(null!=i){i.resolve()}}};f.handleClick=function(){a.recordTracingCdr(f.pageID,f.cid,f.compData.JS.cdrConfig);c.fireEvent(f.cid,"click"+f.compData.JS.stateconfig.state);var k;for(var j in g){k=g[j];c.fireEvent(k.pid+"_"+k.cid,k.event)}g.length=0};f.extendComponentData=function(i){f.compData=a.extendDeep(f.compData,i)};f.eventMap.changeState=f.changeState;f.eventMap.addClickListener=h;f.$on(f.cid+"_handleEvent",function(l,j,k,i){f.eventMap[j](k);if(null!=i){i.resolve()}});f.init=function(){c.registerComponentInstance(f.cid,f);f.extendComponentData(c.getInitProperties(f.cid));f.$watch(f.dynamicproperties,function(i){if(f.dynamicproperties){f.update()}});f.applyStyle()};f.update=function(){if(typeof f.dynamicproperties=="string"){f.dynamicproperties=a.String2JSON(f.dynamicproperties)}if(f.dynamicproperties.CSS["background-image"]!=""){e.css({"background-image":'url("'+f.dynamicproperties.CSS["background-image"]+'")'})}};f.applyStyle=function(){if(null!=f.compData.JS.stateconfig["state"+f.compData.JS.stateconfig.state]){a.extendDeep(f.compData.CSS,f.compData.JS.stateconfig["state"+f.compData.JS.stateconfig.state])}e.css(f.compData.CSS)};f.$on("stateChange",function(i){f.applyStyle()});d.$observe("statechange",function(i){if(f.param){f.compData=f.param;f.applyStyle()}});f.$watch(f.param,function(i){if(f.param){f.compData=f.param;f.applyStyle()}})}],link:function(f,e,d,g){f.pageID=g.pageID;f.componentType="imageholder";f.init()}}}]);
uiCore.directive("percentage",function(){return{restrict:"EA",replace:true,scope:{percent:"=",},require:"^pid",template:"<div class='ui-com-percentage'><div class='ui-com-percentage-value'></div><div class='ui-com-percentage-image'></div></div>",controller:["$scope","$element","$attrs","coreService","$timeout","coreUtils",function(d,c,b,f,e,a){d.setPercent=function(g){d.percent=g};d.showPercentage=function(){d.jsProp.styleSet=a.String2JSON(b.styleset);angular.element(c[0].querySelector(".ui-com-percentage-value")).css({"background-color":d.getPercentageColor().activecolor,width:d.percent+"%"});if((b.showpercentageimage=="true")&&(d.getPercentageColor().activeimage)){angular.element(c[0].querySelector(".ui-com-percentage-image")).css({"background-image":d.getPercentageColor().activeimage,left:(d.percent-1)+"%"})}};d.getPercentageColor=function(){var g=undefined;for(p in d.jsProp.styleSet){var h=p.split("_");if(h.length>0){if(parseInt(h[0])<=d.percent&&d.percent<=parseInt(h[1])){return d.jsProp.styleSet[p]}}}return d.jsProp.styleSet.defaultset.activecolor};d.init=function(){var k={},h=f.getInitProperties(b.cid)||{},l=h.JS||{},i=h.CSS||{},j=a.String2JSON(b.jsdata),g=a.String2JSON(b.cssdata);d.jsProp=a.extendDeep(k,l,j);d.cssProp=a.extendDeep(i,g);c.css(d.cssProp);e(d.showPercentage,0)}}],link:function(d,b,a,c){d.pageID=c.pageID;d.componentType="percentage";d.init()}}});
uiCore.directive("logodock",function(){return{restrict:"A",controller:["$scope","$element","$attrs","$timeout","$window","coreService","coreUtils",function(r,p,h,B,n,w,d){var f=300;var A=function(){return{width:(top.window.innerWidth||top.window.document.documentElement.clientWidth||top.window.document.body.clientWidth),height:(top.window.innerHeight||top.window.document.documentElement.clientHeight||top.window.document.body.clientHeight)}};r.moved=false;var b=A().height,o=0;var l=angular.element,s=angular.copy,v=angular.forEach,m=angular.isString,x=angular.extend;var g,c,j=0;var e={stopPropagation:false,shouldBlurOnDrag:false},u=function(D,C){D.delta=k(C,D.pos);D.distance=k(C,D.origin);D.pos={x:C.x,y:C.y};D.updatedAt=Date.now()},k=function(C,E){var D={x:C.x-E.x,y:C.y-E.y};D.magnitude=Math.sqrt(D.x*D.x+D.y*D.y);return D},q=function(C){return C&&(C.tagName==="INPUT"||C.tagName==="SELECT"||C.tagName==="TEXTAREA")},i=function(C){return{origin:{x:C.x,y:C.y},pos:{x:C.x,y:C.y},distance:{x:0,y:0,magnitude:0},delta:{x:0,y:0,magnitude:0},startedAt:Date.now(),updatedAt:Date.now(),stopped:false,active:true}},z=function(E){b=A().height;o=parseFloat(top.window.getComputedStyle(p[0]).height);E=E.originalEvent||E;var D=l(E.target||E.srcElement);e.stopPropagation&&E.stopPropagation();var C=E.touches?E.touches[0]:E;if(e.shouldBlurOnDrag&&q(D)){document.activeElement&&document.activeElement.blur()}self.state=i({x:C.clientX,y:C.clientY})},y=function(E){E=E.originalEvent||E;if(null!=self.state&&self.state.active){r.moved=true;E.preventDefault();e.stopPropagation&&E.stopPropagation();var C=E.touches?E.touches[0]:E;C={x:C.clientX,y:C.clientY};var D=Date.now()-self.state.updatedAt;if(D>f){self.state=i(C)}u(self.state,C);if(self.state.pos.y<=0){p.parent().parent().css({top:"0px"})}else{if(self.state.pos.y<=(b-o)&&self.state.pos.y>o){p.parent().parent().css({top:self.state.pos.y+"px"})}}w.commonServiceRef.schedulerService({on:"autoclose"},{cycle:"1",interval:"5000",start:"2"})}},t=function(C){if(null!=self.state&&self.state.active&&null!=self.state.distance&&r.moved==true){r.moved=false;C=C.originalEvent||C;e.stopPropagation&&C.stopPropagation();var D=top.tlbs.dockPosition||false;if(self.state.pos.y>=(b/2)){if(D){w.fireEvent(p.attr("cid"),"moveBottom",{});top.tlbs.dockPosition=false;var E={on:"toolbardockupdate"};w.commonServiceRef.remoteService(E,{dockposition:false})}p.parent().parent().css({bottom:"0px",top:"initial"})}else{if(!D){w.fireEvent(p.attr("cid"),"moveTop",{});top.tlbs.dockPosition=true;var E={on:"toolbardockupdate"};w.commonServiceRef.remoteService(E,{dockposition:true})}p.parent().parent().css({top:"0px",bottom:"initial"})}self.state.updatedAt=Date.now();self.state.stopped=(self.state.updatedAt-self.state.startedAt)>f;self.state={}}},a=function(){p.bind("touchstart",z);p.bind("touchmove",y);p.bind("touchend touchcancel",t);p.bind("mousedown",z);p.bind("mousemove",y);p.bind("mouseup mouseout",t)};B(a,0)}],link:function(c,b,a){}}});
uiCore.directive("iradioselectiondiv",["coreService","coreUtils","$timeout",function(c,a,b){return{restrict:"EA",replace:false,require:"^pid",scope:{param:"=param"},template:'<div ng-style="compData.CSS"><div ng-click="handleClick({{$index}});$event.stopPropagation();"  ng-style="compData.JS.radiobutton.CSS"  ng-repeat="key in compData.JS.dataset" id="radio_options_{{$index}}" >{{key.name}}</div></div>',controller:["$scope","$element","$attrs","coreService","coreUtils",function(g,f,e,h,d){g.cid=e.cid;g.index=0;g.eventMap={};g.compData={};g.handleClick=function(j){g.changeState(j)};g.changeState=function(j){g.index=j;var k=f[0].querySelector("#radio_options_"+j);for(i=0;i<=f.children().children().length-1;i++){angular.element(f[0].querySelector("#radio_options_"+i)).css(g.compData.JS.radiobutton.JS.inactiveCSS)}angular.element(k).css(g.compData.JS.radiobutton.JS.activeCSS);g.compData.JS.selectedValue=g.compData.JS.dataset[g.index]};g.clickDisable=function(){};g.extendComponentData=function(j){g.compData=d.extendDeep(g.compData,j);b(function(){g.$apply()})};g.init=function(){h.registerComponentInstance(f.attr("cid"),g);g.extendComponentData(h.getInitProperties(g.cid))};g.setSelectionValue=function(j){if(g.compData.JS.selectionConfigRespPath){g.compData.JS.dataset=d.transfer(j,g.compData.JS.selectionConfigRespPath)}b(function(){g.$apply();g.changeState(0)})};g.eventMap.setSelectionValue=g.setSelectionValue;g.$on(g.cid+"_handleEvent",function(m,k,l,j){g.eventMap[k](l,j)})}],link:function(g,e,d,f){g.pageID=f.pageID;g.componentType="iradioselectiondiv";g.init()}}}]);
uiCore.directive("tbparentisolator",[function(){return{restrict:"AE",controller:["$scope","$element","$attrs",function(l,j,e){var c=300;var h=angular.element,m=angular.copy,o=angular.forEach,i=angular.isString,p=angular.extend;var d,a,g=0;var b={stopPropagation:false,shouldBlurOnDrag:true},k=function(s){return s&&(s.tagName==="INPUT"||s.tagName==="SELECT"||s.tagName==="TEXTAREA")},f=function(s){return{origin:{x:s.x,y:s.y},pos:{x:s.x,y:s.y},distance:{x:0,y:0,magnitude:0},delta:{x:0,y:0,magnitude:0},startedAt:Date.now(),updatedAt:Date.now(),stopped:false,active:true}},q=function(u){u=u.originalEvent||u;var t=h(u.target||u.srcElement);b.stopPropagation&&u.stopPropagation();var s=u.touches?u.touches[0]:u;if(b.shouldBlurOnDrag&&k(t)){document.activeElement&&document.activeElement.blur()}self.state=f({x:s.pageX,y:s.pageY})},r=function(t){t=t.originalEvent||t;var s=t.target;if(null!=self.state&&self.state.active&&!k(s)){t.preventDefault()}},n=function(s){if(null!=self.state&&self.state.active){s=s.originalEvent||s;b.stopPropagation&&s.stopPropagation();self.state={}}};j.bind("touchstart",q);j.bind("touchmove",r);j.bind("touchend touchcancel",n)}]}}]);
uiCore.directive("hscroll",function(){return{restrict:"A",controller:["$scope","$element","$attrs","$timeout","Const",function(m,n,k,d,b){var c,e,l=0,f=angular.element('<div style="height:100%;overflow:hidden;"></div>'),a=function(){c=n.children();minWidth=parseInt(top.window.getComputedStyle(n[0],null)["width"]);e=angular.element('<div class="ui-com-hscroll-wrapper" style="height:100%;"></div>');g();e.append(c);f.append(e);n.append(f);if(m.hscrollType=="1"){n.append('<div class="ui-com-hscroll-left-arrow"></div><div  class="ui-com-hscroll-right-arrow"></div>')}},g=function(){var o=0;style=null;for(var p=0;p<c.length;p++){style=top.window.getComputedStyle(c[p],null);o+=c[p].offsetWidth+parseInt(style.marginLeft)+parseInt(style.marginRight)}if(o<minWidth){o=minWidth}var q=parseInt(top.window.getComputedStyle(n[0],null)["fontSize"]);e.css("width",(o/q)+"em")},i=function(){},h=function(){var p=b.touchEvent.start,o=b.touchEvent.move,q=b.touchEvent.end;f.bind(p,function(u){g();var s=parseInt(top.window.getComputedStyle(n[0],null)["fontSize"]);var x=u.touches?u.touches[0].pageX:u.pageX,t=u.target,w=function(A){var y=A.touches?A.touches[0].pageX:A.pageX;var z=y-x;x=y;f[0].scrollLeft-=z;if(m.hscrollType=="1"){if(parseInt(f[0].scrollLeft)<=0){angular.element(n[0].querySelector(".ui-com-hscroll-right-arrow")).css("opacity","1.15")}else{if(parseInt(f[0].offsetWidth+f[0].scrollLeft)+2>=e[0].offsetWidth){angular.element(n[0].querySelector(".ui-com-hscroll-left-arrow")).css("opacity","1.15")}else{angular.element(n[0].querySelector(".ui-com-hscroll-left-arrow")).css("opacity","1.15");angular.element(n[0].querySelector(".ui-com-hscroll-right-arrow")).css("opacity","1.15")}}}},v=function(y){},r=function(y){angular.element(n[0].querySelector(".ui-com-hscroll-left-arrow")).css("opacity","0");angular.element(n[0].querySelector(".ui-com-hscroll-right-arrow")).css("opacity","0");top.document.removeEventListener(o,w,false);top.document.removeEventListener(q,r,false)};top.document.addEventListener(o,w,false);top.document.addEventListener(q,r,false)})},j=function(){h();a()};d(j,0)}],link:function(d,e,b){d.hscrollType=b.hscrolltype;var g=e[0].offsetLeft;var c=e[0].offsetTop;var a=e[0].offsetWidth;var f=e[0].offsetHeight}}});
uiCore.directive("vscroll",function(){return{restrict:"A",controller:["$scope","$element","$attrs","$timeout","Const",function(m,n,k,e,b){var d,f,l=0,h=0;var c=/preto/i.test(navigator.userAgent)||/opera/i.test(navigator.userAgent);var a=function(){d=n.children();f=angular.element('<div class="ui-com-vscroll-wrapper"></div>');f.append(d);n.append(f)},i=function(){l=parseInt(top.window.getComputedStyle(n[0],null)["height"]);h=0;style=null;for(var o=0;o<d.length;o++){style=top.window.getComputedStyle(d[o],null);h+=d[o].offsetHeight+parseInt(style.marginTop)+parseInt(style.marginBottom)}h=h+12;if(h<l){h=l}var p=parseInt(top.window.getComputedStyle(n[0],null)["fontSize"]);f.css("height",h/p+"em")},g=function(){var r=b.touchEvent.start;var q=b.touchEvent.move;var s=b.touchEvent.end;var p=0;var o=false;n.bind(r,function(x){i();var u=f[0].style.webkitTransform||f[0].style.mozTransform||f[0].style.msTransform||f[0].style.msTransform||f[0].style.oTransform;if(u){p=u.split(",")[1]&&parseInt(u.split(",")[1])}else{p=0}var v=x.touches?x.touches[0].pageY:x.pageY,w=x.target,y=function(A){var B=A.touches?A.touches[0].pageY:A.pageY;var z=B-v;if(Math.abs(z)>3){if(!o){o=true}A.stopPropagation();A.preventDefault()}v=B;p+=z;if(p>0){p=0}else{if(h+p<l){p=l-h}}if(c){f.css("-o-transform","translate(0,"+p+"px)");f.css("transform","translate(0,"+p+"px)")}else{f.css("-webkit-transform","translate3d(0,"+p+"px,0)");f.css("-moz-transform","translate3d(0,"+p+"px,0)");f.css("-o-transform","translate3d(0,"+p+"px,0)");f.css("-ms-transform","translate3d(0,"+p+"px,0)");f.css("transform","translate3d(0,"+p+"px,0)")}},t=function(z){if(o){z.stopPropagation();z.preventDefault();o=false}top.document.removeEventListener(q,y,false);top.document.removeEventListener(s,t,false)};top.document.addEventListener(q,y,false);top.document.addEventListener(s,t,false)})},j=function(){g();a()};e(j,0)}],link:function(c,b,a){}}});
uiCore.directive("wscroll",function(){return{restrict:"A",controller:["$scope","$element","$attrs","$timeout","Const",function(t,q,i,x,m){t.$watch(function(){if(v){return angular.element(v)[0].offsetHeight}},function(C,B){if(e){if(A()){angular.element(e).css("display","block");angular.element(v).css("margin-top","0px");d.css("top","0px");d.css("height",u()+"px")}else{angular.element(e).css("display","none")}}});var h,c,k=0,w=0,s=false,g,v,d,e;var y=/preto/i.test(navigator.userAgent)||/opera/i.test(navigator.userAgent);var j=function(){h=q.children();c=angular.element('<div class="ui-com-wscroll-wrapper"></div>');c.append(h);q.append(c)},l=function(){h=q.children();scrollbarDiv=angular.element('<div class="ngscrollbar-container-y"><div class="ngscrollbar-y"></div></div>');angular.element(h[0]).append(scrollbarDiv)},p=function(){g=angular.element(h[0]);var B=g.children();v=B[0];e=B[1];d=angular.element(e.querySelector(".ngscrollbar-y"))},r=function(){return angular.element(v)[0].offsetHeight},n=function(){return angular.element(g)[0].offsetHeight},o=function(B){if(Math.abs(parseInt(B))<r()-n()){return true}else{return false}},A=function(){return r()>n()},u=function(){return Math.pow(n(),2)/r()},f=function(){if(A()){angular.element(e).css("display","block");d.css("height",u()+"px")}else{angular.element(e).css("display","none")}},b=function(B){angular.element(v).css("margin-top",B+"px");d.css("top",-B/r()*n()+"px")},z=function(){q.on("wheel",function(C){C.preventDefault();C.stopPropagation();var B=parseInt(angular.element(v).css("margin-top"),10);if(C.deltaY>0){B=B-10}else{B=B+10}if(B>0){return}if(!o(B)){return}b(B)})},a=function(){z();j();l();p();u()};x(a,0)}],link:function(c,b,a){}}});
uiCore.directive("sscroll",function(){return{restrict:"A",controller:["$scope","$element","$attrs","$timeout","$window","coreService",function(k,d,D,u,G,C){var A=angular.element(top.window);var h=D.sscroll;var y=("h"==h);var g=("v"==h);var a=("hi"==h);var s=300;var I=angular.element,K=angular.copy,b=angular.forEach,i=angular.isString,j=angular.extend;var m,J,x,q=0;var r={stopPropagation:false,shouldBlurOnDrag:true},p=function(){m=d.children();if(a){J=angular.element(m[0]).children()}else{J=m}x=angular.element('<div id="sscrolldiv" style="height:100%;width:100%;overflow:hidden;" hwidth="0"></div>');if(D.reverse){x.css("float","right")}x.append(m);d.append(x);if(a){angular.element(d.parent()[0]).append('<div class="ui-com-hscroll-left-arrow"></div><div  class="ui-com-hscroll-right-arrow"></div>')}},n=function(V){var M=top.window.getComputedStyle(V);var S=parseInt(M.getPropertyValue("margin-top"),10)+parseInt(M.getPropertyValue("padding-top"),10);var Q=parseInt(M.getPropertyValue("margin-left"),10)+parseInt(M.getPropertyValue("padding-left"),10);var R=parseInt(M.getPropertyValue("margin-right"),10)+parseInt(M.getPropertyValue("padding-right"),10);var O=parseInt(M.getPropertyValue("margin-bottom"),10)+parseInt(M.getPropertyValue("padding-bottom"),10);var T=parseInt(M.getPropertyValue("top"),10);var L=parseInt(M.getPropertyValue("bottom"),10);var P=parseInt(M.getPropertyValue("left"),10);var U=parseInt(M.getPropertyValue("right"),10);var w=parseInt(M.getPropertyValue("border-right-width"),10);var X=parseInt(M.getPropertyValue("border-left-width"),10);var W=parseFloat(M.getPropertyValue("height"),10);var N=parseFloat(M.getPropertyValue("width"),10);return{top:S+(isNaN(T)?0:T),bottom:O+(isNaN(L)?0:L),height:W,width:N,left:Q+(isNaN(P)?0:P)-(isNaN(X)?0:X),right:R+(isNaN(U)?0:U)-(isNaN(w)?0:w)}},z=function(){if(null!=m){var M=0;var N=parseFloat(top.window.getComputedStyle(d[0],null)["fontSize"]);for(var L=0;L<J.length;L++){var w=n(J[L]);M+=(w.height+w.top+w.bottom)}x.css("height",M/N+"em")}},H=function(){if(null!=m){var L=0;var P=parseFloat(top.window.getComputedStyle(d[0],null)["fontSize"]);for(var N=0;N<J.length;N++){var w=n(J[N]);L+=(w.width+w.left+w.right)}if(L==0&&a){var M=d.children().children().children();for(var N=0;N<M.length;N++){var w=n(M[N]);L+=(w.width+w.left+w.right)}L+=0.3}if(L>0){var O=x.attr("hwidth");x.attr("hwidth",L);x.css("width",(L/P)+"em")}}},B=function(L,w){L.delta=v(w,L.pos);L.distance=v(w,L.origin);L.pos={x:w.x,y:w.y};L.updatedAt=Date.now()},v=function(w,M){var L={x:w.x-M.x,y:w.y-M.y};L.magnitude=Math.sqrt(L.x*L.x+L.y*L.y);return L},o=function(w){return w&&(w.tagName==="INPUT"||w.tagName==="SELECT"||w.tagName==="TEXTAREA")},l=function(w){return{origin:{x:w.x,y:w.y},pos:{x:w.x,y:w.y},distance:{x:0,y:0,magnitude:0},delta:{x:0,y:0,magnitude:0},startedAt:Date.now(),updatedAt:Date.now(),stopped:false,active:true}},e=function(M){M=M.originalEvent||M;var L=I(M.target||M.srcElement);r.stopPropagation&&M.stopPropagation();var w=M.touches?M.touches[0]:M;if(r.shouldBlurOnDrag&&o(L)){document.activeElement&&document.activeElement.blur()}self.state=l({x:w.pageX,y:w.pageY});if(a){c()}},f=function(M){M=M.originalEvent||M;if(null!=self.state&&self.state.active){M.preventDefault();r.stopPropagation&&M.stopPropagation();var w=M.touches?M.touches[0]:M;w={x:w.pageX,y:w.pageY};var L=Date.now()-self.state.updatedAt;if(L>s){self.state=l(w)}B(self.state,w);if(y||a){d[0].scrollLeft-=self.state.delta.x}if(g){d[0].scrollTop-=self.state.delta.y}if(a){c();C.commonServiceRef.schedulerService({on:"autoclose"},{cycle:"1",interval:"5000",start:"2"})}}},F=function(w){if(null!=self.state&&self.state.active){w=w.originalEvent||w;r.stopPropagation&&w.stopPropagation();self.state.updatedAt=Date.now();self.state.stopped=(self.state.updatedAt-self.state.startedAt)>s;self.state={};if(a){t()}}},E=function(){p();if(y||a){H()}if(g){z()}d.bind("touchstart",e);d.bind("touchmove",f);d.bind("touchend touchcancel",F);d.bind("mousedown",e);d.bind("mousemove",f);d.bind("mouseup mouseout",F)},c=function(){var M=top.window.getComputedStyle(d[0]);var N=parseInt(M.getPropertyValue("border-right-width"),10);var w=parseInt(M.getPropertyValue("border-left-width"),10);if((d[0].offsetWidth-N-w)<x[0].offsetWidth){var L=n(d[0]);if(parseFloat(d[0].scrollLeft)<=0){angular.element(d.parent()[0].querySelector(".ui-com-hscroll-right-arrow")).css({opacity:"1.15",display:"block"});angular.element(d.parent()[0].querySelector(".ui-com-hscroll-left-arrow")).css({opacity:"0",display:"none"})}else{if(parseFloat(L.width+L.left+L.right+d[0].scrollLeft+2)>=x[0].offsetWidth){angular.element(d.parent()[0].querySelector(".ui-com-hscroll-left-arrow")).css({opacity:"1.15",display:"block"});angular.element(d.parent()[0].querySelector(".ui-com-hscroll-right-arrow")).css({opacity:"0",display:"none"})}else{angular.element(d.parent()[0].querySelector(".ui-com-hscroll-left-arrow")).css({opacity:"1.15",display:"block"});angular.element(d.parent()[0].querySelector(".ui-com-hscroll-right-arrow")).css({opacity:"1.15",display:"block"})}}}},t=function(){angular.element(d.parent()[0].querySelector(".ui-com-hscroll-left-arrow")).css({opacity:"0",display:"none"});angular.element(d.parent()[0].querySelector(".ui-com-hscroll-right-arrow")).css({opacity:"0",display:"none"})};k.getParentDimentions=function(){if(null!=m){return{h:top.window.getComputedStyle(d[0]).height,w:top.window.getComputedStyle(d[0]).width}}return{}};k.$watch(k.getParentDimentions,function(L,w){if(y||a){H()}if(g){z()}},true);u(E,0)}],link:function(c,b,a){}}});
uiCore.directive("idropdown",["coreService","coreUtils","$timeout",function(c,a,b){return{restrict:"EA",replace:true,require:"^pid",scope:{param:"=param"},template:'<div><horizontal-container param="compData.JS.outerContainer"><horizontal-container  param="compData.JS.innerContainer" ng-show="compData.JS.supportMap"><div><select ng-click="handleSelectClick($event);" ng-change="handleOptionClick();" ng-style="compData.CSS" ng-model="compData.JS.selectedValue" ng-options="key.{{compData.JS.dataValue}} for key in compData.JS.Dataset" ></select></div></horizontal-container><horizontal-container  param="compData.JS.innerContainer" ng-show="compData.JS.supportListArray"><div><select ng-click="handleSelectClick($event);" ng-change="handleOptionClick();" ng-style="compData.CSS" ng-model="compData.JS.selectedValue" ng-options="key as key for key in compData.JS.Dataset" ></select></div></horizontal-container></horizontal-container></div>',controller:["$scope","$element","$attrs","coreService","coreUtils",function(g,f,e,h,d){g.cid=e.cid;g.eventMap={};g.compData={CSS:{},JS:{supportMap:true,supportListArray:false,dataValue:"langname",dataKey:"langid",clickable:false,Dataset:{},selectedValue:"0",getSelectedValue:"",stateconfig:{state:0,state0:{},state1:{}},outerContainer:{CSS:{display:"table-cell","vertical-align":"middle"},JS:{outerContainer:{border:"none","box-shadow":"none",display:"flex",extendable:false,height:"1em",position:"relative",width:"100%"},type:"outerContainer"}},innerContainer:{CSS:{"background-size":"auto auto","background-origin":"padding-box","background-attachment":"scroll",overflow:"hidden","background-color":"transparent",margin:"0",padding:"0","background-repeat":"repeat-x","background-position":"0px bottom","background-clip":"border-box"},JS:{innerContainer:{border:"none","box-shadow":"none",display:"table",extendable:false,height:"1em",position:"relative",margin:"0 auto"},type:"innerContainer"}},dataMapping:"respparam.usrPref.templateLangList",},};g.handleSelectClick=function(i){g.compData.JS.getSelectedValue=g.compData.JS.selectedValue[g.compData.JS.dataKey];i.stopPropagation()};g.handleOptionClick=function(){b(function(){g.$apply()})};g.extendComponentData=function(i){g.compData=d.extendDeep(g.compData,i);b(function(){g.$apply()})};g.getData=function(i){g.edata=d.extendDeep({},i);g.compData.JS.Dataset=g.edata;if(g.compData.JS.dataMapping){g.compData.JS.Dataset=d.transfer(i,g.compData.JS.dataMapping);g.compData.JS.selectedValue=g.compData.JS.Dataset[0];g.compData.JS.getSelectedValue=g.compData.JS.selectedValue[g.compData.JS.dataKey]}};g.refresh=function(i){g.compData.JS.selectedValue=g.compData.JS.Dataset[0]};g.init=function(){h.registerComponentInstance(f.attr("cid"),g);g.extendComponentData(h.getInitProperties(g.cid));var j=g.compData.JS.Dataset;g.compData.JS.Dataset=[];for(var k in j){g.compData.JS.Dataset.push(j[k])}g.compData.JS.selectedValue=g.compData.JS.Dataset[0]};g.eventMap["data.update"]=g.getData;g.eventMap.refresh=g.refresh;g.$on(g.cid+"_handleEvent",function(l,j,k,i){g.eventMap[j](k,i)})}],link:function(f,g,e,d,h){f.pageID=d.pageID;f.componentType="idropdown";f.init()}}}]);
uiCore.directive("idropdownlist",["coreService","coreUtils","$timeout",function(c,a,b){return{restrict:"EA",replace:true,require:"^pid",scope:{param:"=param"},template:'<div><horizontal-container param="compData.JS.sgH1" class="idropdownhorizantalline" ><horizontal-container  param="compData.JS.sgH1r1" class="idropdownhorizantalline" ><richtext param="compData.JS.sgpackeffectiveetime" ></richtext></horizontal-container><horizontal-container  param="compData.JS.sgH1r2" ><div class="idropdownlistmain" ><select ng-click="handleClick1($event);" ng-change="handleClick();" ng-style="compData.CSS"   ng-model="compData.JS.selectedValue" ng-options="key.name  for key in compData.JS.Dataset" ></select></div></horizontal-container></horizontal-container><horizontal-container param="compData.JS.sgH2" class="idropdownhorizantalline" ng-show="isShowSecondList"><horizontal-container param="compData.JS.sgH2r1" class="idropdownhorizantalline"  ><richtext param="compData.JS.sgpackeffectiveetime1"  ></richtext></horizontal-container><horizontal-container param="compData.JS.sgH2r2"  ><div class="idropdownlistmain" ><select ng-click="handleClick2($event);" class="ui_com_second_dropdown"  ng-disabled="disablelist" ng-style="compData.CSS"   ng-model="compData.JS.selectedValue2" ng-options="key as key.name for key in compData.JS.Dataset2" ></select></div></horizontal-container></horizontal-container></div>',controller:["$scope","$element","$attrs","coreService","coreUtils",function(g,f,e,h,d){g.cid=e.cid;g.eventMap={};g.compData={CSS:{},JS:{textdata:"",clickable:false,setflag:"1",key1:"time",key2:"period",selectedValue:"",selectedValue2:"",opacity:"0.2",stateconfig:{state:0,state0:{},state1:{}},sgpackeffectiveetime:{CSS:{color:"#999999","font-size":"0.55em","font-family":"Microsoft Yahei",width:"100%","text-align":"center",display:"table-cell","vertical-align":"middle"},JS:{text:"生效时间:"}},sgpackeffectiveetime1:{CSS:{color:"#999999","font-size":"0.55em","font-family":"Microsoft Yahei",width:"100%","text-align":"center",display:"table-cell","vertical-align":"middle"},JS:{text:"生效时长:"}},sgH1:{CSS:{},JS:{sgH1:{border:"none","box-shadow":"none",display:"flex",extendable:false,height:"2em",position:"relative",width:"100%"},type:"sgH1"}},sgH1r1:{CSS:{},JS:{sgH1r1:{border:"none","box-shadow":"none",display:"table",extendable:false,height:"2em",position:"relative",width:"22%","background-color":"#F6F6F6"},type:"sgH1r1"}},sgH1r2:{CSS:{},JS:{sgH1r2:{border:"none","box-shadow":"none",display:"table",extendable:false,height:"2em",position:"relative"},type:"sgH1r2"}},sgH2:{CSS:{},JS:{sgH2:{border:"none","box-shadow":"none",display:"flex",extendable:false,height:"2em",position:"relative",width:"100%"},type:"sgH2"}},sgH2r1:{CSS:{},JS:{sgH2r1:{border:"none","box-shadow":"none",display:"table",extendable:false,height:"2em",position:"relative",width:"22%","background-color":"#F6F6F6"},type:"sgH2r1"}},sgH2r2:{CSS:{},JS:{sgH2r2:{border:"none","box-shadow":"none",display:"table",extendable:false,height:"2em",position:"relative"},type:"sgH2r2"}},},};g.handleClick1=function(i){i.stopPropagation()};g.handleClick2=function(i){i.stopPropagation()};g.handleClick=function(){if(g.isMonthPack){return}if(g.compData.JS.selectedValue.value==g.compData.JS.setflag){g.disablelist=true;g.secondDropdown.css({opacity:g.compData.JS.opacity});g.compData.JS.selectedValue2=g.compData.JS.Dataset2[0]}else{g.disablelist=false;g.compData.JS.selectedValue2=g.compData.JS.Dataset2[1];g.secondDropdown.css({opacity:"1.0"})}b(function(){g.$apply()})};g.disablelist=false;g.isShowSecondList=true;g.clickDisable=function(){};g.extendComponentData=function(i){g.compData=d.extendDeep(g.compData,i);b(function(){g.$apply()})};g.getData=function(i){g.edata=d.extendDeep({},i);if(g.edata.isMonthPack){g.isMonthPack=parseInt(g.edata.isMonthPack)}if(g.isMonthPack){g.isShowSecondList=false;g.compData.JS.selectedValue2=g.compData.JS.Dataset2[0]}else{g.isShowSecondList=true}};g.refresh=function(i){g.compData.JS.selectedValue=g.compData.JS.Dataset[0];g.compData.JS.selectedValue2=g.compData.JS.Dataset2[1];g.disablelist=false;g.secondDropdown.css({opacity:"1.0"})};g.init=function(){h.registerComponentInstance(f.attr("cid"),g);g.extendComponentData(h.getInitProperties(g.cid));var j=g.compData.JS.Dataset;var k=g.compData.JS.Dataset2;g.compData.JS.Dataset=[];g.compData.JS.Dataset2=[];for(var l in j){g.compData.JS.Dataset.push(j[l])}for(var l in k){g.compData.JS.Dataset2.push(k[l])}g.compData.JS.selectedValue=g.compData.JS.Dataset[0];g.compData.JS.selectedValue2=g.compData.JS.Dataset2[1]};g.eventMap["data.update"]=g.getData;g.eventMap.refresh=g.refresh;g.$on(g.cid+"_handleEvent",function(l,j,k,i){g.eventMap[j](k,i)})}],compile:function(e,d){return{pre:function(h,i,g,f,j){h.pageID=f.pageID;h.componentType="idropdownlist";h.init()},post:function(i,g,h,f,j){var k=g[0].querySelector(".ui_com_second_dropdown");i.secondDropdown=angular.element(k)}}},}}]);
uiCore.directive("slider",["coreService","coreUtils","$timeout","Const","$window",function(c,a,b,d,e){return{restrict:"AE",replace:true,template:'<div  ng-click="compData.JS.clickable?handleClick():clickDisable();$event.stopPropagation();" ><div style="position:relative;"><div ng-swipe-right="swiperight();" ng-swipe-left="swipeleft();"  ng-style="compData.CSS" ></div><div ng-show="compData.JS.enabletitle" ng-style="compData.JS.titleconfig.CSS"></div></div> <div ng-show="compData.JS.enablebullets" ng-style="compData.JS.bulletcontainerconfig.CSS"> <div ng-style="compData.JS.bulletconfig.CSS" ng-click="changeStatebyIndex($index);$event.stopPropagation();" ng-repeat="app in compData.JS.dataset | limitTo:compData.JS.maxcount" id="slider_bullet_{{$index}}"></div></div></div>',scope:{param:"=param"},require:"^pid",controller:["$scope","$element","$attrs",function(h,g,f){h.cid=f.cid;h.index=0;h.maxindex=0;h.eventMap={};h.imageset={};h.compData={};h.handleClick=function(){if(h.compData.JS.dataset[h.index].weblink&&h.compData.JS.dataset[h.index].weblink.split("http").length>1){e.open(h.compData.JS.dataset[h.index].weblink)}else{e.open("http://"+h.compData.JS.dataset[h.index].weblink)}};h.clickDisable=function(){};h.extendComponentData=function(j){h.compData=a.extendDeep(h.compData,j)};h.swipeleft=function(){h.index=h.index+1;if(h.index>parseInt(h.maxindex-1)){h.index=parseInt(h.maxindex-1)}h.changeState(h.index)};h.swiperight=function(){h.index=h.index-1;if(h.index<0){h.index=0}h.changeState(h.index)};h.init=function(){c.registerComponentInstance(h.cid,h);h.extendComponentData(c.getInitProperties(h.cid));h.maxindex=h.compData.JS.maxcount};h.setAdvertiseData=function(k,j){h.index=0;if(null!=j){j.resolve()}if(h.compData.JS.sliderConfigRespPath){h.compData.JS.dataset=a.transfer(k,h.compData.JS.sliderConfigRespPath)}b(function(){if(h.maxindex>0){angular.element(g[0].children[0].children[0]).css({height:h.compData.JS.sliderheight});h.changeState(0)}});if(null!=h.compData.JS.dataset&&h.compData.JS.dataset.length<h.compData.JS.maxcount){h.maxindex=h.compData.JS.dataset.length}if(null!=h.compData.JS.dataset&&h.compData.JS.dataset.length==0){angular.element(g[0].children[0].children[0]).css({height:"0%"})}else{angular.element(g[0].children[0].children[0]).css({height:h.compData.JS.sliderheight,margin:h.compData.JS.slidermargin})}};h.changeStatebyIndex=function(j){h.changeState(j);h.index=j};h.changeState=function(j){var k=g[0].querySelector("#slider_bullet_"+j);if(h.compData.JS.dataset){for(i=0;i<=h.maxindex-1;i++){angular.element(g[0].querySelector("#slider_bullet_"+i)).css({"background-color":h.compData.JS.bulletconfig.JS.stateconfig.state0.background_color})}}angular.element(k).css({"background-color":h.compData.JS.bulletconfig.JS.stateconfig.state1.background_color});if(h.compData.JS.dataset){if(h.compData.JS.dataset[j].imageurl){angular.element(g[0].children[0].children[0]).css({"background-image":'url("'+h.compData.JS.dataset[j].imageurl+'")',})}if(h.compData.JS.dataset[j].title){angular.element(g[0].children[0].children[1]).html(h.compData.JS.dataset[j].title)}}};h.eventMap.setAdvertiseData=h.setAdvertiseData;h.$on(h.cid+"_handleEvent",function(m,k,l,j){h.eventMap[k](l,j)});h.$watch(h.param,function(j){if(h.param){h.compData=h.param}})}],link:function(h,g,f,j){h.pageID=f.ppageid||j.pageID;h.componentType="slider";h.init()}}}]);
uiCore.directive("simplescroll",function(){return{restrict:"A",controller:["$scope","$element","$attrs","$timeout","Const",function(j,k,h,d,a){var c,e,i=0,g=0;var b=/preto/i.test(navigator.userAgent)||/opera/i.test(navigator.userAgent);var f=function(){var t=a.touchEvent.start;var o=a.touchEvent.move;var x=a.touchEvent.end;var v=0;var l=0;var y=0;var p=0;var w=false;var s=0;var u=0;var n=false;var r=function(A){top.tlbs.popupTxtMove=false;var z=k[0].style.webkitTransform||k[0].style.mozTransform||k[0].style.msTransform||k[0].style.msTransform||k[0].style.oTransform;if(z){v=z.split(",")[1]&&parseInt(z.split(",")[1])}else{v=0}n=true;s=parseInt(h.totalheight||top.window.getComputedStyle(k[0],null)["height"])+20;u=parseInt(h.parentheight||top.window.getComputedStyle(k[0].parentNode,null)["height"]);l=A.touches?A.touches[0].pageY:A.pageY;if(s>u){top.document.addEventListener(o,q,false);top.document.addEventListener(x,m,false)}};var q=function(z){if(n){y=z.touches?z.touches[0].pageY:z.pageY;p=y-l;if(Math.abs(p)>3||w){top.tlbs.popupTxtMove=true;w=true;z.stopPropagation();z.preventDefault()}l=y;v+=p;if(v>0){v=0}else{if(v+s<=u){v=u-s}}if(b){k.css("-o-transform","translate(0,"+v+"px)");k.css("transform","translate(0,"+v+"px)")}else{k.css("-webkit-transform","translate3d(0,"+v+"px,0)");k.css("-moz-transform","translate3d(0,"+v+"px,0)");k.css("-o-transform","translate3d(0,"+v+"px,0)");k.css("-ms-transform","translate3d(0,"+v+"px,0)");k.css("transform","translate3d(0,"+v+"px,0)")}}};var m=function(z){if(w){z.stopPropagation();z.preventDefault();w=false}n=false;top.document.removeEventListener(o,q,false);top.document.removeEventListener(x,m,false)};k.bind(t,r)};d(f,0)}],link:function(c,b,a){}}});
uiCore.directive("ihtmltext",["coreService","coreUtils","$timeout",function(c,a,b){return{restrict:"EA",replace:true,require:"^pid",scope:{param:"=param"},template:"<div {{param}}></div>",controller:["$scope","$element","$attrs","coreService","coreUtils",function(g,f,e,h,d){g.cid=e.cid;g.eventMap={};g.compData={CSS:{},JS:{textdata:"",clickable:false,dataMapping:"",stateconfig:{state:0,state0:{},state1:{}}}};g.handleClick=function(){h.fireEvent(g.cid,"click"+g.compData.JS.stateconfig.state)};g.clickDisable=function(){};g.$on(e.cid+"_handleEvent",function(k,l,j,i){if(g.eventMap[l]){g.eventMap[l](j);if(null!=i){i.resolve()}}});g.extendComponentData=function(i){g.compData=d.extendDeep(g.compData,i)};g.init=function(){if(g.cid){h.registerComponentInstance(g.cid,g);g.extendComponentData(h.getInitProperties(g.cid))}d.extendDeep(g.compData,g.param||{});g.updateHTML(g.compData.JS.textdata);g.applyStyle()};g.$watch(function(){return f.attr("itext")},function(i){if(null!=i){g.updateHTML(i)}});g.$watch(g.param,function(i){if(g.param){g.compData=g.param;g.applyStyle()}});g.$watch(g.compData,function(){if(null!=g.compData.JS.textdata){g.updateHTML(g.compData.JS.textdata)}});g.updateHTML=function(i){f[0].innerHTML=i};g.updateHTMLText=function(i){if(g.compData.JS.dataMapping){g.updateHTML(d.transfer(i,g.compData.JS.dataMapping))}};g.eventMap["text.update"]=g.updateHTMLText;g.applyStyle=function(){if(null!=g.compData.JS.stateconfig["state"+g.compData.JS.stateconfig.state]){d.extendDeep(g.compData.CSS,g.compData.JS.stateconfig["state"+g.compData.JS.stateconfig.state])}f.css(g.compData.CSS)}}],link:function(g,e,d,f){g.pageID=f.pageID;g.componentType="ihtmltext";g.init()}}}]);
uiCore.directive("iholder",["coreService","coreUtils","$timeout","$rootScope",function(d,b,c,a){return{restrict:"E",replace:true,transclude:true,template:'<div ng-click="compData.JS.clickable && handleClick();$event.preventDefault();$event.stopPropagation();" {{param}} ng-transclude></div>',scope:{param:"=param"},require:"^pid",controller:["$scope","$element","$attrs","$compile","$templateCache","$timeout","$document",function(h,g,f,j,e,i,k){h.cid=f.cid;h.classid="."+h.cid;h.eventMap={};h.compData={CSS:{},JS:{clickable:false,animation:false,clickevent:"",stateconfig:{stylestates:"",extrastates:"",cstylestate:"",cextrastate:"",state:0,estate:0,state0:{},state1:{}}}};h.extendComponentData=function(l){h.compData=b.extendDeep(h.compData,l)};h.init=function(){d.registerComponentInstance(h.cid,h);h.extendComponentData(d.getInitProperties(h.cid));h.processStyle();h.updateStyle();if(null!=f.templateurl){h.getTemplate()}};h.getHolderStyle=function(){if(null!=h.compData.JS.stateconfig["state"+h.compData.JS.stateconfig.state]){return b.extendDeep(h.compData.CSS,h.compData.JS.stateconfig["state"+h.compData.JS.stateconfig.state])}};h.handleClick=function(){d.fireEvent(h.cid,(h.compData.JS.clickevent||"")+"click"+h.compData.JS.stateconfig.state)};h.changeState=function(m,l){if(null!=m&&null!=m.cstate){if(h.compData.JS.stateconfig.state!=m.cstate){h.compData.JS.stateconfig.state=m.cstate;h.updateStyle();h.$evalAsync(function(){if(null!=l){if(h.compData.JS.animation){if(top.tlbs.isTransitionSupported){g.on(top.tlbs.transitionendEvent,function(n){l.resolve()})}else{l.resolve()}}else{l.resolve()}}})}else{if(null!=l){l.resolve()}}}};h.changeExtraState=function(m,l){if(h.compData.JS.stateconfig.estate!=m.cstate){h.compData.JS.stateconfig.estate=m.cstate;h.updateStyle()}if(null!=l){l.resolve()}};h.changeStateAfterDisplay=function(m,l){g.css("display","block");h.forceReflow();h.changeState(m,l)};h.changeStateThenHide=function(m,l){h.changeState(m,l);if(null!=l){l.promise.then(function(){g.css("display","none")})}};h.forceReflow=function(){var l=(g instanceof angular.element)?g[0]:g;return l.offsetWidth+1};h.hide=function(l){g.css({display:"none"})};h.show=function(l){g.css({display:"block"});var m=h.compData.JS.closetime;if(l&&(l.messageid==undefined)){return false}if(m){top.tlbs.messageid=l.messageid;i(function(){if(g.css("display")!="none"){top.tlbs.notificationCdrData=null}h.hide()},m)}};h.eventMap.changeState=h.changeState;h.eventMap.hide=h.hide;h.eventMap.show=h.show;h.eventMap.changeExtraState=h.changeExtraState;h.eventMap.changeStateAfterDisplay=h.changeStateAfterDisplay;h.eventMap.changeStateThenHide=h.changeStateThenHide;h.$on(h.cid+"_handleEvent",function(o,m,n,l){h.eventMap[m](n,l)});h.$watch(h.param,function(l){if(h.param){h.compData=h.param}});h.processStyle=function(){var t=JSON.stringify(h.compData.CSS);t=h.formatStyleData(t);d.commonServiceRef.appendStyle(h.classid,"",t);var r=h.compData.JS.stateconfig.stylestates.split("|");var q=r.length;var s=h.compData.JS.stateconfig.extrastates.split("|");var u=s.length;for(var p=0;p<q;p++){var n=r[p];if(n.length>0){t=JSON.stringify(h.compData.JS.stateconfig[n]);t=h.formatStyleData(t);d.commonServiceRef.appendStyle(h.classid,"."+n,t);for(var o=0;o<u;o++){var l=s[o];if(l.length>0){t=JSON.stringify(h.compData.JS.stateconfig[l]);t=h.formatStyleData(t);d.commonServiceRef.appendStyle(h.classid,"."+n+"."+l,t)}}}}g.addClass(h.cid);if(null!=h.compData.JS.stateconfig.state){var m="state"+h.compData.JS.stateconfig.state;h.compData.JS.stateconfig.stylestates=m}};h.formatStyleData=function(l){l=l.replace(/","/g,";").replace(/":"/g,":").replace(/\\/g,"").replace(/{"/,"{").replace(/"}/,"}");return l};h.updateStyle=function(){g.removeClass(h.compData.JS.stateconfig.cstylestate);g.removeClass(h.compData.JS.stateconfig.cextrastate);h.compData.JS.stateconfig.cstylestate="state"+h.compData.JS.stateconfig.state;g.addClass(h.compData.JS.stateconfig.cstylestate);if(h.compData.JS.stateconfig.state!=h.compData.JS.stateconfig.estate){h.compData.JS.stateconfig.cextrastate="state"+h.compData.JS.stateconfig.estate;g.addClass(h.compData.JS.stateconfig.cextrastate)}};h.getTemplate=function(){var l=e.get(f.templateurl);g.html(l);j(g.contents())(h)}}],link:function(g,f,e,h){g.pageID=h.pageID;g.componentType="iholder";g.init()}}}]);
uiCore.directive("irichtext",["coreService","coreUtils","$timeout",function(c,a,b){return{restrict:"EA",replace:true,require:"^pid",scope:{param:"=param"},template:'<div ng-click="compData.JS.clickable?handleClick():clickDisable();" {{param}}>{{compData.JS.textdata}}</div>',controller:["$scope","$element","$attrs","coreService","coreUtils",function(g,f,e,h,d){g.cid=e.cid;g.eventMap={};g.compData={CSS:{},JS:{textdata:"",clickable:false,stateconfig:{state:0,state0:{},state1:{}}}};g.handleClick=function(){h.fireEvent(g.cid,"click"+g.compData.JS.stateconfig.state)};g.clickDisable=function(){};g.$on(e.cid+"_handleEvent",function(k,l,j,i){if(g.eventMap[l]){g.eventMap[l](j);if(null!=i){i.resolve()}}});g.extendComponentData=function(i){g.compData=d.extendDeep(g.compData,i)};g.init=function(){h.registerComponentInstance(f.attr("cid"),g);g.extendComponentData(h.getInitProperties(g.cid));g.applyStyle()};g.$watch(g.param,function(i){if(g.param){g.compData=g.param;g.applyStyle()}});g.applyStyle=function(){if(null!=g.compData.JS.stateconfig["state"+g.compData.JS.stateconfig.state]){d.extendDeep(g.compData.CSS,g.compData.JS.stateconfig["state"+g.compData.JS.stateconfig.state])}f.css(g.compData.CSS)}}],link:function(g,e,d,f){g.pageID=f.pageID;g.componentType="irichtext";g.init()}}}]);
uiCore.directive("tbresize",["$window","$interval",function(b,a){return{restrict:"A",replace:false,controller:["$scope","$element","$attrs",function(g,f,d){var c=function(){var i=top.document.getElementsByName("viewport");if(!i||i.length==0){return false}else{return true}};if(top.barresizetype=="1"){var h=function(){if(/window/ig.test(navigator.userAgent)){f.css({"font-size":"27px"})}else{var j=parseInt(top.window.innerWidth);var i=parseInt(top.window.innerHeight);if(j<319){f.css({"font-size":"12px"})}else{if(j>=320&&j<359){f.css({"font-size":"14px"})}else{if(j>=360&&j<399){if(i<=485){f.css({"font-size":"14px"})}else{if(i<530){f.css({"font-size":"15px"})}else{f.css({"font-size":"16px"})}}}else{if(j>=400&&j<479){if(i<740){f.css({"font-size":"19px"})}else{f.css({"font-size":"20px"})}}else{if(j>=480&&j<539){f.css({"font-size":"20px"})}else{if(j>=540&&j<639){f.css({"font-size":"22px"})}else{if(j>=640&&j<719){f.css({"font-size":"28px"})}else{if(j>=720&&j<879){f.css({"font-size":"32px"})}else{if(j>=880&&j<959){f.css({"font-size":"36px"})}else{if(j>=960&&j<1079){f.css({"font-size":"44px"})}else{if(j>=1080&&j<1280){f.css({"font-size":"48px"})}else{if(j>=1280){f.css({"font-size":"56px"})}}}}}}}}}}}}}};h();top.window.addEventListener("load",h);a(function(){h()},3000);return}g.pWidth=0;g.pHeight=0;g.resize=function(){var j=360,l=320;g.cWidth=top.window.innerWidth;g.cHeight=top.window.innerHeight;var m=0,i=0;if(g.pWidth==g.cWidth){return}if(g.pWidth==g.cWidth&&g.cHeight!=g.pHeight&&Math.min(g.pHeight,g.cHeight)/Math.max(g.pHeight,g.cHeight)>=0.8){g.pWidth=g.cWidth;g.pHeight=g.cHeight;return}if(g.pWidth==g.cWidth&&g.pHeight==g.cHeight){return}if(g.cWidth<=g.cHeight){m=g.cWidth/l}else{m=g.cHeight/j}if(l*m>g.cWidth){m=g.cWidth/l}var k=m*18;if(!(top.tlbs.templateID.indexOf("pcbar")===-1)){f.css("font-size",27+"px")}else{f.css("font-size",k+"px")}g.pWidth=g.cWidth;g.pHeight=g.cHeight};g.resizeForPreview=function(i,m){var l=360,k=320;if(i<=m){cFontSize=i/k}else{cFontSize=m/baseHeight}var j=cFontSize*18;if(!(top.tlbs.templateID.indexOf("pcbar")===-1)){f.css("font-size",27+"px")}else{f.css("font-size",j+"px")}};if(top.tlbs.w&&top.tlbs.h){g.resizeForPreview(parseInt(top.tlbs.w),parseInt(top.tlbs.h))}else{g.cWidth=top.window.innerWidth;g.cHeight=top.window.innerHeight;var e=angular.element(top.window);e.bind("resize",function(){g.resize()});g.resize();g.intervalObject=a(function(){g.resize()},10)}}]}}]);
