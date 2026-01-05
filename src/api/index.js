// import axios from "axios";
import fetchJsonp from "fetch-jsonp";

/**
 * 统一的 fetch 请求封装
 * @param {string} url 请求地址
 * @param {object} options fetch 选项
 * @returns {Promise<any>} 响应数据
 */
const request = async (url, options = {}) => {
  const { timeout = 10000, ...fetchOptions } = options;

  const controller = new AbortController();
  const timeoutId = setTimeout(() => controller.abort(), timeout);

  try {
    const response = await fetch(url, {
      ...fetchOptions,
      signal: controller.signal,
    });

    clearTimeout(timeoutId);

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    return await response.json();
  } catch (error) {
    clearTimeout(timeoutId);

    if (error.name === "AbortError") {
      throw new Error("请求超时");
    }

    throw error;
  }
};

/**
 * 音乐播放器
 */

// 获取音乐播放列表
export const getPlayerList = async (server, type, id) => {
  try {
    const data = await request(
      `${import.meta.env.VITE_SONG_API}?server=${server}&type=${type}&id=${id}`,
    );

    if (!data || !Array.isArray(data) || data.length === 0) {
      throw new Error("歌单数据为空");
    }

    if (data[0].url.startsWith("@")) {
      // eslint-disable-next-line no-unused-vars
      const [handle, jsonpCallback, jsonpCallbackFunction, url] = data[0].url.split("@").slice(1);
      const jsonpData = await fetchJsonp(url).then((res) => res.json());
      const domain = (
        jsonpData.req_0.data.sip.find((i) => !i.startsWith("http://ws")) ||
        jsonpData.req_0.data.sip[0]
      ).replace("http://", "https://");

      return data.map((v, i) => ({
        name: v.name || v.title,
        artist: v.artist || v.author,
        url: domain + jsonpData.req_0.data.midurlinfo[i].purl,
        cover: v.cover || v.pic,
        lrc: v.lrc,
      }));
    } else {
      return data.map((v) => ({
        name: v.name || v.title,
        artist: v.artist || v.author,
        url: v.url,
        cover: v.cover || v.pic,
        lrc: v.lrc,
      }));
    }
  } catch (error) {
    console.error("获取播放列表失败:", error);
    throw error;
  }
};

/**
 * 一言
 */

// 获取一言数据
export const getHitokoto = async () => {
  try {
    return await request("https://v1.hitokoto.cn");
  } catch (error) {
    console.error("获取一言失败:", error);
    throw error;
  }
};

/**
 * 天气
 */

// 获取高德地理位置信息
export const getAdcode = async (key) => {
  try {
    return await request(`https://restapi.amap.com/v3/ip?key=${key}`);
  } catch (error) {
    console.error("获取地理位置失败:", error);
    throw error;
  }
};

// 获取高德地理天气信息
export const getWeather = async (key, city) => {
  try {
    return await request(
      `https://restapi.amap.com/v3/weather/weatherInfo?key=${key}&city=${city}`,
    );
  } catch (error) {
    console.error("获取天气失败:", error);
    throw error;
  }
};

// 获取教书先生天气 API
// https://api.oioweb.cn/doc/weather/GetWeather
export const getOtherWeather = async () => {
  try {
    return await request("https://api.oioweb.cn/api/weather/GetWeather");
  } catch (error) {
    console.error("获取备用天气失败:", error);
    throw error;
  }
};
