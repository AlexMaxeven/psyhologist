import { ParticleCard } from '../../components/MagicBento/MagicBento'
import { GlobalSpotlight } from '../../components/MagicBento/GlobalSpotlight'
import { useRef, useEffect } from 'react'
import { useTheme } from '../../context/ThemeContext'
import styles from './Home.module.css'

function Home() {
  const gridRef = useRef(null);
  const { isDark } = useTheme();
  const glowColor = isDark ? "0, 255, 136" : "255, 140, 66";

  useEffect(() => {
    // Переконаємося, що gridRef встановлений
    if (gridRef.current) {
      gridRef.current.style.display = 'block';
    }
  }, []);

  return (
    <div className={styles.page}>
      <GlobalSpotlight
        gridRef={gridRef}
        enabled={true}
        spotlightRadius={300}
        glowColor={glowColor}
      />
      <div className={styles.pageContent} ref={gridRef}>
        <div className={styles.heroSection}>
          <h1 className={styles.pageTitle}>
            Гештальт-психологія
          </h1>
          <p className={`${styles.pageSubtitle} ${styles.animateFadeInDelay}`}>
            Шлях до самопізнання та гармонії
          </p>
        </div>

        <div className={`${styles.contentSection} ${styles.animateSlideUp}`}>
          <ParticleCard
            className={`${styles.introCard} ${styles.borderGlow}`}
            particleCount={12}
            glowColor={glowColor}
            enableTilt={true}
            clickEffect={true}
            enableMagnetism={true}
          >
            <h2>Ласкаво просимо</h2>
            <p>
              Гештальт-терапія — це гуманістичний підхід до психологічної допомоги, 
              який допомагає людині краще розуміти себе, свої потреби та емоції. 
              Це шлях до більш повноцінного та свідомого життя.
            </p>
          </ParticleCard>

          <div className={styles.featuresGrid}>
            <ParticleCard
              className={`${styles.featureCard} ${styles.borderGlow}`}
              particleCount={8}
              glowColor={glowColor}
              enableTilt={true}
              clickEffect={true}
              enableMagnetism={true}
            >
              <div className={styles.featureIcon}>🧘</div>
              <h3>Особистісний ріст</h3>
              <p>Розвиток самосвідомості та розуміння себе</p>
            </ParticleCard>
            <ParticleCard
              className={`${styles.featureCard} ${styles.borderGlow}`}
              particleCount={8}
              glowColor={glowColor}
              enableTilt={true}
              clickEffect={true}
              enableMagnetism={true}
            >
              <div className={styles.featureIcon}>💚</div>
              <h3>Емоційна гармонія</h3>
              <p>Навчання розпізнавати та приймати свої емоції</p>
            </ParticleCard>
            <ParticleCard
              className={`${styles.featureCard} ${styles.borderGlow}`}
              particleCount={8}
              glowColor={glowColor}
              enableTilt={true}
              clickEffect={true}
              enableMagnetism={true}
            >
              <div className={styles.featureIcon}>🤝</div>
              <h3>Зв'язки з іншими</h3>
              <p>Покращення взаємин з оточуючими людьми</p>
            </ParticleCard>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Home

