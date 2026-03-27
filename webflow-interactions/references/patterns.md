# Webflow Embed Patterns

Production-ready patterns extracted from real projects. Each is self-contained.
Adapt class names, attributes, and timing to the project at hand.

---

## 1. Tab Switcher with Animation Queue

**When to use**: 2–4 tabs controlling visible content sections.
**JS or GSAP**: Vanilla JS with CSS transitions — no GSAP needed for simple opacity fades.
**Placement**: Page Settings → Before `</body>` (affects multiple sections).

**Key behaviors**:
- Two-phase animation: fade out → swap display → fade in
- Queue system prevents visual glitches on rapid clicks
- Per-tab accent color on a highlight element
- `display` value snapshotted on init (not hardcoded)

```html
<script>
(function () {
  addEventListener("DOMContentLoaded", () => {

    // ── Config ──────────────────────────────────────────
    const TABS = [
      { btn: ".home-tab-1", suffix: "is-1", color: "#4d99c2" },
      { btn: ".home-tab-2", suffix: "is-2", color: "#8234b0" },
      { btn: ".home-tab-3", suffix: "is-3", color: "#54d61b" },
    ];
    const FADE_MS = 200;

    // ── State ────────────────────────────────────────────
    let isAnimating = false;
    let pendingTab  = null;
    let activeIndex = 0;

    // ── Gather elements ──────────────────────────────────
    const buttons    = TABS.map(t => document.querySelector(t.btn));
    const topImages  = TABS.map((_, i) =>
      document.querySelector(`.home_tabs_top-image.is-${i + 1}`));
    const cards      = TABS.map((_, i) =>
      document.querySelector(`.home_tabs_card.is-${i + 1}`));
    const highlight  = document.querySelector(".tabs-title-highlight");

    // Snapshot natural display values (don't hardcode "block")
    const naturalDisplayImage = topImages[0]
      ? window.getComputedStyle(topImages[0]).display : "block";
    const naturalDisplayCard  = cards[0]
      ? window.getComputedStyle(cards[0]).display  : "block";

    // ── Init: hide all except tab 0 ──────────────────────
    topImages.forEach((el, i) => { if (el) el.style.display = i === 0 ? naturalDisplayImage : "none"; });
    cards.forEach((el, i)     => { if (el) el.style.display = i === 0 ? naturalDisplayCard  : "none"; });

    // ── Core switch logic ────────────────────────────────
    function switchTab(targetIndex) {
      if (targetIndex === activeIndex) return;
      if (isAnimating) { pendingTab = targetIndex; return; }
      isAnimating = true;

      const outImg  = topImages[activeIndex];
      const outCard = cards[activeIndex];
      const inImg   = topImages[targetIndex];
      const inCard  = cards[targetIndex];

      // Phase 1: fade out
      [outImg, outCard].forEach(el => { if (el) el.style.opacity = "0"; });

      setTimeout(() => {
        // Phase 2: display swap (invisible, no layout jump)
        [outImg, outCard].forEach(el => { if (el) el.style.display = "none"; });
        if (inImg)  { inImg.style.opacity  = "0"; inImg.style.display  = naturalDisplayImage; }
        if (inCard) { inCard.style.opacity = "0"; inCard.style.display = naturalDisplayCard;  }

        // Phase 3: fade in + color
        requestAnimationFrame(() => {
          [inImg, inCard].forEach(el => { if (el) el.style.opacity = "1"; });
          if (highlight) highlight.style.color = TABS[targetIndex].color;

          setTimeout(() => {
            activeIndex = targetIndex;
            isAnimating = false;
            if (pendingTab !== null) {
              const next = pendingTab;
              pendingTab = null;
              switchTab(next);
            }
          }, FADE_MS);
        });
      }, FADE_MS);
    }

    // ── CSS transitions on all content elements ──────────
    [...topImages, ...cards].forEach(el => {
      if (el) el.style.transition = `opacity ${FADE_MS}ms ease`;
    });
    if (highlight) highlight.style.transition = `color ${FADE_MS}ms ease`;

    // ── Button listeners ─────────────────────────────────
    buttons.forEach((btn, i) => {
      if (btn) btn.addEventListener("click", () => switchTab(i));
    });

  });
})();
</script>
```

