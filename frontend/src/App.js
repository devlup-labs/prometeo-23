import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { useState } from "react";

import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "./components/toast.css";

import "./App.css";

import { AuthProvider } from "./context/AuthContext";
import RestrictedRoute from "./context/RestrictedRoute";
import PrivateRoute from "./context/PrivateRoute";

import Navbar from "./components/navbar";
import HomePage from "./pages/homePage";
import Page_404 from "./pages/404";
import Speaker from "./pages/Speaker";
import Gallery from "./pages/newGallery";
import Sponsors from "./pages/Sponsors";
import Events from "./pages/Event.js";
import Register from "./pages/Register.js";
import PreRegistration from "./pages/preRegistration";
import Login from "./pages/Login.js";
import EventDetails from "./pages/Event_details";
import Theme from "./components/Theme";
import Team from "./pages/newTeam";
import CA from "./pages/ca";
import Accommodation from "./pages/accomodation";
import SignUp from "./pages/SignUp";
import Dashboard from "./pages/dashboard";
import Tnc from "./pages/tnc";
import PP from "./pages/privacy_policy";
import NewGallery from "./pages/newNewGallery";
import AccForm from "./pages/accForm";

function App() {
    // const [bigBang, setBigBang] = useState(true);

    return (
        <Router>
            <div className="App">
                <AuthProvider>
                    <Navbar />
                    <Routes>
                        <Route
                            path="/"
                            element={
                                <HomePage
                                // bb={bigBang}
                                // bbFunc={setBigBang}
                                />
                            }
                        />
                        <Route
                            path="/accommodation-registration"
                            element={<AccForm />}
                        />

                        <Route path="/past-speakers" element={<Speaker />} />
                        <Route path="/gallery" element={<NewGallery />} />
                        <Route path="/past-sponsors" element={<Sponsors />} />
                        <Route path="/events" element={<Events />} />
                        {/* <Route path="/theme" element={<Theme />} /> */}
                        {/* <Route path="/register" element={<Register />} /> */}
                        {/* <Route path="/login" element={<Login />} /> */}
                        <Route
                            path="/event-details"
                            element={<EventDetails />}
                        />
                        <Route path="/team" element={<Team />} />

                        <Route path="/campus-ambassador" element={<CA />} />
                        <Route
                            path="/accommodation"
                            element={<Accommodation />}
                        />
                        <Route path="/tnc" element={<Tnc />} />
                        <Route path="/privacy-policy" element={<PP />} />

                        {/* <Route exact path='/pre-register' element={<RestrictedRoute />} > */}
                        {/* <Route exact path='/pre-register' element={<PreRegistration />} /> */}
                        {/* </Route> */}

                        <Route
                            exact
                            path="/login"
                            element={<RestrictedRoute />}
                        >
                            <Route exact path="/login" element={<Login />} />
                        </Route>

                        <Route
                            exact
                            path="/sign-up"
                            element={<RestrictedRoute />}
                        >
                            <Route path="/sign-up" element={<SignUp />} />
                        </Route>

                        <Route
                            exact
                            path="/dashboard"
                            element={<PrivateRoute />}
                        >
                            <Route
                                exact
                                path="/dashboard"
                                element={<Dashboard />}
                            />
                        </Route>

                        <Route path="/*" element={<Page_404 />} />
                    </Routes>
                    <ToastContainer theme="dark" />
                </AuthProvider>
            </div>
        </Router>
    );
}

export default App;
