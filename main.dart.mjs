
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
_189: x0 => new MutationObserver(x0),
_208: (x0,x1,x2) => x0.addEventListener(x1,x2),
_209: (x0,x1,x2) => x0.removeEventListener(x1,x2),
_212: x0 => new ResizeObserver(x0),
_215: (x0,x1) => new Intl.Segmenter(x0,x1),
_216: x0 => x0.next(),
_217: (x0,x1) => new Intl.v8BreakIterator(x0,x1),
_294: x0 => x0.close(),
_295: (x0,x1,x2,x3,x4) => ({type: x0,data: x1,premultiplyAlpha: x2,colorSpaceConversion: x3,preferAnimation: x4}),
_296: x0 => new window.ImageDecoder(x0),
_297: x0 => x0.close(),
_298: x0 => ({frameIndex: x0}),
_299: (x0,x1) => x0.decode(x1),
_302: f => finalizeWrapper(f, function(x0) { return dartInstance.exports._302(f,arguments.length,x0) }),
_303: f => finalizeWrapper(f, function(x0) { return dartInstance.exports._303(f,arguments.length,x0) }),
_304: (x0,x1) => ({addView: x0,removeView: x1}),
_305: f => finalizeWrapper(f, function(x0) { return dartInstance.exports._305(f,arguments.length,x0) }),
_306: f => finalizeWrapper(f, function() { return dartInstance.exports._306(f,arguments.length) }),
_307: (x0,x1) => ({initializeEngine: x0,autoStart: x1}),
_308: f => finalizeWrapper(f, function(x0) { return dartInstance.exports._308(f,arguments.length,x0) }),
_309: x0 => ({runApp: x0}),
_310: x0 => new Uint8Array(x0),
_312: x0 => x0.preventDefault(),
_313: x0 => x0.stopPropagation(),
_314: (x0,x1) => x0.addListener(x1),
_315: (x0,x1) => x0.removeListener(x1),
_316: (x0,x1) => x0.prepend(x1),
_317: x0 => x0.remove(),
_318: x0 => x0.disconnect(),
_319: (x0,x1) => x0.addListener(x1),
_320: (x0,x1) => x0.removeListener(x1),
_322: (x0,x1) => x0.append(x1),
_323: x0 => x0.remove(),
_324: x0 => x0.stopPropagation(),
_328: x0 => x0.preventDefault(),
_329: (x0,x1) => x0.append(x1),
_330: x0 => x0.remove(),
_331: x0 => x0.preventDefault(),
_336: (x0,x1) => x0.appendChild(x1),
_337: (x0,x1,x2) => x0.insertBefore(x1,x2),
_338: (x0,x1) => x0.removeChild(x1),
_339: (x0,x1) => x0.appendChild(x1),
_340: (x0,x1) => x0.transferFromImageBitmap(x1),
_341: (x0,x1) => x0.append(x1),
_342: (x0,x1) => x0.append(x1),
_343: (x0,x1) => x0.append(x1),
_344: x0 => x0.remove(),
_345: x0 => x0.remove(),
_346: x0 => x0.remove(),
_347: (x0,x1) => x0.appendChild(x1),
_348: (x0,x1) => x0.appendChild(x1),
_349: x0 => x0.remove(),
_350: (x0,x1) => x0.append(x1),
_351: (x0,x1) => x0.append(x1),
_352: x0 => x0.remove(),
_353: (x0,x1) => x0.append(x1),
_354: (x0,x1) => x0.append(x1),
_355: (x0,x1,x2) => x0.insertBefore(x1,x2),
_356: (x0,x1) => x0.append(x1),
_357: (x0,x1,x2) => x0.insertBefore(x1,x2),
_358: x0 => x0.remove(),
_359: x0 => x0.remove(),
_360: (x0,x1) => x0.append(x1),
_361: x0 => x0.remove(),
_362: (x0,x1) => x0.append(x1),
_363: x0 => x0.remove(),
_364: x0 => x0.remove(),
_365: x0 => x0.getBoundingClientRect(),
_366: x0 => x0.remove(),
_367: x0 => x0.blur(),
_368: x0 => x0.remove(),
_369: x0 => x0.blur(),
_370: x0 => x0.remove(),
_383: (x0,x1) => x0.append(x1),
_384: x0 => x0.remove(),
_385: (x0,x1) => x0.append(x1),
_386: (x0,x1,x2) => x0.insertBefore(x1,x2),
_387: x0 => x0.preventDefault(),
_388: x0 => x0.preventDefault(),
_389: x0 => x0.preventDefault(),
_390: x0 => x0.preventDefault(),
_391: x0 => x0.remove(),
_392: (x0,x1) => x0.observe(x1),
_393: x0 => x0.disconnect(),
_394: (x0,x1) => x0.appendChild(x1),
_395: (x0,x1) => x0.appendChild(x1),
_396: (x0,x1) => x0.appendChild(x1),
_397: (x0,x1) => x0.append(x1),
_398: x0 => x0.remove(),
_399: (x0,x1) => x0.append(x1),
_400: (x0,x1) => x0.append(x1),
_401: (x0,x1) => x0.appendChild(x1),
_402: (x0,x1) => x0.append(x1),
_403: x0 => x0.remove(),
_404: (x0,x1) => x0.append(x1),
_408: (x0,x1) => x0.appendChild(x1),
_409: x0 => x0.remove(),
_969: () => globalThis.window.flutterConfiguration,
_970: x0 => x0.assetBase,
_975: x0 => x0.debugShowSemanticsNodes,
_976: x0 => x0.hostElement,
_977: x0 => x0.multiViewEnabled,
_978: x0 => x0.nonce,
_980: x0 => x0.fontFallbackBaseUrl,
_981: x0 => x0.useColorEmoji,
_985: x0 => x0.console,
_986: x0 => x0.devicePixelRatio,
_987: x0 => x0.document,
_988: x0 => x0.history,
_989: x0 => x0.innerHeight,
_990: x0 => x0.innerWidth,
_991: x0 => x0.location,
_992: x0 => x0.navigator,
_993: x0 => x0.visualViewport,
_994: x0 => x0.performance,
_995: (x0,x1) => x0.fetch(x1),
_1000: (x0,x1) => x0.dispatchEvent(x1),
_1001: (x0,x1) => x0.matchMedia(x1),
_1002: (x0,x1) => x0.getComputedStyle(x1),
_1004: x0 => x0.screen,
_1005: (x0,x1) => x0.requestAnimationFrame(x1),
_1006: f => finalizeWrapper(f, function(x0) { return dartInstance.exports._1006(f,arguments.length,x0) }),
_1010: (x0,x1) => x0.warn(x1),
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
_1029: (x0,x1) => x0.createElement(x1),
_1031: (x0,x1) => x0.execCommand(x1),
_1035: (x0,x1) => x0.createTextNode(x1),
_1036: (x0,x1) => x0.createEvent(x1),
_1040: x0 => x0.head,
_1041: x0 => x0.body,
_1042: (x0,x1) => x0.title = x1,
_1045: x0 => x0.activeElement,
_1047: x0 => x0.visibilityState,
_1048: () => globalThis.document,
_1049: (x0,x1,x2) => x0.addEventListener(x1,x2),
_1050: (x0,x1,x2,x3) => x0.addEventListener(x1,x2,x3),
_1051: (x0,x1,x2,x3) => x0.addEventListener(x1,x2,x3),
_1052: (x0,x1,x2) => x0.removeEventListener(x1,x2),
_1055: f => finalizeWrapper(f, function(x0) { return dartInstance.exports._1055(f,arguments.length,x0) }),
_1056: x0 => x0.target,
_1058: x0 => x0.timeStamp,
_1059: x0 => x0.type,
_1061: x0 => x0.preventDefault(),
_1065: (x0,x1,x2,x3) => x0.initEvent(x1,x2,x3),
_1069: x0 => x0.baseURI,
_1070: x0 => x0.firstChild,
_1076: x0 => x0.parentElement,
_1078: x0 => x0.parentNode,
_1081: (x0,x1) => x0.removeChild(x1),
_1082: (x0,x1) => x0.removeChild(x1),
_1083: x0 => x0.isConnected,
_1084: (x0,x1) => x0.textContent = x1,
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
_1107: (x0,x1) => x0.append(x1),
_1108: (x0,x1) => x0.getAttribute(x1),
_1109: x0 => x0.getBoundingClientRect(),
_1112: (x0,x1) => x0.closest(x1),
_1114: (x0,x1) => x0.querySelectorAll(x1),
_1115: x0 => x0.remove(),
_1116: (x0,x1,x2) => x0.setAttribute(x1,x2),
_1118: (x0,x1) => x0.removeAttribute(x1),
_1119: (x0,x1) => x0.tabIndex = x1,
_1121: (x0,x1) => x0.focus(x1),
_1122: x0 => x0.scrollTop,
_1123: (x0,x1) => x0.scrollTop = x1,
_1124: x0 => x0.scrollLeft,
_1125: (x0,x1) => x0.scrollLeft = x1,
_1126: x0 => x0.classList,
_1127: (x0,x1) => x0.className = x1,
_1131: (x0,x1) => x0.getElementsByClassName(x1),
_1132: x0 => x0.click(),
_1133: (x0,x1) => x0.hasAttribute(x1),
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
_1256: x0 => x0.status,
_1257: x0 => x0.headers,
_1258: x0 => x0.body,
_1259: x0 => x0.arrayBuffer(),
_1262: (x0,x1) => x0.get(x1),
_1264: x0 => x0.read(),
_1265: x0 => x0.value,
_1266: x0 => x0.done,
_1268: x0 => x0.name,
_1269: x0 => x0.x,
_1270: x0 => x0.y,
_1273: x0 => x0.top,
_1274: x0 => x0.right,
_1275: x0 => x0.bottom,
_1276: x0 => x0.left,
_1285: x0 => x0.height,
_1286: x0 => x0.width,
_1287: (x0,x1) => x0.value = x1,
_1289: (x0,x1) => x0.placeholder = x1,
_1290: (x0,x1) => x0.name = x1,
_1291: x0 => x0.selectionDirection,
_1292: x0 => x0.selectionStart,
_1293: x0 => x0.selectionEnd,
_1296: x0 => x0.value,
_1298: (x0,x1,x2) => x0.setSelectionRange(x1,x2),
_1303: x0 => x0.readText(),
_1304: (x0,x1) => x0.writeText(x1),
_1305: x0 => x0.altKey,
_1306: x0 => x0.code,
_1307: x0 => x0.ctrlKey,
_1308: x0 => x0.key,
_1309: x0 => x0.keyCode,
_1310: x0 => x0.location,
_1311: x0 => x0.metaKey,
_1312: x0 => x0.repeat,
_1313: x0 => x0.shiftKey,
_1314: x0 => x0.isComposing,
_1315: (x0,x1) => x0.getModifierState(x1),
_1316: x0 => x0.state,
_1319: (x0,x1) => x0.go(x1),
_1320: (x0,x1,x2,x3) => x0.pushState(x1,x2,x3),
_1321: (x0,x1,x2,x3) => x0.replaceState(x1,x2,x3),
_1322: x0 => x0.pathname,
_1323: x0 => x0.search,
_1324: x0 => x0.hash,
_1327: x0 => x0.state,
_1333: f => finalizeWrapper(f, function(x0,x1) { return dartInstance.exports._1333(f,arguments.length,x0,x1) }),
_1335: (x0,x1,x2) => x0.observe(x1,x2),
_1338: x0 => x0.attributeName,
_1339: x0 => x0.type,
_1340: x0 => x0.matches,
_1344: x0 => x0.matches,
_1345: x0 => x0.relatedTarget,
_1346: x0 => x0.clientX,
_1347: x0 => x0.clientY,
_1348: x0 => x0.offsetX,
_1349: x0 => x0.offsetY,
_1352: x0 => x0.button,
_1353: x0 => x0.buttons,
_1354: x0 => x0.ctrlKey,
_1355: (x0,x1) => x0.getModifierState(x1),
_1356: x0 => x0.pointerId,
_1357: x0 => x0.pointerType,
_1358: x0 => x0.pressure,
_1359: x0 => x0.tiltX,
_1360: x0 => x0.tiltY,
_1361: x0 => x0.getCoalescedEvents(),
_1362: x0 => x0.deltaX,
_1363: x0 => x0.deltaY,
_1364: x0 => x0.wheelDeltaX,
_1365: x0 => x0.wheelDeltaY,
_1366: x0 => x0.deltaMode,
_1371: x0 => x0.changedTouches,
_1373: x0 => x0.clientX,
_1374: x0 => x0.clientY,
_1375: x0 => x0.data,
_1376: (x0,x1) => x0.type = x1,
_1377: (x0,x1) => x0.max = x1,
_1378: (x0,x1) => x0.min = x1,
_1379: (x0,x1) => x0.value = x1,
_1380: x0 => x0.value,
_1381: x0 => x0.disabled,
_1382: (x0,x1) => x0.disabled = x1,
_1383: (x0,x1) => x0.placeholder = x1,
_1384: (x0,x1) => x0.name = x1,
_1385: (x0,x1) => x0.autocomplete = x1,
_1386: x0 => x0.selectionDirection,
_1387: x0 => x0.selectionStart,
_1388: x0 => x0.selectionEnd,
_1392: (x0,x1,x2) => x0.setSelectionRange(x1,x2),
_1399: (x0,x1) => x0.add(x1),
_1402: (x0,x1) => x0.noValidate = x1,
_1403: (x0,x1) => x0.method = x1,
_1404: (x0,x1) => x0.action = x1,
_1431: x0 => x0.orientation,
_1432: x0 => x0.width,
_1433: x0 => x0.height,
_1434: (x0,x1) => x0.lock(x1),
_1451: f => finalizeWrapper(f, function(x0,x1) { return dartInstance.exports._1451(f,arguments.length,x0,x1) }),
_1461: x0 => x0.length,
_1462: (x0,x1) => x0.item(x1),
_1463: x0 => x0.length,
_1464: (x0,x1) => x0.item(x1),
_1465: x0 => x0.iterator,
_1466: x0 => x0.Segmenter,
_1467: x0 => x0.v8BreakIterator,
_1470: x0 => x0.done,
_1471: x0 => x0.value,
_1472: x0 => x0.index,
_1476: (x0,x1) => x0.adoptText(x1),
_1478: x0 => x0.first(),
_1479: x0 => x0.next(),
_1480: x0 => x0.current(),
_1493: x0 => x0.hostElement,
_1494: x0 => x0.viewConstraints,
_1496: x0 => x0.maxHeight,
_1497: x0 => x0.maxWidth,
_1498: x0 => x0.minHeight,
_1499: x0 => x0.minWidth,
_1500: x0 => x0.loader,
_1501: () => globalThis._flutter,
_1502: (x0,x1) => x0.didCreateEngineInitializer(x1),
_1503: (x0,x1,x2) => x0.call(x1,x2),
_1504: () => globalThis.Promise,
_1505: f => finalizeWrapper(f, function(x0,x1) { return dartInstance.exports._1505(f,arguments.length,x0,x1) }),
_1508: x0 => x0.length,
_1511: x0 => x0.tracks,
_1515: x0 => x0.image,
_1520: x0 => x0.codedWidth,
_1521: x0 => x0.codedHeight,
_1524: x0 => x0.duration,
_1528: x0 => x0.ready,
_1529: x0 => x0.selectedTrack,
_1530: x0 => x0.repetitionCount,
_1531: x0 => x0.frameCount,
_1576: (x0,x1,x2,x3) => x0.open(x1,x2,x3),
_1577: (x0,x1,x2) => x0.setRequestHeader(x1,x2),
_1578: f => finalizeWrapper(f, function(x0) { return dartInstance.exports._1578(f,arguments.length,x0) }),
_1579: (x0,x1,x2) => x0.addEventListener(x1,x2),
_1580: f => finalizeWrapper(f, function(x0) { return dartInstance.exports._1580(f,arguments.length,x0) }),
_1581: x0 => x0.send(),
_1582: () => new XMLHttpRequest(),
_1599: x0 => x0.remove(),
_1600: x0 => globalThis.URL.createObjectURL(x0),
_1601: f => finalizeWrapper(f, function(x0) { return dartInstance.exports._1601(f,arguments.length,x0) }),
_1602: f => finalizeWrapper(f, function(x0) { return dartInstance.exports._1602(f,arguments.length,x0) }),
_1603: f => finalizeWrapper(f, function(x0) { return dartInstance.exports._1603(f,arguments.length,x0) }),
_1604: (x0,x1) => x0.querySelector(x1),
_1605: (x0,x1) => x0.createElement(x1),
_1606: (x0,x1) => x0.append(x1),
_1607: (x0,x1,x2) => x0.setAttribute(x1,x2),
_1608: (x0,x1) => x0.replaceChildren(x1),
_1609: (x0,x1) => x0.append(x1),
_1610: x0 => x0.click(),
_1611: x0 => x0.play(),
_1612: x0 => x0.pause(),
_1615: (x0,x1,x2) => x0.addEventListener(x1,x2),
_1618: (x0,x1,x2) => x0.removeEventListener(x1,x2),
_1620: (x0,x1) => x0.removeAttribute(x1),
_1621: x0 => x0.load(),
_1622: (x0,x1) => x0.start(x1),
_1623: (x0,x1) => x0.end(x1),
_1624: (x0,x1,x2,x3) => x0.addEventListener(x1,x2,x3),
_1631: (x0,x1,x2,x3) => x0.removeEventListener(x1,x2,x3),
_1634: (x0,x1,x2,x3) => x0.open(x1,x2,x3),
_1635: x0 => ({url: x0}),
_1636: (x0,x1) => x0.canShare(x1),
_1637: (x0,x1) => x0.share(x1),
_1638: (x0,x1) => ({title: x0,text: x1}),
_1639: x0 => ({text: x0}),
_1640: (x0,x1,x2) => ({files: x0,title: x1,text: x2}),
_1641: (x0,x1) => ({files: x0,text: x1}),
_1642: (x0,x1) => ({files: x0,title: x1}),
_1643: x0 => ({files: x0}),
_1644: () => ({}),
_1645: (x0,x1,x2) => new File(x0,x1,x2),
_1646: x0 => x0.getVideoTracks(),
_1647: x0 => x0.stop(),
_1648: x0 => x0.enumerateDevices(),
_1649: x0 => x0.getVideoTracks(),
_1650: x0 => x0.stop(),
_1651: x0 => new Event(x0),
_1652: x0 => x0.requestFullscreen(),
_1653: (x0,x1) => x0.lock(x1),
_1654: x0 => x0.unlock(),
_1655: (x0,x1) => x0.getUserMedia(x1),
_1656: x0 => x0.getSupportedConstraints(),
_1657: x0 => x0.getVideoTracks(),
_1658: x0 => x0.getCapabilities(),
_1659: x0 => x0.getSupportedConstraints(),
_1660: x0 => x0.getSettings(),
_1661: x0 => x0.getCapabilities(),
_1662: (x0,x1,x2) => x0.setProperty(x1,x2),
_1663: (x0,x1) => x0.append(x1),
_1664: (x0,x1,x2) => x0.setAttribute(x1,x2),
_1665: x0 => x0.getVideoTracks(),
_1666: x0 => x0.play(),
_1667: x0 => x0.pause(),
_1668: x0 => x0.getVideoTracks(),
_1669: x0 => x0.getTracks(),
_1670: x0 => x0.stop(),
_1671: (x0,x1,x2) => x0.translate(x1,x2),
_1672: (x0,x1,x2) => x0.scale(x1,x2),
_1673: f => finalizeWrapper(f, function(x0) { return dartInstance.exports._1673(f,arguments.length,x0) }),
_1674: (x0,x1,x2) => x0.toBlob(x1,x2),
_1675: x0 => globalThis.URL.createObjectURL(x0),
_1676: x0 => x0.getVideoTracks(),
_1677: x0 => x0.getSettings(),
_1678: x0 => x0.getSupportedConstraints(),
_1679: x0 => x0.getVideoTracks(),
_1680: x0 => x0.getCapabilities(),
_1681: x0 => ({torch: x0}),
_1682: (x0,x1) => x0.applyConstraints(x1),
_1683: x0 => ({zoom: x0}),
_1684: x0 => x0.getVideoTracks(),
_1685: x0 => x0.getSettings(),
_1686: x0 => ({mimeType: x0}),
_1687: (x0,x1) => new MediaRecorder(x0,x1),
_1688: f => finalizeWrapper(f, function(x0) { return dartInstance.exports._1688(f,arguments.length,x0) }),
_1689: f => finalizeWrapper(f, function(x0) { return dartInstance.exports._1689(f,arguments.length,x0) }),
_1690: x0 => x0.start(),
_1691: x0 => globalThis.URL.createObjectURL(x0),
_1692: f => finalizeWrapper(f, function(x0) { return dartInstance.exports._1692(f,arguments.length,x0) }),
_1693: f => finalizeWrapper(f, function(x0) { return dartInstance.exports._1693(f,arguments.length,x0) }),
_1694: x0 => x0.pause(),
_1695: x0 => x0.resume(),
_1696: x0 => x0.stop(),
_1697: x0 => x0.load(),
_1698: x0 => globalThis.MediaRecorder.isTypeSupported(x0),
_1699: x0 => ({type: x0}),
_1700: (x0,x1) => new Blob(x0,x1),
_1701: (x0,x1) => x0.querySelector(x1),
_1702: f => finalizeWrapper(f, function(x0) { return dartInstance.exports._1702(f,arguments.length,x0) }),
_1703: (x0,x1) => x0.removeChild(x1),
_1704: f => finalizeWrapper(f, function(x0) { return dartInstance.exports._1704(f,arguments.length,x0) }),
_1705: (x0,x1) => x0.appendChild(x1),
_1706: () => new Map(),
_1707: (x0,x1,x2) => x0.set(x1,x2),
_1708: (x0,x1,x2,x3) => x0.call(x1,x2,x3),
_1709: f => finalizeWrapper(f, function(x0,x1) { return dartInstance.exports._1709(f,arguments.length,x0,x1) }),
_1710: (x0,x1) => x0.call(x1),
_1711: (x0,x1) => new ZXing.BrowserMultiFormatReader(x0,x1),
_1712: (x0,x1) => x0.append(x1),
_1713: x0 => x0.getVideoTracks(),
_1714: x0 => x0.getCapabilities(),
_1715: () => ({}),
_1716: x0 => x0.getSettings(),
_1717: x0 => x0.getSupportedConstraints(),
_1718: x0 => ({video: x0}),
_1719: x0 => ({facingMode: x0}),
_1722: (x0,x1) => x0.query(x1),
_1723: f => finalizeWrapper(f, function(x0) { return dartInstance.exports._1723(f,arguments.length,x0) }),
_1724: f => finalizeWrapper(f, function(x0) { return dartInstance.exports._1724(f,arguments.length,x0) }),
_1725: (x0,x1,x2) => ({enableHighAccuracy: x0,timeout: x1,maximumAge: x2}),
_1726: (x0,x1,x2,x3) => x0.getCurrentPosition(x1,x2,x3),
_1727: (x0,x1) => x0.clearWatch(x1),
_1728: f => finalizeWrapper(f, function(x0) { return dartInstance.exports._1728(f,arguments.length,x0) }),
_1729: f => finalizeWrapper(f, function(x0) { return dartInstance.exports._1729(f,arguments.length,x0) }),
_1730: (x0,x1,x2,x3) => x0.watchPosition(x1,x2,x3),
_1731: (x0,x1) => x0.querySelector(x1),
_1732: (x0,x1) => x0.appendChild(x1),
_1741: x0 => ({frequency: x0}),
_1742: x0 => new Accelerometer(x0),
_1743: x0 => x0.start(),
_1744: f => finalizeWrapper(f, function(x0) { return dartInstance.exports._1744(f,arguments.length,x0) }),
_1745: f => finalizeWrapper(f, function(x0) { return dartInstance.exports._1745(f,arguments.length,x0) }),
_1746: x0 => new Gyroscope(x0),
_1747: x0 => x0.start(),
_1748: f => finalizeWrapper(f, function(x0) { return dartInstance.exports._1748(f,arguments.length,x0) }),
_1749: f => finalizeWrapper(f, function(x0) { return dartInstance.exports._1749(f,arguments.length,x0) }),
_1750: x0 => new LinearAccelerationSensor(x0),
_1751: x0 => x0.start(),
_1752: f => finalizeWrapper(f, function(x0) { return dartInstance.exports._1752(f,arguments.length,x0) }),
_1753: f => finalizeWrapper(f, function(x0) { return dartInstance.exports._1753(f,arguments.length,x0) }),
_1754: x0 => new Magnetometer(x0),
_1755: x0 => x0.start(),
_1756: f => finalizeWrapper(f, function(x0) { return dartInstance.exports._1756(f,arguments.length,x0) }),
_1757: f => finalizeWrapper(f, function(x0) { return dartInstance.exports._1757(f,arguments.length,x0) }),
_1759: x0 => x0.getBattery(),
_1760: f => finalizeWrapper(f, function(x0) { return dartInstance.exports._1760(f,arguments.length,x0) }),
_1761: x0 => x0.barcodeFormat,
_1762: x0 => x0.text,
_1763: x0 => x0.rawBytes,
_1764: x0 => x0.resultPoints,
_1766: (x0,x1) => ({video: x0,audio: x1}),
_1778: x0 => new Array(x0),
_1781: (o, c) => o instanceof c,
_1785: f => finalizeWrapper(f, function(x0) { return dartInstance.exports._1785(f,arguments.length,x0) }),
_1786: f => finalizeWrapper(f, function(x0) { return dartInstance.exports._1786(f,arguments.length,x0) }),
_1811: (decoder, codeUnits) => decoder.decode(codeUnits),
_1812: () => new TextDecoder("utf-8", {fatal: true}),
_1813: () => new TextDecoder("utf-8", {fatal: false}),
_1814: v => v.toString(),
_1815: (d, digits) => d.toFixed(digits),
_1819: x0 => new WeakRef(x0),
_1820: x0 => x0.deref(),
_1826: Date.now,
_1828: s => new Date(s * 1000).getTimezoneOffset() * 60 ,
_1829: s => {
      if (!/^\s*[+-]?(?:Infinity|NaN|(?:\.\d+|\d+(?:\.\d*)?)(?:[eE][+-]?\d+)?)\s*$/.test(s)) {
        return NaN;
      }
      return parseFloat(s);
    },
