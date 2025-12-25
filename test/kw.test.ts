
import { expect, test, describe } from "bun:test";
import kw from '../kw.js'

describe('酷我音乐搜索功能测试', () => {
    test('搜索音乐 - 周杰伦第二页', async () => {
        try {
            const result = await kw.search("周杰伦", 2, 'music');
            
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

    test('搜索专辑 - 周杰伦第一页', async () => {
        try {
            const result = await kw.search("周杰伦", 1, 'album');
            
            expect(result).toBeDefined();
            expect(result).toHaveProperty('isEnd');
            expect(result).toHaveProperty('data');
            expect(Array.isArray(result.data)).toBe(true);
            
            if (result.data.length > 0) {
                const albumItem = result.data[0];
                expect(albumItem).toHaveProperty('id');
                expect(albumItem).toHaveProperty('title');
                expect(albumItem).toHaveProperty('artist');
            }
            
            console.log(`搜索到 ${result.data.length} 个专辑`);
            
        } catch (error) {
            console.error('搜索专辑失败:', error);
            fail(`搜索专辑请求失败: ${error.message}`);
        }
    });

    test('搜索不存在的歌曲应该返回空结果', async () => {
        try {
            const result = await kw.search("这是一个不存在的歌曲名随机字符串123456", 1, 'music');
            
            expect(result).toBeDefined();
            expect(result.data).toBeDefined();
            expect(Array.isArray(result.data)).toBe(true);
            // 应该返回空数组或者没有匹配结果
            expect(result.data.length).toBe(0);
            
        } catch (error) {
            console.error('搜索不存在的歌曲失败:', error);
            fail(`搜索请求失败: ${error.message}`);
        }
    });
});