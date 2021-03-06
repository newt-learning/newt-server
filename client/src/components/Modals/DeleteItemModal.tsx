import React from "react";
import _ from "lodash";
import Modal from "react-bootstrap/Modal";
import Button from "../Button";

interface DeleteItemModalProps {
  show: boolean;
  onHide: () => void;
  itemToDelete?: string;
  onDelete: () => void;
  isDeleting?: boolean;
}

const DeleteItemModal = ({
  show,
  onHide,
  itemToDelete = "item",
  onDelete,
  isDeleting,
}: DeleteItemModalProps) => (
  <Modal show={show} onHide={onHide}>
    <Modal.Header closeButton>
      <Modal.Title>Delete {_.capitalize(itemToDelete)}</Modal.Title>
    </Modal.Header>
    <Modal.Body>
      Are you sure you want to delete this {itemToDelete}?
    </Modal.Body>
    <Modal.Footer>
      <Button category="secondary" onClick={onHide}>
        Close
      </Button>
      <Button category="danger" onClick={onDelete} isLoading={isDeleting}>
        Delete
      </Button>
    </Modal.Footer>
  </Modal>
);

DeleteItemModal.defaultProps = {
  isDeleting: false,
};

export default DeleteItemModal;
