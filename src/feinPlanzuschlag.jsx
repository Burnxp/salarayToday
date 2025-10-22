
export function calculateFeinPlanZuschlag(feinPlanChecked, feinPlanHalfChecked, feinplanzuschlag) {
  let zuschlag = 0;
  if (parseFloat(feinplanzuschlag || 0) > 0) {
    if (feinPlanChecked) {
      zuschlag = parseFloat(feinplanzuschlag);
    } else if (feinPlanHalfChecked) {
      zuschlag = parseFloat(feinplanzuschlag) / 2;
    }
  }
  return zuschlag;
}