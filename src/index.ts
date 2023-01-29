/**
 * Welcome to Cloudflare Workers! This is your first worker.
 *
 * - Run `wrangler dev src/index.ts` in your terminal to start a development server
 * - Open a browser tab at http://localhost:8787/ to see your worker in action
 * - Run `wrangler publish src/index.ts --name my-worker` to publish your worker
 *
 * Learn more at https://developers.cloudflare.com/workers/
 */

export interface Env {
	// Example binding to KV. Learn more at https://developers.cloudflare.com/workers/runtime-apis/kv/
	// MY_KV_NAMESPACE: KVNamespace;
	//
	// Example binding to Durable Object. Learn more at https://developers.cloudflare.com/workers/runtime-apis/durable-objects/
	// MY_DURABLE_OBJECT: DurableObjectNamespace;
	//
	// Example binding to R2. Learn more at https://developers.cloudflare.com/workers/runtime-apis/r2/
	// MY_BUCKET: R2Bucket;
}

async function botHoistedApi(
	botToken: string,
	method: string,
	pms: any
) {
	let one = await fetch(
		`https://api.telegram.org/bot${botToken}/${method}`,
		{
			method: "POST",
			body: JSON.stringify(pms)
		}
	);
	return await one.json();
}

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
const SMAII_STICKER_URL = `https://wsrv.nl/?url=${STICKER_URL}&w=${SMAII_STICKER_WIDTH}&h=${SMAII_STICKER_HEIGHT}`;
const AUDIO_URL = `${TG_FILE_ID_BASEURL}/CQACAgQAAx0EYtH4LwABBYFQY9ZZZURV9eQd4i98OMiq6CGXRtcAAmkMAAIRJ7FSKA6JG9b_n54tBA/audio.mp3`;
const AUDIO_DURATION = 19;
const GIF_URL = `${TG_FILE_ID_BASEURL}/CgACAgQAAx0EYtH4LwABBYGJY9ZeRwWhvRsBkOWwDfzt920wAwADbwwAAhEnsVJBCGoFT-Oz_C0E/animation.gif`;
const GIF_WIDTH = 320;
const GIF_HEIGHT = 134;
const GIF_DURATION = 3;
const GIF_2_URL = `${TG_FILE_ID_BASEURL}/CgACAgIAAx0EYtH4LwABBYF8Y9Zc-Yc8FsmaiHNLOXUoKsuY0OQAAjwmAAJNExFKKwaTGIOiBqwtBA/mpeg4.mp4`;
const GIF_2_WIDTH = 848;
const GIF_2_HEIGHT = 384;
const GIF_2_DURATION = 1;
const VIDEO_URL = `${TG_FILE_ID_BASEURL}/BAACAgEAAx0EYtH4LwABBYF1Y9Zcl0zhprqtWg5WffhQ4p8pAosAAmIEAAJcc7FG-LyqRBJwnvItBA/video.mp4`;
const VOICE_URL = `${TG_FILE_ID_BASEURL}/AwACAgQAAx0EYtH4LwABBYFPY9ZZZBAzxfPoEWOHGwUeKFCrHzoAAmgMAAIRJ7FS39XFVc2yptUtBA/voice.ogg`;
const YT_VIDEO_URL = "https://youtu.be/JmvCpR45LKA";
const YT_VIDEO_DURATION = 103;
// END: MEME RESOURCES

