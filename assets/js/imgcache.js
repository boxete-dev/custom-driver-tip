/*! imgcache.js
   Copyright 2012-2016 Christophe BENOIT

   Licensed under the Apache License, Version 2.0 (the "License");
   you may not use this file except in compliance with the License.
   You may obtain a copy of the License at

       http://www.apache.org/licenses/LICENSE-2.0

   Unless required by applicable law or agreed to in writing, software
   distributed under the License is distributed on an "AS IS" BASIS,
   WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
   See the License for the specific language governing permissions and
   limitations under the License.
*/
var ImgCache={version:"1.0.0",options:{debug:!1,localCacheFolder:"imgcache",useDataURI:!1,chromeQuota:10485760,usePersistentCache:!0,cacheClearSize:0,headers:{},skipURIencoding:!1},overridables:{hash:function(e){function t(e,t,a){for(;0<a--;)e.push(t)}function a(e,t){return e<<t|e>>>32-t}function o(e,t,a){return e^t^a}function r(e,t){var a=(65535&t)+(65535&e);return(65535&(t>>>16)+(e>>>16)+(a>>>16))<<16|65535&a}var i="0123456789abcdef";return function(e){for(var t,a=[],o=4*e.length,r=0;r<o;r++)t=e[r>>2]>>8*(3-r%4),a.push(i.charAt(t>>4&15)+i.charAt(15&t));return a.join("")}(function(e,i){var n,c,s,l,d,u=e.length,g=1732584193,h=4023233417,m=2562383102,f=271733878,C=3285377520,I=[];t(I,1518500249,20),t(I,1859775393,20),t(I,2400959708,20),t(I,3395469782,20),e[i>>5]|=128<<24-i%32,e[15+(i+65>>9<<4)]=i;for(var L=0;L<u;L+=16){n=g,c=h,s=m,l=f,d=C;for(var v=0,E=[];v<80;v++){E[v]=v<16?e[v+L]:a(E[v-3]^E[v-8]^E[v-14]^E[v-16],1);var b=function(e,t,a,o,r){var i=(65535&r)+(65535&e)+(65535&t)+(65535&a)+(65535&o);return(65535&(r>>>16)+(e>>>16)+(t>>>16)+(a>>>16)+(o>>>16)+(i>>>16))<<16|65535&i}(v<20?c&s^~c&l:v<40?o(c,s,l):v<60?c&s^c&l^s&l:o(c,s,l),d,I[v],E[v],a(n,5));d=l,l=s,s=a(c,30),c=n,n=b}g=r(g,n),h=r(h,c),m=r(m,s),f=r(f,l),C=r(C,d)}return[g,h,m,f,C]}(function(e){for(var t=[],a=8*e.length,o=0;o<a;o+=8)t[o>>5]|=(255&e.charCodeAt(o/8))<<24-o%32;return t}(e).slice(),8*e.length))},log:function(e,t){"use strict";ImgCache.options.debug&&(t===LOG_LEVEL_INFO&&(e="INFO: "+e),t===LOG_LEVEL_WARNING&&(e="WARN: "+e),t===LOG_LEVEL_ERROR&&(e="ERROR: "+e),console.log(e))}},ready:!1,attributes:{}},LOG_LEVEL_INFO=1,LOG_LEVEL_WARNING=2,LOG_LEVEL_ERROR=3;!function(e){"use strict";var t={};t.sanitizeURI=function(e){if(ImgCache.options.skipURIencoding)return e;e.length>=2&&'"'===e[0]&&'"'===e[e.length-1]&&(e=e.substr(1,e.length-2));return encodeURI(e)},t.URI=function(e){e||(e="");var t=e.match(/^(?:([^:\/?\#]+):)?(?:\/\/([^\/?\#]*))?([^?\#]*)(?:\?([^\#]*))?(?:\#(.*))?/);this.scheme=t[1]||null,this.authority=t[2]||null,this.path=t[3]||null,this.query=t[4]||null,this.fragment=t[5]||null},t.URIGetFileName=function(e){if(e){var t=e.lastIndexOf("/");if(t)return e.substr(t+1).toLowerCase()}},t.URIGetPath=function(e){if(e){return t.URI(e).path.toLowerCase()}},t.fileGetExtension=function(e){if(!e)return"";var t=(e=e.split("?")[0]).split(".").pop();return!t||t.length>4?"":t},t.appendPaths=function(e,t){return t||(t=""),e&&""!==e?e+("/"==e[e.length-1]||t.length>0&&"/"==t[0]?"":"/")+t:(t.length>0&&"/"==t[0]?"":"/")+t},t.hasJqueryOrJqueryLite=function(){return ImgCache.jQuery||ImgCache.jQueryLite},t.isCordova=function(){return"undefined"!=typeof cordova||"undefined"!=typeof phonegap},t.isCordovaAndroid=function(){return t.isCordova()&&device&&device.platform&&device.platform.toLowerCase().indexOf("android")>=0},t.isCordovaWindowsPhone=function(){return t.isCordova()&&device&&device.platform&&(device.platform.toLowerCase().indexOf("win32nt")>=0||device.platform.toLowerCase().indexOf("windows")>=0)},t.isCordovaIOS=function(){return t.isCordova()&&device&&device.platform&&"ios"===device.platform.toLowerCase()},t.isCordovaAndroidOlderThan3_3=function(){return t.isCordovaAndroid()&&device.version&&(0===device.version.indexOf("2.")||0===device.version.indexOf("3.0")||0===device.version.indexOf("3.1")||0===device.version.indexOf("3.2"))},t.isCordovaAndroidOlderThan4=function(){return t.isCordovaAndroid()&&device.version&&(0===device.version.indexOf("2.")||0===device.version.indexOf("3."))},t.EntryToURL=function(e){return t.isCordovaAndroidOlderThan4()&&"function"==typeof e.toNativeURL?e.toNativeURL():"function"==typeof e.toInternalURL?e.toInternalURL():e.toURL()},t.EntryGetURL=function(e){return"function"==typeof e.toURL?t.EntryToURL(e):e.toURI()},t.EntryGetPath=function(e){return t.isCordova()?t.isCordovaIOS()?t.isCordovaAndroidOlderThan3_3()?e.fullPath:e.nativeURL:"function"==typeof e.toURL?t.EntryToURL(e):e.fullPath:e.fullPath},t.getCordovaStorageType=function(e){if("undefined"!=typeof LocalFileSystem){if(e&&LocalFileSystem.hasOwnProperty("PERSISTENT"))return LocalFileSystem.PERSISTENT;if(!e&&LocalFileSystem.hasOwnProperty("TEMPORARY"))return LocalFileSystem.TEMPORARY}return e?window.PERSISTENT:window.TEMPORARY};var a={};a.trigger=function(a,o){ImgCache.jQuery?e(a).trigger(o):(!t.isCordovaWindowsPhone()&&window.CustomEvent||(window.CustomEvent=function(e,t){var a;t=t||{bubbles:!1,cancelable:!1,detail:void 0};try{(a=document.createEvent("CustomEvent")).initCustomEvent(e,t.bubbles,t.cancelable,t.detail)}catch(o){(a=document.createEvent("Event")).initEvent(e,t.bubbles,t.cancelable),a.detail=t.detail}return a}),a.dispatchEvent(new CustomEvent(o)))},a.removeAttribute=function(e,a){t.hasJqueryOrJqueryLite()?e.removeAttr(a):e.removeAttribute(a)},a.setAttribute=function(e,a,o){t.hasJqueryOrJqueryLite()?e.attr(a,o):e.setAttribute(a,o)},a.getAttribute=function(e,a){return t.hasJqueryOrJqueryLite()?e.attr(a):e.getAttribute(a)},a.getBackgroundImage=function(e){if(t.hasJqueryOrJqueryLite())return e.attr("data-old-background")?"url("+e.attr("data-old-background")+")":e.css("background-image");var a=window.getComputedStyle(e,null);if(a)return e.getAttribute("data-old-background")?"url("+e.getAttribute("data-old-background")+")":a.backgroundImage},a.setBackgroundImage=function(e,a){t.hasJqueryOrJqueryLite()?e.css("background-image",a):e.style.backgroundImage=a};var o={attributes:{}};o.isImgCacheLoaded=function(){return!(!ImgCache.attributes.filesystem||!ImgCache.attributes.dirEntry)||(ImgCache.overridables.log("ImgCache not loaded yet! - Have you called ImgCache.init() first?",LOG_LEVEL_WARNING),!1)},o.attributes.hasLocalStorage=!1,o.hasLocalStorage=function(){if(o.attributes.hasLocalStorage)return o.attributes.hasLocalStorage;try{var e=ImgCache.overridables.hash("imgcache_test");return localStorage.setItem(e,e),localStorage.removeItem(e),o.attributes.hasLocalStorage=!0,!0}catch(e){return ImgCache.overridables.log("Could not write to local storage: "+e.message,LOG_LEVEL_INFO),!1}},o.setCurrentSize=function(e){ImgCache.overridables.log("current size: "+e,LOG_LEVEL_INFO),o.hasLocalStorage()&&localStorage.setItem("imgcache:"+ImgCache.options.localCacheFolder,e)},o.getCachedFilePath=function(e){return t.appendPaths(ImgCache.options.localCacheFolder,o.getCachedFileName(e))},o.getCachedFileFullPath=function(e){var a=t.EntryGetPath(ImgCache.attributes.dirEntry);return t.appendPaths(a,o.getCachedFileName(e))},o.getCachedFileName=function(e){if(e){var a=ImgCache.overridables.hash(e),o=t.fileGetExtension(t.URIGetFileName(e));return a+(o?"."+o:"")}ImgCache.overridables.log("No source given to getCachedFileName",LOG_LEVEL_WARNING)},o.setNewImgPath=function(e,t,o){a.setAttribute(e,"src",t),a.setAttribute(e,r,o)},o.createCacheDir=function(e,o){if(!ImgCache.attributes.filesystem)return ImgCache.overridables.log("Filesystem instance was not initialised",LOG_LEVEL_ERROR),void(o&&o());var r=function(e){ImgCache.overridables.log("Failed to get/create local cache directory: "+e.code,LOG_LEVEL_ERROR),o&&o()};ImgCache.attributes.filesystem.root.getDirectory(ImgCache.options.localCacheFolder,{create:!0,exclusive:!1},function(o){if(ImgCache.attributes.dirEntry=o,ImgCache.overridables.log("Local cache folder opened: "+t.EntryGetPath(o),LOG_LEVEL_INFO),t.isCordovaAndroid()){var i=function(){ImgCache.overridables.log(".nomedia file created.",LOG_LEVEL_INFO),e&&e()};o.getFile(".nomedia",{create:!0,exclusive:!1},i,r)}else t.isCordovaWindowsPhone()?e&&e():(t.isCordovaIOS()&&o.setMetadata&&o.setMetadata(function(){ImgCache.overridables.log("com.apple.MobileBackup metadata set",LOG_LEVEL_INFO)},function(){ImgCache.overridables.log("com.apple.MobileBackup metadata could not be set",LOG_LEVEL_WARNING)},{"com.apple.MobileBackup":1}),e&&e());ImgCache.ready=!0,a.trigger(document,n)},r)},o.FileTransferWrapper=function(e){t.isCordova()&&(this.fileTransfer=new FileTransfer),this.filesystem=e},o.FileTransferWrapper.prototype.download=function(e,t,a,o,r){var i=ImgCache.options.headers||{},n="function"==typeof r;if(this.fileTransfer)return n&&(this.fileTransfer.onprogress=r),this.fileTransfer.download(e,t,a,o,!1,{headers:i});var c=this.filesystem,s=function(a,o,r){ImgCache.overridables.log(a,o),r&&r({code:0,source:e,target:t})},l=new XMLHttpRequest;l.open("GET",e,!0),n&&(l.onprogress=r),l.responseType="blob";for(var d in i)l.setRequestHeader(d,i[d]);l.onload=function(){!l.response||200!==l.status&&0!==l.status?s("Image "+e+" could not be downloaded - status: "+l.status,3,o):c.root.getFile(t,{create:!0},function(e){e.createWriter(function(t){t.onerror=o,t.onwriteend=function(){a(e)},t.write(l.response,o)},o)},o)},l.onerror=function(){s("XHR error - Image "+e+" could not be downloaded - status: "+l.status,3,o)},l.send()},o.getBackgroundImageURL=function(e){var t=a.getBackgroundImage(e);if(t){return/\((.+)\)/.exec(t)[1].replace(/(['"])/g,"")}},o.loadCachedFile=function(e,a,r,i,n){if(o.isImgCacheLoaded()&&e){var c=t.URIGetFileName(a);ImgCache.attributes.filesystem.root.getFile(o.getCachedFilePath(a),{create:!1},function(o){if(ImgCache.options.useDataURI){var s=function(t){var o=new FileReader;o.onloadend=function(t){var o=t.target.result;if(!o)return ImgCache.overridables.log("File in cache "+c+" is empty",LOG_LEVEL_WARNING),void(n&&n(e));r(e,o,a),ImgCache.overridables.log("File "+c+" loaded from cache",LOG_LEVEL_INFO),i&&i(e)},o.readAsDataURL(t)},l=function(t){ImgCache.overridables.log("Failed to read file "+t.code,LOG_LEVEL_ERROR),n&&n(e)};o.file(s,l)}else{var d=t.EntryGetURL(o);r(e,d,a),ImgCache.overridables.log("File "+c+" loaded from cache",LOG_LEVEL_INFO),i&&i(e)}},function(){ImgCache.overridables.log("File "+c+" not in cache",LOG_LEVEL_INFO),n&&n(e)})}};var r="data-old-src",i="data-old-background",n="ImgCacheReady";ImgCache.init=function(e,a){ImgCache.jQuery=!(!window.jQuery&&!window.Zepto),ImgCache.jQueryLite=!(void 0===window.angular||!window.angular.element),ImgCache.attributes.init_callback=e,ImgCache.overridables.log("ImgCache initialising",LOG_LEVEL_INFO);var r=function(e){ImgCache.overridables.log("LocalFileSystem opened",LOG_LEVEL_INFO),ImgCache.attributes.filesystem=e,o.createCacheDir(function(){!function(e){ImgCache.options.cacheClearSize>0&&ImgCache.getCurrentSize()>1024*ImgCache.options.cacheClearSize*1024?ImgCache.clearCache(e,e):e&&e()}(ImgCache.attributes.init_callback)},a)},i=function(e){ImgCache.overridables.log("Failed to initialise LocalFileSystem "+e.code,LOG_LEVEL_ERROR),a&&a()};if(t.isCordova()&&window.requestFileSystem)window.requestFileSystem(t.getCordovaStorageType(ImgCache.options.usePersistentCache),0,r,i);else{var n=window.requestFileSystem||window.webkitRequestFileSystem;if(window.storageInfo=window.storageInfo||(ImgCache.options.usePersistentCache?navigator.webkitPersistentStorage:navigator.webkitTemporaryStorage),!window.storageInfo)return ImgCache.overridables.log("Your browser does not support the html5 File API",LOG_LEVEL_WARNING),void(a&&a());var c=ImgCache.options.chromeQuota;window.storageInfo.requestQuota(c,function(){var e=ImgCache.options.usePersistentCache?window.storageInfo.PERSISTENT:window.storageInfo.TEMPORARY;n(e,c,r,i)},function(e){ImgCache.overridables.log("Failed to request quota: "+e.message,LOG_LEVEL_ERROR),a&&a()})}},ImgCache.getCurrentSize=function(){if(o.hasLocalStorage()){var e=localStorage.getItem("imgcache:"+ImgCache.options.localCacheFolder);return null===e?0:parseInt(e,10)}return 0},ImgCache.cacheFile=function(e,a,r,i){if(o.isImgCacheLoaded()&&e){e=t.sanitizeURI(e);var n=o.getCachedFileFullPath(e);new o.FileTransferWrapper(ImgCache.attributes.filesystem).download(e,n,function(e){e.getMetadata(function(e){e&&"size"in e?(ImgCache.overridables.log("Cached file size: "+e.size,LOG_LEVEL_INFO),o.setCurrentSize(ImgCache.getCurrentSize()+parseInt(e.size,10))):ImgCache.overridables.log("No metadata size property available",LOG_LEVEL_INFO)}),ImgCache.overridables.log("Download complete: "+t.EntryGetPath(e),LOG_LEVEL_INFO),e.setMetadata&&e.setMetadata(function(){ImgCache.overridables.log("com.apple.MobileBackup metadata set",LOG_LEVEL_INFO)},function(){ImgCache.overridables.log("com.apple.MobileBackup metadata could not be set",LOG_LEVEL_WARNING)},{"com.apple.MobileBackup":1}),a&&a(e.toURL())},function(e){e.source&&ImgCache.overridables.log("Download error source: "+e.source,LOG_LEVEL_ERROR),e.target&&ImgCache.overridables.log("Download error target: "+e.target,LOG_LEVEL_ERROR),ImgCache.overridables.log("Download error code: "+e.code,LOG_LEVEL_ERROR),r&&r()},i)}},ImgCache.getCachedFile=function(e,a){if(o.isImgCacheLoaded()&&a){e=t.sanitizeURI(e);var r=o.getCachedFilePath(e);t.isCordovaAndroid()&&0===r.indexOf("file://")&&(r=r.substr(7)),ImgCache.attributes.filesystem.root.getFile(r,{create:!1},function(t){a(e,t)},function(){a(e,null)})}},ImgCache.getCachedFileURL=function(e,a,o){ImgCache.getCachedFile(e,function(e,r){r?a(e,t.EntryGetURL(r)):o&&o(e)})},ImgCache.isCached=function(e,t){ImgCache.getCachedFile(e,function(e,a){t(e,null!==a)})},ImgCache.useOnlineFile=function(e){if(o.isImgCacheLoaded()&&e){var t=a.getAttribute(e,r);t&&a.setAttribute(e,"src",t),a.removeAttribute(e,r)}},ImgCache.useCachedFile=function(e,t,r){o.isImgCacheLoaded()&&o.loadCachedFile(e,a.getAttribute(e,"src"),o.setNewImgPath,t,r)},ImgCache.useCachedFileWithSource=function(e,a,r,i){if(o.isImgCacheLoaded()){var n=t.sanitizeURI(a);o.loadCachedFile(e,n,o.setNewImgPath,r,i)}},ImgCache.clearCache=function(e,t){o.isImgCacheLoaded()&&ImgCache.attributes.dirEntry.removeRecursively(function(){ImgCache.overridables.log("Local cache cleared",LOG_LEVEL_INFO),o.setCurrentSize(0),o.createCacheDir(e,t)},function(e){ImgCache.overridables.log("Failed to remove directory or its contents: "+e.code,LOG_LEVEL_ERROR),t&&t()})},ImgCache.removeFile=function(e,a,r){e=t.sanitizeURI(e);var i=o.getCachedFilePath(e),n=function(e){ImgCache.overridables.log("Failed to remove file due to "+e.code,LOG_LEVEL_ERROR),r&&r()};ImgCache.attributes.filesystem.root.getFile(i,{create:!1},function(e){e.remove(function(){a&&a()},n)},n)},ImgCache.isBackgroundCached=function(e,t){var a=o.getBackgroundImageURL(e);ImgCache.getCachedFile(a,function(e,a){t(e,null!==a)})},ImgCache.cacheBackground=function(e,t,a,r){if(o.isImgCacheLoaded()){var i=o.getBackgroundImageURL(e);if(!i)return ImgCache.overridables.log("No background to cache",LOG_LEVEL_WARNING),void(a&&a());ImgCache.overridables.log("Background image URL: "+i,LOG_LEVEL_INFO),ImgCache.cacheFile(i,t,a,r)}},ImgCache.useCachedBackground=function(e,t,r){if(o.isImgCacheLoaded()){var n=o.getBackgroundImageURL(e);if(!n)return ImgCache.overridables.log("No background to cache",LOG_LEVEL_WARNING),void(r&&r());o.loadCachedFile(e,n,function(e,t,o){a.setBackgroundImage(e,'url("'+t+'")'),a.setAttribute(e,i,o)},t,r)}},ImgCache.useBackgroundOnlineFile=function(e){if(e){var t=a.getAttribute(e,i);t&&a.setBackgroundImage(e,'url("'+t+'")'),a.removeAttribute(e,i)}},ImgCache.getCacheFolderURI=function(){if(o.isImgCacheLoaded())return t.EntryGetURL(ImgCache.attributes.dirEntry)},ImgCache.helpers=t,ImgCache.domHelpers=a,ImgCache.private=o,"function"==typeof define&&define.amd?define("imgcache",[],function(){return ImgCache}):"object"==typeof module&&module.exports?module.exports=ImgCache:window.ImgCache=ImgCache}(window.jQuery||window.Zepto||function(){throw"jQuery is not available"});