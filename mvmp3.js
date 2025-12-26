const axios = require("axios");
const cheerio = require('cheerio');
const siteURL = 'https://www.mvmp3.com'
module.exports = {
    platform: "mvmp3", // 插件名
    version: "0.0.7", // 版本号
    author: "公众号:非主流的小城生活",
    srcUrl: "https://hk.gh-proxy.org/https:/raw.githubusercontent.com/lushunming/MyMusicFree/master/bg.js",
    cacheControl: "no-store", // 我们可以直接解析出musicItem的结构，因此选取no-store就好了，当然也可以不写这个字段
    //搜索
    async search(query, page, type) {
        if (type === "music") {
            // 我们能搜索的只有音乐，因此判断下类型
            // 获取网站的html

            const rawHtml = (await axios.get(siteURL + "/so.php?wd=" + encodeURI(query) + "&page=" + page)).data;

            // 接下来解析html
            const $ = cheerio.load(rawHtml);
            // 存储搜索结果
            const searchResults = [];
            // 获取所有的结果
            const resultElements = $('div.play_list ul li ');


            // 解析每一个结果
            resultElements.each((index, element) => {


                // id
                const id = $(element).find('div.pic a').attr("href");
                // 音频名
                const title = $(element).find('div.name').text().trim();
                // 作者
                const artist = $(element).find('div.name').text().trim();
                // 专辑封面
                const artwork = $(element).find('img').attr("src");
                const album = ""


                searchResults.push({
                    // 一定要有一个 id 字段
                    id, title, artist, artwork, album

                })
            });
            return {
                isEnd: true, data: searchResults
            }
        }
    }, //歌曲详情
    async getMusicInfo(info) {
        let infoId = info.id + ""
        infoId = infoId.replace("/mp3/", "").replace(".html", '')
        const resultJSON = (await axios.post(siteURL + '/style/js/play.php', {
            id: infoId, type: "dance"
        }, {
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8'
            }
        })).data

        return {
            "url": resultJSON.url, "rawLrc": resultJSON.lrc, "title": resultJSON.name,
        };
    },  //歌曲详情
    async getMediaSource(info, quality) {
        let infoId = info.id + ""
        infoId = infoId.replace("/mp3/", "").replace(".html", '')
        const resultJSON = (await axios.post(siteURL + '/style/js/play.php', {
            id: infoId, type: "dance"
        }, {
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8'
            }
        })).data

        return {
            "url": resultJSON.url
        };
    }, /**
     * 排行榜
     * @returns {Promise<{data: *[]}>}
     */
    async getTopLists() {

        const rawHtml = (await axios.get(siteURL + '/list/kugou.html')).data;
        // 接下来解析html
        const $ = cheerio.load(rawHtml);
        // 存储搜索结果
        const searchResults = [];
        // 获取所有的结果
        const resultElements = $('div.class');


        // 解析每一个结果
        resultElements.each((index, element) => {
            const cat = $(element).find("h1").text();
            const catList = [];
            $(element).find("a").each((index, el) => {

                // id
                const id = $(el).attr("href");
                // 音频名
                const title = $(el).text();
                catList.push({

                    id, title
                })

            });


            searchResults.push({
                // 一定要有一个 id 字段
                title: cat, data: catList

            })
        });

        return searchResults;
    }, /**
     * 排行榜歌单详情
     * @returns {Promise<{data: *[]}>}
     */
    async getTopListDetail(topListItem, page) {
        let topListId = topListItem.id.replaceAll(".html", "")

        const rawHtml = (await axios.get(siteURL + topListId + "/" + page + ".html")).data;
        // 接下来解析html
        const $ = cheerio.load(rawHtml);
        // 存储搜索结果
        const searchResults = [];
        // 获取所有的结果
        const resultElements = $('div.play_list ul li ');


        // 解析每一个结果
        resultElements.each((index, element) => {


            // id
            const id = $(element).find('div.pic a').attr("href");
            // 音频名
            const title = $(element).find('div.name').text().trim();
            // 作者
            const artist = $(element).find('div.name').text().trim();
            // 专辑封面
            const artwork = $(element).find('img').attr("src");
            const album = ""


            searchResults.push({
                // 一定要有一个 id 字段
                id, title, artist, artwork, album

            })
        });

        const pageElements = $('div.page a');
        let isEnd = true;
        pageElements.each((index, element) => {

            if ($(element).text() === "下一页") {
                isEnd = false;
            }
        });

        return {
            isEnd: isEnd, musicList: searchResults
        }


    }, /**
     * 歌单类别
     * @returns {Promise<{data: *[]}>}
     */

    async getRecommendSheetTags() {


        const rawHtml = (await axios.get(siteURL + "/gdlist/index.html")).data;
        // 接下来解析html
        const $ = cheerio.load(rawHtml);
        // 存储搜索结果
        const searchResults = [];
        // 获取所有的结果
        const resultElements = $('div.class ul li a');


        // 解析每一个结果
        resultElements.each((index, element) => {

// id
            const id = $(element).attr("href");
            // 音频名
            const title = $(element).text();


            searchResults.push({
                // 一定要有一个 id 字段
                id, title

            })
        });


        return {
            data: searchResults, pinned: searchResults
        }


    }
    /**
     * 歌单类别详情
     * @returns {Promise<{data: *[]}>}
     */, async getRecommendSheetsByTag(tag, page) {

        let topListId = tag.id?tag.id.replaceAll(".html", "") :'/gdlist/index.html'.replaceAll(".html", "")

        const rawHtml = (await axios.get(siteURL + topListId + "/" + page + ".html")).data;
        // 接下来解析html
        const $ = cheerio.load(rawHtml);
        // 存储搜索结果
        const searchResults = [];
        // 获取所有的结果
        const resultElements = $('div.lkpic_list ul li ');


        // 解析每一个结果
        resultElements.each((index, element) => {


            // id
            const id = $(element).find('div.pic a').attr("href");
            // 音频名
            const title = $(element).find('div.name').text().trim();
            // 作者
            const artist = $(element).find('div.name').text().trim();
            // 专辑封面
            const artwork = $(element).find('img').attr("src");
            const album = ""


            searchResults.push({
                // 一定要有一个 id 字段
                id, title, artist, artwork, album

            })
        });

        const pageElements = $('div.page a');
        let isEnd = true;
        pageElements.each((index, element) => {

            if ($(element).text() === "下一页") {
                isEnd = false;
            }
        });

        return {
            isEnd: isEnd, data: searchResults
        }


    },

    /**
     * 歌单详情
     * @returns {Promise<{data: *[]}>}
     */
    async getMusicSheetInfo(sheetItem, page) {
        let topListId = sheetItem.id.replaceAll(".html", "")

        const rawHtml = (await axios.get(siteURL + topListId + "/" + page + ".html")).data;
        // 接下来解析html
        const $ = cheerio.load(rawHtml);
        // 存储搜索结果
        const searchResults = [];
        // 获取所有的结果
        const resultElements = $('div.play_list ul li ');


        // 解析每一个结果
        resultElements.each((index, element) => {


            // id
            const id = $(element).find('div.pic a').attr("href");
            // 音频名
            const title = $(element).find('div.name').text().trim();
            // 作者
            const artist = $(element).find('div.name').text().trim();
            // 专辑封面
            const artwork = $(element).find('img').attr("src");
            const album = ""


            searchResults.push({
                // 一定要有一个 id 字段
                id, title, artist, artwork, album

            })
        });

        const pageElements = $('div.page a');
        let isEnd = true;
        pageElements.each((index, element) => {

            if ($(element).text() === "下一页") {
                isEnd = false;
            }
        });

        return {
            isEnd: isEnd, musicList: searchResults
        }


    }
};