_1830: () => {
          let stackString = new Error().stack.toString();
          let frames = stackString.split('\n');
          let drop = 2;
          if (frames[0] === 'Error') {
              drop += 1;
          }
          return frames.slice(drop).join('\n');
        },
_1831: () => typeof dartUseDateNowForTicks !== "undefined",
_1832: () => 1000 * performance.now(),
_1833: () => Date.now(),
_1834: () => {
      // On browsers return `globalThis.location.href`
      if (globalThis.location != null) {
        return globalThis.location.href;
      }
      return null;
    },
_1835: () => {
        return typeof process != "undefined" &&
               Object.prototype.toString.call(process) == "[object process]" &&
               process.platform == "win32"
      },
_1836: () => new WeakMap(),
_1837: (map, o) => map.get(o),
_1838: (map, o, v) => map.set(o, v),
_1839: () => globalThis.WeakRef,
_1850: s => JSON.stringify(s),
_1851: s => printToConsole(s),
_1852: a => a.join(''),
_1853: (o, a, b) => o.replace(a, b),
_1855: (s, t) => s.split(t),
_1856: s => s.toLowerCase(),
_1857: s => s.toUpperCase(),
_1858: s => s.trim(),
_1859: s => s.trimLeft(),
_1860: s => s.trimRight(),
_1862: (s, p, i) => s.indexOf(p, i),
_1863: (s, p, i) => s.lastIndexOf(p, i),
_1864: (s) => s.replace(/\$/g, "$$$$"),
_1865: Object.is,
_1866: s => s.toUpperCase(),
_1867: s => s.toLowerCase(),
_1868: (a, i) => a.push(i),
_1872: a => a.pop(),
_1873: (a, i) => a.splice(i, 1),
_1875: (a, s) => a.join(s),
_1876: (a, s, e) => a.slice(s, e),
_1878: (a, b) => a == b ? 0 : (a > b ? 1 : -1),
_1879: a => a.length,
_1881: (a, i) => a[i],
_1882: (a, i, v) => a[i] = v,
_1884: (o, offsetInBytes, lengthInBytes) => {
      var dst = new ArrayBuffer(lengthInBytes);
      new Uint8Array(dst).set(new Uint8Array(o, offsetInBytes, lengthInBytes));
      return new DataView(dst);
    },
