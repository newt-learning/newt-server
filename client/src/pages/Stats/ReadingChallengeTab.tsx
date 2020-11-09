import React, { useState, useMemo } from "react";
import _ from "lodash";
// API
import {
  useFetchChallenges,
  useCreateChallenge,
  useDeleteChallenge,
  useUpdateChallenge,
} from "../../api/challenges";
// Components
import {
  ContentCard,
  Button,
  OptionsDropdown,
  DeleteItemModal,
} from "../../components";
import ReadingChallengeForm, {
  ReadingChallengeFormValues,
} from "./ReadingChallengeForm";
import { CircularProgressbar } from "react-circular-progressbar";
import Modal from "react-bootstrap/Modal";
// Styling
import "react-circular-progressbar/dist/styles.css";
import styles from "./Stats.module.css";
// Helpers
import { orderByFinishDate } from "../Shelves/helpers";
// Types
import { OptionsDropdownItemType } from "../../components/OptionsDropdown";

const ReadingChallengeTab = () => {
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);

  const { isLoading, data: allChallengesData } = useFetchChallenges();
  const [createChallenge] = useCreateChallenge();
  const [updateChallenge] = useUpdateChallenge();
  const [deleteChallenge] = useDeleteChallenge();

  const handleCreateChallenge = (values: ReadingChallengeFormValues) => {
    const data = {
      contentTypes: ["book"],
      challengeType: "reading",
      totalItems: Number(values.totalItems),
    };

    createChallenge(data);
    setShowCreateModal(false);
  };

  const readingChallengeData = _.filter(allChallengesData, {
    challengeType: "reading",
  });

  if (isLoading) {
    return <div>Loading...</div>;
  }

  // Return this (UI to create one) is no reading challenge data exists
  if (_.isEmpty(readingChallengeData)) {
    return (
      <>
        <div
          style={{
            height: "400px",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <Button category="success" onClick={() => setShowCreateModal(true)}>
            Create Reading Challenge
          </Button>
        </div>
        <Modal
          show={showCreateModal}
          onHide={() => setShowCreateModal(false)}
          size="lg"
          backdrop="static"
          animation={false}
        >
          <Modal.Header closeButton>
            <Modal.Title>Create Reading Challenge</Modal.Title>
          </Modal.Header>
          <Modal.Body
            style={{
              display: "flex",
              flexDirection: "column",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <ReadingChallengeForm onSubmit={handleCreateChallenge} />
          </Modal.Body>
        </Modal>
      </>
    );
  }

  const {
    _id,
    numItemsFinished,
    totalItems,
    itemsFinished,
  } = readingChallengeData[0];
  const progress = numItemsFinished / totalItems;
  const finishedFraction = `${numItemsFinished} / ${totalItems}`;

  // Sort items by finish data (should really be done server-side, eh?)
  const sortedItemsFinished = orderByFinishDate(itemsFinished, "asc");

  const dropdownMenu: OptionsDropdownItemType[] = [
    {
      type: "item",
      title: "Edit",
      onClick: () => setShowEditModal(true),
    },
    {
      type: "divider",
    },
    {
      type: "item",
      title: "Delete",
      onClick: () => setShowDeleteModal(true),
    },
  ];

  const handleEditChallenge = (values: ReadingChallengeFormValues) => {
    updateChallenge({
      challengeId: _id,
      data: { totalItems: Number(values.totalItems) },
    });
    setShowEditModal(false);
  };
  const handleDeleteChallenge = () => {
    deleteChallenge(_id);
    setShowDeleteModal(false);
  };

  return (
    <>
      <div style={{ display: "flex", justifyContent: "flex-end" }}>
        <OptionsDropdown
          id="reading-challenge-dropdown"
          options={dropdownMenu}
        />
      </div>
      <div className={styles.challengeProgressContainer}>
        <div style={{ width: 225, height: 225 }}>
          <CircularProgressbar
            value={progress}
            maxValue={1}
            text={finishedFraction}
            styles={{
              path: {
                stroke: "#1089ff",
                transition: "stroke-dashoffset 0.5s ease 0s",
              },
              trail: { stroke: "#e2e8f0" },
              text: { fill: "#1089ff", fontSize: "12px" },
            }}
          />
        </div>
      </div>
      {/* Show finished boooks */}
      <div className={styles.finishedItemsContainer}>
        <h4 className={styles.header}>Completed books</h4>
        <div className={styles.finishedItems}>
          {!_.isEmpty(sortedItemsFinished)
            ? sortedItemsFinished.map((item: any) => {
                const { startFinishDates } = item;
                const latestDateCompleted = !_.isEmpty(startFinishDates)
                  ? startFinishDates[startFinishDates.length - 1].dateCompleted
                  : null;

                return (
                  <ContentCard
                    key={item._id}
                    size="small"
                    title={item.name}
                    authors={item.authors}
                    thumbnailUrl={item.thumbnailUrl}
                    dateCompleted={latestDateCompleted}
                  />
                );
              })
            : null}
        </div>
      </div>
      <Modal
        show={showEditModal}
        onHide={() => setShowEditModal(false)}
        size="lg"
        backdrop="static"
        animation={false}
      >
        <Modal.Header closeButton>
          <Modal.Title>Edit Reading Challenge</Modal.Title>
        </Modal.Header>
        <Modal.Body
          style={{
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <ReadingChallengeForm
            initialValues={{ totalItems }}
            onSubmit={handleEditChallenge}
            buttonTitle="Edit"
            buttonCategory="secondary"
          />
        </Modal.Body>
      </Modal>
      <DeleteItemModal
        show={showDeleteModal}
        onHide={() => setShowDeleteModal(false)}
        itemToDelete="challenge"
        onDelete={handleDeleteChallenge}
      />
    </>
  );
};

export default ReadingChallengeTab;
