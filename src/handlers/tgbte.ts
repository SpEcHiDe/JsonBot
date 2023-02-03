import { Composer, InlineKeyboard } from "grammy/mod.ts";
import { getBot } from "../bots.ts";
import { TG_ALLOWED_UPDATES, TG_ENV_S } from "../consts.ts";

const composer = new Composer();

export default composer;

composer.on("msg:text").filter(
  (ctx) => ctx.msg.forward_from?.username?.toLowerCase() === "botfather",
  async (ctx) => {
    let entities = ctx.message?.entities;
    let msgText = ctx.message?.text || "";
    // extract bot token
    let bot_token = extractBotToken(msgText, entities);
    if (bot_token !== undefined) {
      // Create an instance of the `Bot` class and pass your authentication token to it.
      const bot = getBot(bot_token);
      if (bot) {
        try {
          // Make sure it is `https` not `http`!
          await bot.api.setWebhook(
            `${TG_ENV_S.URL}/${bot_token}`,
            {
              drop_pending_updates: true,
              allowed_updates: TG_ALLOWED_UPDATES,
            },
          );
        } catch (e) {}
      }
    }
    // finally reply done to the user
    await ctx.replyWithSticker(
      "CAACAgUAAxkBAAEPvDFie_SFX9QPy_PzMr9bOY9LDIbekwAC3wEAAjzLfB_2ory8DFKOUyQE",
      {
        reply_markup: new InlineKeyboard().url(
          "Source Code",
          "https://github.com/SpEcHiDe/IDNWB",
        ),
        reply_to_message_id: ctx.message?.message_id,
      },
    );
  },
);

function extractBotToken(msgText: string, entities: any) {
  // https://github.com/wjclub/telegram-bot-tokenextract/pull/1
  for (let entity_ in entities) {
    let entity = entities[Number(entity_)];
    if (entity.type == "code") {
      return msgText?.substring(
        entity.offset,
        entity.offset + entity.length,
      );
    }
  }
}
