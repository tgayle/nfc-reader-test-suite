const hexadecimalRegex = /^[a-f0-9]+$/i;

module.exports = {
  idIsValid: (newId, expectedLength) => {
    if (!newId) return false;
    expectedLength = expectedLength || 8;
    newId = newId.replace(' ', '');
    return newId.length % 2 === 0 &&
    newId.length >= expectedLength && hexadecimalRegex.test(newId);
  },
};
