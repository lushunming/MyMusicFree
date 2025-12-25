"use strict";

Object.defineProperty(exports, "__esModule", {
    "value": true
});
const axios_1 = require("axios"),
    he = require("he"),
    pageSize = 30;
function artworkShort2Long(_0x5b9001) {
    var _0x3967c1;
    const _0x33dd82 = (_0x3967c1 = _0x5b9001 === null || _0x5b9001 === void 0 ? void 0 : _0x5b9001.indexOf("/")) !== null && _0x3967c1 !== void 0 ? _0x3967c1 : -1;
    return _0x33dd82 !== -1 ? "https://img4.kuwo.cn/star/albumcover/1080" + _0x5b9001.slice(_0x33dd82) : undefined;
}
function formatMusicItem(_0x59c8e1) {
    return {
        "id": _0x59c8e1.MUSICRID.replace("MUSIC_", ""),
        "artwork": artworkShort2Long(_0x59c8e1.web_albumpic_short),
        "title": he.decode(_0x59c8e1.NAME || ""),
        "artist": he.decode(_0x59c8e1.ARTIST || ""),
        "album": he.decode(_0x59c8e1.ALBUM || ""),
        "albumId": _0x59c8e1.ALBUMID,
        "artistId": _0x59c8e1.ARTISTID,
        "formats": _0x59c8e1.FORMATS
    };
}
function formatAlbumItem(_0x15641b) {
    var _0x523ec2;
    return {
        "id": _0x15641b.albumid,
        "artist": he.decode(_0x15641b.artist || ""),
        "title": he.decode(_0x15641b.name || ""),
        "artwork": (_0x523ec2 = _0x15641b.img) !== null && _0x523ec2 !== void 0 ? _0x523ec2 : artworkShort2Long(_0x15641b.pic),
        "description": he.decode(_0x15641b.info || ""),
        "date": _0x15641b.pub,
        "artistId": _0x15641b.artistid
    };
}
function formatArtistItem(_0x1cbd6c) {
    return {
        "id": _0x1cbd6c.ARTISTID,
        "avatar": _0x1cbd6c.hts_PICPATH,
        "name": he.decode(_0x1cbd6c.ARTIST || ""),
        "artistId": _0x1cbd6c.ARTISTID,
        "description": he.decode(_0x1cbd6c.desc || ""),
        "worksNum": _0x1cbd6c.SONGNUM
    };
}
function formatMusicSheet(_0x5080f8) {
    return {
        "id": _0x5080f8.playlistid,
        "title": he.decode(_0x5080f8.name || ""),
        "artist": he.decode(_0x5080f8.nickname || ""),
        "artwork": _0x5080f8.pic,
        "playCount": _0x5080f8.playcnt,
        "description": he.decode(_0x5080f8.intro || ""),
        "worksNum": _0x5080f8.songnum
    };
}
async function searchMusic(_0x2812fb, _0x57357d) {
    const _0x118b5a = (await (0, axios_1.default)({
            "method": "get",
            "url": "http://search.kuwo.cn/r.s",
            "params": {
                "client": "kt",
                "all": _0x2812fb,
                "pn": _0x57357d - 1,
                "rn": pageSize,
                "uid": 2574109560,
                "ver": "kwplayer_ar_8.5.4.2",
                "vipver": 1,
                "ft": "music",
                "cluster": 0,
                "strategy": 2012,
                "encoding": "utf8",
                "rformat": "json",
                "vermerge": 1,
                "mobi": 1
            }
        })).data,
        _0x198f44 = _0x118b5a.abslist.map(formatMusicItem);
    return {
        "isEnd": (+_0x118b5a.PN + 1) * +_0x118b5a.RN >= +_0x118b5a.TOTAL,
        "data": _0x198f44
    };
}
async function searchAlbum(_0x1d969c, _0x588e87) {
    const _0x233a58 = (await (0, axios_1.default)({
            "method": "get",
            "url": "http://search.kuwo.cn/r.s",
            "params": {
                "all": _0x1d969c,
                "ft": "album",
                "itemset": "web_2013",
                "client": "kt",
                "pn": _0x588e87 - 1,
                "rn": pageSize,
                "rformat": "json",
                "encoding": "utf8",
                "pcjson": 1
            }
        })).data,
        _0x4a786b = _0x233a58.albumlist.map(formatAlbumItem);
    return {
        "isEnd": (+_0x233a58.PN + 1) * +_0x233a58.RN >= +_0x233a58.TOTAL,
        "data": _0x4a786b
    };
}
async function searchArtist(_0x233091, _0x518659) {
    const _0x5ccb82 = (await (0, axios_1.default)({
            "method": "get",
            "url": "http://search.kuwo.cn/r.s",
            "params": {
                "all": _0x233091,
                "ft": "artist",
                "itemset": "web_2013",
                "client": "kt",
                "pn": _0x518659 - 1,
                "rn": pageSize,
                "rformat": "json",
                "encoding": "utf8",
                "pcjson": 1
            }
        })).data,
        _0x2f5a0f = _0x5ccb82.abslist.map(formatArtistItem);
    return {
        "isEnd": (+_0x5ccb82.PN + 1) * +_0x5ccb82.RN >= +_0x5ccb82.TOTAL,
        "data": _0x2f5a0f
    };
}
async function searchMusicSheet(_0x3ed240, _0x3e3143) {
    const _0x4d2222 = (await (0, axios_1.default)({
            "method": "get",
            "url": "http://search.kuwo.cn/r.s",
            "params": {
                "all": _0x3ed240,
                "ft": "playlist",
                "itemset": "web_2013",
                "client": "kt",
                "pn": _0x3e3143 - 1,
                "rn": pageSize,
                "rformat": "json",
                "encoding": "utf8",
                "pcjson": 1
            }
        })).data,
        _0x3c3653 = _0x4d2222.abslist.map(formatMusicSheet);
    return {
        "isEnd": (+_0x4d2222.PN + 1) * +_0x4d2222.RN >= +_0x4d2222.TOTAL,
        "data": _0x3c3653
    };
}
async function getArtistMusicWorks(_0x336c94, _0x5d8a7f) {
    const _0xd989f7 = (await (0, axios_1.default)({
            "method": "get",
            "url": "http://search.kuwo.cn/r.s",
            "params": {
                "pn": _0x5d8a7f - 1,
                "rn": pageSize,
                "artistid": _0x336c94.id,
                "stype": "artist2music",
                "sortby": 0,
                "alflac": 1,
                "show_copyright_off": 1,
                "pcmp4": 1,
                "encoding": "utf8",
                "plat": "pc",
                "thost": "search.kuwo.cn",
                "vipver": "MUSIC_9.1.1.2_BCS2",
                "devid": "38668888",
                "newver": 1,
                "pcjson": 1
            }
        })).data,
        _0x1b7f86 = _0xd989f7.musiclist.map(_0x1c7e7f => {
            return {
                "id": _0x1c7e7f.musicrid,
                "artwork": artworkShort2Long(_0x1c7e7f.web_albumpic_short),
                "title": he.decode(_0x1c7e7f.name || ""),
                "artist": he.decode(_0x1c7e7f.artist || ""),
                "album": he.decode(_0x1c7e7f.album || ""),
                "albumId": _0x1c7e7f.albumid,
                "artistId": _0x1c7e7f.artistid,
                "formats": _0x1c7e7f.formats
            };
        });
    return {
        "isEnd": (+_0xd989f7.pn + 1) * pageSize >= +_0xd989f7.total,
        "data": _0x1b7f86
    };
}
async function getArtistAlbumWorks(_0x5c1c71, _0x34261f) {
    const _0x5f04ed = (await (0, axios_1.default)({
            "method": "get",
            "url": "http://search.kuwo.cn/r.s",
            "params": {
                "pn": _0x34261f - 1,
                "rn": pageSize,
                "artistid": _0x5c1c71.id,
                "stype": "albumlist",
                "sortby": 1,
                "alflac": 1,
                "show_copyright_off": 1,
                "pcmp4": 1,
                "encoding": "utf8",
                "plat": "pc",
                "thost": "search.kuwo.cn",
                "vipver": "MUSIC_9.1.1.2_BCS2",
                "devid": "38668888",
                "newver": 1,
                "pcjson": 1
            }
        })).data,
        _0x439c1f = _0x5f04ed.albumlist.map(formatAlbumItem);
    return {
        "isEnd": (+_0x5f04ed.pn + 1) * pageSize >= +_0x5f04ed.total,
        "data": _0x439c1f
    };
}
async function getArtistWorks(_0xdd1841, _0x3baebc, _0x485f40) {
    if (_0x485f40 === "music") {
        return getArtistMusicWorks(_0xdd1841, _0x3baebc);
    } else {
        if (_0x485f40 === "album") return getArtistAlbumWorks(_0xdd1841, _0x3baebc);
    }
}
async function getLyric(_0xa578f5) {
    const _0x32b3cb = (await axios_1.default.get("http://m.kuwo.cn/newh5/singles/songinfoandlrc", {
            "params": {
                "musicId": _0xa578f5.id,
                "httpStatus": 1
            }
        })).data,
        _0x228f68 = _0x32b3cb.data.lrclist;
    return {
        "rawLrc": _0x228f68.map(_0x2392c2 => "[" + _0x2392c2.time + "]" + _0x2392c2.lineLyric).join("\n")
    };
}
async function getAlbumInfo(_0x50b76d) {
    const _0x17ab05 = (await (0, axios_1.default)({
            "method": "get",
            "url": "http://search.kuwo.cn/r.s",
            "params": {
                "pn": 0,
                "rn": 100,
                "albumid": _0x50b76d.id,
                "stype": "albuminfo",
                "sortby": 0,
                "alflac": 1,
                "show_copyright_off": 1,
                "pcmp4": 1,
                "encoding": "utf8",
                "plat": "pc",
                "thost": "search.kuwo.cn",
                "vipver": "MUSIC_9.1.1.2_BCS2",
                "devid": "38668888",
                "newver": 1,
                "pcjson": 1
            }
        })).data,
        _0x491abb = _0x17ab05.musiclist.map(_0x3e036a => {
            var _0x4d3ae2;
            return {
                "id": _0x3e036a.id,
                "artwork": (_0x4d3ae2 = _0x50b76d.artwork) !== null && _0x4d3ae2 !== void 0 ? _0x4d3ae2 : _0x17ab05.img,
                "title": he.decode(_0x3e036a.name || ""),
                "artist": he.decode(_0x3e036a.artist || ""),
                "album": he.decode(_0x3e036a.album || ""),
                "albumId": _0x50b76d.id,
                "artistId": _0x3e036a.artistid,
                "formats": _0x3e036a.formats
            };
        });
    return {
        "musicList": _0x491abb
    };
}
async function getTopLists() {
    const _0x3c9992 = (await axios_1.default.get("http://wapi.kuwo.cn/api/pc/bang/list")).data.child;
    return _0x3c9992.map(_0x6b3ae3 => ({
        "title": _0x6b3ae3.disname,
        "data": _0x6b3ae3.child.map(_0x2e8ec4 => {
            {
                var _0x3eae88, _0x16aba2;
                return {
                    "id": _0x2e8ec4.sourceid,
                    "coverImg": (_0x16aba2 = (_0x3eae88 = _0x2e8ec4.pic5) !== null && _0x3eae88 !== void 0 ? _0x3eae88 : _0x2e8ec4.pic2) !== null && _0x16aba2 !== void 0 ? _0x16aba2 : _0x2e8ec4.pic,
                    "title": _0x2e8ec4.name,
                    "description": _0x2e8ec4.intro
                };
            }
        })
    }));
}
async function getTopListDetail(_0x29e1d2) {
    const _0x2ccc8d = await axios_1.default.get("http://kbangserver.kuwo.cn/ksong.s", {
        "params": {
            "from": "pc",
            "fmt": "json",
            "pn": 0,
            "rn": 80,
            "type": "bang",
            "data": "content",
            "id": _0x29e1d2.id,
            "show_copyright_off": 0,
            "pcmp4": 1,
            "isbang": 1,
            "userid": 0,
            "httpStatus": 1
        }
    });
    return Object.assign(Object.assign({}, _0x29e1d2), {
        "musicList": _0x2ccc8d.data.musiclist.map(_0x3ffb75 => {
            return {
                "id": _0x3ffb75.id,
                "title": he.decode(_0x3ffb75.name || ""),
                "artist": he.decode(_0x3ffb75.artist || ""),
                "album": he.decode(_0x3ffb75.album || ""),
                "albumId": _0x3ffb75.albumid,
                "artistId": _0x3ffb75.artistid,
                "formats": _0x3ffb75.formats
            };
        })
    });
}
async function getMusicSheetResponseById(_0x4dc703, _0x4a39ec, _0x337b2a = 50) {
    return (await axios_1.default.get("http://nplserver.kuwo.cn/pl.svc", {
        "params": {
            "op": "getlistinfo",
            "pid": _0x4dc703,
            "pn": _0x4a39ec - 1,
            "rn": _0x337b2a,
            "encode": "utf8",
            "keyset": "pl2012",
            "vipver": "MUSIC_9.1.1.2_BCS2",
            "newver": 1
        }
    })).data;
}
async function importMusicSheet(_0x227a42) {
    var _0x3489cb, _0x4c58e2;
    let _0x573fe8;
    if (!_0x573fe8) {
        _0x573fe8 = (_0x3489cb = _0x227a42.match(/https?:\/\/www\/kuwo\.cn\/playlist_detail\/(\d+)/)) === null || _0x3489cb === void 0 ? void 0 : _0x3489cb[1];
    }
    !_0x573fe8 && (_0x573fe8 = (_0x4c58e2 = _0x227a42.match(/https?:\/\/m\.kuwo\.cn\/h5app\/playlist\/(\d+)/)) === null || _0x4c58e2 === void 0 ? void 0 : _0x4c58e2[1]);
    if (!_0x573fe8) {
        _0x573fe8 = _0x227a42.match(/^\s*(\d+)\s*$/);
    }
    if (!_0x573fe8) return;
    let _0x37e808 = 1,
        _0x5f51d = 30,
        _0x449b81 = [];
    while (_0x37e808 < _0x5f51d) {
        try {
            const _0x5c9a14 = await getMusicSheetResponseById(_0x573fe8, _0x37e808, 80);
            _0x5f51d = Math.ceil(_0x5c9a14.total / 80);
            isNaN(_0x5f51d) && (_0x5f51d = 1);
            _0x449b81 = _0x449b81.concat(_0x5c9a14.musicList.map(_0x4c0f5a => ({
                "id": _0x4c0f5a.id,
                "title": he.decode(_0x4c0f5a.name || ""),
                "artist": he.decode(_0x4c0f5a.artist || ""),
                "album": he.decode(_0x4c0f5a.album || ""),
                "albumId": _0x4c0f5a.albumid,
                "artistId": _0x4c0f5a.artistid,
                "formats": _0x4c0f5a.formats
            })));
        } catch (_0x162168) {}
        await new Promise(_0x3820fc => {
            setTimeout(() => {
                _0x3820fc();
            }, 200 + Math.random() * 100);
        });
        ++_0x37e808;
    }
    return _0x449b81;
}
async function getRecommendSheetTags() {
    const _0x489e27 = (await axios_1.default.get("http://wapi.kuwo.cn/api/pc/classify/playlist/getTagList?cmd=rcm_keyword_playlist&user=0&prod=kwplayer_pc_9.0.5.0&vipver=9.0.5.0&source=kwplayer_pc_9.0.5.0&loginUid=0&loginSid=0&appUid=76039576")).data.data,
        _0x2a83da = _0x489e27.map(_0x436b7b => ({
            "title": _0x436b7b.name,
            "data": _0x436b7b.data.map(_0xcfbd44 => ({
                "id": _0xcfbd44.id,
                "digest": _0xcfbd44.digest,
                "title": _0xcfbd44.name
            }))
        })).filter(_0x3c54ec => _0x3c54ec.data.length),
        _0x5adbd2 = [{
            "id": "1848",
            "title": "缈诲敱",
            "digest": "10000"
        }, {
            "id": "621",
            "title": "缃戠粶",
            "digest": "10000"
        }, {
            "title": "浼ゆ劅",
            "digest": "10000",
            "id": "146"
        }, {
            "title": "娆х編",
            "digest": "10000",
            "id": "35"
        }];
    return {
        "data": _0x2a83da,
        "pinned": _0x5adbd2
    };
}
async function getRecommendSheetsByTag(_0x27766d, _0x3cf0e8) {
    const _0x58bd66 = 20;
    let _0x34b7a4;
    if (_0x27766d.id) {
        if (_0x27766d.digest === "10000") _0x34b7a4 = (await axios_1.default.get("http://wapi.kuwo.cn/api/pc/classify/playlist/getTagPlayList?loginUid=0&loginSid=0&appUid=76039576&pn=" + (_0x3cf0e8 - 1) + "&id=" + _0x27766d.id + "&rn=" + _0x58bd66)).data.data;else {
            let _0x2b958b = (await axios_1.default.get("http://mobileinterfaces.kuwo.cn/er.s?type=get_pc_qz_data&f=web&id=" + _0x27766d.id + "&prod=pc")).data;
            _0x34b7a4 = {
                "total": 0,
                "data": _0x2b958b.reduce((_0x59e365, _0x5ad09c) => [..._0x59e365, ..._0x5ad09c.list])
            };
        }
    } else _0x34b7a4 = (await axios_1.default.get("https://wapi.kuwo.cn/api/pc/classify/playlist/getRcmPlayList?loginUid=0&loginSid=0&appUid=76039576&&pn=" + (_0x3cf0e8 - 1) + "&rn=" + _0x58bd66 + "&order=hot")).data.data;
    const _0xa12c1a = _0x3cf0e8 * _0x58bd66 >= _0x34b7a4.total;
    return {
        "isEnd": _0xa12c1a,
        "data": _0x34b7a4.data.map(_0x42974f => ({
            "title": _0x42974f.name,
            "artist": _0x42974f.uname,
            "id": _0x42974f.id,
            "artwork": _0x42974f.img,
            "playCount": _0x42974f.listencnt,
            "createUserId": _0x42974f.uid
        }))
    };
}
async function getMusicSheetInfo(_0x4e4dac, _0x5f42c9) {
    const _0x3f3c13 = await getMusicSheetResponseById(_0x4e4dac.id, _0x5f42c9, pageSize);
    return {
        "isEnd": _0x5f42c9 * pageSize >= _0x3f3c13.total,
        "musicList": _0x3f3c13.musiclist.map(_0x58cad0 => ({
            "id": _0x58cad0.id,
            "title": he.decode(_0x58cad0.name || ""),
            "artist": he.decode(_0x58cad0.artist || ""),
            "album": he.decode(_0x58cad0.album || ""),
            "albumId": _0x58cad0.albumid,
            "artistId": _0x58cad0.artistid,
            "formats": _0x58cad0.formats
        }))
    };
}
const qualityLevels = {
    "low": "exhigh",
    "standard": "exhigh",
    "high": "lossless",
    "super": "lossless"
};
async function getMediaSource(_0x1d213f, _0x121211) {
    const _0x4efbf1 = (await axios_1.default.get("http://musicapi.haitangw.net/music/kw.php?id=" + _0x1d213f.id + "&level=" + qualityLevels[_0x121211])).data;
    return {
        "url": _0x4efbf1.data.url
    };
}
async function getMusicInfo(_0x34101e) {
    const _0x82dce5 = (await axios_1.default.get("http://m.kuwo.cn/newh5/singles/songinfoandlrc", {
            "params": {
                "musicId": _0x34101e.id,
                "httpStatus": 1
            }
        })).data,
        _0x30e111 = _0x82dce5.data.songinfo.pic;
    let _0x18e58b;
    if (_0x30e111.includes("starheads/")) _0x18e58b = _0x30e111.replace(/starheads\/\d+/, "starheads/800");else {
        if (_0x30e111.includes("albumcover/")) {
            _0x18e58b = _0x30e111.replace(/albumcover\/\d+/, "albumcover/800");
        }
    }
    return {
        "artwork": _0x18e58b
    };
}
module.exports = {
    "platform": "元力KW",
    "author": "公众号:科技长青",
    "version": "0.1.0",
    "appVersion": ">0.1.0-alpha.0",
    "srcUrl": "http://music.haitangw.net/cqapi/kw.js",
    "cacheControl": "no-cache",
    "hints": {
        "importMusicSheet": ["酷我APP：自建歌单-分享-复制试听链接，直接粘贴即可", "H5锛氬鍒禪RL骞剁矘璐达紝鎴栬€呯洿鎺ヨ緭鍏ョ函鏁板瓧姝屽崟ID鍗冲彲", "瀵煎叆鏃堕棿鍜屾瓕鍗曞ぇ灏忔湁鍏筹紝璇疯€愬績绛夊緟"]
    },
    "supportedSearchType": ["music", "album", "sheet", "artist"],
    async "search"(_0xc4b07, _0xbf55fa, _0x5a9c8a) {
        if (_0x5a9c8a === "music") {
            return await searchMusic(_0xc4b07, _0xbf55fa);
        }
        if (_0x5a9c8a === "album") return await searchAlbum(_0xc4b07, _0xbf55fa);
        if (_0x5a9c8a === "artist") return await searchArtist(_0xc4b07, _0xbf55fa);
        if (_0x5a9c8a === "sheet") {
            return await searchMusicSheet(_0xc4b07, _0xbf55fa);
        }
    },
    "getMediaSource": getMediaSource,
    "getMusicInfo": getMusicInfo,
    "getAlbumInfo": getAlbumInfo,
    "getLyric": getLyric,
    "getArtistWorks": getArtistWorks,
    "getTopLists": getTopLists,
    "getTopListDetail": getTopListDetail,
    "importMusicSheet": importMusicSheet,
    "getRecommendSheetTags": getRecommendSheetTags,
    "getRecommendSheetsByTag": getRecommendSheetsByTag,
    "getMusicSheetInfo": getMusicSheetInfo
};