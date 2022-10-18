import { isObject } from "@x-drive/utils";
import { Module } from "@nuxt/types";
import colors from "colors/safe";
import LRU from "lru-cache";

interface ComponentCacheOptions extends Pick<LRU.Options<string, string>, "max" | "maxAge"> {
    /**是否启用缓存 */
    enable?: boolean;

    /**是否是静默模式 */
    silent?: boolean;
}

export const meta = require("../package.json");

const DEFAULT_OPTIONS: ComponentCacheOptions = {
    "max": 2000
    , "maxAge": 1000 * 60 * 30
}

/**Component Cache Module */
const ComponentCache: Module<ComponentCacheOptions> = function (options) {
    const nuxtRenderOptions = this.options.render;
    if (nuxtRenderOptions.ssr === false) {
        return;
    }

    if (nuxtRenderOptions.bundleRenderer?.cache) {
        return;
    }

    if (!isObject(nuxtRenderOptions.bundleRenderer)) {
        this.options.render.bundleRenderer = {};
    }

    if (options && this.options.render.bundleRenderer) {
        if (options.enable === false && !options.silent) {
            console.log(
                colors.red("✗")
                , "Component cache disabled"
            );
        } else {
            if (!options.silent) {
                console.log(
                    colors.green("✔")
                    , "Component cache enabled"
                );
            }
            delete options.enable;
            this.options.render.bundleRenderer.cache = new LRU(
                Object.assign(
                    {}
                    , DEFAULT_OPTIONS
                    , options
                )
            );
        }
    }
}

export default ComponentCache;