import { fileURLToPath } from 'url'
import { dirname } from 'path'

const defaultConfigs = {
    __dirname: dirname(fileURLToPath(import.meta.url)),
    PORT: 3000,
}

export default defaultConfigs