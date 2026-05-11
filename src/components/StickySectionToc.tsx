import { useEffect, useMemo, useState } from "react";

type TocSection = {
  id: string;
  label: string;
};

interface Props {
  sections: TocSection[];
}

export default function StickySectionToc({ sections }: Props) {
  const [activeId, setActiveId] = useState<string>(sections[0]?.id ?? "");

  const sectionIds = useMemo(() => sections.map((section) => section.id), [sections]);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((entry) => entry.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio);
        if (visible[0]?.target?.id) {
          setActiveId(visible[0].target.id);
        }
      },
      { rootMargin: "-45% 0px -45% 0px", threshold: [0.1, 0.4, 0.7] },
    );

    sectionIds.forEach((id) => {
      const el = document.getElementById(id);
      if (el) observer.observe(el);
    });

    return () => observer.disconnect();
  }, [sectionIds]);

  const activeIndex = sections.findIndex((s) => s.id === activeId);

  return (
    <nav
      aria-label="Compliance areas"
      className="rounded-xl border border-[var(--line)] bg-white p-5 md:sticky md:top-28"
    >
      <p className="text-xs font-semibold uppercase tracking-wider text-[var(--text-muted)] mb-4">
        Jump to area
      </p>

      {/* Vertical bar with connected dots */}
      <div className="relative">
        {/* Track line */}
        <div
          className="absolute left-[9px] top-[12px] bottom-[12px] w-[2px] bg-[var(--neutral-200)]"
          aria-hidden="true"
        />
        {/* Progress fill */}
        <div
          className="absolute left-[9px] top-[12px] w-[2px] bg-[var(--gold-500)] transition-all duration-300"
          style={{
            height: activeIndex >= 0
              ? `${(activeIndex / Math.max(sections.length - 1, 1)) * 100}%`
              : "0%",
            maxHeight: "calc(100% - 24px)",
          }}
          aria-hidden="true"
        />

        <ul className="relative space-y-1">
          {sections.map((section, index) => {
            const isActive = activeId === section.id;
            const isPast = index <= activeIndex;

            return (
              <li key={section.id} className="relative">
                <a
                  href={`#${section.id}`}
                  className={`flex items-center gap-3 rounded-md px-1 py-2 text-sm no-underline transition-colors ${
                    isActive
                      ? "text-[var(--maroon-600)] font-medium"
                      : "text-[var(--text-secondary)] hover:text-[var(--neutral-900)]"
                  }`}
                >
                  {/* Dot node */}
                  <span
                    className={`relative z-10 flex h-[20px] w-[20px] shrink-0 items-center justify-center rounded-full transition-all duration-200 ${
                      isActive
                        ? "bg-[var(--gold-500)] ring-4 ring-[var(--gold-100)]"
                        : isPast
                          ? "bg-[var(--gold-400)]"
                          : "bg-[var(--neutral-300)]"
                    }`}
                  >
                    {isActive && (
                      <span className="h-[6px] w-[6px] rounded-full bg-white" />
                    )}
                  </span>

                  <span className="leading-tight">{section.label}</span>
                </a>
              </li>
            );
          })}
        </ul>
      </div>
    </nav>
  );
}
