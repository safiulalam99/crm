export function formatDate(dateString) {
    if (!dateString) {
      return '';  // or return a default value if preferred
    }
    const [year, month, day] = dateString.split('-');
    return `${day}-${month}-${year}`;
  }