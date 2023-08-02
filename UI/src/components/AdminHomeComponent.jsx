import React from 'react';
import Header from '../Header.jsx';
import { BarComponent } from './BarComponent.jsx';
import DoughnutChartComponent from './DoughnutChartComponent.jsx';

const AdminHomeComponent = () => {
  return (
    <>
      <Header />
      <div className='admin_main_container'>
        <DoughnutChartComponent />
        <hr></hr>
        <BarComponent />
      </div>
    </>
  );
}

export default AdminHomeComponent;
