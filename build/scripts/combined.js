function addCommas(e){e+="";for(var t=e.split("."),a=t[0],o=t.length>1?"."+t[1]:"",i=/(\d+)(\d{3})/;i.test(a);)a=a.replace(i,"$1,$2");return a+o}function camelize(e){return e.replace(/(?:^\w|[A-Z]|\b\w)/g,function(e,t){return 0==t?e.toLowerCase():e.toUpperCase()}).replace(/\s+/g,"")}!function(e){e.fn.confirmModal=function(t){function a(e,t){}var o=e("body"),i={confirmTitle:"Please confirm",confirmMessage:"Are you sure you want to perform this action ?",confirmOk:"Yes",confirmCancel:"Cancel",confirmDirection:"rtl",confirmStyle:"primary",confirmCallback:a,confirmDismiss:!0,confirmAutoOpen:!1},r=e.extend(i,t),n='<div class="modal fade" id="#modalId#" tabindex="-1" role="dialog" aria-labelledby="#AriaLabel#" aria-hidden="true"><div class="modal-dialog"><div class="modal-content"><div class="modal-header"><button type="button" class="close" data-dismiss="modal" aria-hidden="true">&times;</button><h3>#Heading#</h3></div><div class="modal-body"><p>#Body#</p></div><div class="modal-footer">#buttonTemplate#</div></div></div></div>';return this.each(function(t){var a=e(this),i=a.data(),s=(e.extend(r,i),"confirmModal"+Math.floor(1e9*Math.random())),l=n,c='<button class="btn btn-default" data-dismiss="modal">#Cancel#</button><button class="btn btn-#Style#" data-dismiss="ok">#Ok#</button>';"ltr"==r.confirmDirection&&(c='<button class="btn btn-#Style#" data-dismiss="ok">#Ok#</button><button class="btn btn-default" data-dismiss="modal">#Cancel#</button>');var d=r.confirmTitle;"function"==typeof r.confirmTitle&&(d=r.confirmTitle.call(this));var m=r.confirmMessage;"function"==typeof r.confirmMessage&&(m=r.confirmMessage.call(this)),l=l.replace("#buttonTemplate#",c).replace("#modalId#",s).replace("#AriaLabel#",d).replace("#Heading#",d).replace("#Body#",m).replace("#Ok#",r.confirmOk).replace("#Cancel#",r.confirmCancel).replace("#Style#",r.confirmStyle),o.append(l);var p=e("#"+s);a.on("click",function(e){e.preventDefault(),p.modal("show")}),e('button[data-dismiss="ok"]',p).on("click",function(e){r.confirmDismiss&&p.modal("hide"),r.confirmCallback(a,p)}),r.confirmAutoOpen&&p.modal("show")})}}(jQuery);var allLayers;require(["esri/geometry/Extent","esri/layers/WMSLayerInfo","esri/layers/FeatureLayer","dojo/domReady!"],function(e,t,a){allLayers=[]});var wlera=wlera||{bookmarks:[{id:"ottawa-nwr",name:"Ottawa NWR",userCreated:!1,spatialReference:{wkid:102100},xmax:-9253627.864758775,xmin:-9268896.161158718,ymax:5109457.058192252,ymin:5099759.110228584},{id:"erie-marsh",name:"Erie Marsh",userCreated:!1,spatialReference:{wkid:102100},xmax:-9281192.968084078,xmin:-9296461.264484022,ymax:5130611.005770145,ymin:5120913.057806477}],globals:{}},map,maxLegendHeight,maxLegendDivHeight,printCount=0,storageName="esrijsapi_mapmarks",bmToDelete="";require(["esri/map","esri/dijit/OverviewMap","esri/SnappingManager","esri/dijit/HomeButton","esri/dijit/LocateButton","esri/dijit/Measurement","esri/dijit/Bookmarks","esri/layers/ArcGISTiledMapServiceLayer","esri/dijit/Geocoder","esri/dijit/PopupTemplate","esri/graphic","esri/geometry/Multipoint","esri/symbols/PictureMarkerSymbol","esri/geometry/webMercatorUtils","esri/tasks/GeometryService","esri/tasks/PrintTask","esri/tasks/PrintParameters","esri/tasks/PrintTemplate","esri/tasks/LegendLayer","esri/SpatialReference","esri/geometry/Extent","esri/config","dojo/_base/array","dojo/_base/lang","dojo/keys","dojo/cookie","dojo/has","dojo/dom","dojo/on","dojo/domReady!"],function(e,t,a,o,i,r,n,s,l,c,d,m,p,u,g,h,f,b,y,v,k,w,L,x,S,M,C,T,D){function E(){if(U){var e=[];L.forEach(wlera.bookmarks,function(t){0==t.userCreated&&e.push(t.id)});for(var t=wlera.bookmarks.slice(),a=0;a<t.length;a++){var o=t[a];-1!==e.indexOf(o.id)&&(t.splice(a,1),a--)}console.log(t);var i=JSON.stringify(t);window.localStorage.setItem(storageName,i)}else{var r=7;M(storageName,dojo.toJson(wlera.bookmarks),{expires:r})}}function z(){U?window.localStorage.removeItem(storageName):dojo.cookie(storageName,null,{expires:-1});var e=[];L.forEach(wlera.bookmarks,function(t){1==t.userCreated&&e.push(t.id)});for(var t=0;t<wlera.bookmarks.length;t++){var a=wlera.bookmarks[t];-1!==e.indexOf(a.id)&&(wlera.bookmarks.splice(t,1),t--)}L.forEach(e,function(e){$("#"+e).remove()})}function I(){try{return"localStorage"in window&&null!==window.localStorage}catch(e){return!1}}function B(){$("#printModal").modal("show")}function j(){$("#bookmarkModal").modal("show")}function G(){1===T.byId("chkExtent").checked?te.activeGeocoder.searchExtent=map.extent:te.activeGeocoder.searchExtent=null}function O(){G();var e=te.find();e.then(function(e){A(e)}),$("#geosearchModal").modal("hide")}function R(e){P();var t=e.graphic?e.graphic:e.result.feature;t.setSymbol(ae),N(e.result,t.symbol)}function A(e){if(e=e.results,e.length>0){P();for(var t=ae,a=0;a<e.length;a++)N(e[a],t);H(e)}}function V(e){var t=e.indexOf(",");return t>0&&(e=e.substring(0,t)),e}function N(e,t){var a,o,i,r,n={};i=e.feature.geometry,n.address=e.name,n.score=e.feature.attributes.Score,a={address:V(n.address),score:n.score,lat:i.getLatitude().toFixed(2),lon:i.getLongitude().toFixed(2)},o=new c({title:"{address}",description:"Latitude: {lat}<br/>Longitude: {lon}"}),r=new d(i,t,a,o),map.graphics.add(r)}function H(e){for(var t=new m(map.spatialReference),a=0;a<e.length;a++)t.addPoint(e[a].feature.geometry);map.setExtent(t.getExtent().expand(2))}function P(){map.infoWindow.hide(),map.graphics.clear()}function W(e,t,a,o,i){return new p({angle:0,xoffset:t,yoffset:a,type:"esriPMS",url:e,contentType:"image/png",width:o,height:i})}function F(){function e(e){printCount++;var t=$("<p><label>"+printCount+': </label>&nbsp;&nbsp;<a href="'+e.url+'" target="_blank">'+n+" </a></p>");$("#printJobsDiv").find("p.toRemove").remove(),$("#printModalBody").append(t),$("#printExecuteButton").button("reset")}function t(e){alert("Sorry, an unclear print error occurred. Please try refreshing the application to fix the problem")}var a=new f;a.map=map;var o=new b;o.exportOptions={width:500,height:400,dpi:300},o.format="PDF",o.layout="Letter ANSI A Landscape",o.preserveScale=!1;var i=new y;i.layerId="normalized";var r=$("#printTitle").val();""==r?o.layoutOptions={titleText:"Western Lake Erie Restoration Assessment",authorText:"Western Lake Erie Restoration Assessment (WLERA)",copyrightText:"This page was produced by the WLERA web application at [insert app URL]",legendlayers:[i]}:o.layoutOptions={titleText:r,authorText:"Western Lake Erie Restoration Assessment (WLERA)",copyrightText:"This page was produced by the WLERA web application at [insert app URL]",legendlayers:[i]};var n=o.layoutOptions.titleText;a.template=o;var s=new h("http://wlera.wimcloud.usgs.gov:6080/arcgis/rest/services/Utilities/PrintingTools/GPServer/Export%20Web%20Map%20Task");s.execute(a,e,t)}function q(){var e=map.extent.toJson(),t=$("#bookmarkTitle").val(),a=t.toLowerCase().replace(/ /g,"-");e.name=t,e.id=a,e.userCreated=!0,wlera.bookmarks.push(e);var o=$('<tr id="'+a+'"><td  class="bookmarkTitle td-bm">'+t+'</td><td class="text-right text-nowrap"> <button class="btn btn-xs btn-warning bookmarkDelete" data-toggle="tooltip" data-placement="top" title="Delete bookmark"> <span class="glyphicon glyphicon-remove"></span> </button> </td> </tr>');$("#bookmarkList").append(o),E()}var U=I();map=e("mapDiv",{basemap:"gray",center:[-82.745,41.699],spatialReference:26917,zoom:10,logo:!1}),w.defaults.geometryService=new g("http://54.152.244.240:6080/arcgis/rest/services/Utilities/Geometry/GeometryServer"),esri.config.defaults.io.corsEnabledServers.push("http://52.0.108.106:6080/");const Y=new o({map:map},"homeButton");Y.startup();const X=new i({map:map},"locateButton");X.startup();const J=new r({map:map,advancedLocationUnits:!0},T.byId("measurementDiv"));J.startup();var _;if(_=U?window.localStorage.getItem(storageName):dojo.cookie(storageName),_&&"null"!=_&&_.length>4){console.log("cookie: ",_,_.length);var Z=dojo.fromJson(_);L.forEach(Z,function(e){wlera.bookmarks.push(e)})}else console.log("no stored bookmarks...");const Q=new t({map:map,attachTo:"bottom-right"});Q.startup();var K=$('<tr class="esriMeasurementTableRow" id="utmCoords"><td><span>UTM17</span></td><td class="esriMeasurementTableCell"> <span id="utmX" dir="ltr">UTM X</span></td> <td class="esriMeasurementTableCell"> <span id="utmY" dir="ltr">UTM Y</span></td></tr>');$(".esriMeasurementResultTable").append(K),$(window).resize(function(){$("#legendCollapse").hasClass("in")?(maxLegendHeight=.9*$("#mapDiv").height(),$("#legendElement").css("height",maxLegendHeight),$("#legendElement").css("max-height",maxLegendHeight),maxLegendDivHeight=$("#legendElement").height()-parseInt($("#legendHeading").css("height").replace("px","")),$("#legendDiv").css("max-height",maxLegendDivHeight)):$("#legendElement").css("height","initial")}),$("#printNavButton").click(function(){B()}),$("#addBookmarkButton").click(function(){j()}),$("#printExecuteButton").click(function(){$(this).button("loading"),F()}),$("#bookmarkSaveButton").click(function(){q()}),D(map,"load",function(){var e=map.getScale().toFixed(0);$("#scale")[0].innerHTML=addCommas(e);var t=u.webMercatorToGeographic(map.extent.getCenter());$("#latitude").html(t.y.toFixed(4)),$("#longitude").html(t.x.toFixed(4))}),D(map,"zoom-end",function(){var e=map.getScale().toFixed(0);$("#scale")[0].innerHTML=addCommas(e)}),D(map,"mouse-move",function(e){if($("#mapCenterLabel").css("display","none"),null!=e.mapPoint){var t=u.webMercatorToGeographic(e.mapPoint);$("#latitude").html(t.y.toFixed(4)),$("#longitude").html(t.x.toFixed(4))}}),D(map,"pan-end",function(){$("#mapCenterLabel").css("display","inline");var e=u.webMercatorToGeographic(map.extent.getCenter());$("#latitude").html(e.y.toFixed(4)),$("#longitude").html(e.x.toFixed(4))});var ee=new s("http://basemap.nationalmap.gov/arcgis/rest/services/USGSTopo/MapServer",{visible:!1});map.addLayer(ee),D(T.byId("btnStreets"),"click",function(){map.setBasemap("streets"),ee.setVisibility(!1)}),D(T.byId("btnSatellite"),"click",function(){map.setBasemap("satellite"),ee.setVisibility(!1)}),D(T.byId("btnGray"),"click",function(){map.setBasemap("gray"),ee.setVisibility(!1)}),D(T.byId("btnOSM"),"click",function(){map.setBasemap("osm"),ee.setVisibility(!1)}),D(T.byId("btnTopo"),"click",function(){map.setBasemap("topo"),ee.setVisibility(!1)}),D(T.byId("btnNatlMap"),"click",function(){ee.setVisibility(!0)});var te=new l({value:"",maxLocations:25,autoComplete:!0,arcgisGeocoder:!0,autoNavigate:!1,map:map},"geosearch");te.startup(),te.on("select",R),te.on("findResults",A),te.on("clear",P),D(te.inputNode,"keydown",function(e){13==e.keyCode&&G()});var ae=W("images/purple-pin.png",0,12,13,24);map.on("load",function(){map.infoWindow.set("highlight",!1),map.infoWindow.set("titleInBody",!1)}),D(T.byId("btnGeosearch"),"click",O),$(document).ready(function(){function e(){$("#geosearchModal").modal("show")}$("#geosearchNav").click(function(){e()}),$("#html").niceScroll(),$("#sidebar").niceScroll(),$("#sidebar").scroll(function(){$("#sidebar").getNiceScroll().resize()}),$("#legendDiv").niceScroll(),maxLegendHeight=.9*$("#mapDiv").height(),$("#legendElement").css("max-height",maxLegendHeight),$("#legendCollapse").on("shown.bs.collapse",function(){$("#legendLabel").show(),maxLegendHeight=.9*$("#mapDiv").height(),$("#legendElement").css("max-height",maxLegendHeight),maxLegendDivHeight=$("#legendElement").height()-parseInt($("#legendHeading").css("height").replace("px","")),$("#legendDiv").css("max-height",maxLegendDivHeight)}),$("#legendCollapse").on("hide.bs.collapse",function(){$("#legendElement").css("height","initial"),window.innerWidth<=767&&$("#legendLabel").hide()}),$("#measurementCollapse").on("shown.bs.collapse",function(){$("#measureLabel").show()}),$("#measurementCollapse").on("hide.bs.collapse",function(){window.innerWidth<=767&&$("#measureLabel").hide()}),wlera.bookmarks.forEach(function(e){if(0==e.userCreated){var t=$('<tr id="'+e.id+'"><td class="bookmarkTitle td-bm">'+e.name+'</td><td class="text-right text-nowrap"></td> </tr>');$("#bookmarkList").append(t)}else{var a=$('<tr id="'+e.id+'"><td  class="bookmarkTitle td-bm">'+e.name+'</td><td class="text-right text-nowrap"> <button class="btn btn-xs btn-warning bookmarkDelete" data-toggle="tooltip" data-placement="top" title="Delete bookmark"> <span class="glyphicon glyphicon-remove"></span> </button> </td> </tr>');$("#bookmarkList").append(a)}}),$("body").on("click",".td-bm",function(){var e=this.parentNode.id;wlera.bookmarks.forEach(function(t){if(t.id==e){var a=new k(t.xmin,t.ymin,t.xmax,t.ymax,new v(t.spatialReference));map.setExtent(a)}})}),$("body").on("click",".bookmarkDelete",function(){bmToDelete=this.parentNode.parentNode.id,$(".bookmarkDelete").confirmation({placement:"left",title:"Delete this bookmark?",btnOkLabel:"Yes",btnCancelLabel:"Cancel",popout:!0,onConfirm:function(){$("#"+bmToDelete).remove();for(var e=0;e<wlera.bookmarks.length;e++){var t=wlera.bookmarks[e];-1!==bmToDelete.indexOf(t.id)&&wlera.bookmarks.splice(e,1)}E()}})}),$('[data-toggle="tooltip"]').tooltip({delay:{show:500,hide:0}}),$("#removeBookmarksButton").confirmModal({confirmTitle:"Delete user bookmarks from memory",confirmMessage:"This action will remove all user-defined bookmarks from local memory on your computer or device. Would you like to continue?",confirmOk:"Yes, delete bookmarks",confirmCancel:"Cancel",confirmDirection:"rtl",confirmStyle:"primary",confirmCallback:z,confirmDismiss:!0,confirmAutoOpen:!1})}),require(["esri/dijit/Legend","esri/tasks/locator","esri/tasks/query","esri/tasks/GeometryService","esri/tasks/ProjectParameters","esri/tasks/QueryTask","esri/graphicsUtils","esri/geometry/Point","esri/SpatialReference","esri/geometry/Extent","esri/layers/ArcGISDynamicMapServiceLayer","esri/layers/FeatureLayer","dojo/query","dojo/dom"],function(e,t,a,o,i,r,n,s,l,c,d,m,p,u){var g=[],h=[];const f="http://wlera.wimcloud.usgs.gov:6080/arcgis/rest/services/WLERA/",b=new o("http://wlera.wimcloud.usgs.gov:6080/arcgis/rest/services/Utilities/Geometry/GeometryServer"),y=new d(f+"hydroCondition/MapServer",{id:"dikedAreas",visible:!1});y.setVisibleLayers([4]),h.push(y),y.inLegendLayers=!1;const v=new d(f+"hydroCondition/MapServer",{id:"dikes",visible:!1,minScale:1e5});v.setVisibleLayers([3]),h.push(v),v.inLegendLayers=!1;const k=new d(f+"hydroCondition/MapServer",{id:"degFlowlines",visible:!1,minScale:1e5});k.setVisibleLayers([2]),h.push(k),k.inLegendLayers=!1;const w=new d(f+"hydroCondition/MapServer",{id:"culverts",visible:!1,minScale:1e5});w.setVisibleLayers([1]),h.push(w),w.inLegendLayers=!1;const L=new d(f+"hydroCondition/MapServer",{id:"dikeBreaks",visible:!1,minScale:1e5});L.setVisibleLayers([0]),h.push(L),L.inLegendLayers=!1;const x=new m(f+"reference/MapServer/1",{id:"parcels",visible:!1,minScale:1e5,mode:m.MODE_ONDEMAND,outfields:["*"]});h.push(x),x.inLegendLayers=!1;const M=new d(f+"reference/MapServer",{id:"studyArea",visible:!0});M.setVisibleLayers([0]),h.push(M),g.push({layer:M,title:" "}),M.inLegendLayers=!0;const T=new d(f+"restorationModel/MapServer",{id:"landuse",visible:!1});T.setVisibleLayers([8]),h.push(T),T.inLegendLayers=!1;const D=new d(f+"restorationModel/MapServer",{id:"imperviousSurfaces",visible:!1});D.setVisibleLayers([7]),h.push(D),D.inLegendLayers=!1;const E=new d(f+"restorationModel/MapServer",{id:"conservedLands",visible:!1});E.setVisibleLayers([6]),h.push(E),E.inLegendLayers=!1;const z=new d(f+"restorationModel/MapServer",{id:"flowline",visible:!1});z.setVisibleLayers([5]),h.push(z),z.inLegendLayers=!1;const I=new d(f+"restorationModel/MapServer",{id:"wetsoils",visible:!1});I.setVisibleLayers([4]),h.push(I),I.inLegendLayers=!1;const B=new d(f+"restorationModel/MapServer",{id:"hydroperiod",visible:!1});B.setVisibleLayers([3]),h.push(B),B.inLegendLayers=!1;const j=new d(f+"restorationModel/MapServer",{id:"waterMask",visible:!1});j.setVisibleLayers([2]),h.push(j),j.inLegendLayers=!1;const G=new d(f+"restorationModel/MapServer",{id:"normalized",visible:!0});G.setVisibleLayers([0]),h.push(G),g.push({layer:G,title:" "}),G.inLegendLayers=!0,map.addLayers(h);var O=map.enableSnapping({snapKey:C("mac")?S.META:S.CTRL}),R=[{layer:x}];O.setLayerInfos(R);var A=new l(26917);J.on("measure-end",function(e){var t,a=e.geometry,o=-1*e.geometry.x;84>o&&o>78?b.project([a],A,function(e){t=e[0],console.log(t);var a=t.x.toFixed(0),o=t.y.toFixed(0);$("#utmX").html(a),$("#utmY").html(o)}):($("#utmX").html('<span class="label label-danger">outside zone</span>'),$("#utmY").html('<span class="label label-danger">outside zone</span>'))});for(var V=0;V<map.layerIds.length;V++){var N=map.getLayer(map.layerIds[V]);N.visible&&($("#"+N.id).button("toggle"),$("#"+N.id).find("i.checkBoxIcon").toggleClass("fa-check-square-o fa-square-o"))}$("button.lyrTog").click(function(e){$(this).find("i.checkBoxIcon").toggleClass("fa-check-square-o fa-square-o"),$(this).button("toggle"),e.preventDefault(),e.stopPropagation();var t=map.getLayer($(this).attr("id"));t.visible?t.setVisibility(!1):(t.setVisibility(!0),0==t.inLegendLayers&&(g.push({layer:t,title:" "}),t.inLegendLayers=!0,H.refresh()))}),$("#hydroConditionGroup, #parametersGroup, #4scaleGroup").on("hide.bs.collapse",function(){var e=$(this)[0].id.replace("Group","");$("#"+e).find("i.checkBoxIcon").toggleClass("fa-check-square-o fa-square-o"),$("#"+e).find("i.chevron").toggleClass("fa-chevron-right fa-chevron-down");var t=$(this).attr("id")+"Buttons";$("#"+t).button("toggle")}),$("#hydroConditionGroup, #parametersGroup, #4scaleGroup").on("show.bs.collapse",function(){var e=$(this)[0].id.replace("Group","");$("#"+e).find("i.checkBoxIcon").toggleClass("fa-check-square-o fa-square-o"),$("#"+e).find("i.chevron").toggleClass("fa-chevron-right fa-chevron-down")}),$(".zoomto").hover(function(e){$(".zoomDialog").remove();var t=this.parentNode.id,a=$('<div class="zoomDialog"><label class="zoomClose pull-right">X</label><br><div class="list-group"><a href="#" id="zoomscale" class="list-group-item lgi-zoom zoomscale">Zoom to scale</a> <a id="zoomcenter" href="#" class="list-group-item lgi-zoom zoomcenter">Zoom to center</a><a id="zoomextent" href="#" class="list-group-item lgi-zoom zoomextent">Zoom to extent</a></div></div>');$("body").append(a),$(".zoomDialog").css("left",event.clientX-80),$(".zoomDialog").css("top",event.clientY-5),$(".zoomDialog").mouseleave(function(){$(".zoomDialog").remove()}),$(".zoomClose").click(function(){$(".zoomDialog").remove()}),$("#zoomscale").click(function(e){var a=map.getLayer(t).minScale;map.setScale(a)}),$("#zoomcenter").click(function(e){var t=new s(-83.208084,41.628103,new l({wkid:4326}));map.centerAt(t)}),$("#zoomextent").click(function(e){var a=map.getLayer(t).fullExtent;map.setExtent(a)})}),$(".opacity").hover(function(){$(".opacitySlider").remove();var e=this.parentNode.id,t=map.getLayer(e).opacity,a=$('<div class="opacitySlider"><label id="opacityValue">Opacity: '+t+'</label><label class="opacityClose pull-right">X</label><input id="slider" type="range"></div>');$("body").append(a),$("#slider")[0].value=100*t,$(".opacitySlider").css("left",event.clientX-180),$(".opacitySlider").css("top",event.clientY-5),$(".opacitySlider").mouseleave(function(){$(".opacitySlider").remove()}),$(".opacityClose").click(function(){$(".opacitySlider").remove()}),$("#slider").change(function(t){var a=$("#slider")[0].value/100;console.log("o: "+a),$("#opacityValue").html("Opacity: "+a),map.getLayer(e).setOpacity(a)})});var H=new e({map:map,layerInfos:g},"legendDiv");H.startup()})});