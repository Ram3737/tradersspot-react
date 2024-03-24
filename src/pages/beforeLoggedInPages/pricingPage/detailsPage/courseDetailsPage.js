import SheetsIcon from "../../../../assets/icons/sheets.png";
import NewsCardsIcon from "../../../../assets/icons/news.png";
import StocksIcon from "../../../../assets/icons/stocksAnalysis.png";
import ScreenerCardsIcon from "../../../../assets/icons/screener.png";
import OneToOneIcon from "../../../../assets/icons/oneToOne.png";
import FundamentalsIcon from "../../../../assets/icons/fundamental.png";
import NewsIcon from "../../../../assets/icons/newsNeon.png";
import ScreenerIcon from "../../../../assets/icons/screenerNeon.png";
import InsightsIcon from "../../../../assets/icons/insightsNeon.png";
import VideoIcon from "../../../../assets/icons/videos.png";
import ValidityIcon from "../../../../assets/icons/validityNeon.png";
import VideosIcon from "../../../../assets/icons/videosNeon.png";
import AnalysisIcon from "../../../../assets/icons/analysisNeon.png";
import LockIcon from "../../../../assets/icons/lock.png";
import { toast } from "react-toastify";
import styles from "./courseDetailsPage.module.css";
import { useNavigate } from "react-router-dom";
import { CallPatchApiServicesWithTkn } from "../../../../utils/webServices/apiCalls";
import ButtonComponent from "../../../../components/buttonComponent/buttonComponent";
import { useState, useEffect, useContext } from "react";
import { AuthContext } from "../../../../components/store/context/authContextProvider";

