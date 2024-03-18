import { Sidebar, SubMenu, Menu, MenuItem } from "react-pro-sidebar";
import { useState, useEffect, useContext } from "react";
import { IoMdPlayCircle } from "react-icons/io";
import { Tab, Tabs, TabList, TabPanel } from "react-tabs";
import "react-tabs/style/react-tabs.css";
import { toast } from "react-toastify";
import { Digital } from "react-activity";
import { AuthContext } from "../../../../components/store/context/authContextProvider";
import { CallGetApiServicesWithTkn } from "../../../../utils/webServices/apiCalls";
import styles from "./contents.module.css";
import "./style.css";

function TechnicalContentPage() {
  const { isValidToken, token } = useContext(AuthContext);
  const [selectedCategory, setSelectedCategory] = useState("BASICS");
  const [selectedCategoryUpdate, setSelectedCategoryUpdate] =
    useState("BASICS");
  const [selectedCategoryLink, setSelectedCategoryLink] =
    useState("basicsContent");
  const [selectedContent, setSelectedContent] = useState(
    "What is stock trading ?"
  );
  const [selectedContentToDisplay, setSelectedContentToDisplay] =
    useState(null);
  const [IsLoading, setIsLoading] = useState(false);
  const [allContent, setAllContent] = useState(null);
  const [windowWidth, setWindowWidth] = useState(undefined);
  const [mainTopicsTechnicals, setMainTopicsTechnicals] = useState([
    {
      name: "BASICS",
      duration: `1hr:08 mins`,
      link: "basicsContent",
      content: [
        {
          name: "What is stock trading ?",
          duration: `15:29 mins`,
        },
        {
          name: "Fundamental vs Technical analysis",
          duration: `18:45 mins`,
        },
        {
          name: "Charts & Candlesticks ?",
          duration: `34:08 mins`,
        },
      ],
    },
    {
      name: "CORE",
      duration: `1hr:44 mins`,
      link: "coreContent",
      content: [
        {
          name: "what are support & resistance ?",
          duration: `47:41 mins`,
        },
        {
          name: "what are zones and how to identify it ?",
          duration: `20:45 mins`,
        },
        {
          name: "What is a trendline and how to draw a perfect trendline? ?",
          duration: `36:35 mins`,
        },
      ],
    },
    {
      name: "INDICATORS",
      duration: `1hr:43 mins`,
      link: "indicatorsContent",
      content: [
        {
          name: "what are lagging indicators ?",
          duration: "03:28 mins",
        },
        {
          name: "what are leading indicators ?",
          duration: "03:18 mins",
        },
        {
          name: "What is volume profile and how is it used ?",
          duration: "29:14 mins",
        },
        {
          name: "What is golden fibonacci rule ?",
          duration: "24:33 mins",
        },
        {
          name: "Relative strength index(RSI) and cheatsheet",
          duration: "26:19 mins",
        },
        {
          name: "Moving averages(9ma, 20ma, 50ma) and cheatsheet",
          duration: "17:26 mins",
        },
      ],
    },
    {
      name: "PATTERNS",
      duration: `4hr:22 mins`,
      link: "patternsContent",
      content: [
        {
          name: "What are patterns ?",
          duration: "07:27 mins",
        },
        {
          name: "Triangle patterns and cheatsheet",
          duration: "58:42 mins",
        },
        {
          name: "Channel patterns and cheatsheet",
          duration: "30:24 mins",
        },
        {
          name: "Flag patterns and cheatsheet",
          duration: "20:31 mins",
        },
        {
          name: "Wedge patterns and cheatsheet",
          duration: "33:05 mins",
        },
        {
          name: "Double top pattern and cheatsheet",
          duration: "29:11 mins",
        },
        {
          name: "Double bottom pattern and cheatsheet",
          duration: "18:08 mins",
        },
        {
          name: "Head & Shoulder pattern and cheatsheet",
          duration: "24:42 mins",
        },
        {
          name: "Inverse Head & Shoulder pattern and cheatsheet",
          duration: "21:17 mins",
        },
        {
          name: "Major patterns for living",
          duration: "19:32 mins",
        },
      ],
    },
    {
      name: "STARTEGIES",
      duration: `2hr:44 mins`,
      link: "strategiesContent",
      content: [
        {
          name: "Strategies for intraday",
          duration: "1:29:37 mins",
        },
        {
          name: "Strategies for swing",
          duration: "1:15:27 mins",
        },
      ],
    },
    {
      name: "MANAGE RISK",
      duration: `19:20 mins`,
      link: "riskManagementContent",
      content: [
        {
          name: "what is Position sizing ?",
          duration: "09:39 mins",
        },
        {
          name: "Risk/Reward",
          duration: "09:56 mins",
        },
      ],
    },
    {
      name: "BONUS",
      duration: `58:51 mins`,
      link: "bonusContent",
      content: [
        {
          name: "Breakout vs Fakeout",
          duration: "10:04 mins",
        },
        {
          name: "Perfect & Confluence entry",
          duration: "27:25 mins",
        },
        {
          name: "Trail your trade",
          duration: "21:18 mins",
        },
      ],
    },
  ]);

  useEffect(() => {
    const handleResize = () => {
      setWindowWidth(window.innerWidth);
    };

    setWindowWidth(window.innerWidth);
    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  function callCourseContent() {
    if (!isValidToken || !token) {
      return;
    }
    setIsLoading(true);
    CallGetApiServicesWithTkn(
      `/course/technical-course-content`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      },
      (response) => {
        if (response.status === 200) {
          setAllContent(response.data);
          setSelectedContentToDisplay(response.data.basicsContent[0]);
          setIsLoading(false);
        }
      },
      (err) => {
        setIsLoading(false);
        toast.error("Error fetching contents");
        console.log("err getting technical allCourseContents", err);
      }
    );
  }

  useEffect(() => {
    if (isValidToken && token) {
      callCourseContent();
    }
  }, [isValidToken, token]);

  function categoryHandler(name, linkName) {
    setSelectedCategory(name);
    setSelectedCategoryLink(linkName);
  }

  function contentHandler(name) {
    setSelectedContent(name);
    setSelectedCategoryUpdate(selectedCategory);
    if (allContent) {
      const filteredContent = allContent[selectedCategoryLink].find(
        (content) => content.name === name
      );
      setSelectedContentToDisplay(filteredContent);
    }
  }
  return (
    <div className={styles.course_main_container}>
      {windowWidth > 900 ? (
        <>
          <div className={styles.video_desc_cont}>
            <div className={styles.video_player_cont}>
              <div
                style={{
                  width: "100%",
                  height: "100%",
                }}
              >
                <iframe
                  src="https://player.vimeo.com/video/575809640?badge=0&amp;autopause=0&amp;player_id=0&amp;app_id=58479"
                  frameborder="0"
                  allow="autoplay; fullscreen; picture-in-picture; clipboard-write"
                  width="100%"
                  height="100%"
                  title="chartsandcandlesticks.mp4"
                ></iframe>
              </div>
            </div>
            <div className={styles.desc_cont}>
              <div className={styles.desc_card}>
                <span>{selectedCategoryUpdate || "NILL"}</span>
              </div>
              <div className={styles.desc_heading}>
                <span>{selectedContent || "NILL"}</span>
              </div>
              <div className={styles.desc_description}>
                <span>{selectedContentToDisplay?.pointOne || "Nill"}</span>
                <span>{selectedContentToDisplay?.pointTwo || "Nill"}</span>
                <span>{selectedContentToDisplay?.pointThree || "Nill"}</span>
              </div>
            </div>
          </div>
          <div className={styles.category_cont}>
            <Sidebar
              style={{
                width: "100%",
                borderColor: "#151718",
              }}
            >
              <Menu>
                {mainTopicsTechnicals.map((topic) => (
                  <SubMenu
                    rootStyles={{
                      backgroundColor: "#151718",
                      color: "#fff",
                      fontSize: "0.9rem",
                    }}
                    key={topic.name}
                    label={topic.name}
                    open={selectedCategory === topic.name}
                    onOpenChange={() => categoryHandler(topic.name, topic.link)}
                  >
                    {topic.content.map((subItem) => (
                      <MenuItem
                        icon={<IoMdPlayCircle size={20} color="#0c969a" />}
                        rootStyles={{
                          backgroundColor:
                            selectedContent === subItem.name
                              ? "#515354"
                              : "#313538",
                          color: "#fff",
                          height: "3.9rem",
                        }}
                        key={subItem.name}
                        onClick={() => contentHandler(subItem.name)}
                      >
                        <div className={styles.sub_item_cont}>
                          <span>{subItem.name}</span>
                          <span>{subItem.duration}</span>
                        </div>
                      </MenuItem>
                    ))}
                  </SubMenu>
                ))}
              </Menu>
            </Sidebar>
          </div>
        </>
      ) : (
        <>
          <div className={styles.video_desc_cont}>
            <div className={styles.video_player_cont}>
              <div
                style={{
                  width: "100%",
                  height: "100%",
                }}
              >
                <iframe
                  src="https://player.vimeo.com/video/565580804?badge=0&amp;autopause=0&amp;player_id=0&amp;app_id=58479"
                  frameborder="0"
                  allow="autoplay; fullscreen; picture-in-picture; clipboard-write"
                  width="100%"
                  height="100%"
                  title="whatisstocktrading.mp4"
                ></iframe>
              </div>
            </div>
            <Tabs defaultFocus={true}>
              <TabList>
                <Tab>contents</Tab>
                <Tab>description</Tab>
              </TabList>

              <TabPanel>
                <div className={styles.category_cont}>
                  <Sidebar
                    style={{
                      width: "100%",
                      borderColor: "#151718",
                    }}
                  >
                    <Menu>
                      {mainTopicsTechnicals.map((topic) => (
                        <SubMenu
                          rootStyles={{
                            backgroundColor: "#151718",
                            color: "#fff",
                            fontSize: "0.9rem",
                          }}
                          key={topic.name}
                          label={topic.name}
                          open={selectedCategory === topic.name}
                          onOpenChange={() =>
                            categoryHandler(topic.name, topic.link)
                          }
                        >
                          {topic.content.map((subItem) => (
                            <MenuItem
                              icon={
                                <IoMdPlayCircle size={20} color="#0c969a" />
                              }
                              rootStyles={{
                                backgroundColor:
                                  selectedContent === subItem.name
                                    ? "#6a6d6e"
                                    : "#313538",
                                color: "#fff",
                                height: "3.9rem",
                              }}
                              key={subItem.name}
                              onClick={() => contentHandler(subItem.name)}
                            >
                              <div className={styles.sub_item_cont}>
                                <span>{subItem.name}</span>
                                <span>{subItem.duration}</span>
                              </div>
                            </MenuItem>
                          ))}
                        </SubMenu>
                      ))}
                    </Menu>
                  </Sidebar>
                </div>
              </TabPanel>
              <TabPanel>
                <div className={styles.desc_cont}>
                  <div className={styles.desc_card}>
                    <span>{selectedCategoryUpdate || "NILL"}</span>
                  </div>
                  <div className={styles.desc_heading}>
                    <span>{selectedContent || "NILL"}</span>
                  </div>
                  <div className={styles.desc_description}>
                    <span>{selectedContentToDisplay?.pointOne || "Nill"}</span>
                    <span>{selectedContentToDisplay?.pointTwo || "Nill"}</span>
                    <span>
                      {selectedContentToDisplay?.pointThree || "Nill"}
                    </span>
                  </div>
                </div>
              </TabPanel>
            </Tabs>
          </div>
        </>
      )}
    </div>
  );
}

export default TechnicalContentPage;
