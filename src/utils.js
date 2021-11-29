export const dateToLocalString = (date) => {
    const d = new Date(date);
    const j = d.toLocaleDateString();
    let time = d.toLocaleTimeString().split(":");
    time = time[0] + "h" + time[1];
    return [j, time];
  }