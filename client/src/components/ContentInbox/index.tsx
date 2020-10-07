// This is the container for viewing Content in inbox-style (list on left side,
// details on right) -- used in Topics/Shelves
import React, { useState, useEffect } from "react";
import _ from "lodash";
import { useHistory } from "react-router-dom";
import classnames from "classnames/bind";
// Components
import { FiArrowLeft, FiMoreVertical } from "react-icons/fi";
import {
  AppMainContainer,
  AppHeaderContainer,
  AppContentContainer,
  AppContentList,
  AppContentDetails,
} from "../AppContainers";
import AppContentListCard from "../AppContentListCard";
import ContentFlow from "../../pages/Content/ContentFlow";
import Dropdown from "react-bootstrap/Dropdown";
// Styling
import styles from "./ContentInbox.module.css";

export interface OptionsDropdownItemType {
  type: "item" | "divider";
  title?: string;
  onClick?: () => void;
}

interface ContentInboxProps {
  title: string;
  isLoading?: boolean;
  isError?: boolean;
  contentData?: any;
  showOptionsDropdown?: boolean;
  optionsDropdownMenu?: OptionsDropdownItemType[];
  className?: string; // Class for parent container (AppMainContainer)
  backButtonStyle?: string;
}

interface ContentData {
  _id: string;
  name: string;
  thumbnailUrl?: string;
}

const cx = classnames.bind(styles);
const defaultDropdownMenu: OptionsDropdownItemType[] = [
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
    onClick: () => console.log("delete"),
  },
];

const ContentInbox = ({
  title,
  isLoading,
  isError,
  contentData,
  showOptionsDropdown = false,
  optionsDropdownMenu = defaultDropdownMenu,
  className,
  backButtonStyle,
}: ContentInboxProps) => {
  const history = useHistory();

  const [currentContent, setCurrentContent] = useState<any>(null);

  // Okay there's this weird bug where the Inbox keeps moving to the first item
  // if I go to a different tab, or go off screen, or even open Inspector and close
  // it, but ONLY for Shelves, not for Topics. Must be something from changing data,
  // but can't seem to find it. Adding the second condition fixes it. :S
  // Nevermind went back to old one bec data wouldn't update instantly after
  // changes (does in Shelves, doesn't in Topics??)
  useEffect(() => {
    if (!_.isEmpty(contentData)) {
      setCurrentContent(contentData[0]);
    }
  }, [contentData]);

  return (
    <AppMainContainer variant="inbox" className={className}>
      <AppHeaderContainer>
        <div style={{ display: "flex" }}>
          <div onClick={() => history.goBack()}>
            <FiArrowLeft
              size={24}
              className={cx({ backBtn: true }, backButtonStyle)}
            />
          </div>
          {/* If topicName exists, show that immediately. Otherwise wait for data to load */}
          <h2>{title}</h2>
        </div>
        {/* Show 3-dot options menu with dropdown for additional options */}
        {showOptionsDropdown ? (
          <div className={styles.optionsDropdown}>
            <Dropdown alignRight={true} drop="down">
              <Dropdown.Toggle
                id={`${title}-page-more-dropdown`}
                className={styles.dropdownToggle}
                as="div"
              >
                <FiMoreVertical size={24} />
              </Dropdown.Toggle>
              <Dropdown.Menu>
                {/* Create dropdown menu by mapping through passed items. Allows for custom menus. */}
                {optionsDropdownMenu.map((item, index) => {
                  if (item.type === "divider") {
                    return <Dropdown.Divider key={index} />;
                  } else {
                    return (
                      <Dropdown.Item key={index} onClick={item.onClick}>
                        {item.title}
                      </Dropdown.Item>
                    );
                  }
                })}
              </Dropdown.Menu>
            </Dropdown>
          </div>
        ) : null}
      </AppHeaderContainer>
      <AppContentContainer variant="inbox">
        <AppContentList>
          {contentData?.map(
            ({ _id, name, thumbnailUrl }: ContentData, index: number) => (
              <AppContentListCard
                name={name}
                thumbnailUrl={thumbnailUrl}
                onClick={() => setCurrentContent(contentData[index])}
                isActive={_id === currentContent?._id}
                key={_id}
              />
            )
          )}
        </AppContentList>
        <AppContentDetails>
          <ContentFlow
            variant="inbox"
            id={currentContent?._id}
            title={currentContent?.name}
            type={currentContent?.type}
            authors={currentContent?.authors}
            // source={currentContent?.videoInfo?.source}
            source={currentContent?.source}
            // mediaId={currentContent?.videoInfo?.videoId}
            mediaId={currentContent?.sourceId}
            thumbnailUrl={currentContent?.thumbnailUrl}
            description={currentContent?.description}
            // hasQuiz={currentContent?.isOnNewtContentDatabase ?? false}
            hasQuiz={false} // Don't show for now
          />
        </AppContentDetails>
      </AppContentContainer>
    </AppMainContainer>
  );
};

export default ContentInbox;
