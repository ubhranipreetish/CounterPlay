"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import ICONIC_MOMENTS from "./lib/iconicMoments";

const TIMELINE = [
  { over: 0, title: "Rohit and de Kock walk out", score: "MI 0/0", equation: "120 balls remain", probability: 52 },
  { over: 6, title: "Powerplay closes", score: "MI 45/2", equation: "Pollard waits in the middle order", probability: 48 },
  { over: 13, title: "Mumbai rebuild through the middle", score: "MI 82/4", equation: "42 balls remain", probability: 39 },
  { over: 18, title: "Malinga to bowl the last", score: "CSK 138/6", equation: "12 needed off 12", probability: 44 },
  { over: 19.5, title: "One ball. Two possible histories.", score: "CSK 148/7", equation: "2 needed off 1", probability: 38 },
  { over: 20, title: "History chooses Mumbai", score: "CSK 148/7", equation: "MI win by 1 run", probability: 0 },
];

function ArrowIcon() {
  return (
    <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <path d="M5 12h14M13 6l6 6-6 6" />
    </svg>
  );
}

function TimelineTree() {
  return (
    <div className="timeline-tree" aria-label="The real 2019 final and two alternate last-ball outcomes">
      <div className="timeline-tree__head">
        <span>Match timeline tree</span>
        <div><span className="legend-real" /> Real <span className="legend-whatif" /> What-if</div>
      </div>
      <div className="timeline-tree__canvas">
        <svg viewBox="0 0 560 450" fill="none" aria-hidden="true">
          <path d="M22 118L118 150L210 205L278 248L392 248" className="tree-real" />
          <path d="M278 248C330 214 360 116 392 74" className="tree-branch" />
          <path d="M278 248C330 288 362 382 392 420" className="tree-branch" />
          <circle cx="22" cy="118" r="4" /><circle cx="118" cy="150" r="4" /><circle cx="210" cy="205" r="4" />
        </svg>
        <span className="tree-label tree-label--0">OV 0 · 0/0</span>
        <span className="tree-label tree-label--6">OV 6 · 45/2</span>
        <span className="tree-label tree-label--13">OV 13 · 82/4</span>
        <div className="tree-fork"><span>OV 19.5<br />LAST BALL</span><i /></div>
        <div className="tree-result tree-result--up"><small>What-if · full toss</small><strong>SIX → CSK win</strong><em>▲ +72% win</em></div>
        <div className="tree-result tree-result--real"><small>Real · yorker <b>Actual</b></small><strong>WICKET → MI win by 1</strong><em>— history as written</em></div>
        <div className="tree-result tree-result--down"><small>What-if · wide</small><strong>SUPER OVER</strong><em>◆ 50 / 50 coin-flip</em></div>
      </div>
    </div>
  );
}

function MobileThread() {
  return (
    <div className="mobile-thread" aria-label="Match thread">
      <div className="mobile-thread__head"><span>Match thread</span><span>MI vs CSK · Final</span></div>
      <div className="mobile-thread__event"><i /> <span><small>OV 18 · 138/6</small>12 needed off 12</span></div>
      <div className="mobile-thread__event"><i /> <span><small>OV 19 · 146/8</small>Malinga to bowl the last</span></div>
      <div className="mobile-thread__event is-fork"><i /> <span><small>OV 19.5 · LAST BALL</small>2 needed off 1 — tap to branch</span></div>
      <div className="mobile-thread__result is-real"><small>Real · yorker <b>Actual</b></small><strong>Wicket → MI win by 1</strong></div>
      <div className="mobile-thread__result"><small>What-if · full toss</small><strong>Six → CSK win the title</strong><em>▲ +72%</em></div>
    </div>
  );
}

