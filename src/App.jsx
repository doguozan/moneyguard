import { Routes, Route, Navigate } from "react-router-dom";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import clsx from "clsx";
import DashboardPage from "./pages/DashboardPage/DashboardPage";
import Statistics from "./components/Statistics/Statistics";
import LoginPage from "./pages/LoginPage/LoginPage";
import RegistrationPage from "./pages/RegistrationPage/RegistrationPage";
import ModalAddTransaction from "./components/ModalAddTransaction/ModalAddTransaction";
import ModalEditTransaction from "./components/ModalEditTransaction/ModalEditTransaction";
import Currency from "./components/Currency/Currency";
import PublicRoute from "./routes/PublicRoute";
import PrivateRoute from "./routes/PrivateRoute";
import { getTransactionsCategories } from "./redux/Statistics/operations";
import {
  selectIsAddModalOpen,
  selectIsEditModalOpen,
} from "./redux/Modals/slice";
import { selectIsLoggedIn } from "./redux/Auth/selectors";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import "./App.css";

function App() {
  const dispatch = useDispatch();
  const isMobile = window.innerWidth <= 768;

  const isEditOpen = useSelector(selectIsEditModalOpen);
  const isAddOpen = useSelector(selectIsAddModalOpen);
  const isLoggedIn = useSelector(selectIsLoggedIn);

  useEffect(() => {
    if (isLoggedIn) {
      dispatch(getTransactionsCategories());
    }
  }, [dispatch, isLoggedIn]);

  return (
    <div className={clsx("app", (isEditOpen || isAddOpen) && "block-scroll")}>
      <Routes>
        <Route element={<PublicRoute restricted={true} />}>
          <Route path="/register" element={<RegistrationPage />} />
          <Route path="/login" element={<LoginPage />} />
        </Route>

        <Route element={<PrivateRoute />}>
          <Route path="/" element={<DashboardPage />} />
          <Route path="/dashboard" element={<DashboardPage />} />
          <Route path="/statistics" element={<Statistics />} />
          {isMobile && <Route path="/currency" element={<Currency />} />}
        </Route>

        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>

      <ToastContainer
        position="top-right"
        autoClose={3000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="dark"
      />
    </div>
  );
}

export default App;
