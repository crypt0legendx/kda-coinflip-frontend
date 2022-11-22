import useTheme from "../../../hooks/useTheme"

function AboutModal(props) {

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
                    About
                  </h3>
                  <div className="mt-6">
                    <p className="text-lg">
                      Kadena Coin Flip is a smart contract where users can play
                      double or nothing. The odds are exactly 50/50 with a 3.5%
                      fee that goes to KCF holders. Each transaction is
                      verifiable on the Kadena blockchain and all outcomes are
                      completely random. You can purchase a KCF NFT at&nbsp;
                      <a className="text-blue-600" href="https://mintit.studio">https://mintit.studio</a> to start earning rewards from the
                      platform!
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

export default AboutModal