export default function Home() {
  const [over, setOver] = useState(19.5);
  const activeMoment = useMemo(() => TIMELINE.reduce((best, moment) => Math.abs(moment.over - over) < Math.abs(best.over - over) ? moment : best), [over]);
  const featuredMoments = ICONIC_MOMENTS.slice(0, 3);
  const progress = `${(over / 20) * 100}%`;

  return (
    <div className="cp-home">
      <div className="cp-ambient" aria-hidden="true" />

      <main>
        <section className="cp-hero">
          <div className="cp-hero__copy">
            <div className="cp-eyebrow"><span /> The what-if engine <i /></div>
            <h1>History is<br />written.<br /><em>Can you </em><strong>rewrite it?</strong></h1>
            <p>Step into the 2019 Final. Override a single delivery, run 500 Monte Carlo simulations, and watch the butterfly effect rewrite the result — ball by ball.</p>

            <div className="time-machine-card">
              <div className="time-machine-card__head"><span><i /> Time machine</span><span>MI <b>vs</b> CSK · 2019 Final</span></div>
              <div className="time-machine-card__readout">
                <strong>{activeMoment.title}</strong>
                <span>{activeMoment.score} <i>·</i> {activeMoment.equation}</span>
              </div>
              <input
                aria-label="Explore the 2019 final timeline"
                className="time-machine-range"
                type="range"
                min="0"
                max="20"
                step="0.5"
                value={over}
                onChange={(event) => setOver(Number(event.target.value))}
                style={{ "--range-progress": progress }}
              />
              <div className="time-machine-card__ticks"><span>OV 0</span><span>5</span><span>10</span><span>15</span><span>OV 20</span></div>
              <div className="time-machine-card__prob">
                <div><span>CSK win probability</span><strong>{activeMoment.probability}%</strong></div>
                <div className="prob-track"><i style={{ width: `${activeMoment.probability}%` }} /></div>
              </div>
            </div>

            <div className="cp-proof"><span><b>500</b> MC paths</span><i /><span><b>18</b> seasons</span><i /><span><b>Ball-by-ball</b> engine</span></div>
          </div>

          <div className="cp-hero__visual">
            <TimelineTree />
            <MobileThread />
          </div>
        </section>

        <section className="cp-portals" aria-labelledby="ways-in">
          <div className="cp-section-kicker"><h2 id="ways-in">Two ways in</h2><span>Choose your mode →</span></div>
          <div className="cp-portals__grid">
            <Link href="/matches" className="portal-card portal-card--indigo">
              <div className="portal-card__top"><span>01</span><small>Rewind</small></div>
              <div className="portal-preview portal-preview--archive" aria-hidden="true">
                <span>Fall of wickets</span><div>{[62, 86, 44, 94, 70, 52].map((height, index) => <i key={index} style={{ height: `${height}%` }} />)}</div>
              </div>
              <div><h3>The Time Archives</h3><p>Browse 18 seasons of ball-by-ball history. Pick a match, scrub to any delivery, then override the moment.</p></div>
              <span className="portal-card__cta">Explore matches <ArrowIcon /></span>
            </Link>

            <Link href="/arena" className="portal-card portal-card--green">
              <div className="portal-card__top"><span>02</span><small>Draft</small></div>
              <div className="portal-preview portal-preview--draft" aria-hidden="true">
                <span>Draft pool <b>Cap 82.5</b></span><div><i>BAT · 12.0</i><i>BWL · 9.5</i><i>AR · 11.0</i><i>WK · 8.0</i></div>
              </div>
              <div><h3>The Battle Arena</h3><p>Draft an XI under a salary cap, set the order, and simulate a complete T20 match ball by ball.</p></div>
              <span className="portal-card__cta">Enter arena <ArrowIcon /></span>
            </Link>
          </div>
        </section>

        <section className="cp-moments" aria-labelledby="moments-heading">
          <div className="cp-section-kicker cp-section-kicker--moments">
            <div><span>03 · Ready-made branches</span><h2 id="moments-heading">Iconic moments, alternate endings.</h2></div>
            <Link href="/historic">View all scenarios <ArrowIcon /></Link>
          </div>
          <div className="cp-moments__grid">
            {featuredMoments.map((moment, index) => (
              <Link key={moment.id} href={`/simulation/${moment.id}?over=${moment.over}&ball=${moment.ball}&inn=${moment.innings}`} className="moment-card">
                <div className="moment-card__index">0{index + 1}</div>
                <div className="moment-card__meta"><span style={{ color: moment.color }}>{moment.tag}</span><span>{moment.subtitle}</span></div>
                <h3>{moment.title}</h3>
                <p>{moment.desc}</p>
                <span className="moment-card__cta">Branch this moment <ArrowIcon /></span>
              </Link>
            ))}
          </div>
        </section>
      </main>

      <footer className="cp-footer"><span>Counterplay · IPL counterfactual simulator</span></footer>
    </div>
  );
}
