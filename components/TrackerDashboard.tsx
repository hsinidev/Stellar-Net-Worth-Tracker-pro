import React, { useState, useMemo } from 'react';
import { useFirestore } from '../hooks/useFirestore';
import type { DataItem } from '../types';
import { auth } from '../services/firebase';
import { PieChart, Pie, Cell, ResponsiveContainer, Legend, Tooltip } from 'recharts';
import { AddIcon, DeleteIcon, LoadingIcon } from './Icons';


const formatCurrency = (value: number) => {
    return new Intl.NumberFormat('en-US', {
        style: 'currency',
        currency: 'USD',
        minimumFractionDigits: 2,
    }).format(value);
};

interface DataEntryFormProps {
    onAddItem: (item: Omit<DataItem, 'id'>) => Promise<void>;
    category: 'Asset' | 'Liability';
}

const DataEntryForm: React.FC<DataEntryFormProps> = ({ onAddItem, category }) => {
    const [name, setName] = useState('');
    const [value, setValue] = useState('');

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        const numValue = parseFloat(value);
        if (name && !isNaN(numValue) && numValue >= 0) {
            onAddItem({ name, value: numValue });
            setName('');
            setValue('');
        }
    };

    return (
        <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-2 mt-2">
            <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder={`${category} Name (e.g., Savings)`}
                className="flex-grow bg-space-dark/50 border border-gray-600 rounded-md px-3 py-2 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-accent-cyan"
                required
            />
            <input
                type="number"
                value={value}
                onChange={(e) => setValue(e.target.value)}
                placeholder="Amount"
                className="w-full sm:w-32 bg-space-dark/50 border border-gray-600 rounded-md px-3 py-2 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-accent-cyan"
                required
                min="0"
                step="0.01"
            />
            <button type="submit" className="flex justify-center items-center bg-accent-cyan hover:bg-accent-cyan/80 text-space-dark font-bold py-2 px-4 rounded-md transition-colors">
                <AddIcon />
                <span className="ml-2">Add</span>
            </button>
        </form>
    );
};

interface DataTableProps {
    items: DataItem[];
    onDeleteItem: (id: string) => Promise<void>;
    title: string;
    colorClass: string;
}

const DataTable: React.FC<DataTableProps> = ({ items, onDeleteItem, title, colorClass }) => (
    <div className={`bg-space-light/50 backdrop-blur-sm rounded-lg p-4 shadow-lg ${colorClass}`}>
        <h3 className="text-xl font-bold mb-2">{title}</h3>
        <div className="space-y-2 max-h-60 overflow-y-auto pr-2">
            {items.length > 0 ? items.map(item => (
                <div key={item.id} className="flex justify-between items-center bg-space-dark/70 p-2 rounded-md">
                    <span>{item.name}</span>
                    <div className="flex items-center gap-4">
                        <span className="font-mono">{formatCurrency(item.value)}</span>
                        <button onClick={() => onDeleteItem(item.id)} className="text-red-500 hover:text-red-400">
                           <DeleteIcon />
                        </button>
                    </div>
                </div>
            )) : <p className="text-gray-400">No {title.toLowerCase()} added yet.</p>}
        </div>
    </div>
);


const TrackerDashboard: React.FC = () => {
    const { data: assets, loading: loadingAssets, addItem: addAsset, deleteItem: deleteAsset } = useFirestore('assets');
    const { data: liabilities, loading: loadingLiabilities, addItem: addLiability, deleteItem: deleteLiability } = useFirestore('liabilities');

    const totalAssets = useMemo(() => assets.reduce((sum, item) => sum + item.value, 0), [assets]);
    const totalLiabilities = useMemo(() => liabilities.reduce((sum, item) => sum + item.value, 0), [liabilities]);
    const netWorth = useMemo(() => totalAssets - totalLiabilities, [totalAssets, totalLiabilities]);

    const chartData = [
        { name: 'Assets', value: totalAssets },
        { name: 'Liabilities', value: totalLiabilities },
    ];
    const COLORS = ['#33d3d4', '#c734c8'];

    if (loadingAssets || loadingLiabilities) {
        return (
            <div className="flex justify-center items-center h-64">
                <LoadingIcon />
                <span className="text-xl ml-2">Loading Financial Data...</span>
            </div>
        );
    }

    return (
        <div className="space-y-8 animate-fade-in">
            <div className="bg-space-light/50 backdrop-blur-sm rounded-lg p-6 text-center shadow-2xl shadow-accent-cyan/10">
                <p className="text-gray-400 text-lg">Total Net Worth</p>
                <h2 className={`text-4xl sm:text-5xl font-bold my-2 ${netWorth >= 0 ? 'text-green-400' : 'text-red-500'}`}>
                    {formatCurrency(netWorth)}
                </h2>
                <p className="text-sm text-gray-500">Logged in as: User [{auth.currentUser?.uid}]</p>
            </div>

            <div className="grid grid-cols-1 xl:grid-cols-2 gap-8">
                {/* Column 1: Data Tables and Forms */}
                <div className="space-y-8">
                    <div>
                        <DataTable items={assets} onDeleteItem={deleteAsset} title="Assets" colorClass="shadow-accent-cyan/10" />
                        <DataEntryForm onAddItem={addAsset} category="Asset" />
                    </div>
                    <div>
                        <DataTable items={liabilities} onDeleteItem={deleteLiability} title="Liabilities" colorClass="shadow-accent-magenta/10" />
                        <DataEntryForm onAddItem={addLiability} category="Liability" />
                    </div>
                </div>

                {/* Column 2: Chart */}
                <div className="bg-space-light/50 backdrop-blur-sm rounded-lg p-4 shadow-lg shadow-black/20 flex flex-col items-center justify-center min-h-[400px]">
                    <h3 className="text-xl font-bold mb-2 text-center">Assets vs. Liabilities Breakdown</h3>
                    {totalAssets > 0 || totalLiabilities > 0 ? (
                        <ResponsiveContainer width="100%" height={300}>
                            <PieChart>
                                <Pie
                                    data={chartData}
                                    cx="50%"
                                    cy="50%"
                                    labelLine={false}
                                    outerRadius={100}
                                    fill="#8884d8"
                                    dataKey="value"
                                    label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                                >
                                    {chartData.map((entry, index) => (
                                        <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                                    ))}
                                </Pie>
                                <Tooltip formatter={(value: number) => formatCurrency(value)} contentStyle={{ backgroundColor: '#161b22', border: '1px solid #33d3d4' }} />
                                <Legend />
                            </PieChart>
                        </ResponsiveContainer>
                    ) : (
                         <div className="flex items-center justify-center h-full text-gray-400">
                            <p>Enter assets or liabilities to see the chart.</p>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default TrackerDashboard;
