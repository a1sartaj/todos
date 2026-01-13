export const formatDate = (date) => {

    if (!date) return;

    const newDate = new Date(date);
    // Input: ISO date string (e.g. "2026-01-12T00:00:00.000Z")
    // newDate becomes a Date object in local timezone
    // Example (IST): Mon Jan 12 2026 05:30:00 GMT+0530


    const year = newDate.getFullYear();
    const month = String(newDate.getMonth() + 1).padStart(2, '0');
    const day = String(newDate.getDate()).padStart(2, '0');

    const newFormatDate = `${year}-${month}-${day}`

    return newFormatDate;

}