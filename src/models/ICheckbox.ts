export interface ICheckbox {
  size: {
    small: boolean;
    medium: boolean;
    large: boolean;
  };
  energyLvl: {
    low: boolean;
    moderate: boolean;
    high: boolean;
  };
  easeTr: {
    easy: boolean;
    average: boolean;
    difficult: boolean;
  };
  groomReqs: {
    minimum: boolean;
    reasonable: boolean;
    demanding: boolean;
  };
}
