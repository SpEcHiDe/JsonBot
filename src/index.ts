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
	return await fetch(
		`https://api.telegram.org/bot${botToken}/${method}`,
		{
			method: "POST",
			body: JSON.stringify(pms)
		}
	);
}

export default {
	async fetch(
		request: Request,
		env: Env,
		ctx: ExecutionContext
	): Promise<Response> {
		if (request.method === "POST") {
			let { pathname } = new URL(request.url);
			let botToken = pathname.substring(1);
			let update: any = await request.json();
			// https://stackoverflow.com/a/3515761/4723940
			let msgToSend: string = JSON.stringify(update, null, 4);
			// https://stackoverflow.com/a/6259543/4723940
			let msgsToSend: Array<string> = msgToSend.match(/.{1,4095}/g) || [];
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
					for (let onemsg of msgsToSend) {
						await botHoistedApi(
							botToken,
							"sendMessage",
							{
								text: `<pre><code class="language-json">${onemsg}</code></pre>`,
								chat_id: update[updateType].from.id,
								reply_to_message_id: update[updateType].message_id,
								parse_mode: "HTML",
								disable_web_page_preview: true,
								disable_notification: true,
								allow_sending_without_reply: true,
							}
						);
					}
					break;
				}
			}
			return new Response(
				JSON.stringify({}),
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
