const queryParamParser = {
  toModelString: (v: string): string => v,
  serializeString: (v: string): string => v,

  toModelNumber: (v: string): number => parseInt(v, 10),
  serializeNumber: (v: number): string => v.toString(),

  toModelStringList: (v: string): string[] => v.split(','),
  serializeStringList: (v: string[]): string => v.join(','),

  toModelNumberList: (v: string): number[] => v.split(',').map(queryParamParser.toModelNumber),
  serializeNumberList: (v: number[]): string => v.map(queryParamParser.serializeNumber).join(','),

  toModelBoolean: (value: string): boolean => {
    let bool;
    const maybeNumber = parseInt(value, 10);
    if (isNaN(maybeNumber)) {
      bool = value === 'true' ? true : false;
    } else {
      bool = maybeNumber === 0 ? false : true;
    }

    return bool;
  },
  serializeBoolean: (v: boolean): string => v ? '1' : '0',
};

export default queryParamParser;
