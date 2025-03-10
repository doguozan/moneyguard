import { useSelector } from "react-redux";
import { selectIsEditModalOpen, selectIsAddModalOpen } from "../../redux/Modals/slice";
import styles from "./DashboardPage.module.css";
import Header from "../../components/Header/Header";
import HomeTab from "../../components/HomeTab/HomeTab";
import ButtonAddTransactions from "../../components/ButtonAddTransactions/ButtonAddTransactions";
import Navigation from "../../components/Navigation/Navigation";
import useMedia from "../../hooks/useMedia";
import ModalAddTransaction from "../../components/ModalAddTransaction/ModalAddTransaction";
import ModalEditTransaction from "../../components/ModalEditTransaction/ModalEditTransaction";

const DashboardPage = () => {
  const { isMobile } = useMedia();
  const isEditOpen = useSelector(selectIsEditModalOpen);
  const isAddOpen = useSelector(selectIsAddModalOpen);

  return (
    <div className={styles.dashboardPage}>
      <Header />
      {isMobile && <Navigation />}
      <div className={styles.container}>
        <HomeTab />
        <ButtonAddTransactions />
      </div>
      {isAddOpen && <ModalAddTransaction />}
      {isEditOpen && <ModalEditTransaction />}
    </div>
  );
};

export default DashboardPage;
