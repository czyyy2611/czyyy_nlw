/*
 * 樱花飘落效果（自包含，不依赖任何 CDN）
 *
 * 启用方式：在 _config.butterfly.yml 里加
 *   inject:
 *     bottom:
 *       - '<script src="/czyyy_nlw/js/sakura.js" defer></script>'
 *
 * 想关掉就删掉上面那行。
 * 可调参数见下方 CONFIG。
 */
(function () {
  'use strict';

  var CONFIG = {
    color: '#ffc0cb',       // 花瓣颜色
    desktopCount: 55,       // 桌面端花瓣数
    mobileCount: 25,        // 手机端花瓣数
    maxRadius: 6,           // 花瓣最大半径（px）
    minRadius: 2,           // 花瓣最小半径（px）
    zIndex: 1               // 层级：1=在正文前面(轻盖)，-1=在背景后面
  };

  // 用户开了「减少动态效果」就什么都不做
  if (window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
    return;
  }

  var canvas = document.createElement('canvas');
  canvas.id = 'sakura-canvas';
  canvas.setAttribute('aria-hidden', 'true');
  canvas.style.cssText =
    'position:fixed;top:0;left:0;width:100%;height:100%;' +
    'pointer-events:none;z-index:' + CONFIG.zIndex + ';';

  var ctx = null;
  var W = 0;
  var H = 0;
  var petals = [];
  var rafId = null;

  function resize() {
    var dpr = window.devicePixelRatio || 1;
    W = window.innerWidth;
    H = window.innerHeight;
    canvas.width = W * dpr;
    canvas.height = H * dpr;
    ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
  }

  function Petal(initial) {
    this.reset(initial);
  }

  Petal.prototype.reset = function (initial) {
    this.x = Math.random() * W;
    this.y = initial ? Math.random() * H : -20;
    this.r = Math.random() * (CONFIG.maxRadius - CONFIG.minRadius) + CONFIG.minRadius;
    this.vx = Math.random() * 1.2 - 0.6;
    this.vy = Math.random() * 1.4 + 0.6;
    this.angle = Math.random() * Math.PI * 2;
    this.spin = Math.random() * 0.03 - 0.015;
    this.alpha = Math.random() * 0.5 + 0.3;
    this.sway = Math.random() * 2 + 1;
  };

  Petal.prototype.update = function () {
    this.x += this.vx + Math.sin(this.y / 40) * this.sway * 0.3;
    this.y += this.vy;
    this.angle += this.spin;
    if (this.y > H + 20 || this.x < -40 || this.x > W + 40) {
      this.reset(false);
    }
  };

  Petal.prototype.draw = function () {
    ctx.save();
    ctx.translate(this.x, this.y);
    ctx.rotate(this.angle);
    ctx.globalAlpha = this.alpha;
    ctx.fillStyle = CONFIG.color;
    ctx.beginPath();
    ctx.ellipse(0, 0, this.r, this.r * 0.6, 0, 0, Math.PI * 2);
    ctx.fill();
    ctx.restore();
  };

  function tick() {
    ctx.clearRect(0, 0, W, H);
    for (var i = 0; i < petals.length; i++) {
      petals[i].update();
      petals[i].draw();
    }
    rafId = window.requestAnimationFrame(tick);
  }

  function stop() {
    if (rafId !== null) {
      window.cancelAnimationFrame(rafId);
      rafId = null;
    }
  }

  function init() {
    ctx = canvas.getContext('2d');
    if (!ctx) return;

    document.body.appendChild(canvas);
    resize();

    var count = window.innerWidth < 768 ? CONFIG.mobileCount : CONFIG.desktopCount;
    petals = [];
    for (var i = 0; i < count; i++) {
      petals.push(new Petal(true));
    }

    window.addEventListener('resize', resize);

    // 切到别的标签页时暂停，省电
    document.addEventListener('visibilitychange', function () {
      if (document.hidden) {
        stop();
      } else if (rafId === null) {
        tick();
      }
    });

    tick();
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }
})();
