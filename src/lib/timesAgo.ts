export default function timeAgo(date: string | number | Date): string {
    const seconds = Math.floor((new Date().getTime() - new Date(date).getTime()) / 1000);
  
    let interval = seconds / 31536000; // Calculate the number of years
  
    if (interval > 1) {
      return Math.floor(interval) + " years ago";
    }
    interval = seconds / 2592000; // Calculate the number of months
    if (interval > 1) {
      return Math.floor(interval) + " months ago";
    }
    interval = seconds / 86400; // Calculate the number of days
    if (interval > 1) {
      return Math.floor(interval) + " days ago";
    }
    interval = seconds / 3600; // Calculate the number of hours
    if (interval > 1) {
      return Math.floor(interval) + " hours ago";
    }
    interval = seconds / 60; // Calculate the number of minutes
    if (interval > 1) {
      return Math.floor(interval) + " minutes ago";
    }
    return Math.floor(seconds) + " seconds ago"; // Seconds ago if less than a minute
}