function CourseDetailsPage() {
  const {
    userSelectedCourseFromPricingPage,
    isValidToken,
    paid,
    userEmail,
    courseType,
    token,
  } = useContext(AuthContext);
  const navigate = useNavigate();
  const tabArr = ["overview", "contents"];
  const [windowWidth, setWindowWidth] = useState(undefined);
  const [selectedTab, setSelectedTab] = useState("overview");
  const [buyNowLoader, setBuyNowLoader] = useState(false);

  const technicalCourseContent = [
    {
      topic: "BASICS",
      subContent: [
        {
          contentName: "What is Stock Trading ?",
          contentDuration: "15:29 mins",
        },
        { contentName: "Charts & Candlesticks", contentDuration: "18:45 mins" },
        {
          contentName: "Fundamental vs Technical analysis",
          contentDuration: "34:08 mins",
        },
      ],
    },
    {
      topic: "CORE",
      subContent: [
        {
          contentName: "Support & Resistance (Supply & Demand)",
          contentDuration: "47:41 mins",
        },
        {
          contentName: "Zones and how to identify zone ?",
          contentDuration: "20:45 mins",
        },
        {
          contentName: "Trendlines and how to draw a perfect trendline ?",
          contentDuration: "36:35 mins",
        },
      ],
    },
    {
      topic: "INDICATORS",
      subContent: [
        {
          contentName: "Lagging vs Leading indicator",
          contentDuration: "06:46 mins",
        },
        {
          contentName: "Volume Profile and how to use it ?",
          contentDuration: "29:14 mins",
        },
        {
          contentName: "Golden Fibonacci rule (0.618)",
          contentDuration: "24:33 mins",
        },
        {
          contentName: "Relative Strength Index (RSI) & cheatsheet",
          contentDuration: "26:19 mins",
        },
        {
          contentName: "Moving Averages (9ma, 20ma, 50ma) & cheatsheet",
          contentDuration: "17:26 mins",
        },
      ],
    },
    {
      topic: "PATTERNS",
      subContent: [
        {
          contentName: "What are Patterns ?",
          contentDuration: "07:27 mins",
        },
        {
          contentName: "Triangle pattern & cheatsheet",
          contentDuration: "58:42 mins",
        },
        {
          contentName: "Channel pattern & cheatsheet",
          contentDuration: "30:24 mins",
        },
        {
          contentName: "Flag pattern & cheatsheet",
          contentDuration: "20:31 mins",
        },
        {
          contentName: "Wedge pattern & cheatsheet",
          contentDuration: "33:05 mins",
        },
        {
          contentName: "Double Top pattern & cheatsheet",
          contentDuration: "29:11 mins",
        },
        {
          contentName: "Double Bottom pattern & cheatsheet",
          contentDuration: "18:08 mins",
        },
        {
          contentName: "Head and Shoulder & cheatsheet",
          contentDuration: "24:42 mins",
        },
        {
          contentName: "Inverse Head and Shoulder & cheatsheet",
          contentDuration: "21:17 mins",
        },
        {
          contentName: "Major patterns to trade",
          contentDuration: "19:32 mins",
        },
      ],
    },
    {
      topic: "STRATEGIES",
      subContent: [
        {
          contentName: "#1 strategy for Intraday",
          contentDuration: "1:29:37 mins",
        },
        {
          contentName: "#1 strategy for Swing",
          contentDuration: "1:15:27 mins",
        },
      ],
    },
    {
      topic: "RISK MANAGEMENT",
      subContent: [
        {
          contentName: "Position sizing",
          contentDuration: "09:39 mins",
        },
        {
          contentName: "Risk / Reward",
          contentDuration: "09:56 mins",
        },
      ],
    },
    {
      topic: "BONUS",
      subContent: [
        {
          contentName: "Breakout vs Fakeout",
          contentDuration: "10:04 mins",
        },
        {
          contentName: "Perfect & Confluence entry",
          contentDuration: "27:25 mins",
        },
        {
          contentName: "Trail your trade",
          contentDuration: "21:18 mins",
        },
      ],
    },
  ];

  const fundamentalCourseContent = [
    {
      topic: "BASICS",
      subContent: [
        {
          contentName:
            "Learn to generate wealth using basic fundamental analysis concepts",
          contentDuration: "07:12 mins",
        },
        {
          contentName: "Importance of Fundamental and Technical Analysis",
          contentDuration: "09:19 mins",
        },
        {
          contentName: "Does Investment Work with Fundamental Analysis",
          contentDuration: "08:03 mins",
        },
        {
          contentName: "Categories of fundamental analysis",
          contentDuration: "08:22 mins",
        },
        {
          contentName: "What is qualitative analysis ?",
          contentDuration: "17:36 mins",
        },
        {
          contentName: "How do I evaluate stocks using qualitative analysis ?",
          contentDuration: "05:35 mins",
        },
        {
          contentName: "What is quantitative analysis ?",
          contentDuration: "06:16 mins",
        },
      ],
    },
    {
      topic: "CORE",
      subContent: [
        {
          contentName: "6 important key ratios",
          contentDuration: "03:13 mins",
        },
        {
          contentName: "What is stock pe  why pe is important ?",
          contentDuration: "05:15 mins",
        },
        {
          contentName: "How to calculate PE ratio ?",
          contentDuration: "21:29 mins",
        },
        {
          contentName: "What is book value & why book value is important ?",
          contentDuration: "09:30 mins",
        },
        {
          contentName: "How to calculate book value ?",
          contentDuration: "09:18 mins",
        },
        {
          contentName: "What is dividend ?",
          contentDuration: "08:17 mins",
        },
        {
          contentName: "How to calculate dividend yield ?",
          contentDuration: "04:41 mins",
        },
        {
          contentName: "What is  Return-on-Equity ?",
          contentDuration: "05:43 mins",
        },
        {
          contentName: "How Return-on-equity is calculated ?",
          contentDuration: "05:09 mins",
        },
        {
          contentName: "What is Roce and how its calculated ?",
          contentDuration: "03:25 mins",
        },
        {
          contentName: "How to calculate Roce ?",
          contentDuration: "05:13 mins",
        },
        {
          contentName: "What is Debt-to-Equity Ratio ?",
          contentDuration: "03:21 mins",
        },
        {
          contentName: "How to do Debt-To-Equity Ratio calculation ?",
          contentDuration: "05:14 mins",
        },
      ],
    },
  ];

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

  function tabPressHandler(tab) {
    setSelectedTab(tab);
  }

  function buyNowHandler() {
    if (isValidToken && !paid) {
      console.log(1);
      setBuyNowLoader(true);
      CallPatchApiServicesWithTkn(
        `/user/buy-course`,
        {
          email: userEmail,
          courseType: userSelectedCourseFromPricingPage,
          triedToUpdate: false,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        },
        (response) => {
          if (response.status === 201) {
            setBuyNowLoader(false);
            console.log("course updated");
          }
        },
        (error) => {
          setBuyNowLoader(false);
          toast.error("server down, please try again");
          console.log("payerr", error.message);
        }
      );
    } else if (isValidToken && paid) {
      console.log(2);
      setBuyNowLoader(true);
      CallPatchApiServicesWithTkn(
        `/user/buy-course`,
        {
          email: userEmail,
          courseType: courseType,
          triedToUpdate: true,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        },
        (response) => {
          if (response.status === 201) {
            setBuyNowLoader(false);
            console.log("course updated");
          }
        },
        (error) => {
          setBuyNowLoader(false);
          toast.error("server down, please try again");
          console.log("payerr", error.message);
        }
      );
    } else {
      navigate("/signup");
    }
  }

  console.log("usc", userSelectedCourseFromPricingPage);

  return (
    <div className={styles.course_detail_container_main}>
      <div className={styles.course_detail_container_main_sub}>
        <div className={styles.course_detail_container_main_sub_img}>
          <div
            className={
              userSelectedCourseFromPricingPage === "basic"
                ? styles.course_detail_container_main_sub_img_sub_one
                : userSelectedCourseFromPricingPage === "standard"
                ? styles.course_detail_container_main_sub_img_sub_two
                : userSelectedCourseFromPricingPage === "pro"
                ? styles.course_detail_container_main_sub_img_sub_three
                : ""
            }
          ></div>
          <span>{userSelectedCourseFromPricingPage.toUpperCase()}</span>
        </div>
        <div className={styles.course_detail_container_main_sub_details}>
          <div className={styles.course_detail_container_main_sub_details_sub}>
            {windowWidth >= 781 && (
              <div className={styles.buy_now_cont}>
                <div className={styles.price_cont}>
                  <span>
                    {userSelectedCourseFromPricingPage === "basic" && "₹ 2,499"}
                    {userSelectedCourseFromPricingPage === "standard" &&
                      "₹ 4,499"}
                    {userSelectedCourseFromPricingPage === "pro" && "₹ 9,499"}
                  </span>
                  <div className={styles.strike_price_cont}>
                    <span className={styles.strike_price_text}>
                      {" "}
                      {userSelectedCourseFromPricingPage === "basic" &&
                        "₹ 4,999"}
                      {userSelectedCourseFromPricingPage === "standard" &&
                        "₹ 7,999"}
                      {userSelectedCourseFromPricingPage === "pro" &&
                        "₹ 12,999"}
                    </span>
                    <span className={styles.offer_price_text}>20% OFF</span>
                  </div>
                </div>
                <ButtonComponent
                  style={styles.buy_now_btn}
                  text={"Buy now"}
                  handler={buyNowHandler}
                  indicator={buyNowLoader}
                />
              </div>
            )}
            <div className={styles.tab_cont}>
              {tabArr.map((tab, index) => (
                <div
                  key={index}
                  className={styles.tab}
                  style={{
                    backgroundColor:
                      selectedTab === tab ? "#0c969a" : "transparent",
                  }}
                  onClick={() => tabPressHandler(tab)}
                >
                  <span
                    style={{ color: selectedTab === tab ? "#000" : "#fff" }}
                  >
                    {tab}
                  </span>
                </div>
              ))}
            </div>
            {selectedTab === "overview" ? (
              <>
                <span className={styles.course_detail_header}>
                  {userSelectedCourseFromPricingPage === "basic"
                    ? "PRICE ACTION - THE ONE COMPLETE COURSE"
                    : userSelectedCourseFromPricingPage === "standard"
                    ? "DOMINATE MARKETS : MASTER PRICE ACTION WITH STOCK ANALYSIS"
                    : userSelectedCourseFromPricingPage === "pro"
                    ? "SYNERGIZING PRICE ACTION WITH FUNDAMENTALS FOR MARKET MASTERY"
                    : ""}
                </span>
                <div className={styles.small_cards_cont}>
                  <div className={styles.small_cards}>
                    <img src={VideoIcon} alt="video-icon" />
                    <span>VIDEOS</span>
                  </div>

                  <div className={styles.small_cards}>
                    <img src={SheetsIcon} alt="sheets-icon" />
                    <span>ANALYSIS STATS</span>
                  </div>

                  {(userSelectedCourseFromPricingPage === "standard" ||
                    userSelectedCourseFromPricingPage === "pro") && (
                    <div className={styles.small_cards}>
                      <img src={NewsCardsIcon} alt="news-icon" />
                      <span>CORE NEWS</span>
                    </div>
                  )}

                  {(userSelectedCourseFromPricingPage === "standard" ||
                    userSelectedCourseFromPricingPage === "pro") && (
                    <div className={styles.small_cards}>
                      <img src={StocksIcon} alt="stocks-icon" />
                      <span>STOCK ANALYSIS</span>
                    </div>
                  )}

                  {userSelectedCourseFromPricingPage === "pro" && (
                    <div className={styles.small_cards}>
                      <img src={ScreenerCardsIcon} alt="screener-icon" />
                      <span>SCREENER ANALYSIS</span>
                    </div>
                  )}

                  {userSelectedCourseFromPricingPage === "pro" && (
                    <div className={styles.small_cards}>
                      <img src={OneToOneIcon} alt="one-to-one-icon" />
                      <span>ONE - ONE</span>
                    </div>
                  )}

                  {userSelectedCourseFromPricingPage === "pro" && (
                    <div className={styles.small_cards}>
                      <img src={FundamentalsIcon} alt="fundamentals-icon" />
                      <span>FUNDAMENTAL INSIGHTS</span>
                    </div>
                  )}
                </div>

                <div className={styles.about_course_cont}>
                  <span className={styles.about_course_cont_header}>
                    About this course
                  </span>
                  <div className={styles.about_course_cont_content}>
                    <span>
                      {userSelectedCourseFromPricingPage === "basic" &&
                        `Welcome to Trader's Spot Price Action - The complete
                        course. The essential knowledge that every trader should
                        possess.`}
                      {userSelectedCourseFromPricingPage === "standard" &&
                        `Welcome to Trader's Spot Dominate Markets - Master price
                        action with stock analysis. The essential knowledge that
                        every trader should possess.`}
                      {userSelectedCourseFromPricingPage === "pro" &&
                        `Welcome to Trader's Spot Synergizing price action with
                        fundamentals for market mastery. Key information that
                        every trader should have in their possession.`}
                    </span>

                    <span>
                      {userSelectedCourseFromPricingPage === "basic" &&
                        `In this course, you'll gain insights into successful price action trading through the acquisition of effective and proven strategies.`}
                      {userSelectedCourseFromPricingPage === "standard" &&
                        `In this course, you will acquire knowledge through real-time stock charts and price action trading through the acquisition of effective and proven strategies.`}
                      {userSelectedCourseFromPricingPage === "pro" &&
                        `In this course, you will acquire knowledge in core fundamentals of stocks with price action trading through the acquisition of effective and proven strategies.`}
                    </span>

                    {userSelectedCourseFromPricingPage === "pro" && (
                      <span>
                        😎 {"  "}Learn how to uncover the core values of a stock
                        through fundamental analysis (balance sheets, intrinsic
                        values, EPS, and more), with the assistance of a
                        screener.
                      </span>
                    )}

                    {userSelectedCourseFromPricingPage === "pro" && (
                      <span>
                        😎 {"  "}Master the market by combining technical and
                        fundamental strategies.
                      </span>
                    )}

                    {(userSelectedCourseFromPricingPage === "standard" ||
                      userSelectedCourseFromPricingPage === "pro") && (
                      <span>
                        😎 {"  "}Learn how to analyze a chart in real-time and
                        execute trades with technical expertise.
                      </span>
                    )}

                    {(userSelectedCourseFromPricingPage === "standard" ||
                      userSelectedCourseFromPricingPage === "pro") && (
                      <span>
                        😎 {"  "}Pre-analyzed charts offer ample assistance in
                        enhancing your technical analysis skills.
                      </span>
                    )}

                    <span>
                      😎 {"  "}Obtain in-depth knowledge about factual price
                      action trading.
                    </span>
                    <span>
                      😎 {"  "}Proven strategies to progress from beginner to
                      expert level.
                    </span>
                    <span>
                      😎 {"  "}Our strategy is designed to minimize losses and
                      ensure consistent profitability in market.
                    </span>
                    <span>
                      😎 {"  "}Advanced price action strategy for maximum
                      trading benefits.
                    </span>
                    <span>
                      😎 {"  "}Consistent profits through market-tested trading
                      tactics
                    </span>
                    <span>
                      😎 {"  "}Unlock the potential for consistent returns with
                      our strategic approach.
                    </span>
                    <span>
                      Before purchasing the course, please conduct thorough
                      research on the analyses we have shared on our Telegram
                      channel over the last two years to understand how our
                      strategy works.
                    </span>
                  </div>
                </div>

                <div className={styles.what_else_cont}>
                  <span
                    className={styles.about_course_cont_header}
                    style={{ marginLeft: "0.9rem" }}
                  >
                    What else you will get
                  </span>
                  <div className={styles.what_else_cont_sub}>
                    <div className={styles.what_else}>
                      <img
                        src={ValidityIcon}
                        className={styles.what_else_icon}
                        alt="validity-icon"
                      />
                      <div className={styles.what_else_text}>
                        <span className={styles.what_else_head}>Validity</span>
                        <span className={styles.what_else_description}>
                          {userSelectedCourseFromPricingPage === "basic" &&
                            "You will get 1 month validity"}
                          {userSelectedCourseFromPricingPage === "standard" &&
                            "You will get 3 months validity"}
                          {userSelectedCourseFromPricingPage === "pro" &&
                            "You will get 1 year validity"}
                        </span>
                      </div>
                    </div>

                    <div className={styles.what_else}>
                      <img
                        src={VideosIcon}
                        className={styles.what_else_icon}
                        alt="videos-icon"
                      />
                      <div className={styles.what_else_text}>
                        <span className={styles.what_else_head}>Videos</span>
                        <span className={styles.what_else_description}>
                          {(userSelectedCourseFromPricingPage === "basic" ||
                            userSelectedCourseFromPricingPage === "standard") &&
                            "Access to 15 hours of video contents"}
                          {userSelectedCourseFromPricingPage === "pro" &&
                            "Access to 18 hours of video contents"}
                        </span>
                      </div>
                    </div>

                    <div className={styles.what_else}>
                      <img
                        src={AnalysisIcon}
                        className={styles.what_else_icon}
                        alt="analysis-icon"
                      />
                      <div className={styles.what_else_text}>
                        <span className={styles.what_else_head}>Analysis</span>
                        <span className={styles.what_else_description}>
                          {userSelectedCourseFromPricingPage === "basic" &&
                            "You will get free analyses (1/week)"}
                          {(userSelectedCourseFromPricingPage === "standard" ||
                            userSelectedCourseFromPricingPage === "pro") &&
                            "You will get free analyses (6/week)"}
                        </span>
                      </div>
                    </div>

                    {(userSelectedCourseFromPricingPage === "standard" ||
                      userSelectedCourseFromPricingPage === "pro") && (
                      <div className={styles.what_else}>
                        <img
                          src={NewsIcon}
                          className={styles.what_else_icon}
                          alt="news-icon"
                        />
                        <div className={styles.what_else_text}>
                          <span className={styles.what_else_head}>News</span>
                          <span className={styles.what_else_description}>
                            You will get high priority news
                          </span>
                        </div>
                      </div>
                    )}

                    {userSelectedCourseFromPricingPage === "pro" && (
                      <div className={styles.what_else}>
                        <img
                          src={ScreenerIcon}
                          className={styles.what_else_icon}
                          alt="screener-icon"
                        />
                        <div className={styles.what_else_text}>
                          <span className={styles.what_else_head}>
                            Screener
                          </span>
                          <span className={styles.what_else_description}>
                            Learning screener for fundamental
                          </span>
                        </div>
                      </div>
                    )}

                    {userSelectedCourseFromPricingPage === "pro" && (
                      <div className={styles.what_else}>
                        <img
                          src={InsightsIcon}
                          className={styles.what_else_icon}
                          alt="insights-icon"
                        />
                        <div className={styles.what_else_text}>
                          <span className={styles.what_else_head}>
                            Insights
                          </span>
                          <span className={styles.what_else_description}>
                            Learn deep analysis of a stock
                          </span>
                        </div>
                      </div>
                    )}
                  </div>
                </div>

                <div className={styles.you_pay_cont}>
                  <span className={styles.about_course_cont_header}>
                    Pricing details
                  </span>
                  <div className={styles.you_pay_cont_sub}>
                    <span>You pay</span>
                    <div className={styles.you_pay_cont_sub_price_cont}>
                      <span className={styles.you_pay_price_strike_text}>
                        {userSelectedCourseFromPricingPage === "basic" &&
                          "₹ 4,999"}
                        {userSelectedCourseFromPricingPage === "standard" &&
                          "₹ 7,999"}
                        {userSelectedCourseFromPricingPage === "pro" &&
                          "₹ 12,999"}
                      </span>
                      <span className={styles.you_pay_price_text}>
                        {userSelectedCourseFromPricingPage === "basic" &&
                          "₹ 2,499"}
                        {userSelectedCourseFromPricingPage === "standard" &&
                          "₹ 4,499"}
                        {userSelectedCourseFromPricingPage === "pro" &&
                          "₹ 9,499"}
                      </span>
                    </div>
                  </div>
                </div>
              </>
            ) : (
              <div className={styles.content_cont}>
                <div className={styles.main_heading_text}>
                  <span>Technical</span>
                </div>
                {technicalCourseContent.map((topic, topic_index) => (
                  <div key={topic_index} className={styles.content_main}>
                    <span className={styles.side_heading_text}>
                      {topic.topic}
                    </span>
                    {topic.subContent.map((content, index) => (
                      <div key={index} className={styles.contents}>
                        <div className={styles.contents_left}>
                          <img src={VideoIcon} alt="video-icon" />
                        </div>
                        <div className={styles.contents_center}>
                          <span className={styles.contents_center_text_1}>
                            {content.contentName}
                          </span>
                          <span className={styles.contents_center_text_2}>
                            {content.contentDuration}
                          </span>
                        </div>
                        <div className={styles.contents_right}>
                          <div className={styles.play_btn}>
                            <img
                              src={LockIcon}
                              className={styles.play_btn_img}
                              alt="lock-icon"
                            />
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                ))}

                {userSelectedCourseFromPricingPage === "pro" && (
                  <>
                    <div className={styles.main_heading_text}>
                      <span>Fundamental</span>
                    </div>
                    {fundamentalCourseContent.map((topic, topic_index) => (
                      <div key={topic_index} className={styles.content_main}>
                        <span className={styles.side_heading_text}>
                          {topic.topic}
                        </span>
                        {topic.subContent.map((content, index) => (
                          <div key={index} className={styles.contents}>
                            <div className={styles.contents_left}>
                              <img src={VideoIcon} alt="video-icon" />
                            </div>
                            <div className={styles.contents_center}>
                              <span className={styles.contents_center_text_1}>
                                {content.contentName}
                              </span>
                              <span className={styles.contents_center_text_2}>
                                {content.contentDuration}
                              </span>
                            </div>
                            <div className={styles.contents_right}>
                              <div className={styles.play_btn}>
                                <img
                                  src={LockIcon}
                                  className={styles.play_btn_img}
                                  alt="lock-icon"
                                />
                              </div>
                            </div>
                          </div>
                        ))}
                      </div>
                    ))}
                  </>
                )}
              </div>
            )}
          </div>
        </div>
      </div>

      {windowWidth <= 780 && (
        <div className={styles.buy_now_cont}>
          <div className={styles.price_cont}>
            <span>
              {userSelectedCourseFromPricingPage === "basic" && "₹ 2,499"}
              {userSelectedCourseFromPricingPage === "standard" && "₹ 4,499"}
              {userSelectedCourseFromPricingPage === "pro" && "₹ 9,499"}
            </span>
            <div className={styles.strike_price_cont}>
              <span className={styles.strike_price_text}>
                {userSelectedCourseFromPricingPage === "basic" && "₹ 4,999"}
                {userSelectedCourseFromPricingPage === "standard" && "₹ 7,999"}
                {userSelectedCourseFromPricingPage === "pro" && "₹ 12,999"}
              </span>
              <span className={styles.offer_price_text}>20% OFF</span>
            </div>
          </div>
          <ButtonComponent
            style={styles.buy_now_btn}
            text={"Buy now"}
            handler={buyNowHandler}
            indicator={buyNowLoader}
          />
        </div>
      )}
    </div>
  );
}

export default CourseDetailsPage;
