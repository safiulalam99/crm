export function formatDate(dateString) {
    if (!dateString) {
      return '';  // or return a default value if preferred
    }
    const [year, month, day] = dateString.split('-');
    return `${day}-${month}-${year}`;
  }

  export const convertToRealTime = (dateTimeString: string): string => {
      const cleanedString = dateTimeString.replace('T', ' ').split('.')[0];
  
    // Create a Date object using the cleaned string
    const date = new Date(cleanedString);
  

    const options: Intl.DateTimeFormatOptions = {
      year: 'numeric',
      month: 'numeric',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
      timeZoneName: 'short',
      hourCycle: 'h24',
    };
  
    const formatter = new Intl.DateTimeFormat('en-US', options);
    return formatter.format(date);
  };