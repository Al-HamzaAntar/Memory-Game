import React from 'react';
import { Check, User } from 'lucide-react';

interface NameListProps {
  names: string[];
  allowedNames: string[];
}

const NameList: React.FC<NameListProps> = ({ names, allowedNames }) => {
  // Early return if no names to display
  if (names.length === 0) {
    return (
      <div className="w-full max-w-md mt-6">
        <div className="bg-white rounded-lg shadow-md p-6">
          <h2 className="text-xl font-semibold text-gray-800 mb-2">Accepted Names</h2>
          <p className="text-gray-500 text-sm italic">No names have been accepted yet</p>
          
          <div className="mt-4">
            <h3 className="text-md font-medium text-gray-700 mb-2">Allowed Names:</h3>
            <div className="flex flex-wrap gap-2">
              {allowedNames.map((allowedName) => (
                <span 
                  key={allowedName}
                  className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-gray-100 text-gray-800"
                >
                  {allowedName}
                </span>
              ))}
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="w-full max-w-md mt-6">
      <div className="bg-white rounded-lg shadow-md p-6">
        <h2 className="text-xl font-semibold text-gray-800 mb-4">Accepted Names</h2>
        
        <ul className="space-y-2">
          {names.map((name, index) => (
            <li 
              key={name}
              className="animate-fade-in flex items-center px-3 py-2 bg-blue-50 rounded-md border border-blue-100"
              style={{ animationDelay: `${index * 150}ms` }}
            >
              <div className="mr-2 bg-blue-500 text-white p-1 rounded-full">
                <Check size={12} />
              </div>
              <span className="capitalize text-blue-800">{name}</span>
            </li>
          ))}
        </ul>
        
        <div className="mt-6">
          <h3 className="text-md font-medium text-gray-700 mb-2">Available Names:</h3>
          <div className="flex flex-wrap gap-2">
            {allowedNames
              .filter(name => !names.includes(name.toLowerCase()))
              .map((name) => (
                <span 
                  key={name}
                  className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-gray-100 text-gray-800"
                >
                  <User size={12} className="mr-1" />
                  {name}
                </span>
              ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default NameList;