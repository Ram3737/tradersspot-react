import AnalysisContainer from "./components/analysisContainer";
import VisualContainer from "./components/visualContainer";
import styles from "../../beforeLoggedInPages/analysisStatsPage/analysisStatsPage.module.css";

function AnalysisPage() {
  return (
    <section className={styles.analysis_page_container}>
      <VisualContainer />
      <AnalysisContainer />
    </section>
  );
}
export default AnalysisPage;
