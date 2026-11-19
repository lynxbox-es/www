/**
 * LYNX BOX TRAINING CENTER — Minimal Vanilla JS
 * Handles:
 * 1. Accessible mobile navigation drawer
 * 2. Mobile day-selector tabs & program discipline filters for the timetable
 * 3. Lightweight play/pause & mute/unmute controls for training reels
 * 4. Dynamic current year in footer
 */

(function () {
  'use strict';

  document.documentElement.classList.add('js-enabled');

  /* ------------------------------------------------------------------------
     1. Mobile Navigation Toggle
     ------------------------------------------------------------------------ */
  const navToggle = document.querySelector('[data-nav-toggle]');
  const siteNav = document.querySelector('[data-site-nav]');

  function closeMenu() {
    if (!navToggle || !siteNav) return;
    navToggle.setAttribute('aria-expanded', 'false');
    navToggle.setAttribute('aria-label', 'Abrir menú de navegación');
    siteNav.classList.remove('is-open');
    document.body.style.overflow = '';
  }

  function openMenu() {
    if (!navToggle || !siteNav) return;
    navToggle.setAttribute('aria-expanded', 'true');
    navToggle.setAttribute('aria-label', 'Cerrar menú de navegación');
    siteNav.classList.add('is-open');
    document.body.style.overflow = 'hidden';
  }

  if (navToggle && siteNav) {
    navToggle.addEventListener('click', function () {
      const isExpanded = navToggle.getAttribute('aria-expanded') === 'true';
      if (isExpanded) {
        closeMenu();
      } else {
        openMenu();
      }
    });

    // Close drawer when clicking any navigation link
    siteNav.querySelectorAll('a').forEach(function (link) {
      link.addEventListener('click', closeMenu);
    });

    // Close drawer on Escape key
    document.addEventListener('keydown', function (event) {
      if (event.key === 'Escape' && siteNav.classList.contains('is-open')) {
        closeMenu();
        navToggle.focus();
      }
    });

    // Reset state if resized to desktop
    window.addEventListener('resize', function () {
      if (window.innerWidth >= 1024 && siteNav.classList.contains('is-open')) {
        closeMenu();
      }
    });
  }

  /* ------------------------------------------------------------------------
     2. Schedule: Mobile Day Selector & Program Discipline Filter
     ------------------------------------------------------------------------ */
  const dayTabs = document.querySelectorAll('[data-day-tab]');
  const dayColumns = document.querySelectorAll('[data-day-col]');
  const filterBtns = document.querySelectorAll('[data-program-filter]');
  const slotItems = document.querySelectorAll('.slot-item');

  function activateDay(dayKey) {
    dayTabs.forEach(function (tab) {
      const active = tab.getAttribute('data-day-tab') === dayKey;
      tab.classList.toggle('is-active', active);
      tab.setAttribute('aria-selected', active ? 'true' : 'false');
    });

    dayColumns.forEach(function (col) {
      const match = col.getAttribute('data-day-col') === dayKey;
      col.classList.toggle('is-hidden-mobile', !match);
    });
  }

  if (dayTabs.length > 0 && dayColumns.length > 0) {
    // Default to today's weekday (Mon=1..Sat=6), fallback to Monday ('lun')
    const dayMap = { 1: 'lun', 2: 'mar', 3: 'mie', 4: 'jue', 5: 'vie', 6: 'sab' };
    const todayKey = dayMap[new Date().getDay()] || 'lun';
    activateDay(todayKey);

    dayTabs.forEach(function (tab) {
      tab.addEventListener('click', function () {
        activateDay(tab.getAttribute('data-day-tab'));
      });
    });
  }

  if (filterBtns.length > 0 && slotItems.length > 0) {
    filterBtns.forEach(function (btn) {
      btn.addEventListener('click', function () {
        const selected = btn.getAttribute('data-program-filter');

        filterBtns.forEach(function (b) {
          const isCurrent = b === btn;
          b.classList.toggle('is-active', isCurrent);
          b.setAttribute('aria-pressed', isCurrent ? 'true' : 'false');
        });

        slotItems.forEach(function (slot) {
          const badge = slot.querySelector('[data-program]');
          if (!badge || selected === 'all') {
            slot.classList.remove('is-dimmed');
            return;
          }
          const matches = badge.getAttribute('data-program') === selected;
          slot.classList.toggle('is-dimmed', !matches);
        });
      });
    });
  }

  /* ------------------------------------------------------------------------
     3. Video Reels Controls (Play/Pause & Mute/Unmute)
     ------------------------------------------------------------------------ */
  const reelCards = document.querySelectorAll('[data-reel-card]');

  reelCards.forEach(function (card) {
    const video = card.querySelector('video');
    const playBtn = card.querySelector('[data-reel-play]');
    const muteBtn = card.querySelector('[data-reel-mute]');

    if (!video) return;

    function syncPlayLabel() {
      if (!playBtn) return;
      const paused = video.paused;
      playBtn.textContent = paused ? '▶' : '❚❚';
      playBtn.setAttribute('aria-label', paused ? 'Reproducir vídeo' : 'Pausar vídeo');
    }

    function syncMuteLabel() {
      if (!muteBtn) return;
      const muted = video.muted;
      muteBtn.textContent = muted ? '🔇' : '🔊';
      muteBtn.setAttribute('aria-label', muted ? 'Activar sonido' : 'Silenciar vídeo');
    }

    if (playBtn) {
      playBtn.addEventListener('click', function () {
        if (video.paused) {
          // Pause other reels so only one plays actively at a time
          document.querySelectorAll('[data-reel-card] video').forEach(function (other) {
            if (other !== video) other.pause();
          });
          video.play();
        } else {
          video.pause();
        }
        syncPlayLabel();
      });
    }

    if (muteBtn) {
      muteBtn.addEventListener('click', function () {
        video.muted = !video.muted;
        if (!video.muted && video.paused) {
          video.play();
        }
        syncMuteLabel();
        syncPlayLabel();
      });
    }

    video.addEventListener('play', syncPlayLabel);
    video.addEventListener('pause', syncPlayLabel);
    syncPlayLabel();
    syncMuteLabel();
  });

  /* ------------------------------------------------------------------------
     4. Current Year in Footer
     ------------------------------------------------------------------------ */
  const yearSpan = document.getElementById('current-year');
  if (yearSpan) {
    yearSpan.textContent = String(new Date().getFullYear());
  }
})();
