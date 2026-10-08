import { useState } from 'react'
import './App.css'

const getCategory = (bmi) => {
  if (bmi < 18.5) return { name: 'Underweight', tone: 'low' }
  if (bmi < 25) return { name: 'Healthy Weight', tone: 'healthy' }
  if (bmi < 30) return { name: 'Overweight', tone: 'high' }
  return { name: 'Obesity', tone: 'high' }
}

const bmiRanges = [
  { range: 'Below 18.5', category: 'Underweight', tone: 'low' },
  { range: '18.5 – 24.9', category: 'Healthy Weight', tone: 'healthy' },
  { range: '25.0 – 29.9', category: 'Overweight', tone: 'high' },
  { range: '30.0+', category: 'Obesity', tone: 'high' },
]

function ArrowMark() {
  return (
    <svg viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <path d="M16 7h6v6" />
      <path d="m22 7-8.5 8.5-5-5L2 17" />
    </svg>
  )
}

function RocketMark() {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      <path d="M12 15v5s3.03-.55 4-2c1.08-1.62 0-5 0-5" />
      <path d="M4.5 16.5c-1.5 1.26-2 5-2 5s3.74-.5 5-2c.71-.84.7-2.13-.09-2.91a2.18 2.18 0 0 0-2.91-.09" />
      <path d="M9 12a22 22 0 0 1 2-3.95A12.88 12.88 0 0 1 22 2c0 2.72-.78 7.5-6 11a22.4 22.4 0 0 1-4 2z" />
      <path d="M9 12H4s.55-3.03 2-4c1.62-1.08 5 .05 5 .05" />
    </svg>
  )
}

