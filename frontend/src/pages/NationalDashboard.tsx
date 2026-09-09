import React from 'react';
import { useRole } from '../context/RoleContext';
import { DMDashboard } from '../components/dashboard/DMDashboard';
import { CVODashboard } from '../components/dashboard/CVODashboard';
import { MoSPIDashboard } from '../components/dashboard/MoSPIDashboard';
import { MPDashboard } from '../components/dashboard/MPDashboard';

export const NationalDashboard: React.FC = () => {
  const { currentRole } = useRole();

  switch (currentRole) {
    case 'district_magistrate':
      return <DMDashboard />;
    case 'vigilance_auditor':
      return <CVODashboard />;
    case 'member_parliament':
      return <MPDashboard />;
    case 'mospi_admin':
    default:
      return <MoSPIDashboard />;
  }
};
