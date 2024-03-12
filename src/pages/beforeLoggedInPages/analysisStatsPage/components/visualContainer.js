import styles from "../analysisStatsPage.module.css";
import { useState } from "react";
import { useEffect } from "react";
import DonutChart from "../../../../components/charts/donutChart";
import GaugeChart from "react-gauge-chart";
import ToggleSwitch from "../../../../components/toggleSwitch/toggleSwitch";

function VisualContainer() {
  const arr = [1, 2, 3, 4, 5];
  const [windowWidth, setWindowWidth] = useState(undefined);

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
  return windowWidth > 970 ? (
    <div className={styles.visual_cont}>
      <div className={styles.heading_cont}>
        <span>Statistics</span>
        <ToggleSwitch />
      </div>

      <div className={styles.pie_chart_cont}>
        <DonutChart />
        {/* <span>Risk/Reward</span> */}
      </div>

      <div className={styles.line_chart_cont}>
        <div className={styles.line_chart_cont_sub}>
          {arr.map((item, index) => (
            <div key={index} className={styles.line_cont}>
              <div className={styles.label_cont}>
                <span
                  className={`${styles.label_cont_text} ${{ marginTop: 0 }}`}
                >
                  {`${1}:${2}`}
                </span>
                <span className={[styles.label_cont_text]}>{"jan"}</span>
              </div>
              <div className={styles.line_out}>
                <div className={styles.line_in}></div>
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className={styles.gauge_chart_cont}>
        <GaugeChart id="gauge-chart2" nrOfLevels={20} percent={0.86} />
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
          <DonutChart />
          {/* <span>Risk/Reward</span> */}
        </div>

        <div className={styles.line_chart_cont}>
          <div className={styles.line_chart_cont_sub}>
            {arr.map((item, index) => (
              <div key={index} className={styles.line_cont}>
                <span
                  className={`${styles.label_cont_text} ${{ marginTop: 0 }}`}
                >
                  {`${1}:${2}`}
                </span>

                <div className={styles.line_out}>
                  <div className={styles.line_in}></div>
                </div>
                <span className={[styles.label_cont_text]}>{"jan"}</span>
              </div>
            ))}
          </div>
        </div>

        <div className={styles.gauge_chart_cont}>
          <GaugeChart id="gauge-chart2" nrOfLevels={20} percent={0.86} />
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
            <DonutChart />
          </div>
          <div className={styles.gauge_chart_cont}>
            <GaugeChart id="gauge-chart2" nrOfLevels={20} percent={0.86} />
            <span>Overall percentage</span>
          </div>
        </div>
        <div className={styles.line_chart_cont}>
          <div className={styles.line_chart_cont_sub}>
            {arr.map((item, index) => (
              <div key={index} className={styles.line_cont}>
                <span
                  className={`${styles.label_cont_text} ${{ marginTop: 0 }}`}
                >
                  {`${1}:${2}`}
                </span>

                <div className={styles.line_out}>
                  <div className={styles.line_in}></div>
                </div>
                <span className={[styles.label_cont_text]}>{"jan"}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

export default VisualContainer;
