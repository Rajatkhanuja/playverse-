import React, { useState, useEffect, useContext, useCallback } from 'react';
import './bag.css';
import ShopBagItem from '../components/ShopBagItem';
import { AppContext } from '../App';
import { PayPalScriptProvider, PayPalButtons } from "@paypal/react-paypal-js";

function Bag({ reference, onPurchase }) {
  const { bag, addGameToLibrary } = useContext(AppContext);
  const [total, setTotal] = useState(0);
  const [purchaseSuccess, setPurchaseSuccess] = useState(false);
  const [isCheckoutClicked, setIsCheckoutClicked] = useState(false);

  // Calculate total payment amount
  const handleTotalPayment = useCallback(() => {
    const total = bag.reduce((accumulator, game) => accumulator + Number(game.price), 0);
    return total.toFixed(2);
  }, [bag]);

  useEffect(() => {
    setTotal(handleTotalPayment());
  }, [bag, handleTotalPayment]);

  const handlePaymentSuccess = (details) => {
    const purchasedGames = bag;
    onPurchase(purchasedGames);
    setPurchaseSuccess(true);
    purchasedGames.forEach((game) => addGameToLibrary(game));
    console.log("Transaction completed by " + details.payer.name.given_name);
  };

  const handleCheckoutClick = () => {
    setIsCheckoutClicked(true);
  };

  return (
    <PayPalScriptProvider options={{ "client-id": "AUEh24vFSCLIufz2iJuPtaZuJtedaBi_hnvv27DiOMwAZCqHAdvB4PzVamRc3tLhwVRX7tz-3wHMpof0", currency: "USD", components: 'buttons' }}>
      <section id="bag" className='bag' ref={reference}>
        <div className="container-fluid">
          <div className="row mb-3">
            <h1>My Bag</h1>
          </div>
          {bag.length === 0 ? (
            <h2>Your bag is empty</h2>
          ) : (
            <>
             <div className="note">
                    <p>
                      Note: While you can make payments on this site, no games will be available for purchase.
                       Any payments made are at your own risk, and no refunds will be issued.
                    </p>
                  </div>
              <div className="row">
                <div className="table-responsive">
                  <table className="shopBagTable table table-borderless align-middle">
                    <thead>
                      <tr>
                        <th scope='col'>No.</th>
                        <th scope='col'>Preview</th>
                        <th scope='col'>Game</th>
                        <th scope='col'>Price</th>
                        <th scope='col'>Remove</th>
                      </tr>
                    </thead>
                    <tbody>
                      {bag.map((game, index) => (
                        <ShopBagItem index={index} key={game._id} game={game} />
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
              <div className="row d-flex justify-content-between mt-5">
                <div className="col-lg-2 d-flex align-items-center">
                  <p className="itemCount">Total Items: {bag.length}</p>
                </div>
                <div className="col-lg-10 d-flex justify-content-end">
                  <div className="payment">
                    <p>Total: ${total}</p>
                    {!isCheckoutClicked && (
                      <button onClick={handleCheckoutClick} className="btn btn-primary">
                        Checkout
                      </button>
                    )}
                    {isCheckoutClicked && (
                      <PayPalButtons
                        style={{ layout: "vertical" }}
                        createOrder={(data, actions) => {
                          const validTotal = (total && parseFloat(total) > 0 ? total : "0.01").toString();
                          return actions.order.create({
                            purchase_units: [
                              {
                                amount: {
                                  value: validTotal,
                                },
                              },
                            ],
                          });
                        }}
                        onApprove={(data, actions) => {
                          return actions.order.capture().then(details => {
                            handlePaymentSuccess(details);
                          });
                        }}
                        onError={(err) => {
                          console.error("PayPal Checkout error: ", err);
                          alert("An error occurred with PayPal. Please try again.");
                        }}
                      />
                    )}
                    {purchaseSuccess && <p>Purchase Successful!</p>}
                  </div>
                </div>
              </div>
            </>
          )}
        </div>
      </section>
    </PayPalScriptProvider>
  );
}

export default Bag;
