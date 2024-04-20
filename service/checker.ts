const isNull = (value: any) => {
  return value === null
}

export const isAttributeNull = <T extends Object>(obj: T) => {
  for(const key in obj) {
    if (isNull(obj[key])) {
      return true;
    }
  }
  return false;
}
