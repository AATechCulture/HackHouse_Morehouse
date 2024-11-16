import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useMockData } from '../contexts/MockDataContext';

export function CompanyExplorer() {
  const { companies } = useMockData();
  const [filters, setFilters] = useState({
    industry: '',
    focusArea: ''
  });

  const filteredCompanies = companies.filter(company => {
    if (filters.industry && company.industry !== filters.industry) return false;
    if (filters.focusArea && !company.focusAreas.includes(filters.focusArea)) return false;
    return true;
  });

  const industries = [...new Set(companies.map(c => c.industry))];
  const focusAreas = [...new Set(companies.flatMap(c => c.focusAreas))];

  return (
    <div className="container mx-auto p-8">
      <h2 className="text-3xl font-bold mb-6">Explore Companies</h2>

      {/* Filters */}
      <div className="mb-8 flex gap-4">
        <select
          className="p-2 border rounded"
          value={filters.industry}
          onChange={e => setFilters(prev => ({ ...prev, industry: e.target.value }))}
        >
          <option value="">All Industries</option>
          {industries.map(industry => (
            <option key={industry} value={industry}>{industry}</option>
          ))}
        </select>

        <select
          className="p-2 border rounded"
          value={filters.focusArea}
          onChange={e => setFilters(prev => ({ ...prev, focusArea: e.target.value }))}
        >
          <option value="">All Focus Areas</option>
          {focusAreas.map(area => (
            <option key={area} value={area}>{area}</option>
          ))}
        </select>
      </div>

      {/* Companies Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredCompanies.map(company => (
          <div key={company.id} className="bg-white rounded-lg shadow-lg p-6">
            <h3 className="text-xl font-semibold mb-2">{company.name}</h3>
            <p className="text-gray-600 mb-2">{company.industry}</p>
            <p className="text-sm text-gray-500 mb-4">{company.location}</p>
            <p className="mb-4">{company.description}</p>
            
            <div className="mb-4">
              <h4 className="font-semibold mb-2">Focus Areas</h4>
              <div className="flex flex-wrap gap-2">
                {company.focusAreas.map(area => (
                  <span
                    key={area}
                    className="bg-blue-100 text-blue-800 text-sm px-2 py-1 rounded-full"
                  >
                    {area}
                  </span>
                ))}
              </div>
            </div>

            <div className="flex justify-between items-center">
              <Link
                to={`/company/${company.id}`}
                className="text-blue-600 hover:text-blue-800"
              >
                View Profile →
              </Link>
              <Link
                to={`/chat/${company.id}`}
                className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
              >
                Start Chat
              </Link>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}