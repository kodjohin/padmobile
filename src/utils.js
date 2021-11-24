export const dateToLocalString = (date) => {
    let d = new Date(date);
    let j = d.toLocaleDateString();
    let time = d.toLocaleTimeString().split(":");
    time = time[0] + "h" + time[1];
    return [j, time];
  }