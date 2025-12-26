
import { expect, test, describe,fail } from "bun:test";
import kw from '../mvmp3.js'

describe('bg音乐搜索功能测试', () => {
    test('搜索夜曲', async () => {
        try {
            const result = await kw.search("夜曲", 1, 'music');

            // 验证返回结果结构
            expect(result).toBeDefined();
            expect(result).toHaveProperty('isEnd');
            expect(result).toHaveProperty('data');
            expect(Array.isArray(result.data)).toBe(true);

            // 如果有结果，验证音乐项结构
            if (result.data.length > 0) {
                const musicItem = result.data[0];
                expect(musicItem).toHaveProperty('id');
                expect(musicItem).toHaveProperty('title');
                expect(musicItem).toHaveProperty('artist');
                expect(musicItem).toHaveProperty('album');
            }

            console.log(`搜索到 ${result.data.length} 首歌曲`);
            console.log("结果详情:", JSON.stringify(result, null, 2));

        } catch (error) {
            console.error('搜索失败:', error);
            fail(`搜索请求失败: ${error.message}`);
        }
    });


});


describe('bg音乐搜索功能测试', () => {
    test('bg-getMusicInfo', async () => {
        try {
            const result = await kw.getMusicInfo({
                "id": "/mp3/a823ae8d84854fd2eb5b8e599d1263fa.html",
                "title": "说好的幸福呢",
                "artist": "周杰伦",
                "artwork": "https://img2.kuwo.cn/star/albumcover/300/s4s0/93/1794217775.jpg",
                "album": ""
            });

            // 验证返回结果结构
            expect(result).toBeDefined();





            console.log("结果详情:", JSON.stringify(result, null, 2));

        } catch (error) {
            console.error('搜索失败:', error);
            fail(`搜索请求失败: ${error.message}`);
        }
    });
});

describe('bg歌单列表', () => {
    test('bg-getTopLists', async () => {
        try {
            const result = await kw.getTopLists();

            // 验证返回结果结构
            expect(result).toBeDefined();





            console.log("结果详情:", JSON.stringify(result, null, 2));

        } catch (error) {
            console.error('搜索失败:', error);
            fail(`搜索请求失败: ${error.message}`);
        }
    });
});

describe('bg歌单详情', () => {
    test('bg-getTopListDetail', async () => {
        try {
            const result = await kw.getTopListDetail({
                "id": "/list/top.html",
                "title": "韩国音乐榜",
                "artist": "韩国音乐榜"
            },2);

            // 验证返回结果结构
            expect(result).toBeDefined();





            console.log("结果详情:", JSON.stringify(result, null, 2));

        } catch (error) {
            console.error('搜索失败:', error);
            fail(`搜索请求失败: ${error.message}`);
        }
    });
});

describe('bg歌单 tag ', () => {
    test('bg-getRecommendSheetTags', async () => {
        try {
            const result = await kw.getRecommendSheetTags();

            // 验证返回结果结构
            expect(result).toBeDefined();





            console.log("结果详情:", JSON.stringify(result, null, 2));

        } catch (error) {
            console.error('搜索失败:', error);
            fail(`搜索请求失败: ${error.message}`);
        }
    });
});

describe('bg获取某个 tag 下的所有歌单 ', () => {
    test('bg-getRecommendSheetsByTag ', async () => {
        try {
            const result = await kw.getRecommendSheetsByTag( {
                "id": "/gdlist/gdzq.html",
                "title": "古典专区"
            },2);

            // 验证返回结果结构
            expect(result).toBeDefined();





            console.log("结果详情:", JSON.stringify(result, null, 2));

        } catch (error) {
            console.error('搜索失败:', error);
            fail(`搜索请求失败: ${error.message}`);
        }
    });
});

describe('bg获取歌单详情 ', () => {
    test('bg-getMusicSheetInfo ', async () => {
        try {
            const result = await kw.getMusicSheetInfo(  {
                "id": "/playlist/9184831.html",
                "title": "五音养生：古琴疏肝理气静心纯音乐",
                "artist": "五音养生：古琴疏肝理气静心纯音乐",
                "artwork": "http://c1.kgimg.com/custom/400/20251217/20251217122454820926.png",
                "album": ""
            },2);

            // 验证返回结果结构
            expect(result).toBeDefined();





            console.log("结果详情:", JSON.stringify(result, null, 2));

        } catch (error) {
            console.error('搜索失败:', error);
            fail(`搜索请求失败: ${error.message}`);
        }
    });
});