_1885: (o, start, length) => new Uint8Array(o.buffer, o.byteOffset + start, length),
_1886: (o, start, length) => new Int8Array(o.buffer, o.byteOffset + start, length),
_1887: (o, start, length) => new Uint8ClampedArray(o.buffer, o.byteOffset + start, length),
_1888: (o, start, length) => new Uint16Array(o.buffer, o.byteOffset + start, length),
_1889: (o, start, length) => new Int16Array(o.buffer, o.byteOffset + start, length),
_1890: (o, start, length) => new Uint32Array(o.buffer, o.byteOffset + start, length),
_1891: (o, start, length) => new Int32Array(o.buffer, o.byteOffset + start, length),
_1893: (o, start, length) => new BigInt64Array(o.buffer, o.byteOffset + start, length),
_1894: (o, start, length) => new Float32Array(o.buffer, o.byteOffset + start, length),
_1895: (o, start, length) => new Float64Array(o.buffer, o.byteOffset + start, length),
_1896: (t, s) => t.set(s),
_1898: (o) => new DataView(o.buffer, o.byteOffset, o.byteLength),
_1899: o => o.byteLength,
_1900: o => o.buffer,
_1901: o => o.byteOffset,
_1902: Function.prototype.call.bind(Object.getOwnPropertyDescriptor(DataView.prototype, 'byteLength').get),
_1903: (b, o) => new DataView(b, o),
_1904: (b, o, l) => new DataView(b, o, l),
_1905: Function.prototype.call.bind(DataView.prototype.getUint8),
_1906: Function.prototype.call.bind(DataView.prototype.setUint8),
_1907: Function.prototype.call.bind(DataView.prototype.getInt8),
_1908: Function.prototype.call.bind(DataView.prototype.setInt8),
_1909: Function.prototype.call.bind(DataView.prototype.getUint16),
_1910: Function.prototype.call.bind(DataView.prototype.setUint16),
_1911: Function.prototype.call.bind(DataView.prototype.getInt16),
_1912: Function.prototype.call.bind(DataView.prototype.setInt16),
_1913: Function.prototype.call.bind(DataView.prototype.getUint32),
_1914: Function.prototype.call.bind(DataView.prototype.setUint32),
_1915: Function.prototype.call.bind(DataView.prototype.getInt32),
_1916: Function.prototype.call.bind(DataView.prototype.setInt32),
_1919: Function.prototype.call.bind(DataView.prototype.getBigInt64),
_1920: Function.prototype.call.bind(DataView.prototype.setBigInt64),
_1921: Function.prototype.call.bind(DataView.prototype.getFloat32),
_1922: Function.prototype.call.bind(DataView.prototype.setFloat32),
_1923: Function.prototype.call.bind(DataView.prototype.getFloat64),
_1924: Function.prototype.call.bind(DataView.prototype.setFloat64),
_1938: (o, t) => o instanceof t,
_1940: f => finalizeWrapper(f, function(x0) { return dartInstance.exports._1940(f,arguments.length,x0) }),
_1941: f => finalizeWrapper(f, function(x0) { return dartInstance.exports._1941(f,arguments.length,x0) }),
_1942: o => Object.keys(o),
_1943: (ms, c) =>
              setTimeout(() => dartInstance.exports.$invokeCallback(c),ms),
