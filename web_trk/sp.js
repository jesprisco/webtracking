var iz_web_trk_key = 'iz_web_trk_key';

function setUnknownUserInSessionStorage() {
  sessionStorage.setItem(iz_web_trk_key, 0);
}

function shouldFireCollectorRequest() {
  if (!sessionStorage.getItem(iz_web_trk_key)) {
    return true;
  } else {
    localStorage.setItem('snowplowOutQueue_informz_trk_infz_get', '[]')
    return false;
  }
}

function makeRequestToTheCollector(P, C, O, F, T, D, E, G, H) {
  if (shouldFireCollectorRequest()) {
    var collectorSrc = D + E;

    function handleOnLoad() {
      P.shift(), C && O.attemptWriteLocalStorage(F, T.stringify(P)), H();
    }

    function handleOnError() {
      G = !1;
    }

    var xhr = new XMLHttpRequest();
    xhr.addEventListener('load', function () {
      if (xhr.responseText === 'User Unknown') {
        setUnknownUserInSessionStorage();
      }
      handleOnLoad();
    });
    xhr.addEventListener('error', function () {
      handleOnError();
    });
    xhr.open('GET', collectorSrc);
    xhr.send();
  } else {
    localStorage.setItem("snowplowOutQueue_informz_trk_infz_get", "[]")
  }
}

/*! * Snowplow - The world's most powerful web analytics platform
 *
 * @description JavaScript tracker for Snowplow
 * @version     2.5.3
 * @author      Alex Dean, Simon Andersson, Anthon Pang, Fred Blundun
 * @copyright   Anthon Pang, Snowplow Analytics Ltd
 * @license     Simplified BSD
 */
function truncateUrl(url) {
  if (url) {
    var anchor = document.createElement('a');
    anchor.href = url;
    var queryString = anchor.search;
    if (queryString.length > 0) {
      anchor.search = queryString.substring(1).split('&').filter(param => param.length < 50).join('&');
    }
    return anchor.protocol + '//' + anchor.hostname + anchor.pathname + anchor.search;
  }
  return url;
}

