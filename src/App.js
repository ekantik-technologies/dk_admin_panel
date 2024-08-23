import { BrowserRouter as Router, Route, Routes, Navigate } from "react-router-dom";
import PrivateRoute from "./components/PrivateRoute";
import Sidebar from "./components/Sidebar/Sidebar";
import Dashboard from "./pages/Dashboard";
import Login from "./pages/Login";
import UserSetting from "./pages/UserSetting";
import Client from "./pages/Client";
import Configuration from "./pages/Configuration";
import Inventory from "./pages/Inventory";
import Product from "./pages/Product";
import Loader from "./components/Loader/Loader";

function App() {
    return (
        <>
            <Loader />

            <Router>
                <div className="flex">
                    <Sidebar />

                    <div className="flex-1 p-4">
                        <Routes>
                            <Route path="/login" element={<Login />} />

                            <Route
                                path="/dashboard"
                                element={
                                    <PrivateRoute>
                                        <Dashboard />
                                    </PrivateRoute>
                                }
                            />

                            <Route
                                path="/user-setting"
                                element={
                                    <PrivateRoute>
                                        <UserSetting />
                                    </PrivateRoute>
                                }
                            />

                            <Route
                                path="/client"
                                element={
                                    <PrivateRoute>
                                        <Client />
                                    </PrivateRoute>
                                }
                            />

                            <Route
                                path="/configuration"
                                element={
                                    <PrivateRoute>
                                        <Configuration />
                                    </PrivateRoute>
                                }
                            />

                            <Route
                                path="/inventory"
                                element={
                                    <PrivateRoute>
                                        <Inventory />
                                    </PrivateRoute>
                                }
                            />

                            <Route
                                path="/product"
                                element={
                                    <PrivateRoute>
                                        <Product />
                                    </PrivateRoute>
                                }
                            />
                            <Route path="*" element={<Navigate to="/login" replace />} />
                        </Routes>
                    </div>
                </div>
            </Router>
        </>
    );
}

export default App;
