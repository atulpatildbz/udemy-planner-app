export const convertSecondsToReadableTime = seconds => {
    const hours = Math.floor(seconds / 3600);
    const minutes = Math.floor((seconds - hours * 3600) / 60);
    const secondsLeft = Math.floor(seconds - hours * 3600 - minutes * 60);
    // show hours only if it's greater than 0
    const hoursString = hours > 0 ? `${hours}h ` : "";
    return `${hoursString}${minutes}m ${secondsLeft}s`;
};
