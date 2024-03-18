import { useState, useContext, useEffect } from "react";
import { AuthContext } from "../../../../components/store/context/authContextProvider";
import DonutChart from "../../../../components/charts/donutChart";
import GaugeChart from "react-gauge-chart";
import ToggleSwitch from "../../../../components/toggleSwitch/toggleSwitch";
import styles from "../../../beforeLoggedInPages/analysisStatsPage/analysisStatsPage.module.css";

function VisualContainer() {
  const authCtx = useContext(AuthContext);
  const [barChartValue, setBarChartValue] = useState([]);
  const [gaugeChartValue, setGaugeChartValue] = useState(0.6);
  const [windowWidth, setWindowWidth] = useState(undefined);
  const dummyBarChartValue = [
    {
      risk: 1,
      reward: 2,
      month: "nill",
    },
    {
      risk: 2,
      reward: 5,
      month: "nill",
    },
    {
      risk: 0,
      reward: 0,
      month: "nill",
    },
    {
      risk: 0,
      reward: 0,
      month: "nill",
    },
    {
      risk: 3,
      reward: 9,
      month: "nill",
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

  useEffect(() => {
    if (
      authCtx.freeSwingAnalysisStats.reversedMonthlyTotals &&
      authCtx.swingAnalysisStats.reversedMonthlyTotals
    ) {
      setBarChartValue(
        authCtx.analysisToDisplayAfterLogin
          ? authCtx.freeSwingAnalysisStats?.reversedMonthlyTotals
          : authCtx.swingAnalysisStats?.reversedMonthlyTotals
      );

      const risk = authCtx.analysisToDisplayAfterLogin
        ? authCtx.freeSwingAnalysisStats?.totalRiskLastFiveMonth > 0
          ? authCtx.freeSwingAnalysisStats.totalRiskLastFiveMonth
          : 10
        : (authCtx.swingAnalysisStats.totalRiskLastFiveMonth > 0
            ? authCtx.swingAnalysisStats.totalRiskLastFiveMonth
            : 10) || 10;

      const reward = authCtx.analysisToDisplayAfterLogin
        ? authCtx.freeSwingAnalysisStats.totalRewardLastFiveMonth > 0
          ? authCtx.freeSwingAnalysisStats.totalRewardLastFiveMonth
          : 50
        : (authCtx.swingAnalysisStats.totalRewardLastFiveMonth > 0
            ? authCtx.swingAnalysisStats.totalRewardLastFiveMonth
            : 30) || 50;
      const percentage = reward / (risk + reward);
      setGaugeChartValue(percentage);
    }
  }, [
    authCtx.analysisToDisplayAfterLogin,
    authCtx.freeSwingAnalysisStats,
    authCtx.swingAnalysisStats,
  ]);

  return windowWidth > 970 ? (
    <div className={styles.visual_cont}>
      <div className={styles.heading_cont}>
        <span>Statistics</span>
        <ToggleSwitch />
      </div>

      <div className={styles.pie_chart_cont}>
        <DonutChart
          valueOne={
            authCtx.analysisToDisplayAfterLogin
              ? authCtx.freeSwingAnalysisStats?.totalRiskLastFiveMonth > 0
                ? authCtx.freeSwingAnalysisStats.totalRiskLastFiveMonth
                : 10
              : (authCtx.swingAnalysisStats.totalRiskLastFiveMonth > 0
                  ? authCtx.swingAnalysisStats.totalRiskLastFiveMonth
                  : 10) || 10
          }
          valueTwo={
            authCtx.analysisToDisplayAfterLogin
              ? authCtx.freeSwingAnalysisStats.totalRewardLastFiveMonth > 0
                ? authCtx.freeSwingAnalysisStats.totalRewardLastFiveMonth
                : 50
              : (authCtx.swingAnalysisStats.totalRewardLastFiveMonth > 0
                  ? authCtx.swingAnalysisStats.totalRewardLastFiveMonth
                  : 30) || 50
          }
        />
        {/* <span>Risk/Reward</span> */}
      </div>

      <div className={styles.line_chart_cont}>
        <div className={styles.line_chart_cont_sub}>
          {barChartValue.length > 0
            ? barChartValue.map((item, index) => (
                <div key={index} className={styles.line_cont}>
                  <div className={styles.label_cont}>
                    <span
                      className={`${styles.label_cont_text} ${{
                        marginTop: 0,
                      }}`}
                    >
                      {`${item.risk}:${item.reward}`}
                    </span>
                    <span className={[styles.label_cont_text]}>
                      {item.month}
                    </span>
                  </div>
                  <div className={styles.line_out}>
                    <div
                      className={styles.line_in}
                      style={{
                        width: `${
                          item.reward * 5 >= 100 ? 100 : item.reward * 5
                        }%`,
                      }}
                    ></div>
                  </div>
                </div>
              ))
            : dummyBarChartValue.map((item, index) => (
                <div key={index} className={styles.line_cont}>
                  <div className={styles.label_cont}>
                    <span
                      className={`${styles.label_cont_text} ${{
                        marginTop: 0,
                      }}`}
                    >
                      {`${item.risk}:${item.reward}`}
                    </span>
                    <span className={[styles.label_cont_text]}>
                      {item.month}
                    </span>
                  </div>
                  <div className={styles.line_out}>
                    <div
                      className={styles.line_in}
                      style={{
                        width: `${
                          item.reward * 5 >= 100 ? 100 : item.reward * 5
                        }%`,
                      }}
                    ></div>
                  </div>
                </div>
              ))}
        </div>
      </div>

      <div className={styles.gauge_chart_cont}>
        <GaugeChart
          id="gauge-chart2"
          nrOfLevels={20}
          percent={gaugeChartValue}
        />
        <span>Overall percentage</span>
      </div>
    </div>
  ) : windowWidth <= 970 && windowWidth > 670 ? (
    <div className={styles.visual_cont}>
      <div className={styles.heading_cont}>
        <span>Statistics</span>
        <ToggleSwitch />
      </div>

      <div className={styles.visual_cont_charts}>
        <div className={styles.pie_chart_cont}>
          <DonutChart
            valueOne={
              authCtx.analysisToDisplayAfterLogin
                ? authCtx.freeSwingAnalysisStats?.totalRiskLastFiveMonth > 0
                  ? authCtx.freeSwingAnalysisStats.totalRiskLastFiveMonth
                  : 10
                : (authCtx.swingAnalysisStats.totalRiskLastFiveMonth > 0
                    ? authCtx.swingAnalysisStats.totalRiskLastFiveMonth
                    : 10) || 10
            }
            valueTwo={
              authCtx.analysisToDisplayAfterLogin
                ? authCtx.freeSwingAnalysisStats.totalRewardLastFiveMonth > 0
                  ? authCtx.freeSwingAnalysisStats.totalRewardLastFiveMonth
                  : 50
                : (authCtx.swingAnalysisStats.totalRewardLastFiveMonth > 0
                    ? authCtx.swingAnalysisStats.totalRewardLastFiveMonth
                    : 30) || 50
            }
          />
          {/* <span>Risk/Reward</span> */}
        </div>

        <div className={styles.line_chart_cont}>
          <div className={styles.line_chart_cont_sub}>
            {barChartValue.length > 0 &&
              barChartValue.map((item, index) => (
                <div key={index} className={styles.line_cont}>
                  <span
                    className={`${styles.label_cont_text} ${{ marginTop: 0 }}`}
                  >
                    {`${item.risk}:${item.reward}`}
                  </span>

                  <div className={styles.line_out}>
                    <div
                      className={styles.line_in}
                      style={{
                        height: `${
                          item.reward * 5 >= 100 ? 100 : item.reward * 5
                        }%`,
                      }}
                    ></div>
                  </div>
                  <span className={[styles.label_cont_text]}>{item.month}</span>
                </div>
              ))}
          </div>
        </div>

        <div className={styles.gauge_chart_cont}>
          <GaugeChart
            id="gauge-chart2"
            nrOfLevels={20}
            percent={gaugeChartValue}
          />
          <span>Overall percentage</span>
        </div>
      </div>
    </div>
  ) : (
    <div className={styles.visual_cont}>
      <div className={styles.heading_cont}>
        <span>Statistics</span>
        <ToggleSwitch />
      </div>

      <div className={styles.visual_cont_charts}>
        <div className={styles.pie_gauge_Container}>
          <div className={styles.pie_chart_cont}>
            <DonutChart
              valueOne={
                authCtx.analysisToDisplayAfterLogin
                  ? authCtx.freeSwingAnalysisStats?.totalRiskLastFiveMonth > 0
                    ? authCtx.freeSwingAnalysisStats.totalRiskLastFiveMonth
                    : 10
                  : (authCtx.swingAnalysisStats.totalRiskLastFiveMonth > 0
                      ? authCtx.swingAnalysisStats.totalRiskLastFiveMonth
                      : 10) || 10
              }
              valueTwo={
                authCtx.analysisToDisplayAfterLogin
                  ? authCtx.freeSwingAnalysisStats.totalRewardLastFiveMonth > 0
                    ? authCtx.freeSwingAnalysisStats.totalRewardLastFiveMonth
                    : 50
                  : (authCtx.swingAnalysisStats.totalRewardLastFiveMonth > 0
                      ? authCtx.swingAnalysisStats.totalRewardLastFiveMonth
                      : 30) || 50
              }
            />
          </div>
          <div className={styles.gauge_chart_cont}>
            <GaugeChart
              id="gauge-chart2"
              nrOfLevels={20}
              percent={gaugeChartValue}
            />
            <span>Overall percentage</span>
          </div>
        </div>
        <div className={styles.line_chart_cont}>
          <div className={styles.line_chart_cont_sub}>
            {barChartValue.length > 0 &&
              barChartValue.map((item, index) => (
                <div key={index} className={styles.line_cont}>
                  <span
                    className={`${styles.label_cont_text} ${{
                      marginTop: 0,
                    }}`}
                  >
                    {`${item.risk}:${item.reward}`}
                  </span>

                  <div className={styles.line_out}>
                    <div
                      className={styles.line_in}
                      style={{
                        width:
                          windowWidth <= 366
                            ? `${
                                item.reward * 5 >= 100 ? 100 : item.reward * 5
                              }%`
                            : undefined,
                        height:
                          windowWidth >= 367
                            ? `${
                                item.reward * 5 >= 100 ? 100 : item.reward * 5
                              }%`
                            : undefined,
                      }}
                    ></div>
                  </div>
                  <span
                    className={
                      windowWidth >= 367
                        ? styles.label_cont_text
                        : styles.label_cont_text_new
                    }
                  >
                    {item.month}
                  </span>
                </div>
              ))}
          </div>
        </div>
      </div>
    </div>
  );
}

export default VisualContainer;
