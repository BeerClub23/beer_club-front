import { Dialog, DialogTitle, DialogContent } from "@mui/material";
import EditRecommendationForm from "./EditRecommendationForm";
const RecommendationModal = ({
  editingRowData,
  onClose,
  isModalOpen,
  onSave,
}) => {
  const handleSave = (formData) => {
    // Call the onSave function passed from props
    onSave(formData, editingRowData?.id);
    onClose();
  };
  return (
    <Dialog
      fullWidth
      maxWidth="sm"
      className="modal-form-container"
      open={isModalOpen}
      onClose={onClose}
    >
      <DialogTitle>Editar recomendación</DialogTitle>
      <DialogContent>
        <EditRecommendationForm
          initialData={editingRowData}
          onClose={onClose}
          onSave={handleSave}
        />
      </DialogContent>
    </Dialog>
  );
};

export default RecommendationModal;
