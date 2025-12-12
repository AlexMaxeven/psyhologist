import { ParticleCard } from '../../components/MagicBento/MagicBento'
import { GlobalSpotlight } from '../../components/MagicBento/GlobalSpotlight'
import { useRef } from 'react'
import { useTheme } from '../../context/ThemeContext'
import styles from './Therapy.module.css'

function Therapy() {
  const gridRef = useRef(null);
  const { isDark } = useTheme();
  const glowColor = isDark ? "0, 255, 136" : "255, 140, 66";

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
            Гештальт-терапія
          </h1>
          <p className={`${styles.pageSubtitle} ${styles.animateFadeInDelay}`}>
            Як це працює
          </p>
        </div>

        <div className={`${styles.contentSection} ${styles.animateSlideUp}`}>
          <ParticleCard
            className={`${styles.infoCard} ${styles.borderGlow}`}
            particleCount={12}
            glowColor={glowColor}
            enableTilt={true}
            clickEffect={true}
            enableMagnetism={true}
          >
            <h2>Процес терапії</h2>
            <p>
              Гештальт-терапія проходить у формі діалогу між терапевтом та клієнтом. 
              Терапевт створює безпечний простір, де клієнт може досліджувати 
              свої почуття, думки та поведінку без осуду.
            </p>
          </ParticleCard>

          <ParticleCard
            className={`${styles.infoCard} ${styles.borderGlow}`}
            particleCount={12}
            glowColor={glowColor}
            enableTilt={true}
            clickEffect={true}
            enableMagnetism={true}
          >
            <h2>Техніки та методи</h2>
            <div className={styles.techniquesGrid}>
              <div className={styles.techniqueItem}>
                <h3>Діалог</h3>
                <p>Відкритий розмовний процес між терапевтом та клієнтом</p>
              </div>
              <div className={styles.techniqueItem}>
                <h3>Експерименти</h3>
                <p>Практичні вправи для дослідження досвіду</p>
              </div>
              <div className={styles.techniqueItem}>
                <h3>Робота з тілом</h3>
                <p>Увага до фізичних відчуттів та тілесних реакцій</p>
              </div>
              <div className={styles.techniqueItem}>
                <h3>Робота з мріями</h3>
                <p>Дослідження снів як частини особистісного досвіду</p>
              </div>
            </div>
          </ParticleCard>

          <ParticleCard
            className={`${styles.infoCard} ${styles.borderGlow}`}
            particleCount={12}
            glowColor={glowColor}
            enableTilt={true}
            clickEffect={true}
            enableMagnetism={true}
          >
            <h2>Для кого підходить?</h2>
            <p>
              Гештальт-терапія може бути корисною для людей, які:
            </p>
            <ul className={styles.benefitsList}>
              <li>Прагнуть краще розуміти себе та свої емоції</li>
              <li>Мають проблеми у стосунках</li>
              <li>Відчувають тривогу, стрес або депресію</li>
              <li>Прагнуть розвиватися особистісно</li>
              <li>Шукають сенс у житті</li>
            </ul>
          </ParticleCard>
        </div>
      </div>
    </div>
  )
}

export default Therapy

