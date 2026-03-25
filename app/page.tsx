"use client";
import { useState } from "react";

// ここに実際の写真のパスを入れてください（例: "/images/photo1.jpg"）
const photos = [
  { src: null, emoji: "👤", label: "写真 1" },
  { src: null, emoji: "📸", label: "写真 2" },
  { src: null, emoji: "🎨", label: "写真 3" },
  { src: null, emoji: "💻", label: "写真 4" },
];

function PhotoCarousel() {
  const [current, setCurrent] = useState(0);

  const prev = () => setCurrent((c) => (c - 1 + photos.length) % photos.length);
  const next = () => setCurrent((c) => (c + 1) % photos.length);

  const getIndex = (offset: number) =>
    (current + offset + photos.length) % photos.length;

  const slideStyle = (offset: number): React.CSSProperties => {
    const isCenter = offset === 0;
    const isPrevNext = offset === -1 || offset === 1;

    return {
      position: "absolute",
      width: "60%",
      aspectRatio: "1",
      borderRadius: 20,
      overflow: "hidden",
      transition: "all 0.4s ease",
      transform: isCenter
        ? "translateX(-50%) scale(1)"
        : offset === -1
        ? "translateX(-90%) scale(0.85)"
        : "translateX(-10%) scale(0.85)",
      left: "50%",
      opacity: isCenter ? 1 : 0.45,
      zIndex: isCenter ? 10 : 5,
      pointerEvents: isPrevNext ? "none" : "auto",
    };
  };

  const photoBox = (index: number, isCenter: boolean): React.CSSProperties => ({
    width: "100%",
    height: "100%",
    background: isCenter
      ? "linear-gradient(135deg, #7c5cfc 0%, #c084fc 100%)"
      : "linear-gradient(135deg, #3a2a7a 0%, #6a3a9a 100%)",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    fontSize: isCenter ? "5rem" : "3.5rem",
  });

  return (
    <div style={{ position: "relative", width: "100%", userSelect: "none" }}>
      {/* スライドエリア */}
      <div style={{ position: "relative", width: "100%", aspectRatio: "1", overflow: "hidden" }}>
        {[-1, 0, 1].map((offset) => {
          const idx = getIndex(offset);
          const photo = photos[idx];
          return (
            <div key={idx} style={slideStyle(offset)}>
              <div style={photoBox(idx, offset === 0)}>
                {photo.src ? (
                  <img src={photo.src} alt={photo.label} style={{ width: "100%", height: "100%", objectFit: "cover" }} />
                ) : (
                  <span>{photo.emoji}</span>
                )}
              </div>
            </div>
          );
        })}
      </div>

      {/* ナビゲーションボタン */}
      <div style={{ display: "flex", justifyContent: "center", alignItems: "center", gap: 20, marginTop: 24 }}>
        <button onClick={prev} style={{
          width: 44, height: 44, borderRadius: "50%",
          background: "#1e1e24", border: "1px solid #2a2a35",
          color: "#e8e8f0", fontSize: "1.2rem", cursor: "pointer",
          display: "flex", alignItems: "center", justifyContent: "center",
        }}>‹</button>

        {/* ドットインジケーター */}
        <div style={{ display: "flex", gap: 8 }}>
          {photos.map((_, i) => (
            <button key={i} onClick={() => setCurrent(i)} style={{
              width: i === current ? 24 : 8,
              height: 8, borderRadius: 999,
              background: i === current ? "#7c5cfc" : "#2a2a35",
              border: "none", cursor: "pointer",
              transition: "all 0.3s ease", padding: 0,
            }} />
          ))}
        </div>

        <button onClick={next} style={{
          width: 44, height: 44, borderRadius: "50%",
          background: "#1e1e24", border: "1px solid #2a2a35",
          color: "#e8e8f0", fontSize: "1.2rem", cursor: "pointer",
          display: "flex", alignItems: "center", justifyContent: "center",
        }}>›</button>
      </div>
    </div>
  );
}

