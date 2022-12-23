import { adminRoutes } from 'scripts/components/Router';
import PageContainer from 'scripts/components/base/PageContainer';
import React from 'react';
export default function Overview() {
  return (
    <PageContainer title="Overview" routes={adminRoutes}>
      Overview
    </PageContainer>
  );
}