_1944: (handle) => clearTimeout(handle),
_1945: (ms, c) =>
          setInterval(() => dartInstance.exports.$invokeCallback(c), ms),
_1946: (handle) => clearInterval(handle),
_1947: (c) =>
              queueMicrotask(() => dartInstance.exports.$invokeCallback(c)),
_1948: () => Date.now(),
_1949: () => new XMLHttpRequest(),
_1950: (x0,x1,x2,x3) => x0.open(x1,x2,x3),
_1951: (x0,x1,x2) => x0.setRequestHeader(x1,x2),
_1952: (x0,x1) => x0.send(x1),
_1953: x0 => x0.abort(),
_1954: x0 => x0.getAllResponseHeaders(),
_1955: x0 => globalThis.URL.createObjectURL(x0),
_1957: () => new XMLHttpRequest(),
_1958: x0 => x0.send(),
_1960: () => new FileReader(),
_1961: (x0,x1) => x0.readAsArrayBuffer(x1),
_1969: f => finalizeWrapper(f, function(x0) { return dartInstance.exports._1969(f,arguments.length,x0) }),
_1970: f => finalizeWrapper(f, function(x0) { return dartInstance.exports._1970(f,arguments.length,x0) }),
_1983: (x0,x1) => x0.getContext(x1),
_1987: (x0,x1,x2,x3,x4,x5) => x0.drawImage(x1,x2,x3,x4,x5),
_1996: x0 => x0.attachStreamToVideo,
_1998: x0 => x0.decodeContinuously,
_2002: x0 => x0.reset,
_2004: x0 => x0.stopContinuousDecode,
_2006: x0 => x0.stream,
_2007: x0 => x0.videoElement,
_2008: x0 => x0.getVideoTracks(),
_2009: x0 => x0.getCapabilities(),
_2010: x0 => x0.getSettings(),
_2011: (x0,x1) => ({width: x0,height: x1}),
_2012: (x0,x1,x2) => ({width: x0,height: x1,facingMode: x2}),
_2014: x0 => x0.zoom,
_2015: x0 => x0.torch,
_2016: x0 => x0.zoom,
_2017: x0 => x0.torch,
_2018: x0 => x0.facingMode,
_2020: x0 => x0.max,
_2022: x0 => x0.min,
_2027: (x0,x1) => x0.appendChild(x1),
_2028: (x0,x1) => x0.item(x1),
_2029: x0 => x0.getCapabilities,
_2030: x0 => x0.facingMode,
_2031: (x0,x1) => x0.item(x1),
_2033: (s, m) => {
          try {
            return new RegExp(s, m);
          } catch (e) {
            return String(e);
          }
        },