!(function e(t, n, r) {
  function a(i, c) {
    if (!n[i]) {
      if (!t[i]) {
        var s = 'function' == typeof require && require;
        if (!c && s) return s(i, !0);
        if (o) return o(i, !0);
        var u = new Error("Cannot find module '" + i + "'");
        throw ((u.code = 'MODULE_NOT_FOUND'), u);
      }
      var l = (n[i] = { exports: {} });
      t[i][0].call(
        l.exports,
        function (e) {
          return a(t[i][1][e] || e);
        },
        l,
        l.exports,
        e,
        t,
        n,
        r
      );
    }
    return n[i].exports;
  }
  for (
    var o = 'function' == typeof require && require, i = 0;
    i < r.length;
    i++
  )
    a(r[i]);
  return a;
})(
  {
    1: [
      function (require, module, exports) {
        var JSON;
        (JSON = JSON || {}),
          (function () {
            var global = Function('return this')(),
              JSON = global.JSON;
            function f(e) {
              return e < 10 ? '0' + e : e;
            }
            (JSON = JSON || {}),
              'function' != typeof Date.prototype.toJSON &&
                ((Date.prototype.toJSON = function (e) {
                  return isFinite(this.valueOf())
                    ? this.getUTCFullYear() +
                        '-' +
                        f(this.getUTCMonth() + 1) +
                        '-' +
                        f(this.getUTCDate()) +
                        'T' +
                        f(this.getUTCHours()) +
                        ':' +
                        f(this.getUTCMinutes()) +
                        ':' +
                        f(this.getUTCSeconds()) +
                        'Z'
                    : null;
                }),
                (String.prototype.toJSON = Number.prototype.toJSON = Boolean.prototype.toJSON = function (
                  e
                ) {
                  return this.valueOf();
                }));
            var cx = /[\u0000\u00ad\u0600-\u0604\u070f\u17b4\u17b5\u200c-\u200f\u2028-\u202f\u2060-\u206f\ufeff\ufff0-\uffff]/g,
              escapable = /[\\\"\x00-\x1f\x7f-\x9f\u00ad\u0600-\u0604\u070f\u17b4\u17b5\u200c-\u200f\u2028-\u202f\u2060-\u206f\ufeff\ufff0-\uffff]/g,
              gap,
              indent,
              meta = {
                '\b': '\\b',
                '\t': '\\t',
                '\n': '\\n',
                '\f': '\\f',
                '\r': '\\r',
                '"': '\\"',
                '\\': '\\\\',
              },
              rep;
            function quote(e) {
              return (
                (escapable.lastIndex = 0),
                escapable.test(e)
                  ? '"' +
                    e.replace(escapable, function (e) {
                      var t = meta[e];
                      return 'string' == typeof t
                        ? t
                        : '\\u' +
                            ('0000' + e.charCodeAt(0).toString(16)).slice(-4);
                    }) +
                    '"'
                  : '"' + e + '"'
              );
            }
            function str(e, t) {
              var n,
                r,
                a,
                o,
                i,
                c = gap,
                s = t[e];
              switch (
                (s &&
                  'object' == typeof s &&
                  'function' == typeof s.toJSON &&
                  (s = s.toJSON(e)),
                'function' == typeof rep && (s = rep.call(t, e, s)),
                typeof s)
              ) {
                case 'string':
                  return quote(s);
                case 'number':
                  return isFinite(s) ? String(s) : 'null';
                case 'boolean':
                case 'null':
                  return String(s);
                case 'object':
                  if (!s) return 'null';
                  if (
                    ((gap += indent),
                    (i = []),
                    '[object Array]' === Object.prototype.toString.apply(s))
                  ) {
                    for (o = s.length, n = 0; n < o; n += 1)
                      i[n] = str(n, s) || 'null';
                    return (
                      (a =
                        0 === i.length
                          ? '[]'
                          : gap
                          ? '[\n' + gap + i.join(',\n' + gap) + '\n' + c + ']'
                          : '[' + i.join(',') + ']'),
                      (gap = c),
                      a
                    );
                  }
                  if (rep && 'object' == typeof rep)
                    for (o = rep.length, n = 0; n < o; n += 1)
                      'string' == typeof rep[n] &&
                        (a = str((r = rep[n]), s)) &&
                        i.push(quote(r) + (gap ? ': ' : ':') + a);
                  else
                    for (r in s)
                      Object.prototype.hasOwnProperty.call(s, r) &&
                        (a = str(r, s)) &&
                        i.push(quote(r) + (gap ? ': ' : ':') + a);
                  return (
                    (a =
                      0 === i.length
                        ? '{}'
                        : gap
                        ? '{\n' + gap + i.join(',\n' + gap) + '\n' + c + '}'
                        : '{' + i.join(',') + '}'),
                    (gap = c),
                    a
                  );
              }
            }
            'function' != typeof JSON.stringify &&
              (JSON.stringify = function (e, t, n) {
                var r;
                if (((indent = gap = ''), 'number' == typeof n))
                  for (r = 0; r < n; r += 1) indent += ' ';
                else 'string' == typeof n && (indent = n);
                if (
                  (rep = t) &&
                  'function' != typeof t &&
                  ('object' != typeof t || 'number' != typeof t.length)
                )
                  throw new Error('JSON.stringify');
                return str('', { '': e });
              }),
              'function' != typeof JSON.parse &&
                (JSON.parse = function (text, reviver) {
                  var j;
                  function walk(e, t) {
                    var n,
                      r,
                      a = e[t];
                    if (a && 'object' == typeof a)
                      for (n in a)
                        Object.prototype.hasOwnProperty.call(a, n) &&
                          (void 0 !== (r = walk(a, n))
                            ? (a[n] = r)
                            : delete a[n]);
                    return reviver.call(e, t, a);
                  }
                  if (
                    ((text = String(text)),
                    (cx.lastIndex = 0),
                    cx.test(text) &&
                      (text = text.replace(cx, function (e) {
                        return (
                          '\\u' +
                          ('0000' + e.charCodeAt(0).toString(16)).slice(-4)
                        );
                      })),
                    /^[\],:{}\s]*$/.test(
                      text
                        .replace(/\\(?:["\\\/bfnrt]|u[0-9a-fA-F]{4})/g, '@')
                        .replace(
                          /"[^"\\\n\r]*"|true|false|null|-?\d+(?:\.\d*)?(?:[eE][+\-]?\d+)?/g,
                          ']'
                        )
                        .replace(/(?:^|:|,)(?:\s*\[)+/g, '')
                    ))
                  )
                    return (
                      (j = eval('(' + text + ')')),
                      'function' == typeof reviver ? walk({ '': j }, '') : j
                    );
                  throw new SyntaxError('JSON.parse');
                }),
              (global.JSON = JSON),
              (module.exports = JSON);
          })();
      },
      {},
    ],
    2: [
      function (e, t, n) {
        this.cookie = function (e, t, n, r, a, o) {
          return 1 < arguments.length
            ? (document.cookie =
                e +
                '=' +
                escape(t) +
                (n
                  ? '; expires=' + new Date(+new Date() + 1e3 * n).toUTCString()
                  : '') +
                (r ? '; path=' + r : '') +
                (o ? '; secure' : ''))
            : unescape(
                (('; ' + document.cookie).split('; ' + e + '=')[1] || '').split(
                  ';'
                )[0]
              );
        };
      },
      {},
    ],
    3: [
      function (e, t, n) {
        function r(e) {
          var t = -e.getTimezoneOffset();
          return null !== t ? t : 0;
        }
        function a(e, t, n) {
          var r = new Date();
          return (
            void 0 !== e && r.setFullYear(e), r.setMonth(t), r.setDate(n), r
          );
        }
        function o(e) {
          return r(a(e, 0, 2));
        }
        function i(e) {
          return r(a(e, 5, 2));
        }
        var c;
        ((c = {
          determine: function () {
            var e,
              t,
              n,
              r =
                (n = (e = o()) - (t = i())) < 0
                  ? e + ',1'
                  : 0 < n
                  ? t + ',1,s'
                  : e + ',0';
            return new c.TimeZone(c.olson.timezones[r]);
          },
          date_is_dst: function (e) {
            var t = 7 < e.getMonth(),
              n = (t ? i : o)(e.getFullYear()),
              a = n - r(e);
            return n < 0 || t ? 0 != a : a < 0;
          },
          dst_start_for: function (e) {
            var t = new Date(2010, 6, 15, 1, 0, 0, 0);
            return {
              'America/Denver': new Date(2011, 2, 13, 3, 0, 0, 0),
              'America/Mazatlan': new Date(2011, 3, 3, 3, 0, 0, 0),
              'America/Chicago': new Date(2011, 2, 13, 3, 0, 0, 0),
              'America/Mexico_City': new Date(2011, 3, 3, 3, 0, 0, 0),
              'America/Asuncion': new Date(2012, 9, 7, 3, 0, 0, 0),
              'America/Santiago': new Date(2012, 9, 3, 3, 0, 0, 0),
              'America/Campo_Grande': new Date(2012, 9, 21, 5, 0, 0, 0),
              'America/Montevideo': new Date(2011, 9, 2, 3, 0, 0, 0),
              'America/Sao_Paulo': new Date(2011, 9, 16, 5, 0, 0, 0),
              'America/Los_Angeles': new Date(2011, 2, 13, 8, 0, 0, 0),
              'America/Santa_Isabel': new Date(2011, 3, 5, 8, 0, 0, 0),
              'America/Havana': new Date(2012, 2, 10, 2, 0, 0, 0),
              'America/New_York': new Date(2012, 2, 10, 7, 0, 0, 0),
              'Europe/Helsinki': new Date(2013, 2, 31, 5, 0, 0, 0),
              'Pacific/Auckland': new Date(2011, 8, 26, 7, 0, 0, 0),
              'America/Halifax': new Date(2011, 2, 13, 6, 0, 0, 0),
              'America/Goose_Bay': new Date(2011, 2, 13, 2, 1, 0, 0),
              'America/Miquelon': new Date(2011, 2, 13, 5, 0, 0, 0),
              'America/Godthab': new Date(2011, 2, 27, 1, 0, 0, 0),
              'Europe/Moscow': t,
              'Asia/Amman': new Date(2013, 2, 29, 1, 0, 0, 0),
              'Asia/Beirut': new Date(2013, 2, 31, 2, 0, 0, 0),
              'Asia/Damascus': new Date(2013, 3, 6, 2, 0, 0, 0),
              'Asia/Jerusalem': new Date(2013, 2, 29, 5, 0, 0, 0),
              'Asia/Yekaterinburg': t,
              'Asia/Omsk': t,
              'Asia/Krasnoyarsk': t,
              'Asia/Irkutsk': t,
              'Asia/Yakutsk': t,
              'Asia/Vladivostok': t,
              'Asia/Baku': new Date(2013, 2, 31, 4, 0, 0),
              'Asia/Yerevan': new Date(2013, 2, 31, 3, 0, 0),
              'Asia/Kamchatka': t,
              'Asia/Gaza': new Date(2010, 2, 27, 4, 0, 0),
              'Africa/Cairo': new Date(2010, 4, 1, 3, 0, 0),
              'Europe/Minsk': t,
              'Pacific/Apia': new Date(2010, 10, 1, 1, 0, 0, 0),
              'Pacific/Fiji': new Date(2010, 11, 1, 0, 0, 0),
              'Australia/Perth': new Date(2008, 10, 1, 1, 0, 0, 0),
            }[e];
          },
          TimeZone: function (e) {
            var t = {
                'America/Denver': ['America/Denver', 'America/Mazatlan'],
                'America/Chicago': ['America/Chicago', 'America/Mexico_City'],
                'America/Santiago': [
                  'America/Santiago',
                  'America/Asuncion',
                  'America/Campo_Grande',
                ],
                'America/Montevideo': [
                  'America/Montevideo',
                  'America/Sao_Paulo',
                ],
                'Asia/Beirut': [
                  'Asia/Amman',
                  'Asia/Jerusalem',
                  'Asia/Beirut',
                  'Europe/Helsinki',
                  'Asia/Damascus',
                ],
                'Pacific/Auckland': ['Pacific/Auckland', 'Pacific/Fiji'],
                'America/Los_Angeles': [
                  'America/Los_Angeles',
                  'America/Santa_Isabel',
                ],
                'America/New_York': ['America/Havana', 'America/New_York'],
                'America/Halifax': ['America/Goose_Bay', 'America/Halifax'],
                'America/Godthab': ['America/Miquelon', 'America/Godthab'],
                'Asia/Dubai': ['Europe/Moscow'],
                'Asia/Dhaka': ['Asia/Yekaterinburg'],
                'Asia/Jakarta': ['Asia/Omsk'],
                'Asia/Shanghai': ['Asia/Krasnoyarsk', 'Australia/Perth'],
                'Asia/Tokyo': ['Asia/Irkutsk'],
                'Australia/Brisbane': ['Asia/Yakutsk'],
                'Pacific/Noumea': ['Asia/Vladivostok'],
                'Pacific/Tarawa': ['Asia/Kamchatka', 'Pacific/Fiji'],
                'Pacific/Tongatapu': ['Pacific/Apia'],
                'Asia/Baghdad': ['Europe/Minsk'],
                'Asia/Baku': ['Asia/Yerevan', 'Asia/Baku'],
                'Africa/Johannesburg': ['Asia/Gaza', 'Africa/Cairo'],
              },
              n = e;
            return (
              void 0 !== t[n] &&
                (function () {
                  for (
                    var e = t[n], r = e.length, a = 0, o = e[0];
                    a < r;
                    a += 1
                  )
                    if (((o = e[a]), c.date_is_dst(c.dst_start_for(o))))
                      return (n = o);
                })(),
              {
                name: function () {
                  return n;
                },
              }
            );
          },
          olson: {},
        }).olson.timezones = {
          '-720,0': 'Pacific/Majuro',
          '-660,0': 'Pacific/Pago_Pago',
          '-600,1': 'America/Adak',
          '-600,0': 'Pacific/Honolulu',
          '-570,0': 'Pacific/Marquesas',
          '-540,0': 'Pacific/Gambier',
          '-540,1': 'America/Anchorage',
          '-480,1': 'America/Los_Angeles',
          '-480,0': 'Pacific/Pitcairn',
          '-420,0': 'America/Phoenix',
          '-420,1': 'America/Denver',
          '-360,0': 'America/Guatemala',
          '-360,1': 'America/Chicago',
          '-360,1,s': 'Pacific/Easter',
          '-300,0': 'America/Bogota',
          '-300,1': 'America/New_York',
          '-270,0': 'America/Caracas',
          '-240,1': 'America/Halifax',
          '-240,0': 'America/Santo_Domingo',
          '-240,1,s': 'America/Santiago',
          '-210,1': 'America/St_Johns',
          '-180,1': 'America/Godthab',
          '-180,0': 'America/Argentina/Buenos_Aires',
          '-180,1,s': 'America/Montevideo',
          '-120,0': 'America/Noronha',
          '-120,1': 'America/Noronha',
          '-60,1': 'Atlantic/Azores',
          '-60,0': 'Atlantic/Cape_Verde',
          '0,0': 'UTC',
          '0,1': 'Europe/London',
          '60,1': 'Europe/Berlin',
          '60,0': 'Africa/Lagos',
          '60,1,s': 'Africa/Windhoek',
          '120,1': 'Asia/Beirut',
          '120,0': 'Africa/Johannesburg',
          '180,0': 'Asia/Baghdad',
          '180,1': 'Europe/Moscow',
          '210,1': 'Asia/Tehran',
          '240,0': 'Asia/Dubai',
          '240,1': 'Asia/Baku',
          '270,0': 'Asia/Kabul',
          '300,1': 'Asia/Yekaterinburg',
          '300,0': 'Asia/Karachi',
          '330,0': 'Asia/Kolkata',
          '345,0': 'Asia/Kathmandu',
          '360,0': 'Asia/Dhaka',
          '360,1': 'Asia/Omsk',
          '390,0': 'Asia/Rangoon',
          '420,1': 'Asia/Krasnoyarsk',
          '420,0': 'Asia/Jakarta',
          '480,0': 'Asia/Shanghai',
          '480,1': 'Asia/Irkutsk',
          '525,0': 'Australia/Eucla',
          '525,1,s': 'Australia/Eucla',
          '540,1': 'Asia/Yakutsk',
          '540,0': 'Asia/Tokyo',
          '570,0': 'Australia/Darwin',
          '570,1,s': 'Australia/Adelaide',
          '600,0': 'Australia/Brisbane',
          '600,1': 'Asia/Vladivostok',
          '600,1,s': 'Australia/Sydney',
          '630,1,s': 'Australia/Lord_Howe',
          '660,1': 'Asia/Kamchatka',
          '660,0': 'Pacific/Noumea',
          '690,0': 'Pacific/Norfolk',
          '720,1,s': 'Pacific/Auckland',
          '720,0': 'Pacific/Tarawa',
          '765,1,s': 'Pacific/Chatham',
          '780,0': 'Pacific/Tongatapu',
          '780,1,s': 'Pacific/Apia',
          '840,0': 'Pacific/Kiritimati',
        }),
          void 0 !== n ? (n.jstz = c) : (this.jstz = c);
      },
      {},
    ],
    4: [
      function (e, t, n) {
        !(function () {
          var e = this;
          function n(e, t) {
            var n, r, a, o, i, c, s, u;
            for (
              n = 3 & e.length,
                r = e.length - n,
                a = t,
                i = 3432918353,
                c = 461845907,
                u = 0;
              u < r;

            )
              (s =
                (255 & e.charCodeAt(u)) |
                ((255 & e.charCodeAt(++u)) << 8) |
                ((255 & e.charCodeAt(++u)) << 16) |
                ((255 & e.charCodeAt(++u)) << 24)),
                ++u,
                (a =
                  27492 +
                  (65535 &
                    (o =
                      (5 *
                        (65535 &
                          (a =
                            ((a ^= s =
                              ((65535 &
                                (s =
                                  ((s =
                                    ((65535 & s) * i +
                                      ((((s >>> 16) * i) & 65535) << 16)) &
                                    4294967295) <<
                                    15) |
                                  (s >>> 17))) *
                                c +
                                ((((s >>> 16) * c) & 65535) << 16)) &
                              4294967295) <<
                              13) |
                            (a >>> 19))) +
                        (((5 * (a >>> 16)) & 65535) << 16)) &
                      4294967295)) +
                  (((58964 + (o >>> 16)) & 65535) << 16));
            switch (((s = 0), n)) {
              case 3:
                s ^= (255 & e.charCodeAt(u + 2)) << 16;
              case 2:
                s ^= (255 & e.charCodeAt(u + 1)) << 8;
              case 1:
                a ^= s =
                  ((65535 &
                    (s =
                      ((s =
                        ((65535 & (s ^= 255 & e.charCodeAt(u))) * i +
                          ((((s >>> 16) * i) & 65535) << 16)) &
                        4294967295) <<
                        15) |
                      (s >>> 17))) *
                    c +
                    ((((s >>> 16) * c) & 65535) << 16)) &
                  4294967295;
            }
            return (
              (a ^= e.length),
              (a =
                (2246822507 * (65535 & (a ^= a >>> 16)) +
                  (((2246822507 * (a >>> 16)) & 65535) << 16)) &
                4294967295),
              (a =
                (3266489909 * (65535 & (a ^= a >>> 13)) +
                  (((3266489909 * (a >>> 16)) & 65535) << 16)) &
                4294967295),
              (a ^= a >>> 16) >>> 0
            );
          }
          var r = n;
          if (
            ((r.v2 = function (e, t) {
              for (var n, r = e.length, a = t ^ r, o = 0; 4 <= r; )
                (n =
                  1540483477 *
                    (65535 &
                      (n =
                        (255 & e.charCodeAt(o)) |
                        ((255 & e.charCodeAt(++o)) << 8) |
                        ((255 & e.charCodeAt(++o)) << 16) |
                        ((255 & e.charCodeAt(++o)) << 24))) +
                  (((1540483477 * (n >>> 16)) & 65535) << 16)),
                  (a =
                    (1540483477 * (65535 & a) +
                      (((1540483477 * (a >>> 16)) & 65535) << 16)) ^
                    (n =
                      1540483477 * (65535 & (n ^= n >>> 24)) +
                      (((1540483477 * (n >>> 16)) & 65535) << 16))),
                  (r -= 4),
                  ++o;
              switch (r) {
                case 3:
                  a ^= (255 & e.charCodeAt(o + 2)) << 16;
                case 2:
                  a ^= (255 & e.charCodeAt(o + 1)) << 8;
                case 1:
                  a =
                    1540483477 * (65535 & (a ^= 255 & e.charCodeAt(o))) +
                    (((1540483477 * (a >>> 16)) & 65535) << 16);
              }
              return (
                (a =
                  1540483477 * (65535 & (a ^= a >>> 13)) +
                  (((1540483477 * (a >>> 16)) & 65535) << 16)),
                (a ^= a >>> 15) >>> 0
              );
            }),
            (r.v3 = n),
            void 0 !== t)
          )
            t.exports = r;
          else {
            var a = e.murmur;
            (r.noConflict = function () {
              return (e.murmur = a), r;
            }),
              (e.murmur = r);
          }
        })();
      },
      {},
    ],
    5: [
      function (e, t, n) {
        var r = {
          utf8: {
            stringToBytes: function (e) {
              return r.bin.stringToBytes(unescape(encodeURIComponent(e)));
            },
            bytesToString: function (e) {
              return decodeURIComponent(escape(r.bin.bytesToString(e)));
            },
          },
          bin: {
            stringToBytes: function (e) {
              for (var t = [], n = 0; n < e.length; n++)
                t.push(255 & e.charCodeAt(n));
              return t;
            },
            bytesToString: function (e) {
              for (var t = [], n = 0; n < e.length; n++)
                t.push(String.fromCharCode(e[n]));
              return t.join('');
            },
          },
        };
        t.exports = r;
      },
      {},
    ],
    6: [
      function (e, t, n) {
        var r, a;
        (r =
          'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/'),
          (a = {
            rotl: function (e, t) {
              return (e << t) | (e >>> (32 - t));
            },
            rotr: function (e, t) {
              return (e << (32 - t)) | (e >>> t);
            },
            endian: function (e) {
              if (e.constructor == Number)
                return (16711935 & a.rotl(e, 8)) | (4278255360 & a.rotl(e, 24));
              for (var t = 0; t < e.length; t++) e[t] = a.endian(e[t]);
              return e;
            },
            randomBytes: function (e) {
              for (var t = []; 0 < e; e--)
                t.push(Math.floor(256 * Math.random()));
              return t;
            },
            bytesToWords: function (e) {
              for (var t = [], n = 0, r = 0; n < e.length; n++, r += 8)
                t[r >>> 5] |= e[n] << (24 - (r % 32));
              return t;
            },
            wordsToBytes: function (e) {
              for (var t = [], n = 0; n < 32 * e.length; n += 8)
                t.push((e[n >>> 5] >>> (24 - (n % 32))) & 255);
              return t;
            },
            bytesToHex: function (e) {
              for (var t = [], n = 0; n < e.length; n++)
                t.push((e[n] >>> 4).toString(16)),
                  t.push((15 & e[n]).toString(16));
              return t.join('');
            },
            hexToBytes: function (e) {
              for (var t = [], n = 0; n < e.length; n += 2)
                t.push(parseInt(e.substr(n, 2), 16));
              return t;
            },
            bytesToBase64: function (e) {
              for (var t = [], n = 0; n < e.length; n += 3)
                for (
                  var a = (e[n] << 16) | (e[n + 1] << 8) | e[n + 2], o = 0;
                  o < 4;
                  o++
                )
                  8 * n + 6 * o <= 8 * e.length
                    ? t.push(r.charAt((a >>> (6 * (3 - o))) & 63))
                    : t.push('=');
              return t.join('');
            },
            base64ToBytes: function (e) {
              e = e.replace(/[^A-Z0-9+\/]/gi, '');
              for (var t = [], n = 0, a = 0; n < e.length; a = ++n % 4)
                0 != a &&
                  t.push(
                    ((r.indexOf(e.charAt(n - 1)) &
                      (Math.pow(2, -2 * a + 8) - 1)) <<
                      (2 * a)) |
                      (r.indexOf(e.charAt(n)) >>> (6 - 2 * a))
                  );
              return t;
            },
          }),
          (t.exports = a);
      },
      {},
    ],
    7: [
      function (e, t, n) {
        function r(e, t) {
          var n = a.wordsToBytes(
            (function (e) {
              e.constructor == String && (e = o.stringToBytes(e));
              var t = a.bytesToWords(e),
                n = 8 * e.length,
                r = [],
                i = 1732584193,
                c = -271733879,
                s = -1732584194,
                u = 271733878,
                l = -1009589776;
              (t[n >> 5] |= 128 << (24 - (n % 32))),
                (t[15 + (((64 + n) >>> 9) << 4)] = n);
              for (var f = 0; f < t.length; f += 16) {
                for (
                  var d = i, p = c, g = s, m = u, h = l, v = 0;
                  v < 80;
                  v++
                ) {
                  if (v < 16) r[v] = t[f + v];
                  else {
                    var y = r[v - 3] ^ r[v - 8] ^ r[v - 14] ^ r[v - 16];
                    r[v] = (y << 1) | (y >>> 31);
                  }
                  var w =
                    ((i << 5) | (i >>> 27)) +
                    l +
                    (r[v] >>> 0) +
                    (v < 20
                      ? 1518500249 + ((c & s) | (~c & u))
                      : v < 40
                      ? 1859775393 + (c ^ s ^ u)
                      : v < 60
                      ? ((c & s) | (c & u) | (s & u)) - 1894007588
                      : (c ^ s ^ u) - 899497514);
                  (l = u),
                    (u = s),
                    (s = (c << 30) | (c >>> 2)),
                    (c = i),
                    (i = w);
                }
                (i += d), (c += p), (s += g), (u += m), (l += h);
              }
              return [i, c, s, u, l];
            })(e)
          );
          return t && t.asBytes
            ? n
            : t && t.asString
            ? i.bytesToString(n)
            : a.bytesToHex(n);
        }
        var a, o, i;
        (a = e('crypt')),
          (o = e('charenc').utf8),
          (i = e('charenc').bin),
          (r._blocksize = 16),
          (r._digestsize = 20),
          (t.exports = r);
      },
      { charenc: 5, crypt: 6 },
    ],
    8: [
      function (e, t, n) {
        t.exports = e('./lib/core');
      },
      { './lib/core': 10 },
    ],
    9: [
      function (e, t, n) {
        !(function () {
          (void 0 !== n ? n : this).base64encode = function (e) {
            var t,
              n,
              r,
              a,
              o,
              i =
                'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=',
              c = 0,
              s = 0,
              u = '',
              l = [];
            if (!e) return e;
            for (
              e = unescape(encodeURIComponent(e));
              (t =
                ((o =
                  (e.charCodeAt(c++) << 16) |
                  (e.charCodeAt(c++) << 8) |
                  e.charCodeAt(c++)) >>
                  18) &
                63),
                (n = (o >> 12) & 63),
                (r = (o >> 6) & 63),
                (a = 63 & o),
                (l[s++] =
                  i.charAt(t) + i.charAt(n) + i.charAt(r) + i.charAt(a)),
                c < e.length;

            );
            u = l.join('');
            var f = e.length % 3;
            return (f ? u.slice(0, f - 3) : u) + '==='.slice(f || 3);
          };
        })();
      },
      {},
    ],
    10: [
      function (e, t, n) {
        var r = e('./payload.js'),
          a = e('uuid');
        t.exports = function (e, t) {
          void 0 === e && (e = !0);
          var n = {};
          function o(e, t) {
            n[e] = t;
          }
          function i(e, t) {
            var n = {};
            for (var r in ((t = t || {}), e))
              (t[r] || (null !== e[r] && void 0 !== e[r])) && (n[r] = e[r]);
            return n;
          }
          function c(e, r, o) {
            return (
              e.addDict(n),
              e.add('eid', a.v4()),
              e.add('dtm', o || new Date().getTime()),
              r &&
                e.addJson(
                  'cx',
                  'co',
                  (function () {
                    if (r && r.length)
                      return {
                        schema:
                          'iglu:com.snowplowanalytics.snowplow/contexts/jsonschema/1-0-0',
                        data: r,
                      };
                  })()
                ),
              'function' == typeof t && t(e),
              e
            );
          }
          function s(t, n, a) {
            var o = r.payloadBuilder(e),
              i = {
                schema:
                  'iglu:com.snowplowanalytics.snowplow/unstruct_event/jsonschema/1-0-0',
                data: t,
              };
            return o.add('e', 'ue'), o.addJson('ue_px', 'ue_pr', i), c(o, n, a);
          }
          return {
            setBase64Encoding: function (t) {
              e = t;
            },
            addPayloadPair: o,
            addPayloadDict: function (e) {
              for (var t in e) e.hasOwnProperty(t) && (n[t] = e[t]);
            },
            resetPayloadPairs: function (e) {
              n = r.isJson(e) ? e : {};
            },
            setTrackerVersion: function (e) {
              o('tv', e);
            },
            setTrackerNamespace: function (e) {
              o('tna', e);
            },
            setAppId: function (e) {
              o('aid', e);
            },
            setPlatform: function (e) {
              o('p', e);
            },
            setUserId: function (e) {
              o('uid', e);
            },
            setScreenResolution: function (e, t) {
              o('res', e + 'x' + t);
            },
            setViewport: function (e, t) {
              o('vp', e + 'x' + t);
            },
            setColorDepth: function (e) {
              o('cd', e);
            },
            setTimezone: function (e) {
              o('tz', e);
            },
            setLang: function (e) {
              o('lang', e);
            },
            setIpAddress: function (e) {
              o('ip', e);
            },
            trackUnstructEvent: s,
            trackPageView: function (t, n, a, o, i) {
              var s = r.payloadBuilder(e);
              return (
                s.add('e', 'pv'),
                s.add('url', truncateUrl(t)),
                s.add('page', n),
                s.add('refr', truncateUrl(a)),
                c(s, o, i)
              );
            },
            trackPagePing: function (t, n, a, o, i, s, u, l, f) {
              var d = r.payloadBuilder(e);
              return (
                d.add('e', 'pp'),
                d.add('url', truncateUrl(t)),
                d.add('page', n),
                d.add('refr', truncateUrl(a)),
                d.add('pp_mix', o),
                d.add('pp_max', i),
                d.add('pp_miy', s),
                d.add('pp_may', u),
                c(d, l, f)
              );
            },
            trackStructEvent: function (t, n, a, o, i, s, u) {
              var l = r.payloadBuilder(e);
              return (
                l.add('e', 'se'),
                l.add('se_ca', t),
                l.add('se_ac', n),
                l.add('se_la', a),
                l.add('se_pr', o),
                l.add('se_va', i),
                c(l, s, u)
              );
            },
            trackEcommerceTransaction: function (
              t,
              n,
              a,
              o,
              i,
              s,
              u,
              l,
              f,
              d,
              p
            ) {
              var g = r.payloadBuilder(e);
              return (
                g.add('e', 'tr'),
                g.add('tr_id', t),
                g.add('tr_af', n),
                g.add('tr_tt', a),
                g.add('tr_tx', o),
                g.add('tr_sh', i),
                g.add('tr_ci', s),
                g.add('tr_st', u),
                g.add('tr_co', l),
                g.add('tr_cu', f),
                c(g, d, p)
              );
            },
            trackEcommerceTransactionItem: function (
              t,
              n,
              a,
              o,
              i,
              s,
              u,
              l,
              f
            ) {
              var d = r.payloadBuilder(e);
              return (
                d.add('e', 'ti'),
                d.add('ti_id', t),
                d.add('ti_sk', n),
                d.add('ti_nm', a),
                d.add('ti_ca', o),
                d.add('ti_pr', i),
                d.add('ti_qu', s),
                d.add('ti_cu', u),
                c(d, l, f)
              );
            },
            trackScreenView: function (e, t, n, r) {
              return s(
                {
                  schema:
                    'iglu:com.snowplowanalytics.snowplow/screen_view/jsonschema/1-0-0',
                  data: i({ name: e, id: t }),
                },
                n,
                r
              );
            },
            trackLinkClick: function (e, t, n, r, a, o, c) {
              return s(
                {
                  schema:
                    'iglu:com.snowplowanalytics.snowplow/link_click/jsonschema/1-0-1',
                  data: i({
                    targetUrl: e,
                    elementId: t,
                    elementClasses: n,
                    elementTarget: r,
                    elementContent: a,
                  }),
                },
                o,
                c
              );
            },
            trackAdImpression: function (e, t, n, r, a, o, c, u, l, f) {
              return s(
                {
                  schema:
                    'iglu:com.snowplowanalytics.snowplow/ad_impression/jsonschema/1-0-0',
                  data: i({
                    impressionId: e,
                    costModel: t,
                    cost: n,
                    targetUrl: r,
                    bannerId: a,
                    zoneId: o,
                    advertiserId: c,
                    campaignId: u,
                  }),
                },
                l,
                f
              );
            },
            trackAdClick: function (e, t, n, r, a, o, c, u, l, f, d) {
              return s(
                {
                  schema:
                    'iglu:com.snowplowanalytics.snowplow/ad_click/jsonschema/1-0-0',
                  data: i({
                    targetUrl: e,
                    clickId: t,
                    costModel: n,
                    cost: r,
                    bannerId: a,
                    zoneId: o,
                    impressionId: c,
                    advertiserId: u,
                    campaignId: l,
                  }),
                },
                f,
                d
              );
            },
            trackAdConversion: function (e, t, n, r, a, o, c, u, l, f, d) {
              return s(
                {
                  schema:
                    'iglu:com.snowplowanalytics.snowplow/ad_conversion/jsonschema/1-0-0',
                  data: i({
                    conversionId: e,
                    costModel: t,
                    cost: n,
                    category: r,
                    action: a,
                    property: o,
                    initialValue: c,
                    advertiserId: u,
                    campaignId: l,
                  }),
                },
                f,
                d
              );
            },
            trackSocialInteraction: function (e, t, n, r, a) {
              return s(
                {
                  schema:
                    'iglu:com.snowplowanalytics.snowplow/social_interaction/jsonschema/1-0-0',
                  data: i({ action: e, network: t, target: n }),
                },
                r,
                a
              );
            },
            trackAddToCart: function (e, t, n, r, a, o, c, u) {
              return s(
                {
                  schema:
                    'iglu:com.snowplowanalytics.snowplow/add_to_cart/jsonschema/1-0-0',
                  data: i({
                    sku: e,
                    name: t,
                    category: n,
                    unitPrice: r,
                    quantity: a,
                    currency: o,
                  }),
                },
                c,
                u
              );
            },
            trackRemoveFromCart: function (e, t, n, r, a, o, c, u) {
              return s(
                {
                  schema:
                    'iglu:com.snowplowanalytics.snowplow/remove_from_cart/jsonschema/1-0-0',
                  data: i({
                    sku: e,
                    name: t,
                    category: n,
                    unitPrice: r,
                    quantity: a,
                    currency: o,
                  }),
                },
                c,
                u
              );
            },
            trackFormChange: function (e, t, n, r, a, o, c, u) {
              return s(
                {
                  schema:
                    'iglu:com.snowplowanalytics.snowplow/change_form/jsonschema/1-0-0',
                  data: i(
                    {
                      formId: e,
                      elementId: t,
                      nodeName: n,
                      type: r,
                      elementClasses: a,
                      value: o,
                    },
                    { value: !0 }
                  ),
                },
                c,
                u
              );
            },
            trackFormSubmission: function (e, t, n, r, a) {
              return s(
                {
                  schema:
                    'iglu:com.snowplowanalytics.snowplow/submit_form/jsonschema/1-0-0',
                  data: i({ formId: e, formClasses: t, elements: n }),
                },
                r,
                a
              );
            },
            trackSiteSearch: function (e, t, n, r, a, o) {
              return s(
                {
                  schema:
                    'iglu:com.snowplowanalytics.snowplow/site_search/jsonschema/1-0-0',
                  data: i({
                    terms: e,
                    filters: t,
                    totalResults: n,
                    pageResults: r,
                  }),
                },
                a,
                o
              );
            },
          };
        };
      },
      { './payload.js': 11, uuid: 14 },
    ],
    11: [
      function (e, t, n) {
        !(function () {
          var t = e('JSON'),
            r = e('./base64'),
            a = void 0 !== n ? n : this;
          (a.isJson = function (e) {
            return (
              null != e &&
              (e.constructor === {}.constructor ||
                e.constructor === [].constructor)
            );
          }),
            (a.isNonEmptyJson = function (e) {
              if (!a.isJson(e)) return !1;
              for (var t in e) if (e.hasOwnProperty(t)) return !0;
              return !1;
            }),
            (a.payloadBuilder = function (e) {
              function n(e, t) {
                null != t && '' !== t && (o[e] = t);
              }
              var o = {};
              return {
                add: n,
                addDict: function (e) {
                  for (var t in e) e.hasOwnProperty(t) && n(t, e[t]);
                },
                addJson: function (o, i, c) {
                  if (a.isNonEmptyJson(c)) {
                    var s = t.stringify(c);
                    e
                      ? n(
                          o,
                          (u = s)
                            ? r
                                .base64encode(u)
                                .replace(/=/g, '')
                                .replace(/\+/g, '-')
                                .replace(/\//g, '_')
                            : u
                        )
                      : n(i, s);
                  }
                  var u;
                },
                build: function () {
                  return o;
                },
              };
            });
        })();
      },
      { './base64': 9, JSON: 1 },
    ],
    12: [
      function (e, t, n) {
        t.exports = Array;
      },
      {},
    ],
    13: [
      function (e, t, n) {
        (function (e) {
          var n;
          if (e.crypto && crypto.getRandomValues) {
            var r = new Uint8Array(16);
            n = function () {
              return crypto.getRandomValues(r), r;
            };
          }
          if (!n) {
            var a = new Array(16);
            n = function () {
              for (var e, t = 0; t < 16; t++)
                0 == (3 & t) && (e = 4294967296 * Math.random()),
                  (a[t] = (e >>> ((3 & t) << 3)) & 255);
              return a;
            };
          }
          t.exports = n;
        }.call(
          this,
          'undefined' != typeof global
            ? global
            : 'undefined' != typeof self
            ? self
            : 'undefined' != typeof window
            ? window
            : {}
        ));
      },
      {},
    ],
    14: [
      function (e, t, n) {
        for (
          var r = e('./rng'), a = e('./buffer'), o = [], i = {}, c = 0;
          c < 256;
          c++
        )
          (o[c] = (c + 256).toString(16).substr(1)), (i[o[c]] = c);
        function s(e, t) {
          var n = t || 0;
          return (
            o[e[n++]] +
            o[e[n++]] +
            o[e[n++]] +
            o[e[n++]] +
            '-' +
            o[e[n++]] +
            o[e[n++]] +
            '-' +
            o[e[n++]] +
            o[e[n++]] +
            '-' +
            o[e[n++]] +
            o[e[n++]] +
            '-' +
            o[e[n++]] +
            o[e[n++]] +
            o[e[n++]] +
            o[e[n++]] +
            o[e[n++]] +
            o[e[n++]]
          );
        }
        var u = r(),
          l = [1 | u[0], u[1], u[2], u[3], u[4], u[5]],
          f = 16383 & ((u[6] << 8) | u[7]),
          d = 0,
          p = 0;
        function g(e, t, n) {
          var o = (t && n) || 0;
          'string' == typeof e &&
            ((t = 'binary' == e ? new a(16) : null), (e = null));
          var i = (e = e || {}).random || (e.rng || r)();
          if (((i[6] = (15 & i[6]) | 64), (i[8] = (63 & i[8]) | 128), t))
            for (var c = 0; c < 16; c++) t[o + c] = i[c];
          return t || s(i);
        }
        var m = g;
        (m.v1 = function (e, t, n) {
          var r = (t && n) || 0,
            a = t || [],
            o = void 0 !== (e = e || {}).clockseq ? e.clockseq : f,
            i = void 0 !== e.msecs ? e.msecs : new Date().getTime(),
            c = void 0 !== e.nsecs ? e.nsecs : p + 1,
            u = i - d + (c - p) / 1e4;
          if (
            (u < 0 && void 0 === e.clockseq && (o = (o + 1) & 16383),
            (u < 0 || d < i) && void 0 === e.nsecs && (c = 0),
            1e4 <= c)
          )
            throw new Error("uuid.v1(): Can't create more than 10M uuids/sec");
          (d = i), (f = o);
          var g =
            (1e4 * (268435455 & (i += 122192928e5)) + (p = c)) % 4294967296;
          (a[r++] = (g >>> 24) & 255),
            (a[r++] = (g >>> 16) & 255),
            (a[r++] = (g >>> 8) & 255),
            (a[r++] = 255 & g);
          var m = ((i / 4294967296) * 1e4) & 268435455;
          (a[r++] = (m >>> 8) & 255),
            (a[r++] = 255 & m),
            (a[r++] = ((m >>> 24) & 15) | 16),
            (a[r++] = (m >>> 16) & 255),
            (a[r++] = (o >>> 8) | 128),
            (a[r++] = 255 & o);
          for (var h = e.node || l, v = 0; v < 6; v++) a[r + v] = h[v];
          return t || s(a);
        }),
          (m.v4 = g),
          (m.parse = function (e, t, n) {
            var r = (t && n) || 0,
              a = 0;
            for (
              t = t || [],
                e.toLowerCase().replace(/[0-9a-f]{2}/g, function (e) {
                  a < 16 && (t[r + a++] = i[e]);
                });
              a < 16;

            )
              t[r + a++] = 0;
            return t;
          }),
          (m.unparse = s),
          (m.BufferClass = a),
          (t.exports = m);
      },
      { './buffer': 12, './rng': 13 },
    ],
    15: [
      function (e, t, n) {
        arguments[4][13][0].apply(n, arguments);
      },
      { dup: 13 },
    ],
    16: [
      function (e, t, n) {
        for (var r = e('./rng'), a = [], o = {}, i = 0; i < 256; i++)
          (a[i] = (i + 256).toString(16).substr(1)), (o[a[i]] = i);
        function c(e, t) {
          var n = t || 0;
          return (
            a[e[n++]] +
            a[e[n++]] +
            a[e[n++]] +
            a[e[n++]] +
            '-' +
            a[e[n++]] +
            a[e[n++]] +
            '-' +
            a[e[n++]] +
            a[e[n++]] +
            '-' +
            a[e[n++]] +
            a[e[n++]] +
            '-' +
            a[e[n++]] +
            a[e[n++]] +
            a[e[n++]] +
            a[e[n++]] +
            a[e[n++]] +
            a[e[n++]]
          );
        }
        var s = r(),
          u = [1 | s[0], s[1], s[2], s[3], s[4], s[5]],
          l = 16383 & ((s[6] << 8) | s[7]),
          f = 0,
          d = 0;
        function p(e, t, n) {
          var a = (t && n) || 0;
          'string' == typeof e &&
            ((t = 'binary' == e ? new Array(16) : null), (e = null));
          var o = (e = e || {}).random || (e.rng || r)();
          if (((o[6] = (15 & o[6]) | 64), (o[8] = (63 & o[8]) | 128), t))
            for (var i = 0; i < 16; i++) t[a + i] = o[i];
          return t || c(o);
        }
        var g = p;
        (g.v1 = function (e, t, n) {
          var r = (t && n) || 0,
            a = t || [],
            o = void 0 !== (e = e || {}).clockseq ? e.clockseq : l,
            i = void 0 !== e.msecs ? e.msecs : new Date().getTime(),
            s = void 0 !== e.nsecs ? e.nsecs : d + 1,
            p = i - f + (s - d) / 1e4;
          if (
            (p < 0 && void 0 === e.clockseq && (o = (o + 1) & 16383),
            (p < 0 || f < i) && void 0 === e.nsecs && (s = 0),
            1e4 <= s)
          )
            throw new Error("uuid.v1(): Can't create more than 10M uuids/sec");
          (f = i), (l = o);
          var g =
            (1e4 * (268435455 & (i += 122192928e5)) + (d = s)) % 4294967296;
          (a[r++] = (g >>> 24) & 255),
            (a[r++] = (g >>> 16) & 255),
            (a[r++] = (g >>> 8) & 255),
            (a[r++] = 255 & g);
          var m = ((i / 4294967296) * 1e4) & 268435455;
          (a[r++] = (m >>> 8) & 255),
            (a[r++] = 255 & m),
            (a[r++] = ((m >>> 24) & 15) | 16),
            (a[r++] = (m >>> 16) & 255),
            (a[r++] = (o >>> 8) | 128),
            (a[r++] = 255 & o);
          for (var h = e.node || u, v = 0; v < 6; v++) a[r + v] = h[v];
          return t || c(a);
        }),
          (g.v4 = p),
          (g.parse = function (e, t, n) {
            var r = (t && n) || 0,
              a = 0;
            for (
              t = t || [],
                e.toLowerCase().replace(/[0-9a-f]{2}/g, function (e) {
                  a < 16 && (t[r + a++] = o[e]);
                });
              a < 16;

            )
              t[r + a++] = 0;
            return t;
          }),
          (g.unparse = c),
          (t.exports = g);
      },
      { './rng': 15 },
    ],
    17: [
      function (e, t, n) {
        var r = e('./lib_managed/lodash'),
          a = e('./lib/helpers');
        (void 0 !== n ? n : this).getFormTrackingManager = function (e, t, n) {
          var o = ['textarea', 'input', 'select'],
            i = t + 'form',
            c = function (e) {
              return !0;
            },
            s = function (e) {
              return !0;
            };
          function u(e) {
            return e[
              r.find(['name', 'id', 'type', 'nodeName'], function (t) {
                return e[t] && 'string' == typeof e[t];
              })
            ];
          }
          return {
            configureFormTracking: function (e, t) {
              e &&
                ((c = a.getFilter(e.forms, !0)),
                (s = a.getFilter(e.fields, !1)));
            },
            addFormListeners: function (t) {
              r.forEach(document.getElementsByTagName('form'), function (l) {
                var f;
                c(l) &&
                  !l[i] &&
                  (r.forEach(o, function (o) {
                    r.forEach(l.getElementsByTagName(o), function (r) {
                      var o;
                      s(r) &&
                        !r[i] &&
                        (a.addEventListener(
                          r,
                          'change',
                          ((o = t),
                          function (t) {
                            var r = t.target,
                              i =
                                r.nodeName &&
                                'INPUT' === r.nodeName.toUpperCase()
                                  ? r.type
                                  : null,
                              c =
                                'checkbox' !== r.type || r.checked
                                  ? r.value
                                  : null;
                            e.trackFormChange(
                              (function (e) {
                                for (
                                  ;
                                  e &&
                                  e.nodeName &&
                                  'HTML' !== e.nodeName.toUpperCase() &&
                                  'FORM' !== e.nodeName.toUpperCase();

                                )
                                  e = e.parentNode;
                                if (
                                  e &&
                                  e.nodeName &&
                                  'FORM' === e.nodeName.toUpperCase()
                                )
                                  return u(e);
                              })(r),
                              u(r),
                              r.nodeName,
                              i,
                              a.getCssClasses(r),
                              c,
                              n(o)
                            );
                          }),
                          !1
                        ),
                        (r[i] = !0));
                    });
                  }),
                  a.addEventListener(
                    l,
                    'submit',
                    ((f = t),
                    function (t) {
                      var c,
                        s,
                        l = t.target,
                        d =
                          ((c = l),
                          (s = []),
                          r.forEach(o, function (e) {
                            var t = r.filter(
                              c.getElementsByTagName(e),
                              function (e) {
                                return e.hasOwnProperty(i);
                              }
                            );
                            r.forEach(t, function (e) {
                              if ('submit' !== e.type) {
                                var t = {
                                  name: u(e),
                                  value: e.value,
                                  nodeName: e.nodeName,
                                };
                                e.type &&
                                  'INPUT' === e.nodeName.toUpperCase() &&
                                  (t.type = e.type),
                                  ('checkbox' !== e.type &&
                                    'radio' !== e.type) ||
                                    e.checked ||
                                    (t.value = null),
                                  s.push(t);
                              }
                            });
                          }),
                          s);
                      e.trackFormSubmission(u(l), a.getCssClasses(l), d, n(f));
                    })
                  ),
                  (l[i] = !0));
              });
            },
          };
        };
      },
      { './lib/helpers': 21, './lib_managed/lodash': 23 },
    ],
    18: [
      function (e, t, n) {
        !(function () {
          var t = e('./lib_managed/lodash'),
            r = e('./lib/helpers'),
            a = e('uuid');
          (void 0 !== n ? n : this).InQueueManager = function (e, n, o, i, c) {
            var s = a.v4(),
              u = {};
            function l(e) {
              var n = [];
              if (e && 0 !== e.length)
                for (var a = 0; a < e.length; a++)
                  u.hasOwnProperty(e[a])
                    ? n.push(u[e[a]])
                    : r.warn(
                        'Warning: Tracker namespace "' +
                          e[a] +
                          '" not configured'
                      );
              else n = t.map(u);
              return (
                0 === n.length && r.warn('Warning: No tracker configured'), n
              );
            }
            function f(t, r, a) {
              (a = a || {}),
                (u[t] = new e(c, t, n, s, o, a)),
                u[t].setCollectorUrl(r);
            }
            function d() {
              var e, n, a, o, i, c, s, d, p, g, m, h, v;
              for (e = 0; e < arguments.length; e += 1)
                if (
                  ((o = arguments[e]),
                  (i = Array.prototype.shift.call(o)),
                  t.isFunction(i))
                )
                  i.apply(u, o);
                else if (
                  ((v = void 0),
                  (s = (c = [
                    (v = i.split(':'))[0],
                    1 < v.length ? v[1].split(';') : [],
                  ])[1]),
                  'newTracker' !== (a = c[0]))
                )
                  if (
                    ('setCollectorCf' !== a && 'setCollectorUrl' !== a) ||
                    (s && 0 !== s.length)
                  )
                    for (d = l(s), n = 0; n < d.length; n++)
                      d[n][a].apply(d[n], o);
                  else
                    (p = a),
                      (g = o[0]),
                      (m = o[1]),
                      r.warn(
                        p +
                          ' is deprecated. Set the collector when a new tracker instance using newTracker.'
                      ),
                      f((h = t.isUndefined(m) ? 'sp' : m)),
                      u[h][p](g);
                else f(o[0], o[1], o[2]);
            }
            for (var p = 0; p < i.length; p++) d(i[p]);
            return { push: d };
          };
        })();
      },
      { './lib/helpers': 21, './lib_managed/lodash': 23, uuid: 16 },
    ],
    19: [
      function (e, t, n) {
        var r,
          a,
          o = e('./snowplow'),
          i = window;
        i.GlobalSnowplowNamespace && 0 < i.GlobalSnowplowNamespace.length
          ? ((r = i.GlobalSnowplowNamespace.shift()),
            ((a = i[r]).q = new o.Snowplow(a.q, r)))
          : ((i._snaq = i._snaq || []),
            (i._snaq = new o.Snowplow(i._snaq, '_snaq')));
      },
      { './snowplow': 26 },
    ],
    20: [
      function (e, t, n) {
        !(function () {
          var t = e('../lib_managed/lodash'),
            r = e('murmurhash').v3,
            a = e('jstimezonedetect').jstz.determine(),
            o = e('browser-cookie-lite'),
            i = void 0 !== n ? n : this,
            c = window,
            s = navigator,
            u = screen,
            l = document;
          (i.hasSessionStorage = function () {
            try {
              return !!c.sessionStorage;
            } catch (e) {
              return !0;
            }
          }),
            (i.hasLocalStorage = function () {
              try {
                return !!c.localStorage;
              } catch (e) {
                return !0;
              }
            }),
            (i.localStorageAccessible = function () {
              var e = 'modernizr';
              if (!i.hasLocalStorage()) return !1;
              try {
                return (
                  c.localStorage.setItem(e, e), c.localStorage.removeItem(e), !0
                );
              } catch (e) {
                return !1;
              }
            }),
            (i.hasCookies = function (e) {
              var n = e || 'testcookie';
              return t.isUndefined(s.cookieEnabled)
                ? (o.cookie(n, '1'), '1' === o.cookie(n) ? '1' : '0')
                : s.cookieEnabled
                ? '1'
                : '0';
            }),
            (i.detectSignature = function (e) {
              var t = [
                  s.userAgent,
                  [u.height, u.width, u.colorDepth].join('x'),
                  new Date().getTimezoneOffset(),
                  i.hasSessionStorage(),
                  i.hasLocalStorage(),
                ],
                n = [];
              if (s.plugins)
                for (var a = 0; a < s.plugins.length; a++) {
                  for (var o = [], c = 0; c < s.plugins[a].length; c++)
                    o.push([s.plugins[a][c].type, s.plugins[a][c].suffixes]);
                  n.push([
                    s.plugins[a].name + '::' + s.plugins[a].description,
                    o.join('~'),
                  ]);
                }
              return r(t.join('###') + '###' + n.sort().join(';'), e);
            }),
            (i.detectTimezone = function () {
              return void 0 === a ? '' : a.name();
            }),
            (i.detectViewport = function () {
              var e = c,
                t = 'inner';
              return (
                'innerWidth' in c ||
                  ((t = 'client'), (e = l.documentElement || l.body)),
                e[t + 'Width'] + 'x' + e[t + 'Height']
              );
            }),
            (i.detectDocumentSize = function () {
              var e = l.documentElement,
                t = l.body,
                n = t ? Math.max(t.offsetHeight, t.scrollHeight) : 0,
                r = Math.max(e.clientWidth, e.offsetWidth, e.scrollWidth),
                a = Math.max(e.clientHeight, e.offsetHeight, e.scrollHeight, n);
              return isNaN(r) || isNaN(a) ? '' : r + 'x' + a;
            }),
            (i.detectBrowserFeatures = function (e, n) {
              var r,
                a,
                o = {
                  pdf: 'application/pdf',
                  qt: 'video/quicktime',
                  realp: 'audio/x-pn-realaudio-plugin',
                  wma: 'application/x-mplayer2',
                  dir: 'application/x-director',
                  fla: 'application/x-shockwave-flash',
                  java: 'application/x-java-vm',
                  gears: 'application/x-googlegears',
                  ag: 'application/x-silverlight',
                },
                l = {};
              if (s.mimeTypes && s.mimeTypes.length)
                for (r in o)
                  Object.prototype.hasOwnProperty.call(o, r) &&
                    ((a = s.mimeTypes[o[r]]),
                    (l[r] = a && a.enabledPlugin ? '1' : '0'));
              return (
                'unknown' != typeof s.javaEnabled &&
                  !t.isUndefined(s.javaEnabled) &&
                  s.javaEnabled() &&
                  (l.java = '1'),
                t.isFunction(c.GearsFactory) && (l.gears = '1'),
                (l.res = u.width + 'x' + u.height),
                (l.cd = u.colorDepth),
                e && (l.cookie = i.hasCookies(n)),
                l
              );
            });
        })();
      },
      {
        '../lib_managed/lodash': 23,
        'browser-cookie-lite': 2,
        jstimezonedetect: 3,
        murmurhash: 4,
      },
    ],
    21: [
      function (e, t, n) {
        !(function () {
          var t = e('../lib_managed/lodash'),
            r = void 0 !== n ? n : this;
          (r.fixupTitle = function (e) {
            if (!t.isString(e)) {
              e = e.text || '';
              var n = document.getElementsByTagName('title');
              n && !t.isUndefined(n[0]) && (e = n[0].text);
            }
            return e;
          }),
            (r.getHostName = function (e) {
              var t = new RegExp(
                '^(?:(?:https?|ftp):)/*(?:[^@]+@)?([^:/#]+)'
              ).exec(e);
              return t ? t[1] : e;
            }),
            (r.fixupDomain = function (e) {
              var t = e.length;
              return (
                '.' === e.charAt(--t) && (e = e.slice(0, t)),
                '*.' === e.slice(0, 2) && (e = e.slice(1)),
                e
              );
            }),
            (r.getReferrer = function (e) {
              var t = '',
                n =
                  r.fromQuerystring('referrer', window.location.href) ||
                  r.fromQuerystring('referer', window.location.href);
              if (n) return n;
              if (e) return e;
              try {
                t = window.top.document.referrer;
              } catch (e) {
                if (window.parent)
                  try {
                    t = window.parent.document.referrer;
                  } catch (e) {
                    t = '';
                  }
              }
              return '' === t && (t = document.referrer), t;
            }),
            (r.addEventListener = function (e, t, n, r) {
              return e.addEventListener
                ? (e.addEventListener(t, n, r), !0)
                : e.attachEvent
                ? e.attachEvent('on' + t, n)
                : void (e['on' + t] = n);
            }),
            (r.fromQuerystring = function (e, t) {
              var n = new RegExp('^[^#]*[?&]' + e + '=([^&#]*)').exec(t);
              return n ? decodeURIComponent(n[1].replace(/\+/g, ' ')) : null;
            }),
            (r.warn = function (e) {
              'undefined' != typeof console && console.warn('Snowplow: ' + e);
            }),
            (r.getCssClasses = function (e) {
              return e.className.match(/\S+/g);
            }),
            (r.getFilter = function (e, n) {
              if (t.isArray(e) || !t.isObject(e))
                return function (e) {
                  return !0;
                };
              if (e.hasOwnProperty('filter')) return e.filter;
              var a = e.hasOwnProperty('whitelist'),
                o = e.whitelist || e.blacklist;
              t.isArray(o) || (o = [o]);
              for (var i = {}, c = 0; c < o.length; c++) i[o[c]] = !0;
              return n
                ? function (e) {
                    return (
                      (function (e, t) {
                        var n,
                          a = r.getCssClasses(e);
                        for (n = 0; n < a.length; n++) if (t[a[n]]) return !0;
                        return !1;
                      })(e, i) === a
                    );
                  }
                : function (e) {
                    return e.name in i === a;
                  };
            }),
            (r.decorateQuerystring = function (e, t, n) {
              var r = t + '=' + n,
                a = e.split('#'),
                o = a[0].split('?'),
                i = o.shift(),
                c = o.join('?');
              if (c) {
                for (var s = !0, u = c.split('&'), l = 0; l < u.length; l++)
                  if (u[l].substr(0, t.length + 1) === t + '=') {
                    (s = !1), (u[l] = r), (c = u.join('&'));
                    break;
                  }
                s && (c = r + '&' + c);
              } else c = r;
              return (a[0] = i + '?' + c), a.join('#');
            }),
            (r.attemptGetLocalStorage = function (e) {
              try {
                return localStorage.getItem(e);
              } catch (e) {}
            }),
            (r.attemptWriteLocalStorage = function (e, t) {
              try {
                return localStorage.setItem(e, t), !0;
              } catch (e) {
                return !1;
              }
            });
        })();
      },
      { '../lib_managed/lodash': 23 },
    ],
    22: [
      function (e, t, n) {
        !(function () {
          var t = e('./helpers');
          (void 0 !== n ? n : this).fixupUrl = function (e, n, r) {
            var a, o;
            return (
              'translate.googleusercontent.com' === e
                ? ('' === r && (r = n),
                  (a = n),
                  (o = new RegExp(
                    '^(?:https?|ftp)(?::/*(?:[^?]+))([?][^#]+)'
                  ).exec(a)),
                  (n = t.fromQuerystring('u', o[1])),
                  (e = t.getHostName(n)))
                : ('cc.bingj.com' !== e &&
                    'webcache.googleusercontent.com' !== e &&
                    !(function (e) {
                      var t, n, r;
                      if (
                        ((r = e),
                        new RegExp(
                          '^(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\\.(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\\.(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\\.(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)$'
                        ).test(r))
                      )
                        try {
                          return (
                            (t =
                              document.body.children[0].children[0].children[0]
                                .children[0].children[0].children[0].innerHTML),
                            (n = 'You have reached the cached page for'),
                            t.slice(0, n.length) === n
                          );
                        } catch (e) {
                          return;
                        }
                    })(e)) ||
                  ((n = document.links[0].href), (e = t.getHostName(n))),
              [e, n, r]
            );
          };
        })();
      },
      { './helpers': 21 },
    ],
    23: [
      function (e, t, n) {
        (function (e) {
          (function () {
            var r = [],
              a = {},
              o = 40,
              i = /\w*$/,
              c = /^\s*function[ \n\r\t]+\w/,
              s = /\bthis\b/,
              u = [
                'constructor',
                'hasOwnProperty',
                'isPrototypeOf',
                'propertyIsEnumerable',
                'toLocaleString',
                'toString',
                'valueOf',
              ],
              l = '[object Arguments]',
              f = '[object Array]',
              d = '[object Boolean]',
              p = '[object Date]',
              g = '[object Error]',
              m = '[object Function]',
              h = '[object Number]',
              v = '[object Object]',
              y = '[object RegExp]',
              w = '[object String]',
              b = { '[object Function]': !1 };
            b[l] = b[f] = b[d] = b[p] = b[h] = b[v] = b[y] = b[w] = !0;
            var A = {
                configurable: !1,
                enumerable: !1,
                value: null,
                writable: !1,
              },
              x = {
                args: '',
                array: null,
                bottom: '',
                firstArg: '',
                init: '',
                keys: null,
                loop: '',
                shadowedProps: null,
                support: null,
                top: '',
                useHas: !1,
              },
              T = {
                boolean: !1,
                function: !0,
                object: !0,
                number: !1,
                string: !1,
                undefined: !1,
              },
              C = (T[typeof window] && window) || this,
              S = T[typeof n] && n && !n.nodeType && n,
              _ = T[typeof t] && t && !t.nodeType && t,
              P = _ && _.exports === S && S,
              E = T[typeof e] && e;
            function O() {
              return r.pop() || [];
            }
            function j(e) {
              return (
                'function' != typeof e.toString && 'string' == typeof (e + '')
              );
            }
            function D(e) {
              (e.length = 0), r.length < o && r.push(e);
            }
            function L(e, t, n) {
              (t = t || 0), void 0 === n && (n = e ? e.length : 0);
              for (
                var r = -1, a = n - t || 0, o = Array(a < 0 ? 0 : a);
                ++r < a;

              )
                o[r] = e[t + r];
              return o;
            }
            !E || (E.global !== E && E.window !== E) || (C = E);
            var N = [],
              I = Error.prototype,
              U = Object.prototype,
              F = String.prototype,
              M = U.toString,
              B = RegExp(
                '^' +
                  String(M)
                    .replace(/[.*+?^${}()|[\]\\]/g, '\\$&')
                    .replace(/toString| for [^\]]+/g, '.*?') +
                  '$'
              ),
              q = Function.prototype.toString,
              R = U.hasOwnProperty,
              H = N.push,
              J = U.propertyIsEnumerable,
              z = N.unshift,
              V = (function () {
                try {
                  var e = {},
                    t = ie((t = Object.defineProperty)) && t,
                    n = t(e, e, e) && t;
                } catch (e) {}
                return n;
              })(),
              Q = ie((Q = Object.create)) && Q,
              G = ie((G = Array.isArray)) && G,
              W = ie((W = Object.keys)) && W,
              Y = {};
            (Y[f] = Array),
              (Y[d] = Boolean),
              (Y[p] = Date),
              (Y[m] = Function),
              (Y[v] = Object),
              (Y[h] = Number),
              (Y[y] = RegExp),
              (Y[w] = String);
            var K = {};
            function X() {}
            (K[f] = K[p] = K[h] = {
              constructor: !0,
              toLocaleString: !0,
              toString: !0,
              valueOf: !0,
            }),
              (K[d] = K[w] = { constructor: !0, toString: !0, valueOf: !0 }),
              (K[g] = K[m] = K[y] = { constructor: !0, toString: !0 }),
              (K[v] = { constructor: !0 }),
              (function () {
                for (var e = u.length; e--; ) {
                  var t = u[e];
                  for (var n in K)
                    R.call(K, n) && !R.call(K[n], t) && (K[n][t] = !1);
                }
              })();
            var Z = (X.support = {});
            !(function () {
              function e() {
                this.x = 1;
              }
              var t = { 0: 1, length: 1 },
                n = [];
              for (var r in ((e.prototype = { valueOf: 1, y: 1 }), new e()))
                n.push(r);
              for (r in arguments);
              (Z.argsClass = M.call(arguments) == l),
                (Z.argsObject =
                  arguments.constructor == Object &&
                  !(arguments instanceof Array)),
                (Z.enumErrorProps = J.call(I, 'message') || J.call(I, 'name')),
                (Z.enumPrototypes = J.call(e, 'prototype')),
                (Z.funcDecomp =
                  !ie(C.WinRTError) &&
                  s.test(function () {
                    return this;
                  })),
                (Z.funcNames = 'string' == typeof Function.name),
                (Z.nonEnumArgs = 0 != r),
                (Z.nonEnumShadows = !/valueOf/.test(n)),
                (Z.spliceObjects = (N.splice.call(t, 0, 1), !t[0])),
                (Z.unindexedChars = 'x'[0] + Object('x')[0] != 'xx');
              try {
                Z.nodeClass = !(
                  M.call(document) == v && !({ toString: 0 } + '')
                );
              } catch (e) {
                Z.nodeClass = !0;
              }
            })(1);
            var $ = function (e) {
              var t =
                'var index, iterable = ' +
                e.firstArg +
                ', result = ' +
                e.init +
                ';\nif (!iterable) return result;\n' +
                e.top +
                ';';
              e.array
                ? ((t +=
                    '\nvar length = iterable.length; index = -1;\nif (' +
                    e.array +
                    ') {  '),
                  Z.unindexedChars &&
                    (t +=
                      "\n  if (isString(iterable)) {\n    iterable = iterable.split('')\n  }  "),
                  (t +=
                    '\n  while (++index < length) {\n    ' +
                    e.loop +
                    ';\n  }\n}\nelse {  '))
                : Z.nonEnumArgs &&
                  (t +=
                    "\n  var length = iterable.length; index = -1;\n  if (length && isArguments(iterable)) {\n    while (++index < length) {\n      index += '';\n      " +
                    e.loop +
                    ';\n    }\n  } else {  '),
                Z.enumPrototypes &&
                  (t +=
                    "\n  var skipProto = typeof iterable == 'function';\n  "),
                Z.enumErrorProps &&
                  (t +=
                    '\n  var skipErrorProps = iterable === errorProto || iterable instanceof Error;\n  ');
              var n = [];
              if (
                (Z.enumPrototypes &&
                  n.push('!(skipProto && index == "prototype")'),
                Z.enumErrorProps &&
                  n.push(
                    '!(skipErrorProps && (index == "message" || index == "name"))'
                  ),
                e.useHas && e.keys)
              )
                (t +=
                  '\n  var ownIndex = -1,\n      ownProps = objectTypes[typeof iterable] && keys(iterable),\n      length = ownProps ? ownProps.length : 0;\n\n  while (++ownIndex < length) {\n    index = ownProps[ownIndex];\n'),
                  n.length && (t += '    if (' + n.join(' && ') + ') {\n  '),
                  (t += e.loop + ';    '),
                  n.length && (t += '\n    }'),
                  (t += '\n  }  ');
              else if (
                ((t += '\n  for (index in iterable) {\n'),
                e.useHas && n.push('hasOwnProperty.call(iterable, index)'),
                n.length && (t += '    if (' + n.join(' && ') + ') {\n  '),
                (t += e.loop + ';    '),
                n.length && (t += '\n    }'),
                (t += '\n  }    '),
                Z.nonEnumShadows)
              ) {
                for (
                  t +=
                    '\n\n  if (iterable !== objectProto) {\n    var ctor = iterable.constructor,\n        isProto = iterable === (ctor && ctor.prototype),\n        className = iterable === stringProto ? stringClass : iterable === errorProto ? errorClass : toString.call(iterable),\n        nonEnum = nonEnumProps[className];\n      ',
                    k = 0;
                  k < 7;
                  k++
                )
                  (t +=
                    "\n    index = '" +
                    e.shadowedProps[k] +
                    "';\n    if ((!(isProto && nonEnum[index]) && hasOwnProperty.call(iterable, index))"),
                    e.useHas ||
                      (t +=
                        ' || (!nonEnum[index] && iterable[index] !== objectProto[index])'),
                    (t += ') {\n      ' + e.loop + ';\n    }      ');
                t += '\n  }    ';
              }
              return (
                (e.array || Z.nonEnumArgs) && (t += '\n}'),
                t + (e.bottom + ';\nreturn result')
              );
            };
            function ee(e, t) {
              return ke(e) ? Q(e) : {};
            }
            function te() {}
            function ne(e, t, n) {
              if ('function' != typeof e) return _e;
              if (void 0 === t || !('prototype' in e)) return e;
              var r = e.__bindData__;
              if (
                void 0 === r &&
                (Z.funcNames && (r = !e.name), !(r = r || !Z.funcDecomp))
              ) {
                var a = q.call(e);
                Z.funcNames || (r = !c.test(a)),
                  r || ((r = s.test(a)), ce(e, r));
              }
              if (!1 === r || (!0 !== r && 1 & r[1])) return e;
              switch (n) {
                case 1:
                  return function (n) {
                    return e.call(t, n);
                  };
                case 2:
                  return function (n, r) {
                    return e.call(t, n, r);
                  };
                case 3:
                  return function (n, r, a) {
                    return e.call(t, n, r, a);
                  };
                case 4:
                  return function (n, r, a, o) {
                    return e.call(t, n, r, a, o);
                  };
              }
              return Se(e, t);
            }
            function re(e, t, n, r, a, o) {
              if (n) {
                var i = n(e, t);
                if (void 0 !== i) return !!i;
              }
              if (e === t) return 0 !== e || 1 / e == 1 / t;
              var c = typeof t;
              if (!(e != e || (e && T[typeof e]) || (t && T[c]))) return !1;
              if (null == e || null == t) return e === t;
              var s = M.call(e),
                u = M.call(t);
              if ((s == l && (s = v), u == l && (u = v), s != u)) return !1;
              switch (s) {
                case d:
                case p:
                  return +e == +t;
                case h:
                  return e != +e ? t != +t : 0 == e ? 1 / e == 1 / t : e == +t;
                case y:
                case w:
                  return e == String(t);
              }
              var g = s == f;
              if (!g) {
                var m = R.call(e, '__wrapped__'),
                  k = R.call(t, '__wrapped__');
                if (m || k)
                  return re(
                    m ? e.__wrapped__ : e,
                    k ? t.__wrapped__ : t,
                    n,
                    r,
                    a,
                    o
                  );
                if (s != v || (!Z.nodeClass && (j(e) || j(t)))) return !1;
                var b = !Z.argsObject && se(e) ? Object : e.constructor,
                  A = !Z.argsObject && se(t) ? Object : t.constructor;
                if (
                  b != A &&
                  !(we(b) && b instanceof b && we(A) && A instanceof A) &&
                  'constructor' in e &&
                  'constructor' in t
                )
                  return !1;
              }
              var x = !a;
              (a = a || O()), (o = o || O());
              for (var C = a.length; C--; ) if (a[C] == e) return o[C] == t;
              var S = 0;
              if (((i = !0), a.push(e), o.push(t), g)) {
                if (((C = e.length), (S = t.length), (i = S == C) || r))
                  for (; S--; ) {
                    var _ = C,
                      P = t[S];
                    if (r) for (; _-- && !(i = re(e[_], P, n, r, a, o)); );
                    else if (!(i = re(e[S], P, n, r, a, o))) break;
                  }
              } else
                ve(t, function (t, c, s) {
                  if (R.call(s, c))
                    return S++, (i = R.call(e, c) && re(e[c], t, n, r, a, o));
                }),
                  i &&
                    !r &&
                    ve(e, function (e, t, n) {
                      if (R.call(n, t)) return (i = -1 < --S);
                    });
              return a.pop(), o.pop(), x && (D(a), D(o)), i;
            }
            function ae(e, t, n, r, a, o) {
              var i = 1 & t,
                c = 4 & t,
                s = 16 & t,
                u = 32 & t;
              if (!(2 & t || we(e))) throw new TypeError();
              s && !n.length && ((t &= -17), (s = n = !1)),
                u && !r.length && ((t &= -33), (u = r = !1));
              var l = e && e.__bindData__;
              return l && !0 !== l
                ? ((l = L(l))[2] && (l[2] = L(l[2])),
                  l[3] && (l[3] = L(l[3])),
                  !i || 1 & l[1] || (l[4] = a),
                  !i && 1 & l[1] && (t |= 8),
                  !c || 4 & l[1] || (l[5] = o),
                  s && H.apply(l[2] || (l[2] = []), n),
                  u && z.apply(l[3] || (l[3] = []), r),
                  (l[1] |= t),
                  ae.apply(null, l))
                : (1 == t || 17 === t
                    ? function (e) {
                        var t = e[0],
                          n = e[2],
                          r = e[4];
                        function a() {
                          if (n) {
                            var e = L(n);
                            H.apply(e, arguments);
                          }
                          if (this instanceof a) {
                            var o = ee(t.prototype),
                              i = t.apply(o, e || arguments);
                            return ke(i) ? i : o;
                          }
                          return t.apply(r, e || arguments);
                        }
                        return ce(a, e), a;
                      }
                    : function e(t) {
                        var n = t[0],
                          r = t[1],
                          a = t[2],
                          o = t[3],
                          i = t[4],
                          c = t[5],
                          s = 1 & r,
                          u = 2 & r,
                          l = 4 & r,
                          f = 8 & r,
                          d = n;
                        function p() {
                          var t = s ? i : this;
                          if (a) {
                            var g = L(a);
                            H.apply(g, arguments);
                          }
                          if (
                            (o || l) &&
                            ((g = g || L(arguments)),
                            o && H.apply(g, o),
                            l && g.length < c)
                          )
                            return (
                              (r |= 16), e([n, f ? r : -4 & r, g, null, i, c])
                            );
                          if (
                            ((g = g || arguments),
                            u && (n = t[d]),
                            this instanceof p)
                          ) {
                            t = ee(n.prototype);
                            var m = n.apply(t, g);
                            return ke(m) ? m : t;
                          }
                          return n.apply(t, g);
                        }
                        return ce(p, t), p;
                      })([e, t, n, r, a, o]);
            }
            function oe() {
              (x.shadowedProps = u),
                (x.array = x.bottom = x.loop = x.top = ''),
                (x.init = 'iterable'),
                (x.useHas = !0);
              for (var e, t = 0; (e = arguments[t]); t++)
                for (var n in e) x[n] = e[n];
              var r = x.args;
              return (
                (x.firstArg = /^[^,]+/.exec(r)[0]),
                Function(
                  'baseCreateCallback, errorClass, errorProto, hasOwnProperty, indicatorObject, isArguments, isArray, isString, keys, objectProto, objectTypes, nonEnumProps, stringClass, stringProto, toString',
                  'return function(' + r + ') {\n' + $(x) + '\n}'
                )(ne, g, I, R, a, se, ue, be, x.keys, U, T, K, w, F, M)
              );
            }
            function ie(e) {
              return 'function' == typeof e && B.test(e);
            }
            Q ||
              (ee = function (e) {
                if (ke(e)) {
                  te.prototype = e;
                  var t = new te();
                  te.prototype = null;
                }
                return t || C.Object();
              });
            var ce = V
              ? function (e, t) {
                  (A.value = t), V(e, '__bindData__', A);
                }
              : Pe;
            function se(e) {
              return (
                (e &&
                  'object' == typeof e &&
                  'number' == typeof e.length &&
                  M.call(e) == l) ||
                !1
              );
            }
            Z.argsClass ||
              (se = function (e) {
                return (
                  (e &&
                    'object' == typeof e &&
                    'number' == typeof e.length &&
                    R.call(e, 'callee') &&
                    !J.call(e, 'callee')) ||
                  !1
                );
              });
            var ue =
                G ||
                function (e) {
                  return (
                    (e &&
                      'object' == typeof e &&
                      'number' == typeof e.length &&
                      M.call(e) == f) ||
                    !1
                  );
                },
              le = oe({
                args: 'object',
                init: '[]',
                top: 'if (!(objectTypes[typeof object])) return result',
                loop: 'result.push(index)',
              }),
              fe = W
                ? function (e) {
                    return ke(e)
                      ? ((Z.enumPrototypes && 'function' == typeof e) ||
                          (Z.nonEnumArgs && e.length && se(e))
                          ? le
                          : W)(e)
                      : [];
                  }
                : le,
              de = {
                args: 'collection, callback, thisArg',
                top:
                  "callback = callback && typeof thisArg == 'undefined' ? callback : baseCreateCallback(callback, thisArg, 3)",
                array: "typeof length == 'number'",
                keys: fe,
                loop:
                  'if (callback(iterable[index], index, collection) === false) return result',
              },
              pe = {
                args: 'object, source, guard',
                top:
                  "var args = arguments,\n    argsIndex = 0,\n    argsLength = typeof guard == 'number' ? 2 : args.length;\nwhile (++argsIndex < argsLength) {\n  iterable = args[argsIndex];\n  if (iterable && objectTypes[typeof iterable]) {",
                keys: fe,
                loop:
                  "if (typeof result[index] == 'undefined') result[index] = iterable[index]",
                bottom: '  }\n}',
              },
              ge = {
                top:
                  'if (!objectTypes[typeof iterable]) return result;\n' +
                  de.top,
                array: !1,
              },
              me = oe(de),
              he = oe(pe, {
                top: pe.top.replace(
                  ';',
                  ";\nif (argsLength > 3 && typeof args[argsLength - 2] == 'function') {\n  var callback = baseCreateCallback(args[--argsLength - 1], args[argsLength--], 2);\n} else if (argsLength > 2 && typeof args[argsLength - 1] == 'function') {\n  callback = args[--argsLength];\n}"
                ),
                loop:
                  'result[index] = callback ? callback(result[index], iterable[index]) : iterable[index]',
              }),
              ve = oe(de, ge, { useHas: !1 }),
              ye = oe(de, ge);
            function we(e) {
              return 'function' == typeof e;
            }
            function ke(e) {
              return !(!e || !T[typeof e]);
            }
            function be(e) {
              return (
                'string' == typeof e ||
                (e && 'object' == typeof e && M.call(e) == w) ||
                !1
              );
            }
            function Ae(e, t, n) {
              var r = [];
              if (((t = X.createCallback(t, n, 3)), ue(e)))
                for (var a = -1, o = e.length; ++a < o; ) {
                  var i = e[a];
                  t(i, a, e) && r.push(i);
                }
              else
                me(e, function (e, n, a) {
                  t(e, n, a) && r.push(e);
                });
              return r;
            }
            function xe(e, t, n) {
              var r;
              if (((t = X.createCallback(t, n, 3)), !ue(e)))
                return (
                  me(e, function (e, n, a) {
                    if (t(e, n, a)) return (r = e), !1;
                  }),
                  r
                );
              for (var a = -1, o = e.length; ++a < o; ) {
                var i = e[a];
                if (t(i, a, e)) return i;
              }
            }
            function Te(e, t, n) {
              if (t && void 0 === n && ue(e))
                for (
                  var r = -1, a = e.length;
                  ++r < a && !1 !== t(e[r], r, e);

                );
              else me(e, t, n);
              return e;
            }
            function Ce(e, t, n) {
              var r = -1,
                a = e ? e.length : 0,
                o = Array('number' == typeof a ? a : 0);
              if (((t = X.createCallback(t, n, 3)), ue(e)))
                for (; ++r < a; ) o[r] = t(e[r], r, e);
              else
                me(e, function (e, n, a) {
                  o[++r] = t(e, n, a);
                });
              return o;
            }
            function Se(e, t) {
              return 2 < arguments.length
                ? ae(e, 17, L(arguments, 2), null, t)
                : ae(e, 1, null, null, t);
            }
            function _e(e) {
              return e;
            }
            function Pe() {}
            function Ee(e) {
              return function (t) {
                return t[e];
              };
            }
            we(/x/) &&
              (we = function (e) {
                return 'function' == typeof e && M.call(e) == m;
              }),
              (X.assign = he),
              (X.bind = Se),
              (X.compact = function (e) {
                for (var t = -1, n = e ? e.length : 0, r = []; ++t < n; ) {
                  var a = e[t];
                  a && r.push(a);
                }
                return r;
              }),
              (X.createCallback = function (e, t, n) {
                var r = typeof e;
                if (null == e || 'function' == r) return ne(e, t, n);
                if ('object' != r) return Ee(e);
                var a = fe(e),
                  o = a[0],
                  i = e[o];
                return 1 != a.length || i != i || ke(i)
                  ? function (t) {
                      for (
                        var n = a.length, r = !1;
                        n-- && (r = re(t[a[n]], e[a[n]], null, !0));

                      );
                      return r;
                    }
                  : function (e) {
                      var t = e[o];
                      return i === t && (0 !== i || 1 / i == 1 / t);
                    };
              }),
              (X.filter = Ae),
              (X.forEach = Te),
              (X.forIn = ve),
              (X.forOwn = ye),
              (X.keys = fe),
              (X.map = Ce),
              (X.mapValues = function (e, t, n) {
                var r = {};
                return (
                  (t = X.createCallback(t, n, 3)),
                  ye(e, function (e, n, a) {
                    r[n] = t(e, n, a);
                  }),
                  r
                );
              }),
              (X.property = Ee),
              (X.collect = Ce),
              (X.each = Te),
              (X.extend = he),
              (X.select = Ae),
              (X.clone = function (e, t, n, r) {
                return (
                  'boolean' != typeof t &&
                    null != t &&
                    ((r = n), (n = t), (t = !1)),
                  (function e(t, n, r, a, o) {
                    if (r) {
                      var c = r(t);
                      if (void 0 !== c) return c;
                    }
                    if (!ke(t)) return t;
                    var s = M.call(t);
                    if (!b[s] || (!Z.nodeClass && j(t))) return t;
                    var u = Y[s];
                    switch (s) {
                      case d:
                      case p:
                        return new u(+t);
                      case h:
                      case w:
                        return new u(t);
                      case y:
                        return (
                          ((c = u(t.source, i.exec(t))).lastIndex =
                            t.lastIndex),
                          c
                        );
                    }
                    var l = ue(t);
                    if (n) {
                      var f = !a;
                      (a = a || O()), (o = o || O());
                      for (var g = a.length; g--; ) if (a[g] == t) return o[g];
                      c = l ? u(t.length) : {};
                    } else c = l ? L(t) : he({}, t);
                    return (
                      l &&
                        (R.call(t, 'index') && (c.index = t.index),
                        R.call(t, 'input') && (c.input = t.input)),
                      n &&
                        (a.push(t),
                        o.push(c),
                        (l ? me : ye)(t, function (t, i) {
                          c[i] = e(t, n, r, a, o);
                        }),
                        f && (D(a), D(o))),
                      c
                    );
                  })(e, t, 'function' == typeof n && ne(n, r, 1))
                );
              }),
              (X.find = xe),
              (X.identity = _e),
              (X.isArguments = se),
              (X.isArray = ue),
              (X.isDate = function (e) {
                return (e && 'object' == typeof e && M.call(e) == p) || !1;
              }),
              (X.isEmpty = function (e) {
                var t = !0;
                if (!e) return t;
                var n = M.call(e),
                  r = e.length;
                return n == f ||
                  n == w ||
                  (Z.argsClass ? n == l : se(e)) ||
                  (n == v && 'number' == typeof r && we(e.splice))
                  ? !r
                  : (ye(e, function () {
                      return (t = !1);
                    }),
                    t);
              }),
              (X.isFunction = we),
              (X.isNull = function (e) {
                return null === e;
              }),
              (X.isObject = ke),
              (X.isString = be),
              (X.isUndefined = function (e) {
                return void 0 === e;
              }),
              (X.noop = Pe),
              (X.detect = xe),
              (X.findWhere = xe),
              (X.VERSION = '2.4.1'),
              S && _ && P && ((_.exports = X)._ = X);
          }.call(this));
        }.call(
          this,
          'undefined' != typeof global
            ? global
            : 'undefined' != typeof self
            ? self
            : 'undefined' != typeof window
            ? window
            : {}
        ));
      },
      {},
    ],
    24: [
      function (e, t, n) {
        var r = e('./lib_managed/lodash'),
          a = e('./lib/helpers');
        (void 0 !== n ? n : this).getLinkTrackingManager = function (e, t, n) {
          var o, i, c, s, u, l;
          function f(t, o) {
            for (
              var i, s, u, l, f, d;
              null !== (i = t.parentNode) &&
              !r.isUndefined(i) &&
              'A' !== (s = t.tagName.toUpperCase()) &&
              'AREA' !== s;

            )
              t = i;
            if (!r.isUndefined(t.href)) {
              var p = t.hostname || a.getHostName(t.href),
                g = p.toLowerCase(),
                m = t.href.replace(p, g);
              new RegExp(
                '^(javascript|vbscript|jscript|mocha|livescript|ecmascript|mailto):',
                'i'
              ).test(m) ||
                ((u = t.id),
                (l = a.getCssClasses(t)),
                (f = t.target),
                (d = c ? t.innerHTML : null),
                (m = unescape(m)),
                e.trackLinkClick(m, u, l, f, d, n(o)));
            }
          }
          function d(e) {
            return function (t) {
              var n, r;
              (n = (t = t || window.event).which || t.button),
                (r = t.target || t.srcElement),
                'click' === t.type
                  ? r && f(r, e)
                  : 'mousedown' === t.type
                  ? (1 !== n && 2 !== n) || !r
                    ? (u = l = null)
                    : ((u = n), (l = r))
                  : 'mouseup' === t.type &&
                    (n === u && r === l && f(r, e), (u = l = null));
            };
          }
          return {
            configureLinkClickTracking: function (e, t, n, r) {
              (c = n), (s = r), (i = t), (o = a.getFilter(e, !0));
            },
            addClickListeners: function () {
              var e,
                n,
                r = document.links;
              for (e = 0; e < r.length; e++)
                o(r[e]) &&
                  !r[e][t] &&
                  ((n = r[e]),
                  i
                    ? (a.addEventListener(n, 'mouseup', d(s), !1),
                      a.addEventListener(n, 'mousedown', d(s), !1))
                    : a.addEventListener(n, 'click', d(s), !1),
                  (r[e][t] = !0));
            },
          };
        };
      },
      { './lib/helpers': 21, './lib_managed/lodash': 23 },
    ],
    25: [
      function (e, t, n) {
        !(function () {
          var t = e('JSON'),
            r = e('./lib_managed/lodash'),
            a = e('./lib/detectors').localStorageAccessible,
            o = e('./lib/helpers');
          (void 0 !== n ? n : this).OutQueueManager = function (
            e,
            n,
            i,
            c,
            s,
            u,
            l
          ) {
            var f,
              d,
              p,
              g = !1,
              m = (s =
                s &&
                window.XMLHttpRequest &&
                'withCredentials' in new XMLHttpRequest())
                ? '/com.snowplowanalytics.snowplow/tp2'
                : '';
            if (
              ((u = (a() && c && s && u) || 1),
              (f = ['snowplowOutQueue', e, n, s ? 'post2' : 'get'].join('_')),
              c)
            )
              try {
                p = t.parse(localStorage.getItem(f));
              } catch (e) {}
            function h() {
              for (
                ;
                p.length && 'string' != typeof p[0] && 'object' != typeof p[0];

              )
                p.shift();
              if (p.length < 1) g = !1;
              else {
                if (!r.isString(d))
                  throw 'No Snowplow collector configured, cannot track';
                g = !0;
                var e = p[0];
                if (s) {
                  var n = v(d),
                    a = setTimeout(function () {
                      n.abort(), (g = !1);
                    }, 5e3),
                    i = (function (e) {
                      for (
                        var t = 0, n = 0;
                        t < e.length && ((n += e[t].bytes), !(l <= n));

                      )
                        t += 1;
                      return t;
                    })(p);
                  n.onreadystatechange = function () {
                    if (
                      4 === n.readyState &&
                      200 <= n.status &&
                      n.status < 400
                    ) {
                      for (var e = 0; e < i; e++) p.shift();
                      c && o.attemptWriteLocalStorage(f, t.stringify(p)),
                        clearTimeout(a),
                        h();
                    } else
                      4 === n.readyState &&
                        400 <= n.status &&
                        (clearTimeout(a), (g = !1));
                  };
                  var u = r.map(p.slice(0, i), function (e) {
                    return e.evt;
                  });
                  0 < u.length && n.send(y(u));
                } else {
                  makeRequestToTheCollector(p, c, o, f, t, d, e, g, h)
                }
              }
            }
            function v(e) {
              var t = new XMLHttpRequest();
              return (
                t.open('POST', e, !0),
                (t.withCredentials = !0),
                t.setRequestHeader(
                  'Content-Type',
                  'application/json; charset=UTF-8'
                ),
                t
              );
            }
            function y(e) {
              return t.stringify({
                schema:
                  'iglu:com.snowplowanalytics.snowplow/payload_data/jsonschema/1-0-3',
                data: e,
              });
            }
            return (
              r.isArray(p) || (p = []),
              i.outQueues.push(p),
              s &&
                1 < u &&
                i.bufferFlushers.push(function () {
                  g || h();
                }),
              {
                enqueueRequest: function (e, n) {
                  if (((d = n + m), s)) {
                    var a =
                      ((i = e),
                      {
                        evt: (w = r.mapValues(i, function (e) {
                          return e.toString();
                        })),
                        bytes: (function (e) {
                          for (var t = 0, n = 0; n < e.length; n++) {
                            var r = e.charCodeAt(n);
                            r <= 127
                              ? (t += 1)
                              : r <= 2047
                              ? (t += 2)
                              : 55296 <= r && r <= 57343
                              ? ((t += 4), n++)
                              : (t += r < 65535 ? 3 : 4);
                          }
                          return t;
                        })(t.stringify(w)),
                      });
                    if (l <= a.bytes)
                      return (
                        o.warn(
                          'Event of size ' +
                            a.bytes +
                            ' is too long - the maximum size is ' +
                            l
                        ),
                        void v(d).send(y([a.evt]))
                      );
                    p.push(a);
                  } else
                    p.push(
                      (function (e) {
                        var t = '?',
                          n = { co: !0, cx: !0 },
                          r = !0;
                        for (var a in e)
                          e.hasOwnProperty(a) &&
                            !n.hasOwnProperty(a) &&
                            (r ? (r = !1) : (t += '&'),
                            (t +=
                              encodeURIComponent(a) +
                              '=' +
                              encodeURIComponent(e[a])));
                        for (var o in n)
                          e.hasOwnProperty(o) &&
                            n.hasOwnProperty(o) &&
                            (t += '&' + o + '=' + encodeURIComponent(e[o]));
                        return t;
                      })(e)
                    );
                  var i,
                    w,
                    k = !1;
                  c && (k = o.attemptWriteLocalStorage(f, t.stringify(p))),
                    g || (k && !(p.length >= u)) || h();
                },
                executeQueue: h,
              }
            );
          };
        })();
      },
      {
        './lib/detectors': 20,
        './lib/helpers': 21,
        './lib_managed/lodash': 23,
        JSON: 1,
      },
    ],
    26: [
      function (e, t, n) {
        !(function () {
          var t = e('./lib_managed/lodash'),
            r = e('./lib/helpers'),
            a = e('./in_queue'),
            o = e('./tracker');
          (void 0 !== n ? n : this).Snowplow = function (e, n) {
            var i,
              c = document,
              s = window,
              u = 'js-2.5.3',
              l = {
                outQueues: [],
                bufferFlushers: [],
                expireDateTime: null,
                hasLoaded: !1,
                registeredOnLoadHandlers: [],
              };
            function f() {
              var e;
              if (!l.hasLoaded)
                for (
                  l.hasLoaded = !0, e = 0;
                  e < l.registeredOnLoadHandlers.length;
                  e++
                )
                  l.registeredOnLoadHandlers[e]();
              return !0;
            }
            return (
              (s.Snowplow = {
                getTrackerCf: function (e) {
                  var t = new o.Tracker(n, '', u, l, {});
                  return t.setCollectorCf(e), t;
                },
                getTrackerUrl: function (e) {
                  var t = new o.Tracker(n, '', u, l, {});
                  return t.setCollectorUrl(e), t;
                },
                getAsyncTracker: function () {
                  return new o.Tracker(n, '', u, l, {});
                },
              }),
              r.addEventListener(
                s,
                'beforeunload',
                function () {
                  var e;
                  if (
                    (t.forEach(l.bufferFlushers, function (e) {
                      e();
                    }),
                    l.expireDateTime)
                  )
                    do {
                      if (
                        ((e = new Date()),
                        0 ===
                          t.filter(l.outQueues, function (e) {
                            return 0 < e.length;
                          }).length)
                      )
                        break;
                    } while (e.getTime() < l.expireDateTime);
                },
                !1
              ),
              c.addEventListener
                ? r.addEventListener(c, 'DOMContentLoaded', function e() {
                    c.removeEventListener('DOMContentLoaded', e, !1), f();
                  })
                : c.attachEvent &&
                  (c.attachEvent('onreadystatechange', function e() {
                    'complete' === c.readyState &&
                      (c.detachEvent('onreadystatechange', e), f());
                  }),
                  c.documentElement.doScroll &&
                    s === s.top &&
                    (function e() {
                      if (!l.hasLoaded) {
                        try {
                          c.documentElement.doScroll('left');
                        } catch (t) {
                          return void setTimeout(e, 0);
                        }
                        f();
                      }
                    })()),
              new RegExp('WebKit').test(navigator.userAgent) &&
                (i = setInterval(function () {
                  (l.hasLoaded || /loaded|complete/.test(c.readyState)) &&
                    (clearInterval(i), f());
                }, 10)),
              r.addEventListener(s, 'load', f, !1),
              new a.InQueueManager(o.Tracker, u, l, e, n)
            );
          };
        })();
      },
      {
        './in_queue': 18,
        './lib/helpers': 21,
        './lib_managed/lodash': 23,
        './tracker': 27,
      },
    ],
    27: [
      function (e, t, n) {
        !(function () {
          var t = e('./lib_managed/lodash'),
            r = e('./lib/helpers'),
            a = e('./lib/proxies'),
            o = e('browser-cookie-lite'),
            i = e('./lib/detectors'),
            c = e('JSON'),
            s = e('sha1'),
            u = e('./links'),
            l = e('./forms'),
            f = e('./out_queue'),
            d = e('snowplow-tracker-core'),
            p = e('uuid');
          (void 0 !== n ? n : this).Tracker = function (e, n, g, m, h, v) {
            var y,
              w,
              k,
              b,
              A,
              x,
              T,
              C,
              S,
              _,
              P,
              E,
              O,
              j,
              D,
              L,
              N,
              I,
              U,
              F,
              M = d(!0, function (e) {
                var t, n, r;
                !(function (e) {
                  var t = Math.round(new Date().getTime() / 1e3),
                    n = Ee('id'),
                    r = Ee('ses'),
                    a = Oe('ses'),
                    c = Be(),
                    s = c[0],
                    u = c[1],
                    l = c[2],
                    f = c[3],
                    d = c[4],
                    g = c[5],
                    m = c[6];
                  if (ee && ce)
                    return o.cookie(n, '', -1, Z, X), o.cookie(r, '', -1, Z, X);
                  '0' === s
                    ? ((L = m),
                      !a && ce && (f++, (g = d), (L = p.v4())),
                      (me = f))
                    : new Date().getTime() - pe > 1e3 * ne &&
                      ((L = p.v4()), me++),
                    e.add('vp', i.detectViewport()),
                    e.add('ds', i.detectDocumentSize()),
                    e.add('vid', me),
                    e.add('sid', L),
                    e.add('duid', u),
                    e.add('fp', le),
                    e.add('uid', N),
                    Te(),
                    e.add('refr', truncateUrl(_e(y || V))),
                    e.add('url', truncateUrl(_e(k || z))),
                    ce && (Me(u, l, me, t, g, L), Fe()),
                    (pe = new Date().getTime());
                })(e),
                  (t = e),
                  (n = Y),
                  (r = new Date()),
                  ee ||
                    (we.enqueueRequest(t.build(), w),
                    (h.expireDateTime = r.getTime() + n));
              }),
              B = document,
              q = window,
              R = navigator,
              H = a.fixupUrl(B.domain, q.location.href, r.getReferrer()),
              J = r.fixupDomain(H[0]),
              z = H[1],
              V = H[2],
              Q = (v = v || {}).hasOwnProperty('platform') ? v.platform : 'web',
              G = v.hasOwnProperty('appId') ? v.appId : '',
              W = B.title,
              Y = v.hasOwnProperty('pageUnloadTimer') ? v.pageUnloadTimer : 500,
              K = v.hasOwnProperty('cookieName') ? v.cookieName : '_sp_',
              X = v.hasOwnProperty('cookieDomain') ? v.cookieDomain : null,
              Z = '/',
              $ = R.doNotTrack || R.msDoNotTrack,
              ee =
                !!v.hasOwnProperty('respectDoNotTrack') &&
                v.respectDoNotTrack &&
                ('yes' === $ || '1' === $),
              te = 63072e3,
              ne = v.hasOwnProperty('sessionCookieTimeout')
                ? v.sessionCookieTimeout
                : 1800,
              re = v.hasOwnProperty('userFingerprintSeed')
                ? v.userFingerprintSeed
                : 123412414,
              ae = B.characterSet || B.charset,
              oe =
                !!v.hasOwnProperty('forceSecureTracker') &&
                !0 === v.forceSecureTracker,
              ie = !v.hasOwnProperty('useLocalStorage') || v.useLocalStorage,
              ce = !v.hasOwnProperty('useCookies') || v.useCookies,
              se = R.userLanguage || R.language,
              ue = i.detectBrowserFeatures(ce, Ee('testcookie')),
              le = !1 === v.userFingerprint ? '' : i.detectSignature(re),
              fe = e + '_' + n,
              de = !1,
              pe = new Date().getTime(),
              ge = s,
              me = 1,
              he = { transaction: {}, items: [] },
              ve = u.getLinkTrackingManager(M, fe, Re),
              ye = l.getFormTrackingManager(M, fe, Re),
              we = new f.OutQueueManager(
                e,
                n,
                h,
                ie,
                v.post,
                v.bufferSize,
                v.maxPostBytes || 4e4
              ),
              ke = !1,
              be = v.contexts || {},
              Ae = [];
            for (var xe in (be.webPage &&
              Ae.push({
                schema:
                  'iglu:com.snowplowanalytics.snowplow/web_page/jsonschema/1-0-0',
                data: { id: m },
              }),
            be.gaCookies &&
              Ae.push(
                ((I = {}),
                t.forEach(
                  ['__utma', '__utmb', '__utmc', '__utmv', '__utmz', '_ga'],
                  function (e) {
                    var t = o.cookie(e);
                    t && (I[e] = t);
                  }
                ),
                {
                  schema: 'iglu:com.google.analytics/cookies/jsonschema/1-0-0',
                  data: I,
                })
              ),
            be.geolocation && He(),
            M.setBase64Encoding(
              !v.hasOwnProperty('encodeBase64') || v.encodeBase64
            ),
            M.setTrackerVersion(g),
            M.setTrackerNamespace(n),
            M.setAppId(G),
            M.setPlatform(Q),
            M.setTimezone(i.detectTimezone()),
            M.addPayloadPair('lang', se),
            M.addPayloadPair('cs', ae),
            ue))
              Object.prototype.hasOwnProperty.call(ue, xe) &&
                ('res' === xe || 'cd' === xe || 'cookie' === xe
                  ? M.addPayloadPair(xe, ue[xe])
                  : M.addPayloadPair('f_' + xe, ue[xe]));
            function Te() {
              (H = a.fixupUrl(
                B.domain,
                q.location.href,
                r.getReferrer()
              ))[1] !== z && (V = r.getReferrer(z)),
                (J = r.fixupDomain(H[0])),
                (z = H[1]);
            }
            function Ce(e) {
              var t = new Date().getTime();
              this.href &&
                (this.href = r.decorateQuerystring(
                  this.href,
                  '_sp',
                  D + '.' + t
                ));
            }
            function Se(e) {
              for (var t = 0; t < document.links.length; t++) {
                var n = document.links[t];
                !n.spDecorationEnabled &&
                  e(n) &&
                  (r.addEventListener(n, 'click', Ce, !0),
                  r.addEventListener(n, 'mousedown', Ce, !0),
                  (n.spDecorationEnabled = !0));
              }
            }
            function _e(e) {
              var t;
              return T ? ((t = new RegExp('#.*')), e.replace(t, '')) : e;
            }
            function Pe(e) {
              var t = new RegExp('^([a-z]+):').exec(e);
              return t ? t[1] : null;
            }
            function Ee(e) {
              return K + e + '.' + j;
            }
            function Oe(e) {
              return o.cookie(Ee(e));
            }
            function je() {
              Te(), (j = ge((X || J) + (Z || '/')).slice(0, 4));
            }
            function De() {
              var e = new Date();
              S = e.getTime();
            }
            function Le() {
              !(function () {
                var e = Ne(),
                  t = e[0];
                t < _ ? (_ = t) : P < t && (P = t);
                var n = e[1];
                n < E ? (E = n) : O < n && (O = n);
              })(),
                De();
            }
            function Ne() {
              var e =
                B.compatMode && 'BackCompat' != B.compatMode
                  ? B.documentElement
                  : B.body;
              return [
                e.scrollLeft || q.pageXOffset,
                e.scrollTop || q.pageYOffset,
              ];
            }
            function Ie() {
              var e = Ne(),
                t = e[0];
              P = _ = t;
              var n = e[1];
              O = E = n;
            }
            function Ue(e) {
              var t = Math.round(e);
              if (!isNaN(t)) return t;
            }
            function Fe() {
              o.cookie(Ee('ses'), '*', ne, Z, X);
            }
            function Me(e, t, n, r, a, i) {
              o.cookie(
                Ee('id'),
                e + '.' + t + '.' + n + '.' + r + '.' + a + '.' + i,
                te,
                Z,
                X
              );
            }
            function Be() {
              if (!ce) return [];
              var e,
                t = new Date(),
                n = Math.round(t.getTime() / 1e3),
                r = Oe('id');
              return (
                r
                  ? (e = r.split('.')).unshift('0')
                  : (e = ['1', D, n, 0, n, '']),
                e[6] || (e[6] = p.v4()),
                e
              );
            }
            function qe(e) {
              return oe
                ? 'https://' + e
                : ('https:' === B.location.protocol ? 'https' : 'http') +
                    '://' +
                    e;
            }
            function Re(e) {
              var n = Ae.concat(e || []);
              if (be.performanceTiming) {
                var r = (function () {
                  var e =
                    q.performance ||
                    q.mozPerformance ||
                    q.msPerformance ||
                    q.webkitPerformance;
                  if (e) {
                    var n = {};
                    for (var r in e.timing)
                      t.isFunction(e.timing[r]) || (n[r] = e.timing[r]);
                    return (
                      delete n.requestEnd,
                      q.chrome &&
                        q.chrome.loadTimes &&
                        'number' ==
                          typeof q.chrome.loadTimes().firstPaintTime &&
                        (n.chromeFirstPaint = Math.round(
                          1e3 * q.chrome.loadTimes().firstPaintTime
                        )),
                      {
                        schema:
                          'iglu:org.w3/PerformanceTiming/jsonschema/1-0-0',
                        data: n,
                      }
                    );
                  }
                })();
                r && n.push(r);
              }
              return n;
            }
            function He() {
              !ke &&
                R.geolocation &&
                R.geolocation.getCurrentPosition &&
                ((ke = !0),
                navigator.geolocation.getCurrentPosition(function (e) {
                  var t = e.coords,
                    n = {
                      schema:
                        'iglu:com.snowplowanalytics.snowplow/geolocation_context/jsonschema/1-1-0',
                      data: {
                        latitude: t.latitude,
                        longitude: t.longitude,
                        latitudeLongitudeAccuracy: t.accuracy,
                        altitude: t.altitude,
                        altitudeAccuracy: t.altitudeAccuracy,
                        bearing: t.heading,
                        speed: t.speed,
                        timestamp: e.timestamp,
                      },
                    };
                  Ae.push(n);
                }));
            }
            function Je(e, t) {
              return (e || []).concat(t ? t() : []);
            }
            function ze(e, t) {
              return '' !== e ? e + t.charAt(0).toUpperCase() + t.slice(1) : t;
            }
            function Ve(e) {
              var t,
                n,
                a,
                o = ['', 'webkit', 'ms', 'moz'];
              if (!C)
                for (n = 0; n < o.length; n++)
                  if (B[ze((a = o[n]), 'hidden')]) {
                    'prerender' === B[ze(a, 'visibilityState')] && (t = !0);
                    break;
                  }
              t
                ? r.addEventListener(B, a + 'visibilitychange', function t() {
                    B.removeEventListener(a + 'visibilitychange', t, !1), e();
                  })
                : e();
            }
            return (
              je(),
              (U = ce && !!Oe('ses')),
              (F = Be())[1]
                ? (D = F[1])
                : ((D = ge(
                    (R.userAgent || '') +
                      (R.platform || '') +
                      c.stringify(ue) +
                      Math.round(new Date().getTime() / 1e3)
                  ).slice(0, 16)),
                  (F[1] = D)),
              (L = F[6]),
              U || (F[3]++, (L = p.v4()), (F[6] = L), (F[5] = F[4])),
              ce &&
                (Fe(),
                (F[4] = Math.round(new Date().getTime() / 1e3)),
                F.shift(),
                Me.apply(null, F)),
              v.crossDomainLinker && Se(v.crossDomainLinker),
              {
                getUserId: function () {
                  return N;
                },
                getDomainUserId: function () {
                  return Be()[1];
                },
                getDomainUserInfo: function () {
                  return Be();
                },
                getUserFingerprint: function () {
                  return le;
                },
                setAppId: function (e) {
                  r.warn(
                    'setAppId is deprecated. Instead add an "appId" field to the argmap argument of newTracker.'
                  ),
                    M.setAppId(e);
                },
                setReferrerUrl: function (e) {
                  y = e;
                },
                setCustomUrl: function (e) {
                  var t, n, a;
                  Te(),
                    (t = z),
                    (k = Pe((n = e))
                      ? n
                      : '/' === n.slice(0, 1)
                      ? Pe(t) + '://' + r.getHostName(t) + n
                      : (0 <= (a = (t = _e(t)).indexOf('?')) &&
                          (t = t.slice(0, a)),
                        (a = t.lastIndexOf('/')) !== t.length - 1 &&
                          (t = t.slice(0, a + 1)),
                        t + n));
                },
                setDocumentTitle: function (e) {
                  (W = B.title), (b = e);
                },
                discardHashTag: function (e) {
                  T = e;
                },
                setCookieNamePrefix: function (e) {
                  r.warn(
                    'setCookieNamePrefix is deprecated. Instead add a "cookieName" field to the argmap argument of newTracker.'
                  ),
                    (K = e);
                },
                setCookieDomain: function (e) {
                  r.warn(
                    'setCookieDomain is deprecated. Instead add a "cookieDomain" field to the argmap argument of newTracker.'
                  ),
                    (X = r.fixupDomain(e)),
                    je();
                },
                setCookiePath: function (e) {
                  (Z = e), je();
                },
                setVisitorCookieTimeout: function (e) {
                  te = e;
                },
                setSessionCookieTimeout: function (e) {
                  ne = e;
                },
                setUserFingerprintSeed: function (e) {
                  r.warn(
                    'setUserFingerprintSeed is deprecated. Instead add a "userFingerprintSeed" field to the argmap argument of newTracker.'
                  ),
                    (re = e),
                    (le = i.detectSignature(re));
                },
                enableUserFingerprint: function (e) {
                  r.warn(
                    'enableUserFingerprintSeed is deprecated. Instead add a "userFingerprint" field to the argmap argument of newTracker.'
                  ),
                    e || (le = '');
                },
                respectDoNotTrack: function (e) {
                  r.warn(
                    'This usage of respectDoNotTrack is deprecated. Instead add a "respectDoNotTrack" field to the argmap argument of newTracker.'
                  );
                  var t = R.doNotTrack || R.msDoNotTrack;
                  ee = e && ('yes' === t || '1' === t);
                },
                crossDomainLinker: function (e) {
                  Se(e);
                },
                addListener: function (e, t, n) {
                  addClickListener(e, t, n);
                },
                enableLinkClickTracking: function (e, t, n, r) {
                  h.hasLoaded
                    ? (ve.configureLinkClickTracking(e, t, n, r),
                      ve.addClickListeners())
                    : h.registeredOnLoadHandlers.push(function () {
                        ve.configureLinkClickTracking(e, t, n, r),
                          ve.addClickListeners();
                      });
                },
                refreshLinkClickTracking: function () {
                  h.hasLoaded
                    ? ve.addClickListeners()
                    : h.registeredOnLoadHandlers.push(function () {
                        ve.addClickListeners();
                      });
                },
                enableActivityTracking: function (e, t) {
                  (A = new Date().getTime() + 1e3 * e), (x = 1e3 * t);
                },
                enableFormTracking: function (e, t) {
                  h.hasLoaded
                    ? (ye.configureFormTracking(e), ye.addFormListeners(t))
                    : h.registeredOnLoadHandlers.push(function () {
                        ye.configureFormTracking(e), ye.addFormListeners(t);
                      });
                },
                killFrame: function () {
                  q.location !== q.top.location &&
                    (q.top.location = q.location);
                },
                redirectFile: function (e) {
                  'file:' === q.location.protocol && (q.location = e);
                },
                setCountPreRendered: function (e) {
                  C = e;
                },
                setUserId: function (e) {
                  N = e;
                },
                setUserIdFromLocation: function (e) {
                  Te();
                  const t = r.fromQuerystring(e, z),
                    n = r.fromQuerystring('_zl', z);
                  return (
                    t && n
                      ? ((N = t + '&' + n), o.cookie(Ee('ises'), N, ne, Z, X))
                      : (N = o.cookie(Ee('ises'))),
                    N
                  );
                },
                setUserIdFromReferrer: function (e) {
                  Te(), (N = r.fromQuerystring(e, V));
                },
                setUserIdFromCookie: function (e) {
                  N = o.cookie(e);
                },
                setCollectorCf: function (e) {
                  w = qe(e + '.cloudfront.net');
                },
                setCollectorUrl: function (e) {
                  w = qe(e);
                },
                setPlatform: function (e) {
                  r.warn(
                    'setPlatform is deprecated. Instead add a "platform" field to the argmap argument of newTracker.'
                  ),
                    M.setPlatform(e);
                },
                encodeBase64: function (e) {
                  r.warn(
                    'This usage of encodeBase64 is deprecated. Instead add an "encodeBase64" field to the argmap argument of newTracker.'
                  ),
                    M.setBase64Encoding(e);
                },
                flushBuffer: function () {
                  we.executeQueue();
                },
                enableGeolocationContext: He,
                trackPageView: function (e, t, n) {
                  Ve(function () {
                    !(function (e, t, n) {
                      Te(), (W = B.title), (b = e);
                      var a = r.fixupTitle(b || W);
                      M.trackPageView(_e(k || z), a, _e(y || V), Re(Je(t, n)));
                      var o = new Date();
                      A &&
                        x &&
                        !de &&
                        ((de = !0),
                        Ie(),
                        r.addEventListener(B, 'click', De),
                        r.addEventListener(B, 'mouseup', De),
                        r.addEventListener(B, 'mousedown', De),
                        r.addEventListener(B, 'mousemove', De),
                        r.addEventListener(B, 'mousewheel', De),
                        r.addEventListener(q, 'DOMMouseScroll', De),
                        r.addEventListener(q, 'scroll', Le),
                        r.addEventListener(B, 'keypress', De),
                        r.addEventListener(B, 'keydown', De),
                        r.addEventListener(B, 'keyup', De),
                        r.addEventListener(q, 'resize', De),
                        r.addEventListener(q, 'focus', De),
                        r.addEventListener(q, 'blur', De),
                        (S = o.getTime()),
                        setInterval(function () {
                          var e,
                            a = new Date();
                          S + x > a.getTime() &&
                            A < a.getTime() &&
                            ((e = Je(t, n)),
                            Te(),
                            (newDocumentTitle = B.title),
                            newDocumentTitle !== W &&
                              ((W = newDocumentTitle), (b = null)),
                            M.trackPagePing(
                              _e(k || z),
                              r.fixupTitle(b || W),
                              _e(y || V),
                              Ue(_),
                              Ue(P),
                              Ue(E),
                              Ue(O),
                              Re(e)
                            ),
                            Ie());
                        }, x));
                    })(e, t, n);
                  });
                },
                trackStructEvent: function (e, t, n, r, a, o) {
                  M.trackStructEvent(e, t, n, r, a, Re(o));
                },
                trackUnstructEvent: function (e, t) {
                  M.trackUnstructEvent(e, Re(t));
                },
                addTrans: function (e, t, n, r, a, o, i, c, s, u) {
                  he.transaction = {
                    orderId: e,
                    affiliation: t,
                    total: n,
                    tax: r,
                    shipping: a,
                    city: o,
                    state: i,
                    country: c,
                    currency: s,
                    context: u,
                  };
                },
                addItem: function (e, t, n, r, a, o, i, c) {
                  he.items.push({
                    orderId: e,
                    sku: t,
                    name: n,
                    category: r,
                    price: a,
                    quantity: o,
                    currency: i,
                    context: c,
                  });
                },
                trackTrans: function () {
                  var e, t, n, r, a, o, i, c, s, u, l, f, d, p, g, m, h, v;
                  (e = he.transaction.orderId),
                    (t = he.transaction.affiliation),
                    (n = he.transaction.total),
                    (r = he.transaction.tax),
                    (a = he.transaction.shipping),
                    (o = he.transaction.city),
                    (i = he.transaction.state),
                    (c = he.transaction.country),
                    (s = he.transaction.currency),
                    (u = he.transaction.context),
                    M.trackEcommerceTransaction(
                      e,
                      t,
                      n,
                      r,
                      a,
                      o,
                      i,
                      c,
                      s,
                      Re(u)
                    );
                  for (var y = 0; y < he.items.length; y++) {
                    var w = he.items[y];
                    (l = w.orderId),
                      (f = w.sku),
                      (d = w.name),
                      (p = w.category),
                      (g = w.price),
                      (m = w.quantity),
                      (h = w.currency),
                      (v = w.context),
                      M.trackEcommerceTransactionItem(
                        l,
                        f,
                        d,
                        p,
                        g,
                        m,
                        h,
                        Re(v)
                      );
                  }
                  he = { transaction: {}, items: [] };
                },
                trackLinkClick: function (e, t, n, r, a, o) {
                  Ve(function () {
                    M.trackLinkClick(e, t, n, r, a, Re(o));
                  });
                },
                trackAdImpression: function (e, t, n, r, a, o, i, c, s) {
                  Ve(function () {
                    M.trackAdImpression(e, t, n, r, a, o, i, c, Re(s));
                  });
                },
                trackAdClick: function (e, t, n, r, a, o, i, c, s, u) {
                  M.trackAdClick(e, t, n, r, a, o, i, c, s, Re(u));
                },
                trackAdConversion: function (e, t, n, r, a, o, i, c, s, u) {
                  M.trackAdConversion(e, t, n, r, a, o, i, c, s, Re(u));
                },
                trackSocialInteraction: function (e, t, n, r) {
                  M.trackSocialInteraction(e, t, n, Re(r));
                },
                trackAddToCart: function (e, t, n, r, a, o, i) {
                  M.trackAddToCart(e, t, n, r, a, o, Re(i));
                },
                trackRemoveFromCart: function (e, t, n, r, a, o, i) {
                  M.trackRemoveFromCart(e, t, n, r, a, o, Re(i));
                },
                trackSiteSearch: function (e, t, n, r, a) {
                  M.trackSiteSearch(e, t, n, r, Re(a));
                },
                trackTiming: function (e, t, n, r, a) {
                  M.trackUnstructEvent(
                    {
                      schema:
                        'iglu:com.snowplowanalytics.snowplow/timing/jsonschema/1-0-0',
                      data: { category: e, variable: t, timing: n, label: r },
                    },
                    Re(a)
                  );
                },
              }
            );
          };
        })();
      },
      {
        './forms': 17,
        './lib/detectors': 20,
        './lib/helpers': 21,
        './lib/proxies': 22,
        './lib_managed/lodash': 23,
        './links': 24,
        './out_queue': 25,
        JSON: 1,
        'browser-cookie-lite': 2,
        sha1: 7,
        'snowplow-tracker-core': 8,
        uuid: 16,
      },
    ],
  },
  {},
  [19]
);
