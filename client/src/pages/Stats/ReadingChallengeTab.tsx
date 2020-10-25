import React, { useState } from "react";
import _ from "lodash";
// API
import { useFetchChallenges, useDeleteChallenge } from "../../api/challenges";
// Components
import {
  ContentCard,
  Button,
  OptionsDropdown,
  DeleteItemModal,
} from "../../components";
import ReadingChallengeForm from "./ReadingChallengeForm";
import { CircularProgressbar } from "react-circular-progressbar";
import Modal from "react-bootstrap/Modal";
// Styling
import "react-circular-progressbar/dist/styles.css";
import styles from "./Stats.module.css";
// Types
import { OptionsDropdownItemType } from "../../components/OptionsDropdown";

const ReadingChallengeTab = () => {
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);

  const { isLoading, data: allChallengesData } = useFetchChallenges();
  const [deleteChallenge] = useDeleteChallenge();

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
            <ReadingChallengeForm
              onSubmit={(values: any) => console.log(values)}
            />
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

  const dropdownMenu: OptionsDropdownItemType[] = [
    {
      type: "item",
      title: "Edit",
      onClick: () => console.log("edit"),
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
          {!_.isEmpty(itemsFinished)
            ? itemsFinished.map((item: any) => {
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
