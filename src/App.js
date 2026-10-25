import { useState, useEffect } from 'react';
import ph1 from './assets/ph1.png';
import ph2 from './assets/ph2.PNG';
import ph3 from './assets/ph3.png';

function App() {
  const [currentPage, setCurrentPage] = useState('home');
  const [animateReady, setAnimateReady] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      setAnimateReady(true);
    }, 100);
    return () => clearTimeout(timer);
  }, []);

  const text1 = "欢迎来到".split('');
  const text2 = "我的作品集".split('');

  const navList = [
    { key: 'home', label: 'HOME 首页' },
    { key: 'about', label: 'ABOUT ME 关于我' },
    { key: 'material', label: '物料类' },
    { key: 'copy', label: '文字策划类' }
  ];

  const handleNavClick = (item) => {
    setCurrentPage(item.key);
  };

  return (
    <div className="app-root">
      <style>{`
        * {
          box-sizing: border-box;
        }
        @font-face {
          font-family: 'MuYaoSuiXin';
          src: url('/muyaosuixin.ttf') format('truetype');
          font-weight: normal;
          font-style: normal;
        }

        .app-root {
          min-height: 100vh;
          min-height: 100svh;
          min-height: 100dvh;
          background: #fcfaf7;
          color: #2c2c2c;
          overflow-x: hidden;
        }

        /* ===== 导航栏（可换行，任何宽度都不破版）===== */
        .nav-wrap {
          position: relative;
          z-index: 20;
          width: 100%;
          display: flex;
          justify-content: center;
          align-items: center;
          flex-wrap: wrap;
          gap: 8px 18px;
          padding: 14px 12px;
        }
        .nav-item {
          font-family: "PingFang SC", "Microsoft YaHei", sans-serif;
          font-size: clamp(14px, 2.2vw, 18px);
          cursor: pointer;
          padding: 6px clamp(10px, 2vw, 16px);
          border-radius: 999px;
          transition: all 0.25s ease;
          color: #5a4b45;
          white-space: nowrap;
        }
        .nav-item:hover {
          background-color: #fbe6f6;
          color: #2c2c2c;
          transform: translateY(-2px);
        }
        .nav-item.active {
          background-color: #f0b8e8;
          color: #2c2c2c;
          box-shadow: 0 6px 18px rgba(240, 184, 232, 0.45);
        }
        .divider-line {
          color: #e0d3cc;
          font-size: clamp(14px, 2.2vw, 18px);
          user-select: none;
        }

        /* ===== 首页：ph3 自适应背景 ===== */
        .home-page {
          position: relative;
          min-height: 100vh;
          min-height: 100svh;
          min-height: 100dvh;
          overflow: hidden;
          display: flex;
        }
        .home-bg {
          position: absolute;
          inset: 0;
          background-size: cover;      /* 铺满 + 居中，任意比例屏幕自适应 */
          background-position: center;
          background-repeat: no-repeat;
          z-index: 0;
        }
        /* 半透明白色蒙层：保证背景图上文字清晰可读 */
        .home-bg::after {
          content: '';
          position: absolute;
          inset: 0;
          background: rgba(252, 250, 247, 0.30);
        }
        .hero-wrap {
          position: relative;
          z-index: 1;
          width: 100%;
          min-height: 100vh;
          min-height: 100svh;
          min-height: 100dvh;
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          padding: 72px 16px 40px;      /* 顶部留出导航高度 */
          text-align: center;
        }
        .hero-img {
          display: block;
          width: min(80%, 620px);       /* 大屏最大 620px，小屏按宽度收缩 */
          max-height: 44vh;
          max-height: 44svh;
          height: auto;
          object-fit: contain;
          margin: 0 auto;
          position: relative;           /* 新增：开启相对定位 */
          top: -50px;                   /* 新增：仅将图片向上偏移 50px */
          filter: drop-shadow(0 18px 26px rgba(153, 122, 107, 0.25));
          animation: floaty 6s ease-in-out infinite;
        }
        @keyframes floaty {
          0%, 100% { transform: translateY(0); }
          50%      { transform: translateY(-14px); }
        }

        .title-group {
          margin-top: clamp(-36px, -4vw, -10px); /* 维持原有代码，文字位置不变 */
          display: flex;
          flex-direction: column;
          align-items: center;
        }
        .line1,
        .line2 {
          font-family: "MuYaoSuiXin", "PingFang SC", sans-serif;
          font-size: clamp(30px, 9.5vw, 104px);
          color: #f7cfed;
          line-height: 1.08;
          position: relative;
          display: inline-block;
          z-index: 10;
          text-shadow: -2px 0 0 #997a6b;
        }
        .line2-wrap {
          position: relative;
          margin-left: clamp(4px, 6vw, 80px);
        }
        .portfolio-bg {
          font-family: "Great Vibes", cursive;
          font-size: clamp(32px, 10vw, 116px);
          color: transparent;
          position: absolute;
          left: clamp(8px, 20vw, 260px);
          top: -0.3em;
          z-index: 5;
          pointer-events: none;
          letter-spacing: 1px;
          background-image: radial-gradient(#222 0.3px, transparent 0.4px);
          background-size: 1.4px 1.4px;
          -webkit-background-clip: text;
          background-clip: text;
          white-space: nowrap;
        }

        .char-item {
          display: inline-block;
          opacity: 0;
          transform: translateY(35px);
        }
        .char-item.active {
          animation: charBounce 0.6s ease-out forwards;
        }
        @keyframes charBounce {
          0%   { opacity: 0; transform: translateY(35px); }
          60%  { transform: translateY(-10px); }
          100% { opacity: 1; transform: translateY(0); }
        }

        .eng-anim {
          opacity: 0;
          transform: translateY(45px) scale(0.75);
        }
        .eng-anim.active {
          animation: engAnim 0.85s ease-out forwards;
        }
        @keyframes engAnim {
          0%   { opacity: 0; transform: translateY(45px) scale(0.75); }
          55%  { transform: translateY(0) scale(1.2); opacity: 1; }
          100% { transform: translateY(0) scale(1); opacity: 1; }
        }

        /* ===== 页面切换淡入 ===== */
        .page-fade {
          animation: pageFade 0.45s ease;
        }
        @keyframes pageFade {
          from { opacity: 0; transform: translateY(10px); }
          to   { opacity: 1; transform: translateY(0); }
        }

        /* ===== ABOUT ===== */
        .about-wrap {
          min-height: 100vh;
          min-height: 100svh;
          min-height: 100dvh;
          padding: 36px clamp(20px, 5vw, 80px) 64px;
          display: flex;
          flex-direction: row;
          flex-wrap: wrap;
          gap: clamp(24px, 4vw, 60px);
          align-items: flex-start;
          justify-content: center;
        }
        .about-img {
          flex: 0 1 auto;
          max-width: 100%;
        }
        .about-img img {
          display: block;
          width: auto;
          max-width: 100%;
          max-height: 75vh;
          max-height: 75svh;
          height: auto;
          margin: 0 auto;
        }
        .about-body {
          flex: 1 1 280px;
          max-width: 640px;
        }
        .about-body h2 {
          font-size: clamp(20px, 3.5vw, 30px);
          font-weight: 600;
          margin: 0 0 4px 0;
          color: #2c2c2c;
        }
        .about-body .sub {
          color: #b89b8b;
          font-size: clamp(14px, 2vw, 18px);
          margin: 0 0 12px 0;
        }

        /* ===== 占位页（物料类 / 文字策划类）===== */
        .page-wrap {
          min-height: 80vh;
          min-height: 80svh;
          padding: 36px clamp(20px, 5vw, 80px);
        }

        /* ===== 小屏微调 ===== */
        @media (max-width: 520px) {
          .divider-line { display: none; }
          .nav-wrap { gap: 6px 8px; padding: 10px 8px; }
          .hero-wrap { padding: 60px 12px 32px; }
          .hero-img { width: min(92%, 620px); max-height: 38svh; }
          .title-group { margin-top: -8px; } /* 维持原有代码，文字位置不变 */
        }
      `}</style>

      <div className="nav-wrap">
        {navList.map((item, idx) => (
          <div key={item.key} style={{ display: 'flex', alignItems: 'center' }}>
            <div
              className={`nav-item ${currentPage === item.key ? 'active' : ''}`}
              onClick={() => handleNavClick(item)}
            >
              {item.label}
            </div>
            {idx !== navList.length - 1 && <span className="divider-line">|</span>}
          </div>
        ))}
      </div>

      <div style={{ paddingTop: '10px' }}>
        {currentPage === 'home' && (
          <div className="home-page page-fade">
            <div
              className="home-bg"
              style={{ backgroundImage: `url(${ph3})` }}
            />
            <div className="hero-wrap">
              <img src={ph1} alt="主页图" className="hero-img" />
              <div className="title-group">
                <div className="line1">
                  {text1.map((char, idx) => (
                    <span
                      key={idx}
                      className={`char-item ${animateReady ? 'active' : ''}`}
                      style={{ animationDelay: `${idx * 90}ms` }}
                    >
                      {char}
                    </span>
                  ))}
                </div>
                <div className="line2-wrap">
                  <div className={`portfolio-bg eng-anim ${animateReady ? 'active' : ''}`} style={{ animationDelay: '420ms' }}>Portfolio</div>
                  <div className="line2">
                    {text2.map((char, idx) => (
                      <span
                        key={idx}
                        className={`char-item ${animateReady ? 'active' : ''}`}
                        style={{ animationDelay: `${420 + idx * 90}ms` }}
                      >
                        {char}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {currentPage === 'about' && (
          <div className="about-wrap page-fade">
            <div className="about-img">
              <img src={ph2} alt="头像" />
            </div>
            <div className="about-body">
              <h2>刘思婧｜Liu Sijing｜ESFJ</h2>
              <p className="sub">海本大三在读ing｜多媒体技术Multimedia</p>
              <div style={{ width: '60px', height: '1px', background: '#b89b8b', margin: '0 auto 20px auto' }}></div>
              <p style={{ fontSize: 'clamp(16px, 2.4vw, 20px)', fontWeight: 500, color: '#444', margin: '0 0 8px 0' }}>我擅长什么</p>
              <p style={{ fontSize: 'clamp(15px, 2.2vw, 18px)', lineHeight: '1.8', color: '#444', margin: '0 0 20px 0' }}>
                泛娱乐宣发策划、内容热点运营、舞台及综艺导演
              </p>
              <p style={{ fontSize: 'clamp(16px, 2.4vw, 20px)', fontWeight: 500, color: '#444', margin: '0 0 8px 0' }}>如何联系到我</p>
              <p style={{ fontSize: 'clamp(15px, 2.2vw, 18px)', color: '#555', margin: '5px 0' }}>📞：13272237687「🛰️同号」</p>
              <p style={{ fontSize: 'clamp(15px, 2.2vw, 18px)', color: '#555', margin: '5px 0' }}>📩：lsj050624@163.com</p>
            </div>
          </div>
        )}

        {currentPage === 'material' && (
          <div className="page-wrap page-fade">
            <h2 style={{ fontSize: 'clamp(13px, 2vw, 16px)' }}>物料类总览</h2>
            <p style={{ fontSize: 'clamp(11px, 1.8vw, 14px)' }}>这里放海报、手幅小卡作品</p>
          </div>
        )}

        {currentPage === 'copy' && (
          <div className="page-wrap page-fade">
            <h2 style={{ fontSize: 'clamp(13px, 2vw, 16px)' }}>文字策划类总览</h2>
            <p style={{ fontSize: 'clamp(11px, 1.8vw, 14px)' }}>这里放宣发文案、脚本作品</p>
          </div>
        )}
      </div>
    </div>
  );
}

export default App;