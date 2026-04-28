import { useEffect, useState, type CSSProperties } from 'react'
import './LandingPage.css'
import heroImage from './assets/hero-image-rentten-lituania.png'
import heroImageMobile from './assets/hero-image-mobile .png'
import step1Illustration from './assets/Step1Illustration.svg'
import step2Illustration from './assets/Step2Illustration.svg'
import step3Illustration from './assets/Step3Illustration.svg'
import step4Illustration from './assets/Step4Illustration.svg'
import firstFeatureIcon from './assets/firstFeatured icon.svg'
import secondFeatureIcon from './assets/secondFeatured icon.svg'
import thirdFeatureIcon from './assets/thirdFeatured icon.svg'
import fourthFeatureIcon from './assets/fourthFeatured icon.svg'
import fifthFeatureIcon from './assets/fifthFeatured icon.svg'
import sixthFeatureIcon from './assets/sixthFeatured icon.svg'
import audienceImageTop from './assets/nuomotojams-img2.png'
import audienceImageBottom from './assets/brokerians-img.png'
import audienceCheckIcon from './assets/CheckIcon.svg'
import audienceLandlordIcon from './assets/nuomotojansTopIcon.svg'
import audienceBrokerIcon from './assets/brokeriansTopIcon.svg'
import logoImage from './assets/logo-rentten.svg'
import contactIconMail from './assets/emailIcon.svg'
import contactIconLocation from './assets/locationIcon.svg'
import contactIconPhone  from './assets/callIcon.svg'
import phoneFeaturesImg from './assets/features-image-centered.svg'
import apieArrowRightIcon from './assets/arrow.svg'
import apieProblemIcon from './assets/icon-problem.svg'
import apieSolutionIcon from './assets/icon-solution.svg'
import growthSectionMockup from './assets/growth-mockup.svg'
import waitlistAvatarOlivia from './assets/avatar1.jpeg'
import waitlistAvatarPhoenix from './assets/avatar2.jpeg'
import waitlistAvatarLana from './assets/avatar3.jpeg'
import waitlistAvatarDemi from './assets/avatar4.jpeg'
import waitlistAvatarCandice from './assets/avatar5.jpeg'


const faqItems = [
 
  { q: 'Ar platforma bus nemokama?', a: 'Pradiniame etape platformą bus galima išbandyti nemokamai su ribotu užklausų skaičiumi.' },
  { q: 'Ar mano duomenys bus saugūs?', a: 'RENTTEN naudoja tik tuos duomenis, kuriuos nuomininkas pateikia su savo sutikimu. Platforma siekia užtikrinti duomenų saugumą ir privatumo apsaugą viso proceso metu.' },
  { q: 'Kokią informaciją pateikia RENTTEN?', a: 'Platforma pateikia nuomininko įvertinimą, kuriame gali būti matomas patikimumo įvertinimas, finansinio stabilumo signalai ir kiti patikimumo indikatoriai. Nuomotojas ar brokeris taip pat gali matyti tapatybės patvirtinimą, elgesio signalus ir ankstesnio nuomotojo kontaktus, jeigu jie yra.' },
  { q: 'Ar nuomininkas turi duoti sutikimą?', a: 'Duomenys pateikiami tik nuomininkui davus sutikimą.' },
  { q: 'Kiek laiko užtrunka gauti nuomininko patikimumo įvertinimą?', a: 'Dažniausiai procesas užtrunka vos kelias minutes nuo momento, kai nuomininkas pateikia reikalingą informaciją.' },
  { q: 'Ar RENTTEN priima sprendimą už nuomotoją?', a: 'Ne. RENTTEN pateikia patikimumo signalus ir kontekstą, kad nuomotojas galėtų priimti informuotą sprendimą.' },

]


