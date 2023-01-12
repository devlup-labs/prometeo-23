import { useEffect, useContext, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

import "./accForm.css";

import FadeIn from "../../components/fadein";

import signInImg from "../../assets/backgrounds/peeking.png";
import accPdf from "../../assets/how_to_pay.pdf";
import qr from "../../assets/form/qr.png";

import useAxios from "../../context/context_useAxios";
import { backendURL } from "../../backendURL";
import AuthContext from "../../context/AuthContext";

function AccForm() {
    const navigate = useNavigate();
    const [userData, setUserData] = useState({});
    const { user, logoutUser } = useContext(AuthContext);
    const api = useAxios();
    // console.log(registerUser)

    // useEffect(() => {
    //     console.log(user);
    // }, [user]);

    useEffect(() => {
        const navBarEle = document.getElementById("navbar");
        navBarEle.style.opacity = 1;
    });

    const handleSubmit = (e) => {
        e.preventDefault();
        async function fetchData() {
            try {
                // console.log("Fetching data for user:", user.email);
                const obj = {
                    user: user.user_id,
                    // email: user.email,
                    full_name: e.target.full_name.value,
                    aadhar_card: e.target.aadhar.value,
                    dob: e.target.dob.value,
                    address: e.target.address.value,
                    // ambassador: user.ambassador,
                    // referral: user.referral_code,
                };
                // console.log(obj);
                const response = await api.post(
                    `${backendURL}/accomodationpasses/`,
                    obj
                );
                if (response.status === 201) {
                    let data = response.data;
                    document.getElementById("acc-success").style.display =
                        "flex";
                    // console.log(data);
                    // let invite_code;
                    // // toast.success("Registered Successfully!");
                    // invite_code = data.invite_referral;
                    // document.getElementById("ca-register-button").disabled = true;
                    // document.getElementById("ca-register-button").innerHTML =
                    //     "Registered!";
                    // document.getElementById("ca-referral-info").innerHTML =
                    //     "Your referral code is: <span id='ca-yellow' onClick={copyText}>" +
                    //     invite_code +
                    //     "</span> (click to copy!). Share it with your friends and get them to register using your referral code to get a chance to win exciting prizes!";
                    // }
                } else {
                    // console.log(response)
                    // toast.error("Error: " + response.statusText);
                }
            } catch (error) {
                console.log("Error:", error);
            }
        }

        // if (user === null) {
        //     toast.error("Please login to register as Campus Ambassador!");
        // } else {
        const myPromise = new Promise((resolve, reject) => {
            fetchData()
                .then((res) => {
                    // console.log(res)
                    document.getElementById("acc-success").style.display =
                        "flex";
                    document.getElementsByClassName(
                        "acc-container"
                    )[0].style.justifyContent = "flex-start";
                    document.getElementsByClassName(
                        "acc-container-left"
                    )[0].style.visibility = "hidden";
                    document.getElementsByClassName(
                        "acc-container-right"
                    )[0].style.visibility = "hidden";
                    resolve(res);
                })
                .catch((err) => {
                    // console.log(err)
                    reject(err);
                });
        });

        toast.promise(myPromise, {
            pending: "Registering...",
            success: "Registered successfully!",
            error: {
                render: ({ data }) => {
                    return "Something went wrong!";
                },
            },
        });
        // }
    };

    const [accData, setAccData] = useState([]);

    useEffect(() => {
        // perform get request to check if user is already registered
        async function fetchData() {
            try {
                // console.log("Fetching data for user:", user.email);
                const response = await api.get(
                    `${backendURL}/accomodationpasses/?user=${user.user_id}`
                );
                if (response.status === 200) {
                    let data = response.data;
                    // console.log(data);
                    setAccData(data);
                    if (data.length > 0) {
                        navigate("/buy-pass", { replace: true });
                        document.getElementById("acc-success").style.display =
                            "flex";
                        document.getElementsByClassName(
                            "acc-container"
                        )[0].style.justifyContent = "flex-start";
                        document.getElementsByClassName(
                            "acc-container-left"
                        )[0].style.visibility = "hidden";
                        document.getElementsByClassName(
                            "acc-container-right"
                        )[0].style.visibility = "hidden";

                        if (paymentPending(data)) {
                            let x = document.getElementById("acc-pay-options");
                            // console.log(x);
                            if (x.style.display === "none") {
                                x.style.display = "flex";
                            }
                        } else if (data.length > 0) {
                            document.getElementById(
                                "acc-pay-options"
                            ).style.display = "none";
                        }
                    }
                    // console.log(data);
                    else {
                        document.getElementById("acc-success").style.display =
                            "none";
                    }
                    // console.log(userData
                } else {
                    // console.log(response)
                    // toast.error("Error: " + response.statusText);
                }
            } catch (error) {
                console.log("Error:", error);
            }
        }

        if (user !== null) {
            // console.log("Fetching data for user:", user.email)
            fetchData();
        } else {
            document.getElementById("acc-success").style.display = "none";
        }
    }, []);

    useEffect(() => {
        document.getElementById("acc-upi").style.display = "none";
    }, [accData]);

    // useEffect(() => {
    //     console.log(accData);
    // }, [accData]);

    function paymentPending(data) {
        if (data.length > 0) {
            for (let i = 0; i < data.length; i++) {
                if (data[i].pass_type === 0) {
                    return true;
                }
            }
            return false;
        } else {
            return false;
        }
    }

    function showUPI() {
        document.getElementById("acc-upi").style.display = "flex";
        document.getElementById("acc-success").style.display = "none";
    }

    function hideUPI() {
        document.getElementById("acc-upi").style.display = "none";
        document.getElementById("acc-success").style.display = "flex";
    }

    const [selectedFile, setSelectedFile] = useState(null);

    const onFileChange = (event) => {
        // Update the state
        setSelectedFile(event.target.files[0]);
    };

    const onFileUpload = () => {
        async function postImage() {
            try {
                // console.log("Fetching data for user:", user.email);
                // console.log(selectedFile);
                const formData = new FormData();
                formData.append("email", user.email);
                formData.append("payment_ss", selectedFile);
                const response = await api.post(
                    `${backendURL}/uploadss/`,
                    formData
                );

                if (response.status === 200) {
                    const data = response.data;
                    // console.log(data);
                    hideUPI();
                } else {
                    console.log("Error:", response.statusText);
                }
            } catch (err) {
                console.log(err);
            }
        }

        const myPromise = new Promise((resolve, reject) => {
            postImage()
                .then((res) => {
                    // console.log(res);
                    resolve(res);
                })
                .catch((err) => {
                    console.log(err);
                    reject(err);
                });
        });

        toast.promise(myPromise, {
            pending: "Uploading...",
            success: "Uploaded successfully!",
            error: {
                render: ({ data }) => {
                    return "Something went wrong!";
                },
            },
        });
    };

    // function fileData() {
    //     if (selectedFile) {
    //         return (
    //             <div>
    //                 <p>File Name: {selectedFile.name}</p>

    //                 {/* <p>File Type: {selectedFile.type}</p> */}

    //                 {/* <p>
    //                     Last Modified:{" "}
    //                     {
    //                         // take only date and time
    //                         Date(selectedFile.lastModified).split("GMT")[0]
    //                     }
    //                 </p> */}
    //             </div>
    //         );
    //     } else {
    //         return (
    //             <></>
    //         );
    //     }
    // }

    return (
        <FadeIn duration={500}>
            <div className="acc-form-main">
                <div className="acc-container">
                    <div id="acc-upi">
                        <div id="acc-upi-info">
                            <div className="acc-upi-top">
                                <img src={qr} alt="qr" id="acc-upi-qr" />
                                <div>
                                    Please scan the QR code to pay. Once you
                                    have paid, please attach the{" "}
                                    <span style={{ color: "whitesmoke" }}>
                                        screenshot
                                    </span>{" "}
                                    of the payment below.
                                </div>
                            </div>
                            <div className="acc-upi-bottom">
                                {/* {fileData()} */}

                                <div className="acc-upi-upload">
                                    <input
                                        type="file"
                                        onChange={onFileChange}
                                        accept="image/*"
                                        id="acc-payment-ss"
                                    />
                                </div>
                                {/* back button */}
                                <div className="acc-upi-back">
                                    <button
                                        onClick={hideUPI}
                                        className="acc-pay-button"
                                    >
                                        Back
                                    </button>
                                </div>
                            </div>
                        </div>

                        {selectedFile && (
                            <div id="acc-payment-preview">
                                <img
                                    src={URL.createObjectURL(selectedFile)}
                                    alt="payment screenshot"
                                />
                                <button
                                    onClick={onFileUpload}
                                    className="acc-pay-button"
                                >
                                    Upload!
                                </button>
                            </div>
                        )}
                    </div>
                    <div id="acc-success" className="acc-success">
                        <div>
                            Congratulations! You are now eligible for the Early
                            Bird discount! Please select the Jumbo Pass option
                            in the payment checkout form which includes
                            accommodation at 50% discount and Cultural Night
                            pass, all for ₹ 999 only!<br></br>
                            <br></br>
                            Note:
                            <ul>
                                <li>
                                    Don't forget to enter your CA referral code
                                    (if you have one) in the payment checkout
                                    form.
                                </li>
                                <li>
                                    The Early Bird discount is only for a few
                                    days, so inform your friends to register as
                                    soon as possible!
                                </li>
                                <li>
                                    If you have recently paid for the pass, it
                                    will be reflected on the website within a
                                    day.
                                </li>
                            </ul>
                        </div>
                        <table id="acc-table">
                            <tbody>
                                <tr>
                                    <th>Pass Type</th>
                                    <th>Accommodation Fees</th>
                                    <th>Cultural Night Fees</th>
                                    <th>Total</th>
                                </tr>
                                <tr>
                                    <td>Accommodation Pass</td>
                                    <td>999 INR</td>
                                    <td>Not Included</td>
                                    <td>999 INR *</td>
                                </tr>
                                <tr>
                                    <td>Cultural Night Pass</td>
                                    <td>Not Included</td>
                                    <td>499 INR</td>
                                    <td>499 INR *</td>
                                </tr>
                                <tr>
                                    <td>Jumbo Pack</td>
                                    <td>500 INR</td>
                                    <td>499 INR</td>
                                    <td>999 INR *</td>
                                </tr>
                            </tbody>
                        </table>
                        * The prices mentioned are exclusive of GST. Nominal GST
                        charges will be applied.
                        <div id="acc-pay-options">
                            <Link
                                to="/buy-pass"
                            >
                                <button
                                    type="submit"
                                    // disabled
                                    className="acc-pay-button"
                                >
                                    Buy pass now!!
                                    {/* Coming Soon! */}
                                </button>
                            </Link>
                            {/* <button
                                type="submit"
                                className="acc-pay-button"
                                onClick={showUPI}
                            >
                                Pay using UPI
                            </button> */}
                        </div>
                        {/* <Link to="/accommodation"> */}
                        {/* insert link to pdf */}
                        <a href={accPdf} target="_blank">
                            How to pay?
                        </a>
                    </div>
                    <div className="acc-container-left">
                        <img src={signInImg} alt="sign in" />
                    </div>
                    <div className="acc-container-right">
                        <div className="acc-container-right-title">
                            Register for Accommodation
                        </div>
                        <form className="acc-form" onSubmit={handleSubmit}>
                            <input
                                type="text"
                                name="full_name"
                                placeholder="Full Name (as on Aadhar Card) *"
                                required
                            />
                            <input
                                type="text"
                                name="aadhar"
                                placeholder="Aadhar Card Number (without spaces)*"
                                pattern="[2-9]{1}[0-9]{11}"
                                required
                            />
                            <input
                                type="text"
                                name="dob"
                                placeholder="Date of Birth *"
                                required
                                onFocus={(e) => (e.target.type = "date")}
                                onBlur={(e) => {
                                    if (e.target.value === "") {
                                        e.target.type = "text";
                                    } else {
                                        e.target.type = "date";
                                    }
                                }}
                            />
                            <input
                                type="text"
                                name="address"
                                placeholder="Full Address *"
                                required
                            />
                            <input
                                type="submit"
                                value="Submit"
                                id="acc-form-submit"
                            />
                            <br />
                        </form>
                    </div>
                </div>
            </div>
        </FadeIn>
    );
}

export default AccForm;
