import AnalysisContainer from "./components/analysisContainer";
import VisualContainer from "./components/visualContainer";
import styles from "./analysisStatsPage.module.css";

function AnalysisStatsPage() {
  return (
    <section className={styles.analysis_page_container}>
      <VisualContainer />
      <AnalysisContainer />
    </section>
  );
}
export default AnalysisStatsPage;
