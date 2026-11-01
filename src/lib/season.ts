export const HALLOWEEN_SEASON = "halloween";

export function isHalloweenDate(now = new Date()) {
  return now.getMonth() === 9 && now.getDate() === 31;
}

/** Sets data-theme-season before paint. Runs on the viewer's local calendar. */
export const HALLOWEEN_SEASON_SCRIPT = `(function(){var d=new Date();if(d.getMonth()===9&&d.getDate()===31)document.documentElement.setAttribute("data-theme-season","${HALLOWEEN_SEASON}")})()`;
