import { useState, useEffect } from 'react';
import { loadConfig, subscribeConfig } from '../services/imageConfig';

function useImageConfig() {
  const [config, setConfig] = useState(loadConfig);

  useEffect(() => {
    const unsub = subscribeConfig(setConfig);
    return unsub;
  }, []);

  return config;
}

export default useImageConfig;
