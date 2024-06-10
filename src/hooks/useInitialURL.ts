import { useEffect, useState } from "react";
import { Linking } from "react-native";

const useInitialURL = () => {
    const [url, setUrl] = useState<string | null>(null);
    const [processing, setProcessing] = useState(true);
  
    useEffect(() => {
      const getUrlAsync = async () => {
        const initialUrl = await Linking.getInitialURL();
  
        setTimeout(() => {
          setUrl(initialUrl);
          setProcessing(false);
        }, 1000);
      };
  
      getUrlAsync();
    }, []);
  
    return {url, processing};
  };

  export default useInitialURL;