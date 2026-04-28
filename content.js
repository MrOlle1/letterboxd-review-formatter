// Letterboxd Review Formatter - content.js

const BUTTONS = [
  {
    label: "B",
    title: "Bold",
    style: "font-weight:bold",
    action: (sel) => `<b>${sel}</b>`,
    isIcon: false,
  },
  {
    label: "I",
    title: "Italic",
    style: "font-style:italic",
    action: (sel) => `<i>${sel}</i>`,
    isIcon: false,
  },
  {
    label: `<svg viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg" width="14" height="14">
      <path d="M3 5C3 4.44772 3.44772 4 4 4H16C16.5523 4 17 4.44772 17 5C17 5.55228 16.5523 6 16 6H4C3.44772 6 3 5.55228 3 5Z" fill="currentColor"/>
      <path d="M3 10C3 9.44772 3.44772 9 4 9H16C16.5523 9 17 9.44772 17 10C17 10.5523 16.5523 11 16 11H4C3.44772 11 3 10.5523 3 10Z" fill="currentColor"/>
      <path d="M4 14C3.44772 14 3 14.4477 3 15C3 15.5523 3.44772 16 4 16H10C10.5523 16 11 15.5523 11 15C11 14.4477 10.5523 14 10 14H4Z" fill="currentColor"/>
    </svg>`,
    title: "Blockquote",
    action: (sel) => `<blockquote>${sel}</blockquote>`,
    isIcon: true,
  },
  {
    label: `<svg viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg" width="14" height="14">
      <path fill-rule="evenodd" clip-rule="evenodd" d="M12.586 4.586a2 2 0 112.828 2.828l-3 3a2 2 0 01-2.828 0 1 1 0 00-1.414 1.414 4 4 0 005.656 0l3-3a4 4 0 00-5.656-5.656l-1.5 1.5a1 1 0 101.414 1.414l1.5-1.5zm-5 5a2 2 0 012.828 0 1 1 0 101.414-1.414 4 4 0 00-5.656 0l-3 3a4 4 0 105.656 5.656l1.5-1.5a1 1 0 10-1.414-1.414l-1.5 1.5a2 2 0 11-2.828-2.828l3-3z" fill="currentColor"/>
    </svg>`,
    title: "Link",
    action: (sel, textarea) => insertLink(sel, textarea),
    isIcon: true,
    isLink: true,
  },
];

function insertLink(selectedText, textarea) {
  const url = prompt("Enter URL:", "https://");
  if (!url) return null;
  const display = selectedText || prompt("Enter link text:", "link text") || "link";
  return `<a href="${url}">${display}</a>`;
}

function wrapSelection(textarea, actionFn, isLink = false) {
  const start = textarea.selectionStart;
  const end = textarea.selectionEnd;
  const selected = textarea.value.substring(start, end);

  let replacement;
  if (isLink) {
    replacement = actionFn(selected, textarea);
    if (replacement === null) return;
  } else {
    replacement = actionFn(selected);
  }

  const newValue =
    textarea.value.substring(0, start) +
    replacement +
    textarea.value.substring(end);

  textarea.value = newValue;

  // Restore cursor position after inserted text
  const newCursor = start + replacement.length;
  textarea.selectionStart = newCursor;
  textarea.selectionEnd = newCursor;
  textarea.focus();

  // Trigger input event so Letterboxd's React/Vue state picks up the change
  textarea.dispatchEvent(new Event("input", { bubbles: true }));
  textarea.dispatchEvent(new Event("change", { bubbles: true }));
}

function createToolbar(textarea) {
  const toolbar = document.createElement("div");
  toolbar.className = "lbf-toolbar";
  toolbar.setAttribute("data-lbf", "true");

  BUTTONS.forEach((btn) => {
    const button = document.createElement("button");
    button.type = "button";
    button.className = "lbf-btn";
    button.title = btn.title;
    button.setAttribute("aria-label", btn.title);
    button.innerHTML = btn.label;

    if (!btn.isIcon) {
      button.style.cssText = btn.style || "";
    }

    button.addEventListener("mousedown", (e) => {
      // Prevent blur on the textarea
      e.preventDefault();
      wrapSelection(textarea, btn.action, btn.isLink || false);
    });

    toolbar.appendChild(button);
  });

  // Separator then character count hint
  const hint = document.createElement("span");
  hint.className = "lbf-hint";
  hint.textContent = "HTML formatting";
  toolbar.appendChild(hint);

  return toolbar;
}

function injectToolbar(textarea) {
  // Avoid double-injecting
  if (textarea.dataset.lbfInjected) return;
  textarea.dataset.lbfInjected = "true";

  const toolbar = createToolbar(textarea);

  // Insert toolbar right after the textarea
  textarea.parentNode.insertBefore(toolbar, textarea.nextSibling);
}

function findAndInjectAll() {
  // Letterboxd review textareas – target the main review body textarea
  const textareas = document.querySelectorAll(
    "textarea[name='review'], textarea[id*='review'], textarea.review-field, .text-editor textarea, textarea"
  );

  textareas.forEach((ta) => {
    // Only inject on reasonably large textareas (avoid search boxes etc.)
    if (ta.rows >= 3 || ta.offsetHeight > 60) {
      injectToolbar(ta);
    }
  });
}

// Run on load
findAndInjectAll();

// Observe DOM for dynamically added modals (Letterboxd loads the review dialog async)
const observer = new MutationObserver(() => {
  findAndInjectAll();
});

observer.observe(document.body, { childList: true, subtree: true });
