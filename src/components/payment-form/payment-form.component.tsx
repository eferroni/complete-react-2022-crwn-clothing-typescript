import { CardElement, useStripe, useElements } from "@stripe/react-stripe-js";
import Button, { BUTTON_TYPE_CLASSES } from "../button/button.component";
import { FormContainer, PaymentFormContainer } from "./payment-form.styles";
import { useState, FormEvent } from "react";
import { useSelector } from "react-redux";
import { selectCartTotal } from "../../store/cart/cart.selector";
import { selectCurrentUser } from "../../store/user/user.selector";

const sleep = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));

const PaymentForm = () => {
  const stripe = useStripe();
  const elements = useElements();
  const amount = useSelector(selectCartTotal);
  const currentUser = useSelector(selectCurrentUser);
  const [isProcessingPayment, setIsProcessingPayment] = useState(false);

  const paymentHandler = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    console.log("payment - stripe not compatible with react18");

    // if (!stripe || !elements) return;

    setIsProcessingPayment(true);
    await sleep(2000);

    // const response = await fetch("/.netlify/functions/create-payment-intent", {
    //   method: "post",
    //   headers: {
    //     "Content-Type": "application/json",
    //   },
    //   body: JSON.stringify({ amount: amount * 100 }),
    // }).then((res) => res.json());

    // // console.log(response);
    // const {
    //   paymentIntent: { client_secret },
    // } = response;

    // const cardDetails = elements.getElement(CardElement);
    // if(cardDetails === null) return;

    // const paymentResult = await stripe.confirmCardPayment(client_secret, {
    //   payment_method: {
    //     card: cardDetails,
    //     billing_details: {
    //       name: currentUser ? currentUser.displayName : "Guest",
    //     },
    //   },
    // });

    setIsProcessingPayment(false);

    // if (paymentResult.error) {
    //   alert(paymentResult.error);
    // } else {
    //   if (paymentResult.paymentIntent.status === "succeeded") {
    //     alert("Payment Successful");
    //   }
    // }
  };

  return (
    <PaymentFormContainer>
      <FormContainer onSubmit={paymentHandler}>
        <h2>Credit Card Payment:</h2>
        {/*<CardElement />*/}
        <Button
          buttonType={BUTTON_TYPE_CLASSES.inverted}
          isLoading={isProcessingPayment}
        >
          Pay now
        </Button>
      </FormContainer>
    </PaymentFormContainer>
  );
};

export default PaymentForm;
