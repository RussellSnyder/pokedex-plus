export const getKeyOfObject = (o: object) => Object.keys(o)[0];
export const getValueOfObject = (o: object) => Object.values(o)[0];
export const getKeyAndValueOfObject = (o: object): [any, any] => [getKeyOfObject(o), getValueOfObject(o)];
