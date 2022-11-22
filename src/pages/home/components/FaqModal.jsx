import useTheme from "../../../hooks/useTheme"

function FaqModal(props) {
  const { theme, changeTheme } = useTheme()
  return (
    <div
    className={props.show ? "relative z-10" : "hidden"}
      aria-labelledby="modal-title"
      role="dialog"
      aria-modal="true"
    >
      <div className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity"></div>
      <div className="fixed inset-0 z-10 overflow-y-auto">
        <div className="flex min-h-full items-center justify-center p-4 text-center sm:items-center sm:p-0">
          <div className={`relative transform overflow-hidden rounded-2xl border-4 ${theme==='light'?'border-black bg-white text-black':'border-white bg-slate-900 text-white'} text-left shadow-xl transition-all sm:my-8 sm:w-full sm:max-w-6xl py-8`}>
            <div className="px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
              <div className="sm:flex sm:items-start">
                <div className="mt-3 text-center sm:mt-0 sm:ml-4 sm:text-left">
                  <h3
                    className="text-4xl font-bold leading-6"
                    id="modal-title"
                  >
                    Faq
                  </h3>
                  <div className="mt-6 flex flex-col gap-5">
                    <p className="text-2xl font-bold underline">
                      What is Kadena Coin Flip?
                    </p>
                    <p className="text-lg">
                      Kadena Coin Flip is a smart contract where users can play
                      double or nothing to earn KDA.
                    </p>
                    <p className="text-2xl font-bold underline">
                      Where can I buy a KCF NFT?
                    </p>
                    <p className="text-lg">
                      You can purchace a KCF NFT on Mint-it <a className="text-blue-700 underline" href="https://mintit.studio/">here</a> .
                    </p>
                    <p className="text-2xl font-bold underline">
                      How do I earn rewards?
                    </p>
                    <p className="text-lg">
                      KCF takes a 3.5% on each flip and 80% of those profits are
                      distributed directly to holders. Each week these rewards
                      are sent directly to NFT holder wallets.
                    </p>
                    <p className="text-2xl font-bold underline">
                      Where can I join the community?
                    </p>
                    <p className="text-lg">
                      You can join our Discord <a className="text-blue-700 underline" href="https://discord.gg/">here</a>. We have a full time support
                      team that can help you find whatever you need.
                    </p>
                  </div>
                </div>
              </div>
            </div>
            <div className="w-full px-4 py-3 sm:flex sm:flex-row-reverse sm:px-6 justify-center">
              <button
                type="button"
                className={`w-full rounded-2xl bg-pink-600 px-4 py-4 text-3xl  border-4 ${theme === "light"?"border-black":"border-white"} `}
                onClick={() => props.onClose()}
              >
                Get Flipping!
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default FaqModal
