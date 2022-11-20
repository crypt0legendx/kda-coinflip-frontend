import Pact from 'pact-lang-api';

export const ZELCORE = 'ZELCORE';
const zelcore = {
  name: 'Zelcore',
  connect: async function(state) {
    try {
      window.open('zel:', '_self');
      const accounts = await fetch("http://127.0.0.1:9467/v1/accounts", {
        headers: {
            "Content-Type": "application/json",
        },
        method: "POST",
        body: JSON.stringify({ asset: "kadena" }),
      });
      
      const accountsJson = await accounts.json();

      return {
        status: 'success',
        message: '',
        account: {
          account: accountsJson.data[0],
          publicKey: accountsJson.data[1],
        }
      }
    }
    catch (e) {
      return {
        status: 'fail',
        message: e,
        account: {
          account: '',
          publicKey: '',
        }
      }
    }
  },
  disconnect: async function(state) {
    return {
      result: {
        status: 'success',
        message: '',
      }
    }
  },
  sign: async function(state, signingCommand) {
    window.open('zel:', '_self');
    return await Pact.wallet.sign(signingCommand);
  }
}
export default zelcore;