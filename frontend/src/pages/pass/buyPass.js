import "./buyPass.css";
import { useState, useEffect, useContext } from "react";
import { useSearchParams, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

import FadeIn from "../../components/fadein";
import { backendURL } from "../../backendURL";
import AuthContext from "../../context/AuthContext";
import useAxios from "../../context/context_useAxios";

function BuyPass() {
  let [searchParams, SetSearchParams] = useSearchParams();
  const { user } = useContext(AuthContext);
  const api = useAxios();
  const navigate = useNavigate();
  const [status, setStatus] = useState("nothing");

  useEffect(
    // when the component has rendered then add the event listener to it
    () => {
      const navBarEle = document.getElementById("navbar");
      navBarEle.style.opacity = 1;
      // console.log(searchParams.get("msg"));
    },
    []
  );

  const handleSuccess = (res) => {
    // separate key and values from the res object which is nothing but param_dict
    let keyArr = Object.keys(res);
    let valArr = Object.values(res);

    // when we start the payment verification we will hide our Product form
    document.getElementById("buyPass").style.display = "none";

    // Lets create a form by DOM manipulation
    // display messages as soon as payment starts
    document.getElementById("buyPass-redirect-text").style.display = "flex";
    // let heading1 = document.createElement("h1");
    // heading1.innerText = "Redirecting you to the paytm....";
    // let heading2 = document.createElement("h1");
    // heading2.innerText = "Please do not refresh your page....";

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
    // document.body.appendChild(heading1);
    // document.body.appendChild(heading2);
    document.body.appendChild(frm);
    // finally submit that form
    frm.submit();

    // if you remember, the param_dict also has "'CALLBACK_URL': 'http://127.0.0.1:8000/api/handlepayment/'"
    // so as soon as Paytm gets the payment it will hit that callback URL with some response and
    // on the basis of that response we are displaying the "payment successful" or "failed" message
  };
  const clicked = (name) => {
    setStatus(name);
  };

  const checkAccommodationStatus = async () => {
    const response = await api.get(`${backendURL}/accomodationpasses/?user=${user.user_id}`);
    if (response.status === 200) {
      console.log("Accommodation Status:", response.data);
      if (response.data.length > 0) {
        return "Registered"
      }
    }
    return "Not Registered"
  }

  // console.log(status);

  const startPayment = async (e) => {
    e.preventDefault();
    const passType = e.target.type;
    // const passType = status;
    // console.log("passtype", passType);
    // send data to the backend
    // bodyData.append("amount", amount);
    // bodyData.append("email", email);
    // console.log("hello");

    // const data = {
    //   payment_type: passType,
    //   user: user.user_id,
    //   payment_status: "Initiated",
    // };

    // let headers = new Headers();
    // headers.append("Content-Type", "application/json");
    // headers.append("Accept", "application/json");
    // headers.append("Origin", "http://localhost:3000");

    // const RequestOptions = {
    //   method: "POST",
    //   headers: headers,
    //   body: JSON.stringify(data),
    // };

    // fetch(`${backendURL}/pay/`, RequestOptions).then((response) => {
    //   if (response.status === 200) {
    //     handleSuccess(response.data.param_dict);
    //   }
    // });
    let accommodationStatus = null;
    if (passType === "Accommodation" || passType === "Jumbo Pack") {
      accommodationStatus = await checkAccommodationStatus();
    }

    console.log("accommodationStatus:", accommodationStatus)
    if (accommodationStatus === "Registered") {
      const response = await api.post(`${backendURL}/pay/`, {
        payment_type: passType,
        user: user.user_id,
        payment_status: "Initiated",
      });

      if (response.status === 200) {
        handleSuccess(response.data.param_dict);
      }
    } else {
      toast.info("Please register for accommodation first!");
      navigate("/accommodation");
    }
  };

  return (
    <FadeIn duration={500}>
      <div id="buyPass-container">
        <div id="buyPass-redirect-text">
          <h1>Redirecting you to PayTm gateway...</h1>
          <h2>
            Please do not refresh the page or close the tab!
          </h2>
        </div>
        <div id="buyPass">
          <div id="buyPass-top">
            <div id="buyPass-title">
              <h1>Registration Plans</h1>
            </div>
            <div id="buyPass-details">
              <span>
                These packs will enable you to get accommodation and culture
                night pass respectively. Entry in all the fest events is
                completely free, you can attend any event throughout the fest
                with a valid registration ID.
              </span>
            </div>
          </div>

          <section>
            <div className="container-fluid">
              <div className="container">
                <div className="row">
                  <div className="col-sm-4">
                    <div className="card text-center">
                      <div className="title">
                        <h2>ACCOMMODATION</h2>
                      </div>
                      <div className="price">
                        <h4>
                          <small>₹</small>999
                        </h4>
                      </div>
                      <div className="pass-benefites">
                        <ul>
                          <li>Accommodation for 3 days</li>
                          <li>Food facilities</li>
                        </ul>
                      </div>
                      <a
                        type="Accommodation"
                        value="Accommodation"
                        onClick={startPayment}
                      >
                        Buy Now
                      </a>
                    </div>
                  </div>
                  <div className="col-sm-4">
                    <div className="card text-center jumbo">
                      <div className="jumbo-title">
                        <h2>JUMBO PACK</h2>
                      </div>
                      <div className="price">
                        <h4>
                          <small>₹</small>999
                        </h4>
                      </div>
                      <div className="pass-benefites">
                        <ul>
                          <li>Accommodation for 3 days</li>
                          <li>Food facilities</li>
                          <li>Culture Night on 22<sup>nd</sup> January</li>
                        </ul>
                      </div>
                      <a type="Jumbo Pack" onClick={startPayment}>
                        Buy Now
                      </a>
                    </div>
                  </div>
                  <div className="col-sm-4">
                    <div className="card text-center">
                      <div className="title">
                        <h2>CULTURE NIGHT</h2>
                      </div>
                      <div className="price">
                        <h4>
                          <small>₹</small>499
                        </h4>
                      </div>
                      <div className="pass-benefites">
                        <ul>
                          <li>Culture Night on 22<sup>nd</sup> January</li>
                        </ul>
                      </div>
                      <a type="Cultural Night" onClick={startPayment}>
                        Buy Now
                      </a>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </section>
        </div>
      </div>
    </FadeIn>
  );
}
export default BuyPass;
