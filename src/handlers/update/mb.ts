import { Composer } from "grammy/mod.ts";
import {
    TG_ALLOWED_UPDATES,
    TG_ENV_S,
    TG_MES_PR,
    TG_PR_MES,
} from "./../../consts.ts";
import { getBot } from "./../../bots.ts";

export const composer = new Composer();

export default composer;

composer.on("managed_bot", async (ctx) => {
    const botToken = await ctx.api.getManagedBotToken(
        ctx.managedBot.bot.id,
    );
    const bot = getBot(ctx.botConfig.botMode, botToken);
    if (bot) {
        try {
            // Make sure it is `https` not `http`!
            await bot.api.setWebhook(
                `${TG_ENV_S.URL}/${botToken}`,
                {
                    drop_pending_updates: true,
                    allowed_updates: TG_ALLOWED_UPDATES,
                },
            );
        } catch (_e) {
            // console.log(_e);
        }
    }
    return await ctx.api.sendMessage(
        ctx.managedBot.user.id,
        TG_PR_MES(
            TG_MES_PR(
                ctx.update,
            ),
        ),
        {
            parse_mode: "HTML",
        },
    );
});
