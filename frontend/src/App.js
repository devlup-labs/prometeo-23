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
import CompleteProfile from "./pages/completeProfile";
import Tnc from "./pages/tnc";
import PP from "./pages/privacy_policy";
import NewGallery from "./pages/newNewGallery";
import AccForm from "./pages/accForm";
import Robowar from "./pages/robowar";
import DroneRace from "./pages/drone_race";
import Event_createTeam from "./pages/event_createTeam";
import Event_joinTeam from "./pages/event_joinTeam";
import Robowar_createTeam from "./pages/robowar_createTeam";
import Robowar_joinTeam from "./pages/robowar_joinTeam";

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

                        {/* <Route path="/robowars" element={<Robowar />} /> */}
                        {/* <Route path="/drone-race" element={<DroneRace />} /> */}


                        <Route path="/past-speakers" element={<Speaker />} />
                        <Route path="/gallery" element={<NewGallery />} />
                        <Route path="/past-sponsors" element={<Sponsors />} />
                        <Route path="/competitions" element={<Events />} />
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

                        <Route
                            exact
                            path="/complete-profile"
                            element={<PrivateRoute />}
                        >
                            <Route
                                exact
                                path="/complete-profile"
                                element={<CompleteProfile />}
                            />
                        </Route>
                        {/* <Route exact path='/create-team' element={<PrivateRoute />}>
                            <Route exact path='/create-team' element={<Event_createTeam />} />
                        </Route>

                        <Route exact path='/join-team' element={<PrivateRoute />}>
                            <Route exact path='/join-team' element={<Event_joinTeam />} />
                        </Route> */}

                        {/* <Route exact path='/robowars-create-team' element={<PrivateRoute />}>
                            <Route exact path='/robowars-create-team' element={<Robowar_createTeam />} />
                        </Route>

                        <Route exact path='/robowars-join-team' element={<PrivateRoute />}>
                            <Route exact path='/robowars-join-team' element={<Robowar_joinTeam />} />
                        </Route> */}

                        <Route path="/*" element={<Page_404 />} />
                    </Routes>
                    <ToastContainer theme="dark" />
                </AuthProvider>
            </div>
        </Router>
    );
}

export default App;
