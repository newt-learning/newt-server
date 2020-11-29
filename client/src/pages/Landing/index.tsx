import React from "react";
// Sections
import EnvironmentSection from "./EnvironmentSection";
import FeaturesSection from "./FeaturesSection";
import LastCallToActionSection from "./LastCallToActionSection";
// Components
import { Navbar, Button, Boop, ShiftBy, Footer } from "../../components";
import PhoneGraphic from "./PhoneGraphic";
import { FiArrowRight } from "react-icons/fi";
import { Link } from "react-router-dom";
// Hooks
import useMetaTags from "../../hooks/useMetaTags";
import { useBoop } from "../../hooks";
// Styling
import styles from "./Landing.module.css";

const LandingPage = () => {
  useMetaTags({
    title: "Newt",
  });

  const [iconBoop, trigger] = useBoop({ x: 4, timing: 200 });

  return (
    <div className={styles.App}>
      <Navbar variant="landing" />
      <section className={styles.mainContainer}>
        <div className={styles.titleContainer}>
          <h1 className={styles.title}>Organize everything you're learning</h1>
          <p className={styles.subtitle}>
            Everything you want to learn from &mdash; books, videos, online
            courses, podcasts, interactive games &mdash; all in one place
          </p>
          <Link to="/dashboard" className={styles.getStartedLink}>
            <Button
              className={styles.getStartedBtn}
              //@ts-ignore
              onMouseEnter={trigger}
            >
              Get Started
              <Boop disableTrigger overrideStyle={iconBoop}>
                <ShiftBy y={-1}>
                  <FiArrowRight size={16} className={styles.rightArrow} />
                </ShiftBy>
              </Boop>
            </Button>
          </Link>
        </div>
        <div className={styles.phoneGraphicContainer}>
          <PhoneGraphic />
        </div>
      </section>
      <EnvironmentSection />
      <FeaturesSection />
      <LastCallToActionSection />
      <Footer />
    </div>
  );
};

export default LandingPage;
