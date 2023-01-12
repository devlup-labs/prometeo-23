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
import Speaker from "./pages/Speakers/speaker";
import Gallery from "./pages/Gallery/newGallery";
import NewGallery from "./pages/Gallery/newNewGallery";
import Sponsors from "./pages/Sponsors/sponsors";
import Workshop from "./pages/workshop";
import Moonshot from "./pages/moonshot";
import PanelDiscussion from "./pages/panel";
import Theme from "./components/Theme";
import Team from "./pages/Team/newTeam";
import CA from "./pages/ca";
import Accommodation from "./pages/Accommodation/accomodation";
import AccForm from "./pages/Accommodation/accForm";

import Events from "./pages/Competitions/Event.js";
import EventDetails from "./pages/Competitions/Event_details";
import Competitions_Rulebook from "./pages/Competitions/competitionsRulebook";
import WorkshopDetails from "./pages/workshop_details";
import Event_createTeam from "./pages/Competitions/event_createTeam";
import Event_joinTeam from "./pages/Competitions/event_joinTeam";

import Robowar from "./pages/Events/Robowars/robowar";
import Robowar_createTeam from "./pages/Events/Robowars/robowar_createTeam";
import Robowar_joinTeam from "./pages/Events/Robowars/robowar_joinTeam";
import DroneRace from "./pages/Events/Drone_Race/drone_race";
import Dronerace_Register from "./pages/Events/Drone_Race/dronerace_register";

import BuyPass from "./pages/pass/buyPass";
import Register from "./pages/Register.js";
import PreRegistration from "./pages/preRegistration";
import Login from "./pages/Login.js";
import SignUp from "./pages/SignUp";
import Dashboard from "./pages/dashboard";
import CompleteProfile from "./pages/completeProfile";

import Tnc from "./pages/tnc";
import PP from "./pages/privacy_policy";

import Page_404 from "./pages/404";

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
                        <Route path="/past-speakers" element={<Speaker />} />
                        <Route path="/gallery" element={<NewGallery />} />
                        <Route path="/past-sponsors" element={<Sponsors />} />
                        <Route path="/team" element={<Team />} />
                        <Route path="/campus-ambassador" element={<CA />} />
                        <Route
                            path="/accommodation"
                            element={<Accommodation />}
                        />
                        <Route path="/workshop" element={<Workshop />} />
                        <Route path="/moonshot" element={<Moonshot />} />
                        <Route path="/panel-discussion" element={<PanelDiscussion />} />
                        <Route path="/competitions" element={<Events />} />
                        <Route
                            path="/event-details"
                            element={<EventDetails />}
                        />
                        {/* <Route path="/competition-rulebook" element={<Competitions_Rulebook />} /> */}
                        <Route
                            path="/workshop-details"
                            element={<WorkshopDetails />}
                        />
                        {/* <Route exact path='/create-team' element={<PrivateRoute />}>
                            <Route exact path='/create-team' element={<Event_createTeam />} />
                        </Route>
                        <Route exact path='/join-team' element={<PrivateRoute />}>
                            <Route exact path='/join-team' element={<Event_joinTeam />} />
                        </Route> */}
                        <Route path="/robowars" element={<Robowar />} />
                        <Route
                            exact
                            path="/accommodation-registration"
                            element={<PrivateRoute />}
                        >
                            <Route
                                path="/accommodation-registration"
                                element={<AccForm />}
                            />
                        </Route>
                        <Route
                            exact
                            path="/robowars-create-team"
                            element={<PrivateRoute />}
                        >
                            <Route
                                exact
                                path="/robowars-create-team"
                                element={<Robowar_createTeam />}
                            />
                        </Route>
                        <Route
                            exact
                            path="/robowars-join-team"
                            element={<PrivateRoute />}
                        >
                            <Route
                                exact
                                path="/robowars-join-team"
                                element={<Robowar_joinTeam />}
                            />
                        </Route>
                        <Route path="/dronerace" element={<DroneRace />} />
                        <Route
                            exact
                            path="/dronerace-payment"
                            element={<PrivateRoute />}
                        >
                            <Route
                                exact
                                path="/dronerace-payment"
                                element={<Dronerace_Register />}
                            />
                        </Route>

                        <Route 
                            exact
                            path="/buy-pass"
                            element={<BuyPass />}
                        />
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
                            path="/complete-profile"
                            element={<PrivateRoute />}
                        >
                            <Route
                                exact
                                path="/complete-profile"
                                element={<CompleteProfile />}
                            />
                        </Route>
                        <Route path="/tnc" element={<Tnc />} />
                        <Route path="/privacy-policy" element={<PP />} />
                        w
                        <Route path="/*" element={<Page_404 />} />
                    </Routes>

                    <ToastContainer theme="dark" />
                </AuthProvider>
            </div>
        </Router>
    );
}

export default App;
