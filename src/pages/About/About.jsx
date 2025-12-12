import { ParticleCard } from '../../components/MagicBento/MagicBento'
import { GlobalSpotlight } from '../../components/MagicBento/GlobalSpotlight'
import { useRef } from 'react'
import styles from './About.module.css'

function About() {
  const gridRef = useRef(null);

  return (
    <div className={styles.page}>
      <GlobalSpotlight
        gridRef={gridRef}
        enabled={true}
        spotlightRadius={300}
        glowColor="0, 255, 136"
      />
      <div className={styles.pageContent} ref={gridRef}>
        <div className={styles.heroSection}>
          <h1 className={styles.pageTitle}>
            Про гештальт-терапію
          </h1>
          <p className={`${styles.pageSubtitle} ${styles.animateFadeInDelay}`}>
            Пізнайте більше про цей підхід
          </p>
        </div>

        <div className={`${styles.contentSection} ${styles.animateSlideUp}`}>
          <ParticleCard
            className={`${styles.infoCard} ${styles.borderGlow}`}
            particleCount={12}
            glowColor="0, 255, 136"
            enableTilt={true}
            clickEffect={true}
            enableMagnetism={true}
          >
            <h2>Що таке гештальт-терапія?</h2>
            <p>
              Гештальт-терапія — це форма психотерапії, заснована на принципах 
              гештальт-психології. Вона фокусується на теперішньому моменті та 
              досвіді клієнта, допомагаючи йому краще розуміти себе та свої 
              взаємини з навколишнім світом.
            </p>
          </ParticleCard>

          <ParticleCard
            className={`${styles.infoCard} ${styles.borderGlow}`}
            particleCount={12}
            glowColor="0, 255, 136"
            enableTilt={true}
            clickEffect={true}
            enableMagnetism={true}
          >
            <h2>Основні принципи</h2>
            <ul className={styles.principlesList}>
              <li>
                <strong>Тут і зараз:</strong> Фокус на поточному досвіді
              </li>
              <li>
                <strong>Свідомість:</strong> Розвиток усвідомлення своїх почуттів та потреб
              </li>
              <li>
                <strong>Відповідальність:</strong> Прийняття відповідальності за своє життя
              </li>
              <li>
                <strong>Цілісність:</strong> Розуміння себе як цілісної особистості
              </li>
            </ul>
          </ParticleCard>

          <ParticleCard
            className={`${styles.infoCard} ${styles.borderGlow}`}
            particleCount={12}
            glowColor="0, 255, 136"
            enableTilt={true}
            clickEffect={true}
            enableMagnetism={true}
          >
            <h2>Історія</h2>
            <p>
              Гештальт-терапія була розроблена Фріцем Перлзом, Лаурою Перлз та 
              Полом Гудманом у 1940-1950-х роках. Вона поєднує елементи 
              психоаналізу, гештальт-психології та екзистенційної філософії.
            </p>
          </ParticleCard>
        </div>
      </div>
    </div>
  )
}

export default About

