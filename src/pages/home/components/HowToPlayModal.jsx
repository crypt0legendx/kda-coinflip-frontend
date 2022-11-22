import useTheme from "../../../hooks/useTheme"

function HowToPlayModal(props) {
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
                    How to Play
                  </h3>
                  <div className="mt-6 flex flex-col gap-5">
                    <p className="text-lg">
                      1. Connect your X-Wallet. (Get it <a href="https://xwallet.kaddex.com/" className="text-blue-600 underline">here</a>)
                    </p>
                    <p className="text-lg">2. Select heads or tails.</p>
                    <p className="text-lg">
                      3. Select your wager amount in KDA.
                    </p>
                    <p className="text-lg">
                      4. Click the "Double or Nothing!" button.
                    </p>
                    <p className="text-lg">
                      5. Confirm the transaction with your X-Wallet.
                    </p>
                    <p className="text-lg">
                      6. Wait for the result and collect your rewards if you
                      win!
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

export default HowToPlayModal
