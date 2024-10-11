// components/Covid.jsx
import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchCovidData } from '../features/covidSlice';
import { FaVirus } from 'react-icons/fa';

const Covid = () => {
    const dispatch = useDispatch();
    const covidData = useSelector((state) => state.covid.data);
    const covidStatus = useSelector((state) => state.covid.status);
    const error = useSelector((state) => state.covid.error);

    useEffect(() => {
        if (covidStatus === 'idle') {
            dispatch(fetchCovidData());
        }
    }, [covidStatus, dispatch]);

    if (covidStatus === 'loading') {
        return <div className="text-center mt-10">Loading...</div>;
    }

    if (covidStatus === 'failed') {
        return <div className="text-center mt-10 text-red-500">{error}</div>;
    }

    return (
        <div className="p-6">
            <h1 className="text-2xl font-bold mb-4 text-center">
                COVID-19 Data by Country <FaVirus className="inline-block ml-2 text-red-500" />
            </h1>
            <table className="min-w-full bg-white border border-gray-300">
                <thead>
                    <tr className="bg-gray-200 text-gray-700">
                        <th className="py-2 px-4 border">Pays</th>
                        <th className="py-2 px-4 border">Updated</th>
                        <th className="py-2 px-4 border">Flags</th>
                        <th className="py-2 px-4 border">Cases</th>
                        <th className="py-2 px-4 border">Deaths</th>
                        <th className="py-2 px-4 border">Recovered</th>
                        <th className="py-2 px-4 border">Tests</th>
                    </tr>
                </thead>
                <tbody>
                    {covidData.map((country) => (
                        <tr key={country.country} className="text-gray-700 hover:bg-gray-100">
                            <td className="py-2 px-4 border">{country.country}</td>
                            <td className="py-2 px-4 border">{new Date(country.updated).toLocaleString()}</td>
                            <td className="py-2 px-4 border">
                                <img src={country.countryInfo.flag} alt={`Flag of ${country.country}`} className="w-8 h-5" />
                            </td>
                            <td className="py-2 px-4 border">{country.cases}</td>
                            <td className="py-2 px-4 border">{country.deaths}</td>
                            <td className="py-2 px-4 border">{country.recovered}</td>
                            <td className="py-2 px-4 border">{country.tests}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default Covid;
