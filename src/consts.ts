// Telegram Constants
const TG_MAX_MESSAGE_LENGTH = 4096;
const TG_MAX_CAPTION_LENGTH = 1024;
const TG_FILE_ID_BASEURL = "https://slow.transload.workers.dev";

// BEGIN: MEME RESOURCES
const STICKER_FILE_ID = "CAADAgADpAwAAqoUyEoBbu6msnyOHAI";
const STICKER_URL = `${TG_FILE_ID_BASEURL}/${STICKER_FILE_ID}/sticker.jpg`;
const STICKER_WIDTH = 512;
const STICKER_HEIGHT = 325;
const SMAII_STICKER_WIDTH = 100;
const SMAII_STICKER_HEIGHT = 100;
const SMAII_STICKER_URL =
  `https://wsrv.nl/?url=${STICKER_URL}&w=${SMAII_STICKER_WIDTH}&h=${SMAII_STICKER_HEIGHT}`;
const AUDIO_URL =
  `${TG_FILE_ID_BASEURL}/CQACAgQAAx0EYtH4LwABBYFQY9ZZZURV9eQd4i98OMiq6CGXRtcAAmkMAAIRJ7FSKA6JG9b_n54tBA/audio.mp3`;
const AUDIO_DURATION = 19;
const GIF_URL =
  `${TG_FILE_ID_BASEURL}/CgACAgQAAx0EYtH4LwABBYGJY9ZeRwWhvRsBkOWwDfzt920wAwADbwwAAhEnsVJBCGoFT-Oz_C0E/animation.gif`;
const GIF_WIDTH = 320;
const GIF_HEIGHT = 134;
const GIF_DURATION = 3;
const GIF_2_URL =
  `${TG_FILE_ID_BASEURL}/CgACAgIAAx0EYtH4LwABBYF8Y9Zc-Yc8FsmaiHNLOXUoKsuY0OQAAjwmAAJNExFKKwaTGIOiBqwtBA/mpeg4.mp4`;
const GIF_2_WIDTH = 848;
const GIF_2_HEIGHT = 384;
const GIF_2_DURATION = 1;
const VIDEO_URL =
  `${TG_FILE_ID_BASEURL}/BAACAgEAAx0EYtH4LwABBYF1Y9Zcl0zhprqtWg5WffhQ4p8pAosAAmIEAAJcc7FG-LyqRBJwnvItBA/video.mp4`;
const VOICE_URL =
  `${TG_FILE_ID_BASEURL}/AwACAgQAAx0EYtH4LwABBYFPY9ZZZBAzxfPoEWOHGwUeKFCrHzoAAmgMAAIRJ7FS39XFVc2yptUtBA/voice.ogg`;
const YT_VIDEO_URL = "https://youtu.be/JmvCpR45LKA";
const YT_VIDEO_DURATION = 103;
// END: MEME RESOURCES

const TG_ALLOWED_UPDATES = [
  "message",
  "edited_message",
  "channel_post",
  "edited_channel_post",
  "inline_query",
  "chosen_inline_result",
  "callback_query",
  "poll",
  "poll_answer",
  "my_chat_member",
  "chat_member",
  "chat_join_request",
];
const TG_ENV_S = Deno.env.toObject();
const TG_MES_PR = (msg) => {
  // https://stackoverflow.com/a/3515761/4723940
  return JSON.stringify(
    msg,
    null,
    2,
  );
  // <= https://t.me/c/1220993104/1/1353555
};
const TG_PR_MES = (msg) => {
  // 1094034
  return `<pre><code class="language-json">${msg}</code></pre>`;
};

export {
  AUDIO_DURATION,
  AUDIO_URL,
  GIF_2_DURATION,
  GIF_2_HEIGHT,
  GIF_2_URL,
  GIF_2_WIDTH,
  GIF_DURATION,
  GIF_HEIGHT,
  GIF_URL,
  GIF_WIDTH,
  SMAII_STICKER_HEIGHT,
  SMAII_STICKER_URL,
  SMAII_STICKER_WIDTH,
  STICKER_FILE_ID,
  STICKER_HEIGHT,
  STICKER_URL,
  STICKER_WIDTH,
  TG_ALLOWED_UPDATES,
  TG_ENV_S,
  TG_MAX_CAPTION_LENGTH,
  TG_MAX_MESSAGE_LENGTH,
  TG_MES_PR,
  TG_PR_MES,
  VIDEO_URL,
  VOICE_URL,
  YT_VIDEO_DURATION,
  YT_VIDEO_URL,
};
