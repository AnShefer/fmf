function base64ToBlob(base64, mime) {
  // Decode the Base64 string
  const byteCharacters = atob(base64);
  const byteArrays = [];

  // Convert binary string to array of bytes
  for (let offset = 0; offset < byteCharacters.length; offset += 512) {
    const slice = byteCharacters.slice(offset, offset + 512);

    const byteNumbers = new Array(slice.length);
    // eslint-disable-next-line no-plusplus
    for (let i = 0; i < slice.length; i++) {
      byteNumbers[i] = slice.charCodeAt(i);
    }

    const byteArray = new Uint8Array(byteNumbers);
    byteArrays.push(byteArray);
  }

  // Create a Blob from the byte arrays
  return new Blob(byteArrays, { type: mime });
}

export default base64ToBlob;
