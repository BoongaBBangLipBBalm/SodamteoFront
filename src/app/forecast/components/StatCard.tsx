import React from 'react';

type StatCardProps = {
  title: string;
  value: string | number;
};

const StatCard: React.FC<StatCardProps> = ({ title, value }) => {
  return (
    <div style={{ flex: 1, textAlign: 'center', padding: '10px', borderRadius: '8px', boxShadow: '0px 0px 10px rgba(0,0,0,0.1)' }}>
      <h4 style={{ color: '#888', marginBottom: '5px' }}>{title}</h4>
      <h2 style={{ margin: '0', fontSize: '24px', color: '#333' }}>{value}</h2>
    </div>
  );
};

export default StatCard;