_2034: (x0,x1) => x0.exec(x1),
_2035: (x0,x1) => x0.test(x1),
_2036: (x0,x1) => x0.exec(x1),
_2037: (x0,x1) => x0.exec(x1),
_2038: x0 => x0.pop(),
_2042: (x0,x1,x2) => x0[x1] = x2,
_2044: o => o === undefined,
_2045: o => typeof o === 'boolean',
_2046: o => typeof o === 'number',
_2048: o => typeof o === 'string',
_2051: o => o instanceof Int8Array,
_2052: o => o instanceof Uint8Array,
_2053: o => o instanceof Uint8ClampedArray,
_2054: o => o instanceof Int16Array,
_2055: o => o instanceof Uint16Array,
_2056: o => o instanceof Int32Array,
_2057: o => o instanceof Uint32Array,
_2058: o => o instanceof Float32Array,
_2059: o => o instanceof Float64Array,
_2060: o => o instanceof ArrayBuffer,
_2061: o => o instanceof DataView,
_2062: o => o instanceof Array,
_2063: o => typeof o === 'function' && o[jsWrappedDartFunctionSymbol] === true,
_2065: o => {
            const proto = Object.getPrototypeOf(o);
            return proto === Object.prototype || proto === null;
          },
_2066: o => o instanceof RegExp,
_2067: (l, r) => l === r,
_2068: o => o,
_2069: o => o,
_2070: o => o,
_2071: b => !!b,
_2072: o => o.length,
_2075: (o, i) => o[i],
_2076: f => f.dartFunction,
_2077: l => arrayFromDartList(Int8Array, l),
_2078: (data, length) => {
          const jsBytes = new Uint8Array(length);
          const getByte = dartInstance.exports.$uint8ListGet;
          for (let i = 0; i < length; i++) {
            jsBytes[i] = getByte(data, i);
          }
          return jsBytes;
        },
