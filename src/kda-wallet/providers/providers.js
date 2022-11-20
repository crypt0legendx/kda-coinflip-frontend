import xwallet, { X_WALLET } from "./xwallet"
import zelcore, { ZELCORE } from "./zelcore"

export { X_WALLET, ZELCORE }

const providers = {
  X_WALLET: xwallet,
  ZELCORE: zelcore
}
export default providers;