---

## 2. FAQ Accordion (GSAP)

**When to use**: FAQ list with animated expand/collapse.
**JS or GSAP**: GSAP — required for reliable `height: auto` animation.
**Placement**: Page Settings → Before `</body>`, or Embed if FAQ is a reusable section.

**HTML structure expected**:
```
.faq_item           ← clickable item wrapper
  .faq_question     ← click target
  .faq_icon         ← rotates 180° on open
  .faq_expand       ← the collapsible panel
```

**Optional**: `#faq_expand-list` (hidden extra items) + `#faq_expand-button-wrap` (show more button).

```html
<script>
addEventListener("DOMContentLoaded", () => {

  // ── Init: collapse all panels ─────────────────────────
  document.querySelectorAll(".faq_expand").forEach(el => {
    gsap.set(el, { height: 0, overflow: "hidden" });
  });

  // Optional: hide "show more" section on load
  const expandList = document.querySelector("#faq_expand-list");
  const expandBtnWrap = document.querySelector("#faq_expand-button-wrap");
  if (expandList) gsap.set(expandList, { height: 0, overflow: "hidden" });

  // ── Toggle a single item ──────────────────────────────
  function toggleItem(item) {
    const expand = item.querySelector(".faq_expand");
    const icon   = item.querySelector(".faq_icon");
    const isOpen = item.classList.contains("is-open");

    if (isOpen) {
      // Close this item
      gsap.set(expand, { height: expand.offsetHeight }); // snapshot before animating
      gsap.to(expand, { height: 0, duration: 0.3, ease: "power2.inOut" });
      if (icon) gsap.to(icon, { rotation: 0, duration: 0.3 });
      item.classList.remove("is-open");
    } else {
      // Close ALL currently open items (globally, not just siblings)
      document.querySelectorAll(".faq_item.is-open").forEach(openItem => {
        const openExpand = openItem.querySelector(".faq_expand");
        const openIcon   = openItem.querySelector(".faq_icon");
        gsap.set(openExpand, { height: openExpand.offsetHeight });
        gsap.to(openExpand, { height: 0, duration: 0.3, ease: "power2.inOut" });
        if (openIcon) gsap.to(openIcon, { rotation: 0, duration: 0.3 });
        openItem.classList.remove("is-open");
      });

      // Open this item
      gsap.set(expand, { height: "auto" });
      const fullHeight = expand.offsetHeight;
      gsap.fromTo(expand,
        { height: 0 },
        { height: fullHeight, duration: 0.35, ease: "power2.out",
          onComplete: () => gsap.set(expand, { height: "auto" }) }
      );
      if (icon) gsap.to(icon, { rotation: 180, duration: 0.3 });
      item.classList.add("is-open");
    }
  }

  // ── Attach click listeners ────────────────────────────
  document.querySelectorAll(".faq_item").forEach(item => {
    const question = item.querySelector(".faq_question");
    if (question) question.addEventListener("click", () => toggleItem(item));
  });

  // ── Optional "Show more" button ───────────────────────
  const expandBtn = document.querySelector("#faq_expand-button");
  if (expandBtn && expandList) {
    expandBtn.addEventListener("click", () => {
      gsap.set(expandList, { height: "auto" });
      const fullHeight = expandList.offsetHeight;
      gsap.fromTo(expandList,
        { height: 0 },
        { height: fullHeight, duration: 0.4, ease: "power2.out",
          onComplete: () => {
            gsap.set(expandList, { height: "auto" });
            if (expandBtnWrap) gsap.to(expandBtnWrap, { opacity: 0, height: 0, duration: 0.2 });
          }
        }
      );
    });
  }

});
</script>
```

---

## 3. Swiper.js Testimonials Slider with Modal

