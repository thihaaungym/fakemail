/// <reference types="astro/client" />

type KVNamespace = import('@cloudflare/workers-types').KVNamespace;
type ENV = {
    POST_DB: KVNamespace;
    DKIM_PRIVATE_KEY: string;
};

// use a default runtime configuration (advanced mode).
type Runtime = import('@astrojs/cloudflare').Runtime<ENV>;
declare namespace App {
    interface Locals extends Runtime {}
}
