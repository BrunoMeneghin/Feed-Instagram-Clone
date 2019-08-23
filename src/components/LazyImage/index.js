import React, { useState, useEffect } from 'react';
import { Small, OriginalImage } from './styles';
import { Animated } from 'react-native'; 

const OrinalAnimeted = Animated.createAnimatedComponent(OriginalImage); 

export default function LazyImage({
    smallSource, 
    source, 
    aspectRatio, 
    shouldLoad, 
}) {
  const opacity = new Animated.Value(0); 
  const [loaded, setLoaded] = useState(false); 
  
  useEffect(() => {
     if(shouldLoad) {
        setTimeout(() => {
            setLoaded(true); 
        }, 1000); 
     }
  }, [shouldLoad]);
  
  function handleAnimate() {
      Animated.timing(opacity, {
          toValue: 1, 
          duration: 500, // meio segundo
          useNativeDriver: true, 
      }).start();
  } 

  return (
    <Small 
        source={smallSource} 
        ratio={aspectRatio} 
        resizeMode="contain" 
        blurRadius={1}
    >
        {loaded && 
            <OrinalAnimeted
                style={{ opacity }}
                source={source}
                ratio={aspectRatio}
                resizeMode="contain"
                onLoadEnd={handleAnimate} // Quando a imagem terminar de ser carregada, chamará a função 
            />
        }  
    </Small> 
    //Com a props ImageBackground, é possível ter uma tag com conteúdo dentro 
  );
}
