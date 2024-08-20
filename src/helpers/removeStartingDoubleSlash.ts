function removeStartingHttpDoubleSlash(text: string) {
  // Check if the string starts with "http://" using startsWith()
  text = text.replace('64x64', '128x128');
  if (text.startsWith('http://')) {
    // If it does, replace it with empty string
    return text.replace(/(^\w+:|^)\/\//, '');
  } else {
    // If it doesn't start with "http://", return the original string
    return text;
  }
}

export default removeStartingHttpDoubleSlash
