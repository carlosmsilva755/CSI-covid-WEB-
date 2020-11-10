import React, { useEffect, useState } from 'react'
import { Chart } from "react-google-charts"
import axios from 'axios'

import cases from '../../utils/covid-cases/cases'
import './styles.css'

export default () => {

    const [statesData, setStatesData] = useState(cases)
    const [isSet, setIsSet] = useState(true)

    useEffect(() => {
        let array

        if(isSet){
            axios.get('https://covid19-brazil-api.now.sh/api/report/v1')
            .then(response=>{
                array = response.data.data
                array.sort((a,b)=>{
                    if (a.state > b.state) 
                        return 1;
                    
                    if (a.state < b.state) 
                        return -1;
                    
                    return 0;
                })
                setStatesData(array)
                setIsSet(false)
            }).catch(error=>{
                console.log(error)
            })
        }
            
        console.log(statesData)
        console.log('fdf')
    }, [statesData, isSet])

    return (
        <div>
            <Chart
                width={ window.innerWidth > 540 ? '500px' : '300px'}
                height={'400px'}
                chartType="GeoChart"
                data={[
                    ['Code', 'Casos'],
                    ['Acre', statesData[0].cases],
                    ['Alagoas', statesData[1].cases],
                    ['Amapá', statesData[2].cases],
                    ['Amazonas', statesData[3].cases],
                    ['Bahia', statesData[4].cases],
                    ['Ceará', statesData[5].cases],
                    ['Distrito Federal', statesData[6].cases],
                    ['Espírito Santo', statesData[7].cases],
                    ['Goiás', statesData[8].cases],
                    ['Maranhão', statesData[9].cases],
                    ['Mato Grosso', statesData[10].cases],
                    ['Mato Grosso do Sul', statesData[11].cases],
                    ['Minas Gerais', statesData[12].cases],
                    ['Pará', statesData[15].cases],//
                    ['Paraíba', statesData[14].cases],
                    ['Paraná', statesData[13].cases],//
                    ['Pernambuco', statesData[16].cases],
                    ['Piaui', statesData[17].cases],
                    ['Rio de Janeiro', statesData[20].cases],//
                    ['Rio Grande do Norte', statesData[18].cases],//
                    ['Rio Grande do Sul', statesData[19].cases],//
                    ['Rondônia', statesData[21].cases],
                    ['Roraima', statesData[22].cases],
                    ['Santa Catarina', statesData[23].cases],
                    ['São Paulo', statesData[25].cases],//
                    ['Sergipe', statesData[24].cases],//
                    ['Tocantins', statesData[26].cases], 
                ]}
                options={{
                    region: 'BR',
                    displayMode: 'regions',
                    resolution: 'provinces',
                    colorAxis: { colors: 'red' },
                    datalessRegionColor: 'white',
                  }}
                mapsApiKey="AIzaSyCdJfWq75F_e8kHC-v2CY_YZjGK-Wmsfpk"
                rootProps={{ 'data-testid': '2' }}
            />"

        </div>
    )
}