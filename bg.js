const axios = require("axios");
const cheerio = require('cheerio');
const siteURL = 'https://a.buguyy.top'
module.exports = {
    platform: "bugu", // 插件名
    version: "0.0.2", // 版本号
    cacheControl: "no-store", // 我们可以直接解析出musicItem的结构，因此选取no-store就好了，当然也可以不写这个字段
    async search(query, page, type) {
        if (type === "music") {
            // 我们能搜索的只有音乐，因此判断下类型
            // 获取网站的html

            const resultJSON = await axios.get(siteURL + "/newapi/search.php?keyword=" + encodeURI(query))



            // 存储搜索结果
            const searchResults = [];

            // 解析每一个结果
            resultJSON.data.data.list.map((element) => {

                // id
                const id = element.id
                // 音频名
                const title = element.title;
                // 作者
                const artist = element.singer;
                // 专辑封面
                const artwork = element.picurl;
                const album = ""


                searchResults.push({
                    // 一定要有一个 id 字段
                    id,
                    title,
                    artist,
                    artwork,
                    album

                })
            });
            return {
                isEnd: true,
                data: searchResults
            }
        }
    },

    async getMediaSource(info, quality) {
        const resultJSON = (await axios.get(siteURL + "/newapi/geturl2.php?id=" + info.id)).data
        return {
            "url": resultJSON.data.url
        };
    }
};