import { Link } from 'react-router-dom';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import Reveal from '@/components/Reveal';
import FeatureCard from '@/components/FeatureCard';
import LessonRow from '@/components/LessonRow';
import { useInView, useCounter } from '@/hooks';
import { COURSE, STATS, FEATURES } from '@/data/course';
import { useProgress } from '@/context/ProgressContext';

// ─── Stat Counter ─────────────────────────────────────────────────────────────

function StatItem({ value, suffix, label }: { value: number; suffix: string; label: string }) {
  const { ref, inView } = useInView<HTMLDivElement>(0.5);
  const count = useCounter(value, 1600, inView);

  return (
    <div ref={ref} style={{ textAlign: 'center' }}>
      <div className="stat__number">
        {count}{suffix}
      </div>
      <div className="stat__label">{label}</div>
    </div>
  );
}

// ─── Page ────────────────────────────────────────────────────────────────────

export default function HomePage() {
  const { isCompleted } = useProgress();

  return (
    <>
      <Navbar />

      <main style={{ flex: 1 }}>
        {/* ── HERO ── */}
        <section className="hero">
          <div className="hero__dot-bg" />
          <div className="hero__orb hero__orb--1" />
          <div className="hero__orb hero__orb--2" />
          <div className="hero__orb hero__orb--3" />
          <div className="container" style={{ position: 'relative' }}>
            <div className="hero__badge">
              <span className="material-icons" style={{ fontSize: 13 }}>auto_awesome</span>
              Learn at your own pace
            </div>
            <h1>
              Your Digital&nbsp;
              <em style={{ fontStyle: 'italic', color: 'var(--accent)' }}>Classroom</em>
              &nbsp;Awaits
            </h1>
            <p>
              Explore beautifully crafted web development lessons — from HTML basics to CSS mastery.
            </p>
            <div className="hero__actions">
              <Link to="/courses" className="btn btn--dark">
                <span className="material-icons" style={{ fontSize: 18 }}>play_arrow</span>
                Start Learning
              </Link>
              <Link to="/courses" className="btn btn--soft">
                View All Courses
              </Link>
            </div>
          </div>
        </section>

        {/* ── STATS ── */}
        <section className="stats">
          <div className="container">
            <div className="stats__grid">
              {STATS.map((s) => (
                <StatItem key={s.label} value={s.value} suffix={s.suffix} label={s.label} />
              ))}
            </div>
          </div>
        </section>

        {/* ── FEATURES ── */}
        <section className="features">
          <div className="container">
            <Reveal className="features__header">
              <p className="features__eyebrow">Why Choose Us</p>
              <h2>Everything you need<br />to learn &amp; grow</h2>
            </Reveal>
            <div className="features__grid">
              {FEATURES.map((f, i) => (
                <Reveal key={f.title} delay={i * 100}>
                  <FeatureCard {...f} />
                </Reveal>
              ))}
            </div>
          </div>
        </section>

        {/* ── COURSE PREVIEW ── */}
        <section className="preview">
          <div className="container">
            <div className="preview__grid">
              <Reveal>
                <p className="preview__eyebrow">Curriculum</p>
                <h2>
                  5 lessons to master{' '}
                  <em style={{ color: 'var(--accent3)', fontStyle: 'italic' }}>web basics</em>
                </h2>
                <p className="preview__sub">
                  From your very first HTML tag to styling beautiful web pages with CSS — step by step.
                </p>
                <Link to="/courses" className="btn btn--accent">
                  Browse All Lessons
                  <span className="material-icons" style={{ fontSize: 18 }}>arrow_forward</span>
                </Link>
              </Reveal>

              <Reveal delay={150}>
                <div style={{ background: 'var(--cream)', borderRadius: 'var(--radius-lg)', padding: '1.25rem', border: '1px solid var(--border)' }}>
                  {COURSE.lessons.map((lesson, i) => (
                    <div key={lesson.id}>
                      <LessonRow lesson={lesson} isCompleted={isCompleted(lesson.id)} />
                      {i < COURSE.lessons.length - 1 && <div className="lesson-sep" />}
                    </div>
                  ))}
                </div>
              </Reveal>
            </div>
          </div>
        </section>

        {/* ── CTA ── */}
        <section className="cta">
          <div className="container" style={{ position: 'relative' }}>
            <Reveal>
              <h2>Ready to build your first website?</h2>
              <p>Join students who are already learning the essentials of web development.</p>
              <Link to="/courses" className="btn btn--white">
                Start for Free
                <span className="material-icons" style={{ fontSize: 18 }}>east</span>
              </Link>
            </Reveal>
          </div>
        </section>
      </main>

      <Footer />
    </>
  );
}
