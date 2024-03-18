import { FaFilter } from "react-icons/fa";
import { useState, useEffect, useContext } from "react";
import styles from "../analysisStatsPage.module.css";

import ButtonComponent from "../../../../components/buttonComponent/buttonComponent";
import { CallGetApiServicesWithTkn } from "../../../../utils/webServices/apiCalls";
import { AuthContext } from "../../../../components/store/context/authContextProvider";
import { toast } from "react-toastify";
import { Digital } from "react-activity";

function AnalysisContainer() {
  const { token, analysisToDisplayBeforeLogin } = useContext(AuthContext);
  const [analysisToDisplayUpdate, setAnalysisToDisplayUpdate] = useState(false);
  const [viewResult, setViewResult] = useState(null);
  const [contToDisplay, setContToDisplay] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [analysisData, setAnalysisData] = useState([]);
  const [totalAnalysis, setTotalAnalysis] = useState(0);
  const [isLoading, setIsLoading] = useState(false);
  const [breakout, setBreakOut] = useState(null);
  const [reward, setReward] = useState(null);
  const [analysisLink, setAnalysisLink] = useState(null);
  const [resultLink, setResultLink] = useState(null);
  // const [token, setToken] = useState(
  //   "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6ImtwbmtzcmlyYW1AZ21haWwuY29tIiwidXNlclR5cGUiOiJsZWFybmVyIiwiY291cnNlVHlwZSI6InBybyIsInBhaWQiOnRydWUsImlhdCI6MTcwOTIxMTM3NX0.SzqZhlSYjOxTbGhFDL8e5C-M8QoLF-7Yx03HLKMwRqo"
  // );
  const [isFilterContVisible, setIsFilterContVisible] = useState(false);
  const [filterTab, setFilterTab] = useState("All");
  const filterArray = [
    "All",
    "Breakout",
    "Trailing",
    "Reward",
    "Stoploss",
    "Idle",
    "Nill",
  ];

  // 1
  useEffect(() => {
    getAllAnalysis(currentPage);
  }, [
    currentPage,
    breakout,
    reward,
    analysisLink,
    resultLink,
    analysisToDisplayUpdate,
  ]);

  useEffect(() => {
    viewFilterHandler();
    setIsFilterContVisible(false);
    setAnalysisToDisplayUpdate(!analysisToDisplayUpdate);
  }, [analysisToDisplayBeforeLogin]);

  function getAllAnalysis(page = 1) {
    setIsLoading(true);
    CallGetApiServicesWithTkn(
      `/analysis/${
        analysisToDisplayBeforeLogin
          ? "free-swing-analysis/get-all-free-swing-analysis-user-pagination"
          : "swing-analysis/get-all-swing-analysis-user-pagination"
      }?page=${page}&breakout=${breakout}&reward=${reward}&analysisLink=${analysisLink}&resultLink=${resultLink}`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      },
      (response) => {
        if (response.status === 200) {
          setAnalysisData(response.data.allSwingAnalyses);
          setTotalAnalysis(response.data.totalSwingAnalysis);
          setIsLoading(false);
        }
      },
      (err) => {
        setIsLoading(false);
        toast.error("Error fetching analyses");
        console.log("err getting getallanalysis analysis stats", err);
      }
    );
  }

  function viewResultHandler(index) {
    if (index === viewResult) {
      setViewResult(null);
      return;
    }
    setViewResult(index);
  }

  function viewFilterHandler() {
    setIsFilterContVisible(!isFilterContVisible);
    setBreakOut(null);
    setReward(null);
    setAnalysisLink(null);
    setResultLink(null);
    setFilterTab("All");
    setCurrentPage(1);
  }

  function tabPressHandler(pressedTab) {
    if (filterTab === pressedTab) {
      return;
    }
    setFilterTab(pressedTab);
    setViewResult(null);
    setAnalysisData([]);
    if (pressedTab === "All") {
      setCurrentPage(1);
      setBreakOut(null);
      setReward(null);
      setAnalysisLink(null);
      setResultLink(null);
    } else if (pressedTab === "Breakout") {
      if (!analysisToDisplayBeforeLogin) {
        return;
      } else {
        setCurrentPage(1);
        setBreakOut("green");
        setReward(null);
        setAnalysisLink(null);
        setResultLink(null);
      }
    } else if (pressedTab === "Trailing") {
      if (!analysisToDisplayBeforeLogin) {
        return;
      } else {
        setCurrentPage(1);
        setBreakOut("orange");
        setReward(null);
        setAnalysisLink(null);
        setResultLink(null);
      }
    } else if (pressedTab === "Reward") {
      setCurrentPage(1);
      setBreakOut(null);
      setReward(1);
      setAnalysisLink(null);
      setResultLink(null);
    } else if (pressedTab === "Stoploss") {
      setCurrentPage(1);
      setBreakOut(null);
      setReward(0);
      setAnalysisLink(null);
      setResultLink(null);
    } else if (pressedTab === "Idle") {
      console.log(11);
      if (!analysisToDisplayBeforeLogin) {
        return;
      } else {
        setCurrentPage(1);
        setBreakOut(null);
        setReward(null);
        setAnalysisLink(1);
        setResultLink(null);
      }
    } else if (pressedTab === "Nill") {
      setCurrentPage(1);
      setBreakOut(null);
      setReward(null);
      setAnalysisLink(null);
      setResultLink(1);
    }
  }

  const handlePageChangePrevious = () => {
    setCurrentPage(currentPage - 1);
  };

  const handlePageChangeNext = () => {
    setCurrentPage(currentPage + 1);
  };

  return (
    <div className={styles.analysis_cont}>
      <div className={styles.analysis_cont_btn_cont}>
        <FaFilter
          size={18}
          color="#0c969a"
          style={{ cursor: "pointer" }}
          onClick={viewFilterHandler}
        />
        {isFilterContVisible && (
          <div className={styles.analysis_filter_cont}>
            {filterArray.map((tab, index) => (
              <div
                key={index}
                className={styles.filter_tab}
                style={{
                  backgroundColor:
                    filterTab === tab ? "#284d5f" : "transparent",
                }}
                onClick={() => tabPressHandler(tab)}
              >
                <span>{tab}</span>
              </div>
            ))}
          </div>
        )}
        <div className={styles.pagination_cont_sub}>
          <ButtonComponent
            text={"<"}
            style={styles.pagination_cont_btn}
            handler={handlePageChangePrevious}
            disabled={currentPage === 1}
          />

          <div className={styles.page_no_cont}>
            <span>{1}</span>
          </div>
          <ButtonComponent
            text={">"}
            style={styles.pagination_cont_btn}
            handler={handlePageChangeNext}
            disabled={currentPage * 30 >= totalAnalysis ? true : false}
          />
        </div>
      </div>

      <div className={styles.analysis_cont_sub}>
        {!analysisToDisplayBeforeLogin &&
        (filterTab === "Breakout" ||
          filterTab === "Trailing" ||
          filterTab === "Idle") ? (
          <div className={styles.upgrade_btn_main_cont}>
            <div className={styles.upgrade_btn_cont}>
              <span className={styles.upgrade_btn_cont_text}>
                Upgrade to "STANDARD" plan to access our high potential swing
                analysis. You can view free analysis stats.
              </span>
              <ButtonComponent text={"Upgrade"} />
            </div>
          </div>
        ) : (
          <>
            {analysisData.length > 0 &&
              !isLoading &&
              analysisData.map((item, index) => (
                <div key={index} className={styles.analysis}>
                  <div className={styles.analysis_name_area}>
                    <div className={styles.name_card}>
                      <span>{item?.analysis?.stockName}</span>
                    </div>
                    <div className={styles.name_card}>
                      <span>{item?.analysis?.pattern}</span>
                    </div>
                  </div>
                  <div className={styles.analysis_link_area}>
                    <a href={item.analysis.analysisLink}>
                      {item.analysis.analysisLink}
                    </a>
                    <img
                      src={item.analysis.analysisLink}
                      alt="tradingview.com"
                    />
                  </div>
                  <div className={styles.analysis_result_area}>
                    <div
                      onClick={() => viewResultHandler(index)}
                      style={{ cursor: "pointer" }}
                    >
                      <span>view result</span>
                    </div>
                  </div>

                  {viewResult === index &&
                    (item.result.resultLink &&
                    item.result.resultLink !== "none" ? (
                      <>
                        <div className={styles.analysis_result}>
                          <span>
                            {item.result?.reward === 0
                              ? "stoploss hit"
                              : `${item.result.risk}:${item.result.reward} RR`}
                          </span>
                          <span>
                            {item.result?.reward === 0
                              ? -item.result?.percentage
                              : item.result?.percentage}
                            %
                          </span>
                        </div>
                        <div className={styles.analysis_link_area}>
                          <a href={item.result.resultLink}>
                            {item.result.resultLink}
                          </a>
                          <img
                            src={item.result.resultLink}
                            alt="tradingview.com"
                          />
                        </div>
                      </>
                    ) : (
                      <span className={styles.result_text}>
                        {item.result.resultLink == "none"
                          ? "no result"
                          : "not yet updated..."}
                      </span>
                    ))}
                </div>
              ))}
          </>
        )}

        {isLoading && (
          <Digital
            size={20}
            color="#555"
            style={{ alignSelf: "center", margin: "auto" }}
          />
        )}

        {analysisToDisplayBeforeLogin &&
          (filterTab !== "Breakout" ||
            filterTab !== "Trailing" ||
            filterTab !== "Idle") &&
          !isLoading &&
          analysisData.length === 0 && (
            <span className={styles.no_data_text}>No data</span>
          )}
      </div>
    </div>
  );
}

export default AnalysisContainer;