_2079: l => arrayFromDartList(Uint8ClampedArray, l),
_2080: l => arrayFromDartList(Int16Array, l),
_2081: l => arrayFromDartList(Uint16Array, l),
_2082: l => arrayFromDartList(Int32Array, l),
_2083: l => arrayFromDartList(Uint32Array, l),
_2084: l => arrayFromDartList(Float32Array, l),
_2085: l => arrayFromDartList(Float64Array, l),
_2086: (data, length) => {
          const read = dartInstance.exports.$byteDataGetUint8;
          const view = new DataView(new ArrayBuffer(length));
          for (let i = 0; i < length; i++) {
              view.setUint8(i, read(data, i));
          }
          return view;
        },
_2087: l => arrayFromDartList(Array, l),
_2088:       (s, length) => {
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
_2089:     (s, length) => {
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
_2090:     (s) => {
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
_2091: () => ({}),
_2092: () => [],
_2093: l => new Array(l),
_2094: () => globalThis,
_2095: (constructor, args) => {
      const factoryFunction = constructor.bind.apply(
          constructor, [null, ...args]);
      return new factoryFunction();
    },
_2096: (o, p) => p in o,
_2097: (o, p) => o[p],
_2098: (o, p, v) => o[p] = v,
_2099: (o, m, a) => o[m].apply(o, a),
_2101: o => String(o),
_2102: (p, s, f) => p.then(s, f),
_2103: s => {
      if (/[[\]{}()*+?.\\^$|]/.test(s)) {
          s = s.replace(/[[\]{}()*+?.\\^$|]/g, '\\$&');
      }
      return s;
    },
_2106: x0 => x0.index,
_2108: x0 => x0.length,
_2110: (x0,x1) => x0[x1],
_2113: x0 => x0.flags,
_2114: x0 => x0.multiline,
_2115: x0 => x0.ignoreCase,
_2116: x0 => x0.unicode,
_2117: x0 => x0.dotAll,
_2118: (x0,x1) => x0.lastIndex = x1,
_2119: (o, p) => p in o,
_2120: (o, p) => o[p],
_2161: x0 => x0.status,
_2162: (x0,x1) => x0.responseType = x1,
_2164: x0 => x0.response,
_2165: x0 => x0.x,
_2166: x0 => x0.y,
_2170: () => globalThis.window.flutterCanvasKit,
_2171: () => globalThis.window._flutter_skwasmInstance,
_2206: (x0,x1) => x0.withCredentials = x1,
_2208: x0 => x0.responseURL,
_2209: x0 => x0.status,
_2210: x0 => x0.statusText,
_2212: (x0,x1) => x0.responseType = x1,
_2213: x0 => x0.response,
_2267: (x0,x1) => x0.lang = x1,
_2292: x0 => x0.style,
_2320: (x0,x1) => x0.oncancel = x1,
_2326: (x0,x1) => x0.onchange = x1,
_2366: (x0,x1) => x0.onerror = x1,
_2382: (x0,x1) => x0.onload = x1,
_2864: x0 => x0.videoWidth,
_2865: x0 => x0.videoHeight,
_2869: (x0,x1) => x0.playsInline = x1,
_2917: x0 => x0.error,
_2919: (x0,x1) => x0.src = x1,
_2920: x0 => x0.srcObject,
_2921: (x0,x1) => x0.srcObject = x1,
_2928: x0 => x0.buffered,
_2931: x0 => x0.currentTime,
_2932: (x0,x1) => x0.currentTime = x1,
_2933: x0 => x0.duration,
_2938: (x0,x1) => x0.playbackRate = x1,
_2945: (x0,x1) => x0.autoplay = x1,
_2947: (x0,x1) => x0.loop = x1,
_2949: (x0,x1) => x0.controls = x1,
_2951: (x0,x1) => x0.volume = x1,
_2953: (x0,x1) => x0.muted = x1,
_2962: () => globalThis.MediaError.MEDIA_ERR_ABORTED,
_2963: () => globalThis.MediaError.MEDIA_ERR_NETWORK,
_2964: () => globalThis.MediaError.MEDIA_ERR_DECODE,
_2965: () => globalThis.MediaError.MEDIA_ERR_SRC_NOT_SUPPORTED,
_2966: x0 => x0.code,
_2967: x0 => x0.message,
_3039: x0 => x0.length,
_3242: (x0,x1) => x0.accept = x1,
_3256: x0 => x0.files,
_3282: (x0,x1) => x0.multiple = x1,
_3300: (x0,x1) => x0.type = x1,
_3546: x0 => x0.src,
_3547: (x0,x1) => x0.src = x1,
_3549: (x0,x1) => x0.type = x1,
_3553: (x0,x1) => x0.async = x1,
_3555: (x0,x1) => x0.defer = x1,
_3557: (x0,x1) => x0.crossOrigin = x1,
_3567: (x0,x1) => x0.charset = x1,
_3592: (x0,x1) => x0.width = x1,
_3594: (x0,x1) => x0.height = x1,
_4028: () => globalThis.window,
_4069: x0 => x0.screen,
_4085: x0 => x0.document,
_4107: x0 => x0.navigator,
_4413: x0 => x0.message,
_4459: x0 => x0.geolocation,
_4462: x0 => x0.mediaDevices,
_4464: x0 => x0.permissions,
_4465: x0 => x0.maxTouchPoints,
_4471: x0 => x0.deviceMemory,
_4472: x0 => x0.appCodeName,
_4473: x0 => x0.appName,
_4474: x0 => x0.appVersion,
_4475: x0 => x0.platform,
_4476: x0 => x0.product,
_4477: x0 => x0.productSub,
_4478: x0 => x0.userAgent,
_4479: x0 => x0.vendor,
_4480: x0 => x0.vendorSub,
_4482: x0 => x0.language,
_4483: x0 => x0.languages,
_4484: x0 => x0.onLine,
_4489: x0 => x0.hardwareConcurrency,
_7683: x0 => x0.type,
_7684: x0 => x0.target,
_7740: x0 => x0.length,
_7805: x0 => x0.baseURI,
_7822: () => globalThis.document,
_7894: x0 => x0.documentElement,
_7913: x0 => x0.body,
_7915: x0 => x0.head,
_8274: (x0,x1) => x0.id = x1,
_8290: x0 => x0.children,
_9967: x0 => x0.size,
_9968: x0 => x0.type,
_9971: (x0,x1) => x0.type = x1,
_9974: x0 => x0.name,
_9975: x0 => x0.lastModified,
_9981: x0 => x0.length,
_9996: x0 => x0.result,
_10400: (x0,x1) => x0.audioBitsPerSecond = x1,
_10402: (x0,x1) => x0.videoBitsPerSecond = x1,
_10412: x0 => x0.data,
_10788: x0 => x0.type,
_10820: x0 => x0.orientation,
_10909: x0 => x0.state,
_11350: x0 => x0.facingMode,
_11425: x0 => x0.facingMode,
_11564: x0 => x0.width,
_11566: x0 => x0.height,
_11572: x0 => x0.facingMode,
_11651: x0 => x0.deviceId,
_11652: x0 => x0.kind,
_11653: x0 => x0.label,
_12240: x0 => x0.coords,
_12241: x0 => x0.timestamp,
_12243: x0 => x0.accuracy,
_12244: x0 => x0.latitude,
_12245: x0 => x0.longitude,
_12246: x0 => x0.altitude,
_12247: x0 => x0.altitudeAccuracy,
_12248: x0 => x0.heading,
_12249: x0 => x0.speed,
_12253: x0 => x0.code,
_12254: x0 => x0.message,
_12684: (x0,x1) => x0.border = x1,
_13126: (x0,x1) => x0.height = x1,
_13320: (x0,x1) => x0.objectFit = x1,
_13450: (x0,x1) => x0.pointerEvents = x1,
_13748: (x0,x1) => x0.transform = x1,
_13752: (x0,x1) => x0.transformOrigin = x1,
_13816: (x0,x1) => x0.width = x1,
_14113: x0 => x0.charging,
_14116: x0 => x0.level,
_14118: (x0,x1) => x0.onchargingchange = x1,
_14218: x0 => x0.name,
_14219: x0 => x0.message,
_14992: x0 => x0.x,
_14993: x0 => x0.y,
_14994: x0 => x0.z,
_14995: (x0,x1) => x0.onreading = x1,
_14996: (x0,x1) => x0.onerror = x1,
_14998: x0 => x0.x,
_14999: x0 => x0.y,
_15000: x0 => x0.z,
_15001: (x0,x1) => x0.onreading = x1,
_15002: (x0,x1) => x0.onerror = x1,
_15004: x0 => x0.x,
_15005: x0 => x0.y,
_15006: x0 => x0.z,
_15007: (x0,x1) => x0.onreading = x1,
_15008: (x0,x1) => x0.onerror = x1,
_15010: x0 => x0.x,
_15011: x0 => x0.y,
_15012: x0 => x0.z,
_15013: (x0,x1) => x0.onreading = x1,
_15014: (x0,x1) => x0.onerror = x1,
_15016: x0 => x0.error,
_15017: x0 => x0.name,
_15018: x0 => x0.message
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

