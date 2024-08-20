
// `modulePromise` is a promise to the `WebAssembly.module` object to be
//   instantiated.
// `importObjectPromise` is a promise to an object that contains any additional
//   imports needed by the module that aren't provided by the standard runtime.
//   The fields on this object will be merged into the importObject with which
//   the module will be instantiated.
// This function returns a promise to the instantiated module.
export const instantiate = async (modulePromise, importObjectPromise) => {
    let dartInstance;

    // Prints to the console
    function printToConsole(value) {
      if (typeof dartPrint == "function") {
        dartPrint(value);
        return;
      }
      if (typeof console == "object" && typeof console.log != "undefined") {
        console.log(value);
        return;
      }
      if (typeof print == "function") {
        print(value);
        return;
      }

      throw "Unable to print message: " + js;
    }

    // Converts a Dart List to a JS array. Any Dart objects will be converted, but
    // this will be cheap for JSValues.
    function arrayFromDartList(constructor, list) {
      const exports = dartInstance.exports;
      const read = exports.$listRead;
      const length = exports.$listLength(list);
      const array = new constructor(length);
      for (let i = 0; i < length; i++) {
        array[i] = read(list, i);
      }
      return array;
    }

    // A special symbol attached to functions that wrap Dart functions.
    const jsWrappedDartFunctionSymbol = Symbol("JSWrappedDartFunction");

    function finalizeWrapper(dartFunction, wrapped) {
      wrapped.dartFunction = dartFunction;
      wrapped[jsWrappedDartFunctionSymbol] = true;
      return wrapped;
    }

    // Imports
    const dart2wasm = {

_1: (x0,x1,x2) => x0.set(x1,x2),
_2: (x0,x1,x2) => x0.set(x1,x2),
_6: f => finalizeWrapper(f, function(x0) { return dartInstance.exports._6(f,arguments.length,x0) }),
_7: x0 => new window.FinalizationRegistry(x0),
_8: (x0,x1,x2,x3) => x0.register(x1,x2,x3),
_9: (x0,x1) => x0.unregister(x1),
_10: (x0,x1,x2) => x0.slice(x1,x2),
_11: (x0,x1) => x0.decode(x1),
_12: (x0,x1) => x0.segment(x1),
_13: () => new TextDecoder(),
_14: x0 => x0.buffer,
_15: x0 => x0.wasmMemory,
_16: () => globalThis.window._flutter_skwasmInstance,
_17: x0 => x0.rasterStartMilliseconds,
_18: x0 => x0.rasterEndMilliseconds,
_19: x0 => x0.imageBitmaps,
_167: x0 => x0.select(),
_168: (x0,x1) => x0.append(x1),
_169: x0 => x0.remove(),
_172: x0 => x0.unlock(),
_177: x0 => x0.getReader(),
_187: x0 => new MutationObserver(x0),
_206: (x0,x1,x2) => x0.addEventListener(x1,x2),
_207: (x0,x1,x2) => x0.removeEventListener(x1,x2),
_210: x0 => new ResizeObserver(x0),
_213: (x0,x1) => new Intl.Segmenter(x0,x1),
_214: x0 => x0.next(),
_215: (x0,x1) => new Intl.v8BreakIterator(x0,x1),
_292: x0 => x0.close(),
_293: (x0,x1,x2,x3,x4) => ({type: x0,data: x1,premultiplyAlpha: x2,colorSpaceConversion: x3,preferAnimation: x4}),
_294: x0 => new window.ImageDecoder(x0),
_295: x0 => x0.close(),
_296: x0 => ({frameIndex: x0}),
_297: (x0,x1) => x0.decode(x1),
_300: f => finalizeWrapper(f, function(x0) { return dartInstance.exports._300(f,arguments.length,x0) }),
_301: f => finalizeWrapper(f, function(x0) { return dartInstance.exports._301(f,arguments.length,x0) }),
_302: (x0,x1) => ({addView: x0,removeView: x1}),
_303: f => finalizeWrapper(f, function(x0) { return dartInstance.exports._303(f,arguments.length,x0) }),
_304: f => finalizeWrapper(f, function() { return dartInstance.exports._304(f,arguments.length) }),
_305: (x0,x1) => ({initializeEngine: x0,autoStart: x1}),
_306: f => finalizeWrapper(f, function(x0) { return dartInstance.exports._306(f,arguments.length,x0) }),
_307: x0 => ({runApp: x0}),
_308: x0 => new Uint8Array(x0),
_310: x0 => x0.preventDefault(),
_311: x0 => x0.stopPropagation(),
_312: (x0,x1) => x0.addListener(x1),
_313: (x0,x1) => x0.removeListener(x1),
_314: (x0,x1) => x0.prepend(x1),
_315: x0 => x0.remove(),
_316: x0 => x0.disconnect(),
_317: (x0,x1) => x0.addListener(x1),
_318: (x0,x1) => x0.removeListener(x1),
_320: (x0,x1) => x0.append(x1),
_321: x0 => x0.remove(),
_322: x0 => x0.stopPropagation(),
_326: x0 => x0.preventDefault(),
_327: (x0,x1) => x0.append(x1),
_328: x0 => x0.remove(),
_329: x0 => x0.preventDefault(),
_330: x0 => x0.preventDefault(),
_335: (x0,x1) => x0.appendChild(x1),
_336: (x0,x1,x2) => x0.insertBefore(x1,x2),
_337: (x0,x1) => x0.removeChild(x1),
_338: (x0,x1) => x0.appendChild(x1),
_339: (x0,x1) => x0.transferFromImageBitmap(x1),
_340: (x0,x1) => x0.append(x1),
_341: (x0,x1) => x0.append(x1),
_342: (x0,x1) => x0.append(x1),
_343: x0 => x0.remove(),
_344: x0 => x0.remove(),
_345: x0 => x0.remove(),
_346: (x0,x1) => x0.appendChild(x1),
_347: (x0,x1) => x0.appendChild(x1),
_348: x0 => x0.remove(),
_349: (x0,x1) => x0.append(x1),
_350: (x0,x1) => x0.append(x1),
_351: x0 => x0.remove(),
_352: (x0,x1) => x0.append(x1),
_353: (x0,x1) => x0.append(x1),
_354: (x0,x1,x2) => x0.insertBefore(x1,x2),
_355: (x0,x1) => x0.append(x1),
_356: (x0,x1,x2) => x0.insertBefore(x1,x2),
_357: x0 => x0.remove(),
_358: x0 => x0.remove(),
_359: (x0,x1) => x0.append(x1),
_360: x0 => x0.remove(),
_361: (x0,x1) => x0.append(x1),
_362: x0 => x0.remove(),
_363: x0 => x0.remove(),
_364: x0 => x0.getBoundingClientRect(),
_365: x0 => x0.remove(),
_366: x0 => x0.blur(),
_367: x0 => x0.remove(),
_368: x0 => x0.blur(),
_369: x0 => x0.remove(),
_382: (x0,x1) => x0.append(x1),
_383: x0 => x0.remove(),
_384: (x0,x1) => x0.append(x1),
_385: (x0,x1,x2) => x0.insertBefore(x1,x2),
_386: x0 => x0.preventDefault(),
_387: x0 => x0.preventDefault(),
_388: x0 => x0.preventDefault(),
_389: x0 => x0.preventDefault(),
_390: x0 => x0.remove(),
_391: (x0,x1) => x0.observe(x1),
_392: x0 => x0.disconnect(),
_393: (x0,x1) => x0.appendChild(x1),
_394: (x0,x1) => x0.appendChild(x1),
_395: (x0,x1) => x0.appendChild(x1),
_396: (x0,x1) => x0.append(x1),
_397: x0 => x0.remove(),
_398: (x0,x1) => x0.append(x1),
_399: (x0,x1) => x0.append(x1),
_400: (x0,x1) => x0.appendChild(x1),
_401: (x0,x1) => x0.append(x1),
_402: x0 => x0.remove(),
_403: (x0,x1) => x0.append(x1),
_407: (x0,x1) => x0.appendChild(x1),
_408: x0 => x0.remove(),
_968: () => globalThis.window.flutterConfiguration,
_969: x0 => x0.assetBase,
_974: x0 => x0.debugShowSemanticsNodes,
_975: x0 => x0.hostElement,
_976: x0 => x0.multiViewEnabled,
_977: x0 => x0.nonce,
_979: x0 => x0.fontFallbackBaseUrl,
_980: x0 => x0.useColorEmoji,
_984: x0 => x0.console,
_985: x0 => x0.devicePixelRatio,
_986: x0 => x0.document,
_987: x0 => x0.history,
_988: x0 => x0.innerHeight,
_989: x0 => x0.innerWidth,
_990: x0 => x0.location,
_991: x0 => x0.navigator,
_992: x0 => x0.visualViewport,
_993: x0 => x0.performance,
_995: (x0,x1) => x0.fetch(x1),
_998: (x0,x1) => x0.dispatchEvent(x1),
_999: (x0,x1) => x0.matchMedia(x1),
_1000: (x0,x1) => x0.getComputedStyle(x1),
_1002: x0 => x0.screen,
_1003: (x0,x1) => x0.requestAnimationFrame(x1),
_1004: f => finalizeWrapper(f, function(x0) { return dartInstance.exports._1004(f,arguments.length,x0) }),
_1009: (x0,x1) => x0.warn(x1),
_1012: (x0,x1) => x0.debug(x1),
_1013: () => globalThis.window,
_1014: () => globalThis.Intl,
_1015: () => globalThis.Symbol,
_1018: x0 => x0.clipboard,
_1019: x0 => x0.maxTouchPoints,
_1020: x0 => x0.vendor,
_1021: x0 => x0.language,
_1022: x0 => x0.platform,
_1023: x0 => x0.userAgent,
_1024: x0 => x0.languages,
_1025: x0 => x0.documentElement,
_1026: (x0,x1) => x0.querySelector(x1),
_1028: (x0,x1) => x0.createElement(x1),
_1030: (x0,x1) => x0.execCommand(x1),
_1034: (x0,x1) => x0.createTextNode(x1),
_1035: (x0,x1) => x0.createEvent(x1),
_1039: x0 => x0.head,
_1040: x0 => x0.body,
_1041: (x0,x1) => x0.title = x1,
_1044: x0 => x0.activeElement,
_1046: x0 => x0.visibilityState,
_1047: () => globalThis.document,
_1048: (x0,x1,x2) => x0.addEventListener(x1,x2),
_1049: (x0,x1,x2,x3) => x0.addEventListener(x1,x2,x3),
_1050: (x0,x1,x2,x3) => x0.addEventListener(x1,x2,x3),
_1052: (x0,x1,x2) => x0.removeEventListener(x1,x2),
_1055: f => finalizeWrapper(f, function(x0) { return dartInstance.exports._1055(f,arguments.length,x0) }),
_1056: x0 => x0.target,
_1058: x0 => x0.timeStamp,
_1059: x0 => x0.type,
_1060: x0 => x0._cancelable,
_1061: x0 => x0.preventDefault(),
_1065: (x0,x1,x2,x3) => x0.initEvent(x1,x2,x3),
_1069: x0 => x0.baseURI,
_1070: x0 => x0.firstChild,
_1075: x0 => x0.parentElement,
_1077: x0 => x0.parentNode,
_1080: (x0,x1) => x0.removeChild(x1),
_1081: (x0,x1) => x0.removeChild(x1),
_1082: x0 => x0.isConnected,
_1083: (x0,x1) => x0.textContent = x1,
_1087: (x0,x1) => x0.contains(x1),
_1092: x0 => x0.firstElementChild,
_1094: x0 => x0.nextElementSibling,
_1095: x0 => x0.clientHeight,
_1096: x0 => x0.clientWidth,
_1097: x0 => x0.offsetHeight,
_1098: x0 => x0.offsetWidth,
_1099: x0 => x0.id,
_1100: (x0,x1) => x0.id = x1,
_1103: (x0,x1) => x0.spellcheck = x1,
_1104: x0 => x0.tagName,
_1105: x0 => x0.style,
_1106: (x0,x1) => x0.append(x1),
_1107: (x0,x1) => x0.getAttribute(x1),
_1108: x0 => x0.getBoundingClientRect(),
_1111: (x0,x1) => x0.closest(x1),
_1113: (x0,x1) => x0.querySelectorAll(x1),
_1114: x0 => x0.remove(),
_1115: (x0,x1,x2) => x0.setAttribute(x1,x2),
_1117: (x0,x1) => x0.removeAttribute(x1),
_1118: (x0,x1) => x0.tabIndex = x1,
_1121: (x0,x1) => x0.focus(x1),
_1122: x0 => x0.scrollTop,
_1123: (x0,x1) => x0.scrollTop = x1,
_1124: x0 => x0.scrollLeft,
_1125: (x0,x1) => x0.scrollLeft = x1,
_1126: x0 => x0.classList,
_1127: (x0,x1) => x0.className = x1,
_1131: (x0,x1) => x0.getElementsByClassName(x1),
_1132: x0 => x0.click(),
_1134: (x0,x1) => x0.hasAttribute(x1),
_1136: (x0,x1) => x0.attachShadow(x1),
_1140: (x0,x1) => x0.getPropertyValue(x1),
_1142: (x0,x1,x2,x3) => x0.setProperty(x1,x2,x3),
_1144: (x0,x1) => x0.removeProperty(x1),
_1146: x0 => x0.offsetLeft,
_1147: x0 => x0.offsetTop,
_1148: x0 => x0.offsetParent,
_1150: (x0,x1) => x0.name = x1,
_1151: x0 => x0.content,
_1152: (x0,x1) => x0.content = x1,
_1165: (x0,x1) => x0.nonce = x1,
_1170: x0 => x0.now(),
_1172: (x0,x1) => x0.width = x1,
_1174: (x0,x1) => x0.height = x1,
_1178: (x0,x1) => x0.getContext(x1),
_1253: x0 => x0.status,
_1254: x0 => x0.headers,
_1255: x0 => x0.body,
_1256: x0 => x0.arrayBuffer(),
_1259: (x0,x1) => x0.get(x1),
_1261: x0 => x0.read(),
_1262: x0 => x0.value,
_1263: x0 => x0.done,
_1265: x0 => x0.name,
_1266: x0 => x0.x,
_1267: x0 => x0.y,
_1270: x0 => x0.top,
_1271: x0 => x0.right,
_1272: x0 => x0.bottom,
_1273: x0 => x0.left,
_1282: x0 => x0.height,
_1283: x0 => x0.width,
_1284: (x0,x1) => x0.value = x1,
_1286: (x0,x1) => x0.placeholder = x1,
_1287: (x0,x1) => x0.name = x1,
_1288: x0 => x0.selectionDirection,
_1289: x0 => x0.selectionStart,
_1290: x0 => x0.selectionEnd,
_1293: x0 => x0.value,
_1294: (x0,x1,x2) => x0.setSelectionRange(x1,x2),
_1299: x0 => x0.readText(),
_1300: (x0,x1) => x0.writeText(x1),
_1301: x0 => x0.altKey,
_1302: x0 => x0.code,
_1303: x0 => x0.ctrlKey,
_1304: x0 => x0.key,
_1305: x0 => x0.keyCode,
_1306: x0 => x0.location,
_1307: x0 => x0.metaKey,
_1308: x0 => x0.repeat,
_1309: x0 => x0.shiftKey,
_1310: x0 => x0.isComposing,
_1311: (x0,x1) => x0.getModifierState(x1),
_1312: x0 => x0.state,
_1314: (x0,x1) => x0.go(x1),
_1315: (x0,x1,x2,x3) => x0.pushState(x1,x2,x3),
_1316: (x0,x1,x2,x3) => x0.replaceState(x1,x2,x3),
_1317: x0 => x0.pathname,
_1318: x0 => x0.search,
_1319: x0 => x0.hash,
_1322: x0 => x0.state,
_1327: f => finalizeWrapper(f, function(x0,x1) { return dartInstance.exports._1327(f,arguments.length,x0,x1) }),
_1329: (x0,x1,x2) => x0.observe(x1,x2),
_1332: x0 => x0.attributeName,
_1333: x0 => x0.type,
_1334: x0 => x0.matches,
_1338: x0 => x0.matches,
_1339: x0 => x0.relatedTarget,
_1340: x0 => x0.clientX,
_1341: x0 => x0.clientY,
_1342: x0 => x0.offsetX,
_1343: x0 => x0.offsetY,
_1346: x0 => x0.button,
_1347: x0 => x0.buttons,
_1348: x0 => x0.ctrlKey,
_1349: (x0,x1) => x0.getModifierState(x1),
_1350: x0 => x0.pointerId,
_1351: x0 => x0.pointerType,
_1352: x0 => x0.pressure,
_1353: x0 => x0.tiltX,
_1354: x0 => x0.tiltY,
_1355: x0 => x0.getCoalescedEvents(),
_1356: x0 => x0.deltaX,
_1357: x0 => x0.deltaY,
_1358: x0 => x0.wheelDeltaX,
_1359: x0 => x0.wheelDeltaY,
_1360: x0 => x0.deltaMode,
_1365: x0 => x0.changedTouches,
_1367: x0 => x0.clientX,
_1368: x0 => x0.clientY,
_1369: x0 => x0.data,
_1370: (x0,x1) => x0.type = x1,
_1371: (x0,x1) => x0.max = x1,
_1372: (x0,x1) => x0.min = x1,
_1373: (x0,x1) => x0.value = x1,
_1374: x0 => x0.value,
_1375: x0 => x0.disabled,
_1376: (x0,x1) => x0.disabled = x1,
_1377: (x0,x1) => x0.placeholder = x1,
_1378: (x0,x1) => x0.name = x1,
_1379: (x0,x1) => x0.autocomplete = x1,
_1380: x0 => x0.selectionDirection,
_1381: x0 => x0.selectionStart,
_1382: x0 => x0.selectionEnd,
_1386: (x0,x1,x2) => x0.setSelectionRange(x1,x2),
_1393: (x0,x1) => x0.add(x1),
_1396: (x0,x1) => x0.noValidate = x1,
_1397: (x0,x1) => x0.method = x1,
_1398: (x0,x1) => x0.action = x1,
_1426: x0 => x0.orientation,
_1427: x0 => x0.width,
_1428: x0 => x0.height,
_1429: (x0,x1) => x0.lock(x1),
_1446: f => finalizeWrapper(f, function(x0,x1) { return dartInstance.exports._1446(f,arguments.length,x0,x1) }),
_1456: x0 => x0.length,
_1457: (x0,x1) => x0.item(x1),
_1458: x0 => x0.length,
_1459: (x0,x1) => x0.item(x1),
_1460: x0 => x0.iterator,
_1461: x0 => x0.Segmenter,
_1462: x0 => x0.v8BreakIterator,
_1465: x0 => x0.done,
_1466: x0 => x0.value,
_1467: x0 => x0.index,
_1471: (x0,x1) => x0.adoptText(x1),
_1473: x0 => x0.first(),
_1474: x0 => x0.next(),
_1475: x0 => x0.current(),
_1487: x0 => x0.hostElement,
_1488: x0 => x0.viewConstraints,
_1490: x0 => x0.maxHeight,
_1491: x0 => x0.maxWidth,
_1492: x0 => x0.minHeight,
_1493: x0 => x0.minWidth,
_1494: x0 => x0.loader,
_1495: () => globalThis._flutter,
_1496: (x0,x1) => x0.didCreateEngineInitializer(x1),
_1497: (x0,x1,x2) => x0.call(x1,x2),
_1498: () => globalThis.Promise,
_1499: f => finalizeWrapper(f, function(x0,x1) { return dartInstance.exports._1499(f,arguments.length,x0,x1) }),
_1504: x0 => x0.length,
_1507: x0 => x0.tracks,
_1511: x0 => x0.image,
_1516: x0 => x0.codedWidth,
_1517: x0 => x0.codedHeight,
_1520: x0 => x0.duration,
_1524: x0 => x0.ready,
_1525: x0 => x0.selectedTrack,
_1526: x0 => x0.repetitionCount,
_1527: x0 => x0.frameCount,
_1572: (x0,x1,x2,x3) => x0.open(x1,x2,x3),
_1573: (x0,x1,x2) => x0.setRequestHeader(x1,x2),
_1574: f => finalizeWrapper(f, function(x0) { return dartInstance.exports._1574(f,arguments.length,x0) }),
_1575: (x0,x1,x2) => x0.addEventListener(x1,x2),
_1576: f => finalizeWrapper(f, function(x0) { return dartInstance.exports._1576(f,arguments.length,x0) }),
_1577: x0 => x0.send(),
_1578: () => new XMLHttpRequest(),
_1595: x0 => x0.remove(),
_1596: x0 => globalThis.URL.createObjectURL(x0),
_1597: f => finalizeWrapper(f, function(x0) { return dartInstance.exports._1597(f,arguments.length,x0) }),
_1598: f => finalizeWrapper(f, function(x0) { return dartInstance.exports._1598(f,arguments.length,x0) }),
_1599: f => finalizeWrapper(f, function(x0) { return dartInstance.exports._1599(f,arguments.length,x0) }),
_1600: (x0,x1) => x0.querySelector(x1),
_1601: (x0,x1) => x0.createElement(x1),
_1602: (x0,x1) => x0.append(x1),
_1603: (x0,x1,x2) => x0.setAttribute(x1,x2),
_1604: (x0,x1) => x0.replaceChildren(x1),
_1605: (x0,x1) => x0.append(x1),
_1606: x0 => x0.click(),
_1607: x0 => x0.play(),
_1608: x0 => x0.pause(),
_1611: (x0,x1,x2) => x0.addEventListener(x1,x2),
_1614: (x0,x1,x2) => x0.removeEventListener(x1,x2),
_1616: (x0,x1) => x0.removeAttribute(x1),
_1617: x0 => x0.load(),
_1618: (x0,x1) => x0.start(x1),
_1619: (x0,x1) => x0.end(x1),
_1620: (x0,x1,x2,x3) => x0.addEventListener(x1,x2,x3),
_1627: (x0,x1,x2,x3) => x0.removeEventListener(x1,x2,x3),
_1630: (x0,x1,x2,x3) => x0.open(x1,x2,x3),
_1631: x0 => ({url: x0}),
_1632: (x0,x1) => x0.canShare(x1),
_1633: (x0,x1) => x0.share(x1),
_1634: (x0,x1) => ({title: x0,text: x1}),
_1635: x0 => ({text: x0}),
_1636: (x0,x1,x2) => ({files: x0,title: x1,text: x2}),
_1637: (x0,x1) => ({files: x0,text: x1}),
_1638: (x0,x1) => ({files: x0,title: x1}),
_1639: x0 => ({files: x0}),
_1640: () => ({}),
_1641: (x0,x1,x2) => new File(x0,x1,x2),
_1642: x0 => x0.getVideoTracks(),
_1643: x0 => x0.stop(),
_1644: x0 => x0.enumerateDevices(),
_1645: x0 => x0.getVideoTracks(),
_1646: x0 => x0.stop(),
_1647: x0 => new Event(x0),
_1648: x0 => x0.requestFullscreen(),
_1649: (x0,x1) => x0.lock(x1),
_1650: x0 => x0.unlock(),
_1651: (x0,x1) => x0.getUserMedia(x1),
_1652: x0 => x0.getSupportedConstraints(),
_1653: x0 => x0.getVideoTracks(),
_1654: x0 => x0.getCapabilities(),
_1655: x0 => x0.getSupportedConstraints(),
_1656: x0 => x0.getSettings(),
_1657: x0 => x0.getCapabilities(),
_1658: (x0,x1,x2) => x0.setProperty(x1,x2),
_1659: (x0,x1) => x0.append(x1),
_1660: (x0,x1,x2) => x0.setAttribute(x1,x2),
_1661: x0 => x0.getVideoTracks(),
_1662: x0 => x0.play(),
_1663: x0 => x0.pause(),
_1664: x0 => x0.getVideoTracks(),
_1665: x0 => x0.getTracks(),
_1666: x0 => x0.stop(),
_1667: (x0,x1,x2) => x0.translate(x1,x2),
_1668: (x0,x1,x2) => x0.scale(x1,x2),
_1669: f => finalizeWrapper(f, function(x0) { return dartInstance.exports._1669(f,arguments.length,x0) }),
_1670: (x0,x1,x2) => x0.toBlob(x1,x2),
_1671: x0 => globalThis.URL.createObjectURL(x0),
_1672: x0 => x0.getVideoTracks(),
_1673: x0 => x0.getSettings(),
_1674: x0 => x0.getSupportedConstraints(),
_1675: x0 => x0.getVideoTracks(),
_1676: x0 => x0.getCapabilities(),
_1677: x0 => ({torch: x0}),
_1678: (x0,x1) => x0.applyConstraints(x1),
_1679: x0 => ({zoom: x0}),
_1680: x0 => x0.getVideoTracks(),
_1681: x0 => x0.getSettings(),
_1682: x0 => ({mimeType: x0}),
_1683: (x0,x1) => new MediaRecorder(x0,x1),
_1684: f => finalizeWrapper(f, function(x0) { return dartInstance.exports._1684(f,arguments.length,x0) }),
_1685: f => finalizeWrapper(f, function(x0) { return dartInstance.exports._1685(f,arguments.length,x0) }),
_1686: x0 => x0.start(),
_1687: x0 => globalThis.URL.createObjectURL(x0),
_1688: f => finalizeWrapper(f, function(x0) { return dartInstance.exports._1688(f,arguments.length,x0) }),
_1689: f => finalizeWrapper(f, function(x0) { return dartInstance.exports._1689(f,arguments.length,x0) }),
_1690: x0 => x0.pause(),
_1691: x0 => x0.resume(),
_1692: x0 => x0.stop(),
_1693: x0 => x0.load(),
_1694: x0 => globalThis.MediaRecorder.isTypeSupported(x0),
_1695: x0 => ({type: x0}),
_1696: (x0,x1) => new Blob(x0,x1),
_1697: (x0,x1) => x0.querySelector(x1),
_1698: f => finalizeWrapper(f, function(x0) { return dartInstance.exports._1698(f,arguments.length,x0) }),
_1699: (x0,x1) => x0.removeChild(x1),
_1700: f => finalizeWrapper(f, function(x0) { return dartInstance.exports._1700(f,arguments.length,x0) }),
_1701: (x0,x1) => x0.appendChild(x1),
_1702: () => new Map(),
_1703: (x0,x1,x2) => x0.set(x1,x2),
_1704: (x0,x1,x2,x3) => x0.call(x1,x2,x3),
_1705: f => finalizeWrapper(f, function(x0,x1) { return dartInstance.exports._1705(f,arguments.length,x0,x1) }),
_1706: (x0,x1) => x0.call(x1),
_1707: (x0,x1) => new ZXing.BrowserMultiFormatReader(x0,x1),
_1708: (x0,x1) => x0.append(x1),
_1709: x0 => x0.getVideoTracks(),
_1710: x0 => x0.getCapabilities(),
_1711: () => ({}),
_1712: x0 => x0.getSettings(),
_1713: x0 => x0.getSupportedConstraints(),
_1714: x0 => ({video: x0}),
_1715: x0 => ({facingMode: x0}),
_1718: (x0,x1) => x0.query(x1),
_1719: f => finalizeWrapper(f, function(x0) { return dartInstance.exports._1719(f,arguments.length,x0) }),
_1720: f => finalizeWrapper(f, function(x0) { return dartInstance.exports._1720(f,arguments.length,x0) }),
_1721: (x0,x1,x2) => ({enableHighAccuracy: x0,timeout: x1,maximumAge: x2}),
_1722: (x0,x1,x2,x3) => x0.getCurrentPosition(x1,x2,x3),
_1723: (x0,x1) => x0.clearWatch(x1),
_1724: f => finalizeWrapper(f, function(x0) { return dartInstance.exports._1724(f,arguments.length,x0) }),
_1725: f => finalizeWrapper(f, function(x0) { return dartInstance.exports._1725(f,arguments.length,x0) }),
_1726: (x0,x1,x2,x3) => x0.watchPosition(x1,x2,x3),
_1727: (x0,x1) => x0.querySelector(x1),
_1728: (x0,x1) => x0.appendChild(x1),
_1737: x0 => ({frequency: x0}),
_1738: x0 => new Accelerometer(x0),
_1739: x0 => x0.start(),
_1740: f => finalizeWrapper(f, function(x0) { return dartInstance.exports._1740(f,arguments.length,x0) }),
_1741: f => finalizeWrapper(f, function(x0) { return dartInstance.exports._1741(f,arguments.length,x0) }),
_1742: x0 => new Gyroscope(x0),
_1743: x0 => x0.start(),
_1744: f => finalizeWrapper(f, function(x0) { return dartInstance.exports._1744(f,arguments.length,x0) }),
_1745: f => finalizeWrapper(f, function(x0) { return dartInstance.exports._1745(f,arguments.length,x0) }),
_1746: x0 => new LinearAccelerationSensor(x0),
_1747: x0 => x0.start(),
_1748: f => finalizeWrapper(f, function(x0) { return dartInstance.exports._1748(f,arguments.length,x0) }),
_1749: f => finalizeWrapper(f, function(x0) { return dartInstance.exports._1749(f,arguments.length,x0) }),
_1750: x0 => new Magnetometer(x0),
_1751: x0 => x0.start(),
_1752: f => finalizeWrapper(f, function(x0) { return dartInstance.exports._1752(f,arguments.length,x0) }),
_1753: f => finalizeWrapper(f, function(x0) { return dartInstance.exports._1753(f,arguments.length,x0) }),
_1755: x0 => x0.getBattery(),
_1756: f => finalizeWrapper(f, function(x0) { return dartInstance.exports._1756(f,arguments.length,x0) }),
_1757: x0 => x0.barcodeFormat,
_1758: x0 => x0.text,
_1759: x0 => x0.rawBytes,
_1760: x0 => x0.resultPoints,
_1762: (x0,x1) => ({video: x0,audio: x1}),
_1774: x0 => new Array(x0),
_1777: (o, c) => o instanceof c,
_1781: f => finalizeWrapper(f, function(x0) { return dartInstance.exports._1781(f,arguments.length,x0) }),
_1782: f => finalizeWrapper(f, function(x0) { return dartInstance.exports._1782(f,arguments.length,x0) }),
_1807: (decoder, codeUnits) => decoder.decode(codeUnits),
_1808: () => new TextDecoder("utf-8", {fatal: true}),
_1809: () => new TextDecoder("utf-8", {fatal: false}),
_1810: v => v.toString(),
_1811: (d, digits) => d.toFixed(digits),
_1815: x0 => new WeakRef(x0),
_1816: x0 => x0.deref(),
_1822: Date.now,
_1824: s => new Date(s * 1000).getTimezoneOffset() * 60 ,
_1825: s => {
      if (!/^\s*[+-]?(?:Infinity|NaN|(?:\.\d+|\d+(?:\.\d*)?)(?:[eE][+-]?\d+)?)\s*$/.test(s)) {
        return NaN;
      }
      return parseFloat(s);
    },
_1826: () => {
          let stackString = new Error().stack.toString();
          let frames = stackString.split('\n');
          let drop = 2;
          if (frames[0] === 'Error') {
              drop += 1;
          }
          return frames.slice(drop).join('\n');
        },
_1827: () => typeof dartUseDateNowForTicks !== "undefined",
_1828: () => 1000 * performance.now(),
_1829: () => Date.now(),
_1830: () => {
      // On browsers return `globalThis.location.href`
      if (globalThis.location != null) {
        return globalThis.location.href;
      }
      return null;
    },
_1831: () => {
        return typeof process != "undefined" &&
               Object.prototype.toString.call(process) == "[object process]" &&
               process.platform == "win32"
      },
_1832: () => new WeakMap(),
_1833: (map, o) => map.get(o),
_1834: (map, o, v) => map.set(o, v),
_1835: () => globalThis.WeakRef,
_1846: s => JSON.stringify(s),
_1847: s => printToConsole(s),
_1848: a => a.join(''),
_1849: (o, a, b) => o.replace(a, b),
_1851: (s, t) => s.split(t),
_1852: s => s.toLowerCase(),
_1853: s => s.toUpperCase(),
_1854: s => s.trim(),
_1855: s => s.trimLeft(),
_1856: s => s.trimRight(),
_1858: (s, p, i) => s.indexOf(p, i),
_1859: (s, p, i) => s.lastIndexOf(p, i),
_1860: (s) => s.replace(/\$/g, "$$$$"),
_1861: Object.is,
_1862: s => s.toUpperCase(),
_1863: s => s.toLowerCase(),
_1864: (a, i) => a.push(i),
_1868: a => a.pop(),
_1869: (a, i) => a.splice(i, 1),
_1871: (a, s) => a.join(s),
_1872: (a, s, e) => a.slice(s, e),
_1874: (a, b) => a == b ? 0 : (a > b ? 1 : -1),
_1875: a => a.length,
_1877: (a, i) => a[i],
_1878: (a, i, v) => a[i] = v,
_1880: (o, offsetInBytes, lengthInBytes) => {
      var dst = new ArrayBuffer(lengthInBytes);
      new Uint8Array(dst).set(new Uint8Array(o, offsetInBytes, lengthInBytes));
      return new DataView(dst);
    },
_1881: (o, start, length) => new Uint8Array(o.buffer, o.byteOffset + start, length),
_1882: (o, start, length) => new Int8Array(o.buffer, o.byteOffset + start, length),
_1883: (o, start, length) => new Uint8ClampedArray(o.buffer, o.byteOffset + start, length),
_1884: (o, start, length) => new Uint16Array(o.buffer, o.byteOffset + start, length),
_1885: (o, start, length) => new Int16Array(o.buffer, o.byteOffset + start, length),
_1886: (o, start, length) => new Uint32Array(o.buffer, o.byteOffset + start, length),
_1887: (o, start, length) => new Int32Array(o.buffer, o.byteOffset + start, length),
_1889: (o, start, length) => new BigInt64Array(o.buffer, o.byteOffset + start, length),
_1890: (o, start, length) => new Float32Array(o.buffer, o.byteOffset + start, length),
_1891: (o, start, length) => new Float64Array(o.buffer, o.byteOffset + start, length),
_1892: (t, s) => t.set(s),
_1894: (o) => new DataView(o.buffer, o.byteOffset, o.byteLength),
_1895: o => o.byteLength,
_1896: o => o.buffer,
_1897: o => o.byteOffset,
_1898: Function.prototype.call.bind(Object.getOwnPropertyDescriptor(DataView.prototype, 'byteLength').get),
_1899: (b, o) => new DataView(b, o),
_1900: (b, o, l) => new DataView(b, o, l),
_1901: Function.prototype.call.bind(DataView.prototype.getUint8),
_1902: Function.prototype.call.bind(DataView.prototype.setUint8),
_1903: Function.prototype.call.bind(DataView.prototype.getInt8),
_1904: Function.prototype.call.bind(DataView.prototype.setInt8),
_1905: Function.prototype.call.bind(DataView.prototype.getUint16),
_1906: Function.prototype.call.bind(DataView.prototype.setUint16),
_1907: Function.prototype.call.bind(DataView.prototype.getInt16),
_1908: Function.prototype.call.bind(DataView.prototype.setInt16),
_1909: Function.prototype.call.bind(DataView.prototype.getUint32),
_1910: Function.prototype.call.bind(DataView.prototype.setUint32),
_1911: Function.prototype.call.bind(DataView.prototype.getInt32),
_1912: Function.prototype.call.bind(DataView.prototype.setInt32),
_1915: Function.prototype.call.bind(DataView.prototype.getBigInt64),
_1916: Function.prototype.call.bind(DataView.prototype.setBigInt64),
_1917: Function.prototype.call.bind(DataView.prototype.getFloat32),
_1918: Function.prototype.call.bind(DataView.prototype.setFloat32),
_1919: Function.prototype.call.bind(DataView.prototype.getFloat64),
_1920: Function.prototype.call.bind(DataView.prototype.setFloat64),
_1934: (o, t) => o instanceof t,
_1936: f => finalizeWrapper(f, function(x0) { return dartInstance.exports._1936(f,arguments.length,x0) }),
_1937: f => finalizeWrapper(f, function(x0) { return dartInstance.exports._1937(f,arguments.length,x0) }),
_1938: o => Object.keys(o),
_1939: (ms, c) =>
              setTimeout(() => dartInstance.exports.$invokeCallback(c),ms),
_1940: (handle) => clearTimeout(handle),
_1941: (ms, c) =>
          setInterval(() => dartInstance.exports.$invokeCallback(c), ms),
_1942: (handle) => clearInterval(handle),
_1943: (c) =>
              queueMicrotask(() => dartInstance.exports.$invokeCallback(c)),
_1944: () => Date.now(),
_1945: () => new XMLHttpRequest(),
_1946: (x0,x1,x2,x3) => x0.open(x1,x2,x3),
_1947: (x0,x1,x2) => x0.setRequestHeader(x1,x2),
_1948: (x0,x1) => x0.send(x1),
_1949: x0 => x0.abort(),
_1950: x0 => x0.getAllResponseHeaders(),
_1951: x0 => globalThis.URL.createObjectURL(x0),
_1953: () => new XMLHttpRequest(),
_1954: x0 => x0.send(),
_1956: () => new FileReader(),
_1957: (x0,x1) => x0.readAsArrayBuffer(x1),
_1965: f => finalizeWrapper(f, function(x0) { return dartInstance.exports._1965(f,arguments.length,x0) }),
_1966: f => finalizeWrapper(f, function(x0) { return dartInstance.exports._1966(f,arguments.length,x0) }),
_1979: (x0,x1) => x0.getContext(x1),
_1983: (x0,x1,x2,x3,x4,x5) => x0.drawImage(x1,x2,x3,x4,x5),
_1992: x0 => x0.attachStreamToVideo,
_1994: x0 => x0.decodeContinuously,
_1998: x0 => x0.reset,
_2000: x0 => x0.stopContinuousDecode,
_2002: x0 => x0.stream,
_2003: x0 => x0.videoElement,
_2004: x0 => x0.getVideoTracks(),
_2005: x0 => x0.getCapabilities(),
_2006: x0 => x0.getSettings(),
_2007: (x0,x1) => ({width: x0,height: x1}),
_2008: (x0,x1,x2) => ({width: x0,height: x1,facingMode: x2}),
_2010: x0 => x0.zoom,
_2011: x0 => x0.torch,
_2012: x0 => x0.zoom,
_2013: x0 => x0.torch,
_2014: x0 => x0.facingMode,
_2016: x0 => x0.max,
_2018: x0 => x0.min,
_2023: (x0,x1) => x0.appendChild(x1),
_2024: (x0,x1) => x0.item(x1),
_2025: x0 => x0.getCapabilities,
_2026: x0 => x0.facingMode,
_2027: (x0,x1) => x0.item(x1),
_2029: (s, m) => {
          try {
            return new RegExp(s, m);
          } catch (e) {
            return String(e);
          }
        },
_2030: (x0,x1) => x0.exec(x1),
_2031: (x0,x1) => x0.test(x1),
_2032: (x0,x1) => x0.exec(x1),
_2033: (x0,x1) => x0.exec(x1),
_2034: x0 => x0.pop(),
_2038: (x0,x1,x2) => x0[x1] = x2,
_2040: o => o === undefined,
_2041: o => typeof o === 'boolean',
_2042: o => typeof o === 'number',
_2044: o => typeof o === 'string',
_2047: o => o instanceof Int8Array,
_2048: o => o instanceof Uint8Array,
_2049: o => o instanceof Uint8ClampedArray,
_2050: o => o instanceof Int16Array,
_2051: o => o instanceof Uint16Array,
_2052: o => o instanceof Int32Array,
_2053: o => o instanceof Uint32Array,
_2054: o => o instanceof Float32Array,
_2055: o => o instanceof Float64Array,
_2056: o => o instanceof ArrayBuffer,
_2057: o => o instanceof DataView,
_2058: o => o instanceof Array,
_2059: o => typeof o === 'function' && o[jsWrappedDartFunctionSymbol] === true,
_2061: o => {
            const proto = Object.getPrototypeOf(o);
            return proto === Object.prototype || proto === null;
          },
_2062: o => o instanceof RegExp,
_2063: (l, r) => l === r,
_2064: o => o,
_2065: o => o,
_2066: o => o,
_2067: b => !!b,
_2068: o => o.length,
_2071: (o, i) => o[i],
_2072: f => f.dartFunction,
_2073: l => arrayFromDartList(Int8Array, l),
_2074: (data, length) => {
          const jsBytes = new Uint8Array(length);
          const getByte = dartInstance.exports.$uint8ListGet;
          for (let i = 0; i < length; i++) {
            jsBytes[i] = getByte(data, i);
          }
          return jsBytes;
        },
_2075: l => arrayFromDartList(Uint8ClampedArray, l),
_2076: l => arrayFromDartList(Int16Array, l),
_2077: l => arrayFromDartList(Uint16Array, l),
_2078: l => arrayFromDartList(Int32Array, l),
_2079: l => arrayFromDartList(Uint32Array, l),
_2080: l => arrayFromDartList(Float32Array, l),
_2081: l => arrayFromDartList(Float64Array, l),
_2082: (data, length) => {
          const read = dartInstance.exports.$byteDataGetUint8;
          const view = new DataView(new ArrayBuffer(length));
          for (let i = 0; i < length; i++) {
              view.setUint8(i, read(data, i));
          }
          return view;
        },
_2083: l => arrayFromDartList(Array, l),
_2084:       (s, length) => {
        if (length == 0) return '';

        const read = dartInstance.exports.$stringRead1;
        let result = '';
        let index = 0;
        const chunkLength = Math.min(length - index, 500);
        let array = new Array(chunkLength);
        while (index < length) {
          const newChunkLength = Math.min(length - index, 500);
          for (let i = 0; i < newChunkLength; i++) {
            array[i] = read(s, index++);
          }
          if (newChunkLength < chunkLength) {
            array = array.slice(0, newChunkLength);
          }
          result += String.fromCharCode(...array);
        }
        return result;
      }
      ,
_2085:     (s, length) => {
      if (length == 0) return '';

      const read = dartInstance.exports.$stringRead2;
      let result = '';
      let index = 0;
      const chunkLength = Math.min(length - index, 500);
      let array = new Array(chunkLength);
      while (index < length) {
        const newChunkLength = Math.min(length - index, 500);
        for (let i = 0; i < newChunkLength; i++) {
          array[i] = read(s, index++);
        }
        if (newChunkLength < chunkLength) {
          array = array.slice(0, newChunkLength);
        }
        result += String.fromCharCode(...array);
      }
      return result;
    }
    ,
_2086:     (s) => {
      let length = s.length;
      let range = 0;
      for (let i = 0; i < length; i++) {
        range |= s.codePointAt(i);
      }
      const exports = dartInstance.exports;
      if (range < 256) {
        if (length <= 10) {
          if (length == 1) {
            return exports.$stringAllocate1_1(s.codePointAt(0));
          }
          if (length == 2) {
            return exports.$stringAllocate1_2(s.codePointAt(0), s.codePointAt(1));
          }
          if (length == 3) {
            return exports.$stringAllocate1_3(s.codePointAt(0), s.codePointAt(1), s.codePointAt(2));
          }
          if (length == 4) {
            return exports.$stringAllocate1_4(s.codePointAt(0), s.codePointAt(1), s.codePointAt(2), s.codePointAt(3));
          }
          if (length == 5) {
            return exports.$stringAllocate1_5(s.codePointAt(0), s.codePointAt(1), s.codePointAt(2), s.codePointAt(3), s.codePointAt(4));
          }
          if (length == 6) {
            return exports.$stringAllocate1_6(s.codePointAt(0), s.codePointAt(1), s.codePointAt(2), s.codePointAt(3), s.codePointAt(4), s.codePointAt(5));
          }
          if (length == 7) {
            return exports.$stringAllocate1_7(s.codePointAt(0), s.codePointAt(1), s.codePointAt(2), s.codePointAt(3), s.codePointAt(4), s.codePointAt(5), s.codePointAt(6));
          }
          if (length == 8) {
            return exports.$stringAllocate1_8(s.codePointAt(0), s.codePointAt(1), s.codePointAt(2), s.codePointAt(3), s.codePointAt(4), s.codePointAt(5), s.codePointAt(6), s.codePointAt(7));
          }
          if (length == 9) {
            return exports.$stringAllocate1_9(s.codePointAt(0), s.codePointAt(1), s.codePointAt(2), s.codePointAt(3), s.codePointAt(4), s.codePointAt(5), s.codePointAt(6), s.codePointAt(7), s.codePointAt(8));
          }
          if (length == 10) {
            return exports.$stringAllocate1_10(s.codePointAt(0), s.codePointAt(1), s.codePointAt(2), s.codePointAt(3), s.codePointAt(4), s.codePointAt(5), s.codePointAt(6), s.codePointAt(7), s.codePointAt(8), s.codePointAt(9));
          }
        }
        const dartString = exports.$stringAllocate1(length);
        const write = exports.$stringWrite1;
        for (let i = 0; i < length; i++) {
          write(dartString, i, s.codePointAt(i));
        }
        return dartString;
      } else {
        const dartString = exports.$stringAllocate2(length);
        const write = exports.$stringWrite2;
        for (let i = 0; i < length; i++) {
          write(dartString, i, s.charCodeAt(i));
        }
        return dartString;
      }
    }
    ,
_2087: () => ({}),
_2088: () => [],
_2089: l => new Array(l),
_2090: () => globalThis,
_2091: (constructor, args) => {
      const factoryFunction = constructor.bind.apply(
          constructor, [null, ...args]);
      return new factoryFunction();
    },
_2092: (o, p) => p in o,
_2093: (o, p) => o[p],
_2094: (o, p, v) => o[p] = v,
_2095: (o, m, a) => o[m].apply(o, a),
_2097: o => String(o),
_2098: (p, s, f) => p.then(s, f),
_2099: s => {
      if (/[[\]{}()*+?.\\^$|]/.test(s)) {
          s = s.replace(/[[\]{}()*+?.\\^$|]/g, '\\$&');
      }
      return s;
    },
_2102: x0 => x0.index,
_2104: x0 => x0.length,
_2106: (x0,x1) => x0[x1],
_2109: x0 => x0.flags,
_2110: x0 => x0.multiline,
_2111: x0 => x0.ignoreCase,
_2112: x0 => x0.unicode,
_2113: x0 => x0.dotAll,
_2114: (x0,x1) => x0.lastIndex = x1,
_2115: (o, p) => p in o,
_2116: (o, p) => o[p],
_2157: x0 => x0.status,
_2158: (x0,x1) => x0.responseType = x1,
_2160: x0 => x0.response,
_2161: x0 => x0.x,
_2162: x0 => x0.y,
_2166: () => globalThis.window.flutterCanvasKit,
_2167: () => globalThis.window._flutter_skwasmInstance,
_2202: (x0,x1) => x0.withCredentials = x1,
_2204: x0 => x0.responseURL,
_2205: x0 => x0.status,
_2206: x0 => x0.statusText,
_2208: (x0,x1) => x0.responseType = x1,
_2209: x0 => x0.response,
_2263: (x0,x1) => x0.lang = x1,
_2288: x0 => x0.style,
_2316: (x0,x1) => x0.oncancel = x1,
_2322: (x0,x1) => x0.onchange = x1,
_2362: (x0,x1) => x0.onerror = x1,
_2378: (x0,x1) => x0.onload = x1,
_2860: x0 => x0.videoWidth,
_2861: x0 => x0.videoHeight,
_2865: (x0,x1) => x0.playsInline = x1,
_2913: x0 => x0.error,
_2915: (x0,x1) => x0.src = x1,
_2916: x0 => x0.srcObject,
_2917: (x0,x1) => x0.srcObject = x1,
_2924: x0 => x0.buffered,
_2927: x0 => x0.currentTime,
_2928: (x0,x1) => x0.currentTime = x1,
_2929: x0 => x0.duration,
_2934: (x0,x1) => x0.playbackRate = x1,
_2941: (x0,x1) => x0.autoplay = x1,
_2943: (x0,x1) => x0.loop = x1,
_2945: (x0,x1) => x0.controls = x1,
_2947: (x0,x1) => x0.volume = x1,
_2949: (x0,x1) => x0.muted = x1,
_2958: () => globalThis.MediaError.MEDIA_ERR_ABORTED,
_2959: () => globalThis.MediaError.MEDIA_ERR_NETWORK,
_2960: () => globalThis.MediaError.MEDIA_ERR_DECODE,
_2961: () => globalThis.MediaError.MEDIA_ERR_SRC_NOT_SUPPORTED,
_2962: x0 => x0.code,
_2963: x0 => x0.message,
_3035: x0 => x0.length,
_3238: (x0,x1) => x0.accept = x1,
_3252: x0 => x0.files,
_3278: (x0,x1) => x0.multiple = x1,
_3296: (x0,x1) => x0.type = x1,
_3542: x0 => x0.src,
_3543: (x0,x1) => x0.src = x1,
_3545: (x0,x1) => x0.type = x1,
_3549: (x0,x1) => x0.async = x1,
_3551: (x0,x1) => x0.defer = x1,
_3553: (x0,x1) => x0.crossOrigin = x1,
_3563: (x0,x1) => x0.charset = x1,
_3588: (x0,x1) => x0.width = x1,
_3590: (x0,x1) => x0.height = x1,
_4024: () => globalThis.window,
_4065: x0 => x0.screen,
_4081: x0 => x0.document,
_4103: x0 => x0.navigator,
_4409: x0 => x0.message,
_4455: x0 => x0.geolocation,
_4458: x0 => x0.mediaDevices,
_4460: x0 => x0.permissions,
_4461: x0 => x0.maxTouchPoints,
_4467: x0 => x0.deviceMemory,
_4468: x0 => x0.appCodeName,
_4469: x0 => x0.appName,
_4470: x0 => x0.appVersion,
_4471: x0 => x0.platform,
_4472: x0 => x0.product,
_4473: x0 => x0.productSub,
_4474: x0 => x0.userAgent,
_4475: x0 => x0.vendor,
_4476: x0 => x0.vendorSub,
_4478: x0 => x0.language,
_4479: x0 => x0.languages,
_4480: x0 => x0.onLine,
_4485: x0 => x0.hardwareConcurrency,
_7679: x0 => x0.type,
_7680: x0 => x0.target,
_7736: x0 => x0.length,
_7801: x0 => x0.baseURI,
_7818: () => globalThis.document,
_7890: x0 => x0.documentElement,
_7909: x0 => x0.body,
_7911: x0 => x0.head,
_8270: (x0,x1) => x0.id = x1,
_8286: x0 => x0.children,
_9963: x0 => x0.size,
_9964: x0 => x0.type,
_9967: (x0,x1) => x0.type = x1,
_9970: x0 => x0.name,
_9971: x0 => x0.lastModified,
_9977: x0 => x0.length,
_9992: x0 => x0.result,
_10396: (x0,x1) => x0.audioBitsPerSecond = x1,
_10398: (x0,x1) => x0.videoBitsPerSecond = x1,
_10408: x0 => x0.data,
_10784: x0 => x0.type,
_10816: x0 => x0.orientation,
_10905: x0 => x0.state,
_11346: x0 => x0.facingMode,
_11421: x0 => x0.facingMode,
_11560: x0 => x0.width,
_11562: x0 => x0.height,
_11568: x0 => x0.facingMode,
_11647: x0 => x0.deviceId,
_11648: x0 => x0.kind,
_11649: x0 => x0.label,
_12236: x0 => x0.coords,
_12237: x0 => x0.timestamp,
_12239: x0 => x0.accuracy,
_12240: x0 => x0.latitude,
_12241: x0 => x0.longitude,
_12242: x0 => x0.altitude,
_12243: x0 => x0.altitudeAccuracy,
_12244: x0 => x0.heading,
_12245: x0 => x0.speed,
_12249: x0 => x0.code,
_12250: x0 => x0.message,
_12680: (x0,x1) => x0.border = x1,
_13122: (x0,x1) => x0.height = x1,
_13316: (x0,x1) => x0.objectFit = x1,
_13446: (x0,x1) => x0.pointerEvents = x1,
_13744: (x0,x1) => x0.transform = x1,
_13748: (x0,x1) => x0.transformOrigin = x1,
_13812: (x0,x1) => x0.width = x1,
_14109: x0 => x0.charging,
_14112: x0 => x0.level,
_14114: (x0,x1) => x0.onchargingchange = x1,
_14214: x0 => x0.name,
_14215: x0 => x0.message,
_14988: x0 => x0.x,
_14989: x0 => x0.y,
_14990: x0 => x0.z,
_14991: (x0,x1) => x0.onreading = x1,
_14992: (x0,x1) => x0.onerror = x1,
_14994: x0 => x0.x,
_14995: x0 => x0.y,
_14996: x0 => x0.z,
_14997: (x0,x1) => x0.onreading = x1,
_14998: (x0,x1) => x0.onerror = x1,
_15000: x0 => x0.x,
_15001: x0 => x0.y,
_15002: x0 => x0.z,
_15003: (x0,x1) => x0.onreading = x1,
_15004: (x0,x1) => x0.onerror = x1,
_15006: x0 => x0.x,
_15007: x0 => x0.y,
_15008: x0 => x0.z,
_15009: (x0,x1) => x0.onreading = x1,
_15010: (x0,x1) => x0.onerror = x1,
_15012: x0 => x0.error,
_15013: x0 => x0.name,
_15014: x0 => x0.message
    };

    const baseImports = {
        dart2wasm: dart2wasm,


        Math: Math,
        Date: Date,
        Object: Object,
        Array: Array,
        Reflect: Reflect,
    };

    const jsStringPolyfill = {
        "charCodeAt": (s, i) => s.charCodeAt(i),
        "compare": (s1, s2) => {
            if (s1 < s2) return -1;
            if (s1 > s2) return 1;
            return 0;
        },
        "concat": (s1, s2) => s1 + s2,
        "equals": (s1, s2) => s1 === s2,
        "fromCharCode": (i) => String.fromCharCode(i),
        "length": (s) => s.length,
        "substring": (s, a, b) => s.substring(a, b),
    };

    dartInstance = await WebAssembly.instantiate(await modulePromise, {
        ...baseImports,
        ...(await importObjectPromise),
        "wasm:js-string": jsStringPolyfill,
    });

    return dartInstance;
}

// Call the main function for the instantiated module
// `moduleInstance` is the instantiated dart2wasm module
// `args` are any arguments that should be passed into the main function.
export const invoke = (moduleInstance, ...args) => {
  moduleInstance.exports.$invokeMain(args);
}

