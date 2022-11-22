
export const X_WALLET = 'X_WALLET';
const xwallet = {
  name: 'X Wallet',
  connect: async function(state) {
    let accountResult = await kadena.request({
      method: "kda_connect",
      networkId: state().kadenaInfo.networkId,
    });
    return accountResult;
  },
  disconnect: async function(state) {
    return await kadena.request({
      method: "kda_disconnect",
      networkId: state().kadenaInfo.networkId,
    });
  },
  sign: async function(state, signingCommand) {
    let networkId = state().kadenaInfo.networkId;
    let req = {
      method: "kda_requestSign",
      networkId: networkId,
      data: {
          networkId: networkId,
          signingCmd: signingCommand
      }
    }
    var cmd = await kadena.request(req);
    // console.log(cmd);
    
    return cmd.signedCmd;
  }
}
export default xwallet;