export default function LandingPage() {
  const [heroEmail, setHeroEmail] = useState('')
  const [ctaEmail, setCtaEmail] = useState('')
  const [submitMessage, setSubmitMessage] = useState<{ type: 'success' | 'error'; text: string } | null>(null)
  const [openFaqId, setOpenFaqId] = useState<string | null>(faqItems[0]?.q ?? null)
  const [isNavScrolled, setIsNavScrolled] = useState(false)
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
  const [hasStartedScrolling, setHasStartedScrolling] = useState(false)

  const isValidEmail = (value: string) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value)

  useEffect(() => {
    const onScroll = () => {
      setIsNavScrolled(window.scrollY > 50)
      setHasStartedScrolling(window.scrollY > 0)
    }

    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  useEffect(() => {
    document.body.style.overflow = isMobileMenuOpen ? 'hidden' : ''
    return () => {
      document.body.style.overflow = ''
    }
  }, [isMobileMenuOpen])

  useEffect(() => {
    const elements = document.querySelectorAll<HTMLElement>('.reveal-on-scroll')
    if (elements.length === 0) {
      return
    }

    if (!('IntersectionObserver' in window)) {
      elements.forEach((element) => element.classList.add('is-visible'))
      return
    }

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (!entry.isIntersecting) {
            return
          }

          entry.target.classList.add('is-visible')
          observer.unobserve(entry.target)
        })
      },
      { threshold: 0.15, rootMargin: '0px 0px -10% 0px' },
    )

    elements.forEach((element) => observer.observe(element))
    return () => observer.disconnect()
  }, [])

  const submitEmail = async (email: string, source: 'hero' | 'cta') => {
    const normalizedEmail = email.trim().toLowerCase()

    if (!isValidEmail(normalizedEmail)) {
      setSubmitMessage({ type: 'error', text: 'Prašome įvesti teisingą el. pašto adresą.' })
      return
    }

    setSubmitMessage(null)

    try {
      const response = await fetch('/api/subscribe', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email: normalizedEmail }),
      })

      const payload = (await response.json()) as { error?: string }
      if (!response.ok) {
        const fallbackError = 'Nepavyko išsaugoti el. pašto adreso. Bandykite dar kartą.'
        const errorText =
          response.status === 409
            ? 'Šis el. pašto adresas jau yra užregistruotas.'
            : payload.error ?? fallbackError
        setSubmitMessage({ type: 'error', text: errorText })
        return
      }

      if (source === 'hero') {
        setHeroEmail('')
      } else {
        setCtaEmail('')
      }

      setSubmitMessage({ type: 'success', text: 'Ačiū! Jūsų el. paštas sėkmingai išsaugotas.' })
    } catch {
      setSubmitMessage({ type: 'error', text: 'Nepavyko prisijungti prie serverio. Bandykite dar kartą.' })
    }
  }
  const scrollToSection = (sectionId: string) => {
    const section = document.getElementById(sectionId)
    if (!section) {
      return
    }

    setIsMobileMenuOpen(false)
    section.scrollIntoView({
      behavior: 'smooth',
      block: 'start',
    })
  }

  const scrollToTop = () => {
    if (window.scrollY <= 0) {
      return
    }

    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    })
  }

  const scrollToSignupInput = () => {
    const signupInput = document.getElementById('hero-signup-input') as HTMLInputElement | null
    if (!signupInput) {
      return
    }

    setIsMobileMenuOpen(false)
    signupInput.scrollIntoView({
      behavior: 'smooth',
      block: 'center',
    })

    window.setTimeout(() => {
      signupInput.focus()
    }, 450)
  }

  const toggleFaqItem = (question: string) => {
    setOpenFaqId((current) => (current === question ? null : question))
  }

  const getFaqId = (question: string) =>
    question
      .toLowerCase()
      .replace(/[^\w\s-]/g, '')
      .trim()
      .replace(/\s+/g, '-')

  return (
    <>
    <main className="lp">
      <header className={`lp-nav ${isNavScrolled || isMobileMenuOpen ? 'scrolled' : ''}`}>
        <div className="lp-wrap lp-nav-inner">
          <button type="button" className="lp-logo" onClick={scrollToTop} aria-label="Scroll to top">
            <img src={logoImage} alt="Rentten" />
          </button>
          <nav className="lp-nav-links">
            <button type="button" className="lp-nav-link-button" onClick={() => scrollToSection('apie')}>Apie</button>
            <button type="button" className="lp-nav-link-button" onClick={() => scrollToSection('kam-skirta')}>Kam skirta</button>
            <button type="button" className="lp-nav-link-button" onClick={() => scrollToSection('kaip-veikia')}>Kaip veikia</button>
            <button type="button" className="lp-nav-link-button" onClick={() => scrollToSection('duk')}>DUK</button>
          </nav>
          <div className="lp-nav-actions">
            <button className="lp-btn lp-btn-ghost lp-btn-temp-hidden">Log in</button>
            <button
              type="button"
              className="lp-btn lp-btn-primary lp-btn-temp-hidden"
              onClick={() => scrollToSection('rezervuoti')}
            >
              Registruotis
            </button>
            <button type="button" className="lp-btn lp-btn-primary" onClick={scrollToSignupInput}>
              Sužinok pirmas
            </button>
          </div>
          <button
            type="button"
            className={`lp-mobile-toggle ${isMobileMenuOpen ? 'open' : ''}`}
            aria-label={isMobileMenuOpen ? 'Close menu' : 'Open menu'}
            aria-expanded={isMobileMenuOpen}
            aria-controls="mobile-nav-menu"
            onClick={() => setIsMobileMenuOpen((prev) => !prev)}
          >
            <span />
            <span />
            <span />
          </button>
        </div>
        <nav id="mobile-nav-menu" className={`lp-mobile-menu ${isMobileMenuOpen ? 'open' : ''}`}>
          <button type="button" className="lp-mobile-menu-item" onClick={() => scrollToSection('apie')}>Apie</button>
          <button type="button" className="lp-mobile-menu-item" onClick={() => scrollToSection('kam-skirta')}>Kam skirta</button>
          <button type="button" className="lp-mobile-menu-item" onClick={() => scrollToSection('kaip-veikia')}>Kaip veikia</button>
          <button type="button" className="lp-mobile-menu-item" onClick={() => scrollToSection('duk')}>DUK</button>
        </nav>
      </header>
      <button
        type="button"
        className={`lp-scroll-indicator ${hasStartedScrolling ? 'is-hidden' : ''}`}
        onClick={() => scrollToSection('apie')}
        aria-label="Scroll to apie section"
      >
        <span className="lp-scroll-indicator-mouse">
          <span className="lp-scroll-indicator-dot" />
        </span>
        <span className="lp-scroll-indicator-label">Scroll down</span>
      </button>

      <section className="lp-hero">
        <div className="lp-wrap lp-hero-grid">
          <div>
            <h1>Suprask, kam nuomoji - remkis duomenimis, ne nuojauta</h1>
            <p className="lead">
              <span>RENTTEN</span> leidžia nuomininkams saugiai pasidalinti patikimumo signalais, o
              nuomotojams ir brokeriams - priimti sprendimus remiantis objektyviais duomenimis.
            </p>
            <p className="sublead">Prisijunk prie laukiančiųjų sąrašo. Sužinok pirmas.</p>
            <form
              className="lp-capture"
              onSubmit={async (event) => {
                event.preventDefault()
                await submitEmail(heroEmail, 'hero')
              }}
            >
              <input
                id="hero-signup-input"
                type="email"
                placeholder="Jūsų el. pašto adresas"
                value={heroEmail}
                onChange={(event) => setHeroEmail(event.target.value)}
                required
              />
              <button className="lp-btn lp-btn-primary" type="submit">
              Rezervuoti vietą
              </button>
            </form>
            <small>Palikdami savo el. paštą, jūs sutinkate su mūsų <a href="#privacy" className="lp-link-primary">privatumo politika.</a></small>
            {submitMessage ? (
              <p className={submitMessage.type === 'success' ? 'lp-form-feedback-success' : 'lp-form-feedback-error'}>
                {submitMessage.text}
              </p>
            ) : null}
            <div className="lp-waitlist-social-proof">
              <div className="lp-waitlist-avatars" data-node-id="696:9845">
                {[
                  waitlistAvatarOlivia,
                  waitlistAvatarPhoenix,
                  waitlistAvatarLana,
                  waitlistAvatarDemi,
                  waitlistAvatarCandice,
                ].map((avatarSrc, index) => (
                  <span className="lp-waitlist-avatar" key={avatarSrc} style={{ '--avatar-index': index } as CSSProperties}>
                    <img src={avatarSrc} alt="" loading="lazy" />
                  </span>
                ))}
              </div>
              <p className="lp-waitlist-caption" data-node-id="696:9855">
                Over <strong>500+</strong> versti į lietuvių kalbą 
              </p>
            </div>
         

          </div>
          <div className="lp-hero-image">
            <picture>
              <source media="(max-width: 1000px)" srcSet={heroImageMobile} />
              <img src={heroImage} alt="Rentten hero" />
            </picture>
          </div>
        </div>
      </section>

      <section id="apie" className="lp-section lp-apie lp-soft">
        <div className="lp-wrap center-title reveal-on-scroll">
          <p className="eyebrow">Apie RENTTEN</p>
          <h2>Nuo spėjimo prie aiškesnių sprendimų apie nuomininką</h2>
          <p className="section-lead">Nuomos rinka veikia vedima pasitikėjimo. RENTTEN suteikia tam pagrindą.</p>
        </div>
        <div className="lp-wrap lp-apie-compare reveal-on-scroll">
          <article className="lp-apie-column lp-apie-column-problems">
            <div className="lp-apie-icon-shell">
              <img className="lp-apie-icon-bg" src={apieProblemIcon} alt="" loading="lazy" />
            </div>
            <div className="lp-apie-column-content">
              <h3>PROBLEMA</h3>
              <ul>
                <li className="lp-apie-li-reveal" style={{ '--ap-delay': '0ms' } as CSSProperties}>
                Trūksta patikimos informacijos apie nuomininką 
                </li>
                <li className="lp-apie-li-reveal" style={{ '--ap-delay': '440ms' } as CSSProperties}>
                Sprendimai remiasi intuicija 
                </li>
                <li className="lp-apie-li-reveal" style={{ '--ap-delay': '880ms' } as CSSProperties}>
                Daugiau rizikos ir konfliktų
                </li>
              </ul>
            </div>
          </article>

          <div className="lp-apie-arrows" aria-hidden="true">
            <img src={apieArrowRightIcon} alt="" loading="lazy" />
            <img src={apieArrowRightIcon} alt="" loading="lazy" />
            <img src={apieArrowRightIcon} alt="" loading="lazy" />

          </div>

          <article className="lp-apie-column lp-apie-column-solution">
            <div className="lp-apie-icon-shell">
              <img className="lp-apie-icon-bg" src={apieSolutionIcon} alt="" loading="lazy" />
        
            </div>
            <div className="lp-apie-column-content">
              <h3>RENTTEN SPRENDIMAS</h3>
              <ul>
                <li className="lp-apie-li-reveal" style={{ '--ap-delay': '220ms' } as CSSProperties}>
                Sujungia patikimumo signalus 
                </li>
                <li className="lp-apie-li-reveal" style={{ '--ap-delay': '660ms' } as CSSProperties}>
                Pateikia aiškų įvertinimą 
                </li>
                <li className="lp-apie-li-reveal" style={{ '--ap-delay': '1100ms' } as CSSProperties}>
                Leidžia priimti sprendimą prieš sutartį 
                </li>
              </ul>
            </div>
          </article>
        </div>
      </section>

      <section className="lp-section lp-features">
        <div className="lp-wrap three-col">
          <div className="feature-list">
            <article className="feature-item reveal-on-scroll" style={{ '--reveal-delay': '0ms' } as CSSProperties}>
              <div className="feature-item-icon">
                <img className="feature-item-icon-bg" src={firstFeatureIcon} alt="" />
              </div>
              <div className="feature-item-text">
                <h3>Aiškesni sprendimai</h3>
                <p>
                  RENTTEN pateikia struktūruotą nuomininko patikimumo apžvalgą, kuri padeda
                  nuomotojams ir brokeriams greičiau suprasti svarbiausius rizikos signalus.
                </p>
              </div>
            </article>
            <article className="feature-item reveal-on-scroll" style={{ '--reveal-delay': '70ms' } as CSSProperties}>
              <div className="feature-item-icon">
              <img className="feature-item-icon-bg" src={secondFeatureIcon} alt="" />
              </div>
              <div className="feature-item-text">
                <h3>Mažiau rizikos</h3>
                <p>
                  Finansinio stabilumo signalai padeda geriau įvertinti tikimybę, kad nuomos
                  mokėjimai bus atliekami laiku.
                </p>
              </div>
            </article>
            <article className="feature-item reveal-on-scroll" style={{ '--reveal-delay': '140ms' } as CSSProperties}>
              <div className="feature-item-icon">
              <img className="feature-item-icon-bg" src={thirdFeatureIcon} alt="" />
              </div>
              <div className="feature-item-text">
                <h3>Daugiau skaidrumo</h3>
                <p>
                  Aiškesni patikimumo signalai sukuria daugiau pasitikėjimo tarp nuomininko,
                  brokerio ir nuomotojo.
                </p>
              </div>
            </article>
          </div>
          <div className="phone-block">
            <img src={phoneFeaturesImg} alt="Phone preview" />
          </div>
          <div className="feature-list">
            <article className="feature-item reveal-on-scroll" style={{ '--reveal-delay': '210ms' } as CSSProperties}>
              <div className="feature-item-icon">
              <img className="feature-item-icon-bg" src={fourthFeatureIcon} alt="" />
              </div>
              <div className="feature-item-text">
                <h3>Greitesni sprendimai</h3>
                <p>
                  Nuomininko patikimumo įvertinimas leidžia greičiau įvertinti kandidatą ir
                  sumažinti laiką, skiriamą papildomiems patikrinimams.
                </p>
              </div>
            </article>
            <article className="feature-item reveal-on-scroll" style={{ '--reveal-delay': '280ms' } as CSSProperties}>
              <div className="feature-item-icon">
              <img className="feature-item-icon-bg" src={fifthFeatureIcon} alt="" />
              </div>
              <div className="feature-item-text">
                <h3>Sukurta nuomos rinkai</h3>
                <p>
                  Skirtingai nuo bendrų kredito vertinimo sistemų, RENTTEN yra pritaikytas
                  būtent nuomos santykiams ir jų specifinėms rizikoms.
                </p>
              </div>
            </article>
            <article className="feature-item reveal-on-scroll" style={{ '--reveal-delay': '350ms' } as CSSProperties}>
              <div className="feature-item-icon">
              <img className="feature-item-icon-bg" src={sixthFeatureIcon} alt="" />
              </div>
              <div className="feature-item-text">
                <h3>Nuolatinė plėtra</h3>
                <p>
                  Ateityje diegiamos naujos AI funkcijos ir papildomi patikimumo signalai, kad
                  kiekvienas sprendimas būtų dar tikslesnis.
                </p>
              </div>
            </article>
          </div>
        </div>
      </section>

      <section id="kam-skirta" className="lp-section lp-audience lp-soft">
        <div className="lp-wrap center-title reveal-on-scroll">
          <p className="eyebrow">Kam skirta</p>
          <h2>Kam skirtas RENTTEN?</h2>
          <p className="lp-audience-intro">RENTTEN padeda nuomotojams ir brokeriams priimti saugesnius, greitesnius ir duomenimis grįstus sprendimus renkantis nuomininką.</p>
        </div>
        <div className="lp-wrap lp-audience-v2">
          <div className="lp-audience-row">
            <div className="lp-audience-image reveal-on-scroll" style={{ '--reveal-delay': '0ms' } as CSSProperties}>
              <img src={audienceImageTop} alt="Nuomotojai aptaria nuomos dokumentus" />
            </div>
            <article className="lp-audience-content reveal-on-scroll" style={{ '--reveal-delay': '80ms' } as CSSProperties}>
              <span className="lp-audience-featured-icon" aria-hidden="true">
                <img src={audienceLandlordIcon} alt="" />
              </span>
              <h3>Nuomotojams</h3>
              <p>RENTTEN padeda sumažinti nežinomybę renkantis nuomininką.</p>
              <ul>
                <li><img src={audienceCheckIcon} alt="" aria-hidden="true" />Aiškesnis supratimas apie nuomininko finansinį stabilumą</li>
                <li><img src={audienceCheckIcon} alt="" aria-hidden="true" />Mažesnė nuomos mokėjimų vėlavimo rizika</li>
                <li><img src={audienceCheckIcon} alt="" aria-hidden="true" />Mažesnė konfliktų tikimybė</li>
                <li><img src={audienceCheckIcon} alt="" aria-hidden="true" />Sprendimai paremti duomenimis, ne intuicija</li>
              </ul>
            </article>
          </div>

          <div className="lp-audience-row">
            <article className="lp-audience-content reveal-on-scroll" style={{ '--reveal-delay': '120ms' } as CSSProperties}>
              <span className="lp-audience-featured-icon" aria-hidden="true">
                <img src={audienceBrokerIcon} alt="" />
              </span>
              <h3>Brokeriams</h3>
              <p>RENTTEN leidžia pasiūlyti profesionalesnį nuomininkų atrankos procesą.</p>
              <ul>
                <li><img src={audienceCheckIcon} alt="" aria-hidden="true" />Struktūruotas nuomininkų vertinimas</li>
                <li><img src={audienceCheckIcon} alt="" aria-hidden="true" />Daugiau skaidrumo tarp brokerio, nuomotojo ir nuomininko</li>
                <li><img src={audienceCheckIcon} alt="" aria-hidden="true" />Stipresnis pasitikėjimas brokerio rekomendacijomis</li>
                <li><img src={audienceCheckIcon} alt="" aria-hidden="true" />Galimybė išsiskirti konkurencingoje rinkoje</li>
              </ul>
            </article>
            <div className="lp-audience-image reveal-on-scroll" style={{ '--reveal-delay': '160ms' } as CSSProperties}>
              <img src={audienceImageBottom} alt="Brokerio konsultacija su klientu" />
            </div>
          </div>
        </div>
      </section>

      <section id="kaip-veikia" className="lp-section lp-how">
        <div className="lp-wrap center-title reveal-on-scroll">
          <p className="eyebrow">Kaip veikia</p>
          <h2>Kaip veikia RENTTEN?</h2>
          <p className="section-lead">Ateityje RENTTEN planuoja papildyti platformą funkcijomis:</p>
        </div>
        <div className="lp-wrap steps">
          {[
            [
              '1 Žingsnis',
              'Nuomotojas arba brokeris sukuria užklausą',
              'Sukuriama užklausa nuomininkui ir inicijuojamas patikimumo vertinimo procesas platformoje.',
              step1Illustration,
            ],
            [
              '2 Žingsnis',
              'Nuomininkas gauna kvietimą',
              'Nuomininkas el. paštu gauna užklausą ir pateikia reikalingą informaciją apie darbą, pajamas, finansinį stabilumą ir patvirtina savo tapatybę.',
              step2Illustration,
            ],
            [
              '3 Žingsnis',
              'Sukuriamas patikimumo įvertinimas',
              'Sistema sujungia pateiktus signalus į aiškią patikimumo apžvalgą, kurią lengva peržiūrėti nuomotojui ar brokeriui.',
              step3Illustration,
            ],
            [
              '4 Žingsnis',
              'Nuomotojas mato rezultatą',
              'Nuomotojas gauna struktūruotą rezultatą ir gali priimti sprendimą remdamasis duomenimis, o ne vien intuicija.',
              step4Illustration,
            ],
          ].map(([step, title, description, icon], index) => (
            <article key={step} className="step-card reveal-on-scroll" style={{ '--reveal-delay': `${index * 70}ms` } as CSSProperties}>
              <img className="step-icon" src={icon} alt="" aria-hidden="true" />
              <p className="step-label">{step}</p>
              <h4>{title}</h4>
              <p className="step-copy">{description}</p>
            </article>
          ))}
        </div>
      </section>

      <section className="lp-section lp-growth" data-node-id="550:5605">
        <div className="lp-wrap center-title reveal-on-scroll lp-growth-heading">
          <p className="eyebrow">Kaip plėsis RENTTEN?</p>
          <h2>Kaip plėsis RENTTEN?</h2>
          <p className="section-lead">Ateityje RENTTEN planuoja papildyti platformą funkcijomis</p>
        </div>

        <div className="lp-wrap lp-growth-layout">
          <div className="lp-growth-list-wrap reveal-on-scroll">
            <ul className="lp-growth-list">
              <li><img src={audienceCheckIcon} alt="" aria-hidden="true" />Nuomos istorija</li>
              <li><img src={audienceCheckIcon} alt="" aria-hidden="true" />Ankstesnių nuomotojų atsiliepimai</li>
              <li><img src={audienceCheckIcon} alt="" aria-hidden="true" />Elgesio signalai (tvarkingumas, konfliktai, turto priežiūra)</li>
              <li><img src={audienceCheckIcon} alt="" aria-hidden="true" />Informacija apie įsiskolinimus</li>
              <li><img src={audienceCheckIcon} alt="" aria-hidden="true" />Rekomendacijos nuomos sutarčių sąlygoms</li>
            </ul>
          </div>
          <div className="lp-growth-mockup reveal-on-scroll" style={{ '--reveal-delay': '100ms' } as CSSProperties}>
            <img src={growthSectionMockup} alt="Rentten dashboard preview" />
          </div>
        </div>
      </section>

      <section id="rezervuoti" className="lp-cta">
        <div className="lp-wrap cta-grid">
          <div>
            <h3>Prisijunk prie laukiančiųjų sąrašo</h3>
            <p>Sužinok pirmas.</p>
          </div>
          <div>
            <form
              className="lp-capture"
              onSubmit={async (event) => {
                event.preventDefault()
                await submitEmail(ctaEmail, 'cta')
              }}
            >
              <input
                type="email"
                placeholder="Jūsų el. pašto adresas"
                value={ctaEmail}
                onChange={(event) => setCtaEmail(event.target.value)}
                required
              />
              <button className="lp-btn lp-btn-magenta" type="submit">
                Rezervuoti vietą
              </button>
            </form>
            <small>Palikdami savo el. paštą, jūs sutinkate su mūsų <a href="#privacy" className="lp-link-light">privatumo politika.</a></small>
            {submitMessage ? (
              <p className={submitMessage.type === 'success' ? 'lp-form-feedback-success' : 'lp-form-feedback-error'}>
                {submitMessage.text}
              </p>
            ) : null}
             <div className="lp-waitlist-social-proof">
              <div className="lp-waitlist-avatars" data-node-id="696:9845">
                {[
                  waitlistAvatarOlivia,
                  waitlistAvatarPhoenix,
                  waitlistAvatarLana,
                  waitlistAvatarDemi,
                  waitlistAvatarCandice,
                ].map((avatarSrc, index) => (
                  <span className="lp-waitlist-avatar" key={avatarSrc} style={{ '--avatar-index': index } as CSSProperties}>
                    <img src={avatarSrc} alt="" loading="lazy" />
                  </span>
                ))}
              </div>
              <p className="lp-waitlist-caption" data-node-id="696:9855">
              Daugiau nei 500+ nuomotojų laukiančiųjų sąraše
              </p>
            </div>
          </div>
        </div>
      </section>

      <section id="duk" className="lp-section lp-faq lp-soft">
        <div className="lp-wrap center-title reveal-on-scroll">
          <p className="eyebrow">DUK</p>
          <h2>Dažniausiai užduodami klausimai apie RENTTEN</h2>
        </div>
        <div className="lp-wrap faq">
          {faqItems.map((item) => {
            const faqId = getFaqId(item.q)
            return (
            <article key={item.q} className={`faq-item ${openFaqId === item.q ? 'is-open' : ''}`}>
              <h4 className="faq-question">
                <button
                  type="button"
                  className="faq-trigger"
                  onClick={() => toggleFaqItem(item.q)}
                  aria-expanded={openFaqId === item.q}
                  aria-controls={`faq-panel-${faqId}`}
                  id={`faq-trigger-${faqId}`}
                >
                  <span>{item.q}</span>
                  <span className="faq-icon" aria-hidden="true">
                    {openFaqId === item.q ? '−' : '+'}
                  </span>
                </button>
              </h4>
              <div
                id={`faq-panel-${faqId}`}
                role="region"
                aria-labelledby={`faq-trigger-${faqId}`}
                className="faq-panel"
              >
                <div className="faq-panel-inner">
                  <p>{item.a}</p>
                </div>
              </div>
            </article>
            )
          })}
        </div>
      </section>

      <section id="kontaktai" className="lp-section lp-contact" aria-labelledby="contact-heading" data-node-id="886:16391">
        <div className="lp-contact-inner">
          <div className="lp-wrap center-title reveal-on-scroll lp-contact-heading">
            <p className="eyebrow">Susisiekite</p>
            <h2 id="contact-heading">Susisiekite su mumis</h2>
            <p className="lp-contact-lead">Turi klausimų? Parašyk mums</p>
          </div>
          <div className="lp-wrap lp-contact-grid reveal-on-scroll">
            <div className="lp-contact-card">
              <div className="lp-contact-featured" aria-hidden="true">
                <img className="lp-contact-featured-bg" src={contactIconMail} alt="" />
            
              </div>
              <p className="lp-contact-card-label">El. paštas</p>
              <a className="lp-contact-card-link" href="mailto:info@rentten.com">
                info@rentten.com
              </a>
            </div>
            <div className="lp-contact-card">
              <div className="lp-contact-featured" aria-hidden="true">
                <img className="lp-contact-featured-bg" src={contactIconLocation} alt="" />
              
              </div>
              <p className="lp-contact-card-label">Ofisas</p>
              <a
                className="lp-contact-card-link"
                href="https://www.google.com/maps/search/?api=1&query=Gedimino%20pr.%201%2C%20LT-01103%20Vilnius%2C%20Lithuania"
                target="_blank"
                rel="noreferrer"
              >
                Gedimino pr. 1, LT-01103 Vilnius, Lietuva
              </a>
            </div>
            <div className="lp-contact-card">
              <div className="lp-contact-featured" aria-hidden="true">
                <img className="lp-contact-featured-bg" src={contactIconPhone} alt="" />
               
              </div>
              <p className="lp-contact-card-label">Telefono nr.</p>
              <a className="lp-contact-card-link" href="tel:+37060000000">
                +370 600 00000
              </a>
            </div>
          </div>
        </div>
      </section>
    </main>

      <footer className="lp-footer" data-node-id="334:8039" aria-label="Site footer">
        <div className="lp-wrap lp-footer-inner">
          <div className="lp-footer-main">
            <div className="lp-footer-left">
              <p className="lp-footer-logo">RENTTEN</p>
              <nav className="lp-footer-nav" aria-label="Footer navigation">
                <button type="button" className="lp-footer-link" onClick={() => scrollToSection('apie')}>
                  Apie
                </button>
                <button type="button" className="lp-footer-link" onClick={() => scrollToSection('kam-skirta')}>
                  Kam skirta
                </button>
                <button type="button" className="lp-footer-link" onClick={() => scrollToSection('kaip-veikia')}>
                  Kaip veikia
                </button>
                <button type="button" className="lp-footer-link" onClick={() => scrollToSection('duk')}>
                  DUK
                </button>
                <a href="#privacy" className="lp-footer-link">
                  Privatumo politika
                </a>
              </nav>
            </div>
            <div className="lp-footer-actions">
              <button type="button" className="lp-footer-scroll" onClick={scrollToTop} aria-label="Scroll to top">
                <svg viewBox="0 0 24 24" aria-hidden="true" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M12 19V5M5 12l7-7 7 7" />
                </svg>
              </button>
            </div>
          </div>
          <div className="lp-footer-bar">
            <p className="lp-footer-copy">© 2026 Visos teisės saugomos / Powered by Reiz Studio</p>
            <div className="lp-footer-socials" aria-label="Social media">
              <a href="https://www.linkedin.com" className="lp-footer-social" target="_blank" rel="noreferrer" aria-label="LinkedIn">
                <svg viewBox="0 0 24 24" aria-hidden="true">
                  <path d="M6.94 8.5V19H3.5V8.5h3.44ZM7.17 5.26c0 1-.75 1.76-1.95 1.76h-.02c-1.15 0-1.9-.77-1.9-1.76 0-1 .77-1.76 1.95-1.76s1.9.76 1.92 1.76ZM20.5 12.98V19h-3.44v-5.63c0-1.41-.5-2.37-1.77-2.37-.97 0-1.54.65-1.8 1.28-.1.22-.12.54-.12.86V19H9.93s.05-9.67 0-10.5h3.44v1.49c.46-.7 1.28-1.7 3.12-1.7 2.28 0 4.01 1.48 4.01 4.69Z" />
                </svg>
              </a>
              <a href="https://www.facebook.com" className="lp-footer-social" target="_blank" rel="noreferrer" aria-label="Facebook">
                <svg viewBox="0 0 24 24" aria-hidden="true">
                  <path d="M13.63 20v-7.3h2.45l.37-2.84h-2.82V8.04c0-.82.23-1.38 1.4-1.38h1.5V4.12c-.26-.03-1.15-.12-2.2-.12-2.18 0-3.67 1.33-3.67 3.77v2.1H8.2v2.84h2.46V20h2.97Z" />
                </svg>
              </a>
            </div>
          </div>
        </div>
      </footer>
    </>
  )
}
