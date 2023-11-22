import { RequestType, setKey, setLanguage, setRegion } from "react-geocode";

export function setDefaults(options: {
    key?: string;
    language?: string;
    region?: string;
  }): void {
    if (options.key) {
      setKey(options.key);
    }
  
    if (options.language) {
      setLanguage(options.language);
    }
  
    if (options.region) {
      setRegion(options.region);
    }
  }