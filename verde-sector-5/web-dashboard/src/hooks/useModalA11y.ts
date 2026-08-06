import { useEffect, useRef } from 'react';

/**
 * Accessibility plumbing shared by all modals:
 *  - Escape closes the modal
 *  - focus moves into the modal on open and is restored to the trigger on close
 *  - Tab / Shift+Tab are trapped inside the modal
 *
 * Attach the returned ref to the modal's content container.
 */
export function useModalA11y<T extends HTMLElement>(onClose: () => void) {
  const containerRef = useRef<T>(null);

  useEffect(() => {
    const previouslyFocused = document.activeElement as HTMLElement | null;
    const container = containerRef.current;

    // Move focus into the modal (first focusable element, else the container).
    const focusables = () =>
      Array.from(
        container?.querySelectorAll<HTMLElement>(
          'a[href], button:not([disabled]), textarea, input, select, [tabindex]:not([tabindex="-1"])'
        ) ?? []
      ).filter((el) => el.offsetParent !== null);

    const first = focusables()[0];
    (first ?? container)?.focus?.();

    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        e.preventDefault();
        onClose();
        return;
      }
      if (e.key === 'Tab') {
        const items = focusables();
        if (items.length === 0) return;
        const firstEl = items[0];
        const lastEl = items[items.length - 1];
        if (e.shiftKey && document.activeElement === firstEl) {
          e.preventDefault();
          lastEl.focus();
        } else if (!e.shiftKey && document.activeElement === lastEl) {
          e.preventDefault();
          firstEl.focus();
        }
      }
    };

    document.addEventListener('keydown', onKeyDown);
    return () => {
      document.removeEventListener('keydown', onKeyDown);
      previouslyFocused?.focus?.();
    };
  }, [onClose]);

  return containerRef;
}
