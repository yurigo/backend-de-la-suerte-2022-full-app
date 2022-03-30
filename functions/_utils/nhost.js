import { NhostClient } from '@nhost/nhost-js'

const nhost = new NhostClient({
   backendUrl: process.env.VITE_NHOSTS_URL
})

export { nhost }