function App() {
  const [unit, setUnit] = useState('metric')
  const [weightKg, setWeightKg] = useState(68)
  const [heightCm, setHeightCm] = useState(172)

  const isValid = weightKg > 0 && heightCm > 0
  const bmi = isValid ? weightKg / ((heightCm / 100) ** 2) : null
  const category = bmi === null ? null : getCategory(bmi)
  const totalInches = Math.round(heightCm / 2.54)
  const feet = Math.floor(totalInches / 12)
  const inches = totalInches % 12
  const scalePosition = bmi === null ? 0 : Math.min(100, Math.max(0, ((bmi - 15) / 25) * 100))

  const switchUnit = (nextUnit) => {
    if (nextUnit !== unit) setUnit(nextUnit)
  }

  return (
    <main>
      <header className="site-header">
        <a className="brand" href="#" aria-label="Wellform home">
          <span className="brand-mark" aria-hidden="true"><span /></span>
          <span>wellform</span>
        </a>
        <nav className="main-nav" aria-label="Main navigation">
          <a href="#calculator">BMI calculator</a>
          <a href="#understanding">Understanding BMI</a>
        </nav>
        <a className="header-link" href="#understanding">
          Your health, explained <ArrowMark />
        </a>
      </header>

      <section className="hero">
        <div className="hero-copy">
          <div className="eyebrow"><span className="eyebrow-dot" /> A MORE THOUGHTFUL HEALTH CHECK-IN</div>
          <h1>Know your BMI.<br /><span>Understand your<br />health.</span></h1>
          <p className="hero-description">
            See what your BMI means and how it fits within the standard health ranges.
          </p>
          <a className="primary-link" href="#bmi-ranges">
            Explore BMI Ranges
            <span aria-hidden="true">↓</span>
          </a>
          <div className="trust-note">
            <span className="trust-icon"><ArrowMark /></span>
            A useful starting point—not a definition of you.
          </div>
        </div>

        <section className="calculator-card" id="calculator" aria-labelledby="calculator-title">
          <div className="card-heading">
            <div>
              <p className="card-kicker">YOUR PERSONAL SNAPSHOT</p>
              <h2 id="calculator-title">Let’s find your number.</h2>
            </div>
            <span className="card-sparkle"><RocketMark /></span>
          </div>

          <div className="unit-switch" role="group" aria-label="Measurement units">
            <button type="button" className={unit === 'metric' ? 'active' : ''} aria-pressed={unit === 'metric'} onClick={() => switchUnit('metric')}>Metric</button>
            <button type="button" className={unit === 'imperial' ? 'active' : ''} aria-pressed={unit === 'imperial'} onClick={() => switchUnit('imperial')}>Imperial</button>
          </div>

          <div className="fields">
            <label className="input-field">
              <span className="field-label">Weight</span>
              <span className="input-wrap">
                <input
                  aria-label={`Weight in ${unit === 'metric' ? 'kilograms' : 'pounds'}`}
                  type="number"
                  min="1"
                  max={unit === 'metric' ? '500' : '1100'}
                  step="any"
                  value={unit === 'metric' ? Number(weightKg.toFixed(1)) : Number((weightKg * 2.20462).toFixed(1))}
                  onChange={(event) => {
                    const value = Number(event.target.value)
                    setWeightKg(unit === 'metric' ? value : value / 2.20462)
                  }}
                />
                <span className="input-unit">{unit === 'metric' ? 'kg' : 'lb'}</span>
              </span>
            </label>

            {unit === 'metric' ? (
              <label className="input-field">
                <span className="field-label">Height</span>
                <span className="input-wrap">
                  <input
                    aria-label="Height in centimeters"
                    type="number"
                    min="50"
                    max="275"
                    step="any"
                    value={Number(heightCm.toFixed(1))}
                    onChange={(event) => setHeightCm(Number(event.target.value))}
                  />
                  <span className="input-unit">cm</span>
                </span>
              </label>
            ) : (
              <div className="input-field">
                <span className="field-label">Height</span>
                <div className="height-pair">
                  <label className="input-wrap">
                    <input
                      aria-label="Height in feet"
                      type="number"
                      min="1"
                      max="8"
                      value={feet}
                      onChange={(event) => setHeightCm((Number(event.target.value) * 12 + inches) * 2.54)}
                    />
                    <span className="input-unit">ft</span>
                  </label>
                  <label className="input-wrap">
                    <input
                      aria-label="Height in inches"
                      type="number"
                      min="0"
                      max="11"
                      value={inches}
                      onChange={(event) => setHeightCm((feet * 12 + Number(event.target.value)) * 2.54)}
                    />
                    <span className="input-unit">in</span>
                  </label>
                </div>
              </div>
            )}
          </div>

          <div className={`result-panel ${category?.tone ?? ''}`} aria-live="polite">
            <div className="result-topline">
              <span className="result-label">YOUR BMI</span>
              {category && <span className="result-badge"><span />{category.name}</span>}
            </div>
            <div className="result-reading">
              <strong>{bmi === null ? 'Add your details above' : `Your BMI is ${bmi.toFixed(1)}`}</strong>
              {category && <span className="result-caption">You’re currently in the <strong>{category.name}</strong> range.</span>}
            </div>
            <div className="bmi-scale" aria-label={bmi === null ? 'BMI scale' : `BMI scale indicator at ${bmi.toFixed(1)}`}>
              <span className="scale-indicator" style={{ left: `${scalePosition}%` }} />
            </div>
            <div className="scale-labels"><span>Underweight</span><span>Healthy</span><span>Overweight</span><span>Obesity</span></div>
          </div>
          <p className="card-footnote"><span aria-hidden="true">ⓘ</span> BMI is a screening guide, not a diagnosis.</p>
        </section>
        <div className="hero-decoration decoration-one" aria-hidden="true" />
        <div className="hero-decoration decoration-two" aria-hidden="true" />
      </section>

      <section className="understanding" id="understanding">
        <div className="understanding-heading">
          <p className="section-kicker">A NUMBER IN CONTEXT</p>
          <h2>What does BMI<br />actually tell you?</h2>
        </div>
        <p className="understanding-copy">
          Body mass index compares your weight to your height. It can be a helpful first conversation—not a measure of your worth, or a complete picture of your health.
        </p>
        <div className="info-card">
          <span className="info-icon"><ArrowMark /></span>
          <div>
            <h3>More than a number</h3>
            <p>Age, muscle mass, and many other things matter, too. A healthcare professional can help put your results in context.</p>
          </div>
        </div>
      </section>

      <section className="bmi-ranges" id="bmi-ranges" aria-labelledby="bmi-ranges-title">
        <div className="ranges-heading">
          <p className="section-kicker">A QUICK REFERENCE</p>
          <h2 id="bmi-ranges-title">BMI Ranges</h2>
          <p>See where your result fits. The highlighted range updates with your calculation.</p>
        </div>
        <div className="ranges-table-wrap">
          <table className="ranges-table">
            <thead>
              <tr><th scope="col">BMI</th><th scope="col">Category</th></tr>
            </thead>
            <tbody>
              {bmiRanges.map((range) => (
                <tr key={range.category} className={category?.name === range.category ? `current-range ${range.tone}` : ''} aria-current={category?.name === range.category ? 'true' : undefined}>
                  <td>{range.range}</td>
                  <td>{range.category}{category?.name === range.category && <span className="current-result">Your range</span>}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>

      <footer className="site-footer">
        <a className="brand footer-brand" href="#">
          <span className="brand-mark" aria-hidden="true"><span /></span>
          <span>wellform</span>
        </a>
        <span>A kinder way to check in with yourself.</span>
        <span className="footer-note">For general information only · Not medical advice</span>
      </footer>
    </main>
  )
}

export default App
