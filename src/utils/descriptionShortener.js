const descriptionShortener = (description) => {
  if (description.length < 150) {
    return description;
  } else {
    return `${description.substring(0, 150)}...`;
  }
};

export default descriptionShortener;
