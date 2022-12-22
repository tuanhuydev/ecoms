import { adminRoutes } from '../../../components/Router';
import PageContainer from '@components/base/PageContainer';
import React from 'react';
export default function Overview() {
  return (
    <PageContainer title="Overview" routes={adminRoutes}>
      Overview
    </PageContainer>
  );
}