export default {
	async fetch(
		request: Request,
		env: Env,
		ctx: ExecutionContext
	): Promise<Response> {
		if (request.method === "POST") {
			let { pathname } = new URL(request.url);
			let response: any = {};
			let botToken = pathname.substring(1);
			let update: any = await request.json();
			// https://stackoverflow.com/a/3515761/4723940
			let msgToSend: string = JSON.stringify(update, null, 4);
			let updateTypes: Array<string> = [
				"message",
				"edited_message",
				"channel_post",
				"edited_channel_post",
			];
			for (let updateType of updateTypes) {
				if (
					update.hasOwnProperty(updateType) &&
					!!update[updateType]
				) {
					if (msgToSend.length > TG_MAX_MESSAGE_LENGTH) {
						while (msgToSend.length > 0) {
							await botHoistedApi(
								botToken,
								"sendMessage",
								{
									text: `<pre><code class="language-json">${msgToSend.substring(0, TG_MAX_MESSAGE_LENGTH)}</code></pre>`,
									chat_id: update[updateType]["chat"]["id"] || "",
									reply_to_message_id: update[updateType].message_id,
									parse_mode: "HTML",
									disable_web_page_preview: true,
									disable_notification: true,
									allow_sending_without_reply: true,
								}
							);
							msgToSend = msgToSend.substring(TG_MAX_MESSAGE_LENGTH);
						}
					}
					else {
						response = {
							method: "sendMessage",
							text: `<pre><code class="language-json">${msgToSend}</code></pre>`,
							chat_id: update[updateType]["chat"]["id"],
							reply_to_message_id: update[updateType].message_id,
							parse_mode: "HTML",
							disable_web_page_preview: true,
							disable_notification: true,
							allow_sending_without_reply: true,
						};
					}
					break;
				}
			}
			if (update.inline_query) {
				let inline_query = update.inline_query;
				let reply_markup = {
					inline_keyboard: [
						[
							{
								text: "(string) Label text on the button",
								url: STICKER_URL,
							},
						],
						[
							{
								text: "(string) Label text on the button",
								switch_inline_query: "(string) Optional. If set, pressing the button will prompt the user to select one of their chats, open that chat and insert the bot's username and the specified inline query in the input field. May be empty, in which case just the bot's username will be inserted.",
							},
							{
								text: "(string) Label text on the button",
								switch_inline_query_current_chat: "(string) Optional. If set, pressing the button will insert the bot's username and the specified inline query in the current chat's input field. May be empty, in which case only the bot's username will be inserted.",
							},
						],
					]
				};
				let input_text_message_content = {
					message_text: `<pre><code class="language-json">${msgToSend.substring(0, TG_MAX_MESSAGE_LENGTH)}</code></pre>`,
					parse_mode: "HTML",
					disable_web_page_preview: false,
				};
				let inputTextMessageContent = {
					message_text: `<a href="${YT_VIDEO_URL}">&#x200b;</a><pre><code class="language-json">${msgToSend.substring(0, TG_MAX_MESSAGE_LENGTH)}</code></pre>`,
					parse_mode: "HTML",
					disable_web_page_preview: false,
				};
				response = {
					method: "answerInlineQuery",
					inline_query_id: inline_query.id,
					results: [
						{
							type: "article",
							id: 1,
							title: "(string) Title of the result",
							input_message_content: input_text_message_content,
							reply_markup: reply_markup,
							url: STICKER_URL,
							hide_url: true,
							description: "(string) Optional. Short description of the result",
							thumb_url: SMAII_STICKER_URL,
							thumb_width: SMAII_STICKER_WIDTH,
							thumb_height: SMAII_STICKER_HEIGHT,
						},
						{
							type: "article",
							id: 2,
							title: "(string) Title of the result",
							input_message_content: {
								phone_number: "+424314159",
								first_name: "(string) Contact's first name",
								last_name: "(string) Optional. Contact's last name",
								vcard: "",
							},
							reply_markup: reply_markup,
							url: STICKER_URL,
							hide_url: true,
							description: "(string) Optional. Short description of the result",
							thumb_url: SMAII_STICKER_URL,
							thumb_width: SMAII_STICKER_WIDTH,
							thumb_height: SMAII_STICKER_HEIGHT,
						},
						{
							type: "photo",
							id: 3,
							photo_url: STICKER_URL,
							thumb_url: SMAII_STICKER_URL,
							photo_width: STICKER_WIDTH,
							photo_height: STICKER_HEIGHT,
							title: "(string) Title of the result",
							description: "(string) Optional. Short description of the result",
							caption: `<pre><code class="language-json">${msgToSend.substring(0, TG_MAX_CAPTION_LENGTH)}</code></pre>`,
							parse_mode: "HTML",
							reply_markup: reply_markup,
							// input_message_content:
						},
						{
							type: "gif",
							id: 4,
							gif_url: GIF_URL,
							gif_width: GIF_WIDTH,
							gif_height: GIF_HEIGHT,
							gif_duration: GIF_DURATION,
							thumb_url: SMAII_STICKER_URL,
							thumb_mime_type: "image/jpeg",
							title: "(string) Title of the result",
							caption: `<pre><code class="language-json">${msgToSend.substring(0, TG_MAX_CAPTION_LENGTH)}</code></pre>`,
							parse_mode: "HTML",
							reply_markup: reply_markup,
							// input_message_content:
						},
						{
							type: "mpeg4_gif",
							id: 5,
							mpeg4_url: GIF_2_URL,
							mpeg4_width: GIF_2_WIDTH,
							mpeg4_height: GIF_2_HEIGHT,
							mpeg4_duration: GIF_2_DURATION,
							thumb_url: SMAII_STICKER_URL,
							thumb_mime_type: "image/jpeg",
							title: "(string) Title of the result",
							caption: `<pre><code class="language-json">${msgToSend.substring(0, TG_MAX_CAPTION_LENGTH)}</code></pre>`,
							parse_mode: "HTML",
							reply_markup: reply_markup,
							// input_message_content:
						},
						{
							type: "video",
							id: 6,
							video_url: VIDEO_URL,
							mime_type: "video/mp4",
							thumb_url: SMAII_STICKER_URL,
							title: "(string) Title of the result",
							caption: `<pre><code class="language-json">${msgToSend.substring(0, TG_MAX_CAPTION_LENGTH)}</code></pre>`,
							parse_mode: "HTML",
							video_width: 0,
							video_height: 0,
							video_duration: YT_VIDEO_DURATION,
							description: "(string) Optional. Short description of the result",
							reply_markup: reply_markup,
							// input_message_content:
						},
						{
							type: "video",
							id: 7,
							video_url: YT_VIDEO_URL,
							mime_type: "text/html",
							thumb_url: SMAII_STICKER_URL,
							title: "(string) Title of the result",
							caption: `<pre><code class="language-json">${msgToSend.substring(0, TG_MAX_CAPTION_LENGTH)}</code></pre>`,
							parse_mode: "HTML",
							video_width: 0,
							video_height: 0,
							video_duration: YT_VIDEO_DURATION,
							description: "(string) Optional. Short description of the result",
							reply_markup: reply_markup,
							input_message_content: inputTextMessageContent,
						},
						{
							type: "audio",
							id: 8,
							audio_url: AUDIO_URL,
							title: "(string) Title of the result",
							caption: `<pre><code class="language-json">${msgToSend.substring(0, TG_MAX_CAPTION_LENGTH)}</code></pre>`,
							parse_mode: "HTML",
							performer: "(string) Optional. Performer",
							audio_duration: AUDIO_DURATION,
							reply_markup: reply_markup,
							// input_message_content:
						},
						{
							type: "voice",
							id: 9,
							voice_url: VOICE_URL,
							title: "(string) Title of the result",
							caption: `<pre><code class="language-json">${msgToSend.substring(0, TG_MAX_CAPTION_LENGTH)}</code></pre>`,
							parse_mode: "HTML",
							voice_duration: AUDIO_DURATION,
							reply_markup: reply_markup,
							// input_message_content:
						},
					],
					cache_time: 300,
					is_personal: true,
					next_offset: "",
					switch_pm_text: "(string) Optional. If passed, clients will display a button with specified text that switches the user to a private chat with the bot and sends the bot a start message with the parameter switch_pm_parameter",
					switch_pm_parameter: "inline",
				};
			}
			else if (update.chosen_inline_result) {
				response = {
					method: "sendMessage",
					text: `<pre><code class="language-json">${msgToSend.substring(0, TG_MAX_MESSAGE_LENGTH)}</code></pre>`,
					chat_id: update.chosen_inline_result["from"]["id"],
					parse_mode: "HTML",
					disable_web_page_preview: true,
					disable_notification: true,
				};
			}
			else if (update.callback_query) {
				response = {
					method: "sendMessage",
					text: `<pre><code class="language-json">${msgToSend.substring(0, TG_MAX_MESSAGE_LENGTH)}</code></pre>`,
					chat_id: update.callback_query["from"]["id"],
					reply_to_message_id: update.callback_query?.message.message_id || 0,
					allow_sending_without_reply: true,
					parse_mode: "HTML",
					disable_web_page_preview: true,
					disable_notification: true,
				};
			}
			else if (update.chat_join_request) {
				response = {
					method: "sendMessage",
					text: `<pre><code class="language-json">${msgToSend.substring(0, TG_MAX_MESSAGE_LENGTH)}</code></pre>`,
					chat_id: update.chat_join_request["from"]["id"],
					parse_mode: "HTML",
					disable_web_page_preview: true,
					disable_notification: true,
				};
			}
			else {
			}

			return new Response(
				JSON.stringify(response),
				{
					headers: {
						"Content-Type": "application/json; charset=UTF-8",
					}
				}
			)
		}
		return Response.redirect("https://t.me/SpEcHlDe/1348");
	},
};
