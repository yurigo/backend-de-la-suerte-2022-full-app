import { NhostClient } from "@nhost/nhost-js";

const nhost = new NhostClient({
    backendUrl: import.meta.env.VITE_NHOSTS_URL,
});

export default nhost;