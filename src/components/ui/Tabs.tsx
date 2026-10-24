import { useRef, type KeyboardEvent, type ReactNode } from "react";
import styles from "./Tabs.module.css";

export interface TabOption {
  id: string;
  label: string;
}

export interface TabsProps {
  tabs: readonly TabOption[];
  value: string;
  onChange: (id: string) => void;
  idPrefix: string;
  ariaLabel?: string;
  children: ReactNode;
}

export function Tabs({
  tabs,
  value,
  onChange,
  idPrefix,
  ariaLabel = "Filtro por categoria",
  children,
}: TabsProps) {
  const tabRefs = useRef<Array<HTMLButtonElement | null>>([]);

  const handleKeyDown = (event: KeyboardEvent<HTMLButtonElement>, index: number) => {
    const count = tabs.length;
    if (count === 0) return;

    let nextIndex: number | null = null;

    if (event.key === "ArrowRight") {
      nextIndex = (index + 1) % count;
    } else if (event.key === "ArrowLeft") {
      nextIndex = (index - 1 + count) % count;
    } else if (event.key === "Home") {
      nextIndex = 0;
    } else if (event.key === "End") {
      nextIndex = count - 1;
    }

    if (nextIndex !== null) {
      event.preventDefault();
      const nextTab = tabs[nextIndex];
      if (nextTab) {
        onChange(nextTab.id);
        tabRefs.current[nextIndex]?.focus();
      }
    }
  };

  const activeTab = tabs.find((t) => t.id === value) ?? tabs[0];
  const activeId = activeTab ? activeTab.id : "";

  return (
    <div className={styles.tabsWrapper}>
      <div
        role="tablist"
        aria-label={ariaLabel}
        className={styles.tabList}
      >
        {tabs.map((tab, index) => {
          const isSelected = tab.id === activeId;
          const tabId = `${idPrefix}-tab-${tab.id}`;
          const panelId = `${idPrefix}-panel-${tab.id}`;

          return (
            <button
              key={tab.id}
              ref={(el) => {
                tabRefs.current[index] = el;
              }}
              id={tabId}
              type="button"
              role="tab"
              aria-selected={isSelected}
              aria-controls={panelId}
              tabIndex={isSelected ? 0 : -1}
              className={[
                styles.tab,
                isSelected ? styles.tabActive : "",
              ]
                .filter(Boolean)
                .join(" ")}
              onClick={() => onChange(tab.id)}
              onKeyDown={(e) => handleKeyDown(e, index)}
            >
              {tab.label}
            </button>
          );
        })}
      </div>

      <div
        id={`${idPrefix}-panel-${activeId}`}
        role="tabpanel"
        aria-labelledby={`${idPrefix}-tab-${activeId}`}
        className={styles.tabPanel}
      >
        {children}
      </div>
    </div>
  );
}
