import React from "react";
import { ReactComponent as Clouds } from '/assets/fronts/icons/clouds.svg';
import { ReactComponent as Rain } from '/assets/fronts/icons/rain.svg';
import { ReactComponent as Snow } from '/assets/fronts/icons/snow.svg';
import { ReactComponent as Sun } from '/assets/fronts/icons/sun.svg';
import { ReactComponent as Drizzle } from '/assets/fronts/icons/sun-rain.svg';
import { ReactComponent as Thunder } from '/assets/fronts/icons/thunder.svg';
import { ReactComponent as Wind } from '/assets/fronts/icons/wind.svg';

function iconMapper(weatherType) {
    switch (weatherType){
        case 'Clear':
            return <Sun />;
        case 'Clouds':
            return <Clouds />;
        case 'Snow':
            return <Snow />;
        case 'Rain':
            return <Rain />;
        case 'Drizzle':
            return <Drizzle />;
        case 'Thunder':
            return <Thunder />;
        case 'Mist':
        case 'Haze':
        case 'Smoke':
        case 'Fog':
        default:
          return <Wind />;

    }
}

export default iconMapper;