
import { useState } from 'react'
import {
  LockKeyhole,
  Copy,
  RefreshCw,
  ShieldCheck,
  Check,
} from 'lucide-react'
import './App.css'

function App() {
  const [password, setPassword] = useState('')
  const [length, setLength] = useState(12)
  const [uppercase, setUppercase] = useState(true)
  const [lowercase, setLowercase] = useState(true)
  const [numbers, setNumbers] = useState(true)
  const [symbols, setSymbols] = useState(false)
  const [copied, setCopied] = useState(false)

  const generatePassword = () => {
    let characters = ''

    if (uppercase) characters += 'ABCDEFGHIJKLMNOPQRSTUVWXYZ'
    if (lowercase) characters += 'abcdefghijklmnopqrstuvwxyz'
    if (numbers) characters += '0123456789'
    if (symbols) characters += '!@#$%^&*()_+-=[]{}?'

    if (!characters) {
      setPassword('')
      return
    }

    let result = ''

    for (let i = 0; i < length; i++) {
      result += characters.charAt(
        Math.floor(Math.random() * characters.length)
      )
    }

    setPassword(result)
    setCopied(false)
  }

  const copyPassword = async () => {
    if (!password) return

    await navigator.clipboard.writeText(password)
    setCopied(true)

    setTimeout(() => setCopied(false), 2000)
  }

  return (
    <div className="app">
      <header className="navbar">
        <div className="brand">
          <LockKeyhole />
          <span>KeyForge</span>
        </div>
        <span className="secure-label">
          <ShieldCheck size={16} />
          Secure Password Generator
        </span>
      </header>

      <main className="main-content">
        <div className="intro">
          <span className="eyebrow">PASSWORD GENERATOR</span>
          <h1>Create strong passwords.</h1>
          <p>Generate secure passwords to protect your digital world.</p>
        </div>

        <section className="generator">
          <label className="section-label">YOUR PASSWORD</label>

          <div className="password-display">
            <span>{password || 'Your password will appear here'}</span>
            <button
              type="button"
              onClick={copyPassword}
              disabled={!password}
              aria-label="Copy password"
            >
              {copied ? <Check /> : <Copy />}
              {copied ? 'Copied' : 'Copy'}
            </button>
          </div>

          <div className="length-section">
            <div className="setting-heading">
              <label htmlFor="length">Password Length</label>
              <strong>{length}</strong>
            </div>
            <input
              id="length"
              type="range"
              min="4"
              max="32"
              value={length}
              onChange={(e) => setLength(Number(e.target.value))}
            />
            <div className="range-labels">
              <span>4 characters</span>
              <span>32 characters</span>
            </div>
          </div>

          <div className="options-section">
            <h3>Customize your password</h3>

            <label className="option">
              <span>Uppercase Letters (A-Z)</span>
              <input
                type="checkbox"
                checked={uppercase}
                onChange={(e) => setUppercase(e.target.checked)}
              />
            </label>

            <label className="option">
              <span>Lowercase Letters (a-z)</span>
              <input
                type="checkbox"
                checked={lowercase}
                onChange={(e) => setLowercase(e.target.checked)}
              />
            </label>

            <label className="option">
              <span>Numbers (0-9)</span>
              <input
                type="checkbox"
                checked={numbers}
                onChange={(e) => setNumbers(e.target.checked)}
              />
            </label>

            <label className="option">
              <span>Symbols (!@#$%)</span>
              <input
                type="checkbox"
                checked={symbols}
                onChange={(e) => setSymbols(e.target.checked)}
              />
            </label>
          </div>

          <button
            className="generate-btn"
            type="button"
            onClick={generatePassword}
          >
            <RefreshCw size={18} />
            Generate Password
          </button>

          <p className="security-note">
            <ShieldCheck size={16} />
            Your password is generated locally in your browser.
          </p>
        </section>
      </main>

      <footer>KeyForge · Protect your digital identity</footer>
    </div>
  )
}

export default App
