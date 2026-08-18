"use client";

// The two quick controls above the business list. They hold no state of their
// own: the view lives in the URL, so a sorted list survives a reload and can be
// handed to someone else as a link.

import { ArrowDown, ArrowUp, ListFilter, SlidersHorizontal } from "lucide-react";

import { Button } from "@/components/ui";
import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuLabel,
  DropdownMenuRadioGroup,
  DropdownMenuRadioItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import type { SortDir, TargetSortKey } from "@/app/queries";
import { useT } from "@/lib/i18n/client";
import { TARGET_STATES, type TargetState } from "@/lib/types";

import { stateLabel } from "./text";
import {
  DEFAULT_STATES,
  SORT_OPTIONS,
  sameStates,
  sortLabel,
  type TargetView,
} from "./view";

export type TargetToolbarProps = {
  view: TargetView;
  onChange: (view: TargetView) => void;
  /** True while the re-read is in flight: the list below is still the old one. */
  busy?: boolean;
};

export function TargetToolbar({ view, onChange, busy = false }: TargetToolbarProps) {
  const t = useT();
  const filtered = !sameStates(view.states, DEFAULT_STATES);
  const states = stateLabel(t);

  // The last state cannot be unchecked: `filterConditions` reads an empty list as
  // "everything except set aside", so emptying the menu would show MORE, not less.
  const toggleState = (state: TargetState, checked: boolean) => {
    const next = checked
      ? TARGET_STATES.filter((item) => view.states.includes(item) || item === state)
      : view.states.filter((item) => item !== state);

    if (next.length === 0) return;
    onChange({ ...view, states: next });
  };

  return (
    <div className="target-toolbar" data-busy={busy ? "yes" : "no"}>
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button
            variant="quiet"
            size="compact"
            className="target-toolbar__button"
            aria-label={t("list.toolbar.sortAria", {
              label: sortLabel(t, view.sort),
              dir:
                view.dir === "desc"
                  ? t("list.toolbar.highestFirstLower")
                  : t("list.toolbar.lowestFirstLower"),
            })}
          >
            <SlidersHorizontal aria-hidden="true" />
            <span className="target-toolbar__label">{sortLabel(t, view.sort)}</span>
            {view.dir === "desc" ? (
              <ArrowDown aria-hidden="true" />
            ) : (
              <ArrowUp aria-hidden="true" />
            )}
          </Button>
        </DropdownMenuTrigger>

        <DropdownMenuContent align="start">
          <DropdownMenuLabel>{t("list.toolbar.sortBy")}</DropdownMenuLabel>
          <DropdownMenuRadioGroup
            value={view.sort}
            onValueChange={(value) =>
              onChange({ ...view, sort: value as TargetSortKey })
            }
          >
            {SORT_OPTIONS.map((option) => (
              <DropdownMenuRadioItem key={option.key} value={option.key}>
                {t(option.labelKey)}
              </DropdownMenuRadioItem>
            ))}
          </DropdownMenuRadioGroup>

          <DropdownMenuSeparator />

          <DropdownMenuRadioGroup
            value={view.dir}
            onValueChange={(value) => onChange({ ...view, dir: value as SortDir })}
          >
            <DropdownMenuRadioItem value="desc">
              {t("list.toolbar.highestFirst")}
            </DropdownMenuRadioItem>
            <DropdownMenuRadioItem value="asc">
              {t("list.toolbar.lowestFirst")}
            </DropdownMenuRadioItem>
          </DropdownMenuRadioGroup>
        </DropdownMenuContent>
      </DropdownMenu>

      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button
            variant="quiet"
            size="compact"
            className="target-toolbar__button"
            data-filtered={filtered ? "yes" : "no"}
            aria-label={t("list.toolbar.filterAria", {
              shown: view.states.length,
              total: TARGET_STATES.length,
            })}
          >
            <ListFilter aria-hidden="true" />
            <span className="target-toolbar__label">{t("list.toolbar.filter")}</span>
            {filtered ? <span className="target-toolbar__dot" aria-hidden="true" /> : null}
          </Button>
        </DropdownMenuTrigger>

        <DropdownMenuContent align="end">
          <DropdownMenuLabel>{t("list.toolbar.show")}</DropdownMenuLabel>
          {TARGET_STATES.map((state) => (
            <DropdownMenuCheckboxItem
              key={state}
              checked={view.states.includes(state)}
              // Radix closes on select; the menu stays open so several states can
              // be picked in one go.
              onSelect={(event) => event.preventDefault()}
              onCheckedChange={(checked) => toggleState(state, checked === true)}
            >
              {states[state]}
            </DropdownMenuCheckboxItem>
          ))}
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  );
}
