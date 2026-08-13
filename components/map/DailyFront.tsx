"use client";

// Today's front: five businesses at most, drawn from the whole territory.
//
// There is no "claim" button anywhere: progress appears when a fact is
// recorded, never on request. The selection rule is shown line by line —
// `listFront` returns its `reason` as message keys and the screen translates
// and displays it.

import { useId, useState } from "react";

import type { FrontLine } from "@/app/queries";
import { Badge } from "@/components/ui";
// `nonBreaking` is not re-exported by the `components/ui` barrel; import it
// from the source rather than writing a second one.
import { nonBreaking } from "@/components/ui/percent";
import { formatEuros } from "@/lib/format";
import { useT } from "@/lib/i18n/client";
import type { MessageKey, Translate } from "@/lib/i18n/messages";

export type DailyFrontProps = {
  rows: readonly FrontLine[];
  selectedId: string | null;
  onSelect: (id: string) => void;
  className?: string;
};

// each action verb has its counted form ("3 to call"), picked here
const COUNT_KEY: Partial<Record<MessageKey, MessageKey>> = {
  "front.action.followUp": "front.count.followUp",
  "front.action.call": "front.count.call",
  "front.action.walkPast": "front.count.walkPast",
  "front.action.priceIt": "front.count.priceIt",
};

/**
 * The verbs of the day, counted.
 *
 * The order comes from `listFront`, which already sorted the rows: grouping
 * only. Re-sorting here would give a header that contradicts the rows below.
 */
function verbsOfTheDay(
  rows: readonly FrontLine[],
): { verb: MessageKey; total: number }[] {
  const counts = new Map<MessageKey, number>();
  for (const row of rows) {
    counts.set(row.action, (counts.get(row.action) ?? 0) + 1);
  }
  return [...counts.entries()].map(([verb, total]) => ({ verb, total }));
}

function reasonText(t: Translate, row: FrontLine): string {
  return row.reason.map((part) => t(part.key, part.params)).join(" · ");
}

export function DailyFront({
  rows,
  selectedId,
  onSelect,
  className,
}: DailyFrontProps) {
  const t = useT();
  const overdue = rows.filter((row) => row.overdue).length;

  // Lateness decides the INITIAL state only. An effect reopening the panel
  // whenever `overdue > 0` would also reopen it right after the user closed
  // it, on every re-render.
  const [open, setOpen] = useState(overdue > 0);
  const panelId = useId();

  const verbs = verbsOfTheDay(rows);

  return (
    <section
      className={className ? `front ${className}` : "front"}
      data-overdue={overdue > 0 ? "yes" : "no"}
    >
      <button
        type="button"
        className="front__toggle"
        aria-expanded={open}
        aria-controls={panelId}
        onClick={() => setOpen((state) => !state)}
      >
        <Badge>{t("front.title")}</Badge>

        <span className="t-body-s front__verbs tnum">
          {rows.length === 0 ? (
            <span className="tone-2">{t("front.nothingToday")}</span>
          ) : (
            verbs.map(({ verb, total }, index) => (
              <span key={verb}>
                {index > 0 ? <span className="tone-3"> · </span> : null}
                <span
                  className={
                    verb === "front.action.followUp" && overdue > 0
                      ? "front__overdue"
                      : "tone-2"
                  }
                >
                  {t(COUNT_KEY[verb] ?? verb, { n: total })}
                </span>
              </span>
            ))
          )}
        </span>

        <span className="front__chevron" aria-hidden="true">
          {open ? "▾" : "▸"}
        </span>
      </button>

      <div id={panelId} className="front__panel" hidden={!open}>
        {rows.length === 0 ? (
          <p className="t-body-s tone-2">{t("front.empty")}</p>
        ) : (
          <>
            <p className="t-body-s tone-3 front__what">{t("front.explain")}</p>
            <ol className="front__list">
              {rows.map((row, index) => {
                const offGrid = row.target.score.price.kind === "off-grid";
                return (
                  <li key={row.target.id}>
                    <button
                      type="button"
                      className="front__row"
                      data-selected={row.target.id === selectedId ? "yes" : "no"}
                      data-overdue={row.overdue ? "yes" : "no"}
                      onClick={() => onSelect(row.target.id)}
                    >
                      <span className="t-micro tnum front__order">{index + 1}</span>
                      <span className="front__body">
                        <span className="t-title-3 front__name">{row.target.name}</span>
                        <span className="t-body-s tone-2 front__rule">
                          {nonBreaking(reasonText(t, row))}
                        </span>
                      </span>
                      <span className="front__right">
                        <span className="t-title-3 tnum front__loot">
                          {offGrid
                            ? t("front.offGrid")
                            : formatEuros(
                                row.target.score.price.value12MonthsCents,
                                { decimals: "never" },
                              )}
                        </span>
                        <span className="t-micro front__verb">{t(row.action)}</span>
                      </span>
                    </button>
                  </li>
                );
              })}
            </ol>
          </>
        )}
      </div>
    </section>
  );
}