export default function Home() {
  return (
    <main style={{ background: "#0d0d0f", color: "#e8e8f0", fontFamily: "'Hiragino Sans', sans-serif", minHeight: "100vh" }}>

      {/* NAV */}
      <nav style={{
        position: "fixed", top: 0, left: 0, right: 0, zIndex: 100,
        display: "flex", justifyContent: "space-between", alignItems: "center",
        padding: "18px 48px",
        background: "rgba(13,13,15,0.8)",
        backdropFilter: "blur(16px)",
        borderBottom: "1px solid #2a2a35",
      }}>
        <span style={{
          fontSize: "1.1rem", fontWeight: 700, letterSpacing: "0.05em",
          background: "linear-gradient(135deg, #7c5cfc, #c084fc)",
          WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent",
        }}>
          Ryuya Deguchi
        </span>
        <ul style={{ display: "flex", gap: 32, listStyle: "none", margin: 0, padding: 0 }}>
          {["About", "Skills", "Works", "Contact"].map((item) => (
            <li key={item}>
              <a href={`#${item.toLowerCase()}`} style={{ color: "#888899", textDecoration: "none", fontSize: "0.9rem" }}>
                {item}
              </a>
            </li>
          ))}
        </ul>
      </nav>

      {/* HERO */}
      <section style={{
        minHeight: "100vh", display: "flex", flexDirection: "column",
        justifyContent: "center", alignItems: "center", textAlign: "center",
        padding: "80px 24px 0", position: "relative", overflow: "hidden",
      }}>
        <div style={{
          position: "absolute", top: -200, left: "50%", transform: "translateX(-50%)",
          width: 700, height: 700,
          background: "radial-gradient(circle, rgba(124,92,252,.18) 0%, transparent 70%)",
          pointerEvents: "none",
        }} />
        <span style={{
          display: "inline-block", padding: "6px 16px",
          border: "1px solid #7c5cfc", borderRadius: 999,
          fontSize: "0.8rem", color: "#7c5cfc", letterSpacing: "0.1em", marginBottom: 24,
        }}>
          ✦ フリーランス・受付中
        </span>
        <h1 style={{ fontSize: "clamp(2.4rem, 6vw, 4.5rem)", fontWeight: 800, lineHeight: 1.15, marginBottom: 24 }}>
          AIで、アイデアを<br />
          <span style={{
            background: "linear-gradient(135deg, #7c5cfc, #c084fc)",
            WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent",
          }}>
            素早くカタチに。
          </span>
        </h1>
        <p style={{ maxWidth: 520, color: "#888899", fontSize: "1.05rem", marginBottom: 40 }}>
          出口龍弥 ／ フリーランス<br />
          AIを活用したWebサイト・アプリ・ツールの制作を行っています。<br />
          アイデアを持っている方、お気軽にご相談ください。
        </p>
        <div style={{ display: "flex", gap: 16, flexWrap: "wrap", justifyContent: "center" }}>
          <a href="#works" style={{
            padding: "13px 28px", borderRadius: 8, fontSize: "0.95rem", fontWeight: 600,
            background: "#7c5cfc", color: "#fff", textDecoration: "none",
          }}>
            制作実績を見る
          </a>
          <a href="#contact" style={{
            padding: "13px 28px", borderRadius: 8, fontSize: "0.95rem", fontWeight: 600,
            background: "transparent", color: "#e8e8f0", textDecoration: "none",
            border: "1px solid #2a2a35",
          }}>
            相談・依頼はこちら
          </a>
        </div>
      </section>

      {/* ABOUT */}
      <section id="about" style={{ maxWidth: 1100, margin: "0 auto", padding: "96px 24px" }}>
        <p style={{ fontSize: "0.78rem", letterSpacing: "0.18em", color: "#7c5cfc", textTransform: "uppercase", marginBottom: 12 }}>About</p>
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 64, alignItems: "center" }}>

          {/* カルーセル */}
          <PhotoCarousel />

          <div>
            <h2 style={{ fontSize: "clamp(1.8rem, 3.5vw, 2.6rem)", fontWeight: 800, marginBottom: 8 }}>出口 龍弥</h2>
            <p style={{ color: "#7c5cfc", fontSize: "0.9rem", marginBottom: 24, letterSpacing: "0.05em" }}>Ryuya Deguchi</p>
            <p style={{ color: "#888899", marginBottom: 16 }}>
              AIツールを活用して、Webサイト・アプリ・業務ツールの制作を行うフリーランスです。
              アイデアを持っているけど形にできない、という方のお手伝いをします。
            </p>
            <p style={{ color: "#888899", marginBottom: 24 }}>
              最新のAI技術を使いこなすことで、短期間・低コストで質の高いプロダクトを届けることが強みです。
            </p>
            <div style={{ display: "flex", flexWrap: "wrap", gap: 10 }}>
              {["AIツール活用", "Webサイト制作", "アプリ開発", "ツール制作", "フリーランス"].map((tag) => (
                <span key={tag} style={{
                  padding: "5px 14px", borderRadius: 999,
                  background: "#1e1e24", border: "1px solid #2a2a35",
                  fontSize: "0.82rem", color: "#888899",
                }}>
                  {tag}
                </span>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* SKILLS */}
      <section id="skills" style={{ background: "#16161a", padding: "96px 24px" }}>
        <div style={{ maxWidth: 1100, margin: "0 auto" }}>
          <p style={{ fontSize: "0.78rem", letterSpacing: "0.18em", color: "#7c5cfc", textTransform: "uppercase", marginBottom: 12 }}>Skills</p>
          <h2 style={{ fontSize: "clamp(1.8rem, 3.5vw, 2.6rem)", fontWeight: 800, marginBottom: 48 }}>できること</h2>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(260px, 1fr))", gap: 20 }}>
            {[
              { icon: "🌐", title: "AIを使ったWebサイト制作", desc: "AIツールを活用して、デザインから実装まで一貫して対応。アイデアを素早くWebサイトとして形にします。" },
              { icon: "📱", title: "AIを使ったアプリ開発", desc: "業務効率化・サービス系アプリをAIの力を借りながら開発。短期間でのリリースが可能です。" },
              { icon: "⚙️", title: "AIを使ったツール制作", desc: "日々の作業を自動化・効率化するカスタムツールを制作。欲しい機能を一緒に考えます。" },
              { icon: "💡", title: "アイデアの具体化サポート", desc: "「こんなものを作りたい」というアイデアを一緒に整理し、実現可能な形に落とし込みます。" },
            ].map((skill) => (
              <div key={skill.title} style={{
                background: "#1e1e24", border: "1px solid #2a2a35",
                borderRadius: 16, padding: 28,
              }}>
                <div style={{ fontSize: "2rem", marginBottom: 14 }}>{skill.icon}</div>
                <h3 style={{ fontSize: "1rem", fontWeight: 700, marginBottom: 8 }}>{skill.title}</h3>
                <p style={{ color: "#888899", fontSize: "0.88rem" }}>{skill.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* WORKS */}
      <section id="works" style={{ maxWidth: 1100, margin: "0 auto", padding: "96px 24px" }}>
        <p style={{ fontSize: "0.78rem", letterSpacing: "0.18em", color: "#7c5cfc", textTransform: "uppercase", marginBottom: 12 }}>Works</p>
        <h2 style={{ fontSize: "clamp(1.8rem, 3.5vw, 2.6rem)", fontWeight: 800, marginBottom: 48 }}>制作実績</h2>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(320px, 1fr))", gap: 24 }}>
          {[
            {
              emoji: "🍽️",
              grad: "linear-gradient(135deg, #f59e0b, #ef4444)",
              cats: ["アプリ開発", "飲食店向け"],
              title: "飲食店向けハンディアプリ",
              desc: "飲食店のオーダー業務を効率化するハンディアプリ。AIを活用して短期間で開発しました。",
            },
            {
              emoji: "🕐",
              grad: "linear-gradient(135deg, #06b6d4, #3b82f6)",
              cats: ["アプリ開発", "業務効率化"],
              title: "勤怠管理アプリ",
              desc: "出退勤の記録・管理ができる勤怠アプリ。シンプルな操作で誰でも使いやすい設計です。",
            },
          ].map((work) => (
            <div key={work.title} style={{
              background: "#1e1e24", border: "1px solid #2a2a35",
              borderRadius: 20, overflow: "hidden",
            }}>
              <div style={{
                width: "100%", aspectRatio: "16/9",
                background: work.grad,
                display: "flex", alignItems: "center", justifyContent: "center",
                fontSize: "3rem",
              }}>
                {work.emoji}
              </div>
              <div style={{ padding: 24 }}>
                <div style={{ display: "flex", gap: 8, marginBottom: 12, flexWrap: "wrap" }}>
                  {work.cats.map((cat) => (
                    <span key={cat} style={{
                      fontSize: "0.75rem", padding: "3px 10px", borderRadius: 999,
                      background: "rgba(124,92,252,.15)", color: "#7c5cfc",
                      border: "1px solid rgba(124,92,252,.3)",
                    }}>
                      {cat}
                    </span>
                  ))}
                </div>
                <h3 style={{ fontSize: "1.1rem", fontWeight: 700, marginBottom: 8 }}>{work.title}</h3>
                <p style={{ color: "#888899", fontSize: "0.88rem" }}>{work.desc}</p>
              </div>
            </div>
          ))}
        </div>
        <p style={{ color: "#888899", fontSize: "0.85rem", marginTop: 32, textAlign: "center" }}>
          ※ 現在も新しいプロダクトを制作中です。随時更新予定。
        </p>
      </section>

      {/* CONTACT */}
      <section id="contact" style={{ background: "#16161a", padding: "96px 24px" }}>
        <div style={{ maxWidth: 600, margin: "0 auto", textAlign: "center" }}>
          <p style={{ fontSize: "0.78rem", letterSpacing: "0.18em", color: "#7c5cfc", textTransform: "uppercase", marginBottom: 12 }}>Contact</p>
          <h2 style={{ fontSize: "clamp(1.8rem, 3.5vw, 2.6rem)", fontWeight: 800, marginBottom: 16 }}>お問い合わせ</h2>
          <p style={{ color: "#888899", marginBottom: 40 }}>
            制作のご依頼・ご相談はお気軽にどうぞ。<br />
            「こんなものを作りたい」というアイデアだけでも大丈夫です。
          </p>
          <form style={{ display: "flex", flexDirection: "column", gap: 16, textAlign: "left" }}>
            <div>
              <label style={{ display: "block", fontSize: "0.85rem", color: "#888899", marginBottom: 6 }}>お名前</label>
              <input type="text" placeholder="山田 太郎" style={{
                width: "100%", padding: "12px 16px",
                background: "#1e1e24", border: "1px solid #2a2a35",
                borderRadius: 10, color: "#e8e8f0", fontSize: "0.95rem",
                outline: "none", fontFamily: "inherit",
              }} />
            </div>
            <div>
              <label style={{ display: "block", fontSize: "0.85rem", color: "#888899", marginBottom: 6 }}>メールアドレス</label>
              <input type="email" placeholder="example@email.com" style={{
                width: "100%", padding: "12px 16px",
                background: "#1e1e24", border: "1px solid #2a2a35",
                borderRadius: 10, color: "#e8e8f0", fontSize: "0.95rem",
                outline: "none", fontFamily: "inherit",
              }} />
            </div>
            <div>
              <label style={{ display: "block", fontSize: "0.85rem", color: "#888899", marginBottom: 6 }}>ご依頼内容・メッセージ</label>
              <textarea placeholder="作りたいものや、お困りのことを教えてください。" rows={5} style={{
                width: "100%", padding: "12px 16px",
                background: "#1e1e24", border: "1px solid #2a2a35",
                borderRadius: 10, color: "#e8e8f0", fontSize: "0.95rem",
                outline: "none", fontFamily: "inherit", resize: "vertical",
              }} />
            </div>
            <button type="submit" style={{
              width: "100%", padding: 14,
              background: "linear-gradient(135deg, #7c5cfc, #c084fc)",
              border: "none", borderRadius: 10, color: "#fff",
              fontSize: "1rem", fontWeight: 700, cursor: "pointer",
            }}>
              送信する
            </button>
          </form>
        </div>
      </section>

      {/* FOOTER */}
      <footer style={{
        textAlign: "center", padding: "40px 24px",
        borderTop: "1px solid #2a2a35",
        color: "#888899", fontSize: "0.85rem",
      }}>
        © 2026 出口龍弥 / Ryuya Deguchi. All rights reserved.
      </footer>

    </main>
  );
}
