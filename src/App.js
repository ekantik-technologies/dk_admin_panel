import { BrowserRouter as Router, Route, Routes, Navigate } from "react-router-dom";
import PrivateRoute from "./components/PrivateRoute";
import Sidebar from "./components/Sidebar/Sidebar";
import Dashboard from "./pages/Dashboard/Dashboard";
import Login from "./pages/Login";
import UserSetting from "./pages/UserSetting";
import Client from "./pages/Client";
import Configuration from "./pages/Configuration";
import Inventory from "./pages/Inventory";
import Product from "./pages/Product";
import Loader from "./components/Loader/Loader";
import OrderStatus from "./pages/OrderStatus";
import RejectedOrder from "./pages/RejectedOrder/RejectedOrder";

function App() {
    return (
        <>
            <Loader />

            <Router>
                <Routes>
                    <Route path="/login" element={<Login />} />

                    <Route
                        path="*"
                        element={
                            <div className="flex">
                                <Sidebar />

                                <div className="flex-1 p-4 ml-64">
                                    <Routes>
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

                                        <Route
                                            path="/order-status"
                                            element={
                                                <PrivateRoute>
                                                    <OrderStatus />
                                                </PrivateRoute>
                                            }
                                        />

                                        <Route
                                            path="/rejected-order"
                                            element={
                                                <PrivateRoute>
                                                    <RejectedOrder />
                                                </PrivateRoute>
                                            }
                                        />

                                        <Route path="*" element={<Navigate to="/dashboard" replace />} />
                                    </Routes>
                                </div>
                            </div>
                        }
                    />
                </Routes>
            </Router>
        </>
    );
}

export default App;
