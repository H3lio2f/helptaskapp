import { Container } from "../../styles/addCard";
import { useGlobal } from "../../utils/contexts/global";
import ButtonImportExcel from "../Buttons/importExcel";
import FormNewImportExcel from "../FormNewImportExcel";
import Portal from "../Portal/Portal";

export default function FormClientConfig() {
  const { isOpenImportExcel, setIsOpenImportExcel } = useGlobal();
  const handlePortalImportExcel = () => {
    setIsOpenImportExcel(true);
  };
  return (
    <Container>
      <Portal isOpen={isOpenImportExcel} setIsOpen={setIsOpenImportExcel}>
        <label>Adicionar novo canal de recepção</label>
        <FormNewImportExcel />
      </Portal>
      <div className="form-group first-group">
        <div className="config-section">
          <label>Importar clientes</label>
          <div></div>
        </div>
        <div className="line"></div>
        <div className="config-list import-list">
          <ButtonImportExcel
            handlePortalImportExcel={handlePortalImportExcel}
          />
          {/* <ButtonImportSQL /> */}
        </div>
      </div>
    </Container>
  );
}
