export function generateDatesToFillSummary(minimunDatesSize: number, summaryDatesSize: number) {
  if (minimunDatesSize - summaryDatesSize >= 7) {
    const amountOfDaysToFill = minimunDatesSize - summaryDatesSize;
    
    return amountOfDaysToFill;
  } else {
    const minimunWeeksSize = Math.ceil(summaryDatesSize / 7);
    const amountOfDaysToFill = (minimunWeeksSize * 7) - summaryDatesSize;
    
    return amountOfDaysToFill;
  }
}