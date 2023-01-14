import { useState, useEffect,useContext } from 'react';

import { useNavigate, useSearchParams } from "react-router-dom";
import { toast } from 'react-toastify';

import './preRegistration.css';
import './pay.css';

import FadeIn from "../components/fadein";


import useAxios from "../context/context_useAxios";

import rocketImg from "../assets/icons/rocket.png";
import PreRegistrationImg from '../assets/preRegistrationPage/pre-registration.png';
import PreRegistrationSuccessGIF from '../assets/preRegistrationPage/pre-registration-success.gif';

import { backendURL } from '../backendURL';
import { data } from 'jquery';



function Pay() {

    const api = useAxios();
    const [paymentData, setPaymentData] = useState({});
    const [paymentKey, setPaymentKey] = useState({});
    let [searchParams, SetSearchParams] = useSearchParams();
    useEffect(
        () => {
            const navBarEle = document.getElementById("navbar")
            navBarEle.style.opacity = 1;
            // console.log(SetSearchParams)
            // console.log(searchParams.get('id'));
            // const order_id = searchParams.get('id');
        }
    )

    const handleSubmit =  (res) => {
        // separate key and values from the res object which is nothing but param_dict
        let keyArr = Object.keys(res);
        let valArr = Object.values(res);

        // when we start the payment verification we will hide our Product form
        // document.querySelectorAll(".App")[0].style.display = "none";

        // Lets create a form by DOM manipulation
        // display messages as soon as payment starts
        let heading1 = document.createElement("h1");
        heading1.innerText = "Redirecting you to the paytm....";
        let heading2 = document.createElement("h1");
        heading2.innerText = "Please do not refresh your page....";
        
                    

        //create a form that will send necessary details to the paytm
        let frm = document.createElement("form");
        frm.action = "https://securegw.paytm.in/theia/processTransaction/";
        frm.method = "post";
        frm.name = "paytmForm";

        // we have to pass all the credentials that we've got from param_dict
        keyArr.map((k, i) => {
          // create an input element
          let inp = document.createElement("input");
          inp.key = i;
          inp.type = "hidden";
          // input tag's name should be a key of param_dict
          inp.name = k;
          // input tag's value should be a value associated with the key that we are passing in inp.name
          inp.value = valArr[i];
          // append those all input tags in the form tag
          frm.appendChild(inp);
        });

        // append all the above tags into the body tag
        document.body.appendChild(heading1);
        document.body.appendChild(heading2);
        document.body.appendChild(frm);
        // finally submit that form
        // payRedirect(frm.submit);
        frm.submit();  

    };


    useEffect(() => {

    const order_id = searchParams.get('id');
    // console.log(order_id,"id")
        async function fetchData() {
            try{
                const response = await api.post(
                    `${backendURL}/customorder/`,
                    {
                        order_id:order_id,
                    }
                );
                if (response.status ===200) {
                    const data = response.data.custom_order;
                    const key = response.data.param_dict;
                    console.log(data);
                    setPaymentData({
                        ...data,
                    });
                    setPaymentKey({
                        ...key
                    })
                    // handleSubmit(key);

                } else {
                    throw response.statusText;
                }
            } catch (err) {
                console.log(err);
            }
        }
        fetchData();
    }, []);


    return (
        <FadeIn duration={500}>
            <div className="preRegistration">
                <div className="preRegistration-container">
                    <div className="preRegistration-container-left" style={{
                    }}>
                        <img src={PreRegistrationImg} alt="Pre-Registration" />
                    </div>
                    <div className='preRegistration-container-right'>
                        <div className="preRegistration-container-right-title">
                            Payment
                        </div>
                        <form className="preRegistration-form pay-form"  onSubmit={handleSubmit} >
                            <label className='pay-amount-label'>Amount: {paymentData.amount}</label>
                            <label className='pay-amount-label'>Payment From: {paymentData.payment_from}</label>
                            <label className='pay-amount-label'>Payment Reason: {paymentData.payment_reason}</label>
                            <input type="submit" value="Pay now" id="preRegistration-form-submit"  />
                        </form>
                    </div>
                </div>
            </div>
        </FadeIn>
    );
}

export default Pay;