**When to use**: Testimonial/review slider where cards have long text that opens a full modal.
**JS or GSAP**: Vanilla JS. Swiper handles animation internally.
**Placement**: Self-contained Embed component inside the testimonials section.

**Requires**: Swiper.js activated in Webflow (CDN via Page Settings `<head>`):
```html
<link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/swiper@11/swiper-bundle.min.css"/>
```
And before `</body>` or in Site Settings:
```html
<script src="https://cdn.jsdelivr.net/npm/swiper@11/swiper-bundle.min.js"></script>
```

**HTML structure expected**:
```
.testimonials-swiper            ← Swiper wrapper
  .swiper-wrapper
    .swiper-slide               ← one per testimonial
      [testimonial-data="name"]
      [testimonial-data="role"]
      [testimonial-data="content"]   ← text that gets clamped + "read more"
      .read-more-trigger        ← hidden unless content overflows (added by JS)

#testimonial-modal              ← modal overlay
  .modal-name, .modal-role, .modal-content
  .close-lightbox, .icon_close
```

**Note**: Use custom attributes (`testimonial-data="content"`) — never IDs — on elements inside repeated slides.

```html
<style>
  [testimonial-data="content"] {
    display: -webkit-box;
    -webkit-line-clamp: 6;
    -webkit-box-orient: vertical;
    overflow: hidden;
  }
  .read-more-trigger { display: none; cursor: pointer; font-weight: 500; margin-top: 8px; }
  .read-more-trigger.is-visible { display: block; }
  #testimonial-modal { display: none; position: fixed; inset: 0; z-index: 999;
    background: rgba(0,0,0,0.6); align-items: center; justify-content: center; }
  #testimonial-modal.is-open { display: flex; }
</style>

<script>
addEventListener("DOMContentLoaded", () => {

  // ── Init Swiper ───────────────────────────────────────
  new Swiper(".testimonials-swiper", {
    slidesPerView: 1,
    spaceBetween: 24,
    breakpoints: {
      768:  { slidesPerView: 2 },
      1024: { slidesPerView: 3 },
    },
    pagination: { el: ".swiper-pagination", clickable: true },
    navigation: { nextEl: ".swiper-button-next", prevEl: ".swiper-button-prev" },
  });

  // ── Detect overflow and show "Read more" trigger ──────
  document.querySelectorAll(".swiper-slide").forEach(slide => {
    const content = slide.querySelector('[testimonial-data="content"]');
    if (!content) return;

    // If clamped height < scrollHeight, content is overflowing
    if (content.scrollHeight > content.clientHeight + 2) {
      let trigger = slide.querySelector(".read-more-trigger");
      if (!trigger) {
        trigger = document.createElement("button");
        trigger.className = "read-more-trigger";
        trigger.textContent = "Read more";
        content.after(trigger);
      }
      trigger.classList.add("is-visible");
      trigger.addEventListener("click", () => openModal(slide));
    }
  });

  // ── Modal ─────────────────────────────────────────────
  const modal = document.querySelector("#testimonial-modal");

  function openModal(slide) {
    if (!modal) return;
    modal.querySelector(".modal-name").textContent =
      slide.querySelector('[testimonial-data="name"]')?.textContent || "";
    modal.querySelector(".modal-role").textContent =
      slide.querySelector('[testimonial-data="role"]')?.textContent || "";
    modal.querySelector(".modal-content").textContent =
      slide.querySelector('[testimonial-data="content"]')?.textContent || "";
    modal.classList.add("is-open");
  }

  function closeModal() {
    if (modal) modal.classList.remove("is-open");
  }

  modal?.querySelectorAll(".close-lightbox, .icon_close").forEach(el =>
    el.addEventListener("click", closeModal));

  document.addEventListener("keydown", e => { if (e.key === "Escape") closeModal(); });
  modal?.addEventListener("click", e => { if (e.target === modal) closeModal(); });

});
</script>
```

---

## 4. Conditional Visibility (Radio Buttons + URL Deep-link)

**When to use**: Service or option selector where picking one radio shows a specific content section.
**JS or GSAP**: Vanilla JS — class toggle + display swap. No animation needed.
**Placement**: Page Settings → Before `</body>`.

**HTML structure expected**:
```
input[type="radio"][name="service"][value="option-a"]   ← radio inputs
[data-service="option-a"]                               ← content sections
#what-to-expect                                         ← optional element to hide for specific option
```

Deep-link support: `?service=option-a` in URL auto-selects on load.

```html
<script>
addEventListener("DOMContentLoaded", () => {

  const HIDE_FOR = ["student-loan-consultation"]; // options that hide #what-to-expect

  const radios   = document.querySelectorAll('input[type="radio"][name="service"]');
  const sections = document.querySelectorAll("[data-service]");
  const whatToExpect = document.querySelector("#what-to-expect");

  function applySelection(value) {
    // Show/hide content sections
    sections.forEach(s => {
      s.style.display = s.dataset.service === value ? "" : "none";
    });

    // Update Webflow radio styling classes
    radios.forEach(r => {
      r.classList.toggle("w--redirected-checked", r.value === value);
      r.closest("[data-service-option]")?.classList.toggle("is-active", r.value === value);
      r.closest(".service-selected-wrapper")?.classList.toggle("service-selected-wrapper", r.value === value);
    });

    // Conditionally hide #what-to-expect
    if (whatToExpect) {
      whatToExpect.style.display = HIDE_FOR.indexOf(value) > -1 ? "none" : "";
    }
  }

  // Attach listeners
  radios.forEach(r => r.addEventListener("change", () => applySelection(r.value)));

  // URL deep-link on load
  const params = new URLSearchParams(window.location.search);
  const preselect = params.get("service");
  if (preselect) {
    const target = document.querySelector(`input[name="service"][value="${preselect}"]`);
    if (target) { target.checked = true; applySelection(preselect); }
  }

});
</script>
```

---

## 5. CMS Card Grid Embed (LinkedIn-style)

**When to use**: Grid of manually built cards (not Webflow CMS) with author info, post link, avatar.
**JS or GSAP**: No JS needed — pure HTML + CSS embed.
**Placement**: Embed component inside the grid section. One `<style>` block in `<head>` (Page Settings), six individual `<article>` embeds in the grid.

**Key rule**: Never nest `<a>` inside `<a>`. Author info and external link must be sibling anchors.

**Shared CSS (Page Settings `<head>`):**
```html
<style>
  .li-card { background: #fff; border: 1px solid #e0e0e0; border-radius: 12px;
    padding: 20px; display: flex; flex-direction: column; gap: 12px; }
  .li-card__author { display: flex; align-items: center; justify-content: space-between; }
  .li-card__author-info { display: flex; align-items: center; gap: 10px;
    text-decoration: none; color: inherit; }
  .li-card__avatar { width: 44px; height: 44px; border-radius: 50%; object-fit: cover; }
  .li-card__name { font-weight: 600; font-size: 14px; }
  .li-card__title { font-size: 12px; color: #666; }
  .li-card__body { font-size: 14px; line-height: 1.6; color: #333; flex: 1; }
  .li-card__link { display: inline-flex; align-items: center; gap: 6px;
    font-size: 13px; font-weight: 500; color: #0a66c2; text-decoration: none; }
  .li-card__link:hover { text-decoration: underline; }
</style>
```

**Individual card embed:**
```html
<article class="li-card">
  <div class="li-card__author">
    <a href="https://linkedin.com/in/PROFILE" target="_blank" rel="noopener" class="li-card__author-info">
      <img src="AVATAR_URL" alt="Author Name" class="li-card__avatar" />
      <div>
        <div class="li-card__name">Author Name</div>
        <div class="li-card__title">Title · Company</div>
      </div>
    </a>
    <a href="https://linkedin.com/posts/POST_URL" target="_blank" rel="noopener" class="li-card__link">
      View on LinkedIn ↗
    </a>
  </div>
  <p class="li-card__body">Post text goes here...</p>
</article>
```
